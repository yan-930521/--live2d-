let ver = document.getElementById('ver');
var v = ""
ver.onchange = () =>{
    v = ver.value;
    chrome.storage.sync.set({live2d_ver: v});
}