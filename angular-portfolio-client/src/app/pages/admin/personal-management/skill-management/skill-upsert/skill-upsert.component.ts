import { Component } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { PATH } from '@constants/common.const';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'q-skill-upsert',
  standalone: true,
  imports: [TranslateModule, PrimeComponent],
  templateUrl: './skill-upsert.component.html',
  styleUrl: './skill-upsert.component.scss'
})
export class SkillUpsertComponent {
  goToListUrl: string = `/${PATH.ADMIN.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.SKILL_MANAGEMENT}`
}
