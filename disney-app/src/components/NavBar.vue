<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">
        <i class="fa-solid fa-star"></i>
        <span>Disney Explorer</span>
      </router-link>

      <button class="hamburger" @click="menuOpen = !menuOpen" :class="{ open: menuOpen }">
        <span></span><span></span><span></span>
      </button>

      <ul class="nav-links" :class="{ open: menuOpen }">
        <li><router-link to="/" @click="menuOpen = false"><i class="fa-solid fa-house"></i> Inicio</router-link></li>
        <li><router-link to="/characters" @click="menuOpen = false"><i class="fa-solid fa-masks-theater"></i> Personajes</router-link></li>
        <li>
          <router-link to="/favorites" @click="menuOpen = false" class="fav-link">
            <i class="fa-solid fa-heart"></i> Favoritos
            <span v-if="favCount > 0" class="fav-badge">{{ favCount }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      menuOpen: false,
      isScrolled: false
    }
  },
  computed: {
    favCount() {
      const favs = localStorage.getItem('disney-favorites')
      return favs ? JSON.parse(favs).length : 0
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      this.isScrolled = window.scrollY > 40
    }
  }
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 14, 42, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(245, 200, 66, 0.15);
  transition: all 0.3s ease;
}
.navbar.scrolled {
  background: rgba(10, 14, 42, 0.97);
  box-shadow: 0 4px 24px rgba(0,0,0,0.4);
}
.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-logo {
  font-family: 'Cinzel', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--gold);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: 1px;
}
.nav-logo i { font-size: 1.1rem; }

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
}
.nav-links a {
  color: var(--white);
  text-decoration: none;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  position: relative;
}
.nav-links a:hover, .nav-links a.router-link-active {
  color: var(--gold);
}
.fav-link { position: relative; }
.fav-badge {
  background: var(--accent);
  color: white;
  font-size: 0.65rem;
  padding: 1px 5px;
  border-radius: 10px;
  font-weight: 700;
  position: absolute;
  top: -8px;
  right: -12px;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--gold);
  transition: all 0.3s;
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (max-width: 768px) {
  .hamburger { display: flex; }
  .nav-links {
    display: none;
    position: absolute;
    top: 64px;
    left: 0; right: 0;
    background: var(--navy-mid);
    flex-direction: column;
    padding: 1rem 1.5rem;
    gap: 1rem;
    border-bottom: 1px solid rgba(245,200,66,0.2);
  }
  .nav-links.open { display: flex; }
}
</style>
