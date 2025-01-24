// libraries/solenopsys/converged-reactive/src/symbols.ts
var SYMBOL_CACHED = Symbol("Cached");
var SYMBOL_OBSERVABLE = Symbol("Observable");
var SYMBOL_OBSERVABLE_BOOLEAN = Symbol("Observable.Boolean");
var SYMBOL_OBSERVABLE_FROZEN = Symbol("Observable.Frozen");
var SYMBOL_OBSERVABLE_READABLE = Symbol("Observable.Readable");
var SYMBOL_OBSERVABLE_WRITABLE = Symbol("Observable.Writable");
var SYMBOL_STORE = Symbol("Store");
var SYMBOL_STORE_KEYS = Symbol("Store.Keys");
var SYMBOL_STORE_OBSERVABLE = Symbol("Store.Observable");
var SYMBOL_STORE_TARGET = Symbol("Store.Target");
var SYMBOL_STORE_VALUES = Symbol("Store.Values");
var SYMBOL_STORE_UNTRACKED = Symbol("Store.Untracked");
var SYMBOL_SUSPENSE = Symbol("Suspense");
var SYMBOL_UNCACHED = Symbol("Uncached");
var SYMBOL_UNTRACKED = Symbol("Untracked");
var SYMBOL_UNTRACKED_UNWRAPPED = Symbol("Untracked.Unwrapped");

// libraries/solenopsys/converged-reactive/src/utils.ts
var castArray = (value) => {
  return isArray(value) ? value : [value];
};
var castError = (error) => {
  if (error instanceof Error)
    return error;
  if (typeof error === "string")
    return new Error(error);
  return new Error("Unknown error");
};
var { is } = Object;
var { isArray } = Array;
var isEqual = (a, b) => {
  if (a.length !== b.length)
    return false;
  for (let i = 0, l = a.length;i < l; i++) {
    const valueA = a[i];
    const valueB = b[i];
    if (!is(valueA, valueB))
      return false;
  }
  return true;
};
var isFunction = (value) => {
  return typeof value === "function";
};
var isObject = (value) => {
  return value !== null && typeof value === "object";
};
var isSymbol = (value) => {
  return typeof value === "symbol";
};
var noop = () => {
  return;
};
var nope = () => {
  return false;
};

// libraries/solenopsys/converged-reactive/src/objects/callable.ts
var frozenFunction = function() {
  if (arguments.length) {
    throw new Error("A readonly Observable can not be updated");
  } else {
    return this;
  }
};
var readableFunction = function() {
  if (arguments.length) {
    throw new Error("A readonly Observable can not be updated");
  } else {
    return this.get();
  }
};
var writableFunction = function(fn) {
  if (arguments.length) {
    if (isFunction(fn)) {
      return this.update(fn);
    } else {
      return this.set(fn);
    }
  } else {
    return this.get();
  }
};
var frozen = (value) => {
  const fn = frozenFunction.bind(value);
  fn[SYMBOL_OBSERVABLE] = true;
  fn[SYMBOL_OBSERVABLE_FROZEN] = true;
  return fn;
};
var readable = (value) => {
  const fn = readableFunction.bind(value);
  fn[SYMBOL_OBSERVABLE] = true;
  fn[SYMBOL_OBSERVABLE_READABLE] = value;
  return fn;
};
var writable = (value) => {
  const fn = writableFunction.bind(value);
  fn[SYMBOL_OBSERVABLE] = true;
  fn[SYMBOL_OBSERVABLE_WRITABLE] = value;
  return fn;
};

// libraries/solenopsys/converged-reactive/src/constants.ts
var DIRTY_NO = 0;
var DIRTY_MAYBE_NO = 1;
var DIRTY_MAYBE_YES = 2;
var DIRTY_YES = 3;
var OBSERVABLE_FALSE = frozen(false);
var OBSERVABLE_TRUE = frozen(true);
var UNAVAILABLE = new Proxy({}, new Proxy({}, {
  get() {
    throw new Error("Unavailable value");
  }
}));
var UNINITIALIZED = function() {
};

// libraries/solenopsys/converged-reactive/src/lazy.ts
var lazyArrayEach = (arr, fn) => {
  if (arr instanceof Array) {
    for (let i = 0, l = arr.length;i < l; i++) {
      fn(arr[i]);
    }
  } else if (arr) {
    fn(arr);
  }
};
var lazyArrayEachRight = (arr, fn) => {
  if (arr instanceof Array) {
    for (let i = arr.length - 1;i >= 0; i--) {
      fn(arr[i]);
    }
  } else if (arr) {
    fn(arr);
  }
};
var lazyArrayPush = (obj, key, value) => {
  const arr = obj[key];
  if (arr instanceof Array) {
    arr.push(value);
  } else if (arr) {
    obj[key] = [arr, value];
  } else {
    obj[key] = value;
  }
};
var lazySetAdd = (obj, key, value) => {
  const set = obj[key];
  if (set instanceof Set) {
    set.add(value);
  } else if (set) {
    if (value !== set) {
      const s = new Set;
      s.add(set);
      s.add(value);
      obj[key] = s;
    }
  } else {
    obj[key] = value;
  }
};
var lazySetDelete = (obj, key, value) => {
  const set = obj[key];
  if (set instanceof Set) {
    set.delete(value);
  } else if (set === value) {
    obj[key] = undefined;
  }
};
var lazySetEach = (set, fn) => {
  if (set instanceof Set) {
    for (const value of set) {
      fn(value);
    }
  } else if (set) {
    fn(set);
  }
};

// libraries/solenopsys/converged-reactive/src/objects/owner.ts
var onCleanup = (cleanup) => cleanup.call(cleanup);
var onDispose = (owner) => owner.dispose(true);

class Owner {
  parent;
  context;
  disposed = false;
  cleanups = undefined;
  errorHandler = undefined;
  contexts = undefined;
  observers = undefined;
  roots = undefined;
  suspenses = undefined;
  catch(error, silent) {
    const { errorHandler } = this;
    if (errorHandler) {
      errorHandler(error);
      return true;
    } else {
      if (this.parent?.catch(error, true))
        return true;
      if (silent)
        return false;
      throw error;
    }
  }
  dispose(deep) {
    lazyArrayEachRight(this.contexts, onDispose);
    lazyArrayEachRight(this.observers, onDispose);
    lazyArrayEachRight(this.suspenses, onDispose);
    lazyArrayEachRight(this.cleanups, onCleanup);
    this.cleanups = undefined;
    this.disposed = deep;
    this.errorHandler = undefined;
    this.observers = undefined;
    this.suspenses = undefined;
  }
  get(symbol) {
    return this.context?.[symbol];
  }
  wrap(fn, owner, observer) {
    const ownerPrev = OWNER;
    const observerPrev = OBSERVER;
    setOwner(owner);
    setObserver(observer);
    try {
      return fn();
    } catch (error) {
      this.catch(castError(error), false);
      return UNAVAILABLE;
    } finally {
      setOwner(ownerPrev);
      setObserver(observerPrev);
    }
  }
}
var owner_default = Owner;

// libraries/solenopsys/converged-reactive/src/objects/superroot.ts
class SuperRoot extends owner_default {
  constructor() {
    super(...arguments);
  }
  context = {};
}
var superroot_default = SuperRoot;

// libraries/solenopsys/converged-reactive/src/context.ts
var BATCH;
var SUPER_OWNER = new superroot_default;
var OBSERVER;
var OWNER = SUPER_OWNER;
var setBatch = (value) => BATCH = value;
var setObserver = (value) => OBSERVER = value;
var setOwner = (value) => OWNER = value;

// libraries/solenopsys/converged-reactive/src/methods/batch.ts
var counter = 0;
var resolve = noop;
var batch = async (fn) => {
  if (!counter) {
    setBatch(new Promise((r) => resolve = r));
  }
  try {
    counter += 1;
    return await fn();
  } finally {
    counter -= 1;
    if (!counter) {
      setBatch(undefined);
      resolve();
    }
  }
};
var batch_default = batch;

