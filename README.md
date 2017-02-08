# seal-droddel

[![CircleCI](https://circleci.com/gh/sealsystems/seal-droddel.svg?style=svg)](https://circleci.com/gh/sealsystems/seal-droddel)
[![AppVeyor](https://ci.appveyor.com/api/projects/status/9tmhr4nt442rkvjy?svg=true)](https://ci.appveyor.com/project/Plossys/seal-droddel)

Serialize asynchronous calls.

## Installation

```bash
$ npm install seal-droddel
```

## Quick start

First you need to add a reference to seal-droddel within your application.

```javascript
const droddel = require('seal-droddel');
```

To actually throttle a function, call `droddel` and hand over the function
that shall be throttled.

E.g., if you want to serialize read access to a file, hand over a function
that does the actual `fs.readFile` call and return its result using a
callback:

```javascript
const throttledRead = droddel((callback) => {
  fs.readFile('/etc/passwd', callback);
});
```

To then read the file, simply call `throttledRead`:

```javascript
throttledRead((err, data) => {
  // ...
});
```

If you call `throttledRead` while it is already being run, the new call gets
delayed.

## Referencing this

If you need to access `this` from within the function that shall be
throttled, call the `throttledRead` function using `call` and provide the
object that you want to use as `this`.

E.g., if you want to preserve the outer `this`, simply hand it over:

```javascript
throttledRead.call(this, (err, data) => {
  // ...
});
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```bash
$ bot
```
