import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {TokenResponse} from "./auth.interface";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  cookieService = inject(CookieService)
  baseApiURL = 'https://icherniakov.ru/yt-course/auth/'

  token: string | null = null;
  refresh_token: string | null = null;

  get isAut() {
    if (!this.token) {
      this.token = this.cookieService.get('token');
    }
    return !!this.token;
  }

  login(payload: { username: string, password: string }) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);
    return this.http.post<TokenResponse>(`${this.baseApiURL}token`, fd).pipe(
      tap(val => {
          this.token = val.access_token
          this.refresh_token = val.refresh_token

          this.cookieService.set('token', this.token);
          this.cookieService.set('refresh_token', this.refresh_token);
        }
      ),
    )
  }
}
