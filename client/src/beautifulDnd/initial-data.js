const initialData = {
  // user should be able to enter these tasks via a form
  tasks: {
    'task-1': { id: 'task-1', content: 'Vist Museum' },
    'task-2': { id: 'task-2', content: 'Supper at il Paggliacio' },
    'task-3': { id: 'task-3', content: 'Visit Ruins' },
    'task-4': { id: 'task-4', content: 'Bike ride Appian Road' },
    'task-5': { id: 'task-5', content: 'Gelato!' },
  },

  // Will use first column to store all the entries the user does
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5'],
    },
    //columns 2 onward would be made depending on numOfDays?
    'column-2': {
      id: 'column-2',
      title: 'Day 1',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Day 2',
      taskIds: [],
    },
  },
  //array to map for columns, also facilitates the reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3'],
};
export default initialData;
