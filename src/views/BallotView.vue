<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { Snackbar } from '@varlet/ui'

// =======================常量=======================
const B1List = ['Sapid', 'Poke Bowl Rice', 'Zone U Bakery']
const D6List = [
  "Let's Kopitiam 南洋风味",
  'Under Tree 大树下',
  'Lao Di Fang 老地方',
  'Express Delight House 夏一城',
  'Da Cheng Xiao Shi 大城小食',
  'Shu Zhi Wei 蜀之味',
  'BC 7 大家旺',
  'Takwa Mee Tarik 兰州拉面',
  'Restaurant Kabaabish',
  'Little Taiwan 小台枫',
  'U&I 美式早餐',
  'Big Bowl Noodles 大碗面',
  'Meow Health Food 喵喵轻食',
  'Thumbs Up 大拇指',
  'Little Cloud HK Café 小云冰室'
]
const LY3List = [
  'Uni Hotpot 有你香锅',
  'Little Bowl 小碗菜',
  'Kami Cemerlang 佳味食轩',
  'Penang Flavour 槟城风味',
  'Castle in the Sky 膳一城',
  'Xiao Jiu Zhou 小九州',
  'Mad Plate Express 日式铁板烧饭',
  "Bean's Express",
  'Zhong Min Kitchen 中闽美食'
]
const CoffeeList = [
  'Regiustea 皇茶',
  'My Little Herbal Tea 华联好凉茶',
  'Zus Coffee',
  'Lake Front Café 小巨蛋咖啡厅'
]
const selectedList = ref([
  "Let's Kopitiam 南洋风味",
  'Under Tree 大树下',
  'Lao Di Fang 老地方',
  'Express Delight House 夏一城',
  'Da Cheng Xiao Shi 大城小食',
  'Shu Zhi Wei 蜀之味',
  'BC 7 大家旺',
  'Takwa Mee Tarik 兰州拉面',
  'Restaurant Kabaabish',
  'Little Taiwan 小台枫',
  'U&I 美式早餐',
  'Big Bowl Noodles 大碗面',
  'Meow Health Food 喵喵轻食',
  'Thumbs Up 大拇指',
  'Little Cloud HK Café 小云冰室',
  'Uni Hotpot 有你香锅',
  'Little Bowl 小碗菜',
  'Kami Cemerlang 佳味食轩',
  'Penang Flavour 槟城风味',
  'Castle in the Sky 膳一城',
  'Xiao Jiu Zhou 小九州',
  'Mad Plate Express 日式铁板烧饭',
  "Bean's Express",
  'Zhong Min Kitchen 中闽美食'
])
const showHowToUse: Ref<boolean> = ref(false)

const collapseCtrl = ref([])
const playBtnTxt = ref('Ready!')
const rotating = ref(true)
var rotateSpeed = 0.0005 // 初值为进入应用的轮盘展示速度


onMounted(() => {
  drawWordRing()
  drawArrow()
})

function drawWordRing(): void {
  const wordRingCanvas = document.getElementById('wordRingCanvas') as HTMLCanvasElement
  const wordRingCtx = wordRingCanvas.getContext('2d')
  wordRingCanvas.width = window.innerWidth
  wordRingCanvas.height = window.innerHeight * 0.5

  requestAnimationFrame(rotateAnimation)

  function rotateAnimation(): void {
    if (wordRingCtx == null) {
      return
    }
    wordRingCtx.clearRect(0, 0, wordRingCanvas.width, wordRingCanvas.height)
    let centerX = wordRingCanvas.width / 2 - 40
    let centerY = wordRingCanvas.height * 1.15
    let isAlign: boolean = false; // item是否与箭头对齐

    const time = Date.now()

    selectedList.value.forEach((word: string, index: number) => {
      let theta = ((time * rotateSpeed) % (2 * Math.PI)) + (index / selectedList.value.length) * 2 * Math.PI
      let scaleFactor = 1.5 - Math.cos(theta)
      let opacity = scaleFactor + 0.3

      // Calculate word position
      let x = centerX - 2.3 * scaleFactor * word.length
      let y = (centerY + wordRingCanvas.height * Math.sin(theta)) / 2.25

      wordRingCtx.font = `${8 * scaleFactor}px Arial`
      wordRingCtx.fillStyle = `rgba(0, 0, 0, ${opacity})`
      wordRingCtx.fillText(word, x, y)

      if (Math.abs(y - wordRingCanvas.height / 2 - 5) < 10 && scaleFactor > 1.5) {
        isAlign = true
      }
    })

    if (isAlign && !rotating.value) {
      return
    }
    requestAnimationFrame(rotateAnimation)
  }
}

