import React, { useState, createContext } from 'react';
import { TODOS } from './data';

export const TodosContext = createContext();

function TodosProvider({ children }) {
  const [todos, setTodos] = useState(TODOS);

  return <TodosContext.Provider value={[todos, setTodos]}>{children}</TodosContext.Provider>;
}

export default TodosProvider;
