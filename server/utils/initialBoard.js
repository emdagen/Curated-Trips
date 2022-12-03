//initial board provided by dnd

const initialBoard = {
  tasks: {
    // 'task-1': { id: 'task-1', content: 'Walk Doggo' },
    // 'task-2': { id: 'task-2', content: 'Stretch' },
    // 'task-3': { id: 'task-3', content: 'Workout' },
    // 'task-4': { id: 'task-4', content: 'Drink water' },
    // 'task-5': { id: 'task-5', content: 'Send Horoscopes' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Activities',
      taskIds: [],
      // taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5'],
    },
    // 'column-2': {
    // 	id: 'column-2',
    // 	title: 'Progress...',
    // 	taskIds: [],
    // },
    // 'column-3': {
    // 	id: 'column-3',
    // 	title: 'Completed',
    // 	taskIds: [],
    // },
  },
  //array to map for columns
  columnOrder: ['column-1'],
  // columnOrder: ['column-1', 'column-2', 'column-3'],
};
// console.log(initialData);
module.exports = initialBoard;
