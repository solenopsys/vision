var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.umd.js
var require_sourcemap_codec_umd = __commonJS((exports, module) => {
  (function(global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.sourcemapCodec = {}));
  })(exports, function(exports2) {
    const comma = ",".charCodeAt(0);
    const semicolon = ";".charCodeAt(0);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    const intToChar = new Uint8Array(64);
    const charToInt = new Uint8Array(128);
    for (let i = 0;i < chars.length; i++) {
      const c = chars.charCodeAt(i);
      intToChar[i] = c;
      charToInt[c] = i;
    }
    const td = typeof TextDecoder !== "undefined" ? new TextDecoder : typeof Buffer !== "undefined" ? {
      decode(buf) {
        const out = Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
        return out.toString();
      }
    } : {
      decode(buf) {
        let out = "";
        for (let i = 0;i < buf.length; i++) {
          out += String.fromCharCode(buf[i]);
        }
        return out;
      }
    };
    function decode(mappings) {
      const state = new Int32Array(5);
      const decoded = [];
      let index = 0;
      do {
        const semi = indexOf(mappings, index);
        const line = [];
        let sorted = true;
        let lastCol = 0;
        state[0] = 0;
        for (let i = index;i < semi; i++) {
          let seg;
          i = decodeInteger(mappings, i, state, 0);
          const col = state[0];
          if (col < lastCol)
            sorted = false;
          lastCol = col;
          if (hasMoreVlq(mappings, i, semi)) {
            i = decodeInteger(mappings, i, state, 1);
            i = decodeInteger(mappings, i, state, 2);
            i = decodeInteger(mappings, i, state, 3);
            if (hasMoreVlq(mappings, i, semi)) {
              i = decodeInteger(mappings, i, state, 4);
              seg = [col, state[1], state[2], state[3], state[4]];
            } else {
              seg = [col, state[1], state[2], state[3]];
            }
          } else {
            seg = [col];
          }
          line.push(seg);
        }
        if (!sorted)
          sort(line);
        decoded.push(line);
        index = semi + 1;
      } while (index <= mappings.length);
      return decoded;
    }
    function indexOf(mappings, index) {
      const idx = mappings.indexOf(";", index);
      return idx === -1 ? mappings.length : idx;
    }
    function decodeInteger(mappings, pos, state, j) {
      let value = 0;
      let shift = 0;
      let integer = 0;
      do {
        const c = mappings.charCodeAt(pos++);
        integer = charToInt[c];
        value |= (integer & 31) << shift;
        shift += 5;
      } while (integer & 32);
      const shouldNegate = value & 1;
      value >>>= 1;
      if (shouldNegate) {
        value = -2147483648 | -value;
      }
      state[j] += value;
      return pos;
    }
    function hasMoreVlq(mappings, i, length) {
      if (i >= length)
        return false;
      return mappings.charCodeAt(i) !== comma;
    }
    function sort(line) {
      line.sort(sortComparator);
    }
    function sortComparator(a, b) {
      return a[0] - b[0];
    }
    function encode(decoded) {
      const state = new Int32Array(5);
      const bufLength = 1024 * 16;
      const subLength = bufLength - 36;
      const buf = new Uint8Array(bufLength);
      const sub = buf.subarray(0, subLength);
      let pos = 0;
      let out = "";
      for (let i = 0;i < decoded.length; i++) {
        const line = decoded[i];
        if (i > 0) {
          if (pos === bufLength) {
            out += td.decode(buf);
            pos = 0;
          }
          buf[pos++] = semicolon;
        }
        if (line.length === 0)
          continue;
        state[0] = 0;
        for (let j = 0;j < line.length; j++) {
          const segment = line[j];
          if (pos > subLength) {
            out += td.decode(sub);
            buf.copyWithin(0, subLength, pos);
            pos -= subLength;
          }
          if (j > 0)
            buf[pos++] = comma;
          pos = encodeInteger(buf, pos, state, segment, 0);
          if (segment.length === 1)
            continue;
          pos = encodeInteger(buf, pos, state, segment, 1);
          pos = encodeInteger(buf, pos, state, segment, 2);
          pos = encodeInteger(buf, pos, state, segment, 3);
          if (segment.length === 4)
            continue;
          pos = encodeInteger(buf, pos, state, segment, 4);
        }
      }
      return out + td.decode(buf.subarray(0, pos));
    }
    function encodeInteger(buf, pos, state, segment, j) {
      const next = segment[j];
      let num = next - state[j];
      state[j] = next;
      num = num < 0 ? -num << 1 | 1 : num << 1;
      do {
        let clamped = num & 31;
        num >>>= 5;
        if (num > 0)
          clamped |= 32;
        buf[pos++] = intToChar[clamped];
      } while (num > 0);
      return pos;
    }
    exports2.decode = decode;
    exports2.encode = encode;
    Object.defineProperty(exports2, "__esModule", { value: true });
  });
});

