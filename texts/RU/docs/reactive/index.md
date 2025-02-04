# Reactive


A rich Observable/Signal implementation, the brilliant primitive you need to build a powerful reactive system.

## Install

```sh
npm install --save reactive
```

## APIs

| [Core](./core/)                     | [Flow](./flow/)             | [Utilities](./utilities/)     | [Types](./types/)                                     |
| --------------------------------- | ------------------------- | --------------------------- | --------------------------------------------------- |
| [`$()`](./core/#s)                    | [`$.if`](./flow/#if)             | [`$.boolean`](./utilities/#boolean)     | [`EffectOptions`](./types/#effectoptions)                   |
| [`$.batch`](./core/#batch)               | [`$.for`](./flow/#for)           | [`$.disposed`](./utilities/#disposed)   | [`ForOptions`](./types/#foroptions)                         |
| [`$.cleanup`](./core/#cleanup)           | [`$.suspense`](./flow/#suspense) | [`$.get`](./utilities/#get)             | [`MemoOptions`](./types/#memooptions)                       |
| [`$.context`](./core/#context)           | [`$.switch`](./flow/#switch)     | [`$.readonly`](./utilities/#readonly)   | [`Observable`](./types/#observable)                         |
| [`$.effect`](./core/#effect)             | [`$.ternary`](./flow/#ternary)   | [`$.resolve`](./utilities/#resolve)     | [`ObservableLike`](./types/#observablelike)                 |
| [`$.isBatching`](./core/#isbatching)     | [`$.tryCatch`](./flow/#trycatch) | [`$.selector`](./utilities/#selector)   | [`ObservableReadonly`](./types/#observablereadonly)         |
| [`$.isObservable`](./core/#isobservable) |                           | [`$.suspended`](./utilities/#suspended) | [`ObservableReadonlyLike`](./types/#observablereadonlylike) |
| [`$.isStore`](./core/#isstore)           |                           | [`$.untracked`](./utilities/#untracked) | [`ObservableOptions`](./types/#observableoptions)           |
| [`$.memo`](./core/#memo)                 |                           |                             | [`StoreOptions`](./types/#storeoptions)                     |
| [`$.observable`](./core/#observable)     |                           |                             |                                                     |
| [`$.owner`](./core/#owner)               |                           |                             |                                                     |
| [`$.root`](./core/#root)                 |                           |                             |                                                     |
| [`$.store`](./core/#store)               |                           |                             |                                                     |
| [`$.tick`](./core/#tick)                 |                           |                             |                                                     |
| [`$.untrack`](./core/#untrack)           |                           |                             |                                                     |
| [`$.with`](./core/#with)                 |                           |                             |                                                     |

## Usage

The following functions are provided. They are just grouped and ordered alphabetically, the documentation for this library is relatively dry at the moment.

