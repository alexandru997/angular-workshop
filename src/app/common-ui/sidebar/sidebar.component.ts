import {Component, inject} from '@angular/core';
import {SvgIconComponent} from "../svg-icon/svg-icon.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SubscriberCardComponent} from "./subscriber-card/subscriber-card.component";
import {ProfilesService} from "../../data/services/profiles.service";
import {firstValueFrom} from "rxjs";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    NgForOf,
    RouterLink,
    SubscriberCardComponent,
    AsyncPipe,
    ImgUrlPipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  profileServices = inject(ProfilesService);

  subscribers$ = this.profileServices.getSubscribersShortList(3)
  me = this.profileServices.me


  menuItems = [
    {
      label: 'Home',
      icon: 'home',
      link: ''
    },
    {
      label: 'Chat',
      icon: 'chat',
      link: 'chat'
    },
    {
      label: 'Search',
      icon: 'search',
      link: 'search'
    },

  ]

  ngOnInit() {
    firstValueFrom(
      this.profileServices.getMe()
    )
  }

}
