import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';

@Component({
  selector: 'q-generate-snippets',
  standalone: true,
  imports: [FormsModule, PrimeComponent, JsonPipe],
  templateUrl: './generate-snippets.component.html',
  styleUrl: './generate-snippets.component.scss'
})
export class GenerateSnippetsComponent {
  valueForm = {
    prefix: 'sgvnFontSize',
    attributeCss: 'font-size',
    pixel: 16,
    textAreaOne: '',
    textAreaTwo: '',
    textAreaThree: ''
  }

  error: string ='';
  result: any = {};

  getListValueFromTextAreaOne() {
    const result = this.valueForm.textAreaOne
    .replaceAll(/\s+/g, '')
    .replaceAll(/((em|rem|px)\s*!default\s*;?)/g, ';')
    .split(';').filter((item: string) => item);
    return result;
  }

  getListValueFromTextAreaTwo() {
    const startIndex = this.valueForm.textAreaTwo.indexOf('(');
    const endIndex = this.valueForm.textAreaTwo.lastIndexOf(')') + 1;
    if(startIndex === -1 || endIndex === -1) {
      this.error = 'Textarea 2 sai format';
      return [];
    }
    const result = this.valueForm.textAreaTwo.substring(startIndex + 1, endIndex - 1)
    .replaceAll(/\s+/g, '')
    .split(',').filter((item: string) => item);
    return result;
  }

  getListValueFromTextAreaThree() {
    let finalResult: string[] = [];
    let result = this.valueForm.textAreaThree
    .replaceAll(/\s+/g, '').split(';');
    result.forEach((item: string) => {
      const startVariable = item.indexOf('$');
      const endVariable = item.indexOf(':');
  
      const startKey = item.lastIndexOf(',');
      const endKey = item.indexOf(')})!default');
      const variable = item.substring(startVariable,endVariable);
      const key = item.substring(startKey + 1,endKey);
      if(variable && key) {
        finalResult.push(`${variable}:${key}`);
      }
    })
   
    return finalResult;
  }
  handleGenerate() {
    const objectMapOne: Record<string, {variable: string; value: number}> = {};
    const resultOne = this.getListValueFromTextAreaOne();
    resultOne.forEach((item: string) => {
      const itemSplit = item.split(':');
      if(itemSplit.length >= 2) {
        const key = itemSplit[0].replace('$', '');
        objectMapOne[key] = {
          variable: itemSplit[0],
          value: +itemSplit[1] * this.valueForm.pixel
        }
      }
    });

    const objectMapTwo: Record<string, number> = {};
    const resultTwo = this.getListValueFromTextAreaTwo();
    resultTwo.forEach((item: string) => {
      const itemSplit = item.split(':');
      if(itemSplit.length >= 2) {
        const key = itemSplit[0];
        objectMapTwo[key] = objectMapOne[itemSplit[1].replace('$', '')]?.value || 0;
      }
    });
    const objectMapThree: Record<string, {variable: string, pixelValue: number;}> = {};
    const resultThree = this.getListValueFromTextAreaThree();
    resultThree.forEach((item: string) => {

      const itemSplit = item.split(':');
      if(itemSplit.length >= 2) {
        const key = itemSplit[0].replace('$', '');
        objectMapThree[key] = {
          variable: itemSplit[0],
          pixelValue: objectMapTwo[itemSplit[1]] || 0
        };
      }
    })
    Object.entries(objectMapThree).forEach(([key, { variable, pixelValue }]: [string, { variable: string, pixelValue: number }]) => {
      this.result[`${this.valueForm.prefix}-${key}-${pixelValue}px`] = {
        prefix: `${this.valueForm.prefix}-${key}-${pixelValue}px`,
        body: [
    		`${this.valueForm.attributeCss}:${variable};`
    	  ],
        description: `${this.valueForm.attributeCss} for ${key} with value ${pixelValue/+this.valueForm.pixel}rem = ${pixelValue}px`
      }
    });
  }
}
