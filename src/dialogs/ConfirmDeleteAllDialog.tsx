import React from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';

interface ConfirmDialogProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

const ConfirmDeleteAllDialog: React.FC<ConfirmDialogProps> = ({
	open,
	onClose,
	onConfirm,
}) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle className="bg-red-500 text-white">
				Confirm Delete
			</DialogTitle>
			<DialogContent className="mt-4">
				Are you sure you want to Delete all tasks?
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
				>
					No
				</button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDeleteAllDialog;
