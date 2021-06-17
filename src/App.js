import React, { useReducer, useEffect, useState } from 'react';

import { PostList } from './post/PostList';
import { CreatePost } from './post/CreatePost';
import { UserBar } from './user/UserBar';
import Header from './Header';
import ChangeTheme from './ChangeTheme';

import { ThemeContext, StateContext } from './contexts';
import appReducer from './reducers';
import './App.css';

const defaultPosts = [
  {
    title: 'Post 1 Title',
    content: 'This is going better than expected!',
    author: 'Nick Bess',
  },
  {
    title: 'Post 2 Title',
    content: 'Things are still going well. No complaints on my end!',
    author: 'Nick Bess',
  },
];

function App() {
  const [theme, setTheme] = useState({
    primaryColor: 'deepskyblue',
    secondaryColor: 'coral',
  });
  const [state, dispatch] = useReducer(appReducer, {
    user: '',
    posts: defaultPosts,
  });

  const { user, posts } = state;

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
