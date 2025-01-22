#### `$.boolean`

This function is like the reactive equivalent of the `!!` operator, it returns you a boolean, or a function to a boolean, depending on the input that you give it.

Interface:

```ts
function boolean(value: FunctionMaybe<unknown>): FunctionMaybe<boolean>;
```

Usage:

```ts
import $ from 'reactive';

// Implementing a custom if function

function if ( when: FunctionMaybe<unknown>, whenTrue: FunctionMaybe<unknown>, whenFalse: FunctionMaybe<unknown> ) {

  const condition = $.boolean ( when );

  return $.memo ( () => {

    return $.resolve ( $.get ( condition ) ? whenTrue : whenFalse );

  });

}
```