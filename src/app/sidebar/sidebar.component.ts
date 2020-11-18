import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Account } from '../shared/store/account.model';
import { AccountStoreService } from '../shared/store/account-store.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private accountsSubscription: Subscription;
  accounts: Account[];

  constructor(private accountStoreService: AccountStoreService) {}

  ngOnInit() {
    this.accountsSubscription = this.accountStoreService.accountsChanged.subscribe(
      (accounts) => {
        this.accounts = accounts;
      }
    );
  }

  ngOnDestroy() {
    this.accountsSubscription.unsubscribe();
  }
}
