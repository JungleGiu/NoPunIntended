export interface Joke {
  id: string;
  joke: string;
  score?: 1 | 2 | 3;
  date?: Date;
}
export const jokesRecord: Joke[] = [];

export const getRandomJoke: Function = async (): Promise<Joke> => {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
    method: "GET",
  });
  const data = await response.json();
  return data as Joke;
};

const rateJoke = (jokeId: string, score: 1 | 2 | 3) => {
  const thisJoke = jokesRecord.find((joke) => joke.id === jokeId);
};