// libraries/solenopsys/converged-style/src/browser/class-injector.ts
class StylesInjector {
  document2;
  cssCache = new Map;
  constructor(document2) {
    this.document = document2;
  }
  createCSSClass(className, styles) {
    if (this.cssCache.has(className)) {
      return false;
    }
    const styleElement = this.document.createElement("style");
    styleElement.setAttribute("type", "text/css");
    const cssText = `.${className} { ${styles} }`;
    styleElement.textContent = cssText;
    this.document.head.appendChild(styleElement);
    this.cssCache.set(className, cssText);
    return true;
  }
}
// libraries/solenopsys/converged-style/src/browser/styles-injector.ts
function injectStyle(text) {
  if (typeof document !== "undefined") {
    const styleTag = document.getElementById("bun_lightningcss");
    if (styleTag) {
      const node2 = document.createTextNode(text);
      styleTag.appendChild(node2);
      return;
    }
    var style = document.createElement("style");
    style.id = "bun_lightningcss";
    var node = document.createTextNode(text);
    style.appendChild(node);
    document.head.appendChild(style);
  }
}
// node_modules/@unocss/core/dist/index.mjs
var escapeRegExp = function(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
var escapeSelector = function(str) {
  const length = str.length;
  let index = -1;
  let codeUnit;
  let result = "";
  const firstCodeUnit = str.charCodeAt(0);
  while (++index < length) {
    codeUnit = str.charCodeAt(index);
    if (codeUnit === 0) {
      result += "\uFFFD";
      continue;
    }
    if (codeUnit === 37) {
      result += "\\%";
      continue;
    }
    if (codeUnit === 44) {
      result += "\\,";
      continue;
    }
    if (codeUnit >= 1 && codeUnit <= 31 || codeUnit === 127 || index === 0 && codeUnit >= 48 && codeUnit <= 57 || index === 1 && codeUnit >= 48 && codeUnit <= 57 && firstCodeUnit === 45) {
      result += `\\${codeUnit.toString(16)} `;
      continue;
    }
    if (index === 0 && length === 1 && codeUnit === 45) {
      result += `\\${str.charAt(index)}`;
      continue;
    }
    if (codeUnit >= 128 || codeUnit === 45 || codeUnit === 95 || codeUnit >= 48 && codeUnit <= 57 || codeUnit >= 65 && codeUnit <= 90 || codeUnit >= 97 && codeUnit <= 122) {
      result += str.charAt(index);
      continue;
    }
    result += `\\${str.charAt(index)}`;
  }
  return result;
};
var toArray = function(value = []) {
  return Array.isArray(value) ? value : [value];
};
var uniq = function(value) {
  return Array.from(new Set(value));
};
var uniqueBy = function(array, equalFn) {
  return array.reduce((acc, cur) => {
    const index = acc.findIndex((item) => equalFn(cur, item));
    if (index === -1)
      acc.push(cur);
    return acc;
  }, []);
};
var isString = function(s) {
  return typeof s === "string";
};
var normalizeCSSEntries = function(obj) {
  if (isString(obj))
    return obj;
  return (!Array.isArray(obj) ? Object.entries(obj) : obj).filter((i) => i[1] != null);
};
var normalizeCSSValues = function(obj) {
  if (Array.isArray(obj)) {
    if (obj.find((i) => !Array.isArray(i) || Array.isArray(i[0])))
      return obj.map((i) => normalizeCSSEntries(i));
    else
      return [obj];
  } else {
    return [normalizeCSSEntries(obj)];
  }
};
var clearIdenticalEntries = function(entry) {
  return entry.filter(([k, v], idx) => {
    if (k.startsWith("$$"))
      return false;
    for (let i = idx - 1;i >= 0; i--) {
      if (entry[i][0] === k && entry[i][1] === v)
        return false;
    }
    return true;
  });
};
var entriesToCss = function(arr) {
  if (arr == null)
    return "";
  return clearIdenticalEntries(arr).map(([key, value]) => value != null ? `${key}:${value};` : undefined).filter(Boolean).join("");
};
var isObject = function(item) {
  return item && typeof item === "object" && !Array.isArray(item);
};
var mergeDeep = function(original, patch, mergeArray = false) {
  const o = original;
  const p = patch;
  if (Array.isArray(p)) {
    if (mergeArray && Array.isArray(p))
      return [...o, ...p];
    else
      return [...p];
  }
  const output = { ...o };
  if (isObject(o) && isObject(p)) {
    Object.keys(p).forEach((key) => {
      if (isObject(o[key]) && isObject(p[key]) || Array.isArray(o[key]) && Array.isArray(p[key]))
        output[key] = mergeDeep(o[key], p[key], mergeArray);
      else
        Object.assign(output, { [key]: p[key] });
    });
  }
  return output;
};
var clone = function(val) {
  let k, out, tmp;
  if (Array.isArray(val)) {
    out = Array(k = val.length);
    while (k--)
      out[k] = (tmp = val[k]) && typeof tmp === "object" ? clone(tmp) : tmp;
    return out;
  }
  if (Object.prototype.toString.call(val) === "[object Object]") {
    out = {};
    for (k in val) {
      if (k === "__proto__") {
        Object.defineProperty(out, k, {
          value: clone(val[k]),
          configurable: true,
          enumerable: true,
          writable: true
        });
      } else {
        out[k] = (tmp = val[k]) && typeof tmp === "object" ? clone(tmp) : tmp;
      }
    }
    return out;
  }
  return val;
};
var isStaticRule = function(rule) {
  return isString(rule[0]);
};
var isStaticShortcut = function(sc) {
  return isString(sc[0]);
};
var isAttributifySelector = function(selector) {
  return selector.match(attributifyRE);
};
var isValidSelector = function(selector = "") {
  return validateFilterRE.test(selector);
};
var normalizeVariant = function(variant) {
  return typeof variant === "function" ? { match: variant } : variant;
};
var isRawUtil = function(util) {
  return util.length === 3;
};
var notNull = function(value) {
  return value != null;
};
var noop = function() {
};
var isCountableSet = function(value) {
  return value instanceof CountableSet;
};
var makeRegexClassGroup = function(separators = ["-", ":"]) {
  const key = separators.join("|");
  if (!regexCache[key])
    regexCache[key] = new RegExp(`((?:[!@<~\\w+:_/-]|\\[&?>?:?\\S*\\])+?)(${key})\\(((?:[~!<>\\w\\s:/\\\\,%#.\$?-]|\\[.*?\\])+?)\\)(?!\\s*?=>)`, "gm");
  regexCache[key].lastIndex = 0;
  return regexCache[key];
};
var parseVariantGroup = function(str, separators = ["-", ":"], depth = 5) {
  const regexClassGroup = makeRegexClassGroup(separators);
  let hasChanged;
  let content = str.toString();
  const prefixes = new Set;
  const groupsByOffset = new Map;
  do {
    hasChanged = false;
    content = content.replace(regexClassGroup, (from, pre, sep, body, groupOffset) => {
      if (!separators.includes(sep))
        return from;
      hasChanged = true;
      prefixes.add(pre + sep);
      const bodyOffset = groupOffset + pre.length + sep.length + 1;
      const group = { length: from.length, items: [] };
      groupsByOffset.set(groupOffset, group);
      for (const itemMatch of [...body.matchAll(/\S+/g)]) {
        const itemOffset = bodyOffset + itemMatch.index;
        let innerItems = groupsByOffset.get(itemOffset)?.items;
        if (innerItems) {
          groupsByOffset.delete(itemOffset);
        } else {
          innerItems = [{
            offset: itemOffset,
            length: itemMatch[0].length,
            className: itemMatch[0]
          }];
        }
        for (const item of innerItems) {
          item.className = item.className === "~" ? pre : item.className.replace(/^(!?)(.*)/, `\$1${pre}${sep}\$2`);
          group.items.push(item);
        }
      }
      return "$".repeat(from.length);
    });
    depth -= 1;
  } while (hasChanged && depth);
  let expanded;
  if (typeof str === "string") {
    expanded = "";
    let prevOffset = 0;
    for (const [offset, group] of groupsByOffset) {
      expanded += str.slice(prevOffset, offset);
      expanded += group.items.map((item) => item.className).join(" ");
      prevOffset = offset + group.length;
    }
    expanded += str.slice(prevOffset);
  } else {
    expanded = str;
    for (const [offset, group] of groupsByOffset) {
      expanded.overwrite(offset, offset + group.length, group.items.map((item) => item.className).join(" "));
    }
  }
  return {
    prefixes: Array.from(prefixes),
    hasChanged,
    groupsByOffset,
    get expanded() {
      return expanded.toString();
    }
  };
};
var expandVariantGroup = function(str, separators = ["-", ":"], depth = 5) {
  const res = parseVariantGroup(str, separators, depth);
  return typeof str === "string" ? res.expanded : str;
};
var warnOnce = function(msg) {
  if (warned.has(msg))
    return;
  console.warn("[unocss]", msg);
  warned.add(msg);
};
var splitCode = function(code) {
  return code.split(defaultSplitRE);
};
var createNanoEvents = function() {
  return {
    events: {},
    emit(event, ...args) {
      (this.events[event] || []).forEach((i) => i(...args));
    },
    on(event, cb) {
      (this.events[event] = this.events[event] || []).push(cb);
      return () => this.events[event] = (this.events[event] || []).filter((i) => i !== cb);
    }
  };
};
var resolveShortcuts = function(shortcuts) {
  return toArray(shortcuts).flatMap((s) => {
    if (Array.isArray(s))
      return [s];
    return Object.entries(s);
  });
};
var resolvePreset = function(presetInput) {
  let preset = typeof presetInput === "function" ? presetInput() : presetInput;
  if (__RESOLVED in preset)
    return preset;
  preset = { ...preset };
  Object.defineProperty(preset, __RESOLVED, {
    value: true,
    enumerable: false
  });
  const shortcuts = preset.shortcuts ? resolveShortcuts(preset.shortcuts) : undefined;
  preset.shortcuts = shortcuts;
  if (preset.prefix || preset.layer) {
    const apply = (i) => {
      if (!i[2])
        i[2] = {};
      const meta = i[2];
      if (meta.prefix == null && preset.prefix)
        meta.prefix = toArray(preset.prefix);
      if (meta.layer == null && preset.layer)
        meta.layer = preset.layer;
    };
    shortcuts?.forEach(apply);
    preset.rules?.forEach(apply);
  }
  return preset;
};
var resolvePresets = function(preset) {
  const root = resolvePreset(preset);
  if (!root.presets)
    return [root];
  const nested = (root.presets || []).flatMap(toArray).flatMap(resolvePresets);
  return [root, ...nested];
};
var resolveConfig = function(userConfig = {}, defaults = {}) {
  const config = Object.assign({}, defaults, userConfig);
  const rawPresets = uniqueBy((config.presets || []).flatMap(toArray).flatMap(resolvePresets), (a, b) => a.name === b.name);
  const sortedPresets = [
    ...rawPresets.filter((p) => p.enforce === "pre"),
    ...rawPresets.filter((p) => !p.enforce),
    ...rawPresets.filter((p) => p.enforce === "post")
  ];
  const sources = [
    ...sortedPresets,
    config
  ];
  const sourcesReversed = [...sources].reverse();
  const layers = Object.assign({}, DEFAULT_LAYERS, ...sources.map((i) => i.layers));
  function getMerged(key) {
    return uniq(sources.flatMap((p) => toArray(p[key] || [])));
  }
  const extractors = getMerged("extractors");
  let extractorDefault = sourcesReversed.find((i) => i.extractorDefault !== undefined)?.extractorDefault;
  if (extractorDefault === undefined)
    extractorDefault = extractorSplit;
  if (extractorDefault && !extractors.includes(extractorDefault))
    extractors.unshift(extractorDefault);
  extractors.sort((a, b) => (a.order || 0) - (b.order || 0));
  const rules = getMerged("rules");
  const rulesStaticMap = {};
  const rulesSize = rules.length;
  const rulesDynamic = rules.map((rule, i) => {
    if (isStaticRule(rule)) {
      const prefixes = toArray(rule[2]?.prefix || "");
      prefixes.forEach((prefix) => {
        rulesStaticMap[prefix + rule[0]] = [i, rule[1], rule[2], rule];
      });
      return;
    }
    return [i, ...rule];
  }).filter(Boolean).reverse();
  let theme = mergeThemes(sources.map((p) => p.theme));
  const extendThemes = getMerged("extendTheme");
  for (const extendTheme of extendThemes)
    theme = extendTheme(theme) || theme;
  const autocomplete = {
    templates: uniq(sources.flatMap((p) => toArray(p.autocomplete?.templates))),
    extractors: sources.flatMap((p) => toArray(p.autocomplete?.extractors)).sort((a, b) => (a.order || 0) - (b.order || 0)),
    shorthands: mergeAutocompleteShorthands(sources.map((p) => p.autocomplete?.shorthands || {}))
  };
  let separators = getMerged("separators");
  if (!separators.length)
    separators = [":", "-"];
  const resolved = {
    mergeSelectors: true,
    warn: true,
    sortLayers: (layers2) => layers2,
    ...config,
    blocklist: getMerged("blocklist"),
    presets: sortedPresets,
    envMode: config.envMode || "build",
    shortcutsLayer: config.shortcutsLayer || "shortcuts",
    layers,
    theme,
    rulesSize,
    rulesDynamic,
    rulesStaticMap,
    preprocess: getMerged("preprocess"),
    postprocess: getMerged("postprocess"),
    preflights: getMerged("preflights"),
    autocomplete,
    variants: getMerged("variants").map(normalizeVariant).sort((a, b) => (a.order || 0) - (b.order || 0)),
    shortcuts: resolveShortcuts(getMerged("shortcuts")).reverse(),
    extractors,
    safelist: getMerged("safelist"),
    separators,
    details: config.details ?? config.envMode === "dev"
  };
  for (const p of sources)
    p?.configResolved?.(resolved);
  return resolved;
};
var mergeThemes = function(themes) {
  return themes.map((theme) => theme ? clone(theme) : {}).reduce((a, b) => mergeDeep(a, b), {});
};
var mergeAutocompleteShorthands = function(shorthands) {
  return shorthands.reduce((a, b) => {
    const rs = {};
    for (const key in b) {
      const value = b[key];
      if (Array.isArray(value))
        rs[key] = `(${value.join("|")})`;
      else
        rs[key] = value;
    }
    return {
      ...a,
      ...rs
    };
  }, {});
};
var definePreset = function(preset) {
  return preset;
};
var createGenerator = function(config, defaults) {
  return new UnoGenerator(config, defaults);
};
var hasScopePlaceholder = function(css) {
  return regexScopePlaceholder.test(css);
};
var applyScope = function(css, scope) {
  if (hasScopePlaceholder(css))
    return css.replace(regexScopePlaceholder, scope ? ` ${scope} ` : " ");
  else
    return scope ? `${scope} ${css}` : css;
};
var toEscapedSelector = function(raw) {
  if (attributifyRe.test(raw))
    return raw.replace(attributifyRe, (_, n, s, i) => `[${e(n)}${s}"${e(i)}"]`);
  return `.${e(raw)}`;
};
var defaultVariantHandler = function(input, next) {
  return next(input);
};
var e = escapeSelector;
var attributifyRE = /^\[(.+?)~?="(.*)"\]$/;
var validateFilterRE = /[\w\u00A0-\uFFFF-_:%-?]/;
var CONTROL_SHORTCUT_NO_MERGE = "$$shortcut-no-merge";
var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => (key in obj) ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$2 = (obj, key, value) => {
  __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

class TwoKeyMap {
  constructor() {
    __publicField$2(this, "_map", new Map);
  }
  get(key1, key2) {
    const m2 = this._map.get(key1);
    if (m2)
      return m2.get(key2);
  }
  getFallback(key1, key2, fallback) {
    let m2 = this._map.get(key1);
    if (!m2) {
      m2 = new Map;
      this._map.set(key1, m2);
    }
    if (!m2.has(key2))
      m2.set(key2, fallback);
    return m2.get(key2);
  }
  set(key1, key2, value) {
    let m2 = this._map.get(key1);
    if (!m2) {
      m2 = new Map;
      this._map.set(key1, m2);
    }
    m2.set(key2, value);
    return this;
  }
  has(key1, key2) {
    return this._map.get(key1)?.has(key2);
  }
  delete(key1, key2) {
    return this._map.get(key1)?.delete(key2) || false;
  }
  deleteTop(key1) {
    return this._map.delete(key1);
  }
  map(fn) {
    return Array.from(this._map.entries()).flatMap(([k1, m2]) => Array.from(m2.entries()).map(([k2, v]) => {
      return fn(v, k1, k2);
    }));
  }
}

class BetterMap extends Map {
  getFallback(key, fallback) {
    const v = this.get(key);
    if (v === undefined) {
      this.set(key, fallback);
      return fallback;
    }
    return v;
  }
  map(mapFn) {
    const result = [];
    this.forEach((v, k) => {
      result.push(mapFn(v, k));
    });
    return result;
  }
  flatMap(mapFn) {
    const result = [];
    this.forEach((v, k) => {
      result.push(...mapFn(v, k));
    });
    return result;
  }
}
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => (key in obj) ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

class CountableSet extends Set {
  constructor(values) {
    super(values);
    __publicField$1(this, "_map");
    this._map ?? (this._map = new Map);
  }
  add(key) {
    this._map ?? (this._map = new Map);
    this._map.set(key, (this._map.get(key) ?? 0) + 1);
    return super.add(key);
  }
  delete(key) {
    this._map.delete(key);
    return super.delete(key);
  }
  clear() {
    this._map.clear();
    super.clear();
  }
  getCount(key) {
    return this._map.get(key) ?? 0;
  }
  setCount(key, count) {
    this._map.set(key, count);
    return super.add(key);
  }
}
var regexCache = {};
var warned = new Set;
var defaultSplitRE = /[\\:]?[\s'"`;{}]+/g;
var extractorSplit = {
  name: "@unocss/core/extractor-split",
  order: 0,
  extract({ code }) {
    return splitCode(code);
  }
};
var LAYER_DEFAULT = "default";
var LAYER_PREFLIGHTS = "preflights";
var LAYER_SHORTCUTS = "shortcuts";
var LAYER_IMPORTS = "imports";
var DEFAULT_LAYERS = {
  [LAYER_IMPORTS]: -200,
  [LAYER_PREFLIGHTS]: -100,
  [LAYER_SHORTCUTS]: -10,
  [LAYER_DEFAULT]: 0
};
var __RESOLVED = "_uno_resolved";
var version = "0.59.0";
var __defProp2 = Object.defineProperty;
var __defNormalProp = (obj, key, value) => (key in obj) ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

class UnoGenerator {
  constructor(userConfig = {}, defaults = {}) {
    this.userConfig = userConfig;
    this.defaults = defaults;
    __publicField(this, "version", version);
    __publicField(this, "_cache", new Map);
    __publicField(this, "config");
    __publicField(this, "blocked", new Set);
    __publicField(this, "parentOrders", new Map);
    __publicField(this, "events", createNanoEvents());
    this.config = resolveConfig(userConfig, defaults);
    this.events.emit("config", this.config);
  }
  setConfig(userConfig, defaults) {
    if (!userConfig)
      return;
    if (defaults)
      this.defaults = defaults;
    this.userConfig = userConfig;
    this.blocked.clear();
    this.parentOrders.clear();
    this._cache.clear();
    this.config = resolveConfig(userConfig, this.defaults);
    this.events.emit("config", this.config);
  }
  async applyExtractors(code, id, extracted = new Set) {
    const context = {
      original: code,
      code,
      id,
      extracted,
      envMode: this.config.envMode
    };
    for (const extractor of this.config.extractors) {
      const result = await extractor.extract?.(context);
      if (!result)
        continue;
      if (isCountableSet(result) && isCountableSet(extracted)) {
        for (const token of result)
          extracted.setCount(token, extracted.getCount(token) + result.getCount(token));
      } else {
        for (const token of result)
          extracted.add(token);
      }
    }
    return extracted;
  }
  makeContext(raw, applied) {
    const context = {
      rawSelector: raw,
      currentSelector: applied[1],
      theme: this.config.theme,
      generator: this,
      variantHandlers: applied[2],
      constructCSS: (...args) => this.constructCustomCSS(context, ...args),
      variantMatch: applied
    };
    return context;
  }
  async parseToken(raw, alias) {
    if (this.blocked.has(raw))
      return;
    const cacheKey = `${raw}${alias ? ` ${alias}` : ""}`;
    if (this._cache.has(cacheKey))
      return this._cache.get(cacheKey);
    let current = raw;
    for (const p of this.config.preprocess)
      current = p(raw);
    if (this.isBlocked(current)) {
      this.blocked.add(raw);
      this._cache.set(cacheKey, null);
      return;
    }
    const applied = await this.matchVariants(raw, current);
    if (!applied || this.isBlocked(applied[1])) {
      this.blocked.add(raw);
      this._cache.set(cacheKey, null);
      return;
    }
    const context = this.makeContext(raw, [alias || applied[0], applied[1], applied[2], applied[3]]);
    if (this.config.details)
      context.variants = [...applied[3]];
    const expanded = await this.expandShortcut(context.currentSelector, context);
    const utils = expanded ? await this.stringifyShortcuts(context.variantMatch, context, expanded[0], expanded[1]) : (await this.parseUtil(context.variantMatch, context))?.map((i) => this.stringifyUtil(i, context)).filter(notNull);
    if (utils?.length) {
      this._cache.set(cacheKey, utils);
      return utils;
    }
    this._cache.set(cacheKey, null);
  }
  async generate(input, options = {}) {
    const {
      id,
      scope,
      preflights = true,
      safelist = true,
      minify = false,
      extendedInfo = false
    } = options;
    const outputCssLayers = this.config.outputToCssLayers;
    const tokens = isString(input) ? await this.applyExtractors(input, id, extendedInfo ? new CountableSet : new Set) : Array.isArray(input) ? new Set(input) : input;
    if (safelist) {
      this.config.safelist.forEach((s) => {
        if (!tokens.has(s))
          tokens.add(s);
      });
    }
    const nl = minify ? "" : "\n";
    const layerSet = new Set([LAYER_DEFAULT]);
    const matched = extendedInfo ? new Map : new Set;
    const sheet = new Map;
    let preflightsMap = {};
    const tokenPromises = Array.from(tokens).map(async (raw) => {
      if (matched.has(raw))
        return;
      const payload = await this.parseToken(raw);
      if (payload == null)
        return;
      if (matched instanceof Map) {
        matched.set(raw, {
          data: payload,
          count: isCountableSet(tokens) ? tokens.getCount(raw) : -1
        });
      } else {
        matched.add(raw);
      }
      for (const item of payload) {
        const parent = item[3] || "";
        const layer = item[4]?.layer;
        if (!sheet.has(parent))
          sheet.set(parent, []);
        sheet.get(parent).push(item);
        if (layer)
          layerSet.add(layer);
      }
    });
    await Promise.all(tokenPromises);
    await (async () => {
      if (!preflights)
        return;
      const preflightContext = {
        generator: this,
        theme: this.config.theme
      };
      const preflightLayerSet = new Set([]);
      this.config.preflights.forEach(({ layer = LAYER_PREFLIGHTS }) => {
        layerSet.add(layer);
        preflightLayerSet.add(layer);
      });
      preflightsMap = Object.fromEntries(await Promise.all(Array.from(preflightLayerSet).map(async (layer) => {
        const preflights2 = await Promise.all(this.config.preflights.filter((i) => (i.layer || LAYER_PREFLIGHTS) === layer).map(async (i) => await i.getCSS(preflightContext)));
        const css = preflights2.filter(Boolean).join(nl);
        return [layer, css];
      })));
    })();
    const layers = this.config.sortLayers(Array.from(layerSet).sort((a, b) => (this.config.layers[a] ?? 0) - (this.config.layers[b] ?? 0) || a.localeCompare(b)));
    const layerCache = {};
    const getLayer = (layer = LAYER_DEFAULT) => {
      if (layerCache[layer])
        return layerCache[layer];
      let css = Array.from(sheet).sort((a, b) => (this.parentOrders.get(a[0]) ?? 0) - (this.parentOrders.get(b[0]) ?? 0) || a[0]?.localeCompare(b[0] || "") || 0).map(([parent, items]) => {
        const size = items.length;
        const sorted = items.filter((i) => (i[4]?.layer || LAYER_DEFAULT) === layer).sort((a, b) => {
          return a[0] - b[0] || (a[4]?.sort || 0) - (b[4]?.sort || 0) || a[5]?.currentSelector?.localeCompare(b[5]?.currentSelector ?? "") || a[1]?.localeCompare(b[1] || "") || a[2]?.localeCompare(b[2] || "") || 0;
        }).map(([, selector, body, , meta, , variantNoMerge]) => {
          const scopedSelector = selector ? applyScope(selector, scope) : selector;
          return [
            [[scopedSelector ?? "", meta?.sort ?? 0]],
            body,
            !!(variantNoMerge ?? meta?.noMerge)
          ];
        });
        if (!sorted.length)
          return;
        const rules = sorted.reverse().map(([selectorSortPair, body, noMerge], idx) => {
          if (!noMerge && this.config.mergeSelectors) {
            for (let i = idx + 1;i < size; i++) {
              const current = sorted[i];
              if (current && !current[2] && (selectorSortPair && current[0] || selectorSortPair == null && current[0] == null) && current[1] === body) {
                if (selectorSortPair && current[0])
                  current[0].push(...selectorSortPair);
                return null;
              }
            }
          }
          const selectors = selectorSortPair ? uniq(selectorSortPair.sort((a, b) => a[1] - b[1] || a[0]?.localeCompare(b[0] || "") || 0).map((pair) => pair[0]).filter(Boolean)) : [];
          return selectors.length ? `${selectors.join(`,${nl}`)}{${body}}` : body;
        }).filter(Boolean).reverse().join(nl);
        if (!parent)
          return rules;
        const parents = parent.split(" $$ ");
        return `${parents.join("{")}{${nl}${rules}${nl}${"}".repeat(parents.length)}`;
      }).filter(Boolean).join(nl);
      if (preflights) {
        css = [preflightsMap[layer], css].filter(Boolean).join(nl);
      }
      if (outputCssLayers && css) {
        let cssLayer = typeof outputCssLayers === "object" ? outputCssLayers.cssLayerName?.(layer) : undefined;
        if (cssLayer !== null) {
          if (!cssLayer)
            cssLayer = layer;
          css = `@layer ${cssLayer}{${nl}${css}${nl}}`;
        }
      }
      const layerMark = minify ? "" : `/* layer: ${layer} */${nl}`;
      return layerCache[layer] = css ? layerMark + css : "";
    };
    const getLayers = (includes = layers, excludes) => {
      return includes.filter((i) => !excludes?.includes(i)).map((i) => getLayer(i) || "").filter(Boolean).join(nl);
    };
    return {
      get css() {
        return getLayers();
      },
      layers,
      matched,
      getLayers,
      getLayer
    };
  }
  async matchVariants(raw, current) {
    const variants = new Set;
    const handlers = [];
    let processed = current || raw;
    let applied = true;
    const context = {
      rawSelector: raw,
      theme: this.config.theme,
      generator: this
    };
    while (applied) {
      applied = false;
      for (const v of this.config.variants) {
        if (!v.multiPass && variants.has(v))
          continue;
        let handler = await v.match(processed, context);
        if (!handler)
          continue;
        if (isString(handler)) {
          if (handler === processed)
            continue;
          handler = { matcher: handler };
        }
        processed = handler.matcher;
        handlers.unshift(handler);
        variants.add(v);
        applied = true;
        break;
      }
      if (!applied)
        break;
      if (handlers.length > 500)
        throw new Error(`Too many variants applied to "${raw}"`);
    }
    return [raw, processed, handlers, variants];
  }
  applyVariants(parsed, variantHandlers = parsed[4], raw = parsed[1]) {
    const handler = variantHandlers.slice().sort((a, b) => (a.order || 0) - (b.order || 0)).reduceRight((previous, v) => (input) => {
      const entries = v.body?.(input.entries) || input.entries;
      const parents = Array.isArray(v.parent) ? v.parent : [v.parent, undefined];
      return (v.handle ?? defaultVariantHandler)({
        ...input,
        entries,
        selector: v.selector?.(input.selector, entries) || input.selector,
        parent: parents[0] || input.parent,
        parentOrder: parents[1] || input.parentOrder,
        layer: v.layer || input.layer,
        sort: v.sort || input.sort
      }, previous);
    }, (input) => input);
    const variantContextResult = handler({
      prefix: "",
      selector: toEscapedSelector(raw),
      pseudo: "",
      entries: parsed[2]
    });
    const { parent, parentOrder } = variantContextResult;
    if (parent != null && parentOrder != null)
      this.parentOrders.set(parent, parentOrder);
    const obj = {
      selector: [
        variantContextResult.prefix,
        variantContextResult.selector,
        variantContextResult.pseudo
      ].join(""),
      entries: variantContextResult.entries,
      parent,
      layer: variantContextResult.layer,
      sort: variantContextResult.sort,
      noMerge: variantContextResult.noMerge
    };
    for (const p of this.config.postprocess)
      p(obj);
    return obj;
  }
  constructCustomCSS(context, body, overrideSelector) {
    const normalizedBody = normalizeCSSEntries(body);
    if (isString(normalizedBody))
      return normalizedBody;
    const { selector, entries, parent } = this.applyVariants([0, overrideSelector || context.rawSelector, normalizedBody, undefined, context.variantHandlers]);
    const cssBody = `${selector}{${entriesToCss(entries)}}`;
    if (parent)
      return `${parent}{${cssBody}}`;
    return cssBody;
  }
  async parseUtil(input, context, internal = false, shortcutPrefix) {
    const [raw, processed, variantHandlers] = isString(input) ? await this.matchVariants(input) : input;
    if (this.config.details)
      context.rules = context.rules ?? [];
    const staticMatch = this.config.rulesStaticMap[processed];
    if (staticMatch) {
      if (staticMatch[1] && (internal || !staticMatch[2]?.internal)) {
        if (this.config.details)
          context.rules.push(staticMatch[3]);
        const index = staticMatch[0];
        const entry = normalizeCSSEntries(staticMatch[1]);
        const meta = staticMatch[2];
        if (isString(entry))
          return [[index, entry, meta]];
        else
          return [[index, raw, entry, meta, variantHandlers]];
      }
    }
    context.variantHandlers = variantHandlers;
    const { rulesDynamic } = this.config;
    for (const [i, matcher, handler, meta] of rulesDynamic) {
      if (meta?.internal && !internal)
        continue;
      let unprefixed = processed;
      if (meta?.prefix) {
        const prefixes = toArray(meta.prefix);
        if (shortcutPrefix) {
          const shortcutPrefixes = toArray(shortcutPrefix);
          if (!prefixes.some((i2) => shortcutPrefixes.includes(i2)))
            continue;
        } else {
          const prefix = prefixes.find((i2) => processed.startsWith(i2));
          if (prefix == null)
            continue;
          unprefixed = processed.slice(prefix.length);
        }
      }
      const match = unprefixed.match(matcher);
      if (!match)
        continue;
      const result = await handler(match, context);
      if (!result)
        continue;
      if (this.config.details)
        context.rules.push([matcher, handler, meta]);
      const entries = normalizeCSSValues(result).filter((i2) => i2.length);
      if (entries.length) {
        return entries.map((e2) => {
          if (isString(e2))
            return [i, e2, meta];
          else
            return [i, raw, e2, meta, variantHandlers];
        });
      }
    }
  }
  stringifyUtil(parsed, context) {
    if (!parsed)
      return;
    if (isRawUtil(parsed))
      return [parsed[0], undefined, parsed[1], undefined, parsed[2], this.config.details ? context : undefined, undefined];
    const { selector, entries, parent, layer: variantLayer, sort: variantSort, noMerge } = this.applyVariants(parsed);
    const body = entriesToCss(entries);
    if (!body)
      return;
    const { layer: metaLayer, sort: metaSort, ...meta } = parsed[3] ?? {};
    const ruleMeta = {
      ...meta,
      layer: variantLayer ?? metaLayer,
      sort: variantSort ?? metaSort
    };
    return [parsed[0], selector, body, parent, ruleMeta, this.config.details ? context : undefined, noMerge];
  }
  async expandShortcut(input, context, depth = 5) {
    if (depth === 0)
      return;
    const recordShortcut = this.config.details ? (s) => {
      context.shortcuts = context.shortcuts ?? [];
      context.shortcuts.push(s);
    } : noop;
    let meta;
    let result;
    for (const s of this.config.shortcuts) {
      let unprefixed = input;
      if (s[2]?.prefix) {
        const prefixes = toArray(s[2].prefix);
        const prefix = prefixes.find((i) => input.startsWith(i));
        if (prefix == null)
          continue;
        unprefixed = input.slice(prefix.length);
      }
      if (isStaticShortcut(s)) {
        if (s[0] === unprefixed) {
          meta = meta || s[2];
          result = s[1];
          recordShortcut(s);
          break;
        }
      } else {
        const match = unprefixed.match(s[0]);
        if (match)
          result = s[1](match, context);
        if (result) {
          meta = meta || s[2];
          recordShortcut(s);
          break;
        }
      }
    }
    if (isString(result))
      result = expandVariantGroup(result.trim()).split(/\s+/g);
    if (!result) {
      const [raw, inputWithoutVariant] = isString(input) ? await this.matchVariants(input) : input;
      if (raw !== inputWithoutVariant) {
        const expanded = await this.expandShortcut(inputWithoutVariant, context, depth - 1);
        if (expanded)
          result = expanded[0].map((item) => isString(item) ? raw.replace(inputWithoutVariant, item) : item);
      }
    }
    if (!result)
      return;
    return [
      (await Promise.all(result.map(async (r) => (isString(r) ? (await this.expandShortcut(r, context, depth - 1))?.[0] : undefined) || [r]))).flat(1).filter(Boolean),
      meta
    ];
  }
  async stringifyShortcuts(parent, context, expanded, meta = { layer: this.config.shortcutsLayer }) {
    const layerMap = new BetterMap;
    const parsed = (await Promise.all(uniq(expanded).map(async (i) => {
      const result = isString(i) ? await this.parseUtil(i, context, true, meta.prefix) : [[Number.POSITIVE_INFINITY, "{inline}", normalizeCSSEntries(i), undefined, []]];
      if (!result && this.config.warn)
        warnOnce(`unmatched utility "${i}" in shortcut "${parent[1]}"`);
      return result || [];
    }))).flat(1).filter(Boolean).sort((a, b) => a[0] - b[0]);
    const [raw, , parentVariants] = parent;
    const rawStringifiedUtil = [];
    for (const item of parsed) {
      if (isRawUtil(item)) {
        rawStringifiedUtil.push([item[0], undefined, item[1], undefined, item[2], context, undefined]);
        continue;
      }
      const { selector, entries, parent: parent2, sort, noMerge, layer } = this.applyVariants(item, [...item[4], ...parentVariants], raw);
      const selectorMap = layerMap.getFallback(layer ?? meta.layer, new TwoKeyMap);
      const mapItem = selectorMap.getFallback(selector, parent2, [[], item[0]]);
      mapItem[0].push([entries, !!(noMerge ?? item[3]?.noMerge), sort ?? 0]);
    }
    return rawStringifiedUtil.concat(layerMap.flatMap((selectorMap, layer) => selectorMap.map(([e2, index], selector, joinedParents) => {
      const stringify = (flatten, noMerge, entrySortPair) => {
        const maxSort = Math.max(...entrySortPair.map((e3) => e3[1]));
        const entriesList = entrySortPair.map((e3) => e3[0]);
        return (flatten ? [entriesList.flat(1)] : entriesList).map((entries) => {
          const body = entriesToCss(entries);
          if (body)
            return [index, selector, body, joinedParents, { ...meta, noMerge, sort: maxSort, layer }, context, undefined];
          return;
        });
      };
      const merges = [
        [e2.filter(([, noMerge]) => noMerge).map(([entries, , sort]) => [entries, sort]), true],
        [e2.filter(([, noMerge]) => !noMerge).map(([entries, , sort]) => [entries, sort]), false]
      ];
      return merges.map(([e3, noMerge]) => [
        ...stringify(false, noMerge, e3.filter(([entries]) => entries.some((entry) => entry[0] === CONTROL_SHORTCUT_NO_MERGE))),
        ...stringify(true, noMerge, e3.filter(([entries]) => entries.every((entry) => entry[0] !== CONTROL_SHORTCUT_NO_MERGE)))
      ]);
    }).flat(2).filter(Boolean)));
  }
  isBlocked(raw) {
    return !raw || this.config.blocklist.some((e2) => typeof e2 === "function" ? e2(raw) : isString(e2) ? e2 === raw : e2.test(raw));
  }
}
var regexScopePlaceholder = /\s\$\$\s+/g;
var attributifyRe = /^\[(.+?)(~?=)"(.*)"\]$/;

// node_modules/@unocss/extractor-arbitrary-variants/dist/index.mjs
var removeSourceMap = function(code) {
  if (code.includes("sourceMappingURL="))
    return code.replace(sourceMapRE, "");
  return code;
};
var splitCodeWithArbitraryVariants = function(code) {
  const result = [];
  for (const match of code.matchAll(arbitraryPropertyRE)) {
    if (match.index !== 0 && !/^[\s'"`]/.test(code[match.index - 1] ?? ""))
      continue;
    result.push(match[0]);
  }
  for (const match of code.matchAll(quotedArbitraryValuesRE))
    result.push(match[0]);
  code.split(defaultSplitRE).forEach((match) => {
    if (isValidSelector(match) && !arbitraryPropertyCandidateRE.test(match))
      result.push(match);
  });
  return result;
};
var sourceMapRE = /\/\/#\s*sourceMappingURL=.*\n?/g;
var quotedArbitraryValuesRE = /(?:[\w&:[\]-]|\[\S{1,64}=\S{1,64}\]){1,64}\[\\?['"]?\S{1,64}?['"]\]\]?[\w:-]{0,64}/g;
var arbitraryPropertyRE = /\[(\\\W|[\w-]){1,64}:[^\s:]{0,64}?("\S{1,64}?"|'\S{1,64}?'|`\S{1,64}?`|[^\s:]{1,64}?)[^\s:]{0,64}?\)?\]/g;
var arbitraryPropertyCandidateRE = /^\[(\\\W|[\w-]){1,64}:['"]?\S{1,64}?['"]?\]$/;
var extractorArbitraryVariants = {
  name: "@unocss/extractor-arbitrary-variants",
  order: 0,
  extract({ code }) {
    return splitCodeWithArbitraryVariants(removeSourceMap(code));
  }
};

// node_modules/magic-string/dist/magic-string.es.mjs
var sourcemap_codec = __toESM(require_sourcemap_codec_umd(), 1);
var getBtoa = function() {
  if (typeof globalThis !== "undefined" && typeof globalThis.btoa === "function") {
    return (str) => globalThis.btoa(unescape(encodeURIComponent(str)));
  } else if (typeof Buffer === "function") {
    return (str) => Buffer.from(str, "utf-8").toString("base64");
  } else {
    return () => {
      throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.");
    };
  }
};
var guessIndent = function(code) {
  const lines = code.split("\n");
  const tabbed = lines.filter((line) => /^\t+/.test(line));
  const spaced = lines.filter((line) => /^ {2,}/.test(line));
  if (tabbed.length === 0 && spaced.length === 0) {
    return null;
  }
  if (tabbed.length >= spaced.length) {
    return "\t";
  }
  const min = spaced.reduce((previous, current) => {
    const numSpaces = /^ +/.exec(current)[0].length;
    return Math.min(numSpaces, previous);
  }, Infinity);
  return new Array(min + 1).join(" ");
};
var getRelativePath = function(from, to) {
  const fromParts = from.split(/[/\\]/);
  const toParts = to.split(/[/\\]/);
  fromParts.pop();
  while (fromParts[0] === toParts[0]) {
    fromParts.shift();
    toParts.shift();
  }
  if (fromParts.length) {
    let i = fromParts.length;
    while (i--)
      fromParts[i] = "..";
  }
  return fromParts.concat(toParts).join("/");
};
var isObject2 = function(thing) {
  return toString.call(thing) === "[object Object]";
};
var getLocator = function(source) {
  const originalLines = source.split("\n");
  const lineOffsets = [];
  for (let i = 0, pos = 0;i < originalLines.length; i++) {
    lineOffsets.push(pos);
    pos += originalLines[i].length + 1;
  }
  return function locate(index) {
    let i = 0;
    let j = lineOffsets.length;
    while (i < j) {
      const m = i + j >> 1;
      if (index < lineOffsets[m]) {
        j = m;
      } else {
        i = m + 1;
      }
    }
    const line = i - 1;
    const column = index - lineOffsets[line];
    return { line, column };
  };
};

class BitSet {
  constructor(arg) {
    this.bits = arg instanceof BitSet ? arg.bits.slice() : [];
  }
  add(n) {
    this.bits[n >> 5] |= 1 << (n & 31);
  }
  has(n) {
    return !!(this.bits[n >> 5] & 1 << (n & 31));
  }
}

class Chunk {
  constructor(start, end, content) {
    this.start = start;
    this.end = end;
    this.original = content;
    this.intro = "";
    this.outro = "";
    this.content = content;
    this.storeName = false;
    this.edited = false;
    {
      this.previous = null;
      this.next = null;
    }
  }
  appendLeft(content) {
    this.outro += content;
  }
  appendRight(content) {
    this.intro = this.intro + content;
  }
  clone() {
    const chunk = new Chunk(this.start, this.end, this.original);
    chunk.intro = this.intro;
    chunk.outro = this.outro;
    chunk.content = this.content;
    chunk.storeName = this.storeName;
    chunk.edited = this.edited;
    return chunk;
  }
  contains(index) {
    return this.start < index && index < this.end;
  }
  eachNext(fn) {
    let chunk = this;
    while (chunk) {
      fn(chunk);
      chunk = chunk.next;
    }
  }
  eachPrevious(fn) {
    let chunk = this;
    while (chunk) {
      fn(chunk);
      chunk = chunk.previous;
    }
  }
  edit(content, storeName, contentOnly) {
    this.content = content;
    if (!contentOnly) {
      this.intro = "";
      this.outro = "";
    }
    this.storeName = storeName;
    this.edited = true;
    return this;
  }
  prependLeft(content) {
    this.outro = content + this.outro;
  }
  prependRight(content) {
    this.intro = content + this.intro;
  }
  reset() {
    this.intro = "";
    this.outro = "";
    if (this.edited) {
      this.content = this.original;
      this.storeName = false;
      this.edited = false;
    }
  }
  split(index) {
    const sliceIndex = index - this.start;
    const originalBefore = this.original.slice(0, sliceIndex);
    const originalAfter = this.original.slice(sliceIndex);
    this.original = originalBefore;
    const newChunk = new Chunk(index, this.end, originalAfter);
    newChunk.outro = this.outro;
    this.outro = "";
    this.end = index;
    if (this.edited) {
      newChunk.edit("", false);
      this.content = "";
    } else {
      this.content = originalBefore;
    }
    newChunk.next = this.next;
    if (newChunk.next)
      newChunk.next.previous = newChunk;
    newChunk.previous = this;
    this.next = newChunk;
    return newChunk;
  }
  toString() {
    return this.intro + this.content + this.outro;
  }
  trimEnd(rx) {
    this.outro = this.outro.replace(rx, "");
    if (this.outro.length)
      return true;
    const trimmed = this.content.replace(rx, "");
    if (trimmed.length) {
      if (trimmed !== this.content) {
        this.split(this.start + trimmed.length).edit("", undefined, true);
        if (this.edited) {
          this.edit(trimmed, this.storeName, true);
        }
      }
      return true;
    } else {
      this.edit("", undefined, true);
      this.intro = this.intro.replace(rx, "");
      if (this.intro.length)
        return true;
    }
  }
  trimStart(rx) {
    this.intro = this.intro.replace(rx, "");
    if (this.intro.length)
      return true;
    const trimmed = this.content.replace(rx, "");
    if (trimmed.length) {
      if (trimmed !== this.content) {
        const newChunk = this.split(this.end - trimmed.length);
        if (this.edited) {
          newChunk.edit(trimmed, this.storeName, true);
        }
        this.edit("", undefined, true);
      }
      return true;
    } else {
      this.edit("", undefined, true);
      this.outro = this.outro.replace(rx, "");
      if (this.outro.length)
        return true;
    }
  }
}
var btoa = getBtoa();

class SourceMap {
  constructor(properties) {
    this.version = 3;
    this.file = properties.file;
    this.sources = properties.sources;
    this.sourcesContent = properties.sourcesContent;
    this.names = properties.names;
    this.mappings = sourcemap_codec.encode(properties.mappings);
    if (typeof properties.x_google_ignoreList !== "undefined") {
      this.x_google_ignoreList = properties.x_google_ignoreList;
    }
  }
  toString() {
    return JSON.stringify(this);
  }
  toUrl() {
    return "data:application/json;charset=utf-8;base64," + btoa(this.toString());
  }
}
var toString = Object.prototype.toString;
var wordRegex = /\w/;

class Mappings {
  constructor(hires) {
    this.hires = hires;
    this.generatedCodeLine = 0;
    this.generatedCodeColumn = 0;
    this.raw = [];
    this.rawSegments = this.raw[this.generatedCodeLine] = [];
    this.pending = null;
  }
  addEdit(sourceIndex, content, loc, nameIndex) {
    if (content.length) {
      const contentLengthMinusOne = content.length - 1;
      let contentLineEnd = content.indexOf("\n", 0);
      let previousContentLineEnd = -1;
      while (contentLineEnd >= 0 && contentLengthMinusOne > contentLineEnd) {
        const segment2 = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
        if (nameIndex >= 0) {
          segment2.push(nameIndex);
        }
        this.rawSegments.push(segment2);
        this.generatedCodeLine += 1;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
        this.generatedCodeColumn = 0;
        previousContentLineEnd = contentLineEnd;
        contentLineEnd = content.indexOf("\n", contentLineEnd + 1);
      }
      const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
      if (nameIndex >= 0) {
        segment.push(nameIndex);
      }
      this.rawSegments.push(segment);
      this.advance(content.slice(previousContentLineEnd + 1));
    } else if (this.pending) {
      this.rawSegments.push(this.pending);
      this.advance(content);
    }
    this.pending = null;
  }
  addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
    let originalCharIndex = chunk.start;
    let first = true;
    let charInHiresBoundary = false;
    while (originalCharIndex < chunk.end) {
      if (this.hires || first || sourcemapLocations.has(originalCharIndex)) {
        const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
        if (this.hires === "boundary") {
          if (wordRegex.test(original[originalCharIndex])) {
            if (!charInHiresBoundary) {
              this.rawSegments.push(segment);
              charInHiresBoundary = true;
            }
          } else {
            this.rawSegments.push(segment);
            charInHiresBoundary = false;
          }
        } else {
          this.rawSegments.push(segment);
        }
      }
      if (original[originalCharIndex] === "\n") {
        loc.line += 1;
        loc.column = 0;
        this.generatedCodeLine += 1;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
        this.generatedCodeColumn = 0;
        first = true;
      } else {
        loc.column += 1;
        this.generatedCodeColumn += 1;
        first = false;
      }
      originalCharIndex += 1;
    }
    this.pending = null;
  }
  advance(str) {
    if (!str)
      return;
    const lines = str.split("\n");
    if (lines.length > 1) {
      for (let i = 0;i < lines.length - 1; i++) {
        this.generatedCodeLine++;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
      }
      this.generatedCodeColumn = 0;
    }
    this.generatedCodeColumn += lines[lines.length - 1].length;
  }
}
var n = "\n";
var warned2 = {
  insertLeft: false,
  insertRight: false,
  storeName: false
};

class MagicString {
  constructor(string, options = {}) {
    const chunk = new Chunk(0, string.length, string);
    Object.defineProperties(this, {
      original: { writable: true, value: string },
      outro: { writable: true, value: "" },
      intro: { writable: true, value: "" },
      firstChunk: { writable: true, value: chunk },
      lastChunk: { writable: true, value: chunk },
      lastSearchedChunk: { writable: true, value: chunk },
      byStart: { writable: true, value: {} },
      byEnd: { writable: true, value: {} },
      filename: { writable: true, value: options.filename },
      indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
      sourcemapLocations: { writable: true, value: new BitSet },
      storedNames: { writable: true, value: {} },
      indentStr: { writable: true, value: undefined },
      ignoreList: { writable: true, value: options.ignoreList }
    });
    this.byStart[0] = chunk;
    this.byEnd[string.length] = chunk;
  }
  addSourcemapLocation(char) {
    this.sourcemapLocations.add(char);
  }
  append(content) {
    if (typeof content !== "string")
      throw new TypeError("outro content must be a string");
    this.outro += content;
    return this;
  }
  appendLeft(index, content) {
    if (typeof content !== "string")
      throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byEnd[index];
    if (chunk) {
      chunk.appendLeft(content);
    } else {
      this.intro += content;
    }
    return this;
  }
  appendRight(index, content) {
    if (typeof content !== "string")
      throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byStart[index];
    if (chunk) {
      chunk.appendRight(content);
    } else {
      this.outro += content;
    }
    return this;
  }
  clone() {
    const cloned = new MagicString(this.original, { filename: this.filename });
    let originalChunk = this.firstChunk;
    let clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
    while (originalChunk) {
      cloned.byStart[clonedChunk.start] = clonedChunk;
      cloned.byEnd[clonedChunk.end] = clonedChunk;
      const nextOriginalChunk = originalChunk.next;
      const nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
      if (nextClonedChunk) {
        clonedChunk.next = nextClonedChunk;
        nextClonedChunk.previous = clonedChunk;
        clonedChunk = nextClonedChunk;
      }
      originalChunk = nextOriginalChunk;
    }
    cloned.lastChunk = clonedChunk;
    if (this.indentExclusionRanges) {
      cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
    }
    cloned.sourcemapLocations = new BitSet(this.sourcemapLocations);
    cloned.intro = this.intro;
    cloned.outro = this.outro;
    return cloned;
  }
  generateDecodedMap(options) {
    options = options || {};
    const sourceIndex = 0;
    const names = Object.keys(this.storedNames);
    const mappings = new Mappings(options.hires);
    const locate = getLocator(this.original);
    if (this.intro) {
      mappings.advance(this.intro);
    }
    this.firstChunk.eachNext((chunk) => {
      const loc = locate(chunk.start);
      if (chunk.intro.length)
        mappings.advance(chunk.intro);
      if (chunk.edited) {
        mappings.addEdit(sourceIndex, chunk.content, loc, chunk.storeName ? names.indexOf(chunk.original) : -1);
      } else {
        mappings.addUneditedChunk(sourceIndex, chunk, this.original, loc, this.sourcemapLocations);
      }
      if (chunk.outro.length)
        mappings.advance(chunk.outro);
    });
    return {
      file: options.file ? options.file.split(/[/\\]/).pop() : undefined,
      sources: [
        options.source ? getRelativePath(options.file || "", options.source) : options.file || ""
      ],
      sourcesContent: options.includeContent ? [this.original] : undefined,
      names,
      mappings: mappings.raw,
      x_google_ignoreList: this.ignoreList ? [sourceIndex] : undefined
    };
  }
  generateMap(options) {
    return new SourceMap(this.generateDecodedMap(options));
  }
  _ensureindentStr() {
    if (this.indentStr === undefined) {
      this.indentStr = guessIndent(this.original);
    }
  }
  _getRawIndentString() {
    this._ensureindentStr();
    return this.indentStr;
  }
  getIndentString() {
    this._ensureindentStr();
    return this.indentStr === null ? "\t" : this.indentStr;
  }
  indent(indentStr, options) {
    const pattern = /^[^\r\n]/gm;
    if (isObject2(indentStr)) {
      options = indentStr;
      indentStr = undefined;
    }
    if (indentStr === undefined) {
      this._ensureindentStr();
      indentStr = this.indentStr || "\t";
    }
    if (indentStr === "")
      return this;
    options = options || {};
    const isExcluded = {};
    if (options.exclude) {
      const exclusions = typeof options.exclude[0] === "number" ? [options.exclude] : options.exclude;
      exclusions.forEach((exclusion) => {
        for (let i = exclusion[0];i < exclusion[1]; i += 1) {
          isExcluded[i] = true;
        }
      });
    }
    let shouldIndentNextCharacter = options.indentStart !== false;
    const replacer = (match) => {
      if (shouldIndentNextCharacter)
        return `${indentStr}${match}`;
      shouldIndentNextCharacter = true;
      return match;
    };
    this.intro = this.intro.replace(pattern, replacer);
    let charIndex = 0;
    let chunk = this.firstChunk;
    while (chunk) {
      const end = chunk.end;
      if (chunk.edited) {
        if (!isExcluded[charIndex]) {
          chunk.content = chunk.content.replace(pattern, replacer);
          if (chunk.content.length) {
            shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === "\n";
          }
        }
      } else {
        charIndex = chunk.start;
        while (charIndex < end) {
          if (!isExcluded[charIndex]) {
            const char = this.original[charIndex];
            if (char === "\n") {
              shouldIndentNextCharacter = true;
            } else if (char !== "\r" && shouldIndentNextCharacter) {
              shouldIndentNextCharacter = false;
              if (charIndex === chunk.start) {
                chunk.prependRight(indentStr);
              } else {
                this._splitChunk(chunk, charIndex);
                chunk = chunk.next;
                chunk.prependRight(indentStr);
              }
            }
          }
          charIndex += 1;
        }
      }
      charIndex = chunk.end;
      chunk = chunk.next;
    }
    this.outro = this.outro.replace(pattern, replacer);
    return this;
  }
  insert() {
    throw new Error("magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)");
  }
  insertLeft(index, content) {
    if (!warned2.insertLeft) {
      console.warn("magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead");
      warned2.insertLeft = true;
    }
    return this.appendLeft(index, content);
  }
  insertRight(index, content) {
    if (!warned2.insertRight) {
      console.warn("magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead");
      warned2.insertRight = true;
    }
    return this.prependRight(index, content);
  }
  move(start, end, index) {
    if (index >= start && index <= end)
      throw new Error("Cannot move a selection inside itself");
    this._split(start);
    this._split(end);
    this._split(index);
    const first = this.byStart[start];
    const last = this.byEnd[end];
    const oldLeft = first.previous;
    const oldRight = last.next;
    const newRight = this.byStart[index];
    if (!newRight && last === this.lastChunk)
      return this;
    const newLeft = newRight ? newRight.previous : this.lastChunk;
    if (oldLeft)
      oldLeft.next = oldRight;
    if (oldRight)
      oldRight.previous = oldLeft;
    if (newLeft)
      newLeft.next = first;
    if (newRight)
      newRight.previous = last;
    if (!first.previous)
      this.firstChunk = last.next;
    if (!last.next) {
      this.lastChunk = first.previous;
      this.lastChunk.next = null;
    }
    first.previous = newLeft;
    last.next = newRight || null;
    if (!newLeft)
      this.firstChunk = first;
    if (!newRight)
      this.lastChunk = last;
    return this;
  }
  overwrite(start, end, content, options) {
    options = options || {};
    return this.update(start, end, content, { ...options, overwrite: !options.contentOnly });
  }
  update(start, end, content, options) {
    if (typeof content !== "string")
      throw new TypeError("replacement content must be a string");
    while (start < 0)
      start += this.original.length;
    while (end < 0)
      end += this.original.length;
    if (end > this.original.length)
      throw new Error("end is out of bounds");
    if (start === end)
      throw new Error("Cannot overwrite a zero-length range \u2013 use appendLeft or prependRight instead");
    this._split(start);
    this._split(end);
    if (options === true) {
      if (!warned2.storeName) {
        console.warn("The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string");
        warned2.storeName = true;
      }
      options = { storeName: true };
    }
    const storeName = options !== undefined ? options.storeName : false;
    const overwrite = options !== undefined ? options.overwrite : false;
    if (storeName) {
      const original = this.original.slice(start, end);
      Object.defineProperty(this.storedNames, original, {
        writable: true,
        value: true,
        enumerable: true
      });
    }
    const first = this.byStart[start];
    const last = this.byEnd[end];
    if (first) {
      let chunk = first;
      while (chunk !== last) {
        if (chunk.next !== this.byStart[chunk.end]) {
          throw new Error("Cannot overwrite across a split point");
        }
        chunk = chunk.next;
        chunk.edit("", false);
      }
      first.edit(content, storeName, !overwrite);
    } else {
      const newChunk = new Chunk(start, end, "").edit(content, storeName);
      last.next = newChunk;
      newChunk.previous = last;
    }
    return this;
  }
  prepend(content) {
    if (typeof content !== "string")
      throw new TypeError("outro content must be a string");
    this.intro = content + this.intro;
    return this;
  }
  prependLeft(index, content) {
    if (typeof content !== "string")
      throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byEnd[index];
    if (chunk) {
      chunk.prependLeft(content);
    } else {
      this.intro = content + this.intro;
    }
    return this;
  }
  prependRight(index, content) {
    if (typeof content !== "string")
      throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byStart[index];
    if (chunk) {
      chunk.prependRight(content);
    } else {
      this.outro = content + this.outro;
    }
    return this;
  }
  remove(start, end) {
    while (start < 0)
      start += this.original.length;
    while (end < 0)
      end += this.original.length;
    if (start === end)
      return this;
    if (start < 0 || end > this.original.length)
      throw new Error("Character is out of bounds");
    if (start > end)
      throw new Error("end must be greater than start");
    this._split(start);
    this._split(end);
    let chunk = this.byStart[start];
    while (chunk) {
      chunk.intro = "";
      chunk.outro = "";
      chunk.edit("");
      chunk = end > chunk.end ? this.byStart[chunk.end] : null;
    }
    return this;
  }
  reset(start, end) {
    while (start < 0)
      start += this.original.length;
    while (end < 0)
      end += this.original.length;
    if (start === end)
      return this;
    if (start < 0 || end > this.original.length)
      throw new Error("Character is out of bounds");
    if (start > end)
      throw new Error("end must be greater than start");
    this._split(start);
    this._split(end);
    let chunk = this.byStart[start];
    while (chunk) {
      chunk.reset();
      chunk = end > chunk.end ? this.byStart[chunk.end] : null;
    }
    return this;
  }
  lastChar() {
    if (this.outro.length)
      return this.outro[this.outro.length - 1];
    let chunk = this.lastChunk;
    do {
      if (chunk.outro.length)
        return chunk.outro[chunk.outro.length - 1];
      if (chunk.content.length)
        return chunk.content[chunk.content.length - 1];
      if (chunk.intro.length)
        return chunk.intro[chunk.intro.length - 1];
    } while (chunk = chunk.previous);
    if (this.intro.length)
      return this.intro[this.intro.length - 1];
    return "";
  }
  lastLine() {
    let lineIndex = this.outro.lastIndexOf(n);
    if (lineIndex !== -1)
      return this.outro.substr(lineIndex + 1);
    let lineStr = this.outro;
    let chunk = this.lastChunk;
    do {
      if (chunk.outro.length > 0) {
        lineIndex = chunk.outro.lastIndexOf(n);
        if (lineIndex !== -1)
          return chunk.outro.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.outro + lineStr;
      }
      if (chunk.content.length > 0) {
        lineIndex = chunk.content.lastIndexOf(n);
        if (lineIndex !== -1)
          return chunk.content.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.content + lineStr;
      }
      if (chunk.intro.length > 0) {
        lineIndex = chunk.intro.lastIndexOf(n);
        if (lineIndex !== -1)
          return chunk.intro.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.intro + lineStr;
      }
    } while (chunk = chunk.previous);
    lineIndex = this.intro.lastIndexOf(n);
    if (lineIndex !== -1)
      return this.intro.substr(lineIndex + 1) + lineStr;
    return this.intro + lineStr;
  }
  slice(start = 0, end = this.original.length) {
    while (start < 0)
      start += this.original.length;
    while (end < 0)
      end += this.original.length;
    let result = "";
    let chunk = this.firstChunk;
    while (chunk && (chunk.start > start || chunk.end <= start)) {
      if (chunk.start < end && chunk.end >= end) {
        return result;
      }
      chunk = chunk.next;
    }
    if (chunk && chunk.edited && chunk.start !== start)
      throw new Error(`Cannot use replaced character ${start} as slice start anchor.`);
    const startChunk = chunk;
    while (chunk) {
      if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
        result += chunk.intro;
      }
      const containsEnd = chunk.start < end && chunk.end >= end;
      if (containsEnd && chunk.edited && chunk.end !== end)
        throw new Error(`Cannot use replaced character ${end} as slice end anchor.`);
      const sliceStart = startChunk === chunk ? start - chunk.start : 0;
      const sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
      result += chunk.content.slice(sliceStart, sliceEnd);
      if (chunk.outro && (!containsEnd || chunk.end === end)) {
        result += chunk.outro;
      }
      if (containsEnd) {
        break;
      }
      chunk = chunk.next;
    }
    return result;
  }
  snip(start, end) {
    const clone2 = this.clone();
    clone2.remove(0, start);
    clone2.remove(end, clone2.original.length);
    return clone2;
  }
  _split(index) {
    if (this.byStart[index] || this.byEnd[index])
      return;
    let chunk = this.lastSearchedChunk;
    const searchForward = index > chunk.end;
    while (chunk) {
      if (chunk.contains(index))
        return this._splitChunk(chunk, index);
      chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
    }
  }
  _splitChunk(chunk, index) {
    if (chunk.edited && chunk.content.length) {
      const loc = getLocator(this.original)(index);
      throw new Error(`Cannot split a chunk that has already been edited (${loc.line}:${loc.column} \u2013 "${chunk.original}")`);
    }
    const newChunk = chunk.split(index);
    this.byEnd[index] = chunk;
    this.byStart[index] = newChunk;
    this.byEnd[newChunk.end] = newChunk;
    if (chunk === this.lastChunk)
      this.lastChunk = newChunk;
    this.lastSearchedChunk = chunk;
    return true;
  }
  toString() {
    let str = this.intro;
    let chunk = this.firstChunk;
    while (chunk) {
      str += chunk.toString();
      chunk = chunk.next;
    }
    return str + this.outro;
  }
  isEmpty() {
    let chunk = this.firstChunk;
    do {
      if (chunk.intro.length && chunk.intro.trim() || chunk.content.length && chunk.content.trim() || chunk.outro.length && chunk.outro.trim())
        return false;
    } while (chunk = chunk.next);
    return true;
  }
  length() {
    let chunk = this.firstChunk;
    let length = 0;
    do {
      length += chunk.intro.length + chunk.content.length + chunk.outro.length;
    } while (chunk = chunk.next);
    return length;
  }
  trimLines() {
    return this.trim("[\\r\\n]");
  }
  trim(charType) {
    return this.trimStart(charType).trimEnd(charType);
  }
  trimEndAborted(charType) {
    const rx = new RegExp((charType || "\\s") + "+$");
    this.outro = this.outro.replace(rx, "");
    if (this.outro.length)
      return true;
    let chunk = this.lastChunk;
    do {
      const end = chunk.end;
      const aborted = chunk.trimEnd(rx);
      if (chunk.end !== end) {
        if (this.lastChunk === chunk) {
          this.lastChunk = chunk.next;
        }
        this.byEnd[chunk.end] = chunk;
        this.byStart[chunk.next.start] = chunk.next;
        this.byEnd[chunk.next.end] = chunk.next;
      }
      if (aborted)
        return true;
      chunk = chunk.previous;
    } while (chunk);
    return false;
  }
  trimEnd(charType) {
    this.trimEndAborted(charType);
    return this;
  }
  trimStartAborted(charType) {
    const rx = new RegExp("^" + (charType || "\\s") + "+");
    this.intro = this.intro.replace(rx, "");
    if (this.intro.length)
      return true;
    let chunk = this.firstChunk;
    do {
      const end = chunk.end;
      const aborted = chunk.trimStart(rx);
      if (chunk.end !== end) {
        if (chunk === this.lastChunk)
          this.lastChunk = chunk.next;
        this.byEnd[chunk.end] = chunk;
        this.byStart[chunk.next.start] = chunk.next;
        this.byEnd[chunk.next.end] = chunk.next;
      }
      if (aborted)
        return true;
      chunk = chunk.next;
    } while (chunk);
    return false;
  }
  trimStart(charType) {
    this.trimStartAborted(charType);
    return this;
  }
  hasChanged() {
    return this.original !== this.toString();
  }
  _replaceRegexp(searchValue, replacement) {
    function getReplacement(match, str) {
      if (typeof replacement === "string") {
        return replacement.replace(/\$(\$|&|\d+)/g, (_, i) => {
          if (i === "$")
            return "$";
          if (i === "&")
            return match[0];
          const num = +i;
          if (num < match.length)
            return match[+i];
          return `\$${i}`;
        });
      } else {
        return replacement(...match, match.index, str, match.groups);
      }
    }
    function matchAll(re, str) {
      let match;
      const matches = [];
      while (match = re.exec(str)) {
        matches.push(match);
      }
      return matches;
    }
    if (searchValue.global) {
      const matches = matchAll(searchValue, this.original);
      matches.forEach((match) => {
        if (match.index != null) {
          const replacement2 = getReplacement(match, this.original);
          if (replacement2 !== match[0]) {
            this.overwrite(match.index, match.index + match[0].length, replacement2);
          }
        }
      });
    } else {
      const match = this.original.match(searchValue);
      if (match && match.index != null) {
        const replacement2 = getReplacement(match, this.original);
        if (replacement2 !== match[0]) {
          this.overwrite(match.index, match.index + match[0].length, replacement2);
        }
      }
    }
    return this;
  }
  _replaceString(string, replacement) {
    const { original } = this;
    const index = original.indexOf(string);
    if (index !== -1) {
      this.overwrite(index, index + string.length, replacement);
    }
    return this;
  }
  replace(searchValue, replacement) {
    if (typeof searchValue === "string") {
      return this._replaceString(searchValue, replacement);
    }
    return this._replaceRegexp(searchValue, replacement);
  }
  _replaceAllString(string, replacement) {
    const { original } = this;
    const stringLength = string.length;
    for (let index = original.indexOf(string);index !== -1; index = original.indexOf(string, index + stringLength)) {
      const previous = original.slice(index, index + stringLength);
      if (previous !== replacement)
        this.overwrite(index, index + stringLength, replacement);
    }
    return this;
  }
  replaceAll(searchValue, replacement) {
    if (typeof searchValue === "string") {
      return this._replaceAllString(searchValue, replacement);
    }
    if (!searchValue.global) {
      throw new TypeError("MagicString.prototype.replaceAll called with a non-global RegExp argument");
    }
    return this._replaceRegexp(searchValue, replacement);
  }
}

// node_modules/@unocss/rule-utils/dist/index.mjs
var getBracket = function(str, open, close) {
  if (str === "")
    return;
  const l = str.length;
  let parenthesis = 0;
  let opened = false;
  let openAt = 0;
  for (let i = 0;i < l; i++) {
    switch (str[i]) {
      case open:
        if (!opened) {
          opened = true;
          openAt = i;
        }
        parenthesis++;
        break;
      case close:
        --parenthesis;
        if (parenthesis < 0)
          return;
        if (parenthesis === 0) {
          return [
            str.slice(openAt, i + 1),
            str.slice(i + 1),
            str.slice(0, openAt)
          ];
        }
        break;
    }
  }
};
var getStringComponent = function(str, open, close, separators) {
  if (str === "")
    return;
  if (isString(separators))
    separators = [separators];
  if (separators.length === 0)
    return;
  const l = str.length;
  let parenthesis = 0;
  for (let i = 0;i < l; i++) {
    switch (str[i]) {
      case open:
        parenthesis++;
        break;
      case close:
        if (--parenthesis < 0)
          return;
        break;
      default:
        for (const separator of separators) {
          const separatorLength = separator.length;
          if (separatorLength && separator === str.slice(i, i + separatorLength) && parenthesis === 0) {
            if (i === 0 || i === l - separatorLength)
              return;
            return [
              str.slice(0, i),
              str.slice(i + separatorLength)
            ];
          }
        }
    }
  }
  return [
    str,
    ""
  ];
};
var getStringComponents = function(str, separators, limit) {
  limit = limit ?? 10;
  const components = [];
  let i = 0;
  while (str !== "") {
    if (++i > limit)
      return;
    const componentPair = getStringComponent(str, "(", ")", separators);
    if (!componentPair)
      return;
    const [component, rest] = componentPair;
    components.push(component);
    str = rest;
  }
  if (components.length > 0)
    return components;
};
var parseCssColor = function(str = "") {
  const color = parseColor(str);
  if (color == null || color === false)
    return;
  const { type: casedType, components, alpha } = color;
  const type = casedType.toLowerCase();
  if (components.length === 0)
    return;
  if (cssColorFunctions.includes(type) && ![1, 3].includes(components.length))
    return;
  return {
    type,
    components: components.map((c) => typeof c === "string" ? c.trim() : c),
    alpha: typeof alpha === "string" ? alpha.trim() : alpha
  };
};
var colorOpacityToString = function(color) {
  const alpha = color.alpha ?? 1;
  return typeof alpha === "string" && alphaPlaceholders.includes(alpha) ? 1 : alpha;
};
var colorToString = function(color, alphaOverride) {
  if (typeof color === "string")
    return color.replace(alphaPlaceholdersRE, `${alphaOverride ?? 1}`);
  const { components } = color;
  let { alpha, type } = color;
  alpha = alphaOverride ?? alpha;
  type = type.toLowerCase();
  if (["hsla", "rgba"].includes(type))
    return `${type}(${components.join(", ")}${alpha == null ? "" : `, ${alpha}`})`;
  alpha = alpha == null ? "" : ` / ${alpha}`;
  if (cssColorFunctions.includes(type))
    return `${type}(${components.join(" ")}${alpha})`;
  return `color(${type} ${components.join(" ")}${alpha})`;
};
var parseColor = function(str) {
  if (!str)
    return;
  let color = parseHexColor(str);
  if (color != null)
    return color;
  color = cssColorKeyword(str);
  if (color != null)
    return color;
  color = parseCssCommaColorFunction(str);
  if (color != null)
    return color;
  color = parseCssSpaceColorFunction(str);
  if (color != null)
    return color;
  color = parseCssColorFunction(str);
  if (color != null)
    return color;
};
var parseHexColor = function(str) {
  const [, body] = str.match(/^#([\da-f]+)$/i) || [];
  if (!body)
    return;
  switch (body.length) {
    case 3:
    case 4:
      const digits = Array.from(body, (s) => Number.parseInt(s, 16)).map((n2) => n2 << 4 | n2);
      return {
        type: "rgb",
        components: digits.slice(0, 3),
        alpha: body.length === 3 ? undefined : Math.round(digits[3] / 255 * 100) / 100
      };
    case 6:
    case 8:
      const value = Number.parseInt(body, 16);
      return {
        type: "rgb",
        components: body.length === 6 ? [value >> 16 & 255, value >> 8 & 255, value & 255] : [value >> 24 & 255, value >> 16 & 255, value >> 8 & 255],
        alpha: body.length === 6 ? undefined : Math.round((value & 255) / 255 * 100) / 100
      };
  }
};
var cssColorKeyword = function(str) {
  const color = {
    rebeccapurple: [102, 51, 153, 1]
  }[str];
  if (color != null) {
    return {
      type: "rgb",
      components: color.slice(0, 3),
      alpha: color[3]
    };
  }
};
var parseCssCommaColorFunction = function(color) {
  const match = color.match(/^(rgb|rgba|hsl|hsla)\((.+)\)$/i);
  if (!match)
    return;
  const [, type, componentString] = match;
  const components = getStringComponents(componentString, ",", 5);
  if (components) {
    if ([3, 4].includes(components.length)) {
      return {
        type,
        components: components.slice(0, 3),
        alpha: components[3]
      };
    } else if (components.length !== 1) {
      return false;
    }
  }
};
var parseCssSpaceColorFunction = function(color) {
  const match = color.match(cssColorFunctionsRe);
  if (!match)
    return;
  const [, fn, componentString] = match;
  const parsed = parseCssSpaceColorValues(`${fn} ${componentString}`);
  if (parsed) {
    const { alpha, components: [type, ...components] } = parsed;
    return {
      type,
      components,
      alpha
    };
  }
};
var parseCssColorFunction = function(color) {
  const match = color.match(/^color\((.+)\)$/);
  if (!match)
    return;
  const parsed = parseCssSpaceColorValues(match[1]);
  if (parsed) {
    const { alpha, components: [type, ...components] } = parsed;
    return {
      type,
      components,
      alpha
    };
  }
};
var parseCssSpaceColorValues = function(componentString) {
  const components = getStringComponents(componentString, " ");
  if (!components)
    return;
  let totalComponents = components.length;
  if (components[totalComponents - 2] === "/") {
    return {
      components: components.slice(0, totalComponents - 2),
      alpha: components[totalComponents - 1]
    };
  }
  if (components[totalComponents - 2] != null && (components[totalComponents - 2].endsWith("/") || components[totalComponents - 1].startsWith("/"))) {
    const removed = components.splice(totalComponents - 2);
    components.push(removed.join(" "));
    --totalComponents;
  }
  const withAlpha = getStringComponents(components[totalComponents - 1], "/", 2);
  if (!withAlpha)
    return;
  if (withAlpha.length === 1 || withAlpha[withAlpha.length - 1] === "")
    return { components };
  const alpha = withAlpha.pop();
  components[totalComponents - 1] = withAlpha.join("/");
  return {
    components,
    alpha
  };
};
var createValueHandler = function(handlers) {
  const handler = function(str) {
    const s = this.__options?.sequence || [];
    this.__options.sequence = [];
    for (const n2 of s) {
      const res = handlers[n2](str);
      if (res != null)
        return res;
    }
  };
  function addProcessor(that, name) {
    if (!that.__options) {
      that.__options = {
        sequence: []
      };
    }
    that.__options.sequence.push(name);
    return that;
  }
  for (const name of Object.keys(handlers)) {
    Object.defineProperty(handler, name, {
      enumerable: true,
      get() {
        return addProcessor(this, name);
      }
    });
  }
  return handler;
};
var variantMatcher = function(name, handler) {
  let re;
  return {
    name,
    match(input, ctx) {
      if (!re)
        re = new RegExp(`^${escapeRegExp(name)}(?:${ctx.generator.config.separators.join("|")})`);
      const match = input.match(re);
      if (match) {
        return {
          matcher: input.slice(match[0].length),
          handle: (input2, next) => next({
            ...input2,
            ...handler(input2)
          })
        };
      }
    },
    autocomplete: `${name}:`
  };
};
var variantParentMatcher = function(name, parent) {
  let re;
  return {
    name,
    match(input, ctx) {
      if (!re)
        re = new RegExp(`^${escapeRegExp(name)}(?:${ctx.generator.config.separators.join("|")})`);
      const match = input.match(re);
      if (match) {
        return {
          matcher: input.slice(match[0].length),
          handle: (input2, next) => next({
            ...input2,
            parent: `${input2.parent ? `${input2.parent} \$\$ ` : ""}${parent}`
          })
        };
      }
    },
    autocomplete: `${name}:`
  };
};
var variantGetBracket = function(prefix, matcher, separators) {
  if (matcher.startsWith(`${prefix}[`)) {
    const [match, rest] = getBracket(matcher.slice(prefix.length), "[", "]") ?? [];
    if (match && rest) {
      for (const separator of separators) {
        if (rest.startsWith(separator))
          return [match, rest.slice(separator.length), separator];
      }
      return [match, rest, ""];
    }
  }
};
var variantGetParameter = function(prefix, matcher, separators) {
  if (matcher.startsWith(prefix)) {
    const body = variantGetBracket(prefix, matcher, separators);
    if (body) {
      const [label = "", rest = body[1]] = variantGetParameter("/", body[1], separators) ?? [];
      return [body[0], rest, label];
    }
    for (const separator of separators.filter((x) => x !== "/")) {
      const pos = matcher.indexOf(separator, prefix.length);
      if (pos !== -1) {
        const labelPos = matcher.indexOf("/", prefix.length);
        const unlabelled = labelPos === -1 || pos <= labelPos;
        return [
          matcher.slice(prefix.length, unlabelled ? pos : labelPos),
          matcher.slice(pos + separator.length),
          unlabelled ? "" : matcher.slice(labelPos + 1, pos)
        ];
      }
    }
  }
};
var hasThemeFn = function(str) {
  return str.includes("theme(") && str.includes(")");
};
var transformThemeFn = function(code, theme, throwOnMissing = true) {
  const matches = Array.from(code.toString().matchAll(themeFnRE));
  if (!matches.length)
    return code;
  const s = new MagicString(code);
  for (const match of matches) {
    const rawArg = match[1];
    if (!rawArg)
      throw new Error("theme() expect exact one argument, but got 0");
    const [rawKey, alpha] = rawArg.split("/");
    const keys = rawKey.trim().split(".");
    let value = keys.reduce((t, k) => t?.[k], theme);
    if (typeof value === "string") {
      if (alpha) {
        const color = parseCssColor(value);
        if (color)
          value = colorToString(color, alpha);
      }
      s.overwrite(match.index, match.index + match[0].length, value);
    } else if (throwOnMissing) {
      throw new Error(`theme of "${rawArg}" did not found`);
    }
  }
  return s.toString();
};
var cssColorFunctions = ["hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch", "rgb", "rgba"];
var alphaPlaceholders = ["%alpha", "<alpha-value>"];
var alphaPlaceholdersRE = new RegExp(alphaPlaceholders.map((v) => escapeRegExp(v)).join("|"));
var cssColorFunctionsRe = new RegExp(`^(${cssColorFunctions.join("|")})\\((.+)\\)\$`, "i");
var themeFnRE = /theme\(\s*['"]?(.*?)['"]?\s*\)/g;

// node_modules/@unocss/preset-mini/dist/shared/preset-mini.CWuOZAHF.mjs
var round = function(n2) {
  return n2.toFixed(10).replace(/\.0+$/, "").replace(/(\.\d+?)0+$/, "$1");
};
var numberWithUnit = function(str) {
  const match = str.match(numberWithUnitRE);
  if (!match)
    return;
  const [, n2, unit] = match;
  const num = Number.parseFloat(n2);
  if (unit && !Number.isNaN(num))
    return `${round(num)}${unit}`;
};
var auto = function(str) {
  if (str === "auto" || str === "a")
    return "auto";
};
var rem = function(str) {
  if (!str)
    return;
  if (unitOnlyRE.test(str))
    return `${unitOnlyMap[str]}${str}`;
  const match = str.match(numberWithUnitRE);
  if (!match)
    return;
  const [, n2, unit] = match;
  const num = Number.parseFloat(n2);
  if (!Number.isNaN(num)) {
    if (num === 0)
      return "0";
    return unit ? `${round(num)}${unit}` : `${round(num / 4)}rem`;
  }
};
var px = function(str) {
  if (unitOnlyRE.test(str))
    return `${unitOnlyMap[str]}${str}`;
  const match = str.match(numberWithUnitRE);
  if (!match)
    return;
  const [, n2, unit] = match;
  const num = Number.parseFloat(n2);
  if (!Number.isNaN(num))
    return unit ? `${round(num)}${unit}` : `${round(num)}px`;
};
var number = function(str) {
  if (!numberRE.test(str))
    return;
  const num = Number.parseFloat(str);
  if (!Number.isNaN(num))
    return round(num);
};
var percent = function(str) {
  if (str.endsWith("%"))
    str = str.slice(0, -1);
  if (!numberRE.test(str))
    return;
  const num = Number.parseFloat(str);
  if (!Number.isNaN(num))
    return `${round(num / 100)}`;
};
var fraction = function(str) {
  if (!str)
    return;
  if (str === "full")
    return "100%";
  const [left, right] = str.split("/");
  const num = Number.parseFloat(left) / Number.parseFloat(right);
  if (!Number.isNaN(num)) {
    if (num === 0)
      return "0";
    return `${round(num * 100)}%`;
  }
};
var bracketWithType = function(str, requiredType) {
  if (str && str.startsWith("[") && str.endsWith("]")) {
    let base;
    let hintedType;
    const match = str.match(bracketTypeRe);
    if (!match) {
      base = str.slice(1, -1);
    } else {
      if (!requiredType)
        hintedType = match[1];
      base = str.slice(match[0].length, -1);
    }
    if (!base)
      return;
    if (base === '=""')
      return;
    if (base.startsWith("--"))
      base = `var(${base})`;
    let curly = 0;
    for (const i of base) {
      if (i === "[") {
        curly += 1;
      } else if (i === "]") {
        curly -= 1;
        if (curly < 0)
          return;
      }
    }
    if (curly)
      return;
    switch (hintedType) {
      case "string":
        return base.replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_");
      case "quoted":
        return base.replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_").replace(/(["\\])/g, "\\$1").replace(/^(.+)$/, '"$1"');
    }
    return base.replace(/(url\(.*?\))/g, (v) => v.replace(/_/g, "\\_")).replace(/(^|[^\\])_/g, "$1 ").replace(/\\_/g, "_").replace(/(?:calc|clamp|max|min)\((.*)/g, (match2) => {
      const vars = [];
      return match2.replace(/var\((--.+?)[,)]/g, (match3, g1) => {
        vars.push(g1);
        return match3.replace(g1, "--un-calc");
      }).replace(/(-?\d*\.?\d(?!\b-\d.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, "$1 $2 ").replace(/--un-calc/g, () => vars.shift());
    });
  }
};
var bracket = function(str) {
  return bracketWithType(str);
};
var bracketOfColor = function(str) {
  return bracketWithType(str, "color");
};
var bracketOfLength = function(str) {
  return bracketWithType(str, "length");
};
var bracketOfPosition = function(str) {
  return bracketWithType(str, "position");
};
var cssvar = function(str) {
  if (/^\$[^\s'"`;{}]/.test(str)) {
    const [name, defaultValue] = str.slice(1).split(",");
    return `var(--${escapeSelector(name)}${defaultValue ? `, ${defaultValue}` : ""})`;
  }
};
var time = function(str) {
  const match = str.match(/^(-?[0-9.]+)(s|ms)?$/i);
  if (!match)
    return;
  const [, n2, unit] = match;
  const num = Number.parseFloat(n2);
  if (!Number.isNaN(num)) {
    if (num === 0 && !unit)
      return "0s";
    return unit ? `${round(num)}${unit}` : `${round(num)}ms`;
  }
};
var degree = function(str) {
  const match = str.match(/^(-?[0-9.]+)(deg|rad|grad|turn)?$/i);
  if (!match)
    return;
  const [, n2, unit] = match;
  const num = Number.parseFloat(n2);
  if (!Number.isNaN(num)) {
    if (num === 0)
      return "0";
    return unit ? `${round(num)}${unit}` : `${round(num)}deg`;
  }
};
var global = function(str) {
  if (globalKeywords.includes(str))
    return str;
};
var properties = function(str) {
  if (str.split(",").every((prop) => cssProps.includes(prop)))
    return str;
};
var position = function(str) {
  if (["top", "left", "right", "bottom", "center"].includes(str))
    return str;
};
var directionSize = function(propertyPrefix) {
  return ([_, direction, size], { theme }) => {
    const v = theme.spacing?.[size || "DEFAULT"] ?? h.bracket.cssvar.global.auto.fraction.rem(size);
    if (v != null)
      return directionMap[direction].map((i) => [`${propertyPrefix}${i}`, v]);
  };
};
var getThemeColorForKey = function(theme, colors, key = "colors") {
  let obj = theme[key];
  let index = -1;
  for (const c of colors) {
    index += 1;
    if (obj && typeof obj !== "string") {
      const camel = colors.slice(index).join("-").replace(/(-[a-z])/g, (n2) => n2.slice(1).toUpperCase());
      if (obj[camel])
        return obj[camel];
      if (obj[c]) {
        obj = obj[c];
        continue;
      }
    }
    return;
  }
  return obj;
};
var getThemeColor = function(theme, colors, key) {
  return getThemeColorForKey(theme, colors, key) || getThemeColorForKey(theme, colors, "colors");
};
var splitShorthand = function(body, type) {
  const [front, rest] = getStringComponent(body, "[", "]", ["/", ":"]) ?? [];
  if (front != null) {
    const match = (front.match(bracketTypeRe) ?? [])[1];
    if (match == null || match === type)
      return [front, rest];
  }
};
var parseColor2 = function(body, theme, key) {
  const split = splitShorthand(body, "color");
  if (!split)
    return;
  const [main, opacity] = split;
  const colors = main.replace(/([a-z])([0-9])/g, "$1-$2").split(/-/g);
  const [name] = colors;
  if (!name)
    return;
  let color;
  const bracket2 = h.bracketOfColor(main);
  const bracketOrMain = bracket2 || main;
  if (h.numberWithUnit(bracketOrMain))
    return;
  if (/^#[\da-fA-F]+$/.test(bracketOrMain))
    color = bracketOrMain;
  else if (/^hex-[\da-fA-F]+$/.test(bracketOrMain))
    color = `#${bracketOrMain.slice(4)}`;
  else if (main.startsWith("$"))
    color = h.cssvar(main);
  color = color || bracket2;
  if (!color) {
    const colorData = getThemeColor(theme, [main], key);
    if (typeof colorData === "string")
      color = colorData;
  }
  let no = "DEFAULT";
  if (!color) {
    let colorData;
    const [scale] = colors.slice(-1);
    if (/^\d+$/.test(scale)) {
      no = scale;
      colorData = getThemeColor(theme, colors.slice(0, -1), key);
      if (!colorData || typeof colorData === "string")
        color = undefined;
      else
        color = colorData[no];
    } else {
      colorData = getThemeColor(theme, colors, key);
      if (!colorData && colors.length <= 2) {
        [, no = no] = colors;
        colorData = getThemeColor(theme, [name], key);
      }
      if (typeof colorData === "string")
        color = colorData;
      else if (no && colorData)
        color = colorData[no];
    }
  }
  return {
    opacity,
    name,
    no,
    color,
    cssColor: parseCssColor(color),
    alpha: h.bracket.cssvar.percent(opacity ?? "")
  };
};
var colorResolver = function(property, varName, key, shouldPass) {
  return ([, body], { theme }) => {
    const data = parseColor2(body, theme, key);
    if (!data)
      return;
    const { alpha, color, cssColor } = data;
    const css = {};
    if (cssColor) {
      if (alpha != null) {
        css[property] = colorToString(cssColor, alpha);
      } else {
        const opacityVar = `--un-${varName}-opacity`;
        const result = colorToString(cssColor, `var(${opacityVar})`);
        if (result.includes(opacityVar))
          css[opacityVar] = colorOpacityToString(cssColor);
        css[property] = result;
      }
    } else if (color) {
      if (alpha != null) {
        css[property] = colorToString(color, alpha);
      } else {
        const opacityVar = `--un-${varName}-opacity`;
        const result = colorToString(color, `var(${opacityVar})`);
        if (result.includes(opacityVar))
          css[opacityVar] = 1;
        css[property] = result;
      }
    }
    if (shouldPass?.(css) !== false)
      return css;
  };
};
var colorableShadows = function(shadows, colorVar) {
  const colored = [];
  shadows = toArray(shadows);
  for (let i = 0;i < shadows.length; i++) {
    const components = getStringComponents(shadows[i], " ", 6);
    if (!components || components.length < 3)
      return shadows;
    let isInset = false;
    const pos = components.indexOf("inset");
    if (pos !== -1) {
      components.splice(pos, 1);
      isInset = true;
    }
    let colorVarValue = "";
    if (parseCssColor(components.at(0))) {
      const color = parseCssColor(components.shift());
      if (color)
        colorVarValue = `, ${colorToString(color)}`;
    } else if (parseCssColor(components.at(-1))) {
      const color = parseCssColor(components.pop());
      if (color)
        colorVarValue = `, ${colorToString(color)}`;
    }
    colored.push(`${isInset ? "inset " : ""}${components.join(" ")} var(${colorVar}${colorVarValue})`);
  }
  return colored;
};
var hasParseableColor = function(color, theme, key) {
  return color != null && !!parseColor2(color, theme, key)?.color;
};
var resolveBreakpoints = function({ theme, generator }, key = "breakpoints") {
  let breakpoints;
  if (generator.userConfig && generator.userConfig.theme)
    breakpoints = generator.userConfig.theme[key];
  if (!breakpoints)
    breakpoints = theme[key];
  return breakpoints ? Object.entries(breakpoints).sort((a, b) => Number.parseInt(a[1].replace(/[a-z]+/gi, "")) - Number.parseInt(b[1].replace(/[a-z]+/gi, ""))).map(([point, size]) => ({ point, size })) : undefined;
};
var makeGlobalStaticRules = function(prefix, property) {
  return globalKeywords.map((keyword) => [`${prefix}-${keyword}`, { [property ?? prefix]: keyword }]);
};
var isCSSMathFn = function(value) {
  return value != null && cssMathFnRE.test(value);
};
var isSize = function(str) {
  if (str[0] === "[" && str.slice(-1) === "]")
    str = str.slice(1, -1);
  return cssMathFnRE.test(str) || numberWithUnitRE.test(str);
};
var transformXYZ = function(d, v, name) {
  const values = v.split(splitComma);
  if (d || !d && values.length === 1)
    return xyzMap[d].map((i) => [`--un-${name}${i}`, v]);
  return values.map((v2, i) => [`--un-${name}-${xyzArray[i]}`, v2]);
};
var directionMap = {
  l: ["-left"],
  r: ["-right"],
  t: ["-top"],
  b: ["-bottom"],
  s: ["-inline-start"],
  e: ["-inline-end"],
  x: ["-left", "-right"],
  y: ["-top", "-bottom"],
  "": [""],
  bs: ["-block-start"],
  be: ["-block-end"],
  is: ["-inline-start"],
  ie: ["-inline-end"],
  block: ["-block-start", "-block-end"],
  inline: ["-inline-start", "-inline-end"]
};
var insetMap = {
  ...directionMap,
  s: ["-inset-inline-start"],
  start: ["-inset-inline-start"],
  e: ["-inset-inline-end"],
  end: ["-inset-inline-end"],
  bs: ["-inset-block-start"],
  be: ["-inset-block-end"],
  is: ["-inset-inline-start"],
  ie: ["-inset-inline-end"],
  block: ["-inset-block-start", "-inset-block-end"],
  inline: ["-inset-inline-start", "-inset-inline-end"]
};
var cornerMap = {
  l: ["-top-left", "-bottom-left"],
  r: ["-top-right", "-bottom-right"],
  t: ["-top-left", "-top-right"],
  b: ["-bottom-left", "-bottom-right"],
  tl: ["-top-left"],
  lt: ["-top-left"],
  tr: ["-top-right"],
  rt: ["-top-right"],
  bl: ["-bottom-left"],
  lb: ["-bottom-left"],
  br: ["-bottom-right"],
  rb: ["-bottom-right"],
  "": [""],
  bs: ["-start-start", "-start-end"],
  be: ["-end-start", "-end-end"],
  s: ["-end-start", "-start-start"],
  is: ["-end-start", "-start-start"],
  e: ["-start-end", "-end-end"],
  ie: ["-start-end", "-end-end"],
  ss: ["-start-start"],
  "bs-is": ["-start-start"],
  "is-bs": ["-start-start"],
  se: ["-start-end"],
  "bs-ie": ["-start-end"],
  "ie-bs": ["-start-end"],
  es: ["-end-start"],
  "be-is": ["-end-start"],
  "is-be": ["-end-start"],
  ee: ["-end-end"],
  "be-ie": ["-end-end"],
  "ie-be": ["-end-end"]
};
var xyzMap = {
  x: ["-x"],
  y: ["-y"],
  z: ["-z"],
  "": ["-x", "-y"]
};
var xyzArray = ["x", "y", "z"];
var basePositionMap = [
  "top",
  "top center",
  "top left",
  "top right",
  "bottom",
  "bottom center",
  "bottom left",
  "bottom right",
  "left",
  "left center",
  "left top",
  "left bottom",
  "right",
  "right center",
  "right top",
  "right bottom",
  "center",
  "center top",
  "center bottom",
  "center left",
  "center right",
  "center center"
];
var positionMap = Object.assign({}, ...basePositionMap.map((p) => ({ [p.replace(/ /, "-")]: p })), ...basePositionMap.map((p) => ({ [p.replace(/\b(\w)\w+/g, "$1").replace(/ /, "")]: p })));
var globalKeywords = [
  "inherit",
  "initial",
  "revert",
  "revert-layer",
  "unset"
];
var cssMathFnRE = /^(calc|clamp|min|max)\s*\((.+)\)(.*)/;
var numberWithUnitRE = /^(-?\d*(?:\.\d+)?)(px|pt|pc|%|r?(?:em|ex|lh|cap|ch|ic)|(?:[sld]?v|cq)(?:[whib]|min|max)|in|cm|mm|rpx)?$/i;
var numberRE = /^(-?\d*(?:\.\d+)?)$/i;
var unitOnlyRE = /^(px|[sld]?v[wh])$/i;
var unitOnlyMap = {
  px: 1,
  vw: 100,
  vh: 100,
  svw: 100,
  svh: 100,
  dvw: 100,
  dvh: 100,
  lvh: 100,
  lvw: 100
};
var bracketTypeRe = /^\[(color|length|size|position|quoted|string):/i;
var splitComma = /,(?![^()]*\))/g;
var cssProps = [
  "color",
  "border-color",
  "background-color",
  "flex-grow",
  "flex",
  "flex-shrink",
  "caret-color",
  "font",
  "gap",
  "opacity",
  "visibility",
  "z-index",
  "font-weight",
  "zoom",
  "text-shadow",
  "transform",
  "box-shadow",
  "background-position",
  "left",
  "right",
  "top",
  "bottom",
  "object-position",
  "max-height",
  "min-height",
  "max-width",
  "min-width",
  "height",
  "width",
  "border-width",
  "margin",
  "padding",
  "outline-width",
  "outline-offset",
  "font-size",
  "line-height",
  "text-indent",
  "vertical-align",
  "border-spacing",
  "letter-spacing",
  "word-spacing",
  "stroke",
  "filter",
  "backdrop-filter",
  "fill",
  "mask",
  "mask-size",
  "mask-border",
  "clip-path",
  "clip",
  "border-radius"
];
var valueHandlers = {
  __proto__: null,
  auto,
  bracket,
  bracketOfColor,
  bracketOfLength,
  bracketOfPosition,
  cssvar,
  degree,
  fraction,
  global,
  number,
  numberWithUnit,
  percent,
  position,
  properties,
  px,
  rem,
  time
};
var handler = createValueHandler(valueHandlers);
var h = handler;
var CONTROL_MINI_NO_NEGATIVE = "$$mini-no-negative";

// node_modules/@unocss/preset-mini/dist/colors.mjs
var colors = {
  inherit: "inherit",
  current: "currentColor",
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519"
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
    950: "#500724"
  },
  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
    950: "#4a044e"
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764"
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065"
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b"
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554"
  },
  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49"
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344"
  },
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e"
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22"
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16"
  },
  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314",
    950: "#1a2e05"
  },
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
    950: "#422006"
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03"
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407"
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a"
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712"
  },
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617"
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b"
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a"
  },
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09"
  },
  light: {
    50: "#fdfdfd",
    100: "#fcfcfc",
    200: "#fafafa",
    300: "#f8f9fa",
    400: "#f6f6f6",
    500: "#f2f2f2",
    600: "#f1f3f5",
    700: "#e9ecef",
    800: "#dee2e6",
    900: "#dde1e3",
    950: "#d8dcdf"
  },
  dark: {
    50: "#4a4a4a",
    100: "#3c3c3c",
    200: "#323232",
    300: "#2d2d2d",
    400: "#222222",
    500: "#1f1f1f",
    600: "#1c1c1e",
    700: "#1b1b1b",
    800: "#181818",
    900: "#0f0f0f",
    950: "#080808"
  },
  get lightblue() {
    return this.sky;
  },
  get lightBlue() {
    return this.sky;
  },
  get warmgray() {
    return this.stone;
  },
  get warmGray() {
    return this.stone;
  },
  get truegray() {
    return this.neutral;
  },
  get trueGray() {
    return this.neutral;
  },
  get coolgray() {
    return this.gray;
  },
  get coolGray() {
    return this.gray;
  },
  get bluegray() {
    return this.slate;
  },
  get blueGray() {
    return this.slate;
  }
};
Object.values(colors).forEach((color) => {
  if (typeof color !== "string" && color !== undefined) {
    color.DEFAULT = color.DEFAULT || color[400];
    Object.keys(color).forEach((key) => {
      const short = +key / 100;
      if (short === Math.round(short))
        color[short] = color[key];
    });
  }
});

// node_modules/@unocss/preset-mini/dist/shared/preset-mini.BLqeNSHq.mjs
var handleWidth = function([, b], { theme }) {
  return { "--un-ring-width": theme.ringWidth?.[b] ?? h.bracket.cssvar.px(b) };
};
var handleColorOrWidth = function(match, ctx) {
  if (isCSSMathFn(h.bracket(match[1])))
    return handleWidth(match, ctx);
  return colorResolver("--un-ring-color", "ring", "borderColor")(match, ctx);
};
var handleTranslate = function([, d, b], { theme }) {
  const v = theme.spacing?.[b] ?? h.bracket.cssvar.fraction.rem(b);
  if (v != null) {
    return [
      ...transformXYZ(d, v, "translate"),
      ["transform", transformCpu]
    ];
  }
};
var handleScale = function([, d, b]) {
  const v = h.bracket.cssvar.fraction.percent(b);
  if (v != null) {
    return [
      ...transformXYZ(d, v, "scale"),
      ["transform", transformCpu]
    ];
  }
};
var handleRotate = function([, d = "", b]) {
  const v = h.bracket.cssvar.degree(b);
  if (v != null) {
    if (d) {
      return {
        "--un-rotate": 0,
        [`--un-rotate-${d}`]: v,
        transform: transformCpu
      };
    } else {
      return {
        "--un-rotate-x": 0,
        "--un-rotate-y": 0,
        "--un-rotate-z": 0,
        "--un-rotate": v,
        transform: transformCpu
      };
    }
  }
};
var handleSkew = function([, d, b]) {
  const v = h.bracket.cssvar.degree(b);
  if (v != null) {
    return [
      ...transformXYZ(d, v, "skew"),
      ["transform", transformCpu]
    ];
  }
};
var cursorValues = ["auto", "default", "none", "context-menu", "help", "pointer", "progress", "wait", "cell", "crosshair", "text", "vertical-text", "alias", "copy", "move", "no-drop", "not-allowed", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out"];
var containValues = ["none", "strict", "content", "size", "inline-size", "layout", "style", "paint"];
var varEmpty = " ";
var displays = [
  ["inline", { display: "inline" }],
  ["block", { display: "block" }],
  ["inline-block", { display: "inline-block" }],
  ["contents", { display: "contents" }],
  ["flow-root", { display: "flow-root" }],
  ["list-item", { display: "list-item" }],
  ["hidden", { display: "none" }],
  [/^display-(.+)$/, ([, c]) => ({ display: h.bracket.cssvar.global(c) })]
];
var appearances = [
  ["visible", { visibility: "visible" }],
  ["invisible", { visibility: "hidden" }],
  ["backface-visible", { "backface-visibility": "visible" }],
  ["backface-hidden", { "backface-visibility": "hidden" }],
  ...makeGlobalStaticRules("backface", "backface-visibility")
];
var cursors = [
  [/^cursor-(.+)$/, ([, c]) => ({ cursor: h.bracket.cssvar.global(c) })],
  ...cursorValues.map((v) => [`cursor-${v}`, { cursor: v }])
];
var contains = [
  [/^contain-(.*)$/, ([, d]) => {
    if (h.bracket(d) != null) {
      return {
        contain: h.bracket(d).split(" ").map((e2) => h.cssvar.fraction(e2) ?? e2).join(" ")
      };
    }
    return containValues.includes(d) ? { contain: d } : undefined;
  }]
];
var pointerEvents = [
  ["pointer-events-auto", { "pointer-events": "auto" }],
  ["pointer-events-none", { "pointer-events": "none" }],
  ...makeGlobalStaticRules("pointer-events")
];
var resizes = [
  ["resize-x", { resize: "horizontal" }],
  ["resize-y", { resize: "vertical" }],
  ["resize", { resize: "both" }],
  ["resize-none", { resize: "none" }],
  ...makeGlobalStaticRules("resize")
];
var userSelects = [
  ["select-auto", { "-webkit-user-select": "auto", "user-select": "auto" }],
  ["select-all", { "-webkit-user-select": "all", "user-select": "all" }],
  ["select-text", { "-webkit-user-select": "text", "user-select": "text" }],
  ["select-none", { "-webkit-user-select": "none", "user-select": "none" }],
  ...makeGlobalStaticRules("select", "user-select")
];
var whitespaces = [
  [
    /^(?:whitespace-|ws-)([-\w]+)$/,
    ([, v]) => ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces", ...globalKeywords].includes(v) ? { "white-space": v } : undefined,
    { autocomplete: "(whitespace|ws)-(normal|nowrap|pre|pre-line|pre-wrap|break-spaces)" }
  ]
];
var contentVisibility = [
  [/^intrinsic-size-(.+)$/, ([, d]) => ({ "contain-intrinsic-size": h.bracket.cssvar.global.fraction.rem(d) }), { autocomplete: "intrinsic-size-<num>" }],
  ["content-visibility-visible", { "content-visibility": "visible" }],
  ["content-visibility-hidden", { "content-visibility": "hidden" }],
  ["content-visibility-auto", { "content-visibility": "auto" }],
  ...makeGlobalStaticRules("content-visibility")
];
var contents = [
  [/^content-(.+)$/, ([, v]) => ({ content: h.bracket.cssvar(v) })],
  ["content-empty", { content: '""' }],
  ["content-none", { content: "none" }]
];
var breaks = [
  ["break-normal", { "overflow-wrap": "normal", "word-break": "normal" }],
  ["break-words", { "overflow-wrap": "break-word" }],
  ["break-all", { "word-break": "break-all" }],
  ["break-keep", { "word-break": "keep-all" }],
  ["break-anywhere", { "overflow-wrap": "anywhere" }]
];
var textWraps = [
  ["text-wrap", { "text-wrap": "wrap" }],
  ["text-nowrap", { "text-wrap": "nowrap" }],
  ["text-balance", { "text-wrap": "balance" }],
  ["text-pretty", { "text-wrap": "pretty" }]
];
var textOverflows = [
  ["truncate", { overflow: "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" }],
  ["text-truncate", { overflow: "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" }],
  ["text-ellipsis", { "text-overflow": "ellipsis" }],
  ["text-clip", { "text-overflow": "clip" }]
];
var textTransforms = [
  ["case-upper", { "text-transform": "uppercase" }],
  ["case-lower", { "text-transform": "lowercase" }],
  ["case-capital", { "text-transform": "capitalize" }],
  ["case-normal", { "text-transform": "none" }],
  ...makeGlobalStaticRules("case", "text-transform")
];
var fontStyles = [
  ["italic", { "font-style": "italic" }],
  ["not-italic", { "font-style": "normal" }],
  ["font-italic", { "font-style": "italic" }],
  ["font-not-italic", { "font-style": "normal" }],
  ["oblique", { "font-style": "oblique" }],
  ["not-oblique", { "font-style": "normal" }],
  ["font-oblique", { "font-style": "oblique" }],
  ["font-not-oblique", { "font-style": "normal" }]
];
var fontSmoothings = [
  ["antialiased", {
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale"
  }],
  ["subpixel-antialiased", {
    "-webkit-font-smoothing": "auto",
    "-moz-osx-font-smoothing": "auto"
  }]
];
var ringBase = {
  "--un-ring-inset": varEmpty,
  "--un-ring-offset-width": "0px",
  "--un-ring-offset-color": "#fff",
  "--un-ring-width": "0px",
  "--un-ring-color": "rgb(147 197 253 / 0.5)",
  "--un-shadow": "0 0 rgb(0 0 0 / 0)"
};
var rings = [
  [/^ring(?:-(.+))?$/, ([, d], { theme }) => {
    const value = theme.ringWidth?.[d || "DEFAULT"] ?? h.px(d || "1");
    if (value) {
      return {
        "--un-ring-width": value,
        "--un-ring-offset-shadow": "var(--un-ring-inset) 0 0 0 var(--un-ring-offset-width) var(--un-ring-offset-color)",
        "--un-ring-shadow": "var(--un-ring-inset) 0 0 0 calc(var(--un-ring-width) + var(--un-ring-offset-width)) var(--un-ring-color)",
        "box-shadow": "var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)"
      };
    }
  }, { autocomplete: "ring-$ringWidth" }],
  [/^ring-(?:width-|size-)(.+)$/, handleWidth, { autocomplete: "ring-(width|size)-$lineWidth" }],
  ["ring-offset", { "--un-ring-offset-width": "1px" }],
  [/^ring-offset-(?:width-|size-)?(.+)$/, ([, d], { theme }) => ({ "--un-ring-offset-width": theme.lineWidth?.[d] ?? h.bracket.cssvar.px(d) }), { autocomplete: "ring-offset-(width|size)-$lineWidth" }],
  [/^ring-(.+)$/, handleColorOrWidth, { autocomplete: "ring-$colors" }],
  [/^ring-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ "--un-ring-opacity": h.bracket.percent.cssvar(opacity) }), { autocomplete: "ring-(op|opacity)-<percent>" }],
  [/^ring-offset-(.+)$/, colorResolver("--un-ring-offset-color", "ring-offset", "borderColor"), { autocomplete: "ring-offset-$colors" }],
  [/^ring-offset-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ "--un-ring-offset-opacity": h.bracket.percent.cssvar(opacity) }), { autocomplete: "ring-offset-(op|opacity)-<percent>" }],
  ["ring-inset", { "--un-ring-inset": "inset" }]
];
var boxShadowsBase = {
  "--un-ring-offset-shadow": "0 0 rgb(0 0 0 / 0)",
  "--un-ring-shadow": "0 0 rgb(0 0 0 / 0)",
  "--un-shadow-inset": varEmpty,
  "--un-shadow": "0 0 rgb(0 0 0 / 0)"
};
var boxShadows = [
  [/^shadow(?:-(.+))?$/, (match, context) => {
    const [, d] = match;
    const { theme } = context;
    const v = theme.boxShadow?.[d || "DEFAULT"];
    const c = d ? h.bracket.cssvar(d) : undefined;
    if ((v != null || c != null) && !hasParseableColor(c, theme, "shadowColor")) {
      return {
        "--un-shadow": colorableShadows(v || c, "--un-shadow-color").join(","),
        "box-shadow": "var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow)"
      };
    }
    return colorResolver("--un-shadow-color", "shadow", "shadowColor")(match, context);
  }, { autocomplete: ["shadow-$colors", "shadow-$boxShadow"] }],
  [/^shadow-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ "--un-shadow-opacity": h.bracket.percent.cssvar(opacity) }), { autocomplete: "shadow-(op|opacity)-<percent>" }],
  ["shadow-inset", { "--un-shadow-inset": "inset" }]
];
var transformValues = [
  "translate",
  "rotate",
  "scale"
];
var transformCpu = [
  "translateX(var(--un-translate-x))",
  "translateY(var(--un-translate-y))",
  "translateZ(var(--un-translate-z))",
  "rotate(var(--un-rotate))",
  "rotateX(var(--un-rotate-x))",
  "rotateY(var(--un-rotate-y))",
  "rotateZ(var(--un-rotate-z))",
  "skewX(var(--un-skew-x))",
  "skewY(var(--un-skew-y))",
  "scaleX(var(--un-scale-x))",
  "scaleY(var(--un-scale-y))",
  "scaleZ(var(--un-scale-z))"
].join(" ");
var transformGpu = [
  "translate3d(var(--un-translate-x), var(--un-translate-y), var(--un-translate-z))",
  "rotate(var(--un-rotate))",
  "rotateX(var(--un-rotate-x))",
  "rotateY(var(--un-rotate-y))",
  "rotateZ(var(--un-rotate-z))",
  "skewX(var(--un-skew-x))",
  "skewY(var(--un-skew-y))",
  "scaleX(var(--un-scale-x))",
  "scaleY(var(--un-scale-y))",
  "scaleZ(var(--un-scale-z))"
].join(" ");
var transformBase = {
  "--un-rotate": 0,
  "--un-rotate-x": 0,
  "--un-rotate-y": 0,
  "--un-rotate-z": 0,
  "--un-scale-x": 1,
  "--un-scale-y": 1,
  "--un-scale-z": 1,
  "--un-skew-x": 0,
  "--un-skew-y": 0,
  "--un-translate-x": 0,
  "--un-translate-y": 0,
  "--un-translate-z": 0
};
var transforms = [
  [/^(?:transform-)?origin-(.+)$/, ([, s]) => ({ "transform-origin": positionMap[s] ?? h.bracket.cssvar(s) }), { autocomplete: [`transform-origin-(${Object.keys(positionMap).join("|")})`, `origin-(${Object.keys(positionMap).join("|")})`] }],
  [/^(?:transform-)?perspect(?:ive)?-(.+)$/, ([, s]) => {
    const v = h.bracket.cssvar.px.numberWithUnit(s);
    if (v != null) {
      return {
        "-webkit-perspective": v,
        perspective: v
      };
    }
  }],
  [/^(?:transform-)?perspect(?:ive)?-origin-(.+)$/, ([, s]) => {
    const v = h.bracket.cssvar(s) ?? (s.length >= 3 ? positionMap[s] : undefined);
    if (v != null) {
      return {
        "-webkit-perspective-origin": v,
        "perspective-origin": v
      };
    }
  }],
  [/^(?:transform-)?translate-()(.+)$/, handleTranslate],
  [/^(?:transform-)?translate-([xyz])-(.+)$/, handleTranslate],
  [/^(?:transform-)?rotate-()(.+)$/, handleRotate],
  [/^(?:transform-)?rotate-([xyz])-(.+)$/, handleRotate],
  [/^(?:transform-)?skew-()(.+)$/, handleSkew],
  [/^(?:transform-)?skew-([xy])-(.+)$/, handleSkew, { autocomplete: ["transform-skew-(x|y)-<percent>", "skew-(x|y)-<percent>"] }],
  [/^(?:transform-)?scale-()(.+)$/, handleScale],
  [/^(?:transform-)?scale-([xyz])-(.+)$/, handleScale, { autocomplete: [`transform-(${transformValues.join("|")})-<percent>`, `transform-(${transformValues.join("|")})-(x|y|z)-<percent>`, `(${transformValues.join("|")})-<percent>`, `(${transformValues.join("|")})-(x|y|z)-<percent>`] }],
  [/^(?:transform-)?preserve-3d$/, () => ({ "transform-style": "preserve-3d" })],
  [/^(?:transform-)?preserve-flat$/, () => ({ "transform-style": "flat" })],
  ["transform", { transform: transformCpu }],
  ["transform-cpu", { transform: transformCpu }],
  ["transform-gpu", { transform: transformGpu }],
  ["transform-none", { transform: "none" }],
  ...makeGlobalStaticRules("transform")
];