function drawArrow(): void {
  // 绘制箭头canvas
  const arrowCanvas = document.getElementById('arrowCanvas') as HTMLCanvasElement
  const arrowCtx = arrowCanvas.getContext('2d')
  arrowCanvas.height = window.innerHeight * 0.5
  // 箭头的位置和尺寸
  let x = 0
  let y = arrowCanvas.height / 2
  let arrowWidth = 15
  let arrowHeight = 10
  if (arrowCtx == null) {
    return
  }
  // 绘制箭头身体
  arrowCtx.beginPath()
  arrowCtx.moveTo(x, y - arrowHeight / 2)
  arrowCtx.lineTo(x + arrowWidth, y - arrowHeight / 2)
  arrowCtx.lineTo(x + arrowWidth, y + arrowHeight / 2)
  arrowCtx.lineTo(x, y + arrowHeight / 2)
  arrowCtx.closePath()
  arrowCtx.fillStyle = '#C0484D' // 设置箭头颜色
  arrowCtx.fill()
  // 绘制箭头头部
  arrowCtx.beginPath()
  arrowCtx.moveTo(x + arrowWidth, y - arrowHeight)
  arrowCtx.lineTo(x + arrowWidth + arrowHeight * 2, y)
  arrowCtx.lineTo(x + arrowWidth, y + arrowHeight)
  arrowCtx.closePath()
  arrowCtx.fillStyle = '#C0484D' // 设置箭头颜色
  arrowCtx.fill()
}

function clickPlayBtn() {
  if (rotating.value) {
    playBtnTxt.value = 'Start'
    rotating.value = false
  } else {
    rotating.value = true
    rotateSpeed = 0.008
    playBtnTxt.value = 'Stop'
    drawWordRing()
  }
}

function createSnackbar() {
  const customSnackbar = Snackbar({
    type: 'success',
    content: "Wheel cleared!"
  })
  selectedList.value = []
}
</script>

<template>
  <var-app-bar
    title="Ballot - 抽签决定吃啥！"
    title-position="center"
    color="linear-gradient(90deg, #80CF7F 0%, #008080 100%)"
  />
  <div class="ringContainer">
    <var-row>
      <var-col :span="3">
        <canvas id="arrowCanvas"></canvas>
      </var-col>
      <var-col :span="21">
        <canvas id="wordRingCanvas"></canvas>
      </var-col>
    </var-row>
  </div>

  <var-row justify="center" style="margin: 2vh">
    <var-col :span="20">
      <var-button
        block
        style="width: 80vw; font-family: 'Lexend', cursive;"
        elevation="5"
        :color="rotating ? '#cf3030' : '#209B87'"
        text-color="#fff"
        @click="clickPlayBtn"
        >{{ playBtnTxt }}</var-button
      >
    </var-col>
  </var-row>
  <var-row justify="center" gutter="5vw">
    <var-col :span="9" justify="center">
      <var-button type="info" style="width: 35vw; font-family: 'Lexend', cursive;" @click="showHowToUse = true">How to use</var-button>
    </var-col>
    <var-col :span="9" justify="center">
      <var-button type="warning" style="width: 35vw; font-family: 'Lexend', cursive;" @click="createSnackbar()">Clear all</var-button>
    </var-col>
  </var-row>


  <var-divider />
  <h2 style="font-size: 20px; font-family: 'Lexend', cursive; margin-bottom: 5px;"> 💖 Choose ur beloved ones here</h2>
  <var-collapse v-model="collapseCtrl" style="margin-bottom: 80px">
    <var-collapse-item title="D6" name="0">
      <var-checkbox-group ref="group" v-model="selectedList">
        <var-checkbox v-for="(item, index) in D6List" :key="index" :checked-value="item">
          {{ item }}</var-checkbox
        >
      </var-checkbox-group>
    </var-collapse-item>
    <var-collapse-item title="LY3" name="1">
      <var-checkbox-group ref="group" v-model="selectedList">
        <var-checkbox v-for="(item, index) in LY3List" :key="index" :checked-value="item">
          {{ item }}</var-checkbox
        >
      </var-checkbox-group>
    </var-collapse-item>
    <var-collapse-item title="B1" name="2">
      <var-checkbox-group ref="group" v-model="selectedList">
        <var-checkbox v-for="(item, index) in B1List" :key="index" :checked-value="item">
          {{ item }}</var-checkbox
        >
      </var-checkbox-group>
    </var-collapse-item>
    <var-collapse-item title="Coffee" name="3">
      <var-checkbox-group ref="group" v-model="selectedList">
        <var-checkbox v-for="(item, index) in CoffeeList" :key="index" :checked-value="item">
          {{ item }}</var-checkbox
        >
      </var-checkbox-group>
    </var-collapse-item>
  </var-collapse>

  <var-popup v-model:show="showHowToUse" :overlay-style="{backgroundColor: 'rgba(0, 60, 80, 0.4)'}">
    <div class="popup">
      <h2>How to use</h2>
      <p class="en">⚙️ First, choose the candidate resturants in the wheel</p>
      <p class="zh">第一步，选择转盘中的候选餐厅</p>
      <p class="en">⚙️ Second, click the button below to start the wheel</p>
      <p class="zh">第二步，点击开始按钮开始旋转</p>
      <p class="en">⚙️ Lastly, click the button below again to stop the wheel</p>
      <p class="zh">最后，再次点击按钮停止旋转，看看抽到了哪家吧！</p>
    </div>
  </var-popup>
</template>

<style scoped>
.popup {
  max-width: 80vw;
  padding: 24px;
}
.en {
  margin-top: 15px;
  margin-bottom: 0px;
  font-family: "Lexend", cursive;
}

.zh {
  margin-top: 5px;
  margin-bottom: 15px;
  font-family: "ZCOOL XiaoWei", sans-serif;
}

.ringContainer {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
canvas {
  display: block;
  background-color: #92bec4;
}
.buttonContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
