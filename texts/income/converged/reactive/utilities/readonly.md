#### `$.readonly`

This function makes a read-only Observable out of any Observable you pass it. It's useful when you want to pass an Observable around but you want to be sure that they can't change it's value but only read it.

Interface:

```ts
function readonly<T>(
  observable: Observable<T> | ObservableReadonly<T>,
): ObservableReadonly<T>;
```

Usage:

```ts
import $ from "reactive";

// Making a read-only Observable

const o = $(123);
const ro = $.readonly(o);

// Getting

ro(); // => 123

// Setting throws

ro(321); // An error will be thrown, read-only Observables can't be set
```
