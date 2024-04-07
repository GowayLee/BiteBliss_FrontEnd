<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const active = ref(0)

function handleChange(active: number) {
  switch (active) {
    case 0:
      router.push('/')
      break
    case 1:
      router.push('/ballot')
      break
    case 2:
      router.push('/shops')
      break
  }
}
</script>

<template>
  <RouterView />
  <div style="height: 6vh; margin: 0px;"></div>
  <var-bottom-navigation v-model:active="active" @change="handleChange(active)" active-color="#2C7CB2" :fixed=true :border=true style="height: 6vh;">
    <var-bottom-navigation-item label="Home" icon="home" />
    <var-bottom-navigation-item label="Ballot-抽签" icon="thumb-down" />
    <var-bottom-navigation-item label="Come Soon" icon="plus" />
  </var-bottom-navigation>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway:900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=ZCOOL+XiaoWei&display=swap');
</style>
