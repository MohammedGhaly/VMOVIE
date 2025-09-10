export function mapFeedReviewObject(data) {
  return data.map((item) => ({
    id: item.id,
    user_id: item.user_id,
    personalrating: item.personalrating,
    review: item.review,
    watched_at: item.watched_at,
    movieid: item.movies.id,
    imdbid: item.movies.imdbid,
    title: item.movies.title,
    year: item.movies.year,
    imdbrating: item.movies.imdbrating,
    rottentomatoesrating: item.movies.rottentomatoesrating,
    metacriticrating: item.movies.metacriticrating,
    plot: item.movies.plot,
    posterurl: item.movies.posterurl,
    username: item.profiles.username,
    avatar_url: item.profiles.avatar_url,
  }))
}
