import { config } from "../setupEnv.js";
import { jokesRecord, jokesReport } from "./types.js";
const chuckURL = config.CHUCK_NORRIS_API;
const dadsURL = config.DADS_JOKE_API;
const weatherURL = config.WEATHER_API;
const weatherKey = config.WEATHER_API_KEY;
export const getRandomJoke = async () => {
    let randomizer = Math.random() < 0.5 ? 1 : 2;
    if (randomizer === 1)
        try {
            const response = await fetch(`${chuckURL}`);
            const data = await response.json();
            jokesReport.push(data);
            console.log(jokesReport);
            return {
                id: data.id,
                joke: data.value,
            };
        }
        catch (error) {
            console.error("Error fetching joke:", error);
            throw error;
        }
    else
        try {
            const response = await fetch(`${dadsURL}`, {
                headers: {
                    Accept: "application/json",
                },
                method: "GET",
            });
            const data = await response.json();
            jokesReport.push(data);
            console.log(jokesReport);
            return data;
        }
        catch (error) {
            console.error("Error fetching joke:", error);
            throw error;
        }
};
export const rateJoke = (joke, score) => {
    const existingJoke = jokesRecord.find((record) => record.id === joke.id);
    if (existingJoke) {
        existingJoke.score = score;
        existingJoke.date = new Date().toISOString();
        console.log(`Joke ${joke.id} rating has been updated`, existingJoke);
        return existingJoke;
    }
    else {
        const newRecord = { ...joke, score, date: new Date().toISOString() };
        jokesRecord.push(newRecord);
        console.log(`Joke ${joke.id} rating has been rated`, newRecord);
        return newRecord;
    }
};
export const getLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};
export const getWeather = async () => {
    try {
        const location = await getLocation();
        const response = await fetch(`${weatherURL}?key=${weatherKey}&q=${location.coords.latitude},${location.coords.longitude}`);
        const data = await response.json();
        const iconUrl = data.current.condition.icon;
        const temperature = Math.round(data.current.temp_c);
        return {
            location: data.location.name,
            description: data.current.condition.text,
            temperature,
            icon: iconUrl,
        };
    }
    catch (error) {
        console.error("Error fetching weather:", error);
        throw error;
    }
};
//# sourceMappingURL=main.js.map