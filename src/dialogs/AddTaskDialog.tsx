import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { TextField, FormHelperText, DialogTitle } from '@mui/material';
import { ModalProps } from '../types/types';
import { useDispatch } from 'react-redux';
import { addTodo } from '../slices/todoSlice';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const AddTaskDialog: React.FC<ModalProps> = ({ open, handleClose }) => {
	const [task, setTask] = React.useState('');
	const [error, setError] = React.useState('');
	const dispatch = useDispatch();

	const handleAddTask = () => {
		if (task.trim()) {
			const newTask = {
				task,
				id: Date.now(),
				isCompleted: false,
			};
			dispatch(addTodo(newTask));
			toast.success('Task added successfully', {
				autoClose: 3000,
			});

			const currentTodos = JSON.parse(
				localStorage.getItem('todos') || '[]'
			);
			currentTodos.push(newTask);
			localStorage.setItem('todos', JSON.stringify(currentTodos));

			setTask('');
			setError('');
			handleClose();
		} else {
			toast.error('Please Add Task', {
				autoClose: 3000,
			});
		}
	};

	return (
		<>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
				fullWidth
			>
				<DialogTitle>Edit Task</DialogTitle>

				<DialogContent>
					<TextField
						label="Add task"
						variant="outlined"
						className="w-full"
						value={task}
						onChange={e => setTask(e.target.value)}
						error={!!error}
						focused
						autoFocus
						margin="dense"
						type="text"
					/>
					<FormHelperText error>{error}</FormHelperText>
				</DialogContent>

				<DialogActions>
					<button
						onClick={handleAddTask}
						className="bg-red-400 text-white py-2 px-5 rounded"
					>
						Add
					</button>
					<button
						onClick={handleClose}
						className="bg-emerald-600 text-white py-2 px-5 rounded"
					>
						Cancel
					</button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default AddTaskDialog;
