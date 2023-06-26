import axios from "axios";

import { POST_MOVIES, GET_MOVIES ,DELETE_MOVIES ,UPDATE_MOVIES} from "./actionType";

// ------------------------------ post -------------------------------------------

export const PostMovieAction = () => {
  return { type: POST_MOVIES};
};

export const postMovies = (addMovie) => {
  return function (dispatch) {
    axios
      .post("https://weak-blue-capybara-tie.cyclic.app/addbook", addMovie)
      .then((res) => {
        dispatch(PostMovieAction());
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// ------------------------------ get -------------------------------------------

export const GetMovieAction = (payload) => {
  return { type: GET_MOVIES , payload};
};

// export const getMovies = (category) =>(dispatch) =>  {
  
//   axios
//     .get(`https://weak-blue-capybara-tie.cyclic.app/get?genre=${category}`)
//     .then((res) => {
//       dispatch(GetMovieAction(res.data));
//        console.log(res.data);
//     })
//     .catch((err) => {
//        console.log(err);
//     });
// };


export const getMovies = (query,limit,sort,category) =>(dispatch) =>  {
  
  axios
    .get(`https://weak-blue-capybara-tie.cyclic.app/get?name=${query}&limit=${limit}&sortby=price&sortBy=${sort}&genre=${category}`)
    .then((res) => {
      dispatch(GetMovieAction(res.data.slice(limit-5,limit)));
      //  console.log(res.data);
    })
    .catch((err) => {
       console.log(err);
    });
};

// ------------------------------ delete -------------------------------------------


export const DeleteMovieAction = () => {
  return { type: DELETE_MOVIES };
};


export const deleteMovies=(_id) => {

  return function (dispatch){
    axios
    .delete(`https://weak-blue-capybara-tie.cyclic.app/delete/${_id}`)
    .then(() => {
      dispatch(DeleteMovieAction());
      
     
    })
    .catch((err) => {
      console.log(err);
    });
  }
 
};


// ------------------------------ update-------------------------------------------

export const UpdateMovieAction = (updatemovie) => {
  return { type: UPDATE_MOVIES,
     payload:updatemovie
  };
};



export const updateMovies=(updatemovie,id) => {
  console.log('updatemovie',updatemovie)
  return function (dispatch){
    axios
    .patch(`https://weak-blue-capybara-tie.cyclic.app/update/${id}`,updatemovie)
    .then(() => {
      dispatch(UpdateMovieAction());
     
    })
    .catch((err) => {
      console.log(err);
    });
  }
 
};