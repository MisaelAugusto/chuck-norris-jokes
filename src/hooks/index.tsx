import React from 'react';

import { JokesProvider } from './jokes';

const AppProvider: React.FC = ({ children }) => {
  return <JokesProvider>{children}</JokesProvider>;
};

export default AppProvider;
