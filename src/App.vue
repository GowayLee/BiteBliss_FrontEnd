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
      router.push('/coming-soon')
      break
  }
}
</script>

<template>
  <RouterView />
  <var-bottom-navigation v-model:active="active" @change="handleChange(active)" active-color="#2C7CB2" :fixed=true :border=true style="height: 7vh">
    <var-bottom-navigation-item label="Home" icon="home" />
    <var-bottom-navigation-item label="Ballot-抽签" icon="thumb-down" />
    <var-bottom-navigation-item label="Come Soon" icon="plus" />
  </var-bottom-navigation>
</template>

<style scoped>

</style>
