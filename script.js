const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


const jokesApiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single';

function toggleDisabled() {
    button.disabled = !button.disabled;
}

async function getJokes() {
    toggleDisabled();
    try {
        const jokesResponse = await fetch(jokesApiUrl);
        const jokes = await jokesResponse.json();
        tellMe(jokes.joke);
    } catch (error) {
        toggleDisabled()
    }
}

function tellMe(joke) {
    VoiceRSS.speech({
        key: '<API_KEY>',
        src: joke,
        hl:  'en-us',
        r: '0',
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });

}

button.addEventListener('click', () => {
    getJokes();
})
audioElement.addEventListener("ended", () => {
    toggleDisabled();
}, false);