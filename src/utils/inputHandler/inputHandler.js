const inputHandler = (function () {
  const getModalInputs = (e, taskModalForm) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries());

    taskModalForm.reset();

    formData.taskStatus = false;

    return formData;
  };

  const getProjectModalInputs = (e, taskModalForm) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries());

    taskModalForm.reset();

    return formData;
  };
  return { getModalInputs, getProjectModalInputs };
})();

export { inputHandler };
