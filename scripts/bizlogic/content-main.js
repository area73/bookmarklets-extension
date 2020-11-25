import {bklog} from './utils.js';
import {customCSS} from './rules/customCSS.js';
import {cssVulnerability} from './rules/cssVulnerability.js';
import {FPSStats} from './rules/FPSstats.js';

const options = document.querySelector('#options');
const optionsUrl = chrome.extension.getURL('options.html');
options.innerHTML = `<a target="_blank" href="${optionsUrl}">options page</a>.`;


document.getElementById('customCSS').onclick = customCSS;
document.getElementById('cssVulnerability').onclick = cssVulnerability;
document.getElementById('FPSStats').onclick = FPSStats;
