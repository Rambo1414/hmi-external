import { Component } from '@angular/core';
import { CommonExternalComponent } from '../common-external/common-external.component';

/*
  Features:
  - User input for Excel-related questions.
  - Displays answers to Excel queries (mocked, replace with API integration if needed).
  - Simple and clean UI for question/answer interaction.
*/

@Component({
  selector: 'app-excel-buddy',
  template: `
    <div class="excel-buddy-container">
      <h2>Excel Buddy - Ask Your Excel Questions</h2>
      <form (ngSubmit)="submitQuery()" #queryForm="ngForm" class="query-form">
        <input
          type="text"
          [(ngModel)]="userQuery"
          name="userQuery"
          required
          maxlength="300"
          placeholder="Type your Excel question here..."
          class="query-input"
        />
        <button type="submit" [disabled]="!userQuery.trim()" class="submit-btn">Ask</button>
      </form>
      <div *ngIf="answer" class="answer-section">
        <strong>Answer:</strong>
        <p>{{ answer }}</p>
      </div>
    </div>
  `,
  styles: [`
    .excel-buddy-container {
      max-width: 500px;
      margin: 32px auto;
      padding: 24px;
      border-radius: 12px;
      background: #f7fafc;
      box-shadow: 0 4px 16px rgba(0,0,0,0.06);
      font-family: 'Segoe UI', Arial, sans-serif;
    }
    h2 {
      text-align: center;
      color: #217346;
      margin-bottom: 24px;
    }
    .query-form {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-bottom: 18px;
    }
    .query-input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #bdbdbd;
      border-radius: 6px;
      font-size: 16px;
    }
    .submit-btn {
      background: #217346;
      color: white;
      border: none;
      padding: 8px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.2s;
    }
    .submit-btn:disabled {
      background: #bdbdbd;
      cursor: not-allowed;
    }
    .answer-section {
      background: #e8f5e9;
      border-left: 4px solid #217346;
      padding: 14px 18px;
      border-radius: 6px;
      color: #333;
      margin-top: 12px;
    }
  `]
})
export class ExcelBuddyComponent extends CommonExternalComponent {
  userQuery: string = '';
  answer: string = '';

  submitQuery(): void {
    // Mocked logic for demonstration; replace with real service/API call as needed
    this.answer = this.getMockAnswer(this.userQuery.trim());
  }

  private getMockAnswer(query: string): string {
    // Basic examples; extend or connect to a backend/AI for real answers
    if (!query) return '';
    const q = query.toLowerCase();
    if (q.includes('sum')) {
      return 'Use the SUM function: =SUM(A1:A10)';
    }
    if (q.includes('vlookup')) {
      return 'VLOOKUP syntax: =VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])';
    }
    if (q.includes('pivot table')) {
      return 'To create a Pivot Table: Select data > Insert > PivotTable.';
    }
    return 'Sorry, I am a demo bot. Please specify your Excel question in detail!';
  }
}