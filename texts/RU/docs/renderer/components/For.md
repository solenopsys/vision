#### `For`

This component is the reactive alternative to natively mapping over an array.

It must be called with an array, or a function that returns an array, of _unique_ values, and each of them are passed to the child function to render something.

It can be used to map over values either with a keyed (default) or unkeyed (opt-in) strategy. Read [this](https://www.stefankrause.net/wp/?p=342) for some details about the differences between those, and the [upstream documentation](https://github.com/solenopsys/converged-reactive#for).

Interface:

```ts
function For <T> ( props: { values?: FunctionMaybe<readonly T[]>, fallback?: JSX.ELement, children: (( value: T, index: FunctionMaybe<number> ) => JSX.Element) }): ObservableReadonly<JSX.Element>;
function For <T> ( props: { values?: FunctionMaybe<readonly T[]>, fallback?: JSX.ELement, pooled?: true, unkeyed?: true, children: (( value: ObservableReadonly<T>, index: FunctionMaybe<number> ) => JSX.Element) }): ObservableReadonly<JSX.Element>;
```

Usage:

```tsx
import {For} from 'renderer';

const App = () => {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <For values={numbers}>
      {( value ) => {
        return <p>Value: {value}</p>
      }}
    </For>
  );
};
```
