import { supabase } from './supabase'

export async function searchMoviesByTitle(searchText) {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .ilike('title', `%${searchText}%`) // case-insensitive search
    .limit(20)

  if (error) {
    throw new Error('Error searching movies: ' + error.message)
  }
  return data
}

export async function getUserMovies(userId) {
  const { data, error } = await supabase
    .from('user_movies')
    .select(
      `
    id,
    rating,
    review,
    watched_at,
    movies (
      id,
      imdbid,
      title,
      year,
      imdbrating,
      rottentomatoesrating,
      country,
      metacriticrating,
      plot,
      posterurl,
    )
  `,
    )
    .eq('user_id', userId)
    .order('watched_at', { ascending: false })

  if (error) {
    throw new Error('Error fetching movie: ' + error.message)
  }
  return data
}

export async function reviewMovie(userId, movieId, rating, review) {
  const { data, error } = await supabase
    .from('user_movies')
    .insert([
      {
        user_id: userId,
        movie_id: movieId, // from findOrCreateMovie()
        rating,
        review,
      },
    ])
    .select()

  if (error) {
    throw new Error('Error reviewing movie: ' + error.message)
  }
  return data
}

export async function updateReview(userId, movieId, rating, review) {
  const { data, error } = await supabase
    .from('user_movies')
    .update({ rating, review })
    .eq('user_id', userId)
    .eq('movie_id', movieId)
    .select()

  if (error) {
    throw new Error('Error updating review: ' + error.message)
  }
  return data
}

export async function getFollowers(userId) {
  const { data, error } = await supabase
    .from('follows')
    .select(
      `
    follower:profiles (
      id,
      username,
      avatar_url
    )
  `,
    )
    .eq('following_id', userId)
  if (error) {
    throw new Error('Error fetching followers: ' + error.message)
  }
  return data
}
export async function getFollowing(userId) {
  const { data, error } = await supabase
    .from('follows')
    .select(
      `
    following:profiles (
      id,
      username,
      avatar_url
    )
  `,
    )
    .eq('follower_id', userId)

  if (error) {
    throw new Error('Error fetching following: ' + error.message)
  }
  return data
}

export async function followUser(userId, targetUserId) {
  const { data, error } = await supabase
    .from('follows')
    .insert([{ follower_id: userId, following_id: targetUserId }])
    .select()

  if (error) {
    throw new Error('Error following user: ' + error.message)
  }
  return data
}

export async function unfollowUser(userId, targetUserId) {
  const { data, error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', userId)
    .eq('following_id', targetUserId)

  if (error) {
    throw new Error('Error unfollowing user: ' + error.message)
  }
  return data
}

export async function getFeed(userId) {
  const { data, error } = await supabase
    .from('user_movies')
    .select(
      `
    id,
    rating,
    review,
    watched_at,
    movies (
      id,
      title,
      poster_url
    ),
    profiles (
      id,
      username,
      avatar_url
    )
  `,
    )
    .in(
      'user_id',
      (
        await supabase
          .from('follows')
          .select('following_id')
          .eq('follower_id', userId)
      ).data.map((f) => f.following_id),
    )
    .order('watched_at', { ascending: false })

  if (error) {
    throw new Error('Error loading feed: ' + error.message)
  }
  return data
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, avatar_url, bio')
    .eq('id', userId)
    .single()

  if (error) {
    throw new Error('Error fetching profile: ' + error.message)
  }
  return data
}

export async function signUp(email, password, username) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }, // this goes into user metadata
    },
  })
  if (error) throw error
  return data
}

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })
  if (error) throw error
  return data
}
