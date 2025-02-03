#### `$.suspended`

This function returns a read-only Observable that tells you if the closest suspense boundary is currently suspended or not.

You may never need this function, but it's useful to pause or skip the execution of effectfull code scheduled outside of effects while suspense is active, since you shouldn't execute any side effects while the computation you are on is suspended, and in general you want suspended computations to stay as idle as possible.

Interface:

```ts
function suspended(): ObservableReadonly<boolean>;
```

Usage:

```ts
import { $ } from "reactive";

// Scheduling an interval that won't be executed while the nearest suspense boundary is suspended

const suspended = $.suspended();

$.effect(
  () => {
    if (suspended()) return; // Do nothing while suspended

    const intervalId = setInterval(doSomething, 1000);

    return () => {
      clearInterval(intervalId);
    };
  },
  { suspense: false },
);
```