
#### `$.get`

This function gets the value out of something, if it gets passed an Observable or a function then by default it calls it, otherwise it just returns the value. You can also opt-out of calling plain functions, which is useful when dealing with callbacks.

Interface:

```ts
function get<T>(value: T, getFunction?: true): T extends () => infer U ? U : T;
function get<T>(
  value: T,
  getFunction: false,
): T extends ObservableReadonly<infer U> ? U : T;
```

Usage:

```ts
import $ from "reactive";

// Getting the value out of an Observable

const o = $(123);

$.get(o); // => 123

// Getting the value out of a function

$.get(() => 123); // => 123

// Getting the value out of an Observable but not out of a function

$.get(o, false); // => 123
$.get(() => 123, false); // => () => 123

// Getting the value out of a non-Observable and non-function

$.get(123); // => 123
```