import { Component } from '@angular/core';
import { PrimeComponent } from '@app/configs/prime-angular/prime.config';
import { PATH } from '@constants/common.const';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'q-hobby-upsert',
  standalone: true,
  imports: [TranslateModule, PrimeComponent],
  templateUrl: './hobby-upsert.component.html',
  styleUrl: './hobby-upsert.component.scss'
})
export class HobbyUpsertComponent {
  goToListUrl: string = `/${PATH.ADMIN.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.ROOT}/${PATH.ADMIN.PERSONAL_MANAGEMENT.HOBBY_MANAGEMENT}`

}
