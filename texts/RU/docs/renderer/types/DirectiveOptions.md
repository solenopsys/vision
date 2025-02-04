#### `DirectiveOptions`

This type describes the options object that the `createDirective` function accepts.

Interface:

```ts
type DirectiveOptions = {
  immediate?: boolean // If `true` the directive is called as soon as the node is created, otherwise it also waits for that node to be attached to the DOM
};
```

Usage:

```tsx
import {createDirective} from 'renderer';

// Create an regular, non-immediate, directive

const TooltipDirective = createDirective ( 'tooltip', ( ref, title: string ) => {
  // Implementation...
});

// Create an immediate directive

const TooltipDirectiveImmediate = createDirective ( 'tooltip', ( ref, title: string ) => {
  // Implementation...
}, { immediate: true } );
```

