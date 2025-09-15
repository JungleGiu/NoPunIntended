export interface Joke {
  id: string;
  joke: string;
  score?: 1 | 2 | 3;
  date?: string;
}
export const jokesRecord: Joke[] = [];
export const jokesReport: Joke[] = [];

export interface Weather {
  description: string;
  temperature: number;
  icon: string;
  location: string;
}