// libraries/solenopsys/converged-renderer/src/methods/is_server.ts
var IS_BROWSER = !!globalThis.CDATASection?.toString?.().match(/^\s*function\s+CDATASection\s*\(\s*\)\s*\{\s*\[native code\]\s*\}\s*$/);
var isServer = () => {
  return !IS_BROWSER;
};
var is_server_default = isServer;

// libraries/solenopsys/converged-renderer/src/hooks/use_memo.ts
import {memo} from "@solenopsys/converged-reactive";
var use_memo_default = memo;

// libraries/solenopsys/converged-renderer/src/methods/untrack.ts
import {untrack} from "@solenopsys/converged-reactive";
var untrack_default = untrack;

// libraries/solenopsys/converged-renderer/src/constants.ts
import {
SYMBOL_OBSERVABLE,
SYMBOL_OBSERVABLE_FROZEN,
SYMBOL_OBSERVABLE_READABLE,
SYMBOL_UNCACHED,
SYMBOL_UNTRACKED,
SYMBOL_UNTRACKED_UNWRAPPED
} from "@solenopsys/converged-reactive";
var CONTEXTS_DATA = new WeakMap;
var DIRECTIVES = {};
var SYMBOL_SUSPENSE = Symbol("Suspense");
var SYMBOL_SUSPENSE_COLLECTOR = Symbol("Suspense.Collector");
var SYMBOL_TEMPLATE_ACCESSOR = Symbol("Template.Accessor");
var SYMBOLS_DIRECTIVES = {};

// libraries/solenopsys/converged-renderer/src/methods/wrap_element.ts
var wrapElement = (element) => {
  element[SYMBOL_UNTRACKED_UNWRAPPED] = true;
  return element;
};
var wrap_element_default = wrapElement;

// libraries/solenopsys/converged-renderer/src/utils/creators.ts
var createComment = document.createComment.bind(document, "");
var createHTMLNode = document.createElement.bind(document);
var createSVGNode = document.createElementNS.bind(document, "http://www.w3.org/2000/svg");
var createText = document.createTextNode.bind(document);

// libraries/solenopsys/converged-renderer/src/utils/lang.ts
var { assign } = Object;
var castArray = (value) => {
  return isArray(value) ? value : [value];
};
var castError = (exception) => {
  if (isError(exception))
    return exception;
  if (isString(exception))
    return new Error(exception);
  return new Error("Unknown error");
};
var flatten = (arr) => {
  for (let i = 0, l = arr.length;i < l; i++) {
    if (!isArray(arr[i]))
      continue;
    return arr.flat(Infinity);
  }
  return arr;
};
var indexOf = (() => {
  const _indexOf = Array.prototype.indexOf;
  return (arr, value) => {
    return _indexOf.call(arr, value);
  };
})();
var { isArray } = Array;
var isBoolean = (value) => {
  return typeof value === "boolean";
};
var isComponent = (value) => {
  return isFunction(value) && SYMBOL_UNTRACKED_UNWRAPPED in value;
};
var isError = (value) => {
  return value instanceof Error;
};
var isFunction = (value) => {
  return typeof value === "function";
};
var isFunctionReactive = (value) => {
  return !((SYMBOL_UNTRACKED in value) || (SYMBOL_UNTRACKED_UNWRAPPED in value) || (SYMBOL_OBSERVABLE_FROZEN in value) || value[SYMBOL_OBSERVABLE_READABLE]?.parent?.disposed);
};
var isNil = (value) => {
  return value === null || value === undefined;
};
var isNode = (value) => {
  return value instanceof Node;
};
var isObject = (value) => {
  return typeof value === "object" && value !== null;
};
var isPromise = (value) => {
  return value instanceof Promise;
};
var isString = (value) => {
  return typeof value === "string";
};
var isSVG = (value) => {
  return !!value["isSVG"];
};
var isSVGElement = (() => {
  const svgRe = /^(t(ext$|s)|s[vwy]|g)|^set|tad|ker|p(at|s)|s(to|c$|ca|k)|r(ec|cl)|ew|us|f($|e|s)|cu|n[ei]|l[ty]|[GOP]/;
  const svgCache = {};
  return (element) => {
    const cached = svgCache[element];
    return cached !== undefined ? cached : svgCache[element] = !element.includes("-") && svgRe.test(element);
  };
})();
var isTemplateAccessor = (value) => {
  return isFunction(value) && SYMBOL_TEMPLATE_ACCESSOR in value;
};
var isTruthy = (value) => {
  return !!value;
};
var isVoidChild = (value) => {
  return value === null || value === undefined || typeof value === "boolean" || typeof value === "symbol";
};
var once = (fn) => {
  let called = false;
  let result;
  return () => {
    if (!called) {
      called = true;
      result = fn();
    }
    return result;
  };
};

// libraries/solenopsys/converged-renderer/src/hooks/use_cleanup.ts
import {cleanup} from "@solenopsys/converged-reactive";
var use_cleanup_default = cleanup;

// libraries/solenopsys/converged-renderer/src/hooks/use_effect.ts
import {effect} from "@solenopsys/converged-reactive";
var use_effect_default = effect;

// libraries/solenopsys/converged-renderer/src/methods/is_observable.ts
import {isObservable} from "@solenopsys/converged-reactive";
var is_observable_default = isObservable;

// libraries/solenopsys/converged-renderer/src/hooks/use_resolved.ts
var useResolved = function(values, callback, resolveFunction) {
  const isResolvable = resolveFunction !== false && callback !== false ? isFunction : is_observable_default;
  const resolve = (value) => isResolvable(value) ? value() : value;
  if (isArray(values)) {
    const resolved = values.map(resolve);
    if (isFunction(callback)) {
      return callback.apply(undefined, resolved);
    } else {
      return resolved;
    }
  } else {
    const resolved = resolve(values);
    if (isFunction(callback)) {
      return callback(resolved);
    } else {
      return resolved;
    }
  }
};
var use_resolved_default = useResolved;

// libraries/solenopsys/converged-renderer/src/methods/SS.ts
import {get} from "@solenopsys/converged-reactive";
var SS_default = get;

// libraries/solenopsys/converged-renderer/src/hooks/use_event_listener.ts
var useEventListener = function(target, event, handler, options) {
  return use_effect_default(() => {
    const fn = SS_default(handler, false);
    return use_resolved_default([target, event, options], (target2, event2, options2) => {
      const targets = castArray(target2);
      targets.forEach((target3) => {
        target3?.addEventListener(event2, fn, options2);
      });
      return () => {
        targets.forEach((target3) => {
          target3?.removeEventListener(event2, fn, options2);
        });
      };
    });
  }, { sync: "init" });
};
var use_event_listener_default = useEventListener;

// libraries/solenopsys/converged-renderer/src/hooks/use_abort_controller.ts
var useAbortController = (signals = []) => {
  signals = castArray(signals);
  const controller = new AbortController;
  const abort = controller.abort.bind(controller);
  const aborted = signals.some((signal) => signal.aborted);
  if (aborted) {
    abort();
  } else {
    signals.forEach((signal) => use_event_listener_default(signal, "abort", abort));
    use_cleanup_default(abort);
  }
  return controller;
};
var use_abort_controller_default = useAbortController;

// libraries/solenopsys/converged-renderer/src/hooks/use_abort_signal.ts
var useAbortSignal = (signals = []) => {
  return use_abort_controller_default(signals).signal;
};
var use_abort_signal_default = useAbortSignal;

// libraries/solenopsys/converged-renderer/src/hooks/use_suspended.ts
import {suspended} from "@solenopsys/converged-reactive";
var use_suspended_default = suspended;

// libraries/solenopsys/converged-renderer/src/hooks/use_scheduler.ts
var useScheduler = ({
  loop,
  once: once2,
  callback,
  cancel,
  schedule
}) => {
  let executed = false;
  let suspended2 = use_suspended_default();
  let tickId;
  const work = (value) => {
    executed = true;
    if (SS_default(loop))
      tick();
    SS_default(callback, false)(value);
  };
  const tick = () => {
    tickId = untrack_default(() => schedule(work));
  };
  const dispose = () => {
    untrack_default(() => cancel(tickId));
  };
  use_effect_default(() => {
    if (once2 && executed)
      return;
    if (suspended2())
      return;
    tick();
    return dispose;
  }, { suspense: false });
  return dispose;
};
var use_scheduler_default = useScheduler;

// libraries/solenopsys/converged-renderer/src/hooks/use_animation_frame.ts
var useAnimationFrame = (callback) => {
  return use_scheduler_default({
    callback,
    once: true,
    cancel: cancelAnimationFrame,
    schedule: requestAnimationFrame
  });
};
var use_animation_frame_default = useAnimationFrame;

// libraries/solenopsys/converged-renderer/src/hooks/use_animation_loop.ts
var useAnimationLoop = (callback) => {
  return use_scheduler_default({
    callback,
    loop: true,
    cancel: cancelAnimationFrame,
    schedule: requestAnimationFrame
  });
};
var use_animation_loop_default = useAnimationLoop;

// libraries/solenopsys/converged-renderer/src/hooks/use_boolean.ts
import {boolean} from "@solenopsys/converged-reactive";
var use_boolean_default = boolean;

