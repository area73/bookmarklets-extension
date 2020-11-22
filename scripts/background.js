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

  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "CFEChild1") {
      console.log("info", info);
      console.log("tab", tab);
    }
  });
});
