import { Component, Input, OnDestroy, inject } from '@angular/core';
import { AboutMeSkillDetailDialogComponent } from '@app/components/dialogs/about-me-skill-detail-dialog/about-me-skill-detail-dialog.component';
import { CommonOption } from '@app/shared/models/common-option.model';
import { Skill } from '@app/shared/models/personal-info.model';
import { RatingLevelComponent } from '@components/common/rating-level/rating-level.component';
import { TranslateModule } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'q-skills',
  standalone: true,
  imports: [TranslateModule, RatingLevelComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  providers: [DialogService]
})
export class SkillsComponent implements OnDestroy {
  @Input({required: true}) skill!: Skill;

  private dialogService: DialogService = inject(DialogService);

  dynamicDialogRef: DynamicDialogRef | undefined;
  
  handleViewDetail(item: CommonOption) {
    this.dynamicDialogRef = this.dialogService.open(AboutMeSkillDetailDialogComponent, {
      header: `${item.name} Skill`,
      width: '90vw',
      data: {
        id: item.value
      },
      contentStyle: { overflow: 'auto' },
      closeOnEscape: true,
      breakpoints: {
        '1360px': '90vw',
        '344px': '100vw'
      }
    });
  }

  ngOnDestroy() {
    if (this.dynamicDialogRef) {
      this.dynamicDialogRef.close();
    }
  }
}
