import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  socialNetwork = environment.social_network;
  constructor() { }


  ngOnInit(): void { }
}
