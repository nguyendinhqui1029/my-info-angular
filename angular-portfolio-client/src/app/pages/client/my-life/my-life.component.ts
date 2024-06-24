import { Component } from '@angular/core';
import { GenerateSnippetsComponent } from '@app/components/generate-snippets/generate-snippets.component';

@Component({
  selector: 'app-my-life',
  standalone: true,
  imports: [GenerateSnippetsComponent],
  templateUrl: './my-life.component.html',
  styleUrl: './my-life.component.scss'
})
export class MyLifeComponent {

}
