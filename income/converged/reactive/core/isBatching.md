#### `$.isBatching`

This function tells you if explicit batching is currently active, or if there are any effects currently scheduled for execution via other means.

- **Note**: This is an advanced function that you may very well never need to call.

Interface:

```ts
function isBatching(): boolean;
```

Usage:

```ts
import $ from "reactive";

// Checking if currently batching

$.isBatching(); // => false

await $.batch(async () => {
  $.isBatching(); // => true
});

$.isBatching(); // => false
```
