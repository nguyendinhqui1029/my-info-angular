import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GridCard } from 'src/model/grid-card.model';
import { ImageService, MediaScreenService, PaginatorService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'my-life-page',
  templateUrl: './my-life.component.html',
  styleUrls: ['./my-life.component.scss']
})
export class MyLifePageComponent implements OnInit {
  isDeviceXS: boolean = false;
  mediaScreenService: MediaScreenService;
  paginatorService: PaginatorService;
  listChildItemById: any[] = [];
  listMyLife: GridCard[] = [{
    id: "my-life01",
    title: "Tet holiday 2021", listChildItem: [
      { id: "post123", title: "title 1", contentDetail: "conent detail", urlVideo: "", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post124", title: "title 2", contentDetail: "conent detail", urlVideo: "", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post125", title: "title 3", contentDetail: "conent detail", urlVideo: "https://youtu.be/oE_E0p5soIA", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post126", title: "title 4", contentDetail: "conent detail", urlVideo: "", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post127", title: "title 5", contentDetail: "conent detail", urlVideo: "https://youtu.be/oE_E0p5soIA", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post128", title: "title 6", contentDetail: "conent detail", urlVideo: "", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" }
    ]
  },
  {
    id: "my-life02",
    title: "Lap trinh", listChildItem: [
      { id: "post129", title: "title 7", contentDetail: "conent detail", urlVideo: "https://youtu.be/oE_E0p5soIA", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post130", title: "title 8", contentDetail: "conent detail", urlVideo: "", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post131", title: "title 9", contentDetail: "conent detail", urlVideo: "https://youtu.be/oE_E0p5soIA", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post132", title: "title 10", contentDetail: "conent detail", urlVideo: "", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post133", title: "title 11", contentDetail: "conent detail", urlVideo: "", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" }
    ]
  }];
  slides = [{ 'image': 'https://gsr.dev/material2-carousel/assets/demo.png' },
  { 'image': 'https://gsr.dev/material2-carousel/assets/demo.png' },
  { 'image': 'https://gsr.dev/material2-carousel/assets/demo.png' },
  { 'image': 'https://gsr.dev/material2-carousel/assets/demo.png' },
  { 'image': 'https://gsr.dev/material2-carousel/assets/demo.png' },
  { 'image': 'https://gsr.dev/material2-carousel/assets/demo.png' }
  ];

  constructor(private ls: LocatorService) {
    this.mediaScreenService = this.ls.getService<MediaScreenService>("mediaScreenService");
    this.paginatorService = this.ls.getService<PaginatorService>("paginatorService");
  }

  ngOnInit(): void {
    this.paginatorService.getListDataPaginator.subscribe(dataAfterPaginator => {
      this.listChildItemById[dataAfterPaginator.key] = dataAfterPaginator.dataList;
    });
    this.mediaScreenService.getDevice().subscribe((device) => {
      this.isDeviceXS = device.mqAlias === 'xs' ? true : false;
    });
  }
}
