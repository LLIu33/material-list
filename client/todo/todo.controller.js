(function(){

  angular.module('todoController', [])
  .controller('todoController', todoController);

  todoController.$inject = ['todoService', '$mdSidenav', '$mdBottomSheet', '$timeout', '$log'];

  function todoController( todoService, $mdSidenav, $mdBottomSheet, $timeout, $log ) {
    var todoCtrl = this;

    todoCtrl.todoList = [];
    todoCtrl.sortDir = false;
    todoCtrl.saveState = saveState;
    todoCtrl.todoAdd = todoAdd;
    todoCtrl.removeSelected = removeSelected;
    todoCtrl.remove = remove;

    init();

    function init() {
      todoCtrl.todoList = todoService.get();
      todoCtrl.sortDir = todoService.getSortDirection();
    }

    function saveState() {
      todoService.setSortDirection(todoCtrl.sortDir);
    }

    function todoAdd() {
      todoCtrl.todoInput = todoCtrl.todoInput.trim();
      if (todoCtrl.todoInput === 0) {
        return;
      }

      if (nameExist(todoCtrl.todoInput)) {
        return;
      }

      todoCtrl.todoList.push({
        name: todoCtrl.todoInput,
        done: false
      });
      todoCtrl.todoInput = "";
      todoService.put(todoCtrl.todoList);
    }

    function removeSelected() {
      var oldList = todoCtrl.todoList;
      todoCtrl.todoList = [];
      angular.forEach(oldList, function(x) {
        if (!x.done) todoCtrl.todoList.push(x);
      });
      todoService.put(todoCtrl.todoList);
    }

    function remove(name) {
      var oldList = todoCtrl.todoList;
      todoCtrl.todoList = [];
      angular.forEach(oldList, function(x) {
        if (x.name !== name ) todoCtrl.todoList.push(x);
      });
      todoService.put(todoCtrl.todoList);
    };

    function nameExist(name) {
      var result = false;
      angular.forEach(todoCtrl.todoList, function(x) {
        if (x.name === todoCtrl.todoInput ) {
          result = true;
        }
      });
      return result;
    }
  }

})();