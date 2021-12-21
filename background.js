chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": "showLIVE2D_append",
    "title": "live2d 擴展 on",
    "contexts": ["page", "selection", "image", "link"]
  })
  chrome.contextMenus.create({
    "id": "hide",
    "title": "live2d 隱藏 off",
    "contexts": ["page", "selection", "image", "link"]
  })
  chrome.contextMenus.create({
    "id": "help",
    "title": "live2d 幫助 help",
    "contexts": ["page", "selection", "image", "link"]
  })
  chrome.storage.sync.get(['live2d_ver'], (result) => {
    console.log('the version is ' + result.live2d_ver);
    if(!result.live2d_ver || result.live2d_ver.includes('@')) {
      chrome.storage.sync.set({live2d_ver: "1ef61178c7c6787a950f064613c8e3be2c67e153"});
      chrome.storage.sync.get(['live2d_ver'], (result) => {
        console.log('the new version is ' + result.live2d_ver);
      });
    }
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "showLIVE2D_append":
      showLIVE2D_append(tab);
      break;
    case "hide":
      hide(tab);
      break;
    case "help":
      help(tab);
      break;
  }
})

async function showLIVE2D_append(tab) {
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ["/live2d/waifu.css"]
  });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["/live2d/live2d.min.js", "/live2d/waifu-tips.js"]
  });

}
async function hide(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["off.js"]
  });
}
async function help(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["help.js"]
  });
}