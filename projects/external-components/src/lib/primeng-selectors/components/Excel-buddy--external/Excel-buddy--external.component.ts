import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonExternalComponent } from '../common-external/common-external.component';

/*
  Features:
  - User input for Excel-related questions.
  - Integrates with Groq API (Llama3 model) using provided key for real-time answers.
  - Shows loading indicator while waiting for response.
  - Strict type checking on all variables.
  - Clean, responsive UI for chat interaction.
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
        <button type="submit" [disabled]="!userQuery.trim() || loading" class="submit-btn">
          {{ loading ? 'Thinking...' : 'Ask' }}
        </button>
      </form>
      <div *ngIf="answer" class="answer-section">
        <strong>Answer:</strong>
        <p>{{ answer }}</p>
      </div>
      <div *ngIf="errorMsg" class="error-section">
        <strong>Error:</strong>
        <p>{{ errorMsg }}</p>
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
    .error-section {
      background: #ffebee;
      border-left: 4px solid #c62828;
      padding: 14px 18px;
      border-radius: 6px;
      color: #b71c1c;
      margin-top: 12px;
    }
  `]
})
export class ExcelBuddyComponent extends CommonExternalComponent {
  userQuery: string = '';
  answer: string = '';
  errorMsg: string = '';
  loading: boolean = false;

  private readonly groqApiUrl: string = 'https://api.groq.com/openai/v1/chat/completions';
  private readonly groqApiKey: string = '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';

  constructor(private http: HttpClient) {
    super();
  }

  submitQuery(): void {
    if (!this.userQuery.trim()) {
      return;
    }
    this.answer = '';
    this.errorMsg = '';
    this.loading = true;

    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.groqApiKey}`
    });

    const body: Record<string, unknown> = {
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content: 'You are an expert Excel assistant. Answer concisely and clearly for Excel-related queries.'
        },
        {
          role: 'user',
          content: this.userQuery.trim()
        }
      ],
      temperature: 0.2,
      max_tokens: 512
    };

    this.http.post<{choices: {message: {content: string}}[]}>(
      this.groqApiUrl,
      body,
      { headers }
    ).subscribe({
      next: (response) => {
        const reply: string | undefined = response?.choices?.[0]?.message?.content;
        this.answer = reply ? reply.trim() : 'No answer received.';
        this.loading = false;
      },
      error: (err: unknown) => {
        this.errorMsg = 'Failed to get a response. Please try again later.';
        this.loading = false;
      }
    });
  }
}