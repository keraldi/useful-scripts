/**
 * humble_keyfetcher.js
 *
 * Description:
 *   Fetches revealed keys/entitlements from https://www.humblebundle.com/home/keys or the monthly claim pages
 *   and puts them into the clipboard. Works in chromium-based browsers.
 *   Useful for ASF-Bot or Enhanced Steam bulk key activation prompt.
 *
 * Usage:
 * 	1. Visit  https://www.humblebundle.com/home/keys
 *  2. (optional) hide revealed keys (assuming you already used revealed keys, we don't want to process them again)
 *	3. Execute script in console
 *	4. Keys will be in clipboard and console log
 *  5. Progress to next page
 *  6. Repeat
 **/

// Function to click all buttons
function clickAllButtons() {
  var keyfieldButtons = document.querySelectorAll("[class*=js-keyfield]"); // "keyfield-value" is the div class name holding the key(s)
  for (let i = 0; i < keyfieldButtons.length; i++) {
    keyfieldButtons[i].click();
  }
}

// Function to copy the contents
function copyContents() {
  var keyfields = document.querySelectorAll("[class*=keyfield-value]"); // "keyfield-value" is the div class name holding the key(s)
  var keys = "";
  for (let i = 0; i < keyfields.length; i++) {
    var key = keyfields[i];
    if (key.innerText !== "Reveal your Steam key") {
      keys += key.innerText + "\n";
    }
  }
  console.log(keys);
  copy(keys);
}

// Function to wait until all elements matching a selector do not exist anymore
// TODO: This function does not work as intended. Callback is executed after each element removed as opposed to only once all elements have been removed.
// TODO: I assume that one of the query selectors doesn't work as intended. Won't work on it unless I'm redeeming mutliple pages of unredeemed keys again.
function waitForElementsRemoval(selector, callback) {
    let elementsToRemove = document.querySelectorAll(selector).length; // Total count of elements to be removed
  	console.log(elementvsToRemove);

    const observer = new MutationObserver(() => {
        const remainingElements = document.querySelectorAll(selector).length;
      	console.log(remainingElements);
        if (remainingElements === 0) {
            observer.disconnect(); // Disconnect the observer once all elements are removed
            callback(); // Execute callback
        }
    });

    // Start observing the document body for configured mutations
    observer.observe(document.body, { childList: true, subtree: true });

    // If there are no elements to remove initially, execute the callback immediately
    if (elementsToRemove === 0) {
        callback();
    }
}

// Click all buttons
clickAllButtons();


// Example usage:
setTimeout(waitForElementsRemoval('.in-progress', () => {
    console.log('All elements with class "in-progress" have been removed.');
  	copyContents();
    // Your code to execute after all elements are removed goes here
}),5000);
