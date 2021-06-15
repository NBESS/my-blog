import './App.css';

import { PostList } from './post/PostList';
import { CreatePost } from './post/CreatePost';
import { UserBar } from './user/UserBar';

const user = 'Nick Bess';
const posts = [
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
  return (
    <div style={{ padding: 8 }}>
      <UserBar />
      <br />
      <CreatePost user={user} />
      <br />
      <hr />
      <PostList posts={posts} />
    </div>
  );
}

export default App;
