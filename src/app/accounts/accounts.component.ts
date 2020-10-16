import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Account } from './account.model';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {
  accounts: Account[];
  accounstSubscription: Subscription;
  constructor(
    private accountService: AccountsService
  ) { }

  ngOnInit(): void {
    this.accounstSubscription = this.accountService.fetch().subscribe(
      (accounts: Account[]) => {
        console.log(accounts);
        this.accounts = accounts;
    });
  }

  ngOnDestroy(): void {
    this.accounstSubscription.unsubscribe();
  }

}
