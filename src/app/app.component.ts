import {Component, inject} from '@angular/core';
import {ProfileCardComponent} from "./common-ui/profile-card/profile-card.component";
import {ProfilesService} from "./data/services/profiles.service";
import {Profile} from "./data/interfaces/profile.interface";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  profileServices = inject(ProfilesService)
  profiles: Profile[] = []

  constructor() {
    this.profileServices.getTestAccounts().subscribe(val => {
      this.profiles = val
    })
  }

}
