function un(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var ht = { exports: {} },
  W = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ar;
function go() {
  if (Ar) return W;
  Ar = 1;
  var e = Symbol.for("react.transitional.element"),
    t = Symbol.for("react.portal"),
    r = Symbol.for("react.fragment"),
    n = Symbol.for("react.strict_mode"),
    o = Symbol.for("react.profiler"),
    a = Symbol.for("react.consumer"),
    s = Symbol.for("react.context"),
    u = Symbol.for("react.forward_ref"),
    f = Symbol.for("react.suspense"),
    l = Symbol.for("react.memo"),
    d = Symbol.for("react.lazy"),
    h = Symbol.for("react.activity"),
    m = Symbol.iterator;
  function T(c) {
    return c === null || typeof c != "object"
      ? null
      : ((c = (m && c[m]) || c["@@iterator"]),
        typeof c == "function" ? c : null);
  }
  var b = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    R = Object.assign,
    y = {};
  function C(c, S, P) {
    (this.props = c),
      (this.context = S),
      (this.refs = y),
      (this.updater = P || b);
  }
  (C.prototype.isReactComponent = {}),
    (C.prototype.setState = function (c, S) {
      if (typeof c != "object" && typeof c != "function" && c != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, c, S, "setState");
    }),
    (C.prototype.forceUpdate = function (c) {
      this.updater.enqueueForceUpdate(this, c, "forceUpdate");
    });
  function v() {}
  v.prototype = C.prototype;
  function A(c, S, P) {
    (this.props = c),
      (this.context = S),
      (this.refs = y),
      (this.updater = P || b);
  }
  var L = (A.prototype = new v());
  (L.constructor = A), R(L, C.prototype), (L.isPureReactComponent = !0);
  var $ = Array.isArray;
  function q() {}
  var j = { H: null, A: null, T: null, S: null },
    H = Object.prototype.hasOwnProperty;
  function z(c, S, P) {
    var E = P.ref;
    return {
      $$typeof: e,
      type: c,
      key: S,
      ref: E !== void 0 ? E : null,
      props: P,
    };
  }
  function ee(c, S) {
    return z(c.type, S, c.props);
  }
  function re(c) {
    return typeof c == "object" && c !== null && c.$$typeof === e;
  }
  function V(c) {
    var S = { "=": "=0", ":": "=2" };
    return (
      "$" +
      c.replace(/[=:]/g, function (P) {
        return S[P];
      })
    );
  }
  var se = /\/+/g;
  function te(c, S) {
    return typeof c == "object" && c !== null && c.key != null
      ? V("" + c.key)
      : S.toString(36);
  }
  function le(c) {
    switch (c.status) {
      case "fulfilled":
        return c.value;
      case "rejected":
        throw c.reason;
      default:
        switch (
          (typeof c.status == "string"
            ? c.then(q, q)
            : ((c.status = "pending"),
              c.then(
                function (S) {
                  c.status === "pending" &&
                    ((c.status = "fulfilled"), (c.value = S));
                },
                function (S) {
                  c.status === "pending" &&
                    ((c.status = "rejected"), (c.reason = S));
                }
              )),
          c.status)
        ) {
          case "fulfilled":
            return c.value;
          case "rejected":
            throw c.reason;
        }
    }
    throw c;
  }
  function K(c, S, P, E, k) {
    var g = typeof c;
    (g === "undefined" || g === "boolean") && (c = null);
    var O = !1;
    if (c === null) O = !0;
    else
      switch (g) {
        case "bigint":
        case "string":
        case "number":
          O = !0;
          break;
        case "object":
          switch (c.$$typeof) {
            case e:
            case t:
              O = !0;
              break;
            case d:
              return (O = c._init), K(O(c._payload), S, P, E, k);
          }
      }
    if (O)
      return (
        (k = k(c)),
        (O = E === "" ? "." + te(c, 0) : E),
        $(k)
          ? ((P = ""),
            O != null && (P = O.replace(se, "$&/") + "/"),
            K(k, S, P, "", function (F) {
              return F;
            }))
          : k != null &&
            (re(k) &&
              (k = ee(
                k,
                P +
                  (k.key == null || (c && c.key === k.key)
                    ? ""
                    : ("" + k.key).replace(se, "$&/") + "/") +
                  O
              )),
            S.push(k)),
        1
      );
    O = 0;
    var M = E === "" ? "." : E + ":";
    if ($(c))
      for (var U = 0; U < c.length; U++)
        (E = c[U]), (g = M + te(E, U)), (O += K(E, S, P, g, k));
    else if (((U = T(c)), typeof U == "function"))
      for (c = U.call(c), U = 0; !(E = c.next()).done; )
        (E = E.value), (g = M + te(E, U++)), (O += K(E, S, P, g, k));
    else if (g === "object") {
      if (typeof c.then == "function") return K(le(c), S, P, E, k);
      throw (
        ((S = String(c)),
        Error(
          "Objects are not valid as a React child (found: " +
            (S === "[object Object]"
              ? "object with keys {" + Object.keys(c).join(", ") + "}"
              : S) +
            "). If you meant to render a collection of children, use an array instead."
        ))
      );
    }
    return O;
  }
  function ce(c, S, P) {
    if (c == null) return c;
    var E = [],
      k = 0;
    return (
      K(c, E, "", "", function (g) {
        return S.call(P, g, k++);
      }),
      E
    );
  }
  function ae(c) {
    if (c._status === -1) {
      var S = c._result;
      (S = S()),
        S.then(
          function (P) {
            (c._status === 0 || c._status === -1) &&
              ((c._status = 1), (c._result = P));
          },
          function (P) {
            (c._status === 0 || c._status === -1) &&
              ((c._status = 2), (c._result = P));
          }
        ),
        c._status === -1 && ((c._status = 0), (c._result = S));
    }
    if (c._status === 1) return c._result.default;
    throw c._result;
  }
  var fe =
      typeof reportError == "function"
        ? reportError
        : function (c) {
            if (
              typeof window == "object" &&
              typeof window.ErrorEvent == "function"
            ) {
              var S = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof c == "object" &&
                  c !== null &&
                  typeof c.message == "string"
                    ? String(c.message)
                    : String(c),
                error: c,
              });
              if (!window.dispatchEvent(S)) return;
            } else if (
              typeof process == "object" &&
              typeof process.emit == "function"
            ) {
              process.emit("uncaughtException", c);
              return;
            }
            console.error(c);
          },
    me = {
      map: ce,
      forEach: function (c, S, P) {
        ce(
          c,
          function () {
            S.apply(this, arguments);
          },
          P
        );
      },
      count: function (c) {
        var S = 0;
        return (
          ce(c, function () {
            S++;
          }),
          S
        );
      },
      toArray: function (c) {
        return (
          ce(c, function (S) {
            return S;
          }) || []
        );
      },
      only: function (c) {
        if (!re(c))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return c;
      },
    };
  return (
    (W.Activity = h),
    (W.Children = me),
    (W.Component = C),
    (W.Fragment = r),
    (W.Profiler = o),
    (W.PureComponent = A),
    (W.StrictMode = n),
    (W.Suspense = f),
    (W.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = j),
    (W.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (c) {
        return j.H.useMemoCache(c);
      },
    }),
    (W.cache = function (c) {
      return function () {
        return c.apply(null, arguments);
      };
    }),
    (W.cacheSignal = function () {
      return null;
    }),
    (W.cloneElement = function (c, S, P) {
      if (c == null)
        throw Error(
          "The argument must be a React element, but you passed " + c + "."
        );
      var E = R({}, c.props),
        k = c.key;
      if (S != null)
        for (g in (S.key !== void 0 && (k = "" + S.key), S))
          !H.call(S, g) ||
            g === "key" ||
            g === "__self" ||
            g === "__source" ||
            (g === "ref" && S.ref === void 0) ||
            (E[g] = S[g]);
      var g = arguments.length - 2;
      if (g === 1) E.children = P;
      else if (1 < g) {
        for (var O = Array(g), M = 0; M < g; M++) O[M] = arguments[M + 2];
        E.children = O;
      }
      return z(c.type, k, E);
    }),
    (W.createContext = function (c) {
      return (
        (c = {
          $$typeof: s,
          _currentValue: c,
          _currentValue2: c,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (c.Provider = c),
        (c.Consumer = {
          $$typeof: a,
          _context: c,
        }),
        c
      );
    }),
    (W.createElement = function (c, S, P) {
      var E,
        k = {},
        g = null;
      if (S != null)
        for (E in (S.key !== void 0 && (g = "" + S.key), S))
          H.call(S, E) &&
            E !== "key" &&
            E !== "__self" &&
            E !== "__source" &&
            (k[E] = S[E]);
      var O = arguments.length - 2;
      if (O === 1) k.children = P;
      else if (1 < O) {
        for (var M = Array(O), U = 0; U < O; U++) M[U] = arguments[U + 2];
        k.children = M;
      }
      if (c && c.defaultProps)
        for (E in ((O = c.defaultProps), O)) k[E] === void 0 && (k[E] = O[E]);
      return z(c, g, k);
    }),
    (W.createRef = function () {
      return { current: null };
    }),
    (W.forwardRef = function (c) {
      return { $$typeof: u, render: c };
    }),
    (W.isValidElement = re),
    (W.lazy = function (c) {
      return {
        $$typeof: d,
        _payload: { _status: -1, _result: c },
        _init: ae,
      };
    }),
    (W.memo = function (c, S) {
      return {
        $$typeof: l,
        type: c,
        compare: S === void 0 ? null : S,
      };
    }),
    (W.startTransition = function (c) {
      var S = j.T,
        P = {};
      j.T = P;
      try {
        var E = c(),
          k = j.S;
        k !== null && k(P, E),
          typeof E == "object" &&
            E !== null &&
            typeof E.then == "function" &&
            E.then(q, fe);
      } catch (g) {
        fe(g);
      } finally {
        S !== null && P.types !== null && (S.types = P.types), (j.T = S);
      }
    }),
    (W.unstable_useCacheRefresh = function () {
      return j.H.useCacheRefresh();
    }),
    (W.use = function (c) {
      return j.H.use(c);
    }),
    (W.useActionState = function (c, S, P) {
      return j.H.useActionState(c, S, P);
    }),
    (W.useCallback = function (c, S) {
      return j.H.useCallback(c, S);
    }),
    (W.useContext = function (c) {
      return j.H.useContext(c);
    }),
    (W.useDebugValue = function () {}),
    (W.useDeferredValue = function (c, S) {
      return j.H.useDeferredValue(c, S);
    }),
    (W.useEffect = function (c, S) {
      return j.H.useEffect(c, S);
    }),
    (W.useEffectEvent = function (c) {
      return j.H.useEffectEvent(c);
    }),
    (W.useId = function () {
      return j.H.useId();
    }),
    (W.useImperativeHandle = function (c, S, P) {
      return j.H.useImperativeHandle(c, S, P);
    }),
    (W.useInsertionEffect = function (c, S) {
      return j.H.useInsertionEffect(c, S);
    }),
    (W.useLayoutEffect = function (c, S) {
      return j.H.useLayoutEffect(c, S);
    }),
    (W.useMemo = function (c, S) {
      return j.H.useMemo(c, S);
    }),
    (W.useOptimistic = function (c, S) {
      return j.H.useOptimistic(c, S);
    }),
    (W.useReducer = function (c, S, P) {
      return j.H.useReducer(c, S, P);
    }),
    (W.useRef = function (c) {
      return j.H.useRef(c);
    }),
    (W.useState = function (c) {
      return j.H.useState(c);
    }),
    (W.useSyncExternalStore = function (c, S, P) {
      return j.H.useSyncExternalStore(c, S, P);
    }),
    (W.useTransition = function () {
      return j.H.useTransition();
    }),
    (W.version = "19.2.0"),
    W
  );
}
var Qe = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Qe.exports;
var Or;
function vo() {
  return (
    Or ||
      ((Or = 1),
      (function (e, t) {
        process.env.NODE_ENV !== "production" &&
          (function () {
            function r(i, w) {
              Object.defineProperty(a.prototype, i, {
                get: function () {
                  console.warn(
                    "%s(...) is deprecated in plain JavaScript React classes. %s",
                    w[0],
                    w[1]
                  );
                },
              });
            }
            function n(i) {
              return i === null || typeof i != "object"
                ? null
                : ((i = (Ee && i[Ee]) || i["@@iterator"]),
                  typeof i == "function" ? i : null);
            }
            function o(i, w) {
              i =
                ((i = i.constructor) && (i.displayName || i.name)) ||
                "ReactClass";
              var N = i + "." + w;
              ke[N] ||
                (console.error(
                  "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
                  w,
                  i
                ),
                (ke[N] = !0));
            }
            function a(i, w, N) {
              (this.props = i),
                (this.context = w),
                (this.refs = Ht),
                (this.updater = N || yr);
            }
            function s() {}
            function u(i, w, N) {
              (this.props = i),
                (this.context = w),
                (this.refs = Ht),
                (this.updater = N || yr);
            }
            function f() {}
            function l(i) {
              return "" + i;
            }
            function d(i) {
              try {
                l(i);
                var w = !1;
              } catch {
                w = !0;
              }
              if (w) {
                w = console;
                var N = w.error,
                  D =
                    (typeof Symbol == "function" &&
                      Symbol.toStringTag &&
                      i[Symbol.toStringTag]) ||
                    i.constructor.name ||
                    "Object";
                return (
                  N.call(
                    w,
                    "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
                    D
                  ),
                  l(i)
                );
              }
            }
            function h(i) {
              if (i == null) return null;
              if (typeof i == "function")
                return i.$$typeof === fo
                  ? null
                  : i.displayName || i.name || null;
              if (typeof i == "string") return i;
              switch (i) {
                case c:
                  return "Fragment";
                case P:
                  return "Profiler";
                case S:
                  return "StrictMode";
                case O:
                  return "Suspense";
                case M:
                  return "SuspenseList";
                case ne:
                  return "Activity";
              }
              if (typeof i == "object")
                switch (
                  (typeof i.tag == "number" &&
                    console.error(
                      "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
                    ),
                  i.$$typeof)
                ) {
                  case me:
                    return "Portal";
                  case k:
                    return i.displayName || "Context";
                  case E:
                    return (i._context.displayName || "Context") + ".Consumer";
                  case g:
                    var w = i.render;
                    return (
                      (i = i.displayName),
                      i ||
                        ((i = w.displayName || w.name || ""),
                        (i =
                          i !== "" ? "ForwardRef(" + i + ")" : "ForwardRef")),
                      i
                    );
                  case U:
                    return (
                      (w = i.displayName || null),
                      w !== null ? w : h(i.type) || "Memo"
                    );
                  case F:
                    (w = i._payload), (i = i._init);
                    try {
                      return h(i(w));
                    } catch {}
                }
              return null;
            }
            function m(i) {
              if (i === c) return "<>";
              if (typeof i == "object" && i !== null && i.$$typeof === F)
                return "<...>";
              try {
                var w = h(i);
                return w ? "<" + w + ">" : "<...>";
              } catch {
                return "<...>";
              }
            }
            function T() {
              var i = J.A;
              return i === null ? null : i.getOwner();
            }
            function b() {
              return Error("react-stack-top-frame");
            }
            function R(i) {
              if (ut.call(i, "key")) {
                var w = Object.getOwnPropertyDescriptor(i, "key").get;
                if (w && w.isReactWarning) return !1;
              }
              return i.key !== void 0;
            }
            function y(i, w) {
              function N() {
                _r ||
                  ((_r = !0),
                  console.error(
                    "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
                    w
                  ));
              }
              (N.isReactWarning = !0),
                Object.defineProperty(i, "key", {
                  get: N,
                  configurable: !0,
                });
            }
            function C() {
              var i = h(this.type);
              return (
                wr[i] ||
                  ((wr[i] = !0),
                  console.error(
                    "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
                  )),
                (i = this.props.ref),
                i !== void 0 ? i : null
              );
            }
            function v(i, w, N, D, B, X) {
              var G = N.ref;
              return (
                (i = {
                  $$typeof: fe,
                  type: i,
                  key: w,
                  props: N,
                  _owner: D,
                }),
                (G !== void 0 ? G : null) !== null
                  ? Object.defineProperty(i, "ref", {
                      enumerable: !1,
                      get: C,
                    })
                  : Object.defineProperty(i, "ref", {
                      enumerable: !1,
                      value: null,
                    }),
                (i._store = {}),
                Object.defineProperty(i._store, "validated", {
                  configurable: !1,
                  enumerable: !1,
                  writable: !0,
                  value: 0,
                }),
                Object.defineProperty(i, "_debugInfo", {
                  configurable: !1,
                  enumerable: !1,
                  writable: !0,
                  value: null,
                }),
                Object.defineProperty(i, "_debugStack", {
                  configurable: !1,
                  enumerable: !1,
                  writable: !0,
                  value: B,
                }),
                Object.defineProperty(i, "_debugTask", {
                  configurable: !1,
                  enumerable: !1,
                  writable: !0,
                  value: X,
                }),
                Object.freeze && (Object.freeze(i.props), Object.freeze(i)),
                i
              );
            }
            function A(i, w) {
              return (
                (w = v(
                  i.type,
                  w,
                  i.props,
                  i._owner,
                  i._debugStack,
                  i._debugTask
                )),
                i._store && (w._store.validated = i._store.validated),
                w
              );
            }
            function L(i) {
              $(i)
                ? i._store && (i._store.validated = 1)
                : typeof i == "object" &&
                  i !== null &&
                  i.$$typeof === F &&
                  (i._payload.status === "fulfilled"
                    ? $(i._payload.value) &&
                      i._payload.value._store &&
                      (i._payload.value._store.validated = 1)
                    : i._store && (i._store.validated = 1));
            }
            function $(i) {
              return typeof i == "object" && i !== null && i.$$typeof === fe;
            }
            function q(i) {
              var w = { "=": "=0", ":": "=2" };
              return (
                "$" +
                i.replace(/[=:]/g, function (N) {
                  return w[N];
                })
              );
            }
            function j(i, w) {
              return typeof i == "object" && i !== null && i.key != null
                ? (d(i.key), q("" + i.key))
                : w.toString(36);
            }
            function H(i) {
              switch (i.status) {
                case "fulfilled":
                  return i.value;
                case "rejected":
                  throw i.reason;
                default:
                  switch (
                    (typeof i.status == "string"
                      ? i.then(f, f)
                      : ((i.status = "pending"),
                        i.then(
                          function (w) {
                            i.status === "pending" &&
                              ((i.status = "fulfilled"), (i.value = w));
                          },
                          function (w) {
                            i.status === "pending" &&
                              ((i.status = "rejected"), (i.reason = w));
                          }
                        )),
                    i.status)
                  ) {
                    case "fulfilled":
                      return i.value;
                    case "rejected":
                      throw i.reason;
                  }
              }
              throw i;
            }
            function z(i, w, N, D, B) {
              var X = typeof i;
              (X === "undefined" || X === "boolean") && (i = null);
              var G = !1;
              if (i === null) G = !0;
              else
                switch (X) {
                  case "bigint":
                  case "string":
                  case "number":
                    G = !0;
                    break;
                  case "object":
                    switch (i.$$typeof) {
                      case fe:
                      case me:
                        G = !0;
                        break;
                      case F:
                        return (G = i._init), z(G(i._payload), w, N, D, B);
                    }
                }
              if (G) {
                (G = i), (B = B(G));
                var ie = D === "" ? "." + j(G, 0) : D;
                return (
                  vr(B)
                    ? ((N = ""),
                      ie != null && (N = ie.replace(xr, "$&/") + "/"),
                      z(B, w, N, "", function (je) {
                        return je;
                      }))
                    : B != null &&
                      ($(B) &&
                        (B.key != null && ((G && G.key === B.key) || d(B.key)),
                        (N = A(
                          B,
                          N +
                            (B.key == null || (G && G.key === B.key)
                              ? ""
                              : ("" + B.key).replace(xr, "$&/") + "/") +
                            ie
                        )),
                        D !== "" &&
                          G != null &&
                          $(G) &&
                          G.key == null &&
                          G._store &&
                          !G._store.validated &&
                          (N._store.validated = 2),
                        (B = N)),
                      w.push(B)),
                  1
                );
              }
              if (((G = 0), (ie = D === "" ? "." : D + ":"), vr(i)))
                for (var Q = 0; Q < i.length; Q++)
                  (D = i[Q]), (X = ie + j(D, Q)), (G += z(D, w, N, X, B));
              else if (((Q = n(i)), typeof Q == "function"))
                for (
                  Q === i.entries &&
                    (Tr ||
                      console.warn(
                        "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
                      ),
                    (Tr = !0)),
                    i = Q.call(i),
                    Q = 0;
                  !(D = i.next()).done;

                )
                  (D = D.value), (X = ie + j(D, Q++)), (G += z(D, w, N, X, B));
              else if (X === "object") {
                if (typeof i.then == "function") return z(H(i), w, N, D, B);
                throw (
                  ((w = String(i)),
                  Error(
                    "Objects are not valid as a React child (found: " +
                      (w === "[object Object]"
                        ? "object with keys {" + Object.keys(i).join(", ") + "}"
                        : w) +
                      "). If you meant to render a collection of children, use an array instead."
                  ))
                );
              }
              return G;
            }
            function ee(i, w, N) {
              if (i == null) return i;
              var D = [],
                B = 0;
              return (
                z(i, D, "", "", function (X) {
                  return w.call(N, X, B++);
                }),
                D
              );
            }
            function re(i) {
              if (i._status === -1) {
                var w = i._ioInfo;
                w != null && (w.start = w.end = performance.now()),
                  (w = i._result);
                var N = w();
                if (
                  (N.then(
                    function (B) {
                      if (i._status === 0 || i._status === -1) {
                        (i._status = 1), (i._result = B);
                        var X = i._ioInfo;
                        X != null && (X.end = performance.now()),
                          N.status === void 0 &&
                            ((N.status = "fulfilled"), (N.value = B));
                      }
                    },
                    function (B) {
                      if (i._status === 0 || i._status === -1) {
                        (i._status = 2), (i._result = B);
                        var X = i._ioInfo;
                        X != null && (X.end = performance.now()),
                          N.status === void 0 &&
                            ((N.status = "rejected"), (N.reason = B));
                      }
                    }
                  ),
                  (w = i._ioInfo),
                  w != null)
                ) {
                  w.value = N;
                  var D = N.displayName;
                  typeof D == "string" && (w.name = D);
                }
                i._status === -1 && ((i._status = 0), (i._result = N));
              }
              if (i._status === 1)
                return (
                  (w = i._result),
                  w === void 0 &&
                    console.error(
                      `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like:
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,
                      w
                    ),
                  "default" in w ||
                    console.error(
                      `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like:
  const MyComponent = lazy(() => import('./MyComponent'))`,
                      w
                    ),
                  w.default
                );
              throw i._result;
            }
            function V() {
              var i = J.H;
              return (
                i === null &&
                  console.error(
                    `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
                  ),
                i
              );
            }
            function se() {
              J.asyncTransitions--;
            }
            function te(i) {
              if (ft === null)
                try {
                  var w = ("require" + Math.random()).slice(0, 7);
                  ft = (e && e[w]).call(e, "timers").setImmediate;
                } catch {
                  ft = function (D) {
                    Sr === !1 &&
                      ((Sr = !0),
                      typeof MessageChannel > "u" &&
                        console.error(
                          "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
                        ));
                    var B = new MessageChannel();
                    (B.port1.onmessage = D), B.port2.postMessage(void 0);
                  };
                }
              return ft(i);
            }
            function le(i) {
              return 1 < i.length && typeof AggregateError == "function"
                ? new AggregateError(i)
                : i[0];
            }
            function K(i, w) {
              w !== dt - 1 &&
                console.error(
                  "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
                ),
                (dt = w);
            }
            function ce(i, w, N) {
              var D = J.actQueue;
              if (D !== null)
                if (D.length !== 0)
                  try {
                    ae(D),
                      te(function () {
                        return ce(i, w, N);
                      });
                    return;
                  } catch (B) {
                    J.thrownErrors.push(B);
                  }
                else J.actQueue = null;
              0 < J.thrownErrors.length
                ? ((D = le(J.thrownErrors)), (J.thrownErrors.length = 0), N(D))
                : w(i);
            }
            function ae(i) {
              if (!zt) {
                zt = !0;
                var w = 0;
                try {
                  for (; w < i.length; w++) {
                    var N = i[w];
                    do {
                      J.didUsePromise = !1;
                      var D = N(!1);
                      if (D !== null) {
                        if (J.didUsePromise) {
                          (i[w] = N), i.splice(0, w);
                          return;
                        }
                        N = D;
                      } else break;
                    } while (!0);
                  }
                  i.length = 0;
                } catch (B) {
                  i.splice(0, w + 1), J.thrownErrors.push(B);
                } finally {
                  zt = !1;
                }
              }
            }
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ==
                "function" &&
              __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(
                Error()
              );
            var fe = Symbol.for("react.transitional.element"),
              me = Symbol.for("react.portal"),
              c = Symbol.for("react.fragment"),
              S = Symbol.for("react.strict_mode"),
              P = Symbol.for("react.profiler"),
              E = Symbol.for("react.consumer"),
              k = Symbol.for("react.context"),
              g = Symbol.for("react.forward_ref"),
              O = Symbol.for("react.suspense"),
              M = Symbol.for("react.suspense_list"),
              U = Symbol.for("react.memo"),
              F = Symbol.for("react.lazy"),
              ne = Symbol.for("react.activity"),
              Ee = Symbol.iterator,
              ke = {},
              yr = {
                isMounted: function () {
                  return !1;
                },
                enqueueForceUpdate: function (i) {
                  o(i, "forceUpdate");
                },
                enqueueReplaceState: function (i) {
                  o(i, "replaceState");
                },
                enqueueSetState: function (i) {
                  o(i, "setState");
                },
              },
              gr = Object.assign,
              Ht = {};
            Object.freeze(Ht),
              (a.prototype.isReactComponent = {}),
              (a.prototype.setState = function (i, w) {
                if (typeof i != "object" && typeof i != "function" && i != null)
                  throw Error(
                    "takes an object of state variables to update or a function which returns an object of state variables."
                  );
                this.updater.enqueueSetState(this, i, w, "setState");
              }),
              (a.prototype.forceUpdate = function (i) {
                this.updater.enqueueForceUpdate(this, i, "forceUpdate");
              });
            var _e = {
              isMounted: [
                "isMounted",
                "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.",
              ],
              replaceState: [
                "replaceState",
                "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236).",
              ],
            };
            for (We in _e) _e.hasOwnProperty(We) && r(We, _e[We]);
            (s.prototype = a.prototype),
              (_e = u.prototype = new s()),
              (_e.constructor = u),
              gr(_e, a.prototype),
              (_e.isPureReactComponent = !0);
            var vr = Array.isArray,
              fo = Symbol.for("react.client.reference"),
              J = {
                H: null,
                A: null,
                T: null,
                S: null,
                actQueue: null,
                asyncTransitions: 0,
                isBatchingLegacy: !1,
                didScheduleLegacyUpdate: !1,
                didUsePromise: !1,
                thrownErrors: [],
                getCurrentStack: null,
                recentlyCreatedOwnerStacks: 0,
              },
              ut = Object.prototype.hasOwnProperty,
              br = console.createTask
                ? console.createTask
                : function () {
                    return null;
                  };
            _e = {
              react_stack_bottom_frame: function (i) {
                return i();
              },
            };
            var _r,
              Er,
              wr = {},
              po = _e.react_stack_bottom_frame.bind(_e, b)(),
              ho = br(m(b)),
              Tr = !1,
              xr = /\/+/g,
              Rr =
                typeof reportError == "function"
                  ? reportError
                  : function (i) {
                      if (
                        typeof window == "object" &&
                        typeof window.ErrorEvent == "function"
                      ) {
                        var w = new window.ErrorEvent("error", {
                          bubbles: !0,
                          cancelable: !0,
                          message:
                            typeof i == "object" &&
                            i !== null &&
                            typeof i.message == "string"
                              ? String(i.message)
                              : String(i),
                          error: i,
                        });
                        if (!window.dispatchEvent(w)) return;
                      } else if (
                        typeof process == "object" &&
                        typeof process.emit == "function"
                      ) {
                        process.emit("uncaughtException", i);
                        return;
                      }
                      console.error(i);
                    },
              Sr = !1,
              ft = null,
              dt = 0,
              pt = !1,
              zt = !1,
              Cr =
                typeof queueMicrotask == "function"
                  ? function (i) {
                      queueMicrotask(function () {
                        return queueMicrotask(i);
                      });
                    }
                  : te;
            _e = Object.freeze({
              __proto__: null,
              c: function (i) {
                return V().useMemoCache(i);
              },
            });
            var We = {
              map: ee,
              forEach: function (i, w, N) {
                ee(
                  i,
                  function () {
                    w.apply(this, arguments);
                  },
                  N
                );
              },
              count: function (i) {
                var w = 0;
                return (
                  ee(i, function () {
                    w++;
                  }),
                  w
                );
              },
              toArray: function (i) {
                return (
                  ee(i, function (w) {
                    return w;
                  }) || []
                );
              },
              only: function (i) {
                if (!$(i))
                  throw Error(
                    "React.Children.only expected to receive a single React element child."
                  );
                return i;
              },
            };
            (t.Activity = ne),
              (t.Children = We),
              (t.Component = a),
              (t.Fragment = c),
              (t.Profiler = P),
              (t.PureComponent = u),
              (t.StrictMode = S),
              (t.Suspense = O),
              (t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
                J),
              (t.__COMPILER_RUNTIME = _e),
              (t.act = function (i) {
                var w = J.actQueue,
                  N = dt;
                dt++;
                var D = (J.actQueue = w !== null ? w : []),
                  B = !1;
                try {
                  var X = i();
                } catch (Q) {
                  J.thrownErrors.push(Q);
                }
                if (0 < J.thrownErrors.length)
                  throw (
                    (K(w, N),
                    (i = le(J.thrownErrors)),
                    (J.thrownErrors.length = 0),
                    i)
                  );
                if (
                  X !== null &&
                  typeof X == "object" &&
                  typeof X.then == "function"
                ) {
                  var G = X;
                  return (
                    Cr(function () {
                      B ||
                        pt ||
                        ((pt = !0),
                        console.error(
                          "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
                        ));
                    }),
                    {
                      then: function (Q, je) {
                        (B = !0),
                          G.then(
                            function (Fe) {
                              if ((K(w, N), N === 0)) {
                                try {
                                  ae(D),
                                    te(function () {
                                      return ce(Fe, Q, je);
                                    });
                                } catch (yo) {
                                  J.thrownErrors.push(yo);
                                }
                                if (0 < J.thrownErrors.length) {
                                  var mo = le(J.thrownErrors);
                                  (J.thrownErrors.length = 0), je(mo);
                                }
                              } else Q(Fe);
                            },
                            function (Fe) {
                              K(w, N),
                                0 < J.thrownErrors.length &&
                                  ((Fe = le(J.thrownErrors)),
                                  (J.thrownErrors.length = 0)),
                                je(Fe);
                            }
                          );
                      },
                    }
                  );
                }
                var ie = X;
                if (
                  (K(w, N),
                  N === 0 &&
                    (ae(D),
                    D.length !== 0 &&
                      Cr(function () {
                        B ||
                          pt ||
                          ((pt = !0),
                          console.error(
                            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
                          ));
                      }),
                    (J.actQueue = null)),
                  0 < J.thrownErrors.length)
                )
                  throw (
                    ((i = le(J.thrownErrors)), (J.thrownErrors.length = 0), i)
                  );
                return {
                  then: function (Q, je) {
                    (B = !0),
                      N === 0
                        ? ((J.actQueue = D),
                          te(function () {
                            return ce(ie, Q, je);
                          }))
                        : Q(ie);
                  },
                };
              }),
              (t.cache = function (i) {
                return function () {
                  return i.apply(null, arguments);
                };
              }),
              (t.cacheSignal = function () {
                return null;
              }),
              (t.captureOwnerStack = function () {
                var i = J.getCurrentStack;
                return i === null ? null : i();
              }),
              (t.cloneElement = function (i, w, N) {
                if (i == null)
                  throw Error(
                    "The argument must be a React element, but you passed " +
                      i +
                      "."
                  );
                var D = gr({}, i.props),
                  B = i.key,
                  X = i._owner;
                if (w != null) {
                  var G;
                  e: {
                    if (
                      ut.call(w, "ref") &&
                      (G = Object.getOwnPropertyDescriptor(w, "ref").get) &&
                      G.isReactWarning
                    ) {
                      G = !1;
                      break e;
                    }
                    G = w.ref !== void 0;
                  }
                  G && (X = T()), R(w) && (d(w.key), (B = "" + w.key));
                  for (ie in w)
                    !ut.call(w, ie) ||
                      ie === "key" ||
                      ie === "__self" ||
                      ie === "__source" ||
                      (ie === "ref" && w.ref === void 0) ||
                      (D[ie] = w[ie]);
                }
                var ie = arguments.length - 2;
                if (ie === 1) D.children = N;
                else if (1 < ie) {
                  G = Array(ie);
                  for (var Q = 0; Q < ie; Q++) G[Q] = arguments[Q + 2];
                  D.children = G;
                }
                for (
                  D = v(i.type, B, D, X, i._debugStack, i._debugTask), B = 2;
                  B < arguments.length;
                  B++
                )
                  L(arguments[B]);
                return D;
              }),
              (t.createContext = function (i) {
                return (
                  (i = {
                    $$typeof: k,
                    _currentValue: i,
                    _currentValue2: i,
                    _threadCount: 0,
                    Provider: null,
                    Consumer: null,
                  }),
                  (i.Provider = i),
                  (i.Consumer = {
                    $$typeof: E,
                    _context: i,
                  }),
                  (i._currentRenderer = null),
                  (i._currentRenderer2 = null),
                  i
                );
              }),
              (t.createElement = function (i, w, N) {
                for (var D = 2; D < arguments.length; D++) L(arguments[D]);
                D = {};
                var B = null;
                if (w != null)
                  for (Q in (Er ||
                    !("__self" in w) ||
                    "key" in w ||
                    ((Er = !0),
                    console.warn(
                      "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
                    )),
                  R(w) && (d(w.key), (B = "" + w.key)),
                  w))
                    ut.call(w, Q) &&
                      Q !== "key" &&
                      Q !== "__self" &&
                      Q !== "__source" &&
                      (D[Q] = w[Q]);
                var X = arguments.length - 2;
                if (X === 1) D.children = N;
                else if (1 < X) {
                  for (var G = Array(X), ie = 0; ie < X; ie++)
                    G[ie] = arguments[ie + 2];
                  Object.freeze && Object.freeze(G), (D.children = G);
                }
                if (i && i.defaultProps)
                  for (Q in ((X = i.defaultProps), X))
                    D[Q] === void 0 && (D[Q] = X[Q]);
                B &&
                  y(
                    D,
                    typeof i == "function"
                      ? i.displayName || i.name || "Unknown"
                      : i
                  );
                var Q = 1e4 > J.recentlyCreatedOwnerStacks++;
                return v(
                  i,
                  B,
                  D,
                  T(),
                  Q ? Error("react-stack-top-frame") : po,
                  Q ? br(m(i)) : ho
                );
              }),
              (t.createRef = function () {
                var i = { current: null };
                return Object.seal(i), i;
              }),
              (t.forwardRef = function (i) {
                i != null && i.$$typeof === U
                  ? console.error(
                      "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
                    )
                  : typeof i != "function"
                  ? console.error(
                      "forwardRef requires a render function but was given %s.",
                      i === null ? "null" : typeof i
                    )
                  : i.length !== 0 &&
                    i.length !== 2 &&
                    console.error(
                      "forwardRef render functions accept exactly two parameters: props and ref. %s",
                      i.length === 1
                        ? "Did you forget to use the ref parameter?"
                        : "Any additional parameter will be undefined."
                    ),
                  i != null &&
                    i.defaultProps != null &&
                    console.error(
                      "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
                    );
                var w = { $$typeof: g, render: i },
                  N;
                return (
                  Object.defineProperty(w, "displayName", {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                      return N;
                    },
                    set: function (D) {
                      (N = D),
                        i.name ||
                          i.displayName ||
                          (Object.defineProperty(i, "name", { value: D }),
                          (i.displayName = D));
                    },
                  }),
                  w
                );
              }),
              (t.isValidElement = $),
              (t.lazy = function (i) {
                i = { _status: -1, _result: i };
                var w = {
                    $$typeof: F,
                    _payload: i,
                    _init: re,
                  },
                  N = {
                    name: "lazy",
                    start: -1,
                    end: -1,
                    value: null,
                    owner: null,
                    debugStack: Error("react-stack-top-frame"),
                    debugTask: console.createTask
                      ? console.createTask("lazy()")
                      : null,
                  };
                return (i._ioInfo = N), (w._debugInfo = [{ awaited: N }]), w;
              }),
              (t.memo = function (i, w) {
                i == null &&
                  console.error(
                    "memo: The first argument must be a component. Instead received: %s",
                    i === null ? "null" : typeof i
                  ),
                  (w = {
                    $$typeof: U,
                    type: i,
                    compare: w === void 0 ? null : w,
                  });
                var N;
                return (
                  Object.defineProperty(w, "displayName", {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                      return N;
                    },
                    set: function (D) {
                      (N = D),
                        i.name ||
                          i.displayName ||
                          (Object.defineProperty(i, "name", { value: D }),
                          (i.displayName = D));
                    },
                  }),
                  w
                );
              }),
              (t.startTransition = function (i) {
                var w = J.T,
                  N = {};
                (N._updatedFibers = /* @__PURE__ */ new Set()), (J.T = N);
                try {
                  var D = i(),
                    B = J.S;
                  B !== null && B(N, D),
                    typeof D == "object" &&
                      D !== null &&
                      typeof D.then == "function" &&
                      (J.asyncTransitions++, D.then(se, se), D.then(f, Rr));
                } catch (X) {
                  Rr(X);
                } finally {
                  w === null &&
                    N._updatedFibers &&
                    ((i = N._updatedFibers.size),
                    N._updatedFibers.clear(),
                    10 < i &&
                      console.warn(
                        "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
                      )),
                    w !== null &&
                      N.types !== null &&
                      (w.types !== null &&
                        w.types !== N.types &&
                        console.error(
                          "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
                        ),
                      (w.types = N.types)),
                    (J.T = w);
                }
              }),
              (t.unstable_useCacheRefresh = function () {
                return V().useCacheRefresh();
              }),
              (t.use = function (i) {
                return V().use(i);
              }),
              (t.useActionState = function (i, w, N) {
                return V().useActionState(i, w, N);
              }),
              (t.useCallback = function (i, w) {
                return V().useCallback(i, w);
              }),
              (t.useContext = function (i) {
                var w = V();
                return (
                  i.$$typeof === E &&
                    console.error(
                      "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
                    ),
                  w.useContext(i)
                );
              }),
              (t.useDebugValue = function (i, w) {
                return V().useDebugValue(i, w);
              }),
              (t.useDeferredValue = function (i, w) {
                return V().useDeferredValue(i, w);
              }),
              (t.useEffect = function (i, w) {
                return (
                  i == null &&
                    console.warn(
                      "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
                    ),
                  V().useEffect(i, w)
                );
              }),
              (t.useEffectEvent = function (i) {
                return V().useEffectEvent(i);
              }),
              (t.useId = function () {
                return V().useId();
              }),
              (t.useImperativeHandle = function (i, w, N) {
                return V().useImperativeHandle(i, w, N);
              }),
              (t.useInsertionEffect = function (i, w) {
                return (
                  i == null &&
                    console.warn(
                      "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
                    ),
                  V().useInsertionEffect(i, w)
                );
              }),
              (t.useLayoutEffect = function (i, w) {
                return (
                  i == null &&
                    console.warn(
                      "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
                    ),
                  V().useLayoutEffect(i, w)
                );
              }),
              (t.useMemo = function (i, w) {
                return V().useMemo(i, w);
              }),
              (t.useOptimistic = function (i, w) {
                return V().useOptimistic(i, w);
              }),
              (t.useReducer = function (i, w, N) {
                return V().useReducer(i, w, N);
              }),
              (t.useRef = function (i) {
                return V().useRef(i);
              }),
              (t.useState = function (i) {
                return V().useState(i);
              }),
              (t.useSyncExternalStore = function (i, w, N) {
                return V().useSyncExternalStore(i, w, N);
              }),
              (t.useTransition = function () {
                return V().useTransition();
              }),
              (t.version = "19.2.0"),
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
                typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ==
                  "function" &&
                __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(
                  Error()
                );
          })();
      })(Qe, Qe.exports)),
    Qe.exports
  );
}
var Nr;
function Nt() {
  return (
    Nr ||
      ((Nr = 1),
      process.env.NODE_ENV === "production"
        ? (ht.exports = go())
        : (ht.exports = vo())),
    ht.exports
  );
}
var _ = Nt();
const oe = /* @__PURE__ */ un(_);
var mt = { exports: {} },
  de = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var jr;
