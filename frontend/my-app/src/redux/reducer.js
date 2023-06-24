import {
  POST_MOVIES,
  GET_MOVIES,
  DELETE_MOVIES,
  UPDATE_MOVIES,
} from "./actionType";

const initalState = {
  isLoading: false,
  movies: [],
  movie: {},
  isError: false,
};

export const reducer = (state = initalState, { type, payload }) => {
  // console.log(state)
  switch (type) {
    case POST_MOVIES:
      return { ...state, isLoading: true };

    case GET_MOVIES:
      return { ...state, isLoading: true, movies: payload };

    case DELETE_MOVIES:
      return { ...state, isLoading: true };

    case UPDATE_MOVIES:
      return { ...state, isLoading: true  };

    default:
      return state;
  }
};
