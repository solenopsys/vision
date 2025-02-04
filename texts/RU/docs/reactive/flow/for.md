#### `$.for`

This is the reactive version of the native `Array.prototype.map`, it maps over an array of values while caching results when possible.

This function is crucial for achieving great performance when mapping over an array, as just calling `Array.prototype.map` inside a memo can be super expensive.

There are multiple strategies that this function may use internally for caching results:

- **Keyed**: with the default options results are cached for values that didn't change, and thrown away when those values are no longer used. So for example when going from mapping over `[1, 2, 3]` to mapping over `[1, 2, 4]` the results for `1` and `2` are entirely cached, the old result for `3` is discarded, and an entirely new result for `4` is created. This is the easiest and safest strategy to use (especially in a DOM context, read [this](https://www.stefankrause.net/wp/?p=342) for more info). It's strongly recommended that the array of values to map over doesn't contain dulicates though.
- **Unkeyed**: with the `unkeyed` option set to `true` results are cached for values that didn't change, and results for old values are transformed into results for new values, if possibile, or otherwise thrown away. So for example when going from mapping over `[1, 2, 3]` to mapping over `[1, 2, 4]` the results for `1` and `2` are entirely cached, and the result for `3` is transformed into the result for `4`. Basically the function that you pass `$.for` receives an observable to the value rather than the value itself, so it can update itself, it's no longer necessary to dispose of the old result and make an entirely new result. This option is the recommended one if your array may contain duplicated primitive values, or if you want to achieve maximum performance, though it's harder to use because you will receive an observable to the value rather than the value itself, and it can be easy to misuse (especially in a DOM context, read [this](https://www.stefankrause.net/wp/?p=342) for more info).
- **Unkeyed+Pooled**: with both `unkeyed` set to `true`, and `pooled` set to `true` results are cached not only between runs, but they are also put in a suspended pool when not currently used. This is useful to trade some memory usage for potentially better runtime performance.

Interface:

```ts
function for <T, R, F> ( values: (() => readonly T[]) | readonly T[] | undefined, fn: (( value: T, index: FunctionMaybe<number> ) => R), fallback?: F | [], options?: { pooled?: false, unkeyed?: false } ): ObservableReadonly<R[] | F>;
function for <T, R, F> ( values: (() => readonly T[]) | readonly T[] | undefined, fn: (( value: ObservableReadonly<T>, index: FunctionMaybe<number> ) => R), fallback?: F | [], options?: { pooled?: boolean, unkeyed?: true } ): ObservableReadonly<R[] | F>;
```

Usage:

```ts
import $ from "reactive";

// Map over an array of values

const o1 = $(1);
const o2 = $(2);
const os = $([o1, o2]);

const mapped = $.for(os, (o) => {
  return someExpensiveFunction(o());
});

// Update the "mapped" Observable

os([o1, o2, o3]);
```