import { Component, Input } from '@angular/core';
import { Education } from '@app/shared/models/personal-info.model';
import { TranslateModule } from '@ngx-translate/core';
import { TimelineComponent } from '@components/common/timeline/timeline.component';

@Component({
  selector: 'q-education',
  standalone: true,
  imports: [TranslateModule, TimelineComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss'
})
export class EducationComponent {
  @Input({ required: true }) education!: Education;
}
