import React from 'react';

import { Post } from './Post';

export function PostList({ posts = [] }) {
  return (
    <div>
      {posts.map((p, i) => (
        <React.Fragment key={'post-' + i}>
          <Post {...p} />
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
}
