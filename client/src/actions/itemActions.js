import axios from "axios";

import {
  ADD_ITEMS,
  GET_ITEMS,
  DELETE_ITEMS,
  ITEMS_LOADING,
} from "../actions/types";

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then((res) =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const deleteItem = (id) => (dispatch) => {
  axios
    .delete(`/api/items/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_ITEMS,
        payload: id,
      })
    )
    .catch((err) => console.log(err));
};

export const addItem = (item) => (dispatch) => {
  axios
    .post("/api/items", item)
    .then((res) =>
      dispatch({
        type: ADD_ITEMS,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
