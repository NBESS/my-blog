import React, { useReducer, useEffect } from 'react';

import { PostList } from './post/PostList';
import { CreatePost } from './post/CreatePost';
import { UserBar } from './user/UserBar';
import Header from './Header';

import { ThemeContext } from './contexts';
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
    <ThemeContext.Provider
      value={{ primaryColor: 'deepskyblue', secondaryColor: 'coral' }}>
      <div style={{ padding: 8 }}>
        <Header text='Personal Blog' />
        <UserBar user={user} dispatch={dispatch} />
        <br />
        {user && <CreatePost user={user} posts={posts} dispatch={dispatch} />}
        <br />
        <hr />
        <PostList posts={posts} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
