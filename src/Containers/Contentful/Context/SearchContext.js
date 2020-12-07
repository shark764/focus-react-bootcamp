import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchString, setSearchString] = useState('');

  return <SearchContext.Provider value={[searchString, setSearchString]}>{children}</SearchContext.Provider>;
};

SearchProvider.propTypes = {
  children: PropTypes.node,
};

export default SearchProvider;
