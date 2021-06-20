import React, { useState, useContext } from 'react';
import { useResource } from 'react-request-hook';

import { StateContext } from '../contexts';

export function CreatePost() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [, createPost] = useResource(({ title, content, author }) => ({
    url: '/posts',
    method: 'post',
    data: { title, content, author },
  }));

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleContent(e) {
    setContent(e.target.value);
  }

  function clearPostForm() {
    setTitle('');
    setContent('');
  }

  function handleCreate() {
    createPost({ title, content, author: user });
    dispatch({ type: 'CREATE_POST', title, content, author: user });
    clearPostForm();
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
