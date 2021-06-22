import React, { useContext } from 'react';

import Post from './Post';
import { StateContext } from '../contexts';

export function PostList() {
  const { state } = useContext(StateContext);
  const { posts } = state;
  return (
    <div>
      {posts.map((p, i) => (
        <React.Fragment key={'post-' + i}>
          <Post {...p} short={true} />
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
}
