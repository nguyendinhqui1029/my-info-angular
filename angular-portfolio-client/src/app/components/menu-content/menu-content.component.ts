import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'q-menu-content',
  standalone: true,
  imports: [RouterLink, NgClass, AvatarModule, ButtonModule, TranslateModule],
  templateUrl: './menu-content.component.html',
  styleUrl: './menu-content.component.scss'
})
export class MenuContentComponent {
  @Input({required: true}) isVertical!: boolean;
}
