// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/nanoid/non-secure/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customAlphabet = exports.nanoid = void 0;
// This alphabet uses `A-Za-z0-9_-` symbols. The genetic algorithm helped
// optimize the gzip compression for this alphabet.
let urlAlphabet = 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW';

let customAlphabet = (alphabet, size) => {
  return () => {
    let id = ''; // A compact alternative for `for (var i = 0; i < step; i++)`.

    let i = size;

    while (i--) {
      // `| 0` is more compact and faster than `Math.floor()`.
      id += alphabet[Math.random() * alphabet.length | 0];
    }

    return id;
  };
};

exports.customAlphabet = customAlphabet;

let nanoid = (size = 21) => {
  let id = ''; // A compact alternative for `for (var i = 0; i < step; i++)`.

  let i = size;

  while (i--) {
    // `| 0` is more compact and faster than `Math.floor()`.
    id += urlAlphabet[Math.random() * 64 | 0];
  }

  return id;
};

exports.nanoid = nanoid;
},{}],"node_modules/immer/dist/immer.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.castDraft = K;
exports.castImmutable = $;
exports.current = D;
exports.enableAllPlugins = J;
exports.enableES5 = N;
exports.enableMapSet = C;
exports.enablePatches = T;
exports.freeze = d;
exports.isDraft = t;
exports.isDraftable = r;
exports.original = e;
exports.setUseProxies = exports.setAutoFreeze = exports.produceWithPatches = exports.produce = exports.nothing = exports.immerable = exports.finishDraft = exports.createDraft = exports.applyPatches = exports.Immer = exports.default = void 0;

function n(n) {
  for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), e = 1; e < t; e++) r[e - 1] = arguments[e];

  if ("production" !== "development") {
    var i = Y[n],
        o = i ? "function" == typeof i ? i.apply(null, r) : i : "unknown error nr: " + n;
    throw Error("[Immer] " + o);
  }

  throw Error("[Immer] minified error nr: " + n + (r.length ? " " + r.map(function (n) {
    return "'" + n + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}

function t(n) {
  return !!n && !!n[Q];
}

function r(n) {
  return !!n && (function (n) {
    if (!n || "object" != typeof n) return !1;
    var t = Object.getPrototypeOf(n);
    if (null === t) return !0;
    var r = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
    return r === Object || "function" == typeof r && Function.toString.call(r) === Z;
  }(n) || Array.isArray(n) || !!n[L] || !!n.constructor[L] || s(n) || v(n));
}

function e(r) {
  return t(r) || n(23, r), r[Q].t;
}

function i(n, t, r) {
  void 0 === r && (r = !1), 0 === o(n) ? (r ? Object.keys : nn)(n).forEach(function (e) {
    r && "symbol" == typeof e || t(e, n[e], n);
  }) : n.forEach(function (r, e) {
    return t(e, r, n);
  });
}

function o(n) {
  var t = n[Q];
  return t ? t.i > 3 ? t.i - 4 : t.i : Array.isArray(n) ? 1 : s(n) ? 2 : v(n) ? 3 : 0;
}

function u(n, t) {
  return 2 === o(n) ? n.has(t) : Object.prototype.hasOwnProperty.call(n, t);
}

function a(n, t) {
  return 2 === o(n) ? n.get(t) : n[t];
}

function f(n, t, r) {
  var e = o(n);
  2 === e ? n.set(t, r) : 3 === e ? (n.delete(t), n.add(r)) : n[t] = r;
}

function c(n, t) {
  return n === t ? 0 !== n || 1 / n == 1 / t : n != n && t != t;
}

function s(n) {
  return X && n instanceof Map;
}

function v(n) {
  return q && n instanceof Set;
}

function p(n) {
  return n.o || n.t;
}

function l(n) {
  if (Array.isArray(n)) return Array.prototype.slice.call(n);
  var t = tn(n);
  delete t[Q];

  for (var r = nn(t), e = 0; e < r.length; e++) {
    var i = r[e],
        o = t[i];
    !1 === o.writable && (o.writable = !0, o.configurable = !0), (o.get || o.set) && (t[i] = {
      configurable: !0,
      writable: !0,
      enumerable: o.enumerable,
      value: n[i]
    });
  }

  return Object.create(Object.getPrototypeOf(n), t);
}

function d(n, e) {
  return void 0 === e && (e = !1), y(n) || t(n) || !r(n) ? n : (o(n) > 1 && (n.set = n.add = n.clear = n.delete = h), Object.freeze(n), e && i(n, function (n, t) {
    return d(t, !0);
  }, !0), n);
}

function h() {
  n(2);
}

function y(n) {
  return null == n || "object" != typeof n || Object.isFrozen(n);
}

function b(t) {
  var r = rn[t];
  return r || n(18, t), r;
}

function m(n, t) {
  rn[n] || (rn[n] = t);
}

function _() {
  return "production" === "development" || U || n(0), U;
}

function j(n, t) {
  t && (b("Patches"), n.u = [], n.s = [], n.v = t);
}

function O(n) {
  g(n), n.p.forEach(S), n.p = null;
}

function g(n) {
  n === U && (U = n.l);
}

function w(n) {
  return U = {
    p: [],
    l: U,
    h: n,
    m: !0,
    _: 0
  };
}

function S(n) {
  var t = n[Q];
  0 === t.i || 1 === t.i ? t.j() : t.O = !0;
}

function P(t, e) {
  e._ = e.p.length;
  var i = e.p[0],
      o = void 0 !== t && t !== i;
  return e.h.g || b("ES5").S(e, t, o), o ? (i[Q].P && (O(e), n(4)), r(t) && (t = M(e, t), e.l || x(e, t)), e.u && b("Patches").M(i[Q], t, e.u, e.s)) : t = M(e, i, []), O(e), e.u && e.v(e.u, e.s), t !== H ? t : void 0;
}

function M(n, t, r) {
  if (y(t)) return t;
  var e = t[Q];
  if (!e) return i(t, function (i, o) {
    return A(n, e, t, i, o, r);
  }, !0), t;
  if (e.A !== n) return t;
  if (!e.P) return x(n, e.t, !0), e.t;

  if (!e.I) {
    e.I = !0, e.A._--;
    var o = 4 === e.i || 5 === e.i ? e.o = l(e.k) : e.o;
    i(3 === e.i ? new Set(o) : o, function (t, i) {
      return A(n, e, o, t, i, r);
    }), x(n, o, !1), r && n.u && b("Patches").R(e, r, n.u, n.s);
  }

  return e.o;
}

function A(e, i, o, a, c, s) {
  if ("production" !== "development" && c === o && n(5), t(c)) {
    var v = M(e, c, s && i && 3 !== i.i && !u(i.D, a) ? s.concat(a) : void 0);
    if (f(o, a, v), !t(v)) return;
    e.m = !1;
  }

  if (r(c) && !y(c)) {
    if (!e.h.F && e._ < 1) return;
    M(e, c), i && i.A.l || x(e, c);
  }
}

function x(n, t, r) {
  void 0 === r && (r = !1), n.h.F && n.m && d(t, r);
}

function z(n, t) {
  var r = n[Q];
  return (r ? p(r) : n)[t];
}

function I(n, t) {
  if (t in n) for (var r = Object.getPrototypeOf(n); r;) {
    var e = Object.getOwnPropertyDescriptor(r, t);
    if (e) return e;
    r = Object.getPrototypeOf(r);
  }
}

function k(n) {
  n.P || (n.P = !0, n.l && k(n.l));
}

function E(n) {
  n.o || (n.o = l(n.t));
}

function R(n, t, r) {
  var e = s(t) ? b("MapSet").N(t, r) : v(t) ? b("MapSet").T(t, r) : n.g ? function (n, t) {
    var r = Array.isArray(n),
        e = {
      i: r ? 1 : 0,
      A: t ? t.A : _(),
      P: !1,
      I: !1,
      D: {},
      l: t,
      t: n,
      k: null,
      o: null,
      j: null,
      C: !1
    },
        i = e,
        o = en;
    r && (i = [e], o = on);
    var u = Proxy.revocable(i, o),
        a = u.revoke,
        f = u.proxy;
    return e.k = f, e.j = a, f;
  }(t, r) : b("ES5").J(t, r);
  return (r ? r.A : _()).p.push(e), e;
}

function D(e) {
  return t(e) || n(22, e), function n(t) {
    if (!r(t)) return t;
    var e,
        u = t[Q],
        c = o(t);

    if (u) {
      if (!u.P && (u.i < 4 || !b("ES5").K(u))) return u.t;
      u.I = !0, e = F(t, c), u.I = !1;
    } else e = F(t, c);

    return i(e, function (t, r) {
      u && a(u.t, t) === r || f(e, t, n(r));
    }), 3 === c ? new Set(e) : e;
  }(e);
}

function F(n, t) {
  switch (t) {
    case 2:
      return new Map(n);

    case 3:
      return Array.from(n);
  }

  return l(n);
}

function N() {
  function r(n, t) {
    var r = s[n];
    return r ? r.enumerable = t : s[n] = r = {
      configurable: !0,
      enumerable: t,
      get: function () {
        var t = this[Q];
        return "production" !== "development" && f(t), en.get(t, n);
      },
      set: function (t) {
        var r = this[Q];
        "production" !== "development" && f(r), en.set(r, n, t);
      }
    }, r;
  }

  function e(n) {
    for (var t = n.length - 1; t >= 0; t--) {
      var r = n[t][Q];
      if (!r.P) switch (r.i) {
        case 5:
          a(r) && k(r);
          break;

        case 4:
          o(r) && k(r);
      }
    }
  }

  function o(n) {
    for (var t = n.t, r = n.k, e = nn(r), i = e.length - 1; i >= 0; i--) {
      var o = e[i];

      if (o !== Q) {
        var a = t[o];
        if (void 0 === a && !u(t, o)) return !0;
        var f = r[o],
            s = f && f[Q];
        if (s ? s.t !== a : !c(f, a)) return !0;
      }
    }

    var v = !!t[Q];
    return e.length !== nn(t).length + (v ? 0 : 1);
  }

  function a(n) {
    var t = n.k;
    if (t.length !== n.t.length) return !0;
    var r = Object.getOwnPropertyDescriptor(t, t.length - 1);
    return !(!r || r.get);
  }

  function f(t) {
    t.O && n(3, JSON.stringify(p(t)));
  }

  var s = {};
  m("ES5", {
    J: function (n, t) {
      var e = Array.isArray(n),
          i = function (n, t) {
        if (n) {
          for (var e = Array(t.length), i = 0; i < t.length; i++) Object.defineProperty(e, "" + i, r(i, !0));

          return e;
        }

        var o = tn(t);
        delete o[Q];

        for (var u = nn(o), a = 0; a < u.length; a++) {
          var f = u[a];
          o[f] = r(f, n || !!o[f].enumerable);
        }

        return Object.create(Object.getPrototypeOf(t), o);
      }(e, n),
          o = {
        i: e ? 5 : 4,
        A: t ? t.A : _(),
        P: !1,
        I: !1,
        D: {},
        l: t,
        t: n,
        k: i,
        o: null,
        O: !1,
        C: !1
      };

      return Object.defineProperty(i, Q, {
        value: o,
        writable: !0
      }), i;
    },
    S: function (n, r, o) {
      o ? t(r) && r[Q].A === n && e(n.p) : (n.u && function n(t) {
        if (t && "object" == typeof t) {
          var r = t[Q];

          if (r) {
            var e = r.t,
                o = r.k,
                f = r.D,
                c = r.i;
            if (4 === c) i(o, function (t) {
              t !== Q && (void 0 !== e[t] || u(e, t) ? f[t] || n(o[t]) : (f[t] = !0, k(r)));
            }), i(e, function (n) {
              void 0 !== o[n] || u(o, n) || (f[n] = !1, k(r));
            });else if (5 === c) {
              if (a(r) && (k(r), f.length = !0), o.length < e.length) for (var s = o.length; s < e.length; s++) f[s] = !1;else for (var v = e.length; v < o.length; v++) f[v] = !0;

              for (var p = Math.min(o.length, e.length), l = 0; l < p; l++) void 0 === f[l] && n(o[l]);
            }
          }
        }
      }(n.p[0]), e(n.p));
    },
    K: function (n) {
      return 4 === n.i ? o(n) : a(n);
    }
  });
}

function T() {
  function e(n) {
    if (!r(n)) return n;
    if (Array.isArray(n)) return n.map(e);
    if (s(n)) return new Map(Array.from(n.entries()).map(function (n) {
      return [n[0], e(n[1])];
    }));
    if (v(n)) return new Set(Array.from(n).map(e));
    var t = Object.create(Object.getPrototypeOf(n));

    for (var i in n) t[i] = e(n[i]);

    return u(n, L) && (t[L] = n[L]), t;
  }

  function f(n) {
    return t(n) ? e(n) : n;
  }

  var c = "add";
  m("Patches", {
    $: function (t, r) {
      return r.forEach(function (r) {
        for (var i = r.path, u = r.op, f = t, s = 0; s < i.length - 1; s++) {
          var v = o(f),
              p = "" + i[s];
          0 !== v && 1 !== v || "__proto__" !== p && "constructor" !== p || n(24), "function" == typeof f && "prototype" === p && n(24), "object" != typeof (f = a(f, p)) && n(15, i.join("/"));
        }

        var l = o(f),
            d = e(r.value),
            h = i[i.length - 1];

        switch (u) {
          case "replace":
            switch (l) {
              case 2:
                return f.set(h, d);

              case 3:
                n(16);

              default:
                return f[h] = d;
            }

          case c:
            switch (l) {
              case 1:
                return f.splice(h, 0, d);

              case 2:
                return f.set(h, d);

              case 3:
                return f.add(d);

              default:
                return f[h] = d;
            }

          case "remove":
            switch (l) {
              case 1:
                return f.splice(h, 1);

              case 2:
                return f.delete(h);

              case 3:
                return f.delete(r.value);

              default:
                return delete f[h];
            }

          default:
            n(17, u);
        }
      }), t;
    },
    R: function (n, t, r, e) {
      switch (n.i) {
        case 0:
        case 4:
        case 2:
          return function (n, t, r, e) {
            var o = n.t,
                s = n.o;
            i(n.D, function (n, i) {
              var v = a(o, n),
                  p = a(s, n),
                  l = i ? u(o, n) ? "replace" : c : "remove";

              if (v !== p || "replace" !== l) {
                var d = t.concat(n);
                r.push("remove" === l ? {
                  op: l,
                  path: d
                } : {
                  op: l,
                  path: d,
                  value: p
                }), e.push(l === c ? {
                  op: "remove",
                  path: d
                } : "remove" === l ? {
                  op: c,
                  path: d,
                  value: f(v)
                } : {
                  op: "replace",
                  path: d,
                  value: f(v)
                });
              }
            });
          }(n, t, r, e);

        case 5:
        case 1:
          return function (n, t, r, e) {
            var i = n.t,
                o = n.D,
                u = n.o;

            if (u.length < i.length) {
              var a = [u, i];
              i = a[0], u = a[1];
              var s = [e, r];
              r = s[0], e = s[1];
            }

            for (var v = 0; v < i.length; v++) if (o[v] && u[v] !== i[v]) {
              var p = t.concat([v]);
              r.push({
                op: "replace",
                path: p,
                value: f(u[v])
              }), e.push({
                op: "replace",
                path: p,
                value: f(i[v])
              });
            }

            for (var l = i.length; l < u.length; l++) {
              var d = t.concat([l]);
              r.push({
                op: c,
                path: d,
                value: f(u[l])
              });
            }

            i.length < u.length && e.push({
              op: "replace",
              path: t.concat(["length"]),
              value: i.length
            });
          }(n, t, r, e);

        case 3:
          return function (n, t, r, e) {
            var i = n.t,
                o = n.o,
                u = 0;
            i.forEach(function (n) {
              if (!o.has(n)) {
                var i = t.concat([u]);
                r.push({
                  op: "remove",
                  path: i,
                  value: n
                }), e.unshift({
                  op: c,
                  path: i,
                  value: n
                });
              }

              u++;
            }), u = 0, o.forEach(function (n) {
              if (!i.has(n)) {
                var o = t.concat([u]);
                r.push({
                  op: c,
                  path: o,
                  value: n
                }), e.unshift({
                  op: "remove",
                  path: o,
                  value: n
                });
              }

              u++;
            });
          }(n, t, r, e);
      }
    },
    M: function (n, t, r, e) {
      r.push({
        op: "replace",
        path: [],
        value: t === H ? void 0 : t
      }), e.push({
        op: "replace",
        path: [],
        value: n.t
      });
    }
  });
}

function C() {
  function t(n, t) {
    function r() {
      this.constructor = n;
    }

    a(n, t), n.prototype = (r.prototype = t.prototype, new r());
  }

  function e(n) {
    n.o || (n.D = new Map(), n.o = new Map(n.t));
  }

  function o(n) {
    n.o || (n.o = new Set(), n.t.forEach(function (t) {
      if (r(t)) {
        var e = R(n.A.h, t, n);
        n.p.set(t, e), n.o.add(e);
      } else n.o.add(t);
    }));
  }

  function u(t) {
    t.O && n(3, JSON.stringify(p(t)));
  }

  var a = function (n, t) {
    return (a = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (n, t) {
      n.__proto__ = t;
    } || function (n, t) {
      for (var r in t) t.hasOwnProperty(r) && (n[r] = t[r]);
    })(n, t);
  },
      f = function () {
    function n(n, t) {
      return this[Q] = {
        i: 2,
        l: t,
        A: t ? t.A : _(),
        P: !1,
        I: !1,
        o: void 0,
        D: void 0,
        t: n,
        k: this,
        C: !1,
        O: !1
      }, this;
    }

    t(n, Map);
    var o = n.prototype;
    return Object.defineProperty(o, "size", {
      get: function () {
        return p(this[Q]).size;
      }
    }), o.has = function (n) {
      return p(this[Q]).has(n);
    }, o.set = function (n, t) {
      var r = this[Q];
      return u(r), p(r).has(n) && p(r).get(n) === t || (e(r), k(r), r.D.set(n, !0), r.o.set(n, t), r.D.set(n, !0)), this;
    }, o.delete = function (n) {
      if (!this.has(n)) return !1;
      var t = this[Q];
      return u(t), e(t), k(t), t.D.set(n, !1), t.o.delete(n), !0;
    }, o.clear = function () {
      var n = this[Q];
      u(n), p(n).size && (e(n), k(n), n.D = new Map(), i(n.t, function (t) {
        n.D.set(t, !1);
      }), n.o.clear());
    }, o.forEach = function (n, t) {
      var r = this;
      p(this[Q]).forEach(function (e, i) {
        n.call(t, r.get(i), i, r);
      });
    }, o.get = function (n) {
      var t = this[Q];
      u(t);
      var i = p(t).get(n);
      if (t.I || !r(i)) return i;
      if (i !== t.t.get(n)) return i;
      var o = R(t.A.h, i, t);
      return e(t), t.o.set(n, o), o;
    }, o.keys = function () {
      return p(this[Q]).keys();
    }, o.values = function () {
      var n,
          t = this,
          r = this.keys();
      return (n = {})[V] = function () {
        return t.values();
      }, n.next = function () {
        var n = r.next();
        return n.done ? n : {
          done: !1,
          value: t.get(n.value)
        };
      }, n;
    }, o.entries = function () {
      var n,
          t = this,
          r = this.keys();
      return (n = {})[V] = function () {
        return t.entries();
      }, n.next = function () {
        var n = r.next();
        if (n.done) return n;
        var e = t.get(n.value);
        return {
          done: !1,
          value: [n.value, e]
        };
      }, n;
    }, o[V] = function () {
      return this.entries();
    }, n;
  }(),
      c = function () {
    function n(n, t) {
      return this[Q] = {
        i: 3,
        l: t,
        A: t ? t.A : _(),
        P: !1,
        I: !1,
        o: void 0,
        t: n,
        k: this,
        p: new Map(),
        O: !1,
        C: !1
      }, this;
    }

    t(n, Set);
    var r = n.prototype;
    return Object.defineProperty(r, "size", {
      get: function () {
        return p(this[Q]).size;
      }
    }), r.has = function (n) {
      var t = this[Q];
      return u(t), t.o ? !!t.o.has(n) || !(!t.p.has(n) || !t.o.has(t.p.get(n))) : t.t.has(n);
    }, r.add = function (n) {
      var t = this[Q];
      return u(t), this.has(n) || (o(t), k(t), t.o.add(n)), this;
    }, r.delete = function (n) {
      if (!this.has(n)) return !1;
      var t = this[Q];
      return u(t), o(t), k(t), t.o.delete(n) || !!t.p.has(n) && t.o.delete(t.p.get(n));
    }, r.clear = function () {
      var n = this[Q];
      u(n), p(n).size && (o(n), k(n), n.o.clear());
    }, r.values = function () {
      var n = this[Q];
      return u(n), o(n), n.o.values();
    }, r.entries = function () {
      var n = this[Q];
      return u(n), o(n), n.o.entries();
    }, r.keys = function () {
      return this.values();
    }, r[V] = function () {
      return this.values();
    }, r.forEach = function (n, t) {
      for (var r = this.values(), e = r.next(); !e.done;) n.call(t, e.value, e.value, this), e = r.next();
    }, n;
  }();

  m("MapSet", {
    N: function (n, t) {
      return new f(n, t);
    },
    T: function (n, t) {
      return new c(n, t);
    }
  });
}

function J() {
  N(), C(), T();
}

function K(n) {
  return n;
}

function $(n) {
  return n;
}

var G,
    U,
    W = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"),
    X = "undefined" != typeof Map,
    q = "undefined" != typeof Set,
    B = "undefined" != typeof Proxy && void 0 !== Proxy.revocable && "undefined" != typeof Reflect,
    H = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = !0, G),
    L = W ? Symbol.for("immer-draftable") : "__$immer_draftable",
    Q = W ? Symbol.for("immer-state") : "__$immer_state",
    V = "undefined" != typeof Symbol && Symbol.iterator || "@@iterator",
    Y = {
  0: "Illegal state",
  1: "Immer drafts cannot have computed properties",
  2: "This object has been frozen and should not be mutated",
  3: function (n) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + n;
  },
  4: "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  5: "Immer forbids circular references",
  6: "The first or second argument to `produce` must be a function",
  7: "The third argument to `produce` must be a function or undefined",
  8: "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  9: "First argument to `finishDraft` must be a draft returned by `createDraft`",
  10: "The given draft is already finalized",
  11: "Object.defineProperty() cannot be used on an Immer draft",
  12: "Object.setPrototypeOf() cannot be used on an Immer draft",
  13: "Immer only supports deleting array indices",
  14: "Immer only supports setting array indices and the 'length' property",
  15: function (n) {
    return "Cannot apply patch, path doesn't resolve: " + n;
  },
  16: 'Sets cannot have "replace" patches.',
  17: function (n) {
    return "Unsupported patch operation: " + n;
  },
  18: function (n) {
    return "The plugin for '" + n + "' has not been loaded into Immer. To enable the plugin, import and call `enable" + n + "()` when initializing your application.";
  },
  20: "Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",
  21: function (n) {
    return "produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '" + n + "'";
  },
  22: function (n) {
    return "'current' expects a draft, got: " + n;
  },
  23: function (n) {
    return "'original' expects a draft, got: " + n;
  },
  24: "Patching reserved attributes like __proto__, prototype and constructor is not allowed"
},
    Z = "" + Object.prototype.constructor,
    nn = "undefined" != typeof Reflect && Reflect.ownKeys ? Reflect.ownKeys : void 0 !== Object.getOwnPropertySymbols ? function (n) {
  return Object.getOwnPropertyNames(n).concat(Object.getOwnPropertySymbols(n));
} : Object.getOwnPropertyNames,
    tn = Object.getOwnPropertyDescriptors || function (n) {
  var t = {};
  return nn(n).forEach(function (r) {
    t[r] = Object.getOwnPropertyDescriptor(n, r);
  }), t;
},
    rn = {},
    en = {
  get: function (n, t) {
    if (t === Q) return n;
    var e = p(n);
    if (!u(e, t)) return function (n, t, r) {
      var e,
          i = I(t, r);
      return i ? "value" in i ? i.value : null === (e = i.get) || void 0 === e ? void 0 : e.call(n.k) : void 0;
    }(n, e, t);
    var i = e[t];
    return n.I || !r(i) ? i : i === z(n.t, t) ? (E(n), n.o[t] = R(n.A.h, i, n)) : i;
  },
  has: function (n, t) {
    return t in p(n);
  },
  ownKeys: function (n) {
    return Reflect.ownKeys(p(n));
  },
  set: function (n, t, r) {
    var e = I(p(n), t);
    if (null == e ? void 0 : e.set) return e.set.call(n.k, r), !0;

    if (!n.P) {
      var i = z(p(n), t),
          o = null == i ? void 0 : i[Q];
      if (o && o.t === r) return n.o[t] = r, n.D[t] = !1, !0;
      if (c(r, i) && (void 0 !== r || u(n.t, t))) return !0;
      E(n), k(n);
    }

    return n.o[t] === r && "number" != typeof r && (void 0 !== r || t in n.o) || (n.o[t] = r, n.D[t] = !0, !0);
  },
  deleteProperty: function (n, t) {
    return void 0 !== z(n.t, t) || t in n.t ? (n.D[t] = !1, E(n), k(n)) : delete n.D[t], n.o && delete n.o[t], !0;
  },
  getOwnPropertyDescriptor: function (n, t) {
    var r = p(n),
        e = Reflect.getOwnPropertyDescriptor(r, t);
    return e ? {
      writable: !0,
      configurable: 1 !== n.i || "length" !== t,
      enumerable: e.enumerable,
      value: r[t]
    } : e;
  },
  defineProperty: function () {
    n(11);
  },
  getPrototypeOf: function (n) {
    return Object.getPrototypeOf(n.t);
  },
  setPrototypeOf: function () {
    n(12);
  }
},
    on = {};

exports.immerable = L;
exports.nothing = H;
i(en, function (n, t) {
  on[n] = function () {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
}), on.deleteProperty = function (t, r) {
  return "production" !== "development" && isNaN(parseInt(r)) && n(13), en.deleteProperty.call(this, t[0], r);
}, on.set = function (t, r, e) {
  return "production" !== "development" && "length" !== r && isNaN(parseInt(r)) && n(14), en.set.call(this, t[0], r, e, t[0]);
};

var un = function () {
  function e(t) {
    var e = this;
    this.g = B, this.F = !0, this.produce = function (t, i, o) {
      if ("function" == typeof t && "function" != typeof i) {
        var u = i;
        i = t;
        var a = e;
        return function (n) {
          var t = this;
          void 0 === n && (n = u);

          for (var r = arguments.length, e = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) e[o - 1] = arguments[o];

          return a.produce(n, function (n) {
            var r;
            return (r = i).call.apply(r, [t, n].concat(e));
          });
        };
      }

      var f;

      if ("function" != typeof i && n(6), void 0 !== o && "function" != typeof o && n(7), r(t)) {
        var c = w(e),
            s = R(e, t, void 0),
            v = !0;

        try {
          f = i(s), v = !1;
        } finally {
          v ? O(c) : g(c);
        }

        return "undefined" != typeof Promise && f instanceof Promise ? f.then(function (n) {
          return j(c, o), P(n, c);
        }, function (n) {
          throw O(c), n;
        }) : (j(c, o), P(f, c));
      }

      if (!t || "object" != typeof t) {
        if ((f = i(t)) === H) return;
        return void 0 === f && (f = t), e.F && d(f, !0), f;
      }

      n(21, t);
    }, this.produceWithPatches = function (n, t) {
      return "function" == typeof n ? function (t) {
        for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++) i[o - 1] = arguments[o];

        return e.produceWithPatches(t, function (t) {
          return n.apply(void 0, [t].concat(i));
        });
      } : [e.produce(n, t, function (n, t) {
        r = n, i = t;
      }), r, i];
      var r, i;
    }, "boolean" == typeof (null == t ? void 0 : t.useProxies) && this.setUseProxies(t.useProxies), "boolean" == typeof (null == t ? void 0 : t.autoFreeze) && this.setAutoFreeze(t.autoFreeze);
  }

  var i = e.prototype;
  return i.createDraft = function (e) {
    r(e) || n(8), t(e) && (e = D(e));
    var i = w(this),
        o = R(this, e, void 0);
    return o[Q].C = !0, g(i), o;
  }, i.finishDraft = function (t, r) {
    var e = t && t[Q];
    "production" !== "development" && (e && e.C || n(9), e.I && n(10));
    var i = e.A;
    return j(i, r), P(void 0, i);
  }, i.setAutoFreeze = function (n) {
    this.F = n;
  }, i.setUseProxies = function (t) {
    t && !B && n(20), this.g = t;
  }, i.applyPatches = function (n, r) {
    var e;

    for (e = r.length - 1; e >= 0; e--) {
      var i = r[e];

      if (0 === i.path.length && "replace" === i.op) {
        n = i.value;
        break;
      }
    }

    var o = b("Patches").$;
    return t(n) ? o(n, r) : this.produce(n, function (n) {
      return o(n, r.slice(e + 1));
    });
  }, e;
}(),
    an = new un(),
    fn = an.produce,
    cn = an.produceWithPatches.bind(an),
    sn = an.setAutoFreeze.bind(an),
    vn = an.setUseProxies.bind(an),
    pn = an.applyPatches.bind(an),
    ln = an.createDraft.bind(an),
    dn = an.finishDraft.bind(an);

exports.finishDraft = dn;
exports.createDraft = ln;
exports.applyPatches = pn;
exports.setUseProxies = vn;
exports.setAutoFreeze = sn;
exports.produceWithPatches = cn;
exports.produce = fn;
exports.Immer = un;
var _default = fn;
exports.default = _default;
},{}],"node_modules/lodash.isplainobject/index.js":[function(require,module,exports) {
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

module.exports = isPlainObject;

},{}],"node_modules/boardgame.io/dist/esm/turn-order-406c4349.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.C = alea;
exports.I = InitTurnOrderState;
exports.U = UpdateTurnOrderState;
exports.a = supportDeprecatedMoveLimit;
exports.b = SetActivePlayers;
exports.c = UpdateActivePlayersOnceEmpty;
exports.e = error;
exports.i = info;
exports.z = exports.y = exports.x = exports.w = exports.v = exports.u = exports.t = exports.s = exports.r = exports.q = exports.p = exports.o = exports.n = exports.m = exports.l = exports.k = exports.j = exports.h = exports.g = exports.f = exports.d = exports.T = exports.S = exports.R = exports.P = exports.N = exports.M = exports.G = exports.F = exports.E = exports.D = exports.B = exports.A = void 0;

var _immer = _interopRequireDefault(require("immer"));

var _lodash = _interopRequireDefault(require("lodash.isplainobject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
const MAKE_MOVE = 'MAKE_MOVE';
exports.M = MAKE_MOVE;
const GAME_EVENT = 'GAME_EVENT';
exports.o = GAME_EVENT;
const REDO = 'REDO';
exports.R = REDO;
const RESET = 'RESET';
exports.l = RESET;
const SYNC = 'SYNC';
exports.j = SYNC;
const UNDO = 'UNDO';
exports.h = UNDO;
const UPDATE = 'UPDATE';
exports.k = UPDATE;
const PATCH = 'PATCH';
exports.P = PATCH;
const PLUGIN = 'PLUGIN';
exports.d = PLUGIN;
const STRIP_TRANSIENTS = 'STRIP_TRANSIENTS';
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Generate a move to be dispatched to the game move reducer.
 *
 * @param {string} type - The move type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */

exports.p = STRIP_TRANSIENTS;

const makeMove = (type, args, playerID, credentials) => ({
  type: MAKE_MOVE,
  payload: {
    type,
    args,
    playerID,
    credentials
  }
});
/**
 * Generate a game event to be dispatched to the flow reducer.
 *
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */


exports.B = makeMove;

const gameEvent = (type, args, playerID, credentials) => ({
  type: GAME_EVENT,
  payload: {
    type,
    args,
    playerID,
    credentials
  }
});
/**
 * Generate an automatic game event that is a side-effect of a move.
 * @param {string} type - The event type.
 * @param {Array}  args - Additional arguments.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */


exports.g = gameEvent;

const automaticGameEvent = (type, args, playerID, credentials) => ({
  type: GAME_EVENT,
  payload: {
    type,
    args,
    playerID,
    credentials
  },
  automatic: true
});

const sync = info => ({
  type: SYNC,
  state: info.state,
  log: info.log,
  initialState: info.initialState,
  clientOnly: true
});
/**
 * Used to update the Redux store's state with patch in response to
 * an action coming from another player.
 * @param prevStateID previous stateID
 * @param stateID stateID after this patch
 * @param {Operation[]} patch - The patch to apply.
 * @param {LogEntry[]} deltalog - A log delta.
 */


exports.s = sync;

const patch = (prevStateID, stateID, patch, deltalog) => ({
  type: PATCH,
  prevStateID,
  stateID,
  patch,
  deltalog,
  clientOnly: true
});
/**
 * Used to update the Redux store's state in response to
 * an action coming from another player.
 * @param {object} state - The state to restore.
 * @param {Array} deltalog - A log delta.
 */


exports.y = patch;

const update = (state, deltalog) => ({
  type: UPDATE,
  state,
  deltalog,
  clientOnly: true
});
/**
 * Used to reset the game state.
 * @param {object} state - The initial state.
 */


exports.z = update;

const reset = state => ({
  type: RESET,
  state,
  clientOnly: true
});
/**
 * Used to undo the last move.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */


exports.u = reset;

const undo = (playerID, credentials) => ({
  type: UNDO,
  payload: {
    type: null,
    args: null,
    playerID,
    credentials
  }
});
/**
 * Used to redo the last undone move.
 * @param {string}  playerID - The ID of the player making this action.
 * @param {string}  credentials - (optional) The credentials for the player making this action.
 */


exports.v = undo;

const redo = (playerID, credentials) => ({
  type: REDO,
  payload: {
    type: null,
    args: null,
    playerID,
    credentials
  }
});
/**
 * Allows plugins to define their own actions and intercept them.
 */


exports.w = redo;

const plugin = (type, args, playerID, credentials) => ({
  type: PLUGIN,
  payload: {
    type,
    args,
    playerID,
    credentials
  }
});
/**
 * Private action used to strip transient metadata (e.g. errors) from the game
 * state.
 */


const stripTransients = () => ({
  type: STRIP_TRANSIENTS
});

exports.r = stripTransients;
var ActionCreators = /*#__PURE__*/Object.freeze({
  __proto__: null,
  makeMove: makeMove,
  gameEvent: gameEvent,
  automaticGameEvent: automaticGameEvent,
  sync: sync,
  patch: patch,
  update: update,
  reset: reset,
  undo: undo,
  redo: redo,
  plugin: plugin,
  stripTransients: stripTransients
});
/**
 * Moves can return this when they want to indicate
 * that the combination of arguments is illegal and
 * the move ought to be discarded.
 */

exports.A = ActionCreators;
const INVALID_MOVE = 'INVALID_MOVE';
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Plugin that allows using Immer to make immutable changes
 * to G by just mutating it.
 */

exports.n = INVALID_MOVE;
const ImmerPlugin = {
  name: 'plugin-immer',
  fnWrap: move => (G, ctx, ...args) => {
    let isInvalid = false;
    const newG = (0, _immer.default)(G, G => {
      const result = move(G, ctx, ...args);

      if (result === INVALID_MOVE) {
        isInvalid = true;
        return;
      }

      return result;
    });
    if (isInvalid) return INVALID_MOVE;
    return newG;
  }
}; // Inlined version of Alea from https://github.com/davidbau/seedrandom.
// Converted to Typescript October 2020.

class Alea {
  constructor(seed) {
    const mash = Mash(); // Apply the seeding algorithm from Baagoe.

    this.c = 1;
    this.s0 = mash(' ');
    this.s1 = mash(' ');
    this.s2 = mash(' ');
    this.s0 -= mash(seed);

    if (this.s0 < 0) {
      this.s0 += 1;
    }

    this.s1 -= mash(seed);

    if (this.s1 < 0) {
      this.s1 += 1;
    }

    this.s2 -= mash(seed);

    if (this.s2 < 0) {
      this.s2 += 1;
    }
  }

  next() {
    const t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10; // 2^-32

    this.s0 = this.s1;
    this.s1 = this.s2;
    return this.s2 = t - (this.c = Math.trunc(t));
  }

}

function Mash() {
  let n = 0xefc8249d;

  const mash = function (data) {
    const str = data.toString();

    for (let i = 0; i < str.length; i++) {
      n += str.charCodeAt(i);
      let h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }

    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function alea(seed, state) {
  const xg = new Alea(seed);
  const prng = xg.next.bind(xg);
  if (state) copy(state, xg);

  prng.state = () => copy(xg, {});

  return prng;
}
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Random
 *
 * Calls that require a pseudorandom number generator.
 * Uses a seed from ctx, and also persists the PRNG
 * state in ctx so that moves can stay pure.
 */


class Random {
  /**
   * constructor
   * @param {object} ctx - The ctx object to initialize from.
   */
  constructor(state) {
    // If we are on the client, the seed is not present.
    // Just use a temporary seed to execute the move without
    // crashing it. The move state itself is discarded,
    // so the actual value doesn't matter.
    this.state = state || {
      seed: '0'
    };
    this.used = false;
  }
  /**
   * Generates a new seed from the current date / time.
   */


  static seed() {
    return Date.now().toString(36).slice(-10);
  }

  isUsed() {
    return this.used;
  }

  getState() {
    return this.state;
  }
  /**
   * Generate a random number.
   */


  _random() {
    this.used = true;
    const R = this.state;
    const seed = R.prngstate ? '' : R.seed;
    const rand = alea(seed, R.prngstate);
    const number = rand();
    this.state = { ...R,
      prngstate: rand.state()
    };
    return number;
  }

  api() {
    const random = this._random.bind(this);

    const SpotValue = {
      D4: 4,
      D6: 6,
      D8: 8,
      D10: 10,
      D12: 12,
      D20: 20
    }; // Generate functions for predefined dice values D4 - D20.

    const predefined = {};

    for (const key in SpotValue) {
      const spotvalue = SpotValue[key];

      predefined[key] = diceCount => {
        return diceCount === undefined ? Math.floor(random() * spotvalue) + 1 : Array.from({
          length: diceCount
        }).map(() => Math.floor(random() * spotvalue) + 1);
      };
    }

    function Die(spotvalue = 6, diceCount) {
      return diceCount === undefined ? Math.floor(random() * spotvalue) + 1 : Array.from({
        length: diceCount
      }).map(() => Math.floor(random() * spotvalue) + 1);
    }

    return {
      /**
       * Similar to Die below, but with fixed spot values.
       * Supports passing a diceCount
       *    if not defined, defaults to 1 and returns the value directly.
       *    if defined, returns an array containing the random dice values.
       *
       * D4: (diceCount) => value
       * D6: (diceCount) => value
       * D8: (diceCount) => value
       * D10: (diceCount) => value
       * D12: (diceCount) => value
       * D20: (diceCount) => value
       */
      ...predefined,

      /**
       * Roll a die of specified spot value.
       *
       * @param {number} spotvalue - The die dimension (default: 6).
       * @param {number} diceCount - number of dice to throw.
       *                             if not defined, defaults to 1 and returns the value directly.
       *                             if defined, returns an array containing the random dice values.
       */
      Die,

      /**
       * Generate a random number between 0 and 1.
       */
      Number: () => {
        return random();
      },

      /**
       * Shuffle an array.
       *
       * @param {Array} deck - The array to shuffle. Does not mutate
       *                       the input, but returns the shuffled array.
       */
      Shuffle: deck => {
        const clone = [...deck];
        let sourceIndex = deck.length;
        let destinationIndex = 0;
        const shuffled = Array.from({
          length: sourceIndex
        });

        while (sourceIndex) {
          const randomIndex = Math.trunc(sourceIndex * random());
          shuffled[destinationIndex++] = clone[randomIndex];
          clone[randomIndex] = clone[--sourceIndex];
        }

        return shuffled;
      },
      _private: this
    };
  }

}
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */


const RandomPlugin = {
  name: 'random',
  noClient: ({
    api
  }) => {
    return api._private.isUsed();
  },
  flush: ({
    api
  }) => {
    return api._private.getState();
  },
  api: ({
    data
  }) => {
    const random = new Random(data);
    return random.api();
  },
  setup: ({
    game
  }) => {
    let {
      seed
    } = game;

    if (seed === undefined) {
      seed = Random.seed();
    }

    return {
      seed
    };
  },
  playerView: () => undefined
};
var GameMethod;
exports.G = GameMethod;

(function (GameMethod) {
  GameMethod["MOVE"] = "MOVE";
  GameMethod["GAME_ON_END"] = "GAME_ON_END";
  GameMethod["PHASE_ON_BEGIN"] = "PHASE_ON_BEGIN";
  GameMethod["PHASE_ON_END"] = "PHASE_ON_END";
  GameMethod["TURN_ON_BEGIN"] = "TURN_ON_BEGIN";
  GameMethod["TURN_ON_MOVE"] = "TURN_ON_MOVE";
  GameMethod["TURN_ON_END"] = "TURN_ON_END";
})(GameMethod || (exports.G = GameMethod = {}));
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */


var Errors;

(function (Errors) {
  Errors["CalledOutsideHook"] = "Events must be called from moves or the `onBegin`, `onEnd`, and `onMove` hooks.\nThis error probably means you called an event from other game code, like an `endIf` trigger or one of the `turn.order` methods.";
  Errors["EndTurnInOnEnd"] = "`endTurn` is disallowed in `onEnd` hooks \u2014 the turn is already ending.";
  Errors["MaxTurnEndings"] = "Maximum number of turn endings exceeded for this update.\nThis likely means game code is triggering an infinite loop.";
  Errors["PhaseEventInOnEnd"] = "`setPhase` & `endPhase` are disallowed in a phase\u2019s `onEnd` hook \u2014 the phase is already ending.\nIf you\u2019re trying to dynamically choose the next phase when a phase ends, use the phase\u2019s `next` trigger.";
  Errors["StageEventInOnEnd"] = "`setStage`, `endStage` & `setActivePlayers` are disallowed in `onEnd` hooks.";
  Errors["StageEventInPhaseBegin"] = "`setStage`, `endStage` & `setActivePlayers` are disallowed in a phase\u2019s `onBegin` hook.\nUse `setActivePlayers` in a `turn.onBegin` hook or declare stages with `turn.activePlayers` instead.";
  Errors["StageEventInTurnBegin"] = "`setStage` & `endStage` are disallowed in `turn.onBegin`.\nUse `setActivePlayers` or declare stages with `turn.activePlayers` instead.";
})(Errors || (Errors = {}));
/**
 * Events
 */


class Events {
  constructor(flow, ctx, playerID) {
    this.flow = flow;
    this.playerID = playerID;
    this.dispatch = [];
    this.initialTurn = ctx.turn;
    this.updateTurnContext(ctx, undefined); // This is an arbitrarily large upper threshold, which could be made
    // configurable via a game option if the need arises.

    this.maxEndedTurnsPerAction = ctx.numPlayers * 100;
  }

  api() {
    const events = {
      _private: this
    };

    for (const type of this.flow.eventNames) {
      events[type] = (...args) => {
        this.dispatch.push({
          type,
          args,
          phase: this.currentPhase,
          turn: this.currentTurn,
          calledFrom: this.currentMethod,
          // Used to capture a stack trace in case it is needed later.
          error: new Error('Events Plugin Error')
        });
      };
    }

    return events;
  }

  isUsed() {
    return this.dispatch.length > 0;
  }

  updateTurnContext(ctx, methodType) {
    this.currentPhase = ctx.phase;
    this.currentTurn = ctx.turn;
    this.currentMethod = methodType;
  }

  unsetCurrentMethod() {
    this.currentMethod = undefined;
  }
  /**
   * Updates ctx with the triggered events.
   * @param {object} state - The state object { G, ctx }.
   */


  update(state) {
    const initialState = state;

    const stateWithError = ({
      stack
    }, message) => ({ ...initialState,
      plugins: { ...initialState.plugins,
        events: { ...initialState.plugins.events,
          data: {
            error: message + '\n' + stack
          }
        }
      }
    });

    EventQueue: for (let i = 0; i < this.dispatch.length; i++) {
      const event = this.dispatch[i];
      const turnHasEnded = event.turn !== state.ctx.turn; // This protects against potential infinite loops if specific events are called on hooks.
      // The moment we exceed the defined threshold, we just bail out of all phases.

      const endedTurns = this.currentTurn - this.initialTurn;

      if (endedTurns >= this.maxEndedTurnsPerAction) {
        return stateWithError(event.error, Errors.MaxTurnEndings);
      }

      if (event.calledFrom === undefined) {
        return stateWithError(event.error, Errors.CalledOutsideHook);
      } // Stop processing events once the game has finished.


      if (state.ctx.gameover) break EventQueue;

      switch (event.type) {
        case 'endStage':
        case 'setStage':
        case 'setActivePlayers':
          {
            switch (event.calledFrom) {
              // Disallow all stage events in onEnd and phase.onBegin hooks.
              case GameMethod.TURN_ON_END:
              case GameMethod.PHASE_ON_END:
                return stateWithError(event.error, Errors.StageEventInOnEnd);

              case GameMethod.PHASE_ON_BEGIN:
                return stateWithError(event.error, Errors.StageEventInPhaseBegin);
              // Disallow setStage & endStage in turn.onBegin hooks.

              case GameMethod.TURN_ON_BEGIN:
                if (event.type === 'setActivePlayers') break;
                return stateWithError(event.error, Errors.StageEventInTurnBegin);
            } // If the turn already ended, don't try to process stage events.


            if (turnHasEnded) continue EventQueue;
            break;
          }

        case 'endTurn':
          {
            if (event.calledFrom === GameMethod.TURN_ON_END || event.calledFrom === GameMethod.PHASE_ON_END) {
              return stateWithError(event.error, Errors.EndTurnInOnEnd);
            } // If the turn already ended some other way,
            // don't try to end the turn again.


            if (turnHasEnded) continue EventQueue;
            break;
          }

        case 'endPhase':
        case 'setPhase':
          {
            if (event.calledFrom === GameMethod.PHASE_ON_END) {
              return stateWithError(event.error, Errors.PhaseEventInOnEnd);
            } // If the phase already ended some other way,
            // don't try to end the phase again.


            if (event.phase !== state.ctx.phase) continue EventQueue;
            break;
          }
      }

      const action = automaticGameEvent(event.type, event.args, this.playerID);
      state = this.flow.processEvent(state, action);
    }

    return state;
  }

}
/*
 * Copyright 2020 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */


const EventsPlugin = {
  name: 'events',
  noClient: ({
    api
  }) => api._private.isUsed(),
  isInvalid: ({
    data
  }) => data.error || false,
  // Update the events plugin???s internal turn context each time a move
  // or hook is called. This allows events called after turn or phase
  // endings to dispatch the current turn and phase correctly.
  fnWrap: (method, methodType) => (G, ctx, ...args) => {
    const api = ctx.events;
    if (api) api._private.updateTurnContext(ctx, methodType);
    G = method(G, ctx, ...args);
    if (api) api._private.unsetCurrentMethod();
    return G;
  },
  dangerouslyFlushRawState: ({
    state,
    api
  }) => api._private.update(state),
  api: ({
    game,
    ctx,
    playerID
  }) => new Events(game.flow, ctx, playerID).api()
};
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Plugin that makes it possible to add metadata to log entries.
 * During a move, you can set metadata using ctx.log.setMetadata and it will be
 * available on the log entry for that move.
 */

const LogPlugin = {
  name: 'log',
  flush: () => ({}),
  api: ({
    data
  }) => {
    return {
      setMetadata: metadata => {
        data.metadata = metadata;
      }
    };
  },
  setup: () => ({})
};
/**
 * Check if a value can be serialized (e.g. using `JSON.stringify`).
 * Adapted from: https://stackoverflow.com/a/30712764/3829557
 */

function isSerializable(value) {
  // Primitives are OK.
  if (value === undefined || value === null || typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
    return true;
  } // A non-primitive value that is neither a POJO or an array cannot be serialized.


  if (!(0, _lodash.default)(value) && !Array.isArray(value)) {
    return false;
  } // Recurse entries if the value is an object or array.


  for (const key in value) {
    if (!isSerializable(value[key])) return false;
  }

  return true;
}
/**
 * Plugin that checks whether state is serializable, in order to avoid
 * network serialization bugs.
 */


const SerializablePlugin = {
  name: 'plugin-serializable',
  fnWrap: move => (G, ctx, ...args) => {
    const result = move(G, ctx, ...args); // Check state in non-production environments.

    if ("development" !== 'production' && !isSerializable(result)) {
      throw new Error('Move state is not JSON-serialiazable.\n' + 'See https://boardgame.io/documentation/#/?id=state for more information.');
    }

    return result;
  }
};
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

const production = "development" === 'production';
const logfn = production ? () => {} : (...msg) => console.log(...msg);

const errorfn = (...msg) => console.error(...msg);

function info(msg) {
  logfn("INFO: ".concat(msg));
}

function error(error) {
  errorfn('ERROR:', error);
}
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * List of plugins that are always added.
 */


const CORE_PLUGINS = [ImmerPlugin, RandomPlugin, LogPlugin, SerializablePlugin];
const DEFAULT_PLUGINS = [...CORE_PLUGINS, EventsPlugin];
/**
 * Allow plugins to intercept actions and process them.
 */

const ProcessAction = (state, action, opts) => {
  // TODO(#723): Extend error handling to plugins.
  opts.game.plugins.filter(plugin => plugin.action !== undefined).filter(plugin => plugin.name === action.payload.type).forEach(plugin => {
    const name = plugin.name;
    const pluginState = state.plugins[name] || {
      data: {}
    };
    const data = plugin.action(pluginState.data, action.payload);
    state = { ...state,
      plugins: { ...state.plugins,
        [name]: { ...pluginState,
          data
        }
      }
    };
  });
  return state;
};
/**
 * The API's created by various plugins are stored in the plugins
 * section of the state object:
 *
 * {
 *   G: {},
 *   ctx: {},
 *   plugins: {
 *     plugin-a: {
 *       data: {},  // this is generated by the plugin at Setup / Flush.
 *       api: {},   // this is ephemeral and generated by Enhance.
 *     }
 *   }
 * }
 *
 * This function takes these API's and stuffs them back into
 * ctx for consumption inside a move function or hook.
 */


exports.f = ProcessAction;

const EnhanceCtx = state => {
  const ctx = { ...state.ctx
  };
  const plugins = state.plugins || {};
  Object.entries(plugins).forEach(([name, {
    api
  }]) => {
    ctx[name] = api;
  });
  return ctx;
};
/**
 * Applies the provided plugins to the given move / flow function.
 *
 * @param methodToWrap - The move function or hook to apply the plugins to.
 * @param methodType - The type of the move or hook being wrapped.
 * @param plugins - The list of plugins.
 */


exports.E = EnhanceCtx;

const FnWrap = (methodToWrap, methodType, plugins) => {
  return [...CORE_PLUGINS, ...plugins, EventsPlugin].filter(plugin => plugin.fnWrap !== undefined).reduce((method, {
    fnWrap
  }) => fnWrap(method, methodType), methodToWrap);
};
/**
 * Allows the plugin to generate its initial state.
 */


exports.F = FnWrap;

const Setup = (state, opts) => {
  [...DEFAULT_PLUGINS, ...opts.game.plugins].filter(plugin => plugin.setup !== undefined).forEach(plugin => {
    const name = plugin.name;
    const data = plugin.setup({
      G: state.G,
      ctx: state.ctx,
      game: opts.game
    });
    state = { ...state,
      plugins: { ...state.plugins,
        [name]: {
          data
        }
      }
    };
  });
  return state;
};
/**
 * Invokes the plugin before a move or event.
 * The API that the plugin generates is stored inside
 * the `plugins` section of the state (which is subsequently
 * merged into ctx).
 */


exports.t = Setup;

const Enhance = (state, opts) => {
  [...DEFAULT_PLUGINS, ...opts.game.plugins].filter(plugin => plugin.api !== undefined).forEach(plugin => {
    const name = plugin.name;
    const pluginState = state.plugins[name] || {
      data: {}
    };
    const api = plugin.api({
      G: state.G,
      ctx: state.ctx,
      data: pluginState.data,
      game: opts.game,
      playerID: opts.playerID
    });
    state = { ...state,
      plugins: { ...state.plugins,
        [name]: { ...pluginState,
          api
        }
      }
    };
  });
  return state;
};
/**
 * Allows plugins to update their state after a move / event.
 */


exports.m = Enhance;

const Flush = (state, opts) => {
  // We flush the events plugin first, then custom plugins and the core plugins.
  // This means custom plugins cannot use the events API but will be available in event hooks.
  // Note that plugins are flushed in reverse, to allow custom plugins calling each other.
  [...CORE_PLUGINS, ...opts.game.plugins, EventsPlugin].reverse().forEach(plugin => {
    const name = plugin.name;
    const pluginState = state.plugins[name] || {
      data: {}
    };

    if (plugin.flush) {
      const newData = plugin.flush({
        G: state.G,
        ctx: state.ctx,
        game: opts.game,
        api: pluginState.api,
        data: pluginState.data
      });
      state = { ...state,
        plugins: { ...state.plugins,
          [plugin.name]: {
            data: newData
          }
        }
      };
    } else if (plugin.dangerouslyFlushRawState) {
      state = plugin.dangerouslyFlushRawState({
        state,
        game: opts.game,
        api: pluginState.api,
        data: pluginState.data
      }); // Remove everything other than data.

      const data = state.plugins[name].data;
      state = { ...state,
        plugins: { ...state.plugins,
          [plugin.name]: {
            data
          }
        }
      };
    }
  });
  return state;
};
/**
 * Allows plugins to indicate if they should not be materialized on the client.
 * This will cause the client to discard the state update and wait for the
 * master instead.
 */


const NoClient = (state, opts) => {
  return [...DEFAULT_PLUGINS, ...opts.game.plugins].filter(plugin => plugin.noClient !== undefined).map(plugin => {
    const name = plugin.name;
    const pluginState = state.plugins[name];

    if (pluginState) {
      return plugin.noClient({
        G: state.G,
        ctx: state.ctx,
        game: opts.game,
        api: pluginState.api,
        data: pluginState.data
      });
    }

    return false;
  }).includes(true);
};
/**
 * Allows plugins to indicate if the entire action should be thrown out
 * as invalid. This will cancel the entire state update.
 */


exports.N = NoClient;

const IsInvalid = (state, opts) => {
  const firstInvalidReturn = [...DEFAULT_PLUGINS, ...opts.game.plugins].filter(plugin => plugin.isInvalid !== undefined).map(plugin => {
    const {
      name
    } = plugin;
    const pluginState = state.plugins[name];
    const message = plugin.isInvalid({
      G: state.G,
      ctx: state.ctx,
      game: opts.game,
      data: pluginState && pluginState.data
    });
    return message ? {
      plugin: name,
      message
    } : false;
  }).find(value => value);
  return firstInvalidReturn || false;
};
/**
 * Update plugin state after move/event & check if plugins consider the update to be valid.
 * @returns Tuple of `[updatedState]` or `[originalState, invalidError]`.
 */


const FlushAndValidate = (state, opts) => {
  const updatedState = Flush(state, opts);
  const isInvalid = IsInvalid(updatedState, opts);
  if (!isInvalid) return [updatedState];
  const {
    plugin,
    message
  } = isInvalid;
  error("".concat(plugin, " plugin declared action invalid:\n").concat(message));
  return [state, isInvalid];
};
/**
 * Allows plugins to customize their data for specific players.
 * For example, a plugin may want to share no data with the client, or
 * want to keep some player data secret from opponents.
 */


exports.q = FlushAndValidate;

const PlayerView = ({
  G,
  ctx,
  plugins = {}
}, {
  game,
  playerID
}) => {
  [...DEFAULT_PLUGINS, ...game.plugins].forEach(({
    name,
    playerView
  }) => {
    if (!playerView) return;
    const {
      data
    } = plugins[name] || {
      data: {}
    };
    const newData = playerView({
      G,
      ctx,
      game,
      data,
      playerID
    });
    plugins = { ...plugins,
      [name]: {
        data: newData
      }
    };
  });
  return plugins;
};
/**
 * Adjust the given options to use the new minMoves/maxMoves if a legacy moveLimit was given
 * @param options The options object to apply backwards compatibility to
 * @param enforceMinMoves Use moveLimit to set both minMoves and maxMoves
 */


exports.x = PlayerView;

function supportDeprecatedMoveLimit(options, enforceMinMoves = false) {
  if (options.moveLimit) {
    if (enforceMinMoves) {
      options.minMoves = options.moveLimit;
    }

    options.maxMoves = options.moveLimit;
    delete options.moveLimit;
  }
}
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */


function SetActivePlayers(ctx, arg) {
  let activePlayers = {};
  let _prevActivePlayers = [];
  let _nextActivePlayers = null;
  let _activePlayersMinMoves = {};
  let _activePlayersMaxMoves = {};

  if (Array.isArray(arg)) {
    // support a simple array of player IDs as active players
    const value = {};
    arg.forEach(v => value[v] = Stage.NULL);
    activePlayers = value;
  } else {
    // process active players argument object
    // stages previously did not enforce minMoves, this behaviour is kept intentionally
    supportDeprecatedMoveLimit(arg);

    if (arg.next) {
      _nextActivePlayers = arg.next;
    }

    if (arg.revert) {
      _prevActivePlayers = [...ctx._prevActivePlayers, {
        activePlayers: ctx.activePlayers,
        _activePlayersMinMoves: ctx._activePlayersMinMoves,
        _activePlayersMaxMoves: ctx._activePlayersMaxMoves,
        _activePlayersNumMoves: ctx._activePlayersNumMoves
      }];
    }

    if (arg.currentPlayer !== undefined) {
      ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, ctx.currentPlayer, arg.currentPlayer);
    }

    if (arg.others !== undefined) {
      for (let i = 0; i < ctx.playOrder.length; i++) {
        const id = ctx.playOrder[i];

        if (id !== ctx.currentPlayer) {
          ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, id, arg.others);
        }
      }
    }

    if (arg.all !== undefined) {
      for (let i = 0; i < ctx.playOrder.length; i++) {
        const id = ctx.playOrder[i];
        ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, id, arg.all);
      }
    }

    if (arg.value) {
      for (const id in arg.value) {
        ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, id, arg.value[id]);
      }
    }

    if (arg.minMoves) {
      for (const id in activePlayers) {
        if (_activePlayersMinMoves[id] === undefined) {
          _activePlayersMinMoves[id] = arg.minMoves;
        }
      }
    }

    if (arg.maxMoves) {
      for (const id in activePlayers) {
        if (_activePlayersMaxMoves[id] === undefined) {
          _activePlayersMaxMoves[id] = arg.maxMoves;
        }
      }
    }
  }

  if (Object.keys(activePlayers).length === 0) {
    activePlayers = null;
  }

  if (Object.keys(_activePlayersMinMoves).length === 0) {
    _activePlayersMinMoves = null;
  }

  if (Object.keys(_activePlayersMaxMoves).length === 0) {
    _activePlayersMaxMoves = null;
  }

  const _activePlayersNumMoves = {};

  for (const id in activePlayers) {
    _activePlayersNumMoves[id] = 0;
  }

  return { ...ctx,
    activePlayers,
    _activePlayersMinMoves,
    _activePlayersMaxMoves,
    _activePlayersNumMoves,
    _prevActivePlayers,
    _nextActivePlayers
  };
}
/**
 * Update activePlayers, setting it to previous, next or null values
 * when it becomes empty.
 * @param ctx
 */


function UpdateActivePlayersOnceEmpty(ctx) {
  let {
    activePlayers,
    _activePlayersMinMoves,
    _activePlayersMaxMoves,
    _activePlayersNumMoves,
    _prevActivePlayers,
    _nextActivePlayers
  } = ctx;

  if (activePlayers && Object.keys(activePlayers).length === 0) {
    if (_nextActivePlayers) {
      ctx = SetActivePlayers(ctx, _nextActivePlayers);
      ({
        activePlayers,
        _activePlayersMinMoves,
        _activePlayersMaxMoves,
        _activePlayersNumMoves,
        _prevActivePlayers
      } = ctx);
    } else if (_prevActivePlayers.length > 0) {
      const lastIndex = _prevActivePlayers.length - 1;
      ({
        activePlayers,
        _activePlayersMinMoves,
        _activePlayersMaxMoves,
        _activePlayersNumMoves
      } = _prevActivePlayers[lastIndex]);
      _prevActivePlayers = _prevActivePlayers.slice(0, lastIndex);
    } else {
      activePlayers = null;
      _activePlayersMinMoves = null;
      _activePlayersMaxMoves = null;
    }
  }

  return { ...ctx,
    activePlayers,
    _activePlayersMinMoves,
    _activePlayersMaxMoves,
    _activePlayersNumMoves,
    _prevActivePlayers
  };
}
/**
 * Apply an active player argument to the given player ID
 * @param {Object} activePlayers
 * @param {Object} _activePlayersMinMoves
 * @param {Object} _activePlayersMaxMoves
 * @param {String} playerID The player to apply the parameter to
 * @param {(String|Object)} arg An active player argument
 */


function ApplyActivePlayerArgument(activePlayers, _activePlayersMinMoves, _activePlayersMaxMoves, playerID, arg) {
  if (typeof arg !== 'object' || arg === Stage.NULL) {
    arg = {
      stage: arg
    };
  }

  if (arg.stage !== undefined) {
    // stages previously did not enforce minMoves, this behaviour is kept intentionally
    supportDeprecatedMoveLimit(arg);
    activePlayers[playerID] = arg.stage;
    if (arg.minMoves) _activePlayersMinMoves[playerID] = arg.minMoves;
    if (arg.maxMoves) _activePlayersMaxMoves[playerID] = arg.maxMoves;
  }
}
/**
 * Converts a playOrderPos index into its value in playOrder.
 * @param {Array} playOrder - An array of player ID's.
 * @param {number} playOrderPos - An index into the above.
 */


function getCurrentPlayer(playOrder, playOrderPos) {
  // convert to string in case playOrder is set to number[]
  return playOrder[playOrderPos] + '';
}
/**
 * Called at the start of a turn to initialize turn order state.
 *
 * TODO: This is called inside StartTurn, which is called from
 * both UpdateTurn and StartPhase (so it's called at the beginning
 * of a new phase as well as between turns). We should probably
 * split it into two.
 */


function InitTurnOrderState(state, turn) {
  let {
    G,
    ctx
  } = state;
  const {
    numPlayers
  } = ctx;
  const ctxWithAPI = EnhanceCtx(state);
  const order = turn.order;
  let playOrder = [...Array.from({
    length: numPlayers
  })].map((_, i) => i + '');

  if (order.playOrder !== undefined) {
    playOrder = order.playOrder(G, ctxWithAPI);
  }

  const playOrderPos = order.first(G, ctxWithAPI);
  const posType = typeof playOrderPos;

  if (posType !== 'number') {
    error("invalid value returned by turn.order.first \u2014 expected number got ".concat(posType, " \u201C").concat(playOrderPos, "\u201D."));
  }

  const currentPlayer = getCurrentPlayer(playOrder, playOrderPos);
  ctx = { ...ctx,
    currentPlayer,
    playOrderPos,
    playOrder
  };
  ctx = SetActivePlayers(ctx, turn.activePlayers || {});
  return ctx;
}
/**
 * Called at the end of each turn to update the turn order state.
 * @param {object} G - The game object G.
 * @param {object} ctx - The game object ctx.
 * @param {object} turn - A turn object for this phase.
 * @param {string} endTurnArg - An optional argument to endTurn that
                                may specify the next player.
 */


function UpdateTurnOrderState(state, currentPlayer, turn, endTurnArg) {
  const order = turn.order;
  let {
    G,
    ctx
  } = state;
  let playOrderPos = ctx.playOrderPos;
  let endPhase = false;

  if (endTurnArg && endTurnArg !== true) {
    if (typeof endTurnArg !== 'object') {
      error("invalid argument to endTurn: ".concat(endTurnArg));
    }

    Object.keys(endTurnArg).forEach(arg => {
      switch (arg) {
        case 'remove':
          currentPlayer = getCurrentPlayer(ctx.playOrder, playOrderPos);
          break;

        case 'next':
          playOrderPos = ctx.playOrder.indexOf(endTurnArg.next);
          currentPlayer = endTurnArg.next;
          break;

        default:
          error("invalid argument to endTurn: ".concat(arg));
      }
    });
  } else {
    const ctxWithAPI = EnhanceCtx(state);
    const t = order.next(G, ctxWithAPI);
    const type = typeof t;

    if (t !== undefined && type !== 'number') {
      error("invalid value returned by turn.order.next \u2014 expected number or undefined got ".concat(type, " \u201C").concat(t, "\u201D."));
    }

    if (t === undefined) {
      endPhase = true;
    } else {
      playOrderPos = t;
      currentPlayer = getCurrentPlayer(ctx.playOrder, playOrderPos);
    }
  }

  ctx = { ...ctx,
    playOrderPos,
    currentPlayer
  };
  return {
    endPhase,
    ctx
  };
}
/**
 * Set of different turn orders possible in a phase.
 * These are meant to be passed to the `turn` setting
 * in the flow objects.
 *
 * Each object defines the first player when the phase / game
 * begins, and also a function `next` to determine who the
 * next player is when the turn ends.
 *
 * The phase ends if next() returns undefined.
 */


const TurnOrder = {
  /**
   * DEFAULT
   *
   * The default round-robin turn order.
   */
  DEFAULT: {
    first: (G, ctx) => ctx.turn === 0 ? ctx.playOrderPos : (ctx.playOrderPos + 1) % ctx.playOrder.length,
    next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length
  },

  /**
   * RESET
   *
   * Similar to DEFAULT, but starts from 0 each time.
   */
  RESET: {
    first: () => 0,
    next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length
  },

  /**
   * CONTINUE
   *
   * Similar to DEFAULT, but starts with the player who ended the last phase.
   */
  CONTINUE: {
    first: (G, ctx) => ctx.playOrderPos,
    next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length
  },

  /**
   * ONCE
   *
   * Another round-robin turn order, but goes around just once.
   * The phase ends after all players have played.
   */
  ONCE: {
    first: () => 0,
    next: (G, ctx) => {
      if (ctx.playOrderPos < ctx.playOrder.length - 1) {
        return ctx.playOrderPos + 1;
      }
    }
  },

  /**
   * CUSTOM
   *
   * Identical to DEFAULT, but also sets playOrder at the
   * beginning of the phase.
   *
   * @param {Array} playOrder - The play order.
   */
  CUSTOM: playOrder => ({
    playOrder: () => playOrder,
    first: () => 0,
    next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length
  }),

  /**
   * CUSTOM_FROM
   *
   * Identical to DEFAULT, but also sets playOrder at the
   * beginning of the phase to a value specified by a field
   * in G.
   *
   * @param {string} playOrderField - Field in G.
   */
  CUSTOM_FROM: playOrderField => ({
    playOrder: G => G[playOrderField],
    first: () => 0,
    next: (G, ctx) => (ctx.playOrderPos + 1) % ctx.playOrder.length
  })
};
exports.T = TurnOrder;
const Stage = {
  NULL: null
};
exports.S = Stage;
const ActivePlayers = {
  /**
   * ALL
   *
   * The turn stays with one player, but any player can play (in any order)
   * until the phase ends.
   */
  ALL: {
    all: Stage.NULL
  },

  /**
   * ALL_ONCE
   *
   * The turn stays with one player, but any player can play (once, and in any order).
   * This is typically used in a phase where you want to elicit a response
   * from every player in the game.
   */
  ALL_ONCE: {
    all: Stage.NULL,
    minMoves: 1,
    maxMoves: 1
  },

  /**
   * OTHERS
   *
   * The turn stays with one player, and every *other* player can play (in any order)
   * until the phase ends.
   */
  OTHERS: {
    others: Stage.NULL
  },

  /**
   * OTHERS_ONCE
   *
   * The turn stays with one player, and every *other* player can play (once, and in any order).
   * This is typically used in a phase where you want to elicit a response
   * from every *other* player in the game.
   */
  OTHERS_ONCE: {
    others: Stage.NULL,
    minMoves: 1,
    maxMoves: 1
  }
};
exports.D = ActivePlayers;
},{"immer":"node_modules/immer/dist/immer.esm.js","lodash.isplainobject":"node_modules/lodash.isplainobject/index.js"}],"node_modules/rfc6902/pointer.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pointer = void 0;
/**
Unescape token part of a JSON Pointer string

`token` should *not* contain any '/' characters.

> Evaluation of each reference token begins by decoding any escaped
> character sequence.  This is performed by first transforming any
> occurrence of the sequence '~1' to '/', and then transforming any
> occurrence of the sequence '~0' to '~'.  By performing the
> substitutions in this order, an implementation avoids the error of
> turning '~01' first into '~1' and then into '/', which would be
> incorrect (the string '~01' correctly becomes '~1' after
> transformation).

Here's my take:

~1 is unescaped with higher priority than ~0 because it is a lower-order escape character.
I say "lower order" because '/' needs escaping due to the JSON Pointer serialization technique.
Whereas, '~' is escaped because escaping '/' uses the '~' character.
*/
function unescape(token) {
    return token.replace(/~1/g, '/').replace(/~0/g, '~');
}
/** Escape token part of a JSON Pointer string

> '~' needs to be encoded as '~0' and '/'
> needs to be encoded as '~1' when these characters appear in a
> reference token.

This is the exact inverse of `unescape()`, so the reverse replacements must take place in reverse order.
*/
function escape(token) {
    return token.replace(/~/g, '~0').replace(/\//g, '~1');
}
/**
JSON Pointer representation
*/
var Pointer = /** @class */ (function () {
    function Pointer(tokens) {
        if (tokens === void 0) { tokens = ['']; }
        this.tokens = tokens;
    }
    /**
    `path` *must* be a properly escaped string.
    */
    Pointer.fromJSON = function (path) {
        var tokens = path.split('/').map(unescape);
        if (tokens[0] !== '')
            throw new Error("Invalid JSON Pointer: " + path);
        return new Pointer(tokens);
    };
    Pointer.prototype.toString = function () {
        return this.tokens.map(escape).join('/');
    };
    /**
    Returns an object with 'parent', 'key', and 'value' properties.
    In the special case that this Pointer's path == "",
    this object will be {parent: null, key: '', value: object}.
    Otherwise, parent and key will have the property such that parent[key] == value.
    */
    Pointer.prototype.evaluate = function (object) {
        var parent = null;
        var key = '';
        var value = object;
        for (var i = 1, l = this.tokens.length; i < l; i++) {
            parent = value;
            key = this.tokens[i];
            // not sure if this the best way to handle non-existant paths...
            value = (parent || {})[key];
        }
        return { parent: parent, key: key, value: value };
    };
    Pointer.prototype.get = function (object) {
        return this.evaluate(object).value;
    };
    Pointer.prototype.set = function (object, value) {
        var cursor = object;
        for (var i = 1, l = this.tokens.length - 1, token = this.tokens[i]; i < l; i++) {
            // not sure if this the best way to handle non-existant paths...
            cursor = (cursor || {})[token];
        }
        if (cursor) {
            cursor[this.tokens[this.tokens.length - 1]] = value;
        }
    };
    Pointer.prototype.push = function (token) {
        // mutable
        this.tokens.push(token);
    };
    /**
    `token` should be a String. It'll be coerced to one anyway.
  
    immutable (shallowly)
    */
    Pointer.prototype.add = function (token) {
        var tokens = this.tokens.concat(String(token));
        return new Pointer(tokens);
    };
    return Pointer;
}());
exports.Pointer = Pointer;

},{}],"node_modules/rfc6902/util.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = exports.objectType = exports.hasOwnProperty = void 0;
exports.hasOwnProperty = Object.prototype.hasOwnProperty;
function objectType(object) {
    if (object === undefined) {
        return 'undefined';
    }
    if (object === null) {
        return 'null';
    }
    if (Array.isArray(object)) {
        return 'array';
    }
    return typeof object;
}
exports.objectType = objectType;
function isNonPrimitive(value) {
    // loose-equality checking for null is faster than strict checking for each of null/undefined/true/false
    // checking null first, then calling typeof, is faster than vice-versa
    return value != null && typeof value == 'object';
}
/**
Recursively copy a value.

@param source - should be a JavaScript primitive, Array, Date, or (plain old) Object.
@returns copy of source where every Array and Object have been recursively
         reconstructed from their constituent elements
*/
function clone(source) {
    if (!isNonPrimitive(source)) {
        // short-circuiting is faster than a single return
        return source;
    }
    // x.constructor == Array is the fastest way to check if x is an Array
    if (source.constructor == Array) {
        // construction via imperative for-loop is faster than source.map(arrayVsObject)
        var length_1 = source.length;
        // setting the Array length during construction is faster than just `[]` or `new Array()`
        var arrayTarget = new Array(length_1);
        for (var i = 0; i < length_1; i++) {
            arrayTarget[i] = clone(source[i]);
        }
        return arrayTarget;
    }
    // Date
    if (source.constructor == Date) {
        var dateTarget = new Date(+source);
        return dateTarget;
    }
    // Object
    var objectTarget = {};
    // declaring the variable (with const) inside the loop is faster
    for (var key in source) {
        // hasOwnProperty costs a bit of performance, but it's semantically necessary
        // using a global helper is MUCH faster than calling source.hasOwnProperty(key)
        if (exports.hasOwnProperty.call(source, key)) {
            objectTarget[key] = clone(source[key]);
        }
    }
    return objectTarget;
}
exports.clone = clone;

},{}],"node_modules/rfc6902/diff.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffAny = exports.diffObjects = exports.diffArrays = exports.intersection = exports.subtract = exports.isDestructive = void 0;
var pointer_1 = require("./pointer"); // we only need this for type inference
var util_1 = require("./util");
function isDestructive(_a) {
    var op = _a.op;
    return op === 'remove' || op === 'replace' || op === 'copy' || op === 'move';
}
exports.isDestructive = isDestructive;
/**
List the keys in `minuend` that are not in `subtrahend`.

A key is only considered if it is both 1) an own-property (o.hasOwnProperty(k))
of the object, and 2) has a value that is not undefined. This is to match JSON
semantics, where JSON object serialization drops keys with undefined values.

@param minuend Object of interest
@param subtrahend Object of comparison
@returns Array of keys that are in `minuend` but not in `subtrahend`.
*/
function subtract(minuend, subtrahend) {
    // initialize empty object; we only care about the keys, the values can be anything
    var obj = {};
    // build up obj with all the properties of minuend
    for (var add_key in minuend) {
        if (util_1.hasOwnProperty.call(minuend, add_key) && minuend[add_key] !== undefined) {
            obj[add_key] = 1;
        }
    }
    // now delete all the properties of subtrahend from obj
    // (deleting a missing key has no effect)
    for (var del_key in subtrahend) {
        if (util_1.hasOwnProperty.call(subtrahend, del_key) && subtrahend[del_key] !== undefined) {
            delete obj[del_key];
        }
    }
    // finally, extract whatever keys remain in obj
    return Object.keys(obj);
}
exports.subtract = subtract;
/**
List the keys that shared by all `objects`.

The semantics of what constitutes a "key" is described in {@link subtract}.

@param objects Array of objects to compare
@returns Array of keys that are in ("own-properties" of) every object in `objects`.
*/
function intersection(objects) {
    var length = objects.length;
    // prepare empty counter to keep track of how many objects each key occurred in
    var counter = {};
    // go through each object and increment the counter for each key in that object
    for (var i = 0; i < length; i++) {
        var object = objects[i];
        for (var key in object) {
            if (util_1.hasOwnProperty.call(object, key) && object[key] !== undefined) {
                counter[key] = (counter[key] || 0) + 1;
            }
        }
    }
    // now delete all keys from the counter that were not seen in every object
    for (var key in counter) {
        if (counter[key] < length) {
            delete counter[key];
        }
    }
    // finally, extract whatever keys remain in the counter
    return Object.keys(counter);
}
exports.intersection = intersection;
function isArrayAdd(array_operation) {
    return array_operation.op === 'add';
}
function isArrayRemove(array_operation) {
    return array_operation.op === 'remove';
}
function appendArrayOperation(base, operation) {
    return {
        // the new operation must be pushed on the end
        operations: base.operations.concat(operation),
        cost: base.cost + 1,
    };
}
/**
Calculate the shortest sequence of operations to get from `input` to `output`,
using a dynamic programming implementation of the Levenshtein distance algorithm.

To get from the input ABC to the output AZ we could just delete all the input
and say "insert A, insert Z" and be done with it. That's what we do if the
input is empty. But we can be smarter.

          output
               A   Z
               -   -
          [0]  1   2
input A |  1  [0]  1
      B |  2  [1]  1
      C |  3   2  [2]

1) start at 0,0 (+0)
2) keep A (+0)
3) remove B (+1)
4) replace C with Z (+1)

If the `input` (source) is empty, they'll all be in the top row, resulting in an
array of 'add' operations.
If the `output` (target) is empty, everything will be in the left column,
resulting in an array of 'remove' operations.

@returns A list of add/remove/replace operations.
*/
function diffArrays(input, output, ptr, diff) {
    if (diff === void 0) { diff = diffAny; }
    // set up cost matrix (very simple initialization: just a map)
    var memo = {
        '0,0': { operations: [], cost: 0 },
    };
    /**
    Calculate the cheapest sequence of operations required to get from
    input.slice(0, i) to output.slice(0, j).
    There may be other valid sequences with the same cost, but none cheaper.
  
    @param i The row in the layout above
    @param j The column in the layout above
    @returns An object containing a list of operations, along with the total cost
             of applying them (+1 for each add/remove/replace operation)
    */
    function dist(i, j) {
        // memoized
        var memo_key = i + "," + j;
        var memoized = memo[memo_key];
        if (memoized === undefined) {
            // TODO: this !diff(...).length usage could/should be lazy
            if (i > 0 && j > 0 && !diff(input[i - 1], output[j - 1], new pointer_1.Pointer()).length) {
                // equal (no operations => no cost)
                memoized = dist(i - 1, j - 1);
            }
            else {
                var alternatives = [];
                if (i > 0) {
                    // NOT topmost row
                    var remove_base = dist(i - 1, j);
                    var remove_operation = {
                        op: 'remove',
                        index: i - 1,
                    };
                    alternatives.push(appendArrayOperation(remove_base, remove_operation));
                }
                if (j > 0) {
                    // NOT leftmost column
                    var add_base = dist(i, j - 1);
                    var add_operation = {
                        op: 'add',
                        index: i - 1,
                        value: output[j - 1],
                    };
                    alternatives.push(appendArrayOperation(add_base, add_operation));
                }
                if (i > 0 && j > 0) {
                    // TABLE MIDDLE
                    // supposing we replaced it, compute the rest of the costs:
                    var replace_base = dist(i - 1, j - 1);
                    // okay, the general plan is to replace it, but we can be smarter,
                    // recursing into the structure and replacing only part of it if
                    // possible, but to do so we'll need the original value
                    var replace_operation = {
                        op: 'replace',
                        index: i - 1,
                        original: input[i - 1],
                        value: output[j - 1],
                    };
                    alternatives.push(appendArrayOperation(replace_base, replace_operation));
                }
                // the only other case, i === 0 && j === 0, has already been memoized
                // the meat of the algorithm:
                // sort by cost to find the lowest one (might be several ties for lowest)
                // [4, 6, 7, 1, 2].sort((a, b) => a - b) -> [ 1, 2, 4, 6, 7 ]
                var best = alternatives.sort(function (a, b) { return a.cost - b.cost; })[0];
                memoized = best;
            }
            memo[memo_key] = memoized;
        }
        return memoized;
    }
    // handle weird objects masquerading as Arrays that don't have proper length
    // properties by using 0 for everything but positive numbers
    var input_length = (isNaN(input.length) || input.length <= 0) ? 0 : input.length;
    var output_length = (isNaN(output.length) || output.length <= 0) ? 0 : output.length;
    var array_operations = dist(input_length, output_length).operations;
    var padded_operations = array_operations.reduce(function (_a, array_operation) {
        var operations = _a[0], padding = _a[1];
        if (isArrayAdd(array_operation)) {
            var padded_index = array_operation.index + 1 + padding;
            var index_token = padded_index < (input_length + padding) ? String(padded_index) : '-';
            var operation = {
                op: array_operation.op,
                path: ptr.add(index_token).toString(),
                value: array_operation.value,
            };
            // padding++ // maybe only if array_operation.index > -1 ?
            return [operations.concat(operation), padding + 1];
        }
        else if (isArrayRemove(array_operation)) {
            var operation = {
                op: array_operation.op,
                path: ptr.add(String(array_operation.index + padding)).toString(),
            };
            // padding--
            return [operations.concat(operation), padding - 1];
        }
        else { // replace
            var replace_ptr = ptr.add(String(array_operation.index + padding));
            var replace_operations = diff(array_operation.original, array_operation.value, replace_ptr);
            return [operations.concat.apply(operations, replace_operations), padding];
        }
    }, [[], 0])[0];
    return padded_operations;
}
exports.diffArrays = diffArrays;
function diffObjects(input, output, ptr, diff) {
    if (diff === void 0) { diff = diffAny; }
    // if a key is in input but not output -> remove it
    var operations = [];
    subtract(input, output).forEach(function (key) {
        operations.push({ op: 'remove', path: ptr.add(key).toString() });
    });
    // if a key is in output but not input -> add it
    subtract(output, input).forEach(function (key) {
        operations.push({ op: 'add', path: ptr.add(key).toString(), value: output[key] });
    });
    // if a key is in both, diff it recursively
    intersection([input, output]).forEach(function (key) {
        operations.push.apply(operations, diff(input[key], output[key], ptr.add(key)));
    });
    return operations;
}
exports.diffObjects = diffObjects;
/**
`diffAny()` returns an empty array if `input` and `output` are materially equal
(i.e., would produce equivalent JSON); otherwise it produces an array of patches
that would transform `input` into `output`.

> Here, "equal" means that the value at the target location and the
> value conveyed by "value" are of the same JSON type, and that they
> are considered equal by the following rules for that type:
> o  strings: are considered equal if they contain the same number of
>    Unicode characters and their code points are byte-by-byte equal.
> o  numbers: are considered equal if their values are numerically
>    equal.
> o  arrays: are considered equal if they contain the same number of
>    values, and if each value can be considered equal to the value at
>    the corresponding position in the other array, using this list of
>    type-specific rules.
> o  objects: are considered equal if they contain the same number of
>    members, and if each member can be considered equal to a member in
>    the other object, by comparing their keys (as strings) and their
>    values (using this list of type-specific rules).
> o  literals (false, true, and null): are considered equal if they are
>    the same.
*/
function diffAny(input, output, ptr, diff) {
    if (diff === void 0) { diff = diffAny; }
    // strict equality handles literals, numbers, and strings (a sufficient but not necessary cause)
    if (input === output) {
        return [];
    }
    var input_type = util_1.objectType(input);
    var output_type = util_1.objectType(output);
    if (input_type == 'array' && output_type == 'array') {
        return diffArrays(input, output, ptr, diff);
    }
    if (input_type == 'object' && output_type == 'object') {
        return diffObjects(input, output, ptr, diff);
    }
    // at this point we know that input and output are materially different;
    // could be array -> object, object -> array, boolean -> undefined,
    // number -> string, or some other combination, but nothing that can be split
    // up into multiple patches: so `output` must replace `input` wholesale.
    return [{ op: 'replace', path: ptr.toString(), value: output }];
}
exports.diffAny = diffAny;

},{"./pointer":"node_modules/rfc6902/pointer.js","./util":"node_modules/rfc6902/util.js"}],"node_modules/rfc6902/patch.js":[function(require,module,exports) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.InvalidOperationError = exports.test = exports.copy = exports.move = exports.replace = exports.remove = exports.add = exports.TestError = exports.MissingError = void 0;
var pointer_1 = require("./pointer");
var util_1 = require("./util");
var diff_1 = require("./diff");
var MissingError = /** @class */ (function (_super) {
    __extends(MissingError, _super);
    function MissingError(path) {
        var _this = _super.call(this, "Value required at path: " + path) || this;
        _this.path = path;
        _this.name = 'MissingError';
        return _this;
    }
    return MissingError;
}(Error));
exports.MissingError = MissingError;
var TestError = /** @class */ (function (_super) {
    __extends(TestError, _super);
    function TestError(actual, expected) {
        var _this = _super.call(this, "Test failed: " + actual + " != " + expected) || this;
        _this.actual = actual;
        _this.expected = expected;
        _this.name = 'TestError';
        return _this;
    }
    return TestError;
}(Error));
exports.TestError = TestError;
function _add(object, key, value) {
    if (Array.isArray(object)) {
        // `key` must be an index
        if (key == '-') {
            object.push(value);
        }
        else {
            var index = parseInt(key, 10);
            object.splice(index, 0, value);
        }
    }
    else {
        object[key] = value;
    }
}
function _remove(object, key) {
    if (Array.isArray(object)) {
        // '-' syntax doesn't make sense when removing
        var index = parseInt(key, 10);
        object.splice(index, 1);
    }
    else {
        // not sure what the proper behavior is when path = ''
        delete object[key];
    }
}
/**
>  o  If the target location specifies an array index, a new value is
>     inserted into the array at the specified index.
>  o  If the target location specifies an object member that does not
>     already exist, a new member is added to the object.
>  o  If the target location specifies an object member that does exist,
>     that member's value is replaced.
*/
function add(object, operation) {
    var endpoint = pointer_1.Pointer.fromJSON(operation.path).evaluate(object);
    // it's not exactly a "MissingError" in the same way that `remove` is -- more like a MissingParent, or something
    if (endpoint.parent === undefined) {
        return new MissingError(operation.path);
    }
    _add(endpoint.parent, endpoint.key, util_1.clone(operation.value));
    return null;
}
exports.add = add;
/**
> The "remove" operation removes the value at the target location.
> The target location MUST exist for the operation to be successful.
*/
function remove(object, operation) {
    // endpoint has parent, key, and value properties
    var endpoint = pointer_1.Pointer.fromJSON(operation.path).evaluate(object);
    if (endpoint.value === undefined) {
        return new MissingError(operation.path);
    }
    // not sure what the proper behavior is when path = ''
    _remove(endpoint.parent, endpoint.key);
    return null;
}
exports.remove = remove;
/**
> The "replace" operation replaces the value at the target location
> with a new value.  The operation object MUST contain a "value" member
> whose content specifies the replacement value.
> The target location MUST exist for the operation to be successful.

> This operation is functionally identical to a "remove" operation for
> a value, followed immediately by an "add" operation at the same
> location with the replacement value.

Even more simply, it's like the add operation with an existence check.
*/
function replace(object, operation) {
    var endpoint = pointer_1.Pointer.fromJSON(operation.path).evaluate(object);
    if (endpoint.parent === null) {
        return new MissingError(operation.path);
    }
    // this existence check treats arrays as a special case
    if (Array.isArray(endpoint.parent)) {
        if (parseInt(endpoint.key, 10) >= endpoint.parent.length) {
            return new MissingError(operation.path);
        }
    }
    else if (endpoint.value === undefined) {
        return new MissingError(operation.path);
    }
    endpoint.parent[endpoint.key] = operation.value;
    return null;
}
exports.replace = replace;
/**
> The "move" operation removes the value at a specified location and
> adds it to the target location.
> The operation object MUST contain a "from" member, which is a string
> containing a JSON Pointer value that references the location in the
> target document to move the value from.
> This operation is functionally identical to a "remove" operation on
> the "from" location, followed immediately by an "add" operation at
> the target location with the value that was just removed.

> The "from" location MUST NOT be a proper prefix of the "path"
> location; i.e., a location cannot be moved into one of its children.

TODO: throw if the check described in the previous paragraph fails.
*/
function move(object, operation) {
    var from_endpoint = pointer_1.Pointer.fromJSON(operation.from).evaluate(object);
    if (from_endpoint.value === undefined) {
        return new MissingError(operation.from);
    }
    var endpoint = pointer_1.Pointer.fromJSON(operation.path).evaluate(object);
    if (endpoint.parent === undefined) {
        return new MissingError(operation.path);
    }
    _remove(from_endpoint.parent, from_endpoint.key);
    _add(endpoint.parent, endpoint.key, from_endpoint.value);
    return null;
}
exports.move = move;
/**
> The "copy" operation copies the value at a specified location to the
> target location.
> The operation object MUST contain a "from" member, which is a string
> containing a JSON Pointer value that references the location in the
> target document to copy the value from.
> The "from" location MUST exist for the operation to be successful.

> This operation is functionally identical to an "add" operation at the
> target location using the value specified in the "from" member.

Alternatively, it's like 'move' without the 'remove'.
*/
function copy(object, operation) {
    var from_endpoint = pointer_1.Pointer.fromJSON(operation.from).evaluate(object);
    if (from_endpoint.value === undefined) {
        return new MissingError(operation.from);
    }
    var endpoint = pointer_1.Pointer.fromJSON(operation.path).evaluate(object);
    if (endpoint.parent === undefined) {
        return new MissingError(operation.path);
    }
    _add(endpoint.parent, endpoint.key, util_1.clone(from_endpoint.value));
    return null;
}
exports.copy = copy;
/**
> The "test" operation tests that a value at the target location is
> equal to a specified value.
> The operation object MUST contain a "value" member that conveys the
> value to be compared to the target location's value.
> The target location MUST be equal to the "value" value for the
> operation to be considered successful.
*/
function test(object, operation) {
    var endpoint = pointer_1.Pointer.fromJSON(operation.path).evaluate(object);
    // TODO: this diffAny(...).length usage could/should be lazy
    if (diff_1.diffAny(endpoint.value, operation.value, new pointer_1.Pointer()).length) {
        return new TestError(endpoint.value, operation.value);
    }
    return null;
}
exports.test = test;
var InvalidOperationError = /** @class */ (function (_super) {
    __extends(InvalidOperationError, _super);
    function InvalidOperationError(operation) {
        var _this = _super.call(this, "Invalid operation: " + operation.op) || this;
        _this.operation = operation;
        _this.name = 'InvalidOperationError';
        return _this;
    }
    return InvalidOperationError;
}(Error));
exports.InvalidOperationError = InvalidOperationError;
/**
Switch on `operation.op`, applying the corresponding patch function for each
case to `object`.
*/
function apply(object, operation) {
    // not sure why TypeScript can't infer typesafety of:
    //   {add, remove, replace, move, copy, test}[operation.op](object, operation)
    // (seems like a bug)
    switch (operation.op) {
        case 'add': return add(object, operation);
        case 'remove': return remove(object, operation);
        case 'replace': return replace(object, operation);
        case 'move': return move(object, operation);
        case 'copy': return copy(object, operation);
        case 'test': return test(object, operation);
    }
    return new InvalidOperationError(operation);
}
exports.apply = apply;

},{"./pointer":"node_modules/rfc6902/pointer.js","./util":"node_modules/rfc6902/util.js","./diff":"node_modules/rfc6902/diff.js"}],"node_modules/rfc6902/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTests = exports.createPatch = exports.applyPatch = void 0;
var pointer_1 = require("./pointer");
var patch_1 = require("./patch");
var diff_1 = require("./diff");
/**
Apply a 'application/json-patch+json'-type patch to an object.

`patch` *must* be an array of operations.

> Operation objects MUST have exactly one "op" member, whose value
> indicates the operation to perform.  Its value MUST be one of "add",
> "remove", "replace", "move", "copy", or "test"; other values are
> errors.

This method mutates the target object in-place.

@returns list of results, one for each operation: `null` indicated success,
         otherwise, the result will be an instance of one of the Error classes:
         MissingError, InvalidOperationError, or TestError.
*/
function applyPatch(object, patch) {
    return patch.map(function (operation) { return patch_1.apply(object, operation); });
}
exports.applyPatch = applyPatch;
function wrapVoidableDiff(diff) {
    function wrappedDiff(input, output, ptr) {
        var custom_patch = diff(input, output, ptr);
        // ensure an array is always returned
        return Array.isArray(custom_patch) ? custom_patch : diff_1.diffAny(input, output, ptr, wrappedDiff);
    }
    return wrappedDiff;
}
/**
Produce a 'application/json-patch+json'-type patch to get from one object to
another.

This does not alter `input` or `output` unless they have a property getter with
side-effects (which is not a good idea anyway).

`diff` is called on each pair of comparable non-primitive nodes in the
`input`/`output` object trees, producing nested patches. Return `undefined`
to fall back to default behaviour.

Returns list of operations to perform on `input` to produce `output`.
*/
function createPatch(input, output, diff) {
    var ptr = new pointer_1.Pointer();
    // a new Pointer gets a default path of [''] if not specified
    return (diff ? wrapVoidableDiff(diff) : diff_1.diffAny)(input, output, ptr);
}
exports.createPatch = createPatch;
/**
Create a test operation based on `input`'s current evaluation of the JSON
Pointer `path`; if such a pointer cannot be resolved, returns undefined.
*/
function createTest(input, path) {
    var endpoint = pointer_1.Pointer.fromJSON(path).evaluate(input);
    if (endpoint !== undefined) {
        return { op: 'test', path: path, value: endpoint.value };
    }
}
/**
Produce an 'application/json-patch+json'-type list of tests, to verify that
existing values in an object are identical to the those captured at some
checkpoint (whenever this function is called).

This does not alter `input` or `output` unless they have a property getter with
side-effects (which is not a good idea anyway).

Returns list of test operations.
*/
function createTests(input, patch) {
    var tests = new Array();
    patch.filter(diff_1.isDestructive).forEach(function (operation) {
        var pathTest = createTest(input, operation.path);
        if (pathTest)
            tests.push(pathTest);
        if ('from' in operation) {
            var fromTest = createTest(input, operation.from);
            if (fromTest)
                tests.push(fromTest);
        }
    });
    return tests;
}
exports.createTests = createTests;

},{"./pointer":"node_modules/rfc6902/pointer.js","./patch":"node_modules/rfc6902/patch.js","./diff":"node_modules/rfc6902/diff.js"}],"node_modules/boardgame.io/dist/esm/reducer-efc3ec3e.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.C = CreateGameReducer;
exports.I = IsLongFormMove;
exports.P = ProcessGameConfig;
exports.T = void 0;

var _turnOrder406c = require("./turn-order-406c4349.js");

var _rfc = require("rfc6902");

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Flow
 *
 * Creates a reducer that updates ctx (analogous to how moves update G).
 */
function Flow({
  moves,
  phases,
  endIf,
  onEnd,
  turn,
  events,
  plugins
}) {
  // Attach defaults.
  if (moves === undefined) {
    moves = {};
  }

  if (events === undefined) {
    events = {};
  }

  if (plugins === undefined) {
    plugins = [];
  }

  if (phases === undefined) {
    phases = {};
  }

  if (!endIf) endIf = () => undefined;
  if (!onEnd) onEnd = G => G;
  if (!turn) turn = {};
  const phaseMap = { ...phases
  };

  if ('' in phaseMap) {
    (0, _turnOrder406c.e)('cannot specify phase with empty name');
  }

  phaseMap[''] = {};
  const moveMap = {};
  const moveNames = new Set();
  let startingPhase = null;
  Object.keys(moves).forEach(name => moveNames.add(name));

  const HookWrapper = (hook, hookType) => {
    const withPlugins = (0, _turnOrder406c.F)(hook, hookType, plugins);
    return state => {
      const ctxWithAPI = (0, _turnOrder406c.E)(state);
      return withPlugins(state.G, ctxWithAPI);
    };
  };

  const TriggerWrapper = trigger => {
    return state => {
      const ctxWithAPI = (0, _turnOrder406c.E)(state);
      return trigger(state.G, ctxWithAPI);
    };
  };

  const wrapped = {
    onEnd: HookWrapper(onEnd, _turnOrder406c.G.GAME_ON_END),
    endIf: TriggerWrapper(endIf)
  };

  for (const phase in phaseMap) {
    const phaseConfig = phaseMap[phase];

    if (phaseConfig.start === true) {
      startingPhase = phase;
    }

    if (phaseConfig.moves !== undefined) {
      for (const move of Object.keys(phaseConfig.moves)) {
        moveMap[phase + '.' + move] = phaseConfig.moves[move];
        moveNames.add(move);
      }
    }

    if (phaseConfig.endIf === undefined) {
      phaseConfig.endIf = () => undefined;
    }

    if (phaseConfig.onBegin === undefined) {
      phaseConfig.onBegin = G => G;
    }

    if (phaseConfig.onEnd === undefined) {
      phaseConfig.onEnd = G => G;
    }

    if (phaseConfig.turn === undefined) {
      phaseConfig.turn = turn;
    }

    if (phaseConfig.turn.order === undefined) {
      phaseConfig.turn.order = _turnOrder406c.T.DEFAULT;
    }

    if (phaseConfig.turn.onBegin === undefined) {
      phaseConfig.turn.onBegin = G => G;
    }

    if (phaseConfig.turn.onEnd === undefined) {
      phaseConfig.turn.onEnd = G => G;
    }

    if (phaseConfig.turn.endIf === undefined) {
      phaseConfig.turn.endIf = () => false;
    }

    if (phaseConfig.turn.onMove === undefined) {
      phaseConfig.turn.onMove = G => G;
    }

    if (phaseConfig.turn.stages === undefined) {
      phaseConfig.turn.stages = {};
    } // turns previously treated moveLimit as both minMoves and maxMoves, this behaviour is kept intentionally


    (0, _turnOrder406c.a)(phaseConfig.turn, true);

    for (const stage in phaseConfig.turn.stages) {
      const stageConfig = phaseConfig.turn.stages[stage];
      const moves = stageConfig.moves || {};

      for (const move of Object.keys(moves)) {
        const key = phase + '.' + stage + '.' + move;
        moveMap[key] = moves[move];
        moveNames.add(move);
      }
    }

    phaseConfig.wrapped = {
      onBegin: HookWrapper(phaseConfig.onBegin, _turnOrder406c.G.PHASE_ON_BEGIN),
      onEnd: HookWrapper(phaseConfig.onEnd, _turnOrder406c.G.PHASE_ON_END),
      endIf: TriggerWrapper(phaseConfig.endIf)
    };
    phaseConfig.turn.wrapped = {
      onMove: HookWrapper(phaseConfig.turn.onMove, _turnOrder406c.G.TURN_ON_MOVE),
      onBegin: HookWrapper(phaseConfig.turn.onBegin, _turnOrder406c.G.TURN_ON_BEGIN),
      onEnd: HookWrapper(phaseConfig.turn.onEnd, _turnOrder406c.G.TURN_ON_END),
      endIf: TriggerWrapper(phaseConfig.turn.endIf)
    };

    if (typeof phaseConfig.next !== 'function') {
      const {
        next
      } = phaseConfig;

      phaseConfig.next = () => next || null;
    }

    phaseConfig.wrapped.next = TriggerWrapper(phaseConfig.next);
  }

  function GetPhase(ctx) {
    return ctx.phase ? phaseMap[ctx.phase] : phaseMap[''];
  }

  function OnMove(s) {
    return s;
  }

  function Process(state, events) {
    const phasesEnded = new Set();
    const turnsEnded = new Set();

    for (let i = 0; i < events.length; i++) {
      const {
        fn,
        arg,
        ...rest
      } = events[i]; // Detect a loop of EndPhase calls.
      // This could potentially even be an infinite loop
      // if the endIf condition of each phase blindly
      // returns true. The moment we detect a single
      // loop, we just bail out of all phases.

      if (fn === EndPhase) {
        turnsEnded.clear();
        const phase = state.ctx.phase;

        if (phasesEnded.has(phase)) {
          const ctx = { ...state.ctx,
            phase: null
          };
          return { ...state,
            ctx
          };
        }

        phasesEnded.add(phase);
      } // Process event.


      const next = [];
      state = fn(state, { ...rest,
        arg,
        next
      });

      if (fn === EndGame) {
        break;
      } // Check if we should end the game.


      const shouldEndGame = ShouldEndGame(state);

      if (shouldEndGame) {
        events.push({
          fn: EndGame,
          arg: shouldEndGame,
          turn: state.ctx.turn,
          phase: state.ctx.phase,
          automatic: true
        });
        continue;
      } // Check if we should end the phase.


      const shouldEndPhase = ShouldEndPhase(state);

      if (shouldEndPhase) {
        events.push({
          fn: EndPhase,
          arg: shouldEndPhase,
          turn: state.ctx.turn,
          phase: state.ctx.phase,
          automatic: true
        });
        continue;
      } // Check if we should end the turn.


      if ([OnMove, UpdateStage, UpdateActivePlayers].includes(fn)) {
        const shouldEndTurn = ShouldEndTurn(state);

        if (shouldEndTurn) {
          events.push({
            fn: EndTurn,
            arg: shouldEndTurn,
            turn: state.ctx.turn,
            phase: state.ctx.phase,
            automatic: true
          });
          continue;
        }
      }

      events.push(...next);
    }

    return state;
  } ///////////
  // Start //
  ///////////


  function StartGame(state, {
    next
  }) {
    next.push({
      fn: StartPhase
    });
    return state;
  }

  function StartPhase(state, {
    next
  }) {
    let {
      G,
      ctx
    } = state;
    const phaseConfig = GetPhase(ctx); // Run any phase setup code provided by the user.

    G = phaseConfig.wrapped.onBegin(state);
    next.push({
      fn: StartTurn
    });
    return { ...state,
      G,
      ctx
    };
  }

  function StartTurn(state, {
    currentPlayer
  }) {
    let {
      ctx
    } = state;
    const phaseConfig = GetPhase(ctx); // Initialize the turn order state.

    if (currentPlayer) {
      ctx = { ...ctx,
        currentPlayer
      };

      if (phaseConfig.turn.activePlayers) {
        ctx = (0, _turnOrder406c.b)(ctx, phaseConfig.turn.activePlayers);
      }
    } else {
      // This is only called at the beginning of the phase
      // when there is no currentPlayer yet.
      ctx = (0, _turnOrder406c.I)(state, phaseConfig.turn);
    }

    const turn = ctx.turn + 1;
    ctx = { ...ctx,
      turn,
      numMoves: 0,
      _prevActivePlayers: []
    };
    const G = phaseConfig.turn.wrapped.onBegin({ ...state,
      ctx
    });
    return { ...state,
      G,
      ctx,
      _undo: [],
      _redo: []
    };
  } ////////////
  // Update //
  ////////////


  function UpdatePhase(state, {
    arg,
    next,
    phase
  }) {
    const phaseConfig = GetPhase({
      phase
    });
    let {
      ctx
    } = state;

    if (arg && arg.next) {
      if (arg.next in phaseMap) {
        ctx = { ...ctx,
          phase: arg.next
        };
      } else {
        (0, _turnOrder406c.e)('invalid phase: ' + arg.next);
        return state;
      }
    } else {
      ctx = { ...ctx,
        phase: phaseConfig.wrapped.next(state) || null
      };
    }

    state = { ...state,
      ctx
    }; // Start the new phase.

    next.push({
      fn: StartPhase
    });
    return state;
  }

  function UpdateTurn(state, {
    arg,
    currentPlayer,
    next
  }) {
    let {
      G,
      ctx
    } = state;
    const phaseConfig = GetPhase(ctx); // Update turn order state.

    const {
      endPhase,
      ctx: newCtx
    } = (0, _turnOrder406c.U)(state, currentPlayer, phaseConfig.turn, arg);
    ctx = newCtx;
    state = { ...state,
      G,
      ctx
    };

    if (endPhase) {
      next.push({
        fn: EndPhase,
        turn: ctx.turn,
        phase: ctx.phase
      });
    } else {
      next.push({
        fn: StartTurn,
        currentPlayer: ctx.currentPlayer
      });
    }

    return state;
  }

  function UpdateStage(state, {
    arg,
    playerID
  }) {
    if (typeof arg === 'string' || arg === _turnOrder406c.S.NULL) {
      arg = {
        stage: arg
      };
    }

    if (typeof arg !== 'object') return state; // `arg` should be of type `StageArg`, loose typing as `any` here for historic reasons
    // stages previously did not enforce minMoves, this behaviour is kept intentionally

    (0, _turnOrder406c.a)(arg);
    let {
      ctx
    } = state;
    let {
      activePlayers,
      _activePlayersMinMoves,
      _activePlayersMaxMoves,
      _activePlayersNumMoves
    } = ctx; // Checking if stage is valid, even Stage.NULL

    if (arg.stage !== undefined) {
      if (activePlayers === null) {
        activePlayers = {};
      }

      activePlayers[playerID] = arg.stage;
      _activePlayersNumMoves[playerID] = 0;

      if (arg.minMoves) {
        if (_activePlayersMinMoves === null) {
          _activePlayersMinMoves = {};
        }

        _activePlayersMinMoves[playerID] = arg.minMoves;
      }

      if (arg.maxMoves) {
        if (_activePlayersMaxMoves === null) {
          _activePlayersMaxMoves = {};
        }

        _activePlayersMaxMoves[playerID] = arg.maxMoves;
      }
    }

    ctx = { ...ctx,
      activePlayers,
      _activePlayersMinMoves,
      _activePlayersMaxMoves,
      _activePlayersNumMoves
    };
    return { ...state,
      ctx
    };
  }

  function UpdateActivePlayers(state, {
    arg
  }) {
    return { ...state,
      ctx: (0, _turnOrder406c.b)(state.ctx, arg)
    };
  } ///////////////
  // ShouldEnd //
  ///////////////


  function ShouldEndGame(state) {
    return wrapped.endIf(state);
  }

  function ShouldEndPhase(state) {
    const phaseConfig = GetPhase(state.ctx);
    return phaseConfig.wrapped.endIf(state);
  }

  function ShouldEndTurn(state) {
    const phaseConfig = GetPhase(state.ctx); // End the turn if the required number of moves has been made.

    const currentPlayerMoves = state.ctx.numMoves || 0;

    if (phaseConfig.turn.maxMoves && currentPlayerMoves >= phaseConfig.turn.maxMoves) {
      return true;
    }

    return phaseConfig.turn.wrapped.endIf(state);
  } /////////
  // End //
  /////////


  function EndGame(state, {
    arg,
    phase
  }) {
    state = EndPhase(state, {
      phase
    });

    if (arg === undefined) {
      arg = true;
    }

    state = { ...state,
      ctx: { ...state.ctx,
        gameover: arg
      }
    }; // Run game end hook.

    const G = wrapped.onEnd(state);
    return { ...state,
      G
    };
  }

  function EndPhase(state, {
    arg,
    next,
    turn: initialTurn,
    automatic
  }) {
    // End the turn first.
    state = EndTurn(state, {
      turn: initialTurn,
      force: true,
      automatic: true
    });
    const {
      phase,
      turn
    } = state.ctx;

    if (next) {
      next.push({
        fn: UpdatePhase,
        arg,
        phase
      });
    } // If we aren't in a phase, there is nothing else to do.


    if (phase === null) {
      return state;
    } // Run any cleanup code for the phase that is about to end.


    const phaseConfig = GetPhase(state.ctx);
    const G = phaseConfig.wrapped.onEnd(state); // Reset the phase.

    const ctx = { ...state.ctx,
      phase: null
    }; // Add log entry.

    const action = (0, _turnOrder406c.g)('endPhase', arg);
    const {
      _stateID
    } = state;
    const logEntry = {
      action,
      _stateID,
      turn,
      phase
    };
    if (automatic) logEntry.automatic = true;
    const deltalog = [...(state.deltalog || []), logEntry];
    return { ...state,
      G,
      ctx,
      deltalog
    };
  }

  function EndTurn(state, {
    arg,
    next,
    turn: initialTurn,
    force,
    automatic,
    playerID
  }) {
    // This is not the turn that EndTurn was originally
    // called for. The turn was probably ended some other way.
    if (initialTurn !== state.ctx.turn) {
      return state;
    }

    const {
      currentPlayer,
      numMoves,
      phase,
      turn
    } = state.ctx;
    const phaseConfig = GetPhase(state.ctx); // Prevent ending the turn if minMoves haven't been reached.

    const currentPlayerMoves = numMoves || 0;

    if (!force && phaseConfig.turn.minMoves && currentPlayerMoves < phaseConfig.turn.minMoves) {
      (0, _turnOrder406c.i)("cannot end turn before making ".concat(phaseConfig.turn.minMoves, " moves"));
      return state;
    } // Run turn-end triggers.


    const G = phaseConfig.turn.wrapped.onEnd(state);

    if (next) {
      next.push({
        fn: UpdateTurn,
        arg,
        currentPlayer
      });
    } // Reset activePlayers.


    let ctx = { ...state.ctx,
      activePlayers: null
    }; // Remove player from playerOrder

    if (arg && arg.remove) {
      playerID = playerID || currentPlayer;
      const playOrder = ctx.playOrder.filter(i => i != playerID);
      const playOrderPos = ctx.playOrderPos > playOrder.length - 1 ? 0 : ctx.playOrderPos;
      ctx = { ...ctx,
        playOrder,
        playOrderPos
      };

      if (playOrder.length === 0) {
        next.push({
          fn: EndPhase,
          turn,
          phase
        });
        return state;
      }
    } // Create log entry.


    const action = (0, _turnOrder406c.g)('endTurn', arg);
    const {
      _stateID
    } = state;
    const logEntry = {
      action,
      _stateID,
      turn,
      phase
    };
    if (automatic) logEntry.automatic = true;
    const deltalog = [...(state.deltalog || []), logEntry];
    return { ...state,
      G,
      ctx,
      deltalog,
      _undo: [],
      _redo: []
    };
  }

  function EndStage(state, {
    arg,
    next,
    automatic,
    playerID
  }) {
    playerID = playerID || state.ctx.currentPlayer;
    let {
      ctx,
      _stateID
    } = state;
    let {
      activePlayers,
      _activePlayersNumMoves,
      _activePlayersMinMoves,
      _activePlayersMaxMoves,
      phase,
      turn
    } = ctx;
    const playerInStage = activePlayers !== null && playerID in activePlayers;
    const phaseConfig = GetPhase(ctx);

    if (!arg && playerInStage) {
      const stage = phaseConfig.turn.stages[activePlayers[playerID]];

      if (stage && stage.next) {
        arg = stage.next;
      }
    } // Checking if arg is a valid stage, even Stage.NULL


    if (next) {
      next.push({
        fn: UpdateStage,
        arg,
        playerID
      });
    } // If player isn???t in a stage, there is nothing else to do.


    if (!playerInStage) return state; // Prevent ending the stage if minMoves haven't been reached.

    const currentPlayerMoves = _activePlayersNumMoves[playerID] || 0;

    if (_activePlayersMinMoves && _activePlayersMinMoves[playerID] && currentPlayerMoves < _activePlayersMinMoves[playerID]) {
      (0, _turnOrder406c.i)("cannot end stage before making ".concat(_activePlayersMinMoves[playerID], " moves"));
      return state;
    } // Remove player from activePlayers.


    activePlayers = { ...activePlayers
    };
    delete activePlayers[playerID];

    if (_activePlayersMinMoves) {
      // Remove player from _activePlayersMinMoves.
      _activePlayersMinMoves = { ..._activePlayersMinMoves
      };
      delete _activePlayersMinMoves[playerID];
    }

    if (_activePlayersMaxMoves) {
      // Remove player from _activePlayersMaxMoves.
      _activePlayersMaxMoves = { ..._activePlayersMaxMoves
      };
      delete _activePlayersMaxMoves[playerID];
    }

    ctx = (0, _turnOrder406c.c)({ ...ctx,
      activePlayers,
      _activePlayersMinMoves,
      _activePlayersMaxMoves
    }); // Create log entry.

    const action = (0, _turnOrder406c.g)('endStage', arg);
    const logEntry = {
      action,
      _stateID,
      turn,
      phase
    };
    if (automatic) logEntry.automatic = true;
    const deltalog = [...(state.deltalog || []), logEntry];
    return { ...state,
      ctx,
      deltalog
    };
  }
  /**
   * Retrieves the relevant move that can be played by playerID.
   *
   * If ctx.activePlayers is set (i.e. one or more players are in some stage),
   * then it attempts to find the move inside the stages config for
   * that turn. If the stage for a player is '', then the player is
   * allowed to make a move (as determined by the phase config), but
   * isn't restricted to a particular set as defined in the stage config.
   *
   * If not, it then looks for the move inside the phase.
   *
   * If it doesn't find the move there, it looks at the global move definition.
   *
   * @param {object} ctx
   * @param {string} name
   * @param {string} playerID
   */


  function GetMove(ctx, name, playerID) {
    const phaseConfig = GetPhase(ctx);
    const stages = phaseConfig.turn.stages;
    const {
      activePlayers
    } = ctx;

    if (activePlayers && activePlayers[playerID] !== undefined && activePlayers[playerID] !== _turnOrder406c.S.NULL && stages[activePlayers[playerID]] !== undefined && stages[activePlayers[playerID]].moves !== undefined) {
      // Check if moves are defined for the player's stage.
      const stage = stages[activePlayers[playerID]];
      const moves = stage.moves;

      if (name in moves) {
        return moves[name];
      }
    } else if (phaseConfig.moves) {
      // Check if moves are defined for the current phase.
      if (name in phaseConfig.moves) {
        return phaseConfig.moves[name];
      }
    } else if (name in moves) {
      // Check for the move globally.
      return moves[name];
    }

    return null;
  }

  function ProcessMove(state, action) {
    const {
      playerID,
      type
    } = action;
    const {
      ctx
    } = state;
    const {
      currentPlayer,
      activePlayers,
      _activePlayersMaxMoves
    } = ctx;
    const move = GetMove(ctx, type, playerID);
    const shouldCount = !move || typeof move === 'function' || move.noLimit !== true;
    let {
      numMoves,
      _activePlayersNumMoves
    } = ctx;

    if (shouldCount) {
      if (playerID === currentPlayer) numMoves++;
      if (activePlayers) _activePlayersNumMoves[playerID]++;
    }

    state = { ...state,
      ctx: { ...ctx,
        numMoves,
        _activePlayersNumMoves
      }
    };

    if (_activePlayersMaxMoves && _activePlayersNumMoves[playerID] >= _activePlayersMaxMoves[playerID]) {
      state = EndStage(state, {
        playerID,
        automatic: true
      });
    }

    const phaseConfig = GetPhase(ctx);
    const G = phaseConfig.turn.wrapped.onMove(state);
    state = { ...state,
      G
    };
    const events = [{
      fn: OnMove
    }];
    return Process(state, events);
  }

  function SetStageEvent(state, playerID, arg) {
    return Process(state, [{
      fn: EndStage,
      arg,
      playerID
    }]);
  }

  function EndStageEvent(state, playerID) {
    return Process(state, [{
      fn: EndStage,
      playerID
    }]);
  }

  function SetActivePlayersEvent(state, _playerID, arg) {
    return Process(state, [{
      fn: UpdateActivePlayers,
      arg
    }]);
  }

  function SetPhaseEvent(state, _playerID, newPhase) {
    return Process(state, [{
      fn: EndPhase,
      phase: state.ctx.phase,
      turn: state.ctx.turn,
      arg: {
        next: newPhase
      }
    }]);
  }

  function EndPhaseEvent(state) {
    return Process(state, [{
      fn: EndPhase,
      phase: state.ctx.phase,
      turn: state.ctx.turn
    }]);
  }

  function EndTurnEvent(state, _playerID, arg) {
    return Process(state, [{
      fn: EndTurn,
      turn: state.ctx.turn,
      phase: state.ctx.phase,
      arg
    }]);
  }

  function PassEvent(state, _playerID, arg) {
    return Process(state, [{
      fn: EndTurn,
      turn: state.ctx.turn,
      phase: state.ctx.phase,
      force: true,
      arg
    }]);
  }

  function EndGameEvent(state, _playerID, arg) {
    return Process(state, [{
      fn: EndGame,
      turn: state.ctx.turn,
      phase: state.ctx.phase,
      arg
    }]);
  }

  const eventHandlers = {
    endStage: EndStageEvent,
    setStage: SetStageEvent,
    endTurn: EndTurnEvent,
    pass: PassEvent,
    endPhase: EndPhaseEvent,
    setPhase: SetPhaseEvent,
    endGame: EndGameEvent,
    setActivePlayers: SetActivePlayersEvent
  };
  const enabledEventNames = [];

  if (events.endTurn !== false) {
    enabledEventNames.push('endTurn');
  }

  if (events.pass !== false) {
    enabledEventNames.push('pass');
  }

  if (events.endPhase !== false) {
    enabledEventNames.push('endPhase');
  }

  if (events.setPhase !== false) {
    enabledEventNames.push('setPhase');
  }

  if (events.endGame !== false) {
    enabledEventNames.push('endGame');
  }

  if (events.setActivePlayers !== false) {
    enabledEventNames.push('setActivePlayers');
  }

  if (events.endStage !== false) {
    enabledEventNames.push('endStage');
  }

  if (events.setStage !== false) {
    enabledEventNames.push('setStage');
  }

  function ProcessEvent(state, action) {
    const {
      type,
      playerID,
      args
    } = action.payload;
    if (typeof eventHandlers[type] !== 'function') return state;
    return eventHandlers[type](state, playerID, ...(Array.isArray(args) ? args : [args]));
  }

  function IsPlayerActive(_G, ctx, playerID) {
    if (ctx.activePlayers) {
      return playerID in ctx.activePlayers;
    }

    return ctx.currentPlayer === playerID;
  }

  return {
    ctx: numPlayers => ({
      numPlayers,
      turn: 0,
      currentPlayer: '0',
      playOrder: [...Array.from({
        length: numPlayers
      })].map((_, i) => i + ''),
      playOrderPos: 0,
      phase: startingPhase,
      activePlayers: null
    }),
    init: state => {
      return Process(state, [{
        fn: StartGame
      }]);
    },
    isPlayerActive: IsPlayerActive,
    eventHandlers,
    eventNames: Object.keys(eventHandlers),
    enabledEventNames,
    moveMap,
    moveNames: [...moveNames.values()],
    processMove: ProcessMove,
    processEvent: ProcessEvent,
    getMove: GetMove
  };
}
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */


function IsProcessed(game) {
  return game.processMove !== undefined;
}
/**
 * Helper to generate the game move reducer. The returned
 * reducer has the following signature:
 *
 * (G, action, ctx) => {}
 *
 * You can roll your own if you like, or use any Redux
 * addon to generate such a reducer.
 *
 * The convention used in this framework is to
 * have action.type contain the name of the move, and
 * action.args contain any additional arguments as an
 * Array.
 */


function ProcessGameConfig(game) {
  // The Game() function has already been called on this
  // config object, so just pass it through.
  if (IsProcessed(game)) {
    return game;
  }

  if (game.name === undefined) game.name = 'default';
  if (game.deltaState === undefined) game.deltaState = false;
  if (game.disableUndo === undefined) game.disableUndo = false;
  if (game.setup === undefined) game.setup = () => ({});
  if (game.moves === undefined) game.moves = {};
  if (game.playerView === undefined) game.playerView = G => G;
  if (game.plugins === undefined) game.plugins = [];
  game.plugins.forEach(plugin => {
    if (plugin.name === undefined) {
      throw new Error('Plugin missing name attribute');
    }

    if (plugin.name.includes(' ')) {
      throw new Error(plugin.name + ': Plugin name must not include spaces');
    }
  });

  if (game.name.includes(' ')) {
    throw new Error(game.name + ': Game name must not include spaces');
  }

  const flow = Flow(game);
  return { ...game,
    flow,
    moveNames: flow.moveNames,
    pluginNames: game.plugins.map(p => p.name),
    processMove: (state, action) => {
      let moveFn = flow.getMove(state.ctx, action.type, action.playerID);

      if (IsLongFormMove(moveFn)) {
        moveFn = moveFn.move;
      }

      if (moveFn instanceof Function) {
        const fn = (0, _turnOrder406c.F)(moveFn, _turnOrder406c.G.MOVE, game.plugins);
        const ctxWithAPI = { ...(0, _turnOrder406c.E)(state),
          playerID: action.playerID
        };
        let args = [];

        if (action.args !== undefined) {
          args = Array.isArray(action.args) ? action.args : [action.args];
        }

        return fn(state.G, ctxWithAPI, ...args);
      }

      (0, _turnOrder406c.e)("invalid move object: ".concat(action.type));
      return state.G;
    }
  };
}

function IsLongFormMove(move) {
  return move instanceof Object && move.move !== undefined;
}
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */


var UpdateErrorType;

(function (UpdateErrorType) {
  // The action???s credentials were missing or invalid
  UpdateErrorType["UnauthorizedAction"] = "update/unauthorized_action"; // The action???s matchID was not found

  UpdateErrorType["MatchNotFound"] = "update/match_not_found"; // Could not apply Patch operation (rfc6902).

  UpdateErrorType["PatchFailed"] = "update/patch_failed";
})(UpdateErrorType || (UpdateErrorType = {}));

var ActionErrorType;

(function (ActionErrorType) {
  // The action contained a stale state ID
  ActionErrorType["StaleStateId"] = "action/stale_state_id"; // The requested move is unknown or not currently available

  ActionErrorType["UnavailableMove"] = "action/unavailable_move"; // The move declared it was invalid (INVALID_MOVE constant)

  ActionErrorType["InvalidMove"] = "action/invalid_move"; // The player making the action is not currently active

  ActionErrorType["InactivePlayer"] = "action/inactive_player"; // The game has finished

  ActionErrorType["GameOver"] = "action/gameover"; // The requested action is disabled (e.g. undo/redo, events)

  ActionErrorType["ActionDisabled"] = "action/action_disabled"; // The requested action is not currently possible

  ActionErrorType["ActionInvalid"] = "action/action_invalid"; // The requested action was declared invalid by a plugin

  ActionErrorType["PluginActionInvalid"] = "action/plugin_invalid";
})(ActionErrorType || (ActionErrorType = {}));
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Check if the payload for the passed action contains a playerID.
 */


const actionHasPlayerID = action => action.payload.playerID !== null && action.payload.playerID !== undefined;
/**
 * Returns true if a move can be undone.
 */


const CanUndoMove = (G, ctx, move) => {
  function HasUndoable(move) {
    return move.undoable !== undefined;
  }

  function IsFunction(undoable) {
    return undoable instanceof Function;
  }

  if (!HasUndoable(move)) {
    return true;
  }

  if (IsFunction(move.undoable)) {
    return move.undoable(G, ctx);
  }

  return move.undoable;
};
/**
 * Update the undo and redo stacks for a move or event.
 */


function updateUndoRedoState(state, opts) {
  if (opts.game.disableUndo) return state;
  const undoEntry = {
    G: state.G,
    ctx: state.ctx,
    plugins: state.plugins,
    playerID: opts.action.payload.playerID || state.ctx.currentPlayer
  };

  if (opts.action.type === 'MAKE_MOVE') {
    undoEntry.moveType = opts.action.payload.type;
  }

  return { ...state,
    _undo: [...state._undo, undoEntry],
    // Always reset redo stack when making a move or event
    _redo: []
  };
}
/**
 * Process state, adding the initial deltalog for this action.
 */


function initializeDeltalog(state, action, move) {
  // Create a log entry for this action.
  const logEntry = {
    action,
    _stateID: state._stateID,
    turn: state.ctx.turn,
    phase: state.ctx.phase
  };
  const pluginLogMetadata = state.plugins.log.data.metadata;

  if (pluginLogMetadata !== undefined) {
    logEntry.metadata = pluginLogMetadata;
  }

  if (typeof move === 'object' && move.redact === true) {
    logEntry.redact = true;
  }

  return { ...state,
    deltalog: [logEntry]
  };
}
/**
 * Update plugin state after move/event & check if plugins consider the action to be valid.
 * @param state Current version of state in the reducer.
 * @param oldState State to revert to in case of error.
 * @param pluginOpts Plugin configuration options.
 * @returns Tuple of the new state updated after flushing plugins and the old
 * state augmented with an error if a plugin declared the action invalid.
 */


function flushAndValidatePlugins(state, oldState, pluginOpts) {
  const [newState, isInvalid] = (0, _turnOrder406c.q)(state, pluginOpts);
  if (!isInvalid) return [newState];
  return [newState, WithError(oldState, ActionErrorType.PluginActionInvalid, isInvalid)];
}
/**
 * ExtractTransientsFromState
 *
 * Split out transients from the a TransientState
 */


function ExtractTransients(transientState) {
  if (!transientState) {
    // We preserve null for the state for legacy callers, but the transient
    // field should be undefined if not present to be consistent with the
    // code path below.
    return [null, undefined];
  }

  const {
    transients,
    ...state
  } = transientState;
  return [state, transients];
}
/**
 * WithError
 *
 * Augment a State instance with transient error information.
 */


function WithError(state, errorType, payload) {
  const error = {
    type: errorType,
    payload
  };
  return { ...state,
    transients: {
      error
    }
  };
}
/**
 * Middleware for processing TransientState associated with the reducer
 * returned by CreateGameReducer.
 * This should pretty much be used everywhere you want realistic state
 * transitions and error handling.
 */


const TransientHandlingMiddleware = store => next => action => {
  const result = next(action);

  switch (action.type) {
    case _turnOrder406c.p:
      {
        return result;
      }

    default:
      {
        const [, transients] = ExtractTransients(store.getState());

        if (typeof transients !== 'undefined') {
          store.dispatch((0, _turnOrder406c.r)()); // Dev Note: If parent middleware needs to correlate the spawned
          // StripTransients action to the triggering action, instrument here.
          //
          // This is a bit tricky; for more details, see:
          //   https://github.com/boardgameio/boardgame.io/pull/940#discussion_r636200648

          return { ...result,
            transients
          };
        }

        return result;
      }
  }
};
/**
 * CreateGameReducer
 *
 * Creates the main game state reducer.
 */


exports.T = TransientHandlingMiddleware;

function CreateGameReducer({
  game,
  isClient
}) {
  game = ProcessGameConfig(game);
  /**
   * GameReducer
   *
   * Redux reducer that maintains the overall game state.
   * @param {object} state - The state before the action.
   * @param {object} action - A Redux action.
   */

  return (stateWithTransients = null, action) => {
    let [state
    /*, transients */
    ] = ExtractTransients(stateWithTransients);

    switch (action.type) {
      case _turnOrder406c.p:
        {
          // This action indicates that transient metadata in the state has been
          // consumed and should now be stripped from the state..
          return state;
        }

      case _turnOrder406c.o:
        {
          state = { ...state,
            deltalog: []
          }; // Process game events only on the server.
          // These events like `endTurn` typically
          // contain code that may rely on secret state
          // and cannot be computed on the client.

          if (isClient) {
            return state;
          } // Disallow events once the game is over.


          if (state.ctx.gameover !== undefined) {
            (0, _turnOrder406c.e)("cannot call event after game end");
            return WithError(state, ActionErrorType.GameOver);
          } // Ignore the event if the player isn't active.


          if (actionHasPlayerID(action) && !game.flow.isPlayerActive(state.G, state.ctx, action.payload.playerID)) {
            (0, _turnOrder406c.e)("disallowed event: ".concat(action.payload.type));
            return WithError(state, ActionErrorType.InactivePlayer);
          } // Execute plugins.


          state = (0, _turnOrder406c.m)(state, {
            game,
            isClient: false,
            playerID: action.payload.playerID
          }); // Process event.

          let newState = game.flow.processEvent(state, action); // Execute plugins.

          let stateWithError;
          [newState, stateWithError] = flushAndValidatePlugins(newState, state, {
            game,
            isClient: false
          });
          if (stateWithError) return stateWithError; // Update undo / redo state.

          newState = updateUndoRedoState(newState, {
            game,
            action
          });
          return { ...newState,
            _stateID: state._stateID + 1
          };
        }

      case _turnOrder406c.M:
        {
          const oldState = state = { ...state,
            deltalog: []
          }; // Check whether the move is allowed at this time.

          const move = game.flow.getMove(state.ctx, action.payload.type, action.payload.playerID || state.ctx.currentPlayer);

          if (move === null) {
            (0, _turnOrder406c.e)("disallowed move: ".concat(action.payload.type));
            return WithError(state, ActionErrorType.UnavailableMove);
          } // Don't run move on client if move says so.


          if (isClient && move.client === false) {
            return state;
          } // Disallow moves once the game is over.


          if (state.ctx.gameover !== undefined) {
            (0, _turnOrder406c.e)("cannot make move after game end");
            return WithError(state, ActionErrorType.GameOver);
          } // Ignore the move if the player isn't active.


          if (actionHasPlayerID(action) && !game.flow.isPlayerActive(state.G, state.ctx, action.payload.playerID)) {
            (0, _turnOrder406c.e)("disallowed move: ".concat(action.payload.type));
            return WithError(state, ActionErrorType.InactivePlayer);
          } // Execute plugins.


          state = (0, _turnOrder406c.m)(state, {
            game,
            isClient,
            playerID: action.payload.playerID
          }); // Process the move.

          const G = game.processMove(state, action.payload); // The game declared the move as invalid.

          if (G === _turnOrder406c.n) {
            (0, _turnOrder406c.e)("invalid move: ".concat(action.payload.type, " args: ").concat(action.payload.args)); // TODO(#723): Marshal a nice error payload with the processed move.

            return WithError(state, ActionErrorType.InvalidMove);
          }

          const newState = { ...state,
            G
          }; // Some plugin indicated that it is not suitable to be
          // materialized on the client (and must wait for the server
          // response instead).

          if (isClient && (0, _turnOrder406c.N)(newState, {
            game
          })) {
            return state;
          }

          state = newState; // If we're on the client, just process the move
          // and no triggers in multiplayer mode.
          // These will be processed on the server, which
          // will send back a state update.

          if (isClient) {
            let stateWithError;
            [state, stateWithError] = flushAndValidatePlugins(state, oldState, {
              game,
              isClient: true
            });
            if (stateWithError) return stateWithError;
            return { ...state,
              _stateID: state._stateID + 1
            };
          } // On the server, construct the deltalog.


          state = initializeDeltalog(state, action, move); // Allow the flow reducer to process any triggers that happen after moves.

          state = game.flow.processMove(state, action.payload);
          let stateWithError;
          [state, stateWithError] = flushAndValidatePlugins(state, oldState, {
            game
          });
          if (stateWithError) return stateWithError; // Update undo / redo state.

          state = updateUndoRedoState(state, {
            game,
            action
          });
          return { ...state,
            _stateID: state._stateID + 1
          };
        }

      case _turnOrder406c.l:
      case _turnOrder406c.k:
      case _turnOrder406c.j:
        {
          return action.state;
        }

      case _turnOrder406c.h:
        {
          state = { ...state,
            deltalog: []
          };

          if (game.disableUndo) {
            (0, _turnOrder406c.e)('Undo is not enabled');
            return WithError(state, ActionErrorType.ActionDisabled);
          }

          const {
            G,
            ctx,
            _undo,
            _redo,
            _stateID
          } = state;

          if (_undo.length < 2) {
            (0, _turnOrder406c.e)("No moves to undo");
            return WithError(state, ActionErrorType.ActionInvalid);
          }

          const last = _undo[_undo.length - 1];
          const restore = _undo[_undo.length - 2]; // Only allow players to undo their own moves.

          if (actionHasPlayerID(action) && action.payload.playerID !== last.playerID) {
            (0, _turnOrder406c.e)("Cannot undo other players' moves");
            return WithError(state, ActionErrorType.ActionInvalid);
          } // If undoing a move, check it is undoable.


          if (last.moveType) {
            const lastMove = game.flow.getMove(restore.ctx, last.moveType, last.playerID);

            if (!CanUndoMove(G, ctx, lastMove)) {
              (0, _turnOrder406c.e)("Move cannot be undone");
              return WithError(state, ActionErrorType.ActionInvalid);
            }
          }

          state = initializeDeltalog(state, action);
          return { ...state,
            G: restore.G,
            ctx: restore.ctx,
            plugins: restore.plugins,
            _stateID: _stateID + 1,
            _undo: _undo.slice(0, -1),
            _redo: [last, ..._redo]
          };
        }

      case _turnOrder406c.R:
        {
          state = { ...state,
            deltalog: []
          };

          if (game.disableUndo) {
            (0, _turnOrder406c.e)('Redo is not enabled');
            return WithError(state, ActionErrorType.ActionDisabled);
          }

          const {
            _undo,
            _redo,
            _stateID
          } = state;

          if (_redo.length === 0) {
            (0, _turnOrder406c.e)("No moves to redo");
            return WithError(state, ActionErrorType.ActionInvalid);
          }

          const first = _redo[0]; // Only allow players to redo their own undos.

          if (actionHasPlayerID(action) && action.payload.playerID !== first.playerID) {
            (0, _turnOrder406c.e)("Cannot redo other players' moves");
            return WithError(state, ActionErrorType.ActionInvalid);
          }

          state = initializeDeltalog(state, action);
          return { ...state,
            G: first.G,
            ctx: first.ctx,
            plugins: first.plugins,
            _stateID: _stateID + 1,
            _undo: [..._undo, first],
            _redo: _redo.slice(1)
          };
        }

      case _turnOrder406c.d:
        {
          // TODO(#723): Expose error semantics to plugin processing.
          return (0, _turnOrder406c.f)(state, action, {
            game
          });
        }

      case _turnOrder406c.P:
        {
          const oldState = state;
          const newState = JSON.parse(JSON.stringify(oldState));
          const patchError = (0, _rfc.applyPatch)(newState, action.patch);
          const hasError = patchError.some(entry => entry !== null);

          if (hasError) {
            (0, _turnOrder406c.e)("Patch ".concat(JSON.stringify(action.patch), " apply failed"));
            return WithError(oldState, UpdateErrorType.PatchFailed, patchError);
          } else {
            return newState;
          }
        }

      default:
        {
          return state;
        }
    }
  };
}
},{"./turn-order-406c4349.js":"node_modules/boardgame.io/dist/esm/turn-order-406c4349.js","rfc6902":"node_modules/rfc6902/index.js"}],"node_modules/flatted/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromJSON = exports.toJSON = exports.stringify = exports.parse = void 0;

/*! (c) 2020 Andrea Giammarchi */
const {
  parse: $parse,
  stringify: $stringify
} = JSON;
const {
  keys
} = Object;
const Primitive = String; // it could be Number

const primitive = 'string'; // it could be 'number'

const ignore = {};
const object = 'object';

const noop = (_, value) => value;

const primitives = value => value instanceof Primitive ? Primitive(value) : value;

const Primitives = (_, value) => typeof value === primitive ? new Primitive(value) : value;

const revive = (input, parsed, output, $) => {
  const lazy = [];

  for (let ke = keys(output), {
    length
  } = ke, y = 0; y < length; y++) {
    const k = ke[y];
    const value = output[k];

    if (value instanceof Primitive) {
      const tmp = input[value];

      if (typeof tmp === object && !parsed.has(tmp)) {
        parsed.add(tmp);
        output[k] = ignore;
        lazy.push({
          k,
          a: [input, parsed, tmp, $]
        });
      } else output[k] = $.call(output, k, tmp);
    } else if (output[k] !== ignore) output[k] = $.call(output, k, value);
  }

  for (let {
    length
  } = lazy, i = 0; i < length; i++) {
    const {
      k,
      a
    } = lazy[i];
    output[k] = $.call(output, k, revive.apply(null, a));
  }

  return output;
};

const set = (known, input, value) => {
  const index = Primitive(input.push(value) - 1);
  known.set(value, index);
  return index;
};

const parse = (text, reviver) => {
  const input = $parse(text, Primitives).map(primitives);
  const value = input[0];
  const $ = reviver || noop;
  const tmp = typeof value === object && value ? revive(input, new Set(), value, $) : value;
  return $.call({
    '': tmp
  }, '', tmp);
};

exports.parse = parse;

const stringify = (value, replacer, space) => {
  const $ = replacer && typeof replacer === object ? (k, v) => k === '' || -1 < replacer.indexOf(k) ? v : void 0 : replacer || noop;
  const known = new Map();
  const input = [];
  const output = [];
  let i = +set(known, input, $.call({
    '': value
  }, '', value));
  let firstRun = !i;

  while (i < input.length) {
    firstRun = true;
    output[i] = $stringify(input[i++], replace, space);
  }

  return '[' + output.join(',') + ']';

  function replace(key, value) {
    if (firstRun) {
      firstRun = !firstRun;
      return value;
    }

    const after = $.call(this, key, value);

    switch (typeof after) {
      case object:
        if (after === null) return after;

      case primitive:
        return known.get(after) || set(known, input, after);
    }

    return after;
  }
};

exports.stringify = stringify;

const toJSON = any => $parse(stringify(any));

exports.toJSON = toJSON;

const fromJSON = any => parse($stringify(any));

exports.fromJSON = fromJSON;
},{}],"node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"node_modules/setimmediate/setImmediate.js":[function(require,module,exports) {
var global = arguments[3];
var process = require("process");
(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6???8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

},{"process":"node_modules/process/browser.js"}],"node_modules/boardgame.io/dist/esm/ai-7a5eea10.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.S = Step;
exports.a = Simulate;
exports.R = exports.M = exports.B = void 0;

var _turnOrder406c = require("./turn-order-406c4349.js");

var _reducerEfc3ec3e = require("./reducer-efc3ec3e.js");

require("setimmediate");

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Base class that bots can extend.
 */
class Bot {
  constructor({
    enumerate,
    seed
  }) {
    this.enumerateFn = enumerate;
    this.seed = seed;
    this.iterationCounter = 0;
    this._opts = {};
  }

  addOpt({
    key,
    range,
    initial
  }) {
    this._opts[key] = {
      range,
      value: initial
    };
  }

  getOpt(key) {
    return this._opts[key].value;
  }

  setOpt(key, value) {
    if (key in this._opts) {
      this._opts[key].value = value;
    }
  }

  opts() {
    return this._opts;
  }

  enumerate(G, ctx, playerID) {
    const actions = this.enumerateFn(G, ctx, playerID);
    return actions.map(a => {
      if ('payload' in a) {
        return a;
      }

      if ('move' in a) {
        return (0, _turnOrder406c.B)(a.move, a.args, playerID);
      }

      if ('event' in a) {
        return (0, _turnOrder406c.g)(a.event, a.args, playerID);
      }
    });
  }

  random(arg) {
    let number;

    if (this.seed !== undefined) {
      const seed = this.prngstate ? '' : this.seed;
      const rand = (0, _turnOrder406c.C)(seed, this.prngstate);
      number = rand();
      this.prngstate = rand.state();
    } else {
      number = Math.random();
    }

    if (arg) {
      if (Array.isArray(arg)) {
        const id = Math.floor(number * arg.length);
        return arg[id];
      } else {
        return Math.floor(number * arg);
      }
    }

    return number;
  }

}
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * The number of iterations to run before yielding to
 * the JS event loop (in async mode).
 */


exports.B = Bot;
const CHUNK_SIZE = 25;
/**
 * Bot that uses Monte-Carlo Tree Search to find promising moves.
 */

class MCTSBot extends Bot {
  constructor({
    enumerate,
    seed,
    objectives,
    game,
    iterations,
    playoutDepth,
    iterationCallback
  }) {
    super({
      enumerate,
      seed
    });

    if (objectives === undefined) {
      objectives = () => ({});
    }

    this.objectives = objectives;

    this.iterationCallback = iterationCallback || (() => {});

    this.reducer = (0, _reducerEfc3ec3e.C)({
      game
    });
    this.iterations = iterations;
    this.playoutDepth = playoutDepth;
    this.addOpt({
      key: 'async',
      initial: false
    });
    this.addOpt({
      key: 'iterations',
      initial: typeof iterations === 'number' ? iterations : 1000,
      range: {
        min: 1,
        max: 2000
      }
    });
    this.addOpt({
      key: 'playoutDepth',
      initial: typeof playoutDepth === 'number' ? playoutDepth : 50,
      range: {
        min: 1,
        max: 100
      }
    });
  }

  createNode({
    state,
    parentAction,
    parent,
    playerID
  }) {
    const {
      G,
      ctx
    } = state;
    let actions = [];
    let objectives = [];

    if (playerID !== undefined) {
      actions = this.enumerate(G, ctx, playerID);
      objectives = this.objectives(G, ctx, playerID);
    } else if (ctx.activePlayers) {
      for (const playerID in ctx.activePlayers) {
        actions.push(...this.enumerate(G, ctx, playerID));
        objectives.push(this.objectives(G, ctx, playerID));
      }
    } else {
      actions = this.enumerate(G, ctx, ctx.currentPlayer);
      objectives = this.objectives(G, ctx, ctx.currentPlayer);
    }

    return {
      state,
      parent,
      parentAction,
      actions,
      objectives,
      children: [],
      visits: 0,
      value: 0
    };
  }

  select(node) {
    // This node has unvisited children.
    if (node.actions.length > 0) {
      return node;
    } // This is a terminal node.


    if (node.children.length === 0) {
      return node;
    }

    let selectedChild = null;
    let best = 0;

    for (const child of node.children) {
      const childVisits = child.visits + Number.EPSILON;
      const uct = child.value / childVisits + Math.sqrt(2 * Math.log(node.visits) / childVisits);

      if (selectedChild == null || uct > best) {
        best = uct;
        selectedChild = child;
      }
    }

    return this.select(selectedChild);
  }

  expand(node) {
    const actions = node.actions;

    if (actions.length === 0 || node.state.ctx.gameover !== undefined) {
      return node;
    }

    const id = this.random(actions.length);
    const action = actions[id];
    node.actions.splice(id, 1);
    const childState = this.reducer(node.state, action);
    const childNode = this.createNode({
      state: childState,
      parentAction: action,
      parent: node
    });
    node.children.push(childNode);
    return childNode;
  }

  playout({
    state
  }) {
    let playoutDepth = this.getOpt('playoutDepth');

    if (typeof this.playoutDepth === 'function') {
      playoutDepth = this.playoutDepth(state.G, state.ctx);
    }

    for (let i = 0; i < playoutDepth && state.ctx.gameover === undefined; i++) {
      const {
        G,
        ctx
      } = state;
      let playerID = ctx.currentPlayer;

      if (ctx.activePlayers) {
        playerID = Object.keys(ctx.activePlayers)[0];
      }

      const moves = this.enumerate(G, ctx, playerID); // Check if any objectives are met.

      const objectives = this.objectives(G, ctx, playerID);
      const score = Object.keys(objectives).reduce((score, key) => {
        const objective = objectives[key];

        if (objective.checker(G, ctx)) {
          return score + objective.weight;
        }

        return score;
      }, 0); // If so, stop and return the score.

      if (score > 0) {
        return {
          score
        };
      }

      if (!moves || moves.length === 0) {
        return undefined;
      }

      const id = this.random(moves.length);
      const childState = this.reducer(state, moves[id]);
      state = childState;
    }

    return state.ctx.gameover;
  }

  backpropagate(node, result = {}) {
    node.visits++;

    if (result.score !== undefined) {
      node.value += result.score;
    }

    if (result.draw === true) {
      node.value += 0.5;
    }

    if (node.parentAction && result.winner === node.parentAction.payload.playerID) {
      node.value++;
    }

    if (node.parent) {
      this.backpropagate(node.parent, result);
    }
  }

  play(state, playerID) {
    const root = this.createNode({
      state,
      playerID
    });
    let numIterations = this.getOpt('iterations');

    if (typeof this.iterations === 'function') {
      numIterations = this.iterations(state.G, state.ctx);
    }

    const getResult = () => {
      let selectedChild = null;

      for (const child of root.children) {
        if (selectedChild == null || child.visits > selectedChild.visits) {
          selectedChild = child;
        }
      }

      const action = selectedChild && selectedChild.parentAction;
      const metadata = root;
      return {
        action,
        metadata
      };
    };

    return new Promise(resolve => {
      const iteration = () => {
        for (let i = 0; i < CHUNK_SIZE && this.iterationCounter < numIterations; i++) {
          const leaf = this.select(root);
          const child = this.expand(leaf);
          const result = this.playout(child);
          this.backpropagate(child, result);
          this.iterationCounter++;
        }

        this.iterationCallback({
          iterationCounter: this.iterationCounter,
          numIterations,
          metadata: root
        });
      };

      this.iterationCounter = 0;

      if (this.getOpt('async')) {
        const asyncIteration = () => {
          if (this.iterationCounter < numIterations) {
            iteration();
            setImmediate(asyncIteration);
          } else {
            resolve(getResult());
          }
        };

        asyncIteration();
      } else {
        while (this.iterationCounter < numIterations) {
          iteration();
        }

        resolve(getResult());
      }
    });
  }

}
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Bot that picks a move at random.
 */


exports.M = MCTSBot;

class RandomBot extends Bot {
  play({
    G,
    ctx
  }, playerID) {
    const moves = this.enumerate(G, ctx, playerID);
    return Promise.resolve({
      action: this.random(moves)
    });
  }

}
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Make a single move on the client with a bot.
 *
 * @param {...object} client - The game client.
 * @param {...object} bot - The bot.
 */


exports.R = RandomBot;

async function Step(client, bot) {
  const state = client.store.getState();
  let playerID = state.ctx.currentPlayer;

  if (state.ctx.activePlayers) {
    playerID = Object.keys(state.ctx.activePlayers)[0];
  }

  const {
    action,
    metadata
  } = await bot.play(state, playerID);

  if (action) {
    const a = { ...action,
      payload: { ...action.payload,
        metadata
      }
    };
    client.store.dispatch(a);
    return a;
  }
}
/**
 * Simulates the game till the end or a max depth.
 *
 * @param {...object} game - The game object.
 * @param {...object} bots - An array of bots.
 * @param {...object} state - The game state to start from.
 */


async function Simulate({
  game,
  bots,
  state,
  depth
}) {
  if (depth === undefined) depth = 10000;
  const reducer = (0, _reducerEfc3ec3e.C)({
    game
  });
  let metadata = null;
  let iter = 0;

  while (state.ctx.gameover === undefined && iter < depth) {
    let playerID = state.ctx.currentPlayer;

    if (state.ctx.activePlayers) {
      playerID = Object.keys(state.ctx.activePlayers)[0];
    }

    const bot = bots instanceof Bot ? bots : bots[playerID];
    const t = await bot.play(state, playerID);

    if (!t.action) {
      break;
    }

    metadata = t.metadata;
    state = reducer(state, t.action);
    iter++;
  }

  return {
    state,
    metadata
  };
}
},{"./turn-order-406c4349.js":"node_modules/boardgame.io/dist/esm/turn-order-406c4349.js","./reducer-efc3ec3e.js":"node_modules/boardgame.io/dist/esm/reducer-efc3ec3e.js","setimmediate":"node_modules/setimmediate/setImmediate.js"}],"node_modules/boardgame.io/dist/esm/Debug-f39f426b.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._ = _inherits;
exports.a = _createSuper;
exports.b = _createClass;
exports.c = _defineProperty;
exports.d = _classCallCheck;
exports.e = _objectWithoutProperties;
exports.f = _objectSpread2;
exports.D = void 0;

var _turnOrder406c = require("./turn-order-406c4349.js");

var _reducerEfc3ec3e = require("./reducer-efc3ec3e.js");

var _flatted = require("flatted");

var _ai7a5eea = require("./ai-7a5eea10.js");

function noop() {}

const identity = x => x;

function assign(tar, src) {
  // @ts-ignore
  for (const k in src) tar[k] = src[k];

  return tar;
}

function run(fn) {
  return fn();
}

function blank_object() {
  return Object.create(null);
}

function run_all(fns) {
  fns.forEach(run);
}

function is_function(thing) {
  return typeof thing === 'function';
}

function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === 'object' || typeof a === 'function';
}

function is_empty(obj) {
  return Object.keys(obj).length === 0;
}

function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }

  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}

function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}

function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}

function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}

function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));

    if ($$scope.dirty === undefined) {
      return lets;
    }

    if (typeof lets === 'object') {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);

      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }

      return merged;
    }

    return $$scope.dirty | lets;
  }

  return $$scope.dirty;
}

function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}

function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;

    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }

    return dirty;
  }

  return -1;
}

function exclude_internal_props(props) {
  const result = {};

  for (const k in props) if (k[0] !== '$') result[k] = props[k];

  return result;
}

function null_to_empty(value) {
  return value == null ? '' : value;
}

const is_client = typeof window !== 'undefined';
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;
const tasks = new Set();

function run_tasks(now) {
  tasks.forEach(task => {
    if (!task.c(now)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */


function loop(callback) {
  let task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise(fulfill => {
      tasks.add(task = {
        c: callback,
        f: fulfill
      });
    }),

    abort() {
      tasks.delete(task);
    }

  };
}

function append(target, node) {
  target.appendChild(node);
}

function append_styles(target, style_sheet_id, styles) {
  const append_styles_to = get_root_for_style(target);

  if (!append_styles_to.getElementById(style_sheet_id)) {
    const style = element('style');
    style.id = style_sheet_id;
    style.textContent = styles;
    append_stylesheet(append_styles_to, style);
  }
}

function get_root_for_style(node) {
  if (!node) return document;
  const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;

  if (root.host) {
    return root;
  }

  return document;
}

function append_empty_stylesheet(node) {
  const style_element = element('style');
  append_stylesheet(get_root_for_style(node), style_element);
  return style_element;
}

function append_stylesheet(node, style) {
  append(node.head || node, style);
}

function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}

function detach(node) {
  node.parentNode.removeChild(node);
}

function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}

function element(name) {
  return document.createElement(name);
}

function svg_element(name) {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function text(data) {
  return document.createTextNode(data);
}

function space() {
  return text(' ');
}

function empty() {
  return text('');
}

function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}

function stop_propagation(fn) {
  return function (event) {
    event.stopPropagation(); // @ts-ignore

    return fn.call(this, event);
  };
}

function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

function to_number(value) {
  return value === '' ? null : +value;
}

function children(element) {
  return Array.from(element.childNodes);
}

function set_data(text, data) {
  data = '' + data;
  if (text.wholeText !== data) text.data = data;
}

function set_input_value(input, value) {
  input.value = value == null ? '' : value;
}

function select_option(select, value) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];

    if (option.__value === value) {
      option.selected = true;
      return;
    }
  }
}

function select_value(select) {
  const selected_option = select.querySelector(':checked') || select.options[0];
  return selected_option && selected_option.__value;
}

function toggle_class(element, name, toggle) {
  element.classList[toggle ? 'add' : 'remove'](name);
}

function custom_event(type, detail, bubbles = false) {
  const e = document.createEvent('CustomEvent');
  e.initCustomEvent(type, bubbles, false, detail);
  return e;
}

const active_docs = new Set();
let active = 0; // https://github.com/darkskyapp/string-hash/blob/master/index.js

function hash(str) {
  let hash = 5381;
  let i = str.length;

  while (i--) hash = (hash << 5) - hash ^ str.charCodeAt(i);

  return hash >>> 0;
}

function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
  const step = 16.666 / duration;
  let keyframes = '{\n';

  for (let p = 0; p <= 1; p += step) {
    const t = a + (b - a) * ease(p);
    keyframes += p * 100 + "%{".concat(fn(t, 1 - t), "}\n");
  }

  const rule = keyframes + "100% {".concat(fn(b, 1 - b), "}\n}");
  const name = "__svelte_".concat(hash(rule), "_").concat(uid);
  const doc = get_root_for_style(node);
  active_docs.add(doc);
  const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = append_empty_stylesheet(node).sheet);
  const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});

  if (!current_rules[name]) {
    current_rules[name] = true;
    stylesheet.insertRule("@keyframes ".concat(name, " ").concat(rule), stylesheet.cssRules.length);
  }

  const animation = node.style.animation || '';
  node.style.animation = "".concat(animation ? "".concat(animation, ", ") : '').concat(name, " ").concat(duration, "ms linear ").concat(delay, "ms 1 both");
  active += 1;
  return name;
}

function delete_rule(node, name) {
  const previous = (node.style.animation || '').split(', ');
  const next = previous.filter(name ? anim => anim.indexOf(name) < 0 // remove specific animation
  : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
  );
  const deleted = previous.length - next.length;

  if (deleted) {
    node.style.animation = next.join(', ');
    active -= deleted;
    if (!active) clear_rules();
  }
}

function clear_rules() {
  raf(() => {
    if (active) return;
    active_docs.forEach(doc => {
      const stylesheet = doc.__svelte_stylesheet;
      let i = stylesheet.cssRules.length;

      while (i--) stylesheet.deleteRule(i);

      doc.__svelte_rules = {};
    });
    active_docs.clear();
  });
}

let current_component;

function set_current_component(component) {
  current_component = component;
}

function get_current_component() {
  if (!current_component) throw new Error('Function called outside component initialization');
  return current_component;
}

function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}

function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}

function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail) => {
    const callbacks = component.$$.callbacks[type];

    if (callbacks) {
      // TODO are there situations where events could be dispatched
      // in a server (non-DOM) environment?
      const event = custom_event(type, detail);
      callbacks.slice().forEach(fn => {
        fn.call(component, event);
      });
    }
  };
}

function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}

function getContext(key) {
  return get_current_component().$$.context.get(key);
} // TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism


function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];

  if (callbacks) {
    // @ts-ignore
    callbacks.slice().forEach(fn => fn.call(this, event));
  }
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;

function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}

function add_render_callback(fn) {
  render_callbacks.push(fn);
}

let flushing = false;
const seen_callbacks = new Set();

function flush() {
  if (flushing) return;
  flushing = true;

  do {
    // first, call beforeUpdate functions
    // and update components
    for (let i = 0; i < dirty_components.length; i += 1) {
      const component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }

    set_current_component(null);
    dirty_components.length = 0;

    while (binding_callbacks.length) binding_callbacks.pop()(); // then, once components are updated, call
    // afterUpdate functions. This may cause
    // subsequent updates...


    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];

      if (!seen_callbacks.has(callback)) {
        // ...so guard against infinite loops
        seen_callbacks.add(callback);
        callback();
      }
    }

    render_callbacks.length = 0;
  } while (dirty_components.length);

  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }

  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}

function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}

let promise;

function wait() {
  if (!promise) {
    promise = Promise.resolve();
    promise.then(() => {
      promise = null;
    });
  }

  return promise;
}

function dispatch(node, direction, kind) {
  node.dispatchEvent(custom_event("".concat(direction ? 'intro' : 'outro').concat(kind)));
}

const outroing = new Set();
let outros;

function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros // parent group

  };
}

function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }

  outros = outros.p;
}

function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}

function transition_out(block, local, detach, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);

      if (callback) {
        if (detach) block.d(1);
        callback();
      }
    });
    block.o(local);
  }
}

const null_transition = {
  duration: 0
};

function create_in_transition(node, fn, params) {
  let config = fn(node, params);
  let running = false;
  let animation_name;
  let task;
  let uid = 0;

  function cleanup() {
    if (animation_name) delete_rule(node, animation_name);
  }

  function go() {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick = noop,
      css
    } = config || null_transition;
    if (css) animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
    tick(0, 1);
    const start_time = now() + delay;
    const end_time = start_time + duration;
    if (task) task.abort();
    running = true;
    add_render_callback(() => dispatch(node, true, 'start'));
    task = loop(now => {
      if (running) {
        if (now >= end_time) {
          tick(1, 0);
          dispatch(node, true, 'end');
          cleanup();
          return running = false;
        }

        if (now >= start_time) {
          const t = easing((now - start_time) / duration);
          tick(t, 1 - t);
        }
      }

      return running;
    });
  }

  let started = false;
  return {
    start() {
      if (started) return;
      started = true;
      delete_rule(node);

      if (is_function(config)) {
        config = config();
        wait().then(go);
      } else {
        go();
      }
    },

    invalidate() {
      started = false;
    },

    end() {
      if (running) {
        cleanup();
        running = false;
      }
    }

  };
}

function create_out_transition(node, fn, params) {
  let config = fn(node, params);
  let running = true;
  let animation_name;
  const group = outros;
  group.r += 1;

  function go() {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick = noop,
      css
    } = config || null_transition;
    if (css) animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
    const start_time = now() + delay;
    const end_time = start_time + duration;
    add_render_callback(() => dispatch(node, false, 'start'));
    loop(now => {
      if (running) {
        if (now >= end_time) {
          tick(0, 1);
          dispatch(node, false, 'end');

          if (! --group.r) {
            // this will result in `end()` being called,
            // so we don't need to clean up here
            run_all(group.c);
          }

          return false;
        }

        if (now >= start_time) {
          const t = easing((now - start_time) / duration);
          tick(1 - t, t);
        }
      }

      return running;
    });
  }

  if (is_function(config)) {
    wait().then(() => {
      // @ts-ignore
      config = config();
      go();
    });
  } else {
    go();
  }

  return {
    end(reset) {
      if (reset && config.tick) {
        config.tick(1, 0);
      }

      if (running) {
        if (animation_name) delete_rule(node, animation_name);
        running = false;
      }
    }

  };
}

function create_bidirectional_transition(node, fn, params, intro) {
  let config = fn(node, params);
  let t = intro ? 0 : 1;
  let running_program = null;
  let pending_program = null;
  let animation_name = null;

  function clear_animation() {
    if (animation_name) delete_rule(node, animation_name);
  }

  function init(program, duration) {
    const d = program.b - t;
    duration *= Math.abs(d);
    return {
      a: t,
      b: program.b,
      d,
      duration,
      start: program.start,
      end: program.start + duration,
      group: program.group
    };
  }

  function go(b) {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick = noop,
      css
    } = config || null_transition;
    const program = {
      start: now() + delay,
      b
    };

    if (!b) {
      // @ts-ignore todo: improve typings
      program.group = outros;
      outros.r += 1;
    }

    if (running_program || pending_program) {
      pending_program = program;
    } else {
      // if this is an intro, and there's a delay, we need to do
      // an initial tick and/or apply CSS animation immediately
      if (css) {
        clear_animation();
        animation_name = create_rule(node, t, b, duration, delay, easing, css);
      }

      if (b) tick(0, 1);
      running_program = init(program, duration);
      add_render_callback(() => dispatch(node, b, 'start'));
      loop(now => {
        if (pending_program && now > pending_program.start) {
          running_program = init(pending_program, duration);
          pending_program = null;
          dispatch(node, running_program.b, 'start');

          if (css) {
            clear_animation();
            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
          }
        }

        if (running_program) {
          if (now >= running_program.end) {
            tick(t = running_program.b, 1 - t);
            dispatch(node, running_program.b, 'end');

            if (!pending_program) {
              // we're done
              if (running_program.b) {
                // intro ??? we can tidy up immediately
                clear_animation();
              } else {
                // outro ??? needs to be coordinated
                if (! --running_program.group.r) run_all(running_program.group.c);
              }
            }

            running_program = null;
          } else if (now >= running_program.start) {
            const p = now - running_program.start;
            t = running_program.a + running_program.d * easing(p / running_program.duration);
            tick(t, 1 - t);
          }
        }

        return !!(running_program || pending_program);
      });
    }
  }

  return {
    run(b) {
      if (is_function(config)) {
        wait().then(() => {
          // @ts-ignore
          config = config();
          go(b);
        });
      } else {
        go(b);
      }
    },

    end() {
      clear_animation();
      running_program = pending_program = null;
    }

  };
}

function get_spread_update(levels, updates) {
  const update = {};
  const to_null_out = {};
  const accounted_for = {
    $$scope: 1
  };
  let i = levels.length;

  while (i--) {
    const o = levels[i];
    const n = updates[i];

    if (n) {
      for (const key in o) {
        if (!(key in n)) to_null_out[key] = 1;
      }

      for (const key in n) {
        if (!accounted_for[key]) {
          update[key] = n[key];
          accounted_for[key] = 1;
        }
      }

      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }

  for (const key in to_null_out) {
    if (!(key in update)) update[key] = undefined;
  }

  return update;
}

function get_spread_object(spread_props) {
  return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

function create_component(block) {
  block && block.c();
}

function mount_component(component, target, anchor, customElement) {
  const {
    fragment,
    on_mount,
    on_destroy,
    after_update
  } = component.$$;
  fragment && fragment.m(target, anchor);

  if (!customElement) {
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
      const new_on_destroy = on_mount.map(run).filter(is_function);

      if (on_destroy) {
        on_destroy.push(...new_on_destroy);
      } else {
        // Edge case - component was destroyed immediately,
        // most likely as a result of a binding initialising
        run_all(new_on_destroy);
      }

      component.$$.on_mount = [];
    });
  }

  after_update.forEach(add_render_callback);
}

function destroy_component(component, detaching) {
  const $$ = component.$$;

  if ($$.fragment !== null) {
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
    // preserve final state?)

    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}

function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }

  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}

function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: null,
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(parent_component ? parent_component.$$.context : options.context || []),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance ? instance(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;

    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }

    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update); // `false` as a special case of no DOM component

  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      $$.fragment && $$.fragment.c();
    }

    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor, options.customElement);
    flush();
  }

  set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */


class SvelteComponent {
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }

  $on(type, callback) {
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1) callbacks.splice(index, 1);
    };
  }

  $set($$props) {
    if (this.$$set && !is_empty($$props)) {
      this.$$.skip_bound = true;
      this.$$set($$props);
      this.$$.skip_bound = false;
    }
  }

}

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */

function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();

  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;

      if (stop) {
        // store is ready
        const run_queue = !subscriber_queue.length;

        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }

        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }

          subscriber_queue.length = 0;
        }
      }
    }
  }

  function update(fn) {
    set(fn(value));
  }

  function subscribe(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);

    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }

    run(value);
    return () => {
      subscribers.delete(subscriber);

      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }

  return {
    set,
    update,
    subscribe
  };
}

function cubicOut(t) {
  const f = t - 1.0;
  return f * f * f + 1.0;
}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */


function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function fly(node, {
  delay = 0,
  duration = 400,
  easing = cubicOut,
  x = 0,
  y = 0,
  opacity = 0
} = {}) {
  const style = getComputedStyle(node);
  const target_opacity = +style.opacity;
  const transform = style.transform === 'none' ? '' : style.transform;
  const od = target_opacity * (1 - opacity);
  return {
    delay,
    duration,
    easing,
    css: (t, u) => "\n\t\t\ttransform: ".concat(transform, " translate(").concat((1 - t) * x, "px, ").concat((1 - t) * y, "px);\n\t\t\topacity: ").concat(target_opacity - od * u)
  };
}

function crossfade(_a) {
  var {
    fallback
  } = _a,
      defaults = __rest(_a, ["fallback"]);

  const to_receive = new Map();
  const to_send = new Map();

  function crossfade(from, node, params) {
    const {
      delay = 0,
      duration = d => Math.sqrt(d) * 30,
      easing = cubicOut
    } = assign(assign({}, defaults), params);
    const to = node.getBoundingClientRect();
    const dx = from.left - to.left;
    const dy = from.top - to.top;
    const dw = from.width / to.width;
    const dh = from.height / to.height;
    const d = Math.sqrt(dx * dx + dy * dy);
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;
    const opacity = +style.opacity;
    return {
      delay,
      duration: is_function(duration) ? duration(d) : duration,
      easing,
      css: (t, u) => "\n\t\t\t\topacity: ".concat(t * opacity, ";\n\t\t\t\ttransform-origin: top left;\n\t\t\t\ttransform: ").concat(transform, " translate(").concat(u * dx, "px,").concat(u * dy, "px) scale(").concat(t + (1 - t) * dw, ", ").concat(t + (1 - t) * dh, ");\n\t\t\t")
    };
  }

  function transition(items, counterparts, intro) {
    return (node, params) => {
      items.set(params.key, {
        rect: node.getBoundingClientRect()
      });
      return () => {
        if (counterparts.has(params.key)) {
          const {
            rect
          } = counterparts.get(params.key);
          counterparts.delete(params.key);
          return crossfade(rect, node, params);
        } // if the node is disappearing altogether
        // (i.e. wasn't claimed by the other list)
        // then we need to supply an outro


        items.delete(params.key);
        return fallback && fallback(node, params, intro);
      };
    };
  }

  return [transition(to_send, to_receive, false), transition(to_receive, to_send, true)];
}
/* node_modules/svelte-icons/components/IconBase.svelte generated by Svelte v3.41.0 */


function add_css(target) {
  append_styles(target, "svelte-c8tyih", "svg.svelte-c8tyih{stroke:currentColor;fill:currentColor;stroke-width:0;width:100%;height:auto;max-height:100%}");
} // (18:2) {#if title}


function create_if_block(ctx) {
  let title_1;
  let t;
  return {
    c() {
      title_1 = svg_element("title");
      t = text(
      /*title*/
      ctx[0]);
    },

    m(target, anchor) {
      insert(target, title_1, anchor);
      append(title_1, t);
    },

    p(ctx, dirty) {
      if (dirty &
      /*title*/
      1) set_data(t,
      /*title*/
      ctx[0]);
    },

    d(detaching) {
      if (detaching) detach(title_1);
    }

  };
}

function create_fragment(ctx) {
  let svg;
  let if_block_anchor;
  let current;
  let if_block =
  /*title*/
  ctx[0] && create_if_block(ctx);
  const default_slot_template =
  /*#slots*/
  ctx[3].default;
  const default_slot = create_slot(default_slot_template, ctx,
  /*$$scope*/
  ctx[2], null);
  return {
    c() {
      svg = svg_element("svg");
      if (if_block) if_block.c();
      if_block_anchor = empty();
      if (default_slot) default_slot.c();
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "viewBox",
      /*viewBox*/
      ctx[1]);
      attr(svg, "class", "svelte-c8tyih");
    },

    m(target, anchor) {
      insert(target, svg, anchor);
      if (if_block) if_block.m(svg, null);
      append(svg, if_block_anchor);

      if (default_slot) {
        default_slot.m(svg, null);
      }

      current = true;
    },

    p(ctx, [dirty]) {
      if (
      /*title*/
      ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block(ctx);
          if_block.c();
          if_block.m(svg, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (default_slot) {
        if (default_slot.p && (!current || dirty &
        /*$$scope*/
        4)) {
          update_slot_base(default_slot, default_slot_template, ctx,
          /*$$scope*/
          ctx[2], !current ? get_all_dirty_from_scope(
          /*$$scope*/
          ctx[2]) : get_slot_changes(default_slot_template,
          /*$$scope*/
          ctx[2], dirty, null), null);
        }
      }

      if (!current || dirty &
      /*viewBox*/
      2) {
        attr(svg, "viewBox",
        /*viewBox*/
        ctx[1]);
      }
    },

    i(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },

    o(local) {
      transition_out(default_slot, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(svg);
      if (if_block) if_block.d();
      if (default_slot) default_slot.d(detaching);
    }

  };
}

function instance($$self, $$props, $$invalidate) {
  let {
    $$slots: slots = {},
    $$scope
  } = $$props;
  let {
    title = null
  } = $$props;
  let {
    viewBox
  } = $$props;

  $$self.$$set = $$props => {
    if ('title' in $$props) $$invalidate(0, title = $$props.title);
    if ('viewBox' in $$props) $$invalidate(1, viewBox = $$props.viewBox);
    if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
  };

  return [title, viewBox, $$scope, slots];
}

class IconBase extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      title: 0,
      viewBox: 1
    }, add_css);
  }

}
/* node_modules/svelte-icons/fa/FaChevronRight.svelte generated by Svelte v3.41.0 */


function create_default_slot(ctx) {
  let path;
  return {
    c() {
      path = svg_element("path");
      attr(path, "d", "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z");
    },

    m(target, anchor) {
      insert(target, path, anchor);
    },

    d(detaching) {
      if (detaching) detach(path);
    }

  };
}

function create_fragment$1(ctx) {
  let iconbase;
  let current;
  const iconbase_spread_levels = [{
    viewBox: "0 0 320 512"
  },
  /*$$props*/
  ctx[0]];
  let iconbase_props = {
    $$slots: {
      default: [create_default_slot]
    },
    $$scope: {
      ctx
    }
  };

  for (let i = 0; i < iconbase_spread_levels.length; i += 1) {
    iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
  }

  iconbase = new IconBase({
    props: iconbase_props
  });
  return {
    c() {
      create_component(iconbase.$$.fragment);
    },

    m(target, anchor) {
      mount_component(iconbase, target, anchor);
      current = true;
    },

    p(ctx, [dirty]) {
      const iconbase_changes = dirty &
      /*$$props*/
      1 ? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(
      /*$$props*/
      ctx[0])]) : {};

      if (dirty &
      /*$$scope*/
      2) {
        iconbase_changes.$$scope = {
          dirty,
          ctx
        };
      }

      iconbase.$set(iconbase_changes);
    },

    i(local) {
      if (current) return;
      transition_in(iconbase.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(iconbase.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(iconbase, detaching);
    }

  };
}

function instance$1($$self, $$props, $$invalidate) {
  $$self.$$set = $$new_props => {
    $$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  };

  $$props = exclude_internal_props($$props);
  return [$$props];
}

class FaChevronRight extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
  }

}
/* src/client/debug/Menu.svelte generated by Svelte v3.41.0 */


function add_css$1(target) {
  append_styles(target, "svelte-1xg9v5h", ".menu.svelte-1xg9v5h{display:flex;margin-top:43px;flex-direction:row-reverse;border:1px solid #ccc;border-radius:5px 5px 0 0;height:25px;line-height:25px;margin-right:-500px;transform-origin:bottom right;transform:rotate(-90deg) translate(0, -500px)}.menu-item.svelte-1xg9v5h{line-height:25px;cursor:pointer;border:0;background:#fefefe;color:#555;padding-left:15px;padding-right:15px;text-align:center}.menu-item.svelte-1xg9v5h:first-child{border-radius:0 5px 0 0}.menu-item.svelte-1xg9v5h:last-child{border-radius:5px 0 0 0}.menu-item.active.svelte-1xg9v5h{cursor:default;font-weight:bold;background:#ddd;color:#555}.menu-item.svelte-1xg9v5h:hover,.menu-item.svelte-1xg9v5h:focus{background:#eee;color:#555}");
}

function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[4] = list[i][0];
  child_ctx[5] = list[i][1].label;
  return child_ctx;
} // (57:2) {#each Object.entries(panes) as [key, {label}


function create_each_block(ctx) {
  let button;
  let t0_value =
  /*label*/
  ctx[5] + "";
  let t0;
  let t1;
  let mounted;
  let dispose;

  function click_handler() {
    return (
      /*click_handler*/
      ctx[3](
      /*key*/
      ctx[4])
    );
  }

  return {
    c() {
      button = element("button");
      t0 = text(t0_value);
      t1 = space();
      attr(button, "class", "menu-item svelte-1xg9v5h");
      toggle_class(button, "active",
      /*pane*/
      ctx[0] ==
      /*key*/
      ctx[4]);
    },

    m(target, anchor) {
      insert(target, button, anchor);
      append(button, t0);
      append(button, t1);

      if (!mounted) {
        dispose = listen(button, "click", click_handler);
        mounted = true;
      }
    },

    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty &
      /*panes*/
      2 && t0_value !== (t0_value =
      /*label*/
      ctx[5] + "")) set_data(t0, t0_value);

      if (dirty &
      /*pane, Object, panes*/
      3) {
        toggle_class(button, "active",
        /*pane*/
        ctx[0] ==
        /*key*/
        ctx[4]);
      }
    },

    d(detaching) {
      if (detaching) detach(button);
      mounted = false;
      dispose();
    }

  };
}

function create_fragment$2(ctx) {
  let nav;
  let each_value = Object.entries(
  /*panes*/
  ctx[1]);
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }

  return {
    c() {
      nav = element("nav");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      attr(nav, "class", "menu svelte-1xg9v5h");
    },

    m(target, anchor) {
      insert(target, nav, anchor);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(nav, null);
      }
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*pane, Object, panes, dispatch*/
      7) {
        each_value = Object.entries(
        /*panes*/
        ctx[1]);
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(nav, null);
          }
        }

        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(nav);
      destroy_each(each_blocks, detaching);
    }

  };
}

function instance$2($$self, $$props, $$invalidate) {
  let {
    pane
  } = $$props;
  let {
    panes
  } = $$props;
  const dispatch = createEventDispatcher();

  const click_handler = key => dispatch('change', key);

  $$self.$$set = $$props => {
    if ('pane' in $$props) $$invalidate(0, pane = $$props.pane);
    if ('panes' in $$props) $$invalidate(1, panes = $$props.panes);
  };

  return [pane, panes, dispatch, click_handler];
}

class Menu extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, {
      pane: 0,
      panes: 1
    }, add_css$1);
  }

}

var contextKey = {};
/* node_modules/svelte-json-tree-auto/src/JSONArrow.svelte generated by Svelte v3.41.0 */

function add_css$2(target) {
  append_styles(target, "svelte-1vyml86", ".container.svelte-1vyml86{display:inline-block;cursor:pointer;transform:translate(calc(0px - var(--li-identation)), -50%);position:absolute;top:50%;padding-right:100%}.arrow.svelte-1vyml86{transform-origin:25% 50%;position:relative;line-height:1.1em;font-size:0.75em;margin-left:0;transition:150ms;color:var(--arrow-sign);user-select:none;font-family:'Courier New', Courier, monospace}.expanded.svelte-1vyml86{transform:rotateZ(90deg) translateX(-3px)}");
}

function create_fragment$3(ctx) {
  let div1;
  let div0;
  let mounted;
  let dispose;
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      div0.textContent = '\u25B6';
      attr(div0, "class", "arrow svelte-1vyml86");
      toggle_class(div0, "expanded",
      /*expanded*/
      ctx[0]);
      attr(div1, "class", "container svelte-1vyml86");
    },

    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);

      if (!mounted) {
        dispose = listen(div1, "click",
        /*click_handler*/
        ctx[1]);
        mounted = true;
      }
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*expanded*/
      1) {
        toggle_class(div0, "expanded",
        /*expanded*/
        ctx[0]);
      }
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(div1);
      mounted = false;
      dispose();
    }

  };
}

function instance$3($$self, $$props, $$invalidate) {
  let {
    expanded
  } = $$props;

  function click_handler(event) {
    bubble.call(this, $$self, event);
  }

  $$self.$$set = $$props => {
    if ('expanded' in $$props) $$invalidate(0, expanded = $$props.expanded);
  };

  return [expanded, click_handler];
}

class JSONArrow extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
      expanded: 0
    }, add_css$2);
  }

}
/* node_modules/svelte-json-tree-auto/src/JSONKey.svelte generated by Svelte v3.41.0 */


function add_css$3(target) {
  append_styles(target, "svelte-1vlbacg", "label.svelte-1vlbacg{display:inline-block;color:var(--label-color);padding:0}.spaced.svelte-1vlbacg{padding-right:var(--li-colon-space)}");
} // (16:0) {#if showKey && key}


function create_if_block$1(ctx) {
  let label;
  let span;
  let t0;
  let t1;
  let mounted;
  let dispose;
  return {
    c() {
      label = element("label");
      span = element("span");
      t0 = text(
      /*key*/
      ctx[0]);
      t1 = text(
      /*colon*/
      ctx[2]);
      attr(label, "class", "svelte-1vlbacg");
      toggle_class(label, "spaced",
      /*isParentExpanded*/
      ctx[1]);
    },

    m(target, anchor) {
      insert(target, label, anchor);
      append(label, span);
      append(span, t0);
      append(span, t1);

      if (!mounted) {
        dispose = listen(label, "click",
        /*click_handler*/
        ctx[5]);
        mounted = true;
      }
    },

    p(ctx, dirty) {
      if (dirty &
      /*key*/
      1) set_data(t0,
      /*key*/
      ctx[0]);
      if (dirty &
      /*colon*/
      4) set_data(t1,
      /*colon*/
      ctx[2]);

      if (dirty &
      /*isParentExpanded*/
      2) {
        toggle_class(label, "spaced",
        /*isParentExpanded*/
        ctx[1]);
      }
    },

    d(detaching) {
      if (detaching) detach(label);
      mounted = false;
      dispose();
    }

  };
}

function create_fragment$4(ctx) {
  let if_block_anchor;
  let if_block =
  /*showKey*/
  ctx[3] &&
  /*key*/
  ctx[0] && create_if_block$1(ctx);
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },

    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },

    p(ctx, [dirty]) {
      if (
      /*showKey*/
      ctx[3] &&
      /*key*/
      ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$1(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach(if_block_anchor);
    }

  };
}

function instance$4($$self, $$props, $$invalidate) {
  let showKey;
  let {
    key,
    isParentExpanded,
    isParentArray = false,
    colon = ':'
  } = $$props;

  function click_handler(event) {
    bubble.call(this, $$self, event);
  }

  $$self.$$set = $$props => {
    if ('key' in $$props) $$invalidate(0, key = $$props.key);
    if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ('colon' in $$props) $$invalidate(2, colon = $$props.colon);
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*isParentExpanded, isParentArray, key*/
    19) {
      $$invalidate(3, showKey = isParentExpanded || !isParentArray || key != +key);
    }
  };

  return [key, isParentExpanded, colon, showKey, isParentArray, click_handler];
}

class JSONKey extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, {
      key: 0,
      isParentExpanded: 1,
      isParentArray: 4,
      colon: 2
    }, add_css$3);
  }

}
/* node_modules/svelte-json-tree-auto/src/JSONNested.svelte generated by Svelte v3.41.0 */


function add_css$4(target) {
  append_styles(target, "svelte-rwxv37", "label.svelte-rwxv37{display:inline-block}.indent.svelte-rwxv37{padding-left:var(--li-identation)}.collapse.svelte-rwxv37{--li-display:inline;display:inline;font-style:italic}.comma.svelte-rwxv37{margin-left:-0.5em;margin-right:0.5em}label.svelte-rwxv37{position:relative}");
}

function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[12] = list[i];
  child_ctx[20] = i;
  return child_ctx;
} // (57:4) {#if expandable && isParentExpanded}


function create_if_block_3(ctx) {
  let jsonarrow;
  let current;
  jsonarrow = new JSONArrow({
    props: {
      expanded:
      /*expanded*/
      ctx[0]
    }
  });
  jsonarrow.$on("click",
  /*toggleExpand*/
  ctx[15]);
  return {
    c() {
      create_component(jsonarrow.$$.fragment);
    },

    m(target, anchor) {
      mount_component(jsonarrow, target, anchor);
      current = true;
    },

    p(ctx, dirty) {
      const jsonarrow_changes = {};
      if (dirty &
      /*expanded*/
      1) jsonarrow_changes.expanded =
      /*expanded*/
      ctx[0];
      jsonarrow.$set(jsonarrow_changes);
    },

    i(local) {
      if (current) return;
      transition_in(jsonarrow.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonarrow.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(jsonarrow, detaching);
    }

  };
} // (75:4) {:else}


function create_else_block(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "???";
    },

    m(target, anchor) {
      insert(target, span, anchor);
    },

    p: noop,
    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(span);
    }

  };
} // (63:4) {#if isParentExpanded}


function create_if_block$2(ctx) {
  let ul;
  let t;
  let current;
  let mounted;
  let dispose;
  let each_value =
  /*slicedKeys*/
  ctx[13];
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }

  const out = i => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });

  let if_block =
  /*slicedKeys*/
  ctx[13].length <
  /*previewKeys*/
  ctx[7].length && create_if_block_1();
  return {
    c() {
      ul = element("ul");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      t = space();
      if (if_block) if_block.c();
      attr(ul, "class", "svelte-rwxv37");
      toggle_class(ul, "collapse", !
      /*expanded*/
      ctx[0]);
    },

    m(target, anchor) {
      insert(target, ul, anchor);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(ul, null);
      }

      append(ul, t);
      if (if_block) if_block.m(ul, null);
      current = true;

      if (!mounted) {
        dispose = listen(ul, "click",
        /*expand*/
        ctx[16]);
        mounted = true;
      }
    },

    p(ctx, dirty) {
      if (dirty &
      /*expanded, previewKeys, getKey, slicedKeys, isArray, getValue, getPreviewValue*/
      10129) {
        each_value =
        /*slicedKeys*/
        ctx[13];
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(ul, t);
          }
        }

        group_outros();

        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }

        check_outros();
      }

      if (
      /*slicedKeys*/
      ctx[13].length <
      /*previewKeys*/
      ctx[7].length) {
        if (if_block) ;else {
          if_block = create_if_block_1();
          if_block.c();
          if_block.m(ul, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (dirty &
      /*expanded*/
      1) {
        toggle_class(ul, "collapse", !
        /*expanded*/
        ctx[0]);
      }
    },

    i(local) {
      if (current) return;

      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }

      current = true;
    },

    o(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }

      current = false;
    },

    d(detaching) {
      if (detaching) detach(ul);
      destroy_each(each_blocks, detaching);
      if (if_block) if_block.d();
      mounted = false;
      dispose();
    }

  };
} // (67:10) {#if !expanded && index < previewKeys.length - 1}


function create_if_block_2(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = ",";
      attr(span, "class", "comma svelte-rwxv37");
    },

    m(target, anchor) {
      insert(target, span, anchor);
    },

    d(detaching) {
      if (detaching) detach(span);
    }

  };
} // (65:8) {#each slicedKeys as key, index}


function create_each_block$1(ctx) {
  let jsonnode;
  let t;
  let if_block_anchor;
  let current;
  jsonnode = new JSONNode({
    props: {
      key:
      /*getKey*/
      ctx[8](
      /*key*/
      ctx[12]),
      isParentExpanded:
      /*expanded*/
      ctx[0],
      isParentArray:
      /*isArray*/
      ctx[4],
      value:
      /*expanded*/
      ctx[0] ?
      /*getValue*/
      ctx[9](
      /*key*/
      ctx[12]) :
      /*getPreviewValue*/
      ctx[10](
      /*key*/
      ctx[12])
    }
  });
  let if_block = !
  /*expanded*/
  ctx[0] &&
  /*index*/
  ctx[20] <
  /*previewKeys*/
  ctx[7].length - 1 && create_if_block_2();
  return {
    c() {
      create_component(jsonnode.$$.fragment);
      t = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },

    m(target, anchor) {
      mount_component(jsonnode, target, anchor);
      insert(target, t, anchor);
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },

    p(ctx, dirty) {
      const jsonnode_changes = {};
      if (dirty &
      /*getKey, slicedKeys*/
      8448) jsonnode_changes.key =
      /*getKey*/
      ctx[8](
      /*key*/
      ctx[12]);
      if (dirty &
      /*expanded*/
      1) jsonnode_changes.isParentExpanded =
      /*expanded*/
      ctx[0];
      if (dirty &
      /*isArray*/
      16) jsonnode_changes.isParentArray =
      /*isArray*/
      ctx[4];
      if (dirty &
      /*expanded, getValue, slicedKeys, getPreviewValue*/
      9729) jsonnode_changes.value =
      /*expanded*/
      ctx[0] ?
      /*getValue*/
      ctx[9](
      /*key*/
      ctx[12]) :
      /*getPreviewValue*/
      ctx[10](
      /*key*/
      ctx[12]);
      jsonnode.$set(jsonnode_changes);

      if (!
      /*expanded*/
      ctx[0] &&
      /*index*/
      ctx[20] <
      /*previewKeys*/
      ctx[7].length - 1) {
        if (if_block) ;else {
          if_block = create_if_block_2();
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },

    i(local) {
      if (current) return;
      transition_in(jsonnode.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonnode.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(jsonnode, detaching);
      if (detaching) detach(t);
      if (if_block) if_block.d(detaching);
      if (detaching) detach(if_block_anchor);
    }

  };
} // (71:8) {#if slicedKeys.length < previewKeys.length }


function create_if_block_1(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = "???";
    },

    m(target, anchor) {
      insert(target, span, anchor);
    },

    d(detaching) {
      if (detaching) detach(span);
    }

  };
}

function create_fragment$5(ctx) {
  let li;
  let label_1;
  let t0;
  let jsonkey;
  let t1;
  let span1;
  let span0;
  let t2;
  let t3;
  let t4;
  let current_block_type_index;
  let if_block1;
  let t5;
  let span2;
  let t6;
  let current;
  let mounted;
  let dispose;
  let if_block0 =
  /*expandable*/
  ctx[11] &&
  /*isParentExpanded*/
  ctx[2] && create_if_block_3(ctx);
  jsonkey = new JSONKey({
    props: {
      key:
      /*key*/
      ctx[12],
      colon:
      /*context*/
      ctx[14].colon,
      isParentExpanded:
      /*isParentExpanded*/
      ctx[2],
      isParentArray:
      /*isParentArray*/
      ctx[3]
    }
  });
  jsonkey.$on("click",
  /*toggleExpand*/
  ctx[15]);
  const if_block_creators = [create_if_block$2, create_else_block];
  const if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*isParentExpanded*/
    ctx[2]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      li = element("li");
      label_1 = element("label");
      if (if_block0) if_block0.c();
      t0 = space();
      create_component(jsonkey.$$.fragment);
      t1 = space();
      span1 = element("span");
      span0 = element("span");
      t2 = text(
      /*label*/
      ctx[1]);
      t3 = text(
      /*bracketOpen*/
      ctx[5]);
      t4 = space();
      if_block1.c();
      t5 = space();
      span2 = element("span");
      t6 = text(
      /*bracketClose*/
      ctx[6]);
      attr(label_1, "class", "svelte-rwxv37");
      attr(li, "class", "svelte-rwxv37");
      toggle_class(li, "indent",
      /*isParentExpanded*/
      ctx[2]);
    },

    m(target, anchor) {
      insert(target, li, anchor);
      append(li, label_1);
      if (if_block0) if_block0.m(label_1, null);
      append(label_1, t0);
      mount_component(jsonkey, label_1, null);
      append(label_1, t1);
      append(label_1, span1);
      append(span1, span0);
      append(span0, t2);
      append(span1, t3);
      append(li, t4);
      if_blocks[current_block_type_index].m(li, null);
      append(li, t5);
      append(li, span2);
      append(span2, t6);
      current = true;

      if (!mounted) {
        dispose = listen(span1, "click",
        /*toggleExpand*/
        ctx[15]);
        mounted = true;
      }
    },

    p(ctx, [dirty]) {
      if (
      /*expandable*/
      ctx[11] &&
      /*isParentExpanded*/
      ctx[2]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*expandable, isParentExpanded*/
          2052) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_3(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(label_1, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }

      const jsonkey_changes = {};
      if (dirty &
      /*key*/
      4096) jsonkey_changes.key =
      /*key*/
      ctx[12];
      if (dirty &
      /*isParentExpanded*/
      4) jsonkey_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[2];
      if (dirty &
      /*isParentArray*/
      8) jsonkey_changes.isParentArray =
      /*isParentArray*/
      ctx[3];
      jsonkey.$set(jsonkey_changes);
      if (!current || dirty &
      /*label*/
      2) set_data(t2,
      /*label*/
      ctx[1]);
      if (!current || dirty &
      /*bracketOpen*/
      32) set_data(t3,
      /*bracketOpen*/
      ctx[5]);
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block1 = if_blocks[current_block_type_index];

        if (!if_block1) {
          if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block1.c();
        } else {
          if_block1.p(ctx, dirty);
        }

        transition_in(if_block1, 1);
        if_block1.m(li, t5);
      }

      if (!current || dirty &
      /*bracketClose*/
      64) set_data(t6,
      /*bracketClose*/
      ctx[6]);

      if (dirty &
      /*isParentExpanded*/
      4) {
        toggle_class(li, "indent",
        /*isParentExpanded*/
        ctx[2]);
      }
    },

    i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(jsonkey.$$.fragment, local);
      transition_in(if_block1);
      current = true;
    },

    o(local) {
      transition_out(if_block0);
      transition_out(jsonkey.$$.fragment, local);
      transition_out(if_block1);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(li);
      if (if_block0) if_block0.d();
      destroy_component(jsonkey);
      if_blocks[current_block_type_index].d();
      mounted = false;
      dispose();
    }

  };
}

function instance$5($$self, $$props, $$invalidate) {
  let slicedKeys;
  let {
    key,
    keys,
    colon = ':',
    label = '',
    isParentExpanded,
    isParentArray,
    isArray = false,
    bracketOpen,
    bracketClose
  } = $$props;
  let {
    previewKeys = keys
  } = $$props;
  let {
    getKey = key => key
  } = $$props;
  let {
    getValue = key => key
  } = $$props;
  let {
    getPreviewValue = getValue
  } = $$props;
  let {
    expanded = false,
    expandable = true
  } = $$props;
  const context = getContext(contextKey);
  setContext(contextKey, { ...context,
    colon
  });

  function toggleExpand() {
    $$invalidate(0, expanded = !expanded);
  }

  function expand() {
    $$invalidate(0, expanded = true);
  }

  $$self.$$set = $$props => {
    if ('key' in $$props) $$invalidate(12, key = $$props.key);
    if ('keys' in $$props) $$invalidate(17, keys = $$props.keys);
    if ('colon' in $$props) $$invalidate(18, colon = $$props.colon);
    if ('label' in $$props) $$invalidate(1, label = $$props.label);
    if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ('isArray' in $$props) $$invalidate(4, isArray = $$props.isArray);
    if ('bracketOpen' in $$props) $$invalidate(5, bracketOpen = $$props.bracketOpen);
    if ('bracketClose' in $$props) $$invalidate(6, bracketClose = $$props.bracketClose);
    if ('previewKeys' in $$props) $$invalidate(7, previewKeys = $$props.previewKeys);
    if ('getKey' in $$props) $$invalidate(8, getKey = $$props.getKey);
    if ('getValue' in $$props) $$invalidate(9, getValue = $$props.getValue);
    if ('getPreviewValue' in $$props) $$invalidate(10, getPreviewValue = $$props.getPreviewValue);
    if ('expanded' in $$props) $$invalidate(0, expanded = $$props.expanded);
    if ('expandable' in $$props) $$invalidate(11, expandable = $$props.expandable);
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*isParentExpanded*/
    4) {
      if (!isParentExpanded) {
        $$invalidate(0, expanded = false);
      }
    }

    if ($$self.$$.dirty &
    /*expanded, keys, previewKeys*/
    131201) {
      $$invalidate(13, slicedKeys = expanded ? keys : previewKeys.slice(0, 5));
    }
  };

  return [expanded, label, isParentExpanded, isParentArray, isArray, bracketOpen, bracketClose, previewKeys, getKey, getValue, getPreviewValue, expandable, key, slicedKeys, context, toggleExpand, expand, keys, colon];
}

class JSONNested extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, {
      key: 12,
      keys: 17,
      colon: 18,
      label: 1,
      isParentExpanded: 2,
      isParentArray: 3,
      isArray: 4,
      bracketOpen: 5,
      bracketClose: 6,
      previewKeys: 7,
      getKey: 8,
      getValue: 9,
      getPreviewValue: 10,
      expanded: 0,
      expandable: 11
    }, add_css$4);
  }

}
/* node_modules/svelte-json-tree-auto/src/JSONObjectNode.svelte generated by Svelte v3.41.0 */


function create_fragment$6(ctx) {
  let jsonnested;
  let current;
  jsonnested = new JSONNested({
    props: {
      key:
      /*key*/
      ctx[0],
      expanded:
      /*expanded*/
      ctx[4],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[1],
      isParentArray:
      /*isParentArray*/
      ctx[2],
      keys:
      /*keys*/
      ctx[5],
      previewKeys:
      /*keys*/
      ctx[5],
      getValue:
      /*getValue*/
      ctx[6],
      label: "" + (
      /*nodeType*/
      ctx[3] + " "),
      bracketOpen: '{',
      bracketClose: '}'
    }
  });
  return {
    c() {
      create_component(jsonnested.$$.fragment);
    },

    m(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },

    p(ctx, [dirty]) {
      const jsonnested_changes = {};
      if (dirty &
      /*key*/
      1) jsonnested_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*expanded*/
      16) jsonnested_changes.expanded =
      /*expanded*/
      ctx[4];
      if (dirty &
      /*isParentExpanded*/
      2) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[1];
      if (dirty &
      /*isParentArray*/
      4) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[2];
      if (dirty &
      /*keys*/
      32) jsonnested_changes.keys =
      /*keys*/
      ctx[5];
      if (dirty &
      /*keys*/
      32) jsonnested_changes.previewKeys =
      /*keys*/
      ctx[5];
      if (dirty &
      /*nodeType*/
      8) jsonnested_changes.label = "" + (
      /*nodeType*/
      ctx[3] + " ");
      jsonnested.$set(jsonnested_changes);
    },

    i(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(jsonnested, detaching);
    }

  };
}

function instance$6($$self, $$props, $$invalidate) {
  let keys;
  let {
    key,
    value,
    isParentExpanded,
    isParentArray,
    nodeType
  } = $$props;
  let {
    expanded = true
  } = $$props;

  function getValue(key) {
    return value[key];
  }

  $$self.$$set = $$props => {
    if ('key' in $$props) $$invalidate(0, key = $$props.key);
    if ('value' in $$props) $$invalidate(7, value = $$props.value);
    if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ('nodeType' in $$props) $$invalidate(3, nodeType = $$props.nodeType);
    if ('expanded' in $$props) $$invalidate(4, expanded = $$props.expanded);
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*value*/
    128) {
      $$invalidate(5, keys = Object.getOwnPropertyNames(value));
    }
  };

  return [key, isParentExpanded, isParentArray, nodeType, expanded, keys, getValue, value];
}

class JSONObjectNode extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, {
      key: 0,
      value: 7,
      isParentExpanded: 1,
      isParentArray: 2,
      nodeType: 3,
      expanded: 4
    });
  }

}
/* node_modules/svelte-json-tree-auto/src/JSONArrayNode.svelte generated by Svelte v3.41.0 */


function create_fragment$7(ctx) {
  let jsonnested;
  let current;
  jsonnested = new JSONNested({
    props: {
      key:
      /*key*/
      ctx[0],
      expanded:
      /*expanded*/
      ctx[4],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[2],
      isParentArray:
      /*isParentArray*/
      ctx[3],
      isArray: true,
      keys:
      /*keys*/
      ctx[5],
      previewKeys:
      /*previewKeys*/
      ctx[6],
      getValue:
      /*getValue*/
      ctx[7],
      label: "Array(" +
      /*value*/
      ctx[1].length + ")",
      bracketOpen: "[",
      bracketClose: "]"
    }
  });
  return {
    c() {
      create_component(jsonnested.$$.fragment);
    },

    m(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },

    p(ctx, [dirty]) {
      const jsonnested_changes = {};
      if (dirty &
      /*key*/
      1) jsonnested_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*expanded*/
      16) jsonnested_changes.expanded =
      /*expanded*/
      ctx[4];
      if (dirty &
      /*isParentExpanded*/
      4) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[2];
      if (dirty &
      /*isParentArray*/
      8) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[3];
      if (dirty &
      /*keys*/
      32) jsonnested_changes.keys =
      /*keys*/
      ctx[5];
      if (dirty &
      /*previewKeys*/
      64) jsonnested_changes.previewKeys =
      /*previewKeys*/
      ctx[6];
      if (dirty &
      /*value*/
      2) jsonnested_changes.label = "Array(" +
      /*value*/
      ctx[1].length + ")";
      jsonnested.$set(jsonnested_changes);
    },

    i(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(jsonnested, detaching);
    }

  };
}

function instance$7($$self, $$props, $$invalidate) {
  let keys;
  let previewKeys;
  let {
    key,
    value,
    isParentExpanded,
    isParentArray
  } = $$props;
  let {
    expanded = JSON.stringify(value).length < 1024
  } = $$props;
  const filteredKey = new Set(['length']);

  function getValue(key) {
    return value[key];
  }

  $$self.$$set = $$props => {
    if ('key' in $$props) $$invalidate(0, key = $$props.key);
    if ('value' in $$props) $$invalidate(1, value = $$props.value);
    if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ('expanded' in $$props) $$invalidate(4, expanded = $$props.expanded);
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*value*/
    2) {
      $$invalidate(5, keys = Object.getOwnPropertyNames(value));
    }

    if ($$self.$$.dirty &
    /*keys*/
    32) {
      $$invalidate(6, previewKeys = keys.filter(key => !filteredKey.has(key)));
    }
  };

  return [key, value, isParentExpanded, isParentArray, expanded, keys, previewKeys, getValue];
}

class JSONArrayNode extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, safe_not_equal, {
      key: 0,
      value: 1,
      isParentExpanded: 2,
      isParentArray: 3,
      expanded: 4
    });
  }

}
/* node_modules/svelte-json-tree-auto/src/JSONIterableArrayNode.svelte generated by Svelte v3.41.0 */


function create_fragment$8(ctx) {
  let jsonnested;
  let current;
  jsonnested = new JSONNested({
    props: {
      key:
      /*key*/
      ctx[0],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[1],
      isParentArray:
      /*isParentArray*/
      ctx[2],
      keys:
      /*keys*/
      ctx[4],
      getKey,
      getValue,
      isArray: true,
      label: "" + (
      /*nodeType*/
      ctx[3] + "(" +
      /*keys*/
      ctx[4].length + ")"),
      bracketOpen: '{',
      bracketClose: '}'
    }
  });
  return {
    c() {
      create_component(jsonnested.$$.fragment);
    },

    m(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },

    p(ctx, [dirty]) {
      const jsonnested_changes = {};
      if (dirty &
      /*key*/
      1) jsonnested_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*isParentExpanded*/
      2) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[1];
      if (dirty &
      /*isParentArray*/
      4) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[2];
      if (dirty &
      /*keys*/
      16) jsonnested_changes.keys =
      /*keys*/
      ctx[4];
      if (dirty &
      /*nodeType, keys*/
      24) jsonnested_changes.label = "" + (
      /*nodeType*/
      ctx[3] + "(" +
      /*keys*/
      ctx[4].length + ")");
      jsonnested.$set(jsonnested_changes);
    },

    i(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(jsonnested, detaching);
    }

  };
}

function getKey(key) {
  return String(key[0]);
}

function getValue(key) {
  return key[1];
}

function instance$8($$self, $$props, $$invalidate) {
  let {
    key,
    value,
    isParentExpanded,
    isParentArray,
    nodeType
  } = $$props;
  let keys = [];

  $$self.$$set = $$props => {
    if ('key' in $$props) $$invalidate(0, key = $$props.key);
    if ('value' in $$props) $$invalidate(5, value = $$props.value);
    if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ('nodeType' in $$props) $$invalidate(3, nodeType = $$props.nodeType);
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*value*/
    32) {
      {
        let result = [];
        let i = 0;

        for (const entry of value) {
          result.push([i++, entry]);
        }

        $$invalidate(4, keys = result);
      }
    }
  };

  return [key, isParentExpanded, isParentArray, nodeType, keys, value];
}

class JSONIterableArrayNode extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$8, safe_not_equal, {
      key: 0,
      value: 5,
      isParentExpanded: 1,
      isParentArray: 2,
      nodeType: 3
    });
  }

}

class MapEntry {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

}
/* node_modules/svelte-json-tree-auto/src/JSONIterableMapNode.svelte generated by Svelte v3.41.0 */


function create_fragment$9(ctx) {
  let jsonnested;
  let current;
  jsonnested = new JSONNested({
    props: {
      key:
      /*key*/
      ctx[0],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[1],
      isParentArray:
      /*isParentArray*/
      ctx[2],
      keys:
      /*keys*/
      ctx[4],
      getKey: getKey$1,
      getValue: getValue$1,
      label: "" + (
      /*nodeType*/
      ctx[3] + "(" +
      /*keys*/
      ctx[4].length + ")"),
      colon: "",
      bracketOpen: '{',
      bracketClose: '}'
    }
  });
  return {
    c() {
      create_component(jsonnested.$$.fragment);
    },

    m(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },

    p(ctx, [dirty]) {
      const jsonnested_changes = {};
      if (dirty &
      /*key*/
      1) jsonnested_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*isParentExpanded*/
      2) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[1];
      if (dirty &
      /*isParentArray*/
      4) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[2];
      if (dirty &
      /*keys*/
      16) jsonnested_changes.keys =
      /*keys*/
      ctx[4];
      if (dirty &
      /*nodeType, keys*/
      24) jsonnested_changes.label = "" + (
      /*nodeType*/
      ctx[3] + "(" +
      /*keys*/
      ctx[4].length + ")");
      jsonnested.$set(jsonnested_changes);
    },

    i(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(jsonnested, detaching);
    }

  };
}

function getKey$1(entry) {
  return entry[0];
}

function getValue$1(entry) {
  return entry[1];
}

function instance$9($$self, $$props, $$invalidate) {
  let {
    key,
    value,
    isParentExpanded,
    isParentArray,
    nodeType
  } = $$props;
  let keys = [];

  $$self.$$set = $$props => {
    if ('key' in $$props) $$invalidate(0, key = $$props.key);
    if ('value' in $$props) $$invalidate(5, value = $$props.value);
    if ('isParentExpanded' in $$props) $$invalidate(1, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(2, isParentArray = $$props.isParentArray);
    if ('nodeType' in $$props) $$invalidate(3, nodeType = $$props.nodeType);
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*value*/
    32) {
      {
        let result = [];
        let i = 0;

        for (const entry of value) {
          result.push([i++, new MapEntry(entry[0], entry[1])]);
        }

        $$invalidate(4, keys = result);
      }
    }
  };

  return [key, isParentExpanded, isParentArray, nodeType, keys, value];
}

class JSONIterableMapNode extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$9, create_fragment$9, safe_not_equal, {
      key: 0,
      value: 5,
      isParentExpanded: 1,
      isParentArray: 2,
      nodeType: 3
    });
  }

}
/* node_modules/svelte-json-tree-auto/src/JSONMapEntryNode.svelte generated by Svelte v3.41.0 */


function create_fragment$a(ctx) {
  let jsonnested;
  let current;
  jsonnested = new JSONNested({
    props: {
      expanded:
      /*expanded*/
      ctx[4],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[2],
      isParentArray:
      /*isParentArray*/
      ctx[3],
      key:
      /*isParentExpanded*/
      ctx[2] ? String(
      /*key*/
      ctx[0]) :
      /*value*/
      ctx[1].key,
      keys:
      /*keys*/
      ctx[5],
      getValue:
      /*getValue*/
      ctx[6],
      label:
      /*isParentExpanded*/
      ctx[2] ? 'Entry ' : '=> ',
      bracketOpen: '{',
      bracketClose: '}'
    }
  });
  return {
    c() {
      create_component(jsonnested.$$.fragment);
    },

    m(target, anchor) {
      mount_component(jsonnested, target, anchor);
      current = true;
    },

    p(ctx, [dirty]) {
      const jsonnested_changes = {};
      if (dirty &
      /*expanded*/
      16) jsonnested_changes.expanded =
      /*expanded*/
      ctx[4];
      if (dirty &
      /*isParentExpanded*/
      4) jsonnested_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[2];
      if (dirty &
      /*isParentArray*/
      8) jsonnested_changes.isParentArray =
      /*isParentArray*/
      ctx[3];
      if (dirty &
      /*isParentExpanded, key, value*/
      7) jsonnested_changes.key =
      /*isParentExpanded*/
      ctx[2] ? String(
      /*key*/
      ctx[0]) :
      /*value*/
      ctx[1].key;
      if (dirty &
      /*isParentExpanded*/
      4) jsonnested_changes.label =
      /*isParentExpanded*/
      ctx[2] ? 'Entry ' : '=> ';
      jsonnested.$set(jsonnested_changes);
    },

    i(local) {
      if (current) return;
      transition_in(jsonnested.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonnested.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(jsonnested, detaching);
    }

  };
}

function instance$a($$self, $$props, $$invalidate) {
  let {
    key,
    value,
    isParentExpanded,
    isParentArray
  } = $$props;
  let {
    expanded = false
  } = $$props;
  const keys = ['key', 'value'];

  function getValue(key) {
    return value[key];
  }

  $$self.$$set = $$props => {
    if ('key' in $$props) $$invalidate(0, key = $$props.key);
    if ('value' in $$props) $$invalidate(1, value = $$props.value);
    if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
    if ('expanded' in $$props) $$invalidate(4, expanded = $$props.expanded);
  };

  return [key, value, isParentExpanded, isParentArray, expanded, keys, getValue];
}

class JSONMapEntryNode extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$a, create_fragment$a, safe_not_equal, {
      key: 0,
      value: 1,
      isParentExpanded: 2,
      isParentArray: 3,
      expanded: 4
    });
  }

}
/* node_modules/svelte-json-tree-auto/src/JSONValueNode.svelte generated by Svelte v3.41.0 */


function add_css$5(target) {
  append_styles(target, "svelte-3bjyvl", "li.svelte-3bjyvl{user-select:text;word-wrap:break-word;word-break:break-all}.indent.svelte-3bjyvl{padding-left:var(--li-identation)}.String.svelte-3bjyvl{color:var(--string-color)}.Date.svelte-3bjyvl{color:var(--date-color)}.Number.svelte-3bjyvl{color:var(--number-color)}.Boolean.svelte-3bjyvl{color:var(--boolean-color)}.Null.svelte-3bjyvl{color:var(--null-color)}.Undefined.svelte-3bjyvl{color:var(--undefined-color)}.Function.svelte-3bjyvl{color:var(--function-color);font-style:italic}.Symbol.svelte-3bjyvl{color:var(--symbol-color)}");
}

function create_fragment$b(ctx) {
  let li;
  let jsonkey;
  let t0;
  let span;
  let t1_value = (
  /*valueGetter*/
  ctx[2] ?
  /*valueGetter*/
  ctx[2](
  /*value*/
  ctx[1]) :
  /*value*/
  ctx[1]) + "";
  let t1;
  let span_class_value;
  let current;
  jsonkey = new JSONKey({
    props: {
      key:
      /*key*/
      ctx[0],
      colon:
      /*colon*/
      ctx[6],
      isParentExpanded:
      /*isParentExpanded*/
      ctx[3],
      isParentArray:
      /*isParentArray*/
      ctx[4]
    }
  });
  return {
    c() {
      li = element("li");
      create_component(jsonkey.$$.fragment);
      t0 = space();
      span = element("span");
      t1 = text(t1_value);
      attr(span, "class", span_class_value = "" + (null_to_empty(
      /*nodeType*/
      ctx[5]) + " svelte-3bjyvl"));
      attr(li, "class", "svelte-3bjyvl");
      toggle_class(li, "indent",
      /*isParentExpanded*/
      ctx[3]);
    },

    m(target, anchor) {
      insert(target, li, anchor);
      mount_component(jsonkey, li, null);
      append(li, t0);
      append(li, span);
      append(span, t1);
      current = true;
    },

    p(ctx, [dirty]) {
      const jsonkey_changes = {};
      if (dirty &
      /*key*/
      1) jsonkey_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*isParentExpanded*/
      8) jsonkey_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[3];
      if (dirty &
      /*isParentArray*/
      16) jsonkey_changes.isParentArray =
      /*isParentArray*/
      ctx[4];
      jsonkey.$set(jsonkey_changes);
      if ((!current || dirty &
      /*valueGetter, value*/
      6) && t1_value !== (t1_value = (
      /*valueGetter*/
      ctx[2] ?
      /*valueGetter*/
      ctx[2](
      /*value*/
      ctx[1]) :
      /*value*/
      ctx[1]) + "")) set_data(t1, t1_value);

      if (!current || dirty &
      /*nodeType*/
      32 && span_class_value !== (span_class_value = "" + (null_to_empty(
      /*nodeType*/
      ctx[5]) + " svelte-3bjyvl"))) {
        attr(span, "class", span_class_value);
      }

      if (dirty &
      /*isParentExpanded*/
      8) {
        toggle_class(li, "indent",
        /*isParentExpanded*/
        ctx[3]);
      }
    },

    i(local) {
      if (current) return;
      transition_in(jsonkey.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonkey.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(li);
      destroy_component(jsonkey);
    }

  };
}

function instance$b($$self, $$props, $$invalidate) {
  let {
    key,
    value,
    valueGetter = null,
    isParentExpanded,
    isParentArray,
    nodeType
  } = $$props;
  const {
    colon
  } = getContext(contextKey);

  $$self.$$set = $$props => {
    if ('key' in $$props) $$invalidate(0, key = $$props.key);
    if ('value' in $$props) $$invalidate(1, value = $$props.value);
    if ('valueGetter' in $$props) $$invalidate(2, valueGetter = $$props.valueGetter);
    if ('isParentExpanded' in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ('nodeType' in $$props) $$invalidate(5, nodeType = $$props.nodeType);
  };

  return [key, value, valueGetter, isParentExpanded, isParentArray, nodeType, colon];
}

class JSONValueNode extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$b, create_fragment$b, safe_not_equal, {
      key: 0,
      value: 1,
      valueGetter: 2,
      isParentExpanded: 3,
      isParentArray: 4,
      nodeType: 5
    }, add_css$5);
  }

}
/* node_modules/svelte-json-tree-auto/src/ErrorNode.svelte generated by Svelte v3.41.0 */


function add_css$6(target) {
  append_styles(target, "svelte-1ca3gb2", "li.svelte-1ca3gb2{user-select:text;word-wrap:break-word;word-break:break-all}.indent.svelte-1ca3gb2{padding-left:var(--li-identation)}.collapse.svelte-1ca3gb2{--li-display:inline;display:inline;font-style:italic}");
}

function get_each_context$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[8] = list[i];
  child_ctx[10] = i;
  return child_ctx;
} // (40:2) {#if isParentExpanded}


function create_if_block_2$1(ctx) {
  let jsonarrow;
  let current;
  jsonarrow = new JSONArrow({
    props: {
      expanded:
      /*expanded*/
      ctx[0]
    }
  });
  jsonarrow.$on("click",
  /*toggleExpand*/
  ctx[7]);
  return {
    c() {
      create_component(jsonarrow.$$.fragment);
    },

    m(target, anchor) {
      mount_component(jsonarrow, target, anchor);
      current = true;
    },

    p(ctx, dirty) {
      const jsonarrow_changes = {};
      if (dirty &
      /*expanded*/
      1) jsonarrow_changes.expanded =
      /*expanded*/
      ctx[0];
      jsonarrow.$set(jsonarrow_changes);
    },

    i(local) {
      if (current) return;
      transition_in(jsonarrow.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonarrow.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(jsonarrow, detaching);
    }

  };
} // (45:2) {#if isParentExpanded}


function create_if_block$3(ctx) {
  let ul;
  let current;
  let if_block =
  /*expanded*/
  ctx[0] && create_if_block_1$1(ctx);
  return {
    c() {
      ul = element("ul");
      if (if_block) if_block.c();
      attr(ul, "class", "svelte-1ca3gb2");
      toggle_class(ul, "collapse", !
      /*expanded*/
      ctx[0]);
    },

    m(target, anchor) {
      insert(target, ul, anchor);
      if (if_block) if_block.m(ul, null);
      current = true;
    },

    p(ctx, dirty) {
      if (
      /*expanded*/
      ctx[0]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*expanded*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1$1(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(ul, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }

      if (dirty &
      /*expanded*/
      1) {
        toggle_class(ul, "collapse", !
        /*expanded*/
        ctx[0]);
      }
    },

    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },

    o(local) {
      transition_out(if_block);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(ul);
      if (if_block) if_block.d();
    }

  };
} // (47:6) {#if expanded}


function create_if_block_1$1(ctx) {
  let jsonnode;
  let t0;
  let li;
  let jsonkey;
  let t1;
  let span;
  let current;
  jsonnode = new JSONNode({
    props: {
      key: "message",
      value:
      /*value*/
      ctx[2].message
    }
  });
  jsonkey = new JSONKey({
    props: {
      key: "stack",
      colon: ":",
      isParentExpanded:
      /*isParentExpanded*/
      ctx[3]
    }
  });
  let each_value =
  /*stack*/
  ctx[5];
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  }

  return {
    c() {
      create_component(jsonnode.$$.fragment);
      t0 = space();
      li = element("li");
      create_component(jsonkey.$$.fragment);
      t1 = space();
      span = element("span");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      attr(li, "class", "svelte-1ca3gb2");
    },

    m(target, anchor) {
      mount_component(jsonnode, target, anchor);
      insert(target, t0, anchor);
      insert(target, li, anchor);
      mount_component(jsonkey, li, null);
      append(li, t1);
      append(li, span);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(span, null);
      }

      current = true;
    },

    p(ctx, dirty) {
      const jsonnode_changes = {};
      if (dirty &
      /*value*/
      4) jsonnode_changes.value =
      /*value*/
      ctx[2].message;
      jsonnode.$set(jsonnode_changes);
      const jsonkey_changes = {};
      if (dirty &
      /*isParentExpanded*/
      8) jsonkey_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[3];
      jsonkey.$set(jsonkey_changes);

      if (dirty &
      /*stack*/
      32) {
        each_value =
        /*stack*/
        ctx[5];
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$2(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$2(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(span, null);
          }
        }

        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },

    i(local) {
      if (current) return;
      transition_in(jsonnode.$$.fragment, local);
      transition_in(jsonkey.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonnode.$$.fragment, local);
      transition_out(jsonkey.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(jsonnode, detaching);
      if (detaching) detach(t0);
      if (detaching) detach(li);
      destroy_component(jsonkey);
      destroy_each(each_blocks, detaching);
    }

  };
} // (52:12) {#each stack as line, index}


function create_each_block$2(ctx) {
  let span;
  let t_value =
  /*line*/
  ctx[8] + "";
  let t;
  let br;
  return {
    c() {
      span = element("span");
      t = text(t_value);
      br = element("br");
      attr(span, "class", "svelte-1ca3gb2");
      toggle_class(span, "indent",
      /*index*/
      ctx[10] > 0);
    },

    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
      insert(target, br, anchor);
    },

    p(ctx, dirty) {
      if (dirty &
      /*stack*/
      32 && t_value !== (t_value =
      /*line*/
      ctx[8] + "")) set_data(t, t_value);
    },

    d(detaching) {
      if (detaching) detach(span);
      if (detaching) detach(br);
    }

  };
}

function create_fragment$c(ctx) {
  let li;
  let t0;
  let jsonkey;
  let t1;
  let span;
  let t2;
  let t3_value = (
  /*expanded*/
  ctx[0] ? '' :
  /*value*/
  ctx[2].message) + "";
  let t3;
  let t4;
  let current;
  let mounted;
  let dispose;
  let if_block0 =
  /*isParentExpanded*/
  ctx[3] && create_if_block_2$1(ctx);
  jsonkey = new JSONKey({
    props: {
      key:
      /*key*/
      ctx[1],
      colon:
      /*context*/
      ctx[6].colon,
      isParentExpanded:
      /*isParentExpanded*/
      ctx[3],
      isParentArray:
      /*isParentArray*/
      ctx[4]
    }
  });
  let if_block1 =
  /*isParentExpanded*/
  ctx[3] && create_if_block$3(ctx);
  return {
    c() {
      li = element("li");
      if (if_block0) if_block0.c();
      t0 = space();
      create_component(jsonkey.$$.fragment);
      t1 = space();
      span = element("span");
      t2 = text("Error: ");
      t3 = text(t3_value);
      t4 = space();
      if (if_block1) if_block1.c();
      attr(li, "class", "svelte-1ca3gb2");
      toggle_class(li, "indent",
      /*isParentExpanded*/
      ctx[3]);
    },

    m(target, anchor) {
      insert(target, li, anchor);
      if (if_block0) if_block0.m(li, null);
      append(li, t0);
      mount_component(jsonkey, li, null);
      append(li, t1);
      append(li, span);
      append(span, t2);
      append(span, t3);
      append(li, t4);
      if (if_block1) if_block1.m(li, null);
      current = true;

      if (!mounted) {
        dispose = listen(span, "click",
        /*toggleExpand*/
        ctx[7]);
        mounted = true;
      }
    },

    p(ctx, [dirty]) {
      if (
      /*isParentExpanded*/
      ctx[3]) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*isParentExpanded*/
          8) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_2$1(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(li, t0);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }

      const jsonkey_changes = {};
      if (dirty &
      /*key*/
      2) jsonkey_changes.key =
      /*key*/
      ctx[1];
      if (dirty &
      /*isParentExpanded*/
      8) jsonkey_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[3];
      if (dirty &
      /*isParentArray*/
      16) jsonkey_changes.isParentArray =
      /*isParentArray*/
      ctx[4];
      jsonkey.$set(jsonkey_changes);
      if ((!current || dirty &
      /*expanded, value*/
      5) && t3_value !== (t3_value = (
      /*expanded*/
      ctx[0] ? '' :
      /*value*/
      ctx[2].message) + "")) set_data(t3, t3_value);

      if (
      /*isParentExpanded*/
      ctx[3]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*isParentExpanded*/
          8) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block$3(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(li, null);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }

      if (dirty &
      /*isParentExpanded*/
      8) {
        toggle_class(li, "indent",
        /*isParentExpanded*/
        ctx[3]);
      }
    },

    i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(jsonkey.$$.fragment, local);
      transition_in(if_block1);
      current = true;
    },

    o(local) {
      transition_out(if_block0);
      transition_out(jsonkey.$$.fragment, local);
      transition_out(if_block1);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(li);
      if (if_block0) if_block0.d();
      destroy_component(jsonkey);
      if (if_block1) if_block1.d();
      mounted = false;
      dispose();
    }

  };
}

function instance$c($$self, $$props, $$invalidate) {
  let stack;
  let {
    key,
    value,
    isParentExpanded,
    isParentArray
  } = $$props;
  let {
    expanded = false
  } = $$props;
  const context = getContext(contextKey);
  setContext(contextKey, { ...context,
    colon: ':'
  });

  function toggleExpand() {
    $$invalidate(0, expanded = !expanded);
  }

  $$self.$$set = $$props => {
    if ('key' in $$props) $$invalidate(1, key = $$props.key);
    if ('value' in $$props) $$invalidate(2, value = $$props.value);
    if ('isParentExpanded' in $$props) $$invalidate(3, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(4, isParentArray = $$props.isParentArray);
    if ('expanded' in $$props) $$invalidate(0, expanded = $$props.expanded);
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*value*/
    4) {
      $$invalidate(5, stack = value.stack.split('\n'));
    }

    if ($$self.$$.dirty &
    /*isParentExpanded*/
    8) {
      if (!isParentExpanded) {
        $$invalidate(0, expanded = false);
      }
    }
  };

  return [expanded, key, value, isParentExpanded, isParentArray, stack, context, toggleExpand];
}

class ErrorNode extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$c, create_fragment$c, safe_not_equal, {
      key: 1,
      value: 2,
      isParentExpanded: 3,
      isParentArray: 4,
      expanded: 0
    }, add_css$6);
  }

}

function objType(obj) {
  const type = Object.prototype.toString.call(obj).slice(8, -1);

  if (type === 'Object') {
    if (typeof obj[Symbol.iterator] === 'function') {
      return 'Iterable';
    }

    return obj.constructor.name;
  }

  return type;
}
/* node_modules/svelte-json-tree-auto/src/JSONNode.svelte generated by Svelte v3.41.0 */


function create_fragment$d(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value =
  /*componentType*/
  ctx[6];

  function switch_props(ctx) {
    return {
      props: {
        key:
        /*key*/
        ctx[0],
        value:
        /*value*/
        ctx[1],
        isParentExpanded:
        /*isParentExpanded*/
        ctx[2],
        isParentArray:
        /*isParentArray*/
        ctx[3],
        nodeType:
        /*nodeType*/
        ctx[4],
        valueGetter:
        /*valueGetter*/
        ctx[5]
      }
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }

  return {
    c() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },

    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert(target, switch_instance_anchor, anchor);
      current = true;
    },

    p(ctx, [dirty]) {
      const switch_instance_changes = {};
      if (dirty &
      /*key*/
      1) switch_instance_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*value*/
      2) switch_instance_changes.value =
      /*value*/
      ctx[1];
      if (dirty &
      /*isParentExpanded*/
      4) switch_instance_changes.isParentExpanded =
      /*isParentExpanded*/
      ctx[2];
      if (dirty &
      /*isParentArray*/
      8) switch_instance_changes.isParentArray =
      /*isParentArray*/
      ctx[3];
      if (dirty &
      /*nodeType*/
      16) switch_instance_changes.nodeType =
      /*nodeType*/
      ctx[4];
      if (dirty &
      /*valueGetter*/
      32) switch_instance_changes.valueGetter =
      /*valueGetter*/
      ctx[5];

      if (switch_value !== (switch_value =
      /*componentType*/
      ctx[6])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },

    i(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },

    o(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }

  };
}

function instance$d($$self, $$props, $$invalidate) {
  let nodeType;
  let componentType;
  let valueGetter;
  let {
    key,
    value,
    isParentExpanded,
    isParentArray
  } = $$props;

  function getComponent(nodeType) {
    switch (nodeType) {
      case 'Object':
        return JSONObjectNode;

      case 'Error':
        return ErrorNode;

      case 'Array':
        return JSONArrayNode;

      case 'Iterable':
      case 'Map':
      case 'Set':
        return typeof value.set === 'function' ? JSONIterableMapNode : JSONIterableArrayNode;

      case 'MapEntry':
        return JSONMapEntryNode;

      default:
        return JSONValueNode;
    }
  }

  function getValueGetter(nodeType) {
    switch (nodeType) {
      case 'Object':
      case 'Error':
      case 'Array':
      case 'Iterable':
      case 'Map':
      case 'Set':
      case 'MapEntry':
      case 'Number':
        return undefined;

      case 'String':
        return raw => "\"".concat(raw, "\"");

      case 'Boolean':
        return raw => raw ? 'true' : 'false';

      case 'Date':
        return raw => raw.toISOString();

      case 'Null':
        return () => 'null';

      case 'Undefined':
        return () => 'undefined';

      case 'Function':
      case 'Symbol':
        return raw => raw.toString();

      default:
        return () => "<".concat(nodeType, ">");
    }
  }

  $$self.$$set = $$props => {
    if ('key' in $$props) $$invalidate(0, key = $$props.key);
    if ('value' in $$props) $$invalidate(1, value = $$props.value);
    if ('isParentExpanded' in $$props) $$invalidate(2, isParentExpanded = $$props.isParentExpanded);
    if ('isParentArray' in $$props) $$invalidate(3, isParentArray = $$props.isParentArray);
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*value*/
    2) {
      $$invalidate(4, nodeType = objType(value));
    }

    if ($$self.$$.dirty &
    /*nodeType*/
    16) {
      $$invalidate(6, componentType = getComponent(nodeType));
    }

    if ($$self.$$.dirty &
    /*nodeType*/
    16) {
      $$invalidate(5, valueGetter = getValueGetter(nodeType));
    }
  };

  return [key, value, isParentExpanded, isParentArray, nodeType, valueGetter, componentType];
}

class JSONNode extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$d, create_fragment$d, safe_not_equal, {
      key: 0,
      value: 1,
      isParentExpanded: 2,
      isParentArray: 3
    });
  }

}
/* node_modules/svelte-json-tree-auto/src/Root.svelte generated by Svelte v3.41.0 */


function add_css$7(target) {
  append_styles(target, "svelte-773n60", "ul.svelte-773n60{--string-color:var(--json-tree-string-color, #cb3f41);--symbol-color:var(--json-tree-symbol-color, #cb3f41);--boolean-color:var(--json-tree-boolean-color, #112aa7);--function-color:var(--json-tree-function-color, #112aa7);--number-color:var(--json-tree-number-color, #3029cf);--label-color:var(--json-tree-label-color, #871d8f);--arrow-color:var(--json-tree-arrow-color, #727272);--null-color:var(--json-tree-null-color, #8d8d8d);--undefined-color:var(--json-tree-undefined-color, #8d8d8d);--date-color:var(--json-tree-date-color, #8d8d8d);--li-identation:var(--json-tree-li-indentation, 1em);--li-line-height:var(--json-tree-li-line-height, 1.3);--li-colon-space:0.3em;font-size:var(--json-tree-font-size, 12px);font-family:var(--json-tree-font-family, 'Courier New', Courier, monospace)}ul.svelte-773n60 li{line-height:var(--li-line-height);display:var(--li-display, list-item);list-style:none}ul.svelte-773n60,ul.svelte-773n60 ul{padding:0;margin:0}");
}

function create_fragment$e(ctx) {
  let ul;
  let jsonnode;
  let current;
  jsonnode = new JSONNode({
    props: {
      key:
      /*key*/
      ctx[0],
      value:
      /*value*/
      ctx[1],
      isParentExpanded: true,
      isParentArray: false
    }
  });
  return {
    c() {
      ul = element("ul");
      create_component(jsonnode.$$.fragment);
      attr(ul, "class", "svelte-773n60");
    },

    m(target, anchor) {
      insert(target, ul, anchor);
      mount_component(jsonnode, ul, null);
      current = true;
    },

    p(ctx, [dirty]) {
      const jsonnode_changes = {};
      if (dirty &
      /*key*/
      1) jsonnode_changes.key =
      /*key*/
      ctx[0];
      if (dirty &
      /*value*/
      2) jsonnode_changes.value =
      /*value*/
      ctx[1];
      jsonnode.$set(jsonnode_changes);
    },

    i(local) {
      if (current) return;
      transition_in(jsonnode.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(jsonnode.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(ul);
      destroy_component(jsonnode);
    }

  };
}

function instance$e($$self, $$props, $$invalidate) {
  setContext(contextKey, {});
  let {
    key = '',
    value
  } = $$props;

  $$self.$$set = $$props => {
    if ('key' in $$props) $$invalidate(0, key = $$props.key);
    if ('value' in $$props) $$invalidate(1, value = $$props.value);
  };

  return [key, value];
}

class Root extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$e, create_fragment$e, safe_not_equal, {
      key: 0,
      value: 1
    }, add_css$7);
  }

}
/* src/client/debug/main/ClientSwitcher.svelte generated by Svelte v3.41.0 */


function add_css$8(target) {
  append_styles(target, "svelte-jvfq3i", ".svelte-jvfq3i{box-sizing:border-box}section.switcher.svelte-jvfq3i{position:sticky;bottom:0;transform:translateY(20px);margin:40px -20px 0;border-top:1px solid #999;padding:20px;background:#fff}label.svelte-jvfq3i{display:flex;align-items:baseline;gap:5px;font-weight:bold}select.svelte-jvfq3i{min-width:140px}");
}

function get_each_context$3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  child_ctx[9] = i;
  return child_ctx;
} // (42:0) {#if debuggableClients.length > 1}


function create_if_block$4(ctx) {
  let section;
  let label;
  let t;
  let select;
  let mounted;
  let dispose;
  let each_value =
  /*debuggableClients*/
  ctx[1];
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
  }

  return {
    c() {
      section = element("section");
      label = element("label");
      t = text("Client\n      \n      ");
      select = element("select");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      attr(select, "id", selectId);
      attr(select, "class", "svelte-jvfq3i");
      if (
      /*selected*/
      ctx[2] === void 0) add_render_callback(() =>
      /*select_change_handler*/
      ctx[6].call(select));
      attr(label, "class", "svelte-jvfq3i");
      attr(section, "class", "switcher svelte-jvfq3i");
    },

    m(target, anchor) {
      insert(target, section, anchor);
      append(section, label);
      append(label, t);
      append(label, select);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(select, null);
      }

      select_option(select,
      /*selected*/
      ctx[2]);

      if (!mounted) {
        dispose = [listen(select, "change",
        /*handleSelection*/
        ctx[3]), listen(select, "change",
        /*select_change_handler*/
        ctx[6])];
        mounted = true;
      }
    },

    p(ctx, dirty) {
      if (dirty &
      /*debuggableClients, JSON*/
      2) {
        each_value =
        /*debuggableClients*/
        ctx[1];
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$3(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$3(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(select, null);
          }
        }

        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }

        each_blocks.length = each_value.length;
      }

      if (dirty &
      /*selected*/
      4) {
        select_option(select,
        /*selected*/
        ctx[2]);
      }
    },

    d(detaching) {
      if (detaching) detach(section);
      destroy_each(each_blocks, detaching);
      mounted = false;
      run_all(dispose);
    }

  };
} // (48:8) {#each debuggableClients as clientOption, index}


function create_each_block$3(ctx) {
  let option;
  let t0;
  let t1;
  let t2_value = JSON.stringify(
  /*clientOption*/
  ctx[7].playerID) + "";
  let t2;
  let t3;
  let t4_value = JSON.stringify(
  /*clientOption*/
  ctx[7].matchID) + "";
  let t4;
  let t5;
  let t6_value =
  /*clientOption*/
  ctx[7].game.name + "";
  let t6;
  let t7;
  let option_value_value;
  return {
    c() {
      option = element("option");
      t0 = text(
      /*index*/
      ctx[9]);
      t1 = text(" ???\n            playerID: ");
      t2 = text(t2_value);
      t3 = text(",\n            matchID: ");
      t4 = text(t4_value);
      t5 = text("\n            (");
      t6 = text(t6_value);
      t7 = text(")\n          ");
      option.__value = option_value_value =
      /*index*/
      ctx[9];
      option.value = option.__value;
      attr(option, "class", "svelte-jvfq3i");
    },

    m(target, anchor) {
      insert(target, option, anchor);
      append(option, t0);
      append(option, t1);
      append(option, t2);
      append(option, t3);
      append(option, t4);
      append(option, t5);
      append(option, t6);
      append(option, t7);
    },

    p(ctx, dirty) {
      if (dirty &
      /*debuggableClients*/
      2 && t2_value !== (t2_value = JSON.stringify(
      /*clientOption*/
      ctx[7].playerID) + "")) set_data(t2, t2_value);
      if (dirty &
      /*debuggableClients*/
      2 && t4_value !== (t4_value = JSON.stringify(
      /*clientOption*/
      ctx[7].matchID) + "")) set_data(t4, t4_value);
      if (dirty &
      /*debuggableClients*/
      2 && t6_value !== (t6_value =
      /*clientOption*/
      ctx[7].game.name + "")) set_data(t6, t6_value);
    },

    d(detaching) {
      if (detaching) detach(option);
    }

  };
}

function create_fragment$f(ctx) {
  let if_block_anchor;
  let if_block =
  /*debuggableClients*/
  ctx[1].length > 1 && create_if_block$4(ctx);
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },

    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },

    p(ctx, [dirty]) {
      if (
      /*debuggableClients*/
      ctx[1].length > 1) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$4(ctx);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach(if_block_anchor);
    }

  };
}

const selectId = 'bgio-debug-select-client';

function instance$f($$self, $$props, $$invalidate) {
  let client;
  let debuggableClients;
  let selected;

  let $clientManager,
      $$unsubscribe_clientManager = noop,
      $$subscribe_clientManager = () => ($$unsubscribe_clientManager(), $$unsubscribe_clientManager = subscribe(clientManager, $$value => $$invalidate(5, $clientManager = $$value)), clientManager);

  $$self.$$.on_destroy.push(() => $$unsubscribe_clientManager());
  let {
    clientManager
  } = $$props;
  $$subscribe_clientManager();

  const handleSelection = e => {
    // Request to switch to the selected client.
    const selectedClient = debuggableClients[e.target.value];
    clientManager.switchToClient(selectedClient); // Maintain focus on the client select menu after switching clients.
    // Necessary because switching clients will usually trigger a mount/unmount.

    const select = document.getElementById(selectId);
    if (select) select.focus();
  };

  function select_change_handler() {
    selected = select_value(this);
    (($$invalidate(2, selected), $$invalidate(1, debuggableClients)), $$invalidate(4, client)), $$invalidate(5, $clientManager);
  }

  $$self.$$set = $$props => {
    if ('clientManager' in $$props) $$subscribe_clientManager($$invalidate(0, clientManager = $$props.clientManager));
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*$clientManager*/
    32) {
      $$invalidate(4, ({
        client,
        debuggableClients
      } = $clientManager), client, ($$invalidate(1, debuggableClients), $$invalidate(5, $clientManager)));
    }

    if ($$self.$$.dirty &
    /*debuggableClients, client*/
    18) {
      $$invalidate(2, selected = debuggableClients.indexOf(client));
    }
  };

  return [clientManager, debuggableClients, selected, handleSelection, client, $clientManager, select_change_handler];
}

class ClientSwitcher extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$f, create_fragment$f, safe_not_equal, {
      clientManager: 0
    }, add_css$8);
  }

}
/* src/client/debug/main/Hotkey.svelte generated by Svelte v3.41.0 */


function add_css$9(target) {
  append_styles(target, "svelte-1vfj1mn", ".key.svelte-1vfj1mn.svelte-1vfj1mn{display:flex;flex-direction:row;align-items:center}button.svelte-1vfj1mn.svelte-1vfj1mn{cursor:pointer;min-width:10px;padding-left:5px;padding-right:5px;height:20px;line-height:20px;text-align:center;border:1px solid #ccc;box-shadow:1px 1px 1px #888;background:#eee;color:#444}button.svelte-1vfj1mn.svelte-1vfj1mn:hover{background:#ddd}.key.active.svelte-1vfj1mn button.svelte-1vfj1mn{background:#ddd;border:1px solid #999;box-shadow:none}label.svelte-1vfj1mn.svelte-1vfj1mn{margin-left:10px}");
} // (78:2) {#if label}


function create_if_block$5(ctx) {
  let label_1;
  let t0;
  let t1;
  let span;
  let t2_value = "(shortcut: ".concat(
  /*value*/
  ctx[0], ")") + "";
  let t2;
  return {
    c() {
      label_1 = element("label");
      t0 = text(
      /*label*/
      ctx[1]);
      t1 = space();
      span = element("span");
      t2 = text(t2_value);
      attr(span, "class", "screen-reader-only");
      attr(label_1, "for",
      /*id*/
      ctx[5]);
      attr(label_1, "class", "svelte-1vfj1mn");
    },

    m(target, anchor) {
      insert(target, label_1, anchor);
      append(label_1, t0);
      append(label_1, t1);
      append(label_1, span);
      append(span, t2);
    },

    p(ctx, dirty) {
      if (dirty &
      /*label*/
      2) set_data(t0,
      /*label*/
      ctx[1]);
      if (dirty &
      /*value*/
      1 && t2_value !== (t2_value = "(shortcut: ".concat(
      /*value*/
      ctx[0], ")") + "")) set_data(t2, t2_value);
    },

    d(detaching) {
      if (detaching) detach(label_1);
    }

  };
}

function create_fragment$g(ctx) {
  let div;
  let button;
  let t0;
  let t1;
  let mounted;
  let dispose;
  let if_block =
  /*label*/
  ctx[1] && create_if_block$5(ctx);
  return {
    c() {
      div = element("div");
      button = element("button");
      t0 = text(
      /*value*/
      ctx[0]);
      t1 = space();
      if (if_block) if_block.c();
      attr(button, "id",
      /*id*/
      ctx[5]);
      button.disabled =
      /*disable*/
      ctx[2];
      attr(button, "class", "svelte-1vfj1mn");
      attr(div, "class", "key svelte-1vfj1mn");
      toggle_class(div, "active",
      /*active*/
      ctx[3]);
    },

    m(target, anchor) {
      insert(target, div, anchor);
      append(div, button);
      append(button, t0);
      append(div, t1);
      if (if_block) if_block.m(div, null);

      if (!mounted) {
        dispose = [listen(window, "keydown",
        /*Keypress*/
        ctx[7]), listen(button, "click",
        /*Activate*/
        ctx[6])];
        mounted = true;
      }
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*value*/
      1) set_data(t0,
      /*value*/
      ctx[0]);

      if (dirty &
      /*disable*/
      4) {
        button.disabled =
        /*disable*/
        ctx[2];
      }

      if (
      /*label*/
      ctx[1]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$5(ctx);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }

      if (dirty &
      /*active*/
      8) {
        toggle_class(div, "active",
        /*active*/
        ctx[3]);
      }
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(div);
      if (if_block) if_block.d();
      mounted = false;
      run_all(dispose);
    }

  };
}

function instance$g($$self, $$props, $$invalidate) {
  let $disableHotkeys;
  let {
    value
  } = $$props;
  let {
    onPress = null
  } = $$props;
  let {
    label = null
  } = $$props;
  let {
    disable = false
  } = $$props;
  const {
    disableHotkeys
  } = getContext('hotkeys');
  component_subscribe($$self, disableHotkeys, value => $$invalidate(9, $disableHotkeys = value));
  let active = false;
  let id = "key-".concat(value);

  function Deactivate() {
    $$invalidate(3, active = false);
  }

  function Activate() {
    $$invalidate(3, active = true);
    setTimeout(Deactivate, 200);

    if (onPress) {
      setTimeout(onPress, 1);
    }
  }

  function Keypress(e) {
    if (!$disableHotkeys && !disable && !e.ctrlKey && !e.metaKey && e.key == value) {
      e.preventDefault();
      Activate();
    }
  }

  $$self.$$set = $$props => {
    if ('value' in $$props) $$invalidate(0, value = $$props.value);
    if ('onPress' in $$props) $$invalidate(8, onPress = $$props.onPress);
    if ('label' in $$props) $$invalidate(1, label = $$props.label);
    if ('disable' in $$props) $$invalidate(2, disable = $$props.disable);
  };

  return [value, label, disable, active, disableHotkeys, id, Activate, Keypress, onPress];
}

class Hotkey extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$g, create_fragment$g, safe_not_equal, {
      value: 0,
      onPress: 8,
      label: 1,
      disable: 2
    }, add_css$9);
  }

}
/* src/client/debug/main/InteractiveFunction.svelte generated by Svelte v3.41.0 */


function add_css$a(target) {
  append_styles(target, "svelte-1mppqmp", ".move.svelte-1mppqmp{display:flex;flex-direction:row;cursor:pointer;margin-left:10px;color:#666}.move.svelte-1mppqmp:hover{color:#333}.move.active.svelte-1mppqmp{color:#111;font-weight:bold}.arg-field.svelte-1mppqmp{outline:none;font-family:monospace}");
}

function create_fragment$h(ctx) {
  let div;
  let span0;
  let t0;
  let t1;
  let span1;
  let t3;
  let span2;
  let t4;
  let span3;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      span0 = element("span");
      t0 = text(
      /*name*/
      ctx[2]);
      t1 = space();
      span1 = element("span");
      span1.textContent = "(";
      t3 = space();
      span2 = element("span");
      t4 = space();
      span3 = element("span");
      span3.textContent = ")";
      attr(span2, "class", "arg-field svelte-1mppqmp");
      attr(span2, "contenteditable", "");
      attr(div, "class", "move svelte-1mppqmp");
      toggle_class(div, "active",
      /*active*/
      ctx[3]);
    },

    m(target, anchor) {
      insert(target, div, anchor);
      append(div, span0);
      append(span0, t0);
      append(div, t1);
      append(div, span1);
      append(div, t3);
      append(div, span2);
      /*span2_binding*/

      ctx[6](span2);
      append(div, t4);
      append(div, span3);

      if (!mounted) {
        dispose = [listen(span2, "focus", function () {
          if (is_function(
          /*Activate*/
          ctx[0]))
            /*Activate*/
            ctx[0].apply(this, arguments);
        }), listen(span2, "blur", function () {
          if (is_function(
          /*Deactivate*/
          ctx[1]))
            /*Deactivate*/
            ctx[1].apply(this, arguments);
        }), listen(span2, "keypress", stop_propagation(keypress_handler)), listen(span2, "keydown",
        /*OnKeyDown*/
        ctx[5]), listen(div, "click", function () {
          if (is_function(
          /*Activate*/
          ctx[0]))
            /*Activate*/
            ctx[0].apply(this, arguments);
        })];
        mounted = true;
      }
    },

    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      if (dirty &
      /*name*/
      4) set_data(t0,
      /*name*/
      ctx[2]);

      if (dirty &
      /*active*/
      8) {
        toggle_class(div, "active",
        /*active*/
        ctx[3]);
      }
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(div);
      /*span2_binding*/

      ctx[6](null);
      mounted = false;
      run_all(dispose);
    }

  };
}

const keypress_handler = () => {};

function instance$h($$self, $$props, $$invalidate) {
  let {
    Activate
  } = $$props;
  let {
    Deactivate
  } = $$props;
  let {
    name
  } = $$props;
  let {
    active
  } = $$props;
  let span;
  const dispatch = createEventDispatcher();

  function Submit() {
    try {
      const value = span.innerText;
      let argArray = new Function("return [".concat(value, "]"))();
      dispatch('submit', argArray);
    } catch (error) {
      dispatch('error', error);
    }

    $$invalidate(4, span.innerText = '', span);
  }

  function OnKeyDown(e) {
    if (e.key == 'Enter') {
      e.preventDefault();
      Submit();
    }

    if (e.key == 'Escape') {
      e.preventDefault();
      Deactivate();
    }
  }

  afterUpdate(() => {
    if (active) {
      span.focus();
    } else {
      span.blur();
    }
  });

  function span2_binding($$value) {
    binding_callbacks[$$value ? 'unshift' : 'push'](() => {
      span = $$value;
      $$invalidate(4, span);
    });
  }

  $$self.$$set = $$props => {
    if ('Activate' in $$props) $$invalidate(0, Activate = $$props.Activate);
    if ('Deactivate' in $$props) $$invalidate(1, Deactivate = $$props.Deactivate);
    if ('name' in $$props) $$invalidate(2, name = $$props.name);
    if ('active' in $$props) $$invalidate(3, active = $$props.active);
  };

  return [Activate, Deactivate, name, active, span, OnKeyDown, span2_binding];
}

class InteractiveFunction extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$h, create_fragment$h, safe_not_equal, {
      Activate: 0,
      Deactivate: 1,
      name: 2,
      active: 3
    }, add_css$a);
  }

}
/* src/client/debug/main/Move.svelte generated by Svelte v3.41.0 */


function add_css$b(target) {
  append_styles(target, "svelte-smqssc", ".move-error.svelte-smqssc{color:#a00;font-weight:bold}.wrapper.svelte-smqssc{display:flex;flex-direction:row;align-items:center}");
} // (65:2) {#if error}


function create_if_block$6(ctx) {
  let span;
  let t;
  return {
    c() {
      span = element("span");
      t = text(
      /*error*/
      ctx[2]);
      attr(span, "class", "move-error svelte-smqssc");
    },

    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t);
    },

    p(ctx, dirty) {
      if (dirty &
      /*error*/
      4) set_data(t,
      /*error*/
      ctx[2]);
    },

    d(detaching) {
      if (detaching) detach(span);
    }

  };
}

function create_fragment$i(ctx) {
  let div1;
  let div0;
  let hotkey;
  let t0;
  let interactivefunction;
  let t1;
  let current;
  hotkey = new Hotkey({
    props: {
      value:
      /*shortcut*/
      ctx[0],
      onPress:
      /*Activate*/
      ctx[4]
    }
  });
  interactivefunction = new InteractiveFunction({
    props: {
      Activate:
      /*Activate*/
      ctx[4],
      Deactivate:
      /*Deactivate*/
      ctx[5],
      name:
      /*name*/
      ctx[1],
      active:
      /*active*/
      ctx[3]
    }
  });
  interactivefunction.$on("submit",
  /*Submit*/
  ctx[6]);
  interactivefunction.$on("error",
  /*Error*/
  ctx[7]);
  let if_block =
  /*error*/
  ctx[2] && create_if_block$6(ctx);
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      create_component(hotkey.$$.fragment);
      t0 = space();
      create_component(interactivefunction.$$.fragment);
      t1 = space();
      if (if_block) if_block.c();
      attr(div0, "class", "wrapper svelte-smqssc");
    },

    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      mount_component(hotkey, div0, null);
      append(div0, t0);
      mount_component(interactivefunction, div0, null);
      append(div1, t1);
      if (if_block) if_block.m(div1, null);
      current = true;
    },

    p(ctx, [dirty]) {
      const hotkey_changes = {};
      if (dirty &
      /*shortcut*/
      1) hotkey_changes.value =
      /*shortcut*/
      ctx[0];
      hotkey.$set(hotkey_changes);
      const interactivefunction_changes = {};
      if (dirty &
      /*name*/
      2) interactivefunction_changes.name =
      /*name*/
      ctx[1];
      if (dirty &
      /*active*/
      8) interactivefunction_changes.active =
      /*active*/
      ctx[3];
      interactivefunction.$set(interactivefunction_changes);

      if (
      /*error*/
      ctx[2]) {
        if (if_block) {
          if_block.p(ctx, dirty);
        } else {
          if_block = create_if_block$6(ctx);
          if_block.c();
          if_block.m(div1, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },

    i(local) {
      if (current) return;
      transition_in(hotkey.$$.fragment, local);
      transition_in(interactivefunction.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(hotkey.$$.fragment, local);
      transition_out(interactivefunction.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(div1);
      destroy_component(hotkey);
      destroy_component(interactivefunction);
      if (if_block) if_block.d();
    }

  };
}

function instance$i($$self, $$props, $$invalidate) {
  let {
    shortcut
  } = $$props;
  let {
    name
  } = $$props;
  let {
    fn
  } = $$props;
  const {
    disableHotkeys
  } = getContext('hotkeys');
  let error$1 = '';
  let active = false;

  function Activate() {
    disableHotkeys.set(true);
    $$invalidate(3, active = true);
  }

  function Deactivate() {
    disableHotkeys.set(false);
    $$invalidate(2, error$1 = '');
    $$invalidate(3, active = false);
  }

  function Submit(e) {
    $$invalidate(2, error$1 = '');
    Deactivate();
    fn.apply(this, e.detail);
  }

  function Error(e) {
    $$invalidate(2, error$1 = e.detail);
    (0, _turnOrder406c.e)(e.detail);
  }

  $$self.$$set = $$props => {
    if ('shortcut' in $$props) $$invalidate(0, shortcut = $$props.shortcut);
    if ('name' in $$props) $$invalidate(1, name = $$props.name);
    if ('fn' in $$props) $$invalidate(8, fn = $$props.fn);
  };

  return [shortcut, name, error$1, active, Activate, Deactivate, Submit, Error, fn];
}

class Move extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$i, create_fragment$i, safe_not_equal, {
      shortcut: 0,
      name: 1,
      fn: 8
    }, add_css$b);
  }

}
/* src/client/debug/main/Controls.svelte generated by Svelte v3.41.0 */


function add_css$c(target) {
  append_styles(target, "svelte-c3lavh", "ul.svelte-c3lavh{padding-left:0}li.svelte-c3lavh{list-style:none;margin:none;margin-bottom:5px}");
}

function create_fragment$j(ctx) {
  let ul;
  let li0;
  let hotkey0;
  let t0;
  let li1;
  let hotkey1;
  let t1;
  let li2;
  let hotkey2;
  let t2;
  let li3;
  let hotkey3;
  let current;
  hotkey0 = new Hotkey({
    props: {
      value: "1",
      onPress:
      /*client*/
      ctx[0].reset,
      label: "reset"
    }
  });
  hotkey1 = new Hotkey({
    props: {
      value: "2",
      onPress:
      /*Save*/
      ctx[2],
      label: "save"
    }
  });
  hotkey2 = new Hotkey({
    props: {
      value: "3",
      onPress:
      /*Restore*/
      ctx[3],
      label: "restore"
    }
  });
  hotkey3 = new Hotkey({
    props: {
      value: ".",
      onPress:
      /*ToggleVisibility*/
      ctx[1],
      label: "hide"
    }
  });
  return {
    c() {
      ul = element("ul");
      li0 = element("li");
      create_component(hotkey0.$$.fragment);
      t0 = space();
      li1 = element("li");
      create_component(hotkey1.$$.fragment);
      t1 = space();
      li2 = element("li");
      create_component(hotkey2.$$.fragment);
      t2 = space();
      li3 = element("li");
      create_component(hotkey3.$$.fragment);
      attr(li0, "class", "svelte-c3lavh");
      attr(li1, "class", "svelte-c3lavh");
      attr(li2, "class", "svelte-c3lavh");
      attr(li3, "class", "svelte-c3lavh");
      attr(ul, "id", "debug-controls");
      attr(ul, "class", "controls svelte-c3lavh");
    },

    m(target, anchor) {
      insert(target, ul, anchor);
      append(ul, li0);
      mount_component(hotkey0, li0, null);
      append(ul, t0);
      append(ul, li1);
      mount_component(hotkey1, li1, null);
      append(ul, t1);
      append(ul, li2);
      mount_component(hotkey2, li2, null);
      append(ul, t2);
      append(ul, li3);
      mount_component(hotkey3, li3, null);
      current = true;
    },

    p(ctx, [dirty]) {
      const hotkey0_changes = {};
      if (dirty &
      /*client*/
      1) hotkey0_changes.onPress =
      /*client*/
      ctx[0].reset;
      hotkey0.$set(hotkey0_changes);
      const hotkey3_changes = {};
      if (dirty &
      /*ToggleVisibility*/
      2) hotkey3_changes.onPress =
      /*ToggleVisibility*/
      ctx[1];
      hotkey3.$set(hotkey3_changes);
    },

    i(local) {
      if (current) return;
      transition_in(hotkey0.$$.fragment, local);
      transition_in(hotkey1.$$.fragment, local);
      transition_in(hotkey2.$$.fragment, local);
      transition_in(hotkey3.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(hotkey0.$$.fragment, local);
      transition_out(hotkey1.$$.fragment, local);
      transition_out(hotkey2.$$.fragment, local);
      transition_out(hotkey3.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(ul);
      destroy_component(hotkey0);
      destroy_component(hotkey1);
      destroy_component(hotkey2);
      destroy_component(hotkey3);
    }

  };
}

function instance$j($$self, $$props, $$invalidate) {
  let {
    client
  } = $$props;
  let {
    ToggleVisibility
  } = $$props;

  function Save() {
    // get state to persist and overwrite deltalog, _undo, and _redo
    const state = client.getState();
    const json = (0, _flatted.stringify)({ ...state,
      _undo: [],
      _redo: [],
      deltalog: []
    });
    window.localStorage.setItem('gamestate', json);
    window.localStorage.setItem('initialState', (0, _flatted.stringify)(client.initialState));
  }

  function Restore() {
    const gamestateJSON = window.localStorage.getItem('gamestate');
    const initialStateJSON = window.localStorage.getItem('initialState');

    if (gamestateJSON !== null && initialStateJSON !== null) {
      const gamestate = (0, _flatted.parse)(gamestateJSON);
      const initialState = (0, _flatted.parse)(initialStateJSON);
      client.store.dispatch((0, _turnOrder406c.s)({
        state: gamestate,
        initialState
      }));
    }
  }

  $$self.$$set = $$props => {
    if ('client' in $$props) $$invalidate(0, client = $$props.client);
    if ('ToggleVisibility' in $$props) $$invalidate(1, ToggleVisibility = $$props.ToggleVisibility);
  };

  return [client, ToggleVisibility, Save, Restore];
}

class Controls extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$j, create_fragment$j, safe_not_equal, {
      client: 0,
      ToggleVisibility: 1
    }, add_css$c);
  }

}
/* src/client/debug/main/PlayerInfo.svelte generated by Svelte v3.41.0 */


function add_css$d(target) {
  append_styles(target, "svelte-19aan9p", ".player-box.svelte-19aan9p{display:flex;flex-direction:row}.player.svelte-19aan9p{cursor:pointer;text-align:center;width:30px;height:30px;line-height:30px;background:#eee;border:3px solid #fefefe;box-sizing:content-box;padding:0}.player.current.svelte-19aan9p{background:#555;color:#eee;font-weight:bold}.player.active.svelte-19aan9p{border:3px solid #ff7f50}");
}

function get_each_context$4(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  return child_ctx;
} // (59:2) {#each players as player}


function create_each_block$4(ctx) {
  let button;
  let t0_value =
  /*player*/
  ctx[7] + "";
  let t0;
  let t1;
  let button_aria_label_value;
  let mounted;
  let dispose;

  function click_handler() {
    return (
      /*click_handler*/
      ctx[5](
      /*player*/
      ctx[7])
    );
  }

  return {
    c() {
      button = element("button");
      t0 = text(t0_value);
      t1 = space();
      attr(button, "class", "player svelte-19aan9p");
      attr(button, "aria-label", button_aria_label_value =
      /*playerLabel*/
      ctx[4](
      /*player*/
      ctx[7]));
      toggle_class(button, "current",
      /*player*/
      ctx[7] ==
      /*ctx*/
      ctx[0].currentPlayer);
      toggle_class(button, "active",
      /*player*/
      ctx[7] ==
      /*playerID*/
      ctx[1]);
    },

    m(target, anchor) {
      insert(target, button, anchor);
      append(button, t0);
      append(button, t1);

      if (!mounted) {
        dispose = listen(button, "click", click_handler);
        mounted = true;
      }
    },

    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty &
      /*players*/
      4 && t0_value !== (t0_value =
      /*player*/
      ctx[7] + "")) set_data(t0, t0_value);

      if (dirty &
      /*players*/
      4 && button_aria_label_value !== (button_aria_label_value =
      /*playerLabel*/
      ctx[4](
      /*player*/
      ctx[7]))) {
        attr(button, "aria-label", button_aria_label_value);
      }

      if (dirty &
      /*players, ctx*/
      5) {
        toggle_class(button, "current",
        /*player*/
        ctx[7] ==
        /*ctx*/
        ctx[0].currentPlayer);
      }

      if (dirty &
      /*players, playerID*/
      6) {
        toggle_class(button, "active",
        /*player*/
        ctx[7] ==
        /*playerID*/
        ctx[1]);
      }
    },

    d(detaching) {
      if (detaching) detach(button);
      mounted = false;
      dispose();
    }

  };
}

function create_fragment$k(ctx) {
  let div;
  let each_value =
  /*players*/
  ctx[2];
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
  }

  return {
    c() {
      div = element("div");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      attr(div, "class", "player-box svelte-19aan9p");
    },

    m(target, anchor) {
      insert(target, div, anchor);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*playerLabel, players, ctx, playerID, OnClick*/
      31) {
        each_value =
        /*players*/
        ctx[2];
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$4(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$4(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div, null);
          }
        }

        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(div);
      destroy_each(each_blocks, detaching);
    }

  };
}

function instance$k($$self, $$props, $$invalidate) {
  let {
    ctx
  } = $$props;
  let {
    playerID
  } = $$props;
  const dispatch = createEventDispatcher();

  function OnClick(player) {
    if (player == playerID) {
      dispatch("change", {
        playerID: null
      });
    } else {
      dispatch("change", {
        playerID: player
      });
    }
  }

  function playerLabel(player) {
    const properties = [];
    if (player == ctx.currentPlayer) properties.push('current');
    if (player == playerID) properties.push('active');
    let label = "Player ".concat(player);
    if (properties.length) label += " (".concat(properties.join(', '), ")");
    return label;
  }

  let players;

  const click_handler = player => OnClick(player);

  $$self.$$set = $$props => {
    if ('ctx' in $$props) $$invalidate(0, ctx = $$props.ctx);
    if ('playerID' in $$props) $$invalidate(1, playerID = $$props.playerID);
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*ctx*/
    1) {
      $$invalidate(2, players = ctx ? [...Array(ctx.numPlayers).keys()].map(i => i.toString()) : []);
    }
  };

  return [ctx, playerID, players, OnClick, playerLabel, click_handler];
}

class PlayerInfo extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$k, create_fragment$k, safe_not_equal, {
      ctx: 0,
      playerID: 1
    }, add_css$d);
  }

}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */


function AssignShortcuts(moveNames, blacklist) {
  var shortcuts = {};
  var taken = {};

  var _iterator = _createForOfIteratorHelper(blacklist),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var c = _step.value;
      taken[c] = true;
    } // Try assigning the first char of each move as the shortcut.

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var t = taken;
  var canUseFirstChar = true;

  for (var name in moveNames) {
    var shortcut = name[0];

    if (t[shortcut]) {
      canUseFirstChar = false;
      break;
    }

    t[shortcut] = true;
    shortcuts[name] = shortcut;
  }

  if (canUseFirstChar) {
    return shortcuts;
  } // If those aren't unique, use a-z.


  t = taken;
  var next = 97;
  shortcuts = {};

  for (var _name in moveNames) {
    var _shortcut = String.fromCharCode(next);

    while (t[_shortcut]) {
      next++;
      _shortcut = String.fromCharCode(next);
    }

    t[_shortcut] = true;
    shortcuts[_name] = _shortcut;
  }

  return shortcuts;
}
/* src/client/debug/main/Main.svelte generated by Svelte v3.41.0 */


function add_css$e(target) {
  append_styles(target, "svelte-146sq5f", ".tree.svelte-146sq5f{--json-tree-font-family:monospace;--json-tree-font-size:14px;--json-tree-null-color:#757575}.label.svelte-146sq5f{margin-bottom:0;text-transform:none}h3.svelte-146sq5f{text-transform:uppercase}ul.svelte-146sq5f{padding-left:0}li.svelte-146sq5f{list-style:none;margin:0;margin-bottom:5px}");
}

function get_each_context$5(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[10] = list[i][0];
  child_ctx[11] = list[i][1];
  return child_ctx;
} // (78:4) {#each Object.entries(moves) as [name, fn]}


function create_each_block$5(ctx) {
  let li;
  let move;
  let t;
  let current;
  move = new Move({
    props: {
      shortcut:
      /*shortcuts*/
      ctx[8][
      /*name*/
      ctx[10]],
      fn:
      /*fn*/
      ctx[11],
      name:
      /*name*/
      ctx[10]
    }
  });
  return {
    c() {
      li = element("li");
      create_component(move.$$.fragment);
      t = space();
      attr(li, "class", "svelte-146sq5f");
    },

    m(target, anchor) {
      insert(target, li, anchor);
      mount_component(move, li, null);
      append(li, t);
      current = true;
    },

    p(ctx, dirty) {
      const move_changes = {};
      if (dirty &
      /*moves*/
      16) move_changes.shortcut =
      /*shortcuts*/
      ctx[8][
      /*name*/
      ctx[10]];
      if (dirty &
      /*moves*/
      16) move_changes.fn =
      /*fn*/
      ctx[11];
      if (dirty &
      /*moves*/
      16) move_changes.name =
      /*name*/
      ctx[10];
      move.$set(move_changes);
    },

    i(local) {
      if (current) return;
      transition_in(move.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(move.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(li);
      destroy_component(move);
    }

  };
} // (90:2) {#if ctx.activePlayers && events.endStage}


function create_if_block_2$2(ctx) {
  let li;
  let move;
  let current;
  move = new Move({
    props: {
      name: "endStage",
      shortcut: 7,
      fn:
      /*events*/
      ctx[5].endStage
    }
  });
  return {
    c() {
      li = element("li");
      create_component(move.$$.fragment);
      attr(li, "class", "svelte-146sq5f");
    },

    m(target, anchor) {
      insert(target, li, anchor);
      mount_component(move, li, null);
      current = true;
    },

    p(ctx, dirty) {
      const move_changes = {};
      if (dirty &
      /*events*/
      32) move_changes.fn =
      /*events*/
      ctx[5].endStage;
      move.$set(move_changes);
    },

    i(local) {
      if (current) return;
      transition_in(move.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(move.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(li);
      destroy_component(move);
    }

  };
} // (95:2) {#if events.endTurn}


function create_if_block_1$2(ctx) {
  let li;
  let move;
  let current;
  move = new Move({
    props: {
      name: "endTurn",
      shortcut: 8,
      fn:
      /*events*/
      ctx[5].endTurn
    }
  });
  return {
    c() {
      li = element("li");
      create_component(move.$$.fragment);
      attr(li, "class", "svelte-146sq5f");
    },

    m(target, anchor) {
      insert(target, li, anchor);
      mount_component(move, li, null);
      current = true;
    },

    p(ctx, dirty) {
      const move_changes = {};
      if (dirty &
      /*events*/
      32) move_changes.fn =
      /*events*/
      ctx[5].endTurn;
      move.$set(move_changes);
    },

    i(local) {
      if (current) return;
      transition_in(move.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(move.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(li);
      destroy_component(move);
    }

  };
} // (100:2) {#if ctx.phase && events.endPhase}


function create_if_block$7(ctx) {
  let li;
  let move;
  let current;
  move = new Move({
    props: {
      name: "endPhase",
      shortcut: 9,
      fn:
      /*events*/
      ctx[5].endPhase
    }
  });
  return {
    c() {
      li = element("li");
      create_component(move.$$.fragment);
      attr(li, "class", "svelte-146sq5f");
    },

    m(target, anchor) {
      insert(target, li, anchor);
      mount_component(move, li, null);
      current = true;
    },

    p(ctx, dirty) {
      const move_changes = {};
      if (dirty &
      /*events*/
      32) move_changes.fn =
      /*events*/
      ctx[5].endPhase;
      move.$set(move_changes);
    },

    i(local) {
      if (current) return;
      transition_in(move.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(move.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(li);
      destroy_component(move);
    }

  };
}

function create_fragment$l(ctx) {
  let section0;
  let h30;
  let t1;
  let controls;
  let t2;
  let section1;
  let h31;
  let t4;
  let playerinfo;
  let t5;
  let section2;
  let h32;
  let t7;
  let ul0;
  let t8;
  let section3;
  let h33;
  let t10;
  let ul1;
  let t11;
  let t12;
  let t13;
  let section4;
  let h34;
  let t15;
  let jsontree0;
  let t16;
  let section5;
  let h35;
  let t18;
  let jsontree1;
  let t19;
  let clientswitcher;
  let current;
  controls = new Controls({
    props: {
      client:
      /*client*/
      ctx[0],
      ToggleVisibility:
      /*ToggleVisibility*/
      ctx[2]
    }
  });
  playerinfo = new PlayerInfo({
    props: {
      ctx:
      /*ctx*/
      ctx[6],
      playerID:
      /*playerID*/
      ctx[3]
    }
  });
  playerinfo.$on("change",
  /*change_handler*/
  ctx[9]);
  let each_value = Object.entries(
  /*moves*/
  ctx[4]);
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
  }

  const out = i => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });

  let if_block0 =
  /*ctx*/
  ctx[6].activePlayers &&
  /*events*/
  ctx[5].endStage && create_if_block_2$2(ctx);
  let if_block1 =
  /*events*/
  ctx[5].endTurn && create_if_block_1$2(ctx);
  let if_block2 =
  /*ctx*/
  ctx[6].phase &&
  /*events*/
  ctx[5].endPhase && create_if_block$7(ctx);
  jsontree0 = new Root({
    props: {
      value:
      /*G*/
      ctx[7]
    }
  });
  jsontree1 = new Root({
    props: {
      value: SanitizeCtx(
      /*ctx*/
      ctx[6])
    }
  });
  clientswitcher = new ClientSwitcher({
    props: {
      clientManager:
      /*clientManager*/
      ctx[1]
    }
  });
  return {
    c() {
      section0 = element("section");
      h30 = element("h3");
      h30.textContent = "Controls";
      t1 = space();
      create_component(controls.$$.fragment);
      t2 = space();
      section1 = element("section");
      h31 = element("h3");
      h31.textContent = "Players";
      t4 = space();
      create_component(playerinfo.$$.fragment);
      t5 = space();
      section2 = element("section");
      h32 = element("h3");
      h32.textContent = "Moves";
      t7 = space();
      ul0 = element("ul");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      t8 = space();
      section3 = element("section");
      h33 = element("h3");
      h33.textContent = "Events";
      t10 = space();
      ul1 = element("ul");
      if (if_block0) if_block0.c();
      t11 = space();
      if (if_block1) if_block1.c();
      t12 = space();
      if (if_block2) if_block2.c();
      t13 = space();
      section4 = element("section");
      h34 = element("h3");
      h34.textContent = "G";
      t15 = space();
      create_component(jsontree0.$$.fragment);
      t16 = space();
      section5 = element("section");
      h35 = element("h3");
      h35.textContent = "ctx";
      t18 = space();
      create_component(jsontree1.$$.fragment);
      t19 = space();
      create_component(clientswitcher.$$.fragment);
      attr(h30, "class", "svelte-146sq5f");
      attr(h31, "class", "svelte-146sq5f");
      attr(h32, "class", "svelte-146sq5f");
      attr(ul0, "class", "svelte-146sq5f");
      attr(h33, "class", "svelte-146sq5f");
      attr(ul1, "class", "svelte-146sq5f");
      attr(h34, "class", "label svelte-146sq5f");
      attr(section4, "class", "tree svelte-146sq5f");
      attr(h35, "class", "label svelte-146sq5f");
      attr(section5, "class", "tree svelte-146sq5f");
    },

    m(target, anchor) {
      insert(target, section0, anchor);
      append(section0, h30);
      append(section0, t1);
      mount_component(controls, section0, null);
      insert(target, t2, anchor);
      insert(target, section1, anchor);
      append(section1, h31);
      append(section1, t4);
      mount_component(playerinfo, section1, null);
      insert(target, t5, anchor);
      insert(target, section2, anchor);
      append(section2, h32);
      append(section2, t7);
      append(section2, ul0);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(ul0, null);
      }

      insert(target, t8, anchor);
      insert(target, section3, anchor);
      append(section3, h33);
      append(section3, t10);
      append(section3, ul1);
      if (if_block0) if_block0.m(ul1, null);
      append(ul1, t11);
      if (if_block1) if_block1.m(ul1, null);
      append(ul1, t12);
      if (if_block2) if_block2.m(ul1, null);
      insert(target, t13, anchor);
      insert(target, section4, anchor);
      append(section4, h34);
      append(section4, t15);
      mount_component(jsontree0, section4, null);
      insert(target, t16, anchor);
      insert(target, section5, anchor);
      append(section5, h35);
      append(section5, t18);
      mount_component(jsontree1, section5, null);
      insert(target, t19, anchor);
      mount_component(clientswitcher, target, anchor);
      current = true;
    },

    p(ctx, [dirty]) {
      const controls_changes = {};
      if (dirty &
      /*client*/
      1) controls_changes.client =
      /*client*/
      ctx[0];
      if (dirty &
      /*ToggleVisibility*/
      4) controls_changes.ToggleVisibility =
      /*ToggleVisibility*/
      ctx[2];
      controls.$set(controls_changes);
      const playerinfo_changes = {};
      if (dirty &
      /*ctx*/
      64) playerinfo_changes.ctx =
      /*ctx*/
      ctx[6];
      if (dirty &
      /*playerID*/
      8) playerinfo_changes.playerID =
      /*playerID*/
      ctx[3];
      playerinfo.$set(playerinfo_changes);

      if (dirty &
      /*shortcuts, Object, moves*/
      272) {
        each_value = Object.entries(
        /*moves*/
        ctx[4]);
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$5(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$5(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(ul0, null);
          }
        }

        group_outros();

        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }

        check_outros();
      }

      if (
      /*ctx*/
      ctx[6].activePlayers &&
      /*events*/
      ctx[5].endStage) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*ctx, events*/
          96) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_2$2(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(ul1, t11);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }

      if (
      /*events*/
      ctx[5].endTurn) {
        if (if_block1) {
          if_block1.p(ctx, dirty);

          if (dirty &
          /*events*/
          32) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1$2(ctx);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(ul1, t12);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }

      if (
      /*ctx*/
      ctx[6].phase &&
      /*events*/
      ctx[5].endPhase) {
        if (if_block2) {
          if_block2.p(ctx, dirty);

          if (dirty &
          /*ctx, events*/
          96) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block$7(ctx);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(ul1, null);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }

      const jsontree0_changes = {};
      if (dirty &
      /*G*/
      128) jsontree0_changes.value =
      /*G*/
      ctx[7];
      jsontree0.$set(jsontree0_changes);
      const jsontree1_changes = {};
      if (dirty &
      /*ctx*/
      64) jsontree1_changes.value = SanitizeCtx(
      /*ctx*/
      ctx[6]);
      jsontree1.$set(jsontree1_changes);
      const clientswitcher_changes = {};
      if (dirty &
      /*clientManager*/
      2) clientswitcher_changes.clientManager =
      /*clientManager*/
      ctx[1];
      clientswitcher.$set(clientswitcher_changes);
    },

    i(local) {
      if (current) return;
      transition_in(controls.$$.fragment, local);
      transition_in(playerinfo.$$.fragment, local);

      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }

      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      transition_in(jsontree0.$$.fragment, local);
      transition_in(jsontree1.$$.fragment, local);
      transition_in(clientswitcher.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(controls.$$.fragment, local);
      transition_out(playerinfo.$$.fragment, local);
      each_blocks = each_blocks.filter(Boolean);

      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }

      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      transition_out(jsontree0.$$.fragment, local);
      transition_out(jsontree1.$$.fragment, local);
      transition_out(clientswitcher.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(section0);
      destroy_component(controls);
      if (detaching) detach(t2);
      if (detaching) detach(section1);
      destroy_component(playerinfo);
      if (detaching) detach(t5);
      if (detaching) detach(section2);
      destroy_each(each_blocks, detaching);
      if (detaching) detach(t8);
      if (detaching) detach(section3);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      if (detaching) detach(t13);
      if (detaching) detach(section4);
      destroy_component(jsontree0);
      if (detaching) detach(t16);
      if (detaching) detach(section5);
      destroy_component(jsontree1);
      if (detaching) detach(t19);
      destroy_component(clientswitcher, detaching);
    }

  };
}

function SanitizeCtx(ctx) {
  let r = {};

  for (const key in ctx) {
    if (!key.startsWith('_')) {
      r[key] = ctx[key];
    }
  }

  return r;
}

function instance$l($$self, $$props, $$invalidate) {
  let {
    client
  } = $$props;
  let {
    clientManager
  } = $$props;
  let {
    ToggleVisibility
  } = $$props;
  const shortcuts = AssignShortcuts(client.moves, 'mlia');
  let {
    playerID,
    moves,
    events
  } = client;
  let ctx = {};
  let G = {};
  client.subscribe(state => {
    if (state) $$invalidate(7, ({
      G,
      ctx
    } = state), G, $$invalidate(6, ctx));
    $$invalidate(3, ({
      playerID,
      moves,
      events
    } = client), playerID, $$invalidate(4, moves), $$invalidate(5, events));
  });

  const change_handler = e => clientManager.switchPlayerID(e.detail.playerID);

  $$self.$$set = $$props => {
    if ('client' in $$props) $$invalidate(0, client = $$props.client);
    if ('clientManager' in $$props) $$invalidate(1, clientManager = $$props.clientManager);
    if ('ToggleVisibility' in $$props) $$invalidate(2, ToggleVisibility = $$props.ToggleVisibility);
  };

  return [client, clientManager, ToggleVisibility, playerID, moves, events, ctx, G, shortcuts, change_handler];
}

class Main extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$l, create_fragment$l, safe_not_equal, {
      client: 0,
      clientManager: 1,
      ToggleVisibility: 2
    }, add_css$e);
  }

}
/* src/client/debug/info/Item.svelte generated by Svelte v3.41.0 */


function add_css$f(target) {
  append_styles(target, "svelte-13qih23", ".item.svelte-13qih23.svelte-13qih23{padding:10px}.item.svelte-13qih23.svelte-13qih23:not(:first-child){border-top:1px dashed #aaa}.item.svelte-13qih23 div.svelte-13qih23{float:right;text-align:right}");
}

function create_fragment$m(ctx) {
  let div1;
  let strong;
  let t0;
  let t1;
  let div0;
  let t2_value = JSON.stringify(
  /*value*/
  ctx[1]) + "";
  let t2;
  return {
    c() {
      div1 = element("div");
      strong = element("strong");
      t0 = text(
      /*name*/
      ctx[0]);
      t1 = space();
      div0 = element("div");
      t2 = text(t2_value);
      attr(div0, "class", "svelte-13qih23");
      attr(div1, "class", "item svelte-13qih23");
    },

    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, strong);
      append(strong, t0);
      append(div1, t1);
      append(div1, div0);
      append(div0, t2);
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*name*/
      1) set_data(t0,
      /*name*/
      ctx[0]);
      if (dirty &
      /*value*/
      2 && t2_value !== (t2_value = JSON.stringify(
      /*value*/
      ctx[1]) + "")) set_data(t2, t2_value);
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(div1);
    }

  };
}

function instance$m($$self, $$props, $$invalidate) {
  let {
    name
  } = $$props;
  let {
    value
  } = $$props;

  $$self.$$set = $$props => {
    if ('name' in $$props) $$invalidate(0, name = $$props.name);
    if ('value' in $$props) $$invalidate(1, value = $$props.value);
  };

  return [name, value];
}

class Item extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$m, create_fragment$m, safe_not_equal, {
      name: 0,
      value: 1
    }, add_css$f);
  }

}
/* src/client/debug/info/Info.svelte generated by Svelte v3.41.0 */


function add_css$g(target) {
  append_styles(target, "svelte-1yzq5o8", ".gameinfo.svelte-1yzq5o8{padding:10px}");
} // (19:2) {#if client.multiplayer}


function create_if_block$8(ctx) {
  let item;
  let current;
  item = new Item({
    props: {
      name: "isConnected",
      value:
      /*$client*/
      ctx[1].isConnected
    }
  });
  return {
    c() {
      create_component(item.$$.fragment);
    },

    m(target, anchor) {
      mount_component(item, target, anchor);
      current = true;
    },

    p(ctx, dirty) {
      const item_changes = {};
      if (dirty &
      /*$client*/
      2) item_changes.value =
      /*$client*/
      ctx[1].isConnected;
      item.$set(item_changes);
    },

    i(local) {
      if (current) return;
      transition_in(item.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(item.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(item, detaching);
    }

  };
}

function create_fragment$n(ctx) {
  let section;
  let item0;
  let t0;
  let item1;
  let t1;
  let item2;
  let t2;
  let current;
  item0 = new Item({
    props: {
      name: "matchID",
      value:
      /*client*/
      ctx[0].matchID
    }
  });
  item1 = new Item({
    props: {
      name: "playerID",
      value:
      /*client*/
      ctx[0].playerID
    }
  });
  item2 = new Item({
    props: {
      name: "isActive",
      value:
      /*$client*/
      ctx[1].isActive
    }
  });
  let if_block =
  /*client*/
  ctx[0].multiplayer && create_if_block$8(ctx);
  return {
    c() {
      section = element("section");
      create_component(item0.$$.fragment);
      t0 = space();
      create_component(item1.$$.fragment);
      t1 = space();
      create_component(item2.$$.fragment);
      t2 = space();
      if (if_block) if_block.c();
      attr(section, "class", "gameinfo svelte-1yzq5o8");
    },

    m(target, anchor) {
      insert(target, section, anchor);
      mount_component(item0, section, null);
      append(section, t0);
      mount_component(item1, section, null);
      append(section, t1);
      mount_component(item2, section, null);
      append(section, t2);
      if (if_block) if_block.m(section, null);
      current = true;
    },

    p(ctx, [dirty]) {
      const item0_changes = {};
      if (dirty &
      /*client*/
      1) item0_changes.value =
      /*client*/
      ctx[0].matchID;
      item0.$set(item0_changes);
      const item1_changes = {};
      if (dirty &
      /*client*/
      1) item1_changes.value =
      /*client*/
      ctx[0].playerID;
      item1.$set(item1_changes);
      const item2_changes = {};
      if (dirty &
      /*$client*/
      2) item2_changes.value =
      /*$client*/
      ctx[1].isActive;
      item2.$set(item2_changes);

      if (
      /*client*/
      ctx[0].multiplayer) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*client*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$8(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(section, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },

    i(local) {
      if (current) return;
      transition_in(item0.$$.fragment, local);
      transition_in(item1.$$.fragment, local);
      transition_in(item2.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },

    o(local) {
      transition_out(item0.$$.fragment, local);
      transition_out(item1.$$.fragment, local);
      transition_out(item2.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(section);
      destroy_component(item0);
      destroy_component(item1);
      destroy_component(item2);
      if (if_block) if_block.d();
    }

  };
}

function instance$n($$self, $$props, $$invalidate) {
  let $client,
      $$unsubscribe_client = noop,
      $$subscribe_client = () => ($$unsubscribe_client(), $$unsubscribe_client = subscribe(client, $$value => $$invalidate(1, $client = $$value)), client);

  $$self.$$.on_destroy.push(() => $$unsubscribe_client());
  let {
    client
  } = $$props;
  $$subscribe_client();
  let {
    clientManager
  } = $$props;
  let {
    ToggleVisibility
  } = $$props;

  $$self.$$set = $$props => {
    if ('client' in $$props) $$subscribe_client($$invalidate(0, client = $$props.client));
    if ('clientManager' in $$props) $$invalidate(2, clientManager = $$props.clientManager);
    if ('ToggleVisibility' in $$props) $$invalidate(3, ToggleVisibility = $$props.ToggleVisibility);
  };

  return [client, $client, clientManager, ToggleVisibility];
}

class Info extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$n, create_fragment$n, safe_not_equal, {
      client: 0,
      clientManager: 2,
      ToggleVisibility: 3
    }, add_css$g);
  }

}
/* src/client/debug/log/TurnMarker.svelte generated by Svelte v3.41.0 */


function add_css$h(target) {
  append_styles(target, "svelte-6eza86", ".turn-marker.svelte-6eza86{display:flex;justify-content:center;align-items:center;grid-column:1;background:#555;color:#eee;text-align:center;font-weight:bold;border:1px solid #888}");
}

function create_fragment$o(ctx) {
  let div;
  let t;
  return {
    c() {
      div = element("div");
      t = text(
      /*turn*/
      ctx[0]);
      attr(div, "class", "turn-marker svelte-6eza86");
      attr(div, "style",
      /*style*/
      ctx[1]);
    },

    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*turn*/
      1) set_data(t,
      /*turn*/
      ctx[0]);
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(div);
    }

  };
}

function instance$o($$self, $$props, $$invalidate) {
  let {
    turn
  } = $$props;
  let {
    numEvents
  } = $$props;
  const style = "grid-row: span ".concat(numEvents);

  $$self.$$set = $$props => {
    if ('turn' in $$props) $$invalidate(0, turn = $$props.turn);
    if ('numEvents' in $$props) $$invalidate(2, numEvents = $$props.numEvents);
  };

  return [turn, style, numEvents];
}

class TurnMarker extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$o, create_fragment$o, safe_not_equal, {
      turn: 0,
      numEvents: 2
    }, add_css$h);
  }

}
/* src/client/debug/log/PhaseMarker.svelte generated by Svelte v3.41.0 */


function add_css$i(target) {
  append_styles(target, "svelte-1t4xap", ".phase-marker.svelte-1t4xap{grid-column:3;background:#555;border:1px solid #888;color:#eee;text-align:center;font-weight:bold;padding-top:10px;padding-bottom:10px;text-orientation:sideways;writing-mode:vertical-rl;line-height:30px;width:100%}");
}

function create_fragment$p(ctx) {
  let div;
  let t_value = (
  /*phase*/
  ctx[0] || '') + "";
  let t;
  return {
    c() {
      div = element("div");
      t = text(t_value);
      attr(div, "class", "phase-marker svelte-1t4xap");
      attr(div, "style",
      /*style*/
      ctx[1]);
    },

    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*phase*/
      1 && t_value !== (t_value = (
      /*phase*/
      ctx[0] || '') + "")) set_data(t, t_value);
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(div);
    }

  };
}

function instance$p($$self, $$props, $$invalidate) {
  let {
    phase
  } = $$props;
  let {
    numEvents
  } = $$props;
  const style = "grid-row: span ".concat(numEvents);

  $$self.$$set = $$props => {
    if ('phase' in $$props) $$invalidate(0, phase = $$props.phase);
    if ('numEvents' in $$props) $$invalidate(2, numEvents = $$props.numEvents);
  };

  return [phase, style, numEvents];
}

class PhaseMarker extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$p, create_fragment$p, safe_not_equal, {
      phase: 0,
      numEvents: 2
    }, add_css$i);
  }

}
/* src/client/debug/log/LogMetadata.svelte generated by Svelte v3.41.0 */


function create_fragment$q(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      div.textContent = "".concat(
      /*renderedMetadata*/
      ctx[0]);
    },

    m(target, anchor) {
      insert(target, div, anchor);
    },

    p: noop,
    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(div);
    }

  };
}

function instance$q($$self, $$props, $$invalidate) {
  let {
    metadata
  } = $$props;
  const renderedMetadata = metadata !== undefined ? JSON.stringify(metadata, null, 4) : '';

  $$self.$$set = $$props => {
    if ('metadata' in $$props) $$invalidate(1, metadata = $$props.metadata);
  };

  return [renderedMetadata, metadata];
}

class LogMetadata extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$q, create_fragment$q, safe_not_equal, {
      metadata: 1
    });
  }

}
/* src/client/debug/log/LogEvent.svelte generated by Svelte v3.41.0 */


function add_css$j(target) {
  append_styles(target, "svelte-vajd9z", ".log-event.svelte-vajd9z{grid-column:2;cursor:pointer;overflow:hidden;display:flex;flex-direction:column;justify-content:center;background:#fff;border:1px dotted #ccc;border-left:5px solid #ccc;padding:5px;text-align:center;color:#666;font-size:14px;min-height:25px;line-height:25px}.log-event.svelte-vajd9z:hover,.log-event.svelte-vajd9z:focus{border-style:solid;background:#eee}.log-event.pinned.svelte-vajd9z{border-style:solid;background:#eee;opacity:1}.args.svelte-vajd9z{text-align:left;white-space:pre-wrap}.player0.svelte-vajd9z{border-left-color:#ff851b}.player1.svelte-vajd9z{border-left-color:#7fdbff}.player2.svelte-vajd9z{border-left-color:#0074d9}.player3.svelte-vajd9z{border-left-color:#39cccc}.player4.svelte-vajd9z{border-left-color:#3d9970}.player5.svelte-vajd9z{border-left-color:#2ecc40}.player6.svelte-vajd9z{border-left-color:#01ff70}.player7.svelte-vajd9z{border-left-color:#ffdc00}.player8.svelte-vajd9z{border-left-color:#001f3f}.player9.svelte-vajd9z{border-left-color:#ff4136}.player10.svelte-vajd9z{border-left-color:#85144b}.player11.svelte-vajd9z{border-left-color:#f012be}.player12.svelte-vajd9z{border-left-color:#b10dc9}.player13.svelte-vajd9z{border-left-color:#111111}.player14.svelte-vajd9z{border-left-color:#aaaaaa}.player15.svelte-vajd9z{border-left-color:#dddddd}");
} // (146:2) {:else}


function create_else_block$1(ctx) {
  let logmetadata;
  let current;
  logmetadata = new LogMetadata({
    props: {
      metadata:
      /*metadata*/
      ctx[2]
    }
  });
  return {
    c() {
      create_component(logmetadata.$$.fragment);
    },

    m(target, anchor) {
      mount_component(logmetadata, target, anchor);
      current = true;
    },

    p(ctx, dirty) {
      const logmetadata_changes = {};
      if (dirty &
      /*metadata*/
      4) logmetadata_changes.metadata =
      /*metadata*/
      ctx[2];
      logmetadata.$set(logmetadata_changes);
    },

    i(local) {
      if (current) return;
      transition_in(logmetadata.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(logmetadata.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(logmetadata, detaching);
    }

  };
} // (144:2) {#if metadataComponent}


function create_if_block$9(ctx) {
  let switch_instance;
  let switch_instance_anchor;
  let current;
  var switch_value =
  /*metadataComponent*/
  ctx[3];

  function switch_props(ctx) {
    return {
      props: {
        metadata:
        /*metadata*/
        ctx[2]
      }
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }

  return {
    c() {
      if (switch_instance) create_component(switch_instance.$$.fragment);
      switch_instance_anchor = empty();
    },

    m(target, anchor) {
      if (switch_instance) {
        mount_component(switch_instance, target, anchor);
      }

      insert(target, switch_instance_anchor, anchor);
      current = true;
    },

    p(ctx, dirty) {
      const switch_instance_changes = {};
      if (dirty &
      /*metadata*/
      4) switch_instance_changes.metadata =
      /*metadata*/
      ctx[2];

      if (switch_value !== (switch_value =
      /*metadataComponent*/
      ctx[3])) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },

    i(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },

    o(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(switch_instance_anchor);
      if (switch_instance) destroy_component(switch_instance, detaching);
    }

  };
}

function create_fragment$r(ctx) {
  let button;
  let div;
  let t0;
  let t1;
  let t2;
  let t3;
  let t4;
  let current_block_type_index;
  let if_block;
  let button_class_value;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block$9, create_else_block$1];
  const if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*metadataComponent*/
    ctx[3]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      button = element("button");
      div = element("div");
      t0 = text(
      /*actionType*/
      ctx[4]);
      t1 = text("(");
      t2 = text(
      /*renderedArgs*/
      ctx[6]);
      t3 = text(")");
      t4 = space();
      if_block.c();
      attr(div, "class", "args svelte-vajd9z");
      attr(button, "class", button_class_value = "log-event player" +
      /*playerID*/
      ctx[7] + " svelte-vajd9z");
      toggle_class(button, "pinned",
      /*pinned*/
      ctx[1]);
    },

    m(target, anchor) {
      insert(target, button, anchor);
      append(button, div);
      append(div, t0);
      append(div, t1);
      append(div, t2);
      append(div, t3);
      append(button, t4);
      if_blocks[current_block_type_index].m(button, null);
      current = true;

      if (!mounted) {
        dispose = [listen(button, "click",
        /*click_handler*/
        ctx[9]), listen(button, "mouseenter",
        /*mouseenter_handler*/
        ctx[10]), listen(button, "focus",
        /*focus_handler*/
        ctx[11]), listen(button, "mouseleave",
        /*mouseleave_handler*/
        ctx[12]), listen(button, "blur",
        /*blur_handler*/
        ctx[13])];
        mounted = true;
      }
    },

    p(ctx, [dirty]) {
      if (!current || dirty &
      /*actionType*/
      16) set_data(t0,
      /*actionType*/
      ctx[4]);
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }

        transition_in(if_block, 1);
        if_block.m(button, null);
      }

      if (dirty &
      /*pinned*/
      2) {
        toggle_class(button, "pinned",
        /*pinned*/
        ctx[1]);
      }
    },

    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },

    o(local) {
      transition_out(if_block);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(button);
      if_blocks[current_block_type_index].d();
      mounted = false;
      run_all(dispose);
    }

  };
}

function instance$r($$self, $$props, $$invalidate) {
  let {
    logIndex
  } = $$props;
  let {
    action
  } = $$props;
  let {
    pinned
  } = $$props;
  let {
    metadata
  } = $$props;
  let {
    metadataComponent
  } = $$props;
  const dispatch = createEventDispatcher();
  const args = action.payload.args;
  const renderedArgs = Array.isArray(args) ? args.map(arg => JSON.stringify(arg, null, 2)).join(',') : JSON.stringify(args, null, 2) || '';
  const playerID = action.payload.playerID;
  let actionType;

  switch (action.type) {
    case 'UNDO':
      actionType = 'undo';
      break;

    case 'REDO':
      actionType = 'redo';

    case 'GAME_EVENT':
    case 'MAKE_MOVE':
    default:
      actionType = action.payload.type;
      break;
  }

  const click_handler = () => dispatch('click', {
    logIndex
  });

  const mouseenter_handler = () => dispatch('mouseenter', {
    logIndex
  });

  const focus_handler = () => dispatch('mouseenter', {
    logIndex
  });

  const mouseleave_handler = () => dispatch('mouseleave');

  const blur_handler = () => dispatch('mouseleave');

  $$self.$$set = $$props => {
    if ('logIndex' in $$props) $$invalidate(0, logIndex = $$props.logIndex);
    if ('action' in $$props) $$invalidate(8, action = $$props.action);
    if ('pinned' in $$props) $$invalidate(1, pinned = $$props.pinned);
    if ('metadata' in $$props) $$invalidate(2, metadata = $$props.metadata);
    if ('metadataComponent' in $$props) $$invalidate(3, metadataComponent = $$props.metadataComponent);
  };

  return [logIndex, pinned, metadata, metadataComponent, actionType, dispatch, renderedArgs, playerID, action, click_handler, mouseenter_handler, focus_handler, mouseleave_handler, blur_handler];
}

class LogEvent extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$r, create_fragment$r, safe_not_equal, {
      logIndex: 0,
      action: 8,
      pinned: 1,
      metadata: 2,
      metadataComponent: 3
    }, add_css$j);
  }

}
/* node_modules/svelte-icons/fa/FaArrowAltCircleDown.svelte generated by Svelte v3.41.0 */


function create_default_slot$1(ctx) {
  let path;
  return {
    c() {
      path = svg_element("path");
      attr(path, "d", "M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zM212 140v116h-70.9c-10.7 0-16.1 13-8.5 20.5l114.9 114.3c4.7 4.7 12.2 4.7 16.9 0l114.9-114.3c7.6-7.6 2.2-20.5-8.5-20.5H300V140c0-6.6-5.4-12-12-12h-64c-6.6 0-12 5.4-12 12z");
    },

    m(target, anchor) {
      insert(target, path, anchor);
    },

    d(detaching) {
      if (detaching) detach(path);
    }

  };
}

function create_fragment$s(ctx) {
  let iconbase;
  let current;
  const iconbase_spread_levels = [{
    viewBox: "0 0 512 512"
  },
  /*$$props*/
  ctx[0]];
  let iconbase_props = {
    $$slots: {
      default: [create_default_slot$1]
    },
    $$scope: {
      ctx
    }
  };

  for (let i = 0; i < iconbase_spread_levels.length; i += 1) {
    iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
  }

  iconbase = new IconBase({
    props: iconbase_props
  });
  return {
    c() {
      create_component(iconbase.$$.fragment);
    },

    m(target, anchor) {
      mount_component(iconbase, target, anchor);
      current = true;
    },

    p(ctx, [dirty]) {
      const iconbase_changes = dirty &
      /*$$props*/
      1 ? get_spread_update(iconbase_spread_levels, [iconbase_spread_levels[0], get_spread_object(
      /*$$props*/
      ctx[0])]) : {};

      if (dirty &
      /*$$scope*/
      2) {
        iconbase_changes.$$scope = {
          dirty,
          ctx
        };
      }

      iconbase.$set(iconbase_changes);
    },

    i(local) {
      if (current) return;
      transition_in(iconbase.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(iconbase.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(iconbase, detaching);
    }

  };
}

function instance$s($$self, $$props, $$invalidate) {
  $$self.$$set = $$new_props => {
    $$invalidate(0, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
  };

  $$props = exclude_internal_props($$props);
  return [$$props];
}

class FaArrowAltCircleDown extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$s, create_fragment$s, safe_not_equal, {});
  }

}
/* src/client/debug/mcts/Action.svelte generated by Svelte v3.41.0 */


function add_css$k(target) {
  append_styles(target, "svelte-1a7time", "div.svelte-1a7time{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;max-width:500px}");
}

function create_fragment$t(ctx) {
  let div;
  let t;
  return {
    c() {
      div = element("div");
      t = text(
      /*text*/
      ctx[0]);
      attr(div, "alt",
      /*text*/
      ctx[0]);
      attr(div, "class", "svelte-1a7time");
    },

    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*text*/
      1) set_data(t,
      /*text*/
      ctx[0]);

      if (dirty &
      /*text*/
      1) {
        attr(div, "alt",
        /*text*/
        ctx[0]);
      }
    },

    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(div);
    }

  };
}

function instance$t($$self, $$props, $$invalidate) {
  let {
    action
  } = $$props;
  let text;

  $$self.$$set = $$props => {
    if ('action' in $$props) $$invalidate(1, action = $$props.action);
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*action*/
    2) {
      {
        const {
          type,
          args
        } = action.payload;
        const argsFormatted = (args || []).join(',');
        $$invalidate(0, text = "".concat(type, "(").concat(argsFormatted, ")"));
      }
    }
  };

  return [text, action];
}

class Action extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$t, create_fragment$t, safe_not_equal, {
      action: 1
    }, add_css$k);
  }

}
/* src/client/debug/mcts/Table.svelte generated by Svelte v3.41.0 */


function add_css$l(target) {
  append_styles(target, "svelte-ztcwsu", "table.svelte-ztcwsu.svelte-ztcwsu{font-size:12px;border-collapse:collapse;border:1px solid #ddd;padding:0}tr.svelte-ztcwsu.svelte-ztcwsu{cursor:pointer}tr.svelte-ztcwsu:hover td.svelte-ztcwsu{background:#eee}tr.selected.svelte-ztcwsu td.svelte-ztcwsu{background:#eee}td.svelte-ztcwsu.svelte-ztcwsu{padding:10px;height:10px;line-height:10px;font-size:12px;border:none}th.svelte-ztcwsu.svelte-ztcwsu{background:#888;color:#fff;padding:10px;text-align:center}");
}

function get_each_context$6(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  child_ctx[12] = i;
  return child_ctx;
} // (86:2) {#each children as child, i}


function create_each_block$6(ctx) {
  let tr;
  let td0;
  let t0_value =
  /*child*/
  ctx[10].value + "";
  let t0;
  let t1;
  let td1;
  let t2_value =
  /*child*/
  ctx[10].visits + "";
  let t2;
  let t3;
  let td2;
  let action;
  let t4;
  let current;
  let mounted;
  let dispose;
  action = new Action({
    props: {
      action:
      /*child*/
      ctx[10].parentAction
    }
  });

  function click_handler() {
    return (
      /*click_handler*/
      ctx[6](
      /*child*/
      ctx[10],
      /*i*/
      ctx[12])
    );
  }

  function mouseout_handler() {
    return (
      /*mouseout_handler*/
      ctx[7](
      /*i*/
      ctx[12])
    );
  }

  function mouseover_handler() {
    return (
      /*mouseover_handler*/
      ctx[8](
      /*child*/
      ctx[10],
      /*i*/
      ctx[12])
    );
  }

  return {
    c() {
      tr = element("tr");
      td0 = element("td");
      t0 = text(t0_value);
      t1 = space();
      td1 = element("td");
      t2 = text(t2_value);
      t3 = space();
      td2 = element("td");
      create_component(action.$$.fragment);
      t4 = space();
      attr(td0, "class", "svelte-ztcwsu");
      attr(td1, "class", "svelte-ztcwsu");
      attr(td2, "class", "svelte-ztcwsu");
      attr(tr, "class", "svelte-ztcwsu");
      toggle_class(tr, "clickable",
      /*children*/
      ctx[1].length > 0);
      toggle_class(tr, "selected",
      /*i*/
      ctx[12] ===
      /*selectedIndex*/
      ctx[0]);
    },

    m(target, anchor) {
      insert(target, tr, anchor);
      append(tr, td0);
      append(td0, t0);
      append(tr, t1);
      append(tr, td1);
      append(td1, t2);
      append(tr, t3);
      append(tr, td2);
      mount_component(action, td2, null);
      append(tr, t4);
      current = true;

      if (!mounted) {
        dispose = [listen(tr, "click", click_handler), listen(tr, "mouseout", mouseout_handler), listen(tr, "mouseover", mouseover_handler)];
        mounted = true;
      }
    },

    p(new_ctx, dirty) {
      ctx = new_ctx;
      if ((!current || dirty &
      /*children*/
      2) && t0_value !== (t0_value =
      /*child*/
      ctx[10].value + "")) set_data(t0, t0_value);
      if ((!current || dirty &
      /*children*/
      2) && t2_value !== (t2_value =
      /*child*/
      ctx[10].visits + "")) set_data(t2, t2_value);
      const action_changes = {};
      if (dirty &
      /*children*/
      2) action_changes.action =
      /*child*/
      ctx[10].parentAction;
      action.$set(action_changes);

      if (dirty &
      /*children*/
      2) {
        toggle_class(tr, "clickable",
        /*children*/
        ctx[1].length > 0);
      }

      if (dirty &
      /*selectedIndex*/
      1) {
        toggle_class(tr, "selected",
        /*i*/
        ctx[12] ===
        /*selectedIndex*/
        ctx[0]);
      }
    },

    i(local) {
      if (current) return;
      transition_in(action.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(action.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(tr);
      destroy_component(action);
      mounted = false;
      run_all(dispose);
    }

  };
}

function create_fragment$u(ctx) {
  let table;
  let thead;
  let t5;
  let tbody;
  let current;
  let each_value =
  /*children*/
  ctx[1];
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
  }

  const out = i => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });

  return {
    c() {
      table = element("table");
      thead = element("thead");
      thead.innerHTML = "<th class=\"svelte-ztcwsu\">Value</th> \n    <th class=\"svelte-ztcwsu\">Visits</th> \n    <th class=\"svelte-ztcwsu\">Action</th>";
      t5 = space();
      tbody = element("tbody");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      attr(table, "class", "svelte-ztcwsu");
    },

    m(target, anchor) {
      insert(target, table, anchor);
      append(table, thead);
      append(table, t5);
      append(table, tbody);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(tbody, null);
      }

      current = true;
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*children, selectedIndex, Select, Preview*/
      15) {
        each_value =
        /*children*/
        ctx[1];
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$6(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$6(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(tbody, null);
          }
        }

        group_outros();

        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }

        check_outros();
      }
    },

    i(local) {
      if (current) return;

      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }

      current = true;
    },

    o(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }

      current = false;
    },

    d(detaching) {
      if (detaching) detach(table);
      destroy_each(each_blocks, detaching);
    }

  };
}

function instance$u($$self, $$props, $$invalidate) {
  let {
    root
  } = $$props;
  let {
    selectedIndex = null
  } = $$props;
  const dispatch = createEventDispatcher();
  let parents = [];
  let children = [];

  function Select(node, i) {
    dispatch('select', {
      node,
      selectedIndex: i
    });
  }

  function Preview(node, i) {
    if (selectedIndex === null) {
      dispatch('preview', {
        node
      });
    }
  }

  const click_handler = (child, i) => Select(child, i);

  const mouseout_handler = i => Preview(null);

  const mouseover_handler = (child, i) => Preview(child);

  $$self.$$set = $$props => {
    if ('root' in $$props) $$invalidate(4, root = $$props.root);
    if ('selectedIndex' in $$props) $$invalidate(0, selectedIndex = $$props.selectedIndex);
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*root, parents*/
    48) {
      {
        let t = root;
        $$invalidate(5, parents = []);

        while (t.parent) {
          const parent = t.parent;
          const {
            type,
            args
          } = t.parentAction.payload;
          const argsFormatted = (args || []).join(',');
          const arrowText = "".concat(type, "(").concat(argsFormatted, ")");
          parents.push({
            parent,
            arrowText
          });
          t = parent;
        }

        parents.reverse();
        $$invalidate(1, children = [...root.children].sort((a, b) => a.visits < b.visits ? 1 : -1).slice(0, 50));
      }
    }
  };

  return [selectedIndex, children, Select, Preview, root, parents, click_handler, mouseout_handler, mouseover_handler];
}

class Table extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$u, create_fragment$u, safe_not_equal, {
      root: 4,
      selectedIndex: 0
    }, add_css$l);
  }

}
/* src/client/debug/mcts/MCTS.svelte generated by Svelte v3.41.0 */


function add_css$m(target) {
  append_styles(target, "svelte-1f0amz4", ".visualizer.svelte-1f0amz4{display:flex;flex-direction:column;align-items:center;padding:50px}.preview.svelte-1f0amz4{opacity:0.5}.icon.svelte-1f0amz4{color:#777;width:32px;height:32px;margin-bottom:20px}");
}

function get_each_context$7(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[9] = list[i].node;
  child_ctx[10] = list[i].selectedIndex;
  child_ctx[12] = i;
  return child_ctx;
} // (50:4) {#if i !== 0}


function create_if_block_2$3(ctx) {
  let div;
  let arrow;
  let current;
  arrow = new FaArrowAltCircleDown({});
  return {
    c() {
      div = element("div");
      create_component(arrow.$$.fragment);
      attr(div, "class", "icon svelte-1f0amz4");
    },

    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(arrow, div, null);
      current = true;
    },

    i(local) {
      if (current) return;
      transition_in(arrow.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(arrow.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(div);
      destroy_component(arrow);
    }

  };
} // (61:6) {:else}


function create_else_block$2(ctx) {
  let table;
  let current;

  function select_handler_1(...args) {
    return (
      /*select_handler_1*/
      ctx[7](
      /*i*/
      ctx[12], ...args)
    );
  }

  table = new Table({
    props: {
      root:
      /*node*/
      ctx[9],
      selectedIndex:
      /*selectedIndex*/
      ctx[10]
    }
  });
  table.$on("select", select_handler_1);
  return {
    c() {
      create_component(table.$$.fragment);
    },

    m(target, anchor) {
      mount_component(table, target, anchor);
      current = true;
    },

    p(new_ctx, dirty) {
      ctx = new_ctx;
      const table_changes = {};
      if (dirty &
      /*nodes*/
      1) table_changes.root =
      /*node*/
      ctx[9];
      if (dirty &
      /*nodes*/
      1) table_changes.selectedIndex =
      /*selectedIndex*/
      ctx[10];
      table.$set(table_changes);
    },

    i(local) {
      if (current) return;
      transition_in(table.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(table.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(table, detaching);
    }

  };
} // (57:6) {#if i === nodes.length - 1}


function create_if_block_1$3(ctx) {
  let table;
  let current;

  function select_handler(...args) {
    return (
      /*select_handler*/
      ctx[5](
      /*i*/
      ctx[12], ...args)
    );
  }

  function preview_handler(...args) {
    return (
      /*preview_handler*/
      ctx[6](
      /*i*/
      ctx[12], ...args)
    );
  }

  table = new Table({
    props: {
      root:
      /*node*/
      ctx[9]
    }
  });
  table.$on("select", select_handler);
  table.$on("preview", preview_handler);
  return {
    c() {
      create_component(table.$$.fragment);
    },

    m(target, anchor) {
      mount_component(table, target, anchor);
      current = true;
    },

    p(new_ctx, dirty) {
      ctx = new_ctx;
      const table_changes = {};
      if (dirty &
      /*nodes*/
      1) table_changes.root =
      /*node*/
      ctx[9];
      table.$set(table_changes);
    },

    i(local) {
      if (current) return;
      transition_in(table.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(table.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(table, detaching);
    }

  };
} // (49:2) {#each nodes as { node, selectedIndex }


function create_each_block$7(ctx) {
  let t;
  let section;
  let current_block_type_index;
  let if_block1;
  let current;
  let if_block0 =
  /*i*/
  ctx[12] !== 0 && create_if_block_2$3();
  const if_block_creators = [create_if_block_1$3, create_else_block$2];
  const if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*i*/
    ctx[12] ===
    /*nodes*/
    ctx[0].length - 1) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      if (if_block0) if_block0.c();
      t = space();
      section = element("section");
      if_block1.c();
    },

    m(target, anchor) {
      if (if_block0) if_block0.m(target, anchor);
      insert(target, t, anchor);
      insert(target, section, anchor);
      if_blocks[current_block_type_index].m(section, null);
      current = true;
    },

    p(ctx, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block1 = if_blocks[current_block_type_index];

        if (!if_block1) {
          if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block1.c();
        } else {
          if_block1.p(ctx, dirty);
        }

        transition_in(if_block1, 1);
        if_block1.m(section, null);
      }
    },

    i(local) {
      if (current) return;
      transition_in(if_block0);
      transition_in(if_block1);
      current = true;
    },

    o(local) {
      transition_out(if_block0);
      transition_out(if_block1);
      current = false;
    },

    d(detaching) {
      if (if_block0) if_block0.d(detaching);
      if (detaching) detach(t);
      if (detaching) detach(section);
      if_blocks[current_block_type_index].d();
    }

  };
} // (69:2) {#if preview}


function create_if_block$a(ctx) {
  let div;
  let arrow;
  let t;
  let section;
  let table;
  let current;
  arrow = new FaArrowAltCircleDown({});
  table = new Table({
    props: {
      root:
      /*preview*/
      ctx[1]
    }
  });
  return {
    c() {
      div = element("div");
      create_component(arrow.$$.fragment);
      t = space();
      section = element("section");
      create_component(table.$$.fragment);
      attr(div, "class", "icon svelte-1f0amz4");
      attr(section, "class", "preview svelte-1f0amz4");
    },

    m(target, anchor) {
      insert(target, div, anchor);
      mount_component(arrow, div, null);
      insert(target, t, anchor);
      insert(target, section, anchor);
      mount_component(table, section, null);
      current = true;
    },

    p(ctx, dirty) {
      const table_changes = {};
      if (dirty &
      /*preview*/
      2) table_changes.root =
      /*preview*/
      ctx[1];
      table.$set(table_changes);
    },

    i(local) {
      if (current) return;
      transition_in(arrow.$$.fragment, local);
      transition_in(table.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(arrow.$$.fragment, local);
      transition_out(table.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(div);
      destroy_component(arrow);
      if (detaching) detach(t);
      if (detaching) detach(section);
      destroy_component(table);
    }

  };
}

function create_fragment$v(ctx) {
  let div;
  let t;
  let current;
  let each_value =
  /*nodes*/
  ctx[0];
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
  }

  const out = i => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });

  let if_block =
  /*preview*/
  ctx[1] && create_if_block$a(ctx);
  return {
    c() {
      div = element("div");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      t = space();
      if (if_block) if_block.c();
      attr(div, "class", "visualizer svelte-1f0amz4");
    },

    m(target, anchor) {
      insert(target, div, anchor);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }

      append(div, t);
      if (if_block) if_block.m(div, null);
      current = true;
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*nodes, SelectNode, PreviewNode*/
      13) {
        each_value =
        /*nodes*/
        ctx[0];
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$7(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$7(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div, t);
          }
        }

        group_outros();

        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }

        check_outros();
      }

      if (
      /*preview*/
      ctx[1]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*preview*/
          2) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$a(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },

    i(local) {
      if (current) return;

      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }

      transition_in(if_block);
      current = true;
    },

    o(local) {
      each_blocks = each_blocks.filter(Boolean);

      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }

      transition_out(if_block);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(div);
      destroy_each(each_blocks, detaching);
      if (if_block) if_block.d();
    }

  };
}

function instance$v($$self, $$props, $$invalidate) {
  let {
    metadata
  } = $$props;
  let nodes = [];
  let preview = null;

  function SelectNode({
    node,
    selectedIndex
  }, i) {
    $$invalidate(1, preview = null);
    $$invalidate(0, nodes[i].selectedIndex = selectedIndex, nodes);
    $$invalidate(0, nodes = [...nodes.slice(0, i + 1), {
      node
    }]);
  }

  function PreviewNode({
    node
  }, i) {
    $$invalidate(1, preview = node);
  }

  const select_handler = (i, e) => SelectNode(e.detail, i);

  const preview_handler = (i, e) => PreviewNode(e.detail);

  const select_handler_1 = (i, e) => SelectNode(e.detail, i);

  $$self.$$set = $$props => {
    if ('metadata' in $$props) $$invalidate(4, metadata = $$props.metadata);
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*metadata*/
    16) {
      {
        $$invalidate(0, nodes = [{
          node: metadata
        }]);
      }
    }
  };

  return [nodes, preview, SelectNode, PreviewNode, metadata, select_handler, preview_handler, select_handler_1];
}

class MCTS extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$v, create_fragment$v, safe_not_equal, {
      metadata: 4
    }, add_css$m);
  }

}
/* src/client/debug/log/Log.svelte generated by Svelte v3.41.0 */


function add_css$n(target) {
  append_styles(target, "svelte-1pq5e4b", ".gamelog.svelte-1pq5e4b{display:grid;grid-template-columns:30px 1fr 30px;grid-auto-rows:auto;grid-auto-flow:column}");
}

function get_each_context$8(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[16] = list[i].phase;
  child_ctx[18] = i;
  return child_ctx;
}

function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[19] = list[i].action;
  child_ctx[20] = list[i].metadata;
  child_ctx[18] = i;
  return child_ctx;
}

function get_each_context_2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[22] = list[i].turn;
  child_ctx[18] = i;
  return child_ctx;
} // (136:4) {#if i in turnBoundaries}


function create_if_block_1$4(ctx) {
  let turnmarker;
  let current;
  turnmarker = new TurnMarker({
    props: {
      turn:
      /*turn*/
      ctx[22],
      numEvents:
      /*turnBoundaries*/
      ctx[3][
      /*i*/
      ctx[18]]
    }
  });
  return {
    c() {
      create_component(turnmarker.$$.fragment);
    },

    m(target, anchor) {
      mount_component(turnmarker, target, anchor);
      current = true;
    },

    p(ctx, dirty) {
      const turnmarker_changes = {};
      if (dirty &
      /*renderedLogEntries*/
      2) turnmarker_changes.turn =
      /*turn*/
      ctx[22];
      if (dirty &
      /*turnBoundaries*/
      8) turnmarker_changes.numEvents =
      /*turnBoundaries*/
      ctx[3][
      /*i*/
      ctx[18]];
      turnmarker.$set(turnmarker_changes);
    },

    i(local) {
      if (current) return;
      transition_in(turnmarker.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(turnmarker.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(turnmarker, detaching);
    }

  };
} // (135:2) {#each renderedLogEntries as { turn }


function create_each_block_2(ctx) {
  let if_block_anchor;
  let current;
  let if_block =
  /*i*/
  ctx[18] in
  /*turnBoundaries*/
  ctx[3] && create_if_block_1$4(ctx);
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },

    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },

    p(ctx, dirty) {
      if (
      /*i*/
      ctx[18] in
      /*turnBoundaries*/
      ctx[3]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*turnBoundaries*/
          8) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1$4(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },

    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },

    o(local) {
      transition_out(if_block);
      current = false;
    },

    d(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach(if_block_anchor);
    }

  };
} // (141:2) {#each renderedLogEntries as { action, metadata }


function create_each_block_1(ctx) {
  let logevent;
  let current;
  logevent = new LogEvent({
    props: {
      pinned:
      /*i*/
      ctx[18] ===
      /*pinned*/
      ctx[2],
      logIndex:
      /*i*/
      ctx[18],
      action:
      /*action*/
      ctx[19],
      metadata:
      /*metadata*/
      ctx[20]
    }
  });
  logevent.$on("click",
  /*OnLogClick*/
  ctx[5]);
  logevent.$on("mouseenter",
  /*OnMouseEnter*/
  ctx[6]);
  logevent.$on("mouseleave",
  /*OnMouseLeave*/
  ctx[7]);
  return {
    c() {
      create_component(logevent.$$.fragment);
    },

    m(target, anchor) {
      mount_component(logevent, target, anchor);
      current = true;
    },

    p(ctx, dirty) {
      const logevent_changes = {};
      if (dirty &
      /*pinned*/
      4) logevent_changes.pinned =
      /*i*/
      ctx[18] ===
      /*pinned*/
      ctx[2];
      if (dirty &
      /*renderedLogEntries*/
      2) logevent_changes.action =
      /*action*/
      ctx[19];
      if (dirty &
      /*renderedLogEntries*/
      2) logevent_changes.metadata =
      /*metadata*/
      ctx[20];
      logevent.$set(logevent_changes);
    },

    i(local) {
      if (current) return;
      transition_in(logevent.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(logevent.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(logevent, detaching);
    }

  };
} // (153:4) {#if i in phaseBoundaries}


function create_if_block$b(ctx) {
  let phasemarker;
  let current;
  phasemarker = new PhaseMarker({
    props: {
      phase:
      /*phase*/
      ctx[16],
      numEvents:
      /*phaseBoundaries*/
      ctx[4][
      /*i*/
      ctx[18]]
    }
  });
  return {
    c() {
      create_component(phasemarker.$$.fragment);
    },

    m(target, anchor) {
      mount_component(phasemarker, target, anchor);
      current = true;
    },

    p(ctx, dirty) {
      const phasemarker_changes = {};
      if (dirty &
      /*renderedLogEntries*/
      2) phasemarker_changes.phase =
      /*phase*/
      ctx[16];
      if (dirty &
      /*phaseBoundaries*/
      16) phasemarker_changes.numEvents =
      /*phaseBoundaries*/
      ctx[4][
      /*i*/
      ctx[18]];
      phasemarker.$set(phasemarker_changes);
    },

    i(local) {
      if (current) return;
      transition_in(phasemarker.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(phasemarker.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      destroy_component(phasemarker, detaching);
    }

  };
} // (152:2) {#each renderedLogEntries as { phase }


function create_each_block$8(ctx) {
  let if_block_anchor;
  let current;
  let if_block =
  /*i*/
  ctx[18] in
  /*phaseBoundaries*/
  ctx[4] && create_if_block$b(ctx);
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },

    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },

    p(ctx, dirty) {
      if (
      /*i*/
      ctx[18] in
      /*phaseBoundaries*/
      ctx[4]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*phaseBoundaries*/
          16) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$b(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },

    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },

    o(local) {
      transition_out(if_block);
      current = false;
    },

    d(detaching) {
      if (if_block) if_block.d(detaching);
      if (detaching) detach(if_block_anchor);
    }

  };
}

function create_fragment$w(ctx) {
  let div;
  let t0;
  let t1;
  let current;
  let mounted;
  let dispose;
  let each_value_2 =
  /*renderedLogEntries*/
  ctx[1];
  let each_blocks_2 = [];

  for (let i = 0; i < each_value_2.length; i += 1) {
    each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
  }

  const out = i => transition_out(each_blocks_2[i], 1, 1, () => {
    each_blocks_2[i] = null;
  });

  let each_value_1 =
  /*renderedLogEntries*/
  ctx[1];
  let each_blocks_1 = [];

  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }

  const out_1 = i => transition_out(each_blocks_1[i], 1, 1, () => {
    each_blocks_1[i] = null;
  });

  let each_value =
  /*renderedLogEntries*/
  ctx[1];
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$8(get_each_context$8(ctx, each_value, i));
  }

  const out_2 = i => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });

  return {
    c() {
      div = element("div");

      for (let i = 0; i < each_blocks_2.length; i += 1) {
        each_blocks_2[i].c();
      }

      t0 = space();

      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].c();
      }

      t1 = space();

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      attr(div, "class", "gamelog svelte-1pq5e4b");
      toggle_class(div, "pinned",
      /*pinned*/
      ctx[2]);
    },

    m(target, anchor) {
      insert(target, div, anchor);

      for (let i = 0; i < each_blocks_2.length; i += 1) {
        each_blocks_2[i].m(div, null);
      }

      append(div, t0);

      for (let i = 0; i < each_blocks_1.length; i += 1) {
        each_blocks_1[i].m(div, null);
      }

      append(div, t1);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }

      current = true;

      if (!mounted) {
        dispose = listen(window, "keydown",
        /*OnKeyDown*/
        ctx[8]);
        mounted = true;
      }
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*renderedLogEntries, turnBoundaries*/
      10) {
        each_value_2 =
        /*renderedLogEntries*/
        ctx[1];
        let i;

        for (i = 0; i < each_value_2.length; i += 1) {
          const child_ctx = get_each_context_2(ctx, each_value_2, i);

          if (each_blocks_2[i]) {
            each_blocks_2[i].p(child_ctx, dirty);
            transition_in(each_blocks_2[i], 1);
          } else {
            each_blocks_2[i] = create_each_block_2(child_ctx);
            each_blocks_2[i].c();
            transition_in(each_blocks_2[i], 1);
            each_blocks_2[i].m(div, t0);
          }
        }

        group_outros();

        for (i = each_value_2.length; i < each_blocks_2.length; i += 1) {
          out(i);
        }

        check_outros();
      }

      if (dirty &
      /*pinned, renderedLogEntries, OnLogClick, OnMouseEnter, OnMouseLeave*/
      230) {
        each_value_1 =
        /*renderedLogEntries*/
        ctx[1];
        let i;

        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx, each_value_1, i);

          if (each_blocks_1[i]) {
            each_blocks_1[i].p(child_ctx, dirty);
            transition_in(each_blocks_1[i], 1);
          } else {
            each_blocks_1[i] = create_each_block_1(child_ctx);
            each_blocks_1[i].c();
            transition_in(each_blocks_1[i], 1);
            each_blocks_1[i].m(div, t1);
          }
        }

        group_outros();

        for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
          out_1(i);
        }

        check_outros();
      }

      if (dirty &
      /*renderedLogEntries, phaseBoundaries*/
      18) {
        each_value =
        /*renderedLogEntries*/
        ctx[1];
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$8(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$8(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(div, null);
          }
        }

        group_outros();

        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out_2(i);
        }

        check_outros();
      }

      if (dirty &
      /*pinned*/
      4) {
        toggle_class(div, "pinned",
        /*pinned*/
        ctx[2]);
      }
    },

    i(local) {
      if (current) return;

      for (let i = 0; i < each_value_2.length; i += 1) {
        transition_in(each_blocks_2[i]);
      }

      for (let i = 0; i < each_value_1.length; i += 1) {
        transition_in(each_blocks_1[i]);
      }

      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }

      current = true;
    },

    o(local) {
      each_blocks_2 = each_blocks_2.filter(Boolean);

      for (let i = 0; i < each_blocks_2.length; i += 1) {
        transition_out(each_blocks_2[i]);
      }

      each_blocks_1 = each_blocks_1.filter(Boolean);

      for (let i = 0; i < each_blocks_1.length; i += 1) {
        transition_out(each_blocks_1[i]);
      }

      each_blocks = each_blocks.filter(Boolean);

      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }

      current = false;
    },

    d(detaching) {
      if (detaching) detach(div);
      destroy_each(each_blocks_2, detaching);
      destroy_each(each_blocks_1, detaching);
      destroy_each(each_blocks, detaching);
      mounted = false;
      dispose();
    }

  };
}

function instance$w($$self, $$props, $$invalidate) {
  let $client,
      $$unsubscribe_client = noop,
      $$subscribe_client = () => ($$unsubscribe_client(), $$unsubscribe_client = subscribe(client, $$value => $$invalidate(10, $client = $$value)), client);

  $$self.$$.on_destroy.push(() => $$unsubscribe_client());
  let {
    client
  } = $$props;
  $$subscribe_client();
  const {
    secondaryPane
  } = getContext('secondaryPane');
  const reducer = (0, _reducerEfc3ec3e.C)({
    game: client.game
  });
  const initialState = client.getInitialState();
  let {
    log
  } = $client;
  let pinned = null;

  function rewind(logIndex) {
    let state = initialState;

    for (let i = 0; i < log.length; i++) {
      const {
        action,
        automatic
      } = log[i];

      if (!automatic) {
        state = reducer(state, action);

        if (logIndex == 0) {
          break;
        }

        logIndex--;
      }
    }

    return {
      G: state.G,
      ctx: state.ctx,
      plugins: state.plugins
    };
  }

  function OnLogClick(e) {
    const {
      logIndex
    } = e.detail;
    const state = rewind(logIndex);
    const renderedLogEntries = log.filter(e => !e.automatic);
    client.overrideGameState(state);

    if (pinned == logIndex) {
      $$invalidate(2, pinned = null);
      secondaryPane.set(null);
    } else {
      $$invalidate(2, pinned = logIndex);
      const {
        metadata
      } = renderedLogEntries[logIndex].action.payload;

      if (metadata) {
        secondaryPane.set({
          component: MCTS,
          metadata
        });
      }
    }
  }

  function OnMouseEnter(e) {
    const {
      logIndex
    } = e.detail;

    if (pinned === null) {
      const state = rewind(logIndex);
      client.overrideGameState(state);
    }
  }

  function OnMouseLeave() {
    if (pinned === null) {
      client.overrideGameState(null);
    }
  }

  function Reset() {
    $$invalidate(2, pinned = null);
    client.overrideGameState(null);
    secondaryPane.set(null);
  }

  onDestroy(Reset);

  function OnKeyDown(e) {
    // ESC.
    if (e.keyCode == 27) {
      Reset();
    }
  }

  let renderedLogEntries;
  let turnBoundaries = {};
  let phaseBoundaries = {};

  $$self.$$set = $$props => {
    if ('client' in $$props) $$subscribe_client($$invalidate(0, client = $$props.client));
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*$client, log, renderedLogEntries*/
    1538) {
      {
        $$invalidate(9, log = $client.log);
        $$invalidate(1, renderedLogEntries = log.filter(e => !e.automatic));
        let eventsInCurrentPhase = 0;
        let eventsInCurrentTurn = 0;
        $$invalidate(3, turnBoundaries = {});
        $$invalidate(4, phaseBoundaries = {});

        for (let i = 0; i < renderedLogEntries.length; i++) {
          const {
            action,
            payload,
            turn,
            phase
          } = renderedLogEntries[i];
          eventsInCurrentTurn++;
          eventsInCurrentPhase++;

          if (i == renderedLogEntries.length - 1 || renderedLogEntries[i + 1].turn != turn) {
            $$invalidate(3, turnBoundaries[i] = eventsInCurrentTurn, turnBoundaries);
            eventsInCurrentTurn = 0;
          }

          if (i == renderedLogEntries.length - 1 || renderedLogEntries[i + 1].phase != phase) {
            $$invalidate(4, phaseBoundaries[i] = eventsInCurrentPhase, phaseBoundaries);
            eventsInCurrentPhase = 0;
          }
        }
      }
    }
  };

  return [client, renderedLogEntries, pinned, turnBoundaries, phaseBoundaries, OnLogClick, OnMouseEnter, OnMouseLeave, OnKeyDown, log, $client];
}

class Log extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$w, create_fragment$w, safe_not_equal, {
      client: 0
    }, add_css$n);
  }

}
/* src/client/debug/ai/Options.svelte generated by Svelte v3.41.0 */


function add_css$o(target) {
  append_styles(target, "svelte-1fu900w", "label.svelte-1fu900w{color:#666}.option.svelte-1fu900w{margin-bottom:20px}.value.svelte-1fu900w{font-weight:bold;color:#000}input[type='checkbox'].svelte-1fu900w{vertical-align:middle}");
}

function get_each_context$9(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[6] = list[i][0];
  child_ctx[7] = list[i][1];
  child_ctx[8] = list;
  child_ctx[9] = i;
  return child_ctx;
} // (44:47) 


function create_if_block_1$5(ctx) {
  let input;
  let input_id_value;
  let mounted;
  let dispose;

  function input_change_handler() {
    /*input_change_handler*/
    ctx[5].call(input,
    /*key*/
    ctx[6]);
  }

  return {
    c() {
      input = element("input");
      attr(input, "id", input_id_value =
      /*makeID*/
      ctx[3](
      /*key*/
      ctx[6]));
      attr(input, "type", "checkbox");
      attr(input, "class", "svelte-1fu900w");
    },

    m(target, anchor) {
      insert(target, input, anchor);
      input.checked =
      /*values*/
      ctx[1][
      /*key*/
      ctx[6]];

      if (!mounted) {
        dispose = [listen(input, "change", input_change_handler), listen(input, "change",
        /*OnChange*/
        ctx[2])];
        mounted = true;
      }
    },

    p(new_ctx, dirty) {
      ctx = new_ctx;

      if (dirty &
      /*bot*/
      1 && input_id_value !== (input_id_value =
      /*makeID*/
      ctx[3](
      /*key*/
      ctx[6]))) {
        attr(input, "id", input_id_value);
      }

      if (dirty &
      /*values, Object, bot*/
      3) {
        input.checked =
        /*values*/
        ctx[1][
        /*key*/
        ctx[6]];
      }
    },

    d(detaching) {
      if (detaching) detach(input);
      mounted = false;
      run_all(dispose);
    }

  };
} // (41:4) {#if value.range}


function create_if_block$c(ctx) {
  let span;
  let t0_value =
  /*values*/
  ctx[1][
  /*key*/
  ctx[6]] + "";
  let t0;
  let t1;
  let input;
  let input_id_value;
  let input_min_value;
  let input_max_value;
  let mounted;
  let dispose;

  function input_change_input_handler() {
    /*input_change_input_handler*/
    ctx[4].call(input,
    /*key*/
    ctx[6]);
  }

  return {
    c() {
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      input = element("input");
      attr(span, "class", "value svelte-1fu900w");
      attr(input, "id", input_id_value =
      /*makeID*/
      ctx[3](
      /*key*/
      ctx[6]));
      attr(input, "type", "range");
      attr(input, "min", input_min_value =
      /*value*/
      ctx[7].range.min);
      attr(input, "max", input_max_value =
      /*value*/
      ctx[7].range.max);
    },

    m(target, anchor) {
      insert(target, span, anchor);
      append(span, t0);
      insert(target, t1, anchor);
      insert(target, input, anchor);
      set_input_value(input,
      /*values*/
      ctx[1][
      /*key*/
      ctx[6]]);

      if (!mounted) {
        dispose = [listen(input, "change", input_change_input_handler), listen(input, "input", input_change_input_handler), listen(input, "change",
        /*OnChange*/
        ctx[2])];
        mounted = true;
      }
    },

    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty &
      /*values, bot*/
      3 && t0_value !== (t0_value =
      /*values*/
      ctx[1][
      /*key*/
      ctx[6]] + "")) set_data(t0, t0_value);

      if (dirty &
      /*bot*/
      1 && input_id_value !== (input_id_value =
      /*makeID*/
      ctx[3](
      /*key*/
      ctx[6]))) {
        attr(input, "id", input_id_value);
      }

      if (dirty &
      /*bot*/
      1 && input_min_value !== (input_min_value =
      /*value*/
      ctx[7].range.min)) {
        attr(input, "min", input_min_value);
      }

      if (dirty &
      /*bot*/
      1 && input_max_value !== (input_max_value =
      /*value*/
      ctx[7].range.max)) {
        attr(input, "max", input_max_value);
      }

      if (dirty &
      /*values, Object, bot*/
      3) {
        set_input_value(input,
        /*values*/
        ctx[1][
        /*key*/
        ctx[6]]);
      }
    },

    d(detaching) {
      if (detaching) detach(span);
      if (detaching) detach(t1);
      if (detaching) detach(input);
      mounted = false;
      run_all(dispose);
    }

  };
} // (37:0) {#each Object.entries(bot.opts()) as [key, value]}


function create_each_block$9(ctx) {
  let div;
  let label;
  let t0_value =
  /*key*/
  ctx[6] + "";
  let t0;
  let label_for_value;
  let t1;
  let t2;

  function select_block_type(ctx, dirty) {
    if (
    /*value*/
    ctx[7].range) return create_if_block$c;
    if (typeof
    /*value*/
    ctx[7].value === 'boolean') return create_if_block_1$5;
  }

  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type && current_block_type(ctx);
  return {
    c() {
      div = element("div");
      label = element("label");
      t0 = text(t0_value);
      t1 = space();
      if (if_block) if_block.c();
      t2 = space();
      attr(label, "for", label_for_value =
      /*makeID*/
      ctx[3](
      /*key*/
      ctx[6]));
      attr(label, "class", "svelte-1fu900w");
      attr(div, "class", "option svelte-1fu900w");
    },

    m(target, anchor) {
      insert(target, div, anchor);
      append(div, label);
      append(label, t0);
      append(div, t1);
      if (if_block) if_block.m(div, null);
      append(div, t2);
    },

    p(ctx, dirty) {
      if (dirty &
      /*bot*/
      1 && t0_value !== (t0_value =
      /*key*/
      ctx[6] + "")) set_data(t0, t0_value);

      if (dirty &
      /*bot*/
      1 && label_for_value !== (label_for_value =
      /*makeID*/
      ctx[3](
      /*key*/
      ctx[6]))) {
        attr(label, "for", label_for_value);
      }

      if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
        if_block.p(ctx, dirty);
      } else {
        if (if_block) if_block.d(1);
        if_block = current_block_type && current_block_type(ctx);

        if (if_block) {
          if_block.c();
          if_block.m(div, t2);
        }
      }
    },

    d(detaching) {
      if (detaching) detach(div);

      if (if_block) {
        if_block.d();
      }
    }

  };
}

function create_fragment$x(ctx) {
  let each_1_anchor;
  let each_value = Object.entries(
  /*bot*/
  ctx[0].opts());
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$9(get_each_context$9(ctx, each_value, i));
  }

  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      each_1_anchor = empty();
    },

    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }

      insert(target, each_1_anchor, anchor);
    },

    p(ctx, [dirty]) {
      if (dirty &
      /*makeID, Object, bot, values, OnChange*/
      15) {
        each_value = Object.entries(
        /*bot*/
        ctx[0].opts());
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$9(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$9(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }

        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }

        each_blocks.length = each_value.length;
      }
    },

    i: noop,
    o: noop,

    d(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching) detach(each_1_anchor);
    }

  };
}

function instance$x($$self, $$props, $$invalidate) {
  let {
    bot
  } = $$props;
  let values = {};

  for (let [key, value] of Object.entries(bot.opts())) {
    values[key] = value.value;
  }

  function OnChange() {
    for (let [key, value] of Object.entries(values)) {
      bot.setOpt(key, value);
    }
  }

  const makeID = key => 'ai-option-' + key;

  function input_change_input_handler(key) {
    values[key] = to_number(this.value);
    $$invalidate(1, values);
    $$invalidate(0, bot);
  }

  function input_change_handler(key) {
    values[key] = this.checked;
    $$invalidate(1, values);
    $$invalidate(0, bot);
  }

  $$self.$$set = $$props => {
    if ('bot' in $$props) $$invalidate(0, bot = $$props.bot);
  };

  return [bot, values, OnChange, makeID, input_change_input_handler, input_change_handler];
}

class Options extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$x, create_fragment$x, safe_not_equal, {
      bot: 0
    }, add_css$o);
  }

}
/* src/client/debug/ai/AI.svelte generated by Svelte v3.41.0 */


function add_css$p(target) {
  append_styles(target, "svelte-lifdi8", "ul.svelte-lifdi8{padding-left:0}li.svelte-lifdi8{list-style:none;margin:none;margin-bottom:5px}h3.svelte-lifdi8{text-transform:uppercase}label.svelte-lifdi8{color:#666}input[type='checkbox'].svelte-lifdi8{vertical-align:middle}");
}

function get_each_context$a(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[7] = list[i];
  return child_ctx;
} // (202:4) {:else}


function create_else_block$3(ctx) {
  let p0;
  let t1;
  let p1;
  return {
    c() {
      p0 = element("p");
      p0.textContent = "No bots available.";
      t1 = space();
      p1 = element("p");
      p1.innerHTML = "Follow the instructions\n        <a href=\"https://boardgame.io/documentation/#/tutorial?id=bots\" target=\"_blank\">here</a>\n        to set up bots.";
    },

    m(target, anchor) {
      insert(target, p0, anchor);
      insert(target, t1, anchor);
      insert(target, p1, anchor);
    },

    p: noop,
    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(p0);
      if (detaching) detach(t1);
      if (detaching) detach(p1);
    }

  };
} // (200:4) {#if client.multiplayer}


function create_if_block_5(ctx) {
  let p;
  return {
    c() {
      p = element("p");
      p.textContent = "The bot debugger is only available in singleplayer mode.";
    },

    m(target, anchor) {
      insert(target, p, anchor);
    },

    p: noop,
    i: noop,
    o: noop,

    d(detaching) {
      if (detaching) detach(p);
    }

  };
} // (150:2) {#if client.game.ai && !client.multiplayer}


function create_if_block$d(ctx) {
  let section0;
  let h30;
  let t1;
  let ul;
  let li0;
  let hotkey0;
  let t2;
  let li1;
  let hotkey1;
  let t3;
  let li2;
  let hotkey2;
  let t4;
  let section1;
  let h31;
  let t6;
  let select;
  let t7;
  let show_if = Object.keys(
  /*bot*/
  ctx[7].opts()).length;
  let t8;
  let if_block1_anchor;
  let current;
  let mounted;
  let dispose;
  hotkey0 = new Hotkey({
    props: {
      value: "1",
      onPress:
      /*Reset*/
      ctx[13],
      label: "reset"
    }
  });
  hotkey1 = new Hotkey({
    props: {
      value: "2",
      onPress:
      /*Step*/
      ctx[11],
      label: "play"
    }
  });
  hotkey2 = new Hotkey({
    props: {
      value: "3",
      onPress:
      /*Simulate*/
      ctx[12],
      label: "simulate"
    }
  });
  let each_value = Object.keys(
  /*bots*/
  ctx[8]);
  let each_blocks = [];

  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$a(get_each_context$a(ctx, each_value, i));
  }

  let if_block0 = show_if && create_if_block_4(ctx);
  let if_block1 = (
  /*botAction*/
  ctx[5] ||
  /*iterationCounter*/
  ctx[3]) && create_if_block_1$6(ctx);
  return {
    c() {
      section0 = element("section");
      h30 = element("h3");
      h30.textContent = "Controls";
      t1 = space();
      ul = element("ul");
      li0 = element("li");
      create_component(hotkey0.$$.fragment);
      t2 = space();
      li1 = element("li");
      create_component(hotkey1.$$.fragment);
      t3 = space();
      li2 = element("li");
      create_component(hotkey2.$$.fragment);
      t4 = space();
      section1 = element("section");
      h31 = element("h3");
      h31.textContent = "Bot";
      t6 = space();
      select = element("select");

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }

      t7 = space();
      if (if_block0) if_block0.c();
      t8 = space();
      if (if_block1) if_block1.c();
      if_block1_anchor = empty();
      attr(h30, "class", "svelte-lifdi8");
      attr(li0, "class", "svelte-lifdi8");
      attr(li1, "class", "svelte-lifdi8");
      attr(li2, "class", "svelte-lifdi8");
      attr(ul, "class", "svelte-lifdi8");
      attr(h31, "class", "svelte-lifdi8");
      if (
      /*selectedBot*/
      ctx[4] === void 0) add_render_callback(() =>
      /*select_change_handler*/
      ctx[17].call(select));
    },

    m(target, anchor) {
      insert(target, section0, anchor);
      append(section0, h30);
      append(section0, t1);
      append(section0, ul);
      append(ul, li0);
      mount_component(hotkey0, li0, null);
      append(ul, t2);
      append(ul, li1);
      mount_component(hotkey1, li1, null);
      append(ul, t3);
      append(ul, li2);
      mount_component(hotkey2, li2, null);
      insert(target, t4, anchor);
      insert(target, section1, anchor);
      append(section1, h31);
      append(section1, t6);
      append(section1, select);

      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(select, null);
      }

      select_option(select,
      /*selectedBot*/
      ctx[4]);
      insert(target, t7, anchor);
      if (if_block0) if_block0.m(target, anchor);
      insert(target, t8, anchor);
      if (if_block1) if_block1.m(target, anchor);
      insert(target, if_block1_anchor, anchor);
      current = true;

      if (!mounted) {
        dispose = [listen(select, "change",
        /*select_change_handler*/
        ctx[17]), listen(select, "change",
        /*ChangeBot*/
        ctx[10])];
        mounted = true;
      }
    },

    p(ctx, dirty) {
      if (dirty &
      /*Object, bots*/
      256) {
        each_value = Object.keys(
        /*bots*/
        ctx[8]);
        let i;

        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$a(ctx, each_value, i);

          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$a(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(select, null);
          }
        }

        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }

        each_blocks.length = each_value.length;
      }

      if (dirty &
      /*selectedBot, Object, bots*/
      272) {
        select_option(select,
        /*selectedBot*/
        ctx[4]);
      }

      if (dirty &
      /*bot*/
      128) show_if = Object.keys(
      /*bot*/
      ctx[7].opts()).length;

      if (show_if) {
        if (if_block0) {
          if_block0.p(ctx, dirty);

          if (dirty &
          /*bot*/
          128) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_4(ctx);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(t8.parentNode, t8);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }

      if (
      /*botAction*/
      ctx[5] ||
      /*iterationCounter*/
      ctx[3]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_1$6(ctx);
          if_block1.c();
          if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },

    i(local) {
      if (current) return;
      transition_in(hotkey0.$$.fragment, local);
      transition_in(hotkey1.$$.fragment, local);
      transition_in(hotkey2.$$.fragment, local);
      transition_in(if_block0);
      current = true;
    },

    o(local) {
      transition_out(hotkey0.$$.fragment, local);
      transition_out(hotkey1.$$.fragment, local);
      transition_out(hotkey2.$$.fragment, local);
      transition_out(if_block0);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(section0);
      destroy_component(hotkey0);
      destroy_component(hotkey1);
      destroy_component(hotkey2);
      if (detaching) detach(t4);
      if (detaching) detach(section1);
      destroy_each(each_blocks, detaching);
      if (detaching) detach(t7);
      if (if_block0) if_block0.d(detaching);
      if (detaching) detach(t8);
      if (if_block1) if_block1.d(detaching);
      if (detaching) detach(if_block1_anchor);
      mounted = false;
      run_all(dispose);
    }

  };
} // (169:8) {#each Object.keys(bots) as bot}


function create_each_block$a(ctx) {
  let option;
  let t_value =
  /*bot*/
  ctx[7] + "";
  let t;
  let option_value_value;
  return {
    c() {
      option = element("option");
      t = text(t_value);
      option.__value = option_value_value =
      /*bot*/
      ctx[7];
      option.value = option.__value;
    },

    m(target, anchor) {
      insert(target, option, anchor);
      append(option, t);
    },

    p: noop,

    d(detaching) {
      if (detaching) detach(option);
    }

  };
} // (175:4) {#if Object.keys(bot.opts()).length}


function create_if_block_4(ctx) {
  let section;
  let h3;
  let t1;
  let label;
  let t3;
  let input;
  let t4;
  let options;
  let current;
  let mounted;
  let dispose;
  options = new Options({
    props: {
      bot:
      /*bot*/
      ctx[7]
    }
  });
  return {
    c() {
      section = element("section");
      h3 = element("h3");
      h3.textContent = "Options";
      t1 = space();
      label = element("label");
      label.textContent = "debug";
      t3 = space();
      input = element("input");
      t4 = space();
      create_component(options.$$.fragment);
      attr(h3, "class", "svelte-lifdi8");
      attr(label, "for", "ai-option-debug");
      attr(label, "class", "svelte-lifdi8");
      attr(input, "id", "ai-option-debug");
      attr(input, "type", "checkbox");
      attr(input, "class", "svelte-lifdi8");
    },

    m(target, anchor) {
      insert(target, section, anchor);
      append(section, h3);
      append(section, t1);
      append(section, label);
      append(section, t3);
      append(section, input);
      input.checked =
      /*debug*/
      ctx[1];
      append(section, t4);
      mount_component(options, section, null);
      current = true;

      if (!mounted) {
        dispose = [listen(input, "change",
        /*input_change_handler*/
        ctx[18]), listen(input, "change",
        /*OnDebug*/
        ctx[9])];
        mounted = true;
      }
    },

    p(ctx, dirty) {
      if (dirty &
      /*debug*/
      2) {
        input.checked =
        /*debug*/
        ctx[1];
      }

      const options_changes = {};
      if (dirty &
      /*bot*/
      128) options_changes.bot =
      /*bot*/
      ctx[7];
      options.$set(options_changes);
    },

    i(local) {
      if (current) return;
      transition_in(options.$$.fragment, local);
      current = true;
    },

    o(local) {
      transition_out(options.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(section);
      destroy_component(options);
      mounted = false;
      run_all(dispose);
    }

  };
} // (184:4) {#if botAction || iterationCounter}


function create_if_block_1$6(ctx) {
  let section;
  let h3;
  let t1;
  let t2;
  let if_block0 =
  /*progress*/
  ctx[2] &&
  /*progress*/
  ctx[2] < 1.0 && create_if_block_3$1(ctx);
  let if_block1 =
  /*botAction*/
  ctx[5] && create_if_block_2$4(ctx);
  return {
    c() {
      section = element("section");
      h3 = element("h3");
      h3.textContent = "Result";
      t1 = space();
      if (if_block0) if_block0.c();
      t2 = space();
      if (if_block1) if_block1.c();
      attr(h3, "class", "svelte-lifdi8");
    },

    m(target, anchor) {
      insert(target, section, anchor);
      append(section, h3);
      append(section, t1);
      if (if_block0) if_block0.m(section, null);
      append(section, t2);
      if (if_block1) if_block1.m(section, null);
    },

    p(ctx, dirty) {
      if (
      /*progress*/
      ctx[2] &&
      /*progress*/
      ctx[2] < 1.0) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_3$1(ctx);
          if_block0.c();
          if_block0.m(section, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }

      if (
      /*botAction*/
      ctx[5]) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_2$4(ctx);
          if_block1.c();
          if_block1.m(section, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },

    d(detaching) {
      if (detaching) detach(section);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
    }

  };
} // (187:6) {#if progress && progress < 1.0}


function create_if_block_3$1(ctx) {
  let progress_1;
  return {
    c() {
      progress_1 = element("progress");
      progress_1.value =
      /*progress*/
      ctx[2];
    },

    m(target, anchor) {
      insert(target, progress_1, anchor);
    },

    p(ctx, dirty) {
      if (dirty &
      /*progress*/
      4) {
        progress_1.value =
        /*progress*/
        ctx[2];
      }
    },

    d(detaching) {
      if (detaching) detach(progress_1);
    }

  };
} // (191:6) {#if botAction}


function create_if_block_2$4(ctx) {
  let ul;
  let li0;
  let t0;
  let t1;
  let t2;
  let li1;
  let t3;
  let t4_value = JSON.stringify(
  /*botActionArgs*/
  ctx[6]) + "";
  let t4;
  return {
    c() {
      ul = element("ul");
      li0 = element("li");
      t0 = text("Action: ");
      t1 = text(
      /*botAction*/
      ctx[5]);
      t2 = space();
      li1 = element("li");
      t3 = text("Args: ");
      t4 = text(t4_value);
      attr(li0, "class", "svelte-lifdi8");
      attr(li1, "class", "svelte-lifdi8");
      attr(ul, "class", "svelte-lifdi8");
    },

    m(target, anchor) {
      insert(target, ul, anchor);
      append(ul, li0);
      append(li0, t0);
      append(li0, t1);
      append(ul, t2);
      append(ul, li1);
      append(li1, t3);
      append(li1, t4);
    },

    p(ctx, dirty) {
      if (dirty &
      /*botAction*/
      32) set_data(t1,
      /*botAction*/
      ctx[5]);
      if (dirty &
      /*botActionArgs*/
      64 && t4_value !== (t4_value = JSON.stringify(
      /*botActionArgs*/
      ctx[6]) + "")) set_data(t4, t4_value);
    },

    d(detaching) {
      if (detaching) detach(ul);
    }

  };
}

function create_fragment$y(ctx) {
  let section;
  let current_block_type_index;
  let if_block;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block$d, create_if_block_5, create_else_block$3];
  const if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (
    /*client*/
    ctx[0].game.ai && !
    /*client*/
    ctx[0].multiplayer) return 0;
    if (
    /*client*/
    ctx[0].multiplayer) return 1;
    return 2;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      section = element("section");
      if_block.c();
    },

    m(target, anchor) {
      insert(target, section, anchor);
      if_blocks[current_block_type_index].m(section, null);
      current = true;

      if (!mounted) {
        dispose = listen(window, "keydown",
        /*OnKeyDown*/
        ctx[14]);
        mounted = true;
      }
    },

    p(ctx, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }

        transition_in(if_block, 1);
        if_block.m(section, null);
      }
    },

    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },

    o(local) {
      transition_out(if_block);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(section);
      if_blocks[current_block_type_index].d();
      mounted = false;
      dispose();
    }

  };
}

function instance$y($$self, $$props, $$invalidate) {
  let {
    client
  } = $$props;
  let {
    clientManager
  } = $$props;
  let {
    ToggleVisibility
  } = $$props;
  const {
    secondaryPane
  } = getContext('secondaryPane');
  const bots = {
    'MCTS': _ai7a5eea.M,
    'Random': _ai7a5eea.R
  };
  let debug = false;
  let progress = null;
  let iterationCounter = 0;
  let metadata = null;

  const iterationCallback = ({
    iterationCounter: c,
    numIterations,
    metadata: m
  }) => {
    $$invalidate(3, iterationCounter = c);
    $$invalidate(2, progress = c / numIterations);
    metadata = m;

    if (debug && metadata) {
      secondaryPane.set({
        component: MCTS,
        metadata
      });
    }
  };

  function OnDebug() {
    if (debug && metadata) {
      secondaryPane.set({
        component: MCTS,
        metadata
      });
    } else {
      secondaryPane.set(null);
    }
  }

  let bot;

  if (client.game.ai) {
    bot = new _ai7a5eea.M({
      game: client.game,
      enumerate: client.game.ai.enumerate,
      iterationCallback
    });
    bot.setOpt('async', true);
  }

  let selectedBot;
  let botAction;
  let botActionArgs;

  function ChangeBot() {
    const botConstructor = bots[selectedBot];
    $$invalidate(7, bot = new botConstructor({
      game: client.game,
      enumerate: client.game.ai.enumerate,
      iterationCallback
    }));
    bot.setOpt('async', true);
    $$invalidate(5, botAction = null);
    metadata = null;
    secondaryPane.set(null);
    $$invalidate(3, iterationCounter = 0);
  }

  async function Step$1() {
    $$invalidate(5, botAction = null);
    metadata = null;
    $$invalidate(3, iterationCounter = 0);
    const t = await (0, _ai7a5eea.S)(client, bot);

    if (t) {
      $$invalidate(5, botAction = t.payload.type);
      $$invalidate(6, botActionArgs = t.payload.args);
    }
  }

  function Simulate(iterations = 10000, sleepTimeout = 100) {
    $$invalidate(5, botAction = null);
    metadata = null;
    $$invalidate(3, iterationCounter = 0);

    const step = async () => {
      for (let i = 0; i < iterations; i++) {
        const action = await (0, _ai7a5eea.S)(client, bot);
        if (!action) break;
        await new Promise(resolve => setTimeout(resolve, sleepTimeout));
      }
    };

    return step();
  }

  function Exit() {
    client.overrideGameState(null);
    secondaryPane.set(null);
    $$invalidate(1, debug = false);
  }

  function Reset() {
    client.reset();
    $$invalidate(5, botAction = null);
    metadata = null;
    $$invalidate(3, iterationCounter = 0);
    Exit();
  }

  function OnKeyDown(e) {
    // ESC.
    if (e.keyCode == 27) {
      Exit();
    }
  }

  onDestroy(Exit);

  function select_change_handler() {
    selectedBot = select_value(this);
    $$invalidate(4, selectedBot);
    $$invalidate(8, bots);
  }

  function input_change_handler() {
    debug = this.checked;
    $$invalidate(1, debug);
  }

  $$self.$$set = $$props => {
    if ('client' in $$props) $$invalidate(0, client = $$props.client);
    if ('clientManager' in $$props) $$invalidate(15, clientManager = $$props.clientManager);
    if ('ToggleVisibility' in $$props) $$invalidate(16, ToggleVisibility = $$props.ToggleVisibility);
  };

  return [client, debug, progress, iterationCounter, selectedBot, botAction, botActionArgs, bot, bots, OnDebug, ChangeBot, Step$1, Simulate, Reset, OnKeyDown, clientManager, ToggleVisibility, select_change_handler, input_change_handler];
}

class AI extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$y, create_fragment$y, safe_not_equal, {
      client: 0,
      clientManager: 15,
      ToggleVisibility: 16
    }, add_css$p);
  }

}
/* src/client/debug/Debug.svelte generated by Svelte v3.41.0 */


function add_css$q(target) {
  append_styles(target, "svelte-8ymctk", ".debug-panel.svelte-8ymctk.svelte-8ymctk{position:fixed;color:#555;font-family:monospace;right:0;top:0;height:100%;font-size:14px;opacity:0.9;z-index:99999}.panel.svelte-8ymctk.svelte-8ymctk{display:flex;position:relative;flex-direction:row;height:100%}.visibility-toggle.svelte-8ymctk.svelte-8ymctk{position:absolute;box-sizing:border-box;top:7px;border:1px solid #ccc;border-radius:5px;width:48px;height:48px;padding:8px;background:white;color:#555;box-shadow:0 0 5px rgba(0, 0, 0, 0.2)}.visibility-toggle.svelte-8ymctk.svelte-8ymctk:hover,.visibility-toggle.svelte-8ymctk.svelte-8ymctk:focus{background:#eee}.opener.svelte-8ymctk.svelte-8ymctk{right:10px}.closer.svelte-8ymctk.svelte-8ymctk{left:-326px}@keyframes svelte-8ymctk-rotateFromZero{from{transform:rotateZ(0deg)}to{transform:rotateZ(180deg)}}.icon.svelte-8ymctk.svelte-8ymctk{display:flex;height:100%;animation:svelte-8ymctk-rotateFromZero 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s 1\n      normal forwards}.closer.svelte-8ymctk .icon.svelte-8ymctk{animation-direction:reverse}.pane.svelte-8ymctk.svelte-8ymctk{flex-grow:2;overflow-x:hidden;overflow-y:scroll;background:#fefefe;padding:20px;border-left:1px solid #ccc;box-shadow:-1px 0 5px rgba(0, 0, 0, 0.2);box-sizing:border-box;width:280px}.secondary-pane.svelte-8ymctk.svelte-8ymctk{background:#fefefe;overflow-y:scroll}.debug-panel.svelte-8ymctk button,.debug-panel.svelte-8ymctk select{cursor:pointer;font-size:14px;font-family:monospace}.debug-panel.svelte-8ymctk select{background:#eee;border:1px solid #bbb;color:#555;padding:3px;border-radius:3px}.debug-panel.svelte-8ymctk section{margin-bottom:20px}.debug-panel.svelte-8ymctk .screen-reader-only{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px}");
} // (194:2) {:else}


function create_else_block$4(ctx) {
  let div1;
  let button;
  let span;
  let chevron;
  let button_intro;
  let button_outro;
  let t0;
  let menu;
  let t1;
  let div0;
  let switch_instance;
  let t2;
  let div1_transition;
  let current;
  let mounted;
  let dispose;
  chevron = new FaChevronRight({});
  menu = new Menu({
    props: {
      panes:
      /*panes*/
      ctx[6],
      pane:
      /*pane*/
      ctx[2]
    }
  });
  menu.$on("change",
  /*MenuChange*/
  ctx[8]);
  var switch_value =
  /*panes*/
  ctx[6][
  /*pane*/
  ctx[2]].component;

  function switch_props(ctx) {
    return {
      props: {
        client:
        /*client*/
        ctx[4],
        clientManager:
        /*clientManager*/
        ctx[0],
        ToggleVisibility:
        /*ToggleVisibility*/
        ctx[9]
      }
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }

  let if_block =
  /*$secondaryPane*/
  ctx[5] && create_if_block_1$7(ctx);
  return {
    c() {
      div1 = element("div");
      button = element("button");
      span = element("span");
      create_component(chevron.$$.fragment);
      t0 = space();
      create_component(menu.$$.fragment);
      t1 = space();
      div0 = element("div");
      if (switch_instance) create_component(switch_instance.$$.fragment);
      t2 = space();
      if (if_block) if_block.c();
      attr(span, "class", "icon svelte-8ymctk");
      attr(span, "aria-hidden", "true");
      attr(button, "class", "visibility-toggle closer svelte-8ymctk");
      attr(button, "title", "Hide Debug Panel");
      attr(div0, "class", "pane svelte-8ymctk");
      attr(div0, "role", "region");
      attr(div0, "aria-label",
      /*pane*/
      ctx[2]);
      attr(div0, "tabindex", "-1");
      attr(div1, "class", "panel svelte-8ymctk");
    },

    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, button);
      append(button, span);
      mount_component(chevron, span, null);
      append(div1, t0);
      mount_component(menu, div1, null);
      append(div1, t1);
      append(div1, div0);

      if (switch_instance) {
        mount_component(switch_instance, div0, null);
      }
      /*div0_binding*/


      ctx[15](div0);
      append(div1, t2);
      if (if_block) if_block.m(div1, null);
      current = true;

      if (!mounted) {
        dispose = listen(button, "click",
        /*ToggleVisibility*/
        ctx[9]);
        mounted = true;
      }
    },

    p(new_ctx, dirty) {
      ctx = new_ctx;
      const menu_changes = {};
      if (dirty &
      /*pane*/
      4) menu_changes.pane =
      /*pane*/
      ctx[2];
      menu.$set(menu_changes);
      const switch_instance_changes = {};
      if (dirty &
      /*client*/
      16) switch_instance_changes.client =
      /*client*/
      ctx[4];
      if (dirty &
      /*clientManager*/
      1) switch_instance_changes.clientManager =
      /*clientManager*/
      ctx[0];

      if (switch_value !== (switch_value =
      /*panes*/
      ctx[6][
      /*pane*/
      ctx[2]].component)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, div0, null);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }

      if (!current || dirty &
      /*pane*/
      4) {
        attr(div0, "aria-label",
        /*pane*/
        ctx[2]);
      }

      if (
      /*$secondaryPane*/
      ctx[5]) {
        if (if_block) {
          if_block.p(ctx, dirty);

          if (dirty &
          /*$secondaryPane*/
          32) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block_1$7(ctx);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div1, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },

    i(local) {
      if (current) return;
      transition_in(chevron.$$.fragment, local);
      add_render_callback(() => {
        if (button_outro) button_outro.end(1);
        button_intro = create_in_transition(button,
        /*receive*/
        ctx[13], {
          key: 'toggle'
        });
        button_intro.start();
      });
      transition_in(menu.$$.fragment, local);
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      transition_in(if_block);
      add_render_callback(() => {
        if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fly, {
          x: 400,
          ...
          /*transitionOpts*/
          ctx[11]
        }, true);
        div1_transition.run(1);
      });
      current = true;
    },

    o(local) {
      transition_out(chevron.$$.fragment, local);
      if (button_intro) button_intro.invalidate();
      button_outro = create_out_transition(button,
      /*send*/
      ctx[12], {
        key: 'toggle'
      });
      transition_out(menu.$$.fragment, local);
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      transition_out(if_block);
      if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fly, {
        x: 400,
        ...
        /*transitionOpts*/
        ctx[11]
      }, false);
      div1_transition.run(0);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(div1);
      destroy_component(chevron);
      if (detaching && button_outro) button_outro.end();
      destroy_component(menu);
      if (switch_instance) destroy_component(switch_instance);
      /*div0_binding*/

      ctx[15](null);
      if (if_block) if_block.d();
      if (detaching && div1_transition) div1_transition.end();
      mounted = false;
      dispose();
    }

  };
} // (182:2) {#if !visible}


function create_if_block$e(ctx) {
  let button;
  let span;
  let chevron;
  let button_intro;
  let button_outro;
  let current;
  let mounted;
  let dispose;
  chevron = new FaChevronRight({});
  return {
    c() {
      button = element("button");
      span = element("span");
      create_component(chevron.$$.fragment);
      attr(span, "class", "icon svelte-8ymctk");
      attr(span, "aria-hidden", "true");
      attr(button, "class", "visibility-toggle opener svelte-8ymctk");
      attr(button, "title", "Show Debug Panel");
    },

    m(target, anchor) {
      insert(target, button, anchor);
      append(button, span);
      mount_component(chevron, span, null);
      current = true;

      if (!mounted) {
        dispose = listen(button, "click",
        /*ToggleVisibility*/
        ctx[9]);
        mounted = true;
      }
    },

    p: noop,

    i(local) {
      if (current) return;
      transition_in(chevron.$$.fragment, local);
      add_render_callback(() => {
        if (button_outro) button_outro.end(1);
        button_intro = create_in_transition(button,
        /*receive*/
        ctx[13], {
          key: 'toggle'
        });
        button_intro.start();
      });
      current = true;
    },

    o(local) {
      transition_out(chevron.$$.fragment, local);
      if (button_intro) button_intro.invalidate();
      button_outro = create_out_transition(button,
      /*send*/
      ctx[12], {
        key: 'toggle'
      });
      current = false;
    },

    d(detaching) {
      if (detaching) detach(button);
      destroy_component(chevron);
      if (detaching && button_outro) button_outro.end();
      mounted = false;
      dispose();
    }

  };
} // (222:6) {#if $secondaryPane}


function create_if_block_1$7(ctx) {
  let div;
  let switch_instance;
  let current;
  var switch_value =
  /*$secondaryPane*/
  ctx[5].component;

  function switch_props(ctx) {
    return {
      props: {
        metadata:
        /*$secondaryPane*/
        ctx[5].metadata
      }
    };
  }

  if (switch_value) {
    switch_instance = new switch_value(switch_props(ctx));
  }

  return {
    c() {
      div = element("div");
      if (switch_instance) create_component(switch_instance.$$.fragment);
      attr(div, "class", "secondary-pane svelte-8ymctk");
    },

    m(target, anchor) {
      insert(target, div, anchor);

      if (switch_instance) {
        mount_component(switch_instance, div, null);
      }

      current = true;
    },

    p(ctx, dirty) {
      const switch_instance_changes = {};
      if (dirty &
      /*$secondaryPane*/
      32) switch_instance_changes.metadata =
      /*$secondaryPane*/
      ctx[5].metadata;

      if (switch_value !== (switch_value =
      /*$secondaryPane*/
      ctx[5].component)) {
        if (switch_instance) {
          group_outros();
          const old_component = switch_instance;
          transition_out(old_component.$$.fragment, 1, 0, () => {
            destroy_component(old_component, 1);
          });
          check_outros();
        }

        if (switch_value) {
          switch_instance = new switch_value(switch_props(ctx));
          create_component(switch_instance.$$.fragment);
          transition_in(switch_instance.$$.fragment, 1);
          mount_component(switch_instance, div, null);
        } else {
          switch_instance = null;
        }
      } else if (switch_value) {
        switch_instance.$set(switch_instance_changes);
      }
    },

    i(local) {
      if (current) return;
      if (switch_instance) transition_in(switch_instance.$$.fragment, local);
      current = true;
    },

    o(local) {
      if (switch_instance) transition_out(switch_instance.$$.fragment, local);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(div);
      if (switch_instance) destroy_component(switch_instance);
    }

  };
}

function create_fragment$z(ctx) {
  let section;
  let current_block_type_index;
  let if_block;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block$e, create_else_block$4];
  const if_blocks = [];

  function select_block_type(ctx, dirty) {
    if (!
    /*visible*/
    ctx[3]) return 0;
    return 1;
  }

  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  return {
    c() {
      section = element("section");
      if_block.c();
      attr(section, "aria-label", "boardgame.io Debug Panel");
      attr(section, "class", "debug-panel svelte-8ymctk");
    },

    m(target, anchor) {
      insert(target, section, anchor);
      if_blocks[current_block_type_index].m(section, null);
      current = true;

      if (!mounted) {
        dispose = listen(window, "keypress",
        /*Keypress*/
        ctx[10]);
        mounted = true;
      }
    },

    p(ctx, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx);

      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];

        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
          if_block.c();
        } else {
          if_block.p(ctx, dirty);
        }

        transition_in(if_block, 1);
        if_block.m(section, null);
      }
    },

    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },

    o(local) {
      transition_out(if_block);
      current = false;
    },

    d(detaching) {
      if (detaching) detach(section);
      if_blocks[current_block_type_index].d();
      mounted = false;
      dispose();
    }

  };
}

function instance$z($$self, $$props, $$invalidate) {
  let client;

  let $clientManager,
      $$unsubscribe_clientManager = noop,
      $$subscribe_clientManager = () => ($$unsubscribe_clientManager(), $$unsubscribe_clientManager = subscribe(clientManager, $$value => $$invalidate(14, $clientManager = $$value)), clientManager);

  let $secondaryPane;
  $$self.$$.on_destroy.push(() => $$unsubscribe_clientManager());
  let {
    clientManager
  } = $$props;
  $$subscribe_clientManager();
  const panes = {
    main: {
      label: 'Main',
      shortcut: 'm',
      component: Main
    },
    log: {
      label: 'Log',
      shortcut: 'l',
      component: Log
    },
    info: {
      label: 'Info',
      shortcut: 'i',
      component: Info
    },
    ai: {
      label: 'AI',
      shortcut: 'a',
      component: AI
    }
  };
  const disableHotkeys = writable(false);
  const secondaryPane = writable(null);
  component_subscribe($$self, secondaryPane, value => $$invalidate(5, $secondaryPane = value));
  setContext('hotkeys', {
    disableHotkeys
  });
  setContext('secondaryPane', {
    secondaryPane
  });
  let paneDiv;
  let pane = 'main';

  function MenuChange(e) {
    $$invalidate(2, pane = e.detail);
    paneDiv.focus();
  } // Toggle debugger visibilty


  function ToggleVisibility() {
    $$invalidate(3, visible = !visible);
  }

  let visible = true;

  function Keypress(e) {
    if (e.key == '.') {
      ToggleVisibility();
      return;
    } // Set displayed pane


    if (!visible) return;
    Object.entries(panes).forEach(([key, {
      shortcut
    }]) => {
      if (e.key == shortcut) {
        $$invalidate(2, pane = key);
      }
    });
  }

  const transitionOpts = {
    duration: 150,
    easing: cubicOut
  };
  const [send, receive] = crossfade(transitionOpts);

  function div0_binding($$value) {
    binding_callbacks[$$value ? 'unshift' : 'push'](() => {
      paneDiv = $$value;
      $$invalidate(1, paneDiv);
    });
  }

  $$self.$$set = $$props => {
    if ('clientManager' in $$props) $$subscribe_clientManager($$invalidate(0, clientManager = $$props.clientManager));
  };

  $$self.$$.update = () => {
    if ($$self.$$.dirty &
    /*$clientManager*/
    16384) {
      $$invalidate(4, client = $clientManager.client);
    }
  };

  return [clientManager, paneDiv, pane, visible, client, $secondaryPane, panes, secondaryPane, MenuChange, ToggleVisibility, Keypress, transitionOpts, send, receive, $clientManager, div0_binding];
}

class Debug extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$z, create_fragment$z, safe_not_equal, {
      clientManager: 0
    }, add_css$q);
  }

}

exports.D = Debug;
},{"./turn-order-406c4349.js":"node_modules/boardgame.io/dist/esm/turn-order-406c4349.js","./reducer-efc3ec3e.js":"node_modules/boardgame.io/dist/esm/reducer-efc3ec3e.js","flatted":"node_modules/flatted/esm/index.js","./ai-7a5eea10.js":"node_modules/boardgame.io/dist/esm/ai-7a5eea10.js"}],"node_modules/@babel/runtime/helpers/esm/defineProperty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _defineProperty;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
},{}],"node_modules/@babel/runtime/helpers/esm/objectSpread2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _objectSpread2;

var _defineProperty = _interopRequireDefault(require("./defineProperty.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        (0, _defineProperty.default)(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
},{"./defineProperty.js":"node_modules/@babel/runtime/helpers/esm/defineProperty.js"}],"node_modules/redux/es/redux.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyMiddleware = applyMiddleware;
exports.bindActionCreators = bindActionCreators;
exports.combineReducers = combineReducers;
exports.compose = compose;
exports.createStore = createStore;
exports.__DO_NOT_USE__ActionTypes = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
 *
 * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
 * during build.
 * @param {number} code
 */
function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
} // Inlined version of the `symbol-observable` polyfill


var $$observable = function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
}();
/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */


var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};
/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */

exports.__DO_NOT_USE__ActionTypes = ActionTypes;

function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
} // Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of


function miniKindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';
  var type = typeof val;

  switch (type) {
    case 'boolean':
    case 'string':
    case 'number':
    case 'symbol':
    case 'function':
      {
        return type;
      }
  }

  if (Array.isArray(val)) return 'array';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  var constructorName = ctorName(val);

  switch (constructorName) {
    case 'Symbol':
    case 'Promise':
    case 'WeakMap':
    case 'WeakSet':
    case 'Map':
    case 'Set':
      return constructorName;
  } // other


  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
}

function ctorName(val) {
  return typeof val.constructor === 'function' ? val.constructor.name : null;
}

function isError(val) {
  return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
}

function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
}

function kindOf(val) {
  var typeOfVal = typeof val;

  if ("development" !== 'production') {
    typeOfVal = miniKindOf(val);
  }

  return typeOfVal;
}
/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */


function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error("development" === "production" ? formatProdErrorMessage(0) : 'It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error("development" === "production" ? formatProdErrorMessage(1) : "Expected the enhancer to be a function. Instead, received: '" + kindOf(enhancer) + "'");
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error("development" === "production" ? formatProdErrorMessage(2) : "Expected the root reducer to be a function. Instead, received: '" + kindOf(reducer) + "'");
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error("development" === "production" ? formatProdErrorMessage(3) : 'You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error("development" === "production" ? formatProdErrorMessage(4) : "Expected the listener to be a function. Instead, received: '" + kindOf(listener) + "'");
    }

    if (isDispatching) {
      throw new Error("development" === "production" ? formatProdErrorMessage(5) : 'You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api/store#subscribelistener for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error("development" === "production" ? formatProdErrorMessage(6) : 'You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api/store#subscribelistener for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing ???what changed???. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error("development" === "production" ? formatProdErrorMessage(7) : "Actions must be plain objects. Instead, the actual type was: '" + kindOf(action) + "'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");
    }

    if (typeof action.type === 'undefined') {
      throw new Error("development" === "production" ? formatProdErrorMessage(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    }

    if (isDispatching) {
      throw new Error("development" === "production" ? formatProdErrorMessage(9) : 'Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error("development" === "production" ? formatProdErrorMessage(10) : "Expected the nextReducer to be a function. Instead, received: '" + kindOf(nextReducer));
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new Error("development" === "production" ? formatProdErrorMessage(11) : "Expected the observer to be an object. Instead, received: '" + kindOf(observer) + "'");
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[$$observable] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */


function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + kindOf(inputState) + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("development" === "production" ? formatProdErrorMessage(12) : "The slice reducer for key \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("development" === "production" ? formatProdErrorMessage(13) : "The slice reducer for key \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle '" + ActionTypes.INIT + "' or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if ("development" !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if ("development" !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if ("development" !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var actionType = action && action.type;
        throw new Error("development" === "production" ? formatProdErrorMessage(14) : "When called with an action of type " + (actionType ? "\"" + String(actionType) + "\"" : '(unknown type)') + ", the slice reducer for key \"" + _key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.");
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("development" === "production" ? formatProdErrorMessage(16) : "bindActionCreators expected an object or a function, but instead received: '" + kindOf(actionCreators) + "'. " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */


function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}
/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */


function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error("development" === "production" ? formatProdErrorMessage(15) : 'Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, store), {}, {
        dispatch: _dispatch
      });
    };
  };
}
/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */


function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}
},{"@babel/runtime/helpers/esm/objectSpread2":"node_modules/@babel/runtime/helpers/esm/objectSpread2.js"}],"node_modules/boardgame.io/dist/esm/initialize-8da88d04.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.I = InitializeGame;

var _turnOrder406c = require("./turn-order-406c4349.js");

var _reducerEfc3ec3e = require("./reducer-efc3ec3e.js");

/*
 * Copyright 2020 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Creates the initial game state.
 */
function InitializeGame({
  game,
  numPlayers,
  setupData
}) {
  game = (0, _reducerEfc3ec3e.P)(game);

  if (!numPlayers) {
    numPlayers = 2;
  }

  const ctx = game.flow.ctx(numPlayers);
  let state = {
    // User managed state.
    G: {},
    // Framework managed state.
    ctx,
    // Plugin related state.
    plugins: {}
  }; // Run plugins over initial state.

  state = (0, _turnOrder406c.t)(state, {
    game
  });
  state = (0, _turnOrder406c.m)(state, {
    game,
    playerID: undefined
  });
  const enhancedCtx = (0, _turnOrder406c.E)(state);
  state.G = game.setup(enhancedCtx, setupData);
  let initial = { ...state,
    // List of {G, ctx} pairs that can be undone.
    _undo: [],
    // List of {G, ctx} pairs that can be redone.
    _redo: [],
    // A monotonically non-decreasing ID to ensure that
    // state updates are only allowed from clients that
    // are at the same version that the server.
    _stateID: 0
  };
  initial = game.flow.init(initial);
  [initial] = (0, _turnOrder406c.q)(initial, {
    game
  }); // Initialize undo stack.

  if (!game.disableUndo) {
    initial._undo = [{
      G: initial.G,
      ctx: initial.ctx,
      plugins: initial.plugins
    }];
  }

  return initial;
}
},{"./turn-order-406c4349.js":"node_modules/boardgame.io/dist/esm/turn-order-406c4349.js","./reducer-efc3ec3e.js":"node_modules/boardgame.io/dist/esm/reducer-efc3ec3e.js"}],"node_modules/boardgame.io/dist/esm/transport-ce07b771.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.T = void 0;

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
class Transport {
  constructor({
    transportDataCallback,
    gameName,
    playerID,
    matchID,
    credentials,
    numPlayers
  }) {
    /** Callback to let the client know when the connection status has changed. */
    this.connectionStatusCallback = () => {};

    this.isConnected = false;
    this.transportDataCallback = transportDataCallback;
    this.gameName = gameName || 'default';
    this.playerID = playerID || null;
    this.matchID = matchID || 'default';
    this.credentials = credentials;
    this.numPlayers = numPlayers || 2;
  }
  /** Subscribe to connection state changes. */


  subscribeToConnectionStatus(fn) {
    this.connectionStatusCallback = fn;
  }
  /** Transport implementations should call this when they connect/disconnect. */


  setConnectionStatus(isConnected) {
    this.isConnected = isConnected;
    this.connectionStatusCallback();
  }
  /** Transport implementations should call this when they receive data from a master. */


  notifyClient(data) {
    this.transportDataCallback(data);
  }

}

exports.T = Transport;
},{}],"node_modules/boardgame.io/dist/esm/client-48f68c72.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.C = Client;

var _nonSecure = require("nanoid/non-secure");

var _DebugF39f426b = require("./Debug-f39f426b.js");

var _redux = require("redux");

var _turnOrder406c = require("./turn-order-406c4349.js");

var _reducerEfc3ec3e = require("./reducer-efc3ec3e.js");

var _initialize8da88d = require("./initialize-8da88d04.js");

var _transportCe07b = require("./transport-ce07b771.js");

/**
 * This class doesn???t do anything, but simplifies the client class by providing
 * dummy functions to call, so we don???t need to mock them in the client.
 */
class DummyImpl extends _transportCe07b.T {
  connect() {}

  disconnect() {}

  sendAction() {}

  sendChatMessage() {}

  requestSync() {}

  updateCredentials() {}

  updateMatchID() {}

  updatePlayerID() {}

}

const DummyTransport = opts => new DummyImpl(opts);
/**
 * Class to manage boardgame.io clients and limit debug panel rendering.
 */


class ClientManager {
  constructor() {
    this.debugPanel = null;
    this.currentClient = null;
    this.clients = new Map();
    this.subscribers = new Map();
  }
  /**
   * Register a client with the client manager.
   */


  register(client) {
    // Add client to clients map.
    this.clients.set(client, client); // Mount debug for this client (no-op if another debug is already mounted).

    this.mountDebug(client);
    this.notifySubscribers();
  }
  /**
   * Unregister a client from the client manager.
   */


  unregister(client) {
    // Remove client from clients map.
    this.clients.delete(client);

    if (this.currentClient === client) {
      // If the removed client owned the debug panel, unmount it.
      this.unmountDebug(); // Mount debug panel for next available client.

      for (const [client] of this.clients) {
        if (this.debugPanel) break;
        this.mountDebug(client);
      }
    }

    this.notifySubscribers();
  }
  /**
   * Subscribe to the client manager state.
   * Calls the passed callback each time the current client changes or a client
   * registers/unregisters.
   * Returns a function to unsubscribe from the state updates.
   */


  subscribe(callback) {
    const id = Symbol();
    this.subscribers.set(id, callback);
    callback(this.getState());
    return () => {
      this.subscribers.delete(id);
    };
  }
  /**
   * Switch to a client with a matching playerID.
   */


  switchPlayerID(playerID) {
    // For multiplayer clients, try switching control to a different client
    // that is using the same transport layer.
    if (this.currentClient.multiplayer) {
      for (const [client] of this.clients) {
        if (client.playerID === playerID && client.debugOpt !== false && client.multiplayer === this.currentClient.multiplayer) {
          this.switchToClient(client);
          return;
        }
      }
    } // If no client matches, update the playerID for the current client.


    this.currentClient.updatePlayerID(playerID);
    this.notifySubscribers();
  }
  /**
   * Set the passed client as the active client for debugging.
   */


  switchToClient(client) {
    if (client === this.currentClient) return;
    this.unmountDebug();
    this.mountDebug(client);
    this.notifySubscribers();
  }
  /**
   * Notify all subscribers of changes to the client manager state.
   */


  notifySubscribers() {
    const arg = this.getState();
    this.subscribers.forEach(cb => {
      cb(arg);
    });
  }
  /**
   * Get the client manager state.
   */


  getState() {
    return {
      client: this.currentClient,
      debuggableClients: this.getDebuggableClients()
    };
  }
  /**
   * Get an array of the registered clients that haven???t disabled the debug panel.
   */


  getDebuggableClients() {
    return [...this.clients.values()].filter(client => client.debugOpt !== false);
  }
  /**
   * Mount the debug panel using the passed client.
   */


  mountDebug(client) {
    if (client.debugOpt === false || this.debugPanel !== null || typeof document === 'undefined') {
      return;
    }

    let DebugImpl;
    let target = document.body;

    if ("development" !== 'production') {
      DebugImpl = _DebugF39f426b.D;
    }

    if (client.debugOpt && client.debugOpt !== true) {
      DebugImpl = client.debugOpt.impl || DebugImpl;
      target = client.debugOpt.target || target;
    }

    if (DebugImpl) {
      this.currentClient = client;
      this.debugPanel = new DebugImpl({
        target,
        props: {
          clientManager: this
        }
      });
    }
  }
  /**
   * Unmount the debug panel.
   */


  unmountDebug() {
    this.debugPanel.$destroy();
    this.debugPanel = null;
    this.currentClient = null;
  }

}
/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * Global client manager instance that all clients register with.
 */


const GlobalClientManager = new ClientManager();
/**
 * Standardise the passed playerID, using currentPlayer if appropriate.
 */

function assumedPlayerID(playerID, store, multiplayer) {
  // In singleplayer mode, if the client does not have a playerID
  // associated with it, we attach the currentPlayer as playerID.
  if (!multiplayer && (playerID === null || playerID === undefined)) {
    const state = store.getState();
    playerID = state.ctx.currentPlayer;
  }

  return playerID;
}
/**
 * createDispatchers
 *
 * Create action dispatcher wrappers with bound playerID and credentials
 */


function createDispatchers(storeActionType, innerActionNames, store, playerID, credentials, multiplayer) {
  const dispatchers = {};

  for (const name of innerActionNames) {
    dispatchers[name] = (...args) => {
      const action = _turnOrder406c.A[storeActionType](name, args, assumedPlayerID(playerID, store, multiplayer), credentials);

      store.dispatch(action);
    };
  }

  return dispatchers;
} // Creates a set of dispatchers to make moves.


const createMoveDispatchers = createDispatchers.bind(null, 'makeMove'); // Creates a set of dispatchers to dispatch game flow events.

const createEventDispatchers = createDispatchers.bind(null, 'gameEvent'); // Creates a set of dispatchers to dispatch actions to plugins.

const createPluginDispatchers = createDispatchers.bind(null, 'plugin');
/**
 * Implementation of Client (see below).
 */

class _ClientImpl {
  constructor({
    game,
    debug,
    numPlayers,
    multiplayer,
    matchID: matchID,
    playerID,
    credentials,
    enhancer
  }) {
    this.game = (0, _reducerEfc3ec3e.P)(game);
    this.playerID = playerID;
    this.matchID = matchID || 'default';
    this.credentials = credentials;
    this.multiplayer = multiplayer;
    this.debugOpt = debug;
    this.manager = GlobalClientManager;
    this.gameStateOverride = null;
    this.subscribers = {};
    this._running = false;
    this.reducer = (0, _reducerEfc3ec3e.C)({
      game: this.game,
      isClient: multiplayer !== undefined
    });
    this.initialState = null;

    if (!multiplayer) {
      this.initialState = (0, _initialize8da88d.I)({
        game: this.game,
        numPlayers
      });
    }

    this.reset = () => {
      this.store.dispatch((0, _turnOrder406c.u)(this.initialState));
    };

    this.undo = () => {
      const undo$1 = (0, _turnOrder406c.v)(assumedPlayerID(this.playerID, this.store, this.multiplayer), this.credentials);
      this.store.dispatch(undo$1);
    };

    this.redo = () => {
      const redo$1 = (0, _turnOrder406c.w)(assumedPlayerID(this.playerID, this.store, this.multiplayer), this.credentials);
      this.store.dispatch(redo$1);
    };

    this.log = [];
    /**
     * Middleware that manages the log object.
     * Reducers generate deltalogs, which are log events
     * that are the result of application of a single action.
     * The master may also send back a deltalog or the entire
     * log depending on the type of request.
     * The middleware below takes care of all these cases while
     * managing the log object.
     */

    const LogMiddleware = store => next => action => {
      const result = next(action);
      const state = store.getState();

      switch (action.type) {
        case _turnOrder406c.M:
        case _turnOrder406c.o:
        case _turnOrder406c.h:
        case _turnOrder406c.R:
          {
            const deltalog = state.deltalog;
            this.log = [...this.log, ...deltalog];
            break;
          }

        case _turnOrder406c.l:
          {
            this.log = [];
            break;
          }

        case _turnOrder406c.P:
        case _turnOrder406c.k:
          {
            let id = -1;

            if (this.log.length > 0) {
              id = this.log[this.log.length - 1]._stateID;
            }

            let deltalog = action.deltalog || []; // Filter out actions that are already present
            // in the current log. This may occur when the
            // client adds an entry to the log followed by
            // the update from the master here.

            deltalog = deltalog.filter(l => l._stateID > id);
            this.log = [...this.log, ...deltalog];
            break;
          }

        case _turnOrder406c.j:
          {
            this.initialState = action.initialState;
            this.log = action.log || [];
            break;
          }
      }

      return result;
    };
    /**
     * Middleware that intercepts actions and sends them to the master,
     * which keeps the authoritative version of the state.
     */


    const TransportMiddleware = store => next => action => {
      const baseState = store.getState();
      const result = next(action);

      if (!('clientOnly' in action) && action.type !== _turnOrder406c.p) {
        this.transport.sendAction(baseState, action);
      }

      return result;
    };
    /**
     * Middleware that intercepts actions and invokes the subscription callback.
     */


    const SubscriptionMiddleware = () => next => action => {
      const result = next(action);
      this.notifySubscribers();
      return result;
    };

    const middleware = (0, _redux.applyMiddleware)(_reducerEfc3ec3e.T, SubscriptionMiddleware, TransportMiddleware, LogMiddleware);
    enhancer = enhancer !== undefined ? (0, _redux.compose)(middleware, enhancer) : middleware;
    this.store = (0, _redux.createStore)(this.reducer, this.initialState, enhancer);
    if (!multiplayer) multiplayer = DummyTransport;
    this.transport = multiplayer({
      transportDataCallback: data => this.receiveTransportData(data),
      gameKey: game,
      game: this.game,
      matchID,
      playerID,
      credentials,
      gameName: this.game.name,
      numPlayers
    });
    this.createDispatchers();
    this.chatMessages = [];

    this.sendChatMessage = payload => {
      this.transport.sendChatMessage(this.matchID, {
        id: (0, _nonSecure.nanoid)(7),
        sender: this.playerID,
        payload: payload
      });
    };
  }
  /** Handle incoming match data from a multiplayer transport. */


  receiveMatchData(matchData) {
    this.matchData = matchData;
    this.notifySubscribers();
  }
  /** Handle an incoming chat message from a multiplayer transport. */


  receiveChatMessage(message) {
    this.chatMessages = [...this.chatMessages, message];
    this.notifySubscribers();
  }
  /** Handle all incoming updates from a multiplayer transport. */


  receiveTransportData(data) {
    const [matchID] = data.args;
    if (matchID !== this.matchID) return;

    switch (data.type) {
      case 'sync':
        {
          const [, syncInfo] = data.args;
          const action = (0, _turnOrder406c.s)(syncInfo);
          this.receiveMatchData(syncInfo.filteredMetadata);
          this.store.dispatch(action);
          break;
        }

      case 'update':
        {
          const [, state, deltalog] = data.args;
          const currentState = this.store.getState();

          if (state._stateID >= currentState._stateID) {
            const action = (0, _turnOrder406c.z)(state, deltalog);
            this.store.dispatch(action);
          }

          break;
        }

      case 'patch':
        {
          const [, prevStateID, stateID, patch$1, deltalog] = data.args;

          const currentStateID = this.store.getState()._stateID;

          if (prevStateID !== currentStateID) break;
          const action = (0, _turnOrder406c.y)(prevStateID, stateID, patch$1, deltalog);
          this.store.dispatch(action); // Emit sync if patch apply failed.

          if (this.store.getState()._stateID === currentStateID) {
            this.transport.requestSync();
          }

          break;
        }

      case 'matchData':
        {
          const [, matchData] = data.args;
          this.receiveMatchData(matchData);
          break;
        }

      case 'chat':
        {
          const [, chatMessage] = data.args;
          this.receiveChatMessage(chatMessage);
          break;
        }
    }
  }

  notifySubscribers() {
    Object.values(this.subscribers).forEach(fn => fn(this.getState()));
  }

  overrideGameState(state) {
    this.gameStateOverride = state;
    this.notifySubscribers();
  }

  start() {
    this.transport.connect();
    this._running = true;
    this.manager.register(this);
  }

  stop() {
    this.transport.disconnect();
    this._running = false;
    this.manager.unregister(this);
  }

  subscribe(fn) {
    const id = Object.keys(this.subscribers).length;
    this.subscribers[id] = fn;
    this.transport.subscribeToConnectionStatus(() => this.notifySubscribers());

    if (this._running || !this.multiplayer) {
      fn(this.getState());
    } // Return a handle that allows the caller to unsubscribe.


    return () => {
      delete this.subscribers[id];
    };
  }

  getInitialState() {
    return this.initialState;
  }

  getState() {
    let state = this.store.getState();

    if (this.gameStateOverride !== null) {
      state = this.gameStateOverride;
    } // This is the state before a sync with the game master.


    if (state === null) {
      return state;
    } // isActive.


    let isActive = true;
    const isPlayerActive = this.game.flow.isPlayerActive(state.G, state.ctx, this.playerID);

    if (this.multiplayer && !isPlayerActive) {
      isActive = false;
    }

    if (!this.multiplayer && this.playerID !== null && this.playerID !== undefined && !isPlayerActive) {
      isActive = false;
    }

    if (state.ctx.gameover !== undefined) {
      isActive = false;
    } // Secrets are normally stripped on the server,
    // but we also strip them here so that game developers
    // can see their effects while prototyping.
    // Do not strip again if this is a multiplayer game
    // since the server has already stripped secret info. (issue #818)


    if (!this.multiplayer) {
      state = { ...state,
        G: this.game.playerView(state.G, state.ctx, this.playerID),
        plugins: (0, _turnOrder406c.x)(state, this)
      };
    } // Combine into return value.


    return { ...state,
      log: this.log,
      isActive,
      isConnected: this.transport.isConnected
    };
  }

  createDispatchers() {
    this.moves = createMoveDispatchers(this.game.moveNames, this.store, this.playerID, this.credentials, this.multiplayer);
    this.events = createEventDispatchers(this.game.flow.enabledEventNames, this.store, this.playerID, this.credentials, this.multiplayer);
    this.plugins = createPluginDispatchers(this.game.pluginNames, this.store, this.playerID, this.credentials, this.multiplayer);
  }

  updatePlayerID(playerID) {
    this.playerID = playerID;
    this.createDispatchers();
    this.transport.updatePlayerID(playerID);
    this.notifySubscribers();
  }

  updateMatchID(matchID) {
    this.matchID = matchID;
    this.createDispatchers();
    this.transport.updateMatchID(matchID);
    this.notifySubscribers();
  }

  updateCredentials(credentials) {
    this.credentials = credentials;
    this.createDispatchers();
    this.transport.updateCredentials(credentials);
    this.notifySubscribers();
  }

}
/**
 * Client
 *
 * boardgame.io JS client.
 *
 * @param {...object} game - The return value of `Game`.
 * @param {...object} numPlayers - The number of players.
 * @param {...object} multiplayer - Set to a falsy value or a transportFactory, e.g., SocketIO()
 * @param {...object} matchID - The matchID that you want to connect to.
 * @param {...object} playerID - The playerID associated with this client.
 * @param {...string} credentials - The authentication credentials associated with this client.
 *
 * Returns:
 *   A JS object that provides an API to interact with the
 *   game by dispatching moves and events.
 */


function Client(opts) {
  return new _ClientImpl(opts);
}
},{"nanoid/non-secure":"node_modules/nanoid/non-secure/index.js","./Debug-f39f426b.js":"node_modules/boardgame.io/dist/esm/Debug-f39f426b.js","redux":"node_modules/redux/es/redux.js","./turn-order-406c4349.js":"node_modules/boardgame.io/dist/esm/turn-order-406c4349.js","./reducer-efc3ec3e.js":"node_modules/boardgame.io/dist/esm/reducer-efc3ec3e.js","./initialize-8da88d04.js":"node_modules/boardgame.io/dist/esm/initialize-8da88d04.js","./transport-ce07b771.js":"node_modules/boardgame.io/dist/esm/transport-ce07b771.js"}],"node_modules/boardgame.io/dist/esm/client-5f57c3f2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.a = exports.L = void 0;

const assertString = (str, label) => {
  if (!str || typeof str !== 'string') {
    throw new Error("Expected ".concat(label, " string, got \"").concat(str, "\"."));
  }
};

const assertGameName = name => assertString(name, 'game name');

const assertMatchID = id => assertString(id, 'match ID');

const validateBody = (body, schema) => {
  if (!body) throw new Error("Expected body, got \u201C".concat(body, "\u201D."));

  for (const key in schema) {
    const propSchema = schema[key];
    const types = Array.isArray(propSchema) ? propSchema : [propSchema];
    const received = body[key];

    if (!types.includes(typeof received)) {
      const union = types.join('|');
      throw new TypeError("Expected body.".concat(key, " to be of type ").concat(union, ", got \u201C").concat(received, "\u201D."));
    }
  }
};

class LobbyClientError extends Error {
  constructor(message, details) {
    super(message);
    this.details = details;
  }

}
/**
 * Create a boardgame.io Lobby API client.
 * @param server The API???s base URL, e.g. `http://localhost:8000`.
 */


exports.a = LobbyClientError;

class LobbyClient {
  constructor({
    server = ''
  } = {}) {
    // strip trailing slash if passed
    this.server = server.replace(/\/$/, '');
  }

  async request(route, init) {
    const response = await fetch(this.server + route, init);

    if (!response.ok) {
      let details;

      try {
        details = await response.clone().json();
      } catch {
        try {
          details = await response.text();
        } catch (error) {
          details = error.message;
        }
      }

      throw new LobbyClientError("HTTP status ".concat(response.status), details);
    }

    return response.json();
  }

  async post(route, opts) {
    let init = {
      method: 'post',
      body: JSON.stringify(opts.body),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (opts.init) init = { ...init,
      ...opts.init,
      headers: { ...init.headers,
        ...opts.init.headers
      }
    };
    return this.request(route, init);
  }
  /**
   * Get a list of the game names available on this server.
   * @param  init Optional RequestInit interface to override defaults.
   * @return Array of game names.
   *
   * @example
   * lobbyClient.listGames()
   *   .then(console.log); // => ['chess', 'tic-tac-toe']
   */


  async listGames(init) {
    return this.request('/games', init);
  }
  /**
   * Get a list of the matches for a specific game type on the server.
   * @param  gameName The game to list for, e.g. 'tic-tac-toe'.
   * @param  where    Options to filter matches by update time or gameover state
   * @param  init     Optional RequestInit interface to override defaults.
   * @return Array of match metadata objects.
   *
   * @example
   * lobbyClient.listMatches('tic-tac-toe', where: { isGameover: false })
   *   .then(data => console.log(data.matches));
   * // => [
   * //   {
   * //     matchID: 'xyz',
   * //     gameName: 'tic-tac-toe',
   * //     players: [{ id: 0, name: 'Alice' }, { id: 1 }]
   * //   },
   * //   ...
   * // ]
   */


  async listMatches(gameName, where, init) {
    assertGameName(gameName);
    let query = '';

    if (where) {
      const queries = [];
      const {
        isGameover,
        updatedBefore,
        updatedAfter
      } = where;
      if (isGameover !== undefined) queries.push("isGameover=".concat(isGameover));
      if (updatedBefore) queries.push("updatedBefore=".concat(updatedBefore));
      if (updatedAfter) queries.push("updatedAfter=".concat(updatedAfter));
      if (queries.length > 0) query = '?' + queries.join('&');
    }

    return this.request("/games/".concat(gameName).concat(query), init);
  }
  /**
   * Get metadata for a specific match.
   * @param  gameName The match???s game type, e.g. 'tic-tac-toe'.
   * @param  matchID  Match ID for the match to fetch.
   * @param  init     Optional RequestInit interface to override defaults.
   * @return A match metadata object.
   *
   * @example
   * lobbyClient.getMatch('tic-tac-toe', 'xyz').then(console.log);
   * // => {
   * //   matchID: 'xyz',
   * //   gameName: 'tic-tac-toe',
   * //   players: [{ id: 0, name: 'Alice' }, { id: 1 }]
   * // }
   */


  async getMatch(gameName, matchID, init) {
    assertGameName(gameName);
    assertMatchID(matchID);
    return this.request("/games/".concat(gameName, "/").concat(matchID), init);
  }
  /**
   * Create a new match for a specific game type.
   * @param  gameName The game to create a match for, e.g. 'tic-tac-toe'.
   * @param  body     Options required to configure match creation.
   * @param  init     Optional RequestInit interface to override defaults.
   * @return An object containing the created `matchID`.
   *
   * @example
   * lobbyClient.createMatch('tic-tac-toe', { numPlayers: 2 })
   *   .then(console.log);
   * // => { matchID: 'xyz' }
   */


  async createMatch(gameName, body, init) {
    assertGameName(gameName);
    validateBody(body, {
      numPlayers: 'number'
    });
    return this.post("/games/".concat(gameName, "/create"), {
      body,
      init
    });
  }
  /**
   * Join a match using its matchID.
   * @param  gameName The match???s game type, e.g. 'tic-tac-toe'.
   * @param  matchID  Match ID for the match to join.
   * @param  body     Options required to join match.
   * @param  init     Optional RequestInit interface to override defaults.
   * @return Object containing `playerCredentials` for the player who joined.
   *
   * @example
   * lobbyClient.joinMatch('tic-tac-toe', 'xyz', {
   *   playerID: '1',
   *   playerName: 'Bob',
   * }).then(console.log);
   * // => { playerID: '1', playerCredentials: 'random-string' }
   */


  async joinMatch(gameName, matchID, body, init) {
    assertGameName(gameName);
    assertMatchID(matchID);
    validateBody(body, {
      playerID: ['string', 'undefined'],
      playerName: 'string'
    });
    return this.post("/games/".concat(gameName, "/").concat(matchID, "/join"), {
      body,
      init
    });
  }
  /**
   * Leave a previously joined match.
   * @param  gameName The match???s game type, e.g. 'tic-tac-toe'.
   * @param  matchID  Match ID for the match to leave.
   * @param  body     Options required to leave match.
   * @param  init     Optional RequestInit interface to override defaults.
   * @return Promise resolves if successful.
   *
   * @example
   * lobbyClient.leaveMatch('tic-tac-toe', 'xyz', {
   *   playerID: '1',
   *   credentials: 'credentials-returned-when-joining',
   * })
   *   .then(() => console.log('Left match.'))
   *   .catch(error => console.error('Error leaving match', error));
   */


  async leaveMatch(gameName, matchID, body, init) {
    assertGameName(gameName);
    assertMatchID(matchID);
    validateBody(body, {
      playerID: 'string',
      credentials: 'string'
    });
    await this.post("/games/".concat(gameName, "/").concat(matchID, "/leave"), {
      body,
      init
    });
  }
  /**
   * Update a player???s name or custom metadata.
   * @param  gameName The match???s game type, e.g. 'tic-tac-toe'.
   * @param  matchID  Match ID for the match to update.
   * @param  body     Options required to update player.
   * @param  init     Optional RequestInit interface to override defaults.
   * @return Promise resolves if successful.
   *
   * @example
   * lobbyClient.updatePlayer('tic-tac-toe', 'xyz', {
   *   playerID: '0',
   *   credentials: 'credentials-returned-when-joining',
   *   newName: 'Al',
   * })
   *   .then(() => console.log('Updated player data.'))
   *   .catch(error => console.error('Error updating data', error));
   */


  async updatePlayer(gameName, matchID, body, init) {
    assertGameName(gameName);
    assertMatchID(matchID);
    validateBody(body, {
      playerID: 'string',
      credentials: 'string'
    });
    await this.post("/games/".concat(gameName, "/").concat(matchID, "/update"), {
      body,
      init
    });
  }
  /**
   * Create a new match based on the configuration of the current match.
   * @param  gameName The match???s game type, e.g. 'tic-tac-toe'.
   * @param  matchID  Match ID for the match to play again.
   * @param  body     Options required to configure match.
   * @param  init     Optional RequestInit interface to override defaults.
   * @return Object containing `nextMatchID`.
   *
   * @example
   * lobbyClient.playAgain('tic-tac-toe', 'xyz', {
   *   playerID: '0',
   *   credentials: 'credentials-returned-when-joining',
   * })
   *   .then(({ nextMatchID }) => {
   *     return lobbyClient.joinMatch('tic-tac-toe', nextMatchID, {
   *       playerID: '0',
   *       playerName: 'Al',
   *     })
   *   })
   *   .then({ playerCredentials } => {
   *     console.log(playerCredentials);
   *   })
   *   .catch(console.error);
   */


  async playAgain(gameName, matchID, body, init) {
    assertGameName(gameName);
    assertMatchID(matchID);
    validateBody(body, {
      playerID: 'string',
      credentials: 'string'
    });
    return this.post("/games/".concat(gameName, "/").concat(matchID, "/playAgain"), {
      body,
      init
    });
  }

}

exports.L = LobbyClient;
},{}],"node_modules/boardgame.io/dist/esm/client.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Client", {
  enumerable: true,
  get: function () {
    return _client48f68c.C;
  }
});
Object.defineProperty(exports, "LobbyClient", {
  enumerable: true,
  get: function () {
    return _client5f57c3f.L;
  }
});
Object.defineProperty(exports, "LobbyClientError", {
  enumerable: true,
  get: function () {
    return _client5f57c3f.a;
  }
});

require("nanoid/non-secure");

require("./Debug-f39f426b.js");

require("redux");

require("./turn-order-406c4349.js");

require("immer");

require("lodash.isplainobject");

require("./reducer-efc3ec3e.js");

require("rfc6902");

require("./initialize-8da88d04.js");

require("./transport-ce07b771.js");

var _client48f68c = require("./client-48f68c72.js");

require("flatted");

require("setimmediate");

require("./ai-7a5eea10.js");

var _client5f57c3f = require("./client-5f57c3f2.js");
},{"nanoid/non-secure":"node_modules/nanoid/non-secure/index.js","./Debug-f39f426b.js":"node_modules/boardgame.io/dist/esm/Debug-f39f426b.js","redux":"node_modules/redux/es/redux.js","./turn-order-406c4349.js":"node_modules/boardgame.io/dist/esm/turn-order-406c4349.js","immer":"node_modules/immer/dist/immer.esm.js","lodash.isplainobject":"node_modules/lodash.isplainobject/index.js","./reducer-efc3ec3e.js":"node_modules/boardgame.io/dist/esm/reducer-efc3ec3e.js","rfc6902":"node_modules/rfc6902/index.js","./initialize-8da88d04.js":"node_modules/boardgame.io/dist/esm/initialize-8da88d04.js","./transport-ce07b771.js":"node_modules/boardgame.io/dist/esm/transport-ce07b771.js","./client-48f68c72.js":"node_modules/boardgame.io/dist/esm/client-48f68c72.js","flatted":"node_modules/flatted/esm/index.js","setimmediate":"node_modules/setimmediate/setImmediate.js","./ai-7a5eea10.js":"node_modules/boardgame.io/dist/esm/ai-7a5eea10.js","./client-5f57c3f2.js":"node_modules/boardgame.io/dist/esm/client-5f57c3f2.js"}],"node_modules/boardgame.io/dist/esm/core.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ActivePlayers", {
  enumerable: true,
  get: function () {
    return _turnOrder406c.D;
  }
});
Object.defineProperty(exports, "GameMethod", {
  enumerable: true,
  get: function () {
    return _turnOrder406c.G;
  }
});
Object.defineProperty(exports, "INVALID_MOVE", {
  enumerable: true,
  get: function () {
    return _turnOrder406c.n;
  }
});
Object.defineProperty(exports, "Stage", {
  enumerable: true,
  get: function () {
    return _turnOrder406c.S;
  }
});
Object.defineProperty(exports, "TurnOrder", {
  enumerable: true,
  get: function () {
    return _turnOrder406c.T;
  }
});
exports.PlayerView = void 0;

var _turnOrder406c = require("./turn-order-406c4349.js");

require("immer");

require("lodash.isplainobject");

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

/**
 * PlayerView reducers.
 */
const PlayerView = {
  /**
   * STRIP_SECRETS
   *
   * Reducer which removes a key named `secret` and
   * removes all the keys in `players`, except for the one
   * corresponding to the current playerID.
   */
  STRIP_SECRETS: (G, ctx, playerID) => {
    const r = { ...G
    };

    if (r.secret !== undefined) {
      delete r.secret;
    }

    if (r.players) {
      r.players = playerID ? {
        [playerID]: r.players[playerID]
      } : {};
    }

    return r;
  }
};
exports.PlayerView = PlayerView;
},{"./turn-order-406c4349.js":"node_modules/boardgame.io/dist/esm/turn-order-406c4349.js","immer":"node_modules/immer/dist/immer.esm.js","lodash.isplainobject":"node_modules/lodash.isplainobject/index.js"}],"src/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPossibleCells = getPossibleCells;
exports.getPossibleRevive = getPossibleRevive;
exports.movePiece = movePiece;
exports.revivePiece = revivePiece;
exports.isCheck = isCheck;
exports.isCheckMate = isCheckMate;
exports.Shogi = void 0;

var _core = require("boardgame.io/core");

const Shogi = {
  setup: () => {
    let cells = fillBoard();
    return {
      cells: cells,
      sente_captured_pieces: [],
      gote_captured_pieces: [],
      sente_king_position: "04",
      gote_king_position: "84"
    };
  },
  turn: {
    minMoves: 1,
    maxMoves: 1
  },
  moves: {
    movePiece: (G, ctx, initial_row, initial_column, target_row, target_column, player_piece, highlight = null) => {
      /////////////////////////// MOVIMIENTO //////////////////////////
      let possible_cells = getPossibleCells(G.cells, initial_row, initial_column, player_piece, ctx.currentPlayer);
      var valid_move = false;
      var row = G.cells[initial_row];
      var new_row = G.cells[target_row];
      var capture = false;
      var target_piece;

      for (let valid of possible_cells) {
        let valid_row = valid.substr(0, 1);
        let valid_column = valid.substr(1, 2);

        if (valid_row == target_row && valid_column == target_column) {
          valid_move = true; //quitar pieza

          row[initial_column] = null;
          G.cells[initial_row] = row; //poner pieza

          if (new_row[target_column] != null) {
            capture = true;

            if (new_row[target_column].substr(1, 1) == "A") {
              target_piece = new_row[target_column].substr(2, 2);
            } else {
              target_piece = new_row[target_column].substr(1, 2);
            }
          }

          new_row[target_column] = ctx.currentPlayer.concat(player_piece);

          if (capture) {
            if (ctx.currentPlayer == "0") {
              G.sente_captured_pieces.push(target_piece);
            } else {
              G.gote_captured_pieces.push(target_piece);
            }
          }

          break;
        }
      }

      if (valid_move == false) {
        return _core.INVALID_MOVE;
      } /////////////////////////// MOVIMIENTO REY //////////////////////////


      if (player_piece == "KING") {
        if (ctx.currentPlayer == "0") {
          G.sente_king_position = target_row.toString().concat(target_column);
        }

        if (ctx.currentPlayer == "1") {
          G.gote_king_position = target_row.toString().concat(target_column);
        }
      } ////////////////////////////////////////////////////////////////////
      /////////////////////////CHECK SITUATION/////////////////////////


      let still_check = true;

      if (ctx.currentPlayer == "0") {
        still_check = isCheck(G, "1");
      }

      if (ctx.currentPlayer == "1") {
        still_check = isCheck(G, "0");
      }

      if (still_check) {
        return _core.INVALID_MOVE;
      } ////////////////////////////////////////////////////////////////    
      /////////////////////////// PROMOCI??N //////////////////////////////


      let arised_piece = player_piece.substr(0, 1);

      if ((target_row >= 6 && ctx.currentPlayer == 0 || target_row <= 2 && ctx.currentPlayer == 1 || initial_row >= 6 && ctx.currentPlayer == 0 || initial_row <= 2 && ctx.currentPlayer == 1) && player_piece != "KING" && player_piece != "G" && arised_piece != "A") {
        if (confirm("Arise piece?")) {
          arisePiece(G, ctx.currentPlayer.concat(player_piece), target_row, target_column);
        }
      } ///////////////////////////////////////////////////////////////////


      if (highlight != null) {
        highlight.className = "cell";
      }
    },
    revivePiece: (G, ctx, target_row, target_column, player_piece, highlight = null) => {
      /////////////////////////// MOVIMIENTO //////////////////////////
      let possible_cells = getPossibleRevive(G.cells, player_piece.substr(1, 4), player_piece.substr(0, 1));
      var valid_move = false;
      var new_row = G.cells[target_row];

      for (let valid of possible_cells) {
        let valid_row = valid.substr(0, 1);
        let valid_column = valid.substr(1, 2);

        if (valid_row == target_row && valid_column == target_column) {
          valid_move = true; //poner pieza

          new_row[target_column] = player_piece;
          break;
        }
      }

      if (valid_move == false) {
        return _core.INVALID_MOVE;
      } ////////////////////////TAKE OUT FROM CAPTURED PIECES///////////


      if (ctx.currentPlayer == "0") {
        const index = G.sente_captured_pieces.indexOf(player_piece.substr(1, 4));

        if (index < 0) {
          return _core.INVALID_MOVE;
        }

        G.sente_captured_pieces.splice(index, 1);
      }

      if (ctx.currentPlayer == "1") {
        const index = G.gote_captured_pieces.indexOf(player_piece.substr(1, 4));

        if (index < 0) {
          return _core.INVALID_MOVE;
        }

        G.gote_captured_pieces.splice(index, 1);
      } ////////////////////////////////////////////////////////////////
      /////////////////////////CHECK SITUATION/////////////////////////


      let still_check = true;

      if (ctx.currentPlayer == "0") {
        still_check = isCheck(G, "1");
      }

      if (ctx.currentPlayer == "1") {
        still_check = isCheck(G, "0");
      }

      if (still_check) {
        return _core.INVALID_MOVE;
      } ////////////////////////////////////////////////////////////////    


      isCheck(G, ctx.currentPlayer);

      if (highlight != null) {
        highlight.className = "cell";
      }
    }
  },
  ai: {
    enumerate: (G, ctx) => {
      let moves = [];
      var possible_moves = [];

      for (let [row_id, row] of G.cells.entries()) {
        for (let [column_id, piece] of row.entries()) {
          if (piece != null && piece.substr(0, 1) == ctx.currentPlayer) {
            possible_moves = getPossibleCells(G.cells, row_id, column_id, piece);

            if (possible_moves != null && possible_moves.length > 0) {
              for (let move of possible_moves) {
                moves.push({
                  move: 'movePiece',
                  args: [row_id, column_id, move.substr(0, 1), move.substr(1, 2), piece.substr(1, 4)]
                });
              }
            }
          }
        }
      }

      return moves;
    }
  },
  endIf: (G, ctx) => {
    if (isCheckMate(G, ctx)) {
      alert("??FIN! GANADOR: " + ctx.currentPlayer);
      return {
        winner: ctx.currentPlayer
      };
    }
  }
}; //////////------------PIECES------------//////////

exports.Shogi = Shogi;
const pieces = {
  GOTE_KING: '1KING',
  GOTE_GOLDEN_GENERAL: '1G',
  GOTE_SILVER_GENERAL: '1S',
  GOTE_KNIGHT: '1K',
  GOTE_LANCE: '1L',
  GOTE_BISHOP: '1B',
  GOTE_ROOK: '1R',
  GOTE_PAWN: '1P',
  SENTE_KING: '0KING',
  SENTE_GOLDEN_GENERAL: '0G',
  SENTE_SILVER_GENERAL: '0S',
  SENTE_KNIGHT: '0K',
  SENTE_LANCE: '0L',
  SENTE_BISHOP: '0B',
  SENTE_ROOK: '0R',
  SENTE_PAWN: '0P',
  ARISED_GOTE_SILVER_GENERAL: '1AS',
  ARISED_GOTE_KNIGHT: '1AK',
  ARISED_GOTE_LANCE: '1AL',
  ARISED_GOTE_BISHOP: '1AB',
  ARISED_GOTE_ROOK: '1AR',
  ARISED_GOTE_PAWN: '1AP',
  ARISED_SENTE_SILVER_GENERAL: '0AS',
  ARISED_SENTE_KNIGHT: '0AK',
  ARISED_SENTE_LANCE: '0AL',
  ARISED_SENTE_BISHOP: '0AB',
  ARISED_SENTE_ROOK: '0AR',
  ARISED_SENTE_PAWN: '0AP'
}; //////////------------FUNCTIONS------------//////////

function fillBoard() {
  let board = new Array(9).fill(null);

  for (let i = 0; i < 9; i++) {
    board[i] = new Array(9).fill(null);

    for (let j = 0; j < 9; j++) {
      if (i == 2) {
        board[i][j] = pieces.SENTE_PAWN;
      }

      if (i == 6) {
        board[i][j] = pieces.GOTE_PAWN;
      }

      if (i == 0) {
        if (j == 0 || j == 8) {
          board[i][j] = pieces.SENTE_LANCE;
        }

        if (j == 1 || j == 7) {
          board[i][j] = pieces.SENTE_KNIGHT;
        }

        if (j == 2 || j == 6) {
          board[i][j] = pieces.SENTE_SILVER_GENERAL;
        }

        if (j == 3 || j == 5) {
          board[i][j] = pieces.SENTE_GOLDEN_GENERAL;
        }

        if (j == 4) {
          board[i][j] = pieces.SENTE_KING;
        }
      }

      if (i == 8) {
        if (j == 0 || j == 8) {
          board[i][j] = pieces.GOTE_LANCE;
        }

        if (j == 1 || j == 7) {
          board[i][j] = pieces.GOTE_KNIGHT;
        }

        if (j == 2 || j == 6) {
          board[i][j] = pieces.GOTE_SILVER_GENERAL;
        }

        if (j == 3 || j == 5) {
          board[i][j] = pieces.GOTE_GOLDEN_GENERAL;
        }

        if (j == 4) {
          board[i][j] = pieces.GOTE_KING;
        }
      }

      if (i == 1) {
        if (j == 1) {
          board[i][j] = pieces.SENTE_ROOK;
        }

        if (j == 7) {
          board[i][j] = pieces.SENTE_BISHOP;
        }
      }

      if (i == 7) {
        if (j == 1) {
          board[i][j] = pieces.GOTE_BISHOP;
        }

        if (j == 7) {
          board[i][j] = pieces.GOTE_ROOK;
        }
      }
    }
  }

  return board;
}

function arisePiece(G, player_and_piece, target_row, target_column) {
  var new_row = G.cells[target_row];
  var player = player_and_piece.substr(0, 1);
  var player_piece = player_and_piece.substr(1, 4);

  if (player == "0") {
    if (player_piece == "S") {
      new_row[target_column] = pieces.ARISED_SENTE_SILVER_GENERAL;
    } else if (player_piece == "K") {
      new_row[target_column] = pieces.ARISED_SENTE_KNIGHT;
    } else if (player_piece == "L") {
      new_row[target_column] = pieces.ARISED_SENTE_LANCE;
    } else if (player_piece == "B") {
      new_row[target_column] = pieces.ARISED_SENTE_BISHOP;
    } else if (player_piece == "R") {
      new_row[target_column] = pieces.ARISED_SENTE_ROOK;
    } else if (player_piece == "P") {
      new_row[target_column] = pieces.ARISED_SENTE_PAWN;
    }
  } else {
    if (player_piece == "S") {
      new_row[target_column] = pieces.ARISED_GOTE_SILVER_GENERAL;
    } else if (player_piece == "K") {
      new_row[target_column] = pieces.ARISED_GOTE_KNIGHT;
    } else if (player_piece == "L") {
      new_row[target_column] = pieces.ARISED_GOTE_LANCE;
    } else if (player_piece == "B") {
      new_row[target_column] = pieces.ARISED_GOTE_BISHOP;
    } else if (player_piece == "R") {
      new_row[target_column] = pieces.ARISED_GOTE_ROOK;
    } else if (player_piece == "P") {
      new_row[target_column] = pieces.ARISED_GOTE_PAWN;
    }
  }
}

function getPossibleCells(cells, row_id, column_id, piece, player) {
  if (player == "0") {
    return getPossibleCellsSente(cells, row_id, column_id, piece);
  }

  if (player == "1") {
    return getPossibleCellsGote(cells, row_id, column_id, piece);
  }
}

function getPossibleCellsSente(cells, row_id, column_id, piece) {
  var possible_cells = [];
  var row = 0;

  if (piece == "P") {
    let next_row = cells[row_id + 1];

    if (row_id < 8 && (next_row[column_id] == null || next_row[column_id].substr(0, 1) == "1")) {
      let possible_cell = (row_id + 1).toString().concat(column_id);
      possible_cells.push(possible_cell);
    }
  } else if (piece == "L") {
    var stop = false;

    for (let i = row_id + 1; i < 9; i++) {
      row = cells[i];

      if (!stop && (row[column_id] == null || row[column_id].substr(0, 1) == "1")) {
        let possible_cell = i.toString().concat(column_id);
        possible_cells.push(possible_cell);

        if (row[column_id] != null && row[column_id].substr(0, 1) == "1") {
          stop = true;
        }
      } else {
        break;
      }
    }
  } else if (piece == "K") {
    row = cells[row_id + 2];

    if (row_id < 7) {
      if ((row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "1") && column_id < 8) {
        let possible_cell = (row_id + 2).toString().concat(column_id + 1);
        possible_cells.push(possible_cell);
      }

      if ((row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "1") && column_id - 1 >= 0) {
        let possible_cell = (row_id + 2).toString().concat(column_id - 1);
        possible_cells.push(possible_cell);
      }
    }
  } else if (piece == "G" || piece == "AP" || piece == "AL" || piece == "AK" || piece == "AS") {
    row = cells[row_id - 1];

    if (row_id > 0 && (row[column_id] == null || row[column_id].substr(0, 1) == "1")) {
      let possible_cell = (row_id - 1).toString().concat(column_id);
      possible_cells.push(possible_cell);
    }

    row = cells[row_id];

    if (column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "1")) {
      let possible_cell = row_id.toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }

    if (column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "1")) {
      let possible_cell = row_id.toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    row = cells[row_id + 1];

    if (row_id < 8 && column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "1")) {
      let possible_cell = (row_id + 1).toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }

    if (row_id < 8 && column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "1")) {
      let possible_cell = (row_id + 1).toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    if (row_id < 8 && (row[column_id] == null || row[column_id].substr(0, 1) == "1")) {
      let possible_cell = (row_id + 1).toString().concat(column_id);
      possible_cells.push(possible_cell);
    }
  } else if (piece == "S") {
    row = cells[row_id - 1];

    if (row_id > 0 && column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "1")) {
      let possible_cell = (row_id - 1).toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }

    if (row_id > 0 && column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "1")) {
      let possible_cell = (row_id - 1).toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    row = cells[row_id + 1];

    if (row_id < 8 && column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "1")) {
      let possible_cell = (row_id + 1).toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }

    if (row_id < 8 && column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "1")) {
      let possible_cell = (row_id + 1).toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    if (row_id < 8 && (row[column_id] == null || row[column_id].substr(0, 1) == "1")) {
      let possible_cell = (row_id + 1).toString().concat(column_id);
      possible_cells.push(possible_cell);
    }
  } else if (piece == "KING") {
    row = cells[row_id - 1];

    if (row_id > 0 && column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "1")) {
      let possible_cell = (row_id - 1).toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }

    if (row_id > 0 && (row[column_id] == null || row[column_id].substr(0, 1) == "1")) {
      let possible_cell = (row_id - 1).toString().concat(column_id);
      possible_cells.push(possible_cell);
    }

    if (row_id > 0 && column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "1")) {
      let possible_cell = (row_id - 1).toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    row = cells[row_id];

    if (column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "1")) {
      let possible_cell = row_id.toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }

    if (column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "1")) {
      let possible_cell = row_id.toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    row = cells[row_id + 1];

    if (row_id < 8 && (row[column_id] == null || row[column_id].substr(0, 1) == "1")) {
      let possible_cell = (row_id + 1).toString().concat(column_id);
      possible_cells.push(possible_cell);
    }

    if (row_id < 8 && column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "1")) {
      let possible_cell = (row_id + 1).toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    if (row_id < 8 && column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "1")) {
      let possible_cell = (row_id + 1).toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }
  } else if (piece == "R") {
    var actual_row = cells[row_id];
    var back_row;
    var front_row;
    var right_stop = false;
    var left_stop = false;
    var back_stop = false;
    var front_stop = false;

    for (let i = 1; i < 9; i++) {
      if (!right_stop && column_id - i >= 0 && (actual_row[column_id - i] == null || actual_row[column_id - i].substr(0, 1) == "1")) {
        let possible_cell = row_id.toString().concat(column_id - i);
        possible_cells.push(possible_cell);
      }

      if (!left_stop && column_id + i <= 8 && (actual_row[column_id + i] == null || actual_row[column_id + i].substr(0, 1) == "1")) {
        let possible_cell = row_id.toString().concat(column_id + i);
        possible_cells.push(possible_cell);
      }

      if (!right_stop && column_id - i >= 0 && actual_row[column_id - i] != null && (actual_row[column_id - i].substr(0, 1) == "0" || actual_row[column_id - i].substr(0, 1) == "1")) {
        right_stop = true;
      }

      if (!left_stop && column_id + i <= 8 && actual_row[column_id + i] != null && (actual_row[column_id + i].substr(0, 1) == "0" || actual_row[column_id + i].substr(0, 1) == "1")) {
        left_stop = true;
      }

      back_row = cells[row_id - i];
      front_row = cells[row_id + i];

      if (!back_stop && row_id - i >= 0 && (back_row[column_id] == null || back_row[column_id].substr(0, 1) == "1")) {
        let possible_cell = (row_id - i).toString().concat(column_id);
        possible_cells.push(possible_cell);
      }

      if (!front_stop && row_id + i <= 8 && (front_row[column_id] == null || front_row[column_id].substr(0, 1) == "1")) {
        let possible_cell = (row_id + i).toString().concat(column_id);
        possible_cells.push(possible_cell);
      }

      if (!back_stop && row_id - i >= 0 && back_row[column_id] != null && (back_row[column_id].substr(0, 1) == "0" || back_row[column_id].substr(0, 1) == "1")) {
        back_stop = true;
      }

      if (!front_stop && row_id + i <= 8 && front_row[column_id] != null && (front_row[column_id].substr(0, 1) == "0" || front_row[column_id].substr(0, 1) == "1")) {
        front_stop = true;
      }
    }
  } else if (piece == "B") {
    var back_row = cells[row_id];
    var front_row = cells[row_id];
    var back_right_stop = false;
    var back_left_stop = false;
    var front_right_stop = false;
    var front_left_stop = false;

    for (let i = 1; i < 10; i++) {
      back_row = cells[row_id - i];
      front_row = cells[row_id + i]; //back right

      if (!back_right_stop && back_row != null && column_id + i < 9 && (back_row[column_id + i] == null || back_row[column_id + i].substr(0, 1) == "1")) {
        let possible_cell = (row_id - i).toString().concat(column_id + i);
        possible_cells.push(possible_cell);
      }

      if (!back_right_stop && back_row != null && column_id + i < 9 && back_row[column_id + i] != null && (back_row[column_id + i].substr(0, 1) == "0" || back_row[column_id + i].substr(0, 1) == "1")) {
        back_right_stop = true;
      } //back left


      if (!back_left_stop && back_row != null && column_id - i >= 0 && (back_row[column_id - i] == null || back_row[column_id - i].substr(0, 1) == "1")) {
        let possible_cell = (row_id - i).toString().concat(column_id - i);
        possible_cells.push(possible_cell);
      }

      if (!back_left_stop && back_row != null && column_id - i >= 0 && back_row[column_id - i] != null && (back_row[column_id - i].substr(0, 1) == "0" || back_row[column_id - i].substr(0, 1) == "1")) {
        back_left_stop = true;
      } //front right


      if (!front_right_stop && front_row != null && column_id + i < 9 && (front_row[column_id + i] == null || front_row[column_id + i].substr(0, 1) == "1")) {
        let possible_cell = (row_id + i).toString().concat(column_id + i);
        possible_cells.push(possible_cell);
      }

      if (!front_right_stop && front_row != null && column_id + i < 9 && front_row[column_id + i] != null && (front_row[column_id + i].substr(0, 1) == "0" || front_row[column_id + i].substr(0, 1) == "1")) {
        front_right_stop = true;
      } //front left  


      if (!front_left_stop && front_row != null && column_id - i >= 0 && (front_row[column_id - i] == null || front_row[column_id - i].substr(0, 1) == "1")) {
        let possible_cell = (row_id + i).toString().concat(column_id - i);
        possible_cells.push(possible_cell);
      }

      if (!front_left_stop && front_row != null && column_id - i >= 0 && front_row[column_id - i] != null && (front_row[column_id - i].substr(0, 1) == "0" || front_row[column_id - i].substr(0, 1) == "1")) {
        front_left_stop = true;
      }
    }
  } else if (piece == "AB") {
    var back_row = cells[row_id];
    var front_row = cells[row_id];
    var back_right_stop = false;
    var back_left_stop = false;
    var front_right_stop = false;
    var front_left_stop = false;

    for (let i = 1; i < 10; i++) {
      back_row = cells[row_id - i];
      front_row = cells[row_id + i]; //back_right

      if (!back_right_stop && back_row != null && column_id + i < 9 && (back_row[column_id + i] == null || back_row[column_id + i].substr(0, 1) == "1")) {
        let possible_cell = (row_id - i).toString().concat(column_id + i);
        possible_cells.push(possible_cell);
      }

      if (!back_right_stop && back_row != null && column_id + i < 9 && back_row[column_id + i] != null && (back_row[column_id + i].substr(0, 1) == "0" || back_row[column_id + i].substr(0, 1) == "1")) {
        back_right_stop = true;
      } //back left


      if (!back_left_stop && back_row != null && column_id - i >= 0 && (back_row[column_id - i] == null || back_row[column_id - i].substr(0, 1) == "1")) {
        let possible_cell = (row_id - i).toString().concat(column_id - i);
        possible_cells.push(possible_cell);
      }

      if (!back_left_stop && back_row != null && column_id - i >= 0 && back_row[column_id - i] != null && (back_row[column_id - i].substr(0, 1) == "0" || back_row[column_id - i].substr(0, 1) == "1")) {
        back_left_stop = true;
      } //front right


      if (!front_right_stop && front_row != null && column_id + i < 9 && (front_row[column_id + i] == null || front_row[column_id + i].substr(0, 1) == "1")) {
        let possible_cell = (row_id + i).toString().concat(column_id + i);
        possible_cells.push(possible_cell);
      }

      if (!front_right_stop && front_row != null && column_id + i < 9 && front_row[column_id + i] != null && (front_row[column_id + i].substr(0, 1) == "0" || front_row[column_id + i].substr(0, 1) == "1")) {
        front_right_stop = true;
      } //front left  


      if (!front_left_stop && front_row != null && column_id - i >= 0 && (front_row[column_id - i] == null || front_row[column_id - i].substr(0, 1) == "1")) {
        let possible_cell = (row_id + i).toString().concat(column_id - i);
        possible_cells.push(possible_cell);
      }

      if (!front_left_stop && front_row != null && column_id - i >= 0 && front_row[column_id - i] != null && (front_row[column_id - i].substr(0, 1) == "0" || front_row[column_id - i].substr(0, 1) == "1")) {
        front_left_stop = true;
      }
    }

    row = cells[row_id - 1];

    if (row_id > 0 && (row[column_id] == null || row[column_id].substr(0, 1) == "1")) {
      let possible_cell = (row_id - 1).toString().concat(column_id);
      possible_cells.push(possible_cell);
    }

    row = cells[row_id];

    if (column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "1")) {
      let possible_cell = row_id.toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }

    if (column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "1")) {
      let possible_cell = row_id.toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    row = cells[row_id + 1];

    if (row_id < 8 && (row[column_id] == null || row[column_id].substr(0, 1) == "1")) {
      let possible_cell = (row_id + 1).toString().concat(column_id);
      possible_cells.push(possible_cell);
    }
  } else if (piece == "AR") {
    var actual_row = cells[row_id];
    var back_row;
    var front_row;
    var right_stop = false;
    var left_stop = false;
    var back_stop = false;
    var front_stop = false;

    for (let i = 1; i < 9; i++) {
      if (!right_stop && column_id - i >= 0 && (actual_row[column_id - i] == null || actual_row[column_id - i].substr(0, 1) == "1")) {
        let possible_cell = row_id.toString().concat(column_id - i);
        possible_cells.push(possible_cell);
      }

      if (!left_stop && column_id + i <= 8 && (actual_row[column_id + i] == null || actual_row[column_id + i].substr(0, 1) == "1")) {
        let possible_cell = row_id.toString().concat(column_id + i);
        possible_cells.push(possible_cell);
      }

      if (!right_stop && column_id - i >= 0 && actual_row[column_id - i] != null && (actual_row[column_id - i].substr(0, 1) == "0" || actual_row[column_id - i].substr(0, 1) == "1")) {
        right_stop = true;
      }

      if (!left_stop && column_id + i <= 8 && actual_row[column_id + i] != null && (actual_row[column_id + i].substr(0, 1) == "0" || actual_row[column_id + i].substr(0, 1) == "1")) {
        left_stop = true;
      }

      back_row = cells[row_id - i];
      front_row = cells[row_id + i];

      if (!back_stop && row_id - i >= 0 && (back_row[column_id] == null || back_row[column_id].substr(0, 1) == "1")) {
        let possible_cell = (row_id - i).toString().concat(column_id);
        possible_cells.push(possible_cell);
      }

      if (!front_stop && row_id + i <= 8 && (front_row[column_id] == null || front_row[column_id].substr(0, 1) == "1")) {
        let possible_cell = (row_id + i).toString().concat(column_id);
        possible_cells.push(possible_cell);
      }

      if (!back_stop && row_id - i >= 0 && back_row[column_id] != null && (back_row[column_id].substr(0, 1) == "0" || back_row[column_id].substr(0, 1) == "1")) {
        back_stop = true;
      }

      if (!front_stop && row_id + i <= 8 && front_row[column_id] != null && (front_row[column_id].substr(0, 1) == "0" || front_row[column_id].substr(0, 1) == "1")) {
        front_stop = true;
      }
    }

    row = cells[row_id - 1];

    if (row_id > 0 && column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "1")) {
      let possible_cell = (row_id - 1).toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }

    if (row_id > 0 && column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "1")) {
      let possible_cell = (row_id - 1).toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    row = cells[row_id + 1];

    if (row_id < 8 && column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "1")) {
      let possible_cell = (row_id + 1).toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    if (row_id < 8 && column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "1")) {
      let possible_cell = (row_id + 1).toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }
  }

  return possible_cells;
}

function getPossibleCellsGote(cells, row_id, column_id, piece) {
  var possible_cells = [];
  var row = 0;

  if (piece == "P") {
    let next_row = cells[row_id - 1];

    if (row_id > 0 && (next_row[column_id] == null || next_row[column_id].substr(0, 1) == "0")) {
      let possible_cell = (row_id - 1).toString().concat(column_id);
      possible_cells.push(possible_cell);
    }
  } else if (piece == "L") {
    var stop = false;

    for (let i = row_id - 1; i >= 0; i--) {
      row = cells[i];

      if (!stop && (row[column_id] == null || row[column_id].substr(0, 1) == "0")) {
        let possible_cell = i.toString().concat(column_id);
        possible_cells.push(possible_cell);

        if (row[column_id] != null && row[column_id].substr(0, 1) == "0") {
          stop = true;
        }
      } else {
        break;
      }
    }
  } else if (piece == "K") {
    row = cells[row_id - 2];

    if (row_id > 1) {
      if ((row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "0") && column_id < 8) {
        let possible_cell = (row_id - 2).toString().concat(column_id + 1);
        possible_cells.push(possible_cell);
      }

      if ((row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "0") && column_id - 1 >= 0) {
        let possible_cell = (row_id - 2).toString().concat(column_id - 1);
        possible_cells.push(possible_cell);
      }
    }
  } else if (piece == "G" || piece == "AP" || piece == "AL" || piece == "AK" || piece == "AS") {
    row = cells[row_id + 1];

    if (row_id < 8 && (row[column_id] == null || row[column_id].substr(0, 1) == "0")) {
      let possible_cell = (row_id + 1).toString().concat(column_id);
      possible_cells.push(possible_cell);
    }

    row = cells[row_id];

    if (column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "0")) {
      let possible_cell = row_id.toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }

    if (column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "0")) {
      let possible_cell = row_id.toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    row = cells[row_id - 1];

    if (row_id > 0 && column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "0")) {
      let possible_cell = (row_id - 1).toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }

    if (row_id > 0 && column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "0")) {
      let possible_cell = (row_id - 1).toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    if (row_id > 0 && (row[column_id] == null || row[column_id].substr(0, 1) == "0")) {
      let possible_cell = (row_id - 1).toString().concat(column_id);
      possible_cells.push(possible_cell);
    }
  } else if (piece == "S") {
    row = cells[row_id + 1];

    if (row_id < 8 && column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "0")) {
      let possible_cell = (row_id + 1).toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }

    if (row_id < 8 && column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "0")) {
      let possible_cell = (row_id + 1).toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    row = cells[row_id - 1];

    if (row_id > 0 && column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "0")) {
      let possible_cell = (row_id - 1).toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }

    if (row_id > 0 && column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "0")) {
      let possible_cell = (row_id - 1).toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    if (row_id > 0 && (row[column_id] == null || row[column_id].substr(0, 1) == "0")) {
      let possible_cell = (row_id - 1).toString().concat(column_id);
      possible_cells.push(possible_cell);
    }
  } else if (piece == "KING") {
    row = cells[row_id - 1];

    if (row_id > 0 && column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "0")) {
      let possible_cell = (row_id - 1).toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }

    if (row_id > 0 && (row[column_id] == null || row[column_id].substr(0, 1) == "0")) {
      let possible_cell = (row_id - 1).toString().concat(column_id);
      possible_cells.push(possible_cell);
    }

    if (row_id > 0 && column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "0")) {
      let possible_cell = (row_id - 1).toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    row = cells[row_id];

    if (column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "0")) {
      let possible_cell = row_id.toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }

    if (column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "0")) {
      let possible_cell = row_id.toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    row = cells[row_id + 1];

    if (row_id < 8 && (row[column_id] == null || row[column_id].substr(0, 1) == "0")) {
      let possible_cell = (row_id + 1).toString().concat(column_id);
      possible_cells.push(possible_cell);
    }

    if (row_id < 8 && column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "0")) {
      let possible_cell = (row_id + 1).toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    if (row_id < 8 && column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "0")) {
      let possible_cell = (row_id + 1).toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }
  } else if (piece == "R") {
    var actual_row = cells[row_id];
    var back_row;
    var front_row;
    var right_stop = false;
    var left_stop = false;
    var back_stop = false;
    var front_stop = false;

    for (let i = 1; i < 9; i++) {
      if (!right_stop && column_id - i >= 0 && (actual_row[column_id - i] == null || actual_row[column_id - i].substr(0, 1) == "0")) {
        let possible_cell = row_id.toString().concat(column_id - i);
        possible_cells.push(possible_cell);
      }

      if (!left_stop && column_id + i <= 8 && (actual_row[column_id + i] == null || actual_row[column_id + i].substr(0, 1) == "0")) {
        let possible_cell = row_id.toString().concat(column_id + i);
        possible_cells.push(possible_cell);
      }

      if (!right_stop && column_id - i >= 0 && actual_row[column_id - i] != null && (actual_row[column_id - i].substr(0, 1) == "0" || actual_row[column_id - i].substr(0, 1) == "1")) {
        right_stop = true;
      }

      if (!left_stop && column_id + i <= 8 && actual_row[column_id + i] != null && (actual_row[column_id + i].substr(0, 1) == "0" || actual_row[column_id + i].substr(0, 1) == "1")) {
        left_stop = true;
      }

      back_row = cells[row_id - i];
      front_row = cells[row_id + i];

      if (!back_stop && row_id - i >= 0 && (back_row[column_id] == null || back_row[column_id].substr(0, 1) == "0")) {
        let possible_cell = (row_id - i).toString().concat(column_id);
        possible_cells.push(possible_cell);
      }

      if (!front_stop && row_id + i <= 8 && (front_row[column_id] == null || front_row[column_id].substr(0, 1) == "0")) {
        let possible_cell = (row_id + i).toString().concat(column_id);
        possible_cells.push(possible_cell);
      }

      if (!back_stop && row_id - i >= 0 && back_row[column_id] != null && (back_row[column_id].substr(0, 1) == "0" || back_row[column_id].substr(0, 1) == "1")) {
        back_stop = true;
      }

      if (!front_stop && row_id + i <= 8 && front_row[column_id] != null && (front_row[column_id].substr(0, 1) == "0" || front_row[column_id].substr(0, 1) == "1")) {
        front_stop = true;
      }
    }
  } else if (piece == "B") {
    var back_row = cells[row_id];
    var front_row = cells[row_id];
    var back_right_stop = false;
    var back_left_stop = false;
    var front_right_stop = false;
    var front_left_stop = false;

    for (let i = 1; i < 10; i++) {
      back_row = cells[row_id - i];
      front_row = cells[row_id + i]; //back_right

      if (!back_right_stop && back_row != null && column_id + i < 9 && (back_row[column_id + i] == null || back_row[column_id + i].substr(0, 1) == "0")) {
        let possible_cell = (row_id - i).toString().concat(column_id + i);
        possible_cells.push(possible_cell);
      }

      if (!back_right_stop && back_row != null && column_id + i < 9 && back_row[column_id + i] != null && (back_row[column_id + i].substr(0, 1) == "0" || back_row[column_id + i].substr(0, 1) == "1")) {
        back_right_stop = true;
      } //back left


      if (!back_left_stop && back_row != null && column_id - i >= 0 && (back_row[column_id - i] == null || back_row[column_id - i].substr(0, 1) == "0")) {
        let possible_cell = (row_id - i).toString().concat(column_id - i);
        possible_cells.push(possible_cell);
      }

      if (!back_left_stop && back_row != null && column_id - i >= 0 && back_row[column_id - i] != null && (back_row[column_id - i].substr(0, 1) == "0" || back_row[column_id - i].substr(0, 1) == "1")) {
        back_left_stop = true;
      } //front right


      if (!front_right_stop && front_row != null && column_id + i < 9 && (front_row[column_id + i] == null || front_row[column_id + i].substr(0, 1) == "0")) {
        let possible_cell = (row_id + i).toString().concat(column_id + i);
        possible_cells.push(possible_cell);
      }

      if (!front_right_stop && front_row != null && column_id + i < 9 && front_row[column_id + i] != null && (front_row[column_id + i].substr(0, 1) == "0" || front_row[column_id + i].substr(0, 1) == "1")) {
        front_right_stop = true;
      } //front left  


      if (!front_left_stop && front_row != null && column_id - i >= 0 && (front_row[column_id - i] == null || front_row[column_id - i].substr(0, 1) == "0")) {
        let possible_cell = (row_id + i).toString().concat(column_id - i);
        possible_cells.push(possible_cell);
      }

      if (!front_left_stop && front_row != null && column_id - i >= 0 && front_row[column_id - i] != null && (front_row[column_id - i].substr(0, 1) == "0" || front_row[column_id - i].substr(0, 1) == "1")) {
        front_left_stop = true;
      }
    }
  } else if (piece == "AB") {
    var back_row = cells[row_id];
    var front_row = cells[row_id];
    var back_right_stop = false;
    var back_left_stop = false;
    var front_right_stop = false;
    var front_left_stop = false;

    for (let i = 1; i < 10; i++) {
      back_row = cells[row_id - i];
      front_row = cells[row_id + i]; //back_right

      if (!back_right_stop && back_row != null && column_id + i < 9 && (back_row[column_id + i] == null || back_row[column_id + i].substr(0, 1) == "0")) {
        let possible_cell = (row_id - i).toString().concat(column_id + i);
        possible_cells.push(possible_cell);
      }

      if (!back_right_stop && back_row != null && column_id + i < 9 && back_row[column_id + i] != null && (back_row[column_id + i].substr(0, 1) == "0" || back_row[column_id + i].substr(0, 1) == "1")) {
        back_right_stop = true;
      } //back left


      if (!back_left_stop && back_row != null && column_id - i >= 0 && (back_row[column_id - i] == null || back_row[column_id - i].substr(0, 1) == "0")) {
        let possible_cell = (row_id - i).toString().concat(column_id - i);
        possible_cells.push(possible_cell);
      }

      if (!back_left_stop && back_row != null && column_id - i >= 0 && back_row[column_id - i] != null && (back_row[column_id - i].substr(0, 1) == "0" || back_row[column_id - i].substr(0, 1) == "1")) {
        back_left_stop = true;
      } //front right


      if (!front_right_stop && front_row != null && column_id + i < 9 && (front_row[column_id + i] == null || front_row[column_id + i].substr(0, 1) == "0")) {
        let possible_cell = (row_id + i).toString().concat(column_id + i);
        possible_cells.push(possible_cell);
      }

      if (!front_right_stop && front_row != null && column_id + i < 9 && front_row[column_id + i] != null && (front_row[column_id + i].substr(0, 1) == "0" || front_row[column_id + i].substr(0, 1) == "1")) {
        front_right_stop = true;
      } //front left  


      if (!front_left_stop && front_row != null && column_id - i >= 0 && (front_row[column_id - i] == null || front_row[column_id - i].substr(0, 1) == "0")) {
        let possible_cell = (row_id + i).toString().concat(column_id - i);
        possible_cells.push(possible_cell);
      }

      if (!front_left_stop && front_row != null && column_id - i >= 0 && front_row[column_id - i] != null && (front_row[column_id - i].substr(0, 1) == "0" || front_row[column_id - i].substr(0, 1) == "1")) {
        front_left_stop = true;
      }
    }

    row = cells[row_id - 1];

    if (row_id > 0 && (row[column_id] == null || row[column_id].substr(0, 1) == "0")) {
      let possible_cell = (row_id - 1).toString().concat(column_id);
      possible_cells.push(possible_cell);
    }

    row = cells[row_id];

    if (column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "0")) {
      let possible_cell = row_id.toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }

    if (column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "0")) {
      let possible_cell = row_id.toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    row = cells[row_id + 1];

    if (row_id < 8 && (row[column_id] == null || row[column_id].substr(0, 1) == "0")) {
      let possible_cell = (row_id + 1).toString().concat(column_id);
      possible_cells.push(possible_cell);
    }
  } else if (piece == "AR") {
    var actual_row = cells[row_id];
    var back_row;
    var front_row;
    var right_stop = false;
    var left_stop = false;
    var back_stop = false;
    var front_stop = false;

    for (let i = 1; i < 9; i++) {
      if (!right_stop && column_id - i >= 0 && (actual_row[column_id - i] == null || actual_row[column_id - i].substr(0, 1) == "0")) {
        let possible_cell = row_id.toString().concat(column_id - i);
        possible_cells.push(possible_cell);
      }

      if (!left_stop && column_id + i <= 8 && (actual_row[column_id + i] == null || actual_row[column_id + i].substr(0, 1) == "0")) {
        let possible_cell = row_id.toString().concat(column_id + i);
        possible_cells.push(possible_cell);
      }

      if (!right_stop && column_id - i >= 0 && actual_row[column_id - i] != null && (actual_row[column_id - i].substr(0, 1) == "0" || actual_row[column_id - i].substr(0, 1) == "1")) {
        right_stop = true;
      }

      if (!left_stop && column_id + i <= 8 && actual_row[column_id + i] != null && (actual_row[column_id + i].substr(0, 1) == "0" || actual_row[column_id + i].substr(0, 1) == "1")) {
        left_stop = true;
      }

      back_row = cells[row_id - i];
      front_row = cells[row_id + i];

      if (!back_stop && row_id - i >= 0 && (back_row[column_id] == null || back_row[column_id].substr(0, 1) == "0")) {
        let possible_cell = (row_id - i).toString().concat(column_id);
        possible_cells.push(possible_cell);
      }

      if (!front_stop && row_id + i <= 8 && (front_row[column_id] == null || front_row[column_id].substr(0, 1) == "0")) {
        let possible_cell = (row_id + i).toString().concat(column_id);
        possible_cells.push(possible_cell);
      }

      if (!back_stop && row_id - i >= 0 && back_row[column_id] != null && (back_row[column_id].substr(0, 1) == "0" || back_row[column_id].substr(0, 1) == "1")) {
        back_stop = true;
      }

      if (!front_stop && row_id + i <= 8 && front_row[column_id] != null && (front_row[column_id].substr(0, 1) == "0" || front_row[column_id].substr(0, 1) == "1")) {
        front_stop = true;
      }
    }

    row = cells[row_id - 1];

    if (row_id > 0 && column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "0")) {
      let possible_cell = (row_id - 1).toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }

    if (row_id > 0 && column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "0")) {
      let possible_cell = (row_id - 1).toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    row = cells[row_id + 1];

    if (row_id < 8 && column_id < 8 && (row[column_id + 1] == null || row[column_id + 1].substr(0, 1) == "0")) {
      let possible_cell = (row_id + 1).toString().concat(column_id + 1);
      possible_cells.push(possible_cell);
    }

    if (row_id < 8 && column_id > 0 && (row[column_id - 1] == null || row[column_id - 1].substr(0, 1) == "0")) {
      let possible_cell = (row_id + 1).toString().concat(column_id - 1);
      possible_cells.push(possible_cell);
    }
  }

  return possible_cells;
}

function getPossibleRevive(cells, piece_type, player) {
  var pawn_free_columns = [];
  var possible_revive_cells = [];

  if (piece_type == "P") {
    pawn_free_columns = getFreePawnColumns(cells, player);
  }

  for (let [row_id, row] of cells.entries()) {
    for (let [column_id, cell] of row.entries()) {
      if (!(piece_type == "P" || piece_type == "K") && cell == null) {
        //cualquiera}
        possible_revive_cells.push(row_id.toString().concat(column_id.toString()));
      } else if (cell == null) {
        if (piece_type == "P") {
          if (pawn_free_columns != null && pawn_free_columns.indexOf(column_id) >= 0) {
            if (player == "0" && row_id < 8) {
              possible_revive_cells.push(row_id.toString().concat(column_id.toString()));
            }

            if (player == "1" && row_id > 0) {
              possible_revive_cells.push(row_id.toString().concat(column_id.toString()));
            }
          }
        }

        if (piece_type == "K") {
          if (player == "0" && row_id < 7) {
            possible_revive_cells.push(row_id.toString().concat(column_id.toString()));
          }

          if (player == "1" && row_id > 1) {
            possible_revive_cells.push(row_id.toString().concat(column_id.toString()));
          }
        }
      }
    }
  }

  return possible_revive_cells;
}

function getFreePawnColumns(cells, player) {
  let pawn_free_columns = [];
  var row;
  var piece;
  var free;

  for (let i = 0; i < 9; i++) {
    free = true;

    for (let j = 0; j < 9; j++) {
      row = cells[j];
      piece = row[i];

      if (piece != null && piece.substr(1, 2) == "P" && piece.substr(0, 1) == player) {
        free = false;
        break;
      }
    }

    if (free) {
      pawn_free_columns.push(i);
    }
  }

  return pawn_free_columns;
}

function movePieceToAvoidMate(G, player_and_piece, initial_row, initial_column, target_row, target_column) {
  /////////////////////////// MOVIMIENTO //////////////////////////
  const G_clone = JSON.parse(JSON.stringify(G));
  var player = player_and_piece.substr(0, 1);
  var player_piece = player_and_piece.substr(1, 4);
  let possible_cells = getPossibleCells(G_clone.cells, initial_row, initial_column, player_piece, player);
  var valid_move = false;
  var row = G_clone.cells[initial_row];
  var new_row = G_clone.cells[target_row];
  var capture = false;
  var target_piece;

  for (let valid of possible_cells) {
    let valid_row = valid.substr(0, 1);
    let valid_column = valid.substr(1, 2);

    if (valid_row == target_row && valid_column == target_column) {
      valid_move = true; //quitar pieza

      row[initial_column] = null;
      G_clone.cells[initial_row] = row; //poner pieza

      if (new_row[target_column] != null) {
        capture = true;

        if (new_row[target_column].substr(1, 1) == "A") {
          target_piece = new_row[target_column].substr(2, 2);
        } else {
          target_piece = new_row[target_column].substr(1, 2);
        }
      }

      new_row[target_column] = player_and_piece;

      if (capture) {
        if (player == "0") {
          G_clone.sente_captured_pieces.push(target_piece);
        } else {
          G_clone.gote_captured_pieces.push(target_piece);
        }
      }

      break;
    }
  }

  if (valid_move == false) {
    return false;
  } /////////////////////////// MOVIMIENTO REY //////////////////////////


  if (player_piece == "KING") {
    if (player == "0") {
      G_clone.sente_king_position = target_row.toString().concat(target_column);
    }

    if (player == "1") {
      G_clone.gote_king_position = target_row.toString().concat(target_column);
    }
  } ////////////////////////////////////////////////////////////////////
  /////////////////////////CHECK SITUATION/////////////////////////


  let still_check = true;

  if (player == "0") {
    still_check = isCheck(G_clone, "1");
  }

  if (player == "1") {
    still_check = isCheck(G_clone, "0");
  }

  if (still_check) {
    return false;
  } ////////////////////////////////////////////////////////////////    


  isCheck(G_clone, player);
  return true;
}

function revivePieceToAvoidMate(G, target_row, target_column, player_and_piece) {
  /////////////////////////// MOVIMIENTO //////////////////////////
  const G_clone = JSON.parse(JSON.stringify(G));
  let possible_cells = getPossibleRevive(G_clone.cells, player_and_piece.substr(1, 4), player_and_piece.substr(0, 1));
  var valid_move = false;
  var new_row = G_clone.cells[target_row];
  var player = player_and_piece.substr(0, 1);
  var piece_type = player_and_piece.substr(1, 4);

  for (let valid of possible_cells) {
    let valid_row = valid.substr(0, 1);
    let valid_column = valid.substr(1, 2);

    if (valid_row == target_row && valid_column == target_column) {
      valid_move = true; //poner pieza

      new_row[target_column] = player_and_piece;
      break;
    }
  }

  if (valid_move == false) {
    return _core.INVALID_MOVE;
  } /////////////////////////CHECK SITUATION/////////////////////////


  let still_check = true;

  if (player == "0") {
    still_check = isCheck(G_clone, "1");
  }

  if (player == "1") {
    still_check = isCheck(G_clone, "0");
  }

  if (still_check) {
    return false;
  } ////////////////////////////////////////////////////////////////    


  isCheck(G_clone, player);
  return true;
}

function movePiece(G, ctx, initial_row, initial_column, target_row, target_column, player_piece) {
  /////////////////////////// MOVIMIENTO //////////////////////////
  let possible_cells = getPossibleCells(G.cells, initial_row, initial_column, player_piece, ctx.currentPlayer);
  var valid_move = false;
  var row = G.cells[initial_row];
  var new_row = G.cells[target_row];
  var capture = false;
  var target_piece;

  for (let valid of possible_cells) {
    let valid_row = valid.substr(0, 1);
    let valid_column = valid.substr(1, 2);

    if (valid_row == target_row && valid_column == target_column) {
      valid_move = true; //quitar pieza

      row[initial_column] = null;
      G.cells[initial_row] = row; //poner pieza

      if (new_row[target_column] != null) {
        capture = true;

        if (new_row[target_column].substr(1, 1) == "A") {
          target_piece = new_row[target_column].substr(2, 2);
        } else {
          target_piece = new_row[target_column].substr(1, 2);
        }
      }

      new_row[target_column] = ctx.currentPlayer.concat(player_piece);

      if (capture) {
        if (ctx.currentPlayer == "0") {
          G.sente_captured_pieces.push(target_piece);
        } else {
          G.gote_captured_pieces.push(target_piece);
        }
      }

      break;
    }
  }

  if (valid_move == false) {
    return _core.INVALID_MOVE;
  } /////////////////////////// MOVIMIENTO REY //////////////////////////


  if (player_piece == "KING") {
    if (ctx.currentPlayer == "0") {
      G.sente_king_position = target_row.toString().concat(target_column);
    }

    if (ctx.currentPlayer == "1") {
      G.gote_king_position = target_row.toString().concat(target_column);
    }
  } ////////////////////////////////////////////////////////////////////
  /////////////////////////CHECK SITUATION/////////////////////////


  let still_check = true;

  if (ctx.currentPlayer == "0") {
    still_check = isCheck(G, "1");
  }

  if (ctx.currentPlayer == "1") {
    still_check = isCheck(G, "0");
  }

  if (still_check) {
    //alert("INVALIDO POR CHECK");
    return _core.INVALID_MOVE;
  } ////////////////////////////////////////////////////////////////    
  /////////////////////////// PROMOCI??N //////////////////////////////


  let arised_piece = player_piece.substr(0, 1);

  if ((target_row >= 6 && ctx.currentPlayer == 0 || target_row <= 2 && ctx.currentPlayer == 1 || initial_row >= 6 && ctx.currentPlayer == 0 || initial_row <= 2 && ctx.currentPlayer == 1) && player_piece != "KING" && player_piece != "G" && arised_piece != "A") {
    arisePiece(G, ctx.currentPlayer.concat(player_piece), target_row, target_column);
  } ///////////////////////////////////////////////////////////////////


  return G;
}

function revivePiece(G, ctx, target_row, target_column, player_piece, highlight = null) {
  /////////////////////////// MOVIMIENTO //////////////////////////
  let possible_cells = getPossibleRevive(G.cells, player_piece.substr(1, 4), player_piece.substr(0, 1));
  var valid_move = false;
  var new_row = G.cells[target_row];

  for (let valid of possible_cells) {
    let valid_row = valid.substr(0, 1);
    let valid_column = valid.substr(1, 2);

    if (valid_row == target_row && valid_column == target_column) {
      valid_move = true; //poner pieza

      new_row[target_column] = player_piece;
      break;
    }
  }

  if (valid_move == false) {
    return _core.INVALID_MOVE;
  } ////////////////////////TAKE OUT FROM CAPTURED PIECES///////////


  if (ctx.currentPlayer == "0") {
    const index = G.sente_captured_pieces.indexOf(player_piece.substr(1, 4));

    if (index < 0) {
      return _core.INVALID_MOVE;
    }

    G.sente_captured_pieces.splice(index, 1);
  }

  if (ctx.currentPlayer == "1") {
    const index = G.gote_captured_pieces.indexOf(player_piece.substr(1, 4));

    if (index < 0) {
      return _core.INVALID_MOVE;
    }

    G.gote_captured_pieces.splice(index, 1);
  } ////////////////////////////////////////////////////////////////
  /////////////////////////CHECK SITUATION/////////////////////////


  let still_check = true;

  if (ctx.currentPlayer == "0") {
    still_check = isCheck(G, "1");
  }

  if (ctx.currentPlayer == "1") {
    still_check = isCheck(G, "0");
  }

  if (still_check) {
    return _core.INVALID_MOVE;
  } ////////////////////////////////////////////////////////////////    


  if (highlight != null) {
    highlight.className = "cell";
  }

  return G;
} //////////------END FUNCTIONS---------------/////////


function isCheck(G, player) {
  let players_piece;
  let possible_cells;
  let check = false;

  for (let i = 0; i < G.cells.length; i++) {
    let row = G.cells[i];

    for (let j = 0; j < G.cells[i].length; j++) {
      if (row[j] != null) {
        players_piece = row[j].substr(0, 1);

        if (players_piece == player) {
          possible_cells = getPossibleCells(G.cells, i, j, row[j].substr(1, 4), row[j].substr(0, 1));
          possible_cells.forEach(cell => {
            if (player == "0" && cell.substr(0, 1) == G.gote_king_position.substr(0, 1) && cell.substr(1, 2) == G.gote_king_position.substr(1, 2)) {
              check = true;
            }

            if (player == "1" && cell.substr(0, 1) == G.sente_king_position.substr(0, 1) && cell.substr(1, 2) == G.sente_king_position.substr(1, 2)) {
              check = true;
            }
          });
        }
      }
    }
  }

  return check;
}

function isCheckMate(G, ctx) {
  var save_mate = false;
  let possible_cells;
  var is_check; //Primero vemos si hay jaque, seg??n del jugador

  if (ctx.currentPlayer == "1") {
    is_check = isCheck(G, "1");
  } else {
    is_check = isCheck(G, "0");
  } //Si hay jaque, exploramos todas las fichas del otro jugador para ver si hay alg??n movimiento que evite el jaque mate


  if (is_check) {
    for (let i = 0; i < G.cells.length; i++) {
      let row = G.cells[i];

      for (let j = 0; j < G.cells[i].length; j++) {
        if (row[j] != null && row[j].substr(0, 1) != ctx.currentPlayer) {
          possible_cells = getPossibleCells(G.cells, i, j, row[j].substr(1, 4), row[j].substr(0, 1));
          possible_cells.forEach(cell => {
            //Analizar si un movimiento evita el jaque mate. Para ello utilizo un m??todo parecido al movePiece
            var saved = movePieceToAvoidMate(G, row[j], i, j, cell.substr(0, 1), cell.substr(1, 2));

            if (saved) {
              save_mate = true;
            }
          });
        }
      }
    }

    let all_captured = new Array(2).fill(null);
    all_captured[0] = G.sente_captured_pieces;
    all_captured[1] = G.gote_captured_pieces;
    var index;
    var player;

    if (ctx.currentPlayer == "0") {
      index = 1;
      player = "1";
    } else {
      index = 0;
      player = "0";
    }

    for (let piece of all_captured[index]) {
      possible_cells = getPossibleRevive(G.cells, piece, player);
      possible_cells.forEach(cell => {
        //Analizar si un colocar una pieza evita el jaque mate. Para ello utilizo un m??todo parecido al revivePiece
        var saved = revivePieceToAvoidMate(G, cell.substr(0, 1), cell.substr(1, 4), player.concat(piece));

        if (saved) {
          save_mate = true;
        }
      });
    }
  } //Seg??n el an??lisis, devolvemos true para JAQUE MATE y false si no hay JAQUE MATE


  if (is_check) {
    if (save_mate) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
},{"boardgame.io/core":"node_modules/boardgame.io/dist/esm/core.js"}],"node_modules/lodash.isequal/index.js":[function(require,module,exports) {
var global = arguments[3];

/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;

},{}],"node_modules/lodash.clonedeep/index.js":[function(require,module,exports) {
var global = arguments[3];

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, true, true);
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = cloneDeep;

},{}],"node_modules/node-rules/lib/node-rules.js":[function(require,module,exports) {
var process = require("process");
(function () {
  'use strict';

  exports.version = '3.0.0';

  var isEqual = require('lodash.isequal');

  var clonedeep = require('lodash.clonedeep');

  function RuleEngine(rules, options) {
    this.init();

    if (typeof rules != "undefined") {
      this.register(rules);
    }

    if (options) {
      this.ignoreFactChanges = options.ignoreFactChanges;
    }

    return this;
  }

  ;

  RuleEngine.prototype.init = function (rules) {
    this.rules = [];
    this.activeRules = [];
  };

  RuleEngine.prototype.register = function (rules) {
    if (Array.isArray(rules)) {
      this.rules = this.rules.concat(rules);
    } else if (rules !== null && typeof rules == "object") {
      this.rules.push(rules);
    }

    this.sync();
  };

  RuleEngine.prototype.sync = function () {
    this.activeRules = this.rules.filter(function (a) {
      if (typeof a.on === "undefined") {
        a.on = true;
      }

      if (a.on === true) {
        return a;
      }
    });
    this.activeRules.sort(function (a, b) {
      if (a.priority && b.priority) {
        return b.priority - a.priority;
      } else {
        return 0;
      }
    });
  };

  RuleEngine.prototype.execute = function (fact, callback) {
    //these new attributes have to be in both last session and current session to support
    // the compare function
    var thisHolder = this;
    var complete = false;
    fact.result = true;
    var session = clonedeep(fact);
    var lastSession = clonedeep(fact);
    var _rules = this.activeRules;
    var matchPath = [];
    var ignoreFactChanges = this.ignoreFactChanges;

    (function FnRuleLoop(x) {
      var API = {
        "rule": function () {
          return _rules[x];
        },
        "when": function (outcome) {
          if (outcome) {
            var _consequence = _rules[x].consequence;
            _consequence.ruleRef = _rules[x].id || _rules[x].name || 'index_' + x;
            thisHolder.nextTick(function () {
              matchPath.push(_consequence.ruleRef);

              _consequence.call(session, API, session);
            });
          } else {
            thisHolder.nextTick(function () {
              API.next();
            });
          }
        },
        "restart": function () {
          return FnRuleLoop(0);
        },
        "stop": function () {
          complete = true;
          return FnRuleLoop(0);
        },
        "next": function () {
          if (!ignoreFactChanges && !isEqual(lastSession, session)) {
            lastSession = clonedeep(session);
            thisHolder.nextTick(function () {
              API.restart();
            });
          } else {
            thisHolder.nextTick(function () {
              return FnRuleLoop(x + 1);
            });
          }
        }
      };
      _rules = thisHolder.activeRules;

      if (x < _rules.length && complete === false) {
        var _rule = _rules[x].condition;

        _rule.call(session, API, session);
      } else {
        thisHolder.nextTick(function () {
          session.matchPath = matchPath;
          return callback(session);
        });
      }
    })(0);
  };

  RuleEngine.prototype.nextTick = function (callbackFn) {
    if (typeof process !== 'undefined' && process.nextTick) {
      process.nextTick(callbackFn);
    } else {
      setTimeout(callbackFn, 0);
    }
  };

  RuleEngine.prototype.findRules = function (query) {
    if (typeof query === "undefined") {
      return this.rules;
    } else {
      // Clean the properties set to undefined in the search query if any to prevent miss match issues.
      Object.keys(query).forEach(key => query[key] === undefined && delete query[key]); // Return rules in the registered rules array which match partially to the query.

      return this.rules.filter(function (rule) {
        return Object.keys(query).some(function (key) {
          return query[key] === rule[key];
        });
      });
    }
  };

  RuleEngine.prototype.turn = function (state, filter) {
    var state = state === "on" || state === "ON" ? true : false;
    var rules = this.findRules(filter);

    for (var i = 0, j = rules.length; i < j; i++) {
      rules[i].on = state;
    }

    this.sync();
  };

  RuleEngine.prototype.prioritize = function (priority, filter) {
    priority = parseInt(priority, 10);
    var rules = this.findRules(filter);

    for (var i = 0, j = rules.length; i < j; i++) {
      rules[i].priority = priority;
    }

    this.sync();
  };

  module.exports = RuleEngine;
})(module.exports);
},{"lodash.isequal":"node_modules/lodash.isequal/index.js","lodash.clonedeep":"node_modules/lodash.clonedeep/index.js","process":"node_modules/process/browser.js"}],"node_modules/node-rules/index.js":[function(require,module,exports) {
/**
 * Export lib/node-rules
 *
 */
(function () {
  'use strict';

  module.exports = require('./lib/node-rules');
})(module.exports);
},{"./lib/node-rules":"node_modules/node-rules/lib/node-rules.js"}],"src/GameRBS.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeEngine = executeEngine;

var _Game = require("./Game.js");

//import GenshiBougin from './Openings.js'

/* Creating Rule Engine instance */
var NodeRules = require('node-rules');

var RuleEngine = require('node-rules'); ///Variables


var state; ////////////////////////////////////////////////////////////////////////////////////////
/////submit of rules////

/* Run engine for each fact */

async function executeEngine(gameState, rules, fn) {
  var R = new RuleEngine(rules, {
    ignoreFactChanges: true
  });
  state = gameState;

  var result_facts = function func() {
    return new Promise((resolve, reject) => {
      submitFacts(gameState, function (result) {
        resolve(result);
      });
    });
  };

  let facts = await result_facts();
  let moves = [];
  let final_moves = [];
  let max_random = 0;

  for (let fact of facts) {
    let m = await new Promise(resolve => R.execute(fact, function (data) {
      if (data.moves[0] != null) {
        //console.log("Movimiento:" + data.moves + " Prioridad: " + data.priorities
        moves = [];

        for (let [index, mv] of data.moves.entries()) {
          if (data.priorities[index] < 0) {
            if (max_random < 4) {
              max_random = max_random + 1;
              var move_info = [];
              move_info.push(data.row);
              move_info.push(data.column);
              move_info.push(mv);
              move_info.push(data.piece);
              move_info.push(data.isHand);
              move_info.push(data.priorities[index]);
              moves.push(move_info);
              resolve(moves);
            } else {
              resolve("");
            }
          } else {
            var move_info = [];
            move_info.push(data.row);
            move_info.push(data.column);
            move_info.push(mv);
            move_info.push(data.piece);
            move_info.push(data.isHand);
            move_info.push(data.priorities[index]);
            moves.push(move_info);
            resolve(moves);
          }
        }
      } else {
        resolve("");
      }
    }));

    if (m != "") {
      for (let mv of m) {
        final_moves.push(mv);
      }
    }
  } //console.log("Final moves: " + final_moves)


  fn(final_moves);
} /////submit of facts////


function submitFacts(state, fn) {
  var facts = [];
  let G = state.G;
  var player_and_piece;

  for (let i = 0; i < G.cells.length; i++) {
    let row = G.cells[i];

    for (let j = 0; j < G.cells[i].length; j++) {
      if (row[j] != null) {
        player_and_piece = row[j];
        var piece = player_and_piece.substr(1, 4);
        var player = player_and_piece.substr(0, 1);
        var fact = createFact(state, piece, i, j, player, 0);
        facts.push(fact);
      }
    }
  }

  for (let i = 0; i < G.sente_captured_pieces.length; i++) {
    player_and_piece = G.sente_captured_pieces[i];
    var piece = player_and_piece.substr(0, 4);
    var fact = createReviveFact(state, piece, 0, 0, "0", 1);
    facts.push(fact);
  }

  for (let i = 0; i < G.gote_captured_pieces.length; i++) {
    player_and_piece = G.gote_captured_pieces[i];
    var piece = player_and_piece.substr(0, 4);
    var fact = createReviveFact(state, piece, 0, 0, "1", 1);
    facts.push(fact);
  } //facts.push(fact2)


  fn(facts);
}

function createFact(state, piece_type, row_id, column_id, player_id, hand) {
  var factName = player_id.concat(piece_type).concat(row_id.toString()).concat(column_id.toString()).concat(hand.toString());
  var value = getValueOfPiece(piece_type, hand);
  var factMoves = [];
  var factPriorities = [];
  var factName = {
    "piece": piece_type.toString(),
    "player": player_id.toString(),
    "row": row_id.toString(),
    "column": column_id.toString(),
    "isHand": hand.toString(),
    "value": value.toString(),
    "state": state,
    "possibleMoves": (0, _Game.getPossibleCells)(state.G.cells, parseInt(row_id), parseInt(column_id), piece_type, player_id),
    "moves": factMoves,
    "priorities": factPriorities
  };
  return factName;
}

function createReviveFact(state, piece_type, row_id, column_id, player_id, hand) {
  var factName = player_id.concat(piece_type).concat(row_id.toString()).concat(column_id.toString()).concat(hand.toString());
  var value = getValueOfPiece(piece_type, hand);
  var factMoves = [];
  var factPriorities = [];
  var factName = {
    "piece": piece_type.toString(),
    "player": player_id.toString(),
    "row": row_id.toString(),
    "column": column_id.toString(),
    "isHand": hand.toString(),
    "value": value.toString(),
    "state": state,
    "possibleMoves": (0, _Game.getPossibleRevive)(state.G.cells, piece_type, player_id),
    "moves": factMoves,
    "priorities": factPriorities
  };
  return factName;
}

function getValueOfPiece(piece, isHand) {
  var value;

  if (isHand) {
    if (piece == "P") {
      value = 1.15;
    }

    if (piece == "L") {
      value = 4.8;
    }

    if (piece == "K") {
      value = 5.1;
    }

    if (piece == "S") {
      value = 7.2;
    }

    if (piece == "G") {
      value = 7.8;
    }

    if (piece == "B") {
      value = 11.1;
    }

    if (piece == "R") {
      value = 12.70;
    }
  } else {
    if (piece == "P") {
      value = 1;
    }

    if (piece == "L") {
      value = 4.3;
    }

    if (piece == "K") {
      value = 4.5;
    }

    if (piece == "S") {
      value = 6.4;
    }

    if (piece == "G") {
      value = 6.9;
    }

    if (piece == "B") {
      value = 8.9;
    }

    if (piece == "R") {
      value = 10.40;
    }

    if (piece == "KING") {
      value = 1000000000;
    }

    if (piece == "AP") {
      value = 4.2;
    }

    if (piece == "AL") {
      value = 6.3;
    }

    if (piece == "AK") {
      value = 6.4;
    }

    if (piece == "AS") {
      value = 6.7;
    }

    if (piece == "AB") {
      value = 11.5;
    }

    if (piece == "AR") {
      value = 13;
    }
  }

  return value;
}
},{"./Game.js":"src/Game.js","node-rules":"node_modules/node-rules/index.js"}],"src/rules/StrategyRules.js":[function(require,module,exports) {
"use strict";

var _Game = require("../Game.js");

var StrategyRules = [{
  ///////rook strategy
  "condition": function (R) {
    //console.log("Rule: define rook strategy")
    R.when(this.rook == null && this.player == this.state.ctx.currentPlayer);
  },
  "consequence": function (R) {
    // console.log("Rule activated: define rook strategy")
    var rand = Math.round(Math.random());

    if (rand == 1) {
      this.rook = "static";
    } else {
      this.rook = "ranging";
    } //console.log("Rook: " + this.rook)


    R.next();
  }
}, {
  ///////Static rook ruleSet
  "condition": function (R) {
    // console.log("Rule: rook static strategy")
    R.when(this.rook == "static" && this.player == this.state.ctx.currentPlayer);
  },
  "consequence": function (R) {
    //console.log("Rule activated: static rook strategy")
    let ruleSet = this.strategy;
    ruleSet.push("StaticRookRules");
    this.strategy = ruleSet;
    R.next();
  }
}, {
  ///////Rangling rook ruleSet
  "condition": function (R) {
    //console.log("Rule: ranging rook strategy")
    R.when(this.rook == "ranging" && this.player == this.state.ctx.currentPlayer);
  },
  "consequence": function (R) {
    //console.log("Rule activated: ranging rook strategy")
    let ruleSet = this.strategy;
    ruleSet.push("RangingRookRules");
    this.strategy = ruleSet;
    R.next();
  }
}, {
  ///////Yagura Castle
  "condition": function (R) {
    //console.log("Rule: Yagura Castle")
    R.when((this.castle == null || this.castle == "Yagura") && this.rook == "static" && (this.oposing_rook == "static" || this.oposing_rook == "null") && this.player == this.state.ctx.currentPlayer);
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura Castle")
    let ruleSet = this.strategy;
    ruleSet.push("Yagura");
    this.strategy = ruleSet;
    this.castle = "Yagura";
    R.next();
  }
}, {
  ///////Boat Castle set
  "condition": function (R) {
    //console.log("Rule: Boat Castle")
    R.when((this.castle == null || this.castle == "Boat") && this.rook == "static" && this.oposing_rook == "ranging" && this.player == this.state.ctx.currentPlayer);
  },
  "consequence": function (R) {
    //console.log("Rule activated: Boat Castle")
    let ruleSet = this.strategy;
    ruleSet.push("Boat");
    this.strategy = ruleSet;
    this.castle = "Boat";
    R.next();
  }
}, {
  ///////Mino Castle set
  "condition": function (R) {
    //console.log("Rule: Mino Castle")
    R.when(this.castle == null && this.rook == "ranging" && this.oposing_rook == "static" && this.player == this.state.ctx.currentPlayer);
  },
  "consequence": function (R) {
    //console.log("Rule activated: Mino Castle")
    let ruleSet = this.strategy;
    ruleSet.push("Mino");
    this.strategy = ruleSet; //this.castle = "Mino"

    R.next();
  }
}, {
  ///////PeerlesGold Castle set
  "condition": function (R) {
    //console.log("Rule: Mino Castle")
    R.when((this.castle == null || this.castle == "PeerlessGold") && this.rook == "ranging" && this.oposing_rook == "ranging" && this.player == this.state.ctx.currentPlayer);
  },
  "consequence": function (R) {
    //console.log("Rule activated: Mino Castle")
    let ruleSet = this.strategy;
    ruleSet.push("PeerlessGold");
    this.strategy = ruleSet;
    this.castle = "PeerlessGold";
    R.next();
  }
}];
module.exports = {
  StrategyRules
};
},{"../Game.js":"src/Game.js"}],"src/StrategyRBS.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeStrategyEngine = executeStrategyEngine;

/* Creating Rule Engine instance */
var RuleEngine = require('node-rules'); ///Variables


var G;
var state;
var rooks = [null, null]; ////////////////////////////////////////////////////////////////////////////////////////
/////submit of rules////

var strategy_rules = require('./rules/StrategyRules.js');

var R = new RuleEngine(strategy_rules.StrategyRules, {
  ignoreFactChanges: true
});
/* Run engine for each fact */

async function executeStrategyEngine(gameState, fn) {
  state = gameState;

  var result_facts = function func() {
    return new Promise((resolve, reject) => {
      submitFacts(gameState, function (result) {
        resolve(result);
      });
    });
  };

  let facts = await result_facts(); //console.log("Strategy facts: " )  
  //console.log(facts)  

  let rules = [];

  for (let fact of facts) {
    let m = await new Promise(resolve => R.execute(fact, function (data) {
      if (data.strategy != null) {
        if (data.rook != null) {
          rooks[parseInt(data.player)] = data.rook;
        }

        let move_info = data.strategy;
        resolve(move_info);
      } else {
        resolve("");
      }
    }));

    if (m != "") {
      rules.push(m);
    }
  } //console.log("Final rules: " + rules)


  fn(rules);
} /////submit of facts////


function submitFacts(state, fn) {
  var facts = [];
  let G = state.G;
  var player_and_piece;

  for (let i = 0; i < state.ctx.numPlayers; i++) {
    var fact = createFact(state, i.toString());
    facts.push(fact);
  } //facts.push(fact2)


  fn(facts);
}

function createFact(state, player_id) {
  var factName = player_id;

  if (player_id == "0") {
    var rival_id = "1";
  } else {
    var rival_id = "0";
  }

  var ruleSet = [];
  var factName = {
    "player": player_id.toString(),
    "rook": rooks[player_id],
    "oposing_rook": rooks[rival_id],
    "castle": null,
    "state": state,
    "strategy": ruleSet
  };
  return factName;
}

function getValueOfPiece(piece, isHand) {
  var value;

  if (isHand) {
    if (piece == "P") {
      value = 1.15;
    }

    if (piece == "L") {
      value = 4.8;
    }

    if (piece == "K") {
      value = 5.1;
    }

    if (piece == "S") {
      value = 7.2;
    }

    if (piece == "G") {
      value = 7.8;
    }

    if (piece == "B") {
      value = 11.1;
    }

    if (piece == "R") {
      value = 12.70;
    }
  } else {
    if (piece == "P") {
      value = 1;
    }

    if (piece == "L") {
      value = 4.3;
    }

    if (piece == "K") {
      value = 4.5;
    }

    if (piece == "S") {
      value = 6.4;
    }

    if (piece == "G") {
      value = 6.9;
    }

    if (piece == "B") {
      value = 8.9;
    }

    if (piece == "R") {
      value = 10.40;
    }

    if (piece == "KING") {
      value = 1000000000;
    }

    if (piece == "AP") {
      value = 4.2;
    }

    if (piece == "AL") {
      value = 6.3;
    }

    if (piece == "AK") {
      value = 6.4;
    }

    if (piece == "AS") {
      value = 6.7;
    }

    if (piece == "AB") {
      value = 11.5;
    }

    if (piece == "AR") {
      value = 13;
    }
  }

  return value;
}
},{"node-rules":"node_modules/node-rules/index.js","./rules/StrategyRules.js":"src/rules/StrategyRules.js"}],"src/rules/OpeningRookRules/StaticRookRules.js":[function(require,module,exports) {
var StaticRookRules = [{
  ///////Advance Pawn
  "priority": 8,
  "condition": function (R) {
    var notPositioned = false;

    if (this.piece == "P" && (this.column == 1 && this.row == 2 && this.player == "0" || this.column == 7 && this.row == 6 && this.player == "1")) {
      notPositioned = true;
    }

    R.when(notPositioned && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "31";
    } else {
      new_position = "57";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(8);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Advance Pawn
  "priority": 8,
  "condition": function (R) {
    var notPositioned = false;

    if (this.piece == "P" && (this.column == 1 && this.row == 3 && this.player == "0" || this.column == 7 && this.row == 5 && this.player == "1")) {
      notPositioned = true;
    }

    R.when(notPositioned && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "41";
    } else {
      new_position = "47";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(8);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Advance Pawn
  "priority": 8,
  "condition": function (R) {
    var notPositioned = false;

    if (this.piece == "P" && (this.column == 1 && this.row == 4 && this.player == "0" || this.column == 7 && this.row == 4 && this.player == "1")) {
      notPositioned = true;
    }

    R.when(notPositioned && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "51";
    } else {
      new_position = "37";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(7);
    this.moves.push(row + column);
    R.next();
  }
}];
module.exports = {
  StaticRookRules
};
},{}],"src/rules/OpeningRookRules/RangingRookRules.js":[function(require,module,exports) {
var RangingRookRules = [{
  ///////Forth column
  "priority": 9,
  "condition": function (R) {
    var notPositioned = false;

    if (this.piece == "R" && (this.column == 1 && this.row == 1 && this.player == "0" || this.column == 7 && this.row == 7 && this.player == "1")) {
      notPositioned = true;
    }

    R.when(notPositioned && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "15";
    } else {
      new_position = "73";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(10);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Third column
  "priority": 9,
  "condition": function (R) {
    var notPositioned = false;

    if (this.piece == "R" && (this.column == 1 && this.row == 1 && this.player == "0" || this.column == 7 && this.row == 7 && this.player == "1")) {
      notPositioned = true;
    }

    R.when(notPositioned && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "16";
    } else {
      new_position = "72";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(10);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Opposing rooks
  "priority": 9,
  "condition": function (R) {
    var notPositioned = false;

    if (this.piece == "R" && (this.column == 1 && this.row == 1 && this.player == "0" || this.column == 7 && this.row == 7 && this.player == "1")) {
      notPositioned = true;
    }

    R.when(notPositioned && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "17";
    } else {
      new_position = "71";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(10);
    this.moves.push(row + column);
    R.next();
  }
}];
3;
module.exports = {
  RangingRookRules
};
},{}],"src/rules/Castles/Yagura.js":[function(require,module,exports) {
"use strict";

var _Game = require("../../Game.js");

var Yagura = [{
  ///////Pawn
  "priority": 10,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "P" && (this.column == 2 && this.row == 6 && this.player == "1" || this.column == 6 && this.row == 2 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("36") && this.player == "0" || this.possibleMoves.includes("52") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    var new_position;

    if (this.player == "0") {
      new_position = "36";
    } else {
      new_position = "52";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(10);
    this.moves.push(row + column);
    R.next();
  }
}, //////////////////////// 9
{
  ///////Silver
  "priority": 9,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "S" && (this.column == 2 && this.row == 8 && this.player == "1" || this.column == 6 && this.row == 0 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("15") && this.player == "0" || this.possibleMoves.includes("73") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura silver 1")
    var new_position;

    if (this.player == "0") {
      new_position = "15";
    } else {
      new_position = "73";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(9);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Silver
  //"priority":8,
  "condition": function (R) {
    //console.log("Rule: Yagura silver 2")
    var notPositioned = false;
    var possible = false;

    if (this.piece == "S" && (this.column == 3 && this.row == 7 && this.player == "1" || this.column == 5 && this.row == 1 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("26") && this.player == "0" || this.possibleMoves.includes("62") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura silver 2")
    var new_position;

    if (this.player == "0") {
      new_position = "26";
    } else {
      new_position = "62";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(9);
    this.moves.push(row + column);
    R.next();
  }
}, /////////////// if bishop exchange
{
  ///////Silver
  "priority": 8,
  "condition": function (R) {
    //console.log("Rule: Yagura silver 2")
    var notPositioned = false;
    var possible = false;
    var sente_row = this.state.G.cells[1];
    var gote_row = this.state.G.cells[7]; //console.log(sente_row[7])

    if (this.piece == "S" && (this.column == 2 && this.row == 8 && this.player == "1" || this.column == 6 && this.row == 0 && this.player == "0") && (this.player == "0" && sente_row[7] == "1AB" || this.player == "1" && gote_row[1] == "0AB" || this.player == "0" && sente_row[7] == "1B" || this.player == "1" && gote_row[1] == "0B")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("17") && this.player == "0" || this.possibleMoves.includes("71") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura silver 2")
    var new_position;

    if (this.player == "0") {
      new_position = "17";
    } else {
      new_position = "71";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(9);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Silver
  "priority": 8,
  "condition": function (R) {
    //console.log("Rule: Yagura silver 2")
    var notPositioned = false;
    var possible = false;

    if (this.piece == "S" && (this.column == 1 && this.row == 7 && this.player == "1" || this.column == 7 && this.row == 1 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("26") && this.player == "0" || this.possibleMoves.includes("62") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura silver 2")
    var new_position;

    if (this.player == "0") {
      new_position = "26";
    } else {
      new_position = "62";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(9);
    this.moves.push(row + column);
    R.next();
  }
}, //////////////////////// 7
{
  ///////Pawn
  "priority": 7,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "P" && (this.column == 4 && this.row == 6 && this.player == "1" || this.column == 4 && this.row == 2 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("34") && this.player == "0" || this.possibleMoves.includes("54") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "34";
    } else {
      new_position = "54";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(7);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Pawn
  "priority": 7,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "P" && (this.column == 3 && this.row == 6 && this.player == "1" || this.column == 5 && this.row == 2 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("35") && this.player == "0" || this.possibleMoves.includes("53") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "35";
    } else {
      new_position = "53";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(7);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Golden
  "priority": 6,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "G" && (this.column == 5 && this.row == 8 && this.player == "1" || this.column == 3 && this.row == 0 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("14") && this.player == "0" || this.possibleMoves.includes("74") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura golden 1")
    var new_position;

    if (this.player == "0") {
      new_position = "14";
    } else {
      new_position = "74";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(7); //console.log(row+column)

    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Golden
  "priority": 4,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "G" && (this.column == 3 && this.row == 8 && this.player == "1" || this.column == 5 && this.row == 0 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("16") && this.player == "0" || this.possibleMoves.includes("72") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura golden 2")
    var new_position;

    if (this.player == "0") {
      new_position = "16";
    } else {
      new_position = "72";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(7);
    this.moves.push(row + column);
    R.next();
  }
}, /////////////////////// 5
{
  ///////Bishop
  "priority": 7,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "B" && (this.column == 1 && this.row == 7 && this.player == "1" || this.column == 7 && this.row == 1 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("06") && this.player == "0" || this.possibleMoves.includes("82") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "06";
    } else {
      new_position = "82";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(5);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Bishop
  "priority": 7,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;
    var sente_row = this.state.G.cells[1];
    var gote_row = this.state.G.cells[7];

    if (this.piece == "B" && (this.column == 2 && this.row == 8 && this.player == "1" || this.column == 6 && this.row == 0 && this.player == "0") && (this.player == "0" && sente_row[6] != null || this.player == "1" && gote_row[2] != null)) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("15") && this.player == "0" || this.possibleMoves.includes("73") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "15";
    } else {
      new_position = "73";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(5);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////King
  "priority": 6,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;
    var sente_row = this.state.G.cells[0];
    var gote_row = this.state.G.cells[8];

    if (this.piece == "KING" && (this.column == 4 && this.row == 8 && this.player == "1" || this.column == 4 && this.row == 0 && this.player == "0") && !(this.player == "0" && sente_row[5] != null || this.player == "1" && gote_row[3] != null)) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("05") && this.player == "0" || this.possibleMoves.includes("83") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "05";
    } else {
      new_position = "83";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(5);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Golden
  "priority": 6,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "G" && (this.column == 4 && this.row == 7 && this.player == "1" || this.column == 4 && this.row == 1 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("25") && this.player == "0" || this.possibleMoves.includes("63") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "25";
    } else {
      new_position = "63";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(5);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////King
  "priority": 5,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;
    var sente_row = this.state.G.cells[1];
    var gote_row = this.state.G.cells[7];

    if (this.piece == "KING" && (this.column == 3 && this.row == 8 && this.player == "1" || this.column == 5 && this.row == 0 && this.player == "0") && !(this.player == "0" && sente_row[6] != null || this.player == "1" && gote_row[2] != null)) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("16") && this.player == "0" || this.possibleMoves.includes("72") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "16";
    } else {
      new_position = "72";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(5);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////King
  "priority": 5,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;
    var sente_row = this.state.G.cells[1];
    var gote_row = this.state.G.cells[7];
    var sente_row_bishop = this.state.G.cells[0];
    var gote_row_bishop = this.state.G.cells[8];

    if (this.piece == "KING" && (this.column == 3 && this.row == 8 && this.player == "1" || this.column == 5 && this.row == 0 && this.player == "0") && (this.player == "0" && sente_row[6] != null || this.player == "1" && gote_row[2] != null) && !(this.player == "0" && sente_row[7] != null || this.player == "1" && gote_row[1] != null)) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("06") && this.player == "0" || this.possibleMoves.includes("82") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "06";
    } else {
      new_position = "82";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(5);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////King
  "priority": 5,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "KING" && (this.column == 2 && this.row == 7 && this.player == "1" || this.column == 6 && this.row == 1 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("17") && this.player == "0" || this.possibleMoves.includes("71") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "17";
    } else {
      new_position = "71";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(5);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////King
  "priority": 5,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "KING" && (this.column == 2 && this.row == 8 && this.player == "1" || this.column == 6 && this.row == 0 && this.player == "0")) {
      notPositioned = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "17";
    } else {
      new_position = "71";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(5);
    this.moves.push(row + column);
    R.next();
  }
}];
module.exports = {
  Yagura
};
},{"../../Game.js":"src/Game.js"}],"src/rules/Castles/Boat.js":[function(require,module,exports) {
var Boat = [//////////////10
{
  ///////Pawn
  "priority": 10,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "P" && (this.column == 2 && this.row == 6 && this.player == "1" || this.column == 6 && this.row == 2 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("36") && this.player == "0" || this.possibleMoves.includes("52") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    var new_position;

    if (this.player == "0") {
      new_position = "36";
    } else {
      new_position = "52";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(10);
    this.moves.push(row + column);
    R.next();
  }
}, /////////////9
{
  ///////King
  "priority": 9,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "KING" && (this.column == 4 && this.row == 8 && this.player == "1" || this.column == 4 && this.row == 0 && this.player == "0")) {
      notPositioned = true;
    }

    var possible = false;

    if (this.possibleMoves.includes("15") && this.player == "0" || this.possibleMoves.includes("73") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "15";
    } else {
      new_position = "73";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(9);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////King
  "priority": 9,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "KING" && (this.column == 3 && this.row == 7 && this.player == "1" || this.column == 5 && this.row == 1 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("16") && this.player == "0" || this.possibleMoves.includes("72") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "16";
    } else {
      new_position = "72";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(9);
    this.moves.push(row + column);
    R.next();
  }
}, //////////////8
{
  ///////Golden
  "priority": 8,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "G" && (this.column == 5 && this.row == 8 && this.player == "1" || this.column == 3 && this.row == 0 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("14") && this.player == "0" || this.possibleMoves.includes("74") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura golden 1")
    var new_position;

    if (this.player == "0") {
      new_position = "14";
    } else {
      new_position = "74";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(8); //console.log(row+column)

    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Pawn
  "priority": 8,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "P" && (this.column == 4 && this.row == 6 && this.player == "1" || this.column == 4 && this.row == 2 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("34") && this.player == "0" || this.possibleMoves.includes("54") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "34";
    } else {
      new_position = "54";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(8);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Pawn
  "priority": 8,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "P" && (this.column == 0 && this.row == 6 && this.player == "1" || this.column == 8 && this.row == 2 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("38") && this.player == "0" || this.possibleMoves.includes("50") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "38";
    } else {
      new_position = "50";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(8);
    this.moves.push(row + column);
    R.next();
  }
}];
module.exports = {
  Boat
};
},{}],"src/rules/Castles/Mino.js":[function(require,module,exports) {
var Mino = [////////////// 10
{
  ///////Pawn
  "priority": 10,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "P" && (this.column == 3 && this.row == 6 && this.player == "1" || this.column == 5 && this.row == 2 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("35") && this.player == "0" || this.possibleMoves.includes("53") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    var new_position;

    if (this.player == "0") {
      new_position = "35";
    } else {
      new_position = "53";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(10);
    this.moves.push(row + column);
    R.next();
  }
}, ////////////// 9
{
  ///////Pawn
  "priority": 9,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "P" && (this.column == 2 && this.row == 6 && this.player == "1" || this.column == 6 && this.row == 2 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("36") && this.player == "0" || this.possibleMoves.includes("52") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    var new_position;

    if (this.player == "0") {
      new_position = "36";
    } else {
      new_position = "52";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(9);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Bishop
  "priority": 9,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "B" && (this.column == 1 && this.row == 7 && this.player == "1" || this.column == 7 && this.row == 1 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("26") && this.player == "0" || this.possibleMoves.includes("62") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "26";
    } else {
      new_position = "62";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(9);
    this.moves.push(row + column);
    R.next();
  }
}, ///////////////////////// 8 
{
  ///////Silver
  "priority": 8,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "S" && (this.column == 2 && this.row == 8 && this.player == "1" || this.column == 6 && this.row == 0 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("16") && this.player == "0" || this.possibleMoves.includes("72") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura silver 1")
    var new_position;

    if (this.player == "0") {
      new_position = "16";
    } else {
      new_position = "72";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(8);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////King
  "priority": 8,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "KING" && (this.column == 4 && this.row == 8 && this.player == "1" || this.column == 4 && this.row == 0 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("13") && this.player == "0" || this.possibleMoves.includes("75") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "13";
    } else {
      new_position = "75";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(8);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////King
  "priority": 8,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "KING" && (this.column == 5 && this.row == 7 && this.player == "1" || this.column == 3 && this.row == 1 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("12") && this.player == "0" || this.possibleMoves.includes("76") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "12";
    } else {
      new_position = "76";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(8);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////King
  "priority": 8,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "KING" && (this.column == 6 && this.row == 7 && this.player == "1" || this.column == 2 && this.row == 1 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("11") && this.player == "0" || this.possibleMoves.includes("77") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "11";
    } else {
      new_position = "77";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(8);
    this.moves.push(row + column);
    R.next();
  }
}, ///////////////////// 7 
{
  ///////Silver
  "priority": 7,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "S" && (this.column == 6 && this.row == 8 && this.player == "1" || this.column == 2 && this.row == 0 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("12") && this.player == "0" || this.possibleMoves.includes("76") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "12";
    } else {
      new_position = "76";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(7);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Golden
  "priority": 7,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "G" && (this.column == 3 && this.row == 8 && this.player == "1" || this.column == 5 && this.row == 0 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("14") && this.player == "0" || this.possibleMoves.includes("74") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "14";
    } else {
      new_position = "74";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(7);
    this.moves.push(row + column);
    R.next();
  }
}];
module.exports = {
  Mino
};
},{}],"src/rules/Castles/PeerlessGold.js":[function(require,module,exports) {
var PeerlessGold = [////////////// 10
{
  ///////Pawn
  "priority": 10,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "P" && (this.column == 3 && this.row == 6 && this.player == "1" || this.column == 5 && this.row == 2 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("35") && this.player == "0" || this.possibleMoves.includes("53") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    var new_position;

    if (this.player == "0") {
      new_position = "35";
    } else {
      new_position = "53";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(10);
    this.moves.push(row + column);
    R.next();
  }
}, ////////////// 9
{
  ///////Pawn
  "priority": 9,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "P" && (this.column == 2 && this.row == 6 && this.player == "1" || this.column == 6 && this.row == 2 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("36") && this.player == "0" || this.possibleMoves.includes("52") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    var new_position;

    if (this.player == "0") {
      new_position = "36";
    } else {
      new_position = "52";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(9);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Bishop
  "priority": 9,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "B" && (this.column == 1 && this.row == 7 && this.player == "1" || this.column == 7 && this.row == 1 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("26") && this.player == "0" || this.possibleMoves.includes("62") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "26";
    } else {
      new_position = "62";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(9);
    this.moves.push(row + column);
    R.next();
  }
}, ///////////////////////// 8 
{
  ///////Silver
  "priority": 8,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "S" && (this.column == 2 && this.row == 8 && this.player == "1" || this.column == 6 && this.row == 0 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("16") && this.player == "0" || this.possibleMoves.includes("72") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura silver 1")
    var new_position;

    if (this.player == "0") {
      new_position = "16";
    } else {
      new_position = "72";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(8);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Silver
  "priority": 8,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "S" && (this.column == 2 && this.row == 7 && this.player == "1" || this.column == 6 && this.row == 1 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("25") && this.player == "0" || this.possibleMoves.includes("63") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura silver 1")
    var new_position;

    if (this.player == "0") {
      new_position = "25";
    } else {
      new_position = "63";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(8);
    this.moves.push(row + column);
    R.next();
  }
}, ///////////////////// 7 
{
  ///////Rook
  "priority": 7,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "R" && (this.row == 7 && this.player == "1" || this.row == 1 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("17") && this.player == "0" || this.possibleMoves.includes("71") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura silver 1")
    var new_position;

    if (this.player == "0") {
      new_position = "17";
    } else {
      new_position = "71";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(7);
    this.moves.push(row + column);
    R.next();
  }
}, ///////////////// 6 
{
  ///////King
  "priority": 6,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "KING" && (this.column == 4 && this.row == 8 && this.player == "1" || this.column == 4 && this.row == 0 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("13") && this.player == "0" || this.possibleMoves.includes("75") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "13";
    } else {
      new_position = "75";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(6);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////King
  "priority": 6,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "KING" && (this.column == 5 && this.row == 7 && this.player == "1" || this.column == 3 && this.row == 1 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("12") && this.player == "0" || this.possibleMoves.includes("76") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "12";
    } else {
      new_position = "76";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(6);
    this.moves.push(row + column);
    R.next();
  }
}, //////////////// 4
{
  ///////Silver
  "priority": 4,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "S" && (this.column == 6 && this.row == 8 && this.player == "1" || this.column == 2 && this.row == 0 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("11") && this.player == "0" || this.possibleMoves.includes("77") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "11";
    } else {
      new_position = "77";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(4);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Golden
  "priority": 4,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "G" && (this.column == 5 && this.row == 8 && this.player == "1" || this.column == 3 && this.row == 0 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("13") && this.player == "0" || this.possibleMoves.includes("75") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "13";
    } else {
      new_position = "75";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(4);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Golden
  "priority": 4,
  "condition": function (R) {
    var notPositioned = false;
    var possible = false;

    if (this.piece == "G" && (this.column == 3 && this.row == 8 && this.player == "1" || this.column == 5 && this.row == 0 && this.player == "0")) {
      notPositioned = true;
    }

    if (this.possibleMoves.includes("14") && this.player == "0" || this.possibleMoves.includes("74") && this.player == "1") {
      possible = true;
    }

    R.when(notPositioned && possible && this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.isHand == "0");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Yagura pawn")
    var new_position;

    if (this.player == "0") {
      new_position = "14";
    } else {
      new_position = "74";
    }

    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1);
    this.priorities.push(4);
    this.moves.push(row + column);
    R.next();
  }
}];
module.exports = {
  PeerlessGold
};
},{}],"src/rules/BasicRules.js":[function(require,module,exports) {
"use strict";

var _Game = require("../Game.js");

var BasicRules = [{
  ///////Capture
  "priority": 5,
  "condition": function (R) {
    //console.log("Rule: Capture")
    //console.log("player: " + this.player + this.state.ctx.currentPlayer)
    var threats;

    if (this.player == this.state.ctx.currentPlayer) {
      threats = getThreats(this.state.G, this.possibleMoves, this.state.ctx.currentPlayer, this);
    } //console.log(threads)


    R.when(this.player == this.state.ctx.currentPlayer && this.isHand == "0" && threats != "");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Capture")
    //var state = require('./ShogiRBS.js')
    //var G = state.G
    let threats = getThreats(this.state.G, this.possibleMoves, this.state.ctx.currentPlayer);
    var rand = parseInt(Math.random() * (threats.length - 0) + 0);
    var thread = threats[rand];
    var row = thread[1].substr(0, 1);
    var column = thread[2].substr(0, 1); //console.log(thread)
    //console.log(row)
    //console.log(column)

    this.priorities.push(3);
    this.moves.push(row + column); //console.log(this);

    R.next();
  }
}, {
  ///////Check
  "priority": 5,
  "condition": function (R) {
    //console.log("Rule: Capture")
    var check_moves;

    if (this.player == this.state.ctx.currentPlayer) {
      check_moves = doesCheck(this.state.G, this.state.ctx, this.row, this.column, this.piece, this.possibleMoves, this.player);
    }

    R.when(this.player == this.state.ctx.currentPlayer && check_moves != "");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Check")
    let check_moves = doesCheck(this.state.G, this.state.ctx, this.row, this.column, this.piece, this.possibleMoves, this.player);
    var rand = parseInt(Math.random() * (check_moves.length - 0) + 0);
    var mov = check_moves[rand];
    var row = mov[0].substr(0, 1);
    var column = mov[1].substr(0, 1); //console.log(check_moves)

    this.priorities.push(3);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Check Mate
  "priority": 5,
  "condition": function (R) {
    //console.log("Rule: Capture")
    var check_moves;
    var mate_moves;

    if (this.player == this.state.ctx.currentPlayer) {
      check_moves = doesCheck(this.state.G, this.state.ctx, this.row, this.column, this.piece, this.possibleMoves, this.player);

      if (check_moves != "") {
        mate_moves = doesMate(this.state.G, this.state.ctx, this.row, this.column, this.piece, this.possibleMoves, this.player);
      }
    }

    R.when(this.player == this.state.ctx.currentPlayer && check_moves != "" && mate_moves != "");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Check Mate")
    var mate_moves = doesMate(this.state.G, this.state.ctx, this.row, this.column, this.piece, this.possibleMoves, this.player);
    var rand = parseInt(Math.random() * (mate_moves.length - 0) + 0);
    var mov = mate_moves[rand];
    var row = mov[0].substr(0, 1);
    var column = mov[1].substr(0, 1); //console.log(mate_moves)

    this.priorities.push(10000000000000000000000000);
    this.moves.push(row + column);
    R.next();
  }
}, {
  ///////Fork
  "priority": 5,
  "condition": function (R) {
    var forkMoves;

    if (this.player == this.state.ctx.currentPlayer) {
      forkMoves = doesFork(this.state, this.possibleMoves, this);
    } //console.log(threads)


    R.when(this.player == this.state.ctx.currentPlayer && forkMoves != "");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Fork")
    let forkMoves = doesFork(this.state, this.possibleMoves, this);

    for (let mv of forkMoves) {
      var row = mv.substr(0, 1);
      var column = mv.substr(1, 1); //console.log(row+column)

      this.moves.push(row + column);
      this.priorities.push(0);
    }

    R.next();
  }
}, {
  ///////Scape
  "priority": 5,
  "condition": function (R) {
    var threatened = false;

    if (this.player == this.state.ctx.currentPlayer) {
      threatened = isThreatened(this.state, this.player, this.row, this.column);
    }

    R.when(this.player == this.state.ctx.currentPlayer && threatened && this.possibleMoves != "");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Scape")
    var factRow = parseInt(this.row);
    var factColumn = parseInt(this.column);
    var threatened = true;

    for (let move of this.possibleMoves) {
      var newState = JSON.parse(JSON.stringify(this.state));
      newState.G = (0, _Game.movePiece)(newState.G, newState.ctx, factRow, factColumn, parseInt(move.substr(0, 1)), parseInt(move.substr(1, 1)), this.piece);

      if (newState.G != "INVALID_MOVE") {
        //console.log(newState)
        threatened = isThreatened(newState, this.player, move.substr(0, 1), move.substr(1, 1));

        if (!threatened) {
          var row = move.substr(0, 1);
          var column = move.substr(1, 1); //console.log(row+column)

          this.moves.push(row + column);
          this.priorities.push(2);
        }
      }
    }

    R.next();
  }
}, {
  ///////Attack
  "priority": 5,
  "condition": function (R) {
    var moves;

    if (this.player == this.state.ctx.currentPlayer) {
      moves = canAttack(this.state, this.possibleMoves, this);
    }

    R.when(this.player == this.state.ctx.currentPlayer && moves != null && this.possibleMoves != "");
  },
  "consequence": function (R) {
    //console.log("Rule activated: Attack")
    //console.log(this)
    let moves = canAttack(this.state, this.possibleMoves, this);

    for (let mv of moves) {
      var row = mv.substr(0, 1);
      var column = mv.substr(1, 1); //console.log(row+column)

      this.moves.push(row + column);
      this.priorities.push(1);
    }

    R.next();
  }
}, {
  ///////moveRandom
  "priority": 0,
  "condition": function (R) {
    //console.log("Rule: moveRandom")
    R.when(this.possibleMoves != "" && this.player == this.state.ctx.currentPlayer && this.moves == "");
  },
  "consequence": function (R) {
    //console.log("Rule activated: moveRandom")
    //var state = require('./ShogiRBS.js')
    //var G = state.G
    var rand = parseInt(Math.random() * (this.possibleMoves.length - 0) + 0);
    var new_position = this.possibleMoves[rand];
    var row = new_position.substr(0, 1);
    var column = new_position.substr(1, 1); //this.result = true;

    this.priorities.push(-0.25);
    this.moves.push(row + column); //console.log(this);
    //console.log(row+column)
    //console.log(this);

    R.next();
  }
}];
module.exports = {
  BasicRules
};

function getThreats(G, possibleMoves, player, fact) {
  let threats = [];
  var row;
  var column;
  var G_row;
  var count = 0;

  for (let cell of possibleMoves) {
    row = cell.substr(0, 1);
    column = cell.substr(1, 1);
    G_row = G.cells[row];

    if (G_row[column] != null && G_row[column].substr(0, 1) != player.toString()) {
      var thread = [G_row[column], row, column];
      threats[count] = thread;
      count = count + 1;
    }
  }

  for (let th of threats) {//console.log("threat: ")
    //console.log(th)
    //console.log(fact)
    //console.log(G)
    //console.log(possibleMoves)
  }

  return threats;
}

function doesCheck(G, ctx, row, column, piece, possibleMoves, player) {
  let newG;
  let check_cells = [];
  var mov = [];

  for (let cell of possibleMoves) {
    newG = JSON.parse(JSON.stringify(G));
    var row = newG.cells[cell.substr(0, 1)];
    row[cell.substr(1, 1)] = player.concat(piece);
    newG.cells[cell.substr(0, 1)] = row;

    if ((0, _Game.isCheck)(newG, player)) {
      mov = [cell.substr(0, 1), cell.substr(1, 1)];
      check_cells.push(mov);
    }
  }

  return check_cells;
}

function doesMate(G, ctx, row, column, piece, possibleMoves, player) {
  let newG;
  let check_cells = [];
  var mov = [];

  for (let cell of possibleMoves) {
    newG = JSON.parse(JSON.stringify(G));
    var row = newG.cells[cell.substr(0, 1)];
    row[cell.substr(1, 1)] = player.concat(piece);
    newG.cells[cell.substr(0, 1)] = row;

    if ((0, _Game.isCheckMate)(newG, ctx)) {
      mov = [cell.substr(0, 1), cell.substr(1, 1)];
      check_cells.push(mov);
    }
  }

  return check_cells;
}

function doesFork(state, possibleMoves, fact) {
  var threats;
  var newPossibleMoves;
  var forkMoves = [];
  var factRow = parseInt(fact.row);
  var factColumn = parseInt(fact.column); //console.log(fact)

  if (fact.isHand == "0") {
    for (let move of possibleMoves) {
      var newState = JSON.parse(JSON.stringify(state));
      newState.G = (0, _Game.movePiece)(newState.G, newState.ctx, factRow, factColumn, parseInt(move.substr(0, 1)), parseInt(move.substr(1, 1)), fact.piece);

      if (newState.G != "INVALID_MOVE") {
        newPossibleMoves = (0, _Game.getPossibleCells)(newState.G.cells, parseInt(move.substr(0, 1)), parseInt(move.substr(1, 1)), fact.piece, fact.player);
        threats = getThreats(newState.G, newPossibleMoves, fact.player, fact);

        if (threats.length > 1) {
          forkMoves.push(move);
        }
      }
    }
  } else {
    for (let move of possibleMoves) {
      var newState = JSON.parse(JSON.stringify(state));
      newState.G = (0, _Game.revivePiece)(newState.G, newState.ctx, move.substr(0, 1), move.substr(1, 1), fact.player.concat(fact.piece));

      if (newState.G != "INVALID_MOVE") {
        newPossibleMoves = (0, _Game.getPossibleCells)(newState.G.cells, parseInt(move.substr(0, 1)), parseInt(move.substr(1, 1)), fact.piece, fact.player);
        threats = getThreats(newState.G, newPossibleMoves, fact.player, fact);

        if (threats.length > 1) {
          forkMoves.push(move);
        }
      }
    }
  }

  return forkMoves;
}

function isThreatened(state, player, prow, pcolumn) {
  var cells = state.G.cells;
  var row = -1;
  var column = -1;
  var scape_moves = [];
  var threatened = false;

  for (let cell of cells) {
    row = row + 1;
    column = -1;

    for (let c of cell) {
      column = column + 1;

      if (c != null && c.substr(0, 1) != player) {
        var op_moves = (0, _Game.getPossibleCells)(state.G.cells, row, column, c.substr(1, 4), c.substr(0, 1)); //string

        if (op_moves.includes(prow.concat(pcolumn))) {
          //console.log("THREATNEED")
          threatened = true;
          break;
        }
      }
    }
  }

  return threatened;
}

function canAttack(state, possibleMoves, fact) {
  var threats = null;
  var newPossibleMoves;
  var attackMoves = [];
  var factRow = parseInt(fact.row);
  var factColumn = parseInt(fact.column); //console.log(fact)

  if (fact.isHand == "0") {
    for (let move of possibleMoves) {
      threats = null;
      var newState = JSON.parse(JSON.stringify(state));
      newState.G = (0, _Game.movePiece)(newState.G, newState.ctx, factRow, factColumn, parseInt(move.substr(0, 1)), parseInt(move.substr(1, 1)), fact.piece);

      if (newState.G != "INVALID_MOVE") {
        newPossibleMoves = (0, _Game.getPossibleCells)(newState.G.cells, parseInt(move.substr(0, 1)), parseInt(move.substr(1, 1)), fact.piece, fact.player);
        threats = getThreats(newState.G, newPossibleMoves, fact.player, fact);

        if (threats != "") {
          attackMoves.push(move);
        }
      }
    }
  } else {
    for (let move of possibleMoves) {
      threats = null;
      var newState = JSON.parse(JSON.stringify(state));
      newState.G = (0, _Game.revivePiece)(newState.G, newState.ctx, move.substr(0, 1), move.substr(1, 1), fact.player.concat(fact.piece));

      if (newState.G != "INVALID_MOVE") {
        newPossibleMoves = (0, _Game.getPossibleCells)(newState.G.cells, parseInt(move.substr(0, 1)), parseInt(move.substr(1, 1)), fact.piece, fact.player);
        threats = getThreats(newState.G, newPossibleMoves, fact.player, fact);

        if (threats != "") {
          attackMoves.push(move);
        }
      }
    }
  }

  return attackMoves;
}
},{"../Game.js":"src/Game.js"}],"src/ShogiAI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestMoveAI = requestMoveAI;

var _GameRBS = require("./GameRBS.js");

var _StrategyRBS = require("./StrategyRBS.js");

var _Game = require("./Game.js");

var player;
var currentPlayer;
var rivalPlayer;
var depth = 4;

async function requestMoveAI(event) {
  var startTime = performance.now();
  var client = event.currentTarget.parameter;
  var state = client.getState();
  player = state.ctx.currentPlayer;
  currentPlayer = player;

  if (player == "0") {
    rivalPlayer = "1";
  } else {
    rivalPlayer = "0";
  } /////Get rules -> Strategy//////


  var getRuleSet = function func() {
    return new Promise((resolve, reject) => {
      getStrategy(state, function (result) {
        resolve(result);
      });
    });
  };

  let ruleSet = await getRuleSet();
  var rules = getAllRules(ruleSet); //console.log(rules)
  /////////////// Primer nodo => 

  var first_node_promise = function func() {
    return new Promise((resolve, reject) => {
      getMovesKBS(state, rules, function (result) {
        resolve(result);
      });
    });
  };

  let moves = await first_node_promise();
  var count = 0;

  var minmax_promise = function func() {
    return new Promise((resolve, reject) => {
      getBestMove(moves, state, 0, 0, function (result) {
        resolve(result);
      });
    });
  };

  var bestmove = await minmax_promise();
  var endTime = performance.now();
  console.log(endTime - startTime);
  let row_id = parseInt(bestmove[0]);
  let column_id = parseInt(bestmove[1]);
  let row_target = parseInt(bestmove[2].substr(0, 1));
  let column_target = parseInt(bestmove[2].substr(1, 1));
  let piece = bestmove[3];
  let isHand = bestmove[4];

  if (isHand != 1) {
    client.moves.movePiece(row_id, column_id, row_target, column_target, piece);
  } else {
    client.moves.revivePiece(row_target, column_target, state.ctx.currentPlayer.concat(piece));
  }
}

async function getBestMove(moves, state, node_depth, last_move, fn) {
  var possibleScores = [];
  var possibleMoves = []; //////////////////////CHANGE PLAYER////////////////////////

  if (node_depth % 2 == "0") {
    player = rivalPlayer;
  } else {
    player = currentPlayer;
  } ////////////////CREATE STATES//////////////////////////////


  var possibleStates = moves.map(function (el) {
    const new_state = JSON.parse(JSON.stringify(state));
    let row_id = parseInt(el[0]);
    let column_id = parseInt(el[1]);
    let row_target = parseInt(el[2].substr(0, 1));
    let column_target = parseInt(el[2].substr(1, 1));
    let piece = el[3];
    let isHand = el[4];

    if (isHand != 1) {
      new_state.G = (0, _Game.movePiece)(new_state.G, new_state.ctx, row_id, column_id, row_target, column_target, piece);
    } else {
      ////////OJO ESTO DE PLAYER///////////
      new_state.G = (0, _Game.revivePiece)(new_state.G, new_state.ctx, row_target, column_target, new_state.ctx.currentPlayer.concat(piece));
    }

    if (new_state.G == "INVALID_MOVE") {} else {
      ///////heursiticis////////
      possibleMoves.push(el);

      if (node_depth == 0) {
        new_state.player_priority = 0;
        new_state.rival_priority = 0;
      }

      if (new_state.ctx.currentPlayer == currentPlayer) {
        new_state.player_priority = new_state.player_priority + parseInt(el[5]);
      } else {
        new_state.rival_priority = new_state.rival_priority + parseInt(el[5]);
      }

      var heuris = getHeuristic(new_state, node_depth);
      possibleScores.push(heuris); //console.log("Heuristic: " + heuris)

      new_state.ctx.currentPlayer = player;
      return new_state;
    }
  });
  possibleStates = possibleStates.filter(function (element) {
    return element !== undefined;
  });
  possibleMoves = possibleMoves.filter(function (element) {
    return element !== undefined;
  }); //console.log(myPreviousMove)
  //console.log("Todos los hijos de : "+ node_depth)
  //console.log(possibleStates);
  //console.log("Possible Scores: ")
  //console.log(possibleScores);
  //////////////CHECK STOP OR BOTTOM LEVEL////////////////////

  node_depth = node_depth + 1;
  var myPreviousMove = last_move; //console.log("Depth: " + (depth-1))

  if (node_depth === depth) {
    var retorno = [];

    if (depth % 2 == 0) {
      //console.log("Bottom node. Min heur??stic: " + getMinScore(possibleScores) + " y movimiento: " + myPreviousMove) ;
      retorno.push(getMinScore(possibleScores));
      retorno.push(myPreviousMove);
      return fn(retorno);
    } else {
      //console.log("Bottom node. Max heur??stic: " + getMaxScore(possibleScores) + " y movimiento: " + myPreviousMove);
      retorno.push(getMaxScore(possibleScores));
      retorno.push(myPreviousMove);
      return fn(retorno);
    }
  }

  if (possibleMoves.length < 1) {
    //console.log("NO MOVES")  
    var leaf = [];
    leaf.push(getHeuristic(state, node_depth));
    leaf.push(myPreviousMove);
    return fn(leaf);
  } //////////////////CREATE SONS  -  RECURSIVE///////////////////


  var heuristics = [];

  let makeNodes = () => {
    return new Promise((resolve, reject) => {
      possibleStates.forEach(async function (state, i) {
        //////////////// get rules ////////////
        var getRuleSet = function func() {
          return new Promise((resolve, reject) => {
            getStrategy(state, function (result) {
              resolve(result);
            });
          });
        };

        let ruleSet = await getRuleSet(); //////////Get all rules//////

        var rules = getAllRules(ruleSet); ////////////////get moves//////////////

        var first_node_promise = function func() {
          return new Promise((resolve, reject) => {
            getMovesKBS(state, rules, function (result) {
              resolve(result);
            });
          });
        };

        let new_moves = await first_node_promise(); //////////////Recursive Minmax///////////////

        let callMinmaxLoop = function func() {
          return new Promise((resolve, reject) => {
            //console.log("lets loop " + depth)
            getBestMove(new_moves, state, node_depth, possibleMoves[i], function (result) {
              resolve(result);
            });
          });
        };

        var heur = await callMinmaxLoop();
        heuristics.push(heur);
        resolve(heuristics);
      });
    });
  };

  let heuristicas = await makeNodes(); //console.log(state)
  //console.log("Heur??sticas de : "+ (node_depth-1))
  //console.log(heuristicas)

  for (let h of heuristicas) {//console.log("Move: " + h[1])
    // console.log("H: " + h[0])
  } ///////////////MINMAX BACKPROPAGATION -> FINAL///////////////////////


  if (node_depth == 1) {
    let maxMove = -1000000000000000;
    let bestmov; //console.log("FINAL MOVE: ")

    for (let h of heuristicas) {
      //console.log("Move: " + h[1])
      //console.log("H: " + h[0])
      if (h[0] > maxMove) {
        maxMove = h[0];
        bestmov = h[1];
      }
    } //console.log(bestmov)


    fn(bestmov);
  } else {
    ///////////////////////////console.log("Navigatin through node " +currentPlayer+player )
    //fn(getMax(heuristics))}*/
    var retorno = []; //console.log(heuristicas)

    if ((node_depth - 1) % 2 == 1) {
      //console.log("Nav node de: "+ (node_depth-1) +". Min heur??stic: " + getMin(heuristicas)+ " y movimiento: " + myPreviousMove) ;
      retorno.push(getMin(heuristicas));
      retorno.push(myPreviousMove);
      return fn(retorno);
    } else {
      //console.log("Nav node de: "+ (node_depth-1) +". Max heur??stic: " + getMax(heuristicas)+" y movimiento: " +myPreviousMove); 
      retorno.push(getMax(heuristicas));
      retorno.push(myPreviousMove);
      return fn(retorno);
    }
  }
}

async function getMovesKBS(state, rules, fn) {
  let resultKBS = () => {
    return new Promise((resolve, reject) => {
      (0, _GameRBS.executeEngine)(state, rules, function (result) {
        resolve(result);
      });
    });
  };

  let moves = await resultKBS();
  moves = Array.from(new Set(moves.map(JSON.stringify)), JSON.parse); //console.log("Resultado del SBC: ");
  //console.log(moves);
  //console.log(state.G.cells)

  fn(moves);
}

async function getStrategy(state, fn) {
  let resultStrategy = () => {
    return new Promise((resolve, reject) => {
      (0, _StrategyRBS.executeStrategyEngine)(state, function (result) {
        resolve(result);
      });
    });
  };

  let ruleSet = await resultStrategy();
  fn(ruleSet);
} ///////////////////////


function getHeuristic(new_state, node_depth) {
  var gote_eaten = new_state.G.gote_captured_pieces;
  var sente_eaten = new_state.G.sente_captured_pieces;
  var board_pieces = new_state.G.cells;
  var player = new_state.ctx.currentPlayer;
  var piece_owner;
  var piece_type;
  var piece_value;
  var player_score = 0;
  var rival_score = 0;

  for (let row of board_pieces) {
    for (let piece of row) {
      if (piece != null) {
        piece_owner = piece.substr(0, 1);
        piece_type = piece.substr(1, 4);
        piece_value = getValueOfPiece(piece_type, false);

        if (piece_owner == currentPlayer) {
          player_score += piece_value;
        } else {
          rival_score += piece_value;
        }
      }
    }
  }

  for (let piece of gote_eaten) {
    piece_type = piece.substr(0, 4);
    piece_value = getValueOfPiece(piece_type, false);

    if (currentPlayer == "1") {
      player_score += piece_value;
    } else {
      rival_score += piece_value;
    }
  }

  for (let piece of sente_eaten) {
    piece_type = piece.substr(0, 4);
    piece_value = getValueOfPiece(piece_type, false);

    if (currentPlayer == "0") {
      player_score += piece_value;
    } else {
      rival_score += piece_value;
    }
  }

  var check = (0, _Game.isCheck)(new_state.G, player);
  var multiplier;

  if (player == currentPlayer) {
    multiplier = 5;
  } else {
    multiplier = -5;
  }

  player_score = Math.round((player_score + Number.EPSILON) * 1000) / 100;
  rival_score = Math.round((rival_score + Number.EPSILON) * 1000) / 100; //console.log("puntuaci??n: " + player_score + ".Rival score: " + rival_score)
  // console.log("Priority: Player: "+ new_state.player_priority)
  //console.log("Rival: " + new_state.rival_priority)

  return player_score - rival_score + (new_state.player_priority - new_state.rival_priority) * 9;
}

function getAllRules(ruleSet) {
  var importedRules = new Array();
  var rules = [];

  for (let i = 0; i < ruleSet[0].length; i++) {
    if (ruleSet[0][i] == "StaticRookRules") {
      importedRules.push(require('./rules/OpeningRookRules/StaticRookRules.js').StaticRookRules);
    }

    if (ruleSet[0][i] == "RangingRookRules") {
      importedRules.push(require('./rules/OpeningRookRules/RangingRookRules.js').RangingRookRules);
    }

    if (ruleSet[0][i] == "Yagura") {
      importedRules.push(require('./rules/Castles/Yagura.js').Yagura);
    }

    if (ruleSet[0][i] == "Boat") {
      importedRules.push(require('./rules/Castles/Boat.js').Boat);
    }

    if (ruleSet[0][i] == "Mino") {
      importedRules.push(require('./rules/Castles/Mino.js').Mino);
    }

    if (ruleSet[0][i] == "PeerlessGold") {
      importedRules.push(require('./rules/Castles/PeerlessGold.js').PeerlessGold);
    }
  }

  importedRules.push(require('./rules/BasicRules.js').BasicRules);

  for (let i = 0; i < importedRules.length; i++) {
    for (let j = 0; j < importedRules[i].length; j++) {
      rules.push(importedRules[i][j]);
    }
  }

  return rules;
}

function getMaxScore(arr) {
  var max = -1000000000000000000;

  for (let h of arr) {
    if (h > max) {
      max = h;
    }
  }

  return max;
}

function getMinScore(arr) {
  var min = 10000000000000000000;

  for (let h of arr) {
    if (h < min) {
      min = h;
    }
  }

  return min;
}

function getMax(arr) {
  var max = 0;

  for (let h of arr) {
    if (h[0] > max) {
      max = h[0];
    }
  }

  return max;
}

function getMin(arr) {
  var min = 100000000000000000000;

  for (let h of arr) {
    if (h[0] < min) {
      min = h[0];
    }
  }

  return min;
}

function getValueOfPiece(piece, isHand) {
  var value;

  if (isHand) {
    if (piece == "P") {
      value = 1.15;
    }

    if (piece == "L") {
      value = 4.8;
    }

    if (piece == "K") {
      value = 5.1;
    }

    if (piece == "S") {
      value = 7.2;
    }

    if (piece == "G") {
      value = 7.8;
    }

    if (piece == "B") {
      value = 11.1;
    }

    if (piece == "R") {
      value = 12.70;
    }
  } else {
    if (piece == "P") {
      value = 1;
    }

    if (piece == "L") {
      value = 4.3;
    }

    if (piece == "K") {
      value = 4.5;
    }

    if (piece == "S") {
      value = 6.4;
    }

    if (piece == "G") {
      value = 6.9;
    }

    if (piece == "B") {
      value = 8.9;
    }

    if (piece == "R") {
      value = 10.40;
    }

    if (piece == "KING") {
      value = 10000;
    }

    if (piece == "AP") {
      value = 4.2;
    }

    if (piece == "AL") {
      value = 6.3;
    }

    if (piece == "AK") {
      value = 6.4;
    }

    if (piece == "AS") {
      value = 6.7;
    }

    if (piece == "AB") {
      value = 11.5;
    }

    if (piece == "AR") {
      value = 13;
    }
  }

  return value;
}
},{"./GameRBS.js":"src/GameRBS.js","./StrategyRBS.js":"src/StrategyRBS.js","./Game.js":"src/Game.js","./rules/OpeningRookRules/StaticRookRules.js":"src/rules/OpeningRookRules/StaticRookRules.js","./rules/OpeningRookRules/RangingRookRules.js":"src/rules/OpeningRookRules/RangingRookRules.js","./rules/Castles/Yagura.js":"src/rules/Castles/Yagura.js","./rules/Castles/Boat.js":"src/rules/Castles/Boat.js","./rules/Castles/Mino.js":"src/rules/Castles/Mino.js","./rules/Castles/PeerlessGold.js":"src/rules/Castles/PeerlessGold.js","./rules/BasicRules.js":"src/rules/BasicRules.js"}],"src/img/lance_r.png":[function(require,module,exports) {
module.exports = "/lance_r.3e2efd90.png";
},{}],"src/img/pawn_r.png":[function(require,module,exports) {
module.exports = "/pawn_r.fb1d92e7.png";
},{}],"src/img/gnal_de_oro_r.png":[function(require,module,exports) {
module.exports = "/gnal_de_oro_r.eed31605.png";
},{}],"src/img/knight_r.png":[function(require,module,exports) {
module.exports = "/knight_r.50190152.png";
},{}],"src/img/gnral de plata_r.png":[function(require,module,exports) {
module.exports = "/gnral de plata_r.8f34548a.png";
},{}],"src/img/bishop_r.png":[function(require,module,exports) {
module.exports = "/bishop_r.916729e4.png";
},{}],"src/img/rook_r.png":[function(require,module,exports) {
module.exports = "/rook_r.855cfcc3.png";
},{}],"src/img/sente_king_r.png":[function(require,module,exports) {
module.exports = "/sente_king_r.a8eee47d.png";
},{}],"src/img/gote_king_r.png":[function(require,module,exports) {
module.exports = "/gote_king_r.b579bbbc.png";
},{}],"src/img/lance_rr.png":[function(require,module,exports) {
module.exports = "/lance_rr.be1ea53c.png";
},{}],"src/img/knight_rr.png":[function(require,module,exports) {
module.exports = "/knight_rr.5d276f7e.png";
},{}],"src/img/gnral_de_plata_rr.png":[function(require,module,exports) {
module.exports = "/gnral_de_plata_rr.bc1e202f.png";
},{}],"src/img/semental_r.png":[function(require,module,exports) {
module.exports = "/semental_r.9741325e.png";
},{}],"src/img/dragon_r.png":[function(require,module,exports) {
module.exports = "/dragon_r.32838b5b.png";
},{}],"src/img/raised_pawn_r.png":[function(require,module,exports) {
module.exports = "/raised_pawn_r.7cc0b554.png";
},{}],"src/App.js":[function(require,module,exports) {
"use strict";

var _client = require("boardgame.io/client");

var _Game = require("./Game.js");

var _ShogiAI = require("./ShogiAI.js");

var _lance_r = _interopRequireDefault(require("./img/lance_r.png"));

var _pawn_r = _interopRequireDefault(require("./img/pawn_r.png"));

var _gnal_de_oro_r = _interopRequireDefault(require("./img/gnal_de_oro_r.png"));

var _knight_r = _interopRequireDefault(require("./img/knight_r.png"));

var _gnralDePlata_r = _interopRequireDefault(require("./img/gnral de plata_r.png"));

var _bishop_r = _interopRequireDefault(require("./img/bishop_r.png"));

var _rook_r = _interopRequireDefault(require("./img/rook_r.png"));

var _sente_king_r = _interopRequireDefault(require("./img/sente_king_r.png"));

var _gote_king_r = _interopRequireDefault(require("./img/gote_king_r.png"));

var _lance_rr = _interopRequireDefault(require("./img/lance_rr.png"));

var _knight_rr = _interopRequireDefault(require("./img/knight_rr.png"));

var _gnral_de_plata_rr = _interopRequireDefault(require("./img/gnral_de_plata_rr.png"));

var _semental_r = _interopRequireDefault(require("./img/semental_r.png"));

var _dragon_r = _interopRequireDefault(require("./img/dragon_r.png"));

var _raised_pawn_r = _interopRequireDefault(require("./img/raised_pawn_r.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/////////IMAGENES PIEZAS//////////
class ShogiClient {
  constructor(rootElement) {
    this.client = (0, _client.Client)({
      game: _Game.Shogi //debug: false,

    });
    this.client.start();
    this.rootElement = rootElement;
    this.createBoard();
    this.attachListeners();
    this.client.subscribe(state => this.update(state));
  }

  createBoard() {
    const rows = [];

    for (let i = 0; i < 9; i++) {
      const cells = [];

      for (let j = 0; j < 9; j++) {
        /*////////Los "if" son por si se quiere personalizar cada td por pieza. De momento no afecta///////////*/
        if (i == 2) {
          cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\" data-piece=\"\" ></td>"));
        } else if (i == 6) {
          cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\"  > </td>"));
        } else if (i == 0) {
          if (j == 0 || j == 8) {
            cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\"  > </td>"));
          }

          if (j == 1 || j == 7) {
            cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\"  > </td>"));
          }

          if (j == 2 || j == 6) {
            cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\"  > </td>"));
          }

          if (j == 3 || j == 5) {
            cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\"  > </td>"));
          }

          if (j == 4) {
            cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\"  > </td>"));
          }
        } else if (i == 8) {
          if (j == 0 || j == 8) {
            cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\"  > </td>"));
          }

          if (j == 1 || j == 7) {
            cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\"  > </td>"));
          }

          if (j == 2 || j == 6) {
            cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\"  > </td>"));
          }

          if (j == 3 || j == 5) {
            cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\"  > </td>"));
          }

          if (j == 4) {
            cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\"  > </td>"));
          }
        } else if (i == 1) {
          if (j == 1) {
            cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\"  > </td>"));
          } else if (j == 7) {
            cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\"  > </td>"));
          } else {
            cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\"  > </td>"));
          }
        } else if (i == 7) {
          if (j == 1) {
            cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\"  > </td>"));
          } else if (j == 7) {
            cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\"  > </td>"));
          } else {
            cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\"  > </td>"));
          }
        } else {
          cells.push("<td class=\"cell\" data-column=\"".concat(j, "\" data-row=\"").concat(i, "\"  > </td>"));
        } ///////////////////////        

      }

      rows.push("<tr>".concat(cells.join(''), "</tr>"));
    }

    this.rootElement.innerHTML = "\n      <table id=\"tablero\">".concat(rows.join(''), "</table>\n      <p class=\"winner\"></p>\n    ");
  }

  attachListeners() {
    const sente_table = document.getElementById('sente_table');
    const gote_table = document.getElementById('gote_table');
    const cells = this.rootElement.querySelectorAll('.cell');
    var captured_cells_sente = sente_table.querySelectorAll('.captured_piece');
    var captured_cells_gote = gote_table.querySelectorAll('.captured_piece');
    var possible_cells = [];
    var row_id = null;
    var column_id = null;
    var row_target = null;
    var column_target = null;
    var piece = null;
    var piece_revive = null; /////////////AI//////////////

    const aiButtonMove = document.getElementById("AI_button_move");
    aiButtonMove.parameter = this.client;
    aiButtonMove.addEventListener('click', _ShogiAI.requestMoveAI, false); ////////////////////////

    const choosePieceToMove = event => {
      let cell = event.target.parentNode;
      row_id = parseInt(cell.dataset.row);
      column_id = parseInt(cell.dataset.column);
      piece = cell.dataset.piece;
      possible_cells = [];
      var state = this.client.getState();

      if (piece.substr(0, 1) == state.ctx.currentPlayer) {
        ///ver que pieza es y mostrar posibles
        possible_cells = (0, _Game.getPossibleCells)(state.G.cells, row_id, column_id, piece.substr(1, 4), piece.substr(0, 1));
        highlightPossibleMoves(possible_cells, cells, state.ctx.currentPlayer);
        cells.forEach(cell => {
          cell.onclick = clickFinalMove;
        });
      }
    };

    const clickFinalMove = event => {
      if (event.target.parentNode.className == "cell_capture_highlight") {
        row_target = parseInt(event.target.parentNode.dataset.row);
        column_target = parseInt(event.target.parentNode.dataset.column);
        this.client.moves.movePiece(row_id, column_id, row_target, column_target, piece.substr(1, 4), event.target.parentNode);
        capturePiece();
      } else {
        row_target = parseInt(event.target.dataset.row);
        column_target = parseInt(event.target.dataset.column);
        this.client.moves.movePiece(row_id, column_id, row_target, column_target, piece.substr(1, 4), event.target);
      }

      cells.forEach(cell => {
        cell.className = "cell";
      });
      cells.forEach(cell => {
        cell.onclick = choosePieceToMove;
      });
      captured_cells_sente = sente_table.querySelectorAll('.captured_piece');
      captured_cells_gote = gote_table.querySelectorAll('.captured_piece');
      captured_cells_sente.forEach(cell => {
        cell.onclick = chooseWhereToRevive;
      });
      captured_cells_gote.forEach(cell => {
        cell.onclick = chooseWhereToRevive;
      });
    };

    const chooseWhereToRevive = event => {
      piece_revive = event.target.parentNode;
      var state = this.client.getState();

      if (piece_revive.id == state.ctx.currentPlayer) {
        var possible_revival = (0, _Game.getPossibleRevive)(state.G.cells, piece_revive.dataset.type, piece_revive.id);
        highlightPossibleMoves(possible_revival, cells, state.ctx.currentPlayer);
        cells.forEach(cell => {
          cell.onclick = clickFinalRevive;
        });
        captured_cells_sente = sente_table.querySelectorAll('.captured_piece');
        captured_cells_gote = gote_table.querySelectorAll('.captured_piece');
        captured_cells_sente.forEach(cell => {
          cell.onclick = clickFinalRevive;
        });
        captured_cells_gote.forEach(cell => {
          cell.onclick = clickFinalRevive;
        });
      }
    };

    const clickFinalRevive = event => {
      row_target = parseInt(event.target.dataset.row);
      column_target = parseInt(event.target.dataset.column);
      this.client.moves.revivePiece(row_target, column_target, piece_revive.id.concat(piece_revive.dataset.type), event.target);
      cells.forEach(cell => {
        cell.className = "cell";
      });
      cells.forEach(cell => {
        cell.onclick = choosePieceToMove;
      });
      captured_cells_sente = sente_table.querySelectorAll('.captured_piece');
      captured_cells_gote = gote_table.querySelectorAll('.captured_piece');
      captured_cells_sente.forEach(cell => {
        cell.onclick = chooseWhereToRevive;
      });
      captured_cells_gote.forEach(cell => {
        cell.onclick = chooseWhereToRevive;
      });
    };

    cells.forEach(cell => {
      cell.onclick = choosePieceToMove;
    });
  }

  update(state) {
    updateBoard(state, this.rootElement);
    updateCaptured(state);
    capturePiece();
  }

}

function highlightPossibleMoves(possible_cells, cells, player) {
  var column;
  var row;
  var owner_piece;

  for (let cell of cells) {
    for (let possible_cell of possible_cells) {
      column = cell.dataset.column;
      row = cell.dataset.row;
      owner_piece = cell.dataset.piece;

      if (row == possible_cell.substr(0, 1) && column == possible_cell.substr(1, 2)) {
        if (owner_piece != "" && owner_piece.substr(0, 1) != player) {
          cell.className = "cell_capture_highlight";
        } else {
          cell.className = "cell_highlight";
        }
      }
    }
  }
}

function capturePiece() {
  const gameplay = document.getElementById('gameplay');
  const captured = gameplay.querySelectorAll('.captured_piece');
  captured.forEach(piece => {
    var piece_type = piece.dataset.type;
    var owner_captured_piece = piece.id.substr(9, 14);

    if (piece_type == "P") {
      if (owner_captured_piece == "sente") {
        piece.innerHTML = "<img src=\"".concat(_pawn_r.default, "\" class=\"piece\" id=\"sente_piece\"/>");
      } else {
        piece.innerHTML = "<img src=\"".concat(_pawn_r.default, "\"class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_type == "L") {
      if (owner_captured_piece == "sente") {
        piece.innerHTML = "<img src=\"".concat(_lance_r.default, "\"class=\"piece\" id=\"sente_piece\"/>");
      } else {
        piece.innerHTML = "<img src=\"".concat(_lance_r.default, "\" class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_type == "G") {
      if (owner_captured_piece == "sente") {
        piece.innerHTML = "<img src=\"".concat(_gnal_de_oro_r.default, "\" class=\"piece\"id=\"sente_piece\"/>");
      } else {
        piece.innerHTML = "<img src=\"".concat(_gnal_de_oro_r.default, "\" class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_type == "S") {
      if (owner_captured_piece == "sente") {
        piece.innerHTML = "<img src=\"".concat(_gnralDePlata_r.default, "\" class=\"piece\"id=\"sente_piece\"/>");
      } else {
        piece.innerHTML = "<img src=\"".concat(_gnralDePlata_r.default, "\"class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_type == "K") {
      if (owner_captured_piece == "sente") {
        piece.innerHTML = "<img src=\"".concat(_knight_r.default, "\"class=\"piece\" id=\"sente_piece\"/>");
      } else {
        piece.innerHTML = "<img src=\"".concat(_knight_r.default, "\" class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_type == "B") {
      if (owner_captured_piece == "sente") {
        piece.innerHTML = "<img src=\"".concat(_bishop_r.default, "\"class=\"piece\" id=\"sente_piece\"/>");
      } else {
        piece.innerHTML = "<img src=\"".concat(_bishop_r.default, "\" class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_type == "KING") {
      if (owner_captured_piece == "sente") {
        piece.innerHTML = "<img src=\"".concat(_sente_king_r.default, "\"class=\"piece\" id=\"sente_piece\"/>");
      } else {
        piece.innerHTML = "<img src=\"".concat(_gote_king_r.default, "\" class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_type == "R") {
      if (owner_captured_piece == "sente") {
        piece.innerHTML = "<img src=\"".concat(_rook_r.default, "\"class=\"piece\" id=\"sente_piece\"/>");
      } else {
        piece.innerHTML = "<img src=\"".concat(_rook_r.default, "\" class=\"piece\" id=\"gote_piece\"/>");
      }
    } else {
      if (piece_type == "sente") {
        piece.innerHTML = "<img src=\"".concat(_pawn_r.default, "\" class=\"piece\" id=\"sente_piece\"/>");
      } else {
        piece.innerHTML = "<img src=\"".concat(_pawn_r.default, "\"class=\"piece\" id=\"gote_piece\"/>");
      }
    }
  });
}

function updateBoard(state, rootElement) {
  const cells = rootElement.querySelectorAll('.cell');
  var piece_name;
  var owner_piece;
  cells.forEach(cell => {
    const cell_row = parseInt(cell.dataset.row);
    const cell_column = parseInt(cell.dataset.column);
    const cellRow = state.G.cells[cell_row];
    const cellValue = cellRow[cell_column];
    cell.textContent = cellValue !== null ? cellValue : '';
    cell.dataset.piece = cellValue !== null ? cellValue : '';
    piece_name = cell.dataset.piece.substr(1, 4);
    owner_piece = cell.dataset.piece.substr(0, 1); //falta hacer los dibujos del resto de fichas, de momento todo peones

    if (piece_name == "P") {
      if (owner_piece == "0") {
        cell.innerHTML = "<img src=\"".concat(_pawn_r.default, "\" class=\"piece\" id=\"sente_piece\"/>");
      } else {
        cell.innerHTML = "<img src=\"".concat(_pawn_r.default, "\"class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_name == "L") {
      if (owner_piece == "0") {
        cell.innerHTML = "<img src=\"".concat(_lance_r.default, "\"class=\"piece\" id=\"sente_piece\"/>");
      } else {
        cell.innerHTML = "<img src=\"".concat(_lance_r.default, "\" class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_name == "G") {
      if (owner_piece == "0") {
        cell.innerHTML = "<img src=\"".concat(_gnal_de_oro_r.default, "\" class=\"piece\"id=\"sente_piece\"/>");
      } else {
        cell.innerHTML = "<img src=\"".concat(_gnal_de_oro_r.default, "\" class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_name == "S") {
      if (owner_piece == "0") {
        cell.innerHTML = "<img src=\"".concat(_gnralDePlata_r.default, "\" class=\"piece\"id=\"sente_piece\"/>");
      } else {
        cell.innerHTML = "<img src=\"".concat(_gnralDePlata_r.default, "\"class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_name == "K") {
      if (owner_piece == "0") {
        cell.innerHTML = "<img src=\"".concat(_knight_r.default, "\"class=\"piece\" id=\"sente_piece\"/>");
      } else {
        cell.innerHTML = "<img src=\"".concat(_knight_r.default, "\" class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_name == "B") {
      if (owner_piece == "0") {
        cell.innerHTML = "<img src=\"".concat(_bishop_r.default, "\"class=\"piece\" id=\"sente_piece\"/>");
      } else {
        cell.innerHTML = "<img src=\"".concat(_bishop_r.default, "\" class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_name == "KING") {
      if (owner_piece == "0") {
        cell.innerHTML = "<img src=\"".concat(_sente_king_r.default, "\"class=\"piece\" id=\"sente_piece\"/>");
      } else {
        cell.innerHTML = "<img src=\"".concat(_gote_king_r.default, "\" class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_name == "R") {
      if (owner_piece == "0") {
        cell.innerHTML = "<img src=\"".concat(_rook_r.default, "\"class=\"piece\" id=\"sente_piece\"/>");
      } else {
        cell.innerHTML = "<img src=\"".concat(_rook_r.default, "\" class=\"piece\" id=\"gote_piece\"/>");
      }
    } //arised


    if (piece_name == "AP") {
      if (owner_piece == "0") {
        cell.innerHTML = "<img src=\"".concat(_raised_pawn_r.default, "\" class=\"piece\" id=\"sente_piece\"/>");
      } else {
        cell.innerHTML = "<img src=\"".concat(_raised_pawn_r.default, "\"class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_name == "AL") {
      if (owner_piece == "0") {
        cell.innerHTML = "<img src=\"".concat(_lance_rr.default, "\"class=\"piece\" id=\"sente_piece\"/>");
      } else {
        cell.innerHTML = "<img src=\"".concat(_lance_rr.default, "\" class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_name == "AS") {
      if (owner_piece == "0") {
        cell.innerHTML = "<img src=\"".concat(_gnral_de_plata_rr.default, "\" class=\"piece\"id=\"sente_piece\"/>");
      } else {
        cell.innerHTML = "<img src=\"".concat(_gnral_de_plata_rr.default, "\"class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_name == "AK") {
      if (owner_piece == "0") {
        cell.innerHTML = "<img src=\"".concat(_knight_rr.default, "\"class=\"piece\" id=\"sente_piece\"/>");
      } else {
        cell.innerHTML = "<img src=\"".concat(_knight_rr.default, "\" class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_name == "AB") {
      if (owner_piece == "0") {
        cell.innerHTML = "<img src=\"".concat(_semental_r.default, "\"class=\"piece\" id=\"sente_piece\"/>");
      } else {
        cell.innerHTML = "<img src=\"".concat(_semental_r.default, "\" class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_name == "AR") {
      if (owner_piece == "0") {
        cell.innerHTML = "<img src=\"".concat(_dragon_r.default, "\"class=\"piece\" id=\"sente_piece\"/>");
      } else {
        cell.innerHTML = "<img src=\"".concat(_dragon_r.default, "\" class=\"piece\" id=\"gote_piece\"/>");
      }
    } else if (piece_name == "") {
      cell.innerHTML = '';
    }
  });
}

function updateCaptured(state) {
  var captured_pieces = state.G.sente_captured_pieces;
  var captured_divs = [];
  captured_pieces.forEach(piece => {
    captured_divs.push("<div class=\"captured_piece\" id=\"0\" data-type=\"".concat(piece, "\"></div>"));
  });
  sente_table.innerHTML = captured_divs.join('');
  var captured_pieces = state.G.gote_captured_pieces;
  var captured_divs = [];
  captured_pieces.forEach(piece => {
    captured_divs.push("<div class=\"captured_piece\" id=\"1\" data-type=\"".concat(piece, "\"></div>"));
  });
  gote_table.innerHTML = captured_divs.join('');
}

const appElement = document.getElementById('panel_central');
const app = new ShogiClient(appElement);
},{"boardgame.io/client":"node_modules/boardgame.io/dist/esm/client.js","./Game.js":"src/Game.js","./ShogiAI.js":"src/ShogiAI.js","./img/lance_r.png":"src/img/lance_r.png","./img/pawn_r.png":"src/img/pawn_r.png","./img/gnal_de_oro_r.png":"src/img/gnal_de_oro_r.png","./img/knight_r.png":"src/img/knight_r.png","./img/gnral de plata_r.png":"src/img/gnral de plata_r.png","./img/bishop_r.png":"src/img/bishop_r.png","./img/rook_r.png":"src/img/rook_r.png","./img/sente_king_r.png":"src/img/sente_king_r.png","./img/gote_king_r.png":"src/img/gote_king_r.png","./img/lance_rr.png":"src/img/lance_rr.png","./img/knight_rr.png":"src/img/knight_rr.png","./img/gnral_de_plata_rr.png":"src/img/gnral_de_plata_rr.png","./img/semental_r.png":"src/img/semental_r.png","./img/dragon_r.png":"src/img/dragon_r.png","./img/raised_pawn_r.png":"src/img/raised_pawn_r.png"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49528" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ??? Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] ????  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">????</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/App.js"], null)
//# sourceMappingURL=/App.f684dadd.js.map