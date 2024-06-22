import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
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
import { Router } from '@angular/router';
import { ContainerChangeSizeDirective } from '@app/shared/directives/container-change-size.directive';
import { ContainerSize } from '@app/shared/models/container-size.mode';
import { CommonService } from '@app/shared/services/common.service';
import { ContainerSizePipe } from '@app/shared/pipes/container-size.pipe';

@Component({
  selector: 'q-menu-top',
  standalone: true,
  imports: [
    ...PrimeComponent,
    MenuContentComponent,
    ChangeSiteModeComponent,
    ContainerChangeSizeDirective,
    ContainerSizePipe],
  templateUrl: './menu-top.component.html',
  styleUrl: './menu-top.component.scss',
  providers: [DialogService]
})
export class MenuTopComponent implements OnInit, OnDestroy {
  
  private dialogService: DialogService = inject(DialogService);
  private translateService: TranslateService = inject(TranslateService);
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);
  private commonService: CommonService = inject(CommonService);

  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  
  private unSubscribeLoginSubject: Subscription | undefined;

  sidebarVisible:boolean = false;
  isLogin = signal<boolean>(true);

  dynamicDialogRef: DynamicDialogRef | undefined;

  // Element Container 
  menuTopWrapper:Record<string,ContainerSize> = {};

  handleMenuTopWrapperChangeSize(element: Record<string,ContainerSize>) {
    this.menuTopWrapper = element ;
    this.commonService.setHeight(this.menuTopWrapper?.['688']?.height + this.menuTopWrapper?.['688']?.paddingBottom + this.menuTopWrapper?.['688']?.paddingTop); 
  this.changeDetectorRef.detectChanges();
  }
  
  ngOnInit(): void {
   this.unSubscribeLoginSubject =  this.userService.isLoginSubject.subscribe((value: boolean) => this.isLogin.set(value));
  }

  handleToggleMenuClick() {
    this.sidebarVisible = !this.sidebarVisible;
  this.changeDetectorRef.detectChanges();
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
      width: '35vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '90rem': '40vw',
        '60rem': '70vw',
        '40rem': '90vw'
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

  handleLogout() {

  }

  handleMenuItemClick(menu: MenuItem) {
    this.router.navigate([menu.path]);
  }

  handleNavigateToHome() {
    this.router.navigate(['']);
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