// node_modules/@unocss/preset-mini/dist/shared/preset-mini.B-FeHxXU.mjs
var fontFamily = {
  sans: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    '"Noto Sans"',
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"'
  ].join(","),
  serif: [
    "ui-serif",
    "Georgia",
    "Cambria",
    '"Times New Roman"',
    "Times",
    "serif"
  ].join(","),
  mono: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    '"Liberation Mono"',
    '"Courier New"',
    "monospace"
  ].join(",")
};
var fontSize = {
  xs: ["0.75rem", "1rem"],
  sm: ["0.875rem", "1.25rem"],
  base: ["1rem", "1.5rem"],
  lg: ["1.125rem", "1.75rem"],
  xl: ["1.25rem", "1.75rem"],
  "2xl": ["1.5rem", "2rem"],
  "3xl": ["1.875rem", "2.25rem"],
  "4xl": ["2.25rem", "2.5rem"],
  "5xl": ["3rem", "1"],
  "6xl": ["3.75rem", "1"],
  "7xl": ["4.5rem", "1"],
  "8xl": ["6rem", "1"],
  "9xl": ["8rem", "1"]
};
var textIndent = {
  DEFAULT: "1.5rem",
  xs: "0.5rem",
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
  xl: "2.5rem",
  "2xl": "3rem",
  "3xl": "4rem"
};
var textStrokeWidth = {
  DEFAULT: "1.5rem",
  none: "0",
  sm: "thin",
  md: "medium",
  lg: "thick"
};
var textShadow = {
  DEFAULT: ["0 0 1px rgb(0 0 0 / 0.2)", "0 0 1px rgb(1 0 5 / 0.1)"],
  none: "0 0 rgb(0 0 0 / 0)",
  sm: "1px 1px 3px rgb(36 37 47 / 0.25)",
  md: ["0 1px 2px rgb(30 29 39 / 0.19)", "1px 2px 4px rgb(54 64 147 / 0.18)"],
  lg: ["3px 3px 6px rgb(0 0 0 / 0.26)", "0 0 5px rgb(15 3 86 / 0.22)"],
  xl: ["1px 1px 3px rgb(0 0 0 / 0.29)", "2px 4px 7px rgb(73 64 125 / 0.35)"]
};
var lineHeight = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2"
};
var letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em"
};
var fontWeight = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900"
};
var wordSpacing = letterSpacing;
var breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
};
var verticalBreakpoints = { ...breakpoints };
var lineWidth = {
  DEFAULT: "1px",
  none: "0"
};
var spacing = {
  DEFAULT: "1rem",
  none: "0",
  xs: "0.75rem",
  sm: "0.875rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem"
};
var duration = {
  DEFAULT: "150ms",
  none: "0s",
  75: "75ms",
  100: "100ms",
  150: "150ms",
  200: "200ms",
  300: "300ms",
  500: "500ms",
  700: "700ms",
  1000: "1000ms"
};
var borderRadius = {
  DEFAULT: "0.25rem",
  none: "0",
  sm: "0.125rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px"
};
var boxShadow = {
  DEFAULT: ["var(--un-shadow-inset) 0 1px 3px 0 rgb(0 0 0 / 0.1)", "var(--un-shadow-inset) 0 1px 2px -1px rgb(0 0 0 / 0.1)"],
  none: "0 0 rgb(0 0 0 / 0)",
  sm: "var(--un-shadow-inset) 0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: ["var(--un-shadow-inset) 0 4px 6px -1px rgb(0 0 0 / 0.1)", "var(--un-shadow-inset) 0 2px 4px -2px rgb(0 0 0 / 0.1)"],
  lg: ["var(--un-shadow-inset) 0 10px 15px -3px rgb(0 0 0 / 0.1)", "var(--un-shadow-inset) 0 4px 6px -4px rgb(0 0 0 / 0.1)"],
  xl: ["var(--un-shadow-inset) 0 20px 25px -5px rgb(0 0 0 / 0.1)", "var(--un-shadow-inset) 0 8px 10px -6px rgb(0 0 0 / 0.1)"],
  "2xl": "var(--un-shadow-inset) 0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
};
var easing = {
  DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
  linear: "linear",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
};
var ringWidth = {
  DEFAULT: "3px",
  none: "0"
};
var zIndex = {
  auto: "auto"
};
var media = {
  mouse: "(hover) and (pointer: fine)"
};
var blur = {
  DEFAULT: "8px",
  "0": "0",
  sm: "4px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "40px",
  "3xl": "64px"
};
var dropShadow = {
  DEFAULT: ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"],
  sm: "0 1px 1px rgb(0 0 0 / 0.05)",
  md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"],
  lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"],
  xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"],
  "2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
  none: "0 0 rgb(0 0 0 / 0)"
};
var baseSize = {
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
  prose: "65ch"
};
var width = {
  auto: "auto",
  ...baseSize,
  screen: "100vw"
};
var maxWidth = {
  none: "none",
  ...baseSize,
  screen: "100vw"
};
var height = {
  auto: "auto",
  ...baseSize,
  screen: "100vh"
};
var maxHeight = {
  none: "none",
  ...baseSize,
  screen: "100vh"
};
var containers = Object.fromEntries(Object.entries(baseSize).map(([k, v]) => [k, `(min-width: ${v})`]));
var preflightBase = {
  ...transformBase,
  ...boxShadowsBase,
  ...ringBase
};
var theme = {
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth: maxWidth,
  minHeight: maxHeight,
  inlineSize: width,
  blockSize: height,
  maxInlineSize: maxWidth,
  maxBlockSize: maxHeight,
  minInlineSize: maxWidth,
  minBlockSize: maxHeight,
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  breakpoints,
  verticalBreakpoints,
  borderRadius,
  lineHeight,
  letterSpacing,
  wordSpacing,
  boxShadow,
  textIndent,
  textShadow,
  textStrokeWidth,
  blur,
  dropShadow,
  easing,
  lineWidth,
  spacing,
  duration,
  ringWidth,
  preflightBase,
  containers,
  zIndex,
  media
};

