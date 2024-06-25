import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild, ViewContainerRef, signal } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'q-video',
  standalone: true,
  imports: [YouTubePlayer],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent  {
  @Input({ required: true }) path: string = 'mVjYG9TSN88';
  @Input({ required: false }) placeholderImageQuality: 'low' | 'high' | 'standard' = 'low';
  @Input({ required: false }) placeholderButtonLabel!:string;
  @Input({ required: true }) width!:number;
  @Input({ required: true }) height!:number;
} 
