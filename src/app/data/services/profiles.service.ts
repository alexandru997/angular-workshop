import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../interfaces/profile.interface";
import {Pageble} from "../interfaces/pageble.interface";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  https = inject(HttpClient)

  baseApiURL = 'https://icherniakov.ru/yt-course/'
  me = signal<Profile | null>(null)

  constructor() {
  }

  getTestAccounts() {
    return this.https.get<Profile[]>(`${this.baseApiURL}account/test_accounts`)
  }

  getMe() {
    return this.https.get<Profile>(`${this.baseApiURL}account/me`)
      .pipe(
        tap(res => this.me.set(res)),
      )
  }

  getAccount(id:string) {
    return this.https.get<Profile>(`${this.baseApiURL}account/${id}`)
  }

  getSubscribersShortList(num:number=3) {
    return this.https.get<Pageble<Profile>>(`${this.baseApiURL}account/accounts`)
      .pipe(
        map(result => result.items.slice(0, num)),
      )
  }

}