// libraries/solenopsys/converged-reactive/src/methods/is_observable_boolean.ts
var isObservableBoolean = (value) => {
  return isFunction(value) && SYMBOL_OBSERVABLE_BOOLEAN in value;
};
var is_observable_boolean_default = isObservableBoolean;

// libraries/solenopsys/converged-reactive/src/methods/is_observable_frozen.ts
var isObservableFrozen = (value) => {
  return isFunction(value) && ((SYMBOL_OBSERVABLE_FROZEN in value) || !!value[SYMBOL_OBSERVABLE_READABLE]?.parent?.disposed);
};
var is_observable_frozen_default = isObservableFrozen;

// libraries/solenopsys/converged-reactive/src/methods/is_untracked.ts
var isUntracked = (value) => {
  return isFunction(value) && ((SYMBOL_UNTRACKED in value) || (SYMBOL_UNTRACKED_UNWRAPPED in value));
};
var is_untracked_default = isUntracked;

// libraries/solenopsys/converged-reactive/src/objects/scheduler.sync.ts
class Scheduler {
  waiting = [];
  counter = 0;
  locked = false;
  flush = () => {
    if (this.locked)
      return;
    if (this.counter)
      return;
    if (!this.waiting.length)
      return;
    try {
      this.locked = true;
      while (true) {
        const queue = this.waiting;
        if (!queue.length)
          break;
        this.waiting = [];
        for (let i = 0, l = queue.length;i < l; i++) {
          queue[i].update();
        }
      }
    } finally {
      this.locked = false;
    }
  };
  wrap = (fn) => {
    this.counter += 1;
    fn();
    this.counter -= 1;
    this.flush();
  };
  schedule = (observer) => {
    this.waiting.push(observer);
  };
}
var scheduler_sync_default = new Scheduler;

// libraries/solenopsys/converged-reactive/src/objects/observable.ts
class Observable {
  parent;
  value;
  equals;
  observers = new Set;
  constructor(value, options, parent) {
    this.value = value;
    if (parent) {
      this.parent = parent;
    }
    if (options?.equals !== undefined) {
      this.equals = options.equals || nope;
    }
  }
  get() {
    if (!this.parent?.disposed) {
      this.parent?.update();
      OBSERVER?.observables.link(this);
    }
    return this.value;
  }
  set(value) {
    const equals = this.equals || is;
    const fresh = this.value === UNINITIALIZED || !equals(value, this.value);
    if (!fresh)
      return value;
    this.value = value;
    scheduler_sync_default.counter += 1;
    this.stale(DIRTY_YES);
    scheduler_sync_default.counter -= 1;
    scheduler_sync_default.flush();
    return value;
  }
  stale(status) {
    for (const observer of this.observers) {
      if (observer.status !== DIRTY_MAYBE_NO || observer.observables.has(this)) {
        if (observer.sync) {
          observer.status = Math.max(observer.status, status);
          scheduler_sync_default.schedule(observer);
        } else {
          observer.stale(status);
        }
      }
    }
  }
  update(fn) {
    const value = fn(this.value);
    return this.set(value);
  }
}
var observable_default = Observable;

// libraries/solenopsys/converged-reactive/src/objects/observables.ts
class ObservablesArray {
  observer;
  observables;
  observablesIndex;
  constructor(observer) {
    this.observer = observer;
    this.observables = [];
    this.observablesIndex = 0;
  }
  dispose(deep) {
    if (deep) {
      const { observer, observables } = this;
      for (let i = 0;i < observables.length; i++) {
        observables[i].observers.delete(observer);
      }
    }
    this.observablesIndex = 0;
  }
  postdispose() {
    const { observer, observables, observablesIndex } = this;
    const observablesLength = observables.length;
    if (observablesIndex < observablesLength) {
      for (let i = observablesIndex;i < observablesLength; i++) {
        observables[i].observers.delete(observer);
      }
      observables.length = observablesIndex;
    }
  }
  empty() {
    return !this.observables.length;
  }
  has(observable) {
    const index = this.observables.indexOf(observable);
    return index >= 0 && index < this.observablesIndex;
  }
  link(observable) {
    const { observer, observables, observablesIndex } = this;
    const observablesLength = observables.length;
    if (observablesLength > 0) {
      if (observables[observablesIndex] === observable) {
        this.observablesIndex += 1;
        return;
      }
      const index = observables.indexOf(observable);
      if (index >= 0 && index < observablesIndex) {
        return;
      }
      if (observablesIndex < observablesLength - 1) {
        this.postdispose();
      } else if (observablesIndex === observablesLength - 1) {
        observables[observablesIndex].observers.delete(observer);
      }
    }
    observable.observers.add(observer);
    observables[this.observablesIndex++] = observable;
    if (observablesIndex === 128) {
      observer.observables = new ObservablesSet(observer, observables);
    }
  }
  update() {
    const { observables } = this;
    for (let i = 0, l = observables.length;i < l; i++) {
      observables[i].parent?.update();
    }
  }
}

class ObservablesSet {
  observer;
  observables;
  constructor(observer, observables) {
    this.observer = observer;
    this.observables = new Set(observables);
  }
  dispose(deep) {
    for (const observable of this.observables) {
      observable.observers.delete(this.observer);
    }
  }
  postdispose() {
    return;
  }
  empty() {
    return !this.observables.size;
  }
  has(observable) {
    return this.observables.has(observable);
  }
  link(observable) {
    const { observer, observables } = this;
    const sizePrev = observables.size;
    observable.observers.add(observer);
    const sizeNext = observables.size;
    if (sizePrev === sizeNext)
      return;
    observables.add(observable);
  }
  update() {
    for (const observable of this.observables) {
      observable.parent?.update();
    }
  }
}

// libraries/solenopsys/converged-reactive/src/objects/observer.ts
class Observer extends owner_default {
  parent = OWNER;
  context = OWNER.context;
  status = DIRTY_YES;
  observables;
  sync;
  constructor() {
    super();
    this.observables = new ObservablesArray(this);
    if (OWNER !== SUPER_OWNER) {
      lazyArrayPush(this.parent, "observers", this);
    }
  }
  dispose(deep) {
    this.observables.dispose(deep);
    super.dispose(deep);
  }
  refresh(fn) {
    this.dispose(false);
    this.status = DIRTY_MAYBE_NO;
    try {
      return this.wrap(fn, this, this);
    } finally {
      this.observables.postdispose();
    }
  }
  run() {
    throw new Error("Abstract method");
  }
  stale(status) {
    throw new Error("Abstract method");
  }
  update() {
    if (this.disposed)
      return;
    if (this.status === DIRTY_MAYBE_YES) {
      this.observables.update();
    }
    if (this.status === DIRTY_YES) {
      this.status = DIRTY_MAYBE_NO;
      this.run();
      if (this.status === DIRTY_MAYBE_NO) {
        this.status = DIRTY_NO;
      } else {
        this.update();
      }
    } else {
      this.status = DIRTY_NO;
    }
  }
}
var observer_default = Observer;

// libraries/solenopsys/converged-reactive/src/objects/memo.ts
class Memo extends observer_default {
  fn;
  observable;
  declaresync;
  constructor(fn, options) {
    super();
    this.fn = fn;
    this.observable = new observable_default(UNINITIALIZED, options, this);
    if (options?.sync === true) {
      this.sync = true;
      this.update();
    }
  }
  run() {
    const result = super.refresh(this.fn);
    if (!this.disposed && this.observables.empty()) {
      this.disposed = true;
    }
    if (result !== UNAVAILABLE) {
      this.observable.set(result);
    }
  }
  stale(status) {
    const statusPrev = this.status;
    if (statusPrev >= status)
      return;
    this.status = status;
    if (statusPrev === DIRTY_MAYBE_YES)
      return;
    this.observable.stale(DIRTY_MAYBE_YES);
  }
}
var memo_default = Memo;

