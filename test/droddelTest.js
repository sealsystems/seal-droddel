'use strict';

const assert = require('assertthat');

const droddel = require('../lib/droddel');

const sleep = function (ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

suite('droddel', () => {
  test('is a function', async () => {
    assert.that(droddel).is.ofType('function');
  });

  test('throws an error if function is missing', async () => {
    assert.that(() => {
      droddel();
    }).is.throwing('Function is missing');
  });

  test('calls the given function', async () => {
    let fnCalled = 0;

    const droddelFct = droddel(async () => {
      await sleep(10);

      fnCalled++;

      return fnCalled;
    });

    const [result1, result2] = await Promise.all([droddelFct(), droddelFct()]);

    assert.that(result1).is.equalTo(1);
    assert.that(result2).is.equalTo(1);
  });

  test('returns error if processing failed', async () => {
    const droddelFct = droddel(async () => {
      throw new Error('gehd ned');
    });

    await assert.that(async () => {
      await droddelFct();
    }).is.throwingAsync('gehd ned');
  });
});
