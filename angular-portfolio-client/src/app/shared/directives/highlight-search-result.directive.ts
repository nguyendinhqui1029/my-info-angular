import { Directive, Input, ElementRef, inject, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[highlightSearchResultDirective]',
  standalone: true
})
export class HighlightSearchResultDirective implements OnChanges{
  @Input({required: true}) keyword!: string;
  @Input({required: true}) content!: string;
  private elementRef: ElementRef = inject(ElementRef);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['keyword'].currentValue) {
      const contentClone = this.content;
      const firstPosition = contentClone.toLowerCase().indexOf(changes['keyword'].currentValue.trim());
      if(firstPosition === -1) {
        this.elementRef.nativeElement.innerText = this.content;
        return;
      }
      const contentTransform = `${this.content.substring(0,firstPosition)}<span class="text-highlight">${this.content.substring(firstPosition,firstPosition + changes['keyword'].currentValue.length)}</span>${this.content.substring(firstPosition + changes['keyword'].currentValue.length)}`;
      this.elementRef.nativeElement.innerHTML = contentTransform;
    }
  }
}