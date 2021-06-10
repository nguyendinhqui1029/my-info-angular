import { Component, OnInit } from '@angular/core';
import { GridCard } from 'src/model/grid-card.model';
import { Post } from 'src/model/post.model';
import { ImageService, MediaScreenService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  isDeviceXS: boolean = false;
  mediaScreenService: MediaScreenService;
  imageService: ImageService;
  listItemDefault: any[] = [];
  listImage: any[] = [
    { id: "image123", imageThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg", image: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { id: "image124", imageThumnail: "https://meta.vn/Data/image/2021/01/18/xuan-phan-3.jpg", image: "https://meta.vn/Data/image/2021/01/18/xuan-phan-3.jpg" },
    { id: "image125", imageThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg", image: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { id: "image126", imageThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg", image: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { id: "image127", imageThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg", image: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { id: "image128", imageThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg", image: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { id: "image129", imageThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg", image: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { id: "image130", imageThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg", image: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { id: "image131", imageThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg", image: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { id: "image132", imageThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg", image: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { id: "image133", imageThumnail: "https://meta.vn/Data/image/2021/01/18/xuan-phan-3.jpg", image: "https://meta.vn/Data/image/2021/01/18/xuan-phan-3.jpg" },
    { id: "image135", imageThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg", image: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { id: "image136", imageThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg", image: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { id: "image137", imageThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg", image: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { id: "image138", imageThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg", image: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { id: "image139", imageThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg", image: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { id: "image140", imageThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg", image: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { id: "image141", imageThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg", image: "https://material.angular.io/assets/img/examples/shiba2.jpg" }
  ];

  postInvolve: GridCard = {
    id: "post_involve",
    title: "post_involve",
    listChildItem: [
      { id: "post123", title: "title 1", contentDetail: "conent detail", urlVideo: "https://youtu.be/oE_E0p5soIA", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post124", title: "title 1", contentDetail: "conent detail", urlVideo: "", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post125", title: "title 1", contentDetail: "conent detail", urlVideo: "https://youtu.be/oE_E0p5soIA", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post126", title: "title 1", contentDetail: "conent detail", urlVideo: "https://youtu.be/oE_E0p5soIA", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post127", title: "title 1", contentDetail: "conent detail", urlVideo: "", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post128", title: "title 1", contentDetail: "conent detail", urlVideo: "https://youtu.be/oE_E0p5soIA", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" }]
  };
  data: any = "if (true) {&nbsp; while(true) { doSomething();}}";
  urlImageFull: string = "";
  constructor(private ls: LocatorService) {
    this.mediaScreenService = this.ls.getService<MediaScreenService>("mediaScreenService");
    this.imageService = this.ls.getService<ImageService>("imageService");
    this.imageService.getUrlImageFull.subscribe(urlImage => {
      this.urlImageFull = urlImage;
    })
  }

  ngOnInit(): void {
    this.mediaScreenService.getDevice().subscribe((device) => {
      this.isDeviceXS = device.mqAlias === 'xs' ? true : false;
    });
  }
}
