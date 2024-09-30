// Select DOM elements
const startScreen = document.getElementById('start-screen');
const inputScreen = document.getElementById('input-screen');
const itemCountInput = document.getElementById('itemCount');
const generateInputsButton = document.getElementById('generateInputs');
const inputFieldsDiv = document.getElementById('inputFields');
const chooseButton = document.getElementById('chooseButton');
const clearButton = document.getElementById('clearButton');
const tryAgainButton = document.getElementById('tryAgainButton'); // Now inside result screen
const resultScreen = document.getElementById('result-screen');
const decisionText = document.getElementById('decisionText');
const clearButtonResult = document.getElementById('clearButtonResult');

// Generate input fields based on user count
generateInputsButton.addEventListener('click', () => {
    const itemCount = parseInt(itemCountInput.value);

    // Check if the input is valid
    if (!isNaN(itemCount) && itemCount > 0) {
        inputFieldsDiv.innerHTML = ''; // Clear previous inputs

        // Generate the specified number of input fields with alternating placeholders
        for (let i = 0; i < itemCount; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `Item ${i + 1}`;
            input.classList.add('item-input');
            inputFieldsDiv.appendChild(input);
        }

        // Show the input screen
        startScreen.classList.add('hidden');
        inputScreen.classList.remove('hidden');
    }
});

// Choose a random item from the input fields
chooseButton.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.item-input');
    const items = Array.from(inputs).map(input => input.value).filter(value => value.trim() !== '');

    if (items.length > 0) {
        const randomChoice = items[Math.floor(Math.random() * items.length)];
        displayDecision(randomChoice);

        // Hide "Choose" and clear button, show result screen
        inputScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
    } else {
        alert('Please fill out all input fields.');
    }
});

// Display the decision with a splashy effect
function displayDecision(choice) {
    decisionText.innerText = choice;

    // Show result screen with animation
    resultScreen.classList.remove('hidden');
}

// Try Again button - selects a new random item
tryAgainButton.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.item-input');
    const items = Array.from(inputs).map(input => input.value).filter(value => value.trim() !== '');

    if (items.length > 0) {
        const randomChoice = items[Math.floor(Math.random() * items.length)];
        displayDecision(randomChoice);
    } else {
        alert('Please fill out all input fields.');
    }
});

// Clear everything and go back to the start
clearButton.addEventListener('click', () => {
    resetApp();
});

clearButtonResult.addEventListener('click', () => {
    resetApp();
});

function resetApp() {
    itemCountInput.value = '';
    inputFieldsDiv.innerHTML = '';
    decisionText.innerText = '';
    resultScreen.classList.add('hidden');
    inputScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    chooseButton.classList.remove('hidden');
}
