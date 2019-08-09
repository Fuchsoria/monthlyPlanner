'use strict';

let main, elem, handl;

const calendar = {
  daysList: document.querySelector('.days'),
  dayTemplate: document.querySelector('#day'),
  now() {
    return new Date();
  },
  createDate(dateStr) {
    const dateArr = dateStr.split('-');
    return new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
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
        return `${this.year}-${this.month}-${this.day}`;
      },
    };
    return current;
  },
  getMonthDaysCount(dateStr) {
    const dateArr = dateStr.split('-');
    return new Date(dateArr[0], dateArr[1], 0).getDate();
  },
  getFirstDayWeek(dateStr) {
    const dateArr = dateStr.split('-');
    const firstDay = new Date(dateArr[0], dateArr[1] - 1, 1);
    return firstDay.toLocaleDateString('en-US', {
      weekday: 'short'
    });
  },
  getTitleDate(date) {
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };
    const dateStr = date.toLocaleDateString('en-US', options);
    const dateArr = dateStr.replace(/,/gi, '').split(' ');
    const dateObj = {
      weekDay: dateArr[0],
      day: dateArr[2],
      month: dateArr[1],
    };
    return dateObj;
  },
  renderDays() {
    const nowObj = this.getCurrentDate();

    const prevMonth = `${nowObj.year}-${--Object.assign({}, nowObj).month}-01`;
    // const nextMonth = `${nowObj.year}-${++Object.assign({}, nowObj).month}-01`;
    const prevMonthDays = this.getMonthDaysCount(prevMonth);
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
    for (let i = startRenderAt - 1; i >= 0; i--) {
      this.appendDay(this.createDay(prevMonthDays - i));
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
    dayNumber.textContent = number;
    if (obj) {
      dayElement.setAttribute('date', `${obj.year}-${obj.month}-${this.numberFormat(number)}`);
    } else {
      dayNumber.classList.add('day__number__before', 'day__number__no-pointer');
    }

    return dayElement;
  },
  numberFormat(number) {
    return number >= 10 ? number : `0${number}`;
  },
};

const scheduleApp = {
  tasks: {
    '2019-08-15': [{
      taskDay: '2019-08-15',
      taskId: 1,
      taskTime: '01:01',
      taskTitle: 'lul',
      taskMsg: 'lul',
    }, {
      taskDay: '2019-08-15',
      taskId: 2,
      taskTime: '02:02',
      taskTitle: 'kek',
      taskMsg: 'kek'
    }, {
      taskDay: '2019-08-15',
      taskId: 3,
      taskTime: '00:00',
      taskTitle: 'azaza',
      taskMsg: 'azaza'
    }],
    '2019-08-31': [{
      taskDay: '2019-08-31',
      taskId: 4,
      taskTime: '05:05',
      taskTitle: 'lul5',
      taskMsg: 'lul5'
    }, {
      taskDay: '2019-08-31',
      taskId: 5,
      taskTime: '06:06',
      taskTitle: 'kek6',
      taskMsg: 'kek6'
    }, {
      taskDay: '2019-08-31',
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
    formResetButton: document.querySelector('.form__reset-button'),
    addTaskButton: document.querySelector('.add__task'),
    tasksList: document.querySelector('.tasks'),
    taskTemplate: document.querySelector('#task-template'),
    daysList: document.querySelector('.days'),
    tasksTitle: document.querySelector('.tasks__title'),
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
      elem.form.reset();
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
      main.taskPush(obj);
      if (main.currentDay === obj.taskDay) {
        main.removeAllElements();
        main.renderAll(obj.taskDay);
        handl.tasksTitleUpdate(obj.taskDay, true);
      }
      handl.closeForm();
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
          main.removeFromTasks(event.target);
          main.removeElement(event.target);
          handl.daysStatusUpdate();
        }
      });
    },
    currentDay: '',
    daysHandler() {
      elem.daysList.addEventListener('click', (event) => {
        if (event.target.classList.contains('day__number') &&
          !event.target.classList.contains('day__number__before')) {
          const day = event.target.closest('.day');
          const date = day.getAttribute('date');
          main.removeAllElements();
          main.renderAll(date);
          main.currentDay = date;
          const dateExist = main.tasks[date];
          if (dateExist && dateExist.length > 0) {
            handl.tasksTitleUpdate(date, true);
          } else {
            handl.tasksTitleUpdate(date, false);
          }
        }
      });
    },
    daysStatusUpdate() {
      [...elem.daysList.children].forEach((item) => {
        const dayNumber = item.querySelector('.day__number');
        // const date = item.getAttribute('date');
        const dateExist = main.tasks[item.getAttribute('date')];
        if (dateExist && dateExist.length > 0) {
          dayNumber.classList.add('day__number__has');
        } else if (dateExist && dateExist.length === 0) {
          dayNumber.classList.remove('day__number__has');
        } else {
          dayNumber.classList.remove('day__number__has');
        }
      });
    },
    tasksTitleUpdate(date, exist) {
      const dateObj = calendar.getTitleDate(calendar.createDate(date));
      if (exist) {
        elem.tasksTitle.textContent =
          `Your Tasks on ${dateObj.weekDay} ${dateObj.day} ${dateObj.month}`;
      } else {
        elem.tasksTitle.textContent =
          `You have no tasks on ${dateObj.weekDay} ${dateObj.day} ${dateObj.month}`;
      }
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
    handl.daysStatusUpdate();
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
    if (this.tasks[date]) {
      const tasks = this.tasks[date];
      for (const task of tasks) {
        this.taskRender(this.taskGenerate(task));
      }
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
    main = this;
    elem = this.elements;
    handl = this.handlers;

    handl.burgerHandler();
    handl.addTaskButtonHandler();
    handl.taskSpoiler();
    handl.taskRemove();
    handl.daysHandler();
    handl.daysStatusUpdate();
  },
};



document.addEventListener('DOMContentLoaded', () => {
  calendar.renderDays();
  scheduleApp.startHandlers();
});