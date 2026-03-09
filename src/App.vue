<template>
  <div id="main-app">
    <NavBar />
    <main class="page-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <FooterBar />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'

export default {
  name: 'App',
  components: { NavBar, FooterBar }
}
</script>

<style>
:root {
  --gold: #f5c842;
  --gold-dark: #c9a227;
  --navy: #0a0e2a;
  --navy-mid: #12183d;
  --navy-light: #1e2754;
  --white: #f0eee8;
  --accent: #e63e6d;
  --text-muted: #8890c0;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--navy);
  color: var(--white);
  font-family: 'Lato', sans-serif;
  min-height: 100vh;
}

#main-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.page-content {
  flex: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--navy); }
::-webkit-scrollbar-thumb { background: var(--gold-dark); border-radius: 3px; }
</style>
