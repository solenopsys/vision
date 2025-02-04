# Reactive


A rich Observable/Signal implementation, the brilliant primitive you need to build a powerful reactive system.

## Install

```sh
npm install --save reactive
```

## APIs

| [Core](./)                     | [Flow](./)             | [Utilities](./)     | [Types](./)                                     |
| --------------------------------- | ------------------------- | --------------------------- | --------------------------------------------------- |
| [`$()`](./#s)                    | [`$.if`](./#if)             | [`$.boolean`](./#boolean)     | [`EffectOptions`](./#effectoptions)                   |
| [`$.batch`](./#batch)               | [`$.for`](./#for)           | [`$.disposed`](./#disposed)   | [`ForOptions`](./#foroptions)                         |
| [`$.cleanup`](./#cleanup)           | [`$.suspense`](./#suspense) | [`$.get`](./#get)             | [`MemoOptions`](./#memooptions)                       |
| [`$.context`](./#context)           | [`$.switch`](./#switch)     | [`$.readonly`](./#readonly)   | [`Observable`](./#observable)                         |
| [`$.effect`](./#effect)             | [`$.ternary`](./#ternary)   | [`$.resolve`](./#resolve)     | [`ObservableLike`](./#observablelike)                 |
| [`$.isBatching`](./#isbatching)     | [`$.tryCatch`](./#trycatch) | [`$.selector`](./#selector)   | [`ObservableReadonly`](./#observablereadonly)         |
| [`$.isObservable`](./#isobservable) |                           | [`$.suspended`](./#suspended) | [`ObservableReadonlyLike`](./#observablereadonlylike) |
| [`$.isStore`](./#isstore)           |                           | [`$.untracked`](./#untracked) | [`ObservableOptions`](./#observableoptions)           |
| [`$.memo`](./#memo)                 |                           |                             | [`StoreOptions`](./#storeoptions)                     |
| [`$.observable`](./#observable)     |                           |                             |                                                     |
| [`$.owner`](./#owner)               |                           |                             |                                                     |
| [`$.root`](./#root)                 |                           |                             |                                                     |
| [`$.store`](./#store)               |                           |                             |                                                     |
| [`$.tick`](./#tick)                 |                           |                             |                                                     |
| [`$.untrack`](./#untrack)           |                           |                             |                                                     |
| [`$.with`](./#with)                 |                           |                             |                                                     |

## Usage

The following functions are provided. They are just grouped and ordered alphabetically, the documentation for this library is relatively dry at the moment.

