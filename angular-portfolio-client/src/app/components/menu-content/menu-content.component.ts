import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { MenuItem } from '@app/shared/models/menu.mode';
import { MenuService } from '@app/shared/services/menu.service';
import { UserService } from '@app/shared/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'q-menu-content',
  standalone: true,
  imports: [RouterLink, NgClass, PrimeComponent],
  templateUrl: './menu-content.component.html',
  styleUrl: './menu-content.component.scss'
})
export class MenuContentComponent  implements OnInit, OnDestroy {
 
  @Input({required: true}) isVertical!: boolean;
  @Output() avatarUserClick= new EventEmitter();
  @Output() menuItemClick= new EventEmitter<MenuItem>();

  private userService: UserService = inject(UserService);
  private menuService: MenuService = inject(MenuService);
  translateService:TranslateService = inject(TranslateService);
  
  private unSubscribeLoginSubject: Subscription | undefined;
  private unSubscribeTranslateSubject: Subscription | undefined;
  menuItems = this.menuService.getClientMenu().result;
  menuActive = signal<string>('');
  isLogin = signal<boolean>(true);

  isActive = computed(() => this.menuActive() );

  ngOnInit(): void {
    this.unSubscribeTranslateSubject = this.translateService.onLangChange.subscribe(() => {
      this.menuService.refetchClientMenu();
    });
    this.unSubscribeLoginSubject =  this.userService.isLoginSubject.subscribe((value: boolean) => this.isLogin.set(value));
  }

  ngOnDestroy() {
    if(this.unSubscribeLoginSubject) {
      this.unSubscribeLoginSubject.unsubscribe();
    }
    if(this.unSubscribeTranslateSubject) {
      this.unSubscribeTranslateSubject.unsubscribe();
    }
  }
}
