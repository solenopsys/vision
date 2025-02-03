#### `$.selector`

This function is useful for optimizing performance when you need to, for example, know when an item within a set is the selected one.

If you use this function then when a new item should be the selected one the old one is unselected, and the new one is selected, directly, without checking if each element in the set is the currently selected one. This turns a `O(n)` operation into an `O(1)` one.

Interface:

```ts
type SelectorFunction<T> = (value: T) => ObservableReadonly<boolean>;

function selector<T>(source: () => T): SelectorFunction<T>;
```

Usage:

```ts
import $ from "reactive";

// Making a selector

const values = [1, 2, 3, 4, 5];
const selected = $(-1);

const select = (value) => selected(value);
const selector = $.selector(selected);

values.forEach((value) => {
  $.effect(() => {
    const selected = selector(value);

    if (selected()) return;

    console.log(`${value} selected!`);
  });
});

await nextTask(); // Giving the effects a chance to run

select(1); // It causes only 2 effect to re-execute, not 5 or however many there are

await nextTask(); // Giving the effects a chance to run

select(5); // It causes only 2 effect to re-execute, not 5 or however many there are
```
