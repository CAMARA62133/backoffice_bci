(function (We) {
  typeof define == "function" && define.amd ? define(We) : We();
})(function () {
  "use strict";
  function We(e) {
    return e &&
      e.__esModule &&
      Object.prototype.hasOwnProperty.call(e, "default")
      ? e.default
      : e;
  }
  var ft = { exports: {} },
    W = {};
  /**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var gr;
  function fo() {
    if (gr) return W;
    gr = 1;
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
    function ne(c) {
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
              (ne(k) &&
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
    var he =
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
      ye = {
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
          if (!ne(c))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return c;
        },
      };
    return (
      (W.Activity = h),
      (W.Children = ye),
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
          (c.Consumer = { $$typeof: a, _context: c }),
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
      (W.isValidElement = ne),
      (W.lazy = function (c) {
        return {
          $$typeof: d,
          _payload: { _status: -1, _result: c },
          _init: ae,
        };
      }),
      (W.memo = function (c, S) {
        return { $$typeof: l, type: c, compare: S === void 0 ? null : S };
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
              E.then(q, he);
        } catch (g) {
          he(g);
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
  var Ye = { exports: {} };
  /**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ Ye.exports;
  var vr;
  function po() {
    return (
      vr ||
        ((vr = 1),
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
                  : ((i = (we && i[we]) || i["@@iterator"]),
                    typeof i == "function" ? i : null);
              }
              function o(i, w) {
                i =
                  ((i = i.constructor) && (i.displayName || i.name)) ||
                  "ReactClass";
                var N = i + "." + w;
                Ue[N] ||
                  (console.error(
                    "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
                    w,
                    i
                  ),
                  (Ue[N] = !0));
              }
              function a(i, w, N) {
                (this.props = i),
                  (this.context = w),
                  (this.refs = mr),
                  (this.updater = N || Qn);
              }
              function s() {}
              function u(i, w, N) {
                (this.props = i),
                  (this.context = w),
                  (this.refs = mr),
                  (this.updater = N || Qn);
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
                    I =
                      (typeof Symbol == "function" &&
                        Symbol.toStringTag &&
                        i[Symbol.toStringTag]) ||
                      i.constructor.name ||
                      "Object";
                  return (
                    N.call(
                      w,
                      "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
                      I
                    ),
                    l(i)
                  );
                }
              }
              function h(i) {
                if (i == null) return null;
                if (typeof i == "function")
                  return i.$$typeof === xl
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
                  case oe:
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
                    case ye:
                      return "Portal";
                    case k:
                      return i.displayName || "Context";
                    case E:
                      return (
                        (i._context.displayName || "Context") + ".Consumer"
                      );
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
                if (Ut.call(i, "key")) {
                  var w = Object.getOwnPropertyDescriptor(i, "key").get;
                  if (w && w.isReactWarning) return !1;
                }
                return i.key !== void 0;
              }
              function y(i, w) {
                function N() {
                  ro ||
                    ((ro = !0),
                    console.error(
                      "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
                      w
                    ));
                }
                (N.isReactWarning = !0),
                  Object.defineProperty(i, "key", { get: N, configurable: !0 });
              }
              function C() {
                var i = h(this.type);
                return (
                  oo[i] ||
                    ((oo[i] = !0),
                    console.error(
                      "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
                    )),
                  (i = this.props.ref),
                  i !== void 0 ? i : null
                );
              }
              function v(i, w, N, I, B, Q) {
                var G = N.ref;
                return (
                  (i = { $$typeof: he, type: i, key: w, props: N, _owner: I }),
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
                    value: Q,
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
                return typeof i == "object" && i !== null && i.$$typeof === he;
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
              function z(i, w, N, I, B) {
                var Q = typeof i;
                (Q === "undefined" || Q === "boolean") && (i = null);
                var G = !1;
                if (i === null) G = !0;
                else
                  switch (Q) {
                    case "bigint":
                    case "string":
                    case "number":
                      G = !0;
                      break;
                    case "object":
                      switch (i.$$typeof) {
                        case he:
                        case ye:
                          G = !0;
                          break;
                        case F:
                          return (G = i._init), z(G(i._payload), w, N, I, B);
                      }
                  }
                if (G) {
                  (G = i), (B = B(G));
                  var ie = I === "" ? "." + j(G, 0) : I;
                  return (
                    eo(B)
                      ? ((N = ""),
                        ie != null && (N = ie.replace(so, "$&/") + "/"),
                        z(B, w, N, "", function (je) {
                          return je;
                        }))
                      : B != null &&
                        ($(B) &&
                          (B.key != null &&
                            ((G && G.key === B.key) || d(B.key)),
                          (N = A(
                            B,
                            N +
                              (B.key == null || (G && G.key === B.key)
                                ? ""
                                : ("" + B.key).replace(so, "$&/") + "/") +
                              ie
                          )),
                          I !== "" &&
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
                if (((G = 0), (ie = I === "" ? "." : I + ":"), eo(i)))
                  for (var Z = 0; Z < i.length; Z++)
                    (I = i[Z]), (Q = ie + j(I, Z)), (G += z(I, w, N, Q, B));
                else if (((Z = n(i)), typeof Z == "function"))
                  for (
                    Z === i.entries &&
                      (ao ||
                        console.warn(
                          "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
                        ),
                      (ao = !0)),
                      i = Z.call(i),
                      Z = 0;
                    !(I = i.next()).done;

                  )
                    (I = I.value),
                      (Q = ie + j(I, Z++)),
                      (G += z(I, w, N, Q, B));
                else if (Q === "object") {
                  if (typeof i.then == "function") return z(H(i), w, N, I, B);
                  throw (
                    ((w = String(i)),
                    Error(
                      "Objects are not valid as a React child (found: " +
                        (w === "[object Object]"
                          ? "object with keys {" +
                            Object.keys(i).join(", ") +
                            "}"
                          : w) +
                        "). If you meant to render a collection of children, use an array instead."
                    ))
                  );
                }
                return G;
              }
              function ee(i, w, N) {
                if (i == null) return i;
                var I = [],
                  B = 0;
                return (
                  z(i, I, "", "", function (Q) {
                    return w.call(N, Q, B++);
                  }),
                  I
                );
              }
              function ne(i) {
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
                          var Q = i._ioInfo;
                          Q != null && (Q.end = performance.now()),
                            N.status === void 0 &&
                              ((N.status = "fulfilled"), (N.value = B));
                        }
                      },
                      function (B) {
                        if (i._status === 0 || i._status === -1) {
                          (i._status = 2), (i._result = B);
                          var Q = i._ioInfo;
                          Q != null && (Q.end = performance.now()),
                            N.status === void 0 &&
                              ((N.status = "rejected"), (N.reason = B));
                        }
                      }
                    ),
                    (w = i._ioInfo),
                    w != null)
                  ) {
                    w.value = N;
                    var I = N.displayName;
                    typeof I == "string" && (w.name = I);
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
                    console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`),
                  i
                );
              }
              function se() {
                J.asyncTransitions--;
              }
              function te(i) {
                if (Ft === null)
                  try {
                    var w = ("require" + Math.random()).slice(0, 7);
                    Ft = (e && e[w]).call(e, "timers").setImmediate;
                  } catch {
                    Ft = function (I) {
                      lo === !1 &&
                        ((lo = !0),
                        typeof MessageChannel > "u" &&
                          console.error(
                            "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
                          ));
                      var B = new MessageChannel();
                      (B.port1.onmessage = I), B.port2.postMessage(void 0);
                    };
                  }
                return Ft(i);
              }
              function le(i) {
                return 1 < i.length && typeof AggregateError == "function"
                  ? new AggregateError(i)
                  : i[0];
              }
              function K(i, w) {
                w !== Bt - 1 &&
                  console.error(
                    "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
                  ),
                  (Bt = w);
              }
              function ce(i, w, N) {
                var I = J.actQueue;
                if (I !== null)
                  if (I.length !== 0)
                    try {
                      ae(I),
                        te(function () {
                          return ce(i, w, N);
                        });
                      return;
                    } catch (B) {
                      J.thrownErrors.push(B);
                    }
                  else J.actQueue = null;
                0 < J.thrownErrors.length
                  ? ((I = le(J.thrownErrors)),
                    (J.thrownErrors.length = 0),
                    N(I))
                  : w(i);
              }
              function ae(i) {
                if (!yr) {
                  yr = !0;
                  var w = 0;
                  try {
                    for (; w < i.length; w++) {
                      var N = i[w];
                      do {
                        J.didUsePromise = !1;
                        var I = N(!1);
                        if (I !== null) {
                          if (J.didUsePromise) {
                            (i[w] = N), i.splice(0, w);
                            return;
                          }
                          N = I;
                        } else break;
                      } while (!0);
                    }
                    i.length = 0;
                  } catch (B) {
                    i.splice(0, w + 1), J.thrownErrors.push(B);
                  } finally {
                    yr = !1;
                  }
                }
              }
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
                typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ==
                  "function" &&
                __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(
                  Error()
                );
              var he = Symbol.for("react.transitional.element"),
                ye = Symbol.for("react.portal"),
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
                oe = Symbol.for("react.activity"),
                we = Symbol.iterator,
                Ue = {},
                Qn = {
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
                Zn = Object.assign,
                mr = {};
              Object.freeze(mr),
                (a.prototype.isReactComponent = {}),
                (a.prototype.setState = function (i, w) {
                  if (
                    typeof i != "object" &&
                    typeof i != "function" &&
                    i != null
                  )
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
              for (ut in _e) _e.hasOwnProperty(ut) && r(ut, _e[ut]);
              (s.prototype = a.prototype),
                (_e = u.prototype = new s()),
                (_e.constructor = u),
                Zn(_e, a.prototype),
                (_e.isPureReactComponent = !0);
              var eo = Array.isArray,
                xl = Symbol.for("react.client.reference"),
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
                Ut = Object.prototype.hasOwnProperty,
                to = console.createTask
                  ? console.createTask
                  : function () {
                      return null;
                    };
              _e = {
                react_stack_bottom_frame: function (i) {
                  return i();
                },
              };
              var ro,
                no,
                oo = {},
                Rl = _e.react_stack_bottom_frame.bind(_e, b)(),
                Sl = to(m(b)),
                ao = !1,
                so = /\/+/g,
                io =
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
                lo = !1,
                Ft = null,
                Bt = 0,
                Ht = !1,
                yr = !1,
                co =
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
              var ut = {
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
              (t.Activity = oe),
                (t.Children = ut),
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
                    N = Bt;
                  Bt++;
                  var I = (J.actQueue = w !== null ? w : []),
                    B = !1;
                  try {
                    var Q = i();
                  } catch (Z) {
                    J.thrownErrors.push(Z);
                  }
                  if (0 < J.thrownErrors.length)
                    throw (
                      (K(w, N),
                      (i = le(J.thrownErrors)),
                      (J.thrownErrors.length = 0),
                      i)
                    );
                  if (
                    Q !== null &&
                    typeof Q == "object" &&
                    typeof Q.then == "function"
                  ) {
                    var G = Q;
                    return (
                      co(function () {
                        B ||
                          Ht ||
                          ((Ht = !0),
                          console.error(
                            "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
                          ));
                      }),
                      {
                        then: function (Z, je) {
                          (B = !0),
                            G.then(
                              function (Ve) {
                                if ((K(w, N), N === 0)) {
                                  try {
                                    ae(I),
                                      te(function () {
                                        return ce(Ve, Z, je);
                                      });
                                  } catch (Al) {
                                    J.thrownErrors.push(Al);
                                  }
                                  if (0 < J.thrownErrors.length) {
                                    var Cl = le(J.thrownErrors);
                                    (J.thrownErrors.length = 0), je(Cl);
                                  }
                                } else Z(Ve);
                              },
                              function (Ve) {
                                K(w, N),
                                  0 < J.thrownErrors.length &&
                                    ((Ve = le(J.thrownErrors)),
                                    (J.thrownErrors.length = 0)),
                                  je(Ve);
                              }
                            );
                        },
                      }
                    );
                  }
                  var ie = Q;
                  if (
                    (K(w, N),
                    N === 0 &&
                      (ae(I),
                      I.length !== 0 &&
                        co(function () {
                          B ||
                            Ht ||
                            ((Ht = !0),
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
                    then: function (Z, je) {
                      (B = !0),
                        N === 0
                          ? ((J.actQueue = I),
                            te(function () {
                              return ce(ie, Z, je);
                            }))
                          : Z(ie);
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
                  var I = Zn({}, i.props),
                    B = i.key,
                    Q = i._owner;
                  if (w != null) {
                    var G;
                    e: {
                      if (
                        Ut.call(w, "ref") &&
                        (G = Object.getOwnPropertyDescriptor(w, "ref").get) &&
                        G.isReactWarning
                      ) {
                        G = !1;
                        break e;
                      }
                      G = w.ref !== void 0;
                    }
                    G && (Q = T()), R(w) && (d(w.key), (B = "" + w.key));
                    for (ie in w)
                      !Ut.call(w, ie) ||
                        ie === "key" ||
                        ie === "__self" ||
                        ie === "__source" ||
                        (ie === "ref" && w.ref === void 0) ||
                        (I[ie] = w[ie]);
                  }
                  var ie = arguments.length - 2;
                  if (ie === 1) I.children = N;
                  else if (1 < ie) {
                    G = Array(ie);
                    for (var Z = 0; Z < ie; Z++) G[Z] = arguments[Z + 2];
                    I.children = G;
                  }
                  for (
                    I = v(i.type, B, I, Q, i._debugStack, i._debugTask), B = 2;
                    B < arguments.length;
                    B++
                  )
                    L(arguments[B]);
                  return I;
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
                    (i.Consumer = { $$typeof: E, _context: i }),
                    (i._currentRenderer = null),
                    (i._currentRenderer2 = null),
                    i
                  );
                }),
                (t.createElement = function (i, w, N) {
                  for (var I = 2; I < arguments.length; I++) L(arguments[I]);
                  I = {};
                  var B = null;
                  if (w != null)
                    for (Z in (no ||
                      !("__self" in w) ||
                      "key" in w ||
                      ((no = !0),
                      console.warn(
                        "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
                      )),
                    R(w) && (d(w.key), (B = "" + w.key)),
                    w))
                      Ut.call(w, Z) &&
                        Z !== "key" &&
                        Z !== "__self" &&
                        Z !== "__source" &&
                        (I[Z] = w[Z]);
                  var Q = arguments.length - 2;
                  if (Q === 1) I.children = N;
                  else if (1 < Q) {
                    for (var G = Array(Q), ie = 0; ie < Q; ie++)
                      G[ie] = arguments[ie + 2];
                    Object.freeze && Object.freeze(G), (I.children = G);
                  }
                  if (i && i.defaultProps)
                    for (Z in ((Q = i.defaultProps), Q))
                      I[Z] === void 0 && (I[Z] = Q[Z]);
                  B &&
                    y(
                      I,
                      typeof i == "function"
                        ? i.displayName || i.name || "Unknown"
                        : i
                    );
                  var Z = 1e4 > J.recentlyCreatedOwnerStacks++;
                  return v(
                    i,
                    B,
                    I,
                    T(),
                    Z ? Error("react-stack-top-frame") : Rl,
                    Z ? to(m(i)) : Sl
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
                      set: function (I) {
                        (N = I),
                          i.name ||
                            i.displayName ||
                            (Object.defineProperty(i, "name", { value: I }),
                            (i.displayName = I));
                      },
                    }),
                    w
                  );
                }),
                (t.isValidElement = $),
                (t.lazy = function (i) {
                  i = { _status: -1, _result: i };
                  var w = { $$typeof: F, _payload: i, _init: ne },
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
                      set: function (I) {
                        (N = I),
                          i.name ||
                            i.displayName ||
                            (Object.defineProperty(i, "name", { value: I }),
                            (i.displayName = I));
                      },
                    }),
                    w
                  );
                }),
                (t.startTransition = function (i) {
                  var w = J.T,
                    N = {};
                  (N._updatedFibers = new Set()), (J.T = N);
                  try {
                    var I = i(),
                      B = J.S;
                    B !== null && B(N, I),
                      typeof I == "object" &&
                        I !== null &&
                        typeof I.then == "function" &&
                        (J.asyncTransitions++, I.then(se, se), I.then(f, io));
                  } catch (Q) {
                    io(Q);
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
        })(Ye, Ye.exports)),
      Ye.exports
    );
  }
  var br;
  function dt() {
    return (
      br ||
        ((br = 1),
        process.env.NODE_ENV === "production"
          ? (ft.exports = fo())
          : (ft.exports = po())),
      ft.exports
    );
  }
  var _ = dt();
  const re = We(_);
  var pt = { exports: {} },
    fe = {};
  /**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var _r;
  function ho() {
    if (_r) return fe;
    _r = 1;
    var e = dt();
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
      (fe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = n),
      (fe.createPortal = function (f, l) {
        var d =
          2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!l || (l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11))
          throw Error(t(299));
        return a(f, l, null, d);
      }),
      (fe.flushSync = function (f) {
        var l = s.T,
          d = n.p;
        try {
          if (((s.T = null), (n.p = 2), f)) return f();
        } finally {
          (s.T = l), (n.p = d), n.d.f();
        }
      }),
      (fe.preconnect = function (f, l) {
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
      (fe.prefetchDNS = function (f) {
        typeof f == "string" && n.d.D(f);
      }),
      (fe.preinit = function (f, l) {
        if (typeof f == "string" && l && typeof l.as == "string") {
          var d = l.as,
            h = u(d, l.crossOrigin),
            m = typeof l.integrity == "string" ? l.integrity : void 0,
            T = typeof l.fetchPriority == "string" ? l.fetchPriority : void 0;
          d === "style"
            ? n.d.S(
                f,
                typeof l.precedence == "string" ? l.precedence : void 0,
                { crossOrigin: h, integrity: m, fetchPriority: T }
              )
            : d === "script" &&
              n.d.X(f, {
                crossOrigin: h,
                integrity: m,
                fetchPriority: T,
                nonce: typeof l.nonce == "string" ? l.nonce : void 0,
              });
        }
      }),
      (fe.preinitModule = function (f, l) {
        if (typeof f == "string")
          if (typeof l == "object" && l !== null) {
            if (l.as == null || l.as === "script") {
              var d = u(l.as, l.crossOrigin);
              n.d.M(f, {
                crossOrigin: d,
                integrity:
                  typeof l.integrity == "string" ? l.integrity : void 0,
                nonce: typeof l.nonce == "string" ? l.nonce : void 0,
              });
            }
          } else l == null && n.d.M(f);
      }),
      (fe.preload = function (f, l) {
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
      (fe.preloadModule = function (f, l) {
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
      (fe.requestFormReset = function (f) {
        n.d.r(f);
      }),
      (fe.unstable_batchedUpdates = function (f, l) {
        return f(l);
      }),
      (fe.useFormState = function (f, l, d) {
        return s.H.useFormState(f, l, d);
      }),
      (fe.useFormStatus = function () {
        return s.H.useHostTransitionStatus();
      }),
      (fe.version = "19.2.0"),
      fe
    );
  }
  var de = {};
  /**
   * @license React
   * react-dom.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Er;
  function mo() {
    return (
      Er ||
        ((Er = 1),
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
                  console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`),
                h
              );
            }
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ==
                "function" &&
              __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(
                Error()
              );
            var u = dt(),
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
              (de.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE =
                f),
              (de.createPortal = function (h, m) {
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
              (de.flushSync = function (h) {
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
              (de.preconnect = function (h, m) {
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
              (de.prefetchDNS = function (h) {
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
              (de.preinit = function (h, m) {
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
                        { crossOrigin: b, integrity: R, fetchPriority: y }
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
              (de.preinitModule = function (h, m) {
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
                      (T +=
                        " The `as` option encountered was " + a(m.as) + "."),
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
              (de.preload = function (h, m) {
                var T = "";
                if (
                  ((typeof h == "string" && h) ||
                    (T += " The `href` argument encountered was " + o(h) + "."),
                  m == null || typeof m != "object"
                    ? (T +=
                        " The `options` argument encountered was " + o(m) + ".")
                    : (typeof m.as == "string" && m.as) ||
                      (T +=
                        " The `as` option encountered was " + o(m.as) + "."),
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
              (de.preloadModule = function (h, m) {
                var T = "";
                (typeof h == "string" && h) ||
                  (T += " The `href` argument encountered was " + o(h) + "."),
                  m !== void 0 && typeof m != "object"
                    ? (T +=
                        " The `options` argument encountered was " + o(m) + ".")
                    : m &&
                      "as" in m &&
                      typeof m.as != "string" &&
                      (T +=
                        " The `as` option encountered was " + o(m.as) + "."),
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
                            typeof m.integrity == "string"
                              ? m.integrity
                              : void 0,
                        }))
                      : f.d.m(h));
              }),
              (de.requestFormReset = function (h) {
                f.d.r(h);
              }),
              (de.unstable_batchedUpdates = function (h, m) {
                return h(m);
              }),
              (de.useFormState = function (h, m, T) {
                return s().useFormState(h, m, T);
              }),
              (de.useFormStatus = function () {
                return s().useHostTransitionStatus();
              }),
              (de.version = "19.2.0"),
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
                typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ==
                  "function" &&
                __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(
                  Error()
                );
          })()),
      de
    );
  }
  var wr;
  function yo() {
    if (wr) return pt.exports;
    wr = 1;
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
        ? (e(), (pt.exports = ho()))
        : (pt.exports = mo()),
      pt.exports
    );
  }
  var go = yo();
  const Tr = We(go);
  var vo = Object.defineProperty,
    bo = (e, t, r) =>
      t in e
        ? vo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
        : (e[t] = r),
    ht = (e, t, r) => bo(e, typeof t != "symbol" ? t + "" : t, r);
  const _o = {
      stringify: (e) => (e ? "true" : "false"),
      parse: (e) => /^[ty1-9]/i.test(e),
    },
    Eo = {
      stringify: (e) => e.name,
      parse: (e, t, r) => {
        const n = (() => {
          if (typeof window < "u" && e in window) return window[e];
          if (typeof global < "u" && e in global) return global[e];
        })();
        return typeof n == "function" ? n.bind(r) : void 0;
      },
    },
    wo = { stringify: (e) => JSON.stringify(e), parse: (e) => JSON.parse(e) };
  function To(e) {
    return e.replace(
      /([a-z0-9])([A-Z])/g,
      (t, r, n) => `${r}-${n.toLowerCase()}`
    );
  }
  function xr(e) {
    return e.replace(/[-:]([a-z])/g, (t, r) => `${r.toUpperCase()}`);
  }
  const xo = {
      stringify: (e) => e.name,
      parse: (e, t, r) => {
        const n = (() => {
          const o = xr(t);
          if (typeof r < "u" && o in r.container) return r.container[o];
        })();
        return typeof n == "function" ? n.bind(r) : void 0;
      },
    },
    Ro = { stringify: (e) => `${e}`, parse: (e) => parseFloat(e) },
    So = { stringify: (e) => e, parse: (e) => e },
    zt = {
      string: So,
      number: Ro,
      boolean: _o,
      function: Eo,
      method: xo,
      json: wo,
    },
    Ge = Symbol.for("r2wc.render"),
    mt = Symbol.for("r2wc.connected"),
    ke = Symbol.for("r2wc.context"),
    be = Symbol.for("r2wc.props");
  function Co(e, t, r) {
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
      const b = To(T);
      (d[T] = b), (h[b] = T);
    }
    for (const T of u) l[T] = Array.isArray(t.events) ? {} : t.events[T];
    class m extends HTMLElement {
      constructor() {
        super(),
          ht(this, a, !0),
          ht(this, o),
          ht(this, n, {}),
          ht(this, "container"),
          t.shadow
            ? (this.container = this.attachShadow({ mode: t.shadow }))
            : (this.container = this),
          (this[be].container = this.container);
        for (const b of s) {
          const R = d[b],
            y = this.getAttribute(R),
            C = f[b],
            v = C ? zt[C] : null;
          if (C === "method") {
            const A = xr(R);
            Object.defineProperty(this[be].container, A, {
              enumerable: !0,
              configurable: !0,
              get() {
                return this[be][A];
              },
              set(L) {
                (this[be][A] = L), this[Ge]();
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
        (this[mt] = !0), this[Ge]();
      }
      disconnectedCallback() {
        (this[mt] = !1), this[ke] && r.unmount(this[ke]), delete this[ke];
      }
      attributeChangedCallback(b, R, y) {
        const C = h[b],
          v = f[C],
          A = v ? zt[v] : null;
        C in f &&
          A != null &&
          A.parse &&
          y &&
          ((this[be][C] = A.parse(y, b, this)), this[Ge]());
      }
      [((a = mt), (o = ke), (n = be), Ge)]() {
        this[mt] &&
          (this[ke]
            ? r.update(this[ke], this[be])
            : (this[ke] = r.mount(this.container, e, this[be])));
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
          const C = R ? zt[R] : null;
          if (C != null && C.stringify) {
            const v = C.stringify(y, b, this);
            this.getAttribute(b) !== v && this.setAttribute(b, v);
          } else this[Ge]();
        },
      });
    }
    return m;
  }
  function Rr(e, t, r, n = {}) {
    function o(u, f, l) {
      const d = t.createElement(f, l);
      if ("createRoot" in r) {
        const h = r.createRoot(u);
        return h.render(d), { container: u, root: h, ReactComponent: f };
      }
      if ("render" in r)
        return r.render(d, u), { container: u, ReactComponent: f };
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
    return Co(e, n, { mount: o, unmount: s, update: a });
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
   */ var Sr = "popstate";
  function Ao(e = {}) {
    function t(n, o) {
      let { pathname: a, search: s, hash: u } = n.location;
      return qt(
        "",
        { pathname: a, search: s, hash: u },
        (o.state && o.state.usr) || null,
        (o.state && o.state.key) || "default"
      );
    }
    function r(n, o) {
      return typeof o == "string" ? o : Ke(o);
    }
    return No(t, r, null, e);
  }
  function ue(e, t) {
    if (e === !1 || e === null || typeof e > "u") throw new Error(t);
  }
  function Te(e, t) {
    if (!e) {
      typeof console < "u" && console.warn(t);
      try {
        throw new Error(t);
      } catch {}
    }
  }
  function Oo() {
    return Math.random().toString(36).substring(2, 10);
  }
  function Cr(e, t) {
    return { usr: e.state, key: e.key, idx: t };
  }
  function qt(e, t, r = null, n) {
    return {
      pathname: typeof e == "string" ? e : e.pathname,
      search: "",
      hash: "",
      ...(typeof t == "string" ? Je(t) : t),
      state: r,
      key: (t && t.key) || n || Oo(),
    };
  }
  function Ke({ pathname: e = "/", search: t = "", hash: r = "" }) {
    return (
      t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t),
      r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r),
      e
    );
  }
  function Je(e) {
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
  function No(e, t, r, n = {}) {
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
      let v = qt(R.location, y, C);
      l = d() + 1;
      let A = Cr(v, l),
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
      let v = qt(R.location, y, C);
      l = d();
      let A = Cr(v, l),
        L = R.createHref(v);
      s.replaceState(A, "", L),
        a && f && f({ action: u, location: R.location, delta: 0 });
    }
    function b(y) {
      return jo(y);
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
          o.addEventListener(Sr, h),
          (f = y),
          () => {
            o.removeEventListener(Sr, h), (f = null);
          }
        );
      },
      createHref(y) {
        return t(o, y);
      },
      createURL: b,
      encodeLocation(y) {
        let C = b(y);
        return { pathname: C.pathname, search: C.search, hash: C.hash };
      },
      push: m,
      replace: T,
      go(y) {
        return s.go(y);
      },
    };
    return R;
  }
  function jo(e, t = !1) {
    let r = "http://localhost";
    typeof window < "u" &&
      (r =
        window.location.origin !== "null"
          ? window.location.origin
          : window.location.href),
      ue(r, "No window.location.(origin|href) available to create URL");
    let n = typeof e == "string" ? e : Ke(e);
    return (
      (n = n.replace(/ $/, "%20")),
      !t && n.startsWith("//") && (n = r + n),
      new URL(n, r)
    );
  }
  function Ar(e, t, r = "/") {
    return ko(e, t, r, !1);
  }
  function ko(e, t, r, n) {
    let o = typeof t == "string" ? Je(t) : t,
      a = Ce(o.pathname || "/", r);
    if (a == null) return null;
    let s = Or(e);
    Lo(s);
    let u = null;
    for (let f = 0; u == null && f < s.length; ++f) {
      let l = qo(a);
      u = Ho(s[f], l, n);
    }
    return u;
  }
  function Or(e, t = [], r = [], n = "", o = !1) {
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
      let h = Ae([n, d.relativePath]),
        m = r.concat(d);
      s.children &&
        s.children.length > 0 &&
        (ue(
          s.index !== !0,
          `Index routes must not have child routes. Please remove all child routes from route path "${h}".`
        ),
        Or(s.children, t, m, h, f)),
        !(s.path == null && !s.index) &&
          t.push({ path: h, score: Fo(h, s.index), routesMeta: m });
    };
    return (
      e.forEach((s, u) => {
        if (s.path === "" || !s.path?.includes("?")) a(s, u);
        else for (let f of Nr(s.path)) a(s, u, !0, f);
      }),
      t
    );
  }
  function Nr(e) {
    let t = e.split("/");
    if (t.length === 0) return [];
    let [r, ...n] = t,
      o = r.endsWith("?"),
      a = r.replace(/\?$/, "");
    if (n.length === 0) return o ? [a, ""] : [a];
    let s = Nr(n.join("/")),
      u = [];
    return (
      u.push(...s.map((f) => (f === "" ? a : [a, f].join("/")))),
      o && u.push(...s),
      u.map((f) => (e.startsWith("/") && f === "" ? "/" : f))
    );
  }
  function Lo(e) {
    e.sort((t, r) =>
      t.score !== r.score
        ? r.score - t.score
        : Bo(
            t.routesMeta.map((n) => n.childrenIndex),
            r.routesMeta.map((n) => n.childrenIndex)
          )
    );
  }
  var Po = /^:[\w-]+$/,
    Do = 3,
    Io = 2,
    Mo = 1,
    $o = 10,
    Uo = -2,
    jr = (e) => e === "*";
  function Fo(e, t) {
    let r = e.split("/"),
      n = r.length;
    return (
      r.some(jr) && (n += Uo),
      t && (n += Io),
      r
        .filter((o) => !jr(o))
        .reduce((o, a) => o + (Po.test(a) ? Do : a === "" ? Mo : $o), n)
    );
  }
  function Bo(e, t) {
    return e.length === t.length && e.slice(0, -1).every((n, o) => n === t[o])
      ? e[e.length - 1] - t[t.length - 1]
      : 0;
  }
  function Ho(e, t, r = !1) {
    let { routesMeta: n } = e,
      o = {},
      a = "/",
      s = [];
    for (let u = 0; u < n.length; ++u) {
      let f = n[u],
        l = u === n.length - 1,
        d = a === "/" ? t : t.slice(a.length) || "/",
        h = yt(
          { path: f.relativePath, caseSensitive: f.caseSensitive, end: l },
          d
        ),
        m = f.route;
      if (
        (!h &&
          l &&
          r &&
          !n[n.length - 1].route.index &&
          (h = yt(
            { path: f.relativePath, caseSensitive: f.caseSensitive, end: !1 },
            d
          )),
        !h)
      )
        return null;
      Object.assign(o, h.params),
        s.push({
          params: o,
          pathname: Ae([a, h.pathname]),
          pathnameBase: Go(Ae([a, h.pathnameBase])),
          route: m,
        }),
        h.pathnameBase !== "/" && (a = Ae([a, h.pathnameBase]));
    }
    return s;
  }
  function yt(e, t) {
    typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
    let [r, n] = zo(e.path, e.caseSensitive, e.end),
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
  function zo(e, t = !1, r = !0) {
    Te(
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
  function qo(e) {
    try {
      return e
        .split("/")
        .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
        .join("/");
    } catch (t) {
      return (
        Te(
          !1,
          `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`
        ),
        e
      );
    }
  }
  function Ce(e, t) {
    if (t === "/") return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
    let r = t.endsWith("/") ? t.length - 1 : t.length,
      n = e.charAt(r);
    return n && n !== "/" ? null : e.slice(r) || "/";
  }
  function Vo(e, t = "/") {
    let {
      pathname: r,
      search: n = "",
      hash: o = "",
    } = typeof e == "string" ? Je(e) : e;
    return {
      pathname: r ? (r.startsWith("/") ? r : Wo(r, t)) : t,
      search: Ko(n),
      hash: Jo(o),
    };
  }
  function Wo(e, t) {
    let r = t.replace(/\/+$/, "").split("/");
    return (
      e.split("/").forEach((o) => {
        o === ".." ? r.length > 1 && r.pop() : o !== "." && r.push(o);
      }),
      r.length > 1 ? r.join("/") : "/"
    );
  }
  function Vt(e, t, r, n) {
    return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
  }
  function Yo(e) {
    return e.filter(
      (t, r) => r === 0 || (t.route.path && t.route.path.length > 0)
    );
  }
  function kr(e) {
    let t = Yo(e);
    return t.map((r, n) => (n === t.length - 1 ? r.pathname : r.pathnameBase));
  }
  function Lr(e, t, r, n = !1) {
    let o;
    typeof e == "string"
      ? (o = Je(e))
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
    let f = Vo(o, u),
      l = s && s !== "/" && s.endsWith("/"),
      d = (a || s === ".") && r.endsWith("/");
    return !f.pathname.endsWith("/") && (l || d) && (f.pathname += "/"), f;
  }
  var Ae = (e) => e.join("/").replace(/\/\/+/g, "/"),
    Go = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
    Ko = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
    Jo = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
  function Xo(e) {
    return (
      e != null &&
      typeof e.status == "number" &&
      typeof e.statusText == "string" &&
      typeof e.internal == "boolean" &&
      "data" in e
    );
  }
  var Pr = ["POST", "PUT", "PATCH", "DELETE"];
  new Set(Pr);
  var Qo = ["GET", ...Pr];
  new Set(Qo);
  var Fe = _.createContext(null);
  Fe.displayName = "DataRouter";
  var gt = _.createContext(null);
  (gt.displayName = "DataRouterState"), _.createContext(!1);
  var Dr = _.createContext({ isTransitioning: !1 });
  Dr.displayName = "ViewTransition";
  var Zo = _.createContext(new Map());
  Zo.displayName = "Fetchers";
  var ea = _.createContext(null);
  ea.displayName = "Await";
  var xe = _.createContext(null);
  xe.displayName = "Navigation";
  var vt = _.createContext(null);
  vt.displayName = "Location";
  var Oe = _.createContext({ outlet: null, matches: [], isDataRoute: !1 });
  Oe.displayName = "Route";
  var Wt = _.createContext(null);
  Wt.displayName = "RouteError";
  function ta(e, { relative: t } = {}) {
    ue(
      Xe(),
      "useHref() may be used only in the context of a <Router> component."
    );
    let { basename: r, navigator: n } = _.useContext(xe),
      { hash: o, pathname: a, search: s } = Qe(e, { relative: t }),
      u = a;
    return (
      r !== "/" && (u = a === "/" ? r : Ae([r, a])),
      n.createHref({ pathname: u, search: s, hash: o })
    );
  }
  function Xe() {
    return _.useContext(vt) != null;
  }
  function Le() {
    return (
      ue(
        Xe(),
        "useLocation() may be used only in the context of a <Router> component."
      ),
      _.useContext(vt).location
    );
  }
  var Ir =
    "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
  function Mr(e) {
    _.useContext(xe).static || _.useLayoutEffect(e);
  }
  function Yt() {
    let { isDataRoute: e } = _.useContext(Oe);
    return e ? ha() : ra();
  }
  function ra() {
    ue(
      Xe(),
      "useNavigate() may be used only in the context of a <Router> component."
    );
    let e = _.useContext(Fe),
      { basename: t, navigator: r } = _.useContext(xe),
      { matches: n } = _.useContext(Oe),
      { pathname: o } = Le(),
      a = JSON.stringify(kr(n)),
      s = _.useRef(!1);
    return (
      Mr(() => {
        s.current = !0;
      }),
      _.useCallback(
        (f, l = {}) => {
          if ((Te(s.current, Ir), !s.current)) return;
          if (typeof f == "number") {
            r.go(f);
            return;
          }
          let d = Lr(f, JSON.parse(a), o, l.relative === "path");
          e == null &&
            t !== "/" &&
            (d.pathname = d.pathname === "/" ? t : Ae([t, d.pathname])),
            (l.replace ? r.replace : r.push)(d, l.state, l);
        },
        [t, r, a, o, e]
      )
    );
  }
  _.createContext(null);
  function Qe(e, { relative: t } = {}) {
    let { matches: r } = _.useContext(Oe),
      { pathname: n } = Le(),
      o = JSON.stringify(kr(r));
    return _.useMemo(() => Lr(e, JSON.parse(o), n, t === "path"), [e, o, n, t]);
  }
  function na(e, t, r, n, o) {
    ue(
      Xe(),
      "useRoutes() may be used only in the context of a <Router> component."
    );
    let { navigator: a } = _.useContext(xe),
      { matches: s } = _.useContext(Oe),
      u = s[s.length - 1],
      f = u ? u.params : {},
      l = u ? u.pathname : "/",
      d = u ? u.pathnameBase : "/",
      h = u && u.route;
    {
      let v = (h && h.path) || "";
      Ur(
        l,
        !h || v.endsWith("*") || v.endsWith("*?"),
        `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${l}" (under <Route path="${v}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${v}"> to <Route path="${
          v === "/" ? "*" : `${v}/*`
        }">.`
      );
    }
    let m = Le(),
      T;
    T = m;
    let b = T.pathname || "/",
      R = b;
    if (d !== "/") {
      let v = d.replace(/^\//, "").split("/");
      R = "/" + b.replace(/^\//, "").split("/").slice(v.length).join("/");
    }
    let y = Ar(e, { pathname: R });
    return (
      Te(
        h || y != null,
        `No routes matched location "${T.pathname}${T.search}${T.hash}" `
      ),
      Te(
        y == null ||
          y[y.length - 1].route.element !== void 0 ||
          y[y.length - 1].route.Component !== void 0 ||
          y[y.length - 1].route.lazy !== void 0,
        `Matched leaf route at location "${T.pathname}${T.search}${T.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
      ),
      la(
        y &&
          y.map((v) =>
            Object.assign({}, v, {
              params: Object.assign({}, f, v.params),
              pathname: Ae([
                d,
                a.encodeLocation
                  ? a.encodeLocation(
                      v.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")
                    ).pathname
                  : v.pathname,
              ]),
              pathnameBase:
                v.pathnameBase === "/"
                  ? d
                  : Ae([
                      d,
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
  function oa() {
    let e = pa(),
      t = Xo(e)
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
      (s = _.createElement(
        _.Fragment,
        null,
        _.createElement("p", null, "💿 Hey developer 👋"),
        _.createElement(
          "p",
          null,
          "You can provide a way better UX than this when your app throws errors by providing your own ",
          _.createElement("code", { style: a }, "ErrorBoundary"),
          " or",
          " ",
          _.createElement("code", { style: a }, "errorElement"),
          " prop on your route."
        )
      )),
      _.createElement(
        _.Fragment,
        null,
        _.createElement("h2", null, "Unexpected Application Error!"),
        _.createElement("h3", { style: { fontStyle: "italic" } }, t),
        r ? _.createElement("pre", { style: o }, r) : null,
        s
      )
    );
  }
  var aa = _.createElement(oa, null),
    sa = class extends _.Component {
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
          ? _.createElement(
              Oe.Provider,
              { value: this.props.routeContext },
              _.createElement(Wt.Provider, {
                value: this.state.error,
                children: this.props.component,
              })
            )
          : this.props.children;
      }
    };
  function ia({ routeContext: e, match: t, children: r }) {
    let n = _.useContext(Fe);
    return (
      n &&
        n.static &&
        n.staticContext &&
        (t.route.errorElement || t.route.ErrorBoundary) &&
        (n.staticContext._deepestRenderedBoundaryId = t.route.id),
      _.createElement(Oe.Provider, { value: e }, r)
    );
  }
  function la(e, t = [], r = null, n = null, o = null) {
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
          ((d.route.HydrateFallback || d.route.hydrateFallbackElement) &&
            (f = l),
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
        (b = d.route.errorElement || aa),
        u &&
          (f < 0 && h === 0
            ? (Ur(
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
              ? (v = _.createElement(d.route.Component, null))
              : d.route.element
              ? (v = d.route.element)
              : (v = l),
            _.createElement(ia, {
              match: d,
              routeContext: { outlet: l, matches: y, isDataRoute: r != null },
              children: v,
            })
          );
        };
      return r && (d.route.ErrorBoundary || d.route.errorElement || h === 0)
        ? _.createElement(sa, {
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
  function Gt(e) {
    return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
  }
  function ca(e) {
    let t = _.useContext(Fe);
    return ue(t, Gt(e)), t;
  }
  function ua(e) {
    let t = _.useContext(gt);
    return ue(t, Gt(e)), t;
  }
  function fa(e) {
    let t = _.useContext(Oe);
    return ue(t, Gt(e)), t;
  }
  function Kt(e) {
    let t = fa(e),
      r = t.matches[t.matches.length - 1];
    return (
      ue(
        r.route.id,
        `${e} can only be used on routes that contain a unique "id"`
      ),
      r.route.id
    );
  }
  function da() {
    return Kt("useRouteId");
  }
  function pa() {
    let e = _.useContext(Wt),
      t = ua("useRouteError"),
      r = Kt("useRouteError");
    return e !== void 0 ? e : t.errors?.[r];
  }
  function ha() {
    let { router: e } = ca("useNavigate"),
      t = Kt("useNavigate"),
      r = _.useRef(!1);
    return (
      Mr(() => {
        r.current = !0;
      }),
      _.useCallback(
        async (o, a = {}) => {
          Te(r.current, Ir),
            r.current &&
              (typeof o == "number"
                ? e.navigate(o)
                : await e.navigate(o, { fromRouteId: t, ...a }));
        },
        [e, t]
      )
    );
  }
  var $r = {};
  function Ur(e, t, r) {
    !t && !$r[e] && (($r[e] = !0), Te(!1, r));
  }
  _.memo(ma);
  function ma({ routes: e, future: t, state: r, unstable_onError: n }) {
    return na(e, void 0, r, n, t);
  }
  function ya({
    basename: e = "/",
    children: t = null,
    location: r,
    navigationType: n = "POP",
    navigator: o,
    static: a = !1,
  }) {
    ue(
      !Xe(),
      "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
    );
    let s = e.replace(/^\/*/, "/"),
      u = _.useMemo(
        () => ({ basename: s, navigator: o, static: a, future: {} }),
        [s, o, a]
      );
    typeof r == "string" && (r = Je(r));
    let {
        pathname: f = "/",
        search: l = "",
        hash: d = "",
        state: h = null,
        key: m = "default",
      } = r,
      T = _.useMemo(() => {
        let b = Ce(f, s);
        return b == null
          ? null
          : {
              location: { pathname: b, search: l, hash: d, state: h, key: m },
              navigationType: n,
            };
      }, [s, f, l, d, h, m, n]);
    return (
      Te(
        T != null,
        `<Router basename="${s}"> is not able to match the URL "${f}${l}${d}" because it does not start with the basename, so the <Router> won't render anything.`
      ),
      T == null
        ? null
        : _.createElement(
            xe.Provider,
            { value: u },
            _.createElement(vt.Provider, { children: t, value: T })
          )
    );
  }
  var bt = "get",
    _t = "application/x-www-form-urlencoded";
  function Et(e) {
    return e != null && typeof e.tagName == "string";
  }
  function ga(e) {
    return Et(e) && e.tagName.toLowerCase() === "button";
  }
  function va(e) {
    return Et(e) && e.tagName.toLowerCase() === "form";
  }
  function ba(e) {
    return Et(e) && e.tagName.toLowerCase() === "input";
  }
  function _a(e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
  }
  function Ea(e, t) {
    return e.button === 0 && (!t || t === "_self") && !_a(e);
  }
  var wt = null;
  function wa() {
    if (wt === null)
      try {
        new FormData(document.createElement("form"), 0), (wt = !1);
      } catch {
        wt = !0;
      }
    return wt;
  }
  var Ta = new Set([
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain",
  ]);
  function Jt(e) {
    return e != null && !Ta.has(e)
      ? (Te(
          !1,
          `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${_t}"`
        ),
        null)
      : e;
  }
  function xa(e, t) {
    let r, n, o, a, s;
    if (va(e)) {
      let u = e.getAttribute("action");
      (n = u ? Ce(u, t) : null),
        (r = e.getAttribute("method") || bt),
        (o = Jt(e.getAttribute("enctype")) || _t),
        (a = new FormData(e));
    } else if (
      ga(e) ||
      (ba(e) && (e.type === "submit" || e.type === "image"))
    ) {
      let u = e.form;
      if (u == null)
        throw new Error(
          'Cannot submit a <button> or <input type="submit"> without a <form>'
        );
      let f = e.getAttribute("formaction") || u.getAttribute("action");
      if (
        ((n = f ? Ce(f, t) : null),
        (r = e.getAttribute("formmethod") || u.getAttribute("method") || bt),
        (o =
          Jt(e.getAttribute("formenctype")) ||
          Jt(u.getAttribute("enctype")) ||
          _t),
        (a = new FormData(u, e)),
        !wa())
      ) {
        let { name: l, type: d, value: h } = e;
        if (d === "image") {
          let m = l ? `${l}.` : "";
          a.append(`${m}x`, "0"), a.append(`${m}y`, "0");
        } else l && a.append(l, h);
      }
    } else {
      if (Et(e))
        throw new Error(
          'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
        );
      (r = bt), (n = null), (o = _t), (s = e);
    }
    return (
      a && o === "text/plain" && ((s = a), (a = void 0)),
      { action: n, method: r.toLowerCase(), encType: o, formData: a, body: s }
    );
  }
  Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
  function Xt(e, t) {
    if (e === !1 || e === null || typeof e > "u") throw new Error(t);
  }
  function Ra(e, t, r) {
    let n =
      typeof e == "string"
        ? new URL(
            e,
            typeof window > "u"
              ? "server://singlefetch/"
              : window.location.origin
          )
        : e;
    return (
      n.pathname === "/"
        ? (n.pathname = `_root.${r}`)
        : t && Ce(n.pathname, t) === "/"
        ? (n.pathname = `${t.replace(/\/$/, "")}/_root.${r}`)
        : (n.pathname = `${n.pathname.replace(/\/$/, "")}.${r}`),
      n
    );
  }
  async function Sa(e, t) {
    if (e.id in t) return t[e.id];
    try {
      let r = await import(e.module);
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
  function Ca(e) {
    return e == null
      ? !1
      : e.href == null
      ? e.rel === "preload" &&
        typeof e.imageSrcSet == "string" &&
        typeof e.imageSizes == "string"
      : typeof e.rel == "string" && typeof e.href == "string";
  }
  async function Aa(e, t, r) {
    let n = await Promise.all(
      e.map(async (o) => {
        let a = t.routes[o.route.id];
        if (a) {
          let s = await Sa(a, r);
          return s.links ? s.links() : [];
        }
        return [];
      })
    );
    return ka(
      n
        .flat(1)
        .filter(Ca)
        .filter((o) => o.rel === "stylesheet" || o.rel === "preload")
        .map((o) =>
          o.rel === "stylesheet"
            ? { ...o, rel: "prefetch", as: "style" }
            : { ...o, rel: "prefetch" }
        )
    );
  }
  function Fr(e, t, r, n, o, a) {
    let s = (f, l) => (r[l] ? f.route.id !== r[l].route.id : !0),
      u = (f, l) =>
        r[l].pathname !== f.pathname ||
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
              currentUrl: new URL(
                o.pathname + o.search + o.hash,
                window.origin
              ),
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
  function Oa(e, t, { includeHydrateFallback: r } = {}) {
    return Na(
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
  function Na(e) {
    return [...new Set(e)];
  }
  function ja(e) {
    let t = {},
      r = Object.keys(e).sort();
    for (let n of r) t[n] = e[n];
    return t;
  }
  function ka(e, t) {
    let r = new Set();
    return (
      new Set(t),
      e.reduce((n, o) => {
        let a = JSON.stringify(ja(o));
        return r.has(a) || (r.add(a), n.push({ key: a, link: o })), n;
      }, [])
    );
  }
  function Br() {
    let e = _.useContext(Fe);
    return (
      Xt(
        e,
        "You must render this element inside a <DataRouterContext.Provider> element"
      ),
      e
    );
  }
  function La() {
    let e = _.useContext(gt);
    return (
      Xt(
        e,
        "You must render this element inside a <DataRouterStateContext.Provider> element"
      ),
      e
    );
  }
  var Qt = _.createContext(void 0);
  Qt.displayName = "FrameworkContext";
  function Hr() {
    let e = _.useContext(Qt);
    return (
      Xt(e, "You must render this element inside a <HydratedRouter> element"), e
    );
  }
  function Pa(e, t) {
    let r = _.useContext(Qt),
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
              onFocus: Ze(u, T),
              onBlur: Ze(f, b),
              onMouseEnter: Ze(l, T),
              onMouseLeave: Ze(d, b),
              onTouchStart: Ze(h, T),
            },
          ]
      : [!1, m, {}];
  }
  function Ze(e, t) {
    return (r) => {
      e && e(r), r.defaultPrevented || t(r);
    };
  }
  function Da({ page: e, ...t }) {
    let { router: r } = Br(),
      n = _.useMemo(
        () => Ar(r.routes, e, r.basename),
        [r.routes, e, r.basename]
      );
    return n ? _.createElement(Ma, { page: e, matches: n, ...t }) : null;
  }
  function Ia(e) {
    let { manifest: t, routeModules: r } = Hr(),
      [n, o] = _.useState([]);
    return (
      _.useEffect(() => {
        let a = !1;
        return (
          Aa(e, t, r).then((s) => {
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
  function Ma({ page: e, matches: t, ...r }) {
    let n = Le(),
      { manifest: o, routeModules: a } = Hr(),
      { basename: s } = Br(),
      { loaderData: u, matches: f } = La(),
      l = _.useMemo(() => Fr(e, t, f, o, n, "data"), [e, t, f, o, n]),
      d = _.useMemo(() => Fr(e, t, f, o, n, "assets"), [e, t, f, o, n]),
      h = _.useMemo(() => {
        if (e === n.pathname + n.search + n.hash) return [];
        let b = new Set(),
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
        let y = Ra(e, s, "data");
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
      m = _.useMemo(() => Oa(d, o), [d, o]),
      T = Ia(d);
    return _.createElement(
      _.Fragment,
      null,
      h.map((b) =>
        _.createElement("link", {
          key: b,
          rel: "prefetch",
          as: "fetch",
          href: b,
          ...r,
        })
      ),
      m.map((b) =>
        _.createElement("link", { key: b, rel: "modulepreload", href: b, ...r })
      ),
      T.map(({ key: b, link: R }) =>
        _.createElement("link", { key: b, nonce: r.nonce, ...R })
      )
    );
  }
  function $a(...e) {
    return (t) => {
      e.forEach((r) => {
        typeof r == "function" ? r(t) : r != null && (r.current = t);
      });
    };
  }
  var zr =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u";
  try {
    zr && (window.__reactRouterVersion = "7.9.3");
  } catch {}
  function qr({ basename: e, children: t, window: r }) {
    let n = _.useRef();
    n.current == null && (n.current = Ao({ window: r, v5Compat: !0 }));
    let o = n.current,
      [a, s] = _.useState({ action: o.action, location: o.location }),
      u = _.useCallback(
        (f) => {
          _.startTransition(() => s(f));
        },
        [s]
      );
    return (
      _.useLayoutEffect(() => o.listen(u), [o, u]),
      _.createElement(ya, {
        basename: e,
        children: t,
        location: a.location,
        navigationType: a.action,
        navigator: o,
      })
    );
  }
  var Vr = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
    Wr = _.forwardRef(function (
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
      let { basename: b } = _.useContext(xe),
        R = typeof l == "string" && Vr.test(l),
        y,
        C = !1;
      if (typeof l == "string" && R && ((y = l), zr))
        try {
          let z = new URL(window.location.href),
            ee = l.startsWith("//") ? new URL(z.protocol + l) : new URL(l),
            ne = Ce(ee.pathname, b);
          ee.origin === z.origin && ne != null
            ? (l = ne + ee.search + ee.hash)
            : (C = !0);
        } catch {
          Te(
            !1,
            `<Link to="${l}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
          );
        }
      let v = ta(l, { relative: o }),
        [A, L, $] = Pa(n, m),
        q = Ha(l, {
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
      let H = _.createElement("a", {
        ...m,
        ...$,
        href: y || v,
        onClick: C || a ? t : j,
        ref: $a(T, L),
        target: f,
        "data-discover": !R && r === "render" ? "true" : void 0,
      });
      return A && !R
        ? _.createElement(_.Fragment, null, H, _.createElement(Da, { page: v }))
        : H;
    });
  Wr.displayName = "Link";
  var Ua = _.forwardRef(function (
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
    let h = Qe(s, { relative: l.relative }),
      m = Le(),
      T = _.useContext(gt),
      { navigator: b, basename: R } = _.useContext(xe),
      y = T != null && Ya(h) && u === !0,
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
      A && R && (A = Ce(A, R) || A);
    const L = C !== "/" && C.endsWith("/") ? C.length - 1 : C.length;
    let $ = v === C || (!o && v.startsWith(C) && v.charAt(L) === "/"),
      q =
        A != null &&
        (A === C || (!o && A.startsWith(C) && A.charAt(C.length) === "/")),
      j = { isActive: $, isPending: q, isTransitioning: y },
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
    return _.createElement(
      Wr,
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
  Ua.displayName = "NavLink";
  var Fa = _.forwardRef(
    (
      {
        discover: e = "render",
        fetcherKey: t,
        navigate: r,
        reloadDocument: n,
        replace: o,
        state: a,
        method: s = bt,
        action: u,
        onSubmit: f,
        relative: l,
        preventScrollReset: d,
        viewTransition: h,
        ...m
      },
      T
    ) => {
      let b = Va(),
        R = Wa(u, { relative: l }),
        y = s.toLowerCase() === "get" ? "get" : "post",
        C = typeof u == "string" && Vr.test(u),
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
      return _.createElement("form", {
        ref: T,
        method: y,
        action: R,
        onSubmit: n ? f : v,
        ...m,
        "data-discover": !C && e === "render" ? "true" : void 0,
      });
    }
  );
  Fa.displayName = "Form";
  function Ba(e) {
    return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
  }
  function Yr(e) {
    let t = _.useContext(Fe);
    return ue(t, Ba(e)), t;
  }
  function Ha(
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
    let u = Yt(),
      f = Le(),
      l = Qe(e, { relative: a });
    return _.useCallback(
      (d) => {
        if (Ea(d, t)) {
          d.preventDefault();
          let h = r !== void 0 ? r : Ke(f) === Ke(l);
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
  var za = 0,
    qa = () => `__${String(++za)}__`;
  function Va() {
    let { router: e } = Yr("useSubmit"),
      { basename: t } = _.useContext(xe),
      r = da();
    return _.useCallback(
      async (n, o = {}) => {
        let {
          action: a,
          method: s,
          encType: u,
          formData: f,
          body: l,
        } = xa(n, t);
        if (o.navigate === !1) {
          let d = o.fetcherKey || qa();
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
  function Wa(e, { relative: t } = {}) {
    let { basename: r } = _.useContext(xe),
      n = _.useContext(Oe);
    ue(n, "useFormAction must be used inside a RouteContext");
    let [o] = n.matches.slice(-1),
      a = { ...Qe(e || ".", { relative: t }) },
      s = Le();
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
      r !== "/" && (a.pathname = a.pathname === "/" ? r : Ae([r, a.pathname])),
      Ke(a)
    );
  }
  function Ya(e, { relative: t } = {}) {
    let r = _.useContext(Dr);
    ue(
      r != null,
      "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
    );
    let { basename: n } = Yr("useViewTransitionState"),
      o = Qe(e, { relative: t });
    if (!r.isTransitioning) return !1;
    let a = Ce(r.currentLocation.pathname, n) || r.currentLocation.pathname,
      s = Ce(r.nextLocation.pathname, n) || r.nextLocation.pathname;
    return yt(o.pathname, s) != null || yt(o.pathname, a) != null;
  }
  var Tt = { exports: {} },
    et = {};
  /**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Gr;
  function Ga() {
    if (Gr) return et;
    Gr = 1;
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
        { $$typeof: e, type: n, key: s, ref: o !== void 0 ? o : null, props: a }
      );
    }
    return (et.Fragment = t), (et.jsx = r), (et.jsxs = r), et;
  }
  var tt = {};
  /**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Kr;
  function Ka() {
    return (
      Kr ||
        ((Kr = 1),
        process.env.NODE_ENV !== "production" &&
          (function () {
            function e(c) {
              if (c == null) return null;
              if (typeof c == "function")
                return c.$$typeof === ne
                  ? null
                  : c.displayName || c.name || null;
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
                        (c =
                          c !== "" ? "ForwardRef(" + c + ")" : "ForwardRef")),
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
                Object.defineProperty(c, "key", { get: P, configurable: !0 });
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
                (c = { $$typeof: b, type: c, key: S, props: P, _owner: E }),
                (O !== void 0 ? O : null) !== null
                  ? Object.defineProperty(c, "ref", { enumerable: !1, get: f })
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
                  ye[O + E] ||
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
                    (ye[O + E] = !0));
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
            var T = dt(),
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
              ne = Symbol.for("react.client.reference"),
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
              he = le(n(a)),
              ye = {};
            (tt.Fragment = y),
              (tt.jsx = function (c, S, P) {
                var E = 1e4 > V.recentlyCreatedOwnerStacks++;
                return d(
                  c,
                  S,
                  P,
                  !1,
                  E ? Error("react-stack-top-frame") : ae,
                  E ? le(n(c)) : he
                );
              }),
              (tt.jsxs = function (c, S, P) {
                var E = 1e4 > V.recentlyCreatedOwnerStacks++;
                return d(
                  c,
                  S,
                  P,
                  !0,
                  E ? Error("react-stack-top-frame") : ae,
                  E ? le(n(c)) : he
                );
              });
          })()),
      tt
    );
  }
  var Jr;
  function Ja() {
    return (
      Jr ||
        ((Jr = 1),
        process.env.NODE_ENV === "production"
          ? (Tt.exports = Ga())
          : (Tt.exports = Ka())),
      Tt.exports
    );
  }
  var p = Ja();
  function Xr(e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }
  const { toString: Xa } = Object.prototype,
    { getPrototypeOf: Zt } = Object,
    { iterator: xt, toStringTag: Qr } = Symbol,
    Rt = ((e) => (t) => {
      const r = Xa.call(t);
      return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
    })(Object.create(null)),
    Ee = (e) => ((e = e.toLowerCase()), (t) => Rt(t) === e),
    St = (e) => (t) => typeof t === e,
    { isArray: Be } = Array,
    He = St("undefined");
  function rt(e) {
    return (
      e !== null &&
      !He(e) &&
      e.constructor !== null &&
      !He(e.constructor) &&
      ge(e.constructor.isBuffer) &&
      e.constructor.isBuffer(e)
    );
  }
  const Zr = Ee("ArrayBuffer");
  function Qa(e) {
    let t;
    return (
      typeof ArrayBuffer < "u" && ArrayBuffer.isView
        ? (t = ArrayBuffer.isView(e))
        : (t = e && e.buffer && Zr(e.buffer)),
      t
    );
  }
  const Za = St("string"),
    ge = St("function"),
    en = St("number"),
    nt = (e) => e !== null && typeof e == "object",
    es = (e) => e === !0 || e === !1,
    Ct = (e) => {
      if (Rt(e) !== "object") return !1;
      const t = Zt(e);
      return (
        (t === null ||
          t === Object.prototype ||
          Object.getPrototypeOf(t) === null) &&
        !(Qr in e) &&
        !(xt in e)
      );
    },
    ts = (e) => {
      if (!nt(e) || rt(e)) return !1;
      try {
        return (
          Object.keys(e).length === 0 &&
          Object.getPrototypeOf(e) === Object.prototype
        );
      } catch {
        return !1;
      }
    },
    rs = Ee("Date"),
    ns = Ee("File"),
    os = Ee("Blob"),
    as = Ee("FileList"),
    ss = (e) => nt(e) && ge(e.pipe),
    is = (e) => {
      let t;
      return (
        e &&
        ((typeof FormData == "function" && e instanceof FormData) ||
          (ge(e.append) &&
            ((t = Rt(e)) === "formdata" ||
              (t === "object" &&
                ge(e.toString) &&
                e.toString() === "[object FormData]"))))
      );
    },
    ls = Ee("URLSearchParams"),
    [cs, us, fs, ds] = ["ReadableStream", "Request", "Response", "Headers"].map(
      Ee
    ),
    ps = (e) =>
      e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  function ot(e, t, { allOwnKeys: r = !1 } = {}) {
    if (e === null || typeof e > "u") return;
    let n, o;
    if ((typeof e != "object" && (e = [e]), Be(e)))
      for (n = 0, o = e.length; n < o; n++) t.call(null, e[n], n, e);
    else {
      if (rt(e)) return;
      const a = r ? Object.getOwnPropertyNames(e) : Object.keys(e),
        s = a.length;
      let u;
      for (n = 0; n < s; n++) (u = a[n]), t.call(null, e[u], u, e);
    }
  }
  function tn(e, t) {
    if (rt(e)) return null;
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
    rn = (e) => !He(e) && e !== Pe;
  function er() {
    const { caseless: e, skipUndefined: t } = (rn(this) && this) || {},
      r = {},
      n = (o, a) => {
        const s = (e && tn(r, a)) || a;
        Ct(r[s]) && Ct(o)
          ? (r[s] = er(r[s], o))
          : Ct(o)
          ? (r[s] = er({}, o))
          : Be(o)
          ? (r[s] = o.slice())
          : (!t || !He(o)) && (r[s] = o);
      };
    for (let o = 0, a = arguments.length; o < a; o++)
      arguments[o] && ot(arguments[o], n);
    return r;
  }
  const hs = (e, t, r, { allOwnKeys: n } = {}) => (
      ot(
        t,
        (o, a) => {
          r && ge(o) ? (e[a] = Xr(o, r)) : (e[a] = o);
        },
        { allOwnKeys: n }
      ),
      e
    ),
    ms = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
    ys = (e, t, r, n) => {
      (e.prototype = Object.create(t.prototype, n)),
        (e.prototype.constructor = e),
        Object.defineProperty(e, "super", { value: t.prototype }),
        r && Object.assign(e.prototype, r);
    },
    gs = (e, t, r, n) => {
      let o, a, s;
      const u = {};
      if (((t = t || {}), e == null)) return t;
      do {
        for (o = Object.getOwnPropertyNames(e), a = o.length; a-- > 0; )
          (s = o[a]),
            (!n || n(s, e, t)) && !u[s] && ((t[s] = e[s]), (u[s] = !0));
        e = r !== !1 && Zt(e);
      } while (e && (!r || r(e, t)) && e !== Object.prototype);
      return t;
    },
    vs = (e, t, r) => {
      (e = String(e)),
        (r === void 0 || r > e.length) && (r = e.length),
        (r -= t.length);
      const n = e.indexOf(t, r);
      return n !== -1 && n === r;
    },
    bs = (e) => {
      if (!e) return null;
      if (Be(e)) return e;
      let t = e.length;
      if (!en(t)) return null;
      const r = new Array(t);
      for (; t-- > 0; ) r[t] = e[t];
      return r;
    },
    _s = (
      (e) => (t) =>
        e && t instanceof e
    )(typeof Uint8Array < "u" && Zt(Uint8Array)),
    Es = (e, t) => {
      const n = (e && e[xt]).call(e);
      let o;
      for (; (o = n.next()) && !o.done; ) {
        const a = o.value;
        t.call(e, a[0], a[1]);
      }
    },
    ws = (e, t) => {
      let r;
      const n = [];
      for (; (r = e.exec(t)) !== null; ) n.push(r);
      return n;
    },
    Ts = Ee("HTMLFormElement"),
    xs = (e) =>
      e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (r, n, o) {
        return n.toUpperCase() + o;
      }),
    nn = (
      ({ hasOwnProperty: e }) =>
      (t, r) =>
        e.call(t, r)
    )(Object.prototype),
    Rs = Ee("RegExp"),
    on = (e, t) => {
      const r = Object.getOwnPropertyDescriptors(e),
        n = {};
      ot(r, (o, a) => {
        let s;
        (s = t(o, a, e)) !== !1 && (n[a] = s || o);
      }),
        Object.defineProperties(e, n);
    },
    Ss = (e) => {
      on(e, (t, r) => {
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
    Cs = (e, t) => {
      const r = {},
        n = (o) => {
          o.forEach((a) => {
            r[a] = !0;
          });
        };
      return Be(e) ? n(e) : n(String(e).split(t)), r;
    },
    As = () => {},
    Os = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
  function Ns(e) {
    return !!(e && ge(e.append) && e[Qr] === "FormData" && e[xt]);
  }
  const js = (e) => {
      const t = new Array(10),
        r = (n, o) => {
          if (nt(n)) {
            if (t.indexOf(n) >= 0) return;
            if (rt(n)) return n;
            if (!("toJSON" in n)) {
              t[o] = n;
              const a = Be(n) ? [] : {};
              return (
                ot(n, (s, u) => {
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
    ks = Ee("AsyncFunction"),
    Ls = (e) => e && (nt(e) || ge(e)) && ge(e.then) && ge(e.catch),
    an = ((e, t) =>
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
    Ps =
      typeof queueMicrotask < "u"
        ? queueMicrotask.bind(Pe)
        : (typeof process < "u" && process.nextTick) || an,
    x = {
      isArray: Be,
      isArrayBuffer: Zr,
      isBuffer: rt,
      isFormData: is,
      isArrayBufferView: Qa,
      isString: Za,
      isNumber: en,
      isBoolean: es,
      isObject: nt,
      isPlainObject: Ct,
      isEmptyObject: ts,
      isReadableStream: cs,
      isRequest: us,
      isResponse: fs,
      isHeaders: ds,
      isUndefined: He,
      isDate: rs,
      isFile: ns,
      isBlob: os,
      isRegExp: Rs,
      isFunction: ge,
      isStream: ss,
      isURLSearchParams: ls,
      isTypedArray: _s,
      isFileList: as,
      forEach: ot,
      merge: er,
      extend: hs,
      trim: ps,
      stripBOM: ms,
      inherits: ys,
      toFlatObject: gs,
      kindOf: Rt,
      kindOfTest: Ee,
      endsWith: vs,
      toArray: bs,
      forEachEntry: Es,
      matchAll: ws,
      isHTMLForm: Ts,
      hasOwnProperty: nn,
      hasOwnProp: nn,
      reduceDescriptors: on,
      freezeMethods: Ss,
      toObjectSet: Cs,
      toCamelCase: xs,
      noop: As,
      toFiniteNumber: Os,
      findKey: tn,
      global: Pe,
      isContextDefined: rn,
      isSpecCompliantForm: Ns,
      toJSONObject: js,
      isAsyncFn: ks,
      isThenable: Ls,
      setImmediate: an,
      asap: Ps,
      isIterable: (e) => e != null && ge(e[xt]),
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
        message: this.message,
        name: this.name,
        description: this.description,
        number: this.number,
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        config: x.toJSONObject(this.config),
        code: this.code,
        status: this.status,
      };
    },
  });
  const sn = Y.prototype,
    ln = {};
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
  ].forEach((e) => {
    ln[e] = { value: e };
  }),
    Object.defineProperties(Y, ln),
    Object.defineProperty(sn, "isAxiosError", { value: !0 }),
    (Y.from = (e, t, r, n, o, a) => {
      const s = Object.create(sn);
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
    });
  const Ds = null;
  function tr(e) {
    return x.isPlainObject(e) || x.isArray(e);
  }
  function cn(e) {
    return x.endsWith(e, "[]") ? e.slice(0, -2) : e;
  }
  function un(e, t, r) {
    return e
      ? e
          .concat(t)
          .map(function (o, a) {
            return (o = cn(o)), !r && a ? "[" + o + "]" : o;
          })
          .join(r ? "." : "")
      : t;
  }
  function Is(e) {
    return x.isArray(e) && !e.some(tr);
  }
  const Ms = x.toFlatObject(x, {}, null, function (t) {
    return /^is[A-Z]/.test(t);
  });
  function At(e, t, r) {
    if (!x.isObject(e)) throw new TypeError("target must be an object");
    (t = t || new FormData()),
      (r = x.toFlatObject(
        r,
        { metaTokens: !0, dots: !1, indexes: !1 },
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
          (x.isArray(b) && Is(b)) ||
          ((x.isFileList(b) || x.endsWith(R, "[]")) && (C = x.toArray(b)))
        )
          return (
            (R = cn(R)),
            C.forEach(function (A, L) {
              !(x.isUndefined(A) || A === null) &&
                t.append(
                  s === !0 ? un([R], L, a) : s === null ? R : R + "[]",
                  l(A)
                );
            }),
            !1
          );
      }
      return tr(b) ? !0 : (t.append(un(y, R, a), l(b)), !1);
    }
    const h = [],
      m = Object.assign(Ms, {
        defaultVisitor: d,
        convertValue: l,
        isVisitable: tr,
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
  function fn(e) {
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
  function rr(e, t) {
    (this._pairs = []), e && At(e, this, t);
  }
  const dn = rr.prototype;
  (dn.append = function (t, r) {
    this._pairs.push([t, r]);
  }),
    (dn.toString = function (t) {
      const r = t
        ? function (n) {
            return t.call(this, n, fn);
          }
        : fn;
      return this._pairs
        .map(function (o) {
          return r(o[0]) + "=" + r(o[1]);
        }, "")
        .join("&");
    });
  function $s(e) {
    return encodeURIComponent(e)
      .replace(/%3A/gi, ":")
      .replace(/%24/g, "$")
      .replace(/%2C/gi, ",")
      .replace(/%20/g, "+");
  }
  function pn(e, t, r) {
    if (!t) return e;
    const n = (r && r.encode) || $s;
    x.isFunction(r) && (r = { serialize: r });
    const o = r && r.serialize;
    let a;
    if (
      (o
        ? (a = o(t, r))
        : (a = x.isURLSearchParams(t)
            ? t.toString()
            : new rr(t, r).toString(n)),
      a)
    ) {
      const s = e.indexOf("#");
      s !== -1 && (e = e.slice(0, s)),
        (e += (e.indexOf("?") === -1 ? "?" : "&") + a);
    }
    return e;
  }
  class hn {
    constructor() {
      this.handlers = [];
    }
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
    eject(t) {
      this.handlers[t] && (this.handlers[t] = null);
    }
    clear() {
      this.handlers && (this.handlers = []);
    }
    forEach(t) {
      x.forEach(this.handlers, function (n) {
        n !== null && t(n);
      });
    }
  }
  const mn = {
      silentJSONParsing: !0,
      forcedJSONParsing: !0,
      clarifyTimeoutError: !1,
    },
    Us = {
      isBrowser: !0,
      classes: {
        URLSearchParams: typeof URLSearchParams < "u" ? URLSearchParams : rr,
        FormData: typeof FormData < "u" ? FormData : null,
        Blob: typeof Blob < "u" ? Blob : null,
      },
      protocols: ["http", "https", "file", "blob", "url", "data"],
    },
    nr = typeof window < "u" && typeof document < "u",
    or = (typeof navigator == "object" && navigator) || void 0,
    Fs =
      nr &&
      (!or || ["ReactNative", "NativeScript", "NS"].indexOf(or.product) < 0),
    Bs =
      typeof WorkerGlobalScope < "u" &&
      self instanceof WorkerGlobalScope &&
      typeof self.importScripts == "function",
    Hs = (nr && window.location.href) || "http://localhost",
    pe = {
      ...Object.freeze(
        Object.defineProperty(
          {
            __proto__: null,
            hasBrowserEnv: nr,
            hasStandardBrowserEnv: Fs,
            hasStandardBrowserWebWorkerEnv: Bs,
            navigator: or,
            origin: Hs,
          },
          Symbol.toStringTag,
          { value: "Module" }
        )
      ),
      ...Us,
    };
  function zs(e, t) {
    return At(e, new pe.classes.URLSearchParams(), {
      visitor: function (r, n, o, a) {
        return pe.isNode && x.isBuffer(r)
          ? (this.append(n, r.toString("base64")), !1)
          : a.defaultVisitor.apply(this, arguments);
      },
      ...t,
    });
  }
  function qs(e) {
    return x
      .matchAll(/\w+|\[(\w*)]/g, e)
      .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
  }
  function Vs(e) {
    const t = {},
      r = Object.keys(e);
    let n;
    const o = r.length;
    let a;
    for (n = 0; n < o; n++) (a = r[n]), (t[a] = e[a]);
    return t;
  }
  function yn(e) {
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
            t(r, n, o[s], a) && x.isArray(o[s]) && (o[s] = Vs(o[s])),
            !u)
      );
    }
    if (x.isFormData(e) && x.isFunction(e.entries)) {
      const r = {};
      return (
        x.forEachEntry(e, (n, o) => {
          t(qs(n), o, r, 0);
        }),
        r
      );
    }
    return null;
  }
  function Ws(e, t, r) {
    if (x.isString(e))
      try {
        return (t || JSON.parse)(e), x.trim(e);
      } catch (n) {
        if (n.name !== "SyntaxError") throw n;
      }
    return (r || JSON.stringify)(e);
  }
  const at = {
    transitional: mn,
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [
      function (t, r) {
        const n = r.getContentType() || "",
          o = n.indexOf("application/json") > -1,
          a = x.isObject(t);
        if ((a && x.isHTMLForm(t) && (t = new FormData(t)), x.isFormData(t)))
          return o ? JSON.stringify(yn(t)) : t;
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
            return zs(t, this.formSerializer).toString();
          if ((u = x.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
            const f = this.env && this.env.FormData;
            return At(
              u ? { "files[]": t } : t,
              f && new f(),
              this.formSerializer
            );
          }
        }
        return a || o ? (r.setContentType("application/json", !1), Ws(t)) : t;
      },
    ],
    transformResponse: [
      function (t) {
        const r = this.transitional || at.transitional,
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
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: { FormData: pe.classes.FormData, Blob: pe.classes.Blob },
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
    at.headers[e] = {};
  });
  const Ys = x.toObjectSet([
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
    Gs = (e) => {
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
                !(!r || (t[r] && Ys[r])) &&
                  (r === "set-cookie"
                    ? t[r]
                      ? t[r].push(n)
                      : (t[r] = [n])
                    : (t[r] = t[r] ? t[r] + ", " + n : n));
            }),
        t
      );
    },
    gn = Symbol("internals");
  function st(e) {
    return e && String(e).trim().toLowerCase();
  }
  function Ot(e) {
    return e === !1 || e == null ? e : x.isArray(e) ? e.map(Ot) : String(e);
  }
  function Ks(e) {
    const t = Object.create(null),
      r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let n;
    for (; (n = r.exec(e)); ) t[n[1]] = n[2];
    return t;
  }
  const Js = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
  function ar(e, t, r, n, o) {
    if (x.isFunction(n)) return n.call(this, t, r);
    if ((o && (t = r), !!x.isString(t))) {
      if (x.isString(n)) return t.indexOf(n) !== -1;
      if (x.isRegExp(n)) return n.test(t);
    }
  }
  function Xs(e) {
    return e
      .trim()
      .toLowerCase()
      .replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
  }
  function Qs(e, t) {
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
        const d = st(f);
        if (!d) throw new Error("header name must be a non-empty string");
        const h = x.findKey(o, d);
        (!h || o[h] === void 0 || l === !0 || (l === void 0 && o[h] !== !1)) &&
          (o[h || f] = Ot(u));
      }
      const s = (u, f) => x.forEach(u, (l, d) => a(l, d, f));
      if (x.isPlainObject(t) || t instanceof this.constructor) s(t, r);
      else if (x.isString(t) && (t = t.trim()) && !Js(t)) s(Gs(t), r);
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
      if (((t = st(t)), t)) {
        const n = x.findKey(this, t);
        if (n) {
          const o = this[n];
          if (!r) return o;
          if (r === !0) return Ks(o);
          if (x.isFunction(r)) return r.call(this, o, n);
          if (x.isRegExp(r)) return r.exec(o);
          throw new TypeError("parser must be boolean|regexp|function");
        }
      }
    }
    has(t, r) {
      if (((t = st(t)), t)) {
        const n = x.findKey(this, t);
        return !!(n && this[n] !== void 0 && (!r || ar(this, this[n], n, r)));
      }
      return !1;
    }
    delete(t, r) {
      const n = this;
      let o = !1;
      function a(s) {
        if (((s = st(s)), s)) {
          const u = x.findKey(n, s);
          u && (!r || ar(n, n[u], u, r)) && (delete n[u], (o = !0));
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
        (!t || ar(this, this[a], a, t, !0)) && (delete this[a], (o = !0));
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
            (r[s] = Ot(o)), delete r[a];
            return;
          }
          const u = t ? Xs(a) : String(a).trim();
          u !== a && delete r[a], (r[u] = Ot(o)), (n[u] = !0);
        }),
        this
      );
    }
    concat(...t) {
      return this.constructor.concat(this, ...t);
    }
    toJSON(t) {
      const r = Object.create(null);
      return (
        x.forEach(this, (n, o) => {
          n != null &&
            n !== !1 &&
            (r[o] = t && x.isArray(n) ? n.join(", ") : n);
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
      const n = (this[gn] = this[gn] = { accessors: {} }).accessors,
        o = this.prototype;
      function a(s) {
        const u = st(s);
        n[u] || (Qs(o, s), (n[u] = !0));
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
  ]),
    x.reduceDescriptors(ve.prototype, ({ value: e }, t) => {
      let r = t[0].toUpperCase() + t.slice(1);
      return {
        get: () => e,
        set(n) {
          this[r] = n;
        },
      };
    }),
    x.freezeMethods(ve);
  function sr(e, t) {
    const r = this || at,
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
  function vn(e) {
    return !!(e && e.__CANCEL__);
  }
  function ze(e, t, r) {
    Y.call(this, e ?? "canceled", Y.ERR_CANCELED, t, r),
      (this.name = "CanceledError");
  }
  x.inherits(ze, Y, { __CANCEL__: !0 });
  function bn(e, t, r) {
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
  function Zs(e) {
    const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
    return (t && t[1]) || "";
  }
  function ei(e, t) {
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
        if (((o = (o + 1) % e), o === a && (a = (a + 1) % e), l - s < t))
          return;
        const T = d && l - d;
        return T ? Math.round((m * 1e3) / T) : void 0;
      }
    );
  }
  function ti(e, t) {
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
  const Nt = (e, t, r = 3) => {
      let n = 0;
      const o = ei(50, 250);
      return ti((a) => {
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
    _n = (e, t) => {
      const r = e != null;
      return [(n) => t[0]({ lengthComputable: r, total: e, loaded: n }), t[1]];
    },
    En =
      (e) =>
      (...t) =>
        x.asap(() => e(...t)),
    ri = pe.hasStandardBrowserEnv
      ? ((e, t) => (r) => (
          (r = new URL(r, pe.origin)),
          e.protocol === r.protocol &&
            e.host === r.host &&
            (t || e.port === r.port)
        ))(
          new URL(pe.origin),
          pe.navigator && /(msie|trident)/i.test(pe.navigator.userAgent)
        )
      : () => !0,
    ni = pe.hasStandardBrowserEnv
      ? {
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
      : {
          write() {},
          read() {
            return null;
          },
          remove() {},
        };
  function oi(e) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
  }
  function ai(e, t) {
    return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
  }
  function wn(e, t, r) {
    let n = !oi(t);
    return e && (n || r == !1) ? ai(e, t) : t;
  }
  const Tn = (e) => (e instanceof ve ? { ...e } : e);
  function De(e, t) {
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
      headers: (l, d, h) => o(Tn(l), Tn(d), h, !0),
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
  const xn = (e) => {
      const t = De({}, e);
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
        (t.url = pn(
          wn(t.baseURL, t.url, t.allowAbsoluteUrls),
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
        if (pe.hasStandardBrowserEnv || pe.hasStandardBrowserWebWorkerEnv)
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
        pe.hasStandardBrowserEnv &&
        (n && x.isFunction(n) && (n = n(t)), n || (n !== !1 && ri(t.url)))
      ) {
        const f = o && a && ni.read(a);
        f && s.set(o, f);
      }
      return t;
    },
    si =
      typeof XMLHttpRequest < "u" &&
      function (e) {
        return new Promise(function (r, n) {
          const o = xn(e);
          let a = o.data;
          const s = ve.from(o.headers).normalize();
          let {
              responseType: u,
              onUploadProgress: f,
              onDownloadProgress: l,
            } = o,
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
            bn(
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
              const $ = o.transitional || mn;
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
            l && (([m, b] = Nt(l, !0)), y.addEventListener("progress", m)),
            f &&
              y.upload &&
              (([h, T] = Nt(f)),
              y.upload.addEventListener("progress", h),
              y.upload.addEventListener("loadend", T)),
            (o.cancelToken || o.signal) &&
              ((d = (A) => {
                y &&
                  (n(!A || A.type ? new ze(null, e, y) : A),
                  y.abort(),
                  (y = null));
              }),
              o.cancelToken && o.cancelToken.subscribe(d),
              o.signal &&
                (o.signal.aborted
                  ? d()
                  : o.signal.addEventListener("abort", d)));
          const v = Zs(o.url);
          if (v && pe.protocols.indexOf(v) === -1) {
            n(new Y("Unsupported protocol " + v + ":", Y.ERR_BAD_REQUEST, e));
            return;
          }
          y.send(a || null);
        });
      },
    ii = (e, t) => {
      const { length: r } = (e = e ? e.filter(Boolean) : []);
      if (t || r) {
        let n = new AbortController(),
          o;
        const a = function (l) {
          if (!o) {
            (o = !0), u();
            const d = l instanceof Error ? l : this.reason;
            n.abort(
              d instanceof Y ? d : new ze(d instanceof Error ? d.message : d)
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
    li = function* (e, t) {
      let r = e.byteLength;
      if (r < t) {
        yield e;
        return;
      }
      let n = 0,
        o;
      for (; n < r; ) (o = n + t), yield e.slice(n, o), (n = o);
    },
    ci = async function* (e, t) {
      for await (const r of ui(e)) yield* li(r, t);
    },
    ui = async function* (e) {
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
    Rn = (e, t, r, n) => {
      const o = ci(e, t);
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
        { highWaterMark: 2 }
      );
    },
    Sn = 64 * 1024,
    { isFunction: jt } = x,
    fi = (({ Request: e, Response: t }) => ({ Request: e, Response: t }))(
      x.global
    ),
    { ReadableStream: Cn, TextEncoder: An } = x.global,
    On = (e, ...t) => {
      try {
        return !!e(...t);
      } catch {
        return !1;
      }
    },
    di = (e) => {
      e = x.merge.call({ skipUndefined: !0 }, fi, e);
      const { fetch: t, Request: r, Response: n } = e,
        o = t ? jt(t) : typeof fetch == "function",
        a = jt(r),
        s = jt(n);
      if (!o) return !1;
      const u = o && jt(Cn),
        f =
          o &&
          (typeof An == "function"
            ? (
                (b) => (R) =>
                  b.encode(R)
              )(new An())
            : async (b) => new Uint8Array(await new r(b).arrayBuffer())),
        l =
          a &&
          u &&
          On(() => {
            let b = !1;
            const R = new r(pe.origin, {
              body: new Cn(),
              method: "POST",
              get duplex() {
                return (b = !0), "half";
              },
            }).headers.has("Content-Type");
            return b && !R;
          }),
        d = s && u && On(() => x.isReadableStream(new n("").body)),
        h = { stream: d && ((b) => b.body) };
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
              await new r(pe.origin, { method: "POST", body: b }).arrayBuffer()
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
          } = xn(b),
          ne = t || fetch;
        j = j ? (j + "").toLowerCase() : "text";
        let V = ii([v, A && A.toAbortSignal()], L),
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
            let c = new r(R, { method: "POST", body: C, duplex: "half" }),
              S;
            if (
              (x.isFormData(C) &&
                (S = c.headers.get("content-type")) &&
                H.setContentType(S),
              c.body)
            ) {
              const [P, E] = _n(le, Nt(En(q)));
              C = Rn(c.body, Sn, P, E);
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
          let ae = await (a ? ne(se, ee) : ne(R, ce));
          const he = d && (j === "stream" || j === "response");
          if (d && ($ || (he && te))) {
            const c = {};
            ["status", "statusText", "headers"].forEach((k) => {
              c[k] = ae[k];
            });
            const S = x.toFiniteNumber(ae.headers.get("content-length")),
              [P, E] = ($ && _n(S, Nt(En($), !0))) || [];
            ae = new n(
              Rn(ae.body, Sn, P, () => {
                E && E(), te && te();
              }),
              c
            );
          }
          j = j || "text";
          let ye = await h[x.findKey(h, j) || "text"](ae, b);
          return (
            !he && te && te(),
            await new Promise((c, S) => {
              bn(c, S, {
                data: ye,
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
    pi = new Map(),
    Nn = (e) => {
      let t = e ? e.env : {};
      const { fetch: r, Request: n, Response: o } = t,
        a = [n, o, r];
      let s = a.length,
        u = s,
        f,
        l,
        d = pi;
      for (; u--; )
        (f = a[u]),
          (l = d.get(f)),
          l === void 0 && d.set(f, (l = u ? new Map() : di(t))),
          (d = l);
      return l;
    };
  Nn();
  const ir = { http: Ds, xhr: si, fetch: { get: Nn } };
  x.forEach(ir, (e, t) => {
    if (e) {
      try {
        Object.defineProperty(e, "name", { value: t });
      } catch {}
      Object.defineProperty(e, "adapterName", { value: t });
    }
  });
  const jn = (e) => `- ${e}`,
    hi = (e) => x.isFunction(e) || e === null || e === !1,
    kn = {
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
            !hi(n) && ((o = ir[(u = String(n)).toLowerCase()]), o === void 0))
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
                s.map(jn).join(`
`)
              : " " + jn(s[0])
            : "as no adapter specified";
          throw new Y(
            "There is no suitable adapter to dispatch the request " + u,
            "ERR_NOT_SUPPORT"
          );
        }
        return o;
      },
      adapters: ir,
    };
  function lr(e) {
    if (
      (e.cancelToken && e.cancelToken.throwIfRequested(),
      e.signal && e.signal.aborted)
    )
      throw new ze(null, e);
  }
  function Ln(e) {
    return (
      lr(e),
      (e.headers = ve.from(e.headers)),
      (e.data = sr.call(e, e.transformRequest)),
      ["post", "put", "patch"].indexOf(e.method) !== -1 &&
        e.headers.setContentType("application/x-www-form-urlencoded", !1),
      kn
        .getAdapter(
          e.adapter || at.adapter,
          e
        )(e)
        .then(
          function (n) {
            return (
              lr(e),
              (n.data = sr.call(e, e.transformResponse, n)),
              (n.headers = ve.from(n.headers)),
              n
            );
          },
          function (n) {
            return (
              vn(n) ||
                (lr(e),
                n &&
                  n.response &&
                  ((n.response.data = sr.call(
                    e,
                    e.transformResponse,
                    n.response
                  )),
                  (n.response.headers = ve.from(n.response.headers)))),
              Promise.reject(n)
            );
          }
        )
    );
  }
  const Pn = "1.12.2",
    kt = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach(
    (e, t) => {
      kt[e] = function (n) {
        return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
      };
    }
  );
  const Dn = {};
  (kt.transitional = function (t, r, n) {
    function o(a, s) {
      return (
        "[Axios v" +
        Pn +
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
          !Dn[s] &&
          ((Dn[s] = !0),
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
  }),
    (kt.spelling = function (t) {
      return (r, n) => (
        console.warn(`${n} is likely a misspelling of ${t}`), !0
      );
    });
  function mi(e, t, r) {
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
  const Lt = { assertOptions: mi, validators: kt },
    Re = Lt.validators;
  let Ie = class {
    constructor(t) {
      (this.defaults = t || {}),
        (this.interceptors = { request: new hn(), response: new hn() });
    }
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
        (r = De(this.defaults, r));
      const { transitional: n, paramsSerializer: o, headers: a } = r;
      n !== void 0 &&
        Lt.assertOptions(
          n,
          {
            silentJSONParsing: Re.transitional(Re.boolean),
            forcedJSONParsing: Re.transitional(Re.boolean),
            clarifyTimeoutError: Re.transitional(Re.boolean),
          },
          !1
        ),
        o != null &&
          (x.isFunction(o)
            ? (r.paramsSerializer = { serialize: o })
            : Lt.assertOptions(
                o,
                { encode: Re.function, serialize: Re.function },
                !0
              )),
        r.allowAbsoluteUrls !== void 0 ||
          (this.defaults.allowAbsoluteUrls !== void 0
            ? (r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
            : (r.allowAbsoluteUrls = !0)),
        Lt.assertOptions(
          r,
          {
            baseUrl: Re.spelling("baseURL"),
            withXsrfToken: Re.spelling("withXSRFToken"),
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
        const b = [Ln.bind(this), void 0];
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
        d = Ln.call(this, T);
      } catch (b) {
        return Promise.reject(b);
      }
      for (h = 0, m = l.length; h < m; ) d = d.then(l[h++], l[h++]);
      return d;
    }
    getUri(t) {
      t = De(this.defaults, t);
      const r = wn(t.baseURL, t.url, t.allowAbsoluteUrls);
      return pn(r, t.params, t.paramsSerializer);
    }
  };
  x.forEach(["delete", "get", "head", "options"], function (t) {
    Ie.prototype[t] = function (r, n) {
      return this.request(
        De(n || {}, { method: t, url: r, data: (n || {}).data })
      );
    };
  }),
    x.forEach(["post", "put", "patch"], function (t) {
      function r(n) {
        return function (a, s, u) {
          return this.request(
            De(u || {}, {
              method: t,
              headers: n ? { "Content-Type": "multipart/form-data" } : {},
              url: a,
              data: s,
            })
          );
        };
      }
      (Ie.prototype[t] = r()), (Ie.prototype[t + "Form"] = r(!0));
    });
  let yi = class uo {
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
          n.reason || ((n.reason = new ze(a, s, u)), r(n.reason));
        });
    }
    throwIfRequested() {
      if (this.reason) throw this.reason;
    }
    subscribe(t) {
      if (this.reason) {
        t(this.reason);
        return;
      }
      this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
    }
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
    static source() {
      let t;
      return {
        token: new uo(function (o) {
          t = o;
        }),
        cancel: t,
      };
    }
  };
  function gi(e) {
    return function (r) {
      return e.apply(null, r);
    };
  }
  function vi(e) {
    return x.isObject(e) && e.isAxiosError === !0;
  }
  const cr = {
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
  Object.entries(cr).forEach(([e, t]) => {
    cr[t] = e;
  });
  function In(e) {
    const t = new Ie(e),
      r = Xr(Ie.prototype.request, t);
    return (
      x.extend(r, Ie.prototype, t, { allOwnKeys: !0 }),
      x.extend(r, t, null, { allOwnKeys: !0 }),
      (r.create = function (o) {
        return In(De(e, o));
      }),
      r
    );
  }
  const X = In(at);
  (X.Axios = Ie),
    (X.CanceledError = ze),
    (X.CancelToken = yi),
    (X.isCancel = vn),
    (X.VERSION = Pn),
    (X.toFormData = At),
    (X.AxiosError = Y),
    (X.Cancel = X.CanceledError),
    (X.all = function (t) {
      return Promise.all(t);
    }),
    (X.spread = gi),
    (X.isAxiosError = vi),
    (X.mergeConfig = De),
    (X.AxiosHeaders = ve),
    (X.formToJSON = (e) => yn(x.isHTMLForm(e) ? new FormData(e) : e)),
    (X.getAdapter = kn.getAdapter),
    (X.HttpStatusCode = cr),
    (X.default = X);
  const {
    Axios: Dl,
    AxiosError: Il,
    CanceledError: Ml,
    isCancel: $l,
    CancelToken: Ul,
    VERSION: Fl,
    all: Bl,
    Cancel: Hl,
    isAxiosError: zl,
    spread: ql,
    toFormData: Vl,
    AxiosHeaders: Wl,
    HttpStatusCode: Yl,
    formToJSON: Gl,
    getAdapter: Kl,
    mergeConfig: Jl,
  } = X;
  function Mn(e) {
    var t,
      r,
      n = "";
    if (typeof e == "string" || typeof e == "number") n += e;
    else if (typeof e == "object")
      if (Array.isArray(e)) {
        var o = e.length;
        for (t = 0; t < o; t++)
          e[t] && (r = Mn(e[t])) && (n && (n += " "), (n += r));
      } else for (r in e) e[r] && (n && (n += " "), (n += r));
    return n;
  }
  function Me() {
    for (var e, t, r = 0, n = "", o = arguments.length; r < o; r++)
      (e = arguments[r]) && (t = Mn(e)) && (n && (n += " "), (n += t));
    return n;
  }
  function bi(e) {
    if (typeof document > "u") return;
    let t = document.head || document.getElementsByTagName("head")[0],
      r = document.createElement("style");
    (r.type = "text/css"),
      t.firstChild ? t.insertBefore(r, t.firstChild) : t.appendChild(r),
      r.styleSheet
        ? (r.styleSheet.cssText = e)
        : r.appendChild(document.createTextNode(e));
  }
  bi(`:root{--toastify-color-light: #fff;--toastify-color-dark: #121212;--toastify-color-info: #3498db;--toastify-color-success: #07bc0c;--toastify-color-warning: #f1c40f;--toastify-color-error: hsl(6, 78%, 57%);--toastify-color-transparent: rgba(255, 255, 255, .7);--toastify-icon-color-info: var(--toastify-color-info);--toastify-icon-color-success: var(--toastify-color-success);--toastify-icon-color-warning: var(--toastify-color-warning);--toastify-icon-color-error: var(--toastify-color-error);--toastify-container-width: fit-content;--toastify-toast-width: 320px;--toastify-toast-offset: 16px;--toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));--toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));--toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));--toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));--toastify-toast-background: #fff;--toastify-toast-padding: 14px;--toastify-toast-min-height: 64px;--toastify-toast-max-height: 800px;--toastify-toast-bd-radius: 6px;--toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, .1);--toastify-font-family: sans-serif;--toastify-z-index: 9999;--toastify-text-color-light: #757575;--toastify-text-color-dark: #fff;--toastify-text-color-info: #fff;--toastify-text-color-success: #fff;--toastify-text-color-warning: #fff;--toastify-text-color-error: #fff;--toastify-spinner-color: #616161;--toastify-spinner-color-empty-area: #e0e0e0;--toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);--toastify-color-progress-dark: #bb86fc;--toastify-color-progress-info: var(--toastify-color-info);--toastify-color-progress-success: var(--toastify-color-success);--toastify-color-progress-warning: var(--toastify-color-warning);--toastify-color-progress-error: var(--toastify-color-error);--toastify-color-progress-bgo: .2}.Toastify__toast-container{z-index:var(--toastify-z-index);-webkit-transform:translate3d(0,0,var(--toastify-z-index));position:fixed;width:var(--toastify-container-width);box-sizing:border-box;color:#fff;display:flex;flex-direction:column}.Toastify__toast-container--top-left{top:var(--toastify-toast-top);left:var(--toastify-toast-left)}.Toastify__toast-container--top-center{top:var(--toastify-toast-top);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--top-right{top:var(--toastify-toast-top);right:var(--toastify-toast-right);align-items:end}.Toastify__toast-container--bottom-left{bottom:var(--toastify-toast-bottom);left:var(--toastify-toast-left)}.Toastify__toast-container--bottom-center{bottom:var(--toastify-toast-bottom);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--bottom-right{bottom:var(--toastify-toast-bottom);right:var(--toastify-toast-right);align-items:end}.Toastify__toast{--y: 0;position:relative;touch-action:none;width:var(--toastify-toast-width);min-height:var(--toastify-toast-min-height);box-sizing:border-box;margin-bottom:1rem;padding:var(--toastify-toast-padding);border-radius:var(--toastify-toast-bd-radius);box-shadow:var(--toastify-toast-shadow);max-height:var(--toastify-toast-max-height);font-family:var(--toastify-font-family);z-index:0;display:flex;flex:1 auto;align-items:center;word-break:break-word}@media only screen and (max-width: 480px){.Toastify__toast-container{width:100vw;left:env(safe-area-inset-left);margin:0}.Toastify__toast-container--top-left,.Toastify__toast-container--top-center,.Toastify__toast-container--top-right{top:env(safe-area-inset-top);transform:translate(0)}.Toastify__toast-container--bottom-left,.Toastify__toast-container--bottom-center,.Toastify__toast-container--bottom-right{bottom:env(safe-area-inset-bottom);transform:translate(0)}.Toastify__toast-container--rtl{right:env(safe-area-inset-right);left:initial}.Toastify__toast{--toastify-toast-width: 100%;margin-bottom:0;border-radius:0}}.Toastify__toast-container[data-stacked=true]{width:var(--toastify-toast-width)}.Toastify__toast--stacked{position:absolute;width:100%;transform:translate3d(0,var(--y),0) scale(var(--s));transition:transform .3s}.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,.Toastify__toast--stacked[data-collapsed] .Toastify__close-button{transition:opacity .1s}.Toastify__toast--stacked[data-collapsed=false]{overflow:visible}.Toastify__toast--stacked[data-collapsed=true]:not(:last-child)>*{opacity:0}.Toastify__toast--stacked:after{content:"";position:absolute;left:0;right:0;height:calc(var(--g) * 1px);bottom:100%}.Toastify__toast--stacked[data-pos=top]{top:0}.Toastify__toast--stacked[data-pos=bot]{bottom:0}.Toastify__toast--stacked[data-pos=bot].Toastify__toast--stacked:before{transform-origin:top}.Toastify__toast--stacked[data-pos=top].Toastify__toast--stacked:before{transform-origin:bottom}.Toastify__toast--stacked:before{content:"";position:absolute;left:0;right:0;bottom:0;height:100%;transform:scaleY(3);z-index:-1}.Toastify__toast--rtl{direction:rtl}.Toastify__toast--close-on-click{cursor:pointer}.Toastify__toast-icon{margin-inline-end:10px;width:22px;flex-shrink:0;display:flex}.Toastify--animate{animation-fill-mode:both;animation-duration:.5s}.Toastify--animate-icon{animation-fill-mode:both;animation-duration:.3s}.Toastify__toast-theme--dark{background:var(--toastify-color-dark);color:var(--toastify-text-color-dark)}.Toastify__toast-theme--light,.Toastify__toast-theme--colored.Toastify__toast--default{background:var(--toastify-color-light);color:var(--toastify-text-color-light)}.Toastify__toast-theme--colored.Toastify__toast--info{color:var(--toastify-text-color-info);background:var(--toastify-color-info)}.Toastify__toast-theme--colored.Toastify__toast--success{color:var(--toastify-text-color-success);background:var(--toastify-color-success)}.Toastify__toast-theme--colored.Toastify__toast--warning{color:var(--toastify-text-color-warning);background:var(--toastify-color-warning)}.Toastify__toast-theme--colored.Toastify__toast--error{color:var(--toastify-text-color-error);background:var(--toastify-color-error)}.Toastify__progress-bar-theme--light{background:var(--toastify-color-progress-light)}.Toastify__progress-bar-theme--dark{background:var(--toastify-color-progress-dark)}.Toastify__progress-bar--info{background:var(--toastify-color-progress-info)}.Toastify__progress-bar--success{background:var(--toastify-color-progress-success)}.Toastify__progress-bar--warning{background:var(--toastify-color-progress-warning)}.Toastify__progress-bar--error{background:var(--toastify-color-progress-error)}.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error{background:var(--toastify-color-transparent)}.Toastify__close-button{color:#fff;position:absolute;top:6px;right:6px;background:transparent;outline:none;border:none;padding:0;cursor:pointer;opacity:.7;transition:.3s ease;z-index:1}.Toastify__toast--rtl .Toastify__close-button{left:6px;right:unset}.Toastify__close-button--light{color:#000;opacity:.3}.Toastify__close-button>svg{fill:currentColor;height:16px;width:14px}.Toastify__close-button:hover,.Toastify__close-button:focus{opacity:1}@keyframes Toastify__trackProgress{0%{transform:scaleX(1)}to{transform:scaleX(0)}}.Toastify__progress-bar{position:absolute;bottom:0;left:0;width:100%;height:100%;z-index:1;opacity:.7;transform-origin:left}.Toastify__progress-bar--animated{animation:Toastify__trackProgress linear 1 forwards}.Toastify__progress-bar--controlled{transition:transform .2s}.Toastify__progress-bar--rtl{right:0;left:initial;transform-origin:right;border-bottom-left-radius:initial}.Toastify__progress-bar--wrp{position:absolute;overflow:hidden;bottom:0;left:0;width:100%;height:5px;border-bottom-left-radius:var(--toastify-toast-bd-radius);border-bottom-right-radius:var(--toastify-toast-bd-radius)}.Toastify__progress-bar--wrp[data-hidden=true]{opacity:0}.Toastify__progress-bar--bg{opacity:var(--toastify-color-progress-bgo);width:100%;height:100%}.Toastify__spinner{width:20px;height:20px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--toastify-spinner-color-empty-area);border-right-color:var(--toastify-spinner-color);animation:Toastify__spin .65s linear infinite}@keyframes Toastify__bounceInRight{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutRight{20%{opacity:1;transform:translate3d(-20px,var(--y),0)}to{opacity:0;transform:translate3d(2000px,var(--y),0)}}@keyframes Toastify__bounceInLeft{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutLeft{20%{opacity:1;transform:translate3d(20px,var(--y),0)}to{opacity:0;transform:translate3d(-2000px,var(--y),0)}}@keyframes Toastify__bounceInUp{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translateZ(0)}}@keyframes Toastify__bounceOutUp{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}@keyframes Toastify__bounceInDown{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:none}}@keyframes Toastify__bounceOutDown{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,2000px,0)}}.Toastify__bounce-enter--top-left,.Toastify__bounce-enter--bottom-left{animation-name:Toastify__bounceInLeft}.Toastify__bounce-enter--top-right,.Toastify__bounce-enter--bottom-right{animation-name:Toastify__bounceInRight}.Toastify__bounce-enter--top-center{animation-name:Toastify__bounceInDown}.Toastify__bounce-enter--bottom-center{animation-name:Toastify__bounceInUp}.Toastify__bounce-exit--top-left,.Toastify__bounce-exit--bottom-left{animation-name:Toastify__bounceOutLeft}.Toastify__bounce-exit--top-right,.Toastify__bounce-exit--bottom-right{animation-name:Toastify__bounceOutRight}.Toastify__bounce-exit--top-center{animation-name:Toastify__bounceOutUp}.Toastify__bounce-exit--bottom-center{animation-name:Toastify__bounceOutDown}@keyframes Toastify__zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes Toastify__zoomOut{0%{opacity:1}50%{opacity:0;transform:translate3d(0,var(--y),0) scale3d(.3,.3,.3)}to{opacity:0}}.Toastify__zoom-enter{animation-name:Toastify__zoomIn}.Toastify__zoom-exit{animation-name:Toastify__zoomOut}@keyframes Toastify__flipIn{0%{transform:perspective(400px) rotateX(90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotateX(-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotateX(10deg);opacity:1}80%{transform:perspective(400px) rotateX(-5deg)}to{transform:perspective(400px)}}@keyframes Toastify__flipOut{0%{transform:translate3d(0,var(--y),0) perspective(400px)}30%{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(-20deg);opacity:1}to{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(90deg);opacity:0}}.Toastify__flip-enter{animation-name:Toastify__flipIn}.Toastify__flip-exit{animation-name:Toastify__flipOut}@keyframes Toastify__slideInRight{0%{transform:translate3d(110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInLeft{0%{transform:translate3d(-110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInUp{0%{transform:translate3d(0,110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInDown{0%{transform:translate3d(0,-110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideOutRight{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(110%,var(--y),0)}}@keyframes Toastify__slideOutLeft{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(-110%,var(--y),0)}}@keyframes Toastify__slideOutDown{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,500px,0)}}@keyframes Toastify__slideOutUp{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,-500px,0)}}.Toastify__slide-enter--top-left,.Toastify__slide-enter--bottom-left{animation-name:Toastify__slideInLeft}.Toastify__slide-enter--top-right,.Toastify__slide-enter--bottom-right{animation-name:Toastify__slideInRight}.Toastify__slide-enter--top-center{animation-name:Toastify__slideInDown}.Toastify__slide-enter--bottom-center{animation-name:Toastify__slideInUp}.Toastify__slide-exit--top-left,.Toastify__slide-exit--bottom-left{animation-name:Toastify__slideOutLeft;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-right,.Toastify__slide-exit--bottom-right{animation-name:Toastify__slideOutRight;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-center{animation-name:Toastify__slideOutUp;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--bottom-center{animation-name:Toastify__slideOutDown;animation-timing-function:ease-in;animation-duration:.3s}@keyframes Toastify__spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
`);
  var it = (e) => typeof e == "number" && !isNaN(e),
    $e = (e) => typeof e == "string",
    Ne = (e) => typeof e == "function",
    _i = (e) => $e(e) || it(e),
    ur = (e) => ($e(e) || Ne(e) ? e : null),
    Ei = (e, t) => (e === !1 || (it(e) && e > 0) ? e : t),
    fr = (e) => _.isValidElement(e) || $e(e) || Ne(e) || it(e);
  function wi(e, t, r = 300) {
    let { scrollHeight: n, style: o } = e;
    requestAnimationFrame(() => {
      (o.minHeight = "initial"),
        (o.height = n + "px"),
        (o.transition = `all ${r}ms`),
        requestAnimationFrame(() => {
          (o.height = "0"),
            (o.padding = "0"),
            (o.margin = "0"),
            setTimeout(t, r);
        });
    });
  }
  function Ti({
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
              R.removeEventListener("animationend", y), n ? wi(R, f, o) : f();
            };
          d ||
            (u
              ? y()
              : ((b.current = 1),
                (R.className += ` ${T}`),
                R.addEventListener("animationend", y)));
        }, [d]),
        re.createElement(re.Fragment, null, a)
      );
    };
  }
  function $n(e, t) {
    return {
      content: Un(e.content, e.props),
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
  function Un(e, t, r = !1) {
    return _.isValidElement(e) && !$e(e.type)
      ? _.cloneElement(e, {
          closeToast: t.closeToast,
          toastProps: t,
          data: t.data,
          isPaused: r,
        })
      : Ne(e)
      ? e({
          closeToast: t.closeToast,
          toastProps: t,
          data: t.data,
          isPaused: r,
        })
      : e;
  }
  function xi({ closeToast: e, theme: t, ariaLabel: r = "close" }) {
    return re.createElement(
      "button",
      {
        className: `Toastify__close-button Toastify__close-button--${t}`,
        type: "button",
        onClick: (n) => {
          n.stopPropagation(), e(!0);
        },
        "aria-label": r,
      },
      re.createElement(
        "svg",
        { "aria-hidden": "true", viewBox: "0 0 14 16" },
        re.createElement("path", {
          fillRule: "evenodd",
          d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z",
        })
      )
    );
  }
  function Ri({
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
    let T = Me(
        "Toastify__progress-bar",
        s
          ? "Toastify__progress-bar--controlled"
          : "Toastify__progress-bar--animated",
        `Toastify__progress-bar-theme--${d}`,
        `Toastify__progress-bar--${n}`,
        { "Toastify__progress-bar--rtl": f }
      ),
      b = Ne(a) ? a({ rtl: f, type: n, defaultClassName: T }) : Me(T, a),
      R = {
        [s && u >= 1 ? "onTransitionEnd" : "onAnimationEnd"]:
          s && u < 1
            ? null
            : () => {
                l && r();
              },
      };
    return re.createElement(
      "div",
      { className: "Toastify__progress-bar--wrp", "data-hidden": h },
      re.createElement("div", {
        className: `Toastify__progress-bar--bg Toastify__progress-bar-theme--${d} Toastify__progress-bar--${n}`,
      }),
      re.createElement("div", {
        role: "progressbar",
        "aria-hidden": h ? "true" : "false",
        "aria-label": "notification timer",
        className: b,
        style: m,
        ...R,
      })
    );
  }
  var Si = 1,
    Fn = () => `${Si++}`;
  function Ci(e, t, r) {
    let n = 1,
      o = 0,
      a = [],
      s = [],
      u = t,
      f = new Map(),
      l = new Set(),
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
          r($n(v, j ? "added" : "updated")),
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
          className: ur(A.className || u.toastClassName),
          progressClassName: ur(A.progressClassName || u.progressClassName),
          autoClose: A.isLoading ? !1 : Ei(A.autoClose, u.autoClose),
          closeToast(V) {
            (f.get(L).removalReason = V), R(L);
          },
          deleteToast() {
            let V = f.get(L);
            if (V != null) {
              if (
                (r($n(V, "removed")),
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
          A.closeButton === !1 || fr(A.closeButton)
            ? (ee.closeButton = A.closeButton)
            : A.closeButton === !0 &&
              (ee.closeButton = fr(u.closeButton) ? u.closeButton : !0);
        let ne = { content: v, props: ee, staleId: j };
        u.limit && u.limit > 0 && o > u.limit && z
          ? a.push(ne)
          : it(H)
          ? setTimeout(() => {
              C(ne);
            }, H)
          : C(ne);
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
  var me = new Map(),
    lt = [],
    dr = new Set(),
    Ai = (e) => dr.forEach((t) => t(e)),
    Bn = () => me.size > 0;
  function Oi() {
    lt.forEach((e) => zn(e.content, e.options)), (lt = []);
  }
  var Ni = (e, { containerId: t }) => {
    var r;
    return (r = me.get(t || 1)) == null ? void 0 : r.toasts.get(e);
  };
  function Hn(e, t) {
    var r;
    if (t) return !!((r = me.get(t)) != null && r.isToastActive(e));
    let n = !1;
    return (
      me.forEach((o) => {
        o.isToastActive(e) && (n = !0);
      }),
      n
    );
  }
  function ji(e) {
    if (!Bn()) {
      lt = lt.filter((t) => e != null && t.options.toastId !== e);
      return;
    }
    if (e == null || _i(e))
      me.forEach((t) => {
        t.removeToast(e);
      });
    else if (e && ("containerId" in e || "id" in e)) {
      let t = me.get(e.containerId);
      t
        ? t.removeToast(e.id)
        : me.forEach((r) => {
            r.removeToast(e.id);
          });
    }
  }
  var ki = (e = {}) => {
    me.forEach((t) => {
      t.props.limit &&
        (!e.containerId || t.id === e.containerId) &&
        t.clearQueue();
    });
  };
  function zn(e, t) {
    fr(e) &&
      (Bn() || lt.push({ content: e, options: t }),
      me.forEach((r) => {
        r.buildToast(e, t);
      }));
  }
  function Li(e) {
    var t;
    (t = me.get(e.containerId || 1)) == null || t.setToggle(e.id, e.fn);
  }
  function qn(e, t) {
    me.forEach((r) => {
      (t == null || !(t != null && t.containerId) || t?.containerId === r.id) &&
        r.toggle(e, t?.id);
    });
  }
  function Pi(e) {
    let t = e.containerId || 1;
    return {
      subscribe(r) {
        let n = Ci(t, e, Ai);
        me.set(t, n);
        let o = n.observe(r);
        return (
          Oi(),
          () => {
            o(), me.delete(t);
          }
        );
      },
      setProps(r) {
        var n;
        (n = me.get(t)) == null || n.setProps(r);
      },
      getSnapshot() {
        var r;
        return (r = me.get(t)) == null ? void 0 : r.getSnapshot();
      },
    };
  }
  function Di(e) {
    return (
      dr.add(e),
      () => {
        dr.delete(e);
      }
    );
  }
  function Ii(e) {
    return e && ($e(e.toastId) || it(e.toastId)) ? e.toastId : Fn();
  }
  function ct(e, t) {
    return zn(e, t), t.toastId;
  }
  function Pt(e, t) {
    return { ...t, type: (t && t.type) || e, toastId: Ii(t) };
  }
  function Dt(e) {
    return (t, r) => ct(t, Pt(e, r));
  }
  function D(e, t) {
    return ct(e, Pt("default", t));
  }
  D.loading = (e, t) =>
    ct(
      e,
      Pt("default", {
        isLoading: !0,
        autoClose: !1,
        closeOnClick: !1,
        closeButton: !1,
        draggable: !1,
        ...t,
      })
    );
  function Mi(e, { pending: t, error: r, success: n }, o) {
    let a;
    t && (a = $e(t) ? D.loading(t, o) : D.loading(t.render, { ...o, ...t }));
    let s = {
        isLoading: null,
        autoClose: null,
        closeOnClick: null,
        closeButton: null,
        draggable: null,
      },
      u = (l, d, h) => {
        if (d == null) {
          D.dismiss(a);
          return;
        }
        let m = { type: l, ...s, ...o, data: h },
          T = $e(d) ? { render: d } : d;
        return a ? D.update(a, { ...m, ...T }) : D(T.render, { ...m, ...T }), h;
      },
      f = Ne(e) ? e() : e;
    return f.then((l) => u("success", n, l)).catch((l) => u("error", r, l)), f;
  }
  (D.promise = Mi),
    (D.success = Dt("success")),
    (D.info = Dt("info")),
    (D.error = Dt("error")),
    (D.warning = Dt("warning")),
    (D.warn = D.warning),
    (D.dark = (e, t) => ct(e, Pt("default", { theme: "dark", ...t })));
  function $i(e) {
    ji(e);
  }
  (D.dismiss = $i),
    (D.clearWaitingQueue = ki),
    (D.isActive = Hn),
    (D.update = (e, t = {}) => {
      let r = Ni(e, t);
      if (r) {
        let { props: n, content: o } = r,
          a = {
            delay: 100,
            ...n,
            ...t,
            toastId: t.toastId || e,
            updateId: Fn(),
          };
        a.toastId !== e && (a.staleId = e);
        let s = a.render || o;
        delete a.render, ct(s, a);
      }
    }),
    (D.done = (e) => {
      D.update(e, { progress: 1 });
    }),
    (D.onChange = Di),
    (D.play = (e) => qn(!0, e)),
    (D.pause = (e) => qn(!1, e));
  function Ui(e) {
    var t;
    let { subscribe: r, getSnapshot: n, setProps: o } = _.useRef(Pi(e)).current;
    o(e);
    let a = (t = _.useSyncExternalStore(r, n, n)) == null ? void 0 : t.slice();
    function s(u) {
      if (!a) return [];
      let f = new Map();
      return (
        e.newestOnTop && a.reverse(),
        a.forEach((l) => {
          let { position: d } = l.props;
          f.has(d) || f.set(d, []), f.get(d).push(l);
        }),
        Array.from(f, (l) => u(l[0], l[1]))
      );
    }
    return { getToastToRender: s, isToastActive: Hn, count: a?.length };
  }
  function Fi(e) {
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
    Li({ id: e.toastId, containerId: e.containerId, fn: r }),
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
        right: ne,
      } = a.current.getBoundingClientRect();
      j.nativeEvent.type !== "touchend" &&
      e.pauseOnHover &&
      j.clientX >= ee &&
      j.clientX <= ne &&
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
  var Bi = typeof window < "u" ? _.useLayoutEffect : _.useEffect,
    It = ({ theme: e, type: t, isLoading: r, ...n }) =>
      re.createElement("svg", {
        viewBox: "0 0 24 24",
        width: "100%",
        height: "100%",
        fill:
          e === "colored" ? "currentColor" : `var(--toastify-icon-color-${t})`,
        ...n,
      });
  function Hi(e) {
    return re.createElement(
      It,
      { ...e },
      re.createElement("path", {
        d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z",
      })
    );
  }
  function zi(e) {
    return re.createElement(
      It,
      { ...e },
      re.createElement("path", {
        d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z",
      })
    );
  }
  function qi(e) {
    return re.createElement(
      It,
      { ...e },
      re.createElement("path", {
        d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z",
      })
    );
  }
  function Vi(e) {
    return re.createElement(
      It,
      { ...e },
      re.createElement("path", {
        d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z",
      })
    );
  }
  function Wi() {
    return re.createElement("div", { className: "Toastify__spinner" });
  }
  var pr = { info: zi, warning: Hi, success: qi, error: Vi, spinner: Wi },
    Yi = (e) => e in pr;
  function Gi({ theme: e, type: t, isLoading: r, icon: n }) {
    let o = null,
      a = { theme: e, type: t };
    return (
      n === !1 ||
        (Ne(n)
          ? (o = n({ ...a, isLoading: r }))
          : _.isValidElement(n)
          ? (o = _.cloneElement(n, a))
          : r
          ? (o = pr.spinner())
          : Yi(t) && (o = pr[t](a))),
      o
    );
  }
  var Ki = (e) => {
      let {
          isRunning: t,
          preventExitTransition: r,
          toastRef: n,
          eventHandlers: o,
          playToast: a,
        } = Fi(e),
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
          theme: ne,
          ariaLabel: V,
        } = e,
        se = Me(
          "Toastify__toast",
          `Toastify__toast-theme--${ne}`,
          `Toastify__toast--${d}`,
          { "Toastify__toast--rtl": $ },
          { "Toastify__toast--close-on-click": ee }
        ),
        te = Ne(R)
          ? R({ rtl: $, position: b, type: d, defaultClassName: se })
          : Me(se, R),
        le = Gi(e),
        K = !!L || !f,
        ce = { closeToast: m, type: d, theme: ne },
        ae = null;
      return (
        s === !1 ||
          (Ne(s)
            ? (ae = s(ce))
            : _.isValidElement(s)
            ? (ae = _.cloneElement(s, ce))
            : (ae = xi(ce))),
        re.createElement(
          T,
          {
            isIn: H,
            done: j,
            position: b,
            preventExitTransition: r,
            nodeRef: n,
            playToast: a,
          },
          re.createElement(
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
              re.createElement(
                "div",
                {
                  className: Me("Toastify__toast-icon", {
                    "Toastify--animate-icon Toastify__zoom-enter": !z,
                  }),
                },
                le
              ),
            Un(u, e, !t),
            ae,
            !e.customProgressBar &&
              re.createElement(Ri, {
                ...(v && !K ? { key: `p-${v}` } : {}),
                rtl: $,
                theme: ne,
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
    Ji = (e, t = !1) => ({
      enter: `Toastify--animate Toastify__${e}-enter`,
      exit: `Toastify--animate Toastify__${e}-exit`,
      appendPosition: t,
    }),
    Xi = Ti(Ji("bounce", !0)),
    Qi = {
      position: "top-right",
      transition: Xi,
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
  function Vn(e) {
    let t = { ...Qi, ...e },
      r = e.stacked,
      [n, o] = _.useState(!0),
      a = _.useRef(null),
      { getToastToRender: s, isToastActive: u, count: f } = Ui(t),
      { className: l, style: d, rtl: h, containerId: m, hotKeys: T } = t;
    function b(y) {
      let C = Me(
        "Toastify__toast-container",
        `Toastify__toast-container--${y}`,
        { "Toastify__toast-container--rtl": h }
      );
      return Ne(l)
        ? l({ position: y, rtl: h, defaultClassName: C })
        : Me(C, ur(l));
    }
    function R() {
      r && (o(!0), D.play());
    }
    return (
      Bi(() => {
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
            D.pause()),
            C.key === "Escape" &&
              (document.activeElement === A ||
                (A != null && A.contains(document.activeElement))) &&
              (o(!0), D.play());
        }
        return (
          document.addEventListener("keydown", y),
          () => {
            document.removeEventListener("keydown", y);
          }
        );
      }, [T]),
      re.createElement(
        "section",
        {
          ref: a,
          className: "Toastify",
          id: m,
          onMouseEnter: () => {
            r && (o(!1), D.pause());
          },
          onMouseLeave: R,
          "aria-live": "polite",
          "aria-atomic": "false",
          "aria-relevant": "additions text",
          "aria-label": t["aria-label"],
        },
        s((y, C) => {
          let v = C.length ? { ...d } : { ...d, pointerEvents: "none" };
          return re.createElement(
            "div",
            {
              tabIndex: -1,
              className: b(y),
              "data-stacked": r,
              style: v,
              key: `c-${y}`,
            },
            C.map(({ content: A, props: L }) =>
              re.createElement(
                Ki,
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
  function Wn({ page: e, perPage: t, totalItems: r, onPageChange: n }) {
    const o = Math.max(1, Math.ceil(r / t)),
      a = e > 1,
      s = e < o,
      u = Math.max(1, e - 2),
      f = Math.min(o, u + 4),
      l = [];
    for (let m = u; m <= f; m++) l.push(m);
    const d = r === 0 ? 0 : (e - 1) * t + 1,
      h = Math.min(e * t, r);
    return p.jsxs("div", {
      className: "pagination",
      children: [
        p.jsx("div", {
          className: "pagination__meta",
          children:
            r > 0
              ? p.jsxs("span", {
                  children: ["Affiche ", d, "–", h, " sur ", r],
                })
              : p.jsx("span", { children: "Aucun élément" }),
        }),
        p.jsxs("div", {
          className: "pagination__controls",
          children: [
            p.jsx("button", {
              className: "btn ghost",
              disabled: !a,
              onClick: () => a && n(e - 1),
              children: "Précédent",
            }),
            p.jsx("div", {
              className: "pagination__pages",
              children: l.map((m) =>
                p.jsx(
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
            p.jsx("button", {
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
  const Yn = "apiToken";
  function Se() {
    return localStorage.getItem(Yn) || "";
  }
  function Mt() {
    localStorage.removeItem(Yn);
  }
  const Zi =
      "https://dev-api-bcibank.ecash-guinee.com/api/getListeAlerteConfig",
    el = "https://dev-api-bcibank.ecash-guinee.com/api/addAlerteConfig",
    tl = "https://dev-api-bcibank.ecash-guinee.com/api/UpdateAlerteConfig",
    rl = "https://dev-api-bcibank.ecash-guinee.com/api/getListNieauDurgence",
    nl = "https://dev-api-bcibank.ecash-guinee.com/api/getListeGroupeAlert",
    ol = "https://dev-api-bcibank.ecash-guinee.com/api/getListeModule",
    al = "https://dev-api-bcibank.ecash-guinee.com/api/activeOrDesactiveAlert";
  function sl() {
    const [e, t] = _.useState([]),
      [r, n] = _.useState(""),
      [o, a] = _.useState(!1),
      s = Yt(),
      [u, f] = _.useState(null),
      [l, d] = _.useState(1),
      h = 4,
      [m, T] = _.useState(!1),
      [b, R] = _.useState(!1),
      [y, C] = _.useState(Kn()),
      [v, A] = _.useState(il()),
      [L, $] = _.useState([]),
      [q, j] = _.useState([]),
      [H, z] = _.useState([]),
      [ee, ne] = _.useState(!1),
      V = _.useRef(null),
      se = _.useRef("");
    _.useEffect(() => {
      const g = X.interceptors.response.use(
        (O) => (
          (O?.status === 401 ||
            O?.data?.status === 401 ||
            String(O?.data?.message || "")
              .toLowerCase()
              .includes("unauthenticated")) &&
            (Mt(),
            D.error("Session expirée. Veuillez vous reconnecter."),
            s("/login", { replace: !0 })),
          O
        ),
        (O) => (
          (O?.response?.status === 401 ||
            String(O?.response?.data?.message || "")
              .toLowerCase()
              .includes("unauthenticated")) &&
            (Mt(),
            D.error("Session expirée. Veuillez vous reconnecter."),
            s("/login", { replace: !0 })),
          Promise.reject(O)
        )
      );
      return () => X.interceptors.response.eject(g);
    }, [s]);
    const te = async () => {
      a(!0);
      try {
        const g = Se(),
          O = await X.get(Zi, {
            headers: {
              Authorization: `Bearer ${g}`,
              Accept: "application/json",
            },
            validateStatus: () => !0,
          });
        if (
          (console.log("Réponse API (LIST):", O.status, O.data),
          O.status === 200)
        ) {
          const M = Array.isArray(O.data?.data) ? O.data.data : [];
          t(M), d(1);
        } else t([]);
      } catch (g) {
        console.error("Erreur LIST:", g?.message || g),
          console.error("Code HTTP:", g?.response?.status),
          console.error("Réponse serveur:", g?.response?.data),
          t([]),
          D.error(
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
        const g = Se();
        ne(!0);
        let O = [],
          M = [],
          U = [];
        try {
          const F = {
              Authorization: `Bearer ${g}`,
              Accept: "application/json",
            },
            [oe, we, Ue] = await Promise.allSettled([
              X.get(rl, { headers: F, validateStatus: () => !0 }),
              X.get(nl, { headers: F, validateStatus: () => !0 }),
              X.get(ol, { headers: F, validateStatus: () => !0 }),
            ]);
          oe.status === "fulfilled" && oe.value.status === 200
            ? ((O = Array.isArray(oe.value.data?.data)
                ? oe.value.data.data
                : []),
              $(O))
            : ($([]), D.warn("Liste niveaux indisponible")),
            we.status === "fulfilled" && we.value.status === 200
              ? ((M = Array.isArray(we.value.data?.data)
                  ? we.value.data.data
                  : []),
                j(M))
              : (j([]), D.warn("Liste groupes indisponible")),
            Ue.status === "fulfilled" && Ue.value.status === 200
              ? ((U = Array.isArray(Ue.value.data?.data)
                  ? Ue.value.data.data
                  : []),
                z(U))
              : (z([]), D.warn("Liste modules indisponible"));
        } catch (F) {
          console.error(F), $([]), j([]), z([]);
        } finally {
          ne(!1);
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
        D.info("Aucun résultat pour votre recherche.", { autoClose: 1200 })),
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
      he = async () => {
        C(Kn()), await le(), T(!0);
      },
      ye = () => T(!1),
      c = async (g) => {
        const { nivArr: O, modArr: M } = await le(),
          U =
            O.find((oe) => oe.vcDescription === g.niveauDurgence)?.id ||
            L.find((oe) => oe.vcDescription === g.niveauDurgence)?.id ||
            "",
          F =
            M.find((oe) => oe.vcName === g.moduleConcerne)?.id ||
            H.find((oe) => oe.vcName === g.moduleConcerne)?.id ||
            "";
        A({
          id: g.id ?? "",
          statusAlert: g.statusAlert ?? "1",
          messageAlerte: g.messageAlerte ?? "",
          idNiveauUrgence: U,
          idModule: F,
          niveauDurgence: g.niveauDurgence ?? "",
          moduleConcerne: g.moduleConcerne ?? "",
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
        const O = ll(y);
        if (O.length) {
          D.warn(O.join(" · "));
          return;
        }
        const M = {
            message: y.messageAlerte,
            idNiveauUrgence: y.idNiveauUrgence,
            typeAlerte: y.typeAlert,
            groupeConcerne: y.groupeConcerne,
            description: y.vcDescription,
            limiteDeclenchement: y.limiteDeclenchementAlerte,
            idModule: y.idModule,
          },
          U = D.loading("Ajout en cours…");
        try {
          const F = Se(),
            oe = await X.post(el, null, {
              headers: {
                Authorization: `Bearer ${F}`,
                Accept: "application/json",
              },
              params: M,
              validateStatus: () => !0,
            });
          console.log("Réponse API (ADD):", oe.status, oe.data),
            oe.status === 200
              ? (D.update(U, {
                  render: "Alerte ajoutée avec succès",
                  type: "success",
                  isLoading: !1,
                  autoClose: 1200,
                }),
                T(!1),
                await te(),
                d(1))
              : (D.update(U, {
                  render: `Échec de l’ajout [${oe.status}]`,
                  type: "error",
                  isLoading: !1,
                  autoClose: 2e3,
                }),
                oe.data?.message && D.error(String(oe.data.message)));
        } catch (F) {
          console.error("Erreur ADD:", F?.message || F),
            console.error("Code HTTP:", F?.response?.status),
            console.error("Réponse serveur:", F?.response?.data),
            D.update(U, {
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
        const O = cl(v);
        if (O.length) {
          D.warn(O.join(" · "));
          return;
        }
        const M = {
            message: v.messageAlerte,
            idNiveauUrgence: v.idNiveauUrgence,
            typeAlerte: v.typeAlert,
            groupeConcerne: v.groupeConcerne,
            description: v.vcDescription,
            limiteDeclenchement: v.limiteDeclenchementAlerte,
            idModule: v.idModule,
            id: v.id,
            idAlerte: v.id,
          },
          U = D.loading("Modification en cours…");
        try {
          const F = Se(),
            oe = await X.post(tl, null, {
              headers: {
                Authorization: `Bearer ${F}`,
                Accept: "application/json",
              },
              params: M,
              validateStatus: () => !0,
            });
          console.log("Réponse API (UPDATE):", oe.status, oe.data),
            oe.status === 200
              ? (D.update(U, {
                  render: "Alerte modifiée avec succès",
                  type: "success",
                  isLoading: !1,
                  autoClose: 1200,
                }),
                R(!1),
                await te())
              : (D.update(U, {
                  render: `Échec de la modification [${oe.status}]`,
                  type: "error",
                  isLoading: !1,
                  autoClose: 2e3,
                }),
                oe.data?.message && D.error(String(oe.data.message)));
        } catch (F) {
          console.error("Erreur UPDATE:", F?.message || F),
            console.error("Code HTTP:", F?.response?.status),
            console.error("Réponse serveur:", F?.response?.data),
            D.update(U, {
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
          M = Se();
        f(g.id);
        const U = D.loading(
          O === "1" ? "Activation en cours…" : "Désactivation en cours…"
        );
        try {
          const F = await X.post(al, null, {
            headers: {
              Authorization: `Bearer ${M}`,
              Accept: "application/json",
            },
            params: { idAlert: g.id, btEnableAlert: O },
            validateStatus: () => !0,
          });
          console.log("Réponse API (TOGGLE):", F.status, F.data),
            F.status === 200
              ? (t((oe) =>
                  oe.map((we) =>
                    String(we.id) === String(g.id)
                      ? { ...we, statusAlert: O }
                      : we
                  )
                ),
                D.update(U, {
                  render: O === "1" ? "Alerte activée" : "Alerte désactivée",
                  type: "success",
                  isLoading: !1,
                  autoClose: 1200,
                }))
              : (D.update(U, {
                  render: `Échec ${
                    O === "1" ? "d’activation" : "de désactivation"
                  } [${F.status}]`,
                  type: "error",
                  isLoading: !1,
                  autoClose: 2200,
                }),
                F.data?.message && D.error(String(F.data.message)));
        } catch (F) {
          console.error("Erreur TOGGLE:", F?.message || F),
            console.error("Code HTTP:", F?.response?.status),
            console.error("Réponse serveur:", F?.response?.data),
            D.update(U, {
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
            : hr(e.map((g) => g.niveauDurgence).filter(Boolean)),
        [L, e]
      ),
      _.useMemo(
        () =>
          q.length
            ? q.map((g) => g.vcGroup)
            : hr(e.map((g) => g.groupeConcerne).filter(Boolean)),
        [q, e]
      ),
      _.useMemo(
        () =>
          H.length
            ? H.map((g) => g.vcName)
            : hr(e.map((g) => g.moduleConcerne).filter(Boolean)),
        [H, e]
      ),
      p.jsxs("div", {
        className: "wrap",
        children: [
          p.jsx(Vn, { position: "top-right", theme: "colored" }),
          p.jsxs("header", {
            className: "topbar",
            children: [
              p.jsxs("div", {
                className: "brand",
                children: [
                  p.jsx("span", { className: "dot" }),
                  p.jsx("h1", { children: "Centre d'alerte" }),
                ],
              }),
              p.jsx("div", {
                className: "actions",
                children: p.jsx("button", {
                  className: "btn primary",
                  onClick: he,
                  disabled: o,
                  children: "Ajouter une alerte",
                }),
              }),
            ],
          }),
          p.jsxs("section", {
            className: "toolbar",
            children: [
              p.jsxs("div", {
                className: "search",
                children: [
                  p.jsx("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    "aria-hidden": !0,
                    children: p.jsx("path", {
                      fill: "currentColor",
                      d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
                    }),
                  }),
                  p.jsx("input", {
                    ref: V,
                    placeholder: "Rechercher (message, type, groupe, module…)",
                    value: r,
                    onChange: (g) => {
                      n(g.target.value), d(1);
                    },
                  }),
                ],
              }),
              p.jsx("div", {
                className: "stats",
                children: p.jsxs("span", {
                  className: "badge",
                  children: ["Total: ", e.length],
                }),
              }),
            ],
          }),
          p.jsxs("div", {
            className: "card",
            children: [
              p.jsx("div", {
                className: "table-wrap",
                children: p.jsxs("table", {
                  className: "tbl",
                  children: [
                    p.jsx("thead", {
                      children: p.jsxs("tr", {
                        children: [
                          p.jsx("th", { children: "ID" }),
                          p.jsx("th", { children: "Message" }),
                          p.jsx("th", { children: "Statut" }),
                          p.jsx("th", { children: "Niveau d’urgence" }),
                          p.jsx("th", { children: "Type" }),
                          p.jsx("th", { children: "Groupe" }),
                          p.jsx("th", { children: "Description" }),
                          p.jsx("th", { children: "Seuil" }),
                          p.jsx("th", { children: "Module" }),
                          p.jsx("th", {
                            style: { width: 120 },
                            children: "Actions",
                          }),
                        ],
                      }),
                    }),
                    p.jsx("tbody", {
                      children:
                        ae.length === 0
                          ? p.jsx("tr", {
                              children: p.jsx("td", {
                                colSpan: 11,
                                className: "empty",
                                children: "—",
                              }),
                            })
                          : ae.map((g) =>
                              p.jsxs(
                                "tr",
                                {
                                  children: [
                                    p.jsx("td", { children: g.id }),
                                    p.jsx("td", {
                                      className: "w-clip",
                                      children: p.jsx("div", {
                                        className: "title-cell",
                                        children: p.jsx("span", {
                                          className: "title-text",
                                          children: g.messageAlerte ?? "—",
                                        }),
                                      }),
                                    }),
                                    p.jsx("td", {
                                      children: p.jsx("span", {
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
                                    p.jsx("td", {
                                      children: p.jsx("span", {
                                        className: "muted",
                                        children: g.niveauDurgence ?? "—",
                                      }),
                                    }),
                                    p.jsx("td", {
                                      children: g.typeAlert ?? "—",
                                    }),
                                    p.jsx("td", {
                                      children: g.groupeConcerne ?? "—",
                                    }),
                                    p.jsx("td", {
                                      className: "w-clip",
                                      children: p.jsx("span", {
                                        className: "muted",
                                        children: g.vcDescription ?? "—",
                                      }),
                                    }),
                                    p.jsx("td", {
                                      children:
                                        g.limiteDeclenchementAlerte ?? "—",
                                    }),
                                    p.jsx("td", {
                                      children: g.moduleConcerne ?? "—",
                                    }),
                                    p.jsx("td", {
                                      children: p.jsxs("div", {
                                        className: "row-actions",
                                        children: [
                                          p.jsx("button", {
                                            className: "btn ghost",
                                            title: "Modifier",
                                            "aria-label": "Modifier",
                                            onClick: () => c(g),
                                            children: p.jsx("svg", {
                                              width: "18",
                                              height: "18",
                                              viewBox: "0 0 24 24",
                                              "aria-hidden": !0,
                                              children: p.jsx("path", {
                                                fill: "currentColor",
                                                d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z",
                                              }),
                                            }),
                                          }),
                                          p.jsx("button", {
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
                                                ? p.jsx("svg", {
                                                    width: "18",
                                                    height: "18",
                                                    viewBox: "0 0 24 24",
                                                    "aria-hidden": !0,
                                                    children: p.jsx("path", {
                                                      fill: "currentColor",
                                                      d: "M12 17a2 2 0 100-4 2 2 0 000 4zm6-7h-1V7a5 5 0 10-10 0h2a3 3 0 116 0v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2z",
                                                    }),
                                                  })
                                                : p.jsx("svg", {
                                                    width: "18",
                                                    height: "18",
                                                    viewBox: "0 0 24 24",
                                                    "aria-hidden": !0,
                                                    children: p.jsx("path", {
                                                      fill: "currentColor",
                                                      d: "M12 17a2 2 0 100-4 2 2 0 000 4zm6-7h-1V7a5 5 0 10-10 0v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2zm-9-3a3 3 0 116 0v3H9V7z",
                                                    }),
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
              p.jsx(Wn, {
                page: l,
                perPage: h,
                totalItems: K.length,
                onPageChange: d,
              }),
            ],
          }),
          m &&
            p.jsx(Gn, {
              title: "Ajouter une alerte" + (ee ? " (chargement…)" : ""),
              onClose: ye,
              children: p.jsxs("form", {
                className: "form",
                onSubmit: P,
                children: [
                  p.jsxs("div", {
                    className: "grid",
                    children: [
                      p.jsxs("label", {
                        className: "full",
                        children: [
                          p.jsx("span", { children: "Message de l’alerte" }),
                          p.jsx("input", {
                            autoFocus: !0,
                            value: y.messageAlerte,
                            onChange: (g) =>
                              C({ ...y, messageAlerte: g.target.value }),
                            placeholder:
                              "Ex: Trop de transactions en attentes en 1h",
                          }),
                        ],
                      }),
                      p.jsx(qe, {
                        label: "Niveau d’urgence",
                        value: y.idNiveauUrgence,
                        setValue: (g) => C({ ...y, idNiveauUrgence: g }),
                        options: L,
                        placeholder: "Sélectionner…",
                        getValue: (g) => g.id,
                        getLabel: (g) => g.vcDescription,
                      }),
                      p.jsxs("label", {
                        children: [
                          p.jsx("span", { children: "Type d’alerte" }),
                          p.jsxs("select", {
                            value: y.typeAlert,
                            onChange: (g) =>
                              C({ ...y, typeAlert: g.target.value }),
                            children: [
                              p.jsx("option", {
                                value: "",
                                children: "Sélectionner…",
                              }),
                              p.jsx("option", {
                                value: "URGENT",
                                children: "URGENT",
                              }),
                              p.jsx("option", {
                                value: "INFO",
                                children: "INFO",
                              }),
                            ],
                          }),
                        ],
                      }),
                      p.jsx(qe, {
                        label: "Groupe concerné",
                        value: y.groupeConcerne,
                        setValue: (g) => C({ ...y, groupeConcerne: g }),
                        options: q,
                        placeholder: "Sélectionner…",
                        getValue: (g) => g.vcGroup,
                        getLabel: (g) => g.vcGroup,
                      }),
                      p.jsx(qe, {
                        label: "Module concerné",
                        value: y.idModule,
                        setValue: (g) => C({ ...y, idModule: g }),
                        options: H,
                        placeholder: "Sélectionner…",
                        getValue: (g) => g.id,
                        getLabel: (g) => g.vcName,
                      }),
                      p.jsxs("label", {
                        children: [
                          p.jsx("span", {
                            children: "Seuil pour déclencher l’alerte",
                          }),
                          p.jsx("input", {
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
                      p.jsxs("label", {
                        className: "full",
                        children: [
                          p.jsx("span", { children: "Description" }),
                          p.jsx("textarea", {
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
                  p.jsxs("div", {
                    className: "modal-actions",
                    children: [
                      p.jsx("button", {
                        type: "button",
                        className: "btn ghost",
                        onClick: ye,
                        children: "Annuler",
                      }),
                      p.jsx("button", {
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
            p.jsx(Gn, {
              title: "Modifier l’alerte",
              onClose: S,
              children: p.jsxs("form", {
                className: "form",
                onSubmit: E,
                children: [
                  p.jsxs("div", {
                    className: "grid",
                    children: [
                      p.jsxs("label", {
                        className: "full",
                        children: [
                          p.jsx("span", { children: "Message de l’alerte" }),
                          p.jsx("input", {
                            autoFocus: !0,
                            value: v.messageAlerte,
                            onChange: (g) =>
                              A({ ...v, messageAlerte: g.target.value }),
                          }),
                        ],
                      }),
                      L?.length
                        ? p.jsx(qe, {
                            label: "Niveau d’urgence",
                            value: v.idNiveauUrgence,
                            setValue: (g) => A({ ...v, idNiveauUrgence: g }),
                            options: L,
                            placeholder: "Sélectionner…",
                            getValue: (g) => g.id,
                            getLabel: (g) => g.vcDescription,
                          })
                        : p.jsxs("label", {
                            children: [
                              p.jsx("span", { children: "Niveau d’urgence" }),
                              p.jsx("input", {
                                value: v.niveauDurgence,
                                onChange: (g) =>
                                  A({ ...v, niveauDurgence: g.target.value }),
                              }),
                            ],
                          }),
                      p.jsxs("label", {
                        children: [
                          p.jsx("span", { children: "Type d’alerte" }),
                          p.jsxs("select", {
                            value: v.typeAlert,
                            onChange: (g) =>
                              A({ ...v, typeAlert: g.target.value }),
                            children: [
                              p.jsx("option", {
                                value: "",
                                children: "Sélectionner…",
                              }),
                              p.jsx("option", {
                                value: "URGENT",
                                children: "URGENT",
                              }),
                              p.jsx("option", {
                                value: "INFO",
                                children: "INFO",
                              }),
                            ],
                          }),
                        ],
                      }),
                      q?.length
                        ? p.jsx(qe, {
                            label: "Groupe concerné",
                            value: v.groupeConcerne,
                            setValue: (g) => A({ ...v, groupeConcerne: g }),
                            options: q,
                            placeholder: "Sélectionner…",
                            getValue: (g) => g.vcGroup,
                            getLabel: (g) => g.vcGroup,
                          })
                        : p.jsxs("label", {
                            children: [
                              p.jsx("span", { children: "Groupe concerné" }),
                              p.jsx("input", {
                                value: v.groupeConcerne,
                                onChange: (g) =>
                                  A({ ...v, groupeConcerne: g.target.value }),
                              }),
                            ],
                          }),
                      H?.length
                        ? p.jsx(qe, {
                            label: "Module concerné",
                            value: v.idModule,
                            setValue: (g) => A({ ...v, idModule: g }),
                            options: H,
                            placeholder: "Sélectionner…",
                            getValue: (g) => g.id,
                            getLabel: (g) => g.vcName,
                          })
                        : p.jsxs("label", {
                            children: [
                              p.jsx("span", { children: "Module concerné" }),
                              p.jsx("input", {
                                value: v.moduleConcerne,
                                onChange: (g) =>
                                  A({ ...v, moduleConcerne: g.target.value }),
                              }),
                            ],
                          }),
                      p.jsxs("label", {
                        children: [
                          p.jsx("span", {
                            children: "Seuil pour déclencher l’alerte",
                          }),
                          p.jsx("input", {
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
                      p.jsxs("label", {
                        className: "full",
                        children: [
                          p.jsx("span", { children: "Description" }),
                          p.jsx("textarea", {
                            rows: 3,
                            value: v.vcDescription,
                            onChange: (g) =>
                              A({ ...v, vcDescription: g.target.value }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  p.jsxs("div", {
                    className: "modal-actions",
                    children: [
                      p.jsx("button", {
                        type: "button",
                        className: "btn ghost",
                        onClick: S,
                        children: "Annuler",
                      }),
                      p.jsx("button", {
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
  function qe({
    label: e,
    value: t,
    setValue: r,
    options: n,
    placeholder: o = "Sélectionner…",
    getValue: a,
    getLabel: s,
  }) {
    return !n || n.length === 0
      ? p.jsxs("label", {
          children: [
            p.jsx("span", { children: e }),
            p.jsx("input", {
              value: t,
              onChange: (u) => r(u.target.value),
              placeholder: o,
            }),
          ],
        })
      : p.jsxs("label", {
          children: [
            p.jsx("span", { children: e }),
            p.jsxs("select", {
              value: t,
              onChange: (u) => r(u.target.value),
              children: [
                p.jsx("option", { value: "", children: o }),
                n.map((u) =>
                  p.jsx("option", { value: a(u), children: s(u) }, a(u))
                ),
              ],
            }),
          ],
        });
  }
  function Gn({ title: e, children: t, onClose: r }) {
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
      p.jsx("div", {
        className: "modal-overlay",
        role: "dialog",
        "aria-modal": "true",
        children: p.jsxs("div", {
          className: "modal",
          ref: n,
          children: [
            p.jsxs("div", {
              className: "modal-h",
              children: [
                p.jsx("h3", { children: e }),
                p.jsx("button", {
                  className: "icon",
                  "aria-label": "Fermer",
                  onClick: r,
                  children: "✕",
                }),
              ],
            }),
            p.jsx("div", { className: "modal-c", children: t }),
          ],
        }),
      })
    );
  }
  function Kn() {
    return {
      messageAlerte: "",
      idNiveauUrgence: "",
      typeAlert: "",
      groupeConcerne: "",
      vcDescription: "",
      limiteDeclenchementAlerte: "",
      idModule: "",
    };
  }
  function il() {
    return {
      id: "",
      statusAlert: "1",
      messageAlerte: "",
      idNiveauUrgence: "",
      idModule: "",
      niveauDurgence: "",
      moduleConcerne: "",
      typeAlert: "",
      groupeConcerne: "",
      vcDescription: "",
      limiteDeclenchementAlerte: "",
      tiSeverityLevel: "",
    };
  }
  function ll(e) {
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
  function cl(e) {
    const t = [];
    return (
      e.messageAlerte.trim() || t.push("Le message de l’alerte est requis"),
      e.idNiveauUrgence || t.push("Le niveau d’urgence (ID) est requis"),
      e.typeAlert || t.push("Le type d’alerte est requis"),
      e.groupeConcerne || t.push("Le groupe concerné est requis"),
      t
    );
  }
  function hr(e) {
    return Array.from(new Set(e));
  }
  const ul =
      "https://dev-api-bcibank.ecash-guinee.com/api/getListeNotiifcationConfig",
    fl = "https://dev-api-bcibank.ecash-guinee.com/api/addNotificationConfig",
    dl =
      "https://dev-api-bcibank.ecash-guinee.com/api/UpdateNotificationConfig",
    pl =
      "https://dev-api-bcibank.ecash-guinee.com/api/activeOrDesactiveNotification",
    hl = "https://dev-api-bcibank.ecash-guinee.com/api/getListNieauDurgence",
    ml = "https://dev-api-bcibank.ecash-guinee.com/api/getListeModule";
  function yl() {
    const [e, t] = _.useState([]),
      [r, n] = _.useState(""),
      [o, a] = _.useState(!1),
      [s, u] = _.useState(null),
      f = Yt(),
      [l, d] = _.useState(1),
      h = 4,
      [m, T] = _.useState(!1),
      [b, R] = _.useState(!1),
      [y, C] = _.useState(Xn()),
      [v, A] = _.useState(gl()),
      [L, $] = _.useState([]),
      [q, j] = _.useState([]),
      [H, z] = _.useState(!1),
      ee = _.useRef(null),
      ne = _.useRef("");
    _.useEffect(() => {
      const E = X.interceptors.response.use(
        (k) => (
          (k?.status === 401 ||
            k?.data?.status === 401 ||
            String(k?.data?.message || "")
              .toLowerCase()
              .includes("unauthenticated")) &&
            (Mt(),
            D.error("Session expirée. Veuillez vous reconnecter."),
            f("/login", { replace: !0 })),
          k
        ),
        (k) => (
          (k?.response?.status === 401 ||
            String(k?.response?.data?.message || "")
              .toLowerCase()
              .includes("unauthenticated")) &&
            (Mt(),
            D.error("Session expirée. Veuillez vous reconnecter."),
            f("/login", { replace: !0 })),
          Promise.reject(k)
        )
      );
      return () => X.interceptors.response.eject(E);
    }, [f]);
    const V = async () => {
      a(!0);
      try {
        const E = Se(),
          k = await X.get(ul, {
            headers: {
              Authorization: `Bearer ${E}`,
              Accept: "application/json",
            },
            validateStatus: () => !0,
          });
        if (
          (console.log("Réponse API (LIST):", k.status, k.data),
          k.status === 200)
        ) {
          const g = Array.isArray(k.data?.data) ? k.data.data : [];
          t(g), d(1);
        } else
          t([]), D.error(`Chargement des notifications échoué [${k.status}]`);
      } catch (E) {
        console.error("Erreur LIST:", E?.message || E),
          D.error(
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
              Authorization: `Bearer ${Se()}`,
              Accept: "application/json",
            },
            [g, O] = await Promise.allSettled([
              X.get(hl, { headers: k, validateStatus: () => !0 }),
              X.get(ml, { headers: k, validateStatus: () => !0 }),
            ]);
          g.status === "fulfilled" && g.value.status === 200
            ? $(Array.isArray(g.value.data?.data) ? g.value.data.data : [])
            : ($([]), D.warn("Liste niveaux indisponible")),
            O.status === "fulfilled" && O.value.status === 200
              ? j(Array.isArray(O.value.data?.data) ? O.value.data.data : [])
              : (j([]), D.warn("Liste modules indisponible"));
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
        ne.current !== r &&
        ((ne.current = r),
        D.info("Aucun résultat pour votre recherche.", { autoClose: 1200 })),
        te.length > 0 && ne.current && (ne.current = "");
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
        C(Xn()), await se(), T(!0);
      },
      ae = () => T(!1),
      he = async (E) => {
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
          vcDescription: E.vcDescription ?? "",
          limiteDeclenchementNotification:
            E.limiteDeclenchementNotification ?? "",
        }),
          R(!0);
      },
      ye = () => R(!1),
      c = async (E) => {
        E.preventDefault();
        const k = vl(y);
        if (k.length) {
          D.warn(k.join(" · "));
          return;
        }
        const g = {
            message: y.messageNotification,
            idNiveauUrgence: y.idNiveauUrgence,
            typeAlerte: y.typeAlerte,
            description: y.vcDescription,
            limiteDeclenchement: y.limiteDeclenchementNotification,
            idModule: y.idModule,
          },
          O = D.loading("Ajout en cours…");
        try {
          const M = Se(),
            U = await X.post(fl, null, {
              headers: {
                Authorization: `Bearer ${M}`,
                Accept: "application/json",
              },
              params: g,
              validateStatus: () => !0,
            });
          console.log("Réponse API (ADD):", U.status, U.data),
            U.status === 200
              ? (D.update(O, {
                  render: "Notification ajoutée",
                  type: "success",
                  isLoading: !1,
                  autoClose: 1200,
                }),
                T(!1),
                await V(),
                d(1))
              : (D.update(O, {
                  render: `Échec de l’ajout [${U.status}]`,
                  type: "error",
                  isLoading: !1,
                  autoClose: 2200,
                }),
                U.data?.message && D.error(String(U.data.message)));
        } catch (M) {
          console.error("Erreur ADD:", M?.message || M),
            D.update(O, {
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
        const k = bl(v);
        if (k.length) {
          D.warn(k.join(" · "));
          return;
        }
        const g = {
            message: v.messageNotification,
            idNiveauUrgence: v.idNiveauUrgence,
            typeAlerte: v.typeAlerte,
            description: v.vcDescription,
            limiteDeclenchement: v.limiteDeclenchementNotification,
            idModule: v.idModule,
            idAlerte: v.id,
          },
          O = D.loading("Modification en cours…");
        try {
          const M = Se(),
            U = await X.post(dl, null, {
              headers: {
                Authorization: `Bearer ${M}`,
                Accept: "application/json",
              },
              params: g,
              validateStatus: () => !0,
            });
          console.log("Réponse API (UPDATE):", U.status, U.data),
            U.status === 200
              ? (D.update(O, {
                  render: "Notification modifiée",
                  type: "success",
                  isLoading: !1,
                  autoClose: 1200,
                }),
                R(!1),
                await V())
              : (D.update(O, {
                  render: `Échec de la modification [${U.status}]`,
                  type: "error",
                  isLoading: !1,
                  autoClose: 2200,
                }),
                U.data?.message && D.error(String(U.data.message)));
        } catch (M) {
          console.error("Erreur UPDATE:", M?.message || M),
            D.update(O, {
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
          g = Se();
        u(E.id);
        const O = D.loading(k === "1" ? "Activation…" : "Désactivation…");
        try {
          const M = await X.post(pl, null, {
            headers: {
              Authorization: `Bearer ${g}`,
              Accept: "application/json",
            },
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
                D.update(O, {
                  render:
                    k === "1"
                      ? "Notification activée"
                      : "Notification désactivée",
                  type: "success",
                  isLoading: !1,
                  autoClose: 1200,
                }))
              : (D.update(O, {
                  render: `Échec ${
                    k === "1" ? "d’activation" : "de désactivation"
                  } [${M.status}]`,
                  type: "error",
                  isLoading: !1,
                  autoClose: 2200,
                }),
                M.data?.message && D.error(String(M.data.message)));
        } catch (M) {
          console.error("Erreur TOGGLE:", M?.message || M),
            D.update(O, {
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
    return p.jsxs("div", {
      className: "wrap",
      children: [
        p.jsx(Vn, { position: "top-right", theme: "colored" }),
        p.jsxs("header", {
          className: "topbar",
          children: [
            p.jsxs("div", {
              className: "brand",
              children: [
                p.jsx("span", { className: "dot" }),
                p.jsx("h1", { children: "Centre de Notification" }),
              ],
            }),
            p.jsx("div", {
              className: "actions",
              children: p.jsx("button", {
                className: "btn primary",
                onClick: ce,
                disabled: o,
                children: "Ajouter une Notification",
              }),
            }),
          ],
        }),
        p.jsxs("section", {
          className: "toolbar",
          children: [
            p.jsxs("div", {
              className: "search",
              children: [
                p.jsx("svg", {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  "aria-hidden": !0,
                  children: p.jsx("path", {
                    fill: "currentColor",
                    d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
                  }),
                }),
                p.jsx("input", {
                  ref: ee,
                  placeholder: "Rechercher (message, type, module…)",
                  value: r,
                  onChange: (E) => {
                    n(E.target.value), d(1);
                  },
                }),
              ],
            }),
            p.jsx("div", {
              className: "stats",
              children: p.jsxs("span", {
                className: "badge",
                children: ["Total: ", e.length],
              }),
            }),
          ],
        }),
        p.jsxs("div", {
          className: "card",
          children: [
            p.jsx("div", {
              className: "table-wrap",
              children: p.jsxs("table", {
                className: "tbl",
                children: [
                  p.jsx("thead", {
                    children: p.jsxs("tr", {
                      children: [
                        p.jsx("th", { children: "ID" }),
                        p.jsx("th", { children: "Message" }),
                        p.jsx("th", { children: "Statut" }),
                        p.jsx("th", { children: "Niveau d’urgence" }),
                        p.jsx("th", { children: "Type" }),
                        p.jsx("th", { children: "Description" }),
                        p.jsx("th", { children: "Seuil" }),
                        p.jsx("th", { children: "Module" }),
                        p.jsx("th", {
                          style: { width: 120 },
                          children: "Actions",
                        }),
                      ],
                    }),
                  }),
                  p.jsx("tbody", {
                    children:
                      K.length === 0
                        ? p.jsx("tr", {
                            children: p.jsx("td", {
                              colSpan: 9,
                              className: "empty",
                              children: "—",
                            }),
                          })
                        : K.map((E) =>
                            p.jsxs(
                              "tr",
                              {
                                children: [
                                  p.jsx("td", { children: E.id }),
                                  p.jsx("td", {
                                    className: "w-clip",
                                    children: p.jsx("div", {
                                      className: "title-cell",
                                      children: p.jsx("span", {
                                        className: "title-text",
                                        children: E.messageNotification ?? "—",
                                      }),
                                    }),
                                  }),
                                  p.jsx("td", {
                                    children: p.jsx("span", {
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
                                  p.jsx("td", {
                                    children: p.jsx("span", {
                                      className: "muted",
                                      children: E.niveauDurgence ?? "—",
                                    }),
                                  }),
                                  p.jsx("td", { children: E.type ?? "—" }),
                                  p.jsx("td", {
                                    className: "w-clip",
                                    children: p.jsx("span", {
                                      className: "muted",
                                      children: E.vcDescription ?? "—",
                                    }),
                                  }),
                                  p.jsx("td", {
                                    children:
                                      E.limiteDeclenchementNotification ?? "—",
                                  }),
                                  p.jsx("td", {
                                    children: E.moduleConcerne ?? "—",
                                  }),
                                  p.jsx("td", {
                                    children: p.jsxs("div", {
                                      className: "row-actions",
                                      children: [
                                        p.jsx("button", {
                                          className: "btn ghost",
                                          title: "Modifier",
                                          "aria-label": "Modifier",
                                          onClick: () => he(E),
                                          children: p.jsx("svg", {
                                            width: "18",
                                            height: "18",
                                            viewBox: "0 0 24 24",
                                            "aria-hidden": !0,
                                            children: p.jsx("path", {
                                              fill: "currentColor",
                                              d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 000-1.42l-2.34-2.34a1.003 1.003 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z",
                                            }),
                                          }),
                                        }),
                                        p.jsx("button", {
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
                                              ? p.jsx("svg", {
                                                  width: "18",
                                                  height: "18",
                                                  viewBox: "0 0 24 24",
                                                  "aria-hidden": !0,
                                                  children: p.jsx("path", {
                                                    fill: "currentColor",
                                                    d: "M12 17a2 2 0 100-4 2 2 0 000 4zm6-7h-1V7a5 5 0 10-10 0h2a3 3 0 116 0v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2z",
                                                  }),
                                                })
                                              : p.jsx("svg", {
                                                  width: "18",
                                                  height: "18",
                                                  viewBox: "0 0 24 24",
                                                  "aria-hidden": !0,
                                                  children: p.jsx("path", {
                                                    fill: "currentColor",
                                                    d: "M12 17a2 2 0 100-4 2 2 0 000 4zm6-7h-1V7a5 5 0 10-10 0v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2zm-9-3a3 3 0 116 0v3H9V7z",
                                                  }),
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
            p.jsx(Wn, {
              page: l,
              perPage: h,
              totalItems: te.length,
              onPageChange: d,
            }),
          ],
        }),
        m &&
          p.jsx(Jn, {
            title: "Ajouter une Notification" + (H ? " (chargement…)" : ""),
            onClose: ae,
            children: p.jsxs("form", {
              className: "form",
              onSubmit: c,
              children: [
                p.jsxs("div", {
                  className: "grid",
                  children: [
                    p.jsxs("label", {
                      className: "full",
                      children: [
                        p.jsx("span", { children: "Message de Notification" }),
                        p.jsx("input", {
                          autoFocus: !0,
                          value: y.messageNotification,
                          onChange: (E) =>
                            C({ ...y, messageNotification: E.target.value }),
                          placeholder: "Ex: Trop de transactions en attente",
                        }),
                      ],
                    }),
                    p.jsx($t, {
                      label: "Niveau d’urgence",
                      value: y.idNiveauUrgence,
                      setValue: (E) => C({ ...y, idNiveauUrgence: E }),
                      options: L,
                      placeholder: "Sélectionner…",
                      getValue: (E) => E.id,
                      getLabel: (E) => E.vcDescription,
                    }),
                    p.jsxs("label", {
                      children: [
                        p.jsx("span", { children: "Type" }),
                        p.jsxs("select", {
                          value: y.typeAlerte,
                          onChange: (E) =>
                            C({ ...y, typeAlerte: E.target.value }),
                          children: [
                            p.jsx("option", {
                              value: "",
                              children: "Sélectionner…",
                            }),
                            p.jsx("option", {
                              value: "URGENT",
                              children: "URGENT",
                            }),
                            p.jsx("option", {
                              value: "INFO",
                              children: "INFO",
                            }),
                          ],
                        }),
                      ],
                    }),
                    p.jsx($t, {
                      label: "Module concerné",
                      value: y.idModule,
                      setValue: (E) => C({ ...y, idModule: E }),
                      options: q,
                      placeholder: "Sélectionner…",
                      getValue: (E) => E.id,
                      getLabel: (E) => E.vcName,
                    }),
                    p.jsxs("label", {
                      children: [
                        p.jsx("span", { children: "Seuil pour déclencher" }),
                        p.jsx("input", {
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
                    p.jsxs("label", {
                      className: "full",
                      children: [
                        p.jsx("span", { children: "Description" }),
                        p.jsx("textarea", {
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
                p.jsxs("div", {
                  className: "modal-actions",
                  children: [
                    p.jsx("button", {
                      type: "button",
                      className: "btn ghost",
                      onClick: ae,
                      children: "Annuler",
                    }),
                    p.jsx("button", {
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
          p.jsx(Jn, {
            title: "Modifier une Notification",
            onClose: ye,
            children: p.jsxs("form", {
              className: "form",
              onSubmit: S,
              children: [
                p.jsxs("div", {
                  className: "grid",
                  children: [
                    p.jsxs("label", {
                      className: "full",
                      children: [
                        p.jsx("span", { children: "Message" }),
                        p.jsx("input", {
                          autoFocus: !0,
                          value: v.messageNotification,
                          onChange: (E) =>
                            A({ ...v, messageNotification: E.target.value }),
                        }),
                      ],
                    }),
                    L?.length
                      ? p.jsx($t, {
                          label: "Niveau d’urgence",
                          value: v.idNiveauUrgence,
                          setValue: (E) => A({ ...v, idNiveauUrgence: E }),
                          options: L,
                          placeholder: "Sélectionner…",
                          getValue: (E) => E.id,
                          getLabel: (E) => E.vcDescription,
                        })
                      : p.jsxs("label", {
                          children: [
                            p.jsx("span", { children: "Niveau d’urgence" }),
                            p.jsx("input", {
                              value: v.niveauDurgence,
                              onChange: (E) =>
                                A({ ...v, niveauDurgence: E.target.value }),
                            }),
                          ],
                        }),
                    p.jsxs("label", {
                      children: [
                        p.jsx("span", { children: "Type" }),
                        p.jsxs("select", {
                          value: v.typeAlerte,
                          onChange: (E) =>
                            A({ ...v, typeAlerte: E.target.value }),
                          children: [
                            p.jsx("option", {
                              value: "",
                              children: "Sélectionner…",
                            }),
                            p.jsx("option", {
                              value: "URGENT",
                              children: "URGENT",
                            }),
                            p.jsx("option", {
                              value: "INFO",
                              children: "INFO",
                            }),
                          ],
                        }),
                      ],
                    }),
                    q?.length
                      ? p.jsx($t, {
                          label: "Module concerné",
                          value: v.idModule,
                          setValue: (E) => A({ ...v, idModule: E }),
                          options: q,
                          placeholder: "Sélectionner…",
                          getValue: (E) => E.id,
                          getLabel: (E) => E.vcName,
                        })
                      : p.jsxs("label", {
                          children: [
                            p.jsx("span", { children: "Module concerné" }),
                            p.jsx("input", {
                              value: v.moduleConcerne,
                              onChange: (E) =>
                                A({ ...v, moduleConcerne: E.target.value }),
                            }),
                          ],
                        }),
                    p.jsxs("label", {
                      children: [
                        p.jsx("span", { children: "Seuil" }),
                        p.jsx("input", {
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
                    p.jsxs("label", {
                      className: "full",
                      children: [
                        p.jsx("span", { children: "Description" }),
                        p.jsx("textarea", {
                          rows: 3,
                          value: v.vcDescription,
                          onChange: (E) =>
                            A({ ...v, vcDescription: E.target.value }),
                        }),
                      ],
                    }),
                  ],
                }),
                p.jsxs("div", {
                  className: "modal-actions",
                  children: [
                    p.jsx("button", {
                      type: "button",
                      className: "btn ghost",
                      onClick: ye,
                      children: "Annuler",
                    }),
                    p.jsx("button", {
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
  function $t({
    label: e,
    value: t,
    setValue: r,
    options: n,
    placeholder: o = "Sélectionner…",
    getValue: a,
    getLabel: s,
  }) {
    return !n || n.length === 0
      ? p.jsxs("label", {
          children: [
            p.jsx("span", { children: e }),
            p.jsx("input", {
              value: t,
              onChange: (u) => r(u.target.value),
              placeholder: o,
            }),
          ],
        })
      : p.jsxs("label", {
          children: [
            p.jsx("span", { children: e }),
            p.jsxs("select", {
              value: t,
              onChange: (u) => r(u.target.value),
              children: [
                p.jsx("option", { value: "", children: o }),
                n.map((u) =>
                  p.jsx("option", { value: a(u), children: s(u) }, a(u))
                ),
              ],
            }),
          ],
        });
  }
  function Jn({ title: e, children: t, onClose: r }) {
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
      p.jsx("div", {
        className: "modal-overlay",
        role: "dialog",
        "aria-modal": "true",
        children: p.jsxs("div", {
          className: "modal",
          ref: n,
          children: [
            p.jsxs("div", {
              className: "modal-h",
              children: [
                p.jsx("h3", { children: e }),
                p.jsx("button", {
                  className: "icon",
                  "aria-label": "Fermer",
                  onClick: r,
                  children: "✕",
                }),
              ],
            }),
            p.jsx("div", { className: "modal-c", children: t }),
          ],
        }),
      })
    );
  }
  function Xn() {
    return {
      messageNotification: "",
      idNiveauUrgence: "",
      typeAlerte: "",
      vcDescription: "",
      limiteDeclenchementNotification: "",
      idModule: "",
    };
  }
  function gl() {
    return {
      id: "",
      statusNotification: "1",
      messageNotification: "",
      idNiveauUrgence: "",
      idModule: "",
      niveauDurgence: "",
      moduleConcerne: "",
      typeAlerte: "",
      vcDescription: "",
      limiteDeclenchementNotification: "",
    };
  }
  function vl(e) {
    const t = [];
    return (
      e.messageNotification.trim() || t.push("Le message est requis"),
      e.idNiveauUrgence || t.push("Le niveau d’urgence est requis"),
      e.typeAlerte || t.push("Le type est requis"),
      e.idModule || t.push("Le module est requis"),
      t
    );
  }
  function bl(e) {
    const t = [];
    return (
      e.messageNotification.trim() || t.push("Le message est requis"),
      e.idNiveauUrgence || t.push("Le niveau d’urgence (ID) est requis"),
      e.typeAlerte || t.push("Le type est requis"),
      t
    );
  }
  const _l = (e) => re.createElement(qr, null, re.createElement(sl, e)),
    El = (e) => re.createElement(qr, null, re.createElement(yl, e)),
    wl = Rr(_l, re, Tr, { shadow: !1 }),
    Tl = Rr(El, re, Tr, { shadow: !1 });
  customElements.define("alerte-notification", wl),
    customElements.define("notification-component", Tl),
    console.log(
      "Web Components chargés: alerte-notification, notification-component"
    );
});
