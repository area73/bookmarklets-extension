import {bklog} from '../utils.js';

const FPSStats = function() {
  bklog("::FPSStats::");
  function modifyDOM() {
    // uso de bookmarklet
    var el=document.createElement('script');el.src='https://zeman.github.io/perfmap/perfmap.js';document.body.appendChild(el);
    return el;
  }

  //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
  chrome.tabs.executeScript({
    code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
  }, function(results)  {
    bklog(results)
  });
};


export {FPSStats}
