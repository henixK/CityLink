function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Array of phrases to display
const cityList = ["Rome", "London", "New York", "Amsterdam", "Paris", "Tokyo"].map(phrase => phrase + "?");

// Get the element where the text will be displayed
const el = document.getElementById("typewriter");

// Time to sleep between each character typing
let sleepTime = 100;

// Index of the current phrase being displayed
let curPhraseIndex = 0;

// Function to perform the typewriter effect
const writeLoop = async () => {
    while (true) {
        let curWord = cityList[curPhraseIndex];

        // Typing the characters of the current phrase
        for (let i = 0; i < curWord.length; i++) {
            el.innerText = curWord.substring(0, i + 1);
            await sleep(sleepTime);
        }

        // Pause after typing the entire phrase
        await sleep(sleepTime * 10);

        // Deleting the characters of the current phrase
        for (let i = curWord.length; i >= 0; i--) {
            el.innerText = curWord.substring(0, i);
            await sleep(sleepTime);
        }

        // Pause after deleting the entire phrase
        await sleep(sleepTime * 5);

        // Move to the next phrase or loop back to the first one
        if (curPhraseIndex === cityList.length - 1) {
            curPhraseIndex = 0;
        } else {
            curPhraseIndex++;
        }
    }
};

// Start the typewriter effect
writeLoop();
