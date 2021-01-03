import React, { createContext, useState } from 'react';

export const PatientsContext = createContext();

function PatientsProvider({ children }) {
  const current = useState({});
  const open = useState(false);

  return (
    <PatientsContext.Provider
      value={{
        current,
        open,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
}

export default PatientsProvider;
