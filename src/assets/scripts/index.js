const scheduleApp = {
  tasks: [{
    taskDay: "1990-01-01",
    taskTime: "01:01",
    taskTitle: "lul",
    taskMsg: "lul"
  }, {
    taskDay: "1992-02-02",
    taskTime: "02:02",
    taskTitle: "kek",
    taskMsg: "kek"
  }, {
    taskDay: "1994-01-01",
    taskTime: "00:00",
    taskTitle: "azaza",
    taskMsg: "azaza"
  }],
  elements: {
    burger: document.querySelector('.navbar-burger'),
    navBar: document.querySelector('#navbarSchedule'),
    form: document.querySelector('.form'),
    addTaskButton: document.querySelector('.add__task'),
    tasksList: document.querySelector('.tasks'),
    taskTemplate: document.querySelector('#task-template'),
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
        if (event.target.classList.contains('task__spoiler')) {
          const card = event.target.closest('.task');
          const footer = card.querySelector('.task__footer');
          footer.classList.toggle('visible');
        }
      });
    },
  },
  taskPush(obj) {
    this.tasks.push(obj);
  },
  taskGenerate(obj) {
    const card = elem.taskTemplate.content.cloneNode(true);
    const taskTime = card.querySelector('.task__time');
    const taskTitle = card.querySelector('.task__header-title');
    const taskMsg = card.querySelector('.content');

    taskTime.textContent = obj.taskTime;
    taskTitle.textContent = obj.taskTitle;
    taskMsg.textContent = obj.taskMsg;
    return card;
  },
  taskRender(card) {
    elem.tasksList.appendChild(card);
  },
  renderAll() {
    for (const task of this.tasks) {
      this.taskRender(this.taskGenerate(task));
    }
  },
  startHandlers() {
    that = this;
    elem = this.elements;
    handl = this.handlers;

    handl.burgerHandler();
    handl.addTaskButtonHandler();
    handl.taskSpoiler();
  },
};

let that, elem, handl;

document.addEventListener('DOMContentLoaded', () => {
  scheduleApp.startHandlers();
  scheduleApp.renderAll();
});