// libraries/solenopsys/converged-reactive/src/methods/memo.ts
var memo2 = (fn, options) => {
  if (is_observable_frozen_default(fn)) {
    return fn;
  } else if (is_untracked_default(fn)) {
    return frozen(fn());
  } else {
    const memo3 = new memo_default(fn, options);
    const observable2 = readable(memo3.observable);
    return observable2;
  }
};
var memo_default2 = memo2;

// libraries/solenopsys/converged-reactive/src/methods/boolean.ts
var boolean = (value) => {
  if (isFunction(value)) {
    if (is_observable_frozen_default(value) || is_untracked_default(value)) {
      return !!value();
    } else if (is_observable_boolean_default(value)) {
      return value;
    } else {
      const boolean2 = memo_default2(() => !!value());
      boolean2[SYMBOL_OBSERVABLE_BOOLEAN] = true;
      return boolean2;
    }
  } else {
    return !!value;
  }
};
var boolean_default = boolean;

// libraries/solenopsys/converged-reactive/src/methods/cleanup.ts
var cleanup = (fn) => {
  lazyArrayPush(OWNER, "cleanups", fn);
};
var cleanup_default = cleanup;

// libraries/solenopsys/converged-reactive/src/objects/context.ts
class Context extends owner_default {
  parent = OWNER;
  context;
  constructor(context7) {
    super();
    this.context = { ...OWNER.context, ...context7 };
    lazyArrayPush(this.parent, "contexts", this);
  }
  wrap(fn) {
    return super.wrap(fn, this, undefined);
  }
}
var context_default = Context;

// libraries/solenopsys/converged-reactive/src/methods/context.ts
var context9 = (symbolOrContext, fn) => {
  if (isSymbol(symbolOrContext)) {
    return OWNER.context[symbolOrContext];
  } else {
    return new context_default(symbolOrContext).wrap(fn || noop);
  }
};
var context_default2 = context9;

// libraries/solenopsys/converged-reactive/src/methods/disposed.ts
var disposed = () => {
  const observable3 = new observable_default(false);
  const toggle = () => observable3.set(true);
  cleanup_default(toggle);
  return readable(observable3);
};
var disposed_default = disposed;

// libraries/solenopsys/converged-reactive/src/objects/scheduler.async.ts
class Scheduler2 {
  waiting = [];
  locked = false;
  queued = false;
  flush = () => {
    if (this.locked)
      return;
    if (!this.waiting.length)
      return;
    try {
      this.locked = true;
      while (true) {
        const queue = this.waiting;
        if (!queue.length)
          break;
        this.waiting = [];
        for (let i = 0, l = queue.length;i < l; i++) {
          queue[i].update();
        }
      }
    } finally {
      this.locked = false;
    }
  };
  queue = () => {
    if (this.queued)
      return;
    this.queued = true;
    this.resolve();
  };
  resolve = () => {
    queueMicrotask(() => {
      queueMicrotask(() => {
        if (BATCH) {
          BATCH.finally(this.resolve);
        } else {
          this.queued = false;
          this.flush();
        }
      });
    });
  };
  schedule = (effect) => {
    this.waiting.push(effect);
    this.queue();
  };
}
var scheduler_async_default = new Scheduler2;

// libraries/solenopsys/converged-reactive/src/objects/effect.ts
class Effect extends observer_default {
  fn;
  suspense;
  init;
  constructor(fn, options) {
    super();
    this.fn = fn;
    if (options?.suspense !== false) {
      const suspense = this.get(SYMBOL_SUSPENSE);
      if (suspense) {
        this.suspense = suspense;
      }
    }
    if (options?.sync === true) {
      this.sync = true;
    }
    if (options?.sync === "init") {
      this.init = true;
      this.update();
    } else {
      this.schedule();
    }
  }
  run() {
    const result = super.refresh(this.fn);
    if (isFunction(result)) {
      lazyArrayPush(this, "cleanups", result);
    }
  }
  schedule() {
    if (this.suspense?.suspended)
      return;
    if (this.sync) {
      this.update();
    } else {
      scheduler_async_default.schedule(this);
    }
  }
  stale(status) {
    const statusPrev = this.status;
    if (statusPrev >= status)
      return;
    this.status = status;
    if (!this.sync || statusPrev !== 2 && statusPrev !== 3) {
      this.schedule();
    }
  }
  update() {
    if (this.suspense?.suspended)
      return;
    super.update();
  }
}
var effect_default = Effect;

// libraries/solenopsys/converged-reactive/src/methods/effect.ts
var effect2 = (fn, options) => {
  const effect3 = new effect_default(fn, options);
  const dispose = () => effect3.dispose(true);
  return dispose;
};
var effect_default2 = effect2;

// libraries/solenopsys/converged-reactive/src/methods/resolve.ts
var resolveImpl = (value) => {
  if (isFunction(value)) {
    if (SYMBOL_UNTRACKED_UNWRAPPED in value) {
      return resolveImpl(value());
    } else if (SYMBOL_UNTRACKED in value) {
      return frozen(resolveImpl(value()));
    } else if (SYMBOL_OBSERVABLE in value) {
      return value;
    } else {
      return memo_default2(() => resolveImpl(value()));
    }
  }
  if (value instanceof Array) {
    const resolved = new Array(value.length);
    for (let i = 0, l = resolved.length;i < l; i++) {
      resolved[i] = resolveImpl(value[i]);
    }
    return resolved;
  } else {
    return value;
  }
};
var resolve2 = resolveImpl;
var resolve_default = resolve2;

// libraries/solenopsys/converged-reactive/src/objects/root.ts
class Root extends owner_default {
  parent = OWNER;
  context = OWNER.context;
  registered;
  constructor(register) {
    super();
    if (register) {
      const suspense = this.get(SYMBOL_SUSPENSE);
      if (suspense) {
        this.registered = true;
        lazySetAdd(this.parent, "roots", this);
      }
    }
  }
  dispose(deep) {
    if (this.registered) {
      lazySetDelete(this.parent, "roots", this);
    }
    super.dispose(deep);
  }
  wrap(fn) {
    const dispose = () => this.dispose(true);
    const fnWithDispose = () => fn(dispose);
    return super.wrap(fnWithDispose, this, undefined);
  }
}
var root_default = Root;

// libraries/solenopsys/converged-reactive/src/methods/for.cache.keyed.ts
var DUMMY_INDEX = frozen(-1);

class MappedRoot extends root_default {
  constructor() {
    super(...arguments);
  }
  bool;
  index;
  result;
}

