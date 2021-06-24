import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { TYPE_MENU } from 'src/emun/type-menu.enum';
import { MenuItem } from 'src/model/menu.model';
import { CategoryService, MenuService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';
import { PostService } from 'src/service/post.service';

@Component({
  selector: 'source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss'],
})
export class SourceComponent implements OnInit {
  listMenuLeft: MenuItem[]=[];
  postService: PostService;
  categoryService: CategoryService;
  constructor(private ls: LocatorService) {
    this.postService = this.ls.getService<PostService>('postService');
    this.categoryService = this.ls.getService<CategoryService>('categoryService');
  }
  ngOnInit(): void {
    
    this.categoryService.getCategoryIsProgramming().subscribe((result) => {
      if (result.status === 200) {
        result.body.forEach((category) => {
          const itemMenu = {
            id: category.id,
            lable: category.title,
            url: '',
            showOrHidden: true,
            children: [],
          };
              
          this.postService
            .getPostByIdCategory(category.id).subscribe((resultPost:any) => {
              if (resultPost.status === 200 && resultPost.body.length){
                resultPost.body.forEach(item => {
                  itemMenu.children.push({
                    id: item.id,
                    lable: item.title,
                    url: 'detailSourceComponent',
                    showOrHidden: true,
                  });
                });
              }
              this.listMenuLeft.push(itemMenu);
            });
        });
      }
    });
  }
}
