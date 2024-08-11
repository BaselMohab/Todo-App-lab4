// store/todoSlice.js  
import { createSlice } from '@reduxjs/toolkit';  

const todoSlice = createSlice({  
  name: 'todos',  
  initialState: [],  
  reducers: {  
    addTodo: (state, action) => {  
      const newTodo = {  
        id: Date.now().toString(),  
        title: action.payload.title,  
        comment: action.payload.comment,  
        done: false,  
      };  
      state.push(newTodo);  
    },  
    removeTodo: (state, action) => {  
      return state.filter(todo => todo.id !== action.payload);  
    },  
    toggleTodo: (state, action) => {  
      const todo = state.find(todo => todo.id === action.payload);  
      if (todo) {  
        todo.done = !todo.done;  
      }  
    },  
    setTodos: (state, action) => {  
      return action.payload;  
    },  
  },  
});  

export const { addTodo, removeTodo, toggleTodo, setTodos } = todoSlice.actions;  

export default todoSlice.reducer;