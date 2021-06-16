import React, { useState } from 'react';

export function CreatePost({ user, posts, setPosts }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleContent(e) {
    setContent(e.target.value);
  }

  function handleCreate() {
    const newPost = { title, content, author: user };
    setPosts([newPost, ...posts]);
    setTitle('');
    setContent('');
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}>
      <div>
        Author: <b>{user}</b>
      </div>
      <div>
        <label htmlFor='create-title'>Title:</label>
        <input
          type='text'
          value={title}
          onChange={handleTitle}
          name='create-title'
          id='create-title'
        />
      </div>
      <textarea value={content} onChange={handleContent} />
      <input type='submit' value='Create' />
    </form>
  );
}
