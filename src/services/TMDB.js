import { omdbFetchMovieById } from './omdbAPI'

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY

export async function getNewReleasesFromTOMDB() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_KEY}&language=en-US&page=1`,
    )
    const data = await res.json()
    const ids = data.results.map((item) => item.id)

    const newReleases = await Promise.all(
      ids.map(async (id) => {
        const idsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${TMDB_KEY}`,
        )
        const idsData = await idsRes.json()
        const omdbMovie = await omdbFetchMovieById(idsData.imdb_id)
        return omdbMovie
      }),
    )

    return newReleases
  } catch (error) {
    console.error('Error fetching new releases:', error)
    throw error
  }
}
