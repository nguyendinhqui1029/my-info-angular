import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { LocatorService } from 'src/service/locator.service';
import { UploadVideoService } from 'src/service';
import { VideoModel } from 'src/model/video.model';
import { Mock } from 'protractor/built/driverProviders';
import { Observable } from 'rxjs';

@Component({
  selector: 'upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  listTag: string[] = [];
  selectedFiles: File;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  formGroupUploadVideo: FormGroup;
  currentProgress: number = 0;
  constructor(public fb: FormBuilder, private ls: LocatorService) {

  }

  ngOnInit(): void {
    this.formGroupUploadVideo = this.fb.group({
      title: ['', Validators.required],
      group: ['', Validators.required],
      file: ['', Validators.required],
      tag: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.listTag.push(value.trim());
      this.formGroupUploadVideo.controls.tag.setValue(this.listTag.join(';'));
      this.formGroupUploadVideo.controls.tag.updateValueAndValidity();
    }
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.listTag.indexOf(tag);
    if (index >= 0) {
      this.listTag.splice(index, 1);
      this.formGroupUploadVideo.controls.tag.setValue(this.listTag.join(';'));
      this.formGroupUploadVideo.controls.tag.updateValueAndValidity();
    }
  }

  selectFile(data) {
    if (navigator.userAgent.search('firefox')) {
      this.selectedFiles = data.target.files[0];
    } else {
      this.selectedFiles = data.srcElement.files[0];
    }
  }

  click() {
    const modelVideo = { title: 'title', tags: this.listTag, privacyStatus: 'private', categoryId: null, description: 'description' } as VideoModel;
    this.ls.getService<UploadVideoService>('uploadVideoService').uploadVideo(this.selectedFiles, modelVideo).subscribe((reponse: Observable<any>) => {
      reponse.subscribe((data) => {
        if (data.loaded && data.total) {
          this.currentProgress = this.currentProgress + Math.floor((data.loaded * 100) / data.total);
        }
      })
    });
  }
}
