import React, { useReducer, useEffect, useState } from 'react';

import { PostList } from './post/PostList';
import { useResource } from 'react-request-hook';
import HeaderBar from './pages/HeaderBar';
import { ThemeContext, StateContext } from './contexts';
import appReducer from './reducers';
import './App.css';

function App() {
  const [theme, setTheme] = useState({
    primaryColor: 'deepskyblue',
    secondaryColor: 'coral',
  });
  const [state, dispatch] = useReducer(appReducer, {
    user: '',
    posts: [],
    error: '',
  });

  const { user, error } = state;

  const [posts, getPosts] = useResource(() => ({
    url: '/posts',
    method: 'get',
  }));

  useEffect(getPosts, []);

  useEffect(() => {
    if (posts && posts.error) {
      dispatch({ type: 'POSTS_ERROR' });
    }
    if (posts && posts.data) {
      dispatch({ type: 'FETCH_POSTS', posts: posts.data.reverse() });
    }
  }, [posts]);

  useEffect(() => {
    if (user) {
      document.title = `${user} - Personal Blog`;
    } else {
      document.title = 'Blog Site';
    }
  }, [user]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ThemeContext.Provider value={theme}>
        <div style={{ padding: 8 }}>
          <HeaderBar setTheme={setTheme} />
          <br />
          <hr />
          {error && <b>{error}</b>}
          <PostList />
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