// node_modules/@unocss/preset-mini/dist/shared/preset-mini.BkfCAdS7.mjs
var handleWidth$2 = function([, b], { theme: theme2 }) {
  return { "outline-width": theme2.lineWidth?.[b] ?? h.bracket.cssvar.global.px(b) };
};
var handleColorOrWidth$2 = function(match, ctx) {
  if (isCSSMathFn(h.bracket(match[1])))
    return handleWidth$2(match, ctx);
  return colorResolver("outline-color", "outline-color", "borderColor")(match, ctx);
};
var willChangeProperty = function(prop) {
  return h.properties.auto.global(prop) ?? {
    contents: "contents",
    scroll: "scroll-position"
  }[prop];
};
var transformBorderColor = function(color, alpha, direction) {
  if (alpha != null) {
    return {
      [`border${direction}-color`]: colorToString(color, alpha)
    };
  }
  if (direction === "") {
    const object = {};
    const opacityVar = `--un-border-opacity`;
    const result = colorToString(color, `var(${opacityVar})`);
    if (result.includes(opacityVar))
      object[opacityVar] = typeof color === "string" ? 1 : colorOpacityToString(color);
    object["border-color"] = result;
    return object;
  } else {
    const object = {};
    const opacityVar = "--un-border-opacity";
    const opacityDirectionVar = `--un-border${direction}-opacity`;
    const result = colorToString(color, `var(${opacityDirectionVar})`);
    if (result.includes(opacityDirectionVar)) {
      object[opacityVar] = typeof color === "string" ? 1 : colorOpacityToString(color);
      object[opacityDirectionVar] = `var(${opacityVar})`;
    }
    object[`border${direction}-color`] = result;
    return object;
  }
};
var borderColorResolver = function(direction) {
  return ([, body], theme2) => {
    const data = parseColor2(body, theme2, "borderColor");
    if (!data)
      return;
    const { alpha, color, cssColor } = data;
    if (cssColor)
      return transformBorderColor(cssColor, alpha, direction);
    else if (color)
      return transformBorderColor(color, alpha, direction);
  };
};
var handlerBorderSize = function([, a = "", b], { theme: theme2 }) {
  const v = theme2.lineWidth?.[b || "DEFAULT"] ?? h.bracket.cssvar.global.px(b || "1");
  if (a in directionMap && v != null)
    return directionMap[a].map((i) => [`border${i}-width`, v]);
};
var handlerBorderColorOrSize = function([, a = "", b], ctx) {
  if (a in directionMap) {
    if (isCSSMathFn(h.bracket(b)))
      return handlerBorderSize(["", a, b], ctx);
    if (hasParseableColor(b, ctx.theme, "borderColor")) {
      return Object.assign({}, ...directionMap[a].map((i) => borderColorResolver(i)(["", b], ctx.theme)));
    }
  }
};
var handlerBorderOpacity = function([, a = "", opacity]) {
  const v = h.bracket.percent.cssvar(opacity);
  if (a in directionMap && v != null)
    return directionMap[a].map((i) => [`--un-border${i}-opacity`, v]);
};
var handlerRounded = function([, a = "", s], { theme: theme2 }) {
  const v = theme2.borderRadius?.[s || "DEFAULT"] || h.bracket.cssvar.global.fraction.rem(s || "1");
  if (a in cornerMap && v != null)
    return cornerMap[a].map((i) => [`border${i}-radius`, v]);
};
var handlerBorderStyle = function([, a = "", s]) {
  if (borderStyles.includes(s) && a in directionMap)
    return directionMap[a].map((i) => [`border${i}-style`, s]);
};
var handleWidth$1 = function([, b], { theme: theme2 }) {
  return { "text-decoration-thickness": theme2.lineWidth?.[b] ?? h.bracket.cssvar.global.px(b) };
};
var handleColorOrWidth$1 = function(match, ctx) {
  if (isCSSMathFn(h.bracket(match[1])))
    return handleWidth$1(match, ctx);
  const result = colorResolver("text-decoration-color", "line", "borderColor")(match, ctx);
  if (result) {
    return {
      "-webkit-text-decoration-color": result["text-decoration-color"],
      ...result
    };
  }
};
var transitionProperty = function(prop) {
  return h.properties(prop) ?? transitionPropertyGroup[prop];
};
var handleThemeByKey = function(s, theme2, key) {
  return theme2[key]?.[s] || h.bracket.cssvar.global.rem(s);
};
var handleSize = function([, s], { theme: theme2 }) {
  const themed = toArray(theme2.fontSize?.[s]);
  const size = themed?.[0] ?? h.bracket.cssvar.global.rem(s);
  if (size != null)
    return { "font-size": size };
};
var handlerColorOrSize = function(match, ctx) {
  if (isCSSMathFn(h.bracket(match[1])))
    return handleSize(match, ctx);
  return colorResolver("color", "text", "textColor")(match, ctx);
};
var handleText = function([, s = "base"], { theme: theme2 }) {
  const split = splitShorthand(s, "length");
  if (!split)
    return;
  const [size, leading] = split;
  const sizePairs = toArray(theme2.fontSize?.[size]);
  const lineHeight2 = leading ? handleThemeByKey(leading, theme2, "lineHeight") : undefined;
  if (sizePairs?.[0]) {
    const [fontSize22, height2, letterSpacing2] = sizePairs;
    if (typeof height2 === "object") {
      return {
        "font-size": fontSize22,
        ...height2
      };
    }
    return {
      "font-size": fontSize22,
      "line-height": lineHeight2 ?? height2 ?? "1",
      "letter-spacing": letterSpacing2 ? handleThemeByKey(letterSpacing2, theme2, "letterSpacing") : undefined
    };
  }
  const fontSize2 = h.bracketOfLength.rem(size);
  if (lineHeight2 && fontSize2) {
    return {
      "font-size": fontSize2,
      "line-height": lineHeight2
    };
  }
  return { "font-size": h.bracketOfLength.rem(s) };
};
var handleGap = function([, d = "", s], { theme: theme2 }) {
  const v = theme2.spacing?.[s] ?? h.bracket.cssvar.global.rem(s);
  if (v != null) {
    return {
      [`${directions[d]}gap`]: v
    };
  }
};
var rowCol = function(s) {
  return s.replace("col", "column");
};
var rowColTheme = function(s) {
  return s[0] === "r" ? "Row" : "Column";
};
var autoDirection = function(c, theme2, prop) {
  const v = theme2[`gridAuto${rowColTheme(c)}`]?.[prop];
  if (v != null)
    return v;
  switch (prop) {
    case "min":
      return "min-content";
    case "max":
      return "max-content";
    case "fr":
      return "minmax(0,1fr)";
  }
  return h.bracket.cssvar.auto.rem(prop);
};
var handleInsetValue = function(v, { theme: theme2 }) {
  return theme2.spacing?.[v] ?? h.bracket.cssvar.global.auto.fraction.rem(v);
};
var handleInsetValues = function([, d, v], ctx) {
  const r = handleInsetValue(v, ctx);
  if (r != null && d in insetMap)
    return insetMap[d].map((i) => [i.slice(1), r]);
};
var getPropName = function(minmax, hw) {
  return `${minmax || ""}${sizeMapping[hw]}`;
};
var getSizeValue = function(minmax, hw, theme2, prop) {
  const str = getPropName(minmax, hw).replace(/-(\w)/g, (_, p) => p.toUpperCase());
  const v = theme2[str]?.[prop];
  if (v != null)
    return v;
  switch (prop) {
    case "fit":
    case "max":
    case "min":
      return `${prop}-content`;
  }
  return h.bracket.cssvar.global.auto.fraction.rem(prop);
};
var handleBreakpoint = function(context, point, key = "breakpoints") {
  const bp = resolveBreakpoints(context, key);
  if (bp)
    return bp.find((i) => i.point === point)?.size;
};
var getAspectRatio = function(prop) {
  if (/^\d+\/\d+$/.test(prop))
    return prop;
  switch (prop) {
    case "square":
      return "1/1";
    case "video":
      return "16/9";
  }
  return h.bracket.cssvar.global.auto.number(prop);
};
var isValidCSSBody = function(body) {
  let i = 0;
  function findUntil(c) {
    while (i < body.length) {
      i += 1;
      const char = body[i];
      if (char === c)
        return true;
    }
    return false;
  }
  for (i = 0;i < body.length; i++) {
    const c = body[i];
    if ("\"`'".includes(c)) {
      if (!findUntil(c))
        return false;
    } else if (c === "(") {
      if (!findUntil(")"))
        return false;
    } else if ("[]{}:".includes(c)) {
      return false;
    }
  }
  return true;
};
var isURI = function(declaration) {
  if (!declaration.includes("://"))
    return false;
  try {
    return new URL(declaration).host !== "";
  } catch (err) {
    return false;
  }
};
var handleWidth2 = function([, b], { theme: theme2 }) {
  return { "stroke-width": theme2.lineWidth?.[b] ?? h.bracket.cssvar.fraction.px.number(b) };
};
var handleColorOrWidth2 = function(match, ctx) {
  if (isCSSMathFn(h.bracket(match[1])))
    return handleWidth2(match, ctx);
  return colorResolver("stroke", "stroke", "borderColor")(match, ctx);
};
var verticalAlignAlias = {
  mid: "middle",
  base: "baseline",
  btm: "bottom",
  baseline: "baseline",
  top: "top",
  start: "top",
  middle: "middle",
  bottom: "bottom",
  end: "bottom",
  "text-top": "text-top",
  "text-bottom": "text-bottom",
  sub: "sub",
  super: "super",
  ...Object.fromEntries(globalKeywords.map((x) => [x, x]))
};
var verticalAligns = [
  [
    /^(?:vertical|align|v)-([-\w]+%?)$/,
    ([, v]) => ({ "vertical-align": verticalAlignAlias[v] ?? h.numberWithUnit(v) }),
    {
      autocomplete: [
        `(vertical|align|v)-(${Object.keys(verticalAlignAlias).join("|")})`,
        "(vertical|align|v)-<percentage>"
      ]
    }
  ]
];
var textAligns = ["center", "left", "right", "justify", "start", "end"].map((v) => [`text-${v}`, { "text-align": v }]);
var outline = [
  [/^outline-(?:width-|size-)?(.+)$/, handleWidth$2, { autocomplete: "outline-(width|size)-<num>" }],
  [/^outline-(?:color-)?(.+)$/, handleColorOrWidth$2, { autocomplete: "outline-$colors" }],
  [/^outline-offset-(.+)$/, ([, d], { theme: theme2 }) => ({ "outline-offset": theme2.lineWidth?.[d] ?? h.bracket.cssvar.global.px(d) }), { autocomplete: "outline-(offset)-<num>" }],
  ["outline", { "outline-style": "solid" }],
  ...["auto", "dashed", "dotted", "double", "hidden", "solid", "groove", "ridge", "inset", "outset", ...globalKeywords].map((v) => [`outline-${v}`, { "outline-style": v }]),
  ["outline-none", { outline: "2px solid transparent", "outline-offset": "2px" }]
];
var appearance = [
  ["appearance-auto", { "-webkit-appearance": "auto", appearance: "auto" }],
  ["appearance-none", { "-webkit-appearance": "none", appearance: "none" }]
];
var willChange = [
  [/^will-change-(.+)/, ([, p]) => ({ "will-change": willChangeProperty(p) })]
];
var borderStyles = ["solid", "dashed", "dotted", "double", "hidden", "none", "groove", "ridge", "inset", "outset", ...globalKeywords];
var borders = [
  [/^(?:border|b)()(?:-(.+))?$/, handlerBorderSize, { autocomplete: "(border|b)-<directions>" }],
  [/^(?:border|b)-([xy])(?:-(.+))?$/, handlerBorderSize],
  [/^(?:border|b)-([rltbse])(?:-(.+))?$/, handlerBorderSize],
  [/^(?:border|b)-(block|inline)(?:-(.+))?$/, handlerBorderSize],
  [/^(?:border|b)-([bi][se])(?:-(.+))?$/, handlerBorderSize],
  [/^(?:border|b)-()(?:width|size)-(.+)$/, handlerBorderSize, { autocomplete: ["(border|b)-<num>", "(border|b)-<directions>-<num>"] }],
  [/^(?:border|b)-([xy])-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border|b)-([rltbse])-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border|b)-(block|inline)-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border|b)-([bi][se])-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border|b)-()(?:color-)?(.+)$/, handlerBorderColorOrSize, { autocomplete: ["(border|b)-$colors", "(border|b)-<directions>-$colors"] }],
  [/^(?:border|b)-([xy])-(?:color-)?(.+)$/, handlerBorderColorOrSize],
  [/^(?:border|b)-([rltbse])-(?:color-)?(.+)$/, handlerBorderColorOrSize],
  [/^(?:border|b)-(block|inline)-(?:color-)?(.+)$/, handlerBorderColorOrSize],
  [/^(?:border|b)-([bi][se])-(?:color-)?(.+)$/, handlerBorderColorOrSize],
  [/^(?:border|b)-()op(?:acity)?-?(.+)$/, handlerBorderOpacity, { autocomplete: "(border|b)-(op|opacity)-<percent>" }],
  [/^(?:border|b)-([xy])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  [/^(?:border|b)-([rltbse])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  [/^(?:border|b)-(block|inline)-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  [/^(?:border|b)-([bi][se])-op(?:acity)?-?(.+)$/, handlerBorderOpacity],
  [/^(?:border-|b-)?(?:rounded|rd)()(?:-(.+))?$/, handlerRounded, { autocomplete: ["(border|b)-(rounded|rd)", "(border|b)-(rounded|rd)-<num>", "(rounded|rd)", "(rounded|rd)-<num>"] }],
  [/^(?:border-|b-)?(?:rounded|rd)-([rltbse])(?:-(.+))?$/, handlerRounded],
  [/^(?:border-|b-)?(?:rounded|rd)-([rltb]{2})(?:-(.+))?$/, handlerRounded],
  [/^(?:border-|b-)?(?:rounded|rd)-([bise][se])(?:-(.+))?$/, handlerRounded],
  [/^(?:border-|b-)?(?:rounded|rd)-([bi][se]-[bi][se])(?:-(.+))?$/, handlerRounded],
  [/^(?:border|b)-(?:style-)?()(.+)$/, handlerBorderStyle, { autocomplete: ["(border|b)-style", `(border|b)-(${borderStyles.join("|")})`, "(border|b)-<directions>-style", `(border|b)-<directions>-(${borderStyles.join("|")})`, `(border|b)-<directions>-style-(${borderStyles.join("|")})`, `(border|b)-style-(${borderStyles.join("|")})`] }],
  [/^(?:border|b)-([xy])-(?:style-)?(.+)$/, handlerBorderStyle],
  [/^(?:border|b)-([rltbse])-(?:style-)?(.+)$/, handlerBorderStyle],
  [/^(?:border|b)-(block|inline)-(?:style-)?(.+)$/, handlerBorderStyle],
  [/^(?:border|b)-([bi][se])-(?:style-)?(.+)$/, handlerBorderStyle]
];
var opacity = [
  [/^op(?:acity)?-?(.+)$/, ([, d]) => ({ opacity: h.bracket.percent.cssvar(d) })]
];
var bgUrlRE = /^\[url\(.+\)\]$/;
var bgLengthRE = /^\[(length|size):.+\]$/;
var bgPositionRE = /^\[position:.+\]$/;
var bgGradientRE = /^\[(linear|conic|radial)-gradient\(.+\)\]$/;
var bgColors = [
  [/^bg-(.+)$/, (...args) => {
    const d = args[0][1];
    if (bgUrlRE.test(d))
      return { "--un-url": h.bracket(d), "background-image": "var(--un-url)" };
    if (bgLengthRE.test(d) && h.bracketOfLength(d) != null)
      return { "background-size": h.bracketOfLength(d).split(" ").map((e2) => h.fraction.auto.px.cssvar(e2) ?? e2).join(" ") };
    if ((isSize(d) || bgPositionRE.test(d)) && h.bracketOfPosition(d) != null)
      return { "background-position": h.bracketOfPosition(d).split(" ").map((e2) => h.position.fraction.auto.px.cssvar(e2) ?? e2).join(" ") };
    if (bgGradientRE.test(d))
      return { "background-image": h.bracket(d) };
    return colorResolver("background-color", "bg", "backgroundColor")(...args);
  }, { autocomplete: "bg-$colors" }],
  [/^bg-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-bg-opacity": h.bracket.percent.cssvar(opacity2) }), { autocomplete: "bg-(op|opacity)-<percent>" }]
];
var colorScheme = [
  [/^color-scheme-(\w+)$/, ([, v]) => ({ "color-scheme": v })]
];
var containerParent = [
  [/^@container(?:\/(\w+))?(?:-(normal))?$/, ([, l, v]) => {
    warnOnce("The container query rule is experimental and may not follow semver.");
    return {
      "container-type": v ?? "inline-size",
      "container-name": l
    };
  }]
];
var decorationStyles = ["solid", "double", "dotted", "dashed", "wavy", ...globalKeywords];
var textDecorations = [
  [/^(?:decoration-)?(underline|overline|line-through)$/, ([, s]) => ({ "text-decoration-line": s }), { autocomplete: "decoration-(underline|overline|line-through)" }],
  [/^(?:underline|decoration)-(?:size-)?(.+)$/, handleWidth$1, { autocomplete: "(underline|decoration)-<num>" }],
  [/^(?:underline|decoration)-(auto|from-font)$/, ([, s]) => ({ "text-decoration-thickness": s }), { autocomplete: "(underline|decoration)-(auto|from-font)" }],
  [/^(?:underline|decoration)-(.+)$/, handleColorOrWidth$1, { autocomplete: "(underline|decoration)-$colors" }],
  [/^(?:underline|decoration)-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-line-opacity": h.bracket.percent.cssvar(opacity2) }), { autocomplete: "(underline|decoration)-(op|opacity)-<percent>" }],
  [/^(?:underline|decoration)-offset-(.+)$/, ([, s], { theme: theme2 }) => ({ "text-underline-offset": theme2.lineWidth?.[s] ?? h.auto.bracket.cssvar.global.px(s) }), { autocomplete: "(underline|decoration)-(offset)-<num>" }],
  ...decorationStyles.map((v) => [`underline-${v}`, { "text-decoration-style": v }]),
  ...decorationStyles.map((v) => [`decoration-${v}`, { "text-decoration-style": v }]),
  ["no-underline", { "text-decoration": "none" }],
  ["decoration-none", { "text-decoration": "none" }]
];
var transitionPropertyGroup = {
  all: "all",
  colors: ["color", "background-color", "border-color", "outline-color", "text-decoration-color", "fill", "stroke"].join(","),
  none: "none",
  opacity: "opacity",
  shadow: "box-shadow",
  transform: "transform"
};
var transitions = [
  [
    /^transition(?:-([a-z-]+(?:,[a-z-]+)*))?(?:-(\d+))?$/,
    ([, prop, d], { theme: theme2 }) => {
      const p = prop != null ? transitionProperty(prop) : [transitionPropertyGroup.colors, "opacity", "box-shadow", "transform", "filter", "backdrop-filter"].join(",");
      if (p) {
        const duration2 = theme2.duration?.[d || "DEFAULT"] ?? h.time(d || "150");
        return {
          "transition-property": p,
          "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
          "transition-duration": duration2
        };
      }
    },
    { autocomplete: `transition-(${Object.keys(transitionPropertyGroup).join("|")})` }
  ],
  [
    /^(?:transition-)?duration-(.+)$/,
    ([, d], { theme: theme2 }) => ({ "transition-duration": theme2.duration?.[d || "DEFAULT"] ?? h.bracket.cssvar.time(d) }),
    { autocomplete: ["transition-duration-$duration", "duration-$duration"] }
  ],
  [
    /^(?:transition-)?delay-(.+)$/,
    ([, d], { theme: theme2 }) => ({ "transition-delay": theme2.duration?.[d || "DEFAULT"] ?? h.bracket.cssvar.time(d) }),
    { autocomplete: ["transition-delay-$duration", "delay-$duration"] }
  ],
  [
    /^(?:transition-)?ease(?:-(.+))?$/,
    ([, d], { theme: theme2 }) => ({ "transition-timing-function": theme2.easing?.[d || "DEFAULT"] ?? h.bracket.cssvar(d) }),
    { autocomplete: ["transition-ease-(linear|in|out|in-out|DEFAULT)", "ease-(linear|in|out|in-out|DEFAULT)"] }
  ],
  [
    /^(?:transition-)?property-(.+)$/,
    ([, v]) => ({ "transition-property": h.bracket.global(v) || transitionProperty(v) }),
    { autocomplete: [`transition-property-(${[...globalKeywords, ...Object.keys(transitionPropertyGroup)].join("|")})`] }
  ],
  ["transition-none", { transition: "none" }],
  ...makeGlobalStaticRules("transition")
];
var flex = [
  ["flex", { display: "flex" }],
  ["inline-flex", { display: "inline-flex" }],
  ["flex-inline", { display: "inline-flex" }],
  [/^flex-(.*)$/, ([, d]) => ({ flex: h.bracket(d) != null ? h.bracket(d).split(" ").map((e2) => h.cssvar.fraction(e2) ?? e2).join(" ") : h.cssvar.fraction(d) })],
  ["flex-1", { flex: "1 1 0%" }],
  ["flex-auto", { flex: "1 1 auto" }],
  ["flex-initial", { flex: "0 1 auto" }],
  ["flex-none", { flex: "none" }],
  [/^(?:flex-)?shrink(?:-(.*))?$/, ([, d = ""]) => ({ "flex-shrink": h.bracket.cssvar.number(d) ?? 1 }), { autocomplete: ["flex-shrink-<num>", "shrink-<num>"] }],
  [/^(?:flex-)?grow(?:-(.*))?$/, ([, d = ""]) => ({ "flex-grow": h.bracket.cssvar.number(d) ?? 1 }), { autocomplete: ["flex-grow-<num>", "grow-<num>"] }],
  [/^(?:flex-)?basis-(.+)$/, ([, d], { theme: theme2 }) => ({ "flex-basis": theme2.spacing?.[d] ?? h.bracket.cssvar.auto.fraction.rem(d) }), { autocomplete: ["flex-basis-$spacing", "basis-$spacing"] }],
  ["flex-row", { "flex-direction": "row" }],
  ["flex-row-reverse", { "flex-direction": "row-reverse" }],
  ["flex-col", { "flex-direction": "column" }],
  ["flex-col-reverse", { "flex-direction": "column-reverse" }],
  ["flex-wrap", { "flex-wrap": "wrap" }],
  ["flex-wrap-reverse", { "flex-wrap": "wrap-reverse" }],
  ["flex-nowrap", { "flex-wrap": "nowrap" }]
];
var fonts = [
  [/^text-(.+)$/, handleText, { autocomplete: "text-$fontSize" }],
  [/^(?:text|font)-size-(.+)$/, handleSize, { autocomplete: "text-size-$fontSize" }],
  [/^text-(?:color-)?(.+)$/, handlerColorOrSize, { autocomplete: "text-$colors" }],
  [/^(?:color|c)-(.+)$/, colorResolver("color", "text", "textColor"), { autocomplete: "(color|c)-$colors" }],
  [/^(?:text|color|c)-(.+)$/, ([, v]) => globalKeywords.includes(v) ? { color: v } : undefined, { autocomplete: `(text|color|c)-(${globalKeywords.join("|")})` }],
  [/^(?:text|color|c)-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-text-opacity": h.bracket.percent.cssvar(opacity2) }), { autocomplete: "(text|color|c)-(op|opacity)-<percent>" }],
  [
    /^(?:font|fw)-?([^-]+)$/,
    ([, s], { theme: theme2 }) => ({ "font-weight": theme2.fontWeight?.[s] || h.bracket.global.number(s) }),
    {
      autocomplete: [
        "(font|fw)-(100|200|300|400|500|600|700|800|900)",
        "(font|fw)-$fontWeight"
      ]
    }
  ],
  [
    /^(?:font-)?(?:leading|lh|line-height)-(.+)$/,
    ([, s], { theme: theme2 }) => ({ "line-height": handleThemeByKey(s, theme2, "lineHeight") }),
    { autocomplete: "(leading|lh|line-height)-$lineHeight" }
  ],
  ["font-synthesis-weight", { "font-synthesis": "weight" }],
  ["font-synthesis-style", { "font-synthesis": "style" }],
  ["font-synthesis-small-caps", { "font-synthesis": "small-caps" }],
  ["font-synthesis-none", { "font-synthesis": "none" }],
  [/^font-synthesis-(.+)$/, ([, s]) => ({ "font-synthesis": h.bracket.cssvar.global(s) })],
  [
    /^(?:font-)?tracking-(.+)$/,
    ([, s], { theme: theme2 }) => ({ "letter-spacing": theme2.letterSpacing?.[s] || h.bracket.cssvar.global.rem(s) }),
    { autocomplete: "tracking-$letterSpacing" }
  ],
  [
    /^(?:font-)?word-spacing-(.+)$/,
    ([, s], { theme: theme2 }) => ({ "word-spacing": theme2.wordSpacing?.[s] || h.bracket.cssvar.global.rem(s) }),
    { autocomplete: "word-spacing-$wordSpacing" }
  ],
  ["font-stretch-normal", { "font-stretch": "normal" }],
  ["font-stretch-ultra-condensed", { "font-stretch": "ultra-condensed" }],
  ["font-stretch-extra-condensed", { "font-stretch": "extra-condensed" }],
  ["font-stretch-condensed", { "font-stretch": "condensed" }],
  ["font-stretch-semi-condensed", { "font-stretch": "semi-condensed" }],
  ["font-stretch-semi-expanded", { "font-stretch": "semi-expanded" }],
  ["font-stretch-expanded", { "font-stretch": "expanded" }],
  ["font-stretch-extra-expanded", { "font-stretch": "extra-expanded" }],
  ["font-stretch-ultra-expanded", { "font-stretch": "ultra-expanded" }],
  [
    /^font-stretch-(.+)$/,
    ([, s]) => ({ "font-stretch": h.bracket.cssvar.fraction.global(s) }),
    { autocomplete: "font-stretch-<percentage>" }
  ],
  [
    /^font-(.+)$/,
    ([, d], { theme: theme2 }) => ({ "font-family": theme2.fontFamily?.[d] || h.bracket.cssvar.global(d) }),
    { autocomplete: "font-$fontFamily" }
  ]
];
var tabSizes = [
  [/^tab(?:-(.+))?$/, ([, s]) => {
    const v = h.bracket.cssvar.global.number(s || "4");
    if (v != null) {
      return {
        "-moz-tab-size": v,
        "-o-tab-size": v,
        "tab-size": v
      };
    }
  }]
];
var textIndents = [
  [/^indent(?:-(.+))?$/, ([, s], { theme: theme2 }) => ({ "text-indent": theme2.textIndent?.[s || "DEFAULT"] || h.bracket.cssvar.global.fraction.rem(s) }), { autocomplete: "indent-$textIndent" }]
];
var textStrokes = [
  [/^text-stroke(?:-(.+))?$/, ([, s], { theme: theme2 }) => ({ "-webkit-text-stroke-width": theme2.textStrokeWidth?.[s || "DEFAULT"] || h.bracket.cssvar.px(s) }), { autocomplete: "text-stroke-$textStrokeWidth" }],
  [/^text-stroke-(.+)$/, colorResolver("-webkit-text-stroke-color", "text-stroke", "borderColor"), { autocomplete: "text-stroke-$colors" }],
  [/^text-stroke-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-text-stroke-opacity": h.bracket.percent.cssvar(opacity2) }), { autocomplete: "text-stroke-(op|opacity)-<percent>" }]
];
var textShadows = [
  [/^text-shadow(?:-(.+))?$/, ([, s], { theme: theme2 }) => {
    const v = theme2.textShadow?.[s || "DEFAULT"];
    if (v != null) {
      return {
        "--un-text-shadow": colorableShadows(v, "--un-text-shadow-color").join(","),
        "text-shadow": "var(--un-text-shadow)"
      };
    }
    return { "text-shadow": h.bracket.cssvar.global(s) };
  }, { autocomplete: "text-shadow-$textShadow" }],
  [/^text-shadow-color-(.+)$/, colorResolver("--un-text-shadow-color", "text-shadow", "shadowColor"), { autocomplete: "text-shadow-color-$colors" }],
  [/^text-shadow-color-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-text-shadow-opacity": h.bracket.percent.cssvar(opacity2) }), { autocomplete: "text-shadow-color-(op|opacity)-<percent>" }]
];
var directions = {
  "": "",
  x: "column-",
  y: "row-",
  col: "column-",
  row: "row-"
};
var gaps = [
  [/^(?:flex-|grid-)?gap-?()(.+)$/, handleGap, { autocomplete: ["gap-$spacing", "gap-<num>"] }],
  [/^(?:flex-|grid-)?gap-([xy])-?(.+)$/, handleGap, { autocomplete: ["gap-(x|y)-$spacing", "gap-(x|y)-<num>"] }],
  [/^(?:flex-|grid-)?gap-(col|row)-?(.+)$/, handleGap, { autocomplete: ["gap-(col|row)-$spacing", "gap-(col|row)-<num>"] }]
];
var grids = [
  ["grid", { display: "grid" }],
  ["inline-grid", { display: "inline-grid" }],
  [/^(?:grid-)?(row|col)-(.+)$/, ([, c, v], { theme: theme2 }) => ({
    [`grid-${rowCol(c)}`]: theme2[`grid${rowColTheme(c)}`]?.[v] ?? h.bracket.cssvar.auto(v)
  })],
  [/^(?:grid-)?(row|col)-span-(.+)$/, ([, c, s]) => {
    if (s === "full")
      return { [`grid-${rowCol(c)}`]: "1/-1" };
    const v = h.bracket.number(s);
    if (v != null)
      return { [`grid-${rowCol(c)}`]: `span ${v}/span ${v}` };
  }, { autocomplete: "(grid-row|grid-col|row|col)-span-<num>" }],
  [/^(?:grid-)?(row|col)-start-(.+)$/, ([, c, v]) => ({ [`grid-${rowCol(c)}-start`]: h.bracket.cssvar(v) ?? v })],
  [/^(?:grid-)?(row|col)-end-(.+)$/, ([, c, v]) => ({ [`grid-${rowCol(c)}-end`]: h.bracket.cssvar(v) ?? v }), { autocomplete: "(grid-row|grid-col|row|col)-(start|end)-<num>" }],
  [/^(?:grid-)?auto-(rows|cols)-(.+)$/, ([, c, v], { theme: theme2 }) => ({ [`grid-auto-${rowCol(c)}`]: autoDirection(c, theme2, v) }), { autocomplete: "(grid-auto|auto)-(rows|cols)-<num>" }],
  [/^(?:grid-auto-flow|auto-flow|grid-flow)-(.+)$/, ([, v]) => ({ "grid-auto-flow": h.bracket.cssvar(v) })],
  [/^(?:grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)$/, ([, v]) => ({ "grid-auto-flow": rowCol(v).replace("-", " ") }), { autocomplete: ["(grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)"] }],
  [/^(?:grid-)?(rows|cols)-(.+)$/, ([, c, v], { theme: theme2 }) => ({
    [`grid-template-${rowCol(c)}`]: theme2[`gridTemplate${rowColTheme(c)}`]?.[v] ?? h.bracket.cssvar(v)
  })],
  [/^(?:grid-)?(rows|cols)-minmax-([\w.-]+)$/, ([, c, d]) => ({ [`grid-template-${rowCol(c)}`]: `repeat(auto-fill,minmax(${d},1fr))` })],
  [/^(?:grid-)?(rows|cols)-(\d+)$/, ([, c, d]) => ({ [`grid-template-${rowCol(c)}`]: `repeat(${d},minmax(0,1fr))` }), { autocomplete: "(grid-rows|grid-cols|rows|cols)-<num>" }],
  [/^grid-area(s)?-(.+)$/, ([, s, v]) => {
    if (s != null)
      return { "grid-template-areas": h.cssvar(v) ?? v.split("-").map((s2) => `"${h.bracket(s2)}"`).join(" ") };
    return { "grid-area": h.bracket.cssvar(v) };
  }],
  ["grid-rows-none", { "grid-template-rows": "none" }],
  ["grid-cols-none", { "grid-template-columns": "none" }],
  ["grid-rows-subgrid", { "grid-template-rows": "subgrid" }],
  ["grid-cols-subgrid", { "grid-template-columns": "subgrid" }]
];
var overflowValues = [
  "auto",
  "hidden",
  "clip",
  "visible",
  "scroll",
  "overlay",
  ...globalKeywords
];
var overflows = [
  [/^(?:overflow|of)-(.+)$/, ([, v]) => overflowValues.includes(v) ? { overflow: v } : undefined, { autocomplete: [`(overflow|of)-(${overflowValues.join("|")})`, `(overflow|of)-(x|y)-(${overflowValues.join("|")})`] }],
  [/^(?:overflow|of)-([xy])-(.+)$/, ([, d, v]) => overflowValues.includes(v) ? { [`overflow-${d}`]: v } : undefined]
];
var positions = [
  [/^(?:position-|pos-)?(relative|absolute|fixed|sticky)$/, ([, v]) => ({ position: v }), {
    autocomplete: [
      "(position|pos)-<position>",
      "(position|pos)-<globalKeyword>",
      "<position>"
    ]
  }],
  [/^(?:position-|pos-)([-\w]+)$/, ([, v]) => globalKeywords.includes(v) ? { position: v } : undefined],
  [/^(?:position-|pos-)?(static)$/, ([, v]) => ({ position: v })]
];
var justifies = [
  ["justify-start", { "justify-content": "flex-start" }],
  ["justify-end", { "justify-content": "flex-end" }],
  ["justify-center", { "justify-content": "center" }],
  ["justify-between", { "justify-content": "space-between" }],
  ["justify-around", { "justify-content": "space-around" }],
  ["justify-evenly", { "justify-content": "space-evenly" }],
  ["justify-stretch", { "justify-content": "stretch" }],
  ["justify-left", { "justify-content": "left" }],
  ["justify-right", { "justify-content": "right" }],
  ...makeGlobalStaticRules("justify", "justify-content"),
  ["justify-items-start", { "justify-items": "start" }],
  ["justify-items-end", { "justify-items": "end" }],
  ["justify-items-center", { "justify-items": "center" }],
  ["justify-items-stretch", { "justify-items": "stretch" }],
  ...makeGlobalStaticRules("justify-items"),
  ["justify-self-auto", { "justify-self": "auto" }],
  ["justify-self-start", { "justify-self": "start" }],
  ["justify-self-end", { "justify-self": "end" }],
  ["justify-self-center", { "justify-self": "center" }],
  ["justify-self-stretch", { "justify-self": "stretch" }],
  ...makeGlobalStaticRules("justify-self")
];
var orders = [
  [/^order-(.+)$/, ([, v]) => ({ order: h.bracket.cssvar.number(v) })],
  ["order-first", { order: "-9999" }],
  ["order-last", { order: "9999" }],
  ["order-none", { order: "0" }]
];
var alignments = [
  ["content-center", { "align-content": "center" }],
  ["content-start", { "align-content": "flex-start" }],
  ["content-end", { "align-content": "flex-end" }],
  ["content-between", { "align-content": "space-between" }],
  ["content-around", { "align-content": "space-around" }],
  ["content-evenly", { "align-content": "space-evenly" }],
  ...makeGlobalStaticRules("content", "align-content"),
  ["items-start", { "align-items": "flex-start" }],
  ["items-end", { "align-items": "flex-end" }],
  ["items-center", { "align-items": "center" }],
  ["items-baseline", { "align-items": "baseline" }],
  ["items-stretch", { "align-items": "stretch" }],
  ...makeGlobalStaticRules("items", "align-items"),
  ["self-auto", { "align-self": "auto" }],
  ["self-start", { "align-self": "flex-start" }],
  ["self-end", { "align-self": "flex-end" }],
  ["self-center", { "align-self": "center" }],
  ["self-stretch", { "align-self": "stretch" }],
  ["self-baseline", { "align-self": "baseline" }],
  ...makeGlobalStaticRules("self", "align-self")
];
var placements = [
  ["place-content-center", { "place-content": "center" }],
  ["place-content-start", { "place-content": "start" }],
  ["place-content-end", { "place-content": "end" }],
  ["place-content-between", { "place-content": "space-between" }],
  ["place-content-around", { "place-content": "space-around" }],
  ["place-content-evenly", { "place-content": "space-evenly" }],
  ["place-content-stretch", { "place-content": "stretch" }],
  ...makeGlobalStaticRules("place-content"),
  ["place-items-start", { "place-items": "start" }],
  ["place-items-end", { "place-items": "end" }],
  ["place-items-center", { "place-items": "center" }],
  ["place-items-stretch", { "place-items": "stretch" }],
  ...makeGlobalStaticRules("place-items"),
  ["place-self-auto", { "place-self": "auto" }],
  ["place-self-start", { "place-self": "start" }],
  ["place-self-end", { "place-self": "end" }],
  ["place-self-center", { "place-self": "center" }],
  ["place-self-stretch", { "place-self": "stretch" }],
  ...makeGlobalStaticRules("place-self")
];
var flexGridJustifiesAlignments = [...justifies, ...alignments, ...placements].flatMap(([k, v]) => [
  [`flex-${k}`, v],
  [`grid-${k}`, v]
]);
var insets = [
  [
    /^(?:position-|pos-)?inset-(.+)$/,
    ([, v], ctx) => ({ inset: handleInsetValue(v, ctx) }),
    {
      autocomplete: [
        "(position|pos)-inset-<directions>-$spacing",
        "(position|pos)-inset-(block|inline)-$spacing",
        "(position|pos)-inset-(bs|be|is|ie)-$spacing",
        "(position|pos)-(top|left|right|bottom)-$spacing"
      ]
    }
  ],
  [/^(?:position-|pos-)?(start|end)-(.+)$/, handleInsetValues],
  [/^(?:position-|pos-)?inset-([xy])-(.+)$/, handleInsetValues],
  [/^(?:position-|pos-)?inset-([rltbse])-(.+)$/, handleInsetValues],
  [/^(?:position-|pos-)?inset-(block|inline)-(.+)$/, handleInsetValues],
  [/^(?:position-|pos-)?inset-([bi][se])-(.+)$/, handleInsetValues],
  [/^(?:position-|pos-)?(top|left|right|bottom)-(.+)$/, ([, d, v], ctx) => ({ [d]: handleInsetValue(v, ctx) })]
];
var floats = [
  ["float-left", { float: "left" }],
  ["float-right", { float: "right" }],
  ["float-none", { float: "none" }],
  ...makeGlobalStaticRules("float"),
  ["clear-left", { clear: "left" }],
  ["clear-right", { clear: "right" }],
  ["clear-both", { clear: "both" }],
  ["clear-none", { clear: "none" }],
  ...makeGlobalStaticRules("clear")
];
var zIndexes = [
  [/^(?:position-|pos-)?z([\d.]+)$/, ([, v]) => ({ "z-index": h.number(v) })],
  [/^(?:position-|pos-)?z-(.+)$/, ([, v], { theme: theme2 }) => ({ "z-index": theme2.zIndex?.[v] ?? h.bracket.cssvar.global.auto.number(v) }), { autocomplete: "z-<num>" }]
];
var boxSizing = [
  ["box-border", { "box-sizing": "border-box" }],
  ["box-content", { "box-sizing": "content-box" }],
  ...makeGlobalStaticRules("box", "box-sizing")
];
var sizeMapping = {
  h: "height",
  w: "width",
  inline: "inline-size",
  block: "block-size"
};
var sizes = [
  [/^size-(min-|max-)?(.+)$/, ([, m, s], { theme: theme2 }) => ({ [getPropName(m, "w")]: getSizeValue(m, "w", theme2, s), [getPropName(m, "h")]: getSizeValue(m, "h", theme2, s) })],
  [/^(?:size-)?(min-|max-)?([wh])-?(.+)$/, ([, m, w, s], { theme: theme2 }) => ({ [getPropName(m, w)]: getSizeValue(m, w, theme2, s) })],
  [/^(?:size-)?(min-|max-)?(block|inline)-(.+)$/, ([, m, w, s], { theme: theme2 }) => ({ [getPropName(m, w)]: getSizeValue(m, w, theme2, s) }), {
    autocomplete: [
      "(w|h)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize",
      "(block|inline)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize",
      "(max|min)-(w|h|block|inline)",
      "(max|min)-(w|h|block|inline)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize",
      "(w|h)-full",
      "(max|min)-(w|h)-full"
    ]
  }],
  [/^(?:size-)?(min-|max-)?(h)-screen-(.+)$/, ([, m, h2, p], context) => ({ [getPropName(m, h2)]: handleBreakpoint(context, p, "verticalBreakpoints") })],
  [/^(?:size-)?(min-|max-)?(w)-screen-(.+)$/, ([, m, w, p], context) => ({ [getPropName(m, w)]: handleBreakpoint(context, p) }), {
    autocomplete: [
      "(w|h)-screen",
      "(min|max)-(w|h)-screen",
      "h-screen-$verticalBreakpoints",
      "(min|max)-h-screen-$verticalBreakpoints",
      "w-screen-$breakpoints",
      "(min|max)-w-screen-$breakpoints"
    ]
  }]
];
var aspectRatio = [
  [/^(?:size-)?aspect-(?:ratio-)?(.+)$/, ([, d]) => ({ "aspect-ratio": getAspectRatio(d) }), { autocomplete: ["aspect-(square|video|ratio)", "aspect-ratio-(square|video)"] }]
];
var paddings = [
  [/^pa?()-?(-?.+)$/, directionSize("padding"), { autocomplete: ["(m|p)<num>", "(m|p)-<num>"] }],
  [/^p-?xy()()$/, directionSize("padding"), { autocomplete: "(m|p)-(xy)" }],
  [/^p-?([xy])(?:-?(-?.+))?$/, directionSize("padding")],
  [/^p-?([rltbse])(?:-?(-?.+))?$/, directionSize("padding"), { autocomplete: "(m|p)<directions>-<num>" }],
  [/^p-(block|inline)(?:-(-?.+))?$/, directionSize("padding"), { autocomplete: "(m|p)-(block|inline)-<num>" }],
  [/^p-?([bi][se])(?:-?(-?.+))?$/, directionSize("padding"), { autocomplete: "(m|p)-(bs|be|is|ie)-<num>" }]
];
var margins = [
  [/^ma?()-?(-?.+)$/, directionSize("margin")],
  [/^m-?xy()()$/, directionSize("margin")],
  [/^m-?([xy])(?:-?(-?.+))?$/, directionSize("margin")],
  [/^m-?([rltbse])(?:-?(-?.+))?$/, directionSize("margin")],
  [/^m-(block|inline)(?:-(-?.+))?$/, directionSize("margin")],
  [/^m-?([bi][se])(?:-?(-?.+))?$/, directionSize("margin")]
];
var variablesAbbrMap = {
  backface: "backface-visibility",
  break: "word-break",
  case: "text-transform",
  content: "align-content",
  fw: "font-weight",
  items: "align-items",
  justify: "justify-content",
  select: "user-select",
  self: "align-self",
  vertical: "vertical-align",
  visible: "visibility",
  whitespace: "white-space",
  ws: "white-space"
};
var cssVariables = [
  [/^(.+?)-(\$.+)$/, ([, name, varname]) => {
    const prop = variablesAbbrMap[name];
    if (prop)
      return { [prop]: h.cssvar(varname) };
  }]
];
var cssProperty = [
  [/^\[(.*)\]$/, ([_, body]) => {
    if (!body.includes(":"))
      return;
    const [prop, ...rest] = body.split(":");
    const value = rest.join(":");
    if (!isURI(body) && /^[a-z-]+$/.test(prop) && isValidCSSBody(value)) {
      const parsed = h.bracket(`[${value}]`);
      if (parsed)
        return { [prop]: parsed };
    }
  }]
];
var questionMark = [
  [
    /^(where|\?)$/,
    (_, { constructCSS, generator }) => {
      if (generator.userConfig.envMode === "dev")
        return `@keyframes __un_qm{0%{box-shadow:inset 4px 4px #ff1e90, inset -4px -4px #ff1e90}100%{box-shadow:inset 8px 8px #3399ff, inset -8px -8px #3399ff}}
${constructCSS({ animation: "__un_qm 0.5s ease-in-out alternate infinite" })}`;
    }
  ]
];
var svgUtilities = [
  [/^fill-(.+)$/, colorResolver("fill", "fill", "backgroundColor"), { autocomplete: "fill-$colors" }],
  [/^fill-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-fill-opacity": h.bracket.percent.cssvar(opacity2) }), { autocomplete: "fill-(op|opacity)-<percent>" }],
  ["fill-none", { fill: "none" }],
  [/^stroke-(?:width-|size-)?(.+)$/, handleWidth2, { autocomplete: ["stroke-width-$lineWidth", "stroke-size-$lineWidth"] }],
  [/^stroke-dash-(.+)$/, ([, s]) => ({ "stroke-dasharray": h.bracket.cssvar.number(s) }), { autocomplete: "stroke-dash-<num>" }],
  [/^stroke-offset-(.+)$/, ([, s], { theme: theme2 }) => ({ "stroke-dashoffset": theme2.lineWidth?.[s] ?? h.bracket.cssvar.px.numberWithUnit(s) }), { autocomplete: "stroke-offset-$lineWidth" }],
  [/^stroke-(.+)$/, handleColorOrWidth2, { autocomplete: "stroke-$colors" }],
  [/^stroke-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-stroke-opacity": h.bracket.percent.cssvar(opacity2) }), { autocomplete: "stroke-(op|opacity)-<percent>" }],
  ["stroke-cap-square", { "stroke-linecap": "square" }],
  ["stroke-cap-round", { "stroke-linecap": "round" }],
  ["stroke-cap-auto", { "stroke-linecap": "butt" }],
  ["stroke-join-arcs", { "stroke-linejoin": "arcs" }],
  ["stroke-join-bevel", { "stroke-linejoin": "bevel" }],
  ["stroke-join-clip", { "stroke-linejoin": "miter-clip" }],
  ["stroke-join-round", { "stroke-linejoin": "round" }],
  ["stroke-join-auto", { "stroke-linejoin": "miter" }],
  ["stroke-none", { stroke: "none" }]
];
var rules = [
  cssVariables,
  cssProperty,
  paddings,
  margins,
  displays,
  opacity,
  bgColors,
  colorScheme,
  svgUtilities,
  borders,
  contentVisibility,
  contents,
  fonts,
  tabSizes,
  textIndents,
  textOverflows,
  textDecorations,
  textStrokes,
  textShadows,
  textTransforms,
  textAligns,
  fontStyles,
  fontSmoothings,
  boxShadows,
  rings,
  flex,
  grids,
  gaps,
  positions,
  sizes,
  aspectRatio,
  cursors,
  appearances,
  pointerEvents,
  resizes,
  verticalAligns,
  userSelects,
  whitespaces,
  breaks,
  overflows,
  outline,
  appearance,
  orders,
  justifies,
  alignments,
  placements,
  flexGridJustifiesAlignments,
  insets,
  floats,
  zIndexes,
  boxSizing,
  transitions,
  transforms,
  willChange,
  containerParent,
  contains,
  textWraps,
  questionMark
].flat(1);

// node_modules/@unocss/preset-mini/dist/shared/preset-mini.Cn7UNwSE.mjs
var calcMaxWidthBySize = function(size) {
  const value = size.match(/^-?[0-9]+\.?[0-9]*/)?.[0] || "";
  const unit = size.slice(value.length);
  if (unit === "px") {
    const maxWidth2 = Number.parseFloat(value) - 0.1;
    return Number.isNaN(maxWidth2) ? size : `${maxWidth2}${unit}`;
  }
  return `calc(${size} - 0.1px)`;
};
var variantBreakpoints = function() {
  const regexCache2 = {};
  return {
    name: "breakpoints",
    match(matcher, context) {
      const variantEntries = (resolveBreakpoints(context) ?? []).map(({ point, size }, idx) => [point, size, idx]);
      for (const [point, size, idx] of variantEntries) {
        if (!regexCache2[point])
          regexCache2[point] = new RegExp(`^((?:([al]t-|[<~]|max-))?${point}(?:${context.generator.config.separators.join("|")}))`);
        const match = matcher.match(regexCache2[point]);
        if (!match)
          continue;
        const [, pre] = match;
        const m = matcher.slice(pre.length);
        if (m === "container")
          continue;
        const isLtPrefix = pre.startsWith("lt-") || pre.startsWith("<") || pre.startsWith("max-");
        const isAtPrefix = pre.startsWith("at-") || pre.startsWith("~");
        let order = 3000;
        if (isLtPrefix) {
          order -= idx + 1;
          return {
            matcher: m,
            handle: (input, next) => next({
              ...input,
              parent: `${input.parent ? `${input.parent} \$\$ ` : ""}@media (max-width: ${calcMaxWidthBySize(size)})`,
              parentOrder: order
            })
          };
        }
        order += idx + 1;
        if (isAtPrefix && idx < variantEntries.length - 1) {
          return {
            matcher: m,
            handle: (input, next) => next({
              ...input,
              parent: `${input.parent ? `${input.parent} \$\$ ` : ""}@media (min-width: ${size}) and (max-width: ${calcMaxWidthBySize(variantEntries[idx + 1][1])})`,
              parentOrder: order
            })
          };
        }
        return {
          matcher: m,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} \$\$ ` : ""}@media (min-width: ${size})`,
            parentOrder: order
          })
        };
      }
    },
    multiPass: true,
    autocomplete: "(at-|lt-|max-|)$breakpoints:"
  };
};
var scopeMatcher = function(name, combinator) {
  return {
    name: `combinator:${name}`,
    match(matcher, ctx) {
      if (!matcher.startsWith(name))
        return;
      const separators = ctx.generator.config.separators;
      let body = variantGetBracket(`${name}-`, matcher, separators);
      if (!body) {
        for (const separator of separators) {
          if (matcher.startsWith(`${name}${separator}`)) {
            body = ["", matcher.slice(name.length + separator.length)];
            break;
          }
        }
        if (!body)
          return;
      }
      let bracketValue = h.bracket(body[0]) ?? "";
      if (bracketValue === "")
        bracketValue = "*";
      return {
        matcher: body[1],
        selector: (s) => `${s}${combinator}${bracketValue}`
      };
    },
    multiPass: true
  };
};
var variantColorsMediaOrClass = function(options = {}) {
  if (options?.dark === "class" || typeof options.dark === "object") {
    const { dark = ".dark", light = ".light" } = typeof options.dark === "string" ? {} : options.dark;
    return [
      variantMatcher("dark", (input) => ({ prefix: `${dark} \$\$ ${input.prefix}` })),
      variantMatcher("light", (input) => ({ prefix: `${light} \$\$ ${input.prefix}` }))
    ];
  }
  return [
    variantParentMatcher("dark", "@media (prefers-color-scheme: dark)"),
    variantParentMatcher("light", "@media (prefers-color-scheme: light)")
  ];
};
var taggedData = function(tagName) {
  return {
    name: `${tagName}-data`,
    match(matcher, ctx) {
      const variant = variantGetParameter(`${tagName}-data-`, matcher, ctx.generator.config.separators);
      if (variant) {
        const [match, rest] = variant;
        const dataAttribute = h.bracket(match) ?? ctx.theme.data?.[match] ?? "";
        if (dataAttribute) {
          return {
            matcher: `${tagName}-[[data-${dataAttribute}]]:${rest}`
          };
        }
      }
    }
  };
};
var negateMathFunction = function(value) {
  const match = value.match(cssMathFnRE);
  if (match) {
    const [fnBody, rest] = getStringComponent(`(${match[2]})${match[3]}`, "(", ")", " ") ?? [];
    if (fnBody)
      return `calc(${match[1]}${fnBody} * -1)${rest ? ` ${rest}` : ""}`;
  }
};
var negateFunctionBody = function(value) {
  const match = value.match(negateFunctionBodyRE);
  if (match) {
    const [fnBody, rest] = getStringComponent(match[2], "(", ")", " ") ?? [];
    if (fnBody) {
      const body = anchoredNumberRE.test(fnBody.slice(1, -1)) ? fnBody.replace(numberRE2, (i) => i.startsWith("-") ? i.slice(1) : `-${i}`) : `(calc(${fnBody} * -1))`;
      return `${match[1]}${body}${rest ? ` ${rest}` : ""}`;
    }
  }
};
var variantImportant = function() {
  let re;
  return {
    name: "important",
    match(matcher, ctx) {
      if (!re)
        re = new RegExp(`^(important(?:${ctx.generator.config.separators.join("|")})|!)`);
      let base;
      const match = matcher.match(re);
      if (match)
        base = matcher.slice(match[0].length);
      else if (matcher.endsWith("!"))
        base = matcher.slice(0, -1);
      if (base) {
        return {
          matcher: base,
          body: (body) => {
            body.forEach((v) => {
              if (v[1])
                v[1] += " !important";
            });
            return body;
          }
        };
      }
    }
  };
};
var taggedPseudoClassMatcher = function(tag, parent, combinator) {
  const rawRE = new RegExp(`^(${escapeRegExp(parent)}:)(\\S+)${escapeRegExp(combinator)}\\1`);
  let splitRE;
  let pseudoRE;
  let pseudoColonRE;
  let pseudoVarRE;
  const matchBracket = (input) => {
    const body = variantGetBracket(`${tag}-`, input, []);
    if (!body)
      return;
    const [match, rest] = body;
    const bracketValue = h.bracket(match);
    if (bracketValue == null)
      return;
    const label = rest.split(splitRE, 1)?.[0] ?? "";
    const prefix = `${parent}${escapeSelector(label)}`;
    return [
      label,
      input.slice(input.length - (rest.length - label.length - 1)),
      bracketValue.includes("&") ? bracketValue.replace(/&/g, prefix) : `${prefix}${bracketValue}`
    ];
  };
  const matchPseudo = (input) => {
    const match = input.match(pseudoRE) || input.match(pseudoColonRE);
    if (!match)
      return;
    const [original, fn, pseudoKey] = match;
    const label = match[3] ?? "";
    let pseudo = PseudoClasses[pseudoKey] || PseudoClassesColon[pseudoKey] || `:${pseudoKey}`;
    if (fn)
      pseudo = `:${fn}(${pseudo})`;
    return [
      label,
      input.slice(original.length),
      `${parent}${escapeSelector(label)}${pseudo}`,
      pseudoKey
    ];
  };
  const matchPseudoVar = (input) => {
    const match = input.match(pseudoVarRE);
    if (!match)
      return;
    const [original, fn, pseudoValue] = match;
    const label = match[3] ?? "";
    const pseudo = `:${fn}(${pseudoValue})`;
    return [
      label,
      input.slice(original.length),
      `${parent}${escapeSelector(label)}${pseudo}`
    ];
  };
  return {
    name: `pseudo:${tag}`,
    match(input, ctx) {
      if (!(splitRE && pseudoRE && pseudoColonRE)) {
        splitRE = new RegExp(`(?:${ctx.generator.config.separators.join("|")})`);
        pseudoRE = new RegExp(`^${tag}-(?:(?:(${PseudoClassFunctionsStr})-)?(${PseudoClassesStr}))(?:(/\\w+))?(?:${ctx.generator.config.separators.join("|")})`);
        pseudoColonRE = new RegExp(`^${tag}-(?:(?:(${PseudoClassFunctionsStr})-)?(${PseudoClassesColonStr}))(?:(/\\w+))?(?:${ctx.generator.config.separators.filter((x) => x !== "-").join("|")})`);
        pseudoVarRE = new RegExp(`^${tag}-(?:(${PseudoClassFunctionsStr})-)?\\[(.+)\\](?:(/\\w+))?(?:${ctx.generator.config.separators.filter((x) => x !== "-").join("|")})`);
      }
      if (!input.startsWith(tag))
        return;
      const result = matchBracket(input) || matchPseudo(input) || matchPseudoVar(input);
      if (!result)
        return;
      const [label, matcher, prefix, pseudoName = ""] = result;
      if (label !== "")
        warnOnce("The labeled variant is experimental and may not follow semver.");
      return {
        matcher,
        handle: (input2, next) => next({
          ...input2,
          prefix: `${prefix}${combinator}${input2.prefix}`.replace(rawRE, "$1$2:"),
          sort: PseudoClassesKeys.indexOf(pseudoName) ?? PseudoClassesColonKeys.indexOf(pseudoName)
        })
      };
    },
    multiPass: true
  };
};
var variantPseudoClassesAndElements = function() {
  let PseudoClassesAndElementsRE;
  let PseudoClassesAndElementsColonRE;
  return {
    name: "pseudo",
    match(input, ctx) {
      if (!(PseudoClassesAndElementsRE && PseudoClassesAndElementsRE)) {
        PseudoClassesAndElementsRE = new RegExp(`^(${PseudoClassesAndElementsStr})(?:${ctx.generator.config.separators.join("|")})`);
        PseudoClassesAndElementsColonRE = new RegExp(`^(${PseudoClassesAndElementsColonStr})(?:${ctx.generator.config.separators.filter((x) => x !== "-").join("|")})`);
      }
      const match = input.match(PseudoClassesAndElementsRE) || input.match(PseudoClassesAndElementsColonRE);
      if (match) {
        const pseudo = PseudoClasses[match[1]] || PseudoClassesColon[match[1]] || `:${match[1]}`;
        let index = PseudoClassesKeys.indexOf(match[1]);
        if (index === -1)
          index = PseudoClassesColonKeys.indexOf(match[1]);
        if (index === -1)
          index = undefined;
        return {
          matcher: input.slice(match[0].length),
          handle: (input2, next) => {
            const selectors = pseudo.startsWith("::") && !excludedPseudo.includes(pseudo) ? {
              pseudo: `${input2.pseudo}${pseudo}`
            } : {
              selector: `${input2.selector}${pseudo}`
            };
            return next({
              ...input2,
              ...selectors,
              sort: index,
              noMerge: true
            });
          }
        };
      }
    },
    multiPass: true,
    autocomplete: `(${PseudoClassesAndElementsStr}|${PseudoClassesAndElementsColonStr}):`
  };
};
var variantPseudoClassFunctions = function() {
  let PseudoClassFunctionsRE;
  let PseudoClassColonFunctionsRE;
  let PseudoClassVarFunctionRE;
  return {
    match(input, ctx) {
      if (!(PseudoClassFunctionsRE && PseudoClassColonFunctionsRE)) {
        PseudoClassFunctionsRE = new RegExp(`^(${PseudoClassFunctionsStr})-(${PseudoClassesStr})(?:${ctx.generator.config.separators.join("|")})`);
        PseudoClassColonFunctionsRE = new RegExp(`^(${PseudoClassFunctionsStr})-(${PseudoClassesColonStr})(?:${ctx.generator.config.separators.filter((x) => x !== "-").join("|")})`);
        PseudoClassVarFunctionRE = new RegExp(`^(${PseudoClassFunctionsStr})-(\\[.+\\])(?:${ctx.generator.config.separators.filter((x) => x !== "-").join("|")})`);
      }
      const match = input.match(PseudoClassFunctionsRE) || input.match(PseudoClassColonFunctionsRE) || input.match(PseudoClassVarFunctionRE);
      if (match) {
        const fn = match[1];
        const fnVal = getBracket(match[2], "[", "]");
        const pseudo = fnVal ? h.bracket(match[2]) : PseudoClasses[match[2]] || PseudoClassesColon[match[2]] || `:${match[2]}`;
        return {
          matcher: input.slice(match[0].length),
          selector: (s) => `${s}:${fn}(${pseudo})`
        };
      }
    },
    multiPass: true,
    autocomplete: `(${PseudoClassFunctionsStr})-(${PseudoClassesStr}|${PseudoClassesColonStr}):`
  };
};
var variantTaggedPseudoClasses = function(options = {}) {
  const attributify = !!options?.attributifyPseudo;
  let firstPrefix = options?.prefix ?? "";
  firstPrefix = (Array.isArray(firstPrefix) ? firstPrefix : [firstPrefix]).filter(Boolean)[0] ?? "";
  const tagWithPrefix = (tag, combinator) => taggedPseudoClassMatcher(tag, attributify ? `[${firstPrefix}${tag}=""]` : `.${firstPrefix}${tag}`, combinator);
  return [
    tagWithPrefix("group", " "),
    tagWithPrefix("peer", "~"),
    tagWithPrefix("parent", ">"),
    tagWithPrefix("previous", "+")
  ];
};
var variants = function(options) {
  return [
    variantAria,
    variantDataAttribute,
    variantCssLayer,
    variantSelector,
    variantInternalLayer,
    variantNegative,
    variantImportant(),
    variantSupports,
    variantPrint,
    variantCustomMedia,
    variantBreakpoints(),
    ...variantCombinators,
    variantPseudoClassesAndElements(),
    variantPseudoClassFunctions(),
    ...variantTaggedPseudoClasses(options),
    variantPartClasses,
    ...variantColorsMediaOrClass(options),
    ...variantLanguageDirections,
    variantScope,
    variantContainerQuery,
    variantVariables,
    ...variantTaggedDataAttributes,
    variantTheme
  ];
};
var variantAria = {
  name: "aria",
  match(matcher, ctx) {
    const variant = variantGetParameter("aria-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const aria = h.bracket(match) ?? ctx.theme.aria?.[match] ?? "";
      if (aria) {
        return {
          matcher: rest,
          selector: (s) => `${s}[aria-${aria}]`
        };
      }
    }
  }
};
var variantCombinators = [
  scopeMatcher("all", " "),
  scopeMatcher("children", ">"),
  scopeMatcher("next", "+"),
  scopeMatcher("sibling", "+"),
  scopeMatcher("siblings", "~")
];
var variantContainerQuery = {
  name: "@",
  match(matcher, ctx) {
    if (matcher.startsWith("@container"))
      return;
    const variant = variantGetParameter("@", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest, label] = variant;
      const unbracket = h.bracket(match);
      let container;
      if (unbracket) {
        const minWidth = h.numberWithUnit(unbracket);
        if (minWidth)
          container = `(min-width: ${minWidth})`;
      } else {
        container = ctx.theme.containers?.[match] ?? "";
      }
      if (container) {
        warnOnce("The container query variant is experimental and may not follow semver.");
        let order = 1000 + Object.keys(ctx.theme.containers ?? {}).indexOf(match);
        if (label)
          order += 1000;
        return {
          matcher: rest,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} \$\$ ` : ""}@container${label ? ` ${label} ` : " "}${container}`,
            parentOrder: order
          })
        };
      }
    }
  },
  multiPass: true
};
var variantDataAttribute = {
  name: "data",
  match(matcher, ctx) {
    const variant = variantGetParameter("data-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const dataAttribute = h.bracket(match) ?? ctx.theme.data?.[match] ?? "";
      if (dataAttribute) {
        return {
          matcher: rest,
          selector: (s) => `${s}[data-${dataAttribute}]`
        };
      }
    }
  }
};
var variantTaggedDataAttributes = [
  taggedData("group"),
  taggedData("peer"),
  taggedData("parent"),
  taggedData("previous")
];
var variantLanguageDirections = [
  variantMatcher("rtl", (input) => ({ prefix: `[dir="rtl"] \$\$ ${input.prefix}` })),
  variantMatcher("ltr", (input) => ({ prefix: `[dir="ltr"] \$\$ ${input.prefix}` }))
];
var variantSelector = {
  name: "selector",
  match(matcher, ctx) {
    const variant = variantGetBracket("selector-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const selector = h.bracket(match);
      if (selector) {
        return {
          matcher: rest,
          selector: () => selector
        };
      }
    }
  }
};
var variantCssLayer = {
  name: "layer",
  match(matcher, ctx) {
    const variant = variantGetParameter("layer-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const layer = h.bracket(match) ?? match;
      if (layer) {
        return {
          matcher: rest,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} \$\$ ` : ""}@layer ${layer}`
          })
        };
      }
    }
  }
};
var variantInternalLayer = {
  name: "uno-layer",
  match(matcher, ctx) {
    const variant = variantGetParameter("uno-layer-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const layer = h.bracket(match) ?? match;
      if (layer) {
        return {
          matcher: rest,
          layer
        };
      }
    }
  }
};
var variantScope = {
  name: "scope",
  match(matcher, ctx) {
    const variant = variantGetBracket("scope-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      const scope = h.bracket(match);
      if (scope) {
        return {
          matcher: rest,
          selector: (s) => `${scope} \$\$ ${s}`
        };
      }
    }
  }
};
var variantVariables = {
  name: "variables",
  match(matcher, ctx) {
    if (!matcher.startsWith("["))
      return;
    const [match, rest] = getBracket(matcher, "[", "]") ?? [];
    if (!(match && rest))
      return;
    let newMatcher;
    for (const separator of ctx.generator.config.separators) {
      if (rest.startsWith(separator)) {
        newMatcher = rest.slice(separator.length);
        break;
      }
    }
    if (newMatcher == null)
      return;
    const variant = h.bracket(match) ?? "";
    const useParent = variant.startsWith("@");
    if (!(useParent || variant.includes("&")))
      return;
    return {
      matcher: newMatcher,
      handle(input, next) {
        const updates = useParent ? {
          parent: `${input.parent ? `${input.parent} \$\$ ` : ""}${variant}`
        } : {
          selector: variant.replace(/&/g, input.selector)
        };
        return next({
          ...input,
          ...updates
        });
      }
    };
  },
  multiPass: true
};
var variantTheme = {
  name: "theme-variables",
  match(matcher, ctx) {
    if (!hasThemeFn(matcher))
      return;
    return {
      matcher,
      handle(input, next) {
        return next({
          ...input,
          entries: JSON.parse(transformThemeFn(JSON.stringify(input.entries), ctx.theme))
        });
      }
    };
  }
};
var anchoredNumberRE = /^-?[0-9.]+(?:[a-z]+|%)?$/;
var numberRE2 = /-?[0-9.]+(?:[a-z]+|%)?/;
var ignoreProps = [
  /\b(opacity|color|flex|backdrop-filter|^filter|transform)\b/
];
var negateFunctionBodyRE = /\b(hue-rotate)\s*(\(.*)/;
var variantNegative = {
  name: "negative",
  match(matcher) {
    if (!matcher.startsWith("-"))
      return;
    return {
      matcher: matcher.slice(1),
      body: (body) => {
        if (body.find((v) => v[0] === CONTROL_MINI_NO_NEGATIVE))
          return;
        let changed = false;
        body.forEach((v) => {
          const value = v[1]?.toString();
          if (!value || value === "0")
            return;
          if (ignoreProps.some((i) => i.test(v[0])))
            return;
          const negatedFn = negateMathFunction(value);
          if (negatedFn) {
            v[1] = negatedFn;
            changed = true;
            return;
          }
          const negatedBody = negateFunctionBody(value);
          if (negatedBody) {
            v[1] = negatedBody;
            changed = true;
            return;
          }
          if (anchoredNumberRE.test(value)) {
            v[1] = value.replace(numberRE2, (i) => i.startsWith("-") ? i.slice(1) : `-${i}`);
            changed = true;
          }
        });
        if (changed)
          return body;
        return [];
      }
    };
  }
};
var variantPrint = variantParentMatcher("print", "@media print");
var variantCustomMedia = {
  name: "media",
  match(matcher, ctx) {
    const variant = variantGetParameter("media-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      let media2 = h.bracket(match) ?? "";
      if (media2 === "")
        media2 = ctx.theme.media?.[match] ?? "";
      if (media2) {
        return {
          matcher: rest,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} \$\$ ` : ""}@media ${media2}`
          })
        };
      }
    }
  },
  multiPass: true
};
var variantSupports = {
  name: "supports",
  match(matcher, ctx) {
    const variant = variantGetParameter("supports-", matcher, ctx.generator.config.separators);
    if (variant) {
      const [match, rest] = variant;
      let supports = h.bracket(match) ?? "";
      if (supports === "")
        supports = ctx.theme.supports?.[match] ?? "";
      if (supports) {
        return {
          matcher: rest,
          handle: (input, next) => next({
            ...input,
            parent: `${input.parent ? `${input.parent} \$\$ ` : ""}@supports ${supports}`
          })
        };
      }
    }
  },
  multiPass: true
};
var PseudoClasses = Object.fromEntries([
  ["first-letter", "::first-letter"],
  ["first-line", "::first-line"],
  "any-link",
  "link",
  "visited",
  "target",
  ["open", "[open]"],
  "default",
  "checked",
  "indeterminate",
  "placeholder-shown",
  "autofill",
  "optional",
  "required",
  "valid",
  "invalid",
  "user-valid",
  "user-invalid",
  "in-range",
  "out-of-range",
  "read-only",
  "read-write",
  "empty",
  "focus-within",
  "hover",
  "focus",
  "focus-visible",
  "active",
  "enabled",
  "disabled",
  "popover-open",
  "root",
  "empty",
  ["even-of-type", ":nth-of-type(even)"],
  ["even", ":nth-child(even)"],
  ["odd-of-type", ":nth-of-type(odd)"],
  ["odd", ":nth-child(odd)"],
  "first-of-type",
  ["first", ":first-child"],
  "last-of-type",
  ["last", ":last-child"],
  "only-child",
  "only-of-type",
  ["backdrop-element", "::backdrop"],
  ["placeholder", "::placeholder"],
  ["before", "::before"],
  ["after", "::after"],
  ["selection", "::selection"],
  ["marker", "::marker"],
  ["file", "::file-selector-button"]
].map((key) => Array.isArray(key) ? key : [key, `:${key}`]));
var PseudoClassesKeys = Object.keys(PseudoClasses);
var PseudoClassesColon = Object.fromEntries([
  ["backdrop", "::backdrop"]
].map((key) => Array.isArray(key) ? key : [key, `:${key}`]));
var PseudoClassesColonKeys = Object.keys(PseudoClassesColon);
var PseudoClassFunctions = [
  "not",
  "is",
  "where",
  "has"
];
var PseudoClassesStr = Object.entries(PseudoClasses).filter(([, pseudo]) => !pseudo.startsWith("::")).map(([key]) => key).sort((a, b) => b.length - a.length).join("|");
var PseudoClassesColonStr = Object.entries(PseudoClassesColon).filter(([, pseudo]) => !pseudo.startsWith("::")).map(([key]) => key).sort((a, b) => b.length - a.length).join("|");
var PseudoClassFunctionsStr = PseudoClassFunctions.join("|");
var excludedPseudo = [
  "::-webkit-resizer",
  "::-webkit-scrollbar",
  "::-webkit-scrollbar-button",
  "::-webkit-scrollbar-corner",
  "::-webkit-scrollbar-thumb",
  "::-webkit-scrollbar-track",
  "::-webkit-scrollbar-track-piece",
  "::file-selector-button"
];
var PseudoClassesAndElementsStr = Object.entries(PseudoClasses).map(([key]) => key).sort((a, b) => b.length - a.length).join("|");
var PseudoClassesAndElementsColonStr = Object.entries(PseudoClassesColon).map(([key]) => key).sort((a, b) => b.length - a.length).join("|");
var PartClassesRE = /(part-\[(.+)]:)(.+)/;
var variantPartClasses = {
  match(input) {
    const match = input.match(PartClassesRE);
    if (match) {
      const part = `part(${match[2]})`;
      return {
        matcher: input.slice(match[1].length),
        selector: (s) => `${s}::${part}`
      };
    }
  },
  multiPass: true
};

