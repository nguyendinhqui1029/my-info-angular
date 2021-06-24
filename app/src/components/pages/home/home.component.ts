import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GridCard } from 'src/model/grid-card.model';
import { Post } from 'src/model/post.model';
import { MediaScreenService, PaginatorService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';
import { PostService } from 'src/service/post.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterContentChecked {
  listItemQuickLink = [
    'Link 1',
    'Link 2',
    'Link 3',
    'Link 4',
    'Link 5',
    'Link 6',
    'Link 8',
    'Link 7',
  ];
  slides = [
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
    { image: 'https://gsr.dev/material2-carousel/assets/demo.png' },
  ];
  listItemsQuickLink: any[] = [];

  mediaScreenService: MediaScreenService;
  paginatorService: PaginatorService;
  postService: PostService;
  isDeviceXS: boolean = false;

  listAllPost: Post[] = [];
  listPostLatestAfterPagination: Post[] = [];
  constructor(private ls: LocatorService, private cd: ChangeDetectorRef) {
    this.mediaScreenService =
      this.ls.getService<MediaScreenService>('mediaScreenService');
    this.paginatorService =
      this.ls.getService<PaginatorService>('paginatorService');
    this.postService = this.ls.getService<PostService>('postService');
  }

  ngAfterContentChecked(): void {
    //Fix error current Value: '' prev value:''
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.postService.getAllPost().subscribe((result) => {
      if (result.status === 200 && result.body.length) {
        this.listAllPost = result.body;
      }
    });
    this.paginatorService.getListDataPaginator.subscribe((dataAfterPaginator) => {
      switch (dataAfterPaginator.key) {
        case 'QUICK_LINK':
          {
            this.listItemsQuickLink = dataAfterPaginator.dataList;
          }
          break;
        case 'ALL_POST':
          {
            this.listPostLatestAfterPagination = dataAfterPaginator.dataList;
          }
          break;
      }
    });
    this.mediaScreenService.getDevice().subscribe((device) => {
      this.isDeviceXS = device.mqAlias === 'xs' ? true : false;
    });
  }

  getVideoID(url: string) {
    return url.substr(url.lastIndexOf('/') + 1);
  }
}