class CacheKeyed {
  parent = OWNER;
  suspense = OWNER.get(SYMBOL_SUSPENSE);
  fn;
  fnWithIndex;
  cache = new Map;
  bool = false;
  prevCount = 0;
  reuseCount = 0;
  nextCount = 0;
  constructor(fn) {
    this.fn = fn;
    this.fnWithIndex = fn.length > 1;
    if (this.suspense) {
      lazySetAdd(this.parent, "roots", this.roots);
    }
  }
  cleanup = () => {
    if (!this.prevCount)
      return;
    if (this.prevCount === this.reuseCount)
      return;
    const { cache, bool } = this;
    if (!cache.size)
      return;
    if (this.nextCount) {
      cache.forEach((mapped, value) => {
        if (mapped.bool === bool)
          return;
        mapped.dispose(true);
        cache.delete(value);
      });
    } else {
      this.cache.forEach((mapped) => {
        mapped.dispose(true);
      });
      this.cache = new Map;
    }
  };
  dispose = () => {
    if (this.suspense) {
      lazySetDelete(this.parent, "roots", this.roots);
    }
    this.prevCount = this.cache.size;
    this.reuseCount = 0;
    this.nextCount = 0;
    this.cleanup();
  };
  before = () => {
    this.bool = !this.bool;
    this.reuseCount = 0;
    this.nextCount = 0;
  };
  after = (values) => {
    this.nextCount = values.length;
    this.cleanup();
    this.prevCount = this.nextCount;
    this.reuseCount = 0;
  };
  map = (values) => {
    this.before();
    const { cache, bool, fn, fnWithIndex } = this;
    const results = new Array(values.length);
    let resultsCached = true;
    let resultsUncached = true;
    let reuseCount = 0;
    for (let i = 0, l = values.length;i < l; i++) {
      const value = values[i];
      const cached = cache.get(value);
      if (cached && cached.bool !== bool) {
        resultsUncached = false;
        reuseCount += 1;
        cached.bool = bool;
        cached.index?.set(i);
        results[i] = cached.result;
      } else {
        resultsCached = false;
        const mapped = new MappedRoot(false);
        if (cached) {
          cleanup_default(() => mapped.dispose(true));
        }
        mapped.wrap(() => {
          let index = DUMMY_INDEX;
          if (fnWithIndex) {
            mapped.index = new observable_default(i);
            index = readable(mapped.index);
          }
          const result = results[i] = resolve_default(fn(value, index));
          mapped.bool = bool;
          mapped.result = result;
          if (!cached) {
            cache.set(value, mapped);
          }
        });
      }
    }
    this.reuseCount = reuseCount;
    this.after(values);
    if (resultsCached) {
      results[SYMBOL_CACHED] = true;
    }
    if (resultsUncached) {
      results[SYMBOL_UNCACHED] = true;
    }
    return results;
  };
  roots = () => {
    return Array.from(this.cache.values());
  };
}
var for_cache_keyed_default = CacheKeyed;

// libraries/solenopsys/converged-reactive/src/methods/is_observable.ts
var isObservable = (value) => {
  return isFunction(value) && SYMBOL_OBSERVABLE in value;
};
var is_observable_default = isObservable;

// libraries/solenopsys/converged-reactive/src/methods/get.ts
var get = (value, getFunction = true) => {
  const is2 = getFunction ? isFunction : is_observable_default;
  if (is2(value)) {
    return value();
  } else {
    return value;
  }
};
var get_default = get;

// libraries/solenopsys/converged-reactive/src/objects/suspense.ts
class Suspense extends owner_default {
  parent = OWNER;
  context = { ...OWNER.context, [SYMBOL_SUSPENSE]: this };
  observable;
  suspended;
  constructor() {
    super();
    lazyArrayPush(this.parent, "suspenses", this);
    this.suspended = OWNER.get(SYMBOL_SUSPENSE)?.suspended || 0;
  }
  toggle(force) {
    if (!this.suspended && !force)
      return;
    const suspendedPrev = this.suspended;
    const suspendedNext = suspendedPrev + (force ? 1 : -1);
    this.suspended = suspendedNext;
    if (!!suspendedPrev === !!suspendedNext)
      return;
    this.observable?.set(!!suspendedNext);
    const notifyOwner = (owner6) => {
      lazyArrayEach(owner6.contexts, notifyOwner);
      lazyArrayEach(owner6.observers, notifyObserver);
      lazyArrayEach(owner6.suspenses, notifySuspense);
      lazySetEach(owner6.roots, notifyRoot);
    };
    const notifyObserver = (observer3) => {
      if (observer3 instanceof effect_default) {
        if (observer3.status === DIRTY_MAYBE_YES || observer3.status === DIRTY_YES) {
          if (observer3.init) {
            observer3.update();
          } else {
            observer3.schedule();
          }
        }
      }
      notifyOwner(observer3);
    };
    const notifyRoot = (root2) => {
      if (isFunction(root2)) {
        root2().forEach(notifyOwner);
      } else {
        notifyOwner(root2);
      }
    };
    const notifySuspense = (suspense) => {
      suspense.toggle(force);
    };
    notifyOwner(this);
  }
  wrap(fn) {
    return super.wrap(fn, this, undefined);
  }
}
var suspense_default = Suspense;

// libraries/solenopsys/converged-reactive/src/methods/suspense.ts
var suspense2 = (when, fn) => {
  const suspense3 = new suspense_default;
  const condition = boolean_default(when);
  const toggle = () => suspense3.toggle(get_default(condition));
  effect_default2(toggle, { sync: true });
  return suspense3.wrap(fn);
};
var suspense_default2 = suspense2;

// libraries/solenopsys/converged-reactive/src/methods/for.cache.unkeyed.ts
var DUMMY_INDEX2 = frozen(-1);

class MappedRoot2 extends root_default {
  constructor() {
    super(...arguments);
  }
  index;
  value;
  suspended;
  result;
}

class CacheUnkeyed {
  parent = OWNER;
  suspense = OWNER.get(SYMBOL_SUSPENSE);
  fn;
  fnWithIndex;
  cache = new Map;
  pool = [];
  poolMaxSize = 0;
  pooled;
  constructor(fn, pooled) {
    this.fn = fn;
    this.fnWithIndex = fn.length > 1;
    this.pooled = pooled;
    if (this.suspense) {
      lazySetAdd(this.parent, "roots", this.roots);
    }
  }
  cleanup = () => {
    let pooled = 0;
    let poolable = Math.max(0, this.pooled ? this.poolMaxSize - this.pool.length : 0);
    this.cache.forEach((mapped) => {
      if (poolable > 0 && pooled++ < poolable) {
        mapped.suspended?.set(true);
        this.pool.push(mapped);
      } else {
        mapped.dispose(true);
      }
    });
  };
  dispose = () => {
    if (this.suspense) {
      lazySetDelete(this.parent, "roots", this.roots);
    }
    this.cache.forEach((mapped) => {
      mapped.dispose(true);
    });
    this.pool.forEach((mapped) => {
      mapped.dispose(true);
    });
  };
  map = (values) => {
    const { cache, fn, fnWithIndex } = this;
    const cacheNext = new Map;
    const results = new Array(values.length);
    const pool = this.pool;
    const pooled = this.pooled;
    let resultsCached = true;
    let resultsUncached = true;
    let leftovers = [];
    if (cache.size) {
      for (let i = 0, l = values.length;i < l; i++) {
        const value = values[i];
        const cached = cache.get(value);
        if (cached) {
          resultsUncached = false;
          cache.delete(value);
          cacheNext.set(value, cached);
          cached.index?.set(i);
          results[i] = cached.result;
        } else {
          leftovers.push(i);
        }
      }
    } else {
      leftovers = new Array(results.length);
    }
    outer:
      for (let i = 0, l = leftovers.length;i < l; i++) {
        const index = leftovers[i] || i;
        const value = values[index];
        const isDuplicate = cacheNext.has(value);
        if (!isDuplicate) {
          for (const [key, mapped2] of cache.entries()) {
            cache.delete(key);
            cacheNext.set(value, mapped2);
            mapped2.index?.set(index);
            mapped2.value?.set(value);
            results[index] = mapped2.result;
            continue outer;
          }
        }
        resultsCached = false;
        let mapped;
        if (pooled && pool.length) {
          mapped = pool.pop();
          mapped.index?.set(index);
          mapped.value?.set(value);
          mapped.suspended?.set(false);
          results[index] = mapped.result;
        } else {
          mapped = new MappedRoot2(false);
          mapped.wrap(() => {
            let $index = DUMMY_INDEX2;
            if (fnWithIndex) {
              mapped.index = new observable_default(index);
              $index = readable(mapped.index);
            }
            const observable5 = mapped.value = new observable_default(value);
            const suspended = pooled ? new observable_default(false) : undefined;
            const $value = memo_default2(() => get_default(observable5.get()));
            const result = results[index] = suspended ? suspense_default2(() => suspended.get(), () => resolve_default(fn($value, $index))) : resolve_default(fn($value, $index));
            mapped.value = observable5;
            mapped.result = result;
            mapped.suspended = suspended;
          });
        }
        if (isDuplicate) {
          cleanup_default(() => mapped.dispose(true));
        } else {
          cacheNext.set(value, mapped);
        }
      }
    this.poolMaxSize = Math.max(this.poolMaxSize, results.length);
    this.cleanup();
    this.cache = cacheNext;
    if (resultsCached) {
      results[SYMBOL_CACHED] = true;
    }
    if (resultsUncached) {
      results[SYMBOL_UNCACHED] = true;
    }
    return results;
  };
  roots = () => {
    return [...this.cache.values(), ...this.pool.values()];
  };
}
var for_cache_unkeyed_default = CacheUnkeyed;