// libraries/solenopsys/converged-renderer/src/hooks/use_context.ts
import {context} from "@solenopsys/converged-reactive";
var useContext = function(Context) {
  const { symbol, defaultValue } = CONTEXTS_DATA.get(Context) || {
    symbol: Symbol()
  };
  const valueContext = context(symbol);
  const value = isNil(valueContext) ? defaultValue : valueContext;
  return value;
};
var use_context_default = useContext;

// libraries/solenopsys/converged-renderer/src/hooks/use_disposed.ts
import {disposed} from "@solenopsys/converged-reactive";
var use_disposed_default = disposed;

// libraries/solenopsys/converged-renderer/src/methods/S.ts
import {observable} from "@solenopsys/converged-reactive";
var S_default = observable;

// libraries/solenopsys/converged-renderer/src/components/suspense.context.ts
import {context as context2, resolve} from "@solenopsys/converged-reactive";
var SuspenseContext = {
  create: () => {
    const count = S_default(0);
    const active = use_memo_default(() => !!count());
    const increment = (nr = 1) => count((prev) => prev + nr);
    const decrement = (nr = -1) => queueMicrotask(() => count((prev) => prev + nr));
    const data = { active, increment, decrement };
    const collector = context2(SYMBOL_SUSPENSE_COLLECTOR);
    if (collector) {
      collector?.register(data);
      use_cleanup_default(() => collector.unregister(data));
    }
    return data;
  },
  get: () => {
    return context2(SYMBOL_SUSPENSE);
  },
  wrap: (fn) => {
    const data = SuspenseContext.create();
    return context2({ [SYMBOL_SUSPENSE]: data }, () => {
      return resolve(() => fn(data));
    });
  }
};
var suspense_context_default = SuspenseContext;

// libraries/solenopsys/converged-renderer/src/components/suspense.manager.ts
class SuspenseManager {
  suspenses = new Map;
  change = (suspense2, nr) => {
    const counter = this.suspenses.get(suspense2) || 0;
    const counterNext = Math.max(0, counter + nr);
    if (counter === counterNext)
      return;
    if (counterNext) {
      this.suspenses.set(suspense2, counterNext);
    } else {
      this.suspenses.delete(suspense2);
    }
    if (nr > 0) {
      suspense2.increment(nr);
    } else {
      suspense2.decrement(nr);
    }
  };
  suspend = () => {
    const suspense2 = suspense_context_default.get();
    if (!suspense2)
      return;
    this.change(suspense2, 1);
    use_cleanup_default(() => {
      this.change(suspense2, -1);
    });
  };
  unsuspend = () => {
    this.suspenses.forEach((counter, suspense2) => {
      this.change(suspense2, -counter);
    });
  };
}
var suspense_manager_default = SuspenseManager;

// libraries/solenopsys/converged-renderer/src/hooks/use_readonly.ts
import {readonly} from "@solenopsys/converged-reactive";
var use_readonly_default = readonly;

// libraries/solenopsys/converged-renderer/src/hooks/use_render_effect.ts
var options = {
  sync: "init"
};
var useRenderEffect = (fn) => {
  return use_effect_default(fn, options);
};
var use_render_effect_default = useRenderEffect;

// libraries/solenopsys/converged-renderer/src/hooks/use_resource.ts
var useResource = (fetcher) => {
  const pending = S_default(true);
  const error = S_default();
  const value = S_default();
  const latest = S_default();
  const { suspend, unsuspend } = new suspense_manager_default;
  const resourcePending = {
    pending: true,
    get value() {
      return void suspend();
    },
    get latest() {
      return latest() ?? void suspend();
    }
  };
  const resourceRejected = {
    pending: false,
    get error() {
      return error();
    },
    get value() {
      throw error();
    },
    get latest() {
      throw error();
    }
  };
  const resourceResolved = {
    pending: false,
    get value() {
      return value();
    },
    get latest() {
      return value();
    }
  };
  const resourceFunction = {
    pending: () => pending(),
    error: () => error(),
    value: () => resource()?.value,
    latest: () => resource()?.latest
  };
  const resource = S_default(resourcePending);
  use_render_effect_default(() => {
    const disposed2 = use_cheap_disposed_default();
    const onPending = () => {
      pending(true);
      error(undefined);
      value(undefined);
      resource(resourcePending);
    };
    const onResolve = (result) => {
      if (disposed2())
        return;
      pending(false);
      error(undefined);
      value(() => result);
      latest(() => result);
      resource(resourceResolved);
    };
    const onReject = (exception) => {
      if (disposed2())
        return;
      pending(false);
      error(castError(exception));
      value(undefined);
      latest(undefined);
      resource(resourceRejected);
    };
    const onFinally = () => {
      if (disposed2())
        return;
      unsuspend();
    };
    const fetch2 = () => {
      try {
        const value2 = SS_default(fetcher());
        if (isPromise(value2)) {
          onPending();
          value2.then(onResolve, onReject).finally(onFinally);
        } else {
          onResolve(value2);
          onFinally();
        }
      } catch (error2) {
        onReject(error2);
        onFinally();
      }
    };
    fetch2();
  });
  return assign(use_readonly_default(resource), resourceFunction);
};
var use_resource_default = useResource;

// libraries/solenopsys/converged-renderer/src/hooks/use_fetch.ts
var useFetch = (request, init) => {
  return use_resource_default(() => {
    return use_resolved_default([request, init], (request2, init2 = {}) => {
      const signal = use_abort_signal_default(init2.signal || []);
      init2.signal = signal;
      return fetch(request2, init2);
    });
  });
};
var use_fetch_default = useFetch;

// libraries/solenopsys/converged-renderer/src/hooks/use_idle_callback.ts
var useIdleCallback = (callback, options2) => {
  return use_scheduler_default({
    callback,
    once: true,
    cancel: cancelIdleCallback,
    schedule: (callback2) => requestIdleCallback(callback2, SS_default(options2))
  });
};
var use_idle_callback_default = useIdleCallback;

// libraries/solenopsys/converged-renderer/src/hooks/use_idle_loop.ts
var useIdleLoop = (callback, options2) => {
  return use_scheduler_default({
    callback,
    loop: true,
    cancel: cancelIdleCallback,
    schedule: (callback2) => requestIdleCallback(callback2, SS_default(options2))
  });
};
var use_idle_loop_default = useIdleLoop;

// libraries/solenopsys/converged-renderer/src/hooks/use_interval.ts
var useInterval = (callback, ms) => {
  return use_scheduler_default({
    callback,
    cancel: clearInterval,
    schedule: (callback2) => setInterval(callback2, SS_default(ms))
  });
};
var use_interval_default = useInterval;

// libraries/solenopsys/converged-renderer/src/hooks/use_promise.ts
var usePromise = (promise) => {
  return use_resource_default(() => SS_default(promise));
};
var use_promise_default = usePromise;

// libraries/solenopsys/converged-renderer/src/hooks/use_root.ts
import {root} from "@solenopsys/converged-reactive";
var use_root_default = root;

// libraries/solenopsys/converged-renderer/src/hooks/use_selector.ts
import {selector} from "@solenopsys/converged-reactive";
var use_selector_default = selector;

// libraries/solenopsys/converged-renderer/src/hooks/use_timeout.ts
var useTimeout = (callback, ms) => {
  return use_scheduler_default({
    callback,
    once: true,
    cancel: clearTimeout,
    schedule: (callback2) => setTimeout(callback2, SS_default(ms))
  });
};
var use_timeout_default = useTimeout;

// libraries/solenopsys/converged-renderer/src/hooks/use_untracked.ts
import {untracked} from "@solenopsys/converged-reactive";
var use_untracked_default = untracked;

// libraries/solenopsys/converged-renderer/src/hooks/use_cheap_disposed.ts
var useCheapDisposed = () => {
  let disposed2 = false;
  const get2 = () => disposed2;
  const set = () => disposed2 = true;
  use_cleanup_default(set);
  return get2;
};
var use_cheap_disposed_default = useCheapDisposed;

// libraries/solenopsys/converged-renderer/src/hooks/use_microtask.ts
import {with as _with} from "@solenopsys/converged-reactive";
var useMicrotask = (fn) => {
  const disposed2 = use_cheap_disposed_default();
  const runWithOwner = _with();
  queueMicrotask(() => {
    if (disposed2())
      return;
    runWithOwner(fn);
  });
};
var use_microtask_default = useMicrotask;

// libraries/solenopsys/converged-renderer/src/methods/is_store.ts
import {isStore} from "@solenopsys/converged-reactive";
var is_store_default = isStore;

// libraries/solenopsys/converged-renderer/src/methods/store.ts
import {store} from "@solenopsys/converged-reactive";
var store_default = store;

// libraries/solenopsys/converged-renderer/src/utils/setters.ts
import {context as context3} from "@solenopsys/converged-reactive";
import {SYMBOL_STORE_OBSERVABLE} from "@solenopsys/converged-reactive";

// libraries/solenopsys/converged-renderer/src/utils/classlist.ts
var classesToggle = (element, classes, force) => {
  const { className } = element;
  if (isString(className)) {
    if (!className) {
      if (force) {
        element.className = classes;
        return;
      } else {
        return;
      }
    } else if (!force && className === classes) {
      element.className = "";
      return;
    }
  }
  if (classes.includes(" ")) {
    classes.split(" ").forEach((cls) => {
      if (!cls.length)
        return;
      element.classList.toggle(cls, !!force);
    });
  } else {
    element.classList.toggle(classes, !!force);
  }
};

