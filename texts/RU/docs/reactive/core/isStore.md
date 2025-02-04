#### `$.isStore`

This function allows you to tell apart Stores from other values.

- **Note**: This function is intended mostly for internal usage, in user code it's almost always better to not treat objects differently if they are stores or not, you can just treat them the same way and let the reactive system react to changes when needed.

Interface:

```ts
function isStore(value: unknown): boolean;
```

Usage:

```ts
import $ from "reactive";

// Checking

$.isStore($.store({})); // => true
$.isStore({}); // => false
```
