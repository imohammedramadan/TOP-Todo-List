const inputHandler = (function () {
  const getModalInputs = (e, taskModalForm) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(taskModalForm).entries());

    taskModalForm.reset();

    formData.taskStatus = false;

    return formData;
  };

  const getProjectModalInputs = (e, taskModalForm) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(taskModalForm).entries());

    taskModalForm.reset();

    return formData;
  };
  return { getModalInputs, getProjectModalInputs };
})();

export { inputHandler };
