import { Component } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { PATH } from '@constants/common.const';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'q-company-upsert',
  standalone: true,
  imports: [TranslateModule, PrimeComponent],
  templateUrl: './company-upsert.component.html',
  styleUrl: './company-upsert.component.scss'
})
export class CompanyUpsertComponent {
  goToListUrl: string = `/${PATH.ADMIN.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.COMPANIES_MANAGEMENT}`
}
