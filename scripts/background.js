// Listen to the runtime.onInstalled event to initialize an extension on installation.
// Use this event to set a state or for one-time initialization, such as a context menu.
chrome.runtime.onInstalled.addListener(function() {
  const genericOnClick = (info, tab) => {
    console.log("info", info)
    console.log("tab", tab)
  }

  const parentItem = chrome.contextMenus.create({
    id: "cabifyFrontEnd",
    title: "Cabify Front End",
    contexts: ["selection"]
  });

  const child1 = chrome.contextMenus.create({
    title: "Child 1",
    id: "CFEChild1",
    parentId: parentItem,
    contexts: ["selection"]
  });

  const child2 = chrome.contextMenus.create({
    title: "Child 2",
    id: "CFEChild2",
    parentId: parentItem,
    contexts: ["selection"]
  });

  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "CFEChild1") {
      console.log("info", info);
      console.log("tab", tab);

      chrome.tabs.executeScript({
        code: 'var body=document.getElementsByTagName("body")[0];var images=document.images;var div=document.createElement("div");function clickevent(img){var h=img.target.style.height;if(h==""){img.target.style.height=window.innerHeight+"px";window.body.scrollTop=img.target.offsetTop;console.log(img.target.offsetTop);}else{img.target.style.height="";}}for(var i=0;i<images.length;i++){var img=document.createElement("img");img.src=images.item(i).src;img.addEventListener("click",clickevent,false);div.appendChild(img);};body.innerHTML="";body.appendChild(div);'
      });
    }

    if (info.menuItemId === "CFEChild2") {
      chrome.tabs.executeScript({
        code: "(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()"
      });

    }
  });








});
