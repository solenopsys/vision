
#### `$.store`

This function returns a deeply reactive version of the passed object, where property accesses and writes are automatically interpreted as Observables reads and writes for you.

You can just use the reactive object like you would with a regular non-reactive one, every aspect of the reactivity is handled for you under the hood, just remember to perform reads in a computation if you want to subscribe to them.

- **Note**: Only the following types of values will be handled automatically by the reactivity system: plain objects, plain arrays, primitives.
- **Note**: Assignments to the following properties won't be reactive, as making those reactive would have more cons than pros: `__proto__`, `prototype`, `constructor`, `hasOwnProperty`, `isPrototypeOf`, `propertyIsEnumerable`, `toLocaleString`, `toSource`, `toString`, `valueOf`, all `Array` methods.
- **Note**: Getters and setters that are properties of arrays, if for whatever reason you have those, won't be reactive.
- **Note**: Getters and setters that are assigned to symbols, if for whatever reason you have those, won't be reactive.
- **Note**: A powerful function is provided, `$.store.on`, for listening to any changes happening _inside_ a store. Changes are batched automatically within a microtask for you. If you use this function it's advisable to not have multiple instances of the same object inside a single store, or you may hit some edge cases where a listener doesn't fire because another path where the same object is available, and where it was edited from, hasn't been discovered yet, since discovery is lazy as otherwise it would be expensive.
- **Note**: A powerful function is provided, `$.store.reconcile`, that basically merges the content of the second argument into the first one, preserving wrapper objects in the first argument as much as possible, which can avoid many unnecessary re-renderings down the line. Currently getters/setters/symbols from the second argument are ignored, as supporting those would make this function significantly slower, and you most probably don't need them anyway if you are using this function.
- **Note**: The `$.store.unwrap` function unwraps the top-most proxy layer of the store only, which in most situations is equivalent to deeply unwrapping the store, and the fastest way to do it, except in one important edge case: if you are doing something that causes a proxy to be directly assigned to a property on the underlying unproxied plain object/array, which can happen when writing code like this: `myStore.foo = [myStore.obj]` for example, which should instead be written as `myStore.foo = [store.unwrap ( myStore.obj )]`. If you stumbled on this and you don't want to change your code refer to [this `deepUnwrap` function](https://github.com/vreactivejs/reactive/issues/8#issuecomment-1755509198).

Interface:

```ts
type StoreListenableTarget = Record<string | number | symbol, any> | (() => any);
type StoreReconcileableTarget = Record<string | number | symbol, any> | Array<any>;

type StoreOptions = {
  equals?: (( value: unknown, valuePrev: unknown ) => boolean) | false
};

function store <T> ( value: T, options?: StoreOptions ): T;

store.on = function on ( target: ArrayMaybe<StoreListenableTarget>, callback: () => void ): (() => void);
store.reconcile = function reconcile <T extends StoreReconcileableTarget> ( prev: T, next: T ): T;
store.untrack = function untrack <T> ( value: T ): T;
store.unwrap = function unwrap <T> ( value: T ): T;
```

Usage:

```ts
import $ from 'reactive';

// Make a reactive plain object

const obj = $.store ({ foo: { deep: 123 } });

$.effect ( () => {

  obj.foo.deep; // Subscribe to "foo" and "foo.deep"

});

await nextTask (); // Giving the effect a chance to run

obj.foo.deep = 321; // Cause the effect to re-run, eventually

// Make a reactive array

const arr = $.store ([ 1, 2, 3 ]);

$.effect ( () => {

  arr.forEach ( value => { // Subscribe to the entire array
    console.log ( value );
  });

});

await nextTask (); // Giving the effect a chance to run

arr.push ( 123 ); // Cause the effect to re-run, eventually

// Make a reactive object, with a custom equality function, which is inherited by children also

const equals = ( value, valuePrev ) => Object.is ( value, valuePrev );

const eobj = $.store ( { some: { arbitrary: { velue: true } } }, { equals } );

// Untrack parts of a store, bailing out of automatic proxying

const uobj = $.store ({
  foo: {} // This object will become a store automatically
  bar: $.store.untrack ( {} ) // This object will stay a plain object
});

// Get a non-reactive object out of a reactive one

const pobj = $.store.unwrap ( obj );

// Get a non-reactive array out of a reactive one

const parr = $.store.unwrap ( arr );

// Reconcile a store with new data

const rec = $.store ({ foo: { deep: { value: 123, other: '123' } } });
const dataNext = { foo: { deep: { value: 321, other: '321' } } };

$.store.reconcile ( rec, dataNext ); // Now "rec" contains the data from "dataNext", but none of its internal objects, in this case, got deleted or created, they just got updated

// Listen for changes inside a store using a selector, necessary if you want to listen to a primitive

$.store.on ( () => obj.foo.deep, () => {
  console.log ( '"obj.foo.deep" changed!' );
});

// Listen for changes inside a whole store

$.store.on ( obj, () => {
  console.log ( 'Something inside "obj" changed!' );
});

// Listen for changes inside a whole sub-store, which is just another store created automatically for you really

$.store.on ( obj.foo, () => {
  console.log ( 'Something inside "obj.foo" changed!' );
});

// Listen for changes inside multiple targets, the callback will still be fired once if multiple targets are edited within the same microtask

$.store.on ( [obj, arr], () => {
  console.log ( 'Something inside "obj" and/or "arr" changed!' );
});
```















