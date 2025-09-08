import { reactive, ref } from 'vue'

export const createSearchStore = () => {
  const state = reactive({
    isSearching: false,
    searchMode: 'movies',
    searchText: ref(''),
    profilesSearch: [],
  })

  const setProfiles = (value) => {
    state.profilesSearch = value || []
  }
  const setIsSearching = (value) => {
    state.isSearching = value
  }
  const setSearchMode = (value) => {
    state.searchMode = value
  }

  return { state, setProfiles, setIsSearching, setSearchMode }
}
