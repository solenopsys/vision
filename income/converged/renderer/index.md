# Renderer

A high-performance framework with fine-grained observable/signal-based reactivity for building rich applications.

## Features

This works similarly to [Solid](https://www.solidjs.com), but without a custom Babel transform and with a different API.

- **No VDOM**: there's no VDOM overhead, the framework deals with raw DOM nodes directly.
- **No stale closures**: functions are always executed afresh, no need to worry about previous potential executions of the current function, ever.
- **No rules of hooks**: hooks are just regular functions, which you can nest indefinitely, call conditionally, use outside components, whatever you want.
- **No dependencies arrays**: the framework is able to detect what depends on what else automatically, no need to specify dependencies manually.
- **No props diffing**: updates are fine grained, there's no props diffing, whenever an attribute/property/class/handler/etc. should be updated it's updated directly and immediately.
- **No key prop**: you can just map over arrays, or use the `For` component with an array of unique values, no need to specify keys explicitly.
- **No Babel**: there's no need to use Babel with this framework, it works with plain old JS (plus JSX if you are into that). As a consequence we have 0 transform function bugs, because we don't have a transform function.
- **No magic**: what you see is what you get, your code is not transformed to actually do something different than what you write, there are no surprises.
- **No server support**: for the time being this framework is focused on local-first rich applications, most server-related features are not implemented: no hydration, no server components, no streaming etc.
- **Observable-based**: observables, also known as "signals", are at the core of our reactivity system. The way it works is very different from a React-like system, it may be more challenging to learn, but it's well worth the effort.
- **Work in progress**: this is probably beta software, I'm working on it because I need something with great performance for [Notable](https://github.com/notable/notable), I'm allergic to third-party dependencies, I'd like something with an API that resonates with me, and I wanted to deeply understand how the more solid [Solid](https://www.solidjs.com), which you should also check out, works.


## APIs



| [Methods](./methods/) | [Components](./components/) | [Hooks Core](./hooks-core/) | [Hooks Web](./hooks-web/) |
| ------------------------------------ | ----------------------------- | ----------------------------- | ----------------------------- |
| [`$`](./methods/#s)                  | [`Dynamic`](./components/#dynamic) | [`useBoolean`](./hooks-core/#useboolean) | [`useAbortController`](./hooks-web/#useabortcontroller) |
| [`$$`](./methods/#ss)                | [`ErrorBoundary`](./components/#errorboundary) | [`useCleanup`](./hooks-core/#usecleanup) | [`useAbortSignal`](./hooks-web/#useabortsignal) |
| [`batch`](./methods/#batch)          | [`For`](./components/#for)   | [`useContext`](./hooks-core/#usecontext) | [`useAnimationFrame`](./hooks-web/#useanimationframe) |
| [`createContext`](./methods/#createcontext) | [`Fragment`](./components/#fragment) | [`useDisposed`](./hooks-core/#usedisposed) | [`useAnimationLoop`](./hooks-web/#useanimationloop) |
| [`createDirective`](./methods/#createdirective) | [`If`](./components/#if)     | [`useEffect`](./hooks-core/#useeffect) | [`useEventListener`](./hooks-web/#useeventlistener) |
| [`createElement`](./methods/#createelement) | [`KeepAlive`](./components/#keepalive) | [`useMemo`](./hooks-core/#usememo) | [`useFetch`](./hooks-web/#usefetch) |
| [`h`](./methods/#h)                  | [`Portal`](./components/#portal) | [`usePromise`](./hooks-core/#usepromise) | [`useIdleCallback`](./hooks-web/#useidlecallback) |
| [`hmr`](./methods/#hmr)              | [`Suspense`](./components/#suspense) | [`useReadonly`](./hooks-core/#usereadonly) | [`useIdleLoop`](./hooks-web/#useidleloop) |
| [`html`](./methods/#html)            | [`Switch`](./components/#switch) | [`useResolved`](./hooks-core/#useresolved) | [`useInterval`](./hooks-web/#useinterval) |
| [`isBatching`](./methods/#isbatching) | [`Ternary`](./components/#ternary) | [`useResource`](./hooks-core/#useresource) | [`useMicrotask`](./hooks-web/#usemicrotask) |
| [`isObservable`](./methods/#isobservable) | [`DynamicLazy`](./components/#dynamicLazy) | [`useRoot`](./hooks-core/#useroot) | [`useTimeout`](./hooks-web/#usetimeout) |
| [`isServer`](./methods/#isserver)    |                              | [`useSelector`](./hooks-core/#useselector) |                             |
| [`isStore`](./methods/#isstore)      |                              | [`useSuspended`](./hooks-core/#usesuspended) |                             |
| [`lazy`](./methods/#lazy)            |                              | [`useUntracked`](./hooks-core/#useuntracked) |                             |
| [`render`](./methods/#render)        |                              |                              |                             |
| [`renderToString`](./methods/#rendertostring) |                              |                              |                             |
| [`resolve`](./methods/#resolve)      |                              |                              |                             |
| [`store`](./methods/#store)          |                              |                              |                             |
| [`template`](./methods/#template)    |                              |                              |                             |
| [`tick`](./methods/#tick)            |                              |                              |                             |
| [`untrack`](./methods/#untrack)      |                              |                              |                             |





| [Types](./types/) | [Extras](./extras/) |
| --------------------------------------------------- | ------------------------------- |
| [`Context`](./types/#context) | [`Contributing`](./extras/#contributing) |
| [`Directive`](./types/#directive) | [`Globals`](./extras/#globals) |
| [`DirectiveOptions`](./types/#directiveoptions) | [`JSX`](./extras/#jsx) |
| [`EffectOptions`](./types/#effectoptions) | [`Tree Shaking`](./extras/#tree-shaking) |
| [`FunctionMaybe`](./types/#functionmaybe) | [`TypeScript`](./extras/#typescript) |
| [`MemoOptions`](./types/#memooptions) | |
| [`Observable`](./types/#observable) | |
| [`ObservableLike`](./types/#observablelike) | |
| [`ObservableReadonly`](./types/#observablereadonly) | |
| [`ObservableReadonlyLike`](./types/#observablereadonlylike) | |
| [`ObservableMaybe`](./types/#observablemaybe) | |
| [`ObservableOptions`](./types/#observableoptions) | |
| [`Resource`](./types/#resource) | |
| [`StoreOptions`](./types/#storeoptions) | |


## Usage

This framework is simply a view layer built on top of the Observable library [`reactive`](https://github.com/solenopsys/converged-reactive), knowing how that works is necessary to understand how this works.

This framework basically re-exports everything that `reactive` exports, sometimes with a slightly different interface, adjusted for usage as components or hooks, plus some additional functions.

