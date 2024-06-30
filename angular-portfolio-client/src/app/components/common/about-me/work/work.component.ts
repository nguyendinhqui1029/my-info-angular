import { Component, Input, OnDestroy, inject } from '@angular/core';
import { ViewDetailCompanyDialogComponent } from '@app/components/dialogs/view-detail-company-dialog/view-detail-company-dialog.component';
import { Work } from '@app/shared/models/personal-info.model';
import { TimelineComponent } from '@components/common/timeline/timeline.component';
import { TranslateModule } from '@ngx-translate/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'q-work',
  standalone: true,
  imports: [TimelineComponent, TranslateModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
  providers: [DialogService]
})
export class WorkComponent implements OnDestroy{
  @Input({ required: true }) work!: Work;
  private dialogService: DialogService = inject(DialogService);

  dynamicDialogRef: DynamicDialogRef | undefined;
  handleOpenViewDetailDialog(id: string) {
    this.dynamicDialogRef = this.dialogService.open(ViewDetailCompanyDialogComponent, {
      width: '90vw',
      data: {
        id
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
