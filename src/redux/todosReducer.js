const initialState = {
  todos: [],
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => {
          return todo.id !== action.payload;
        }),
      };

    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          return todo.id === action.payload.id ? action.payload : todo;
        }),
      };

    default:
      return state;
  }
};

export default todosReducer;
