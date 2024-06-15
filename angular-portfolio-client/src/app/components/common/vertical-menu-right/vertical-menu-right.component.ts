import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@app/shared/models/category.model';

@Component({
  selector: 'q-vertical-menu-right',
  standalone: true,
  imports: [],
  templateUrl: './vertical-menu-right.component.html',
  styleUrl: './vertical-menu-right.component.scss'
})
export class VerticalMenuRightComponent implements OnChanges{
 
  @Input({required: true}) items: Category[] = [];
  
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  document: Document = inject(DOCUMENT);
  
  sectionId: string = this.activatedRoute.snapshot.queryParams['sectionId'];


  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['items'].isFirstChange()) {
      this.sectionId = this.items[0].id;
      this.router.navigate([], { queryParams: {sectionId: this.sectionId } });
      const element = this.document.getElementById(this.sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  handleMenuItemClick(id: string) {
    const element = this.document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    this.sectionId = id;
    this.router.navigate([], { queryParams: {sectionId: id } });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const sections = this.document.querySelectorAll('.section');

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= 165) {
        this.sectionId = section.id;
        this.router.navigate([], { queryParams: {sectionId: this.sectionId } })
      }
    });
  }
}

