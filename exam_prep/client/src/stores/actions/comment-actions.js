import { SERVER } from "../../config/global";
import store from "../store";

export const getAllComments = async (userId, projectId, taskId) => {
  const token = store.getState().user.data.token;

  const url = `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${taskId}/comments`;

  return {
    type: "GET_ALL_COMMENTS",
    payload: async () => {
      let response = await fetch(url, {
        headers: {
          authorization: token,
        },
      });

      if (!response.ok) {
        throw response;
      }

      // expected: { data }
      return response.json();
    },
  };
};

export const getOneComment = async (userId, projectId, taskId, commentId) => {
  const token = store.getState().user.data.token;

  const url = `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${taskId}/comments/${commentId}`;

  return {
    type: "GET_ONE_COMMENT",
    payload: async () => {
      const response = await fetch(url, {
        headers: {
          authorization: token,
        },
      });

      if (!response.ok) {
        throw response;
      }

      // expected: single object
      return response.json();
    },
  };
};

export const createComment = async (userId, projectId, taskId, comment) => {
  const token = store.getState().user.data.token;

  const url = `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${taskId}/comments`;

  return {
    type: "CREATE_COMMENT",
    payload: async () => {
      let response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(comment),
      });

      if (!response.ok) {
        throw response;
      }

      // refresh list after create
      const fetchUrl = `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${taskId}/comments`;

      response = await fetch(fetchUrl, {
        headers: {
          authorization: token,
        },
      });

      if (!response.ok) {
        throw response;
      }

      return response.json();
    },
  };
};

export const updateComment = async (
  userId,
  projectId,
  taskId,
  commentId,
  comment,
) => {
  const token = store.getState().user.data.token;
  const url = `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${taskId}/comments/${commentId}`;

  return {
    type: "UPDATE_COMMENT",
    payload: async () => {
      let response = await fetch(url, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(comment),
      });

      if (!response.ok) {
        throw response;
      }

      // refresh list after update
      const fetchUrl = `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${taskId}/comments`;

      response = await fetch(fetchUrl, {
        headers: {
          authorization: token,
        },
      });

      if (!response.ok) {
        throw response;
      }

      return response.json();
    },
  };
};

export const deleteComment = async (userId, projectId, taskId, commentId) => {
  const token = store.getState().user.data.token;

  const url = `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${taskId}/comments/${commentId}`;

  return {
    type: "DELETE_COMMENT",
    payload: async () => {
      let response = await fetch(url, {
        method: "delete",
        headers: {
          authorization: token,
        },
      });

      if (!response.ok) {
        throw response;
      }

      // refresh list after delete
      const fetchUrl = `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${taskId}/comments`;

      response = await fetch(fetchUrl, {
        headers: {
          authorization: token,
        },
      });

      if (!response.ok) {
        throw response;
      }

      return response.json();
    },
  };
};
