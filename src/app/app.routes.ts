import { Routes } from '@angular/router';
import {InstagramLoginPageComponent} from "./components/instagram-login-page/instagram-login-page.component";
import {PhishingComponent} from "./components/phishing/phishing.component";
import {ControlEmailComponent} from "./components/control-email/control-email.component";

export const routes: Routes = [
  {path: '', component: InstagramLoginPageComponent},
  {path: 'phishing', component: PhishingComponent},
  {path: 'control-email', component: ControlEmailComponent}
];
