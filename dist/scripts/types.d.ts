export interface Joke {
    id: string;
    joke: string;
    score?: 1 | 2 | 3;
    date?: string;
}
export declare const jokesRecord: Joke[];
export declare const jokesReport: Joke[];
export interface Weather {
    description: string;
    temperature: number;
    icon: string;
    location: string;
}
