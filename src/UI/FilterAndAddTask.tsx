import { FilterAndAddTaskProps } from '../types/types';

const FilterAndAddTask: React.FC<
	FilterAndAddTaskProps & { handleClearAll: () => void }
> = ({ filter, setFilter, handleClickOpen, handleClearAll, hasTasks }) => {
	return (
		<div className="flex flex-col md:flex-row lg:flex-row items-center justify-center">
			<select
				value={filter}
				onChange={e =>
					setFilter(
						e.target.value as 'all' | 'completed' | 'incomplete'
					)
				}
				className="py-2 px-4 border rounded m-1"
			>
				<option value="all">All</option>
				<option value="completed">Completed</option>
				<option value="incomplete">In Complete</option>
			</select>

			<button
				onClick={handleClickOpen}
				className="bg-red-400 text-white py-2 px-5 rounded m-1"
			>
				Add Task
			</button>
			{hasTasks && (
				<button
					onClick={handleClearAll}
					className="bg-gray-400 text-white py-2 px-5 rounded m-1"
				>
					Clear All Tasks
				</button>
			)}
		</div>
	);
};
export default FilterAndAddTask;
