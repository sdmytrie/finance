import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';

import { Account } from './account.model';
import { AccountsService } from './accounts.service';

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

  constructor(private accountsService: AccountsService) {}

  ngOnInit(): void {
    this.accountsSubscription = this.accountsService
      .fetchAll()
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
        this.accountsService.accountsChanged.next(this.accounts.slice());
      });

    this.editModeSubscription = this.accountsService.editMode.subscribe(
      (data) => {
        console.log(data);
        this.editMode = data;
      }
    );

    this.editedIdSubscription = this.accountsService.editedAccount.subscribe(
      (data) => {
        this.editedId = data.id;
      }
    );

    this.editedIndexSubscription = this.accountsService.editedAccountIndex.subscribe(
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
    this.accountsService.editMode.next(true);
    this.accountsService.editedAccount.next(account);
    this.accountsService.editedAccountIndex.next(index);

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

    let account: Account = {
      name: form.value.name.trim(),
      bank: form.value.bank.trim(),
      iban: form.value.iban,
      bic: form.value.bic,
    };

    if (this.editMode) {
      account.id = this.editedId;
    } else {
      account.id = 0;
    }

    this.toggleAccountModal();

    this.accountsService.save(account).subscribe((data) => {
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
    this.accountsService.accountsChanged.next(this.accounts.slice());
    form.reset();
  }

  deleteAccountHandler(index: number, id: number) {
    this.accounts = this.accounts.filter((item, idx) => idx !== index);
    this.accountsService.accountsChanged.next(this.accounts.slice());
    this.accountsService.delete(id);
  }
}
