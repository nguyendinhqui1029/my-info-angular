import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDateSelectionModel } from '@angular/material/datepicker';
import { MailModel } from 'src/model/mail.model';
import { MailerService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'send-contact',
  templateUrl: './send-contact.component.html',
  styleUrls: ['./send-contact.component.scss']
})
export class SendContactComponent implements OnInit {
  contactFormGroup: FormGroup;
  value: string;
  constructor(private fb: FormBuilder, private ls: LocatorService) {
    this.contactFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }


  resetValueInput() {
    this.contactFormGroup.controls.email.setValue(null);
  }

  sendContact() {
    if (this.contactFormGroup.status === 'VALID') {
      let dataMail: MailModel;
      dataMail.to = this.contactFormGroup.value.email;
      dataMail.title = this.contactFormGroup.value.title;
      dataMail.content = this.contactFormGroup.value.content;
      this.ls.getService<MailerService>('mailerService').sendEmail(dataMail);
    }
  }
  ngOnInit(): void { }
}
