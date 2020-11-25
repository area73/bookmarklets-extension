
const bklog = (...str) => chrome.extension.getBackgroundPage().console.log(...str);

export {bklog}
