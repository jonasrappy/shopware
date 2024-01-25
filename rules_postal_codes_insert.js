let postalCodes = [800, 877]; // Add your postal codes you want to insert
let inputFieldSelector = '.sw-tagged-field__input';
let delayBetweenCodes = 500; // Delay between each postal code
let delayBetweenKeypresses = 50; // Delay between each keypress

function simulateKeypress(inputField, key) {
    // Create and dispatch the 'keydown' event
    let keydownEvent = new KeyboardEvent('keydown', { key: key, code: key, bubbles: true });
    inputField.dispatchEvent(keydownEvent);

    // Change the value of the input field and dispatch the 'input' event
    if (key !== 'Enter') {
        inputField.value += key; // Append character to the input value
        let inputEvent = new Event('input', { bubbles: true });
        inputField.dispatchEvent(inputEvent);
    }
}

function typeCode(inputField, code) {
    code.toString().split('').forEach((char, index) => {
        setTimeout(() => {
            simulateKeypress(inputField, char);
        }, index * delayBetweenKeypresses);
    });
}

postalCodes.forEach((code, index) => {
    setTimeout(() => {
        let inputField = document.querySelector(inputFieldSelector);
        if (inputField) {
            inputField.focus(); // Focus on the input field
            inputField.value = ''; // Clear the input field before typing
            typeCode(inputField, code); // Type the code character by character
            setTimeout(() => {
                simulateKeypress(inputField, 'Enter'); // Simulate Enter key press after typing the code
            }, code.toString().length * delayBetweenKeypresses);
        }
    }, index * delayBetweenCodes);
});
