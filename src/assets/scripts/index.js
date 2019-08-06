const scheduleApp = {
  tasks: {

  },
  elements: {
    burger: document.querySelector('.navbar-burger'),
    navBar: document.querySelector('#navbarSchedule'),
    form: document.querySelector('.form'),
    addTaskButton: document.querySelector('.add__task'),
    tasksList: document.querySelector('.tasks'),
  },
  handlers: {

    burgerHandler() {
      elem.burger.addEventListener('click', () => {
        elem.burger.classList.toggle('is-active');
        elem.navBar.classList.toggle('is-active');
      });
    },
    addTaskButtonHandler() {
      elem.addTaskButton.addEventListener('click', handl.openForm);
    },
    openForm() {
      elem.form.classList.add('form_opened');
      elem.addTaskButton.removeEventListener('click', handl.openForm);
      elem.addTaskButton.addEventListener('click', handl.closeForm);
      elem.form.addEventListener('submit', handl.formSubmit);
      handl.buttonChange(true);
    },
    closeForm() {
      elem.form.classList.remove('form_opened');
      elem.addTaskButton.removeEventListener('click', handl.closeForm);
      elem.addTaskButton.addEventListener('click', handl.openForm);
      elem.form.removeEventListener('submit', handl.formSubmit);
      handl.buttonChange();
    },
    buttonChange(opened) {
      elem.addTaskButton.textContent = opened ? 'Close Form' : 'Add Task';
    },
    formSubmit() {
      const inputs = document.forms.addTask.elements;
      event.preventDefault();
      console.log({
        taskDay: inputs.taskDay.value,
        taskTime: inputs.taskTime.value,
        taskTitle: inputs.taskTitle.value,
        taskMsg: inputs.taskMsg.value
      });
    },
    taskSpoiler() {
      elem.tasksList.addEventListener('click', (event) => {
        console.log(event.target);
        if (event.target.classList.contains('task__spoiler')) {
          const card = event.target.closest('.task');
          const footer = card.querySelector('.task__footer');
          footer.classList.toggle('visible');
        }
      });
    }
  },
  startHandlers() {
    that = this;
    elem = this.elements;
    handl = this.handlers;

    handl.burgerHandler();
    handl.addTaskButtonHandler();
    handl.taskSpoiler();
  }
};

let that, elem, handl;

document.addEventListener('DOMContentLoaded', () => {
  scheduleApp.startHandlers();
});