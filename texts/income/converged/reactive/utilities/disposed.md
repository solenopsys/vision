#### `$.disposed`

This function returns a read-only Observable that tells you if the parent computation got disposed of or not.

Interface:

```ts
function disposed(): ObservableReadonly<boolean>;
```

Usage:

```ts
import $ from "reactive";

// Create an effect whose function knows when it's disposed

const url = $("htts://my.api");

$.effect(() => {
  const disposed = $.disposed();

  const onResolve = (response: Response): void => {
    if (disposed()) return; // The effect got disposed, no need to handle the response anymore

    // Do something with the response
  };

  const onReject = (error: unknown): void => {
    if (disposed()) return; // The effect got disposed, no need to handle the error anymore

    // Do something with the error
  };

  fetch(url()).then(onResolve, onReject);
});

await nextTask(); // Giving the effect a chance to run

url("https://my.api2"); // This causes the effect to be re-executed, and the previous `disposed` Observable will be set to `true`
```