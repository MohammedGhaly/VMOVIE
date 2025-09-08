import mapMovieObject from '../utils/mapMovieObject'
import { omdbFetchMovieById } from './omdbAPI'
import { supabase } from './supabase'

const SITE_URL = import.meta.env.VITE_SITE_URL

export async function searchMoviesByTitle(searchText, controller) {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .ilike('title', `%${searchText}%`) // case-insensitive search
    .limit(20)
    .abortSignal(controller.signal)

  if (error) {
    throw new Error('Error searching movies: ' + error.message)
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

export async function getUserMovies(
  userId,
  order = 'watched_at',
  asc = true,
  limit = 10,
) {
  const { data, error } = await supabase
    .from('user_movies')
    .select(
      `
    id,
    personalrating,
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
      posterurl
    )
  `,
    )
    .eq('user_id', userId)
    .order(order, { ascending: asc })
    .limit(limit)

  if (error) {
    throw new Error('Error fetching movie: ' + error.message)
  }
  return data
}

export async function getUserOverratedMovies(userId, limit) {
  const { data, error } = await supabase.rpc('get_user_movies_diff_asc', {
    p_user_id: userId,
    p_limit: limit,
  })

  if (error) {
    throw new Error('Error getting user underrated movies ' + error.message)
  }
  console.log(data)
  return data
}
export async function getUserUnderratedMovies(userId, limit) {
  const { data, error } = await supabase.rpc('get_user_movies_diff_desc', {
    p_user_id: userId,
    p_limit: limit,
  })

  if (error) {
    throw new Error('Error getting user underrated movies ' + error.message)
  }
  console.log(data)
  return data
}

export async function findOrCreateMovie(imdbId) {
  // 1. Look in Supabase
  let { data: movies } = await supabase
    .from('movies')
    .select('*')
    .eq('imdbid', imdbId)

  // .single()

  if (movies.length) {
    return movies[0]
  }

  const omdbData = await omdbFetchMovieById(imdbId)
  console.log(omdbData)
  if (!omdbData || omdbData.Response === 'False')
    throw new Error('Movie not found in OMDB')
  // 3. Insert into Supabase
  const { data: newMovie, error: insertError } = await supabase
    .from('movies')
    .insert(mapMovieObject(omdbData))
    .select()
    .single()

  if (insertError) {
    throw insertError
  }

  return newMovie
}

export async function reviewMovie(userId, movieId, personalrating, review) {
  const { data, error } = await supabase
    .from('user_movies')
    .upsert(
      {
        user_id: userId,
        movie_id: movieId,
        personalrating,
        review,
      },
      { onConflict: 'user_id,movie_id' },
    )
    .select()

  if (error) {
    throw new Error('Error reviewing movie: ' + error.message)
  }
  return data
}

export async function fetchAndReviewMovie(imdbId, userId, rating) {
  const newMovie = await findOrCreateMovie(imdbId)
  await reviewMovie(userId, newMovie.id, rating, '')
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

export async function searchProfile(username, controller) {
  if (!username || username.trim().length <= 2) return

  const cleanedUsername = username.trim()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .ilike('username', `%${cleanedUsername}%`) // case-insensitive search
    .limit(20)
    .abortSignal(controller.signal)

  if (error) {
    throw new Error('Error searching for this profile: ' + error.message)
  }
  return data
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select(
      'id, username, avatar_url, bio, full_name, followersCount, followingCount, moviesCount',
    )
    .eq('id', userId)
    .single()

  if (error) {
    throw new Error('Error fetching profile: ' + error.message)
  }
  return data
}

// follow & unfollow//
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

export async function isFollowing(userId, targetUserId) {
  const { data, error } = await supabase
    .from('follows')
    .select('id')
    .eq('follower_id', userId)
    .eq('following_id', targetUserId)
    .maybeSingle() // returns null instead of throwing if no row found

  if (error) {
    throw new Error('Error checking follow status: ' + error.message)
  }

  return !!data // true if row exists, false otherwise
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

// auth //
export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
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
    options: {
      redirectTo: SITE_URL,
    },
  })
  if (error) throw error
  return data
}
