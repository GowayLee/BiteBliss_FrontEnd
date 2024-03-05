<script setup lang="ts">
import { onMounted } from 'vue'
const B1List = [
    'Sapid',
    'Regiustea 皇茶',
    'Poke Bowl Rice',
    'Zone U Bakery',
    'Cita Asasi Minimart 超市',
  ];
const D6List = [
  'Let\'s Kopitiam',
  'Under Tree 大树下',
  'Lao Di Fang 老地方',
  'Express Delight House 夏一城',
  'My Little Herbal Tea 华联好凉茶',
  'Da Cheng Xiao Shi 大城小食',
  'Shu Zhi Wei 蜀之味',
  'BC 7 大家旺',
  'Takwa Mee Tarik 兰州拉面',
  ' Restaurant Kabaabish',
  'Little Taiwan 小台枫',
  'U&I 美式早餐',
  'Big Bowl Noodles 大碗面',
  'Meow Health Food 喵喵轻食',
  'Thumbs Up 大拇指',
  'Little Cloud HK Café 小云冰室',
  'Mynews.com'
];
const LY3List = [
  'Uni Hotpot 有你香锅',
  'Little Bowl 小碗菜',
  'Kami Cemerlang 佳味食轩',
  'Penang Flavour 槟城风味',
  'Castle in the Sky 膳一城',
  'Xiao Jiu Zhou 小九州',
  'Mad Plate Express 日式铁板烧饭',
  'Bean\'s Express',
  'Zhong Min Kitchen 中闽美食',
  'Lake Front Café',
  'Zus Coffee',
  'Octobox'
];

onMounted(() => {
  // Canvas setup
  const canvas = document.getElementById('wordRingCanvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d')

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight * 0.8

  rotateAnimation(D6List)


  function rotateAnimation(nameList: string[]) {
    if (ctx == null) {
      return
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const centerX = canvas.width / 2
    const centerY = canvas.height
    const time = Date.now()

    nameList.forEach((word, index) => {
      const scaleFactor =
        1.5 -
        Math.sin(
          ((time * 0.0025) % (2 * Math.PI)) + Math.PI / 2 + (index / nameList.length) * 2 * Math.PI
        )
      // Calculate word position
      const x = centerX - (10 * scaleFactor * word.length) / 3.5
      const y =
        centerY +
        canvas.height *
          Math.sin(((time * 0.0025) % (2 * Math.PI)) + (index / nameList.length) * 2 * Math.PI)
      // Calculate opacity based on vertical position
      const opacity =
        1.7 -
        Math.sin(
          ((time * 0.0025) % (2 * Math.PI)) + Math.PI / 2 + (index / nameList.length) * 2 * Math.PI
        )
      ctx.font = `${10 * scaleFactor}px Arial`

      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.fillText(word, x, y * 0.5)
    })
    requestAnimationFrame(() => rotateAnimation(nameList))
  }
})
</script>

<template>
  <div class="container">
    <canvas id="wordRingCanvas"></canvas>
  </div>
</template>

<style scoped>
.container {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
canvas {
  display: block;
  background-color: #414141;
}
</style>
