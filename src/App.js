import React, { useReducer, useEffect, useState } from 'react';

import { PostList } from './post/PostList';
import { CreatePost } from './post/CreatePost';
import { UserBar } from './user/UserBar';
import Header from './Header';
import ChangeTheme from './ChangeTheme';
import { useResource } from 'react-request-hook';

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
  });

  const { user } = state;

  const [posts, getPosts] = useResource(() => ({
    url: '/posts',
    method: 'get',
  }));

  useEffect(getPosts, []);

  useEffect(() => {
    if (posts && posts.data) {
      dispatch({ type: 'FETCH_POSTS', posts: posts.data });
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
          <Header text='Personal Blog' />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <br />
          <UserBar />
          <br />
          {user && <CreatePost />}
          <br />
          <hr />
          <PostList />
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
