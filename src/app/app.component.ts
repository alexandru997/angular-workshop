import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ProfileCardComponent} from "./common-ui/profile-card/profile-card.component";
import {ProfilesService} from "./data/services/profiles.service";
import {JsonPipe} from "@angular/common";
import {ProfileInterface} from "./data/interfaces/profile.interface";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfileCardComponent, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  profileServices = inject(ProfilesService)
  profiles: ProfileInterface[] = []

  constructor() {
    this.profileServices.getTestAccounts().subscribe(val => {
      this.profiles = val
    })
  }

}
