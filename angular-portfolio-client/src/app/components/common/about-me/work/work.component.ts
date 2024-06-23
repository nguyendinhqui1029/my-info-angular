import { Component, Input } from '@angular/core';
import { Work } from '@app/shared/models/personal-info.model';
import { TimelineComponent } from '@components/common/timeline/timeline.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'q-work',
  standalone: true,
  imports: [TimelineComponent, TranslateModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss'
})
export class WorkComponent {
@Input({required: true}) work!: Work;
}