function bo() {
  if (jr) return de;
  jr = 1;
  var e = Nt();
  function t(f) {
    var l = "https://react.dev/errors/" + f;
    if (1 < arguments.length) {
      l += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var d = 2; d < arguments.length; d++)
        l += "&args[]=" + encodeURIComponent(arguments[d]);
    }
    return (
      "Minified React error #" +
      f +
      "; visit " +
      l +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function r() {}
  var n = {
      d: {
        f: r,
        r: function () {
          throw Error(t(522));
        },
        D: r,
        C: r,
        L: r,
        m: r,
        X: r,
        S: r,
        M: r,
      },
      p: 0,
      findDOMNode: null,
    },
    o = Symbol.for("react.portal");
  function a(f, l, d) {
    var h =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: h == null ? null : "" + h,
      children: f,
      containerInfo: l,
      implementation: d,
    };
  }
  var s = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function u(f, l) {
    if (f === "font") return "";
    if (typeof l == "string") return l === "use-credentials" ? l : "";
  }
  return (
    (de.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = n),
    (de.createPortal = function (f, l) {
      var d =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!l || (l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11))
        throw Error(t(299));
      return a(f, l, null, d);
    }),
    (de.flushSync = function (f) {
      var l = s.T,
        d = n.p;
      try {
        if (((s.T = null), (n.p = 2), f)) return f();
      } finally {
        (s.T = l), (n.p = d), n.d.f();
      }
    }),
    (de.preconnect = function (f, l) {
      typeof f == "string" &&
        (l
          ? ((l = l.crossOrigin),
            (l =
              typeof l == "string"
                ? l === "use-credentials"
                  ? l
                  : ""
                : void 0))
          : (l = null),
        n.d.C(f, l));
    }),
    (de.prefetchDNS = function (f) {
      typeof f == "string" && n.d.D(f);
    }),
    (de.preinit = function (f, l) {
      if (typeof f == "string" && l && typeof l.as == "string") {
        var d = l.as,
          h = u(d, l.crossOrigin),
          m = typeof l.integrity == "string" ? l.integrity : void 0,
          T = typeof l.fetchPriority == "string" ? l.fetchPriority : void 0;
        d === "style"
          ? n.d.S(f, typeof l.precedence == "string" ? l.precedence : void 0, {
              crossOrigin: h,
              integrity: m,
              fetchPriority: T,
            })
          : d === "script" &&
            n.d.X(f, {
              crossOrigin: h,
              integrity: m,
              fetchPriority: T,
              nonce: typeof l.nonce == "string" ? l.nonce : void 0,
            });
      }
    }),
    (de.preinitModule = function (f, l) {
      if (typeof f == "string")
        if (typeof l == "object" && l !== null) {
          if (l.as == null || l.as === "script") {
            var d = u(l.as, l.crossOrigin);
            n.d.M(f, {
              crossOrigin: d,
              integrity: typeof l.integrity == "string" ? l.integrity : void 0,
              nonce: typeof l.nonce == "string" ? l.nonce : void 0,
            });
          }
        } else l == null && n.d.M(f);
    }),
    (de.preload = function (f, l) {
      if (
        typeof f == "string" &&
        typeof l == "object" &&
        l !== null &&
        typeof l.as == "string"
      ) {
        var d = l.as,
          h = u(d, l.crossOrigin);
        n.d.L(f, d, {
          crossOrigin: h,
          integrity: typeof l.integrity == "string" ? l.integrity : void 0,
          nonce: typeof l.nonce == "string" ? l.nonce : void 0,
          type: typeof l.type == "string" ? l.type : void 0,
          fetchPriority:
            typeof l.fetchPriority == "string" ? l.fetchPriority : void 0,
          referrerPolicy:
            typeof l.referrerPolicy == "string" ? l.referrerPolicy : void 0,
          imageSrcSet:
            typeof l.imageSrcSet == "string" ? l.imageSrcSet : void 0,
          imageSizes: typeof l.imageSizes == "string" ? l.imageSizes : void 0,
          media: typeof l.media == "string" ? l.media : void 0,
        });
      }
    }),
    (de.preloadModule = function (f, l) {
      if (typeof f == "string")
        if (l) {
          var d = u(l.as, l.crossOrigin);
          n.d.m(f, {
            as: typeof l.as == "string" && l.as !== "script" ? l.as : void 0,
            crossOrigin: d,
            integrity: typeof l.integrity == "string" ? l.integrity : void 0,
          });
        } else n.d.m(f);
    }),
    (de.requestFormReset = function (f) {
      n.d.r(f);
    }),
    (de.unstable_batchedUpdates = function (f, l) {
      return f(l);
    }),
    (de.useFormState = function (f, l, d) {
      return s.H.useFormState(f, l, d);
    }),
    (de.useFormStatus = function () {
      return s.H.useHostTransitionStatus();
    }),
    (de.version = "19.2.0"),
    de
  );
}
var pe = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kr;
function _o() {
  return (
    kr ||
      ((kr = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          function e() {}
          function t(h) {
            return "" + h;
          }
          function r(h, m, T) {
            var b =
              3 < arguments.length && arguments[3] !== void 0
                ? arguments[3]
                : null;
            try {
              t(b);
              var R = !1;
            } catch {
              R = !0;
            }
            return (
              R &&
                (console.error(
                  "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
                  (typeof Symbol == "function" &&
                    Symbol.toStringTag &&
                    b[Symbol.toStringTag]) ||
                    b.constructor.name ||
                    "Object"
                ),
                t(b)),
              {
                $$typeof: l,
                key: b == null ? null : "" + b,
                children: h,
                containerInfo: m,
                implementation: T,
              }
            );
          }
          function n(h, m) {
            if (h === "font") return "";
            if (typeof m == "string") return m === "use-credentials" ? m : "";
          }
          function o(h) {
            return h === null
              ? "`null`"
              : h === void 0
              ? "`undefined`"
              : h === ""
              ? "an empty string"
              : 'something with type "' + typeof h + '"';
          }
          function a(h) {
            return h === null
              ? "`null`"
              : h === void 0
              ? "`undefined`"
              : h === ""
              ? "an empty string"
              : typeof h == "string"
              ? JSON.stringify(h)
              : typeof h == "number"
              ? "`" + h + "`"
              : 'something with type "' + typeof h + '"';
          }
          function s() {
            var h = d.H;
            return (
              h === null &&
                console.error(
                  `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
                ),
              h
            );
          }
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ==
              "function" &&
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
          var u = Nt(),
            f = {
              d: {
                f: e,
                r: function () {
                  throw Error(
                    "Invalid form element. requestFormReset must be passed a form that was rendered by React."
                  );
                },
                D: e,
                C: e,
                L: e,
                m: e,
                X: e,
                S: e,
                M: e,
              },
              p: 0,
              findDOMNode: null,
            },
            l = Symbol.for("react.portal"),
            d =
              u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
          (typeof Map == "function" &&
            Map.prototype != null &&
            typeof Map.prototype.forEach == "function" &&
            typeof Set == "function" &&
            Set.prototype != null &&
            typeof Set.prototype.clear == "function" &&
            typeof Set.prototype.forEach == "function") ||
            console.error(
              "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"
            ),
            (pe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
              f),
            (pe.createPortal = function (h, m) {
              var T =
                2 < arguments.length && arguments[2] !== void 0
                  ? arguments[2]
                  : null;
              if (
                !m ||
                (m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
              )
                throw Error("Target container is not a DOM element.");
              return r(h, m, null, T);
            }),
            (pe.flushSync = function (h) {
              var m = d.T,
                T = f.p;
              try {
                if (((d.T = null), (f.p = 2), h)) return h();
              } finally {
                (d.T = m),
                  (f.p = T),
                  f.d.f() &&
                    console.error(
                      "flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."
                    );
              }
            }),
            (pe.preconnect = function (h, m) {
              typeof h == "string" && h
                ? m != null && typeof m != "object"
                  ? console.error(
                      "ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.",
                      a(m)
                    )
                  : m != null &&
                    typeof m.crossOrigin != "string" &&
                    console.error(
                      "ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.",
                      o(m.crossOrigin)
                    )
                : console.error(
                    "ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
                    o(h)
                  ),
                typeof h == "string" &&
                  (m
                    ? ((m = m.crossOrigin),
                      (m =
                        typeof m == "string"
                          ? m === "use-credentials"
                            ? m
                            : ""
                          : void 0))
                    : (m = null),
                  f.d.C(h, m));
            }),
            (pe.prefetchDNS = function (h) {
              if (typeof h != "string" || !h)
                console.error(
                  "ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
                  o(h)
                );
              else if (1 < arguments.length) {
                var m = arguments[1];
                typeof m == "object" && m.hasOwnProperty("crossOrigin")
                  ? console.error(
                      "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
                      a(m)
                    )
                  : console.error(
                      "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
                      a(m)
                    );
              }
              typeof h == "string" && f.d.D(h);
            }),
            (pe.preinit = function (h, m) {
              if (
                (typeof h == "string" && h
                  ? m == null || typeof m != "object"
                    ? console.error(
                        "ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.",
                        a(m)
                      )
                    : m.as !== "style" &&
                      m.as !== "script" &&
                      console.error(
                        'ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',
                        a(m.as)
                      )
                  : console.error(
                      "ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
                      o(h)
                    ),
                typeof h == "string" && m && typeof m.as == "string")
              ) {
                var T = m.as,
                  b = n(T, m.crossOrigin),
                  R = typeof m.integrity == "string" ? m.integrity : void 0,
                  y =
                    typeof m.fetchPriority == "string"
                      ? m.fetchPriority
                      : void 0;
                T === "style"
                  ? f.d.S(
                      h,
                      typeof m.precedence == "string" ? m.precedence : void 0,
                      {
                        crossOrigin: b,
                        integrity: R,
                        fetchPriority: y,
                      }
                    )
                  : T === "script" &&
                    f.d.X(h, {
                      crossOrigin: b,
                      integrity: R,
                      fetchPriority: y,
                      nonce: typeof m.nonce == "string" ? m.nonce : void 0,
                    });
              }
            }),
            (pe.preinitModule = function (h, m) {
              var T = "";
              if (
                ((typeof h == "string" && h) ||
                  (T += " The `href` argument encountered was " + o(h) + "."),
                m !== void 0 && typeof m != "object"
                  ? (T +=
                      " The `options` argument encountered was " + o(m) + ".")
                  : m &&
                    "as" in m &&
                    m.as !== "script" &&
                    (T += " The `as` option encountered was " + a(m.as) + "."),
                T)
              )
                console.error(
                  "ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s",
                  T
                );
              else
                switch (
                  ((T = m && typeof m.as == "string" ? m.as : "script"), T)
                ) {
                  case "script":
                    break;
                  default:
                    (T = a(T)),
                      console.error(
                        'ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',
                        T,
                        h
                      );
                }
              typeof h == "string" &&
                (typeof m == "object" && m !== null
                  ? (m.as == null || m.as === "script") &&
                    ((T = n(m.as, m.crossOrigin)),
                    f.d.M(h, {
                      crossOrigin: T,
                      integrity:
                        typeof m.integrity == "string" ? m.integrity : void 0,
                      nonce: typeof m.nonce == "string" ? m.nonce : void 0,
                    }))
                  : m == null && f.d.M(h));
            }),
            (pe.preload = function (h, m) {
              var T = "";
              if (
                ((typeof h == "string" && h) ||
                  (T += " The `href` argument encountered was " + o(h) + "."),
                m == null || typeof m != "object"
                  ? (T +=
                      " The `options` argument encountered was " + o(m) + ".")
                  : (typeof m.as == "string" && m.as) ||
                    (T += " The `as` option encountered was " + o(m.as) + "."),
                T &&
                  console.error(
                    'ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',
                    T
                  ),
                typeof h == "string" &&
                  typeof m == "object" &&
                  m !== null &&
                  typeof m.as == "string")
              ) {
                T = m.as;
                var b = n(T, m.crossOrigin);
                f.d.L(h, T, {
                  crossOrigin: b,
                  integrity:
                    typeof m.integrity == "string" ? m.integrity : void 0,
                  nonce: typeof m.nonce == "string" ? m.nonce : void 0,
                  type: typeof m.type == "string" ? m.type : void 0,
                  fetchPriority:
                    typeof m.fetchPriority == "string"
                      ? m.fetchPriority
                      : void 0,
                  referrerPolicy:
                    typeof m.referrerPolicy == "string"
                      ? m.referrerPolicy
                      : void 0,
                  imageSrcSet:
                    typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
                  imageSizes:
                    typeof m.imageSizes == "string" ? m.imageSizes : void 0,
                  media: typeof m.media == "string" ? m.media : void 0,
                });
              }
            }),
            (pe.preloadModule = function (h, m) {
              var T = "";
              (typeof h == "string" && h) ||
                (T += " The `href` argument encountered was " + o(h) + "."),
                m !== void 0 && typeof m != "object"
                  ? (T +=
                      " The `options` argument encountered was " + o(m) + ".")
                  : m &&
                    "as" in m &&
                    typeof m.as != "string" &&
                    (T += " The `as` option encountered was " + o(m.as) + "."),
                T &&
                  console.error(
                    'ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',
                    T
                  ),
                typeof h == "string" &&
                  (m
                    ? ((T = n(m.as, m.crossOrigin)),
                      f.d.m(h, {
                        as:
                          typeof m.as == "string" && m.as !== "script"
                            ? m.as
                            : void 0,
                        crossOrigin: T,
                        integrity:
                          typeof m.integrity == "string" ? m.integrity : void 0,
                      }))
                    : f.d.m(h));
            }),
            (pe.requestFormReset = function (h) {
              f.d.r(h);
            }),
            (pe.unstable_batchedUpdates = function (h, m) {
              return h(m);
            }),
            (pe.useFormState = function (h, m, T) {
              return s().useFormState(h, m, T);
            }),
            (pe.useFormStatus = function () {
              return s().useHostTransitionStatus();
            }),
            (pe.version = "19.2.0"),
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ==
                "function" &&
              __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(
                Error()
              );
        })()),
    pe
  );
}
var Lr;
function Eo() {
  if (Lr) return mt.exports;
  Lr = 1;
  function e() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    ) {
      if (process.env.NODE_ENV !== "production") throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
    }
  }
  return (
    process.env.NODE_ENV === "production"
      ? (e(), (mt.exports = bo()))
      : (mt.exports = _o()),
    mt.exports
  );
}
var wo = Eo();
const fn = /* @__PURE__ */ un(wo);
var To = Object.defineProperty,
  xo = (e, t, r) =>
    t in e
      ? To(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (e[t] = r),
  yt = (e, t, r) => xo(e, typeof t != "symbol" ? t + "" : t, r);
const Ro = {
    stringify: (e) => (e ? "true" : "false"),
    parse: (e) => /^[ty1-9]/i.test(e),
  },
  So = {
    stringify: (e) => e.name,
    parse: (e, t, r) => {
      const n = (() => {
        if (typeof window < "u" && e in window) return window[e];
        if (typeof global < "u" && e in global) return global[e];
      })();
      return typeof n == "function" ? n.bind(r) : void 0;
    },
  },
  Co = {
    stringify: (e) => JSON.stringify(e),
    parse: (e) => JSON.parse(e),
  };
function Ao(e) {
  return e.replace(
    /([a-z0-9])([A-Z])/g,
    (t, r, n) => `${r}-${n.toLowerCase()}`
  );
}
function dn(e) {
  return e.replace(/[-:]([a-z])/g, (t, r) => `${r.toUpperCase()}`);
}
const Oo = {
    stringify: (e) => e.name,
    parse: (e, t, r) => {
      const n = (() => {
        const o = dn(t);
        if (typeof r < "u" && o in r.container) return r.container[o];
      })();
      return typeof n == "function" ? n.bind(r) : void 0;
    },
  },
  No = {
    stringify: (e) => `${e}`,
    parse: (e) => parseFloat(e),
  },
  jo = {
    stringify: (e) => e,
    parse: (e) => e,
  },
  qt = {
    string: jo,
    number: No,
    boolean: Ro,
    function: So,
    method: Oo,
    json: Co,
  },
  Ye = Symbol.for("r2wc.render"),
  gt = Symbol.for("r2wc.connected"),
  Le = Symbol.for("r2wc.context"),
  be = Symbol.for("r2wc.props");
function ko(e, t, r) {
  var n, o, a;
  t.props || (t.props = e.propTypes ? Object.keys(e.propTypes) : []),
    t.events || (t.events = []);
  const s = Array.isArray(t.props) ? t.props.slice() : Object.keys(t.props),
    u = Array.isArray(t.events) ? t.events.slice() : Object.keys(t.events),
    f = {},
    l = {},
    d = {},
    h = {};
  for (const T of s) {
    f[T] = Array.isArray(t.props) ? "string" : t.props[T];
    const b = Ao(T);
    (d[T] = b), (h[b] = T);
  }
  for (const T of u) l[T] = Array.isArray(t.events) ? {} : t.events[T];
  class m extends HTMLElement {
    constructor() {
      super(),
        yt(this, a, !0),
        yt(this, o),
        yt(this, n, {}),
        yt(this, "container"),
        t.shadow
          ? (this.container = this.attachShadow({
              mode: t.shadow,
            }))
          : (this.container = this),
        (this[be].container = this.container);
      for (const b of s) {
        const R = d[b],
          y = this.getAttribute(R),
          C = f[b],
          v = C ? qt[C] : null;
        if (C === "method") {
          const A = dn(R);
          Object.defineProperty(this[be].container, A, {
            enumerable: !0,
            configurable: !0,
            get() {
              return this[be][A];
            },
            set(L) {
              (this[be][A] = L), this[Ye]();
            },
          }),
            (this[be][b] = v.parse(y, R, this));
        }
        v != null && v.parse && y && (this[be][b] = v.parse(y, R, this));
      }
      for (const b of u)
        this[be][b] = (R) => {
          const y = b.replace(/^on/, "").toLowerCase();
          this.dispatchEvent(new CustomEvent(y, { detail: R, ...l[b] }));
        };
    }
    static get observedAttributes() {
      return Object.keys(h);
    }
    connectedCallback() {
      (this[gt] = !0), this[Ye]();
    }
    disconnectedCallback() {
      (this[gt] = !1), this[Le] && r.unmount(this[Le]), delete this[Le];
    }
    attributeChangedCallback(b, R, y) {
      const C = h[b],
        v = f[C],
        A = v ? qt[v] : null;
      C in f &&
        A != null &&
        A.parse &&
        y &&
        ((this[be][C] = A.parse(y, b, this)), this[Ye]());
    }
    [((a = gt), (o = Le), (n = be), Ye)]() {
      this[gt] &&
        (this[Le]
          ? r.update(this[Le], this[be])
          : (this[Le] = r.mount(this.container, e, this[be])));
    }
  }
  for (const T of s) {
    const b = d[T],
      R = f[T];
    Object.defineProperty(m.prototype, T, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[be][T];
      },
      set(y) {
        this[be][T] = y;
        const C = R ? qt[R] : null;
        if (C != null && C.stringify) {
          const v = C.stringify(y, b, this);
          this.getAttribute(b) !== v && this.setAttribute(b, v);
        } else this[Ye]();
      },
    });
  }
  return m;
}
function pn(e, t, r, n = {}) {
  function o(u, f, l) {
    const d = t.createElement(f, l);
    if ("createRoot" in r) {
      const h = r.createRoot(u);
      return (
        h.render(d),
        {
          container: u,
          root: h,
          ReactComponent: f,
        }
      );
    }
    if ("render" in r)
      return (
        r.render(d, u),
        {
          container: u,
          ReactComponent: f,
        }
      );
    throw new Error("Invalid ReactDOM instance provided.");
  }
  function a({ container: u, root: f, ReactComponent: l }, d) {
    const h = t.createElement(l, d);
    if (f) {
      f.render(h);
      return;
    }
    if ("render" in r) {
      r.render(h, u);
      return;
    }
  }
  function s({ container: u, root: f }) {
    if (f) {
      f.unmount();
      return;
    }
    if ("unmountComponentAtNode" in r) {
      r.unmountComponentAtNode(u);
      return;
    }
  }
  return ko(e, n, { mount: o, unmount: s, update: a });
}
/**
 * react-router v7.9.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var Pr = "popstate";
function Lo(e = {}) {
  function t(n, o) {
    let { pathname: a, search: s, hash: u } = n.location;
    return Xt(
      "",
      { pathname: a, search: s, hash: u },
      // state defaults to `null` because `window.history.state` does
      (o.state && o.state.usr) || null,
      (o.state && o.state.key) || "default"
    );
  }
  function r(n, o) {
    return typeof o == "string" ? o : Ze(o);
  }
  return Do(t, r, null, e);
}
function ue(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Re(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function Po() {
  return Math.random().toString(36).substring(2, 10);
}
function Dr(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t,
  };
}
function Xt(e, t, r = null, n) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...(typeof t == "string" ? tt(t) : t),
    state: r,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: (t && t.key) || n || Po(),
  };
}
function Ze({ pathname: e = "/", search: t = "", hash: r = "" }) {
  return (
    t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t),
    r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r),
    e
  );
}
function tt(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && ((t.hash = e.substring(r)), (e = e.substring(0, r)));
    let n = e.indexOf("?");
    n >= 0 && ((t.search = e.substring(n)), (e = e.substring(0, n))),
      e && (t.pathname = e);
  }
  return t;
}
function Do(e, t, r, n = {}) {
  let { window: o = document.defaultView, v5Compat: a = !1 } = n,
    s = o.history,
    u = "POP",
    f = null,
    l = d();
  l == null && ((l = 0), s.replaceState({ ...s.state, idx: l }, ""));
  function d() {
    return (s.state || { idx: null }).idx;
  }
  function h() {
    u = "POP";
    let y = d(),
      C = y == null ? null : y - l;
    (l = y), f && f({ action: u, location: R.location, delta: C });
  }
  function m(y, C) {
    u = "PUSH";
    let v = Xt(R.location, y, C);
    l = d() + 1;
    let A = Dr(v, l),
      L = R.createHref(v);
    try {
      s.pushState(A, "", L);
    } catch ($) {
      if ($ instanceof DOMException && $.name === "DataCloneError") throw $;
      o.location.assign(L);
    }
    a && f && f({ action: u, location: R.location, delta: 1 });
  }
  function T(y, C) {
    u = "REPLACE";
    let v = Xt(R.location, y, C);
    l = d();
    let A = Dr(v, l),
      L = R.createHref(v);
    s.replaceState(A, "", L),
      a && f && f({ action: u, location: R.location, delta: 0 });
  }
  function b(y) {
    return Io(y);
  }
  let R = {
    get action() {
      return u;
    },
    get location() {
      return e(o, s);
    },
    listen(y) {
      if (f) throw new Error("A history only accepts one active listener");
      return (
        o.addEventListener(Pr, h),
        (f = y),
        () => {
          o.removeEventListener(Pr, h), (f = null);
        }
      );
    },
    createHref(y) {
      return t(o, y);
    },
    createURL: b,
    encodeLocation(y) {
      let C = b(y);
      return {
        pathname: C.pathname,
        search: C.search,
        hash: C.hash,
      };
    },
    push: m,
    replace: T,
    go(y) {
      return s.go(y);
    },
  };
  return R;
}
function Io(e, t = !1) {
  let r = "http://localhost";
  typeof window < "u" &&
    (r =
      window.location.origin !== "null"
        ? window.location.origin
        : window.location.href),
    ue(r, "No window.location.(origin|href) available to create URL");
  let n = typeof e == "string" ? e : Ze(e);
  return (
    (n = n.replace(/ $/, "%20")),
    !t && n.startsWith("//") && (n = r + n),
    new URL(n, r)
  );
}
function hn(e, t, r = "/") {
  return Mo(e, t, r, !1);
}
function Mo(e, t, r, n) {
  let o = typeof t == "string" ? tt(t) : t,
    a = Ae(o.pathname || "/", r);
  if (a == null) return null;
  let s = mn(e);
  $o(s);
  let u = null;
  for (let f = 0; u == null && f < s.length; ++f) {
    let l = Ko(a);
    u = Yo(s[f], l, n);
  }
  return u;
}
function mn(e, t = [], r = [], n = "", o = !1) {
  let a = (s, u, f = o, l) => {
    let d = {
      relativePath: l === void 0 ? s.path || "" : l,
      caseSensitive: s.caseSensitive === !0,
      childrenIndex: u,
      route: s,
    };
    if (d.relativePath.startsWith("/")) {
      if (!d.relativePath.startsWith(n) && f) return;
      ue(
        d.relativePath.startsWith(n),
        `Absolute route path "${d.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
        (d.relativePath = d.relativePath.slice(n.length));
    }
    let h = Ce([n, d.relativePath]),
      m = r.concat(d);
    s.children &&
      s.children.length > 0 &&
      (ue(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        s.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${h}".`
      ),
      mn(s.children, t, m, h, f)),
      !(s.path == null && !s.index) &&
        t.push({
          path: h,
          score: Vo(h, s.index),
          routesMeta: m,
        });
  };
  return (
    e.forEach((s, u) => {
      if (s.path === "" || !s.path?.includes("?")) a(s, u);
      else for (let f of yn(s.path)) a(s, u, !0, f);
    }),
    t
  );
}
function yn(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [r, ...n] = t,
    o = r.endsWith("?"),
    a = r.replace(/\?$/, "");
  if (n.length === 0) return o ? [a, ""] : [a];
  let s = yn(n.join("/")),
    u = [];
  return (
    u.push(...s.map((f) => (f === "" ? a : [a, f].join("/")))),
    o && u.push(...s),
    u.map((f) => (e.startsWith("/") && f === "" ? "/" : f))
  );
}
function $o(e) {
  e.sort((t, r) =>
    t.score !== r.score
      ? r.score - t.score
      : Wo(
          t.routesMeta.map((n) => n.childrenIndex),
          r.routesMeta.map((n) => n.childrenIndex)
        )
  );
}
var Uo = /^:[\w-]+$/,
  Fo = 3,
  Bo = 2,
  Ho = 1,
  zo = 10,
  qo = -2,
  Ir = (e) => e === "*";
function Vo(e, t) {
  let r = e.split("/"),
    n = r.length;
  return (
    r.some(Ir) && (n += qo),
    t && (n += Bo),
    r
      .filter((o) => !Ir(o))
      .reduce((o, a) => o + (Uo.test(a) ? Fo : a === "" ? Ho : zo), n)
  );
}
function Wo(e, t) {
  return e.length === t.length && e.slice(0, -1).every((n, o) => n === t[o])
    ? // If two routes are siblings, we should try to match the earlier sibling
      // first. This allows people to have fine-grained control over the matching
      // behavior by simply putting routes with identical paths in the order they
      // want them tried.
      e[e.length - 1] - t[t.length - 1]
    : // Otherwise, it doesn't really make sense to rank non-siblings by index,
      // so they sort equally.
      0;
}
function Yo(e, t, r = !1) {
  let { routesMeta: n } = e,
    o = {},
    a = "/",
    s = [];
  for (let u = 0; u < n.length; ++u) {
    let f = n[u],
      l = u === n.length - 1,
      d = a === "/" ? t : t.slice(a.length) || "/",
      h = Ct(
        { path: f.relativePath, caseSensitive: f.caseSensitive, end: l },
        d
      ),
      m = f.route;
    if (
      (!h &&
        l &&
        r &&
        !n[n.length - 1].route.index &&
        (h = Ct(
          {
            path: f.relativePath,
            caseSensitive: f.caseSensitive,
            end: !1,
          },
          d
        )),
      !h)
    )
      return null;
    Object.assign(o, h.params),
      s.push({
        // TODO: Can this as be avoided?
        params: o,
        pathname: Ce([a, h.pathname]),
        pathnameBase: Zo(Ce([a, h.pathnameBase])),
        route: m,
      }),
      h.pathnameBase !== "/" && (a = Ce([a, h.pathnameBase]));
  }
  return s;
}
function Ct(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, n] = Go(e.path, e.caseSensitive, e.end),
    o = t.match(r);
  if (!o) return null;
  let a = o[0],
    s = a.replace(/(.)\/+$/, "$1"),
    u = o.slice(1);
  return {
    params: n.reduce((l, { paramName: d, isOptional: h }, m) => {
      if (d === "*") {
        let b = u[m] || "";
        s = a.slice(0, a.length - b.length).replace(/(.)\/+$/, "$1");
      }
      const T = u[m];
      return (
        h && !T ? (l[d] = void 0) : (l[d] = (T || "").replace(/%2F/g, "/")), l
      );
    }, {}),
    pathname: a,
    pathnameBase: s,
    pattern: e,
  };
}
function Go(e, t = !1, r = !0) {
  Re(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(
      /\*$/,
      "/*"
    )}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(
      /\*$/,
      "/*"
    )}".`
  );
  let n = [],
    o =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (s, u, f) => (
            n.push({ paramName: u, isOptional: f != null }),
            f ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        )
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    e.endsWith("*")
      ? (n.push({ paramName: "*" }),
        (o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : r
      ? (o += "\\/*$")
      : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"),
    [new RegExp(o, t ? void 0 : "i"), n]
  );
}
function Ko(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      Re(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`
      ),
      e
    );
  }
}
function Ae(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length,
    n = e.charAt(r);
  return n && n !== "/" ? null : e.slice(r) || "/";
}
function Jo(e, t = "/") {
  let {
    pathname: r,
    search: n = "",
    hash: o = "",
  } = typeof e == "string" ? tt(e) : e;
  return {
    pathname: r ? (r.startsWith("/") ? r : Xo(r, t)) : t,
    search: ea(n),
    hash: ta(o),
  };
}
function Xo(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((o) => {
      o === ".." ? r.length > 1 && r.pop() : o !== "." && r.push(o);
    }),
    r.length > 1 ? r.join("/") : "/"
  );
}
function Vt(e, t, r, n) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(
    n
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Qo(e) {
  return e.filter(
    (t, r) => r === 0 || (t.route.path && t.route.path.length > 0)
  );
}
function gn(e) {
  let t = Qo(e);
  return t.map((r, n) => (n === t.length - 1 ? r.pathname : r.pathnameBase));
}
function vn(e, t, r, n = !1) {
  let o;
  typeof e == "string"
    ? (o = tt(e))
    : ((o = { ...e }),
      ue(
        !o.pathname || !o.pathname.includes("?"),
        Vt("?", "pathname", "search", o)
      ),
      ue(
        !o.pathname || !o.pathname.includes("#"),
        Vt("#", "pathname", "hash", o)
      ),
      ue(!o.search || !o.search.includes("#"), Vt("#", "search", "hash", o)));
  let a = e === "" || o.pathname === "",
    s = a ? "/" : o.pathname,
    u;
  if (s == null) u = r;
  else {
    let h = t.length - 1;
    if (!n && s.startsWith("..")) {
      let m = s.split("/");
      for (; m[0] === ".."; ) m.shift(), (h -= 1);
      o.pathname = m.join("/");
    }
    u = h >= 0 ? t[h] : "/";
  }
  let f = Jo(o, u),
    l = s && s !== "/" && s.endsWith("/"),
    d = (a || s === ".") && r.endsWith("/");
  return !f.pathname.endsWith("/") && (l || d) && (f.pathname += "/"), f;
}
var Ce = (e) => e.join("/").replace(/\/\/+/g, "/"),
  Zo = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  ea = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  ta = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function ra(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
var bn = ["POST", "PUT", "PATCH", "DELETE"];
new Set(bn);
var na = ["GET", ...bn];
new Set(na);
var ze = _.createContext(null);
ze.displayName = "DataRouter";
var jt = _.createContext(null);
jt.displayName = "DataRouterState";
_.createContext(!1);
var _n = _.createContext({
  isTransitioning: !1,
});
_n.displayName = "ViewTransition";
var oa = _.createContext(/* @__PURE__ */ new Map());
oa.displayName = "Fetchers";
var aa = _.createContext(null);
aa.displayName = "Await";
var Se = _.createContext(null);
Se.displayName = "Navigation";
var kt = _.createContext(null);
kt.displayName = "Location";
var Ne = _.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1,
});
Ne.displayName = "Route";
var ir = _.createContext(null);
ir.displayName = "RouteError";
function sa(e, { relative: t } = {}) {
  ue(
    rt(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: n } = _.useContext(Se),
    { hash: o, pathname: a, search: s } = nt(e, { relative: t }),
    u = a;
  return (
    r !== "/" && (u = a === "/" ? r : Ce([r, a])),
    n.createHref({ pathname: u, search: s, hash: o })
  );
}
function rt() {
  return _.useContext(kt) != null;
}
function Ue() {
  return (
    ue(
      rt(),
      // TODO: This error is probably because they somehow have 2 versions of the
      // router loaded. We can help them understand how to avoid that.
      "useLocation() may be used only in the context of a <Router> component."
    ),
    _.useContext(kt).location
  );
}
var En =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function wn(e) {
  _.useContext(Se).static || _.useLayoutEffect(e);
}
function lr() {
  let { isDataRoute: e } = _.useContext(Ne);
  return e ? ba() : ia();
}
function ia() {
  ue(
    rt(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = _.useContext(ze),
    { basename: t, navigator: r } = _.useContext(Se),
    { matches: n } = _.useContext(Ne),
    { pathname: o } = Ue(),
    a = JSON.stringify(gn(n)),
    s = _.useRef(!1);
  return (
    wn(() => {
      s.current = !0;
    }),
    _.useCallback(
      (f, l = {}) => {
        if ((Re(s.current, En), !s.current)) return;
        if (typeof f == "number") {
          r.go(f);
          return;
        }
        let d = vn(f, JSON.parse(a), o, l.relative === "path");
        e == null &&
          t !== "/" &&
          (d.pathname = d.pathname === "/" ? t : Ce([t, d.pathname])),
          (l.replace ? r.replace : r.push)(d, l.state, l);
      },
      [t, r, a, o, e]
    )
  );
}
_.createContext(null);
function nt(e, { relative: t } = {}) {
  let { matches: r } = _.useContext(Ne),
    { pathname: n } = Ue(),
    o = JSON.stringify(gn(r));
  return _.useMemo(() => vn(e, JSON.parse(o), n, t === "path"), [e, o, n, t]);
}
function la(e, t, r, n, o) {
  ue(
    rt(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: a } = _.useContext(Se),
    { matches: s } = _.useContext(Ne),
    u = s[s.length - 1],
    f = u ? u.params : {},
    l = u ? u.pathname : "/",
    d = u ? u.pathnameBase : "/",
    h = u && u.route;
  {
    let v = (h && h.path) || "";
    Tn(
      l,
      !h || v.endsWith("*") || v.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${l}" (under <Route path="${v}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${v}"> to <Route path="${
        v === "/" ? "*" : `${v}/*`
      }">.`
    );
  }
  let m = Ue(),
    T;
  T = m;
  let b = T.pathname || "/",
    R = b;
  if (d !== "/") {
    let v = d.replace(/^\//, "").split("/");
    R = "/" + b.replace(/^\//, "").split("/").slice(v.length).join("/");
  }
  let y = hn(e, { pathname: R });
  return (
    Re(
      h || y != null,
      `No routes matched location "${T.pathname}${T.search}${T.hash}" `
    ),
    Re(
      y == null ||
        y[y.length - 1].route.element !== void 0 ||
        y[y.length - 1].route.Component !== void 0 ||
        y[y.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${T.pathname}${T.search}${T.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
    ),
    pa(
      y &&
        y.map((v) =>
          Object.assign({}, v, {
            params: Object.assign({}, f, v.params),
            pathname: Ce([
              d,
              // Re-encode pathnames that were decoded inside matchRoutes.
              // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
              // `new URL()` internally and we need to prevent it from treating
              // them as separators
              a.encodeLocation
                ? a.encodeLocation(
                    v.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
                  ).pathname
                : v.pathname,
            ]),
            pathnameBase:
              v.pathnameBase === "/"
                ? d
                : Ce([
                    d,
                    // Re-encode pathnames that were decoded inside matchRoutes
                    // Pre-encode `?` and `#` ahead of `encodeLocation` because it uses
                    // `new URL()` internally and we need to prevent it from treating
                    // them as separators
                    a.encodeLocation
                      ? a.encodeLocation(
                          v.pathnameBase
                            .replace(/\?/g, "%3F")
                            .replace(/#/g, "%23")
                        ).pathname
                      : v.pathnameBase,
                  ]),
          })
        ),
      s,
      r,
      n,
      o
    )
  );
}
function ca() {
  let e = va(),
    t = ra(e)
      ? `${e.status} ${e.statusText}`
      : e instanceof Error
      ? e.message
      : JSON.stringify(e),
    r = e instanceof Error ? e.stack : null,
    n = "rgba(200,200,200, 0.5)",
    o = { padding: "0.5rem", backgroundColor: n },
    a = { padding: "2px 4px", backgroundColor: n },
    s = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", e),
    (s = /* @__PURE__ */ _.createElement(
      _.Fragment,
      null,
      /* @__PURE__ */ _.createElement("p", null, "💿 Hey developer 👋"),
      /* @__PURE__ */ _.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        /* @__PURE__ */ _.createElement("code", { style: a }, "ErrorBoundary"),
        " or",
        " ",
        /* @__PURE__ */ _.createElement("code", { style: a }, "errorElement"),
        " prop on your route."
      )
    )),
    /* @__PURE__ */ _.createElement(
      _.Fragment,
      null,
      /* @__PURE__ */ _.createElement(
        "h2",
        null,
        "Unexpected Application Error!"
      ),
      /* @__PURE__ */ _.createElement(
        "h3",
        { style: { fontStyle: "italic" } },
        t
      ),
      r ? /* @__PURE__ */ _.createElement("pre", { style: o }, r) : null,
      s
    )
  );
}
var ua = /* @__PURE__ */ _.createElement(ca, null),
  fa = class extends _.Component {
    constructor(e) {
      super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        });
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location ||
        (t.revalidation !== "idle" && e.revalidation === "idle")
        ? {
            error: e.error,
            location: e.location,
            revalidation: e.revalidation,
          }
        : {
            error: e.error !== void 0 ? e.error : t.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          };
    }
    componentDidCatch(e, t) {
      this.props.unstable_onError
        ? this.props.unstable_onError(e, t)
        : console.error(
            "React Router caught the following error during render",
            e
          );
    }
    render() {
      return this.state.error !== void 0
        ? /* @__PURE__ */ _.createElement(
            Ne.Provider,
            { value: this.props.routeContext },
            /* @__PURE__ */ _.createElement(ir.Provider, {
              value: this.state.error,
              children: this.props.component,
            })
          )
        : this.props.children;
    }
  };
