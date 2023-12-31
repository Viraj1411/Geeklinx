var _ = (function() {
	var v = this;
	var j = v._;
	var D = {};
	var C = Array.prototype,
		f = Object.prototype,
		q = Function.prototype;
	var m = C.slice,
		z = C.unshift,
		c = f.toString,
		h = f.hasOwnProperty;
	var L = C.forEach,
		o = C.map,
		E = C.reduce,
		b = C.reduceRight,
		a = C.filter,
		A = C.every,
		n = C.some,
		l = C.indexOf,
		k = C.lastIndexOf,
		s = Array.isArray,
		e = Object.keys,
		F = q.bind;
	var M = function(p) {
		return new t(p)
	};
	if (typeof exports !== "undefined") {
		if (typeof module !== "undefined" && module.exports) {
			exports = module.exports = M
		}
		exports._ = M
	} else {
		v._ = M
	}
	M.VERSION = "1.3.3";
	var I = M.each = M.forEach = function(R, Q, P) {
		if (R == null) {
			return
		}
		if (L && R.forEach === L) {
			R.forEach(Q, P)
		} else {
			if (R.length === +R.length) {
				for (var O = 0, p = R.length; O < p; O++) {
					if (O in R && Q.call(P, R[O], O, R) === D) {
						return
					}
				}
			} else {
				for (var N in R) {
					if (M.has(R, N)) {
						if (Q.call(P, R[N], N, R) === D) {
							return
						}
					}
				}
			}
		}
	};
	M.map = M.collect = function(P, O, N) {
		var p = [];
		if (P == null) {
			return p
		}
		if (o && P.map === o) {
			return P.map(O, N)
		}
		I(P, function(S, Q, R) {
			p[p.length] = O.call(N, S, Q, R)
		});
		if (P.length === +P.length) {
			p.length = P.length
		}
		return p
	};
	M.reduce = M.foldl = M.inject = function(Q, P, p, O) {
		var N = arguments.length > 2;
		if (Q == null) {
			Q = []
		}
		if (E && Q.reduce === E) {
			if (O) {
				P = M.bind(P, O)
			}
			return N ? Q.reduce(P, p) : Q.reduce(P)
		}
		I(Q, function(T, R, S) {
			if (!N) {
				p = T;
				N = true
			} else {
				p = P.call(O, p, T, R, S)
			}
		});
		if (!N) {
			throw new TypeError("Reduce of empty array with no initial value")
		}
		return p
	};
	M.reduceRight = M.foldr = function(Q, P, p, O) {
		var N = arguments.length > 2;
		if (Q == null) {
			Q = []
		}
		if (b && Q.reduceRight === b) {
			if (O) {
				P = M.bind(P, O)
			}
			return N ? Q.reduceRight(P, p) : Q.reduceRight(P)
		}
		var R = M.toArray(Q).reverse();
		if (O && !N) {
			P = M.bind(P, O)
		}
		return N ? M.reduce(R, P, p, O) : M.reduce(R, P)
	};
	M.find = M.detect = function(P, O, N) {
		var p;
		y(P, function(S, Q, R) {
			if (O.call(N, S, Q, R)) {
				p = S;
				return true
			}
		});
		return p
	};
	M.filter = M.select = function(P, O, N) {
		var p = [];
		if (P == null) {
			return p
		}
		if (a && P.filter === a) {
			return P.filter(O, N)
		}
		I(P, function(S, Q, R) {
			if (O.call(N, S, Q, R)) {
				p[p.length] = S
			}
		});
		return p
	};
	M.reject = function(P, O, N) {
		var p = [];
		if (P == null) {
			return p
		}
		I(P, function(S, Q, R) {
			if (!O.call(N, S, Q, R)) {
				p[p.length] = S
			}
		});
		return p
	};
	M.every = M.all = function(P, O, N) {
		var p = true;
		if (P == null) {
			return p
		}
		if (A && P.every === A) {
			return P.every(O, N)
		}
		I(P, function(S, Q, R) {
			if (!(p = p && O.call(N, S, Q, R))) {
				return D
			}
		});
		return !!p
	};
	var y = M.some = M.any = function(P, O, N) {
		O || (O = M.identity);
		var p = false;
		if (P == null) {
			return p
		}
		if (n && P.some === n) {
			return P.some(O, N)
		}
		I(P, function(S, Q, R) {
			if (p || (p = O.call(N, S, Q, R))) {
				return D
			}
		});
		return !!p
	};
	M.include = M.contains = function(O, N) {
		var p = false;
		if (O == null) {
			return p
		}
		if (l && O.indexOf === l) {
			return O.indexOf(N) != -1
		}
		p = y(O, function(P) {
			return P === N
		});
		return p
	};
	M.invoke = function(N, O) {
		var p = m.call(arguments, 2);
		return M.map(N, function(P) {
			return (M.isFunction(O) ? O || P : P[O]).apply(P, p)
		})
	};
	M.pluck = function(N, p) {
		return M.map(N, function(O) {
			return O[p]
		})
	};
	M.max = function(P, O, N) {
		if (!O && M.isArray(P) && P[0] === +P[0]) {
			return Math.max.apply(Math, P)
		}
		if (!O && M.isEmpty(P)) {
			return -Infinity
		}
		var p = {
			computed: -Infinity
		};
		I(P, function(T, Q, S) {
			var R = O ? O.call(N, T, Q, S) : T;
			R >= p.computed && (p = {
				value: T,
				computed: R
			})
		});
		return p.value
	};
	M.min = function(P, O, N) {
		if (!O && M.isArray(P) && P[0] === +P[0]) {
			return Math.min.apply(Math, P)
		}
		if (!O && M.isEmpty(P)) {
			return Infinity
		}
		var p = {
			computed: Infinity
		};
		I(P, function(T, Q, S) {
			var R = O ? O.call(N, T, Q, S) : T;
			R < p.computed && (p = {
				value: T,
				computed: R
			})
		});
		return p.value
	};
	M.shuffle = function(O) {
		var p = [],
			N;
		I(O, function(R, P, Q) {
			N = Math.floor(Math.random() * (P + 1));
			p[P] = p[N];
			p[N] = R
		});
		return p
	};
	M.sortBy = function(O, P, p) {
		var N = M.isFunction(P) ? P : function(Q) {
			return Q[P]
		};
		return M.pluck(M.map(O, function(S, Q, R) {
			return {
				value: S,
				criteria: N.call(p, S, Q, R)
			}
		}).sort(function(T, S) {
			var R = T.criteria,
				Q = S.criteria;
			if (R === void 0) {
				return 1
			}
			if (Q === void 0) {
				return -1
			}
			return R < Q ? -1 : R > Q ? 1 : 0
		}), "value")
	};
	M.groupBy = function(O, P) {
		var p = {};
		var N = M.isFunction(P) ? P : function(Q) {
			return Q[P]
		};
		I(O, function(S, Q) {
			var R = N(S, Q);
			(p[R] || (p[R] = [])).push(S)
		});
		return p
	};
	M.sortedIndex = function(R, Q, O) {
		O || (O = M.identity);
		var p = 0,
			P = R.length;
		while (p < P) {
			var N = (p + P) >> 1;
			O(R[N]) < O(Q) ? p = N + 1 : P = N
		}
		return p
	};
	M.toArray = function(p) {
		if (!p) {
			return []
		}
		if (M.isArray(p)) {
			return m.call(p)
		}
		if (M.isArguments(p)) {
			return m.call(p)
		}
		if (p.toArray && M.isFunction(p.toArray)) {
			return p.toArray()
		}
		return M.values(p)
	};
	M.size = function(p) {
		return M.isArray(p) ? p.length : M.keys(p).length
	};
	M.first = M.head = M.take = function(O, N, p) {
		return (N != null) && !p ? m.call(O, 0, N) : O[0]
	};
	M.initial = function(O, N, p) {
		return m.call(O, 0, O.length - ((N == null) || p ? 1 : N))
	};
	M.last = function(O, N, p) {
		if ((N != null) && !p) {
			return m.call(O, Math.max(O.length - N, 0))
		} else {
			return O[O.length - 1]
		}
	};
	M.rest = M.tail = function(O, p, N) {
		return m.call(O, (p == null) || N ? 1 : p)
	};
	M.compact = function(p) {
		return M.filter(p, function(N) {
			return !!N
		})
	};
	M.flatten = function(N, p) {
		return M.reduce(N, function(O, P) {
			if (M.isArray(P)) {
				return O.concat(p ? P : M.flatten(P))
			}
			O[O.length] = P;
			return O
		}, [])
	};
	M.without = function(p) {
		return M.difference(p, m.call(arguments, 1))
	};
	M.uniq = M.unique = function(Q, P, O) {
		var p = O ? M.map(Q, O) : Q;
		var N = [];
		if (Q.length < 3) {
			P = true
		}
		M.reduce(p, function(R, T, S) {
			if (P ? M.last(R) !== T || !R.length : !M.include(R, T)) {
				R.push(T);
				N.push(Q[S])
			}
			return R
		}, []);
		return N
	};
	M.union = function() {
		return M.uniq(M.flatten(arguments, true))
	};
	M.intersection = M.intersect = function(N) {
		var p = m.call(arguments, 1);
		return M.filter(M.uniq(N), function(O) {
			return M.every(p, function(P) {
				return M.indexOf(P, O) >= 0
			})
		})
	};
	M.difference = function(N) {
		var p = M.flatten(m.call(arguments, 1), true);
		return M.filter(N, function(O) {
			return !M.include(p, O)
		})
	};
	M.zip = function() {
		var p = m.call(arguments);
		var P = M.max(M.pluck(p, "length"));
		var O = new Array(P);
		for (var N = 0; N < P; N++) {
			O[N] = M.pluck(p, "" + N)
		}
		return O
	};
	M.indexOf = function(Q, O, P) {
		if (Q == null) {
			return -1
		}
		var N, p;
		if (P) {
			N = M.sortedIndex(Q, O);
			return Q[N] === O ? N : -1
		}
		if (l && Q.indexOf === l) {
			return Q.indexOf(O)
		}
		for (N = 0, p = Q.length; N < p; N++) {
			if (N in Q && Q[N] === O) {
				return N
			}
		}
		return -1
	};
	M.lastIndexOf = function(O, N) {
		if (O == null) {
			return -1
		}
		if (k && O.lastIndexOf === k) {
			return O.lastIndexOf(N)
		}
		var p = O.length;
		while (p--) {
			if (p in O && O[p] === N) {
				return p
			}
		}
		return -1
	};
	M.range = function(R, P, Q) {
		if (arguments.length <= 1) {
			P = R || 0;
			R = 0
		}
		Q = arguments[2] || 1;
		var N = Math.max(Math.ceil((P - R) / Q), 0);
		var p = 0;
		var O = new Array(N);
		while (p < N) {
			O[p++] = R;
			R += Q
		}
		return O
	};
	var G = function() {};
	M.bind = function d(P, N) {
		var O, p;
		if (P.bind === F && F) {
			return F.apply(P, m.call(arguments, 1))
		}
		if (!M.isFunction(P)) {
			throw new TypeError
		}
		p = m.call(arguments, 2);
		return O = function() {
			if (!(this instanceof O)) {
				return P.apply(N, p.concat(m.call(arguments)))
			}
			G.prototype = P.prototype;
			var R = new G;
			var Q = P.apply(R, p.concat(m.call(arguments)));
			if (Object(Q) === Q) {
				return Q
			}
			return R
		}
	};
	M.bindAll = function(N) {
		var p = m.call(arguments, 1);
		if (p.length == 0) {
			p = M.functions(N)
		}
		I(p, function(O) {
			N[O] = M.bind(N[O], N)
		});
		return N
	};
	M.memoize = function(O, N) {
		var p = {};
		N || (N = M.identity);
		return function() {
			var P = N.apply(this, arguments);
			return M.has(p, P) ? p[P] : (p[P] = O.apply(this, arguments))
		}
	};
	M.delay = function(N, O) {
		var p = m.call(arguments, 2);
		return setTimeout(function() {
			return N.apply(null, p)
		}, O)
	};
	M.defer = function(p) {
		return M.delay.apply(M, [p, 1].concat(m.call(arguments, 1)))
	};
	M.throttle = function(O, P) {
		var N, R, S, T, Q, U;
		var p = M.debounce(function() {
			Q = T = false
		}, P);
		return function() {
			N = this;
			R = arguments;
			var V = function() {
				S = null;
				if (Q) {
					O.apply(N, R)
				}
				p()
			};
			if (!S) {
				S = setTimeout(V, P)
			}
			if (T) {
				Q = true
			} else {
				U = O.apply(N, R)
			}
			p();
			T = true;
			return U
		}
	};
	M.debounce = function(N, P, p) {
		var O;
		return function() {
			var S = this,
				R = arguments;
			var Q = function() {
				O = null;
				if (!p) {
					N.apply(S, R)
				}
			};
			if (p && !O) {
				N.apply(S, R)
			}
			clearTimeout(O);
			O = setTimeout(Q, P)
		}
	};
	M.once = function(O) {
		var p = false,
			N;
		return function() {
			if (p) {
				return N
			}
			p = true;
			return N = O.apply(this, arguments)
		}
	};
	M.wrap = function(p, N) {
		return function() {
			var O = [p].concat(m.call(arguments, 0));
			return N.apply(this, O)
		}
	};
	M.compose = function() {
		var p = arguments;
		return function() {
			var N = arguments;
			for (var O = p.length - 1; O >= 0; O--) {
				N = [p[O].apply(this, N)]
			}
			return N[0]
		}
	};
	M.after = function(N, p) {
		if (N <= 0) {
			return p()
		}
		return function() {
			if (--N < 1) {
				return p.apply(this, arguments)
			}
		}
	};
	M.keys = e || function(O) {
		if (O !== Object(O)) {
			throw new TypeError("Invalid object")
		}
		var N = [];
		for (var p in O) {
			if (M.has(O, p)) {
				N[N.length] = p
			}
		}
		return N
	};
	M.values = function(p) {
		return M.map(p, M.identity)
	};
	M.functions = M.methods = function(O) {
		var N = [];
		for (var p in O) {
			if (M.isFunction(O[p])) {
				N.push(p)
			}
		}
		return N.sort()
	};
	M.extend = function(p) {
		I(m.call(arguments, 1), function(N) {
			for (var O in N) {
				p[O] = N[O]
			}
		});
		return p
	};
	M.pick = function(N) {
		var p = {};
		I(M.flatten(m.call(arguments, 1)), function(O) {
			if (O in N) {
				p[O] = N[O]
			}
		});
		return p
	};
	M.defaults = function(p) {
		I(m.call(arguments, 1), function(N) {
			for (var O in N) {
				if (p[O] == null) {
					p[O] = N[O]
				}
			}
		});
		return p
	};
	M.clone = function(p) {
		if (!M.isObject(p)) {
			return p
		}
		return M.isArray(p) ? p.slice() : M.extend({}, p)
	};
	M.tap = function(N, p) {
		p(N);
		return N
	};

	function J(P, O, N) {
		if (P === O) {
			return P !== 0 || 1 / P == 1 / O
		}
		if (P == null || O == null) {
			return P === O
		}
		if (P._chain) {
			P = P._wrapped
		}
		if (O._chain) {
			O = O._wrapped
		}
		if (P.isEqual && M.isFunction(P.isEqual)) {
			return P.isEqual(O)
		}
		if (O.isEqual && M.isFunction(O.isEqual)) {
			return O.isEqual(P)
		}
		var S = c.call(P);
		if (S != c.call(O)) {
			return false
		}
		switch (S) {
			case "[object String]":
				return P == String(O);
			case "[object Number]":
				return P != +P ? O != +O : (P == 0 ? 1 / P == 1 / O : P == +O);
			case "[object Date]":
			case "[object Boolean]":
				return +P == +O;
			case "[object RegExp]":
				return P.source == O.source && P.global == O.global && P.multiline == O.multiline && P.ignoreCase == O.ignoreCase
		}
		if (typeof P != "object" || typeof O != "object") {
			return false
		}
		var T = N.length;
		while (T--) {
			if (N[T] == P) {
				return true
			}
		}
		N.push(P);
		var R = 0,
			p = true;
		if (S == "[object Array]") {
			R = P.length;
			p = R == O.length;
			if (p) {
				while (R--) {
					if (!(p = R in P == R in O && J(P[R], O[R], N))) {
						break
					}
				}
			}
		} else {
			if ("constructor" in P != "constructor" in O || P.constructor != O.constructor) {
				return false
			}
			for (var Q in P) {
				if (M.has(P, Q)) {
					R++;
					if (!(p = M.has(O, Q) && J(P[Q], O[Q], N))) {
						break
					}
				}
			}
			if (p) {
				for (Q in O) {
					if (M.has(O, Q) && !(R--)) {
						break
					}
				}
				p = !R
			}
		}
		N.pop();
		return p
	}
	M.isEqual = function(N, p) {
		return J(N, p, [])
	};
	M.isEmpty = function(N) {
		if (N == null) {
			return true
		}
		if (M.isArray(N) || M.isString(N)) {
			return N.length === 0
		}
		for (var p in N) {
			if (M.has(N, p)) {
				return false
			}
		}
		return true
	};
	M.isElement = function(p) {
		return !!(p && p.nodeType == 1)
	};
	M.isArray = s || function(p) {
		return c.call(p) == "[object Array]"
	};
	M.isObject = function(p) {
		return p === Object(p)
	};
	M.isArguments = function(p) {
		return c.call(p) == "[object Arguments]"
	};
	if (!M.isArguments(arguments)) {
		M.isArguments = function(p) {
			return !!(p && M.has(p, "callee"))
		}
	}
	M.isFunction = function(p) {
		return c.call(p) == "[object Function]"
	};
	M.isString = function(p) {
		return c.call(p) == "[object String]"
	};
	M.isNumber = function(p) {
		return c.call(p) == "[object Number]"
	};
	M.isFinite = function(p) {
		return M.isNumber(p) && isFinite(p)
	};
	M.isNaN = function(p) {
		return p !== p
	};
	M.isBoolean = function(p) {
		return p === true || p === false || c.call(p) == "[object Boolean]"
	};
	M.isDate = function(p) {
		return c.call(p) == "[object Date]"
	};
	M.isRegExp = function(p) {
		return c.call(p) == "[object RegExp]"
	};
	M.isNull = function(p) {
		return p === null
	};
	M.isUndefined = function(p) {
		return p === void 0
	};
	M.has = function(N, p) {
		return h.call(N, p)
	};
	M.noConflict = function() {
		v._ = j;
		return this
	};
	M.identity = function(p) {
		return p
	};
	M.times = function(P, O, N) {
		for (var p = 0; p < P; p++) {
			O.call(N, p)
		}
	};
	M.escape = function(p) {
		return ("" + p).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
	};
	M.result = function(p, O) {
		if (p == null) {
			return null
		}
		var N = p[O];
		return M.isFunction(N) ? N.call(p) : N
	};
	M.mixin = function(p) {
		I(M.functions(p), function(N) {
			w(N, M[N] = p[N])
		})
	};
	var x = 0;
	M.uniqueId = function(p) {
		var N = x++;
		return p ? p + N : N
	};
	M.templateSettings = {
		evaluate: /<%([\s\S]+?)%>/g,
		interpolate: /<%=([\s\S]+?)%>/g,
		escape: /<%-([\s\S]+?)%>/g
	};
	var u = /.^/;
	var g = {
		"\\": "\\",
		"'": "'",
		r: "\r",
		n: "\n",
		t: "\t",
		u2028: "\u2028",
		u2029: "\u2029"
	};
	for (var H in g) {
		g[g[H]] = H
	}
	var i = /\\|'|\r|\n|\t|\u2028|\u2029/g;
	var B = /\\(\\|'|r|n|t|u2028|u2029)/g;
	var K = function(p) {
		return p.replace(B, function(N, O) {
			return g[O]
		})
	};
	M.template = function(R, Q, O) {
		O = M.defaults(O || {}, M.templateSettings);
		var P = "__p+='" + R.replace(i, function(S) {
			return "\\" + g[S]
		}).replace(O.escape || u, function(S, T) {
			return "'+\n_.escape(" + K(T) + ")+\n'"
		}).replace(O.interpolate || u, function(S, T) {
			return "'+\n(" + K(T) + ")+\n'"
		}).replace(O.evaluate || u, function(S, T) {
			return "';\n" + K(T) + "\n;__p+='"
		}) + "';\n";
		if (!O.variable) {
			P = "with(obj||{}){\n" + P + "}\n"
		}
		P = "var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" + P + "return __p;\n";
		var N = new Function(O.variable || "obj", "_", P);
		if (Q) {
			return N(Q, M)
		}
		var p = function(S) {
			return N.call(this, S, M)
		};
		p.source = "function(" + (O.variable || "obj") + "){\n" + P + "}";
		return p
	};
	M.chain = function(p) {
		return M(p).chain()
	};
	var t = function(p) {
		this._wrapped = p
	};
	M.prototype = t.prototype;
	var r = function(N, p) {
		return p ? M(N).chain() : N
	};
	var w = function(p, N) {
		t.prototype[p] = function() {
			var O = m.call(arguments);
			z.call(O, this._wrapped);
			return r(N.apply(M, O), this._chain)
		}
	};
	M.mixin(M);
	I(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(p) {
		var N = C[p];
		t.prototype[p] = function() {
			var O = this._wrapped;
			N.apply(O, arguments);
			var P = O.length;
			if ((p == "shift" || p == "splice") && P === 0) {
				delete O[0]
			}
			return r(O, this._chain)
		}
	});
	I(["concat", "join", "slice"], function(p) {
		var N = C[p];
		t.prototype[p] = function() {
			return r(N.apply(this._wrapped, arguments), this._chain)
		}
	});
	t.prototype.chain = function() {
		this._chain = true;
		return this
	};
	t.prototype.value = function() {
		return this._wrapped
	};
	return M
}).call({});
var emmet = (function(b) {
	var d = "html";
	var h = "plain";
	if (typeof _ == "undefined") {
		try {
			_ = b[["require"][0]]("underscore")
		} catch (g) {}
	}
	if (typeof _ == "undefined") {
		throw "Cannot access to Underscore.js lib"
	}
	var c = {
		_: _
	};
	var j = function() {};

	function i(k, e, l) {
		var m;
		if (e && e.hasOwnProperty("constructor")) {
			m = e.constructor
		} else {
			m = function() {
				k.apply(this, arguments)
			}
		}
		_.extend(m, k);
		j.prototype = k.prototype;
		m.prototype = new j();
		if (e) {
			_.extend(m.prototype, e)
		}
		if (l) {
			_.extend(m, l)
		}
		m.prototype.constructor = m;
		m.__super__ = k.prototype;
		return m
	}
	var f = null;

	function a(e) {
		if (!(e in c) && f) {
			f(e)
		}
		return c[e]
	}
	return {
		define: function(k, e) {
			if (!(k in c)) {
				c[k] = _.isFunction(e) ? this.exec(e) : e
			}
		},
		require: a,
		exec: function(k, e) {
			return k.call(e || b, _.bind(a, this), _, this)
		},
		extend: function(e, k) {
			var l = i(this, e, k);
			l.extend = this.extend;
			if (e.hasOwnProperty("toString")) {
				l.prototype.toString = e.toString
			}
			return l
		},
		expandAbbreviation: function(r, n, m, q) {
			if (!r) {
				return ""
			}
			n = n || d;
			var l = a("filters");
			var k = a("abbreviationParser");
			m = a("profile").get(m, n);
			a("tabStops").resetTabstopIndex();
			var p = l.extractFromAbbreviation(r);
			var o = k.parse(p[0], {
				syntax: n,
				contextNode: q
			});
			var e = l.composeList(n, m, p[1]);
			l.apply(o, e, m);
			return o.toString()
		},
		defaultSyntax: function() {
			return d
		},
		defaultProfile: function() {
			return h
		},
		log: function() {
			if (b.console && b.console.log) {
				b.console.log.apply(b.console, arguments)
			}
		},
		setModuleLoader: function(e) {
			f = e
		}
	}
})(this);
if (typeof exports !== "undefined") {
	if (typeof module !== "undefined" && module.exports) {
		exports = module.exports = emmet
	}
	exports.emmet = emmet
}
if (typeof define !== "undefined") {
	define("emmet", [], emmet)
}
emmet.define("abbreviationParser", function(h, s) {
	var f = /^[\w\-\$\:@\!%]+\+?$/i;
	var g = /[\w\-:\$@]/;
	var t = {
		"[": "]",
		"(": ")",
		"{": "}"
	};
	var q = Array.prototype.splice;
	var e = [];
	var c = [];
	var i = [];

	function k(u) {
		this.parent = null;
		this.children = [];
		this._attributes = [];
		this.abbreviation = "";
		this.counter = 1;
		this._name = null;
		this._text = "";
		this.repeatCount = 1;
		this.hasImplicitRepeat = false;
		this._data = {};
		this.start = "";
		this.end = "";
		this.content = "";
		this.padding = ""
	}
	k.prototype = {
		addChild: function(v, u) {
			v = v || new k;
			v.parent = this;
			if (s.isUndefined(u)) {
				this.children.push(v)
			} else {
				this.children.splice(u, 0, v)
			}
			return v
		},
		clone: function() {
			var v = new k();
			var u = ["abbreviation", "counter", "_name", "_text", "repeatCount", "hasImplicitRepeat", "start", "end", "content", "padding"];
			s.each(u, function(w) {
				v[w] = this[w]
			}, this);
			v._attributes = s.map(this._attributes, function(w) {
				return s.clone(w)
			});
			v._data = s.clone(this._data);
			v.children = s.map(this.children, function(w) {
				w = w.clone();
				w.parent = v;
				return w
			});
			return v
		},
		remove: function() {
			if (this.parent) {
				this.parent.children = s.without(this.parent.children, this)
			}
			return this
		},
		replace: function() {
			var w = this.parent;
			var u = s.indexOf(w.children, this);
			var v = s.flatten(arguments);
			q.apply(w.children, [u, 1].concat(v));
			s.each(v, function(x) {
				x.parent = w
			})
		},
		updateProperty: function(u, v) {
			this[u] = v;
			s.each(this.children, function(w) {
				w.updateProperty(u, v)
			});
			return this
		},
		find: function(u) {
			return this.findAll(u)[0]
		},
		findAll: function(v) {
			if (!s.isFunction(v)) {
				var w = v.toLowerCase();
				v = function(x) {
					return x.name().toLowerCase() == w
				}
			}
			var u = [];
			s.each(this.children, function(x) {
				if (v(x)) {
					u.push(x)
				}
				u = u.concat(x.findAll(v))
			});
			return s.compact(u)
		},
		data: function(u, v) {
			if (arguments.length == 2) {
				this._data[u] = v;
				if (u == "resource" && h("elements").is(v, "snippet")) {
					this.content = v.data;
					if (this._text) {
						this.content = h("abbreviationUtils").insertChildContent(v.data, this._text)
					}
				}
			}
			return this._data[u]
		},
		name: function() {
			var u = this.matchedResource();
			if (h("elements").is(u, "element")) {
				return u.name
			}
			return this._name
		},
		attributeList: function() {
			var u = [];
			var v = this.matchedResource();
			if (h("elements").is(v, "element") && s.isArray(v.attributes)) {
				u = u.concat(v.attributes)
			}
			return m(u.concat(this._attributes))
		},
		attribute: function(v, w) {
			if (arguments.length == 2) {
				var u = s.indexOf(s.pluck(this._attributes, "name"), v.toLowerCase());
				if (~u) {
					this._attributes[u].value = w
				} else {
					this._attributes.push({
						name: v,
						value: w
					})
				}
			}
			return (s.find(this.attributeList(), function(x) {
				return x.name == v
			}) || {}).value
		},
		matchedResource: function() {
			return this.data("resource")
		},
		index: function() {
			return this.parent ? s.indexOf(this.parent.children, this) : -1
		},
		_setRepeat: function(u) {
			if (u) {
				this.repeatCount = parseInt(u, 10) || 1
			} else {
				this.hasImplicitRepeat = true
			}
		},
		setAbbreviation: function(u) {
			u = u || "";
			var w = this;
			u = u.replace(/\*(\d+)?$/, function(z, y) {
				w._setRepeat(y);
				return ""
			});
			this.abbreviation = u;
			var x = l(u);
			if (x) {
				u = x.element;
				this.content = this._text = x.text
			}
			var v = j(u);
			if (v) {
				u = v.element;
				this._attributes = v.attributes
			}
			this._name = u;
			if (this._name && !f.test(this._name)) {
				throw "Invalid abbreviation"
			}
		},
		toString: function() {
			var v = h("utils");
			var z = this.start;
			var u = this.end;
			var x = this.content;
			var w = this;
			s.each(i, function(A) {
				z = A(z, w, "start");
				x = A(x, w, "content");
				u = A(u, w, "end")
			});
			var y = s.map(this.children, function(A) {
				return A.toString()
			}).join("");
			x = h("abbreviationUtils").insertChildContent(x, y, {
				keepVariable: false
			});
			return z + v.padString(x, this.padding) + u
		},
		hasEmptyChildren: function() {
			return !!s.find(this.children, function(u) {
				return u.isEmpty()
			})
		},
		hasImplicitName: function() {
			return !this._name && !this.isTextNode()
		},
		isGroup: function() {
			return !this.abbreviation
		},
		isEmpty: function() {
			return !this.abbreviation && !this.children.length
		},
		isRepeating: function() {
			return this.repeatCount > 1 || this.hasImplicitRepeat
		},
		isTextNode: function() {
			return !this.name() && !this.attributeList().length
		},
		isElement: function() {
			return !this.isEmpty() && !this.isTextNode()
		},
		deepestChild: function() {
			if (!this.children.length) {
				return null
			}
			var u = this;
			while (u.children.length) {
				u = s.last(u.children)
			}
			return u
		}
	};

	function n(u) {
		return u.substring(1, u.length - 1)
	}

	function p(w, u) {
		var v;
		while (v = w.next()) {
			if (v === u) {
				return true
			}
			if (v == "\\") {
				continue
			}
		}
		return false
	}

	function a(B) {
		B = h("utils").trim(B);
		var x = new k;
		var w = x.addChild(),
			u;
		var z = h("stringStream").create(B);
		var v = 1000,
			A;
		while (!z.eol() && --v > 0) {
			u = z.peek();
			switch (u) {
				case "(":
					z.start = z.pos;
					if (z.skipToPair("(", ")")) {
						var C = a(n(z.current()));
						if (A = z.match(/^\*(\d+)?/, true)) {
							w._setRepeat(A[1])
						}
						s.each(C.children, function(D) {
							w.addChild(D)
						})
					} else {
						throw 'Invalid abbreviation: mo matching ")" found for character at ' + z.pos
					}
					break;
				case ">":
					w = w.addChild();
					z.next();
					break;
				case "+":
					w = w.parent.addChild();
					z.next();
					break;
				case "^":
					var y = w.parent || w;
					w = (y.parent || y).addChild();
					z.next();
					break;
				default:
					z.start = z.pos;
					z.eatWhile(function(E) {
						if (E == "[" || E == "{") {
							if (z.skipToPair(E, t[E])) {
								z.backUp(1);
								return true
							}
							throw 'Invalid abbreviation: mo matching "' + t[E] + '" found for character at ' + z.pos
						}
						if (E == "+") {
							z.next();
							var D = z.eol() || ~"+>^*".indexOf(z.peek());
							z.backUp(1);
							return D
						}
						return E != "(" && d(E)
					});
					w.setAbbreviation(z.current());
					z.start = z.pos
			}
		}
		if (v < 1) {
			throw "Endless loop detected"
		}
		return x
	}

	function o(x, w) {
		x = h("utils").trim(x);
		var u = [];
		var A = h("stringStream").create(x);
		A.eatSpace();
		while (!A.eol()) {
			A.start = A.pos;
			if (A.eatWhile(g)) {
				var y = A.current();
				var z = "";
				if (A.peek() == "=") {
					A.next();
					A.start = A.pos;
					var v = A.peek();
					if (v == '"' || v == "'") {
						A.next();
						if (p(A, v)) {
							z = A.current();
							z = z.substring(1, z.length - 1)
						} else {
							throw "Invalid attribute value"
						}
					} else {
						if (A.eatWhile(/[^\s\]]/)) {
							z = A.current()
						} else {
							throw "Invalid attribute value"
						}
					}
				}
				u.push({
					name: y,
					value: z
				});
				A.eatSpace()
			} else {
				break
			}
		}
		return u
	}

	function j(x) {
		var u = [];
		var v = {
			"#": "id",
			".": "class"
		};
		var w = null;
		var z = h("stringStream").create(x);
		while (!z.eol()) {
			switch (z.peek()) {
				case "#":
				case ".":
					if (w === null) {
						w = z.pos
					}
					var y = v[z.peek()];
					z.next();
					z.start = z.pos;
					z.eatWhile(g);
					u.push({
						name: y,
						value: z.current()
					});
					break;
				case "[":
					if (w === null) {
						w = z.pos
					}
					z.start = z.pos;
					if (!z.skipToPair("[", "]")) {
						throw "Invalid attribute set definition"
					}
					u = u.concat(o(n(z.current())));
					break;
				default:
					z.next()
			}
		}
		if (!u.length) {
			return null
		}
		return {
			element: x.substring(0, w),
			attributes: m(u)
		}
	}

	function m(u) {
		u = s.map(u, function(w) {
			return s.clone(w)
		});
		var v = {};
		return s.filter(u, function(w) {
			if (!(w.name in v)) {
				return v[w.name] = w
			}
			var x = v[w.name];
			if (w.name.toLowerCase() == "class") {
				x.value += (x.value.length ? " " : "") + w.value
			} else {
				x.value = w.value
			}
			return false
		})
	}

	function l(u) {
		if (!~u.indexOf("{")) {
			return null
		}
		var v = h("stringStream").create(u);
		while (!v.eol()) {
			switch (v.peek()) {
				case "[":
				case "(":
					v.skipToPair(v.peek(), t[v.peek()]);
					break;
				case "{":
					v.start = v.pos;
					v.skipToPair("{", "}");
					return {
						element: u.substring(0, v.start), text: n(v.current())
					};
				default:
					v.next()
			}
		}
	}

	function b(w) {
		for (var v = w.children.length - 1, u, y, x; v >= 0; v--) {
			y = w.children[v];
			if (y.isRepeating()) {
				x = u = y.repeatCount;
				y.repeatCount = 1;
				y.updateProperty("counter", 1);
				y.updateProperty("maxCount", x);
				while (--u > 0) {
					y.parent.addChild(y.clone(), v + 1).updateProperty("counter", u + 1).updateProperty("maxCount", x)
				}
			}
		}
		s.each(w.children, b);
		return w
	}

	function r(v) {
		for (var u = v.children.length - 1; u >= 0; u--) {
			var w = v.children[u];
			if (w.isGroup()) {
				w.replace(r(w).children)
			} else {
				if (w.isEmpty()) {
					w.remove()
				}
			}
		}
		s.each(v.children, r);
		return v
	}

	function d(w) {
		var v = w.charCodeAt(0);
		var u = "#.*:$-_!@|%";
		return (v > 64 && v < 91) || (v > 96 && v < 123) || (v > 47 && v < 58) || u.indexOf(w) != -1
	}
	i.push(function(v, u) {
		return h("utils").replaceCounter(v, u.counter, u.maxCount)
	});
	return {
		parse: function(w, v) {
			v = v || {};
			var u = a(w);
			if (v.contextNode) {
				u._name = v.contextNode.name;
				var x = {};
				s.each(u._attributes, function(y) {
					x[y.name] = y
				});
				s.each(v.contextNode.attributes, function(y) {
					if (y.name in x) {
						x[y.name].value = y.value
					} else {
						y = s.clone(y);
						u._attributes.push(y);
						x[y.name] = y
					}
				})
			}
			s.each(e, function(y) {
				y(u, v)
			});
			u = r(b(u));
			s.each(c, function(y) {
				y(u, v)
			});
			return u
		},
		AbbreviationNode: k,
		addPreprocessor: function(u) {
			if (!s.include(e, u)) {
				e.push(u)
			}
		},
		removeFilter: function(u) {
			preprocessor = s.without(e, u)
		},
		addPostprocessor: function(u) {
			if (!s.include(c, u)) {
				c.push(u)
			}
		},
		removePostprocessor: function(u) {
			c = s.without(c, u)
		},
		addOutputProcessor: function(u) {
			if (!s.include(i, u)) {
				i.push(u)
			}
		},
		removeOutputProcessor: function(u) {
			i = s.without(i, u)
		},
		isAllowedChar: function(u) {
			u = String(u);
			return d(u) || ~">+^[](){}".indexOf(u)
		}
	}
});
emmet.exec(function(b, a) {
	function c(e, d) {
		var g = b("resources");
		var f = b("elements");
		var h = b("abbreviationParser");
		a.each(a.clone(e.children), function(m) {
			var i = g.getMatchedResource(m, d);
			if (a.isString(i)) {
				m.data("resource", f.create("snippet", i))
			} else {
				if (f.is(i, "reference")) {
					var j = h.parse(i.data, {
						syntax: d
					});
					if (m.repeatCount > 1) {
						var l = j.findAll(function(n) {
							return n.hasImplicitRepeat
						});
						a.each(l, function(n) {
							n.repeatCount = m.repeatCount;
							n.hasImplicitRepeat = false
						})
					}
					var k = j.deepestChild();
					if (k) {
						a.each(m.children, function(n) {
							k.addChild(n)
						})
					}
					a.each(j.children, function(n) {
						a.each(m.attributeList(), function(o) {
							n.attribute(o.name, o.value)
						})
					});
					m.replace(j.children)
				} else {
					m.data("resource", i)
				}
			}
			c(m, d)
		})
	}
	b("abbreviationParser").addPreprocessor(function(d, f) {
		var e = f.syntax || emmet.defaultSyntax();
		c(d, e)
	})
});
emmet.exec(function(e, d) {
	var h = e("abbreviationParser");
	var c = "$#";

	function g(l) {
		var j = e("range");
		var i = [];
		var k = e("stringStream").create(l);
		while (!k.eol()) {
			if (k.peek() == "\\") {
				k.next()
			} else {
				k.start = k.pos;
				if (k.match(c, true)) {
					i.push(j.create(k.start, c));
					continue
				}
			}
			k.next()
		}
		return i
	}

	function a(l, k) {
		var j = e("utils");
		var i = g(l);
		i.reverse();
		d.each(i, function(m) {
			l = j.replaceSubstring(l, k, m)
		});
		return l
	}

	function f(i) {
		if (g(i.content).length) {
			return true
		}
		return !!d.find(i.attributeList(), function(j) {
			return !!g(j.value).length
		})
	}

	function b(l, k, j) {
		var i = l.findAll(function(n) {
			return f(n)
		});
		if (f(l)) {
			i.unshift(l)
		}
		if (i.length) {
			d.each(i, function(n) {
				n.content = a(n.content, k);
				d.each(n._attributes, function(o) {
					o.value = a(o.value, k)
				})
			})
		} else {
			var m = l.deepestChild() || l;
			if (j) {
				m.content = k
			} else {
				m.content = e("abbreviationUtils").insertChildContent(m.content, k)
			}
		}
	}
	h.addPreprocessor(function(i, l) {
		if (l.pastedContent) {
			var k = e("utils");
			var j = d.map(k.splitByLines(l.pastedContent, true), k.trim);
			i.findAll(function(m) {
				if (m.hasImplicitRepeat) {
					m.data("paste", j);
					return m.repeatCount = j.length
				}
			})
		}
	});
	h.addPostprocessor(function(i, k) {
		var j = i.findAll(function(m) {
			var l = m.data("paste");
			var n = "";
			if (d.isArray(l)) {
				n = l[m.counter - 1]
			} else {
				if (d.isFunction(l)) {
					n = l(m.counter - 1, m.content)
				} else {
					if (l) {
						n = l
					}
				}
			}
			if (n) {
				b(m, n, !!m.data("pasteOverwrites"))
			}
			m.data("paste", null);
			return !!l
		});
		if (!j.length && k.pastedContent) {
			b(i, k.pastedContent)
		}
	})
});
emmet.exec(function(b, a) {
	function c(d) {
		var e = b("tagName");
		a.each(d.children, function(f) {
			if (f.hasImplicitName() || f.data("forceNameResolving")) {
				f._name = e.resolve(f.parent.name())
			}
			c(f)
		});
		return d
	}
	b("abbreviationParser").addPostprocessor(c)
});
emmet.define("cssParser", function(g, s) {
	var o, j = [],
		q, p, n;
	o = {
		lines: null,
		total_lines: 0,
		linenum: -1,
		line: "",
		ch: "",
		chnum: -1,
		init: function(v) {
			var u = o;
			u.lines = v.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
			u.total_lines = u.lines.length;
			u.chnum = -1;
			u.linenum = -1;
			u.ch = "";
			u.line = "";
			u.nextLine();
			u.nextChar()
		},
		nextLine: function() {
			var u = this;
			u.linenum += 1;
			if (u.total_lines <= u.linenum) {
				u.line = false
			} else {
				u.line = u.lines[u.linenum]
			}
			if (u.chnum !== -1) {
				u.chnum = 0
			}
			return u.line
		},
		nextChar: function() {
			var u = this;
			u.chnum += 1;
			while (u.line.charAt(u.chnum) === "") {
				if (this.nextLine() === false) {
					u.ch = false;
					return false
				}
				u.chnum = -1;
				u.ch = "\n";
				return "\n"
			}
			u.ch = u.line.charAt(u.chnum);
			return u.ch
		},
		peek: function() {
			return this.line.charAt(this.chnum + 1)
		}
	};
	p = function(u) {
		return (u == "&" || u === "_" || u === "-" || (u >= "a" && u <= "z") || (u >= "A" && u <= "Z"))
	};
	n = function(u) {
		return (u !== false && u >= "0" && u <= "9")
	};
	q = (function() {
		var u = "{}[]()+*=.,;:>~|\\%$#@^!".split(""),
			w = "*^|$~".split(""),
			x = {},
			y = {},
			v = 0;
		for (; v < u.length; v += 1) {
			x[u[v]] = true
		}
		for (v = 0; v < w.length; v += 1) {
			y[w[v]] = true
		}
		return function(z, A) {
			if (A) {
				return !!y[z]
			}
			return !!x[z]
		}
	}());

	function i(u) {
		return typeof u !== "undefined"
	}

	function r() {
		return {
			"char": o.chnum,
			line: o.linenum
		}
	}

	function t(y, x, v) {
		var u = o,
			z = v || {};
		j.push({
			charstart: i(z["char"]) ? z["char"] : u.chnum,
			charend: i(z.charend) ? z.charend : u.chnum,
			linestart: i(z.line) ? z.line : u.linenum,
			lineend: i(z.lineend) ? z.lineend : u.linenum,
			value: y,
			type: x || y
		})
	}

	function m(u, z) {
		var x = o,
			y = z || {},
			A = i(y["char"]) ? y["char"] : x.chnum,
			v = i(y.line) ? y.line : x.linenum;
		return {
			name: "ParseError",
			message: u + " at line " + (v + 1) + " char " + (A + 1),
			walker: x,
			tokens: j
		}
	}

	function e() {
		var w = o.ch,
			v = "",
			u = r();
		while (w === " " || w === "\t") {
			v += w;
			w = o.nextChar()
		}
		t(v, "white", u)
	}

	function b() {
		var u = o,
			A = u.ch,
			x = A,
			y, v = r();
		y = u.nextChar();
		if (y === "/") {
			x += y;
			var z = u.peek();
			while (z && z !== "\n") {
				x += y;
				y = u.nextChar();
				z = u.peek()
			}
		} else {
			if (y === "*") {
				while (!(A === "*" && y === "/")) {
					x += y;
					A = y;
					y = u.nextChar()
				}
			} else {
				v.charend = v["char"];
				v.lineend = v.line;
				return t(x, x, v)
			}
		}
		x += y;
		u.nextChar();
		t(x, "comment", v)
	}

	function l() {
		var u = o,
			A = u.ch,
			z = A,
			x = A,
			y, v = r();
		A = u.nextChar();
		while (A !== z) {
			if (A === "\n") {
				y = u.nextChar();
				if (y === "\\") {
					x += A + y
				} else {
					throw m("Unterminated string", v)
				}
			} else {
				if (A === "\\") {
					x += A + u.nextChar()
				} else {
					x += A
				}
			}
			A = u.nextChar()
		}
		x += A;
		u.nextChar();
		t(x, "string", v)
	}

	function k() {
		var u = o,
			z = u.ch,
			y = 0,
			x = z,
			v = r();
		z = u.nextChar();
		while (z !== ")" && !y) {
			if (z === "(") {
				y++
			} else {
				if (z === ")") {
					y--
				} else {
					if (z === false) {
						throw m("Unterminated brace", v)
					}
				}
			}
			x += z;
			z = u.nextChar()
		}
		x += z;
		u.nextChar();
		t(x, "brace", v)
	}

	function c(y) {
		var u = o,
			z = u.ch,
			v = r(),
			x = (y) ? y + z : z;
		z = u.nextChar();
		if (y) {
			v["char"] -= y.length
		}
		while (p(z) || n(z)) {
			x += z;
			z = u.nextChar()
		}
		t(x, "identifier", v)
	}

	function f() {
		var v = o,
			A = v.ch,
			x = r(),
			y = A,
			u = y === ".",
			z;
		A = v.nextChar();
		z = !n(A);
		if (u && z) {
			x.charend = x["char"];
			x.lineend = x.line;
			return t(y, ".", x)
		}
		if (y === "-" && z) {
			return c("-")
		}
		while (A !== false && (n(A) || (!u && A === "."))) {
			if (A === ".") {
				u = true
			}
			y += A;
			A = v.nextChar()
		}
		t(y, "number", x)
	}

	function h() {
		var u = o,
			z = u.ch,
			v = r(),
			x = z,
			y = u.nextChar();
		if (y === "=" && q(x, true)) {
			x += y;
			t(x, "match", v);
			u.nextChar();
			return
		}
		v.charend = v["char"] + 1;
		v.lineend = v.line;
		t(x, x, v)
	}

	function a() {
		var u = o.ch;
		if (u === " " || u === "\t") {
			return e()
		}
		if (u === "/") {
			return b()
		}
		if (u === '"' || u === "'") {
			return l()
		}
		if (u === "(") {
			return k()
		}
		if (u === "-" || u === "." || n(u)) {
			return f()
		}
		if (p(u)) {
			return c()
		}
		if (q(u)) {
			return h()
		}
		if (u === "\n") {
			t("line");
			o.nextChar();
			return
		}
		throw m("Unrecognized character")
	}

	function d(u, v) {
		return u.charAt(v) == "\r" && u.charAt(v + 1) == "\n" ? "\r\n" : u.charAt(v)
	}
	return {
		lex: function(u) {
			o.init(u);
			j = [];
			while (o.ch !== false) {
				a()
			}
			return j
		},
		parse: function(u) {
			var v = 0;
			return s.map(this.lex(u), function(w) {
				if (w.type == "line") {
					w.value = d(u, v)
				}
				return {
					type: w.type,
					start: v,
					end: (v += w.value.length)
				}
			})
		},
		toSource: function(y) {
			var w = 0,
				u = y.length,
				v, x = "";
			for (; w < u; w += 1) {
				v = y[w];
				if (v.type === "line") {
					x += "\n"
				} else {
					x += v.value
				}
			}
			return x
		}
	}
});
emmet.define("xmlParser", function(n, z) {
	var x = {
		autoSelfClosers: {},
		implicitlyClosed: {},
		contextGrabbers: {},
		doNotIndent: {},
		allowUnquoted: true,
		allowMissing: true
	};
	var e = null,
		g = null;

	function p(E, D) {
		function B(G) {
			D.tokenize = G;
			return G(E, D)
		}
		var C = E.next();
		if (C == "<") {
			if (E.eat("!")) {
				if (E.eat("[")) {
					if (E.match("CDATA[")) {
						return B(w("atom", "]]>"))
					} else {
						return null
					}
				} else {
					if (E.match("--")) {
						return B(w("comment", "-->"))
					} else {
						if (E.match("DOCTYPE", true, true)) {
							E.eatWhile(/[\w\._\-]/);
							return B(y(1))
						} else {
							return null
						}
					}
				}
			} else {
				if (E.eat("?")) {
					E.eatWhile(/[\w\._\-]/);
					D.tokenize = w("meta", "?>");
					return "meta"
				} else {
					g = E.eat("/") ? "closeTag" : "openTag";
					E.eatSpace();
					e = "";
					var F;
					while ((F = E.eat(/[^\s\u00a0=<>\"\'\/?]/))) {
						e += F
					}
					D.tokenize = o;
					return "tag"
				}
			}
		} else {
			if (C == "&") {
				var A;
				if (E.eat("#")) {
					if (E.eat("x")) {
						A = E.eatWhile(/[a-fA-F\d]/) && E.eat(";")
					} else {
						A = E.eatWhile(/[\d]/) && E.eat(";")
					}
				} else {
					A = E.eatWhile(/[\w\.\-:]/) && E.eat(";")
				}
				return A ? "atom" : "error"
			} else {
				E.eatWhile(/[^&<]/);
				return "text"
			}
		}
	}

	function o(C, B) {
		var A = C.next();
		if (A == ">" || (A == "/" && C.eat(">"))) {
			B.tokenize = p;
			g = A == ">" ? "endTag" : "selfcloseTag";
			return "tag"
		} else {
			if (A == "=") {
				g = "equals";
				return null
			} else {
				if (/[\'\"]/.test(A)) {
					B.tokenize = j(A);
					return B.tokenize(C, B)
				} else {
					C.eatWhile(/[^\s\u00a0=<>\"\'\/?]/);
					return "word"
				}
			}
		}
	}

	function j(A) {
		return function(C, B) {
			while (!C.eol()) {
				if (C.next() == A) {
					B.tokenize = o;
					break
				}
			}
			return "string"
		}
	}

	function w(B, A) {
		return function(D, C) {
			while (!D.eol()) {
				if (D.match(A)) {
					C.tokenize = p;
					break
				}
				D.next()
			}
			return B
		}
	}

	function y(A) {
		return function(D, C) {
			var B;
			while ((B = D.next()) != null) {
				if (B == "<") {
					C.tokenize = y(A + 1);
					return C.tokenize(D, C)
				} else {
					if (B == ">") {
						if (A == 1) {
							C.tokenize = p;
							break
						} else {
							C.tokenize = y(A - 1);
							return C.tokenize(D, C)
						}
					}
				}
			}
			return "meta"
		}
	}
	var l = null,
		h;

	function a() {
		for (var A = arguments.length - 1; A >= 0; A--) {
			l.cc.push(arguments[A])
		}
	}

	function d() {
		a.apply(null, arguments);
		return true
	}

	function i(A, C) {
		var B = x.doNotIndent.hasOwnProperty(A) || (l.context && l.context.noIndent);
		l.context = {
			prev: l.context,
			tagName: A,
			indent: l.indented,
			startOfLine: C,
			noIndent: B
		}
	}

	function u() {
		if (l.context) {
			l.context = l.context.prev
		}
	}

	function c(A) {
		if (A == "openTag") {
			l.tagName = e;
			return d(m, b(l.startOfLine))
		} else {
			if (A == "closeTag") {
				var B = false;
				if (l.context) {
					if (l.context.tagName != e) {
						if (x.implicitlyClosed.hasOwnProperty(l.context.tagName.toLowerCase())) {
							u()
						}
						B = !l.context || l.context.tagName != e
					}
				} else {
					B = true
				}
				if (B) {
					h = "error"
				}
				return d(s(B))
			}
		}
		return d()
	}

	function b(A) {
		return function(B) {
			if (B == "selfcloseTag" || (B == "endTag" && x.autoSelfClosers.hasOwnProperty(l.tagName.toLowerCase()))) {
				r(l.tagName.toLowerCase());
				return d()
			}
			if (B == "endTag") {
				r(l.tagName.toLowerCase());
				i(l.tagName, A);
				return d()
			}
			return d()
		}
	}

	function s(A) {
		return function(B) {
			if (A) {
				h = "error"
			}
			if (B == "endTag") {
				u();
				return d()
			}
			h = "error";
			return d(arguments.callee)
		}
	}

	function r(B) {
		var A;
		while (true) {
			if (!l.context) {
				return
			}
			A = l.context.tagName.toLowerCase();
			if (!x.contextGrabbers.hasOwnProperty(A) || !x.contextGrabbers[A].hasOwnProperty(B)) {
				return
			}
			u()
		}
	}

	function m(A) {
		if (A == "word") {
			h = "attribute";
			return d(q, m)
		}
		if (A == "endTag" || A == "selfcloseTag") {
			return a()
		}
		h = "error";
		return d(m)
	}

	function q(A) {
		if (A == "equals") {
			return d(v, m)
		}
		if (!x.allowMissing) {
			h = "error"
		}
		return (A == "endTag" || A == "selfcloseTag") ? a() : d()
	}

	function v(A) {
		if (A == "string") {
			return d(t)
		}
		if (A == "word" && x.allowUnquoted) {
			h = "string";
			return d()
		}
		h = "error";
		return (A == "endTag" || A == "selfCloseTag") ? a() : d()
	}

	function t(A) {
		if (A == "string") {
			return d(t)
		} else {
			return a()
		}
	}

	function f() {
		return {
			tokenize: p,
			cc: [],
			indented: 0,
			startOfLine: true,
			tagName: null,
			context: null
		}
	}

	function k(D, C) {
		if (D.sol()) {
			C.startOfLine = true;
			C.indented = 0
		}
		if (D.eatSpace()) {
			return null
		}
		h = g = e = null;
		var B = C.tokenize(D, C);
		C.type = g;
		if ((B || g) && B != "comment") {
			l = C;
			while (true) {
				var A = C.cc.pop() || c;
				if (A(g || B)) {
					break
				}
			}
		}
		C.startOfLine = false;
		return h || B
	}
	return {
		parse: function(B, E) {
			E = E || 0;
			var A = f();
			var D = n("stringStream").create(B);
			var C = [];
			while (!D.eol()) {
				C.push({
					type: k(D, A),
					start: D.start + E,
					end: D.pos + E
				});
				D.start = D.pos
			}
			return C
		}
	}
});
/*!
 * string_score.js: String Scoring Algorithm 0.1.10 
 *
 * http://joshaven.com/string_score
 * https://github.com/joshaven/string_score
 *
 * Copyright (C) 2009-2011 Joshaven Potter <yourtech@gmail.com>
 * Special thanks to all of the contributors listed here https://github.com/joshaven/string_score
 * MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 * Date: Tue Mar 1 2011
 */
;
emmet.define("string-score", function(b, a) {
	return {
		score: function(j, o, u) {
			if (j == o) {
				return 1
			}
			if (o == "") {
				return 0
			}
			var h = 0,
				s = o.length,
				r = j.length,
				q, m, g = 1,
				l;
			for (var f = 0, t, p, k, d, e, n; f < s; ++f) {
				k = o.charAt(f);
				d = j.indexOf(k.toLowerCase());
				e = j.indexOf(k.toUpperCase());
				n = Math.min(d, e);
				p = (n > -1) ? n : Math.max(d, e);
				if (p === -1) {
					if (u) {
						g += 1 - u;
						continue
					} else {
						return 0
					}
				} else {
					t = 0.1
				}
				if (j[p] === k) {
					t += 0.1
				}
				if (p === 0) {
					t += 0.6;
					if (f === 0) {
						q = 1
					}
				} else {
					if (j.charAt(p - 1) === " ") {
						t += 0.8
					}
				}
				j = j.substring(p + 1, r);
				h += t
			}
			m = h / s;
			l = ((m * (s / r)) + m) / 2;
			l = l / g;
			if (q && (l + 0.15 < 1)) {
				l += 0.15
			}
			return l
		}
	}
});
emmet.define("utils", function(c, b) {
	var d = "${0}";

	function a(e) {
		this._data = [];
		this.length = 0;
		if (e) {
			this.append(e)
		}
	}
	a.prototype = {
		append: function(e) {
			this._data.push(e);
			this.length += e.length
		},
		toString: function() {
			return this._data.join("")
		},
		valueOf: function() {
			return this.toString()
		}
	};
	return {
		reTag: /<\/?[\w:\-]+(?:\s+[\w\-:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*\s*(\/?)>$/,
		endsWithTag: function(e) {
			return this.reTag.test(e)
		},
		isNumeric: function(e) {
			if (typeof(e) == "string") {
				e = e.charCodeAt(0)
			}
			return (e && e > 47 && e < 58)
		},
		trim: function(e) {
			return (e || "").replace(/^\s+|\s+$/g, "")
		},
		getNewline: function() {
			var f = c("resources");
			if (!f) {
				return "\n"
			}
			var e = f.getVariable("newline");
			return b.isString(e) ? e : "\n"
		},
		setNewline: function(f) {
			var e = c("resources");
			e.setVariable("newline", f);
			e.setVariable("nl", f)
		},
		splitByLines: function(h, g) {
			var f = this.getNewline();
			var e = (h || "").replace(/\r\n/g, "\n").replace(/\n\r/g, "\n").replace(/\r/g, "\n").replace(/\n/g, f).split(f);
			if (g) {
				e = b.filter(e, function(i) {
					return i.length && !!this.trim(i)
				}, this)
			}
			return e
		},
		normalizeNewline: function(e) {
			return this.splitByLines(e).join(this.getNewline())
		},
		repeatString: function(h, g) {
			var e = [];
			for (var f = 0; f < g; f++) {
				e.push(h)
			}
			return e.join("")
		},
		getStringsPads: function(f) {
			var g = b.map(f, function(h) {
				return b.isString(h) ? h.length : +h
			});
			var e = b.max(g);
			return b.map(g, function(h) {
				var i = e - h;
				return i ? this.repeatString(" ", i) : ""
			}, this)
		},
		padString: function(l, k) {
			var h = (b.isNumber(k)) ? this.repeatString(c("resources").getVariable("indentation") || "\t", k) : k;
			var e = [];
			var g = this.splitByLines(l);
			var f = this.getNewline();
			e.push(g[0]);
			for (var i = 1; i < g.length; i++) {
				e.push(f + h + g[i])
			}
			return e.join("")
		},
		zeroPadString: function(h, g) {
			var f = "";
			var e = h.length;
			while (g > e++) {
				f += "0"
			}
			return f + h
		},
		unindentString: function(h, g) {
			var e = this.splitByLines(h);
			for (var f = 0; f < e.length; f++) {
				if (e[f].search(g) == 0) {
					e[f] = e[f].substr(g.length)
				}
			}
			return e.join(this.getNewline())
		},
		replaceUnescapedSymbol: function(l, h, g) {
			var k = 0;
			var o = l.length;
			var j = h.length;
			var n = 0;
			while (k < o) {
				if (l.charAt(k) == "\\") {
					k += j + 1
				} else {
					if (l.substr(k, j) == h) {
						var e = j;
						n++;
						var f = g;
						if (b.isFunction(g)) {
							var m = g(l, h, k, n);
							if (m) {
								e = m[0].length;
								f = m[1]
							} else {
								f = false
							}
						}
						if (f === false) {
							k++;
							continue
						}
						l = l.substring(0, k) + f + l.substring(k + e);
						o = l.length;
						k += f.length
					} else {
						k++
					}
				}
			}
			return l
		},
		replaceVariables: function(h, f) {
			f = f || {};
			var g = b.isFunction(f) ? f : function(j, i) {
				return i in f ? f[i] : null
			};
			var e = c("resources");
			return c("tabStops").processText(h, {
				variable: function(i) {
					var j = g(i.token, i.name, i);
					if (j === null) {
						j = e.getVariable(i.name)
					}
					if (j === null || b.isUndefined(j)) {
						j = i.token
					}
					return j
				}
			})
		},
		replaceCounter: function(i, h, f) {
			var g = "$";
			i = String(i);
			h = String(h);
			if (/^\-?\d+$/.test(h)) {
				h = +h
			}
			var e = this;
			return this.replaceUnescapedSymbol(i, g, function(s, o, t, r) {
				if (s.charAt(t + 1) == "{" || e.isNumeric(s.charAt(t + 1))) {
					return false
				}
				var q = t + 1;
				while (s.charAt(q) == "$" && s.charAt(q + 1) != "{") {
					q++
				}
				var n = q - t;
				var k = 0,
					p = false,
					l;
				if (l = s.substr(q).match(/^@(\-?)(\d*)/)) {
					q += l[0].length;
					if (l[1]) {
						p = true
					}
					k = parseInt(l[2] || 1) - 1
				}
				if (p && f && b.isNumber(h)) {
					h = f - h + 1
				}
				h += k;
				return [s.substring(t, q), e.zeroPadString(h + "", n)]
			})
		},
		matchesTag: function(e) {
			return this.reTag.test(e || "")
		},
		escapeText: function(e) {
			return e.replace(/([\$\\])/g, "\\$1")
		},
		unescapeText: function(e) {
			return e.replace(/\\(.)/g, "$1")
		},
		getCaretPlaceholder: function() {
			return b.isFunction(d) ? d.apply(this, arguments) : d
		},
		setCaretPlaceholder: function(e) {
			d = e
		},
		getLinePadding: function(e) {
			return (e.match(/^(\s+)/) || [""])[0]
		},
		getLinePaddingFromPosition: function(e, g) {
			var f = this.findNewlineBounds(e, g);
			return this.getLinePadding(f.substring(e))
		},
		escapeForRegexp: function(f) {
			var e = new RegExp("[.*+?|()\\[\\]{}\\\\]", "g");
			return f.replace(e, "\\$&")
		},
		prettifyNumber: function(e, f) {
			return e.toFixed(typeof f == "undefined" ? 2 : f).replace(/\.?0+$/, "")
		},
		stringBuilder: function(e) {
			return new a(e)
		},
		replaceSubstring: function(g, f, h, e) {
			if (b.isObject(h) && "end" in h) {
				e = h.end;
				h = h.start
			}
			if (b.isString(e)) {
				e = h + e.length
			}
			if (b.isUndefined(e)) {
				e = h
			}
			if (h < 0 || h > g.length) {
				return g
			}
			return g.substring(0, h) + f + g.substring(e)
		},
		narrowToNonSpace: function(h, i, e) {
			var f = c("range").create(i, e);
			var g = /[\s\n\r\u00a0]/;
			while (f.start < f.end) {
				if (!g.test(h.charAt(f.start))) {
					break
				}
				f.start++
			}
			while (f.end > f.start) {
				f.end--;
				if (!g.test(h.charAt(f.end))) {
					f.end++;
					break
				}
			}
			return f
		},
		findNewlineBounds: function(l, n) {
			var e = l.length,
				m = 0,
				f = e - 1;
			for (var h = n - 1; h > 0; h--) {
				var k = l.charAt(h);
				if (k == "\n" || k == "\r") {
					m = h + 1;
					break
				}
			}
			for (var g = n; g < e; g++) {
				var k = l.charAt(g);
				if (k == "\n" || k == "\r") {
					f = g;
					break
				}
			}
			return c("range").create(m, f - m)
		},
		deepMerge: function() {
			var n, g, e, f, l, m, k = arguments[0] || {},
				j = 1,
				h = arguments.length;
			if (!b.isObject(k) && !b.isFunction(k)) {
				k = {}
			}
			for (; j < h; j++) {
				if ((n = arguments[j]) != null) {
					for (g in n) {
						e = k[g];
						f = n[g];
						if (k === f) {
							continue
						}
						if (f && (b.isObject(f) || (l = b.isArray(f)))) {
							if (l) {
								l = false;
								m = e && b.isArray(e) ? e : []
							} else {
								m = e && b.isObject(e) ? e : {}
							}
							k[g] = this.deepMerge(m, f)
						} else {
							if (f !== undefined) {
								k[g] = f
							}
						}
					}
				}
			}
			return k
		}
	}
});
emmet.define("range", function(b, a) {
	function c(f, e, g) {
		switch (g) {
			case "eq":
			case "==":
				return f === e;
			case "lt":
			case "<":
				return f < e;
			case "lte":
			case "<=":
				return f <= e;
			case "gt":
			case ">":
				return f > e;
			case "gte":
			case ">=":
				return f >= e
		}
	}

	function d(f, e) {
		if (a.isObject(f) && "start" in f) {
			this.start = Math.min(f.start, f.end);
			this.end = Math.max(f.start, f.end)
		} else {
			if (a.isArray(f)) {
				this.start = f[0];
				this.end = f[1]
			} else {
				e = a.isString(e) ? e.length : +e;
				this.start = f;
				this.end = f + e
			}
		}
	}
	d.prototype = {
		length: function() {
			return Math.abs(this.end - this.start)
		},
		equal: function(e) {
			return this.cmp(e, "eq", "eq")
		},
		shift: function(e) {
			this.start += e;
			this.end += e;
			return this
		},
		overlap: function(e) {
			return e.start <= this.end && e.end >= this.start
		},
		intersection: function(f) {
			if (this.overlap(f)) {
				var g = Math.max(f.start, this.start);
				var e = Math.min(f.end, this.end);
				return new d(g, e - g)
			}
			return null
		},
		union: function(f) {
			if (this.overlap(f)) {
				var g = Math.min(f.start, this.start);
				var e = Math.max(f.end, this.end);
				return new d(g, e - g)
			}
			return null
		},
		inside: function(e) {
			return this.cmp(e, "lte", "gt")
		},
		contains: function(e) {
			return this.cmp(e, "lt", "gt")
		},
		include: function(e) {
			return this.cmp(loc, "lte", "gte")
		},
		cmp: function(i, h, g) {
			var f, e;
			if (i instanceof d) {
				f = i.start;
				e = i.end
			} else {
				f = e = i
			}
			return c(this.start, f, h || "<=") && c(this.end, e, g || ">")
		},
		substring: function(e) {
			return this.length() > 0 ? e.substring(this.start, this.end) : ""
		},
		clone: function() {
			return new d(this.start, this.length())
		},
		toArray: function() {
			return [this.start, this.end]
		},
		toString: function() {
			return "{" + this.start + ", " + this.length() + "}"
		}
	};
	return {
		create: function(f, e) {
			if (a.isUndefined(f) || f === null) {
				return null
			}
			if (f instanceof d) {
				return f
			}
			if (a.isObject(f) && "start" in f && "end" in f) {
				e = f.end - f.start;
				f = f.start
			}
			return new d(f, e)
		},
		create2: function(f, e) {
			if (a.isNumber(f) && a.isNumber(e)) {
				e -= f
			}
			return this.create(f, e)
		}
	}
});
emmet.define("handlerList", function(c, b) {
	function a() {
		this._list = []
	}
	a.prototype = {
		add: function(e, d) {
			this._list.push(b.extend({
				order: 0
			}, d || {}, {
				fn: e
			}))
		},
		remove: function(d) {
			this._list = b.without(this._list, b.find(this._list, function(e) {
				return e.fn === d
			}))
		},
		list: function() {
			return b.sortBy(this._list, "order").reverse()
		},
		listFn: function() {
			return b.pluck(this.list(), "fn")
		},
		exec: function(f, e) {
			e = e || [];
			var d = null;
			b.find(this.list(), function(g) {
				d = g.fn.apply(g, e);
				if (d !== f) {
					return true
				}
			});
			return d
		}
	};
	return {
		create: function() {
			return new a()
		}
	}
});
emmet.define("tokenIterator", function(b, a) {
	function c(d) {
		this.tokens = d;
		this._position = 0;
		this.reset()
	}
	c.prototype = {
		next: function() {
			if (this.hasNext()) {
				var d = this.tokens[++this._i];
				this._position = d.start;
				return d
			}
			return null
		},
		current: function() {
			return this.tokens[this._i]
		},
		position: function() {
			return this._position
		},
		hasNext: function() {
			return this._i < this._il - 1
		},
		reset: function() {
			this._i = -1;
			this._il = this.tokens.length
		},
		item: function() {
			return this.tokens[this._i]
		},
		itemNext: function() {
			return this.tokens[this._i + 1]
		},
		itemPrev: function() {
			return this.tokens[this._i - 1]
		},
		nextUntil: function(e, g) {
			var d;
			var f = a.isString(e) ? function(h) {
				return h.type == e
			} : e;
			while (d = this.next()) {
				if (g) {
					g.call(this, d)
				}
				if (f.call(this, d)) {
					break
				}
			}
		}
	};
	return {
		create: function(d) {
			return new c(d)
		}
	}
});
emmet.define("stringStream", function(b, a) {
	function c(d) {
		this.pos = this.start = 0;
		this.string = d
	}
	c.prototype = {
		eol: function() {
			return this.pos >= this.string.length
		},
		sol: function() {
			return this.pos == 0
		},
		peek: function() {
			return this.string.charAt(this.pos)
		},
		next: function() {
			if (this.pos < this.string.length) {
				return this.string.charAt(this.pos++)
			}
		},
		eat: function(d) {
			var f = this.string.charAt(this.pos),
				e;
			if (typeof d == "string") {
				e = f == d
			} else {
				e = f && (d.test ? d.test(f) : d(f))
			}
			if (e) {
				++this.pos;
				return f
			}
		},
		eatWhile: function(d) {
			var e = this.pos;
			while (this.eat(d)) {}
			return this.pos > e
		},
		eatSpace: function() {
			var d = this.pos;
			while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) {
				++this.pos
			}
			return this.pos > d
		},
		skipToEnd: function() {
			this.pos = this.string.length
		},
		skipTo: function(d) {
			var e = this.string.indexOf(d, this.pos);
			if (e > -1) {
				this.pos = e;
				return true
			}
		},
		skipToPair: function(e, h) {
			var g = 0,
				f;
			var i = this.pos,
				d = this.string.length;
			while (i < d) {
				f = this.string.charAt(i++);
				if (f == e) {
					g++
				} else {
					if (f == h) {
						g--;
						if (g < 1) {
							this.pos = i;
							return true
						}
					}
				}
			}
			return false
		},
		backUp: function(d) {
			this.pos -= d
		},
		match: function(g, e, d) {
			if (typeof g == "string") {
				var h = d ? function(i) {
					return i.toLowerCase()
				} : function(i) {
					return i
				};
				if (h(this.string).indexOf(h(g), this.pos) == this.pos) {
					if (e !== false) {
						this.pos += g.length
					}
					return true
				}
			} else {
				var f = this.string.slice(this.pos).match(g);
				if (f && e !== false) {
					this.pos += f[0].length
				}
				return f
			}
		},
		current: function() {
			return this.string.slice(this.start, this.pos)
		}
	};
	return {
		create: function(d) {
			return new c(d)
		}
	}
});
emmet.define("resources", function(b, k) {
	var m = "system";
	var l = "user";
	var a = {};
	var i = /^<(\w+\:?[\w\-]*)((?:\s+[\w\:\-]+\s*=\s*(['"]).*?\3)*)\s*(\/?)>/;
	var e = {};
	var c = {};
	var j = b("handlerList").create();

	function g(o) {
		var n = b("utils");
		return n.replaceUnescapedSymbol(o, "|", n.getCaretPlaceholder())
	}

	function h(n, p, o) {
		p = g(p);
		if (o == "snippets") {
			return b("elements").create("snippet", p)
		}
		if (o == "abbreviations") {
			return f(n, p)
		}
	}

	function f(o, q) {
		o = b("utils").trim(o);
		var p = b("elements");
		var n;
		if (n = i.exec(q)) {
			return p.create("element", n[1], n[2], n[4] == "/")
		} else {
			return p.create("reference", q)
		}
	}

	function d(n) {
		return n.replace(/:$/, "").replace(/:/g, "-")
	}
	return {
		setVocabulary: function(o, n) {
			a = {};
			if (n == m) {
				e = o
			} else {
				c = o
			}
		},
		getVocabulary: function(n) {
			return n == m ? e : c
		},
		getMatchedResource: function(o, n) {
			return j.exec(null, k.toArray(arguments)) || this.findSnippet(n, o.name())
		},
		getVariable: function(n) {
			return (this.getSection("variables") || {})[n]
		},
		setVariable: function(o, p) {
			var n = this.getVocabulary("user") || {};
			if (!("variables" in n)) {
				n.variables = {}
			}
			n.variables[o] = p;
			this.setVocabulary(n, "user")
		},
		hasSyntax: function(n) {
			return n in this.getVocabulary(l) || n in this.getVocabulary(m)
		},
		addResolver: function(o, n) {
			j.add(o, n)
		},
		removeResolver: function(n) {
			j.remove(n)
		},
		getSection: function(n) {
			if (!n) {
				return null
			}
			if (!(n in a)) {
				a[n] = b("utils").deepMerge({}, e[n], c[n])
			}
			var q = a[n],
				p = k.rest(arguments),
				o;
			while (q && (o = p.shift())) {
				if (o in q) {
					q = q[o]
				} else {
					return null
				}
			}
			return q
		},
		findItem: function(n, p) {
			var o = this.getSection(n);
			while (o) {
				if (p in o) {
					return o[p]
				}
				o = this.getSection(o["extends"])
			}
		},
		findSnippet: function(p, q, o) {
			if (!p || !q) {
				return null
			}
			o = o || [];
			var s = [q];
			if (~q.indexOf("-")) {
				s.push(q.replace(/\-/g, ":"))
			}
			var r = this.getSection(p),
				n = null;
			k.find(["snippets", "abbreviations"], function(t) {
				var u = this.getSection(p, t);
				if (u) {
					return k.find(s, function(v) {
						if (u[v]) {
							return n = h(v, u[v], t)
						}
					})
				}
			}, this);
			o.push(p);
			if (!n && r["extends"] && !k.include(o, r["extends"])) {
				return this.findSnippet(r["extends"], q, o)
			}
			return n
		},
		fuzzyFindSnippet: function(p, q, u) {
			u = u || 0.3;
			var r = this.getAllSnippets(p);
			var t = b("string-score");
			q = d(q);
			var s = k.map(r, function(w, v) {
				return {
					key: v,
					score: t.score(w.nk, q, 0.1)
				}
			});
			var n = k.last(k.sortBy(s, "score"));
			if (n && n.score >= u) {
				var o = n.key;
				return r[o].parsedValue
			}
		},
		getAllSnippets: function(p) {
			var r = "all-" + p;
			if (!a[r]) {
				var n = [],
					s = p;
				var o = [];
				do {
					var q = this.getSection(s);
					if (!q) {
						break
					}
					k.each(["snippets", "abbreviations"], function(t) {
						var u = {};
						k.each(q[t] || null, function(x, w) {
							u[w] = {
								nk: d(w),
								value: x,
								parsedValue: h(w, x, t),
								type: t
							}
						});
						n.push(u)
					});
					o.push(s);
					s = q["extends"]
				} while (s && !k.include(o, s));
				a[r] = k.extend.apply(k, n.reverse())
			}
			return a[r]
		}
	}
});
emmet.define("actions", function(c, b, a) {
	var e = {};

	function d(f) {
		return c("utils").trim(f.charAt(0).toUpperCase() + f.substring(1).replace(/_[a-z]/g, function(g) {
			return " " + g.charAt(1).toUpperCase()
		}))
	}
	return {
		add: function(g, h, f) {
			g = g.toLowerCase();
			f = f || {};
			if (!f.label) {
				f.label = d(g)
			}
			e[g] = {
				name: g,
				fn: h,
				options: f
			}
		},
		get: function(f) {
			return e[f.toLowerCase()]
		},
		run: function(g, f) {
			if (!b.isArray(f)) {
				f = b.rest(arguments)
			}
			var h = this.get(g);
			if (h) {
				return h.fn.apply(emmet, f)
			} else {
				emmet.log('Action "%s" is not defined', g);
				return false
			}
		},
		getAll: function() {
			return e
		},
		getList: function() {
			return b.values(this.getAll())
		},
		getMenu: function(g) {
			var f = [];
			g = g || [];
			b.each(this.getList(), function(l) {
				if (l.options.hidden || b.include(g, l.name)) {
					return
				}
				var i = d(l.name);
				var h = f;
				if (l.options.label) {
					var m = l.options.label.split("/");
					i = m.pop();
					var j, k;
					while (j = m.shift()) {
						k = b.find(h, function(n) {
							return n.type == "submenu" && n.name == j
						});
						if (!k) {
							k = {
								name: j,
								type: "submenu",
								items: []
							};
							h.push(k)
						}
						h = k.items
					}
				}
				h.push({
					type: "action",
					name: l.name,
					label: i
				})
			});
			return f
		},
		getActionNameForMenuTitle: function(h, g) {
			var f = null;
			b.find(g || this.getMenu(), function(i) {
				if (i.type == "action") {
					if (i.label == h || i.name == h) {
						return f = i.name
					}
				} else {
					return f = this.getActionNameForMenuTitle(h, i.items)
				}
			}, this);
			return f || null
		}
	}
});
emmet.define("profile", function(d, c) {
	var a = {};
	var b = {
		tag_case: "asis",
		attr_case: "asis",
		attr_quotes: "double",
		tag_nl: "decide",
		tag_nl_leaf: false,
		place_cursor: true,
		indent: true,
		inline_break: 3,
		self_closing_tag: "xhtml",
		filters: "",
		extraFilters: ""
	};

	function g(i) {
		c.extend(this, b, i)
	}
	g.prototype = {
		tagName: function(i) {
			return h(i, this.tag_case)
		},
		attributeName: function(i) {
			return h(i, this.attr_case)
		},
		attributeQuote: function() {
			return this.attr_quotes == "single" ? "'" : '"'
		},
		selfClosing: function(i) {
			if (this.self_closing_tag == "xhtml") {
				return " /"
			}
			if (this.self_closing_tag === true) {
				return "/"
			}
			return ""
		},
		cursor: function() {
			return this.place_cursor ? d("utils").getCaretPlaceholder() : ""
		}
	};

	function h(j, i) {
		switch (String(i || "").toLowerCase()) {
			case "lower":
				return j.toLowerCase();
			case "upper":
				return j.toUpperCase()
		}
		return j
	}

	function f(j, i) {
		return a[j.toLowerCase()] = new g(i)
	}

	function e() {
		f("xhtml");
		f("html", {
			self_closing_tag: false
		});
		f("xml", {
			self_closing_tag: true,
			tag_nl: true
		});
		f("plain", {
			tag_nl: false,
			indent: false,
			place_cursor: false
		});
		f("line", {
			tag_nl: false,
			indent: false,
			extraFilters: "s"
		})
	}
	e();
	return {
		create: function(j, i) {
			if (arguments.length == 2) {
				return f(j, i)
			} else {
				return new g(c.defaults(j || {}, b))
			}
		},
		get: function(j, i) {
			if (!j && i) {
				var k = d("resources").findItem(i, "profile");
				if (k) {
					j = k
				}
			}
			if (!j) {
				return a.plain
			}
			if (j instanceof g) {
				return j
			}
			if (c.isString(j) && j.toLowerCase() in a) {
				return a[j.toLowerCase()]
			}
			return this.create(j)
		},
		remove: function(i) {
			i = (i || "").toLowerCase();
			if (i in a) {
				delete a[i]
			}
		},
		reset: function() {
			a = {};
			e()
		},
		stringCase: h
	}
});
emmet.define("editorUtils", function(b, a) {
	return {
		isInsideTag: function(f, e) {
			var d = /^<\/?\w[\w\:\-]*.*?>/;
			var g = e;
			while (g > -1) {
				if (f.charAt(g) == "<") {
					break
				}
				g--
			}
			if (g != -1) {
				var c = d.exec(f.substring(g));
				if (c && e > g && e < g + c[0].length) {
					return true
				}
			}
			return false
		},
		outputInfo: function(e, c, d) {
			d = d || e.getProfileName();
			return {
				syntax: String(c || e.getSyntax()),
				profile: d || null,
				content: String(e.getContent())
			}
		},
		unindent: function(c, d) {
			return b("utils").unindentString(d, this.getCurrentLinePadding(c))
		},
		getCurrentLinePadding: function(c) {
			return b("utils").getLinePadding(c.getCurrentLine())
		}
	}
});
emmet.define("actionUtils", function(b, a) {
	return {
		mimeTypes: {
			gif: "image/gif",
			png: "image/png",
			jpg: "image/jpeg",
			jpeg: "image/jpeg",
			svg: "image/svg+xml",
			html: "text/html",
			htm: "text/html"
		},
		extractAbbreviation: function(h) {
			var f = h.length;
			var k = -1;
			var j = 0;
			var g = 0;
			var d = 0;
			var i = b("utils");
			var e = b("abbreviationParser");
			while (true) {
				f--;
				if (f < 0) {
					k = 0;
					break
				}
				var c = h.charAt(f);
				if (c == "]") {
					g++
				} else {
					if (c == "[") {
						if (!g) {
							k = f + 1;
							break
						}
						g--
					} else {
						if (c == "}") {
							d++
						} else {
							if (c == "{") {
								if (!d) {
									k = f + 1;
									break
								}
								d--
							} else {
								if (c == ")") {
									j++
								} else {
									if (c == "(") {
										if (!j) {
											k = f + 1;
											break
										}
										j--
									} else {
										if (g || d) {
											continue
										} else {
											if (!e.isAllowedChar(c) || (c == ">" && i.endsWithTag(h.substring(0, f + 1)))) {
												k = f + 1;
												break
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (k != -1 && !d && !g && !j) {
				return h.substring(k).replace(/^[\*\+\>\^]+/, "")
			} else {
				return ""
			}
		},
		getImageSize: function(j) {
			var f = "\211PNG\r\n\032\n",
				i = "\377\330",
				d = "GIF8",
				c = function() {
					return j.charCodeAt(h++)
				};
			if (j.substr(0, 8) === f) {
				var h = j.indexOf("IHDR") + 4;
				return {
					width: (c() << 24) | (c() << 16) | (c() << 8) | c(),
					height: (c() << 24) | (c() << 16) | (c() << 8) | c()
				}
			} else {
				if (j.substr(0, 4) === d) {
					h = 6;
					return {
						width: c() | (c() << 8),
						height: c() | (c() << 8)
					}
				} else {
					if (j.substr(0, 2) === i) {
						h = 2;
						var e = j.length;
						while (h < e) {
							if (c() != 255) {
								return
							}
							var g = c();
							if (g == 218) {
								break
							}
							var k = (c() << 8) | c();
							if (g >= 192 && g <= 207 && !(g & 4) && !(g & 8)) {
								h += 1;
								return {
									height: (c() << 8) | c(),
									width: (c() << 8) | c()
								}
							} else {
								h += k - 2
							}
						}
					}
				}
			}
		},
		captureContext: function(i) {
			var d = {
				html: 1,
				xml: 1,
				xsl: 1
			};
			var g = String(i.getSyntax());
			if (g in d) {
				var j = String(i.getContent());
				var c = b("htmlMatcher").find(j, i.getCaretPos());
				if (c && c.type == "tag") {
					var h = c.open;
					var f = {
						name: h.name,
						attributes: []
					};
					var e = b("xmlEditTree").parse(h.range.substring(j));
					if (e) {
						f.attributes = a.map(e.getAll(), function(k) {
							return {
								name: k.name(),
								value: k.value()
							}
						})
					}
					return f
				}
			}
			return null
		},
		findExpressionBounds: function(f, e) {
			var g = String(f.getContent());
			var d = g.length;
			var h = f.getCaretPos() - 1;
			var c = h + 1;
			while (h >= 0 && e(g.charAt(h), h, g)) {
				h--
			}
			while (c < d && e(g.charAt(c), c, g)) {
				c++
			}
			if (c > h) {
				return b("range").create([++h, c])
			}
		},
		compoundUpdate: function(c, e) {
			if (e) {
				var d = c.getSelectionRange();
				c.replaceContent(e.data, e.start, e.end, true);
				c.createSelection(e.caret, e.caret + d.end - d.start);
				return true
			}
			return false
		},
		detectSyntax: function(d, e) {
			var c = e || "html";
			if (!b("resources").hasSyntax(c)) {
				c = "html"
			}
			if (c == "html" && (this.isStyle(d) || this.isInlineCSS(d))) {
				c = "css"
			}
			return c
		},
		detectProfile: function(e) {
			var c = e.getSyntax();
			var d = b("resources").findItem(c, "profile");
			if (d) {
				return d
			}
			switch (c) {
				case "xml":
				case "xsl":
					return "xml";
				case "css":
					if (this.isInlineCSS(e)) {
						return "line"
					}
					break;
				case "html":
					var d = b("resources").getVariable("profile");
					if (!d) {
						d = this.isXHTML(e) ? "xhtml" : "html"
					}
					return d
			}
			return "xhtml"
		},
		isXHTML: function(c) {
			return c.getContent().search(/<!DOCTYPE[^>]+XHTML/i) != -1
		},
		isStyle: function(e) {
			var f = String(e.getContent());
			var d = e.getCaretPos();
			var c = b("htmlMatcher").tag(f, d);
			return c && c.open.name.toLowerCase() == "style" && c.innerRange.cmp(d, "lte", "gte")
		},
		isInlineCSS: function(f) {
			var g = String(f.getContent());
			var e = f.getCaretPos();
			var d = b("xmlEditTree").parseFromPosition(g, e, true);
			if (d) {
				var c = d.itemFromPosition(e, true);
				return c && c.name().toLowerCase() == "style" && c.valueRange(true).cmp(e, "lte", "gte")
			}
			return false
		}
	}
});
emmet.define("abbreviationUtils", function(b, a) {
	return {
		isSnippet: function(c) {
			return b("elements").is(c.matchedResource(), "snippet")
		},
		isUnary: function(d) {
			if (d.children.length || d._text || this.isSnippet(d)) {
				return false
			}
			var c = d.matchedResource();
			return c && c.is_empty
		},
		isInline: function(c) {
			return c.isTextNode() || !c.name() || b("tagName").isInlineLevel(c.name())
		},
		isBlock: function(c) {
			return this.isSnippet(c) || !this.isInline(c)
		},
		isSnippet: function(c) {
			return b("elements").is(c.matchedResource(), "snippet")
		},
		hasTagsInContent: function(c) {
			return b("utils").matchesTag(c.content)
		},
		hasBlockChildren: function(c) {
			return (this.hasTagsInContent(c) && this.isBlock(c)) || a.any(c.children, function(d) {
				return this.isBlock(d)
			}, this)
		},
		insertChildContent: function(g, e, d) {
			d = a.extend({
				keepVariable: true,
				appendIfNoChild: true
			}, d || {});
			var f = false;
			var c = b("utils");
			g = c.replaceVariables(g, function(j, i, k) {
				var h = j;
				if (i == "child") {
					h = c.padString(e, c.getLinePaddingFromPosition(g, k.start));
					f = true;
					if (d.keepVariable) {
						h += j
					}
				}
				return h
			});
			if (!f && d.appendIfNoChild) {
				g += e
			}
			return g
		}
	}
});
emmet.define("base64", function(b, a) {
	var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	return {
		encode: function(k) {
			var d = [];
			var s, q, o, r, p, n, m, l, j, g;
			var f = 0,
				h = k.length,
				e = c;
			while (f < h) {
				l = k.charCodeAt(f++);
				j = k.charCodeAt(f++);
				g = k.charCodeAt(f++);
				s = l & 255;
				q = j & 255;
				o = g & 255;
				r = s >> 2;
				p = ((s & 3) << 4) | (q >> 4);
				n = ((q & 15) << 2) | (o >> 6);
				m = o & 63;
				if (isNaN(j)) {
					n = m = 64
				} else {
					if (isNaN(g)) {
						m = 64
					}
				}
				d.push(e.charAt(r) + e.charAt(p) + e.charAt(n) + e.charAt(m))
			}
			return d.join("")
		},
		decode: function(k) {
			var g, e, d, o, n, m, l, q, j = 0,
				r = 0,
				h = [];
			var f = c,
				p = k.length;
			if (!k) {
				return k
			}
			k += "";
			do {
				o = f.indexOf(k.charAt(j++));
				n = f.indexOf(k.charAt(j++));
				m = f.indexOf(k.charAt(j++));
				l = f.indexOf(k.charAt(j++));
				q = o << 18 | n << 12 | m << 6 | l;
				g = q >> 16 & 255;
				e = q >> 8 & 255;
				d = q & 255;
				if (m == 64) {
					h[r++] = String.fromCharCode(g)
				} else {
					if (l == 64) {
						h[r++] = String.fromCharCode(g, e)
					} else {
						h[r++] = String.fromCharCode(g, e, d)
					}
				}
			} while (j < p);
			return h.join("")
		}
	}
});
emmet.define("htmlMatcher", function(c, h) {
	var a = /^<([\w\:\-]+)((?:\s+[\w\-:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
	var i = /^<\/([\w\:\-]+)[^>]*>/;

	function b(l, k) {
		return {
			name: k[1],
			selfClose: !!k[3],
			range: c("range").create(l, k[0]),
			type: "open"
		}
	}

	function g(l, k) {
		return {
			name: k[1],
			range: c("range").create(l, k[0]),
			type: "close"
		}
	}

	function f(l, k) {
		return {
			range: c("range").create(l, h.isNumber(k) ? k - l : k[0]),
			type: "comment"
		}
	}

	function d(n) {
		var l = {},
			k;
		return {
			open: function(p) {
				var o = this.matches(p);
				return o && o.type == "open" ? o : null
			},
			close: function(p) {
				var o = this.matches(p);
				return o && o.type == "close" ? o : null
			},
			matches: function(o) {
				var m = "p" + o;
				if (!(m in l)) {
					if (n.charAt(o) == "<") {
						var p = n.slice(o);
						if (k = p.match(a)) {
							l[m] = b(o, k)
						} else {
							if (k = p.match(i)) {
								l[m] = g(o, k)
							} else {
								l[m] = false
							}
						}
					}
				}
				return l[m]
			},
			text: function() {
				return n
			}
		}
	}

	function e(l, m, k) {
		return l.substring(m, m + k.length) == k
	}

	function j(l, m) {
		var p = [],
			t = null;
		var r = m.text();
		for (var o = l.range.end, n = r.length; o < n; o++) {
			if (e(r, o, "<!--")) {
				for (var k = o; k < n; k++) {
					if (e(r, k, "-->")) {
						o = k + 3;
						break
					}
				}
			}
			if (t = m.matches(o)) {
				if (t.type == "open" && !t.selfClose) {
					p.push(t.name)
				} else {
					if (t.type == "close") {
						if (!p.length) {
							return t.name == l.name ? t : null
						}
						if (h.last(p) == t.name) {
							p.pop()
						} else {
							var s = false;
							while (p.length && !s) {
								var q = p.pop();
								if (q == t.name) {
									s = true
								}
							}
							if (!p.length && !s) {
								return t.name == l.name ? t : null
							}
						}
					}
				}
			}
		}
	}
	return {
		find: function(w, v) {
			var s = c("range");
			var t = d(w);
			var q = null,
				x = null;
			for (var p = v; p >= 0; p--) {
				if (q = t.open(p)) {
					if (q.selfClose) {
						if (q.range.cmp(v, "lt", "gt")) {
							break
						}
						continue
					}
					x = j(q, t);
					if (x) {
						var l = s.create2(q.range.start, x.range.end);
						if (l.contains(v)) {
							break
						}
					} else {
						if (q.range.contains(v)) {
							break
						}
					}
					q = null
				} else {
					if (e(w, p, "-->")) {
						for (var n = p - 1; n >= 0; n--) {
							if (e(w, n, "-->")) {
								break
							} else {
								if (e(w, n, "<!--")) {
									p = n;
									break
								}
							}
						}
					} else {
						if (e(w, p, "<!--")) {
							var n = p + 4,
								o = w.length;
							for (; n < o; n++) {
								if (e(w, n, "-->")) {
									n += 3;
									break
								}
							}
							q = f(p, n);
							break
						}
					}
				}
			}
			if (q) {
				var m = null;
				var k = null;
				if (x) {
					m = s.create2(q.range.start, x.range.end);
					k = s.create2(q.range.end, x.range.start)
				} else {
					m = k = s.create2(q.range.start, q.range.end)
				}
				if (q.type == "comment") {
					var u = m.substring(w);
					k.start += u.length - u.replace(/^<\!--\s*/, "").length;
					k.end -= u.length - u.replace(/\s*-->$/, "").length
				}
				return {
					open: q,
					close: x,
					type: q.type == "comment" ? "comment" : "tag",
					innerRange: k,
					innerContent: function() {
						return this.innerRange.substring(w)
					},
					outerRange: m,
					outerContent: function() {
						return this.outerRange.substring(w)
					},
					range: !k.length() || !k.cmp(v, "lte", "gte") ? m : k,
					content: function() {
						return this.range.substring(w)
					},
					source: w
				}
			}
		},
		tag: function(l, m) {
			var k = this.find(l, m);
			if (k && k.type == "tag") {
				return k
			}
		}
	}
});
emmet.define("tabStops", function(d, c) {
	var e = 100;
	var b = 0;
	var a = {
		replaceCarets: false,
		escape: function(f) {
			return "\\" + f
		},
		tabstop: function(f) {
			return f.token
		},
		variable: function(f) {
			return f.token
		}
	};
	d("abbreviationParser").addOutputProcessor(function(l, i, h) {
		var g = 0;
		var j = d("tabStops");
		var f = d("utils");
		var k = {
			tabstop: function(n) {
				var o = parseInt(n.group);
				if (o == 0) {
					return "${0}"
				}
				if (o > g) {
					g = o
				}
				if (n.placeholder) {
					var m = o + b;
					var p = j.processText(n.placeholder, k);
					return "${" + m + ":" + p + "}"
				} else {
					return "${" + (o + b) + "}"
				}
			}
		};
		l = j.processText(l, k);
		l = f.replaceVariables(l, j.variablesResolver(i));
		b += g + 1;
		return l
	});
	return {
		extract: function(m, k) {
			var h = d("utils");
			var g = {
				carets: ""
			};
			var l = [];
			k = c.extend({}, a, k, {
				tabstop: function(p) {
					var o = p.token;
					var n = "";
					if (p.placeholder == "cursor") {
						l.push({
							start: p.start,
							end: p.start + o.length,
							group: "carets",
							value: ""
						})
					} else {
						if ("placeholder" in p) {
							g[p.group] = p.placeholder
						}
						if (p.group in g) {
							n = g[p.group]
						}
						l.push({
							start: p.start,
							end: p.start + o.length,
							group: p.group,
							value: n
						})
					}
					return o
				}
			});
			if (k.replaceCarets) {
				m = m.replace(new RegExp(h.escapeForRegexp(h.getCaretPlaceholder()), "g"), "${0:cursor}")
			}
			m = this.processText(m, k);
			var j = h.stringBuilder(),
				f = 0;
			var i = c.map(l, function(p) {
				j.append(m.substring(f, p.start));
				var o = j.length;
				var n = g[p.group] || "";
				j.append(n);
				f = p.end;
				return {
					group: p.group,
					start: o,
					end: o + n.length
				}
			});
			j.append(m.substring(f));
			return {
				text: j.toString(),
				tabstops: c.sortBy(i, "start")
			}
		},
		processText: function(l, o) {
			o = c.extend({}, a, o);
			var g = d("utils").stringBuilder();
			var n = d("stringStream").create(l);
			var f, h, j;
			while (f = n.next()) {
				if (f == "\\" && !n.eol()) {
					g.append(o.escape(n.next()));
					continue
				}
				j = f;
				if (f == "$") {
					n.start = n.pos - 1;
					if (h = n.match(/^[0-9]+/)) {
						j = o.tabstop({
							start: g.length,
							group: n.current().substr(1),
							token: n.current()
						})
					} else {
						if (h = n.match(/^\{([a-z_\-][\w\-]*)\}/)) {
							j = o.variable({
								start: g.length,
								name: h[1],
								token: n.current()
							})
						} else {
							if (h = n.match(/^\{([0-9]+)(:.+?)?\}/, false)) {
								n.skipToPair("{", "}");
								var i = {
									start: g.length,
									group: h[1],
									token: n.current()
								};
								var k = i.token.substring(i.group.length + 2, i.token.length - 1);
								if (k) {
									i.placeholder = k.substr(1)
								}
								j = o.tabstop(i)
							}
						}
					}
				}
				g.append(j)
			}
			return g.toString()
		},
		upgrade: function(h, i) {
			var g = 0;
			var f = {
				tabstop: function(j) {
					var k = parseInt(j.group);
					if (k > g) {
						g = k
					}
					if (j.placeholder) {
						return "${" + (k + i) + ":" + j.placeholder + "}"
					} else {
						return "${" + (k + i) + "}"
					}
				}
			};
			c.each(["start", "end", "content"], function(j) {
				h[j] = this.processText(h[j], f)
			}, this);
			return g
		},
		variablesResolver: function(h) {
			var g = {};
			var f = d("resources");
			return function(j, l) {
				if (l == "child") {
					return j
				}
				if (l == "cursor") {
					return d("utils").getCaretPlaceholder()
				}
				var i = h.attribute(l);
				if (!c.isUndefined(i) && i !== j) {
					return i
				}
				var k = f.getVariable(l);
				if (k) {
					return k
				}
				if (!g[l]) {
					g[l] = e++
				}
				return "${" + g[l] + ":" + l + "}"
			}
		},
		resetTabstopIndex: function() {
			b = 0;
			e = 100
		}
	}
});
emmet.define("preferences", function(d, c) {
	var b = {};
	var h = {};
	var e = null;
	var g = null;

	function a(i) {
		if (c.isString(i)) {
			i = i.toLowerCase();
			return i == "yes" || i == "true" || i == "1"
		}
		return !!i
	}

	function f(i) {
		return c.isObject(i) && "value" in i && c.keys(i).length < 3
	}
	return {
		define: function(j, l, k) {
			var i = j;
			if (c.isString(j)) {
				i = {};
				i[j] = {
					value: l,
					description: k
				}
			}
			c.each(i, function(n, m) {
				h[m] = f(n) ? n : {
					value: n
				}
			})
		},
		set: function(j, k) {
			var i = j;
			if (c.isString(j)) {
				i = {};
				i[j] = k
			}
			c.each(i, function(m, l) {
				if (!(l in h)) {
					throw 'Property "' + l + '" is not defined. You should define it first with `define` method of current module'
				}
				if (m !== h[l].value) {
					switch (typeof h[l].value) {
						case "boolean":
							m = a(m);
							break;
						case "number":
							m = parseInt(m + "", 10) || 0;
							break;
						default:
							if (m !== null) {
								m += ""
							}
					}
					b[l] = m
				} else {
					if (l in b) {
						delete b[l]
					}
				}
			})
		},
		get: function(i) {
			if (i in b) {
				return b[i]
			}
			if (i in h) {
				return h[i].value
			}
			return void 0
		},
		getArray: function(i) {
			var j = this.get(i);
			if (c.isUndefined(j) || j === null || j === "") {
				return null
			}
			j = c.map(j.split(","), d("utils").trim);
			if (!j.length) {
				return null
			}
			return j
		},
		getDict: function(j) {
			var i = {};
			c.each(this.getArray(j), function(l) {
				var k = l.split(":");
				i[k[0]] = k[1]
			});
			return i
		},
		description: function(i) {
			return i in h ? h[i].description : void 0
		},
		remove: function(i) {
			if (!c.isArray(i)) {
				i = [i]
			}
			c.each(i, function(j) {
				if (j in b) {
					delete b[j]
				}
				if (j in h) {
					delete h[j]
				}
			})
		},
		list: function() {
			return c.map(c.keys(h).sort(), function(i) {
				return {
					name: i,
					value: this.get(i),
					type: typeof h[i].value,
					description: h[i].description
				}
			}, this)
		},
		load: function(i) {
			c.each(i, function(k, j) {
				this.set(j, k)
			}, this)
		},
		exportModified: function() {
			return c.clone(b)
		},
		reset: function() {
			b = {}
		},
		_startTest: function() {
			e = h;
			g = b;
			h = {};
			b = {}
		},
		_stopTest: function() {
			h = e;
			b = g
		}
	}
});
emmet.define("filters", function(c, b) {
	var e = {};
	var a = "html";

	function d(f) {
		if (!f) {
			return []
		}
		if (b.isString(f)) {
			return f.split(/[\|,]/g)
		}
		return f
	}
	return {
		add: function(f, g) {
			e[f] = g
		},
		apply: function(f, i, h) {
			var g = c("utils");
			h = c("profile").get(h);
			b.each(d(i), function(k) {
				var j = g.trim(k.toLowerCase());
				if (j && j in e) {
					f = e[j](f, h)
				}
			});
			return f
		},
		composeList: function(f, g, i) {
			g = c("profile").get(g);
			var h = d(g.filters || c("resources").findItem(f, "filters") || a);
			if (g.extraFilters) {
				h = h.concat(d(g.extraFilters))
			}
			if (i) {
				h = h.concat(d(i))
			}
			if (!h || !h.length) {
				h = d(a)
			}
			return h
		},
		extractFromAbbreviation: function(f) {
			var g = "";
			f = f.replace(/\|([\w\|\-]+)$/, function(i, h) {
				g = h;
				return ""
			});
			return [f, d(g)]
		}
	}
});
emmet.define("elements", function(d, c) {
	var f = {};
	var b = /([\w\-:]+)\s*=\s*(['"])(.*?)\2/g;
	var a = {
		add: function(h, g) {
			var i = this;
			f[h] = function() {
				var j = g.apply(i, arguments);
				if (j) {
					j.type = h
				}
				return j
			}
		},
		get: function(g) {
			return f[g]
		},
		create: function(i) {
			var h = [].slice.call(arguments, 1);
			var g = this.get(i);
			return g ? g.apply(this, h) : null
		},
		is: function(h, g) {
			return h && h.type === g
		}
	};

	function e(g) {
		return {
			data: g
		}
	}
	a.add("element", function(h, j, k) {
		var i = {
			name: h,
			is_empty: !!k
		};
		if (j) {
			i.attributes = [];
			if (c.isArray(j)) {
				i.attributes = j
			} else {
				if (c.isString(j)) {
					var g;
					while (g = b.exec(j)) {
						i.attributes.push({
							name: g[1],
							value: g[3]
						})
					}
				} else {
					c.each(j, function(m, l) {
						i.attributes.push({
							name: l,
							value: m
						})
					})
				}
			}
		}
		return i
	});
	a.add("snippet", e);
	a.add("reference", e);
	a.add("empty", function() {
		return {}
	});
	return a
});
emmet.define("editTree", function(e, d, b) {
	var c = e("range").create;

	function a(h, g) {
		this.options = d.extend({
			offset: 0
		}, g);
		this.source = h;
		this._children = [];
		this._positions = {
			name: 0
		};
		this.initialize.apply(this, arguments)
	}
	a.extend = b.extend;
	a.prototype = {
		initialize: function() {},
		_updateSource: function(i, l, g) {
			var h = c(l, d.isUndefined(g) ? 0 : g - l);
			var k = i.length - h.length();
			var j = function(m) {
				d.each(m, function(o, n) {
					if (o >= h.end) {
						m[n] += k
					}
				})
			};
			j(this._positions);
			d.each(this.list(), function(m) {
				j(m._positions)
			});
			this.source = e("utils").replaceSubstring(this.source, i, h)
		},
		add: function(g, i, j) {
			var h = new f(g, i);
			this._children.push(h);
			return h
		},
		get: function(g) {
			if (d.isNumber(g)) {
				return this.list()[g]
			}
			if (d.isString(g)) {
				return d.find(this.list(), function(h) {
					return h.name() === g
				})
			}
			return g
		},
		getAll: function(h) {
			if (!d.isArray(h)) {
				h = [h]
			}
			var i = [],
				g = [];
			d.each(h, function(j) {
				if (d.isString(j)) {
					i.push(j)
				} else {
					if (d.isNumber(j)) {
						g.push(j)
					}
				}
			});
			return d.filter(this.list(), function(k, j) {
				return d.include(g, j) || d.include(i, k.name())
			})
		},
		value: function(g, i, j) {
			var h = this.get(g);
			if (h) {
				return h.value(i)
			}
			if (!d.isUndefined(i)) {
				return this.add(g, i, j)
			}
		},
		values: function(g) {
			return d.map(this.getAll(g), function(h) {
				return h.value()
			})
		},
		remove: function(g) {
			var h = this.get(g);
			if (h) {
				this._updateSource("", h.fullRange());
				this._children = d.without(this._children, h)
			}
		},
		list: function() {
			return this._children
		},
		indexOf: function(g) {
			return d.indexOf(this.list(), this.get(g))
		},
		name: function(g) {
			if (!d.isUndefined(g) && this._name !== (g = String(g))) {
				this._updateSource(g, this._positions.name, this._positions.name + this._name.length);
				this._name = g
			}
			return this._name
		},
		nameRange: function(g) {
			return c(this._positions.name + (g ? this.options.offset : 0), this.name())
		},
		range: function(g) {
			return c(g ? this.options.offset : 0, this.toString())
		},
		itemFromPosition: function(h, g) {
			return d.find(this.list(), function(i) {
				return i.range(g).inside(h)
			})
		},
		toString: function() {
			return this.source
		}
	};

	function f(g, h, i) {
		this.parent = g;
		this._name = h.value;
		this._value = i ? i.value : "";
		this._positions = {
			name: h.start,
			value: i ? i.start : -1
		};
		this.initialize.apply(this, arguments)
	}
	f.extend = b.extend;
	f.prototype = {
		initialize: function() {},
		_pos: function(g, h) {
			return g + (h ? this.parent.options.offset : 0)
		},
		value: function(g) {
			if (!d.isUndefined(g) && this._value !== (g = String(g))) {
				this.parent._updateSource(g, this.valueRange());
				this._value = g
			}
			return this._value
		},
		name: function(g) {
			if (!d.isUndefined(g) && this._name !== (g = String(g))) {
				this.parent._updateSource(g, this.nameRange());
				this._name = g
			}
			return this._name
		},
		namePosition: function(g) {
			return this._pos(this._positions.name, g)
		},
		valuePosition: function(g) {
			return this._pos(this._positions.value, g)
		},
		range: function(g) {
			return c(this.namePosition(g), this.toString())
		},
		fullRange: function(g) {
			return this.range(g)
		},
		nameRange: function(g) {
			return c(this.namePosition(g), this.name())
		},
		valueRange: function(g) {
			return c(this.valuePosition(g), this.value())
		},
		toString: function() {
			return this.name() + this.value()
		},
		valueOf: function() {
			return this.toString()
		}
	};
	return {
		EditContainer: a,
		EditElement: f,
		createToken: function(j, h, g) {
			var i = {
				start: j || 0,
				value: h || "",
				type: g
			};
			i.end = i.start + i.value.length;
			return i
		}
	}
});
emmet.define("cssEditTree", function(d, m) {
	var e = {
		styleBefore: "\n\t",
		styleSeparator: ": ",
		offset: 0
	};
	var b = 1;
	var i = 2;

	function f(o, n) {
		return d("range").create(o, n)
	}

	function g(p, n) {
		n = n || (b | i);
		var o = ["white", "line"];
		if ((n & i) == i) {
			while (p.length && m.include(o, m.last(p).type)) {
				p.pop()
			}
		}
		if ((n & b) == b) {
			while (p.length && m.include(o, p[0].type)) {
				p.shift()
			}
		}
		return p
	}

	function j(p) {
		var q = [],
			o;
		var r = p.position(),
			n;
		while (o = p.next()) {
			if (o.type == "{") {
				break
			}
			q.push(o)
		}
		g(q);
		if (q.length) {
			r = q[0].start;
			n = m.last(q).end
		} else {
			n = r
		}
		return f(r, n - r)
	}

	function l(p) {
		var r = ["white", "line", ":"];
		var q = [],
			o, s, n;
		p.nextUntil(function(t) {
			return !m.include(r, this.itemNext().type)
		});
		s = p.current().end;
		while (o = p.next()) {
			if (o.type == "}" || o.type == ";") {
				g(q, b | (o.type == "}" ? i : 0));
				if (q.length) {
					s = q[0].start;
					n = m.last(q).end
				} else {
					n = s
				}
				return f(s, n - s)
			}
			q.push(o)
		}
		if (q.length) {
			return f(q[0].start, m.last(q).end - q[0].start)
		}
	}

	function k(s) {
		var r = d("stringStream").create(s);
		var p;
		var n = [];
		var o = /[\s\u00a0,]/;
		var q = function() {
			r.next();
			n.push(f(r.start, r.current()));
			r.start = r.pos
		};
		r.eatSpace();
		r.start = r.pos;
		while (p = r.next()) {
			if (p == '"' || p == "'") {
				r.next();
				if (!r.skipTo(p)) {
					break
				}
				q()
			} else {
				if (p == "(") {
					r.backUp(1);
					if (!r.skipToPair("(", ")")) {
						break
					}
					r.backUp(1);
					q()
				} else {
					if (o.test(p)) {
						n.push(f(r.start, r.current().length - 1));
						r.eatWhile(o);
						r.start = r.pos
					}
				}
			}
		}
		q();
		return m.chain(n).filter(function(t) {
			return !!t.length()
		}).uniq(false, function(t) {
			return t.toString()
		}).value()
	}

	function c(p) {
		var q = p.tokens;
		for (var o = p._i + 1, n = q.length; o < n; o++) {
			if (q[o].type == ":") {
				return true
			}
			if (q[o].type == "identifier" || q[o].type == "line") {
				return false
			}
		}
		return false
	}
	var h = d("editTree").EditContainer.extend({
		initialize: function(n, v) {
			m.defaults(this.options, e);
			var r = d("editTree");
			var q = d("tokenIterator").create(d("cssParser").parse(n));
			var t = j(q);
			this._positions.name = t.start;
			this._name = t.substring(n);
			if (!q.current() || q.current().type != "{") {
				throw "Invalid CSS rule"
			}
			this._positions.contentStart = q.position() + 1;
			var u, s, o;
			while (o = q.next()) {
				if (o.type == "identifier" && c(q)) {
					u = f(o);
					s = l(q);
					var p = (q.current() && q.current().type == ";") ? f(q.current()) : f(s.end, 0);
					this._children.push(new a(this, r.createToken(u.start, u.substring(n)), r.createToken(s.start, s.substring(n)), r.createToken(p.start, p.substring(n))))
				}
			}
			this._saveStyle()
		},
		_saveStyle: function() {
			var p = this._positions.contentStart;
			var o = this.source;
			var n = d("utils");
			m.each(this.list(), function(r) {
				r.styleBefore = o.substring(p, r.namePosition());
				var q = n.splitByLines(r.styleBefore);
				if (q.length > 1) {
					r.styleBefore = "\n" + m.last(q)
				}
				r.styleSeparator = o.substring(r.nameRange().end, r.valuePosition());
				r.styleBefore = m.last(r.styleBefore.split("*/"));
				r.styleSeparator = r.styleSeparator.replace(/\/\*.*?\*\//g, "");
				p = r.range().end
			})
		},
		add: function(n, v, u) {
			var s = this.list();
			var o = this._positions.contentStart;
			var x = m.pick(this.options, "styleBefore", "styleSeparator");
			var r = d("editTree");
			if (m.isUndefined(u)) {
				u = s.length
			}
			var t = s[u];
			if (t) {
				o = t.fullRange().start
			} else {
				if (t = s[u - 1]) {
					t.end(";");
					o = t.range().end
				}
			}
			if (t) {
				x = m.pick(t, "styleBefore", "styleSeparator")
			}
			var p = r.createToken(o + x.styleBefore.length, n);
			var q = r.createToken(p.end + x.styleSeparator.length, v);
			var w = new a(this, p, q, r.createToken(q.end, ";"));
			m.extend(w, x);
			this._updateSource(w.styleBefore + w.toString(), o);
			this._children.splice(u, 0, w);
			return w
		}
	});
	var a = d("editTree").EditElement.extend({
		initialize: function(q, o, p, n) {
			this.styleBefore = q.options.styleBefore;
			this.styleSeparator = q.options.styleSeparator;
			this._end = n.value;
			this._positions.end = n.start
		},
		valueParts: function(o) {
			var n = k(this.value());
			if (o) {
				var p = this.valuePosition(true);
				m.each(n, function(q) {
					q.shift(p)
				})
			}
			return n
		},
		end: function(n) {
			if (!m.isUndefined(n) && this._end !== n) {
				this.parent._updateSource(n, this._positions.end, this._positions.end + this._end.length);
				this._end = n
			}
			return this._end
		},
		fullRange: function(o) {
			var n = this.range(o);
			n.start -= this.styleBefore.length;
			return n
		},
		toString: function() {
			return this.name() + this.styleSeparator + this.value() + this.end()
		}
	});
	return {
		parse: function(o, n) {
			return new h(o, n)
		},
		parseFromPosition: function(o, q, p) {
			var n = this.extractRule(o, q, p);
			if (!n || !n.inside(q)) {
				return null
			}
			return this.parse(n.substring(o), {
				offset: n.start
			})
		},
		extractRule: function(r, t, u) {
			var w = "";
			var q = r.length;
			var p = t;
			var v = "{}/\\<>\n\r";
			var s = -1,
				n;
			while (p >= 0) {
				n = r.charAt(p);
				if (n == "{") {
					s = p;
					break
				} else {
					if (n == "}" && !u) {
						p++;
						break
					}
				}
				p--
			}
			while (p < q) {
				n = r.charAt(p);
				if (n == "{") {
					s = p
				} else {
					if (n == "}") {
						if (s != -1) {
							w = r.substring(s, p + 1)
						}
						break
					}
				}
				p++
			}
			if (w) {
				p = s - 1;
				var o = "";
				while (p >= 0) {
					n = r.charAt(p);
					if (v.indexOf(n) != -1) {
						break
					}
					p--
				}
				o = r.substring(p + 1, s).replace(/^[\s\n\r]+/m, "");
				return d("range").create(s - o.length, w.length + o.length)
			}
			return null
		},
		baseName: function(n) {
			return n.replace(/^\s*\-\w+\-/, "")
		},
		findParts: k
	}
});
emmet.define("xmlEditTree", function(d, c) {
	var b = {
		styleBefore: " ",
		styleSeparator: "=",
		styleQuote: '"',
		offset: 0
	};
	var e = /^<([\w\:\-]+)((?:\s+[\w\-:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/m;
	var a = d("editTree").EditContainer.extend({
		initialize: function(j, h) {
			c.defaults(this.options, b);
			this._positions.name = 1;
			var i = null;
			var k = d("xmlParser").parse(j);
			var g = d("range");
			c.each(k, function(l) {
				l.value = g.create(l).substring(j);
				switch (l.type) {
					case "tag":
						if (/^<[^\/]+/.test(l.value)) {
							this._name = l.value.substring(1)
						}
						break;
					case "attribute":
						if (i) {
							this._children.push(new f(this, i))
						}
						i = l;
						break;
					case "string":
						this._children.push(new f(this, i, l));
						i = null;
						break
				}
			}, this);
			if (i) {
				this._children.push(new f(this, i))
			}
			this._saveStyle()
		},
		_saveStyle: function() {
			var h = this.nameRange().end;
			var g = this.source;
			c.each(this.list(), function(i) {
				i.styleBefore = g.substring(h, i.namePosition());
				if (i.valuePosition() !== -1) {
					i.styleSeparator = g.substring(i.namePosition() + i.name().length, i.valuePosition() - i.styleQuote.length)
				}
				h = i.range().end
			})
		},
		add: function(g, n, m) {
			var k = this.list();
			var h = this.nameRange().end;
			var j = d("editTree");
			var o = c.pick(this.options, "styleBefore", "styleSeparator", "styleQuote");
			if (c.isUndefined(m)) {
				m = k.length
			}
			var l = k[m];
			if (l) {
				h = l.fullRange().start
			} else {
				if (l = k[m - 1]) {
					h = l.range().end
				}
			}
			if (l) {
				o = c.pick(l, "styleBefore", "styleSeparator", "styleQuote")
			}
			n = o.styleQuote + n + o.styleQuote;
			var i = new f(this, j.createToken(h + o.styleBefore.length, g), j.createToken(h + o.styleBefore.length + g.length + o.styleSeparator.length, n));
			c.extend(i, o);
			this._updateSource(i.styleBefore + i.toString(), h);
			this._children.splice(m, 0, i);
			return i
		}
	});
	var f = d("editTree").EditElement.extend({
		initialize: function(h, j, k) {
			this.styleBefore = h.options.styleBefore;
			this.styleSeparator = h.options.styleSeparator;
			var i = "",
				g = h.options.styleQuote;
			if (k) {
				i = k.value;
				g = i.charAt(0);
				if (g == '"' || g == "'") {
					i = i.substring(1)
				} else {
					g = ""
				}
				if (g && i.charAt(i.length - 1) == g) {
					i = i.substring(0, i.length - 1)
				}
			}
			this.styleQuote = g;
			this._value = i;
			this._positions.value = k ? k.start + g.length : -1
		},
		fullRange: function(h) {
			var g = this.range(h);
			g.start -= this.styleBefore.length;
			return g
		},
		toString: function() {
			return this.name() + this.styleSeparator + this.styleQuote + this.value() + this.styleQuote
		}
	});
	return {
		parse: function(h, g) {
			return new a(h, g)
		},
		parseFromPosition: function(h, j, i) {
			var g = this.extractTag(h, j, i);
			if (!g || !g.inside(j)) {
				return null
			}
			return this.parse(g.substring(h), {
				offset: g.start
			})
		},
		extractTag: function(n, o, p) {
			var m = n.length,
				j;
			var l = d("range");
			var h = Math.min(2000, m);
			var g = null;
			var k = function(q) {
				var i;
				if (n.charAt(q) == "<" && (i = n.substr(q, h).match(e))) {
					return l.create(q, i[0])
				}
			};
			for (j = o; j >= 0; j--) {
				if (g = k(j)) {
					break
				}
			}
			if (g && (g.inside(o) || p)) {
				return g
			}
			if (!g && p) {
				return null
			}
			for (j = o; j < m; j++) {
				if (g = k(j)) {
					return g
				}
			}
		}
	}
});
emmet.define("expandAbbreviation", function(c, b) {
	var a = c("handlerList").create();
	var d = null;
	var e = c("actions");
	e.add("expand_abbreviation", function(i, f, h) {
		var g = b.toArray(arguments);
		var j = c("editorUtils").outputInfo(i, f, h);
		g[1] = j.syntax;
		g[2] = j.profile;
		return a.exec(false, g)
	});
	e.add("expand_abbreviation_with_tab", function(k, i, h) {
		var f = k.getSelection();
		var g = c("resources").getVariable("indentation");
		if (f) {
			var n = c("utils");
			var j = c("range").create(k.getSelectionRange());
			var l = n.padString(f, g);
			k.replaceContent(g + "${0}", k.getCaretPos());
			var m = c("range").create(k.getCaretPos(), j.length());
			k.replaceContent(l, m.start, m.end, true);
			k.createSelection(m.start, m.start + l.length);
			return true
		}
		if (!e.run("expand_abbreviation", k, i, h)) {
			k.replaceContent(g, k.getCaretPos())
		}
		return true
	}, {
		hidden: true
	});
	a.add(function(j, f, i) {
		var h = j.getSelectionRange().end;
		var g = d.findAbbreviation(j);
		if (g) {
			var k = emmet.expandAbbreviation(g, f, i, c("actionUtils").captureContext(j));
			if (k) {
				j.replaceContent(k, h - g.length, h);
				return true
			}
		}
		return false
	}, {
		order: -1
	});
	return d = {
		addHandler: function(g, f) {
			a.add(g, f)
		},
		removeHandler: function(f) {
			a.remove(f, options)
		},
		findAbbreviation: function(h) {
			var g = c("range").create(h.getSelectionRange());
			var i = String(h.getContent());
			if (g.length()) {
				return g.substring(i)
			}
			var f = h.getCurrentLineRange();
			return c("actionUtils").extractAbbreviation(i.substring(f.start, g.start))
		}
	}
});
emmet.define("wrapWithAbbreviation", function(b, a) {
	var c = null;
	b("actions").add("wrap_with_abbreviation", function(j, m, g, f) {
		var e = b("editorUtils").outputInfo(j, g, f);
		var l = b("utils");
		var d = b("editorUtils");
		m = m || j.prompt("Enter abbreviation");
		if (!m) {
			return null
		}
		m = String(m);
		var i = b("range").create(j.getSelectionRange());
		if (!i.length()) {
			var h = b("htmlMatcher").tag(e.content, i.start);
			if (!h) {
				return false
			}
			i = l.narrowToNonSpace(e.content, h.range)
		}
		var k = l.escapeText(i.substring(e.content));
		var n = c.wrap(m, d.unindent(j, k), e.syntax, e.profile, b("actionUtils").captureContext(j));
		if (n) {
			j.replaceContent(n, i.start, i.end);
			return true
		}
		return false
	});
	return c = {
		wrap: function(m, l, g, f, i) {
			var e = b("filters");
			var k = b("utils");
			g = g || emmet.defaultSyntax();
			f = b("profile").get(f, g);
			b("tabStops").resetTabstopIndex();
			var h = e.extractFromAbbreviation(m);
			var j = b("abbreviationParser").parse(h[0], {
				syntax: g,
				pastedContent: l,
				contextNode: i
			});
			if (j) {
				var d = e.composeList(g, f, h[1]);
				e.apply(j, d, f);
				return k.replaceVariables(j.toString())
			}
			return null
		}
	}
});
emmet.exec(function(d, c) {
	function g(j) {
		var i = d("range").create(j.getSelectionRange());
		var k = d("editorUtils").outputInfo(j);
		if (!i.length()) {
			var h = d("htmlMatcher").tag(k.content, j.getCaretPos());
			if (h) {
				i = h.outerRange
			}
		}
		return b(j, "<!--", "-->", i)
	}

	function e(i) {
		var h = d("range").create(i.getSelectionRange());
		var l = d("editorUtils").outputInfo(i);
		if (!h.length()) {
			var k = d("cssEditTree").parseFromPosition(l.content, i.getCaretPos());
			if (k) {
				var j = f(k, i.getCaretPos());
				h = j ? j.range(true) : d("range").create(k.nameRange(true).start, k.source)
			}
		}
		if (!h.length()) {
			h = d("range").create(i.getCurrentLineRange());
			d("utils").narrowToNonSpace(l.content, h)
		}
		return b(i, "/*", "*/", h)
	}

	function f(k, i) {
		var h = i - (k.options.offset || 0);
		var j = /^[\s\n\r]/;
		return c.find(k.list(), function(l) {
			if (l.range().end === h) {
				return j.test(k.source.charAt(h))
			}
			return l.range().inside(h)
		})
	}

	function a(l, o, n, j) {
		var m = -1;
		var k = -1;
		var h = function(p, q) {
			return l.substr(q, p.length) == p
		};
		while (o--) {
			if (h(n, o)) {
				m = o;
				break
			}
		}
		if (m != -1) {
			o = m;
			var i = l.length;
			while (i >= o++) {
				if (h(j, o)) {
					k = o + j.length;
					break
				}
			}
		}
		return (m != -1 && k != -1) ? d("range").create(m, k - m) : null
	}

	function b(k, l, p, j) {
		var h = d("editorUtils");
		var m = h.outputInfo(k).content;
		var i = k.getCaretPos();
		var n = null;
		var o = d("utils");

		function q(s) {
			return s.replace(new RegExp("^" + o.escapeForRegexp(l) + "\\s*"), function(t) {
				i -= t.length;
				return ""
			}).replace(new RegExp("\\s*" + o.escapeForRegexp(p) + "$"), "")
		}
		var r = a(m, i, l, p);
		if (r && r.overlap(j)) {
			j = r;
			n = q(j.substring(m))
		} else {
			n = l + " " + j.substring(m).replace(new RegExp(o.escapeForRegexp(l) + "\\s*|\\s*" + o.escapeForRegexp(p), "g"), "") + " " + p;
			i += l.length + 1
		}
		if (n !== null) {
			n = o.escapeText(n);
			k.setCaretPos(j.start);
			k.replaceContent(h.unindent(k, n), j.start, j.end);
			k.setCaretPos(i);
			return true
		}
		return false
	}
	d("actions").add("toggle_comment", function(j) {
		var k = d("editorUtils").outputInfo(j);
		if (k.syntax == "css") {
			var i = j.getCaretPos();
			var h = d("htmlMatcher").tag(k.content, i);
			if (h && h.open.range.inside(i)) {
				k.syntax = "html"
			}
		}
		if (k.syntax == "css") {
			return e(j)
		}
		return g(j)
	})
});
emmet.exec(function(b, a) {
	function c(l, h, k) {
		h = h || 1;
		k = k || 0;
		var j = l.getCaretPos() + k;
		var m = String(l.getContent());
		var i = m.length;
		var n = -1;
		var e = /^\s+$/;

		function p(q) {
			var s = q;
			while (s >= 0) {
				var r = m.charAt(s);
				if (r == "\n" || r == "\r") {
					break
				}
				s--
			}
			return m.substring(s, q)
		}
		while (j <= i && j >= 0) {
			j += h;
			var f = m.charAt(j);
			var g = m.charAt(j + 1);
			var o = m.charAt(j - 1);
			switch (f) {
				case '"':
				case "'":
					if (g == f && o == "=") {
						n = j + 1
					}
					break;
				case ">":
					if (g == "<") {
						n = j + 1
					}
					break;
				case "\n":
				case "\r":
					if (e.test(p(j - 1))) {
						n = j
					}
					break
			}
			if (n != -1) {
				break
			}
		}
		return n
	}
	var d = b("actions");
	d.add("prev_edit_point", function(g) {
		var f = g.getCaretPos();
		var e = c(g, -1);
		if (e == f) {
			e = c(g, -1, -2)
		}
		if (e != -1) {
			g.setCaretPos(e);
			return true
		}
		return false
	}, {
		label: "Previous Edit Point"
	});
	d.add("next_edit_point", function(f) {
		var e = c(f, 1);
		if (e != -1) {
			f.setCaretPos(e);
			return true
		}
		return false
	})
});
emmet.exec(function(f, r) {
	var m = /^<([\w\:\-]+)((?:\s+[\w\-:]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;

	function h(A, C, D, F) {
		var z = f("range");
		var B = f("editorUtils").outputInfo(A).content;
		var u = B.length;
		var E, t;
		var x = z.create(-1, 0);
		var w = z.create(A.getSelectionRange());
		var v = w.start,
			y = 100000;
		while (v >= 0 && v < u && --y > 0) {
			if ((E = D(B, v, C))) {
				if (x.equal(E)) {
					break
				}
				x = E.clone();
				t = F(E.substring(B), E.start, w.clone());
				if (t) {
					A.createSelection(t.start, t.end);
					return true
				} else {
					v = C ? E.start : E.end - 1
				}
			}
			v += C ? -1 : 1
		}
		return false
	}

	function s(u) {
		var t = true;
		return h(u, false, function(w, v) {
			if (t) {
				t = false;
				return j(w, v)
			} else {
				return d(w, v)
			}
		}, function(v, x, w) {
			return e(v, x, w, false)
		})
	}

	function q(t) {
		return h(t, true, d, function(u, w, v) {
			return e(u, w, v, true)
		})
	}

	function o(t, z, v) {
		v = v || 0;
		var w = f("range");
		var C = [];
		var B = -1,
			A = "",
			x = "",
			y, u;
		r.each(z, function(D) {
			switch (D.type) {
				case "tag":
					u = t.substring(D.start, D.end);
					if (/^<[\w\:\-]/.test(u)) {
						C.push(w.create({
							start: D.start + 1,
							end: D.end
						}))
					}
					break;
				case "attribute":
					B = D.start;
					A = t.substring(D.start, D.end);
					break;
				case "string":
					C.push(w.create(B, D.end - B));
					y = w.create(D);
					x = y.substring(t);
					if (a(x.charAt(0))) {
						y.start++
					}
					if (a(x.charAt(x.length - 1))) {
						y.end--
					}
					C.push(y);
					if (A == "class") {
						C = C.concat(i(y.substring(t), y.start))
					}
					break
			}
		});
		r.each(C, function(D) {
			D.shift(v)
		});
		return r.chain(C).filter(function(D) {
			return !!D.length()
		}).uniq(false, function(D) {
			return D.toString()
		}).value()
	}

	function i(w, y) {
		y = y || 0;
		var t = [];
		var x = f("stringStream").create(w);
		var u = f("range");
		x.eatSpace();
		x.start = x.pos;
		var v;
		while (v = x.next()) {
			if (/[\s\u00a0]/.test(v)) {
				t.push(u.create(x.start + y, x.pos - x.start - 1));
				x.eatSpace();
				x.start = x.pos
			}
		}
		t.push(u.create(x.start + y, x.pos - x.start));
		return t
	}

	function e(t, A, x, z) {
		var w = o(t, f("xmlParser").parse(t), A);
		if (z) {
			w.reverse()
		}
		var y = r.find(w, function(B) {
			return B.equal(x)
		});
		if (y) {
			var v = r.indexOf(w, y);
			if (v < w.length - 1) {
				return w[v + 1]
			}
			return null
		}
		if (z) {
			return r.find(w, function(B) {
				return B.start < x.start
			})
		}
		if (!y) {
			var u = r.filter(w, function(B) {
				return B.inside(x.end)
			});
			if (u.length > 1) {
				return u[1]
			}
		}
		return r.find(w, function(B) {
			return B.end > x.end
		})
	}

	function j(u, v) {
		var t;
		while (v >= 0) {
			if (t = d(u, v)) {
				return t
			}
			v--
		}
		return null
	}

	function d(u, v) {
		var t;
		if (u.charAt(v) == "<" && (t = u.substring(v, u.length).match(m))) {
			return f("range").create(v, t[0])
		}
	}

	function a(t) {
		return t == '"' || t == "'"
	}

	function k(y) {
		var z = y.valueRange(true);
		var t = [y.range(true), z];
		var w = f("stringStream");
		var v = f("cssEditTree");
		var u = f("range");
		var x = y.value();
		r.each(y.valueParts(), function(A) {
			var D = A.clone();
			t.push(D.shift(z.start));
			var C = w.create(A.substring(x));
			if (C.match(/^[\w\-]+\(/, true)) {
				C.start = C.pos;
				C.skipToPair("(", ")");
				var B = C.current();
				t.push(u.create(D.start + C.start, B));
				r.each(v.findParts(B), function(E) {
					t.push(u.create(D.start + C.start + E.start, E.substring(B)))
				})
			}
		});
		return r.chain(t).filter(function(A) {
			return !!A.length()
		}).uniq(false, function(A) {
			return A.toString()
		}).value()
	}

	function n(y, u, z) {
		var B = null;
		var A, D = null,
			t;
		var v = y.list();
		var w, C;
		if (z) {
			v.reverse();
			w = function(E) {
				return E.range(true).start <= u.start
			};
			C = function(E) {
				return E.start < u.start
			}
		} else {
			w = function(E) {
				return E.range(true).end >= u.end
			};
			C = function(E) {
				return E.end > u.start
			}
		}
		while (B = r.find(v, w)) {
			A = k(B);
			if (z) {
				A.reverse()
			}
			D = r.find(A, function(E) {
				return E.equal(u)
			});
			if (!D) {
				var x = r.filter(A, function(E) {
					return E.inside(u.end)
				});
				if (x.length > 1) {
					D = x[1];
					break
				}
				if (D = r.find(A, C)) {
					break
				}
			} else {
				t = r.indexOf(A, D);
				if (t != A.length - 1) {
					D = A[t + 1];
					break
				}
			}
			D = null;
			u.start = u.end = z ? B.range(true).start - 1 : B.range(true).end + 1
		}
		return D
	}

	function b(t) {
		return h(t, false, f("cssEditTree").extractRule, p)
	}

	function l(t) {
		return h(t, true, f("cssEditTree").extractRule, c)
	}

	function p(w, x, u) {
		var t = f("cssEditTree").parse(w, {
			offset: x
		});
		var v = t.nameRange(true);
		if (u.end < v.end) {
			return v
		}
		return n(t, u, false)
	}

	function c(x, y, u) {
		var t = f("cssEditTree").parse(x, {
			offset: y
		});
		var w = n(t, u, true);
		if (!w) {
			var v = t.nameRange(true);
			if (u.start > v.start) {
				return v
			}
		}
		return w
	}
	var g = f("actions");
	g.add("select_next_item", function(t) {
		if (t.getSyntax() == "css") {
			return b(t)
		} else {
			return s(t)
		}
	});
	g.add("select_previous_item", function(t) {
		if (t.getSyntax() == "css") {
			return l(t)
		} else {
			return q(t)
		}
	})
});
emmet.exec(function(c, b) {
	var e = c("actions");
	var d = c("htmlMatcher");
	var f = null;

	function a(h, m) {
		m = String((m || "out").toLowerCase());
		var l = c("editorUtils").outputInfo(h);
		var g = c("range");
		var j = g.create(h.getSelectionRange());
		var i = l.content;
		if (f && !f.range.equal(j)) {
			f = null
		}
		if (f && j.length()) {
			if (m == "in") {
				if (f.type == "tag" && !f.close) {
					return false
				} else {
					if (f.range.equal(f.outerRange)) {
						f.range = f.innerRange
					} else {
						var k = c("utils").narrowToNonSpace(i, f.innerRange);
						f = d.find(i, k.start + 1);
						if (f && f.range.equal(j) && f.outerRange.equal(j)) {
							f.range = f.innerRange
						}
					}
				}
			} else {
				if (!f.innerRange.equal(f.outerRange) && f.range.equal(f.innerRange) && j.equal(f.range)) {
					f.range = f.outerRange
				} else {
					f = d.find(i, j.start);
					if (f && f.range.equal(j) && f.innerRange.equal(j)) {
						f.range = f.outerRange
					}
				}
			}
		} else {
			f = d.find(i, j.start)
		}
		if (f && !f.range.equal(j)) {
			h.createSelection(f.range.start, f.range.end);
			return true
		}
		f = null;
		return false
	}
	e.add("match_pair", a, {
		hidden: true
	});
	e.add("match_pair_inward", function(g) {
		return a(g, "in")
	}, {
		label: "HTML/Match Pair Tag (inward)"
	});
	e.add("match_pair_outward", function(g) {
		return a(g, "out")
	}, {
		label: "HTML/Match Pair Tag (outward)"
	});
	e.add("matching_pair", function(i) {
		var j = String(i.getContent());
		var h = i.getCaretPos();
		if (j.charAt(h) == "<") {
			h++
		}
		var g = d.tag(j, h);
		if (g && g.close) {
			if (g.open.range.inside(h)) {
				i.setCaretPos(g.close.range.start)
			} else {
				i.setCaretPos(g.open.range.start)
			}
			return true
		}
		return false
	}, {
		label: "HTML/Go To Matching Tag Pair"
	})
});
emmet.exec(function(b, a) {
	b("actions").add("remove_tag", function(h) {
		var d = b("utils");
		var j = b("editorUtils").outputInfo(h);
		var c = b("htmlMatcher").tag(j.content, h.getCaretPos());
		if (c) {
			if (!c.close) {
				h.replaceContent(d.getCaretPlaceholder(), c.range.start, c.range.end)
			} else {
				var i = d.narrowToNonSpace(j.content, c.innerRange);
				var e = d.findNewlineBounds(j.content, i.start);
				var g = d.getLinePadding(e.substring(j.content));
				var f = i.substring(j.content);
				f = d.unindentString(f, g);
				h.replaceContent(d.getCaretPlaceholder() + d.escapeText(f), c.outerRange.start, c.outerRange.end)
			}
			return true
		}
		return false
	}, {
		label: "HTML/Remove Tag"
	})
});
emmet.exec(function(c, b) {
	function a(j, i, e) {
		var f = c("utils");
		var h = i.selfClosing() || " /";
		var k = e.open.range.substring(e.source).replace(/\s*>$/, h + ">");
		var g = j.getCaretPos();
		if (k.length + e.outerRange.start < g) {
			g = k.length + e.outerRange.start
		}
		k = f.escapeText(k);
		j.replaceContent(k, e.outerRange.start, e.outerRange.end);
		j.setCaretPos(g);
		return true
	}

	function d(j, g, m) {
		var l = c("utils");
		var e = l.getNewline();
		var f = c("resources").getVariable("indentation");
		var i = j.getCaretPos();
		var h = (g.tag_nl === true) ? e + f + e : "";
		var k = m.outerContent().replace(/\s*\/>$/, ">");
		i = m.outerRange.start + k.length;
		k += h + "</" + m.open.name + ">";
		k = l.escapeText(k);
		j.replaceContent(k, m.outerRange.start, m.outerRange.end);
		j.setCaretPos(i);
		return true
	}
	c("actions").add("split_join_tag", function(h, g) {
		var j = c("htmlMatcher");
		var i = c("editorUtils").outputInfo(h, null, g);
		var f = c("profile").get(i.profile);
		var e = j.tag(i.content, h.getCaretPos());
		if (e) {
			return e.close ? a(h, f, e) : d(h, f, e)
		}
		return false
	}, {
		label: "HTML/Split\\Join Tag Declaration"
	})
});
emmet.define("reflectCSSValue", function(d, c) {
	var b = d("handlerList").create();
	d("actions").add("reflect_css_value", function(h) {
		if (h.getSyntax() != "css") {
			return false
		}
		return d("actionUtils").compoundUpdate(h, a(h))
	}, {
		label: "CSS/Reflect Value"
	});

	function a(m) {
		var k = d("cssEditTree");
		var n = d("editorUtils").outputInfo(m);
		var l = m.getCaretPos();
		var h = k.parseFromPosition(n.content, l);
		if (!h) {
			return
		}
		var p = h.itemFromPosition(l, true);
		if (!p) {
			return
		}
		var o = h.source;
		var j = h.options.offset;
		var i = l - j - p.range().start;
		b.exec(false, [p]);
		if (o !== h.source) {
			return {
				data: h.source,
				start: j,
				end: j + o.length,
				caret: j + p.range().start + i
			}
		}
	}

	function e(i) {
		i = d("cssEditTree").baseName(i);
		var j = "^(?:\\-\\w+\\-)?",
			h;
		if (i == "opacity" || i == "filter") {
			return new RegExp(j + "(?:opacity|filter)$")
		} else {
			if (h = i.match(/^border-radius-(top|bottom)(left|right)/)) {
				return new RegExp(j + "(?:" + i + "|border-" + h[1] + "-" + h[2] + "-radius)$")
			} else {
				if (h = i.match(/^border-(top|bottom)-(left|right)-radius/)) {
					return new RegExp(j + "(?:" + i + "|border-radius-" + h[1] + h[2] + ")$")
				}
			}
		}
		return new RegExp(j + i + "$")
	}

	function g(h, j) {
		var i = f(h.name(), h.value(), j.name(), j.value());
		j.value(i)
	}

	function f(k, n, o, j) {
		var l = d("cssEditTree");
		var i = d("utils");
		k = l.baseName(k);
		o = l.baseName(o);
		if (k == "opacity" && o == "filter") {
			return j.replace(/opacity=[^)]*/i, "opacity=" + Math.floor(parseFloat(n) * 100))
		} else {
			if (k == "filter" && o == "opacity") {
				var h = n.match(/opacity=([^)]*)/i);
				return h ? i.prettifyNumber(parseInt(h[1]) / 100) : j
			}
		}
		return n
	}
	b.add(function(h) {
		var i = e(h.name());
		c.each(h.parent.list(), function(j) {
			if (i.test(j.name())) {
				g(h, j)
			}
		})
	}, {
		order: -1
	});
	return {
		addHandler: function(i, h) {
			b.add(i, h)
		},
		removeHandler: function(h) {
			b.remove(h, options)
		}
	}
});
emmet.exec(function(b, a) {
	b("actions").add("evaluate_math_expression", function(f) {
		var c = b("actionUtils");
		var k = b("utils");
		var h = String(f.getContent());
		var i = ".+-*/\\";
		var d = b("range").create(f.getSelectionRange());
		if (!d.length()) {
			d = c.findExpressionBounds(f, function(e) {
				return k.isNumeric(e) || i.indexOf(e) != -1
			})
		}
		if (d && d.length()) {
			var j = d.substring(h);
			j = j.replace(/([\d\.\-]+)\\([\d\.\-]+)/g, "Math.round($1/$2)");
			try {
				var l = k.prettifyNumber(new Function("return " + j)());
				f.replaceContent(l, d.start, d.end);
				f.setCaretPos(d.start + l.length);
				return true
			} catch (g) {}
		}
		return false
	}, {
		label: "Numbers/Evaluate Math Expression"
	})
});
emmet.exec(function(b, a) {
	function e(m, i) {
		var o = b("utils");
		var h = b("actionUtils");
		var n = false;
		var g = false;
		var f = h.findExpressionBounds(m, function(q, s, r) {
			if (o.isNumeric(q)) {
				return true
			}
			if (q == ".") {
				if (!o.isNumeric(r.charAt(s + 1))) {
					return false
				}
				return g ? false : g = true
			}
			if (q == "-") {
				return n ? false : n = true
			}
			return false
		});
		if (f && f.length()) {
			var p = f.substring(String(m.getContent()));
			var l = parseFloat(p);
			if (!a.isNaN(l)) {
				l = o.prettifyNumber(l + i);
				if (/^(\-?)0+[1-9]/.test(p)) {
					var j = "";
					if (RegExp.$1) {
						j = "-";
						l = l.substring(1)
					}
					var k = l.split(".");
					k[0] = o.zeroPadString(k[0], d(p));
					l = j + k.join(".")
				}
				m.replaceContent(l, f.start, f.end);
				m.createSelection(f.start, f.start + l.length);
				return true
			}
		}
		return false
	}

	function d(f) {
		f = f.replace(/^\-/, "");
		if (~f.indexOf(".")) {
			return f.split(".")[0].length
		}
		return f.length
	}
	var c = b("actions");
	a.each([1, -1, 10, -10, 0.1, -0.1], function(f) {
		var g = f > 0 ? "increment" : "decrement";
		c.add(g + "_number_by_" + String(Math.abs(f)).replace(".", "").substring(0, 2), function(h) {
			return e(h, f)
		}, {
			label: "Numbers/" + g.charAt(0).toUpperCase() + g.substring(1) + " number by " + Math.abs(f)
		})
	})
});
emmet.exec(function(c, b) {
	var d = c("actions");
	var a = c("preferences");
	a.define("css.closeBraceIndentation", "\n", "Indentation before closing brace of CSS rule. Some users prefere indented closing brace of CSS rule for better readability. This preference’s value will be automatically inserted before closing brace when user adds newline in newly created CSS rule (e.g. when “Insert formatted linebreak” action will be performed in CSS file). If you’re such user, you may want to write put a value like <code>\\n\\t</code> in this preference.");
	d.add("insert_formatted_line_break_only", function(n) {
		var s = c("utils");
		var p = c("resources");
		var h = c("editorUtils").outputInfo(n);
		var m = n.getCaretPos();
		var f = s.getNewline();
		if (b.include(["html", "xml", "xsl"], h.syntax)) {
			var j = p.getVariable("indentation");
			var t = c("htmlMatcher").tag(h.content, m);
			if (t && !t.innerRange.length()) {
				n.replaceContent(f + j + s.getCaretPlaceholder() + f, m);
				return true
			}
		} else {
			if (h.syntax == "css") {
				var o = h.content;
				if (m && o.charAt(m - 1) == "{") {
					var g = a.get("css.closeBraceIndentation");
					var j = p.getVariable("indentation");
					var k = o.charAt(m) == "}";
					if (!k) {
						for (var l = m, r = o.length, e; l < r; l++) {
							e = o.charAt(l);
							if (e == "{") {
								break
							}
							if (e == "}") {
								g = "";
								k = true;
								break
							}
						}
					}
					if (!k) {
						g += "}"
					}
					var q = f + j + s.getCaretPlaceholder() + g;
					n.replaceContent(q, m);
					return true
				}
			}
		}
		return false
	}, {
		hidden: true
	});
	d.add("insert_formatted_line_break", function(l) {
		if (!d.run("insert_formatted_line_break_only", l)) {
			var o = c("utils");
			var h = c("editorUtils").getCurrentLinePadding(l);
			var n = String(l.getContent());
			var k = l.getCaretPos();
			var m = n.length;
			var f = o.getNewline();
			var p = l.getCurrentLineRange();
			var g = "";
			for (var j = p.end + 1, e; j < m; j++) {
				e = n.charAt(j);
				if (e == " " || e == "\t") {
					g += e
				} else {
					break
				}
			}
			if (g.length > h.length) {
				l.replaceContent(f + g, k, k, true)
			} else {
				l.replaceContent(f, k)
			}
		}
		return true
	}, {
		hidden: true
	})
});
emmet.exec(function(b, a) {
	b("actions").add("merge_lines", function(h) {
		var g = b("htmlMatcher");
		var k = b("utils");
		var c = b("editorUtils");
		var d = c.outputInfo(h);
		var j = b("range").create(h.getSelectionRange());
		if (!j.length()) {
			var e = g.find(d.content, h.getCaretPos());
			if (e) {
				j = e.outerRange
			}
		}
		if (j.length()) {
			var m = j.substring(d.content);
			var n = k.splitByLines(m);
			for (var f = 1; f < n.length; f++) {
				n[f] = n[f].replace(/^\s+/, "")
			}
			m = n.join("").replace(/\s{2,}/, " ");
			var l = m.length;
			m = k.escapeText(m);
			h.replaceContent(m, j.start, j.end);
			h.createSelection(j.start, j.start + l);
			return true
		}
		return false
	})
});
emmet.exec(function(b, a) {
	b("actions").add("encode_decode_data_url", function(h) {
		var i = String(h.getSelection());
		var g = h.getCaretPos();
		if (!i) {
			var j = String(h.getContent()),
				f;
			while (g-- >= 0) {
				if (e("src=", j, g)) {
					if (f = j.substr(g).match(/^(src=(["'])?)([^'"<>\s]+)\1?/)) {
						i = f[3];
						g += f[1].length
					}
					break
				} else {
					if (e("url(", j, g)) {
						if (f = j.substr(g).match(/^(url\((['"])?)([^'"\)\s]+)\1?/)) {
							i = f[3];
							g += f[1].length
						}
						break
					}
				}
			}
		}
		if (i) {
			if (e("data:", i)) {
				return c(h, i, g)
			} else {
				return d(h, i, g)
			}
		}
		return false
	}, {
		label: "Encode\\Decode data:URL image"
	});

	function e(f, g, h) {
		h = h || 0;
		return g.charAt(h) == f.charAt(0) && g.substr(h, f.length) == f
	}

	function d(i, k, m) {
		var h = b("file");
		var g = b("actionUtils");
		var l = i.getFilePath();
		var j = "application/octet-stream";
		if (l === null) {
			throw "You should save your file before using this action"
		}
		var f = h.locateFile(l, k);
		if (f === null) {
			throw "Can't find " + k + " file"
		}
		h.read(f, function(p, o) {
			if (p) {
				throw "Unable to read " + f + ": " + p
			}
			var n = b("base64").encode(String(o));
			if (!n) {
				throw "Can't encode file content to base64"
			}
			n = "data:" + (g.mimeTypes[String(h.getExt(f))] || j) + ";base64," + n;
			i.replaceContent("$0" + n, m, m + k.length)
		});
		return true
	}

	function c(i, j, k) {
		var h = String(i.prompt("Enter path to file (absolute or relative)"));
		if (!h) {
			return false
		}
		var g = b("file");
		var f = g.createPath(i.getFilePath(), h);
		if (!f) {
			throw "Can't save file"
		}
		g.save(f, b("base64").decode(j.replace(/^data\:.+?;.+?,/, "")));
		i.replaceContent("$0" + h, k, k + j.length);
		return true
	}
});
emmet.exec(function(c, b) {
	function e(g) {
		var i = g.getCaretPos();
		var h = c("editorUtils").outputInfo(g);
		var f = c("xmlEditTree").parseFromPosition(h.content, i, true);
		if (f && (f.name() || "").toLowerCase() == "img") {
			d(g, f.value("src"), function(k) {
				if (k) {
					var j = f.range(true);
					f.value("width", k.width);
					f.value("height", k.height, f.indexOf("width") + 1);
					c("actionUtils").compoundUpdate(g, b.extend(j, {
						data: f.toString(),
						caret: i
					}))
				}
			})
		}
	}

	function a(h) {
		var j = h.getCaretPos();
		var i = c("editorUtils").outputInfo(h);
		var g = c("cssEditTree").parseFromPosition(i.content, j, true);
		if (g) {
			var k = g.itemFromPosition(j, true),
				f;
			if (k && (f = /url\((["']?)(.+?)\1\)/i.exec(k.value() || ""))) {
				d(h, f[2], function(m) {
					if (m) {
						var l = g.range(true);
						g.value("width", m.width + "px");
						g.value("height", m.height + "px", g.indexOf("width") + 1);
						c("actionUtils").compoundUpdate(h, b.extend(l, {
							data: g.toString(),
							caret: j
						}))
					}
				})
			}
		}
	}

	function d(h, j, l) {
		var i;
		var k = c("actionUtils");
		if (j) {
			if (/^data:/.test(j)) {
				i = c("base64").decode(j.replace(/^data\:.+?;.+?,/, ""));
				return l(k.getImageSize(i))
			}
			var g = c("file");
			var f = g.locateFile(h.getFilePath(), j);
			if (f === null) {
				throw "Can't find " + j + " file"
			}
			g.read(f, function(n, m) {
				if (n) {
					throw "Unable to read " + f + ": " + n
				}
				m = String(m);
				l(k.getImageSize(m))
			})
		}
	}
	c("actions").add("update_image_size", function(f) {
		if (b.include(["css", "less", "scss"], String(f.getSyntax()))) {
			a(f)
		} else {
			e(f)
		}
		return true
	})
});
emmet.define("cssResolver", function(o, A) {
	var b = null;
	var f = {
		prefix: "emmet",
		obsolete: false,
		transformName: function(B) {
			return "-" + this.prefix + "-" + B
		},
		properties: function() {
			return q("css." + this.prefix + "Properties") || []
		},
		supports: function(B) {
			return A.include(this.properties(), B)
		}
	};
	var p = {};
	var t = "${1};";
	var h = o("preferences");
	h.define("css.valueSeparator", ": ", "Defines a symbol that should be placed between CSS property and value when expanding CSS abbreviations.");
	h.define("css.propertyEnd", ";", "Defines a symbol that should be placed at the end of CSS property  when expanding CSS abbreviations.");
	h.define("stylus.valueSeparator", " ", "Defines a symbol that should be placed between CSS property and value when expanding CSS abbreviations in Stylus dialect.");
	h.define("stylus.propertyEnd", "", "Defines a symbol that should be placed at the end of CSS property  when expanding CSS abbreviations in Stylus dialect.");
	h.define("sass.propertyEnd", "", "Defines a symbol that should be placed at the end of CSS property  when expanding CSS abbreviations in SASS dialect.");
	h.define("css.autoInsertVendorPrefixes", true, "Automatically generate vendor-prefixed copies of expanded CSS property. By default, Emmet will generate vendor-prefixed properties only when you put dash before abbreviation (e.g. <code>-bxsh</code>). With this option enabled, you don’t need dashes before abbreviations: Emmet will produce vendor-prefixed properties for you.");
	var u = A.template("A comma-separated list of CSS properties that may have <code><%= vendor %></code> vendor prefix. This list is used to generate a list of prefixed properties when expanding <code>-property</code> abbreviations. Empty list means that all possible CSS values may have <code><%= vendor %></code> prefix.");
	var e = A.template("A comma-separated list of <em>additional</em> CSS properties for <code>css.<%= vendor %>Preperties</code> preference. You should use this list if you want to add or remove a few CSS properties to original set. To add a new property, simply write its name, to remove it, precede property with hyphen.<br>For example, to add <em>foo</em> property and remove <em>border-radius</em> one, the preference value will look like this: <code>foo, -border-radius</code>.");
	var d = {
		webkit: "animation, animation-delay, animation-direction, animation-duration, animation-fill-mode, animation-iteration-count, animation-name, animation-play-state, animation-timing-function, appearance, backface-visibility, background-clip, background-composite, background-origin, background-size, border-fit, border-horizontal-spacing, border-image, border-vertical-spacing, box-align, box-direction, box-flex, box-flex-group, box-lines, box-ordinal-group, box-orient, box-pack, box-reflect, box-shadow, color-correction, column-break-after, column-break-before, column-break-inside, column-count, column-gap, column-rule-color, column-rule-style, column-rule-width, column-span, column-width, dashboard-region, font-smoothing, highlight, hyphenate-character, hyphenate-limit-after, hyphenate-limit-before, hyphens, line-box-contain, line-break, line-clamp, locale, margin-before-collapse, margin-after-collapse, marquee-direction, marquee-increment, marquee-repetition, marquee-style, mask-attachment, mask-box-image, mask-box-image-outset, mask-box-image-repeat, mask-box-image-slice, mask-box-image-source, mask-box-image-width, mask-clip, mask-composite, mask-image, mask-origin, mask-position, mask-repeat, mask-size, nbsp-mode, perspective, perspective-origin, rtl-ordering, text-combine, text-decorations-in-effect, text-emphasis-color, text-emphasis-position, text-emphasis-style, text-fill-color, text-orientation, text-security, text-stroke-color, text-stroke-width, transform, transition, transform-origin, transform-style, transition-delay, transition-duration, transition-property, transition-timing-function, user-drag, user-modify, user-select, writing-mode, svg-shadow, box-sizing, border-radius",
		moz: "animation-delay, animation-direction, animation-duration, animation-fill-mode, animation-iteration-count, animation-name, animation-play-state, animation-timing-function, appearance, backface-visibility, background-inline-policy, binding, border-bottom-colors, border-image, border-left-colors, border-right-colors, border-top-colors, box-align, box-direction, box-flex, box-ordinal-group, box-orient, box-pack, box-shadow, box-sizing, column-count, column-gap, column-rule-color, column-rule-style, column-rule-width, column-width, float-edge, font-feature-settings, font-language-override, force-broken-image-icon, hyphens, image-region, orient, outline-radius-bottomleft, outline-radius-bottomright, outline-radius-topleft, outline-radius-topright, perspective, perspective-origin, stack-sizing, tab-size, text-blink, text-decoration-color, text-decoration-line, text-decoration-style, text-size-adjust, transform, transform-origin, transform-style, transition, transition-delay, transition-duration, transition-property, transition-timing-function, user-focus, user-input, user-modify, user-select, window-shadow, background-clip, border-radius",
		ms: "accelerator, backface-visibility, background-position-x, background-position-y, behavior, block-progression, box-align, box-direction, box-flex, box-line-progression, box-lines, box-ordinal-group, box-orient, box-pack, content-zoom-boundary, content-zoom-boundary-max, content-zoom-boundary-min, content-zoom-chaining, content-zoom-snap, content-zoom-snap-points, content-zoom-snap-type, content-zooming, filter, flow-from, flow-into, font-feature-settings, grid-column, grid-column-align, grid-column-span, grid-columns, grid-layer, grid-row, grid-row-align, grid-row-span, grid-rows, high-contrast-adjust, hyphenate-limit-chars, hyphenate-limit-lines, hyphenate-limit-zone, hyphens, ime-mode, interpolation-mode, layout-flow, layout-grid, layout-grid-char, layout-grid-line, layout-grid-mode, layout-grid-type, line-break, overflow-style, perspective, perspective-origin, perspective-origin-x, perspective-origin-y, scroll-boundary, scroll-boundary-bottom, scroll-boundary-left, scroll-boundary-right, scroll-boundary-top, scroll-chaining, scroll-rails, scroll-snap-points-x, scroll-snap-points-y, scroll-snap-type, scroll-snap-x, scroll-snap-y, scrollbar-arrow-color, scrollbar-base-color, scrollbar-darkshadow-color, scrollbar-face-color, scrollbar-highlight-color, scrollbar-shadow-color, scrollbar-track-color, text-align-last, text-autospace, text-justify, text-kashida-space, text-overflow, text-size-adjust, text-underline-position, touch-action, transform, transform-origin, transform-origin-x, transform-origin-y, transform-origin-z, transform-style, transition, transition-delay, transition-duration, transition-property, transition-timing-function, user-select, word-break, word-wrap, wrap-flow, wrap-margin, wrap-through, writing-mode",
		o: "dashboard-region, animation, animation-delay, animation-direction, animation-duration, animation-fill-mode, animation-iteration-count, animation-name, animation-play-state, animation-timing-function, border-image, link, link-source, object-fit, object-position, tab-size, table-baseline, transform, transform-origin, transition, transition-delay, transition-duration, transition-property, transition-timing-function, accesskey, input-format, input-required, marquee-dir, marquee-loop, marquee-speed, marquee-style"
	};
	A.each(d, function(C, B) {
		h.define("css." + B + "Properties", C, u({
			vendor: B
		}));
		h.define("css." + B + "PropertiesAddon", "", e({
			vendor: B
		}))
	});
	h.define("css.unitlessProperties", "z-index, line-height, opacity, font-weight, zoom", "The list of properties whose values ​​must not contain units.");
	h.define("css.intUnit", "px", "Default unit for integer values");
	h.define("css.floatUnit", "em", "Default unit for float values");
	h.define("css.keywords", "auto, inherit", "A comma-separated list of valid keywords that can be used in CSS abbreviations.");
	h.define("css.keywordAliases", "a:auto, i:inherit, s:solid, da:dashed, do:dotted, t:transparent", "A comma-separated list of keyword aliases, used in CSS abbreviation. Each alias should be defined as <code>alias:keyword_name</code>.");
	h.define("css.unitAliases", "e:em, p:%, x:ex, r:rem", "A comma-separated list of unit aliases, used in CSS abbreviation. Each alias should be defined as <code>alias:unit_value</code>.");
	h.define("css.color.short", true, "Should color values like <code>#ffffff</code> be shortened to <code>#fff</code> after abbreviation with color was expanded.");
	h.define("css.color.case", "keep", "Letter case of color values generated by abbreviations with color (like <code>c#0</code>). Possible values are <code>upper</code>, <code>lower</code> and <code>keep</code>.");
	h.define("css.fuzzySearch", true, "Enable fuzzy search among CSS snippet names. When enabled, every <em>unknown</em> snippet will be scored against available snippet names (not values or CSS properties!). The match with best score will be used to resolve snippet value. For example, with this preference enabled, the following abbreviations are equal: <code>ov:h</code> == <code>ov-h</code> == <code>o-h</code> == <code>oh</code>");
	h.define("css.fuzzySearchMinScore", 0.3, "The minium score (from 0 to 1) that fuzzy-matched abbreviation should achive. Lower values may produce many false-positive matches, higher values may reduce possible matches.");
	h.define("css.alignVendor", false, "If set to <code>true</code>, all generated vendor-prefixed properties will be aligned by real property name.");

	function v(B) {
		var C = B && B.charCodeAt(0);
		return (B && B == "." || (C > 47 && C < 58))
	}

	function y(C) {
		var B = o("utils");
		C = B.trim(C);
		if (~C.indexOf("/*") || /[\n\r]/.test(C)) {
			return false
		}
		if (!/^[a-z0-9\-]+\s*\:/i.test(C)) {
			return false
		}
		C = o("tabStops").processText(C, {
			replaceCarets: true,
			tabstop: function() {
				return "value"
			}
		});
		return C.split(":").length == 2
	}

	function n(B) {
		if (B.charAt(0) == "-" && !/^\-[\.\d]/.test(B)) {
			B = B.replace(/^\-+/, "")
		}
		if (B.charAt(0) == "#") {
			return i(B)
		}
		return r(B)
	}

	function i(E) {
		var C = E.replace(/^#+/, "") || "0";
		if (C.toLowerCase() == "t") {
			return "transparent"
		}
		var D = o("utils").repeatString;
		var B = null;
		switch (C.length) {
			case 1:
				B = D(C, 6);
				break;
			case 2:
				B = D(C, 3);
				break;
			case 3:
				B = C.charAt(0) + C.charAt(0) + C.charAt(1) + C.charAt(1) + C.charAt(2) + C.charAt(2);
				break;
			case 4:
				B = C + C.substr(0, 2);
				break;
			case 5:
				B = C + C.charAt(0);
				break;
			default:
				B = C.substr(0, 6)
		}
		if (h.get("css.color.short")) {
			var F = B.split("");
			if (F[0] == F[1] && F[2] == F[3] && F[4] == F[5]) {
				B = F[0] + F[2] + F[4]
			}
		}
		switch (h.get("css.color.case")) {
			case "upper":
				B = B.toUpperCase();
				break;
			case "lower":
				B = B.toLowerCase();
				break
		}
		return "#" + B
	}

	function r(C) {
		var B = h.getDict("css.keywordAliases");
		return C in B ? B[C] : C
	}

	function a(C) {
		var B = h.getDict("css.unitAliases");
		return C in B ? B[C] : C
	}

	function k(B) {
		return A.include(h.getArray("css.keywords"), r(B))
	}

	function g(C, B) {
		var D = p[B];
		if (!D) {
			D = A.find(p, function(E) {
				return E.prefix == B
			})
		}
		return D && D.supports(C)
	}

	function s(D, C) {
		var B = [];
		A.each(p, function(F, E) {
			if (g(D, E)) {
				B.push(E)
			}
		});
		if (!B.length && !C) {
			A.each(p, function(F, E) {
				if (!F.obsolete) {
					B.push(E)
				}
			})
		}
		return B
	}

	function m(B, C) {
		if (A.isString(C)) {
			C = {
				prefix: C
			}
		}
		p[B] = A.extend({}, f, C)
	}

	function l(C, B) {
		if (B) {
			var D = h.get(B + "." + C);
			if (!A.isUndefined(D)) {
				return D
			}
		}
		return h.get("css." + C)
	}

	function c(D, C) {
		var B = D.indexOf(":");
		D = D.substring(0, B).replace(/\s+$/, "") + l("valueSeparator", C) + o("utils").trim(D.substring(B + 1));
		return D.replace(/\s*;\s*$/, l("propertyEnd", C))
	}

	function w(D, C, B) {
		if (!A.isString(D)) {
			D = D.data
		}
		if (!y(D)) {
			return D
		}
		if (C) {
			if (~D.indexOf(";")) {
				D = D.split(";").join(" !important;")
			} else {
				D += " !important"
			}
		}
		return c(D, B)
	}

	function z(C) {
		var B = A.map((C || "").split(","), o("utils").trim);
		return B.length ? B : null
	}

	function q(B) {
		var C = h.getArray(B);
		A.each(h.getArray(B + "Addon"), function(D) {
			if (D.charAt(0) == "-") {
				C = A.without(C, D.substr(1))
			} else {
				if (D.charAt(0) == "+") {
					D = D.substr(1)
				}
				C.push(D)
			}
		});
		return C
	}
	m("w", {
		prefix: "webkit"
	});
	m("m", {
		prefix: "moz"
	});
	m("s", {
		prefix: "ms"
	});
	m("o", {
		prefix: "o"
	});
	var x = ["css", "less", "sass", "scss", "stylus"];
	o("resources").addResolver(function(C, B) {
		if (A.include(x, B) && C.isElement()) {
			return b.expandToSnippet(C.abbreviation, B)
		}
		return null
	});
	var j = o("expandAbbreviation");
	j.addHandler(function(G, C, F) {
		if (!A.include(x, C)) {
			return false
		}
		var E = G.getSelectionRange().end;
		var D = j.findAbbreviation(G);
		if (D) {
			var H = emmet.expandAbbreviation(D, C, F);
			if (H) {
				var B = E - D.length;
				var I = E;
				if (G.getContent().charAt(E) == ";" && H.charAt(H.length - 1) == ";") {
					I++
				}
				G.replaceContent(H, B, I);
				return true
			}
		}
		return false
	});
	return b = {
		addPrefix: m,
		supportsPrefix: g,
		prefixed: function(C, B) {
			return g(C, B) ? "-" + B + "-" + C : C
		},
		listPrefixes: function() {
			return A.map(p, function(B) {
				return B.prefix
			})
		},
		getPrefix: function(B) {
			return p[B]
		},
		removePrefix: function(B) {
			if (B in p) {
				delete p[B]
			}
		},
		extractPrefixes: function(C) {
			if (C.charAt(0) != "-") {
				return {
					property: C,
					prefixes: null
				}
			}
			var D = 1,
				B = C.length,
				E;
			var F = [];
			while (D < B) {
				E = C.charAt(D);
				if (E == "-") {
					D++;
					break
				}
				if (E in p) {
					F.push(E)
				} else {
					F.length = 0;
					D = 1;
					break
				}
				D++
			}
			if (D == B - 1) {
				D = 1;
				F.length = 1
			}
			return {
				property: C.substring(D),
				prefixes: F.length ? F : "all"
			}
		},
		findValuesInAbbreviation: function(K, C) {
			C = C || "css";
			var E = 0,
				H = K.length,
				I = "",
				B;
			while (E < H) {
				B = K.charAt(E);
				if (v(B) || B == "#" || (B == "-" && v(K.charAt(E + 1)))) {
					I = K.substring(E);
					break
				}
				E++
			}
			var J = K.substring(0, K.length - I.length);
			var G = o("resources");
			var F = [];
			while (~J.indexOf("-") && !G.findSnippet(C, J)) {
				var D = J.split("-");
				var L = D.pop();
				if (!k(L)) {
					break
				}
				F.unshift(L);
				J = D.join("-")
			}
			return F.join("-") + I
		},
		parseValues: function(E) {
			var D = o("stringStream").create(E);
			var B = [];
			var C = null;
			while (C = D.next()) {
				if (C == "#") {
					D.match(/^t|[0-9a-f]+/i, true);
					B.push(D.current())
				} else {
					if (C == "-") {
						if (k(A.last(B)) || (D.start && v(E.charAt(D.start - 1)))) {
							D.start = D.pos
						}
						D.match(/^\-?[0-9]*(\.[0-9]+)?[a-z%\.]*/, true);
						B.push(D.current())
					} else {
						D.match(/^[0-9]*(\.[0-9]*)?[a-z%]*/, true);
						B.push(D.current())
					}
				}
				D.start = D.pos
			}
			return A.map(A.compact(B), n)
		},
		extractValues: function(C) {
			var B = this.findValuesInAbbreviation(C);
			if (!B) {
				return {
					property: C,
					values: null
				}
			}
			return {
				property: C.substring(0, C.length - B.length).replace(/-$/, ""),
				values: this.parseValues(B)
			}
		},
		normalizeValue: function(D, C) {
			C = (C || "").toLowerCase();
			var B = h.getArray("css.unitlessProperties");
			return D.replace(/^(\-?[0-9\.]+)([a-z]*)$/, function(G, F, E) {
				if (!E && (F == "0" || A.include(B, C))) {
					return F
				}
				if (!E) {
					return F.replace(/\.$/, "") + h.get(~F.indexOf(".") ? "css.floatUnit" : "css.intUnit")
				}
				return F + a(E)
			})
		},
		expand: function(P, O, I) {
			I = I || "css";
			var G = o("resources");
			var F = h.get("css.autoInsertVendorPrefixes");
			var H;
			if (H = /^(.+)\!$/.test(P)) {
				P = RegExp.$1
			}
			var C = G.findSnippet(I, P);
			if (C && !F) {
				return w(C, H, I)
			}
			var D = this.extractPrefixes(P);
			var E = this.extractValues(D.property);
			var M = A.extend(D, E);
			if (!C) {
				C = G.findSnippet(I, M.property)
			} else {
				M.values = null
			}
			if (!C && h.get("css.fuzzySearch")) {
				C = G.fuzzyFindSnippet(I, M.property, parseFloat(h.get("css.fuzzySearchMinScore")))
			}
			if (!C) {
				C = M.property + ":" + t
			} else {
				if (!A.isString(C)) {
					C = C.data
				}
			}
			if (!y(C)) {
				return C
			}
			var K = this.splitSnippet(C);
			var Q = [];
			if (!O && M.values) {
				O = A.map(M.values, function(R) {
					return this.normalizeValue(R, K.name)
				}, this).join(" ") + ";"
			}
			K.value = O || K.value;
			var J = M.prefixes == "all" || (!M.prefixes && F) ? s(K.name, F && M.prefixes != "all") : M.prefixes;
			var N = [],
				L;
			A.each(J, function(R) {
				if (R in p) {
					L = p[R].transformName(K.name);
					N.push(L);
					Q.push(w(L + ":" + K.value, H, I))
				}
			});
			Q.push(w(K.name + ":" + K.value, H, I));
			N.push(K.name);
			if (h.get("css.alignVendor")) {
				var B = o("utils").getStringsPads(N);
				Q = A.map(Q, function(S, R) {
					return B[R] + S
				})
			}
			return Q
		},
		expandToSnippet: function(C, B) {
			var D = this.expand(C, null, B);
			if (A.isArray(D)) {
				return D.join("\n")
			}
			if (!A.isString(D)) {
				return D.data
			}
			return String(D)
		},
		splitSnippet: function(C) {
			var B = o("utils");
			C = B.trim(C);
			if (C.indexOf(":") == -1) {
				return {
					name: C,
					value: t
				}
			}
			var D = C.split(":");
			return {
				name: B.trim(D.shift()),
				value: B.trim(D.join(":")).replace(/^(\$\{0\}|\$0)(\s*;?)$/, "${1}$2")
			}
		},
		getSyntaxPreference: l,
		transformSnippet: w
	}
});
emmet.define("cssGradient", function(i, u) {
	var p = ["top", "to bottom", "0deg"];
	var c = null;
	var s = ["css", "less", "sass", "scss", "stylus", "styl"];
	var e = /\d+deg/i;
	var g = /top|bottom|left|right/i;
	var f = i("preferences");
	f.define("css.gradient.prefixes", "webkit, moz, o", "A comma-separated list of vendor-prefixes for which values should be generated.");
	f.define("css.gradient.oldWebkit", true, "Generate gradient definition for old Webkit implementations");
	f.define("css.gradient.omitDefaultDirection", true, "Do not output default direction definition in generated gradients.");
	f.define("css.gradient.defaultProperty", "background-image", "When gradient expanded outside CSS value context, it will produce properties with this name.");
	f.define("css.gradient.fallback", false, "With this option enabled, CSS gradient generator will produce <code>background-color</code> property with gradient first color as fallback for old browsers.");

	function k(v) {
		return i("utils").trim(v).replace(/\s+/g, " ")
	}

	function m(y) {
		var x = p[0];
		var z = i("stringStream").create(i("utils").trim(y));
		var v = [],
			w;
		while (w = z.next()) {
			if (z.peek() == ",") {
				v.push(z.current());
				z.next();
				z.eatSpace();
				z.start = z.pos
			} else {
				if (w == "(") {
					z.skipTo(")")
				}
			}
		}
		v.push(z.current());
		v = u.compact(u.map(v, k));
		if (!v.length) {
			return null
		}
		if (e.test(v[0]) || g.test(v[0])) {
			x = v.shift()
		}
		return {
			type: "linear",
			direction: x,
			colorStops: u.map(v, q)
		}
	}

	function q(w) {
		w = k(w);
		var x = null;
		w = w.replace(/^(\w+\(.+?\))\s*/, function(z, A) {
			x = A;
			return ""
		});
		if (!x) {
			var y = w.split(" ");
			x = y[0];
			w = y[1] || ""
		}
		var v = {
			color: x
		};
		if (w) {
			w.replace(/^(\-?[\d\.]+)([a-z%]+)?$/, function(A, B, z) {
				v.position = B;
				if (~B.indexOf(".")) {
					z = ""
				} else {
					if (!z) {
						z = "%"
					}
				}
				if (z) {
					v.unit = z
				}
			})
		}
		return v
	}

	function j(x, v) {
		var y = i("resources");
		var w = i("preferences");
		var z = y.findSnippet(v, x);
		if (!z && w.get("css.fuzzySearch")) {
			z = y.fuzzyFindSnippet(v, x, parseFloat(w.get("css.fuzzySearchMinScore")))
		}
		if (z) {
			if (!u.isString(z)) {
				z = z.data
			}
			return i("cssResolver").splitSnippet(z).name
		}
	}

	function l(v) {
		var w = 0;
		u.each(v, function(y, x) {
			if (!x) {
				return y.position = y.position || 0
			}
			if (x == v.length - 1 && !("position" in y)) {
				y.position = 1
			}
			if ("position" in y) {
				var A = v[w].position || 0;
				var z = (y.position - A) / (x - w);
				u.each(v.slice(w, x), function(C, B) {
					C.position = A + z * B
				});
				w = x
			}
		})
	}

	function n(v) {
		var w = parseFloat(v);
		if (!u.isNaN(w)) {
			switch (w % 360) {
				case 0:
					return "left";
				case 90:
					return "bottom";
				case 180:
					return "right";
				case 240:
					return "top"
			}
		}
		return v
	}

	function d(x) {
		x = n(x);
		if (e.test(x)) {
			throw "The direction is an angle that can’t be converted."
		}
		var w = function(v) {
			return ~x.indexOf(v) ? "100%" : "0"
		};
		return w("right") + " " + w("bottom") + ", " + w("left") + " " + w("top")
	}

	function t(v) {
		var w = f.getArray("css.gradient.prefixes");
		var x = w ? u.map(w, function(y) {
			return "-" + y + "-" + v
		}) : [];
		x.push(v);
		return x
	}

	function b(y, v) {
		var x = [];
		var w = i("cssResolver");
		if (f.get("css.gradient.fallback") && ~v.toLowerCase().indexOf("background")) {
			x.push({
				name: "background-color",
				value: "${1:" + y.colorStops[0].color + "}"
			})
		}
		u.each(f.getArray("css.gradient.prefixes"), function(A) {
			var z = w.prefixed(v, A);
			if (A == "webkit" && f.get("css.gradient.oldWebkit")) {
				try {
					x.push({
						name: z,
						value: c.oldWebkitLinearGradient(y)
					})
				} catch (B) {}
			}
			x.push({
				name: z,
				value: c.toString(y, A)
			})
		});
		return x.sort(function(A, z) {
			return z.name.length - A.name.length
		})
	}

	function h(J, D, z) {
		var C = J.parent;
		var G = i("utils");
		var y = i("preferences").get("css.alignVendor");
		var K = J.styleSeparator;
		var E = J.styleBefore;
		u.each(C.getAll(t(J.name())), function(L) {
			if (L != J && /gradient/i.test(L.value())) {
				if (L.styleSeparator.length < K.length) {
					K = L.styleSeparator
				}
				if (L.styleBefore.length < E.length) {
					E = L.styleBefore
				}
				C.remove(L)
			}
		});
		if (y) {
			if (E != J.styleBefore) {
				var v = J.fullRange();
				C._updateSource(E, v.start, v.start + J.styleBefore.length);
				J.styleBefore = E
			}
			if (K != J.styleSeparator) {
				C._updateSource(K, J.nameRange().end, J.valueRange().start);
				J.styleSeparator = K
			}
		}
		var F = J.value();
		if (!z) {
			z = i("range").create(0, J.value())
		}
		var w = function(L) {
			return G.replaceSubstring(F, L, z)
		};
		J.value(w(c.toString(D)) + "${2}");
		var x = b(D, J.name());
		if (y) {
			var I = u.pluck(x, "value");
			var A = u.pluck(x, "name");
			I.push(J.value());
			A.push(J.name());
			var B = G.getStringsPads(u.map(I, function(L) {
				return L.substring(0, L.indexOf("("))
			}));
			var H = G.getStringsPads(A);
			J.name(u.last(H) + J.name());
			u.each(x, function(M, L) {
				M.name = H[L] + M.name;
				M.value = B[L] + M.value
			});
			J.value(u.last(B) + J.value())
		}
		u.each(x, function(L) {
			C.add(L.name, L.value, C.indexOf(J))
		})
	}

	function r(v) {
		var w = v.value();
		var y = null;
		var x = u.find(v.valueParts(), function(z) {
			return y = c.parse(z.substring(w))
		});
		if (x && y) {
			return {
				gradient: y,
				valueRange: x
			}
		}
		return null
	}

	function a(z, w) {
		var A = f.get("css.gradient.defaultProperty");
		if (!A) {
			return false
		}
		var B = String(z.getContent());
		var E = i("range").create(z.getCurrentLineRange());
		var G = E.substring(B).replace(/^\s+/, function(H) {
			E.start += H.length;
			return ""
		}).replace(/\s+$/, function(H) {
			E.end -= H.length;
			return ""
		});
		var y = i("cssResolver");
		var D = c.parse(G);
		if (D) {
			var C = b(D, A);
			C.push({
				name: A,
				value: c.toString(D) + "${2}"
			});
			var F = y.getSyntaxPreference("valueSeparator", w);
			var x = y.getSyntaxPreference("propertyEnd", w);
			if (i("preferences").get("css.alignVendor")) {
				var v = i("utils").getStringsPads(u.map(C, function(H) {
					return H.value.substring(0, H.value.indexOf("("))
				}));
				u.each(C, function(I, H) {
					I.value = v[H] + I.value
				})
			}
			C = u.map(C, function(H) {
				return H.name + F + H.value + x
			});
			z.replaceContent(C.join("\n"), E.start, E.end);
			return true
		}
		return false
	}

	function o(x, y) {
		var w = null;
		var v = i("cssEditTree").parseFromPosition(x, y, true);
		if (v) {
			w = v.itemFromPosition(y, true);
			if (!w) {
				w = u.find(v.list(), function(z) {
					return z.range(true).end == y
				})
			}
		}
		return {
			rule: v,
			property: w
		}
	}
	i("expandAbbreviation").addHandler(function(E, y, x) {
		var w = i("editorUtils").outputInfo(E, y, x);
		if (!u.include(s, w.syntax)) {
			return false
		}
		var G = E.getCaretPos();
		var F = w.content;
		var C = o(F, G);
		if (C.property) {
			var B = r(C.property);
			if (B) {
				var H = C.rule.options.offset || 0;
				var z = H + C.rule.toString().length;
				if (/[\n\r]/.test(C.property.value())) {
					var D = C.property.valueRange(true).start + B.valueRange.end;
					F = i("utils").replaceSubstring(F, ";", D);
					var A = o(F, G);
					if (A.property) {
						B = r(A.property);
						C = A
					}
				}
				C.property.end(";");
				var v = j(C.property.name(), y);
				if (v) {
					C.property.name(v)
				}
				h(C.property, B.gradient, B.valueRange);
				E.replaceContent(C.rule.toString(), H, z, true);
				return true
			}
		}
		return a(E, y)
	});
	i("reflectCSSValue").addHandler(function(y) {
		var v = i("utils");
		var w = r(y);
		if (!w) {
			return false
		}
		var x = y.value();
		var z = function(A) {
			return v.replaceSubstring(x, A, w.valueRange)
		};
		u.each(y.parent.getAll(t(y.name())), function(B) {
			if (B === y) {
				return
			}
			var A = B.value().match(/^\s*(\-([a-z]+)\-)?linear\-gradient/);
			if (A) {
				B.value(z(c.toString(w.gradient, A[2] || "")))
			} else {
				if (A = B.value().match(/\s*\-webkit\-gradient/)) {
					B.value(z(c.oldWebkitLinearGradient(w.gradient)))
				}
			}
		});
		return true
	});
	return c = {
		parse: function(w) {
			var v = null;
			i("utils").trim(w).replace(/^([\w\-]+)\((.+?)\)$/, function(z, y, x) {
				y = y.toLowerCase().replace(/^\-[a-z]+\-/, "");
				if (y == "linear-gradient" || y == "lg") {
					v = m(x);
					return ""
				}
				return z
			});
			return v
		},
		oldWebkitLinearGradient: function(w) {
			if (u.isString(w)) {
				w = this.parse(w)
			}
			if (!w) {
				return null
			}
			var v = u.map(w.colorStops, u.clone);
			u.each(v, function(x) {
				if (!("position" in x)) {
					return
				}
				if (~x.position.indexOf(".") || x.unit == "%") {
					x.position = parseFloat(x.position) / (x.unit == "%" ? 100 : 1)
				} else {
					throw "Can't convert color stop '" + (x.position + (x.unit || "")) + "'"
				}
			});
			l(v);
			v = u.map(v, function(y, x) {
				if (!y.position && !x) {
					return "from(" + y.color + ")"
				}
				if (y.position == 1 && x == v.length - 1) {
					return "to(" + y.color + ")"
				}
				return "color-stop(" + (y.position.toFixed(2).replace(/\.?0+$/, "")) + ", " + y.color + ")"
			});
			return "-webkit-gradient(linear, " + d(w.direction) + ", " + v.join(", ") + ")"
		},
		toString: function(y, x) {
			if (y.type == "linear") {
				var w = (x ? "-" + x + "-" : "") + "linear-gradient";
				var v = u.map(y.colorStops, function(z) {
					return z.color + ("position" in z ? " " + z.position + (z.unit || "") : "")
				});
				if (y.direction && (!f.get("css.gradient.omitDefaultDirection") || !u.include(p, y.direction))) {
					v.unshift(y.direction)
				}
				return w + "(" + v.join(", ") + ")"
			}
		}
	}
});
emmet.exec(function(b, a) {
	var c = b("handlerList").create();
	var d = b("resources");
	a.extend(d, {
		addGenerator: function(g, f, e) {
			if (a.isString(g)) {
				g = new RegExp(g)
			}
			c.add(function(j, i) {
				var h;
				if ((h = g.exec(j.name()))) {
					return f(h, j, i)
				}
				return null
			}, e)
		}
	});
	d.addResolver(function(f, e) {
		return c.exec(null, a.toArray(arguments))
	})
});
emmet.define("tagName", function(c, b) {
	var d = {
		empty: [],
		blockLevel: "address,applet,blockquote,button,center,dd,del,dir,div,dl,dt,fieldset,form,frameset,hr,iframe,ins,isindex,li,link,map,menu,noframes,noscript,object,ol,p,pre,script,table,tbody,td,tfoot,th,thead,tr,ul,h1,h2,h3,h4,h5,h6".split(","),
		inlineLevel: "a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,select,small,span,strike,strong,sub,sup,textarea,tt,u,var".split(",")
	};
	var a = {
		p: "span",
		ul: "li",
		ol: "li",
		table: "tr",
		tr: "td",
		tbody: "tr",
		thead: "tr",
		tfoot: "tr",
		colgroup: "col",
		select: "option",
		optgroup: "option",
		audio: "source",
		video: "source",
		object: "param",
		map: "area"
	};
	return {
		resolve: function(e) {
			e = (e || "").toLowerCase();
			if (e in a) {
				return this.getMapping(e)
			}
			if (this.isInlineLevel(e)) {
				return "span"
			}
			return "div"
		},
		getMapping: function(e) {
			return a[e.toLowerCase()]
		},
		isInlineLevel: function(e) {
			return this.isTypeOf(e, "inlineLevel")
		},
		isBlockLevel: function(e) {
			return this.isTypeOf(e, "blockLevel")
		},
		isEmptyElement: function(e) {
			return this.isTypeOf(e, "empty")
		},
		isTypeOf: function(e, f) {
			return b.include(d[f], e)
		},
		addMapping: function(e, f) {
			a[e] = f
		},
		removeMapping: function(e) {
			if (e in a) {
				delete a[e]
			}
		},
		addElementToCollection: function(f, g) {
			if (!d[g]) {
				d[g] = []
			}
			var e = this.getCollection(g);
			if (!b.include(e, f)) {
				e.push(f)
			}
		},
		removeElementFromCollection: function(e, f) {
			if (f in d) {
				d[f] = b.without(this.getCollection(f), e)
			}
		},
		getCollection: function(e) {
			return d[e]
		}
	}
});
emmet.exec(function(b, i) {
	var j = b("preferences");
	j.define("bem.elementSeparator", "__", "Class name’s element separator.");
	j.define("bem.modifierSeparator", "_", "Class name’s modifier separator.");
	j.define("bem.shortElementPrefix", "-", "Symbol for describing short “block-element” notation. Class names prefixed with this symbol will be treated as element name for parent‘s block name. Each symbol instance traverses one level up in parsed tree for block name lookup. Empty value will disable short notation.");
	var c = false;

	function d() {
		return {
			element: j.get("bem.elementSeparator"),
			modifier: j.get("bem.modifierSeparator")
		}
	}

	function g(l) {
		if (b("abbreviationUtils").isSnippet(l)) {
			return l
		}
		l.__bem = {
			block: "",
			element: "",
			modifier: ""
		};
		var m = f(l.attribute("class")).split(" ");
		var k = /^[a-z]\-/i;
		l.__bem.block = i.find(m, function(n) {
			return k.test(n)
		});
		if (!l.__bem.block) {
			k = /^[a-z]/i;
			l.__bem.block = i.find(m, function(n) {
				return k.test(n)
			}) || ""
		}
		m = i.chain(m).map(function(n) {
			return e(n, l)
		}).flatten().uniq().value().join(" ");
		if (m) {
			l.attribute("class", m)
		}
		return l
	}

	function f(n) {
		var l = b("utils");
		n = (" " + (n || "") + " ").replace(/\s+/g, " ");
		var k = j.get("bem.shortElementPrefix");
		if (k) {
			var m = new RegExp("\\s(" + l.escapeForRegexp(k) + "+)", "g");
			n = n.replace(m, function(p, o) {
				return " " + l.repeatString(d().element, o.length)
			})
		}
		return l.trim(n)
	}

	function e(k, t) {
		k = h(k, t, "element");
		k = h(k, t, "modifier");
		var m = "",
			o = "",
			l = "";
		var n = d();
		if (~k.indexOf(n.element)) {
			var s = k.split(n.element);
			var q = s[1].split(n.modifier);
			m = s[0];
			o = q.shift();
			l = q.join(n.modifier)
		} else {
			if (~k.indexOf(n.modifier)) {
				var r = k.split(n.modifier);
				m = r.shift();
				l = r.join(n.modifier)
			}
		}
		if (m || o || l) {
			if (!m) {
				m = t.__bem.block
			}
			var p = m;
			var u = [];
			if (o) {
				p += n.element + o;
				u.push(p)
			} else {
				u.push(p)
			}
			if (l) {
				u.push(p + n.modifier + l)
			}
			t.__bem.block = m;
			t.__bem.element = o;
			t.__bem.modifier = l;
			return u
		}
		return k
	}

	function h(k, s, m) {
		var l = d();
		var q = new RegExp("^(" + l[m] + ")+", "g");
		if (q.test(k)) {
			var n = 0;
			var r = k.replace(q, function(u, t) {
				n = u.length / l[m].length;
				return ""
			});
			var p = s;
			while (p.parent && n--) {
				p = p.parent
			}
			if (!p || !p.__bem) {
				p = s
			}
			if (p && p.__bem) {
				var o = p.__bem.block;
				if (m == "modifier" && p.__bem.element) {
					o += l.element + p.__bem.element
				}
				return o + l[m] + r
			}
		}
		return k
	}

	function a(k, m) {
		if (k.name) {
			g(k, m)
		}
		var l = b("abbreviationUtils");
		i.each(k.children, function(n) {
			a(n, m);
			if (!l.isSnippet(n) && n.start) {
				c = true
			}
		});
		return k
	}
	b("filters").add("bem", function(k, l) {
		c = false;
		k = a(k, l);
		if (c) {
			k = b("filters").apply(k, "html", l)
		}
		return k
	})
});
emmet.exec(function(c, b) {
	var a = c("preferences");
	a.define("filter.commentAfter", '\n<!-- /<%= attr("id", "#") %><%= attr("class", ".") %> -->', "A definition of comment that should be placed <i>after</i> matched element when <code>comment</code> filter is applied. This definition is an ERB-style template passed to <code>_.template()</code> function (see Underscore.js docs for details). In template context, the following properties and functions are availabe:\n<ul><li><code>attr(name, before, after)</code> – a function that outputsspecified attribute value concatenated with <code>before</code> and <code>after</code> strings. If attribute doesn't exists, the empty string will be returned.</li><li><code>node</code> – current node (instance of <code>AbbreviationNode</code>)</li><li><code>name</code> – name of current tag</li><li><code>padding</code> – current string padding, can be used for formatting</li></ul>");
	a.define("filter.commentBefore", "", "A definition of comment that should be placed <i>before</i> matched element when <code>comment</code> filter is applied. For more info, read description of <code>filter.commentAfter</code> property");
	a.define("filter.commentTrigger", "id, class", "A comma-separated list of attribute names that should exist in abbreviatoin where comment should be added. If you wish to add comment for every element, set this option to <code>*</code>");

	function d(h, l, g) {
		var k = c("utils");
		var f = a.get("filter.commentTrigger");
		if (f != "*") {
			var j = b.find(f.split(","), function(o) {
				return !!h.attribute(k.trim(o))
			});
			if (!j) {
				return
			}
		}
		var m = {
			node: h,
			name: h.name(),
			padding: h.parent ? h.parent.padding : "",
			attr: function(p, q, r) {
				var o = h.attribute(p);
				if (o) {
					return (q || "") + o + (r || "")
				}
				return ""
			}
		};
		var n = k.normalizeNewline(l ? l(m) : "");
		var i = k.normalizeNewline(g ? g(m) : "");
		h.start = h.start.replace(/</, n + "<");
		h.end = h.end.replace(/>/, ">" + i)
	}

	function e(f, h, i) {
		var g = c("abbreviationUtils");
		b.each(f.children, function(j) {
			if (g.isBlock(j)) {
				d(j, h, i)
			}
			e(j, h, i)
		});
		return f
	}
	c("filters").add("c", function(g) {
		var f = b.template(a.get("filter.commentBefore"));
		var h = b.template(a.get("filter.commentAfter"));
		return e(g, f, h)
	})
});
emmet.exec(function(b, a) {
	var c = {
		"<": "&lt;",
		">": "&gt;",
		"&": "&amp;"
	};

	function d(f) {
		return f.replace(/([<>&])/g, function(h, g) {
			return c[g]
		})
	}
	b("filters").add("e", function e(f) {
		a.each(f.children, function(g) {
			g.start = d(g.start);
			g.end = d(g.end);
			g.content = d(g.content);
			e(g)
		});
		return f
	})
});
emmet.exec(function(d, l) {
	var h = "%s";
	var o = d("preferences");
	o.define("format.noIndentTags", "html", "A comma-separated list of tag names that should not get inner indentation.");
	o.define("format.forceIndentationForTags", "body", "A comma-separated list of tag names that should <em>always</em> get inner indentation.");

	function k(p) {
		if (l.include(o.getArray("format.noIndentTags") || [], p.name())) {
			return ""
		}
		return d("resources").getVariable("indentation")
	}

	function a(p) {
		return p.parent && d("abbreviationUtils").hasBlockChildren(p.parent)
	}

	function n(p) {
		return p.parent && !p.parent.parent && !p.index()
	}

	function e(r, q) {
		var p = d("abbreviationUtils");
		if (q.tag_nl === true || p.isBlock(r)) {
			return true
		}
		if (!r.parent || !q.inline_break) {
			return false
		}
		return g(r.parent, q)
	}

	function j(q, p) {
		return q.children.length && e(q.children[0], p)
	}

	function g(s, r) {
		var q = 0;
		var p = d("abbreviationUtils");
		return !!l.find(s.children, function(t) {
			if (t.isTextNode() || !p.isInline(t)) {
				q = 0
			} else {
				if (p.isInline(t)) {
					q++
				}
			}
			if (q >= r.inline_break) {
				return true
			}
		})
	}

	function f(p) {
		return !p.parent
	}

	function m(q, p, r) {
		q.start = q.end = "";
		if (!n(q) && p.tag_nl !== false && e(q, p)) {
			if (f(q.parent) || !d("abbreviationUtils").isInline(q.parent)) {
				q.start = d("utils").getNewline() + q.start
			}
		}
		return q
	}

	function i(r, q) {
		var p = d("abbreviationUtils");
		var s = l.any(r.children, function(t) {
			if (p.isSnippet(t)) {
				return false
			}
			return !p.isInline(t)
		});
		if (!s) {
			return g(r, q)
		}
		return true
	}

	function c(w, t, q) {
		w.start = w.end = h;
		var v = d("utils");
		var x = d("abbreviationUtils");
		var r = x.isUnary(w);
		var p = v.getNewline();
		var s = k(w);
		if (t.tag_nl !== false) {
			var u = t.tag_nl === true && (t.tag_nl_leaf || w.children.length);
			if (!u) {
				u = l.include(o.getArray("format.forceIndentationForTags") || [], w.name())
			}
			if (!w.isTextNode()) {
				if (e(w, t)) {
					if (!n(w) && (!x.isSnippet(w.parent) || w.index())) {
						w.start = p + w.start
					}
					if (x.hasBlockChildren(w) || j(w, t) || (u && !r)) {
						w.end = p + w.end
					}
					if (x.hasTagsInContent(w) || (u && !w.children.length && !r)) {
						w.start += p + s
					}
				} else {
					if (x.isInline(w) && a(w) && !n(w)) {
						w.start = p + w.start
					} else {
						if (x.isInline(w) && i(w, t)) {
							w.end = p + w.end
						}
					}
				}
				w.padding = s
			}
		}
		return w
	}
	d("filters").add("_format", function b(p, r, s) {
		s = s || 0;
		var q = d("abbreviationUtils");
		l.each(p.children, function(t) {
			if (q.isSnippet(t)) {
				m(t, r, s)
			} else {
				c(t, r, s)
			}
			b(t, r, s + 1)
		});
		return p
	})
});
emmet.exec(function(c, b) {
	var a = "${child}";

	function e(i) {
		return c("utils").trim(i).replace(/\s+/g, ".")
	}

	function f(j, m) {
		var l = "";
		var i = [];
		var k = m.attributeQuote();
		var n = m.cursor();
		b.each(j.attributeList(), function(o) {
			var p = m.attributeName(o.name);
			switch (p.toLowerCase()) {
				case "id":
					l += "#" + (o.value || n);
					break;
				case "class":
					l += "." + e(o.value || n);
					break;
				default:
					i.push(":" + p + " => " + k + (o.value || n) + k)
			}
		});
		if (i.length) {
			l += "{" + i.join(", ") + "}"
		}
		return l
	}

	function d(i) {
		return i.parent && i.parent.hasBlockChildren()
	}

	function h(s, m, i) {
		if (!s.parent) {
			return s
		}
		var t = c("abbreviationUtils");
		var p = c("utils");
		var q = f(s, m);
		var r = m.cursor();
		var l = t.isUnary(s);
		var n = m.self_closing_tag && l ? "/" : "";
		var j = "";
		var k = "%" + m.tagName(s.name());
		if (k.toLowerCase() == "%div" && q && q.indexOf("{") == -1) {
			k = ""
		}
		s.end = "";
		j = k + q + n + " ";
		var o = "%s";
		s.start = p.replaceSubstring(s.start, j, s.start.indexOf(o), o);
		if (!s.children.length && !l) {
			s.start += r
		}
		return s
	}
	c("filters").add("haml", function g(i, k, l) {
		l = l || 0;
		var j = c("abbreviationUtils");
		if (!l) {
			i = c("filters").apply(i, "_format", k)
		}
		b.each(i.children, function(m) {
			if (!j.isSnippet(m)) {
				h(m, k, l)
			}
			g(m, k, l + 1)
		});
		return i
	})
});
emmet.exec(function(b, a) {
	function c(h, g) {
		var f = g.attributeQuote();
		var i = g.cursor();
		return a.map(h.attributeList(), function(j) {
			var k = g.attributeName(j.name);
			return " " + k + "=" + f + (j.value || i) + f
		}).join("")
	}

	function e(p, j, f) {
		if (!p.parent) {
			return p
		}
		var q = b("abbreviationUtils");
		var m = b("utils");
		var n = c(p, j);
		var o = j.cursor();
		var i = q.isUnary(p);
		var g = "";
		var k = "";
		if (!p.isTextNode()) {
			var h = j.tagName(p.name());
			if (i) {
				g = "<" + h + n + j.selfClosing() + ">";
				p.end = ""
			} else {
				g = "<" + h + n + ">";
				k = "</" + h + ">"
			}
		}
		var l = "%s";
		p.start = m.replaceSubstring(p.start, g, p.start.indexOf(l), l);
		p.end = m.replaceSubstring(p.end, k, p.end.indexOf(l), l);
		if (!p.children.length && !i && !~p.content.indexOf(o) && !b("tabStops").extract(p.content).tabstops.length) {
			p.start += o
		}
		return p
	}
	b("filters").add("html", function d(f, h, i) {
		i = i || 0;
		var g = b("abbreviationUtils");
		if (!i) {
			f = b("filters").apply(f, "_format", h)
		}
		a.each(f.children, function(j) {
			if (!g.isSnippet(j)) {
				e(j, h, i)
			}
			d(j, h, i + 1)
		});
		return f
	})
});
emmet.exec(function(c, b) {
	var a = /^\s+/;
	var d = /[\n\r]/g;
	c("filters").add("s", function e(f, h, i) {
		var g = c("abbreviationUtils");
		b.each(f.children, function(j) {
			if (!g.isSnippet(j)) {
				j.start = j.start.replace(a, "");
				j.end = j.end.replace(a, "")
			}
			j.start = j.start.replace(d, "");
			j.end = j.end.replace(d, "");
			j.content = j.content.replace(d, "");
			e(j)
		});
		return f
	})
});
emmet.exec(function(b, a) {
	b("preferences").define("filter.trimRegexp", "[\\s|\\u00a0]*[\\d|#|\\-|*|\\u2022]+\\.?\\s*", "Regular expression used to remove list markers (numbers, dashes, bullets, etc.) in <code>t</code> (trim) filter. The trim filter is useful for wrapping with abbreviation lists, pased from other documents (for example, Word documents).");

	function c(d, e) {
		a.each(d.children, function(f) {
			if (f.content) {
				f.content = f.content.replace(e, "")
			}
			c(f, e)
		});
		return d
	}
	b("filters").add("t", function(d) {
		var e = new RegExp(b("preferences").get("filter.trimRegexp"));
		return c(d, e)
	})
});
emmet.exec(function(d, c) {
	var b = {
		"xsl:variable": 1,
		"xsl:with-param": 1
	};

	function a(f) {
		f.start = f.start.replace(/\s+select\s*=\s*(['"]).*?\1/, "")
	}
	d("filters").add("xsl", function e(f) {
		var g = d("abbreviationUtils");
		c.each(f.children, function(h) {
			if (!g.isSnippet(h) && (h.name() || "").toLowerCase() in b && h.children.length) {
				a(h)
			}
			e(h)
		});
		return f
	})
});
emmet.define("lorem", function(b, i) {
	var c = {
		en: {
			common: ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipisicing", "elit"],
			words: ["exercitationem", "perferendis", "perspiciatis", "laborum", "eveniet", "sunt", "iure", "nam", "nobis", "eum", "cum", "officiis", "excepturi", "odio", "consectetur", "quasi", "aut", "quisquam", "vel", "eligendi", "itaque", "non", "odit", "tempore", "quaerat", "dignissimos", "facilis", "neque", "nihil", "expedita", "vitae", "vero", "ipsum", "nisi", "animi", "cumque", "pariatur", "velit", "modi", "natus", "iusto", "eaque", "sequi", "illo", "sed", "ex", "et", "voluptatibus", "tempora", "veritatis", "ratione", "assumenda", "incidunt", "nostrum", "placeat", "aliquid", "fuga", "provident", "praesentium", "rem", "necessitatibus", "suscipit", "adipisci", "quidem", "possimus", "voluptas", "debitis", "sint", "accusantium", "unde", "sapiente", "voluptate", "qui", "aspernatur", "laudantium", "soluta", "amet", "quo", "aliquam", "saepe", "culpa", "libero", "ipsa", "dicta", "reiciendis", "nesciunt", "doloribus", "autem", "impedit", "minima", "maiores", "repudiandae", "ipsam", "obcaecati", "ullam", "enim", "totam", "delectus", "ducimus", "quis", "voluptates", "dolores", "molestiae", "harum", "dolorem", "quia", "voluptatem", "molestias", "magni", "distinctio", "omnis", "illum", "dolorum", "voluptatum", "ea", "quas", "quam", "corporis", "quae", "blanditiis", "atque", "deserunt", "laboriosam", "earum", "consequuntur", "hic", "cupiditate", "quibusdam", "accusamus", "ut", "rerum", "error", "minus", "eius", "ab", "ad", "nemo", "fugit", "officia", "at", "in", "id", "quos", "reprehenderit", "numquam", "iste", "fugiat", "sit", "inventore", "beatae", "repellendus", "magnam", "recusandae", "quod", "explicabo", "doloremque", "aperiam", "consequatur", "asperiores", "commodi", "optio", "dolor", "labore", "temporibus", "repellat", "veniam", "architecto", "est", "esse", "mollitia", "nulla", "a", "similique", "eos", "alias", "dolore", "tenetur", "deleniti", "porro", "facere", "maxime", "corrupti"]
		},
		ru: {
			common: ["далеко-далеко", "за", "словесными", "горами", "в стране", "гласных", "и согласных", "живут", "рыбные", "тексты"],
			words: ["вдали", "от всех", "они", "буквенных", "домах", "на берегу", "семантика", "большого", "языкового", "океана", "маленький", "ручеек", "даль", "журчит", "по всей", "обеспечивает", "ее", "всеми", "необходимыми", "правилами", "эта", "парадигматическая", "страна", "которой", "жаренные", "предложения", "залетают", "прямо", "рот", "даже", "всемогущая", "пунктуация", "не", "имеет", "власти", "над", "рыбными", "текстами", "ведущими", "безорфографичный", "образ", "жизни", "однажды", "одна", "маленькая", "строчка", "рыбного", "текста", "имени", "lorem", "ipsum", "решила", "выйти", "большой", "мир", "грамматики", "великий", "оксмокс", "предупреждал", "о", "злых", "запятых", "диких", "знаках", "вопроса", "коварных", "точках", "запятой", "но", "текст", "дал", "сбить", "себя", "толку", "он", "собрал", "семь", "своих", "заглавных", "букв", "подпоясал", "инициал", "за", "пояс", "пустился", "дорогу", "взобравшись", "первую", "вершину", "курсивных", "гор", "бросил", "последний", "взгляд", "назад", "силуэт", "своего", "родного", "города", "буквоград", "заголовок", "деревни", "алфавит", "подзаголовок", "своего", "переулка", "грустный", "реторический", "вопрос", "скатился", "его", "щеке", "продолжил", "свой", "путь", "дороге", "встретил", "рукопись", "она", "предупредила", "моей", "все", "переписывается", "несколько", "раз", "единственное", "что", "меня", "осталось", "это", "приставка", "возвращайся", "ты", "лучше", "свою", "безопасную", "страну", "послушавшись", "рукописи", "наш", "продолжил", "свой", "путь", "вскоре", "ему", "повстречался", "коварный", "составитель", "рекламных", "текстов", "напоивший", "языком", "речью", "заманивший", "свое", "агенство", "которое", "использовало", "снова", "снова", "своих", "проектах", "если", "переписали", "то", "живет", "там", "до", "сих", "пор"]
		}
	};
	var j = b("preferences");
	j.define("lorem.defaultLang", "en");
	b("abbreviationParser").addPreprocessor(function(k, m) {
		var n = /^(?:lorem|lipsum)([a-z]{2})?(\d*)$/i,
			l;
		k.findAll(function(o) {
			if (o._name && (l = o._name.match(n))) {
				var p = l[2] || 30;
				var q = l[1] || j.get("lorem.defaultLang") || "en";
				o._name = "";
				o.data("forceNameResolving", o.isRepeating() || o.attributeList().length);
				o.data("pasteOverwrites", true);
				o.data("paste", function(r, s) {
					return e(q, p, !r)
				})
			}
		})
	});

	function f(l, k) {
		return Math.round(Math.random() * (k - l) + l)
	}

	function h(m, o) {
		var l = m.length;
		var n = Math.min(l, o);
		var k = [];
		while (k.length < n) {
			var p = f(0, l - 1);
			if (!i.include(k, p)) {
				k.push(p)
			}
		}
		return i.map(k, function(q) {
			return m[q]
		})
	}

	function d(k) {
		if (i.isString(k)) {
			return k.charAt(f(0, k.length - 1))
		}
		return k[f(0, k.length - 1)]
	}

	function g(l, k) {
		if (l.length) {
			l[0] = l[0].charAt(0).toUpperCase() + l[0].substring(1)
		}
		return l.join(" ") + (k || d("?!..."))
	}

	function a(m) {
		var k = m.length;
		var l = 0;
		if (k > 3 && k <= 6) {
			l = f(0, 1)
		} else {
			if (k > 6 && k <= 12) {
				l = f(0, 2)
			} else {
				l = f(1, 4)
			}
		}
		i.each(i.range(l), function(n) {
			if (n < m.length - 1) {
				m[n] += ","
			}
		})
	}

	function e(q, l, n) {
		var o = c[q];
		if (!o) {
			return ""
		}
		var k = [];
		var m = 0;
		var p;
		l = parseInt(l, 10);
		if (n && o.common) {
			p = o.common.slice(0, l);
			if (p.length > 5) {
				p[4] += ","
			}
			m += p.length;
			k.push(g(p, "."))
		}
		while (m < l) {
			p = h(o.words, Math.min(f(3, 12) * f(1, 5), l - m));
			m += p.length;
			a(p);
			k.push(g(p))
		}
		return k.join(" ")
	}
	return {
		addLang: function(l, k) {
			if (i.isString(k)) {
				k = {
					words: i.compact(k.split(" "))
				}
			} else {
				if (i.isArray(k)) {
					k = {
						words: k
					}
				}
			}
			c[l] = k
		}
	}
});
emmet.define("bootstrap", function(c, b) {
	var e = {
		variables: {
			lang: "en",
			locale: "en-US",
			charset: "UTF-8",
			indentation: "\t",
			newline: "\n"
		},
		css: {
			filters: "html",
			snippets: {
				"@i": "@import url(|);",
				"@import": "@import url(|);",
				"@m": "@media ${1:screen} {\n\t|\n}",
				"@media": "@media ${1:screen} {\n\t|\n}",
				"@f": "@font-face {\n\tfont-family:|;\n\tsrc:url(|);\n}",
				"@f+": "@font-face {\n\tfont-family: '${1:FontName}';\n\tsrc: url('${2:FileName}.eot');\n\tsrc: url('${2:FileName}.eot?#iefix') format('embedded-opentype'),\n\t\t url('${2:FileName}.woff') format('woff'),\n\t\t url('${2:FileName}.ttf') format('truetype'),\n\t\t url('${2:FileName}.svg#${1:FontName}') format('svg');\n\tfont-style: ${3:normal};\n\tfont-weight: ${4:normal};\n}",
				"@kf": "@-webkit-keyframes ${1:identifier} {\n\t${2:from} { ${3} }${6}\n\t${4:to} { ${5} }\n}\n@-o-keyframes ${1:identifier} {\n\t${2:from} { ${3} }${6}\n\t${4:to} { ${5} }\n}\n@-moz-keyframes ${1:identifier} {\n\t${2:from} { ${3} }${6}\n\t${4:to} { ${5} }\n}\n@keyframes ${1:identifier} {\n\t${2:from} { ${3} }${6}\n\t${4:to} { ${5} }\n}",
				anim: "animation:|;",
				"anim-": "animation:${1:name} ${2:duration} ${3:timing-function} ${4:delay} ${5:iteration-count} ${6:direction} ${7:fill-mode};",
				animdel: "animation-delay:${1:time};",
				animdir: "animation-direction:${1:normal};",
				"animdir:n": "animation-direction:normal;",
				"animdir:r": "animation-direction:reverse;",
				"animdir:a": "animation-direction:alternate;",
				"animdir:ar": "animation-direction:alternate-reverse;",
				animdur: "animation-duration:${1:0}s;",
				animfm: "animation-fill-mode:${1:both};",
				"animfm:f": "animation-fill-mode:forwards;",
				"animfm:b": "animation-fill-mode:backwards;",
				"animfm:bt": "animation-fill-mode:both;",
				"animfm:bh": "animation-fill-mode:both;",
				animic: "animation-iteration-count:${1:1};",
				"animic:i": "animation-iteration-count:infinite;",
				animn: "animation-name:${1:none};",
				animps: "animation-play-state:${1:running};",
				"animps:p": "animation-play-state:paused;",
				"animps:r": "animation-play-state:running;",
				animtf: "animation-timing-function:${1:linear};",
				"animtf:e": "animation-timing-function:ease;",
				"animtf:ei": "animation-timing-function:ease-in;",
				"animtf:eo": "animation-timing-function:ease-out;",
				"animtf:eio": "animation-timing-function:ease-in-out;",
				"animtf:l": "animation-timing-function:linear;",
				"animtf:cb": "animation-timing-function:cubic-bezier(${1:0.1}, ${2:0.7}, ${3:1.0}, ${3:0.1});",
				ap: "appearance:${none};",
				"!": "!important",
				pos: "position:${1:relative};",
				"pos:s": "position:static;",
				"pos:a": "position:absolute;",
				"pos:r": "position:relative;",
				"pos:f": "position:fixed;",
				t: "top:|;",
				"t:a": "top:auto;",
				r: "right:|;",
				"r:a": "right:auto;",
				b: "bottom:|;",
				"b:a": "bottom:auto;",
				l: "left:|;",
				"l:a": "left:auto;",
				z: "z-index:|;",
				"z:a": "z-index:auto;",
				fl: "float:${1:left};",
				"fl:n": "float:none;",
				"fl:l": "float:left;",
				"fl:r": "float:right;",
				cl: "clear:${1:both};",
				"cl:n": "clear:none;",
				"cl:l": "clear:left;",
				"cl:r": "clear:right;",
				"cl:b": "clear:both;",
				colm: "columns:|;",
				colmc: "column-count:|;",
				colmf: "column-fill:|;",
				colmg: "column-gap:|;",
				colmr: "column-rule:|;",
				colmrc: "column-rule-color:|;",
				colmrs: "column-rule-style:|;",
				colmrw: "column-rule-width:|;",
				colms: "column-span:|;",
				colmw: "column-width:|;",
				d: "display:${1:block};",
				"d:n": "display:none;",
				"d:b": "display:block;",
				"d:i": "display:inline;",
				"d:ib": "display:inline-block;",
				"d:ib+": "display: inline-block;\n*display: inline;\n*zoom: 1;",
				"d:li": "display:list-item;",
				"d:ri": "display:run-in;",
				"d:cp": "display:compact;",
				"d:tb": "display:table;",
				"d:itb": "display:inline-table;",
				"d:tbcp": "display:table-caption;",
				"d:tbcl": "display:table-column;",
				"d:tbclg": "display:table-column-group;",
				"d:tbhg": "display:table-header-group;",
				"d:tbfg": "display:table-footer-group;",
				"d:tbr": "display:table-row;",
				"d:tbrg": "display:table-row-group;",
				"d:tbc": "display:table-cell;",
				"d:rb": "display:ruby;",
				"d:rbb": "display:ruby-base;",
				"d:rbbg": "display:ruby-base-group;",
				"d:rbt": "display:ruby-text;",
				"d:rbtg": "display:ruby-text-group;",
				v: "visibility:${1:hidden};",
				"v:v": "visibility:visible;",
				"v:h": "visibility:hidden;",
				"v:c": "visibility:collapse;",
				ov: "overflow:${1:hidden};",
				"ov:v": "overflow:visible;",
				"ov:h": "overflow:hidden;",
				"ov:s": "overflow:scroll;",
				"ov:a": "overflow:auto;",
				ovx: "overflow-x:${1:hidden};",
				"ovx:v": "overflow-x:visible;",
				"ovx:h": "overflow-x:hidden;",
				"ovx:s": "overflow-x:scroll;",
				"ovx:a": "overflow-x:auto;",
				ovy: "overflow-y:${1:hidden};",
				"ovy:v": "overflow-y:visible;",
				"ovy:h": "overflow-y:hidden;",
				"ovy:s": "overflow-y:scroll;",
				"ovy:a": "overflow-y:auto;",
				ovs: "overflow-style:${1:scrollbar};",
				"ovs:a": "overflow-style:auto;",
				"ovs:s": "overflow-style:scrollbar;",
				"ovs:p": "overflow-style:panner;",
				"ovs:m": "overflow-style:move;",
				"ovs:mq": "overflow-style:marquee;",
				zoo: "zoom:1;",
				zm: "zoom:1;",
				cp: "clip:|;",
				"cp:a": "clip:auto;",
				"cp:r": "clip:rect(${1:top} ${2:right} ${3:bottom} ${4:left});",
				bxz: "box-sizing:${1:border-box};",
				"bxz:cb": "box-sizing:content-box;",
				"bxz:bb": "box-sizing:border-box;",
				bxsh: "box-shadow:${1:inset }${2:hoff} ${3:voff} ${4:blur} ${5:color};",
				"bxsh:r": "box-shadow:${1:inset }${2:hoff} ${3:voff} ${4:blur} ${5:spread }rgb(${6:0}, ${7:0}, ${8:0});",
				"bxsh:ra": "box-shadow:${1:inset }${2:h} ${3:v} ${4:blur} ${5:spread }rgba(${6:0}, ${7:0}, ${8:0}, .${9:5});",
				"bxsh:n": "box-shadow:none;",
				m: "margin:|;",
				"m:a": "margin:auto;",
				mt: "margin-top:|;",
				"mt:a": "margin-top:auto;",
				mr: "margin-right:|;",
				"mr:a": "margin-right:auto;",
				mb: "margin-bottom:|;",
				"mb:a": "margin-bottom:auto;",
				ml: "margin-left:|;",
				"ml:a": "margin-left:auto;",
				p: "padding:|;",
				pt: "padding-top:|;",
				pr: "padding-right:|;",
				pb: "padding-bottom:|;",
				pl: "padding-left:|;",
				w: "width:|;",
				"w:a": "width:auto;",
				h: "height:|;",
				"h:a": "height:auto;",
				maw: "max-width:|;",
				"maw:n": "max-width:none;",
				mah: "max-height:|;",
				"mah:n": "max-height:none;",
				miw: "min-width:|;",
				mih: "min-height:|;",
				mar: "max-resolution:${1:res};",
				mir: "min-resolution:${1:res};",
				ori: "orientation:|;",
				"ori:l": "orientation:landscape;",
				"ori:p": "orientation:portrait;",
				ol: "outline:|;",
				"ol:n": "outline:none;",
				olo: "outline-offset:|;",
				olw: "outline-width:|;",
				"olw:tn": "outline-width:thin;",
				"olw:m": "outline-width:medium;",
				"olw:tc": "outline-width:thick;",
				ols: "outline-style:|;",
				"ols:n": "outline-style:none;",
				"ols:dt": "outline-style:dotted;",
				"ols:ds": "outline-style:dashed;",
				"ols:s": "outline-style:solid;",
				"ols:db": "outline-style:double;",
				"ols:g": "outline-style:groove;",
				"ols:r": "outline-style:ridge;",
				"ols:i": "outline-style:inset;",
				"ols:o": "outline-style:outset;",
				olc: "outline-color:#${1:000};",
				"olc:i": "outline-color:invert;",
				bd: "border:|;",
				"bd+": "border:${1:1px} ${2:solid} ${3:#000};",
				"bd:n": "border:none;",
				bdbk: "border-break:${1:close};",
				"bdbk:c": "border-break:close;",
				bdcl: "border-collapse:|;",
				"bdcl:c": "border-collapse:collapse;",
				"bdcl:s": "border-collapse:separate;",
				bdc: "border-color:#${1:000};",
				"bdc:t": "border-color:transparent;",
				bdi: "border-image:url(|);",
				"bdi:n": "border-image:none;",
				bdti: "border-top-image:url(|);",
				"bdti:n": "border-top-image:none;",
				bdri: "border-right-image:url(|);",
				"bdri:n": "border-right-image:none;",
				bdbi: "border-bottom-image:url(|);",
				"bdbi:n": "border-bottom-image:none;",
				bdli: "border-left-image:url(|);",
				"bdli:n": "border-left-image:none;",
				bdci: "border-corner-image:url(|);",
				"bdci:n": "border-corner-image:none;",
				"bdci:c": "border-corner-image:continue;",
				bdtli: "border-top-left-image:url(|);",
				"bdtli:n": "border-top-left-image:none;",
				"bdtli:c": "border-top-left-image:continue;",
				bdtri: "border-top-right-image:url(|);",
				"bdtri:n": "border-top-right-image:none;",
				"bdtri:c": "border-top-right-image:continue;",
				bdbri: "border-bottom-right-image:url(|);",
				"bdbri:n": "border-bottom-right-image:none;",
				"bdbri:c": "border-bottom-right-image:continue;",
				bdbli: "border-bottom-left-image:url(|);",
				"bdbli:n": "border-bottom-left-image:none;",
				"bdbli:c": "border-bottom-left-image:continue;",
				bdf: "border-fit:${1:repeat};",
				"bdf:c": "border-fit:clip;",
				"bdf:r": "border-fit:repeat;",
				"bdf:sc": "border-fit:scale;",
				"bdf:st": "border-fit:stretch;",
				"bdf:ow": "border-fit:overwrite;",
				"bdf:of": "border-fit:overflow;",
				"bdf:sp": "border-fit:space;",
				bdlen: "border-length:|;",
				"bdlen:a": "border-length:auto;",
				bdsp: "border-spacing:|;",
				bds: "border-style:|;",
				"bds:n": "border-style:none;",
				"bds:h": "border-style:hidden;",
				"bds:dt": "border-style:dotted;",
				"bds:ds": "border-style:dashed;",
				"bds:s": "border-style:solid;",
				"bds:db": "border-style:double;",
				"bds:dtds": "border-style:dot-dash;",
				"bds:dtdtds": "border-style:dot-dot-dash;",
				"bds:w": "border-style:wave;",
				"bds:g": "border-style:groove;",
				"bds:r": "border-style:ridge;",
				"bds:i": "border-style:inset;",
				"bds:o": "border-style:outset;",
				bdw: "border-width:|;",
				bdtw: "border-top-width:|;",
				bdrw: "border-right-width:|;",
				bdbw: "border-bottom-width:|;",
				bdlw: "border-left-width:|;",
				bdt: "border-top:|;",
				bt: "border-top:|;",
				"bdt+": "border-top:${1:1px} ${2:solid} ${3:#000};",
				"bdt:n": "border-top:none;",
				bdts: "border-top-style:|;",
				"bdts:n": "border-top-style:none;",
				bdtc: "border-top-color:#${1:000};",
				"bdtc:t": "border-top-color:transparent;",
				bdr: "border-right:|;",
				br: "border-right:|;",
				"bdr+": "border-right:${1:1px} ${2:solid} ${3:#000};",
				"bdr:n": "border-right:none;",
				bdrst: "border-right-style:|;",
				"bdrst:n": "border-right-style:none;",
				bdrc: "border-right-color:#${1:000};",
				"bdrc:t": "border-right-color:transparent;",
				bdb: "border-bottom:|;",
				bb: "border-bottom:|;",
				"bdb+": "border-bottom:${1:1px} ${2:solid} ${3:#000};",
				"bdb:n": "border-bottom:none;",
				bdbs: "border-bottom-style:|;",
				"bdbs:n": "border-bottom-style:none;",
				bdbc: "border-bottom-color:#${1:000};",
				"bdbc:t": "border-bottom-color:transparent;",
				bdl: "border-left:|;",
				bl: "border-left:|;",
				"bdl+": "border-left:${1:1px} ${2:solid} ${3:#000};",
				"bdl:n": "border-left:none;",
				bdls: "border-left-style:|;",
				"bdls:n": "border-left-style:none;",
				bdlc: "border-left-color:#${1:000};",
				"bdlc:t": "border-left-color:transparent;",
				bdrs: "border-radius:|;",
				bdtrrs: "border-top-right-radius:|;",
				bdtlrs: "border-top-left-radius:|;",
				bdbrrs: "border-bottom-right-radius:|;",
				bdblrs: "border-bottom-left-radius:|;",
				bg: "background:#${1:000};",
				"bg+": "background:${1:#fff} url(${2}) ${3:0} ${4:0} ${5:no-repeat};",
				"bg:n": "background:none;",
				"bg:ie": "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${1:x}.png',sizingMethod='${2:crop}');",
				bgc: "background-color:#${1:fff};",
				"bgc:t": "background-color:transparent;",
				bgi: "background-image:url(|);",
				"bgi:n": "background-image:none;",
				bgr: "background-repeat:|;",
				"bgr:n": "background-repeat:no-repeat;",
				"bgr:x": "background-repeat:repeat-x;",
				"bgr:y": "background-repeat:repeat-y;",
				"bgr:sp": "background-repeat:space;",
				"bgr:rd": "background-repeat:round;",
				bga: "background-attachment:|;",
				"bga:f": "background-attachment:fixed;",
				"bga:s": "background-attachment:scroll;",
				bgp: "background-position:${1:0} ${2:0};",
				bgpx: "background-position-x:|;",
				bgpy: "background-position-y:|;",
				bgbk: "background-break:|;",
				"bgbk:bb": "background-break:bounding-box;",
				"bgbk:eb": "background-break:each-box;",
				"bgbk:c": "background-break:continuous;",
				bgcp: "background-clip:${1:padding-box};",
				"bgcp:bb": "background-clip:border-box;",
				"bgcp:pb": "background-clip:padding-box;",
				"bgcp:cb": "background-clip:content-box;",
				"bgcp:nc": "background-clip:no-clip;",
				bgo: "background-origin:|;",
				"bgo:pb": "background-origin:padding-box;",
				"bgo:bb": "background-origin:border-box;",
				"bgo:cb": "background-origin:content-box;",
				bgsz: "background-size:|;",
				"bgsz:a": "background-size:auto;",
				"bgsz:ct": "background-size:contain;",
				"bgsz:cv": "background-size:cover;",
				c: "color:#${1:000};",
				"c:r": "color:rgb(${1:0}, ${2:0}, ${3:0});",
				"c:ra": "color:rgba(${1:0}, ${2:0}, ${3:0}, .${4:5});",
				cm: "/* |${child} */",
				cnt: "content:'|';",
				"cnt:n": "content:normal;",
				"cnt:oq": "content:open-quote;",
				"cnt:noq": "content:no-open-quote;",
				"cnt:cq": "content:close-quote;",
				"cnt:ncq": "content:no-close-quote;",
				"cnt:a": "content:attr(|);",
				"cnt:c": "content:counter(|);",
				"cnt:cs": "content:counters(|);",
				tbl: "table-layout:|;",
				"tbl:a": "table-layout:auto;",
				"tbl:f": "table-layout:fixed;",
				cps: "caption-side:|;",
				"cps:t": "caption-side:top;",
				"cps:b": "caption-side:bottom;",
				ec: "empty-cells:|;",
				"ec:s": "empty-cells:show;",
				"ec:h": "empty-cells:hide;",
				lis: "list-style:|;",
				"lis:n": "list-style:none;",
				lisp: "list-style-position:|;",
				"lisp:i": "list-style-position:inside;",
				"lisp:o": "list-style-position:outside;",
				list: "list-style-type:|;",
				"list:n": "list-style-type:none;",
				"list:d": "list-style-type:disc;",
				"list:c": "list-style-type:circle;",
				"list:s": "list-style-type:square;",
				"list:dc": "list-style-type:decimal;",
				"list:dclz": "list-style-type:decimal-leading-zero;",
				"list:lr": "list-style-type:lower-roman;",
				"list:ur": "list-style-type:upper-roman;",
				lisi: "list-style-image:|;",
				"lisi:n": "list-style-image:none;",
				q: "quotes:|;",
				"q:n": "quotes:none;",
				"q:ru": "quotes:'\\00AB' '\\00BB' '\\201E' '\\201C';",
				"q:en": "quotes:'\\201C' '\\201D' '\\2018' '\\2019';",
				ct: "content:|;",
				"ct:n": "content:normal;",
				"ct:oq": "content:open-quote;",
				"ct:noq": "content:no-open-quote;",
				"ct:cq": "content:close-quote;",
				"ct:ncq": "content:no-close-quote;",
				"ct:a": "content:attr(|);",
				"ct:c": "content:counter(|);",
				"ct:cs": "content:counters(|);",
				coi: "counter-increment:|;",
				cor: "counter-reset:|;",
				va: "vertical-align:${1:top};",
				"va:sup": "vertical-align:super;",
				"va:t": "vertical-align:top;",
				"va:tt": "vertical-align:text-top;",
				"va:m": "vertical-align:middle;",
				"va:bl": "vertical-align:baseline;",
				"va:b": "vertical-align:bottom;",
				"va:tb": "vertical-align:text-bottom;",
				"va:sub": "vertical-align:sub;",
				ta: "text-align:${1:left};",
				"ta:l": "text-align:left;",
				"ta:c": "text-align:center;",
				"ta:r": "text-align:right;",
				"ta:j": "text-align:justify;",
				"ta-lst": "text-align-last:|;",
				"tal:a": "text-align-last:auto;",
				"tal:l": "text-align-last:left;",
				"tal:c": "text-align-last:center;",
				"tal:r": "text-align-last:right;",
				td: "text-decoration:${1:none};",
				"td:n": "text-decoration:none;",
				"td:u": "text-decoration:underline;",
				"td:o": "text-decoration:overline;",
				"td:l": "text-decoration:line-through;",
				te: "text-emphasis:|;",
				"te:n": "text-emphasis:none;",
				"te:ac": "text-emphasis:accent;",
				"te:dt": "text-emphasis:dot;",
				"te:c": "text-emphasis:circle;",
				"te:ds": "text-emphasis:disc;",
				"te:b": "text-emphasis:before;",
				"te:a": "text-emphasis:after;",
				th: "text-height:|;",
				"th:a": "text-height:auto;",
				"th:f": "text-height:font-size;",
				"th:t": "text-height:text-size;",
				"th:m": "text-height:max-size;",
				ti: "text-indent:|;",
				"ti:-": "text-indent:-9999px;",
				tj: "text-justify:|;",
				"tj:a": "text-justify:auto;",
				"tj:iw": "text-justify:inter-word;",
				"tj:ii": "text-justify:inter-ideograph;",
				"tj:ic": "text-justify:inter-cluster;",
				"tj:d": "text-justify:distribute;",
				"tj:k": "text-justify:kashida;",
				"tj:t": "text-justify:tibetan;",
				tov: "text-overflow:${ellipsis};",
				"tov:e": "text-overflow:ellipsis;",
				"tov:c": "text-overflow:clip;",
				to: "text-outline:|;",
				"to+": "text-outline:${1:0} ${2:0} ${3:#000};",
				"to:n": "text-outline:none;",
				tr: "text-replace:|;",
				"tr:n": "text-replace:none;",
				tt: "text-transform:${1:uppercase};",
				"tt:n": "text-transform:none;",
				"tt:c": "text-transform:capitalize;",
				"tt:u": "text-transform:uppercase;",
				"tt:l": "text-transform:lowercase;",
				tw: "text-wrap:|;",
				"tw:n": "text-wrap:normal;",
				"tw:no": "text-wrap:none;",
				"tw:u": "text-wrap:unrestricted;",
				"tw:s": "text-wrap:suppress;",
				tsh: "text-shadow:${1:hoff} ${2:voff} ${3:blur} ${4:#000};",
				"tsh:r": "text-shadow:${1:h} ${2:v} ${3:blur} rgb(${4:0}, ${5:0}, ${6:0});",
				"tsh:ra": "text-shadow:${1:h} ${2:v} ${3:blur} rgba(${4:0}, ${5:0}, ${6:0}, .${7:5});",
				"tsh+": "text-shadow:${1:0} ${2:0} ${3:0} ${4:#000};",
				"tsh:n": "text-shadow:none;",
				trf: "transform:|;",
				"trf:skx": "transform: skewX(${1:angle});",
				"trf:sky": "transform: skewY(${1:angle});",
				"trf:sc": "transform: scale(${1:x}, ${2:y});",
				"trf:scx": "transform: scaleX(${1:x});",
				"trf:scy": "transform: scaleY(${1:y});",
				"trf:r": "transform: rotate(${1:angle});",
				"trf:t": "transform: translate(${1:x}, ${2:y});",
				"trf:tx": "transform: translateX(${1:x});",
				"trf:ty": "transform: translateY(${1:y});",
				trfo: "transform-origin:|;",
				trfs: "transform-style:${1:preserve-3d};",
				trs: "transition:${1:prop} ${2:time};",
				trsde: "transition-delay:${1:time};",
				trsdu: "transition-duration:${1:time};",
				trsp: "transition-property:${1:prop};",
				trstf: "transition-timing-function:${1:tfunc};",
				lh: "line-height:|;",
				whs: "white-space:|;",
				"whs:n": "white-space:normal;",
				"whs:p": "white-space:pre;",
				"whs:nw": "white-space:nowrap;",
				"whs:pw": "white-space:pre-wrap;",
				"whs:pl": "white-space:pre-line;",
				whsc: "white-space-collapse:|;",
				"whsc:n": "white-space-collapse:normal;",
				"whsc:k": "white-space-collapse:keep-all;",
				"whsc:l": "white-space-collapse:loose;",
				"whsc:bs": "white-space-collapse:break-strict;",
				"whsc:ba": "white-space-collapse:break-all;",
				wob: "word-break:|;",
				"wob:n": "word-break:normal;",
				"wob:k": "word-break:keep-all;",
				"wob:ba": "word-break:break-all;",
				wos: "word-spacing:|;",
				wow: "word-wrap:|;",
				"wow:nm": "word-wrap:normal;",
				"wow:n": "word-wrap:none;",
				"wow:u": "word-wrap:unrestricted;",
				"wow:s": "word-wrap:suppress;",
				"wow:b": "word-wrap:break-word;",
				wm: "writing-mode:${1:lr-tb};",
				"wm:lrt": "writing-mode:lr-tb;",
				"wm:lrb": "writing-mode:lr-bt;",
				"wm:rlt": "writing-mode:rl-tb;",
				"wm:rlb": "writing-mode:rl-bt;",
				"wm:tbr": "writing-mode:tb-rl;",
				"wm:tbl": "writing-mode:tb-lr;",
				"wm:btl": "writing-mode:bt-lr;",
				"wm:btr": "writing-mode:bt-rl;",
				lts: "letter-spacing:|;",
				"lts-n": "letter-spacing:normal;",
				f: "font:|;",
				"f+": "font:${1:1em} ${2:Arial,sans-serif};",
				fw: "font-weight:|;",
				"fw:n": "font-weight:normal;",
				"fw:b": "font-weight:bold;",
				"fw:br": "font-weight:bolder;",
				"fw:lr": "font-weight:lighter;",
				fs: "font-style:${italic};",
				"fs:n": "font-style:normal;",
				"fs:i": "font-style:italic;",
				"fs:o": "font-style:oblique;",
				fv: "font-variant:|;",
				"fv:n": "font-variant:normal;",
				"fv:sc": "font-variant:small-caps;",
				fz: "font-size:|;",
				fza: "font-size-adjust:|;",
				"fza:n": "font-size-adjust:none;",
				ff: "font-family:|;",
				"ff:s": "font-family:serif;",
				"ff:ss": "font-family:sans-serif;",
				"ff:c": "font-family:cursive;",
				"ff:f": "font-family:fantasy;",
				"ff:m": "font-family:monospace;",
				"ff:a": 'font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;',
				"ff:t": 'font-family: "Times New Roman", Times, Baskerville, Georgia, serif;',
				"ff:v": "font-family: Verdana, Geneva, sans-serif;",
				fef: "font-effect:|;",
				"fef:n": "font-effect:none;",
				"fef:eg": "font-effect:engrave;",
				"fef:eb": "font-effect:emboss;",
				"fef:o": "font-effect:outline;",
				fem: "font-emphasize:|;",
				femp: "font-emphasize-position:|;",
				"femp:b": "font-emphasize-position:before;",
				"femp:a": "font-emphasize-position:after;",
				fems: "font-emphasize-style:|;",
				"fems:n": "font-emphasize-style:none;",
				"fems:ac": "font-emphasize-style:accent;",
				"fems:dt": "font-emphasize-style:dot;",
				"fems:c": "font-emphasize-style:circle;",
				"fems:ds": "font-emphasize-style:disc;",
				fsm: "font-smooth:|;",
				"fsm:a": "font-smooth:auto;",
				"fsm:n": "font-smooth:never;",
				"fsm:aw": "font-smooth:always;",
				fst: "font-stretch:|;",
				"fst:n": "font-stretch:normal;",
				"fst:uc": "font-stretch:ultra-condensed;",
				"fst:ec": "font-stretch:extra-condensed;",
				"fst:c": "font-stretch:condensed;",
				"fst:sc": "font-stretch:semi-condensed;",
				"fst:se": "font-stretch:semi-expanded;",
				"fst:e": "font-stretch:expanded;",
				"fst:ee": "font-stretch:extra-expanded;",
				"fst:ue": "font-stretch:ultra-expanded;",
				op: "opacity:|;",
				"op+": "opacity: $1;\nfilter: alpha(opacity=$2);",
				"op:ie": "filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=100);",
				"op:ms": "-ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=100)';",
				rsz: "resize:|;",
				"rsz:n": "resize:none;",
				"rsz:b": "resize:both;",
				"rsz:h": "resize:horizontal;",
				"rsz:v": "resize:vertical;",
				cur: "cursor:${pointer};",
				"cur:a": "cursor:auto;",
				"cur:d": "cursor:default;",
				"cur:c": "cursor:crosshair;",
				"cur:ha": "cursor:hand;",
				"cur:he": "cursor:help;",
				"cur:m": "cursor:move;",
				"cur:p": "cursor:pointer;",
				"cur:t": "cursor:text;",
				pgbb: "page-break-before:|;",
				"pgbb:au": "page-break-before:auto;",
				"pgbb:al": "page-break-before:always;",
				"pgbb:l": "page-break-before:left;",
				"pgbb:r": "page-break-before:right;",
				pgbi: "page-break-inside:|;",
				"pgbi:au": "page-break-inside:auto;",
				"pgbi:av": "page-break-inside:avoid;",
				pgba: "page-break-after:|;",
				"pgba:au": "page-break-after:auto;",
				"pgba:al": "page-break-after:always;",
				"pgba:l": "page-break-after:left;",
				"pgba:r": "page-break-after:right;",
				orp: "orphans:|;",
				us: "user-select:${none};",
				wid: "widows:|;",
				wfsm: "-webkit-font-smoothing:${antialiased};",
				"wfsm:a": "-webkit-font-smoothing:antialiased;",
				"wfsm:s": "-webkit-font-smoothing:subpixel-antialiased;",
				"wfsm:sa": "-webkit-font-smoothing:subpixel-antialiased;",
				"wfsm:n": "-webkit-font-smoothing:none;"
			}
		},
		html: {
			filters: "html",
			profile: "html",
			snippets: {
				"!!!": "<!doctype html>",
				"!!!4t": '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
				"!!!4s": '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">',
				"!!!xt": '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
				"!!!xs": '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">',
				"!!!xxs": '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">',
				c: "<!-- |${child} -->",
				"cc:ie6": "<!--[if lte IE 6]>\n\t${child}|\n<![endif]-->",
				"cc:ie": "<!--[if IE]>\n\t${child}|\n<![endif]-->",
				"cc:noie": "<!--[if !IE]><!-->\n\t${child}|\n<!--<![endif]-->"
			},
			abbreviations: {
				"!": "html:5",
				a: '<a href="">',
				"a:link": '<a href="http://|">',
				"a:mail": '<a href="mailto:|">',
				abbr: '<abbr title="">',
				acronym: '<acronym title="">',
				base: '<base href="" />',
				basefont: "<basefont/>",
				br: "<br/>",
				frame: "<frame/>",
				hr: "<hr/>",
				bdo: '<bdo dir="">',
				"bdo:r": '<bdo dir="rtl">',
				"bdo:l": '<bdo dir="ltr">',
				col: "<col/>",
				link: '<link rel="stylesheet" href="" />',
				"link:css": '<link rel="stylesheet" href="${1:style}.css" />',
				"link:print": '<link rel="stylesheet" href="${1:print}.css" media="print" />',
				"link:favicon": '<link rel="shortcut icon" type="image/x-icon" href="${1:favicon.ico}" />',
				"link:touch": '<link rel="apple-touch-icon" href="${1:favicon.png}" />',
				"link:rss": '<link rel="alternate" type="application/rss+xml" title="RSS" href="${1:rss.xml}" />',
				"link:atom": '<link rel="alternate" type="application/atom+xml" title="Atom" href="${1:atom.xml}" />',
				meta: "<meta/>",
				"meta:utf": '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />',
				"meta:win": '<meta http-equiv="Content-Type" content="text/html;charset=windows-1251" />',
				"meta:vp": '<meta name="viewport" content="width=${1:device-width}, user-scalable=${2:no}, initial-scale=${3:1.0}, maximum-scale=${4:1.0}, minimum-scale=${5:1.0}" />',
				"meta:compat": '<meta http-equiv="X-UA-Compatible" content="${1:IE=7}" />',
				style: "<style>",
				script: "<script>",
				"script:src": '<script src="">',
				img: '<img src="" alt="" />',
				iframe: '<iframe src="" frameborder="0">',
				embed: '<embed src="" type="" />',
				object: '<object data="" type="">',
				param: '<param name="" value="" />',
				map: '<map name="">',
				area: '<area shape="" coords="" href="" alt="" />',
				"area:d": '<area shape="default" href="" alt="" />',
				"area:c": '<area shape="circle" coords="" href="" alt="" />',
				"area:r": '<area shape="rect" coords="" href="" alt="" />',
				"area:p": '<area shape="poly" coords="" href="" alt="" />',
				form: '<form action="">',
				"form:get": '<form action="" method="get">',
				"form:post": '<form action="" method="post">',
				label: '<label for="">',
				input: '<input type="${1:text}" />',
				inp: '<input type="${1:text}" name="" id="" />',
				"input:hidden": "input[type=hidden name]",
				"input:h": "input:hidden",
				"input:text": "inp",
				"input:t": "inp",
				"input:search": "inp[type=search]",
				"input:email": "inp[type=email]",
				"input:url": "inp[type=url]",
				"input:password": "inp[type=password]",
				"input:p": "input:password",
				"input:datetime": "inp[type=datetime]",
				"input:date": "inp[type=date]",
				"input:datetime-local": "inp[type=datetime-local]",
				"input:month": "inp[type=month]",
				"input:week": "inp[type=week]",
				"input:time": "inp[type=time]",
				"input:number": "inp[type=number]",
				"input:color": "inp[type=color]",
				"input:checkbox": "inp[type=checkbox]",
				"input:c": "input:checkbox",
				"input:radio": "inp[type=radio]",
				"input:r": "input:radio",
				"input:range": "inp[type=range]",
				"input:file": "inp[type=file]",
				"input:f": "input:file",
				"input:submit": '<input type="submit" value="" />',
				"input:s": "input:submit",
				"input:image": '<input type="image" src="" alt="" />',
				"input:i": "input:image",
				"input:button": '<input type="button" value="" />',
				"input:b": "input:button",
				isindex: "<isindex/>",
				"input:reset": "input:button[type=reset]",
				select: '<select name="" id="">',
				"select:disabled": "select[disabled]",
				"select:d": "select[disabled]",
				option: '<option value="">',
				textarea: '<textarea name="" id="" cols="${1:30}" rows="${2:10}">',
				marquee: '<marquee behavior="" direction="">',
				"menu:context": "menu[type=context]>",
				"menu:c": "menu:context",
				"menu:toolbar": "menu[type=toolbar]>",
				"menu:t": "menu:toolbar",
				video: '<video src="">',
				audio: '<audio src="">',
				"html:xml": '<html xmlns="http://www.w3.org/1999/xhtml">',
				keygen: "<keygen/>",
				command: "<command/>",
				"button:submit": "button[type=submit]",
				"button:s": "button[type=submit]",
				"button:reset": "button[type=reset]",
				"button:r": "button[type=reset]",
				"button:disabled": "button[disabled]",
				"button:d": "button[disabled]",
				"fieldset:disabled": "fieldset[disabled]",
				"fieldset:d": "fieldset[disabled]",
				bq: "blockquote",
				acr: "acronym",
				fig: "figure",
				figc: "figcaption",
				ifr: "iframe",
				emb: "embed",
				obj: "object",
				src: "source",
				cap: "caption",
				colg: "colgroup",
				fst: "fieldset",
				"fst:d": "fieldset[disabled]",
				btn: "button",
				"btn:b": "button[type=button]",
				"btn:r": "button[type=reset]",
				"btn:s": "button[type=submit]",
				"btn:d": "button[disabled]",
				optg: "optgroup",
				opt: "option",
				tarea: "textarea",
				leg: "legend",
				sect: "section",
				art: "article",
				hdr: "header",
				ftr: "footer",
				adr: "address",
				dlg: "dialog",
				str: "strong",
				prog: "progress",
				fset: "fieldset",
				"fset:d": "fieldset[disabled]",
				datag: "datagrid",
				datal: "datalist",
				kg: "keygen",
				out: "output",
				det: "details",
				cmd: "command",
				doc: "html>(head>meta[charset=UTF-8]+title{${1:Document}})+body",
				doc4: 'html>(head>meta[http-equiv="Content-Type" content="text/html;charset=${charset}"]+title{${1:Document}})+body',
				"html:4t": "!!!4t+doc4[lang=${lang}]",
				"html:4s": "!!!4s+doc4[lang=${lang}]",
				"html:xt": "!!!xt+doc4[xmlns=http://www.w3.org/1999/xhtml xml:lang=${lang}]",
				"html:xs": "!!!xs+doc4[xmlns=http://www.w3.org/1999/xhtml xml:lang=${lang}]",
				"html:xxs": "!!!xxs+doc4[xmlns=http://www.w3.org/1999/xhtml xml:lang=${lang}]",
				"html:5": "!!!+doc[lang=${lang}]",
				"ol+": "ol>li",
				"ul+": "ul>li",
				"dl+": "dl>dt+dd",
				"map+": "map>area",
				"table+": "table>tr>td",
				"colgroup+": "colgroup>col",
				"colg+": "colgroup>col",
				"tr+": "tr>td",
				"select+": "select>option",
				"optgroup+": "optgroup>option",
				"optg+": "optgroup>option"
			}
		},
		xml: {
			"extends": "html",
			profile: "xml",
			filters: "html"
		},
		xsl: {
			"extends": "html",
			profile: "xml",
			filters: "html, xsl",
			abbreviations: {
				tm: '<xsl:template match="" mode="">',
				tmatch: "tm",
				tn: '<xsl:template name="">',
				tname: "tn",
				call: '<xsl:call-template name=""/>',
				ap: '<xsl:apply-templates select="" mode=""/>',
				api: "<xsl:apply-imports/>",
				imp: '<xsl:import href=""/>',
				inc: '<xsl:include href=""/>',
				ch: "<xsl:choose>",
				"xsl:when": '<xsl:when test="">',
				wh: "xsl:when",
				ot: "<xsl:otherwise>",
				"if": '<xsl:if test="">',
				par: '<xsl:param name="">',
				pare: '<xsl:param name="" select=""/>',
				"var": '<xsl:variable name="">',
				vare: '<xsl:variable name="" select=""/>',
				wp: '<xsl:with-param name="" select=""/>',
				key: '<xsl:key name="" match="" use=""/>',
				elem: '<xsl:element name="">',
				attr: '<xsl:attribute name="">',
				attrs: '<xsl:attribute-set name="">',
				cp: '<xsl:copy select=""/>',
				co: '<xsl:copy-of select=""/>',
				val: '<xsl:value-of select=""/>',
				each: '<xsl:for-each select="">',
				"for": "each",
				tex: "<xsl:text></xsl:text>",
				com: "<xsl:comment>",
				msg: '<xsl:message terminate="no">',
				fall: "<xsl:fallback>",
				num: '<xsl:number value=""/>',
				nam: '<namespace-alias stylesheet-prefix="" result-prefix=""/>',
				pres: '<xsl:preserve-space elements=""/>',
				strip: '<xsl:strip-space elements=""/>',
				proc: '<xsl:processing-instruction name="">',
				sort: '<xsl:sort select="" order=""/>',
				"choose+": "xsl:choose>xsl:when+xsl:otherwise",
				xsl: "!!!+xsl:stylesheet[version=1.0 xmlns:xsl=http://www.w3.org/1999/XSL/Transform]>{\n|}"
			},
			snippets: {
				"!!!": '<?xml version="1.0" encoding="UTF-8"?>'
			}
		},
		haml: {
			filters: "haml",
			"extends": "html",
			profile: "xml"
		},
		scss: {
			"extends": "css"
		},
		sass: {
			"extends": "css"
		},
		less: {
			"extends": "css"
		},
		stylus: {
			"extends": "css"
		},
		styl: {
			"extends": "stylus"
		}
	};
	var d = c("resources");
	var a = d.getVocabulary("user") || {};
	d.setVocabulary(c("utils").deepMerge(a, e), "user")
});
