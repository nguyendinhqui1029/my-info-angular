import { Component, OnInit } from '@angular/core';
import { GridCard } from 'src/model/grid-card.model';
import { CategoryService, MediaScreenService, PaginatorService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';
import { PostService } from 'src/service/post.service';

@Component({
  selector: 'my-life-page',
  templateUrl: './my-life.component.html',
  styleUrls: ['./my-life.component.scss']
})
export class MyLifePageComponent implements OnInit {
  isDeviceXS: boolean = false;
  mediaScreenService: MediaScreenService;
  paginatorService: PaginatorService;
  postService: PostService;
  categoryService: CategoryService;
  listChildItemById: any[] = [];
  listMyLife: GridCard[] = [];

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
    this.postService = this.ls.getService("postService");
    this.categoryService = this.ls.getService("categoryService");
  }

  ngOnInit(): void {
    this.paginatorService.getListDataPaginator.subscribe(dataAfterPaginator => {
      this.listChildItemById[dataAfterPaginator.key] = dataAfterPaginator.dataList;
    });

    this.mediaScreenService.getDevice().subscribe((device) => {
      this.isDeviceXS = device.mqAlias === 'xs' ? true : false;
    });

    this.categoryService.getAllCategory().subscribe(categorysReponse => {
      if (categorysReponse.status === 200) {
        categorysReponse.body.some(category => {
          this.postService.getPostByIdCategory(category.id).subscribe(postsReponse => {
            if (postsReponse.status === 200 && postsReponse.body.length > 0) {
              const gridCard = { id: category.id, title: category.title, listChildItem: postsReponse.body } as GridCard;
              this.listMyLife.push(gridCard);
            }
          });
        })
      }
    });
  }

  formatIdContainer(id: string) {
    return id.replace(/\-/g, '');
  }
}
