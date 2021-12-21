var others_ver = "ff5d2381aed472cfa960df65daa92419b174330b";
var others_path = `https://cdn.jsdelivr.net/gh/yan-930521/Live2d-model@${others_ver}/`;

var data = {
  "mouseover": [{
    "selector": "#live2d",
    "text": ["不可以色色！！！"]
  }, {
    "selector": "#waifu-tool .fa fa-lg fa-camera-retro",
    "text": ["你想幫我拍照嗎？"]
  }],
  "click": [{
    "selector": "#live2d",
    "text": ["不要亂碰人家啦...!"]
  }],
  "seasons": [{
    "date": "05/21",
    "text": "讓我們一起祝櫻2生日快樂～"
  }]
}
initWidget(others_path);

function loadWidget(others_path) {
  localStorage.removeItem("waifu-display");
  sessionStorage.removeItem("waifu-text");
  document.body.insertAdjacentHTML("beforeend", `<div id="waifu">
			<div id="waifu-tips"></div>
			<canvas id="live2d" width="800" height="800"></canvas>
			<div id="waifu-tool">
				<span class="fa fa-lg fa-camera-retro"></span>
			</div>
		</div>`);
  setTimeout(() => {
    let w = document.getElementById("waifu");
    w.style.bottom = 0;
    w.style.display = "block";
  }, 0);


  // loadModel(live2d_path+"Datas/Tia/index.json");
  /*
  {
      name:"狂三",
      id:"l_234600111"
    },
    {
      name:"折紙",
      id:"l_234500311"
    },
    {
      name:"琴里",
      id:"l_234200211"
    },
    {
      name:"四糸乃",
      id:"l_234100511"
    },
    */
  let molist = [
    {
      id: "l_103300401"
    }, {
      id: "l_103300460"
    }, {
      id: "l_103501211"
    }, {
      id: "l_113100911"
    }, {
      id: "l_114202911"
    }, {
      id: "l_133100301"
    }, {
      id: "l_133100611"
    }, {
      id: "l_134100111"
    }, {
      id: "l_143200301"
    }, {
      id: "l_143200360"
    }, {
      id: "l_144402311"
    }, {
      id: "l_153400301"
    }, {
      id: "l_153400360"
    }, {
      id: "l_154500211"
    }, {
      id: "l_234100511"
    }, {
      id: "l_234200211"
    }, {
      id: "l_234400411"
    }, {
      id: "l_234400412"
    }, {
      id: "l_234500311"
    }, {
      id: "l_234600111"
    }
  ]

  loadModel(others_path + "方舟指令/" + molist[Math.floor(Math.random() * molist.length)].id + "/model.json");
  // 檢測用戶狀態

  var userAction = false,
    userActionTimer,
    messageTimer,
    messageArray = ["好久不見啊！", "人家好無聊喔......"];

  window.addEventListener("mousemove", () => userAction = true);
  window.addEventListener("keydown", () => userAction = true);

  setInterval(() => {
    if (userAction) {
      userAction = false;
      clearInterval(userActionTimer);
      userActionTimer = null;
    } else if (!userActionTimer) {
      userActionTimer = setInterval(() => {
        showMessage(randomSelection(messageArray), 6000, 9);
      }, 20000);
    }
  }, 1000);

  (function registerEventListener() {

    document.querySelector("#waifu-tool .fa-camera-retro").addEventListener("click", () => {
      showMessage("人家可愛吧？", 6000, 9);
      Live2D.captureName = "photo.png";
      Live2D.captureFrame = true;
    });

    window.addEventListener("copy", () => {
      showMessage("hummm 你複製了什麼呢？", 6000, 9);
    });

    window.addEventListener("visibilitychange", () => {
      if (!document.hidden) showMessage("歡迎回家～", 6000, 9);
    });

  })();

  (function welcomeMessage() {
    let text;
    if (location.pathname === "/") { // 如果是主页
      const now = new Date().getHours();
      if (now > 5 && now <= 11) text = "早安安呦！";
      else if (now > 11 && now <= 17) text = "午安！ 吃午餐了嗎？";
      else if (now > 17 && now <= 21) text = "晚安阿，今天過的如何？";
      else if (now > 21 && now <= 23) text = "記得早一點睡喔！";
      else text = "好晚了... 快點去睡覺啦...！";
    }
    showMessage(text, 7000, 8);
  })();

  window.addEventListener("mouseover", event => {
    for (let { selector, text } of data.mouseover) {
      if (!event.target.matches(selector)) continue;
      text = randomSelection(text);
      text = text.replace("{text}", event.target.innerText);
      showMessage(text, 4000, 8);
      return;
    }
  });
  window.addEventListener("click", event => {
    for (let { selector, text } of data.click) {
      if (!event.target.matches(selector)) continue;
      text = randomSelection(text);
      text = text.replace("{text}", event.target.innerText);
      showMessage(text, 4000, 8);
      return;
    }
  });
  data.seasons.forEach(({ date, text }) => {
    const now = new Date(),
      after = date.split("-")[0],
      before = date.split("-")[1] || after;
    if ((after.split("/")[0] <= now.getMonth() + 1 && now.getMonth() + 1 <= before.split("/")[0]) && (after.split("/")[1] <= now.getDate() && now.getDate() <= before.split("/")[1])) {
      text = randomSelection(text);
      text = text.replace("{year}", now.getFullYear());
      //showMessage(text, 7000, true);
      messageArray.push(text);
    }
  });

  function randomSelection(obj) {
    return Array.isArray(obj) ? obj[Math.floor(Math.random() * obj.length)] : obj;
  }

  function showMessage(text, timeout, priority) {
    if (!text || (sessionStorage.getItem("waifu-text") && sessionStorage.getItem("waifu-text") > priority)) return;
    if (messageTimer) {
      clearTimeout(messageTimer);
      messageTimer = null;
    }
    text = randomSelection(text);
    sessionStorage.setItem("waifu-text", priority);
    const tips = document.getElementById("waifu-tips");
    tips.innerHTML = text;
    tips.classList.add("waifu-tips-active");
    messageTimer = setTimeout(() => {
      sessionStorage.removeItem("waifu-text");
      tips.classList.remove("waifu-tips-active");
    }, timeout);
  }

  async function loadModel(live2d_path) {
    loadlive2d("live2d", `${live2d_path}`);
  }
}
function initWidget(others_path) {
  loadWidget(others_path);
}