// libraries/solenopsys/converged-renderer/src/utils/diff.ts
var dummyNode = document.createComment("");
var beforeDummyWrapper = [dummyNode];
var afterDummyWrapper = [dummyNode];
var diff = (parent, before, after, nextSibling) => {
  if (before === after)
    return;
  if (before instanceof Node) {
    if (after instanceof Node) {
      if (before.parentNode === parent) {
        parent.replaceChild(after, before);
        return;
      } else {
      }
    }
    beforeDummyWrapper[0] = before;
    before = beforeDummyWrapper;
  }
  if (after instanceof Node) {
    afterDummyWrapper[0] = after;
    after = afterDummyWrapper;
  }
  const bLength = after.length;
  let aEnd = before.length;
  let bEnd = bLength;
  let aStart = 0;
  let bStart = 0;
  let map = null;
  let removable;
  while (aStart < aEnd || bStart < bEnd) {
    if (aEnd === aStart) {
      const node = bEnd < bLength ? bStart ? after[bStart - 1].nextSibling : after[bEnd - bStart] : nextSibling;
      if (bStart < bEnd) {
        if (node) {
          node.before.apply(node, after.slice(bStart, bEnd));
        } else {
          parent.append.apply(parent, after.slice(bStart, bEnd));
        }
        bStart = bEnd;
      }
    } else if (bEnd === bStart) {
      while (aStart < aEnd) {
        if (!map || !map.has(before[aStart])) {
          removable = before[aStart];
          if (removable.parentNode === parent) {
            parent.removeChild(removable);
          }
        }
        aStart++;
      }
    } else if (before[aStart] === after[bStart]) {
      aStart++;
      bStart++;
    } else if (before[aEnd - 1] === after[bEnd - 1]) {
      aEnd--;
      bEnd--;
    } else if (before[aStart] === after[bEnd - 1] && after[bStart] === before[aEnd - 1]) {
      const node = before[--aEnd].nextSibling;
      parent.insertBefore(after[bStart++], before[aStart++].nextSibling);
      parent.insertBefore(after[--bEnd], node);
      before[aEnd] = after[bEnd];
    } else {
      if (!map) {
        map = new Map;
        let i = bStart;
        while (i < bEnd)
          map.set(after[i], i++);
      }
      if (map.has(before[aStart])) {
        const index = map.get(before[aStart]);
        if (bStart < index && index < bEnd) {
          let i = aStart;
          let sequence = 1;
          while (++i < aEnd && i < bEnd && map.get(before[i]) === index + sequence)
            sequence++;
          if (sequence > index - bStart) {
            const node = before[aStart];
            if (bStart < index) {
              if (node) {
                node.before.apply(node, after.slice(bStart, index));
              } else {
                parent.append.apply(parent, after.slice(bStart, index));
              }
              bStart = index;
            }
          } else {
            parent.replaceChild(after[bStart++], before[aStart++]);
          }
        } else
          aStart++;
      } else {
        removable = before[aStart++];
        if (removable.parentNode === parent) {
          parent.removeChild(removable);
        }
      }
    }
  }
  beforeDummyWrapper[0] = dummyNode;
  afterDummyWrapper[0] = dummyNode;
};
var diff_default = diff;

// libraries/solenopsys/converged-renderer/src/utils/fragment.ts
var NOOP_CHILDREN = [];
var FragmentUtils = {
  make: () => {
    return {
      values: undefined,
      length: 0
    };
  },
  makeWithNode: (node) => {
    return {
      values: node,
      length: 1
    };
  },
  makeWithFragment: (fragment) => {
    return {
      values: fragment,
      fragmented: true,
      length: 1
    };
  },
  getChildrenFragmented: (thiz, children = []) => {
    const { values, length } = thiz;
    if (!length)
      return children;
    if (values instanceof Array) {
      for (let i = 0, l = values.length;i < l; i++) {
        const value = values[i];
        if (value instanceof Node) {
          children.push(value);
        } else {
          FragmentUtils.getChildrenFragmented(value, children);
        }
      }
    } else {
      if (values instanceof Node) {
        children.push(values);
      } else {
        FragmentUtils.getChildrenFragmented(values, children);
      }
    }
    return children;
  },
  getChildren: (thiz) => {
    if (!thiz.length)
      return NOOP_CHILDREN;
    if (!thiz.fragmented)
      return thiz.values;
    if (thiz.length === 1)
      return FragmentUtils.getChildren(thiz.values);
    return FragmentUtils.getChildrenFragmented(thiz);
  },
  pushFragment: (thiz, fragment) => {
    FragmentUtils.pushValue(thiz, fragment);
    thiz.fragmented = true;
  },
  pushNode: (thiz, node) => {
    FragmentUtils.pushValue(thiz, node);
  },
  pushValue: (thiz, value) => {
    const { values, length } = thiz;
    if (length === 0) {
      thiz.values = value;
    } else if (length === 1) {
      thiz.values = [values, value];
    } else {
      values.push(value);
    }
    thiz.length += 1;
  },
  replaceWithNode: (thiz, node) => {
    thiz.values = node;
    delete thiz.fragmented;
    thiz.length = 1;
  },
  replaceWithFragment: (thiz, fragment) => {
    thiz.values = fragment.values;
    thiz.fragmented = fragment.fragmented;
    thiz.length = fragment.length;
  }
};
var fragment_default = FragmentUtils;

// libraries/solenopsys/converged-renderer/src/plugins/classes.ts
function addClassPlugin(plugin) {
  plugins.add(plugin);
}
function removeClassPlugin(plugin) {
  plugins.delete(plugin);
}
function classListernerCallback(element, className) {
  if (plugins.size === 0)
    return;
  plugins.forEach((plugin) => plugin(element, className));
}
var plugins = new Set;

// libraries/solenopsys/converged-renderer/src/utils/resolvers.ts
var resolveChild = (value, setter, _dynamic = false) => {
  if (isFunction(value)) {
    if (!isFunctionReactive(value)) {
      resolveChild(value(), setter, _dynamic);
    } else {
      use_render_effect_default(() => {
        resolveChild(value(), setter, true);
      });
    }
  } else if (isArray(value)) {
    const [values, hasObservables] = resolveArraysAndStatics(value);
    values[SYMBOL_UNCACHED] = value[SYMBOL_UNCACHED];
    setter(values, hasObservables || _dynamic);
  } else {
    setter(value, _dynamic);
  }
};
var resolveClass = (classes, resolved = {}) => {
  if (isString(classes)) {
    classes.split(/\s+/g).filter(Boolean).filter((cls) => {
      resolved[cls] = true;
    });
  } else if (isFunction(classes)) {
    resolveClass(classes(), resolved);
  } else if (isArray(classes)) {
    classes.forEach((cls) => {
      resolveClass(cls, resolved);
    });
  } else if (classes) {
    for (const key in classes) {
      const value = classes[key];
      const isActive = !!SS_default(value);
      if (!isActive)
        continue;
      resolved[key] = true;
    }
  }
  return resolved;
};
var resolveStyle = (styles, resolved = {}) => {
  if (isString(styles)) {
    return styles;
  } else if (isFunction(styles)) {
    return resolveStyle(styles(), resolved);
  } else if (isArray(styles)) {
    styles.forEach((style) => {
      resolveStyle(style, resolved);
    });
  } else if (styles) {
    for (const key in styles) {
      const value = styles[key];
      resolved[key] = SS_default(value);
    }
  }
  return resolved;
};
var resolveArraysAndStatics = (() => {
  const DUMMY_RESOLVED = [];
  const resolveArraysAndStaticsInner = (values, resolved, hasObservables) => {
    for (let i = 0, l = values.length;i < l; i++) {
      const value = values[i];
      const type = typeof value;
      if (type === "string" || type === "number" || type === "bigint") {
        if (resolved === DUMMY_RESOLVED)
          resolved = values.slice(0, i);
        resolved.push(createText(value));
      } else if (type === "object" && isArray(value)) {
        if (resolved === DUMMY_RESOLVED)
          resolved = values.slice(0, i);
        hasObservables = resolveArraysAndStaticsInner(value, resolved, hasObservables)[1];
      } else if (type === "function" && is_observable_default(value)) {
        if (resolved !== DUMMY_RESOLVED)
          resolved.push(value);
        hasObservables = true;
      } else {
        if (resolved !== DUMMY_RESOLVED)
          resolved.push(value);
      }
    }
    if (resolved === DUMMY_RESOLVED)
      resolved = values;
    return [resolved, hasObservables];
  };
  return (values) => {
    return resolveArraysAndStaticsInner(values, DUMMY_RESOLVED, false);
  };
})();

