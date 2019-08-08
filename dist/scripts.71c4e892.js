// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/scripts/index.js":[function(require,module,exports) {
'use strict';

var that, elem, handl;
var scheduleApp = {
  tasks: {
    '1990-01-01': [{
      taskDay: '1990-01-01',
      taskId: 1,
      taskTime: '01:01',
      taskTitle: 'lul',
      taskMsg: 'lul'
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
    }]
  },
  elements: {
    burger: document.querySelector('.navbar-burger'),
    navBar: document.querySelector('#navbarSchedule'),
    form: document.querySelector('.form'),
    addTaskButton: document.querySelector('.add__task'),
    tasksList: document.querySelector('.tasks'),
    taskTemplate: document.querySelector('#task-template')
  },
  handlers: {
    burgerHandler: function burgerHandler() {
      elem.burger.addEventListener('click', function () {
        elem.burger.classList.toggle('is-active');
        elem.navBar.classList.toggle('is-active');
      });
    },
    addTaskButtonHandler: function addTaskButtonHandler() {
      elem.addTaskButton.addEventListener('click', handl.openForm);
    },
    openForm: function openForm() {
      elem.form.classList.add('form_opened');
      elem.addTaskButton.removeEventListener('click', handl.openForm);
      elem.addTaskButton.addEventListener('click', handl.closeForm);
      elem.form.addEventListener('submit', handl.formSubmit);
      handl.buttonChange(true);
    },
    closeForm: function closeForm() {
      elem.form.classList.remove('form_opened');
      elem.addTaskButton.removeEventListener('click', handl.closeForm);
      elem.addTaskButton.addEventListener('click', handl.openForm);
      elem.form.removeEventListener('submit', handl.formSubmit);
      handl.buttonChange();
    },
    buttonChange: function buttonChange(opened) {
      elem.addTaskButton.textContent = opened ? 'Close Form' : 'Add Task';
    },
    formSubmit: function formSubmit() {
      var inputs = document.forms.addTask.elements;
      event.preventDefault();
      var obj = {
        taskDay: inputs.taskDay.value,
        taskTime: inputs.taskTime.value,
        taskTitle: inputs.taskTitle.value,
        taskMsg: inputs.taskMsg.value
      };
      that.taskPush(obj);
    },
    taskSpoiler: function taskSpoiler() {
      elem.tasksList.addEventListener('click', function (event) {
        if (event.target.classList.contains('task__spoiler')) {
          var card = event.target.closest('.task');
          var footer = card.querySelector('.task__footer');
          footer.classList.toggle('visible');
        }
      });
    },
    taskRemove: function taskRemove() {
      elem.tasksList.addEventListener('click', function (event) {
        if (event.target.classList.contains('task__delete')) {
          that.removeFromTasks(event.target);
          that.removeElement(event.target);
        }
      });
    }
  },
  taskPush: function taskPush(obj) {
    var task = Object.assign({
      taskId: this.generateTaskId()
    }, obj);

    if (!this.tasks[obj.taskDay]) {
      this.tasks[obj.taskDay] = [task];
    } else {
      this.tasks[obj.taskDay].push(task);
    }

    this.taskRender(this.taskGenerate(task));
  },
  taskGenerate: function taskGenerate(obj) {
    var card = elem.taskTemplate.content.cloneNode(true).querySelector('.card');
    var taskTime = card.querySelector('.task__time');
    var taskTitle = card.querySelector('.task__header-title');
    var taskMsg = card.querySelector('.content');
    card.setAttribute('task-id', obj.taskId);
    card.setAttribute('task-date', obj.taskDay);
    taskTime.textContent = obj.taskTime;
    taskTitle.textContent = obj.taskTitle;
    taskMsg.textContent = obj.taskMsg;
    return card;
  },
  taskRender: function taskRender(card) {
    elem.tasksList.appendChild(card);
  },
  renderAll: function renderAll(date) {
    var tasks = this.tasks[date];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = tasks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var task = _step.value;
        this.taskRender(this.taskGenerate(task));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  },
  removeFromTasks: function removeFromTasks(element) {
    var card = element.closest('.card');
    var date = card.getAttribute('task-date');
    var id = card.getAttribute('task-id');
    this.tasks[date] = this.tasks[date].filter(function (item) {
      return item.taskId !== Number(id);
    });
  },
  removeElement: function removeElement(element) {
    element.closest('.card').remove();
  },
  removeAllElements: function removeAllElements() {
    elem.tasksList.innerHTML = '';
  },
  latestTaskId: 6,
  generateTaskId: function generateTaskId() {
    return ++this.latestTaskId;
  },
  startHandlers: function startHandlers() {
    that = this;
    elem = this.elements;
    handl = this.handlers;
    handl.burgerHandler();
    handl.addTaskButtonHandler();
    handl.taskSpoiler();
    handl.taskRemove();
  }
};
var calendar = {
  daysList: document.querySelector('.days'),
  dayTemplate: document.querySelector('#day'),
  now: function now() {
    return new Date();
  },
  createDate: function createDate(dateStr) {
    var dateArr = dateStr.split('-');
    return new Date(dateArr[0], dateArr[2] - 1, dateArr[1]);
  },
  getCurrentDate: function getCurrentDate(now) {
    var date = now ? now : this.now();
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    var dateStr = date.toLocaleDateString('en-US', options);
    var dateArr = dateStr.slice(-10).split('/');
    var current = {
      weekDay: dateStr.slice(0, -12),
      day: dateArr[1],
      month: dateArr[0],
      year: dateArr[2],
      formated: function formated() {
        return "".concat(this.year, "-").concat(this.day, "-").concat(this.month);
      }
    };
    return current;
  },
  getMonthDaysCount: function getMonthDaysCount(dateStr) {
    var dateArr = dateStr.split('-');
    return new Date(dateArr[0], dateArr[2], 0).getDate();
  },
  getFirstDayWeek: function getFirstDayWeek(dateStr) {
    var dateArr = dateStr.split('-');
    var firstDay = new Date(dateArr[0], dateArr[2] - 1, 1);
    return firstDay.toLocaleDateString('en-US', {
      weekday: 'short'
    });
  },
  renderDays: function renderDays() {
    var nowObj = this.getCurrentDate(); // const prevMonth = `${nowObj.year}-01-${--W(nowObj.month)}`;
    // // const nextMonth = `${nowObj.year}-01-${++nowObj.month}`;
    // const prevMonthDays = this.getMonthDaysCount(prevMonth);

    var now = nowObj.formated();
    var dayInWeekNum = {
      Mon: 0,
      Tue: 1,
      Wed: 2,
      Thu: 3,
      Fri: 4,
      Sat: 5,
      Sun: 6
    };
    var daysInMonth = this.getMonthDaysCount(now);
    var startRenderAt = dayInWeekNum[this.getFirstDayWeek(now)];

    for (var i = 0; i < startRenderAt; i++) {
      // this.appendDay(this.createDay(prevMonthDays - i));
      this.appendDay(this.createDay());
    }

    for (var _i = 1; _i <= daysInMonth; _i++) {
      this.appendDay(this.createDay(_i, nowObj));
    }
  },
  appendDay: function appendDay(element) {
    this.daysList.appendChild(element);
  },
  createDay: function createDay(number, obj) {
    var dayElement = this.dayTemplate.content.cloneNode(true).querySelector('.day');
    var dayNumber = dayElement.querySelector('.day__number');

    if (number) {
      dayNumber.textContent = number;
      dayElement.setAttribute('date', "".concat(obj.year, "-").concat(this.numberFormat(number), "-").concat(obj.month));
    } else {
      dayNumber.classList.add('day__number__before', 'day__number__no-pointer');
    }

    return dayElement;
  },
  numberFormat: function numberFormat(number) {
    return number >= 10 ? number : "0".concat(number);
  }
};
document.addEventListener('DOMContentLoaded', function () {
  scheduleApp.startHandlers();
  scheduleApp.renderAll('1990-01-01');
  calendar.renderDays();
});
},{}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "36755" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","assets/scripts/index.js"], null)
//# sourceMappingURL=/scripts.71c4e892.js.map