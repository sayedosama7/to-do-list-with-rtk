import React from 'react';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
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
            fullWidth
		>
			<DialogTitle id="alert-dialog-title">
				{'Confirm Delete'}
			</DialogTitle>
			<DialogContent>
				<p>Are you sure?</p>
			</DialogContent>
			<DialogActions>
				<Button onClick={onConfirm} color="primary">
					yes
				</Button>
				<Button onClick={onClose} color="primary" autoFocus>
					no
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDeleteDialog;
