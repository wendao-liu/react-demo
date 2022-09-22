import React from 'react';

export const StoreContext = React.createContext<any>(null);

export const StoreProvider: React.FC<{ store: any }> = ({
  store,
  children,
}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
