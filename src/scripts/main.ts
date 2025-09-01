import type { Joke } from "./types";
import type { Weather } from "./types";
import { jokesRecord } from "./types";

export const getRandomJoke = async (): Promise<Joke> => {
  let randomizer = Math.random() < 0.5 ? 1 : 2;
  if (randomizer === 1) 
    try {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const data = await response.json();
    return {
      id: data.id,
      joke: data.value,
    };
  } catch (error) {
    console.error("Error fetching joke:", error);
    throw error;
  } 
  else 
    try{
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
      method: "GET",
    });
    const data = await response.json();
    return data as Joke;
  } catch (error) {
    console.error("Error fetching joke:", error);
    throw error;
  }
};

export const rateJoke = (joke: Joke, score: 1 | 2 | 3) => {
  const existingJoke = jokesRecord.find(
    (record: Joke) => record.id === joke.id
  );
  if (existingJoke) {
    existingJoke.score = score;
    existingJoke.date = new Date().toISOString();
    console.log(`Joke ${joke.id} rating has been updated`, existingJoke);
  } else {
    const newRecord = { ...joke, score, date: new Date().toISOString() };
    jokesRecord.push(newRecord);
    console.log(`Joke ${joke.id} rating has been rated`, newRecord);
  }
};

const getLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const getWeather = async (): Promise<Weather> => {
  try {
    const API_KEY = "92c6516e4dec42ab8a7110724252208";
    const mainUrl = "http://api.weatherapi.com/v1/current.json";
    const location = await getLocation();
    const response = await fetch(
      `${mainUrl}?key=${API_KEY}&q=${location.coords.latitude},${location.coords.longitude}`
    );
    const data = await response.json();
    const iconUrl = data.current.condition.icon;
    const temperature = Math.round(data.current.temp_c);
    return {
      location: data.location.name,
      description: data.current.condition.text,
      temperature,
      icon: iconUrl,
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};
