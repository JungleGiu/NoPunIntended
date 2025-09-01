import { describe, it, expect } from "@jest/globals";
import { getRandomJoke } from "../scripts/main";
import { Joke } from "../scripts/types";



describe("getRandomJoke", () => {
    it("should return a Joke object", async () => {
        const joke = await getRandomJoke();
     
        expect(joke).toHaveProperty("id");
        expect(joke).toHaveProperty("joke");
    });
});