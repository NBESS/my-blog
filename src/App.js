import React, { useReducer, useEffect, useState } from 'react';
import { Router, View } from 'react-navi';
import { mount, route } from 'navi';

import HeaderBar from './pages/HeaderBar';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import { ThemeContext, StateContext } from './contexts';
import appReducer from './reducers';
import './App.css';
import FooterBar from './pages/FooterBar';

const routes = mount({
  '/': route({ view: <HomePage /> }),
  '/view/:id': route((req) => {
    return { view: <PostPage id={req.params.id} /> };
  }),
});

function App() {
  const [theme, setTheme] = useState({
    primaryColor: 'deepskyblue',
    secondaryColor: 'coral',
  });
  const [state, dispatch] = useReducer(appReducer, {
    user: '',
    posts: [],
    error: '',
  });

  const { user } = state;

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
        <Router routes={routes}>
          <div style={{ padding: 8 }}>
            <HeaderBar setTheme={setTheme} />
            <hr />
            <View />
            <FooterBar />
          </div>
        </Router>
      </ThemeContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
