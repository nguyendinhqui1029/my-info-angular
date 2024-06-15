import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VerticalMenuLeftComponent } from '@app/components/common/vertical-menu-left/vertical-menu-left.component';
import { VerticalMenuRightComponent } from '@app/components/common/vertical-menu-right/vertical-menu-right.component';
import { ContainerChangeSizeDirective } from '@app/shared/directives/container-change-size.directive';
import { Category } from '@app/shared/models/category.model';
import { ContainerSize } from '@app/shared/models/container-size.mode';
import { ContentSection } from '@app/shared/models/content-section.model';
import { SkillContentService } from '@app/shared/services/skill-content.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'q-skills',
  standalone: true,
  imports: [VerticalMenuLeftComponent, VerticalMenuRightComponent, ContainerChangeSizeDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnDestroy, OnInit {

  private subscription: Subscription | undefined;


  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  skillContentService: SkillContentService = inject(SkillContentService);
  private translateService: TranslateService = inject(TranslateService);

  isOpenMenuLeft: boolean = true;
  menuList: Category[] = [];
  sectionMenuLeftWidth: string = '14.75rem';
  sectionMenuRightWidth: string = '12.25rem';
  skillId: string = '';

  initParentId = signal<string>('');
  initChildId = signal<string>('');

  contentList = this.skillContentService.getSkillContent({ skillId: this.skillId, parentCategoryId: this.initParentId(), childCategoryId: this.initChildId() }).result;
  contentSection = computed(() => (this.contentList()?.data?.data || []).map((item: ContentSection) => ({
    id: item.id,
    label: item.header,
    icon: '',
    children: []
  })));

  // Element Container 
  skillWrapper!: ContainerSize;

  handleSkillWrapperChangeSize(element: ContainerSize) {
    this.skillWrapper = element;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.skillId = params['id'];
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
          id: 'JAVASCRIPT1',
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
          id: 'JAVASCRIPT2',
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
          id: 'JAVASCRIPT3',
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
          id: 'JAVASCRIPT4',
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
          id: 'JAVASCRIPT5',
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
      if (this.menuList[0].children[0].id) {
        this.initChildId.set(this.menuList[0].children[0].id);
      }
    });

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.initParentId.set(params['parentId']);
      if (params['childId']) {
        this.initChildId.set(params['childId']);
      }
      this.skillContentService.refetchSkillContent();
    });


    this.subscription = this.translateService.onLangChange.subscribe(() => this.skillContentService.refetchSkillContent());


  }

  handleCategoryClick(item: { parentId: string; childId?: string; }) {
    let params: Record<string, string | undefined> = {
      parentId: item.parentId
    };
    if (item?.childId) {
      params['childId'] = item.childId;
    }
    this.router.navigate([], { queryParams: params })
  }

  handleToggleSidebar(isOpen: boolean) {
    this.isOpenMenuLeft = isOpen;
    this.sectionMenuLeftWidth = isOpen ? '14.75rem' : '0rem';
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
