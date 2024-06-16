import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { Category } from '@app/shared/models/category.model';
import { ToggleSidebarButtonComponent } from '@components/common/toggle-sidebar-button/toggle-sidebar-button.component';

@Component({
  selector: 'q-vertical-menu-right',
  standalone: true,
  imports: [PrimeComponent, ToggleSidebarButtonComponent],
  templateUrl: './vertical-menu-right.component.html',
  styleUrl: './vertical-menu-right.component.scss'
})
export class VerticalMenuRightComponent implements OnChanges{
  @Input({required: true}) items: Category[] = [];
  @Input({ required: true }) isOpen: boolean = false;

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  document: Document = inject(DOCUMENT);
  
  sectionId: string = this.activatedRoute.snapshot.queryParams?.['sectionId'];
  sectionMenuRightWidth: string = '14.75rem';
  isToggle: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['items']?.isFirstChange() && this.items?.length) {
      if(!this.activatedRoute.snapshot.queryParams?.['sectionId']) {
        this.sectionId = this.items[0].id;
      }

      const element = this.document.getElementById(this.sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
      this.router.navigate([], { queryParams: {...this.activatedRoute.snapshot.queryParams, sectionId: this.sectionId } });
    }

    if (changes['isOpen']?.currentValue !== undefined) {
      this.isToggle = changes['isOpen']?.currentValue;
      this.sectionMenuRightWidth = this.isToggle ? '12.25rem' : '0rem';
      console.log(this.isToggle)
    }
  }

  handleMenuItemClick(id: string) {
    const element = this.document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    this.sectionId = id;
    this.router.navigate([], { queryParams: {...this.activatedRoute.snapshot.queryParams, sectionId: id } });
  }

  handleToggleSidebar(isOpen: boolean) {
    this.isToggle = isOpen;
    this.sectionMenuRightWidth = this.isToggle ? '12.25rem' : '0rem';
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const sections = this.document.querySelectorAll('.section');
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= 165) {
        this.sectionId = section.id;
      }
    });
    this.router.navigate([], { queryParams: {...this.activatedRoute.snapshot.queryParams, sectionId: this.sectionId, } })
  }
}