// node_modules/@unocss/preset-mini/dist/index.mjs
var VarPrefixPostprocessor = function(prefix) {
  if (prefix !== "un-") {
    return (obj) => {
      obj.entries.forEach((i) => {
        i[0] = i[0].replace(/^--un-/, `--${prefix}`);
        if (typeof i[1] === "string")
          i[1] = i[1].replace(/var\(--un-/g, `var(--${prefix}`);
      });
    };
  }
};
var normalizePreflights = function(preflights3, variablePrefix) {
  if (variablePrefix !== "un-") {
    return preflights3.map((p) => ({
      ...p,
      getCSS: (() => async (ctx) => {
        const css = await p.getCSS(ctx);
        if (css)
          return css.replace(/--un-/g, `--${variablePrefix}`);
      })()
    }));
  }
  return preflights3;
};
var preflights = [
  {
    layer: "preflights",
    getCSS(ctx) {
      if (ctx.theme.preflightBase) {
        const css = entriesToCss(Object.entries(ctx.theme.preflightBase));
        const roots = toArray(ctx.theme.preflightRoot ?? ["*,::before,::after", "::backdrop"]);
        return roots.map((root) => `${root}{${css}}`).join("");
      }
    }
  }
];
var shorthands = {
  position: [
    "relative",
    "absolute",
    "fixed",
    "sticky",
    "static"
  ],
  globalKeyword: globalKeywords
};
var presetMini = definePreset((options = {}) => {
  options.dark = options.dark ?? "class";
  options.attributifyPseudo = options.attributifyPseudo ?? false;
  options.preflight = options.preflight ?? true;
  options.variablePrefix = options.variablePrefix ?? "un-";
  return {
    name: "@unocss/preset-mini",
    theme,
    rules,
    variants: variants(options),
    options,
    prefix: options.prefix,
    postprocess: VarPrefixPostprocessor(options.variablePrefix),
    preflights: options.preflight ? normalizePreflights(preflights, options.variablePrefix) : [],
    extractorDefault: options.arbitraryVariants === false ? undefined : extractorArbitraryVariants,
    autocomplete: {
      shorthands
    }
  };
});
// node_modules/@unocss/preset-wind/dist/index.mjs
var bgGradientToValue = function(cssColor) {
  if (cssColor)
    return colorToString(cssColor, 0);
  return "rgb(255 255 255 / 0)";
};
var bgGradientColorValue = function(mode, cssColor, color, alpha) {
  if (cssColor) {
    if (alpha != null)
      return colorToString(cssColor, alpha);
    else
      return colorToString(cssColor, `var(--un-${mode}-opacity, ${colorOpacityToString(cssColor)})`);
  }
  return colorToString(color, alpha);
};
var bgGradientColorResolver = function() {
  return ([, mode, body], { theme: theme3 }) => {
    const data = parseColor2(body, theme3, "backgroundColor");
    if (!data)
      return;
    const { alpha, color, cssColor } = data;
    if (!color)
      return;
    const colorString = bgGradientColorValue(mode, cssColor, color, alpha);
    switch (mode) {
      case "from":
        return {
          "--un-gradient-from-position": "0%",
          "--un-gradient-from": `${colorString} var(--un-gradient-from-position)`,
          "--un-gradient-to-position": "100%",
          "--un-gradient-to": `${bgGradientToValue(cssColor)} var(--un-gradient-to-position)`,
          "--un-gradient-stops": "var(--un-gradient-from), var(--un-gradient-to)"
        };
      case "via":
        return {
          "--un-gradient-via-position": "50%",
          "--un-gradient-to": bgGradientToValue(cssColor),
          "--un-gradient-stops": `var(--un-gradient-from), ${colorString} var(--un-gradient-via-position), var(--un-gradient-to)`
        };
      case "to":
        return {
          "--un-gradient-to-position": "100%",
          "--un-gradient-to": `${colorString} var(--un-gradient-to-position)`
        };
    }
  };
};
var bgGradientPositionResolver = function() {
  return ([, mode, body]) => {
    return {
      [`--un-gradient-${mode}-position`]: `${Number(h.bracket.cssvar.percent(body)) * 100}%`
    };
  };
};
var percentWithDefault = function(str) {
  let v = h.bracket.cssvar(str || "");
  if (v != null)
    return v;
  v = str ? h.percent(str) : "1";
  if (v != null && Number.parseFloat(v) <= 1)
    return v;
};
var toFilter = function(varName, resolver) {
  return ([, b, s], { theme: theme3 }) => {
    const value = resolver(s, theme3) ?? (s === "none" ? "0" : "");
    if (value !== "") {
      if (b) {
        return {
          [`--un-${b}${varName}`]: `${varName}(${value})`,
          "-webkit-backdrop-filter": backdropFilterProperty,
          "backdrop-filter": backdropFilterProperty
        };
      } else {
        return {
          [`--un-${varName}`]: `${varName}(${value})`,
          filter: filterProperty
        };
      }
    }
  };
};
var dropShadowResolver = function([, s], { theme: theme3 }) {
  let v = theme3.dropShadow?.[s || "DEFAULT"];
  if (v != null) {
    const shadows = colorableShadows(v, "--un-drop-shadow-color");
    return {
      "--un-drop-shadow": `drop-shadow(${shadows.join(") drop-shadow(")})`,
      filter: filterProperty
    };
  }
  v = h.bracket.cssvar(s);
  if (v != null) {
    return {
      "--un-drop-shadow": `drop-shadow(${v})`,
      filter: filterProperty
    };
  }
};
var handlerSpace = function([, d, s], { theme: theme3 }) {
  let v = theme3.spacing?.[s || "DEFAULT"] ?? h.bracket.cssvar.auto.fraction.rem(s || "1");
  if (v != null) {
    if (v === "0")
      v = "0px";
    const results = directionMap[d].map((item) => {
      const key = `margin${item}`;
      const value = item.endsWith("right") || item.endsWith("bottom") ? `calc(${v} * var(--un-space-${d}-reverse))` : `calc(${v} * calc(1 - var(--un-space-${d}-reverse)))`;
      return [key, value];
    });
    if (results) {
      return [
        [`--un-space-${d}-reverse`, 0],
        ...results
      ];
    }
  }
};
var handlerDivide = function([, d, s], { theme: theme3 }) {
  let v = theme3.lineWidth?.[s || "DEFAULT"] ?? h.bracket.cssvar.px(s || "1");
  if (v != null) {
    if (v === "0")
      v = "0px";
    const results = directionMap[d].map((item) => {
      const key = `border${item}-width`;
      const value = item.endsWith("right") || item.endsWith("bottom") ? `calc(${v} * var(--un-divide-${d}-reverse))` : `calc(${v} * calc(1 - var(--un-divide-${d}-reverse)))`;
      return [key, value];
    });
    if (results) {
      return [
        [`--un-divide-${d}-reverse`, 0],
        ...results
      ];
    }
  }
};
var toEntries = function(entry) {
  return {
    ...entry,
    "font-variant-numeric": "var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)"
  };
};
var hasOpacityValue = function(body) {
  const match = body.match(/^op(?:acity)?-?(.+)$/);
  if (match && match[1] != null)
    return h.bracket.percent(match[1]) != null;
  return false;
};
var variants3 = function(options) {
  return [
    placeholderModifier,
    variantSpaceAndDivide,
    ...variants(options),
    ...variantContrasts,
    ...variantOrientations,
    ...variantMotions,
    ...variantCombinators2,
    ...variantColorsScheme,
    ...variantStickyHover
  ];
};
var important = function(option) {
  if (option == null || option === false)
    return [];
  const wrapWithIs = (selector) => {
    if (selector.startsWith(":is(") && selector.endsWith(")"))
      return selector;
    if (selector.includes("::"))
      return selector.replace(/(.*)(::.*)/, ":is($1)$2");
    return `:is(${selector})`;
  };
  return [
    option === true ? (util) => {
      util.entries.forEach((i) => {
        if (i[1] != null && !String(i[1]).endsWith("!important"))
          i[1] += " !important";
      });
    } : (util) => {
      if (!util.selector.startsWith(option))
        util.selector = `${option} ${wrapWithIs(util.selector)}`;
    }
  ];
};
var postprocessors = function(options) {
  return [
    ...toArray(presetMini(options).postprocess),
    ...important(options.important)
  ];
};
var animations = [
  [/^(?:animate-)?keyframes-(.+)$/, ([, name], { theme: theme3 }) => {
    const kf = theme3.animation?.keyframes?.[name];
    if (kf) {
      return [
        `@keyframes ${name}${kf}`,
        { animation: name }
      ];
    }
  }, { autocomplete: ["animate-keyframes-$animation.keyframes", "keyframes-$animation.keyframes"] }],
  [/^animate-(.+)$/, ([, name], { theme: theme3 }) => {
    const kf = theme3.animation?.keyframes?.[name];
    if (kf) {
      const duration2 = theme3.animation?.durations?.[name] ?? "1s";
      const timing = theme3.animation?.timingFns?.[name] ?? "linear";
      const count = theme3.animation?.counts?.[name] ?? 1;
      const props = theme3.animation?.properties?.[name];
      return [
        `@keyframes ${name}${kf}`,
        {
          animation: `${name} ${duration2} ${timing} ${count}`,
          ...props
        }
      ];
    }
    return { animation: h.bracket.cssvar(name) };
  }, { autocomplete: "animate-$animation.keyframes" }],
  [/^animate-name-(.+)/, ([, d]) => ({ "animation-name": h.bracket.cssvar(d) ?? d })],
  [/^animate-duration-(.+)$/, ([, d], { theme: theme3 }) => ({ "animation-duration": theme3.duration?.[d || "DEFAULT"] ?? h.bracket.cssvar.time(d) }), { autocomplete: ["animate-duration", "animate-duration-$duration"] }],
  [/^animate-delay-(.+)$/, ([, d], { theme: theme3 }) => ({ "animation-delay": theme3.duration?.[d || "DEFAULT"] ?? h.bracket.cssvar.time(d) }), { autocomplete: ["animate-delay", "animate-delay-$duration"] }],
  [/^animate-ease(?:-(.+))?$/, ([, d], { theme: theme3 }) => ({ "animation-timing-function": theme3.easing?.[d || "DEFAULT"] ?? h.bracket.cssvar(d) }), { autocomplete: ["animate-ease", "animate-ease-$easing"] }],
  [/^animate-(fill-mode-|fill-|mode-)?(.+)$/, ([, t, d]) => ["none", "forwards", "backwards", "both", ...[t ? globalKeywords : []]].includes(d) ? { "animation-fill-mode": d } : undefined, {
    autocomplete: [
      "animate-(fill|mode|fill-mode)",
      "animate-(fill|mode|fill-mode)-(none|forwards|backwards|both|inherit|initial|revert|revert-layer|unset)",
      "animate-(none|forwards|backwards|both|inherit|initial|revert|revert-layer|unset)"
    ]
  }],
  [/^animate-(direction-)?(.+)$/, ([, t, d]) => ["normal", "reverse", "alternate", "alternate-reverse", ...[t ? globalKeywords : []]].includes(d) ? { "animation-direction": d } : undefined, {
    autocomplete: [
      "animate-direction",
      "animate-direction-(normal|reverse|alternate|alternate-reverse|inherit|initial|revert|revert-layer|unset)",
      "animate-(normal|reverse|alternate|alternate-reverse|inherit|initial|revert|revert-layer|unset)"
    ]
  }],
  [/^animate-(?:iteration-count-|iteration-|count-)(.+)$/, ([, d]) => ({ "animation-iteration-count": h.bracket.cssvar(d) ?? d.replace(/\-/g, ",") }), { autocomplete: ["animate-(iteration|count|iteration-count)", "animate-(iteration|count|iteration-count)-<num>"] }],
  [/^animate-(play-state-|play-|state-)?(.+)$/, ([, t, d]) => ["paused", "running", ...[t ? globalKeywords : []]].includes(d) ? { "animation-play-state": d } : undefined, {
    autocomplete: [
      "animate-(play|state|play-state)",
      "animate-(play|state|play-state)-(paused|running|inherit|initial|revert|revert-layer|unset)",
      "animate-(paused|running|inherit|initial|revert|revert-layer|unset)"
    ]
  }],
  ["animate-none", { animation: "none" }],
  ...makeGlobalStaticRules("animate", "animation")
];
var backgroundStyles = [
  [/^bg-gradient-(.+)$/, ([, d]) => ({ "--un-gradient": h.bracket(d) }), {
    autocomplete: ["bg-gradient", "bg-gradient-(from|to|via)", "bg-gradient-(from|to|via)-$colors", "bg-gradient-(from|to|via)-(op|opacity)", "bg-gradient-(from|to|via)-(op|opacity)-<percent>"]
  }],
  [/^(?:bg-gradient-)?stops-(\[.+\])$/, ([, s]) => ({ "--un-gradient-stops": h.bracket(s) })],
  [/^(?:bg-gradient-)?(from)-(.+)$/, bgGradientColorResolver()],
  [/^(?:bg-gradient-)?(via)-(.+)$/, bgGradientColorResolver()],
  [/^(?:bg-gradient-)?(to)-(.+)$/, bgGradientColorResolver()],
  [/^(?:bg-gradient-)?(from|via|to)-op(?:acity)?-?(.+)$/, ([, position2, opacity2]) => ({ [`--un-${position2}-opacity`]: h.bracket.percent(opacity2) })],
  [/^(from|via|to)-([\d\.]+)%$/, bgGradientPositionResolver()],
  [/^bg-gradient-((?:repeating-)?(?:linear|radial|conic))$/, ([, s]) => ({
    "background-image": `${s}-gradient(var(--un-gradient, var(--un-gradient-stops, rgb(255 255 255 / 0))))`
  }), { autocomplete: ["bg-gradient-repeating", "bg-gradient-(linear|radial|conic)", "bg-gradient-repeating-(linear|radial|conic)"] }],
  [/^bg-gradient-to-([rltb]{1,2})$/, ([, d]) => {
    if (d in positionMap) {
      return {
        "--un-gradient-shape": `to ${positionMap[d]}`,
        "--un-gradient": "var(--un-gradient-shape), var(--un-gradient-stops)",
        "background-image": "linear-gradient(var(--un-gradient))"
      };
    }
  }, { autocomplete: `bg-gradient-to-(${Object.keys(positionMap).filter((k) => k.length <= 2 && Array.from(k).every((c) => "rltb".includes(c))).join("|")})` }],
  [/^(?:bg-gradient-)?shape-(.+)$/, ([, d]) => {
    const v = d in positionMap ? `to ${positionMap[d]}` : h.bracket(d);
    if (v != null) {
      return {
        "--un-gradient-shape": v,
        "--un-gradient": "var(--un-gradient-shape), var(--un-gradient-stops)"
      };
    }
  }, { autocomplete: ["bg-gradient-shape", `bg-gradient-shape-(${Object.keys(positionMap).join("|")})`, `shape-(${Object.keys(positionMap).join("|")})`] }],
  ["bg-none", { "background-image": "none" }],
  ["box-decoration-slice", { "box-decoration-break": "slice" }],
  ["box-decoration-clone", { "box-decoration-break": "clone" }],
  ...makeGlobalStaticRules("box-decoration", "box-decoration-break"),
  ["bg-auto", { "background-size": "auto" }],
  ["bg-cover", { "background-size": "cover" }],
  ["bg-contain", { "background-size": "contain" }],
  ["bg-fixed", { "background-attachment": "fixed" }],
  ["bg-local", { "background-attachment": "local" }],
  ["bg-scroll", { "background-attachment": "scroll" }],
  ["bg-clip-border", { "-webkit-background-clip": "border-box", "background-clip": "border-box" }],
  ["bg-clip-content", { "-webkit-background-clip": "content-box", "background-clip": "content-box" }],
  ["bg-clip-padding", { "-webkit-background-clip": "padding-box", "background-clip": "padding-box" }],
  ["bg-clip-text", { "-webkit-background-clip": "text", "background-clip": "text" }],
  ...globalKeywords.map((keyword) => [`bg-clip-${keyword}`, {
    "-webkit-background-clip": keyword,
    "background-clip": keyword
  }]),
  [/^bg-([-\w]{3,})$/, ([, s]) => ({ "background-position": positionMap[s] })],
  ["bg-repeat", { "background-repeat": "repeat" }],
  ["bg-no-repeat", { "background-repeat": "no-repeat" }],
  ["bg-repeat-x", { "background-repeat": "repeat-x" }],
  ["bg-repeat-y", { "background-repeat": "repeat-y" }],
  ["bg-repeat-round", { "background-repeat": "round" }],
  ["bg-repeat-space", { "background-repeat": "space" }],
  ...makeGlobalStaticRules("bg-repeat", "background-repeat"),
  ["bg-origin-border", { "background-origin": "border-box" }],
  ["bg-origin-padding", { "background-origin": "padding-box" }],
  ["bg-origin-content", { "background-origin": "content-box" }],
  ...makeGlobalStaticRules("bg-origin", "background-origin")
];
var listStyles = {
  disc: "disc",
  circle: "circle",
  square: "square",
  decimal: "decimal",
  "zero-decimal": "decimal-leading-zero",
  greek: "lower-greek",
  roman: "lower-roman",
  "upper-roman": "upper-roman",
  alpha: "lower-alpha",
  "upper-alpha": "upper-alpha",
  latin: "lower-latin",
  "upper-latin": "upper-latin"
};
var listStyle = [
  [/^list-(.+?)(?:-(outside|inside))?$/, ([, alias, position2]) => {
    const style = listStyles[alias];
    if (style) {
      if (position2) {
        return {
          "list-style-position": position2,
          "list-style-type": style
        };
      }
      return { "list-style-type": style };
    }
  }, { autocomplete: [`list-(${Object.keys(listStyles).join("|")})`, `list-(${Object.keys(listStyles).join("|")})-(outside|inside)`] }],
  ["list-outside", { "list-style-position": "outside" }],
  ["list-inside", { "list-style-position": "inside" }],
  ["list-none", { "list-style-type": "none" }],
  [/^list-image-(.+)$/, ([, d]) => {
    if (/^\[url\(.+\)\]$/.test(d))
      return { "list-style-image": h.bracket(d) };
  }],
  ["list-image-none", { "list-style-image": "none" }],
  ...makeGlobalStaticRules("list", "list-style-type")
];
var accents = [
  [/^accent-(.+)$/, colorResolver("accent-color", "accent", "accentColor"), { autocomplete: "accent-$colors" }],
  [/^accent-op(?:acity)?-?(.+)$/, ([, d]) => ({ "--un-accent-opacity": h.bracket.percent(d) }), { autocomplete: ["accent-(op|opacity)", "accent-(op|opacity)-<percent>"] }]
];
var carets = [
  [/^caret-(.+)$/, colorResolver("caret-color", "caret", "textColor"), { autocomplete: "caret-$colors" }],
  [/^caret-op(?:acity)?-?(.+)$/, ([, d]) => ({ "--un-caret-opacity": h.bracket.percent(d) }), { autocomplete: ["caret-(op|opacity)", "caret-(op|opacity)-<percent>"] }]
];
var imageRenderings = [
  ["image-render-auto", { "image-rendering": "auto" }],
  ["image-render-edge", { "image-rendering": "crisp-edges" }],
  ["image-render-pixel", [
    ["-ms-interpolation-mode", "nearest-neighbor"],
    ["image-rendering", "-webkit-optimize-contrast"],
    ["image-rendering", "-moz-crisp-edges"],
    ["image-rendering", "-o-pixelated"],
    ["image-rendering", "pixelated"]
  ]]
];
var overscrolls = [
  ["overscroll-auto", { "overscroll-behavior": "auto" }],
  ["overscroll-contain", { "overscroll-behavior": "contain" }],
  ["overscroll-none", { "overscroll-behavior": "none" }],
  ...makeGlobalStaticRules("overscroll", "overscroll-behavior"),
  ["overscroll-x-auto", { "overscroll-behavior-x": "auto" }],
  ["overscroll-x-contain", { "overscroll-behavior-x": "contain" }],
  ["overscroll-x-none", { "overscroll-behavior-x": "none" }],
  ...makeGlobalStaticRules("overscroll-x", "overscroll-behavior-x"),
  ["overscroll-y-auto", { "overscroll-behavior-y": "auto" }],
  ["overscroll-y-contain", { "overscroll-behavior-y": "contain" }],
  ["overscroll-y-none", { "overscroll-behavior-y": "none" }],
  ...makeGlobalStaticRules("overscroll-y", "overscroll-behavior-y")
];
var scrollBehaviors = [
  ["scroll-auto", { "scroll-behavior": "auto" }],
  ["scroll-smooth", { "scroll-behavior": "smooth" }],
  ...makeGlobalStaticRules("scroll", "scroll-behavior")
];
var columns = [
  [/^columns-(.+)$/, ([, v]) => ({ columns: h.bracket.global.number.auto.numberWithUnit(v) }), { autocomplete: "columns-<num>" }],
  ["break-before-auto", { "break-before": "auto" }],
  ["break-before-avoid", { "break-before": "avoid" }],
  ["break-before-all", { "break-before": "all" }],
  ["break-before-avoid-page", { "break-before": "avoid-page" }],
  ["break-before-page", { "break-before": "page" }],
  ["break-before-left", { "break-before": "left" }],
  ["break-before-right", { "break-before": "right" }],
  ["break-before-column", { "break-before": "column" }],
  ...makeGlobalStaticRules("break-before"),
  ["break-inside-auto", { "break-inside": "auto" }],
  ["break-inside-avoid", { "break-inside": "avoid" }],
  ["break-inside-avoid-page", { "break-inside": "avoid-page" }],
  ["break-inside-avoid-column", { "break-inside": "avoid-column" }],
  ...makeGlobalStaticRules("break-inside"),
  ["break-after-auto", { "break-after": "auto" }],
  ["break-after-avoid", { "break-after": "avoid" }],
  ["break-after-all", { "break-after": "all" }],
  ["break-after-avoid-page", { "break-after": "avoid-page" }],
  ["break-after-page", { "break-after": "page" }],
  ["break-after-left", { "break-after": "left" }],
  ["break-after-right", { "break-after": "right" }],
  ["break-after-column", { "break-after": "column" }],
  ...makeGlobalStaticRules("break-after")
];
var queryMatcher = /@media \(min-width: (.+)\)/;
var container = [
  [
    /^__container$/,
    (m, context) => {
      const { theme: theme3, variantHandlers } = context;
      const themePadding = theme3.container?.padding;
      let padding;
      if (isString(themePadding))
        padding = themePadding;
      else
        padding = themePadding?.DEFAULT;
      const themeMaxWidth = theme3.container?.maxWidth;
      let maxWidth2;
      for (const v of variantHandlers) {
        const query = v.handle?.({}, (x) => x)?.parent;
        if (isString(query)) {
          const match = query.match(queryMatcher)?.[1];
          if (match) {
            const bp = resolveBreakpoints(context) ?? [];
            const matchBp = bp.find((i) => i.size === match)?.point;
            if (!themeMaxWidth)
              maxWidth2 = match;
            else if (matchBp)
              maxWidth2 = themeMaxWidth?.[matchBp];
            if (matchBp && !isString(themePadding))
              padding = themePadding?.[matchBp] ?? padding;
          }
        }
      }
      const css = {
        "max-width": maxWidth2
      };
      if (!variantHandlers.length)
        css.width = "100%";
      if (theme3.container?.center) {
        css["margin-left"] = "auto";
        css["margin-right"] = "auto";
      }
      if (themePadding) {
        css["padding-left"] = padding;
        css["padding-right"] = padding;
      }
      return css;
    },
    { internal: true }
  ]
];
var containerShortcuts = [
  [/^(?:(\w+)[:-])?container$/, ([, bp], context) => {
    let points = (resolveBreakpoints(context) ?? []).map((i) => i.point);
    if (bp) {
      if (!points.includes(bp))
        return;
      points = points.slice(points.indexOf(bp));
    }
    const shortcuts = points.map((p) => `${p}:__container`);
    if (!bp)
      shortcuts.unshift("__container");
    return shortcuts;
  }]
];
var filterBase = {
  "--un-blur": varEmpty,
  "--un-brightness": varEmpty,
  "--un-contrast": varEmpty,
  "--un-drop-shadow": varEmpty,
  "--un-grayscale": varEmpty,
  "--un-hue-rotate": varEmpty,
  "--un-invert": varEmpty,
  "--un-saturate": varEmpty,
  "--un-sepia": varEmpty
};
var filterProperty = "var(--un-blur) var(--un-brightness) var(--un-contrast) var(--un-drop-shadow) var(--un-grayscale) var(--un-hue-rotate) var(--un-invert) var(--un-saturate) var(--un-sepia)";
var backdropFilterBase = {
  "--un-backdrop-blur": varEmpty,
  "--un-backdrop-brightness": varEmpty,
  "--un-backdrop-contrast": varEmpty,
  "--un-backdrop-grayscale": varEmpty,
  "--un-backdrop-hue-rotate": varEmpty,
  "--un-backdrop-invert": varEmpty,
  "--un-backdrop-opacity": varEmpty,
  "--un-backdrop-saturate": varEmpty,
  "--un-backdrop-sepia": varEmpty
};
var backdropFilterProperty = "var(--un-backdrop-blur) var(--un-backdrop-brightness) var(--un-backdrop-contrast) var(--un-backdrop-grayscale) var(--un-backdrop-hue-rotate) var(--un-backdrop-invert) var(--un-backdrop-opacity) var(--un-backdrop-saturate) var(--un-backdrop-sepia)";
var filters = [
  [/^(?:(backdrop-)|filter-)?blur(?:-(.+))?$/, toFilter("blur", (s, theme3) => theme3.blur?.[s || "DEFAULT"] || h.bracket.cssvar.px(s)), { autocomplete: ["(backdrop|filter)-blur-$blur", "blur-$blur", "filter-blur"] }],
  [/^(?:(backdrop-)|filter-)?brightness-(.+)$/, toFilter("brightness", (s) => h.bracket.cssvar.percent(s)), { autocomplete: ["(backdrop|filter)-brightness-<percent>", "brightness-<percent>"] }],
  [/^(?:(backdrop-)|filter-)?contrast-(.+)$/, toFilter("contrast", (s) => h.bracket.cssvar.percent(s)), { autocomplete: ["(backdrop|filter)-contrast-<percent>", "contrast-<percent>"] }],
  [/^(?:filter-)?drop-shadow(?:-(.+))?$/, dropShadowResolver, {
    autocomplete: [
      "filter-drop",
      "filter-drop-shadow",
      "filter-drop-shadow-color",
      "drop-shadow",
      "drop-shadow-color",
      "filter-drop-shadow-$dropShadow",
      "drop-shadow-$dropShadow",
      "filter-drop-shadow-color-$colors",
      "drop-shadow-color-$colors",
      "filter-drop-shadow-color-(op|opacity)",
      "drop-shadow-color-(op|opacity)",
      "filter-drop-shadow-color-(op|opacity)-<percent>",
      "drop-shadow-color-(op|opacity)-<percent>"
    ]
  }],
  [/^(?:filter-)?drop-shadow-color-(.+)$/, colorResolver("--un-drop-shadow-color", "drop-shadow", "shadowColor")],
  [/^(?:filter-)?drop-shadow-color-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-drop-shadow-opacity": h.bracket.percent(opacity2) })],
  [/^(?:(backdrop-)|filter-)?grayscale(?:-(.+))?$/, toFilter("grayscale", percentWithDefault), { autocomplete: ["(backdrop|filter)-grayscale", "(backdrop|filter)-grayscale-<percent>", "grayscale-<percent>"] }],
  [/^(?:(backdrop-)|filter-)?hue-rotate-(.+)$/, toFilter("hue-rotate", (s) => h.bracket.cssvar.degree(s))],
  [/^(?:(backdrop-)|filter-)?invert(?:-(.+))?$/, toFilter("invert", percentWithDefault), { autocomplete: ["(backdrop|filter)-invert", "(backdrop|filter)-invert-<percent>", "invert-<percent>"] }],
  [/^(backdrop-)op(?:acity)-(.+)$/, toFilter("opacity", (s) => h.bracket.cssvar.percent(s)), { autocomplete: ["backdrop-(op|opacity)", "backdrop-(op|opacity)-<percent>"] }],
  [/^(?:(backdrop-)|filter-)?saturate-(.+)$/, toFilter("saturate", (s) => h.bracket.cssvar.percent(s)), { autocomplete: ["(backdrop|filter)-saturate", "(backdrop|filter)-saturate-<percent>", "saturate-<percent>"] }],
  [/^(?:(backdrop-)|filter-)?sepia(?:-(.+))?$/, toFilter("sepia", percentWithDefault), { autocomplete: ["(backdrop|filter)-sepia", "(backdrop|filter)-sepia-<percent>", "sepia-<percent>"] }],
  ["filter", { filter: filterProperty }],
  ["backdrop-filter", {
    "-webkit-backdrop-filter": backdropFilterProperty,
    "backdrop-filter": backdropFilterProperty
  }],
  ["filter-none", { filter: "none" }],
  ["backdrop-filter-none", {
    "-webkit-backdrop-filter": "none",
    "backdrop-filter": "none"
  }],
  ...globalKeywords.map((keyword) => [`filter-${keyword}`, { filter: keyword }]),
  ...globalKeywords.map((keyword) => [`backdrop-filter-${keyword}`, {
    "-webkit-backdrop-filter": keyword,
    "backdrop-filter": keyword
  }])
];
var spaces = [
  [/^space-([xy])-(-?.+)$/, handlerSpace, { autocomplete: ["space-(x|y|block|inline)", "space-(x|y|block|inline)-reverse", "space-(x|y|block|inline)-$spacing"] }],
  [/^space-([xy])-reverse$/, ([, d]) => ({ [`--un-space-${d}-reverse`]: 1 })],
  [/^space-(block|inline)-(-?.+)$/, handlerSpace],
  [/^space-(block|inline)-reverse$/, ([, d]) => ({ [`--un-space-${d}-reverse`]: 1 })]
];
var textTransforms2 = [
  ["uppercase", { "text-transform": "uppercase" }],
  ["lowercase", { "text-transform": "lowercase" }],
  ["capitalize", { "text-transform": "capitalize" }],
  ["normal-case", { "text-transform": "none" }]
];
var hyphens = [
  ...["manual", "auto", "none", ...globalKeywords].map((keyword) => [`hyphens-${keyword}`, {
    "-webkit-hyphens": keyword,
    "-ms-hyphens": keyword,
    hyphens: keyword
  }])
];
var writingModes = [
  ["write-vertical-right", { "writing-mode": "vertical-rl" }],
  ["write-vertical-left", { "writing-mode": "vertical-lr" }],
  ["write-normal", { "writing-mode": "horizontal-tb" }],
  ...makeGlobalStaticRules("write", "writing-mode")
];
var writingOrientations = [
  ["write-orient-mixed", { "text-orientation": "mixed" }],
  ["write-orient-sideways", { "text-orientation": "sideways" }],
  ["write-orient-upright", { "text-orientation": "upright" }],
  ...makeGlobalStaticRules("write-orient", "text-orientation")
];
var screenReadersAccess = [
  [
    "sr-only",
    {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0,0,0,0)",
      "white-space": "nowrap",
      "border-width": 0
    }
  ],
  [
    "not-sr-only",
    {
      position: "static",
      width: "auto",
      height: "auto",
      padding: "0",
      margin: "0",
      overflow: "visible",
      clip: "auto",
      "white-space": "normal"
    }
  ]
];
var isolations = [
  ["isolate", { isolation: "isolate" }],
  ["isolate-auto", { isolation: "auto" }],
  ["isolation-auto", { isolation: "auto" }]
];
var objectPositions = [
  ["object-cover", { "object-fit": "cover" }],
  ["object-contain", { "object-fit": "contain" }],
  ["object-fill", { "object-fit": "fill" }],
  ["object-scale-down", { "object-fit": "scale-down" }],
  ["object-none", { "object-fit": "none" }],
  [/^object-(.+)$/, ([, d]) => {
    if (positionMap[d])
      return { "object-position": positionMap[d] };
    if (h.bracketOfPosition(d) != null)
      return { "object-position": h.bracketOfPosition(d).split(" ").map((e2) => h.position.fraction.auto.px.cssvar(e2) ?? e2).join(" ") };
  }, { autocomplete: `object-(${Object.keys(positionMap).join("|")})` }]
];
var backgroundBlendModes = [
  ["bg-blend-multiply", { "background-blend-mode": "multiply" }],
  ["bg-blend-screen", { "background-blend-mode": "screen" }],
  ["bg-blend-overlay", { "background-blend-mode": "overlay" }],
  ["bg-blend-darken", { "background-blend-mode": "darken" }],
  ["bg-blend-lighten", { "background-blend-mode": "lighten" }],
  ["bg-blend-color-dodge", { "background-blend-mode": "color-dodge" }],
  ["bg-blend-color-burn", { "background-blend-mode": "color-burn" }],
  ["bg-blend-hard-light", { "background-blend-mode": "hard-light" }],
  ["bg-blend-soft-light", { "background-blend-mode": "soft-light" }],
  ["bg-blend-difference", { "background-blend-mode": "difference" }],
  ["bg-blend-exclusion", { "background-blend-mode": "exclusion" }],
  ["bg-blend-hue", { "background-blend-mode": "hue" }],
  ["bg-blend-saturation", { "background-blend-mode": "saturation" }],
  ["bg-blend-color", { "background-blend-mode": "color" }],
  ["bg-blend-luminosity", { "background-blend-mode": "luminosity" }],
  ["bg-blend-normal", { "background-blend-mode": "normal" }],
  ...makeGlobalStaticRules("bg-blend", "background-blend")
];
var mixBlendModes = [
  ["mix-blend-multiply", { "mix-blend-mode": "multiply" }],
  ["mix-blend-screen", { "mix-blend-mode": "screen" }],
  ["mix-blend-overlay", { "mix-blend-mode": "overlay" }],
  ["mix-blend-darken", { "mix-blend-mode": "darken" }],
  ["mix-blend-lighten", { "mix-blend-mode": "lighten" }],
  ["mix-blend-color-dodge", { "mix-blend-mode": "color-dodge" }],
  ["mix-blend-color-burn", { "mix-blend-mode": "color-burn" }],
  ["mix-blend-hard-light", { "mix-blend-mode": "hard-light" }],
  ["mix-blend-soft-light", { "mix-blend-mode": "soft-light" }],
  ["mix-blend-difference", { "mix-blend-mode": "difference" }],
  ["mix-blend-exclusion", { "mix-blend-mode": "exclusion" }],
  ["mix-blend-hue", { "mix-blend-mode": "hue" }],
  ["mix-blend-saturation", { "mix-blend-mode": "saturation" }],
  ["mix-blend-color", { "mix-blend-mode": "color" }],
  ["mix-blend-luminosity", { "mix-blend-mode": "luminosity" }],
  ["mix-blend-plus-lighter", { "mix-blend-mode": "plus-lighter" }],
  ["mix-blend-normal", { "mix-blend-mode": "normal" }],
  ...makeGlobalStaticRules("mix-blend")
];
var dynamicViewportHeight = [
  ["min-h-dvh", { "min-height": "100dvh" }],
  ["min-h-svh", { "min-height": "100svh" }],
  ["min-h-lvh", { "min-height": "100lvh" }],
  ["h-dvh", { height: "100dvh" }],
  ["h-svh", { height: "100svh" }],
  ["h-lvh", { height: "100lvh" }],
  ["max-h-dvh", { "max-height": "100dvh" }],
  ["max-h-svh", { "max-height": "100svh" }],
  ["max-h-lvh", { "max-height": "100lvh" }]
];
var borderSpacingBase = {
  "--un-border-spacing-x": 0,
  "--un-border-spacing-y": 0
};
var borderSpacingProperty = "var(--un-border-spacing-x) var(--un-border-spacing-y)";
var tables = [
  ["inline-table", { display: "inline-table" }],
  ["table", { display: "table" }],
  ["table-caption", { display: "table-caption" }],
  ["table-cell", { display: "table-cell" }],
  ["table-column", { display: "table-column" }],
  ["table-column-group", { display: "table-column-group" }],
  ["table-footer-group", { display: "table-footer-group" }],
  ["table-header-group", { display: "table-header-group" }],
  ["table-row", { display: "table-row" }],
  ["table-row-group", { display: "table-row-group" }],
  ["border-collapse", { "border-collapse": "collapse" }],
  ["border-separate", { "border-collapse": "separate" }],
  [/^border-spacing-(.+)$/, ([, s], { theme: theme3 }) => {
    const v = theme3.spacing?.[s] ?? h.bracket.cssvar.global.auto.fraction.rem(s);
    if (v != null) {
      return {
        "--un-border-spacing-x": v,
        "--un-border-spacing-y": v,
        "border-spacing": borderSpacingProperty
      };
    }
  }, { autocomplete: ["border-spacing", "border-spacing-$spacing"] }],
  [/^border-spacing-([xy])-(.+)$/, ([, d, s], { theme: theme3 }) => {
    const v = theme3.spacing?.[s] ?? h.bracket.cssvar.global.auto.fraction.rem(s);
    if (v != null) {
      return {
        [`--un-border-spacing-${d}`]: v,
        "border-spacing": borderSpacingProperty
      };
    }
  }, { autocomplete: ["border-spacing-(x|y)", "border-spacing-(x|y)-$spacing"] }],
  ["caption-top", { "caption-side": "top" }],
  ["caption-bottom", { "caption-side": "bottom" }],
  ["table-auto", { "table-layout": "auto" }],
  ["table-fixed", { "table-layout": "fixed" }],
  ["table-empty-cells-visible", { "empty-cells": "show" }],
  ["table-empty-cells-hidden", { "empty-cells": "hide" }]
];
var variablesAbbrMap2 = {
  "bg-blend": "background-blend-mode",
  "bg-clip": "-webkit-background-clip",
  "bg-gradient": "linear-gradient",
  "bg-image": "background-image",
  "bg-origin": "background-origin",
  "bg-position": "background-position",
  "bg-repeat": "background-repeat",
  "bg-size": "background-size",
  "mix-blend": "mix-blend-mode",
  object: "object-fit",
  "object-position": "object-position",
  write: "writing-mode",
  "write-orient": "text-orientation"
};
var cssVariables2 = [
  [/^(.+?)-(\$.+)$/, ([, name, varname]) => {
    const prop = variablesAbbrMap2[name];
    if (prop)
      return { [prop]: h.cssvar(varname) };
  }]
];
var divides = [
  [/^divide-?([xy])$/, handlerDivide, { autocomplete: ["divide-(x|y|block|inline)", "divide-(x|y|block|inline)-reverse", "divide-(x|y|block|inline)-$lineWidth"] }],
  [/^divide-?([xy])-?(-?.+)$/, handlerDivide],
  [/^divide-?([xy])-reverse$/, ([, d]) => ({ [`--un-divide-${d}-reverse`]: 1 })],
  [/^divide-(block|inline)$/, handlerDivide],
  [/^divide-(block|inline)-(-?.+)$/, handlerDivide],
  [/^divide-(block|inline)-reverse$/, ([, d]) => ({ [`--un-divide-${d}-reverse`]: 1 })],
  [/^divide-(.+)$/, colorResolver("border-color", "divide", "borderColor"), { autocomplete: "divide-$colors" }],
  [/^divide-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-divide-opacity": h.bracket.percent(opacity2) }), { autocomplete: ["divide-(op|opacity)", "divide-(op|opacity)-<percent>"] }],
  ...borderStyles.map((style) => [`divide-${style}`, { "border-style": style }])
];
var lineClamps = [
  [/^line-clamp-(\d+)$/, ([, v]) => ({
    overflow: "hidden",
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    "-webkit-line-clamp": v,
    "line-clamp": v
  }), { autocomplete: ["line-clamp", "line-clamp-<num>"] }],
  ...["none", ...globalKeywords].map((keyword) => [`line-clamp-${keyword}`, {
    overflow: "visible",
    display: "block",
    "-webkit-box-orient": "horizontal",
    "-webkit-line-clamp": keyword,
    "line-clamp": keyword
  }])
];
var fontVariantNumericBase = {
  "--un-ordinal": varEmpty,
  "--un-slashed-zero": varEmpty,
  "--un-numeric-figure": varEmpty,
  "--un-numeric-spacing": varEmpty,
  "--un-numeric-fraction": varEmpty
};
var fontVariantNumeric = [
  [/^ordinal$/, () => toEntries({ "--un-ordinal": "ordinal" }), { autocomplete: "ordinal" }],
  [/^slashed-zero$/, () => toEntries({ "--un-slashed-zero": "slashed-zero" }), { autocomplete: "slashed-zero" }],
  [/^lining-nums$/, () => toEntries({ "--un-numeric-figure": "lining-nums" }), { autocomplete: "lining-nums" }],
  [/^oldstyle-nums$/, () => toEntries({ "--un-numeric-figure": "oldstyle-nums" }), { autocomplete: "oldstyle-nums" }],
  [/^proportional-nums$/, () => toEntries({ "--un-numeric-spacing": "proportional-nums" }), { autocomplete: "proportional-nums" }],
  [/^tabular-nums$/, () => toEntries({ "--un-numeric-spacing": "tabular-nums" }), { autocomplete: "tabular-nums" }],
  [/^diagonal-fractions$/, () => toEntries({ "--un-numeric-fraction": "diagonal-fractions" }), { autocomplete: "diagonal-fractions" }],
  [/^stacked-fractions$/, () => toEntries({ "--un-numeric-fraction": "stacked-fractions" }), { autocomplete: "stacked-fractions" }],
  ["normal-nums", { "font-variant-numeric": "normal" }]
];
var touchActionBase = {
  "--un-pan-x": varEmpty,
  "--un-pan-y": varEmpty,
  "--un-pinch-zoom": varEmpty
};
var touchActionProperty = "var(--un-pan-x) var(--un-pan-y) var(--un-pinch-zoom)";
var touchActions = [
  [/^touch-pan-(x|left|right)$/, ([, d]) => ({
    "--un-pan-x": `pan-${d}`,
    "touch-action": touchActionProperty
  }), { autocomplete: ["touch-pan", "touch-pan-(x|left|right|y|up|down)"] }],
  [/^touch-pan-(y|up|down)$/, ([, d]) => ({
    "--un-pan-y": `pan-${d}`,
    "touch-action": touchActionProperty
  })],
  ["touch-pinch-zoom", {
    "--un-pinch-zoom": "pinch-zoom",
    "touch-action": touchActionProperty
  }],
  ["touch-auto", { "touch-action": "auto" }],
  ["touch-manipulation", { "touch-action": "manipulation" }],
  ["touch-none", { "touch-action": "none" }],
  ...makeGlobalStaticRules("touch", "touch-action")
];
var scrollSnapTypeBase = {
  "--un-scroll-snap-strictness": "proximity"
};
var scrolls = [
  [/^snap-(x|y)$/, ([, d]) => ({
    "scroll-snap-type": `${d} var(--un-scroll-snap-strictness)`
  }), { autocomplete: "snap-(x|y|both)" }],
  [/^snap-both$/, () => ({
    "scroll-snap-type": "both var(--un-scroll-snap-strictness)"
  })],
  ["snap-mandatory", { "--un-scroll-snap-strictness": "mandatory" }],
  ["snap-proximity", { "--un-scroll-snap-strictness": "proximity" }],
  ["snap-none", { "scroll-snap-type": "none" }],
  ["snap-start", { "scroll-snap-align": "start" }],
  ["snap-end", { "scroll-snap-align": "end" }],
  ["snap-center", { "scroll-snap-align": "center" }],
  ["snap-align-none", { "scroll-snap-align": "none" }],
  ["snap-normal", { "scroll-snap-stop": "normal" }],
  ["snap-always", { "scroll-snap-stop": "always" }],
  [/^scroll-ma?()-?(-?.+)$/, directionSize("scroll-margin"), {
    autocomplete: [
      "scroll-(m|p|ma|pa|block|inline)",
      "scroll-(m|p|ma|pa|block|inline)-$spacing",
      "scroll-(m|p|ma|pa|block|inline)-(x|y|r|l|t|b|bs|be|is|ie)",
      "scroll-(m|p|ma|pa|block|inline)-(x|y|r|l|t|b|bs|be|is|ie)-$spacing"
    ]
  }],
  [/^scroll-m-?([xy])-?(-?.+)$/, directionSize("scroll-margin")],
  [/^scroll-m-?([rltb])-?(-?.+)$/, directionSize("scroll-margin")],
  [/^scroll-m-(block|inline)-(-?.+)$/, directionSize("scroll-margin")],
  [/^scroll-m-?([bi][se])-?(-?.+)$/, directionSize("scroll-margin")],
  [/^scroll-pa?()-?(-?.+)$/, directionSize("scroll-padding")],
  [/^scroll-p-?([xy])-?(-?.+)$/, directionSize("scroll-padding")],
  [/^scroll-p-?([rltb])-?(-?.+)$/, directionSize("scroll-padding")],
  [/^scroll-p-(block|inline)-(-?.+)$/, directionSize("scroll-padding")],
  [/^scroll-p-?([bi][se])-?(-?.+)$/, directionSize("scroll-padding")]
];
var placeholders = [
  [/^\$ placeholder-(.+)$/, colorResolver("color", "placeholder", "accentColor"), { autocomplete: "placeholder-$colors" }],
  [/^\$ placeholder-op(?:acity)?-?(.+)$/, ([, opacity2]) => ({ "--un-placeholder-opacity": h.bracket.percent(opacity2) }), { autocomplete: ["placeholder-(op|opacity)", "placeholder-(op|opacity)-<percent>"] }]
];
var viewTransition = [
  [/^view-transition-([\w_-]+)$/, ([, name]) => {
    return { "view-transition-name": name };
  }]
];
var rules3 = [
  cssVariables,
  cssVariables2,
  cssProperty,
  container,
  contains,
  screenReadersAccess,
  pointerEvents,
  appearances,
  positions,
  insets,
  lineClamps,
  isolations,
  zIndexes,
  orders,
  grids,
  floats,
  margins,
  boxSizing,
  displays,
  aspectRatio,
  sizes,
  flex,
  tables,
  transforms,
  animations,
  cursors,
  touchActions,
  userSelects,
  resizes,
  scrolls,
  listStyle,
  appearance,
  columns,
  placements,
  alignments,
  justifies,
  gaps,
  flexGridJustifiesAlignments,
  spaces,
  divides,
  overflows,
  overscrolls,
  scrollBehaviors,
  textOverflows,
  whitespaces,
  breaks,
  borders,
  bgColors,
  backgroundStyles,
  svgUtilities,
  objectPositions,
  paddings,
  textAligns,
  textIndents,
  textWraps,
  verticalAligns,
  fonts,
  textTransforms,
  textTransforms2,
  fontStyles,
  fontVariantNumeric,
  textDecorations,
  fontSmoothings,
  tabSizes,
  textStrokes,
  textShadows,
  hyphens,
  writingModes,
  writingOrientations,
  carets,
  accents,
  opacity,
  backgroundBlendModes,
  mixBlendModes,
  boxShadows,
  outline,
  rings,
  imageRenderings,
  filters,
  transitions,
  willChange,
  contentVisibility,
  contents,
  placeholders,
  containerParent,
  viewTransition,
  dynamicViewportHeight,
  questionMark
].flat(1);
var shortcuts = [
  ...containerShortcuts
];
var theme3 = {
  ...theme,
  aria: {
    busy: 'busy="true"',
    checked: 'checked="true"',
    disabled: 'disabled="true"',
    expanded: 'expanded="true"',
    hidden: 'hidden="true"',
    pressed: 'pressed="true"',
    readonly: 'readonly="true"',
    required: 'required="true"',
    selected: 'selected="true"'
  },
  animation: {
    keyframes: {
      pulse: "{0%, 100% {opacity:1} 50% {opacity:.5}}",
      bounce: "{0%, 100% {transform:translateY(-25%);animation-timing-function:cubic-bezier(0.8,0,1,1)} 50% {transform:translateY(0);animation-timing-function:cubic-bezier(0,0,0.2,1)}}",
      spin: "{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",
      ping: "{0%{transform:scale(1);opacity:1}75%,100%{transform:scale(2);opacity:0}}",
      "bounce-alt": "{from,20%,53%,80%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);transform:translate3d(0,0,0)}40%,43%{animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);transform:translate3d(0,-30px,0)}70%{animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);transform:translate3d(0,-15px,0)}90%{transform:translate3d(0,-4px,0)}}",
      flash: "{from,50%,to{opacity:1}25%,75%{opacity:0}}",
      "pulse-alt": "{from{transform:scale3d(1,1,1)}50%{transform:scale3d(1.05,1.05,1.05)}to{transform:scale3d(1,1,1)}}",
      "rubber-band": "{from{transform:scale3d(1,1,1)}30%{transform:scale3d(1.25,0.75,1)}40%{transform:scale3d(0.75,1.25,1)}50%{transform:scale3d(1.15,0.85,1)}65%{transform:scale3d(0.95,1.05,1)}75%{transform:scale3d(1.05,0.95,1)}to{transform:scale3d(1,1,1)}}",
      "shake-x": "{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(-10px,0,0)}20%,40%,60%,80%{transform:translate3d(10px,0,0)}}",
      "shake-y": "{from,to{transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{transform:translate3d(0,-10px,0)}20%,40%,60%,80%{transform:translate3d(0,10px,0)}}",
      "head-shake": "{0%{transform:translateX(0)}6.5%{transform:translateX(-6px) rotateY(-9deg)}18.5%{transform:translateX(5px) rotateY(7deg)}31.5%{transform:translateX(-3px) rotateY(-5deg)}43.5%{transform:translateX(2px) rotateY(3deg)}50%{transform:translateX(0)}}",
      swing: "{20%{transform:rotate3d(0,0,1,15deg)}40%{transform:rotate3d(0,0,1,-10deg)}60%{transform:rotate3d(0,0,1,5deg)}80%{transform:rotate3d(0,0,1,-5deg)}to{transform:rotate3d(0,0,1,0deg)}}",
      tada: "{from{transform:scale3d(1,1,1)}10%,20%{transform:scale3d(0.9,0.9,0.9) rotate3d(0,0,1,-3deg)}30%,50%,70%,90%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)}40%,60%,80%{transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)}to{transform:scale3d(1,1,1)}}",
      wobble: "{from{transform:translate3d(0,0,0)}15%{transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg)}30%{transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg)}45%{transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg)}60%{transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg)}75%{transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg)}to{transform:translate3d(0,0,0)}}",
      jello: "{from,11.1%,to{transform:translate3d(0,0,0)}22.2%{transform:skewX(-12.5deg) skewY(-12.5deg)}33.3%{transform:skewX(6.25deg) skewY(6.25deg)}44.4%{transform:skewX(-3.125deg)skewY(-3.125deg)}55.5%{transform:skewX(1.5625deg) skewY(1.5625deg)}66.6%{transform:skewX(-0.78125deg) skewY(-0.78125deg)}77.7%{transform:skewX(0.390625deg) skewY(0.390625deg)}88.8%{transform:skewX(-0.1953125deg) skewY(-0.1953125deg)}}",
      "heart-beat": "{0%{transform:scale(1)}14%{transform:scale(1.3)}28%{transform:scale(1)}42%{transform:scale(1.3)}70%{transform:scale(1)}}",
      hinge: "{0%{transform-origin:top left;animation-timing-function:ease-in-out}20%,60%{transform:rotate3d(0,0,1,80deg);transform-origin:top left;animation-timing-function:ease-in-out}40%,80%{transform:rotate3d(0,0,1,60deg);transform-origin:top left;animation-timing-function:ease-in-out}to{transform:translate3d(0,700px,0);opacity:0}}",
      "jack-in-the-box": "{from{opacity:0;transform-origin:center bottom;transform:scale(0.1) rotate(30deg)}50%{transform:rotate(-10deg)}70%{transform:rotate(3deg)}to{transform:scale(1)}}",
      "light-speed-in-left": "{from{opacity:0;transform:translate3d(-100%,0,0) skewX(-30deg)}60%{opacity:1;transform:skewX(20deg)}80%{transform:skewX(-5deg)}to{transform:translate3d(0,0,0)}}",
      "light-speed-in-right": "{from{opacity:0;transform:translate3d(100%,0,0) skewX(-30deg)}60%{opacity:1;transform:skewX(20deg)}80%{transform:skewX(-5deg)}to{transform:translate3d(0,0,0)}}",
      "light-speed-out-left": "{from{opacity:1}to{opacity:0;transform:translate3d(-100%,0,0) skewX(30deg)}}",
      "light-speed-out-right": "{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) skewX(30deg)}}",
      flip: "{from{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,-360deg);animation-timing-function:ease-out}40%{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-190deg);animation-timing-function:ease-out}50%{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,150px) rotate3d(0,1,0,-170deg);animation-timing-function:ease-in}80%{transform:perspective(400px) scale3d(0.95,0.95,0.95) translate3d(0,0,0) rotate3d(0,1,0,0deg);animation-timing-function:ease-in}to{transform:perspective(400px) scale3d(1,1,1) translate3d(0,0,0) rotate3d(0,1,0,0deg);animation-timing-function:ease-in}}",
      "flip-in-x": "{from{transform:perspective(400px) rotate3d(1,0,0,90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(1,0,0,-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(1,0,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(1,0,0,-5deg)}to{transform:perspective(400px)}}",
      "flip-in-y": "{from{transform:perspective(400px) rotate3d(0,1,0,90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotate3d(0,1,0,-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotate3d(0,1,0,10deg);opacity:1}80%{transform:perspective(400px) rotate3d(0,1,0,-5deg)}to{transform:perspective(400px)}}",
      "flip-out-x": "{from{transform:perspective(400px)}30%{transform:perspective(400px) rotate3d(1,0,0,-20deg);opacity:1}to{transform:perspective(400px) rotate3d(1,0,0,90deg);opacity:0}}",
      "flip-out-y": "{from{transform:perspective(400px)}30%{transform:perspective(400px) rotate3d(0,1,0,-15deg);opacity:1}to{transform:perspective(400px) rotate3d(0,1,0,90deg);opacity:0}}",
      "rotate-in": "{from{transform-origin:center;transform:rotate3d(0,0,1,-200deg);opacity:0}to{transform-origin:center;transform:translate3d(0,0,0);opacity:1}}",
      "rotate-in-down-left": "{from{transform-origin:left bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}to{transform-origin:left bottom;transform:translate3d(0,0,0);opacity:1}}",
      "rotate-in-down-right": "{from{transform-origin:right bottom;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:right bottom;transform:translate3d(0,0,0);opacity:1}}",
      "rotate-in-up-left": "{from{transform-origin:left top;transform:rotate3d(0,0,1,45deg);opacity:0}to{transform-origin:left top;transform:translate3d(0,0,0);opacity:1}}",
      "rotate-in-up-right": "{from{transform-origin:right bottom;transform:rotate3d(0,0,1,-90deg);opacity:0}to{transform-origin:right bottom;transform:translate3d(0,0,0);opacity:1}}",
      "rotate-out": "{from{transform-origin:center;opacity:1}to{transform-origin:center;transform:rotate3d(0,0,1,200deg);opacity:0}}",
      "rotate-out-down-left": "{from{transform-origin:left bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,45deg);opacity:0}}",
      "rotate-out-down-right": "{from{transform-origin:right bottom;opacity:1}to{transform-origin:right bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}}",
      "rotate-out-up-left": "{from{transform-origin:left bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,-45deg);opacity:0}}",
      "rotate-out-up-right": "{from{transform-origin:right bottom;opacity:1}to{transform-origin:left bottom;transform:rotate3d(0,0,1,90deg);opacity:0}}",
      "roll-in": "{from{opacity:0;transform:translate3d(-100%,0,0) rotate3d(0,0,1,-120deg)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "roll-out": "{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0) rotate3d(0,0,1,120deg)}}",
      "zoom-in": "{from{opacity:0;transform:scale3d(0.3,0.3,0.3)}50%{opacity:1}}",
      "zoom-in-down": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,-1000px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
      "zoom-in-left": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(-1000px,0,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(10px,0,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
      "zoom-in-right": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(1000px,0,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(-10px,0,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
      "zoom-in-up": "{from{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,1000px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
      "zoom-out": "{from{opacity:1}50%{opacity:0;transform:scale3d(0.3,0.3,0.3)}to{opacity:0}}",
      "zoom-out-down": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
      "zoom-out-left": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(42px,0,0)}to{opacity:0;transform:scale(0.1) translate3d(-2000px,0,0);transform-origin:left center}}",
      "zoom-out-right": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(-42px,0,0)}to{opacity:0;transform:scale(0.1) translate3d(2000px,0,0);transform-origin:right center}}",
      "zoom-out-up": "{40%{opacity:1;transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;transform:scale3d(0.1,0.1,0.1) translate3d(0,-2000px,0);transform-origin:center bottom;animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}",
      "bounce-in": "{from,20%,40%,60%,80%,to{animation-timing-function:ease-in-out}0%{opacity:0;transform:scale3d(0.3,0.3,0.3)}20%{transform:scale3d(1.1,1.1,1.1)}40%{transform:scale3d(0.9,0.9,0.9)}60%{transform:scale3d(1.03,1.03,1.03);opacity:1}80%{transform:scale3d(0.97,0.97,0.97)}to{opacity:1;transform:scale3d(1,1,1)}}",
      "bounce-in-down": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:translate3d(0,0,0)}}",
      "bounce-in-left": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:translate3d(0,0,0)}}",
      "bounce-in-right": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:translate3d(0,0,0)}}",
      "bounce-in-up": "{from,60%,75%,90%,to{animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translate3d(0,0,0)}}",
      "bounce-out": "{20%{transform:scale3d(0.9,0.9,0.9)}50%,55%{opacity:1;transform:scale3d(1.1,1.1,1.1)}to{opacity:0;transform:scale3d(0.3,0.3,0.3)}}",
      "bounce-out-down": "{20%{transform:translate3d(0,10px,0)}40%,45%{opacity:1;transform:translate3d(0,-20px,0)}to{opacity:0;transform:translate3d(0,2000px,0)}}",
      "bounce-out-left": "{20%{opacity:1;transform:translate3d(20px,0,0)}to{opacity:0;transform:translate3d(-2000px,0,0)}}",
      "bounce-out-right": "{20%{opacity:1;transform:translate3d(-20px,0,0)}to{opacity:0;transform:translate3d(2000px,0,0)}}",
      "bounce-out-up": "{20%{transform:translate3d(0,-10px,0)}40%,45%{opacity:1;transform:translate3d(0,20px,0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}",
      "slide-in-down": "{from{transform:translate3d(0,-100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
      "slide-in-left": "{from{transform:translate3d(-100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
      "slide-in-right": "{from{transform:translate3d(100%,0,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
      "slide-in-up": "{from{transform:translate3d(0,100%,0);visibility:visible}to{transform:translate3d(0,0,0)}}",
      "slide-out-down": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(0,100%,0)}}",
      "slide-out-left": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(-100%,0,0)}}",
      "slide-out-right": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(100%,0,0)}}",
      "slide-out-up": "{from{transform:translate3d(0,0,0)}to{visibility:hidden;transform:translate3d(0,-100%,0)}}",
      "fade-in": "{from{opacity:0}to{opacity:1}}",
      "fade-in-down": "{from{opacity:0;transform:translate3d(0,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-down-big": "{from{opacity:0;transform:translate3d(0,-2000px,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-left": "{from{opacity:0;transform:translate3d(-100%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-left-big": "{from{opacity:0;transform:translate3d(-2000px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-right": "{from{opacity:0;transform:translate3d(100%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-right-big": "{from{opacity:0;transform:translate3d(2000px,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-up": "{from{opacity:0;transform:translate3d(0,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-up-big": "{from{opacity:0;transform:translate3d(0,2000px,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-top-left": "{from{opacity:0;transform:translate3d(-100%,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-top-right": "{from{opacity:0;transform:translate3d(100%,-100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-bottom-left": "{from{opacity:0;transform:translate3d(-100%,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-in-bottom-right": "{from{opacity:0;transform:translate3d(100%,100%,0)}to{opacity:1;transform:translate3d(0,0,0)}}",
      "fade-out": "{from{opacity:1}to{opacity:0}}",
      "fade-out-down": "{from{opacity:1}to{opacity:0;transform:translate3d(0,100%,0)}}",
      "fade-out-down-big": "{from{opacity:1}to{opacity:0;transform:translate3d(0,2000px,0)}}",
      "fade-out-left": "{from{opacity:1}to{opacity:0;transform:translate3d(-100%,0,0)}}",
      "fade-out-left-big": "{from{opacity:1}to{opacity:0;transform:translate3d(-2000px,0,0)}}",
      "fade-out-right": "{from{opacity:1}to{opacity:0;transform:translate3d(100%,0,0)}}",
      "fade-out-right-big": "{from{opacity:1}to{opacity:0;transform:translate3d(2000px,0,0)}}",
      "fade-out-up": "{from{opacity:1}to{opacity:0;transform:translate3d(0,-100%,0)}}",
      "fade-out-up-big": "{from{opacity:1}to{opacity:0;transform:translate3d(0,-2000px,0)}}",
      "fade-out-top-left": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(-100%,-100%,0)}}",
      "fade-out-top-right": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(100%,-100%,0)}}",
      "fade-out-bottom-left": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(-100%,100%,0)}}",
      "fade-out-bottom-right": "{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(100%,100%,0)}}",
      "back-in-up": "{0%{opacity:0.7;transform:translateY(1200px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
      "back-in-down": "{0%{opacity:0.7;transform:translateY(-1200px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
      "back-in-right": "{0%{opacity:0.7;transform:translateX(2000px) scale(0.7)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
      "back-in-left": "{0%{opacity:0.7;transform:translateX(-2000px) scale(0.7)}80%{opacity:0.7;transform:translateX(0px) scale(0.7)}100%{opacity:1;transform:scale(1)}}",
      "back-out-up": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateY(-700px) scale(0.7)}}",
      "back-out-down": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateY(700px) scale(0.7)}}",
      "back-out-right": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateY(0px) scale(0.7)}100%{opacity:0.7;transform:translateX(2000px) scale(0.7)}}",
      "back-out-left": "{0%{opacity:1;transform:scale(1)}80%{opacity:0.7;transform:translateX(-2000px) scale(0.7)}100%{opacity:0.7;transform:translateY(-700px) scale(0.7)}}"
    },
    durations: {
      pulse: "2s",
      "heart-beat": "1.3s",
      "bounce-in": "0.75s",
      "bounce-out": "0.75s",
      "flip-out-x": "0.75s",
      "flip-out-y": "0.75s",
      hinge: "2s"
    },
    timingFns: {
      pulse: "cubic-bezier(0.4,0,.6,1)",
      ping: "cubic-bezier(0,0,.2,1)",
      "head-shake": "ease-in-out",
      "heart-beat": "ease-in-out",
      "pulse-alt": "ease-in-out",
      "light-speed-in-left": "ease-out",
      "light-speed-in-right": "ease-out",
      "light-speed-out-left": "ease-in",
      "light-speed-out-right": "ease-in"
    },
    properties: {
      "bounce-alt": { "transform-origin": "center bottom" },
      jello: { "transform-origin": "center" },
      swing: { "transform-origin": "top center" },
      flip: { "backface-visibility": "visible" },
      "flip-in-x": { "backface-visibility": "visible !important" },
      "flip-in-y": { "backface-visibility": "visible !important" },
      "flip-out-x": { "backface-visibility": "visible !important" },
      "flip-out-y": { "backface-visibility": "visible !important" },
      "rotate-in": { "transform-origin": "center" },
      "rotate-in-down-left": { "transform-origin": "left bottom" },
      "rotate-in-down-right": { "transform-origin": "right bottom" },
      "rotate-in-up-left": { "transform-origin": "left bottom" },
      "rotate-in-up-right": { "transform-origin": "right bottom" },
      "rotate-out": { "transform-origin": "center" },
      "rotate-out-down-left": { "transform-origin": "left bottom" },
      "rotate-out-down-right": { "transform-origin": "right bottom" },
      "rotate-out-up-left": { "transform-origin": "left bottom" },
      "rotate-out-up-right": { "transform-origin": "right bottom" },
      hinge: { "transform-origin": "top left" },
      "zoom-out-down": { "transform-origin": "center bottom" },
      "zoom-out-left": { "transform-origin": "left center" },
      "zoom-out-right": { "transform-origin": "right center" },
      "zoom-out-up": { "transform-origin": "center bottom" }
    },
    counts: {
      spin: "infinite",
      ping: "infinite",
      pulse: "infinite",
      "pulse-alt": "infinite",
      bounce: "infinite",
      "bounce-alt": "infinite"
    }
  },
  media: {
    portrait: "(orientation: portrait)",
    landscape: "(orientation: landscape)",
    os_dark: "(prefers-color-scheme: dark)",
    os_light: "(prefers-color-scheme: light)",
    motion_ok: "(prefers-reduced-motion: no-preference)",
    motion_not_ok: "(prefers-reduced-motion: reduce)",
    high_contrast: "(prefers-contrast: high)",
    low_contrast: "(prefers-contrast: low)",
    opacity_ok: "(prefers-reduced-transparency: no-preference)",
    opacity_not_ok: "(prefers-reduced-transparency: reduce)",
    use_data_ok: "(prefers-reduced-data: no-preference)",
    use_data_not_ok: "(prefers-reduced-data: reduce)",
    touch: "(hover: none) and (pointer: coarse)",
    stylus: "(hover: none) and (pointer: fine)",
    pointer: "(hover) and (pointer: coarse)",
    mouse: "(hover) and (pointer: fine)",
    hd_color: "(dynamic-range: high)"
  },
  supports: {
    grid: "(display: grid)"
  },
  preflightBase: {
    ...transformBase,
    ...touchActionBase,
    ...scrollSnapTypeBase,
    ...fontVariantNumericBase,
    ...borderSpacingBase,
    ...boxShadowsBase,
    ...ringBase,
    ...filterBase,
    ...backdropFilterBase
  }
};
var variantCombinators2 = [
  variantMatcher("svg", (input) => ({ selector: `${input.selector} svg` }))
];
var variantColorsScheme = [
  variantMatcher(".dark", (input) => ({ prefix: `.dark \$\$ ${input.prefix}` })),
  variantMatcher(".light", (input) => ({ prefix: `.light \$\$ ${input.prefix}` })),
  variantParentMatcher("@dark", "@media (prefers-color-scheme: dark)"),
  variantParentMatcher("@light", "@media (prefers-color-scheme: light)")
];
var variantContrasts = [
  variantParentMatcher("contrast-more", "@media (prefers-contrast: more)"),
  variantParentMatcher("contrast-less", "@media (prefers-contrast: less)")
];
var variantMotions = [
  variantParentMatcher("motion-reduce", "@media (prefers-reduced-motion: reduce)"),
  variantParentMatcher("motion-safe", "@media (prefers-reduced-motion: no-preference)")
];
var variantOrientations = [
  variantParentMatcher("landscape", "@media (orientation: landscape)"),
  variantParentMatcher("portrait", "@media (orientation: portrait)")
];
var variantSpaceAndDivide = (matcher) => {
  if (matcher.startsWith("_"))
    return;
  if (/space-([xy])-(-?.+)$/.test(matcher) || /divide-/.test(matcher)) {
    return {
      matcher,
      selector: (input) => {
        const not = ">:not([hidden])~:not([hidden])";
        return input.includes(not) ? input : `${input}${not}`;
      }
    };
  }
};
var variantStickyHover = [
  variantMatcher("@hover", (input) => ({
    parent: `${input.parent ? `${input.parent} \$\$ ` : ""}@media (hover: hover) and (pointer: fine)`,
    selector: `${input.selector || ""}:hover`
  }))
];
var placeholderModifier = (input, { theme: theme4 }) => {
  const m = input.match(/^(.*)\b(placeholder-)(.+)$/);
  if (m) {
    const [, pre = "", p, body] = m;
    if (hasParseableColor(body, theme4, "accentColor") || hasOpacityValue(body)) {
      return {
        matcher: `${pre}placeholder-\$ ${p}${body}`
      };
    }
  }
};
var presetWind = definePreset((options = {}) => {
  options.important = options.important ?? false;
  return {
    ...presetMini(options),
    name: "@unocss/preset-wind",
    theme: theme3,
    rules: rules3,
    shortcuts,
    variants: variants3(options),
    postprocess: postprocessors(options)
  };
});

