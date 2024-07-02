import { ChangeDetectorRef, Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { VerticalMenuLeftComponent } from '@app/components/common/vertical-menu-left/vertical-menu-left.component';
import { VerticalMenuRightComponent } from '@app/components/common/vertical-menu-right/vertical-menu-right.component';
import { ContainerChangeSizeDirective } from '@app/shared/directives/container-change-size.directive';
import { ContainerSize } from '@app/shared/models/container-size.mode';
import { ContentSection } from '@app/shared/models/content-section.model';
import { CategoryService } from '@app/shared/services/category.service';
import { CommonService } from '@app/shared/services/common.service';
import { SkillContentService } from '@app/shared/services/skill-content.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'q-skills',
  standalone: true,
  imports: [VerticalMenuLeftComponent, VerticalMenuRightComponent, ContainerChangeSizeDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  providers: [CategoryService]
})
export class SkillsComponent implements OnDestroy, OnInit {

  private subscription: Subscription | undefined;
  private subscriptionListenMenuHeightChange: Subscription | undefined;

  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  skillContentService: SkillContentService = inject(SkillContentService);
  private translateService: TranslateService = inject(TranslateService);
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private categoryService: CategoryService = inject(CategoryService);
  private commonService: CommonService = inject(CommonService);

  isOpenMenuLeft: boolean = true;
  isOpenMenuRight: boolean = true;
  sectionMenuRightWidth: string = '12.25rem';
  menuTopHeight: string = '10rem';
  skillId: string = '';

  initParentId: string = '';
  initChildId: string = '';
  initSectionId: string = '';

  contentList = this.skillContentService.getSkillContent({ skillId: this.skillId, parentCategoryId: this.initParentId, childCategoryId: this.initChildId }).result;
  menuList = this.categoryService.getCategories(this.skillId).result;

  contentSection = computed(() => (this.contentList()?.data?.data || []).map((item: ContentSection) => ({
    id: item.id,
    label: item.header,
    icon: '',
    children: []
  })));

  menuListDisplayUi = computed(() => this.menuList()?.data?.data || []);

  // Element Container 
  skillWrapper!:Record<string, ContainerSize>;

  handleSkillWrapperChangeSize(element: Record<string, ContainerSize>) {
    this.skillWrapper = element;
    this.isOpenMenuLeft = !this.skillWrapper?.['730'].isMaxWidthMatch;
    this.isOpenMenuRight = !this.skillWrapper?.['900'].isMaxWidthMatch;
  this.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.skillId = params['id'];
      this.categoryService.refetchCategories();
        if(this.menuListDisplayUi().length) {
          this.initParentId = this.menuListDisplayUi()[0].id;
          if (this.menuListDisplayUi()[0].children[0].id) {
            this.initChildId = this.menuListDisplayUi()[0].children[0].id;
          }
        }
    });

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if(params['parentId'] !== this.initParentId || params['childId'] !== this.initChildId) {
        this.initParentId = params['parentId'];
        if (params['childId']) {
          this.initChildId = params['childId'];
        }
        this.skillContentService.refetchSkillContent();
      }
    });


    this.subscription = this.translateService.onLangChange.subscribe(() => {
      this.skillContentService.refetchSkillContent();
      this.categoryService.refetchCategories();
    });

    this.subscriptionListenMenuHeightChange = this.commonService.menuTopHeightSubject.subscribe((height: number) => {
      this.menuTopHeight = `${Math.floor(height/16)}rem`;
    });
  }

  handleCategoryClick(item: { parentId: string; childId?: string; }) {
    let params: Record<string, string | undefined> = {
      parentId: item.parentId
    };

    if (item?.childId) {
      params['childId'] = item.childId;
    }
    // Merge query params
    if(this.activatedRoute.snapshot.queryParams) {
      params = {...this.activatedRoute.snapshot.queryParams, ...params};
    }

    this.router.navigate([], { queryParams: { ...params } });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if(this.subscriptionListenMenuHeightChange) {
      this.subscriptionListenMenuHeightChange.unsubscribe();
    }
  }
}
