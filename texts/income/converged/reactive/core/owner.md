#### `$.owner`

This function tells you some metadata about the current owner/observer. There's always an owner.

- **Note**: This is an advanced function intended mostly for internal usage, you almost certainly don't have a use case for using this function.

Interface:

```ts
type Owner = {
  isSuperRoot: boolean; // This tells you if the nearest owner of your current code is a super root, which is kind of a default root that everything gets wrapped with
  isRoot: boolean; // This tells you if the nearest owner of your current code is a root
  isSuspense: boolean; // This tells you if the nearest owner of your current code is a suspense
  isComputation: boolean; // This tells you if the nearest owner of your current code is an effect or a memo
};

function owner(): Owner;
```

Usage:

```ts
import $ from "reactive";

// Check if you are right below the super root or an effect

$.owner().isSuperRoot; // => true
$.owner().isComputation; // => false

$.effect(() => {
  $.owner().isSuperRoot; // => false
  $.owner().isComputation; // => true
});
```