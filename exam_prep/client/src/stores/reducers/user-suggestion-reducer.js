const initialState = {
  data: [],
  loading: false,
  error: null
}

export default function userSuggestionReducer(state = initialState, action) {
  switch (action.type) {
    case `GET_ALL_USER_SUGGESTIONS_PENDING`:
      return {
        ...state,
        loading: true,
        error: null
      }

    case `GET_ALL_USER_SUGGESTIONS_FULFILLED`:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload
      }

    case `GET_ALL_USER_SUGGESTIONS_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload || action.error || 'User suggestion error'
      }

    default:
      return state
  }
}
