<template>
  <div>
    <NavBar />

    <div class="container is-max-desktop px-2 py-4">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
/*
  imports
*/

  import NavBar from '@/components/Layout/NavBar.vue'
  import { useStoreAuth } from '@/stores/storeAuth'
  import { onMounted } from 'vue'

/*
  store
*/

  const storeAuth = useStoreAuth()

/*
  onMouted
*/
  onMounted(() => {
    storeAuth.init()
  })

</script>

<style>
@import 'bulma/css/bulma.min.css';
</style>