import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { MENU_ITEMS } from '@app/constants/menu.const';
import { MenuItem } from '@app/shared/models/menu.mode';
import { UserService } from '@app/shared/services/user.service';
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

  
  private unSubscribeLoginSubject: Subscription | undefined;

  menuItems = signal<MenuItem[]>(MENU_ITEMS);
  menuActive = signal<string>('');
  isLogin = signal<boolean>(true);

  isActive = computed(() => this.menuActive() );

  ngOnInit(): void {
    this.unSubscribeLoginSubject =  this.userService.isLoginSubject.subscribe((value: boolean) => this.isLogin.set(value));
  }

  ngOnDestroy() {
    if(this.unSubscribeLoginSubject) {
      this.unSubscribeLoginSubject.unsubscribe();
    }
  }
}
