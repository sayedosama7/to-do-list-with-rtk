import React from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';
import { ConfirmDeleteDialogProps } from '../types/types';

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
	open,
	onClose,
	onConfirm,
}) => {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle className="bg-red-500 text-white">
				Confirm Delete
			</DialogTitle>

			<DialogContent className="mt-4">
				<p>Are you sure you want to Delete this task?</p>
			</DialogContent>
			<DialogActions>
				<button
					className="bg-red-500 text-white py-2 px-5 rounded"
					onClick={onConfirm}
					color="primary"
				>
					Yes
				</button>
				<button
					className="bg-emerald-600 text-white py-2 px-5 rounded"
					onClick={onClose}
					color="primary"
					autoFocus
				>
					No
				</button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDeleteDialog;
