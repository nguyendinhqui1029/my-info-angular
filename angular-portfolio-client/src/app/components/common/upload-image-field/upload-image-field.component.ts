import { Component, Input, OnInit, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { TranslateService } from '@ngx-translate/core';
import { FileSelectEvent } from 'primeng/fileupload';

@Component({
  selector: 'q-upload-image-field',
  standalone: true,
  imports: [PrimeComponent],
  templateUrl: './upload-image-field.component.html',
  styleUrl: './upload-image-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadImageFieldComponent),
      multi: true
    }
  ]
})
export class UploadImageFieldComponent implements OnInit, ControlValueAccessor {
  @Input({ required: false }) acceptFileType: string = 'image/*';
  @Input({ required: false }) maxFileSize: number = 30 * Math.pow(1024, 3);
  @Input({ required: false }) isMultiple: boolean = true;
  @Input({ required: true }) label: string = 'Upload image';
  @Input({ required: false }) errorMessage: string = '';
  @Input({ required: false }) dimension: { width: string; height: string; unit: string } = { width: '', height: '', unit: '' };

  translationService: TranslateService = inject(TranslateService);
  
  files: File[] = [];
  totalSize: number = 0;
  totalSizePercent: number = 0;

  onChange: any = () => { };
  onTouch: any = () => { };
  id: string = new Date().getTime().toString();
  description = {
    dimension: '',
    fileType: '',
    maxSize: ''
  };


  ngOnInit(): void {
    const width = this.dimension?.width;
    const height = this.dimension?.width;
    const unit = this.dimension?.unit;
    const acceptFileType = this.acceptFileType;
    const maxFileSize = this.maxFileSize;
    this.description = this.initDescriptionImage(width, height, unit, acceptFileType,maxFileSize);
  }

  initDescriptionImage(width: string, height: string, unit: string, acceptFileType: string, maxFileSize: number) {
    width = width || '';
    height = height || '';
    unit = unit || 'px';
    acceptFileType = acceptFileType || this.translationService.instant('all_type');
    maxFileSize = maxFileSize || 30 * Math.pow(1024, 3);
    return {
      dimension: `${width}${unit} x ${height}${unit}`,
      fileType: acceptFileType,
      maxSize: this.formatSize(maxFileSize)
    };;
  }
  writeValue(value: File[]): void {
    if (value.length) {
      this.files = value;
    } else {
      this.files = [];
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }


  choose(_event: Event, callback: Function) {
    callback();
  }

  onRemoveTemplatedFile(event: Event, file: File, removeFileCallback: Function, index: number) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
  }

  onTemplatedUpload() {
    console.log(1);
  }

  onSelectedFiles(event: FileSelectEvent) {
    this.files = event.currentFiles;
    if (this.onChange) {
      this.onChange(this.files);
    }
    this.files.forEach((file: File) => {
      this.totalSize += parseInt(this.formatSize(file.size));
    });
    this.totalSizePercent = this.totalSize / 10;
  }

  uploadEvent(callback: Function) {
    callback();
  }

  formatSize(bytes: number) {
    const k = 1024;
    const dm = 3;
    const sizes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
    return `${formattedSize} ${sizes[i]}`;
  }
}
