import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'rating-component',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RatingComponent implements OnInit {
  @Input('rating') private rating: number = 3;
  @Input('starCount') private starCount: number = 5;
  @Input('color') public color: string;
  @Input('readOnly') private readOnly: boolean = false;
  @Output() private ratingUpdated = new EventEmitter();

  snackBarDuration: number = 2000; //Set Timeout for alert
  ratingArr = [];

  constructor(private snackBar: MatSnackBar) {

  }


  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    this.ratingUpdated.subscribe(rating => { this.rating = rating; });
  }
  onClick(rating: number) {
    // Show alert
    // this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
    //   duration: this.snackBarDuration
    // });
    if (this.readOnly) {
      return false;
    }
    this.ratingUpdated.emit(rating);
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
