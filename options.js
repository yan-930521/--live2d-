let ver = document.getElementById('ver');
let box = document.getElementById('box');
let choose = document.getElementById('choose');
var v = "";
ver.onchange = () => {
  v = ver.value;
  chrome.storage.sync.set({ live2d_ver: v });
}

chrome.storage.sync.get(['live2d_ver'], (result) => {
  console.log("get")
  let others_path = `https://cdn.jsdelivr.net/gh/yan-930521/live2dModel2@${result.live2d_ver}/index.json`;
  fetch(others_path).then((response) => {
    return response.json();
  }).then((da) => {
    console.log(da)
    for (let d in da.models) {
      // data.models[d].name
      let b = document.createElement('button');
      // b.style.fontSize = '50px'
      b.style.border = '1px solid rgba(224, 186, 140, .62)'
      b.style.borderRadius = '12px'
      b.innerText = d;
      b.onclick = () => {
        alert("已選擇 " + d);
        choose.innerText = `live2d 模型 : ${d}`
        chrome.storage.sync.set({live2d_role: d});
      }
      box.appendChild(b);
    }
  })

})
