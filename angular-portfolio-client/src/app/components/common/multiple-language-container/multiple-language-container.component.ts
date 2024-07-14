import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ContentChild, Input, OnChanges, OnDestroy, SimpleChanges, TemplateRef, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultipleLanguageDialogComponent } from '@app/components/dialogs/multiple-language-dialog/multiple-language-dialog.component';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { LanguageItem } from '@app/shared/models/language.model';
import { MultipleLanguage } from '@app/shared/models/multiple-language.model';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'q-multiple-language-container',
  standalone: true,
  imports: [CommonModule, FormsModule, PrimeComponent],
  templateUrl: './multiple-language-container.component.html',
  styleUrl: './multiple-language-container.component.scss',
  providers: [DialogService, ConfirmationService]
})
export class MultipleLanguageContainerComponent<T> implements OnChanges, OnDestroy {
  @Input({required: true}) initializeData!: T;
  @Input({required: true}) initializeLanguages: MultipleLanguage<T>[] = [];
  @ContentChild('formDataTemplate') formDataTemplate: TemplateRef<any> | null = null;


  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private dialogService: DialogService = inject(DialogService);
  private translateService: TranslateService = inject(TranslateService);
  private dynamicDialogRef: DynamicDialogRef | undefined;
  private confirmationService: ConfirmationService = inject(ConfirmationService);

  languageItems: MultipleLanguage<T>[] = [];
  activeLanguage!: MultipleLanguage<T> | undefined;
  defaultLanguageCode!: string;
  isDefaultLanguageCheckbox: boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['initializeLanguages'] && changes['initializeLanguages'].currentValue.length) {
      this.activeLanguage = this.initializeLanguages.find((item: MultipleLanguage<T>)=>item.isDefault);
      this.isDefaultLanguageCheckbox = this.activeLanguage?.isDefault || false ;
      this.defaultLanguageCode = this.activeLanguage?.languageCode || environment.defaultLanguage;
      this.languageItems = [...this.initializeLanguages];
    }
  }

  handleChangeDefaultLanguage(event: CheckboxChangeEvent) {
    this.isDefaultLanguageCheckbox = event.checked;
    this.defaultLanguageCode = this.activeLanguage!.languageCode;
    this.languageItems = this.languageItems.map((item: MultipleLanguage<T>) => ({...item, isDefault: this.activeLanguage?.languageCode === item.languageCode}));
    this.changeDetectorRef.detectChanges();
  }

  handleTabChange(index: number) {
    const selectItem = this.languageItems[index];
    this.activeLanguage = selectItem;
    this.isDefaultLanguageCheckbox = selectItem.isDefault;
  }

  handleOpenDialogSelectLanguage() {
    this.dynamicDialogRef = this.dialogService.open(MultipleLanguageDialogComponent, {
      header: this.translateService.instant('select_language'),
      width: '60vw',
      data: {
        initializeLanguage: this.languageItems.map((item: MultipleLanguage<T>) => item.languageCode)
      },
      contentStyle: { overflow: 'auto' },
      closeOnEscape: true,
      breakpoints: {
        '1360px': '60vw',
        '344px': '100vw'
      }
    });

    // Handle dialog closed 
    this.dynamicDialogRef.onClose.subscribe((language: LanguageItem[]) => {
      if (!language) {
        return;
      }
      this.languageItems.push(...language.map((item: LanguageItem) => ({
        languageCode: item.code,
        name: item.name,
        isDefault: false,
        icon: item.flag,
        data: this.initializeData
    })));
    });
  }

  handleTabViewClose(event: Event, index: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translateService.instant('confirm_delete_message', {language: this.languageItems[index].name}),
      header: this.translateService.instant('confirm_delete_header'),
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-outlined p-button-sm",
      acceptButtonStyleClass:"p-button p-button-sm",
      accept: () => {
        this.languageItems.splice(index, 1);
        const selectItem = this.languageItems.find((item: MultipleLanguage<T>)=>item.isDefault);
        this.activeLanguage = selectItem;
        this.isDefaultLanguageCheckbox = selectItem!.isDefault;
        this.changeDetectorRef.detectChanges();
      },
      reject: () => {
        return;
      }
  });
  }

  ngOnDestroy() {
    if (this.dynamicDialogRef) {
      this.dynamicDialogRef.close();
    }
  }
}
