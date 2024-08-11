import React, { useState } from 'react';  
import { View, TextInput, TouchableOpacity, Text } from 'react-native';  
import styles from '../styles';  

const TodoForm = ({ onAdd }) => {  
  const [title, setTitle] = useState('');  
  const [comment, setComment] = useState('');  

  const handleAddTodo = () => {  
    if (title) {  
      onAdd(title, comment);  
      setTitle('');  
      setComment('');  
    }  
  };  

  return (  
    <View>  
      <TextInput  
        placeholder="Todo Title"  
        value={title}  
        onChangeText={setTitle}  
        style={styles.input}  
      />  
      <TextInput  
        placeholder="Comment"  
        value={comment}  
        onChangeText={setComment}  
        style={styles.input}  
      />  
      <TouchableOpacity style={styles.submitBtn} onPress={handleAddTodo}>  
        <Text style={styles.submitText}>Add Todo</Text>  
      </TouchableOpacity>  
    </View>  
  );  
};  

export default TodoForm;