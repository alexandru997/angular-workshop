import {Component, inject} from '@angular/core';
import {ProfileCardComponent} from "../../common-ui/profile-card/profile-card.component";
import {ProfilesService} from "../../data/services/profiles.service";
import {ProfileFiltersComponent} from "./profile-filters/profile-filters.component";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  profileServices = inject(ProfilesService)
  profiles = this.profileServices.filteredProfiles

  constructor() {
    // this.profileServices.getTestAccounts().subscribe(val => {
    //   this.profiles = val
    // })
  }

}
