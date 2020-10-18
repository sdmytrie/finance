import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Account } from '../accounts/account.model';
import { AccountsService } from '../accounts/accounts.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  private accountsSubscription: Subscription;
  accounts: Account[];

  constructor(
    private accountsService: AccountsService
  ) {}

  ngOnInit() {
    this.accountsSubscription = this.accountsService.accountsChanged.subscribe(
      accounts => {
        this.accounts = accounts;
      }
    );
  }

  ngOnDestroy() {
    this.accountsSubscription.unsubscribe();
  }
}
