import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AccountStoreService } from '../shared/store/account-store.service';
import { Account } from '../shared/store/account.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit, OnDestroy {
  @ViewChild('backdrop') backdrop: ElementRef;
  @ViewChild('addAccount') addAccount: ElementRef;
  @ViewChild('accountForm') accountForm: NgForm;

  accounts: Account[];
  accountsSubscription: Subscription;
  editMode: boolean;
  editModeSubscription: Subscription;
  editedId: number;
  editedIdSubscription: Subscription;
  editedIndex: number;
  editedIndexSubscription: Subscription;

  constructor(private accountStoreService: AccountStoreService) {}

  ngOnInit(): void {
    this.accountsSubscription = this.accountStoreService
      .fetchAll()
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
        this.accountStoreService.accountsChanged.next(this.accounts.slice());
      });

    this.editModeSubscription = this.accountStoreService.editMode.subscribe(
      (data) => {
        this.editMode = data;
      }
    );

    this.editedIdSubscription = this.accountStoreService.editedAccount.subscribe(
      (data) => {
        this.editedId = data.id;
      }
    );

    this.editedIndexSubscription = this.accountStoreService.editedAccountIndex.subscribe(
      (data) => {
        this.editedIndex = data;
      }
    );
  }

  ngOnDestroy(): void {
    this.accountsSubscription.unsubscribe();
    this.editModeSubscription.unsubscribe();
    this.editedIdSubscription.unsubscribe();
    this.editedIndexSubscription.unsubscribe();
  }

  private toggleBackdrop() {
    this.backdrop.nativeElement.classList.toggle('visible');
  }

  private toggleAccountModal() {
    this.addAccount.nativeElement.classList.toggle('visible');
    this.toggleBackdrop();
  }

  addAccountHandler() {
    // let newAccount: Account = { id: 0, name: 'New Account', balance: 0 };
    // this.accounts = [newAccount, ...this.accounts];
    // this.accountsService.accountsChanged.next(this.accounts.slice());
    this.toggleAccountModal();
  }

  editAccountHandler(index: number, account: Account) {
    // this.editMode = true;
    this.accountStoreService.editMode.next(true);
    this.accountStoreService.editedAccount.next(account);
    this.accountStoreService.editedAccountIndex.next(index);

    this.accountForm.setValue({
      name: account.name,
      bank: account.bank,
      bic: account.bic,
      iban: account.iban,
    });
    this.toggleAccountModal();
  }

  cancelAddAccountHandler(form: NgForm) {
    this.toggleAccountModal();
    form.reset();
  }

  backdropClickHandler() {
    this.toggleAccountModal();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const account: Account = new Account(
      form.value.name.trim(),
      form.value.bank.trim(),
      form.value.iban.trim() || 'iban',
      form.value.bic.trim() || 'bic'
    );

    if (this.editMode) {
      account.id = this.editedId;
    } else {
      account.id = 0;
    }

    this.toggleAccountModal();

    this.accountStoreService.save(account).subscribe((data) => {
      account.id = data.id;
    });

    if (this.editMode) {
      this.accounts[this.editedIndex] = account;
      this.accounts = this.accounts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else {
      this.accounts = [account, ...this.accounts].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    this.accountStoreService.accountsChanged.next(this.accounts.slice());
    form.reset();
  }

  deleteAccountHandler(index: number, id: number) {
    this.accounts.splice(index, 1);
    this.accountStoreService.accountsChanged.next(this.accounts.slice());
    this.accountStoreService.delete(id);
  }
}
