import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { getRandomJoke, rateJoke, getWeather } from "../scripts/main";
import  { jokesRecord } from "../scripts/types";

const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
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
    result.catch(() => {});
  });

  it("should call one of the two APIs", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: "test-id",
        joke: "Test joke",
      }),
    } as Response);
    await getRandomJoke();
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const url = mockFetch.mock.calls[0][0] as string;
    expect(
      url.includes("https://icanhazdadjoke.com/") ||
        url.includes("https://api.chucknorris.io/jokes/random")
    ).toBe(true);
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
    } as Response);

    const mathSpy = jest.spyOn(Math, "random").mockReturnValue(0.3);

    await getRandomJoke();

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.chucknorris.io/jokes/random"
    );

    mathSpy.mockRestore();
  });

  it("shold call Dad Joke API if randomizer is > 0.5", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: "test-id-dadjoke",
        joke: "Test joke Dad Joke",
      }),
    } as Response);

    const mathSpy = jest.spyOn(Math, "random").mockReturnValue(0.7);

    await getRandomJoke();

    const url = mockFetch.mock.calls[0][0] as string;
    expect(url.includes("https://icanhazdadjoke.com/")).toBe(true);

    mathSpy.mockRestore();
  });

  it("should return a Joke object parsing the different APIs responses", async () => {
    mockFetch.mockImplementation(
      (input: RequestInfo | URL, init?: RequestInit) => {
        const url = input.toString();
        if (url.includes("https://icanhazdadjoke.com/")) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              id: "test-id-dadjoke",
              joke: "Test joke Dad Joke",
            }),
          } as Response);
        } else if (url.includes("https://api.chucknorris.io/jokes/random")) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              id: "test-id-chuck",
              value: "Test joke Chuck Norris",
            }),
          } as Response);
        }
        return Promise.reject(new Error("Invalid URL"));
      }
    );
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
    } as Response);
    const joke = await getRandomJoke();
    let ratedJoke = rateJoke(joke,1);
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
    } as Response);
    const joke = await getRandomJoke();
    const ratedJoke = rateJoke(joke,1);
    let updatedJoke = rateJoke(ratedJoke,2);
    expect(updatedJoke).toHaveProperty("score");
    expect(updatedJoke).toHaveProperty("date");
    expect(typeof updatedJoke.score).toBe("number");
    expect(typeof updatedJoke.date).toBe("string");
    expect(updatedJoke.score).toBe(2);
    expect(updatedJoke.score).toBeTruthy();
    expect(updatedJoke.date).toBeTruthy();
  })
  it("should console log the rating and the updated joke", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: "test-id-dadjoke",
        joke: "Test joke Dad Joke",
        }),
      } as Response);
      
      const consoleLogSpy = jest.spyOn(console, "log");
      const joke = await getRandomJoke();
      const ratedJoke = rateJoke(joke, 1);
      
      expect(consoleLogSpy).toHaveBeenCalledWith(
        `Joke ${ratedJoke.id} rating has been rated`,
      expect.objectContaining({
    id: ratedJoke.id,
    joke: ratedJoke.joke,
    score: 1
  })
      );
      
      const secondRating = rateJoke(ratedJoke, 2);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        `Joke ${secondRating.id} rating has been updated`,
        expect.objectContaining({
          id: secondRating.id,
          joke: secondRating.joke,
          score: 2
        })
      );
      
      expect(consoleLogSpy).toHaveBeenCalledTimes(2);
      consoleLogSpy.mockRestore();
    });
  });
