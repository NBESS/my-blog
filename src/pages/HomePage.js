import React, { useEffect, useContext } from 'react';
import { stateContext } from '../contexts';
import { PostList } from '../post/PostList';
import { useResource } from 'react-request-hook';

export default function HomePage() {
  const { state, dispatch } = useContext(stateContext);
  const { error } = state;

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

  return (
    <div>
      {error && <b>{error}</b>}
      <PostList />
    </div>
  );
}