// node_modules/@unocss/preset-uno/dist/index.mjs
var mixComponent = function(v1, v2, w) {
  return `calc(${v2} + (${v1} - ${v2}) * ${w} / 100)`;
};
var mixColor = function(color1, color2, weight) {
  const colors3 = [color1, color2];
  const cssColors = [];
  for (let c = 0;c < 2; c++) {
    const color = typeof colors3[c] === "string" ? parseCssColor(colors3[c]) : colors3[c];
    if (!color || !["rgb", "rgba"].includes(color.type))
      return;
    cssColors.push(color);
  }
  const newComponents = [];
  for (let x = 0;x < 3; x++)
    newComponents.push(mixComponent(cssColors[0].components[x], cssColors[1].components[x], weight));
  return {
    type: "rgb",
    components: newComponents,
    alpha: mixComponent(cssColors[0].alpha ?? 1, cssColors[1].alpha ?? 1, weight)
  };
};
var tint = function(color, weight) {
  return mixColor("#fff", color, weight);
};
var shade = function(color, weight) {
  return mixColor("#000", color, weight);
};
var shift = function(color, weight) {
  const num = Number.parseFloat(`${weight}`);
  if (!Number.isNaN(num))
    return num > 0 ? shade(color, weight) : tint(color, -num);
};
var variantColorMix = function() {
  let re;
  return {
    name: "mix",
    match(matcher, ctx) {
      if (!re)
        re = new RegExp(`^mix-(tint|shade|shift)-(-?\\d{1,3})(?:${ctx.generator.config.separators.join("|")})`);
      const m = matcher.match(re);
      if (m) {
        return {
          matcher: matcher.slice(m[0].length),
          body: (body) => {
            body.forEach((v) => {
              if (v[1]) {
                const color = parseCssColor(`${v[1]}`);
                if (color) {
                  const mixed = fns[m[1]](color, m[2]);
                  if (mixed)
                    v[1] = colorToString(mixed);
                }
              }
            });
            return body;
          }
        };
      }
    }
  };
};
var fns = { tint, shade, shift };
var presetUno = definePreset((options = {}) => {
  const wind = presetWind(options);
  return {
    ...wind,
    name: "@unocss/preset-uno",
    variants: [
      ...wind.variants,
      variantColorMix()
    ]
  };
});

