const initialBoard = require('./initialBoard');

const buildBoardColumns = (days) => {
  let updatedBoard = initialBoard;

  //loop through to create object based on number of days
  for (let i = 0; i < days; i++) {
    // console.log(updatedBoard);

    //create object to create empty columns
    const columnObject = {
      id: `column-${i + 2}`,
      title: `Day ${i + 1}`,
      taskIds: [],
    };
    //update the existing board object
    updatedBoard = {
      ...updatedBoard,
      columns: { ...updatedBoard.columns, [`column-${i + 2}`]: columnObject },
      columnOrder: [...updatedBoard.columnOrder, `column-${i + 2}`],
    };
  }
  return updatedBoard;
};

module.exports = buildBoardColumns;
