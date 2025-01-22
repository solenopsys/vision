
#### `$.effect`

An effect is similar to a memo, but it returns a function for manually disposing of it instead of an Observable, and if you return a function from inside it that's automatically registered as a cleanup function.

Also effects are asynchronous by default, they will be re-executed automatically on the next microtask, when necessary. It's possible to make an effect synchronous also, but you are strongly discouraged to do that, because synchronous effects bypass any form of batching and are easy to misuse. It's also possible to make an effect that's asynchronous but executed immediately when created, that's way less problematic, but you probably still won't need it.

Also effects can be paused inside a `$.suspense` boundary by default. It's possible to make an effect that won't be paused inside a `$.suspense` boundary also, which is mostly useful if the effect is synchronous also, but you are discouraged to do that, unless you really need that.

There are no restrictions, you can nest these freely, create new Observables inside them, whatever you want.

- **Note**: Effects are intended for encapsulating functions that interact with the outside world, or for writing to Observables in response to a user input, which is strongly discouraged to do inside memos instead.

Interface:

```ts
type EffectOptions = {
  suspense?: boolean;
  sync?: boolean;
};

function effect(
  fn: () => (() => void) | void,
  options?: EffectOptions,
): () => void;
```

Usage:

```ts
import $ from "reactive";

// Create an asynchronous effect with an automatically registered cleanup function

const callback = $(() => {});

$.effect(() => {
  const cb = callback();

  document.body.addEventListener("click", cb);

  return () => {
    // Automatically-registered cleanup function

    document.body.removeEventListener("click", cb);
  };
});

// Creating a synchronous effect, which is executed and re-executed immediately when needed

$.effect(
  () => {
    // Do something...
  },
  { sync: true },
);

// Creating an asynchronous effect, but that is executed immediately on creation

$.effect(
  () => {
    // Do something...
  },
  { sync: "init" },
);

// Creating an effect that will not be paused by suspense

$.effect(
  () => {
    // Do something...
  },
  { suspense: false },
);
```

