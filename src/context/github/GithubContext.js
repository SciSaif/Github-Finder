import React from "react";

import { createContext, useReducer } from "react";
import { createRoutesFromChildren } from "react-router-dom";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

// const GITHUB_URL = "https://api.github.com";
// const GITHUB_TOKEN = "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";

//provier function
export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
