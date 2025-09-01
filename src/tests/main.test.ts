import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { getRandomJoke, rateJoke, getWeather } from "../scripts/main";

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
  it("should return a Joke object", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: "test-id",
        joke: "Test joke",
      }),
    } as Response);
    const joke = await getRandomJoke();
    expect(joke).toHaveProperty("id");
    expect(joke).toHaveProperty("joke");
    expect(typeof joke.id).toBe("string");
    expect(typeof joke.joke).toBe("string");
    expect(joke).toBeDefined();
    expect(joke).not.toBeNull();
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
});
