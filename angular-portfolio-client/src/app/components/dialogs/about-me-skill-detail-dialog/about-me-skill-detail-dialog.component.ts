import { Component, OnInit, inject } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'q-about-me-skill-detail-dialog',
  standalone: true,
  imports: [],
  templateUrl: './about-me-skill-detail-dialog.component.html',
  styleUrl: './about-me-skill-detail-dialog.component.scss'
})
export class AboutMeSkillDetailDialogComponent implements OnInit{
  private dialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig);

  ngOnInit(): void {
   const id = this.dialogConfig.data.id;
  }
}
