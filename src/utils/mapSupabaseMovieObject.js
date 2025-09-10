export default function mapSupabaseMovieObject(record) {
  if (!record || !record.movies) return null

  const {
    imdbid,
    country,
    title,
    year,
    imdbrating,
    rottentomatoesrating,
    metacriticrating,
    plot,
    posterurl,
  } = record.movies

  return {
    personalrating: record.personalrating,
    review: record.review,
    ratingDiff: record.rating_diff,
    imdbid,
    country,
    title,
    year,
    imdbrating,
    rottentomatoesrating,
    metacriticrating,
    plot,
    posterurl,
  }
}