// libraries/solenopsys/converged-style/src/browser/utils.ts
var camelize = function(str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : "");
};
var capitalize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
var hyphenate = function(str) {
  return str.replace(/(?:^|\B)([A-Z])/g, "-$1").toLowerCase();
};
function autoPrefixer(style) {
  const prefixCache = {};
  function autoPrefix(rawName) {
    const cached = prefixCache[rawName];
    if (cached)
      return cached;
    let name = camelize(rawName);
    if (name !== "filter" && name in style)
      return prefixCache[rawName] = hyphenate(name);
    name = capitalize(name);
    for (let i = 0;i < prefixes.length; i++) {
      const prefixed = `${prefixes[i]}${name}`;
      if (prefixed in style)
        return prefixCache[rawName] = hyphenate(capitalize(prefixed));
    }
    return rawName;
  }
  return ({ entries }) => entries.forEach((e2) => {
    if (!e2[0].startsWith("--"))
      e2[0] = autoPrefix(e2[0]);
  });
}
function decodeHtml(html) {
  return html.replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<");
}
var prefixes = ["Webkit", "Moz", "ms"];

// libraries/solenopsys/converged-style/src/browser/config.ts
var getDefinedCssSelectors = function(selectors = new Set) {
  for (let i = 0;i < document.styleSheets.length; i++) {
    const sheet = document.styleSheets[i];
    let list;
    try {
      list = sheet.cssRules || sheet.rules;
      if (!list)
        continue;
      Array.from(list).flatMap((r) => r.selectorText?.split(/,/g) || []).forEach((s) => {
        if (!s)
          return;
        s = s.trim();
        if (s.startsWith("."))
          s = s.slice(1);
        selectors.add(s);
      });
    } catch (e2) {
      continue;
    }
  }
  return selectors;
};
function init(inlineConfig = {}) {
  if (typeof window == "undefined") {
    console.warn("@unocss/runtime been used in non-browser environment, skipped.");
    return;
  }
  const defaultWindow = window;
  const defaultDocument = window.document;
  const html = () => defaultDocument.documentElement;
  const userConfig = defaultWindow.__unocss || {};
  const runtimeOptions = Object.assign({}, inlineConfig, userConfig.runtime);
  const userConfigDefaults = runtimeOptions.defaults || {};
  const cloakAttribute = runtimeOptions.cloakAttribute ?? "un-cloak";
  if (runtimeOptions.autoPrefix) {
    const postprocessors2 = userConfigDefaults.postprocess = toArray(userConfigDefaults.postprocess);
    postprocessors2.unshift(autoPrefixer(defaultDocument.createElement("div").style));
  }
  runtimeOptions.configResolved?.(userConfig, userConfigDefaults);
  const uno = createGenerator(userConfig, userConfigDefaults);
  const inject = (styleElement) => runtimeOptions.inject ? runtimeOptions.inject(styleElement) : html().prepend(styleElement);
  const rootElement = () => runtimeOptions.rootElement ? runtimeOptions.rootElement() : defaultDocument.body;
  const styleElements = new Map;
  let paused = true;
  let tokens = new Set;
  let inspector;
  let _timer;
  let _resolvers = [];
  const scheduleUpdate = () => new Promise((resolve) => {
    _resolvers.push(resolve);
    if (_timer != null)
      clearTimeout(_timer);
    _timer = setTimeout(() => updateStyle().then(() => {
      const resolvers = _resolvers;
      _resolvers = [];
      resolvers.forEach((r) => r());
    }), 0);
  });
  function removeCloak(node) {
    if (node.nodeType !== 1)
      return;
    const el = node;
    if (el.hasAttribute(cloakAttribute))
      el.removeAttribute(cloakAttribute);
    el.querySelectorAll(`[${cloakAttribute}]`).forEach((n2) => {
      n2.removeAttribute(cloakAttribute);
    });
  }
  function getStyleElement(layer, previousLayer) {
    let styleElement = styleElements.get(layer);
    if (!styleElement) {
      styleElement = defaultDocument.createElement("style");
      styleElement.setAttribute("data-unocss-runtime-layer", layer);
      styleElements.set(layer, styleElement);
      if (previousLayer == null) {
        inject(styleElement);
      } else {
        const previousStyle = getStyleElement(previousLayer);
        const parentNode = previousStyle.parentNode;
        if (parentNode)
          parentNode.insertBefore(styleElement, previousStyle.nextSibling);
        else
          inject(styleElement);
      }
    }
    return styleElement;
  }
  async function updateStyle() {
    const result = await uno.generate(tokens);
    result.layers.reduce((previous, current) => {
      getStyleElement(current, previous).innerHTML = result.getLayer(current) ?? "";
      return current;
    }, undefined);
    tokens = result.matched;
    return {
      ...result,
      getStyleElement: (layer) => styleElements.get(layer),
      getStyleElements: () => styleElements
    };
  }
  async function extract(str) {
    const tokenSize = tokens.size;
    await uno.applyExtractors(str, undefined, tokens);
    if (tokenSize !== tokens.size)
      await scheduleUpdate();
  }
  async function extractAll(target = rootElement()) {
    const outerHTML = target && target.outerHTML;
    if (outerHTML) {
      await extract(`${outerHTML} ${decodeHtml(outerHTML)}`);
      removeCloak(html());
      removeCloak(target);
    }
  }
  const mutationObserver = new MutationObserver((mutations) => {
    if (paused)
      return;
    mutations.forEach(async (mutation) => {
      if (mutation.target.nodeType !== 1)
        return;
      const target = mutation.target;
      for (const item of styleElements) {
        if (target === item[1])
          return;
      }
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach(async (node) => {
          if (node.nodeType !== 1)
            return;
          const el = node;
          if (inspector && !inspector(el))
            return;
          await extract(el.outerHTML);
          removeCloak(el);
        });
      } else {
        if (inspector && !inspector(target))
          return;
        if (mutation.attributeName !== cloakAttribute) {
          const attrs = Array.from(target.attributes).map((i) => i.value ? `${i.name}="${i.value}"` : i.name).join(" ");
          const tag = `<${target.tagName.toLowerCase()} ${attrs}>`;
          await extract(tag);
        }
        if (target.hasAttribute(cloakAttribute))
          target.removeAttribute(cloakAttribute);
      }
    });
  });
  let observing = false;
  function observe() {
    if (observing)
      return;
    const target = runtimeOptions.observer?.target ? runtimeOptions.observer.target() : rootElement();
    if (!target)
      return;
    mutationObserver.observe(target, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: runtimeOptions.observer?.attributeFilter
    });
    observing = true;
  }
  function execute() {
    if (runtimeOptions.bypassDefined)
      getDefinedCssSelectors(uno.blocked);
    extractAll();
    observe();
  }
  function ready() {
    if (defaultDocument.readyState === "loading")
      defaultWindow.addEventListener("DOMContentLoaded", execute);
    else
      execute();
  }
  const unoCssRuntime = defaultWindow.__unocss_runtime = defaultWindow.__unocss_runtime = {
    version: uno.version,
    uno,
    async extract(userTokens) {
      if (!isString(userTokens)) {
        userTokens.forEach((t) => tokens.add(t));
        userTokens = "";
      }
      await extract(userTokens);
    },
    extractAll,
    inspect(callback) {
      inspector = callback;
    },
    toggleObserver(set) {
      if (set === undefined)
        paused = !paused;
      else
        paused = !!set;
      if (!observing && !paused)
        ready();
    },
    update: updateStyle,
    presets: defaultWindow.__unocss_runtime?.presets ?? {}
  };
  if (runtimeOptions.ready?.(unoCssRuntime) !== false) {
    paused = false;
    ready();
  }
}

