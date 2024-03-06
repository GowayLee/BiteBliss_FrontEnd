<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

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
  'Uni Hotpot 有你香锅',
  'Xiao Jiu Zhou 小九州',
  "Let's Kopitiam 南洋风味",
  'Under Tree 大树下',
  'Takwa Mee Tarik 兰州拉面'
])

const collapseCtrl = ref([])
const playBtnTxt = ref('Start')
const rotating = ref(false)

onMounted(() => {
  drawWordRing()
  drawArrow()
})

function drawWordRing(): void {
  const wordRingCanvas = document.getElementById('wordRingCanvas') as HTMLCanvasElement
  const wordRingCtx = wordRingCanvas.getContext('2d')
  wordRingCanvas.width = window.innerWidth
  wordRingCanvas.height = window.innerHeight * 0.5
  // 滚轮动画
  requestAnimationFrame(rotateAnimation)

  function rotateAnimation(): void {
    // 可优化
    if (wordRingCtx == null || !rotating.value) {
      return
    }

    wordRingCtx.clearRect(0, 0, wordRingCanvas.width, wordRingCanvas.height)
    let centerX = wordRingCanvas.width / 2 - 40
    let centerY = wordRingCanvas.height * 1.15

    const time = Date.now()

    selectedList.value.forEach((word: string, index) => {
      let scaleFactor =
        1.5 -
        Math.sin(
          ((time * 0.006) % (2 * Math.PI)) +
            Math.PI / 2 +
            (index / selectedList.value.length) * 2 * Math.PI
        )
      // Calculate word position
      let x = centerX - (8 * scaleFactor * word.length) / 3.5
      let y =
        centerY +
        wordRingCanvas.height *
          Math.sin(
            ((time * 0.006) % (2 * Math.PI)) + (index / selectedList.value.length) * 2 * Math.PI
          )
      // Calculate opacity based on vertical position
      let opacity = scaleFactor + 0.3
      wordRingCtx.font = `${8 * scaleFactor}px Arial`

      wordRingCtx.fillStyle = `rgba(0, 0, 0, ${opacity})`
      wordRingCtx.fillText(word, x, y * 0.45)
    })
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
    playBtnTxt.value = 'Stop'
    drawWordRing()
  }
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
  <div class="buttonContainer">
    <var-button
      block
      style="margin-top: 10px; margin-bottom: 10px; width: 80vw; justify-self: center"
      elevation="5"
      :color="rotating ? '#cf3030' : '#209B87'"
      text-color="#fff"
      @click="clickPlayBtn"
      >{{ playBtnTxt }}</var-button
    >
  </div>
  <var-divider />
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
</template>

<style scoped>
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
