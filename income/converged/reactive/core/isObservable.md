
#### `$.isObservable`

This function allows you to tell apart Observables from other values.

- **Note**: This function is intended mostly for internal usage, in user code you'll almost always want to unwrap whatever value you get with `$.get` instead, abstracting away the checks needed for understanding if something is an Observable or not.

Interface:

```ts
function isObservable<T = unknown>(
  value: unknown,
): value is Observable<T> | ObservableReadonly<T>;
```

Usage:

```ts
import $ from "reactive";

// Checking

$.isObservable($()); // => true
$.isObservable({}); // => false
```





