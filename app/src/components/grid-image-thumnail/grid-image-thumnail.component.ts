import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'grid-image-thumnail',
  templateUrl: './grid-image-thumnail.component.html',
  styleUrls: ['./grid-image-thumnail.component.scss']
})
export class GridImageThumnailComponent implements OnInit {
  @Input("listImage") listImage: any[];
  urlImageAcitve: string;
  constructor(private ls: LocatorService) {

  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.activeImageThumnail(this.listImage[0].id)
  }

  activeImageThumnail(idActived: string) {
    if (document.querySelector(".active")) {
      document.querySelector(".active").classList.remove('active');
    }
    document.querySelector(`#${idActived}`).classList.add('active');
    this.ls.getService<ImageService>("imageService").nextUrlImageFull(this.listImage.find(el => { return el.id === idActived }).image);
  }
}
