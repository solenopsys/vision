
#### `$.observable`

This is just an alias for the `$` function, without all the extra functions attached to it, for better tree-shaking.

Usage:

```ts
import { observable } from "reactive";

// Creating an Observable

const o = observable(1);

// Getter

o(); // => 1

// Setter

o(2); // => 2

// Setter via a function, which gets called with the current value

o((value) => value + 1); // => 3
```
