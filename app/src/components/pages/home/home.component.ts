import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GridCard } from 'src/model/grid-card.model';
import { Post } from 'src/model/post.model';
import { MediaScreenService, PaginatorService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentChecked {
  newPosts: Post[] = [];
  listItemDefault: any[] = [
    { text: '1', type: 'image', url: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { text: '2', type: 'video', url: "https://youtu.be/mdyzh7x9HNI" },
    { text: '3', type: 'image', url: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { text: '4', type: 'video', url: "https://youtu.be/mdyzh7x9HNI" },
    { text: '5', type: 'image', url: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { text: '6', type: 'image', url: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { text: '7', type: 'video', url: "https://youtu.be/mdyzh7x9HNI" },
    { text: '8', type: 'image', url: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { text: '9', type: 'video', url: "https://youtu.be/mdyzh7x9HNI" },
    { text: '10', type: 'image', url: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { text: '11', type: 'image', url: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { text: '12', type: 'video', url: "https://youtu.be/mdyzh7x9HNI" },
    { text: '13', type: 'image', url: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { text: '14', type: 'video', url: "https://youtu.be/mdyzh7x9HNI" },
    { text: '15', type: 'image', url: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
    { text: '15', type: 'image', url: "https://material.angular.io/assets/img/examples/shiba2.jpg" }
  ];
  listItemQuickLink = ["Link 1", "Link 2", "Link 3", "Link 4", "Link 5", "Link 6", "Link 8", "Link 7"];

  dataGridCard: GridCard = {
    id: "my-life01",
    title: "Tet holiday 2021", listChildItem: [
      { id: "post123", title: "title 1", contentDetail: "conent detail", urlVideo: "", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post123", title: "title 2", contentDetail: "conent detail", urlVideo: "", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post123", title: "title 3", contentDetail: "conent detail", urlVideo: "", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post123", title: "title 4", contentDetail: "conent detail", urlVideo: "", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post123", title: "title 5", contentDetail: "conent detail", urlVideo: "", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" },
      { id: "post123", title: "title 6", contentDetail: "conent detail", urlVideo: "", urlThumnail: "https://material.angular.io/assets/img/examples/shiba2.jpg" }
    ]
  };
  listItems: any[] = [];

  currentItem: number = 0;
  mediaScreenService: MediaScreenService;
  paginatorService: PaginatorService;
  isDeviceXS: boolean = false;

  constructor(private ls: LocatorService, private cd: ChangeDetectorRef) {
    this.mediaScreenService = this.ls.getService<MediaScreenService>("mediaScreenService");
    this.paginatorService = this.ls.getService<PaginatorService>("paginatorService");

  }

  ngAfterContentChecked(): void {
    //Fix error current Value: '' prev value:''
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.paginatorService.getListDataPaginator.subscribe(dataAfterPaginator => {
      switch (dataAfterPaginator.key) {
        case "NEW_POST": {
          this.newPosts = dataAfterPaginator.dataList.map((item, index) => {
            const gridDefault = [{ cols: 2, rows: 1 }, { cols: 2, rows: 1 }, { cols: 1, rows: 1 }, { cols: 2, rows: 1 }, { cols: 1, rows: 1 }];
            item.cols = gridDefault[index].cols;
            item.rows = gridDefault[index].rows;
            return item;
          });
        }
          break;
        case "QUICK_LINK": {
          this.listItems = dataAfterPaginator.dataList;
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
