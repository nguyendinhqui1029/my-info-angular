import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, inject } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { Button } from '@app/shared/models/button.model';

@Component({
  selector: 'q-video-card',
  standalone: true,
  imports: [PrimeComponent],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss'
})
export class VideoCardComponent implements AfterViewInit{
  @Input() isDisplayUI!: boolean;
  @Input({required: true}) videoUrl!: string;
  @Input({required: true}) content!: string;
  @Input({required: true}) title!: string;
  @Input({required: false}) buttonName!: string;
  @Input({required: false}) buttons!: Button[];

  @Output() clickEvent = new EventEmitter<string>();

  @ViewChild('videoChild') videoChild!: ElementRef;

  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef)
  width: number = 200;
  height: number = 100;
  
  ngAfterViewInit(): void {
    this.width = this.videoChild.nativeElement.offsetWidth;
    this.height = this.videoChild.nativeElement.offsetHeight;
    this.changeDetectorRef.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  handleKeyDown() {
    this.width = this.videoChild.nativeElement.offsetWidth;
    this.height = this.videoChild.nativeElement.offsetHeight;
  
    this.changeDetectorRef.detectChanges();
  }
}