function da({ routeContext: e, match: t, children: r }) {
  let n = _.useContext(ze);
  return (
    n &&
      n.static &&
      n.staticContext &&
      (t.route.errorElement || t.route.ErrorBoundary) &&
      (n.staticContext._deepestRenderedBoundaryId = t.route.id),
    /* @__PURE__ */ _.createElement(Ne.Provider, { value: e }, r)
  );
}
function pa(e, t = [], r = null, n = null, o = null) {
  if (e == null) {
    if (!r) return null;
    if (r.errors) e = r.matches;
    else if (t.length === 0 && !r.initialized && r.matches.length > 0)
      e = r.matches;
    else return null;
  }
  let a = e,
    s = r?.errors;
  if (s != null) {
    let l = a.findIndex((d) => d.route.id && s?.[d.route.id] !== void 0);
    ue(
      l >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        s
      ).join(",")}`
    ),
      (a = a.slice(0, Math.min(a.length, l + 1)));
  }
  let u = !1,
    f = -1;
  if (r)
    for (let l = 0; l < a.length; l++) {
      let d = a[l];
      if (
        ((d.route.HydrateFallback || d.route.hydrateFallbackElement) && (f = l),
        d.route.id)
      ) {
        let { loaderData: h, errors: m } = r,
          T =
            d.route.loader &&
            !h.hasOwnProperty(d.route.id) &&
            (!m || m[d.route.id] === void 0);
        if (d.route.lazy || T) {
          (u = !0), f >= 0 ? (a = a.slice(0, f + 1)) : (a = [a[0]]);
          break;
        }
      }
    }
  return a.reduceRight((l, d, h) => {
    let m,
      T = !1,
      b = null,
      R = null;
    r &&
      ((m = s && d.route.id ? s[d.route.id] : void 0),
      (b = d.route.errorElement || ua),
      u &&
        (f < 0 && h === 0
          ? (Tn(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (T = !0),
            (R = null))
          : f === h &&
            ((T = !0), (R = d.route.hydrateFallbackElement || null))));
    let y = t.concat(a.slice(0, h + 1)),
      C = () => {
        let v;
        return (
          m
            ? (v = b)
            : T
            ? (v = R)
            : d.route.Component
            ? (v = /* @__PURE__ */ _.createElement(d.route.Component, null))
            : d.route.element
            ? (v = d.route.element)
            : (v = l),
          /* @__PURE__ */ _.createElement(da, {
            match: d,
            routeContext: {
              outlet: l,
              matches: y,
              isDataRoute: r != null,
            },
            children: v,
          })
        );
      };
    return r && (d.route.ErrorBoundary || d.route.errorElement || h === 0)
      ? /* @__PURE__ */ _.createElement(fa, {
          location: r.location,
          revalidation: r.revalidation,
          component: b,
          error: m,
          children: C(),
          routeContext: { outlet: null, matches: y, isDataRoute: !0 },
          unstable_onError: n,
        })
      : C();
  }, null);
}
function cr(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function ha(e) {
  let t = _.useContext(ze);
  return ue(t, cr(e)), t;
}
function ma(e) {
  let t = _.useContext(jt);
  return ue(t, cr(e)), t;
}
function ya(e) {
  let t = _.useContext(Ne);
  return ue(t, cr(e)), t;
}
function ur(e) {
  let t = ya(e),
    r = t.matches[t.matches.length - 1];
  return (
    ue(
      r.route.id,
      `${e} can only be used on routes that contain a unique "id"`
    ),
    r.route.id
  );
}
function ga() {
  return ur(
    "useRouteId"
    /* UseRouteId */
  );
}
function va() {
  let e = _.useContext(ir),
    t = ma(
      "useRouteError"
      /* UseRouteError */
    ),
    r = ur(
      "useRouteError"
      /* UseRouteError */
    );
  return e !== void 0 ? e : t.errors?.[r];
}
function ba() {
  let { router: e } = ha(
      "useNavigate"
      /* UseNavigateStable */
    ),
    t = ur(
      "useNavigate"
      /* UseNavigateStable */
    ),
    r = _.useRef(!1);
  return (
    wn(() => {
      r.current = !0;
    }),
    _.useCallback(
      async (o, a = {}) => {
        Re(r.current, En),
          r.current &&
            (typeof o == "number"
              ? e.navigate(o)
              : await e.navigate(o, { fromRouteId: t, ...a }));
      },
      [e, t]
    )
  );
}
var Mr = {};
function Tn(e, t, r) {
  !t && !Mr[e] && ((Mr[e] = !0), Re(!1, r));
}
_.memo(_a);
function _a({ routes: e, future: t, state: r, unstable_onError: n }) {
  return la(e, void 0, r, n, t);
}
function Ea({
  basename: e = "/",
  children: t = null,
  location: r,
  navigationType: n = "POP",
  navigator: o,
  static: a = !1,
}) {
  ue(
    !rt(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let s = e.replace(/^\/*/, "/"),
    u = _.useMemo(
      () => ({
        basename: s,
        navigator: o,
        static: a,
        future: {},
      }),
      [s, o, a]
    );
  typeof r == "string" && (r = tt(r));
  let {
      pathname: f = "/",
      search: l = "",
      hash: d = "",
      state: h = null,
      key: m = "default",
    } = r,
    T = _.useMemo(() => {
      let b = Ae(f, s);
      return b == null
        ? null
        : {
            location: {
              pathname: b,
              search: l,
              hash: d,
              state: h,
              key: m,
            },
            navigationType: n,
          };
    }, [s, f, l, d, h, m, n]);
  return (
    Re(
      T != null,
      `<Router basename="${s}"> is not able to match the URL "${f}${l}${d}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    T == null
      ? null
      : /* @__PURE__ */ _.createElement(
          Se.Provider,
          { value: u },
          /* @__PURE__ */ _.createElement(kt.Provider, {
            children: t,
            value: T,
          })
        )
  );
}
var wt = "get",
  Tt = "application/x-www-form-urlencoded";
