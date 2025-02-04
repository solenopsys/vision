#### `Directive`

This type describes the object that `createDirective` gives you.

Interface:

```ts
type Directive<Arguments extends unknown[] = []> = {
  Provider: ( props: { children: JSX.Element } ) => JSX.Element,
  ref: ( ...args: Arguments ) => (( ref: Element ) => void),
  register: () => void
};
```

Usage:

```ts
import {$$, useEffect} from 'renderer';
import type {Directive, FunctionMaybe} from 'renderer';

// Example hook for turning a directive into a hook

const useDirective = <T extends unknown[] = []> ( directive: Directive<T> ) => {
  return ( ref: FunctionMaybe<Element | undefined>, ...args: T ): void => {
    useEffect ( () => {
      const target = $$(ref);
      if ( !target ) return;
      directive.ref ( ...args )( target );
    });
  };
};
```