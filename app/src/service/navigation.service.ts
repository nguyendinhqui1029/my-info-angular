import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LocatorService } from './locator.service';

@Injectable()
export class NavigationService {
  authService: AuthService;
  constructor(private ls: LocatorService, private router: Router, private route: ActivatedRoute, private location: Location) {
    this.authService = this.ls.getService<AuthService>('authService');
  }

  navigateTo(path) {
    if (path === 'logout') {
      this.authService.signOut();
      this.router.navigate(['/login'], { relativeTo: this.route });
    } else {
      this.router.navigate([path], { relativeTo: this.route });
    }

  }

  navigateBack() {
    this.location.back();
  }

  getPathParent(): string {
    let url = this.router.url.substring(1, this.router.url.length);
    return url.indexOf("/") < 0 ? url : url.substring(0, url.indexOf("/"));
  }
}