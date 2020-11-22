

const bklog = (str) => chrome.extension.getBackgroundPage().console.log(str);



document.getElementById('customCSS').onclick = function() {
  // TO SI this value you will need to open opup rightclick and go to dev tools for that html
  console.log("this.checked", this.checked);
  // An alternative will be to log into background were you cana have all logs
  // and acces to this page debug from chrome://extensions
  bklog("wadus wadus");


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
        optionsUrl + '">please set options page</a> first.';
    }
  });

}





document.getElementById("cssVulnerability").addEventListener('click', () => {
  console.log("Popup DOM fully loaded and parsed");

  function modifyDOM() {
    //You can play with your DOM here or check URL against your regex
    console.log('Tab script:');
    console.log(document.body);
    return document.body.innerHTML;
  }

  //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
  chrome.tabs.executeScript({
    code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
  }, (results) => {
    //Here we have just the innerHTML and not DOM structure
    console.log('Popup script:')
    console.log(results[0]);
  });
});





/*
document.getElementById('cssVulnerability').onclick = function() {
  const isChecked = this.checked;

  if(isChecked) {

  }


  console.log("Popup DOM fully loaded and parsed");

  function modifyDOM() {
    //You can play with your DOM here or check URL against your regex
    bklog('Tab script:');
    window.alert("TAB")
    bklog(document.body);
    return document.body.innerHTML;
  }


  chrome.tabs.executeScript({
    // code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
    code: document.body.innerHTML
  }, (results) => {
    //Here we have just the innerHTML and not DOM structure
    bklog('Popup script:')
    bklog(results);
  });

  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    var currentTab = tabs[0];
    var tabURL = tabs[0].url;
    // window.alert(tabURL);
    bklog(currentTab)
    // bklog(currentTab.styleSheets)
    // bklog(this.document.styleSheets)
  });


}
*/

