const initialState = {
  data: [],
  count: 0,
  loading: false,
  error: null
}

export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    // any request
    case `GET_ALL_PROJECTS_PENDING`:
    case `CREATE_PROJECT_PENDING`:
    case `UPDATE_PROJECT_PENDING`:
    case `DELETE_PROJECT_PENDING`:
      return {
        ...state,
        loading: true,
        error: null
      }

    // any success – payload is always { data, count } because we re-fetch the list
    case `GET_ALL_PROJECTS_FULFILLED`:
    case `CREATE_PROJECT_FULFILLED`:
    case `UPDATE_PROJECT_FULFILLED`:
    case `DELETE_PROJECT_FULFILLED`:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.data,
        count: action.payload.count
      }

    // any error
    case `GET_ALL_PROJECTS_REJECTED`:
    case `CREATE_PROJECT_REJECTED`:
    case `UPDATE_PROJECT_REJECTED`:
    case `DELETE_PROJECT_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload || action.error || 'Project error'
      }

    default:
      return state
  }
}
