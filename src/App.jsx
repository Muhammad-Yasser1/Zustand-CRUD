import React, { useState } from 'react';
import useTodoStore from './store/todo-store';

const App = () => {
	const { todos, createTodo, updateTodo, removeTodo, clearTodos } =
		useTodoStore(
			({ todos, createTodo, updateTodo, removeTodo, clearTodos }) => ({
				todos,
				createTodo,
				updateTodo,
				removeTodo,
				clearTodos,
			})
		);
	const [newTodoTitle, setNewTodoTitle] = useState('');
	const [editedTodoTitle, setEditedTodoTitle] = useState('');
	const [isEditMode, setIsEditMode] = useState(false);

	const handleCreateTodo = () => {
		createTodo({ title: newTodoTitle, id: Math.random().toString() });
	};
	const handleRemoveTodo = (id) => {
		removeTodo(id);
	};
	const handleUpdateTodo = (id, titleInput) => {
		updateTodo(id, titleInput);
		editModeOFF();
	};

	const editModeON = () => {
		setIsEditMode(true);
	};
	const editModeOFF = () => {
		setIsEditMode(false);
	};

	return (
		<div>
			<header className='cockpit'>
				<div>
					<input
						type='text'
						name='todo'
						onChange={(e) => setNewTodoTitle(e.target.value)}
					/>
				</div>
				<button onClick={handleCreateTodo}>Create</button>
			</header>
			<main>
				<ul>
					{todos.map((todo) => (
						<div key={todo.id}>
							{!isEditMode ? (
								<li>
									{todo.title}
									<button onClick={editModeON}>Edit</button>
									<button
										onClick={() =>
											handleRemoveTodo(todo.id)
										}
									>
										delete
									</button>
								</li>
							) : (
								<li>
									<input
										type='text'
										name='todo'
										defaultValue={todo.title}
										onChange={(e) =>
											setEditedTodoTitle(e.target.value)
										}
									/>
									<button
										onClick={() =>
											handleUpdateTodo(
												todo.id,
												editedTodoTitle
											)
										}
									>
										update
									</button>
								</li>
							)}
						</div>
					))}
				</ul>
			</main>
			<footer>
				<button onClick={clearTodos}>Delete All Todos</button>
			</footer>
		</div>
	);
};

export default App;
