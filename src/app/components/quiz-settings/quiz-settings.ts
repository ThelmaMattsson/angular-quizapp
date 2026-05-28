import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGlossaryWord } from '../../types/IGlossaryWord';

@Component({
  selector: 'app-quiz-settings',
  imports: [],
  templateUrl: './quiz-settings.html',
  styleUrl: './quiz-settings.scss',
})
export class QuizSettings {
  @Input() questionLimit!: number;

  @Input() quizMode!: string;

  @Input() totalWords!: number;

  @Output() questionLimitChange = new EventEmitter<number>();

  @Output() quizModeChange = new EventEmitter<'term-to-definition' | 'definition-to-term'>();
}
