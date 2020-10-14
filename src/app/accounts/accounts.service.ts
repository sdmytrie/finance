import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Account } from './account.model';

@Injectable({ providedIn: 'root' })
export class AccountsService {
    accountsChanged = new Subject<Account[]>();
    private accounts: Account[] = [];

    constructor(private http: HttpClient, private router: Router) { }

    setAccounts(accounts: Account[]) {
        this.accounts = accounts;
        this.accountsChanged.next(this.accounts.slice());
    }

    fetch() {
      return this.http.get<Account[]>(environment.apiUrl + '/accounts/');
    }
}
