import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { GridCard } from 'src/model/grid-card.model';
import { Post } from 'src/model/post.model';
import { ImageService, MediaScreenService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';
import { PostService } from 'src/service/post.service';

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

  postInvolve: GridCard;
  urlImageFull: string = "";

  postService: PostService;
  postDetail: Post;
  constructor(private ls: LocatorService, private router: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.mediaScreenService = this.ls.getService<MediaScreenService>("mediaScreenService");
    this.imageService = this.ls.getService<ImageService>("imageService");
    this.imageService.getUrlImageFull.subscribe(urlImage => {
      this.urlImageFull = urlImage;
    })

    this.postService = this.ls.getService('postService');
  }

  ngOnInit(): void {
    this.mediaScreenService.getDevice().subscribe((device) => {
      this.isDeviceXS = device.mqAlias === 'xs' ? true : false;
    });
    this.router.params.subscribe((params: Params) => {
      this.postService.getPostByID(params.id).subscribe(result => {
        this.postDetail = result.body;
        this.getPostInvolveByCategory(this.postDetail.category);
      });
    });
  }

  getPostInvolveByCategory(categoryId: string) {
    this.postService.getPostByIdCategory(categoryId).subscribe(postsReponse => {
      if (postsReponse.status === 200 && postsReponse.body.length > 0) {
        const gridCard = { id: 'post_involve', title: 'post_involve', listChildItem: postsReponse.body } as GridCard;
        this.postInvolve = gridCard;
        console.log(this.postInvolve)
      }
    });
  }
}
