import React, { useReducer, useEffect, useState } from 'react';

import HeaderBar from './pages/HeaderBar';
import HomePage from './pages/HomePage';
import { ThemeContext, StateContext } from './contexts';
import appReducer from './reducers';
import './App.css';

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
        <div style={{ padding: 8 }}>
          <HeaderBar setTheme={setTheme} />
          <br />
          <hr />
          <HomePage />
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
