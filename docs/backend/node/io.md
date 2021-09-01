# IO

```js
var glob = require("glob");

const options = {};

let result = null;

// console.time('glob');
// result = glob.sync(__dirname + '/**/**')
// console.timeEnd('glob');

// console.log(result, result.length);
// // glob: 18.128ms

console.time("glob");
glob(__dirname + "/**/*", function(er, files) {
  result = files;
  // console.log(result, result.length)
  console.log("got result");
});
console.timeEnd("glob");
console.log(1 + 1);
```
