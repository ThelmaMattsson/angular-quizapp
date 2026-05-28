import { Injectable } from '@angular/core';
import words from '../../assets/words.json';
import { IGlossaryWord } from '../types/IGlossaryWord';

@Injectable({
  providedIn: 'root',
})
export class Glossary {
  private words: IGlossaryWord[] = words;
  getWords(): IGlossaryWord[] {
    return this.words;
  }
}
