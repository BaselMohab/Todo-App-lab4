// Home.js  
import React, { useEffect } from "react";  
import { View, FlatList, ImageBackground } from "react-native";  
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { useDispatch, useSelector } from 'react-redux';  
import { addTodo, removeTodo, toggleTodo, setTodos } from '../App/todoSlice';  
import TodoItem from "../components/TodoItem";  
import FilterButtons from "../components/FilterButtons";  
import TodoForm from "../components/TodoForm";  
import styles from "../styles";  
import backgroundImage from '../assets/images/bgImage.jpg';  

const Home = ({ navigation }) => {  
  const dispatch = useDispatch();  
  const todos = useSelector(state => state.todos);  
  const [filter, setFilter] = React.useState('all');   

  useEffect(() => {  
    loadTodos();  
  }, []);  

  const loadTodos = async () => {  
    try {  
      const jsonValue = await AsyncStorage.getItem('@todos');  
      const loadedTodos = jsonValue != null ? JSON.parse(jsonValue) : [];  
      dispatch(setTodos(loadedTodos));  
    } catch (e) {  
      console.error(e);  
    }  
  };  

  const saveTodos = async (newTodos) => {  
    try {  
      const jsonValue = JSON.stringify(newTodos);  
      await AsyncStorage.setItem('@todos', jsonValue);  
    } catch (e) {  
      console.error(e);  
    }  
  };  

  useEffect(() => {  
    saveTodos(todos);  
  }, [todos]);  

  const handleAddTodo = (title, comment) => {  
    dispatch(addTodo({ title, comment }));  
  };  

  const filteredTodos = () => {  
    if (filter === 'active') return todos.filter(todo => !todo.done);  
    if (filter === 'done') return todos.filter(todo => todo.done);  
    return todos;  
  };  

  return (   
    <ImageBackground source={backgroundImage} style={styles.background}>  
      <View style={styles.container}>  
        <TodoForm onAdd={handleAddTodo} />   
        <FilterButtons onFilter={setFilter} />   
        <FlatList   
          data={filteredTodos()}   
          renderItem={({ item }) => (  
            <TodoItem   
              todo={item}   
              onRemove={() => dispatch(removeTodo(item.id))}   
              onToggle={() => dispatch(toggleTodo(item.id))}   
              onPress={() => navigation.navigate('TodoDetails', { todo: item })}  
            />  
          )}   
          keyExtractor={item => item.id}   
        />  
      </View>  
    </ImageBackground>  
  );  
};  

export default Home;