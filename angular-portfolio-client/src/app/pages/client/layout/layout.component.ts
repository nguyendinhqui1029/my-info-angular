import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@app/components/footer/footer.component';
import { MenuTopComponent } from '@app/components/menu-top/menu-top.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, MenuTopComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
 
}
