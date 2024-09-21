import React from 'react';
import { TaskListProps, Todo } from '../types/types';
import { Checkbox } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const TaskList: React.FC<TaskListProps> = ({
	tasks,
	handleEditOpen,
	handleToggleComplete,
	handleDeleteOpen,
}) => {
	if (tasks.length === 0) {
		return (
			<p className="text-center capitalize font-medium mt-10 text-3xl text-white">
				No tasks yet !...
			</p>
		);
	}

	return (
		<>
			{tasks.map((task: Todo) => (
				<div key={task.id}>
					<div
						className={`mt-5 sm:w-1/2 m-auto p-3 ${
							task.isCompleted
								? 'bg-green-100 opacity-50'
								: 'bg-teal-200'
						}`}
					>
						<div className="flex justify-between items-center">
							<div className="flex items-center">
								<Checkbox
									checked={task.isCompleted}
									onChange={() => handleToggleComplete(task)}
									color="primary"
								/>
								<p
									className={`font-medium ${
										task.isCompleted ? 'line-through' : ''
									}`}
								>
									{task.task}
								</p>
							</div>
							<div className="flex items-center justify-center">
								<button onClick={() => handleEditOpen(task)}>
									<FaEdit className="text-green-700 mr-2 hover:text-green-500 transition-colors text-xl" />
								</button>
								<button
									onClick={() => handleDeleteOpen(task.id)}
								>
									<MdDelete className="text-red-700 hover:text-red-500 transition-colors text-2xl" />
								</button>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default TaskList;
