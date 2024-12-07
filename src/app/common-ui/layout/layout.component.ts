import {Component, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {ProfilesService} from "../../data/services/profiles.service";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
profileService = inject(ProfilesService)

  ngOnInit() {
    console.log('init');
    this.profileService.getMe().subscribe(data => {
      console.log(data)})
  }


}
