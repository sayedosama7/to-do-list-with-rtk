import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { Todo } from '../types/types';
import {
	clearAllTasks,
	deleteTodo,
	editTodo,
	getAll,
} from '../slices/todoSlice';
import EditTaskDialog from '../dialogs/EditTaskDialog';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDeleteDialog from '../dialogs/ConfirmDeleteDialog';
import FilterAndAddTask from '../UI/FilterAndAddTask';
import TaskList from '../UI/TaskList';

const ToDoList: React.FC<{ handleClickOpen: () => void }> = ({
	handleClickOpen,
}) => {
	const dispatch = useDispatch();
	const data = useSelector((state: RootState) => state.todo.todo);

	const [openDialog, setOpenDialog] = useState(false);
	const [currentTask, setCurrentTask] = useState<Todo | null>(null);
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
	const [taskToDelete, setTaskToDelete] = useState<string | number | null>(
		null
	);
	const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>(
		'all'
	);

	useEffect(() => {
		const tasksFromLocalStorage = localStorage.getItem('todos');
		if (tasksFromLocalStorage) {
			const parsedTasks = JSON.parse(tasksFromLocalStorage);
			dispatch(getAll(parsedTasks));
		}
	}, [dispatch]);

	useEffect(() => {
		if (data.length > 0) {
			localStorage.setItem('todos', JSON.stringify(data));
		}
	}, [data]);

	const handleEditOpen = (task: Todo) => {
		setCurrentTask(task);
		setOpenDialog(true);
	};

	const handleDialogClose = () => {
		setOpenDialog(false);
		setCurrentTask(null);
	};

	const handleConfirmDialogClose = () => {
		setOpenConfirmDialog(false);
		setTaskToDelete(null);
	};

	const handleDeleteOpen = (id: string | number) => {
		setTaskToDelete(id);
		setOpenConfirmDialog(true);
	};

	const handleDelete = () => {
		if (taskToDelete) {
			dispatch(deleteTodo(taskToDelete));
			toast.success('Task deleted successfully', { autoClose: 3000 });

			const tasksFromLocalStorage = localStorage.getItem('todos');
			if (tasksFromLocalStorage) {
				const tasks = JSON.parse(tasksFromLocalStorage);
				const updatedTasks = tasks.filter(
					(task: { id: string | number }) => task.id !== taskToDelete
				);
				localStorage.setItem('todos', JSON.stringify(updatedTasks));
			}

			handleConfirmDialogClose();
		}
	};
	const handleClearAllTasks = () => {
		dispatch(clearAllTasks());
		localStorage.removeItem('todos');
		toast.success('All tasks cleared!', { autoClose: 3000 });
	};

	const handleToggleComplete = (task: Todo) => {
		dispatch(
			editTodo({
				id: task.id,
				task: task.task,
				isCompleted: !task.isCompleted,
			})
		);
		toast.success(`Task ${task.isCompleted ? 'Incomplete' : 'Completed'}`, {
			autoClose: 3000,
		});
	};

	const filteredData = data.filter(task => {
		if (filter === 'completed') return task.isCompleted;
		if (filter === 'incomplete') return !task.isCompleted;
		return true;
	});
	const hasTasks = data.length > 0;

	return (
		<div>
			<ToastContainer />

			<FilterAndAddTask
				filter={filter}
				setFilter={setFilter}
				handleClickOpen={handleClickOpen}
				handleClearAll={handleClearAllTasks}
				hasTasks={hasTasks}
			/>

			<TaskList
				tasks={filteredData}
				handleEditOpen={handleEditOpen}
				handleToggleComplete={handleToggleComplete}
				handleDeleteOpen={handleDeleteOpen}
			/>

			<EditTaskDialog
				open={openDialog}
				onClose={handleDialogClose}
				task={currentTask}
			/>

			<ConfirmDeleteDialog
				open={openConfirmDialog}
				onClose={handleConfirmDialogClose}
				onConfirm={handleDelete}
			/>
		</div>
	);
};

export default ToDoList;