// libraries/solenopsys/converged-renderer/src/utils/setters.ts
var setAttributeStatic = (() => {
  const attributesBoolean = new Set([
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "disabled",
    "formnovalidate",
    "hidden",
    "indeterminate",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "seamless",
    "selected"
  ]);
  const attributeCamelCasedRe = /e(r[HRWrv]|[Vawy])|Con|l(e[Tcs]|c)|s(eP|y)|a(t[rt]|u|v)|Of|Ex|f[XYa]|gt|hR|d[Pg]|t[TXYd]|[UZq]/;
  const attributesCache = {};
  const uppercaseRe = /[A-Z]/g;
  const normalizeKeySvg = (key) => {
    return attributesCache[key] || (attributesCache[key] = attributeCamelCasedRe.test(key) ? key : key.replace(uppercaseRe, (char) => `-${char.toLowerCase()}`));
  };
  return (element, key, value) => {
    if (isSVG(element)) {
      key = key === "xlinkHref" || key === "xlink:href" ? "href" : normalizeKeySvg(key);
      if (isNil(value) || value === false && attributesBoolean.has(key)) {
        element.removeAttribute(key);
      } else {
        element.setAttribute(key, String(value));
      }
    } else {
      if (isNil(value) || value === false && attributesBoolean.has(key)) {
        element.removeAttribute(key);
      } else {
        value = value === true ? "" : String(value);
        element.setAttribute(key, value);
      }
    }
  };
})();
var setAttribute = (element, key, value) => {
  if (isFunction(value) && isFunctionReactive(value)) {
    use_render_effect_default(() => {
      setAttributeStatic(element, key, value());
    });
  } else {
    setAttributeStatic(element, key, SS_default(value));
  }
};
var setChildReplacementFunction = (parent, fragment2, child) => {
  use_render_effect_default(() => {
    let valueNext = child();
    while (isFunction(valueNext)) {
      valueNext = valueNext();
    }
    setChildStatic(parent, fragment2, false, valueNext, true);
  });
};
var setChildReplacementText = (child, childPrev) => {
  if (childPrev.nodeType === 3) {
    childPrev.nodeValue = child;
    return childPrev;
  } else {
    const parent = childPrev.parentElement;
    if (!parent)
      throw new Error("Invalid child replacement");
    const textNode = createText(child);
    parent.replaceChild(textNode, childPrev);
    return textNode;
  }
};
var setChildReplacement = (child, childPrev) => {
  const type = typeof child;
  if (type === "string" || type === "number" || type === "bigint") {
    setChildReplacementText(String(child), childPrev);
  } else {
    const parent = childPrev.parentElement;
    if (!parent)
      throw new Error("Invalid child replacement");
    const fragment2 = fragment_default.makeWithNode(childPrev);
    if (type === "function") {
      setChildReplacementFunction(parent, fragment2, child);
    } else {
      setChild(parent, child, fragment2);
    }
  }
};
var setChildStatic = (parent, fragment2, fragmentOnly, child, dynamic) => {
  if (!dynamic && child === undefined)
    return;
  const prev = fragment_default.getChildren(fragment2);
  const prevIsArray = prev instanceof Array;
  const prevLength = prevIsArray ? prev.length : 1;
  const prevFirst = prevIsArray ? prev[0] : prev;
  const prevLast = prevIsArray ? prev[prevLength - 1] : prev;
  const prevSibling = prevLast?.nextSibling || null;
  if (prevLength === 0) {
    const type = typeof child;
    if (type === "string" || type === "number" || type === "bigint") {
      const textNode = createText(child);
      if (!fragmentOnly) {
        parent.appendChild(textNode);
      }
      fragment_default.replaceWithNode(fragment2, textNode);
      return;
    } else if (type === "object" && child !== null && typeof child.nodeType === "number") {
      const node = child;
      if (!fragmentOnly) {
        parent.insertBefore(node, null);
      }
      fragment_default.replaceWithNode(fragment2, node);
      return;
    }
  }
  if (prevLength === 1 && prevFirst.parentNode) {
    const type = typeof child;
    if (type === "string" || type === "number" || type === "bigint") {
      const node = setChildReplacementText(String(child), prevFirst);
      fragment_default.replaceWithNode(fragment2, node);
      return;
    }
  }
  const fragmentNext = fragment_default.make();
  const children = Array.isArray(child) ? child : [child];
  for (let i = 0, l = children.length;i < l; i++) {
    const child2 = children[i];
    const type = typeof child2;
    if (type === "string" || type === "number" || type === "bigint") {
      fragment_default.pushNode(fragmentNext, createText(child2));
    } else if (type === "object" && child2 !== null && typeof child2.nodeType === "number") {
      fragment_default.pushNode(fragmentNext, child2);
    } else if (type === "function") {
      const fragment3 = fragment_default.make();
      let childFragmentOnly = !fragmentOnly;
      fragment_default.pushFragment(fragmentNext, fragment3);
      resolveChild(child2, (child3, dynamic2) => {
        const fragmentOnly2 = childFragmentOnly;
        childFragmentOnly = false;
        setChildStatic(parent, fragment3, fragmentOnly2, child3, dynamic2);
      });
    }
  }
  let next = fragment_default.getChildren(fragmentNext);
  let nextLength = fragmentNext.length;
  if (nextLength === 0 && prevLength === 1 && prevFirst.nodeType === 8) {
    return;
  }
  if (!fragmentOnly && (nextLength === 0 || prevLength === 1 && prevFirst.nodeType === 8 || children[SYMBOL_UNCACHED])) {
    const { childNodes } = parent;
    if (childNodes.length === prevLength) {
      parent.textContent = "";
      if (nextLength === 0) {
        const placeholder = fragmentNext.placeholder ||= fragment2.placeholder ||= createComment();
        fragment_default.pushNode(fragmentNext, placeholder);
        if (next !== fragmentNext.values) {
          next = placeholder;
          nextLength += 1;
        }
      }
      if (prevSibling) {
        if (next instanceof Array) {
          prevSibling.before.apply(prevSibling, next);
        } else {
          parent.insertBefore(next, prevSibling);
        }
      } else {
        if (next instanceof Array) {
          parent.append.apply(parent, next);
        } else {
          parent.append(next);
        }
      }
      fragment_default.replaceWithFragment(fragment2, fragmentNext);
      return;
    }
  }
  if (nextLength === 0) {
    const placeholder = fragmentNext.placeholder ||= fragment2.placeholder ||= createComment();
    fragment_default.pushNode(fragmentNext, placeholder);
    if (next !== fragmentNext.values) {
      next = placeholder;
      nextLength += 1;
    }
  }
  if (!fragmentOnly) {
    diff_default(parent, prev, next, prevSibling);
  }
  fragment_default.replaceWithFragment(fragment2, fragmentNext);
};
var setChild = (parent, child, fragment2 = fragment_default.make()) => {
  resolveChild(child, setChildStatic.bind(undefined, parent, fragment2, false));
};
var setClassStatic = classesToggle;
var setClass = (element, key, value) => {
  if (isFunction(value) && isFunctionReactive(value)) {
    use_render_effect_default(() => {
      setClassStatic(element, key, value());
    });
  } else {
    setClassStatic(element, key, SS_default(value));
  }
};
var setClassBooleanStatic = (element, value, key, keyPrev) => {
  if (keyPrev && keyPrev !== true) {
    setClassStatic(element, keyPrev, false);
  }
  if (key && key !== true) {
    setClassStatic(element, key, value);
  }
};
var setClassBoolean = (element, value, key) => {
  if (isFunction(key) && isFunctionReactive(key)) {
    let keyPrev;
    use_render_effect_default(() => {
      const keyNext = key();
      setClassBooleanStatic(element, value, keyNext, keyPrev);
      keyPrev = keyNext;
    });
  } else {
    setClassBooleanStatic(element, value, SS_default(key));
  }
};
var setClassesStatic = (element, object, objectPrev) => {
  if (isString(object)) {
    if (isSVG(element)) {
      element.setAttribute("class", object);
    } else {
      classListernerCallback(element, object);
      element.className = object;
    }
  } else {
    if (objectPrev) {
      if (isString(objectPrev)) {
        if (objectPrev) {
          if (isSVG(element)) {
            element.setAttribute("class", "");
          } else {
            element.className = "";
          }
        }
      } else if (isArray(objectPrev)) {
        objectPrev = store_default.unwrap(objectPrev);
        for (let i = 0, l = objectPrev.length;i < l; i++) {
          if (!objectPrev[i])
            continue;
          setClassBoolean(element, false, objectPrev[i]);
        }
      } else {
        objectPrev = store_default.unwrap(objectPrev);
        for (const key in objectPrev) {
          if (object && key in object)
            continue;
          setClass(element, key, false);
        }
      }
    }
    if (isArray(object)) {
      if (is_store_default(object)) {
        for (let i = 0, l = object.length;i < l; i++) {
          const fn = untrack_default(() => isFunction(object[i]) ? object[i] : object[SYMBOL_STORE_OBSERVABLE](String(i)));
          setClassBoolean(element, true, fn);
        }
      } else {
        for (let i = 0, l = object.length;i < l; i++) {
          if (!object[i])
            continue;
          setClassBoolean(element, true, object[i]);
        }
      }
    } else {
      if (is_store_default(object)) {
        for (const key in object) {
          const fn = untrack_default(() => isFunction(object[key]) ? object[key] : object[SYMBOL_STORE_OBSERVABLE](key));
          setClass(element, key, fn);
        }
      } else {
        for (const key in object) {
          setClass(element, key, object[key]);
        }
      }
    }
  }
};
var setClasses = (element, object) => {
  if (isFunction(object) || isArray(object)) {
    let objectPrev;
    use_render_effect_default(() => {
      const objectNext = resolveClass(object);
      setClassesStatic(element, objectNext, objectPrev);
      objectPrev = objectNext;
    });
  } else {
    setClassesStatic(element, object);
  }
};
var setDirective = (element, directive, args) => {
  const symbol = SYMBOLS_DIRECTIVES[directive] || Symbol();
  const data = context3(symbol) || DIRECTIVES[symbol];
  if (!data)
    throw new Error(`Directive "${directive}" not found`);
  const call = () => data.fn(element, ...castArray(args));
  if (data.immediate) {
    call();
  } else {
    use_microtask_default(call);
  }
};
var setEventStatic = (() => {
  const delegatedEvents = {
    onauxclick: ["_onauxclick", false],
    onbeforeinput: ["_onbeforeinput", false],
    onclick: ["_onclick", false],
    ondblclick: ["_ondblclick", false],
    onfocusin: ["_onfocusin", false],
    onfocusout: ["_onfocusout", false],
    oninput: ["_oninput", false],
    onkeydown: ["_onkeydown", false],
    onkeyup: ["_onkeyup", false],
    onmousedown: ["_onmousedown", false],
    onmouseup: ["_onmouseup", false]
  };
  const delegate = (event) => {
    const key = `_${event}`;
    document.addEventListener(event.slice(2), (event2) => {
      const targets = event2.composedPath();
      let target = null;
      Object.defineProperty(event2, "currentTarget", {
        configurable: true,
        get() {
          return target;
        }
      });
      for (let i = 0, l = targets.length;i < l; i++) {
        target = targets[i];
        const handler = target[key];
        if (!handler)
          continue;
        handler(event2);
        if (event2.cancelBubble)
          break;
      }
      target = null;
    });
  };
  return (element, event, value) => {
    if (event.startsWith("onmiddleclick")) {
      const _value = value;
      event = `onauxclick${event.slice(13)}`;
      value = _value && ((event2) => event2["button"] === 1 && _value(event2));
    }
    const delegated = delegatedEvents[event];
    if (delegated) {
      if (!delegated[1]) {
        delegated[1] = true;
        delegate(event);
      }
      element[delegated[0]] = value;
    } else if (event.endsWith("passive")) {
      const isCapture = event.endsWith("capturepassive");
      const type = event.slice(2, -7 - (isCapture ? 7 : 0));
      const key = `_${event}`;
      const valuePrev = element[key];
      if (valuePrev)
        element.removeEventListener(type, valuePrev, { capture: isCapture });
      if (value)
        element.addEventListener(type, value, {
          passive: true,
          capture: isCapture
        });
      element[key] = value;
    } else if (event.endsWith("capture")) {
      const type = event.slice(2, -7);
      const key = `_${event}`;
      const valuePrev = element[key];
      if (valuePrev)
        element.removeEventListener(type, valuePrev, { capture: true });
      if (value)
        element.addEventListener(type, value, { capture: true });
      element[key] = value;
    } else {
      element[event] = value;
    }
  };
})();
var setEvent = (element, event, value) => {
  setEventStatic(element, event, value);
};
var setHTMLStatic = (element, value) => {
  element.innerHTML = String(isNil(value) ? "" : value);
};
var setHTML = (element, value) => {
  use_render_effect_default(() => {
    setHTMLStatic(element, SS_default(SS_default(value).__html));
  });
};
var setPropertyStatic = (element, key, value) => {
  if (key === "tabIndex" && isBoolean(value)) {
    value = value ? 0 : undefined;
  }
  if (key === "value") {
    if (element.tagName === "PROGRESS") {
      value ??= null;
    } else if (element.tagName === "SELECT" && !element["_$inited"]) {
      element["_$inited"] = true;
      queueMicrotask(() => element[key] = value);
    }
  }
  try {
    element[key] = value;
    if (isNil(value)) {
      setAttributeStatic(element, key, null);
    }
  } catch {
    setAttributeStatic(element, key, value);
  }
};
var setProperty = (element, key, value) => {
  if (isFunction(value) && isFunctionReactive(value)) {
    use_render_effect_default(() => {
      setPropertyStatic(element, key, value());
    });
  } else {
    setPropertyStatic(element, key, SS_default(value));
  }
};
var setRef = (element, value) => {
  if (isNil(value))
    return;
  const values = flatten(castArray(value)).filter(Boolean);
  if (!values.length)
    return;
  use_microtask_default(() => untrack_default(() => values.forEach((value2) => value2?.(element))));
};
var setStyleStatic = (() => {
  const propertyNonDimensionalRe = /^(-|f[lo].*[^se]$|g.{5,}[^ps]$|z|o[pr]|(W.{5})?[lL]i.*(t|mp)$|an|(bo|s).{4}Im|sca|m.{6}[ds]|ta|c.*[st]$|wido|ini)/i;
  const propertyNonDimensionalCache = {};
  return (element, key, value) => {
    if (key.charCodeAt(0) === 45) {
      if (isNil(value)) {
        element.style.removeProperty(key);
      } else {
        element.style.setProperty(key, String(value));
      }
    } else if (isNil(value)) {
      element.style[key] = null;
    } else {
      element.style[key] = isString(value) || (propertyNonDimensionalCache[key] ||= propertyNonDimensionalRe.test(key)) ? value : `${value}px`;
    }
  };
})();
var setStyle = (element, key, value) => {
  if (isFunction(value) && isFunctionReactive(value)) {
    use_render_effect_default(() => {
      setStyleStatic(element, key, value());
    });
  } else {
    setStyleStatic(element, key, SS_default(value));
  }
};
var setStylesStatic = (element, object, objectPrev) => {
  if (isString(object)) {
    element.setAttribute("style", object);
  } else {
    if (objectPrev) {
      if (isString(objectPrev)) {
        if (objectPrev) {
          element.style.cssText = "";
        }
      } else {
        objectPrev = store_default.unwrap(objectPrev);
        for (const key in objectPrev) {
          if (object && key in object)
            continue;
          setStyleStatic(element, key, null);
        }
      }
    }
    if (is_store_default(object)) {
      for (const key in object) {
        const fn = untrack_default(() => isFunction(object[key]) ? object[key] : object[SYMBOL_STORE_OBSERVABLE](key));
        setStyle(element, key, fn);
      }
    } else {
      for (const key in object) {
        setStyle(element, key, object[key]);
      }
    }
  }
};
var setStyles = (element, object) => {
  if (isFunction(object) || isArray(object)) {
    let objectPrev;
    use_render_effect_default(() => {
      const objectNext = resolveStyle(object);
      setStylesStatic(element, objectNext, objectPrev);
      objectPrev = objectNext;
    });
  } else {
    setStylesStatic(element, SS_default(object));
  }
};
var setTemplateAccessor = (element, key, value) => {
  if (key === "children") {
    const placeholder = createText("");
    element.insertBefore(placeholder, null);
    value(element, "setChildReplacement", undefined, placeholder);
  } else if (key === "ref") {
    value(element, "setRef");
  } else if (key === "style") {
    value(element, "setStyles");
  } else if (key === "class") {
    if (!isSVG(element)) {
      element.className = "";
    }
    value(element, "setClasses");
  } else if (key === "dangerouslySetInnerHTML") {
    value(element, "setHTML");
  } else if (key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110) {
    value(element, "setEvent", key.toLowerCase());
  } else if (key.charCodeAt(0) === 117 && key.charCodeAt(3) === 58) {
    value(element, "setDirective", key.slice(4));
  } else if (key === "innerHTML" || key === "outerHTML" || key === "textContent" || key === "className") {
  } else if (key in element && !isSVG(element)) {
    value(element, "setProperty", key);
  } else {
    element.setAttribute(key, "");
    value(element, "setAttribute", key);
  }
};
var setProp = (element, key, value) => {
  if (value === undefined)
    return;
  if (isTemplateAccessor(value)) {
    setTemplateAccessor(element, key, value);
  } else if (key === "children") {
    setChild(element, value);
  } else if (key === "ref") {
    setRef(element, value);
  } else if (key === "style") {
    setStyles(element, value);
  } else if (key === "class") {
    setClasses(element, value);
  } else if (key === "dangerouslySetInnerHTML") {
    setHTML(element, value);
  } else if (key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110) {
    setEvent(element, key.toLowerCase(), value);
  } else if (key.charCodeAt(0) === 117 && key.charCodeAt(3) === 58) {
    setDirective(element, key.slice(4), value);
  } else if (key === "innerHTML" || key === "outerHTML" || key === "textContent" || key === "className") {
  } else if (key in element && !isSVG(element)) {
    setProperty(element, key, value);
  } else {
    setAttribute(element, key, value);
  }
};
var setProps = (element, object) => {
  for (const key in object) {
    setProp(element, key, object[key]);
  }
};

