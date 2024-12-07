import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProfileInterface} from "../interfaces/profile.interface";

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  https = inject(HttpClient)

  baseApiURL = 'https://icherniakov.ru/yt-course/'

  constructor() {
  }

  getTestAccounts() {
    return this.https.get<ProfileInterface[]>(`${this.baseApiURL}account/test_accounts`)
  }
}
