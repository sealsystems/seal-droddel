'use strict';

const droddel = function (fn) {
  if (!fn) {
    throw new Error('Function is missing');
  }

  const queue = [];

  const run = function () {
    fn.call(this, function () {
      const args = arguments;

      while (queue.length > 0) {
        queue.shift().apply(this, args);
      }
    });
  };

  const runner = function (callback) {
    queue.push(callback);
    if (queue.length > 1) {
      return;
    }

    run.call(this);
  };

  return runner;
};

module.exports = droddel;
