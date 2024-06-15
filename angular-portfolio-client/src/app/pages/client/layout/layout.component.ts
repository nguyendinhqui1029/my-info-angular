import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@app/components/footer/footer.component';
import { MenuTopComponent } from '@app/components/menu-top/menu-top.component';
import { ContainerChangeSizeDirective } from '@app/shared/directives/container-change-size.directive';
import { ContainerSize } from '@app/shared/models/container-size.mode';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, MenuTopComponent, FooterComponent, ContainerChangeSizeDirective],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
// Element Container 
contentLayoutWrapper!: ContainerSize;

handleContentLayoutWrapperChangeSize(element: ContainerSize) {
  this.contentLayoutWrapper = element;
}
}
