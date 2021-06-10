import { FormGroup } from "@angular/forms";
import { Button } from "./button.model";

export interface DialogCustomData {
  message: any;
  title: string;
  listButton: Button[];
  showButtonClose: boolean;
  formGroup?: FormGroup;
}