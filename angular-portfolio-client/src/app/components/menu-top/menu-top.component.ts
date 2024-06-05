import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

import { MenuItem } from '@app/shared/models/menu.mode';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '@app/shared/services/user.service';

import { MenuContentComponent } from '@components/menu-content/menu-content.component';
import { ChangeSiteModeComponent } from '@components/site-mode/change-site-mode.component';
import { LoginDialogComponent } from '@app/components/dialogs/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '@components/dialogs/register-dialog/register-dialog.component';
import { SearchDialogComponent } from '@components/dialogs/search-dialog/search-dialog.component';
import { SelectLanguageDialogComponent } from '@components/dialogs/select-language-dialog/select-language-dialog.component';

@Component({
  selector: 'q-menu-top',
  standalone: true,
  imports: [
    ...PrimeComponent,
    MenuContentComponent,
    ChangeSiteModeComponent],
  templateUrl: './menu-top.component.html',
  styleUrl: './menu-top.component.scss',
  providers: [DialogService]
})
export class MenuTopComponent implements OnInit, OnDestroy {
  
  private dialogService: DialogService = inject(DialogService);
  private translateService: TranslateService = inject(TranslateService);
  private userService: UserService = inject(UserService);

  private unSubscribeLoginSubject: Subscription | undefined;

  sidebarVisible = signal<boolean>(false);
  isLogin = signal<boolean>(true);

  dynamicDialogRef: DynamicDialogRef | undefined;


  ngOnInit(): void {
   this.unSubscribeLoginSubject =  this.userService.isLoginSubject.subscribe((value: boolean) => this.isLogin.set(value));
  }

  handleToggleMenuClick() {
    this.sidebarVisible.update((value: boolean) => !value);
  }

  handleOpenSearchDialog() {
    this.dynamicDialogRef = this.dialogService.open(SearchDialogComponent, {
      header: this.translateService.instant('button_search'),
      width: '50vw',
      contentStyle: { overflow: 'auto' },
      closeOnEscape: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      }
    });

    // Handle dialog closed 
    this.dynamicDialogRef.onClose.subscribe((language: string) => {
      if (!language) {
        return;
      }
    });
  }

  handleOpenRegisterDialog() {
    this.dynamicDialogRef = this.dialogService.open(RegisterDialogComponent, {
      header: this.translateService.instant('register_header'),
      width: '55vw',
      contentStyle: { overflow: 'auto'},
      breakpoints: {
        '960px': '90vw',
        '640px': '95vw'
      }
    });

    // Handle dialog closed 
    this.dynamicDialogRef.onClose.subscribe((language: string) => {
      if (!language) {
        return;
      }
      this.translateService.use(language);
    });
  }

  handleOpenLoginDialog() {
    this.dynamicDialogRef = this.dialogService.open(LoginDialogComponent, {
      header: this.translateService.instant('login_header'),
      width: '50vw',
      contentStyle: { overflow: 'auto'},
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      }
    });

    // Handle dialog closed 
    this.dynamicDialogRef.onClose.subscribe((language: string) => {
      if (!language) {
        return;
      }

    });
  }
  
  handleOpenSelectLanguageDialog() {
    this.dynamicDialogRef = this.dialogService.open(SelectLanguageDialogComponent, {
      header: this.translateService.instant('select_language'),
      width: '70em',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      }
    });

    // Handle dialog closed 
    this.dynamicDialogRef.onClose.subscribe((language: string) => {
      console.log(1);
      if (!language) {
        return;
      }
      this.translateService.use(language);
    });
  }

  handleLogout() {

  }

  handleMenuItemClick(menu: MenuItem) {
    console.log(menu);
  }

  handleAvatarUserClick() {
    console.log('handleAvatarUserClick');
  }

  ngOnDestroy() {
    if (this.dynamicDialogRef) {
      this.dynamicDialogRef.close();
    }
    if(this.unSubscribeLoginSubject) {
      this.unSubscribeLoginSubject.unsubscribe();
    }
  }
}
