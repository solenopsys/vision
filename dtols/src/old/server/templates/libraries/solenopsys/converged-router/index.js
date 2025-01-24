// libraries/solenopsys/converged-router/src/components.tsx
import {If, useMemo as useMemo3} from "@solenopsys/converged-renderer";

// libraries/solenopsys/converged-router/src/integration.ts
import {useCleanup} from "@solenopsys/converged-renderer";
import $ from "@solenopsys/converged-reactive";

// libraries/solenopsys/converged-router/src/utils.ts
import {
useMemo
} from "@solenopsys/converged-renderer";
import {untrack} from "@solenopsys/converged-reactive";
var normalize = function(path, omitSlash = false) {
  const s = path.replace(trimPathRegex, "");
  return s ? omitSlash || /^[?#]/.test(s) ? s : "/" + s : "";
};
function resolvePath(base, path, from) {
  if (hasSchemeRegex.test(path)) {
    return;
  }
  const basePath = normalize(base);
  const fromPath = from && normalize(from);
  let result = "";
  if (!fromPath || path.startsWith("/")) {
    result = basePath;
  } else if (fromPath.toLowerCase().indexOf(basePath.toLowerCase()) !== 0) {
    result = basePath + fromPath;
  } else {
    result = fromPath;
  }
  return (result || "/") + normalize(path, !result);
}
function invariant(value, message) {
  if (value == null) {
    throw new Error(message);
  }
  return value;
}
function joinPaths(from, to) {
  return normalize(from).replace(/\/*(\*.*)?$/g, "") + normalize(to);
}
function extractSearchParams(url) {
  const params = {};
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}
function urlDecode(str, isQuery) {
  return decodeURIComponent(isQuery ? str.replace(/\+/g, " ") : str);
}
function createMatcher(path, partial) {
  const [pattern, splat] = path.split("/*", 2);
  const segments = pattern.split("/").filter(Boolean);
  const len = segments.length;
  return (location) => {
    const locSegments = location.split("/").filter(Boolean);
    const lenDiff = locSegments.length - len;
    if (lenDiff < 0 || lenDiff > 0 && splat === undefined && !partial) {
      return null;
    }
    const match = {
      path: len ? "" : "/",
      params: {}
    };
    for (let i = 0;i < len; i++) {
      const segment = segments[i];
      const locSegment = locSegments[i];
      if (segment[0] === ":") {
        match.params[segment.slice(1)] = locSegment;
      } else if (segment.localeCompare(locSegment, undefined, {
        sensitivity: "base"
      }) !== 0) {
        return null;
      }
      match.path += `/${locSegment}`;
    }
    if (splat) {
      match.params[splat] = lenDiff ? locSegments.slice(-lenDiff).join("/") : "";
    }
    return match;
  };
}
function scoreRoute(route) {
  const [pattern, splat] = route.pattern.split("/*", 2);
  const segments = pattern.split("/").filter(Boolean);
  return segments.reduce((score, segment) => score + (segment.startsWith(":") ? 2 : 3), segments.length - (splat === undefined ? 0 : 1));
}
function createMemoObject(fn) {
  const map = new Map;
  return new Proxy({}, {
    get(_, property) {
      if (!map.has(property)) {
        map.set(property, useMemo(() => fn()[property]));
      }
      return map.get(property)?.();
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    },
    ownKeys() {
      return Reflect.ownKeys(fn());
    }
  });
}
function mergeSearchString(search, params) {
  const merged = new URLSearchParams(search);
  Object.entries(params).forEach(([key, value]) => {
    if (value == null || value === "") {
      merged.delete(key);
    } else {
      merged.set(key, String(value));
    }
  });
  const s = merged.toString();
  return s ? `?${s}` : "";
}
function on(deps, fn) {
  return useMemo(() => {
    deps();
    return untrack(fn);
  });
}
function useSignal(observable) {
  const get = () => observable();
  const set = (value) => observable(value);
  return [get, set];
}
function expandOptionals(pattern) {
  let match = /(\/?:[^/]+)\?/.exec(pattern);
  if (!match)
    return [pattern];
  let prefix = pattern.slice(0, match.index);
  let suffix = pattern.slice(match.index + match[0].length);
  const prefixes = [prefix, prefix += match[1]];
  while (match = /^(\/:[^/]+)\?/.exec(suffix)) {
    prefixes.push(prefix += match[1]);
    suffix = suffix.slice(match[0].length);
  }
  return expandOptionals(suffix).reduce((results, expansion) => [...results, ...prefixes.map((p) => p + expansion)], []);
}
var hasSchemeRegex = /^(?:[a-z0-9]+:)?\/\//i;
var trimPathRegex = /^\/+/g;

// libraries/solenopsys/converged-router/src/integration.ts
var bindEvent = function(target, type, handler) {
  target.addEventListener(type, handler);
  return () => target.removeEventListener(type, handler);
};
var intercept = function(intercepted, get, set) {
  return [
    get ? () => get(intercepted()) : () => intercepted(),
    set ? (v) => intercepted(set(v)) : intercepted
  ];
};
var querySelector = function(selector) {
  try {
    return document.querySelector(selector);
  } catch (e) {
    return null;
  }
};
var scrollToHash = function(hash, fallbackTop) {
  const el = querySelector(`#${hash}`);
  if (el) {
    el.scrollIntoView();
  } else if (fallbackTop) {
    window.scrollTo(0, 0);
  }
};
function createIntegration(get, set, init, utils) {
  let ignore = false;
  const wrap = (value) => typeof value === "string" ? { value } : value;
  const signal = intercept($(wrap(get()), { equals: (a, b) => a.value === b.value }), undefined, (next) => {
    !ignore && set(next);
    return next;
  });
  init && useCleanup(init((value = get()) => {
    ignore = true;
    signal[1](wrap(value));
    ignore = false;
  }));
  return {
    signal,
    utils
  };
}
function normalizeIntegration(integration) {
  if (!integration) {
    return {
      signal: useSignal($({ value: "" }))
    };
  } else if (Array.isArray(integration)) {
    return {
      signal: integration
    };
  }
  return integration;
}
function staticIntegration(obj) {
  return {
    signal: [() => obj, (next) => Object.assign(obj, next)]
  };
}
function pathIntegration() {
  return createIntegration(() => ({
    value: window.location.pathname + window.location.search + window.location.hash,
    state: history.state
  }), ({ value, replace, scroll, state }) => {
    if (replace) {
      window.history.replaceState(state, "", value);
    } else {
      window.history.pushState(state, "", value);
    }
    scrollToHash(window.location.hash.slice(1), scroll);
  }, (notify) => bindEvent(window, "popstate", () => notify()), {
    go: (delta) => window.history.go(delta)
  });
}
function hashIntegration() {
  return createIntegration(() => window.location.hash.slice(1), ({ value, replace, scroll, state }) => {
    if (replace) {
      window.history.replaceState(state, "", "#" + value);
    } else {
      window.location.hash = value;
    }
    const hashIndex = value.indexOf("#");
    const hash = hashIndex >= 0 ? value.slice(hashIndex + 1) : "";
    scrollToHash(hash, scroll);
  }, (notify) => bindEvent(window, "hashchange", () => notify()), {
    go: (delta) => window.history.go(delta),
    renderPath: (path) => `#${path}`,
    parsePath: (str) => {
      const to = str.replace(/^.*?#/, "");
      if (!to.startsWith("/")) {
        const [, path = "/"] = window.location.hash.split("#", 2);
        return `${path}#${to}`;
      }
      return to;
    }
  });
}

// libraries/solenopsys/converged-router/src/routing.ts
import {
createContext,
useContext,
useMemo as useMemo2,
untrack as untrack2,
createElement,
useEffect,
useCleanup as useCleanup2,
useResolved
} from "@solenopsys/converged-renderer";
import $2 from "@solenopsys/converged-reactive";
var asArray = function(value) {
  return Array.isArray(value) ? value : [value];
};
function createRoutes(routeDef, base = "", fallback) {
  const { component, data, children } = routeDef;
  const isLeaf = !children || Array.isArray(children) && !children.length;
  const shared = {
    key: routeDef,
    element: component ? () => createElement(component, {}) : () => {
      const { element } = routeDef;
      return element === undefined && fallback ? createElement(fallback, {}) : element;
    },
    preload: routeDef.component ? component.preload : routeDef.preload,
    data
  };
  return asArray(routeDef.path).reduce((acc, path) => {
    for (const originalPath of expandOptionals(path)) {
      const path2 = joinPaths(base, originalPath);
      const pattern = isLeaf ? path2 : path2.split("/*", 1)[0];
      acc.push({
        ...shared,
        originalPath,
        pattern,
        matcher: createMatcher(pattern, !isLeaf)
      });
    }
    return acc;
  }, []);
}
function createBranch(routes, index = 0) {
  return {
    routes,
    score: scoreRoute(routes[routes.length - 1]) * 1e4 - index,
    matcher(location) {
      const matches = [];
      for (let i = routes.length - 1;i >= 0; i--) {
        const route = routes[i];
        const match = route.matcher(location);
        if (!match) {
          return null;
        }
        matches.unshift({
          ...match,
          route
        });
      }
      return matches;
    }
  };
}
function createBranches(routeDef, base = "", fallback, stack = [], branches = []) {
  const routeDefs = asArray(useResolved(routeDef, true));
  for (let i = 0, len = routeDefs.length;i < len; i++) {
    const def = routeDefs[i];
    if (def && typeof def === "object" && Object.prototype.hasOwnProperty.call(def, "path")) {
      const routes = createRoutes(def, base, fallback);
      for (const route of routes) {
        stack.push(route);
        if (def.children) {
          createBranches(def.children, route.pattern, fallback, stack, branches);
        } else {
          const branch = createBranch([...stack], branches.length);
          branches.push(branch);
        }
        stack.pop();
      }
    }
  }
  return stack.length ? branches : branches.sort((a, b) => b.score - a.score);
}
function getRouteMatches(branches, location) {
  for (let i = 0, len = branches.length;i < len; i++) {
    const match = branches[i].matcher(location);
    if (match) {
      return match;
    }
  }
  return [];
}
function createLocation(path, state) {
  const url = useMemo2(() => {
    const path_ = path();
    try {
      const url2 = new URL(path_, origin);
      prevUrl = url2;
      return url2;
    } catch (err) {
      console.error(`Invalid path ${path_}`);
      return prevUrl;
    }
  }, {
    equals: (a, b) => a?.href === b?.href
  });
  const pathname = useMemo2(() => urlDecode(url().pathname));
  const search = useMemo2(() => urlDecode(url().search, true));
  const hash = useMemo2(() => urlDecode(url().hash));
  const key = useMemo2(() => "");
  return {
    get pathname() {
      return pathname();
    },
    get search() {
      return search();
    },
    get hash() {
      return hash();
    },
    get state() {
      return Object.freeze(state());
    },
    get key() {
      return key();
    },
    query: createMemoObject(on(search, () => extractSearchParams(url())))
  };
}
function createRouterContext(integration, base = "", data, out) {
  const {
    signal: [source, setSource],
    utils = {}
  } = normalizeIntegration(integration);
  const parsePath = utils.parsePath || ((p) => p);
  const renderPath = utils.renderPath || ((p) => p);
  const basePath = resolvePath("", base);
  const output = out ? Object.assign(out, {
    matches: [],
    url: undefined
  }) : undefined;
  if (basePath === undefined) {
    throw new Error(`Invalid base path`);
  } else if (basePath && !source().value) {
    setSource({ value: basePath, replace: true, scroll: false });
  }
  const reference$ = $2(source().value);
  const state$ = $2(source().state);
  const location = createLocation(reference$, state$);
  const referrers = [];
  const baseRoute = {
    pattern: basePath,
    params: {},
    path: () => basePath,
    outlet: () => null,
    resolvePath(to) {
      return resolvePath(basePath, to);
    }
  };
  if (data) {
    try {
      TempRoute = baseRoute;
      baseRoute.data = data({
        data: undefined,
        params: {},
        location,
        navigate: navigatorFactory(baseRoute)
      });
    } finally {
      TempRoute = undefined;
    }
  }
  function navigateFromRoute(route, to, options) {
    untrack2(() => {
      if (typeof to === "number") {
        if (!to) {
        } else if (utils.go)
          utils.go(to);
        else
          console.warn("Router integration does not support relative routing");
        return;
      }
      const {
        replace,
        resolve,
        scroll,
        state: nextState
      } = {
        replace: false,
        resolve: true,
        scroll: true,
        ...options
      };
      const resolvedTo = resolve ? route.resolvePath(to) : resolvePath("", to);
      if (resolvedTo === undefined) {
        throw new Error(`Path '${to}' is not a routable path`);
      } else if (referrers.length >= MAX_REDIRECTS) {
        throw new Error("Too many redirects");
      }
      const current = reference$();
      if (resolvedTo !== current || nextState !== state$()) {
        const len = referrers.push({
          value: current,
          replace,
          scroll,
          state: state$()
        });
        reference$(resolvedTo);
        state$(nextState);
        if (referrers.length === len) {
          navigateEnd({
            value: resolvedTo,
            state: nextState
          });
        }
      }
    });
  }
  function navigatorFactory(route) {
    route = route || useContext(RouteContextObj) || baseRoute;
    return (to, options) => route && navigateFromRoute(route, to, options);
  }
  function navigateEnd(next) {
    const first = referrers[0];
    if (first) {
      if (next.value !== first.value || next.state !== first.state) {
        setSource({
          ...next,
          replace: first.replace,
          scroll: first.scroll
        });
      }
      referrers.length = 0;
    }
  }
  useEffect(() => {
    const { value, state } = source();
    untrack2(() => {
      if (value !== reference$()) {
        reference$(value);
        state$(state);
      }
    });
  });
  function handleAnchorClick(evt) {
    if (evt.defaultPrevented || evt.button !== 0 || evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey)
      return;
    const a = evt.composedPath().find((el) => el instanceof Node && el.nodeName.toUpperCase() === "A");
    if (!a || !a.hasAttribute("link"))
      return;
    const href = a.href;
    if (a.target || !href && !a.hasAttribute("state"))
      return;
    const rel = (a.getAttribute("rel") || "").split(/\s+/);
    if (a.hasAttribute("download") || rel && rel.includes("external"))
      return;
    const url = new URL(href);
    const pathname = urlDecode(url.pathname);
    if (url.origin !== window.location.origin || basePath && pathname && !pathname.toLowerCase().startsWith(basePath.toLowerCase()))
      return;
    const to = parsePath(pathname + urlDecode(url.search, true) + urlDecode(url.hash));
    const state = a.getAttribute("state");
    evt.preventDefault();
    navigateFromRoute(baseRoute, to, {
      resolve: false,
      replace: a.hasAttribute("replace"),
      scroll: !a.hasAttribute("noscroll"),
      state: state && JSON.parse(state)
    });
  }
  document.addEventListener("click", handleAnchorClick);
  useCleanup2(() => document.removeEventListener("click", handleAnchorClick));
  return {
    base: baseRoute,
    out: output,
    location,
    renderPath,
    parsePath,
    navigatorFactory
  };
}
function createRouteContext(router, parent, child, match) {
  const { base, location, navigatorFactory } = router;
  const { pattern, element: outlet, preload, data } = match().route;
  const path = useMemo2(() => match().path);
  const params = createMemoObject(() => match().params);
  preload?.();
  const route = {
    parent,
    pattern,
    get child() {
      return child();
    },
    path,
    params,
    data: parent.data,
    outlet,
    resolvePath(to) {
      return resolvePath(base.path(), to, path());
    }
  };
  if (data) {
    try {
      TempRoute = route;
      route.data = data({
        data: parent.data,
        params,
        location,
        navigate: navigatorFactory(route)
      });
    } finally {
      TempRoute = undefined;
    }
  }
  return route;
}
var MAX_REDIRECTS = 100;
var RouterContextObj = createContext();
var RouteContextObj = createContext();
var useRouter = () => invariant(useContext(RouterContextObj), "Make sure your app is wrapped in a <Router />");
var TempRoute;
var useRoute = () => TempRoute || useContext(RouteContextObj) || useRouter().base;
var useResolvedPath = (path) => {
  const route = useRoute();
  return useMemo2(() => route.resolvePath(path()));
};
var useHref = (to) => {
  const router = useRouter();
  return useMemo2(() => {
    const to_ = to();
    return to_ !== undefined ? router.renderPath(to_) : to_;
  });
};
var useNavigate = () => useRouter().navigatorFactory();
var useLocation = () => useRouter().location;
var useMatch = (path) => {
  const location = useLocation();
  const matcher = useMemo2(() => createMatcher(path()));
  return useMemo2(() => matcher()(location.pathname));
};
var useParams = () => useRoute().params;
var useRouteData = () => useRoute().data;
var useSearchParams = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setSearchParams = (params, options) => {
    const searchString = untrack2(() => mergeSearchString(location.search, params));
    navigate(`${location.pathname}${searchString}`, {
      scroll: false,
      ...options
    });
  };
  return [location.query, setSearchParams];
};
var prevUrl = new URL("http://sar");

// libraries/solenopsys/converged-router/src/components.tsx
function A({
  activeClass = "active",
  inactiveClass = "inactive",
  children,
  class: class_,
  end,
  href,
  state,
  ...rest
}) {
  const to = useResolvedPath(() => href);
  const location = useLocation();
  const isActive = useMemo3(() => {
    const to_ = to();
    if (to_ === undefined)
      return false;
    const path = to_.split(/[?#]/, 1)[0].toLowerCase();
    const loc = location.pathname.toLowerCase();
    return end ? path === loc : loc.startsWith(path);
  });
  return jsxDEV("a", {
    link: true,
    ...rest,
    href: useHref(to)() ?? href,
    state: JSON.stringify(state),
    class: () => [
      {
        [inactiveClass]: !isActive(),
        [activeClass]: isActive()
      },
      class_
    ],
    "aria-current": () => isActive() ? "page" : undefined,
    children
  }, undefined, false, undefined, this);
}
function Navigate(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { href, state } = props;
  const path = typeof href === "function" ? href({ navigate, location }) : href;
  navigate(path, { replace: true, state });
  return null;
}
import {
jsxDEV
} from "@solenopsys/converged-renderer/jsx-dev-runtime";
var Router = (props) => {
  const { source, base, data, out } = props;
  const integration = source || pathIntegration();
  const routerState = createRouterContext(integration, base, data, out);
  console.log("INIT ROUTER CONTEXT");
  return jsxDEV(RouterContextObj.Provider, {
    value: routerState,
    children: props.children
  }, undefined, false, undefined, this);
};
var Routes = (props) => {
  const router = useRouter();
  const parentRoute = useRoute();
  const branches = useMemo3(() => createBranches(props.children, joinPaths(parentRoute.pattern, props.base || ""), Outlet));
  const matches = useMemo3(() => getRouteMatches(branches(), router.location.pathname));
  if (router.out) {
    router.out.matches.push(matches().map(({ route, path, params }) => ({
      originalPath: route.originalPath,
      pattern: route.pattern,
      path,
      params
    })));
  }
  let root;
  let prevMatches;
  let prev;
  const routeStates = useMemo3(on(matches, () => {
    let equal = matches().length === prevMatches?.length;
    const next = [];
    for (let i = 0, len = matches().length;i < len; i++) {
      const prevMatch = prevMatches?.[i];
      const nextMatch = matches()[i];
      if (prev && prevMatch && nextMatch.route.key === prevMatch.route.key) {
        next[i] = prev[i];
      } else {
        equal = false;
        next[i] = createRouteContext(router, next[i - 1] || parentRoute, () => routeStates()[i + 1], () => matches()[i]);
      }
    }
    if (prev && equal)
      return prev;
    root = next[0];
    prevMatches = [...matches()];
    prev = [...next];
    return next;
  }));
  return jsxDEV(If, {
    when: () => routeStates() && root,
    children: (route) => jsxDEV(RouteContextObj.Provider, {
      value: route(),
      children: () => route().outlet()
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
};
var useRoutes = (routes, base) => () => jsxDEV(Routes, {
  base,
  children: routes
}, undefined, false, undefined, this);
var Route = (props) => props;
var Outlet = () => {
  const route = useRoute();
  return jsxDEV(If, {
    when: () => route.child,
    children: (child) => jsxDEV(RouteContextObj.Provider, {
      value: child(),
      children: () => child().outlet()
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
};
export {
  useSearchParams,
  useRoutes,
  useRouteData,
  useResolvedPath,
  useParams,
  useNavigate,
  useMatch,
  useLocation,
  useHref,
  staticIntegration,
  pathIntegration,
  normalizeIntegration,
  hashIntegration,
  createIntegration,
  mergeSearchString as _mergeSearchString,
  Routes,
  Router,
  Route,
  Outlet,
  Navigate,
  A as NavLink,
  A as Link,
  A
};
