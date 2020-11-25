// Works in all chromium-based-browsers
// If executed in the console, it copies all revealed keys from 
// https://www.humblebundle.com/home/keys to the clipboard
// which can then be pasted to be activated into an ASF-Bot or
// Enhanced Steam bulk key activation prompt

function copyToClipboard(string) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = string;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

var keyfields = document.querySelectorAll("[class*=keyfield-value]"); // "keyfield-value" is the div class name holding the key(s)
var keys = "";
elementLoop:
  for (var i = 0; i < keyfields.length; i++) {
    var key = keyfields[i];
    keys += key.innerText + "\n";
  }
navigator.permissions.query({name: "clipboard-write"}).then(result => { // required query to allow copying to clipboard, currently incompatible with firefox
  if (result.state == "granted" || result.state == "prompt") {
    /* write to the clipboard now */
        textToClipboard(keys);
  }
});
