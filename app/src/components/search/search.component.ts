import { Component, OnInit } from '@angular/core';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private ls: LocatorService) {

  }


  ngOnInit(): void {

  }
}