// node_modules/@unocss/preset-attributify/dist/index.mjs
var variantAttributify = function(options = {}) {
  const prefix = options.prefix ?? "un-";
  const prefixedOnly = options.prefixedOnly ?? false;
  const trueToNonValued = options.trueToNonValued ?? false;
  let variantsValueRE;
  return {
    name: "attributify",
    match(input, { generator }) {
      const match = isAttributifySelector(input);
      if (!match)
        return;
      let name = match[1];
      if (name.startsWith(prefix))
        name = name.slice(prefix.length);
      else if (prefixedOnly)
        return;
      const content = match[2];
      const [, variants4 = "", body = content] = content.match(variantsRE) || [];
      if (body === "~" || trueToNonValued && body === "true" || !body)
        return `${variants4}${name}`;
      if (variantsValueRE == null) {
        const separators = generator?.config?.separators?.join("|");
        if (separators)
          variantsValueRE = new RegExp(`^(.*\\](?:${separators}))(\\[[^\\]]+?\\])\$`);
        else
          variantsValueRE = false;
      }
      if (variantsValueRE) {
        const [, bodyVariant, bracketValue] = content.match(variantsValueRE) || [];
        if (bracketValue)
          return `${bodyVariant}${variants4}${name}-${bracketValue}`;
      }
      return `${variants4}${name}-${body}`;
    }
  };
};
var autocompleteExtractorAttributify = function(options) {
  return {
    name: "attributify",
    extract: ({ content, cursor }) => {
      const matchedElements = content.matchAll(elementRE$1);
      let attrs;
      let elPos = 0;
      for (const match of matchedElements) {
        const [, prefix, content2] = match;
        const currentPos2 = match.index + prefix.length;
        if (cursor > currentPos2 && cursor <= currentPos2 + content2.length) {
          elPos = currentPos2;
          attrs = content2;
          break;
        }
      }
      if (!attrs)
        return null;
      const matchedAttributes = attrs.matchAll(valuedAttributeRE$1);
      let attrsPos = 0;
      let attrName;
      let attrValues;
      for (const match of matchedAttributes) {
        const [matched, name, rawValues] = match;
        const currentPos2 = elPos + match.index;
        if (cursor > currentPos2 && cursor <= currentPos2 + matched.length) {
          attrsPos = currentPos2;
          attrName = name;
          attrValues = rawValues?.slice(1);
          break;
        }
      }
      if (!attrName)
        return null;
      if (attrName === "class" || attrName === "className" || attrName === ":class")
        return null;
      const hasPrefix = !!options?.prefix && attrName.startsWith(options.prefix);
      if (options?.prefixedOnly && !hasPrefix)
        return null;
      const attrNameWithoutPrefix = hasPrefix ? attrName.slice(options.prefix.length) : attrName;
      if (attrValues === undefined) {
        return {
          extracted: attrNameWithoutPrefix,
          resolveReplacement(suggestion) {
            const startOffset = hasPrefix ? options.prefix.length : 0;
            return {
              start: attrsPos + startOffset,
              end: attrsPos + attrName.length,
              replacement: suggestion
            };
          }
        };
      }
      const attrValuePos = attrsPos + attrName.length + 2;
      let matchSplit = splitterRE$1.exec(attrValues);
      let currentPos = 0;
      let value;
      while (matchSplit) {
        const [matched] = matchSplit;
        if (cursor > attrValuePos + currentPos && cursor <= attrValuePos + currentPos + matchSplit.index) {
          value = attrValues.slice(currentPos, currentPos + matchSplit.index);
          break;
        }
        currentPos += matchSplit.index + matched.length;
        matchSplit = splitterRE$1.exec(attrValues.slice(currentPos));
      }
      if (value === undefined)
        value = attrValues.slice(currentPos);
      const [, variants4 = "", body] = value.match(variantsRE) || [];
      return {
        extracted: `${variants4}${attrNameWithoutPrefix}-${body}`,
        transformSuggestions(suggestions) {
          return suggestions.filter((v) => v.startsWith(`${variants4}${attrNameWithoutPrefix}-`)).map((v) => variants4 + v.slice(variants4.length + attrNameWithoutPrefix.length + 1));
        },
        resolveReplacement(suggestion) {
          return {
            start: currentPos + attrValuePos,
            end: currentPos + attrValuePos + value.length,
            replacement: variants4 + suggestion.slice(variants4.length + attrNameWithoutPrefix.length + 1)
          };
        }
      };
    }
  };
};
var extractorAttributify = function(options) {
  const ignoreAttributes = options?.ignoreAttributes ?? defaultIgnoreAttributes;
  const nonValuedAttribute = options?.nonValuedAttribute ?? true;
  const trueToNonValued = options?.trueToNonValued ?? false;
  return {
    name: "@unocss/preset-attributify/extractor",
    extract({ code }) {
      return Array.from(code.matchAll(elementRE)).flatMap((match) => Array.from((match[1] || "").matchAll(valuedAttributeRE))).flatMap(([, name, ...contents2]) => {
        const content = contents2.filter(Boolean).join("");
        if (ignoreAttributes.includes(name))
          return [];
        for (const prefix of strippedPrefixes) {
          if (name.startsWith(prefix)) {
            name = name.slice(prefix.length);
            break;
          }
        }
        if (!content) {
          if (isValidSelector(name) && nonValuedAttribute !== false) {
            const result = [`[${name}=""]`];
            if (trueToNonValued)
              result.push(`[${name}="true"]`);
            return result;
          }
          return [];
        }
        if (["class", "className"].includes(name)) {
          return content.split(splitterRE).filter(isValidSelector);
        } else if (elementRE.test(content)) {
          elementRE.lastIndex = 0;
          return this.extract({ code: content });
        } else {
          if (options?.prefixedOnly && options.prefix && !name.startsWith(options.prefix))
            return [];
          return content.split(splitterRE).filter((v) => Boolean(v) && v !== ":").map((v) => `[${name}~="${v}"]`);
        }
      });
    }
  };
};
var variantsRE = /^(?!.*\[(?:[^:]+):(?:.+)\]$)((?:.+:)?!?)?(.*)$/;
var elementRE$1 = /(<\w[\w:\.$-]*\s)((?:'[^>]*?'|"[^>]*?"|`[^>]*?`|\{[^>]*?\}|[^>]*?)*)/g;
var valuedAttributeRE$1 = /([?]|(?!\d|-{2}|-\d)[a-zA-Z0-9\u00A0-\uFFFF-_:%-]+)(?:=("[^"]*|'[^']*))?/g;
var splitterRE$1 = /[\s'"`;>]+/;
var strippedPrefixes = [
  "v-bind:",
  ":"
];
var splitterRE = /[\s'"`;]+/g;
var elementRE = /<[^>\s]*\s((?:'.*?'|".*?"|`.*?`|\{.*?\}|=>|[^>]*?)*)/g;
var valuedAttributeRE = /([?]|(?!\d|-{2}|-\d)[a-zA-Z0-9\u00A0-\uFFFF-_:!%-.~<]+)=?(?:["]([^"]*)["]|[']([^']*)[']|[{]([^}]*)[}])?/gms;
var defaultIgnoreAttributes = ["placeholder", "fill", "opacity", "stroke-opacity"];
var presetAttributify = definePreset((options = {}) => {
  options.strict = options.strict ?? false;
  options.prefix = options.prefix ?? "un-";
  options.prefixedOnly = options.prefixedOnly ?? false;
  options.nonValuedAttribute = options.nonValuedAttribute ?? true;
  options.ignoreAttributes = options.ignoreAttributes ?? defaultIgnoreAttributes;
  const variants4 = [
    variantAttributify(options)
  ];
  const extractors = [
    extractorAttributify(options)
  ];
  const autocompleteExtractors = [
    autocompleteExtractorAttributify(options)
  ];
  return {
    name: "@unocss/preset-attributify",
    enforce: "post",
    variants: variants4,
    extractors,
    options,
    autocomplete: {
      extractors: autocompleteExtractors
    },
    extractorDefault: options.strict ? false : undefined
  };
});

// libraries/solenopsys/converged-style/src/index.ts
init({
  defaults: {
    presets: [presetMini(), presetAttributify()]
  }
});
window.__unocss_runtime = window.__unocss_runtime ?? {};
window.__unocss_runtime.presets = Object.assign(window.__unocss_runtime?.presets ?? {}, {
  presetUno: (options) => presetUno(options)
});
export {
  injectStyle,
  StylesInjector
};