// libraries/solenopsys/converged-renderer/src/methods/create_element.ts
var createElement = (component, props, ..._children) => {
  const { children: __children, key, ref, ...rest } = props || {};
  const children = _children.length === 1 ? _children[0] : _children.length === 0 ? __children : _children;
  if (isFunction(component)) {
    const props2 = rest;
    if (!isNil(children))
      props2.children = children;
    if (!isNil(ref))
      props2.ref = ref;
    return wrap_element_default(() => {
      return untrack_default(() => component.call(component, props2));
    });
  } else if (isString(component)) {
    const props2 = rest;
    const isSVG2 = isSVGElement(component);
    const createNode = isSVG2 ? createSVGNode : createHTMLNode;
    if (!isVoidChild(children))
      props2.children = children;
    if (!isNil(ref))
      props2.ref = ref;
    return wrap_element_default(() => {
      const child = createNode(component);
      if (isSVG2)
        child["isSVG"] = true;
      untrack_default(() => setProps(child, props2));
      return child;
    });
  } else if (isNode(component)) {
    return wrap_element_default(() => component);
  } else {
    throw new Error("Invalid component");
  }
};
var create_element_default = createElement;

// libraries/solenopsys/converged-renderer/src/methods/resolve.ts
import {resolve as resolve2} from "@solenopsys/converged-reactive";
var resolve_default = resolve2;

