import { Component, signal } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { MenuContentComponent } from '@components/menu-content/menu-content.component';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ChangeSiteModeComponent } from '@components/site-mode/change-site-mode.component';

@Component({
  selector: 'q-menu-top',
  standalone: true,
  imports: [  SidebarModule, 
    MenuContentComponent, 
    AvatarModule, ButtonModule, 
    TooltipModule, TranslateModule, 
    ChangeSiteModeComponent],
  templateUrl: './menu-top.component.html',
  styleUrl: './menu-top.component.scss'
})
export class MenuTopComponent {

  sidebarVisible = signal<boolean>(false);
  isLogin = signal<boolean>(false);

  handleToggleMenuClick() {
    this.sidebarVisible.update((value: boolean) => !value);
  }

  

  handleOpenSearchDialog() {
    console.log('handleOpenSearchDialog')
  }

  handleOpenSelectLanguageDialog() {
    console.log('handleOpenSearchDialog')
  }
}
