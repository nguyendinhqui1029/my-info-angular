import { Component } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { PATH } from '@constants/common.const';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'q-education-upsert',
  standalone: true,
  imports: [TranslateModule, PrimeComponent],
  templateUrl: './education-upsert.component.html',
  styleUrl: './education-upsert.component.scss'
})
export class EducationUpsertComponent {
  goToListUrl: string = `/${PATH.ADMIN.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.COMPANIES_MANAGEMENT}`

}
