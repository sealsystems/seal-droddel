# @sealsystems/droddel

[![CircleCI](https://circleci.com/gh/sealsystems/node-droddel.svg?style=svg)](https://circleci.com/gh/sealsystems/node-droddel)
[![AppVeyor](https://ci.appveyor.com/api/projects/status/v61t9v04d4q32oo4?svg=true)](https://ci.appveyor.com/project/Plossys/node-droddel)

Serialize asynchronous calls.

## Installation

```bash
$ npm install @sealsystems/droddel
```

## Quick start

First you need to add a reference to seal-droddel within your application.

```javascript
const droddel = require('@sealsystems/droddel');
```

To actually throttle a function, call `droddel` and hand over the function that shall be throttled.

E.g., if you want to serialize read access to a file, hand over a function that does the actual reading and returns its result as a promise:

```javascript
const readFile = util.promisify(fs.readFile);

const throttledRead = droddel(
  async () => await readFile('/etc/passwd'));
```

To then read the file, simply call `throttledRead`:

```javascript
const result = await throttledRead();
```

If you call `throttledRead` while it is already being run, the new call gets delayed.

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```bash
$ bot
```
