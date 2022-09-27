const taskFactory = (
  taskId,
  taskTitle,
  taskPriority,
  taskDetails,
  taskDate,
  taskStatus
) => {
  const _taskId = taskId;
  const _taskTitle = taskTitle;
  const _taskPriority = taskPriority;
  const _taskDetails = taskDetails;
  const _taskDate = taskDate;
  const _taskStatus = taskStatus;

  const getTask = () => {
    return {
      _taskId,
      _taskTitle,
      _taskPriority,
      _taskDetails,
      _taskDate,
      _taskStatus,
    };
  };

  return { getTask };
};

export { taskFactory };
