'use strict';

const assert = require('assertthat');

const droddel = require('../lib/droddel');

suite('droddel', () => {
  test('is a function', (done) => {
    assert.that(droddel).is.ofType('function');
    done();
  });

  test('throws an error if function is missing', (done) => {
    assert.that(() => {
      droddel();
    }).is.throwing('Function is missing');
    done();
  });

  test('calls the given function', (done) => {
    const droddelFct = droddel((callback) => {
      callback(null, 'result');
    });

    droddelFct((err, result) => {
      assert.that(err).is.null();
      assert.that(result).is.equalTo('result');
      done();
    });
  });

  test('calls the given callbacks sequentially after calling function', (done) => {
    const startTime = Date.now();
    const droddelFct = droddel((callback) => {
      setTimeout(() => {
        callback(null, Date.now());
      }, 100);
    });

    let i = 0;

    droddelFct((err, result) => {
      assert.that(i++).is.equalTo(0);
      assert.that(err).is.null();
      assert.that(result - startTime).is.greaterThan(90);
    });

    droddelFct((err, result) => {
      assert.that(i++).is.equalTo(1);
      assert.that(err).is.null();
      assert.that(result - startTime).is.greaterThan(90);
      done();
    });
    assert.that(i).is.equalTo(0);
  });

  test('returns error if processing failed', (done) => {
    const droddelFct = droddel((callback) => {
      callback(new Error('gehd ned'));
    });

    droddelFct((err) => {
      assert.that(err).is.not.null();
      assert.that(err.message).is.equalTo('gehd ned');
      done();
    });
  });

  test('calls the given function in a context', (done) => {
    const context = {
      result: 'mid kondexd'
    };
    const droddelFct = droddel(function (callback) {
      callback(null, this.result);
    });

    droddelFct.call(context, (err, result) => {
      assert.that(err).is.null();
      assert.that(result).is.equalTo(context.result);
      done();
    });
  });
});
