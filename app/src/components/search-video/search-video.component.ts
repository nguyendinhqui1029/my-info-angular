import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UploadVideoService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'search-video',
  templateUrl: './search-video.component.html',
  styleUrls: ['./search-video.component.scss']
})
export class SearchVideoComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  constructor(private ls: LocatorService) { }

  ngOnInit(): void { }

  click() {
    this.ls.getService<UploadVideoService>('uploadVideoService').getAllVideoByChannel('UCqnbcuNr7whrGuLiaTDBdTQ').subscribe((reponse) => {
      console.log(reponse)
    });
  }
}
