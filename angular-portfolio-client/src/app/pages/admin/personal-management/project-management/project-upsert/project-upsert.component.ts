import { Component } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { PATH } from '@constants/common.const';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'q-project-upsert',
  standalone: true,
  imports: [TranslateModule, PrimeComponent],
  templateUrl: './project-upsert.component.html',
  styleUrl: './project-upsert.component.scss'
})
export class ProjectUpsertComponent {
  goToListUrl: string = `/${PATH.ADMIN.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.PROJECT_MANAGEMENT}`

}
