import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breadcrumb } from '@app/shared/models/breadcrumb.model';

@Component({
  selector: 'q-header-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-page.component.html',
  styleUrl: './header-page.component.scss'
})
export class HeaderPageComponent {
  @Input({required: true}) title: string = '';
  @Input({required: false}) description: string = '';
  @Input({required: true}) breadcrumbItems: Breadcrumb[] = [];
}
