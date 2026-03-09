<template>
  <div class="detail-page">
    <LoadingSpinner v-if="loading" message="Cargando personaje..." />

    <div v-else-if="character" class="detail-content">
      <button class="back-btn" @click="$router.back()">
        <i class="fa-solid fa-arrow-left"></i> Volver
      </button>

      <div class="detail-card">
        <div class="detail-image">
          <img :src="character.imageUrl || fallback" :alt="character.name" @error="onImgError" />
          <button class="fav-btn-large" @click="toggleFav" :class="{ active: isFav }">
            <i :class="isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i>
            {{ isFav ? 'Guardado' : 'Guardar' }}
          </button>
        </div>

        <div class="detail-info">
          <h1>{{ character.name }}</h1>
          <a :href="character.sourceUrl" target="_blank" class="wiki-link" v-if="character.sourceUrl">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Ver en Disney Wiki
          </a>

          <div class="info-section" v-if="character.films && character.films.length">
            <h3><i class="fa-solid fa-film"></i> Películas</h3>
            <div class="tags">
              <span class="tag" v-for="film in character.films" :key="film">{{ film }}</span>
            </div>
          </div>

          <div class="info-section" v-if="character.tvShows && character.tvShows.length">
            <h3><i class="fa-solid fa-tv"></i> Series de TV</h3>
            <div class="tags">
              <span class="tag tag-tv" v-for="show in character.tvShows" :key="show">{{ show }}</span>
            </div>
          </div>

          <div class="info-section" v-if="character.videoGames && character.videoGames.length">
            <h3><i class="fa-solid fa-gamepad"></i> Videojuegos</h3>
            <div class="tags">
              <span class="tag tag-game" v-for="game in character.videoGames" :key="game">{{ game }}</span>
            </div>
          </div>

          <div class="info-section" v-if="character.shortFilms && character.shortFilms.length">
            <h3><i class="fa-solid fa-clapperboard"></i> Cortometrajes</h3>
            <div class="tags">
              <span class="tag tag-short" v-for="sf in character.shortFilms" :key="sf">{{ sf }}</span>
            </div>
          </div>

          <div class="info-section" v-if="character.allies && character.allies.length">
            <h3><i class="fa-solid fa-handshake"></i> Aliados</h3>
            <div class="tags">
              <span class="tag tag-ally" v-for="ally in character.allies" :key="ally">{{ ally }}</span>
            </div>
          </div>

          <div class="info-section" v-if="character.enemies && character.enemies.length">
            <h3><i class="fa-solid fa-skull"></i> Enemigos</h3>
            <div class="tags">
              <span class="tag tag-enemy" v-for="enemy in character.enemies" :key="enemy">{{ enemy }}</span>
            </div>
          </div>

          <div class="no-info" v-if="noExtraInfo">
            <i class="fa-solid fa-wand-magic-sparkles"></i>
            <p>Este personaje forma parte del universo Disney, pero no hay información adicional disponible.</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="error">
      <i class="fa-solid fa-circle-exclamation"></i>
      <p>No se pudo cargar el personaje.</p>
      <button @click="$router.back()" class="btn-back">Volver</button>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '../components/LoadingSpinner.vue'
import axios from 'axios'

export default {
  name: 'CharacterDetail',
  components: { LoadingSpinner },
  data() {
    return {
      character: null,
      loading: true,
      fallback: 'https://static.wikia.nocookie.net/disney/images/7/7e/Disneychannel.png'
    }
  },
  computed: {
    isFav() {
      const favs = JSON.parse(localStorage.getItem('disney-favorites') || '[]')
      return favs.some(f => f._id === this.character?._id)
    },
    noExtraInfo() {
      const c = this.character
      return !c.films?.length && !c.tvShows?.length && !c.videoGames?.length && !c.shortFilms?.length && !c.allies?.length && !c.enemies?.length
    }
  },
  async mounted() {
    try {
      const id = this.$route.params.id
      const res = await axios.get(`https://api.disneyapi.dev/character/${id}`)
      this.character = res.data.data
    } catch (e) {
      console.error(e)
    } finally {
      this.loading = false
    }
  },
  methods: {
    onImgError(e) { e.target.src = this.fallback },
    toggleFav() {
      let favs = JSON.parse(localStorage.getItem('disney-favorites') || '[]')
      const idx = favs.findIndex(f => f._id === this.character._id)
      if (idx === -1) { favs.push(this.character) }
      else { favs.splice(idx, 1) }
      localStorage.setItem('disney-favorites', JSON.stringify(favs))
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>
.detail-page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}
.back-btn {
  background: none;
  border: 1px solid rgba(255,255,255,0.15);
  color: var(--white);
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.85rem;
  display: inline-flex; align-items: center; gap: 0.5rem;
  margin-bottom: 2rem;
  transition: all 0.2s;
}
.back-btn:hover { border-color: var(--gold); color: var(--gold); }

.detail-card {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 3rem;
  background: var(--navy-light);
  border-radius: 24px;
  padding: 2.5rem;
  border: 1px solid rgba(245,200,66,0.1);
}
.detail-image img {
  width: 100%;
  border-radius: 16px;
  aspect-ratio: 3/4;
  object-fit: cover;
}
.fav-btn-large {
  width: 100%;
  margin-top: 1rem;
  background: var(--navy-mid);
  border: 1px solid rgba(245,200,66,0.2);
  color: var(--white);
  padding: 0.75rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  transition: all 0.2s;
}
.fav-btn-large:hover { border-color: var(--accent); color: var(--accent); }
.fav-btn-large.active { background: rgba(230,62,109,0.15); color: var(--accent); border-color: var(--accent); }

.detail-info h1 {
  font-family: 'Cinzel', serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  background: linear-gradient(135deg, var(--gold), #fff8dc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.8rem;
}
.wiki-link {
  color: var(--text-muted);
  font-size: 0.85rem;
  text-decoration: none;
  display: inline-flex; align-items: center; gap: 0.4rem;
  margin-bottom: 2rem;
  transition: color 0.2s;
}
.wiki-link:hover { color: var(--gold); }

.info-section {
  margin-bottom: 1.5rem;
}
.info-section h3 {
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 0.7rem;
  display: flex; align-items: center; gap: 0.5rem;
}
.info-section h3 i { color: var(--gold); }

.tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.tag {
  background: rgba(245,200,66,0.1);
  color: var(--gold);
  border: 1px solid rgba(245,200,66,0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.78rem;
}
.tag-tv { background: rgba(99,179,237,0.1); color: #63b3ed; border-color: rgba(99,179,237,0.2); }
.tag-game { background: rgba(154,230,180,0.1); color: #9ae6b4; border-color: rgba(154,230,180,0.2); }
.tag-short { background: rgba(251,211,141,0.1); color: #fbd38d; border-color: rgba(251,211,141,0.2); }
.tag-ally { background: rgba(198,246,213,0.1); color: #c6f6d5; border-color: rgba(198,246,213,0.2); }
.tag-enemy { background: rgba(254,178,178,0.1); color: var(--accent); border-color: rgba(230,62,109,0.2); }

.no-info {
  text-align: center;
  padding: 2rem;
  color: var(--text-muted);
}
.no-info i { font-size: 2rem; color: var(--gold); display: block; margin-bottom: 0.8rem; }

.error {
  text-align: center;
  padding: 5rem 2rem;
  color: var(--text-muted);
}
.error i { font-size: 3rem; color: var(--accent); display: block; margin-bottom: 1rem; }

@media (max-width: 768px) {
  .detail-card {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }
  .detail-image img { max-height: 350px; aspect-ratio: auto; }
}
</style>
