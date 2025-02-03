#### `JSX`

JSX is supported out of the box, as a rule of thumb it's very similar to how React's JSX works, but with some differences.

- The value provided to an attribute can always be either just the plain value itself, an observable to that value, or a function to that value. If an observable or a function is provided then that attribute will update itself in a fine-grained manner.
- There's no "key" attribute because it's unnecessary.
- Only refs in the function form are supported, so you are incentivized to simply use observables for them too.
- The "ref" attribute can also accept an array of functions to call, for convenience.
- Refs are called on the next microtask, making it so the node you'll get will probably be attached to the DOM already. For getting a more immediate reference you can use an "immediate" [directive](#createdirective).
- You can simply just use "class" instead of "className".
- The "class" attribute can also accept an object of classes or an array of classes, for convenience.
- SVGs are supported out of the box and will also be updated in a fine-grained manner.
- The "innerHTML", "outerHTML", "textContent" and "className" props are forbidden on native elements, as they are largely just footguns or non-idiomatic.
- A React-like "dangerouslySetInnerHTML" attribute is supported for setting some raw HTML.
- Numbers set as values for style properties that require a unit to be provided will automatically be suffixed with "px".
- Using CSS variables in the "style" object is supported out of the box.
- The following events are delegated, automatically: `beforeinput`, `click`, `dblclick`, `focusin`, `focusout`, `input`, `keydown`, `keyup`, `mousedown`, `mouseup`.
- Events always bubble according to the natural DOM hierarchy, there's no special bubbling logic for `Portal`.
- Class components, but with no lifecycle callbacks, are supported too. They got thrown away with the bath water by other frameworks, but organizing internal methods in a class and assigning that class to refs automatically is actually a really nice feature.

