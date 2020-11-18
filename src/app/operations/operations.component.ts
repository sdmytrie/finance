import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Account } from '../shared/store/account.model';
import { AccountsService } from '../accounts/accounts.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit{
  accounts: Account[];
  accountsSubscription: Subscription;

  constructor(private accountsService: AccountsService) {}

  ngOnInit(): void {
    this.accountsSubscription = this.accountsService
      .fetchAll()
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
        this.accountsService.accountsChanged.next(this.accounts.slice());
      });
  }
}
