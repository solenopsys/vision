#### `createDirective`

This function creates a directive provider, which can be used to register a directive with its children.

A directive is a function that always receives an `Element` as its first argument, which is basically a ref to the target element, and arbitrary user-provided arguments after that.

Each directive has a unique name and it can be called by simply writing `use:directivename={[arg1, arg2, ...argN]]}` in the JSX.

Directives internally are registered using context providers, so you can also override directives for a particular scope just by registering another directive with the same name closer to where you are reading it.

A directive's `Provider` will register the directive with its children, which is always what you want, but it can lead to messy code due to nesting.

A directive's `register` function will register the directive with the current parent observer, which is usually only safe to do at the root level, but it will lead to very readable code.

Interface:

```ts
type DirectiveFunction = <T extends unknown[]> ( ref: Element, ...args: T ) => void;
type DirectiveProvider = ( props: { children: JSX.Element } ) => JSX.Element;
type DirectiveRef<T extends unknown[]> = ( ...args: T ) => (( ref: Element ) => void);
type DirectiveRegister = () => void;
type Directive = { Provider: DirectiveProvider, ref: DirectiveRef, register: DirectiveRegister };

function createDirective <T extends unknown[] = []> ( name: string, fn: DirectiveFunction<T>, options?: DirectiveOptions ): Directive;
```

Usage:

```tsx
import {createDirective, useEffect} from 'renderer';

// First of all if you are using TypeScript you should extend the "JSX.Directives" interface, so that TypeScript will know about your new directive

namespace JSX {
  interface Directives {
    tooltip: [title: string] // Mapping the name of the directive to the array of arguments it accepts
  }
}

// Then you should create a directive provider

const TooltipDirective = createDirective ( 'tooltip', ( ref, title: string ) => {

  useEffect ( () => {

    if ( !ref () ) return; // The element may not be available yet, or it might have been unmounted

    // Code that implements a tooltip for the given element here...

  });

});

// Then you can use the new "tooltip" directive anywhere inside the "TooltipDirective.Provider"

const App = () => {
  return (
    <TooltipDirective.Provider>
      <input value="Placeholder..." use:tooltip={['This is a tooltip!']} />
    </TooltipDirective.Provider>
  );
};

// You can also use directives directly by padding them along as refs

const App = () => {
  return <input ref={TooltipDirective.ref ( 'This is a tooltip!' )} value="Placeholder..." />;
};
```







