import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-settings',
  imports: [FormsModule],
  templateUrl: './quiz-settings.html',
  styleUrl: './quiz-settings.scss',
})
export class QuizSettings {
  @Input() questionLimit!: number | null;

  @Input() quizMode!: 'term-to-definition' | 'definition-to-term' | null;

  @Input() totalWords!: number;

  @Output() questionLimitChange = new EventEmitter<number>();

  @Output() quizModeChange = new EventEmitter<'term-to-definition' | 'definition-to-term' | null>();
}
