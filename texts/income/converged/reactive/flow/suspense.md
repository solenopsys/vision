#### `$.suspense`

This function allows you to recursively pause and resume the execution of all, current and future, effects created inside it. Unless they are explicitly created with `suspense: false`.

This is very useful in some scenarios, for example you may want to keep a particular branch of computation around, if it'd be expensive to dispose of it and re-create it again, but you may not want its effects to be executing as they would probably interact with the rest of your application.

A parent suspense boundary will also recursively pause children suspense boundaries.

Interface:

```ts
function suspense<T>(suspended: FunctionMaybe<unknown>, fn: () => T): T;
```

Usage:

```ts
import $ from "reactive";

// Create a suspendable branch of computation

const title = $("Some Title");
const suspended = $(false);

$.suspense(suspended, () => {
  $.effect(() => {
    document.title = title(); // Changing something in the outside world, in other words performing a side effect
  });
});

// Pausing effects inside the suspense boundary

suspended(true);

title("Some Other Title"); // This won't cause the effect to be re-executed, since it's paused

// Resuming effects inside the suspense boundary

suspended(false); // This will cause the effect to be re-executed, as it had pending updates
```