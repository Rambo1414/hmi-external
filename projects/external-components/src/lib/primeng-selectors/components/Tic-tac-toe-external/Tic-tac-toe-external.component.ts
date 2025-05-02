// tic-tac-toe.component.ts

import { Component } from '@angular/core';
import { CommonExternalComponent } from '../common-external/common-external.component';

/*
  Features:
  - 3x3 Tic Tac Toe grid for two players (X and O)
  - Players alternate turns by clicking cells
  - Shows winner or draw when game ends
  - Board resets on button click
*/

@Component({
  selector: 'app-tic-tac-toe',
  template: `
    <div class="ttt-container">
      <h2>Tic Tac Toe</h2>
      <div class="board">
        <button 
          *ngFor="let cell of board; let i = index"
          [disabled]="cell !== '' || winner !== null"
          (click)="makeMove(i)"
          class="cell"
        >
          {{ cell }}
        </button>
      </div>
      <div class="status" *ngIf="winner !== null">
        <span *ngIf="winner === 'Draw'">It's a Draw!</span>
        <span *ngIf="winner !== 'Draw'">{{ winner }} wins!</span>
      </div>
      <button class="reset-btn" (click)="resetGame()">Reset Game</button>
    </div>
  `,
  styles: [`
    .ttt-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: Arial, sans-serif;
      margin-top: 24px;
    }
    .board {
      display: grid;
      grid-template-columns: repeat(3, 60px);
      grid-gap: 8px;
      margin-bottom: 16px;
    }
    .cell {
      width: 60px;
      height: 60px;
      font-size: 2rem;
      cursor: pointer;
      background: #f0f0f0;
      border: 2px solid #666;
      border-radius: 6px;
      transition: background 0.2s;
    }
    .cell:disabled {
      background: #ddd;
      cursor: default;
    }
    .status {
      font-size: 1.2rem;
      margin-bottom: 10px;
      color: #333;
    }
    .reset-btn {
      padding: 6px 18px;
      font-size: 1rem;
      border: none;
      background: #1976d2;
      color: white;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 8px;
    }
    .reset-btn:hover {
      background: #1565c0;
    }
  `]
})
export class TicTacToeComponent extends CommonExternalComponent {
  board: string[] = Array(9).fill('');
  currentPlayer: 'X' | 'O' = 'X';
  winner: 'X' | 'O' | 'Draw' | null = null;

  makeMove(index: number): void {
    if (this.board[index] === '' && this.winner === null) {
      this.board[index] = this.currentPlayer;
      if (this.checkWinner()) {
        this.winner = this.currentPlayer;
      } else if (this.board.every(cell => cell !== '')) {
        this.winner = 'Draw';
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  checkWinner(): boolean {
    const lines: number[][] = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // cols
      [0,4,8], [2,4,6]           // diags
    ];
    return lines.some(line =>
      this.board[line[0]] === this.currentPlayer &&
      this.board[line[1]] === this.currentPlayer &&
      this.board[line[2]] === this.currentPlayer
    );
  }

  resetGame(): void {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.winner = null;
  }
}