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
    editing = new Subject<{edit:boolean, account_id:number, index:number, property:string}>();

    constructor(private http: HttpClient, private router: Router) { }

    fetchAll() {
      return this.http.get<Account[]>(environment.apiUrl + '/accounts/');
    }

    editOne(index: number, account_id: number, property: string) {
      this.editing.next({edit: true, account_id: account_id, index: index, property:property});
    }

    cancel() {
      this.editing.next({edit: false, account_id: 0, index: 0, property:''});
    }

    save(value: string, accounts: Account[], index: number) {
      let account = accounts[index];
      account.name = value;
      this.editing.next({edit: false, account_id: 0, index: 0, property:''});
    }
}
