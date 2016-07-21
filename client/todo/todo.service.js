(function () {
  angular.module('todoService', [])
  .factory('todoService', todoService);

  function todoService() {
    return {
      get: get,
      put: put,
      getSortDirection: getSortDirection,
      setSortDirection: setSortDirection
    };

    function get() {
      return JSON.parse(localStorage.getItem('todos-collection') || '[]');
    }

    function put(todos) {
      localStorage.setItem('todos-collection', JSON.stringify(todos));
    }

    function getSortDirection() {
      return JSON.parse(localStorage.getItem('sort-direction') || false);
    }

    function setSortDirection(direction) {
      localStorage.setItem('sort-direction', JSON.stringify(direction));
    }

  };
})();