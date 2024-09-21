import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
	TextField,
} from '@mui/material';
import { editTodo } from '../slices/todoSlice';
import { EditTaskDialogProps } from '../types/types';
import { toast } from 'react-toastify';

const EditTaskDialog: React.FC<EditTaskDialogProps> = ({
	open,
	onClose,
	task,
}) => {
	const dispatch = useDispatch();
	const [currentTask, setCurrentTask] = useState<string>('');

	useEffect(() => {
		if (task) {
			setCurrentTask(task.task);
		} else {
			setCurrentTask('');
		}
	}, [task]);

	const handleSave = () => {
		if (task) {
			if (currentTask.trim()) {
				dispatch(
					editTodo({
						id: task.id,
						task: currentTask,
						isCompleted: false,
					})
				);
				toast.success('Task updated successfully', {
					autoClose: 3000,
				});
				onClose();
			} else {
				toast.error('Task cannot be empty', {
					autoClose: 3000,
				});
			}
		}
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<DialogTitle>Edit Task</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					label="Edit Task"
					type="text"
					fullWidth
					variant="outlined"
					value={currentTask}
					onChange={e => setCurrentTask(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleSave} color="primary">
					Update
				</Button>
				<Button onClick={onClose} color="primary">
					cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditTaskDialog;
