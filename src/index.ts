export interface Joke {
  id: string;
  joke: string;
  score?: 1 | 2 | 3;
  date?: string;
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


export const rateJoke = (joke: Joke, score: 1 | 2 | 3) => {
  const existingJoke = jokesRecord.find((record: Joke) => record.id === joke.id);
  if (existingJoke) {
    existingJoke.score = score;
    existingJoke.date = new Date().toISOString();
    console.log(`Joke ${joke.id} rating has been updated`, existingJoke);
  } else {
    const newRecord = { ...joke, score, date: new Date().toISOString() };
    jokesRecord.push(newRecord);
    console.log(`Joke ${joke.id} rating has been added`, newRecord);
  }
};

