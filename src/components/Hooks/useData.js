import { useReducer, useEffect } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_STORE":
      return { ...state };
    case "GET_DERIVED_STATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const useData = initialState => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updateStore = data => {
    if (data) {
      dispatch({ type: "GET_DERIVED_STATE", payload: data });
    } else {
      dispatch({ type: "UPDATE_STORE" });
    }
  };
  useEffect(() => {
    updateStore();
  }, [initialState]);
  //   console.log(state);
  return [state, updateStore];
};

export default useData;
