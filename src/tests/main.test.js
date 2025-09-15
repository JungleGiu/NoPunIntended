import { describe, it, expect, jest, beforeEach, afterEach, } from "@jest/globals";
import { getRandomJoke, rateJoke } from "../scripts/main";
import * as mainModule from "../scripts/main";
import { jokesRecord } from "../scripts/types";
const mockFetch = jest.fn();
globalThis.fetch = mockFetch;
describe("getRandomJoke", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it("should be an async function", () => {
        const result = getRandomJoke();
        expect(result).toBeInstanceOf(Promise);
        result.catch(() => { });
    });
    it("should call one of the two APIs", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                id: "test-id",
                joke: "Test joke",
            }),
        });
        await getRandomJoke();
        expect(mockFetch).toHaveBeenCalledTimes(1);
        const url = mockFetch.mock.calls[0][0];
        expect(url.includes("https://icanhazdadjoke.com/") ||
            url.includes("https://api.chucknorris.io/jokes/random")).toBe(true);
    });
    it("should throw error when fetch fails", async () => {
        mockFetch.mockRejectedValueOnce(new Error("Network error"));
        await expect(getRandomJoke()).rejects.toThrow("Network error");
        expect(fetch).toHaveBeenCalledTimes(1);
    });
    it("shold call Chuck Norris API if randomizer is < 0.5", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                id: "test-id-chuck",
                value: "Test joke Chuck Norris",
            }),
        });
        const mathSpy = jest.spyOn(Math, "random").mockReturnValue(0.3);
        await getRandomJoke();
        expect(mockFetch).toHaveBeenCalledWith("https://api.chucknorris.io/jokes/random");
        mathSpy.mockRestore();
    });
    it("shold call Dad Joke API if randomizer is > 0.5", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                id: "test-id-dadjoke",
                joke: "Test joke Dad Joke",
            }),
        });
        const mathSpy = jest.spyOn(Math, "random").mockReturnValue(0.7);
        await getRandomJoke();
        const url = mockFetch.mock.calls[0][0];
        expect(url.includes("https://icanhazdadjoke.com/")).toBe(true);
        mathSpy.mockRestore();
    });
    it("should return a Joke object parsing the different APIs responses", async () => {
        mockFetch.mockImplementation((input, init) => {
            const url = input.toString();
            if (url.includes("https://icanhazdadjoke.com/")) {
                return Promise.resolve({
                    ok: true,
                    json: async () => ({
                        id: "test-id-dadjoke",
                        joke: "Test joke Dad Joke",
                    }),
                });
            }
            else if (url.includes("https://api.chucknorris.io/jokes/random")) {
                return Promise.resolve({
                    ok: true,
                    json: async () => ({
                        id: "test-id-chuck",
                        value: "Test joke Chuck Norris",
                    }),
                });
            }
            return Promise.reject(new Error("Invalid URL"));
        });
        const joke = await getRandomJoke();
        expect(joke).toHaveProperty("id");
        expect(joke).toHaveProperty("joke");
        expect(typeof joke.id).toBe("string");
        expect(typeof joke.joke).toBe("string");
        expect(joke.id).toBeTruthy();
        expect(joke.joke).toBeTruthy();
    });
});
describe("rateJoke", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jokesRecord.length = 0;
    });
    afterEach(() => {
        jest.restoreAllMocks();
        jokesRecord.length = 0;
    });
    it("should rate a new joke", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                id: "test-id-dadjoke",
                joke: "Test joke Dad Joke",
            }),
        });
        const joke = await getRandomJoke();
        let ratedJoke = rateJoke(joke, 1);
        expect(ratedJoke).toHaveProperty("score");
        expect(ratedJoke).toHaveProperty("date");
        expect(typeof ratedJoke.score).toBe("number");
        expect(typeof ratedJoke.date).toBe("string");
        expect(ratedJoke.score).toBe(1);
        expect(ratedJoke.score).toBeTruthy();
        expect(ratedJoke.date).toBeTruthy();
    });
    it("should update the score of a rated joke", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                id: "test-id-dadjoke",
                joke: "Test joke Dad Joke",
            }),
        });
        const joke = await getRandomJoke();
        const ratedJoke = rateJoke(joke, 1);
        let updatedJoke = rateJoke(ratedJoke, 2);
        expect(updatedJoke).toHaveProperty("score");
        expect(updatedJoke).toHaveProperty("date");
        expect(typeof updatedJoke.score).toBe("number");
        expect(typeof updatedJoke.date).toBe("string");
        expect(updatedJoke.score).toBe(2);
        expect(updatedJoke.score).toBeTruthy();
        expect(updatedJoke.date).toBeTruthy();
    });
    it("should console log the rating and the updated joke", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                id: "test-id-dadjoke",
                joke: "Test joke Dad Joke",
            }),
        });
        const consoleLogSpy = jest.spyOn(console, "log");
        const joke = await getRandomJoke();
        const ratedJoke = rateJoke(joke, 1);
        expect(consoleLogSpy).toHaveBeenCalledWith(`Joke ${ratedJoke.id} rating has been rated`, expect.objectContaining({
            id: ratedJoke.id,
            joke: ratedJoke.joke,
            score: 1
        }));
        const secondRating = rateJoke(ratedJoke, 2);
        expect(consoleLogSpy).toHaveBeenCalledWith(`Joke ${secondRating.id} rating has been updated`, expect.objectContaining({
            id: secondRating.id,
            joke: secondRating.joke,
            score: 2
        }));
        expect(consoleLogSpy).toHaveBeenCalledTimes(2);
        consoleLogSpy.mockRestore();
    });
});
describe("getWeather", () => {
    beforeEach(() => {
        mockFetch.mockClear();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it("should fetch weather using a mocked position", async () => {
        const mockPosition = {
            coords: {
                latitude: 51.1,
                longitude: 45.3,
                accuracy: 1,
                altitude: null,
                altitudeAccuracy: null,
                heading: null,
                speed: null,
            },
            timestamp: Date.now(),
        };
        const spyGetLocation = jest.spyOn(mainModule, "getLocation")
            .mockResolvedValue(mockPosition);
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                location: { name: "Test City" },
                current: {
                    condition: {
                        text: "Partly cloudy",
                        icon: "//cdn.weatherapi.com/weather/64x64/day/116.png"
                    },
                    temp_c: 25.5,
                },
            }),
        });
        const weather = await mainModule.getWeather();
        expect(spyGetLocation).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith("http://api.weatherapi.com/v1/current.json?key=92c6516e4dec42ab8a7110724252208&q=51.1,45.3");
        // Verifica il risultato finale
        expect(weather).toEqual({
            location: "Test City",
            description: "Partly cloudy",
            temperature: 26, // Math.round(25.5) = 26
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
        });
    });
    it("should handle geolocation errors", async () => {
        const geoError = new Error("Geolocation permission denied");
        const spyGetLocation = jest.spyOn(mainModule, "getLocation")
            .mockRejectedValue(geoError);
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        await expect(mainModule.getWeather()).rejects.toThrow("Geolocation permission denied");
        expect(consoleSpy).toHaveBeenCalledWith("Error fetching weather:", geoError);
        consoleSpy.mockRestore();
    });
    it("should round temperature correctly", async () => {
        const mockPosition = {
            coords: { latitude: 1, longitude: 1, accuracy: 1, altitude: null, altitudeAccuracy: null, heading: null, speed: null },
            timestamp: Date.now(),
        };
        jest.spyOn(mainModule, "getLocation").mockResolvedValue(mockPosition);
        const testCases = [
            { temp_c: 25.4, expected: 25 },
            { temp_c: 25.6, expected: 26 },
            { temp_c: -10.3, expected: -10 },
            { temp_c: 0.5, expected: 1 },
        ];
        for (const testCase of testCases) {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    location: { name: "Test" },
                    current: {
                        condition: { text: "Clear", icon: "test.png" },
                        temp_c: testCase.temp_c,
                    },
                }),
            });
            const weather = await mainModule.getWeather();
            expect(weather.temperature).toBe(testCase.expected);
            mockFetch.mockClear();
        }
    });
    it("should return a Weather object parsing the response", async () => {
        const mockPosition = {
            coords: { latitude: 1, longitude: 1, accuracy: 1, altitude: null, altitudeAccuracy: null, heading: null, speed: null },
            timestamp: Date.now(),
        };
        jest.spyOn(mainModule, "getLocation").mockResolvedValue(mockPosition);
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                location: { name: "Test" },
                current: {
                    condition: { text: "Clear", icon: "test.png" },
                    temp_c: 25.5,
                },
            }),
        });
        const weather = await mainModule.getWeather();
        expect(weather).toEqual({
            location: "Test",
            description: "Clear",
            temperature: 26, // Math.round(25.5) = 26
            icon: "test.png",
        });
    });
});
//# sourceMappingURL=main.test.js.map