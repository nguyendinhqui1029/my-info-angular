import { Component, Input } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { FileSelectEvent } from 'primeng/fileupload';

@Component({
  selector: 'q-upload-image-field',
  standalone: true,
  imports: [PrimeComponent],
  templateUrl: './upload-image-field.component.html',
  styleUrl: './upload-image-field.component.scss'
})
export class UploadImageFieldComponent {
  @Input({required: false}) acceptFileType: string='image/*';
  @Input({required: false}) maxFileSize: number= 1000000;
  @Input({required: false}) isMultiple: boolean = true;
  @Input({required: false}) label: string = 'Upload image';

  files: File[] = [];

  totalSize : number = 0;

  totalSizePercent : number = 0;


  choose(_event: Event, callback: Function) {
      callback();
  }

  onRemoveTemplatedFile(event: Event, file: File, removeFileCallback: Function, index: number) {
      removeFileCallback(event, index);
      this.totalSize -= parseInt(this.formatSize(file.size));
      this.totalSizePercent = this.totalSize / 10;
  }

  onTemplatedUpload() {
  // Emit event to enable button register
  }

  onSelectedFiles(event: FileSelectEvent) {
      this.files = event.currentFiles;
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