// libraries/solenopsys/converged-reactive/src/methods/is_store.ts
var isStore = (value) => {
  return isObject(value) && SYMBOL_STORE in value;
};
var is_store_default = isStore;

// libraries/solenopsys/converged-reactive/src/methods/untrack.ts
var untrackImpl = (fn) => {
  if (isFunction(fn)) {
    const observerPrev = OBSERVER;
    if (observerPrev) {
      try {
        setObserver(undefined);
        return fn();
      } finally {
        setObserver(observerPrev);
      }
    } else {
      return fn();
    }
  } else {
    return fn;
  }
};
var untrack = untrackImpl;
var untrack_default = untrack;

// libraries/solenopsys/converged-reactive/src/methods/for.ts
var _for = function(values, fn, fallback = [], options) {
  if (isArray(values) && !is_store_default(values)) {
    const isUnkeyed = !!options?.unkeyed;
    return frozen(untrack_default(() => {
      if (values.length) {
        return values.map((value, index) => {
          return resolve_default(fn(isUnkeyed && !is_observable_default(value) ? frozen(value) : value, index));
        });
      } else {
        return resolve_default(fallback);
      }
    }));
  } else {
    const { dispose, map } = options?.unkeyed ? new for_cache_unkeyed_default(fn, !!options.pooled) : new for_cache_keyed_default(fn);
    cleanup_default(dispose);
    const value = memo_default2(() => {
      return get_default(values) ?? [];
    }, {
      equals: (next, prev) => {
        return !!next && !!prev && !next.length && !prev.length && !is_store_default(next) && !is_store_default(prev);
      }
    });
    return memo_default2(() => {
      const array = value();
      if (is_store_default(array)) {
        array[SYMBOL_STORE_VALUES];
      }
      return untrack_default(() => {
        const results = map(array);
        return results?.length ? results : resolve_default(fallback);
      });
    }, {
      equals: (next, prev) => {
        return isArray(next) && !!next[SYMBOL_CACHED] && isArray(prev) && isEqual(next, prev);
      }
    });
  }
};
var for_default = _for;

// libraries/solenopsys/converged-reactive/src/methods/warmup.ts
var warmup = (value) => {
  untrack_default(value);
  return value;
};
var warmup_default = warmup;

// libraries/solenopsys/converged-reactive/src/methods/switch.ts
var _switch = function(when, values, fallback) {
  const isDynamic = isFunction(when) && !is_observable_frozen_default(when) && !is_untracked_default(when);
  if (isDynamic) {
    if (is_observable_boolean_default(when)) {
      return memo_default2(() => resolve_default(match(when(), values, fallback)));
    }
    const value = warmup_default(memo_default2(() => match(when(), values, fallback)));
    if (is_observable_frozen_default(value)) {
      return frozen(resolve_default(value()));
    } else {
      return memo_default2(() => resolve_default(get_default(value)));
    }
  } else {
    const value = match(get_default(when), values, fallback);
    return frozen(resolve_default(value));
  }
};
var match = (condition, values, fallback) => {
  for (let i = 0, l = values.length;i < l; i++) {
    const value = values[i];
    if (value.length === 1)
      return value[0];
    if (is(value[0], condition))
      return value[1];
  }
  return fallback;
};
var switch_default = _switch;

// libraries/solenopsys/converged-reactive/src/methods/ternary.ts
var ternary = (when, valueTrue, valueFalse) => {
  const condition = boolean_default(when);
  return switch_default(condition, [[true, valueTrue], [valueFalse]]);
};
var ternary_default = ternary;

// libraries/solenopsys/converged-reactive/src/methods/if.ts
var _if = function(when, valueTrue, valueFalse) {
  return ternary_default(when, valueTrue, valueFalse);
};
var if_default = _if;

// libraries/solenopsys/converged-reactive/src/methods/is_batching.ts
var isBatching = () => {
  return !!BATCH || scheduler_async_default.queued || scheduler_async_default.locked || scheduler_sync_default.locked;
};
var is_batching_default = isBatching;

// libraries/solenopsys/converged-reactive/src/methods/observable.ts
var observable6 = (value, options) => {
  return writable(new observable_default(value, options));
};
var observable_default2 = observable6;

// libraries/solenopsys/converged-reactive/src/methods/owner.ts
var owner6 = () => {
  const isSuperRoot = OWNER instanceof superroot_default;
  const isRoot = OWNER instanceof root_default;
  const isSuspense = OWNER instanceof suspense_default;
  const isComputation = OWNER instanceof observer_default;
  return { isSuperRoot, isRoot, isSuspense, isComputation };
};
var owner_default2 = owner6;

// libraries/solenopsys/converged-reactive/src/methods/is_observable_writable.ts
var isObservableWritable = (value) => {
  return isFunction(value) && SYMBOL_OBSERVABLE_WRITABLE in value;
};
var is_observable_writable_default = isObservableWritable;

// libraries/solenopsys/converged-reactive/src/methods/target.ts
var target = (observable7) => {
  if (isFunction(observable7)) {
    return observable7[SYMBOL_OBSERVABLE_READABLE] || observable7[SYMBOL_OBSERVABLE_WRITABLE] || UNAVAILABLE;
  } else {
    return observable7;
  }
};
var target_default = target;

// libraries/solenopsys/converged-reactive/src/methods/readonly.ts
var readonly = (observable7) => {
  if (is_observable_writable_default(observable7)) {
    return readable(target_default(observable7));
  } else {
    return observable7;
  }
};
var readonly_default = readonly;

// libraries/solenopsys/converged-reactive/src/methods/root.ts
var root5 = (fn) => {
  return new root_default(true).wrap(fn);
};
var root_default2 = root5;

// libraries/solenopsys/converged-reactive/src/methods/selector.ts
class DisposableMap extends Map {
  constructor() {
    super(...arguments);
  }
  disposed = false;
}

class SelectedObservable extends observable_default {
  constructor() {
    super(...arguments);
  }
  count = 1;
  selecteds;
  source;
  call() {
    if (this.selecteds.disposed)
      return;
    this.count -= 1;
    if (this.count)
      return;
    this.selecteds.delete(this.source);
  }
}
var selector = (source) => {
  source = warmup_default(memo_default2(source));
  if (is_observable_frozen_default(source)) {
    const sourceValue = untrack_default(source);
    return (value) => {
      return value === sourceValue ? OBSERVABLE_TRUE : OBSERVABLE_FALSE;
    };
  }
  let selecteds = new DisposableMap;
  let selectedValue = untrack_default(source);
  effect_default2(() => {
    const valuePrev = selectedValue;
    const valueNext = source();
    if (is(valuePrev, valueNext))
      return;
    selectedValue = valueNext;
    selecteds.get(valuePrev)?.set(false);
    selecteds.get(valueNext)?.set(true);
  }, { suspense: false, sync: true });
  const cleanupAll = () => {
    selecteds.disposed = true;
  };
  cleanup_default(cleanupAll);
  return (value) => {
    let selected = selecteds.get(value);
    if (selected) {
      selected.count += 1;
    } else {
      selected = new SelectedObservable(value === selectedValue);
      selected.selecteds = selecteds;
      selected.source = value;
      selecteds.set(value, selected);
    }
    cleanup_default(selected);
    return readable(selected);
  };
};
var selector_default = selector;

