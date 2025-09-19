import mapMovieObject from '../utils/mapMovieObject'

export const API_KEY = import.meta.env.VITE_OMDB_API_KEY

async function omdbFetchMoviesByName(query, controller) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
    { signal: controller.signal },
  )
  if (!res.ok) {
    throw new Error('something went wrong while fetching the data')
  }
  const data = await res.json()
  if (data.Response === 'False') throw new Error("couldn't find any results")
  return data.Search
}

async function omdbFetchMovieById(imdbId) {
  const res = await fetch(
    `https://www.omdbapi.com/?i=${imdbId}&apikey=${API_KEY}`,
  )
  const omdbData = await res.json()

  if (!omdbData || omdbData.Response === 'False') {
    throw new Error('Movie not found in OMDB')
  }
  return mapMovieObject(omdbData)
}
export { omdbFetchMoviesByName, omdbFetchMovieById }
