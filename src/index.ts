const jokeElement = document.getElementById('joke') as HTMLDivElement;
const jokeButton = document.getElementById('joke-button') as HTMLButtonElement;
const getRandomJoke: Function = async () : Promise<string> => {
    const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        },
        method: 'GET'
    });
    const data = await response.json();
    return data.joke;
};

getRandomJoke().then((joke : string) => {
    jokeElement.innerHTML = joke; 
}).catch((error : Error) => {
    console.error('Error fetching joke:', error);
});

jokeButton.addEventListener('click', () => {
    getRandomJoke().then((joke : string) => {
        jokeElement.innerHTML = joke; 
        console.log(joke);
    }).catch((error : Error) => {
        console.error('Error fetching joke:', error);
    })
})