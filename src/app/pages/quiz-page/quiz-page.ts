import { Component, inject } from '@angular/core';
import { Glossary } from '../../services/glossary';
import { IGlossaryWord } from '../../types/IGlossaryWord';
import { QuizSettings } from '../../components/quiz-settings/quiz-settings';

@Component({
  selector: 'app-quiz-page',
  imports: [QuizSettings],
  templateUrl: './quiz-page.html',
  styleUrl: './quiz-page.scss',
})
export class QuizPage {
  private glossaryService = inject(Glossary);

  words: IGlossaryWord[] = [];

  currentQuestion!: IGlossaryWord;

  answerOptions: string[] = [];

  score = 0;

  questionIndex = 0;

  shuffledWords: IGlossaryWord[] = [];

  quizFinished = false;

  selectedAnswer = '';

  showAnswerFeedback = false;

  questionLimit: number | null = null;

  quizMode: 'term-to-definition' | 'definition-to-term' | null = null;

  correctAnswer!: string;

  highScore = 0;

  constructor() {
    this.words = this.glossaryService.getWords();

    const savedHighScore = localStorage.getItem('highscore');

    if (savedHighScore) {
      this.highScore = Number(savedHighScore);
    }
  }

  shuffleWords(words: IGlossaryWord[]): IGlossaryWord[] {
    return [...words].sort(() => Math.random() - 0.5);
  }

  startQuiz(): void {
    this.questionLimit = this.questionLimit;
    this.resetQuiz();
  }

  generateQuestion(): void {
    this.currentQuestion = this.shuffledWords[this.questionIndex];
    this.generateAnswerOptions();
    console.log(this.questionIndex);
    console.log(this.shuffledWords.length);
  }

  generateAnswerOptions(): void {
    this.correctAnswer = this.getCorrectAnswer();
    const incorrectAnswers = this.shuffleWords(this.words)
      .filter((word) => word.term !== this.currentQuestion.term)
      .slice(0, 3)
      .map((word) => (this.quizMode === 'term-to-definition' ? word.definition : word.term));
    const correctAnswer = this.getCorrectAnswer();
    this.answerOptions = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5);
  }

  selectAnswer(answer: string): void {
    if (this.showAnswerFeedback) {
      return;
    }

    this.selectedAnswer = answer;
    this.showAnswerFeedback = true;

    setTimeout(() => {
      if (answer === this.correctAnswer) {
        this.score++;
      }
      this.showAnswerFeedback = false;

      this.selectedAnswer = '';

      if (this.questionIndex >= this.shuffledWords.length - 1) {
        this.quizFinished = true;

        if (this.score > this.highScore) {
          this.highScore = this.score;
          localStorage.setItem('highscore', this.highScore.toString());
        }

        return;
      }
      this.questionIndex++;

      this.generateQuestion();
    }, 1500);
  }

  getQuestionText(): string {
    if (this.quizMode === 'term-to-definition') {
      return this.currentQuestion.term;
    }

    return this.currentQuestion.definition;
  }

  getCorrectAnswer(): string {
    if (this.quizMode === 'term-to-definition') {
      return this.currentQuestion.definition;
    }

    return this.currentQuestion.term;
  }

  changeQuizMode(mode: 'term-to-definition' | 'definition-to-term' | null): void {
    this.quizMode = mode;
    if (!mode) {
      return;
    }
    this.generateAnswerOptions();
  }

  resetQuiz(): void {
    this.score = 0;
    this.questionIndex = 0;
    this.quizFinished = false;

    this.shuffledWords = [...this.words]
      .sort(() => Math.random() - 0.5)
      .slice(0, this.questionLimit ?? this.words.length);

    this.generateQuestion();
  }

  onQuestionLimitChange(limit: number): void {
    this.questionLimit = limit;
    this.resetQuiz();
  }
}
