#### `$.batch`

Synchronous calls to Observables' setters are batched automatically for you, so unless you explicitly call a memo, or you explicitly use a synchronous effect, no computations will be re-executed until the next microtask, providing you with a pretty convenient performance guarantee. So 99.9% of the time you don't really have think about batching updates at all.

Asynchronous calls to Observable's setters though are not batched automatically, so in the niche use case where you want to pause re-executions of effects for an arbitrary period of time, until the provided function resolves, that's when you will want to use this function.

- **Note**: Calling this function with a function that doesn't return a Promise is pointless, but that's supported for convenience too, it will just not do anything special.
- **Note**: This is an advanced function that you may very well never need to call, and at most may just improve performance in some edge cases.

Interface:

```ts
function batch<T>(fn: () => Promise<T> | T): Promise<Awaited<T>>;
function batch<T>(fn: T): Promise<Awaited<T>>;
```

Usage:

```ts
import $ from "reactive";

// Batch updates until the provided async function resolves

const o = $(0);

$.effect(() => {
  console.log(o());
});

$.batch(async () => {
  o(1);
  o(2);
  o(3);

  // Here the effect has not been called yet, because setters were called synchronously
  // Even without explicitly batching, synchronous calls to setters will be batched for you automatically

  await someAsyncAction();

  // Here the effect has still not been called, because we are explicitly batching on an async function
  // Without batching the effect would have been called by now
});
```