import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, HostListener, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'video-custom',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoCustomComponent implements OnInit {
  @Input("url") url: string;
  @Input("containerId") containeId: string;
  @Input("imageThumnail") imageThumnail: string;
  @Input("showImageThumnail") showImageThumnail: boolean = true;
  heightVideo: number;
  widthVideo: number;
  @ViewChild("player") player: YouTubePlayer;
  constructor(@Inject(DOCUMENT) private document, private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.setHeightAndWidthVideo();
  }

  hiddenImageLoadVideo(element) {
    if (this.url && this.imageThumnail) {
      (this.player as YouTubePlayer).playVideo();
      element.target.style.display = 'none';
      this.document.querySelector(`#yt_${this.containeId}`).style.display = "inline-block";
    }
  }

  @HostListener("window:resize")
  onResize() {
    this.setHeightAndWidthVideo();
  }

  setHeightAndWidthVideo() {
    if (this.document.querySelector(`#${this.containeId}`)) {
      if (this.widthVideo !== this.document.querySelector(`#${this.containeId}`).offsetWidth) {
        this.widthVideo = this.document.querySelector(`#${this.containeId}`).offsetWidth;
        this.heightVideo = (this.widthVideo / 1.75);//this.document.querySelector(`#${this.containeId}`).offsetHeight;
      }
    }
  }
  getVideoID(url: string) {
    return url.substr(url.lastIndexOf('/') + 1);
  }

  ngAfterViewChecked(): void {
    this.setHeightAndWidthVideo();
    this.cd.detectChanges();
  }
}
