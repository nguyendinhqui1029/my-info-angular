import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MailModel } from 'src/model/mail.model';

@Injectable()
export class MailerService {
  private URL_MAIL = "";
  constructor(private http: HttpClient) {

  }
  sendEmail(data: MailModel) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=UTF-8')
    this.http.post(this.URL_MAIL, data, { headers, observe: 'response', responseType: 'text' });
  }
}