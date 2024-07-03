import React, {useState} from 'react';
import Routes from './components/routes.js'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  

  return <Routes isLoggedIn={isLoggedIn} />;
};

export default App;
