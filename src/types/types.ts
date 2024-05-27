export interface Question {
    text: string;
    options: string[];
    correctAnswer: string;
    point: number;
}

export interface ResultsState {
    selectedOptions: (string | null)[];
    correctAnswers: string[];
    questions: Question[];
}