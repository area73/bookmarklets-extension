import {bklog} from '../utils.js';

const customCSS = function() {
  bklog("::customCSS::");
  // TO see this value you will need to open popup. right click and go to dev tools for that html
  bklog("this.checked", this.checked);
  // An alternative will be to log into background were you can have all logs
  // and access to this page debug from chrome://extensions

  const  message = document.querySelector('#message');

  const checked = this.checked

  chrome.storage.local.get('css', function(items) {
    bklog("items-->",items);
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
      const optionsUrl = chrome.extension.getURL('options.html');
      message.innerHTML = 'Set a style in the <a target="_blank" href="' +
        optionsUrl + '">options page</a> first.';
    }
  });
}

export {customCSS};

