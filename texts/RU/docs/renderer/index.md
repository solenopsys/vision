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



| [Methods](./) | [Components](./) | [Hooks Core](./) | [Hooks Web](./) |
| ------------------------------------ | ----------------------------- | ----------------------------- | ----------------------------- |
| [`$`](./#s)                  | [`Dynamic`](./#dynamic) | [`useBoolean`](./#useboolean) | [`useAbortController`](./#useabortcontroller) |
| [`$$`](./#ss)                | [`ErrorBoundary`](./#errorboundary) | [`useCleanup`](./#usecleanup) | [`useAbortSignal`](./#useabortsignal) |
| [`batch`](./#batch)          | [`For`](./#for)   | [`useContext`](./#usecontext) | [`useAnimationFrame`](./#useanimationframe) |
| [`createContext`](./#createcontext) | [`Fragment`](./#fragment) | [`useDisposed`](./#usedisposed) | [`useAnimationLoop`](./#useanimationloop) |
| [`createDirective`](./#createdirective) | [`If`](./#if)     | [`useEffect`](./#useeffect) | [`useEventListener`](./#useeventlistener) |
| [`createElement`](./#createelement) | [`KeepAlive`](./#keepalive) | [`useMemo`](./#usememo) | [`useFetch`](./#usefetch) |
| [`h`](./#h)                  | [`Portal`](./#portal) | [`usePromise`](./#usepromise) | [`useIdleCallback`](./#useidlecallback) |
| [`hmr`](./#hmr)              | [`Suspense`](./#suspense) | [`useReadonly`](./#usereadonly) | [`useIdleLoop`](./#useidleloop) |
| [`html`](./#html)            | [`Switch`](./#switch) | [`useResolved`](./#useresolved) | [`useInterval`](./#useinterval) |
| [`isBatching`](./#isbatching) | [`Ternary`](./#ternary) | [`useResource`](./#useresource) | [`useMicrotask`](./#usemicrotask) |
| [`isObservable`](./#isobservable) | [`DynamicLazy`](./#dynamicLazy) | [`useRoot`](./#useroot) | [`useTimeout`](./#usetimeout) |
| [`isServer`](./#isserver)    |                              | [`useSelector`](./#useselector) |                             |
| [`isStore`](./#isstore)      |                              | [`useSuspended`](./#usesuspended) |                             |
| [`lazy`](./#lazy)            |                              | [`useUntracked`](./#useuntracked) |                             |
| [`render`](./#render)        |                              |                              |                             |
| [`renderToString`](./#rendertostring) |                              |                              |                             |
| [`resolve`](./#resolve)      |                              |                              |                             |
| [`store`](./#store)          |                              |                              |                             |
| [`template`](./#template)    |                              |                              |                             |
| [`tick`](./#tick)            |                              |                              |                             |
| [`untrack`](./#untrack)      |                              |                              |                             |





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

