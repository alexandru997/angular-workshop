import {Component, inject} from '@angular/core';
import {ProfileCardComponent} from "../../common-ui/profile-card/profile-card.component";
import {ProfilesService} from "../../data/services/profiles.service";
import {Profile} from "../../data/interfaces/profile.interface";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ProfileCardComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  profileServices = inject(ProfilesService)
  profiles: Profile[] = []

  constructor() {
    this.profileServices.getTestAccounts().subscribe(val => {
      this.profiles = val
    })
  }

}
