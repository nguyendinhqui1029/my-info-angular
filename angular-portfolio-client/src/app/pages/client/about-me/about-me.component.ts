import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ContactComponent } from '@app/components/common/about-me/contact/contact.component';
import { EducationComponent } from '@app/components/common/about-me/education/education.component';
import { ExperienceComponent } from '@app/components/common/about-me/experience/experience.component';
import { HobbiesComponent } from '@app/components/common/about-me/hobbies/hobbies.component';
import { IntroduceMyselfComponent } from '@app/components/common/about-me/introduce-myself/introduce-myself.component';
import { ProjectsComponent } from '@app/components/common/about-me/projects/projects.component';
import { SkillsComponent } from '@app/components/common/about-me/skills/skills.component';
import { WorkComponent } from '@app/components/common/about-me/work/work.component';
import { CarouselWrapperComponent } from '@app/components/common/carousel-wrapper/carousel-wrapper.component';
import { ContainerChangeSizeDirective } from '@app/shared/directives/container-change-size.directive';
import { ApiResponse } from '@app/shared/models/api-response.model';
import { ContainerSize } from '@app/shared/models/container-size.mode';
import { AboutMeResponseValue, Experience, IntroduceMySelf } from '@app/shared/models/personal-info.model';
import { ContainerSizePipe } from '@app/shared/pipes/container-size.pipe';
import { AboutMeService } from '@app/shared/services/about-me.service';
import { QueryObserverResult } from '@ngneat/query';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'q-about-me',
  standalone: true,
  imports: [
    IntroduceMyselfComponent,
    ExperienceComponent,
    SkillsComponent,
    WorkComponent,
    EducationComponent,
    ProjectsComponent,
    ContactComponent,
    HobbiesComponent,
    ContainerSizePipe,
    ContainerChangeSizeDirective],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  translateService: TranslateService = inject(TranslateService);
  aboutMeService: AboutMeService = inject(AboutMeService);
  introduceMySelf!: IntroduceMySelf;
  experience!: Experience;

  private subscription: Subscription | undefined;
  private subscriptionGetAboutMe: Subscription | undefined;


  // Element Container 
  aboutMeLayoutWrapper: Record<string, ContainerSize> = {};

  handleAboutMeLayoutWrapperWrapperChangeSize(element: Record<string, ContainerSize>) {
    this.aboutMeLayoutWrapper = element;
    this.changeDetectorRef.detectChanges();
  }


  ngOnInit() {
    this.subscription = this.translateService.onLangChange.subscribe(() => {
      this.aboutMeService.refetchAboutMe();
    });
    this.subscriptionGetAboutMe = this.aboutMeService.getAboutMe().result$.subscribe((value: QueryObserverResult<ApiResponse<AboutMeResponseValue>>) => {
      this.introduceMySelf = {
        fullName: value.data?.data?.introduceMySelf?.fullName || '',
        position: value.data?.data?.introduceMySelf?.position || '',
        description: value.data?.data?.introduceMySelf?.description || '',
        avatarUrl: value.data?.data?.introduceMySelf?.avatarUrl || '',
        social: value.data?.data?.introduceMySelf?.social || []
      };

      this.experience = {
        subDescription: value.data?.data?.experience?.subDescription || '',
        description: value.data?.data?.experience?.description || '',
        image: value.data?.data?.experience?.image || '',
        statistic: value.data?.data?.experience?.statistic || []
      };
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.subscriptionGetAboutMe) {
      this.subscriptionGetAboutMe.unsubscribe();
    }

  }
}
