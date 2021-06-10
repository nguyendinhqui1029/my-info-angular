import { Component, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCustomData } from 'src/model/dialog-custom-data.model';
import { DynamicComponentService } from 'src/service';
import { LocatorService } from 'src/service/locator.service';

@Component({
  selector: 'dialog-update',
  templateUrl: './dialog-update.component.html',
  styleUrls: ['./dialog-update.component.scss']
})
export class DialogUpdateComponent implements OnInit {
  @ViewChild("componentContainer", { static: true, read: ViewContainerRef }) componentContainer: ViewContainerRef;
  dynamicComponentService: DynamicComponentService;
  postFormGroup: FormGroup;

  constructor(public dialogref: MatDialogRef<DialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCustomData, private ls: LocatorService, private _formBuilder: FormBuilder) {
    this.dynamicComponentService = this.ls.getService<DynamicComponentService>("dynamicComponentService");
    this.postFormGroup = data.formGroup || {} as any;
  }

  action(actionName: string) {
    this.dialogref.close({ key: 1, value: this.postFormGroup, actionName: actionName });
  }

  ngOnInit(): void {
    if (typeof this.data.message === 'object' && this.data.message.hasOwnProperty('component')) {
      this.dynamicComponentService.renderComponent(this.data.message.component, this.componentContainer, this.postFormGroup);
    }
  }
}