// libraries/solenopsys/converged-reactive/src/methods/store.ts
class StoreMap extends Map {
  constructor() {
    super(...arguments);
  }
  insert(key, value) {
    super.set(key, value);
    return value;
  }
}

class StoreCleanable {
  count = 0;
  listen() {
    this.count += 1;
    cleanup_default(this);
  }
  call() {
    this.count -= 1;
    if (this.count)
      return;
    this.dispose();
  }
  dispose() {
  }
}

class StoreKeys extends StoreCleanable {
  parent;
  observable9;
  constructor(parent, observable9) {
    super();
    this.parent = parent;
    this.observable = observable9;
  }
  dispose() {
    this.parent.keys = undefined;
  }
}

class StoreValues extends StoreCleanable {
  parent;
  observable9;
  constructor(parent, observable9) {
    super();
    this.parent = parent;
    this.observable = observable9;
  }
  dispose() {
    this.parent.values = undefined;
  }
}

class StoreHas extends StoreCleanable {
  parent;
  key;
  observable9;
  constructor(parent, key, observable9) {
    super();
    this.parent = parent;
    this.key = key;
    this.observable = observable9;
  }
  dispose() {
    this.parent.has?.delete(this.key);
  }
}

class StoreProperty extends StoreCleanable {
  parent;
  key;
  observable9;
  node;
  constructor(parent, key, observable9, node) {
    super();
    this.parent = parent;
    this.key = key;
    this.observable = observable9;
    this.node = node;
  }
  dispose() {
    this.parent.properties?.delete(this.key);
  }
}
var StoreListenersRegular = {
  active: 0,
  listeners: new Set,
  nodes: new Set,
  prepare: () => {
    const { listeners, nodes } = StoreListenersRegular;
    const traversed = new Set;
    const traverse = (node) => {
      if (traversed.has(node))
        return;
      traversed.add(node);
      lazySetEach(node.parents, traverse);
      lazySetEach(node.listenersRegular, (listener) => {
        listeners.add(listener);
      });
    };
    nodes.forEach(traverse);
    return () => {
      listeners.forEach((listener) => {
        listener();
      });
    };
  },
  register: (node) => {
    StoreListenersRegular.nodes.add(node);
    StoreScheduler.schedule();
  },
  reset: () => {
    StoreListenersRegular.listeners = new Set;
    StoreListenersRegular.nodes = new Set;
  }
};
var StoreListenersRoots = {
  active: 0,
  nodes: new Map,
  prepare: () => {
    const { nodes } = StoreListenersRoots;
    return () => {
      nodes.forEach((rootsSet, store) => {
        const roots = Array.from(rootsSet);
        lazySetEach(store.listenersRoots, (listener) => {
          listener(roots);
        });
      });
    };
  },
  register: (store, root6) => {
    const roots = StoreListenersRoots.nodes.get(store) || new Set;
    roots.add(root6);
    StoreListenersRoots.nodes.set(store, roots);
    StoreScheduler.schedule();
  },
  registerWith: (current, parent, key) => {
    if (!parent.parents) {
      const root6 = current?.store || untrack_default(() => parent.store[key]);
      StoreListenersRoots.register(parent, root6);
    } else {
      const traversed = new Set;
      const traverse = (node) => {
        if (traversed.has(node))
          return;
        traversed.add(node);
        lazySetEach(node.parents, (parent2) => {
          if (!parent2.parents) {
            StoreListenersRoots.register(parent2, node.store);
          }
          traverse(parent2);
        });
      };
      traverse(current || parent);
    }
  },
  reset: () => {
    StoreListenersRoots.nodes = new Map;
  }
};
var StoreScheduler = {
  active: false,
  flush: () => {
    const flushRegular = StoreListenersRegular.prepare();
    const flushRoots = StoreListenersRoots.prepare();
    StoreScheduler.reset();
    flushRegular();
    flushRoots();
  },
  flushIfNotBatching: () => {
    if (is_batching_default()) {
      if (BATCH) {
        BATCH.finally(StoreScheduler.flushIfNotBatching);
      } else {
        setTimeout(StoreScheduler.flushIfNotBatching, 0);
      }
    } else {
      StoreScheduler.flush();
    }
  },
  reset: () => {
    StoreScheduler.active = false;
    StoreListenersRegular.reset();
    StoreListenersRoots.reset();
  },
  schedule: () => {
    if (StoreScheduler.active)
      return;
    StoreScheduler.active = true;
    queueMicrotask(StoreScheduler.flushIfNotBatching);
  }
};
var NODES = new WeakMap;
var SPECIAL_SYMBOLS = new Set([
  SYMBOL_STORE,
  SYMBOL_STORE_KEYS,
  SYMBOL_STORE_OBSERVABLE,
  SYMBOL_STORE_TARGET,
  SYMBOL_STORE_VALUES
]);
var UNREACTIVE_KEYS = new Set([
  "__proto__",
  "__defineGetter__",
  "__defineSetter__",
  "__lookupGetter__",
  "__lookupSetter__",
  "prototype",
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toSource",
  "toString",
  "valueOf"
]);
var STORE_TRAPS = {
  get: (target3, key) => {
    if (SPECIAL_SYMBOLS.has(key)) {
      if (key === SYMBOL_STORE)
        return true;
      if (key === SYMBOL_STORE_TARGET)
        return target3;
      if (key === SYMBOL_STORE_KEYS) {
        if (isListenable()) {
          const node2 = getNodeExisting(target3);
          node2.keys ||= getNodeKeys(node2);
          node2.keys.listen();
          node2.keys.observable.get();
        }
        return;
      }
      if (key === SYMBOL_STORE_VALUES) {
        if (isListenable()) {
          const node2 = getNodeExisting(target3);
          node2.values ||= getNodeValues(node2);
          node2.values.listen();
          node2.values.observable.get();
        }
        return;
      }
      if (key === SYMBOL_STORE_OBSERVABLE) {
        return (key2) => {
          key2 = typeof key2 === "number" ? String(key2) : key2;
          const node2 = getNodeExisting(target3);
          const getter2 = node2.getters?.get(key2);
          if (getter2)
            return getter2.bind(node2.store);
          node2.properties ||= new StoreMap;
          const value2 = target3[key2];
          const property2 = node2.properties.get(key2) || node2.properties.insert(key2, getNodeProperty(node2, key2, value2));
          const options = node2.equals ? { equals: node2.equals } : undefined;
          property2.observable ||= getNodeObservable(node2, value2, options);
          const observable9 = readable(property2.observable);
          return observable9;
        };
      }
    }
    if (UNREACTIVE_KEYS.has(key))
      return target3[key];
    const node = getNodeExisting(target3);
    const getter = node.getters?.get(key);
    const value = getter || target3[key];
    node.properties ||= new StoreMap;
    const listenable = isListenable();
    const proxiable = isProxiable(value);
    const property = listenable || proxiable ? node.properties.get(key) || node.properties.insert(key, getNodeProperty(node, key, value)) : undefined;
    if (property?.node) {
      lazySetAdd(property.node, "parents", node);
    }
    if (property && listenable) {
      const options = node.equals ? { equals: node.equals } : undefined;
      property.listen();
      property.observable ||= getNodeObservable(node, value, options);
      property.observable.get();
    }
    if (getter) {
      return getter.call(node.store);
    } else {
      if (typeof value === "function" && value === Array.prototype[key]) {
        return function() {
          return value.apply(node.store, arguments);
        };
      }
      return property?.node?.store || value;
    }
  },
  set: (target3, key, value) => {
    value = getTarget(value);
    const node = getNodeExisting(target3);
    const setter = node.setters?.get(key);
    if (setter) {
      setter.call(node.store, value);
    } else {
      const valuePrev = target3[key];
      const hadProperty = !!valuePrev || key in target3;
      const equals = node.equals || is;
      if (hadProperty && equals(value, valuePrev) && (key !== "length" || !Array.isArray(target3)))
        return true;
      target3[key] = value;
      node.values?.observable.set(0);
      if (!hadProperty) {
        node.keys?.observable.set(0);
        node.has?.get(key)?.observable.set(true);
      }
      const property = node.properties?.get(key);
      if (property?.node) {
        lazySetDelete(property.node, "parents", node);
      }
      if (property) {
        property.observable?.set(value);
        property.node = isProxiable(value) ? NODES.get(value) || getNode(value, node) : undefined;
      }
      if (property?.node) {
        lazySetAdd(property.node, "parents", node);
      }
      if (StoreListenersRoots.active) {
        StoreListenersRoots.registerWith(property?.node, node, key);
      }
      if (StoreListenersRegular.active) {
        StoreListenersRegular.register(node);
      }
    }
    return true;
  },
  deleteProperty: (target3, key) => {
    const hasProperty = key in target3;
    if (!hasProperty)
      return true;
    const deleted = Reflect.deleteProperty(target3, key);
    if (!deleted)
      return false;
    const node = getNodeExisting(target3);
    node.keys?.observable.set(0);
    node.values?.observable.set(0);
    node.has?.get(key)?.observable.set(false);
    const property = node.properties?.get(key);
    if (StoreListenersRoots.active) {
      StoreListenersRoots.registerWith(property?.node, node, key);
    }
    if (property?.node) {
      lazySetDelete(property.node, "parents", node);
    }
    if (property) {
      property.observable?.set(undefined);
      property.node = undefined;
    }
    if (StoreListenersRegular.active) {
      StoreListenersRegular.register(node);
    }
    return true;
  },
  defineProperty: (target3, key, descriptor) => {
    const node = getNodeExisting(target3);
    const equals = node.equals || is;
    const hadProperty = key in target3;
    const descriptorPrev = Reflect.getOwnPropertyDescriptor(target3, key);
    if ("value" in descriptor && is_store_default(descriptor.value)) {
      descriptor = { ...descriptor, value: getTarget(descriptor.value) };
    }
    if (descriptorPrev && isEqualDescriptor(descriptorPrev, descriptor, equals))
      return true;
    const defined = Reflect.defineProperty(target3, key, descriptor);
    if (!defined)
      return false;
    if (!descriptor.get) {
      node.getters?.delete(key);
    } else if (descriptor.get) {
      node.getters ||= new StoreMap;
      node.getters.set(key, descriptor.get);
    }
    if (!descriptor.set) {
      node.setters?.delete(key);
    } else if (descriptor.set) {
      node.setters ||= new StoreMap;
      node.setters.set(key, descriptor.set);
    }
    if (hadProperty !== !!descriptor.enumerable) {
      node.keys?.observable.set(0);
    }
    node.has?.get(key)?.observable.set(true);
    const property = node.properties?.get(key);
    if (StoreListenersRoots.active) {
      StoreListenersRoots.registerWith(property?.node, node, key);
    }
    if (property?.node) {
      lazySetDelete(property.node, "parents", node);
    }
    if (property) {
      if ("get" in descriptor) {
        property.observable?.set(descriptor.get);
        property.node = undefined;
      } else {
        const value = descriptor.value;
        property.observable?.set(value);
        property.node = isProxiable(value) ? NODES.get(value) || getNode(value, node) : undefined;
      }
    }
    if (property?.node) {
      lazySetAdd(property.node, "parents", node);
    }
    if (StoreListenersRoots.active) {
      StoreListenersRoots.registerWith(property?.node, node, key);
    }
    if (StoreListenersRegular.active) {
      StoreListenersRegular.register(node);
    }
    return true;
  },
  has: (target3, key) => {
    if (key === SYMBOL_STORE)
      return true;
    if (key === SYMBOL_STORE_TARGET)
      return true;
    const value = key in target3;
    if (isListenable()) {
      const node = getNodeExisting(target3);
      node.has ||= new StoreMap;
      const has = node.has.get(key) || node.has.insert(key, getNodeHas(node, key, value));
      has.listen();
      has.observable.get();
    }
    return value;
  },
  ownKeys: (target3) => {
    const keys = Reflect.ownKeys(target3);
    if (isListenable()) {
      const node = getNodeExisting(target3);
      node.keys ||= getNodeKeys(node);
      node.keys.listen();
      node.keys.observable.get();
    }
    return keys;
  }
};
var STORE_UNTRACK_TRAPS = {
  has: (target3, key) => {
    if (key === SYMBOL_STORE_UNTRACKED)
      return true;
    return key in target3;
  }
};
var getNode = (value, parent, equals) => {
  const store = new Proxy(value, STORE_TRAPS);
  const gettersAndSetters = getGettersAndSetters(value);
  const node = { parents: parent, store };
  if (gettersAndSetters) {
    const { getters, setters } = gettersAndSetters;
    if (getters)
      node.getters = getters;
    if (setters)
      node.setters = setters;
  }
  if (equals === false) {
    node.equals = nope;
  } else if (equals) {
    node.equals = equals;
  } else if (parent?.equals) {
    node.equals = parent.equals;
  }
  NODES.set(value, node);
  return node;
};
var getNodeExisting = (value) => {
  const node = NODES.get(value);
  if (!node)
    throw new Error("Impossible");
  return node;
};
var getNodeFromStore = (store) => {
  return getNodeExisting(getTarget(store));
};
var getNodeKeys = (node) => {
  const observable9 = getNodeObservable(node, 0, { equals: false });
  const keys = new StoreKeys(node, observable9);
  return keys;
};
var getNodeValues = (node) => {
  const observable9 = getNodeObservable(node, 0, { equals: false });
  const values = new StoreValues(node, observable9);
  return values;
};
var getNodeHas = (node, key, value) => {
  const observable9 = getNodeObservable(node, value);
  const has = new StoreHas(node, key, observable9);
  return has;
};
var getNodeObservable = (node, value, options) => {
  return new observable_default(value, options);
};
var getNodeProperty = (node, key, value) => {
  const observable9 = undefined;
  const propertyNode = isProxiable(value) ? NODES.get(value) || getNode(value, node) : undefined;
  const property = new StoreProperty(node, key, observable9, propertyNode);
  node.properties ||= new StoreMap;
  node.properties.set(key, property);
  return property;
};
var getGettersAndSetters = (value) => {
  if (isArray(value))
    return;
  let getters;
  let setters;
  const keys = Object.keys(value);
  for (let i = 0, l = keys.length;i < l; i++) {
    const key = keys[i];
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor)
      continue;
    const { get: get6, set } = descriptor;
    if (get6) {
      getters ||= new StoreMap;
      getters.set(key, get6);
    }
    if (set) {
      setters ||= new StoreMap;
      setters.set(key, set);
    }
  }
  if (!getters && !setters)
    return;
  return { getters, setters };
};
var getStore = (value, options) => {
  if (is_store_default(value))
    return value;
  const node = NODES.get(value) || getNode(value, undefined, options?.equals);
  return node.store;
};
var getTarget = (value) => {
  if (is_store_default(value))
    return value[SYMBOL_STORE_TARGET];
  return value;
};
var getUntracked = (value) => {
  if (!isObject(value))
    return value;
  if (isUntracked2(value))
    return value;
  return new Proxy(value, STORE_UNTRACK_TRAPS);
};
var isEqualDescriptor = (a, b, equals) => {
  return !!a.configurable === !!b.configurable && !!a.enumerable === !!b.enumerable && !!a.writable === !!b.writable && equals(a.value, b.value) && a.get === b.get && a.set === b.set;
};
var isListenable = () => {
  return !!OBSERVER;
};
var isProxiable = (value) => {
  if (value === null || typeof value !== "object")
    return false;
  if (SYMBOL_STORE in value)
    return true;
  if (SYMBOL_STORE_UNTRACKED in value)
    return false;
  if (isArray(value))
    return true;
  const prototype = Object.getPrototypeOf(value);
  if (prototype === null)
    return true;
  return Object.getPrototypeOf(prototype) === null;
};
var isUntracked2 = (value) => {
  if (value === null || typeof value !== "object")
    return false;
  return SYMBOL_STORE_UNTRACKED in value;
};
var store = (value, options) => {
  if (!isObject(value))
    return value;
  if (isUntracked2(value))
    return value;
  return getStore(value, options);
};
store.on = (target3, listener) => {
  const targets = is_store_default(target3) ? [target3] : castArray(target3);
  const selectors = targets.filter(isFunction);
  const nodes = targets.filter(is_store_default).map(getNodeFromStore);
  StoreListenersRegular.active += 1;
  const disposers = selectors.map((selector2) => {
    let inited = false;
    return effect_default2(() => {
      if (inited) {
        StoreListenersRegular.listeners.add(listener);
        StoreScheduler.schedule();
      }
      inited = true;
      selector2();
    }, { suspense: false, sync: true });
  });
  nodes.forEach((node) => {
    lazySetAdd(node, "listenersRegular", listener);
  });
  return () => {
    StoreListenersRegular.active -= 1;
    disposers.forEach((disposer) => {
      disposer();
    });
    nodes.forEach((node) => {
      lazySetDelete(node, "listenersRegular", listener);
    });
  };
};
store._onRoots = (target3, listener) => {
  if (!is_store_default(target3))
    return noop;
  const node = getNodeFromStore(target3);
  if (node.parents)
    throw new Error("Only top-level stores are supported");
  StoreListenersRoots.active += 1;
  lazySetAdd(node, "listenersRoots", listener);
  return () => {
    StoreListenersRoots.active -= 1;
    lazySetDelete(node, "listenersRoots", listener);
  };
};
store.reconcile = (() => {
  const getType = (value) => {
    if (isArray(value))
      return 1;
    if (isProxiable(value))
      return 2;
    return 0;
  };
  const reconcileOuter = (prev, next) => {
    const uprev = getTarget(prev);
    const unext = getTarget(next);
    reconcileInner(prev, next);
    const prevType = getType(uprev);
    const nextType = getType(unext);
    if (prevType === 1 || nextType === 1) {
      prev.length = next.length;
    }
    return prev;
  };
  const reconcileInner = (prev, next) => {
    const uprev = getTarget(prev);
    const unext = getTarget(next);
    const prevKeys = Object.keys(uprev);
    const nextKeys = Object.keys(unext);
    for (let i = 0, l = nextKeys.length;i < l; i++) {
      const key = nextKeys[i];
      const prevValue = uprev[key];
      const nextValue = unext[key];
      if (!is(prevValue, nextValue)) {
        const prevType = getType(prevValue);
        const nextType = getType(nextValue);
        if (prevType && prevType === nextType) {
          reconcileInner(prev[key], nextValue);
          if (prevType === 1) {
            prev[key].length = nextValue.length;
          }
        } else {
          prev[key] = nextValue;
        }
      } else if (prevValue === undefined && !(key in uprev)) {
        prev[key] = undefined;
      }
    }
    for (let i = 0, l = prevKeys.length;i < l; i++) {
      const key = prevKeys[i];
      if (!(key in unext)) {
        delete prev[key];
      }
    }
    return prev;
  };
  const reconcile = (prev, next) => {
    return untrack_default(() => {
      return reconcileOuter(prev, next);
    });
  };
  return reconcile;
})();
store.untrack = (value) => {
  return getUntracked(value);
};
store.unwrap = (value) => {
  return getTarget(value);
};
var store_default = store;

