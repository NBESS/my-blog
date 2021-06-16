import React, { useState } from 'react';

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

function App() {
  const [user, setUser] = useState('');
  const [posts, setPosts] = useState(defaultPosts);
  return (
    <div style={{ padding: 8 }}>
      <UserBar user={user} setUser={setUser} />
      <br />
      {user && <CreatePost user={user} posts={posts} setPosts={setPosts} />}
      <br />
      <hr />
      <PostList posts={posts} />
    </div>
  );
}

export default App;
