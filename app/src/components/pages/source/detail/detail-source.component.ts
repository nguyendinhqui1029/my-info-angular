import { Post } from './../../../../model/post.model';
import { Component, OnInit } from '@angular/core';
import { LocatorService } from 'src/service/locator.service';
import { PostService } from 'src/service/post.service';

@Component({
  selector: 'detail-source',
  templateUrl: './detail-source.component.html',
  styleUrls: ['./detail-source.component.scss'],
})
export class DetailSourceComponent implements OnInit {
  dataDynamic: any;
  postService: PostService;
  postDetail:Post;
  constructor(private ls: LocatorService) {
     this.postService = this.ls.getService<PostService>('postService');
  }

  ngOnInit(): void {
   this.postService.getPostByID(this.dataDynamic.id).subscribe(resultPost=>{
     if(resultPost.status === 200){
       this.postDetail = resultPost.body;
     }
   });
  }
}
