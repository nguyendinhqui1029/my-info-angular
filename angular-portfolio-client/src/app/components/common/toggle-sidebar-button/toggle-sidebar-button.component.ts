import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';

@Component({
  selector: 'q-toggle-sidebar-button',
  standalone: true,
  imports: [PrimeComponent, NgStyle],
  templateUrl: './toggle-sidebar-button.component.html',
  styleUrl: './toggle-sidebar-button.component.scss'
})
export class ToggleSidebarButtonComponent implements OnChanges{
  @Input({ required: false }) isDisabled: boolean = false;
  @Input({ required: true }) isOpen!: boolean;
  @Input({ required: true }) tooltipMessage!: string;
  @Input({ required: false }) position: 'right' | 'left' = 'left';
  @Output() eventClick = new EventEmitter<boolean>();

  topLineHight: string = '0px';
  topLineRotate: string = '0deg';
  bottomLineHight: string = '0px';
  bottomLineRotate: string = '0deg';

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isOpen']?.currentValue !== null) {
      if (!changes['isOpen']?.currentValue) {
        this.topLineHight = '0.08rem';
        this.topLineRotate = this.position === 'left' ? '-20deg' :'20deg';
        this.bottomLineHight = '-0.08rem';
        this.bottomLineRotate = this.position === 'left' ? '20deg' :'-20deg';
        return;
      }
      this.topLineHight = '0';
      this.topLineRotate = '0deg';
      this.bottomLineHight = '0';
      this.bottomLineRotate = '0deg';
    }
  }

  handleMouseOver() {
    if(this.isDisabled) {
      return;
    }
    if (this.isOpen) {
      this.topLineHight = '0.08rem';
      this.topLineRotate = this.position === 'left' ? '20deg' :'-20deg';
      this.bottomLineHight = '-0.08rem';
      this.bottomLineRotate = this.position === 'left' ? '-20deg' :'20deg';
      return;
    }
    this.topLineHight = '0.08rem';
    this.topLineRotate = this.position === 'left' ? '-20deg' :'20deg';
    this.bottomLineHight = '-0.08rem';
    this.bottomLineRotate = this.position === 'left' ? '20deg' :'-20deg';
  }
  handleMouseOut() {
    if(this.isDisabled) {
      return;
    }
    if (this.isOpen) {
      this.topLineHight = '0';
      this.topLineRotate = '0deg';
      this.bottomLineHight = '0';
      this.bottomLineRotate = '0deg';
    }
  }

  handleToggle() {
    if(this.isDisabled) {
      return;
    }
    this.isOpen = !this.isOpen;
    this.eventClick.next(this.isOpen);
    if (this.isOpen) {
      this.topLineHight = '0';
      this.topLineRotate = '0deg';
      this.bottomLineHight = '0';
      this.bottomLineRotate = '0deg';
      return;
    }
    this.topLineHight = '0.08rem';
    this.topLineRotate = this.position === 'left' ? '-20deg' :'20deg';
    this.bottomLineHight = '-0.08rem';
    this.bottomLineRotate = this.position === 'left' ? '20deg' :'-20deg';
  }
}
