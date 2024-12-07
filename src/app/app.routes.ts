import {Routes} from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {SearchPageComponent} from "./pages/search-page/search-page.component";
import {ProfileCardComponent} from "./common-ui/profile-card/profile-card.component";
import {LayoutComponent} from "./common-ui/layout/layout.component";
import {canActivateAuth} from "./auth/access.guard";

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {path: '', component: SearchPageComponent},
      {path: 'profile', component: ProfileCardComponent},

    ],
    canActivate: [canActivateAuth]
  },
  {path: 'login', component: LoginPageComponent},
];
