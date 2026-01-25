const initialState = {
  data: [],
  count: 0,
  selectedTask: null,
  loading: false,
  error: null
}

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    // any request that hits the server
    case `GET_ALL_TASKS_PENDING`:
    case `GET_ONE_TASK_PENDING`:
    case `CREATE_TASK_PENDING`:
    case `UPDATE_TASK_PENDING`:
    case `DELETE_TASK_PENDING`:
    case `ASSIGN_TASK_PENDING`:
    case `UPDATE_TASK_STATUS_PENDING`:
      return {
        ...state,
        loading: true,
        error: null
      }

    // list-returning successes: payload = { data, count }
    case `GET_ALL_TASKS_FULFILLED`:
    case `CREATE_TASK_FULFILLED`:
    case `UPDATE_TASK_FULFILLED`:
    case `DELETE_TASK_FULFILLED`:
    case `ASSIGN_TASK_FULFILLED`:
    case `UPDATE_TASK_STATUS_FULFILLED`:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.data,
        count: action.payload.count
      }

    // single-task success: payload = task object
    case `GET_ONE_TASK_FULFILLED`:
      return {
        ...state,
        loading: false,
        error: null,
        selectedTask: action.payload
      }

    // any error
    case `GET_ALL_TASKS_REJECTED`:
    case `GET_ONE_TASK_REJECTED`:
    case `CREATE_TASK_REJECTED`:
    case `UPDATE_TASK_REJECTED`:
    case `DELETE_TASK_REJECTED`:
    case `ASSIGN_TASK_REJECTED`:
    case `UPDATE_TASK_STATUS_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload || action.error || 'Task error'
      }

    default:
      return state
  }
}
