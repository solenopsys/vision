#### `$.resolve`

This function recursively resolves reactivity in the passed value. Basically it replaces each function it can find with the result of `$.memo ( () => $.resolve ( fn () ) )`.

You may never need to use this function yourself, but it's necessary internally at times to make sure that a child value is properly tracked by its parent computation.

This function is used internally by `$.if`, `$.for`, `$.switch`, `$.ternary`, `$.tryCatch`, as they need to resolve values to make sure the memo they give you can properly keep track of dependencies.

Interface:

```ts
type ResolvablePrimitive = null | undefined | boolean | number | bigint | string | symbol;
type ResolvableArray = Resolvable[];
type ResolvableObject = { [Key in string | number | symbol]?: Resolvable };
type ResolvableFunction = () => Resolvable;
type Resolvable = ResolvablePrimitive | ResolvableObject | ResolvableArray | ResolvableFunction;

const resolve = <T> ( value: T ): T extends Resolvable ? T : never;
```

Usage:

```ts
import $ from "reactive";

// Resolve a plain value

$.resolve(123); // => 123

// Resolve a function

$.resolve(() => 123); // => ObservableReadonly<123>

// Resolve a nested function

$.resolve(() => () => 123); // => ObservableReadonly<ObservableReadonly<123>>

// Resolve a plain array

$.resolve([123]); // => [123]

// Resolve an array containing a function

$.resolve([() => 123]); // => [ObservableReadonly<123>]

// Resolve an array containing arrays and functions

$.resolve([() => 123, [() => [() => 123]]]); // => [ObservableReadonly<123>, [ObservableReadonly<[ObservableReadonly<123>]>]]

// Resolve a plain object

$.resolve({ foo: 123 }); // => { foo: 123 }

// Resolve a plain object containing a function, plain objects are simply returned as is

$.resolve({ foo: () => 123 }); // => { foo: () => 123 }
```
