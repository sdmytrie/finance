import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signin(username: string, password: string) {
    return this.http
      .post<AuthResponseData>(environment.apiUrl + '/api-token-auth/', {
        username: username,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          const tokenParts = resData.token.split(/\./);
          const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
          this.handleAuthentication(
            tokenDecoded.username,
            tokenDecoded.user_id,
            tokenDecoded.exp*1000,
            resData.token
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      id: string;
      tokenExpires: number;
      username: string;
      _token: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.username,
      userData.id,
      userData.tokenExpires,
      userData._token
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        userData.tokenExpires - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    username: string,
    userId: string,
    expiresIn: number,
    token: string
  ) {
    const expirationDate = expiresIn;
    const user = new User(username, userId, expirationDate, token);
    this.user.next(user);
    this.autoLogout(expiresIn);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'USERNAME_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
