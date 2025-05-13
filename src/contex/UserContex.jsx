import axios from 'axios';
import React, { createContext, useState } from 'react';

export const UserContex = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContex.Provider value={{user, setUser}}>
      {children}
    </UserContex.Provider>
  );
};