// libraries/solenopsys/converged-reactive/src/methods/suspended.ts
var suspended = () => {
  const suspense5 = OWNER.get(SYMBOL_SUSPENSE);
  if (!suspense5)
    return OBSERVABLE_FALSE;
  const observable10 = suspense5.observable ||= new observable_default(!!suspense5.suspended);
  return readable(observable10);
};
var suspended_default = suspended;

// libraries/solenopsys/converged-reactive/src/methods/tick.ts
var tick = () => {
  scheduler_async_default.flush();
};
var tick_default = tick;

// libraries/solenopsys/converged-reactive/src/methods/try_catch.ts
var tryCatch = (value, fn) => {
  const observable11 = observable_default2();
  return memo_default2(() => {
    const error = observable11();
    if (error) {
      const reset = () => observable11(undefined);
      const options = { error, reset };
      return resolve_default(fn(options));
    } else {
      OWNER.errorHandler = observable11;
      return resolve_default(value);
    }
  });
};
var try_catch_default = tryCatch;

// libraries/solenopsys/converged-reactive/src/methods/untracked.ts
var untracked = (fn) => {
  const untracked2 = isFunction(fn) ? (...args) => untrack_default(() => fn(...args)) : () => fn;
  untracked2[SYMBOL_UNTRACKED] = true;
  return untracked2;
};
var untracked_default = untracked;

