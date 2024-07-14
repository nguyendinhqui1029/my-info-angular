import { Component, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { LanguageItem } from '@app/shared/models/language.model';
import { LanguageService } from '@app/shared/services/language.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'q-multiple-language-dialog',
  standalone: true,
  imports: [FormsModule, PrimeComponent],
  templateUrl: './multiple-language-dialog.component.html',
  styleUrl: './multiple-language-dialog.component.scss'
})
export class MultipleLanguageDialogComponent implements OnInit{
  
  private languageService: LanguageService = inject(LanguageService);
  private dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  private dialogConfig: DynamicDialogConfig = inject(DynamicDialogConfig);

  initializeLanguage: string[] = [];
  languages = this.languageService.getLanguages().result;
  selectedLanguage: string[] = [];
  
  ngOnInit(): void {
    this.initializeLanguage = this.dialogConfig.data.initializeLanguage;
    this.selectedLanguage = [...this.initializeLanguage];
  }

  handleOkClick() {
    const newItemSelected = this.languages().data?.data?.filter((item: LanguageItem) => !this.initializeLanguage.includes(item.code) && this.selectedLanguage.includes(item.code));
    this.dynamicDialogRef.close(newItemSelected);
  }
}
