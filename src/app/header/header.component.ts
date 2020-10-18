import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSubscription: Subscription;
  username: string;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user => {
      if (user) {
        this.username = user.username;
      }
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    // this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
