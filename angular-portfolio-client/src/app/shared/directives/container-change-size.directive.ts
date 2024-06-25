import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';
import { ContainerSize } from '@shared/models/container-size.mode';

@Directive({
  selector: '[qContainerChangeSize]',
  standalone: true
})
export class ContainerChangeSizeDirective implements OnDestroy, OnChanges {
  @Input({ required: false }) maxWidth!: number[];
  @Input({ required: false }) minWidth!: number[];
  @Input({ required: false }) minHeight!: number[];
  @Input({ required: false }) maxHeight!: number[];
  @Output() sizeChange = new EventEmitter<Record<string,ContainerSize>>();

  private elementRef: ElementRef = inject(ElementRef);
  private resizeObserver!: ResizeObserver;

  isMinWidthMatch(index: number, width: number, right: number, left: number) {
    const maxWidth = right + width + left; // width + padding left + padding right
    return (this.minWidth?.length > 0 && this.minWidth[index] <= maxWidth);
  }

  isMaxWidthMatch(index: number, width: number, right: number, left: number) {
    const maxWidth = right + width + left; // width + padding left + padding right
    return (this.maxWidth?.length > 0  && this.maxWidth[index] >= maxWidth);
  }

  isMaxHeightMatch(index: number, height: number, top: number, bottom: number) {
    const maxHeight = top + height + bottom; // height + padding right + padding top
    return (this.maxHeight?.length > 0 && this.maxHeight[index] >= maxHeight);
  }

  isMinHeightMatch(index: number, height: number, top: number, bottom: number) {
    const maxHeight = top + height + bottom; // height + padding right + padding top
    return (this.minHeight?.length > 0 && this.minHeight[index] <= maxHeight);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['maxWidth'].isFirstChange() 
      || changes['minWidth'].isFirstChange()
      || changes['minHeight'].isFirstChange()
      || changes['maxHeight'].isFirstChange()) {
      this.resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        if (entries && entries.length) {
          const { left, top, right, bottom, width, height } = entries[0].contentRect;
          const elementInfo: Record<string,ContainerSize> = {};

          if(this.minWidth && this.minWidth.length) {
            this.minWidth.forEach((item: number, index: number) => {
              elementInfo[item.toString()]= {
                height: height,
                width: width,
                paddingTop: top,
                paddingLeft: left,
                paddingRight: right - width,
                paddingBottom: bottom - height,
                isMinWidthMatch: this.isMinWidthMatch(index, width, right - width, left),
                isMaxWidthMatch: this.isMaxWidthMatch(index, width, right - width, left),
                isMaxHeightMatch: this.isMaxHeightMatch(index, height, top, bottom - height),
                isMinHeightMatch: this.isMinHeightMatch(index, height, top, bottom - height)
              }
            });
          }
          if(this.maxWidth && this.maxWidth.length) {
            this.maxWidth.forEach((item: number, index: number) => {
              elementInfo[item.toString()]= {
                height: height,
                width: width,
                paddingTop: top,
                paddingLeft: left,
                paddingRight: right - width,
                paddingBottom: bottom - height,
                isMinWidthMatch: this.isMinWidthMatch(index, width, right - width, left),
                isMaxWidthMatch: this.isMaxWidthMatch(index, width, right - width, left),
                isMaxHeightMatch: this.isMaxHeightMatch(index, height, top, bottom - height),
                isMinHeightMatch: this.isMinHeightMatch(index, height, top, bottom - height)
              }
            });
          }
          if(this.minHeight && this.minHeight.length) {
            this.minHeight.forEach((item: number, index: number) => {
              elementInfo[item.toString()]= {
                height: height,
                width: width,
                paddingTop: top,
                paddingLeft: left,
                paddingRight: right - width,
                paddingBottom: bottom - height,
                isMinWidthMatch: this.isMinWidthMatch(index, width, right - width, left),
                isMaxWidthMatch: this.isMaxWidthMatch(index, width, right - width, left),
                isMaxHeightMatch: this.isMaxHeightMatch(index, height, top, bottom - height),
                isMinHeightMatch: this.isMinHeightMatch(index, height, top, bottom - height)
              }
            });
          }

          if(this.maxHeight && this.maxHeight.length) {
            this.maxHeight.forEach((item: number, index: number) => {
              elementInfo[item.toString()]= {
                height: height,
                width: width,
                paddingTop: top,
                paddingLeft: left,
                paddingRight: right - width,
                paddingBottom: bottom - height,
                isMinWidthMatch: this.isMinWidthMatch(index, width, right - width, left),
                isMaxWidthMatch: this.isMaxWidthMatch(index, width, right - width, left),
                isMaxHeightMatch: this.isMaxHeightMatch(index, height, top, bottom - height),
                isMinHeightMatch: this.isMinHeightMatch(index, height, top, bottom - height)
              }
            });
          }
          this.sizeChange.next(elementInfo);
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
