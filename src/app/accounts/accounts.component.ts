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

  constructor(
    private accountService: AccountsService
  ) { }

  ngOnInit(): void {
    // this.accountService.getAccounts();
    this.accountsSubscription = this.accountService.fetchAll().subscribe(
      (accounts: Account[]) => {
        this.accounts = accounts;
        this.accountService.accountsChanged.next(this.accounts.slice());
    });
  }

  ngOnDestroy(): void {
    this.accountsSubscription.unsubscribe();
  }

}
