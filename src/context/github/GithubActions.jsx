//get search results
export const searchUsers = async (text) => {
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
  return items;
};

//get single user
export const getUser = async (login) => {
  const response = await fetch(`https://api.github.com/users/${login}`, {
    headers: {
      Authorization: `token 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`,
    },
  });

  if (response.status === 404) {
    window.location = "/notfound";
  } else {
    const data = await response.json();
    return data;
  }
};

//get user repos
export const getUserRepos = async (login) => {
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
  return data;
};
