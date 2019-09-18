'use strict';

const droddel = function(fn) {
  if (!fn) {
    throw new Error('Function is missing');
  }

  let promise;

  const throtteledFn = function() {
    return new Promise((resolve, reject) => {
      if (!promise) {
        promise = fn();
      }

      promise
        .then((result) => {
          promise = undefined;
          resolve(result);
        })
        .catch((err) => {
          promise = undefined;
          reject(err);
        });
    });
  };

  return throtteledFn;
};

module.exports = droddel;
