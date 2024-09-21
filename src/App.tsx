import { useState } from 'react';
import Header from './elements/Header';
import ToDoList from './components/ToDoList';
import AddTaskDialog from './dialogs/AddTaskDialog';
import './App.css'
const App = () => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Header />
			<ToDoList handleClickOpen={handleClickOpen} />
			<AddTaskDialog open={open} handleClose={handleClose} />
		</div>
	);
};

export default App;
