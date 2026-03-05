/**
 * Todo List App - React Native
 * A simple, feature-rich todo list application with dark mode support
 * Features: Add, complete, and delete tasks with persistent UI updates
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

// Interface defining the structure of each todo item in the list
interface TodoItem {
  id: string;        // Unique identifier for each todo (timestamp-based)
  text: string;      // The todo task description
  completed: boolean; // Boolean flag to track task completion status
}

function App() {
  // Detect if device is in dark mode for conditional styling
  const isDarkMode = useColorScheme() === 'dark';
  
  // State management for todo list
  const [todos, setTodos] = useState<TodoItem[]>([]);      // Array of todo items
  const [inputText, setInputText] = useState('');          // Current text in input field

  // Function to add a new todo item to the list
  // Validates that input is not empty, creates new todo with unique ID, and clears input field
  const addTodo = () => {
    // Trim whitespace and check if input is empty
    if (inputText.trim() === '') {
      Alert.alert('Error', 'Please enter a task');
      return;
    }
    // Create new todo object with current timestamp as unique ID
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: inputText.trim(),
      completed: false,
    };
    // Update state with new todo and clear the input field
    setTodos([...todos, newTodo]);
    setInputText('');
  };

  // Function to toggle the completed status of a todo item
  // Maps through todos array and flips the completed boolean for matching ID
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Function to remove a todo item from the list
  // Filters out the todo with matching ID from the array
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Render individual todo item component
  // Displays checkbox, todo text, and delete button for each item
  const renderTodoItem = ({ item }: { item: TodoItem }) => (
    <View style={styles.todoItem}>
      {/* Checkbox - toggles completion status on press */}
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkboxCompleted]}
        onPress={() => toggleTodo(item.id)}
      >
        {/* Show checkmark only if task is completed */}
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      {/* Todo text - applies strikethrough if completed */}
      <Text style={[styles.todoText, item.completed && styles.todoTextCompleted]}>
        {item.text}
      </Text>

      {/* Delete button - removes todo from list on press */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteTodo(item.id)}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  // Main component render - returns UI with input field and todo list
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, isDarkMode && styles.darkContainer]}>
        {/* Status bar - adapt color based on dark mode */}
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        
        {/* App title */}
        <Text style={[styles.title, isDarkMode && styles.darkText]}>Todo List</Text>

        {/* Input section - contains text input and add button */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Add a new task..."
            placeholderTextColor={isDarkMode ? '#888' : '#999'}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={addTodo}  // Add todo on keyboard submit
          />
          {/* Add button - triggers addTodo function on press */}
          <TouchableOpacity style={styles.addButton} onPress={addTodo}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* FlatList to render all todo items efficiently */}
        {/* Renders renderTodoItem component for each todo in array */}
        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item.id}  // Unique key for each list item
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// StyleSheet object containing all component styles
// Organized by component for easy maintenance and reusability
const styles = StyleSheet.create({
  // Main container - light mode
  container: {
    flex: 1,                    // Fill entire available space
    backgroundColor: '#f5f5f5', // Light gray background
  },
  // Container dark mode variant
  darkContainer: {
    backgroundColor: '#121212', // Dark background for dark mode
  },
  
  // App title styling
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',              // Dark text for light mode
  },
  // Dark mode text color
  darkText: {
    color: '#fff',              // White text for dark mode
  },
  
  // Container for input field and add button
  inputContainer: {
    flexDirection: 'row',       // Arrange items horizontally
    paddingHorizontal: 20,      // Horizontal padding from edges
    marginBottom: 20,
  },
  
  // Text input field styling
  input: {
    flex: 1,                    // Take remaining space after button
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,            // Rounded corners
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',    // White background
    marginRight: 10,            // Space between input and button
  },
  // Dark mode input field variant
  darkInput: {
    backgroundColor: '#333',    // Dark gray background
    borderColor: '#555',        // Darker border
    color: '#fff',              // White text
  },
  
  // Add button styling
  addButton: {
    backgroundColor: '#007AFF', // iOS blue color
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',   // Center button text vertically
  },
  // Add button text
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // List container
  list: {
    flex: 1,                    // Fill available space
    paddingHorizontal: 20,
  },
  
  // Individual todo item container
  todoItem: {
    flexDirection: 'row',       // Arrange checkbox, text, and delete button horizontally
    alignItems: 'center',       // Vertically center items
    backgroundColor: '#fff',    // White card background
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',        // Drop shadow for iOS
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,               // Shadow for Android
  },
  
  // Checkbox styling
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',     // Blue border
    borderRadius: 4,            // Slightly rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,            // Space between checkbox and text
  },
  // Checkbox styling when task is completed
  checkboxCompleted: {
    backgroundColor: '#007AFF', // Filled blue when completed
  },
  // Checkmark icon styling
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Todo text styling
  todoText: {
    flex: 1,                    // Take available space
    fontSize: 16,
    color: '#333',              // Dark text
  },
  // Todo text styling when completed - applies strikethrough
  todoTextCompleted: {
    textDecorationLine: 'line-through', // Strike through completed tasks
    color: '#888',                      // Gray out text
  },
  
  // Delete button styling
  deleteButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,             // Space between text and delete button
  },
  // Delete button text (X icon)
  deleteText: {
    fontSize: 18,
    color: '#ff4444',           // Red color for delete action
    fontWeight: 'bold',
  },
});

// Export the main App component as default
export default App;
