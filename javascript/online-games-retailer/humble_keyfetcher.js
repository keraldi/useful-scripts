/**
* humble_keyfetcher.js
*
* Description:
*   Fetches revealed keys/entitlements from https://www.humblebundle.com/home/keys
*   and puts them into the clipboard. Works in chromium-based browsers.
*   Useful for ASF-Bot or Enhanced Steam bulk key activation prompt.
* 
* Usage:
*   Execute in console on https://www.humblebundle.com/home/keys.
*   Allow clipboard access if requested. Paste clipboard content where desired.
**/

function copyToClipboard(string) {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = string;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

let keyfields = document.querySelectorAll("[class*=keyfield-value]"); // "keyfield-value" is the div class name holding the key(s)
let keys = "";
elementLoop:
  for (let i = 0; i < keyfields.length; i++) {
    let key = keyfields[i];
    if (key.innerText !== "Reveal your Steam key") {
      keys += key.innerText + "\n";
    }
  }
navigator.permissions.query({name: "clipboard-write"}).then(result => { // required query to allow copying to clipboard, currently incompatible with firefox
  if (result.state == "granted" || result.state == "prompt") {
    /* write to the clipboard now */
        copyToClipboard(keys);
  }
});
