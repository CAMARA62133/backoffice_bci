(function (_a) {
  typeof define == "function" && define.amd ? define(_a) : _a();
})(function () {
  "use strict";
  function _a(p) {
    return p &&
      p.__esModule &&
      Object.prototype.hasOwnProperty.call(p, "default")
      ? p.default
      : p;
  }
  var Jn = { exports: {} },
    X = {};
  /**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Sf;
  function Hm() {
    if (Sf) return X;
    Sf = 1;
    var p = Symbol.for("react.transitional.element"),
      R = Symbol.for("react.portal"),
      D = Symbol.for("react.fragment"),
      h = Symbol.for("react.strict_mode"),
      Y = Symbol.for("react.profiler"),
      G = Symbol.for("react.consumer"),
      tl = Symbol.for("react.context"),
      k = Symbol.for("react.forward_ref"),
      M = Symbol.for("react.suspense"),
      N = Symbol.for("react.memo"),
      Q = Symbol.for("react.lazy"),
      U = Symbol.for("react.activity"),
      I = Symbol.iterator;
    function W(o) {
      return o === null || typeof o != "object"
        ? null
        : ((o = (I && o[I]) || o["@@iterator"]),
          typeof o == "function" ? o : null);
    }
    var Z = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      al = Object.assign,
      rl = {};
    function fl(o, z, b) {
      (this.props = o),
        (this.context = z),
        (this.refs = rl),
        (this.updater = b || Z);
    }
    (fl.prototype.isReactComponent = {}),
      (fl.prototype.setState = function (o, z) {
        if (typeof o != "object" && typeof o != "function" && o != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, o, z, "setState");
      }),
      (fl.prototype.forceUpdate = function (o) {
        this.updater.enqueueForceUpdate(this, o, "forceUpdate");
      });
    function El() {}
    El.prototype = fl.prototype;
    function hl(o, z, b) {
      (this.props = o),
        (this.context = z),
        (this.refs = rl),
        (this.updater = b || Z);
    }
    var Gl = (hl.prototype = new El());
    (Gl.constructor = hl), al(Gl, fl.prototype), (Gl.isPureReactComponent = !0);
    var Fl = Array.isArray;
    function _l() {}
    var V = { H: null, A: null, T: null, S: null },
      Cl = Object.prototype.hasOwnProperty;
    function Sl(o, z, b) {
      var m = b.ref;
      return {
        $$typeof: p,
        type: o,
        key: z,
        ref: m !== void 0 ? m : null,
        props: b,
      };
    }
    function dl(o, z) {
      return Sl(o.type, z, o.props);
    }
    function zl(o) {
      return typeof o == "object" && o !== null && o.$$typeof === p;
    }
    function Ml(o) {
      var z = { "=": "=0", ":": "=2" };
      return (
        "$" +
        o.replace(/[=:]/g, function (b) {
          return z[b];
        })
      );
    }
    var Pl = /\/+/g;
    function $l(o, z) {
      return typeof o == "object" && o !== null && o.key != null
        ? Ml("" + o.key)
        : z.toString(36);
    }
    function Zl(o) {
      switch (o.status) {
        case "fulfilled":
          return o.value;
        case "rejected":
          throw o.reason;
        default:
          switch (
            (typeof o.status == "string"
              ? o.then(_l, _l)
              : ((o.status = "pending"),
                o.then(
                  function (z) {
                    o.status === "pending" &&
                      ((o.status = "fulfilled"), (o.value = z));
                  },
                  function (z) {
                    o.status === "pending" &&
                      ((o.status = "rejected"), (o.reason = z));
                  }
                )),
            o.status)
          ) {
            case "fulfilled":
              return o.value;
            case "rejected":
              throw o.reason;
          }
      }
      throw o;
    }
    function A(o, z, b, m, _) {
      var w = typeof o;
      (w === "undefined" || w === "boolean") && (o = null);
      var sl = !1;
      if (o === null) sl = !0;
      else
        switch (w) {
          case "bigint":
          case "string":
          case "number":
            sl = !0;
            break;
          case "object":
            switch (o.$$typeof) {
              case p:
              case R:
                sl = !0;
                break;
              case Q:
                return (sl = o._init), A(sl(o._payload), z, b, m, _);
            }
        }
      if (sl)
        return (
          (_ = _(o)),
          (sl = m === "" ? "." + $l(o, 0) : m),
          Fl(_)
            ? ((b = ""),
              sl != null && (b = sl.replace(Pl, "$&/") + "/"),
              A(_, z, b, "", function (Ua) {
                return Ua;
              }))
            : _ != null &&
              (zl(_) &&
                (_ = dl(
                  _,
                  b +
                    (_.key == null || (o && o.key === _.key)
                      ? ""
                      : ("" + _.key).replace(Pl, "$&/") + "/") +
                    sl
                )),
              z.push(_)),
          1
        );
      sl = 0;
      var kl = m === "" ? "." : m + ":";
      if (Fl(o))
        for (var Ol = 0; Ol < o.length; Ol++)
          (m = o[Ol]), (w = kl + $l(m, Ol)), (sl += A(m, z, b, w, _));
      else if (((Ol = W(o)), typeof Ol == "function"))
        for (o = Ol.call(o), Ol = 0; !(m = o.next()).done; )
          (m = m.value), (w = kl + $l(m, Ol++)), (sl += A(m, z, b, w, _));
      else if (w === "object") {
        if (typeof o.then == "function") return A(Zl(o), z, b, m, _);
        throw (
          ((z = String(o)),
          Error(
            "Objects are not valid as a React child (found: " +
              (z === "[object Object]"
                ? "object with keys {" + Object.keys(o).join(", ") + "}"
                : z) +
              "). If you meant to render a collection of children, use an array instead."
          ))
        );
      }
      return sl;
    }
    function T(o, z, b) {
      if (o == null) return o;
      var m = [],
        _ = 0;
      return (
        A(o, m, "", "", function (w) {
          return z.call(b, w, _++);
        }),
        m
      );
    }
    function O(o) {
      if (o._status === -1) {
        var z = o._result;
        (z = z()),
          z.then(
            function (b) {
              (o._status === 0 || o._status === -1) &&
                ((o._status = 1), (o._result = b));
            },
            function (b) {
              (o._status === 0 || o._status === -1) &&
                ((o._status = 2), (o._result = b));
            }
          ),
          o._status === -1 && ((o._status = 0), (o._result = z));
      }
      if (o._status === 1) return o._result.default;
      throw o._result;
    }
    var J =
        typeof reportError == "function"
          ? reportError
          : function (o) {
              if (
                typeof window == "object" &&
                typeof window.ErrorEvent == "function"
              ) {
                var z = new window.ErrorEvent("error", {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    typeof o == "object" &&
                    o !== null &&
                    typeof o.message == "string"
                      ? String(o.message)
                      : String(o),
                  error: o,
                });
                if (!window.dispatchEvent(z)) return;
              } else if (
                typeof process == "object" &&
                typeof process.emit == "function"
              ) {
                process.emit("uncaughtException", o);
                return;
              }
              console.error(o);
            },
      il = {
        map: T,
        forEach: function (o, z, b) {
          T(
            o,
            function () {
              z.apply(this, arguments);
            },
            b
          );
        },
        count: function (o) {
          var z = 0;
          return (
            T(o, function () {
              z++;
            }),
            z
          );
        },
        toArray: function (o) {
          return (
            T(o, function (z) {
              return z;
            }) || []
          );
        },
        only: function (o) {
          if (!zl(o))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return o;
        },
      };
    return (
      (X.Activity = U),
      (X.Children = il),
      (X.Component = fl),
      (X.Fragment = D),
      (X.Profiler = Y),
      (X.PureComponent = hl),
      (X.StrictMode = h),
      (X.Suspense = M),
      (X.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = V),
      (X.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function (o) {
          return V.H.useMemoCache(o);
        },
      }),
      (X.cache = function (o) {
        return function () {
          return o.apply(null, arguments);
        };
      }),
      (X.cacheSignal = function () {
        return null;
      }),
      (X.cloneElement = function (o, z, b) {
        if (o == null)
          throw Error(
            "The argument must be a React element, but you passed " + o + "."
          );
        var m = al({}, o.props),
          _ = o.key;
        if (z != null)
          for (w in (z.key !== void 0 && (_ = "" + z.key), z))
            !Cl.call(z, w) ||
              w === "key" ||
              w === "__self" ||
              w === "__source" ||
              (w === "ref" && z.ref === void 0) ||
              (m[w] = z[w]);
        var w = arguments.length - 2;
        if (w === 1) m.children = b;
        else if (1 < w) {
          for (var sl = Array(w), kl = 0; kl < w; kl++)
            sl[kl] = arguments[kl + 2];
          m.children = sl;
        }
        return Sl(o.type, _, m);
      }),
      (X.createContext = function (o) {
        return (
          (o = {
            $$typeof: tl,
            _currentValue: o,
            _currentValue2: o,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
          }),
          (o.Provider = o),
          (o.Consumer = { $$typeof: G, _context: o }),
          o
        );
      }),
      (X.createElement = function (o, z, b) {
        var m,
          _ = {},
          w = null;
        if (z != null)
          for (m in (z.key !== void 0 && (w = "" + z.key), z))
            Cl.call(z, m) &&
              m !== "key" &&
              m !== "__self" &&
              m !== "__source" &&
              (_[m] = z[m]);
        var sl = arguments.length - 2;
        if (sl === 1) _.children = b;
        else if (1 < sl) {
          for (var kl = Array(sl), Ol = 0; Ol < sl; Ol++)
            kl[Ol] = arguments[Ol + 2];
          _.children = kl;
        }
        if (o && o.defaultProps)
          for (m in ((sl = o.defaultProps), sl))
            _[m] === void 0 && (_[m] = sl[m]);
        return Sl(o, w, _);
      }),
      (X.createRef = function () {
        return { current: null };
      }),
      (X.forwardRef = function (o) {
        return { $$typeof: k, render: o };
      }),
      (X.isValidElement = zl),
      (X.lazy = function (o) {
        return { $$typeof: Q, _payload: { _status: -1, _result: o }, _init: O };
      }),
      (X.memo = function (o, z) {
        return { $$typeof: N, type: o, compare: z === void 0 ? null : z };
      }),
      (X.startTransition = function (o) {
        var z = V.T,
          b = {};
        V.T = b;
        try {
          var m = o(),
            _ = V.S;
          _ !== null && _(b, m),
            typeof m == "object" &&
              m !== null &&
              typeof m.then == "function" &&
              m.then(_l, J);
        } catch (w) {
          J(w);
        } finally {
          z !== null && b.types !== null && (z.types = b.types), (V.T = z);
        }
      }),
      (X.unstable_useCacheRefresh = function () {
        return V.H.useCacheRefresh();
      }),
      (X.use = function (o) {
        return V.H.use(o);
      }),
      (X.useActionState = function (o, z, b) {
        return V.H.useActionState(o, z, b);
      }),
      (X.useCallback = function (o, z) {
        return V.H.useCallback(o, z);
      }),
      (X.useContext = function (o) {
        return V.H.useContext(o);
      }),
      (X.useDebugValue = function () {}),
      (X.useDeferredValue = function (o, z) {
        return V.H.useDeferredValue(o, z);
      }),
      (X.useEffect = function (o, z) {
        return V.H.useEffect(o, z);
      }),
      (X.useEffectEvent = function (o) {
        return V.H.useEffectEvent(o);
      }),
      (X.useId = function () {
        return V.H.useId();
      }),
      (X.useImperativeHandle = function (o, z, b) {
        return V.H.useImperativeHandle(o, z, b);
      }),
      (X.useInsertionEffect = function (o, z) {
        return V.H.useInsertionEffect(o, z);
      }),
      (X.useLayoutEffect = function (o, z) {
        return V.H.useLayoutEffect(o, z);
      }),
      (X.useMemo = function (o, z) {
        return V.H.useMemo(o, z);
      }),
      (X.useOptimistic = function (o, z) {
        return V.H.useOptimistic(o, z);
      }),
      (X.useReducer = function (o, z, b) {
        return V.H.useReducer(o, z, b);
      }),
      (X.useRef = function (o) {
        return V.H.useRef(o);
      }),
      (X.useState = function (o) {
        return V.H.useState(o);
      }),
      (X.useSyncExternalStore = function (o, z, b) {
        return V.H.useSyncExternalStore(o, z, b);
      }),
      (X.useTransition = function () {
        return V.H.useTransition();
      }),
      (X.version = "19.2.0"),
      X
    );
  }
  var Nf;
  function wn() {
    return Nf || ((Nf = 1), (Jn.exports = Hm())), Jn.exports;
  }
  var jl = wn();
  const pf = _a(jl);
  var Wn = { exports: {} },
    Ma = {},
    Fn = { exports: {} },
    $n = {};
  /**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Af;
  function qm() {
    return (
      Af ||
        ((Af = 1),
        (function (p) {
          function R(A, T) {
            var O = A.length;
            A.push(T);
            l: for (; 0 < O; ) {
              var J = (O - 1) >>> 1,
                il = A[J];
              if (0 < Y(il, T)) (A[J] = T), (A[O] = il), (O = J);
              else break l;
            }
          }
          function D(A) {
            return A.length === 0 ? null : A[0];
          }
          function h(A) {
            if (A.length === 0) return null;
            var T = A[0],
              O = A.pop();
            if (O !== T) {
              A[0] = O;
              l: for (var J = 0, il = A.length, o = il >>> 1; J < o; ) {
                var z = 2 * (J + 1) - 1,
                  b = A[z],
                  m = z + 1,
                  _ = A[m];
                if (0 > Y(b, O))
                  m < il && 0 > Y(_, b)
                    ? ((A[J] = _), (A[m] = O), (J = m))
                    : ((A[J] = b), (A[z] = O), (J = z));
                else if (m < il && 0 > Y(_, O)) (A[J] = _), (A[m] = O), (J = m);
                else break l;
              }
            }
            return T;
          }
          function Y(A, T) {
            var O = A.sortIndex - T.sortIndex;
            return O !== 0 ? O : A.id - T.id;
          }
          if (
            ((p.unstable_now = void 0),
            typeof performance == "object" &&
              typeof performance.now == "function")
          ) {
            var G = performance;
            p.unstable_now = function () {
              return G.now();
            };
          } else {
            var tl = Date,
              k = tl.now();
            p.unstable_now = function () {
              return tl.now() - k;
            };
          }
          var M = [],
            N = [],
            Q = 1,
            U = null,
            I = 3,
            W = !1,
            Z = !1,
            al = !1,
            rl = !1,
            fl = typeof setTimeout == "function" ? setTimeout : null,
            El = typeof clearTimeout == "function" ? clearTimeout : null,
            hl = typeof setImmediate < "u" ? setImmediate : null;
          function Gl(A) {
            for (var T = D(N); T !== null; ) {
              if (T.callback === null) h(N);
              else if (T.startTime <= A)
                h(N), (T.sortIndex = T.expirationTime), R(M, T);
              else break;
              T = D(N);
            }
          }
          function Fl(A) {
            if (((al = !1), Gl(A), !Z))
              if (D(M) !== null) (Z = !0), _l || ((_l = !0), Ml());
              else {
                var T = D(N);
                T !== null && Zl(Fl, T.startTime - A);
              }
          }
          var _l = !1,
            V = -1,
            Cl = 5,
            Sl = -1;
          function dl() {
            return rl ? !0 : !(p.unstable_now() - Sl < Cl);
          }
          function zl() {
            if (((rl = !1), _l)) {
              var A = p.unstable_now();
              Sl = A;
              var T = !0;
              try {
                l: {
                  (Z = !1), al && ((al = !1), El(V), (V = -1)), (W = !0);
                  var O = I;
                  try {
                    t: {
                      for (
                        Gl(A), U = D(M);
                        U !== null && !(U.expirationTime > A && dl());

                      ) {
                        var J = U.callback;
                        if (typeof J == "function") {
                          (U.callback = null), (I = U.priorityLevel);
                          var il = J(U.expirationTime <= A);
                          if (
                            ((A = p.unstable_now()), typeof il == "function")
                          ) {
                            (U.callback = il), Gl(A), (T = !0);
                            break t;
                          }
                          U === D(M) && h(M), Gl(A);
                        } else h(M);
                        U = D(M);
                      }
                      if (U !== null) T = !0;
                      else {
                        var o = D(N);
                        o !== null && Zl(Fl, o.startTime - A), (T = !1);
                      }
                    }
                    break l;
                  } finally {
                    (U = null), (I = O), (W = !1);
                  }
                  T = void 0;
                }
              } finally {
                T ? Ml() : (_l = !1);
              }
            }
          }
          var Ml;
          if (typeof hl == "function")
            Ml = function () {
              hl(zl);
            };
          else if (typeof MessageChannel < "u") {
            var Pl = new MessageChannel(),
              $l = Pl.port2;
            (Pl.port1.onmessage = zl),
              (Ml = function () {
                $l.postMessage(null);
              });
          } else
            Ml = function () {
              fl(zl, 0);
            };
          function Zl(A, T) {
            V = fl(function () {
              A(p.unstable_now());
            }, T);
          }
          (p.unstable_IdlePriority = 5),
            (p.unstable_ImmediatePriority = 1),
            (p.unstable_LowPriority = 4),
            (p.unstable_NormalPriority = 3),
            (p.unstable_Profiling = null),
            (p.unstable_UserBlockingPriority = 2),
            (p.unstable_cancelCallback = function (A) {
              A.callback = null;
            }),
            (p.unstable_forceFrameRate = function (A) {
              0 > A || 125 < A
                ? console.error(
                    "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                  )
                : (Cl = 0 < A ? Math.floor(1e3 / A) : 5);
            }),
            (p.unstable_getCurrentPriorityLevel = function () {
              return I;
            }),
            (p.unstable_next = function (A) {
              switch (I) {
                case 1:
                case 2:
                case 3:
                  var T = 3;
                  break;
                default:
                  T = I;
              }
              var O = I;
              I = T;
              try {
                return A();
              } finally {
                I = O;
              }
            }),
            (p.unstable_requestPaint = function () {
              rl = !0;
            }),
            (p.unstable_runWithPriority = function (A, T) {
              switch (A) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                  break;
                default:
                  A = 3;
              }
              var O = I;
              I = A;
              try {
                return T();
              } finally {
                I = O;
              }
            }),
            (p.unstable_scheduleCallback = function (A, T, O) {
              var J = p.unstable_now();
              switch (
                (typeof O == "object" && O !== null
                  ? ((O = O.delay),
                    (O = typeof O == "number" && 0 < O ? J + O : J))
                  : (O = J),
                A)
              ) {
                case 1:
                  var il = -1;
                  break;
                case 2:
                  il = 250;
                  break;
                case 5:
                  il = 1073741823;
                  break;
                case 4:
                  il = 1e4;
                  break;
                default:
                  il = 5e3;
              }
              return (
                (il = O + il),
                (A = {
                  id: Q++,
                  callback: T,
                  priorityLevel: A,
                  startTime: O,
                  expirationTime: il,
                  sortIndex: -1,
                }),
                O > J
                  ? ((A.sortIndex = O),
                    R(N, A),
                    D(M) === null &&
                      A === D(N) &&
                      (al ? (El(V), (V = -1)) : (al = !0), Zl(Fl, O - J)))
                  : ((A.sortIndex = il),
                    R(M, A),
                    Z || W || ((Z = !0), _l || ((_l = !0), Ml()))),
                A
              );
            }),
            (p.unstable_shouldYield = dl),
            (p.unstable_wrapCallback = function (A) {
              var T = I;
              return function () {
                var O = I;
                I = T;
                try {
                  return A.apply(this, arguments);
                } finally {
                  I = O;
                }
              };
            });
        })($n)),
      $n
    );
  }
  var jf;
  function Ym() {
    return jf || ((jf = 1), (Fn.exports = qm())), Fn.exports;
  }
  var kn = { exports: {} },
    Wl = {};
  /**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Ef;
  function Bm() {
    if (Ef) return Wl;
    Ef = 1;
    var p = wn();
    function R(M) {
      var N = "https://react.dev/errors/" + M;
      if (1 < arguments.length) {
        N += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var Q = 2; Q < arguments.length; Q++)
          N += "&args[]=" + encodeURIComponent(arguments[Q]);
      }
      return (
        "Minified React error #" +
        M +
        "; visit " +
        N +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    function D() {}
    var h = {
        d: {
          f: D,
          r: function () {
            throw Error(R(522));
          },
          D,
          C: D,
          L: D,
          m: D,
          X: D,
          S: D,
          M: D,
        },
        p: 0,
        findDOMNode: null,
      },
      Y = Symbol.for("react.portal");
    function G(M, N, Q) {
      var U =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: Y,
        key: U == null ? null : "" + U,
        children: M,
        containerInfo: N,
        implementation: Q,
      };
    }
    var tl = p.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function k(M, N) {
      if (M === "font") return "";
      if (typeof N == "string") return N === "use-credentials" ? N : "";
    }
    return (
      (Wl.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = h),
      (Wl.createPortal = function (M, N) {
        var Q =
          2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!N || (N.nodeType !== 1 && N.nodeType !== 9 && N.nodeType !== 11))
          throw Error(R(299));
        return G(M, N, null, Q);
      }),
      (Wl.flushSync = function (M) {
        var N = tl.T,
          Q = h.p;
        try {
          if (((tl.T = null), (h.p = 2), M)) return M();
        } finally {
          (tl.T = N), (h.p = Q), h.d.f();
        }
      }),
      (Wl.preconnect = function (M, N) {
        typeof M == "string" &&
          (N
            ? ((N = N.crossOrigin),
              (N =
                typeof N == "string"
                  ? N === "use-credentials"
                    ? N
                    : ""
                  : void 0))
            : (N = null),
          h.d.C(M, N));
      }),
      (Wl.prefetchDNS = function (M) {
        typeof M == "string" && h.d.D(M);
      }),
      (Wl.preinit = function (M, N) {
        if (typeof M == "string" && N && typeof N.as == "string") {
          var Q = N.as,
            U = k(Q, N.crossOrigin),
            I = typeof N.integrity == "string" ? N.integrity : void 0,
            W = typeof N.fetchPriority == "string" ? N.fetchPriority : void 0;
          Q === "style"
            ? h.d.S(
                M,
                typeof N.precedence == "string" ? N.precedence : void 0,
                { crossOrigin: U, integrity: I, fetchPriority: W }
              )
            : Q === "script" &&
              h.d.X(M, {
                crossOrigin: U,
                integrity: I,
                fetchPriority: W,
                nonce: typeof N.nonce == "string" ? N.nonce : void 0,
              });
        }
      }),
      (Wl.preinitModule = function (M, N) {
        if (typeof M == "string")
          if (typeof N == "object" && N !== null) {
            if (N.as == null || N.as === "script") {
              var Q = k(N.as, N.crossOrigin);
              h.d.M(M, {
                crossOrigin: Q,
                integrity:
                  typeof N.integrity == "string" ? N.integrity : void 0,
                nonce: typeof N.nonce == "string" ? N.nonce : void 0,
              });
            }
          } else N == null && h.d.M(M);
      }),
      (Wl.preload = function (M, N) {
        if (
          typeof M == "string" &&
          typeof N == "object" &&
          N !== null &&
          typeof N.as == "string"
        ) {
          var Q = N.as,
            U = k(Q, N.crossOrigin);
          h.d.L(M, Q, {
            crossOrigin: U,
            integrity: typeof N.integrity == "string" ? N.integrity : void 0,
            nonce: typeof N.nonce == "string" ? N.nonce : void 0,
            type: typeof N.type == "string" ? N.type : void 0,
            fetchPriority:
              typeof N.fetchPriority == "string" ? N.fetchPriority : void 0,
            referrerPolicy:
              typeof N.referrerPolicy == "string" ? N.referrerPolicy : void 0,
            imageSrcSet:
              typeof N.imageSrcSet == "string" ? N.imageSrcSet : void 0,
            imageSizes: typeof N.imageSizes == "string" ? N.imageSizes : void 0,
            media: typeof N.media == "string" ? N.media : void 0,
          });
        }
      }),
      (Wl.preloadModule = function (M, N) {
        if (typeof M == "string")
          if (N) {
            var Q = k(N.as, N.crossOrigin);
            h.d.m(M, {
              as: typeof N.as == "string" && N.as !== "script" ? N.as : void 0,
              crossOrigin: Q,
              integrity: typeof N.integrity == "string" ? N.integrity : void 0,
            });
          } else h.d.m(M);
      }),
      (Wl.requestFormReset = function (M) {
        h.d.r(M);
      }),
      (Wl.unstable_batchedUpdates = function (M, N) {
        return M(N);
      }),
      (Wl.useFormState = function (M, N, Q) {
        return tl.H.useFormState(M, N, Q);
      }),
      (Wl.useFormStatus = function () {
        return tl.H.useHostTransitionStatus();
      }),
      (Wl.version = "19.2.0"),
      Wl
    );
  }
  var zf;
  function Gm() {
    if (zf) return kn.exports;
    zf = 1;
    function p() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(p);
        } catch (R) {
          console.error(R);
        }
    }
    return p(), (kn.exports = Bm()), kn.exports;
  }
  /**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var xf;
  function Xm() {
    if (xf) return Ma;
    xf = 1;
    var p = Ym(),
      R = wn(),
      D = Gm();
    function h(l) {
      var t = "https://react.dev/errors/" + l;
      if (1 < arguments.length) {
        t += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var e = 2; e < arguments.length; e++)
          t += "&args[]=" + encodeURIComponent(arguments[e]);
      }
      return (
        "Minified React error #" +
        l +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    function Y(l) {
      return !(
        !l ||
        (l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11)
      );
    }
    function G(l) {
      var t = l,
        e = l;
      if (l.alternate) for (; t.return; ) t = t.return;
      else {
        l = t;
        do (t = l), (t.flags & 4098) !== 0 && (e = t.return), (l = t.return);
        while (l);
      }
      return t.tag === 3 ? e : null;
    }
    function tl(l) {
      if (l.tag === 13) {
        var t = l.memoizedState;
        if (
          (t === null &&
            ((l = l.alternate), l !== null && (t = l.memoizedState)),
          t !== null)
        )
          return t.dehydrated;
      }
      return null;
    }
    function k(l) {
      if (l.tag === 31) {
        var t = l.memoizedState;
        if (
          (t === null &&
            ((l = l.alternate), l !== null && (t = l.memoizedState)),
          t !== null)
        )
          return t.dehydrated;
      }
      return null;
    }
    function M(l) {
      if (G(l) !== l) throw Error(h(188));
    }
    function N(l) {
      var t = l.alternate;
      if (!t) {
        if (((t = G(l)), t === null)) throw Error(h(188));
        return t !== l ? null : l;
      }
      for (var e = l, a = t; ; ) {
        var u = e.return;
        if (u === null) break;
        var n = u.alternate;
        if (n === null) {
          if (((a = u.return), a !== null)) {
            e = a;
            continue;
          }
          break;
        }
        if (u.child === n.child) {
          for (n = u.child; n; ) {
            if (n === e) return M(u), l;
            if (n === a) return M(u), t;
            n = n.sibling;
          }
          throw Error(h(188));
        }
        if (e.return !== a.return) (e = u), (a = n);
        else {
          for (var i = !1, c = u.child; c; ) {
            if (c === e) {
              (i = !0), (e = u), (a = n);
              break;
            }
            if (c === a) {
              (i = !0), (a = u), (e = n);
              break;
            }
            c = c.sibling;
          }
          if (!i) {
            for (c = n.child; c; ) {
              if (c === e) {
                (i = !0), (e = n), (a = u);
                break;
              }
              if (c === a) {
                (i = !0), (a = n), (e = u);
                break;
              }
              c = c.sibling;
            }
            if (!i) throw Error(h(189));
          }
        }
        if (e.alternate !== a) throw Error(h(190));
      }
      if (e.tag !== 3) throw Error(h(188));
      return e.stateNode.current === e ? l : t;
    }
    function Q(l) {
      var t = l.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return l;
      for (l = l.child; l !== null; ) {
        if (((t = Q(l)), t !== null)) return t;
        l = l.sibling;
      }
      return null;
    }
    var U = Object.assign,
      I = Symbol.for("react.element"),
      W = Symbol.for("react.transitional.element"),
      Z = Symbol.for("react.portal"),
      al = Symbol.for("react.fragment"),
      rl = Symbol.for("react.strict_mode"),
      fl = Symbol.for("react.profiler"),
      El = Symbol.for("react.consumer"),
      hl = Symbol.for("react.context"),
      Gl = Symbol.for("react.forward_ref"),
      Fl = Symbol.for("react.suspense"),
      _l = Symbol.for("react.suspense_list"),
      V = Symbol.for("react.memo"),
      Cl = Symbol.for("react.lazy"),
      Sl = Symbol.for("react.activity"),
      dl = Symbol.for("react.memo_cache_sentinel"),
      zl = Symbol.iterator;
    function Ml(l) {
      return l === null || typeof l != "object"
        ? null
        : ((l = (zl && l[zl]) || l["@@iterator"]),
          typeof l == "function" ? l : null);
    }
    var Pl = Symbol.for("react.client.reference");
    function $l(l) {
      if (l == null) return null;
      if (typeof l == "function")
        return l.$$typeof === Pl ? null : l.displayName || l.name || null;
      if (typeof l == "string") return l;
      switch (l) {
        case al:
          return "Fragment";
        case fl:
          return "Profiler";
        case rl:
          return "StrictMode";
        case Fl:
          return "Suspense";
        case _l:
          return "SuspenseList";
        case Sl:
          return "Activity";
      }
      if (typeof l == "object")
        switch (l.$$typeof) {
          case Z:
            return "Portal";
          case hl:
            return l.displayName || "Context";
          case El:
            return (l._context.displayName || "Context") + ".Consumer";
          case Gl:
            var t = l.render;
            return (
              (l = l.displayName),
              l ||
                ((l = t.displayName || t.name || ""),
                (l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef")),
              l
            );
          case V:
            return (
              (t = l.displayName || null), t !== null ? t : $l(l.type) || "Memo"
            );
          case Cl:
            (t = l._payload), (l = l._init);
            try {
              return $l(l(t));
            } catch {}
        }
      return null;
    }
    var Zl = Array.isArray,
      A = R.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      T = D.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      O = { pending: !1, data: null, method: null, action: null },
      J = [],
      il = -1;
    function o(l) {
      return { current: l };
    }
    function z(l) {
      0 > il || ((l.current = J[il]), (J[il] = null), il--);
    }
    function b(l, t) {
      il++, (J[il] = l.current), (l.current = t);
    }
    var m = o(null),
      _ = o(null),
      w = o(null),
      sl = o(null);
    function kl(l, t) {
      switch ((b(w, t), b(_, l), b(m, null), t.nodeType)) {
        case 9:
        case 11:
          l = (l = t.documentElement) && (l = l.namespaceURI) ? um(l) : 0;
          break;
        default:
          if (((l = t.tagName), (t = t.namespaceURI)))
            (t = um(t)), (l = nm(t, l));
          else
            switch (l) {
              case "svg":
                l = 1;
                break;
              case "math":
                l = 2;
                break;
              default:
                l = 0;
            }
      }
      z(m), b(m, l);
    }
    function Ol() {
      z(m), z(_), z(w);
    }
    function Ua(l) {
      l.memoizedState !== null && b(sl, l);
      var t = m.current,
        e = nm(t, l.type);
      t !== e && (b(_, l), b(m, e));
    }
    function Tu(l) {
      _.current === l && (z(m), z(_)),
        sl.current === l && (z(sl), (pu._currentValue = O));
    }
    var li, Cf;
    function ze(l) {
      if (li === void 0)
        try {
          throw Error();
        } catch (e) {
          var t = e.stack.trim().match(/\n( *(at )?)/);
          (li = (t && t[1]) || ""),
            (Cf =
              -1 <
              e.stack.indexOf(`
    at`)
                ? " (<anonymous>)"
                : -1 < e.stack.indexOf("@")
                ? "@unknown:0:0"
                : "");
        }
      return (
        `
` +
        li +
        l +
        Cf
      );
    }
    var ti = !1;
    function ei(l, t) {
      if (!l || ti) return "";
      ti = !0;
      var e = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var a = {
          DetermineComponentFrameRoot: function () {
            try {
              if (t) {
                var x = function () {
                  throw Error();
                };
                if (
                  (Object.defineProperty(x.prototype, "props", {
                    set: function () {
                      throw Error();
                    },
                  }),
                  typeof Reflect == "object" && Reflect.construct)
                ) {
                  try {
                    Reflect.construct(x, []);
                  } catch (S) {
                    var g = S;
                  }
                  Reflect.construct(l, [], x);
                } else {
                  try {
                    x.call();
                  } catch (S) {
                    g = S;
                  }
                  l.call(x.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (S) {
                  g = S;
                }
                (x = l()) &&
                  typeof x.catch == "function" &&
                  x.catch(function () {});
              }
            } catch (S) {
              if (S && g && typeof S.stack == "string")
                return [S.stack, g.stack];
            }
            return [null, null];
          },
        };
        a.DetermineComponentFrameRoot.displayName =
          "DetermineComponentFrameRoot";
        var u = Object.getOwnPropertyDescriptor(
          a.DetermineComponentFrameRoot,
          "name"
        );
        u &&
          u.configurable &&
          Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
            value: "DetermineComponentFrameRoot",
          });
        var n = a.DetermineComponentFrameRoot(),
          i = n[0],
          c = n[1];
        if (i && c) {
          var s = i.split(`
`),
            y = c.split(`
`);
          for (
            u = a = 0;
            a < s.length && !s[a].includes("DetermineComponentFrameRoot");

          )
            a++;
          for (
            ;
            u < y.length && !y[u].includes("DetermineComponentFrameRoot");

          )
            u++;
          if (a === s.length || u === y.length)
            for (
              a = s.length - 1, u = y.length - 1;
              1 <= a && 0 <= u && s[a] !== y[u];

            )
              u--;
          for (; 1 <= a && 0 <= u; a--, u--)
            if (s[a] !== y[u]) {
              if (a !== 1 || u !== 1)
                do
                  if ((a--, u--, 0 > u || s[a] !== y[u])) {
                    var j =
                      `
` + s[a].replace(" at new ", " at ");
                    return (
                      l.displayName &&
                        j.includes("<anonymous>") &&
                        (j = j.replace("<anonymous>", l.displayName)),
                      j
                    );
                  }
                while (1 <= a && 0 <= u);
              break;
            }
        }
      } finally {
        (ti = !1), (Error.prepareStackTrace = e);
      }
      return (e = l ? l.displayName || l.name : "") ? ze(e) : "";
    }
    function cr(l, t) {
      switch (l.tag) {
        case 26:
        case 27:
        case 5:
          return ze(l.type);
        case 16:
          return ze("Lazy");
        case 13:
          return l.child !== t && t !== null
            ? ze("Suspense Fallback")
            : ze("Suspense");
        case 19:
          return ze("SuspenseList");
        case 0:
        case 15:
          return ei(l.type, !1);
        case 11:
          return ei(l.type.render, !1);
        case 1:
          return ei(l.type, !0);
        case 31:
          return ze("Activity");
        default:
          return "";
      }
    }
    function Rf(l) {
      try {
        var t = "",
          e = null;
        do (t += cr(l, e)), (e = l), (l = l.return);
        while (l);
        return t;
      } catch (a) {
        return (
          `
Error generating stack: ` +
          a.message +
          `
` +
          a.stack
        );
      }
    }
    var ai = Object.prototype.hasOwnProperty,
      ui = p.unstable_scheduleCallback,
      ni = p.unstable_cancelCallback,
      fr = p.unstable_shouldYield,
      sr = p.unstable_requestPaint,
      ft = p.unstable_now,
      dr = p.unstable_getCurrentPriorityLevel,
      Hf = p.unstable_ImmediatePriority,
      qf = p.unstable_UserBlockingPriority,
      _u = p.unstable_NormalPriority,
      or = p.unstable_LowPriority,
      Yf = p.unstable_IdlePriority,
      mr = p.log,
      rr = p.unstable_setDisableYieldValue,
      Ca = null,
      st = null;
    function Pt(l) {
      if (
        (typeof mr == "function" && rr(l),
        st && typeof st.setStrictMode == "function")
      )
        try {
          st.setStrictMode(Ca, l);
        } catch {}
    }
    var dt = Math.clz32 ? Math.clz32 : yr,
      hr = Math.log,
      vr = Math.LN2;
    function yr(l) {
      return (l >>>= 0), l === 0 ? 32 : (31 - ((hr(l) / vr) | 0)) | 0;
    }
    var Mu = 256,
      Ou = 262144,
      Du = 4194304;
    function xe(l) {
      var t = l & 42;
      if (t !== 0) return t;
      switch (l & -l) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
          return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
          return l & 261888;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return l & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return l & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return l;
      }
    }
    function Uu(l, t, e) {
      var a = l.pendingLanes;
      if (a === 0) return 0;
      var u = 0,
        n = l.suspendedLanes,
        i = l.pingedLanes;
      l = l.warmLanes;
      var c = a & 134217727;
      return (
        c !== 0
          ? ((a = c & ~n),
            a !== 0
              ? (u = xe(a))
              : ((i &= c),
                i !== 0
                  ? (u = xe(i))
                  : e || ((e = c & ~l), e !== 0 && (u = xe(e)))))
          : ((c = a & ~n),
            c !== 0
              ? (u = xe(c))
              : i !== 0
              ? (u = xe(i))
              : e || ((e = a & ~l), e !== 0 && (u = xe(e)))),
        u === 0
          ? 0
          : t !== 0 &&
            t !== u &&
            (t & n) === 0 &&
            ((n = u & -u),
            (e = t & -t),
            n >= e || (n === 32 && (e & 4194048) !== 0))
          ? t
          : u
      );
    }
    function Ra(l, t) {
      return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & t) === 0;
    }
    function gr(l, t) {
      switch (l) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return t + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function Bf() {
      var l = Du;
      return (Du <<= 1), (Du & 62914560) === 0 && (Du = 4194304), l;
    }
    function ii(l) {
      for (var t = [], e = 0; 31 > e; e++) t.push(l);
      return t;
    }
    function Ha(l, t) {
      (l.pendingLanes |= t),
        t !== 268435456 &&
          ((l.suspendedLanes = 0), (l.pingedLanes = 0), (l.warmLanes = 0));
    }
    function br(l, t, e, a, u, n) {
      var i = l.pendingLanes;
      (l.pendingLanes = e),
        (l.suspendedLanes = 0),
        (l.pingedLanes = 0),
        (l.warmLanes = 0),
        (l.expiredLanes &= e),
        (l.entangledLanes &= e),
        (l.errorRecoveryDisabledLanes &= e),
        (l.shellSuspendCounter = 0);
      var c = l.entanglements,
        s = l.expirationTimes,
        y = l.hiddenUpdates;
      for (e = i & ~e; 0 < e; ) {
        var j = 31 - dt(e),
          x = 1 << j;
        (c[j] = 0), (s[j] = -1);
        var g = y[j];
        if (g !== null)
          for (y[j] = null, j = 0; j < g.length; j++) {
            var S = g[j];
            S !== null && (S.lane &= -536870913);
          }
        e &= ~x;
      }
      a !== 0 && Gf(l, a, 0),
        n !== 0 &&
          u === 0 &&
          l.tag !== 0 &&
          (l.suspendedLanes |= n & ~(i & ~t));
    }
    function Gf(l, t, e) {
      (l.pendingLanes |= t), (l.suspendedLanes &= ~t);
      var a = 31 - dt(t);
      (l.entangledLanes |= t),
        (l.entanglements[a] = l.entanglements[a] | 1073741824 | (e & 261930));
    }
    function Xf(l, t) {
      var e = (l.entangledLanes |= t);
      for (l = l.entanglements; e; ) {
        var a = 31 - dt(e),
          u = 1 << a;
        (u & t) | (l[a] & t) && (l[a] |= t), (e &= ~u);
      }
    }
    function Qf(l, t) {
      var e = t & -t;
      return (
        (e = (e & 42) !== 0 ? 1 : ci(e)),
        (e & (l.suspendedLanes | t)) !== 0 ? 0 : e
      );
    }
    function ci(l) {
      switch (l) {
        case 2:
          l = 1;
          break;
        case 8:
          l = 4;
          break;
        case 32:
          l = 16;
          break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          l = 128;
          break;
        case 268435456:
          l = 134217728;
          break;
        default:
          l = 0;
      }
      return l;
    }
    function fi(l) {
      return (
        (l &= -l),
        2 < l ? (8 < l ? ((l & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
      );
    }
    function Zf() {
      var l = T.p;
      return l !== 0 ? l : ((l = window.event), l === void 0 ? 32 : _m(l.type));
    }
    function Vf(l, t) {
      var e = T.p;
      try {
        return (T.p = l), t();
      } finally {
        T.p = e;
      }
    }
    var le = Math.random().toString(36).slice(2),
      Vl = "__reactFiber$" + le,
      lt = "__reactProps$" + le,
      Le = "__reactContainer$" + le,
      si = "__reactEvents$" + le,
      Sr = "__reactListeners$" + le,
      Nr = "__reactHandles$" + le,
      Lf = "__reactResources$" + le,
      qa = "__reactMarker$" + le;
    function di(l) {
      delete l[Vl], delete l[lt], delete l[si], delete l[Sr], delete l[Nr];
    }
    function Ke(l) {
      var t = l[Vl];
      if (t) return t;
      for (var e = l.parentNode; e; ) {
        if ((t = e[Le] || e[Vl])) {
          if (
            ((e = t.alternate),
            t.child !== null || (e !== null && e.child !== null))
          )
            for (l = mm(l); l !== null; ) {
              if ((e = l[Vl])) return e;
              l = mm(l);
            }
          return t;
        }
        (l = e), (e = l.parentNode);
      }
      return null;
    }
    function Je(l) {
      if ((l = l[Vl] || l[Le])) {
        var t = l.tag;
        if (
          t === 5 ||
          t === 6 ||
          t === 13 ||
          t === 31 ||
          t === 26 ||
          t === 27 ||
          t === 3
        )
          return l;
      }
      return null;
    }
    function Ya(l) {
      var t = l.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return l.stateNode;
      throw Error(h(33));
    }
    function we(l) {
      var t = l[Lf];
      return (
        t ||
          (t = l[Lf] =
            { hoistableStyles: new Map(), hoistableScripts: new Map() }),
        t
      );
    }
    function Xl(l) {
      l[qa] = !0;
    }
    var Kf = new Set(),
      Jf = {};
    function Te(l, t) {
      We(l, t), We(l + "Capture", t);
    }
    function We(l, t) {
      for (Jf[l] = t, l = 0; l < t.length; l++) Kf.add(t[l]);
    }
    var pr = RegExp(
        "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      ),
      wf = {},
      Wf = {};
    function Ar(l) {
      return ai.call(Wf, l)
        ? !0
        : ai.call(wf, l)
        ? !1
        : pr.test(l)
        ? (Wf[l] = !0)
        : ((wf[l] = !0), !1);
    }
    function Cu(l, t, e) {
      if (Ar(t))
        if (e === null) l.removeAttribute(t);
        else {
          switch (typeof e) {
            case "undefined":
            case "function":
            case "symbol":
              l.removeAttribute(t);
              return;
            case "boolean":
              var a = t.toLowerCase().slice(0, 5);
              if (a !== "data-" && a !== "aria-") {
                l.removeAttribute(t);
                return;
              }
          }
          l.setAttribute(t, "" + e);
        }
    }
    function Ru(l, t, e) {
      if (e === null) l.removeAttribute(t);
      else {
        switch (typeof e) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            l.removeAttribute(t);
            return;
        }
        l.setAttribute(t, "" + e);
      }
    }
    function Ht(l, t, e, a) {
      if (a === null) l.removeAttribute(e);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            l.removeAttribute(e);
            return;
        }
        l.setAttributeNS(t, e, "" + a);
      }
    }
    function bt(l) {
      switch (typeof l) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return l;
        case "object":
          return l;
        default:
          return "";
      }
    }
    function Ff(l) {
      var t = l.type;
      return (
        (l = l.nodeName) &&
        l.toLowerCase() === "input" &&
        (t === "checkbox" || t === "radio")
      );
    }
    function jr(l, t, e) {
      var a = Object.getOwnPropertyDescriptor(l.constructor.prototype, t);
      if (
        !l.hasOwnProperty(t) &&
        typeof a < "u" &&
        typeof a.get == "function" &&
        typeof a.set == "function"
      ) {
        var u = a.get,
          n = a.set;
        return (
          Object.defineProperty(l, t, {
            configurable: !0,
            get: function () {
              return u.call(this);
            },
            set: function (i) {
              (e = "" + i), n.call(this, i);
            },
          }),
          Object.defineProperty(l, t, { enumerable: a.enumerable }),
          {
            getValue: function () {
              return e;
            },
            setValue: function (i) {
              e = "" + i;
            },
            stopTracking: function () {
              (l._valueTracker = null), delete l[t];
            },
          }
        );
      }
    }
    function oi(l) {
      if (!l._valueTracker) {
        var t = Ff(l) ? "checked" : "value";
        l._valueTracker = jr(l, t, "" + l[t]);
      }
    }
    function $f(l) {
      if (!l) return !1;
      var t = l._valueTracker;
      if (!t) return !0;
      var e = t.getValue(),
        a = "";
      return (
        l && (a = Ff(l) ? (l.checked ? "true" : "false") : l.value),
        (l = a),
        l !== e ? (t.setValue(l), !0) : !1
      );
    }
    function Hu(l) {
      if (
        ((l = l || (typeof document < "u" ? document : void 0)), typeof l > "u")
      )
        return null;
      try {
        return l.activeElement || l.body;
      } catch {
        return l.body;
      }
    }
    var Er = /[\n"\\]/g;
    function St(l) {
      return l.replace(Er, function (t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      });
    }
    function mi(l, t, e, a, u, n, i, c) {
      (l.name = ""),
        i != null &&
        typeof i != "function" &&
        typeof i != "symbol" &&
        typeof i != "boolean"
          ? (l.type = i)
          : l.removeAttribute("type"),
        t != null
          ? i === "number"
            ? ((t === 0 && l.value === "") || l.value != t) &&
              (l.value = "" + bt(t))
            : l.value !== "" + bt(t) && (l.value = "" + bt(t))
          : (i !== "submit" && i !== "reset") || l.removeAttribute("value"),
        t != null
          ? ri(l, i, bt(t))
          : e != null
          ? ri(l, i, bt(e))
          : a != null && l.removeAttribute("value"),
        u == null && n != null && (l.defaultChecked = !!n),
        u != null &&
          (l.checked = u && typeof u != "function" && typeof u != "symbol"),
        c != null &&
        typeof c != "function" &&
        typeof c != "symbol" &&
        typeof c != "boolean"
          ? (l.name = "" + bt(c))
          : l.removeAttribute("name");
    }
    function kf(l, t, e, a, u, n, i, c) {
      if (
        (n != null &&
          typeof n != "function" &&
          typeof n != "symbol" &&
          typeof n != "boolean" &&
          (l.type = n),
        t != null || e != null)
      ) {
        if (!((n !== "submit" && n !== "reset") || t != null)) {
          oi(l);
          return;
        }
        (e = e != null ? "" + bt(e) : ""),
          (t = t != null ? "" + bt(t) : e),
          c || t === l.value || (l.value = t),
          (l.defaultValue = t);
      }
      (a = a ?? u),
        (a = typeof a != "function" && typeof a != "symbol" && !!a),
        (l.checked = c ? l.checked : !!a),
        (l.defaultChecked = !!a),
        i != null &&
          typeof i != "function" &&
          typeof i != "symbol" &&
          typeof i != "boolean" &&
          (l.name = i),
        oi(l);
    }
    function ri(l, t, e) {
      (t === "number" && Hu(l.ownerDocument) === l) ||
        l.defaultValue === "" + e ||
        (l.defaultValue = "" + e);
    }
    function Fe(l, t, e, a) {
      if (((l = l.options), t)) {
        t = {};
        for (var u = 0; u < e.length; u++) t["$" + e[u]] = !0;
        for (e = 0; e < l.length; e++)
          (u = t.hasOwnProperty("$" + l[e].value)),
            l[e].selected !== u && (l[e].selected = u),
            u && a && (l[e].defaultSelected = !0);
      } else {
        for (e = "" + bt(e), t = null, u = 0; u < l.length; u++) {
          if (l[u].value === e) {
            (l[u].selected = !0), a && (l[u].defaultSelected = !0);
            return;
          }
          t !== null || l[u].disabled || (t = l[u]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function If(l, t, e) {
      if (
        t != null &&
        ((t = "" + bt(t)), t !== l.value && (l.value = t), e == null)
      ) {
        l.defaultValue !== t && (l.defaultValue = t);
        return;
      }
      l.defaultValue = e != null ? "" + bt(e) : "";
    }
    function Pf(l, t, e, a) {
      if (t == null) {
        if (a != null) {
          if (e != null) throw Error(h(92));
          if (Zl(a)) {
            if (1 < a.length) throw Error(h(93));
            a = a[0];
          }
          e = a;
        }
        e == null && (e = ""), (t = e);
      }
      (e = bt(t)),
        (l.defaultValue = e),
        (a = l.textContent),
        a === e && a !== "" && a !== null && (l.value = a),
        oi(l);
    }
    function $e(l, t) {
      if (t) {
        var e = l.firstChild;
        if (e && e === l.lastChild && e.nodeType === 3) {
          e.nodeValue = t;
          return;
        }
      }
      l.textContent = t;
    }
    var zr = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " "
      )
    );
    function ls(l, t, e) {
      var a = t.indexOf("--") === 0;
      e == null || typeof e == "boolean" || e === ""
        ? a
          ? l.setProperty(t, "")
          : t === "float"
          ? (l.cssFloat = "")
          : (l[t] = "")
        : a
        ? l.setProperty(t, e)
        : typeof e != "number" || e === 0 || zr.has(t)
        ? t === "float"
          ? (l.cssFloat = e)
          : (l[t] = ("" + e).trim())
        : (l[t] = e + "px");
    }
    function ts(l, t, e) {
      if (t != null && typeof t != "object") throw Error(h(62));
      if (((l = l.style), e != null)) {
        for (var a in e)
          !e.hasOwnProperty(a) ||
            (t != null && t.hasOwnProperty(a)) ||
            (a.indexOf("--") === 0
              ? l.setProperty(a, "")
              : a === "float"
              ? (l.cssFloat = "")
              : (l[a] = ""));
        for (var u in t)
          (a = t[u]), t.hasOwnProperty(u) && e[u] !== a && ls(l, u, a);
      } else for (var n in t) t.hasOwnProperty(n) && ls(l, n, t[n]);
    }
    function hi(l) {
      if (l.indexOf("-") === -1) return !1;
      switch (l) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var xr = new Map([
        ["acceptCharset", "accept-charset"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
        ["crossOrigin", "crossorigin"],
        ["accentHeight", "accent-height"],
        ["alignmentBaseline", "alignment-baseline"],
        ["arabicForm", "arabic-form"],
        ["baselineShift", "baseline-shift"],
        ["capHeight", "cap-height"],
        ["clipPath", "clip-path"],
        ["clipRule", "clip-rule"],
        ["colorInterpolation", "color-interpolation"],
        ["colorInterpolationFilters", "color-interpolation-filters"],
        ["colorProfile", "color-profile"],
        ["colorRendering", "color-rendering"],
        ["dominantBaseline", "dominant-baseline"],
        ["enableBackground", "enable-background"],
        ["fillOpacity", "fill-opacity"],
        ["fillRule", "fill-rule"],
        ["floodColor", "flood-color"],
        ["floodOpacity", "flood-opacity"],
        ["fontFamily", "font-family"],
        ["fontSize", "font-size"],
        ["fontSizeAdjust", "font-size-adjust"],
        ["fontStretch", "font-stretch"],
        ["fontStyle", "font-style"],
        ["fontVariant", "font-variant"],
        ["fontWeight", "font-weight"],
        ["glyphName", "glyph-name"],
        ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
        ["glyphOrientationVertical", "glyph-orientation-vertical"],
        ["horizAdvX", "horiz-adv-x"],
        ["horizOriginX", "horiz-origin-x"],
        ["imageRendering", "image-rendering"],
        ["letterSpacing", "letter-spacing"],
        ["lightingColor", "lighting-color"],
        ["markerEnd", "marker-end"],
        ["markerMid", "marker-mid"],
        ["markerStart", "marker-start"],
        ["overlinePosition", "overline-position"],
        ["overlineThickness", "overline-thickness"],
        ["paintOrder", "paint-order"],
        ["panose-1", "panose-1"],
        ["pointerEvents", "pointer-events"],
        ["renderingIntent", "rendering-intent"],
        ["shapeRendering", "shape-rendering"],
        ["stopColor", "stop-color"],
        ["stopOpacity", "stop-opacity"],
        ["strikethroughPosition", "strikethrough-position"],
        ["strikethroughThickness", "strikethrough-thickness"],
        ["strokeDasharray", "stroke-dasharray"],
        ["strokeDashoffset", "stroke-dashoffset"],
        ["strokeLinecap", "stroke-linecap"],
        ["strokeLinejoin", "stroke-linejoin"],
        ["strokeMiterlimit", "stroke-miterlimit"],
        ["strokeOpacity", "stroke-opacity"],
        ["strokeWidth", "stroke-width"],
        ["textAnchor", "text-anchor"],
        ["textDecoration", "text-decoration"],
        ["textRendering", "text-rendering"],
        ["transformOrigin", "transform-origin"],
        ["underlinePosition", "underline-position"],
        ["underlineThickness", "underline-thickness"],
        ["unicodeBidi", "unicode-bidi"],
        ["unicodeRange", "unicode-range"],
        ["unitsPerEm", "units-per-em"],
        ["vAlphabetic", "v-alphabetic"],
        ["vHanging", "v-hanging"],
        ["vIdeographic", "v-ideographic"],
        ["vMathematical", "v-mathematical"],
        ["vectorEffect", "vector-effect"],
        ["vertAdvY", "vert-adv-y"],
        ["vertOriginX", "vert-origin-x"],
        ["vertOriginY", "vert-origin-y"],
        ["wordSpacing", "word-spacing"],
        ["writingMode", "writing-mode"],
        ["xmlnsXlink", "xmlns:xlink"],
        ["xHeight", "x-height"],
      ]),
      Tr =
        /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function qu(l) {
      return Tr.test("" + l)
        ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
        : l;
    }
    function qt() {}
    var vi = null;
    function yi(l) {
      return (
        (l = l.target || l.srcElement || window),
        l.correspondingUseElement && (l = l.correspondingUseElement),
        l.nodeType === 3 ? l.parentNode : l
      );
    }
    var ke = null,
      Ie = null;
    function es(l) {
      var t = Je(l);
      if (t && (l = t.stateNode)) {
        var e = l[lt] || null;
        l: switch (((l = t.stateNode), t.type)) {
          case "input":
            if (
              (mi(
                l,
                e.value,
                e.defaultValue,
                e.defaultValue,
                e.checked,
                e.defaultChecked,
                e.type,
                e.name
              ),
              (t = e.name),
              e.type === "radio" && t != null)
            ) {
              for (e = l; e.parentNode; ) e = e.parentNode;
              for (
                e = e.querySelectorAll(
                  'input[name="' + St("" + t) + '"][type="radio"]'
                ),
                  t = 0;
                t < e.length;
                t++
              ) {
                var a = e[t];
                if (a !== l && a.form === l.form) {
                  var u = a[lt] || null;
                  if (!u) throw Error(h(90));
                  mi(
                    a,
                    u.value,
                    u.defaultValue,
                    u.defaultValue,
                    u.checked,
                    u.defaultChecked,
                    u.type,
                    u.name
                  );
                }
              }
              for (t = 0; t < e.length; t++)
                (a = e[t]), a.form === l.form && $f(a);
            }
            break l;
          case "textarea":
            If(l, e.value, e.defaultValue);
            break l;
          case "select":
            (t = e.value), t != null && Fe(l, !!e.multiple, t, !1);
        }
      }
    }
    var gi = !1;
    function as(l, t, e) {
      if (gi) return l(t, e);
      gi = !0;
      try {
        var a = l(t);
        return a;
      } finally {
        if (
          ((gi = !1),
          (ke !== null || Ie !== null) &&
            (En(), ke && ((t = ke), (l = Ie), (Ie = ke = null), es(t), l)))
        )
          for (t = 0; t < l.length; t++) es(l[t]);
      }
    }
    function Ba(l, t) {
      var e = l.stateNode;
      if (e === null) return null;
      var a = e[lt] || null;
      if (a === null) return null;
      e = a[t];
      l: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (a = !a.disabled) ||
            ((l = l.type),
            (a = !(
              l === "button" ||
              l === "input" ||
              l === "select" ||
              l === "textarea"
            ))),
            (l = !a);
          break l;
        default:
          l = !1;
      }
      if (l) return null;
      if (e && typeof e != "function") throw Error(h(231, t, typeof e));
      return e;
    }
    var Yt = !(
        typeof window > "u" ||
        typeof window.document > "u" ||
        typeof window.document.createElement > "u"
      ),
      bi = !1;
    if (Yt)
      try {
        var Ga = {};
        Object.defineProperty(Ga, "passive", {
          get: function () {
            bi = !0;
          },
        }),
          window.addEventListener("test", Ga, Ga),
          window.removeEventListener("test", Ga, Ga);
      } catch {
        bi = !1;
      }
    var te = null,
      Si = null,
      Yu = null;
    function us() {
      if (Yu) return Yu;
      var l,
        t = Si,
        e = t.length,
        a,
        u = "value" in te ? te.value : te.textContent,
        n = u.length;
      for (l = 0; l < e && t[l] === u[l]; l++);
      var i = e - l;
      for (a = 1; a <= i && t[e - a] === u[n - a]; a++);
      return (Yu = u.slice(l, 1 < a ? 1 - a : void 0));
    }
    function Bu(l) {
      var t = l.keyCode;
      return (
        "charCode" in l
          ? ((l = l.charCode), l === 0 && t === 13 && (l = 13))
          : (l = t),
        l === 10 && (l = 13),
        32 <= l || l === 13 ? l : 0
      );
    }
    function Gu() {
      return !0;
    }
    function ns() {
      return !1;
    }
    function tt(l) {
      function t(e, a, u, n, i) {
        (this._reactName = e),
          (this._targetInst = u),
          (this.type = a),
          (this.nativeEvent = n),
          (this.target = i),
          (this.currentTarget = null);
        for (var c in l)
          l.hasOwnProperty(c) && ((e = l[c]), (this[c] = e ? e(n) : n[c]));
        return (
          (this.isDefaultPrevented = (
            n.defaultPrevented != null
              ? n.defaultPrevented
              : n.returnValue === !1
          )
            ? Gu
            : ns),
          (this.isPropagationStopped = ns),
          this
        );
      }
      return (
        U(t.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var e = this.nativeEvent;
            e &&
              (e.preventDefault
                ? e.preventDefault()
                : typeof e.returnValue != "unknown" && (e.returnValue = !1),
              (this.isDefaultPrevented = Gu));
          },
          stopPropagation: function () {
            var e = this.nativeEvent;
            e &&
              (e.stopPropagation
                ? e.stopPropagation()
                : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0),
              (this.isPropagationStopped = Gu));
          },
          persist: function () {},
          isPersistent: Gu,
        }),
        t
      );
    }
    var _e = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (l) {
          return l.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      Xu = tt(_e),
      Xa = U({}, _e, { view: 0, detail: 0 }),
      _r = tt(Xa),
      Ni,
      pi,
      Qa,
      Qu = U({}, Xa, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: ji,
        button: 0,
        buttons: 0,
        relatedTarget: function (l) {
          return l.relatedTarget === void 0
            ? l.fromElement === l.srcElement
              ? l.toElement
              : l.fromElement
            : l.relatedTarget;
        },
        movementX: function (l) {
          return "movementX" in l
            ? l.movementX
            : (l !== Qa &&
                (Qa && l.type === "mousemove"
                  ? ((Ni = l.screenX - Qa.screenX),
                    (pi = l.screenY - Qa.screenY))
                  : (pi = Ni = 0),
                (Qa = l)),
              Ni);
        },
        movementY: function (l) {
          return "movementY" in l ? l.movementY : pi;
        },
      }),
      is = tt(Qu),
      Mr = U({}, Qu, { dataTransfer: 0 }),
      Or = tt(Mr),
      Dr = U({}, Xa, { relatedTarget: 0 }),
      Ai = tt(Dr),
      Ur = U({}, _e, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
      Cr = tt(Ur),
      Rr = U({}, _e, {
        clipboardData: function (l) {
          return "clipboardData" in l ? l.clipboardData : window.clipboardData;
        },
      }),
      Hr = tt(Rr),
      qr = U({}, _e, { data: 0 }),
      cs = tt(qr),
      Yr = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified",
      },
      Br = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta",
      },
      Gr = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
      };
    function Xr(l) {
      var t = this.nativeEvent;
      return t.getModifierState
        ? t.getModifierState(l)
        : (l = Gr[l])
        ? !!t[l]
        : !1;
    }
    function ji() {
      return Xr;
    }
    var Qr = U({}, Xa, {
        key: function (l) {
          if (l.key) {
            var t = Yr[l.key] || l.key;
            if (t !== "Unidentified") return t;
          }
          return l.type === "keypress"
            ? ((l = Bu(l)), l === 13 ? "Enter" : String.fromCharCode(l))
            : l.type === "keydown" || l.type === "keyup"
            ? Br[l.keyCode] || "Unidentified"
            : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: ji,
        charCode: function (l) {
          return l.type === "keypress" ? Bu(l) : 0;
        },
        keyCode: function (l) {
          return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
        },
        which: function (l) {
          return l.type === "keypress"
            ? Bu(l)
            : l.type === "keydown" || l.type === "keyup"
            ? l.keyCode
            : 0;
        },
      }),
      Zr = tt(Qr),
      Vr = U({}, Qu, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
      }),
      fs = tt(Vr),
      Lr = U({}, Xa, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: ji,
      }),
      Kr = tt(Lr),
      Jr = U({}, _e, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
      wr = tt(Jr),
      Wr = U({}, Qu, {
        deltaX: function (l) {
          return "deltaX" in l
            ? l.deltaX
            : "wheelDeltaX" in l
            ? -l.wheelDeltaX
            : 0;
        },
        deltaY: function (l) {
          return "deltaY" in l
            ? l.deltaY
            : "wheelDeltaY" in l
            ? -l.wheelDeltaY
            : "wheelDelta" in l
            ? -l.wheelDelta
            : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
      }),
      Fr = tt(Wr),
      $r = U({}, _e, { newState: 0, oldState: 0 }),
      kr = tt($r),
      Ir = [9, 13, 27, 32],
      Ei = Yt && "CompositionEvent" in window,
      Za = null;
    Yt && "documentMode" in document && (Za = document.documentMode);
    var Pr = Yt && "TextEvent" in window && !Za,
      ss = Yt && (!Ei || (Za && 8 < Za && 11 >= Za)),
      ds = " ",
      os = !1;
    function ms(l, t) {
      switch (l) {
        case "keyup":
          return Ir.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function rs(l) {
      return (
        (l = l.detail), typeof l == "object" && "data" in l ? l.data : null
      );
    }
    var Pe = !1;
    function lh(l, t) {
      switch (l) {
        case "compositionend":
          return rs(t);
        case "keypress":
          return t.which !== 32 ? null : ((os = !0), ds);
        case "textInput":
          return (l = t.data), l === ds && os ? null : l;
        default:
          return null;
      }
    }
    function th(l, t) {
      if (Pe)
        return l === "compositionend" || (!Ei && ms(l, t))
          ? ((l = us()), (Yu = Si = te = null), (Pe = !1), l)
          : null;
      switch (l) {
        case "paste":
          return null;
        case "keypress":
          if (
            !(t.ctrlKey || t.altKey || t.metaKey) ||
            (t.ctrlKey && t.altKey)
          ) {
            if (t.char && 1 < t.char.length) return t.char;
            if (t.which) return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return ss && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    var eh = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0,
    };
    function hs(l) {
      var t = l && l.nodeName && l.nodeName.toLowerCase();
      return t === "input" ? !!eh[l.type] : t === "textarea";
    }
    function vs(l, t, e, a) {
      ke ? (Ie ? Ie.push(a) : (Ie = [a])) : (ke = a),
        (t = Dn(t, "onChange")),
        0 < t.length &&
          ((e = new Xu("onChange", "change", null, e, a)),
          l.push({ event: e, listeners: t }));
    }
    var Va = null,
      La = null;
    function ah(l) {
      Io(l, 0);
    }
    function Zu(l) {
      var t = Ya(l);
      if ($f(t)) return l;
    }
    function ys(l, t) {
      if (l === "change") return t;
    }
    var gs = !1;
    if (Yt) {
      var zi;
      if (Yt) {
        var xi = "oninput" in document;
        if (!xi) {
          var bs = document.createElement("div");
          bs.setAttribute("oninput", "return;"),
            (xi = typeof bs.oninput == "function");
        }
        zi = xi;
      } else zi = !1;
      gs = zi && (!document.documentMode || 9 < document.documentMode);
    }
    function Ss() {
      Va && (Va.detachEvent("onpropertychange", Ns), (La = Va = null));
    }
    function Ns(l) {
      if (l.propertyName === "value" && Zu(La)) {
        var t = [];
        vs(t, La, l, yi(l)), as(ah, t);
      }
    }
    function uh(l, t, e) {
      l === "focusin"
        ? (Ss(), (Va = t), (La = e), Va.attachEvent("onpropertychange", Ns))
        : l === "focusout" && Ss();
    }
    function nh(l) {
      if (l === "selectionchange" || l === "keyup" || l === "keydown")
        return Zu(La);
    }
    function ih(l, t) {
      if (l === "click") return Zu(t);
    }
    function ch(l, t) {
      if (l === "input" || l === "change") return Zu(t);
    }
    function fh(l, t) {
      return (l === t && (l !== 0 || 1 / l === 1 / t)) || (l !== l && t !== t);
    }
    var ot = typeof Object.is == "function" ? Object.is : fh;
    function Ka(l, t) {
      if (ot(l, t)) return !0;
      if (
        typeof l != "object" ||
        l === null ||
        typeof t != "object" ||
        t === null
      )
        return !1;
      var e = Object.keys(l),
        a = Object.keys(t);
      if (e.length !== a.length) return !1;
      for (a = 0; a < e.length; a++) {
        var u = e[a];
        if (!ai.call(t, u) || !ot(l[u], t[u])) return !1;
      }
      return !0;
    }
    function ps(l) {
      for (; l && l.firstChild; ) l = l.firstChild;
      return l;
    }
    function As(l, t) {
      var e = ps(l);
      l = 0;
      for (var a; e; ) {
        if (e.nodeType === 3) {
          if (((a = l + e.textContent.length), l <= t && a >= t))
            return { node: e, offset: t - l };
          l = a;
        }
        l: {
          for (; e; ) {
            if (e.nextSibling) {
              e = e.nextSibling;
              break l;
            }
            e = e.parentNode;
          }
          e = void 0;
        }
        e = ps(e);
      }
    }
    function js(l, t) {
      return l && t
        ? l === t
          ? !0
          : l && l.nodeType === 3
          ? !1
          : t && t.nodeType === 3
          ? js(l, t.parentNode)
          : "contains" in l
          ? l.contains(t)
          : l.compareDocumentPosition
          ? !!(l.compareDocumentPosition(t) & 16)
          : !1
        : !1;
    }
    function Es(l) {
      l =
        l != null &&
        l.ownerDocument != null &&
        l.ownerDocument.defaultView != null
          ? l.ownerDocument.defaultView
          : window;
      for (var t = Hu(l.document); t instanceof l.HTMLIFrameElement; ) {
        try {
          var e = typeof t.contentWindow.location.href == "string";
        } catch {
          e = !1;
        }
        if (e) l = t.contentWindow;
        else break;
        t = Hu(l.document);
      }
      return t;
    }
    function Ti(l) {
      var t = l && l.nodeName && l.nodeName.toLowerCase();
      return (
        t &&
        ((t === "input" &&
          (l.type === "text" ||
            l.type === "search" ||
            l.type === "tel" ||
            l.type === "url" ||
            l.type === "password")) ||
          t === "textarea" ||
          l.contentEditable === "true")
      );
    }
    var sh = Yt && "documentMode" in document && 11 >= document.documentMode,
      la = null,
      _i = null,
      Ja = null,
      Mi = !1;
    function zs(l, t, e) {
      var a =
        e.window === e ? e.document : e.nodeType === 9 ? e : e.ownerDocument;
      Mi ||
        la == null ||
        la !== Hu(a) ||
        ((a = la),
        "selectionStart" in a && Ti(a)
          ? (a = { start: a.selectionStart, end: a.selectionEnd })
          : ((a = (
              (a.ownerDocument && a.ownerDocument.defaultView) ||
              window
            ).getSelection()),
            (a = {
              anchorNode: a.anchorNode,
              anchorOffset: a.anchorOffset,
              focusNode: a.focusNode,
              focusOffset: a.focusOffset,
            })),
        (Ja && Ka(Ja, a)) ||
          ((Ja = a),
          (a = Dn(_i, "onSelect")),
          0 < a.length &&
            ((t = new Xu("onSelect", "select", null, t, e)),
            l.push({ event: t, listeners: a }),
            (t.target = la))));
    }
    function Me(l, t) {
      var e = {};
      return (
        (e[l.toLowerCase()] = t.toLowerCase()),
        (e["Webkit" + l] = "webkit" + t),
        (e["Moz" + l] = "moz" + t),
        e
      );
    }
    var ta = {
        animationend: Me("Animation", "AnimationEnd"),
        animationiteration: Me("Animation", "AnimationIteration"),
        animationstart: Me("Animation", "AnimationStart"),
        transitionrun: Me("Transition", "TransitionRun"),
        transitionstart: Me("Transition", "TransitionStart"),
        transitioncancel: Me("Transition", "TransitionCancel"),
        transitionend: Me("Transition", "TransitionEnd"),
      },
      Oi = {},
      xs = {};
    Yt &&
      ((xs = document.createElement("div").style),
      "AnimationEvent" in window ||
        (delete ta.animationend.animation,
        delete ta.animationiteration.animation,
        delete ta.animationstart.animation),
      "TransitionEvent" in window || delete ta.transitionend.transition);
    function Oe(l) {
      if (Oi[l]) return Oi[l];
      if (!ta[l]) return l;
      var t = ta[l],
        e;
      for (e in t) if (t.hasOwnProperty(e) && e in xs) return (Oi[l] = t[e]);
      return l;
    }
    var Ts = Oe("animationend"),
      _s = Oe("animationiteration"),
      Ms = Oe("animationstart"),
      dh = Oe("transitionrun"),
      oh = Oe("transitionstart"),
      mh = Oe("transitioncancel"),
      Os = Oe("transitionend"),
      Ds = new Map(),
      Di =
        "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
          " "
        );
    Di.push("scrollEnd");
    function _t(l, t) {
      Ds.set(l, t), Te(t, [l]);
    }
    var Vu =
        typeof reportError == "function"
          ? reportError
          : function (l) {
              if (
                typeof window == "object" &&
                typeof window.ErrorEvent == "function"
              ) {
                var t = new window.ErrorEvent("error", {
                  bubbles: !0,
                  cancelable: !0,
                  message:
                    typeof l == "object" &&
                    l !== null &&
                    typeof l.message == "string"
                      ? String(l.message)
                      : String(l),
                  error: l,
                });
                if (!window.dispatchEvent(t)) return;
              } else if (
                typeof process == "object" &&
                typeof process.emit == "function"
              ) {
                process.emit("uncaughtException", l);
                return;
              }
              console.error(l);
            },
      Nt = [],
      ea = 0,
      Ui = 0;
    function Lu() {
      for (var l = ea, t = (Ui = ea = 0); t < l; ) {
        var e = Nt[t];
        Nt[t++] = null;
        var a = Nt[t];
        Nt[t++] = null;
        var u = Nt[t];
        Nt[t++] = null;
        var n = Nt[t];
        if (((Nt[t++] = null), a !== null && u !== null)) {
          var i = a.pending;
          i === null ? (u.next = u) : ((u.next = i.next), (i.next = u)),
            (a.pending = u);
        }
        n !== 0 && Us(e, u, n);
      }
    }
    function Ku(l, t, e, a) {
      (Nt[ea++] = l),
        (Nt[ea++] = t),
        (Nt[ea++] = e),
        (Nt[ea++] = a),
        (Ui |= a),
        (l.lanes |= a),
        (l = l.alternate),
        l !== null && (l.lanes |= a);
    }
    function Ci(l, t, e, a) {
      return Ku(l, t, e, a), Ju(l);
    }
    function De(l, t) {
      return Ku(l, null, null, t), Ju(l);
    }
    function Us(l, t, e) {
      l.lanes |= e;
      var a = l.alternate;
      a !== null && (a.lanes |= e);
      for (var u = !1, n = l.return; n !== null; )
        (n.childLanes |= e),
          (a = n.alternate),
          a !== null && (a.childLanes |= e),
          n.tag === 22 &&
            ((l = n.stateNode), l === null || l._visibility & 1 || (u = !0)),
          (l = n),
          (n = n.return);
      return l.tag === 3
        ? ((n = l.stateNode),
          u &&
            t !== null &&
            ((u = 31 - dt(e)),
            (l = n.hiddenUpdates),
            (a = l[u]),
            a === null ? (l[u] = [t]) : a.push(t),
            (t.lane = e | 536870912)),
          n)
        : null;
    }
    function Ju(l) {
      if (50 < hu) throw ((hu = 0), (Zc = null), Error(h(185)));
      for (var t = l.return; t !== null; ) (l = t), (t = l.return);
      return l.tag === 3 ? l.stateNode : null;
    }
    var aa = {};
    function rh(l, t, e, a) {
      (this.tag = l),
        (this.key = e),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.refCleanup = this.ref = null),
        (this.pendingProps = t),
        (this.dependencies =
          this.memoizedState =
          this.updateQueue =
          this.memoizedProps =
            null),
        (this.mode = a),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null);
    }
    function mt(l, t, e, a) {
      return new rh(l, t, e, a);
    }
    function Ri(l) {
      return (l = l.prototype), !(!l || !l.isReactComponent);
    }
    function Bt(l, t) {
      var e = l.alternate;
      return (
        e === null
          ? ((e = mt(l.tag, t, l.key, l.mode)),
            (e.elementType = l.elementType),
            (e.type = l.type),
            (e.stateNode = l.stateNode),
            (e.alternate = l),
            (l.alternate = e))
          : ((e.pendingProps = t),
            (e.type = l.type),
            (e.flags = 0),
            (e.subtreeFlags = 0),
            (e.deletions = null)),
        (e.flags = l.flags & 65011712),
        (e.childLanes = l.childLanes),
        (e.lanes = l.lanes),
        (e.child = l.child),
        (e.memoizedProps = l.memoizedProps),
        (e.memoizedState = l.memoizedState),
        (e.updateQueue = l.updateQueue),
        (t = l.dependencies),
        (e.dependencies =
          t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
        (e.sibling = l.sibling),
        (e.index = l.index),
        (e.ref = l.ref),
        (e.refCleanup = l.refCleanup),
        e
      );
    }
    function Cs(l, t) {
      l.flags &= 65011714;
      var e = l.alternate;
      return (
        e === null
          ? ((l.childLanes = 0),
            (l.lanes = t),
            (l.child = null),
            (l.subtreeFlags = 0),
            (l.memoizedProps = null),
            (l.memoizedState = null),
            (l.updateQueue = null),
            (l.dependencies = null),
            (l.stateNode = null))
          : ((l.childLanes = e.childLanes),
            (l.lanes = e.lanes),
            (l.child = e.child),
            (l.subtreeFlags = 0),
            (l.deletions = null),
            (l.memoizedProps = e.memoizedProps),
            (l.memoizedState = e.memoizedState),
            (l.updateQueue = e.updateQueue),
            (l.type = e.type),
            (t = e.dependencies),
            (l.dependencies =
              t === null
                ? null
                : { lanes: t.lanes, firstContext: t.firstContext })),
        l
      );
    }
    function wu(l, t, e, a, u, n) {
      var i = 0;
      if (((a = l), typeof l == "function")) Ri(l) && (i = 1);
      else if (typeof l == "string")
        i = bv(l, e, m.current)
          ? 26
          : l === "html" || l === "head" || l === "body"
          ? 27
          : 5;
      else
        l: switch (l) {
          case Sl:
            return (
              (l = mt(31, e, t, u)), (l.elementType = Sl), (l.lanes = n), l
            );
          case al:
            return Ue(e.children, u, n, t);
          case rl:
            (i = 8), (u |= 24);
            break;
          case fl:
            return (
              (l = mt(12, e, t, u | 2)), (l.elementType = fl), (l.lanes = n), l
            );
          case Fl:
            return (
              (l = mt(13, e, t, u)), (l.elementType = Fl), (l.lanes = n), l
            );
          case _l:
            return (
              (l = mt(19, e, t, u)), (l.elementType = _l), (l.lanes = n), l
            );
          default:
            if (typeof l == "object" && l !== null)
              switch (l.$$typeof) {
                case hl:
                  i = 10;
                  break l;
                case El:
                  i = 9;
                  break l;
                case Gl:
                  i = 11;
                  break l;
                case V:
                  i = 14;
                  break l;
                case Cl:
                  (i = 16), (a = null);
                  break l;
              }
            (i = 29),
              (e = Error(h(130, l === null ? "null" : typeof l, ""))),
              (a = null);
        }
      return (
        (t = mt(i, e, t, u)),
        (t.elementType = l),
        (t.type = a),
        (t.lanes = n),
        t
      );
    }
    function Ue(l, t, e, a) {
      return (l = mt(7, l, a, t)), (l.lanes = e), l;
    }
    function Hi(l, t, e) {
      return (l = mt(6, l, null, t)), (l.lanes = e), l;
    }
    function Rs(l) {
      var t = mt(18, null, null, 0);
      return (t.stateNode = l), t;
    }
    function qi(l, t, e) {
      return (
        (t = mt(4, l.children !== null ? l.children : [], l.key, t)),
        (t.lanes = e),
        (t.stateNode = {
          containerInfo: l.containerInfo,
          pendingChildren: null,
          implementation: l.implementation,
        }),
        t
      );
    }
    var Hs = new WeakMap();
    function pt(l, t) {
      if (typeof l == "object" && l !== null) {
        var e = Hs.get(l);
        return e !== void 0
          ? e
          : ((t = { value: l, source: t, stack: Rf(t) }), Hs.set(l, t), t);
      }
      return { value: l, source: t, stack: Rf(t) };
    }
    var ua = [],
      na = 0,
      Wu = null,
      wa = 0,
      At = [],
      jt = 0,
      ee = null,
      Dt = 1,
      Ut = "";
    function Gt(l, t) {
      (ua[na++] = wa), (ua[na++] = Wu), (Wu = l), (wa = t);
    }
    function qs(l, t, e) {
      (At[jt++] = Dt), (At[jt++] = Ut), (At[jt++] = ee), (ee = l);
      var a = Dt;
      l = Ut;
      var u = 32 - dt(a) - 1;
      (a &= ~(1 << u)), (e += 1);
      var n = 32 - dt(t) + u;
      if (30 < n) {
        var i = u - (u % 5);
        (n = (a & ((1 << i) - 1)).toString(32)),
          (a >>= i),
          (u -= i),
          (Dt = (1 << (32 - dt(t) + u)) | (e << u) | a),
          (Ut = n + l);
      } else (Dt = (1 << n) | (e << u) | a), (Ut = l);
    }
    function Yi(l) {
      l.return !== null && (Gt(l, 1), qs(l, 1, 0));
    }
    function Bi(l) {
      for (; l === Wu; )
        (Wu = ua[--na]), (ua[na] = null), (wa = ua[--na]), (ua[na] = null);
      for (; l === ee; )
        (ee = At[--jt]),
          (At[jt] = null),
          (Ut = At[--jt]),
          (At[jt] = null),
          (Dt = At[--jt]),
          (At[jt] = null);
    }
    function Ys(l, t) {
      (At[jt++] = Dt),
        (At[jt++] = Ut),
        (At[jt++] = ee),
        (Dt = t.id),
        (Ut = t.overflow),
        (ee = l);
    }
    var Ll = null,
      Nl = null,
      el = !1,
      ae = null,
      Et = !1,
      Gi = Error(h(519));
    function ue(l) {
      var t = Error(
        h(
          418,
          1 < arguments.length && arguments[1] !== void 0 && arguments[1]
            ? "text"
            : "HTML",
          ""
        )
      );
      throw (Wa(pt(t, l)), Gi);
    }
    function Bs(l) {
      var t = l.stateNode,
        e = l.type,
        a = l.memoizedProps;
      switch (((t[Vl] = l), (t[lt] = a), e)) {
        case "dialog":
          $("cancel", t), $("close", t);
          break;
        case "iframe":
        case "object":
        case "embed":
          $("load", t);
          break;
        case "video":
        case "audio":
          for (e = 0; e < yu.length; e++) $(yu[e], t);
          break;
        case "source":
          $("error", t);
          break;
        case "img":
        case "image":
        case "link":
          $("error", t), $("load", t);
          break;
        case "details":
          $("toggle", t);
          break;
        case "input":
          $("invalid", t),
            kf(
              t,
              a.value,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name,
              !0
            );
          break;
        case "select":
          $("invalid", t);
          break;
        case "textarea":
          $("invalid", t), Pf(t, a.value, a.defaultValue, a.children);
      }
      (e = a.children),
        (typeof e != "string" &&
          typeof e != "number" &&
          typeof e != "bigint") ||
        t.textContent === "" + e ||
        a.suppressHydrationWarning === !0 ||
        em(t.textContent, e)
          ? (a.popover != null && ($("beforetoggle", t), $("toggle", t)),
            a.onScroll != null && $("scroll", t),
            a.onScrollEnd != null && $("scrollend", t),
            a.onClick != null && (t.onclick = qt),
            (t = !0))
          : (t = !1),
        t || ue(l, !0);
    }
    function Gs(l) {
      for (Ll = l.return; Ll; )
        switch (Ll.tag) {
          case 5:
          case 31:
          case 13:
            Et = !1;
            return;
          case 27:
          case 3:
            Et = !0;
            return;
          default:
            Ll = Ll.return;
        }
    }
    function ia(l) {
      if (l !== Ll) return !1;
      if (!el) return Gs(l), (el = !0), !1;
      var t = l.tag,
        e;
      if (
        ((e = t !== 3 && t !== 27) &&
          ((e = t === 5) &&
            ((e = l.type),
            (e =
              !(e !== "form" && e !== "button") ||
              af(l.type, l.memoizedProps))),
          (e = !e)),
        e && Nl && ue(l),
        Gs(l),
        t === 13)
      ) {
        if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
          throw Error(h(317));
        Nl = om(l);
      } else if (t === 31) {
        if (((l = l.memoizedState), (l = l !== null ? l.dehydrated : null), !l))
          throw Error(h(317));
        Nl = om(l);
      } else
        t === 27
          ? ((t = Nl),
            be(l.type) ? ((l = sf), (sf = null), (Nl = l)) : (Nl = t))
          : (Nl = Ll ? xt(l.stateNode.nextSibling) : null);
      return !0;
    }
    function Ce() {
      (Nl = Ll = null), (el = !1);
    }
    function Xi() {
      var l = ae;
      return (
        l !== null &&
          (nt === null ? (nt = l) : nt.push.apply(nt, l), (ae = null)),
        l
      );
    }
    function Wa(l) {
      ae === null ? (ae = [l]) : ae.push(l);
    }
    var Qi = o(null),
      Re = null,
      Xt = null;
    function ne(l, t, e) {
      b(Qi, t._currentValue), (t._currentValue = e);
    }
    function Qt(l) {
      (l._currentValue = Qi.current), z(Qi);
    }
    function Zi(l, t, e) {
      for (; l !== null; ) {
        var a = l.alternate;
        if (
          ((l.childLanes & t) !== t
            ? ((l.childLanes |= t), a !== null && (a.childLanes |= t))
            : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
          l === e)
        )
          break;
        l = l.return;
      }
    }
    function Vi(l, t, e, a) {
      var u = l.child;
      for (u !== null && (u.return = l); u !== null; ) {
        var n = u.dependencies;
        if (n !== null) {
          var i = u.child;
          n = n.firstContext;
          l: for (; n !== null; ) {
            var c = n;
            n = u;
            for (var s = 0; s < t.length; s++)
              if (c.context === t[s]) {
                (n.lanes |= e),
                  (c = n.alternate),
                  c !== null && (c.lanes |= e),
                  Zi(n.return, e, l),
                  a || (i = null);
                break l;
              }
            n = c.next;
          }
        } else if (u.tag === 18) {
          if (((i = u.return), i === null)) throw Error(h(341));
          (i.lanes |= e),
            (n = i.alternate),
            n !== null && (n.lanes |= e),
            Zi(i, e, l),
            (i = null);
        } else i = u.child;
        if (i !== null) i.return = u;
        else
          for (i = u; i !== null; ) {
            if (i === l) {
              i = null;
              break;
            }
            if (((u = i.sibling), u !== null)) {
              (u.return = i.return), (i = u);
              break;
            }
            i = i.return;
          }
        u = i;
      }
    }
    function ca(l, t, e, a) {
      l = null;
      for (var u = t, n = !1; u !== null; ) {
        if (!n) {
          if ((u.flags & 524288) !== 0) n = !0;
          else if ((u.flags & 262144) !== 0) break;
        }
        if (u.tag === 10) {
          var i = u.alternate;
          if (i === null) throw Error(h(387));
          if (((i = i.memoizedProps), i !== null)) {
            var c = u.type;
            ot(u.pendingProps.value, i.value) ||
              (l !== null ? l.push(c) : (l = [c]));
          }
        } else if (u === sl.current) {
          if (((i = u.alternate), i === null)) throw Error(h(387));
          i.memoizedState.memoizedState !== u.memoizedState.memoizedState &&
            (l !== null ? l.push(pu) : (l = [pu]));
        }
        u = u.return;
      }
      l !== null && Vi(t, l, e, a), (t.flags |= 262144);
    }
    function Fu(l) {
      for (l = l.firstContext; l !== null; ) {
        if (!ot(l.context._currentValue, l.memoizedValue)) return !0;
        l = l.next;
      }
      return !1;
    }
    function He(l) {
      (Re = l),
        (Xt = null),
        (l = l.dependencies),
        l !== null && (l.firstContext = null);
    }
    function Kl(l) {
      return Xs(Re, l);
    }
    function $u(l, t) {
      return Re === null && He(l), Xs(l, t);
    }
    function Xs(l, t) {
      var e = t._currentValue;
      if (((t = { context: t, memoizedValue: e, next: null }), Xt === null)) {
        if (l === null) throw Error(h(308));
        (Xt = t),
          (l.dependencies = { lanes: 0, firstContext: t }),
          (l.flags |= 524288);
      } else Xt = Xt.next = t;
      return e;
    }
    var hh =
        typeof AbortController < "u"
          ? AbortController
          : function () {
              var l = [],
                t = (this.signal = {
                  aborted: !1,
                  addEventListener: function (e, a) {
                    l.push(a);
                  },
                });
              this.abort = function () {
                (t.aborted = !0),
                  l.forEach(function (e) {
                    return e();
                  });
              };
            },
      vh = p.unstable_scheduleCallback,
      yh = p.unstable_NormalPriority,
      Rl = {
        $$typeof: hl,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0,
      };
    function Li() {
      return { controller: new hh(), data: new Map(), refCount: 0 };
    }
    function Fa(l) {
      l.refCount--,
        l.refCount === 0 &&
          vh(yh, function () {
            l.controller.abort();
          });
    }
    var $a = null,
      Ki = 0,
      fa = 0,
      sa = null;
    function gh(l, t) {
      if ($a === null) {
        var e = ($a = []);
        (Ki = 0),
          (fa = Wc()),
          (sa = {
            status: "pending",
            value: void 0,
            then: function (a) {
              e.push(a);
            },
          });
      }
      return Ki++, t.then(Qs, Qs), t;
    }
    function Qs() {
      if (--Ki === 0 && $a !== null) {
        sa !== null && (sa.status = "fulfilled");
        var l = $a;
        ($a = null), (fa = 0), (sa = null);
        for (var t = 0; t < l.length; t++) (0, l[t])();
      }
    }
    function bh(l, t) {
      var e = [],
        a = {
          status: "pending",
          value: null,
          reason: null,
          then: function (u) {
            e.push(u);
          },
        };
      return (
        l.then(
          function () {
            (a.status = "fulfilled"), (a.value = t);
            for (var u = 0; u < e.length; u++) (0, e[u])(t);
          },
          function (u) {
            for (a.status = "rejected", a.reason = u, u = 0; u < e.length; u++)
              (0, e[u])(void 0);
          }
        ),
        a
      );
    }
    var Zs = A.S;
    A.S = function (l, t) {
      (xo = ft()),
        typeof t == "object" &&
          t !== null &&
          typeof t.then == "function" &&
          gh(l, t),
        Zs !== null && Zs(l, t);
    };
    var qe = o(null);
    function Ji() {
      var l = qe.current;
      return l !== null ? l : bl.pooledCache;
    }
    function ku(l, t) {
      t === null ? b(qe, qe.current) : b(qe, t.pool);
    }
    function Vs() {
      var l = Ji();
      return l === null ? null : { parent: Rl._currentValue, pool: l };
    }
    var da = Error(h(460)),
      wi = Error(h(474)),
      Iu = Error(h(542)),
      Pu = { then: function () {} };
    function Ls(l) {
      return (l = l.status), l === "fulfilled" || l === "rejected";
    }
    function Ks(l, t, e) {
      switch (
        ((e = l[e]),
        e === void 0 ? l.push(t) : e !== t && (t.then(qt, qt), (t = e)),
        t.status)
      ) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw ((l = t.reason), ws(l), l);
        default:
          if (typeof t.status == "string") t.then(qt, qt);
          else {
            if (((l = bl), l !== null && 100 < l.shellSuspendCounter))
              throw Error(h(482));
            (l = t),
              (l.status = "pending"),
              l.then(
                function (a) {
                  if (t.status === "pending") {
                    var u = t;
                    (u.status = "fulfilled"), (u.value = a);
                  }
                },
                function (a) {
                  if (t.status === "pending") {
                    var u = t;
                    (u.status = "rejected"), (u.reason = a);
                  }
                }
              );
          }
          switch (t.status) {
            case "fulfilled":
              return t.value;
            case "rejected":
              throw ((l = t.reason), ws(l), l);
          }
          throw ((Be = t), da);
      }
    }
    function Ye(l) {
      try {
        var t = l._init;
        return t(l._payload);
      } catch (e) {
        throw e !== null && typeof e == "object" && typeof e.then == "function"
          ? ((Be = e), da)
          : e;
      }
    }
    var Be = null;
    function Js() {
      if (Be === null) throw Error(h(459));
      var l = Be;
      return (Be = null), l;
    }
    function ws(l) {
      if (l === da || l === Iu) throw Error(h(483));
    }
    var oa = null,
      ka = 0;
    function ln(l) {
      var t = ka;
      return (ka += 1), oa === null && (oa = []), Ks(oa, l, t);
    }
    function Ia(l, t) {
      (t = t.props.ref), (l.ref = t !== void 0 ? t : null);
    }
    function tn(l, t) {
      throw t.$$typeof === I
        ? Error(h(525))
        : ((l = Object.prototype.toString.call(t)),
          Error(
            h(
              31,
              l === "[object Object]"
                ? "object with keys {" + Object.keys(t).join(", ") + "}"
                : l
            )
          ));
    }
    function Ws(l) {
      function t(r, d) {
        if (l) {
          var v = r.deletions;
          v === null ? ((r.deletions = [d]), (r.flags |= 16)) : v.push(d);
        }
      }
      function e(r, d) {
        if (!l) return null;
        for (; d !== null; ) t(r, d), (d = d.sibling);
        return null;
      }
      function a(r) {
        for (var d = new Map(); r !== null; )
          r.key !== null ? d.set(r.key, r) : d.set(r.index, r), (r = r.sibling);
        return d;
      }
      function u(r, d) {
        return (r = Bt(r, d)), (r.index = 0), (r.sibling = null), r;
      }
      function n(r, d, v) {
        return (
          (r.index = v),
          l
            ? ((v = r.alternate),
              v !== null
                ? ((v = v.index), v < d ? ((r.flags |= 67108866), d) : v)
                : ((r.flags |= 67108866), d))
            : ((r.flags |= 1048576), d)
        );
      }
      function i(r) {
        return l && r.alternate === null && (r.flags |= 67108866), r;
      }
      function c(r, d, v, E) {
        return d === null || d.tag !== 6
          ? ((d = Hi(v, r.mode, E)), (d.return = r), d)
          : ((d = u(d, v)), (d.return = r), d);
      }
      function s(r, d, v, E) {
        var q = v.type;
        return q === al
          ? j(r, d, v.props.children, E, v.key)
          : d !== null &&
            (d.elementType === q ||
              (typeof q == "object" &&
                q !== null &&
                q.$$typeof === Cl &&
                Ye(q) === d.type))
          ? ((d = u(d, v.props)), Ia(d, v), (d.return = r), d)
          : ((d = wu(v.type, v.key, v.props, null, r.mode, E)),
            Ia(d, v),
            (d.return = r),
            d);
      }
      function y(r, d, v, E) {
        return d === null ||
          d.tag !== 4 ||
          d.stateNode.containerInfo !== v.containerInfo ||
          d.stateNode.implementation !== v.implementation
          ? ((d = qi(v, r.mode, E)), (d.return = r), d)
          : ((d = u(d, v.children || [])), (d.return = r), d);
      }
      function j(r, d, v, E, q) {
        return d === null || d.tag !== 7
          ? ((d = Ue(v, r.mode, E, q)), (d.return = r), d)
          : ((d = u(d, v)), (d.return = r), d);
      }
      function x(r, d, v) {
        if (
          (typeof d == "string" && d !== "") ||
          typeof d == "number" ||
          typeof d == "bigint"
        )
          return (d = Hi("" + d, r.mode, v)), (d.return = r), d;
        if (typeof d == "object" && d !== null) {
          switch (d.$$typeof) {
            case W:
              return (
                (v = wu(d.type, d.key, d.props, null, r.mode, v)),
                Ia(v, d),
                (v.return = r),
                v
              );
            case Z:
              return (d = qi(d, r.mode, v)), (d.return = r), d;
            case Cl:
              return (d = Ye(d)), x(r, d, v);
          }
          if (Zl(d) || Ml(d))
            return (d = Ue(d, r.mode, v, null)), (d.return = r), d;
          if (typeof d.then == "function") return x(r, ln(d), v);
          if (d.$$typeof === hl) return x(r, $u(r, d), v);
          tn(r, d);
        }
        return null;
      }
      function g(r, d, v, E) {
        var q = d !== null ? d.key : null;
        if (
          (typeof v == "string" && v !== "") ||
          typeof v == "number" ||
          typeof v == "bigint"
        )
          return q !== null ? null : c(r, d, "" + v, E);
        if (typeof v == "object" && v !== null) {
          switch (v.$$typeof) {
            case W:
              return v.key === q ? s(r, d, v, E) : null;
            case Z:
              return v.key === q ? y(r, d, v, E) : null;
            case Cl:
              return (v = Ye(v)), g(r, d, v, E);
          }
          if (Zl(v) || Ml(v)) return q !== null ? null : j(r, d, v, E, null);
          if (typeof v.then == "function") return g(r, d, ln(v), E);
          if (v.$$typeof === hl) return g(r, d, $u(r, v), E);
          tn(r, v);
        }
        return null;
      }
      function S(r, d, v, E, q) {
        if (
          (typeof E == "string" && E !== "") ||
          typeof E == "number" ||
          typeof E == "bigint"
        )
          return (r = r.get(v) || null), c(d, r, "" + E, q);
        if (typeof E == "object" && E !== null) {
          switch (E.$$typeof) {
            case W:
              return (
                (r = r.get(E.key === null ? v : E.key) || null), s(d, r, E, q)
              );
            case Z:
              return (
                (r = r.get(E.key === null ? v : E.key) || null), y(d, r, E, q)
              );
            case Cl:
              return (E = Ye(E)), S(r, d, v, E, q);
          }
          if (Zl(E) || Ml(E))
            return (r = r.get(v) || null), j(d, r, E, q, null);
          if (typeof E.then == "function") return S(r, d, v, ln(E), q);
          if (E.$$typeof === hl) return S(r, d, v, $u(d, E), q);
          tn(d, E);
        }
        return null;
      }
      function C(r, d, v, E) {
        for (
          var q = null, ul = null, H = d, K = (d = 0), ll = null;
          H !== null && K < v.length;
          K++
        ) {
          H.index > K ? ((ll = H), (H = null)) : (ll = H.sibling);
          var nl = g(r, H, v[K], E);
          if (nl === null) {
            H === null && (H = ll);
            break;
          }
          l && H && nl.alternate === null && t(r, H),
            (d = n(nl, d, K)),
            ul === null ? (q = nl) : (ul.sibling = nl),
            (ul = nl),
            (H = ll);
        }
        if (K === v.length) return e(r, H), el && Gt(r, K), q;
        if (H === null) {
          for (; K < v.length; K++)
            (H = x(r, v[K], E)),
              H !== null &&
                ((d = n(H, d, K)),
                ul === null ? (q = H) : (ul.sibling = H),
                (ul = H));
          return el && Gt(r, K), q;
        }
        for (H = a(H); K < v.length; K++)
          (ll = S(H, r, K, v[K], E)),
            ll !== null &&
              (l &&
                ll.alternate !== null &&
                H.delete(ll.key === null ? K : ll.key),
              (d = n(ll, d, K)),
              ul === null ? (q = ll) : (ul.sibling = ll),
              (ul = ll));
        return (
          l &&
            H.forEach(function (je) {
              return t(r, je);
            }),
          el && Gt(r, K),
          q
        );
      }
      function B(r, d, v, E) {
        if (v == null) throw Error(h(151));
        for (
          var q = null, ul = null, H = d, K = (d = 0), ll = null, nl = v.next();
          H !== null && !nl.done;
          K++, nl = v.next()
        ) {
          H.index > K ? ((ll = H), (H = null)) : (ll = H.sibling);
          var je = g(r, H, nl.value, E);
          if (je === null) {
            H === null && (H = ll);
            break;
          }
          l && H && je.alternate === null && t(r, H),
            (d = n(je, d, K)),
            ul === null ? (q = je) : (ul.sibling = je),
            (ul = je),
            (H = ll);
        }
        if (nl.done) return e(r, H), el && Gt(r, K), q;
        if (H === null) {
          for (; !nl.done; K++, nl = v.next())
            (nl = x(r, nl.value, E)),
              nl !== null &&
                ((d = n(nl, d, K)),
                ul === null ? (q = nl) : (ul.sibling = nl),
                (ul = nl));
          return el && Gt(r, K), q;
        }
        for (H = a(H); !nl.done; K++, nl = v.next())
          (nl = S(H, r, K, nl.value, E)),
            nl !== null &&
              (l &&
                nl.alternate !== null &&
                H.delete(nl.key === null ? K : nl.key),
              (d = n(nl, d, K)),
              ul === null ? (q = nl) : (ul.sibling = nl),
              (ul = nl));
        return (
          l &&
            H.forEach(function (Mv) {
              return t(r, Mv);
            }),
          el && Gt(r, K),
          q
        );
      }
      function gl(r, d, v, E) {
        if (
          (typeof v == "object" &&
            v !== null &&
            v.type === al &&
            v.key === null &&
            (v = v.props.children),
          typeof v == "object" && v !== null)
        ) {
          switch (v.$$typeof) {
            case W:
              l: {
                for (var q = v.key; d !== null; ) {
                  if (d.key === q) {
                    if (((q = v.type), q === al)) {
                      if (d.tag === 7) {
                        e(r, d.sibling),
                          (E = u(d, v.props.children)),
                          (E.return = r),
                          (r = E);
                        break l;
                      }
                    } else if (
                      d.elementType === q ||
                      (typeof q == "object" &&
                        q !== null &&
                        q.$$typeof === Cl &&
                        Ye(q) === d.type)
                    ) {
                      e(r, d.sibling),
                        (E = u(d, v.props)),
                        Ia(E, v),
                        (E.return = r),
                        (r = E);
                      break l;
                    }
                    e(r, d);
                    break;
                  } else t(r, d);
                  d = d.sibling;
                }
                v.type === al
                  ? ((E = Ue(v.props.children, r.mode, E, v.key)),
                    (E.return = r),
                    (r = E))
                  : ((E = wu(v.type, v.key, v.props, null, r.mode, E)),
                    Ia(E, v),
                    (E.return = r),
                    (r = E));
              }
              return i(r);
            case Z:
              l: {
                for (q = v.key; d !== null; ) {
                  if (d.key === q)
                    if (
                      d.tag === 4 &&
                      d.stateNode.containerInfo === v.containerInfo &&
                      d.stateNode.implementation === v.implementation
                    ) {
                      e(r, d.sibling),
                        (E = u(d, v.children || [])),
                        (E.return = r),
                        (r = E);
                      break l;
                    } else {
                      e(r, d);
                      break;
                    }
                  else t(r, d);
                  d = d.sibling;
                }
                (E = qi(v, r.mode, E)), (E.return = r), (r = E);
              }
              return i(r);
            case Cl:
              return (v = Ye(v)), gl(r, d, v, E);
          }
          if (Zl(v)) return C(r, d, v, E);
          if (Ml(v)) {
            if (((q = Ml(v)), typeof q != "function")) throw Error(h(150));
            return (v = q.call(v)), B(r, d, v, E);
          }
          if (typeof v.then == "function") return gl(r, d, ln(v), E);
          if (v.$$typeof === hl) return gl(r, d, $u(r, v), E);
          tn(r, v);
        }
        return (typeof v == "string" && v !== "") ||
          typeof v == "number" ||
          typeof v == "bigint"
          ? ((v = "" + v),
            d !== null && d.tag === 6
              ? (e(r, d.sibling), (E = u(d, v)), (E.return = r), (r = E))
              : (e(r, d), (E = Hi(v, r.mode, E)), (E.return = r), (r = E)),
            i(r))
          : e(r, d);
      }
      return function (r, d, v, E) {
        try {
          ka = 0;
          var q = gl(r, d, v, E);
          return (oa = null), q;
        } catch (H) {
          if (H === da || H === Iu) throw H;
          var ul = mt(29, H, null, r.mode);
          return (ul.lanes = E), (ul.return = r), ul;
        } finally {
        }
      };
    }
    var Ge = Ws(!0),
      Fs = Ws(!1),
      ie = !1;
    function Wi(l) {
      l.updateQueue = {
        baseState: l.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null,
      };
    }
    function Fi(l, t) {
      (l = l.updateQueue),
        t.updateQueue === l &&
          (t.updateQueue = {
            baseState: l.baseState,
            firstBaseUpdate: l.firstBaseUpdate,
            lastBaseUpdate: l.lastBaseUpdate,
            shared: l.shared,
            callbacks: null,
          });
    }
    function ce(l) {
      return { lane: l, tag: 0, payload: null, callback: null, next: null };
    }
    function fe(l, t, e) {
      var a = l.updateQueue;
      if (a === null) return null;
      if (((a = a.shared), (cl & 2) !== 0)) {
        var u = a.pending;
        return (
          u === null ? (t.next = t) : ((t.next = u.next), (u.next = t)),
          (a.pending = t),
          (t = Ju(l)),
          Us(l, null, e),
          t
        );
      }
      return Ku(l, a, t, e), Ju(l);
    }
    function Pa(l, t, e) {
      if (
        ((t = t.updateQueue),
        t !== null && ((t = t.shared), (e & 4194048) !== 0))
      ) {
        var a = t.lanes;
        (a &= l.pendingLanes), (e |= a), (t.lanes = e), Xf(l, e);
      }
    }
    function $i(l, t) {
      var e = l.updateQueue,
        a = l.alternate;
      if (a !== null && ((a = a.updateQueue), e === a)) {
        var u = null,
          n = null;
        if (((e = e.firstBaseUpdate), e !== null)) {
          do {
            var i = {
              lane: e.lane,
              tag: e.tag,
              payload: e.payload,
              callback: null,
              next: null,
            };
            n === null ? (u = n = i) : (n = n.next = i), (e = e.next);
          } while (e !== null);
          n === null ? (u = n = t) : (n = n.next = t);
        } else u = n = t;
        (e = {
          baseState: a.baseState,
          firstBaseUpdate: u,
          lastBaseUpdate: n,
          shared: a.shared,
          callbacks: a.callbacks,
        }),
          (l.updateQueue = e);
        return;
      }
      (l = e.lastBaseUpdate),
        l === null ? (e.firstBaseUpdate = t) : (l.next = t),
        (e.lastBaseUpdate = t);
    }
    var ki = !1;
    function lu() {
      if (ki) {
        var l = sa;
        if (l !== null) throw l;
      }
    }
    function tu(l, t, e, a) {
      ki = !1;
      var u = l.updateQueue;
      ie = !1;
      var n = u.firstBaseUpdate,
        i = u.lastBaseUpdate,
        c = u.shared.pending;
      if (c !== null) {
        u.shared.pending = null;
        var s = c,
          y = s.next;
        (s.next = null), i === null ? (n = y) : (i.next = y), (i = s);
        var j = l.alternate;
        j !== null &&
          ((j = j.updateQueue),
          (c = j.lastBaseUpdate),
          c !== i &&
            (c === null ? (j.firstBaseUpdate = y) : (c.next = y),
            (j.lastBaseUpdate = s)));
      }
      if (n !== null) {
        var x = u.baseState;
        (i = 0), (j = y = s = null), (c = n);
        do {
          var g = c.lane & -536870913,
            S = g !== c.lane;
          if (S ? (P & g) === g : (a & g) === g) {
            g !== 0 && g === fa && (ki = !0),
              j !== null &&
                (j = j.next =
                  {
                    lane: 0,
                    tag: c.tag,
                    payload: c.payload,
                    callback: null,
                    next: null,
                  });
            l: {
              var C = l,
                B = c;
              g = t;
              var gl = e;
              switch (B.tag) {
                case 1:
                  if (((C = B.payload), typeof C == "function")) {
                    x = C.call(gl, x, g);
                    break l;
                  }
                  x = C;
                  break l;
                case 3:
                  C.flags = (C.flags & -65537) | 128;
                case 0:
                  if (
                    ((C = B.payload),
                    (g = typeof C == "function" ? C.call(gl, x, g) : C),
                    g == null)
                  )
                    break l;
                  x = U({}, x, g);
                  break l;
                case 2:
                  ie = !0;
              }
            }
            (g = c.callback),
              g !== null &&
                ((l.flags |= 64),
                S && (l.flags |= 8192),
                (S = u.callbacks),
                S === null ? (u.callbacks = [g]) : S.push(g));
          } else
            (S = {
              lane: g,
              tag: c.tag,
              payload: c.payload,
              callback: c.callback,
              next: null,
            }),
              j === null ? ((y = j = S), (s = x)) : (j = j.next = S),
              (i |= g);
          if (((c = c.next), c === null)) {
            if (((c = u.shared.pending), c === null)) break;
            (S = c),
              (c = S.next),
              (S.next = null),
              (u.lastBaseUpdate = S),
              (u.shared.pending = null);
          }
        } while (!0);
        j === null && (s = x),
          (u.baseState = s),
          (u.firstBaseUpdate = y),
          (u.lastBaseUpdate = j),
          n === null && (u.shared.lanes = 0),
          (re |= i),
          (l.lanes = i),
          (l.memoizedState = x);
      }
    }
    function $s(l, t) {
      if (typeof l != "function") throw Error(h(191, l));
      l.call(t);
    }
    function ks(l, t) {
      var e = l.callbacks;
      if (e !== null)
        for (l.callbacks = null, l = 0; l < e.length; l++) $s(e[l], t);
    }
    var ma = o(null),
      en = o(0);
    function Is(l, t) {
      (l = $t), b(en, l), b(ma, t), ($t = l | t.baseLanes);
    }
    function Ii() {
      b(en, $t), b(ma, ma.current);
    }
    function Pi() {
      ($t = en.current), z(ma), z(en);
    }
    var rt = o(null),
      zt = null;
    function se(l) {
      var t = l.alternate;
      b(Dl, Dl.current & 1),
        b(rt, l),
        zt === null &&
          (t === null || ma.current !== null || t.memoizedState !== null) &&
          (zt = l);
    }
    function lc(l) {
      b(Dl, Dl.current), b(rt, l), zt === null && (zt = l);
    }
    function Ps(l) {
      l.tag === 22
        ? (b(Dl, Dl.current), b(rt, l), zt === null && (zt = l))
        : de();
    }
    function de() {
      b(Dl, Dl.current), b(rt, rt.current);
    }
    function ht(l) {
      z(rt), zt === l && (zt = null), z(Dl);
    }
    var Dl = o(0);
    function an(l) {
      for (var t = l; t !== null; ) {
        if (t.tag === 13) {
          var e = t.memoizedState;
          if (e !== null && ((e = e.dehydrated), e === null || cf(e) || ff(e)))
            return t;
        } else if (
          t.tag === 19 &&
          (t.memoizedProps.revealOrder === "forwards" ||
            t.memoizedProps.revealOrder === "backwards" ||
            t.memoizedProps.revealOrder === "unstable_legacy-backwards" ||
            t.memoizedProps.revealOrder === "together")
        ) {
          if ((t.flags & 128) !== 0) return t;
        } else if (t.child !== null) {
          (t.child.return = t), (t = t.child);
          continue;
        }
        if (t === l) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === l) return null;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
      return null;
    }
    var Zt = 0,
      L = null,
      vl = null,
      Hl = null,
      un = !1,
      ra = !1,
      Xe = !1,
      nn = 0,
      eu = 0,
      ha = null,
      Sh = 0;
    function xl() {
      throw Error(h(321));
    }
    function tc(l, t) {
      if (t === null) return !1;
      for (var e = 0; e < t.length && e < l.length; e++)
        if (!ot(l[e], t[e])) return !1;
      return !0;
    }
    function ec(l, t, e, a, u, n) {
      return (
        (Zt = n),
        (L = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (A.H = l === null || l.memoizedState === null ? qd : gc),
        (Xe = !1),
        (n = e(a, u)),
        (Xe = !1),
        ra && (n = td(t, e, a, u)),
        ld(l),
        n
      );
    }
    function ld(l) {
      A.H = nu;
      var t = vl !== null && vl.next !== null;
      if (((Zt = 0), (Hl = vl = L = null), (un = !1), (eu = 0), (ha = null), t))
        throw Error(h(300));
      l === null ||
        ql ||
        ((l = l.dependencies), l !== null && Fu(l) && (ql = !0));
    }
    function td(l, t, e, a) {
      L = l;
      var u = 0;
      do {
        if ((ra && (ha = null), (eu = 0), (ra = !1), 25 <= u))
          throw Error(h(301));
        if (((u += 1), (Hl = vl = null), l.updateQueue != null)) {
          var n = l.updateQueue;
          (n.lastEffect = null),
            (n.events = null),
            (n.stores = null),
            n.memoCache != null && (n.memoCache.index = 0);
        }
        (A.H = Yd), (n = t(e, a));
      } while (ra);
      return n;
    }
    function Nh() {
      var l = A.H,
        t = l.useState()[0];
      return (
        (t = typeof t.then == "function" ? au(t) : t),
        (l = l.useState()[0]),
        (vl !== null ? vl.memoizedState : null) !== l && (L.flags |= 1024),
        t
      );
    }
    function ac() {
      var l = nn !== 0;
      return (nn = 0), l;
    }
    function uc(l, t, e) {
      (t.updateQueue = l.updateQueue), (t.flags &= -2053), (l.lanes &= ~e);
    }
    function nc(l) {
      if (un) {
        for (l = l.memoizedState; l !== null; ) {
          var t = l.queue;
          t !== null && (t.pending = null), (l = l.next);
        }
        un = !1;
      }
      (Zt = 0), (Hl = vl = L = null), (ra = !1), (eu = nn = 0), (ha = null);
    }
    function Il() {
      var l = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return Hl === null ? (L.memoizedState = Hl = l) : (Hl = Hl.next = l), Hl;
    }
    function Ul() {
      if (vl === null) {
        var l = L.alternate;
        l = l !== null ? l.memoizedState : null;
      } else l = vl.next;
      var t = Hl === null ? L.memoizedState : Hl.next;
      if (t !== null) (Hl = t), (vl = l);
      else {
        if (l === null)
          throw L.alternate === null ? Error(h(467)) : Error(h(310));
        (vl = l),
          (l = {
            memoizedState: vl.memoizedState,
            baseState: vl.baseState,
            baseQueue: vl.baseQueue,
            queue: vl.queue,
            next: null,
          }),
          Hl === null ? (L.memoizedState = Hl = l) : (Hl = Hl.next = l);
      }
      return Hl;
    }
    function cn() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function au(l) {
      var t = eu;
      return (
        (eu += 1),
        ha === null && (ha = []),
        (l = Ks(ha, l, t)),
        (t = L),
        (Hl === null ? t.memoizedState : Hl.next) === null &&
          ((t = t.alternate),
          (A.H = t === null || t.memoizedState === null ? qd : gc)),
        l
      );
    }
    function fn(l) {
      if (l !== null && typeof l == "object") {
        if (typeof l.then == "function") return au(l);
        if (l.$$typeof === hl) return Kl(l);
      }
      throw Error(h(438, String(l)));
    }
    function ic(l) {
      var t = null,
        e = L.updateQueue;
      if ((e !== null && (t = e.memoCache), t == null)) {
        var a = L.alternate;
        a !== null &&
          ((a = a.updateQueue),
          a !== null &&
            ((a = a.memoCache),
            a != null &&
              (t = {
                data: a.data.map(function (u) {
                  return u.slice();
                }),
                index: 0,
              })));
      }
      if (
        (t == null && (t = { data: [], index: 0 }),
        e === null && ((e = cn()), (L.updateQueue = e)),
        (e.memoCache = t),
        (e = t.data[t.index]),
        e === void 0)
      )
        for (e = t.data[t.index] = Array(l), a = 0; a < l; a++) e[a] = dl;
      return t.index++, e;
    }
    function Vt(l, t) {
      return typeof t == "function" ? t(l) : t;
    }
    function sn(l) {
      var t = Ul();
      return cc(t, vl, l);
    }
    function cc(l, t, e) {
      var a = l.queue;
      if (a === null) throw Error(h(311));
      a.lastRenderedReducer = e;
      var u = l.baseQueue,
        n = a.pending;
      if (n !== null) {
        if (u !== null) {
          var i = u.next;
          (u.next = n.next), (n.next = i);
        }
        (t.baseQueue = u = n), (a.pending = null);
      }
      if (((n = l.baseState), u === null)) l.memoizedState = n;
      else {
        t = u.next;
        var c = (i = null),
          s = null,
          y = t,
          j = !1;
        do {
          var x = y.lane & -536870913;
          if (x !== y.lane ? (P & x) === x : (Zt & x) === x) {
            var g = y.revertLane;
            if (g === 0)
              s !== null &&
                (s = s.next =
                  {
                    lane: 0,
                    revertLane: 0,
                    gesture: null,
                    action: y.action,
                    hasEagerState: y.hasEagerState,
                    eagerState: y.eagerState,
                    next: null,
                  }),
                x === fa && (j = !0);
            else if ((Zt & g) === g) {
              (y = y.next), g === fa && (j = !0);
              continue;
            } else
              (x = {
                lane: 0,
                revertLane: y.revertLane,
                gesture: null,
                action: y.action,
                hasEagerState: y.hasEagerState,
                eagerState: y.eagerState,
                next: null,
              }),
                s === null ? ((c = s = x), (i = n)) : (s = s.next = x),
                (L.lanes |= g),
                (re |= g);
            (x = y.action),
              Xe && e(n, x),
              (n = y.hasEagerState ? y.eagerState : e(n, x));
          } else
            (g = {
              lane: x,
              revertLane: y.revertLane,
              gesture: y.gesture,
              action: y.action,
              hasEagerState: y.hasEagerState,
              eagerState: y.eagerState,
              next: null,
            }),
              s === null ? ((c = s = g), (i = n)) : (s = s.next = g),
              (L.lanes |= x),
              (re |= x);
          y = y.next;
        } while (y !== null && y !== t);
        if (
          (s === null ? (i = n) : (s.next = c),
          !ot(n, l.memoizedState) && ((ql = !0), j && ((e = sa), e !== null)))
        )
          throw e;
        (l.memoizedState = n),
          (l.baseState = i),
          (l.baseQueue = s),
          (a.lastRenderedState = n);
      }
      return u === null && (a.lanes = 0), [l.memoizedState, a.dispatch];
    }
    function fc(l) {
      var t = Ul(),
        e = t.queue;
      if (e === null) throw Error(h(311));
      e.lastRenderedReducer = l;
      var a = e.dispatch,
        u = e.pending,
        n = t.memoizedState;
      if (u !== null) {
        e.pending = null;
        var i = (u = u.next);
        do (n = l(n, i.action)), (i = i.next);
        while (i !== u);
        ot(n, t.memoizedState) || (ql = !0),
          (t.memoizedState = n),
          t.baseQueue === null && (t.baseState = n),
          (e.lastRenderedState = n);
      }
      return [n, a];
    }
    function ed(l, t, e) {
      var a = L,
        u = Ul(),
        n = el;
      if (n) {
        if (e === void 0) throw Error(h(407));
        e = e();
      } else e = t();
      var i = !ot((vl || u).memoizedState, e);
      if (
        (i && ((u.memoizedState = e), (ql = !0)),
        (u = u.queue),
        oc(nd.bind(null, a, u, l), [l]),
        u.getSnapshot !== t || i || (Hl !== null && Hl.memoizedState.tag & 1))
      ) {
        if (
          ((a.flags |= 2048),
          va(9, { destroy: void 0 }, ud.bind(null, a, u, e, t), null),
          bl === null)
        )
          throw Error(h(349));
        n || (Zt & 127) !== 0 || ad(a, t, e);
      }
      return e;
    }
    function ad(l, t, e) {
      (l.flags |= 16384),
        (l = { getSnapshot: t, value: e }),
        (t = L.updateQueue),
        t === null
          ? ((t = cn()), (L.updateQueue = t), (t.stores = [l]))
          : ((e = t.stores), e === null ? (t.stores = [l]) : e.push(l));
    }
    function ud(l, t, e, a) {
      (t.value = e), (t.getSnapshot = a), id(t) && cd(l);
    }
    function nd(l, t, e) {
      return e(function () {
        id(t) && cd(l);
      });
    }
    function id(l) {
      var t = l.getSnapshot;
      l = l.value;
      try {
        var e = t();
        return !ot(l, e);
      } catch {
        return !0;
      }
    }
    function cd(l) {
      var t = De(l, 2);
      t !== null && it(t, l, 2);
    }
    function sc(l) {
      var t = Il();
      if (typeof l == "function") {
        var e = l;
        if (((l = e()), Xe)) {
          Pt(!0);
          try {
            e();
          } finally {
            Pt(!1);
          }
        }
      }
      return (
        (t.memoizedState = t.baseState = l),
        (t.queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Vt,
          lastRenderedState: l,
        }),
        t
      );
    }
    function fd(l, t, e, a) {
      return (l.baseState = e), cc(l, vl, typeof a == "function" ? a : Vt);
    }
    function ph(l, t, e, a, u) {
      if (mn(l)) throw Error(h(485));
      if (((l = t.action), l !== null)) {
        var n = {
          payload: u,
          action: l,
          next: null,
          isTransition: !0,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function (i) {
            n.listeners.push(i);
          },
        };
        A.T !== null ? e(!0) : (n.isTransition = !1),
          a(n),
          (e = t.pending),
          e === null
            ? ((n.next = t.pending = n), sd(t, n))
            : ((n.next = e.next), (t.pending = e.next = n));
      }
    }
    function sd(l, t) {
      var e = t.action,
        a = t.payload,
        u = l.state;
      if (t.isTransition) {
        var n = A.T,
          i = {};
        A.T = i;
        try {
          var c = e(u, a),
            s = A.S;
          s !== null && s(i, c), dd(l, t, c);
        } catch (y) {
          dc(l, t, y);
        } finally {
          n !== null && i.types !== null && (n.types = i.types), (A.T = n);
        }
      } else
        try {
          (n = e(u, a)), dd(l, t, n);
        } catch (y) {
          dc(l, t, y);
        }
    }
    function dd(l, t, e) {
      e !== null && typeof e == "object" && typeof e.then == "function"
        ? e.then(
            function (a) {
              od(l, t, a);
            },
            function (a) {
              return dc(l, t, a);
            }
          )
        : od(l, t, e);
    }
    function od(l, t, e) {
      (t.status = "fulfilled"),
        (t.value = e),
        md(t),
        (l.state = e),
        (t = l.pending),
        t !== null &&
          ((e = t.next),
          e === t
            ? (l.pending = null)
            : ((e = e.next), (t.next = e), sd(l, e)));
    }
    function dc(l, t, e) {
      var a = l.pending;
      if (((l.pending = null), a !== null)) {
        a = a.next;
        do (t.status = "rejected"), (t.reason = e), md(t), (t = t.next);
        while (t !== a);
      }
      l.action = null;
    }
    function md(l) {
      l = l.listeners;
      for (var t = 0; t < l.length; t++) (0, l[t])();
    }
    function rd(l, t) {
      return t;
    }
    function hd(l, t) {
      if (el) {
        var e = bl.formState;
        if (e !== null) {
          l: {
            var a = L;
            if (el) {
              if (Nl) {
                t: {
                  for (var u = Nl, n = Et; u.nodeType !== 8; ) {
                    if (!n) {
                      u = null;
                      break t;
                    }
                    if (((u = xt(u.nextSibling)), u === null)) {
                      u = null;
                      break t;
                    }
                  }
                  (n = u.data), (u = n === "F!" || n === "F" ? u : null);
                }
                if (u) {
                  (Nl = xt(u.nextSibling)), (a = u.data === "F!");
                  break l;
                }
              }
              ue(a);
            }
            a = !1;
          }
          a && (t = e[0]);
        }
      }
      return (
        (e = Il()),
        (e.memoizedState = e.baseState = t),
        (a = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: rd,
          lastRenderedState: t,
        }),
        (e.queue = a),
        (e = Cd.bind(null, L, a)),
        (a.dispatch = e),
        (a = sc(!1)),
        (n = yc.bind(null, L, !1, a.queue)),
        (a = Il()),
        (u = { state: t, dispatch: null, action: l, pending: null }),
        (a.queue = u),
        (e = ph.bind(null, L, u, n, e)),
        (u.dispatch = e),
        (a.memoizedState = l),
        [t, e, !1]
      );
    }
    function vd(l) {
      var t = Ul();
      return yd(t, vl, l);
    }
    function yd(l, t, e) {
      if (
        ((t = cc(l, t, rd)[0]),
        (l = sn(Vt)[0]),
        typeof t == "object" && t !== null && typeof t.then == "function")
      )
        try {
          var a = au(t);
        } catch (i) {
          throw i === da ? Iu : i;
        }
      else a = t;
      t = Ul();
      var u = t.queue,
        n = u.dispatch;
      return (
        e !== t.memoizedState &&
          ((L.flags |= 2048),
          va(9, { destroy: void 0 }, Ah.bind(null, u, e), null)),
        [a, n, l]
      );
    }
    function Ah(l, t) {
      l.action = t;
    }
    function gd(l) {
      var t = Ul(),
        e = vl;
      if (e !== null) return yd(t, e, l);
      Ul(), (t = t.memoizedState), (e = Ul());
      var a = e.queue.dispatch;
      return (e.memoizedState = l), [t, a, !1];
    }
    function va(l, t, e, a) {
      return (
        (l = { tag: l, create: e, deps: a, inst: t, next: null }),
        (t = L.updateQueue),
        t === null && ((t = cn()), (L.updateQueue = t)),
        (e = t.lastEffect),
        e === null
          ? (t.lastEffect = l.next = l)
          : ((a = e.next), (e.next = l), (l.next = a), (t.lastEffect = l)),
        l
      );
    }
    function bd() {
      return Ul().memoizedState;
    }
    function dn(l, t, e, a) {
      var u = Il();
      (L.flags |= l),
        (u.memoizedState = va(
          1 | t,
          { destroy: void 0 },
          e,
          a === void 0 ? null : a
        ));
    }
    function on(l, t, e, a) {
      var u = Ul();
      a = a === void 0 ? null : a;
      var n = u.memoizedState.inst;
      vl !== null && a !== null && tc(a, vl.memoizedState.deps)
        ? (u.memoizedState = va(t, n, e, a))
        : ((L.flags |= l), (u.memoizedState = va(1 | t, n, e, a)));
    }
    function Sd(l, t) {
      dn(8390656, 8, l, t);
    }
    function oc(l, t) {
      on(2048, 8, l, t);
    }
    function jh(l) {
      L.flags |= 4;
      var t = L.updateQueue;
      if (t === null) (t = cn()), (L.updateQueue = t), (t.events = [l]);
      else {
        var e = t.events;
        e === null ? (t.events = [l]) : e.push(l);
      }
    }
    function Nd(l) {
      var t = Ul().memoizedState;
      return (
        jh({ ref: t, nextImpl: l }),
        function () {
          if ((cl & 2) !== 0) throw Error(h(440));
          return t.impl.apply(void 0, arguments);
        }
      );
    }
    function pd(l, t) {
      return on(4, 2, l, t);
    }
    function Ad(l, t) {
      return on(4, 4, l, t);
    }
    function jd(l, t) {
      if (typeof t == "function") {
        l = l();
        var e = t(l);
        return function () {
          typeof e == "function" ? e() : t(null);
        };
      }
      if (t != null)
        return (
          (l = l()),
          (t.current = l),
          function () {
            t.current = null;
          }
        );
    }
    function Ed(l, t, e) {
      (e = e != null ? e.concat([l]) : null), on(4, 4, jd.bind(null, t, l), e);
    }
    function mc() {}
    function zd(l, t) {
      var e = Ul();
      t = t === void 0 ? null : t;
      var a = e.memoizedState;
      return t !== null && tc(t, a[1]) ? a[0] : ((e.memoizedState = [l, t]), l);
    }
    function xd(l, t) {
      var e = Ul();
      t = t === void 0 ? null : t;
      var a = e.memoizedState;
      if (t !== null && tc(t, a[1])) return a[0];
      if (((a = l()), Xe)) {
        Pt(!0);
        try {
          l();
        } finally {
          Pt(!1);
        }
      }
      return (e.memoizedState = [a, t]), a;
    }
    function rc(l, t, e) {
      return e === void 0 || ((Zt & 1073741824) !== 0 && (P & 261930) === 0)
        ? (l.memoizedState = t)
        : ((l.memoizedState = e), (l = _o()), (L.lanes |= l), (re |= l), e);
    }
    function Td(l, t, e, a) {
      return ot(e, t)
        ? e
        : ma.current !== null
        ? ((l = rc(l, e, a)), ot(l, t) || (ql = !0), l)
        : (Zt & 42) === 0 || ((Zt & 1073741824) !== 0 && (P & 261930) === 0)
        ? ((ql = !0), (l.memoizedState = e))
        : ((l = _o()), (L.lanes |= l), (re |= l), t);
    }
    function _d(l, t, e, a, u) {
      var n = T.p;
      T.p = n !== 0 && 8 > n ? n : 8;
      var i = A.T,
        c = {};
      (A.T = c), yc(l, !1, t, e);
      try {
        var s = u(),
          y = A.S;
        if (
          (y !== null && y(c, s),
          s !== null && typeof s == "object" && typeof s.then == "function")
        ) {
          var j = bh(s, a);
          uu(l, t, j, gt(l));
        } else uu(l, t, a, gt(l));
      } catch (x) {
        uu(l, t, { then: function () {}, status: "rejected", reason: x }, gt());
      } finally {
        (T.p = n),
          i !== null && c.types !== null && (i.types = c.types),
          (A.T = i);
      }
    }
    function Eh() {}
    function hc(l, t, e, a) {
      if (l.tag !== 5) throw Error(h(476));
      var u = Md(l).queue;
      _d(
        l,
        u,
        t,
        O,
        e === null
          ? Eh
          : function () {
              return Od(l), e(a);
            }
      );
    }
    function Md(l) {
      var t = l.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: O,
        baseState: O,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Vt,
          lastRenderedState: O,
        },
        next: null,
      };
      var e = {};
      return (
        (t.next = {
          memoizedState: e,
          baseState: e,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: Vt,
            lastRenderedState: e,
          },
          next: null,
        }),
        (l.memoizedState = t),
        (l = l.alternate),
        l !== null && (l.memoizedState = t),
        t
      );
    }
    function Od(l) {
      var t = Md(l);
      t.next === null && (t = l.alternate.memoizedState),
        uu(l, t.next.queue, {}, gt());
    }
    function vc() {
      return Kl(pu);
    }
    function Dd() {
      return Ul().memoizedState;
    }
    function Ud() {
      return Ul().memoizedState;
    }
    function zh(l) {
      for (var t = l.return; t !== null; ) {
        switch (t.tag) {
          case 24:
          case 3:
            var e = gt();
            l = ce(e);
            var a = fe(t, l, e);
            a !== null && (it(a, t, e), Pa(a, t, e)),
              (t = { cache: Li() }),
              (l.payload = t);
            return;
        }
        t = t.return;
      }
    }
    function xh(l, t, e) {
      var a = gt();
      (e = {
        lane: a,
        revertLane: 0,
        gesture: null,
        action: e,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
        mn(l)
          ? Rd(t, e)
          : ((e = Ci(l, t, e, a)), e !== null && (it(e, l, a), Hd(e, t, a)));
    }
    function Cd(l, t, e) {
      var a = gt();
      uu(l, t, e, a);
    }
    function uu(l, t, e, a) {
      var u = {
        lane: a,
        revertLane: 0,
        gesture: null,
        action: e,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
      if (mn(l)) Rd(t, u);
      else {
        var n = l.alternate;
        if (
          l.lanes === 0 &&
          (n === null || n.lanes === 0) &&
          ((n = t.lastRenderedReducer), n !== null)
        )
          try {
            var i = t.lastRenderedState,
              c = n(i, e);
            if (((u.hasEagerState = !0), (u.eagerState = c), ot(c, i)))
              return Ku(l, t, u, 0), bl === null && Lu(), !1;
          } catch {
          } finally {
          }
        if (((e = Ci(l, t, u, a)), e !== null))
          return it(e, l, a), Hd(e, t, a), !0;
      }
      return !1;
    }
    function yc(l, t, e, a) {
      if (
        ((a = {
          lane: 2,
          revertLane: Wc(),
          gesture: null,
          action: a,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        mn(l))
      ) {
        if (t) throw Error(h(479));
      } else (t = Ci(l, e, a, 2)), t !== null && it(t, l, 2);
    }
    function mn(l) {
      var t = l.alternate;
      return l === L || (t !== null && t === L);
    }
    function Rd(l, t) {
      ra = un = !0;
      var e = l.pending;
      e === null ? (t.next = t) : ((t.next = e.next), (e.next = t)),
        (l.pending = t);
    }
    function Hd(l, t, e) {
      if ((e & 4194048) !== 0) {
        var a = t.lanes;
        (a &= l.pendingLanes), (e |= a), (t.lanes = e), Xf(l, e);
      }
    }
    var nu = {
      readContext: Kl,
      use: fn,
      useCallback: xl,
      useContext: xl,
      useEffect: xl,
      useImperativeHandle: xl,
      useLayoutEffect: xl,
      useInsertionEffect: xl,
      useMemo: xl,
      useReducer: xl,
      useRef: xl,
      useState: xl,
      useDebugValue: xl,
      useDeferredValue: xl,
      useTransition: xl,
      useSyncExternalStore: xl,
      useId: xl,
      useHostTransitionStatus: xl,
      useFormState: xl,
      useActionState: xl,
      useOptimistic: xl,
      useMemoCache: xl,
      useCacheRefresh: xl,
    };
    nu.useEffectEvent = xl;
    var qd = {
        readContext: Kl,
        use: fn,
        useCallback: function (l, t) {
          return (Il().memoizedState = [l, t === void 0 ? null : t]), l;
        },
        useContext: Kl,
        useEffect: Sd,
        useImperativeHandle: function (l, t, e) {
          (e = e != null ? e.concat([l]) : null),
            dn(4194308, 4, jd.bind(null, t, l), e);
        },
        useLayoutEffect: function (l, t) {
          return dn(4194308, 4, l, t);
        },
        useInsertionEffect: function (l, t) {
          dn(4, 2, l, t);
        },
        useMemo: function (l, t) {
          var e = Il();
          t = t === void 0 ? null : t;
          var a = l();
          if (Xe) {
            Pt(!0);
            try {
              l();
            } finally {
              Pt(!1);
            }
          }
          return (e.memoizedState = [a, t]), a;
        },
        useReducer: function (l, t, e) {
          var a = Il();
          if (e !== void 0) {
            var u = e(t);
            if (Xe) {
              Pt(!0);
              try {
                e(t);
              } finally {
                Pt(!1);
              }
            }
          } else u = t;
          return (
            (a.memoizedState = a.baseState = u),
            (l = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: l,
              lastRenderedState: u,
            }),
            (a.queue = l),
            (l = l.dispatch = xh.bind(null, L, l)),
            [a.memoizedState, l]
          );
        },
        useRef: function (l) {
          var t = Il();
          return (l = { current: l }), (t.memoizedState = l);
        },
        useState: function (l) {
          l = sc(l);
          var t = l.queue,
            e = Cd.bind(null, L, t);
          return (t.dispatch = e), [l.memoizedState, e];
        },
        useDebugValue: mc,
        useDeferredValue: function (l, t) {
          var e = Il();
          return rc(e, l, t);
        },
        useTransition: function () {
          var l = sc(!1);
          return (
            (l = _d.bind(null, L, l.queue, !0, !1)),
            (Il().memoizedState = l),
            [!1, l]
          );
        },
        useSyncExternalStore: function (l, t, e) {
          var a = L,
            u = Il();
          if (el) {
            if (e === void 0) throw Error(h(407));
            e = e();
          } else {
            if (((e = t()), bl === null)) throw Error(h(349));
            (P & 127) !== 0 || ad(a, t, e);
          }
          u.memoizedState = e;
          var n = { value: e, getSnapshot: t };
          return (
            (u.queue = n),
            Sd(nd.bind(null, a, n, l), [l]),
            (a.flags |= 2048),
            va(9, { destroy: void 0 }, ud.bind(null, a, n, e, t), null),
            e
          );
        },
        useId: function () {
          var l = Il(),
            t = bl.identifierPrefix;
          if (el) {
            var e = Ut,
              a = Dt;
            (e = (a & ~(1 << (32 - dt(a) - 1))).toString(32) + e),
              (t = "_" + t + "R_" + e),
              (e = nn++),
              0 < e && (t += "H" + e.toString(32)),
              (t += "_");
          } else (e = Sh++), (t = "_" + t + "r_" + e.toString(32) + "_");
          return (l.memoizedState = t);
        },
        useHostTransitionStatus: vc,
        useFormState: hd,
        useActionState: hd,
        useOptimistic: function (l) {
          var t = Il();
          t.memoizedState = t.baseState = l;
          var e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: null,
            lastRenderedState: null,
          };
          return (
            (t.queue = e),
            (t = yc.bind(null, L, !0, e)),
            (e.dispatch = t),
            [l, t]
          );
        },
        useMemoCache: ic,
        useCacheRefresh: function () {
          return (Il().memoizedState = zh.bind(null, L));
        },
        useEffectEvent: function (l) {
          var t = Il(),
            e = { impl: l };
          return (
            (t.memoizedState = e),
            function () {
              if ((cl & 2) !== 0) throw Error(h(440));
              return e.impl.apply(void 0, arguments);
            }
          );
        },
      },
      gc = {
        readContext: Kl,
        use: fn,
        useCallback: zd,
        useContext: Kl,
        useEffect: oc,
        useImperativeHandle: Ed,
        useInsertionEffect: pd,
        useLayoutEffect: Ad,
        useMemo: xd,
        useReducer: sn,
        useRef: bd,
        useState: function () {
          return sn(Vt);
        },
        useDebugValue: mc,
        useDeferredValue: function (l, t) {
          var e = Ul();
          return Td(e, vl.memoizedState, l, t);
        },
        useTransition: function () {
          var l = sn(Vt)[0],
            t = Ul().memoizedState;
          return [typeof l == "boolean" ? l : au(l), t];
        },
        useSyncExternalStore: ed,
        useId: Dd,
        useHostTransitionStatus: vc,
        useFormState: vd,
        useActionState: vd,
        useOptimistic: function (l, t) {
          var e = Ul();
          return fd(e, vl, l, t);
        },
        useMemoCache: ic,
        useCacheRefresh: Ud,
      };
    gc.useEffectEvent = Nd;
    var Yd = {
      readContext: Kl,
      use: fn,
      useCallback: zd,
      useContext: Kl,
      useEffect: oc,
      useImperativeHandle: Ed,
      useInsertionEffect: pd,
      useLayoutEffect: Ad,
      useMemo: xd,
      useReducer: fc,
      useRef: bd,
      useState: function () {
        return fc(Vt);
      },
      useDebugValue: mc,
      useDeferredValue: function (l, t) {
        var e = Ul();
        return vl === null ? rc(e, l, t) : Td(e, vl.memoizedState, l, t);
      },
      useTransition: function () {
        var l = fc(Vt)[0],
          t = Ul().memoizedState;
        return [typeof l == "boolean" ? l : au(l), t];
      },
      useSyncExternalStore: ed,
      useId: Dd,
      useHostTransitionStatus: vc,
      useFormState: gd,
      useActionState: gd,
      useOptimistic: function (l, t) {
        var e = Ul();
        return vl !== null
          ? fd(e, vl, l, t)
          : ((e.baseState = l), [l, e.queue.dispatch]);
      },
      useMemoCache: ic,
      useCacheRefresh: Ud,
    };
    Yd.useEffectEvent = Nd;
    function bc(l, t, e, a) {
      (t = l.memoizedState),
        (e = e(a, t)),
        (e = e == null ? t : U({}, t, e)),
        (l.memoizedState = e),
        l.lanes === 0 && (l.updateQueue.baseState = e);
    }
    var Sc = {
      enqueueSetState: function (l, t, e) {
        l = l._reactInternals;
        var a = gt(),
          u = ce(a);
        (u.payload = t),
          e != null && (u.callback = e),
          (t = fe(l, u, a)),
          t !== null && (it(t, l, a), Pa(t, l, a));
      },
      enqueueReplaceState: function (l, t, e) {
        l = l._reactInternals;
        var a = gt(),
          u = ce(a);
        (u.tag = 1),
          (u.payload = t),
          e != null && (u.callback = e),
          (t = fe(l, u, a)),
          t !== null && (it(t, l, a), Pa(t, l, a));
      },
      enqueueForceUpdate: function (l, t) {
        l = l._reactInternals;
        var e = gt(),
          a = ce(e);
        (a.tag = 2),
          t != null && (a.callback = t),
          (t = fe(l, a, e)),
          t !== null && (it(t, l, e), Pa(t, l, e));
      },
    };
    function Bd(l, t, e, a, u, n, i) {
      return (
        (l = l.stateNode),
        typeof l.shouldComponentUpdate == "function"
          ? l.shouldComponentUpdate(a, n, i)
          : t.prototype && t.prototype.isPureReactComponent
          ? !Ka(e, a) || !Ka(u, n)
          : !0
      );
    }
    function Gd(l, t, e, a) {
      (l = t.state),
        typeof t.componentWillReceiveProps == "function" &&
          t.componentWillReceiveProps(e, a),
        typeof t.UNSAFE_componentWillReceiveProps == "function" &&
          t.UNSAFE_componentWillReceiveProps(e, a),
        t.state !== l && Sc.enqueueReplaceState(t, t.state, null);
    }
    function Qe(l, t) {
      var e = t;
      if ("ref" in t) {
        e = {};
        for (var a in t) a !== "ref" && (e[a] = t[a]);
      }
      if ((l = l.defaultProps)) {
        e === t && (e = U({}, e));
        for (var u in l) e[u] === void 0 && (e[u] = l[u]);
      }
      return e;
    }
    function Xd(l) {
      Vu(l);
    }
    function Qd(l) {
      console.error(l);
    }
    function Zd(l) {
      Vu(l);
    }
    function rn(l, t) {
      try {
        var e = l.onUncaughtError;
        e(t.value, { componentStack: t.stack });
      } catch (a) {
        setTimeout(function () {
          throw a;
        });
      }
    }
    function Vd(l, t, e) {
      try {
        var a = l.onCaughtError;
        a(e.value, {
          componentStack: e.stack,
          errorBoundary: t.tag === 1 ? t.stateNode : null,
        });
      } catch (u) {
        setTimeout(function () {
          throw u;
        });
      }
    }
    function Nc(l, t, e) {
      return (
        (e = ce(e)),
        (e.tag = 3),
        (e.payload = { element: null }),
        (e.callback = function () {
          rn(l, t);
        }),
        e
      );
    }
    function Ld(l) {
      return (l = ce(l)), (l.tag = 3), l;
    }
    function Kd(l, t, e, a) {
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var n = a.value;
        (l.payload = function () {
          return u(n);
        }),
          (l.callback = function () {
            Vd(t, e, a);
          });
      }
      var i = e.stateNode;
      i !== null &&
        typeof i.componentDidCatch == "function" &&
        (l.callback = function () {
          Vd(t, e, a),
            typeof u != "function" &&
              (he === null ? (he = new Set([this])) : he.add(this));
          var c = a.stack;
          this.componentDidCatch(a.value, {
            componentStack: c !== null ? c : "",
          });
        });
    }
    function Th(l, t, e, a, u) {
      if (
        ((e.flags |= 32768),
        a !== null && typeof a == "object" && typeof a.then == "function")
      ) {
        if (
          ((t = e.alternate),
          t !== null && ca(t, e, u, !0),
          (e = rt.current),
          e !== null)
        ) {
          switch (e.tag) {
            case 31:
            case 13:
              return (
                zt === null
                  ? zn()
                  : e.alternate === null && Tl === 0 && (Tl = 3),
                (e.flags &= -257),
                (e.flags |= 65536),
                (e.lanes = u),
                a === Pu
                  ? (e.flags |= 16384)
                  : ((t = e.updateQueue),
                    t === null ? (e.updateQueue = new Set([a])) : t.add(a),
                    Kc(l, a, u)),
                !1
              );
            case 22:
              return (
                (e.flags |= 65536),
                a === Pu
                  ? (e.flags |= 16384)
                  : ((t = e.updateQueue),
                    t === null
                      ? ((t = {
                          transitions: null,
                          markerInstances: null,
                          retryQueue: new Set([a]),
                        }),
                        (e.updateQueue = t))
                      : ((e = t.retryQueue),
                        e === null ? (t.retryQueue = new Set([a])) : e.add(a)),
                    Kc(l, a, u)),
                !1
              );
          }
          throw Error(h(435, e.tag));
        }
        return Kc(l, a, u), zn(), !1;
      }
      if (el)
        return (
          (t = rt.current),
          t !== null
            ? ((t.flags & 65536) === 0 && (t.flags |= 256),
              (t.flags |= 65536),
              (t.lanes = u),
              a !== Gi && ((l = Error(h(422), { cause: a })), Wa(pt(l, e))))
            : (a !== Gi && ((t = Error(h(423), { cause: a })), Wa(pt(t, e))),
              (l = l.current.alternate),
              (l.flags |= 65536),
              (u &= -u),
              (l.lanes |= u),
              (a = pt(a, e)),
              (u = Nc(l.stateNode, a, u)),
              $i(l, u),
              Tl !== 4 && (Tl = 2)),
          !1
        );
      var n = Error(h(520), { cause: a });
      if (
        ((n = pt(n, e)),
        ru === null ? (ru = [n]) : ru.push(n),
        Tl !== 4 && (Tl = 2),
        t === null)
      )
        return !0;
      (a = pt(a, e)), (e = t);
      do {
        switch (e.tag) {
          case 3:
            return (
              (e.flags |= 65536),
              (l = u & -u),
              (e.lanes |= l),
              (l = Nc(e.stateNode, a, l)),
              $i(e, l),
              !1
            );
          case 1:
            if (
              ((t = e.type),
              (n = e.stateNode),
              (e.flags & 128) === 0 &&
                (typeof t.getDerivedStateFromError == "function" ||
                  (n !== null &&
                    typeof n.componentDidCatch == "function" &&
                    (he === null || !he.has(n)))))
            )
              return (
                (e.flags |= 65536),
                (u &= -u),
                (e.lanes |= u),
                (u = Ld(u)),
                Kd(u, l, e, a),
                $i(e, u),
                !1
              );
        }
        e = e.return;
      } while (e !== null);
      return !1;
    }
    var pc = Error(h(461)),
      ql = !1;
    function Jl(l, t, e, a) {
      t.child = l === null ? Fs(t, null, e, a) : Ge(t, l.child, e, a);
    }
    function Jd(l, t, e, a, u) {
      e = e.render;
      var n = t.ref;
      if ("ref" in a) {
        var i = {};
        for (var c in a) c !== "ref" && (i[c] = a[c]);
      } else i = a;
      return (
        He(t),
        (a = ec(l, t, e, i, n, u)),
        (c = ac()),
        l !== null && !ql
          ? (uc(l, t, u), Lt(l, t, u))
          : (el && c && Yi(t), (t.flags |= 1), Jl(l, t, a, u), t.child)
      );
    }
    function wd(l, t, e, a, u) {
      if (l === null) {
        var n = e.type;
        return typeof n == "function" &&
          !Ri(n) &&
          n.defaultProps === void 0 &&
          e.compare === null
          ? ((t.tag = 15), (t.type = n), Wd(l, t, n, a, u))
          : ((l = wu(e.type, null, a, t, t.mode, u)),
            (l.ref = t.ref),
            (l.return = t),
            (t.child = l));
      }
      if (((n = l.child), !Mc(l, u))) {
        var i = n.memoizedProps;
        if (
          ((e = e.compare),
          (e = e !== null ? e : Ka),
          e(i, a) && l.ref === t.ref)
        )
          return Lt(l, t, u);
      }
      return (
        (t.flags |= 1),
        (l = Bt(n, a)),
        (l.ref = t.ref),
        (l.return = t),
        (t.child = l)
      );
    }
    function Wd(l, t, e, a, u) {
      if (l !== null) {
        var n = l.memoizedProps;
        if (Ka(n, a) && l.ref === t.ref)
          if (((ql = !1), (t.pendingProps = a = n), Mc(l, u)))
            (l.flags & 131072) !== 0 && (ql = !0);
          else return (t.lanes = l.lanes), Lt(l, t, u);
      }
      return Ac(l, t, e, a, u);
    }
    function Fd(l, t, e, a) {
      var u = a.children,
        n = l !== null ? l.memoizedState : null;
      if (
        (l === null &&
          t.stateNode === null &&
          (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null,
          }),
        a.mode === "hidden")
      ) {
        if ((t.flags & 128) !== 0) {
          if (((n = n !== null ? n.baseLanes | e : e), l !== null)) {
            for (a = t.child = l.child, u = 0; a !== null; )
              (u = u | a.lanes | a.childLanes), (a = a.sibling);
            a = u & ~n;
          } else (a = 0), (t.child = null);
          return $d(l, t, n, e, a);
        }
        if ((e & 536870912) !== 0)
          (t.memoizedState = { baseLanes: 0, cachePool: null }),
            l !== null && ku(t, n !== null ? n.cachePool : null),
            n !== null ? Is(t, n) : Ii(),
            Ps(t);
        else
          return (
            (a = t.lanes = 536870912),
            $d(l, t, n !== null ? n.baseLanes | e : e, e, a)
          );
      } else n !== null ? (ku(t, n.cachePool), Is(t, n), de(), (t.memoizedState = null)) : (l !== null && ku(t, null), Ii(), de());
      return Jl(l, t, u, e), t.child;
    }
    function iu(l, t) {
      return (
        (l !== null && l.tag === 22) ||
          t.stateNode !== null ||
          (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null,
          }),
        t.sibling
      );
    }
    function $d(l, t, e, a, u) {
      var n = Ji();
      return (
        (n = n === null ? null : { parent: Rl._currentValue, pool: n }),
        (t.memoizedState = { baseLanes: e, cachePool: n }),
        l !== null && ku(t, null),
        Ii(),
        Ps(t),
        l !== null && ca(l, t, a, !0),
        (t.childLanes = u),
        null
      );
    }
    function hn(l, t) {
      return (
        (t = yn({ mode: t.mode, children: t.children }, l.mode)),
        (t.ref = l.ref),
        (l.child = t),
        (t.return = l),
        t
      );
    }
    function kd(l, t, e) {
      return (
        Ge(t, l.child, null, e),
        (l = hn(t, t.pendingProps)),
        (l.flags |= 2),
        ht(t),
        (t.memoizedState = null),
        l
      );
    }
    function _h(l, t, e) {
      var a = t.pendingProps,
        u = (t.flags & 128) !== 0;
      if (((t.flags &= -129), l === null)) {
        if (el) {
          if (a.mode === "hidden")
            return (l = hn(t, a)), (t.lanes = 536870912), iu(null, l);
          if (
            (lc(t),
            (l = Nl)
              ? ((l = dm(l, Et)),
                (l = l !== null && l.data === "&" ? l : null),
                l !== null &&
                  ((t.memoizedState = {
                    dehydrated: l,
                    treeContext: ee !== null ? { id: Dt, overflow: Ut } : null,
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (e = Rs(l)),
                  (e.return = t),
                  (t.child = e),
                  (Ll = t),
                  (Nl = null)))
              : (l = null),
            l === null)
          )
            throw ue(t);
          return (t.lanes = 536870912), null;
        }
        return hn(t, a);
      }
      var n = l.memoizedState;
      if (n !== null) {
        var i = n.dehydrated;
        if ((lc(t), u))
          if (t.flags & 256) (t.flags &= -257), (t = kd(l, t, e));
          else if (t.memoizedState !== null)
            (t.child = l.child), (t.flags |= 128), (t = null);
          else throw Error(h(558));
        else if (
          (ql || ca(l, t, e, !1), (u = (e & l.childLanes) !== 0), ql || u)
        ) {
          if (
            ((a = bl),
            a !== null && ((i = Qf(a, e)), i !== 0 && i !== n.retryLane))
          )
            throw ((n.retryLane = i), De(l, i), it(a, l, i), pc);
          zn(), (t = kd(l, t, e));
        } else
          (l = n.treeContext),
            (Nl = xt(i.nextSibling)),
            (Ll = t),
            (el = !0),
            (ae = null),
            (Et = !1),
            l !== null && Ys(t, l),
            (t = hn(t, a)),
            (t.flags |= 4096);
        return t;
      }
      return (
        (l = Bt(l.child, { mode: a.mode, children: a.children })),
        (l.ref = t.ref),
        (t.child = l),
        (l.return = t),
        l
      );
    }
    function vn(l, t) {
      var e = t.ref;
      if (e === null) l !== null && l.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof e != "function" && typeof e != "object") throw Error(h(284));
        (l === null || l.ref !== e) && (t.flags |= 4194816);
      }
    }
    function Ac(l, t, e, a, u) {
      return (
        He(t),
        (e = ec(l, t, e, a, void 0, u)),
        (a = ac()),
        l !== null && !ql
          ? (uc(l, t, u), Lt(l, t, u))
          : (el && a && Yi(t), (t.flags |= 1), Jl(l, t, e, u), t.child)
      );
    }
    function Id(l, t, e, a, u, n) {
      return (
        He(t),
        (t.updateQueue = null),
        (e = td(t, a, e, u)),
        ld(l),
        (a = ac()),
        l !== null && !ql
          ? (uc(l, t, n), Lt(l, t, n))
          : (el && a && Yi(t), (t.flags |= 1), Jl(l, t, e, n), t.child)
      );
    }
    function Pd(l, t, e, a, u) {
      if ((He(t), t.stateNode === null)) {
        var n = aa,
          i = e.contextType;
        typeof i == "object" && i !== null && (n = Kl(i)),
          (n = new e(a, n)),
          (t.memoizedState =
            n.state !== null && n.state !== void 0 ? n.state : null),
          (n.updater = Sc),
          (t.stateNode = n),
          (n._reactInternals = t),
          (n = t.stateNode),
          (n.props = a),
          (n.state = t.memoizedState),
          (n.refs = {}),
          Wi(t),
          (i = e.contextType),
          (n.context = typeof i == "object" && i !== null ? Kl(i) : aa),
          (n.state = t.memoizedState),
          (i = e.getDerivedStateFromProps),
          typeof i == "function" &&
            (bc(t, e, i, a), (n.state = t.memoizedState)),
          typeof e.getDerivedStateFromProps == "function" ||
            typeof n.getSnapshotBeforeUpdate == "function" ||
            (typeof n.UNSAFE_componentWillMount != "function" &&
              typeof n.componentWillMount != "function") ||
            ((i = n.state),
            typeof n.componentWillMount == "function" && n.componentWillMount(),
            typeof n.UNSAFE_componentWillMount == "function" &&
              n.UNSAFE_componentWillMount(),
            i !== n.state && Sc.enqueueReplaceState(n, n.state, null),
            tu(t, a, n, u),
            lu(),
            (n.state = t.memoizedState)),
          typeof n.componentDidMount == "function" && (t.flags |= 4194308),
          (a = !0);
      } else if (l === null) {
        n = t.stateNode;
        var c = t.memoizedProps,
          s = Qe(e, c);
        n.props = s;
        var y = n.context,
          j = e.contextType;
        (i = aa), typeof j == "object" && j !== null && (i = Kl(j));
        var x = e.getDerivedStateFromProps;
        (j =
          typeof x == "function" ||
          typeof n.getSnapshotBeforeUpdate == "function"),
          (c = t.pendingProps !== c),
          j ||
            (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
              typeof n.componentWillReceiveProps != "function") ||
            ((c || y !== i) && Gd(t, n, a, i)),
          (ie = !1);
        var g = t.memoizedState;
        (n.state = g),
          tu(t, a, n, u),
          lu(),
          (y = t.memoizedState),
          c || g !== y || ie
            ? (typeof x == "function" &&
                (bc(t, e, x, a), (y = t.memoizedState)),
              (s = ie || Bd(t, e, s, a, g, y, i))
                ? (j ||
                    (typeof n.UNSAFE_componentWillMount != "function" &&
                      typeof n.componentWillMount != "function") ||
                    (typeof n.componentWillMount == "function" &&
                      n.componentWillMount(),
                    typeof n.UNSAFE_componentWillMount == "function" &&
                      n.UNSAFE_componentWillMount()),
                  typeof n.componentDidMount == "function" &&
                    (t.flags |= 4194308))
                : (typeof n.componentDidMount == "function" &&
                    (t.flags |= 4194308),
                  (t.memoizedProps = a),
                  (t.memoizedState = y)),
              (n.props = a),
              (n.state = y),
              (n.context = i),
              (a = s))
            : (typeof n.componentDidMount == "function" && (t.flags |= 4194308),
              (a = !1));
      } else {
        (n = t.stateNode),
          Fi(l, t),
          (i = t.memoizedProps),
          (j = Qe(e, i)),
          (n.props = j),
          (x = t.pendingProps),
          (g = n.context),
          (y = e.contextType),
          (s = aa),
          typeof y == "object" && y !== null && (s = Kl(y)),
          (c = e.getDerivedStateFromProps),
          (y =
            typeof c == "function" ||
            typeof n.getSnapshotBeforeUpdate == "function") ||
            (typeof n.UNSAFE_componentWillReceiveProps != "function" &&
              typeof n.componentWillReceiveProps != "function") ||
            ((i !== x || g !== s) && Gd(t, n, a, s)),
          (ie = !1),
          (g = t.memoizedState),
          (n.state = g),
          tu(t, a, n, u),
          lu();
        var S = t.memoizedState;
        i !== x ||
        g !== S ||
        ie ||
        (l !== null && l.dependencies !== null && Fu(l.dependencies))
          ? (typeof c == "function" && (bc(t, e, c, a), (S = t.memoizedState)),
            (j =
              ie ||
              Bd(t, e, j, a, g, S, s) ||
              (l !== null && l.dependencies !== null && Fu(l.dependencies)))
              ? (y ||
                  (typeof n.UNSAFE_componentWillUpdate != "function" &&
                    typeof n.componentWillUpdate != "function") ||
                  (typeof n.componentWillUpdate == "function" &&
                    n.componentWillUpdate(a, S, s),
                  typeof n.UNSAFE_componentWillUpdate == "function" &&
                    n.UNSAFE_componentWillUpdate(a, S, s)),
                typeof n.componentDidUpdate == "function" && (t.flags |= 4),
                typeof n.getSnapshotBeforeUpdate == "function" &&
                  (t.flags |= 1024))
              : (typeof n.componentDidUpdate != "function" ||
                  (i === l.memoizedProps && g === l.memoizedState) ||
                  (t.flags |= 4),
                typeof n.getSnapshotBeforeUpdate != "function" ||
                  (i === l.memoizedProps && g === l.memoizedState) ||
                  (t.flags |= 1024),
                (t.memoizedProps = a),
                (t.memoizedState = S)),
            (n.props = a),
            (n.state = S),
            (n.context = s),
            (a = j))
          : (typeof n.componentDidUpdate != "function" ||
              (i === l.memoizedProps && g === l.memoizedState) ||
              (t.flags |= 4),
            typeof n.getSnapshotBeforeUpdate != "function" ||
              (i === l.memoizedProps && g === l.memoizedState) ||
              (t.flags |= 1024),
            (a = !1));
      }
      return (
        (n = a),
        vn(l, t),
        (a = (t.flags & 128) !== 0),
        n || a
          ? ((n = t.stateNode),
            (e =
              a && typeof e.getDerivedStateFromError != "function"
                ? null
                : n.render()),
            (t.flags |= 1),
            l !== null && a
              ? ((t.child = Ge(t, l.child, null, u)),
                (t.child = Ge(t, null, e, u)))
              : Jl(l, t, e, u),
            (t.memoizedState = n.state),
            (l = t.child))
          : (l = Lt(l, t, u)),
        l
      );
    }
    function lo(l, t, e, a) {
      return Ce(), (t.flags |= 256), Jl(l, t, e, a), t.child;
    }
    var jc = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null,
    };
    function Ec(l) {
      return { baseLanes: l, cachePool: Vs() };
    }
    function zc(l, t, e) {
      return (l = l !== null ? l.childLanes & ~e : 0), t && (l |= yt), l;
    }
    function to(l, t, e) {
      var a = t.pendingProps,
        u = !1,
        n = (t.flags & 128) !== 0,
        i;
      if (
        ((i = n) ||
          (i =
            l !== null && l.memoizedState === null
              ? !1
              : (Dl.current & 2) !== 0),
        i && ((u = !0), (t.flags &= -129)),
        (i = (t.flags & 32) !== 0),
        (t.flags &= -33),
        l === null)
      ) {
        if (el) {
          if (
            (u ? se(t) : de(),
            (l = Nl)
              ? ((l = dm(l, Et)),
                (l = l !== null && l.data !== "&" ? l : null),
                l !== null &&
                  ((t.memoizedState = {
                    dehydrated: l,
                    treeContext: ee !== null ? { id: Dt, overflow: Ut } : null,
                    retryLane: 536870912,
                    hydrationErrors: null,
                  }),
                  (e = Rs(l)),
                  (e.return = t),
                  (t.child = e),
                  (Ll = t),
                  (Nl = null)))
              : (l = null),
            l === null)
          )
            throw ue(t);
          return ff(l) ? (t.lanes = 32) : (t.lanes = 536870912), null;
        }
        var c = a.children;
        return (
          (a = a.fallback),
          u
            ? (de(),
              (u = t.mode),
              (c = yn({ mode: "hidden", children: c }, u)),
              (a = Ue(a, u, e, null)),
              (c.return = t),
              (a.return = t),
              (c.sibling = a),
              (t.child = c),
              (a = t.child),
              (a.memoizedState = Ec(e)),
              (a.childLanes = zc(l, i, e)),
              (t.memoizedState = jc),
              iu(null, a))
            : (se(t), xc(t, c))
        );
      }
      var s = l.memoizedState;
      if (s !== null && ((c = s.dehydrated), c !== null)) {
        if (n)
          t.flags & 256
            ? (se(t), (t.flags &= -257), (t = Tc(l, t, e)))
            : t.memoizedState !== null
            ? (de(), (t.child = l.child), (t.flags |= 128), (t = null))
            : (de(),
              (c = a.fallback),
              (u = t.mode),
              (a = yn({ mode: "visible", children: a.children }, u)),
              (c = Ue(c, u, e, null)),
              (c.flags |= 2),
              (a.return = t),
              (c.return = t),
              (a.sibling = c),
              (t.child = a),
              Ge(t, l.child, null, e),
              (a = t.child),
              (a.memoizedState = Ec(e)),
              (a.childLanes = zc(l, i, e)),
              (t.memoizedState = jc),
              (t = iu(null, a)));
        else if ((se(t), ff(c))) {
          if (((i = c.nextSibling && c.nextSibling.dataset), i)) var y = i.dgst;
          (i = y),
            (a = Error(h(419))),
            (a.stack = ""),
            (a.digest = i),
            Wa({ value: a, source: null, stack: null }),
            (t = Tc(l, t, e));
        } else if (
          (ql || ca(l, t, e, !1), (i = (e & l.childLanes) !== 0), ql || i)
        ) {
          if (
            ((i = bl),
            i !== null && ((a = Qf(i, e)), a !== 0 && a !== s.retryLane))
          )
            throw ((s.retryLane = a), De(l, a), it(i, l, a), pc);
          cf(c) || zn(), (t = Tc(l, t, e));
        } else
          cf(c)
            ? ((t.flags |= 192), (t.child = l.child), (t = null))
            : ((l = s.treeContext),
              (Nl = xt(c.nextSibling)),
              (Ll = t),
              (el = !0),
              (ae = null),
              (Et = !1),
              l !== null && Ys(t, l),
              (t = xc(t, a.children)),
              (t.flags |= 4096));
        return t;
      }
      return u
        ? (de(),
          (c = a.fallback),
          (u = t.mode),
          (s = l.child),
          (y = s.sibling),
          (a = Bt(s, { mode: "hidden", children: a.children })),
          (a.subtreeFlags = s.subtreeFlags & 65011712),
          y !== null
            ? (c = Bt(y, c))
            : ((c = Ue(c, u, e, null)), (c.flags |= 2)),
          (c.return = t),
          (a.return = t),
          (a.sibling = c),
          (t.child = a),
          iu(null, a),
          (a = t.child),
          (c = l.child.memoizedState),
          c === null
            ? (c = Ec(e))
            : ((u = c.cachePool),
              u !== null
                ? ((s = Rl._currentValue),
                  (u = u.parent !== s ? { parent: s, pool: s } : u))
                : (u = Vs()),
              (c = { baseLanes: c.baseLanes | e, cachePool: u })),
          (a.memoizedState = c),
          (a.childLanes = zc(l, i, e)),
          (t.memoizedState = jc),
          iu(l.child, a))
        : (se(t),
          (e = l.child),
          (l = e.sibling),
          (e = Bt(e, { mode: "visible", children: a.children })),
          (e.return = t),
          (e.sibling = null),
          l !== null &&
            ((i = t.deletions),
            i === null ? ((t.deletions = [l]), (t.flags |= 16)) : i.push(l)),
          (t.child = e),
          (t.memoizedState = null),
          e);
    }
    function xc(l, t) {
      return (
        (t = yn({ mode: "visible", children: t }, l.mode)),
        (t.return = l),
        (l.child = t)
      );
    }
    function yn(l, t) {
      return (l = mt(22, l, null, t)), (l.lanes = 0), l;
    }
    function Tc(l, t, e) {
      return (
        Ge(t, l.child, null, e),
        (l = xc(t, t.pendingProps.children)),
        (l.flags |= 2),
        (t.memoizedState = null),
        l
      );
    }
    function eo(l, t, e) {
      l.lanes |= t;
      var a = l.alternate;
      a !== null && (a.lanes |= t), Zi(l.return, t, e);
    }
    function _c(l, t, e, a, u, n) {
      var i = l.memoizedState;
      i === null
        ? (l.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: a,
            tail: e,
            tailMode: u,
            treeForkCount: n,
          })
        : ((i.isBackwards = t),
          (i.rendering = null),
          (i.renderingStartTime = 0),
          (i.last = a),
          (i.tail = e),
          (i.tailMode = u),
          (i.treeForkCount = n));
    }
    function ao(l, t, e) {
      var a = t.pendingProps,
        u = a.revealOrder,
        n = a.tail;
      a = a.children;
      var i = Dl.current,
        c = (i & 2) !== 0;
      if (
        (c ? ((i = (i & 1) | 2), (t.flags |= 128)) : (i &= 1),
        b(Dl, i),
        Jl(l, t, a, e),
        (a = el ? wa : 0),
        !c && l !== null && (l.flags & 128) !== 0)
      )
        l: for (l = t.child; l !== null; ) {
          if (l.tag === 13) l.memoizedState !== null && eo(l, e, t);
          else if (l.tag === 19) eo(l, e, t);
          else if (l.child !== null) {
            (l.child.return = l), (l = l.child);
            continue;
          }
          if (l === t) break l;
          for (; l.sibling === null; ) {
            if (l.return === null || l.return === t) break l;
            l = l.return;
          }
          (l.sibling.return = l.return), (l = l.sibling);
        }
      switch (u) {
        case "forwards":
          for (e = t.child, u = null; e !== null; )
            (l = e.alternate),
              l !== null && an(l) === null && (u = e),
              (e = e.sibling);
          (e = u),
            e === null
              ? ((u = t.child), (t.child = null))
              : ((u = e.sibling), (e.sibling = null)),
            _c(t, !1, u, e, n, a);
          break;
        case "backwards":
        case "unstable_legacy-backwards":
          for (e = null, u = t.child, t.child = null; u !== null; ) {
            if (((l = u.alternate), l !== null && an(l) === null)) {
              t.child = u;
              break;
            }
            (l = u.sibling), (u.sibling = e), (e = u), (u = l);
          }
          _c(t, !0, e, null, n, a);
          break;
        case "together":
          _c(t, !1, null, null, void 0, a);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function Lt(l, t, e) {
      if (
        (l !== null && (t.dependencies = l.dependencies),
        (re |= t.lanes),
        (e & t.childLanes) === 0)
      )
        if (l !== null) {
          if ((ca(l, t, e, !1), (e & t.childLanes) === 0)) return null;
        } else return null;
      if (l !== null && t.child !== l.child) throw Error(h(153));
      if (t.child !== null) {
        for (
          l = t.child, e = Bt(l, l.pendingProps), t.child = e, e.return = t;
          l.sibling !== null;

        )
          (l = l.sibling),
            (e = e.sibling = Bt(l, l.pendingProps)),
            (e.return = t);
        e.sibling = null;
      }
      return t.child;
    }
    function Mc(l, t) {
      return (l.lanes & t) !== 0
        ? !0
        : ((l = l.dependencies), !!(l !== null && Fu(l)));
    }
    function Mh(l, t, e) {
      switch (t.tag) {
        case 3:
          kl(t, t.stateNode.containerInfo),
            ne(t, Rl, l.memoizedState.cache),
            Ce();
          break;
        case 27:
        case 5:
          Ua(t);
          break;
        case 4:
          kl(t, t.stateNode.containerInfo);
          break;
        case 10:
          ne(t, t.type, t.memoizedProps.value);
          break;
        case 31:
          if (t.memoizedState !== null) return (t.flags |= 128), lc(t), null;
          break;
        case 13:
          var a = t.memoizedState;
          if (a !== null)
            return a.dehydrated !== null
              ? (se(t), (t.flags |= 128), null)
              : (e & t.child.childLanes) !== 0
              ? to(l, t, e)
              : (se(t), (l = Lt(l, t, e)), l !== null ? l.sibling : null);
          se(t);
          break;
        case 19:
          var u = (l.flags & 128) !== 0;
          if (
            ((a = (e & t.childLanes) !== 0),
            a || (ca(l, t, e, !1), (a = (e & t.childLanes) !== 0)),
            u)
          ) {
            if (a) return ao(l, t, e);
            t.flags |= 128;
          }
          if (
            ((u = t.memoizedState),
            u !== null &&
              ((u.rendering = null), (u.tail = null), (u.lastEffect = null)),
            b(Dl, Dl.current),
            a)
          )
            break;
          return null;
        case 22:
          return (t.lanes = 0), Fd(l, t, e, t.pendingProps);
        case 24:
          ne(t, Rl, l.memoizedState.cache);
      }
      return Lt(l, t, e);
    }
    function uo(l, t, e) {
      if (l !== null)
        if (l.memoizedProps !== t.pendingProps) ql = !0;
        else {
          if (!Mc(l, e) && (t.flags & 128) === 0) return (ql = !1), Mh(l, t, e);
          ql = (l.flags & 131072) !== 0;
        }
      else (ql = !1), el && (t.flags & 1048576) !== 0 && qs(t, wa, t.index);
      switch (((t.lanes = 0), t.tag)) {
        case 16:
          l: {
            var a = t.pendingProps;
            if (((l = Ye(t.elementType)), (t.type = l), typeof l == "function"))
              Ri(l)
                ? ((a = Qe(l, a)), (t.tag = 1), (t = Pd(null, t, l, a, e)))
                : ((t.tag = 0), (t = Ac(null, t, l, a, e)));
            else {
              if (l != null) {
                var u = l.$$typeof;
                if (u === Gl) {
                  (t.tag = 11), (t = Jd(null, t, l, a, e));
                  break l;
                } else if (u === V) {
                  (t.tag = 14), (t = wd(null, t, l, a, e));
                  break l;
                }
              }
              throw ((t = $l(l) || l), Error(h(306, t, "")));
            }
          }
          return t;
        case 0:
          return Ac(l, t, t.type, t.pendingProps, e);
        case 1:
          return (a = t.type), (u = Qe(a, t.pendingProps)), Pd(l, t, a, u, e);
        case 3:
          l: {
            if ((kl(t, t.stateNode.containerInfo), l === null))
              throw Error(h(387));
            a = t.pendingProps;
            var n = t.memoizedState;
            (u = n.element), Fi(l, t), tu(t, a, null, e);
            var i = t.memoizedState;
            if (
              ((a = i.cache),
              ne(t, Rl, a),
              a !== n.cache && Vi(t, [Rl], e, !0),
              lu(),
              (a = i.element),
              n.isDehydrated)
            )
              if (
                ((n = { element: a, isDehydrated: !1, cache: i.cache }),
                (t.updateQueue.baseState = n),
                (t.memoizedState = n),
                t.flags & 256)
              ) {
                t = lo(l, t, a, e);
                break l;
              } else if (a !== u) {
                (u = pt(Error(h(424)), t)), Wa(u), (t = lo(l, t, a, e));
                break l;
              } else {
                switch (((l = t.stateNode.containerInfo), l.nodeType)) {
                  case 9:
                    l = l.body;
                    break;
                  default:
                    l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
                }
                for (
                  Nl = xt(l.firstChild),
                    Ll = t,
                    el = !0,
                    ae = null,
                    Et = !0,
                    e = Fs(t, null, a, e),
                    t.child = e;
                  e;

                )
                  (e.flags = (e.flags & -3) | 4096), (e = e.sibling);
              }
            else {
              if ((Ce(), a === u)) {
                t = Lt(l, t, e);
                break l;
              }
              Jl(l, t, a, e);
            }
            t = t.child;
          }
          return t;
        case 26:
          return (
            vn(l, t),
            l === null
              ? (e = ym(t.type, null, t.pendingProps, null))
                ? (t.memoizedState = e)
                : el ||
                  ((e = t.type),
                  (l = t.pendingProps),
                  (a = Un(w.current).createElement(e)),
                  (a[Vl] = t),
                  (a[lt] = l),
                  wl(a, e, l),
                  Xl(a),
                  (t.stateNode = a))
              : (t.memoizedState = ym(
                  t.type,
                  l.memoizedProps,
                  t.pendingProps,
                  l.memoizedState
                )),
            null
          );
        case 27:
          return (
            Ua(t),
            l === null &&
              el &&
              ((a = t.stateNode = rm(t.type, t.pendingProps, w.current)),
              (Ll = t),
              (Et = !0),
              (u = Nl),
              be(t.type) ? ((sf = u), (Nl = xt(a.firstChild))) : (Nl = u)),
            Jl(l, t, t.pendingProps.children, e),
            vn(l, t),
            l === null && (t.flags |= 4194304),
            t.child
          );
        case 5:
          return (
            l === null &&
              el &&
              ((u = a = Nl) &&
                ((a = nv(a, t.type, t.pendingProps, Et)),
                a !== null
                  ? ((t.stateNode = a),
                    (Ll = t),
                    (Nl = xt(a.firstChild)),
                    (Et = !1),
                    (u = !0))
                  : (u = !1)),
              u || ue(t)),
            Ua(t),
            (u = t.type),
            (n = t.pendingProps),
            (i = l !== null ? l.memoizedProps : null),
            (a = n.children),
            af(u, n) ? (a = null) : i !== null && af(u, i) && (t.flags |= 32),
            t.memoizedState !== null &&
              ((u = ec(l, t, Nh, null, null, e)), (pu._currentValue = u)),
            vn(l, t),
            Jl(l, t, a, e),
            t.child
          );
        case 6:
          return (
            l === null &&
              el &&
              ((l = e = Nl) &&
                ((e = iv(e, t.pendingProps, Et)),
                e !== null
                  ? ((t.stateNode = e), (Ll = t), (Nl = null), (l = !0))
                  : (l = !1)),
              l || ue(t)),
            null
          );
        case 13:
          return to(l, t, e);
        case 4:
          return (
            kl(t, t.stateNode.containerInfo),
            (a = t.pendingProps),
            l === null ? (t.child = Ge(t, null, a, e)) : Jl(l, t, a, e),
            t.child
          );
        case 11:
          return Jd(l, t, t.type, t.pendingProps, e);
        case 7:
          return Jl(l, t, t.pendingProps, e), t.child;
        case 8:
          return Jl(l, t, t.pendingProps.children, e), t.child;
        case 12:
          return Jl(l, t, t.pendingProps.children, e), t.child;
        case 10:
          return (
            (a = t.pendingProps),
            ne(t, t.type, a.value),
            Jl(l, t, a.children, e),
            t.child
          );
        case 9:
          return (
            (u = t.type._context),
            (a = t.pendingProps.children),
            He(t),
            (u = Kl(u)),
            (a = a(u)),
            (t.flags |= 1),
            Jl(l, t, a, e),
            t.child
          );
        case 14:
          return wd(l, t, t.type, t.pendingProps, e);
        case 15:
          return Wd(l, t, t.type, t.pendingProps, e);
        case 19:
          return ao(l, t, e);
        case 31:
          return _h(l, t, e);
        case 22:
          return Fd(l, t, e, t.pendingProps);
        case 24:
          return (
            He(t),
            (a = Kl(Rl)),
            l === null
              ? ((u = Ji()),
                u === null &&
                  ((u = bl),
                  (n = Li()),
                  (u.pooledCache = n),
                  n.refCount++,
                  n !== null && (u.pooledCacheLanes |= e),
                  (u = n)),
                (t.memoizedState = { parent: a, cache: u }),
                Wi(t),
                ne(t, Rl, u))
              : ((l.lanes & e) !== 0 && (Fi(l, t), tu(t, null, null, e), lu()),
                (u = l.memoizedState),
                (n = t.memoizedState),
                u.parent !== a
                  ? ((u = { parent: a, cache: a }),
                    (t.memoizedState = u),
                    t.lanes === 0 &&
                      (t.memoizedState = t.updateQueue.baseState = u),
                    ne(t, Rl, a))
                  : ((a = n.cache),
                    ne(t, Rl, a),
                    a !== u.cache && Vi(t, [Rl], e, !0))),
            Jl(l, t, t.pendingProps.children, e),
            t.child
          );
        case 29:
          throw t.pendingProps;
      }
      throw Error(h(156, t.tag));
    }
    function Kt(l) {
      l.flags |= 4;
    }
    function Oc(l, t, e, a, u) {
      if (((t = (l.mode & 32) !== 0) && (t = !1), t)) {
        if (((l.flags |= 16777216), (u & 335544128) === u))
          if (l.stateNode.complete) l.flags |= 8192;
          else if (Uo()) l.flags |= 8192;
          else throw ((Be = Pu), wi);
      } else l.flags &= -16777217;
    }
    function no(l, t) {
      if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
        l.flags &= -16777217;
      else if (((l.flags |= 16777216), !pm(t)))
        if (Uo()) l.flags |= 8192;
        else throw ((Be = Pu), wi);
    }
    function gn(l, t) {
      t !== null && (l.flags |= 4),
        l.flags & 16384 &&
          ((t = l.tag !== 22 ? Bf() : 536870912), (l.lanes |= t), (Sa |= t));
    }
    function cu(l, t) {
      if (!el)
        switch (l.tailMode) {
          case "hidden":
            t = l.tail;
            for (var e = null; t !== null; )
              t.alternate !== null && (e = t), (t = t.sibling);
            e === null ? (l.tail = null) : (e.sibling = null);
            break;
          case "collapsed":
            e = l.tail;
            for (var a = null; e !== null; )
              e.alternate !== null && (a = e), (e = e.sibling);
            a === null
              ? t || l.tail === null
                ? (l.tail = null)
                : (l.tail.sibling = null)
              : (a.sibling = null);
        }
    }
    function pl(l) {
      var t = l.alternate !== null && l.alternate.child === l.child,
        e = 0,
        a = 0;
      if (t)
        for (var u = l.child; u !== null; )
          (e |= u.lanes | u.childLanes),
            (a |= u.subtreeFlags & 65011712),
            (a |= u.flags & 65011712),
            (u.return = l),
            (u = u.sibling);
      else
        for (u = l.child; u !== null; )
          (e |= u.lanes | u.childLanes),
            (a |= u.subtreeFlags),
            (a |= u.flags),
            (u.return = l),
            (u = u.sibling);
      return (l.subtreeFlags |= a), (l.childLanes = e), t;
    }
    function Oh(l, t, e) {
      var a = t.pendingProps;
      switch ((Bi(t), t.tag)) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return pl(t), null;
        case 1:
          return pl(t), null;
        case 3:
          return (
            (e = t.stateNode),
            (a = null),
            l !== null && (a = l.memoizedState.cache),
            t.memoizedState.cache !== a && (t.flags |= 2048),
            Qt(Rl),
            Ol(),
            e.pendingContext &&
              ((e.context = e.pendingContext), (e.pendingContext = null)),
            (l === null || l.child === null) &&
              (ia(t)
                ? Kt(t)
                : l === null ||
                  (l.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                  ((t.flags |= 1024), Xi())),
            pl(t),
            null
          );
        case 26:
          var u = t.type,
            n = t.memoizedState;
          return (
            l === null
              ? (Kt(t),
                n !== null ? (pl(t), no(t, n)) : (pl(t), Oc(t, u, null, a, e)))
              : n
              ? n !== l.memoizedState
                ? (Kt(t), pl(t), no(t, n))
                : (pl(t), (t.flags &= -16777217))
              : ((l = l.memoizedProps),
                l !== a && Kt(t),
                pl(t),
                Oc(t, u, l, a, e)),
            null
          );
        case 27:
          if (
            (Tu(t),
            (e = w.current),
            (u = t.type),
            l !== null && t.stateNode != null)
          )
            l.memoizedProps !== a && Kt(t);
          else {
            if (!a) {
              if (t.stateNode === null) throw Error(h(166));
              return pl(t), null;
            }
            (l = m.current),
              ia(t) ? Bs(t) : ((l = rm(u, a, e)), (t.stateNode = l), Kt(t));
          }
          return pl(t), null;
        case 5:
          if ((Tu(t), (u = t.type), l !== null && t.stateNode != null))
            l.memoizedProps !== a && Kt(t);
          else {
            if (!a) {
              if (t.stateNode === null) throw Error(h(166));
              return pl(t), null;
            }
            if (((n = m.current), ia(t))) Bs(t);
            else {
              var i = Un(w.current);
              switch (n) {
                case 1:
                  n = i.createElementNS("http://www.w3.org/2000/svg", u);
                  break;
                case 2:
                  n = i.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    u
                  );
                  break;
                default:
                  switch (u) {
                    case "svg":
                      n = i.createElementNS("http://www.w3.org/2000/svg", u);
                      break;
                    case "math":
                      n = i.createElementNS(
                        "http://www.w3.org/1998/Math/MathML",
                        u
                      );
                      break;
                    case "script":
                      (n = i.createElement("div")),
                        (n.innerHTML = "<script></script>"),
                        (n = n.removeChild(n.firstChild));
                      break;
                    case "select":
                      (n =
                        typeof a.is == "string"
                          ? i.createElement("select", { is: a.is })
                          : i.createElement("select")),
                        a.multiple
                          ? (n.multiple = !0)
                          : a.size && (n.size = a.size);
                      break;
                    default:
                      n =
                        typeof a.is == "string"
                          ? i.createElement(u, { is: a.is })
                          : i.createElement(u);
                  }
              }
              (n[Vl] = t), (n[lt] = a);
              l: for (i = t.child; i !== null; ) {
                if (i.tag === 5 || i.tag === 6) n.appendChild(i.stateNode);
                else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
                  (i.child.return = i), (i = i.child);
                  continue;
                }
                if (i === t) break l;
                for (; i.sibling === null; ) {
                  if (i.return === null || i.return === t) break l;
                  i = i.return;
                }
                (i.sibling.return = i.return), (i = i.sibling);
              }
              t.stateNode = n;
              l: switch ((wl(n, u, a), u)) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  a = !!a.autoFocus;
                  break l;
                case "img":
                  a = !0;
                  break l;
                default:
                  a = !1;
              }
              a && Kt(t);
            }
          }
          return (
            pl(t),
            Oc(
              t,
              t.type,
              l === null ? null : l.memoizedProps,
              t.pendingProps,
              e
            ),
            null
          );
        case 6:
          if (l && t.stateNode != null) l.memoizedProps !== a && Kt(t);
          else {
            if (typeof a != "string" && t.stateNode === null)
              throw Error(h(166));
            if (((l = w.current), ia(t))) {
              if (
                ((l = t.stateNode),
                (e = t.memoizedProps),
                (a = null),
                (u = Ll),
                u !== null)
              )
                switch (u.tag) {
                  case 27:
                  case 5:
                    a = u.memoizedProps;
                }
              (l[Vl] = t),
                (l = !!(
                  l.nodeValue === e ||
                  (a !== null && a.suppressHydrationWarning === !0) ||
                  em(l.nodeValue, e)
                )),
                l || ue(t, !0);
            } else
              (l = Un(l).createTextNode(a)), (l[Vl] = t), (t.stateNode = l);
          }
          return pl(t), null;
        case 31:
          if (((e = t.memoizedState), l === null || l.memoizedState !== null)) {
            if (((a = ia(t)), e !== null)) {
              if (l === null) {
                if (!a) throw Error(h(318));
                if (
                  ((l = t.memoizedState),
                  (l = l !== null ? l.dehydrated : null),
                  !l)
                )
                  throw Error(h(557));
                l[Vl] = t;
              } else
                Ce(),
                  (t.flags & 128) === 0 && (t.memoizedState = null),
                  (t.flags |= 4);
              pl(t), (l = !1);
            } else
              (e = Xi()),
                l !== null &&
                  l.memoizedState !== null &&
                  (l.memoizedState.hydrationErrors = e),
                (l = !0);
            if (!l) return t.flags & 256 ? (ht(t), t) : (ht(t), null);
            if ((t.flags & 128) !== 0) throw Error(h(558));
          }
          return pl(t), null;
        case 13:
          if (
            ((a = t.memoizedState),
            l === null ||
              (l.memoizedState !== null && l.memoizedState.dehydrated !== null))
          ) {
            if (((u = ia(t)), a !== null && a.dehydrated !== null)) {
              if (l === null) {
                if (!u) throw Error(h(318));
                if (
                  ((u = t.memoizedState),
                  (u = u !== null ? u.dehydrated : null),
                  !u)
                )
                  throw Error(h(317));
                u[Vl] = t;
              } else
                Ce(),
                  (t.flags & 128) === 0 && (t.memoizedState = null),
                  (t.flags |= 4);
              pl(t), (u = !1);
            } else
              (u = Xi()),
                l !== null &&
                  l.memoizedState !== null &&
                  (l.memoizedState.hydrationErrors = u),
                (u = !0);
            if (!u) return t.flags & 256 ? (ht(t), t) : (ht(t), null);
          }
          return (
            ht(t),
            (t.flags & 128) !== 0
              ? ((t.lanes = e), t)
              : ((e = a !== null),
                (l = l !== null && l.memoizedState !== null),
                e &&
                  ((a = t.child),
                  (u = null),
                  a.alternate !== null &&
                    a.alternate.memoizedState !== null &&
                    a.alternate.memoizedState.cachePool !== null &&
                    (u = a.alternate.memoizedState.cachePool.pool),
                  (n = null),
                  a.memoizedState !== null &&
                    a.memoizedState.cachePool !== null &&
                    (n = a.memoizedState.cachePool.pool),
                  n !== u && (a.flags |= 2048)),
                e !== l && e && (t.child.flags |= 8192),
                gn(t, t.updateQueue),
                pl(t),
                null)
          );
        case 4:
          return Ol(), l === null && Ic(t.stateNode.containerInfo), pl(t), null;
        case 10:
          return Qt(t.type), pl(t), null;
        case 19:
          if ((z(Dl), (a = t.memoizedState), a === null)) return pl(t), null;
          if (((u = (t.flags & 128) !== 0), (n = a.rendering), n === null))
            if (u) cu(a, !1);
            else {
              if (Tl !== 0 || (l !== null && (l.flags & 128) !== 0))
                for (l = t.child; l !== null; ) {
                  if (((n = an(l)), n !== null)) {
                    for (
                      t.flags |= 128,
                        cu(a, !1),
                        l = n.updateQueue,
                        t.updateQueue = l,
                        gn(t, l),
                        t.subtreeFlags = 0,
                        l = e,
                        e = t.child;
                      e !== null;

                    )
                      Cs(e, l), (e = e.sibling);
                    return (
                      b(Dl, (Dl.current & 1) | 2),
                      el && Gt(t, a.treeForkCount),
                      t.child
                    );
                  }
                  l = l.sibling;
                }
              a.tail !== null &&
                ft() > An &&
                ((t.flags |= 128), (u = !0), cu(a, !1), (t.lanes = 4194304));
            }
          else {
            if (!u)
              if (((l = an(n)), l !== null)) {
                if (
                  ((t.flags |= 128),
                  (u = !0),
                  (l = l.updateQueue),
                  (t.updateQueue = l),
                  gn(t, l),
                  cu(a, !0),
                  a.tail === null &&
                    a.tailMode === "hidden" &&
                    !n.alternate &&
                    !el)
                )
                  return pl(t), null;
              } else
                2 * ft() - a.renderingStartTime > An &&
                  e !== 536870912 &&
                  ((t.flags |= 128), (u = !0), cu(a, !1), (t.lanes = 4194304));
            a.isBackwards
              ? ((n.sibling = t.child), (t.child = n))
              : ((l = a.last),
                l !== null ? (l.sibling = n) : (t.child = n),
                (a.last = n));
          }
          return a.tail !== null
            ? ((l = a.tail),
              (a.rendering = l),
              (a.tail = l.sibling),
              (a.renderingStartTime = ft()),
              (l.sibling = null),
              (e = Dl.current),
              b(Dl, u ? (e & 1) | 2 : e & 1),
              el && Gt(t, a.treeForkCount),
              l)
            : (pl(t), null);
        case 22:
        case 23:
          return (
            ht(t),
            Pi(),
            (a = t.memoizedState !== null),
            l !== null
              ? (l.memoizedState !== null) !== a && (t.flags |= 8192)
              : a && (t.flags |= 8192),
            a
              ? (e & 536870912) !== 0 &&
                (t.flags & 128) === 0 &&
                (pl(t), t.subtreeFlags & 6 && (t.flags |= 8192))
              : pl(t),
            (e = t.updateQueue),
            e !== null && gn(t, e.retryQueue),
            (e = null),
            l !== null &&
              l.memoizedState !== null &&
              l.memoizedState.cachePool !== null &&
              (e = l.memoizedState.cachePool.pool),
            (a = null),
            t.memoizedState !== null &&
              t.memoizedState.cachePool !== null &&
              (a = t.memoizedState.cachePool.pool),
            a !== e && (t.flags |= 2048),
            l !== null && z(qe),
            null
          );
        case 24:
          return (
            (e = null),
            l !== null && (e = l.memoizedState.cache),
            t.memoizedState.cache !== e && (t.flags |= 2048),
            Qt(Rl),
            pl(t),
            null
          );
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(h(156, t.tag));
    }
    function Dh(l, t) {
      switch ((Bi(t), t.tag)) {
        case 1:
          return (
            (l = t.flags),
            l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
          );
        case 3:
          return (
            Qt(Rl),
            Ol(),
            (l = t.flags),
            (l & 65536) !== 0 && (l & 128) === 0
              ? ((t.flags = (l & -65537) | 128), t)
              : null
          );
        case 26:
        case 27:
        case 5:
          return Tu(t), null;
        case 31:
          if (t.memoizedState !== null) {
            if ((ht(t), t.alternate === null)) throw Error(h(340));
            Ce();
          }
          return (
            (l = t.flags),
            l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
          );
        case 13:
          if (
            (ht(t), (l = t.memoizedState), l !== null && l.dehydrated !== null)
          ) {
            if (t.alternate === null) throw Error(h(340));
            Ce();
          }
          return (
            (l = t.flags),
            l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
          );
        case 19:
          return z(Dl), null;
        case 4:
          return Ol(), null;
        case 10:
          return Qt(t.type), null;
        case 22:
        case 23:
          return (
            ht(t),
            Pi(),
            l !== null && z(qe),
            (l = t.flags),
            l & 65536 ? ((t.flags = (l & -65537) | 128), t) : null
          );
        case 24:
          return Qt(Rl), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function io(l, t) {
      switch ((Bi(t), t.tag)) {
        case 3:
          Qt(Rl), Ol();
          break;
        case 26:
        case 27:
        case 5:
          Tu(t);
          break;
        case 4:
          Ol();
          break;
        case 31:
          t.memoizedState !== null && ht(t);
          break;
        case 13:
          ht(t);
          break;
        case 19:
          z(Dl);
          break;
        case 10:
          Qt(t.type);
          break;
        case 22:
        case 23:
          ht(t), Pi(), l !== null && z(qe);
          break;
        case 24:
          Qt(Rl);
      }
    }
    function fu(l, t) {
      try {
        var e = t.updateQueue,
          a = e !== null ? e.lastEffect : null;
        if (a !== null) {
          var u = a.next;
          e = u;
          do {
            if ((e.tag & l) === l) {
              a = void 0;
              var n = e.create,
                i = e.inst;
              (a = n()), (i.destroy = a);
            }
            e = e.next;
          } while (e !== u);
        }
      } catch (c) {
        ml(t, t.return, c);
      }
    }
    function oe(l, t, e) {
      try {
        var a = t.updateQueue,
          u = a !== null ? a.lastEffect : null;
        if (u !== null) {
          var n = u.next;
          a = n;
          do {
            if ((a.tag & l) === l) {
              var i = a.inst,
                c = i.destroy;
              if (c !== void 0) {
                (i.destroy = void 0), (u = t);
                var s = e,
                  y = c;
                try {
                  y();
                } catch (j) {
                  ml(u, s, j);
                }
              }
            }
            a = a.next;
          } while (a !== n);
        }
      } catch (j) {
        ml(t, t.return, j);
      }
    }
    function co(l) {
      var t = l.updateQueue;
      if (t !== null) {
        var e = l.stateNode;
        try {
          ks(t, e);
        } catch (a) {
          ml(l, l.return, a);
        }
      }
    }
    function fo(l, t, e) {
      (e.props = Qe(l.type, l.memoizedProps)), (e.state = l.memoizedState);
      try {
        e.componentWillUnmount();
      } catch (a) {
        ml(l, t, a);
      }
    }
    function su(l, t) {
      try {
        var e = l.ref;
        if (e !== null) {
          switch (l.tag) {
            case 26:
            case 27:
            case 5:
              var a = l.stateNode;
              break;
            case 30:
              a = l.stateNode;
              break;
            default:
              a = l.stateNode;
          }
          typeof e == "function" ? (l.refCleanup = e(a)) : (e.current = a);
        }
      } catch (u) {
        ml(l, t, u);
      }
    }
    function Ct(l, t) {
      var e = l.ref,
        a = l.refCleanup;
      if (e !== null)
        if (typeof a == "function")
          try {
            a();
          } catch (u) {
            ml(l, t, u);
          } finally {
            (l.refCleanup = null),
              (l = l.alternate),
              l != null && (l.refCleanup = null);
          }
        else if (typeof e == "function")
          try {
            e(null);
          } catch (u) {
            ml(l, t, u);
          }
        else e.current = null;
    }
    function so(l) {
      var t = l.type,
        e = l.memoizedProps,
        a = l.stateNode;
      try {
        l: switch (t) {
          case "button":
          case "input":
          case "select":
          case "textarea":
            e.autoFocus && a.focus();
            break l;
          case "img":
            e.src ? (a.src = e.src) : e.srcSet && (a.srcset = e.srcSet);
        }
      } catch (u) {
        ml(l, l.return, u);
      }
    }
    function Dc(l, t, e) {
      try {
        var a = l.stateNode;
        Ph(a, l.type, e, t), (a[lt] = t);
      } catch (u) {
        ml(l, l.return, u);
      }
    }
    function oo(l) {
      return (
        l.tag === 5 ||
        l.tag === 3 ||
        l.tag === 26 ||
        (l.tag === 27 && be(l.type)) ||
        l.tag === 4
      );
    }
    function Uc(l) {
      l: for (;;) {
        for (; l.sibling === null; ) {
          if (l.return === null || oo(l.return)) return null;
          l = l.return;
        }
        for (
          l.sibling.return = l.return, l = l.sibling;
          l.tag !== 5 && l.tag !== 6 && l.tag !== 18;

        ) {
          if (
            (l.tag === 27 && be(l.type)) ||
            l.flags & 2 ||
            l.child === null ||
            l.tag === 4
          )
            continue l;
          (l.child.return = l), (l = l.child);
        }
        if (!(l.flags & 2)) return l.stateNode;
      }
    }
    function Cc(l, t, e) {
      var a = l.tag;
      if (a === 5 || a === 6)
        (l = l.stateNode),
          t
            ? (e.nodeType === 9
                ? e.body
                : e.nodeName === "HTML"
                ? e.ownerDocument.body
                : e
              ).insertBefore(l, t)
            : ((t =
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                  ? e.ownerDocument.body
                  : e),
              t.appendChild(l),
              (e = e._reactRootContainer),
              e != null || t.onclick !== null || (t.onclick = qt));
      else if (
        a !== 4 &&
        (a === 27 && be(l.type) && ((e = l.stateNode), (t = null)),
        (l = l.child),
        l !== null)
      )
        for (Cc(l, t, e), l = l.sibling; l !== null; )
          Cc(l, t, e), (l = l.sibling);
    }
    function bn(l, t, e) {
      var a = l.tag;
      if (a === 5 || a === 6)
        (l = l.stateNode), t ? e.insertBefore(l, t) : e.appendChild(l);
      else if (
        a !== 4 &&
        (a === 27 && be(l.type) && (e = l.stateNode), (l = l.child), l !== null)
      )
        for (bn(l, t, e), l = l.sibling; l !== null; )
          bn(l, t, e), (l = l.sibling);
    }
    function mo(l) {
      var t = l.stateNode,
        e = l.memoizedProps;
      try {
        for (var a = l.type, u = t.attributes; u.length; )
          t.removeAttributeNode(u[0]);
        wl(t, a, e), (t[Vl] = l), (t[lt] = e);
      } catch (n) {
        ml(l, l.return, n);
      }
    }
    var Jt = !1,
      Yl = !1,
      Rc = !1,
      ro = typeof WeakSet == "function" ? WeakSet : Set,
      Ql = null;
    function Uh(l, t) {
      if (((l = l.containerInfo), (tf = Gn), (l = Es(l)), Ti(l))) {
        if ("selectionStart" in l)
          var e = { start: l.selectionStart, end: l.selectionEnd };
        else
          l: {
            e = ((e = l.ownerDocument) && e.defaultView) || window;
            var a = e.getSelection && e.getSelection();
            if (a && a.rangeCount !== 0) {
              e = a.anchorNode;
              var u = a.anchorOffset,
                n = a.focusNode;
              a = a.focusOffset;
              try {
                e.nodeType, n.nodeType;
              } catch {
                e = null;
                break l;
              }
              var i = 0,
                c = -1,
                s = -1,
                y = 0,
                j = 0,
                x = l,
                g = null;
              t: for (;;) {
                for (
                  var S;
                  x !== e || (u !== 0 && x.nodeType !== 3) || (c = i + u),
                    x !== n || (a !== 0 && x.nodeType !== 3) || (s = i + a),
                    x.nodeType === 3 && (i += x.nodeValue.length),
                    (S = x.firstChild) !== null;

                )
                  (g = x), (x = S);
                for (;;) {
                  if (x === l) break t;
                  if (
                    (g === e && ++y === u && (c = i),
                    g === n && ++j === a && (s = i),
                    (S = x.nextSibling) !== null)
                  )
                    break;
                  (x = g), (g = x.parentNode);
                }
                x = S;
              }
              e = c === -1 || s === -1 ? null : { start: c, end: s };
            } else e = null;
          }
        e = e || { start: 0, end: 0 };
      } else e = null;
      for (
        ef = { focusedElem: l, selectionRange: e }, Gn = !1, Ql = t;
        Ql !== null;

      )
        if (
          ((t = Ql), (l = t.child), (t.subtreeFlags & 1028) !== 0 && l !== null)
        )
          (l.return = t), (Ql = l);
        else
          for (; Ql !== null; ) {
            switch (((t = Ql), (n = t.alternate), (l = t.flags), t.tag)) {
              case 0:
                if (
                  (l & 4) !== 0 &&
                  ((l = t.updateQueue),
                  (l = l !== null ? l.events : null),
                  l !== null)
                )
                  for (e = 0; e < l.length; e++)
                    (u = l[e]), (u.ref.impl = u.nextImpl);
                break;
              case 11:
              case 15:
                break;
              case 1:
                if ((l & 1024) !== 0 && n !== null) {
                  (l = void 0),
                    (e = t),
                    (u = n.memoizedProps),
                    (n = n.memoizedState),
                    (a = e.stateNode);
                  try {
                    var C = Qe(e.type, u);
                    (l = a.getSnapshotBeforeUpdate(C, n)),
                      (a.__reactInternalSnapshotBeforeUpdate = l);
                  } catch (B) {
                    ml(e, e.return, B);
                  }
                }
                break;
              case 3:
                if ((l & 1024) !== 0) {
                  if (
                    ((l = t.stateNode.containerInfo), (e = l.nodeType), e === 9)
                  )
                    nf(l);
                  else if (e === 1)
                    switch (l.nodeName) {
                      case "HEAD":
                      case "HTML":
                      case "BODY":
                        nf(l);
                        break;
                      default:
                        l.textContent = "";
                    }
                }
                break;
              case 5:
              case 26:
              case 27:
              case 6:
              case 4:
              case 17:
                break;
              default:
                if ((l & 1024) !== 0) throw Error(h(163));
            }
            if (((l = t.sibling), l !== null)) {
              (l.return = t.return), (Ql = l);
              break;
            }
            Ql = t.return;
          }
    }
    function ho(l, t, e) {
      var a = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Wt(l, e), a & 4 && fu(5, e);
          break;
        case 1:
          if ((Wt(l, e), a & 4))
            if (((l = e.stateNode), t === null))
              try {
                l.componentDidMount();
              } catch (i) {
                ml(e, e.return, i);
              }
            else {
              var u = Qe(e.type, t.memoizedProps);
              t = t.memoizedState;
              try {
                l.componentDidUpdate(
                  u,
                  t,
                  l.__reactInternalSnapshotBeforeUpdate
                );
              } catch (i) {
                ml(e, e.return, i);
              }
            }
          a & 64 && co(e), a & 512 && su(e, e.return);
          break;
        case 3:
          if ((Wt(l, e), a & 64 && ((l = e.updateQueue), l !== null))) {
            if (((t = null), e.child !== null))
              switch (e.child.tag) {
                case 27:
                case 5:
                  t = e.child.stateNode;
                  break;
                case 1:
                  t = e.child.stateNode;
              }
            try {
              ks(l, t);
            } catch (i) {
              ml(e, e.return, i);
            }
          }
          break;
        case 27:
          t === null && a & 4 && mo(e);
        case 26:
        case 5:
          Wt(l, e), t === null && a & 4 && so(e), a & 512 && su(e, e.return);
          break;
        case 12:
          Wt(l, e);
          break;
        case 31:
          Wt(l, e), a & 4 && go(l, e);
          break;
        case 13:
          Wt(l, e),
            a & 4 && bo(l, e),
            a & 64 &&
              ((l = e.memoizedState),
              l !== null &&
                ((l = l.dehydrated),
                l !== null && ((e = Qh.bind(null, e)), cv(l, e))));
          break;
        case 22:
          if (((a = e.memoizedState !== null || Jt), !a)) {
            (t = (t !== null && t.memoizedState !== null) || Yl), (u = Jt);
            var n = Yl;
            (Jt = a),
              (Yl = t) && !n
                ? Ft(l, e, (e.subtreeFlags & 8772) !== 0)
                : Wt(l, e),
              (Jt = u),
              (Yl = n);
          }
          break;
        case 30:
          break;
        default:
          Wt(l, e);
      }
    }
    function vo(l) {
      var t = l.alternate;
      t !== null && ((l.alternate = null), vo(t)),
        (l.child = null),
        (l.deletions = null),
        (l.sibling = null),
        l.tag === 5 && ((t = l.stateNode), t !== null && di(t)),
        (l.stateNode = null),
        (l.return = null),
        (l.dependencies = null),
        (l.memoizedProps = null),
        (l.memoizedState = null),
        (l.pendingProps = null),
        (l.stateNode = null),
        (l.updateQueue = null);
    }
    var Al = null,
      et = !1;
    function wt(l, t, e) {
      for (e = e.child; e !== null; ) yo(l, t, e), (e = e.sibling);
    }
    function yo(l, t, e) {
      if (st && typeof st.onCommitFiberUnmount == "function")
        try {
          st.onCommitFiberUnmount(Ca, e);
        } catch {}
      switch (e.tag) {
        case 26:
          Yl || Ct(e, t),
            wt(l, t, e),
            e.memoizedState
              ? e.memoizedState.count--
              : e.stateNode && ((e = e.stateNode), e.parentNode.removeChild(e));
          break;
        case 27:
          Yl || Ct(e, t);
          var a = Al,
            u = et;
          be(e.type) && ((Al = e.stateNode), (et = !1)),
            wt(l, t, e),
            bu(e.stateNode),
            (Al = a),
            (et = u);
          break;
        case 5:
          Yl || Ct(e, t);
        case 6:
          if (
            ((a = Al),
            (u = et),
            (Al = null),
            wt(l, t, e),
            (Al = a),
            (et = u),
            Al !== null)
          )
            if (et)
              try {
                (Al.nodeType === 9
                  ? Al.body
                  : Al.nodeName === "HTML"
                  ? Al.ownerDocument.body
                  : Al
                ).removeChild(e.stateNode);
              } catch (n) {
                ml(e, t, n);
              }
            else
              try {
                Al.removeChild(e.stateNode);
              } catch (n) {
                ml(e, t, n);
              }
          break;
        case 18:
          Al !== null &&
            (et
              ? ((l = Al),
                fm(
                  l.nodeType === 9
                    ? l.body
                    : l.nodeName === "HTML"
                    ? l.ownerDocument.body
                    : l,
                  e.stateNode
                ),
                Ta(l))
              : fm(Al, e.stateNode));
          break;
        case 4:
          (a = Al),
            (u = et),
            (Al = e.stateNode.containerInfo),
            (et = !0),
            wt(l, t, e),
            (Al = a),
            (et = u);
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          oe(2, e, t), Yl || oe(4, e, t), wt(l, t, e);
          break;
        case 1:
          Yl ||
            (Ct(e, t),
            (a = e.stateNode),
            typeof a.componentWillUnmount == "function" && fo(e, t, a)),
            wt(l, t, e);
          break;
        case 21:
          wt(l, t, e);
          break;
        case 22:
          (Yl = (a = Yl) || e.memoizedState !== null), wt(l, t, e), (Yl = a);
          break;
        default:
          wt(l, t, e);
      }
    }
    function go(l, t) {
      if (
        t.memoizedState === null &&
        ((l = t.alternate), l !== null && ((l = l.memoizedState), l !== null))
      ) {
        l = l.dehydrated;
        try {
          Ta(l);
        } catch (e) {
          ml(t, t.return, e);
        }
      }
    }
    function bo(l, t) {
      if (
        t.memoizedState === null &&
        ((l = t.alternate),
        l !== null &&
          ((l = l.memoizedState),
          l !== null && ((l = l.dehydrated), l !== null)))
      )
        try {
          Ta(l);
        } catch (e) {
          ml(t, t.return, e);
        }
    }
    function Ch(l) {
      switch (l.tag) {
        case 31:
        case 13:
        case 19:
          var t = l.stateNode;
          return t === null && (t = l.stateNode = new ro()), t;
        case 22:
          return (
            (l = l.stateNode),
            (t = l._retryCache),
            t === null && (t = l._retryCache = new ro()),
            t
          );
        default:
          throw Error(h(435, l.tag));
      }
    }
    function Sn(l, t) {
      var e = Ch(l);
      t.forEach(function (a) {
        if (!e.has(a)) {
          e.add(a);
          var u = Zh.bind(null, l, a);
          a.then(u, u);
        }
      });
    }
    function at(l, t) {
      var e = t.deletions;
      if (e !== null)
        for (var a = 0; a < e.length; a++) {
          var u = e[a],
            n = l,
            i = t,
            c = i;
          l: for (; c !== null; ) {
            switch (c.tag) {
              case 27:
                if (be(c.type)) {
                  (Al = c.stateNode), (et = !1);
                  break l;
                }
                break;
              case 5:
                (Al = c.stateNode), (et = !1);
                break l;
              case 3:
              case 4:
                (Al = c.stateNode.containerInfo), (et = !0);
                break l;
            }
            c = c.return;
          }
          if (Al === null) throw Error(h(160));
          yo(n, i, u),
            (Al = null),
            (et = !1),
            (n = u.alternate),
            n !== null && (n.return = null),
            (u.return = null);
        }
      if (t.subtreeFlags & 13886)
        for (t = t.child; t !== null; ) So(t, l), (t = t.sibling);
    }
    var Mt = null;
    function So(l, t) {
      var e = l.alternate,
        a = l.flags;
      switch (l.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          at(t, l),
            ut(l),
            a & 4 && (oe(3, l, l.return), fu(3, l), oe(5, l, l.return));
          break;
        case 1:
          at(t, l),
            ut(l),
            a & 512 && (Yl || e === null || Ct(e, e.return)),
            a & 64 &&
              Jt &&
              ((l = l.updateQueue),
              l !== null &&
                ((a = l.callbacks),
                a !== null &&
                  ((e = l.shared.hiddenCallbacks),
                  (l.shared.hiddenCallbacks = e === null ? a : e.concat(a)))));
          break;
        case 26:
          var u = Mt;
          if (
            (at(t, l),
            ut(l),
            a & 512 && (Yl || e === null || Ct(e, e.return)),
            a & 4)
          ) {
            var n = e !== null ? e.memoizedState : null;
            if (((a = l.memoizedState), e === null))
              if (a === null)
                if (l.stateNode === null) {
                  l: {
                    (a = l.type),
                      (e = l.memoizedProps),
                      (u = u.ownerDocument || u);
                    t: switch (a) {
                      case "title":
                        (n = u.getElementsByTagName("title")[0]),
                          (!n ||
                            n[qa] ||
                            n[Vl] ||
                            n.namespaceURI === "http://www.w3.org/2000/svg" ||
                            n.hasAttribute("itemprop")) &&
                            ((n = u.createElement(a)),
                            u.head.insertBefore(
                              n,
                              u.querySelector("head > title")
                            )),
                          wl(n, a, e),
                          (n[Vl] = l),
                          Xl(n),
                          (a = n);
                        break l;
                      case "link":
                        var i = Sm("link", "href", u).get(a + (e.href || ""));
                        if (i) {
                          for (var c = 0; c < i.length; c++)
                            if (
                              ((n = i[c]),
                              n.getAttribute("href") ===
                                (e.href == null || e.href === ""
                                  ? null
                                  : e.href) &&
                                n.getAttribute("rel") ===
                                  (e.rel == null ? null : e.rel) &&
                                n.getAttribute("title") ===
                                  (e.title == null ? null : e.title) &&
                                n.getAttribute("crossorigin") ===
                                  (e.crossOrigin == null
                                    ? null
                                    : e.crossOrigin))
                            ) {
                              i.splice(c, 1);
                              break t;
                            }
                        }
                        (n = u.createElement(a)),
                          wl(n, a, e),
                          u.head.appendChild(n);
                        break;
                      case "meta":
                        if (
                          (i = Sm("meta", "content", u).get(
                            a + (e.content || "")
                          ))
                        ) {
                          for (c = 0; c < i.length; c++)
                            if (
                              ((n = i[c]),
                              n.getAttribute("content") ===
                                (e.content == null ? null : "" + e.content) &&
                                n.getAttribute("name") ===
                                  (e.name == null ? null : e.name) &&
                                n.getAttribute("property") ===
                                  (e.property == null ? null : e.property) &&
                                n.getAttribute("http-equiv") ===
                                  (e.httpEquiv == null ? null : e.httpEquiv) &&
                                n.getAttribute("charset") ===
                                  (e.charSet == null ? null : e.charSet))
                            ) {
                              i.splice(c, 1);
                              break t;
                            }
                        }
                        (n = u.createElement(a)),
                          wl(n, a, e),
                          u.head.appendChild(n);
                        break;
                      default:
                        throw Error(h(468, a));
                    }
                    (n[Vl] = l), Xl(n), (a = n);
                  }
                  l.stateNode = a;
                } else Nm(u, l.type, l.stateNode);
              else l.stateNode = bm(u, a, l.memoizedProps);
            else
              n !== a
                ? (n === null
                    ? e.stateNode !== null &&
                      ((e = e.stateNode), e.parentNode.removeChild(e))
                    : n.count--,
                  a === null
                    ? Nm(u, l.type, l.stateNode)
                    : bm(u, a, l.memoizedProps))
                : a === null &&
                  l.stateNode !== null &&
                  Dc(l, l.memoizedProps, e.memoizedProps);
          }
          break;
        case 27:
          at(t, l),
            ut(l),
            a & 512 && (Yl || e === null || Ct(e, e.return)),
            e !== null && a & 4 && Dc(l, l.memoizedProps, e.memoizedProps);
          break;
        case 5:
          if (
            (at(t, l),
            ut(l),
            a & 512 && (Yl || e === null || Ct(e, e.return)),
            l.flags & 32)
          ) {
            u = l.stateNode;
            try {
              $e(u, "");
            } catch (C) {
              ml(l, l.return, C);
            }
          }
          a & 4 &&
            l.stateNode != null &&
            ((u = l.memoizedProps), Dc(l, u, e !== null ? e.memoizedProps : u)),
            a & 1024 && (Rc = !0);
          break;
        case 6:
          if ((at(t, l), ut(l), a & 4)) {
            if (l.stateNode === null) throw Error(h(162));
            (a = l.memoizedProps), (e = l.stateNode);
            try {
              e.nodeValue = a;
            } catch (C) {
              ml(l, l.return, C);
            }
          }
          break;
        case 3:
          if (
            ((Hn = null),
            (u = Mt),
            (Mt = Cn(t.containerInfo)),
            at(t, l),
            (Mt = u),
            ut(l),
            a & 4 && e !== null && e.memoizedState.isDehydrated)
          )
            try {
              Ta(t.containerInfo);
            } catch (C) {
              ml(l, l.return, C);
            }
          Rc && ((Rc = !1), No(l));
          break;
        case 4:
          (a = Mt),
            (Mt = Cn(l.stateNode.containerInfo)),
            at(t, l),
            ut(l),
            (Mt = a);
          break;
        case 12:
          at(t, l), ut(l);
          break;
        case 31:
          at(t, l),
            ut(l),
            a & 4 &&
              ((a = l.updateQueue),
              a !== null && ((l.updateQueue = null), Sn(l, a)));
          break;
        case 13:
          at(t, l),
            ut(l),
            l.child.flags & 8192 &&
              (l.memoizedState !== null) !=
                (e !== null && e.memoizedState !== null) &&
              (pn = ft()),
            a & 4 &&
              ((a = l.updateQueue),
              a !== null && ((l.updateQueue = null), Sn(l, a)));
          break;
        case 22:
          u = l.memoizedState !== null;
          var s = e !== null && e.memoizedState !== null,
            y = Jt,
            j = Yl;
          if (
            ((Jt = y || u),
            (Yl = j || s),
            at(t, l),
            (Yl = j),
            (Jt = y),
            ut(l),
            a & 8192)
          )
            l: for (
              t = l.stateNode,
                t._visibility = u ? t._visibility & -2 : t._visibility | 1,
                u && (e === null || s || Jt || Yl || Ze(l)),
                e = null,
                t = l;
              ;

            ) {
              if (t.tag === 5 || t.tag === 26) {
                if (e === null) {
                  s = e = t;
                  try {
                    if (((n = s.stateNode), u))
                      (i = n.style),
                        typeof i.setProperty == "function"
                          ? i.setProperty("display", "none", "important")
                          : (i.display = "none");
                    else {
                      c = s.stateNode;
                      var x = s.memoizedProps.style,
                        g =
                          x != null && x.hasOwnProperty("display")
                            ? x.display
                            : null;
                      c.style.display =
                        g == null || typeof g == "boolean"
                          ? ""
                          : ("" + g).trim();
                    }
                  } catch (C) {
                    ml(s, s.return, C);
                  }
                }
              } else if (t.tag === 6) {
                if (e === null) {
                  s = t;
                  try {
                    s.stateNode.nodeValue = u ? "" : s.memoizedProps;
                  } catch (C) {
                    ml(s, s.return, C);
                  }
                }
              } else if (t.tag === 18) {
                if (e === null) {
                  s = t;
                  try {
                    var S = s.stateNode;
                    u ? sm(S, !0) : sm(s.stateNode, !1);
                  } catch (C) {
                    ml(s, s.return, C);
                  }
                }
              } else if (
                ((t.tag !== 22 && t.tag !== 23) ||
                  t.memoizedState === null ||
                  t === l) &&
                t.child !== null
              ) {
                (t.child.return = t), (t = t.child);
                continue;
              }
              if (t === l) break l;
              for (; t.sibling === null; ) {
                if (t.return === null || t.return === l) break l;
                e === t && (e = null), (t = t.return);
              }
              e === t && (e = null),
                (t.sibling.return = t.return),
                (t = t.sibling);
            }
          a & 4 &&
            ((a = l.updateQueue),
            a !== null &&
              ((e = a.retryQueue),
              e !== null && ((a.retryQueue = null), Sn(l, e))));
          break;
        case 19:
          at(t, l),
            ut(l),
            a & 4 &&
              ((a = l.updateQueue),
              a !== null && ((l.updateQueue = null), Sn(l, a)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          at(t, l), ut(l);
      }
    }
    function ut(l) {
      var t = l.flags;
      if (t & 2) {
        try {
          for (var e, a = l.return; a !== null; ) {
            if (oo(a)) {
              e = a;
              break;
            }
            a = a.return;
          }
          if (e == null) throw Error(h(160));
          switch (e.tag) {
            case 27:
              var u = e.stateNode,
                n = Uc(l);
              bn(l, n, u);
              break;
            case 5:
              var i = e.stateNode;
              e.flags & 32 && ($e(i, ""), (e.flags &= -33));
              var c = Uc(l);
              bn(l, c, i);
              break;
            case 3:
            case 4:
              var s = e.stateNode.containerInfo,
                y = Uc(l);
              Cc(l, y, s);
              break;
            default:
              throw Error(h(161));
          }
        } catch (j) {
          ml(l, l.return, j);
        }
        l.flags &= -3;
      }
      t & 4096 && (l.flags &= -4097);
    }
    function No(l) {
      if (l.subtreeFlags & 1024)
        for (l = l.child; l !== null; ) {
          var t = l;
          No(t),
            t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
            (l = l.sibling);
        }
    }
    function Wt(l, t) {
      if (t.subtreeFlags & 8772)
        for (t = t.child; t !== null; ) ho(l, t.alternate, t), (t = t.sibling);
    }
    function Ze(l) {
      for (l = l.child; l !== null; ) {
        var t = l;
        switch (t.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            oe(4, t, t.return), Ze(t);
            break;
          case 1:
            Ct(t, t.return);
            var e = t.stateNode;
            typeof e.componentWillUnmount == "function" && fo(t, t.return, e),
              Ze(t);
            break;
          case 27:
            bu(t.stateNode);
          case 26:
          case 5:
            Ct(t, t.return), Ze(t);
            break;
          case 22:
            t.memoizedState === null && Ze(t);
            break;
          case 30:
            Ze(t);
            break;
          default:
            Ze(t);
        }
        l = l.sibling;
      }
    }
    function Ft(l, t, e) {
      for (e = e && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
        var a = t.alternate,
          u = l,
          n = t,
          i = n.flags;
        switch (n.tag) {
          case 0:
          case 11:
          case 15:
            Ft(u, n, e), fu(4, n);
            break;
          case 1:
            if (
              (Ft(u, n, e),
              (a = n),
              (u = a.stateNode),
              typeof u.componentDidMount == "function")
            )
              try {
                u.componentDidMount();
              } catch (y) {
                ml(a, a.return, y);
              }
            if (((a = n), (u = a.updateQueue), u !== null)) {
              var c = a.stateNode;
              try {
                var s = u.shared.hiddenCallbacks;
                if (s !== null)
                  for (
                    u.shared.hiddenCallbacks = null, u = 0;
                    u < s.length;
                    u++
                  )
                    $s(s[u], c);
              } catch (y) {
                ml(a, a.return, y);
              }
            }
            e && i & 64 && co(n), su(n, n.return);
            break;
          case 27:
            mo(n);
          case 26:
          case 5:
            Ft(u, n, e), e && a === null && i & 4 && so(n), su(n, n.return);
            break;
          case 12:
            Ft(u, n, e);
            break;
          case 31:
            Ft(u, n, e), e && i & 4 && go(u, n);
            break;
          case 13:
            Ft(u, n, e), e && i & 4 && bo(u, n);
            break;
          case 22:
            n.memoizedState === null && Ft(u, n, e), su(n, n.return);
            break;
          case 30:
            break;
          default:
            Ft(u, n, e);
        }
        t = t.sibling;
      }
    }
    function Hc(l, t) {
      var e = null;
      l !== null &&
        l.memoizedState !== null &&
        l.memoizedState.cachePool !== null &&
        (e = l.memoizedState.cachePool.pool),
        (l = null),
        t.memoizedState !== null &&
          t.memoizedState.cachePool !== null &&
          (l = t.memoizedState.cachePool.pool),
        l !== e && (l != null && l.refCount++, e != null && Fa(e));
    }
    function qc(l, t) {
      (l = null),
        t.alternate !== null && (l = t.alternate.memoizedState.cache),
        (t = t.memoizedState.cache),
        t !== l && (t.refCount++, l != null && Fa(l));
    }
    function Ot(l, t, e, a) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) po(l, t, e, a), (t = t.sibling);
    }
    function po(l, t, e, a) {
      var u = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          Ot(l, t, e, a), u & 2048 && fu(9, t);
          break;
        case 1:
          Ot(l, t, e, a);
          break;
        case 3:
          Ot(l, t, e, a),
            u & 2048 &&
              ((l = null),
              t.alternate !== null && (l = t.alternate.memoizedState.cache),
              (t = t.memoizedState.cache),
              t !== l && (t.refCount++, l != null && Fa(l)));
          break;
        case 12:
          if (u & 2048) {
            Ot(l, t, e, a), (l = t.stateNode);
            try {
              var n = t.memoizedProps,
                i = n.id,
                c = n.onPostCommit;
              typeof c == "function" &&
                c(
                  i,
                  t.alternate === null ? "mount" : "update",
                  l.passiveEffectDuration,
                  -0
                );
            } catch (s) {
              ml(t, t.return, s);
            }
          } else Ot(l, t, e, a);
          break;
        case 31:
          Ot(l, t, e, a);
          break;
        case 13:
          Ot(l, t, e, a);
          break;
        case 23:
          break;
        case 22:
          (n = t.stateNode),
            (i = t.alternate),
            t.memoizedState !== null
              ? n._visibility & 2
                ? Ot(l, t, e, a)
                : du(l, t)
              : n._visibility & 2
              ? Ot(l, t, e, a)
              : ((n._visibility |= 2),
                ya(l, t, e, a, (t.subtreeFlags & 10256) !== 0 || !1)),
            u & 2048 && Hc(i, t);
          break;
        case 24:
          Ot(l, t, e, a), u & 2048 && qc(t.alternate, t);
          break;
        default:
          Ot(l, t, e, a);
      }
    }
    function ya(l, t, e, a, u) {
      for (
        u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child;
        t !== null;

      ) {
        var n = l,
          i = t,
          c = e,
          s = a,
          y = i.flags;
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            ya(n, i, c, s, u), fu(8, i);
            break;
          case 23:
            break;
          case 22:
            var j = i.stateNode;
            i.memoizedState !== null
              ? j._visibility & 2
                ? ya(n, i, c, s, u)
                : du(n, i)
              : ((j._visibility |= 2), ya(n, i, c, s, u)),
              u && y & 2048 && Hc(i.alternate, i);
            break;
          case 24:
            ya(n, i, c, s, u), u && y & 2048 && qc(i.alternate, i);
            break;
          default:
            ya(n, i, c, s, u);
        }
        t = t.sibling;
      }
    }
    function du(l, t) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) {
          var e = l,
            a = t,
            u = a.flags;
          switch (a.tag) {
            case 22:
              du(e, a), u & 2048 && Hc(a.alternate, a);
              break;
            case 24:
              du(e, a), u & 2048 && qc(a.alternate, a);
              break;
            default:
              du(e, a);
          }
          t = t.sibling;
        }
    }
    var ou = 8192;
    function ga(l, t, e) {
      if (l.subtreeFlags & ou)
        for (l = l.child; l !== null; ) Ao(l, t, e), (l = l.sibling);
    }
    function Ao(l, t, e) {
      switch (l.tag) {
        case 26:
          ga(l, t, e),
            l.flags & ou &&
              l.memoizedState !== null &&
              Sv(e, Mt, l.memoizedState, l.memoizedProps);
          break;
        case 5:
          ga(l, t, e);
          break;
        case 3:
        case 4:
          var a = Mt;
          (Mt = Cn(l.stateNode.containerInfo)), ga(l, t, e), (Mt = a);
          break;
        case 22:
          l.memoizedState === null &&
            ((a = l.alternate),
            a !== null && a.memoizedState !== null
              ? ((a = ou), (ou = 16777216), ga(l, t, e), (ou = a))
              : ga(l, t, e));
          break;
        default:
          ga(l, t, e);
      }
    }
    function jo(l) {
      var t = l.alternate;
      if (t !== null && ((l = t.child), l !== null)) {
        t.child = null;
        do (t = l.sibling), (l.sibling = null), (l = t);
        while (l !== null);
      }
    }
    function mu(l) {
      var t = l.deletions;
      if ((l.flags & 16) !== 0) {
        if (t !== null)
          for (var e = 0; e < t.length; e++) {
            var a = t[e];
            (Ql = a), zo(a, l);
          }
        jo(l);
      }
      if (l.subtreeFlags & 10256)
        for (l = l.child; l !== null; ) Eo(l), (l = l.sibling);
    }
    function Eo(l) {
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          mu(l), l.flags & 2048 && oe(9, l, l.return);
          break;
        case 3:
          mu(l);
          break;
        case 12:
          mu(l);
          break;
        case 22:
          var t = l.stateNode;
          l.memoizedState !== null &&
          t._visibility & 2 &&
          (l.return === null || l.return.tag !== 13)
            ? ((t._visibility &= -3), Nn(l))
            : mu(l);
          break;
        default:
          mu(l);
      }
    }
    function Nn(l) {
      var t = l.deletions;
      if ((l.flags & 16) !== 0) {
        if (t !== null)
          for (var e = 0; e < t.length; e++) {
            var a = t[e];
            (Ql = a), zo(a, l);
          }
        jo(l);
      }
      for (l = l.child; l !== null; ) {
        switch (((t = l), t.tag)) {
          case 0:
          case 11:
          case 15:
            oe(8, t, t.return), Nn(t);
            break;
          case 22:
            (e = t.stateNode),
              e._visibility & 2 && ((e._visibility &= -3), Nn(t));
            break;
          default:
            Nn(t);
        }
        l = l.sibling;
      }
    }
    function zo(l, t) {
      for (; Ql !== null; ) {
        var e = Ql;
        switch (e.tag) {
          case 0:
          case 11:
          case 15:
            oe(8, e, t);
            break;
          case 23:
          case 22:
            if (
              e.memoizedState !== null &&
              e.memoizedState.cachePool !== null
            ) {
              var a = e.memoizedState.cachePool.pool;
              a != null && a.refCount++;
            }
            break;
          case 24:
            Fa(e.memoizedState.cache);
        }
        if (((a = e.child), a !== null)) (a.return = e), (Ql = a);
        else
          l: for (e = l; Ql !== null; ) {
            a = Ql;
            var u = a.sibling,
              n = a.return;
            if ((vo(a), a === e)) {
              Ql = null;
              break l;
            }
            if (u !== null) {
              (u.return = n), (Ql = u);
              break l;
            }
            Ql = n;
          }
      }
    }
    var Rh = {
        getCacheForType: function (l) {
          var t = Kl(Rl),
            e = t.data.get(l);
          return e === void 0 && ((e = l()), t.data.set(l, e)), e;
        },
        cacheSignal: function () {
          return Kl(Rl).controller.signal;
        },
      },
      Hh = typeof WeakMap == "function" ? WeakMap : Map,
      cl = 0,
      bl = null,
      F = null,
      P = 0,
      ol = 0,
      vt = null,
      me = !1,
      ba = !1,
      Yc = !1,
      $t = 0,
      Tl = 0,
      re = 0,
      Ve = 0,
      Bc = 0,
      yt = 0,
      Sa = 0,
      ru = null,
      nt = null,
      Gc = !1,
      pn = 0,
      xo = 0,
      An = 1 / 0,
      jn = null,
      he = null,
      Bl = 0,
      ve = null,
      Na = null,
      kt = 0,
      Xc = 0,
      Qc = null,
      To = null,
      hu = 0,
      Zc = null;
    function gt() {
      return (cl & 2) !== 0 && P !== 0 ? P & -P : A.T !== null ? Wc() : Zf();
    }
    function _o() {
      if (yt === 0)
        if ((P & 536870912) === 0 || el) {
          var l = Ou;
          (Ou <<= 1), (Ou & 3932160) === 0 && (Ou = 262144), (yt = l);
        } else yt = 536870912;
      return (l = rt.current), l !== null && (l.flags |= 32), yt;
    }
    function it(l, t, e) {
      ((l === bl && (ol === 2 || ol === 9)) ||
        l.cancelPendingCommit !== null) &&
        (pa(l, 0), ye(l, P, yt, !1)),
        Ha(l, e),
        ((cl & 2) === 0 || l !== bl) &&
          (l === bl &&
            ((cl & 2) === 0 && (Ve |= e), Tl === 4 && ye(l, P, yt, !1)),
          Rt(l));
    }
    function Mo(l, t, e) {
      if ((cl & 6) !== 0) throw Error(h(327));
      var a = (!e && (t & 127) === 0 && (t & l.expiredLanes) === 0) || Ra(l, t),
        u = a ? Bh(l, t) : Lc(l, t, !0),
        n = a;
      do {
        if (u === 0) {
          ba && !a && ye(l, t, 0, !1);
          break;
        } else {
          if (((e = l.current.alternate), n && !qh(e))) {
            (u = Lc(l, t, !1)), (n = !1);
            continue;
          }
          if (u === 2) {
            if (((n = t), l.errorRecoveryDisabledLanes & n)) var i = 0;
            else
              (i = l.pendingLanes & -536870913),
                (i = i !== 0 ? i : i & 536870912 ? 536870912 : 0);
            if (i !== 0) {
              t = i;
              l: {
                var c = l;
                u = ru;
                var s = c.current.memoizedState.isDehydrated;
                if (
                  (s && (pa(c, i).flags |= 256), (i = Lc(c, i, !1)), i !== 2)
                ) {
                  if (Yc && !s) {
                    (c.errorRecoveryDisabledLanes |= n), (Ve |= n), (u = 4);
                    break l;
                  }
                  (n = nt),
                    (nt = u),
                    n !== null &&
                      (nt === null ? (nt = n) : nt.push.apply(nt, n));
                }
                u = i;
              }
              if (((n = !1), u !== 2)) continue;
            }
          }
          if (u === 1) {
            pa(l, 0), ye(l, t, 0, !0);
            break;
          }
          l: {
            switch (((a = l), (n = u), n)) {
              case 0:
              case 1:
                throw Error(h(345));
              case 4:
                if ((t & 4194048) !== t) break;
              case 6:
                ye(a, t, yt, !me);
                break l;
              case 2:
                nt = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(h(329));
            }
            if ((t & 62914560) === t && ((u = pn + 300 - ft()), 10 < u)) {
              if ((ye(a, t, yt, !me), Uu(a, 0, !0) !== 0)) break l;
              (kt = t),
                (a.timeoutHandle = im(
                  Oo.bind(
                    null,
                    a,
                    e,
                    nt,
                    jn,
                    Gc,
                    t,
                    yt,
                    Ve,
                    Sa,
                    me,
                    n,
                    "Throttled",
                    -0,
                    0
                  ),
                  u
                ));
              break l;
            }
            Oo(a, e, nt, jn, Gc, t, yt, Ve, Sa, me, n, null, -0, 0);
          }
        }
        break;
      } while (!0);
      Rt(l);
    }
    function Oo(l, t, e, a, u, n, i, c, s, y, j, x, g, S) {
      if (
        ((l.timeoutHandle = -1),
        (x = t.subtreeFlags),
        x & 8192 || (x & 16785408) === 16785408)
      ) {
        (x = {
          stylesheets: null,
          count: 0,
          imgCount: 0,
          imgBytes: 0,
          suspenseyImages: [],
          waitingForImages: !0,
          waitingForViewTransition: !1,
          unsuspend: qt,
        }),
          Ao(t, n, x);
        var C =
          (n & 62914560) === n
            ? pn - ft()
            : (n & 4194048) === n
            ? xo - ft()
            : 0;
        if (((C = Nv(x, C)), C !== null)) {
          (kt = n),
            (l.cancelPendingCommit = C(
              Bo.bind(null, l, t, n, e, a, u, i, c, s, j, x, null, g, S)
            )),
            ye(l, n, i, !y);
          return;
        }
      }
      Bo(l, t, n, e, a, u, i, c, s);
    }
    function qh(l) {
      for (var t = l; ; ) {
        var e = t.tag;
        if (
          (e === 0 || e === 11 || e === 15) &&
          t.flags & 16384 &&
          ((e = t.updateQueue), e !== null && ((e = e.stores), e !== null))
        )
          for (var a = 0; a < e.length; a++) {
            var u = e[a],
              n = u.getSnapshot;
            u = u.value;
            try {
              if (!ot(n(), u)) return !1;
            } catch {
              return !1;
            }
          }
        if (((e = t.child), t.subtreeFlags & 16384 && e !== null))
          (e.return = t), (t = e);
        else {
          if (t === l) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === l) return !0;
            t = t.return;
          }
          (t.sibling.return = t.return), (t = t.sibling);
        }
      }
      return !0;
    }
    function ye(l, t, e, a) {
      (t &= ~Bc),
        (t &= ~Ve),
        (l.suspendedLanes |= t),
        (l.pingedLanes &= ~t),
        a && (l.warmLanes |= t),
        (a = l.expirationTimes);
      for (var u = t; 0 < u; ) {
        var n = 31 - dt(u),
          i = 1 << n;
        (a[n] = -1), (u &= ~i);
      }
      e !== 0 && Gf(l, e, t);
    }
    function En() {
      return (cl & 6) === 0 ? (vu(0), !1) : !0;
    }
    function Vc() {
      if (F !== null) {
        if (ol === 0) var l = F.return;
        else (l = F), (Xt = Re = null), nc(l), (oa = null), (ka = 0), (l = F);
        for (; l !== null; ) io(l.alternate, l), (l = l.return);
        F = null;
      }
    }
    function pa(l, t) {
      var e = l.timeoutHandle;
      e !== -1 && ((l.timeoutHandle = -1), ev(e)),
        (e = l.cancelPendingCommit),
        e !== null && ((l.cancelPendingCommit = null), e()),
        (kt = 0),
        Vc(),
        (bl = l),
        (F = e = Bt(l.current, null)),
        (P = t),
        (ol = 0),
        (vt = null),
        (me = !1),
        (ba = Ra(l, t)),
        (Yc = !1),
        (Sa = yt = Bc = Ve = re = Tl = 0),
        (nt = ru = null),
        (Gc = !1),
        (t & 8) !== 0 && (t |= t & 32);
      var a = l.entangledLanes;
      if (a !== 0)
        for (l = l.entanglements, a &= t; 0 < a; ) {
          var u = 31 - dt(a),
            n = 1 << u;
          (t |= l[u]), (a &= ~n);
        }
      return ($t = t), Lu(), e;
    }
    function Do(l, t) {
      (L = null),
        (A.H = nu),
        t === da || t === Iu
          ? ((t = Js()), (ol = 3))
          : t === wi
          ? ((t = Js()), (ol = 4))
          : (ol =
              t === pc
                ? 8
                : t !== null &&
                  typeof t == "object" &&
                  typeof t.then == "function"
                ? 6
                : 1),
        (vt = t),
        F === null && ((Tl = 1), rn(l, pt(t, l.current)));
    }
    function Uo() {
      var l = rt.current;
      return l === null
        ? !0
        : (P & 4194048) === P
        ? zt === null
        : (P & 62914560) === P || (P & 536870912) !== 0
        ? l === zt
        : !1;
    }
    function Co() {
      var l = A.H;
      return (A.H = nu), l === null ? nu : l;
    }
    function Ro() {
      var l = A.A;
      return (A.A = Rh), l;
    }
    function zn() {
      (Tl = 4),
        me || ((P & 4194048) !== P && rt.current !== null) || (ba = !0),
        ((re & 134217727) === 0 && (Ve & 134217727) === 0) ||
          bl === null ||
          ye(bl, P, yt, !1);
    }
    function Lc(l, t, e) {
      var a = cl;
      cl |= 2;
      var u = Co(),
        n = Ro();
      (bl !== l || P !== t) && ((jn = null), pa(l, t)), (t = !1);
      var i = Tl;
      l: do
        try {
          if (ol !== 0 && F !== null) {
            var c = F,
              s = vt;
            switch (ol) {
              case 8:
                Vc(), (i = 6);
                break l;
              case 3:
              case 2:
              case 9:
              case 6:
                rt.current === null && (t = !0);
                var y = ol;
                if (((ol = 0), (vt = null), Aa(l, c, s, y), e && ba)) {
                  i = 0;
                  break l;
                }
                break;
              default:
                (y = ol), (ol = 0), (vt = null), Aa(l, c, s, y);
            }
          }
          Yh(), (i = Tl);
          break;
        } catch (j) {
          Do(l, j);
        }
      while (!0);
      return (
        t && l.shellSuspendCounter++,
        (Xt = Re = null),
        (cl = a),
        (A.H = u),
        (A.A = n),
        F === null && ((bl = null), (P = 0), Lu()),
        i
      );
    }
    function Yh() {
      for (; F !== null; ) Ho(F);
    }
    function Bh(l, t) {
      var e = cl;
      cl |= 2;
      var a = Co(),
        u = Ro();
      bl !== l || P !== t
        ? ((jn = null), (An = ft() + 500), pa(l, t))
        : (ba = Ra(l, t));
      l: do
        try {
          if (ol !== 0 && F !== null) {
            t = F;
            var n = vt;
            t: switch (ol) {
              case 1:
                (ol = 0), (vt = null), Aa(l, t, n, 1);
                break;
              case 2:
              case 9:
                if (Ls(n)) {
                  (ol = 0), (vt = null), qo(t);
                  break;
                }
                (t = function () {
                  (ol !== 2 && ol !== 9) || bl !== l || (ol = 7), Rt(l);
                }),
                  n.then(t, t);
                break l;
              case 3:
                ol = 7;
                break l;
              case 4:
                ol = 5;
                break l;
              case 7:
                Ls(n)
                  ? ((ol = 0), (vt = null), qo(t))
                  : ((ol = 0), (vt = null), Aa(l, t, n, 7));
                break;
              case 5:
                var i = null;
                switch (F.tag) {
                  case 26:
                    i = F.memoizedState;
                  case 5:
                  case 27:
                    var c = F;
                    if (i ? pm(i) : c.stateNode.complete) {
                      (ol = 0), (vt = null);
                      var s = c.sibling;
                      if (s !== null) F = s;
                      else {
                        var y = c.return;
                        y !== null ? ((F = y), xn(y)) : (F = null);
                      }
                      break t;
                    }
                }
                (ol = 0), (vt = null), Aa(l, t, n, 5);
                break;
              case 6:
                (ol = 0), (vt = null), Aa(l, t, n, 6);
                break;
              case 8:
                Vc(), (Tl = 6);
                break l;
              default:
                throw Error(h(462));
            }
          }
          Gh();
          break;
        } catch (j) {
          Do(l, j);
        }
      while (!0);
      return (
        (Xt = Re = null),
        (A.H = a),
        (A.A = u),
        (cl = e),
        F !== null ? 0 : ((bl = null), (P = 0), Lu(), Tl)
      );
    }
    function Gh() {
      for (; F !== null && !fr(); ) Ho(F);
    }
    function Ho(l) {
      var t = uo(l.alternate, l, $t);
      (l.memoizedProps = l.pendingProps), t === null ? xn(l) : (F = t);
    }
    function qo(l) {
      var t = l,
        e = t.alternate;
      switch (t.tag) {
        case 15:
        case 0:
          t = Id(e, t, t.pendingProps, t.type, void 0, P);
          break;
        case 11:
          t = Id(e, t, t.pendingProps, t.type.render, t.ref, P);
          break;
        case 5:
          nc(t);
        default:
          io(e, t), (t = F = Cs(t, $t)), (t = uo(e, t, $t));
      }
      (l.memoizedProps = l.pendingProps), t === null ? xn(l) : (F = t);
    }
    function Aa(l, t, e, a) {
      (Xt = Re = null), nc(t), (oa = null), (ka = 0);
      var u = t.return;
      try {
        if (Th(l, u, t, e, P)) {
          (Tl = 1), rn(l, pt(e, l.current)), (F = null);
          return;
        }
      } catch (n) {
        if (u !== null) throw ((F = u), n);
        (Tl = 1), rn(l, pt(e, l.current)), (F = null);
        return;
      }
      t.flags & 32768
        ? (el || a === 1
            ? (l = !0)
            : ba || (P & 536870912) !== 0
            ? (l = !1)
            : ((me = l = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = rt.current),
                a !== null && a.tag === 13 && (a.flags |= 16384))),
          Yo(t, l))
        : xn(t);
    }
    function xn(l) {
      var t = l;
      do {
        if ((t.flags & 32768) !== 0) {
          Yo(t, me);
          return;
        }
        l = t.return;
        var e = Oh(t.alternate, t, $t);
        if (e !== null) {
          F = e;
          return;
        }
        if (((t = t.sibling), t !== null)) {
          F = t;
          return;
        }
        F = t = l;
      } while (t !== null);
      Tl === 0 && (Tl = 5);
    }
    function Yo(l, t) {
      do {
        var e = Dh(l.alternate, l);
        if (e !== null) {
          (e.flags &= 32767), (F = e);
          return;
        }
        if (
          ((e = l.return),
          e !== null &&
            ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null)),
          !t && ((l = l.sibling), l !== null))
        ) {
          F = l;
          return;
        }
        F = l = e;
      } while (l !== null);
      (Tl = 6), (F = null);
    }
    function Bo(l, t, e, a, u, n, i, c, s) {
      l.cancelPendingCommit = null;
      do Tn();
      while (Bl !== 0);
      if ((cl & 6) !== 0) throw Error(h(327));
      if (t !== null) {
        if (t === l.current) throw Error(h(177));
        if (
          ((n = t.lanes | t.childLanes),
          (n |= Ui),
          br(l, e, n, i, c, s),
          l === bl && ((F = bl = null), (P = 0)),
          (Na = t),
          (ve = l),
          (kt = e),
          (Xc = n),
          (Qc = u),
          (To = a),
          (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
            ? ((l.callbackNode = null),
              (l.callbackPriority = 0),
              Vh(_u, function () {
                return Vo(), null;
              }))
            : ((l.callbackNode = null), (l.callbackPriority = 0)),
          (a = (t.flags & 13878) !== 0),
          (t.subtreeFlags & 13878) !== 0 || a)
        ) {
          (a = A.T), (A.T = null), (u = T.p), (T.p = 2), (i = cl), (cl |= 4);
          try {
            Uh(l, t, e);
          } finally {
            (cl = i), (T.p = u), (A.T = a);
          }
        }
        (Bl = 1), Go(), Xo(), Qo();
      }
    }
    function Go() {
      if (Bl === 1) {
        Bl = 0;
        var l = ve,
          t = Na,
          e = (t.flags & 13878) !== 0;
        if ((t.subtreeFlags & 13878) !== 0 || e) {
          (e = A.T), (A.T = null);
          var a = T.p;
          T.p = 2;
          var u = cl;
          cl |= 4;
          try {
            So(t, l);
            var n = ef,
              i = Es(l.containerInfo),
              c = n.focusedElem,
              s = n.selectionRange;
            if (
              i !== c &&
              c &&
              c.ownerDocument &&
              js(c.ownerDocument.documentElement, c)
            ) {
              if (s !== null && Ti(c)) {
                var y = s.start,
                  j = s.end;
                if ((j === void 0 && (j = y), "selectionStart" in c))
                  (c.selectionStart = y),
                    (c.selectionEnd = Math.min(j, c.value.length));
                else {
                  var x = c.ownerDocument || document,
                    g = (x && x.defaultView) || window;
                  if (g.getSelection) {
                    var S = g.getSelection(),
                      C = c.textContent.length,
                      B = Math.min(s.start, C),
                      gl = s.end === void 0 ? B : Math.min(s.end, C);
                    !S.extend && B > gl && ((i = gl), (gl = B), (B = i));
                    var r = As(c, B),
                      d = As(c, gl);
                    if (
                      r &&
                      d &&
                      (S.rangeCount !== 1 ||
                        S.anchorNode !== r.node ||
                        S.anchorOffset !== r.offset ||
                        S.focusNode !== d.node ||
                        S.focusOffset !== d.offset)
                    ) {
                      var v = x.createRange();
                      v.setStart(r.node, r.offset),
                        S.removeAllRanges(),
                        B > gl
                          ? (S.addRange(v), S.extend(d.node, d.offset))
                          : (v.setEnd(d.node, d.offset), S.addRange(v));
                    }
                  }
                }
              }
              for (x = [], S = c; (S = S.parentNode); )
                S.nodeType === 1 &&
                  x.push({ element: S, left: S.scrollLeft, top: S.scrollTop });
              for (
                typeof c.focus == "function" && c.focus(), c = 0;
                c < x.length;
                c++
              ) {
                var E = x[c];
                (E.element.scrollLeft = E.left), (E.element.scrollTop = E.top);
              }
            }
            (Gn = !!tf), (ef = tf = null);
          } finally {
            (cl = u), (T.p = a), (A.T = e);
          }
        }
        (l.current = t), (Bl = 2);
      }
    }
    function Xo() {
      if (Bl === 2) {
        Bl = 0;
        var l = ve,
          t = Na,
          e = (t.flags & 8772) !== 0;
        if ((t.subtreeFlags & 8772) !== 0 || e) {
          (e = A.T), (A.T = null);
          var a = T.p;
          T.p = 2;
          var u = cl;
          cl |= 4;
          try {
            ho(l, t.alternate, t);
          } finally {
            (cl = u), (T.p = a), (A.T = e);
          }
        }
        Bl = 3;
      }
    }
    function Qo() {
      if (Bl === 4 || Bl === 3) {
        (Bl = 0), sr();
        var l = ve,
          t = Na,
          e = kt,
          a = To;
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? (Bl = 5)
          : ((Bl = 0), (Na = ve = null), Zo(l, l.pendingLanes));
        var u = l.pendingLanes;
        if (
          (u === 0 && (he = null),
          fi(e),
          (t = t.stateNode),
          st && typeof st.onCommitFiberRoot == "function")
        )
          try {
            st.onCommitFiberRoot(
              Ca,
              t,
              void 0,
              (t.current.flags & 128) === 128
            );
          } catch {}
        if (a !== null) {
          (t = A.T), (u = T.p), (T.p = 2), (A.T = null);
          try {
            for (var n = l.onRecoverableError, i = 0; i < a.length; i++) {
              var c = a[i];
              n(c.value, { componentStack: c.stack });
            }
          } finally {
            (A.T = t), (T.p = u);
          }
        }
        (kt & 3) !== 0 && Tn(),
          Rt(l),
          (u = l.pendingLanes),
          (e & 261930) !== 0 && (u & 42) !== 0
            ? l === Zc
              ? hu++
              : ((hu = 0), (Zc = l))
            : (hu = 0),
          vu(0);
      }
    }
    function Zo(l, t) {
      (l.pooledCacheLanes &= t) === 0 &&
        ((t = l.pooledCache), t != null && ((l.pooledCache = null), Fa(t)));
    }
    function Tn() {
      return Go(), Xo(), Qo(), Vo();
    }
    function Vo() {
      if (Bl !== 5) return !1;
      var l = ve,
        t = Xc;
      Xc = 0;
      var e = fi(kt),
        a = A.T,
        u = T.p;
      try {
        (T.p = 32 > e ? 32 : e), (A.T = null), (e = Qc), (Qc = null);
        var n = ve,
          i = kt;
        if (((Bl = 0), (Na = ve = null), (kt = 0), (cl & 6) !== 0))
          throw Error(h(331));
        var c = cl;
        if (
          ((cl |= 4),
          Eo(n.current),
          po(n, n.current, i, e),
          (cl = c),
          vu(0, !1),
          st && typeof st.onPostCommitFiberRoot == "function")
        )
          try {
            st.onPostCommitFiberRoot(Ca, n);
          } catch {}
        return !0;
      } finally {
        (T.p = u), (A.T = a), Zo(l, t);
      }
    }
    function Lo(l, t, e) {
      (t = pt(e, t)),
        (t = Nc(l.stateNode, t, 2)),
        (l = fe(l, t, 2)),
        l !== null && (Ha(l, 2), Rt(l));
    }
    function ml(l, t, e) {
      if (l.tag === 3) Lo(l, l, e);
      else
        for (; t !== null; ) {
          if (t.tag === 3) {
            Lo(t, l, e);
            break;
          } else if (t.tag === 1) {
            var a = t.stateNode;
            if (
              typeof t.type.getDerivedStateFromError == "function" ||
              (typeof a.componentDidCatch == "function" &&
                (he === null || !he.has(a)))
            ) {
              (l = pt(e, l)),
                (e = Ld(2)),
                (a = fe(t, e, 2)),
                a !== null && (Kd(e, a, t, l), Ha(a, 2), Rt(a));
              break;
            }
          }
          t = t.return;
        }
    }
    function Kc(l, t, e) {
      var a = l.pingCache;
      if (a === null) {
        a = l.pingCache = new Hh();
        var u = new Set();
        a.set(t, u);
      } else (u = a.get(t)), u === void 0 && ((u = new Set()), a.set(t, u));
      u.has(e) ||
        ((Yc = !0), u.add(e), (l = Xh.bind(null, l, t, e)), t.then(l, l));
    }
    function Xh(l, t, e) {
      var a = l.pingCache;
      a !== null && a.delete(t),
        (l.pingedLanes |= l.suspendedLanes & e),
        (l.warmLanes &= ~e),
        bl === l &&
          (P & e) === e &&
          (Tl === 4 || (Tl === 3 && (P & 62914560) === P && 300 > ft() - pn)
            ? (cl & 2) === 0 && pa(l, 0)
            : (Bc |= e),
          Sa === P && (Sa = 0)),
        Rt(l);
    }
    function Ko(l, t) {
      t === 0 && (t = Bf()), (l = De(l, t)), l !== null && (Ha(l, t), Rt(l));
    }
    function Qh(l) {
      var t = l.memoizedState,
        e = 0;
      t !== null && (e = t.retryLane), Ko(l, e);
    }
    function Zh(l, t) {
      var e = 0;
      switch (l.tag) {
        case 31:
        case 13:
          var a = l.stateNode,
            u = l.memoizedState;
          u !== null && (e = u.retryLane);
          break;
        case 19:
          a = l.stateNode;
          break;
        case 22:
          a = l.stateNode._retryCache;
          break;
        default:
          throw Error(h(314));
      }
      a !== null && a.delete(t), Ko(l, e);
    }
    function Vh(l, t) {
      return ui(l, t);
    }
    var _n = null,
      ja = null,
      Jc = !1,
      Mn = !1,
      wc = !1,
      ge = 0;
    function Rt(l) {
      l !== ja &&
        l.next === null &&
        (ja === null ? (_n = ja = l) : (ja = ja.next = l)),
        (Mn = !0),
        Jc || ((Jc = !0), Kh());
    }
    function vu(l, t) {
      if (!wc && Mn) {
        wc = !0;
        do
          for (var e = !1, a = _n; a !== null; ) {
            if (l !== 0) {
              var u = a.pendingLanes;
              if (u === 0) var n = 0;
              else {
                var i = a.suspendedLanes,
                  c = a.pingedLanes;
                (n = (1 << (31 - dt(42 | l) + 1)) - 1),
                  (n &= u & ~(i & ~c)),
                  (n = n & 201326741 ? (n & 201326741) | 1 : n ? n | 2 : 0);
              }
              n !== 0 && ((e = !0), Fo(a, n));
            } else
              (n = P),
                (n = Uu(
                  a,
                  a === bl ? n : 0,
                  a.cancelPendingCommit !== null || a.timeoutHandle !== -1
                )),
                (n & 3) === 0 || Ra(a, n) || ((e = !0), Fo(a, n));
            a = a.next;
          }
        while (e);
        wc = !1;
      }
    }
    function Lh() {
      Jo();
    }
    function Jo() {
      Mn = Jc = !1;
      var l = 0;
      ge !== 0 && tv() && (l = ge);
      for (var t = ft(), e = null, a = _n; a !== null; ) {
        var u = a.next,
          n = wo(a, t);
        n === 0
          ? ((a.next = null),
            e === null ? (_n = u) : (e.next = u),
            u === null && (ja = e))
          : ((e = a), (l !== 0 || (n & 3) !== 0) && (Mn = !0)),
          (a = u);
      }
      (Bl !== 0 && Bl !== 5) || vu(l), ge !== 0 && (ge = 0);
    }
    function wo(l, t) {
      for (
        var e = l.suspendedLanes,
          a = l.pingedLanes,
          u = l.expirationTimes,
          n = l.pendingLanes & -62914561;
        0 < n;

      ) {
        var i = 31 - dt(n),
          c = 1 << i,
          s = u[i];
        s === -1
          ? ((c & e) === 0 || (c & a) !== 0) && (u[i] = gr(c, t))
          : s <= t && (l.expiredLanes |= c),
          (n &= ~c);
      }
      if (
        ((t = bl),
        (e = P),
        (e = Uu(
          l,
          l === t ? e : 0,
          l.cancelPendingCommit !== null || l.timeoutHandle !== -1
        )),
        (a = l.callbackNode),
        e === 0 ||
          (l === t && (ol === 2 || ol === 9)) ||
          l.cancelPendingCommit !== null)
      )
        return (
          a !== null && a !== null && ni(a),
          (l.callbackNode = null),
          (l.callbackPriority = 0)
        );
      if ((e & 3) === 0 || Ra(l, e)) {
        if (((t = e & -e), t === l.callbackPriority)) return t;
        switch ((a !== null && ni(a), fi(e))) {
          case 2:
          case 8:
            e = qf;
            break;
          case 32:
            e = _u;
            break;
          case 268435456:
            e = Yf;
            break;
          default:
            e = _u;
        }
        return (
          (a = Wo.bind(null, l)),
          (e = ui(e, a)),
          (l.callbackPriority = t),
          (l.callbackNode = e),
          t
        );
      }
      return (
        a !== null && a !== null && ni(a),
        (l.callbackPriority = 2),
        (l.callbackNode = null),
        2
      );
    }
    function Wo(l, t) {
      if (Bl !== 0 && Bl !== 5)
        return (l.callbackNode = null), (l.callbackPriority = 0), null;
      var e = l.callbackNode;
      if (Tn() && l.callbackNode !== e) return null;
      var a = P;
      return (
        (a = Uu(
          l,
          l === bl ? a : 0,
          l.cancelPendingCommit !== null || l.timeoutHandle !== -1
        )),
        a === 0
          ? null
          : (Mo(l, a, t),
            wo(l, ft()),
            l.callbackNode != null && l.callbackNode === e
              ? Wo.bind(null, l)
              : null)
      );
    }
    function Fo(l, t) {
      if (Tn()) return null;
      Mo(l, t, !0);
    }
    function Kh() {
      av(function () {
        (cl & 6) !== 0 ? ui(Hf, Lh) : Jo();
      });
    }
    function Wc() {
      if (ge === 0) {
        var l = fa;
        l === 0 && ((l = Mu), (Mu <<= 1), (Mu & 261888) === 0 && (Mu = 256)),
          (ge = l);
      }
      return ge;
    }
    function $o(l) {
      return l == null || typeof l == "symbol" || typeof l == "boolean"
        ? null
        : typeof l == "function"
        ? l
        : qu("" + l);
    }
    function ko(l, t) {
      var e = t.ownerDocument.createElement("input");
      return (
        (e.name = t.name),
        (e.value = t.value),
        l.id && e.setAttribute("form", l.id),
        t.parentNode.insertBefore(e, t),
        (l = new FormData(l)),
        e.parentNode.removeChild(e),
        l
      );
    }
    function Jh(l, t, e, a, u) {
      if (t === "submit" && e && e.stateNode === u) {
        var n = $o((u[lt] || null).action),
          i = a.submitter;
        i &&
          ((t = (t = i[lt] || null)
            ? $o(t.formAction)
            : i.getAttribute("formAction")),
          t !== null && ((n = t), (i = null)));
        var c = new Xu("action", "action", null, a, u);
        l.push({
          event: c,
          listeners: [
            {
              instance: null,
              listener: function () {
                if (a.defaultPrevented) {
                  if (ge !== 0) {
                    var s = i ? ko(u, i) : new FormData(u);
                    hc(
                      e,
                      { pending: !0, data: s, method: u.method, action: n },
                      null,
                      s
                    );
                  }
                } else
                  typeof n == "function" &&
                    (c.preventDefault(),
                    (s = i ? ko(u, i) : new FormData(u)),
                    hc(
                      e,
                      { pending: !0, data: s, method: u.method, action: n },
                      n,
                      s
                    ));
              },
              currentTarget: u,
            },
          ],
        });
      }
    }
    for (var Fc = 0; Fc < Di.length; Fc++) {
      var $c = Di[Fc],
        wh = $c.toLowerCase(),
        Wh = $c[0].toUpperCase() + $c.slice(1);
      _t(wh, "on" + Wh);
    }
    _t(Ts, "onAnimationEnd"),
      _t(_s, "onAnimationIteration"),
      _t(Ms, "onAnimationStart"),
      _t("dblclick", "onDoubleClick"),
      _t("focusin", "onFocus"),
      _t("focusout", "onBlur"),
      _t(dh, "onTransitionRun"),
      _t(oh, "onTransitionStart"),
      _t(mh, "onTransitionCancel"),
      _t(Os, "onTransitionEnd"),
      We("onMouseEnter", ["mouseout", "mouseover"]),
      We("onMouseLeave", ["mouseout", "mouseover"]),
      We("onPointerEnter", ["pointerout", "pointerover"]),
      We("onPointerLeave", ["pointerout", "pointerover"]),
      Te(
        "onChange",
        "change click focusin focusout input keydown keyup selectionchange".split(
          " "
        )
      ),
      Te(
        "onSelect",
        "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
          " "
        )
      ),
      Te("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
      Te(
        "onCompositionEnd",
        "compositionend focusout keydown keypress keyup mousedown".split(" ")
      ),
      Te(
        "onCompositionStart",
        "compositionstart focusout keydown keypress keyup mousedown".split(" ")
      ),
      Te(
        "onCompositionUpdate",
        "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
      );
    var yu =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
          " "
        ),
      Fh = new Set(
        "beforetoggle cancel close invalid load scroll scrollend toggle"
          .split(" ")
          .concat(yu)
      );
    function Io(l, t) {
      t = (t & 4) !== 0;
      for (var e = 0; e < l.length; e++) {
        var a = l[e],
          u = a.event;
        a = a.listeners;
        l: {
          var n = void 0;
          if (t)
            for (var i = a.length - 1; 0 <= i; i--) {
              var c = a[i],
                s = c.instance,
                y = c.currentTarget;
              if (((c = c.listener), s !== n && u.isPropagationStopped()))
                break l;
              (n = c), (u.currentTarget = y);
              try {
                n(u);
              } catch (j) {
                Vu(j);
              }
              (u.currentTarget = null), (n = s);
            }
          else
            for (i = 0; i < a.length; i++) {
              if (
                ((c = a[i]),
                (s = c.instance),
                (y = c.currentTarget),
                (c = c.listener),
                s !== n && u.isPropagationStopped())
              )
                break l;
              (n = c), (u.currentTarget = y);
              try {
                n(u);
              } catch (j) {
                Vu(j);
              }
              (u.currentTarget = null), (n = s);
            }
        }
      }
    }
    function $(l, t) {
      var e = t[si];
      e === void 0 && (e = t[si] = new Set());
      var a = l + "__bubble";
      e.has(a) || (Po(t, l, 2, !1), e.add(a));
    }
    function kc(l, t, e) {
      var a = 0;
      t && (a |= 4), Po(e, l, a, t);
    }
    var On = "_reactListening" + Math.random().toString(36).slice(2);
    function Ic(l) {
      if (!l[On]) {
        (l[On] = !0),
          Kf.forEach(function (e) {
            e !== "selectionchange" &&
              (Fh.has(e) || kc(e, !1, l), kc(e, !0, l));
          });
        var t = l.nodeType === 9 ? l : l.ownerDocument;
        t === null || t[On] || ((t[On] = !0), kc("selectionchange", !1, t));
      }
    }
    function Po(l, t, e, a) {
      switch (_m(t)) {
        case 2:
          var u = jv;
          break;
        case 8:
          u = Ev;
          break;
        default:
          u = hf;
      }
      (e = u.bind(null, t, e, l)),
        (u = void 0),
        !bi ||
          (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
          (u = !0),
        a
          ? u !== void 0
            ? l.addEventListener(t, e, { capture: !0, passive: u })
            : l.addEventListener(t, e, !0)
          : u !== void 0
          ? l.addEventListener(t, e, { passive: u })
          : l.addEventListener(t, e, !1);
    }
    function Pc(l, t, e, a, u) {
      var n = a;
      if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
        l: for (;;) {
          if (a === null) return;
          var i = a.tag;
          if (i === 3 || i === 4) {
            var c = a.stateNode.containerInfo;
            if (c === u) break;
            if (i === 4)
              for (i = a.return; i !== null; ) {
                var s = i.tag;
                if ((s === 3 || s === 4) && i.stateNode.containerInfo === u)
                  return;
                i = i.return;
              }
            for (; c !== null; ) {
              if (((i = Ke(c)), i === null)) return;
              if (((s = i.tag), s === 5 || s === 6 || s === 26 || s === 27)) {
                a = n = i;
                continue l;
              }
              c = c.parentNode;
            }
          }
          a = a.return;
        }
      as(function () {
        var y = n,
          j = yi(e),
          x = [];
        l: {
          var g = Ds.get(l);
          if (g !== void 0) {
            var S = Xu,
              C = l;
            switch (l) {
              case "keypress":
                if (Bu(e) === 0) break l;
              case "keydown":
              case "keyup":
                S = Zr;
                break;
              case "focusin":
                (C = "focus"), (S = Ai);
                break;
              case "focusout":
                (C = "blur"), (S = Ai);
                break;
              case "beforeblur":
              case "afterblur":
                S = Ai;
                break;
              case "click":
                if (e.button === 2) break l;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                S = is;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                S = Or;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                S = Kr;
                break;
              case Ts:
              case _s:
              case Ms:
                S = Cr;
                break;
              case Os:
                S = wr;
                break;
              case "scroll":
              case "scrollend":
                S = _r;
                break;
              case "wheel":
                S = Fr;
                break;
              case "copy":
              case "cut":
              case "paste":
                S = Hr;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                S = fs;
                break;
              case "toggle":
              case "beforetoggle":
                S = kr;
            }
            var B = (t & 4) !== 0,
              gl = !B && (l === "scroll" || l === "scrollend"),
              r = B ? (g !== null ? g + "Capture" : null) : g;
            B = [];
            for (var d = y, v; d !== null; ) {
              var E = d;
              if (
                ((v = E.stateNode),
                (E = E.tag),
                (E !== 5 && E !== 26 && E !== 27) ||
                  v === null ||
                  r === null ||
                  ((E = Ba(d, r)), E != null && B.push(gu(d, E, v))),
                gl)
              )
                break;
              d = d.return;
            }
            0 < B.length &&
              ((g = new S(g, C, null, e, j)),
              x.push({ event: g, listeners: B }));
          }
        }
        if ((t & 7) === 0) {
          l: {
            if (
              ((g = l === "mouseover" || l === "pointerover"),
              (S = l === "mouseout" || l === "pointerout"),
              g &&
                e !== vi &&
                (C = e.relatedTarget || e.fromElement) &&
                (Ke(C) || C[Le]))
            )
              break l;
            if (
              (S || g) &&
              ((g =
                j.window === j
                  ? j
                  : (g = j.ownerDocument)
                  ? g.defaultView || g.parentWindow
                  : window),
              S
                ? ((C = e.relatedTarget || e.toElement),
                  (S = y),
                  (C = C ? Ke(C) : null),
                  C !== null &&
                    ((gl = G(C)),
                    (B = C.tag),
                    C !== gl || (B !== 5 && B !== 27 && B !== 6)) &&
                    (C = null))
                : ((S = null), (C = y)),
              S !== C)
            ) {
              if (
                ((B = is),
                (E = "onMouseLeave"),
                (r = "onMouseEnter"),
                (d = "mouse"),
                (l === "pointerout" || l === "pointerover") &&
                  ((B = fs),
                  (E = "onPointerLeave"),
                  (r = "onPointerEnter"),
                  (d = "pointer")),
                (gl = S == null ? g : Ya(S)),
                (v = C == null ? g : Ya(C)),
                (g = new B(E, d + "leave", S, e, j)),
                (g.target = gl),
                (g.relatedTarget = v),
                (E = null),
                Ke(j) === y &&
                  ((B = new B(r, d + "enter", C, e, j)),
                  (B.target = v),
                  (B.relatedTarget = gl),
                  (E = B)),
                (gl = E),
                S && C)
              )
                t: {
                  for (B = $h, r = S, d = C, v = 0, E = r; E; E = B(E)) v++;
                  E = 0;
                  for (var q = d; q; q = B(q)) E++;
                  for (; 0 < v - E; ) (r = B(r)), v--;
                  for (; 0 < E - v; ) (d = B(d)), E--;
                  for (; v--; ) {
                    if (r === d || (d !== null && r === d.alternate)) {
                      B = r;
                      break t;
                    }
                    (r = B(r)), (d = B(d));
                  }
                  B = null;
                }
              else B = null;
              S !== null && lm(x, g, S, B, !1),
                C !== null && gl !== null && lm(x, gl, C, B, !0);
            }
          }
          l: {
            if (
              ((g = y ? Ya(y) : window),
              (S = g.nodeName && g.nodeName.toLowerCase()),
              S === "select" || (S === "input" && g.type === "file"))
            )
              var ul = ys;
            else if (hs(g))
              if (gs) ul = ch;
              else {
                ul = nh;
                var H = uh;
              }
            else
              (S = g.nodeName),
                !S ||
                S.toLowerCase() !== "input" ||
                (g.type !== "checkbox" && g.type !== "radio")
                  ? y && hi(y.elementType) && (ul = ys)
                  : (ul = ih);
            if (ul && (ul = ul(l, y))) {
              vs(x, ul, e, j);
              break l;
            }
            H && H(l, g, y),
              l === "focusout" &&
                y &&
                g.type === "number" &&
                y.memoizedProps.value != null &&
                ri(g, "number", g.value);
          }
          switch (((H = y ? Ya(y) : window), l)) {
            case "focusin":
              (hs(H) || H.contentEditable === "true") &&
                ((la = H), (_i = y), (Ja = null));
              break;
            case "focusout":
              Ja = _i = la = null;
              break;
            case "mousedown":
              Mi = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              (Mi = !1), zs(x, e, j);
              break;
            case "selectionchange":
              if (sh) break;
            case "keydown":
            case "keyup":
              zs(x, e, j);
          }
          var K;
          if (Ei)
            l: {
              switch (l) {
                case "compositionstart":
                  var ll = "onCompositionStart";
                  break l;
                case "compositionend":
                  ll = "onCompositionEnd";
                  break l;
                case "compositionupdate":
                  ll = "onCompositionUpdate";
                  break l;
              }
              ll = void 0;
            }
          else
            Pe
              ? ms(l, e) && (ll = "onCompositionEnd")
              : l === "keydown" &&
                e.keyCode === 229 &&
                (ll = "onCompositionStart");
          ll &&
            (ss &&
              e.locale !== "ko" &&
              (Pe || ll !== "onCompositionStart"
                ? ll === "onCompositionEnd" && Pe && (K = us())
                : ((te = j),
                  (Si = "value" in te ? te.value : te.textContent),
                  (Pe = !0))),
            (H = Dn(y, ll)),
            0 < H.length &&
              ((ll = new cs(ll, l, null, e, j)),
              x.push({ event: ll, listeners: H }),
              K ? (ll.data = K) : ((K = rs(e)), K !== null && (ll.data = K)))),
            (K = Pr ? lh(l, e) : th(l, e)) &&
              ((ll = Dn(y, "onBeforeInput")),
              0 < ll.length &&
                ((H = new cs("onBeforeInput", "beforeinput", null, e, j)),
                x.push({ event: H, listeners: ll }),
                (H.data = K))),
            Jh(x, l, y, e, j);
        }
        Io(x, t);
      });
    }
    function gu(l, t, e) {
      return { instance: l, listener: t, currentTarget: e };
    }
    function Dn(l, t) {
      for (var e = t + "Capture", a = []; l !== null; ) {
        var u = l,
          n = u.stateNode;
        if (
          ((u = u.tag),
          (u !== 5 && u !== 26 && u !== 27) ||
            n === null ||
            ((u = Ba(l, e)),
            u != null && a.unshift(gu(l, u, n)),
            (u = Ba(l, t)),
            u != null && a.push(gu(l, u, n))),
          l.tag === 3)
        )
          return a;
        l = l.return;
      }
      return [];
    }
    function $h(l) {
      if (l === null) return null;
      do l = l.return;
      while (l && l.tag !== 5 && l.tag !== 27);
      return l || null;
    }
    function lm(l, t, e, a, u) {
      for (var n = t._reactName, i = []; e !== null && e !== a; ) {
        var c = e,
          s = c.alternate,
          y = c.stateNode;
        if (((c = c.tag), s !== null && s === a)) break;
        (c !== 5 && c !== 26 && c !== 27) ||
          y === null ||
          ((s = y),
          u
            ? ((y = Ba(e, n)), y != null && i.unshift(gu(e, y, s)))
            : u || ((y = Ba(e, n)), y != null && i.push(gu(e, y, s)))),
          (e = e.return);
      }
      i.length !== 0 && l.push({ event: t, listeners: i });
    }
    var kh = /\r\n?/g,
      Ih = /\u0000|\uFFFD/g;
    function tm(l) {
      return (typeof l == "string" ? l : "" + l)
        .replace(
          kh,
          `
`
        )
        .replace(Ih, "");
    }
    function em(l, t) {
      return (t = tm(t)), tm(l) === t;
    }
    function yl(l, t, e, a, u, n) {
      switch (e) {
        case "children":
          typeof a == "string"
            ? t === "body" || (t === "textarea" && a === "") || $e(l, a)
            : (typeof a == "number" || typeof a == "bigint") &&
              t !== "body" &&
              $e(l, "" + a);
          break;
        case "className":
          Ru(l, "class", a);
          break;
        case "tabIndex":
          Ru(l, "tabindex", a);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          Ru(l, e, a);
          break;
        case "style":
          ts(l, a, n);
          break;
        case "data":
          if (t !== "object") {
            Ru(l, "data", a);
            break;
          }
        case "src":
        case "href":
          if (a === "" && (t !== "a" || e !== "href")) {
            l.removeAttribute(e);
            break;
          }
          if (
            a == null ||
            typeof a == "function" ||
            typeof a == "symbol" ||
            typeof a == "boolean"
          ) {
            l.removeAttribute(e);
            break;
          }
          (a = qu("" + a)), l.setAttribute(e, a);
          break;
        case "action":
        case "formAction":
          if (typeof a == "function") {
            l.setAttribute(
              e,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
            );
            break;
          } else typeof n == "function" && (e === "formAction" ? (t !== "input" && yl(l, t, "name", u.name, u, null), yl(l, t, "formEncType", u.formEncType, u, null), yl(l, t, "formMethod", u.formMethod, u, null), yl(l, t, "formTarget", u.formTarget, u, null)) : (yl(l, t, "encType", u.encType, u, null), yl(l, t, "method", u.method, u, null), yl(l, t, "target", u.target, u, null)));
          if (a == null || typeof a == "symbol" || typeof a == "boolean") {
            l.removeAttribute(e);
            break;
          }
          (a = qu("" + a)), l.setAttribute(e, a);
          break;
        case "onClick":
          a != null && (l.onclick = qt);
          break;
        case "onScroll":
          a != null && $("scroll", l);
          break;
        case "onScrollEnd":
          a != null && $("scrollend", l);
          break;
        case "dangerouslySetInnerHTML":
          if (a != null) {
            if (typeof a != "object" || !("__html" in a)) throw Error(h(61));
            if (((e = a.__html), e != null)) {
              if (u.children != null) throw Error(h(60));
              l.innerHTML = e;
            }
          }
          break;
        case "multiple":
          l.multiple = a && typeof a != "function" && typeof a != "symbol";
          break;
        case "muted":
          l.muted = a && typeof a != "function" && typeof a != "symbol";
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (
            a == null ||
            typeof a == "function" ||
            typeof a == "boolean" ||
            typeof a == "symbol"
          ) {
            l.removeAttribute("xlink:href");
            break;
          }
          (e = qu("" + a)),
            l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          a != null && typeof a != "function" && typeof a != "symbol"
            ? l.setAttribute(e, "" + a)
            : l.removeAttribute(e);
          break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          a && typeof a != "function" && typeof a != "symbol"
            ? l.setAttribute(e, "")
            : l.removeAttribute(e);
          break;
        case "capture":
        case "download":
          a === !0
            ? l.setAttribute(e, "")
            : a !== !1 &&
              a != null &&
              typeof a != "function" &&
              typeof a != "symbol"
            ? l.setAttribute(e, a)
            : l.removeAttribute(e);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          a != null &&
          typeof a != "function" &&
          typeof a != "symbol" &&
          !isNaN(a) &&
          1 <= a
            ? l.setAttribute(e, a)
            : l.removeAttribute(e);
          break;
        case "rowSpan":
        case "start":
          a == null ||
          typeof a == "function" ||
          typeof a == "symbol" ||
          isNaN(a)
            ? l.removeAttribute(e)
            : l.setAttribute(e, a);
          break;
        case "popover":
          $("beforetoggle", l), $("toggle", l), Cu(l, "popover", a);
          break;
        case "xlinkActuate":
          Ht(l, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
          break;
        case "xlinkArcrole":
          Ht(l, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
          break;
        case "xlinkRole":
          Ht(l, "http://www.w3.org/1999/xlink", "xlink:role", a);
          break;
        case "xlinkShow":
          Ht(l, "http://www.w3.org/1999/xlink", "xlink:show", a);
          break;
        case "xlinkTitle":
          Ht(l, "http://www.w3.org/1999/xlink", "xlink:title", a);
          break;
        case "xlinkType":
          Ht(l, "http://www.w3.org/1999/xlink", "xlink:type", a);
          break;
        case "xmlBase":
          Ht(l, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
          break;
        case "xmlLang":
          Ht(l, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
          break;
        case "xmlSpace":
          Ht(l, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
          break;
        case "is":
          Cu(l, "is", a);
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          (!(2 < e.length) ||
            (e[0] !== "o" && e[0] !== "O") ||
            (e[1] !== "n" && e[1] !== "N")) &&
            ((e = xr.get(e) || e), Cu(l, e, a));
      }
    }
    function lf(l, t, e, a, u, n) {
      switch (e) {
        case "style":
          ts(l, a, n);
          break;
        case "dangerouslySetInnerHTML":
          if (a != null) {
            if (typeof a != "object" || !("__html" in a)) throw Error(h(61));
            if (((e = a.__html), e != null)) {
              if (u.children != null) throw Error(h(60));
              l.innerHTML = e;
            }
          }
          break;
        case "children":
          typeof a == "string"
            ? $e(l, a)
            : (typeof a == "number" || typeof a == "bigint") && $e(l, "" + a);
          break;
        case "onScroll":
          a != null && $("scroll", l);
          break;
        case "onScrollEnd":
          a != null && $("scrollend", l);
          break;
        case "onClick":
          a != null && (l.onclick = qt);
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          if (!Jf.hasOwnProperty(e))
            l: {
              if (
                e[0] === "o" &&
                e[1] === "n" &&
                ((u = e.endsWith("Capture")),
                (t = e.slice(2, u ? e.length - 7 : void 0)),
                (n = l[lt] || null),
                (n = n != null ? n[e] : null),
                typeof n == "function" && l.removeEventListener(t, n, u),
                typeof a == "function")
              ) {
                typeof n != "function" &&
                  n !== null &&
                  (e in l
                    ? (l[e] = null)
                    : l.hasAttribute(e) && l.removeAttribute(e)),
                  l.addEventListener(t, a, u);
                break l;
              }
              e in l
                ? (l[e] = a)
                : a === !0
                ? l.setAttribute(e, "")
                : Cu(l, e, a);
            }
      }
    }
    function wl(l, t, e) {
      switch (t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          $("error", l), $("load", l);
          var a = !1,
            u = !1,
            n;
          for (n in e)
            if (e.hasOwnProperty(n)) {
              var i = e[n];
              if (i != null)
                switch (n) {
                  case "src":
                    a = !0;
                    break;
                  case "srcSet":
                    u = !0;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(h(137, t));
                  default:
                    yl(l, t, n, i, e, null);
                }
            }
          u && yl(l, t, "srcSet", e.srcSet, e, null),
            a && yl(l, t, "src", e.src, e, null);
          return;
        case "input":
          $("invalid", l);
          var c = (n = i = u = null),
            s = null,
            y = null;
          for (a in e)
            if (e.hasOwnProperty(a)) {
              var j = e[a];
              if (j != null)
                switch (a) {
                  case "name":
                    u = j;
                    break;
                  case "type":
                    i = j;
                    break;
                  case "checked":
                    s = j;
                    break;
                  case "defaultChecked":
                    y = j;
                    break;
                  case "value":
                    n = j;
                    break;
                  case "defaultValue":
                    c = j;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (j != null) throw Error(h(137, t));
                    break;
                  default:
                    yl(l, t, a, j, e, null);
                }
            }
          kf(l, n, c, s, y, i, u, !1);
          return;
        case "select":
          $("invalid", l), (a = i = n = null);
          for (u in e)
            if (e.hasOwnProperty(u) && ((c = e[u]), c != null))
              switch (u) {
                case "value":
                  n = c;
                  break;
                case "defaultValue":
                  i = c;
                  break;
                case "multiple":
                  a = c;
                default:
                  yl(l, t, u, c, e, null);
              }
          (t = n),
            (e = i),
            (l.multiple = !!a),
            t != null ? Fe(l, !!a, t, !1) : e != null && Fe(l, !!a, e, !0);
          return;
        case "textarea":
          $("invalid", l), (n = u = a = null);
          for (i in e)
            if (e.hasOwnProperty(i) && ((c = e[i]), c != null))
              switch (i) {
                case "value":
                  a = c;
                  break;
                case "defaultValue":
                  u = c;
                  break;
                case "children":
                  n = c;
                  break;
                case "dangerouslySetInnerHTML":
                  if (c != null) throw Error(h(91));
                  break;
                default:
                  yl(l, t, i, c, e, null);
              }
          Pf(l, a, u, n);
          return;
        case "option":
          for (s in e)
            if (e.hasOwnProperty(s) && ((a = e[s]), a != null))
              switch (s) {
                case "selected":
                  l.selected =
                    a && typeof a != "function" && typeof a != "symbol";
                  break;
                default:
                  yl(l, t, s, a, e, null);
              }
          return;
        case "dialog":
          $("beforetoggle", l), $("toggle", l), $("cancel", l), $("close", l);
          break;
        case "iframe":
        case "object":
          $("load", l);
          break;
        case "video":
        case "audio":
          for (a = 0; a < yu.length; a++) $(yu[a], l);
          break;
        case "image":
          $("error", l), $("load", l);
          break;
        case "details":
          $("toggle", l);
          break;
        case "embed":
        case "source":
        case "link":
          $("error", l), $("load", l);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for (y in e)
            if (e.hasOwnProperty(y) && ((a = e[y]), a != null))
              switch (y) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(h(137, t));
                default:
                  yl(l, t, y, a, e, null);
              }
          return;
        default:
          if (hi(t)) {
            for (j in e)
              e.hasOwnProperty(j) &&
                ((a = e[j]), a !== void 0 && lf(l, t, j, a, e, void 0));
            return;
          }
      }
      for (c in e)
        e.hasOwnProperty(c) &&
          ((a = e[c]), a != null && yl(l, t, c, a, e, null));
    }
    function Ph(l, t, e, a) {
      switch (t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var u = null,
            n = null,
            i = null,
            c = null,
            s = null,
            y = null,
            j = null;
          for (S in e) {
            var x = e[S];
            if (e.hasOwnProperty(S) && x != null)
              switch (S) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  s = x;
                default:
                  a.hasOwnProperty(S) || yl(l, t, S, null, a, x);
              }
          }
          for (var g in a) {
            var S = a[g];
            if (((x = e[g]), a.hasOwnProperty(g) && (S != null || x != null)))
              switch (g) {
                case "type":
                  n = S;
                  break;
                case "name":
                  u = S;
                  break;
                case "checked":
                  y = S;
                  break;
                case "defaultChecked":
                  j = S;
                  break;
                case "value":
                  i = S;
                  break;
                case "defaultValue":
                  c = S;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (S != null) throw Error(h(137, t));
                  break;
                default:
                  S !== x && yl(l, t, g, S, a, x);
              }
          }
          mi(l, i, c, s, y, j, n, u);
          return;
        case "select":
          S = i = c = g = null;
          for (n in e)
            if (((s = e[n]), e.hasOwnProperty(n) && s != null))
              switch (n) {
                case "value":
                  break;
                case "multiple":
                  S = s;
                default:
                  a.hasOwnProperty(n) || yl(l, t, n, null, a, s);
              }
          for (u in a)
            if (
              ((n = a[u]),
              (s = e[u]),
              a.hasOwnProperty(u) && (n != null || s != null))
            )
              switch (u) {
                case "value":
                  g = n;
                  break;
                case "defaultValue":
                  c = n;
                  break;
                case "multiple":
                  i = n;
                default:
                  n !== s && yl(l, t, u, n, a, s);
              }
          (t = c),
            (e = i),
            (a = S),
            g != null
              ? Fe(l, !!e, g, !1)
              : !!a != !!e &&
                (t != null ? Fe(l, !!e, t, !0) : Fe(l, !!e, e ? [] : "", !1));
          return;
        case "textarea":
          S = g = null;
          for (c in e)
            if (
              ((u = e[c]),
              e.hasOwnProperty(c) && u != null && !a.hasOwnProperty(c))
            )
              switch (c) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  yl(l, t, c, null, a, u);
              }
          for (i in a)
            if (
              ((u = a[i]),
              (n = e[i]),
              a.hasOwnProperty(i) && (u != null || n != null))
            )
              switch (i) {
                case "value":
                  g = u;
                  break;
                case "defaultValue":
                  S = u;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (u != null) throw Error(h(91));
                  break;
                default:
                  u !== n && yl(l, t, i, u, a, n);
              }
          If(l, g, S);
          return;
        case "option":
          for (var C in e)
            if (
              ((g = e[C]),
              e.hasOwnProperty(C) && g != null && !a.hasOwnProperty(C))
            )
              switch (C) {
                case "selected":
                  l.selected = !1;
                  break;
                default:
                  yl(l, t, C, null, a, g);
              }
          for (s in a)
            if (
              ((g = a[s]),
              (S = e[s]),
              a.hasOwnProperty(s) && g !== S && (g != null || S != null))
            )
              switch (s) {
                case "selected":
                  l.selected =
                    g && typeof g != "function" && typeof g != "symbol";
                  break;
                default:
                  yl(l, t, s, g, a, S);
              }
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var B in e)
            (g = e[B]),
              e.hasOwnProperty(B) &&
                g != null &&
                !a.hasOwnProperty(B) &&
                yl(l, t, B, null, a, g);
          for (y in a)
            if (
              ((g = a[y]),
              (S = e[y]),
              a.hasOwnProperty(y) && g !== S && (g != null || S != null))
            )
              switch (y) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (g != null) throw Error(h(137, t));
                  break;
                default:
                  yl(l, t, y, g, a, S);
              }
          return;
        default:
          if (hi(t)) {
            for (var gl in e)
              (g = e[gl]),
                e.hasOwnProperty(gl) &&
                  g !== void 0 &&
                  !a.hasOwnProperty(gl) &&
                  lf(l, t, gl, void 0, a, g);
            for (j in a)
              (g = a[j]),
                (S = e[j]),
                !a.hasOwnProperty(j) ||
                  g === S ||
                  (g === void 0 && S === void 0) ||
                  lf(l, t, j, g, a, S);
            return;
          }
      }
      for (var r in e)
        (g = e[r]),
          e.hasOwnProperty(r) &&
            g != null &&
            !a.hasOwnProperty(r) &&
            yl(l, t, r, null, a, g);
      for (x in a)
        (g = a[x]),
          (S = e[x]),
          !a.hasOwnProperty(x) ||
            g === S ||
            (g == null && S == null) ||
            yl(l, t, x, g, a, S);
    }
    function am(l) {
      switch (l) {
        case "css":
        case "script":
        case "font":
        case "img":
        case "image":
        case "input":
        case "link":
          return !0;
        default:
          return !1;
      }
    }
    function lv() {
      if (typeof performance.getEntriesByType == "function") {
        for (
          var l = 0, t = 0, e = performance.getEntriesByType("resource"), a = 0;
          a < e.length;
          a++
        ) {
          var u = e[a],
            n = u.transferSize,
            i = u.initiatorType,
            c = u.duration;
          if (n && c && am(i)) {
            for (i = 0, c = u.responseEnd, a += 1; a < e.length; a++) {
              var s = e[a],
                y = s.startTime;
              if (y > c) break;
              var j = s.transferSize,
                x = s.initiatorType;
              j &&
                am(x) &&
                ((s = s.responseEnd),
                (i += j * (s < c ? 1 : (c - y) / (s - y))));
            }
            if ((--a, (t += (8 * (n + i)) / (u.duration / 1e3)), l++, 10 < l))
              break;
          }
        }
        if (0 < l) return t / l / 1e6;
      }
      return navigator.connection &&
        ((l = navigator.connection.downlink), typeof l == "number")
        ? l
        : 5;
    }
    var tf = null,
      ef = null;
    function Un(l) {
      return l.nodeType === 9 ? l : l.ownerDocument;
    }
    function um(l) {
      switch (l) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0;
      }
    }
    function nm(l, t) {
      if (l === 0)
        switch (t) {
          case "svg":
            return 1;
          case "math":
            return 2;
          default:
            return 0;
        }
      return l === 1 && t === "foreignObject" ? 0 : l;
    }
    function af(l, t) {
      return (
        l === "textarea" ||
        l === "noscript" ||
        typeof t.children == "string" ||
        typeof t.children == "number" ||
        typeof t.children == "bigint" ||
        (typeof t.dangerouslySetInnerHTML == "object" &&
          t.dangerouslySetInnerHTML !== null &&
          t.dangerouslySetInnerHTML.__html != null)
      );
    }
    var uf = null;
    function tv() {
      var l = window.event;
      return l && l.type === "popstate"
        ? l === uf
          ? !1
          : ((uf = l), !0)
        : ((uf = null), !1);
    }
    var im = typeof setTimeout == "function" ? setTimeout : void 0,
      ev = typeof clearTimeout == "function" ? clearTimeout : void 0,
      cm = typeof Promise == "function" ? Promise : void 0,
      av =
        typeof queueMicrotask == "function"
          ? queueMicrotask
          : typeof cm < "u"
          ? function (l) {
              return cm.resolve(null).then(l).catch(uv);
            }
          : im;
    function uv(l) {
      setTimeout(function () {
        throw l;
      });
    }
    function be(l) {
      return l === "head";
    }
    function fm(l, t) {
      var e = t,
        a = 0;
      do {
        var u = e.nextSibling;
        if ((l.removeChild(e), u && u.nodeType === 8))
          if (((e = u.data), e === "/$" || e === "/&")) {
            if (a === 0) {
              l.removeChild(u), Ta(t);
              return;
            }
            a--;
          } else if (
            e === "$" ||
            e === "$?" ||
            e === "$~" ||
            e === "$!" ||
            e === "&"
          )
            a++;
          else if (e === "html") bu(l.ownerDocument.documentElement);
          else if (e === "head") {
            (e = l.ownerDocument.head), bu(e);
            for (var n = e.firstChild; n; ) {
              var i = n.nextSibling,
                c = n.nodeName;
              n[qa] ||
                c === "SCRIPT" ||
                c === "STYLE" ||
                (c === "LINK" && n.rel.toLowerCase() === "stylesheet") ||
                e.removeChild(n),
                (n = i);
            }
          } else e === "body" && bu(l.ownerDocument.body);
        e = u;
      } while (e);
      Ta(t);
    }
    function sm(l, t) {
      var e = l;
      l = 0;
      do {
        var a = e.nextSibling;
        if (
          (e.nodeType === 1
            ? t
              ? ((e._stashedDisplay = e.style.display),
                (e.style.display = "none"))
              : ((e.style.display = e._stashedDisplay || ""),
                e.getAttribute("style") === "" && e.removeAttribute("style"))
            : e.nodeType === 3 &&
              (t
                ? ((e._stashedText = e.nodeValue), (e.nodeValue = ""))
                : (e.nodeValue = e._stashedText || "")),
          a && a.nodeType === 8)
        )
          if (((e = a.data), e === "/$")) {
            if (l === 0) break;
            l--;
          } else (e !== "$" && e !== "$?" && e !== "$~" && e !== "$!") || l++;
        e = a;
      } while (e);
    }
    function nf(l) {
      var t = l.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var e = t;
        switch (((t = t.nextSibling), e.nodeName)) {
          case "HTML":
          case "HEAD":
          case "BODY":
            nf(e), di(e);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (e.rel.toLowerCase() === "stylesheet") continue;
        }
        l.removeChild(e);
      }
    }
    function nv(l, t, e, a) {
      for (; l.nodeType === 1; ) {
        var u = e;
        if (l.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!a && (l.nodeName !== "INPUT" || l.type !== "hidden")) break;
        } else if (a) {
          if (!l[qa])
            switch (t) {
              case "meta":
                if (!l.hasAttribute("itemprop")) break;
                return l;
              case "link":
                if (
                  ((n = l.getAttribute("rel")),
                  n === "stylesheet" && l.hasAttribute("data-precedence"))
                )
                  break;
                if (
                  n !== u.rel ||
                  l.getAttribute("href") !==
                    (u.href == null || u.href === "" ? null : u.href) ||
                  l.getAttribute("crossorigin") !==
                    (u.crossOrigin == null ? null : u.crossOrigin) ||
                  l.getAttribute("title") !== (u.title == null ? null : u.title)
                )
                  break;
                return l;
              case "style":
                if (l.hasAttribute("data-precedence")) break;
                return l;
              case "script":
                if (
                  ((n = l.getAttribute("src")),
                  (n !== (u.src == null ? null : u.src) ||
                    l.getAttribute("type") !==
                      (u.type == null ? null : u.type) ||
                    l.getAttribute("crossorigin") !==
                      (u.crossOrigin == null ? null : u.crossOrigin)) &&
                    n &&
                    l.hasAttribute("async") &&
                    !l.hasAttribute("itemprop"))
                )
                  break;
                return l;
              default:
                return l;
            }
        } else if (t === "input" && l.type === "hidden") {
          var n = u.name == null ? null : "" + u.name;
          if (u.type === "hidden" && l.getAttribute("name") === n) return l;
        } else return l;
        if (((l = xt(l.nextSibling)), l === null)) break;
      }
      return null;
    }
    function iv(l, t, e) {
      if (t === "") return null;
      for (; l.nodeType !== 3; )
        if (
          ((l.nodeType !== 1 ||
            l.nodeName !== "INPUT" ||
            l.type !== "hidden") &&
            !e) ||
          ((l = xt(l.nextSibling)), l === null)
        )
          return null;
      return l;
    }
    function dm(l, t) {
      for (; l.nodeType !== 8; )
        if (
          ((l.nodeType !== 1 ||
            l.nodeName !== "INPUT" ||
            l.type !== "hidden") &&
            !t) ||
          ((l = xt(l.nextSibling)), l === null)
        )
          return null;
      return l;
    }
    function cf(l) {
      return l.data === "$?" || l.data === "$~";
    }
    function ff(l) {
      return (
        l.data === "$!" ||
        (l.data === "$?" && l.ownerDocument.readyState !== "loading")
      );
    }
    function cv(l, t) {
      var e = l.ownerDocument;
      if (l.data === "$~") l._reactRetry = t;
      else if (l.data !== "$?" || e.readyState !== "loading") t();
      else {
        var a = function () {
          t(), e.removeEventListener("DOMContentLoaded", a);
        };
        e.addEventListener("DOMContentLoaded", a), (l._reactRetry = a);
      }
    }
    function xt(l) {
      for (; l != null; l = l.nextSibling) {
        var t = l.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (
            ((t = l.data),
            t === "$" ||
              t === "$!" ||
              t === "$?" ||
              t === "$~" ||
              t === "&" ||
              t === "F!" ||
              t === "F")
          )
            break;
          if (t === "/$" || t === "/&") return null;
        }
      }
      return l;
    }
    var sf = null;
    function om(l) {
      l = l.nextSibling;
      for (var t = 0; l; ) {
        if (l.nodeType === 8) {
          var e = l.data;
          if (e === "/$" || e === "/&") {
            if (t === 0) return xt(l.nextSibling);
            t--;
          } else
            (e !== "$" &&
              e !== "$!" &&
              e !== "$?" &&
              e !== "$~" &&
              e !== "&") ||
              t++;
        }
        l = l.nextSibling;
      }
      return null;
    }
    function mm(l) {
      l = l.previousSibling;
      for (var t = 0; l; ) {
        if (l.nodeType === 8) {
          var e = l.data;
          if (
            e === "$" ||
            e === "$!" ||
            e === "$?" ||
            e === "$~" ||
            e === "&"
          ) {
            if (t === 0) return l;
            t--;
          } else (e !== "/$" && e !== "/&") || t++;
        }
        l = l.previousSibling;
      }
      return null;
    }
    function rm(l, t, e) {
      switch (((t = Un(e)), l)) {
        case "html":
          if (((l = t.documentElement), !l)) throw Error(h(452));
          return l;
        case "head":
          if (((l = t.head), !l)) throw Error(h(453));
          return l;
        case "body":
          if (((l = t.body), !l)) throw Error(h(454));
          return l;
        default:
          throw Error(h(451));
      }
    }
    function bu(l) {
      for (var t = l.attributes; t.length; ) l.removeAttributeNode(t[0]);
      di(l);
    }
    var Tt = new Map(),
      hm = new Set();
    function Cn(l) {
      return typeof l.getRootNode == "function"
        ? l.getRootNode()
        : l.nodeType === 9
        ? l
        : l.ownerDocument;
    }
    var It = T.d;
    T.d = { f: fv, r: sv, D: dv, C: ov, L: mv, m: rv, X: vv, S: hv, M: yv };
    function fv() {
      var l = It.f(),
        t = En();
      return l || t;
    }
    function sv(l) {
      var t = Je(l);
      t !== null && t.tag === 5 && t.type === "form" ? Od(t) : It.r(l);
    }
    var Ea = typeof document > "u" ? null : document;
    function vm(l, t, e) {
      var a = Ea;
      if (a && typeof t == "string" && t) {
        var u = St(t);
        (u = 'link[rel="' + l + '"][href="' + u + '"]'),
          typeof e == "string" && (u += '[crossorigin="' + e + '"]'),
          hm.has(u) ||
            (hm.add(u),
            (l = { rel: l, crossOrigin: e, href: t }),
            a.querySelector(u) === null &&
              ((t = a.createElement("link")),
              wl(t, "link", l),
              Xl(t),
              a.head.appendChild(t)));
      }
    }
    function dv(l) {
      It.D(l), vm("dns-prefetch", l, null);
    }
    function ov(l, t) {
      It.C(l, t), vm("preconnect", l, t);
    }
    function mv(l, t, e) {
      It.L(l, t, e);
      var a = Ea;
      if (a && l && t) {
        var u = 'link[rel="preload"][as="' + St(t) + '"]';
        t === "image" && e && e.imageSrcSet
          ? ((u += '[imagesrcset="' + St(e.imageSrcSet) + '"]'),
            typeof e.imageSizes == "string" &&
              (u += '[imagesizes="' + St(e.imageSizes) + '"]'))
          : (u += '[href="' + St(l) + '"]');
        var n = u;
        switch (t) {
          case "style":
            n = za(l);
            break;
          case "script":
            n = xa(l);
        }
        Tt.has(n) ||
          ((l = U(
            {
              rel: "preload",
              href: t === "image" && e && e.imageSrcSet ? void 0 : l,
              as: t,
            },
            e
          )),
          Tt.set(n, l),
          a.querySelector(u) !== null ||
            (t === "style" && a.querySelector(Su(n))) ||
            (t === "script" && a.querySelector(Nu(n))) ||
            ((t = a.createElement("link")),
            wl(t, "link", l),
            Xl(t),
            a.head.appendChild(t)));
      }
    }
    function rv(l, t) {
      It.m(l, t);
      var e = Ea;
      if (e && l) {
        var a = t && typeof t.as == "string" ? t.as : "script",
          u =
            'link[rel="modulepreload"][as="' +
            St(a) +
            '"][href="' +
            St(l) +
            '"]',
          n = u;
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            n = xa(l);
        }
        if (
          !Tt.has(n) &&
          ((l = U({ rel: "modulepreload", href: l }, t)),
          Tt.set(n, l),
          e.querySelector(u) === null)
        ) {
          switch (a) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (e.querySelector(Nu(n))) return;
          }
          (a = e.createElement("link")),
            wl(a, "link", l),
            Xl(a),
            e.head.appendChild(a);
        }
      }
    }
    function hv(l, t, e) {
      It.S(l, t, e);
      var a = Ea;
      if (a && l) {
        var u = we(a).hoistableStyles,
          n = za(l);
        t = t || "default";
        var i = u.get(n);
        if (!i) {
          var c = { loading: 0, preload: null };
          if ((i = a.querySelector(Su(n)))) c.loading = 5;
          else {
            (l = U({ rel: "stylesheet", href: l, "data-precedence": t }, e)),
              (e = Tt.get(n)) && df(l, e);
            var s = (i = a.createElement("link"));
            Xl(s),
              wl(s, "link", l),
              (s._p = new Promise(function (y, j) {
                (s.onload = y), (s.onerror = j);
              })),
              s.addEventListener("load", function () {
                c.loading |= 1;
              }),
              s.addEventListener("error", function () {
                c.loading |= 2;
              }),
              (c.loading |= 4),
              Rn(i, t, a);
          }
          (i = { type: "stylesheet", instance: i, count: 1, state: c }),
            u.set(n, i);
        }
      }
    }
    function vv(l, t) {
      It.X(l, t);
      var e = Ea;
      if (e && l) {
        var a = we(e).hoistableScripts,
          u = xa(l),
          n = a.get(u);
        n ||
          ((n = e.querySelector(Nu(u))),
          n ||
            ((l = U({ src: l, async: !0 }, t)),
            (t = Tt.get(u)) && of(l, t),
            (n = e.createElement("script")),
            Xl(n),
            wl(n, "link", l),
            e.head.appendChild(n)),
          (n = { type: "script", instance: n, count: 1, state: null }),
          a.set(u, n));
      }
    }
    function yv(l, t) {
      It.M(l, t);
      var e = Ea;
      if (e && l) {
        var a = we(e).hoistableScripts,
          u = xa(l),
          n = a.get(u);
        n ||
          ((n = e.querySelector(Nu(u))),
          n ||
            ((l = U({ src: l, async: !0, type: "module" }, t)),
            (t = Tt.get(u)) && of(l, t),
            (n = e.createElement("script")),
            Xl(n),
            wl(n, "link", l),
            e.head.appendChild(n)),
          (n = { type: "script", instance: n, count: 1, state: null }),
          a.set(u, n));
      }
    }
    function ym(l, t, e, a) {
      var u = (u = w.current) ? Cn(u) : null;
      if (!u) throw Error(h(446));
      switch (l) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof e.precedence == "string" && typeof e.href == "string"
            ? ((t = za(e.href)),
              (e = we(u).hoistableStyles),
              (a = e.get(t)),
              a ||
                ((a = { type: "style", instance: null, count: 0, state: null }),
                e.set(t, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (
            e.rel === "stylesheet" &&
            typeof e.href == "string" &&
            typeof e.precedence == "string"
          ) {
            l = za(e.href);
            var n = we(u).hoistableStyles,
              i = n.get(l);
            if (
              (i ||
                ((u = u.ownerDocument || u),
                (i = {
                  type: "stylesheet",
                  instance: null,
                  count: 0,
                  state: { loading: 0, preload: null },
                }),
                n.set(l, i),
                (n = u.querySelector(Su(l))) &&
                  !n._p &&
                  ((i.instance = n), (i.state.loading = 5)),
                Tt.has(l) ||
                  ((e = {
                    rel: "preload",
                    as: "style",
                    href: e.href,
                    crossOrigin: e.crossOrigin,
                    integrity: e.integrity,
                    media: e.media,
                    hrefLang: e.hrefLang,
                    referrerPolicy: e.referrerPolicy,
                  }),
                  Tt.set(l, e),
                  n || gv(u, l, e, i.state))),
              t && a === null)
            )
              throw Error(h(528, ""));
            return i;
          }
          if (t && a !== null) throw Error(h(529, ""));
          return null;
        case "script":
          return (
            (t = e.async),
            (e = e.src),
            typeof e == "string" &&
            t &&
            typeof t != "function" &&
            typeof t != "symbol"
              ? ((t = xa(e)),
                (e = we(u).hoistableScripts),
                (a = e.get(t)),
                a ||
                  ((a = {
                    type: "script",
                    instance: null,
                    count: 0,
                    state: null,
                  }),
                  e.set(t, a)),
                a)
              : { type: "void", instance: null, count: 0, state: null }
          );
        default:
          throw Error(h(444, l));
      }
    }
    function za(l) {
      return 'href="' + St(l) + '"';
    }
    function Su(l) {
      return 'link[rel="stylesheet"][' + l + "]";
    }
    function gm(l) {
      return U({}, l, { "data-precedence": l.precedence, precedence: null });
    }
    function gv(l, t, e, a) {
      l.querySelector('link[rel="preload"][as="style"][' + t + "]")
        ? (a.loading = 1)
        : ((t = l.createElement("link")),
          (a.preload = t),
          t.addEventListener("load", function () {
            return (a.loading |= 1);
          }),
          t.addEventListener("error", function () {
            return (a.loading |= 2);
          }),
          wl(t, "link", e),
          Xl(t),
          l.head.appendChild(t));
    }
    function xa(l) {
      return '[src="' + St(l) + '"]';
    }
    function Nu(l) {
      return "script[async]" + l;
    }
    function bm(l, t, e) {
      if ((t.count++, t.instance === null))
        switch (t.type) {
          case "style":
            var a = l.querySelector('style[data-href~="' + St(e.href) + '"]');
            if (a) return (t.instance = a), Xl(a), a;
            var u = U({}, e, {
              "data-href": e.href,
              "data-precedence": e.precedence,
              href: null,
              precedence: null,
            });
            return (
              (a = (l.ownerDocument || l).createElement("style")),
              Xl(a),
              wl(a, "style", u),
              Rn(a, e.precedence, l),
              (t.instance = a)
            );
          case "stylesheet":
            u = za(e.href);
            var n = l.querySelector(Su(u));
            if (n) return (t.state.loading |= 4), (t.instance = n), Xl(n), n;
            (a = gm(e)),
              (u = Tt.get(u)) && df(a, u),
              (n = (l.ownerDocument || l).createElement("link")),
              Xl(n);
            var i = n;
            return (
              (i._p = new Promise(function (c, s) {
                (i.onload = c), (i.onerror = s);
              })),
              wl(n, "link", a),
              (t.state.loading |= 4),
              Rn(n, e.precedence, l),
              (t.instance = n)
            );
          case "script":
            return (
              (n = xa(e.src)),
              (u = l.querySelector(Nu(n)))
                ? ((t.instance = u), Xl(u), u)
                : ((a = e),
                  (u = Tt.get(n)) && ((a = U({}, e)), of(a, u)),
                  (l = l.ownerDocument || l),
                  (u = l.createElement("script")),
                  Xl(u),
                  wl(u, "link", a),
                  l.head.appendChild(u),
                  (t.instance = u))
            );
          case "void":
            return null;
          default:
            throw Error(h(443, t.type));
        }
      else
        t.type === "stylesheet" &&
          (t.state.loading & 4) === 0 &&
          ((a = t.instance), (t.state.loading |= 4), Rn(a, e.precedence, l));
      return t.instance;
    }
    function Rn(l, t, e) {
      for (
        var a = e.querySelectorAll(
            'link[rel="stylesheet"][data-precedence],style[data-precedence]'
          ),
          u = a.length ? a[a.length - 1] : null,
          n = u,
          i = 0;
        i < a.length;
        i++
      ) {
        var c = a[i];
        if (c.dataset.precedence === t) n = c;
        else if (n !== u) break;
      }
      n
        ? n.parentNode.insertBefore(l, n.nextSibling)
        : ((t = e.nodeType === 9 ? e.head : e),
          t.insertBefore(l, t.firstChild));
    }
    function df(l, t) {
      l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
        l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
        l.title == null && (l.title = t.title);
    }
    function of(l, t) {
      l.crossOrigin == null && (l.crossOrigin = t.crossOrigin),
        l.referrerPolicy == null && (l.referrerPolicy = t.referrerPolicy),
        l.integrity == null && (l.integrity = t.integrity);
    }
    var Hn = null;
    function Sm(l, t, e) {
      if (Hn === null) {
        var a = new Map(),
          u = (Hn = new Map());
        u.set(e, a);
      } else (u = Hn), (a = u.get(e)), a || ((a = new Map()), u.set(e, a));
      if (a.has(l)) return a;
      for (
        a.set(l, null), e = e.getElementsByTagName(l), u = 0;
        u < e.length;
        u++
      ) {
        var n = e[u];
        if (
          !(
            n[qa] ||
            n[Vl] ||
            (l === "link" && n.getAttribute("rel") === "stylesheet")
          ) &&
          n.namespaceURI !== "http://www.w3.org/2000/svg"
        ) {
          var i = n.getAttribute(t) || "";
          i = l + i;
          var c = a.get(i);
          c ? c.push(n) : a.set(i, [n]);
        }
      }
      return a;
    }
    function Nm(l, t, e) {
      (l = l.ownerDocument || l),
        l.head.insertBefore(
          e,
          t === "title" ? l.querySelector("head > title") : null
        );
    }
    function bv(l, t, e) {
      if (e === 1 || t.itemProp != null) return !1;
      switch (l) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (
            typeof t.precedence != "string" ||
            typeof t.href != "string" ||
            t.href === ""
          )
            break;
          return !0;
        case "link":
          if (
            typeof t.rel != "string" ||
            typeof t.href != "string" ||
            t.href === "" ||
            t.onLoad ||
            t.onError
          )
            break;
          switch (t.rel) {
            case "stylesheet":
              return (
                (l = t.disabled), typeof t.precedence == "string" && l == null
              );
            default:
              return !0;
          }
        case "script":
          if (
            t.async &&
            typeof t.async != "function" &&
            typeof t.async != "symbol" &&
            !t.onLoad &&
            !t.onError &&
            t.src &&
            typeof t.src == "string"
          )
            return !0;
      }
      return !1;
    }
    function pm(l) {
      return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
    }
    function Sv(l, t, e, a) {
      if (
        e.type === "stylesheet" &&
        (typeof a.media != "string" || matchMedia(a.media).matches !== !1) &&
        (e.state.loading & 4) === 0
      ) {
        if (e.instance === null) {
          var u = za(a.href),
            n = t.querySelector(Su(u));
          if (n) {
            (t = n._p),
              t !== null &&
                typeof t == "object" &&
                typeof t.then == "function" &&
                (l.count++, (l = qn.bind(l)), t.then(l, l)),
              (e.state.loading |= 4),
              (e.instance = n),
              Xl(n);
            return;
          }
          (n = t.ownerDocument || t),
            (a = gm(a)),
            (u = Tt.get(u)) && df(a, u),
            (n = n.createElement("link")),
            Xl(n);
          var i = n;
          (i._p = new Promise(function (c, s) {
            (i.onload = c), (i.onerror = s);
          })),
            wl(n, "link", a),
            (e.instance = n);
        }
        l.stylesheets === null && (l.stylesheets = new Map()),
          l.stylesheets.set(e, t),
          (t = e.state.preload) &&
            (e.state.loading & 3) === 0 &&
            (l.count++,
            (e = qn.bind(l)),
            t.addEventListener("load", e),
            t.addEventListener("error", e));
      }
    }
    var mf = 0;
    function Nv(l, t) {
      return (
        l.stylesheets && l.count === 0 && Bn(l, l.stylesheets),
        0 < l.count || 0 < l.imgCount
          ? function (e) {
              var a = setTimeout(function () {
                if ((l.stylesheets && Bn(l, l.stylesheets), l.unsuspend)) {
                  var n = l.unsuspend;
                  (l.unsuspend = null), n();
                }
              }, 6e4 + t);
              0 < l.imgBytes && mf === 0 && (mf = 62500 * lv());
              var u = setTimeout(function () {
                if (
                  ((l.waitingForImages = !1),
                  l.count === 0 &&
                    (l.stylesheets && Bn(l, l.stylesheets), l.unsuspend))
                ) {
                  var n = l.unsuspend;
                  (l.unsuspend = null), n();
                }
              }, (l.imgBytes > mf ? 50 : 800) + t);
              return (
                (l.unsuspend = e),
                function () {
                  (l.unsuspend = null), clearTimeout(a), clearTimeout(u);
                }
              );
            }
          : null
      );
    }
    function qn() {
      if (
        (this.count--,
        this.count === 0 && (this.imgCount === 0 || !this.waitingForImages))
      ) {
        if (this.stylesheets) Bn(this, this.stylesheets);
        else if (this.unsuspend) {
          var l = this.unsuspend;
          (this.unsuspend = null), l();
        }
      }
    }
    var Yn = null;
    function Bn(l, t) {
      (l.stylesheets = null),
        l.unsuspend !== null &&
          (l.count++,
          (Yn = new Map()),
          t.forEach(pv, l),
          (Yn = null),
          qn.call(l));
    }
    function pv(l, t) {
      if (!(t.state.loading & 4)) {
        var e = Yn.get(l);
        if (e) var a = e.get(null);
        else {
          (e = new Map()), Yn.set(l, e);
          for (
            var u = l.querySelectorAll(
                "link[data-precedence],style[data-precedence]"
              ),
              n = 0;
            n < u.length;
            n++
          ) {
            var i = u[n];
            (i.nodeName === "LINK" || i.getAttribute("media") !== "not all") &&
              (e.set(i.dataset.precedence, i), (a = i));
          }
          a && e.set(null, a);
        }
        (u = t.instance),
          (i = u.getAttribute("data-precedence")),
          (n = e.get(i) || a),
          n === a && e.set(null, u),
          e.set(i, u),
          this.count++,
          (a = qn.bind(this)),
          u.addEventListener("load", a),
          u.addEventListener("error", a),
          n
            ? n.parentNode.insertBefore(u, n.nextSibling)
            : ((l = l.nodeType === 9 ? l.head : l),
              l.insertBefore(u, l.firstChild)),
          (t.state.loading |= 4);
      }
    }
    var pu = {
      $$typeof: hl,
      Provider: null,
      Consumer: null,
      _currentValue: O,
      _currentValue2: O,
      _threadCount: 0,
    };
    function Av(l, t, e, a, u, n, i, c, s) {
      (this.tag = 1),
        (this.containerInfo = l),
        (this.pingCache = this.current = this.pendingChildren = null),
        (this.timeoutHandle = -1),
        (this.callbackNode =
          this.next =
          this.pendingContext =
          this.context =
          this.cancelPendingCommit =
            null),
        (this.callbackPriority = 0),
        (this.expirationTimes = ii(-1)),
        (this.entangledLanes =
          this.shellSuspendCounter =
          this.errorRecoveryDisabledLanes =
          this.expiredLanes =
          this.warmLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = ii(0)),
        (this.hiddenUpdates = ii(null)),
        (this.identifierPrefix = a),
        (this.onUncaughtError = u),
        (this.onCaughtError = n),
        (this.onRecoverableError = i),
        (this.pooledCache = null),
        (this.pooledCacheLanes = 0),
        (this.formState = s),
        (this.incompleteTransitions = new Map());
    }
    function Am(l, t, e, a, u, n, i, c, s, y, j, x) {
      return (
        (l = new Av(l, t, e, i, s, y, j, x, c)),
        (t = 1),
        n === !0 && (t |= 24),
        (n = mt(3, null, null, t)),
        (l.current = n),
        (n.stateNode = l),
        (t = Li()),
        t.refCount++,
        (l.pooledCache = t),
        t.refCount++,
        (n.memoizedState = { element: a, isDehydrated: e, cache: t }),
        Wi(n),
        l
      );
    }
    function jm(l) {
      return l ? ((l = aa), l) : aa;
    }
    function Em(l, t, e, a, u, n) {
      (u = jm(u)),
        a.context === null ? (a.context = u) : (a.pendingContext = u),
        (a = ce(t)),
        (a.payload = { element: e }),
        (n = n === void 0 ? null : n),
        n !== null && (a.callback = n),
        (e = fe(l, a, t)),
        e !== null && (it(e, l, t), Pa(e, l, t));
    }
    function zm(l, t) {
      if (((l = l.memoizedState), l !== null && l.dehydrated !== null)) {
        var e = l.retryLane;
        l.retryLane = e !== 0 && e < t ? e : t;
      }
    }
    function rf(l, t) {
      zm(l, t), (l = l.alternate) && zm(l, t);
    }
    function xm(l) {
      if (l.tag === 13 || l.tag === 31) {
        var t = De(l, 67108864);
        t !== null && it(t, l, 67108864), rf(l, 67108864);
      }
    }
    function Tm(l) {
      if (l.tag === 13 || l.tag === 31) {
        var t = gt();
        t = ci(t);
        var e = De(l, t);
        e !== null && it(e, l, t), rf(l, t);
      }
    }
    var Gn = !0;
    function jv(l, t, e, a) {
      var u = A.T;
      A.T = null;
      var n = T.p;
      try {
        (T.p = 2), hf(l, t, e, a);
      } finally {
        (T.p = n), (A.T = u);
      }
    }
    function Ev(l, t, e, a) {
      var u = A.T;
      A.T = null;
      var n = T.p;
      try {
        (T.p = 8), hf(l, t, e, a);
      } finally {
        (T.p = n), (A.T = u);
      }
    }
    function hf(l, t, e, a) {
      if (Gn) {
        var u = vf(a);
        if (u === null) Pc(l, t, a, Xn, e), Mm(l, a);
        else if (xv(u, l, t, e, a)) a.stopPropagation();
        else if ((Mm(l, a), t & 4 && -1 < zv.indexOf(l))) {
          for (; u !== null; ) {
            var n = Je(u);
            if (n !== null)
              switch (n.tag) {
                case 3:
                  if (
                    ((n = n.stateNode), n.current.memoizedState.isDehydrated)
                  ) {
                    var i = xe(n.pendingLanes);
                    if (i !== 0) {
                      var c = n;
                      for (c.pendingLanes |= 2, c.entangledLanes |= 2; i; ) {
                        var s = 1 << (31 - dt(i));
                        (c.entanglements[1] |= s), (i &= ~s);
                      }
                      Rt(n), (cl & 6) === 0 && ((An = ft() + 500), vu(0));
                    }
                  }
                  break;
                case 31:
                case 13:
                  (c = De(n, 2)), c !== null && it(c, n, 2), En(), rf(n, 2);
              }
            if (((n = vf(a)), n === null && Pc(l, t, a, Xn, e), n === u)) break;
            u = n;
          }
          u !== null && a.stopPropagation();
        } else Pc(l, t, a, null, e);
      }
    }
    function vf(l) {
      return (l = yi(l)), yf(l);
    }
    var Xn = null;
    function yf(l) {
      if (((Xn = null), (l = Ke(l)), l !== null)) {
        var t = G(l);
        if (t === null) l = null;
        else {
          var e = t.tag;
          if (e === 13) {
            if (((l = tl(t)), l !== null)) return l;
            l = null;
          } else if (e === 31) {
            if (((l = k(t)), l !== null)) return l;
            l = null;
          } else if (e === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
              return t.tag === 3 ? t.stateNode.containerInfo : null;
            l = null;
          } else t !== l && (l = null);
        }
      }
      return (Xn = l), null;
    }
    function _m(l) {
      switch (l) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 2;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 8;
        case "message":
          switch (dr()) {
            case Hf:
              return 2;
            case qf:
              return 8;
            case _u:
            case or:
              return 32;
            case Yf:
              return 268435456;
            default:
              return 32;
          }
        default:
          return 32;
      }
    }
    var gf = !1,
      Se = null,
      Ne = null,
      pe = null,
      Au = new Map(),
      ju = new Map(),
      Ae = [],
      zv =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
          " "
        );
    function Mm(l, t) {
      switch (l) {
        case "focusin":
        case "focusout":
          Se = null;
          break;
        case "dragenter":
        case "dragleave":
          Ne = null;
          break;
        case "mouseover":
        case "mouseout":
          pe = null;
          break;
        case "pointerover":
        case "pointerout":
          Au.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          ju.delete(t.pointerId);
      }
    }
    function Eu(l, t, e, a, u, n) {
      return l === null || l.nativeEvent !== n
        ? ((l = {
            blockedOn: t,
            domEventName: e,
            eventSystemFlags: a,
            nativeEvent: n,
            targetContainers: [u],
          }),
          t !== null && ((t = Je(t)), t !== null && xm(t)),
          l)
        : ((l.eventSystemFlags |= a),
          (t = l.targetContainers),
          u !== null && t.indexOf(u) === -1 && t.push(u),
          l);
    }
    function xv(l, t, e, a, u) {
      switch (t) {
        case "focusin":
          return (Se = Eu(Se, l, t, e, a, u)), !0;
        case "dragenter":
          return (Ne = Eu(Ne, l, t, e, a, u)), !0;
        case "mouseover":
          return (pe = Eu(pe, l, t, e, a, u)), !0;
        case "pointerover":
          var n = u.pointerId;
          return Au.set(n, Eu(Au.get(n) || null, l, t, e, a, u)), !0;
        case "gotpointercapture":
          return (
            (n = u.pointerId),
            ju.set(n, Eu(ju.get(n) || null, l, t, e, a, u)),
            !0
          );
      }
      return !1;
    }
    function Om(l) {
      var t = Ke(l.target);
      if (t !== null) {
        var e = G(t);
        if (e !== null) {
          if (((t = e.tag), t === 13)) {
            if (((t = tl(e)), t !== null)) {
              (l.blockedOn = t),
                Vf(l.priority, function () {
                  Tm(e);
                });
              return;
            }
          } else if (t === 31) {
            if (((t = k(e)), t !== null)) {
              (l.blockedOn = t),
                Vf(l.priority, function () {
                  Tm(e);
                });
              return;
            }
          } else if (
            t === 3 &&
            e.stateNode.current.memoizedState.isDehydrated
          ) {
            l.blockedOn = e.tag === 3 ? e.stateNode.containerInfo : null;
            return;
          }
        }
      }
      l.blockedOn = null;
    }
    function Qn(l) {
      if (l.blockedOn !== null) return !1;
      for (var t = l.targetContainers; 0 < t.length; ) {
        var e = vf(l.nativeEvent);
        if (e === null) {
          e = l.nativeEvent;
          var a = new e.constructor(e.type, e);
          (vi = a), e.target.dispatchEvent(a), (vi = null);
        } else return (t = Je(e)), t !== null && xm(t), (l.blockedOn = e), !1;
        t.shift();
      }
      return !0;
    }
    function Dm(l, t, e) {
      Qn(l) && e.delete(t);
    }
    function Tv() {
      (gf = !1),
        Se !== null && Qn(Se) && (Se = null),
        Ne !== null && Qn(Ne) && (Ne = null),
        pe !== null && Qn(pe) && (pe = null),
        Au.forEach(Dm),
        ju.forEach(Dm);
    }
    function Zn(l, t) {
      l.blockedOn === t &&
        ((l.blockedOn = null),
        gf ||
          ((gf = !0),
          p.unstable_scheduleCallback(p.unstable_NormalPriority, Tv)));
    }
    var Vn = null;
    function Um(l) {
      Vn !== l &&
        ((Vn = l),
        p.unstable_scheduleCallback(p.unstable_NormalPriority, function () {
          Vn === l && (Vn = null);
          for (var t = 0; t < l.length; t += 3) {
            var e = l[t],
              a = l[t + 1],
              u = l[t + 2];
            if (typeof a != "function") {
              if (yf(a || e) === null) continue;
              break;
            }
            var n = Je(e);
            n !== null &&
              (l.splice(t, 3),
              (t -= 3),
              hc(
                n,
                { pending: !0, data: u, method: e.method, action: a },
                a,
                u
              ));
          }
        }));
    }
    function Ta(l) {
      function t(s) {
        return Zn(s, l);
      }
      Se !== null && Zn(Se, l),
        Ne !== null && Zn(Ne, l),
        pe !== null && Zn(pe, l),
        Au.forEach(t),
        ju.forEach(t);
      for (var e = 0; e < Ae.length; e++) {
        var a = Ae[e];
        a.blockedOn === l && (a.blockedOn = null);
      }
      for (; 0 < Ae.length && ((e = Ae[0]), e.blockedOn === null); )
        Om(e), e.blockedOn === null && Ae.shift();
      if (((e = (l.ownerDocument || l).$$reactFormReplay), e != null))
        for (a = 0; a < e.length; a += 3) {
          var u = e[a],
            n = e[a + 1],
            i = u[lt] || null;
          if (typeof n == "function") i || Um(e);
          else if (i) {
            var c = null;
            if (n && n.hasAttribute("formAction")) {
              if (((u = n), (i = n[lt] || null))) c = i.formAction;
              else if (yf(u) !== null) continue;
            } else c = i.action;
            typeof c == "function"
              ? (e[a + 1] = c)
              : (e.splice(a, 3), (a -= 3)),
              Um(e);
          }
        }
    }
    function Cm() {
      function l(n) {
        n.canIntercept &&
          n.info === "react-transition" &&
          n.intercept({
            handler: function () {
              return new Promise(function (i) {
                return (u = i);
              });
            },
            focusReset: "manual",
            scroll: "manual",
          });
      }
      function t() {
        u !== null && (u(), (u = null)), a || setTimeout(e, 20);
      }
      function e() {
        if (!a && !navigation.transition) {
          var n = navigation.currentEntry;
          n &&
            n.url != null &&
            navigation.navigate(n.url, {
              state: n.getState(),
              info: "react-transition",
              history: "replace",
            });
        }
      }
      if (typeof navigation == "object") {
        var a = !1,
          u = null;
        return (
          navigation.addEventListener("navigate", l),
          navigation.addEventListener("navigatesuccess", t),
          navigation.addEventListener("navigateerror", t),
          setTimeout(e, 100),
          function () {
            (a = !0),
              navigation.removeEventListener("navigate", l),
              navigation.removeEventListener("navigatesuccess", t),
              navigation.removeEventListener("navigateerror", t),
              u !== null && (u(), (u = null));
          }
        );
      }
    }
    function bf(l) {
      this._internalRoot = l;
    }
    (Ln.prototype.render = bf.prototype.render =
      function (l) {
        var t = this._internalRoot;
        if (t === null) throw Error(h(409));
        var e = t.current,
          a = gt();
        Em(e, a, l, t, null, null);
      }),
      (Ln.prototype.unmount = bf.prototype.unmount =
        function () {
          var l = this._internalRoot;
          if (l !== null) {
            this._internalRoot = null;
            var t = l.containerInfo;
            Em(l.current, 2, null, l, null, null), En(), (t[Le] = null);
          }
        });
    function Ln(l) {
      this._internalRoot = l;
    }
    Ln.prototype.unstable_scheduleHydration = function (l) {
      if (l) {
        var t = Zf();
        l = { blockedOn: null, target: l, priority: t };
        for (var e = 0; e < Ae.length && t !== 0 && t < Ae[e].priority; e++);
        Ae.splice(e, 0, l), e === 0 && Om(l);
      }
    };
    var Rm = R.version;
    if (Rm !== "19.2.0") throw Error(h(527, Rm, "19.2.0"));
    T.findDOMNode = function (l) {
      var t = l._reactInternals;
      if (t === void 0)
        throw typeof l.render == "function"
          ? Error(h(188))
          : ((l = Object.keys(l).join(",")), Error(h(268, l)));
      return (
        (l = N(t)),
        (l = l !== null ? Q(l) : null),
        (l = l === null ? null : l.stateNode),
        l
      );
    };
    var _v = {
      bundleType: 0,
      version: "19.2.0",
      rendererPackageName: "react-dom",
      currentDispatcherRef: A,
      reconcilerVersion: "19.2.0",
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
      var Kn = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!Kn.isDisabled && Kn.supportsFiber)
        try {
          (Ca = Kn.inject(_v)), (st = Kn);
        } catch {}
    }
    return (
      (Ma.createRoot = function (l, t) {
        if (!Y(l)) throw Error(h(299));
        var e = !1,
          a = "",
          u = Xd,
          n = Qd,
          i = Zd;
        return (
          t != null &&
            (t.unstable_strictMode === !0 && (e = !0),
            t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
            t.onUncaughtError !== void 0 && (u = t.onUncaughtError),
            t.onCaughtError !== void 0 && (n = t.onCaughtError),
            t.onRecoverableError !== void 0 && (i = t.onRecoverableError)),
          (t = Am(l, 1, !1, null, null, e, a, null, u, n, i, Cm)),
          (l[Le] = t.current),
          Ic(l),
          new bf(t)
        );
      }),
      (Ma.hydrateRoot = function (l, t, e) {
        if (!Y(l)) throw Error(h(299));
        var a = !1,
          u = "",
          n = Xd,
          i = Qd,
          c = Zd,
          s = null;
        return (
          e != null &&
            (e.unstable_strictMode === !0 && (a = !0),
            e.identifierPrefix !== void 0 && (u = e.identifierPrefix),
            e.onUncaughtError !== void 0 && (n = e.onUncaughtError),
            e.onCaughtError !== void 0 && (i = e.onCaughtError),
            e.onRecoverableError !== void 0 && (c = e.onRecoverableError),
            e.formState !== void 0 && (s = e.formState)),
          (t = Am(l, 1, !0, t, e ?? null, a, u, s, n, i, c, Cm)),
          (t.context = jm(null)),
          (e = t.current),
          (a = gt()),
          (a = ci(a)),
          (u = ce(a)),
          (u.callback = null),
          fe(e, u, a),
          (e = a),
          (t.current.lanes = e),
          Ha(t, e),
          Rt(t),
          (l[Le] = t.current),
          Ic(l),
          new Ln(t)
        );
      }),
      (Ma.version = "19.2.0"),
      Ma
    );
  }
  var Tf;
  function Qm() {
    if (Tf) return Wn.exports;
    Tf = 1;
    function p() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(p);
        } catch (R) {
          console.error(R);
        }
    }
    return p(), (Wn.exports = Xm()), Wn.exports;
  }
  var Zm = Qm();
  const _f = _a(Zm);
  var Vm = Object.defineProperty,
    Lm = (p, R, D) =>
      R in p
        ? Vm(p, R, { enumerable: !0, configurable: !0, writable: !0, value: D })
        : (p[R] = D),
    zu = (p, R, D) => Lm(p, typeof R != "symbol" ? R + "" : R, D);
  const Km = {
      stringify: (p) => (p ? "true" : "false"),
      parse: (p) => /^[ty1-9]/i.test(p),
    },
    Jm = {
      stringify: (p) => p.name,
      parse: (p, R, D) => {
        const h = (() => {
          if (typeof window < "u" && p in window) return window[p];
          if (typeof global < "u" && p in global) return global[p];
        })();
        return typeof h == "function" ? h.bind(D) : void 0;
      },
    },
    wm = { stringify: (p) => JSON.stringify(p), parse: (p) => JSON.parse(p) };
  function Wm(p) {
    return p.replace(
      /([a-z0-9])([A-Z])/g,
      (R, D, h) => `${D}-${h.toLowerCase()}`
    );
  }
  function Mf(p) {
    return p.replace(/[-:]([a-z])/g, (R, D) => `${D.toUpperCase()}`);
  }
  const Fm = {
      stringify: (p) => p.name,
      parse: (p, R, D) => {
        const h = (() => {
          const Y = Mf(R);
          if (typeof D < "u" && Y in D.container) return D.container[Y];
        })();
        return typeof h == "function" ? h.bind(D) : void 0;
      },
    },
    $m = { stringify: (p) => `${p}`, parse: (p) => parseFloat(p) },
    km = { stringify: (p) => p, parse: (p) => p },
    In = {
      string: km,
      number: $m,
      boolean: Km,
      function: Jm,
      method: Fm,
      json: wm,
    },
    Oa = Symbol.for("r2wc.render"),
    xu = Symbol.for("r2wc.connected"),
    Ee = Symbol.for("r2wc.context"),
    ct = Symbol.for("r2wc.props");
  function Im(p, R, D) {
    var h, Y, G;
    R.props || (R.props = p.propTypes ? Object.keys(p.propTypes) : []),
      R.events || (R.events = []);
    const tl = Array.isArray(R.props) ? R.props.slice() : Object.keys(R.props),
      k = Array.isArray(R.events) ? R.events.slice() : Object.keys(R.events),
      M = {},
      N = {},
      Q = {},
      U = {};
    for (const W of tl) {
      M[W] = Array.isArray(R.props) ? "string" : R.props[W];
      const Z = Wm(W);
      (Q[W] = Z), (U[Z] = W);
    }
    for (const W of k) N[W] = Array.isArray(R.events) ? {} : R.events[W];
    class I extends HTMLElement {
      constructor() {
        super(),
          zu(this, G, !0),
          zu(this, Y),
          zu(this, h, {}),
          zu(this, "container"),
          R.shadow
            ? (this.container = this.attachShadow({ mode: R.shadow }))
            : (this.container = this),
          (this[ct].container = this.container);
        for (const Z of tl) {
          const al = Q[Z],
            rl = this.getAttribute(al),
            fl = M[Z],
            El = fl ? In[fl] : null;
          if (fl === "method") {
            const hl = Mf(al);
            Object.defineProperty(this[ct].container, hl, {
              enumerable: !0,
              configurable: !0,
              get() {
                return this[ct][hl];
              },
              set(Gl) {
                (this[ct][hl] = Gl), this[Oa]();
              },
            }),
              (this[ct][Z] = El.parse(rl, al, this));
          }
          El != null &&
            El.parse &&
            rl &&
            (this[ct][Z] = El.parse(rl, al, this));
        }
        for (const Z of k)
          this[ct][Z] = (al) => {
            const rl = Z.replace(/^on/, "").toLowerCase();
            this.dispatchEvent(new CustomEvent(rl, { detail: al, ...N[Z] }));
          };
      }
      static get observedAttributes() {
        return Object.keys(U);
      }
      connectedCallback() {
        (this[xu] = !0), this[Oa]();
      }
      disconnectedCallback() {
        (this[xu] = !1), this[Ee] && D.unmount(this[Ee]), delete this[Ee];
      }
      attributeChangedCallback(Z, al, rl) {
        const fl = U[Z],
          El = M[fl],
          hl = El ? In[El] : null;
        fl in M &&
          hl != null &&
          hl.parse &&
          rl &&
          ((this[ct][fl] = hl.parse(rl, Z, this)), this[Oa]());
      }
      [((G = xu), (Y = Ee), (h = ct), Oa)]() {
        this[xu] &&
          (this[Ee]
            ? D.update(this[Ee], this[ct])
            : (this[Ee] = D.mount(this.container, p, this[ct])));
      }
    }
    for (const W of tl) {
      const Z = Q[W],
        al = M[W];
      Object.defineProperty(I.prototype, W, {
        enumerable: !0,
        configurable: !0,
        get() {
          return this[ct][W];
        },
        set(rl) {
          this[ct][W] = rl;
          const fl = al ? In[al] : null;
          if (fl != null && fl.stringify) {
            const El = fl.stringify(rl, Z, this);
            this.getAttribute(Z) !== El && this.setAttribute(Z, El);
          } else this[Oa]();
        },
      });
    }
    return I;
  }
  function Of(p, R, D, h = {}) {
    function Y(k, M, N) {
      const Q = R.createElement(M, N);
      if ("createRoot" in D) {
        const U = D.createRoot(k);
        return U.render(Q), { container: k, root: U, ReactComponent: M };
      }
      if ("render" in D)
        return D.render(Q, k), { container: k, ReactComponent: M };
      throw new Error("Invalid ReactDOM instance provided.");
    }
    function G({ container: k, root: M, ReactComponent: N }, Q) {
      const U = R.createElement(N, Q);
      if (M) {
        M.render(U);
        return;
      }
      if ("render" in D) {
        D.render(U, k);
        return;
      }
    }
    function tl({ container: k, root: M }) {
      if (M) {
        M.unmount();
        return;
      }
      if ("unmountComponentAtNode" in D) {
        D.unmountComponentAtNode(k);
        return;
      }
    }
    return Im(p, h, { mount: Y, unmount: tl, update: G });
  }
  var Pn = { exports: {} },
    Da = {};
  /**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Df;
  function Pm() {
    if (Df) return Da;
    Df = 1;
    var p = Symbol.for("react.transitional.element"),
      R = Symbol.for("react.fragment");
    function D(h, Y, G) {
      var tl = null;
      if (
        (G !== void 0 && (tl = "" + G),
        Y.key !== void 0 && (tl = "" + Y.key),
        "key" in Y)
      ) {
        G = {};
        for (var k in Y) k !== "key" && (G[k] = Y[k]);
      } else G = Y;
      return (
        (Y = G.ref),
        {
          $$typeof: p,
          type: h,
          key: tl,
          ref: Y !== void 0 ? Y : null,
          props: G,
        }
      );
    }
    return (Da.Fragment = R), (Da.jsx = D), (Da.jsxs = D), Da;
  }
  var Uf;
  function lr() {
    return Uf || ((Uf = 1), (Pn.exports = Pm())), Pn.exports;
  }
  var f = lr();
  function tr({ page: p, perPage: R, totalItems: D, onPageChange: h }) {
    const Y = Math.max(1, Math.ceil(D / R)),
      G = (N) => (N < 1 || N > Y ? null : h(N)),
      tl = [],
      k = Math.max(1, p - 2),
      M = Math.min(Y, p + 2);
    for (let N = k; N <= M; N++) tl.push(N);
    return f.jsxs("div", {
      className: "d-flex align-items-center justify-content-between mt-3",
      children: [
        f.jsxs("div", {
          className: "text-muted small",
          children: [
            "Page ",
            f.jsx("strong", { children: p }),
            " / ",
            Y,
            " — ",
            D,
            " éléments",
          ],
        }),
        f.jsxs("div", {
          className: "btn-group",
          children: [
            f.jsx("button", {
              className: "btn btn-outline-secondary btn-sm",
              onClick: () => G(1),
              disabled: p === 1,
              children: "«",
            }),
            f.jsx("button", {
              className: "btn btn-outline-secondary btn-sm",
              onClick: () => G(p - 1),
              disabled: p === 1,
              children: "‹",
            }),
            tl.map((N) =>
              f.jsx(
                "button",
                {
                  className: `btn btn-sm ${
                    N === p ? "btn-primary" : "btn-outline-secondary"
                  }`,
                  onClick: () => G(N),
                  children: N,
                },
                N
              )
            ),
            f.jsx("button", {
              className: "btn btn-outline-secondary btn-sm",
              onClick: () => G(p + 1),
              disabled: p === Y,
              children: "›",
            }),
            f.jsx("button", {
              className: "btn btn-outline-secondary btn-sm",
              onClick: () => G(Y),
              disabled: p === Y,
              children: "»",
            }),
          ],
        }),
      ],
    });
  }
  function er({
    alerts: p = [],
    loading: R = !1,
    errorList: D = "",
    toggleError: h = "",
    modules: Y = [],
    niveaux: G = [],
    groupes: tl = [],
    onRefresh: k,
    onCreate: M,
    onUpdate: N,
    onToggle: Q,
  }) {
    const [U, I] = jl.useState(1),
      W = 10,
      Z = p.length,
      al = Math.max(1, Math.ceil(Z / W));
    jl.useEffect(() => {
      U > al && I(al);
    }, [U, al]);
    const rl = jl.useMemo(() => {
        const m = (U - 1) * W;
        return p.slice(m, m + W);
      }, [p, U]),
      fl = jl.useCallback(
        (m) =>
          Y.find(
            (_) =>
              (_.name || "").toLowerCase() === String(m || "").toLowerCase()
          )?.id || "",
        [Y]
      ),
      El = jl.useCallback(
        (m) =>
          G.find(
            (_) =>
              (_.label || "").toLowerCase() === String(m || "").toLowerCase()
          )?.id || "",
        [G]
      ),
      hl = (m) =>
        String(m) === "1"
          ? f.jsx("span", { className: "badge bg-success", children: "Actif" })
          : String(m) === "0"
          ? f.jsx("span", { className: "badge bg-danger", children: "Inactif" })
          : f.jsx("span", {
              className: "badge bg-light text-dark",
              children: m ?? "-",
            }),
      Gl = (m) => {
        const _ = String(m || "").toUpperCase(),
          w =
            _ === "URGENT"
              ? "bg-danger"
              : _ === "INFO"
              ? "bg-info text-dark"
              : "bg-warning text-dark";
        return f.jsx("span", { className: `badge ${w}`, children: m || "-" });
      },
      Fl = (m) => (m ? "text-success" : "text-danger"),
      [_l, V] = jl.useState(""),
      [Cl, Sl] = jl.useState(!1),
      [dl, zl] = jl.useState({
        message: "",
        idNiveauUrgence: "",
        typeAlerte: "URGENT",
        groupeConcerne: "",
        description: "",
        limiteDeclenchement: "",
        idModule: "",
      }),
      [Ml, Pl] = jl.useState(""),
      [$l, Zl] = jl.useState(!1),
      [A, T] = jl.useState(null),
      [O, J] = jl.useState({
        idAlerte: "",
        message: "",
        idNiveauUrgence: "",
        typeAlerte: "URGENT",
        groupeConcerne: "",
        description: "",
        limiteDeclenchement: "",
        idModule: "",
      }),
      il = () => {
        V(""),
          zl({
            message: "",
            idNiveauUrgence: "",
            typeAlerte: "URGENT",
            groupeConcerne: "",
            description: "",
            limiteDeclenchement: "",
            idModule: "",
          });
      },
      o = (m) => {
        Pl(""),
          T(m || null),
          J({
            idAlerte: m?.id || "",
            message: m?.messageAlerte || "",
            idNiveauUrgence: El(m?.niveauDurgence) || "",
            typeAlerte:
              (m?.typeAlert || "URGENT").toUpperCase() === "INFO"
                ? "INFO"
                : "URGENT",
            groupeConcerne: m?.groupeConcerne || "",
            description: m?.vcDescription || "",
            limiteDeclenchement: m?.limiteDeclenchementAlerte || "",
            idModule: fl(m?.moduleConcerne) || "",
          });
      },
      z = () => {
        V(""),
          Sl(!0),
          M?.({
            message: dl.message,
            idNiveauUrgence: dl.idNiveauUrgence,
            typeAlerte: dl.typeAlerte,
            groupeConcerne: dl.groupeConcerne,
            description: dl.description,
            limiteDeclenchement: dl.limiteDeclenchement,
            idModule: dl.idModule,
          }),
          setTimeout(() => Sl(!1), 300);
      },
      b = () => {
        Pl(""),
          Zl(!0),
          N?.({
            idAlerte: O.idAlerte,
            message: O.message,
            idNiveauUrgence: O.idNiveauUrgence,
            typeAlerte: O.typeAlerte,
            groupeConcerne: O.groupeConcerne,
            description: O.description,
            limiteDeclenchement: O.limiteDeclenchement,
            idModule: O.idModule,
          }),
          setTimeout(() => Zl(!1), 300);
      };
    return f.jsxs(f.Fragment, {
      children: [
        f.jsx("div", {
          className: "page-content",
          children: f.jsx("div", {
            className: "container-fluid border-bottom",
            children: f.jsx("div", {
              className: "row mt-3",
              children: f.jsxs("div", {
                className: "col-12",
                children: [
                  f.jsx("div", {
                    className: "card",
                    children: f.jsxs("div", {
                      className: "card-header",
                      children: [
                        f.jsxs("div", {
                          className:
                            "d-flex flex-wrap gap-2 justify-content-between align-items-center",
                          children: [
                            f.jsxs("h1", {
                              className: "text-primary mb-0 h4",
                              children: [
                                f.jsx("i", {
                                  className: "fas fa-building me-2",
                                }),
                                "Liste des alertes",
                              ],
                            }),
                            f.jsxs("div", {
                              className: "d-flex flex-wrap gap-2",
                              children: [
                                f.jsx("button", {
                                  className: "btn btn-outline-secondary",
                                  type: "button",
                                  onClick: () => k?.(),
                                  disabled: R,
                                  children: R
                                    ? f.jsxs(f.Fragment, {
                                        children: [
                                          f.jsx("span", {
                                            className:
                                              "spinner-border spinner-border-sm me-2",
                                          }),
                                          "Chargement…",
                                        ],
                                      })
                                    : f.jsxs(f.Fragment, {
                                        children: [
                                          f.jsx("i", {
                                            className: "fas fa-rotate me-1",
                                          }),
                                          " Recharger",
                                        ],
                                      }),
                                }),
                                f.jsxs("button", {
                                  className: "btn btn-primary",
                                  type: "button",
                                  "data-bs-target": "#createAlerteModal",
                                  "data-bs-toggle": "modal",
                                  onClick: il,
                                  children: [
                                    f.jsx("i", {
                                      className: "fas fa-plus me-1",
                                    }),
                                    " Nouvelle Alerte",
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        D &&
                          f.jsxs("div", {
                            className: "alert alert-danger mt-2 mb-0",
                            children: [
                              f.jsx("i", {
                                className: "fas fa-triangle-exclamation me-2",
                              }),
                              D,
                            ],
                          }),
                        h &&
                          f.jsxs("div", {
                            className: "alert alert-warning mt-2 mb-0",
                            children: [
                              f.jsx("i", {
                                className: "fas fa-circle-exclamation me-2",
                              }),
                              h,
                            ],
                          }),
                      ],
                    }),
                  }),
                  f.jsxs("div", {
                    className: "card border-0 shadow-sm",
                    id: "tableView",
                    children: [
                      f.jsx("div", {
                        className: "card-body p-0",
                        children: f.jsx("div", {
                          className: "table-responsive",
                          children: f.jsxs("table", {
                            className: "table table-hover table-striped mb-0",
                            children: [
                              f.jsx("thead", {
                                className: "table-light",
                                children: f.jsxs("tr", {
                                  children: [
                                    f.jsx("th", { children: "ID" }),
                                    f.jsx("th", { children: "Message" }),
                                    f.jsx("th", { children: "Statut" }),
                                    f.jsx("th", {
                                      children: "Niveau d’urgence",
                                    }),
                                    f.jsx("th", { children: "Type" }),
                                    f.jsx("th", { children: "Groupe" }),
                                    f.jsx("th", { children: "Description" }),
                                    f.jsx("th", { children: "Seuil" }),
                                    f.jsx("th", { children: "Module" }),
                                    f.jsx("th", {
                                      className: "text-center",
                                      children: "Actions",
                                    }),
                                  ],
                                }),
                              }),
                              f.jsxs("tbody", {
                                children: [
                                  R &&
                                    f.jsx("tr", {
                                      children: f.jsxs("td", {
                                        colSpan: 10,
                                        className: "text-center py-4",
                                        children: [
                                          f.jsx("span", {
                                            className: "spinner-border me-2",
                                          }),
                                          "Chargement…",
                                        ],
                                      }),
                                    }),
                                  !R &&
                                    rl.length === 0 &&
                                    f.jsx("tr", {
                                      children: f.jsx("td", {
                                        colSpan: 10,
                                        className:
                                          "text-center py-4 text-muted",
                                        children: "Aucun résultat.",
                                      }),
                                    }),
                                  !R &&
                                    rl.map((m) => {
                                      const _ = String(m.statusAlert) === "1";
                                      return f.jsxs(
                                        "tr",
                                        {
                                          children: [
                                            f.jsx("td", { children: m.id }),
                                            f.jsx("td", {
                                              children: m.messageAlerte || "-",
                                            }),
                                            f.jsx("td", {
                                              children: hl(m.statusAlert),
                                            }),
                                            f.jsx("td", {
                                              children: f.jsx("div", {
                                                className: "d-flex flex-column",
                                                children: f.jsx("strong", {
                                                  className: "small mb-1",
                                                  children:
                                                    m.niveauDurgence || "-",
                                                }),
                                              }),
                                            }),
                                            f.jsx("td", {
                                              children: Gl(m.typeAlert),
                                            }),
                                            f.jsx("td", {
                                              children: m.groupeConcerne || "-",
                                            }),
                                            f.jsx("td", {
                                              className: "small",
                                              children: m.vcDescription || "-",
                                            }),
                                            f.jsx("td", {
                                              children:
                                                m.limiteDeclenchementAlerte ??
                                                "-",
                                            }),
                                            f.jsx("td", {
                                              children: m.moduleConcerne || "-",
                                            }),
                                            f.jsx("td", {
                                              children: f.jsxs("div", {
                                                className:
                                                  "d-flex gap-1 justify-content-center",
                                                children: [
                                                  f.jsx("button", {
                                                    type: "button",
                                                    className:
                                                      "btn btn-outline-warning btn-action btn-sm",
                                                    title: "Modifier",
                                                    "data-bs-target":
                                                      "#editAlerteModal",
                                                    "data-bs-toggle": "modal",
                                                    onClick: () => o(m),
                                                    children: f.jsx("i", {
                                                      className: "fas fa-edit",
                                                    }),
                                                  }),
                                                  f.jsx("button", {
                                                    type: "button",
                                                    className:
                                                      "btn btn-outline-secondary btn-action btn-sm",
                                                    title: _
                                                      ? "Désactiver"
                                                      : "Activer",
                                                    onClick: () =>
                                                      Q?.({
                                                        id: m.id,
                                                        next: _ ? "0" : "1",
                                                      }),
                                                    children: f.jsx("i", {
                                                      className: `fas fa-undo ${Fl(
                                                        _
                                                      )}`,
                                                    }),
                                                  }),
                                                ],
                                              }),
                                            }),
                                          ],
                                        },
                                        m.id
                                      );
                                    }),
                                ],
                              }),
                            ],
                          }),
                        }),
                      }),
                      !R &&
                        Z > 0 &&
                        f.jsx("div", {
                          className: "card-body",
                          children: f.jsx(tr, {
                            page: U,
                            perPage: W,
                            totalItems: Z,
                            onPageChange: I,
                          }),
                        }),
                    ],
                  }),
                ],
              }),
            }),
          }),
        }),
        f.jsx("div", {
          className: "modal fade",
          id: "createAlerteModal",
          tabIndex: "-1",
          role: "dialog",
          "aria-hidden": "true",
          children: f.jsx("div", {
            className: "modal-dialog modal-lg",
            role: "document",
            children: f.jsxs("div", {
              className: "modal-content",
              children: [
                f.jsxs("div", {
                  className: "modal-header",
                  children: [
                    f.jsx("h5", {
                      className: "modal-title",
                      children: "Créer une alerte",
                    }),
                    f.jsx("button", {
                      className: "btn-close btn-close-dark",
                      "data-bs-dismiss": "modal",
                      type: "button",
                      onClick: () => V(""),
                    }),
                  ],
                }),
                f.jsxs("div", {
                  className: "modal-body",
                  children: [
                    _l &&
                      f.jsxs("div", {
                        className: "alert alert-danger",
                        children: [
                          f.jsx("i", {
                            className: "fas fa-triangle-exclamation me-2",
                          }),
                          _l,
                        ],
                      }),
                    f.jsxs("div", {
                      className: "row g-3",
                      children: [
                        f.jsxs("div", {
                          className: "col-md-12",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "add_message",
                              children: "Message *",
                            }),
                            f.jsx("input", {
                              id: "add_message",
                              type: "text",
                              className: "form-control",
                              value: dl.message,
                              onChange: (m) =>
                                zl((_) => ({ ..._, message: m.target.value })),
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-6",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "add_niveau",
                              children: "Niveau d’urgence *",
                            }),
                            f.jsxs("select", {
                              id: "add_niveau",
                              className: "form-select",
                              value: dl.idNiveauUrgence,
                              onChange: (m) =>
                                zl((_) => ({
                                  ..._,
                                  idNiveauUrgence: m.target.value,
                                })),
                              children: [
                                f.jsx("option", {
                                  value: "",
                                  children: "— Sélectionner —",
                                }),
                                G.map((m) =>
                                  f.jsx(
                                    "option",
                                    { value: m.id, children: m.label },
                                    m.id
                                  )
                                ),
                              ],
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-6",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "add_type",
                              children: "Type *",
                            }),
                            f.jsxs("select", {
                              id: "add_type",
                              className: "form-select",
                              value: dl.typeAlerte,
                              onChange: (m) =>
                                zl((_) => ({
                                  ..._,
                                  typeAlerte: m.target.value,
                                })),
                              children: [
                                f.jsx("option", {
                                  value: "URGENT",
                                  children: "URGENT",
                                }),
                                f.jsx("option", {
                                  value: "INFO",
                                  children: "INFO",
                                }),
                              ],
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-6",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "add_groupe",
                              children: "Groupe concerné *",
                            }),
                            f.jsxs("select", {
                              id: "add_groupe",
                              className: "form-select",
                              value: dl.groupeConcerne,
                              onChange: (m) =>
                                zl((_) => ({
                                  ..._,
                                  groupeConcerne: m.target.value,
                                })),
                              children: [
                                f.jsx("option", {
                                  value: "",
                                  children: "— Sélectionner —",
                                }),
                                tl.map((m) =>
                                  f.jsx("option", { value: m, children: m }, m)
                                ),
                              ],
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-6",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "add_module",
                              children: "Module *",
                            }),
                            f.jsxs("select", {
                              id: "add_module",
                              className: "form-select",
                              value: dl.idModule,
                              onChange: (m) =>
                                zl((_) => ({ ..._, idModule: m.target.value })),
                              children: [
                                f.jsx("option", {
                                  value: "",
                                  children: "— Sélectionner —",
                                }),
                                Y.map((m) =>
                                  f.jsx(
                                    "option",
                                    { value: m.id, children: m.name },
                                    m.id
                                  )
                                ),
                              ],
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-6",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "add_seuil",
                              children: "Seuil *",
                            }),
                            f.jsx("input", {
                              id: "add_seuil",
                              type: "number",
                              className: "form-control",
                              value: dl.limiteDeclenchement,
                              onChange: (m) =>
                                zl((_) => ({
                                  ..._,
                                  limiteDeclenchement: m.target.value,
                                })),
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-12",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "add_desc",
                              children: "Description *",
                            }),
                            f.jsx("textarea", {
                              id: "add_desc",
                              className: "form-control",
                              rows: 4,
                              value: dl.description,
                              onChange: (m) =>
                                zl((_) => ({
                                  ..._,
                                  description: m.target.value,
                                })),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                f.jsxs("div", {
                  className: "modal-footer",
                  children: [
                    f.jsx("button", {
                      className: "btn btn-secondary",
                      "data-bs-dismiss": "modal",
                      type: "button",
                      children: "Annuler",
                    }),
                    f.jsx("button", {
                      className: "btn btn-primary",
                      type: "button",
                      onClick: z,
                      disabled: Cl,
                      children: Cl
                        ? f.jsxs(f.Fragment, {
                            children: [
                              f.jsx("span", {
                                className:
                                  "spinner-border spinner-border-sm me-2",
                              }),
                              "Création…",
                            ],
                          })
                        : f.jsx(f.Fragment, { children: "Créer l'alerte" }),
                    }),
                  ],
                }),
              ],
            }),
          }),
        }),
        f.jsx("div", {
          className: "modal fade",
          id: "editAlerteModal",
          tabIndex: "-1",
          role: "dialog",
          "aria-hidden": "true",
          children: f.jsx("div", {
            className: "modal-dialog modal-lg",
            role: "document",
            children: f.jsxs("div", {
              className: "modal-content",
              children: [
                f.jsxs("div", {
                  className: "modal-header",
                  children: [
                    f.jsxs("h5", {
                      className: "modal-title",
                      children: ["Modifier l’alerte ", A?.id ? `${A.id}` : ""],
                    }),
                    f.jsx("button", {
                      className: "btn-close btn-close-dark",
                      "data-bs-dismiss": "modal",
                      type: "button",
                      onClick: () => Pl(""),
                    }),
                  ],
                }),
                f.jsxs("div", {
                  className: "modal-body",
                  children: [
                    Ml &&
                      f.jsxs("div", {
                        className: "alert alert-danger",
                        children: [
                          f.jsx("i", {
                            className: "fas fa-triangle-exclamation me-2",
                          }),
                          Ml,
                        ],
                      }),
                    f.jsxs("div", {
                      className: "row g-3",
                      children: [
                        f.jsxs("div", {
                          className: "col-md-12",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "edit_message",
                              children: "Message",
                            }),
                            f.jsx("input", {
                              id: "edit_message",
                              type: "text",
                              className: "form-control",
                              value: O.message,
                              onChange: (m) =>
                                J((_) => ({ ..._, message: m.target.value })),
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-6",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "edit_niveau",
                              children: "Niveau d’urgence",
                            }),
                            f.jsxs("select", {
                              id: "edit_niveau",
                              className: "form-select",
                              value: O.idNiveauUrgence,
                              onChange: (m) =>
                                J((_) => ({
                                  ..._,
                                  idNiveauUrgence: m.target.value,
                                })),
                              children: [
                                f.jsx("option", {
                                  value: "",
                                  children: "— Sélectionner —",
                                }),
                                G.map((m) =>
                                  f.jsx(
                                    "option",
                                    { value: m.id, children: m.label },
                                    m.id
                                  )
                                ),
                              ],
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-6",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "edit_type",
                              children: "Type",
                            }),
                            f.jsxs("select", {
                              id: "edit_type",
                              className: "form-select",
                              value: O.typeAlerte,
                              onChange: (m) =>
                                J((_) => ({
                                  ..._,
                                  typeAlerte: m.target.value,
                                })),
                              children: [
                                f.jsx("option", {
                                  value: "URGENT",
                                  children: "URGENT",
                                }),
                                f.jsx("option", {
                                  value: "INFO",
                                  children: "INFO",
                                }),
                              ],
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-6",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "edit_groupe",
                              children: "Groupe concerné",
                            }),
                            f.jsxs("select", {
                              id: "edit_groupe",
                              className: "form-select",
                              value: O.groupeConcerne,
                              onChange: (m) =>
                                J((_) => ({
                                  ..._,
                                  groupeConcerne: m.target.value,
                                })),
                              children: [
                                f.jsx("option", {
                                  value: "",
                                  children: "— Sélectionner —",
                                }),
                                tl.map((m) =>
                                  f.jsx("option", { value: m, children: m }, m)
                                ),
                              ],
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-6",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "edit_module",
                              children: "Module",
                            }),
                            f.jsxs("select", {
                              id: "edit_module",
                              className: "form-select",
                              value: O.idModule,
                              onChange: (m) =>
                                J((_) => ({ ..._, idModule: m.target.value })),
                              children: [
                                f.jsx("option", {
                                  value: "",
                                  children: "— Sélectionner —",
                                }),
                                Y.map((m) =>
                                  f.jsx(
                                    "option",
                                    { value: m.id, children: m.name },
                                    m.id
                                  )
                                ),
                              ],
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-6",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "edit_seuil",
                              children: "Seuil",
                            }),
                            f.jsx("input", {
                              id: "edit_seuil",
                              type: "number",
                              className: "form-control",
                              value: O.limiteDeclenchement,
                              onChange: (m) =>
                                J((_) => ({
                                  ..._,
                                  limiteDeclenchement: m.target.value,
                                })),
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-12",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "edit_desc",
                              children: "Description",
                            }),
                            f.jsx("textarea", {
                              id: "edit_desc",
                              className: "form-control",
                              rows: 4,
                              value: O.description,
                              onChange: (m) =>
                                J((_) => ({
                                  ..._,
                                  description: m.target.value,
                                })),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                f.jsxs("div", {
                  className: "modal-footer",
                  children: [
                    f.jsx("button", {
                      className: "btn btn-secondary",
                      "data-bs-dismiss": "modal",
                      type: "button",
                      children: "Annuler",
                    }),
                    f.jsx("button", {
                      className: "btn btn-primary",
                      type: "button",
                      onClick: b,
                      disabled: $l,
                      children: $l
                        ? f.jsxs(f.Fragment, {
                            children: [
                              f.jsx("span", {
                                className:
                                  "spinner-border spinner-border-sm me-2",
                              }),
                              "Enregistrement…",
                            ],
                          })
                        : f.jsx(f.Fragment, { children: "Enregistrer" }),
                    }),
                  ],
                }),
              ],
            }),
          }),
        }),
      ],
    });
  }
  function ar({ page: p, perPage: R, totalItems: D, onPageChange: h }) {
    const Y = Math.max(1, Math.ceil(D / R)),
      G = (N) => (N < 1 || N > Y ? null : h(N)),
      tl = [],
      k = Math.max(1, p - 2),
      M = Math.min(Y, p + 2);
    for (let N = k; N <= M; N++) tl.push(N);
    return f.jsxs("div", {
      className: "d-flex align-items-center justify-content-between mt-3",
      children: [
        f.jsxs("div", {
          className: "text-muted small",
          children: [
            "Page ",
            f.jsx("strong", { children: p }),
            " / ",
            Y,
            " — ",
            D,
            " éléments",
          ],
        }),
        f.jsxs("div", {
          className: "btn-group",
          children: [
            f.jsx("button", {
              className: "btn btn-outline-secondary btn-sm",
              onClick: () => G(1),
              disabled: p === 1,
              children: "«",
            }),
            f.jsx("button", {
              className: "btn btn-outline-secondary btn-sm",
              onClick: () => G(p - 1),
              disabled: p === 1,
              children: "‹",
            }),
            tl.map((N) =>
              f.jsx(
                "button",
                {
                  className: `btn btn-sm ${
                    N === p ? "btn-primary" : "btn-outline-secondary"
                  }`,
                  onClick: () => G(N),
                  children: N,
                },
                N
              )
            ),
            f.jsx("button", {
              className: "btn btn-outline-secondary btn-sm",
              onClick: () => G(p + 1),
              disabled: p === Y,
              children: "›",
            }),
            f.jsx("button", {
              className: "btn btn-outline-secondary btn-sm",
              onClick: () => G(Y),
              disabled: p === Y,
              children: "»",
            }),
          ],
        }),
      ],
    });
  }
  function ur({
    items: p = [],
    modules: R = [],
    niveaux: D = [],
    loading: h = !1,
    errorList: Y = "",
    metaLoading: G = !1,
    metaError: tl = "",
    toggleError: k = "",
    onRefresh: M,
    onCreate: N,
    onUpdate: Q,
    onToggle: U,
  }) {
    const [I, W] = jl.useState(1),
      Z = 10,
      al = p.length,
      rl = Math.max(1, Math.ceil(al / Z));
    jl.useEffect(() => {
      I > rl && W(rl);
    }, [I, rl]);
    const fl = jl.useMemo(() => {
        const b = (I - 1) * Z;
        return p.slice(b, b + Z);
      }, [p, I]),
      El = (b) => {
        const m = String(b || "").toUpperCase(),
          _ = m === "URGENT" ? "bg-danger" : "bg-info text-dark";
        return f.jsx("span", { className: `badge ${_}`, children: m || "-" });
      },
      hl = (b) =>
        String(b) === "1"
          ? f.jsx("span", { className: "badge bg-success", children: "Actif" })
          : f.jsx("span", {
              className: "badge bg-danger",
              children: "Inactif",
            }),
      Gl = (b) => (b ? "text-success" : "text-danger"),
      [Fl, _l] = jl.useState(""),
      [V, Cl] = jl.useState(!1),
      [Sl, dl] = jl.useState({
        message: "",
        idNiveauUrgence: "",
        typeAlerte: "INFO",
        description: "",
        limiteDeclenchement: "",
        idModule: "",
      }),
      [zl, Ml] = jl.useState(""),
      [Pl, $l] = jl.useState(!1),
      [Zl, A] = jl.useState(null),
      [T, O] = jl.useState({
        idAlerte: "",
        message: "",
        idNiveauUrgence: "",
        typeAlerte: "INFO",
        description: "",
        limiteDeclenchement: "",
        idModule: "",
      }),
      J = () => {
        _l(""),
          dl({
            message: "",
            idNiveauUrgence: "",
            typeAlerte: "INFO",
            description: "",
            limiteDeclenchement: "",
            idModule: "",
          });
      },
      il = (b) => {
        Ml(""),
          A(b || null),
          O({
            idAlerte: b?.id || "",
            message: b?.messageNotification || "",
            idNiveauUrgence: "",
            typeAlerte:
              (b?.type || "INFO").toUpperCase() === "URGENT"
                ? "URGENT"
                : "INFO",
            description: b?.vcDescription || "",
            limiteDeclenchement: b?.limiteDeclenchementNotification || "",
            idModule: "",
          });
      },
      o = () => {
        _l(""),
          Cl(!0),
          N?.({
            message: Sl.message,
            idNiveauUrgence: Sl.idNiveauUrgence,
            typeAlerte: Sl.typeAlerte,
            description: Sl.description,
            limiteDeclenchement: Sl.limiteDeclenchement,
            idModule: Sl.idModule,
          }),
          setTimeout(() => Cl(!1), 300);
      },
      z = () => {
        Ml(""),
          $l(!0),
          Q?.({
            idAlerte: T.idAlerte,
            message: T.message,
            idNiveauUrgence: T.idNiveauUrgence,
            typeAlerte: T.typeAlerte,
            description: T.description,
            limiteDeclenchement: T.limiteDeclenchement,
            idModule: T.idModule,
          }),
          setTimeout(() => $l(!1), 300);
      };
    return f.jsxs(f.Fragment, {
      children: [
        f.jsx("div", {
          className: "page-content",
          children: f.jsx("div", {
            className: "container-fluid border-bottom",
            children: f.jsx("div", {
              className: "row mt-3",
              children: f.jsxs("div", {
                className: "col-12",
                children: [
                  f.jsx("div", {
                    className: "card",
                    children: f.jsxs("div", {
                      className: "card-header",
                      children: [
                        f.jsxs("div", {
                          className:
                            "d-flex justify-content-between align-items-center",
                          children: [
                            f.jsxs("h1", {
                              className: "text-primary mb-1 h4",
                              children: [
                                f.jsx("i", {
                                  className: "fas fa-building me-2",
                                }),
                                " Liste des notifications",
                              ],
                            }),
                            f.jsxs("div", {
                              className: "d-flex gap-2",
                              children: [
                                f.jsx("button", {
                                  className: "btn btn-outline-secondary",
                                  type: "button",
                                  onClick: () => M?.(),
                                  disabled: h,
                                  children: h
                                    ? f.jsxs(f.Fragment, {
                                        children: [
                                          f.jsx("span", {
                                            className:
                                              "spinner-border spinner-border-sm me-2",
                                          }),
                                          "Chargement…",
                                        ],
                                      })
                                    : f.jsxs(f.Fragment, {
                                        children: [
                                          f.jsx("i", {
                                            className: "fas fa-rotate me-1",
                                          }),
                                          " Recharger",
                                        ],
                                      }),
                                }),
                                f.jsxs("button", {
                                  className: "btn btn-primary",
                                  type: "button",
                                  "data-bs-toggle": "modal",
                                  "data-bs-target": "#createNotificationModal",
                                  onClick: J,
                                  children: [
                                    f.jsx("i", {
                                      className: "fas fa-plus me-1",
                                    }),
                                    " Nouvelle notification",
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        G &&
                          f.jsxs("div", {
                            className: "alert alert-secondary mt-2 mb-0",
                            children: [
                              f.jsx("span", {
                                className:
                                  "spinner-border spinner-border-sm me-2",
                              }),
                              "Chargement des listes…",
                            ],
                          }),
                        tl &&
                          f.jsxs("div", {
                            className: "alert alert-warning mt-2 mb-0",
                            children: [
                              f.jsx("i", {
                                className: "fas fa-circle-exclamation me-2",
                              }),
                              tl,
                            ],
                          }),
                        Y &&
                          f.jsxs("div", {
                            className: "alert alert-danger mt-2 mb-0",
                            children: [
                              f.jsx("i", {
                                className: "fas fa-triangle-exclamation me-2",
                              }),
                              Y,
                            ],
                          }),
                        k &&
                          f.jsxs("div", {
                            className: "alert alert-warning mt-2 mb-0",
                            children: [
                              f.jsx("i", {
                                className: "fas fa-circle-exclamation me-2",
                              }),
                              k,
                            ],
                          }),
                      ],
                    }),
                  }),
                  f.jsxs("div", {
                    className: "card border-0 shadow-sm",
                    id: "tableView",
                    children: [
                      f.jsx("div", {
                        className: "card-body p-0",
                        children: f.jsx("div", {
                          className: "table-responsive",
                          children: f.jsxs("table", {
                            className: "table table-hover table-striped mb-0",
                            children: [
                              f.jsx("thead", {
                                className: "table-light",
                                children: f.jsxs("tr", {
                                  children: [
                                    f.jsx("th", { children: "ID" }),
                                    f.jsx("th", { children: "Message" }),
                                    f.jsx("th", { children: "Statut" }),
                                    f.jsx("th", { children: "Type" }),
                                    f.jsx("th", { children: "Description" }),
                                    f.jsx("th", { children: "Seuil" }),
                                    f.jsx("th", {
                                      children: "Niveau d’urgence",
                                    }),
                                    f.jsx("th", { children: "Module" }),
                                    f.jsx("th", {
                                      className: "text-center",
                                      children: "Actions",
                                    }),
                                  ],
                                }),
                              }),
                              f.jsxs("tbody", {
                                children: [
                                  h &&
                                    f.jsx("tr", {
                                      children: f.jsxs("td", {
                                        colSpan: 9,
                                        className: "text-center py-4",
                                        children: [
                                          f.jsx("span", {
                                            className: "spinner-border me-2",
                                          }),
                                          "Chargement…",
                                        ],
                                      }),
                                    }),
                                  !h &&
                                    fl.length === 0 &&
                                    f.jsx("tr", {
                                      children: f.jsx("td", {
                                        colSpan: 9,
                                        className:
                                          "text-center py-4 text-muted",
                                        children: "Aucun élément.",
                                      }),
                                    }),
                                  !h &&
                                    fl.map((b) => {
                                      const m =
                                        String(b.statusNotification) === "1";
                                      return f.jsxs(
                                        "tr",
                                        {
                                          children: [
                                            f.jsx("td", { children: b.id }),
                                            f.jsx("td", {
                                              children:
                                                b.messageNotification || "-",
                                            }),
                                            f.jsx("td", {
                                              children: hl(
                                                b.statusNotification
                                              ),
                                            }),
                                            f.jsx("td", {
                                              children: El(b.type),
                                            }),
                                            f.jsx("td", {
                                              className: "small",
                                              children: b.vcDescription || "-",
                                            }),
                                            f.jsx("td", {
                                              children:
                                                b.limiteDeclenchementNotification ??
                                                "-",
                                            }),
                                            f.jsx("td", {
                                              children: b.niveauDurgence || "-",
                                            }),
                                            f.jsx("td", {
                                              children: b.moduleConcerne || "-",
                                            }),
                                            f.jsx("td", {
                                              children: f.jsxs("div", {
                                                className:
                                                  "d-flex gap-1 justify-content-center",
                                                children: [
                                                  f.jsx("button", {
                                                    type: "button",
                                                    className:
                                                      "btn btn-outline-warning btn-action btn-sm",
                                                    title: "Modifier",
                                                    "data-bs-toggle": "modal",
                                                    "data-bs-target":
                                                      "#editNotificationModal",
                                                    onClick: () => il(b),
                                                    children: f.jsx("i", {
                                                      className: "fas fa-edit",
                                                    }),
                                                  }),
                                                  f.jsx("button", {
                                                    type: "button",
                                                    className:
                                                      "btn btn-outline-secondary btn-action btn-sm",
                                                    title: m
                                                      ? "Désactiver"
                                                      : "Activer",
                                                    onClick: () =>
                                                      U?.({
                                                        id: b.id,
                                                        next: m ? "0" : "1",
                                                      }),
                                                    children: f.jsx("i", {
                                                      className: `fas fa-undo ${Gl(
                                                        m
                                                      )}`,
                                                    }),
                                                  }),
                                                ],
                                              }),
                                            }),
                                          ],
                                        },
                                        b.id
                                      );
                                    }),
                                ],
                              }),
                            ],
                          }),
                        }),
                      }),
                      !h &&
                        al > 0 &&
                        f.jsx("div", {
                          className: "card-body",
                          children: f.jsx(ar, {
                            page: I,
                            perPage: Z,
                            totalItems: al,
                            onPageChange: W,
                          }),
                        }),
                    ],
                  }),
                ],
              }),
            }),
          }),
        }),
        f.jsx("div", {
          className: "modal fade",
          role: "dialog",
          tabIndex: -1,
          id: "createNotificationModal",
          children: f.jsx("div", {
            className: "modal-dialog modal-lg",
            role: "document",
            children: f.jsxs("div", {
              className: "modal-content",
              children: [
                f.jsxs("div", {
                  className: "modal-header",
                  children: [
                    f.jsx("h5", {
                      className: "modal-title",
                      children: "Créer une notification",
                    }),
                    f.jsx("button", {
                      className: "btn-close btn-close-dark",
                      "data-bs-dismiss": "modal",
                      type: "button",
                      onClick: () => _l(""),
                    }),
                  ],
                }),
                f.jsxs("div", {
                  className: "modal-body",
                  children: [
                    Fl &&
                      f.jsxs("div", {
                        className: "alert alert-danger",
                        children: [
                          f.jsx("i", {
                            className: "fas fa-triangle-exclamation me-2",
                          }),
                          Fl,
                        ],
                      }),
                    f.jsxs("div", {
                      className: "row g-3",
                      children: [
                        f.jsxs("div", {
                          className: "col-md-12",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "add_msg",
                              children: "Message *",
                            }),
                            f.jsx("input", {
                              id: "add_msg",
                              type: "text",
                              className: "form-control",
                              value: Sl.message,
                              onChange: (b) =>
                                dl((m) => ({ ...m, message: b.target.value })),
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-6",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "add_type",
                              children: "Type *",
                            }),
                            f.jsxs("select", {
                              id: "add_type",
                              className: "form-select",
                              value: Sl.typeAlerte,
                              onChange: (b) =>
                                dl((m) => ({
                                  ...m,
                                  typeAlerte: b.target.value,
                                })),
                              children: [
                                f.jsx("option", {
                                  value: "INFO",
                                  children: "INFO",
                                }),
                                f.jsx("option", {
                                  value: "URGENT",
                                  children: "URGENT",
                                }),
                              ],
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-6",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "add_niveau",
                              children: "Niveau d’urgence *",
                            }),
                            f.jsxs("select", {
                              id: "add_niveau",
                              className: "form-select",
                              value: Sl.idNiveauUrgence,
                              onChange: (b) =>
                                dl((m) => ({
                                  ...m,
                                  idNiveauUrgence: b.target.value,
                                })),
                              children: [
                                f.jsx("option", {
                                  value: "",
                                  children: "— Sélectionner —",
                                }),
                                D.map((b) =>
                                  f.jsx(
                                    "option",
                                    { value: b.id, children: b.label },
                                    b.id
                                  )
                                ),
                              ],
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-6",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "add_module",
                              children: "Module *",
                            }),
                            f.jsxs("select", {
                              id: "add_module",
                              className: "form-select",
                              value: Sl.idModule,
                              onChange: (b) =>
                                dl((m) => ({ ...m, idModule: b.target.value })),
                              children: [
                                f.jsx("option", {
                                  value: "",
                                  children: "— Sélectionner —",
                                }),
                                R.map((b) =>
                                  f.jsx(
                                    "option",
                                    { value: b.id, children: b.name },
                                    b.id
                                  )
                                ),
                              ],
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-6",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "add_seuil",
                              children: "Seuil *",
                            }),
                            f.jsx("input", {
                              id: "add_seuil",
                              type: "number",
                              className: "form-control",
                              value: Sl.limiteDeclenchement,
                              onChange: (b) =>
                                dl((m) => ({
                                  ...m,
                                  limiteDeclenchement: b.target.value,
                                })),
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-12",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "add_desc",
                              children: "Description *",
                            }),
                            f.jsx("textarea", {
                              id: "add_desc",
                              className: "form-control",
                              rows: 4,
                              value: Sl.description,
                              onChange: (b) =>
                                dl((m) => ({
                                  ...m,
                                  description: b.target.value,
                                })),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                f.jsxs("div", {
                  className: "modal-footer",
                  children: [
                    f.jsx("button", {
                      className: "btn btn-secondary",
                      "data-bs-dismiss": "modal",
                      type: "button",
                      children: "Annuler",
                    }),
                    f.jsx("button", {
                      className: "btn btn-primary",
                      type: "button",
                      onClick: o,
                      disabled: V || G,
                      children: V
                        ? f.jsxs(f.Fragment, {
                            children: [
                              f.jsx("span", {
                                className:
                                  "spinner-border spinner-border-sm me-2",
                              }),
                              "Création…",
                            ],
                          })
                        : f.jsx(f.Fragment, {
                            children: "Créer la notification",
                          }),
                    }),
                  ],
                }),
              ],
            }),
          }),
        }),
        f.jsx("div", {
          className: "modal fade",
          role: "dialog",
          tabIndex: -1,
          id: "editNotificationModal",
          children: f.jsx("div", {
            className: "modal-dialog modal-lg",
            role: "document",
            children: f.jsxs("div", {
              className: "modal-content",
              children: [
                f.jsxs("div", {
                  className: "modal-header",
                  children: [
                    f.jsxs("h5", {
                      className: "modal-title",
                      children: [
                        "Modifier la notification ",
                        Zl?.id ? `${Zl.id}` : "",
                      ],
                    }),
                    f.jsx("button", {
                      className: "btn-close btn-close-dark",
                      "data-bs-dismiss": "modal",
                      type: "button",
                      onClick: () => Ml(""),
                    }),
                  ],
                }),
                f.jsxs("div", {
                  className: "modal-body",
                  children: [
                    zl &&
                      f.jsxs("div", {
                        className: "alert alert-danger",
                        children: [
                          f.jsx("i", {
                            className: "fas fa-triangle-exclamation me-2",
                          }),
                          zl,
                        ],
                      }),
                    f.jsxs("div", {
                      className: "row g-3",
                      children: [
                        f.jsxs("div", {
                          className: "col-md-12",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "edit_msg",
                              children: "Message",
                            }),
                            f.jsx("input", {
                              id: "edit_msg",
                              type: "text",
                              className: "form-control",
                              value: T.message,
                              onChange: (b) =>
                                O((m) => ({ ...m, message: b.target.value })),
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-6",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "edit_type",
                              children: "Type",
                            }),
                            f.jsxs("select", {
                              id: "edit_type",
                              className: "form-select",
                              value: T.typeAlerte,
                              onChange: (b) =>
                                O((m) => ({
                                  ...m,
                                  typeAlerte: b.target.value,
                                })),
                              children: [
                                f.jsx("option", {
                                  value: "INFO",
                                  children: "INFO",
                                }),
                                f.jsx("option", {
                                  value: "URGENT",
                                  children: "URGENT",
                                }),
                              ],
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-6",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "edit_niveau",
                              children: "Niveau d’urgence",
                            }),
                            f.jsxs("select", {
                              id: "edit_niveau",
                              className: "form-select",
                              value: T.idNiveauUrgence,
                              onChange: (b) =>
                                O((m) => ({
                                  ...m,
                                  idNiveauUrgence: b.target.value,
                                })),
                              children: [
                                f.jsx("option", {
                                  value: "",
                                  children: "— Sélectionner —",
                                }),
                                D.map((b) =>
                                  f.jsx(
                                    "option",
                                    { value: b.id, children: b.label },
                                    b.id
                                  )
                                ),
                              ],
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-6",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "edit_module",
                              children: "Module",
                            }),
                            f.jsxs("select", {
                              id: "edit_module",
                              className: "form-select",
                              value: T.idModule,
                              onChange: (b) =>
                                O((m) => ({ ...m, idModule: b.target.value })),
                              children: [
                                f.jsx("option", {
                                  value: "",
                                  children: "— Sélectionner —",
                                }),
                                R.map((b) =>
                                  f.jsx(
                                    "option",
                                    { value: b.id, children: b.name },
                                    b.id
                                  )
                                ),
                              ],
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-6",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "edit_seuil",
                              children: "Seuil",
                            }),
                            f.jsx("input", {
                              id: "edit_seuil",
                              type: "number",
                              className: "form-control",
                              value: T.limiteDeclenchement,
                              onChange: (b) =>
                                O((m) => ({
                                  ...m,
                                  limiteDeclenchement: b.target.value,
                                })),
                            }),
                          ],
                        }),
                        f.jsxs("div", {
                          className: "col-md-12",
                          children: [
                            f.jsx("label", {
                              className: "form-label",
                              htmlFor: "edit_desc",
                              children: "Description",
                            }),
                            f.jsx("textarea", {
                              id: "edit_desc",
                              className: "form-control",
                              rows: 4,
                              value: T.description,
                              onChange: (b) =>
                                O((m) => ({
                                  ...m,
                                  description: b.target.value,
                                })),
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                f.jsxs("div", {
                  className: "modal-footer",
                  children: [
                    f.jsx("button", {
                      className: "btn btn-secondary",
                      "data-bs-dismiss": "modal",
                      type: "button",
                      children: "Annuler",
                    }),
                    f.jsx("button", {
                      className: "btn btn-primary",
                      type: "button",
                      onClick: z,
                      disabled: Pl || G,
                      children: Pl
                        ? f.jsxs(f.Fragment, {
                            children: [
                              f.jsx("span", {
                                className:
                                  "spinner-border spinner-border-sm me-2",
                              }),
                              "Enregistrement…",
                            ],
                          })
                        : f.jsx(f.Fragment, { children: "Enregistrer" }),
                    }),
                  ],
                }),
              ],
            }),
          }),
        }),
      ],
    });
  }
  const nr = Of(er, pf, _f, {
      shadow: !1,
      props: [
        "alerts",
        "loading",
        "errorList",
        "toggleError",
        "modules",
        "niveaux",
        "groupes",
        "onRefresh",
        "onCreate",
        "onUpdate",
        "onToggle",
      ],
    }),
    ir = Of(ur, pf, _f, {
      shadow: !1,
      props: [
        "items",
        "modules",
        "niveaux",
        "loading",
        "errorList",
        "metaLoading",
        "metaError",
        "toggleError",
        "onRefresh",
        "onCreate",
        "onUpdate",
        "onToggle",
      ],
    });
  customElements.define("alert-component", nr),
    customElements.define("notification-component", ir);
});