// libraries/solenopsys/converged-renderer/src/components/dynamic.ts
var Dynamic = ({
  component,
  props,
  children
}) => {
  return use_memo_default(() => {
    return resolve_default(create_element_default(SS_default(component, false), SS_default(props), children));
  });
};
var dynamic_default = Dynamic;

// libraries/solenopsys/converged-renderer/src/methods/batch.ts
import {batch} from "@solenopsys/converged-reactive";
var batch_default = batch;

// libraries/solenopsys/converged-renderer/src/methods/create_context.ts
import {context as context4} from "@solenopsys/converged-reactive";
var createContext = function(defaultValue) {
  const symbol = Symbol();
  const Provider = ({
    value,
    children
  }) => {
    return context4({ [symbol]: value }, () => {
      return resolve_default(children);
    });
  };
  const Context = { Provider };
  CONTEXTS_DATA.set(Context, { symbol, defaultValue });
  return Context;
};
var create_context_default = createContext;

// libraries/solenopsys/converged-renderer/src/methods/create_directive.ts
import {context as context5} from "@solenopsys/converged-reactive";
var createDirective = (name, fn, options2) => {
  const immediate = !!options2?.immediate;
  const data = {
    fn,
    immediate
  };
  const symbol = SYMBOLS_DIRECTIVES[name] ||= Symbol();
  const Provider = ({ children }) => {
    return context5({ [symbol]: data }, () => {
      return resolve_default(children);
    });
  };
  const ref = (...args) => {
    return (element) => {
      fn(element, ...args);
    };
  };
  const register = () => {
    if (symbol in DIRECTIVES)
      throw new Error('Directive "name" is already registered');
    DIRECTIVES[symbol] = data;
  };
  return { Provider, ref, register };
};
var create_directive_default = createDirective;

// libraries/solenopsys/converged-renderer/src/methods/h.ts
var h = function(component, props, ...children) {
  if (children.length || isObject(props) && !isArray(props)) {
    return create_element_default(component, props, ...children);
  } else {
    return create_element_default(component, null, props);
  }
};
var h_default = h;

// libraries/solenopsys/converged-renderer/src/methods/hmr.ts
var COMPONENT_RE = /^_?[A-Z][a-zA-Z0-9$_-]*$/;
var SYMBOL_AS = "__hmr_as__";
var SYMBOL_COLD_COMPONENT = Symbol("HMR.Cold");
var SYMBOL_HOT_COMPONENT = Symbol("HMR.Hot");
var SYMBOL_HOT_ID = Symbol("HMR.ID");
var SOURCES = new WeakMap;
var hmr = (accept, component) => {
  if (accept) {
    const cached = component[SYMBOL_HOT_COMPONENT];
    if (cached)
      return cached;
    const isProvider = !isFunction(component) && "Provider" in component;
    if (isProvider)
      return component;
    const createHotComponent = (path) => {
      return (...args) => {
        return use_memo_default(() => {
          const component2 = path.reduce((component3, key) => component3[key], SOURCES.get(id())?.() || source());
          const result = resolve_default(untrack_default(() => component2(...args)));
          return result;
        });
      };
    };
    const createHotComponentDeep = (component2, path) => {
      const cached2 = component2[SYMBOL_HOT_COMPONENT];
      if (cached2)
        return cached2;
      const hot2 = component2[SYMBOL_HOT_COMPONENT] = createHotComponent(path);
      for (const key in component2) {
        const value = component2[key];
        if (isFunction(value) && COMPONENT_RE.test(key)) {
          hot2[key] = createHotComponentDeep(value, [...path, key]);
        } else {
          hot2[key] = value;
        }
      }
      return hot2;
    };
    const onAccept = (module) => {
      const hot2 = module[component[SYMBOL_AS]] || module[component.name] || module.default;
      if (!hot2)
        return console.error(`[hmr] Failed to handle update for "${component.name}" component:\n\n`, component);
      const cold2 = hot2[SYMBOL_COLD_COMPONENT] || hot2;
      hot2[SYMBOL_HOT_ID]?.(id());
      SOURCES.get(id())?.(() => cold2);
    };
    const id = S_default({});
    const source = S_default(component);
    SOURCES.set(id(), source);
    const cold = component[SYMBOL_COLD_COMPONENT] || component;
    const hot = createHotComponentDeep(component, []);
    cold[SYMBOL_HOT_COMPONENT] = hot;
    hot[SYMBOL_COLD_COMPONENT] = cold;
    hot[SYMBOL_HOT_COMPONENT] = hot;
    hot[SYMBOL_HOT_ID] = id;
    accept(onAccept);
    return hot;
  } else {
    return component;
  }
};
var hmr_default = hmr;

