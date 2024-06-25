import { Component, Input } from '@angular/core';
import { Skill } from '@app/shared/models/personal-info.model';
import { RatingLevelComponent } from '@components/common/rating-level/rating-level.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'q-skills',
  standalone: true,
  imports: [TranslateModule, RatingLevelComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  @Input({required: true}) skill!: Skill;

  handleViewDetail(idSkill: string) {
    console.log(idSkill);
  }
}
