import 'package:flutter/material.dart';

void main() {
  // Entry point of the application
  runApp(const MyApp());
}

/// The root widget of the application.
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      // The home page of the app
      home: TodoPage(),
      // Hiding the debug banner for a cleaner UI
      debugShowCheckedModeBanner: false,
    );
  }
}

/// A stateful widget that represents the To-Do list page.
class TodoPage extends StatefulWidget {
  const TodoPage({super.key});

  @override
  State<TodoPage> createState() => _TodoPageState();
}

/// The state class for TodoPage where the business logic and UI are defined.
class _TodoPageState extends State<TodoPage> {
  // List to store the tasks as strings
  final List<String> _tasks = [];
  // Controller to capture and manage text input
  final TextEditingController _controller = TextEditingController();

  /// Adds a new task to the list if the input is not empty.
  void _addTask() {
    if (_controller.text.isNotEmpty) {
      setState(() {
        _tasks.add(_controller.text);
        // Clear the text field after adding the task
        _controller.clear();
      });
    }
  }

  /// Removes a task from the list based on its index.
  void _deleteTask(int index) {
    setState(() {
      _tasks.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Flutter To-Do'),
      ),
      body: Column(
        children: [
          // Input section: TextField and Add button
          Padding(
            padding: const EdgeInsets.all(12),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: const InputDecoration(
                      hintText: 'Enter task',
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.add),
                  onPressed: _addTask,
                ),
              ],
            ),
          ),
          // List section: Displays all added tasks
          Expanded(
            child: ListView.builder(
              itemCount: _tasks.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(_tasks[index]),
                  trailing: IconButton(
                    icon: const Icon(Icons.delete),
                    onPressed: () => _deleteTask(index),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
