import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit, forwardRef, inject, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { ApiResponse, ResponseErrorValue } from '@app/shared/models/api-response.model';
import { FileResponseValue } from '@app/shared/models/file.model';
import { FileService } from '@app/shared/services/file.service';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { FileSelectEvent } from 'primeng/fileupload';

@Component({
  selector: 'q-upload-image-field',
  standalone: true,
  imports: [PrimeComponent, JsonPipe],
  templateUrl: './upload-image-field.component.html',
  styleUrl: './upload-image-field.component.scss',
  providers: [
    ConfirmationService,
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

  private translationService: TranslateService = inject(TranslateService);
  private fileService: FileService = inject(FileService);
  private confirmationService: ConfirmationService = inject(ConfirmationService);

  fileNames: string[] = [];
  fileResponse= signal<FileResponseValue[]>([]);
  apiUrl: string = `${environment.resourceHost}/images/`;

  onChange: Function = () => { };
  onTouch: Function = () => { };
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
  writeValue(value: string[]): void {
    if (value.length) {
      this.fileNames = value;
      this.getFileByNames(this.fileNames);
    } else {
      this.fileNames = [];
      this.fileResponse.set([]);
    }
  }

  getFileByNames(names: string[]) {
    this.fileService.getFileByNames(names).subscribe((value: ApiResponse<FileResponseValue[]>)=>{
      this.fileResponse.set(value?.data?.length ? value?.data : []);
    });
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

  onClearContent() {
    this.fileService.deleteFileByIds(this.fileResponse().map((item: FileResponseValue)=>item._id)).subscribe((value: ApiResponse<FileResponseValue[]>)=>{
      if(value.statusCode === 200) {
        this.fileResponse.set([]);
        this.fileNames = [];
        this.onChange(this.fileNames);
      }
    });
  }
  onRemoveTemplatedFile(event: Event, index: number) {
    this.fileService.deleteFileByIds([this.fileResponse()[index]._id]).subscribe((value: ApiResponse<FileResponseValue[]>)=>{
      if(value.statusCode === 200) {
        this.fileResponse.set(this.fileResponse().splice(index,1));
        this.fileNames = this.fileResponse().map((item: FileResponseValue)=>item.fileName);
        this.onChange(this.fileNames);
      }
    });
  }

  onSelectedFiles(event: FileSelectEvent) {
    const formData = new FormData();
    event.currentFiles.forEach((item: File)=>{
      formData.append('files', item);
    });
    formData.append('fileType', this.acceptFileType);
    this.fileService.addFile(formData).subscribe((value: ApiResponse<FileResponseValue[] | ResponseErrorValue[]>) => {
      if(value.statusCode !== 200) {
        this.confirmationService.confirm({
          message: this.translationService.instant((value.data as ResponseErrorValue[])[0].translateKey),
          header: '',
          icon: 'pi pi-info-circle',
          acceptIcon:"none",
          rejectIcon:"none",
          rejectVisible: false,
          acceptButtonStyleClass:"p-button p-button-sm"
        });
        return;
      }
      const files = value?.data?.length ? value.data as FileResponseValue[] : [];
      this.fileResponse.set([...this.fileResponse(),...files]);
      if (this.onChange) {
        this.fileNames = this.fileResponse().map((item: FileResponseValue)=>item.fileName);
        this.onChange(this.fileNames);
      }
    });
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
