import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Account } from './account.model';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  accounts: Account[];
  constructor(
    private accountService: AccountsService
  ) { }

  ngOnInit(): void {
    this.accountService.fetch().subscribe(
      (accounts: Account[]) => {
        console.log(accounts);
        this.accounts = accounts;
    });
  }

}
