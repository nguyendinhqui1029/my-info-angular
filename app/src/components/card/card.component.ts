import { Post } from './../../model/post.model';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LocatorService } from 'src/service/locator.service';
import { MediaScreenService } from 'src/service';
@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input('post') post: Post;
  @ViewChild('demoYouTubePlayer') demoYouTubePlayer: ElementRef<HTMLDivElement>;
  videoWidth: number | undefined;
  videoHeight: number | undefined;
  isShow:boolean=true;
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private ls: LocatorService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }
  onResize = (): void => {
    // Automatically expand the video to fit the page up to 1200px x 720px
    if (this.demoYouTubePlayer) {
      this.videoWidth = Math.min(
        this.demoYouTubePlayer.nativeElement.clientWidth,
        1200
      );
      this.videoHeight = this.videoWidth * 0.6;
      this._changeDetectorRef.detectChanges();
    }
  };

  setIsShowVideo() {
    this.isShow = false;
  }
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }
}
