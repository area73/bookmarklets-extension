

const bklog = (str) => chrome.extension.getBackgroundPage().console.log(str);


const options = document.querySelector('#options');
const optionsUrl = chrome.extension.getURL('options.html');
options.innerHTML = `<a target="_blank" href="${optionsUrl}">options page</a>.`;

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
    if (items.cssx) {
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



document.getElementById("cssVulnerability").addEventListener('click', () => {

  function modifyDOM() {
    //You can play with your DOM here or check URL against your regex
    console.log('Tab script:');
    console.log(document.body);
    console.log("document.styleSheets--->",document.styleSheets);
    // debugger;
    return document.styleSheets;
    // return document.body.innerHTML;
  }

  //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
  chrome.tabs.executeScript({
    code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
  }, (results) => {
    bklog('Popup script 2:')
    bklog(results[0])

  });
});



document.getElementById("stats").addEventListener('click', () => {

  function modifyDOM() {
/*
      const  script=document.createElement('script');
      script.onload=function() {
        const stats=new Stats();
        document.body.appendChild(stats.dom);
        requestAnimationFrame(function loop(){
          stats.update();
          requestAnimationFrame(loop)});
      }
      script.src='//mrdoob.github.io/stats.js/build/stats.min.js';
      document.head.appendChild(script);
      debugger;
*/

//     (function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()


    // stats.js - http://github.com/mrdoob/stats.js
    const script = (function(f, e) {
        "object" === typeof exports && "undefined" !== typeof module ? module.exports = e() : "function" === typeof define && define.amd ? define(e) : f.Stats = e()
      }
    )(this, function() {
      var f = function() {
        function e(a) {
          c.appendChild(a.dom);
          return a
        }
        function u(a) {
          for (var d = 0; d < c.children.length; d++)
            c.children[d].style.display = d === a ? "block" : "none";
          l = a
        }
        var l = 0
          , c = document.createElement("div");
        c.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";
        c.addEventListener("click", function(a) {
          a.preventDefault();
          u(++l % c.children.length)
        }, !1);
        var k = (performance || Date).now()
          , g = k
          , a = 0
          , r = e(new f.Panel("FPS","#0ff","#002"))
          , h = e(new f.Panel("MS","#0f0","#020"));
        if (self.performance && self.performance.memory)
          var t = e(new f.Panel("MB","#f08","#201"));
        u(0);
        return {
          REVISION: 16,
          dom: c,
          addPanel: e,
          showPanel: u,
          begin: function() {
            k = (performance || Date).now()
          },
          end: function() {
            a++;
            var c = (performance || Date).now();
            h.update(c - k, 200);
            if (c >= g + 1E3 && (r.update(1E3 * a / (c - g), 100),
              g = c,
              a = 0,
              t)) {
              var d = performance.memory;
              t.update(d.usedJSHeapSize / 1048576, d.jsHeapSizeLimit / 1048576)
            }
            return c
          },
          update: function() {
            k = this.end()
          },
          domElement: c,
          setMode: u
        }
      };
      f.Panel = function(e, f, l) {
        var c = Infinity
          , k = 0
          , g = Math.round
          , a = g(window.devicePixelRatio || 1)
          , r = 80 * a
          , h = 48 * a
          , t = 3 * a
          , v = 2 * a
          , d = 3 * a
          , m = 15 * a
          , n = 74 * a
          , p = 30 * a
          , q = document.createElement("canvas");
        q.width = r;
        q.height = h;
        q.style.cssText = "width:80px;height:48px";
        var b = q.getContext("2d");
        b.font = "bold " + 9 * a + "px Helvetica,Arial,sans-serif";
        b.textBaseline = "top";
        b.fillStyle = l;
        b.fillRect(0, 0, r, h);
        b.fillStyle = f;
        b.fillText(e, t, v);
        b.fillRect(d, m, n, p);
        b.fillStyle = l;
        b.globalAlpha = .9;
        b.fillRect(d, m, n, p);
        return {
          dom: q,
          update: function(h, w) {
            c = Math.min(c, h);
            k = Math.max(k, h);
            b.fillStyle = l;
            b.globalAlpha = 1;
            b.fillRect(0, 0, r, m);
            b.fillStyle = f;
            b.fillText(g(h) + " " + e + " (" + g(c) + "-" + g(k) + ")", t, v);
            b.drawImage(q, d + a, m, n - a, p, d, m, n - a, p);
            b.fillRect(d + n - a, m, a, p);
            b.fillStyle = l;
            b.globalAlpha = .9;
            b.fillRect(d + n - a, m, a, g((1 - h / w) * p))
          }
        }
      }
      ;
      return f
    });





    return script;
    // return document.body.innerHTML;
  }

  //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
  chrome.tabs.executeScript({
    code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
  }, (results) => {
    bklog('Popup script 2:')
    bklog(results[0])
  });
});



