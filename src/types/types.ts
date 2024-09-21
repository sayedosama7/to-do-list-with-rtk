export interface ModalProps {
    open: boolean;
    handleClose: () => void;
}

export interface Todo {
    id: string | number;
    task: string;
    isCompleted: boolean;
}

export interface TodoState {
    todo: Todo[];
}

export interface ConfirmDeleteDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export interface EditTaskDialogProps {
    open: boolean;
    onClose: () => void;
    task: Todo | null;
}

export interface FilterAndAddTaskProps {
    filter: 'all' | 'completed' | 'incomplete';
    setFilter: (filter: 'all' | 'completed' | 'incomplete') => void;
    handleClickOpen: () => void;
    hasTasks: boolean;
}

export interface TaskListProps {
    tasks: Todo[];
    handleEditOpen: (task: Todo) => void;
    handleToggleComplete: (task: Todo) => void;
    handleDeleteOpen: (id: string | number) => void;
}