function Lt(e) {
  return e != null && typeof e.tagName == "string";
}
function wa(e) {
  return Lt(e) && e.tagName.toLowerCase() === "button";
}
function Ta(e) {
  return Lt(e) && e.tagName.toLowerCase() === "form";
}
function xa(e) {
  return Lt(e) && e.tagName.toLowerCase() === "input";
}
function Ra(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Sa(e, t) {
  return (
    e.button === 0 && // Ignore everything but left clicks
    (!t || t === "_self") && // Let browser handle "target=_blank" etc.
    !Ra(e)
  );
}
var vt = null;
function Ca() {
  if (vt === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ),
        (vt = !1);
    } catch {
      vt = !0;
    }
  return vt;
}
var Aa = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Wt(e) {
  return e != null && !Aa.has(e)
    ? (Re(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Tt}"`
      ),
      null)
    : e;
}
function Oa(e, t) {
  let r, n, o, a, s;
  if (Ta(e)) {
    let u = e.getAttribute("action");
    (n = u ? Ae(u, t) : null),
      (r = e.getAttribute("method") || wt),
      (o = Wt(e.getAttribute("enctype")) || Tt),
      (a = new FormData(e));
  } else if (wa(e) || (xa(e) && (e.type === "submit" || e.type === "image"))) {
    let u = e.form;
    if (u == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let f = e.getAttribute("formaction") || u.getAttribute("action");
    if (
      ((n = f ? Ae(f, t) : null),
      (r = e.getAttribute("formmethod") || u.getAttribute("method") || wt),
      (o =
        Wt(e.getAttribute("formenctype")) ||
        Wt(u.getAttribute("enctype")) ||
        Tt),
      (a = new FormData(u, e)),
      !Ca())
    ) {
      let { name: l, type: d, value: h } = e;
      if (d === "image") {
        let m = l ? `${l}.` : "";
        a.append(`${m}x`, "0"), a.append(`${m}y`, "0");
      } else l && a.append(l, h);
    }
  } else {
    if (Lt(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    (r = wt), (n = null), (o = Tt), (s = e);
  }
  return (
    a && o === "text/plain" && ((s = a), (a = void 0)),
    { action: n, method: r.toLowerCase(), encType: o, formData: a, body: s }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function fr(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Na(e, t, r) {
  let n =
    typeof e == "string"
      ? new URL(
          e,
          // This can be called during the SSR flow via PrefetchPageLinksImpl so
          // don't assume window is available
          typeof window > "u" ? "server://singlefetch/" : window.location.origin
        )
      : e;
  return (
    n.pathname === "/"
      ? (n.pathname = `_root.${r}`)
      : t && Ae(n.pathname, t) === "/"
      ? (n.pathname = `${t.replace(/\/$/, "")}/_root.${r}`)
      : (n.pathname = `${n.pathname.replace(/\/$/, "")}.${r}`),
    n
  );
}
async function ja(e, t) {
  if (e.id in t) return t[e.id];
  try {
    let r = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      e.module
    );
    return (t[e.id] = r), r;
  } catch (r) {
    return (
      console.error(
        `Error loading route module \`${e.module}\`, reloading page...`
      ),
      console.error(r),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function ka(e) {
  return e == null
    ? !1
    : e.href == null
    ? e.rel === "preload" &&
      typeof e.imageSrcSet == "string" &&
      typeof e.imageSizes == "string"
    : typeof e.rel == "string" && typeof e.href == "string";
}
async function La(e, t, r) {
  let n = await Promise.all(
    e.map(async (o) => {
      let a = t.routes[o.route.id];
      if (a) {
        let s = await ja(a, r);
        return s.links ? s.links() : [];
      }
      return [];
    })
  );
  return Ma(
    n
      .flat(1)
      .filter(ka)
      .filter((o) => o.rel === "stylesheet" || o.rel === "preload")
      .map((o) =>
        o.rel === "stylesheet"
          ? { ...o, rel: "prefetch", as: "style" }
          : { ...o, rel: "prefetch" }
      )
  );
}
function $r(e, t, r, n, o, a) {
  let s = (f, l) => (r[l] ? f.route.id !== r[l].route.id : !0),
    u = (f, l) =>
      // param change, /users/123 -> /users/456
      r[l].pathname !== f.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      (r[l].route.path?.endsWith("*") && r[l].params["*"] !== f.params["*"]);
  return a === "assets"
    ? t.filter((f, l) => s(f, l) || u(f, l))
    : a === "data"
    ? t.filter((f, l) => {
        let d = n.routes[f.route.id];
        if (!d || !d.hasLoader) return !1;
        if (s(f, l) || u(f, l)) return !0;
        if (f.route.shouldRevalidate) {
          let h = f.route.shouldRevalidate({
            currentUrl: new URL(o.pathname + o.search + o.hash, window.origin),
            currentParams: r[0]?.params || {},
            nextUrl: new URL(e, window.origin),
            nextParams: f.params,
            defaultShouldRevalidate: !0,
          });
          if (typeof h == "boolean") return h;
        }
        return !0;
      })
    : [];
}
function Pa(e, t, { includeHydrateFallback: r } = {}) {
  return Da(
    e
      .map((n) => {
        let o = t.routes[n.route.id];
        if (!o) return [];
        let a = [o.module];
        return (
          o.clientActionModule && (a = a.concat(o.clientActionModule)),
          o.clientLoaderModule && (a = a.concat(o.clientLoaderModule)),
          r &&
            o.hydrateFallbackModule &&
            (a = a.concat(o.hydrateFallbackModule)),
          o.imports && (a = a.concat(o.imports)),
          a
        );
      })
      .flat(1)
  );
}
function Da(e) {
  return [...new Set(e)];
}
function Ia(e) {
  let t = {},
    r = Object.keys(e).sort();
  for (let n of r) t[n] = e[n];
  return t;
}
function Ma(e, t) {
  let r = /* @__PURE__ */ new Set();
  return (
    new Set(t),
    e.reduce((n, o) => {
      let a = JSON.stringify(Ia(o));
      return r.has(a) || (r.add(a), n.push({ key: a, link: o })), n;
    }, [])
  );
}
function xn() {
  let e = _.useContext(ze);
  return (
    fr(
      e,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    e
  );
}
function $a() {
  let e = _.useContext(jt);
  return (
    fr(
      e,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    e
  );
}
var dr = _.createContext(void 0);
dr.displayName = "FrameworkContext";
function Rn() {
  let e = _.useContext(dr);
  return (
    fr(e, "You must render this element inside a <HydratedRouter> element"), e
  );
}
function Ua(e, t) {
  let r = _.useContext(dr),
    [n, o] = _.useState(!1),
    [a, s] = _.useState(!1),
    {
      onFocus: u,
      onBlur: f,
      onMouseEnter: l,
      onMouseLeave: d,
      onTouchStart: h,
    } = t,
    m = _.useRef(null);
  _.useEffect(() => {
    if ((e === "render" && s(!0), e === "viewport")) {
      let R = (C) => {
          C.forEach((v) => {
            s(v.isIntersecting);
          });
        },
        y = new IntersectionObserver(R, { threshold: 0.5 });
      return (
        m.current && y.observe(m.current),
        () => {
          y.disconnect();
        }
      );
    }
  }, [e]),
    _.useEffect(() => {
      if (n) {
        let R = setTimeout(() => {
          s(!0);
        }, 100);
        return () => {
          clearTimeout(R);
        };
      }
    }, [n]);
  let T = () => {
      o(!0);
    },
    b = () => {
      o(!1), s(!1);
    };
  return r
    ? e !== "intent"
      ? [a, m, {}]
      : [
          a,
          m,
          {
            onFocus: Ge(u, T),
            onBlur: Ge(f, b),
            onMouseEnter: Ge(l, T),
            onMouseLeave: Ge(d, b),
            onTouchStart: Ge(h, T),
          },
        ]
    : [!1, m, {}];
}
function Ge(e, t) {
  return (r) => {
    e && e(r), r.defaultPrevented || t(r);
  };
}
function Fa({ page: e, ...t }) {
  let { router: r } = xn(),
    n = _.useMemo(() => hn(r.routes, e, r.basename), [r.routes, e, r.basename]);
  return n
    ? /* @__PURE__ */ _.createElement(Ha, { page: e, matches: n, ...t })
    : null;
}
function Ba(e) {
  let { manifest: t, routeModules: r } = Rn(),
    [n, o] = _.useState([]);
  return (
    _.useEffect(() => {
      let a = !1;
      return (
        La(e, t, r).then((s) => {
          a || o(s);
        }),
        () => {
          a = !0;
        }
      );
    }, [e, t, r]),
    n
  );
}
function Ha({ page: e, matches: t, ...r }) {
  let n = Ue(),
    { manifest: o, routeModules: a } = Rn(),
    { basename: s } = xn(),
    { loaderData: u, matches: f } = $a(),
    l = _.useMemo(() => $r(e, t, f, o, n, "data"), [e, t, f, o, n]),
    d = _.useMemo(() => $r(e, t, f, o, n, "assets"), [e, t, f, o, n]),
    h = _.useMemo(() => {
      if (e === n.pathname + n.search + n.hash) return [];
      let b = /* @__PURE__ */ new Set(),
        R = !1;
      if (
        (t.forEach((C) => {
          let v = o.routes[C.route.id];
          !v ||
            !v.hasLoader ||
            ((!l.some((A) => A.route.id === C.route.id) &&
              C.route.id in u &&
              a[C.route.id]?.shouldRevalidate) ||
            v.hasClientLoader
              ? (R = !0)
              : b.add(C.route.id));
        }),
        b.size === 0)
      )
        return [];
      let y = Na(e, s, "data");
      return (
        R &&
          b.size > 0 &&
          y.searchParams.set(
            "_routes",
            t
              .filter((C) => b.has(C.route.id))
              .map((C) => C.route.id)
              .join(",")
          ),
        [y.pathname + y.search]
      );
    }, [s, u, n, o, l, t, e, a]),
    m = _.useMemo(() => Pa(d, o), [d, o]),
    T = Ba(d);
  return /* @__PURE__ */ _.createElement(
    _.Fragment,
    null,
    h.map((b) =>
      /* @__PURE__ */ _.createElement("link", {
        key: b,
        rel: "prefetch",
        as: "fetch",
        href: b,
        ...r,
      })
    ),
    m.map((b) =>
      /* @__PURE__ */ _.createElement("link", {
        key: b,
        rel: "modulepreload",
        href: b,
        ...r,
      })
    ),
    T.map(({ key: b, link: R }) =>
      // these don't spread `linkProps` because they are full link descriptors
      // already with their own props
      /* @__PURE__ */ _.createElement("link", { key: b, nonce: r.nonce, ...R })
    )
  );
}
function za(...e) {
  return (t) => {
    e.forEach((r) => {
      typeof r == "function" ? r(t) : r != null && (r.current = t);
    });
  };
}
var Sn =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  Sn &&
    (window.__reactRouterVersion = "7.9.3"); // @ts-expect-error
} catch {}
function Cn({ basename: e, children: t, window: r }) {
  let n = _.useRef();
  n.current == null && (n.current = Lo({ window: r, v5Compat: !0 }));
  let o = n.current,
    [a, s] = _.useState({
      action: o.action,
      location: o.location,
    }),
    u = _.useCallback(
      (f) => {
        _.startTransition(() => s(f));
      },
      [s]
    );
  return (
    _.useLayoutEffect(() => o.listen(u), [o, u]),
    /* @__PURE__ */ _.createElement(Ea, {
      basename: e,
      children: t,
      location: a.location,
      navigationType: a.action,
      navigator: o,
    })
  );
}
var An = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  On = _.forwardRef(function (
    {
      onClick: t,
      discover: r = "render",
      prefetch: n = "none",
      relative: o,
      reloadDocument: a,
      replace: s,
      state: u,
      target: f,
      to: l,
      preventScrollReset: d,
      viewTransition: h,
      ...m
    },
    T
  ) {
    let { basename: b } = _.useContext(Se),
      R = typeof l == "string" && An.test(l),
      y,
      C = !1;
    if (typeof l == "string" && R && ((y = l), Sn))
      try {
        let z = new URL(window.location.href),
          ee = l.startsWith("//") ? new URL(z.protocol + l) : new URL(l),
          re = Ae(ee.pathname, b);
        ee.origin === z.origin && re != null
          ? (l = re + ee.search + ee.hash)
          : (C = !0);
      } catch {
        Re(
          !1,
          `<Link to="${l}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let v = sa(l, { relative: o }),
      [A, L, $] = Ua(n, m),
      q = Ya(l, {
        replace: s,
        state: u,
        target: f,
        preventScrollReset: d,
        relative: o,
        viewTransition: h,
      });
    function j(z) {
      t && t(z), z.defaultPrevented || q(z);
    }
    let H =
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ _.createElement("a", {
        ...m,
        ...$,
        href: y || v,
        onClick: C || a ? t : j,
        ref: za(T, L),
        target: f,
        "data-discover": !R && r === "render" ? "true" : void 0,
      });
    return A && !R
      ? /* @__PURE__ */ _.createElement(
          _.Fragment,
          null,
          H,
          /* @__PURE__ */ _.createElement(Fa, { page: v })
        )
      : H;
  });
On.displayName = "Link";
var qa = _.forwardRef(function (
  {
    "aria-current": t = "page",
    caseSensitive: r = !1,
    className: n = "",
    end: o = !1,
    style: a,
    to: s,
    viewTransition: u,
    children: f,
    ...l
  },
  d
) {
  let h = nt(s, { relative: l.relative }),
    m = Ue(),
    T = _.useContext(jt),
    { navigator: b, basename: R } = _.useContext(Se),
    y =
      T != null && // Conditional usage is OK here because the usage of a data router is static
      // eslint-disable-next-line react-hooks/rules-of-hooks
      Qa(h) &&
      u === !0,
    C = b.encodeLocation ? b.encodeLocation(h).pathname : h.pathname,
    v = m.pathname,
    A =
      T && T.navigation && T.navigation.location
        ? T.navigation.location.pathname
        : null;
  r ||
    ((v = v.toLowerCase()),
    (A = A ? A.toLowerCase() : null),
    (C = C.toLowerCase())),
    A && R && (A = Ae(A, R) || A);
  const L = C !== "/" && C.endsWith("/") ? C.length - 1 : C.length;
  let $ = v === C || (!o && v.startsWith(C) && v.charAt(L) === "/"),
    q =
      A != null &&
      (A === C || (!o && A.startsWith(C) && A.charAt(C.length) === "/")),
    j = {
      isActive: $,
      isPending: q,
      isTransitioning: y,
    },
    H = $ ? t : void 0,
    z;
  typeof n == "function"
    ? (z = n(j))
    : (z = [
        n,
        $ ? "active" : null,
        q ? "pending" : null,
        y ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let ee = typeof a == "function" ? a(j) : a;
  return /* @__PURE__ */ _.createElement(
    On,
    {
      ...l,
      "aria-current": H,
      className: z,
      ref: d,
      style: ee,
      to: s,
      viewTransition: u,
    },
    typeof f == "function" ? f(j) : f
  );
});
qa.displayName = "NavLink";
var Va = _.forwardRef(
  (
    {
      discover: e = "render",
      fetcherKey: t,
      navigate: r,
      reloadDocument: n,
      replace: o,
      state: a,
      method: s = wt,
      action: u,
      onSubmit: f,
      relative: l,
      preventScrollReset: d,
      viewTransition: h,
      ...m
    },
    T
  ) => {
    let b = Ja(),
      R = Xa(u, { relative: l }),
      y = s.toLowerCase() === "get" ? "get" : "post",
      C = typeof u == "string" && An.test(u),
      v = (A) => {
        if ((f && f(A), A.defaultPrevented)) return;
        A.preventDefault();
        let L = A.nativeEvent.submitter,
          $ = L?.getAttribute("formmethod") || s;
        b(L || A.currentTarget, {
          fetcherKey: t,
          method: $,
          navigate: r,
          replace: o,
          state: a,
          relative: l,
          preventScrollReset: d,
          viewTransition: h,
        });
      };
    return /* @__PURE__ */ _.createElement("form", {
      ref: T,
      method: y,
      action: R,
      onSubmit: n ? f : v,
      ...m,
      "data-discover": !C && e === "render" ? "true" : void 0,
    });
  }
);
Va.displayName = "Form";
function Wa(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Nn(e) {
  let t = _.useContext(ze);
  return ue(t, Wa(e)), t;
}
function Ya(
  e,
  {
    target: t,
    replace: r,
    state: n,
    preventScrollReset: o,
    relative: a,
    viewTransition: s,
  } = {}
) {
  let u = lr(),
    f = Ue(),
    l = nt(e, { relative: a });
  return _.useCallback(
    (d) => {
      if (Sa(d, t)) {
        d.preventDefault();
        let h = r !== void 0 ? r : Ze(f) === Ze(l);
        u(e, {
          replace: h,
          state: n,
          preventScrollReset: o,
          relative: a,
          viewTransition: s,
        });
      }
    },
    [f, u, l, r, n, t, e, o, a, s]
  );
}
var Ga = 0,
  Ka = () => `__${String(++Ga)}__`;
function Ja() {
  let { router: e } = Nn(
      "useSubmit"
      /* UseSubmit */
    ),
    { basename: t } = _.useContext(Se),
    r = ga();
  return _.useCallback(
    async (n, o = {}) => {
      let { action: a, method: s, encType: u, formData: f, body: l } = Oa(n, t);
      if (o.navigate === !1) {
        let d = o.fetcherKey || Ka();
        await e.fetch(d, r, o.action || a, {
          preventScrollReset: o.preventScrollReset,
          formData: f,
          body: l,
          formMethod: o.method || s,
          formEncType: o.encType || u,
          flushSync: o.flushSync,
        });
      } else
        await e.navigate(o.action || a, {
          preventScrollReset: o.preventScrollReset,
          formData: f,
          body: l,
          formMethod: o.method || s,
          formEncType: o.encType || u,
          replace: o.replace,
          state: o.state,
          fromRouteId: r,
          flushSync: o.flushSync,
          viewTransition: o.viewTransition,
        });
    },
    [e, t, r]
  );
}
function Xa(e, { relative: t } = {}) {
  let { basename: r } = _.useContext(Se),
    n = _.useContext(Ne);
  ue(n, "useFormAction must be used inside a RouteContext");
  let [o] = n.matches.slice(-1),
    a = { ...nt(e || ".", { relative: t }) },
    s = Ue();
  if (e == null) {
    a.search = s.search;
    let u = new URLSearchParams(a.search),
      f = u.getAll("index");
    if (f.some((d) => d === "")) {
      u.delete("index"),
        f.filter((h) => h).forEach((h) => u.append("index", h));
      let d = u.toString();
      a.search = d ? `?${d}` : "";
    }
  }
  return (
    (!e || e === ".") &&
      o.route.index &&
      (a.search = a.search ? a.search.replace(/^\?/, "?index&") : "?index"),
    r !== "/" && (a.pathname = a.pathname === "/" ? r : Ce([r, a.pathname])),
    Ze(a)
  );
}
function Qa(e, { relative: t } = {}) {
  let r = _.useContext(_n);
  ue(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: n } = Nn(
      "useViewTransitionState"
      /* useViewTransitionState */
    ),
    o = nt(e, { relative: t });
  if (!r.isTransitioning) return !1;
  let a = Ae(r.currentLocation.pathname, n) || r.currentLocation.pathname,
    s = Ae(r.nextLocation.pathname, n) || r.nextLocation.pathname;
  return Ct(o.pathname, s) != null || Ct(o.pathname, a) != null;
}
var bt = { exports: {} },
  Ke = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ur;
function Za() {
  if (Ur) return Ke;
  Ur = 1;
  var e = Symbol.for("react.transitional.element"),
    t = Symbol.for("react.fragment");
  function r(n, o, a) {
    var s = null;
    if (
      (a !== void 0 && (s = "" + a),
      o.key !== void 0 && (s = "" + o.key),
      "key" in o)
    ) {
      a = {};
      for (var u in o) u !== "key" && (a[u] = o[u]);
    } else a = o;
    return (
      (o = a.ref),
      {
        $$typeof: e,
        type: n,
        key: s,
        ref: o !== void 0 ? o : null,
        props: a,
      }
    );
  }
  return (Ke.Fragment = t), (Ke.jsx = r), (Ke.jsxs = r), Ke;
}
var Je = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fr;
function es() {
  return (
    Fr ||
      ((Fr = 1),
      process.env.NODE_ENV !== "production" &&
        (function () {
          function e(c) {
            if (c == null) return null;
            if (typeof c == "function")
              return c.$$typeof === re ? null : c.displayName || c.name || null;
            if (typeof c == "string") return c;
            switch (c) {
              case y:
                return "Fragment";
              case v:
                return "Profiler";
              case C:
                return "StrictMode";
              case q:
                return "Suspense";
              case j:
                return "SuspenseList";
              case ee:
                return "Activity";
            }
            if (typeof c == "object")
              switch (
                (typeof c.tag == "number" &&
                  console.error(
                    "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
                  ),
                c.$$typeof)
              ) {
                case R:
                  return "Portal";
                case L:
                  return c.displayName || "Context";
                case A:
                  return (c._context.displayName || "Context") + ".Consumer";
                case $:
                  var S = c.render;
                  return (
                    (c = c.displayName),
                    c ||
                      ((c = S.displayName || S.name || ""),
                      (c = c !== "" ? "ForwardRef(" + c + ")" : "ForwardRef")),
                    c
                  );
                case H:
                  return (
                    (S = c.displayName || null),
                    S !== null ? S : e(c.type) || "Memo"
                  );
                case z:
                  (S = c._payload), (c = c._init);
                  try {
                    return e(c(S));
                  } catch {}
              }
            return null;
          }
          function t(c) {
            return "" + c;
          }
          function r(c) {
            try {
              t(c);
              var S = !1;
            } catch {
              S = !0;
            }
            if (S) {
              S = console;
              var P = S.error,
                E =
                  (typeof Symbol == "function" &&
                    Symbol.toStringTag &&
                    c[Symbol.toStringTag]) ||
                  c.constructor.name ||
                  "Object";
              return (
                P.call(
                  S,
                  "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
                  E
                ),
                t(c)
              );
            }
          }
          function n(c) {
            if (c === y) return "<>";
            if (typeof c == "object" && c !== null && c.$$typeof === z)
              return "<...>";
            try {
              var S = e(c);
              return S ? "<" + S + ">" : "<...>";
            } catch {
              return "<...>";
            }
          }
          function o() {
            var c = V.A;
            return c === null ? null : c.getOwner();
          }
          function a() {
            return Error("react-stack-top-frame");
          }
          function s(c) {
            if (se.call(c, "key")) {
              var S = Object.getOwnPropertyDescriptor(c, "key").get;
              if (S && S.isReactWarning) return !1;
            }
            return c.key !== void 0;
          }
          function u(c, S) {
            function P() {
              K ||
                ((K = !0),
                console.error(
                  "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
                  S
                ));
            }
            (P.isReactWarning = !0),
              Object.defineProperty(c, "key", {
                get: P,
                configurable: !0,
              });
          }
          function f() {
            var c = e(this.type);
            return (
              ce[c] ||
                ((ce[c] = !0),
                console.error(
                  "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
                )),
              (c = this.props.ref),
              c !== void 0 ? c : null
            );
          }
          function l(c, S, P, E, k, g) {
            var O = P.ref;
            return (
              (c = {
                $$typeof: b,
                type: c,
                key: S,
                props: P,
                _owner: E,
              }),
              (O !== void 0 ? O : null) !== null
                ? Object.defineProperty(c, "ref", {
                    enumerable: !1,
                    get: f,
                  })
                : Object.defineProperty(c, "ref", {
                    enumerable: !1,
                    value: null,
                  }),
              (c._store = {}),
              Object.defineProperty(c._store, "validated", {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: 0,
              }),
              Object.defineProperty(c, "_debugInfo", {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: null,
              }),
              Object.defineProperty(c, "_debugStack", {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: k,
              }),
              Object.defineProperty(c, "_debugTask", {
                configurable: !1,
                enumerable: !1,
                writable: !0,
                value: g,
              }),
              Object.freeze && (Object.freeze(c.props), Object.freeze(c)),
              c
            );
          }
          function d(c, S, P, E, k, g) {
            var O = S.children;
            if (O !== void 0)
              if (E)
                if (te(O)) {
                  for (E = 0; E < O.length; E++) h(O[E]);
                  Object.freeze && Object.freeze(O);
                } else
                  console.error(
                    "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
                  );
              else h(O);
            if (se.call(S, "key")) {
              O = e(c);
              var M = Object.keys(S).filter(function (F) {
                return F !== "key";
              });
              (E =
                0 < M.length
                  ? "{key: someKey, " + M.join(": ..., ") + ": ...}"
                  : "{key: someKey}"),
                me[O + E] ||
                  ((M =
                    0 < M.length ? "{" + M.join(": ..., ") + ": ...}" : "{}"),
                  console.error(
                    `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
                    E,
                    O,
                    M,
                    O
                  ),
                  (me[O + E] = !0));
            }
            if (
              ((O = null),
              P !== void 0 && (r(P), (O = "" + P)),
              s(S) && (r(S.key), (O = "" + S.key)),
              "key" in S)
            ) {
              P = {};
              for (var U in S) U !== "key" && (P[U] = S[U]);
            } else P = S;
            return (
              O &&
                u(
                  P,
                  typeof c == "function"
                    ? c.displayName || c.name || "Unknown"
                    : c
                ),
              l(c, O, P, o(), k, g)
            );
          }
          function h(c) {
            m(c)
              ? c._store && (c._store.validated = 1)
              : typeof c == "object" &&
                c !== null &&
                c.$$typeof === z &&
                (c._payload.status === "fulfilled"
                  ? m(c._payload.value) &&
                    c._payload.value._store &&
                    (c._payload.value._store.validated = 1)
                  : c._store && (c._store.validated = 1));
          }
          function m(c) {
            return typeof c == "object" && c !== null && c.$$typeof === b;
          }
          var T = Nt(),
            b = Symbol.for("react.transitional.element"),
            R = Symbol.for("react.portal"),
            y = Symbol.for("react.fragment"),
            C = Symbol.for("react.strict_mode"),
            v = Symbol.for("react.profiler"),
            A = Symbol.for("react.consumer"),
            L = Symbol.for("react.context"),
            $ = Symbol.for("react.forward_ref"),
            q = Symbol.for("react.suspense"),
            j = Symbol.for("react.suspense_list"),
            H = Symbol.for("react.memo"),
            z = Symbol.for("react.lazy"),
            ee = Symbol.for("react.activity"),
            re = Symbol.for("react.client.reference"),
            V =
              T.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
            se = Object.prototype.hasOwnProperty,
            te = Array.isArray,
            le = console.createTask
              ? console.createTask
              : function () {
                  return null;
                };
          T = {
            react_stack_bottom_frame: function (c) {
              return c();
            },
          };
          var K,
            ce = {},
            ae = T.react_stack_bottom_frame.bind(T, a)(),
            fe = le(n(a)),
            me = {};
          (Je.Fragment = y),
            (Je.jsx = function (c, S, P) {
              var E = 1e4 > V.recentlyCreatedOwnerStacks++;
              return d(
                c,
                S,
                P,
                !1,
                E ? Error("react-stack-top-frame") : ae,
                E ? le(n(c)) : fe
              );
            }),
            (Je.jsxs = function (c, S, P) {
              var E = 1e4 > V.recentlyCreatedOwnerStacks++;
              return d(
                c,
                S,
                P,
                !0,
                E ? Error("react-stack-top-frame") : ae,
                E ? le(n(c)) : fe
              );
            });
        })()),
    Je
  );
}
var Br;
function ts() {
  return (
    Br ||
      ((Br = 1),
      process.env.NODE_ENV === "production"
        ? (bt.exports = Za())
        : (bt.exports = es())),
    bt.exports
  );
}
var p = ts();
function jn(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: rs } = Object.prototype,
  { getPrototypeOf: pr } = Object,
  { iterator: Pt, toStringTag: kn } = Symbol,
  Dt = /* @__PURE__ */ ((e) => (t) => {
    const r = rs.call(t);
    return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
  })(/* @__PURE__ */ Object.create(null)),
  we = (e) => ((e = e.toLowerCase()), (t) => Dt(t) === e),
  It = (e) => (t) => typeof t === e,
  { isArray: qe } = Array,
  He = It("undefined");
function ot(e) {
  return (
    e !== null &&
    !He(e) &&
    e.constructor !== null &&
    !He(e.constructor) &&
    ge(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const Ln = we("ArrayBuffer");
function ns(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && Ln(e.buffer)),
    t
  );
}
const os = It("string"),
  ge = It("function"),
  Pn = It("number"),
  at = (e) => e !== null && typeof e == "object",
  as = (e) => e === !0 || e === !1,
  xt = (e) => {
    if (Dt(e) !== "object") return !1;
    const t = pr(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(kn in e) &&
      !(Pt in e)
    );
  },
  ss = (e) => {
    if (!at(e) || ot(e)) return !1;
    try {
      return (
        Object.keys(e).length === 0 &&
        Object.getPrototypeOf(e) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  is = we("Date"),
  ls = we("File"),
  cs = we("Blob"),
  us = we("FileList"),
  fs = (e) => at(e) && ge(e.pipe),
  ds = (e) => {
    let t;
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        (ge(e.append) &&
          ((t = Dt(e)) === "formdata" || // detect form-data instance
            (t === "object" &&
              ge(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  ps = we("URLSearchParams"),
  [hs, ms, ys, gs] = ["ReadableStream", "Request", "Response", "Headers"].map(
    we
  ),
  vs = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function st(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let n, o;
  if ((typeof e != "object" && (e = [e]), qe(e)))
    for (n = 0, o = e.length; n < o; n++) t.call(null, e[n], n, e);
  else {
    if (ot(e)) return;
    const a = r ? Object.getOwnPropertyNames(e) : Object.keys(e),
      s = a.length;
    let u;
    for (n = 0; n < s; n++) (u = a[n]), t.call(null, e[u], u, e);
  }
}
function Dn(e, t) {
  if (ot(e)) return null;
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length,
    o;
  for (; n-- > 0; ) if (((o = r[n]), t === o.toLowerCase())) return o;
  return null;
}
const Pe =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global,
  In = (e) => !He(e) && e !== Pe;
function Qt() {
  const { caseless: e, skipUndefined: t } = (In(this) && this) || {},
    r = {},
    n = (o, a) => {
      const s = (e && Dn(r, a)) || a;
      xt(r[s]) && xt(o)
        ? (r[s] = Qt(r[s], o))
        : xt(o)
        ? (r[s] = Qt({}, o))
        : qe(o)
        ? (r[s] = o.slice())
        : (!t || !He(o)) && (r[s] = o);
    };
  for (let o = 0, a = arguments.length; o < a; o++)
    arguments[o] && st(arguments[o], n);
  return r;
}
const bs = (e, t, r, { allOwnKeys: n } = {}) => (
    st(
      t,
      (o, a) => {
        r && ge(o) ? (e[a] = jn(o, r)) : (e[a] = o);
      },
      { allOwnKeys: n }
    ),
    e
  ),
  _s = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  Es = (e, t, r, n) => {
    (e.prototype = Object.create(t.prototype, n)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", {
        value: t.prototype,
      }),
      r && Object.assign(e.prototype, r);
  },
  ws = (e, t, r, n) => {
    let o, a, s;
    const u = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (o = Object.getOwnPropertyNames(e), a = o.length; a-- > 0; )
        (s = o[a]), (!n || n(s, e, t)) && !u[s] && ((t[s] = e[s]), (u[s] = !0));
      e = r !== !1 && pr(e);
    } while (e && (!r || r(e, t)) && e !== Object.prototype);
    return t;
  },
  Ts = (e, t, r) => {
    (e = String(e)),
      (r === void 0 || r > e.length) && (r = e.length),
      (r -= t.length);
    const n = e.indexOf(t, r);
    return n !== -1 && n === r;
  },
  xs = (e) => {
    if (!e) return null;
    if (qe(e)) return e;
    let t = e.length;
    if (!Pn(t)) return null;
    const r = new Array(t);
    for (; t-- > 0; ) r[t] = e[t];
    return r;
  },
  Rs = /* @__PURE__ */ (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && pr(Uint8Array)),
  Ss = (e, t) => {
    const n = (e && e[Pt]).call(e);
    let o;
    for (; (o = n.next()) && !o.done; ) {
      const a = o.value;
      t.call(e, a[0], a[1]);
    }
  },
  Cs = (e, t) => {
    let r;
    const n = [];
    for (; (r = e.exec(t)) !== null; ) n.push(r);
    return n;
  },
  As = we("HTMLFormElement"),
  Os = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (r, n, o) {
      return n.toUpperCase() + o;
    }),
  Hr = (
    ({ hasOwnProperty: e }) =>
    (t, r) =>
      e.call(t, r)
  )(Object.prototype),
  Ns = we("RegExp"),
  Mn = (e, t) => {
    const r = Object.getOwnPropertyDescriptors(e),
      n = {};
    st(r, (o, a) => {
      let s;
      (s = t(o, a, e)) !== !1 && (n[a] = s || o);
    }),
      Object.defineProperties(e, n);
  },
  js = (e) => {
    Mn(e, (t, r) => {
      if (ge(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
        return !1;
      const n = e[r];
      if (ge(n)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + r + "'");
          });
      }
    });
  },
  ks = (e, t) => {
    const r = {},
      n = (o) => {
        o.forEach((a) => {
          r[a] = !0;
        });
      };
    return qe(e) ? n(e) : n(String(e).split(t)), r;
  },
  Ls = () => {},
  Ps = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function Ds(e) {
  return !!(e && ge(e.append) && e[kn] === "FormData" && e[Pt]);
}
const Is = (e) => {
    const t = new Array(10),
      r = (n, o) => {
        if (at(n)) {
          if (t.indexOf(n) >= 0) return;
          if (ot(n)) return n;
          if (!("toJSON" in n)) {
            t[o] = n;
            const a = qe(n) ? [] : {};
            return (
              st(n, (s, u) => {
                const f = r(s, o + 1);
                !He(f) && (a[u] = f);
              }),
              (t[o] = void 0),
              a
            );
          }
        }
        return n;
      };
    return r(e, 0);
  },
  Ms = we("AsyncFunction"),
  $s = (e) => e && (at(e) || ge(e)) && ge(e.then) && ge(e.catch),
  $n = ((e, t) =>
    e
      ? setImmediate
      : t
      ? ((r, n) => (
          Pe.addEventListener(
            "message",
            ({ source: o, data: a }) => {
              o === Pe && a === r && n.length && n.shift()();
            },
            !1
          ),
          (o) => {
            n.push(o), Pe.postMessage(r, "*");
          }
        ))(`axios@${Math.random()}`, [])
      : (r) => setTimeout(r))(
    typeof setImmediate == "function",
    ge(Pe.postMessage)
  ),
  Us =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(Pe)
      : (typeof process < "u" && process.nextTick) || $n,
  Fs = (e) => e != null && ge(e[Pt]),
  x = {
    isArray: qe,
    isArrayBuffer: Ln,
    isBuffer: ot,
    isFormData: ds,
    isArrayBufferView: ns,
    isString: os,
    isNumber: Pn,
    isBoolean: as,
    isObject: at,
    isPlainObject: xt,
    isEmptyObject: ss,
    isReadableStream: hs,
    isRequest: ms,
    isResponse: ys,
    isHeaders: gs,
    isUndefined: He,
    isDate: is,
    isFile: ls,
    isBlob: cs,
    isRegExp: Ns,
    isFunction: ge,
    isStream: fs,
    isURLSearchParams: ps,
    isTypedArray: Rs,
    isFileList: us,
    forEach: st,
    merge: Qt,
    extend: bs,
    trim: vs,
    stripBOM: _s,
    inherits: Es,
    toFlatObject: ws,
    kindOf: Dt,
    kindOfTest: we,
    endsWith: Ts,
    toArray: xs,
    forEachEntry: Ss,
    matchAll: Cs,
    isHTMLForm: As,
    hasOwnProperty: Hr,
    hasOwnProp: Hr,
    // an alias to avoid ESLint no-prototype-builtins detection
    reduceDescriptors: Mn,
    freezeMethods: js,
    toObjectSet: ks,
    toCamelCase: Os,
    noop: Ls,
    toFiniteNumber: Ps,
    findKey: Dn,
    global: Pe,
    isContextDefined: In,
    isSpecCompliantForm: Ds,
    toJSONObject: Is,
    isAsyncFn: Ms,
    isThenable: $s,
    setImmediate: $n,
    asap: Us,
    isIterable: Fs,
  };
function Y(e, t, r, n, o) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    r && (this.config = r),
    n && (this.request = n),
    o && ((this.response = o), (this.status = o.status ? o.status : null));
}
x.inherits(Y, Error, {
  toJSON: function () {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: x.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const Un = Y.prototype,
  Fn = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
  // eslint-disable-next-line func-names
].forEach((e) => {
  Fn[e] = { value: e };
});
Object.defineProperties(Y, Fn);
Object.defineProperty(Un, "isAxiosError", { value: !0 });
Y.from = (e, t, r, n, o, a) => {
  const s = Object.create(Un);
  x.toFlatObject(
    e,
    s,
    function (d) {
      return d !== Error.prototype;
    },
    (l) => l !== "isAxiosError"
  );
  const u = e && e.message ? e.message : "Error",
    f = t == null && e ? e.code : t;
  return (
    Y.call(s, u, f, r, n, o),
    e &&
      s.cause == null &&
      Object.defineProperty(s, "cause", { value: e, configurable: !0 }),
    (s.name = (e && e.name) || "Error"),
    a && Object.assign(s, a),
    s
  );
};
const Bs = null;
function Zt(e) {
  return x.isPlainObject(e) || x.isArray(e);
}
function Bn(e) {
  return x.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function zr(e, t, r) {
  return e
    ? e
        .concat(t)
        .map(function (o, a) {
          return (o = Bn(o)), !r && a ? "[" + o + "]" : o;
        })
        .join(r ? "." : "")
    : t;
}
function Hs(e) {
  return x.isArray(e) && !e.some(Zt);
}
const zs = x.toFlatObject(x, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function Mt(e, t, r) {
  if (!x.isObject(e)) throw new TypeError("target must be an object");
  (t = t || new FormData()),
    (r = x.toFlatObject(
      r,
      {
        metaTokens: !0,
        dots: !1,
        indexes: !1,
      },
      !1,
      function (R, y) {
        return !x.isUndefined(y[R]);
      }
    ));
  const n = r.metaTokens,
    o = r.visitor || d,
    a = r.dots,
    s = r.indexes,
    f = (r.Blob || (typeof Blob < "u" && Blob)) && x.isSpecCompliantForm(t);
  if (!x.isFunction(o)) throw new TypeError("visitor must be a function");
  function l(b) {
    if (b === null) return "";
    if (x.isDate(b)) return b.toISOString();
    if (x.isBoolean(b)) return b.toString();
    if (!f && x.isBlob(b))
      throw new Y("Blob is not supported. Use a Buffer instead.");
    return x.isArrayBuffer(b) || x.isTypedArray(b)
      ? f && typeof Blob == "function"
        ? new Blob([b])
        : Buffer.from(b)
      : b;
  }
  function d(b, R, y) {
    let C = b;
    if (b && !y && typeof b == "object") {
      if (x.endsWith(R, "{}"))
        (R = n ? R : R.slice(0, -2)), (b = JSON.stringify(b));
      else if (
        (x.isArray(b) && Hs(b)) ||
        ((x.isFileList(b) || x.endsWith(R, "[]")) && (C = x.toArray(b)))
      )
        return (
          (R = Bn(R)),
          C.forEach(function (A, L) {
            !(x.isUndefined(A) || A === null) &&
              t.append(
                // eslint-disable-next-line no-nested-ternary
                s === !0 ? zr([R], L, a) : s === null ? R : R + "[]",
                l(A)
              );
          }),
          !1
        );
    }
    return Zt(b) ? !0 : (t.append(zr(y, R, a), l(b)), !1);
  }
  const h = [],
    m = Object.assign(zs, {
      defaultVisitor: d,
      convertValue: l,
      isVisitable: Zt,
    });
  function T(b, R) {
    if (!x.isUndefined(b)) {
      if (h.indexOf(b) !== -1)
        throw Error("Circular reference detected in " + R.join("."));
      h.push(b),
        x.forEach(b, function (C, v) {
          (!(x.isUndefined(C) || C === null) &&
            o.call(t, C, x.isString(v) ? v.trim() : v, R, m)) === !0 &&
            T(C, R ? R.concat(v) : [v]);
        }),
        h.pop();
    }
  }
  if (!x.isObject(e)) throw new TypeError("data must be an object");
  return T(e), t;
}
function qr(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (n) {
    return t[n];
  });
}
function hr(e, t) {
  (this._pairs = []), e && Mt(e, this, t);
}
const Hn = hr.prototype;
Hn.append = function (t, r) {
  this._pairs.push([t, r]);
};
Hn.toString = function (t) {
  const r = t
    ? function (n) {
        return t.call(this, n, qr);
      }
    : qr;
  return this._pairs
    .map(function (o) {
      return r(o[0]) + "=" + r(o[1]);
    }, "")
    .join("&");
};
function qs(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+");
}
function zn(e, t, r) {
  if (!t) return e;
  const n = (r && r.encode) || qs;
  x.isFunction(r) &&
    (r = {
      serialize: r,
    });
  const o = r && r.serialize;
  let a;
  if (
    (o
      ? (a = o(t, r))
      : (a = x.isURLSearchParams(t) ? t.toString() : new hr(t, r).toString(n)),
    a)
  ) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + a);
  }
  return e;
}
class Vr {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, r, n) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: r,
        synchronous: n ? n.synchronous : !1,
        runWhen: n ? n.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    x.forEach(this.handlers, function (n) {
      n !== null && t(n);
    });
  }
}
const qn = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  Vs = typeof URLSearchParams < "u" ? URLSearchParams : hr,
  Ws = typeof FormData < "u" ? FormData : null,
  Ys = typeof Blob < "u" ? Blob : null,
  Gs = {
    isBrowser: !0,
    classes: {
      URLSearchParams: Vs,
      FormData: Ws,
      Blob: Ys,
    },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  mr = typeof window < "u" && typeof document < "u",
  er = (typeof navigator == "object" && navigator) || void 0,
  Ks =
    mr &&
    (!er || ["ReactNative", "NativeScript", "NS"].indexOf(er.product) < 0),
  Js =
    typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  Xs = (mr && window.location.href) || "http://localhost",
  Qs = /* @__PURE__ */ Object.freeze(
    /* @__PURE__ */ Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: mr,
        hasStandardBrowserEnv: Ks,
        hasStandardBrowserWebWorkerEnv: Js,
        navigator: er,
        origin: Xs,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  he = {
    ...Qs,
    ...Gs,
  };
function Zs(e, t) {
  return Mt(e, new he.classes.URLSearchParams(), {
    visitor: function (r, n, o, a) {
      return he.isNode && x.isBuffer(r)
        ? (this.append(n, r.toString("base64")), !1)
        : a.defaultVisitor.apply(this, arguments);
    },
    ...t,
  });
}
function ei(e) {
  return x
    .matchAll(/\w+|\[(\w*)]/g, e)
    .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
}
function ti(e) {
  const t = {},
    r = Object.keys(e);
  let n;
  const o = r.length;
  let a;
  for (n = 0; n < o; n++) (a = r[n]), (t[a] = e[a]);
  return t;
}
function Vn(e) {
  function t(r, n, o, a) {
    let s = r[a++];
    if (s === "__proto__") return !0;
    const u = Number.isFinite(+s),
      f = a >= r.length;
    return (
      (s = !s && x.isArray(o) ? o.length : s),
      f
        ? (x.hasOwnProp(o, s) ? (o[s] = [o[s], n]) : (o[s] = n), !u)
        : ((!o[s] || !x.isObject(o[s])) && (o[s] = []),
          t(r, n, o[s], a) && x.isArray(o[s]) && (o[s] = ti(o[s])),
          !u)
    );
  }
  if (x.isFormData(e) && x.isFunction(e.entries)) {
    const r = {};
    return (
      x.forEachEntry(e, (n, o) => {
        t(ei(n), o, r, 0);
      }),
      r
    );
  }
  return null;
}
function ri(e, t, r) {
  if (x.isString(e))
    try {
      return (t || JSON.parse)(e), x.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError") throw n;
    }
  return (r || JSON.stringify)(e);
}
const it = {
  transitional: qn,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (t, r) {
      const n = r.getContentType() || "",
        o = n.indexOf("application/json") > -1,
        a = x.isObject(t);
      if ((a && x.isHTMLForm(t) && (t = new FormData(t)), x.isFormData(t)))
        return o ? JSON.stringify(Vn(t)) : t;
      if (
        x.isArrayBuffer(t) ||
        x.isBuffer(t) ||
        x.isStream(t) ||
        x.isFile(t) ||
        x.isBlob(t) ||
        x.isReadableStream(t)
      )
        return t;
      if (x.isArrayBufferView(t)) return t.buffer;
      if (x.isURLSearchParams(t))
        return (
          r.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          t.toString()
        );
      let u;
      if (a) {
        if (n.indexOf("application/x-www-form-urlencoded") > -1)
          return Zs(t, this.formSerializer).toString();
        if ((u = x.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
          const f = this.env && this.env.FormData;
          return Mt(
            u ? { "files[]": t } : t,
            f && new f(),
            this.formSerializer
          );
        }
      }
      return a || o ? (r.setContentType("application/json", !1), ri(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const r = this.transitional || it.transitional,
        n = r && r.forcedJSONParsing,
        o = this.responseType === "json";
      if (x.isResponse(t) || x.isReadableStream(t)) return t;
      if (t && x.isString(t) && ((n && !this.responseType) || o)) {
        const s = !(r && r.silentJSONParsing) && o;
        try {
          return JSON.parse(t, this.parseReviver);
        } catch (u) {
          if (s)
            throw u.name === "SyntaxError"
              ? Y.from(u, Y.ERR_BAD_RESPONSE, this, null, this.response)
              : u;
        }
      }
      return t;
    },
  ],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: he.classes.FormData,
    Blob: he.classes.Blob,
  },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
x.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  it.headers[e] = {};
});
const ni = x.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  oi = (e) => {
    const t = {};
    let r, n, o;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (s) {
            (o = s.indexOf(":")),
              (r = s.substring(0, o).trim().toLowerCase()),
              (n = s.substring(o + 1).trim()),
              !(!r || (t[r] && ni[r])) &&
                (r === "set-cookie"
                  ? t[r]
                    ? t[r].push(n)
                    : (t[r] = [n])
                  : (t[r] = t[r] ? t[r] + ", " + n : n));
          }),
      t
    );
  },
  Wr = Symbol("internals");
function Xe(e) {
  return e && String(e).trim().toLowerCase();
}
function Rt(e) {
  return e === !1 || e == null ? e : x.isArray(e) ? e.map(Rt) : String(e);
}
function ai(e) {
  const t = /* @__PURE__ */ Object.create(null),
    r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; (n = r.exec(e)); ) t[n[1]] = n[2];
  return t;
}
const si = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function Yt(e, t, r, n, o) {
  if (x.isFunction(n)) return n.call(this, t, r);
  if ((o && (t = r), !!x.isString(t))) {
    if (x.isString(n)) return t.indexOf(n) !== -1;
    if (x.isRegExp(n)) return n.test(t);
  }
}
function ii(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function li(e, t) {
  const r = x.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function (o, a, s) {
        return this[n].call(this, t, o, a, s);
      },
      configurable: !0,
    });
  });
}
let ve = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const o = this;
    function a(u, f, l) {
      const d = Xe(f);
      if (!d) throw new Error("header name must be a non-empty string");
      const h = x.findKey(o, d);
      (!h || o[h] === void 0 || l === !0 || (l === void 0 && o[h] !== !1)) &&
        (o[h || f] = Rt(u));
    }
    const s = (u, f) => x.forEach(u, (l, d) => a(l, d, f));
    if (x.isPlainObject(t) || t instanceof this.constructor) s(t, r);
    else if (x.isString(t) && (t = t.trim()) && !si(t)) s(oi(t), r);
    else if (x.isObject(t) && x.isIterable(t)) {
      let u = {},
        f,
        l;
      for (const d of t) {
        if (!x.isArray(d))
          throw TypeError("Object iterator must return a key-value pair");
        u[(l = d[0])] = (f = u[l])
          ? x.isArray(f)
            ? [...f, d[1]]
            : [f, d[1]]
          : d[1];
      }
      s(u, r);
    } else t != null && a(r, t, n);
    return this;
  }
  get(t, r) {
    if (((t = Xe(t)), t)) {
      const n = x.findKey(this, t);
      if (n) {
        const o = this[n];
        if (!r) return o;
        if (r === !0) return ai(o);
        if (x.isFunction(r)) return r.call(this, o, n);
        if (x.isRegExp(r)) return r.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (((t = Xe(t)), t)) {
      const n = x.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!r || Yt(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let o = !1;
    function a(s) {
      if (((s = Xe(s)), s)) {
        const u = x.findKey(n, s);
        u && (!r || Yt(n, n[u], u, r)) && (delete n[u], (o = !0));
      }
    }
    return x.isArray(t) ? t.forEach(a) : a(t), o;
  }
  clear(t) {
    const r = Object.keys(this);
    let n = r.length,
      o = !1;
    for (; n--; ) {
      const a = r[n];
      (!t || Yt(this, this[a], a, t, !0)) && (delete this[a], (o = !0));
    }
    return o;
  }
  normalize(t) {
    const r = this,
      n = {};
    return (
      x.forEach(this, (o, a) => {
        const s = x.findKey(n, a);
        if (s) {
          (r[s] = Rt(o)), delete r[a];
          return;
        }
        const u = t ? ii(a) : String(a).trim();
        u !== a && delete r[a], (r[u] = Rt(o)), (n[u] = !0);
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return (
      x.forEach(this, (n, o) => {
        n != null && n !== !1 && (r[o] = t && x.isArray(n) ? n.join(", ") : n);
      }),
      r
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, r]) => t + ": " + r).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...r) {
    const n = new this(t);
    return r.forEach((o) => n.set(o)), n;
  }
  static accessor(t) {
    const n = (this[Wr] = this[Wr] =
        {
          accessors: {},
        }).accessors,
      o = this.prototype;
    function a(s) {
      const u = Xe(s);
      n[u] || (li(o, s), (n[u] = !0));
    }
    return x.isArray(t) ? t.forEach(a) : a(t), this;
  }
};
ve.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
x.reduceDescriptors(ve.prototype, ({ value: e }, t) => {
  let r = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[r] = n;
    },
  };
});
x.freezeMethods(ve);
function Gt(e, t) {
  const r = this || it,
    n = t || r,
    o = ve.from(n.headers);
  let a = n.data;
  return (
    x.forEach(e, function (u) {
      a = u.call(r, a, o.normalize(), t ? t.status : void 0);
    }),
    o.normalize(),
    a
  );
}
function Wn(e) {
  return !!(e && e.__CANCEL__);
}
function Ve(e, t, r) {
  Y.call(this, e ?? "canceled", Y.ERR_CANCELED, t, r),
    (this.name = "CanceledError");
}
x.inherits(Ve, Y, {
  __CANCEL__: !0,
});
function Yn(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status)
    ? e(r)
    : t(
        new Y(
          "Request failed with status code " + r.status,
          [Y.ERR_BAD_REQUEST, Y.ERR_BAD_RESPONSE][
            Math.floor(r.status / 100) - 4
          ],
          r.config,
          r.request,
          r
        )
      );
}
function ci(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function ui(e, t) {
  e = e || 10;
  const r = new Array(e),
    n = new Array(e);
  let o = 0,
    a = 0,
    s;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (f) {
      const l = Date.now(),
        d = n[a];
      s || (s = l), (r[o] = f), (n[o] = l);
      let h = a,
        m = 0;
      for (; h !== o; ) (m += r[h++]), (h = h % e);
      if (((o = (o + 1) % e), o === a && (a = (a + 1) % e), l - s < t)) return;
      const T = d && l - d;
      return T ? Math.round((m * 1e3) / T) : void 0;
    }
  );
}
function fi(e, t) {
  let r = 0,
    n = 1e3 / t,
    o,
    a;
  const s = (l, d = Date.now()) => {
    (r = d), (o = null), a && (clearTimeout(a), (a = null)), e(...l);
  };
  return [
    (...l) => {
      const d = Date.now(),
        h = d - r;
      h >= n
        ? s(l, d)
        : ((o = l),
          a ||
            (a = setTimeout(() => {
              (a = null), s(o);
            }, n - h)));
    },
    () => o && s(o),
  ];
}
const At = (e, t, r = 3) => {
    let n = 0;
    const o = ui(50, 250);
    return fi((a) => {
      const s = a.loaded,
        u = a.lengthComputable ? a.total : void 0,
        f = s - n,
        l = o(f),
        d = s <= u;
      n = s;
      const h = {
        loaded: s,
        total: u,
        progress: u ? s / u : void 0,
        bytes: f,
        rate: l || void 0,
        estimated: l && u && d ? (u - s) / l : void 0,
        event: a,
        lengthComputable: u != null,
        [t ? "download" : "upload"]: !0,
      };
      e(h);
    }, r);
  },
  Yr = (e, t) => {
    const r = e != null;
    return [
      (n) =>
        t[0]({
          lengthComputable: r,
          total: e,
          loaded: n,
        }),
      t[1],
    ];
  },
  Gr =
    (e) =>
    (...t) =>
      x.asap(() => e(...t)),
  di = he.hasStandardBrowserEnv
    ? /* @__PURE__ */ ((e, t) => (r) => (
        (r = new URL(r, he.origin)),
        e.protocol === r.protocol &&
          e.host === r.host &&
          (t || e.port === r.port)
      ))(
        new URL(he.origin),
        he.navigator && /(msie|trident)/i.test(he.navigator.userAgent)
      )
    : () => !0,
  pi = he.hasStandardBrowserEnv
    ? // Standard browser envs support document.cookie
      {
        write(e, t, r, n, o, a) {
          const s = [e + "=" + encodeURIComponent(t)];
          x.isNumber(r) && s.push("expires=" + new Date(r).toGMTString()),
            x.isString(n) && s.push("path=" + n),
            x.isString(o) && s.push("domain=" + o),
            a === !0 && s.push("secure"),
            (document.cookie = s.join("; "));
        },
        read(e) {
          const t = document.cookie.match(
            new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
          );
          return t ? decodeURIComponent(t[3]) : null;
        },
        remove(e) {
          this.write(e, "", Date.now() - 864e5);
        },
      }
    : // Non-standard browser env (web workers, react-native) lack needed support.
      {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function hi(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function mi(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Gn(e, t, r) {
  let n = !hi(t);
  return e && (n || r == !1) ? mi(e, t) : t;
}
const Kr = (e) => (e instanceof ve ? { ...e } : e);
function Me(e, t) {
  t = t || {};
  const r = {};
  function n(l, d, h, m) {
    return x.isPlainObject(l) && x.isPlainObject(d)
      ? x.merge.call({ caseless: m }, l, d)
      : x.isPlainObject(d)
      ? x.merge({}, d)
      : x.isArray(d)
      ? d.slice()
      : d;
  }
  function o(l, d, h, m) {
    if (x.isUndefined(d)) {
      if (!x.isUndefined(l)) return n(void 0, l, h, m);
    } else return n(l, d, h, m);
  }
  function a(l, d) {
    if (!x.isUndefined(d)) return n(void 0, d);
  }
  function s(l, d) {
    if (x.isUndefined(d)) {
      if (!x.isUndefined(l)) return n(void 0, l);
    } else return n(void 0, d);
  }
  function u(l, d, h) {
    if (h in t) return n(l, d);
    if (h in e) return n(void 0, l);
  }
  const f = {
    url: a,
    method: a,
    data: a,
    baseURL: s,
    transformRequest: s,
    transformResponse: s,
    paramsSerializer: s,
    timeout: s,
    timeoutMessage: s,
    withCredentials: s,
    withXSRFToken: s,
    adapter: s,
    responseType: s,
    xsrfCookieName: s,
    xsrfHeaderName: s,
    onUploadProgress: s,
    onDownloadProgress: s,
    decompress: s,
    maxContentLength: s,
    maxBodyLength: s,
    beforeRedirect: s,
    transport: s,
    httpAgent: s,
    httpsAgent: s,
    cancelToken: s,
    socketPath: s,
    responseEncoding: s,
    validateStatus: u,
    headers: (l, d, h) => o(Kr(l), Kr(d), h, !0),
  };
  return (
    x.forEach(Object.keys({ ...e, ...t }), function (d) {
      const h = f[d] || o,
        m = h(e[d], t[d], d);
      (x.isUndefined(m) && h !== u) || (r[d] = m);
    }),
    r
  );
}
const Kn = (e) => {
    const t = Me({}, e);
    let {
      data: r,
      withXSRFToken: n,
      xsrfHeaderName: o,
      xsrfCookieName: a,
      headers: s,
      auth: u,
    } = t;
    if (
      ((t.headers = s = ve.from(s)),
      (t.url = zn(
        Gn(t.baseURL, t.url, t.allowAbsoluteUrls),
        e.params,
        e.paramsSerializer
      )),
      u &&
        s.set(
          "Authorization",
          "Basic " +
            btoa(
              (u.username || "") +
                ":" +
                (u.password ? unescape(encodeURIComponent(u.password)) : "")
            )
        ),
      x.isFormData(r))
    ) {
      if (he.hasStandardBrowserEnv || he.hasStandardBrowserWebWorkerEnv)
        s.setContentType(void 0);
      else if (x.isFunction(r.getHeaders)) {
        const f = r.getHeaders(),
          l = ["content-type", "content-length"];
        Object.entries(f).forEach(([d, h]) => {
          l.includes(d.toLowerCase()) && s.set(d, h);
        });
      }
    }
    if (
      he.hasStandardBrowserEnv &&
      (n && x.isFunction(n) && (n = n(t)), n || (n !== !1 && di(t.url)))
    ) {
      const f = o && a && pi.read(a);
      f && s.set(o, f);
    }
    return t;
  },
  yi = typeof XMLHttpRequest < "u",
  gi =
    yi &&
    function (e) {
      return new Promise(function (r, n) {
        const o = Kn(e);
        let a = o.data;
        const s = ve.from(o.headers).normalize();
        let { responseType: u, onUploadProgress: f, onDownloadProgress: l } = o,
          d,
          h,
          m,
          T,
          b;
        function R() {
          T && T(),
            b && b(),
            o.cancelToken && o.cancelToken.unsubscribe(d),
            o.signal && o.signal.removeEventListener("abort", d);
        }
        let y = new XMLHttpRequest();
        y.open(o.method.toUpperCase(), o.url, !0), (y.timeout = o.timeout);
        function C() {
          if (!y) return;
          const A = ve.from(
              "getAllResponseHeaders" in y && y.getAllResponseHeaders()
            ),
            $ = {
              data:
                !u || u === "text" || u === "json"
                  ? y.responseText
                  : y.response,
              status: y.status,
              statusText: y.statusText,
              headers: A,
              config: e,
              request: y,
            };
          Yn(
            function (j) {
              r(j), R();
            },
            function (j) {
              n(j), R();
            },
            $
          ),
            (y = null);
        }
        "onloadend" in y
          ? (y.onloadend = C)
          : (y.onreadystatechange = function () {
              !y ||
                y.readyState !== 4 ||
                (y.status === 0 &&
                  !(y.responseURL && y.responseURL.indexOf("file:") === 0)) ||
                setTimeout(C);
            }),
          (y.onabort = function () {
            y &&
              (n(new Y("Request aborted", Y.ECONNABORTED, e, y)), (y = null));
          }),
          (y.onerror = function (L) {
            const $ = L && L.message ? L.message : "Network Error",
              q = new Y($, Y.ERR_NETWORK, e, y);
            (q.event = L || null), n(q), (y = null);
          }),
          (y.ontimeout = function () {
            let L = o.timeout
              ? "timeout of " + o.timeout + "ms exceeded"
              : "timeout exceeded";
            const $ = o.transitional || qn;
            o.timeoutErrorMessage && (L = o.timeoutErrorMessage),
              n(
                new Y(
                  L,
                  $.clarifyTimeoutError ? Y.ETIMEDOUT : Y.ECONNABORTED,
                  e,
                  y
                )
              ),
              (y = null);
          }),
          a === void 0 && s.setContentType(null),
          "setRequestHeader" in y &&
            x.forEach(s.toJSON(), function (L, $) {
              y.setRequestHeader($, L);
            }),
          x.isUndefined(o.withCredentials) ||
            (y.withCredentials = !!o.withCredentials),
          u && u !== "json" && (y.responseType = o.responseType),
          l && (([m, b] = At(l, !0)), y.addEventListener("progress", m)),
          f &&
            y.upload &&
            (([h, T] = At(f)),
            y.upload.addEventListener("progress", h),
            y.upload.addEventListener("loadend", T)),
          (o.cancelToken || o.signal) &&
            ((d = (A) => {
              y &&
                (n(!A || A.type ? new Ve(null, e, y) : A),
                y.abort(),
                (y = null));
            }),
            o.cancelToken && o.cancelToken.subscribe(d),
            o.signal &&
              (o.signal.aborted ? d() : o.signal.addEventListener("abort", d)));
        const v = ci(o.url);
        if (v && he.protocols.indexOf(v) === -1) {
          n(new Y("Unsupported protocol " + v + ":", Y.ERR_BAD_REQUEST, e));
          return;
        }
        y.send(a || null);
      });
    },
  vi = (e, t) => {
    const { length: r } = (e = e ? e.filter(Boolean) : []);
    if (t || r) {
      let n = new AbortController(),
        o;
      const a = function (l) {
        if (!o) {
          (o = !0), u();
          const d = l instanceof Error ? l : this.reason;
          n.abort(
            d instanceof Y ? d : new Ve(d instanceof Error ? d.message : d)
          );
        }
      };
      let s =
        t &&
        setTimeout(() => {
          (s = null), a(new Y(`timeout ${t} of ms exceeded`, Y.ETIMEDOUT));
        }, t);
      const u = () => {
        e &&
          (s && clearTimeout(s),
          (s = null),
          e.forEach((l) => {
            l.unsubscribe
              ? l.unsubscribe(a)
              : l.removeEventListener("abort", a);
          }),
          (e = null));
      };
      e.forEach((l) => l.addEventListener("abort", a));
      const { signal: f } = n;
      return (f.unsubscribe = () => x.asap(u)), f;
    }
  },
  bi = function* (e, t) {
    let r = e.byteLength;
    if (r < t) {
      yield e;
      return;
    }
    let n = 0,
      o;
    for (; n < r; ) (o = n + t), yield e.slice(n, o), (n = o);
  },
  _i = async function* (e, t) {
    for await (const r of Ei(e)) yield* bi(r, t);
  },
  Ei = async function* (e) {
    if (e[Symbol.asyncIterator]) {
      yield* e;
      return;
    }
    const t = e.getReader();
    try {
      for (;;) {
        const { done: r, value: n } = await t.read();
        if (r) break;
        yield n;
      }
    } finally {
      await t.cancel();
    }
  },
  Jr = (e, t, r, n) => {
    const o = _i(e, t);
    let a = 0,
      s,
      u = (f) => {
        s || ((s = !0), n && n(f));
      };
    return new ReadableStream(
      {
        async pull(f) {
          try {
            const { done: l, value: d } = await o.next();
            if (l) {
              u(), f.close();
              return;
            }
            let h = d.byteLength;
            if (r) {
              let m = (a += h);
              r(m);
            }
            f.enqueue(new Uint8Array(d));
          } catch (l) {
            throw (u(l), l);
          }
        },
        cancel(f) {
          return u(f), o.return();
        },
      },
      {
        highWaterMark: 2,
      }
    );
  },
  Xr = 64 * 1024,
  { isFunction: _t } = x,
  wi = (({ Request: e, Response: t }) => ({
    Request: e,
    Response: t,
  }))(x.global),
  { ReadableStream: Qr, TextEncoder: Zr } = x.global,
  en = (e, ...t) => {
    try {
      return !!e(...t);
    } catch {
      return !1;
    }
  },
  Ti = (e) => {
    e = x.merge.call(
      {
        skipUndefined: !0,
      },
      wi,
      e
    );
    const { fetch: t, Request: r, Response: n } = e,
      o = t ? _t(t) : typeof fetch == "function",
      a = _t(r),
      s = _t(n);
    if (!o) return !1;
    const u = o && _t(Qr),
      f =
        o &&
        (typeof Zr == "function"
          ? /* @__PURE__ */ (
              (b) => (R) =>
                b.encode(R)
            )(new Zr())
          : async (b) => new Uint8Array(await new r(b).arrayBuffer())),
      l =
        a &&
        u &&
        en(() => {
          let b = !1;
          const R = new r(he.origin, {
            body: new Qr(),
            method: "POST",
            get duplex() {
              return (b = !0), "half";
            },
          }).headers.has("Content-Type");
          return b && !R;
        }),
      d = s && u && en(() => x.isReadableStream(new n("").body)),
      h = {
        stream: d && ((b) => b.body),
      };
    o &&
      ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((b) => {
        !h[b] &&
          (h[b] = (R, y) => {
            let C = R && R[b];
            if (C) return C.call(R);
            throw new Y(
              `Response type '${b}' is not supported`,
              Y.ERR_NOT_SUPPORT,
              y
            );
          });
      });
    const m = async (b) => {
        if (b == null) return 0;
        if (x.isBlob(b)) return b.size;
        if (x.isSpecCompliantForm(b))
          return (
            await new r(he.origin, {
              method: "POST",
              body: b,
            }).arrayBuffer()
          ).byteLength;
        if (x.isArrayBufferView(b) || x.isArrayBuffer(b)) return b.byteLength;
        if ((x.isURLSearchParams(b) && (b = b + ""), x.isString(b)))
          return (await f(b)).byteLength;
      },
      T = async (b, R) => {
        const y = x.toFiniteNumber(b.getContentLength());
        return y ?? m(R);
      };
    return async (b) => {
      let {
          url: R,
          method: y,
          data: C,
          signal: v,
          cancelToken: A,
          timeout: L,
          onDownloadProgress: $,
          onUploadProgress: q,
          responseType: j,
          headers: H,
          withCredentials: z = "same-origin",
          fetchOptions: ee,
        } = Kn(b),
        re = t || fetch;
      j = j ? (j + "").toLowerCase() : "text";
      let V = vi([v, A && A.toAbortSignal()], L),
        se = null;
      const te =
        V &&
        V.unsubscribe &&
        (() => {
          V.unsubscribe();
        });
      let le;
      try {
        if (
          q &&
          l &&
          y !== "get" &&
          y !== "head" &&
          (le = await T(H, C)) !== 0
        ) {
          let c = new r(R, {
              method: "POST",
              body: C,
              duplex: "half",
            }),
            S;
          if (
            (x.isFormData(C) &&
              (S = c.headers.get("content-type")) &&
              H.setContentType(S),
            c.body)
          ) {
            const [P, E] = Yr(le, At(Gr(q)));
            C = Jr(c.body, Xr, P, E);
          }
        }
        x.isString(z) || (z = z ? "include" : "omit");
        const K = a && "credentials" in r.prototype,
          ce = {
            ...ee,
            signal: V,
            method: y.toUpperCase(),
            headers: H.normalize().toJSON(),
            body: C,
            duplex: "half",
            credentials: K ? z : void 0,
          };
        se = a && new r(R, ce);
        let ae = await (a ? re(se, ee) : re(R, ce));
        const fe = d && (j === "stream" || j === "response");
        if (d && ($ || (fe && te))) {
          const c = {};
          ["status", "statusText", "headers"].forEach((k) => {
            c[k] = ae[k];
          });
          const S = x.toFiniteNumber(ae.headers.get("content-length")),
            [P, E] = ($ && Yr(S, At(Gr($), !0))) || [];
          ae = new n(
            Jr(ae.body, Xr, P, () => {
              E && E(), te && te();
            }),
            c
          );
        }
        j = j || "text";
        let me = await h[x.findKey(h, j) || "text"](ae, b);
        return (
          !fe && te && te(),
          await new Promise((c, S) => {
            Yn(c, S, {
              data: me,
              headers: ve.from(ae.headers),
              status: ae.status,
              statusText: ae.statusText,
              config: b,
              request: se,
            });
          })
        );
      } catch (K) {
        throw (
          (te && te(),
          K && K.name === "TypeError" && /Load failed|fetch/i.test(K.message)
            ? Object.assign(new Y("Network Error", Y.ERR_NETWORK, b, se), {
                cause: K.cause || K,
              })
            : Y.from(K, K && K.code, b, se))
        );
      }
    };
  },
  xi = /* @__PURE__ */ new Map(),
  Jn = (e) => {
    let t = e ? e.env : {};
    const { fetch: r, Request: n, Response: o } = t,
      a = [n, o, r];
    let s = a.length,
      u = s,
      f,
      l,
      d = xi;
    for (; u--; )
      (f = a[u]),
        (l = d.get(f)),
        l === void 0 && d.set(f, (l = u ? /* @__PURE__ */ new Map() : Ti(t))),
        (d = l);
    return l;
  };
Jn();
const tr = {
  http: Bs,
  xhr: gi,
  fetch: {
    get: Jn,
  },
};
x.forEach(tr, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const tn = (e) => `- ${e}`,
  Ri = (e) => x.isFunction(e) || e === null || e === !1,
  Xn = {
    getAdapter: (e, t) => {
      e = x.isArray(e) ? e : [e];
      const { length: r } = e;
      let n, o;
      const a = {};
      for (let s = 0; s < r; s++) {
        n = e[s];
        let u;
        if (
          ((o = n),
          !Ri(n) && ((o = tr[(u = String(n)).toLowerCase()]), o === void 0))
        )
          throw new Y(`Unknown adapter '${u}'`);
        if (o && (x.isFunction(o) || (o = o.get(t)))) break;
        a[u || "#" + s] = o;
      }
      if (!o) {
        const s = Object.entries(a).map(
          ([f, l]) =>
            `adapter ${f} ` +
            (l === !1
              ? "is not supported by the environment"
              : "is not available in the build")
        );
        let u = r
          ? s.length > 1
            ? `since :
` +
              s.map(tn).join(`
`)
            : " " + tn(s[0])
          : "as no adapter specified";
        throw new Y(
          "There is no suitable adapter to dispatch the request " + u,
          "ERR_NOT_SUPPORT"
        );
      }
      return o;
    },
    adapters: tr,
  };
function Kt(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Ve(null, e);
}
function rn(e) {
  return (
    Kt(e),
    (e.headers = ve.from(e.headers)),
    (e.data = Gt.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    Xn.getAdapter(
      e.adapter || it.adapter,
      e
    )(e).then(
      function (n) {
        return (
          Kt(e),
          (n.data = Gt.call(e, e.transformResponse, n)),
          (n.headers = ve.from(n.headers)),
          n
        );
      },
      function (n) {
        return (
          Wn(n) ||
            (Kt(e),
            n &&
              n.response &&
              ((n.response.data = Gt.call(e, e.transformResponse, n.response)),
              (n.response.headers = ve.from(n.response.headers)))),
          Promise.reject(n)
        );
      }
    )
  );
}
const Qn = "1.12.2",
  $t = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    $t[e] = function (n) {
      return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
const nn = {};
$t.transitional = function (t, r, n) {
  function o(a, s) {
    return (
      "[Axios v" +
      Qn +
      "] Transitional option '" +
      a +
      "'" +
      s +
      (n ? ". " + n : "")
    );
  }
  return (a, s, u) => {
    if (t === !1)
      throw new Y(
        o(s, " has been removed" + (r ? " in " + r : "")),
        Y.ERR_DEPRECATED
      );
    return (
      r &&
        !nn[s] &&
        ((nn[s] = !0),
        console.warn(
          o(
            s,
            " has been deprecated since v" +
              r +
              " and will be removed in the near future"
          )
        )),
      t ? t(a, s, u) : !0
    );
  };
};
$t.spelling = function (t) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${t}`), !0);
};
function Si(e, t, r) {
  if (typeof e != "object")
    throw new Y("options must be an object", Y.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let o = n.length;
  for (; o-- > 0; ) {
    const a = n[o],
      s = t[a];
    if (s) {
      const u = e[a],
        f = u === void 0 || s(u, a, e);
      if (f !== !0)
        throw new Y("option " + a + " must be " + f, Y.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0) throw new Y("Unknown option " + a, Y.ERR_BAD_OPTION);
  }
}
const St = {
    assertOptions: Si,
    validators: $t,
  },
  Te = St.validators;
let De = class {
  constructor(t) {
    (this.defaults = t || {}),
      (this.interceptors = {
        request: new Vr(),
        response: new Vr(),
      });
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, r) {
    try {
      return await this._request(t, r);
    } catch (n) {
      if (n instanceof Error) {
        let o = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(o)
          : (o = new Error());
        const a = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          n.stack
            ? a &&
              !String(n.stack).endsWith(a.replace(/^.+\n.+\n/, "")) &&
              (n.stack +=
                `
` + a)
            : (n.stack = a);
        } catch {}
      }
      throw n;
    }
  }
  _request(t, r) {
    typeof t == "string" ? ((r = r || {}), (r.url = t)) : (r = t || {}),
      (r = Me(this.defaults, r));
    const { transitional: n, paramsSerializer: o, headers: a } = r;
    n !== void 0 &&
      St.assertOptions(
        n,
        {
          silentJSONParsing: Te.transitional(Te.boolean),
          forcedJSONParsing: Te.transitional(Te.boolean),
          clarifyTimeoutError: Te.transitional(Te.boolean),
        },
        !1
      ),
      o != null &&
        (x.isFunction(o)
          ? (r.paramsSerializer = {
              serialize: o,
            })
          : St.assertOptions(
              o,
              {
                encode: Te.function,
                serialize: Te.function,
              },
              !0
            )),
      r.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (r.allowAbsoluteUrls = !0)),
      St.assertOptions(
        r,
        {
          baseUrl: Te.spelling("baseURL"),
          withXsrfToken: Te.spelling("withXSRFToken"),
        },
        !0
      ),
      (r.method = (r.method || this.defaults.method || "get").toLowerCase());
    let s = a && x.merge(a.common, a[r.method]);
    a &&
      x.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (b) => {
          delete a[b];
        }
      ),
      (r.headers = ve.concat(s, a));
    const u = [];
    let f = !0;
    this.interceptors.request.forEach(function (R) {
      (typeof R.runWhen == "function" && R.runWhen(r) === !1) ||
        ((f = f && R.synchronous), u.unshift(R.fulfilled, R.rejected));
    });
    const l = [];
    this.interceptors.response.forEach(function (R) {
      l.push(R.fulfilled, R.rejected);
    });
    let d,
      h = 0,
      m;
    if (!f) {
      const b = [rn.bind(this), void 0];
      for (
        b.unshift(...u), b.push(...l), m = b.length, d = Promise.resolve(r);
        h < m;

      )
        d = d.then(b[h++], b[h++]);
      return d;
    }
    m = u.length;
    let T = r;
    for (; h < m; ) {
      const b = u[h++],
        R = u[h++];
      try {
        T = b(T);
      } catch (y) {
        R.call(this, y);
        break;
      }
    }
    try {
      d = rn.call(this, T);
    } catch (b) {
      return Promise.reject(b);
    }
    for (h = 0, m = l.length; h < m; ) d = d.then(l[h++], l[h++]);
    return d;
  }
  getUri(t) {
    t = Me(this.defaults, t);
    const r = Gn(t.baseURL, t.url, t.allowAbsoluteUrls);
    return zn(r, t.params, t.paramsSerializer);
  }
};
x.forEach(["delete", "get", "head", "options"], function (t) {
  De.prototype[t] = function (r, n) {
    return this.request(
      Me(n || {}, {
        method: t,
        url: r,
        data: (n || {}).data,
      })
    );
  };
});
x.forEach(["post", "put", "patch"], function (t) {
  function r(n) {
    return function (a, s, u) {
      return this.request(
        Me(u || {}, {
          method: t,
          headers: n
            ? {
                "Content-Type": "multipart/form-data",
              }
            : {},
          url: a,
          data: s,
        })
      );
    };
  }
  (De.prototype[t] = r()), (De.prototype[t + "Form"] = r(!0));
});
let Ci = class Zn {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function (a) {
      r = a;
    });
    const n = this;
    this.promise.then((o) => {
      if (!n._listeners) return;
      let a = n._listeners.length;
      for (; a-- > 0; ) n._listeners[a](o);
      n._listeners = null;
    }),
      (this.promise.then = (o) => {
        let a;
        const s = new Promise((u) => {
          n.subscribe(u), (a = u);
        }).then(o);
        return (
          (s.cancel = function () {
            n.unsubscribe(a);
          }),
          s
        );
      }),
      t(function (a, s, u) {
        n.reason || ((n.reason = new Ve(a, s, u)), r(n.reason));
      });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners) return;
    const r = this._listeners.indexOf(t);
    r !== -1 && this._listeners.splice(r, 1);
  }
  toAbortSignal() {
    const t = new AbortController(),
      r = (n) => {
        t.abort(n);
      };
    return (
      this.subscribe(r),
      (t.signal.unsubscribe = () => this.unsubscribe(r)),
      t.signal
    );
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new Zn(function (o) {
        t = o;
      }),
      cancel: t,
    };
  }
};
function Ai(e) {
  return function (r) {
    return e.apply(null, r);
  };
}
function Oi(e) {
  return x.isObject(e) && e.isAxiosError === !0;
}
const rr = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(rr).forEach(([e, t]) => {
  rr[t] = e;
});
function eo(e) {
  const t = new De(e),
    r = jn(De.prototype.request, t);
  return (
    x.extend(r, De.prototype, t, { allOwnKeys: !0 }),
    x.extend(r, t, null, { allOwnKeys: !0 }),
    (r.create = function (o) {
      return eo(Me(e, o));
    }),
    r
  );
}
const Z = eo(it);
Z.Axios = De;
Z.CanceledError = Ve;
Z.CancelToken = Ci;
Z.isCancel = Wn;
Z.VERSION = Qn;
Z.toFormData = Mt;
Z.AxiosError = Y;
Z.Cancel = Z.CanceledError;
Z.all = function (t) {
  return Promise.all(t);
};
Z.spread = Ai;
Z.isAxiosError = Oi;
Z.mergeConfig = Me;
Z.AxiosHeaders = ve;
Z.formToJSON = (e) => Vn(x.isHTMLForm(e) ? new FormData(e) : e);
Z.getAdapter = Xn.getAdapter;
Z.HttpStatusCode = rr;
Z.default = Z;
const {
  Axios: Ml,
  AxiosError: $l,
  CanceledError: Ul,
  isCancel: Fl,
  CancelToken: Bl,
  VERSION: Hl,
  all: zl,
  Cancel: ql,
  isAxiosError: Vl,
  spread: Wl,
  toFormData: Yl,
  AxiosHeaders: Gl,
  HttpStatusCode: Kl,
  formToJSON: Jl,
  getAdapter: Xl,
  mergeConfig: Ql,
} = Z;
function to(e) {
  var t,
    r,
    n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (r = to(e[t])) && (n && (n += " "), (n += r));
    } else for (r in e) e[r] && (n && (n += " "), (n += r));
  return n;
}
function Ie() {
  for (var e, t, r = 0, n = "", o = arguments.length; r < o; r++)
    (e = arguments[r]) && (t = to(e)) && (n && (n += " "), (n += t));
  return n;
}
function Ni(e) {
  if (typeof document > "u") return;
  let t = document.head || document.getElementsByTagName("head")[0],
    r = document.createElement("style");
  (r.type = "text/css"),
    t.firstChild ? t.insertBefore(r, t.firstChild) : t.appendChild(r),
    r.styleSheet
      ? (r.styleSheet.cssText = e)
      : r.appendChild(document.createTextNode(e));
}
Ni(`:root{--toastify-color-light: #fff;--toastify-color-dark: #121212;--toastify-color-info: #3498db;--toastify-color-success: #07bc0c;--toastify-color-warning: #f1c40f;--toastify-color-error: hsl(6, 78%, 57%);--toastify-color-transparent: rgba(255, 255, 255, .7);--toastify-icon-color-info: var(--toastify-color-info);--toastify-icon-color-success: var(--toastify-color-success);--toastify-icon-color-warning: var(--toastify-color-warning);--toastify-icon-color-error: var(--toastify-color-error);--toastify-container-width: fit-content;--toastify-toast-width: 320px;--toastify-toast-offset: 16px;--toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));--toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));--toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));--toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));--toastify-toast-background: #fff;--toastify-toast-padding: 14px;--toastify-toast-min-height: 64px;--toastify-toast-max-height: 800px;--toastify-toast-bd-radius: 6px;--toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, .1);--toastify-font-family: sans-serif;--toastify-z-index: 9999;--toastify-text-color-light: #757575;--toastify-text-color-dark: #fff;--toastify-text-color-info: #fff;--toastify-text-color-success: #fff;--toastify-text-color-warning: #fff;--toastify-text-color-error: #fff;--toastify-spinner-color: #616161;--toastify-spinner-color-empty-area: #e0e0e0;--toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);--toastify-color-progress-dark: #bb86fc;--toastify-color-progress-info: var(--toastify-color-info);--toastify-color-progress-success: var(--toastify-color-success);--toastify-color-progress-warning: var(--toastify-color-warning);--toastify-color-progress-error: var(--toastify-color-error);--toastify-color-progress-bgo: .2}.Toastify__toast-container{z-index:var(--toastify-z-index);-webkit-transform:translate3d(0,0,var(--toastify-z-index));position:fixed;width:var(--toastify-container-width);box-sizing:border-box;color:#fff;display:flex;flex-direction:column}.Toastify__toast-container--top-left{top:var(--toastify-toast-top);left:var(--toastify-toast-left)}.Toastify__toast-container--top-center{top:var(--toastify-toast-top);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--top-right{top:var(--toastify-toast-top);right:var(--toastify-toast-right);align-items:end}.Toastify__toast-container--bottom-left{bottom:var(--toastify-toast-bottom);left:var(--toastify-toast-left)}.Toastify__toast-container--bottom-center{bottom:var(--toastify-toast-bottom);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--bottom-right{bottom:var(--toastify-toast-bottom);right:var(--toastify-toast-right);align-items:end}.Toastify__toast{--y: 0;position:relative;touch-action:none;width:var(--toastify-toast-width);min-height:var(--toastify-toast-min-height);box-sizing:border-box;margin-bottom:1rem;padding:var(--toastify-toast-padding);border-radius:var(--toastify-toast-bd-radius);box-shadow:var(--toastify-toast-shadow);max-height:var(--toastify-toast-max-height);font-family:var(--toastify-font-family);z-index:0;display:flex;flex:1 auto;align-items:center;word-break:break-word}@media only screen and (max-width: 480px){.Toastify__toast-container{width:100vw;left:env(safe-area-inset-left);margin:0}.Toastify__toast-container--top-left,.Toastify__toast-container--top-center,.Toastify__toast-container--top-right{top:env(safe-area-inset-top);transform:translate(0)}.Toastify__toast-container--bottom-left,.Toastify__toast-container--bottom-center,.Toastify__toast-container--bottom-right{bottom:env(safe-area-inset-bottom);transform:translate(0)}.Toastify__toast-container--rtl{right:env(safe-area-inset-right);left:initial}.Toastify__toast{--toastify-toast-width: 100%;margin-bottom:0;border-radius:0}}.Toastify__toast-container[data-stacked=true]{width:var(--toastify-toast-width)}.Toastify__toast--stacked{position:absolute;width:100%;transform:translate3d(0,var(--y),0) scale(var(--s));transition:transform .3s}.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,.Toastify__toast--stacked[data-collapsed] .Toastify__close-button{transition:opacity .1s}.Toastify__toast--stacked[data-collapsed=false]{overflow:visible}.Toastify__toast--stacked[data-collapsed=true]:not(:last-child)>*{opacity:0}.Toastify__toast--stacked:after{content:"";position:absolute;left:0;right:0;height:calc(var(--g) * 1px);bottom:100%}.Toastify__toast--stacked[data-pos=top]{top:0}.Toastify__toast--stacked[data-pos=bot]{bottom:0}.Toastify__toast--stacked[data-pos=bot].Toastify__toast--stacked:before{transform-origin:top}.Toastify__toast--stacked[data-pos=top].Toastify__toast--stacked:before{transform-origin:bottom}.Toastify__toast--stacked:before{content:"";position:absolute;left:0;right:0;bottom:0;height:100%;transform:scaleY(3);z-index:-1}.Toastify__toast--rtl{direction:rtl}.Toastify__toast--close-on-click{cursor:pointer}.Toastify__toast-icon{margin-inline-end:10px;width:22px;flex-shrink:0;display:flex}.Toastify--animate{animation-fill-mode:both;animation-duration:.5s}.Toastify--animate-icon{animation-fill-mode:both;animation-duration:.3s}.Toastify__toast-theme--dark{background:var(--toastify-color-dark);color:var(--toastify-text-color-dark)}.Toastify__toast-theme--light,.Toastify__toast-theme--colored.Toastify__toast--default{background:var(--toastify-color-light);color:var(--toastify-text-color-light)}.Toastify__toast-theme--colored.Toastify__toast--info{color:var(--toastify-text-color-info);background:var(--toastify-color-info)}.Toastify__toast-theme--colored.Toastify__toast--success{color:var(--toastify-text-color-success);background:var(--toastify-color-success)}.Toastify__toast-theme--colored.Toastify__toast--warning{color:var(--toastify-text-color-warning);background:var(--toastify-color-warning)}.Toastify__toast-theme--colored.Toastify__toast--error{color:var(--toastify-text-color-error);background:var(--toastify-color-error)}.Toastify__progress-bar-theme--light{background:var(--toastify-color-progress-light)}.Toastify__progress-bar-theme--dark{background:var(--toastify-color-progress-dark)}.Toastify__progress-bar--info{background:var(--toastify-color-progress-info)}.Toastify__progress-bar--success{background:var(--toastify-color-progress-success)}.Toastify__progress-bar--warning{background:var(--toastify-color-progress-warning)}.Toastify__progress-bar--error{background:var(--toastify-color-progress-error)}.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error{background:var(--toastify-color-transparent)}.Toastify__close-button{color:#fff;position:absolute;top:6px;right:6px;background:transparent;outline:none;border:none;padding:0;cursor:pointer;opacity:.7;transition:.3s ease;z-index:1}.Toastify__toast--rtl .Toastify__close-button{left:6px;right:unset}.Toastify__close-button--light{color:#000;opacity:.3}.Toastify__close-button>svg{fill:currentColor;height:16px;width:14px}.Toastify__close-button:hover,.Toastify__close-button:focus{opacity:1}@keyframes Toastify__trackProgress{0%{transform:scaleX(1)}to{transform:scaleX(0)}}.Toastify__progress-bar{position:absolute;bottom:0;left:0;width:100%;height:100%;z-index:1;opacity:.7;transform-origin:left}.Toastify__progress-bar--animated{animation:Toastify__trackProgress linear 1 forwards}.Toastify__progress-bar--controlled{transition:transform .2s}.Toastify__progress-bar--rtl{right:0;left:initial;transform-origin:right;border-bottom-left-radius:initial}.Toastify__progress-bar--wrp{position:absolute;overflow:hidden;bottom:0;left:0;width:100%;height:5px;border-bottom-left-radius:var(--toastify-toast-bd-radius);border-bottom-right-radius:var(--toastify-toast-bd-radius)}.Toastify__progress-bar--wrp[data-hidden=true]{opacity:0}.Toastify__progress-bar--bg{opacity:var(--toastify-color-progress-bgo);width:100%;height:100%}.Toastify__spinner{width:20px;height:20px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--toastify-spinner-color-empty-area);border-right-color:var(--toastify-spinner-color);animation:Toastify__spin .65s linear infinite}@keyframes Toastify__bounceInRight{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutRight{20%{opacity:1;transform:translate3d(-20px,var(--y),0)}to{opacity:0;transform:translate3d(2000px,var(--y),0)}}@keyframes Toastify__bounceInLeft{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutLeft{20%{opacity:1;transform:translate3d(20px,var(--y),0)}to{opacity:0;transform:translate3d(-2000px,var(--y),0)}}@keyframes Toastify__bounceInUp{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translateZ(0)}}@keyframes Toastify__bounceOutUp{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}@keyframes Toastify__bounceInDown{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:none}}@keyframes Toastify__bounceOutDown{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,2000px,0)}}.Toastify__bounce-enter--top-left,.Toastify__bounce-enter--bottom-left{animation-name:Toastify__bounceInLeft}.Toastify__bounce-enter--top-right,.Toastify__bounce-enter--bottom-right{animation-name:Toastify__bounceInRight}.Toastify__bounce-enter--top-center{animation-name:Toastify__bounceInDown}.Toastify__bounce-enter--bottom-center{animation-name:Toastify__bounceInUp}.Toastify__bounce-exit--top-left,.Toastify__bounce-exit--bottom-left{animation-name:Toastify__bounceOutLeft}.Toastify__bounce-exit--top-right,.Toastify__bounce-exit--bottom-right{animation-name:Toastify__bounceOutRight}.Toastify__bounce-exit--top-center{animation-name:Toastify__bounceOutUp}.Toastify__bounce-exit--bottom-center{animation-name:Toastify__bounceOutDown}@keyframes Toastify__zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes Toastify__zoomOut{0%{opacity:1}50%{opacity:0;transform:translate3d(0,var(--y),0) scale3d(.3,.3,.3)}to{opacity:0}}.Toastify__zoom-enter{animation-name:Toastify__zoomIn}.Toastify__zoom-exit{animation-name:Toastify__zoomOut}@keyframes Toastify__flipIn{0%{transform:perspective(400px) rotateX(90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotateX(-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotateX(10deg);opacity:1}80%{transform:perspective(400px) rotateX(-5deg)}to{transform:perspective(400px)}}@keyframes Toastify__flipOut{0%{transform:translate3d(0,var(--y),0) perspective(400px)}30%{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(-20deg);opacity:1}to{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(90deg);opacity:0}}.Toastify__flip-enter{animation-name:Toastify__flipIn}.Toastify__flip-exit{animation-name:Toastify__flipOut}@keyframes Toastify__slideInRight{0%{transform:translate3d(110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInLeft{0%{transform:translate3d(-110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInUp{0%{transform:translate3d(0,110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInDown{0%{transform:translate3d(0,-110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideOutRight{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(110%,var(--y),0)}}@keyframes Toastify__slideOutLeft{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(-110%,var(--y),0)}}@keyframes Toastify__slideOutDown{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,500px,0)}}@keyframes Toastify__slideOutUp{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,-500px,0)}}.Toastify__slide-enter--top-left,.Toastify__slide-enter--bottom-left{animation-name:Toastify__slideInLeft}.Toastify__slide-enter--top-right,.Toastify__slide-enter--bottom-right{animation-name:Toastify__slideInRight}.Toastify__slide-enter--top-center{animation-name:Toastify__slideInDown}.Toastify__slide-enter--bottom-center{animation-name:Toastify__slideInUp}.Toastify__slide-exit--top-left,.Toastify__slide-exit--bottom-left{animation-name:Toastify__slideOutLeft;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-right,.Toastify__slide-exit--bottom-right{animation-name:Toastify__slideOutRight;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-center{animation-name:Toastify__slideOutUp;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--bottom-center{animation-name:Toastify__slideOutDown;animation-timing-function:ease-in;animation-duration:.3s}@keyframes Toastify__spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
`);
var lt = (e) => typeof e == "number" && !isNaN(e),
  $e = (e) => typeof e == "string",
  Oe = (e) => typeof e == "function",
  ji = (e) => $e(e) || lt(e),
  nr = (e) => ($e(e) || Oe(e) ? e : null),
  ki = (e, t) => (e === !1 || (lt(e) && e > 0) ? e : t),
  or = (e) => _.isValidElement(e) || $e(e) || Oe(e) || lt(e);
function Li(e, t, r = 300) {
  let { scrollHeight: n, style: o } = e;
  requestAnimationFrame(() => {
    (o.minHeight = "initial"),
      (o.height = n + "px"),
      (o.transition = `all ${r}ms`),
      requestAnimationFrame(() => {
        (o.height = "0"), (o.padding = "0"), (o.margin = "0"), setTimeout(t, r);
      });
  });
}
function Pi({
  enter: e,
  exit: t,
  appendPosition: r = !1,
  collapse: n = !0,
  collapseDuration: o = 300,
}) {
  return function ({
    children: a,
    position: s,
    preventExitTransition: u,
    done: f,
    nodeRef: l,
    isIn: d,
    playToast: h,
  }) {
    let m = r ? `${e}--${s}` : e,
      T = r ? `${t}--${s}` : t,
      b = _.useRef(0);
    return (
      _.useLayoutEffect(() => {
        let R = l.current,
          y = m.split(" "),
          C = (v) => {
            v.target === l.current &&
              (h(),
              R.removeEventListener("animationend", C),
              R.removeEventListener("animationcancel", C),
              b.current === 0 &&
                v.type !== "animationcancel" &&
                R.classList.remove(...y));
          };
        R.classList.add(...y),
          R.addEventListener("animationend", C),
          R.addEventListener("animationcancel", C);
      }, []),
      _.useEffect(() => {
        let R = l.current,
          y = () => {
            R.removeEventListener("animationend", y), n ? Li(R, f, o) : f();
          };
        d ||
          (u
            ? y()
            : ((b.current = 1),
              (R.className += ` ${T}`),
              R.addEventListener("animationend", y)));
      }, [d]),
      oe.createElement(oe.Fragment, null, a)
    );
  };
}
function on(e, t) {
  return {
    content: ro(e.content, e.props),
    containerId: e.props.containerId,
    id: e.props.toastId,
    theme: e.props.theme,
    type: e.props.type,
    data: e.props.data || {},
    isLoading: e.props.isLoading,
    icon: e.props.icon,
    reason: e.removalReason,
    status: t,
  };
}
function ro(e, t, r = !1) {
  return _.isValidElement(e) && !$e(e.type)
    ? _.cloneElement(e, {
        closeToast: t.closeToast,
        toastProps: t,
        data: t.data,
        isPaused: r,
      })
    : Oe(e)
    ? e({ closeToast: t.closeToast, toastProps: t, data: t.data, isPaused: r })
    : e;
}
function Di({ closeToast: e, theme: t, ariaLabel: r = "close" }) {
  return oe.createElement(
    "button",
    {
      className: `Toastify__close-button Toastify__close-button--${t}`,
      type: "button",
      onClick: (n) => {
        n.stopPropagation(), e(!0);
      },
      "aria-label": r,
    },
    oe.createElement(
      "svg",
      { "aria-hidden": "true", viewBox: "0 0 14 16" },
      oe.createElement("path", {
        fillRule: "evenodd",
        d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z",
      })
    )
  );
}
function Ii({
  delay: e,
  isRunning: t,
  closeToast: r,
  type: n = "default",
  hide: o,
  className: a,
  controlledProgress: s,
  progress: u,
  rtl: f,
  isIn: l,
  theme: d,
}) {
  let h = o || (s && u === 0),
    m = {
      animationDuration: `${e}ms`,
      animationPlayState: t ? "running" : "paused",
    };
  s && (m.transform = `scaleX(${u})`);
  let T = Ie(
      "Toastify__progress-bar",
      s
        ? "Toastify__progress-bar--controlled"
        : "Toastify__progress-bar--animated",
      `Toastify__progress-bar-theme--${d}`,
      `Toastify__progress-bar--${n}`,
      { "Toastify__progress-bar--rtl": f }
    ),
    b = Oe(a) ? a({ rtl: f, type: n, defaultClassName: T }) : Ie(T, a),
    R = {
      [s && u >= 1 ? "onTransitionEnd" : "onAnimationEnd"]:
        s && u < 1
          ? null
          : () => {
              l && r();
            },
    };
  return oe.createElement(
    "div",
    { className: "Toastify__progress-bar--wrp", "data-hidden": h },
    oe.createElement("div", {
      className: `Toastify__progress-bar--bg Toastify__progress-bar-theme--${d} Toastify__progress-bar--${n}`,
    }),
    oe.createElement("div", {
      role: "progressbar",
      "aria-hidden": h ? "true" : "false",
      "aria-label": "notification timer",
      className: b,
      style: m,
      ...R,
    })
  );
}
var Mi = 1,
  no = () => `${Mi++}`;
function $i(e, t, r) {
  let n = 1,
    o = 0,
    a = [],
    s = [],
    u = t,
    f = /* @__PURE__ */ new Map(),
    l = /* @__PURE__ */ new Set(),
    d = (v) => (l.add(v), () => l.delete(v)),
    h = () => {
      (s = Array.from(f.values())), l.forEach((v) => v());
    },
    m = ({ containerId: v, toastId: A, updateId: L }) => {
      let $ = v ? v !== e : e !== 1,
        q = f.has(A) && L == null;
      return $ || q;
    },
    T = (v, A) => {
      f.forEach((L) => {
        var $;
        (A == null || A === L.props.toastId) &&
          (($ = L.toggle) == null || $.call(L, v));
      });
    },
    b = (v) => {
      var A, L;
      (L = (A = v.props) == null ? void 0 : A.onClose) == null ||
        L.call(A, v.removalReason),
        (v.isActive = !1);
    },
    R = (v) => {
      if (v == null) f.forEach(b);
      else {
        let A = f.get(v);
        A && b(A);
      }
      h();
    },
    y = () => {
      (o -= a.length), (a = []);
    },
    C = (v) => {
      var A, L;
      let { toastId: $, updateId: q } = v.props,
        j = q == null;
      v.staleId && f.delete(v.staleId),
        (v.isActive = !0),
        f.set($, v),
        h(),
        r(on(v, j ? "added" : "updated")),
        j && ((L = (A = v.props).onOpen) == null || L.call(A));
    };
  return {
    id: e,
    props: u,
    observe: d,
    toggle: T,
    removeToast: R,
    toasts: f,
    clearQueue: y,
    buildToast: (v, A) => {
      if (m(A)) return;
      let { toastId: L, updateId: $, data: q, staleId: j, delay: H } = A,
        z = $ == null;
      z && o++;
      let ee = {
        ...u,
        style: u.toastStyle,
        key: n++,
        ...Object.fromEntries(
          Object.entries(A).filter(([V, se]) => se != null)
        ),
        toastId: L,
        updateId: $,
        data: q,
        isIn: !1,
        className: nr(A.className || u.toastClassName),
        progressClassName: nr(A.progressClassName || u.progressClassName),
        autoClose: A.isLoading ? !1 : ki(A.autoClose, u.autoClose),
        closeToast(V) {
          (f.get(L).removalReason = V), R(L);
        },
        deleteToast() {
          let V = f.get(L);
          if (V != null) {
            if (
              (r(on(V, "removed")),
              f.delete(L),
              o--,
              o < 0 && (o = 0),
              a.length > 0)
            ) {
              C(a.shift());
              return;
            }
            h();
          }
        },
      };
      (ee.closeButton = u.closeButton),
        A.closeButton === !1 || or(A.closeButton)
          ? (ee.closeButton = A.closeButton)
          : A.closeButton === !0 &&
            (ee.closeButton = or(u.closeButton) ? u.closeButton : !0);
      let re = { content: v, props: ee, staleId: j };
      u.limit && u.limit > 0 && o > u.limit && z
        ? a.push(re)
        : lt(H)
        ? setTimeout(() => {
            C(re);
          }, H)
        : C(re);
    },
    setProps(v) {
      u = v;
    },
    setToggle: (v, A) => {
      let L = f.get(v);
      L && (L.toggle = A);
    },
    isToastActive: (v) => {
      var A;
      return (A = f.get(v)) == null ? void 0 : A.isActive;
    },
    getSnapshot: () => s,
  };
}
var ye = /* @__PURE__ */ new Map(),
  et = [],
  ar = /* @__PURE__ */ new Set(),
  Ui = (e) => ar.forEach((t) => t(e)),
  oo = () => ye.size > 0;
function Fi() {
  et.forEach((e) => so(e.content, e.options)), (et = []);
}
var Bi = (e, { containerId: t }) => {
  var r;
  return (r = ye.get(t || 1)) == null ? void 0 : r.toasts.get(e);
};
function ao(e, t) {
  var r;
  if (t) return !!((r = ye.get(t)) != null && r.isToastActive(e));
  let n = !1;
  return (
    ye.forEach((o) => {
      o.isToastActive(e) && (n = !0);
    }),
    n
  );
}
function Hi(e) {
  if (!oo()) {
    et = et.filter((t) => e != null && t.options.toastId !== e);
    return;
  }
  if (e == null || ji(e))
    ye.forEach((t) => {
      t.removeToast(e);
    });
  else if (e && ("containerId" in e || "id" in e)) {
    let t = ye.get(e.containerId);
    t
      ? t.removeToast(e.id)
      : ye.forEach((r) => {
          r.removeToast(e.id);
        });
  }
}
var zi = (e = {}) => {
  ye.forEach((t) => {
    t.props.limit &&
      (!e.containerId || t.id === e.containerId) &&
      t.clearQueue();
  });
};
function so(e, t) {
  or(e) &&
    (oo() || et.push({ content: e, options: t }),
    ye.forEach((r) => {
      r.buildToast(e, t);
    }));
}
function qi(e) {
  var t;
  (t = ye.get(e.containerId || 1)) == null || t.setToggle(e.id, e.fn);
}
function io(e, t) {
  ye.forEach((r) => {
    (t == null || !(t != null && t.containerId) || t?.containerId === r.id) &&
      r.toggle(e, t?.id);
  });
}
function Vi(e) {
  let t = e.containerId || 1;
  return {
    subscribe(r) {
      let n = $i(t, e, Ui);
      ye.set(t, n);
      let o = n.observe(r);
      return (
        Fi(),
        () => {
          o(), ye.delete(t);
        }
      );
    },
    setProps(r) {
      var n;
      (n = ye.get(t)) == null || n.setProps(r);
    },
    getSnapshot() {
      var r;
      return (r = ye.get(t)) == null ? void 0 : r.getSnapshot();
    },
  };
}
function Wi(e) {
  return (
    ar.add(e),
    () => {
      ar.delete(e);
    }
  );
}
function Yi(e) {
  return e && ($e(e.toastId) || lt(e.toastId)) ? e.toastId : no();
}
function ct(e, t) {
  return so(e, t), t.toastId;
}
function Ut(e, t) {
  return { ...t, type: (t && t.type) || e, toastId: Yi(t) };
}
function Ft(e) {
  return (t, r) => ct(t, Ut(e, r));
}
function I(e, t) {
  return ct(e, Ut("default", t));
}
I.loading = (e, t) =>
  ct(
    e,
    Ut("default", {
      isLoading: !0,
      autoClose: !1,
      closeOnClick: !1,
      closeButton: !1,
      draggable: !1,
      ...t,
    })
  );
function Gi(e, { pending: t, error: r, success: n }, o) {
  let a;
  t && (a = $e(t) ? I.loading(t, o) : I.loading(t.render, { ...o, ...t }));
  let s = {
      isLoading: null,
      autoClose: null,
      closeOnClick: null,
      closeButton: null,
      draggable: null,
    },
    u = (l, d, h) => {
      if (d == null) {
        I.dismiss(a);
        return;
      }
      let m = { type: l, ...s, ...o, data: h },
        T = $e(d) ? { render: d } : d;
      return a ? I.update(a, { ...m, ...T }) : I(T.render, { ...m, ...T }), h;
    },
    f = Oe(e) ? e() : e;
  return f.then((l) => u("success", n, l)).catch((l) => u("error", r, l)), f;
}
I.promise = Gi;
I.success = Ft("success");
I.info = Ft("info");
I.error = Ft("error");
I.warning = Ft("warning");
I.warn = I.warning;
I.dark = (e, t) => ct(e, Ut("default", { theme: "dark", ...t }));
function Ki(e) {
  Hi(e);
}
I.dismiss = Ki;
I.clearWaitingQueue = zi;
I.isActive = ao;
I.update = (e, t = {}) => {
  let r = Bi(e, t);
  if (r) {
    let { props: n, content: o } = r,
      a = { delay: 100, ...n, ...t, toastId: t.toastId || e, updateId: no() };
    a.toastId !== e && (a.staleId = e);
    let s = a.render || o;
    delete a.render, ct(s, a);
  }
};
I.done = (e) => {
  I.update(e, { progress: 1 });
};
I.onChange = Wi;
I.play = (e) => io(!0, e);
I.pause = (e) => io(!1, e);
function Ji(e) {
  var t;
  let { subscribe: r, getSnapshot: n, setProps: o } = _.useRef(Vi(e)).current;
  o(e);
  let a = (t = _.useSyncExternalStore(r, n, n)) == null ? void 0 : t.slice();
  function s(u) {
    if (!a) return [];
    let f = /* @__PURE__ */ new Map();
    return (
      e.newestOnTop && a.reverse(),
      a.forEach((l) => {
        let { position: d } = l.props;
        f.has(d) || f.set(d, []), f.get(d).push(l);
      }),
      Array.from(f, (l) => u(l[0], l[1]))
    );
  }
  return { getToastToRender: s, isToastActive: ao, count: a?.length };
}
function Xi(e) {
  let [t, r] = _.useState(!1),
    [n, o] = _.useState(!1),
    a = _.useRef(null),
    s = _.useRef({
      start: 0,
      delta: 0,
      removalDistance: 0,
      canCloseOnClick: !0,
      canDrag: !1,
      didMove: !1,
    }).current,
    {
      autoClose: u,
      pauseOnHover: f,
      closeToast: l,
      onClick: d,
      closeOnClick: h,
    } = e;
  qi({ id: e.toastId, containerId: e.containerId, fn: r }),
    _.useEffect(() => {
      if (e.pauseOnFocusLoss)
        return (
          m(),
          () => {
            T();
          }
        );
    }, [e.pauseOnFocusLoss]);
  function m() {
    document.hasFocus() || C(),
      window.addEventListener("focus", y),
      window.addEventListener("blur", C);
  }
  function T() {
    window.removeEventListener("focus", y),
      window.removeEventListener("blur", C);
  }
  function b(j) {
    if (e.draggable === !0 || e.draggable === j.pointerType) {
      v();
      let H = a.current;
      (s.canCloseOnClick = !0),
        (s.canDrag = !0),
        (H.style.transition = "none"),
        e.draggableDirection === "x"
          ? ((s.start = j.clientX),
            (s.removalDistance = H.offsetWidth * (e.draggablePercent / 100)))
          : ((s.start = j.clientY),
            (s.removalDistance =
              (H.offsetHeight *
                (e.draggablePercent === 80
                  ? e.draggablePercent * 1.5
                  : e.draggablePercent)) /
              100));
    }
  }
  function R(j) {
    let {
      top: H,
      bottom: z,
      left: ee,
      right: re,
    } = a.current.getBoundingClientRect();
    j.nativeEvent.type !== "touchend" &&
    e.pauseOnHover &&
    j.clientX >= ee &&
    j.clientX <= re &&
    j.clientY >= H &&
    j.clientY <= z
      ? C()
      : y();
  }
  function y() {
    r(!0);
  }
  function C() {
    r(!1);
  }
  function v() {
    (s.didMove = !1),
      document.addEventListener("pointermove", L),
      document.addEventListener("pointerup", $);
  }
  function A() {
    document.removeEventListener("pointermove", L),
      document.removeEventListener("pointerup", $);
  }
  function L(j) {
    let H = a.current;
    if (s.canDrag && H) {
      (s.didMove = !0),
        t && C(),
        e.draggableDirection === "x"
          ? (s.delta = j.clientX - s.start)
          : (s.delta = j.clientY - s.start),
        s.start !== j.clientX && (s.canCloseOnClick = !1);
      let z =
        e.draggableDirection === "x"
          ? `${s.delta}px, var(--y)`
          : `0, calc(${s.delta}px + var(--y))`;
      (H.style.transform = `translate3d(${z},0)`),
        (H.style.opacity = `${1 - Math.abs(s.delta / s.removalDistance)}`);
    }
  }
  function $() {
    A();
    let j = a.current;
    if (s.canDrag && s.didMove && j) {
      if (((s.canDrag = !1), Math.abs(s.delta) > s.removalDistance)) {
        o(!0), e.closeToast(!0), e.collapseAll();
        return;
      }
      (j.style.transition = "transform 0.2s, opacity 0.2s"),
        j.style.removeProperty("transform"),
        j.style.removeProperty("opacity");
    }
  }
  let q = { onPointerDown: b, onPointerUp: R };
  return (
    u && f && ((q.onMouseEnter = C), e.stacked || (q.onMouseLeave = y)),
    h &&
      (q.onClick = (j) => {
        d && d(j), s.canCloseOnClick && l(!0);
      }),
    {
      playToast: y,
      pauseToast: C,
      isRunning: t,
      preventExitTransition: n,
      toastRef: a,
      eventHandlers: q,
    }
  );
}
var Qi = typeof window < "u" ? _.useLayoutEffect : _.useEffect,
  Bt = ({ theme: e, type: t, isLoading: r, ...n }) =>
    oe.createElement("svg", {
      viewBox: "0 0 24 24",
      width: "100%",
      height: "100%",
      fill:
        e === "colored" ? "currentColor" : `var(--toastify-icon-color-${t})`,
      ...n,
    });
function Zi(e) {
  return oe.createElement(
    Bt,
    { ...e },
    oe.createElement("path", {
      d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z",
    })
  );
}
function el(e) {
  return oe.createElement(
    Bt,
    { ...e },
    oe.createElement("path", {
      d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z",
    })
  );
}
function tl(e) {
  return oe.createElement(
    Bt,
    { ...e },
    oe.createElement("path", {
      d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z",
    })
  );
}
function rl(e) {
  return oe.createElement(
    Bt,
    { ...e },
    oe.createElement("path", {
      d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z",
    })
  );
}
function nl() {
  return oe.createElement("div", { className: "Toastify__spinner" });
}
var sr = { info: el, warning: Zi, success: tl, error: rl, spinner: nl },
  ol = (e) => e in sr;
function al({ theme: e, type: t, isLoading: r, icon: n }) {
  let o = null,
    a = { theme: e, type: t };
  return (
    n === !1 ||
      (Oe(n)
        ? (o = n({ ...a, isLoading: r }))
        : _.isValidElement(n)
        ? (o = _.cloneElement(n, a))
        : r
        ? (o = sr.spinner())
        : ol(t) && (o = sr[t](a))),
    o
  );
}
var sl = (e) => {
    let {
        isRunning: t,
        preventExitTransition: r,
        toastRef: n,
        eventHandlers: o,
        playToast: a,
      } = Xi(e),
      {
        closeButton: s,
        children: u,
        autoClose: f,
        onClick: l,
        type: d,
        hideProgressBar: h,
        closeToast: m,
        transition: T,
        position: b,
        className: R,
        style: y,
        progressClassName: C,
        updateId: v,
        role: A,
        progress: L,
        rtl: $,
        toastId: q,
        deleteToast: j,
        isIn: H,
        isLoading: z,
        closeOnClick: ee,
        theme: re,
        ariaLabel: V,
      } = e,
      se = Ie(
        "Toastify__toast",
        `Toastify__toast-theme--${re}`,
        `Toastify__toast--${d}`,
        { "Toastify__toast--rtl": $ },
        { "Toastify__toast--close-on-click": ee }
      ),
      te = Oe(R)
        ? R({ rtl: $, position: b, type: d, defaultClassName: se })
        : Ie(se, R),
      le = al(e),
      K = !!L || !f,
      ce = { closeToast: m, type: d, theme: re },
      ae = null;
    return (
      s === !1 ||
        (Oe(s)
          ? (ae = s(ce))
          : _.isValidElement(s)
          ? (ae = _.cloneElement(s, ce))
          : (ae = Di(ce))),
      oe.createElement(
        T,
        {
          isIn: H,
          done: j,
          position: b,
          preventExitTransition: r,
          nodeRef: n,
          playToast: a,
        },
        oe.createElement(
          "div",
          {
            id: q,
            tabIndex: 0,
            onClick: l,
            "data-in": H,
            className: te,
            ...o,
            style: y,
            ref: n,
            ...(H && { role: A, "aria-label": V }),
          },
          le != null &&
            oe.createElement(
              "div",
              {
                className: Ie("Toastify__toast-icon", {
                  "Toastify--animate-icon Toastify__zoom-enter": !z,
                }),
              },
              le
            ),
          ro(u, e, !t),
          ae,
          !e.customProgressBar &&
            oe.createElement(Ii, {
              ...(v && !K ? { key: `p-${v}` } : {}),
              rtl: $,
              theme: re,
              delay: f,
              isRunning: t,
              isIn: H,
              closeToast: m,
              hide: h,
              type: d,
              className: C,
              controlledProgress: K,
              progress: L || 0,
            })
        )
      )
    );
  },
  il = (e, t = !1) => ({
    enter: `Toastify--animate Toastify__${e}-enter`,
    exit: `Toastify--animate Toastify__${e}-exit`,
    appendPosition: t,
  }),
  ll = Pi(il("bounce", !0)),
  cl = {
    position: "top-right",
    transition: ll,
    autoClose: 5e3,
    closeButton: !0,
    pauseOnHover: !0,
    pauseOnFocusLoss: !0,
    draggable: "touch",
    draggablePercent: 80,
    draggableDirection: "x",
    role: "alert",
    theme: "light",
    "aria-label": "Notifications Alt+T",
    hotKeys: (e) => e.altKey && e.code === "KeyT",
  };
function lo(e) {
  let t = { ...cl, ...e },
    r = e.stacked,
    [n, o] = _.useState(!0),
    a = _.useRef(null),
    { getToastToRender: s, isToastActive: u, count: f } = Ji(t),
    { className: l, style: d, rtl: h, containerId: m, hotKeys: T } = t;
  function b(y) {
    let C = Ie("Toastify__toast-container", `Toastify__toast-container--${y}`, {
      "Toastify__toast-container--rtl": h,
    });
    return Oe(l)
      ? l({ position: y, rtl: h, defaultClassName: C })
      : Ie(C, nr(l));
  }
  function R() {
    r && (o(!0), I.play());
  }
  return (
    Qi(() => {
      var y;
      if (r) {
        let C = a.current.querySelectorAll('[data-in="true"]'),
          v = 12,
          A = (y = t.position) == null ? void 0 : y.includes("top"),
          L = 0,
          $ = 0;
        Array.from(C)
          .reverse()
          .forEach((q, j) => {
            let H = q;
            H.classList.add("Toastify__toast--stacked"),
              j > 0 && (H.dataset.collapsed = `${n}`),
              H.dataset.pos || (H.dataset.pos = A ? "top" : "bot");
            let z = L * (n ? 0.2 : 1) + (n ? 0 : v * j);
            H.style.setProperty("--y", `${A ? z : z * -1}px`),
              H.style.setProperty("--g", `${v}`),
              H.style.setProperty("--s", `${1 - (n ? $ : 0)}`),
              (L += H.offsetHeight),
              ($ += 0.025);
          });
      }
    }, [n, f, r]),
    _.useEffect(() => {
      function y(C) {
        var v;
        let A = a.current;
        T(C) &&
          ((v = A.querySelector('[tabIndex="0"]')) == null || v.focus(),
          o(!1),
          I.pause()),
          C.key === "Escape" &&
            (document.activeElement === A ||
              (A != null && A.contains(document.activeElement))) &&
            (o(!0), I.play());
      }
      return (
        document.addEventListener("keydown", y),
        () => {
          document.removeEventListener("keydown", y);
        }
      );
    }, [T]),
    oe.createElement(
      "section",
      {
        ref: a,
        className: "Toastify",
        id: m,
        onMouseEnter: () => {
          r && (o(!1), I.pause());
        },
        onMouseLeave: R,
        "aria-live": "polite",
        "aria-atomic": "false",
        "aria-relevant": "additions text",
        "aria-label": t["aria-label"],
      },
      s((y, C) => {
        let v = C.length ? { ...d } : { ...d, pointerEvents: "none" };
        return oe.createElement(
          "div",
          {
            tabIndex: -1,
            className: b(y),
            "data-stacked": r,
            style: v,
            key: `c-${y}`,
          },
          C.map(({ content: A, props: L }) =>
            oe.createElement(
              sl,
              {
                ...L,
                stacked: r,
                collapseAll: R,
                isIn: u(L.toastId, L.containerId),
                key: `t-${L.key}`,
              },
              A
            )
          )
        );
      })
    )
  );
}
function co({ page: e, perPage: t, totalItems: r, onPageChange: n }) {
  const o = Math.max(1, Math.ceil(r / t)),
    a = e > 1,
    s = e < o,
    u = Math.max(1, e - 2),
    f = Math.min(o, u + 4),
    l = [];
  for (let m = u; m <= f; m++) l.push(m);
  const d = r === 0 ? 0 : (e - 1) * t + 1,
    h = Math.min(e * t, r);
  return /* @__PURE__ */ p.jsxs("div", {
    className: "pagination",
    children: [
      /* @__PURE__ */ p.jsx("div", {
        className: "pagination__meta",
        children:
          r > 0
            ? /* @__PURE__ */ p.jsxs("span", {
                children: ["Affiche ", d, "–", h, " sur ", r],
              })
            : /* @__PURE__ */ p.jsx("span", { children: "Aucun élément" }),
      }),
      /* @__PURE__ */ p.jsxs("div", {
        className: "pagination__controls",
        children: [
          /* @__PURE__ */ p.jsx("button", {
            className: "btn ghost",
            disabled: !a,
            onClick: () => a && n(e - 1),
            children: "Précédent",
          }),
          /* @__PURE__ */ p.jsx("div", {
            className: "pagination__pages",
            children: l.map((m) =>
              /* @__PURE__ */ p.jsx(
                "button",
                {
                  className: "page " + (m === e ? "active" : ""),
                  onClick: () => n(m),
                  "aria-current": m === e ? "page" : void 0,
                  children: m,
                },
                m
              )
            ),
          }),
          /* @__PURE__ */ p.jsx("button", {
            className: "btn ghost",
            disabled: !s,
            onClick: () => s && n(e + 1),
            children: "Suivant",
          }),
        ],
      }),
    ],
  });
}
const uo = "apiToken";
function xe() {
  return localStorage.getItem(uo) || "";
}
function Ot() {
  localStorage.removeItem(uo);
}
const ul = "https://dev-api-bcibank.ecash-guinee.com/api/getListeAlerteConfig",
  fl = "https://dev-api-bcibank.ecash-guinee.com/api/addAlerteConfig",
  dl = "https://dev-api-bcibank.ecash-guinee.com/api/UpdateAlerteConfig",
  pl = "https://dev-api-bcibank.ecash-guinee.com/api/getListNieauDurgence",
  hl = "https://dev-api-bcibank.ecash-guinee.com/api/getListeGroupeAlert",
  ml = "https://dev-api-bcibank.ecash-guinee.com/api/getListeModule",
  yl = "https://dev-api-bcibank.ecash-guinee.com/api/activeOrDesactiveAlert";
function gl() {
  const [e, t] = _.useState([]),
    [r, n] = _.useState(""),
    [o, a] = _.useState(!1),
    s = lr(),
    [u, f] = _.useState(null),
    [l, d] = _.useState(1),
    h = 4,
    [m, T] = _.useState(!1),
    [b, R] = _.useState(!1),
    [y, C] = _.useState(sn()),
    [v, A] = _.useState(vl()),
    [L, $] = _.useState([]),
    [q, j] = _.useState([]),
    [H, z] = _.useState([]),
    [ee, re] = _.useState(!1),
    V = _.useRef(null),
    se = _.useRef("");
  _.useEffect(() => {
    const g = Z.interceptors.response.use(
      (O) => (
        (O?.status === 401 ||
          O?.data?.status === 401 ||
          String(O?.data?.message || "")
            .toLowerCase()
            .includes("unauthenticated")) &&
          (Ot(),
          I.error("Session expirée. Veuillez vous reconnecter."),
          s("/login", { replace: !0 })),
        O
      ),
      (O) => (
        (O?.response?.status === 401 ||
          String(O?.response?.data?.message || "")
            .toLowerCase()
            .includes("unauthenticated")) &&
          (Ot(),
          I.error("Session expirée. Veuillez vous reconnecter."),
          s("/login", { replace: !0 })),
        Promise.reject(O)
      )
    );
    return () => Z.interceptors.response.eject(g);
  }, [s]);
  const te = async () => {
    a(!0);
    try {
      const g = xe(),
        O = await Z.get(ul, {
          headers: { Authorization: `Bearer ${g}`, Accept: "application/json" },
          validateStatus: () => !0,
        });
      if (
        (console.log("Réponse API (LIST):", O.status, O.data), O.status === 200)
      ) {
        const M = Array.isArray(O.data?.data) ? O.data.data : [];
        t(M), d(1);
      } else t([]);
    } catch (g) {
      console.error("Erreur LIST:", g?.message || g),
        console.error("Code HTTP:", g?.response?.status),
        console.error("Réponse serveur:", g?.response?.data),
        t([]),
        I.error(
          g?.response?.status
            ? `Échec du chargement [${g.response.status}]`
            : `Échec du chargement (${g?.message || "Network Error"})`
        );
    } finally {
      a(!1);
    }
  };
  _.useEffect(() => {
    te();
  }, []);
  const le = async () => {
      const g = xe();
      re(!0);
      let O = [],
        M = [],
        U = [];
      try {
        const F = { Authorization: `Bearer ${g}`, Accept: "application/json" },
          [ne, Ee, ke] = await Promise.allSettled([
            Z.get(pl, { headers: F, validateStatus: () => !0 }),
            Z.get(hl, { headers: F, validateStatus: () => !0 }),
            Z.get(ml, { headers: F, validateStatus: () => !0 }),
          ]);
        ne.status === "fulfilled" && ne.value.status === 200
          ? ((O = Array.isArray(ne.value.data?.data) ? ne.value.data.data : []),
            $(O))
          : ($([]), I.warn("Liste niveaux indisponible")),
          Ee.status === "fulfilled" && Ee.value.status === 200
            ? ((M = Array.isArray(Ee.value.data?.data)
                ? Ee.value.data.data
                : []),
              j(M))
            : (j([]), I.warn("Liste groupes indisponible")),
          ke.status === "fulfilled" && ke.value.status === 200
            ? ((U = Array.isArray(ke.value.data?.data)
                ? ke.value.data.data
                : []),
              z(U))
            : (z([]), I.warn("Liste modules indisponible"));
      } catch (F) {
        console.error(F), $([]), j([]), z([]);
      } finally {
        re(!1);
      }
      return { nivArr: O, grpArr: M, modArr: U };
    },
    K = _.useMemo(() => {
      const g = r.trim().toLowerCase();
      return g
        ? e.filter((O) =>
            [
              O.id,
              O.statusAlert,
              O.messageAlerte,
              O.tiSeverityLevel,
              O.typeAlert,
              O.groupeConcerne,
              O.vcDescription,
              O.limiteDeclenchementAlerte,
              O.niveauDurgence,
              O.moduleConcerne,
            ]
              .filter(Boolean)
              .some((M) => String(M).toLowerCase().includes(g))
          )
        : e;
    }, [e, r]);
  _.useEffect(() => {
    r.trim() &&
      K.length === 0 &&
      se.current !== r &&
      ((se.current = r),
      I.info("Aucun résultat pour votre recherche.", { autoClose: 1200 })),
      K.length > 0 && se.current && (se.current = "");
  }, [r, K.length]);
  const ce = Math.max(1, Math.ceil(K.length / h));
  _.useEffect(() => {
    l > ce && d(ce);
  }, [l, ce]);
  const ae = _.useMemo(() => {
      const g = (l - 1) * h;
      return K.slice(g, g + h);
    }, [K, l, h]),
    fe = async () => {
      C(sn()), await le(), T(!0);
    },
    me = () => T(!1),
    c = async (g) => {
      const { nivArr: O, modArr: M } = await le(),
        U =
          O.find((ne) => ne.vcDescription === g.niveauDurgence)?.id ||
          L.find((ne) => ne.vcDescription === g.niveauDurgence)?.id ||
          "",
        F =
          M.find((ne) => ne.vcName === g.moduleConcerne)?.id ||
          H.find((ne) => ne.vcName === g.moduleConcerne)?.id ||
          "";
      A({
        id: g.id ?? "",
        statusAlert: g.statusAlert ?? "1",
        messageAlerte: g.messageAlerte ?? "",
        // ID pour l’API update:
        idNiveauUrgence: U,
        idModule: F,
        // libellés (pour affichage fallback)
        niveauDurgence: g.niveauDurgence ?? "",
        moduleConcerne: g.moduleConcerne ?? "",
        // autres champs
        typeAlert: g.typeAlert ?? "",
        groupeConcerne: g.groupeConcerne ?? "",
        vcDescription: g.vcDescription ?? "",
        limiteDeclenchementAlerte: g.limiteDeclenchementAlerte ?? "",
        tiSeverityLevel: g.tiSeverityLevel ?? "",
      }),
        R(!0);
    },
    S = () => R(!1),
    P = async (g) => {
      g.preventDefault();
      const O = bl(y);
      if (O.length) {
        I.warn(O.join(" · "));
        return;
      }
      const M = {
          message: y.messageAlerte,
          idNiveauUrgence: y.idNiveauUrgence,
          typeAlerte: y.typeAlert,
          groupeConcerne: y.groupeConcerne,
          // libellé
          description: y.vcDescription,
          limiteDeclenchement: y.limiteDeclenchementAlerte,
          idModule: y.idModule,
        },
        U = I.loading("Ajout en cours…");
      try {
        const F = xe(),
          ne = await Z.post(fl, null, {
            headers: {
              Authorization: `Bearer ${F}`,
              Accept: "application/json",
            },
            params: M,
            validateStatus: () => !0,
          });
        console.log("Réponse API (ADD):", ne.status, ne.data),
          ne.status === 200
            ? (I.update(U, {
                render: "Alerte ajoutée avec succès",
                type: "success",
                isLoading: !1,
                autoClose: 1200,
              }),
              T(!1),
              await te(),
              d(1))
            : (I.update(U, {
                render: `Échec de l’ajout [${ne.status}]`,
                type: "error",
                isLoading: !1,
                autoClose: 2e3,
              }),
              ne.data?.message && I.error(String(ne.data.message)));
      } catch (F) {
        console.error("Erreur ADD:", F?.message || F),
          console.error("Code HTTP:", F?.response?.status),
          console.error("Réponse serveur:", F?.response?.data),
          I.update(U, {
            render: F?.response?.status
              ? `Erreur réseau/serveur [${F.response.status}]`
              : `Erreur réseau (${F?.message || "Network Error"})`,
            type: "error",
            isLoading: !1,
            autoClose: 2500,
          });
      }
    },
    E = async (g) => {
      g.preventDefault();
      const O = _l(v);
      if (O.length) {
        I.warn(O.join(" · "));
        return;
      }
      const M = {
          message: v.messageAlerte,
          idNiveauUrgence: v.idNiveauUrgence,
          // ID (sélect)
          typeAlerte: v.typeAlert,
          groupeConcerne: v.groupeConcerne,
          // libellé
          // On envoie aussi les extras si l’API les gère (ignorés sinon)
          description: v.vcDescription,
          limiteDeclenchement: v.limiteDeclenchementAlerte,
          idModule: v.idModule,
          // ID (sélect)
          // par prudence on envoie l’id sous 2 clés possibles (selon backend)
          id: v.id,
          idAlerte: v.id,
        },
        U = I.loading("Modification en cours…");
      try {
        const F = xe(),
          ne = await Z.post(dl, null, {
            headers: {
              Authorization: `Bearer ${F}`,
              Accept: "application/json",
            },
            params: M,
            validateStatus: () => !0,
          });
        console.log("Réponse API (UPDATE):", ne.status, ne.data),
          ne.status === 200
            ? (I.update(U, {
                render: "Alerte modifiée avec succès",
                type: "success",
                isLoading: !1,
                autoClose: 1200,
              }),
              R(!1),
              await te())
            : (I.update(U, {
                render: `Échec de la modification [${ne.status}]`,
                type: "error",
                isLoading: !1,
                autoClose: 2e3,
              }),
              ne.data?.message && I.error(String(ne.data.message)));
      } catch (F) {
        console.error("Erreur UPDATE:", F?.message || F),
          console.error("Code HTTP:", F?.response?.status),
          console.error("Réponse serveur:", F?.response?.data),
          I.update(U, {
            render: F?.response?.status
              ? `Erreur réseau/serveur [${F.response.status}]`
              : `Erreur réseau (${F?.message || "Network Error"})`,
            type: "error",
            isLoading: !1,
            autoClose: 2500,
          });
      }
    },
    k = async (g) => {
      const O = g.statusAlert === "1" ? "0" : "1",
        M = xe();
      f(g.id);
      const U = I.loading(
        O === "1" ? "Activation en cours…" : "Désactivation en cours…"
      );
      try {
        const F = await Z.post(yl, null, {
          headers: {
            Authorization: `Bearer ${M}`,
            Accept: "application/json",
          },
          params: {
            idAlert: g.id,
            btEnableAlert: O,
            // <- valeur exacte attendue par l’API
          },
          validateStatus: () => !0,
        });
        console.log("Réponse API (TOGGLE):", F.status, F.data),
          F.status === 200
            ? (t((ne) =>
                ne.map((Ee) =>
                  String(Ee.id) === String(g.id)
                    ? { ...Ee, statusAlert: O }
                    : Ee
                )
              ),
              I.update(U, {
                render: O === "1" ? "Alerte activée" : "Alerte désactivée",
                type: "success",
                isLoading: !1,
                autoClose: 1200,
              }))
            : (I.update(U, {
                render: `Échec ${
                  O === "1" ? "d’activation" : "de désactivation"
                } [${F.status}]`,
                type: "error",
                isLoading: !1,
                autoClose: 2200,
              }),
              F.data?.message && I.error(String(F.data.message)));
      } catch (F) {
        console.error("Erreur TOGGLE:", F?.message || F),
          console.error("Code HTTP:", F?.response?.status),
          console.error("Réponse serveur:", F?.response?.data),
          I.update(U, {
            render: F?.response?.status
              ? `Erreur réseau/serveur [${F.response.status}]`
              : `Erreur réseau (${F?.message || "Network Error"})`,
            type: "error",
            isLoading: !1,
            autoClose: 2500,
          });
      } finally {
        f(null);
      }
    };
  return (
    _.useMemo(
      () =>
        L.length
          ? L.map((g) => g.vcDescription)
          : Jt(e.map((g) => g.niveauDurgence).filter(Boolean)),
      [L, e]
    ),
    _.useMemo(
      () =>
        q.length
          ? q.map((g) => g.vcGroup)
          : Jt(e.map((g) => g.groupeConcerne).filter(Boolean)),
      [q, e]
    ),
    _.useMemo(
      () =>
        H.length
          ? H.map((g) => g.vcName)
          : Jt(e.map((g) => g.moduleConcerne).filter(Boolean)),
      [H, e]
    ),
    /* @__PURE__ */ p.jsxs("div", {
      className: "wrap",
      children: [
        /* @__PURE__ */ p.jsx(lo, { position: "top-right", theme: "colored" }),
        /* @__PURE__ */ p.jsxs("header", {
          className: "topbar",
          children: [
            /* @__PURE__ */ p.jsxs("div", {
              className: "brand",
              children: [
                /* @__PURE__ */ p.jsx("span", { className: "dot" }),
                /* @__PURE__ */ p.jsx("h1", { children: "Centre d'alerte" }),
              ],
            }),
            /* @__PURE__ */ p.jsx("div", {
              className: "actions",
              children: /* @__PURE__ */ p.jsx("button", {
                className: "btn primary",
                onClick: fe,
                disabled: o,
                children: "Ajouter une alerte",
              }),
            }),
          ],
        }),
        /* @__PURE__ */ p.jsxs("section", {
          className: "toolbar",
          children: [
            /* @__PURE__ */ p.jsxs("div", {
              className: "search",
              children: [
                /* @__PURE__ */ p.jsx("svg", {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  "aria-hidden": !0,
                  children: /* @__PURE__ */ p.jsx("path", {
                    fill: "currentColor",
                    d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
                  }),
                }),
                /* @__PURE__ */ p.jsx("input", {
                  ref: V,
                  placeholder: "Rechercher (message, type, groupe, module…)",
                  value: r,
                  onChange: (g) => {
                    n(g.target.value), d(1);
                  },
                }),
              ],
            }),
            /* @__PURE__ */ p.jsx("div", {
              className: "stats",
              children: /* @__PURE__ */ p.jsxs("span", {
                className: "badge",
                children: ["Total: ", e.length],
              }),
            }),
          ],
        }),
        /* @__PURE__ */ p.jsxs("div", {
          className: "card",
          children: [
            /* @__PURE__ */ p.jsx("div", {
              className: "table-wrap",
              children: /* @__PURE__ */ p.jsxs("table", {
                className: "tbl",
                children: [
                  /* @__PURE__ */ p.jsx("thead", {
                    children: /* @__PURE__ */ p.jsxs("tr", {
                      children: [
                        /* @__PURE__ */ p.jsx("th", { children: "ID" }),
                        /* @__PURE__ */ p.jsx("th", { children: "Message" }),
                        /* @__PURE__ */ p.jsx("th", { children: "Statut" }),
                        /* @__PURE__ */ p.jsx("th", {
                          children: "Niveau d’urgence",
                        }),
                        /* @__PURE__ */ p.jsx("th", { children: "Type" }),
                        /* @__PURE__ */ p.jsx("th", { children: "Groupe" }),
                        /* @__PURE__ */ p.jsx("th", {
                          children: "Description",
                        }),
                        /* @__PURE__ */ p.jsx("th", { children: "Seuil" }),
                        /* @__PURE__ */ p.jsx("th", { children: "Module" }),
                        /* @__PURE__ */ p.jsx("th", {
                          style: { width: 120 },
                          children: "Actions",
                        }),
                      ],
                    }),
                  }),
                  /* @__PURE__ */ p.jsx("tbody", {
                    children:
                      ae.length === 0
                        ? /* @__PURE__ */ p.jsx("tr", {
                            children: /* @__PURE__ */ p.jsx("td", {
                              colSpan: 11,
                              className: "empty",
                              children: "—",
                            }),
                          })
                        : ae.map((g) =>
                            /* @__PURE__ */ p.jsxs(
                              "tr",
                              {
                                children: [
                                  /* @__PURE__ */ p.jsx("td", {
                                    children: g.id,
                                  }),
                                  /* @__PURE__ */ p.jsx("td", {
                                    className: "w-clip",
                                    children: /* @__PURE__ */ p.jsx("div", {
                                      className: "title-cell",
                                      children: /* @__PURE__ */ p.jsx("span", {
                                        className: "title-text",
                                        children: g.messageAlerte ?? "—",
                                      }),
                                    }),
                                  }),
                                  /* @__PURE__ */ p.jsx("td", {
                                    children: /* @__PURE__ */ p.jsx("span", {
                                      className:
                                        "chip " +
                                        (g.statusAlert === "1"
                                          ? "chip-s"
                                          : "chip-d"),
                                      children:
                                        g.statusAlert === "1"
                                          ? "Actif"
                                          : "Inactif",
                                    }),
                                  }),
                                  /* @__PURE__ */ p.jsx("td", {
                                    children: /* @__PURE__ */ p.jsx("span", {
                                      className: "muted",
                                      children: g.niveauDurgence ?? "—",
                                    }),
                                  }),
                                  /* @__PURE__ */ p.jsx("td", {
                                    children: g.typeAlert ?? "—",
                                  }),
                                  /* @__PURE__ */ p.jsx("td", {
                                    children: g.groupeConcerne ?? "—",
                                  }),
                                  /* @__PURE__ */ p.jsx("td", {
                                    className: "w-clip",
                                    children: /* @__PURE__ */ p.jsx("span", {
                                      className: "muted",
                                      children: g.vcDescription ?? "—",
                                    }),
                                  }),
                                  /* @__PURE__ */ p.jsx("td", {
                                    children:
                                      g.limiteDeclenchementAlerte ?? "—",
                                  }),
                                  /* @__PURE__ */ p.jsx("td", {
                                    children: g.moduleConcerne ?? "—",
                                  }),
                                  /* @__PURE__ */ p.jsx("td", {
                                    children: /* @__PURE__ */ p.jsxs("div", {
                                      className: "row-actions",
                                      children: [
                                        /* @__PURE__ */ p.jsx("button", {
                                          className: "btn ghost",
                                          title: "Modifier",
                                          "aria-label": "Modifier",
                                          onClick: () => c(g),
                                          children: /* @__PURE__ */ p.jsx(
                                            "svg",
                                            {
                                              width: "18",
                                              height: "18",
                                              viewBox: "0 0 24 24",
                                              "aria-hidden": !0,
                                              children: /* @__PURE__ */ p.jsx(
                                                "path",
                                                {
                                                  fill: "currentColor",
                                                  d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z",
                                                }
                                              ),
                                            }
                                          ),
                                        }),
                                        /* @__PURE__ */ p.jsx("button", {
                                          className:
                                            "btn ghost icon-btn " +
                                            (g.statusAlert === "1"
                                              ? "is-active"
                                              : "is-inactive"),
                                          title:
                                            g.statusAlert === "1"
                                              ? "Désactiver"
                                              : "Activer",
                                          "aria-label":
                                            g.statusAlert === "1"
                                              ? "Désactiver"
                                              : "Activer",
                                          onClick: () => k(g),
                                          disabled: u === g.id,
                                          children:
                                            g.statusAlert === "1"
                                              ? /* icône déverrouillé (vert) */
                                                /* @__PURE__ */ p.jsx("svg", {
                                                  width: "18",
                                                  height: "18",
                                                  viewBox: "0 0 24 24",
                                                  "aria-hidden": !0,
                                                  children:
                                                    /* @__PURE__ */ p.jsx(
                                                      "path",
                                                      {
                                                        fill: "currentColor",
                                                        d: "M12 17a2 2 0 100-4 2 2 0 000 4zm6-7h-1V7a5 5 0 10-10 0h2a3 3 0 116 0v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2z",
                                                      }
                                                    ),
                                                })
                                              : /* icône verrouillé (rouge) */
                                                /* @__PURE__ */ p.jsx("svg", {
                                                  width: "18",
                                                  height: "18",
                                                  viewBox: "0 0 24 24",
                                                  "aria-hidden": !0,
                                                  children:
                                                    /* @__PURE__ */ p.jsx(
                                                      "path",
                                                      {
                                                        fill: "currentColor",
                                                        d: "M12 17a2 2 0 100-4 2 2 0 000 4zm6-7h-1V7a5 5 0 10-10 0v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2zm-9-3a3 3 0 116 0v3H9V7z",
                                                      }
                                                    ),
                                                }),
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              },
                              g.id
                            )
                          ),
                  }),
                ],
              }),
            }),
            /* @__PURE__ */ p.jsx(co, {
              page: l,
              perPage: h,
              totalItems: K.length,
              onPageChange: d,
            }),
          ],
        }),
        m &&
          /* @__PURE__ */ p.jsx(an, {
            title: "Ajouter une alerte" + (ee ? " (chargement…)" : ""),
            onClose: me,
            children: /* @__PURE__ */ p.jsxs("form", {
              className: "form",
              onSubmit: P,
              children: [
                /* @__PURE__ */ p.jsxs("div", {
                  className: "grid",
                  children: [
                    /* @__PURE__ */ p.jsxs("label", {
                      className: "full",
                      children: [
                        /* @__PURE__ */ p.jsx("span", {
                          children: "Message de l’alerte",
                        }),
                        /* @__PURE__ */ p.jsx("input", {
                          autoFocus: !0,
                          value: y.messageAlerte,
                          onChange: (g) =>
                            C({ ...y, messageAlerte: g.target.value }),
                          placeholder:
                            "Ex: Trop de transactions en attentes en 1h",
                        }),
                      ],
                    }),
                    /* @__PURE__ */ p.jsx(Be, {
                      label: "Niveau d’urgence",
                      value: y.idNiveauUrgence,
                      setValue: (g) => C({ ...y, idNiveauUrgence: g }),
                      options: L,
                      placeholder: "Sélectionner…",
                      getValue: (g) => g.id,
                      getLabel: (g) => g.vcDescription,
                    }),
                    /* @__PURE__ */ p.jsxs("label", {
                      children: [
                        /* @__PURE__ */ p.jsx("span", {
                          children: "Type d’alerte",
                        }),
                        /* @__PURE__ */ p.jsxs("select", {
                          value: y.typeAlert,
                          onChange: (g) =>
                            C({ ...y, typeAlert: g.target.value }),
                          children: [
                            /* @__PURE__ */ p.jsx("option", {
                              value: "",
                              children: "Sélectionner…",
                            }),
                            /* @__PURE__ */ p.jsx("option", {
                              value: "URGENT",
                              children: "URGENT",
                            }),
                            /* @__PURE__ */ p.jsx("option", {
                              value: "INFO",
                              children: "INFO",
                            }),
                          ],
                        }),
                      ],
                    }),
                    /* @__PURE__ */ p.jsx(Be, {
                      label: "Groupe concerné",
                      value: y.groupeConcerne,
                      setValue: (g) => C({ ...y, groupeConcerne: g }),
                      options: q,
                      placeholder: "Sélectionner…",
                      getValue: (g) => g.vcGroup,
                      getLabel: (g) => g.vcGroup,
                    }),
                    /* @__PURE__ */ p.jsx(Be, {
                      label: "Module concerné",
                      value: y.idModule,
                      setValue: (g) => C({ ...y, idModule: g }),
                      options: H,
                      placeholder: "Sélectionner…",
                      getValue: (g) => g.id,
                      getLabel: (g) => g.vcName,
                    }),
                    /* @__PURE__ */ p.jsxs("label", {
                      children: [
                        /* @__PURE__ */ p.jsx("span", {
                          children: "Seuil pour déclencher l’alerte",
                        }),
                        /* @__PURE__ */ p.jsx("input", {
                          type: "number",
                          step: "any",
                          value: y.limiteDeclenchementAlerte,
                          onChange: (g) =>
                            C({
                              ...y,
                              limiteDeclenchementAlerte: g.target.value,
                            }),
                          placeholder: "Ex: 20",
                        }),
                      ],
                    }),
                    /* @__PURE__ */ p.jsxs("label", {
                      className: "full",
                      children: [
                        /* @__PURE__ */ p.jsx("span", {
                          children: "Description",
                        }),
                        /* @__PURE__ */ p.jsx("textarea", {
                          rows: 3,
                          value: y.vcDescription,
                          onChange: (g) =>
                            C({ ...y, vcDescription: g.target.value }),
                          placeholder: "Contexte, impact…",
                        }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ p.jsxs("div", {
                  className: "modal-actions",
                  children: [
                    /* @__PURE__ */ p.jsx("button", {
                      type: "button",
                      className: "btn ghost",
                      onClick: me,
                      children: "Annuler",
                    }),
                    /* @__PURE__ */ p.jsx("button", {
                      type: "submit",
                      className: "btn primary",
                      disabled: ee,
                      children: "Créer",
                    }),
                  ],
                }),
              ],
            }),
          }),
        b &&
          /* @__PURE__ */ p.jsx(an, {
            title: "Modifier l’alerte",
            onClose: S,
            children: /* @__PURE__ */ p.jsxs("form", {
              className: "form",
              onSubmit: E,
              children: [
                /* @__PURE__ */ p.jsxs("div", {
                  className: "grid",
                  children: [
                    /* @__PURE__ */ p.jsxs("label", {
                      className: "full",
                      children: [
                        /* @__PURE__ */ p.jsx("span", {
                          children: "Message de l’alerte",
                        }),
                        /* @__PURE__ */ p.jsx("input", {
                          autoFocus: !0,
                          value: v.messageAlerte,
                          onChange: (g) =>
                            A({ ...v, messageAlerte: g.target.value }),
                        }),
                      ],
                    }),
                    L?.length
                      ? /* @__PURE__ */ p.jsx(Be, {
                          label: "Niveau d’urgence",
                          value: v.idNiveauUrgence,
                          setValue: (g) => A({ ...v, idNiveauUrgence: g }),
                          options: L,
                          placeholder: "Sélectionner…",
                          getValue: (g) => g.id,
                          getLabel: (g) => g.vcDescription,
                        })
                      : /* @__PURE__ */ p.jsxs("label", {
                          children: [
                            /* @__PURE__ */ p.jsx("span", {
                              children: "Niveau d’urgence",
                            }),
                            /* @__PURE__ */ p.jsx("input", {
                              value: v.niveauDurgence,
                              onChange: (g) =>
                                A({ ...v, niveauDurgence: g.target.value }),
                            }),
                          ],
                        }),
                    /* @__PURE__ */ p.jsxs("label", {
                      children: [
                        /* @__PURE__ */ p.jsx("span", {
                          children: "Type d’alerte",
                        }),
                        /* @__PURE__ */ p.jsxs("select", {
                          value: v.typeAlert,
                          onChange: (g) =>
                            A({ ...v, typeAlert: g.target.value }),
                          children: [
                            /* @__PURE__ */ p.jsx("option", {
                              value: "",
                              children: "Sélectionner…",
                            }),
                            /* @__PURE__ */ p.jsx("option", {
                              value: "URGENT",
                              children: "URGENT",
                            }),
                            /* @__PURE__ */ p.jsx("option", {
                              value: "INFO",
                              children: "INFO",
                            }),
                          ],
                        }),
                      ],
                    }),
                    q?.length
                      ? /* @__PURE__ */ p.jsx(Be, {
                          label: "Groupe concerné",
                          value: v.groupeConcerne,
                          setValue: (g) => A({ ...v, groupeConcerne: g }),
                          options: q,
                          placeholder: "Sélectionner…",
                          getValue: (g) => g.vcGroup,
                          getLabel: (g) => g.vcGroup,
                        })
                      : /* @__PURE__ */ p.jsxs("label", {
                          children: [
                            /* @__PURE__ */ p.jsx("span", {
                              children: "Groupe concerné",
                            }),
                            /* @__PURE__ */ p.jsx("input", {
                              value: v.groupeConcerne,
                              onChange: (g) =>
                                A({ ...v, groupeConcerne: g.target.value }),
                            }),
                          ],
                        }),
                    H?.length
                      ? /* @__PURE__ */ p.jsx(Be, {
                          label: "Module concerné",
                          value: v.idModule,
                          setValue: (g) => A({ ...v, idModule: g }),
                          options: H,
                          placeholder: "Sélectionner…",
                          getValue: (g) => g.id,
                          getLabel: (g) => g.vcName,
                        })
                      : /* @__PURE__ */ p.jsxs("label", {
                          children: [
                            /* @__PURE__ */ p.jsx("span", {
                              children: "Module concerné",
                            }),
                            /* @__PURE__ */ p.jsx("input", {
                              value: v.moduleConcerne,
                              onChange: (g) =>
                                A({ ...v, moduleConcerne: g.target.value }),
                            }),
                          ],
                        }),
                    /* @__PURE__ */ p.jsxs("label", {
                      children: [
                        /* @__PURE__ */ p.jsx("span", {
                          children: "Seuil pour déclencher l’alerte",
                        }),
                        /* @__PURE__ */ p.jsx("input", {
                          type: "number",
                          step: "any",
                          value: v.limiteDeclenchementAlerte,
                          onChange: (g) =>
                            A({
                              ...v,
                              limiteDeclenchementAlerte: g.target.value,
                            }),
                        }),
                      ],
                    }),
                    /* @__PURE__ */ p.jsxs("label", {
                      className: "full",
                      children: [
                        /* @__PURE__ */ p.jsx("span", {
                          children: "Description",
                        }),
                        /* @__PURE__ */ p.jsx("textarea", {
                          rows: 3,
                          value: v.vcDescription,
                          onChange: (g) =>
                            A({ ...v, vcDescription: g.target.value }),
                        }),
                      ],
                    }),
                  ],
                }),
                /* @__PURE__ */ p.jsxs("div", {
                  className: "modal-actions",
                  children: [
                    /* @__PURE__ */ p.jsx("button", {
                      type: "button",
                      className: "btn ghost",
                      onClick: S,
                      children: "Annuler",
                    }),
                    /* @__PURE__ */ p.jsx("button", {
                      type: "submit",
                      className: "btn primary",
                      children: "Enregistrer",
                    }),
                  ],
                }),
              ],
            }),
          }),
      ],
    })
  );
}
function Be({
  label: e,
  value: t,
  setValue: r,
  options: n,
  placeholder: o = "Sélectionner…",
  getValue: a,
  getLabel: s,
}) {
  return !n || n.length === 0
    ? /* @__PURE__ */ p.jsxs("label", {
        children: [
          /* @__PURE__ */ p.jsx("span", { children: e }),
          /* @__PURE__ */ p.jsx("input", {
            value: t,
            onChange: (u) => r(u.target.value),
            placeholder: o,
          }),
        ],
      })
    : /* @__PURE__ */ p.jsxs("label", {
        children: [
          /* @__PURE__ */ p.jsx("span", { children: e }),
          /* @__PURE__ */ p.jsxs("select", {
            value: t,
            onChange: (u) => r(u.target.value),
            children: [
              /* @__PURE__ */ p.jsx("option", { value: "", children: o }),
              n.map((u) =>
                /* @__PURE__ */ p.jsx(
                  "option",
                  { value: a(u), children: s(u) },
                  a(u)
                )
              ),
            ],
          }),
        ],
      });
}
function an({ title: e, children: t, onClose: r }) {
  const n = _.useRef(null);
  return (
    _.useEffect(() => {
      function o(a) {
        a.key === "Escape" && r();
      }
      return (
        document.addEventListener("keydown", o),
        () => document.removeEventListener("keydown", o)
      );
    }, [r]),
    _.useEffect(() => {
      n.current?.querySelector("input,select,textarea,button")?.focus();
    }, []),
    /* @__PURE__ */ p.jsx("div", {
      className: "modal-overlay",
      role: "dialog",
      "aria-modal": "true",
      children: /* @__PURE__ */ p.jsxs("div", {
        className: "modal",
        ref: n,
        children: [
          /* @__PURE__ */ p.jsxs("div", {
            className: "modal-h",
            children: [
              /* @__PURE__ */ p.jsx("h3", { children: e }),
              /* @__PURE__ */ p.jsx("button", {
                className: "icon",
                "aria-label": "Fermer",
                onClick: r,
                children: "✕",
              }),
            ],
          }),
          /* @__PURE__ */ p.jsx("div", { className: "modal-c", children: t }),
        ],
      }),
    })
  );
}
function sn() {
  return {
    messageAlerte: "",
    idNiveauUrgence: "",
    // ID
    typeAlert: "",
    groupeConcerne: "",
    // label
    vcDescription: "",
    limiteDeclenchementAlerte: "",
    idModule: "",
    // ID
  };
}
function vl() {
  return {
    id: "",
    statusAlert: "1",
    messageAlerte: "",
    idNiveauUrgence: "",
    // ID
    idModule: "",
    // ID
    niveauDurgence: "",
    // label (fallback display)
    moduleConcerne: "",
    // label (fallback display)
    typeAlert: "",
    groupeConcerne: "",
    vcDescription: "",
    limiteDeclenchementAlerte: "",
    tiSeverityLevel: "",
  };
}
function bl(e) {
  const t = [];
  return (
    e.messageAlerte.trim() || t.push("Le message de l’alerte est requis"),
    e.idNiveauUrgence || t.push("Le niveau d’urgence est requis"),
    e.typeAlert || t.push("Le type d’alerte est requis"),
    e.groupeConcerne || t.push("Le groupe concerné est requis"),
    e.idModule || t.push("Le module concerné est requis"),
    t
  );
}
function _l(e) {
  const t = [];
  return (
    e.messageAlerte.trim() || t.push("Le message de l’alerte est requis"),
    e.idNiveauUrgence || t.push("Le niveau d’urgence (ID) est requis"),
    e.typeAlert || t.push("Le type d’alerte est requis"),
    e.groupeConcerne || t.push("Le groupe concerné est requis"),
    t
  );
}
function Jt(e) {
  return Array.from(new Set(e));
}
const El =
    "https://dev-api-bcibank.ecash-guinee.com/api/getListeNotiifcationConfig",
  wl = "https://dev-api-bcibank.ecash-guinee.com/api/addNotificationConfig",
  Tl = "https://dev-api-bcibank.ecash-guinee.com/api/UpdateNotificationConfig",
  xl =
    "https://dev-api-bcibank.ecash-guinee.com/api/activeOrDesactiveNotification",
  Rl = "https://dev-api-bcibank.ecash-guinee.com/api/getListNieauDurgence",
  Sl = "https://dev-api-bcibank.ecash-guinee.com/api/getListeModule";
function Cl() {
  const [e, t] = _.useState([]),
    [r, n] = _.useState(""),
    [o, a] = _.useState(!1),
    [s, u] = _.useState(null),
    f = lr(),
    [l, d] = _.useState(1),
    h = 4,
    [m, T] = _.useState(!1),
    [b, R] = _.useState(!1),
    [y, C] = _.useState(cn()),
    [v, A] = _.useState(Al()),
    [L, $] = _.useState([]),
    [q, j] = _.useState([]),
    [H, z] = _.useState(!1),
    ee = _.useRef(null),
    re = _.useRef("");
  _.useEffect(() => {
    const E = Z.interceptors.response.use(
      (k) => (
        (k?.status === 401 ||
          k?.data?.status === 401 ||
          String(k?.data?.message || "")
            .toLowerCase()
            .includes("unauthenticated")) &&
          (Ot(),
          I.error("Session expirée. Veuillez vous reconnecter."),
          f("/login", { replace: !0 })),
        k
      ),
      (k) => (
        (k?.response?.status === 401 ||
          String(k?.response?.data?.message || "")
            .toLowerCase()
            .includes("unauthenticated")) &&
          (Ot(),
          I.error("Session expirée. Veuillez vous reconnecter."),
          f("/login", { replace: !0 })),
        Promise.reject(k)
      )
    );
    return () => Z.interceptors.response.eject(E);
  }, [f]);
  const V = async () => {
    a(!0);
    try {
      const E = xe(),
        k = await Z.get(El, {
          headers: { Authorization: `Bearer ${E}`, Accept: "application/json" },
          validateStatus: () => !0,
        });
      if (
        (console.log("Réponse API (LIST):", k.status, k.data), k.status === 200)
      ) {
        const g = Array.isArray(k.data?.data) ? k.data.data : [];
        t(g), d(1);
      } else
        t([]), I.error(`Chargement des notifications échoué [${k.status}]`);
    } catch (E) {
      console.error("Erreur LIST:", E?.message || E),
        I.error(
          E?.response?.status
            ? `Échec [${E.response.status}]`
            : `Erreur réseau (${E?.message || "Network Error"})`
        ),
        t([]);
    } finally {
      a(!1);
    }
  };
  _.useEffect(() => {
    V();
  }, []);
  const se = async () => {
      z(!0);
      try {
        const k = {
            Authorization: `Bearer ${xe()}`,
            Accept: "application/json",
          },
          [g, O] = await Promise.allSettled([
            Z.get(Rl, { headers: k, validateStatus: () => !0 }),
            Z.get(Sl, { headers: k, validateStatus: () => !0 }),
          ]);
        g.status === "fulfilled" && g.value.status === 200
          ? $(Array.isArray(g.value.data?.data) ? g.value.data.data : [])
          : ($([]), I.warn("Liste niveaux indisponible")),
          O.status === "fulfilled" && O.value.status === 200
            ? j(Array.isArray(O.value.data?.data) ? O.value.data.data : [])
            : (j([]), I.warn("Liste modules indisponible"));
      } catch (E) {
        console.error(E), $([]), j([]);
      } finally {
        z(!1);
      }
    },
    te = _.useMemo(() => {
      const E = r.trim().toLowerCase();
      return E
        ? e.filter((k) =>
            [
              k.id,
              k.statusNotification,
              k.messageNotification,
              k.type,
              // dans la liste l’API renvoie "type"
              k.vcDescription,
              k.limiteDeclenchementNotification,
              k.niveauDurgence,
              k.moduleConcerne,
            ]
              .filter(Boolean)
              .some((g) => String(g).toLowerCase().includes(E))
          )
        : e;
    }, [e, r]);
  _.useEffect(() => {
    r.trim() &&
      te.length === 0 &&
      re.current !== r &&
      ((re.current = r),
      I.info("Aucun résultat pour votre recherche.", { autoClose: 1200 })),
      te.length > 0 && re.current && (re.current = "");
  }, [r, te.length]);
  const le = Math.max(1, Math.ceil(te.length / h));
  _.useEffect(() => {
    l > le && d(le);
  }, [l, le]);
  const K = _.useMemo(() => {
      const E = (l - 1) * h;
      return te.slice(E, E + h);
    }, [te, l, h]),
    ce = async () => {
      C(cn()), await se(), T(!0);
    },
    ae = () => T(!1),
    fe = async (E) => {
      await se();
      const k = L.find((O) => O.vcDescription === E.niveauDurgence)?.id || "",
        g = q.find((O) => O.vcName === E.moduleConcerne)?.id || "";
      A({
        id: E.id ?? "",
        statusNotification: E.statusNotification ?? "1",
        messageNotification: E.messageNotification ?? "",
        idNiveauUrgence: k,
        idModule: g,
        niveauDurgence: E.niveauDurgence ?? "",
        moduleConcerne: E.moduleConcerne ?? "",
        typeAlerte: E.type ?? "",
        // ⚠️ select d’édition alimente typeAlerte
        vcDescription: E.vcDescription ?? "",
        limiteDeclenchementNotification:
          E.limiteDeclenchementNotification ?? "",
      }),
        R(!0);
    },
    me = () => R(!1),
    c = async (E) => {
      E.preventDefault();
      const k = Ol(y);
      if (k.length) {
        I.warn(k.join(" · "));
        return;
      }
      const g = {
          message: y.messageNotification,
          idNiveauUrgence: y.idNiveauUrgence,
          typeAlerte: y.typeAlerte,
          // <<<<<<<<<<<<<<
          description: y.vcDescription,
          limiteDeclenchement: y.limiteDeclenchementNotification,
          idModule: y.idModule,
        },
        O = I.loading("Ajout en cours…");
      try {
        const M = xe(),
          U = await Z.post(wl, null, {
            headers: {
              Authorization: `Bearer ${M}`,
              Accept: "application/json",
            },
            params: g,
            validateStatus: () => !0,
          });
        console.log("Réponse API (ADD):", U.status, U.data),
          U.status === 200
            ? (I.update(O, {
                render: "Notification ajoutée",
                type: "success",
                isLoading: !1,
                autoClose: 1200,
              }),
              T(!1),
              await V(),
              d(1))
            : (I.update(O, {
                render: `Échec de l’ajout [${U.status}]`,
                type: "error",
                isLoading: !1,
                autoClose: 2200,
              }),
              U.data?.message && I.error(String(U.data.message)));
      } catch (M) {
        console.error("Erreur ADD:", M?.message || M),
          I.update(O, {
            render: M?.response?.status
              ? `Erreur [${M.response.status}]`
              : `Erreur réseau (${M?.message || "Network Error"})`,
            type: "error",
            isLoading: !1,
            autoClose: 2500,
          });
      }
    },
    S = async (E) => {
      E.preventDefault();
      const k = Nl(v);
      if (k.length) {
        I.warn(k.join(" · "));
        return;
      }
      const g = {
          message: v.messageNotification,
          idNiveauUrgence: v.idNiveauUrgence,
          typeAlerte: v.typeAlerte,
          // <<<<<<<<<<<<<<
          description: v.vcDescription,
          limiteDeclenchement: v.limiteDeclenchementNotification,
          idModule: v.idModule,
          idAlerte: v.id,
        },
        O = I.loading("Modification en cours…");
      try {
        const M = xe(),
          U = await Z.post(Tl, null, {
            headers: {
              Authorization: `Bearer ${M}`,
              Accept: "application/json",
            },
            params: g,
            validateStatus: () => !0,
          });
        console.log("Réponse API (UPDATE):", U.status, U.data),
          U.status === 200
            ? (I.update(O, {
                render: "Notification modifiée",
                type: "success",
                isLoading: !1,
                autoClose: 1200,
              }),
              R(!1),
              await V())
            : (I.update(O, {
                render: `Échec de la modification [${U.status}]`,
                type: "error",
                isLoading: !1,
                autoClose: 2200,
              }),
              U.data?.message && I.error(String(U.data.message)));
      } catch (M) {
        console.error("Erreur UPDATE:", M?.message || M),
          I.update(O, {
            render: M?.response?.status
              ? `Erreur [${M.response.status}]`
              : `Erreur réseau (${M?.message || "Network Error"})`,
            type: "error",
            isLoading: !1,
            autoClose: 2500,
          });
      }
    },
    P = async (E) => {
      const k = E.statusNotification === "1" ? "0" : "1",
        g = xe();
      u(E.id);
      const O = I.loading(k === "1" ? "Activation…" : "Désactivation…");
      try {
        const M = await Z.post(xl, null, {
          headers: { Authorization: `Bearer ${g}`, Accept: "application/json" },
          params: { idNotification: E.id, btEnabled: k },
          validateStatus: () => !0,
        });
        console.log("Réponse API (TOGGLE):", M.status, M.data),
          M.status === 200
            ? (t((U) =>
                U.map((F) =>
                  String(F.id) === String(E.id)
                    ? { ...F, statusNotification: k }
                    : F
                )
              ),
              I.update(O, {
                render:
                  k === "1"
                    ? "Notification activée"
                    : "Notification désactivée",
                type: "success",
                isLoading: !1,
                autoClose: 1200,
              }))
            : (I.update(O, {
                render: `Échec ${
                  k === "1" ? "d’activation" : "de désactivation"
                } [${M.status}]`,
                type: "error",
                isLoading: !1,
                autoClose: 2200,
              }),
              M.data?.message && I.error(String(M.data.message)));
      } catch (M) {
        console.error("Erreur TOGGLE:", M?.message || M),
          I.update(O, {
            render: M?.response?.status
              ? `Erreur [${M.response.status}]`
              : `Erreur réseau (${M?.message || "Network Error"})`,
            type: "error",
            isLoading: !1,
            autoClose: 2500,
          });
      } finally {
        u(null);
      }
    };
  return /* @__PURE__ */ p.jsxs("div", {
    className: "wrap",
    children: [
      /* @__PURE__ */ p.jsx(lo, { position: "top-right", theme: "colored" }),
      /* @__PURE__ */ p.jsxs("header", {
        className: "topbar",
        children: [
          /* @__PURE__ */ p.jsxs("div", {
            className: "brand",
            children: [
              /* @__PURE__ */ p.jsx("span", { className: "dot" }),
              /* @__PURE__ */ p.jsx("h1", {
                children: "Centre de Notification",
              }),
            ],
          }),
          /* @__PURE__ */ p.jsx("div", {
            className: "actions",
            children: /* @__PURE__ */ p.jsx("button", {
              className: "btn primary",
              onClick: ce,
              disabled: o,
              children: "Ajouter une Notification",
            }),
          }),
        ],
      }),
      /* @__PURE__ */ p.jsxs("section", {
        className: "toolbar",
        children: [
          /* @__PURE__ */ p.jsxs("div", {
            className: "search",
            children: [
              /* @__PURE__ */ p.jsx("svg", {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                "aria-hidden": !0,
                children: /* @__PURE__ */ p.jsx("path", {
                  fill: "currentColor",
                  d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
                }),
              }),
              /* @__PURE__ */ p.jsx("input", {
                ref: ee,
                placeholder: "Rechercher (message, type, module…)",
                value: r,
                onChange: (E) => {
                  n(E.target.value), d(1);
                },
              }),
            ],
          }),
          /* @__PURE__ */ p.jsx("div", {
            className: "stats",
            children: /* @__PURE__ */ p.jsxs("span", {
              className: "badge",
              children: ["Total: ", e.length],
            }),
          }),
        ],
      }),
      /* @__PURE__ */ p.jsxs("div", {
        className: "card",
        children: [
          /* @__PURE__ */ p.jsx("div", {
            className: "table-wrap",
            children: /* @__PURE__ */ p.jsxs("table", {
              className: "tbl",
              children: [
                /* @__PURE__ */ p.jsx("thead", {
                  children: /* @__PURE__ */ p.jsxs("tr", {
                    children: [
                      /* @__PURE__ */ p.jsx("th", { children: "ID" }),
                      /* @__PURE__ */ p.jsx("th", { children: "Message" }),
                      /* @__PURE__ */ p.jsx("th", { children: "Statut" }),
                      /* @__PURE__ */ p.jsx("th", {
                        children: "Niveau d’urgence",
                      }),
                      /* @__PURE__ */ p.jsx("th", { children: "Type" }),
                      /* @__PURE__ */ p.jsx("th", { children: "Description" }),
                      /* @__PURE__ */ p.jsx("th", { children: "Seuil" }),
                      /* @__PURE__ */ p.jsx("th", { children: "Module" }),
                      /* @__PURE__ */ p.jsx("th", {
                        style: { width: 120 },
                        children: "Actions",
                      }),
                    ],
                  }),
                }),
                /* @__PURE__ */ p.jsx("tbody", {
                  children:
                    K.length === 0
                      ? /* @__PURE__ */ p.jsx("tr", {
                          children: /* @__PURE__ */ p.jsx("td", {
                            colSpan: 9,
                            className: "empty",
                            children: "—",
                          }),
                        })
                      : K.map((E) =>
                          /* @__PURE__ */ p.jsxs(
                            "tr",
                            {
                              children: [
                                /* @__PURE__ */ p.jsx("td", { children: E.id }),
                                /* @__PURE__ */ p.jsx("td", {
                                  className: "w-clip",
                                  children: /* @__PURE__ */ p.jsx("div", {
                                    className: "title-cell",
                                    children: /* @__PURE__ */ p.jsx("span", {
                                      className: "title-text",
                                      children: E.messageNotification ?? "—",
                                    }),
                                  }),
                                }),
                                /* @__PURE__ */ p.jsx("td", {
                                  children: /* @__PURE__ */ p.jsx("span", {
                                    className:
                                      "chip " +
                                      (E.statusNotification === "1"
                                        ? "chip-s"
                                        : "chip-d"),
                                    children:
                                      E.statusNotification === "1"
                                        ? "Actif"
                                        : "Inactif",
                                  }),
                                }),
                                /* @__PURE__ */ p.jsx("td", {
                                  children: /* @__PURE__ */ p.jsx("span", {
                                    className: "muted",
                                    children: E.niveauDurgence ?? "—",
                                  }),
                                }),
                                /* @__PURE__ */ p.jsx("td", {
                                  children: E.type ?? "—",
                                }),
                                /* @__PURE__ */ p.jsx("td", {
                                  className: "w-clip",
                                  children: /* @__PURE__ */ p.jsx("span", {
                                    className: "muted",
                                    children: E.vcDescription ?? "—",
                                  }),
                                }),
                                /* @__PURE__ */ p.jsx("td", {
                                  children:
                                    E.limiteDeclenchementNotification ?? "—",
                                }),
                                /* @__PURE__ */ p.jsx("td", {
                                  children: E.moduleConcerne ?? "—",
                                }),
                                /* @__PURE__ */ p.jsx("td", {
                                  children: /* @__PURE__ */ p.jsxs("div", {
                                    className: "row-actions",
                                    children: [
                                      /* @__PURE__ */ p.jsx("button", {
                                        className: "btn ghost",
                                        title: "Modifier",
                                        "aria-label": "Modifier",
                                        onClick: () => fe(E),
                                        children: /* @__PURE__ */ p.jsx("svg", {
                                          width: "18",
                                          height: "18",
                                          viewBox: "0 0 24 24",
                                          "aria-hidden": !0,
                                          children: /* @__PURE__ */ p.jsx(
                                            "path",
                                            {
                                              fill: "currentColor",
                                              d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z",
                                            }
                                          ),
                                        }),
                                      }),
                                      /* @__PURE__ */ p.jsx("button", {
                                        className:
                                          "btn ghost icon-btn " +
                                          (E.statusNotification === "1"
                                            ? "is-active"
                                            : "is-inactive"),
                                        title:
                                          E.statusNotification === "1"
                                            ? "Désactiver"
                                            : "Activer",
                                        "aria-label":
                                          E.statusNotification === "1"
                                            ? "Désactiver"
                                            : "Activer",
                                        onClick: () => P(E),
                                        disabled: s === E.id,
                                        children:
                                          E.statusNotification === "1"
                                            ? // déverrouillé
                                              /* @__PURE__ */ p.jsx("svg", {
                                                width: "18",
                                                height: "18",
                                                viewBox: "0 0 24 24",
                                                "aria-hidden": !0,
                                                children: /* @__PURE__ */ p.jsx(
                                                  "path",
                                                  {
                                                    fill: "currentColor",
                                                    d: "M12 17a2 2 0 100-4 2 2 0 000 4zm6-7h-1V7a5 5 0 10-10 0h2a3 3 0 116 0v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2z",
                                                  }
                                                ),
                                              })
                                            : // verrouillé
                                              /* @__PURE__ */ p.jsx("svg", {
                                                width: "18",
                                                height: "18",
                                                viewBox: "0 0 24 24",
                                                "aria-hidden": !0,
                                                children: /* @__PURE__ */ p.jsx(
                                                  "path",
                                                  {
                                                    fill: "currentColor",
                                                    d: "M12 17a2 2 0 100-4 2 2 0 000 4zm6-7h-1V7a5 5 0 10-10 0v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2zm-9-3a3 3 0 116 0v3H9V7z",
                                                  }
                                                ),
                                              }),
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            },
                            E.id
                          )
                        ),
                }),
              ],
            }),
          }),
          /* @__PURE__ */ p.jsx(co, {
            page: l,
            perPage: h,
            totalItems: te.length,
            onPageChange: d,
          }),
        ],
      }),
      m &&
        /* @__PURE__ */ p.jsx(ln, {
          title: "Ajouter une Notification" + (H ? " (chargement…)" : ""),
          onClose: ae,
          children: /* @__PURE__ */ p.jsxs("form", {
            className: "form",
            onSubmit: c,
            children: [
              /* @__PURE__ */ p.jsxs("div", {
                className: "grid",
                children: [
                  /* @__PURE__ */ p.jsxs("label", {
                    className: "full",
                    children: [
                      /* @__PURE__ */ p.jsx("span", {
                        children: "Message de Notification",
                      }),
                      /* @__PURE__ */ p.jsx("input", {
                        autoFocus: !0,
                        value: y.messageNotification,
                        onChange: (E) =>
                          C({ ...y, messageNotification: E.target.value }),
                        placeholder: "Ex: Trop de transactions en attente",
                      }),
                    ],
                  }),
                  /* @__PURE__ */ p.jsx(Et, {
                    label: "Niveau d’urgence",
                    value: y.idNiveauUrgence,
                    setValue: (E) => C({ ...y, idNiveauUrgence: E }),
                    options: L,
                    placeholder: "Sélectionner…",
                    getValue: (E) => E.id,
                    getLabel: (E) => E.vcDescription,
                  }),
                  /* @__PURE__ */ p.jsxs("label", {
                    children: [
                      /* @__PURE__ */ p.jsx("span", { children: "Type" }),
                      /* @__PURE__ */ p.jsxs("select", {
                        value: y.typeAlerte,
                        onChange: (E) =>
                          C({ ...y, typeAlerte: E.target.value }),
                        children: [
                          /* @__PURE__ */ p.jsx("option", {
                            value: "",
                            children: "Sélectionner…",
                          }),
                          /* @__PURE__ */ p.jsx("option", {
                            value: "URGENT",
                            children: "URGENT",
                          }),
                          /* @__PURE__ */ p.jsx("option", {
                            value: "INFO",
                            children: "INFO",
                          }),
                        ],
                      }),
                    ],
                  }),
                  /* @__PURE__ */ p.jsx(Et, {
                    label: "Module concerné",
                    value: y.idModule,
                    setValue: (E) => C({ ...y, idModule: E }),
                    options: q,
                    placeholder: "Sélectionner…",
                    getValue: (E) => E.id,
                    getLabel: (E) => E.vcName,
                  }),
                  /* @__PURE__ */ p.jsxs("label", {
                    children: [
                      /* @__PURE__ */ p.jsx("span", {
                        children: "Seuil pour déclencher",
                      }),
                      /* @__PURE__ */ p.jsx("input", {
                        type: "number",
                        step: "any",
                        value: y.limiteDeclenchementNotification,
                        onChange: (E) =>
                          C({
                            ...y,
                            limiteDeclenchementNotification: E.target.value,
                          }),
                        placeholder: "Ex: 5",
                      }),
                    ],
                  }),
                  /* @__PURE__ */ p.jsxs("label", {
                    className: "full",
                    children: [
                      /* @__PURE__ */ p.jsx("span", {
                        children: "Description",
                      }),
                      /* @__PURE__ */ p.jsx("textarea", {
                        rows: 3,
                        value: y.vcDescription,
                        onChange: (E) =>
                          C({ ...y, vcDescription: E.target.value }),
                        placeholder: "Contexte, impact…",
                      }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ p.jsxs("div", {
                className: "modal-actions",
                children: [
                  /* @__PURE__ */ p.jsx("button", {
                    type: "button",
                    className: "btn ghost",
                    onClick: ae,
                    children: "Annuler",
                  }),
                  /* @__PURE__ */ p.jsx("button", {
                    type: "submit",
                    className: "btn primary",
                    disabled: H,
                    children: "Créer",
                  }),
                ],
              }),
            ],
          }),
        }),
      b &&
        /* @__PURE__ */ p.jsx(ln, {
          title: "Modifier une Notification",
          onClose: me,
          children: /* @__PURE__ */ p.jsxs("form", {
            className: "form",
            onSubmit: S,
            children: [
              /* @__PURE__ */ p.jsxs("div", {
                className: "grid",
                children: [
                  /* @__PURE__ */ p.jsxs("label", {
                    className: "full",
                    children: [
                      /* @__PURE__ */ p.jsx("span", { children: "Message" }),
                      /* @__PURE__ */ p.jsx("input", {
                        autoFocus: !0,
                        value: v.messageNotification,
                        onChange: (E) =>
                          A({ ...v, messageNotification: E.target.value }),
                      }),
                    ],
                  }),
                  L?.length
                    ? /* @__PURE__ */ p.jsx(Et, {
                        label: "Niveau d’urgence",
                        value: v.idNiveauUrgence,
                        setValue: (E) => A({ ...v, idNiveauUrgence: E }),
                        options: L,
                        placeholder: "Sélectionner…",
                        getValue: (E) => E.id,
                        getLabel: (E) => E.vcDescription,
                      })
                    : /* @__PURE__ */ p.jsxs("label", {
                        children: [
                          /* @__PURE__ */ p.jsx("span", {
                            children: "Niveau d’urgence",
                          }),
                          /* @__PURE__ */ p.jsx("input", {
                            value: v.niveauDurgence,
                            onChange: (E) =>
                              A({ ...v, niveauDurgence: E.target.value }),
                          }),
                        ],
                      }),
                  /* @__PURE__ */ p.jsxs("label", {
                    children: [
                      /* @__PURE__ */ p.jsx("span", { children: "Type" }),
                      /* @__PURE__ */ p.jsxs("select", {
                        value: v.typeAlerte,
                        onChange: (E) =>
                          A({ ...v, typeAlerte: E.target.value }),
                        children: [
                          /* @__PURE__ */ p.jsx("option", {
                            value: "",
                            children: "Sélectionner…",
                          }),
                          /* @__PURE__ */ p.jsx("option", {
                            value: "URGENT",
                            children: "URGENT",
                          }),
                          /* @__PURE__ */ p.jsx("option", {
                            value: "INFO",
                            children: "INFO",
                          }),
                        ],
                      }),
                    ],
                  }),
                  q?.length
                    ? /* @__PURE__ */ p.jsx(Et, {
                        label: "Module concerné",
                        value: v.idModule,
                        setValue: (E) => A({ ...v, idModule: E }),
                        options: q,
                        placeholder: "Sélectionner…",
                        getValue: (E) => E.id,
                        getLabel: (E) => E.vcName,
                      })
                    : /* @__PURE__ */ p.jsxs("label", {
                        children: [
                          /* @__PURE__ */ p.jsx("span", {
                            children: "Module concerné",
                          }),
                          /* @__PURE__ */ p.jsx("input", {
                            value: v.moduleConcerne,
                            onChange: (E) =>
                              A({ ...v, moduleConcerne: E.target.value }),
                          }),
                        ],
                      }),
                  /* @__PURE__ */ p.jsxs("label", {
                    children: [
                      /* @__PURE__ */ p.jsx("span", { children: "Seuil" }),
                      /* @__PURE__ */ p.jsx("input", {
                        type: "number",
                        step: "any",
                        value: v.limiteDeclenchementNotification,
                        onChange: (E) =>
                          A({
                            ...v,
                            limiteDeclenchementNotification: E.target.value,
                          }),
                      }),
                    ],
                  }),
                  /* @__PURE__ */ p.jsxs("label", {
                    className: "full",
                    children: [
                      /* @__PURE__ */ p.jsx("span", {
                        children: "Description",
                      }),
                      /* @__PURE__ */ p.jsx("textarea", {
                        rows: 3,
                        value: v.vcDescription,
                        onChange: (E) =>
                          A({ ...v, vcDescription: E.target.value }),
                      }),
                    ],
                  }),
                ],
              }),
              /* @__PURE__ */ p.jsxs("div", {
                className: "modal-actions",
                children: [
                  /* @__PURE__ */ p.jsx("button", {
                    type: "button",
                    className: "btn ghost",
                    onClick: me,
                    children: "Annuler",
                  }),
                  /* @__PURE__ */ p.jsx("button", {
                    type: "submit",
                    className: "btn primary",
                    children: "Enregistrer",
                  }),
                ],
              }),
            ],
          }),
        }),
    ],
  });
}
function Et({
  label: e,
  value: t,
  setValue: r,
  options: n,
  placeholder: o = "Sélectionner…",
  getValue: a,
  getLabel: s,
}) {
  return !n || n.length === 0
    ? /* @__PURE__ */ p.jsxs("label", {
        children: [
          /* @__PURE__ */ p.jsx("span", { children: e }),
          /* @__PURE__ */ p.jsx("input", {
            value: t,
            onChange: (u) => r(u.target.value),
            placeholder: o,
          }),
        ],
      })
    : /* @__PURE__ */ p.jsxs("label", {
        children: [
          /* @__PURE__ */ p.jsx("span", { children: e }),
          /* @__PURE__ */ p.jsxs("select", {
            value: t,
            onChange: (u) => r(u.target.value),
            children: [
              /* @__PURE__ */ p.jsx("option", { value: "", children: o }),
              n.map((u) =>
                /* @__PURE__ */ p.jsx(
                  "option",
                  { value: a(u), children: s(u) },
                  a(u)
                )
              ),
            ],
          }),
        ],
      });
}
function ln({ title: e, children: t, onClose: r }) {
  const n = _.useRef(null);
  return (
    _.useEffect(() => {
      function o(a) {
        a.key === "Escape" && r();
      }
      return (
        document.addEventListener("keydown", o),
        () => document.removeEventListener("keydown", o)
      );
    }, [r]),
    _.useEffect(() => {
      n.current?.querySelector("input,select,textarea,button")?.focus();
    }, []),
    /* @__PURE__ */ p.jsx("div", {
      className: "modal-overlay",
      role: "dialog",
      "aria-modal": "true",
      children: /* @__PURE__ */ p.jsxs("div", {
        className: "modal",
        ref: n,
        children: [
          /* @__PURE__ */ p.jsxs("div", {
            className: "modal-h",
            children: [
              /* @__PURE__ */ p.jsx("h3", { children: e }),
              /* @__PURE__ */ p.jsx("button", {
                className: "icon",
                "aria-label": "Fermer",
                onClick: r,
                children: "✕",
              }),
            ],
          }),
          /* @__PURE__ */ p.jsx("div", { className: "modal-c", children: t }),
        ],
      }),
    })
  );
}
function cn() {
  return {
    messageNotification: "",
    idNiveauUrgence: "",
    typeAlerte: "",
    // ⚠️ pour ADD on envoie typeAlerte
    vcDescription: "",
    limiteDeclenchementNotification: "",
    idModule: "",
  };
}
function Al() {
  return {
    id: "",
    statusNotification: "1",
    messageNotification: "",
    idNiveauUrgence: "",
    idModule: "",
    niveauDurgence: "",
    // fallback label
    moduleConcerne: "",
    // fallback label
    typeAlerte: "",
    vcDescription: "",
    limiteDeclenchementNotification: "",
  };
}
function Ol(e) {
  const t = [];
  return (
    e.messageNotification.trim() || t.push("Le message est requis"),
    e.idNiveauUrgence || t.push("Le niveau d’urgence est requis"),
    e.typeAlerte || t.push("Le type est requis"),
    e.idModule || t.push("Le module est requis"),
    t
  );
}
function Nl(e) {
  const t = [];
  return (
    e.messageNotification.trim() || t.push("Le message est requis"),
    e.idNiveauUrgence || t.push("Le niveau d’urgence (ID) est requis"),
    e.typeAlerte || t.push("Le type est requis"),
    t
  );
}
const jl = (e) => oe.createElement(Cn, null, oe.createElement(gl, e)),
  kl = (e) => oe.createElement(Cn, null, oe.createElement(Cl, e)),
  Ll = pn(jl, oe, fn, {
    shadow: !1,
    // Évite les problèmes de CSS
  }),
  Pl = pn(kl, oe, fn, {
    shadow: !1,
  });
customElements.define("alerte-notification", Ll);
customElements.define("notification-component", Pl);
console.log(
  "Web Components chargés: alerte-notification, notification-component"
);
