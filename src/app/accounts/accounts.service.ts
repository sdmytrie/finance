import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Account } from './account.model';

@Injectable({ providedIn: 'root' })
export class AccountsService {
    accountsChanged = new Subject<Account[]>();
    editMode = new Subject<boolean>();
    editedAccount = new Subject<Account>();
    editedAccountIndex = new Subject<number>();
    private accounts: Account[] = [];

    constructor(private http: HttpClient, private router: Router) { }

    fetchAll() {
      return this.http.get<Account[]>(environment.apiUrl + '/accounts/');
    }

    save(account: Account) {
      if (account.bic === '') {
        account.bic = 'bic';
      }
      if (account.iban === '') {
        account.iban = 'iban';
      }
      if (!account.bank) {
        account.bank = 'bank';
      }
      if (account.id === 0) {
        return this.http.post<Account>(environment.apiUrl + '/accounts/', account);
      }else{
        return this.http.put<Account>(environment.apiUrl + '/accounts/' + account.id + '/', account);
      }
    }

    delete(id: number) {
      this.http.delete<Account>(environment.apiUrl + '/accounts/' + id + '/').subscribe();
    }
}
