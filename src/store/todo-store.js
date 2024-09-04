import { create } from 'zustand';

const useTodoStore = create((set) => ({
	todos: [{ id: '1', title: 'First Todo' }],
	createTodo: (newTodo) =>
		set((state) => {
			console.log('createTodo ~ newTodo:', newTodo);
			console.log('set ~ state:', state);
			return { todos: [...state.todos, newTodo] };
		}),
	removeTodo: (todoID) =>
		set((state) => ({
			todos: state.todos.filter((todo) => todo.id !== todoID),
		})),
	updateTodo: (id, newTitle) =>
		set((state) => {
			const todosClone = JSON.parse(JSON.stringify(state.todos));
			todosClone.find((todo) => todo.id === id).title = newTitle;
			return { todos: todosClone };
		}),
	clearTodos: () => set(() => ({ todos: [] })),
}));

export default useTodoStore;
