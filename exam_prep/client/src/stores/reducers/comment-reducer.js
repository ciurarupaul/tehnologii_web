const initialState = {
  data: [],
  selectedComment: null,
  loading: false,
  error: null,
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    // ANY REQUEST HITS THE SERVER
    case `GET_ALL_COMMENTS_PENDING`:
    case `GET_ONE_COMMENT_PENDING`:
    case `CREATE_COMMENT_PENDING`:
    case `UPDATE_COMMENT_PENDING`:
    case `DELETE_COMMENT_PENDING`:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // list-returning successes: payload = { data }
    case `GET_ALL_COMMENTS_FULFILLED`:
    case `CREATE_COMMENT_FULFILLED`:
    case `UPDATE_COMMENT_FULFILLED`:
    case `DELETE_COMMENT_FULFILLED`:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.data,
      };

    // single-task success: payload = task object
    case `GET_ONE_COMMENT_FULFILLED`:
      return {
        ...state,
        loading: false,
        error: null,
        selectedComment: action.payload,
      };

    // any error
    case `GET_ALL_COMMENTS_REJECTED`:
    case `GET_ONE_COMMENT_REJECTED`:
    case `CREATE_COMMENT_REJECTED`:
    case `UPDATE_COMMENT_REJECTED`:
    case `DELETE_COMMENT_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload || action.error || "Comment error",
      };

    default:
      return state;
  }
}
