import store from '../store'
import { SERVER } from '../../config/global'

export const getAllUserSuggestions = async partialMatch => {
  const token = store.getState().user.data.token

  return {
    type: 'GET_ALL_USER_SUGGESTIONS',
    payload: async () => {
      const response = await fetch(
        `${SERVER}/api/users/suggestions?partial=${partialMatch}`,
        {
          headers: {
            authorization: token
          }
        }
      )

      if (!response.ok) {
        throw response
      }

      // original store: this.data = await response.json()
      // here payload is the array of suggestions
      return response.json()
    }
  }
}
