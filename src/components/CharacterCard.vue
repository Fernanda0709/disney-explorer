<template>
  <div class="card" @click="$router.push('/character/' + character._id)">
    <div class="card-image">
      <img
        :src="character.imageUrl || fallback"
        :alt="character.name"
        @error="onImgError"
        loading="lazy"
      />
      <div class="card-overlay">
        <span class="view-btn"><i class="fa-solid fa-eye"></i> Ver más</span>
      </div>
      <button class="fav-btn" @click.stop="toggleFav" :class="{ active: isFav }">
        <i :class="isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
      </button>
    </div>
    <div class="card-body">
      <h3 class="card-name">{{ character.name }}</h3>
      <p class="card-films" v-if="character.films && character.films.length">
        <i class="fa-solid fa-film"></i>
        {{ character.films.slice(0, 2).join(', ') }}
        <span v-if="character.films.length > 2"> +{{ character.films.length - 2 }}</span>
      </p>
      <p class="card-films no-films" v-else>
        <i class="fa-solid fa-star"></i> Personaje Disney
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterCard',
  props: {
    character: { type: Object, required: true }
  },
  data() {
    return {
      fallback: 'https://static.wikia.nocookie.net/disney/images/7/7e/Disneychannel.png'
    }
  },
  computed: {
    isFav() {
      const favs = JSON.parse(localStorage.getItem('disney-favorites') || '[]')
      return favs.some(f => f._id === this.character._id)
    }
  },
  methods: {
    onImgError(e) {
      e.target.src = this.fallback
    },
    toggleFav() {
      let favs = JSON.parse(localStorage.getItem('disney-favorites') || '[]')
      const idx = favs.findIndex(f => f._id === this.character._id)
      if (idx === -1) {
        favs.push(this.character)
      } else {
        favs.splice(idx, 1)
      }
      localStorage.setItem('disney-favorites', JSON.stringify(favs))
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
.card {
  background: var(--navy-light);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(245,200,66,0.1);
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,200,66,0.3);
}
.card-image {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: var(--navy-mid);
}
.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.card:hover .card-image img {
  transform: scale(1.08);
}
.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10,14,42,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}
.card:hover .card-overlay { opacity: 1; }
.view-btn {
  background: var(--gold);
  color: var(--navy);
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.fav-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(10,14,42,0.7);
  border: none;
  color: var(--white);
  width: 34px; height: 34px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.fav-btn:hover, .fav-btn.active { color: var(--accent); background: rgba(10,14,42,0.9); }
.card-body {
  padding: 0.9rem 1rem;
}
.card-name {
  font-family: 'Cinzel', serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 0.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-films {
  font-size: 0.78rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-films i { color: var(--gold); flex-shrink: 0; }
.no-films { color: var(--gold-dark); }
</style>
