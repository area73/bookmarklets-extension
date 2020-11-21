
document.getElementById('customCSS').onclick = function() {
  // TO SI this value you will need to open opup rightclick and go to dev tools for that html
  console.log("this.checked", this.checked);
  // An alternative will be to log into background were you cana have all logs
  // and acces to this page debug from chrome://extensions
  chrome.extension.getBackgroundPage().console.log("wadus wadus")


  const  message = document.querySelector('#message');

  const checked = this.checked

    const storage = chrome.storage.local;
    storage.get('css', function(items) {
      chrome.extension.getBackgroundPage().console.log("items-->",items)
      // If there is CSS specified, inject it into the page.
      if (items.css) {
        if(checked) {
          chrome.tabs.insertCSS({code: items.css}, function() {
            if (chrome.runtime.lastError) {
              message.innerText = 'Not allowed to inject CSS into special page.';
            } else {
              message.innerText = 'Injected style!';
            }
          });
        } else {
          chrome.tabs.removeCSS({code: items.css});
        }

      } else {
        var optionsUrl = chrome.extension.getURL('options.html');
        message.innerHTML = 'Set a style in the <a target="_blank" href="' +
          optionsUrl + '">options page</a> first.';
      }
    });

}