// libraries/solenopsys/converged-renderer/node_modules/htm/dist/htm.module.js
var n = function(t, s, r, e) {
  var u;
  s[0] = 0;
  for (var h2 = 1;h2 < s.length; h2++) {
    var p = s[h2++], a = s[h2] ? (s[0] |= p ? 1 : 2, r[s[h2++]]) : s[++h2];
    p === 3 ? e[0] = a : p === 4 ? e[1] = Object.assign(e[1] || {}, a) : p === 5 ? (e[1] = e[1] || {})[s[++h2]] = a : p === 6 ? e[1][s[++h2]] += a + "" : p ? (u = t.apply(a, n(t, a, r, ["", null])), e.push(u), a[0] ? s[0] |= 2 : (s[h2 - 2] = 0, s[h2] = u)) : e.push(a);
  }
  return e;
};
var t = new Map;
function htm_module_default(s) {
  var r = t.get(this);
  return r || (r = new Map, t.set(this, r)), (r = n(this, r.get(s) || (r.set(s, r = function(n2) {
    for (var t2, s2, r2 = 1, e = "", u = "", h2 = [0], p = function(n3) {
      r2 === 1 && (n3 || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? h2.push(0, n3, e) : r2 === 3 && (n3 || e) ? (h2.push(3, n3, e), r2 = 2) : r2 === 2 && e === "..." && n3 ? h2.push(4, n3, 0) : r2 === 2 && e && !n3 ? h2.push(5, 0, true, e) : r2 >= 5 && ((e || !n3 && r2 === 5) && (h2.push(r2, 0, e, s2), r2 = 6), n3 && (h2.push(r2, n3, 0, s2), r2 = 6)), e = "";
    }, a = 0;a < n2.length; a++) {
      a && (r2 === 1 && p(), p(a));
      for (var l = 0;l < n2[a].length; l++)
        t2 = n2[a][l], r2 === 1 ? t2 === "<" ? (p(), h2 = [h2], r2 = 3) : e += t2 : r2 === 4 ? e === "--" && t2 === ">" ? (r2 = 1, e = "") : e = t2 + e[0] : u ? t2 === u ? u = "" : e += t2 : t2 === '"' || t2 === "'" ? u = t2 : t2 === ">" ? (p(), r2 = 1) : r2 && (t2 === "=" ? (r2 = 5, s2 = e, e = "") : t2 === "/" && (r2 < 5 || n2[a][l + 1] === ">") ? (p(), r2 === 3 && (h2 = h2[0]), r2 = h2, (h2 = h2[0]).push(2, 0, r2), r2 = 0) : t2 === " " || t2 === "\t" || t2 === "\n" || t2 === "\r" ? (p(), r2 = 2) : e += t2), r2 === 3 && e === "!--" && (r2 = 4, h2 = h2[0]);
    }
    return p(), h2;
  }(s)), r), arguments, [])).length > 1 ? r : r[0];
}

// libraries/solenopsys/converged-renderer/src/methods/html.ts
var registry = {};
var h2 = (type, props, ...children) => create_element_default(registry[type] || type, props, ...children);
var register = (components) => void assign(registry, components);
var html = assign(htm_module_default.bind(h2), { register });
var html_default = html;

// libraries/solenopsys/converged-renderer/src/methods/is_batching.ts
import {isBatching} from "@solenopsys/converged-reactive";
var is_batching_default = isBatching;

// libraries/solenopsys/converged-renderer/src/methods/lazy.ts
var lazy = (fetcher) => {
  const fetcherOnce = once(fetcher);
  const component = (props) => {
    const resource = use_resource_default(fetcherOnce);
    return use_memo_default(() => {
      return use_resolved_default(resource, ({ pending, error, value }) => {
        if (pending)
          return;
        if (error)
          throw error;
        const component2 = "default" in value ? value.default : value;
        return resolve_default(create_element_default(component2, props));
      });
    });
  };
  component.preload = () => {
    return new Promise((resolve8, reject) => {
      const resource = use_resource_default(fetcherOnce);
      use_resolved_default(resource, ({ pending, error }) => {
        if (pending)
          return;
        if (error)
          return reject(error);
        return resolve8();
      });
    });
  };
  return component;
};
var lazy_default = lazy;

// libraries/solenopsys/converged-renderer/src/methods/render.ts
var render = (child, parent) => {
  if (!parent || !(parent instanceof HTMLElement))
    throw new Error("Invalid parent node");
  parent.textContent = "";
  return use_root_default((dispose) => {
    setChild(parent, use_untracked_default(child));
    return () => {
      dispose();
      parent.textContent = "";
    };
  });
};
var render_default = render;

// libraries/solenopsys/converged-renderer/src/components/portal.ts
var Portal = ({
  when = true,
  mount,
  wrapper,
  children
}) => {
  const portal = SS_default(wrapper) || createHTMLNode("div");
  if (!(portal instanceof HTMLElement))
    throw new Error("Invalid wrapper node");
  const condition = use_boolean_default(when);
  use_render_effect_default(() => {
    if (!SS_default(condition))
      return;
    const parent = SS_default(mount) || document.body;
    if (!(parent instanceof Element))
      throw new Error("Invalid mount node");
    parent.insertBefore(portal, null);
    return () => {
      parent.removeChild(portal);
    };
  });
  use_render_effect_default(() => {
    if (!SS_default(condition))
      return;
    return render_default(children, portal);
  });
  return assign(() => SS_default(condition) || children, { metadata: { portal } });
};
var portal_default = Portal;

// libraries/solenopsys/converged-renderer/src/components/suspense.collector.ts
import {context as context6, resolve as resolve8} from "@solenopsys/converged-reactive";
var SuspenseCollector = {
  create: () => {
    const parent = SuspenseCollector.get();
    const suspenses = S_default([]);
    const active = use_memo_default(() => suspenses().some((suspense3) => suspense3.active()));
    const register2 = (suspense3) => {
      parent?.register(suspense3);
      suspenses((prev) => [...prev, suspense3]);
    };
    const unregister = (suspense3) => {
      parent?.unregister(suspense3);
      suspenses((prev) => prev.filter((other) => other !== suspense3));
    };
    const data = { suspenses, active, register: register2, unregister };
    return data;
  },
  get: () => {
    return context6(SYMBOL_SUSPENSE_COLLECTOR);
  },
  wrap: (fn) => {
    const data = SuspenseCollector.create();
    return context6({ [SYMBOL_SUSPENSE_COLLECTOR]: data }, () => {
      return resolve8(() => fn(data));
    });
  }
};
var suspense_collector_default = SuspenseCollector;

// libraries/solenopsys/converged-renderer/src/methods/render_to_string.ts
var renderToString = (child) => {
  return new Promise((resolve9) => {
    use_root_default((dispose) => {
      SS_default(suspense_collector_default.wrap((suspenses) => {
        const { portal: portal2 } = portal_default({ children: child }).metadata;
        use_effect_default(() => {
          if (suspenses.active())
            return;
          resolve9(portal2.innerHTML);
          dispose();
        }, { suspense: false });
      }));
    });
  });
};
var render_to_string_default = renderToString;

// libraries/solenopsys/converged-renderer/src/methods/template.ts
var template = (fn) => {
  const safePropertyRe = /^[a-z0-9-_]+$/i;
  const checkValidProperty = (property) => {
    if (isString(property) && safePropertyRe.test(property))
      return true;
    throw new Error(`Invalid property, only alphanumeric properties are allowed inside templates, received: "${property}"`);
  };
  const makeAccessor = (actionsWithNodes) => {
    return new Proxy({}, {
      get(target, prop) {
        checkValidProperty(prop);
        const accessor = (node, method, key, targetNode) => {
          if (key)
            checkValidProperty(key);
          actionsWithNodes.push([node, method, prop, key, targetNode]);
        };
        const metadata = { [SYMBOL_TEMPLATE_ACCESSOR]: true };
        return assign(accessor, metadata);
      }
    });
  };
  const makeActionsWithNodesAndTemplate = () => {
    const actionsWithNodes = [];
    const accessor = makeAccessor(actionsWithNodes);
    const component = fn(accessor);
    if (isFunction(component)) {
      const root2 = component();
      if (root2 instanceof Element) {
        return { actionsWithNodes, root: root2 };
      }
    }
    throw new Error("Invalid template, it must return a function that returns an Element");
  };
  const makeActionsWithPaths = (actionsWithNodes) => {
    const actionsWithPaths = [];
    for (let i = 0, l = actionsWithNodes.length;i < l; i++) {
      const [node, method, prop, key, targetNode] = actionsWithNodes[i];
      const nodePath = makeNodePath(node);
      const targetNodePath = targetNode ? makeNodePath(targetNode) : undefined;
      actionsWithPaths.push([nodePath, method, prop, key, targetNodePath]);
    }
    return actionsWithPaths;
  };
  const makeNodePath = (() => {
    let prevNode = null;
    let prevPath;
    return (node) => {
      if (node === prevNode)
        return prevPath;
      const path = [];
      let child = node;
      let parent = child.parentNode;
      while (parent) {
        const index = !child.previousSibling ? 0 : !child.nextSibling ? -0 : indexOf(parent.childNodes, child);
        path.push(index);
        child = parent;
        parent = parent.parentNode;
      }
      prevNode = node;
      prevPath = path;
      return path;
    };
  })();
  const makeNodePathProperties = (path) => {
    const properties = ["root"];
    const parts = path.slice().reverse();
    for (let i = 0, l = parts.length;i < l; i++) {
      const part = parts[i];
      if (Object.is(0, part)) {
        properties.push("firstChild");
      } else if (Object.is(-0, part)) {
        properties.push("lastChild");
      } else {
        properties.push("firstChild");
        for (let nsi = 0;nsi < part; nsi++) {
          properties.push("nextSibling");
        }
      }
    }
    return properties;
  };
  const makeReviverPaths = (actionsWithPaths) => {
    const paths = [];
    for (let i = 0, l = actionsWithPaths.length;i < l; i++) {
      const action = actionsWithPaths[i];
      const nodePath = action[0];
      const targetNodePath = action[4];
      paths.push(nodePath);
      if (targetNodePath) {
        paths.push(targetNodePath);
      }
    }
    return paths;
  };
  const makeReviverVariablesData = (paths, properties) => {
    const data = new Array(paths.length);
    for (let i = 0, l = paths.length;i < l; i++) {
      data[i] = {
        path: paths[i],
        properties: properties[i]
      };
    }
    return data;
  };
  const makeReviverVariables = (actionsWithPaths) => {
    const paths = makeReviverPaths(actionsWithPaths);
    const properties = paths.map(makeNodePathProperties);
    const data = makeReviverVariablesData(paths, properties);
    const assignments = [];
    const map = new Map;
    let variableId = 0;
    while (true) {
      const datum = data.find((datum2) => datum2.properties.length > 1);
      if (!datum)
        break;
      const [current, next] = datum.properties;
      const variable = `\$${variableId++}`;
      const assignment = `const ${variable} = ${current}.${next};`;
      assignments.push(assignment);
      for (let i = 0, l = data.length;i < l; i++) {
        const datum2 = data[i];
        const [otherCurrent, otherNext] = datum2.properties;
        if (otherCurrent !== current || otherNext !== next)
          continue;
        datum2.properties[0] = variable;
        datum2.properties.splice(1, 1);
      }
    }
    for (let i = 0, l = data.length;i < l; i++) {
      const datum = data[i];
      map.set(datum.path, datum.properties[0]);
    }
    return { assignments, map };
  };
  const makeReviverActions = (actionsWithPaths, variables) => {
    const actions = [];
    for (let i = 0, l = actionsWithPaths.length;i < l; i++) {
      const [nodePath, method, prop, key, targetNodePath] = actionsWithPaths[i];
      if (targetNodePath) {
        actions.push(`this.${method} ( props["${prop}"], ${variables.get(targetNodePath)} );`);
      } else if (key) {
        actions.push(`this.${method} ( ${variables.get(nodePath)}, "${key}", props["${prop}"] );`);
      } else {
        actions.push(`this.${method} ( ${variables.get(nodePath)}, props["${prop}"] );`);
      }
    }
    return actions;
  };
  const makeReviver = (actionsWithPaths) => {
    const { assignments, map } = makeReviverVariables(actionsWithPaths);
    const actions = makeReviverActions(actionsWithPaths, map);
    const fn2 = new Function("root", "props", `${assignments.join("")}${actions.join("")}return root;`);
    const apis = {
      setAttribute,
      setChildReplacement,
      setClasses,
      setEvent,
      setHTML,
      setProperty,
      setRef,
      setStyles
    };
    const reviver = fn2.bind(apis);
    return reviver;
  };
  const makeComponent = () => {
    const { actionsWithNodes, root: root2 } = makeActionsWithNodesAndTemplate();
    const actionsWithPaths = makeActionsWithPaths(actionsWithNodes);
    const reviver = makeReviver(actionsWithPaths);
    return (props) => {
      const clone = root2.cloneNode(true);
      return wrap_element_default(reviver.bind(undefined, clone, props));
    };
  };
  return makeComponent();
};
var template_default = template;

// libraries/solenopsys/converged-renderer/src/methods/tick.ts
import {tick} from "@solenopsys/converged-reactive";
var tick_default = tick;

// libraries/solenopsys/converged-renderer/src/microfrontends/cache.ts
async function loadMicrofronend(importModule) {
  console.log("LOAD MICROFRONTEND", importModule);
  const componentsMap = await importModule.createMicrofronend();
  Object.keys(componentsMap).forEach((key) => {
    MICROFRONTENDS_CACHE[key] = componentsMap[key];
  });
}
async function importModule(importPath) {
  console.log("START IMPORT MODULE", importPath);
  return await import(importPath);
}
async function loadModule(importPath, createMf = false) {
  if (MODULES_CACHE[importPath]) {
    return MODULES_CACHE[importPath];
  } else {
    const mod = await importModule(importPath);
    if (createMf)
      loadMicrofronend(mod);
    return mod;
  }
}
async function load(importPath) {
  return loadModule(importPath, true);
}
function resolveComponent(componentName) {
  console.log("RESOLVE COMPONENT", componentName);
  const [modulePaht, componentNameString] = componentName.split(":");
  const resolve9 = () => {
    return loadModule(modulePaht, false).then((mod) => {
      return mod[componentNameString];
    });
  };
  return lazy_default(resolve9);
}
var MODULES_CACHE = {};
var MICROFRONTENDS_CACHE = {};

// libraries/solenopsys/converged-renderer/src/components/dynamic_lazy.ts
import {untrack as untrack6} from "@solenopsys/converged-reactive";
var DynamicLazy = ({
  component,
  props,
  children
}) => {
  console.log("DynamicLazy", component);
  return untrack6(() => {
    const comp = resolveComponent(component);
    const element = create_element_default(comp, SS_default(props), children);
    return resolve_default(element);
  });
};
var dynamic_lazy_default = DynamicLazy;

// libraries/solenopsys/converged-renderer/src/components/error_boundary.ts
import {tryCatch} from "@solenopsys/converged-reactive";
var ErrorBoundary = ({
  fallback,
  children
}) => {
  return tryCatch(children, (props) => untrack_default(() => isFunction(fallback) ? fallback(props) : fallback));
};
var error_boundary_default = ErrorBoundary;

// libraries/solenopsys/converged-renderer/src/components/for.ts
import {for as _for} from "@solenopsys/converged-reactive";
var For = function({
  values,
  fallback,
  pooled,
  unkeyed,
  children
}) {
  return _for(values, children, fallback, { pooled, unkeyed });
};
var for_default = For;

// libraries/solenopsys/converged-renderer/src/components/fragment.ts
var Fragment = ({ children }) => {
  return children;
};
var fragment_default2 = Fragment;

// libraries/solenopsys/converged-renderer/src/hooks/use_guarded.ts
var useGuarded = (value, guard) => {
  let valueLast;
  const guarded = use_memo_default(() => {
    const current = SS_default(value);
    if (!guard(current))
      return valueLast;
    return valueLast = current;
  });
  return () => {
    const current = guarded();
    if (isNil(current))
      throw new Error("The value never passed the type guard");
    return current;
  };
};
var use_guarded_default = useGuarded;

// libraries/solenopsys/converged-renderer/src/components/if.ts
import {ternary} from "@solenopsys/converged-reactive";
var If = ({
  when,
  fallback,
  children
}) => {
  if (isFunction(children) && !is_observable_default(children) && !isComponent(children)) {
    const truthy = use_guarded_default(when, isTruthy);
    return ternary(when, use_untracked_default(() => children(truthy)), fallback);
  } else {
    return ternary(when, children, fallback);
  }
};
var if_default = If;

// libraries/solenopsys/converged-renderer/src/hooks/use_suspense.ts
import {suspense as suspense4} from "@solenopsys/converged-reactive";
var use_suspense_default = suspense4;

// libraries/solenopsys/converged-renderer/src/components/keep_alive.ts
import {with as _with3} from "@solenopsys/converged-reactive";
var cache2 = {};
var runWithSuperRoot = _with3();
var lockId = 1;
var KeepAlive = ({
  id,
  ttl,
  children
}) => {
  return use_memo_default(() => {
    return use_resolved_default([id, ttl], (id2, ttl2) => {
      const lock = lockId++;
      const item = cache2[id2] ||= { id: id2, lock };
      item.lock = lock;
      item.reset?.();
      item.suspended ||= S_default(false);
      item.suspended(false);
      if (!item.dispose || !item.result) {
        runWithSuperRoot(() => {
          use_root_default((dispose) => {
            item.dispose = () => {
              delete cache2[id2];
              dispose();
            };
            use_suspense_default(item.suspended, () => {
              item.result = resolve_default(children);
            });
          });
        });
      }
      use_cleanup_default(() => {
        const hasLock = () => lock === item.lock;
        if (!hasLock())
          return;
        item.suspended?.(true);
        if (!ttl2 || ttl2 <= 0 || ttl2 >= Infinity)
          return;
        const dispose = () => hasLock() && item.dispose?.();
        const timeoutId = setTimeout(dispose, ttl2);
        const reset = () => clearTimeout(timeoutId);
        item.reset = reset;
      });
      return item.result;
    });
  });
};
var keep_alive_default = KeepAlive;

// libraries/solenopsys/converged-renderer/src/components/suspense.ts
import {ternary as ternary2} from "@solenopsys/converged-reactive";
var Suspense = ({
  when,
  fallback,
  children
}) => {
  return suspense_context_default.wrap((suspense6) => {
    const condition = use_memo_default(() => !!SS_default(when) || suspense6.active());
    const childrenSuspended = use_suspense_default(condition, () => resolve_default(children));
    return ternary2(condition, fallback, childrenSuspended);
  });
};
var suspense_default = Suspense;

// libraries/solenopsys/converged-renderer/src/components/switch.ts
import {switch as _switch} from "@solenopsys/converged-reactive";
var Switch = ({
  when,
  fallback,
  children
}) => {
  const childrenWithValues = castArray(children);
  const values = childrenWithValues.map((child) => child().metadata);
  return _switch(when, values, fallback);
};
Switch.Case = ({
  when,
  children
}) => {
  const metadata = { metadata: [when, children] };
  return assign(() => children, metadata);
};
Switch.Default = ({
  children
}) => {
  const metadata = { metadata: [children] };
  return assign(() => children, metadata);
};
var switch_default = Switch;

// libraries/solenopsys/converged-renderer/src/components/ternary.ts
import {ternary as ternary3} from "@solenopsys/converged-reactive";
var Ternary = ({
  when,
  children
}) => {
  return ternary3(when, children[0], children[1]);
};
var ternary_default = Ternary;
// libraries/solenopsys/converged-renderer/src/jsx/runtime.ts
var jsx = (component, props) => {
  return create_element_default(component, props);
};
// libraries/solenopsys/converged-renderer/src/events/index.ts
import $ from "@solenopsys/converged-reactive";
var UiEvents = $({ type: "Start" });
$.effect(() => {
  console.log("NEX EVENT", UiEvents());
});
export {
  use_untracked_default as useUntracked,
  use_timeout_default as useTimeout,
  use_suspended_default as useSuspended,
  use_selector_default as useSelector,
  use_root_default as useRoot,
  use_resource_default as useResource,
  use_resolved_default as useResolved,
  use_readonly_default as useReadonly,
  use_promise_default as usePromise,
  use_microtask_default as useMicrotask,
  use_memo_default as useMemo,
  use_interval_default as useInterval,
  use_idle_loop_default as useIdleLoop,
  use_idle_callback_default as useIdleCallback,
  use_fetch_default as useFetch,
  use_event_listener_default as useEventListener,
  use_effect_default as useEffect,
  use_disposed_default as useDisposed,
  use_context_default as useContext,
  use_cleanup_default as useCleanup,
  use_boolean_default as useBoolean,
  use_animation_loop_default as useAnimationLoop,
  use_animation_frame_default as useAnimationFrame,
  use_abort_signal_default as useAbortSignal,
  use_abort_controller_default as useAbortController,
  untrack_default as untrack,
  tick_default as tick,
  template_default as template,
  store_default as store,
  resolve_default as resolve,
  render_to_string_default as renderToString,
  render_default as render,
  removeClassPlugin,
  loadModule,
  load,
  lazy_default as lazy,
  jsx as jsxs,
  jsx as jsxDEV,
  jsx,
  is_store_default as isStore,
  is_server_default as isServer,
  is_observable_default as isObservable,
  is_batching_default as isBatching,
  html_default as html,
  hmr_default as hmr,
  h_default as h,
  create_element_default as createElement,
  create_directive_default as createDirective,
  create_context_default as createContext,
  classListernerCallback,
  batch_default as batch,
  addClassPlugin,
  UiEvents,
  ternary_default as Ternary,
  switch_default as Switch,
  suspense_default as Suspense,
  portal_default as Portal,
  MICROFRONTENDS_CACHE,
  keep_alive_default as KeepAlive,
  if_default as If,
  fragment_default2 as Fragment,
  for_default as For,
  error_boundary_default as ErrorBoundary,
  dynamic_lazy_default as DynamicLazy,
  dynamic_default as Dynamic,
  SS_default as $$,
  S_default as $
};
