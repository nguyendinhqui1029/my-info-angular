import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DialogSelectLanguageComponent } from '../dialog/dialog-select-language/dialog-select-language.component';

@Component({
  selector: 'setup-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  constructor(public dialog: MatDialog, private translate: TranslateService) { }

  ngOnInit(): void { }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
  openDialogLanguage() {
    const resultFromDialog = this.dialog.open(DialogSelectLanguageComponent, {
      data: {
        listButton: [{ name: 'ok', actionName: 'ok', background: 'black', color: 'white' }],
        message: 'please_change_language',
        title: 'setting_language',
        showButtonClose: true
      }
    });

    resultFromDialog.afterClosed().subscribe(result => {
      if (result && result.actionName === 'ok') {
        this.switchLang(result.value);
        localStorage.setItem("lang", result.value);
      }
    });
  }
}
