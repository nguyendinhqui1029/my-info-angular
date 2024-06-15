import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, inject } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';
import { ContainerSize } from '@shared/models/container-size.mode';

@Directive({
  selector: '[qContainerChangeSize]',
  standalone: true
})
export class ContainerChangeSizeDirective implements OnDestroy, OnChanges {

  @Input({ required: false }) maxWidth!: number;
  @Input({ required: false }) minWidth!: number;
  @Input({ required: false }) minHeight!: number;
  @Input({ required: false }) maxHeight!: number;
  @Output() sizeChange = new EventEmitter<ContainerSize>();

  private elementRef: ElementRef = inject(ElementRef);
  private resizeObserver!: ResizeObserver;
  resizeObserverEntry!: ResizeObserverEntry;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['maxWidth'].isFirstChange() 
      || changes['minWidth'].isFirstChange()
    || changes['minHeight'].isFirstChange()
    || changes['maxHeight'].isFirstChange()) {
      this.resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        if (entries && entries.length) {
          this.resizeObserverEntry = entries[0];
          const { left, top, right, bottom, width, height } = this.resizeObserverEntry.contentRect;
          this.sizeChange.next({
            height: height,
            width: width,
            paddingTop: top,
            paddingLeft: left,
            paddingRight: right - width,
            paddingBottom: bottom - height,
            isMatchWidth: (typeof this.minWidth === 'number' && this.minWidth <= width) || (typeof this.maxWidth === 'number' && this.maxWidth >= width),
            isMatchHeight: (typeof this.minHeight === 'number' && this.minHeight <= height) || (typeof this.maxHeight === 'number' && this.maxHeight >= height),
          });
        };
      });
      this.resizeObserver.observe(this.elementRef.nativeElement);
    }
  }


  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

}
