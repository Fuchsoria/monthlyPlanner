'use strict';

let that, elem, handl;

const scheduleApp = {
  tasks: {
    '1990-01-01': [{
      taskDay: '1990-01-01',
      taskId: 1,
      taskTime: '01:01',
      taskTitle: 'lul',
      taskMsg: 'lul',
    }, {
      taskDay: '1990-01-01',
      taskId: 2,
      taskTime: '02:02',
      taskTitle: 'kek',
      taskMsg: 'kek'
    }, {
      taskDay: '1990-01-01',
      taskId: 3,
      taskTime: '00:00',
      taskTitle: 'azaza',
      taskMsg: 'azaza'
    }],
    '1995-05-05': [{
      taskDay: '1995-05-05',
      taskId: 4,
      taskTime: '05:05',
      taskTitle: 'lul5',
      taskMsg: 'lul5'
    }, {
      taskDay: '1995-05-05',
      taskId: 5,
      taskTime: '06:06',
      taskTitle: 'kek6',
      taskMsg: 'kek6'
    }, {
      taskDay: '1995-05-05',
      taskId: 6,
      taskTime: '07:07',
      taskTitle: 'azaza7',
      taskMsg: 'azaza7'
    }],
  },
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
      const obj = {
        taskDay: inputs.taskDay.value,
        taskTime: inputs.taskTime.value,
        taskTitle: inputs.taskTitle.value,
        taskMsg: inputs.taskMsg.value
      };
      that.taskPush(obj);
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
    taskRemove() {
      elem.tasksList.addEventListener('click', (event) => {
        if (event.target.classList.contains('task__delete')) {
          that.removeFromTasks(event.target);
          that.removeElement(event.target);
        }
      });
    },
  },
  taskPush(obj) {
    const task = Object.assign({
      taskId: this.generateTaskId()
    }, obj);
    if (!this.tasks[obj.taskDay]) {
      this.tasks[obj.taskDay] = [task];
    } else {
      this.tasks[obj.taskDay].push(task);
    }
    this.taskRender(this.taskGenerate(task));
  },
  taskGenerate(obj) {
    const card = elem.taskTemplate.content.cloneNode(true).querySelector('.card');
    const taskTime = card.querySelector('.task__time');
    const taskTitle = card.querySelector('.task__header-title');
    const taskMsg = card.querySelector('.content');
    card.setAttribute('task-id', obj.taskId);
    card.setAttribute('task-date', obj.taskDay);
    taskTime.textContent = obj.taskTime;
    taskTitle.textContent = obj.taskTitle;
    taskMsg.textContent = obj.taskMsg;
    return card;
  },
  taskRender(card) {
    elem.tasksList.appendChild(card);
  },
  renderAll(date) {
    const tasks = this.tasks[date];
    for (const task of tasks) {
      this.taskRender(this.taskGenerate(task));
    }
  },
  removeFromTasks(element) {
    const card = element.closest('.card');
    const date = card.getAttribute('task-date');
    const id = card.getAttribute('task-id');
    this.tasks[date] = this.tasks[date].filter((item) => item.taskId !== Number(id));
  },
  removeElement(element) {
    element.closest('.card').remove();
  },
  removeAllElements() {
    elem.tasksList.innerHTML = '';
  },
  latestTaskId: 6,
  generateTaskId() {
    return ++this.latestTaskId;
  },
  startHandlers() {
    that = this;
    elem = this.elements;
    handl = this.handlers;

    handl.burgerHandler();
    handl.addTaskButtonHandler();
    handl.taskSpoiler();
    handl.taskRemove();
  },
};

const calendar = {
  daysList: document.querySelector('.days'),
  dayTemplate: document.querySelector('#day'),
  now() {
    return new Date();
  },
  createDate(dateStr) {
    const dateArr = dateStr.split('-');
    return new Date(dateArr[0], dateArr[2] - 1, dateArr[1]);
  },
  getCurrentDate(now) {
    const date = now ? now : this.now();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    const dateStr = date.toLocaleDateString('en-US', options);
    const dateArr = dateStr.slice(-10).split('/');
    const current = {
      weekDay: dateStr.slice(0, -12),
      day: dateArr[1],
      month: dateArr[0],
      year: dateArr[2],
      formated() {
        return `${this.year}-${this.day}-${this.month}`;
      },
    };
    return current;
  },
  getMonthDaysCount(dateStr) {
    const dateArr = dateStr.split('-');
    return new Date(dateArr[0], dateArr[2], 0).getDate();
  },
  getFirstDayWeek(dateStr) {
    const dateArr = dateStr.split('-');
    const firstDay = new Date(dateArr[0], dateArr[2] - 1, 1);
    return firstDay.toLocaleDateString('en-US', {
      weekday: 'short'
    });
  },
  renderDays() {
    const nowObj = this.getCurrentDate();
    // const prevMonth = `${nowObj.year}-01-${--W(nowObj.month)}`;
    // // const nextMonth = `${nowObj.year}-01-${++nowObj.month}`;
    // const prevMonthDays = this.getMonthDaysCount(prevMonth);
    const now = nowObj.formated();
    const dayInWeekNum = {
      Mon: 0,
      Tue: 1,
      Wed: 2,
      Thu: 3,
      Fri: 4,
      Sat: 5,
      Sun: 6,
    };
    const daysInMonth = this.getMonthDaysCount(now);
    const startRenderAt = dayInWeekNum[this.getFirstDayWeek(now)];
    for (let i = 0; i < startRenderAt; i++) {
      // this.appendDay(this.createDay(prevMonthDays - i));
      this.appendDay(this.createDay());
    }
    for (let i = 1; i <= daysInMonth; i++) {
      this.appendDay(this.createDay(i, nowObj));
    }
  },
  appendDay(element) {
    this.daysList.appendChild(element);
  },
  createDay(number, obj) {
    const dayElement = this.dayTemplate.content.cloneNode(true).querySelector('.day');
    const dayNumber = dayElement.querySelector('.day__number');

    if (number) {
      dayNumber.textContent = number;
      dayElement.setAttribute('date', `${obj.year}-${this.numberFormat(number)}-${obj.month}`);
    } else {
      dayNumber.classList.add('day__number__before', 'day__number__no-pointer');
    }

    return dayElement;
  },
  numberFormat(number) {
    return number >= 10 ? number : `0${number}`;
  },
};

document.addEventListener('DOMContentLoaded', () => {
  scheduleApp.startHandlers();
  scheduleApp.renderAll('1990-01-01');
  calendar.renderDays();
});