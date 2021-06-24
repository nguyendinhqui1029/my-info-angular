import { ElementRef, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'video-custom',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoCustomComponent implements OnInit {
  @Input('url') url: string;
  @Input('videoWidth') videoWidth: number | undefined;
  @Input('videoHeight') videoHeight: number | undefined;
  @Input('isShow') isShow: boolean=false;
  constructor() {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {}
  getVideoID(url: string) {
    return url.substr(url.lastIndexOf('/') + 1);
  }
}
