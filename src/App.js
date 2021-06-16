import React, { useState, useReducer } from 'react';

import './App.css';

import { PostList } from './post/PostList';
import { CreatePost } from './post/CreatePost';
import { UserBar } from './user/UserBar';

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

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
    case 'REGISTER':
      return action.username;
    case 'LOGOUT':
      return '';
    default:
      throw new Error();
  }
}

function App() {
  const [user, dispatchUser] = useReducer(userReducer, '');
  const [posts, setPosts] = useState(defaultPosts);
  return (
    <div style={{ padding: 8 }}>
      <UserBar user={user} dispatch={dispatchUser} />
      <br />
      {user && <CreatePost user={user} posts={posts} setPosts={setPosts} />}
      <br />
      <hr />
      <PostList posts={posts} />
    </div>
  );
}

export default App;
