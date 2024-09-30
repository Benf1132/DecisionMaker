// Select DOM elements
const startScreen = document.getElementById('start-screen');
const inputScreen = document.getElementById('input-screen');
const itemCountInput = document.getElementById('itemCount');
const generateInputsButton = document.getElementById('generateInputs');
const inputFieldsDiv = document.getElementById('inputFields');
const chooseButton = document.getElementById('chooseButton');
const clearButton = document.getElementById('clearButton');
const tryAgainButton = document.getElementById('tryAgainButton');
const resultScreen = document.getElementById('result-screen');
const decisionText = document.getElementById('decisionText');
const clearButtonResult = document.getElementById('clearButtonResult');

let previouslySelected = [];

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
            input.placeholder = `Option ${i + 1}`;
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
    const items = Array.from(inputs).map(input => input.value.trim());

    // Check if all fields are filled
    if (items.some(item => item === '')) {
        alert('Please fill out all input fields.');
        return; // Stop execution if any field is empty
    }

    const remainingItems = items.filter(item => !previouslySelected.includes(item));

    if (remainingItems.length === 0) {
        previouslySelected = []; // Reset when all options are chosen
        alert("All options have been selected! Resetting...");
        return;
    }

    const randomChoice = remainingItems[Math.floor(Math.random() * remainingItems.length)];
    previouslySelected.push(randomChoice); // Store selected item

    displayDecision(randomChoice);

    // Hide "Choose" and show "Try Again"
    chooseButton.classList.add('hidden');
    tryAgainButton.classList.remove('hidden');
});

// Try Again button - selects a new random item
tryAgainButton.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.item-input');
    const items = Array.from(inputs).map(input => input.value.trim());

    // Check if all fields are filled
    if (items.some(item => item === '')) {
        alert('Please fill out all input fields.');
        return; // Stop execution if any field is empty
    }

    const remainingItems = items.filter(item => !previouslySelected.includes(item));

    if (remainingItems.length === 0) {
        previouslySelected = []; // Reset when all options are chosen
        alert("All options have been selected! Resetting...");
        return;
    }

    const randomChoice = remainingItems[Math.floor(Math.random() * remainingItems.length)];
    previouslySelected.push(randomChoice);
    displayDecision(randomChoice);
});

// Display the decision with a splashy effect
function displayDecision(choice) {
    decisionText.innerText = choice;

    // Hide input screen, show result screen with animation
    inputScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
}

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
    tryAgainButton.classList.add('hidden'); // Reset "Try Again" visibility
    previouslySelected = []; // Reset the previously selected items
}
