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
    <span class="iconfont">&#xe602;</span>
  </div>

  <div id="container">
    <span id="text1"></span>
    <span id="text2"></span>
  </div>

  <div class="fillup"></div>

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
#container {
  position: absolute;
  margin: auto;
  width: 100vw;
  height: 80px;
  top: 45vh;
  filter: url(#threshold) blur(0.5px);
}

#text1, #text2 {
  position: absolute;
  width: 100%;
  display: inline-block;
  font-family: 'Raleway', sans-serif;
  font-size: 55px;
  color: rgb(252, 252, 252);
  text-align: center;
  user-select: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.mainLogo {
  display: flex;
  justify-content: center;
  height: 60vh;
  background-color: #000000;
}

.iconfont {
  position: relative;
  top: 25vh;
  font-family: "iconfont" !important;
  font-size: 5em;
  font-style: normal;
  color: #ffffff;
  text-shadow: 0 0 50px #10d431,
                0 0 100px #10d431,
                0 0 150px #10d431,
                0 0 200px #10d431,
                0 0 250px #10d431;
  animation: animate 3s linear infinite;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@keyframes animate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

.fillup {
  height: 33vh;
  background-image: linear-gradient(to bottom, #000000, #868686);
}
</style>
