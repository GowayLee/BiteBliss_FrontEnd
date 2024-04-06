<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  textChangeAnimation()
});

function textChangeAnimation(): void {
  const elts = {
    text1: document.getElementById("text1") as HTMLSpanElement,
    text2: document.getElementById("text2") as HTMLSpanElement,
  };

  const texts = ["Bite Bliss", "A", "Canteen", "Mini", "App"];
  const morphTime = 1.25; // 变形的时间
  const cooldownTime = 0.75; // 保持清晰的时间

  let textIndex = texts.length - 1;
  let time: number = Date.now();
  let morph: number = 0;
  let cooldown: number = cooldownTime;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];

  animate();

  function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction: number = morph / morphTime;

    if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
    }

    setMorph(fraction);
  }

  function setMorph(fraction: number) {
    // fraction = Math.cos(fraction * Math.PI) / -2 + .5;

    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
  }

  function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
  }

  function animate() {
    requestAnimationFrame(animate);

    let newTime:number = Date.now();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
      if (shouldIncrementIndex) { // cooldown从正减到负
        textIndex++;
      }

      doMorph();
    } else {
      doCooldown();
    }
  }
}

</script>

<template>
  <div class="mainLogo">
    <span id="BBicon">&#xe602;</span>
  </div>

  <div id="container">
    <span id="text1"></span>
    <span id="text2"></span>
  </div>
  <var-divider style="margin-top: 17vh;"></var-divider>
  <div style="display: grid; justify-content: center; padding: 20px; font-size: 20px;">
    <p class="en">💡This is a mini app which concentrate on information of canteen</p>
    <p class="zh">这是一个专注研究干饭的小程序</p>
    <p class="en">🎊It provides creative little features. For example, drawing lots to decide today's meal!</p>
    <p class="zh">它包含一些有趣(有趣 != 有用)的小功能，比如可以抽签决定这顿吃啥！</p>
    <p class="en">📜Later on, XMUMers can browse everything about eating at XMUM! (Still under development...)</p>
    <p class="zh">未来，XMUMers可以在这里找到关于XMUM干饭的一切！（刚新建文件夹）</p>
    <var-divider/>
    <p style="font-family: 'Lexend', cursive;">
      <span style="font-size: 16px; color: grey;">DevTeam:</span>
      <span style="font-size: 20px; font-weight: bold;"> Dr. Malo</span>
      <span style="font-size: 26px;">🐵</span>
    </p>
  </div>


  <svg id="filter" style="display: none;">
    <defs>
      <filter id="threshold">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -150"
        />
      </filter>
    </defs>
  </svg>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway:900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=ZCOOL+XiaoWei&display=swap');
#container {
  position: absolute;
  margin: auto;
  width: 100vw;
  height: 80px;
  top: 25vh;
  filter: url(#threshold) blur(0.5px);
}

#text1, #text2 {
  position: absolute;
  width: 100%;
  display: inline-block;
  font-family: 'Raleway', sans-serif;
  font-size: 45px;
  color: rgb(0, 0, 0);
  text-align: center;
  user-select: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.mainLogo {
  display: flex;
  justify-content: center;
  margin-top: 10vh;
}

.iconfont {
  position: relative;
  font-family: "iconfont" !important;
  font-size: 5em;
  font-style: normal;
  color: #000000;
}
#BBicon {
  position: relative;
  font-family: "iconfont" !important;
  font-size: 5em;
  font-style: normal;
  animation: changeColor 8s linear infinite; /* 应用循环变换颜色的动画 */
}

@keyframes changeColor {
  0% { color: rgb(39, 39, 39); }
  25% { color: rgb(50, 117, 76); }
  50% { color: rgb(24, 103, 150); }
  75% { color: rgb(161, 104, 153); }
  100% { color: rgb(48, 46, 38); }
}

.en {
  margin-top: 15px;
  margin-bottom: 0px;
  font-family: "Lexend", cursive;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.zh {
  margin-top: 5px;
  margin-bottom: 15px;
  font-family: "ZCOOL XiaoWei", sans-serif;
}
</style>
