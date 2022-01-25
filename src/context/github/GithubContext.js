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

  //get search results
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(
      `https://api.github.com/search/users?${params}`,
      {
        headers: {
          Authorization: `token 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`,
        },
      }
    );

    const { items } = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  //get single user
  const getUser = async (login) => {
    setLoading();
    const response = await fetch(`https://api.github.com/users/${login}`, {
      headers: {
        Authorization: `token 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`,
      },
    });

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //get user repos
  const getUserRepos = async (login) => {
    setLoading();
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await fetch(
      `https://api.github.com/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token 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`,
        },
      }
    );

    const data = await response.json();
    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  //clear user results
  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  //set loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
