#### `$.memo`

This is the function where most of the magic happens, it generates a new read-only Observable with the result of the function passed to it, the function is automatically marked as stale whenever its dependencies change, and its dependencies are tracked automatically. The value of the Observable is refreshed, if needed, by re-executing the memo when you ask the returned Observale for its current value, by calling it, or when any other computation depends on this memo.

Memos are asynchronous by default, they will be re-executed automatically only when/if needed. It's possible to make a memo synchronous also, but you are strongly discouraged to do that, because synchronous memos can use over-executions and are easy to misuse. Though in some edge cases they could have their usefulness, hence why they are supported.

Usually you can just pass a plain function around, in those cases the only thing you'll get out of `$.memo` is memoization, which is a performance optimization, hence the name.

There are no restrictions, you can nest these freely, create new Observables inside them, whatever you want.

- **Note**: The provided function is expected to be pure. For side effects, including for writing to other Observables, you should use `$.effect` instead.

Interface:

```ts
function memo<T>(fn: () => T, options?: MemoOptions<T>): ObservableReadonly<T>;
```

Usage:

```ts
import $ from "reactive";

// Make a new memoized Observable

const a = $(1);
const b = $(2);
const c = $(3);

const sum = $.memo(() => {
  return a() + b() + c();
});

sum(); // => 6

a(2);

sum(); // => 7

b(3);

sum(); // => 8

c(4);

sum(); // => 9

// Make a new synchronous memo, which is executed and re-executed immediately when needed

const sumSync = $.memo(
  () => {
    return a() + b() + c();
  },
  { sync: true },
);
```

