export default function mapMovieObject(omdbMovie) {
  // Extract ratings from Ratings array
  const imdbRatingObj = omdbMovie.Ratings.find(
    (r) => r.Source === 'Internet Movie Database',
  )
  const rtRatingObj = omdbMovie.Ratings.find(
    (r) => r.Source === 'Rotten Tomatoes',
  )
  const metaRatingObj = omdbMovie.Ratings.find((r) => r.Source === 'Metacritic')

  return {
    imdbid: omdbMovie.imdbID || null,
    country: omdbMovie.Country || null,
    title: omdbMovie.Title || null,
    year: omdbMovie.Year || null,
    imdbrating: imdbRatingObj ? imdbRatingObj.Value : null,
    rottentomatoesrating: rtRatingObj ? rtRatingObj.Value : null,
    metacriticrating: metaRatingObj ? metaRatingObj.Value : null,
    plot: omdbMovie.Plot || null,
    posterurl: omdbMovie.Poster || null,
  }
}
