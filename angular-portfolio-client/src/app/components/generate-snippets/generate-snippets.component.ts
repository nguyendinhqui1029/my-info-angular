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
    pixel: 16,
    values: [{
      prefix: 'sgvnFontSize',
      attributeCss: 'font-size',
      textAreaOne: '',
      textAreaTwo: '',
      textAreaThree: ''
    }]
  }

  error: string ='';
  result: any = {};
  clipboardResult: any = {};

  getListValueFromTextAreaOne(value: string) {
    if(!value) {
      return [];
    }
    const result = value
    .replaceAll(/\s+/g, '')
    .replaceAll(/\s*!default\s*;?/g, ';')
    .split(';').filter((item: string) => item);
    return result;
  }

  getListValueFromTextAreaTwo(value: string) {
    const startIndex = value.indexOf('(');
    const endIndex = value.lastIndexOf(')') + 1;
    if(startIndex === -1 || endIndex === -1) {
      this.error = 'Textarea 2 sai format';
      return [];
    }
    const result = value.substring(startIndex + 1, endIndex - 1)
    .replaceAll(/\s+/g, '')
    .split(',').filter((item: string) => item);
    return result;
  }

  getListValueFromTextAreaThree(value: string) {
    let finalResult: string[] = [];
    let result = value
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

  getValue(value: string) {
    if(value.includes('rem') || value.includes('em')) {
      return +value.replace('rem', '').replace('em', '') * this.valueForm.pixel;
    }
    if(value.includes('px')) {
      return +value.replace('px', '');
    }
    return value;
  }

  getUnit(value: string) {
    console.log('1',value)
    if(value.includes('rem') || value.includes('em') || value.includes('px')) {
      return true
    }
  
    return false;
  }

  handleGenerate() {
    this.result = {};
    this.clipboardResult = {};
    this.valueForm.values.forEach((item) => {
      const objectMapOne: Record<string, {variable: string; value: string}> = {};
      const resultOne = this.getListValueFromTextAreaOne(item.textAreaOne);
      resultOne.forEach((item: string) => {
        const itemSplit = item.split(':');
        if(itemSplit.length >= 2) {
          const key = itemSplit[0].replace('$', '');
          objectMapOne[key] = {
            variable: itemSplit[0],
            value: itemSplit[1]
          }
        }
      });
  
      const objectMapTwo: Record<string, string> = {};
      const resultTwo = this.getListValueFromTextAreaTwo(item.textAreaTwo);
      resultTwo.forEach((item: string) => {
        const itemSplit = item.split(':');
        if(itemSplit.length >= 2) {
          const key = itemSplit[0];
          if(!objectMapOne[itemSplit[1].replace('$', '')]) {
            objectMapTwo[key] = itemSplit[1];
           return;
          }
          objectMapTwo[key] = objectMapOne[itemSplit[1].replace('$', '')]?.value;
        }
      });
  
      const objectMapThree: Record<string, {variable: string, name: string, pixelValue: string; hasUnit: boolean;}> = {};
      const resultThree = this.getListValueFromTextAreaThree(item.textAreaThree);
      resultThree.forEach((item: string) => {
  
        const itemSplit = item.split(':');
        if(itemSplit.length >= 2) {
          const key = itemSplit[0].replace('$', '');
          if(!objectMapTwo[itemSplit[1]]) {
            return;
          }
          objectMapThree[key] = {
            name: itemSplit[1],
            variable: itemSplit[0],
            pixelValue: this.getValue(objectMapTwo[itemSplit[1]])?.toString(),
            hasUnit: this.getUnit(objectMapTwo[itemSplit[1]])
          };
        }
      })
      Object.values(objectMapThree).forEach(({ name, variable, pixelValue, hasUnit }: { name: string; variable: string, pixelValue: string, hasUnit: boolean }) => {
        this.result[`${item.prefix}-${name.replace('\"','').replace('\"','')}-${pixelValue}${hasUnit? 'px' : ''}`]= {
          prefix: `${item.prefix}-${name.replace('\"','').replace('\"','')}-${pixelValue}${hasUnit? 'px' : ''}`,
          body: [
          `${item.attributeCss}: \\${variable};`
          ],
          description: `${item.attributeCss} for ${name.replace('\"','').replace('\"','')} with value ${hasUnit ? `${+pixelValue/+this.valueForm.pixel}rem = ${pixelValue}px` : pixelValue}`
        }
        if(!this.clipboardResult[item.prefix]) {
          this.clipboardResult[item.prefix] = {
            [`${item.prefix}-${name.replace('\"','').replace('\"','')}-${pixelValue}${hasUnit? 'px' : ''}`]:{
              prefix: `${item.prefix}-${name.replace('\"','').replace('\"','')}-${pixelValue}${hasUnit? 'px' : ''}`,
              body: [
              `${item.attributeCss}: \\${variable};`
              ],
              description: `${item.attributeCss} for ${name.replace('\"','').replace('\"','')} with value ${hasUnit ? `${+pixelValue/+this.valueForm.pixel}rem = ${pixelValue}px` : pixelValue}`
            }
          };
          return;
        }
        this.clipboardResult[item.prefix] = {...this.clipboardResult[item.prefix], ...{
          [`${item.prefix}-${name.replace('\"','').replace('\"','')}-${pixelValue}${hasUnit? 'px' : ''}`]:{
            prefix: `${item.prefix}-${name.replace('\"','').replace('\"','')}-${pixelValue}${hasUnit? 'px' : ''}`,
            body: [
            `${item.attributeCss}: \\${variable};`
            ],
            description: `${item.attributeCss} for ${name.replace('\"','').replace('\"','')} with value ${hasUnit ? `${+pixelValue/+this.valueForm.pixel}rem = ${pixelValue}px` : pixelValue}`
          }
        }};
      });
    });
  }

  copyToClipboard() {
    const textarea = document.createElement('textarea');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    let text = '';
    Object.entries(this.clipboardResult).forEach(([key, value]: [string, any]) => {
      text += `// \n\n Start  //\n\n// ${key} \n\n ${JSON.stringify(value, null, 2)}, \n\n//  End  //\n`
    });
    textarea.value = text;

    document.body.appendChild(textarea);

    // Select the text in the textarea
    textarea.select();
    const successful = document.execCommand('copy');

    document.body.removeChild(textarea);

    return successful;
  }

  handleDelete(index: number) {
    this.valueForm.values.splice(index, 1)
  }
  handleAdd() {
    this.valueForm.values.push({
      prefix: '',
      attributeCss: '',
      textAreaOne: '',
      textAreaTwo: '',
      textAreaThree: ''
    });
  }
}
