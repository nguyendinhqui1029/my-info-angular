import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToggleSidebarButtonComponent } from '@app/components/common/toggle-sidebar-button/toggle-sidebar-button.component';
import { VerticalMenuLeftComponent } from '@app/components/common/vertical-menu-left/vertical-menu-left.component';
import { Category } from '@app/shared/models/category.model';

@Component({
  selector: 'q-skills',
  standalone: true,
  imports: [VerticalMenuLeftComponent, ToggleSidebarButtonComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent  {
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  isOpenMenuLeft: boolean = true;
  menuList: Category[] = [];
  sectionMenuLeftWidth: string = '14.75rem';
  sectionMenuRightWidth: string = '12.25rem';

  initParentId = signal<string>('');
  initChildId = signal<string>('');

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.menuList = [
        {
          id: 'HTML',
          label: 'Html',
          icon: '',
          children: [{
            id: 'HTML',
            label: 'Html',
            icon: '',
            children: []
          },
          {
            id: 'HTML1',
            label: 'Html1',
            icon: '',
            children: []
          }]
        },
        {
          id: 'CSS',
          label: 'Css',
          icon: '',
          children: [{
            id: 'FLEX',
            label: 'Flex',
            icon: '',
            children: []
          },
          {
            id: 'HTML1',
            label: 'Html1',
            icon: '',
            children: []
          },
          {
            id: 'HTML1',
            label: 'Html1',
            icon: '',
            children: []
          }]
        },
        {
          id: 'JAVASCRIPT',
          label: 'Javascript',
          icon: '',
          children: [{
            id: 'FUNCTION',
            label: 'Function',
            icon: '',
            children: []
          }]
        },
        {
          id: 'TEST',
          label: 'Test',
          icon: '',
          children: []
        }
      ];
      this.initParentId.set(this.menuList[0].id);
      if(this.menuList[0].children[0].id) {
        this.initChildId.set(this.menuList[0].children[0].id);
      }
    });

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.initParentId.set(params['parentId']);
      if(params['childId']) {
        this.initChildId.set(params['childId']);
      }
    });
  }

  handleCategoryClick(item: { parentId: string; childId?: string; }) {
    let params: Record<string, string | undefined> = {
      parentId: item.parentId
    };
    if(item?.childId) {
      params['childId'] = item.childId;
    }
    this.router.navigate([], { queryParams: params })
  }

  handleToggleSidebar(isOpen: boolean) {
    this.isOpenMenuLeft = isOpen;
    this.sectionMenuLeftWidth = isOpen ? '14.75rem' : '0rem';
  }
}
