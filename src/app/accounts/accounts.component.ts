import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { Account } from './account.model';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
  accounts: Account[];
  accountsSubscription: Subscription;
  editSubscription: Subscription;
  editing: {edit:boolean, account_id:number, index:number, property:string};

  constructor(
    private accountsService: AccountsService
  ) {
    this.editing = {edit:false, account_id:0, index:0, property: ''};
  }

  ngOnInit(): void {
    // this.accountService.getAccounts();
    this.accountsSubscription = this.accountsService.fetchAll().subscribe(
      (accounts: Account[]) => {
        this.accounts = accounts;
        this.accountsService.accountsChanged.next(this.accounts.slice());
    });
    this.editSubscription = this.accountsService.editing.subscribe(
      (editing) => {
        this.editing = editing;
      }
    );
  }

  ngOnDestroy(): void {
    this.accountsSubscription.unsubscribe();
    this.editSubscription.unsubscribe();
  }

  editOne(index: number, account_id: number, property: string) {
    this.accountsService.editOne(index, account_id, property);
  }

  cancel() {
    this.accountsService.cancel();
  }

  onSave(event, index: number) {
    console.log(event);
    console.log(event.target.value);
    this.accountsService.save(event.target.value, this.accounts, index);
  }
}