// libraries/solenopsys/converged-reactive/src/methods/with.ts
var _with = () => {
  const owner7 = OWNER;
  const observer4 = OBSERVER;
  return (fn) => {
    return owner7.wrap(() => fn(), owner7, observer4);
  };
};
var with_default = _with;

// libraries/solenopsys/converged-reactive/src/methods/$.ts
var $ = function(value, options) {
  return writable(new observable_default(value, options));
};
$.batch = batch_default;
$.boolean = boolean_default;
$.cleanup = cleanup_default;
$.context = context_default2;
$.disposed = disposed_default;
$.effect = effect_default2;
$.for = for_default;
$.get = get_default;
$.if = if_default;
$.isBatching = is_batching_default;
$.isObservable = is_observable_default;
$.isStore = is_store_default;
$.memo = memo_default2;
$.observable = observable_default2;
$.owner = owner_default2;
$.readonly = readonly_default;
$.resolve = resolve_default;
$.root = root_default2;
$.selector = selector_default;
$.store = store_default;
$.suspended = suspended_default;
$.suspense = suspense_default2;
$.switch = switch_default;
$.ternary = ternary_default;
$.tick = tick_default;
$.tryCatch = try_catch_default;
$.untrack = untrack_default;
$.untracked = untracked_default;
$.with = with_default;
var $_default = $;

// libraries/solenopsys/converged-reactive/src/index.ts
var src_default = $_default;
export {
  with_default as with,
  untracked_default as untracked,
  untrack_default as untrack,
  try_catch_default as tryCatch,
  tick_default as tick,
  ternary_default as ternary,
  switch_default as switch,
  suspense_default2 as suspense,
  suspended_default as suspended,
  store_default as store,
  selector_default as selector,
  root_default2 as root,
  resolve_default as resolve,
  readonly_default as readonly,
  owner_default2 as owner,
  observable_default2 as observable,
  memo_default2 as memo,
  is_store_default as isStore,
  is_observable_default as isObservable,
  is_batching_default as isBatching,
  if_default as if,
  get_default as get,
  for_default as for,
  effect_default2 as effect,
  disposed_default as disposed,
  src_default as default,
  context_default2 as context,
  cleanup_default as cleanup,
  boolean_default as boolean,
  batch_default as batch,
  SYMBOL_UNTRACKED_UNWRAPPED,
  SYMBOL_UNTRACKED,
  SYMBOL_UNCACHED,
  SYMBOL_STORE_VALUES,
  SYMBOL_STORE_TARGET,
  SYMBOL_STORE_OBSERVABLE,
  SYMBOL_STORE_KEYS,
  SYMBOL_STORE,
  SYMBOL_OBSERVABLE_WRITABLE,
  SYMBOL_OBSERVABLE_READABLE,
  SYMBOL_OBSERVABLE_FROZEN,
  SYMBOL_OBSERVABLE_BOOLEAN,
  SYMBOL_OBSERVABLE
};
