/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.3.3 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, https://github.com/requirejs/requirejs/blob/master/LICENSE
 */
var requirejs, require, define;
!function (global, setTimeout) {
    function commentReplace(e, t) {
        return t || ""
    }

    function isFunction(e) {
        return "[object Function]" === ostring.call(e)
    }

    function isArray(e) {
        return "[object Array]" === ostring.call(e)
    }

    function each(e, t) {
        if (e) {
            var i;
            for (i = 0; i < e.length && (!e[i] || !t(e[i], i, e)); i += 1) ;
        }
    }

    function eachReverse(e, t) {
        if (e) {
            var i;
            for (i = e.length - 1; i > -1 && (!e[i] || !t(e[i], i, e)); i -= 1) ;
        }
    }

    function hasProp(e, t) {
        return hasOwn.call(e, t)
    }

    function getOwn(e, t) {
        return hasProp(e, t) && e[t]
    }

    function eachProp(e, t) {
        var i;
        for (i in e) if (hasProp(e, i) && t(e[i], i)) break
    }

    function mixin(e, t, i, r) {
        return t && eachProp(t, function (t, n) {
            !i && hasProp(e, n) || (!r || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? e[n] = t : (e[n] || (e[n] = {}), mixin(e[n], t, i, r)))
        }), e
    }

    function bind(e, t) {
        return function () {
            return t.apply(e, arguments)
        }
    }

    function scripts() {
        return document.getElementsByTagName("script")
    }

    function defaultOnError(e) {
        throw e
    }

    function getGlobal(e) {
        if (!e) return e;
        var t = global;
        return each(e.split("."), function (e) {
            t = t[e]
        }), t
    }

    function makeError(e, t, i, r) {
        var n = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
        return n.requireType = e, n.requireModules = r, i && (n.originalError = i), n
    }

    function newContext(e) {
        function t(e) {
            var t, i;
            for (t = 0; t < e.length; t++) if (i = e[t], "." === i) e.splice(t, 1), t -= 1; else if (".." === i) {
                if (0 === t || 1 === t && ".." === e[2] || ".." === e[t - 1]) continue;
                t > 0 && (e.splice(t - 1, 2), t -= 2)
            }
        }

        function i(e, i, r) {
            var n, o, a, s, u, c, d, p, f, l, h, m, g = i && i.split("/"), v = y.map, x = v && v["*"];
            if (e && (e = e.split("/"), d = e.length - 1, y.nodeIdCompat && jsSuffixRegExp.test(e[d]) && (e[d] = e[d].replace(jsSuffixRegExp, "")), "." === e[0].charAt(0) && g && (m = g.slice(0, g.length - 1), e = m.concat(e)), t(e), e = e.join("/")), r && v && (g || x)) {
                a = e.split("/");
                e:for (s = a.length; s > 0; s -= 1) {
                    if (c = a.slice(0, s).join("/"), g) for (u = g.length; u > 0; u -= 1) if (o = getOwn(v, g.slice(0, u).join("/")), o && (o = getOwn(o, c))) {
                        p = o, f = s;
                        break e
                    }
                    !l && x && getOwn(x, c) && (l = getOwn(x, c), h = s)
                }
                !p && l && (p = l, f = h), p && (a.splice(0, f, p), e = a.join("/"))
            }
            return n = getOwn(y.pkgs, e), n ? n : e
        }

        function r(e) {
            isBrowser && each(scripts(), function (t) {
                if (t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === q.contextName) return t.parentNode.removeChild(t), !0
            })
        }

        function n(e) {
            var t = getOwn(y.paths, e);
            if (t && isArray(t) && t.length > 1) return t.shift(), q.require.undef(e), q.makeRequire(null, {skipMap: !0})([e]), !0
        }

        function o(e) {
            var t, i = e ? e.indexOf("!") : -1;
            return i > -1 && (t = e.substring(0, i), e = e.substring(i + 1, e.length)), [t, e]
        }

        function a(e, t, r, n) {
            var a, s, u, c, d = null, p = t ? t.name : null, f = e, l = !0, h = "";
            return e || (l = !1, e = "_@r" + (T += 1)), c = o(e), d = c[0], e = c[1], d && (d = i(d, p, n), s = getOwn(j, d)), e && (d ? h = r ? e : s && s.normalize ? s.normalize(e, function (e) {
                return i(e, p, n)
            }) : e.indexOf("!") === -1 ? i(e, p, n) : e : (h = i(e, p, n), c = o(h), d = c[0], h = c[1], r = !0, a = q.nameToUrl(h))), u = !d || s || r ? "" : "_unnormalized" + (A += 1), {
                prefix: d,
                name: h,
                parentMap: t,
                unnormalized: !!u,
                url: a,
                originalName: f,
                isDefine: l,
                id: (d ? d + "!" + h : h) + u
            }
        }

        function s(e) {
            var t = e.id, i = getOwn(S, t);
            return i || (i = S[t] = new q.Module(e)), i
        }

        function u(e, t, i) {
            var r = e.id, n = getOwn(S, r);
            !hasProp(j, r) || n && !n.defineEmitComplete ? (n = s(e), n.error && "error" === t ? i(n.error) : n.on(t, i)) : "defined" === t && i(j[r])
        }

        function c(e, t) {
            var i = e.requireModules, r = !1;
            t ? t(e) : (each(i, function (t) {
                var i = getOwn(S, t);
                i && (i.error = e, i.events.error && (r = !0, i.emit("error", e)))
            }), r || req.onError(e))
        }

        function d() {
            globalDefQueue.length && (each(globalDefQueue, function (e) {
                var t = e[0];
                "string" == typeof t && (q.defQueueMap[t] = !0), O.push(e)
            }), globalDefQueue = [])
        }

        function p(e) {
            delete S[e], delete k[e]
        }

        function f(e, t, i) {
            var r = e.map.id;
            e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps, function (r, n) {
                var o = r.id, a = getOwn(S, o);
                !a || e.depMatched[n] || i[o] || (getOwn(t, o) ? (e.defineDep(n, j[o]), e.check()) : f(a, t, i))
            }), i[r] = !0)
        }

        function l() {
            var e, t, i = 1e3 * y.waitSeconds, o = i && q.startTime + i < (new Date).getTime(), a = [], s = [], u = !1,
                d = !0;
            if (!x) {
                if (x = !0, eachProp(k, function (e) {
                    var i = e.map, c = i.id;
                    if (e.enabled && (i.isDefine || s.push(e), !e.error)) if (!e.inited && o) n(c) ? (t = !0, u = !0) : (a.push(c), r(c)); else if (!e.inited && e.fetched && i.isDefine && (u = !0, !i.prefix)) return d = !1
                }), o && a.length) return e = makeError("timeout", "Load timeout for modules: " + a, null, a), e.contextName = q.contextName, c(e);
                d && each(s, function (e) {
                    f(e, {}, {})
                }), o && !t || !u || !isBrowser && !isWebWorker || w || (w = setTimeout(function () {
                    w = 0, l()
                }, 50)), x = !1
            }
        }

        function h(e) {
            hasProp(j, e[0]) || s(a(e[0], null, !0)).init(e[1], e[2])
        }

        function m(e, t, i, r) {
            e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(i, t, !1)
        }

        function g(e) {
            var t = e.currentTarget || e.srcElement;
            return m(t, q.onScriptLoad, "load", "onreadystatechange"), m(t, q.onScriptError, "error"), {
                node: t,
                id: t && t.getAttribute("data-requiremodule")
            }
        }

        function v() {
            var e;
            for (d(); O.length;) {
                if (e = O.shift(), null === e[0]) return c(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                h(e)
            }
            q.defQueueMap = {}
        }

        var x, b, q, E, w, y = {waitSeconds: 7, baseUrl: "./", paths: {}, bundles: {}, pkgs: {}, shim: {}, config: {}},
            S = {}, k = {}, M = {}, O = [], j = {}, P = {}, R = {}, T = 1, A = 1;
        return E = {
            require: function (e) {
                return e.require ? e.require : e.require = q.makeRequire(e.map)
            }, exports: function (e) {
                if (e.usingExports = !0, e.map.isDefine) return e.exports ? j[e.map.id] = e.exports : e.exports = j[e.map.id] = {}
            }, module: function (e) {
                return e.module ? e.module : e.module = {
                    id: e.map.id, uri: e.map.url, config: function () {
                        return getOwn(y.config, e.map.id) || {}
                    }, exports: e.exports || (e.exports = {})
                }
            }
        }, b = function (e) {
            this.events = getOwn(M, e.id) || {}, this.map = e, this.shim = getOwn(y.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
        }, b.prototype = {
            init: function (e, t, i, r) {
                r = r || {}, this.inited || (this.factory = t, i ? this.on("error", i) : this.events.error && (i = bind(this, function (e) {
                    this.emit("error", e)
                })), this.depMaps = e && e.slice(0), this.errback = i, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check())
            }, defineDep: function (e, t) {
                this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
            }, fetch: function () {
                if (!this.fetched) {
                    this.fetched = !0, q.startTime = (new Date).getTime();
                    var e = this.map;
                    return this.shim ? void q.makeRequire(this.map, {enableBuildCallback: !0})(this.shim.deps || [], bind(this, function () {
                        return e.prefix ? this.callPlugin() : this.load()
                    })) : e.prefix ? this.callPlugin() : this.load()
                }
            }, load: function () {
                var e = this.map.url;
                P[e] || (P[e] = !0, q.load(this.map.id, e))
            }, check: function () {
                if (this.enabled && !this.enabling) {
                    var e, t, i = this.map.id, r = this.depExports, n = this.exports, o = this.factory;
                    if (this.inited) {
                        if (this.error) this.emit("error", this.error); else if (!this.defining) {
                            if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                if (isFunction(o)) {
                                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                        n = q.execCb(i, o, r, n)
                                    } catch (t) {
                                        e = t
                                    } else n = q.execCb(i, o, r, n);
                                    if (this.map.isDefine && void 0 === n && (t = this.module, t ? n = t.exports : this.usingExports && (n = this.exports)), e) return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", c(this.error = e)
                                } else n = o;
                                if (this.exports = n, this.map.isDefine && !this.ignore && (j[i] = n, req.onResourceLoad)) {
                                    var a = [];
                                    each(this.depMaps, function (e) {
                                        a.push(e.normalizedMap || e)
                                    }), req.onResourceLoad(q, this.map, a)
                                }
                                p(i), this.defined = !0
                            }
                            this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                        }
                    } else hasProp(q.defQueueMap, i) || this.fetch()
                }
            }, callPlugin: function () {
                var e = this.map, t = e.id, r = a(e.prefix);
                this.depMaps.push(r), u(r, "defined", bind(this, function (r) {
                    var n, o, d, f = getOwn(R, this.map.id), l = this.map.name,
                        h = this.map.parentMap ? this.map.parentMap.name : null,
                        m = q.makeRequire(e.parentMap, {enableBuildCallback: !0});
                    return this.map.unnormalized ? (r.normalize && (l = r.normalize(l, function (e) {
                        return i(e, h, !0)
                    }) || ""), o = a(e.prefix + "!" + l, this.map.parentMap, !0), u(o, "defined", bind(this, function (e) {
                        this.map.normalizedMap = o, this.init([], function () {
                            return e
                        }, null, {enabled: !0, ignore: !0})
                    })), d = getOwn(S, o.id), void(d && (this.depMaps.push(o), this.events.error && d.on("error", bind(this, function (e) {
                        this.emit("error", e)
                    })), d.enable()))) : f ? (this.map.url = q.nameToUrl(f), void this.load()) : (n = bind(this, function (e) {
                        this.init([], function () {
                            return e
                        }, null, {enabled: !0})
                    }), n.error = bind(this, function (e) {
                        this.inited = !0, this.error = e, e.requireModules = [t], eachProp(S, function (e) {
                            0 === e.map.id.indexOf(t + "_unnormalized") && p(e.map.id)
                        }), c(e)
                    }), n.fromText = bind(this, function (i, r) {
                        var o = e.name, u = a(o), d = useInteractive;
                        r && (i = r), d && (useInteractive = !1), s(u), hasProp(y.config, t) && (y.config[o] = y.config[t]);
                        try {
                            req.exec(i)
                        } catch (e) {
                            return c(makeError("fromtexteval", "fromText eval for " + t + " failed: " + e, e, [t]))
                        }
                        d && (useInteractive = !0), this.depMaps.push(u), q.completeLoad(o), m([o], n)
                    }), void r.load(e.name, m, n, y))
                })), q.enable(r, this), this.pluginMaps[r.id] = r
            }, enable: function () {
                k[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function (e, t) {
                    var i, r, n;
                    if ("string" == typeof e) {
                        if (e = a(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, n = getOwn(E, e.id)) return void(this.depExports[t] = n(this));
                        this.depCount += 1, u(e, "defined", bind(this, function (e) {
                            this.undefed || (this.defineDep(t, e), this.check())
                        })), this.errback ? u(e, "error", bind(this, this.errback)) : this.events.error && u(e, "error", bind(this, function (e) {
                            this.emit("error", e)
                        }))
                    }
                    i = e.id, r = S[i], hasProp(E, i) || !r || r.enabled || q.enable(e, this)
                })), eachProp(this.pluginMaps, bind(this, function (e) {
                    var t = getOwn(S, e.id);
                    t && !t.enabled && q.enable(e, this)
                })), this.enabling = !1, this.check()
            }, on: function (e, t) {
                var i = this.events[e];
                i || (i = this.events[e] = []), i.push(t)
            }, emit: function (e, t) {
                each(this.events[e], function (e) {
                    e(t)
                }), "error" === e && delete this.events[e]
            }
        }, q = {
            config: y,
            contextName: e,
            registry: S,
            defined: j,
            urlFetched: P,
            defQueue: O,
            defQueueMap: {},
            Module: b,
            makeModuleMap: a,
            nextTick: req.nextTick,
            onError: c,
            configure: function (e) {
                if (e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/"), "string" == typeof e.urlArgs) {
                    var t = e.urlArgs;
                    e.urlArgs = function (e, i) {
                        return (i.indexOf("?") === -1 ? "?" : "&") + t
                    }
                }
                var i = y.shim, r = {paths: !0, bundles: !0, config: !0, map: !0};
                eachProp(e, function (e, t) {
                    r[t] ? (y[t] || (y[t] = {}), mixin(y[t], e, !0, !0)) : y[t] = e
                }), e.bundles && eachProp(e.bundles, function (e, t) {
                    each(e, function (e) {
                        e !== t && (R[e] = t)
                    })
                }), e.shim && (eachProp(e.shim, function (e, t) {
                    isArray(e) && (e = {deps: e}), !e.exports && !e.init || e.exportsFn || (e.exportsFn = q.makeShimExports(e)), i[t] = e
                }), y.shim = i), e.packages && each(e.packages, function (e) {
                    var t, i;
                    e = "string" == typeof e ? {name: e} : e, i = e.name, t = e.location, t && (y.paths[i] = e.location), y.pkgs[i] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                }), eachProp(S, function (e, t) {
                    e.inited || e.map.unnormalized || (e.map = a(t, null, !0))
                }), (e.deps || e.callback) && q.require(e.deps || [], e.callback)
            },
            makeShimExports: function (e) {
                function t() {
                    var t;
                    return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
                }

                return t
            },
            makeRequire: function (t, n) {
                function o(i, r, u) {
                    var d, p, f;
                    return n.enableBuildCallback && r && isFunction(r) && (r.__requireJsBuild = !0), "string" == typeof i ? isFunction(r) ? c(makeError("requireargs", "Invalid require call"), u) : t && hasProp(E, i) ? E[i](S[t.id]) : req.get ? req.get(q, i, t, o) : (p = a(i, t, !1, !0), d = p.id, hasProp(j, d) ? j[d] : c(makeError("notloaded", 'Module name "' + d + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (v(), q.nextTick(function () {
                        v(), f = s(a(null, t)), f.skipMap = n.skipMap, f.init(i, r, u, {enabled: !0}), l()
                    }), o)
                }

                return n = n || {}, mixin(o, {
                    isBrowser: isBrowser, toUrl: function (e) {
                        var r, n = e.lastIndexOf("."), o = e.split("/")[0], a = "." === o || ".." === o;
                        return n !== -1 && (!a || n > 1) && (r = e.substring(n, e.length), e = e.substring(0, n)), q.nameToUrl(i(e, t && t.id, !0), r, !0)
                    }, defined: function (e) {
                        return hasProp(j, a(e, t, !1, !0).id)
                    }, specified: function (e) {
                        return e = a(e, t, !1, !0).id, hasProp(j, e) || hasProp(S, e)
                    }
                }), t || (o.undef = function (e) {
                    d();
                    var i = a(e, t, !0), n = getOwn(S, e);
                    n.undefed = !0, r(e), delete j[e], delete P[i.url], delete M[e], eachReverse(O, function (t, i) {
                        t[0] === e && O.splice(i, 1)
                    }), delete q.defQueueMap[e], n && (n.events.defined && (M[e] = n.events), p(e))
                }), o
            },
            enable: function (e) {
                var t = getOwn(S, e.id);
                t && s(e).enable()
            },
            completeLoad: function (e) {
                var t, i, r, o = getOwn(y.shim, e) || {}, a = o.exports;
                for (d(); O.length;) {
                    if (i = O.shift(), null === i[0]) {
                        if (i[0] = e, t) break;
                        t = !0
                    } else i[0] === e && (t = !0);
                    h(i)
                }
                if (q.defQueueMap = {}, r = getOwn(S, e), !t && !hasProp(j, e) && r && !r.inited) {
                    if (!(!y.enforceDefine || a && getGlobal(a))) return n(e) ? void 0 : c(makeError("nodefine", "No define call for " + e, null, [e]));
                    h([e, o.deps || [], o.exportsFn])
                }
                l()
            },
            nameToUrl: function (e, t, i) {
                var r, n, o, a, s, u, c, d = getOwn(y.pkgs, e);
                if (d && (e = d), c = getOwn(R, e)) return q.nameToUrl(c, t, i);
                if (req.jsExtRegExp.test(e)) s = e + (t || ""); else {
                    for (r = y.paths, n = e.split("/"), o = n.length; o > 0; o -= 1) if (a = n.slice(0, o).join("/"), u = getOwn(r, a)) {
                        isArray(u) && (u = u[0]), n.splice(0, o, u);
                        break
                    }
                    s = n.join("/"), s += t || (/^data\:|^blob\:|\?/.test(s) || i ? "" : ".js"), s = ("/" === s.charAt(0) || s.match(/^[\w\+\.\-]+:/) ? "" : y.baseUrl) + s
                }
                return y.urlArgs && !/^blob\:/.test(s) ? s + y.urlArgs(e, s) : s
            },
            load: function (e, t) {
                req.load(q, e, t)
            },
            execCb: function (e, t, i, r) {
                return t.apply(r, i)
            },
            onScriptLoad: function (e) {
                if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                    interactiveScript = null;
                    var t = g(e);
                    q.completeLoad(t.id)
                }
            },
            onScriptError: function (e) {
                var t = g(e);
                if (!n(t.id)) {
                    var i = [];
                    return eachProp(S, function (e, r) {
                        0 !== r.indexOf("_@r") && each(e.depMaps, function (e) {
                            if (e.id === t.id) return i.push(r), !0
                        })
                    }), c(makeError("scripterror", 'Script error for "' + t.id + (i.length ? '", needed by: ' + i.join(", ") : '"'), e, [t.id]))
                }
            }
        }, q.require = q.makeRequire(), q
    }

    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function (e) {
            if ("interactive" === e.readyState) return interactiveScript = e
        }), interactiveScript)
    }

    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = "2.3.3", commentRegExp = /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/gm,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//, op = Object.prototype, ostring = op.toString, hasOwn = op.hasOwnProperty,
        isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
        isWebWorker = !isBrowser && "undefined" != typeof importScripts,
        readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_", isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
        contexts = {}, cfg = {}, globalDefQueue = [], useInteractive = !1;
    if ("undefined" == typeof define) {
        if ("undefined" != typeof requirejs) {
            if (isFunction(requirejs)) return;
            cfg = requirejs, requirejs = void 0
        }
        "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function (e, t, i, r) {
            var n, o, a = defContextName;
            return isArray(e) || "string" == typeof e || (o = e, isArray(t) ? (e = t, t = i, i = r) : e = []), o && o.context && (a = o.context), n = getOwn(contexts, a), n || (n = contexts[a] = req.s.newContext(a)), o && n.configure(o), n.require(e, t, i)
        }, req.config = function (e) {
            return req(e)
        }, req.nextTick = "undefined" != typeof setTimeout ? function (e) {
            setTimeout(e, 4)
        } : function (e) {
            e()
        }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
            contexts: contexts,
            newContext: newContext
        }, req({}), each(["toUrl", "undef", "defined", "specified"], function (e) {
            req[e] = function () {
                var t = contexts[defContextName];
                return t.require[e].apply(t, arguments)
            }
        }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function (e, t, i) {
            var r = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            return r.type = e.scriptType || "text/javascript", r.charset = "utf-8", r.async = !0, r
        }, req.load = function (e, t, i) {
            var r, n = e && e.config || {};
            if (isBrowser) return r = req.createNode(n, t, i), r.setAttribute("data-requirecontext", e.contextName), r.setAttribute("data-requiremodule", t), !r.attachEvent || r.attachEvent.toString && r.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (r.addEventListener("load", e.onScriptLoad, !1), r.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, r.attachEvent("onreadystatechange", e.onScriptLoad)), r.src = i, n.onNodeCreated && n.onNodeCreated(r, n, t, i), currentlyAddingScript = r, baseElement ? head.insertBefore(r, baseElement) : head.appendChild(r), currentlyAddingScript = null, r;
            if (isWebWorker) try {
                setTimeout(function () {
                }, 0), importScripts(i), e.completeLoad(t)
            } catch (r) {
                e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + i, r, [t]))
            }
        }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function (e) {
            if (head || (head = e.parentNode), dataMain = e.getAttribute("data-main")) return mainScript = dataMain, cfg.baseUrl || mainScript.indexOf("!") !== -1 || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0
        }), define = function (e, t, i) {
            var r, n;
            "string" != typeof e && (i = t, t = e, e = null), isArray(t) || (i = t, t = null), !t && isFunction(i) && (t = [], i.length && (i.toString().replace(commentRegExp, commentReplace).replace(cjsRequireRegExp, function (e, i) {
                t.push(i)
            }), t = (1 === i.length ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), n = contexts[r.getAttribute("data-requirecontext")])), n ? (n.defQueue.push([e, t, i]), n.defQueueMap[e] = !0) : globalDefQueue.push([e, t, i])
        }, define.amd = {jQuery: !0}, req.exec = function (text) {
            return eval(text)
        }, req(cfg)
    }
}(this, "undefined" == typeof setTimeout ? void 0 : setTimeout);

define("requireLib", function () {
});


/*! jQuery v2.2.4 | (c) jQuery Foundation | jquery.org/license */
!function (a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function (a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function (a, b) {
    var c = [], d = a.document, e = c.slice, f = c.concat, g = c.push, h = c.indexOf, i = {}, j = i.toString,
        k = i.hasOwnProperty, l = {}, m = "2.2.4", n = function (a, b) {
            return new n.fn.init(a, b)
        }, o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, p = /^-ms-/, q = /-([\da-z])/gi, r = function (a, b) {
            return b.toUpperCase()
        };
    n.fn = n.prototype = {
        jquery: m, constructor: n, selector: "", length: 0, toArray: function () {
            return e.call(this)
        }, get: function (a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : e.call(this)
        }, pushStack: function (a) {
            var b = n.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b
        }, each: function (a) {
            return n.each(this, a)
        }, map: function (a) {
            return this.pushStack(n.map(this, function (b, c) {
                return a.call(b, c, b)
            }))
        }, slice: function () {
            return this.pushStack(e.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (a) {
            var b = this.length, c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        }, end: function () {
            return this.prevObject || this.constructor()
        }, push: g, sort: c.sort, splice: c.splice
    }, n.extend = n.fn.extend = function () {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++) if (null != (a = arguments[h])) for (b in a) c = g[b], d = a[b], g !== d && (j && d && (n.isPlainObject(d) || (e = n.isArray(d))) ? (e ? (e = !1, f = c && n.isArray(c) ? c : []) : f = c && n.isPlainObject(c) ? c : {}, g[b] = n.extend(j, f, d)) : void 0 !== d && (g[b] = d));
        return g
    }, n.extend({
        expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (a) {
            throw new Error(a)
        }, noop: function () {
        }, isFunction: function (a) {
            return "function" === n.type(a)
        }, isArray: Array.isArray, isWindow: function (a) {
            return null != a && a === a.window
        }, isNumeric: function (a) {
            var b = a && a.toString();
            return !n.isArray(a) && b - parseFloat(b) + 1 >= 0
        }, isPlainObject: function (a) {
            var b;
            if ("object" !== n.type(a) || a.nodeType || n.isWindow(a)) return !1;
            if (a.constructor && !k.call(a, "constructor") && !k.call(a.constructor.prototype || {}, "isPrototypeOf")) return !1;
            for (b in a) ;
            return void 0 === b || k.call(a, b)
        }, isEmptyObject: function (a) {
            var b;
            for (b in a) return !1;
            return !0
        }, type: function (a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? i[j.call(a)] || "object" : typeof a
        }, globalEval: function (a) {
            var b, c = eval;
            a = n.trim(a), a && (1 === a.indexOf("use strict") ? (b = d.createElement("script"), b.text = a, d.head.appendChild(b).parentNode.removeChild(b)) : c(a))
        }, camelCase: function (a) {
            return a.replace(p, "ms-").replace(q, r)
        }, nodeName: function (a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        }, each: function (a, b) {
            var c, d = 0;
            if (s(a)) {
                for (c = a.length; c > d; d++) if (b.call(a[d], d, a[d]) === !1) break
            } else for (d in a) if (b.call(a[d], d, a[d]) === !1) break;
            return a
        }, trim: function (a) {
            return null == a ? "" : (a + "").replace(o, "")
        }, makeArray: function (a, b) {
            var c = b || [];
            return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [a] : a) : g.call(c, a)), c
        }, inArray: function (a, b, c) {
            return null == b ? -1 : h.call(b, a, c)
        }, merge: function (a, b) {
            for (var c = +b.length, d = 0, e = a.length; c > d; d++) a[e++] = b[d];
            return a.length = e, a
        }, grep: function (a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e
        }, map: function (a, b, c) {
            var d, e, g = 0, h = [];
            if (s(a)) for (d = a.length; d > g; g++) e = b(a[g], g, c), null != e && h.push(e); else for (g in a) e = b(a[g], g, c), null != e && h.push(e);
            return f.apply([], h)
        }, guid: 1, proxy: function (a, b) {
            var c, d, f;
            return "string" == typeof b && (c = a[b], b = a, a = c), n.isFunction(a) ? (d = e.call(arguments, 2), f = function () {
                return a.apply(b || this, d.concat(e.call(arguments)))
            }, f.guid = a.guid = a.guid || n.guid++, f) : void 0
        }, now: Date.now, support: l
    }), "function" == typeof Symbol && (n.fn[Symbol.iterator] = c[Symbol.iterator]), n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (a, b) {
        i["[object " + b + "]"] = b.toLowerCase()
    });

    function s(a) {
        var b = !!a && "length" in a && a.length, c = n.type(a);
        return "function" === c || n.isWindow(a) ? !1 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }

    var t = function (a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + 1 * new Date, v = a.document, w = 0,
            x = 0, y = ga(), z = ga(), A = ga(), B = function (a, b) {
                return a === b && (l = !0), 0
            }, C = 1 << 31, D = {}.hasOwnProperty, E = [], F = E.pop, G = E.push, H = E.push, I = E.slice,
            J = function (a, b) {
                for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
                return -1
            },
            K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            L = "[\\x20\\t\\r\\n\\f]", M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            N = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + M + "))|)" + L + "*\\]",
            O = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + N + ")*)|.*)\\)|)",
            P = new RegExp(L + "+", "g"), Q = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
            R = new RegExp("^" + L + "*," + L + "*"), S = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
            T = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"), U = new RegExp(O),
            V = new RegExp("^" + M + "$"), W = {
                ID: new RegExp("^#(" + M + ")"),
                CLASS: new RegExp("^\\.(" + M + ")"),
                TAG: new RegExp("^(" + M + "|[*])"),
                ATTR: new RegExp("^" + N),
                PSEUDO: new RegExp("^" + O),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + K + ")$", "i"),
                needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
            }, X = /^(?:input|select|textarea|button)$/i, Y = /^h\d$/i, Z = /^[^{]+\{\s*\[native \w/,
            $ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, _ = /[+~]/, aa = /'|\\/g,
            ba = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"), ca = function (a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            }, da = function () {
                m()
            };
        try {
            H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType
        } catch (ea) {
            H = {
                apply: E.length ? function (a, b) {
                    G.apply(a, I.call(b))
                } : function (a, b) {
                    var c = a.length, d = 0;
                    while (a[c++] = b[d++]) ;
                    a.length = c - 1
                }
            }
        }

        function fa(a, b, d, e) {
            var f, h, j, k, l, o, r, s, w = b && b.ownerDocument, x = b ? b.nodeType : 9;
            if (d = d || [], "string" != typeof a || !a || 1 !== x && 9 !== x && 11 !== x) return d;
            if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, p)) {
                if (11 !== x && (o = $.exec(a))) if (f = o[1]) {
                    if (9 === x) {
                        if (!(j = b.getElementById(f))) return d;
                        if (j.id === f) return d.push(j), d
                    } else if (w && (j = w.getElementById(f)) && t(b, j) && j.id === f) return d.push(j), d
                } else {
                    if (o[2]) return H.apply(d, b.getElementsByTagName(a)), d;
                    if ((f = o[3]) && c.getElementsByClassName && b.getElementsByClassName) return H.apply(d, b.getElementsByClassName(f)), d
                }
                if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
                    if (1 !== x) w = b, s = a; else if ("object" !== b.nodeName.toLowerCase()) {
                        (k = b.getAttribute("id")) ? k = k.replace(aa, "\\$&") : b.setAttribute("id", k = u), r = g(a), h = r.length, l = V.test(k) ? "#" + k : "[id='" + k + "']";
                        while (h--) r[h] = l + " " + qa(r[h]);
                        s = r.join(","), w = _.test(a) && oa(b.parentNode) || b
                    }
                    if (s) try {
                        return H.apply(d, w.querySelectorAll(s)), d
                    } catch (y) {
                    } finally {
                        k === u && b.removeAttribute("id")
                    }
                }
            }
            return i(a.replace(Q, "$1"), b, d, e)
        }

        function ga() {
            var a = [];

            function b(c, e) {
                return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
            }

            return b
        }

        function ha(a) {
            return a[u] = !0, a
        }

        function ia(a) {
            var b = n.createElement("div");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function ja(a, b) {
            var c = a.split("|"), e = c.length;
            while (e--) d.attrHandle[c[e]] = b
        }

        function ka(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
            if (d) return d;
            if (c) while (c = c.nextSibling) if (c === b) return -1;
            return a ? 1 : -1
        }

        function la(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }

        function ma(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function na(a) {
            return ha(function (b) {
                return b = +b, ha(function (c, d) {
                    var e, f = a([], c.length, b), g = f.length;
                    while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function oa(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a
        }

        c = fa.support = {}, f = fa.isXML = function (a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }, m = fa.setDocument = function (a) {
            var b, e, g = a ? a.ownerDocument || a : v;
            return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = n.documentElement, p = !f(n), (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da)), c.attributes = ia(function (a) {
                return a.className = "i", !a.getAttribute("className")
            }), c.getElementsByTagName = ia(function (a) {
                return a.appendChild(n.createComment("")), !a.getElementsByTagName("*").length
            }), c.getElementsByClassName = Z.test(n.getElementsByClassName), c.getById = ia(function (a) {
                return o.appendChild(a).id = u, !n.getElementsByName || !n.getElementsByName(u).length
            }), c.getById ? (d.find.ID = function (a, b) {
                if ("undefined" != typeof b.getElementById && p) {
                    var c = b.getElementById(a);
                    return c ? [c] : []
                }
            }, d.filter.ID = function (a) {
                var b = a.replace(ba, ca);
                return function (a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete d.find.ID, d.filter.ID = function (a) {
                var b = a.replace(ba, ca);
                return function (a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0
            } : function (a, b) {
                var c, d = [], e = 0, f = b.getElementsByTagName(a);
                if ("*" === a) {
                    while (c = f[e++]) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
                return "undefined" != typeof b.getElementsByClassName && p ? b.getElementsByClassName(a) : void 0
            }, r = [], q = [], (c.qsa = Z.test(n.querySelectorAll)) && (ia(function (a) {
                o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]")
            }), ia(function (a) {
                var b = n.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
            })), (c.matchesSelector = Z.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ia(function (a) {
                c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", O)
            }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = Z.test(o.compareDocumentPosition), t = b || Z.test(o.contains) ? function (a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function (a, b) {
                if (b) while (b = b.parentNode) if (b === a) return !0;
                return !1
            }, B = b ? function (a, b) {
                if (a === b) return l = !0, 0;
                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1)
            } : function (a, b) {
                if (a === b) return l = !0, 0;
                var c, d = 0, e = a.parentNode, f = b.parentNode, g = [a], h = [b];
                if (!e || !f) return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;
                if (e === f) return ka(a, b);
                c = a;
                while (c = c.parentNode) g.unshift(c);
                c = b;
                while (c = c.parentNode) h.unshift(c);
                while (g[d] === h[d]) d++;
                return d ? ka(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0
            }, n) : n
        }, fa.matches = function (a, b) {
            return fa(a, null, null, b)
        }, fa.matchesSelector = function (a, b) {
            if ((a.ownerDocument || a) !== n && m(a), b = b.replace(T, "='$1']"), c.matchesSelector && p && !A[b + " "] && (!r || !r.test(b)) && (!q || !q.test(b))) try {
                var d = s.call(a, b);
                if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch (e) {
            }
            return fa(b, n, null, [a]).length > 0
        }, fa.contains = function (a, b) {
            return (a.ownerDocument || a) !== n && m(a), t(a, b)
        }, fa.attr = function (a, b) {
            (a.ownerDocument || a) !== n && m(a);
            var e = d.attrHandle[b.toLowerCase()],
                f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
            return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
        }, fa.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, fa.uniqueSort = function (a) {
            var b, d = [], e = 0, f = 0;
            if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                while (b = a[f++]) b === a[f] && (e = d.push(f));
                while (e--) a.splice(d[e], 1)
            }
            return k = null, a
        }, e = fa.getText = function (a) {
            var b, c = "", d = 0, f = a.nodeType;
            if (f) {
                if (1 === f || 9 === f || 11 === f) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
                } else if (3 === f || 4 === f) return a.nodeValue
            } else while (b = a[d++]) c += e(b);
            return c
        }, d = fa.selectors = {
            cacheLength: 50,
            createPseudo: ha,
            match: W,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (a) {
                    return a[1] = a[1].replace(ba, ca), a[3] = (a[3] || a[4] || a[5] || "").replace(ba, ca), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                }, CHILD: function (a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || fa.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && fa.error(a[0]), a
                }, PSEUDO: function (a) {
                    var b, c = !a[6] && a[2];
                    return W.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && U.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function (a) {
                    var b = a.replace(ba, ca).toLowerCase();
                    return "*" === a ? function () {
                        return !0
                    } : function (a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                }, CLASS: function (a) {
                    var b = y[a + " "];
                    return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function (a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                    })
                }, ATTR: function (a, b, c) {
                    return function (d) {
                        var e = fa.attr(d, a);
                        return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(P, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
                    }
                }, CHILD: function (a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3), g = "last" !== a.slice(-4), h = "of-type" === b;
                    return 1 === d && 0 === e ? function (a) {
                        return !!a.parentNode
                    } : function (b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(), s = !i && !h, t = !1;
                        if (q) {
                            if (f) {
                                while (p) {
                                    m = b;
                                    while (m = m[p]) if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                m = q, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n && j[2], m = n && q.childNodes[n];
                                while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) if (1 === m.nodeType && ++t && m === b) {
                                    k[a] = [w, n, t];
                                    break
                                }
                            } else if (s && (m = b, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n), t === !1) while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) if ((h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) && ++t && (s && (l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [w, t]), m === b)) break;
                            return t -= e, t === d || t % d === 0 && t / d >= 0
                        }
                    }
                }, PSEUDO: function (a, b) {
                    var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || fa.error("unsupported pseudo: " + a);
                    return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ha(function (a, c) {
                        var d, f = e(a, b), g = f.length;
                        while (g--) d = J(a, f[g]), a[d] = !(c[d] = f[g])
                    }) : function (a) {
                        return e(a, 0, c)
                    }) : e
                }
            },
            pseudos: {
                not: ha(function (a) {
                    var b = [], c = [], d = h(a.replace(Q, "$1"));
                    return d[u] ? ha(function (a, b, c, e) {
                        var f, g = d(a, null, e, []), h = a.length;
                        while (h--) (f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function (a, e, f) {
                        return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop()
                    }
                }), has: ha(function (a) {
                    return function (b) {
                        return fa(a, b).length > 0
                    }
                }), contains: ha(function (a) {
                    return a = a.replace(ba, ca), function (b) {
                        return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
                    }
                }), lang: ha(function (a) {
                    return V.test(a || "") || fa.error("unsupported lang: " + a), a = a.replace(ba, ca).toLowerCase(), function (b) {
                        var c;
                        do if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                        return !1
                    }
                }), target: function (b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                }, root: function (a) {
                    return a === o
                }, focus: function (a) {
                    return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                }, enabled: function (a) {
                    return a.disabled === !1
                }, disabled: function (a) {
                    return a.disabled === !0
                }, checked: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                }, selected: function (a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                }, empty: function (a) {
                    for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
                    return !0
                }, parent: function (a) {
                    return !d.pseudos.empty(a)
                }, header: function (a) {
                    return Y.test(a.nodeName)
                }, input: function (a) {
                    return X.test(a.nodeName)
                }, button: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                }, text: function (a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                }, first: na(function () {
                    return [0]
                }), last: na(function (a, b) {
                    return [b - 1]
                }), eq: na(function (a, b, c) {
                    return [0 > c ? c + b : c]
                }), even: na(function (a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a
                }), odd: na(function (a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a
                }), lt: na(function (a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                    return a
                }), gt: na(function (a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
                    return a
                })
            }
        }, d.pseudos.nth = d.pseudos.eq;
        for (b in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0}) d.pseudos[b] = la(b);
        for (b in{submit: !0, reset: !0}) d.pseudos[b] = ma(b);

        function pa() {
        }

        pa.prototype = d.filters = d.pseudos, d.setFilters = new pa, g = fa.tokenize = function (a, b) {
            var c, e, f, g, h, i, j, k = z[a + " "];
            if (k) return b ? 0 : k.slice(0);
            h = a, i = [], j = d.preFilter;
            while (h) {
                c && !(e = R.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = S.exec(h)) && (c = e.shift(), f.push({
                    value: c,
                    type: e[0].replace(Q, " ")
                }), h = h.slice(c.length));
                for (g in d.filter) !(e = W[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
                    value: c,
                    type: g,
                    matches: e
                }), h = h.slice(c.length));
                if (!c) break
            }
            return b ? h.length : h ? fa.error(a) : z(a, i).slice(0)
        };

        function qa(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d
        }

        function ra(a, b, c) {
            var d = b.dir, e = c && "parentNode" === d, f = x++;
            return b.first ? function (b, c, f) {
                while (b = b[d]) if (1 === b.nodeType || e) return a(b, c, f)
            } : function (b, c, g) {
                var h, i, j, k = [w, f];
                if (g) {
                    while (b = b[d]) if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                } else while (b = b[d]) if (1 === b.nodeType || e) {
                    if (j = b[u] || (b[u] = {}), i = j[b.uniqueID] || (j[b.uniqueID] = {}), (h = i[d]) && h[0] === w && h[1] === f) return k[2] = h[2];
                    if (i[d] = k, k[2] = a(b, c, g)) return !0
                }
            }
        }

        function sa(a) {
            return a.length > 1 ? function (b, c, d) {
                var e = a.length;
                while (e--) if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function ta(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++) fa(a, b[d], c);
            return c
        }

        function ua(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) (f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
            return g
        }

        function va(a, b, c, d, e, f) {
            return d && !d[u] && (d = va(d)), e && !e[u] && (e = va(e, f)), ha(function (f, g, h, i) {
                var j, k, l, m = [], n = [], o = g.length, p = f || ta(b || "*", h.nodeType ? [h] : h, []),
                    q = !a || !f && b ? p : ua(p, m, a, h, i), r = c ? e || (f ? a : o || d) ? [] : g : q;
                if (c && c(q, r, h, i), d) {
                    j = ua(r, n), d(j, [], h, i), k = j.length;
                    while (k--) (l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
                }
                if (f) {
                    if (e || a) {
                        if (e) {
                            j = [], k = r.length;
                            while (k--) (l = r[k]) && j.push(q[k] = l);
                            e(null, r = [], j, i)
                        }
                        k = r.length;
                        while (k--) (l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                    }
                } else r = ua(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r)
            })
        }

        function wa(a) {
            for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = ra(function (a) {
                return a === b
            }, h, !0), l = ra(function (a) {
                return J(b, a) > -1
            }, h, !0), m = [function (a, c, d) {
                var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
                return b = null, e
            }]; f > i; i++) if (c = d.relative[a[i].type]) m = [ra(sa(m), c)]; else {
                if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                    for (e = ++i; f > e; e++) if (d.relative[a[e].type]) break;
                    return va(i > 1 && sa(m), i > 1 && qa(a.slice(0, i - 1).concat({value: " " === a[i - 2].type ? "*" : ""})).replace(Q, "$1"), c, e > i && wa(a.slice(i, e)), f > e && wa(a = a.slice(e)), f > e && qa(a))
                }
                m.push(c)
            }
            return sa(m)
        }

        function xa(a, b) {
            var c = b.length > 0, e = a.length > 0, f = function (f, g, h, i, k) {
                var l, o, q, r = 0, s = "0", t = f && [], u = [], v = j, x = f || e && d.find.TAG("*", k),
                    y = w += null == v ? 1 : Math.random() || .1, z = x.length;
                for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) {
                    if (e && l) {
                        o = 0, g || l.ownerDocument === n || (m(l), h = !p);
                        while (q = a[o++]) if (q(l, g || n, h)) {
                            i.push(l);
                            break
                        }
                        k && (w = y)
                    }
                    c && ((l = !q && l) && r--, f && t.push(l))
                }
                if (r += s, c && s !== r) {
                    o = 0;
                    while (q = b[o++]) q(t, u, g, h);
                    if (f) {
                        if (r > 0) while (s--) t[s] || u[s] || (u[s] = F.call(i));
                        u = ua(u)
                    }
                    H.apply(i, u), k && !f && u.length > 0 && r + b.length > 1 && fa.uniqueSort(i)
                }
                return k && (w = y, j = v), t
            };
            return c ? ha(f) : f
        }

        return h = fa.compile = function (a, b) {
            var c, d = [], e = [], f = A[a + " "];
            if (!f) {
                b || (b = g(a)), c = b.length;
                while (c--) f = wa(b[c]), f[u] ? d.push(f) : e.push(f);
                f = A(a, xa(e, d)), f.selector = a
            }
            return f
        }, i = fa.select = function (a, b, e, f) {
            var i, j, k, l, m, n = "function" == typeof a && a, o = !f && g(a = n.selector || a);
            if (e = e || [], 1 === o.length) {
                if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
                    if (b = (d.find.ID(k.matches[0].replace(ba, ca), b) || [])[0], !b) return e;
                    n && (b = b.parentNode), a = a.slice(j.shift().value.length)
                }
                i = W.needsContext.test(a) ? 0 : j.length;
                while (i--) {
                    if (k = j[i], d.relative[l = k.type]) break;
                    if ((m = d.find[l]) && (f = m(k.matches[0].replace(ba, ca), _.test(j[0].type) && oa(b.parentNode) || b))) {
                        if (j.splice(i, 1), a = f.length && qa(j), !a) return H.apply(e, f), e;
                        break
                    }
                }
            }
            return (n || h(a, o))(f, b, !p, e, !b || _.test(a) && oa(b.parentNode) || b), e
        }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ia(function (a) {
            return 1 & a.compareDocumentPosition(n.createElement("div"))
        }), ia(function (a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || ja("type|href|height|width", function (a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), c.attributes && ia(function (a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || ja("value", function (a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }), ia(function (a) {
            return null == a.getAttribute("disabled")
        }) || ja(K, function (a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }), fa
    }(a);
    n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.uniqueSort = n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;
    var u = function (a, b, c) {
        var d = [], e = void 0 !== c;
        while ((a = a[b]) && 9 !== a.nodeType) if (1 === a.nodeType) {
            if (e && n(a).is(c)) break;
            d.push(a)
        }
        return d
    }, v = function (a, b) {
        for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
        return c
    }, w = n.expr.match.needsContext, x = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, y = /^.[^:#\[\.,]*$/;

    function z(a, b, c) {
        if (n.isFunction(b)) return n.grep(a, function (a, d) {
            return !!b.call(a, d, a) !== c
        });
        if (b.nodeType) return n.grep(a, function (a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (y.test(b)) return n.filter(b, a, c);
            b = n.filter(b, a)
        }
        return n.grep(a, function (a) {
            return h.call(b, a) > -1 !== c
        })
    }

    n.filter = function (a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function (a) {
            return 1 === a.nodeType
        }))
    }, n.fn.extend({
        find: function (a) {
            var b, c = this.length, d = [], e = this;
            if ("string" != typeof a) return this.pushStack(n(a).filter(function () {
                for (b = 0; c > b; b++) if (n.contains(e[b], this)) return !0
            }));
            for (b = 0; c > b; b++) n.find(a, e[b], d);
            return d = this.pushStack(c > 1 ? n.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d
        }, filter: function (a) {
            return this.pushStack(z(this, a || [], !1))
        }, not: function (a) {
            return this.pushStack(z(this, a || [], !0))
        }, is: function (a) {
            return !!z(this, "string" == typeof a && w.test(a) ? n(a) : a || [], !1).length
        }
    });
    var A, B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, C = n.fn.init = function (a, b, c) {
        var e, f;
        if (!a) return this;
        if (c = c || A, "string" == typeof a) {
            if (e = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : B.exec(a), !e || !e[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
            if (e[1]) {
                if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)), x.test(e[1]) && n.isPlainObject(b)) for (e in b) n.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
                return this
            }
            return f = d.getElementById(e[2]), f && f.parentNode && (this.length = 1, this[0] = f), this.context = d, this.selector = a, this
        }
        return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this))
    };
    C.prototype = n.fn, A = n(d);
    var D = /^(?:parents|prev(?:Until|All))/, E = {children: !0, contents: !0, next: !0, prev: !0};
    n.fn.extend({
        has: function (a) {
            var b = n(a, this), c = b.length;
            return this.filter(function () {
                for (var a = 0; c > a; a++) if (n.contains(this, b[a])) return !0
            })
        }, closest: function (a, b) {
            for (var c, d = 0, e = this.length, f = [], g = w.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
                f.push(c);
                break
            }
            return this.pushStack(f.length > 1 ? n.uniqueSort(f) : f)
        }, index: function (a) {
            return a ? "string" == typeof a ? h.call(n(a), this[0]) : h.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (a, b) {
            return this.pushStack(n.uniqueSort(n.merge(this.get(), n(a, b))))
        }, addBack: function (a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });

    function F(a, b) {
        while ((a = a[b]) && 1 !== a.nodeType) ;
        return a
    }

    n.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        }, parents: function (a) {
            return u(a, "parentNode")
        }, parentsUntil: function (a, b, c) {
            return u(a, "parentNode", c)
        }, next: function (a) {
            return F(a, "nextSibling")
        }, prev: function (a) {
            return F(a, "previousSibling")
        }, nextAll: function (a) {
            return u(a, "nextSibling")
        }, prevAll: function (a) {
            return u(a, "previousSibling")
        }, nextUntil: function (a, b, c) {
            return u(a, "nextSibling", c)
        }, prevUntil: function (a, b, c) {
            return u(a, "previousSibling", c)
        }, siblings: function (a) {
            return v((a.parentNode || {}).firstChild, a)
        }, children: function (a) {
            return v(a.firstChild)
        }, contents: function (a) {
            return a.contentDocument || n.merge([], a.childNodes)
        }
    }, function (a, b) {
        n.fn[a] = function (c, d) {
            var e = n.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = n.filter(d, e)), this.length > 1 && (E[a] || n.uniqueSort(e), D.test(a) && e.reverse()), this.pushStack(e)
        }
    });
    var G = /\S+/g;

    function H(a) {
        var b = {};
        return n.each(a.match(G) || [], function (a, c) {
            b[c] = !0
        }), b
    }

    n.Callbacks = function (a) {
        a = "string" == typeof a ? H(a) : n.extend({}, a);
        var b, c, d, e, f = [], g = [], h = -1, i = function () {
            for (e = a.once, d = b = !0; g.length; h = -1) {
                c = g.shift();
                while (++h < f.length) f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length, c = !1)
            }
            a.memory || (c = !1), b = !1, e && (f = c ? [] : "")
        }, j = {
            add: function () {
                return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) {
                    n.each(b, function (b, c) {
                        n.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && "string" !== n.type(c) && d(c)
                    })
                }(arguments), c && !b && i()), this
            }, remove: function () {
                return n.each(arguments, function (a, b) {
                    var c;
                    while ((c = n.inArray(b, f, c)) > -1) f.splice(c, 1), h >= c && h--
                }), this
            }, has: function (a) {
                return a ? n.inArray(a, f) > -1 : f.length > 0
            }, empty: function () {
                return f && (f = []), this
            }, disable: function () {
                return e = g = [], f = c = "", this
            }, disabled: function () {
                return !f
            }, lock: function () {
                return e = g = [], c || (f = c = ""), this
            }, locked: function () {
                return !!e
            }, fireWith: function (a, c) {
                return e || (c = c || [], c = [a, c.slice ? c.slice() : c], g.push(c), b || i()), this
            }, fire: function () {
                return j.fireWith(this, arguments), this
            }, fired: function () {
                return !!d
            }
        };
        return j
    }, n.extend({
        Deferred: function (a) {
            var b = [["resolve", "done", n.Callbacks("once memory"), "resolved"], ["reject", "fail", n.Callbacks("once memory"), "rejected"], ["notify", "progress", n.Callbacks("memory")]],
                c = "pending", d = {
                    state: function () {
                        return c
                    }, always: function () {
                        return e.done(arguments).fail(arguments), this
                    }, then: function () {
                        var a = arguments;
                        return n.Deferred(function (c) {
                            n.each(b, function (b, f) {
                                var g = n.isFunction(a[b]) && a[b];
                                e[f[1]](function () {
                                    var a = g && g.apply(this, arguments);
                                    a && n.isFunction(a.promise) ? a.promise().progress(c.notify).done(c.resolve).fail(c.reject) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    }, promise: function (a) {
                        return null != a ? n.extend(a, d) : d
                    }
                }, e = {};
            return d.pipe = d.then, n.each(b, function (a, f) {
                var g = f[2], h = f[3];
                d[f[1]] = g.add, h && g.add(function () {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        }, when: function (a) {
            var b = 0, c = e.call(arguments), d = c.length, f = 1 !== d || a && n.isFunction(a.promise) ? d : 0,
                g = 1 === f ? a : n.Deferred(), h = function (a, b, c) {
                    return function (d) {
                        b[a] = this, c[a] = arguments.length > 1 ? e.call(arguments) : d, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
                    }
                }, i, j, k;
            if (d > 1) for (i = new Array(d), j = new Array(d), k = new Array(d); d > b; b++) c[b] && n.isFunction(c[b].promise) ? c[b].promise().progress(h(b, j, i)).done(h(b, k, c)).fail(g.reject) : --f;
            return f || g.resolveWith(k, c), g.promise()
        }
    });
    var I;
    n.fn.ready = function (a) {
        return n.ready.promise().done(a), this
    }, n.extend({
        isReady: !1, readyWait: 1, holdReady: function (a) {
            a ? n.readyWait++ : n.ready(!0)
        }, ready: function (a) {
            (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, a !== !0 && --n.readyWait > 0 || (I.resolveWith(d, [n]), n.fn.triggerHandler && (n(d).triggerHandler("ready"), n(d).off("ready"))))
        }
    });

    function J() {
        d.removeEventListener("DOMContentLoaded", J), a.removeEventListener("load", J), n.ready()
    }

    n.ready.promise = function (b) {
        return I || (I = n.Deferred(), "complete" === d.readyState || "loading" !== d.readyState && !d.documentElement.doScroll ? a.setTimeout(n.ready) : (d.addEventListener("DOMContentLoaded", J), a.addEventListener("load", J))), I.promise(b)
    }, n.ready.promise();
    var K = function (a, b, c, d, e, f, g) {
        var h = 0, i = a.length, j = null == c;
        if ("object" === n.type(c)) {
            e = !0;
            for (h in c) K(a, b, h, c[h], !0, f, g)
        } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function (a, b, c) {
            return j.call(n(a), c)
        })), b)) for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    }, L = function (a) {
        return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
    };

    function M() {
        this.expando = n.expando + M.uid++
    }

    M.uid = 1, M.prototype = {
        register: function (a, b) {
            var c = b || {};
            return a.nodeType ? a[this.expando] = c : Object.defineProperty(a, this.expando, {
                value: c,
                writable: !0,
                configurable: !0
            }), a[this.expando]
        }, cache: function (a) {
            if (!L(a)) return {};
            var b = a[this.expando];
            return b || (b = {}, L(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, {
                value: b,
                configurable: !0
            }))), b
        }, set: function (a, b, c) {
            var d, e = this.cache(a);
            if ("string" == typeof b) e[b] = c; else for (d in b) e[d] = b[d];
            return e
        }, get: function (a, b) {
            return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][b]
        }, access: function (a, b, c) {
            var d;
            return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, n.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b)
        }, remove: function (a, b) {
            var c, d, e, f = a[this.expando];
            if (void 0 !== f) {
                if (void 0 === b) this.register(a); else {
                    n.isArray(b) ? d = b.concat(b.map(n.camelCase)) : (e = n.camelCase(b), b in f ? d = [b, e] : (d = e, d = d in f ? [d] : d.match(G) || [])), c = d.length;
                    while (c--) delete f[d[c]]
                }
                (void 0 === b || n.isEmptyObject(f)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando])
            }
        }, hasData: function (a) {
            var b = a[this.expando];
            return void 0 !== b && !n.isEmptyObject(b)
        }
    };
    var N = new M, O = new M, P = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Q = /[A-Z]/g;

    function R(a, b, c) {
        var d;
        if (void 0 === c && 1 === a.nodeType) if (d = "data-" + b.replace(Q, "-$&").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
            try {
                c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : P.test(c) ? n.parseJSON(c) : c;
            } catch (e) {
            }
            O.set(a, b, c)
        } else c = void 0;
        return c
    }

    n.extend({
        hasData: function (a) {
            return O.hasData(a) || N.hasData(a)
        }, data: function (a, b, c) {
            return O.access(a, b, c)
        }, removeData: function (a, b) {
            O.remove(a, b)
        }, _data: function (a, b, c) {
            return N.access(a, b, c)
        }, _removeData: function (a, b) {
            N.remove(a, b)
        }
    }), n.fn.extend({
        data: function (a, b) {
            var c, d, e, f = this[0], g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = O.get(f), 1 === f.nodeType && !N.get(f, "hasDataAttrs"))) {
                    c = g.length;
                    while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)), R(f, d, e[d])));
                    N.set(f, "hasDataAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function () {
                O.set(this, a)
            }) : K(this, function (b) {
                var c, d;
                if (f && void 0 === b) {
                    if (c = O.get(f, a) || O.get(f, a.replace(Q, "-$&").toLowerCase()), void 0 !== c) return c;
                    if (d = n.camelCase(a), c = O.get(f, d), void 0 !== c) return c;
                    if (c = R(f, d, void 0), void 0 !== c) return c
                } else d = n.camelCase(a), this.each(function () {
                    var c = O.get(this, d);
                    O.set(this, d, b), a.indexOf("-") > -1 && void 0 !== c && O.set(this, a, b)
                })
            }, null, b, arguments.length > 1, null, !0)
        }, removeData: function (a) {
            return this.each(function () {
                O.remove(this, a)
            })
        }
    }), n.extend({
        queue: function (a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = N.get(a, b), c && (!d || n.isArray(c) ? d = N.access(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0
        }, dequeue: function (a, b) {
            b = b || "fx";
            var c = n.queue(a, b), d = c.length, e = c.shift(), f = n._queueHooks(a, b), g = function () {
                n.dequeue(a, b)
            };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        }, _queueHooks: function (a, b) {
            var c = b + "queueHooks";
            return N.get(a, c) || N.access(a, c, {
                empty: n.Callbacks("once memory").add(function () {
                    N.remove(a, [b + "queue", c])
                })
            })
        }
    }), n.fn.extend({
        queue: function (a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function () {
                var c = n.queue(this, a, b);
                n._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a)
            })
        }, dequeue: function (a) {
            return this.each(function () {
                n.dequeue(this, a)
            })
        }, clearQueue: function (a) {
            return this.queue(a || "fx", [])
        }, promise: function (a, b) {
            var c, d = 1, e = n.Deferred(), f = this, g = this.length, h = function () {
                --d || e.resolveWith(f, [f])
            };
            "string" != typeof a && (b = a, a = void 0), a = a || "fx";
            while (g--) c = N.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b)
        }
    });
    var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, T = new RegExp("^(?:([+-])=|)(" + S + ")([a-z%]*)$", "i"),
        U = ["Top", "Right", "Bottom", "Left"], V = function (a, b) {
            return a = b || a, "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a)
        };

    function W(a, b, c, d) {
        var e, f = 1, g = 20, h = d ? function () {
                return d.cur()
            } : function () {
                return n.css(a, b, "")
            }, i = h(), j = c && c[3] || (n.cssNumber[b] ? "" : "px"),
            k = (n.cssNumber[b] || "px" !== j && +i) && T.exec(n.css(a, b));
        if (k && k[3] !== j) {
            j = j || k[3], c = c || [], k = +i || 1;
            do f = f || ".5", k /= f, n.style(a, b, k + j); while (f !== (f = h() / i) && 1 !== f && --g)
        }
        return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e
    }

    var X = /^(?:checkbox|radio)$/i, Y = /<([\w:-]+)/, Z = /^$|\/(?:java|ecma)script/i, $ = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    $.optgroup = $.option, $.tbody = $.tfoot = $.colgroup = $.caption = $.thead, $.th = $.td;

    function _(a, b) {
        var c = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
        return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], c) : c
    }

    function aa(a, b) {
        for (var c = 0, d = a.length; d > c; c++) N.set(a[c], "globalEval", !b || N.get(b[c], "globalEval"))
    }

    var ba = /<|&#?\w+;/;

    function ca(a, b, c, d, e) {
        for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], o = 0, p = a.length; p > o; o++) if (f = a[o], f || 0 === f) if ("object" === n.type(f)) n.merge(m, f.nodeType ? [f] : f); else if (ba.test(f)) {
            g = g || l.appendChild(b.createElement("div")), h = (Y.exec(f) || ["", ""])[1].toLowerCase(), i = $[h] || $._default, g.innerHTML = i[1] + n.htmlPrefilter(f) + i[2], k = i[0];
            while (k--) g = g.lastChild;
            n.merge(m, g.childNodes), g = l.firstChild, g.textContent = ""
        } else m.push(b.createTextNode(f));
        l.textContent = "", o = 0;
        while (f = m[o++]) if (d && n.inArray(f, d) > -1) e && e.push(f); else if (j = n.contains(f.ownerDocument, f), g = _(l.appendChild(f), "script"), j && aa(g), c) {
            k = 0;
            while (f = g[k++]) Z.test(f.type || "") && c.push(f)
        }
        return l
    }

    !function () {
        var a = d.createDocumentFragment(), b = a.appendChild(d.createElement("div")), c = d.createElement("input");
        c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), l.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", l.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
    }();
    var da = /^key/, ea = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, fa = /^([^.]*)(?:\.(.+)|)/;

    function ga() {
        return !0
    }

    function ha() {
        return !1
    }

    function ia() {
        try {
            return d.activeElement
        } catch (a) {
        }
    }

    function ja(a, b, c, d, e, f) {
        var g, h;
        if ("object" == typeof b) {
            "string" != typeof c && (d = d || c, c = void 0);
            for (h in b) ja(a, h, c, d, b[h], f);
            return a
        }
        if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = ha; else if (!e) return a;
        return 1 === f && (g = e, e = function (a) {
            return n().off(a), g.apply(this, arguments)
        }, e.guid = g.guid || (g.guid = n.guid++)), a.each(function () {
            n.event.add(this, b, e, d, c)
        })
    }

    n.event = {
        global: {},
        add: function (a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = N.get(a);
            if (r) {
                c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = n.guid++), (i = r.events) || (i = r.events = {}), (g = r.handle) || (g = r.handle = function (b) {
                    return "undefined" != typeof n && n.event.triggered !== b.type ? n.event.dispatch.apply(a, arguments) : void 0
                }), b = (b || "").match(G) || [""], j = b.length;
                while (j--) h = fa.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o && (l = n.event.special[o] || {}, o = (e ? l.delegateType : l.bindType) || o, l = n.event.special[o] || {}, k = n.extend({
                    type: o,
                    origType: q,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && n.expr.match.needsContext.test(e),
                    namespace: p.join(".")
                }, f), (m = i[o]) || (m = i[o] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, p, g) !== !1 || a.addEventListener && a.addEventListener(o, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), n.event.global[o] = !0)
            }
        },
        remove: function (a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = N.hasData(a) && N.get(a);
            if (r && (i = r.events)) {
                b = (b || "").match(G) || [""], j = b.length;
                while (j--) if (h = fa.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
                    l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = i[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length;
                    while (f--) k = m[f], !e && q !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                    g && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete i[o])
                } else for (o in i) n.event.remove(a, o + b[j], c, d, !0);
                n.isEmptyObject(i) && N.remove(a, "handle events")
            }
        },
        dispatch: function (a) {
            a = n.event.fix(a);
            var b, c, d, f, g, h = [], i = e.call(arguments), j = (N.get(this, "events") || {})[a.type] || [],
                k = n.event.special[a.type] || {};
            if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                h = n.event.handlers.call(this, a, j), b = 0;
                while ((f = h[b++]) && !a.isPropagationStopped()) {
                    a.currentTarget = f.elem, c = 0;
                    while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped()) a.rnamespace && !a.rnamespace.test(g.namespace) || (a.handleObj = g, a.data = g.data, d = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()))
                }
                return k.postDispatch && k.postDispatch.call(this, a), a.result
            }
        },
        handlers: function (a, b) {
            var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
            if (h && i.nodeType && ("click" !== a.type || isNaN(a.button) || a.button < 1)) for (; i !== this; i = i.parentNode || this) if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) > -1 : n.find(e, this, null, [i]).length), d[e] && d.push(f);
                d.length && g.push({elem: i, handlers: d})
            }
            return h < b.length && g.push({elem: this, handlers: b.slice(h)}), g
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, b) {
                var c, e, f, g = b.button;
                return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || d, e = c.documentElement, f = c.body, a.pageX = b.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)), a.which || void 0 === g || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a
            }
        },
        fix: function (a) {
            if (a[n.expando]) return a;
            var b, c, e, f = a.type, g = a, h = this.fixHooks[f];
            h || (this.fixHooks[f] = h = ea.test(f) ? this.mouseHooks : da.test(f) ? this.keyHooks : {}), e = h.props ? this.props.concat(h.props) : this.props, a = new n.Event(g), b = e.length;
            while (b--) c = e[b], a[c] = g[c];
            return a.target || (a.target = d), 3 === a.target.nodeType && (a.target = a.target.parentNode), h.filter ? h.filter(a, g) : a
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    return this !== ia() && this.focus ? (this.focus(), !1) : void 0
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    return this === ia() && this.blur ? (this.blur(), !1) : void 0
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    return "checkbox" === this.type && this.click && n.nodeName(this, "input") ? (this.click(), !1) : void 0
                }, _default: function (a) {
                    return n.nodeName(a.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        }
    }, n.removeEvent = function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c)
    }, n.Event = function (a, b) {
        return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? ga : ha) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void(this[n.expando] = !0)) : new n.Event(a, b)
    }, n.Event.prototype = {
        constructor: n.Event,
        isDefaultPrevented: ha,
        isPropagationStopped: ha,
        isImmediatePropagationStopped: ha,
        isSimulated: !1,
        preventDefault: function () {
            var a = this.originalEvent;
            this.isDefaultPrevented = ga, a && !this.isSimulated && a.preventDefault()
        },
        stopPropagation: function () {
            var a = this.originalEvent;
            this.isPropagationStopped = ga, a && !this.isSimulated && a.stopPropagation()
        },
        stopImmediatePropagation: function () {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = ga, a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation()
        }
    }, n.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (a, b) {
        n.event.special[a] = {
            delegateType: b, bindType: b, handle: function (a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return e && (e === d || n.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), n.fn.extend({
        on: function (a, b, c, d) {
            return ja(this, a, b, c, d)
        }, one: function (a, b, c, d) {
            return ja(this, a, b, c, d, 1)
        }, off: function (a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = ha), this.each(function () {
                n.event.remove(this, a, c, b)
            })
        }
    });
    var ka = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, la = /<script|<style|<link/i,
        ma = /checked\s*(?:[^=]|=\s*.checked.)/i, na = /^true\/(.*)/, oa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function pa(a, b) {
        return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function qa(a) {
        return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
    }

    function ra(a) {
        var b = na.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function sa(a, b) {
        var c, d, e, f, g, h, i, j;
        if (1 === b.nodeType) {
            if (N.hasData(a) && (f = N.access(a), g = N.set(b, f), j = f.events)) {
                delete g.handle, g.events = {};
                for (e in j) for (c = 0, d = j[e].length; d > c; c++) n.event.add(b, e, j[e][c])
            }
            O.hasData(a) && (h = O.access(a), i = n.extend({}, h), O.set(b, i))
        }
    }

    function ta(a, b) {
        var c = b.nodeName.toLowerCase();
        "input" === c && X.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
    }

    function ua(a, b, c, d) {
        b = f.apply([], b);
        var e, g, h, i, j, k, m = 0, o = a.length, p = o - 1, q = b[0], r = n.isFunction(q);
        if (r || o > 1 && "string" == typeof q && !l.checkClone && ma.test(q)) return a.each(function (e) {
            var f = a.eq(e);
            r && (b[0] = q.call(this, e, f.html())), ua(f, b, c, d)
        });
        if (o && (e = ca(b, a[0].ownerDocument, !1, a, d), g = e.firstChild, 1 === e.childNodes.length && (e = g), g || d)) {
            for (h = n.map(_(e, "script"), qa), i = h.length; o > m; m++) j = e, m !== p && (j = n.clone(j, !0, !0), i && n.merge(h, _(j, "script"))), c.call(a[m], j, m);
            if (i) for (k = h[h.length - 1].ownerDocument, n.map(h, ra), m = 0; i > m; m++) j = h[m], Z.test(j.type || "") && !N.access(j, "globalEval") && n.contains(k, j) && (j.src ? n._evalUrl && n._evalUrl(j.src) : n.globalEval(j.textContent.replace(oa, "")))
        }
        return a
    }

    function va(a, b, c) {
        for (var d, e = b ? n.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || n.cleanData(_(d)), d.parentNode && (c && n.contains(d.ownerDocument, d) && aa(_(d, "script")), d.parentNode.removeChild(d));
        return a
    }

    n.extend({
        htmlPrefilter: function (a) {
            return a.replace(ka, "<$1></$2>")
        }, clone: function (a, b, c) {
            var d, e, f, g, h = a.cloneNode(!0), i = n.contains(a.ownerDocument, a);
            if (!(l.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a))) for (g = _(h), f = _(a), d = 0, e = f.length; e > d; d++) ta(f[d], g[d]);
            if (b) if (c) for (f = f || _(a), g = g || _(h), d = 0, e = f.length; e > d; d++) sa(f[d], g[d]); else sa(a, h);
            return g = _(h, "script"), g.length > 0 && aa(g, !i && _(a, "script")), h
        }, cleanData: function (a) {
            for (var b, c, d, e = n.event.special, f = 0; void 0 !== (c = a[f]); f++) if (L(c)) {
                if (b = c[N.expando]) {
                    if (b.events) for (d in b.events) e[d] ? n.event.remove(c, d) : n.removeEvent(c, d, b.handle);
                    c[N.expando] = void 0
                }
                c[O.expando] && (c[O.expando] = void 0)
            }
        }
    }), n.fn.extend({
        domManip: ua, detach: function (a) {
            return va(this, a, !0)
        }, remove: function (a) {
            return va(this, a)
        }, text: function (a) {
            return K(this, function (a) {
                return void 0 === a ? n.text(this) : this.empty().each(function () {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a)
                })
            }, null, a, arguments.length)
        }, append: function () {
            return ua(this, arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = pa(this, a);
                    b.appendChild(a)
                }
            })
        }, prepend: function () {
            return ua(this, arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = pa(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        }, before: function () {
            return ua(this, arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        }, after: function () {
            return ua(this, arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        }, empty: function () {
            for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (n.cleanData(_(a, !1)), a.textContent = "");
            return this
        }, clone: function (a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
                return n.clone(this, a, b)
            })
        }, html: function (a) {
            return K(this, function (a) {
                var b = this[0] || {}, c = 0, d = this.length;
                if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                if ("string" == typeof a && !la.test(a) && !$[(Y.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = n.htmlPrefilter(a);
                    try {
                        for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (n.cleanData(_(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch (e) {
                    }
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        }, replaceWith: function () {
            var a = [];
            return ua(this, arguments, function (b) {
                var c = this.parentNode;
                n.inArray(this, a) < 0 && (n.cleanData(_(this)), c && c.replaceChild(b, this))
            }, a)
        }
    }), n.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        n.fn[a] = function (a) {
            for (var c, d = [], e = n(a), f = e.length - 1, h = 0; f >= h; h++) c = h === f ? this : this.clone(!0), n(e[h])[b](c), g.apply(d, c.get());
            return this.pushStack(d)
        }
    });
    var wa, xa = {HTML: "block", BODY: "block"};

    function ya(a, b) {
        var c = n(b.createElement(a)).appendTo(b.body), d = n.css(c[0], "display");
        return c.detach(), d
    }

    function za(a) {
        var b = d, c = xa[a];
        return c || (c = ya(a, b), "none" !== c && c || (wa = (wa || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = wa[0].contentDocument, b.write(), b.close(), c = ya(a, b), wa.detach()), xa[a] = c), c
    }

    var Aa = /^margin/, Ba = new RegExp("^(" + S + ")(?!px)[a-z%]+$", "i"), Ca = function (b) {
        var c = b.ownerDocument.defaultView;
        return c && c.opener || (c = a), c.getComputedStyle(b)
    }, Da = function (a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e
    }, Ea = d.documentElement;
    !function () {
        var b, c, e, f, g = d.createElement("div"), h = d.createElement("div");
        if (h.style) {
            h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", l.clearCloneStyle = "content-box" === h.style.backgroundClip, g.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", g.appendChild(h);

            function i() {
                h.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", h.innerHTML = "", Ea.appendChild(g);
                var d = a.getComputedStyle(h);
                b = "1%" !== d.top, f = "2px" === d.marginLeft, c = "4px" === d.width, h.style.marginRight = "50%", e = "4px" === d.marginRight, Ea.removeChild(g)
            }

            n.extend(l, {
                pixelPosition: function () {
                    return i(), b
                }, boxSizingReliable: function () {
                    return null == c && i(), c
                }, pixelMarginRight: function () {
                    return null == c && i(), e
                }, reliableMarginLeft: function () {
                    return null == c && i(), f
                }, reliableMarginRight: function () {
                    var b, c = h.appendChild(d.createElement("div"));
                    return c.style.cssText = h.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", h.style.width = "1px", Ea.appendChild(g), b = !parseFloat(a.getComputedStyle(c).marginRight), Ea.removeChild(g), h.removeChild(c), b
                }
            })
        }
    }();

    function Fa(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ca(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, "" !== g && void 0 !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), c && !l.pixelMarginRight() && Ba.test(g) && Aa.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f), void 0 !== g ? g + "" : g
    }

    function Ga(a, b) {
        return {
            get: function () {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }

    var Ha = /^(none|table(?!-c[ea]).+)/, Ia = {position: "absolute", visibility: "hidden", display: "block"},
        Ja = {letterSpacing: "0", fontWeight: "400"}, Ka = ["Webkit", "O", "Moz", "ms"],
        La = d.createElement("div").style;

    function Ma(a) {
        if (a in La) return a;
        var b = a[0].toUpperCase() + a.slice(1), c = Ka.length;
        while (c--) if (a = Ka[c] + b, a in La) return a
    }

    function Na(a, b, c) {
        var d = T.exec(b);
        return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b
    }

    function Oa(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += n.css(a, c + U[f], !0, e)), d ? ("content" === c && (g -= n.css(a, "padding" + U[f], !0, e)), "margin" !== c && (g -= n.css(a, "border" + U[f] + "Width", !0, e))) : (g += n.css(a, "padding" + U[f], !0, e), "padding" !== c && (g += n.css(a, "border" + U[f] + "Width", !0, e)));
        return g
    }

    function Pa(a, b, c) {
        var d = !0, e = "width" === b ? a.offsetWidth : a.offsetHeight, f = Ca(a),
            g = "border-box" === n.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = Fa(a, b, f), (0 > e || null == e) && (e = a.style[b]), Ba.test(e)) return e;
            d = g && (l.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
        }
        return e + Oa(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }

    function Qa(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = N.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && V(d) && (f[g] = N.access(d, "olddisplay", za(d.nodeName)))) : (e = V(d), "none" === c && e || N.set(d, "olddisplay", e ? c : n.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }

    n.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = Fa(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": "cssFloat"},
        style: function (a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = n.camelCase(b), i = a.style;
                return b = n.cssProps[h] || (n.cssProps[h] = Ma(h) || h), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = T.exec(c)) && e[1] && (c = W(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (n.cssNumber[h] ? "" : "px")), l.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0)
            }
        },
        css: function (a, b, c, d) {
            var e, f, g, h = n.camelCase(b);
            return b = n.cssProps[h] || (n.cssProps[h] = Ma(h) || h), g = n.cssHooks[b] || n.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = Fa(a, b, d)), "normal" === e && b in Ja && (e = Ja[b]), "" === c || c ? (f = parseFloat(e), c === !0 || isFinite(f) ? f || 0 : e) : e
        }
    }), n.each(["height", "width"], function (a, b) {
        n.cssHooks[b] = {
            get: function (a, c, d) {
                return c ? Ha.test(n.css(a, "display")) && 0 === a.offsetWidth ? Da(a, Ia, function () {
                    return Pa(a, b, d)
                }) : Pa(a, b, d) : void 0
            }, set: function (a, c, d) {
                var e, f = d && Ca(a), g = d && Oa(a, b, d, "border-box" === n.css(a, "boxSizing", !1, f), f);
                return g && (e = T.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = n.css(a, b)), Na(a, c, g)
            }
        }
    }), n.cssHooks.marginLeft = Ga(l.reliableMarginLeft, function (a, b) {
        return b ? (parseFloat(Fa(a, "marginLeft")) || a.getBoundingClientRect().left - Da(a, {marginLeft: 0}, function () {
            return a.getBoundingClientRect().left
        })) + "px" : void 0
    }), n.cssHooks.marginRight = Ga(l.reliableMarginRight, function (a, b) {
        return b ? Da(a, {display: "inline-block"}, Fa, [a, "marginRight"]) : void 0
    }), n.each({margin: "", padding: "", border: "Width"}, function (a, b) {
        n.cssHooks[a + b] = {
            expand: function (c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + U[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, Aa.test(a) || (n.cssHooks[a + b].set = Na)
    }), n.fn.extend({
        css: function (a, b) {
            return K(this, function (a, b, c) {
                var d, e, f = {}, g = 0;
                if (n.isArray(b)) {
                    for (d = Ca(a), e = b.length; e > g; g++) f[b[g]] = n.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? n.style(a, b, c) : n.css(a, b)
            }, a, b, arguments.length > 1)
        }, show: function () {
            return Qa(this, !0)
        }, hide: function () {
            return Qa(this)
        }, toggle: function (a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
                V(this) ? n(this).show() : n(this).hide()
            })
        }
    });

    function Ra(a, b, c, d, e) {
        return new Ra.prototype.init(a, b, c, d, e)
    }

    n.Tween = Ra, Ra.prototype = {
        constructor: Ra, init: function (a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || n.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px")
        }, cur: function () {
            var a = Ra.propHooks[this.prop];
            return a && a.get ? a.get(this) : Ra.propHooks._default.get(this)
        }, run: function (a) {
            var b, c = Ra.propHooks[this.prop];
            return this.options.duration ? this.pos = b = n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Ra.propHooks._default.set(this), this
        }
    }, Ra.prototype.init.prototype = Ra.prototype, Ra.propHooks = {
        _default: {
            get: function (a) {
                var b;
                return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = n.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0)
            }, set: function (a) {
                n.fx.step[a.prop] ? n.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[n.cssProps[a.prop]] && !n.cssHooks[a.prop] ? a.elem[a.prop] = a.now : n.style(a.elem, a.prop, a.now + a.unit)
            }
        }
    }, Ra.propHooks.scrollTop = Ra.propHooks.scrollLeft = {
        set: function (a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, n.easing = {
        linear: function (a) {
            return a
        }, swing: function (a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }, _default: "swing"
    }, n.fx = Ra.prototype.init, n.fx.step = {};
    var Sa, Ta, Ua = /^(?:toggle|show|hide)$/, Va = /queueHooks$/;

    function Wa() {
        return a.setTimeout(function () {
            Sa = void 0
        }), Sa = n.now()
    }

    function Xa(a, b) {
        var c, d = 0, e = {height: a};
        for (b = b ? 1 : 0; 4 > d; d += 2 - b) c = U[d], e["margin" + c] = e["padding" + c] = a;
        return b && (e.opacity = e.width = a), e
    }

    function Ya(a, b, c) {
        for (var d, e = (_a.tweeners[b] || []).concat(_a.tweeners["*"]), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) return d
    }

    function Za(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this, m = {}, o = a.style, p = a.nodeType && V(a), q = N.get(a, "fxshow");
        c.queue || (h = n._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
            h.unqueued || i()
        }), h.unqueued++, l.always(function () {
            l.always(function () {
                h.unqueued--, n.queue(a, "fx").length || h.empty.fire()
            })
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = n.css(a, "display"), k = "none" === j ? N.get(a, "olddisplay") || za(a.nodeName) : j, "inline" === k && "none" === n.css(a, "float") && (o.display = "inline-block")), c.overflow && (o.overflow = "hidden", l.always(function () {
            o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2]
        }));
        for (d in b) if (e = b[d], Ua.exec(e)) {
            if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
                if ("show" !== e || !q || void 0 === q[d]) continue;
                p = !0
            }
            m[d] = q && q[d] || n.style(a, d)
        } else j = void 0;
        if (n.isEmptyObject(m)) "inline" === ("none" === j ? za(a.nodeName) : j) && (o.display = j); else {
            q ? "hidden" in q && (p = q.hidden) : q = N.access(a, "fxshow", {}), f && (q.hidden = !p), p ? n(a).show() : l.done(function () {
                n(a).hide()
            }), l.done(function () {
                var b;
                N.remove(a, "fxshow");
                for (b in m) n.style(a, b, m[b])
            });
            for (d in m) g = Ya(p ? q[d] : 0, d, l), d in q || (q[d] = g.start, p && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }

    function $a(a, b) {
        var c, d, e, f, g;
        for (c in a) if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && "expand" in g) {
            f = g.expand(f), delete a[d];
            for (c in f) c in a || (a[c] = f[c], b[c] = e)
        } else b[d] = e
    }

    function _a(a, b, c) {
        var d, e, f = 0, g = _a.prefilters.length, h = n.Deferred().always(function () {
            delete i.elem
        }), i = function () {
            if (e) return !1;
            for (var b = Sa || Wa(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
            return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
        }, j = h.promise({
            elem: a,
            props: n.extend({}, b),
            opts: n.extend(!0, {specialEasing: {}, easing: n.easing._default}, c),
            originalProperties: b,
            originalOptions: c,
            startTime: Sa || Wa(),
            duration: c.duration,
            tweens: [],
            createTween: function (b, c) {
                var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d), d
            },
            stop: function (b) {
                var c = 0, d = b ? j.tweens.length : 0;
                if (e) return this;
                for (e = !0; d > c; c++) j.tweens[c].run(1);
                return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this
            }
        }), k = j.props;
        for ($a(k, j.opts.specialEasing); g > f; f++) if (d = _a.prefilters[f].call(j, a, k, j.opts)) return n.isFunction(d.stop) && (n._queueHooks(j.elem, j.opts.queue).stop = n.proxy(d.stop, d)), d;
        return n.map(k, Ya, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }

    n.Animation = n.extend(_a, {
        tweeners: {
            "*": [function (a, b) {
                var c = this.createTween(a, b);
                return W(c.elem, a, T.exec(b), c), c
            }]
        }, tweener: function (a, b) {
            n.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(G);
            for (var c, d = 0, e = a.length; e > d; d++) c = a[d], _a.tweeners[c] = _a.tweeners[c] || [], _a.tweeners[c].unshift(b)
        }, prefilters: [Za], prefilter: function (a, b) {
            b ? _a.prefilters.unshift(a) : _a.prefilters.push(a)
        }
    }), n.speed = function (a, b, c) {
        var d = a && "object" == typeof a ? n.extend({}, a) : {
            complete: c || !c && b || n.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !n.isFunction(b) && b
        };
        return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function () {
            n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue)
        }, d
    }, n.fn.extend({
        fadeTo: function (a, b, c, d) {
            return this.filter(V).css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
        }, animate: function (a, b, c, d) {
            var e = n.isEmptyObject(a), f = n.speed(b, c, d), g = function () {
                var b = _a(this, n.extend({}, a), f);
                (e || N.get(this, "finish")) && b.stop(!0)
            };
            return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        }, stop: function (a, b, c) {
            var d = function (a) {
                var b = a.stop;
                delete a.stop, b(c)
            };
            return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
                var b = !0, e = null != a && a + "queueHooks", f = n.timers, g = N.get(this);
                if (e) g[e] && g[e].stop && d(g[e]); else for (e in g) g[e] && g[e].stop && Va.test(e) && d(g[e]);
                for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                !b && c || n.dequeue(this, a)
            })
        }, finish: function (a) {
            return a !== !1 && (a = a || "fx"), this.each(function () {
                var b, c = N.get(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = n.timers, g = d ? d.length : 0;
                for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish
            })
        }
    }), n.each(["toggle", "show", "hide"], function (a, b) {
        var c = n.fn[b];
        n.fn[b] = function (a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(Xa(b, !0), a, d, e)
        }
    }), n.each({
        slideDown: Xa("show"),
        slideUp: Xa("hide"),
        slideToggle: Xa("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (a, b) {
        n.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), n.timers = [], n.fx.tick = function () {
        var a, b = 0, c = n.timers;
        for (Sa = n.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
        c.length || n.fx.stop(), Sa = void 0
    }, n.fx.timer = function (a) {
        n.timers.push(a), a() ? n.fx.start() : n.timers.pop()
    }, n.fx.interval = 13, n.fx.start = function () {
        Ta || (Ta = a.setInterval(n.fx.tick, n.fx.interval))
    }, n.fx.stop = function () {
        a.clearInterval(Ta), Ta = null
    }, n.fx.speeds = {slow: 600, fast: 200, _default: 400}, n.fn.delay = function (b, c) {
        return b = n.fx ? n.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function (c, d) {
            var e = a.setTimeout(c, b);
            d.stop = function () {
                a.clearTimeout(e)
            }
        })
    }, function () {
        var a = d.createElement("input"), b = d.createElement("select"), c = b.appendChild(d.createElement("option"));
        a.type = "checkbox", l.checkOn = "" !== a.value, l.optSelected = c.selected, b.disabled = !0, l.optDisabled = !c.disabled, a = d.createElement("input"), a.value = "t", a.type = "radio", l.radioValue = "t" === a.value
    }();
    var ab, bb = n.expr.attrHandle;
    n.fn.extend({
        attr: function (a, b) {
            return K(this, n.attr, a, b, arguments.length > 1)
        }, removeAttr: function (a) {
            return this.each(function () {
                n.removeAttr(this, a)
            })
        }
    }), n.extend({
        attr: function (a, b, c) {
            var d, e, f = a.nodeType;
            if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), e = n.attrHooks[b] || (n.expr.match.bool.test(b) ? ab : void 0)), void 0 !== c ? null === c ? void n.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = n.find.attr(a, b), null == d ? void 0 : d))
        }, attrHooks: {
            type: {
                set: function (a, b) {
                    if (!l.radioValue && "radio" === b && n.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        }, removeAttr: function (a, b) {
            var c, d, e = 0, f = b && b.match(G);
            if (f && 1 === a.nodeType) while (c = f[e++]) d = n.propFix[c] || c, n.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c)
        }
    }), ab = {
        set: function (a, b, c) {
            return b === !1 ? n.removeAttr(a, c) : a.setAttribute(c, c), c
        }
    }, n.each(n.expr.match.bool.source.match(/\w+/g), function (a, b) {
        var c = bb[b] || n.find.attr;
        bb[b] = function (a, b, d) {
            var e, f;
            return d || (f = bb[b], bb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, bb[b] = f), e
        }
    });
    var cb = /^(?:input|select|textarea|button)$/i, db = /^(?:a|area)$/i;
    n.fn.extend({
        prop: function (a, b) {
            return K(this, n.prop, a, b, arguments.length > 1)
        }, removeProp: function (a) {
            return this.each(function () {
                delete this[n.propFix[a] || a]
            })
        }
    }), n.extend({
        prop: function (a, b, c) {
            var d, e, f = a.nodeType;
            if (3 !== f && 8 !== f && 2 !== f) return 1 === f && n.isXMLDoc(a) || (b = n.propFix[b] || b, e = n.propHooks[b]),
                void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
        }, propHooks: {
            tabIndex: {
                get: function (a) {
                    var b = n.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : cb.test(a.nodeName) || db.test(a.nodeName) && a.href ? 0 : -1
                }
            }
        }, propFix: {"for": "htmlFor", "class": "className"}
    }), l.optSelected || (n.propHooks.selected = {
        get: function (a) {
            var b = a.parentNode;
            return b && b.parentNode && b.parentNode.selectedIndex, null
        }, set: function (a) {
            var b = a.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
        }
    }), n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        n.propFix[this.toLowerCase()] = this
    });
    var eb = /[\t\r\n\f]/g;

    function fb(a) {
        return a.getAttribute && a.getAttribute("class") || ""
    }

    n.fn.extend({
        addClass: function (a) {
            var b, c, d, e, f, g, h, i = 0;
            if (n.isFunction(a)) return this.each(function (b) {
                n(this).addClass(a.call(this, b, fb(this)))
            });
            if ("string" == typeof a && a) {
                b = a.match(G) || [];
                while (c = this[i++]) if (e = fb(c), d = 1 === c.nodeType && (" " + e + " ").replace(eb, " ")) {
                    g = 0;
                    while (f = b[g++]) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                    h = n.trim(d), e !== h && c.setAttribute("class", h)
                }
            }
            return this
        }, removeClass: function (a) {
            var b, c, d, e, f, g, h, i = 0;
            if (n.isFunction(a)) return this.each(function (b) {
                n(this).removeClass(a.call(this, b, fb(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof a && a) {
                b = a.match(G) || [];
                while (c = this[i++]) if (e = fb(c), d = 1 === c.nodeType && (" " + e + " ").replace(eb, " ")) {
                    g = 0;
                    while (f = b[g++]) while (d.indexOf(" " + f + " ") > -1) d = d.replace(" " + f + " ", " ");
                    h = n.trim(d), e !== h && c.setAttribute("class", h)
                }
            }
            return this
        }, toggleClass: function (a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : n.isFunction(a) ? this.each(function (c) {
                n(this).toggleClass(a.call(this, c, fb(this), b), b)
            }) : this.each(function () {
                var b, d, e, f;
                if ("string" === c) {
                    d = 0, e = n(this), f = a.match(G) || [];
                    while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
                } else void 0 !== a && "boolean" !== c || (b = fb(this), b && N.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : N.get(this, "__className__") || ""))
            })
        }, hasClass: function (a) {
            var b, c, d = 0;
            b = " " + a + " ";
            while (c = this[d++]) if (1 === c.nodeType && (" " + fb(c) + " ").replace(eb, " ").indexOf(b) > -1) return !0;
            return !1
        }
    });
    var gb = /\r/g, hb = /[\x20\t\r\n\f]+/g;
    n.fn.extend({
        val: function (a) {
            var b, c, d, e = this[0];
            {
                if (arguments.length) return d = n.isFunction(a), this.each(function (c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function (a) {
                        return null == a ? "" : a + ""
                    })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                });
                if (e) return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(gb, "") : null == c ? "" : c)
            }
        }
    }), n.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = n.find.attr(a, "value");
                    return null != b ? b : n.trim(n.text(a)).replace(hb, " ")
                }
            }, select: {
                get: function (a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++) if (c = d[i], (c.selected || i === e) && (l.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !n.nodeName(c.parentNode, "optgroup"))) {
                        if (b = n(c).val(), f) return b;
                        g.push(b)
                    }
                    return g
                }, set: function (a, b) {
                    var c, d, e = a.options, f = n.makeArray(b), g = e.length;
                    while (g--) d = e[g], (d.selected = n.inArray(n.valHooks.option.get(d), f) > -1) && (c = !0);
                    return c || (a.selectedIndex = -1), f
                }
            }
        }
    }), n.each(["radio", "checkbox"], function () {
        n.valHooks[this] = {
            set: function (a, b) {
                return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) > -1 : void 0
            }
        }, l.checkOn || (n.valHooks[this].get = function (a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    });
    var ib = /^(?:focusinfocus|focusoutblur)$/;
    n.extend(n.event, {
        trigger: function (b, c, e, f) {
            var g, h, i, j, l, m, o, p = [e || d], q = k.call(b, "type") ? b.type : b,
                r = k.call(b, "namespace") ? b.namespace.split(".") : [];
            if (h = i = e = e || d, 3 !== e.nodeType && 8 !== e.nodeType && !ib.test(q + n.event.triggered) && (q.indexOf(".") > -1 && (r = q.split("."), q = r.shift(), r.sort()), l = q.indexOf(":") < 0 && "on" + q, b = b[n.expando] ? b : new n.Event(q, "object" == typeof b && b), b.isTrigger = f ? 2 : 3, b.namespace = r.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = e), c = null == c ? [b] : n.makeArray(c, [b]), o = n.event.special[q] || {}, f || !o.trigger || o.trigger.apply(e, c) !== !1)) {
                if (!f && !o.noBubble && !n.isWindow(e)) {
                    for (j = o.delegateType || q, ib.test(j + q) || (h = h.parentNode); h; h = h.parentNode) p.push(h), i = h;
                    i === (e.ownerDocument || d) && p.push(i.defaultView || i.parentWindow || a)
                }
                g = 0;
                while ((h = p[g++]) && !b.isPropagationStopped()) b.type = g > 1 ? j : o.bindType || q, m = (N.get(h, "events") || {})[b.type] && N.get(h, "handle"), m && m.apply(h, c), m = l && h[l], m && m.apply && L(h) && (b.result = m.apply(h, c), b.result === !1 && b.preventDefault());
                return b.type = q, f || b.isDefaultPrevented() || o._default && o._default.apply(p.pop(), c) !== !1 || !L(e) || l && n.isFunction(e[q]) && !n.isWindow(e) && (i = e[l], i && (e[l] = null), n.event.triggered = q, e[q](), n.event.triggered = void 0, i && (e[l] = i)), b.result
            }
        }, simulate: function (a, b, c) {
            var d = n.extend(new n.Event, c, {type: a, isSimulated: !0});
            n.event.trigger(d, null, b)
        }
    }), n.fn.extend({
        trigger: function (a, b) {
            return this.each(function () {
                n.event.trigger(a, b, this)
            })
        }, triggerHandler: function (a, b) {
            var c = this[0];
            return c ? n.event.trigger(a, b, c, !0) : void 0
        }
    }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        n.fn[b] = function (a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), n.fn.extend({
        hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }), l.focusin = "onfocusin" in a, l.focusin || n.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var c = function (a) {
            n.event.simulate(b, a.target, n.event.fix(a))
        };
        n.event.special[b] = {
            setup: function () {
                var d = this.ownerDocument || this, e = N.access(d, b);
                e || d.addEventListener(a, c, !0), N.access(d, b, (e || 0) + 1)
            }, teardown: function () {
                var d = this.ownerDocument || this, e = N.access(d, b) - 1;
                e ? N.access(d, b, e) : (d.removeEventListener(a, c, !0), N.remove(d, b))
            }
        }
    });
    var jb = a.location, kb = n.now(), lb = /\?/;
    n.parseJSON = function (a) {
        return JSON.parse(a + "")
    }, n.parseXML = function (b) {
        var c;
        if (!b || "string" != typeof b) return null;
        try {
            c = (new a.DOMParser).parseFromString(b, "text/xml")
        } catch (d) {
            c = void 0
        }
        return c && !c.getElementsByTagName("parsererror").length || n.error("Invalid XML: " + b), c
    };
    var mb = /#.*$/, nb = /([?&])_=[^&]*/, ob = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        pb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, qb = /^(?:GET|HEAD)$/, rb = /^\/\//, sb = {},
        tb = {}, ub = "*/".concat("*"), vb = d.createElement("a");
    vb.href = jb.href;

    function wb(a) {
        return function (b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0, f = b.toLowerCase().match(G) || [];
            if (n.isFunction(c)) while (d = f[e++]) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function xb(a, b, c, d) {
        var e = {}, f = a === tb;

        function g(h) {
            var i;
            return e[h] = !0, n.each(a[h] || [], function (a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
            }), i
        }

        return g(b.dataTypes[0]) || !e["*"] && g("*")
    }

    function yb(a, b) {
        var c, d, e = n.ajaxSettings.flatOptions || {};
        for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
        return d && n.extend(!0, a, d), a
    }

    function zb(a, b, c) {
        var d, e, f, g, h = a.contents, i = a.dataTypes;
        while ("*" === i[0]) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
        if (d) for (e in h) if (h[e] && h[e].test(d)) {
            i.unshift(e);
            break
        }
        if (i[0] in c) f = i[0]; else {
            for (e in c) {
                if (!i[0] || a.converters[e + " " + i[0]]) {
                    f = e;
                    break
                }
                g || (g = e)
            }
            f = f || g
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
    }

    function Ab(a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i; else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                break
            }
            if (g !== !0) if (g && a["throws"]) b = g(b); else try {
                b = g(b)
            } catch (l) {
                return {state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f}
            }
        }
        return {state: "success", data: b}
    }

    n.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: jb.href,
            type: "GET",
            isLocal: pb.test(jb.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": ub,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": n.parseJSON, "text xml": n.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (a, b) {
            return b ? yb(yb(a, n.ajaxSettings), b) : yb(n.ajaxSettings, a)
        },
        ajaxPrefilter: wb(sb),
        ajaxTransport: wb(tb),
        ajax: function (b, c) {
            "object" == typeof b && (c = b, b = void 0), c = c || {};
            var e, f, g, h, i, j, k, l, m = n.ajaxSetup({}, c), o = m.context || m,
                p = m.context && (o.nodeType || o.jquery) ? n(o) : n.event, q = n.Deferred(),
                r = n.Callbacks("once memory"), s = m.statusCode || {}, t = {}, u = {}, v = 0, w = "canceled", x = {
                    readyState: 0, getResponseHeader: function (a) {
                        var b;
                        if (2 === v) {
                            if (!h) {
                                h = {};
                                while (b = ob.exec(g)) h[b[1].toLowerCase()] = b[2]
                            }
                            b = h[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    }, getAllResponseHeaders: function () {
                        return 2 === v ? g : null
                    }, setRequestHeader: function (a, b) {
                        var c = a.toLowerCase();
                        return v || (a = u[c] = u[c] || a, t[a] = b), this
                    }, overrideMimeType: function (a) {
                        return v || (m.mimeType = a), this
                    }, statusCode: function (a) {
                        var b;
                        if (a) if (2 > v) for (b in a) s[b] = [s[b], a[b]]; else x.always(a[x.status]);
                        return this
                    }, abort: function (a) {
                        var b = a || w;
                        return e && e.abort(b), z(0, b), this
                    }
                };
            if (q.promise(x).complete = r.add, x.success = x.done, x.error = x.fail, m.url = ((b || m.url || jb.href) + "").replace(mb, "").replace(rb, jb.protocol + "//"), m.type = c.method || c.type || m.method || m.type, m.dataTypes = n.trim(m.dataType || "*").toLowerCase().match(G) || [""], null == m.crossDomain) {
                j = d.createElement("a");
                try {
                    j.href = m.url, j.href = j.href, m.crossDomain = vb.protocol + "//" + vb.host != j.protocol + "//" + j.host
                } catch (y) {
                    m.crossDomain = !0
                }
            }
            if (m.data && m.processData && "string" != typeof m.data && (m.data = n.param(m.data, m.traditional)), xb(sb, m, c, x), 2 === v) return x;
            k = n.event && m.global, k && 0 === n.active++ && n.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !qb.test(m.type), f = m.url, m.hasContent || (m.data && (f = m.url += (lb.test(f) ? "&" : "?") + m.data, delete m.data), m.cache === !1 && (m.url = nb.test(f) ? f.replace(nb, "$1_=" + kb++) : f + (lb.test(f) ? "&" : "?") + "_=" + kb++)), m.ifModified && (n.lastModified[f] && x.setRequestHeader("If-Modified-Since", n.lastModified[f]), n.etag[f] && x.setRequestHeader("If-None-Match", n.etag[f])), (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && x.setRequestHeader("Content-Type", m.contentType), x.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + ub + "; q=0.01" : "") : m.accepts["*"]);
            for (l in m.headers) x.setRequestHeader(l, m.headers[l]);
            if (m.beforeSend && (m.beforeSend.call(o, x, m) === !1 || 2 === v)) return x.abort();
            w = "abort";
            for (l in{success: 1, error: 1, complete: 1}) x[l](m[l]);
            if (e = xb(tb, m, c, x)) {
                if (x.readyState = 1, k && p.trigger("ajaxSend", [x, m]), 2 === v) return x;
                m.async && m.timeout > 0 && (i = a.setTimeout(function () {
                    x.abort("timeout")
                }, m.timeout));
                try {
                    v = 1, e.send(t, z)
                } catch (y) {
                    if (!(2 > v)) throw y;
                    z(-1, y)
                }
            } else z(-1, "No Transport");

            function z(b, c, d, h) {
                var j, l, t, u, w, y = c;
                2 !== v && (v = 2, i && a.clearTimeout(i), e = void 0, g = h || "", x.readyState = b > 0 ? 4 : 0, j = b >= 200 && 300 > b || 304 === b, d && (u = zb(m, x, d)), u = Ab(m, u, x, j), j ? (m.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (n.lastModified[f] = w), w = x.getResponseHeader("etag"), w && (n.etag[f] = w)), 204 === b || "HEAD" === m.type ? y = "nocontent" : 304 === b ? y = "notmodified" : (y = u.state, l = u.data, t = u.error, j = !t)) : (t = y, !b && y || (y = "error", 0 > b && (b = 0))), x.status = b, x.statusText = (c || y) + "", j ? q.resolveWith(o, [l, y, x]) : q.rejectWith(o, [x, y, t]), x.statusCode(s), s = void 0, k && p.trigger(j ? "ajaxSuccess" : "ajaxError", [x, m, j ? l : t]), r.fireWith(o, [x, y]), k && (p.trigger("ajaxComplete", [x, m]), --n.active || n.event.trigger("ajaxStop")))
            }

            return x
        },
        getJSON: function (a, b, c) {
            return n.get(a, b, c, "json")
        },
        getScript: function (a, b) {
            return n.get(a, void 0, b, "script")
        }
    }), n.each(["get", "post"], function (a, b) {
        n[b] = function (a, c, d, e) {
            return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax(n.extend({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            }, n.isPlainObject(a) && a))
        }
    }), n._evalUrl = function (a) {
        return n.ajax({url: a, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }, n.fn.extend({
        wrapAll: function (a) {
            var b;
            return n.isFunction(a) ? this.each(function (b) {
                n(this).wrapAll(a.call(this, b))
            }) : (this[0] && (b = n(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                var a = this;
                while (a.firstElementChild) a = a.firstElementChild;
                return a
            }).append(this)), this)
        }, wrapInner: function (a) {
            return n.isFunction(a) ? this.each(function (b) {
                n(this).wrapInner(a.call(this, b))
            }) : this.each(function () {
                var b = n(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        }, wrap: function (a) {
            var b = n.isFunction(a);
            return this.each(function (c) {
                n(this).wrapAll(b ? a.call(this, c) : a)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                n.nodeName(this, "body") || n(this).replaceWith(this.childNodes)
            }).end()
        }
    }), n.expr.filters.hidden = function (a) {
        return !n.expr.filters.visible(a)
    }, n.expr.filters.visible = function (a) {
        return a.offsetWidth > 0 || a.offsetHeight > 0 || a.getClientRects().length > 0
    };
    var Bb = /%20/g, Cb = /\[\]$/, Db = /\r?\n/g, Eb = /^(?:submit|button|image|reset|file)$/i,
        Fb = /^(?:input|select|textarea|keygen)/i;

    function Gb(a, b, c, d) {
        var e;
        if (n.isArray(b)) n.each(b, function (b, e) {
            c || Cb.test(a) ? d(a, e) : Gb(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d)
        }); else if (c || "object" !== n.type(b)) d(a, b); else for (e in b) Gb(a + "[" + e + "]", b[e], c, d)
    }

    n.param = function (a, b) {
        var c, d = [], e = function (a, b) {
            b = n.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a)) n.each(a, function () {
            e(this.name, this.value)
        }); else for (c in a) Gb(c, a[c], b, e);
        return d.join("&").replace(Bb, "+")
    }, n.fn.extend({
        serialize: function () {
            return n.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var a = n.prop(this, "elements");
                return a ? n.makeArray(a) : this
            }).filter(function () {
                var a = this.type;
                return this.name && !n(this).is(":disabled") && Fb.test(this.nodeName) && !Eb.test(a) && (this.checked || !X.test(a))
            }).map(function (a, b) {
                var c = n(this).val();
                return null == c ? null : n.isArray(c) ? n.map(c, function (a) {
                    return {name: b.name, value: a.replace(Db, "\r\n")}
                }) : {name: b.name, value: c.replace(Db, "\r\n")}
            }).get()
        }
    }), n.ajaxSettings.xhr = function () {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    };
    var Hb = {0: 200, 1223: 204}, Ib = n.ajaxSettings.xhr();
    l.cors = !!Ib && "withCredentials" in Ib, l.ajax = Ib = !!Ib, n.ajaxTransport(function (b) {
        var c, d;
        return l.cors || Ib && !b.crossDomain ? {
            send: function (e, f) {
                var g, h = b.xhr();
                if (h.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields) for (g in b.xhrFields) h[g] = b.xhrFields[g];
                b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType), b.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                for (g in e) h.setRequestHeader(g, e[g]);
                c = function (a) {
                    return function () {
                        c && (c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Hb[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? {binary: h.response} : {text: h.responseText}, h.getAllResponseHeaders()))
                    }
                }, h.onload = c(), d = h.onerror = c("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function () {
                    4 === h.readyState && a.setTimeout(function () {
                        c && d()
                    })
                }, c = c("abort");
                try {
                    h.send(b.hasContent && b.data || null)
                } catch (i) {
                    if (c) throw i
                }
            }, abort: function () {
                c && c()
            }
        } : void 0
    }), n.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /\b(?:java|ecma)script\b/},
        converters: {
            "text script": function (a) {
                return n.globalEval(a), a
            }
        }
    }), n.ajaxPrefilter("script", function (a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
    }), n.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var b, c;
            return {
                send: function (e, f) {
                    b = n("<script>").prop({charset: a.scriptCharset, src: a.url}).on("load error", c = function (a) {
                        b.remove(), c = null, a && f("error" === a.type ? 404 : 200, a.type)
                    }), d.head.appendChild(b[0])
                }, abort: function () {
                    c && c()
                }
            }
        }
    });
    var Jb = [], Kb = /(=)\?(?=&|$)|\?\?/;
    n.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var a = Jb.pop() || n.expando + "_" + kb++;
            return this[a] = !0, a
        }
    }), n.ajaxPrefilter("json jsonp", function (b, c, d) {
        var e, f, g,
            h = b.jsonp !== !1 && (Kb.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && Kb.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Kb, "$1" + e) : b.jsonp !== !1 && (b.url += (lb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
            return g || n.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
            g = arguments
        }, d.always(function () {
            void 0 === f ? n(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Jb.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0
        }), "script") : void 0
    }), n.parseHTML = function (a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || d;
        var e = x.exec(a), f = !c && [];
        return e ? [b.createElement(e[1])] : (e = ca([a], b, f), f && f.length && n(f).remove(), n.merge([], e.childNodes))
    };
    var Lb = n.fn.load;
    n.fn.load = function (a, b, c) {
        if ("string" != typeof a && Lb) return Lb.apply(this, arguments);
        var d, e, f, g = this, h = a.indexOf(" ");
        return h > -1 && (d = n.trim(a.slice(h)), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && n.ajax({
            url: a,
            type: e || "GET",
            dataType: "html",
            data: b
        }).done(function (a) {
            f = arguments, g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a)
        }).always(c && function (a, b) {
            g.each(function () {
                c.apply(this, f || [a.responseText, b, a])
            })
        }), this
    }, n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
        n.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), n.expr.filters.animated = function (a) {
        return n.grep(n.timers, function (b) {
            return a === b.elem
        }).length
    };

    function Mb(a) {
        return n.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
    }

    n.offset = {
        setOffset: function (a, b, c) {
            var d, e, f, g, h, i, j, k = n.css(a, "position"), l = n(a), m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = n.css(a, "top"), i = n.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), n.isFunction(b) && (b = b.call(a, c, n.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
        }
    }, n.fn.extend({
        offset: function (a) {
            if (arguments.length) return void 0 === a ? this : this.each(function (b) {
                n.offset.setOffset(this, a, b)
            });
            var b, c, d = this[0], e = {top: 0, left: 0}, f = d && d.ownerDocument;
            if (f) return b = f.documentElement, n.contains(b, d) ? (e = d.getBoundingClientRect(), c = Mb(f), {
                top: e.top + c.pageYOffset - b.clientTop,
                left: e.left + c.pageXOffset - b.clientLeft
            }) : e
        }, position: function () {
            if (this[0]) {
                var a, b, c = this[0], d = {top: 0, left: 0};
                return "fixed" === n.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), n.nodeName(a[0], "html") || (d = a.offset()), d.top += n.css(a[0], "borderTopWidth", !0), d.left += n.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - d.top - n.css(c, "marginTop", !0),
                    left: b.left - d.left - n.css(c, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                var a = this.offsetParent;
                while (a && "static" === n.css(a, "position")) a = a.offsetParent;
                return a || Ea
            })
        }
    }), n.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, b) {
        var c = "pageYOffset" === b;
        n.fn[a] = function (d) {
            return K(this, function (a, d, e) {
                var f = Mb(a);
                return void 0 === e ? f ? f[b] : a[d] : void(f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e)
            }, a, d, arguments.length)
        }
    }), n.each(["top", "left"], function (a, b) {
        n.cssHooks[b] = Ga(l.pixelPosition, function (a, c) {
            return c ? (c = Fa(a, b), Ba.test(c) ? n(a).position()[b] + "px" : c) : void 0
        })
    }), n.each({Height: "height", Width: "width"}, function (a, b) {
        n.each({padding: "inner" + a, content: b, "": "outer" + a}, function (c, d) {
            n.fn[d] = function (d, e) {
                var f = arguments.length && (c || "boolean" != typeof d),
                    g = c || (d === !0 || e === !0 ? "margin" : "border");
                return K(this, function (b, c, d) {
                    var e;
                    return n.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g)
                }, b, f ? d : void 0, f, null)
            }
        })
    }), n.fn.extend({
        bind: function (a, b, c) {
            return this.on(a, null, b, c)
        }, unbind: function (a, b) {
            return this.off(a, null, b)
        }, delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        }, undelegate: function (a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }, size: function () {
            return this.length
        }
    }), n.fn.andSelf = n.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return n
    });
    var Nb = a.jQuery, Ob = a.$;
    return n.noConflict = function (b) {
        return a.$ === n && (a.$ = Ob), b && a.jQuery === n && (a.jQuery = Nb), n
    }, b || (a.jQuery = a.$ = n), n
});

/*! jQuery UI - v1.12.1 - 2017-06-29
* http://jqueryui.com
* Includes: widget.js, position.js, data.js, disable-selection.js, focusable.js, form-reset-mixin.js, jquery-1-7.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/draggable.js, widgets/droppable.js, widgets/resizable.js, widgets/sortable.js, widgets/autocomplete.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/datepicker.js, widgets/dialog.js, widgets/menu.js, widgets/mouse.js, widgets/selectmenu.js, widgets/slider.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function (t) {
    "function" == typeof define && define.amd ? define('jqueryui', ["jquery"], t) : t(jQuery)
})(function (t) {
    function e(t) {
        for (var e = t.css("visibility"); "inherit" === e;) t = t.parent(), e = t.css("visibility");
        return "hidden" !== e
    }

    function i(t) {
        for (var e, i; t.length && t[0] !== document;) {
            if (e = t.css("position"), ("absolute" === e || "relative" === e || "fixed" === e) && (i = parseInt(t.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
            t = t.parent()
        }
        return 0
    }

    function s() {
        this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        }, this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        }, t.extend(this._defaults, this.regional[""]), this.regional.en = t.extend(!0, {}, this.regional[""]), this.regional["en-US"] = t.extend(!0, {}, this.regional.en), this.dpDiv = n(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }

    function n(e) {
        var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return e.on("mouseout", i, function () {
            t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover")
        }).on("mouseover", i, o)
    }

    function o() {
        t.datepicker._isDisabledDatepicker(d.inline ? d.dpDiv.parent()[0] : d.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"))
    }

    function a(e, i) {
        t.extend(e, i);
        for (var s in i) null == i[s] && (e[s] = i[s]);
        return e
    }

    t.ui = t.ui || {}, t.ui.version = "1.12.1";
    var r = 0, l = Array.prototype.slice;
    t.cleanData = function (e) {
        return function (i) {
            var s, n, o;
            for (o = 0; null != (n = i[o]); o++) try {
                s = t._data(n, "events"), s && s.remove && t(n).triggerHandler("remove")
            } catch (a) {
            }
            e(i)
        }
    }(t.cleanData), t.widget = function (e, i, s) {
        var n, o, a, r = {}, l = e.split(".")[0];
        e = e.split(".")[1];
        var h = l + "-" + e;
        return s || (s = i, i = t.Widget), t.isArray(s) && (s = t.extend.apply(null, [{}].concat(s))), t.expr[":"][h.toLowerCase()] = function (e) {
            return !!t.data(e, h)
        }, t[l] = t[l] || {}, n = t[l][e], o = t[l][e] = function (t, e) {
            return this._createWidget ? (arguments.length && this._createWidget(t, e), void 0) : new o(t, e)
        }, t.extend(o, n, {
            version: s.version,
            _proto: t.extend({}, s),
            _childConstructors: []
        }), a = new i, a.options = t.widget.extend({}, a.options), t.each(s, function (e, s) {
            return t.isFunction(s) ? (r[e] = function () {
                function t() {
                    return i.prototype[e].apply(this, arguments)
                }

                function n(t) {
                    return i.prototype[e].apply(this, t)
                }

                return function () {
                    var e, i = this._super, o = this._superApply;
                    return this._super = t, this._superApply = n, e = s.apply(this, arguments), this._super = i, this._superApply = o, e
                }
            }(), void 0) : (r[e] = s, void 0)
        }), o.prototype = t.widget.extend(a, {widgetEventPrefix: n ? a.widgetEventPrefix || e : e}, r, {
            constructor: o,
            namespace: l,
            widgetName: e,
            widgetFullName: h
        }), n ? (t.each(n._childConstructors, function (e, i) {
            var s = i.prototype;
            t.widget(s.namespace + "." + s.widgetName, o, i._proto)
        }), delete n._childConstructors) : i._childConstructors.push(o), t.widget.bridge(e, o), o
    }, t.widget.extend = function (e) {
        for (var i, s, n = l.call(arguments, 1), o = 0, a = n.length; a > o; o++) for (i in n[o]) s = n[o][i], n[o].hasOwnProperty(i) && void 0 !== s && (e[i] = t.isPlainObject(s) ? t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], s) : t.widget.extend({}, s) : s);
        return e
    }, t.widget.bridge = function (e, i) {
        var s = i.prototype.widgetFullName || e;
        t.fn[e] = function (n) {
            var o = "string" == typeof n, a = l.call(arguments, 1), r = this;
            return o ? this.length || "instance" !== n ? this.each(function () {
                var i, o = t.data(this, s);
                return "instance" === n ? (r = o, !1) : o ? t.isFunction(o[n]) && "_" !== n.charAt(0) ? (i = o[n].apply(o, a), i !== o && void 0 !== i ? (r = i && i.jquery ? r.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + n + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; " + "attempted to call method '" + n + "'")
            }) : r = void 0 : (a.length && (n = t.widget.extend.apply(null, [n].concat(a))), this.each(function () {
                var e = t.data(this, s);
                e ? (e.option(n || {}), e._init && e._init()) : t.data(this, s, new i(n, this))
            })), r
        }
    }, t.Widget = function () {
    }, t.Widget._childConstructors = [], t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {classes: {}, disabled: !1, create: null},
        _createWidget: function (e, i) {
            i = t(i || this.defaultElement || this)[0], this.element = t(i), this.uuid = r++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), this.classesElementLookup = {}, i !== this && (t.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (t) {
                    t.target === i && this.destroy()
                }
            }), this.document = t(i.style ? i.ownerDocument : i.document || i), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: function () {
            return {}
        },
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function () {
            var e = this;
            this._destroy(), t.each(this.classesElementLookup, function (t, i) {
                e._removeClass(i, t)
            }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace)
        },
        _destroy: t.noop,
        widget: function () {
            return this.element
        },
        option: function (e, i) {
            var s, n, o, a = e;
            if (0 === arguments.length) return t.widget.extend({}, this.options);
            if ("string" == typeof e) if (a = {}, s = e.split("."), e = s.shift(), s.length) {
                for (n = a[e] = t.widget.extend({}, this.options[e]), o = 0; s.length - 1 > o; o++) n[s[o]] = n[s[o]] || {}, n = n[s[o]];
                if (e = s.pop(), 1 === arguments.length) return void 0 === n[e] ? null : n[e];
                n[e] = i
            } else {
                if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
                a[e] = i
            }
            return this._setOptions(a), this
        },
        _setOptions: function (t) {
            var e;
            for (e in t) this._setOption(e, t[e]);
            return this
        },
        _setOption: function (t, e) {
            return "classes" === t && this._setOptionClasses(e), this.options[t] = e, "disabled" === t && this._setOptionDisabled(e), this
        },
        _setOptionClasses: function (e) {
            var i, s, n;
            for (i in e) n = this.classesElementLookup[i], e[i] !== this.options.classes[i] && n && n.length && (s = t(n.get()), this._removeClass(n, i), s.addClass(this._classes({
                element: s,
                keys: i,
                classes: e,
                add: !0
            })))
        },
        _setOptionDisabled: function (t) {
            this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t), t && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"))
        },
        enable: function () {
            return this._setOptions({disabled: !1})
        },
        disable: function () {
            return this._setOptions({disabled: !0})
        },
        _classes: function (e) {
            function i(i, o) {
                var a, r;
                for (r = 0; i.length > r; r++) a = n.classesElementLookup[i[r]] || t(), a = e.add ? t(t.unique(a.get().concat(e.element.get()))) : t(a.not(e.element).get()), n.classesElementLookup[i[r]] = a, s.push(i[r]), o && e.classes[i[r]] && s.push(e.classes[i[r]])
            }

            var s = [], n = this;
            return e = t.extend({
                element: this.element,
                classes: this.options.classes || {}
            }, e), this._on(e.element, {remove: "_untrackClassesElement"}), e.keys && i(e.keys.match(/\S+/g) || [], !0), e.extra && i(e.extra.match(/\S+/g) || []), s.join(" ")
        },
        _untrackClassesElement: function (e) {
            var i = this;
            t.each(i.classesElementLookup, function (s, n) {
                -1 !== t.inArray(e.target, n) && (i.classesElementLookup[s] = t(n.not(e.target).get()))
            })
        },
        _removeClass: function (t, e, i) {
            return this._toggleClass(t, e, i, !1)
        },
        _addClass: function (t, e, i) {
            return this._toggleClass(t, e, i, !0)
        },
        _toggleClass: function (t, e, i, s) {
            s = "boolean" == typeof s ? s : i;
            var n = "string" == typeof t || null === t,
                o = {extra: n ? e : i, keys: n ? t : e, element: n ? this.element : t, add: s};
            return o.element.toggleClass(this._classes(o), s), this
        },
        _on: function (e, i, s) {
            var n, o = this;
            "boolean" != typeof e && (s = i, i = e, e = !1), s ? (i = n = t(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), t.each(s, function (s, a) {
                function r() {
                    return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? o[a] : a).apply(o, arguments) : void 0
                }

                "string" != typeof a && (r.guid = a.guid = a.guid || r.guid || t.guid++);
                var l = s.match(/^([\w:-]*)\s*(.*)$/), h = l[1] + o.eventNamespace, c = l[2];
                c ? n.on(h, c, r) : i.on(h, r)
            })
        },
        _off: function (e, i) {
            i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.off(i).off(i), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get())
        },
        _delay: function (t, e) {
            function i() {
                return ("string" == typeof t ? s[t] : t).apply(s, arguments)
            }

            var s = this;
            return setTimeout(i, e || 0)
        },
        _hoverable: function (e) {
            this.hoverable = this.hoverable.add(e), this._on(e, {
                mouseenter: function (e) {
                    this._addClass(t(e.currentTarget), null, "ui-state-hover")
                }, mouseleave: function (e) {
                    this._removeClass(t(e.currentTarget), null, "ui-state-hover")
                }
            })
        },
        _focusable: function (e) {
            this.focusable = this.focusable.add(e), this._on(e, {
                focusin: function (e) {
                    this._addClass(t(e.currentTarget), null, "ui-state-focus")
                }, focusout: function (e) {
                    this._removeClass(t(e.currentTarget), null, "ui-state-focus")
                }
            })
        },
        _trigger: function (e, i, s) {
            var n, o, a = this.options[e];
            if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent) for (n in o) n in i || (i[n] = o[n]);
            return this.element.trigger(i, s), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
        }
    }, t.each({show: "fadeIn", hide: "fadeOut"}, function (e, i) {
        t.Widget.prototype["_" + e] = function (s, n, o) {
            "string" == typeof n && (n = {effect: n});
            var a, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;
            n = n || {}, "number" == typeof n && (n = {duration: n}), a = !t.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function (i) {
                t(this)[e](), o && o.call(s[0]), i()
            })
        }
    }), t.widget, function () {
        function e(t, e, i) {
            return [parseFloat(t[0]) * (u.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (u.test(t[1]) ? i / 100 : 1)]
        }

        function i(e, i) {
            return parseInt(t.css(e, i), 10) || 0
        }

        function s(e) {
            var i = e[0];
            return 9 === i.nodeType ? {
                width: e.width(),
                height: e.height(),
                offset: {top: 0, left: 0}
            } : t.isWindow(i) ? {
                width: e.width(),
                height: e.height(),
                offset: {top: e.scrollTop(), left: e.scrollLeft()}
            } : i.preventDefault ? {
                width: 0,
                height: 0,
                offset: {top: i.pageY, left: i.pageX}
            } : {width: e.outerWidth(), height: e.outerHeight(), offset: e.offset()}
        }

        var n, o = Math.max, a = Math.abs, r = /left|center|right/, l = /top|center|bottom/,
            h = /[\+\-]\d+(\.[\d]+)?%?/, c = /^\w+/, u = /%$/, d = t.fn.position;
        t.position = {
            scrollbarWidth: function () {
                if (void 0 !== n) return n;
                var e, i,
                    s = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                    o = s.children()[0];
                return t("body").append(s), e = o.offsetWidth, s.css("overflow", "scroll"), i = o.offsetWidth, e === i && (i = s[0].clientWidth), s.remove(), n = e - i
            }, getScrollInfo: function (e) {
                var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
                    s = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
                    n = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth,
                    o = "scroll" === s || "auto" === s && e.height < e.element[0].scrollHeight;
                return {width: o ? t.position.scrollbarWidth() : 0, height: n ? t.position.scrollbarWidth() : 0}
            }, getWithinInfo: function (e) {
                var i = t(e || window), s = t.isWindow(i[0]), n = !!i[0] && 9 === i[0].nodeType, o = !s && !n;
                return {
                    element: i,
                    isWindow: s,
                    isDocument: n,
                    offset: o ? t(e).offset() : {left: 0, top: 0},
                    scrollLeft: i.scrollLeft(),
                    scrollTop: i.scrollTop(),
                    width: i.outerWidth(),
                    height: i.outerHeight()
                }
            }
        }, t.fn.position = function (n) {
            if (!n || !n.of) return d.apply(this, arguments);
            n = t.extend({}, n);
            var u, p, f, g, m, _, v = t(n.of), b = t.position.getWithinInfo(n.within), y = t.position.getScrollInfo(b),
                w = (n.collision || "flip").split(" "), k = {};
            return _ = s(v), v[0].preventDefault && (n.at = "left top"), p = _.width, f = _.height, g = _.offset, m = t.extend({}, g), t.each(["my", "at"], function () {
                var t, e, i = (n[this] || "").split(" ");
                1 === i.length && (i = r.test(i[0]) ? i.concat(["center"]) : l.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = r.test(i[0]) ? i[0] : "center", i[1] = l.test(i[1]) ? i[1] : "center", t = h.exec(i[0]), e = h.exec(i[1]), k[this] = [t ? t[0] : 0, e ? e[0] : 0], n[this] = [c.exec(i[0])[0], c.exec(i[1])[0]]
            }), 1 === w.length && (w[1] = w[0]), "right" === n.at[0] ? m.left += p : "center" === n.at[0] && (m.left += p / 2), "bottom" === n.at[1] ? m.top += f : "center" === n.at[1] && (m.top += f / 2), u = e(k.at, p, f), m.left += u[0], m.top += u[1], this.each(function () {
                var s, r, l = t(this), h = l.outerWidth(), c = l.outerHeight(), d = i(this, "marginLeft"),
                    _ = i(this, "marginTop"), x = h + d + i(this, "marginRight") + y.width,
                    C = c + _ + i(this, "marginBottom") + y.height, D = t.extend({}, m),
                    T = e(k.my, l.outerWidth(), l.outerHeight());
                "right" === n.my[0] ? D.left -= h : "center" === n.my[0] && (D.left -= h / 2), "bottom" === n.my[1] ? D.top -= c : "center" === n.my[1] && (D.top -= c / 2), D.left += T[0], D.top += T[1], s = {
                    marginLeft: d,
                    marginTop: _
                }, t.each(["left", "top"], function (e, i) {
                    t.ui.position[w[e]] && t.ui.position[w[e]][i](D, {
                        targetWidth: p,
                        targetHeight: f,
                        elemWidth: h,
                        elemHeight: c,
                        collisionPosition: s,
                        collisionWidth: x,
                        collisionHeight: C,
                        offset: [u[0] + T[0], u[1] + T[1]],
                        my: n.my,
                        at: n.at,
                        within: b,
                        elem: l
                    })
                }), n.using && (r = function (t) {
                    var e = g.left - D.left, i = e + p - h, s = g.top - D.top, r = s + f - c, u = {
                        target: {element: v, left: g.left, top: g.top, width: p, height: f},
                        element: {element: l, left: D.left, top: D.top, width: h, height: c},
                        horizontal: 0 > i ? "left" : e > 0 ? "right" : "center",
                        vertical: 0 > r ? "top" : s > 0 ? "bottom" : "middle"
                    };
                    h > p && p > a(e + i) && (u.horizontal = "center"), c > f && f > a(s + r) && (u.vertical = "middle"), u.important = o(a(e), a(i)) > o(a(s), a(r)) ? "horizontal" : "vertical", n.using.call(this, t, u)
                }), l.offset(t.extend(D, {using: r}))
            })
        }, t.ui.position = {
            fit: {
                left: function (t, e) {
                    var i, s = e.within, n = s.isWindow ? s.scrollLeft : s.offset.left, a = s.width,
                        r = t.left - e.collisionPosition.marginLeft, l = n - r, h = r + e.collisionWidth - a - n;
                    e.collisionWidth > a ? l > 0 && 0 >= h ? (i = t.left + l + e.collisionWidth - a - n, t.left += l - i) : t.left = h > 0 && 0 >= l ? n : l > h ? n + a - e.collisionWidth : n : l > 0 ? t.left += l : h > 0 ? t.left -= h : t.left = o(t.left - r, t.left)
                }, top: function (t, e) {
                    var i, s = e.within, n = s.isWindow ? s.scrollTop : s.offset.top, a = e.within.height,
                        r = t.top - e.collisionPosition.marginTop, l = n - r, h = r + e.collisionHeight - a - n;
                    e.collisionHeight > a ? l > 0 && 0 >= h ? (i = t.top + l + e.collisionHeight - a - n, t.top += l - i) : t.top = h > 0 && 0 >= l ? n : l > h ? n + a - e.collisionHeight : n : l > 0 ? t.top += l : h > 0 ? t.top -= h : t.top = o(t.top - r, t.top)
                }
            }, flip: {
                left: function (t, e) {
                    var i, s, n = e.within, o = n.offset.left + n.scrollLeft, r = n.width,
                        l = n.isWindow ? n.scrollLeft : n.offset.left, h = t.left - e.collisionPosition.marginLeft,
                        c = h - l, u = h + e.collisionWidth - r - l,
                        d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
                        p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
                        f = -2 * e.offset[0];
                    0 > c ? (i = t.left + d + p + f + e.collisionWidth - r - o, (0 > i || a(c) > i) && (t.left += d + p + f)) : u > 0 && (s = t.left - e.collisionPosition.marginLeft + d + p + f - l, (s > 0 || u > a(s)) && (t.left += d + p + f))
                }, top: function (t, e) {
                    var i, s, n = e.within, o = n.offset.top + n.scrollTop, r = n.height,
                        l = n.isWindow ? n.scrollTop : n.offset.top, h = t.top - e.collisionPosition.marginTop,
                        c = h - l, u = h + e.collisionHeight - r - l, d = "top" === e.my[1],
                        p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                        f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
                        g = -2 * e.offset[1];
                    0 > c ? (s = t.top + p + f + g + e.collisionHeight - r - o, (0 > s || a(c) > s) && (t.top += p + f + g)) : u > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + g - l, (i > 0 || u > a(i)) && (t.top += p + f + g))
                }
            }, flipfit: {
                left: function () {
                    t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
                }, top: function () {
                    t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
                }
            }
        }
    }(), t.ui.position, t.extend(t.expr[":"], {
        data: t.expr.createPseudo ? t.expr.createPseudo(function (e) {
            return function (i) {
                return !!t.data(i, e)
            }
        }) : function (e, i, s) {
            return !!t.data(e, s[3])
        }
    }), t.fn.extend({
        disableSelection: function () {
            var t = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function () {
                return this.on(t + ".ui-disableSelection", function (t) {
                    t.preventDefault()
                })
            }
        }(), enableSelection: function () {
            return this.off(".ui-disableSelection")
        }
    }), t.ui.focusable = function (i, s) {
        var n, o, a, r, l, h = i.nodeName.toLowerCase();
        return "area" === h ? (n = i.parentNode, o = n.name, i.href && o && "map" === n.nodeName.toLowerCase() ? (a = t("img[usemap='#" + o + "']"), a.length > 0 && a.is(":visible")) : !1) : (/^(input|select|textarea|button|object)$/.test(h) ? (r = !i.disabled, r && (l = t(i).closest("fieldset")[0], l && (r = !l.disabled))) : r = "a" === h ? i.href || s : s, r && t(i).is(":visible") && e(t(i)))
    }, t.extend(t.expr[":"], {
        focusable: function (e) {
            return t.ui.focusable(e, null != t.attr(e, "tabindex"))
        }
    }), t.ui.focusable, t.fn.form = function () {
        return "string" == typeof this[0].form ? this.closest("form") : t(this[0].form)
    }, t.ui.formResetMixin = {
        _formResetHandler: function () {
            var e = t(this);
            setTimeout(function () {
                var i = e.data("ui-form-reset-instances");
                t.each(i, function () {
                    this.refresh()
                })
            })
        }, _bindFormResetHandler: function () {
            if (this.form = this.element.form(), this.form.length) {
                var t = this.form.data("ui-form-reset-instances") || [];
                t.length || this.form.on("reset.ui-form-reset", this._formResetHandler), t.push(this), this.form.data("ui-form-reset-instances", t)
            }
        }, _unbindFormResetHandler: function () {
            if (this.form.length) {
                var e = this.form.data("ui-form-reset-instances");
                e.splice(t.inArray(this, e), 1), e.length ? this.form.data("ui-form-reset-instances", e) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")
            }
        }
    }, "1.7" === t.fn.jquery.substring(0, 3) && (t.each(["Width", "Height"], function (e, i) {
        function s(e, i, s, o) {
            return t.each(n, function () {
                i -= parseFloat(t.css(e, "padding" + this)) || 0, s && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), o && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
            }), i
        }

        var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"], o = i.toLowerCase(), a = {
            innerWidth: t.fn.innerWidth,
            innerHeight: t.fn.innerHeight,
            outerWidth: t.fn.outerWidth,
            outerHeight: t.fn.outerHeight
        };
        t.fn["inner" + i] = function (e) {
            return void 0 === e ? a["inner" + i].call(this) : this.each(function () {
                t(this).css(o, s(this, e) + "px")
            })
        }, t.fn["outer" + i] = function (e, n) {
            return "number" != typeof e ? a["outer" + i].call(this, e) : this.each(function () {
                t(this).css(o, s(this, e, !0, n) + "px")
            })
        }
    }), t.fn.addBack = function (t) {
        return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
    }), t.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
    }, t.ui.escapeSelector = function () {
        var t = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;
        return function (e) {
            return e.replace(t, "\\$1")
        }
    }(), t.fn.labels = function () {
        var e, i, s, n, o;
        return this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (n = this.eq(0).parents("label"), s = this.attr("id"), s && (e = this.eq(0).parents().last(), o = e.add(e.length ? e.siblings() : this.siblings()), i = "label[for='" + t.ui.escapeSelector(s) + "']", n = n.add(o.find(i).addBack(i))), this.pushStack(n))
    }, t.fn.scrollParent = function (e) {
        var i = this.css("position"), s = "absolute" === i, n = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
            o = this.parents().filter(function () {
                var e = t(this);
                return s && "static" === e.css("position") ? !1 : n.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
            }).eq(0);
        return "fixed" !== i && o.length ? o : t(this[0].ownerDocument || document)
    }, t.extend(t.expr[":"], {
        tabbable: function (e) {
            var i = t.attr(e, "tabindex"), s = null != i;
            return (!s || i >= 0) && t.ui.focusable(e, s)
        }
    }), t.fn.extend({
        uniqueId: function () {
            var t = 0;
            return function () {
                return this.each(function () {
                    this.id || (this.id = "ui-id-" + ++t)
                })
            }
        }(), removeUniqueId: function () {
            return this.each(function () {
                /^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id")
            })
        }
    }), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    var h = !1;
    t(document).on("mouseup", function () {
        h = !1
    }), t.widget("ui.mouse", {
        version: "1.12.1",
        options: {cancel: "input, textarea, button, select, option", distance: 1, delay: 0},
        _mouseInit: function () {
            var e = this;
            this.element.on("mousedown." + this.widgetName, function (t) {
                return e._mouseDown(t)
            }).on("click." + this.widgetName, function (i) {
                return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
            }), this.started = !1
        },
        _mouseDestroy: function () {
            this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function (e) {
            if (!h) {
                this._mouseMoved = !1, this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
                var i = this, s = 1 === e.which,
                    n = "string" == typeof this.options.cancel && e.target.nodeName ? t(e.target).closest(this.options.cancel).length : !1;
                return s && !n && this._mouseCapture(e) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                    i.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(e) !== !1, !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (t) {
                    return i._mouseMove(t)
                }, this._mouseUpDelegate = function (t) {
                    return i._mouseUp(t)
                }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), h = !0, !0)) : !0
            }
        },
        _mouseMove: function (e) {
            if (this._mouseMoved) {
                if (t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button) return this._mouseUp(e);
                if (!e.which) if (e.originalEvent.altKey || e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey) this.ignoreMissingWhich = !0; else if (!this.ignoreMissingWhich) return this._mouseUp(e)
            }
            return (e.which || e.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
        },
        _mouseUp: function (e) {
            this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, h = !1, e.preventDefault()
        },
        _mouseDistanceMet: function (t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {
        },
        _mouseDrag: function () {
        },
        _mouseStop: function () {
        },
        _mouseCapture: function () {
            return !0
        }
    }), t.ui.plugin = {
        add: function (e, i, s) {
            var n, o = t.ui[e].prototype;
            for (n in s) o.plugins[n] = o.plugins[n] || [], o.plugins[n].push([i, s[n]])
        }, call: function (t, e, i, s) {
            var n, o = t.plugins[e];
            if (o && (s || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType)) for (n = 0; o.length > n; n++) t.options[o[n][0]] && o[n][1].apply(t.element, i)
        }
    }, t.ui.safeActiveElement = function (t) {
        var e;
        try {
            e = t.activeElement
        } catch (i) {
            e = t.body
        }
        return e || (e = t.body), e.nodeName || (e = t.body), e
    }, t.ui.safeBlur = function (e) {
        e && "body" !== e.nodeName.toLowerCase() && t(e).trigger("blur")
    }, t.widget("ui.draggable", t.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function () {
            "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this._addClass("ui-draggable"), this._setHandleClassName(), this._mouseInit()
        },
        _setOption: function (t, e) {
            this._super(t, e), "handle" === t && (this._removeHandleClassName(), this._setHandleClassName())
        },
        _destroy: function () {
            return (this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0, void 0) : (this._removeHandleClassName(), this._mouseDestroy(), void 0)
        },
        _mouseCapture: function (e) {
            var i = this.options;
            return this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), this.handle ? (this._blurActiveElement(e), this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix), !0) : !1)
        },
        _blockFrames: function (e) {
            this.iframeBlocks = this.document.find(e).map(function () {
                var e = t(this);
                return t("<div>").css("position", "absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]
            })
        },
        _unblockFrames: function () {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
        },
        _blurActiveElement: function (e) {
            var i = t.ui.safeActiveElement(this.document[0]), s = t(e.target);
            s.closest(i).length || t.ui.safeBlur(i)
        },
        _mouseStart: function (e) {
            var i = this.options;
            return this.helper = this._createHelper(e), this._addClass(this.helper, "ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function () {
                return "fixed" === t(this).css("position")
            }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(e), this.originalPosition = this.position = this._generatePosition(e, !1), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
        },
        _refreshOffsets: function (t) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: !1,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }, this.offset.click = {left: t.pageX - this.offset.left, top: t.pageY - this.offset.top}
        },
        _mouseDrag: function (e, i) {
            if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                var s = this._uiHash();
                if (this._trigger("drag", e, s) === !1) return this._mouseUp(new t.Event("mouseup", e)), !1;
                this.position = s.position
            }
            return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
        },
        _mouseStop: function (e) {
            var i = this, s = !1;
            return t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)), this.dropped && (s = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                i._trigger("stop", e) !== !1 && i._clear()
            }) : this._trigger("stop", e) !== !1 && this._clear(), !1
        },
        _mouseUp: function (e) {
            return this._unblockFrames(), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), this.handleElement.is(e.target) && this.element.trigger("focus"), t.ui.mouse.prototype._mouseUp.call(this, e)
        },
        cancel: function () {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new t.Event("mouseup", {target: this.element[0]})) : this._clear(), this
        },
        _getHandle: function (e) {
            return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0
        },
        _setHandleClassName: function () {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this._addClass(this.handleElement, "ui-draggable-handle")
        },
        _removeHandleClassName: function () {
            this._removeClass(this.handleElement, "ui-draggable-handle")
        },
        _createHelper: function (e) {
            var i = this.options, s = t.isFunction(i.helper),
                n = s ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
            return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s && n[0] === this.element[0] && this._setPositionRelative(), n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n
        },
        _setPositionRelative: function () {
            /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
        },
        _adjustOffsetFromHelper: function (e) {
            "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _isRootNode: function (t) {
            return /(html|body)/i.test(t.tagName) || t === this.document[0]
        },
        _getParentOffset: function () {
            var e = this.offsetParent.offset(), i = this.document[0];
            return "absolute" === this.cssPosition && this.scrollParent[0] !== i && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (e = {
                top: 0,
                left: 0
            }), {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if ("relative" !== this.cssPosition) return {top: 0, left: 0};
            var t = this.element.position(), e = this._isRootNode(this.scrollParent[0]);
            return {
                top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()),
                left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft())
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        },
        _setContainment: function () {
            var e, i, s, n = this.options, o = this.document[0];
            return this.relativeContainer = null, n.containment ? "window" === n.containment ? (this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === n.containment ? (this.containment = [0, 0, t(o).width() - this.helperProportions.width - this.margins.left, (t(o).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : n.containment.constructor === Array ? (this.containment = n.containment, void 0) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = t(n.containment), s = i[0], s && (e = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i), void 0) : (this.containment = null, void 0)
        },
        _convertPositionTo: function (t, e) {
            e || (e = this.position);
            var i = "absolute" === t ? 1 : -1, s = this._isRootNode(this.scrollParent[0]);
            return {
                top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i,
                left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i
            }
        },
        _generatePosition: function (t, e) {
            var i, s, n, o, a = this.options, r = this._isRootNode(this.scrollParent[0]), l = t.pageX, h = t.pageY;
            return r && this.offset.scroll || (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft()
            }), e && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)), a.grid && (n = a.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, h = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - a.grid[1] : n + a.grid[1] : n, o = a.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, l = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - a.grid[0] : o + a.grid[0] : o), "y" === a.axis && (l = this.originalPageX), "x" === a.axis && (h = this.originalPageY)), {
                top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top),
                left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left)
            }
        },
        _clear: function () {
            this._removeClass(this.helper, "ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
        },
        _trigger: function (e, i, s) {
            return s = s || this._uiHash(), t.ui.plugin.call(this, e, [i, s, this], !0), /^(drag|start|stop)/.test(e) && (this.positionAbs = this._convertPositionTo("absolute"), s.offset = this.positionAbs), t.Widget.prototype._trigger.call(this, e, i, s)
        },
        plugins: {},
        _uiHash: function () {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), t.ui.plugin.add("draggable", "connectToSortable", {
        start: function (e, i, s) {
            var n = t.extend({}, i, {item: s.element});
            s.sortables = [], t(s.options.connectToSortable).each(function () {
                var i = t(this).sortable("instance");
                i && !i.options.disabled && (s.sortables.push(i), i.refreshPositions(), i._trigger("activate", e, n))
            })
        }, stop: function (e, i, s) {
            var n = t.extend({}, i, {item: s.element});
            s.cancelHelperRemoval = !1, t.each(s.sortables, function () {
                var t = this;
                t.isOver ? (t.isOver = 0, s.cancelHelperRemoval = !0, t.cancelHelperRemoval = !1, t._storedCSS = {
                    position: t.placeholder.css("position"),
                    top: t.placeholder.css("top"),
                    left: t.placeholder.css("left")
                }, t._mouseStop(e), t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0, t._trigger("deactivate", e, n))
            })
        }, drag: function (e, i, s) {
            t.each(s.sortables, function () {
                var n = !1, o = this;
                o.positionAbs = s.positionAbs, o.helperProportions = s.helperProportions, o.offset.click = s.offset.click, o._intersectsWith(o.containerCache) && (n = !0, t.each(s.sortables, function () {
                    return this.positionAbs = s.positionAbs, this.helperProportions = s.helperProportions, this.offset.click = s.offset.click, this !== o && this._intersectsWith(this.containerCache) && t.contains(o.element[0], this.element[0]) && (n = !1), n
                })), n ? (o.isOver || (o.isOver = 1, s._parent = i.helper.parent(), o.currentItem = i.helper.appendTo(o.element).data("ui-sortable-item", !0), o.options._helper = o.options.helper, o.options.helper = function () {
                    return i.helper[0]
                }, e.target = o.currentItem[0], o._mouseCapture(e, !0), o._mouseStart(e, !0, !0), o.offset.click.top = s.offset.click.top, o.offset.click.left = s.offset.click.left, o.offset.parent.left -= s.offset.parent.left - o.offset.parent.left, o.offset.parent.top -= s.offset.parent.top - o.offset.parent.top, s._trigger("toSortable", e), s.dropped = o.element, t.each(s.sortables, function () {
                    this.refreshPositions()
                }), s.currentItem = s.element, o.fromOutside = s), o.currentItem && (o._mouseDrag(e), i.position = o.position)) : o.isOver && (o.isOver = 0, o.cancelHelperRemoval = !0, o.options._revert = o.options.revert, o.options.revert = !1, o._trigger("out", e, o._uiHash(o)), o._mouseStop(e, !0), o.options.revert = o.options._revert, o.options.helper = o.options._helper, o.placeholder && o.placeholder.remove(), i.helper.appendTo(s._parent), s._refreshOffsets(e), i.position = s._generatePosition(e, !0), s._trigger("fromSortable", e), s.dropped = !1, t.each(s.sortables, function () {
                    this.refreshPositions()
                }))
            })
        }
    }), t.ui.plugin.add("draggable", "cursor", {
        start: function (e, i, s) {
            var n = t("body"), o = s.options;
            n.css("cursor") && (o._cursor = n.css("cursor")), n.css("cursor", o.cursor)
        }, stop: function (e, i, s) {
            var n = s.options;
            n._cursor && t("body").css("cursor", n._cursor)
        }
    }), t.ui.plugin.add("draggable", "opacity", {
        start: function (e, i, s) {
            var n = t(i.helper), o = s.options;
            n.css("opacity") && (o._opacity = n.css("opacity")), n.css("opacity", o.opacity)
        }, stop: function (e, i, s) {
            var n = s.options;
            n._opacity && t(i.helper).css("opacity", n._opacity)
        }
    }), t.ui.plugin.add("draggable", "scroll", {
        start: function (t, e, i) {
            i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
        }, drag: function (e, i, s) {
            var n = s.options, o = !1, a = s.scrollParentNotHidden[0], r = s.document[0];
            a !== r && "HTML" !== a.tagName ? (n.axis && "x" === n.axis || (s.overflowOffset.top + a.offsetHeight - e.pageY < n.scrollSensitivity ? a.scrollTop = o = a.scrollTop + n.scrollSpeed : e.pageY - s.overflowOffset.top < n.scrollSensitivity && (a.scrollTop = o = a.scrollTop - n.scrollSpeed)), n.axis && "y" === n.axis || (s.overflowOffset.left + a.offsetWidth - e.pageX < n.scrollSensitivity ? a.scrollLeft = o = a.scrollLeft + n.scrollSpeed : e.pageX - s.overflowOffset.left < n.scrollSensitivity && (a.scrollLeft = o = a.scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (e.pageY - t(r).scrollTop() < n.scrollSensitivity ? o = t(r).scrollTop(t(r).scrollTop() - n.scrollSpeed) : t(window).height() - (e.pageY - t(r).scrollTop()) < n.scrollSensitivity && (o = t(r).scrollTop(t(r).scrollTop() + n.scrollSpeed))), n.axis && "y" === n.axis || (e.pageX - t(r).scrollLeft() < n.scrollSensitivity ? o = t(r).scrollLeft(t(r).scrollLeft() - n.scrollSpeed) : t(window).width() - (e.pageX - t(r).scrollLeft()) < n.scrollSensitivity && (o = t(r).scrollLeft(t(r).scrollLeft() + n.scrollSpeed)))), o !== !1 && t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(s, e)
        }
    }), t.ui.plugin.add("draggable", "snap", {
        start: function (e, i, s) {
            var n = s.options;
            s.snapElements = [], t(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function () {
                var e = t(this), i = e.offset();
                this !== s.element[0] && s.snapElements.push({
                    item: this,
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    top: i.top,
                    left: i.left
                })
            })
        }, drag: function (e, i, s) {
            var n, o, a, r, l, h, c, u, d, p, f = s.options, g = f.snapTolerance, m = i.offset.left,
                _ = m + s.helperProportions.width, v = i.offset.top, b = v + s.helperProportions.height;
            for (d = s.snapElements.length - 1; d >= 0; d--) l = s.snapElements[d].left - s.margins.left, h = l + s.snapElements[d].width, c = s.snapElements[d].top - s.margins.top, u = c + s.snapElements[d].height, l - g > _ || m > h + g || c - g > b || v > u + g || !t.contains(s.snapElements[d].item.ownerDocument, s.snapElements[d].item) ? (s.snapElements[d].snapping && s.options.snap.release && s.options.snap.release.call(s.element, e, t.extend(s._uiHash(), {snapItem: s.snapElements[d].item})), s.snapElements[d].snapping = !1) : ("inner" !== f.snapMode && (n = g >= Math.abs(c - b), o = g >= Math.abs(u - v), a = g >= Math.abs(l - _), r = g >= Math.abs(h - m), n && (i.position.top = s._convertPositionTo("relative", {
                top: c - s.helperProportions.height,
                left: 0
            }).top), o && (i.position.top = s._convertPositionTo("relative", {
                top: u,
                left: 0
            }).top), a && (i.position.left = s._convertPositionTo("relative", {
                top: 0,
                left: l - s.helperProportions.width
            }).left), r && (i.position.left = s._convertPositionTo("relative", {
                top: 0,
                left: h
            }).left)), p = n || o || a || r, "outer" !== f.snapMode && (n = g >= Math.abs(c - v), o = g >= Math.abs(u - b), a = g >= Math.abs(l - m), r = g >= Math.abs(h - _), n && (i.position.top = s._convertPositionTo("relative", {
                top: c,
                left: 0
            }).top), o && (i.position.top = s._convertPositionTo("relative", {
                top: u - s.helperProportions.height,
                left: 0
            }).top), a && (i.position.left = s._convertPositionTo("relative", {
                top: 0,
                left: l
            }).left), r && (i.position.left = s._convertPositionTo("relative", {
                top: 0,
                left: h - s.helperProportions.width
            }).left)), !s.snapElements[d].snapping && (n || o || a || r || p) && s.options.snap.snap && s.options.snap.snap.call(s.element, e, t.extend(s._uiHash(), {snapItem: s.snapElements[d].item})), s.snapElements[d].snapping = n || o || a || r || p)
        }
    }), t.ui.plugin.add("draggable", "stack", {
        start: function (e, i, s) {
            var n, o = s.options, a = t.makeArray(t(o.stack)).sort(function (e, i) {
                return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
            });
            a.length && (n = parseInt(t(a[0]).css("zIndex"), 10) || 0, t(a).each(function (e) {
                t(this).css("zIndex", n + e)
            }), this.css("zIndex", n + a.length))
        }
    }), t.ui.plugin.add("draggable", "zIndex", {
        start: function (e, i, s) {
            var n = t(i.helper), o = s.options;
            n.css("zIndex") && (o._zIndex = n.css("zIndex")), n.css("zIndex", o.zIndex)
        }, stop: function (e, i, s) {
            var n = s.options;
            n._zIndex && t(i.helper).css("zIndex", n._zIndex)
        }
    }), t.ui.draggable, t.widget("ui.droppable", {
        version: "1.12.1",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            addClasses: !0,
            greedy: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function () {
            var e, i = this.options, s = i.accept;
            this.isover = !1, this.isout = !0, this.accept = t.isFunction(s) ? s : function (t) {
                return t.is(s)
            }, this.proportions = function () {
                return arguments.length ? (e = arguments[0], void 0) : e ? e : e = {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                }
            }, this._addToManager(i.scope), i.addClasses && this._addClass("ui-droppable")
        },
        _addToManager: function (e) {
            t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || [], t.ui.ddmanager.droppables[e].push(this)
        },
        _splice: function (t) {
            for (var e = 0; t.length > e; e++) t[e] === this && t.splice(e, 1)
        },
        _destroy: function () {
            var e = t.ui.ddmanager.droppables[this.options.scope];
            this._splice(e)
        },
        _setOption: function (e, i) {
            if ("accept" === e) this.accept = t.isFunction(i) ? i : function (t) {
                return t.is(i)
            }; else if ("scope" === e) {
                var s = t.ui.ddmanager.droppables[this.options.scope];
                this._splice(s), this._addToManager(i)
            }
            this._super(e, i)
        },
        _activate: function (e) {
            var i = t.ui.ddmanager.current;
            this._addActiveClass(), i && this._trigger("activate", e, this.ui(i))
        },
        _deactivate: function (e) {
            var i = t.ui.ddmanager.current;
            this._removeActiveClass(), i && this._trigger("deactivate", e, this.ui(i))
        },
        _over: function (e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._addHoverClass(), this._trigger("over", e, this.ui(i)))
        },
        _out: function (e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._removeHoverClass(), this._trigger("out", e, this.ui(i)))
        },
        _drop: function (e, i) {
            var s = i || t.ui.ddmanager.current, n = !1;
            return s && (s.currentItem || s.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
                var i = t(this).droppable("instance");
                return i.options.greedy && !i.options.disabled && i.options.scope === s.options.scope && i.accept.call(i.element[0], s.currentItem || s.element) && c(s, t.extend(i, {offset: i.element.offset()}), i.options.tolerance, e) ? (n = !0, !1) : void 0
            }), n ? !1 : this.accept.call(this.element[0], s.currentItem || s.element) ? (this._removeActiveClass(), this._removeHoverClass(), this._trigger("drop", e, this.ui(s)), this.element) : !1) : !1
        },
        ui: function (t) {
            return {
                draggable: t.currentItem || t.element,
                helper: t.helper,
                position: t.position,
                offset: t.positionAbs
            }
        },
        _addHoverClass: function () {
            this._addClass("ui-droppable-hover")
        },
        _removeHoverClass: function () {
            this._removeClass("ui-droppable-hover")
        },
        _addActiveClass: function () {
            this._addClass("ui-droppable-active")
        },
        _removeActiveClass: function () {
            this._removeClass("ui-droppable-active")
        }
    });
    var c = t.ui.intersect = function () {
        function t(t, e, i) {
            return t >= e && e + i > t
        }

        return function (e, i, s, n) {
            if (!i.offset) return !1;
            var o = (e.positionAbs || e.position.absolute).left + e.margins.left,
                a = (e.positionAbs || e.position.absolute).top + e.margins.top, r = o + e.helperProportions.width,
                l = a + e.helperProportions.height, h = i.offset.left, c = i.offset.top, u = h + i.proportions().width,
                d = c + i.proportions().height;
            switch (s) {
                case"fit":
                    return o >= h && u >= r && a >= c && d >= l;
                case"intersect":
                    return o + e.helperProportions.width / 2 > h && u > r - e.helperProportions.width / 2 && a + e.helperProportions.height / 2 > c && d > l - e.helperProportions.height / 2;
                case"pointer":
                    return t(n.pageY, c, i.proportions().height) && t(n.pageX, h, i.proportions().width);
                case"touch":
                    return (a >= c && d >= a || l >= c && d >= l || c > a && l > d) && (o >= h && u >= o || r >= h && u >= r || h > o && r > u);
                default:
                    return !1
            }
        }
    }();
    t.ui.ddmanager = {
        current: null, droppables: {"default": []}, prepareOffsets: function (e, i) {
            var s, n, o = t.ui.ddmanager.droppables[e.options.scope] || [], a = i ? i.type : null,
                r = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
            t:for (s = 0; o.length > s; s++) if (!(o[s].options.disabled || e && !o[s].accept.call(o[s].element[0], e.currentItem || e.element))) {
                for (n = 0; r.length > n; n++) if (r[n] === o[s].element[0]) {
                    o[s].proportions().height = 0;
                    continue t
                }
                o[s].visible = "none" !== o[s].element.css("display"), o[s].visible && ("mousedown" === a && o[s]._activate.call(o[s], i), o[s].offset = o[s].element.offset(), o[s].proportions({
                    width: o[s].element[0].offsetWidth,
                    height: o[s].element[0].offsetHeight
                }))
            }
        }, drop: function (e, i) {
            var s = !1;
            return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function () {
                this.options && (!this.options.disabled && this.visible && c(e, this, this.options.tolerance, i) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
            }), s
        }, dragStart: function (e, i) {
            e.element.parentsUntil("body").on("scroll.droppable", function () {
                e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
            })
        }, drag: function (e, i) {
            e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function () {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var s, n, o, a = c(e, this, this.options.tolerance, i),
                        r = !a && this.isover ? "isout" : a && !this.isover ? "isover" : null;
                    r && (this.options.greedy && (n = this.options.scope, o = this.element.parents(":data(ui-droppable)").filter(function () {
                        return t(this).droppable("instance").options.scope === n
                    }), o.length && (s = t(o[0]).droppable("instance"), s.greedyChild = "isover" === r)), s && "isover" === r && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[r] = !0, this["isout" === r ? "isover" : "isout"] = !1, this["isover" === r ? "_over" : "_out"].call(this, i), s && "isout" === r && (s.isout = !1, s.isover = !0, s._over.call(s, i)))
                }
            })
        }, dragStop: function (e, i) {
            e.element.parentsUntil("body").off("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
        }
    }, t.uiBackCompat !== !1 && t.widget("ui.droppable", t.ui.droppable, {
        options: {hoverClass: !1, activeClass: !1},
        _addActiveClass: function () {
            this._super(), this.options.activeClass && this.element.addClass(this.options.activeClass)
        },
        _removeActiveClass: function () {
            this._super(), this.options.activeClass && this.element.removeClass(this.options.activeClass)
        },
        _addHoverClass: function () {
            this._super(), this.options.hoverClass && this.element.addClass(this.options.hoverClass)
        },
        _removeHoverClass: function () {
            this._super(), this.options.hoverClass && this.element.removeClass(this.options.hoverClass)
        }
    }), t.ui.droppable, t.widget("ui.resizable", t.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            classes: {"ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"},
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function (t) {
            return parseFloat(t) || 0
        },
        _isNumber: function (t) {
            return !isNaN(parseFloat(t))
        },
        _hasScroll: function (e, i) {
            if ("hidden" === t(e).css("overflow")) return !1;
            var s = i && "left" === i ? "scrollLeft" : "scrollTop", n = !1;
            return e[s] > 0 ? !0 : (e[s] = 1, n = e[s] > 0, e[s] = 0, n)
        },
        _create: function () {
            var e, i = this.options, s = this;
            this._addClass("ui-resizable"), t.extend(this, {
                _aspectRatio: !!i.aspectRatio,
                aspectRatio: i.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: i.helper || i.ghost || i.animate ? i.helper || "ui-resizable-helper" : null
            }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, e = {
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom"),
                marginLeft: this.originalElement.css("marginLeft")
            }, this.element.css(e), this.originalElement.css("margin", 0), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })), this.originalElement.css(e), this._proportionallyResize()), this._setupHandles(), i.autoHide && t(this.element).on("mouseenter", function () {
                i.disabled || (s._removeClass("ui-resizable-autohide"), s._handles.show())
            }).on("mouseleave", function () {
                i.disabled || s.resizing || (s._addClass("ui-resizable-autohide"), s._handles.hide())
            }), this._mouseInit()
        },
        _destroy: function () {
            this._mouseDestroy();
            var e, i = function (e) {
                t(e).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()
            };
            return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
                position: e.css("position"),
                width: e.outerWidth(),
                height: e.outerHeight(),
                top: e.css("top"),
                left: e.css("left")
            }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
        },
        _setOption: function (t, e) {
            switch (this._super(t, e), t) {
                case"handles":
                    this._removeHandles(), this._setupHandles();
                    break;
                default:
            }
        },
        _setupHandles: function () {
            var e, i, s, n, o, a = this.options, r = this;
            if (this.handles = a.handles || (t(".ui-resizable-handle", this.element).length ? {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            } : "e,s,se"), this._handles = t(), this.handles.constructor === String) for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), s = this.handles.split(","), this.handles = {}, i = 0; s.length > i; i++) e = t.trim(s[i]), n = "ui-resizable-" + e, o = t("<div>"), this._addClass(o, "ui-resizable-handle " + n), o.css({zIndex: a.zIndex}), this.handles[e] = ".ui-resizable-" + e, this.element.append(o);
            this._renderAxis = function (e) {
                var i, s, n, o;
                e = e || this.element;
                for (i in this.handles) this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = t(this.handles[i]), this._on(this.handles[i], {mousedown: r._mouseDown})), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (s = t(this.handles[i], this.element), o = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), n = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(n, o), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i])
            }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.on("mouseover", function () {
                r.resizing || (this.className && (o = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), r.axis = o && o[1] ? o[1] : "se")
            }), a.autoHide && (this._handles.hide(), this._addClass("ui-resizable-autohide"))
        },
        _removeHandles: function () {
            this._handles.remove()
        },
        _mouseCapture: function (e) {
            var i, s, n = !1;
            for (i in this.handles) s = t(this.handles[i])[0], (s === e.target || t.contains(s, e.target)) && (n = !0);
            return !this.options.disabled && n
        },
        _mouseStart: function (e) {
            var i, s, n, o = this.options, a = this.element;
            return this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css("left")), s = this._num(this.helper.css("top")), o.containment && (i += t(o.containment).scrollLeft() || 0, s += t(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: i,
                top: s
            }, this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {width: a.width(), height: a.height()}, this.originalSize = this._helper ? {
                width: a.outerWidth(),
                height: a.outerHeight()
            } : {width: a.width(), height: a.height()}, this.sizeDiff = {
                width: a.outerWidth() - a.width(),
                height: a.outerHeight() - a.height()
            }, this.originalPosition = {left: i, top: s}, this.originalMousePosition = {
                left: e.pageX,
                top: e.pageY
            }, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, n = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === n ? this.axis + "-resize" : n), this._addClass("ui-resizable-resizing"), this._propagate("start", e), !0
        },
        _mouseDrag: function (e) {
            var i, s, n = this.originalMousePosition, o = this.axis, a = e.pageX - n.left || 0,
                r = e.pageY - n.top || 0, l = this._change[o];
            return this._updatePrevProperties(), l ? (i = l.apply(this, [e, a, r]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), s = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(s) || (this._updatePrevProperties(), this._trigger("resize", e, this.ui()), this._applyChanges()), !1) : !1
        },
        _mouseStop: function (e) {
            this.resizing = !1;
            var i, s, n, o, a, r, l, h = this.options, c = this;
            return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && this._hasScroll(i[0], "left") ? 0 : c.sizeDiff.height, o = s ? 0 : c.sizeDiff.width, a = {
                width: c.helper.width() - o,
                height: c.helper.height() - n
            }, r = parseFloat(c.element.css("left")) + (c.position.left - c.originalPosition.left) || null, l = parseFloat(c.element.css("top")) + (c.position.top - c.originalPosition.top) || null, h.animate || this.element.css(t.extend(a, {
                top: l,
                left: r
            })), c.helper.height(c.size.height), c.helper.width(c.size.width), this._helper && !h.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this._removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
        },
        _updatePrevProperties: function () {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            }, this.prevSize = {width: this.size.width, height: this.size.height}
        },
        _applyChanges: function () {
            var t = {};
            return this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"), this.helper.css(t), t
        },
        _updateVirtualBoundaries: function (t) {
            var e, i, s, n, o, a = this.options;
            o = {
                minWidth: this._isNumber(a.minWidth) ? a.minWidth : 0,
                maxWidth: this._isNumber(a.maxWidth) ? a.maxWidth : 1 / 0,
                minHeight: this._isNumber(a.minHeight) ? a.minHeight : 0,
                maxHeight: this._isNumber(a.maxHeight) ? a.maxHeight : 1 / 0
            }, (this._aspectRatio || t) && (e = o.minHeight * this.aspectRatio, s = o.minWidth / this.aspectRatio, i = o.maxHeight * this.aspectRatio, n = o.maxWidth / this.aspectRatio, e > o.minWidth && (o.minWidth = e), s > o.minHeight && (o.minHeight = s), o.maxWidth > i && (o.maxWidth = i), o.maxHeight > n && (o.maxHeight = n)), this._vBoundaries = o
        },
        _updateCache: function (t) {
            this.offset = this.helper.offset(), this._isNumber(t.left) && (this.position.left = t.left), this._isNumber(t.top) && (this.position.top = t.top), this._isNumber(t.height) && (this.size.height = t.height), this._isNumber(t.width) && (this.size.width = t.width)
        },
        _updateRatio: function (t) {
            var e = this.position, i = this.size, s = this.axis;
            return this._isNumber(t.height) ? t.width = t.height * this.aspectRatio : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio), "sw" === s && (t.left = e.left + (i.width - t.width), t.top = null), "nw" === s && (t.top = e.top + (i.height - t.height), t.left = e.left + (i.width - t.width)), t
        },
        _respectSize: function (t) {
            var e = this._vBoundaries, i = this.axis, s = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
                n = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
                o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
                a = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
                r = this.originalPosition.left + this.originalSize.width,
                l = this.originalPosition.top + this.originalSize.height, h = /sw|nw|w/.test(i), c = /nw|ne|n/.test(i);
            return o && (t.width = e.minWidth), a && (t.height = e.minHeight), s && (t.width = e.maxWidth), n && (t.height = e.maxHeight), o && h && (t.left = r - e.minWidth), s && h && (t.left = r - e.maxWidth), a && c && (t.top = l - e.minHeight), n && c && (t.top = l - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
        },
        _getPaddingPlusBorderDimensions: function (t) {
            for (var e = 0, i = [], s = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")], n = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")]; 4 > e; e++) i[e] = parseFloat(s[e]) || 0, i[e] += parseFloat(n[e]) || 0;
            return {height: i[0] + i[2], width: i[1] + i[3]}
        },
        _proportionallyResize: function () {
            if (this._proportionallyResizeElements.length) for (var t, e = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > e; e++) t = this._proportionallyResizeElements[e], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)), t.css({
                height: i.height() - this.outerDimensions.height || 0,
                width: i.width() - this.outerDimensions.width || 0
            })
        },
        _renderProxy: function () {
            var e = this.element, i = this.options;
            this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this._addClass(this.helper, this._helper), this.helper.css({
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++i.zIndex
            }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function (t, e) {
                return {width: this.originalSize.width + e}
            }, w: function (t, e) {
                var i = this.originalSize, s = this.originalPosition;
                return {left: s.left + e, width: i.width - e}
            }, n: function (t, e, i) {
                var s = this.originalSize, n = this.originalPosition;
                return {top: n.top + i, height: s.height - i}
            }, s: function (t, e, i) {
                return {height: this.originalSize.height + i}
            }, se: function (e, i, s) {
                return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
            }, sw: function (e, i, s) {
                return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
            }, ne: function (e, i, s) {
                return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
            }, nw: function (e, i, s) {
                return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
            }
        },
        _propagate: function (e, i) {
            t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui())
        },
        plugins: {},
        ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }), t.ui.plugin.add("resizable", "animate", {
        stop: function (e) {
            var i = t(this).resizable("instance"), s = i.options, n = i._proportionallyResizeElements,
                o = n.length && /textarea/i.test(n[0].nodeName),
                a = o && i._hasScroll(n[0], "left") ? 0 : i.sizeDiff.height, r = o ? 0 : i.sizeDiff.width,
                l = {width: i.size.width - r, height: i.size.height - a},
                h = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null,
                c = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(t.extend(l, c && h ? {top: c, left: h} : {}), {
                duration: s.animateDuration,
                easing: s.animateEasing,
                step: function () {
                    var s = {
                        width: parseFloat(i.element.css("width")),
                        height: parseFloat(i.element.css("height")),
                        top: parseFloat(i.element.css("top")),
                        left: parseFloat(i.element.css("left"))
                    };
                    n && n.length && t(n[0]).css({
                        width: s.width,
                        height: s.height
                    }), i._updateCache(s), i._propagate("resize", e)
                }
            })
        }
    }), t.ui.plugin.add("resizable", "containment", {
        start: function () {
            var e, i, s, n, o, a, r, l = t(this).resizable("instance"), h = l.options, c = l.element, u = h.containment,
                d = u instanceof t ? u.get(0) : /parent/.test(u) ? c.parent().get(0) : u;
            d && (l.containerElement = t(d), /document/.test(u) || u === document ? (l.containerOffset = {
                left: 0,
                top: 0
            }, l.containerPosition = {left: 0, top: 0}, l.parentData = {
                element: t(document),
                left: 0,
                top: 0,
                width: t(document).width(),
                height: t(document).height() || document.body.parentNode.scrollHeight
            }) : (e = t(d), i = [], t(["Top", "Right", "Left", "Bottom"]).each(function (t, s) {
                i[t] = l._num(e.css("padding" + s))
            }), l.containerOffset = e.offset(), l.containerPosition = e.position(), l.containerSize = {
                height: e.innerHeight() - i[3],
                width: e.innerWidth() - i[1]
            }, s = l.containerOffset, n = l.containerSize.height, o = l.containerSize.width, a = l._hasScroll(d, "left") ? d.scrollWidth : o, r = l._hasScroll(d) ? d.scrollHeight : n, l.parentData = {
                element: d,
                left: s.left,
                top: s.top,
                width: a,
                height: r
            }))
        }, resize: function (e) {
            var i, s, n, o, a = t(this).resizable("instance"), r = a.options, l = a.containerOffset, h = a.position,
                c = a._aspectRatio || e.shiftKey, u = {top: 0, left: 0}, d = a.containerElement, p = !0;
            d[0] !== document && /static/.test(d.css("position")) && (u = l), h.left < (a._helper ? l.left : 0) && (a.size.width = a.size.width + (a._helper ? a.position.left - l.left : a.position.left - u.left), c && (a.size.height = a.size.width / a.aspectRatio, p = !1), a.position.left = r.helper ? l.left : 0), h.top < (a._helper ? l.top : 0) && (a.size.height = a.size.height + (a._helper ? a.position.top - l.top : a.position.top), c && (a.size.width = a.size.height * a.aspectRatio, p = !1), a.position.top = a._helper ? l.top : 0), n = a.containerElement.get(0) === a.element.parent().get(0), o = /relative|absolute/.test(a.containerElement.css("position")), n && o ? (a.offset.left = a.parentData.left + a.position.left, a.offset.top = a.parentData.top + a.position.top) : (a.offset.left = a.element.offset().left, a.offset.top = a.element.offset().top), i = Math.abs(a.sizeDiff.width + (a._helper ? a.offset.left - u.left : a.offset.left - l.left)), s = Math.abs(a.sizeDiff.height + (a._helper ? a.offset.top - u.top : a.offset.top - l.top)), i + a.size.width >= a.parentData.width && (a.size.width = a.parentData.width - i, c && (a.size.height = a.size.width / a.aspectRatio, p = !1)), s + a.size.height >= a.parentData.height && (a.size.height = a.parentData.height - s, c && (a.size.width = a.size.height * a.aspectRatio, p = !1)), p || (a.position.left = a.prevPosition.left, a.position.top = a.prevPosition.top, a.size.width = a.prevSize.width, a.size.height = a.prevSize.height)
        }, stop: function () {
            var e = t(this).resizable("instance"), i = e.options, s = e.containerOffset, n = e.containerPosition,
                o = e.containerElement, a = t(e.helper), r = a.offset(), l = a.outerWidth() - e.sizeDiff.width,
                h = a.outerHeight() - e.sizeDiff.height;
            e._helper && !i.animate && /relative/.test(o.css("position")) && t(this).css({
                left: r.left - n.left - s.left,
                width: l,
                height: h
            }), e._helper && !i.animate && /static/.test(o.css("position")) && t(this).css({
                left: r.left - n.left - s.left,
                width: l,
                height: h
            })
        }
    }), t.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
            var e = t(this).resizable("instance"), i = e.options;
            t(i.alsoResize).each(function () {
                var e = t(this);
                e.data("ui-resizable-alsoresize", {
                    width: parseFloat(e.width()),
                    height: parseFloat(e.height()),
                    left: parseFloat(e.css("left")),
                    top: parseFloat(e.css("top"))
                })
            })
        }, resize: function (e, i) {
            var s = t(this).resizable("instance"), n = s.options, o = s.originalSize, a = s.originalPosition, r = {
                height: s.size.height - o.height || 0,
                width: s.size.width - o.width || 0,
                top: s.position.top - a.top || 0,
                left: s.position.left - a.left || 0
            };
            t(n.alsoResize).each(function () {
                var e = t(this), s = t(this).data("ui-resizable-alsoresize"), n = {},
                    o = e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                t.each(o, function (t, e) {
                    var i = (s[e] || 0) + (r[e] || 0);
                    i && i >= 0 && (n[e] = i || null)
                }), e.css(n)
            })
        }, stop: function () {
            t(this).removeData("ui-resizable-alsoresize")
        }
    }), t.ui.plugin.add("resizable", "ghost", {
        start: function () {
            var e = t(this).resizable("instance"), i = e.size;
            e.ghost = e.originalElement.clone(), e.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: i.height,
                width: i.width,
                margin: 0,
                left: 0,
                top: 0
            }), e._addClass(e.ghost, "ui-resizable-ghost"), t.uiBackCompat !== !1 && "string" == typeof e.options.ghost && e.ghost.addClass(this.options.ghost), e.ghost.appendTo(e.helper)
        }, resize: function () {
            var e = t(this).resizable("instance");
            e.ghost && e.ghost.css({position: "relative", height: e.size.height, width: e.size.width})
        }, stop: function () {
            var e = t(this).resizable("instance");
            e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
        }
    }), t.ui.plugin.add("resizable", "grid", {
        resize: function () {
            var e, i = t(this).resizable("instance"), s = i.options, n = i.size, o = i.originalSize,
                a = i.originalPosition, r = i.axis, l = "number" == typeof s.grid ? [s.grid, s.grid] : s.grid,
                h = l[0] || 1, c = l[1] || 1, u = Math.round((n.width - o.width) / h) * h,
                d = Math.round((n.height - o.height) / c) * c, p = o.width + u, f = o.height + d,
                g = s.maxWidth && p > s.maxWidth, m = s.maxHeight && f > s.maxHeight, _ = s.minWidth && s.minWidth > p,
                v = s.minHeight && s.minHeight > f;
            s.grid = l, _ && (p += h), v && (f += c), g && (p -= h), m && (f -= c), /^(se|s|e)$/.test(r) ? (i.size.width = p, i.size.height = f) : /^(ne)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.top = a.top - d) : /^(sw)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.left = a.left - u) : ((0 >= f - c || 0 >= p - h) && (e = i._getPaddingPlusBorderDimensions(this)), f - c > 0 ? (i.size.height = f, i.position.top = a.top - d) : (f = c - e.height, i.size.height = f, i.position.top = a.top + o.height - f), p - h > 0 ? (i.size.width = p, i.position.left = a.left - u) : (p = h - e.width, i.size.width = p, i.position.left = a.left + o.width - p))
        }
    }), t.ui.resizable, t.widget("ui.sortable", t.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _isOverAxis: function (t, e, i) {
            return t >= e && e + i > t
        },
        _isFloating: function (t) {
            return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
        },
        _create: function () {
            this.containerCache = {}, this._addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0
        },
        _setOption: function (t, e) {
            this._super(t, e), "handle" === t && this._setHandleClassName()
        },
        _setHandleClassName: function () {
            var e = this;
            this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle"), t.each(this.items, function () {
                e._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle")
            })
        },
        _destroy: function () {
            this._mouseDestroy();
            for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
            return this
        },
        _mouseCapture: function (e, i) {
            var s = null, n = !1, o = this;
            return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function () {
                return t.data(this, o.widgetName + "-item") === o ? (s = t(this), !1) : void 0
            }), t.data(e.target, o.widgetName + "-item") === o && (s = t(e.target)), s ? !this.options.handle || i || (t(this.options.handle, s).find("*").addBack().each(function () {
                this === e.target && (n = !0)
            }), n) ? (this.currentItem = s, this._removeCurrentsFromItems(), !0) : !1 : !1)
        },
        _mouseStart: function (e, i, s) {
            var n, o, a = this.options;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, t.extend(this.offset, {
                click: {left: e.pageX - this.offset.left, top: e.pageY - this.offset.top},
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt), this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), a.containment && this._setContainment(), a.cursor && "auto" !== a.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", a.cursor), this.storedStylesheet = t("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(o)), a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", a.opacity)), a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", a.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s) for (n = this.containers.length - 1; n >= 0; n--) this.containers[n]._trigger("activate", e, this._uiHash(this));
            return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this._addClass(this.helper, "ui-sortable-helper"), this._mouseDrag(e), !0
        },
        _mouseDrag: function (e) {
            var i, s, n, o, a = this.options, r = !1;
            for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + a.scrollSpeed : e.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - a.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + a.scrollSpeed : e.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (e.pageY - this.document.scrollTop() < a.scrollSensitivity ? r = this.document.scrollTop(this.document.scrollTop() - a.scrollSpeed) : this.window.height() - (e.pageY - this.document.scrollTop()) < a.scrollSensitivity && (r = this.document.scrollTop(this.document.scrollTop() + a.scrollSpeed)), e.pageX - this.document.scrollLeft() < a.scrollSensitivity ? r = this.document.scrollLeft(this.document.scrollLeft() - a.scrollSpeed) : this.window.width() - (e.pageX - this.document.scrollLeft()) < a.scrollSensitivity && (r = this.document.scrollLeft(this.document.scrollLeft() + a.scrollSpeed))), r !== !1 && t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--) if (s = this.items[i], n = s.item[0], o = this._intersectsWithPointer(s), o && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== n && !t.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], n) : !0)) {
                if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s)) break;
                this._rearrange(e, s), this._trigger("change", e, this._uiHash());
                break
            }
            return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },
        _mouseStop: function (e, i) {
            if (e) {
                if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                    var s = this, n = this.placeholder.offset(), o = this.options.axis, a = {};
                    o && "x" !== o || (a.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)), o && "y" !== o || (a.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(a, parseInt(this.options.revert, 10) || 500, function () {
                        s._clear(e)
                    })
                } else this._clear(e, i);
                return !1
            }
        },
        cancel: function () {
            if (this.dragging) {
                this._mouseUp(new t.Event("mouseup", {target: null})), "original" === this.options.helper ? (this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();
                for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
        },
        serialize: function (e) {
            var i = this._getItemsAsjQuery(e && e.connected), s = [];
            return e = e || {}, t(i).each(function () {
                var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                i && s.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
            }), !s.length && e.key && s.push(e.key + "="), s.join("&")
        },
        toArray: function (e) {
            var i = this._getItemsAsjQuery(e && e.connected), s = [];
            return e = e || {}, i.each(function () {
                s.push(t(e.item || this).attr(e.attribute || "id") || "")
            }), s
        },
        _intersectsWith: function (t) {
            var e = this.positionAbs.left, i = e + this.helperProportions.width, s = this.positionAbs.top,
                n = s + this.helperProportions.height, o = t.left, a = o + t.width, r = t.top, l = r + t.height,
                h = this.offset.click.top, c = this.offset.click.left,
                u = "x" === this.options.axis || s + h > r && l > s + h,
                d = "y" === this.options.axis || e + c > o && a > e + c, p = u && d;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : e + this.helperProportions.width / 2 > o && a > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > r && l > n - this.helperProportions.height / 2
        },
        _intersectsWithPointer: function (t) {
            var e, i,
                s = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height),
                n = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width),
                o = s && n;
            return o ? (e = this._getDragVerticalDirection(), i = this._getDragHorizontalDirection(), this.floating ? "right" === i || "down" === e ? 2 : 1 : e && ("down" === e ? 2 : 1)) : !1
        },
        _intersectsWithSides: function (t) {
            var e = this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
                i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
                s = this._getDragVerticalDirection(), n = this._getDragHorizontalDirection();
            return this.floating && n ? "right" === n && i || "left" === n && !i : s && ("down" === s && e || "up" === s && !e)
        },
        _getDragVerticalDirection: function () {
            var t = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== t && (t > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var t = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== t && (t > 0 ? "right" : "left")
        },
        refresh: function (t) {
            return this._refreshItems(t), this._setHandleClassName(), this.refreshPositions(), this
        },
        _connectWith: function () {
            var t = this.options;
            return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
        },
        _getItemsAsjQuery: function (e) {
            function i() {
                r.push(this)
            }

            var s, n, o, a, r = [], l = [], h = this._connectWith();
            if (h && e) for (s = h.length - 1; s >= 0; s--) for (o = t(h[s], this.document[0]), n = o.length - 1; n >= 0; n--) a = t.data(o[n], this.widgetFullName), a && a !== this && !a.options.disabled && l.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a]);
            for (l.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), s = l.length - 1; s >= 0; s--) l[s][0].each(i);
            return t(r)
        },
        _removeCurrentsFromItems: function () {
            var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = t.grep(this.items, function (t) {
                for (var i = 0; e.length > i; i++) if (e[i] === t.item[0]) return !1;
                return !0
            })
        },
        _refreshItems: function (e) {
            this.items = [], this.containers = [this];
            var i, s, n, o, a, r, l, h, c = this.items,
                u = [[t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {item: this.currentItem}) : t(this.options.items, this.element), this]],
                d = this._connectWith();
            if (d && this.ready) for (i = d.length - 1; i >= 0; i--) for (n = t(d[i], this.document[0]), s = n.length - 1; s >= 0; s--) o = t.data(n[s], this.widgetFullName), o && o !== this && !o.options.disabled && (u.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, {item: this.currentItem}) : t(o.options.items, o.element), o]), this.containers.push(o));
            for (i = u.length - 1; i >= 0; i--) for (a = u[i][1], r = u[i][0], s = 0, h = r.length; h > s; s++) l = t(r[s]), l.data(this.widgetName + "-item", a), c.push({
                item: l,
                instance: a,
                width: 0,
                height: 0,
                left: 0,
                top: 0
            })
        },
        refreshPositions: function (e) {
            this.floating = this.items.length ? "x" === this.options.axis || this._isFloating(this.items[0].item) : !1, this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var i, s, n, o;
            for (i = this.items.length - 1; i >= 0; i--) s = this.items[i], s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item, e || (s.width = n.outerWidth(), s.height = n.outerHeight()), o = n.offset(), s.left = o.left, s.top = o.top);
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this); else for (i = this.containers.length - 1; i >= 0; i--) o = this.containers[i].element.offset(), this.containers[i].containerCache.left = o.left, this.containers[i].containerCache.top = o.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
            return this
        },
        _createPlaceholder: function (e) {
            e = e || this;
            var i, s = e.options;
            s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = {
                element: function () {
                    var s = e.currentItem[0].nodeName.toLowerCase(), n = t("<" + s + ">", e.document[0]);
                    return e._addClass(n, "ui-sortable-placeholder", i || e.currentItem[0].className)._removeClass(n, "ui-sortable-helper"), "tbody" === s ? e._createTrPlaceholder(e.currentItem.find("tr").eq(0), t("<tr>", e.document[0]).appendTo(n)) : "tr" === s ? e._createTrPlaceholder(e.currentItem, n) : "img" === s && n.attr("src", e.currentItem.attr("src")), i || n.css("visibility", "hidden"), n
                }, update: function (t, n) {
                    (!i || s.forcePlaceholderSize) && (n.height() || n.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), n.width() || n.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
                }
            }), e.placeholder = t(s.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), s.placeholder.update(e, e.placeholder)
        },
        _createTrPlaceholder: function (e, i) {
            var s = this;
            e.children().each(function () {
                t("<td>&#160;</td>", s.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(i)
            })
        },
        _contactContainers: function (e) {
            var i, s, n, o, a, r, l, h, c, u, d = null, p = null;
            for (i = this.containers.length - 1; i >= 0; i--) if (!t.contains(this.currentItem[0], this.containers[i].element[0])) if (this._intersectsWith(this.containers[i].containerCache)) {
                if (d && t.contains(this.containers[i].element[0], d.element[0])) continue;
                d = this.containers[i], p = i
            } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", e, this._uiHash(this)), this.containers[i].containerCache.over = 0);
            if (d) if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1); else {
                for (n = 1e4, o = null, c = d.floating || this._isFloating(this.currentItem), a = c ? "left" : "top", r = c ? "width" : "height", u = c ? "pageX" : "pageY", s = this.items.length - 1; s >= 0; s--) t.contains(this.containers[p].element[0], this.items[s].item[0]) && this.items[s].item[0] !== this.currentItem[0] && (l = this.items[s].item.offset()[a], h = !1, e[u] - l > this.items[s][r] / 2 && (h = !0), n > Math.abs(e[u] - l) && (n = Math.abs(e[u] - l), o = this.items[s], this.direction = h ? "up" : "down"));
                if (!o && !this.options.dropOnEmpty) return;
                if (this.currentContainer === this.containers[p]) return this.currentContainer.containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash()), this.currentContainer.containerCache.over = 1), void 0;
                o ? this._rearrange(e, o, null, !0) : this._rearrange(e, null, this.containers[p].element, !0), this._trigger("change", e, this._uiHash()), this.containers[p]._trigger("change", e, this._uiHash(this)), this.currentContainer = this.containers[p], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1
            }
        },
        _createHelper: function (e) {
            var i = this.options,
                s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
            return s.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()), s
        },
        _adjustOffsetFromHelper: function (e) {
            "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var e = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                top: 0,
                left: 0
            }), {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if ("relative" === this.cssPosition) {
                var t = this.currentItem.position();
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {top: 0, left: 0}
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        },
        _setContainment: function () {
            var e, i, s, n = this.options;
            "parent" === n.containment && (n.containment = this.helper[0].parentNode), ("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === n.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === n.containment ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(n.containment) || (e = t(n.containment)[0], i = t(n.containment).offset(), s = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function (e, i) {
            i || (i = this.position);
            var s = "absolute" === e ? 1 : -1,
                n = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                o = /(html|body)/i.test(n[0].tagName);
            return {
                top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s,
                left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s
            }
        },
        _generatePosition: function (e) {
            var i, s, n = this.options, o = e.pageX, a = e.pageY,
                r = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                l = /(html|body)/i.test(r[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((a - this.originalPageY) / n.grid[1]) * n.grid[1], a = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i, s = this.originalPageX + Math.round((o - this.originalPageX) / n.grid[0]) * n.grid[0], o = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)), {
                top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : r.scrollTop()),
                left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : r.scrollLeft())
            }
        },
        _rearrange: function (t, e, i, s) {
            i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var n = this.counter;
            this._delay(function () {
                n === this.counter && this.refreshPositions(!s)
            })
        },
        _clear: function (t, e) {
            function i(t, e, i) {
                return function (s) {
                    i._trigger(t, s, e._uiHash(e))
                }
            }

            this.reverting = !1;
            var s, n = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                for (s in this._storedCSS) ("auto" === this._storedCSS[s] || "static" === this._storedCSS[s]) && (this._storedCSS[s] = "");
                this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")
            } else this.currentItem.show();
            for (this.fromOutside && !e && n.push(function (t) {
                this._trigger("receive", t, this._uiHash(this.fromOutside))
            }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || n.push(function (t) {
                this._trigger("update", t, this._uiHash())
            }), this !== this.currentContainer && (e || (n.push(function (t) {
                this._trigger("remove", t, this._uiHash())
            }), n.push(function (t) {
                return function (e) {
                    t._trigger("receive", e, this._uiHash(this))
                }
            }.call(this, this.currentContainer)), n.push(function (t) {
                return function (e) {
                    t._trigger("update", e, this._uiHash(this))
                }
            }.call(this, this.currentContainer)))), s = this.containers.length - 1; s >= 0; s--) e || n.push(i("deactivate", this, this.containers[s])), this.containers[s].containerCache.over && (n.push(i("out", this, this.containers[s])), this.containers[s].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !e) {
                for (s = 0; n.length > s; s++) n[s].call(this, t);
                this._trigger("stop", t, this._uiHash())
            }
            return this.fromOutside = !1, !this.cancelHelperRemoval
        },
        _trigger: function () {
            t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function (e) {
            var i = e || this;
            return {
                helper: i.helper,
                placeholder: i.placeholder || t([]),
                position: i.position,
                originalPosition: i.originalPosition,
                offset: i.positionAbs,
                item: i.currentItem,
                sender: e ? e.element : null
            }
        }
    }), t.widget("ui.menu", {
        version: "1.12.1",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {submenu: "ui-icon-caret-1-e"},
            items: "> *",
            menus: "ul",
            position: {my: "left top", at: "right top"},
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function () {
            this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().attr({
                role: this.options.role,
                tabIndex: 0
            }), this._addClass("ui-menu", "ui-widget ui-widget-content"), this._on({
                "mousedown .ui-menu-item": function (t) {
                    t.preventDefault()
                }, "click .ui-menu-item": function (e) {
                    var i = t(e.target), s = t(t.ui.safeActiveElement(this.document[0]));
                    !this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(e), e.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(e) : !this.element.is(":focus") && s.closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                }, "mouseenter .ui-menu-item": function (e) {
                    if (!this.previousFilter) {
                        var i = t(e.target).closest(".ui-menu-item"), s = t(e.currentTarget);
                        i[0] === s[0] && (this._removeClass(s.siblings().children(".ui-state-active"), null, "ui-state-active"), this.focus(e, s))
                    }
                }, mouseleave: "collapseAll", "mouseleave .ui-menu": "collapseAll", focus: function (t, e) {
                    var i = this.active || this.element.find(this.options.items).eq(0);
                    e || this.focus(t, i)
                }, blur: function (e) {
                    this._delay(function () {
                        var i = !t.contains(this.element[0], t.ui.safeActiveElement(this.document[0]));
                        i && this.collapseAll(e)
                    })
                }, keydown: "_keydown"
            }), this.refresh(), this._on(this.document, {
                click: function (t) {
                    this._closeOnDocumentClick(t) && this.collapseAll(t), this.mouseHandled = !1
                }
            })
        },
        _destroy: function () {
            var e = this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),
                i = e.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(), i.children().each(function () {
                var e = t(this);
                e.data("ui-menu-submenu-caret") && e.remove()
            })
        },
        _keydown: function (e) {
            var i, s, n, o, a = !0;
            switch (e.keyCode) {
                case t.ui.keyCode.PAGE_UP:
                    this.previousPage(e);
                    break;
                case t.ui.keyCode.PAGE_DOWN:
                    this.nextPage(e);
                    break;
                case t.ui.keyCode.HOME:
                    this._move("first", "first", e);
                    break;
                case t.ui.keyCode.END:
                    this._move("last", "last", e);
                    break;
                case t.ui.keyCode.UP:
                    this.previous(e);
                    break;
                case t.ui.keyCode.DOWN:
                    this.next(e);
                    break;
                case t.ui.keyCode.LEFT:
                    this.collapse(e);
                    break;
                case t.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(e);
                    break;
                case t.ui.keyCode.ENTER:
                case t.ui.keyCode.SPACE:
                    this._activate(e);
                    break;
                case t.ui.keyCode.ESCAPE:
                    this.collapse(e);
                    break;
                default:
                    a = !1, s = this.previousFilter || "", o = !1, n = e.keyCode >= 96 && 105 >= e.keyCode ? "" + (e.keyCode - 96) : String.fromCharCode(e.keyCode), clearTimeout(this.filterTimer), n === s ? o = !0 : n = s + n, i = this._filterMenuItems(n), i = o && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i, i.length || (n = String.fromCharCode(e.keyCode), i = this._filterMenuItems(n)), i.length ? (this.focus(e, i), this.previousFilter = n, this.filterTimer = this._delay(function () {
                        delete this.previousFilter
                    }, 1e3)) : delete this.previousFilter
            }
            a && e.preventDefault()
        },
        _activate: function (t) {
            this.active && !this.active.is(".ui-state-disabled") && (this.active.children("[aria-haspopup='true']").length ? this.expand(t) : this.select(t))
        },
        refresh: function () {
            var e, i, s, n, o, a = this, r = this.options.icons.submenu, l = this.element.find(this.options.menus);
            this._toggleClass("ui-menu-icons", null, !!this.element.find(".ui-icon").length), s = l.filter(":not(.ui-menu)").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function () {
                var e = t(this), i = e.prev(), s = t("<span>").data("ui-menu-submenu-caret", !0);
                a._addClass(s, "ui-menu-icon", "ui-icon " + r), i.attr("aria-haspopup", "true").prepend(s), e.attr("aria-labelledby", i.attr("id"))
            }), this._addClass(s, "ui-menu", "ui-widget ui-widget-content ui-front"), e = l.add(this.element), i = e.find(this.options.items), i.not(".ui-menu-item").each(function () {
                var e = t(this);
                a._isDivider(e) && a._addClass(e, "ui-menu-divider", "ui-widget-content")
            }), n = i.not(".ui-menu-item, .ui-menu-divider"), o = n.children().not(".ui-menu").uniqueId().attr({
                tabIndex: -1,
                role: this._itemRole()
            }), this._addClass(n, "ui-menu-item")._addClass(o, "ui-menu-item-wrapper"), i.filter(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !t.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function () {
            return {menu: "menuitem", listbox: "option"}[this.options.role]
        },
        _setOption: function (t, e) {
            if ("icons" === t) {
                var i = this.element.find(".ui-menu-icon");
                this._removeClass(i, null, this.options.icons.submenu)._addClass(i, null, e.submenu)
            }
            this._super(t, e)
        },
        _setOptionDisabled: function (t) {
            this._super(t), this.element.attr("aria-disabled", t + ""), this._toggleClass(null, "ui-state-disabled", !!t)
        },
        focus: function (t, e) {
            var i, s, n;
            this.blur(t, t && "focus" === t.type), this._scrollIntoView(e), this.active = e.first(), s = this.active.children(".ui-menu-item-wrapper"), this._addClass(s, null, "ui-state-active"), this.options.role && this.element.attr("aria-activedescendant", s.attr("id")), n = this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"), this._addClass(n, null, "ui-state-active"), t && "keydown" === t.type ? this._close() : this.timer = this._delay(function () {
                this._close()
            }, this.delay), i = e.children(".ui-menu"), i.length && t && /^mouse/.test(t.type) && this._startOpening(i), this.activeMenu = e.parent(), this._trigger("focus", t, {item: e})
        },
        _scrollIntoView: function (e) {
            var i, s, n, o, a, r;
            this._hasScroll() && (i = parseFloat(t.css(this.activeMenu[0], "borderTopWidth")) || 0, s = parseFloat(t.css(this.activeMenu[0], "paddingTop")) || 0, n = e.offset().top - this.activeMenu.offset().top - i - s, o = this.activeMenu.scrollTop(), a = this.activeMenu.height(), r = e.outerHeight(), 0 > n ? this.activeMenu.scrollTop(o + n) : n + r > a && this.activeMenu.scrollTop(o + n - a + r))
        },
        blur: function (t, e) {
            e || clearTimeout(this.timer), this.active && (this._removeClass(this.active.children(".ui-menu-item-wrapper"), null, "ui-state-active"), this._trigger("blur", t, {item: this.active}), this.active = null)
        },
        _startOpening: function (t) {
            clearTimeout(this.timer), "true" === t.attr("aria-hidden") && (this.timer = this._delay(function () {
                this._close(), this._open(t)
            }, this.delay))
        },
        _open: function (e) {
            var i = t.extend({of: this.active}, this.options.position);
            clearTimeout(this.timer), this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden", "true"), e.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
        },
        collapseAll: function (e, i) {
            clearTimeout(this.timer), this.timer = this._delay(function () {
                var s = i ? this.element : t(e && e.target).closest(this.element.find(".ui-menu"));
                s.length || (s = this.element), this._close(s), this.blur(e), this._removeClass(s.find(".ui-state-active"), null, "ui-state-active"), this.activeMenu = s
            }, this.delay)
        },
        _close: function (t) {
            t || (t = this.active ? this.active.parent() : this.element), t.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false")
        },
        _closeOnDocumentClick: function (e) {
            return !t(e.target).closest(".ui-menu").length
        },
        _isDivider: function (t) {
            return !/[^\-\u2014\u2013\s]/.test(t.text())
        },
        collapse: function (t) {
            var e = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            e && e.length && (this._close(), this.focus(t, e))
        },
        expand: function (t) {
            var e = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
            e && e.length && (this._open(e.parent()), this._delay(function () {
                this.focus(t, e)
            }))
        },
        next: function (t) {
            this._move("next", "first", t)
        },
        previous: function (t) {
            this._move("prev", "last", t)
        },
        isFirstItem: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function (t, e, i) {
            var s;
            this.active && (s = "first" === t || "last" === t ? this.active["first" === t ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[t + "All"](".ui-menu-item").eq(0)), s && s.length && this.active || (s = this.activeMenu.find(this.options.items)[e]()), this.focus(i, s)
        },
        nextPage: function (e) {
            var i, s, n;
            return this.active ? (this.isLastItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.nextAll(".ui-menu-item").each(function () {
                return i = t(this), 0 > i.offset().top - s - n
            }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]())), void 0) : (this.next(e), void 0)
        },
        previousPage: function (e) {
            var i, s, n;
            return this.active ? (this.isFirstItem() || (this._hasScroll() ? (s = this.active.offset().top, n = this.element.height(), this.active.prevAll(".ui-menu-item").each(function () {
                return i = t(this), i.offset().top - s + n > 0
            }), this.focus(e, i)) : this.focus(e, this.activeMenu.find(this.options.items).first())), void 0) : (this.next(e), void 0)
        },
        _hasScroll: function () {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function (e) {
            this.active = this.active || t(e.target).closest(".ui-menu-item");
            var i = {item: this.active};
            this.active.has(".ui-menu").length || this.collapseAll(e, !0), this._trigger("select", e, i)
        },
        _filterMenuItems: function (e) {
            var i = e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"), s = RegExp("^" + i, "i");
            return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function () {
                return s.test(t.trim(t(this).children(".ui-menu-item-wrapper").text()))
            })
        }
    }), t.widget("ui.autocomplete", {
        version: "1.12.1",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {my: "left top", at: "left bottom", collision: "none"},
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        requestIndex: 0,
        pending: 0,
        _create: function () {
            var e, i, s, n = this.element[0].nodeName.toLowerCase(), o = "textarea" === n, a = "input" === n;
            this.isMultiLine = o || !a && this._isContentEditable(this.element), this.valueMethod = this.element[o || a ? "val" : "text"], this.isNewMenu = !0, this._addClass("ui-autocomplete-input"), this.element.attr("autocomplete", "off"), this._on(this.element, {
                keydown: function (n) {
                    if (this.element.prop("readOnly")) return e = !0, s = !0, i = !0, void 0;
                    e = !1, s = !1, i = !1;
                    var o = t.ui.keyCode;
                    switch (n.keyCode) {
                        case o.PAGE_UP:
                            e = !0, this._move("previousPage", n);
                            break;
                        case o.PAGE_DOWN:
                            e = !0, this._move("nextPage", n);
                            break;
                        case o.UP:
                            e = !0, this._keyEvent("previous", n);
                            break;
                        case o.DOWN:
                            e = !0, this._keyEvent("next", n);
                            break;
                        case o.ENTER:
                            this.menu.active && (e = !0, n.preventDefault(), this.menu.select(n));
                            break;
                        case o.TAB:
                            this.menu.active && this.menu.select(n);
                            break;
                        case o.ESCAPE:
                            this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(n), n.preventDefault());
                            break;
                        default:
                            i = !0, this._searchTimeout(n)
                    }
                }, keypress: function (s) {
                    if (e) return e = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && s.preventDefault(), void 0;
                    if (!i) {
                        var n = t.ui.keyCode;
                        switch (s.keyCode) {
                            case n.PAGE_UP:
                                this._move("previousPage", s);
                                break;
                            case n.PAGE_DOWN:
                                this._move("nextPage", s);
                                break;
                            case n.UP:
                                this._keyEvent("previous", s);
                                break;
                            case n.DOWN:
                                this._keyEvent("next", s)
                        }
                    }
                }, input: function (t) {
                    return s ? (s = !1, t.preventDefault(), void 0) : (this._searchTimeout(t), void 0)
                }, focus: function () {
                    this.selectedItem = null, this.previous = this._value()
                }, blur: function (t) {
                    return this.cancelBlur ? (delete this.cancelBlur, void 0) : (clearTimeout(this.searching), this.close(t), this._change(t), void 0)
                }
            }), this._initSource(), this.menu = t("<ul>").appendTo(this._appendTo()).menu({role: null}).hide().menu("instance"), this._addClass(this.menu.element, "ui-autocomplete", "ui-front"), this._on(this.menu.element, {
                mousedown: function (e) {
                    e.preventDefault(), this.cancelBlur = !0, this._delay(function () {
                        delete this.cancelBlur, this.element[0] !== t.ui.safeActiveElement(this.document[0]) && this.element.trigger("focus")
                    })
                }, menufocus: function (e, i) {
                    var s, n;
                    return this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type)) ? (this.menu.blur(), this.document.one("mousemove", function () {
                        t(e.target).trigger(e.originalEvent)
                    }), void 0) : (n = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", e, {item: n}) && e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(n.value), s = i.item.attr("aria-label") || n.value, s && t.trim(s).length && (this.liveRegion.children().hide(), t("<div>").text(s).appendTo(this.liveRegion)), void 0)
                }, menuselect: function (e, i) {
                    var s = i.item.data("ui-autocomplete-item"), n = this.previous;
                    this.element[0] !== t.ui.safeActiveElement(this.document[0]) && (this.element.trigger("focus"), this.previous = n, this._delay(function () {
                        this.previous = n, this.selectedItem = s
                    })), !1 !== this._trigger("select", e, {item: s}) && this._value(s.value), this.term = this._value(), this.close(e), this.selectedItem = s
                }
            }), this.liveRegion = t("<div>", {
                role: "status",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).appendTo(this.document[0].body), this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible"), this._on(this.window, {
                beforeunload: function () {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function () {
            clearTimeout(this.searching), this.element.removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
        },
        _setOption: function (t, e) {
            this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort()
        },
        _isEventTargetInWidget: function (e) {
            var i = this.menu.element[0];
            return e.target === this.element[0] || e.target === i || t.contains(i, e.target)
        },
        _closeOnClickOutside: function (t) {
            this._isEventTargetInWidget(t) || this.close()
        },
        _appendTo: function () {
            var e = this.options.appendTo;
            return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e && e[0] || (e = this.element.closest(".ui-front, dialog")), e.length || (e = this.document[0].body), e
        },
        _initSource: function () {
            var e, i, s = this;
            t.isArray(this.options.source) ? (e = this.options.source, this.source = function (i, s) {
                s(t.ui.autocomplete.filter(e, i.term))
            }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function (e, n) {
                s.xhr && s.xhr.abort(), s.xhr = t.ajax({
                    url: i, data: e, dataType: "json", success: function (t) {
                        n(t)
                    }, error: function () {
                        n([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function (t) {
            clearTimeout(this.searching), this.searching = this._delay(function () {
                var e = this.term === this._value(), i = this.menu.element.is(":visible"),
                    s = t.altKey || t.ctrlKey || t.metaKey || t.shiftKey;
                (!e || e && !i && !s) && (this.selectedItem = null, this.search(null, t))
            }, this.options.delay)
        },
        search: function (t, e) {
            return t = null != t ? t : this._value(), this.term = this._value(), t.length < this.options.minLength ? this.close(e) : this._trigger("search", e) !== !1 ? this._search(t) : void 0
        },
        _search: function (t) {
            this.pending++, this._addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({term: t}, this._response())
        },
        _response: function () {
            var e = ++this.requestIndex;
            return t.proxy(function (t) {
                e === this.requestIndex && this.__response(t), this.pending--, this.pending || this._removeClass("ui-autocomplete-loading")
            }, this)
        },
        __response: function (t) {
            t && (t = this._normalize(t)), this._trigger("response", null, {content: t}), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close()
        },
        close: function (t) {
            this.cancelSearch = !0, this._close(t)
        },
        _close: function (t) {
            this._off(this.document, "mousedown"), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t))
        },
        _change: function (t) {
            this.previous !== this._value() && this._trigger("change", t, {item: this.selectedItem})
        },
        _normalize: function (e) {
            return e.length && e[0].label && e[0].value ? e : t.map(e, function (e) {
                return "string" == typeof e ? {label: e, value: e} : t.extend({}, e, {
                    label: e.label || e.value,
                    value: e.value || e.label
                })
            })
        },
        _suggest: function (e) {
            var i = this.menu.element.empty();
            this._renderMenu(i, e), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({of: this.element}, this.options.position)), this.options.autoFocus && this.menu.next(), this._on(this.document, {mousedown: "_closeOnClickOutside"})
        },
        _resizeMenu: function () {
            var t = this.menu.element;
            t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function (e, i) {
            var s = this;
            t.each(i, function (t, i) {
                s._renderItemData(e, i)
            })
        },
        _renderItemData: function (t, e) {
            return this._renderItem(t, e).data("ui-autocomplete-item", e)
        },
        _renderItem: function (e, i) {
            return t("<li>").append(t("<div>").text(i.label)).appendTo(e)
        },
        _move: function (t, e) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this.isMultiLine || this._value(this.term), this.menu.blur(), void 0) : (this.menu[t](e), void 0) : (this.search(null, e), void 0)
        },
        widget: function () {
            return this.menu.element
        },
        _value: function () {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function (t, e) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(t, e), e.preventDefault())
        },
        _isContentEditable: function (t) {
            if (!t.length) return !1;
            var e = t.prop("contentEditable");
            return "inherit" === e ? this._isContentEditable(t.parent()) : "true" === e
        }
    }), t.extend(t.ui.autocomplete, {
        escapeRegex: function (t) {
            return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        }, filter: function (e, i) {
            var s = RegExp(t.ui.autocomplete.escapeRegex(i), "i");
            return t.grep(e, function (t) {
                return s.test(t.label || t.value || t)
            })
        }
    }), t.widget("ui.autocomplete", t.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function (t) {
                    return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        }, __response: function (e) {
            var i;
            this._superApply(arguments), this.options.disabled || this.cancelSearch || (i = e && e.length ? this.options.messages.results(e.length) : this.options.messages.noResults, this.liveRegion.children().hide(), t("<div>").text(i).appendTo(this.liveRegion))
        }
    }), t.ui.autocomplete;
    var u = /ui-corner-([a-z]){2,6}/g;
    t.widget("ui.controlgroup", {
        version: "1.12.1",
        defaultElement: "<div>",
        options: {
            direction: "horizontal",
            disabled: null,
            onlyVisible: !0,
            items: {
                button: "input[type=button], input[type=submit], input[type=reset], button, a",
                controlgroupLabel: ".ui-controlgroup-label",
                checkboxradio: "input[type='checkbox'], input[type='radio']",
                selectmenu: "select",
                spinner: ".ui-spinner-input"
            }
        },
        _create: function () {
            this._enhance()
        },
        _enhance: function () {
            this.element.attr("role", "toolbar"), this.refresh()
        },
        _destroy: function () {
            this._callChildMethod("destroy"), this.childWidgets.removeData("ui-controlgroup-data"), this.element.removeAttr("role"), this.options.items.controlgroupLabel && this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()
        },
        _initWidgets: function () {
            var e = this, i = [];
            t.each(this.options.items, function (s, n) {
                var o, a = {};
                return n ? "controlgroupLabel" === s ? (o = e.element.find(n), o.each(function () {
                    var e = t(this);
                    e.children(".ui-controlgroup-label-contents").length || e.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")
                }), e._addClass(o, null, "ui-widget ui-widget-content ui-state-default"), i = i.concat(o.get()), void 0) : (t.fn[s] && (a = e["_" + s + "Options"] ? e["_" + s + "Options"]("middle") : {classes: {}}, e.element.find(n).each(function () {
                    var n = t(this), o = n[s]("instance"), r = t.widget.extend({}, a);
                    if ("button" !== s || !n.parent(".ui-spinner").length) {
                        o || (o = n[s]()[s]("instance")), o && (r.classes = e._resolveClassesValues(r.classes, o)), n[s](r);
                        var l = n[s]("widget");
                        t.data(l[0], "ui-controlgroup-data", o ? o : n[s]("instance")), i.push(l[0])
                    }
                })), void 0) : void 0
            }), this.childWidgets = t(t.unique(i)), this._addClass(this.childWidgets, "ui-controlgroup-item")
        },
        _callChildMethod: function (e) {
            this.childWidgets.each(function () {
                var i = t(this), s = i.data("ui-controlgroup-data");
                s && s[e] && s[e]()
            })
        },
        _updateCornerClass: function (t, e) {
            var i = "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all",
                s = this._buildSimpleOptions(e, "label").classes.label;
            this._removeClass(t, null, i), this._addClass(t, null, s)
        },
        _buildSimpleOptions: function (t, e) {
            var i = "vertical" === this.options.direction, s = {classes: {}};
            return s.classes[e] = {
                middle: "",
                first: "ui-corner-" + (i ? "top" : "left"),
                last: "ui-corner-" + (i ? "bottom" : "right"),
                only: "ui-corner-all"
            }[t], s
        },
        _spinnerOptions: function (t) {
            var e = this._buildSimpleOptions(t, "ui-spinner");
            return e.classes["ui-spinner-up"] = "", e.classes["ui-spinner-down"] = "", e
        },
        _buttonOptions: function (t) {
            return this._buildSimpleOptions(t, "ui-button")
        },
        _checkboxradioOptions: function (t) {
            return this._buildSimpleOptions(t, "ui-checkboxradio-label")
        },
        _selectmenuOptions: function (t) {
            var e = "vertical" === this.options.direction;
            return {
                width: e ? "auto" : !1,
                classes: {
                    middle: {"ui-selectmenu-button-open": "", "ui-selectmenu-button-closed": ""},
                    first: {
                        "ui-selectmenu-button-open": "ui-corner-" + (e ? "top" : "tl"),
                        "ui-selectmenu-button-closed": "ui-corner-" + (e ? "top" : "left")
                    },
                    last: {
                        "ui-selectmenu-button-open": e ? "" : "ui-corner-tr",
                        "ui-selectmenu-button-closed": "ui-corner-" + (e ? "bottom" : "right")
                    },
                    only: {"ui-selectmenu-button-open": "ui-corner-top", "ui-selectmenu-button-closed": "ui-corner-all"}
                }[t]
            }
        },
        _resolveClassesValues: function (e, i) {
            var s = {};
            return t.each(e, function (n) {
                var o = i.options.classes[n] || "";
                o = t.trim(o.replace(u, "")), s[n] = (o + " " + e[n]).replace(/\s+/g, " ")
            }), s
        },
        _setOption: function (t, e) {
            return "direction" === t && this._removeClass("ui-controlgroup-" + this.options.direction), this._super(t, e), "disabled" === t ? (this._callChildMethod(e ? "disable" : "enable"), void 0) : (this.refresh(), void 0)
        },
        refresh: function () {
            var e, i = this;
            this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction), "horizontal" === this.options.direction && this._addClass(null, "ui-helper-clearfix"), this._initWidgets(), e = this.childWidgets, this.options.onlyVisible && (e = e.filter(":visible")), e.length && (t.each(["first", "last"], function (t, s) {
                var n = e[s]().data("ui-controlgroup-data");
                if (n && i["_" + n.widgetName + "Options"]) {
                    var o = i["_" + n.widgetName + "Options"](1 === e.length ? "only" : s);
                    o.classes = i._resolveClassesValues(o.classes, n), n.element[n.widgetName](o)
                } else i._updateCornerClass(e[s](), s)
            }), this._callChildMethod("refresh"))
        }
    }), t.widget("ui.checkboxradio", [t.ui.formResetMixin, {
        version: "1.12.1",
        options: {
            disabled: null,
            label: null,
            icon: !0,
            classes: {"ui-checkboxradio-label": "ui-corner-all", "ui-checkboxradio-icon": "ui-corner-all"}
        },
        _getCreateOptions: function () {
            var e, i, s = this, n = this._super() || {};
            return this._readType(), i = this.element.labels(), this.label = t(i[i.length - 1]), this.label.length || t.error("No label found for checkboxradio widget"), this.originalLabel = "", this.label.contents().not(this.element[0]).each(function () {
                s.originalLabel += 3 === this.nodeType ? t(this).text() : this.outerHTML
            }), this.originalLabel && (n.label = this.originalLabel), e = this.element[0].disabled, null != e && (n.disabled = e), n
        },
        _create: function () {
            var t = this.element[0].checked;
            this._bindFormResetHandler(), null == this.options.disabled && (this.options.disabled = this.element[0].disabled), this._setOption("disabled", this.options.disabled), this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible"), this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget"), "radio" === this.type && this._addClass(this.label, "ui-checkboxradio-radio-label"), this.options.label && this.options.label !== this.originalLabel ? this._updateLabel() : this.originalLabel && (this.options.label = this.originalLabel), this._enhance(), t && (this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active"), this.icon && this._addClass(this.icon, null, "ui-state-hover")), this._on({
                change: "_toggleClasses",
                focus: function () {
                    this._addClass(this.label, null, "ui-state-focus ui-visual-focus")
                },
                blur: function () {
                    this._removeClass(this.label, null, "ui-state-focus ui-visual-focus")
                }
            })
        },
        _readType: function () {
            var e = this.element[0].nodeName.toLowerCase();
            this.type = this.element[0].type, "input" === e && /radio|checkbox/.test(this.type) || t.error("Can't create checkboxradio on element.nodeName=" + e + " and element.type=" + this.type)
        },
        _enhance: function () {
            this._updateIcon(this.element[0].checked)
        },
        widget: function () {
            return this.label
        },
        _getRadioGroup: function () {
            var e, i = this.element[0].name, s = "input[name='" + t.ui.escapeSelector(i) + "']";
            return i ? (e = this.form.length ? t(this.form[0].elements).filter(s) : t(s).filter(function () {
                return 0 === t(this).form().length
            }), e.not(this.element)) : t([])
        },
        _toggleClasses: function () {
            var e = this.element[0].checked;
            this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", e), this.options.icon && "checkbox" === this.type && this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", e)._toggleClass(this.icon, null, "ui-icon-blank", !e), "radio" === this.type && this._getRadioGroup().each(function () {
                var e = t(this).checkboxradio("instance");
                e && e._removeClass(e.label, "ui-checkboxradio-checked", "ui-state-active")
            })
        },
        _destroy: function () {
            this._unbindFormResetHandler(), this.icon && (this.icon.remove(), this.iconSpace.remove())
        },
        _setOption: function (t, e) {
            return "label" !== t || e ? (this._super(t, e), "disabled" === t ? (this._toggleClass(this.label, null, "ui-state-disabled", e), this.element[0].disabled = e, void 0) : (this.refresh(), void 0)) : void 0
        },
        _updateIcon: function (e) {
            var i = "ui-icon ui-icon-background ";
            this.options.icon ? (this.icon || (this.icon = t("<span>"), this.iconSpace = t("<span> </span>"), this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")), "checkbox" === this.type ? (i += e ? "ui-icon-check ui-state-checked" : "ui-icon-blank", this._removeClass(this.icon, null, e ? "ui-icon-blank" : "ui-icon-check")) : i += "ui-icon-blank", this._addClass(this.icon, "ui-checkboxradio-icon", i), e || this._removeClass(this.icon, null, "ui-icon-check ui-state-checked"), this.icon.prependTo(this.label).after(this.iconSpace)) : void 0 !== this.icon && (this.icon.remove(), this.iconSpace.remove(), delete this.icon)
        },
        _updateLabel: function () {
            var t = this.label.contents().not(this.element[0]);
            this.icon && (t = t.not(this.icon[0])), this.iconSpace && (t = t.not(this.iconSpace[0])), t.remove(), this.label.append(this.options.label)
        },
        refresh: function () {
            var t = this.element[0].checked, e = this.element[0].disabled;
            this._updateIcon(t), this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", t), null !== this.options.label && this._updateLabel(), e !== this.options.disabled && this._setOptions({disabled: e})
        }
    }]), t.ui.checkboxradio, t.widget("ui.button", {
        version: "1.12.1",
        defaultElement: "<button>",
        options: {
            classes: {"ui-button": "ui-corner-all"},
            disabled: null,
            icon: null,
            iconPosition: "beginning",
            label: null,
            showLabel: !0
        },
        _getCreateOptions: function () {
            var t, e = this._super() || {};
            return this.isInput = this.element.is("input"), t = this.element[0].disabled, null != t && (e.disabled = t), this.originalLabel = this.isInput ? this.element.val() : this.element.html(), this.originalLabel && (e.label = this.originalLabel), e
        },
        _create: function () {
            !this.option.showLabel & !this.options.icon && (this.options.showLabel = !0), null == this.options.disabled && (this.options.disabled = this.element[0].disabled || !1), this.hasTitle = !!this.element.attr("title"), this.options.label && this.options.label !== this.originalLabel && (this.isInput ? this.element.val(this.options.label) : this.element.html(this.options.label)), this._addClass("ui-button", "ui-widget"), this._setOption("disabled", this.options.disabled), this._enhance(), this.element.is("a") && this._on({
                keyup: function (e) {
                    e.keyCode === t.ui.keyCode.SPACE && (e.preventDefault(), this.element[0].click ? this.element[0].click() : this.element.trigger("click"))
                }
            })
        },
        _enhance: function () {
            this.element.is("button") || this.element.attr("role", "button"), this.options.icon && (this._updateIcon("icon", this.options.icon), this._updateTooltip())
        },
        _updateTooltip: function () {
            this.title = this.element.attr("title"), this.options.showLabel || this.title || this.element.attr("title", this.options.label)
        },
        _updateIcon: function (e, i) {
            var s = "iconPosition" !== e, n = s ? this.options.iconPosition : i, o = "top" === n || "bottom" === n;
            this.icon ? s && this._removeClass(this.icon, null, this.options.icon) : (this.icon = t("<span>"), this._addClass(this.icon, "ui-button-icon", "ui-icon"), this.options.showLabel || this._addClass("ui-button-icon-only")), s && this._addClass(this.icon, null, i), this._attachIcon(n), o ? (this._addClass(this.icon, null, "ui-widget-icon-block"), this.iconSpace && this.iconSpace.remove()) : (this.iconSpace || (this.iconSpace = t("<span> </span>"), this._addClass(this.iconSpace, "ui-button-icon-space")), this._removeClass(this.icon, null, "ui-wiget-icon-block"), this._attachIconSpace(n))
        },
        _destroy: function () {
            this.element.removeAttr("role"), this.icon && this.icon.remove(), this.iconSpace && this.iconSpace.remove(), this.hasTitle || this.element.removeAttr("title")
        },
        _attachIconSpace: function (t) {
            this.icon[/^(?:end|bottom)/.test(t) ? "before" : "after"](this.iconSpace)
        },
        _attachIcon: function (t) {
            this.element[/^(?:end|bottom)/.test(t) ? "append" : "prepend"](this.icon)
        },
        _setOptions: function (t) {
            var e = void 0 === t.showLabel ? this.options.showLabel : t.showLabel,
                i = void 0 === t.icon ? this.options.icon : t.icon;
            e || i || (t.showLabel = !0), this._super(t)
        },
        _setOption: function (t, e) {
            "icon" === t && (e ? this._updateIcon(t, e) : this.icon && (this.icon.remove(), this.iconSpace && this.iconSpace.remove())), "iconPosition" === t && this._updateIcon(t, e), "showLabel" === t && (this._toggleClass("ui-button-icon-only", null, !e), this._updateTooltip()), "label" === t && (this.isInput ? this.element.val(e) : (this.element.html(e), this.icon && (this._attachIcon(this.options.iconPosition), this._attachIconSpace(this.options.iconPosition)))), this._super(t, e), "disabled" === t && (this._toggleClass(null, "ui-state-disabled", e), this.element[0].disabled = e, e && this.element.blur())
        },
        refresh: function () {
            var t = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");
            t !== this.options.disabled && this._setOptions({disabled: t}), this._updateTooltip()
        }
    }), t.uiBackCompat !== !1 && (t.widget("ui.button", t.ui.button, {
        options: {
            text: !0,
            icons: {primary: null, secondary: null}
        }, _create: function () {
            this.options.showLabel && !this.options.text && (this.options.showLabel = this.options.text), !this.options.showLabel && this.options.text && (this.options.text = this.options.showLabel), this.options.icon || !this.options.icons.primary && !this.options.icons.secondary ? this.options.icon && (this.options.icons.primary = this.options.icon) : this.options.icons.primary ? this.options.icon = this.options.icons.primary : (this.options.icon = this.options.icons.secondary, this.options.iconPosition = "end"), this._super()
        }, _setOption: function (t, e) {
            return "text" === t ? (this._super("showLabel", e), void 0) : ("showLabel" === t && (this.options.text = e), "icon" === t && (this.options.icons.primary = e), "icons" === t && (e.primary ? (this._super("icon", e.primary), this._super("iconPosition", "beginning")) : e.secondary && (this._super("icon", e.secondary), this._super("iconPosition", "end"))), this._superApply(arguments), void 0)
        }
    }), t.fn.button = function (e) {
        return function () {
            return !this.length || this.length && "INPUT" !== this[0].tagName || this.length && "INPUT" === this[0].tagName && "checkbox" !== this.attr("type") && "radio" !== this.attr("type") ? e.apply(this, arguments) : (t.ui.checkboxradio || t.error("Checkboxradio widget missing"), 0 === arguments.length ? this.checkboxradio({icon: !1}) : this.checkboxradio.apply(this, arguments))
        }
    }(t.fn.button), t.fn.buttonset = function () {
        return t.ui.controlgroup || t.error("Controlgroup widget missing"), "option" === arguments[0] && "items" === arguments[1] && arguments[2] ? this.controlgroup.apply(this, [arguments[0], "items.button", arguments[2]]) : "option" === arguments[0] && "items" === arguments[1] ? this.controlgroup.apply(this, [arguments[0], "items.button"]) : ("object" == typeof arguments[0] && arguments[0].items && (arguments[0].items = {button: arguments[0].items}), this.controlgroup.apply(this, arguments))
    }), t.ui.button, t.extend(t.ui, {datepicker: {version: "1.12.1"}});
    var d;
    t.extend(s.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (t) {
            return a(this._defaults, t || {}), this
        },
        _attachDatepicker: function (e, i) {
            var s, n, o;
            s = e.nodeName.toLowerCase(), n = "div" === s || "span" === s, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), o = this._newInst(t(e), n), o.settings = t.extend({}, i || {}), "input" === s ? this._connectDatepicker(e, o) : n && this._inlineDatepicker(e, o)
        },
        _newInst: function (e, i) {
            var s = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
            return {
                id: s,
                input: e,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: i,
                dpDiv: i ? n(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function (e, i) {
            var s = t(e);
            i.append = t([]), i.trigger = t([]), s.hasClass(this.markerClassName) || (this._attachments(s, i), s.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp), this._autoSize(i), t.data(e, "datepicker", i), i.settings.disabled && this._disableDatepicker(e))
        },
        _attachments: function (e, i) {
            var s, n, o, a = this._get(i, "appendText"), r = this._get(i, "isRTL");
            i.append && i.append.remove(), a && (i.append = t("<span class='" + this._appendClass + "'>" + a + "</span>"), e[r ? "before" : "after"](i.append)), e.off("focus", this._showDatepicker), i.trigger && i.trigger.remove(), s = this._get(i, "showOn"), ("focus" === s || "both" === s) && e.on("focus", this._showDatepicker), ("button" === s || "both" === s) && (n = this._get(i, "buttonText"), o = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({
                src: o,
                alt: n,
                title: n
            }) : t("<button type='button'></button>").addClass(this._triggerClass).html(o ? t("<img/>").attr({
                src: o,
                alt: n,
                title: n
            }) : n)), e[r ? "before" : "after"](i.trigger), i.trigger.on("click", function () {
                return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1
            }))
        },
        _autoSize: function (t) {
            if (this._get(t, "autoSize") && !t.inline) {
                var e, i, s, n, o = new Date(2009, 11, 20), a = this._get(t, "dateFormat");
                a.match(/[DM]/) && (e = function (t) {
                    for (i = 0, s = 0, n = 0; t.length > n; n++) t[n].length > i && (i = t[n].length, s = n);
                    return s
                }, o.setMonth(e(this._get(t, a.match(/MM/) ? "monthNames" : "monthNamesShort"))), o.setDate(e(this._get(t, a.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - o.getDay())), t.input.attr("size", this._formatDate(t, o).length)
            }
        },
        _inlineDatepicker: function (e, i) {
            var s = t(e);
            s.hasClass(this.markerClassName) || (s.addClass(this.markerClassName).append(i.dpDiv), t.data(e, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function (e, i, s, n, o) {
            var r, l, h, c, u, d = this._dialogInst;
            return d || (this.uuid += 1, r = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + r + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.on("keydown", this._doKeyDown), t("body").append(this._dialogInput), d = this._dialogInst = this._newInst(this._dialogInput, !1), d.settings = {}, t.data(this._dialogInput[0], "datepicker", d)), a(d.settings, n || {}), i = i && i.constructor === Date ? this._formatDate(d, i) : i, this._dialogInput.val(i), this._pos = o ? o.length ? o : [o.pageX, o.pageY] : null, this._pos || (l = document.documentElement.clientWidth, h = document.documentElement.clientHeight, c = document.documentElement.scrollLeft || document.body.scrollLeft, u = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [l / 2 - 100 + c, h / 2 - 150 + u]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), d.settings.onSelect = s, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], "datepicker", d), this
        },
        _destroyDatepicker: function (e) {
            var i, s = t(e), n = t.data(e, "datepicker");
            s.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, "datepicker"), "input" === i ? (n.append.remove(), n.trigger.remove(), s.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && s.removeClass(this.markerClassName).empty(), d === n && (d = null))
        },
        _enableDatepicker: function (e) {
            var i, s, n = t(e), o = t.data(e, "datepicker");
            n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, o.trigger.filter("button").each(function () {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().removeClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function (t) {
                return t === e ? null : t
            }))
        },
        _disableDatepicker: function (e) {
            var i, s, n = t(e), o = t.data(e, "datepicker");
            n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, o.trigger.filter("button").each(function () {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : ("div" === i || "span" === i) && (s = n.children("." + this._inlineClass), s.children().addClass("ui-state-disabled"), s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function (t) {
                return t === e ? null : t
            }), this._disabledInputs[this._disabledInputs.length] = e)
        },
        _isDisabledDatepicker: function (t) {
            if (!t) return !1;
            for (var e = 0; this._disabledInputs.length > e; e++) if (this._disabledInputs[e] === t) return !0;
            return !1
        },
        _getInst: function (e) {
            try {
                return t.data(e, "datepicker")
            } catch (i) {
                throw"Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function (e, i, s) {
            var n, o, r, l, h = this._getInst(e);
            return 2 === arguments.length && "string" == typeof i ? "defaults" === i ? t.extend({}, t.datepicker._defaults) : h ? "all" === i ? t.extend({}, h.settings) : this._get(h, i) : null : (n = i || {}, "string" == typeof i && (n = {}, n[i] = s), h && (this._curInst === h && this._hideDatepicker(), o = this._getDateDatepicker(e, !0), r = this._getMinMaxDate(h, "min"), l = this._getMinMaxDate(h, "max"), a(h.settings, n), null !== r && void 0 !== n.dateFormat && void 0 === n.minDate && (h.settings.minDate = this._formatDate(h, r)), null !== l && void 0 !== n.dateFormat && void 0 === n.maxDate && (h.settings.maxDate = this._formatDate(h, l)), "disabled" in n && (n.disabled ? this._disableDatepicker(e) : this._enableDatepicker(e)), this._attachments(t(e), h), this._autoSize(h), this._setDate(h, o), this._updateAlternate(h), this._updateDatepicker(h)), void 0)
        },
        _changeDatepicker: function (t, e, i) {
            this._optionDatepicker(t, e, i)
        },
        _refreshDatepicker: function (t) {
            var e = this._getInst(t);
            e && this._updateDatepicker(e)
        },
        _setDateDatepicker: function (t, e) {
            var i = this._getInst(t);
            i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
        },
        _getDateDatepicker: function (t, e) {
            var i = this._getInst(t);
            return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null
        },
        _doKeyDown: function (e) {
            var i, s, n, o = t.datepicker._getInst(e.target), a = !0, r = o.dpDiv.is(".ui-datepicker-rtl");
            if (o._keyEvent = !0, t.datepicker._datepickerShowing) switch (e.keyCode) {
                case 9:
                    t.datepicker._hideDatepicker(), a = !1;
                    break;
                case 13:
                    return n = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", o.dpDiv), n[0] && t.datepicker._selectDay(e.target, o.selectedMonth, o.selectedYear, n[0]), i = t.datepicker._get(o, "onSelect"), i ? (s = t.datepicker._formatDate(o), i.apply(o.input ? o.input[0] : null, [s, o])) : t.datepicker._hideDatepicker(), !1;
                case 27:
                    t.datepicker._hideDatepicker();
                    break;
                case 33:
                    t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
                    break;
                case 34:
                    t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
                    break;
                case 35:
                    (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), a = e.ctrlKey || e.metaKey;
                    break;
                case 36:
                    (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), a = e.ctrlKey || e.metaKey;
                    break;
                case 37:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? 1 : -1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(o, "stepBigMonths") : -t.datepicker._get(o, "stepMonths"), "M");
                    break;
                case 38:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), a = e.ctrlKey || e.metaKey;
                    break;
                case 39:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, r ? -1 : 1, "D"), a = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(o, "stepBigMonths") : +t.datepicker._get(o, "stepMonths"), "M");
                    break;
                case 40:
                    (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), a = e.ctrlKey || e.metaKey;
                    break;
                default:
                    a = !1
            } else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : a = !1;
            a && (e.preventDefault(), e.stopPropagation())
        },
        _doKeyPress: function (e) {
            var i, s, n = t.datepicker._getInst(e.target);
            return t.datepicker._get(n, "constrainInput") ? (i = t.datepicker._possibleChars(t.datepicker._get(n, "dateFormat")), s = String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode), e.ctrlKey || e.metaKey || " " > s || !i || i.indexOf(s) > -1) : void 0
        },
        _doKeyUp: function (e) {
            var i, s = t.datepicker._getInst(e.target);
            if (s.input.val() !== s.lastVal) try {
                i = t.datepicker.parseDate(t.datepicker._get(s, "dateFormat"), s.input ? s.input.val() : null, t.datepicker._getFormatConfig(s)), i && (t.datepicker._setDateFromField(s), t.datepicker._updateAlternate(s), t.datepicker._updateDatepicker(s))
            } catch (n) {
            }
            return !0
        },
        _showDatepicker: function (e) {
            if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
                var s, n, o, r, l, h, c;
                s = t.datepicker._getInst(e), t.datepicker._curInst && t.datepicker._curInst !== s && (t.datepicker._curInst.dpDiv.stop(!0, !0), s && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), n = t.datepicker._get(s, "beforeShow"), o = n ? n.apply(e, [e, s]) : {}, o !== !1 && (a(s.settings, o), s.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(s), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), r = !1, t(e).parents().each(function () {
                    return r |= "fixed" === t(this).css("position"), !r
                }), l = {
                    left: t.datepicker._pos[0],
                    top: t.datepicker._pos[1]
                }, t.datepicker._pos = null, s.dpDiv.empty(), s.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), t.datepicker._updateDatepicker(s), l = t.datepicker._checkOffset(s, l, r), s.dpDiv.css({
                    position: t.datepicker._inDialog && t.blockUI ? "static" : r ? "fixed" : "absolute",
                    display: "none",
                    left: l.left + "px",
                    top: l.top + "px"
                }), s.inline || (h = t.datepicker._get(s, "showAnim"), c = t.datepicker._get(s, "duration"), s.dpDiv.css("z-index", i(t(e)) + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[h] ? s.dpDiv.show(h, t.datepicker._get(s, "showOptions"), c) : s.dpDiv[h || "show"](h ? c : null), t.datepicker._shouldFocusInput(s) && s.input.trigger("focus"), t.datepicker._curInst = s))
            }
        },
        _updateDatepicker: function (e) {
            this.maxRows = 4, d = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e);
            var i, s = this._getNumberOfMonths(e), n = s[1], a = 17, r = e.dpDiv.find("." + this._dayOverClass + " a");
            r.length > 0 && o.apply(r.get(0)), e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), n > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + n).css("width", a * n + "em"), e.dpDiv[(1 !== s[0] || 1 !== s[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.trigger("focus"), e.yearshtml && (i = e.yearshtml, setTimeout(function () {
                i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function (t) {
            return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus")
        },
        _checkOffset: function (e, i, s) {
            var n = e.dpDiv.outerWidth(), o = e.dpDiv.outerHeight(), a = e.input ? e.input.outerWidth() : 0,
                r = e.input ? e.input.outerHeight() : 0,
                l = document.documentElement.clientWidth + (s ? 0 : t(document).scrollLeft()),
                h = document.documentElement.clientHeight + (s ? 0 : t(document).scrollTop());
            return i.left -= this._get(e, "isRTL") ? n - a : 0, i.left -= s && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= s && i.top === e.input.offset().top + r ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + n > l && l > n ? Math.abs(i.left + n - l) : 0), i.top -= Math.min(i.top, i.top + o > h && h > o ? Math.abs(o + r) : 0), i
        },
        _findPos: function (e) {
            for (var i, s = this._getInst(e), n = this._get(s, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));) e = e[n ? "previousSibling" : "nextSibling"];
            return i = t(e).offset(), [i.left, i.top]
        },
        _hideDatepicker: function (e) {
            var i, s, n, o, a = this._curInst;
            !a || e && a !== t.data(e, "datepicker") || this._datepickerShowing && (i = this._get(a, "showAnim"), s = this._get(a, "duration"), n = function () {
                t.datepicker._tidyDialog(a)
            }, t.effects && (t.effects.effect[i] || t.effects[i]) ? a.dpDiv.hide(i, t.datepicker._get(a, "showOptions"), s, n) : a.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? s : null, n), i || n(), this._datepickerShowing = !1, o = this._get(a, "onClose"), o && o.apply(a.input ? a.input[0] : null, [a.input ? a.input.val() : "", a]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1)
        },
        _tidyDialog: function (t) {
            t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (e) {
            if (t.datepicker._curInst) {
                var i = t(e.target), s = t.datepicker._getInst(i[0]);
                (i[0].id !== t.datepicker._mainDivId && 0 === i.parents("#" + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== s) && t.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (e, i, s) {
            var n = t(e), o = this._getInst(n[0]);
            this._isDisabledDatepicker(n[0]) || (this._adjustInstDate(o, i + ("M" === s ? this._get(o, "showCurrentAtPos") : 0), s), this._updateDatepicker(o))
        },
        _gotoToday: function (e) {
            var i, s = t(e), n = this._getInst(s[0]);
            this._get(n, "gotoCurrent") && n.currentDay ? (n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear) : (i = new Date, n.selectedDay = i.getDate(), n.drawMonth = n.selectedMonth = i.getMonth(), n.drawYear = n.selectedYear = i.getFullYear()), this._notifyChange(n), this._adjustDate(s)
        },
        _selectMonthYear: function (e, i, s) {
            var n = t(e), o = this._getInst(n[0]);
            o["selected" + ("M" === s ? "Month" : "Year")] = o["draw" + ("M" === s ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(o), this._adjustDate(n)
        },
        _selectDay: function (e, i, s, n) {
            var o, a = t(e);
            t(n).hasClass(this._unselectableClass) || this._isDisabledDatepicker(a[0]) || (o = this._getInst(a[0]), o.selectedDay = o.currentDay = t("a", n).html(), o.selectedMonth = o.currentMonth = i, o.selectedYear = o.currentYear = s, this._selectDate(e, this._formatDate(o, o.currentDay, o.currentMonth, o.currentYear)))
        },
        _clearDate: function (e) {
            var i = t(e);
            this._selectDate(i, "")
        },
        _selectDate: function (e, i) {
            var s, n = t(e), o = this._getInst(n[0]);
            i = null != i ? i : this._formatDate(o), o.input && o.input.val(i), this._updateAlternate(o), s = this._get(o, "onSelect"), s ? s.apply(o.input ? o.input[0] : null, [i, o]) : o.input && o.input.trigger("change"), o.inline ? this._updateDatepicker(o) : (this._hideDatepicker(), this._lastInput = o.input[0], "object" != typeof o.input[0] && o.input.trigger("focus"), this._lastInput = null)
        },
        _updateAlternate: function (e) {
            var i, s, n, o = this._get(e, "altField");
            o && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), s = this._getDate(e), n = this.formatDate(i, s, this._getFormatConfig(e)), t(o).val(n))
        },
        noWeekends: function (t) {
            var e = t.getDay();
            return [e > 0 && 6 > e, ""]
        },
        iso8601Week: function (t) {
            var e, i = new Date(t.getTime());
            return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1
        },
        parseDate: function (e, i, s) {
            if (null == e || null == i) throw"Invalid arguments";
            if (i = "object" == typeof i ? "" + i : i + "", "" === i) return null;
            var n, o, a, r, l = 0, h = (s ? s.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                c = "string" != typeof h ? h : (new Date).getFullYear() % 100 + parseInt(h, 10),
                u = (s ? s.dayNamesShort : null) || this._defaults.dayNamesShort,
                d = (s ? s.dayNames : null) || this._defaults.dayNames,
                p = (s ? s.monthNamesShort : null) || this._defaults.monthNamesShort,
                f = (s ? s.monthNames : null) || this._defaults.monthNames, g = -1, m = -1, _ = -1, v = -1, b = !1,
                y = function (t) {
                    var i = e.length > n + 1 && e.charAt(n + 1) === t;
                    return i && n++, i
                }, w = function (t) {
                    var e = y(t), s = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
                        n = "y" === t ? s : 1, o = RegExp("^\\d{" + n + "," + s + "}"), a = i.substring(l).match(o);
                    if (!a) throw"Missing number at position " + l;
                    return l += a[0].length, parseInt(a[0], 10)
                }, k = function (e, s, n) {
                    var o = -1, a = t.map(y(e) ? n : s, function (t, e) {
                        return [[e, t]]
                    }).sort(function (t, e) {
                        return -(t[1].length - e[1].length)
                    });
                    if (t.each(a, function (t, e) {
                        var s = e[1];
                        return i.substr(l, s.length).toLowerCase() === s.toLowerCase() ? (o = e[0], l += s.length, !1) : void 0
                    }), -1 !== o) return o + 1;
                    throw"Unknown name at position " + l
                }, x = function () {
                    if (i.charAt(l) !== e.charAt(n)) throw"Unexpected literal at position " + l;
                    l++
                };
            for (n = 0; e.length > n; n++) if (b) "'" !== e.charAt(n) || y("'") ? x() : b = !1; else switch (e.charAt(n)) {
                case"d":
                    _ = w("d");
                    break;
                case"D":
                    k("D", u, d);
                    break;
                case"o":
                    v = w("o");
                    break;
                case"m":
                    m = w("m");
                    break;
                case"M":
                    m = k("M", p, f);
                    break;
                case"y":
                    g = w("y");
                    break;
                case"@":
                    r = new Date(w("@")), g = r.getFullYear(), m = r.getMonth() + 1, _ = r.getDate();
                    break;
                case"!":
                    r = new Date((w("!") - this._ticksTo1970) / 1e4), g = r.getFullYear(), m = r.getMonth() + 1, _ = r.getDate();
                    break;
                case"'":
                    y("'") ? x() : b = !0;
                    break;
                default:
                    x()
            }
            if (i.length > l && (a = i.substr(l), !/^\s+/.test(a))) throw"Extra/unparsed characters found in date: " + a;
            if (-1 === g ? g = (new Date).getFullYear() : 100 > g && (g += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (c >= g ? 0 : -100)), v > -1) for (m = 1, _ = v; ;) {
                if (o = this._getDaysInMonth(g, m - 1), o >= _) break;
                m++, _ -= o
            }
            if (r = this._daylightSavingAdjust(new Date(g, m - 1, _)), r.getFullYear() !== g || r.getMonth() + 1 !== m || r.getDate() !== _) throw"Invalid date";
            return r
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
        formatDate: function (t, e, i) {
            if (!e) return "";
            var s, n = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                o = (i ? i.dayNames : null) || this._defaults.dayNames,
                a = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                r = (i ? i.monthNames : null) || this._defaults.monthNames, l = function (e) {
                    var i = t.length > s + 1 && t.charAt(s + 1) === e;
                    return i && s++, i
                }, h = function (t, e, i) {
                    var s = "" + e;
                    if (l(t)) for (; i > s.length;) s = "0" + s;
                    return s
                }, c = function (t, e, i, s) {
                    return l(t) ? s[e] : i[e]
                }, u = "", d = !1;
            if (e) for (s = 0; t.length > s; s++) if (d) "'" !== t.charAt(s) || l("'") ? u += t.charAt(s) : d = !1; else switch (t.charAt(s)) {
                case"d":
                    u += h("d", e.getDate(), 2);
                    break;
                case"D":
                    u += c("D", e.getDay(), n, o);
                    break;
                case"o":
                    u += h("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                    break;
                case"m":
                    u += h("m", e.getMonth() + 1, 2);
                    break;
                case"M":
                    u += c("M", e.getMonth(), a, r);
                    break;
                case"y":
                    u += l("y") ? e.getFullYear() : (10 > e.getFullYear() % 100 ? "0" : "") + e.getFullYear() % 100;
                    break;
                case"@":
                    u += e.getTime();
                    break;
                case"!":
                    u += 1e4 * e.getTime() + this._ticksTo1970;
                    break;
                case"'":
                    l("'") ? u += "'" : d = !0;
                    break;
                default:
                    u += t.charAt(s)
            }
            return u
        },
        _possibleChars: function (t) {
            var e, i = "", s = !1, n = function (i) {
                var s = t.length > e + 1 && t.charAt(e + 1) === i;
                return s && e++, s
            };
            for (e = 0; t.length > e; e++) if (s) "'" !== t.charAt(e) || n("'") ? i += t.charAt(e) : s = !1; else switch (t.charAt(e)) {
                case"d":
                case"m":
                case"y":
                case"@":
                    i += "0123456789";
                    break;
                case"D":
                case"M":
                    return null;
                case"'":
                    n("'") ? i += "'" : s = !0;
                    break;
                default:
                    i += t.charAt(e)
            }
            return i
        },
        _get: function (t, e) {
            return void 0 !== t.settings[e] ? t.settings[e] : this._defaults[e]
        },
        _setDateFromField: function (t, e) {
            if (t.input.val() !== t.lastVal) {
                var i = this._get(t, "dateFormat"), s = t.lastVal = t.input ? t.input.val() : null,
                    n = this._getDefaultDate(t), o = n, a = this._getFormatConfig(t);
                try {
                    o = this.parseDate(i, s, a) || n
                } catch (r) {
                    s = e ? "" : s
                }
                t.selectedDay = o.getDate(), t.drawMonth = t.selectedMonth = o.getMonth(), t.drawYear = t.selectedYear = o.getFullYear(), t.currentDay = s ? o.getDate() : 0, t.currentMonth = s ? o.getMonth() : 0, t.currentYear = s ? o.getFullYear() : 0, this._adjustInstDate(t)
            }
        },
        _getDefaultDate: function (t) {
            return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
        },
        _determineDate: function (e, i, s) {
            var n = function (t) {
                    var e = new Date;
                    return e.setDate(e.getDate() + t), e
                }, o = function (i) {
                    try {
                        return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e))
                    } catch (s) {
                    }
                    for (var n = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, o = n.getFullYear(), a = n.getMonth(), r = n.getDate(), l = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, h = l.exec(i); h;) {
                        switch (h[2] || "d") {
                            case"d":
                            case"D":
                                r += parseInt(h[1], 10);
                                break;
                            case"w":
                            case"W":
                                r += 7 * parseInt(h[1], 10);
                                break;
                            case"m":
                            case"M":
                                a += parseInt(h[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(o, a));
                                break;
                            case"y":
                            case"Y":
                                o += parseInt(h[1], 10), r = Math.min(r, t.datepicker._getDaysInMonth(o, a))
                        }
                        h = l.exec(i)
                    }
                    return new Date(o, a, r)
                },
                a = null == i || "" === i ? s : "string" == typeof i ? o(i) : "number" == typeof i ? isNaN(i) ? s : n(i) : new Date(i.getTime());
            return a = a && "Invalid Date" == "" + a ? s : a, a && (a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0)), this._daylightSavingAdjust(a)
        },
        _daylightSavingAdjust: function (t) {
            return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
        },
        _setDate: function (t, e, i) {
            var s = !e, n = t.selectedMonth, o = t.selectedYear,
                a = this._restrictMinMax(t, this._determineDate(t, e, new Date));
            t.selectedDay = t.currentDay = a.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = a.getMonth(), t.drawYear = t.selectedYear = t.currentYear = a.getFullYear(), n === t.selectedMonth && o === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(s ? "" : this._formatDate(t))
        },
        _getDate: function (t) {
            var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
            return e
        },
        _attachHandlers: function (e) {
            var i = this._get(e, "stepMonths"), s = "#" + e.id.replace(/\\\\/g, "\\");
            e.dpDiv.find("[data-handler]").map(function () {
                var e = {
                    prev: function () {
                        t.datepicker._adjustDate(s, -i, "M")
                    }, next: function () {
                        t.datepicker._adjustDate(s, +i, "M")
                    }, hide: function () {
                        t.datepicker._hideDatepicker()
                    }, today: function () {
                        t.datepicker._gotoToday(s)
                    }, selectDay: function () {
                        return t.datepicker._selectDay(s, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                    }, selectMonth: function () {
                        return t.datepicker._selectMonthYear(s, this, "M"), !1
                    }, selectYear: function () {
                        return t.datepicker._selectMonthYear(s, this, "Y"), !1
                    }
                };
                t(this).on(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function (t) {
            var e, i, s, n, o, a, r, l, h, c, u, d, p, f, g, m, _, v, b, y, w, k, x, C, D, T, I, M, P, S, N, H, A, z, O,
                E, W, F, L, R = new Date,
                Y = this._daylightSavingAdjust(new Date(R.getFullYear(), R.getMonth(), R.getDate())),
                B = this._get(t, "isRTL"), j = this._get(t, "showButtonPanel"), q = this._get(t, "hideIfNoPrevNext"),
                K = this._get(t, "navigationAsDateFormat"), U = this._getNumberOfMonths(t),
                V = this._get(t, "showCurrentAtPos"), X = this._get(t, "stepMonths"), $ = 1 !== U[0] || 1 !== U[1],
                G = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
                J = this._getMinMaxDate(t, "min"), Q = this._getMinMaxDate(t, "max"), Z = t.drawMonth - V,
                te = t.drawYear;
            if (0 > Z && (Z += 12, te--), Q) for (e = this._daylightSavingAdjust(new Date(Q.getFullYear(), Q.getMonth() - U[0] * U[1] + 1, Q.getDate())), e = J && J > e ? J : e; this._daylightSavingAdjust(new Date(te, Z, 1)) > e;) Z--, 0 > Z && (Z = 11, te--);
            for (t.drawMonth = Z, t.drawYear = te, i = this._get(t, "prevText"), i = K ? this.formatDate(i, this._daylightSavingAdjust(new Date(te, Z - X, 1)), this._getFormatConfig(t)) : i, s = this._canAdjustMonth(t, -1, te, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (B ? "e" : "w") + "'>" + i + "</span></a>" : q ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (B ? "e" : "w") + "'>" + i + "</span></a>", n = this._get(t, "nextText"), n = K ? this.formatDate(n, this._daylightSavingAdjust(new Date(te, Z + X, 1)), this._getFormatConfig(t)) : n, o = this._canAdjustMonth(t, 1, te, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (B ? "w" : "e") + "'>" + n + "</span></a>" : q ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + n + "'><span class='ui-icon ui-icon-circle-triangle-" + (B ? "w" : "e") + "'>" + n + "</span></a>", a = this._get(t, "currentText"), r = this._get(t, "gotoCurrent") && t.currentDay ? G : Y, a = K ? this.formatDate(a, r, this._getFormatConfig(t)) : a, l = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", h = j ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (B ? l : "") + (this._isInRange(t, r) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + a + "</button>" : "") + (B ? "" : l) + "</div>" : "", c = parseInt(this._get(t, "firstDay"), 10), c = isNaN(c) ? 0 : c, u = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), g = this._get(t, "monthNamesShort"), m = this._get(t, "beforeShowDay"), _ = this._get(t, "showOtherMonths"), v = this._get(t, "selectOtherMonths"), b = this._getDefaultDate(t), y = "", k = 0; U[0] > k; k++) {
                for (x = "", this.maxRows = 4, C = 0; U[1] > C; C++) {
                    if (D = this._daylightSavingAdjust(new Date(te, Z, t.selectedDay)), T = " ui-corner-all", I = "", $) {
                        if (I += "<div class='ui-datepicker-group", U[1] > 1) switch (C) {
                            case 0:
                                I += " ui-datepicker-group-first", T = " ui-corner-" + (B ? "right" : "left");
                                break;
                            case U[1] - 1:
                                I += " ui-datepicker-group-last", T = " ui-corner-" + (B ? "left" : "right");
                                break;
                            default:
                                I += " ui-datepicker-group-middle", T = ""
                        }
                        I += "'>"
                    }
                    for (I += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + T + "'>" + (/all|left/.test(T) && 0 === k ? B ? o : s : "") + (/all|right/.test(T) && 0 === k ? B ? s : o : "") + this._generateMonthYearHeader(t, Z, te, J, Q, k > 0 || C > 0, f, g) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", M = u ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", w = 0; 7 > w; w++) P = (w + c) % 7, M += "<th scope='col'" + ((w + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + d[P] + "'>" + p[P] + "</span></th>";
                    for (I += M + "</tr></thead><tbody>", S = this._getDaysInMonth(te, Z), te === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, S)), N = (this._getFirstDayOfMonth(te, Z) - c + 7) % 7, H = Math.ceil((N + S) / 7), A = $ ? this.maxRows > H ? this.maxRows : H : H, this.maxRows = A, z = this._daylightSavingAdjust(new Date(te, Z, 1 - N)), O = 0; A > O; O++) {
                        for (I += "<tr>", E = u ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(z) + "</td>" : "", w = 0; 7 > w; w++) W = m ? m.apply(t.input ? t.input[0] : null, [z]) : [!0, ""], F = z.getMonth() !== Z, L = F && !v || !W[0] || J && J > z || Q && z > Q, E += "<td class='" + ((w + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (F ? " ui-datepicker-other-month" : "") + (z.getTime() === D.getTime() && Z === t.selectedMonth && t._keyEvent || b.getTime() === z.getTime() && b.getTime() === D.getTime() ? " " + this._dayOverClass : "") + (L ? " " + this._unselectableClass + " ui-state-disabled" : "") + (F && !_ ? "" : " " + W[1] + (z.getTime() === G.getTime() ? " " + this._currentClass : "") + (z.getTime() === Y.getTime() ? " ui-datepicker-today" : "")) + "'" + (F && !_ || !W[2] ? "" : " title='" + W[2].replace(/'/g, "&#39;") + "'") + (L ? "" : " data-handler='selectDay' data-event='click' data-month='" + z.getMonth() + "' data-year='" + z.getFullYear() + "'") + ">" + (F && !_ ? "&#xa0;" : L ? "<span class='ui-state-default'>" + z.getDate() + "</span>" : "<a class='ui-state-default" + (z.getTime() === Y.getTime() ? " ui-state-highlight" : "") + (z.getTime() === G.getTime() ? " ui-state-active" : "") + (F ? " ui-priority-secondary" : "") + "' href='#'>" + z.getDate() + "</a>") + "</td>", z.setDate(z.getDate() + 1), z = this._daylightSavingAdjust(z);
                        I += E + "</tr>"
                    }
                    Z++, Z > 11 && (Z = 0, te++), I += "</tbody></table>" + ($ ? "</div>" + (U[0] > 0 && C === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), x += I
                }
                y += x
            }
            return y += h, t._keyEvent = !1, y
        },
        _generateMonthYearHeader: function (t, e, i, s, n, o, a, r) {
            var l, h, c, u, d, p, f, g, m = this._get(t, "changeMonth"), _ = this._get(t, "changeYear"),
                v = this._get(t, "showMonthAfterYear"), b = "<div class='ui-datepicker-title'>", y = "";
            if (o || !m) y += "<span class='ui-datepicker-month'>" + a[e] + "</span>"; else {
                for (l = s && s.getFullYear() === i, h = n && n.getFullYear() === i, y += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", c = 0; 12 > c; c++) (!l || c >= s.getMonth()) && (!h || n.getMonth() >= c) && (y += "<option value='" + c + "'" + (c === e ? " selected='selected'" : "") + ">" + r[c] + "</option>");
                y += "</select>"
            }
            if (v || (b += y + (!o && m && _ ? "" : "&#xa0;")), !t.yearshtml) if (t.yearshtml = "", o || !_) b += "<span class='ui-datepicker-year'>" + i + "</span>"; else {
                for (u = this._get(t, "yearRange").split(":"), d = (new Date).getFullYear(), p = function (t) {
                    var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
                    return isNaN(e) ? d : e
                }, f = p(u[0]), g = Math.max(f, p(u[1] || "")), f = s ? Math.max(f, s.getFullYear()) : f, g = n ? Math.min(g, n.getFullYear()) : g, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; g >= f; f++) t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                t.yearshtml += "</select>", b += t.yearshtml, t.yearshtml = null
            }
            return b += this._get(t, "yearSuffix"), v && (b += (!o && m && _ ? "" : "&#xa0;") + y), b += "</div>"
        },
        _adjustInstDate: function (t, e, i) {
            var s = t.selectedYear + ("Y" === i ? e : 0), n = t.selectedMonth + ("M" === i ? e : 0),
                o = Math.min(t.selectedDay, this._getDaysInMonth(s, n)) + ("D" === i ? e : 0),
                a = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(s, n, o)));
            t.selectedDay = a.getDate(), t.drawMonth = t.selectedMonth = a.getMonth(), t.drawYear = t.selectedYear = a.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(t)
        },
        _restrictMinMax: function (t, e) {
            var i = this._getMinMaxDate(t, "min"), s = this._getMinMaxDate(t, "max"), n = i && i > e ? i : e;
            return s && n > s ? s : n
        },
        _notifyChange: function (t) {
            var e = this._get(t, "onChangeMonthYear");
            e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
        },
        _getNumberOfMonths: function (t) {
            var e = this._get(t, "numberOfMonths");
            return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
        },
        _getMinMaxDate: function (t, e) {
            return this._determineDate(t, this._get(t, e + "Date"), null)
        },
        _getDaysInMonth: function (t, e) {
            return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
        },
        _getFirstDayOfMonth: function (t, e) {
            return new Date(t, e, 1).getDay()
        },
        _canAdjustMonth: function (t, e, i, s) {
            var n = this._getNumberOfMonths(t),
                o = this._daylightSavingAdjust(new Date(i, s + (0 > e ? e : n[0] * n[1]), 1));
            return 0 > e && o.setDate(this._getDaysInMonth(o.getFullYear(), o.getMonth())), this._isInRange(t, o)
        },
        _isInRange: function (t, e) {
            var i, s, n = this._getMinMaxDate(t, "min"), o = this._getMinMaxDate(t, "max"), a = null, r = null,
                l = this._get(t, "yearRange");
            return l && (i = l.split(":"), s = (new Date).getFullYear(), a = parseInt(i[0], 10), r = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (a += s), i[1].match(/[+\-].*/) && (r += s)), (!n || e.getTime() >= n.getTime()) && (!o || e.getTime() <= o.getTime()) && (!a || e.getFullYear() >= a) && (!r || r >= e.getFullYear())
        },
        _getFormatConfig: function (t) {
            var e = this._get(t, "shortYearCutoff");
            return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), {
                shortYearCutoff: e,
                dayNamesShort: this._get(t, "dayNamesShort"),
                dayNames: this._get(t, "dayNames"),
                monthNamesShort: this._get(t, "monthNamesShort"),
                monthNames: this._get(t, "monthNames")
            }
        },
        _formatDate: function (t, e, i, s) {
            e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
            var n = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(s, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
            return this.formatDate(this._get(t, "dateFormat"), n, this._getFormatConfig(t))
        }
    }), t.fn.datepicker = function (e) {
        if (!this.length) return this;
        t.datepicker.initialized || (t(document).on("mousedown", t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
        var i = Array.prototype.slice.call(arguments, 1);
        return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function () {
            "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e)
        }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
    }, t.datepicker = new s, t.datepicker.initialized = !1, t.datepicker.uuid = (new Date).getTime(), t.datepicker.version = "1.12.1", t.datepicker, t.widget("ui.dialog", {
        version: "1.12.1",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            classes: {"ui-dialog": "ui-corner-all", "ui-dialog-titlebar": "ui-corner-all"},
            closeOnEscape: !0,
            closeText: "Close",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center", at: "center", of: window, collision: "fit", using: function (e) {
                    var i = t(this).css(e).offset().top;
                    0 > i && t(this).css("top", e.top - i)
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        sizeRelatedOptions: {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        resizableRelatedOptions: {maxHeight: !0, maxWidth: !0, minHeight: !0, minWidth: !0},
        _create: function () {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            }, this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            }, this.originalTitle = this.element.attr("title"), null == this.options.title && null != this.originalTitle && (this.options.title = this.originalTitle), this.options.disabled && (this.options.disabled = !1), this._createWrapper(), this.element.show().removeAttr("title").appendTo(this.uiDialog), this._addClass("ui-dialog-content", "ui-widget-content"), this._createTitlebar(), this._createButtonPane(), this.options.draggable && t.fn.draggable && this._makeDraggable(), this.options.resizable && t.fn.resizable && this._makeResizable(), this._isOpen = !1, this._trackFocus()
        },
        _init: function () {
            this.options.autoOpen && this.open()
        },
        _appendTo: function () {
            var e = this.options.appendTo;
            return e && (e.jquery || e.nodeType) ? t(e) : this.document.find(e || "body").eq(0)
        },
        _destroy: function () {
            var t, e = this.originalPosition;
            this._untrackInstance(), this._destroyOverlay(), this.element.removeUniqueId().css(this.originalCss).detach(), this.uiDialog.remove(), this.originalTitle && this.element.attr("title", this.originalTitle), t = e.parent.children().eq(e.index), t.length && t[0] !== this.element[0] ? t.before(this.element) : e.parent.append(this.element)
        },
        widget: function () {
            return this.uiDialog
        },
        disable: t.noop,
        enable: t.noop,
        close: function (e) {
            var i = this;
            this._isOpen && this._trigger("beforeClose", e) !== !1 && (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), this.opener.filter(":focusable").trigger("focus").length || t.ui.safeBlur(t.ui.safeActiveElement(this.document[0])), this._hide(this.uiDialog, this.options.hide, function () {
                i._trigger("close", e)
            }))
        },
        isOpen: function () {
            return this._isOpen
        },
        moveToTop: function () {
            this._moveToTop()
        },
        _moveToTop: function (e, i) {
            var s = !1, n = this.uiDialog.siblings(".ui-front:visible").map(function () {
                return +t(this).css("z-index")
            }).get(), o = Math.max.apply(null, n);
            return o >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", o + 1), s = !0), s && !i && this._trigger("focus", e), s
        },
        open: function () {
            var e = this;
            return this._isOpen ? (this._moveToTop() && this._focusTabbable(), void 0) : (this._isOpen = !0, this.opener = t(t.ui.safeActiveElement(this.document[0])), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function () {
                e._focusTabbable(), e._trigger("focus")
            }), this._makeFocusTarget(), this._trigger("open"), void 0)
        },
        _focusTabbable: function () {
            var t = this._focusedElement;
            t || (t = this.element.find("[autofocus]")), t.length || (t = this.element.find(":tabbable")), t.length || (t = this.uiDialogButtonPane.find(":tabbable")), t.length || (t = this.uiDialogTitlebarClose.filter(":tabbable")), t.length || (t = this.uiDialog), t.eq(0).trigger("focus")
        },
        _keepFocus: function (e) {
            function i() {
                var e = t.ui.safeActiveElement(this.document[0]),
                    i = this.uiDialog[0] === e || t.contains(this.uiDialog[0], e);
                i || this._focusTabbable()
            }

            e.preventDefault(), i.call(this), this._delay(i)
        },
        _createWrapper: function () {
            this.uiDialog = t("<div>").hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo()), this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front"), this._on(this.uiDialog, {
                keydown: function (e) {
                    if (this.options.closeOnEscape && !e.isDefaultPrevented() && e.keyCode && e.keyCode === t.ui.keyCode.ESCAPE) return e.preventDefault(), this.close(e), void 0;
                    if (e.keyCode === t.ui.keyCode.TAB && !e.isDefaultPrevented()) {
                        var i = this.uiDialog.find(":tabbable"), s = i.filter(":first"), n = i.filter(":last");
                        e.target !== n[0] && e.target !== this.uiDialog[0] || e.shiftKey ? e.target !== s[0] && e.target !== this.uiDialog[0] || !e.shiftKey || (this._delay(function () {
                            n.trigger("focus")
                        }), e.preventDefault()) : (this._delay(function () {
                            s.trigger("focus")
                        }), e.preventDefault())
                    }
                }, mousedown: function (t) {
                    this._moveToTop(t) && this._focusTabbable()
                }
            }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({"aria-describedby": this.element.uniqueId().attr("id")})
        },
        _createTitlebar: function () {
            var e;
            this.uiDialogTitlebar = t("<div>"), this._addClass(this.uiDialogTitlebar, "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix"), this._on(this.uiDialogTitlebar, {
                mousedown: function (e) {
                    t(e.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.trigger("focus")
                }
            }), this.uiDialogTitlebarClose = t("<button type='button'></button>").button({
                label: t("<a>").text(this.options.closeText).html(),
                icon: "ui-icon-closethick",
                showLabel: !1
            }).appendTo(this.uiDialogTitlebar), this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close"), this._on(this.uiDialogTitlebarClose, {
                click: function (t) {
                    t.preventDefault(), this.close(t)
                }
            }), e = t("<span>").uniqueId().prependTo(this.uiDialogTitlebar), this._addClass(e, "ui-dialog-title"), this._title(e), this.uiDialogTitlebar.prependTo(this.uiDialog), this.uiDialog.attr({"aria-labelledby": e.attr("id")})
        },
        _title: function (t) {
            this.options.title ? t.text(this.options.title) : t.html("&#160;")
        },
        _createButtonPane: function () {
            this.uiDialogButtonPane = t("<div>"), this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane", "ui-widget-content ui-helper-clearfix"), this.uiButtonSet = t("<div>").appendTo(this.uiDialogButtonPane), this._addClass(this.uiButtonSet, "ui-dialog-buttonset"), this._createButtons()
        },
        _createButtons: function () {
            var e = this, i = this.options.buttons;
            return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), t.isEmptyObject(i) || t.isArray(i) && !i.length ? (this._removeClass(this.uiDialog, "ui-dialog-buttons"), void 0) : (t.each(i, function (i, s) {
                var n, o;
                s = t.isFunction(s) ? {
                    click: s,
                    text: i
                } : s, s = t.extend({type: "button"}, s), n = s.click, o = {
                    icon: s.icon,
                    iconPosition: s.iconPosition,
                    showLabel: s.showLabel,
                    icons: s.icons,
                    text: s.text
                }, delete s.click, delete s.icon, delete s.iconPosition, delete s.showLabel, delete s.icons, "boolean" == typeof s.text && delete s.text, t("<button></button>", s).button(o).appendTo(e.uiButtonSet).on("click", function () {
                    n.apply(e.element[0], arguments)
                })
            }), this._addClass(this.uiDialog, "ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), void 0)
        },
        _makeDraggable: function () {
            function e(t) {
                return {position: t.position, offset: t.offset}
            }

            var i = this, s = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (s, n) {
                    i._addClass(t(this), "ui-dialog-dragging"), i._blockFrames(), i._trigger("dragStart", s, e(n))
                },
                drag: function (t, s) {
                    i._trigger("drag", t, e(s))
                },
                stop: function (n, o) {
                    var a = o.offset.left - i.document.scrollLeft(), r = o.offset.top - i.document.scrollTop();
                    s.position = {
                        my: "left top",
                        at: "left" + (a >= 0 ? "+" : "") + a + " " + "top" + (r >= 0 ? "+" : "") + r,
                        of: i.window
                    }, i._removeClass(t(this), "ui-dialog-dragging"), i._unblockFrames(), i._trigger("dragStop", n, e(o))
                }
            })
        },
        _makeResizable: function () {
            function e(t) {
                return {
                    originalPosition: t.originalPosition,
                    originalSize: t.originalSize,
                    position: t.position,
                    size: t.size
                }
            }

            var i = this, s = this.options, n = s.resizable, o = this.uiDialog.css("position"),
                a = "string" == typeof n ? n : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: s.maxWidth,
                maxHeight: s.maxHeight,
                minWidth: s.minWidth,
                minHeight: this._minHeight(),
                handles: a,
                start: function (s, n) {
                    i._addClass(t(this), "ui-dialog-resizing"), i._blockFrames(), i._trigger("resizeStart", s, e(n))
                },
                resize: function (t, s) {
                    i._trigger("resize", t, e(s))
                },
                stop: function (n, o) {
                    var a = i.uiDialog.offset(), r = a.left - i.document.scrollLeft(),
                        l = a.top - i.document.scrollTop();
                    s.height = i.uiDialog.height(), s.width = i.uiDialog.width(), s.position = {
                        my: "left top",
                        at: "left" + (r >= 0 ? "+" : "") + r + " " + "top" + (l >= 0 ? "+" : "") + l,
                        of: i.window
                    }, i._removeClass(t(this), "ui-dialog-resizing"), i._unblockFrames(), i._trigger("resizeStop", n, e(o))
                }
            }).css("position", o)
        },
        _trackFocus: function () {
            this._on(this.widget(), {
                focusin: function (e) {
                    this._makeFocusTarget(), this._focusedElement = t(e.target)
                }
            })
        },
        _makeFocusTarget: function () {
            this._untrackInstance(), this._trackingInstances().unshift(this)
        },
        _untrackInstance: function () {
            var e = this._trackingInstances(), i = t.inArray(this, e);
            -1 !== i && e.splice(i, 1)
        },
        _trackingInstances: function () {
            var t = this.document.data("ui-dialog-instances");
            return t || (t = [], this.document.data("ui-dialog-instances", t)), t
        },
        _minHeight: function () {
            var t = this.options;
            return "auto" === t.height ? t.minHeight : Math.min(t.minHeight, t.height)
        },
        _position: function () {
            var t = this.uiDialog.is(":visible");
            t || this.uiDialog.show(), this.uiDialog.position(this.options.position), t || this.uiDialog.hide()
        },
        _setOptions: function (e) {
            var i = this, s = !1, n = {};
            t.each(e, function (t, e) {
                i._setOption(t, e), t in i.sizeRelatedOptions && (s = !0), t in i.resizableRelatedOptions && (n[t] = e)
            }), s && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", n)
        },
        _setOption: function (e, i) {
            var s, n, o = this.uiDialog;
            "disabled" !== e && (this._super(e, i), "appendTo" === e && this.uiDialog.appendTo(this._appendTo()), "buttons" === e && this._createButtons(), "closeText" === e && this.uiDialogTitlebarClose.button({label: t("<a>").text("" + this.options.closeText).html()}), "draggable" === e && (s = o.is(":data(ui-draggable)"), s && !i && o.draggable("destroy"), !s && i && this._makeDraggable()), "position" === e && this._position(), "resizable" === e && (n = o.is(":data(ui-resizable)"), n && !i && o.resizable("destroy"), n && "string" == typeof i && o.resizable("option", "handles", i), n || i === !1 || this._makeResizable()), "title" === e && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
        },
        _size: function () {
            var t, e, i, s = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            }), s.minWidth > s.width && (s.width = s.minWidth), t = this.uiDialog.css({
                height: "auto",
                width: s.width
            }).outerHeight(), e = Math.max(0, s.minHeight - t), i = "number" == typeof s.maxHeight ? Math.max(0, s.maxHeight - t) : "none", "auto" === s.height ? this.element.css({
                minHeight: e,
                maxHeight: i,
                height: "auto"
            }) : this.element.height(Math.max(0, s.height - t)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        },
        _blockFrames: function () {
            this.iframeBlocks = this.document.find("iframe").map(function () {
                var e = t(this);
                return t("<div>").css({
                    position: "absolute",
                    width: e.outerWidth(),
                    height: e.outerHeight()
                }).appendTo(e.parent()).offset(e.offset())[0]
            })
        },
        _unblockFrames: function () {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
        },
        _allowInteraction: function (e) {
            return t(e.target).closest(".ui-dialog").length ? !0 : !!t(e.target).closest(".ui-datepicker").length
        },
        _createOverlay: function () {
            if (this.options.modal) {
                var e = !0;
                this._delay(function () {
                    e = !1
                }), this.document.data("ui-dialog-overlays") || this._on(this.document, {
                    focusin: function (t) {
                        e || this._allowInteraction(t) || (t.preventDefault(), this._trackingInstances()[0]._focusTabbable())
                    }
                }), this.overlay = t("<div>").appendTo(this._appendTo()), this._addClass(this.overlay, null, "ui-widget-overlay ui-front"), this._on(this.overlay, {mousedown: "_keepFocus"}), this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
            }
        },
        _destroyOverlay: function () {
            if (this.options.modal && this.overlay) {
                var t = this.document.data("ui-dialog-overlays") - 1;
                t ? this.document.data("ui-dialog-overlays", t) : (this._off(this.document, "focusin"), this.document.removeData("ui-dialog-overlays")), this.overlay.remove(), this.overlay = null
            }
        }
    }), t.uiBackCompat !== !1 && t.widget("ui.dialog", t.ui.dialog, {
        options: {dialogClass: ""},
        _createWrapper: function () {
            this._super(), this.uiDialog.addClass(this.options.dialogClass)
        },
        _setOption: function (t, e) {
            "dialogClass" === t && this.uiDialog.removeClass(this.options.dialogClass).addClass(e), this._superApply(arguments)
        }
    }), t.ui.dialog, t.widget("ui.selectmenu", [t.ui.formResetMixin, {
        version: "1.12.1",
        defaultElement: "<select>",
        options: {
            appendTo: null,
            classes: {"ui-selectmenu-button-open": "ui-corner-top", "ui-selectmenu-button-closed": "ui-corner-all"},
            disabled: null,
            icons: {button: "ui-icon-triangle-1-s"},
            position: {my: "left top", at: "left bottom", collision: "none"},
            width: !1,
            change: null,
            close: null,
            focus: null,
            open: null,
            select: null
        },
        _create: function () {
            var e = this.element.uniqueId().attr("id");
            this.ids = {
                element: e,
                button: e + "-button",
                menu: e + "-menu"
            }, this._drawButton(), this._drawMenu(), this._bindFormResetHandler(), this._rendered = !1, this.menuItems = t()
        },
        _drawButton: function () {
            var e, i = this, s = this._parseOption(this.element.find("option:selected"), this.element[0].selectedIndex);
            this.labels = this.element.labels().attr("for", this.ids.button), this._on(this.labels, {
                click: function (t) {
                    this.button.focus(), t.preventDefault()
                }
            }), this.element.hide(), this.button = t("<span>", {
                tabindex: this.options.disabled ? -1 : 0,
                id: this.ids.button,
                role: "combobox",
                "aria-expanded": "false",
                "aria-autocomplete": "list",
                "aria-owns": this.ids.menu,
                "aria-haspopup": "true",
                title: this.element.attr("title")
            }).insertAfter(this.element), this._addClass(this.button, "ui-selectmenu-button ui-selectmenu-button-closed", "ui-button ui-widget"), e = t("<span>").appendTo(this.button), this._addClass(e, "ui-selectmenu-icon", "ui-icon " + this.options.icons.button), this.buttonItem = this._renderButtonItem(s).appendTo(this.button), this.options.width !== !1 && this._resizeButton(), this._on(this.button, this._buttonEvents), this.button.one("focusin", function () {
                i._rendered || i._refreshMenu()
            })
        },
        _drawMenu: function () {
            var e = this;
            this.menu = t("<ul>", {
                "aria-hidden": "true",
                "aria-labelledby": this.ids.button,
                id: this.ids.menu
            }), this.menuWrap = t("<div>").append(this.menu), this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front"), this.menuWrap.appendTo(this._appendTo()), this.menuInstance = this.menu.menu({
                classes: {"ui-menu": "ui-corner-bottom"},
                role: "listbox",
                select: function (t, i) {
                    t.preventDefault(), e._setSelection(), e._select(i.item.data("ui-selectmenu-item"), t)
                },
                focus: function (t, i) {
                    var s = i.item.data("ui-selectmenu-item");
                    null != e.focusIndex && s.index !== e.focusIndex && (e._trigger("focus", t, {item: s}), e.isOpen || e._select(s, t)), e.focusIndex = s.index, e.button.attr("aria-activedescendant", e.menuItems.eq(s.index).attr("id"))
                }
            }).menu("instance"), this.menuInstance._off(this.menu, "mouseleave"), this.menuInstance._closeOnDocumentClick = function () {
                return !1
            }, this.menuInstance._isDivider = function () {
                return !1
            }
        },
        refresh: function () {
            this._refreshMenu(), this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item") || {})), null === this.options.width && this._resizeButton()
        },
        _refreshMenu: function () {
            var t, e = this.element.find("option");
            this.menu.empty(), this._parseOptions(e), this._renderMenu(this.menu, this.items), this.menuInstance.refresh(), this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"), this._rendered = !0, e.length && (t = this._getSelectedItem(), this.menuInstance.focus(null, t), this._setAria(t.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")))
        },
        open: function (t) {
            this.options.disabled || (this._rendered ? (this._removeClass(this.menu.find(".ui-state-active"), null, "ui-state-active"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.menuItems.length && (this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", t)))
        },
        _position: function () {
            this.menuWrap.position(t.extend({of: this.button}, this.options.position))
        },
        close: function (t) {
            this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", t))
        },
        widget: function () {
            return this.button
        },
        menuWidget: function () {
            return this.menu
        },
        _renderButtonItem: function (e) {
            var i = t("<span>");
            return this._setText(i, e.label), this._addClass(i, "ui-selectmenu-text"), i
        },
        _renderMenu: function (e, i) {
            var s = this, n = "";
            t.each(i, function (i, o) {
                var a;
                o.optgroup !== n && (a = t("<li>", {text: o.optgroup}), s._addClass(a, "ui-selectmenu-optgroup", "ui-menu-divider" + (o.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : "")), a.appendTo(e), n = o.optgroup), s._renderItemData(e, o)
            })
        },
        _renderItemData: function (t, e) {
            return this._renderItem(t, e).data("ui-selectmenu-item", e)
        },
        _renderItem: function (e, i) {
            var s = t("<li>"), n = t("<div>", {title: i.element.attr("title")});
            return i.disabled && this._addClass(s, null, "ui-state-disabled"), this._setText(n, i.label), s.append(n).appendTo(e)
        },
        _setText: function (t, e) {
            e ? t.text(e) : t.html("&#160;")
        },
        _move: function (t, e) {
            var i, s, n = ".ui-menu-item";
            this.isOpen ? i = this.menuItems.eq(this.focusIndex).parent("li") : (i = this.menuItems.eq(this.element[0].selectedIndex).parent("li"), n += ":not(.ui-state-disabled)"), s = "first" === t || "last" === t ? i["first" === t ? "prevAll" : "nextAll"](n).eq(-1) : i[t + "All"](n).eq(0), s.length && this.menuInstance.focus(e, s)
        },
        _getSelectedItem: function () {
            return this.menuItems.eq(this.element[0].selectedIndex).parent("li")
        },
        _toggle: function (t) {
            this[this.isOpen ? "close" : "open"](t)
        },
        _setSelection: function () {
            var t;
            this.range && (window.getSelection ? (t = window.getSelection(), t.removeAllRanges(), t.addRange(this.range)) : this.range.select(), this.button.focus())
        },
        _documentClick: {
            mousedown: function (e) {
                this.isOpen && (t(e.target).closest(".ui-selectmenu-menu, #" + t.ui.escapeSelector(this.ids.button)).length || this.close(e))
            }
        },
        _buttonEvents: {
            mousedown: function () {
                var t;
                window.getSelection ? (t = window.getSelection(), t.rangeCount && (this.range = t.getRangeAt(0))) : this.range = document.selection.createRange()
            }, click: function (t) {
                this._setSelection(), this._toggle(t)
            }, keydown: function (e) {
                var i = !0;
                switch (e.keyCode) {
                    case t.ui.keyCode.TAB:
                    case t.ui.keyCode.ESCAPE:
                        this.close(e), i = !1;
                        break;
                    case t.ui.keyCode.ENTER:
                        this.isOpen && this._selectFocusedItem(e);
                        break;
                    case t.ui.keyCode.UP:
                        e.altKey ? this._toggle(e) : this._move("prev", e);
                        break;
                    case t.ui.keyCode.DOWN:
                        e.altKey ? this._toggle(e) : this._move("next", e);
                        break;
                    case t.ui.keyCode.SPACE:
                        this.isOpen ? this._selectFocusedItem(e) : this._toggle(e);
                        break;
                    case t.ui.keyCode.LEFT:
                        this._move("prev", e);
                        break;
                    case t.ui.keyCode.RIGHT:
                        this._move("next", e);
                        break;
                    case t.ui.keyCode.HOME:
                    case t.ui.keyCode.PAGE_UP:
                        this._move("first", e);
                        break;
                    case t.ui.keyCode.END:
                    case t.ui.keyCode.PAGE_DOWN:
                        this._move("last", e);
                        break;
                    default:
                        this.menu.trigger(e), i = !1
                }
                i && e.preventDefault()
            }
        },
        _selectFocusedItem: function (t) {
            var e = this.menuItems.eq(this.focusIndex).parent("li");
            e.hasClass("ui-state-disabled") || this._select(e.data("ui-selectmenu-item"), t)
        },
        _select: function (t, e) {
            var i = this.element[0].selectedIndex;
            this.element[0].selectedIndex = t.index, this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(t)), this._setAria(t), this._trigger("select", e, {item: t}), t.index !== i && this._trigger("change", e, {item: t}), this.close(e)
        },
        _setAria: function (t) {
            var e = this.menuItems.eq(t.index).attr("id");
            this.button.attr({
                "aria-labelledby": e,
                "aria-activedescendant": e
            }), this.menu.attr("aria-activedescendant", e)
        },
        _setOption: function (t, e) {
            if ("icons" === t) {
                var i = this.button.find("span.ui-icon");
                this._removeClass(i, null, this.options.icons.button)._addClass(i, null, e.button)
            }
            this._super(t, e), "appendTo" === t && this.menuWrap.appendTo(this._appendTo()), "width" === t && this._resizeButton()
        },
        _setOptionDisabled: function (t) {
            this._super(t), this.menuInstance.option("disabled", t), this.button.attr("aria-disabled", t), this._toggleClass(this.button, null, "ui-state-disabled", t), this.element.prop("disabled", t), t ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0)
        },
        _appendTo: function () {
            var e = this.options.appendTo;
            return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e && e[0] || (e = this.element.closest(".ui-front, dialog")), e.length || (e = this.document[0].body), e
        },
        _toggleAttr: function () {
            this.button.attr("aria-expanded", this.isOpen), this._removeClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open"))._addClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed"))._toggleClass(this.menuWrap, "ui-selectmenu-open", null, this.isOpen), this.menu.attr("aria-hidden", !this.isOpen)
        },
        _resizeButton: function () {
            var t = this.options.width;
            return t === !1 ? (this.button.css("width", ""), void 0) : (null === t && (t = this.element.show().outerWidth(), this.element.hide()), this.button.outerWidth(t), void 0)
        },
        _resizeMenu: function () {
            this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
        },
        _getCreateOptions: function () {
            var t = this._super();
            return t.disabled = this.element.prop("disabled"), t
        },
        _parseOptions: function (e) {
            var i = this, s = [];
            e.each(function (e, n) {
                s.push(i._parseOption(t(n), e))
            }), this.items = s
        },
        _parseOption: function (t, e) {
            var i = t.parent("optgroup");
            return {
                element: t,
                index: e,
                value: t.val(),
                label: t.text(),
                optgroup: i.attr("label") || "",
                disabled: i.prop("disabled") || t.prop("disabled")
            }
        },
        _destroy: function () {
            this._unbindFormResetHandler(), this.menuWrap.remove(), this.button.remove(), this.element.show(), this.element.removeUniqueId(), this.labels.attr("for", this.ids.element)
        }
    }]), t.widget("ui.slider", t.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            classes: {
                "ui-slider": "ui-corner-all",
                "ui-slider-handle": "ui-corner-all",
                "ui-slider-range": "ui-corner-all ui-widget-header"
            },
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        numPages: 5,
        _create: function () {
            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"), this._refresh(), this._animateOff = !1
        },
        _refresh: function () {
            this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
        },
        _createHandles: function () {
            var e, i, s = this.options, n = this.element.find(".ui-slider-handle"), o = "<span tabindex='0'></span>",
                a = [];
            for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), e = n.length; i > e; e++) a.push(o);
            this.handles = n.add(t(a.join("")).appendTo(this.element)), this._addClass(this.handles, "ui-slider-handle", "ui-state-default"), this.handle = this.handles.eq(0), this.handles.each(function (e) {
                t(this).data("ui-slider-handle-index", e).attr("tabIndex", 0)
            })
        },
        _createRange: function () {
            var e = this.options;
            e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"), this.range.css({
                left: "",
                bottom: ""
            })) : (this.range = t("<div>").appendTo(this.element), this._addClass(this.range, "ui-slider-range")), ("min" === e.range || "max" === e.range) && this._addClass(this.range, "ui-slider-range-" + e.range)) : (this.range && this.range.remove(), this.range = null)
        },
        _setupEvents: function () {
            this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)
        },
        _destroy: function () {
            this.handles.remove(), this.range && this.range.remove(), this._mouseDestroy()
        },
        _mouseCapture: function (e) {
            var i, s, n, o, a, r, l, h, c = this, u = this.options;
            return u.disabled ? !1 : (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            }, this.elementOffset = this.element.offset(), i = {
                x: e.pageX,
                y: e.pageY
            }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function (e) {
                var i = Math.abs(s - c.values(e));
                (n > i || n === i && (e === c._lastChangedValue || c.values(e) === u.min)) && (n = i, o = t(this), a = e)
            }), r = this._start(e, a), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = a, this._addClass(o, null, "ui-state-active"), o.trigger("focus"), l = o.offset(), h = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = h ? {
                left: 0,
                top: 0
            } : {
                left: e.pageX - l.left - o.width() / 2,
                top: e.pageY - l.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0)
            }, this.handles.hasClass("ui-state-hover") || this._slide(e, a, s), this._animateOff = !0, !0))
        },
        _mouseStart: function () {
            return !0
        },
        _mouseDrag: function (t) {
            var e = {x: t.pageX, y: t.pageY}, i = this._normValueFromMouse(e);
            return this._slide(t, this._handleIndex, i), !1
        },
        _mouseStop: function (t) {
            return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
        },
        _detectOrientation: function () {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (t) {
            var e, i, s, n, o;
            return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / e, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), o = this._valueMin() + s * n, this._trimAlignValue(o)
        },
        _uiHash: function (t, e, i) {
            var s = {handle: this.handles[t], handleIndex: t, value: void 0 !== e ? e : this.value()};
            return this._hasMultipleValues() && (s.value = void 0 !== e ? e : this.values(t), s.values = i || this.values()), s
        },
        _hasMultipleValues: function () {
            return this.options.values && this.options.values.length
        },
        _start: function (t, e) {
            return this._trigger("start", t, this._uiHash(e))
        },
        _slide: function (t, e, i) {
            var s, n, o = this.value(), a = this.values();
            this._hasMultipleValues() && (n = this.values(e ? 0 : 1), o = this.values(e), 2 === this.options.values.length && this.options.range === !0 && (i = 0 === e ? Math.min(n, i) : Math.max(n, i)), a[e] = i), i !== o && (s = this._trigger("slide", t, this._uiHash(e, i, a)), s !== !1 && (this._hasMultipleValues() ? this.values(e, i) : this.value(i)))
        },
        _stop: function (t, e) {
            this._trigger("stop", t, this._uiHash(e))
        },
        _change: function (t, e) {
            this._keySliding || this._mouseSliding || (this._lastChangedValue = e, this._trigger("change", t, this._uiHash(e)))
        },
        value: function (t) {
            return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), this._change(null, 0), void 0) : this._value()
        },
        values: function (e, i) {
            var s, n, o;
            if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), this._change(null, e), void 0;
            if (!arguments.length) return this._values();
            if (!t.isArray(arguments[0])) return this._hasMultipleValues() ? this._values(e) : this.value();
            for (s = this.options.values, n = arguments[0], o = 0; s.length > o; o += 1) s[o] = this._trimAlignValue(n[o]), this._change(null, o);
            this._refreshValue()
        },
        _setOption: function (e, i) {
            var s, n = 0;
            switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (n = this.options.values.length), this._super(e, i), e) {
                case"orientation":
                    this._detectOrientation(), this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation), this._refreshValue(), this.options.range && this._refreshRange(i), this.handles.css("horizontal" === i ? "bottom" : "left", "");
                    break;
                case"value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case"values":
                    for (this._animateOff = !0, this._refreshValue(), s = n - 1; s >= 0; s--) this._change(null, s);
                    this._animateOff = !1;
                    break;
                case"step":
                case"min":
                case"max":
                    this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;
                    break;
                case"range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1
            }
        },
        _setOptionDisabled: function (t) {
            this._super(t), this._toggleClass(null, "ui-state-disabled", !!t)
        },
        _value: function () {
            var t = this.options.value;
            return t = this._trimAlignValue(t)
        },
        _values: function (t) {
            var e, i, s;
            if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e);
            if (this._hasMultipleValues()) {
                for (i = this.options.values.slice(), s = 0; i.length > s; s += 1) i[s] = this._trimAlignValue(i[s]);
                return i
            }
            return []
        },
        _trimAlignValue: function (t) {
            if (this._valueMin() >= t) return this._valueMin();
            if (t >= this._valueMax()) return this._valueMax();
            var e = this.options.step > 0 ? this.options.step : 1, i = (t - this._valueMin()) % e, s = t - i;
            return 2 * Math.abs(i) >= e && (s += i > 0 ? e : -e), parseFloat(s.toFixed(5))
        },
        _calculateNewMax: function () {
            var t = this.options.max, e = this._valueMin(), i = this.options.step, s = Math.round((t - e) / i) * i;
            t = s + e, t > this.options.max && (t -= i), this.max = parseFloat(t.toFixed(this._precision()))
        },
        _precision: function () {
            var t = this._precisionOf(this.options.step);
            return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t
        },
        _precisionOf: function (t) {
            var e = "" + t, i = e.indexOf(".");
            return -1 === i ? 0 : e.length - i - 1
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.max
        },
        _refreshRange: function (t) {
            "vertical" === t && this.range.css({width: "", left: ""}), "horizontal" === t && this.range.css({
                height: "",
                bottom: ""
            })
        },
        _refreshValue: function () {
            var e, i, s, n, o, a = this.options.range, r = this.options, l = this,
                h = this._animateOff ? !1 : r.animate, c = {};
            this._hasMultipleValues() ? this.handles.each(function (s) {
                i = 100 * ((l.values(s) - l._valueMin()) / (l._valueMax() - l._valueMin())), c["horizontal" === l.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[h ? "animate" : "css"](c, r.animate), l.options.range === !0 && ("horizontal" === l.orientation ? (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({left: i + "%"}, r.animate), 1 === s && l.range[h ? "animate" : "css"]({width: i - e + "%"}, {
                    queue: !1,
                    duration: r.animate
                })) : (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({bottom: i + "%"}, r.animate), 1 === s && l.range[h ? "animate" : "css"]({height: i - e + "%"}, {
                    queue: !1,
                    duration: r.animate
                }))), e = i
            }) : (s = this.value(), n = this._valueMin(), o = this._valueMax(), i = o !== n ? 100 * ((s - n) / (o - n)) : 0, c["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[h ? "animate" : "css"](c, r.animate), "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({width: i + "%"}, r.animate), "max" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({width: 100 - i + "%"}, r.animate), "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({height: i + "%"}, r.animate), "max" === a && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({height: 100 - i + "%"}, r.animate))
        },
        _handleEvents: {
            keydown: function (e) {
                var i, s, n, o, a = t(e.target).data("ui-slider-handle-index");
                switch (e.keyCode) {
                    case t.ui.keyCode.HOME:
                    case t.ui.keyCode.END:
                    case t.ui.keyCode.PAGE_UP:
                    case t.ui.keyCode.PAGE_DOWN:
                    case t.ui.keyCode.UP:
                    case t.ui.keyCode.RIGHT:
                    case t.ui.keyCode.DOWN:
                    case t.ui.keyCode.LEFT:
                        if (e.preventDefault(), !this._keySliding && (this._keySliding = !0, this._addClass(t(e.target), null, "ui-state-active"), i = this._start(e, a), i === !1)) return
                }
                switch (o = this.options.step, s = n = this._hasMultipleValues() ? this.values(a) : this.value(), e.keyCode) {
                    case t.ui.keyCode.HOME:
                        n = this._valueMin();
                        break;
                    case t.ui.keyCode.END:
                        n = this._valueMax();
                        break;
                    case t.ui.keyCode.PAGE_UP:
                        n = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case t.ui.keyCode.PAGE_DOWN:
                        n = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / this.numPages);
                        break;
                    case t.ui.keyCode.UP:
                    case t.ui.keyCode.RIGHT:
                        if (s === this._valueMax()) return;
                        n = this._trimAlignValue(s + o);
                        break;
                    case t.ui.keyCode.DOWN:
                    case t.ui.keyCode.LEFT:
                        if (s === this._valueMin()) return;
                        n = this._trimAlignValue(s - o)
                }
                this._slide(e, a, n)
            }, keyup: function (e) {
                var i = t(e.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), this._removeClass(t(e.target), null, "ui-state-active"))
            }
        }
    });
    var p = "ui-effects-", f = "ui-effects-style", g = "ui-effects-animated", m = t;
    t.effects = {effect: {}}, function (t, e) {
        function i(t, e, i) {
            var s = u[e.type] || {};
            return null == t ? i || !e.def ? null : e.def : (t = s.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : s.mod ? (t + s.mod) % s.mod : 0 > t ? 0 : t > s.max ? s.max : t)
        }

        function s(i) {
            var s = h(), n = s._rgba = [];
            return i = i.toLowerCase(), f(l, function (t, o) {
                var a, r = o.re.exec(i), l = r && o.parse(r), h = o.space || "rgba";
                return l ? (a = s[h](l), s[c[h].cache] = a[c[h].cache], n = s._rgba = a._rgba, !1) : e
            }), n.length ? ("0,0,0,0" === n.join() && t.extend(n, o.transparent), s) : o[i]
        }

        function n(t, e, i) {
            return i = (i + 1) % 1, 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + 6 * (e - t) * (2 / 3 - i) : t
        }

        var o,
            a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
            r = /^([\-+])=\s*(\d+\.?\d*)/, l = [{
                re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function (t) {
                    return [t[1], t[2], t[3], t[4]]
                }
            }, {
                re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function (t) {
                    return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
                }
            }, {
                re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function (t) {
                    return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
                }
            }, {
                re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function (t) {
                    return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
                }
            }, {
                re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                space: "hsla",
                parse: function (t) {
                    return [t[1], t[2] / 100, t[3] / 100, t[4]]
                }
            }], h = t.Color = function (e, i, s, n) {
                return new t.Color.fn.parse(e, i, s, n)
            }, c = {
                rgba: {
                    props: {
                        red: {idx: 0, type: "byte"},
                        green: {idx: 1, type: "byte"},
                        blue: {idx: 2, type: "byte"}
                    }
                },
                hsla: {
                    props: {
                        hue: {idx: 0, type: "degrees"},
                        saturation: {idx: 1, type: "percent"},
                        lightness: {idx: 2, type: "percent"}
                    }
                }
            }, u = {"byte": {floor: !0, max: 255}, percent: {max: 1}, degrees: {mod: 360, floor: !0}}, d = h.support = {},
            p = t("<p>")[0], f = t.each;
        p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(c, function (t, e) {
            e.cache = "_" + t, e.props.alpha = {idx: 3, type: "percent", def: 1}
        }), h.fn = t.extend(h.prototype, {
            parse: function (n, a, r, l) {
                if (n === e) return this._rgba = [null, null, null, null], this;
                (n.jquery || n.nodeType) && (n = t(n).css(a), a = e);
                var u = this, d = t.type(n), p = this._rgba = [];
                return a !== e && (n = [n, a, r, l], d = "array"), "string" === d ? this.parse(s(n) || o._default) : "array" === d ? (f(c.rgba.props, function (t, e) {
                    p[e.idx] = i(n[e.idx], e)
                }), this) : "object" === d ? (n instanceof h ? f(c, function (t, e) {
                    n[e.cache] && (u[e.cache] = n[e.cache].slice())
                }) : f(c, function (e, s) {
                    var o = s.cache;
                    f(s.props, function (t, e) {
                        if (!u[o] && s.to) {
                            if ("alpha" === t || null == n[t]) return;
                            u[o] = s.to(u._rgba)
                        }
                        u[o][e.idx] = i(n[t], e, !0)
                    }), u[o] && 0 > t.inArray(null, u[o].slice(0, 3)) && (u[o][3] = 1, s.from && (u._rgba = s.from(u[o])))
                }), this) : e
            }, is: function (t) {
                var i = h(t), s = !0, n = this;
                return f(c, function (t, o) {
                    var a, r = i[o.cache];
                    return r && (a = n[o.cache] || o.to && o.to(n._rgba) || [], f(o.props, function (t, i) {
                        return null != r[i.idx] ? s = r[i.idx] === a[i.idx] : e
                    })), s
                }), s
            }, _space: function () {
                var t = [], e = this;
                return f(c, function (i, s) {
                    e[s.cache] && t.push(i)
                }), t.pop()
            }, transition: function (t, e) {
                var s = h(t), n = s._space(), o = c[n], a = 0 === this.alpha() ? h("transparent") : this,
                    r = a[o.cache] || o.to(a._rgba), l = r.slice();
                return s = s[o.cache], f(o.props, function (t, n) {
                    var o = n.idx, a = r[o], h = s[o], c = u[n.type] || {};
                    null !== h && (null === a ? l[o] = h : (c.mod && (h - a > c.mod / 2 ? a += c.mod : a - h > c.mod / 2 && (a -= c.mod)), l[o] = i((h - a) * e + a, n)))
                }), this[n](l)
            }, blend: function (e) {
                if (1 === this._rgba[3]) return this;
                var i = this._rgba.slice(), s = i.pop(), n = h(e)._rgba;
                return h(t.map(i, function (t, e) {
                    return (1 - s) * n[e] + s * t
                }))
            }, toRgbaString: function () {
                var e = "rgba(", i = t.map(this._rgba, function (t, e) {
                    return null == t ? e > 2 ? 1 : 0 : t
                });
                return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
            }, toHslaString: function () {
                var e = "hsla(", i = t.map(this.hsla(), function (t, e) {
                    return null == t && (t = e > 2 ? 1 : 0), e && 3 > e && (t = Math.round(100 * t) + "%"), t
                });
                return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
            }, toHexString: function (e) {
                var i = this._rgba.slice(), s = i.pop();
                return e && i.push(~~(255 * s)), "#" + t.map(i, function (t) {
                    return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t
                }).join("")
            }, toString: function () {
                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
            }
        }), h.fn.parse.prototype = h.fn, c.hsla.to = function (t) {
            if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
            var e, i, s = t[0] / 255, n = t[1] / 255, o = t[2] / 255, a = t[3], r = Math.max(s, n, o),
                l = Math.min(s, n, o), h = r - l, c = r + l, u = .5 * c;
            return e = l === r ? 0 : s === r ? 60 * (n - o) / h + 360 : n === r ? 60 * (o - s) / h + 120 : 60 * (s - n) / h + 240, i = 0 === h ? 0 : .5 >= u ? h / c : h / (2 - c), [Math.round(e) % 360, i, u, null == a ? 1 : a]
        }, c.hsla.from = function (t) {
            if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
            var e = t[0] / 360, i = t[1], s = t[2], o = t[3], a = .5 >= s ? s * (1 + i) : s + i - s * i, r = 2 * s - a;
            return [Math.round(255 * n(r, a, e + 1 / 3)), Math.round(255 * n(r, a, e)), Math.round(255 * n(r, a, e - 1 / 3)), o]
        }, f(c, function (s, n) {
            var o = n.props, a = n.cache, l = n.to, c = n.from;
            h.fn[s] = function (s) {
                if (l && !this[a] && (this[a] = l(this._rgba)), s === e) return this[a].slice();
                var n, r = t.type(s), u = "array" === r || "object" === r ? s : arguments, d = this[a].slice();
                return f(o, function (t, e) {
                    var s = u["object" === r ? t : e.idx];
                    null == s && (s = d[e.idx]), d[e.idx] = i(s, e)
                }), c ? (n = h(c(d)), n[a] = d, n) : h(d)
            }, f(o, function (e, i) {
                h.fn[e] || (h.fn[e] = function (n) {
                    var o, a = t.type(n), l = "alpha" === e ? this._hsla ? "hsla" : "rgba" : s, h = this[l](),
                        c = h[i.idx];
                    return "undefined" === a ? c : ("function" === a && (n = n.call(this, c), a = t.type(n)), null == n && i.empty ? this : ("string" === a && (o = r.exec(n), o && (n = c + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1))), h[i.idx] = n, this[l](h)))
                })
            })
        }), h.hook = function (e) {
            var i = e.split(" ");
            f(i, function (e, i) {
                t.cssHooks[i] = {
                    set: function (e, n) {
                        var o, a, r = "";
                        if ("transparent" !== n && ("string" !== t.type(n) || (o = s(n)))) {
                            if (n = h(o || n), !d.rgba && 1 !== n._rgba[3]) {
                                for (a = "backgroundColor" === i ? e.parentNode : e; ("" === r || "transparent" === r) && a && a.style;) try {
                                    r = t.css(a, "backgroundColor"), a = a.parentNode
                                } catch (l) {
                                }
                                n = n.blend(r && "transparent" !== r ? r : "_default")
                            }
                            n = n.toRgbaString()
                        }
                        try {
                            e.style[i] = n
                        } catch (l) {
                        }
                    }
                }, t.fx.step[i] = function (e) {
                    e.colorInit || (e.start = h(e.elem, i), e.end = h(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                }
            })
        }, h.hook(a), t.cssHooks.borderColor = {
            expand: function (t) {
                var e = {};
                return f(["Top", "Right", "Bottom", "Left"], function (i, s) {
                    e["border" + s + "Color"] = t
                }), e
            }
        }, o = t.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    }(m), function () {
        function e(e) {
            var i, s,
                n = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
                o = {};
            if (n && n.length && n[0] && n[n[0]]) for (s = n.length; s--;) i = n[s], "string" == typeof n[i] && (o[t.camelCase(i)] = n[i]); else for (i in n) "string" == typeof n[i] && (o[i] = n[i]);
            return o
        }

        function i(e, i) {
            var s, o, a = {};
            for (s in i) o = i[s], e[s] !== o && (n[s] || (t.fx.step[s] || !isNaN(parseFloat(o))) && (a[s] = o));
            return a
        }

        var s = ["add", "remove", "toggle"], n = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
        t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (e, i) {
            t.fx.step[i] = function (t) {
                ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (m.style(t.elem, i, t.end), t.setAttr = !0)
            }
        }), t.fn.addBack || (t.fn.addBack = function (t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }), t.effects.animateClass = function (n, o, a, r) {
            var l = t.speed(o, a, r);
            return this.queue(function () {
                var o, a = t(this), r = a.attr("class") || "", h = l.children ? a.find("*").addBack() : a;
                h = h.map(function () {
                    var i = t(this);
                    return {el: i, start: e(this)}
                }), o = function () {
                    t.each(s, function (t, e) {
                        n[e] && a[e + "Class"](n[e])
                    })
                }, o(), h = h.map(function () {
                    return this.end = e(this.el[0]), this.diff = i(this.start, this.end), this
                }), a.attr("class", r), h = h.map(function () {
                    var e = this, i = t.Deferred(), s = t.extend({}, l, {
                        queue: !1, complete: function () {
                            i.resolve(e)
                        }
                    });
                    return this.el.animate(this.diff, s), i.promise()
                }), t.when.apply(t, h.get()).done(function () {
                    o(), t.each(arguments, function () {
                        var e = this.el;
                        t.each(this.diff, function (t) {
                            e.css(t, "")
                        })
                    }), l.complete.call(a[0])
                })
            })
        }, t.fn.extend({
            addClass: function (e) {
                return function (i, s, n, o) {
                    return s ? t.effects.animateClass.call(this, {add: i}, s, n, o) : e.apply(this, arguments)
                }
            }(t.fn.addClass), removeClass: function (e) {
                return function (i, s, n, o) {
                    return arguments.length > 1 ? t.effects.animateClass.call(this, {remove: i}, s, n, o) : e.apply(this, arguments)
                }
            }(t.fn.removeClass), toggleClass: function (e) {
                return function (i, s, n, o, a) {
                    return "boolean" == typeof s || void 0 === s ? n ? t.effects.animateClass.call(this, s ? {add: i} : {remove: i}, n, o, a) : e.apply(this, arguments) : t.effects.animateClass.call(this, {toggle: i}, s, n, o)
                }
            }(t.fn.toggleClass), switchClass: function (e, i, s, n, o) {
                return t.effects.animateClass.call(this, {add: i, remove: e}, s, n, o)
            }
        })
    }(), function () {
        function e(e, i, s, n) {
            return t.isPlainObject(e) && (i = e, e = e.effect), e = {effect: e}, null == i && (i = {}), t.isFunction(i) && (n = i, s = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (n = s, s = i, i = {}), t.isFunction(s) && (n = s, s = null), i && t.extend(e, i), s = s || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof s ? s : s in t.fx.speeds ? t.fx.speeds[s] : t.fx.speeds._default, e.complete = n || i.complete, e
        }

        function i(e) {
            return !e || "number" == typeof e || t.fx.speeds[e] ? !0 : "string" != typeof e || t.effects.effect[e] ? t.isFunction(e) ? !0 : "object" != typeof e || e.effect ? !1 : !0 : !0
        }

        function s(t, e) {
            var i = e.outerWidth(), s = e.outerHeight(),
                n = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,
                o = n.exec(t) || ["", 0, i, s, 0];
            return {
                top: parseFloat(o[1]) || 0,
                right: "auto" === o[2] ? i : parseFloat(o[2]),
                bottom: "auto" === o[3] ? s : parseFloat(o[3]),
                left: parseFloat(o[4]) || 0
            }
        }

        t.expr && t.expr.filters && t.expr.filters.animated && (t.expr.filters.animated = function (e) {
            return function (i) {
                return !!t(i).data(g) || e(i)
            }
        }(t.expr.filters.animated)), t.uiBackCompat !== !1 && t.extend(t.effects, {
            save: function (t, e) {
                for (var i = 0, s = e.length; s > i; i++) null !== e[i] && t.data(p + e[i], t[0].style[e[i]])
            }, restore: function (t, e) {
                for (var i, s = 0, n = e.length; n > s; s++) null !== e[s] && (i = t.data(p + e[s]), t.css(e[s], i))
            }, setMode: function (t, e) {
                return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
            }, createWrapper: function (e) {
                if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                var i = {width: e.outerWidth(!0), height: e.outerHeight(!0), "float": e.css("float")},
                    s = t("<div></div>").addClass("ui-effects-wrapper").css({
                        fontSize: "100%",
                        background: "transparent",
                        border: "none",
                        margin: 0,
                        padding: 0
                    }), n = {width: e.width(), height: e.height()}, o = document.activeElement;
                try {
                    o.id
                } catch (a) {
                    o = document.body
                }
                return e.wrap(s), (e[0] === o || t.contains(e[0], o)) && t(o).trigger("focus"), s = e.parent(), "static" === e.css("position") ? (s.css({position: "relative"}), e.css({position: "relative"})) : (t.extend(i, {
                    position: e.css("position"),
                    zIndex: e.css("z-index")
                }), t.each(["top", "left", "bottom", "right"], function (t, s) {
                    i[s] = e.css(s), isNaN(parseInt(i[s], 10)) && (i[s] = "auto")
                }), e.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })), e.css(n), s.css(i).show()
            }, removeWrapper: function (e) {
                var i = document.activeElement;
                return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).trigger("focus")), e
            }
        }), t.extend(t.effects, {
            version: "1.12.1", define: function (e, i, s) {
                return s || (s = i, i = "effect"), t.effects.effect[e] = s, t.effects.effect[e].mode = i, s
            }, scaledDimensions: function (t, e, i) {
                if (0 === e) return {height: 0, width: 0, outerHeight: 0, outerWidth: 0};
                var s = "horizontal" !== i ? (e || 100) / 100 : 1, n = "vertical" !== i ? (e || 100) / 100 : 1;
                return {
                    height: t.height() * n,
                    width: t.width() * s,
                    outerHeight: t.outerHeight() * n,
                    outerWidth: t.outerWidth() * s
                }
            }, clipToBox: function (t) {
                return {
                    width: t.clip.right - t.clip.left,
                    height: t.clip.bottom - t.clip.top,
                    left: t.clip.left,
                    top: t.clip.top
                }
            }, unshift: function (t, e, i) {
                var s = t.queue();
                e > 1 && s.splice.apply(s, [1, 0].concat(s.splice(e, i))), t.dequeue()
            }, saveStyle: function (t) {
                t.data(f, t[0].style.cssText)
            }, restoreStyle: function (t) {
                t[0].style.cssText = t.data(f) || "", t.removeData(f)
            }, mode: function (t, e) {
                var i = t.is(":hidden");
                return "toggle" === e && (e = i ? "show" : "hide"), (i ? "hide" === e : "show" === e) && (e = "none"), e
            }, getBaseline: function (t, e) {
                var i, s;
                switch (t[0]) {
                    case"top":
                        i = 0;
                        break;
                    case"middle":
                        i = .5;
                        break;
                    case"bottom":
                        i = 1;
                        break;
                    default:
                        i = t[0] / e.height
                }
                switch (t[1]) {
                    case"left":
                        s = 0;
                        break;
                    case"center":
                        s = .5;
                        break;
                    case"right":
                        s = 1;
                        break;
                    default:
                        s = t[1] / e.width
                }
                return {x: s, y: i}
            }, createPlaceholder: function (e) {
                var i, s = e.css("position"), n = e.position();
                return e.css({
                    marginTop: e.css("marginTop"),
                    marginBottom: e.css("marginBottom"),
                    marginLeft: e.css("marginLeft"),
                    marginRight: e.css("marginRight")
                }).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()), /^(static|relative)/.test(s) && (s = "absolute", i = t("<" + e[0].nodeName + ">").insertAfter(e).css({
                    display: /^(inline|ruby)/.test(e.css("display")) ? "inline-block" : "block",
                    visibility: "hidden",
                    marginTop: e.css("marginTop"),
                    marginBottom: e.css("marginBottom"),
                    marginLeft: e.css("marginLeft"),
                    marginRight: e.css("marginRight"),
                    "float": e.css("float")
                }).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).addClass("ui-effects-placeholder"), e.data(p + "placeholder", i)), e.css({
                    position: s,
                    left: n.left,
                    top: n.top
                }), i
            }, removePlaceholder: function (t) {
                var e = p + "placeholder", i = t.data(e);
                i && (i.remove(), t.removeData(e))
            }, cleanUp: function (e) {
                t.effects.restoreStyle(e), t.effects.removePlaceholder(e)
            }, setTransition: function (e, i, s, n) {
                return n = n || {}, t.each(i, function (t, i) {
                    var o = e.cssUnit(i);
                    o[0] > 0 && (n[i] = o[0] * s + o[1])
                }), n
            }
        }), t.fn.extend({
            effect: function () {
                function i(e) {
                    function i() {
                        r.removeData(g), t.effects.cleanUp(r), "hide" === s.mode && r.hide(), a()
                    }

                    function a() {
                        t.isFunction(l) && l.call(r[0]), t.isFunction(e) && e()
                    }

                    var r = t(this);
                    s.mode = c.shift(), t.uiBackCompat === !1 || o ? "none" === s.mode ? (r[h](), a()) : n.call(r[0], s, i) : (r.is(":hidden") ? "hide" === h : "show" === h) ? (r[h](), a()) : n.call(r[0], s, a)
                }

                var s = e.apply(this, arguments), n = t.effects.effect[s.effect], o = n.mode, a = s.queue,
                    r = a || "fx", l = s.complete, h = s.mode, c = [], u = function (e) {
                        var i = t(this), s = t.effects.mode(i, h) || o;
                        i.data(g, !0), c.push(s), o && ("show" === s || s === o && "hide" === s) && i.show(), o && "none" === s || t.effects.saveStyle(i), t.isFunction(e) && e()
                    };
                return t.fx.off || !n ? h ? this[h](s.duration, l) : this.each(function () {
                    l && l.call(this)
                }) : a === !1 ? this.each(u).each(i) : this.queue(r, u).queue(r, i)
            }, show: function (t) {
                return function (s) {
                    if (i(s)) return t.apply(this, arguments);
                    var n = e.apply(this, arguments);
                    return n.mode = "show", this.effect.call(this, n)
                }
            }(t.fn.show), hide: function (t) {
                return function (s) {
                    if (i(s)) return t.apply(this, arguments);
                    var n = e.apply(this, arguments);
                    return n.mode = "hide", this.effect.call(this, n)
                }
            }(t.fn.hide), toggle: function (t) {
                return function (s) {
                    if (i(s) || "boolean" == typeof s) return t.apply(this, arguments);
                    var n = e.apply(this, arguments);
                    return n.mode = "toggle", this.effect.call(this, n)
                }
            }(t.fn.toggle), cssUnit: function (e) {
                var i = this.css(e), s = [];
                return t.each(["em", "px", "%", "pt"], function (t, e) {
                    i.indexOf(e) > 0 && (s = [parseFloat(i), e])
                }), s
            }, cssClip: function (t) {
                return t ? this.css("clip", "rect(" + t.top + "px " + t.right + "px " + t.bottom + "px " + t.left + "px)") : s(this.css("clip"), this)
            }, transfer: function (e, i) {
                var s = t(this), n = t(e.to), o = "fixed" === n.css("position"), a = t("body"),
                    r = o ? a.scrollTop() : 0, l = o ? a.scrollLeft() : 0, h = n.offset(),
                    c = {top: h.top - r, left: h.left - l, height: n.innerHeight(), width: n.innerWidth()},
                    u = s.offset(),
                    d = t("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(e.className).css({
                        top: u.top - r,
                        left: u.left - l,
                        height: s.innerHeight(),
                        width: s.innerWidth(),
                        position: o ? "fixed" : "absolute"
                    }).animate(c, e.duration, e.easing, function () {
                        d.remove(), t.isFunction(i) && i()
                    })
            }
        }), t.fx.step.clip = function (e) {
            e.clipInit || (e.start = t(e.elem).cssClip(), "string" == typeof e.end && (e.end = s(e.end, e.elem)), e.clipInit = !0), t(e.elem).cssClip({
                top: e.pos * (e.end.top - e.start.top) + e.start.top,
                right: e.pos * (e.end.right - e.start.right) + e.start.right,
                bottom: e.pos * (e.end.bottom - e.start.bottom) + e.start.bottom,
                left: e.pos * (e.end.left - e.start.left) + e.start.left
            })
        }
    }(), function () {
        var e = {};
        t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (t, i) {
            e[i] = function (e) {
                return Math.pow(e, t + 2)
            }
        }), t.extend(e, {
            Sine: function (t) {
                return 1 - Math.cos(t * Math.PI / 2)
            }, Circ: function (t) {
                return 1 - Math.sqrt(1 - t * t)
            }, Elastic: function (t) {
                return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
            }, Back: function (t) {
                return t * t * (3 * t - 2)
            }, Bounce: function (t) {
                for (var e, i = 4; ((e = Math.pow(2, --i)) - 1) / 11 > t;) ;
                return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
            }
        }), t.each(e, function (e, i) {
            t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function (t) {
                return 1 - i(1 - t)
            }, t.easing["easeInOut" + e] = function (t) {
                return .5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2
            }
        })
    }();
    var _ = t.effects;
    t.effects.define("blind", "hide", function (e, i) {
        var s = {
                up: ["bottom", "top"],
                vertical: ["bottom", "top"],
                down: ["top", "bottom"],
                left: ["right", "left"],
                horizontal: ["right", "left"],
                right: ["left", "right"]
            }, n = t(this), o = e.direction || "up", a = n.cssClip(), r = {clip: t.extend({}, a)},
            l = t.effects.createPlaceholder(n);
        r.clip[s[o][0]] = r.clip[s[o][1]], "show" === e.mode && (n.cssClip(r.clip), l && l.css(t.effects.clipToBox(r)), r.clip = a), l && l.animate(t.effects.clipToBox(r), e.duration, e.easing), n.animate(r, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: i
        })
    }), t.effects.define("bounce", function (e, i) {
        var s, n, o, a = t(this), r = e.mode, l = "hide" === r, h = "show" === r, c = e.direction || "up",
            u = e.distance, d = e.times || 5, p = 2 * d + (h || l ? 1 : 0), f = e.duration / p, g = e.easing,
            m = "up" === c || "down" === c ? "top" : "left", _ = "up" === c || "left" === c, v = 0,
            b = a.queue().length;
        for (t.effects.createPlaceholder(a), o = a.css(m), u || (u = a["top" === m ? "outerHeight" : "outerWidth"]() / 3), h && (n = {opacity: 1}, n[m] = o, a.css("opacity", 0).css(m, _ ? 2 * -u : 2 * u).animate(n, f, g)), l && (u /= Math.pow(2, d - 1)), n = {}, n[m] = o; d > v; v++) s = {}, s[m] = (_ ? "-=" : "+=") + u, a.animate(s, f, g).animate(n, f, g), u = l ? 2 * u : u / 2;
        l && (s = {opacity: 0}, s[m] = (_ ? "-=" : "+=") + u, a.animate(s, f, g)), a.queue(i), t.effects.unshift(a, b, p + 1)
    }), t.effects.define("clip", "hide", function (e, i) {
        var s, n = {}, o = t(this), a = e.direction || "vertical", r = "both" === a, l = r || "horizontal" === a,
            h = r || "vertical" === a;
        s = o.cssClip(), n.clip = {
            top: h ? (s.bottom - s.top) / 2 : s.top,
            right: l ? (s.right - s.left) / 2 : s.right,
            bottom: h ? (s.bottom - s.top) / 2 : s.bottom,
            left: l ? (s.right - s.left) / 2 : s.left
        }, t.effects.createPlaceholder(o), "show" === e.mode && (o.cssClip(n.clip), n.clip = s), o.animate(n, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: i
        })
    }), t.effects.define("drop", "hide", function (e, i) {
        var s, n = t(this), o = e.mode, a = "show" === o, r = e.direction || "left",
            l = "up" === r || "down" === r ? "top" : "left", h = "up" === r || "left" === r ? "-=" : "+=",
            c = "+=" === h ? "-=" : "+=", u = {opacity: 0};
        t.effects.createPlaceholder(n), s = e.distance || n["top" === l ? "outerHeight" : "outerWidth"](!0) / 2, u[l] = h + s, a && (n.css(u), u[l] = c + s, u.opacity = 1), n.animate(u, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: i
        })
    }), t.effects.define("explode", "hide", function (e, i) {
        function s() {
            b.push(this), b.length === u * d && n()
        }

        function n() {
            p.css({visibility: "visible"}), t(b).remove(), i()
        }

        var o, a, r, l, h, c, u = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3, d = u, p = t(this), f = e.mode,
            g = "show" === f, m = p.show().css("visibility", "hidden").offset(), _ = Math.ceil(p.outerWidth() / d),
            v = Math.ceil(p.outerHeight() / u), b = [];
        for (o = 0; u > o; o++) for (l = m.top + o * v, c = o - (u - 1) / 2, a = 0; d > a; a++) r = m.left + a * _, h = a - (d - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({
            position: "absolute",
            visibility: "visible",
            left: -a * _,
            top: -o * v
        }).parent().addClass("ui-effects-explode").css({
            position: "absolute",
            overflow: "hidden",
            width: _,
            height: v,
            left: r + (g ? h * _ : 0),
            top: l + (g ? c * v : 0),
            opacity: g ? 0 : 1
        }).animate({
            left: r + (g ? 0 : h * _),
            top: l + (g ? 0 : c * v),
            opacity: g ? 1 : 0
        }, e.duration || 500, e.easing, s)
    }), t.effects.define("fade", "toggle", function (e, i) {
        var s = "show" === e.mode;
        t(this).css("opacity", s ? 0 : 1).animate({opacity: s ? 1 : 0}, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: i
        })
    }), t.effects.define("fold", "hide", function (e, i) {
        var s = t(this), n = e.mode, o = "show" === n, a = "hide" === n, r = e.size || 15, l = /([0-9]+)%/.exec(r),
            h = !!e.horizFirst, c = h ? ["right", "bottom"] : ["bottom", "right"], u = e.duration / 2,
            d = t.effects.createPlaceholder(s), p = s.cssClip(), f = {clip: t.extend({}, p)},
            g = {clip: t.extend({}, p)}, m = [p[c[0]], p[c[1]]], _ = s.queue().length;
        l && (r = parseInt(l[1], 10) / 100 * m[a ? 0 : 1]), f.clip[c[0]] = r, g.clip[c[0]] = r, g.clip[c[1]] = 0, o && (s.cssClip(g.clip), d && d.css(t.effects.clipToBox(g)), g.clip = p), s.queue(function (i) {
            d && d.animate(t.effects.clipToBox(f), u, e.easing).animate(t.effects.clipToBox(g), u, e.easing), i()
        }).animate(f, u, e.easing).animate(g, u, e.easing).queue(i), t.effects.unshift(s, _, 4)
    }), t.effects.define("highlight", "show", function (e, i) {
        var s = t(this), n = {backgroundColor: s.css("backgroundColor")};
        "hide" === e.mode && (n.opacity = 0), t.effects.saveStyle(s), s.css({
            backgroundImage: "none",
            backgroundColor: e.color || "#ffff99"
        }).animate(n, {queue: !1, duration: e.duration, easing: e.easing, complete: i})
    }), t.effects.define("size", function (e, i) {
        var s, n, o, a = t(this), r = ["fontSize"],
            l = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
            h = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], c = e.mode, u = "effect" !== c,
            d = e.scale || "both", p = e.origin || ["middle", "center"], f = a.css("position"), g = a.position(),
            m = t.effects.scaledDimensions(a), _ = e.from || m, v = e.to || t.effects.scaledDimensions(a, 0);
        t.effects.createPlaceholder(a), "show" === c && (o = _, _ = v, v = o), n = {
            from: {
                y: _.height / m.height,
                x: _.width / m.width
            }, to: {y: v.height / m.height, x: v.width / m.width}
        }, ("box" === d || "both" === d) && (n.from.y !== n.to.y && (_ = t.effects.setTransition(a, l, n.from.y, _), v = t.effects.setTransition(a, l, n.to.y, v)), n.from.x !== n.to.x && (_ = t.effects.setTransition(a, h, n.from.x, _), v = t.effects.setTransition(a, h, n.to.x, v))), ("content" === d || "both" === d) && n.from.y !== n.to.y && (_ = t.effects.setTransition(a, r, n.from.y, _), v = t.effects.setTransition(a, r, n.to.y, v)), p && (s = t.effects.getBaseline(p, m), _.top = (m.outerHeight - _.outerHeight) * s.y + g.top, _.left = (m.outerWidth - _.outerWidth) * s.x + g.left, v.top = (m.outerHeight - v.outerHeight) * s.y + g.top, v.left = (m.outerWidth - v.outerWidth) * s.x + g.left), a.css(_), ("content" === d || "both" === d) && (l = l.concat(["marginTop", "marginBottom"]).concat(r), h = h.concat(["marginLeft", "marginRight"]), a.find("*[width]").each(function () {
            var i = t(this), s = t.effects.scaledDimensions(i), o = {
                height: s.height * n.from.y,
                width: s.width * n.from.x,
                outerHeight: s.outerHeight * n.from.y,
                outerWidth: s.outerWidth * n.from.x
            }, a = {
                height: s.height * n.to.y,
                width: s.width * n.to.x,
                outerHeight: s.height * n.to.y,
                outerWidth: s.width * n.to.x
            };
            n.from.y !== n.to.y && (o = t.effects.setTransition(i, l, n.from.y, o), a = t.effects.setTransition(i, l, n.to.y, a)), n.from.x !== n.to.x && (o = t.effects.setTransition(i, h, n.from.x, o), a = t.effects.setTransition(i, h, n.to.x, a)), u && t.effects.saveStyle(i), i.css(o), i.animate(a, e.duration, e.easing, function () {
                u && t.effects.restoreStyle(i)
            })
        })), a.animate(v, {
            queue: !1, duration: e.duration, easing: e.easing, complete: function () {
                var e = a.offset();
                0 === v.opacity && a.css("opacity", _.opacity), u || (a.css("position", "static" === f ? "relative" : f).offset(e), t.effects.saveStyle(a)), i()
            }
        })
    }), t.effects.define("scale", function (e, i) {
        var s = t(this), n = e.mode,
            o = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "effect" !== n ? 0 : 100),
            a = t.extend(!0, {
                from: t.effects.scaledDimensions(s),
                to: t.effects.scaledDimensions(s, o, e.direction || "both"),
                origin: e.origin || ["middle", "center"]
            }, e);
        e.fade && (a.from.opacity = 1, a.to.opacity = 0), t.effects.effect.size.call(this, a, i)
    }), t.effects.define("puff", "hide", function (e, i) {
        var s = t.extend(!0, {}, e, {fade: !0, percent: parseInt(e.percent, 10) || 150});
        t.effects.effect.scale.call(this, s, i)
    }), t.effects.define("pulsate", "show", function (e, i) {
        var s = t(this), n = e.mode, o = "show" === n, a = "hide" === n, r = o || a,
            l = 2 * (e.times || 5) + (r ? 1 : 0), h = e.duration / l, c = 0, u = 1, d = s.queue().length;
        for ((o || !s.is(":visible")) && (s.css("opacity", 0).show(), c = 1); l > u; u++) s.animate({opacity: c}, h, e.easing), c = 1 - c;
        s.animate({opacity: c}, h, e.easing), s.queue(i), t.effects.unshift(s, d, l + 1)
    }), t.effects.define("shake", function (e, i) {
        var s = 1, n = t(this), o = e.direction || "left", a = e.distance || 20, r = e.times || 3, l = 2 * r + 1,
            h = Math.round(e.duration / l), c = "up" === o || "down" === o ? "top" : "left",
            u = "up" === o || "left" === o, d = {}, p = {}, f = {}, g = n.queue().length;
        for (t.effects.createPlaceholder(n), d[c] = (u ? "-=" : "+=") + a, p[c] = (u ? "+=" : "-=") + 2 * a, f[c] = (u ? "-=" : "+=") + 2 * a, n.animate(d, h, e.easing); r > s; s++) n.animate(p, h, e.easing).animate(f, h, e.easing);
        n.animate(p, h, e.easing).animate(d, h / 2, e.easing).queue(i), t.effects.unshift(n, g, l + 1)
    }), t.effects.define("slide", "show", function (e, i) {
        var s, n, o = t(this),
            a = {up: ["bottom", "top"], down: ["top", "bottom"], left: ["right", "left"], right: ["left", "right"]},
            r = e.mode, l = e.direction || "left", h = "up" === l || "down" === l ? "top" : "left",
            c = "up" === l || "left" === l, u = e.distance || o["top" === h ? "outerHeight" : "outerWidth"](!0), d = {};
        t.effects.createPlaceholder(o), s = o.cssClip(), n = o.position()[h], d[h] = (c ? -1 : 1) * u + n, d.clip = o.cssClip(), d.clip[a[l][1]] = d.clip[a[l][0]], "show" === r && (o.cssClip(d.clip), o.css(h, d[h]), d.clip = s, d[h] = n), o.animate(d, {
            queue: !1,
            duration: e.duration,
            easing: e.easing,
            complete: i
        })
    });
    var _;
    t.uiBackCompat !== !1 && (_ = t.effects.define("transfer", function (e, i) {
        t(this).transfer(e, i)
    }))
});

/* qtip2 v3.0.3 | Plugins: tips viewport modal | Styles: core basic css3 | qtip2.com | Licensed MIT | Thu May 12 2016 23:42:29 */

!function (a, b, c) {
    !function (a) {
        "use strict";
        "function" == typeof define && define.amd ? define('qtip', ["jquery"], a) : jQuery && !jQuery.fn.qtip && a(jQuery)
    }(function (d) {
        "use strict";

        function e(a, b, c, e) {
            this.id = c, this.target = a, this.tooltip = E, this.elements = {target: a}, this._id = R + "-" + c, this.timers = {img: {}}, this.options = b, this.plugins = {}, this.cache = {
                event: {},
                target: d(),
                disabled: D,
                attr: e,
                onTooltip: D,
                lastClass: ""
            }, this.rendered = this.destroyed = this.disabled = this.waiting = this.hiddenDuringWait = this.positioning = this.triggering = D
        }

        function f(a) {
            return a === E || "object" !== d.type(a)
        }

        function g(a) {
            return !(d.isFunction(a) || a && a.attr || a.length || "object" === d.type(a) && (a.jquery || a.then))
        }

        function h(a) {
            var b, c, e, h;
            return f(a) ? D : (f(a.metadata) && (a.metadata = {type: a.metadata}), "content" in a && (b = a.content, f(b) || b.jquery || b.done ? (c = g(b) ? D : b, b = a.content = {text: c}) : c = b.text, "ajax" in b && (e = b.ajax, h = e && e.once !== D, delete b.ajax, b.text = function (a, b) {
                var f = c || d(this).attr(b.options.content.attr) || "Loading...",
                    g = d.ajax(d.extend({}, e, {context: b})).then(e.success, E, e.error).then(function (a) {
                        return a && h && b.set("content.text", a), a
                    }, function (a, c, d) {
                        b.destroyed || 0 === a.status || b.set("content.text", c + ": " + d)
                    });
                return h ? f : (b.set("content.text", f), g)
            }), "title" in b && (d.isPlainObject(b.title) && (b.button = b.title.button, b.title = b.title.text), g(b.title || D) && (b.title = D))), "position" in a && f(a.position) && (a.position = {
                my: a.position,
                at: a.position
            }), "show" in a && f(a.show) && (a.show = a.show.jquery ? {target: a.show} : a.show === C ? {ready: C} : {event: a.show}), "hide" in a && f(a.hide) && (a.hide = a.hide.jquery ? {target: a.hide} : {event: a.hide}), "style" in a && f(a.style) && (a.style = {classes: a.style}), d.each(Q, function () {
                this.sanitize && this.sanitize(a)
            }), a)
        }

        function i(a, b) {
            for (var c, d = 0, e = a, f = b.split("."); e = e[f[d++]];) d < f.length && (c = e);
            return [c || a, f.pop()]
        }

        function j(a, b) {
            var c, d, e;
            for (c in this.checks) if (this.checks.hasOwnProperty(c)) for (d in this.checks[c]) this.checks[c].hasOwnProperty(d) && (e = new RegExp(d, "i").exec(a)) && (b.push(e), ("builtin" === c || this.plugins[c]) && this.checks[c][d].apply(this.plugins[c] || this, b))
        }

        function k(a) {
            return U.concat("").join(a ? "-" + a + " " : " ")
        }

        function l(a, b) {
            return b > 0 ? setTimeout(d.proxy(a, this), b) : void a.call(this)
        }

        function m(a) {
            this.tooltip.hasClass(_) || (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this.timers.show = l.call(this, function () {
                this.toggle(C, a)
            }, this.options.show.delay))
        }

        function n(a) {
            if (!this.tooltip.hasClass(_) && !this.destroyed) {
                var b = d(a.relatedTarget), c = b.closest(V)[0] === this.tooltip[0],
                    e = b[0] === this.options.show.target[0];
                if (clearTimeout(this.timers.show), clearTimeout(this.timers.hide), this !== b[0] && "mouse" === this.options.position.target && c || this.options.hide.fixed && /mouse(out|leave|move)/.test(a.type) && (c || e)) try {
                    a.preventDefault(), a.stopImmediatePropagation()
                } catch (f) {
                } else this.timers.hide = l.call(this, function () {
                    this.toggle(D, a)
                }, this.options.hide.delay, this)
            }
        }

        function o(a) {
            !this.tooltip.hasClass(_) && this.options.hide.inactive && (clearTimeout(this.timers.inactive), this.timers.inactive = l.call(this, function () {
                this.hide(a)
            }, this.options.hide.inactive))
        }

        function p(a) {
            this.rendered && this.tooltip[0].offsetWidth > 0 && this.reposition(a)
        }

        function q(a, c, e) {
            d(b.body).delegate(a, (c.split ? c : c.join("." + R + " ")) + "." + R, function () {
                var a = x.api[d.attr(this, T)];
                a && !a.disabled && e.apply(a, arguments)
            })
        }

        function r(a, c, f) {
            var g, i, j, k, l, m = d(b.body), n = a[0] === b ? m : a, o = a.metadata ? a.metadata(f.metadata) : E,
                p = "html5" === f.metadata.type && o ? o[f.metadata.name] : E,
                q = a.data(f.metadata.name || "qtipopts");
            try {
                q = "string" == typeof q ? d.parseJSON(q) : q
            } catch (r) {
            }
            if (k = d.extend(C, {}, x.defaults, f, "object" == typeof q ? h(q) : E, h(p || o)), i = k.position, k.id = c, "boolean" == typeof k.content.text) {
                if (j = a.attr(k.content.attr), k.content.attr === D || !j) return D;
                k.content.text = j
            }
            if (i.container.length || (i.container = m), i.target === D && (i.target = n), k.show.target === D && (k.show.target = n), k.show.solo === C && (k.show.solo = i.container.closest("body")), k.hide.target === D && (k.hide.target = n), k.position.viewport === C && (k.position.viewport = i.container), i.container = i.container.eq(0), i.at = new z(i.at, C), i.my = new z(i.my), a.data(R)) if (k.overwrite) a.qtip("destroy", !0); else if (k.overwrite === D) return D;
            return a.attr(S, c), k.suppress && (l = a.attr("title")) && a.removeAttr("title").attr(ba, l).attr("title", ""), g = new e(a, k, c, !!j), a.data(R, g), g
        }

        function s(a) {
            return a.charAt(0).toUpperCase() + a.slice(1)
        }

        function t(a, b) {
            var d, e, f = b.charAt(0).toUpperCase() + b.slice(1), g = (b + " " + ua.join(f + " ") + f).split(" "),
                h = 0;
            if (ta[b]) return a.css(ta[b]);
            for (; d = g[h++];) if ((e = a.css(d)) !== c) return ta[b] = d, e
        }

        function u(a, b) {
            return Math.ceil(parseFloat(t(a, b)))
        }

        function v(a, b) {
            this._ns = "tip", this.options = b, this.offset = b.offset, this.size = [b.width, b.height], this.qtip = a, this.init(a)
        }

        function w(a, b) {
            this.options = b, this._ns = "-modal", this.qtip = a, this.init(a)
        }

        var x, y, z, A, B, C = !0, D = !1, E = null, F = "x", G = "y", H = "width", I = "height", J = "top", K = "left",
            L = "bottom", M = "right", N = "center", O = "flipinvert", P = "shift", Q = {}, R = "qtip",
            S = "data-hasqtip", T = "data-qtip-id", U = ["ui-widget", "ui-tooltip"], V = "." + R,
            W = "click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "), X = R + "-fixed",
            Y = R + "-default", Z = R + "-focus", $ = R + "-hover", _ = R + "-disabled", aa = "_replacedByqTip",
            ba = "oldtitle", ca = {
                ie: function () {
                    var a, c;
                    for (a = 4, c = b.createElement("div"); (c.innerHTML = "<!--[if gt IE " + a + "]><i></i><![endif]-->") && c.getElementsByTagName("i")[0]; a += 1) ;
                    return a > 4 ? a : NaN
                }(),
                iOS: parseFloat(("" + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ""])[1]).replace("undefined", "3_2").replace("_", ".").replace("_", "")) || D
            };
        y = e.prototype, y._when = function (a) {
            return d.when.apply(d, a)
        }, y.render = function (a) {
            if (this.rendered || this.destroyed) return this;
            var b = this, c = this.options, e = this.cache, f = this.elements, g = c.content.text, h = c.content.title,
                i = c.content.button, j = c.position, k = [];
            return d.attr(this.target[0], "aria-describedby", this._id), e.posClass = this._createPosClass((this.position = {
                my: j.my,
                at: j.at
            }).my), this.tooltip = f.tooltip = d("<div/>", {
                id: this._id,
                "class": [R, Y, c.style.classes, e.posClass].join(" "),
                width: c.style.width || "",
                height: c.style.height || "",
                tracking: "mouse" === j.target && j.adjust.mouse,
                role: "alert",
                "aria-live": "polite",
                "aria-atomic": D,
                "aria-describedby": this._id + "-content",
                "aria-hidden": C
            }).toggleClass(_, this.disabled).attr(T, this.id).data(R, this).appendTo(j.container).append(f.content = d("<div />", {
                "class": R + "-content",
                id: this._id + "-content",
                "aria-atomic": C
            })), this.rendered = -1, this.positioning = C, h && (this._createTitle(), d.isFunction(h) || k.push(this._updateTitle(h, D))), i && this._createButton(), d.isFunction(g) || k.push(this._updateContent(g, D)), this.rendered = C, this._setWidget(), d.each(Q, function (a) {
                var c;
                "render" === this.initialize && (c = this(b)) && (b.plugins[a] = c)
            }), this._unassignEvents(), this._assignEvents(), this._when(k).then(function () {
                b._trigger("render"), b.positioning = D, b.hiddenDuringWait || !c.show.ready && !a || b.toggle(C, e.event, D), b.hiddenDuringWait = D
            }), x.api[this.id] = this, this
        }, y.destroy = function (a) {
            function b() {
                if (!this.destroyed) {
                    this.destroyed = C;
                    var a, b = this.target, c = b.attr(ba);
                    this.rendered && this.tooltip.stop(1, 0).find("*").remove().end().remove(), d.each(this.plugins, function () {
                        this.destroy && this.destroy()
                    });
                    for (a in this.timers) this.timers.hasOwnProperty(a) && clearTimeout(this.timers[a]);
                    b.removeData(R).removeAttr(T).removeAttr(S).removeAttr("aria-describedby"), this.options.suppress && c && b.attr("title", c).removeAttr(ba), this._unassignEvents(), this.options = this.elements = this.cache = this.timers = this.plugins = this.mouse = E, delete x.api[this.id]
                }
            }

            return this.destroyed ? this.target : (a === C && "hide" !== this.triggering || !this.rendered ? b.call(this) : (this.tooltip.one("tooltiphidden", d.proxy(b, this)), !this.triggering && this.hide()), this.target)
        }, A = y.checks = {
            builtin: {
                "^id$": function (a, b, c, e) {
                    var f = c === C ? x.nextid : c, g = R + "-" + f;
                    f !== D && f.length > 0 && !d("#" + g).length ? (this._id = g, this.rendered && (this.tooltip[0].id = this._id, this.elements.content[0].id = this._id + "-content", this.elements.title[0].id = this._id + "-title")) : a[b] = e
                }, "^prerender": function (a, b, c) {
                    c && !this.rendered && this.render(this.options.show.ready)
                }, "^content.text$": function (a, b, c) {
                    this._updateContent(c)
                }, "^content.attr$": function (a, b, c, d) {
                    this.options.content.text === this.target.attr(d) && this._updateContent(this.target.attr(c))
                }, "^content.title$": function (a, b, c) {
                    return c ? (c && !this.elements.title && this._createTitle(), void this._updateTitle(c)) : this._removeTitle()
                }, "^content.button$": function (a, b, c) {
                    this._updateButton(c)
                }, "^content.title.(text|button)$": function (a, b, c) {
                    this.set("content." + b, c)
                }, "^position.(my|at)$": function (a, b, c) {
                    "string" == typeof c && (this.position[b] = a[b] = new z(c, "at" === b))
                }, "^position.container$": function (a, b, c) {
                    this.rendered && this.tooltip.appendTo(c)
                }, "^show.ready$": function (a, b, c) {
                    c && (!this.rendered && this.render(C) || this.toggle(C))
                }, "^style.classes$": function (a, b, c, d) {
                    this.rendered && this.tooltip.removeClass(d).addClass(c)
                }, "^style.(width|height)": function (a, b, c) {
                    this.rendered && this.tooltip.css(b, c)
                }, "^style.widget|content.title": function () {
                    this.rendered && this._setWidget()
                }, "^style.def": function (a, b, c) {
                    this.rendered && this.tooltip.toggleClass(Y, !!c)
                }, "^events.(render|show|move|hide|focus|blur)$": function (a, b, c) {
                    this.rendered && this.tooltip[(d.isFunction(c) ? "" : "un") + "bind"]("tooltip" + b, c)
                }, "^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)": function () {
                    if (this.rendered) {
                        var a = this.options.position;
                        this.tooltip.attr("tracking", "mouse" === a.target && a.adjust.mouse), this._unassignEvents(), this._assignEvents()
                    }
                }
            }
        }, y.get = function (a) {
            if (this.destroyed) return this;
            var b = i(this.options, a.toLowerCase()), c = b[0][b[1]];
            return c.precedance ? c.string() : c
        };
        var da = /^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,
            ea = /^prerender|show\.ready/i;
        y.set = function (a, b) {
            if (this.destroyed) return this;
            var c, e = this.rendered, f = D, g = this.options;
            return "string" == typeof a ? (c = a, a = {}, a[c] = b) : a = d.extend({}, a), d.each(a, function (b, c) {
                if (e && ea.test(b)) return void delete a[b];
                var h, j = i(g, b.toLowerCase());
                h = j[0][j[1]], j[0][j[1]] = c && c.nodeType ? d(c) : c, f = da.test(b) || f, a[b] = [j[0], j[1], c, h]
            }), h(g), this.positioning = C, d.each(a, d.proxy(j, this)), this.positioning = D, this.rendered && this.tooltip[0].offsetWidth > 0 && f && this.reposition("mouse" === g.position.target ? E : this.cache.event), this
        }, y._update = function (a, b) {
            var c = this, e = this.cache;
            return this.rendered && a ? (d.isFunction(a) && (a = a.call(this.elements.target, e.event, this) || ""), d.isFunction(a.then) ? (e.waiting = C, a.then(function (a) {
                return e.waiting = D, c._update(a, b)
            }, E, function (a) {
                return c._update(a, b)
            })) : a === D || !a && "" !== a ? D : (a.jquery && a.length > 0 ? b.empty().append(a.css({
                display: "block",
                visibility: "visible"
            })) : b.html(a), this._waitForContent(b).then(function (a) {
                c.rendered && c.tooltip[0].offsetWidth > 0 && c.reposition(e.event, !a.length)
            }))) : D
        }, y._waitForContent = function (a) {
            var b = this.cache;
            return b.waiting = C, (d.fn.imagesLoaded ? a.imagesLoaded() : (new d.Deferred).resolve([])).done(function () {
                b.waiting = D
            }).promise()
        }, y._updateContent = function (a, b) {
            this._update(a, this.elements.content, b)
        }, y._updateTitle = function (a, b) {
            this._update(a, this.elements.title, b) === D && this._removeTitle(D)
        }, y._createTitle = function () {
            var a = this.elements, b = this._id + "-title";
            a.titlebar && this._removeTitle(), a.titlebar = d("<div />", {"class": R + "-titlebar " + (this.options.style.widget ? k("header") : "")}).append(a.title = d("<div />", {
                id: b,
                "class": R + "-title",
                "aria-atomic": C
            })).insertBefore(a.content).delegate(".qtip-close", "mousedown keydown mouseup keyup mouseout", function (a) {
                d(this).toggleClass("ui-state-active ui-state-focus", "down" === a.type.substr(-4))
            }).delegate(".qtip-close", "mouseover mouseout", function (a) {
                d(this).toggleClass("ui-state-hover", "mouseover" === a.type)
            }), this.options.content.button && this._createButton()
        }, y._removeTitle = function (a) {
            var b = this.elements;
            b.title && (b.titlebar.remove(), b.titlebar = b.title = b.button = E, a !== D && this.reposition())
        }, y._createPosClass = function (a) {
            return R + "-pos-" + (a || this.options.position.my).abbrev()
        }, y.reposition = function (c, e) {
            if (!this.rendered || this.positioning || this.destroyed) return this;
            this.positioning = C;
            var f, g, h, i, j = this.cache, k = this.tooltip, l = this.options.position, m = l.target, n = l.my,
                o = l.at, p = l.viewport, q = l.container, r = l.adjust, s = r.method.split(" "), t = k.outerWidth(D),
                u = k.outerHeight(D), v = 0, w = 0, x = k.css("position"), y = {left: 0, top: 0},
                z = k[0].offsetWidth > 0, A = c && "scroll" === c.type, B = d(a), E = q[0].ownerDocument,
                F = this.mouse;
            if (d.isArray(m) && 2 === m.length) o = {x: K, y: J}, y = {
                left: m[0],
                top: m[1]
            }; else if ("mouse" === m) o = {
                x: K,
                y: J
            }, (!r.mouse || this.options.hide.distance) && j.origin && j.origin.pageX ? c = j.origin : !c || c && ("resize" === c.type || "scroll" === c.type) ? c = j.event : F && F.pageX && (c = F), "static" !== x && (y = q.offset()), E.body.offsetWidth !== (a.innerWidth || E.documentElement.clientWidth) && (g = d(b.body).offset()), y = {
                left: c.pageX - y.left + (g && g.left || 0),
                top: c.pageY - y.top + (g && g.top || 0)
            }, r.mouse && A && F && (y.left -= (F.scrollX || 0) - B.scrollLeft(), y.top -= (F.scrollY || 0) - B.scrollTop()); else {
                if ("event" === m ? c && c.target && "scroll" !== c.type && "resize" !== c.type ? j.target = d(c.target) : c.target || (j.target = this.elements.target) : "event" !== m && (j.target = d(m.jquery ? m : this.elements.target)), m = j.target, m = d(m).eq(0), 0 === m.length) return this;
                m[0] === b || m[0] === a ? (v = ca.iOS ? a.innerWidth : m.width(), w = ca.iOS ? a.innerHeight : m.height(), m[0] === a && (y = {
                    top: (p || m).scrollTop(),
                    left: (p || m).scrollLeft()
                })) : Q.imagemap && m.is("area") ? f = Q.imagemap(this, m, o, Q.viewport ? s : D) : Q.svg && m && m[0].ownerSVGElement ? f = Q.svg(this, m, o, Q.viewport ? s : D) : (v = m.outerWidth(D), w = m.outerHeight(D), y = m.offset()), f && (v = f.width, w = f.height, g = f.offset, y = f.position), y = this.reposition.offset(m, y, q), (ca.iOS > 3.1 && ca.iOS < 4.1 || ca.iOS >= 4.3 && ca.iOS < 4.33 || !ca.iOS && "fixed" === x) && (y.left -= B.scrollLeft(), y.top -= B.scrollTop()), (!f || f && f.adjustable !== D) && (y.left += o.x === M ? v : o.x === N ? v / 2 : 0, y.top += o.y === L ? w : o.y === N ? w / 2 : 0)
            }
            return y.left += r.x + (n.x === M ? -t : n.x === N ? -t / 2 : 0), y.top += r.y + (n.y === L ? -u : n.y === N ? -u / 2 : 0), Q.viewport ? (h = y.adjusted = Q.viewport(this, y, l, v, w, t, u), g && h.left && (y.left += g.left), g && h.top && (y.top += g.top), h.my && (this.position.my = h.my)) : y.adjusted = {
                left: 0,
                top: 0
            }, j.posClass !== (i = this._createPosClass(this.position.my)) && (j.posClass = i, k.removeClass(j.posClass).addClass(i)), this._trigger("move", [y, p.elem || p], c) ? (delete y.adjusted, e === D || !z || isNaN(y.left) || isNaN(y.top) || "mouse" === m || !d.isFunction(l.effect) ? k.css(y) : d.isFunction(l.effect) && (l.effect.call(k, this, d.extend({}, y)), k.queue(function (a) {
                d(this).css({opacity: "", height: ""}), ca.ie && this.style.removeAttribute("filter"), a()
            })), this.positioning = D, this) : this
        }, y.reposition.offset = function (a, c, e) {
            function f(a, b) {
                c.left += b * a.scrollLeft(), c.top += b * a.scrollTop()
            }

            if (!e[0]) return c;
            var g, h, i, j, k = d(a[0].ownerDocument), l = !!ca.ie && "CSS1Compat" !== b.compatMode, m = e[0];
            do "static" !== (h = d.css(m, "position")) && ("fixed" === h ? (i = m.getBoundingClientRect(), f(k, -1)) : (i = d(m).position(), i.left += parseFloat(d.css(m, "borderLeftWidth")) || 0, i.top += parseFloat(d.css(m, "borderTopWidth")) || 0), c.left -= i.left + (parseFloat(d.css(m, "marginLeft")) || 0), c.top -= i.top + (parseFloat(d.css(m, "marginTop")) || 0), g || "hidden" === (j = d.css(m, "overflow")) || "visible" === j || (g = d(m))); while (m = m.offsetParent);
            return g && (g[0] !== k[0] || l) && f(g, 1), c
        };
        var fa = (z = y.reposition.Corner = function (a, b) {
            a = ("" + a).replace(/([A-Z])/, " $1").replace(/middle/gi, N).toLowerCase(), this.x = (a.match(/left|right/i) || a.match(/center/) || ["inherit"])[0].toLowerCase(), this.y = (a.match(/top|bottom|center/i) || ["inherit"])[0].toLowerCase(), this.forceY = !!b;
            var c = a.charAt(0);
            this.precedance = "t" === c || "b" === c ? G : F
        }).prototype;
        fa.invert = function (a, b) {
            this[a] = this[a] === K ? M : this[a] === M ? K : b || this[a]
        }, fa.string = function (a) {
            var b = this.x, c = this.y,
                d = b !== c ? "center" === b || "center" !== c && (this.precedance === G || this.forceY) ? [c, b] : [b, c] : [b];
            return a !== !1 ? d.join(" ") : d
        }, fa.abbrev = function () {
            var a = this.string(!1);
            return a[0].charAt(0) + (a[1] && a[1].charAt(0) || "")
        }, fa.clone = function () {
            return new z(this.string(), this.forceY)
        }, y.toggle = function (a, c) {
            var e = this.cache, f = this.options, g = this.tooltip;
            if (c) {
                if (/over|enter/.test(c.type) && e.event && /out|leave/.test(e.event.type) && f.show.target.add(c.target).length === f.show.target.length && g.has(c.relatedTarget).length) return this;
                e.event = d.event.fix(c)
            }
            if (this.waiting && !a && (this.hiddenDuringWait = C), !this.rendered) return a ? this.render(1) : this;
            if (this.destroyed || this.disabled) return this;
            var h, i, j, k = a ? "show" : "hide", l = this.options[k], m = this.options.position,
                n = this.options.content, o = this.tooltip.css("width"), p = this.tooltip.is(":visible"),
                q = a || 1 === l.target.length, r = !c || l.target.length < 2 || e.target[0] === c.target;
            return (typeof a).search("boolean|number") && (a = !p), h = !g.is(":animated") && p === a && r, i = h ? E : !!this._trigger(k, [90]), this.destroyed ? this : (i !== D && a && this.focus(c), !i || h ? this : (d.attr(g[0], "aria-hidden", !a), a ? (this.mouse && (e.origin = d.event.fix(this.mouse)), d.isFunction(n.text) && this._updateContent(n.text, D), d.isFunction(n.title) && this._updateTitle(n.title, D), !B && "mouse" === m.target && m.adjust.mouse && (d(b).bind("mousemove." + R, this._storeMouse), B = C), o || g.css("width", g.outerWidth(D)), this.reposition(c, arguments[2]), o || g.css("width", ""), l.solo && ("string" == typeof l.solo ? d(l.solo) : d(V, l.solo)).not(g).not(l.target).qtip("hide", new d.Event("tooltipsolo"))) : (clearTimeout(this.timers.show), delete e.origin, B && !d(V + '[tracking="true"]:visible', l.solo).not(g).length && (d(b).unbind("mousemove." + R), B = D), this.blur(c)), j = d.proxy(function () {
                a ? (ca.ie && g[0].style.removeAttribute("filter"), g.css("overflow", ""), "string" == typeof l.autofocus && d(this.options.show.autofocus, g).focus(), this.options.show.target.trigger("qtip-" + this.id + "-inactive")) : g.css({
                    display: "",
                    visibility: "",
                    opacity: "",
                    left: "",
                    top: ""
                }), this._trigger(a ? "visible" : "hidden")
            }, this), l.effect === D || q === D ? (g[k](), j()) : d.isFunction(l.effect) ? (g.stop(1, 1), l.effect.call(g, this), g.queue("fx", function (a) {
                j(), a()
            })) : g.fadeTo(90, a ? 1 : 0, j), a && l.target.trigger("qtip-" + this.id + "-inactive"), this))
        }, y.show = function (a) {
            return this.toggle(C, a)
        }, y.hide = function (a) {
            return this.toggle(D, a)
        }, y.focus = function (a) {
            if (!this.rendered || this.destroyed) return this;
            var b = d(V), c = this.tooltip, e = parseInt(c[0].style.zIndex, 10), f = x.zindex + b.length;
            return c.hasClass(Z) || this._trigger("focus", [f], a) && (e !== f && (b.each(function () {
                this.style.zIndex > e && (this.style.zIndex = this.style.zIndex - 1)
            }), b.filter("." + Z).qtip("blur", a)), c.addClass(Z)[0].style.zIndex = f), this
        }, y.blur = function (a) {
            return !this.rendered || this.destroyed ? this : (this.tooltip.removeClass(Z), this._trigger("blur", [this.tooltip.css("zIndex")], a), this)
        }, y.disable = function (a) {
            return this.destroyed ? this : ("toggle" === a ? a = !(this.rendered ? this.tooltip.hasClass(_) : this.disabled) : "boolean" != typeof a && (a = C), this.rendered && this.tooltip.toggleClass(_, a).attr("aria-disabled", a), this.disabled = !!a, this)
        }, y.enable = function () {
            return this.disable(D)
        }, y._createButton = function () {
            var a = this, b = this.elements, c = b.tooltip, e = this.options.content.button, f = "string" == typeof e,
                g = f ? e : "Close tooltip";
            b.button && b.button.remove(), e.jquery ? b.button = e : b.button = d("<a />", {
                "class": "qtip-close " + (this.options.style.widget ? "" : R + "-icon"),
                title: g,
                "aria-label": g
            }).prepend(d("<span />", {
                "class": "ui-icon ui-icon-close",
                html: "&times;"
            })), b.button.appendTo(b.titlebar || c).attr("role", "button").click(function (b) {
                return c.hasClass(_) || a.hide(b), D
            })
        }, y._updateButton = function (a) {
            if (!this.rendered) return D;
            var b = this.elements.button;
            a ? this._createButton() : b.remove()
        }, y._setWidget = function () {
            var a = this.options.style.widget, b = this.elements, c = b.tooltip, d = c.hasClass(_);
            c.removeClass(_), _ = a ? "ui-state-disabled" : "qtip-disabled", c.toggleClass(_, d), c.toggleClass("ui-helper-reset " + k(), a).toggleClass(Y, this.options.style.def && !a), b.content && b.content.toggleClass(k("content"), a), b.titlebar && b.titlebar.toggleClass(k("header"), a), b.button && b.button.toggleClass(R + "-icon", !a)
        }, y._storeMouse = function (a) {
            return (this.mouse = d.event.fix(a)).type = "mousemove", this
        }, y._bind = function (a, b, c, e, f) {
            if (a && c && b.length) {
                var g = "." + this._id + (e ? "-" + e : "");
                return d(a).bind((b.split ? b : b.join(g + " ")) + g, d.proxy(c, f || this)), this
            }
        }, y._unbind = function (a, b) {
            return a && d(a).unbind("." + this._id + (b ? "-" + b : "")), this
        }, y._trigger = function (a, b, c) {
            var e = new d.Event("tooltip" + a);
            return e.originalEvent = c && d.extend({}, c) || this.cache.event || E, this.triggering = a, this.tooltip.trigger(e, [this].concat(b || [])), this.triggering = D, !e.isDefaultPrevented()
        }, y._bindEvents = function (a, b, c, e, f, g) {
            var h = c.filter(e).add(e.filter(c)), i = [];
            h.length && (d.each(b, function (b, c) {
                var e = d.inArray(c, a);
                e > -1 && i.push(a.splice(e, 1)[0])
            }), i.length && (this._bind(h, i, function (a) {
                var b = this.rendered ? this.tooltip[0].offsetWidth > 0 : !1;
                (b ? g : f).call(this, a)
            }), c = c.not(h), e = e.not(h))), this._bind(c, a, f), this._bind(e, b, g)
        }, y._assignInitialEvents = function (a) {
            function b(a) {
                return this.disabled || this.destroyed ? D : (this.cache.event = a && d.event.fix(a), this.cache.target = a && d(a.target), clearTimeout(this.timers.show), void(this.timers.show = l.call(this, function () {
                    this.render("object" == typeof a || c.show.ready)
                }, c.prerender ? 0 : c.show.delay)))
            }

            var c = this.options, e = c.show.target, f = c.hide.target,
                g = c.show.event ? d.trim("" + c.show.event).split(" ") : [],
                h = c.hide.event ? d.trim("" + c.hide.event).split(" ") : [];
            this._bind(this.elements.target, ["remove", "removeqtip"], function () {
                this.destroy(!0)
            }, "destroy"), /mouse(over|enter)/i.test(c.show.event) && !/mouse(out|leave)/i.test(c.hide.event) && h.push("mouseleave"), this._bind(e, "mousemove", function (a) {
                this._storeMouse(a), this.cache.onTarget = C
            }), this._bindEvents(g, h, e, f, b, function () {
                return this.timers ? void clearTimeout(this.timers.show) : D
            }), (c.show.ready || c.prerender) && b.call(this, a)
        }, y._assignEvents = function () {
            var c = this, e = this.options, f = e.position, g = this.tooltip, h = e.show.target, i = e.hide.target,
                j = f.container, k = f.viewport, l = d(b), q = d(a),
                r = e.show.event ? d.trim("" + e.show.event).split(" ") : [],
                s = e.hide.event ? d.trim("" + e.hide.event).split(" ") : [];
            d.each(e.events, function (a, b) {
                c._bind(g, "toggle" === a ? ["tooltipshow", "tooltiphide"] : ["tooltip" + a], b, null, g)
            }), /mouse(out|leave)/i.test(e.hide.event) && "window" === e.hide.leave && this._bind(l, ["mouseout", "blur"], function (a) {
                /select|option/.test(a.target.nodeName) || a.relatedTarget || this.hide(a)
            }), e.hide.fixed ? i = i.add(g.addClass(X)) : /mouse(over|enter)/i.test(e.show.event) && this._bind(i, "mouseleave", function () {
                clearTimeout(this.timers.show)
            }), ("" + e.hide.event).indexOf("unfocus") > -1 && this._bind(j.closest("html"), ["mousedown", "touchstart"], function (a) {
                var b = d(a.target), c = this.rendered && !this.tooltip.hasClass(_) && this.tooltip[0].offsetWidth > 0,
                    e = b.parents(V).filter(this.tooltip[0]).length > 0;
                b[0] === this.target[0] || b[0] === this.tooltip[0] || e || this.target.has(b[0]).length || !c || this.hide(a)
            }), "number" == typeof e.hide.inactive && (this._bind(h, "qtip-" + this.id + "-inactive", o, "inactive"), this._bind(i.add(g), x.inactiveEvents, o)), this._bindEvents(r, s, h, i, m, n), this._bind(h.add(g), "mousemove", function (a) {
                if ("number" == typeof e.hide.distance) {
                    var b = this.cache.origin || {}, c = this.options.hide.distance, d = Math.abs;
                    (d(a.pageX - b.pageX) >= c || d(a.pageY - b.pageY) >= c) && this.hide(a)
                }
                this._storeMouse(a)
            }), "mouse" === f.target && f.adjust.mouse && (e.hide.event && this._bind(h, ["mouseenter", "mouseleave"], function (a) {
                return this.cache ? void(this.cache.onTarget = "mouseenter" === a.type) : D
            }), this._bind(l, "mousemove", function (a) {
                this.rendered && this.cache.onTarget && !this.tooltip.hasClass(_) && this.tooltip[0].offsetWidth > 0 && this.reposition(a)
            })), (f.adjust.resize || k.length) && this._bind(d.event.special.resize ? k : q, "resize", p), f.adjust.scroll && this._bind(q.add(f.container), "scroll", p)
        }, y._unassignEvents = function () {
            var c = this.options, e = c.show.target, f = c.hide.target,
                g = d.grep([this.elements.target[0], this.rendered && this.tooltip[0], c.position.container[0], c.position.viewport[0], c.position.container.closest("html")[0], a, b], function (a) {
                    return "object" == typeof a
                });
            e && e.toArray && (g = g.concat(e.toArray())), f && f.toArray && (g = g.concat(f.toArray())), this._unbind(g)._unbind(g, "destroy")._unbind(g, "inactive")
        }, d(function () {
            q(V, ["mouseenter", "mouseleave"], function (a) {
                var b = "mouseenter" === a.type, c = d(a.currentTarget), e = d(a.relatedTarget || a.target),
                    f = this.options;
                b ? (this.focus(a), c.hasClass(X) && !c.hasClass(_) && clearTimeout(this.timers.hide)) : "mouse" === f.position.target && f.position.adjust.mouse && f.hide.event && f.show.target && !e.closest(f.show.target[0]).length && this.hide(a), c.toggleClass($, b)
            }), q("[" + T + "]", W, o)
        }), x = d.fn.qtip = function (a, b, e) {
            var f = ("" + a).toLowerCase(), g = E, i = d.makeArray(arguments).slice(1), j = i[i.length - 1],
                k = this[0] ? d.data(this[0], R) : E;
            return !arguments.length && k || "api" === f ? k : "string" == typeof a ? (this.each(function () {
                var a = d.data(this, R);
                if (!a) return C;
                if (j && j.timeStamp && (a.cache.event = j), !b || "option" !== f && "options" !== f) a[f] && a[f].apply(a, i); else {
                    if (e === c && !d.isPlainObject(b)) return g = a.get(b), D;
                    a.set(b, e)
                }
            }), g !== E ? g : this) : "object" != typeof a && arguments.length ? void 0 : (k = h(d.extend(C, {}, a)), this.each(function (a) {
                var b, c;
                return c = d.isArray(k.id) ? k.id[a] : k.id, c = !c || c === D || c.length < 1 || x.api[c] ? x.nextid++ : c, b = r(d(this), c, k), b === D ? C : (x.api[c] = b, d.each(Q, function () {
                    "initialize" === this.initialize && this(b)
                }), void b._assignInitialEvents(j))
            }))
        }, d.qtip = e, x.api = {}, d.each({
            attr: function (a, b) {
                if (this.length) {
                    var c = this[0], e = "title", f = d.data(c, "qtip");
                    if (a === e && f && f.options && "object" == typeof f && "object" == typeof f.options && f.options.suppress) return arguments.length < 2 ? d.attr(c, ba) : (f && f.options.content.attr === e && f.cache.attr && f.set("content.text", b), this.attr(ba, b))
                }
                return d.fn["attr" + aa].apply(this, arguments)
            }, clone: function (a) {
                var b = d.fn["clone" + aa].apply(this, arguments);
                return a || b.filter("[" + ba + "]").attr("title", function () {
                    return d.attr(this, ba)
                }).removeAttr(ba), b
            }
        }, function (a, b) {
            if (!b || d.fn[a + aa]) return C;
            var c = d.fn[a + aa] = d.fn[a];
            d.fn[a] = function () {
                return b.apply(this, arguments) || c.apply(this, arguments)
            }
        }), d.ui || (d["cleanData" + aa] = d.cleanData, d.cleanData = function (a) {
            for (var b, c = 0; (b = d(a[c])).length; c++) if (b.attr(S)) try {
                b.triggerHandler("removeqtip")
            } catch (e) {
            }
            d["cleanData" + aa].apply(this, arguments)
        }), x.version = "3.0.3", x.nextid = 0, x.inactiveEvents = W, x.zindex = 15e3, x.defaults = {
            prerender: D,
            id: D,
            overwrite: C,
            suppress: C,
            content: {text: C, attr: "title", title: D, button: D},
            position: {
                my: "top left",
                at: "bottom right",
                target: D,
                container: D,
                viewport: D,
                adjust: {x: 0, y: 0, mouse: C, scroll: C, resize: C, method: "flipinvert flipinvert"},
                effect: function (a, b) {
                    d(this).animate(b, {duration: 200, queue: D})
                }
            },
            show: {target: D, event: "mouseenter", effect: C, delay: 90, solo: D, ready: D, autofocus: D},
            hide: {
                target: D,
                event: "mouseleave",
                effect: C,
                delay: 0,
                fixed: D,
                inactive: D,
                leave: "window",
                distance: D
            },
            style: {classes: "", widget: D, width: D, height: D, def: C},
            events: {render: E, move: E, show: E, hide: E, toggle: E, visible: E, hidden: E, focus: E, blur: E}
        };
        var ga, ha, ia, ja, ka, la = "margin", ma = "border", na = "color", oa = "background-color", pa = "transparent",
            qa = " !important", ra = !!b.createElement("canvas").getContext,
            sa = /rgba?\(0, 0, 0(, 0)?\)|transparent|#123456/i, ta = {}, ua = ["Webkit", "O", "Moz", "ms"];
        ra ? (ja = a.devicePixelRatio || 1, ka = function () {
            var a = b.createElement("canvas").getContext("2d");
            return a.backingStorePixelRatio || a.webkitBackingStorePixelRatio || a.mozBackingStorePixelRatio || a.msBackingStorePixelRatio || a.oBackingStorePixelRatio || 1
        }(), ia = ja / ka) : ha = function (a, b, c) {
            return "<qtipvml:" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="qtip-vml" ' + (b || "") + ' style="behavior: url(#default#VML); ' + (c || "") + '" />'
        }, d.extend(v.prototype, {
            init: function (a) {
                var b, c;
                c = this.element = a.elements.tip = d("<div />", {"class": R + "-tip"}).prependTo(a.tooltip), ra ? (b = d("<canvas />").appendTo(this.element)[0].getContext("2d"), b.lineJoin = "miter", b.miterLimit = 1e5, b.save()) : (b = ha("shape", 'coordorigin="0,0"', "position:absolute;"), this.element.html(b + b), a._bind(d("*", c).add(c), ["click", "mousedown"], function (a) {
                    a.stopPropagation()
                }, this._ns)), a._bind(a.tooltip, "tooltipmove", this.reposition, this._ns, this), this.create()
            }, _swapDimensions: function () {
                this.size[0] = this.options.height, this.size[1] = this.options.width
            }, _resetDimensions: function () {
                this.size[0] = this.options.width, this.size[1] = this.options.height
            }, _useTitle: function (a) {
                var b = this.qtip.elements.titlebar;
                return b && (a.y === J || a.y === N && this.element.position().top + this.size[1] / 2 + this.options.offset < b.outerHeight(C))
            }, _parseCorner: function (a) {
                var b = this.qtip.options.position.my;
                return a === D || b === D ? a = D : a === C ? a = new z(b.string()) : a.string || (a = new z(a), a.fixed = C), a
            }, _parseWidth: function (a, b, c) {
                var d = this.qtip.elements, e = ma + s(b) + "Width";
                return (c ? u(c, e) : u(d.content, e) || u(this._useTitle(a) && d.titlebar || d.content, e) || u(d.tooltip, e)) || 0
            }, _parseRadius: function (a) {
                var b = this.qtip.elements, c = ma + s(a.y) + s(a.x) + "Radius";
                return ca.ie < 9 ? 0 : u(this._useTitle(a) && b.titlebar || b.content, c) || u(b.tooltip, c) || 0
            }, _invalidColour: function (a, b, c) {
                var d = a.css(b);
                return !d || c && d === a.css(c) || sa.test(d) ? D : d
            }, _parseColours: function (a) {
                var b = this.qtip.elements, c = this.element.css("cssText", ""), e = ma + s(a[a.precedance]) + s(na),
                    f = this._useTitle(a) && b.titlebar || b.content, g = this._invalidColour, h = [];
                return h[0] = g(c, oa) || g(f, oa) || g(b.content, oa) || g(b.tooltip, oa) || c.css(oa), h[1] = g(c, e, na) || g(f, e, na) || g(b.content, e, na) || g(b.tooltip, e, na) || b.tooltip.css(e), d("*", c).add(c).css("cssText", oa + ":" + pa + qa + ";" + ma + ":0" + qa + ";"), h
            }, _calculateSize: function (a) {
                var b, c, d, e = a.precedance === G, f = this.options.width, g = this.options.height,
                    h = "c" === a.abbrev(), i = (e ? f : g) * (h ? .5 : 1), j = Math.pow, k = Math.round,
                    l = Math.sqrt(j(i, 2) + j(g, 2)), m = [this.border / i * l, this.border / g * l];
                return m[2] = Math.sqrt(j(m[0], 2) - j(this.border, 2)), m[3] = Math.sqrt(j(m[1], 2) - j(this.border, 2)), b = l + m[2] + m[3] + (h ? 0 : m[0]), c = b / l, d = [k(c * f), k(c * g)], e ? d : d.reverse()
            }, _calculateTip: function (a, b, c) {
                c = c || 1, b = b || this.size;
                var d = b[0] * c, e = b[1] * c, f = Math.ceil(d / 2), g = Math.ceil(e / 2), h = {
                    br: [0, 0, d, e, d, 0],
                    bl: [0, 0, d, 0, 0, e],
                    tr: [0, e, d, 0, d, e],
                    tl: [0, 0, 0, e, d, e],
                    tc: [0, e, f, 0, d, e],
                    bc: [0, 0, d, 0, f, e],
                    rc: [0, 0, d, g, 0, e],
                    lc: [d, 0, d, e, 0, g]
                };
                return h.lt = h.br, h.rt = h.bl, h.lb = h.tr, h.rb = h.tl, h[a.abbrev()]
            }, _drawCoords: function (a, b) {
                a.beginPath(), a.moveTo(b[0], b[1]), a.lineTo(b[2], b[3]), a.lineTo(b[4], b[5]), a.closePath()
            }, create: function () {
                var a = this.corner = (ra || ca.ie) && this._parseCorner(this.options.corner);
                return this.enabled = !!this.corner && "c" !== this.corner.abbrev(), this.enabled && (this.qtip.cache.corner = a.clone(), this.update()), this.element.toggle(this.enabled), this.corner
            }, update: function (b, c) {
                if (!this.enabled) return this;
                var e, f, g, h, i, j, k, l, m = this.qtip.elements, n = this.element, o = n.children(),
                    p = this.options, q = this.size, r = p.mimic, s = Math.round;
                b || (b = this.qtip.cache.corner || this.corner), r === D ? r = b : (r = new z(r), r.precedance = b.precedance, "inherit" === r.x ? r.x = b.x : "inherit" === r.y ? r.y = b.y : r.x === r.y && (r[b.precedance] = b[b.precedance])), f = r.precedance, b.precedance === F ? this._swapDimensions() : this._resetDimensions(), e = this.color = this._parseColours(b), e[1] !== pa ? (l = this.border = this._parseWidth(b, b[b.precedance]), p.border && 1 > l && !sa.test(e[1]) && (e[0] = e[1]), this.border = l = p.border !== C ? p.border : l) : this.border = l = 0, k = this.size = this._calculateSize(b), n.css({
                    width: k[0],
                    height: k[1],
                    lineHeight: k[1] + "px"
                }), j = b.precedance === G ? [s(r.x === K ? l : r.x === M ? k[0] - q[0] - l : (k[0] - q[0]) / 2), s(r.y === J ? k[1] - q[1] : 0)] : [s(r.x === K ? k[0] - q[0] : 0), s(r.y === J ? l : r.y === L ? k[1] - q[1] - l : (k[1] - q[1]) / 2)], ra ? (g = o[0].getContext("2d"), g.restore(), g.save(), g.clearRect(0, 0, 6e3, 6e3), h = this._calculateTip(r, q, ia), i = this._calculateTip(r, this.size, ia), o.attr(H, k[0] * ia).attr(I, k[1] * ia), o.css(H, k[0]).css(I, k[1]), this._drawCoords(g, i), g.fillStyle = e[1], g.fill(), g.translate(j[0] * ia, j[1] * ia), this._drawCoords(g, h), g.fillStyle = e[0], g.fill()) : (h = this._calculateTip(r), h = "m" + h[0] + "," + h[1] + " l" + h[2] + "," + h[3] + " " + h[4] + "," + h[5] + " xe", j[2] = l && /^(r|b)/i.test(b.string()) ? 8 === ca.ie ? 2 : 1 : 0, o.css({
                    coordsize: k[0] + l + " " + k[1] + l,
                    antialias: "" + (r.string().indexOf(N) > -1),
                    left: j[0] - j[2] * Number(f === F),
                    top: j[1] - j[2] * Number(f === G),
                    width: k[0] + l,
                    height: k[1] + l
                }).each(function (a) {
                    var b = d(this);
                    b[b.prop ? "prop" : "attr"]({
                        coordsize: k[0] + l + " " + k[1] + l,
                        path: h,
                        fillcolor: e[0],
                        filled: !!a,
                        stroked: !a
                    }).toggle(!(!l && !a)), !a && b.html(ha("stroke", 'weight="' + 2 * l + 'px" color="' + e[1] + '" miterlimit="1000" joinstyle="miter"'))
                })), a.opera && setTimeout(function () {
                    m.tip.css({display: "inline-block", visibility: "visible"})
                }, 1), c !== D && this.calculate(b, k)
            }, calculate: function (a, b) {
                if (!this.enabled) return D;
                var c, e, f = this, g = this.qtip.elements, h = this.element, i = this.options.offset, j = {};
                return a = a || this.corner,
                    c = a.precedance, b = b || this._calculateSize(a), e = [a.x, a.y], c === F && e.reverse(), d.each(e, function (d, e) {
                    var h, k, l;
                    e === N ? (h = c === G ? K : J, j[h] = "50%", j[la + "-" + h] = -Math.round(b[c === G ? 0 : 1] / 2) + i) : (h = f._parseWidth(a, e, g.tooltip), k = f._parseWidth(a, e, g.content), l = f._parseRadius(a), j[e] = Math.max(-f.border, d ? k : i + (l > h ? l : -h)))
                }), j[a[c]] -= b[c === F ? 0 : 1], h.css({
                    margin: "",
                    top: "",
                    bottom: "",
                    left: "",
                    right: ""
                }).css(j), j
            }, reposition: function (a, b, d) {
                function e(a, b, c, d, e) {
                    a === P && j.precedance === b && k[d] && j[c] !== N ? j.precedance = j.precedance === F ? G : F : a !== P && k[d] && (j[b] = j[b] === N ? k[d] > 0 ? d : e : j[b] === d ? e : d)
                }

                function f(a, b, e) {
                    j[a] === N ? p[la + "-" + b] = o[a] = g[la + "-" + b] - k[b] : (h = g[e] !== c ? [k[b], -g[b]] : [-k[b], g[b]], (o[a] = Math.max(h[0], h[1])) > h[0] && (d[b] -= k[b], o[b] = D), p[g[e] !== c ? e : b] = o[a])
                }

                if (this.enabled) {
                    var g, h, i = b.cache, j = this.corner.clone(), k = d.adjusted,
                        l = b.options.position.adjust.method.split(" "), m = l[0], n = l[1] || l[0],
                        o = {left: D, top: D, x: 0, y: 0}, p = {};
                    this.corner.fixed !== C && (e(m, F, G, K, M), e(n, G, F, J, L), j.string() === i.corner.string() && i.cornerTop === k.top && i.cornerLeft === k.left || this.update(j, D)), g = this.calculate(j), g.right !== c && (g.left = -g.right), g.bottom !== c && (g.top = -g.bottom), g.user = this.offset, o.left = m === P && !!k.left, o.left && f(F, K, M), o.top = n === P && !!k.top, o.top && f(G, J, L), this.element.css(p).toggle(!(o.x && o.y || j.x === N && o.y || j.y === N && o.x)), d.left -= g.left.charAt ? g.user : m !== P || o.top || !o.left && !o.top ? g.left + this.border : 0, d.top -= g.top.charAt ? g.user : n !== P || o.left || !o.left && !o.top ? g.top + this.border : 0, i.cornerLeft = k.left, i.cornerTop = k.top, i.corner = j.clone()
                }
            }, destroy: function () {
                this.qtip._unbind(this.qtip.tooltip, this._ns), this.qtip.elements.tip && this.qtip.elements.tip.find("*").remove().end().remove()
            }
        }), ga = Q.tip = function (a) {
            return new v(a, a.options.style.tip)
        }, ga.initialize = "render", ga.sanitize = function (a) {
            if (a.style && "tip" in a.style) {
                var b = a.style.tip;
                "object" != typeof b && (b = a.style.tip = {corner: b}), /string|boolean/i.test(typeof b.corner) || (b.corner = C)
            }
        }, A.tip = {
            "^position.my|style.tip.(corner|mimic|border)$": function () {
                this.create(), this.qtip.reposition()
            }, "^style.tip.(height|width)$": function (a) {
                this.size = [a.width, a.height], this.update(), this.qtip.reposition()
            }, "^content.title|style.(classes|widget)$": function () {
                this.update()
            }
        }, d.extend(C, x.defaults, {
            style: {
                tip: {
                    corner: C,
                    mimic: D,
                    width: 6,
                    height: 6,
                    border: C,
                    offset: 0
                }
            }
        }), Q.viewport = function (c, d, e, f, g, h, i) {
            function j(a, b, c, e, f, g, h, i, j) {
                var k = d[f], s = u[a], t = v[a], w = c === P, x = s === f ? j : s === g ? -j : -j / 2,
                    y = t === f ? i : t === g ? -i : -i / 2, z = q[f] + r[f] - (n ? 0 : m[f]), A = z - k,
                    B = k + j - (h === H ? o : p) - z,
                    C = x - (u.precedance === a || s === u[b] ? y : 0) - (t === N ? i / 2 : 0);
                return w ? (C = (s === f ? 1 : -1) * x, d[f] += A > 0 ? A : B > 0 ? -B : 0, d[f] = Math.max(-m[f] + r[f], k - C, Math.min(Math.max(-m[f] + r[f] + (h === H ? o : p), k + C), d[f], "center" === s ? k - x : 1e9))) : (e *= c === O ? 2 : 0, A > 0 && (s !== f || B > 0) ? (d[f] -= C + e, l.invert(a, f)) : B > 0 && (s !== g || A > 0) && (d[f] -= (s === N ? -C : C) + e, l.invert(a, g)), d[f] < q[f] && -d[f] > B && (d[f] = k, l = u.clone())), d[f] - k
            }

            var k, l, m, n, o, p, q, r, s = e.target, t = c.elements.tooltip, u = e.my, v = e.at, w = e.adjust,
                x = w.method.split(" "), y = x[0], z = x[1] || x[0], A = e.viewport, B = e.container,
                C = {left: 0, top: 0};
            return A.jquery && s[0] !== a && s[0] !== b.body && "none" !== w.method ? (m = B.offset() || C, n = "static" === B.css("position"), k = "fixed" === t.css("position"), o = A[0] === a ? A.width() : A.outerWidth(D), p = A[0] === a ? A.height() : A.outerHeight(D), q = {
                left: k ? 0 : A.scrollLeft(),
                top: k ? 0 : A.scrollTop()
            }, r = A.offset() || C, "shift" === y && "shift" === z || (l = u.clone()), C = {
                left: "none" !== y ? j(F, G, y, w.x, K, M, H, f, h) : 0,
                top: "none" !== z ? j(G, F, z, w.y, J, L, I, g, i) : 0,
                my: l
            }) : C
        };
        var va, wa, xa = "qtip-modal", ya = "." + xa;
        wa = function () {
            function a(a) {
                if (d.expr[":"].focusable) return d.expr[":"].focusable;
                var b, c, e, f = !isNaN(d.attr(a, "tabindex")), g = a.nodeName && a.nodeName.toLowerCase();
                return "area" === g ? (b = a.parentNode, c = b.name, a.href && c && "map" === b.nodeName.toLowerCase() ? (e = d("img[usemap=#" + c + "]")[0], !!e && e.is(":visible")) : !1) : /input|select|textarea|button|object/.test(g) ? !a.disabled : "a" === g ? a.href || f : f
            }

            function c(a) {
                j.length < 1 && a.length ? a.not("body").blur() : j.first().focus()
            }

            function e(a) {
                if (h.is(":visible")) {
                    var b, e = d(a.target), g = f.tooltip, i = e.closest(V);
                    b = i.length < 1 ? D : parseInt(i[0].style.zIndex, 10) > parseInt(g[0].style.zIndex, 10), b || e.closest(V)[0] === g[0] || c(e)
                }
            }

            var f, g, h, i = this, j = {};
            d.extend(i, {
                init: function () {
                    return h = i.elem = d("<div />", {
                        id: "qtip-overlay", html: "<div></div>", mousedown: function () {
                            return D
                        }
                    }).hide(), d(b.body).bind("focusin" + ya, e), d(b).bind("keydown" + ya, function (a) {
                        f && f.options.show.modal.escape && 27 === a.keyCode && f.hide(a)
                    }), h.bind("click" + ya, function (a) {
                        f && f.options.show.modal.blur && f.hide(a)
                    }), i
                }, update: function (b) {
                    f = b, j = b.options.show.modal.stealfocus !== D ? b.tooltip.find("*").filter(function () {
                        return a(this)
                    }) : []
                }, toggle: function (a, e, j) {
                    var k = a.tooltip, l = a.options.show.modal, m = l.effect, n = e ? "show" : "hide",
                        o = h.is(":visible"), p = d(ya).filter(":visible:not(:animated)").not(k);
                    return i.update(a), e && l.stealfocus !== D && c(d(":focus")), h.toggleClass("blurs", l.blur), e && h.appendTo(b.body), h.is(":animated") && o === e && g !== D || !e && p.length ? i : (h.stop(C, D), d.isFunction(m) ? m.call(h, e) : m === D ? h[n]() : h.fadeTo(parseInt(j, 10) || 90, e ? 1 : 0, function () {
                        e || h.hide()
                    }), e || h.queue(function (a) {
                        h.css({left: "", top: ""}), d(ya).length || h.detach(), a()
                    }), g = e, f.destroyed && (f = E), i)
                }
            }), i.init()
        }, wa = new wa, d.extend(w.prototype, {
            init: function (a) {
                var b = a.tooltip;
                return this.options.on ? (a.elements.overlay = wa.elem, b.addClass(xa).css("z-index", x.modal_zindex + d(ya).length), a._bind(b, ["tooltipshow", "tooltiphide"], function (a, c, e) {
                    var f = a.originalEvent;
                    if (a.target === b[0]) if (f && "tooltiphide" === a.type && /mouse(leave|enter)/.test(f.type) && d(f.relatedTarget).closest(wa.elem[0]).length) try {
                        a.preventDefault()
                    } catch (g) {
                    } else (!f || f && "tooltipsolo" !== f.type) && this.toggle(a, "tooltipshow" === a.type, e)
                }, this._ns, this), a._bind(b, "tooltipfocus", function (a, c) {
                    if (!a.isDefaultPrevented() && a.target === b[0]) {
                        var e = d(ya), f = x.modal_zindex + e.length, g = parseInt(b[0].style.zIndex, 10);
                        wa.elem[0].style.zIndex = f - 1, e.each(function () {
                            this.style.zIndex > g && (this.style.zIndex -= 1)
                        }), e.filter("." + Z).qtip("blur", a.originalEvent), b.addClass(Z)[0].style.zIndex = f, wa.update(c);
                        try {
                            a.preventDefault()
                        } catch (h) {
                        }
                    }
                }, this._ns, this), void a._bind(b, "tooltiphide", function (a) {
                    a.target === b[0] && d(ya).filter(":visible").not(b).last().qtip("focus", a)
                }, this._ns, this)) : this
            }, toggle: function (a, b, c) {
                return a && a.isDefaultPrevented() ? this : void wa.toggle(this.qtip, !!b, c)
            }, destroy: function () {
                this.qtip.tooltip.removeClass(xa), this.qtip._unbind(this.qtip.tooltip, this._ns), wa.toggle(this.qtip, D), delete this.qtip.elements.overlay
            }
        }), va = Q.modal = function (a) {
            return new w(a, a.options.show.modal)
        }, va.sanitize = function (a) {
            a.show && ("object" != typeof a.show.modal ? a.show.modal = {on: !!a.show.modal} : "undefined" == typeof a.show.modal.on && (a.show.modal.on = C))
        }, x.modal_zindex = x.zindex - 200, va.initialize = "render", A.modal = {
            "^show.modal.(on|blur)$": function () {
                this.destroy(), this.init(), this.qtip.elems.overlay.toggle(this.qtip.tooltip[0].offsetWidth > 0)
            }
        }, d.extend(C, x.defaults, {show: {modal: {on: D, effect: C, blur: C, stealfocus: C, escape: C}}})
    })
}(window, document);
//# sourceMappingURL=jquery.qtip.min.map
//! moment.js
//! version : 2.18.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function (a, b) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define('moment', b) : a.moment = b()
}(this, function () {
    "use strict";

    function a() {
        return sd.apply(null, arguments)
    }

    function b(a) {
        sd = a
    }

    function c(a) {
        return a instanceof Array || "[object Array]" === Object.prototype.toString.call(a)
    }

    function d(a) {
        return null != a && "[object Object]" === Object.prototype.toString.call(a)
    }

    function e(a) {
        var b;
        for (b in a) return !1;
        return !0
    }

    function f(a) {
        return void 0 === a
    }

    function g(a) {
        return "number" == typeof a || "[object Number]" === Object.prototype.toString.call(a)
    }

    function h(a) {
        return a instanceof Date || "[object Date]" === Object.prototype.toString.call(a)
    }

    function i(a, b) {
        var c, d = [];
        for (c = 0; c < a.length; ++c) d.push(b(a[c], c));
        return d
    }

    function j(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }

    function k(a, b) {
        for (var c in b) j(b, c) && (a[c] = b[c]);
        return j(b, "toString") && (a.toString = b.toString), j(b, "valueOf") && (a.valueOf = b.valueOf), a
    }

    function l(a, b, c, d) {
        return sb(a, b, c, d, !0).utc()
    }

    function m() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1,
            parsedDateParts: [],
            meridiem: null,
            rfc2822: !1,
            weekdayMismatch: !1
        }
    }

    function n(a) {
        return null == a._pf && (a._pf = m()), a._pf
    }

    function o(a) {
        if (null == a._isValid) {
            var b = n(a), c = ud.call(b.parsedDateParts, function (a) {
                    return null != a
                }),
                d = !isNaN(a._d.getTime()) && b.overflow < 0 && !b.empty && !b.invalidMonth && !b.invalidWeekday && !b.nullInput && !b.invalidFormat && !b.userInvalidated && (!b.meridiem || b.meridiem && c);
            if (a._strict && (d = d && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour), null != Object.isFrozen && Object.isFrozen(a)) return d;
            a._isValid = d
        }
        return a._isValid
    }

    function p(a) {
        var b = l(NaN);
        return null != a ? k(n(b), a) : n(b).userInvalidated = !0, b
    }

    function q(a, b) {
        var c, d, e;
        if (f(b._isAMomentObject) || (a._isAMomentObject = b._isAMomentObject), f(b._i) || (a._i = b._i), f(b._f) || (a._f = b._f), f(b._l) || (a._l = b._l), f(b._strict) || (a._strict = b._strict), f(b._tzm) || (a._tzm = b._tzm), f(b._isUTC) || (a._isUTC = b._isUTC), f(b._offset) || (a._offset = b._offset), f(b._pf) || (a._pf = n(b)), f(b._locale) || (a._locale = b._locale), vd.length > 0) for (c = 0; c < vd.length; c++) d = vd[c], e = b[d], f(e) || (a[d] = e);
        return a
    }

    function r(b) {
        q(this, b), this._d = new Date(null != b._d ? b._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), wd === !1 && (wd = !0, a.updateOffset(this), wd = !1)
    }

    function s(a) {
        return a instanceof r || null != a && null != a._isAMomentObject
    }

    function t(a) {
        return a < 0 ? Math.ceil(a) || 0 : Math.floor(a)
    }

    function u(a) {
        var b = +a, c = 0;
        return 0 !== b && isFinite(b) && (c = t(b)), c
    }

    function v(a, b, c) {
        var d, e = Math.min(a.length, b.length), f = Math.abs(a.length - b.length), g = 0;
        for (d = 0; d < e; d++) (c && a[d] !== b[d] || !c && u(a[d]) !== u(b[d])) && g++;
        return g + f
    }

    function w(b) {
        a.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + b)
    }

    function x(b, c) {
        var d = !0;
        return k(function () {
            if (null != a.deprecationHandler && a.deprecationHandler(null, b), d) {
                for (var e, f = [], g = 0; g < arguments.length; g++) {
                    if (e = "", "object" == typeof arguments[g]) {
                        e += "\n[" + g + "] ";
                        for (var h in arguments[0]) e += h + ": " + arguments[0][h] + ", ";
                        e = e.slice(0, -2)
                    } else e = arguments[g];
                    f.push(e)
                }
                w(b + "\nArguments: " + Array.prototype.slice.call(f).join("") + "\n" + (new Error).stack), d = !1
            }
            return c.apply(this, arguments)
        }, c)
    }

    function y(b, c) {
        null != a.deprecationHandler && a.deprecationHandler(b, c), xd[b] || (w(c), xd[b] = !0)
    }

    function z(a) {
        return a instanceof Function || "[object Function]" === Object.prototype.toString.call(a)
    }

    function A(a) {
        var b, c;
        for (c in a) b = a[c], z(b) ? this[c] = b : this["_" + c] = b;
        this._config = a, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
    }

    function B(a, b) {
        var c, e = k({}, a);
        for (c in b) j(b, c) && (d(a[c]) && d(b[c]) ? (e[c] = {}, k(e[c], a[c]), k(e[c], b[c])) : null != b[c] ? e[c] = b[c] : delete e[c]);
        for (c in a) j(a, c) && !j(b, c) && d(a[c]) && (e[c] = k({}, e[c]));
        return e
    }

    function C(a) {
        null != a && this.set(a)
    }

    function D(a, b, c) {
        var d = this._calendar[a] || this._calendar.sameElse;
        return z(d) ? d.call(b, c) : d
    }

    function E(a) {
        var b = this._longDateFormat[a], c = this._longDateFormat[a.toUpperCase()];
        return b || !c ? b : (this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g, function (a) {
            return a.slice(1)
        }), this._longDateFormat[a])
    }

    function F() {
        return this._invalidDate
    }

    function G(a) {
        return this._ordinal.replace("%d", a)
    }

    function H(a, b, c, d) {
        var e = this._relativeTime[c];
        return z(e) ? e(a, b, c, d) : e.replace(/%d/i, a)
    }

    function I(a, b) {
        var c = this._relativeTime[a > 0 ? "future" : "past"];
        return z(c) ? c(b) : c.replace(/%s/i, b)
    }

    function J(a, b) {
        var c = a.toLowerCase();
        Hd[c] = Hd[c + "s"] = Hd[b] = a
    }

    function K(a) {
        return "string" == typeof a ? Hd[a] || Hd[a.toLowerCase()] : void 0
    }

    function L(a) {
        var b, c, d = {};
        for (c in a) j(a, c) && (b = K(c), b && (d[b] = a[c]));
        return d
    }

    function M(a, b) {
        Id[a] = b
    }

    function N(a) {
        var b = [];
        for (var c in a) b.push({unit: c, priority: Id[c]});
        return b.sort(function (a, b) {
            return a.priority - b.priority
        }), b
    }

    function O(b, c) {
        return function (d) {
            return null != d ? (Q(this, b, d), a.updateOffset(this, c), this) : P(this, b)
        }
    }

    function P(a, b) {
        return a.isValid() ? a._d["get" + (a._isUTC ? "UTC" : "") + b]() : NaN
    }

    function Q(a, b, c) {
        a.isValid() && a._d["set" + (a._isUTC ? "UTC" : "") + b](c)
    }

    function R(a) {
        return a = K(a), z(this[a]) ? this[a]() : this
    }

    function S(a, b) {
        if ("object" == typeof a) {
            a = L(a);
            for (var c = N(a), d = 0; d < c.length; d++) this[c[d].unit](a[c[d].unit])
        } else if (a = K(a), z(this[a])) return this[a](b);
        return this
    }

    function T(a, b, c) {
        var d = "" + Math.abs(a), e = b - d.length, f = a >= 0;
        return (f ? c ? "+" : "" : "-") + Math.pow(10, Math.max(0, e)).toString().substr(1) + d
    }

    function U(a, b, c, d) {
        var e = d;
        "string" == typeof d && (e = function () {
            return this[d]()
        }), a && (Md[a] = e), b && (Md[b[0]] = function () {
            return T(e.apply(this, arguments), b[1], b[2])
        }), c && (Md[c] = function () {
            return this.localeData().ordinal(e.apply(this, arguments), a)
        })
    }

    function V(a) {
        return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
    }

    function W(a) {
        var b, c, d = a.match(Jd);
        for (b = 0, c = d.length; b < c; b++) Md[d[b]] ? d[b] = Md[d[b]] : d[b] = V(d[b]);
        return function (b) {
            var e, f = "";
            for (e = 0; e < c; e++) f += z(d[e]) ? d[e].call(b, a) : d[e];
            return f
        }
    }

    function X(a, b) {
        return a.isValid() ? (b = Y(b, a.localeData()), Ld[b] = Ld[b] || W(b), Ld[b](a)) : a.localeData().invalidDate()
    }

    function Y(a, b) {
        function c(a) {
            return b.longDateFormat(a) || a
        }

        var d = 5;
        for (Kd.lastIndex = 0; d >= 0 && Kd.test(a);) a = a.replace(Kd, c), Kd.lastIndex = 0, d -= 1;
        return a
    }

    function Z(a, b, c) {
        ce[a] = z(b) ? b : function (a, d) {
            return a && c ? c : b
        }
    }

    function $(a, b) {
        return j(ce, a) ? ce[a](b._strict, b._locale) : new RegExp(_(a))
    }

    function _(a) {
        return aa(a.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (a, b, c, d, e) {
            return b || c || d || e
        }))
    }

    function aa(a) {
        return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }

    function ba(a, b) {
        var c, d = b;
        for ("string" == typeof a && (a = [a]), g(b) && (d = function (a, c) {
            c[b] = u(a)
        }), c = 0; c < a.length; c++) de[a[c]] = d
    }

    function ca(a, b) {
        ba(a, function (a, c, d, e) {
            d._w = d._w || {}, b(a, d._w, d, e)
        })
    }

    function da(a, b, c) {
        null != b && j(de, a) && de[a](b, c._a, c, a)
    }

    function ea(a, b) {
        return new Date(Date.UTC(a, b + 1, 0)).getUTCDate()
    }

    function fa(a, b) {
        return a ? c(this._months) ? this._months[a.month()] : this._months[(this._months.isFormat || oe).test(b) ? "format" : "standalone"][a.month()] : c(this._months) ? this._months : this._months.standalone
    }

    function ga(a, b) {
        return a ? c(this._monthsShort) ? this._monthsShort[a.month()] : this._monthsShort[oe.test(b) ? "format" : "standalone"][a.month()] : c(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
    }

    function ha(a, b, c) {
        var d, e, f, g = a.toLocaleLowerCase();
        if (!this._monthsParse) for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], d = 0; d < 12; ++d) f = l([2e3, d]), this._shortMonthsParse[d] = this.monthsShort(f, "").toLocaleLowerCase(), this._longMonthsParse[d] = this.months(f, "").toLocaleLowerCase();
        return c ? "MMM" === b ? (e = ne.call(this._shortMonthsParse, g), e !== -1 ? e : null) : (e = ne.call(this._longMonthsParse, g), e !== -1 ? e : null) : "MMM" === b ? (e = ne.call(this._shortMonthsParse, g), e !== -1 ? e : (e = ne.call(this._longMonthsParse, g), e !== -1 ? e : null)) : (e = ne.call(this._longMonthsParse, g), e !== -1 ? e : (e = ne.call(this._shortMonthsParse, g), e !== -1 ? e : null))
    }

    function ia(a, b, c) {
        var d, e, f;
        if (this._monthsParseExact) return ha.call(this, a, b, c);
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; d < 12; d++) {
            if (e = l([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a)) return d;
            if (c && "MMM" === b && this._shortMonthsParse[d].test(a)) return d;
            if (!c && this._monthsParse[d].test(a)) return d
        }
    }

    function ja(a, b) {
        var c;
        if (!a.isValid()) return a;
        if ("string" == typeof b) if (/^\d+$/.test(b)) b = u(b); else if (b = a.localeData().monthsParse(b), !g(b)) return a;
        return c = Math.min(a.date(), ea(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a
    }

    function ka(b) {
        return null != b ? (ja(this, b), a.updateOffset(this, !0), this) : P(this, "Month")
    }

    function la() {
        return ea(this.year(), this.month())
    }

    function ma(a) {
        return this._monthsParseExact ? (j(this, "_monthsRegex") || oa.call(this), a ? this._monthsShortStrictRegex : this._monthsShortRegex) : (j(this, "_monthsShortRegex") || (this._monthsShortRegex = re), this._monthsShortStrictRegex && a ? this._monthsShortStrictRegex : this._monthsShortRegex)
    }

    function na(a) {
        return this._monthsParseExact ? (j(this, "_monthsRegex") || oa.call(this), a ? this._monthsStrictRegex : this._monthsRegex) : (j(this, "_monthsRegex") || (this._monthsRegex = se), this._monthsStrictRegex && a ? this._monthsStrictRegex : this._monthsRegex)
    }

    function oa() {
        function a(a, b) {
            return b.length - a.length
        }

        var b, c, d = [], e = [], f = [];
        for (b = 0; b < 12; b++) c = l([2e3, b]), d.push(this.monthsShort(c, "")), e.push(this.months(c, "")), f.push(this.months(c, "")), f.push(this.monthsShort(c, ""));
        for (d.sort(a), e.sort(a), f.sort(a), b = 0; b < 12; b++) d[b] = aa(d[b]), e[b] = aa(e[b]);
        for (b = 0; b < 24; b++) f[b] = aa(f[b]);
        this._monthsRegex = new RegExp("^(" + f.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + d.join("|") + ")", "i")
    }

    function pa(a) {
        return qa(a) ? 366 : 365
    }

    function qa(a) {
        return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
    }

    function ra() {
        return qa(this.year())
    }

    function sa(a, b, c, d, e, f, g) {
        var h = new Date(a, b, c, d, e, f, g);
        return a < 100 && a >= 0 && isFinite(h.getFullYear()) && h.setFullYear(a), h
    }

    function ta(a) {
        var b = new Date(Date.UTC.apply(null, arguments));
        return a < 100 && a >= 0 && isFinite(b.getUTCFullYear()) && b.setUTCFullYear(a), b
    }

    function ua(a, b, c) {
        var d = 7 + b - c, e = (7 + ta(a, 0, d).getUTCDay() - b) % 7;
        return -e + d - 1
    }

    function va(a, b, c, d, e) {
        var f, g, h = (7 + c - d) % 7, i = ua(a, d, e), j = 1 + 7 * (b - 1) + h + i;
        return j <= 0 ? (f = a - 1, g = pa(f) + j) : j > pa(a) ? (f = a + 1, g = j - pa(a)) : (f = a, g = j), {
            year: f,
            dayOfYear: g
        }
    }

    function wa(a, b, c) {
        var d, e, f = ua(a.year(), b, c), g = Math.floor((a.dayOfYear() - f - 1) / 7) + 1;
        return g < 1 ? (e = a.year() - 1, d = g + xa(e, b, c)) : g > xa(a.year(), b, c) ? (d = g - xa(a.year(), b, c), e = a.year() + 1) : (e = a.year(), d = g), {
            week: d,
            year: e
        }
    }

    function xa(a, b, c) {
        var d = ua(a, b, c), e = ua(a + 1, b, c);
        return (pa(a) - d + e) / 7
    }

    function ya(a) {
        return wa(a, this._week.dow, this._week.doy).week
    }

    function za() {
        return this._week.dow
    }

    function Aa() {
        return this._week.doy
    }

    function Ba(a) {
        var b = this.localeData().week(this);
        return null == a ? b : this.add(7 * (a - b), "d")
    }

    function Ca(a) {
        var b = wa(this, 1, 4).week;
        return null == a ? b : this.add(7 * (a - b), "d")
    }

    function Da(a, b) {
        return "string" != typeof a ? a : isNaN(a) ? (a = b.weekdaysParse(a), "number" == typeof a ? a : null) : parseInt(a, 10)
    }

    function Ea(a, b) {
        return "string" == typeof a ? b.weekdaysParse(a) % 7 || 7 : isNaN(a) ? null : a
    }

    function Fa(a, b) {
        return a ? c(this._weekdays) ? this._weekdays[a.day()] : this._weekdays[this._weekdays.isFormat.test(b) ? "format" : "standalone"][a.day()] : c(this._weekdays) ? this._weekdays : this._weekdays.standalone
    }

    function Ga(a) {
        return a ? this._weekdaysShort[a.day()] : this._weekdaysShort
    }

    function Ha(a) {
        return a ? this._weekdaysMin[a.day()] : this._weekdaysMin
    }

    function Ia(a, b, c) {
        var d, e, f, g = a.toLocaleLowerCase();
        if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], d = 0; d < 7; ++d) f = l([2e3, 1]).day(d), this._minWeekdaysParse[d] = this.weekdaysMin(f, "").toLocaleLowerCase(), this._shortWeekdaysParse[d] = this.weekdaysShort(f, "").toLocaleLowerCase(), this._weekdaysParse[d] = this.weekdays(f, "").toLocaleLowerCase();
        return c ? "dddd" === b ? (e = ne.call(this._weekdaysParse, g), e !== -1 ? e : null) : "ddd" === b ? (e = ne.call(this._shortWeekdaysParse, g), e !== -1 ? e : null) : (e = ne.call(this._minWeekdaysParse, g), e !== -1 ? e : null) : "dddd" === b ? (e = ne.call(this._weekdaysParse, g), e !== -1 ? e : (e = ne.call(this._shortWeekdaysParse, g), e !== -1 ? e : (e = ne.call(this._minWeekdaysParse, g), e !== -1 ? e : null))) : "ddd" === b ? (e = ne.call(this._shortWeekdaysParse, g), e !== -1 ? e : (e = ne.call(this._weekdaysParse, g), e !== -1 ? e : (e = ne.call(this._minWeekdaysParse, g), e !== -1 ? e : null))) : (e = ne.call(this._minWeekdaysParse, g), e !== -1 ? e : (e = ne.call(this._weekdaysParse, g), e !== -1 ? e : (e = ne.call(this._shortWeekdaysParse, g), e !== -1 ? e : null)))
    }

    function Ja(a, b, c) {
        var d, e, f;
        if (this._weekdaysParseExact) return Ia.call(this, a, b, c);
        for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), d = 0; d < 7; d++) {
            if (e = l([2e3, 1]).day(d), c && !this._fullWeekdaysParse[d] && (this._fullWeekdaysParse[d] = new RegExp("^" + this.weekdays(e, "").replace(".", ".?") + "$", "i"), this._shortWeekdaysParse[d] = new RegExp("^" + this.weekdaysShort(e, "").replace(".", ".?") + "$", "i"), this._minWeekdaysParse[d] = new RegExp("^" + this.weekdaysMin(e, "").replace(".", ".?") + "$", "i")), this._weekdaysParse[d] || (f = "^" + this.weekdays(e, "") + "|^" + this.weekdaysShort(e, "") + "|^" + this.weekdaysMin(e, ""), this._weekdaysParse[d] = new RegExp(f.replace(".", ""), "i")), c && "dddd" === b && this._fullWeekdaysParse[d].test(a)) return d;
            if (c && "ddd" === b && this._shortWeekdaysParse[d].test(a)) return d;
            if (c && "dd" === b && this._minWeekdaysParse[d].test(a)) return d;
            if (!c && this._weekdaysParse[d].test(a)) return d
        }
    }

    function Ka(a) {
        if (!this.isValid()) return null != a ? this : NaN;
        var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != a ? (a = Da(a, this.localeData()), this.add(a - b, "d")) : b
    }

    function La(a) {
        if (!this.isValid()) return null != a ? this : NaN;
        var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == a ? b : this.add(a - b, "d")
    }

    function Ma(a) {
        if (!this.isValid()) return null != a ? this : NaN;
        if (null != a) {
            var b = Ea(a, this.localeData());
            return this.day(this.day() % 7 ? b : b - 7)
        }
        return this.day() || 7
    }

    function Na(a) {
        return this._weekdaysParseExact ? (j(this, "_weekdaysRegex") || Qa.call(this), a ? this._weekdaysStrictRegex : this._weekdaysRegex) : (j(this, "_weekdaysRegex") || (this._weekdaysRegex = ye), this._weekdaysStrictRegex && a ? this._weekdaysStrictRegex : this._weekdaysRegex)
    }

    function Oa(a) {
        return this._weekdaysParseExact ? (j(this, "_weekdaysRegex") || Qa.call(this), a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (j(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = ze), this._weekdaysShortStrictRegex && a ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
    }

    function Pa(a) {
        return this._weekdaysParseExact ? (j(this, "_weekdaysRegex") || Qa.call(this), a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (j(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Ae), this._weekdaysMinStrictRegex && a ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
    }

    function Qa() {
        function a(a, b) {
            return b.length - a.length
        }

        var b, c, d, e, f, g = [], h = [], i = [], j = [];
        for (b = 0; b < 7; b++) c = l([2e3, 1]).day(b), d = this.weekdaysMin(c, ""), e = this.weekdaysShort(c, ""), f = this.weekdays(c, ""), g.push(d), h.push(e), i.push(f), j.push(d), j.push(e), j.push(f);
        for (g.sort(a), h.sort(a), i.sort(a), j.sort(a), b = 0; b < 7; b++) h[b] = aa(h[b]), i[b] = aa(i[b]), j[b] = aa(j[b]);
        this._weekdaysRegex = new RegExp("^(" + j.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + h.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + g.join("|") + ")", "i")
    }

    function Ra() {
        return this.hours() % 12 || 12
    }

    function Sa() {
        return this.hours() || 24
    }

    function Ta(a, b) {
        U(a, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), b)
        })
    }

    function Ua(a, b) {
        return b._meridiemParse
    }

    function Va(a) {
        return "p" === (a + "").toLowerCase().charAt(0)
    }

    function Wa(a, b, c) {
        return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
    }

    function Xa(a) {
        return a ? a.toLowerCase().replace("_", "-") : a
    }

    function Ya(a) {
        for (var b, c, d, e, f = 0; f < a.length;) {
            for (e = Xa(a[f]).split("-"), b = e.length, c = Xa(a[f + 1]), c = c ? c.split("-") : null; b > 0;) {
                if (d = Za(e.slice(0, b).join("-"))) return d;
                if (c && c.length >= b && v(e, c, !0) >= b - 1) break;
                b--
            }
            f++
        }
        return null
    }

    function Za(a) {
        var b = null;
        if (!Fe[a] && "undefined" != typeof module && module && module.exports) try {
            b = Be._abbr, require("./locale/" + a), $a(b)
        } catch (a) {
        }
        return Fe[a]
    }

    function $a(a, b) {
        var c;
        return a && (c = f(b) ? bb(a) : _a(a, b), c && (Be = c)), Be._abbr
    }

    function _a(a, b) {
        if (null !== b) {
            var c = Ee;
            if (b.abbr = a, null != Fe[a]) y("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), c = Fe[a]._config; else if (null != b.parentLocale) {
                if (null == Fe[b.parentLocale]) return Ge[b.parentLocale] || (Ge[b.parentLocale] = []), Ge[b.parentLocale].push({
                    name: a,
                    config: b
                }), null;
                c = Fe[b.parentLocale]._config
            }
            return Fe[a] = new C(B(c, b)), Ge[a] && Ge[a].forEach(function (a) {
                _a(a.name, a.config)
            }), $a(a), Fe[a]
        }
        return delete Fe[a], null
    }

    function ab(a, b) {
        if (null != b) {
            var c, d = Ee;
            null != Fe[a] && (d = Fe[a]._config), b = B(d, b), c = new C(b), c.parentLocale = Fe[a], Fe[a] = c, $a(a)
        } else null != Fe[a] && (null != Fe[a].parentLocale ? Fe[a] = Fe[a].parentLocale : null != Fe[a] && delete Fe[a]);
        return Fe[a]
    }

    function bb(a) {
        var b;
        if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a) return Be;
        if (!c(a)) {
            if (b = Za(a)) return b;
            a = [a]
        }
        return Ya(a)
    }

    function cb() {
        return Ad(Fe)
    }

    function db(a) {
        var b, c = a._a;
        return c && n(a).overflow === -2 && (b = c[fe] < 0 || c[fe] > 11 ? fe : c[ge] < 1 || c[ge] > ea(c[ee], c[fe]) ? ge : c[he] < 0 || c[he] > 24 || 24 === c[he] && (0 !== c[ie] || 0 !== c[je] || 0 !== c[ke]) ? he : c[ie] < 0 || c[ie] > 59 ? ie : c[je] < 0 || c[je] > 59 ? je : c[ke] < 0 || c[ke] > 999 ? ke : -1, n(a)._overflowDayOfYear && (b < ee || b > ge) && (b = ge), n(a)._overflowWeeks && b === -1 && (b = le), n(a)._overflowWeekday && b === -1 && (b = me), n(a).overflow = b), a
    }

    function eb(a) {
        var b, c, d, e, f, g, h = a._i, i = He.exec(h) || Ie.exec(h);
        if (i) {
            for (n(a).iso = !0, b = 0, c = Ke.length; b < c; b++) if (Ke[b][1].exec(i[1])) {
                e = Ke[b][0], d = Ke[b][2] !== !1;
                break
            }
            if (null == e) return void(a._isValid = !1);
            if (i[3]) {
                for (b = 0, c = Le.length; b < c; b++) if (Le[b][1].exec(i[3])) {
                    f = (i[2] || " ") + Le[b][0];
                    break
                }
                if (null == f) return void(a._isValid = !1)
            }
            if (!d && null != f) return void(a._isValid = !1);
            if (i[4]) {
                if (!Je.exec(i[4])) return void(a._isValid = !1);
                g = "Z"
            }
            a._f = e + (f || "") + (g || ""), lb(a)
        } else a._isValid = !1
    }

    function fb(a) {
        var b, c, d, e, f, g, h, i, j = {
            " GMT": " +0000",
            " EDT": " -0400",
            " EST": " -0500",
            " CDT": " -0500",
            " CST": " -0600",
            " MDT": " -0600",
            " MST": " -0700",
            " PDT": " -0700",
            " PST": " -0800"
        }, k = "YXWVUTSRQPONZABCDEFGHIKLM";
        if (b = a._i.replace(/\([^\)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s|\s$/g, ""), c = Ne.exec(b)) {
            if (d = c[1] ? "ddd" + (5 === c[1].length ? ", " : " ") : "", e = "D MMM " + (c[2].length > 10 ? "YYYY " : "YY "), f = "HH:mm" + (c[4] ? ":ss" : ""), c[1]) {
                var l = new Date(c[2]), m = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][l.getDay()];
                if (c[1].substr(0, 3) !== m) return n(a).weekdayMismatch = !0, void(a._isValid = !1)
            }
            switch (c[5].length) {
                case 2:
                    0 === i ? h = " +0000" : (i = k.indexOf(c[5][1].toUpperCase()) - 12, h = (i < 0 ? " -" : " +") + ("" + i).replace(/^-?/, "0").match(/..$/)[0] + "00");
                    break;
                case 4:
                    h = j[c[5]];
                    break;
                default:
                    h = j[" GMT"]
            }
            c[5] = h, a._i = c.splice(1).join(""), g = " ZZ", a._f = d + e + f + g, lb(a), n(a).rfc2822 = !0
        } else a._isValid = !1
    }

    function gb(b) {
        var c = Me.exec(b._i);
        return null !== c ? void(b._d = new Date(+c[1])) : (eb(b), void(b._isValid === !1 && (delete b._isValid, fb(b), b._isValid === !1 && (delete b._isValid, a.createFromInputFallback(b)))))
    }

    function hb(a, b, c) {
        return null != a ? a : null != b ? b : c
    }

    function ib(b) {
        var c = new Date(a.now());
        return b._useUTC ? [c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()] : [c.getFullYear(), c.getMonth(), c.getDate()]
    }

    function jb(a) {
        var b, c, d, e, f = [];
        if (!a._d) {
            for (d = ib(a), a._w && null == a._a[ge] && null == a._a[fe] && kb(a), null != a._dayOfYear && (e = hb(a._a[ee], d[ee]), (a._dayOfYear > pa(e) || 0 === a._dayOfYear) && (n(a)._overflowDayOfYear = !0), c = ta(e, 0, a._dayOfYear), a._a[fe] = c.getUTCMonth(), a._a[ge] = c.getUTCDate()), b = 0; b < 3 && null == a._a[b]; ++b) a._a[b] = f[b] = d[b];
            for (; b < 7; b++) a._a[b] = f[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
            24 === a._a[he] && 0 === a._a[ie] && 0 === a._a[je] && 0 === a._a[ke] && (a._nextDay = !0, a._a[he] = 0), a._d = (a._useUTC ? ta : sa).apply(null, f), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), a._nextDay && (a._a[he] = 24)
        }
    }

    function kb(a) {
        var b, c, d, e, f, g, h, i;
        if (b = a._w, null != b.GG || null != b.W || null != b.E) f = 1, g = 4, c = hb(b.GG, a._a[ee], wa(tb(), 1, 4).year), d = hb(b.W, 1), e = hb(b.E, 1), (e < 1 || e > 7) && (i = !0); else {
            f = a._locale._week.dow, g = a._locale._week.doy;
            var j = wa(tb(), f, g);
            c = hb(b.gg, a._a[ee], j.year), d = hb(b.w, j.week), null != b.d ? (e = b.d, (e < 0 || e > 6) && (i = !0)) : null != b.e ? (e = b.e + f, (b.e < 0 || b.e > 6) && (i = !0)) : e = f
        }
        d < 1 || d > xa(c, f, g) ? n(a)._overflowWeeks = !0 : null != i ? n(a)._overflowWeekday = !0 : (h = va(c, d, e, f, g), a._a[ee] = h.year, a._dayOfYear = h.dayOfYear)
    }

    function lb(b) {
        if (b._f === a.ISO_8601) return void eb(b);
        if (b._f === a.RFC_2822) return void fb(b);
        b._a = [], n(b).empty = !0;
        var c, d, e, f, g, h = "" + b._i, i = h.length, j = 0;
        for (e = Y(b._f, b._locale).match(Jd) || [], c = 0; c < e.length; c++) f = e[c], d = (h.match($(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && n(b).unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), j += d.length), Md[f] ? (d ? n(b).empty = !1 : n(b).unusedTokens.push(f), da(f, d, b)) : b._strict && !d && n(b).unusedTokens.push(f);
        n(b).charsLeftOver = i - j, h.length > 0 && n(b).unusedInput.push(h), b._a[he] <= 12 && n(b).bigHour === !0 && b._a[he] > 0 && (n(b).bigHour = void 0), n(b).parsedDateParts = b._a.slice(0), n(b).meridiem = b._meridiem, b._a[he] = mb(b._locale, b._a[he], b._meridiem), jb(b), db(b)
    }

    function mb(a, b, c) {
        var d;
        return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && b < 12 && (b += 12), d || 12 !== b || (b = 0), b) : b
    }

    function nb(a) {
        var b, c, d, e, f;
        if (0 === a._f.length) return n(a).invalidFormat = !0, void(a._d = new Date(NaN));
        for (e = 0; e < a._f.length; e++) f = 0, b = q({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._f = a._f[e], lb(b), o(b) && (f += n(b).charsLeftOver, f += 10 * n(b).unusedTokens.length, n(b).score = f, (null == d || f < d) && (d = f, c = b));
        k(a, c || b)
    }

    function ob(a) {
        if (!a._d) {
            var b = L(a._i);
            a._a = i([b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], function (a) {
                return a && parseInt(a, 10)
            }), jb(a)
        }
    }

    function pb(a) {
        var b = new r(db(qb(a)));
        return b._nextDay && (b.add(1, "d"), b._nextDay = void 0), b
    }

    function qb(a) {
        var b = a._i, d = a._f;
        return a._locale = a._locale || bb(a._l), null === b || void 0 === d && "" === b ? p({nullInput: !0}) : ("string" == typeof b && (a._i = b = a._locale.preparse(b)), s(b) ? new r(db(b)) : (h(b) ? a._d = b : c(d) ? nb(a) : d ? lb(a) : rb(a), o(a) || (a._d = null), a))
    }

    function rb(b) {
        var e = b._i;
        f(e) ? b._d = new Date(a.now()) : h(e) ? b._d = new Date(e.valueOf()) : "string" == typeof e ? gb(b) : c(e) ? (b._a = i(e.slice(0), function (a) {
            return parseInt(a, 10)
        }), jb(b)) : d(e) ? ob(b) : g(e) ? b._d = new Date(e) : a.createFromInputFallback(b)
    }

    function sb(a, b, f, g, h) {
        var i = {};
        return f !== !0 && f !== !1 || (g = f, f = void 0), (d(a) && e(a) || c(a) && 0 === a.length) && (a = void 0), i._isAMomentObject = !0, i._useUTC = i._isUTC = h, i._l = f, i._i = a, i._f = b, i._strict = g, pb(i)
    }

    function tb(a, b, c, d) {
        return sb(a, b, c, d, !1)
    }

    function ub(a, b) {
        var d, e;
        if (1 === b.length && c(b[0]) && (b = b[0]), !b.length) return tb();
        for (d = b[0], e = 1; e < b.length; ++e) b[e].isValid() && !b[e][a](d) || (d = b[e]);
        return d
    }

    function vb() {
        var a = [].slice.call(arguments, 0);
        return ub("isBefore", a)
    }

    function wb() {
        var a = [].slice.call(arguments, 0);
        return ub("isAfter", a)
    }

    function xb(a) {
        for (var b in a) if (Re.indexOf(b) === -1 || null != a[b] && isNaN(a[b])) return !1;
        for (var c = !1, d = 0; d < Re.length; ++d) if (a[Re[d]]) {
            if (c) return !1;
            parseFloat(a[Re[d]]) !== u(a[Re[d]]) && (c = !0)
        }
        return !0
    }

    function yb() {
        return this._isValid
    }

    function zb() {
        return Sb(NaN)
    }

    function Ab(a) {
        var b = L(a), c = b.year || 0, d = b.quarter || 0, e = b.month || 0, f = b.week || 0, g = b.day || 0,
            h = b.hour || 0, i = b.minute || 0, j = b.second || 0, k = b.millisecond || 0;
        this._isValid = xb(b), this._milliseconds = +k + 1e3 * j + 6e4 * i + 1e3 * h * 60 * 60, this._days = +g + 7 * f, this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = bb(), this._bubble()
    }

    function Bb(a) {
        return a instanceof Ab
    }

    function Cb(a) {
        return a < 0 ? Math.round(-1 * a) * -1 : Math.round(a)
    }

    function Db(a, b) {
        U(a, 0, 0, function () {
            var a = this.utcOffset(), c = "+";
            return a < 0 && (a = -a, c = "-"), c + T(~~(a / 60), 2) + b + T(~~a % 60, 2)
        })
    }

    function Eb(a, b) {
        var c = (b || "").match(a);
        if (null === c) return null;
        var d = c[c.length - 1] || [], e = (d + "").match(Se) || ["-", 0, 0], f = +(60 * e[1]) + u(e[2]);
        return 0 === f ? 0 : "+" === e[0] ? f : -f
    }

    function Fb(b, c) {
        var d, e;
        return c._isUTC ? (d = c.clone(), e = (s(b) || h(b) ? b.valueOf() : tb(b).valueOf()) - d.valueOf(), d._d.setTime(d._d.valueOf() + e), a.updateOffset(d, !1), d) : tb(b).local()
    }

    function Gb(a) {
        return 15 * -Math.round(a._d.getTimezoneOffset() / 15)
    }

    function Hb(b, c, d) {
        var e, f = this._offset || 0;
        if (!this.isValid()) return null != b ? this : NaN;
        if (null != b) {
            if ("string" == typeof b) {
                if (b = Eb(_d, b), null === b) return this
            } else Math.abs(b) < 16 && !d && (b = 60 * b);
            return !this._isUTC && c && (e = Gb(this)), this._offset = b, this._isUTC = !0, null != e && this.add(e, "m"), f !== b && (!c || this._changeInProgress ? Xb(this, Sb(b - f, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, a.updateOffset(this, !0), this._changeInProgress = null)), this
        }
        return this._isUTC ? f : Gb(this)
    }

    function Ib(a, b) {
        return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset()
    }

    function Jb(a) {
        return this.utcOffset(0, a)
    }

    function Kb(a) {
        return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(Gb(this), "m")), this
    }

    function Lb() {
        if (null != this._tzm) this.utcOffset(this._tzm, !1, !0); else if ("string" == typeof this._i) {
            var a = Eb($d, this._i);
            null != a ? this.utcOffset(a) : this.utcOffset(0, !0)
        }
        return this
    }

    function Mb(a) {
        return !!this.isValid() && (a = a ? tb(a).utcOffset() : 0, (this.utcOffset() - a) % 60 === 0)
    }

    function Nb() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }

    function Ob() {
        if (!f(this._isDSTShifted)) return this._isDSTShifted;
        var a = {};
        if (q(a, this), a = qb(a), a._a) {
            var b = a._isUTC ? l(a._a) : tb(a._a);
            this._isDSTShifted = this.isValid() && v(a._a, b.toArray()) > 0
        } else this._isDSTShifted = !1;
        return this._isDSTShifted
    }

    function Pb() {
        return !!this.isValid() && !this._isUTC
    }

    function Qb() {
        return !!this.isValid() && this._isUTC
    }

    function Rb() {
        return !!this.isValid() && (this._isUTC && 0 === this._offset)
    }

    function Sb(a, b) {
        var c, d, e, f = a, h = null;
        return Bb(a) ? f = {
            ms: a._milliseconds,
            d: a._days,
            M: a._months
        } : g(a) ? (f = {}, b ? f[b] = a : f.milliseconds = a) : (h = Te.exec(a)) ? (c = "-" === h[1] ? -1 : 1, f = {
            y: 0,
            d: u(h[ge]) * c,
            h: u(h[he]) * c,
            m: u(h[ie]) * c,
            s: u(h[je]) * c,
            ms: u(Cb(1e3 * h[ke])) * c
        }) : (h = Ue.exec(a)) ? (c = "-" === h[1] ? -1 : 1, f = {
            y: Tb(h[2], c),
            M: Tb(h[3], c),
            w: Tb(h[4], c),
            d: Tb(h[5], c),
            h: Tb(h[6], c),
            m: Tb(h[7], c),
            s: Tb(h[8], c)
        }) : null == f ? f = {} : "object" == typeof f && ("from" in f || "to" in f) && (e = Vb(tb(f.from), tb(f.to)), f = {}, f.ms = e.milliseconds, f.M = e.months), d = new Ab(f), Bb(a) && j(a, "_locale") && (d._locale = a._locale), d
    }

    function Tb(a, b) {
        var c = a && parseFloat(a.replace(",", "."));
        return (isNaN(c) ? 0 : c) * b
    }

    function Ub(a, b) {
        var c = {milliseconds: 0, months: 0};
        return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, "M").isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, "M"), c
    }

    function Vb(a, b) {
        var c;
        return a.isValid() && b.isValid() ? (b = Fb(b, a), a.isBefore(b) ? c = Ub(a, b) : (c = Ub(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c) : {
            milliseconds: 0,
            months: 0
        }
    }

    function Wb(a, b) {
        return function (c, d) {
            var e, f;
            return null === d || isNaN(+d) || (y(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), f = c, c = d, d = f), c = "string" == typeof c ? +c : c, e = Sb(c, d), Xb(this, e, a), this
        }
    }

    function Xb(b, c, d, e) {
        var f = c._milliseconds, g = Cb(c._days), h = Cb(c._months);
        b.isValid() && (e = null == e || e, f && b._d.setTime(b._d.valueOf() + f * d), g && Q(b, "Date", P(b, "Date") + g * d), h && ja(b, P(b, "Month") + h * d), e && a.updateOffset(b, g || h))
    }

    function Yb(a, b) {
        var c = a.diff(b, "days", !0);
        return c < -6 ? "sameElse" : c < -1 ? "lastWeek" : c < 0 ? "lastDay" : c < 1 ? "sameDay" : c < 2 ? "nextDay" : c < 7 ? "nextWeek" : "sameElse"
    }

    function Zb(b, c) {
        var d = b || tb(), e = Fb(d, this).startOf("day"), f = a.calendarFormat(this, e) || "sameElse",
            g = c && (z(c[f]) ? c[f].call(this, d) : c[f]);
        return this.format(g || this.localeData().calendar(f, this, tb(d)))
    }

    function $b() {
        return new r(this)
    }

    function _b(a, b) {
        var c = s(a) ? a : tb(a);
        return !(!this.isValid() || !c.isValid()) && (b = K(f(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() > c.valueOf() : c.valueOf() < this.clone().startOf(b).valueOf())
    }

    function ac(a, b) {
        var c = s(a) ? a : tb(a);
        return !(!this.isValid() || !c.isValid()) && (b = K(f(b) ? "millisecond" : b), "millisecond" === b ? this.valueOf() < c.valueOf() : this.clone().endOf(b).valueOf() < c.valueOf())
    }

    function bc(a, b, c, d) {
        return d = d || "()", ("(" === d[0] ? this.isAfter(a, c) : !this.isBefore(a, c)) && (")" === d[1] ? this.isBefore(b, c) : !this.isAfter(b, c))
    }

    function cc(a, b) {
        var c, d = s(a) ? a : tb(a);
        return !(!this.isValid() || !d.isValid()) && (b = K(b || "millisecond"), "millisecond" === b ? this.valueOf() === d.valueOf() : (c = d.valueOf(), this.clone().startOf(b).valueOf() <= c && c <= this.clone().endOf(b).valueOf()))
    }

    function dc(a, b) {
        return this.isSame(a, b) || this.isAfter(a, b)
    }

    function ec(a, b) {
        return this.isSame(a, b) || this.isBefore(a, b)
    }

    function fc(a, b, c) {
        var d, e, f, g;
        return this.isValid() ? (d = Fb(a, this), d.isValid() ? (e = 6e4 * (d.utcOffset() - this.utcOffset()), b = K(b), "year" === b || "month" === b || "quarter" === b ? (g = gc(this, d), "quarter" === b ? g /= 3 : "year" === b && (g /= 12)) : (f = this - d, g = "second" === b ? f / 1e3 : "minute" === b ? f / 6e4 : "hour" === b ? f / 36e5 : "day" === b ? (f - e) / 864e5 : "week" === b ? (f - e) / 6048e5 : f), c ? g : t(g)) : NaN) : NaN
    }

    function gc(a, b) {
        var c, d, e = 12 * (b.year() - a.year()) + (b.month() - a.month()), f = a.clone().add(e, "months");
        return b - f < 0 ? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"), d = (b - f) / (c - f)), -(e + d) || 0
    }

    function hc() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }

    function ic() {
        if (!this.isValid()) return null;
        var a = this.clone().utc();
        return a.year() < 0 || a.year() > 9999 ? X(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : z(Date.prototype.toISOString) ? this.toDate().toISOString() : X(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }

    function jc() {
        if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
        var a = "moment", b = "";
        this.isLocal() || (a = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", b = "Z");
        var c = "[" + a + '("]', d = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
            e = "-MM-DD[T]HH:mm:ss.SSS", f = b + '[")]';
        return this.format(c + d + e + f)
    }

    function kc(b) {
        b || (b = this.isUtc() ? a.defaultFormatUtc : a.defaultFormat);
        var c = X(this, b);
        return this.localeData().postformat(c)
    }

    function lc(a, b) {
        return this.isValid() && (s(a) && a.isValid() || tb(a).isValid()) ? Sb({
            to: this,
            from: a
        }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate()
    }

    function mc(a) {
        return this.from(tb(), a)
    }

    function nc(a, b) {
        return this.isValid() && (s(a) && a.isValid() || tb(a).isValid()) ? Sb({
            from: this,
            to: a
        }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate()
    }

    function oc(a) {
        return this.to(tb(), a)
    }

    function pc(a) {
        var b;
        return void 0 === a ? this._locale._abbr : (b = bb(a), null != b && (this._locale = b), this)
    }

    function qc() {
        return this._locale
    }

    function rc(a) {
        switch (a = K(a)) {
            case"year":
                this.month(0);
            case"quarter":
            case"month":
                this.date(1);
            case"week":
            case"isoWeek":
            case"day":
            case"date":
                this.hours(0);
            case"hour":
                this.minutes(0);
            case"minute":
                this.seconds(0);
            case"second":
                this.milliseconds(0)
        }
        return "week" === a && this.weekday(0), "isoWeek" === a && this.isoWeekday(1), "quarter" === a && this.month(3 * Math.floor(this.month() / 3)), this
    }

    function sc(a) {
        return a = K(a), void 0 === a || "millisecond" === a ? this : ("date" === a && (a = "day"), this.startOf(a).add(1, "isoWeek" === a ? "week" : a).subtract(1, "ms"))
    }

    function tc() {
        return this._d.valueOf() - 6e4 * (this._offset || 0)
    }

    function uc() {
        return Math.floor(this.valueOf() / 1e3)
    }

    function vc() {
        return new Date(this.valueOf())
    }

    function wc() {
        var a = this;
        return [a.year(), a.month(), a.date(), a.hour(), a.minute(), a.second(), a.millisecond()]
    }

    function xc() {
        var a = this;
        return {
            years: a.year(),
            months: a.month(),
            date: a.date(),
            hours: a.hours(),
            minutes: a.minutes(),
            seconds: a.seconds(),
            milliseconds: a.milliseconds()
        }
    }

    function yc() {
        return this.isValid() ? this.toISOString() : null
    }

    function zc() {
        return o(this)
    }

    function Ac() {
        return k({}, n(this))
    }

    function Bc() {
        return n(this).overflow
    }

    function Cc() {
        return {input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict}
    }

    function Dc(a, b) {
        U(0, [a, a.length], 0, b)
    }

    function Ec(a) {
        return Ic.call(this, a, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
    }

    function Fc(a) {
        return Ic.call(this, a, this.isoWeek(), this.isoWeekday(), 1, 4)
    }

    function Gc() {
        return xa(this.year(), 1, 4)
    }

    function Hc() {
        var a = this.localeData()._week;
        return xa(this.year(), a.dow, a.doy)
    }

    function Ic(a, b, c, d, e) {
        var f;
        return null == a ? wa(this, d, e).year : (f = xa(a, d, e), b > f && (b = f), Jc.call(this, a, b, c, d, e))
    }

    function Jc(a, b, c, d, e) {
        var f = va(a, b, c, d, e), g = ta(f.year, 0, f.dayOfYear);
        return this.year(g.getUTCFullYear()), this.month(g.getUTCMonth()), this.date(g.getUTCDate()), this
    }

    function Kc(a) {
        return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3)
    }

    function Lc(a) {
        var b = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == a ? b : this.add(a - b, "d")
    }

    function Mc(a, b) {
        b[ke] = u(1e3 * ("0." + a))
    }

    function Nc() {
        return this._isUTC ? "UTC" : ""
    }

    function Oc() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }

    function Pc(a) {
        return tb(1e3 * a)
    }

    function Qc() {
        return tb.apply(null, arguments).parseZone()
    }

    function Rc(a) {
        return a
    }

    function Sc(a, b, c, d) {
        var e = bb(), f = l().set(d, b);
        return e[c](f, a)
    }

    function Tc(a, b, c) {
        if (g(a) && (b = a, a = void 0), a = a || "", null != b) return Sc(a, b, c, "month");
        var d, e = [];
        for (d = 0; d < 12; d++) e[d] = Sc(a, d, c, "month");
        return e
    }

    function Uc(a, b, c, d) {
        "boolean" == typeof a ? (g(b) && (c = b, b = void 0), b = b || "") : (b = a, c = b, a = !1, g(b) && (c = b, b = void 0), b = b || "");
        var e = bb(), f = a ? e._week.dow : 0;
        if (null != c) return Sc(b, (c + f) % 7, d, "day");
        var h, i = [];
        for (h = 0; h < 7; h++) i[h] = Sc(b, (h + f) % 7, d, "day");
        return i
    }

    function Vc(a, b) {
        return Tc(a, b, "months")
    }

    function Wc(a, b) {
        return Tc(a, b, "monthsShort")
    }

    function Xc(a, b, c) {
        return Uc(a, b, c, "weekdays")
    }

    function Yc(a, b, c) {
        return Uc(a, b, c, "weekdaysShort")
    }

    function Zc(a, b, c) {
        return Uc(a, b, c, "weekdaysMin")
    }

    function $c() {
        var a = this._data;
        return this._milliseconds = df(this._milliseconds), this._days = df(this._days), this._months = df(this._months), a.milliseconds = df(a.milliseconds), a.seconds = df(a.seconds), a.minutes = df(a.minutes), a.hours = df(a.hours), a.months = df(a.months), a.years = df(a.years), this
    }

    function _c(a, b, c, d) {
        var e = Sb(b, c);
        return a._milliseconds += d * e._milliseconds, a._days += d * e._days, a._months += d * e._months, a._bubble()
    }

    function ad(a, b) {
        return _c(this, a, b, 1)
    }

    function bd(a, b) {
        return _c(this, a, b, -1)
    }

    function cd(a) {
        return a < 0 ? Math.floor(a) : Math.ceil(a)
    }

    function dd() {
        var a, b, c, d, e, f = this._milliseconds, g = this._days, h = this._months, i = this._data;
        return f >= 0 && g >= 0 && h >= 0 || f <= 0 && g <= 0 && h <= 0 || (f += 864e5 * cd(fd(h) + g), g = 0, h = 0), i.milliseconds = f % 1e3, a = t(f / 1e3), i.seconds = a % 60, b = t(a / 60), i.minutes = b % 60, c = t(b / 60), i.hours = c % 24, g += t(c / 24), e = t(ed(g)), h += e, g -= cd(fd(e)), d = t(h / 12), h %= 12, i.days = g, i.months = h, i.years = d, this
    }

    function ed(a) {
        return 4800 * a / 146097
    }

    function fd(a) {
        return 146097 * a / 4800
    }

    function gd(a) {
        if (!this.isValid()) return NaN;
        var b, c, d = this._milliseconds;
        if (a = K(a), "month" === a || "year" === a) return b = this._days + d / 864e5, c = this._months + ed(b), "month" === a ? c : c / 12;
        switch (b = this._days + Math.round(fd(this._months)), a) {
            case"week":
                return b / 7 + d / 6048e5;
            case"day":
                return b + d / 864e5;
            case"hour":
                return 24 * b + d / 36e5;
            case"minute":
                return 1440 * b + d / 6e4;
            case"second":
                return 86400 * b + d / 1e3;
            case"millisecond":
                return Math.floor(864e5 * b) + d;
            default:
                throw new Error("Unknown unit " + a)
        }
    }

    function hd() {
        return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * u(this._months / 12) : NaN
    }

    function id(a) {
        return function () {
            return this.as(a)
        }
    }

    function jd(a) {
        return a = K(a), this.isValid() ? this[a + "s"]() : NaN
    }

    function kd(a) {
        return function () {
            return this.isValid() ? this._data[a] : NaN
        }
    }

    function ld() {
        return t(this.days() / 7)
    }

    function md(a, b, c, d, e) {
        return e.relativeTime(b || 1, !!c, a, d)
    }

    function nd(a, b, c) {
        var d = Sb(a).abs(), e = uf(d.as("s")), f = uf(d.as("m")), g = uf(d.as("h")), h = uf(d.as("d")),
            i = uf(d.as("M")), j = uf(d.as("y")),
            k = e <= vf.ss && ["s", e] || e < vf.s && ["ss", e] || f <= 1 && ["m"] || f < vf.m && ["mm", f] || g <= 1 && ["h"] || g < vf.h && ["hh", g] || h <= 1 && ["d"] || h < vf.d && ["dd", h] || i <= 1 && ["M"] || i < vf.M && ["MM", i] || j <= 1 && ["y"] || ["yy", j];
        return k[2] = b, k[3] = +a > 0, k[4] = c, md.apply(null, k)
    }

    function od(a) {
        return void 0 === a ? uf : "function" == typeof a && (uf = a, !0)
    }

    function pd(a, b) {
        return void 0 !== vf[a] && (void 0 === b ? vf[a] : (vf[a] = b, "s" === a && (vf.ss = b - 1), !0))
    }

    function qd(a) {
        if (!this.isValid()) return this.localeData().invalidDate();
        var b = this.localeData(), c = nd(this, !a, b);
        return a && (c = b.pastFuture(+this, c)), b.postformat(c)
    }

    function rd() {
        if (!this.isValid()) return this.localeData().invalidDate();
        var a, b, c, d = wf(this._milliseconds) / 1e3, e = wf(this._days), f = wf(this._months);
        a = t(d / 60), b = t(a / 60), d %= 60, a %= 60, c = t(f / 12), f %= 12;
        var g = c, h = f, i = e, j = b, k = a, l = d, m = this.asSeconds();
        return m ? (m < 0 ? "-" : "") + "P" + (g ? g + "Y" : "") + (h ? h + "M" : "") + (i ? i + "D" : "") + (j || k || l ? "T" : "") + (j ? j + "H" : "") + (k ? k + "M" : "") + (l ? l + "S" : "") : "P0D"
    }

    var sd, td;
    td = Array.prototype.some ? Array.prototype.some : function (a) {
        for (var b = Object(this), c = b.length >>> 0, d = 0; d < c; d++) if (d in b && a.call(this, b[d], d, b)) return !0;
        return !1
    };
    var ud = td, vd = a.momentProperties = [], wd = !1, xd = {};
    a.suppressDeprecationWarnings = !1, a.deprecationHandler = null;
    var yd;
    yd = Object.keys ? Object.keys : function (a) {
        var b, c = [];
        for (b in a) j(a, b) && c.push(b);
        return c
    };
    var zd, Ad = yd, Bd = {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        }, Cd = {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A"
        }, Dd = "Invalid date", Ed = "%d", Fd = /\d{1,2}/, Gd = {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            ss: "%d seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        }, Hd = {}, Id = {},
        Jd = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        Kd = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Ld = {}, Md = {}, Nd = /\d/, Od = /\d\d/, Pd = /\d{3}/,
        Qd = /\d{4}/, Rd = /[+-]?\d{6}/, Sd = /\d\d?/, Td = /\d\d\d\d?/, Ud = /\d\d\d\d\d\d?/, Vd = /\d{1,3}/,
        Wd = /\d{1,4}/, Xd = /[+-]?\d{1,6}/, Yd = /\d+/, Zd = /[+-]?\d+/, $d = /Z|[+-]\d\d:?\d\d/gi,
        _d = /Z|[+-]\d\d(?::?\d\d)?/gi, ae = /[+-]?\d+(\.\d{1,3})?/,
        be = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,
        ce = {}, de = {}, ee = 0, fe = 1, ge = 2, he = 3, ie = 4, je = 5, ke = 6, le = 7, me = 8;
    zd = Array.prototype.indexOf ? Array.prototype.indexOf : function (a) {
        var b;
        for (b = 0; b < this.length; ++b) if (this[b] === a) return b;
        return -1
    };
    var ne = zd;
    U("M", ["MM", 2], "Mo", function () {
        return this.month() + 1
    }), U("MMM", 0, 0, function (a) {
        return this.localeData().monthsShort(this, a)
    }), U("MMMM", 0, 0, function (a) {
        return this.localeData().months(this, a)
    }), J("month", "M"), M("month", 8), Z("M", Sd), Z("MM", Sd, Od), Z("MMM", function (a, b) {
        return b.monthsShortRegex(a)
    }), Z("MMMM", function (a, b) {
        return b.monthsRegex(a)
    }), ba(["M", "MM"], function (a, b) {
        b[fe] = u(a) - 1
    }), ba(["MMM", "MMMM"], function (a, b, c, d) {
        var e = c._locale.monthsParse(a, d, c._strict);
        null != e ? b[fe] = e : n(c).invalidMonth = a
    });
    var oe = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        pe = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        qe = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), re = be, se = be;
    U("Y", 0, 0, function () {
        var a = this.year();
        return a <= 9999 ? "" + a : "+" + a
    }), U(0, ["YY", 2], 0, function () {
        return this.year() % 100
    }), U(0, ["YYYY", 4], 0, "year"), U(0, ["YYYYY", 5], 0, "year"), U(0, ["YYYYYY", 6, !0], 0, "year"), J("year", "y"), M("year", 1), Z("Y", Zd), Z("YY", Sd, Od), Z("YYYY", Wd, Qd), Z("YYYYY", Xd, Rd), Z("YYYYYY", Xd, Rd), ba(["YYYYY", "YYYYYY"], ee), ba("YYYY", function (b, c) {
        c[ee] = 2 === b.length ? a.parseTwoDigitYear(b) : u(b)
    }), ba("YY", function (b, c) {
        c[ee] = a.parseTwoDigitYear(b)
    }), ba("Y", function (a, b) {
        b[ee] = parseInt(a, 10)
    }), a.parseTwoDigitYear = function (a) {
        return u(a) + (u(a) > 68 ? 1900 : 2e3)
    };
    var te = O("FullYear", !0);
    U("w", ["ww", 2], "wo", "week"), U("W", ["WW", 2], "Wo", "isoWeek"), J("week", "w"), J("isoWeek", "W"), M("week", 5), M("isoWeek", 5), Z("w", Sd), Z("ww", Sd, Od), Z("W", Sd), Z("WW", Sd, Od), ca(["w", "ww", "W", "WW"], function (a, b, c, d) {
        b[d.substr(0, 1)] = u(a)
    });
    var ue = {dow: 0, doy: 6};
    U("d", 0, "do", "day"), U("dd", 0, 0, function (a) {
        return this.localeData().weekdaysMin(this, a)
    }), U("ddd", 0, 0, function (a) {
        return this.localeData().weekdaysShort(this, a)
    }), U("dddd", 0, 0, function (a) {
        return this.localeData().weekdays(this, a)
    }), U("e", 0, 0, "weekday"), U("E", 0, 0, "isoWeekday"), J("day", "d"), J("weekday", "e"), J("isoWeekday", "E"), M("day", 11), M("weekday", 11), M("isoWeekday", 11), Z("d", Sd), Z("e", Sd), Z("E", Sd), Z("dd", function (a, b) {
        return b.weekdaysMinRegex(a)
    }), Z("ddd", function (a, b) {
        return b.weekdaysShortRegex(a)
    }), Z("dddd", function (a, b) {
        return b.weekdaysRegex(a)
    }), ca(["dd", "ddd", "dddd"], function (a, b, c, d) {
        var e = c._locale.weekdaysParse(a, d, c._strict);
        null != e ? b.d = e : n(c).invalidWeekday = a
    }), ca(["d", "e", "E"], function (a, b, c, d) {
        b[d] = u(a)
    });
    var ve = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        we = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), xe = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), ye = be, ze = be,
        Ae = be;
    U("H", ["HH", 2], 0, "hour"), U("h", ["hh", 2], 0, Ra), U("k", ["kk", 2], 0, Sa), U("hmm", 0, 0, function () {
        return "" + Ra.apply(this) + T(this.minutes(), 2)
    }), U("hmmss", 0, 0, function () {
        return "" + Ra.apply(this) + T(this.minutes(), 2) + T(this.seconds(), 2)
    }), U("Hmm", 0, 0, function () {
        return "" + this.hours() + T(this.minutes(), 2)
    }), U("Hmmss", 0, 0, function () {
        return "" + this.hours() + T(this.minutes(), 2) + T(this.seconds(), 2)
    }), Ta("a", !0), Ta("A", !1), J("hour", "h"), M("hour", 13), Z("a", Ua), Z("A", Ua), Z("H", Sd), Z("h", Sd), Z("k", Sd), Z("HH", Sd, Od), Z("hh", Sd, Od), Z("kk", Sd, Od), Z("hmm", Td), Z("hmmss", Ud), Z("Hmm", Td), Z("Hmmss", Ud), ba(["H", "HH"], he), ba(["k", "kk"], function (a, b, c) {
        var d = u(a);
        b[he] = 24 === d ? 0 : d
    }), ba(["a", "A"], function (a, b, c) {
        c._isPm = c._locale.isPM(a), c._meridiem = a
    }), ba(["h", "hh"], function (a, b, c) {
        b[he] = u(a), n(c).bigHour = !0
    }), ba("hmm", function (a, b, c) {
        var d = a.length - 2;
        b[he] = u(a.substr(0, d)), b[ie] = u(a.substr(d)), n(c).bigHour = !0
    }), ba("hmmss", function (a, b, c) {
        var d = a.length - 4, e = a.length - 2;
        b[he] = u(a.substr(0, d)), b[ie] = u(a.substr(d, 2)), b[je] = u(a.substr(e)), n(c).bigHour = !0
    }), ba("Hmm", function (a, b, c) {
        var d = a.length - 2;
        b[he] = u(a.substr(0, d)), b[ie] = u(a.substr(d))
    }), ba("Hmmss", function (a, b, c) {
        var d = a.length - 4, e = a.length - 2;
        b[he] = u(a.substr(0, d)), b[ie] = u(a.substr(d, 2)), b[je] = u(a.substr(e))
    });
    var Be, Ce = /[ap]\.?m?\.?/i, De = O("Hours", !0), Ee = {
            calendar: Bd,
            longDateFormat: Cd,
            invalidDate: Dd,
            ordinal: Ed,
            dayOfMonthOrdinalParse: Fd,
            relativeTime: Gd,
            months: pe,
            monthsShort: qe,
            week: ue,
            weekdays: ve,
            weekdaysMin: xe,
            weekdaysShort: we,
            meridiemParse: Ce
        }, Fe = {}, Ge = {},
        He = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        Ie = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        Je = /Z|[+-]\d\d(?::?\d\d)?/,
        Ke = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]],
        Le = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]],
        Me = /^\/?Date\((\-?\d+)/i,
        Ne = /^((?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d?\d\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(?:\d\d)?\d\d\s)(\d\d:\d\d)(\:\d\d)?(\s(?:UT|GMT|[ECMP][SD]T|[A-IK-Za-ik-z]|[+-]\d{4}))$/;
    a.createFromInputFallback = x("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (a) {
        a._d = new Date(a._i + (a._useUTC ? " UTC" : ""))
    }), a.ISO_8601 = function () {
    }, a.RFC_2822 = function () {
    };
    var Oe = x("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
            var a = tb.apply(null, arguments);
            return this.isValid() && a.isValid() ? a < this ? this : a : p()
        }),
        Pe = x("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () {
            var a = tb.apply(null, arguments);
            return this.isValid() && a.isValid() ? a > this ? this : a : p()
        }), Qe = function () {
            return Date.now ? Date.now() : +new Date
        }, Re = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
    Db("Z", ":"), Db("ZZ", ""), Z("Z", _d), Z("ZZ", _d), ba(["Z", "ZZ"], function (a, b, c) {
        c._useUTC = !0, c._tzm = Eb(_d, a)
    });
    var Se = /([\+\-]|\d\d)/gi;
    a.updateOffset = function () {
    };
    var Te = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
        Ue = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
    Sb.fn = Ab.prototype, Sb.invalid = zb;
    var Ve = Wb(1, "add"), We = Wb(-1, "subtract");
    a.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", a.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
    var Xe = x("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (a) {
        return void 0 === a ? this.localeData() : this.locale(a)
    });
    U(0, ["gg", 2], 0, function () {
        return this.weekYear() % 100
    }), U(0, ["GG", 2], 0, function () {
        return this.isoWeekYear() % 100
    }), Dc("gggg", "weekYear"), Dc("ggggg", "weekYear"), Dc("GGGG", "isoWeekYear"), Dc("GGGGG", "isoWeekYear"), J("weekYear", "gg"), J("isoWeekYear", "GG"), M("weekYear", 1), M("isoWeekYear", 1), Z("G", Zd), Z("g", Zd), Z("GG", Sd, Od), Z("gg", Sd, Od), Z("GGGG", Wd, Qd), Z("gggg", Wd, Qd), Z("GGGGG", Xd, Rd), Z("ggggg", Xd, Rd), ca(["gggg", "ggggg", "GGGG", "GGGGG"], function (a, b, c, d) {
        b[d.substr(0, 2)] = u(a)
    }), ca(["gg", "GG"], function (b, c, d, e) {
        c[e] = a.parseTwoDigitYear(b)
    }), U("Q", 0, "Qo", "quarter"), J("quarter", "Q"), M("quarter", 7), Z("Q", Nd), ba("Q", function (a, b) {
        b[fe] = 3 * (u(a) - 1)
    }), U("D", ["DD", 2], "Do", "date"), J("date", "D"), M("date", 9), Z("D", Sd), Z("DD", Sd, Od), Z("Do", function (a, b) {
        return a ? b._dayOfMonthOrdinalParse || b._ordinalParse : b._dayOfMonthOrdinalParseLenient
    }), ba(["D", "DD"], ge), ba("Do", function (a, b) {
        b[ge] = u(a.match(Sd)[0], 10)
    });
    var Ye = O("Date", !0);
    U("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), J("dayOfYear", "DDD"), M("dayOfYear", 4), Z("DDD", Vd), Z("DDDD", Pd), ba(["DDD", "DDDD"], function (a, b, c) {
        c._dayOfYear = u(a)
    }), U("m", ["mm", 2], 0, "minute"), J("minute", "m"), M("minute", 14), Z("m", Sd), Z("mm", Sd, Od), ba(["m", "mm"], ie);
    var Ze = O("Minutes", !1);
    U("s", ["ss", 2], 0, "second"), J("second", "s"), M("second", 15), Z("s", Sd), Z("ss", Sd, Od), ba(["s", "ss"], je);
    var $e = O("Seconds", !1);
    U("S", 0, 0, function () {
        return ~~(this.millisecond() / 100)
    }), U(0, ["SS", 2], 0, function () {
        return ~~(this.millisecond() / 10)
    }), U(0, ["SSS", 3], 0, "millisecond"), U(0, ["SSSS", 4], 0, function () {
        return 10 * this.millisecond()
    }), U(0, ["SSSSS", 5], 0, function () {
        return 100 * this.millisecond()
    }), U(0, ["SSSSSS", 6], 0, function () {
        return 1e3 * this.millisecond()
    }), U(0, ["SSSSSSS", 7], 0, function () {
        return 1e4 * this.millisecond()
    }), U(0, ["SSSSSSSS", 8], 0, function () {
        return 1e5 * this.millisecond()
    }), U(0, ["SSSSSSSSS", 9], 0, function () {
        return 1e6 * this.millisecond()
    }), J("millisecond", "ms"), M("millisecond", 16), Z("S", Vd, Nd), Z("SS", Vd, Od), Z("SSS", Vd, Pd);
    var _e;
    for (_e = "SSSS"; _e.length <= 9; _e += "S") Z(_e, Yd);
    for (_e = "S"; _e.length <= 9; _e += "S") ba(_e, Mc);
    var af = O("Milliseconds", !1);
    U("z", 0, 0, "zoneAbbr"), U("zz", 0, 0, "zoneName");
    var bf = r.prototype;
    bf.add = Ve, bf.calendar = Zb, bf.clone = $b, bf.diff = fc, bf.endOf = sc, bf.format = kc, bf.from = lc, bf.fromNow = mc, bf.to = nc, bf.toNow = oc, bf.get = R, bf.invalidAt = Bc, bf.isAfter = _b, bf.isBefore = ac, bf.isBetween = bc, bf.isSame = cc, bf.isSameOrAfter = dc, bf.isSameOrBefore = ec, bf.isValid = zc, bf.lang = Xe, bf.locale = pc, bf.localeData = qc, bf.max = Pe, bf.min = Oe, bf.parsingFlags = Ac, bf.set = S, bf.startOf = rc, bf.subtract = We, bf.toArray = wc, bf.toObject = xc, bf.toDate = vc, bf.toISOString = ic, bf.inspect = jc, bf.toJSON = yc, bf.toString = hc, bf.unix = uc, bf.valueOf = tc, bf.creationData = Cc, bf.year = te, bf.isLeapYear = ra, bf.weekYear = Ec, bf.isoWeekYear = Fc, bf.quarter = bf.quarters = Kc, bf.month = ka, bf.daysInMonth = la, bf.week = bf.weeks = Ba, bf.isoWeek = bf.isoWeeks = Ca, bf.weeksInYear = Hc, bf.isoWeeksInYear = Gc, bf.date = Ye, bf.day = bf.days = Ka, bf.weekday = La, bf.isoWeekday = Ma, bf.dayOfYear = Lc, bf.hour = bf.hours = De, bf.minute = bf.minutes = Ze, bf.second = bf.seconds = $e, bf.millisecond = bf.milliseconds = af, bf.utcOffset = Hb, bf.utc = Jb, bf.local = Kb, bf.parseZone = Lb, bf.hasAlignedHourOffset = Mb, bf.isDST = Nb, bf.isLocal = Pb, bf.isUtcOffset = Qb, bf.isUtc = Rb, bf.isUTC = Rb, bf.zoneAbbr = Nc, bf.zoneName = Oc, bf.dates = x("dates accessor is deprecated. Use date instead.", Ye), bf.months = x("months accessor is deprecated. Use month instead", ka), bf.years = x("years accessor is deprecated. Use year instead", te), bf.zone = x("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", Ib), bf.isDSTShifted = x("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", Ob);
    var cf = C.prototype;
    cf.calendar = D, cf.longDateFormat = E, cf.invalidDate = F, cf.ordinal = G, cf.preparse = Rc, cf.postformat = Rc, cf.relativeTime = H, cf.pastFuture = I, cf.set = A, cf.months = fa, cf.monthsShort = ga, cf.monthsParse = ia, cf.monthsRegex = na, cf.monthsShortRegex = ma, cf.week = ya, cf.firstDayOfYear = Aa, cf.firstDayOfWeek = za, cf.weekdays = Fa, cf.weekdaysMin = Ha, cf.weekdaysShort = Ga, cf.weekdaysParse = Ja, cf.weekdaysRegex = Na, cf.weekdaysShortRegex = Oa, cf.weekdaysMinRegex = Pa, cf.isPM = Va, cf.meridiem = Wa, $a("en", {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (a) {
            var b = a % 10, c = 1 === u(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return a + c
        }
    }), a.lang = x("moment.lang is deprecated. Use moment.locale instead.", $a), a.langData = x("moment.langData is deprecated. Use moment.localeData instead.", bb);
    var df = Math.abs, ef = id("ms"), ff = id("s"), gf = id("m"), hf = id("h"), jf = id("d"), kf = id("w"),
        lf = id("M"), mf = id("y"), nf = kd("milliseconds"), of = kd("seconds"), pf = kd("minutes"), qf = kd("hours"),
        rf = kd("days"), sf = kd("months"), tf = kd("years"), uf = Math.round,
        vf = {ss: 44, s: 45, m: 45, h: 22, d: 26, M: 11}, wf = Math.abs, xf = Ab.prototype;
    return xf.isValid = yb, xf.abs = $c, xf.add = ad, xf.subtract = bd, xf.as = gd, xf.asMilliseconds = ef, xf.asSeconds = ff, xf.asMinutes = gf, xf.asHours = hf, xf.asDays = jf, xf.asWeeks = kf, xf.asMonths = lf, xf.asYears = mf, xf.valueOf = hd, xf._bubble = dd, xf.get = jd, xf.milliseconds = nf, xf.seconds = of, xf.minutes = pf, xf.hours = qf, xf.days = rf, xf.weeks = ld, xf.months = sf, xf.years = tf, xf.humanize = qd, xf.toISOString = rd, xf.toString = rd, xf.toJSON = rd, xf.locale = pc, xf.localeData = qc, xf.toIsoString = x("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", rd), xf.lang = Xe, U("X", 0, 0, "unix"), U("x", 0, 0, "valueOf"), Z("x", Zd), Z("X", ae), ba("X", function (a, b, c) {
        c._d = new Date(1e3 * parseFloat(a, 10))
    }), ba("x", function (a, b, c) {
        c._d = new Date(u(a))
    }), a.version = "2.18.1", b(tb), a.fn = bf, a.min = vb, a.max = wb, a.now = Qe, a.utc = l, a.unix = Pc, a.months = Vc, a.isDate = h, a.locale = $a, a.invalid = p, a.duration = Sb, a.isMoment = s, a.weekdays = Xc, a.parseZone = Qc, a.localeData = bb, a.isDuration = Bb, a.monthsShort = Wc, a.weekdaysMin = Zc, a.defineLocale = _a, a.updateLocale = ab, a.locales = cb, a.weekdaysShort = Yc, a.normalizeUnits = K, a.relativeTimeRounding = od, a.relativeTimeThreshold = pd, a.calendarFormat = Yb, a.prototype = bf, a
});

(function (a) {
    if (typeof define === "function" && define.amd && define.amd.jQuery) {
        define('touchSwipe', ["jquery"], a)
    } else {
        if (typeof module !== "undefined" && module.exports) {
            a(require("jquery"))
        } else {
            a(jQuery)
        }
    }
}(function (f) {
    var y = "1.6.15", p = "left", o = "right", e = "up", x = "down", c = "in", A = "out", m = "none", s = "auto",
        l = "swipe", t = "pinch", B = "tap", j = "doubletap", b = "longtap", z = "hold", E = "horizontal",
        u = "vertical", i = "all", r = 10, g = "start", k = "move", h = "end", q = "cancel",
        a = "ontouchstart" in window, v = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled && !a,
        d = (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && !a, C = "TouchSwipe";
    var n = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        hold: null,
        triggerOnTouchEnd: true,
        triggerOnTouchLeave: false,
        allowPageScroll: "auto",
        fallbackToMouseEvents: true,
        excludedElements: "label, button, input, select, textarea, a, .noSwipe",
        preventDefaultEvents: true
    };
    f.fn.swipe = function (H) {
        var G = f(this), F = G.data(C);
        if (F && typeof H === "string") {
            if (F[H]) {
                return F[H].apply(this, Array.prototype.slice.call(arguments, 1))
            } else {
                f.error("Method " + H + " does not exist on jQuery.swipe")
            }
        } else {
            if (F && typeof H === "object") {
                F.option.apply(this, arguments)
            } else {
                if (!F && (typeof H === "object" || !H)) {
                    return w.apply(this, arguments)
                }
            }
        }
        return G
    };
    f.fn.swipe.version = y;
    f.fn.swipe.defaults = n;
    f.fn.swipe.phases = {PHASE_START: g, PHASE_MOVE: k, PHASE_END: h, PHASE_CANCEL: q};
    f.fn.swipe.directions = {LEFT: p, RIGHT: o, UP: e, DOWN: x, IN: c, OUT: A};
    f.fn.swipe.pageScroll = {NONE: m, HORIZONTAL: E, VERTICAL: u, AUTO: s};
    f.fn.swipe.fingers = {ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, ALL: i};

    function w(F) {
        if (F && (F.allowPageScroll === undefined && (F.swipe !== undefined || F.swipeStatus !== undefined))) {
            F.allowPageScroll = m
        }
        if (F.click !== undefined && F.tap === undefined) {
            F.tap = F.click
        }
        if (!F) {
            F = {}
        }
        F = f.extend({}, f.fn.swipe.defaults, F);
        return this.each(function () {
            var H = f(this);
            var G = H.data(C);
            if (!G) {
                G = new D(this, F);
                H.data(C, G)
            }
        })
    }

    function D(a5, au) {
        var au = f.extend({}, au);
        var az = (a || d || !au.fallbackToMouseEvents),
            K = az ? (d ? (v ? "MSPointerDown" : "pointerdown") : "touchstart") : "mousedown",
            ax = az ? (d ? (v ? "MSPointerMove" : "pointermove") : "touchmove") : "mousemove",
            V = az ? (d ? (v ? "MSPointerUp" : "pointerup") : "touchend") : "mouseup",
            T = az ? (d ? "mouseleave" : null) : "mouseleave",
            aD = (d ? (v ? "MSPointerCancel" : "pointercancel") : "touchcancel");
        var ag = 0, aP = null, a2 = null, ac = 0, a1 = 0, aZ = 0, H = 1, ap = 0, aJ = 0, N = null;
        var aR = f(a5);
        var aa = "start";
        var X = 0;
        var aQ = {};
        var U = 0, a3 = 0, a6 = 0, ay = 0, O = 0;
        var aW = null, af = null;
        try {
            aR.bind(K, aN);
            aR.bind(aD, ba)
        } catch (aj) {
            f.error("events not supported " + K + "," + aD + " on jQuery.swipe")
        }
        this.enable = function () {
            aR.bind(K, aN);
            aR.bind(aD, ba);
            return aR
        };
        this.disable = function () {
            aK();
            return aR
        };
        this.destroy = function () {
            aK();
            aR.data(C, null);
            aR = null
        };
        this.option = function (bd, bc) {
            if (typeof bd === "object") {
                au = f.extend(au, bd)
            } else {
                if (au[bd] !== undefined) {
                    if (bc === undefined) {
                        return au[bd]
                    } else {
                        au[bd] = bc
                    }
                } else {
                    if (!bd) {
                        return au
                    } else {
                        f.error("Option " + bd + " does not exist on jQuery.swipe.options")
                    }
                }
            }
            return null
        };

        function aN(be) {
            if (aB()) {
                return
            }
            if (f(be.target).closest(au.excludedElements, aR).length > 0) {
                return
            }
            var bf = be.originalEvent ? be.originalEvent : be;
            var bd, bg = bf.touches, bc = bg ? bg[0] : bf;
            aa = g;
            if (bg) {
                X = bg.length
            } else {
                if (au.preventDefaultEvents !== false) {
                    be.preventDefault()
                }
            }
            ag = 0;
            aP = null;
            a2 = null;
            aJ = null;
            ac = 0;
            a1 = 0;
            aZ = 0;
            H = 1;
            ap = 0;
            N = ab();
            S();
            ai(0, bc);
            if (!bg || (X === au.fingers || au.fingers === i) || aX()) {
                U = ar();
                if (X == 2) {
                    ai(1, bg[1]);
                    a1 = aZ = at(aQ[0].start, aQ[1].start)
                }
                if (au.swipeStatus || au.pinchStatus) {
                    bd = P(bf, aa)
                }
            } else {
                bd = false
            }
            if (bd === false) {
                aa = q;
                P(bf, aa);
                return bd
            } else {
                if (au.hold) {
                    af = setTimeout(f.proxy(function () {
                        aR.trigger("hold", [bf.target]);
                        if (au.hold) {
                            bd = au.hold.call(aR, bf, bf.target)
                        }
                    }, this), au.longTapThreshold)
                }
                an(true)
            }
            return null
        }

        function a4(bf) {
            var bi = bf.originalEvent ? bf.originalEvent : bf;
            if (aa === h || aa === q || al()) {
                return
            }
            var be, bj = bi.touches, bd = bj ? bj[0] : bi;
            var bg = aH(bd);
            a3 = ar();
            if (bj) {
                X = bj.length
            }
            if (au.hold) {
                clearTimeout(af)
            }
            aa = k;
            if (X == 2) {
                if (a1 == 0) {
                    ai(1, bj[1]);
                    a1 = aZ = at(aQ[0].start, aQ[1].start)
                } else {
                    aH(bj[1]);
                    aZ = at(aQ[0].end, aQ[1].end);
                    aJ = aq(aQ[0].end, aQ[1].end)
                }
                H = a8(a1, aZ);
                ap = Math.abs(a1 - aZ)
            }
            if ((X === au.fingers || au.fingers === i) || !bj || aX()) {
                aP = aL(bg.start, bg.end);
                a2 = aL(bg.last, bg.end);
                ak(bf, a2);
                ag = aS(bg.start, bg.end);
                ac = aM();
                aI(aP, ag);
                be = P(bi, aa);
                if (!au.triggerOnTouchEnd || au.triggerOnTouchLeave) {
                    var bc = true;
                    if (au.triggerOnTouchLeave) {
                        var bh = aY(this);
                        bc = F(bg.end, bh)
                    }
                    if (!au.triggerOnTouchEnd && bc) {
                        aa = aC(k)
                    } else {
                        if (au.triggerOnTouchLeave && !bc) {
                            aa = aC(h)
                        }
                    }
                    if (aa == q || aa == h) {
                        P(bi, aa)
                    }
                }
            } else {
                aa = q;
                P(bi, aa)
            }
            if (be === false) {
                aa = q;
                P(bi, aa)
            }
        }

        function M(bc) {
            var bd = bc.originalEvent ? bc.originalEvent : bc, be = bd.touches;
            if (be) {
                if (be.length && !al()) {
                    G(bd);
                    return true
                } else {
                    if (be.length && al()) {
                        return true
                    }
                }
            }
            if (al()) {
                X = ay
            }
            a3 = ar();
            ac = aM();
            if (bb() || !am()) {
                aa = q;
                P(bd, aa)
            } else {
                if (au.triggerOnTouchEnd || (au.triggerOnTouchEnd == false && aa === k)) {
                    if (au.preventDefaultEvents !== false) {
                        bc.preventDefault()
                    }
                    aa = h;
                    P(bd, aa)
                } else {
                    if (!au.triggerOnTouchEnd && a7()) {
                        aa = h;
                        aF(bd, aa, B)
                    } else {
                        if (aa === k) {
                            aa = q;
                            P(bd, aa)
                        }
                    }
                }
            }
            an(false);
            return null
        }

        function ba() {
            X = 0;
            a3 = 0;
            U = 0;
            a1 = 0;
            aZ = 0;
            H = 1;
            S();
            an(false)
        }

        function L(bc) {
            var bd = bc.originalEvent ? bc.originalEvent : bc;
            if (au.triggerOnTouchLeave) {
                aa = aC(h);
                P(bd, aa)
            }
        }

        function aK() {
            aR.unbind(K, aN);
            aR.unbind(aD, ba);
            aR.unbind(ax, a4);
            aR.unbind(V, M);
            if (T) {
                aR.unbind(T, L)
            }
            an(false)
        }

        function aC(bg) {
            var bf = bg;
            var be = aA();
            var bd = am();
            var bc = bb();
            if (!be || bc) {
                bf = q
            } else {
                if (bd && bg == k && (!au.triggerOnTouchEnd || au.triggerOnTouchLeave)) {
                    bf = h
                } else {
                    if (!bd && bg == h && au.triggerOnTouchLeave) {
                        bf = q
                    }
                }
            }
            return bf
        }

        function P(be, bc) {
            var bd, bf = be.touches;
            if (J() || W()) {
                bd = aF(be, bc, l)
            }
            if ((Q() || aX()) && bd !== false) {
                bd = aF(be, bc, t)
            }
            if (aG() && bd !== false) {
                bd = aF(be, bc, j)
            } else {
                if (ao() && bd !== false) {
                    bd = aF(be, bc, b)
                } else {
                    if (ah() && bd !== false) {
                        bd = aF(be, bc, B)
                    }
                }
            }
            if (bc === q) {
                if (W()) {
                    bd = aF(be, bc, l)
                }
                if (aX()) {
                    bd = aF(be, bc, t)
                }
                ba(be)
            }
            if (bc === h) {
                if (bf) {
                    if (!bf.length) {
                        ba(be)
                    }
                } else {
                    ba(be)
                }
            }
            return bd
        }

        function aF(bf, bc, be) {
            var bd;
            if (be == l) {
                aR.trigger("swipeStatus", [bc, aP || null, ag || 0, ac || 0, X, aQ, a2]);
                if (au.swipeStatus) {
                    bd = au.swipeStatus.call(aR, bf, bc, aP || null, ag || 0, ac || 0, X, aQ, a2);
                    if (bd === false) {
                        return false
                    }
                }
                if (bc == h && aV()) {
                    clearTimeout(aW);
                    clearTimeout(af);
                    aR.trigger("swipe", [aP, ag, ac, X, aQ, a2]);
                    if (au.swipe) {
                        bd = au.swipe.call(aR, bf, aP, ag, ac, X, aQ, a2);
                        if (bd === false) {
                            return false
                        }
                    }
                    switch (aP) {
                        case p:
                            aR.trigger("swipeLeft", [aP, ag, ac, X, aQ, a2]);
                            if (au.swipeLeft) {
                                bd = au.swipeLeft.call(aR, bf, aP, ag, ac, X, aQ, a2)
                            }
                            break;
                        case o:
                            aR.trigger("swipeRight", [aP, ag, ac, X, aQ, a2]);
                            if (au.swipeRight) {
                                bd = au.swipeRight.call(aR, bf, aP, ag, ac, X, aQ, a2)
                            }
                            break;
                        case e:
                            aR.trigger("swipeUp", [aP, ag, ac, X, aQ, a2]);
                            if (au.swipeUp) {
                                bd = au.swipeUp.call(aR, bf, aP, ag, ac, X, aQ, a2)
                            }
                            break;
                        case x:
                            aR.trigger("swipeDown", [aP, ag, ac, X, aQ, a2]);
                            if (au.swipeDown) {
                                bd = au.swipeDown.call(aR, bf, aP, ag, ac, X, aQ, a2)
                            }
                            break
                    }
                }
            }
            if (be == t) {
                aR.trigger("pinchStatus", [bc, aJ || null, ap || 0, ac || 0, X, H, aQ]);
                if (au.pinchStatus) {
                    bd = au.pinchStatus.call(aR, bf, bc, aJ || null, ap || 0, ac || 0, X, H, aQ);
                    if (bd === false) {
                        return false
                    }
                }
                if (bc == h && a9()) {
                    switch (aJ) {
                        case c:
                            aR.trigger("pinchIn", [aJ || null, ap || 0, ac || 0, X, H, aQ]);
                            if (au.pinchIn) {
                                bd = au.pinchIn.call(aR, bf, aJ || null, ap || 0, ac || 0, X, H, aQ)
                            }
                            break;
                        case A:
                            aR.trigger("pinchOut", [aJ || null, ap || 0, ac || 0, X, H, aQ]);
                            if (au.pinchOut) {
                                bd = au.pinchOut.call(aR, bf, aJ || null, ap || 0, ac || 0, X, H, aQ)
                            }
                            break
                    }
                }
            }
            if (be == B) {
                if (bc === q || bc === h) {
                    clearTimeout(aW);
                    clearTimeout(af);
                    if (Z() && !I()) {
                        O = ar();
                        aW = setTimeout(f.proxy(function () {
                            O = null;
                            aR.trigger("tap", [bf.target]);
                            if (au.tap) {
                                bd = au.tap.call(aR, bf, bf.target)
                            }
                        }, this), au.doubleTapThreshold)
                    } else {
                        O = null;
                        aR.trigger("tap", [bf.target]);
                        if (au.tap) {
                            bd = au.tap.call(aR, bf, bf.target)
                        }
                    }
                }
            } else {
                if (be == j) {
                    if (bc === q || bc === h) {
                        clearTimeout(aW);
                        clearTimeout(af);
                        O = null;
                        aR.trigger("doubletap", [bf.target]);
                        if (au.doubleTap) {
                            bd = au.doubleTap.call(aR, bf, bf.target)
                        }
                    }
                } else {
                    if (be == b) {
                        if (bc === q || bc === h) {
                            clearTimeout(aW);
                            O = null;
                            aR.trigger("longtap", [bf.target]);
                            if (au.longTap) {
                                bd = au.longTap.call(aR, bf, bf.target)
                            }
                        }
                    }
                }
            }
            return bd
        }

        function am() {
            var bc = true;
            if (au.threshold !== null) {
                bc = ag >= au.threshold
            }
            return bc
        }

        function bb() {
            var bc = false;
            if (au.cancelThreshold !== null && aP !== null) {
                bc = (aT(aP) - ag) >= au.cancelThreshold
            }
            return bc
        }

        function ae() {
            if (au.pinchThreshold !== null) {
                return ap >= au.pinchThreshold
            }
            return true
        }

        function aA() {
            var bc;
            if (au.maxTimeThreshold) {
                if (ac >= au.maxTimeThreshold) {
                    bc = false
                } else {
                    bc = true
                }
            } else {
                bc = true
            }
            return bc
        }

        function ak(bc, bd) {
            if (au.preventDefaultEvents === false) {
                return
            }
            if (au.allowPageScroll === m) {
                bc.preventDefault()
            } else {
                var be = au.allowPageScroll === s;
                switch (bd) {
                    case p:
                        if ((au.swipeLeft && be) || (!be && au.allowPageScroll != E)) {
                            bc.preventDefault()
                        }
                        break;
                    case o:
                        if ((au.swipeRight && be) || (!be && au.allowPageScroll != E)) {
                            bc.preventDefault()
                        }
                        break;
                    case e:
                        if ((au.swipeUp && be) || (!be && au.allowPageScroll != u)) {
                            bc.preventDefault()
                        }
                        break;
                    case x:
                        if ((au.swipeDown && be) || (!be && au.allowPageScroll != u)) {
                            bc.preventDefault()
                        }
                        break
                }
            }
        }

        function a9() {
            var bd = aO();
            var bc = Y();
            var be = ae();
            return bd && bc && be
        }

        function aX() {
            return !!(au.pinchStatus || au.pinchIn || au.pinchOut)
        }

        function Q() {
            return !!(a9() && aX())
        }

        function aV() {
            var bf = aA();
            var bh = am();
            var be = aO();
            var bc = Y();
            var bd = bb();
            var bg = !bd && bc && be && bh && bf;
            return bg
        }

        function W() {
            return !!(au.swipe || au.swipeStatus || au.swipeLeft || au.swipeRight || au.swipeUp || au.swipeDown)
        }

        function J() {
            return !!(aV() && W())
        }

        function aO() {
            return ((X === au.fingers || au.fingers === i) || !a)
        }

        function Y() {
            return aQ[0].end.x !== 0
        }

        function a7() {
            return !!(au.tap)
        }

        function Z() {
            return !!(au.doubleTap)
        }

        function aU() {
            return !!(au.longTap)
        }

        function R() {
            if (O == null) {
                return false
            }
            var bc = ar();
            return (Z() && ((bc - O) <= au.doubleTapThreshold))
        }

        function I() {
            return R()
        }

        function aw() {
            return ((X === 1 || !a) && (isNaN(ag) || ag < au.threshold))
        }

        function a0() {
            return ((ac > au.longTapThreshold) && (ag < r))
        }

        function ah() {
            return !!(aw() && a7())
        }

        function aG() {
            return !!(R() && Z())
        }

        function ao() {
            return !!(a0() && aU())
        }

        function G(bc) {
            a6 = ar();
            ay = bc.touches.length + 1
        }

        function S() {
            a6 = 0;
            ay = 0
        }

        function al() {
            var bc = false;
            if (a6) {
                var bd = ar() - a6;
                if (bd <= au.fingerReleaseThreshold) {
                    bc = true
                }
            }
            return bc
        }

        function aB() {
            return !!(aR.data(C + "_intouch") === true)
        }

        function an(bc) {
            if (!aR) {
                return
            }
            if (bc === true) {
                aR.bind(ax, a4);
                aR.bind(V, M);
                if (T) {
                    aR.bind(T, L)
                }
            } else {
                aR.unbind(ax, a4, false);
                aR.unbind(V, M, false);
                if (T) {
                    aR.unbind(T, L, false)
                }
            }
            aR.data(C + "_intouch", bc === true)
        }

        function ai(be, bc) {
            var bd = {start: {x: 0, y: 0}, last: {x: 0, y: 0}, end: {x: 0, y: 0}};
            bd.start.x = bd.last.x = bd.end.x = bc.pageX || bc.clientX;
            bd.start.y = bd.last.y = bd.end.y = bc.pageY || bc.clientY;
            aQ[be] = bd;
            return bd
        }

        function aH(bc) {
            var be = bc.identifier !== undefined ? bc.identifier : 0;
            var bd = ad(be);
            if (bd === null) {
                bd = ai(be, bc)
            }
            bd.last.x = bd.end.x;
            bd.last.y = bd.end.y;
            bd.end.x = bc.pageX || bc.clientX;
            bd.end.y = bc.pageY || bc.clientY;
            return bd
        }

        function ad(bc) {
            return aQ[bc] || null
        }

        function aI(bc, bd) {
            bd = Math.max(bd, aT(bc));
            N[bc].distance = bd
        }

        function aT(bc) {
            if (N[bc]) {
                return N[bc].distance
            }
            return undefined
        }

        function ab() {
            var bc = {};
            bc[p] = av(p);
            bc[o] = av(o);
            bc[e] = av(e);
            bc[x] = av(x);
            return bc
        }

        function av(bc) {
            return {direction: bc, distance: 0}
        }

        function aM() {
            return a3 - U
        }

        function at(bf, be) {
            var bd = Math.abs(bf.x - be.x);
            var bc = Math.abs(bf.y - be.y);
            return Math.round(Math.sqrt(bd * bd + bc * bc))
        }

        function a8(bc, bd) {
            var be = (bd / bc) * 1;
            return be.toFixed(2)
        }

        function aq() {
            if (H < 1) {
                return A
            } else {
                return c
            }
        }

        function aS(bd, bc) {
            return Math.round(Math.sqrt(Math.pow(bc.x - bd.x, 2) + Math.pow(bc.y - bd.y, 2)))
        }

        function aE(bf, bd) {
            var bc = bf.x - bd.x;
            var bh = bd.y - bf.y;
            var be = Math.atan2(bh, bc);
            var bg = Math.round(be * 180 / Math.PI);
            if (bg < 0) {
                bg = 360 - Math.abs(bg)
            }
            return bg
        }

        function aL(bd, bc) {
            var be = aE(bd, bc);
            if ((be <= 45) && (be >= 0)) {
                return p
            } else {
                if ((be <= 360) && (be >= 315)) {
                    return p
                } else {
                    if ((be >= 135) && (be <= 225)) {
                        return o
                    } else {
                        if ((be > 45) && (be < 135)) {
                            return x
                        } else {
                            return e
                        }
                    }
                }
            }
        }

        function ar() {
            var bc = new Date();
            return bc.getTime()
        }

        function aY(bc) {
            bc = f(bc);
            var be = bc.offset();
            var bd = {left: be.left, right: be.left + bc.outerWidth(), top: be.top, bottom: be.top + bc.outerHeight()};
            return bd
        }

        function F(bc, bd) {
            return (bc.x > bd.left && bc.x < bd.right && bc.y > bd.top && bc.y < bd.bottom)
        }
    }
}));

/*!
 * clipboard.js v1.7.1
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
!function (t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define('clipboard', [], t); else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.Clipboard = t()
    }
}(function () {
    var t, e, n;
    return function t(e, n, o) {
        function i(a, c) {
            if (!n[a]) {
                if (!e[a]) {
                    var l = "function" == typeof require && require;
                    if (!c && l) return l(a, !0);
                    if (r) return r(a, !0);
                    var s = new Error("Cannot find module '" + a + "'");
                    throw s.code = "MODULE_NOT_FOUND", s
                }
                var u = n[a] = {exports: {}};
                e[a][0].call(u.exports, function (t) {
                    var n = e[a][1][t];
                    return i(n || t)
                }, u, u.exports, t, e, n, o)
            }
            return n[a].exports
        }

        for (var r = "function" == typeof require && require, a = 0; a < o.length; a++) i(o[a]);
        return i
    }({
        1: [function (t, e, n) {
            function o(t, e) {
                for (; t && t.nodeType !== i;) {
                    if ("function" == typeof t.matches && t.matches(e)) return t;
                    t = t.parentNode
                }
            }

            var i = 9;
            if ("undefined" != typeof Element && !Element.prototype.matches) {
                var r = Element.prototype;
                r.matches = r.matchesSelector || r.mozMatchesSelector || r.msMatchesSelector || r.oMatchesSelector || r.webkitMatchesSelector
            }
            e.exports = o
        }, {}], 2: [function (t, e, n) {
            function o(t, e, n, o, r) {
                var a = i.apply(this, arguments);
                return t.addEventListener(n, a, r), {
                    destroy: function () {
                        t.removeEventListener(n, a, r)
                    }
                }
            }

            function i(t, e, n, o) {
                return function (n) {
                    n.delegateTarget = r(n.target, e), n.delegateTarget && o.call(t, n)
                }
            }

            var r = t("./closest");
            e.exports = o
        }, {"./closest": 1}], 3: [function (t, e, n) {
            n.node = function (t) {
                return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType
            }, n.nodeList = function (t) {
                var e = Object.prototype.toString.call(t);
                return void 0 !== t && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length" in t && (0 === t.length || n.node(t[0]))
            }, n.string = function (t) {
                return "string" == typeof t || t instanceof String
            }, n.fn = function (t) {
                return "[object Function]" === Object.prototype.toString.call(t)
            }
        }, {}], 4: [function (t, e, n) {
            function o(t, e, n) {
                if (!t && !e && !n) throw new Error("Missing required arguments");
                if (!c.string(e)) throw new TypeError("Second argument must be a String");
                if (!c.fn(n)) throw new TypeError("Third argument must be a Function");
                if (c.node(t)) return i(t, e, n);
                if (c.nodeList(t)) return r(t, e, n);
                if (c.string(t)) return a(t, e, n);
                throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
            }

            function i(t, e, n) {
                return t.addEventListener(e, n), {
                    destroy: function () {
                        t.removeEventListener(e, n)
                    }
                }
            }

            function r(t, e, n) {
                return Array.prototype.forEach.call(t, function (t) {
                    t.addEventListener(e, n)
                }), {
                    destroy: function () {
                        Array.prototype.forEach.call(t, function (t) {
                            t.removeEventListener(e, n)
                        })
                    }
                }
            }

            function a(t, e, n) {
                return l(document.body, t, e, n)
            }

            var c = t("./is"), l = t("delegate");
            e.exports = o
        }, {"./is": 3, delegate: 2}], 5: [function (t, e, n) {
            function o(t) {
                var e;
                if ("SELECT" === t.nodeName) t.focus(), e = t.value; else if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) {
                    var n = t.hasAttribute("readonly");
                    n || t.setAttribute("readonly", ""), t.select(), t.setSelectionRange(0, t.value.length), n || t.removeAttribute("readonly"), e = t.value
                } else {
                    t.hasAttribute("contenteditable") && t.focus();
                    var o = window.getSelection(), i = document.createRange();
                    i.selectNodeContents(t), o.removeAllRanges(), o.addRange(i), e = o.toString()
                }
                return e
            }

            e.exports = o
        }, {}], 6: [function (t, e, n) {
            function o() {
            }

            o.prototype = {
                on: function (t, e, n) {
                    var o = this.e || (this.e = {});
                    return (o[t] || (o[t] = [])).push({fn: e, ctx: n}), this
                }, once: function (t, e, n) {
                    function o() {
                        i.off(t, o), e.apply(n, arguments)
                    }

                    var i = this;
                    return o._ = e, this.on(t, o, n)
                }, emit: function (t) {
                    var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), o = 0,
                        i = n.length;
                    for (o; o < i; o++) n[o].fn.apply(n[o].ctx, e);
                    return this
                }, off: function (t, e) {
                    var n = this.e || (this.e = {}), o = n[t], i = [];
                    if (o && e) for (var r = 0, a = o.length; r < a; r++) o[r].fn !== e && o[r].fn._ !== e && i.push(o[r]);
                    return i.length ? n[t] = i : delete n[t], this
                }
            }, e.exports = o
        }, {}], 7: [function (e, n, o) {
            !function (i, r) {
                if ("function" == typeof t && t.amd) t(["module", "select"], r); else if (void 0 !== o) r(n, e("select")); else {
                    var a = {exports: {}};
                    r(a, i.select), i.clipboardAction = a.exports
                }
            }(this, function (t, e) {
                "use strict";

                function n(t) {
                    return t && t.__esModule ? t : {default: t}
                }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                var i = n(e), r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                }, a = function () {
                    function t(t, e) {
                        for (var n = 0; n < e.length; n++) {
                            var o = e[n];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                        }
                    }

                    return function (e, n, o) {
                        return n && t(e.prototype, n), o && t(e, o), e
                    }
                }(), c = function () {
                    function t(e) {
                        o(this, t), this.resolveOptions(e), this.initSelection()
                    }

                    return a(t, [{
                        key: "resolveOptions", value: function t() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            this.action = e.action, this.container = e.container, this.emitter = e.emitter, this.target = e.target, this.text = e.text, this.trigger = e.trigger, this.selectedText = ""
                        }
                    }, {
                        key: "initSelection", value: function t() {
                            this.text ? this.selectFake() : this.target && this.selectTarget()
                        }
                    }, {
                        key: "selectFake", value: function t() {
                            var e = this, n = "rtl" == document.documentElement.getAttribute("dir");
                            this.removeFake(), this.fakeHandlerCallback = function () {
                                return e.removeFake()
                            }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[n ? "right" : "left"] = "-9999px";
                            var o = window.pageYOffset || document.documentElement.scrollTop;
                            this.fakeElem.style.top = o + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, i.default)(this.fakeElem), this.copyText()
                        }
                    }, {
                        key: "removeFake", value: function t() {
                            this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null)
                        }
                    }, {
                        key: "selectTarget", value: function t() {
                            this.selectedText = (0, i.default)(this.target), this.copyText()
                        }
                    }, {
                        key: "copyText", value: function t() {
                            var e = void 0;
                            try {
                                e = document.execCommand(this.action)
                            } catch (t) {
                                e = !1
                            }
                            this.handleResult(e)
                        }
                    }, {
                        key: "handleResult", value: function t(e) {
                            this.emitter.emit(e ? "success" : "error", {
                                action: this.action,
                                text: this.selectedText,
                                trigger: this.trigger,
                                clearSelection: this.clearSelection.bind(this)
                            })
                        }
                    }, {
                        key: "clearSelection", value: function t() {
                            this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges()
                        }
                    }, {
                        key: "destroy", value: function t() {
                            this.removeFake()
                        }
                    }, {
                        key: "action", set: function t() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";
                            if (this._action = e, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                        }, get: function t() {
                            return this._action
                        }
                    }, {
                        key: "target", set: function t(e) {
                            if (void 0 !== e) {
                                if (!e || "object" !== (void 0 === e ? "undefined" : r(e)) || 1 !== e.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                if ("copy" === this.action && e.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                if ("cut" === this.action && (e.hasAttribute("readonly") || e.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                this._target = e
                            }
                        }, get: function t() {
                            return this._target
                        }
                    }]), t
                }();
                t.exports = c
            })
        }, {select: 5}], 8: [function (e, n, o) {
            !function (i, r) {
                if ("function" == typeof t && t.amd) t(["module", "./clipboard-action", "tiny-emitter", "good-listener"], r); else if (void 0 !== o) r(n, e("./clipboard-action"), e("tiny-emitter"), e("good-listener")); else {
                    var a = {exports: {}};
                    r(a, i.clipboardAction, i.tinyEmitter, i.goodListener), i.clipboard = a.exports
                }
            }(this, function (t, e, n, o) {
                "use strict";

                function i(t) {
                    return t && t.__esModule ? t : {default: t}
                }

                function r(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }

                function a(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e
                }

                function c(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
                }

                function l(t, e) {
                    var n = "data-clipboard-" + t;
                    if (e.hasAttribute(n)) return e.getAttribute(n)
                }

                var s = i(e), u = i(n), f = i(o),
                    d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                        return typeof t
                    } : function (t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                    }, h = function () {
                        function t(t, e) {
                            for (var n = 0; n < e.length; n++) {
                                var o = e[n];
                                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                            }
                        }

                        return function (e, n, o) {
                            return n && t(e.prototype, n), o && t(e, o), e
                        }
                    }(), p = function (t) {
                        function e(t, n) {
                            r(this, e);
                            var o = a(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                            return o.resolveOptions(n), o.listenClick(t), o
                        }

                        return c(e, t), h(e, [{
                            key: "resolveOptions", value: function t() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                                this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, this.text = "function" == typeof e.text ? e.text : this.defaultText, this.container = "object" === d(e.container) ? e.container : document.body
                            }
                        }, {
                            key: "listenClick", value: function t(e) {
                                var n = this;
                                this.listener = (0, f.default)(e, "click", function (t) {
                                    return n.onClick(t)
                                })
                            }
                        }, {
                            key: "onClick", value: function t(e) {
                                var n = e.delegateTarget || e.currentTarget;
                                this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new s.default({
                                    action: this.action(n),
                                    target: this.target(n),
                                    text: this.text(n),
                                    container: this.container,
                                    trigger: n,
                                    emitter: this
                                })
                            }
                        }, {
                            key: "defaultAction", value: function t(e) {
                                return l("action", e)
                            }
                        }, {
                            key: "defaultTarget", value: function t(e) {
                                var n = l("target", e);
                                if (n) return document.querySelector(n)
                            }
                        }, {
                            key: "defaultText", value: function t(e) {
                                return l("text", e)
                            }
                        }, {
                            key: "destroy", value: function t() {
                                this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                            }
                        }], [{
                            key: "isSupported", value: function t() {
                                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],
                                    n = "string" == typeof e ? [e] : e, o = !!document.queryCommandSupported;
                                return n.forEach(function (t) {
                                    o = o && !!document.queryCommandSupported(t)
                                }), o
                            }
                        }]), e
                    }(u.default);
                t.exports = p
            })
        }, {"./clipboard-action": 7, "good-listener": 4, "tiny-emitter": 6}]
    }, {}, [8])(8)
});

define("modules/events", [], function () {
    var f = {}, g = {};
    f.addObserver = function (b, d, c) {
        void 0 === g[b] && (g[b] = []);
        for (var a = g[b], e = 0; e < a.length; e++) if (a[e][0] === d) {
            a.splice(e, 1);
            break
        }
        g[b].push([d, c])
    };
    f.addObservers = function (b, d, c) {
        for (var a = 0; a < b.length; a++) f.addObserver(b[a], d, c)
    };
    f.removeObserver = function (b, d) {
        var c = g[b];
        if (void 0 !== c) for (var a = 0; a < c.length; a++) if (c[a][0] === d) {
            c.splice(a, 1);
            break
        }
    };
    f.triggerEvent = function (b, d, c) {
        var a = g[d];
        if (void 0 !== a) for (var e = 0; e < a.length; e++) if (b !== a[e][0]) a[e][1](d,
            c)
    };
    f.hasObserver = function (b) {
        return void 0 !== g[b]
    };
    return f
});
define("__optEvents", [], function () {
});

define("modules/analytics", ["jquery"], function () {
    function f() {
        return void 0 !== ga && ("function" === typeof ga || ga.hasOwnProperty("loaded") && ga.loaded)
    }

    function e() {
        return ga.getByName("partner")
    }

    function i(a) {
        a = a.toISOString().replace("T", " ");
        "Z" === a.charAt(a.length - 1) && (a = a.slice(0, -1));
        return a
    }

    var b = {}, j = {};
    b.setProperty = function (a, c) {
        j[a] = c;
        f() ? (ga("set", a, c), ga(function () {
            e() && ga("partner.set", a, c)
        })) : window.console.log("ga not ready. unable to set property: " + a)
    };
    b.getProperty = function (a) {
        return j[a]
    };
    b.trackEvent = function (a, c, g, d, b) {
        var k = !1;
        if (k = d ? void 0 !== ga && ga.hasOwnProperty("loaded") && ga.loaded : f()) {
            var a = a || "N/A", c = c || "N/A", g = g || "N/A",
                h = {eventCategory: a, eventAction: c, eventLabel: g, hitCallback: d},
                a = a + " | " + (c ? c : "") + " | " + (g ? g : ""), c = new Date;
            h.dimension7 = c.toISOString();
            h.dimension8 = i(c);
            h.dimension10 = a;
            $.extend(h, b || {});
            ga("send", "event", h);
            ga(function () {
                if (e()) {
                    var a = $.extend({}, h);
                    delete a.hitCallback;
                    ga("partner.send", "event", a)
                }
            })
        } else d && d()
    };
    b.trackNonInteractionEvent = function (a, c, g,
                                           d, f) {
        var e = {}, e = $.extend(e, f || {});
        e.nonInteraction = 1;
        return b.trackEvent(a, c, g, d, e)
    };
    b.trackTiming = function (a, c, b) {
        if (f()) {
            var d = {timingCategory: a, timingVar: c, timingValue: b}, a = new Date;
            d.dimension7 = a.toISOString();
            d.dimension8 = i(a);
            d.dimension10 = "N/A";
            ga("send", "timing", d);
            ga(function () {
                e() && ga("partner.send", "timing", d)
            })
        }
    };
    b.setReferrer = function (a) {
        f() && a && ga("set", "referrer", a)
    };
    b.setPageType = function (a) {
        f() && (ga("set", "contentGroup1", a), ga(function () {
            e() && ga("partner.set", "contentGroup1", a)
        }))
    };
    b.setEntityType = function (a) {
        f() && (ga("set", "contentGroup2", a), ga(function () {
            e() && ga("partner.set", "contentGroup2", a)
        }))
    };
    b.setEntity = function (a) {
        f() && (ga("set", "contentGroup3", a), ga(function () {
            e() && ga("partner.set", "contentGroup3", a)
        }))
    };
    b.setPageTypeNew = function (a) {
        f() && (ga("set", "contentGroup4", a), ga(function () {
            e() && ga("partner.set", "contentGroup4", a)
        }))
    };
    b.trackPageView = function (a, c) {
        if (f()) {
            var b = {page: a || "", title: c || ""}, d = new Date;
            b.dimension7 = d.toISOString();
            b.dimension8 = i(d);
            b.dimension10 =
                "N/A";
            ga("send", "pageview", b);
            ga(function () {
                e() && ga("partner.send", "pageview", b)
            })
        }
    };
    return b
});
define("__optAnalytics", [], function () {
});

define("modules/analyticsEventParams", [], function () {
    return {
        CAT_HP: "home",
        CAT_HP_SUGGESTEDPLANS: "home.suggestedplans",
        CAT_HP_TRENDING: "home.trending",
        CAT_HP_RECENTPLANS: "home.recentplans",
        CAT_HP_MYPLANS: "home.myplans",
        CAT_ALP: "attraction-landing",
        CAT_ALP_DETAILS: "attraction-landing.attraction-details",
        CAT_ALP_THINGSTODO_FOOTER: "attraction-landing.top-attractions.footer",
        CAT_ALP_GEOCRUMB: "attraction-landing.attraction-info.geocrumb",
        CAT_ALP_EXTERNAL: "attraction-landing.attraction-info.external",
        CAT_ALP_INFO: "attraction-landing.attraction-info",
        CAT_ALP_NEARBY_LIST: "attraction-landing.nearby-attractions.list",
        CAT_ALP_NEARBY_MAP: "attraction-landing.nearby-attractions.map",
        CAT_ALP_FLOAT: "attraction-landing.floating-title",
        CAT_ALP_COMPLETEPLAN: "attraction-landing.complete-plan",
        CAT_ALP_VIAWIDGET: "attraction-landing.via-widget",
        CAT_ALP_BUYTICKETS: "attraction-landing.attraction-info.buy-tickets",
        CAT_ALP_REVIEWS: "attraction-landing.reviews",
        CAT_DLP: "destination-landing",
        CAT_DLP_INFO: "destination-landing.destination-info",
        CAT_DLP_THINGSTODO: "destination-landing.things-to-do",
        CAT_DLP_GEOCRUMB: "destination-landing.destination-info.geocrumb",
        CAT_DLP_DEST_RECOS: "destination-landing.vacation-ideas",
        CAT_DLP_DEST_RECOS_MAP_INFO: "destination-landing.vacation-ideas.map-info-window",
        CAT_DLP_EXPLORE_REGIONS: "destination-landing.vacation-ideas.explore-region",
        CAT_DLP_PHOTOS: "destination-landing.destination-info.photos",
        CAT_DLP_TOP_DESTINATIONS: "destination-landing.top-destinations",
        CAT_DLP_DEST_RECOS_MULTICITY: "destination-landing.vacation-ideas.multi-city",
        CAT_DLP_COMPLETEPLAN: "destination-landing.complete-plan",
        CAT_DLP_CATGROUP: "destination-landing-category-group",
        CAT_DLP_FAUX_MAP: "destination-landing.faux-map",
        CAT_PLAN: "plan",
        CAT_PLAN_TODO: "plan-todolist",
        CAT_PLAN_OVERVIEW: "overview",
        CAT_PLAN_OVERVIEW_STAY: "overview.stay",
        CAT_PLAN_DBD_LIST_STAY: "itinerary.list.stay",
        CAT_PLAN_ROUTE: "route",
        CAT_PLAN_ROUTE_STAY: "route.stay",
        CAT_PLAN_ROUTE_TRAVEL: "route.travel",
        CAT_PLAN_ROUTE_TRAVEL_OPTIONS: "route.travel.options",
        CAT_PLAN_ROUTE_RECOS: "route.recommendations",
        CAT_PLAN_TRANS_CARTILE: "how-to-travel.car-tile",
        CAT_PLAN_HOTELS: "hotels",
        CAT_PLAN_CALENDAR: "itinerary.calendar.main",
        CAT_PLAN_CALENDAR_ERRORTIP: "itinerary.calendar.errortip",
        CAT_PLAN_CALENDAR_OVERFLOW: "itinerary.calendar.overflow",
        CAT_PLAN_DBD_LIST: "itinerary.list",
        CAT_PLAN_DBD_LIST_VISIT: "itinerary.list.visit",
        CAT_PLAN_DBD_LIST_RESERVED: "itinerary.list.reserved",
        CAT_PLAN_DBD_LIST_HOP: "itinerary.list.hop",
        CAT_PLAN_DBD_LIST_TRAVEL: "itinerary.list.travel",
        CAT_PLAN_DBD_LIST_CAR_UPSELL: "itinerary.list.car-upsell",
        CAT_PLAN_DBD_LIST_HOTEL_UPSELL: "itinerary.list.hotel-upsell",
        CAT_PLAN_DBD_SUBNAV: "itinerary.subnav",
        CAT_PLAN_DBD_LEFTPANE: "itinerary.left-pane",
        CAT_PLAN_DBD_MAP: "itinerary.map",
        CAT_PLAN_DBD_CAROUSEL: "itinerary.carousel",
        CAT_PLAN_AGENT: "travel-agent",
        CAT_PLAN_TRANS: "transportation",
        CAT_PLAN_TRANS_TILE: "transportation.tile",
        CAT_PLAN_CAR_SEARCH_DIALOG: "car-search-form-dlg",
        CAT_PLAN_FLIGHT_SEARCH_DIALOG: "flight-search-form-dlg",
        CAT_PLAN_FLIGHT_RESULTS_DIALOG: "flight-search-dlg",
        CAT_PLAN_NAV: "nav",
        CAT_PLAN_EXPLORE: "explore",
        CAT_PLAN_EXP_DEST_ATTRS: "explore.destination.attractions",
        CAT_PLAN_DLG_RESERVED: "dlg-reserved",
        CAT_PLAN_DLG_VISIT: "dlg-visit",
        CAT_PLAN_DLG_TRAVEL: "dlg-travel",
        CAT_PLAN_DLG_HOTEL: "dlg-hotel",
        CAT_EXPLORE_DEST_SCHEDULE: "explore.destination.about.schedule",
        CAT_EXPLORE_DEST_RECOS: "explore.destination.about.vacation-ideas",
        CAT_EXPLORE_DEST_RECOS_MAP: "explore.destination.about.vacation-ideas.map",
        CAT_EXPLORE_DEST_DESTS: "explore.destination.destinations",
        CAT_EXPLORE_DEST_ABOUT: "explore.destination.about",
        CAT_EXPLORE_ATTR_NEARBY: "explore.attraction.nearby-attractions",
        CAT_EXPLORE_SEARCH: "explore.search",
        CAT_DETAILS_DEST: "destination-details",
        CAT_DETAILS_DEST_RECOS: "destination-details.vacation-ideas",
        CAT_DETAILS_DEST_SCHEDULE: "destination-details.destination-schedule",
        CAT_DETAILS_ATTR: "attraction-details",
        CAT_DETAILS_ATTR_NEARBY: "attraction-details.nearby-attractions",
        CAT_DETAILS_ATTR_REVIEWS: "attraction-details.reviews",
        CAT_LOGIN: "login",
        CAT_LOGIN_CONTINUE: "login.continue-logged-in",
        CAT_ERROR: "error",
        CAT_RECENTPLANS: "recentplans",
        CAT_RESETPASSWD: "reset-password",
        CAT_INTENTMEDIA: "intentmedia",
        CAT_SMARTERADS: "smarterads",
        CAT_AJAX: "ajax",
        CAT_HEADER: "header",
        CAT_HEADER_MYPLANS_BAR: "header.myplans-bar",
        ACT_DOMAIN: "domain",
        ACT_WHERE: "where",
        ACT_STARTDT: "start-date",
        ACT_ENDDT: "end-date",
        ACT_DURATION: "duration",
        ACT_DAYS_AHEAD: "days-ahead",
        ACT_WHO: "who",
        ACT_INTEREST: "interest",
        ACT_STYLE: "style",
        ACT_PACE: "pace",
        ACT_CATEGORY: "category",
        ACT_ATTR_CLICK: "click-attraction",
        ACT_DEST_CLICK: "click-destination",
        ACT_WEB_CLICK: "click-website",
        ACT_TA_CLICK: "click-tripadvisor-link",
        ACT_START_PLAN_CLICK: "click-start-plan",
        ACT_RECENT_PLANS_CLICK: "click-recent-plans",
        ACT_PLAN_CLICK: "click-plan",
        ACT_DISMISS_CLICK: "click-dismiss",
        ACT_ADD_USER_RATING: "add-user-rating",
        ACT_CHANGE_LANGUAGE: "change-language",
        ACT_CHANGE_CURRENCY: "change-currency",
        ACT_ADD_ATTACHMENT: "upload-attachment",
        ACT_TAB: "tab",
        ACT_CLICK_MODE: "click-mode",
        ACT_SHOW_MODE: "show-mode",
        ACT_ADD_DEST: "add-destination",
        ACT_ADD_ATTR: "add-attraction",
        ACT_ADD_RESERVED: "add-reserved",
        ACT_ADD_RESERVATION: "add-reservation",
        ACT_DEL_STAY: "delete-stay",
        ACT_DEL_VISIT: "delete-visit",
        ACT_DEL_RESERVED: "delete-reserved",
        ACT_DEL_RESERVATION: "delete-reservation",
        ACT_DEL_HOTEL: "delete-hotel",
        ACT_DEL_CAR: "delete-car",
        ACT_DEL_PLAN: "delete-plan",
        ACT_DEL_SHARED_PLAN: "delete-shared-plan",
        ACT_RESIZE_VISIT: "resize-visit",
        ACT_RESIZE_RESERVED: "resize-reserved",
        ACT_RESIZE_HOTEL: "resize-hotel",
        ACT_RESIZE_CAR: "resize-car",
        ACT_RESIZE_TRAVEL: "resize-travel",
        ACT_MOVE_VISIT: "drag-drop-visit",
        ACT_MOVE_RESERVED: "drag-drop-reserved",
        ACT_MOVE_HOTEL: "drag-drop-hotel",
        ACT_MOVE_TRAVEL: "drag-drop-travel",
        ACT_PLAN_RENAME: "rename",
        ACT_ADJUST_ROUTE: "adjust-route",
        ACT_CHANGE_DURATION: "change-duration",
        ACT_DUP_PLAN: "duplicate-plan",
        ACT_UPD_RESERVATION: "update-reservation",
        ACT_LOGOUT: "logout",
        ACT_RECALC: "recalculate",
        ACT_SHOW_CREATE_PLAN: "show-create-plan-prompt",
        ACT_LOAD_IN_TRAVEL: "load-in-travel-dates",
        ACT_CODE: "code",
        ACT_GMAP_LOAD: "load-google-map",
        ACT_DLG_OPEN: "open-dialog",
        ACT_LOAD_MORE: "load-more",
        ACT_SHOW_MORE: "show-more",
        ACT_SHOW_VIATOR_TICKETS: "viator-ticket-open-dlg",
        ACT_DIR_CLICK: "click-directions",
        ACT_RESET_PWD: "reset-password",
        ACT_ACTION: "action",
        ACT_EDIT_CALENDAR: "edit-in-calendar",
        ACT_PROMPT_START_AIRPORT: "prompt-start-dest-airport",
        ACT_PROMPT_END_AIRPORT: "prompt-end-dest-airport",
        ACT_ACCOUNT_DELETE: "account-delete",
        ACT_SEARCH_FLIGHTS: "search-flights",
        ACT_SEARCH_CARS: "search-cars",
        ACT_SEARCH_TRAINS: "search-trains",
        ACT_CAR_COMPARISON: "search-cars-comparison",
        ACT_FLIGHT_COMPARISON: "search-flights-comparison",
        CAT_CREATE_PLAN: "create-plan",
        ACT_CREATE_PLAN: "create-plan",
        CAT_BOOK_PLAN: "book-plan",
        ACT_BOOK_PLAN: "book-plan",
        CAT_REQUEST_AGENT: "request-agent",
        ACT_REQUEST_AGENT: "request-agent",
        CAT_CUST_PLAN: "customize-plan",
        ACT_CUST_PLAN: "customize-plan",
        ACT_FLIGHT_SEARCH_DEEPLINK: "flight-search-deeplink"
    }
});
define("__optAnalyticsEventParams", [], function () {
});

/*
 text 2.0.15 Copyright jQuery Foundation and other contributors.
 Released under MIT license, http://github.com/requirejs/text/LICENSE
*/
define("params", ["jquery", "jqueryui"], function () {
    function h(a) {
        var b = i.param, e = !1, d = a.split(".");
        $.each(d, function (a, m) {
            if (a > d.length - 2) return !1;
            if (!b[m]) return e = !0, !1;
            b = b[m]
        });
        return e ? null : b
    }

    var i = {
        param: {}, add: function (a, b) {
            if (a) for (var e = i.param, d = a.split("."), h = 0; h < d.length; h++) {
                var m = isNaN(Number(d[h])) ? d[h] : Number(d[h]);
                e[m] || (e[m] = h + 1 < d.length && !isNaN(Number(d[h + 1])) ? [] : {});
                h >= d.length - 1 && (e[m] = b);
                e = e[m]
            }
        }, remove: function (a) {
            var b = h(a);
            b && (a = a.split("."), delete b[a[a.length - 1]])
        }, flush: function () {
            i.param =
                {}
        }, stringify: function () {
            return JSON.stringify(i.param)
        }, toQueryParam: function () {
            return $.param(i.param)
        }, get: function (a) {
            var b = h(a);
            if (!b) return null;
            a = a.split(".");
            return b[a[a.length - 1]]
        }, getQueryParam: function () {
            var a = i.fromQueryParam();
            i.flush();
            return a
        }, fromQueryParam: function () {
            $("<div />").append(location.search.slice(1)).html().split("&").forEach(function (a) {
                var a = a.split("="),
                    b = decodeURIComponent(a[0].replace(/\+/g, " ")).replace(/\[/g, ".").replace(/\]/g, "");
                i.add(b, decodeURIComponent(a[1] ?
                    a[1].replace(/\+/g, " ") : ""))
            });
            if (i.get("json-data")) {
                var a = i.get("json-data");
                try {
                    a = JSON.parse(a)
                } catch (b) {
                    return
                }
                $.extend(i.param, i.param, a)
            }
            return i.param
        }
    };
    return i
});
define("modules/utils", ["params", "jquery", "jqueryui"], function (h) {
    function i(c, a) {
        return 0 < c[0].scrollHeight - c.innerHeight() && (a || -1 === ["visible", "hidden"].indexOf(c.css("overflow"))) || c.is(document) ? c : i(c.scrollParent(), !0)
    }

    var a = {}, b, e = ["#058cbb", "#45c1c9", "#5a9c9a", "#0b2c33"],
        d = "zeroth first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelvth thirteenth fourteenth fifteenth sixteenth seventeenth eighteenth nineteenth".split(" "),
        t = "twent thirt fourt fift sixt sevent eight ninet".split(" "),
        m = /^(([^<>=()[\]\\.,;:\s@\"!]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        r = /^[a-zA-Z]+$/, j = /^[0-9\-\(\)\+\s]+$/, k = /^.*?[<>/:;\"\[\]{}0-9!@?#$%^&*\(\)_+=~`]+.*?$/, u;
    a:{
        try {
            (0).toLocaleString("i")
        } catch (v) {
            u = "RangeError" === v.name;
            break a
        }
        u = !1
    }
    var s = u && !!("object" == typeof Intl && Intl && "function" == typeof Intl.NumberFormat),
        n = '<div class="progress-search-flight"><div class="background"></div><img class="progress-img" src="' +
            window.ajaxLoaderPath + '" alt="Loading..."></div>';
    a.ISO_DATE_FORMAT = "YYYY-MM-DD";
    a.ISO_DATE_TIME_FORMAT = "YYYY-MM-DD[T]HH:mm:ss";
    a.JQUERY_ISO_DATE_FORMAT = "yy-mm-dd";
    a.EDIT_PLAN_DATE_FORMAT = "MM/DD/YY";
    a.DEFAULT_DATE_FORMAT = "mm/dd/y";
    a.DEFAULT_DISPLAY_DATE_FORMAT = window.dateFormatDisplayPattern;
    a.MAX_TRAVELERS_FLIGHT = 8;
    a.prepareStickers = function () {
        var c = $(".stickers").find(".sticker");
        1 !== c.length && (window.setInterval(function () {
            var a = c.filter(".active"), f = (a.index() + 1) % c.length;
            a.removeClass("active");
            c.eq(f).addClass("active")
        }, 7E3), c.off("click").on("click", function () {
            $(this).hasClass("trust-pilot") && $(this).hasClass("active") && window.open($(this).data("url"))
        }))
    };
    a.getCustomUrl = function (c) {
        var a = $("#plan").data("planNewUrl");
        if (a) {
            var f = c.split("/");
            "trip" === f[1] && (f[2] = a, c = f.join("/"))
        }
        return c
    };
    a.numToStr = function (c) {
        return 100 <= c ? null : 20 > c ? d[c] : 0 === c % 10 ? t[Math.floor(c / 10) - 2] + "ieth" : t[Math.floor(c / 10) - 2] + "y " + d[c % 10]
    };
    a.formatDuration = function (c) {
        var a = Math.floor(c / 60), c = c % 60, f = "";
        0 < a && (f +=
            a + "h");
        0 < c && f.length && (f += " ");
        0 < c && (f += c + "min");
        return f
    };
    a.formatPrice = function (c, a, f) {
        c = Math.ceil(parseFloat(c));
        return s ? c.toLocaleString(f, {
            style: "currency",
            currency: a,
            maximumFractionDigits: 0,
            minimumFractionDigits: 0
        }) : a + c
    };
    a.minsToTime = function (c) {
        var a = Math.floor(c / 60);
        return (a % 12 || 12) + ":" + (9 >= c % 60 ? "0" + c % 60 : c % 60) + " " + (12 <= a ? "PM" : "AM")
    };
    a.getColor = function (c) {
        return e[c % e.length]
    };
    a.getNumColors = function () {
        return e.length
    };
    a.encodeHtml = function (c) {
        return c.replace(/&/g, "&amp;").replace(/</g,
            "&lt;").replace(/>/g, "&gt;")
    };
    a.getPlanUrl = function (c) {
        c = (c || location.pathname).split("/");
        return c.length && "plan" === c[1] || c.length && "trip" === c[1] ? "/trip/" + c[2] : ""
    };
    a.getAbsolutePlanUrl = function () {
        var c = location.pathname, a = c.split("/");
        if (a.length && "plan" === a[1] || a.length && "trip" === a[1]) c = "/trip/" + a[2];
        return location.protocol + "//" + location.host + c
    };
    a.canonicalizeUrl = function (c) {
        var a = document.createElement("div");
        a.innerHTML = "<a></a>";
        a.firstChild.href = c;
        a.innerHTML = a.innerHTML;
        return a.firstChild.href
    };
    a.capitalize = function (c) {
        return c.charAt(0).toUpperCase() + c.slice(1)
    };
    var l = function (c, q, f, g, x) {
        var b = $("<div>" + q + "</div>");
        b.dialog({
            title: c,
            resizable: !1,
            modal: !0,
            draggable: !1,
            dialogClass: "dlg-message mediumx",
            width: "560px",
            buttons: [{
                text: f, click: function () {
                    b.dialog("close");
                    g && g.apply(this)
                }
            }],
            open: function () {
                $(this).parents(".ui-dialog").css("z-index", "1030");
                a.setupDialogOverlay(b, !1)
            },
            close: function () {
                b.dialog("destroy").remove();
                x && x.apply(this)
            }
        })
    };
    a.showOkDialog = function (c, a, f, g, x) {
        l(void 0,
            '<div class="title-icon"><span class="fa fa-thumbs-up"></span></div><h2>' + c + '</h2><div class="message">' + a + "</div>", f, g, x)
    };
    a.showExclamationDialog = function (c, a, f) {
        l(void 0, '<div class="title-icon"><span class="fa fa-exclamation-circle"></span></div><h2>' + c + '</h2><div class="message">' + a + "</div>", f)
    };
    a.showMessageDialog = function (c, a) {
        l(void 0, "<center>" + c + "</center>", a)
    };
    a.showErrorTooltip = function (c, q, f, g, x) {
        if (a.isMobile()) a.mobileErrorMessage(q); else {
            if (x && x.length) x.off("click.errorhide").on("click.errorhide",
                function () {
                    a.hideErrorTooltip(c)
                }); else if ((c.is("input:text") || c.hasClass("ui-selectmenu-button") || c.hasClass("reservation-row")) && !c.hasClass("hasDatepicker")) c.off("input.errorhide click.errorhide").on("input.errorhide click.errorhide", function () {
                a.hideErrorTooltip(c)
            }); else if (c.is("input:password") && !g) {
                var b = c.siblings('input[type="password"]');
                if (b.length) $([b, c]).each(function () {
                    $(this).off("input." + this.attr("id")).on("input." + this.attr("id"), function () {
                        b.val().trim() === c.val().trim() ? (a.hideErrorTooltip(b),
                            a.hideErrorTooltip(c)) : (b.val().trim() && a.hideErrorTooltip(b), b.val().trim() && c.val().trim() ? a.showErrorTooltip(c, "The two passwords do not match") : c.val().trim() && a.hideErrorTooltip(c))
                    })
                }); else c.off("input.password").on("input.password", function () {
                    a.hideErrorTooltip(c)
                })
            } else {
                if (!c.siblings(".error-message").length && !g) {
                    c.before('<div class="error-message">' + q + "</div>");
                    c.click(function () {
                        c.siblings(".error-message").remove()
                    });
                    return
                }
                if (g) c.off("input.errorhide click.errorhide").on("input.errorhide click.errorhide",
                    function () {
                        a.hideErrorTooltip(c)
                    })
            }
            var x = c.qtip("api"), d;
            x && (d = x.options.content.text);
            var e;
            a.isMobile() ? (e = {
                my: "top center",
                at: "bottom center"
            }, c.addClass("has-error")) : e = {
                my: "left center",
                at: "right center",
                container: g && g.container ? $(g.container) : $("body"),
                viewport: $(window),
                effect: !1
            };
            !x || d !== q ? (q = {
                    content: q, position: e, style: {classes: "error"}, events: {
                        show: function () {
                            c.addClass("error-qtip");
                            f && f.apply(this)
                        }, hide: function () {
                            c.removeClass("error-qtip")
                        }
                    }, hide: !1
                }, q = $.extend({}, q, g), c.qtip(q).qtip("show")) :
                c.qtip("show")
        }
    };
    a.hideErrorTooltip = function (c) {
        c.qtip("destroy");
        a.isMobile() && c.removeClass("has-error")
    };
    a.removeAllErrorToolTips = function () {
        try {
            $(".qtip.error").qtip("api").destroy(!0)
        } catch (c) {
        }
    };
    a.hideAllOpenQtips = function () {
        try {
            $(".qtip").qtip("hide")
        } catch (c) {
        }
    };
    a.encode_destination = function (c) {
        return c.replace(/[ \.\'\-]+/g, "_")
    };
    a.isName = function (c) {
        return c.length && !k.test(c)
    };
    a.isAlpha = function (c) {
        return r.test(c)
    };
    a.isNumeric = function (c) {
        return $.isNumeric(c)
    };
    a.isPhoneNumber = function (c) {
        return j.test(c) ?
            (c = c.replace(/[\-\(\)\+\s]/g, ""), "" !== c && a.isNumeric(c)) : !1
    };
    a.validateEmail = function (c) {
        return m.test(c) && 254 >= c.length ? !0 : !1
    };
    a.validateEmailField = function (c) {
        if ("" === c.val()) return a.showErrorTooltip(c, "You must add an email address"), !1;
        if (a.validateEmail(c.val().trim())) return a.hideErrorTooltip(c), !0;
        a.showErrorTooltip(c, "Email address is invalid");
        return !1
    };
    a.trimEmail = function (c, a) {
        var f = c.split("@");
        return f[0].length > a ? (f[0] = f[0].substring(0, a - 2) + "...", f.join("@")) : c
    };
    a.getFloatingBarsHeight =
        function () {
            return $(".plan-header-wrap.dock-top").outerHeight(!0)
        };
    a.getParameterByName = function (c) {
        c = c.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        c = RegExp("[\\?&]" + c + "=([^&#]*)").exec(window.location.search);
        return null === c ? "" : decodeURIComponent(c[1].replace(/\+/g, " "))
    };
    a.removeParameterByName = function (c) {
        var a = window.location.href, f = a.split("?");
        if (2 <= f.length) {
            for (var c = encodeURIComponent(c) + "=", a = f[1].split(/[&;]/g), g = a.length; 0 < g--;) -1 !== a[g].lastIndexOf(c, 0) && a.splice(g, 1);
            a = f[0] + "?" + a.join("&")
        }
        return a
    };
    a.addUrlParam = function (c, a, f) {
        var f = a + "=" + f, g = "?" + f;
        c && (g = c.replace(RegExp("[?&]" + a + "[^&]*"), "$1" + f), g === c && (g += "&" + f));
        return g
    };
    a.isGoogleMapsApiAvailable = function () {
        return void 0 !== window.google && void 0 !== window.google.maps.Map
    };
    a.getWindowHeight = function () {
        var c = document.body, a = document.documentElement;
        return window.innerHeight || a && a.clientHeight || c && c.clientHeight || 0
    };
    a.joinArray = function (c, a, f) {
        var g = "", b;
        for (b = 0; b < c.length; b++) 0 < b && f && b === c.length - 1 ? g += f : 0 < b && (g += a), g += c[b];
        return g
    };
    a.setupDialogOverlay =
        function (c, a, f, g, b) {
            var d = c.parents(".ui-dialog"), e;
            !d.next(".ui-widget-overlay").length && !b && d.after('<div class="ui-widget-overlay"></div>');
            e = d.next(".ui-widget-overlay");
            e.length || (e = d.siblings(":last"));
            e.css("z-index", parseInt(d.css("z-index")) - 1);
            a ? e.addClass("transparent-overlay") : e.removeClass("transparent-overlay");
            if (!f) e.off("click").on("click", function () {
                g ? g(c) : c.dialog("close");
                e.off("click")
            })
        };
    a.addCookie = function (c, a, f) {
        if (f) {
            var g = new Date;
            g.setTime(g.getTime() + 864E5 * f);
            f = "; expires=" +
                g.toGMTString()
        } else f = "";
        document.cookie = c + "=" + a + f + "; path=/"
    };
    a.getCookie = function (c) {
        var c = c + "=", a = document.cookie.split(";"), f;
        for (f = 0; f < a.length; f++) {
            for (var g = a[f]; " " === g.charAt(0);) g = g.substring(1, g.length);
            if (0 === g.indexOf(c)) return g.substring(c.length, g.length)
        }
        return null
    };
    a.endsWith = function (c, a) {
        return -1 !== c.indexOf(a, c.length - a.length - 1)
    };
    a.formatName = function (c, a) {
        switch (a) {
            case "FIRST_NAME":
                return !c ? c : c.split(" ")[0];
            default:
                return c
        }
    };
    a.showFlash = function (c, q, f, g) {
        var b = $("#flash");
        b.toggleClass("small-message", g);
        b.removeClass("hide-flash").find(".message").empty();
        b.find(".message").html('<span class="wrap ' + (q ? "close" : "") + '">' + c + "</span>");
        b.css({width: ""}).fadeIn();
        q && (b.find(".message").append('<i class="fa fa-times close"></i>'), b.find(".message").find(".close").off("click").on("click", function () {
            a.hideFlash()
        }));
        f && setTimeout(function () {
            a.hideFlash()
        }, f);
        return b
    };
    a.hideFlash = function (c, a) {
        var f = $("#flash");
        f.toggleClass("small-message", a);
        c && f.css("width", f.outerWidth()).find(".wrap").html(c);
        f.fadeOut();
        return f
    };
    a.showLoadingIcon = function (c) {
        return a.overlay(c, n, {"z-index": 1010})
    };
    a.overlay = function (c, a, f, g) {
        var b = {};
        b.$container = c;
        b.$overlay = $(a).css({
            position: "absolute",
            top: c.offset().top - (g ? g.offset().top : 0),
            left: c.offset().left - (g ? g.offset().left : 0),
            width: c.outerWidth(),
            height: Math.min(c.outerHeight(), $(window).height()) - (c.offset().top - (g ? g.offset().top : 0))
        });
        f && b.$overlay.css(f);
        b.$overlay.addClass("overlay-wrapper");
        g && g.length ? b.$overlay.appendTo(g) : b.$overlay.insertAfter($("#pageWrapper"));
        b.remove = function () {
            b.$overlay.remove()
        };
        return b
    };
    a.showErrorModal = function (c, q, f, g, b) {
        var d = $(document.createElement("div"));
        d.html(c);
        d.dialog({
            title: "Error",
            resizable: !1,
            modal: !0,
            draggable: !1,
            width: "350px",
            dialogClass: "errorDialog mediumx",
            buttons: q,
            close: function (c, a) {
                d.dialog("destroy").remove();
                g && g(c, a)
            },
            open: function (c, g) {
                a.setupDialogOverlay(d, !1);
                f && f(c, g)
            },
            create: function (c, a) {
                b && b(c, a)
            }
        });
        d.close = function () {
            d.dialog("close")
        };
        return d
    };
    a.modal = function (c) {
        var q = $(document.createElement("div"));
        q.html(c.message);
        q.dialog({
            title: c.title,
            resizable: !1,
            modal: !0,
            draggable: !1,
            width: c.width,
            dialogClass: c.dialogClass,
            buttons: c.buttons,
            close: function (a, g) {
                q.dialog("destroy").remove();
                c.close && c.close(a, g)
            },
            open: function (f, g) {
                a.setupDialogOverlay(q, !1);
                c.open && c.open(f, g);
                q.dialog({position: {my: "center", at: "center", of: window}})
            },
            create: function (a, g) {
                c.create && c.create(a, g)
            }
        });
        q.close = function () {
            q.dialog("close")
        };
        return q
    };
    a.escape = function (c) {
        return $("<div/>").text(c).html()
    };
    a.unescape = function (c) {
        return $("<div/>").html(c).text()
    };
    a.display = function (c, a) {
        a ? $(c).removeClass("hidden") : $(c).addClass("hidden")
    };
    a.login = function (c, q) {
        a.params.remove("post-login-url");
        var f = a.params.stringify();
        a.params.flush();
        window.partnerDomain && (a.params.add("partner", window.partnerDomain), window.userId && a.params.add("partnerUserId", window.userId));
        var g = location.href, b = !1;
        q && -1 === location.pathname.indexOf("/trip/") && (b = !0, g = location.origin + "/myPlans");
        b || (g = location.search ? g + ("&json-data=" + f) : g + ("?json-data=" + f));
        a.params.add("post-login-url",
            g);
        c && a.params.add("defaultView", c);
        window.location.href = window.inspirockSecureDomain + window.contextPath + "/login?" + a.params.toQueryParam()
    };
    a.stringify = function (a) {
        return a ? JSON.stringify(a) : null
    };
    a.parentScrollableElement = function (a) {
        a = $(a).parents().filter(function () {
            var a = $(this);
            return a.get(0).scrollHeight > a.height() || a.get(0).scrollWidth > a.width()
        });
        return !a || !a.length ? null : $(a[0])
    };
    a.isElementVisible = function (c) {
        if (!c.length) return !1;
        var b = a.parentScrollableElement(c), f = $(c).offset(), c = f.left -
            b.offset().left, f = f.top - b.offset().top;
        return b && 0 <= c && c < b.width() && 0 <= f && f < b.height()
    };
    a.planTabUrl = function () {
        var a = location.pathname;
        return -1 !== a.indexOf("/modal/") ? a.split("/modal/")[0] : a
    };
    a.isEditable = function () {
        return $("body").hasClass("edit-enabled")
    };
    $.fn.scrollTo = function (a, b, f) {
        "function" == typeof b && 2 == arguments.length && (f = b, b = a);
        var g = $.extend({scrollTarget: a, offsetTop: b.offsetTop, duration: b.duration, easing: "swing"}, b);
        return this.each(function () {
            var a = $(this), c = "number" == typeof g.scrollTarget ?
                g.scrollTarget : $(g.scrollTarget),
                c = "number" == typeof c ? c : c.offset().top + a.scrollTop() - parseInt(g.offsetTop);
            a.animate({scrollTop: c - $("body").scrollTop()}, parseInt(g.duration), g.easing, function () {
                "function" == typeof f && f.call(this)
            })
        })
    };
    a.deparam = function (a, b) {
        var f = {}, g = {"true": !0, "false": !1, "null": null};
        a.replace(/\+/g, " ").split("&").forEach(function (a) {
            var c = a.split("="), a = decodeURIComponent(c[0]), d = f, e = 0, j = a.split("]["), k = j.length - 1;
            /\[/.test(j[0]) && /\]$/.test(j[k]) ? (j[k] = j[k].replace(/\]$/, ""),
                j = j.shift().split("[").concat(j), k = j.length - 1) : k = 0;
            if (2 === c.length) if (c = decodeURIComponent(c[1]), b && (c = c && !isNaN(c) && +c + "" === c ? +c : "undefined" === c ? void 0 : void 0 !== g[c] ? g[c] : c), k) for (; e <= k; e++) a = "" === j[e] ? d.length : j[e], d = d[a] = e < k ? d[a] || (j[e + 1] && isNaN(j[e + 1]) ? {} : []) : c; else "[object Array]" === Object.prototype.toString.call(f[a]) ? f[a].push(c) : f[a] = {}.hasOwnProperty.call(f, a) ? [f[a], c] : c; else a && (f[a] = b ? void 0 : "")
        });
        return f
    };
    a.deserialize = function (a, b) {
        if (a) {
            for (var f = a.split(/&amp;|&/i), g = {}, b = b || {}, d =
                0; d < f.length; d++) {
                var e = f[d].split("=");
                e[0] = decodeURIComponent(e[0]);
                if (!b.except || -1 == b.except.indexOf(e[0])) if (/^\w+\[\w+\]/.test(e[0])) {
                    var j = e[0].split("[");
                    g[j[0]] = g[j[0]] ? g[j[0]] : [];
                    for (var k = g[j[0]], h = 1; h < j.length; h++) k[j[h].replace("]", "")] = k[j[h].replace("]", "")] ? k[j[h].replace("]", "")] : [], h === j.length - 1 ? k[j[h].replace("]", "")] = decodeURIComponent(e[1]) : k = k[j[h].replace("]", "")]
                } else g[e[0]] = decodeURIComponent(e[1])
            }
            return g
        }
    };
    a.isMobile = function () {
        return window.isMobile
    };
    a.mobileErrorMessage =
        function (c) {
            b ? b.append(c) : b = a.mobileDialog({
                heading: "Error", message: c, buttons: {
                    OK: function (a) {
                        a.close()
                    }
                }, close: function () {
                    b = null
                }
            })
        };
    a.mobileDialog = function (a) {
        var b = {}, f = Date.now(), g = $('<div class = "mobile-dialog-overlay" />'),
            d = $("body").scrollTop() || $("html").scrollTop(), e = 200021;
        b.close = function (f) {
            $("body").css({position: "", top: ""});
            $("html,body").animate({scrollTop: d}, 0);
            b.content.remove();
            a.close && a.close(f);
            g.remove()
        };
        b.dialog = function (a) {
            "close" === a && b.close()
        };
        b.append = function (a) {
            b.content.find(".message").append("<br />" +
                a)
        };
        var j = a.className ? a.className : "", k = a.screen ? a.screen : "";
        $(".mobile-dialog").length && (e = parseInt($(".mobile-dialog:last").css("z-index")) + 2);
        b.content = $('<div class="mobile-dialog ' + k + " " + j + '"></div>');
        j = '<div class="close"><i class="fa fa-times"></i></div>';
        a.heading && (j += '<div class="heading">' + a.heading + "</div>");
        a.message && (j += '<div class="message">' + a.message + "</div>");
        if (a.buttons) {
            var j = j + '<div class="buttons">', h;
            for (h in a.buttons) j += '<div class="button button-' + f + '" data-key="' + h + '">' +
                h + "</div>";
            j += "</div>"
        }
        a.footer && (j += '<div class="footer">' + a.footer + "</div>");
        b.content.append(j);
        b.content.css({"z-index": e});
        g.css({"z-index": e - 1});
        $("body").append(b.content);
        $("body").append(g);
        $(".button-" + f).off("click").on("click", function (f) {
            a.buttons[$(this).data("key")](b, $(this), f)
        });
        b.content.find(".close").off("click").on("click", function (a) {
            b.close(a)
        });
        $("body").attr("style", "top: " + -d + "px !important");
        $("body").css({position: "fixed"});
        g.fadeIn(250);
        if (!a.noDismiss) g.off("click.dialog").on("click.dialog",
            function () {
                $(this).data("remainOpen") || b.close()
            });
        b.content.data("dialog", b);
        a && a.open && a.open(b.content);
        return b
    };
    a.lastIndexOf = function (a, b, f) {
        a = f ? a.substring(0, f) : a;
        return (b = a.match(b)) ? a.lastIndexOf(b[b.length - 1]) : -1
    };
    a.ellipsizeNames = function (c) {
        var b = !1;
        c.parents(".plan-heading, .plan-hero").hasClass("hidden") && (c.parents(".plan-heading, .plan-hero").removeClass("hidden"), b = !0);
        for (var f = c[0], g = f.textContent.trim(), d = parseInt(c.css("maxHeight"), 10); f.scrollHeight > d + 2;) {
            var j = a.lastIndexOf(g,
                /[- ]/g);
            if (0 <= j) g = g.substring(0, j) + "...", f.textContent = g; else break
        }
        b && c.parents(".plan-heading, .plan-hero").addClass("hidden")
    };
    a.ellipsizePlanNames = function (c) {
        c.each(function () {
            var c = $(this).find(".primarytext");
            a.ellipsizeNames(c)
        })
    };
    a.enableScroll = function () {
        $("body").removeClass("scroll-hide")
    };
    a.disableScroll = function () {
        $("body").addClass("scroll-hide")
    };
    a.createOptionForTime = function (a, b, f, g, d, j) {
        a.empty();
        var e, k, g = g || 0, d = d || 1440;
        b && (e = $("<option></option>").attr("value", -1).attr("disabled",
            "disabled").text(b), (-1 === f || f < g || f > d || isNaN(f)) && e.attr("selected", "selected"), a.append(e));
        for (b = g; b <= d; b += 30) g = Math.floor(b / 60), e = b % 60, 10 > e && (e = "0" + e), k = 12 > g % 24 ? "am" : "pm", g %= 12, 0 === g && (g = 12), e = $("<option></option>").attr("value", b).text(g + ":" + e + (j ? " " + k : k)), f > b - 30 && f <= b && e.attr("selected", "selected"), a.append(e)
    };
    a.linkify = function (a) {
        return a.replace(/(?:(?:http(?:s?)\:\/\/|~\/|\/)(?:\w+:\w+@)?(?:(?:[-\w\d{1-3}]+\.)+(?:[a-z]{2,10}))|(?:(?:[-\w\d{1-3}]+\.){2,}(?:[a-z]{2,10})))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?/ig,
            function (a) {
                var c = a;
                0 !== a.indexOf("http") && (c = "http://" + a);
                return '<a href="' + c + '" target="_blank" rel="nofollow noopener">' + a + "</a>"
            })
    };
    a.linkifyHTML = function (c) {
        return c.replace(/(^|[\s\S]*?)(<[\s\S]*?>|$)/ig, function (c, b, g) {
            return a.linkify(b) + g
        })
    };
    a.prepareHeader = function (a) {
        function b() {
            var f = $(this).scrollTop(), g = $("header"), d = $(".headerstartplanning"), e = g.height();
            f > a - e ? (d.removeClass("hidden"), g.find(".logo").addClass("hidden"), g.find(".newplan-button").addClass("hidden")) : (d.addClass("hidden"),
                g.find(".logo").removeClass("hidden"), g.find(".newplan-button").removeClass("hidden"))
        }

        a = a ? a : $(window).height() / 2;
        b();
        $(window).scroll(function () {
            b()
        })
    };
    a.detectIE = function () {
        var a = window.navigator.userAgent, b = a.indexOf("MSIE ");
        if (0 < b) return parseInt(a.substring(b + 5, a.indexOf(".", b)), 10);
        if (0 < a.indexOf("Trident/")) return b = a.indexOf("rv:"), parseInt(a.substring(b + 3, a.indexOf(".", b)), 10);
        b = a.indexOf("Edge/");
        return 0 < b ? parseInt(a.substring(b + 5, a.indexOf(".", b)), 10) : !1
    };
    a.createDialogContainer = function (a,
                                        b, f, g) {
        $(".resultspage").addClass(g ? g : "scroll-hide");
        var g = $("#calendarItemContainer"), d = g.length ? parseInt(g.css("z-index"), 10) + 2 : 101;
        a.css({position: "fixed", left: 0, top: 0, right: 0, bottom: 0, overflow: "auto", "z-index": d}).attr("id", f);
        a.appendTo($("body"));
        var e = b.parents(".ui-dialog");
        e.appendTo(a);
        b.dialog("open");
        g.length && a.next().css({"z-index": d - 1});
        e.next().remove();
        a.off("click").on("click", function (g) {
            a.data("remainOpen") || $(g.target).attr("id") === f && !$(g.target).data("remainOpen") && b.dialog("close")
        })
    };
    a.closeDialog = function (a) {
        "calendarItemContainer" === a.attr("id") && $(".resultspage").removeClass("scroll-hide-calendar-dlg");
        "reservationContainer" === a.attr("id") ? $(".resultspage").removeClass("scroll-hide-reservation-dlg") : $(".resultspage").removeClass("scroll-hide");
        a.remove()
    };
    a.enableMouseWheel = function () {
        $("body").on("mousewheel", function (a) {
            i($(a.target), !1).is(document) && (a.preventDefault(), window.scrollTo(0, window.pageYOffset - a.originalEvent.wheelDelta))
        })
    };
    a.pageTopPx = function () {
        return $(".plan-header-wrap").hasClass("dock-top") &&
        !$(".modal-box").length ? $("#pageHeader").outerHeight() + 1 : 0
    };
    a.toSlot = function (a) {
        var b = a.get("hour"), a = a.get("minute");
        return 2 * b + (30 > a ? 0 : 1)
    };
    a.toggleMoreTours = function (a, b) {
        var f = a.find(".tours"), g = f.find(".hide-row"), f = f.parents(".viator-tours");
        g.removeClass("hidden");
        g.toggleClass("shrink");
        g.hasClass("shrink") ? (g.fadeOut(500), f.find(".more-tours").html('View more tours <i class="fa fa-angle-down"></i>')) : (g.fadeIn(500), f.find(".more-tours").html('View fewer tours <i class="fa fa-angle-up"></i>'));
        b ? b.animate({scrollTop: f.offset().top + b.scrollTop() - 80}) : $("html, body").animate({scrollTop: f.offset().top - 50})
    };
    a.appendModifiedItems = function (a, b) {
        if (a.getResponseHeader("Modified-Visits")) {
            var f = $(b), f = $(b).filter("#modfied-slot-items");
            f.length || (f = $(b));
            $("#pageWrapper").append(f.addClass("hidden"))
        }
    };
    a.removeTagsFromString = function (a, b, f) {
        return !f ? (a = $("<div />").append(a), a.find(b).remove(), a.html()) : a
    };
    a.getNotificationFromOthers = function (a) {
        var b = [];
        if (a && a.length) for (var f = 0; f < a.length; f++) {
            var g =
                a[f];
            g.fromUserId !== $("#plan").data("userId") && b.push(g)
        }
        return b
    };
    a.isPassiveSupported = function () {
        var a = !1;
        try {
            var b = Object.defineProperty({}, "passive", {
                get: function () {
                    a = !0
                }
            });
            window.addEventListener("test", null, b)
        } catch (f) {
        }
        return a
    };
    a.params = h;
    h.fromQueryParam();
    return a
});
define("modules/loginUtils", ["modules/utils", "jquery", "jqueryui"], function (h) {
    return {
        loginToFB: function (i, a, b) {
            i = h.getParameterByName("post-login-url");
            !i && b.postLoginUrl && (i = b.postLoginUrl);
            i = i ? i : window.contextPath;
            a = {};
            i && (a["post-login-url"] = i);
            b.partner && (a.partner = b.partner);
            b.partnerUserId && (a.partnerUserId = b.partnerUserId);
            b.rerequest && (a.rerequest = b.rerequest);
            b.consent && (a.consent = b.consent);
            b = $.param(a);
            window.location.href = window.contextPath + "/sociallogin/facebook" + (b ? "?" : "") + b
        }, loginToGoogle: function (i,
                                    a, b) {
            i = h.getParameterByName("post-login-url");
            !i && b.postLoginUrl && (i = b.postLoginUrl);
            i = i ? i : window.contextPath;
            a = {};
            i && (a["post-login-url"] = i);
            b.partner && (a.partner = b.partner);
            b.partnerUserId && (a.partnerUserId = b.partnerUserId);
            b.rerequest && (a.rerequest = b.rerequest);
            b.consent && (a.consent = b.consent);
            b = $.param(a);
            window.location.href = window.contextPath + "/sociallogin/google" + (b ? "?" : "") + b
        }
    }
});
define("text", ["module"], function (h) {
    function i(a, b) {
        return void 0 === a || "" === a ? b : a
    }

    var a, b, e, d, t, m = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
        r = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, j = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        k = "undefined" !== typeof location && location.href,
        u = k && location.protocol && location.protocol.replace(/\:/, ""), v = k && location.hostname,
        s = k && (location.port || void 0), n = {}, l = h.config && h.config() || {};
    a = {
        version: "2.0.15", strip: function (a) {
            if (a) {
                var a =
                    a.replace(r, ""), b = a.match(j);
                b && (a = b[1])
            } else a = "";
            return a
        }, jsEscape: function (a) {
            return a.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
        }, createXhr: l.createXhr || function () {
            var a, b, f;
            if ("undefined" !== typeof XMLHttpRequest) return new XMLHttpRequest;
            if ("undefined" !== typeof ActiveXObject) for (b = 0; 3 > b; b += 1) {
                f = m[b];
                try {
                    a = new ActiveXObject(f)
                } catch (g) {
                }
                if (a) {
                    m =
                        [f];
                    break
                }
            }
            return a
        }, parseName: function (a) {
            var b, f, g = !1, d = a.lastIndexOf(".");
            b = 0 === a.indexOf("./") || 0 === a.indexOf("../");
            -1 !== d && (!b || 1 < d) ? (b = a.substring(0, d), f = a.substring(d + 1)) : b = a;
            a = f || b;
            d = a.indexOf("!");
            -1 !== d && (g = "strip" === a.substring(d + 1), a = a.substring(0, d), f ? f = a : b = a);
            return {moduleName: b, ext: f, strip: g}
        }, xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/, useXhr: function (c, b, f, g) {
            var d, e;
            e = a.xdRegExp.exec(c);
            if (!e) return !0;
            c = e[2];
            d = e[3];
            d = d.split(":");
            e = d[1];
            d = d[0];
            var j;
            if (j = !c || c === b) {
                if (f = !d || d.toLowerCase() ===
                    f.toLowerCase()) if (!(f = !e && !d)) a:if (e === g) f = !0; else {
                    if (c === b) if ("http" === c) {
                        f = i(e, "80") === i(g, "80");
                        break a
                    } else if ("https" === c) {
                        f = i(e, "443") === i(g, "443");
                        break a
                    }
                    f = !1
                }
                j = f
            }
            return j
        }, finishLoad: function (c, b, f, g) {
            f = b ? a.strip(f) : f;
            l.isBuild && (n[c] = f);
            g(f)
        }, load: function (c, b, f, g) {
            if (g && g.isBuild && !g.inlineText) f(); else {
                l.isBuild = g && g.isBuild;
                var d = a.parseName(c), g = d.moduleName + (d.ext ? "." + d.ext : ""), e = b.toUrl(g),
                    j = l.useXhr || a.useXhr;
                0 === e.indexOf("empty:") ? f() : !k || j(e, u, v, s) ? a.get(e, function (b) {
                    a.finishLoad(c,
                        d.strip, b, f)
                }, function (a) {
                    f.error && f.error(a)
                }) : b([g], function (b) {
                    a.finishLoad(d.moduleName + "." + d.ext, d.strip, b, f)
                })
            }
        }, write: function (b, d, f) {
            if (n.hasOwnProperty(d)) {
                var g = a.jsEscape(n[d]);
                f.asModule(b + "!" + d, "define(function () { return '" + g + "';});\n")
            }
        }, writeFile: function (b, d, f, g, e) {
            var d = a.parseName(d), j = d.ext ? "." + d.ext : "", k = d.moduleName + j,
                h = f.toUrl(d.moduleName + j) + ".js";
            a.load(k, f, function () {
                var f = function (a) {
                    return g(h, a)
                };
                f.asModule = function (a, b) {
                    return g.asModule(a, h, b)
                };
                a.write(b, k, f, e)
            }, e)
        }
    };
    if ("node" === l.env || !l.env && "undefined" !== typeof process && process.versions && process.versions.node && !process.versions["node-webkit"] && !process.versions["atom-shell"]) b = require.nodeRequire("fs"), a.get = function (a, d, f) {
        try {
            var g = b.readFileSync(a, "utf8");
            "\ufeff" === g[0] && (g = g.substring(1));
            d(g)
        } catch (e) {
            f && f(e)
        }
    }; else if ("xhr" === l.env || !l.env && a.createXhr()) a.get = function (b, d, f, g) {
        var e = a.createXhr(), j;
        e.open("GET", b, !0);
        if (g) for (j in g) g.hasOwnProperty(j) && e.setRequestHeader(j.toLowerCase(), g[j]);
        if (l.onXhr) l.onXhr(e,
            b);
        e.onreadystatechange = function () {
            var a;
            if (4 === e.readyState && (a = e.status || 0, 399 < a && 600 > a ? (a = Error(b + " HTTP status: " + a), a.xhr = e, f && f(a)) : d(e.responseText), l.onXhrComplete)) l.onXhrComplete(e, b)
        };
        e.send(null)
    }; else if ("rhino" === l.env || !l.env && "undefined" !== typeof Packages && "undefined" !== typeof java) a.get = function (a, b) {
        var f, g, d = new java.io.File(a), e = java.lang.System.getProperty("line.separator"),
            d = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(d), "utf-8")),
            j = "";
        try {
            f = new java.lang.StringBuffer;
            (g = d.readLine()) && (g.length() && 65279 === g.charAt(0)) && (g = g.substring(1));
            for (null !== g && f.append(g); null !== (g = d.readLine());) f.append(e), f.append(g);
            j = String(f.toString())
        } finally {
            d.close()
        }
        b(j)
    }; else if ("xpconnect" === l.env || !l.env && "undefined" !== typeof Components && Components.classes && Components.interfaces) e = Components.classes, d = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), t = "@mozilla.org/windows-registry-key;1" in e, a.get =
        function (a, b) {
            var f, g, j, k = {};
            t && (a = a.replace(/\//g, "\\"));
            j = new FileUtils.File(a);
            try {
                f = e["@mozilla.org/network/file-input-stream;1"].createInstance(d.nsIFileInputStream), f.init(j, 1, 0, !1), g = e["@mozilla.org/intl/converter-input-stream;1"].createInstance(d.nsIConverterInputStream), g.init(f, "utf-8", f.available(), d.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), g.readString(f.available(), k), g.close(), f.close(), b(k.value)
            } catch (h) {
                throw Error((j && j.path || "") + ": " + h);
            }
        };
    return a
});
define("text!templates/customizeSignup.html", [], function () {
    return '<div>\n    <div class=\'title2\'>Sign up</div>\n    <div class=\'content\'>Sign up to ensure your plan is saved and accessible on all your devices.</div>\n    <div class=\'terms\'>\n        <\!--\n        <input type="checkbox" class="flat terms-cb" id="terms-cb">\n        <label for="terms-cb">I agree to Inspirock\'s <a target="_blank" href="/terms-of-use" rel="nofollow">Terms of Use</a> and <a target="_blank" href="/privacy-policy" rel="nofollow">Privacy policy</a></label>\n        --\>\n        By continuing, you agree to Inspirock\'s <a target="_blank" href="/terms-of-use" rel="nofollow" tabindex="-1">Terms of Use</a> and <a target="_blank" href="/privacy-policy" rel="nofollow" tabindex="-1">Privacy policy</a>\n    </div>\n    <div class="terms-error">You must agree to the terms of use and privacy policy</div>\n    <div>\n        <button class="cta-button large fb-login">\n            <svg class="fb-icon"><use xlink:href="#icon-facebook" /></svg> \n            <span>Sign in with Facebook</span>\n        </button>\n        <div class="or-wrap"><span class="or-txt">or</span></div>\n        <button class="cta-button large google-login">\n            <svg class="google-icon"><use xlink:href="#icon-google-logo" /></svg> \n            <span>Sign in with Google</span>\n        </button>\n        <div class="or-wrap"><span class="or-txt">or</span></div>\n        <div class="update-user-info row">\n            <div class="col-6">\n                <input type="text" class="flat firstname" placeholder="First Name *" id="signupFirstName">\n            </div>\n            <div class="col-6">\n                <input type="text" class="flat lastname" placeholder="Last Name *" id="signupLastName">\n            </div>\n            <div class="col-12">\n                <input type="text" class="flat email" placeholder="Email *" id="signupUsername">\n            </div>\n        </div>\n        <button class=\'cta-button large signup\'>Sign up</button>\n        <div class=\'login-link\'><span>Already have an account? </span><span class=\'text-link login\'>Log in</span></div>\n    </div>\n</div>'
});
define("modules/ajax", "modules/utils modules/loginUtils modules/events modules/analytics modules/analyticsEventParams text!templates/customizeSignup.html jquery jqueryui".split(" "), function (h, i, a, b, e, d) {
    var t = {}, m = !1, r = 0;
    t.requireRegistration = function (j, k) {
        function m(a) {
            h.overlay($("#pageWrapper"), '<div class="update-plan-wrapper"><div class="updating-plan"><img class="progress-img reverse" src="https://s.inspirock.com/images/misc/spin.gif"><br />' + a + "</div></div>", {
                height: "100%",
                top: 0
            })
        }

        if (h.isMobile()) a.triggerEvent("ajax",
            "require-registration", {}); else {
            var r = $("body").scrollTop() || $("html").scrollTop();
            a.triggerEvent("route", "close-route-overlay", {});
            var s = j && j.isNoRefresh ? j.isNoRefresh : !1, n = $(d), l = $("<div/>"), c = $(".ui-dialog"),
                q = $(".modal-box"),
                c = c.length ? parseInt(c.css("z-index"), 10) + 2 : q.length ? parseInt(q.css("z-index"), 10) + 2 : 100;
            n.inspirockDialog({
                resizable: !1,
                modal: !0,
                draggable: !1,
                animated: !0,
                autoOpen: !1,
                width: "300px",
                dialogClass: "dlg-signup-customize mediumx",
                open: function () {
                    function a() {
                        var b = h.params.stringify(),
                            c = location.href;
                        jQuery.isEmptyObject(JSON.parse(b)) || (c = location.search ? c + ("&json-data=" + b) : c + ("?json-data=" + b));
                        return c
                    }

                    h.setupDialogOverlay($(this), !1, !0);
                    h.isMobile() && ($("body").attr("style", "top: " + -r + "px !important"), $("body").css({position: "fixed"}));
                    n.off("change.termscb").on("change.termscb", "#terms-cb", function () {
                        n.find(".terms-error").css("visibility", "hidden")
                    });
                    n.find("button.fb-login").on("click", function () {
                        var b = n.find(".terms-cb"), c = b.is(":checked");
                        n.find(".error-qtip").qtip("destroy",
                            !0);
                        b.length && !c ? n.find(".terms-error").css("visibility", "visible") : (n.dialog("destroy").remove(), m("Logging in..."), b = {postLoginUrl: a()}, i.loginToFB("require-signup", null, b))
                    });
                    n.find("button.google-login").on("click", function () {
                        var b = n.find(".terms-cb"), c = b.is(":checked");
                        n.find(".error-qtip").qtip("destroy", !0);
                        b.length && !c ? n.find(".terms-error").css("visibility", "visible") : (n.dialog("destroy").remove(), m("Logging in..."), b = {postLoginUrl: a()}, i.loginToGoogle("require-signup", null, b))
                    });
                    n.find("button.signup").on("click",
                        function () {
                            var a = n.find(".firstname"), c = a.val(), f = n.find(".lastname"), d = f.val(),
                                i = n.find(".email"), r = i.val(), l = n.find(".terms-cb"), q = l.is(":checked");
                            n.find(".error-qtip").qtip("destroy", !0);
                            if (l.length && !q) n.find(".terms-error").css("visibility", "visible"); else {
                                var v = {firstname: c, lastname: d, email: r}, c = {user: h.stringify(v), consent: q};
                                k && (c.collaborators = h.stringify(k));
                                t.makeAJAXcall({
                                    url: window.contextPath + "/quickInspirockRegistration",
                                    type: "POST",
                                    data: c,
                                    success: function (c) {
                                        if ("SUCCESS" === c.status) j &&
                                        j.success && b.trackEvent(e.CAT_LOGIN, "registration", "native", function () {
                                            j.success(n, v)
                                        }), s || (n.dialog("destroy").remove(), m("Reloading plan..."), b.trackEvent(e.CAT_LOGIN, "registration", "native", function () {
                                            window.location.href = document.location.pathname + h.addUrlParam(document.location.search, "flash", c.message)
                                        })); else if (c.errors) for (var d in c.errors) {
                                            d = c.errors[d];
                                            "signupFirstName" === d.field ? h.showErrorTooltip(a, d.error, null, {style: {classes: "error high-z-index"}}) : "signupLastName" === d.field ? h.showErrorTooltip(f,
                                                d.error, null, {style: {classes: "error high-z-index"}}) : "signupUsername" === d.field && h.showErrorTooltip(i, d.error, null, {style: {classes: "error high-z-index"}});
                                            break
                                        }
                                    }
                                })
                            }
                        });
                    n.find(".login").on("click", function () {
                        h.login()
                    })
                },
                close: function () {
                    h.isMobile() && ($("body").css({position: "", top: ""}), $("html,body").animate({scrollTop: r}, 0));
                    n.find(".error-qtip").qtip("destroy", !0);
                    n.dialog("destroy").remove();
                    l.remove();
                    m("Loading plan...");
                    window.location.reload()
                }
            });
            l.css({
                position: "fixed", left: 0, top: 0, right: 0,
                bottom: 0, overflow: "auto", "z-index": c
            }).attr("id", "signupCustomize");
            l.appendTo($("body"));
            q = n.parents(".ui-dialog");
            q.appendTo(l);
            n.dialog("open");
            q.next().hasClass("ui-widget-overlay") && q.next().remove();
            l.next().css({"z-index": c - 1});
            l.off("click").on("click", function (a) {
                "signupCustomize" === $(a.target).attr("id") && n.dialog("close")
            })
        }
    };
    t.makeAJAXcall = function (b) {
        var d = $("#plan");
        if ("POST" === b.type && d.length && d.data("registrationRequired") && d.data("editEnabled") && !h.endsWith(b.url, "/analyticsRecorded") &&
            !h.endsWith(b.url, "/feedback") && !h.endsWith(b.url, "/planClaim") && !h.endsWith(b.url, "/notifications/see") && !h.endsWith(b.url, "/share") && !h.endsWith(b.url, "/trackShare") && !h.endsWith(b.url, "/showTransportation") && !h.endsWith(b.url, "/poll-flights") && !h.endsWith(b.url, "/requestAgent") && !h.endsWith(b.url, "/collaborators") && !h.endsWith(b.url, "/quickInspirockRegistration") && !h.endsWith(b.url, "https://graph.facebook.com") && !window.registeredUserLoggedIn) t.requireRegistration(); else if (b.synchronize && m) b.complete &&
        b.complete.apply(); else if (b.abortIfSynchronizedCallInProgress && m) b.abort && b.abort.apply(); else {
            b.synchronize && (a.triggerEvent("ajax", "synchronized-ajax-begin", b), m = !0);
            for (var e = $(".ui-dialog"), i = 0; i < e.length; i++) for (var s = $(e[i]).find("button"), n = 0; n < s.length; n++) {
                var l = $(s[n]);
                l.data("clicked") && (l.find(".ui-button-text").text(l.data("processing-text")), l.attr("disabled", "disabled"))
            }
            e = {};
            i = $("meta[name='_csrf']").attr("content");
            s = $("meta[name='_csrf_header']").attr("content");
            e[s] = i;
            d.length &&
            (e["If-Match"] = d.data("version"));
            var c = $.extend({errorDialog: !0, cache: !1, headers: e}, b);
            c.complete = function () {
                for (var c = $(".ui-dialog"), f = 0; f < c.length; f++) for (var g = $(c[f]).find("button"), d = 0; d < g.length; d++) {
                    var e = $(g[d]);
                    e.data("clicked") && (e.find(".ui-button-text").text(e.data("orginal-text")), e.removeAttr("disabled", "disabled"), e.data("clicked", !1))
                }
                b.synchronize && (a.triggerEvent("ajax", "synchronized-ajax-complete", b), m = !1);
                b.complete && b.complete.apply()
            };
            c.success = function (a, c, g) {
                var e = g.getResponseHeader("ETag");
                if (d.length && e) {
                    if ("GET" === b.type && d.data("version") != e) {
                        window.location.reload();
                        return
                    }
                    d.data("version", e);
                    var e = (e = g.getResponseHeader("Inspirock-Plan-Name")) ? decodeURIComponent(escape(atob(e))) : e,
                        h = g.getResponseHeader("Inspirock-Plan-Img-Url"),
                        m = g.getResponseHeader("Inspirock-Plan-Img-Author"),
                        i = g.getResponseHeader("Inspirock-Plan-Img-Title"),
                        r = g.getResponseHeader("Inspirock-Plan-Img-Source-Url"),
                        l = g.getResponseHeader("Inspirock-Plan-StartDate"),
                        n = g.getResponseHeader("Inspirock-Plan-EndDate"),
                        s = g.getResponseHeader("Inspirock-Plan-DisplayDate"),
                        v = g.getResponseHeader("Inspirock-Plan-TravelWarning"),
                        t = g.getResponseHeader("Inspirock-Plan-AgentButtonText"),
                        p = g.getResponseHeader("Inspirock-Plan-destinations-abridged"),
                        u = g.getResponseHeader("Plan-New-Url");
                    e && (l && n) && d.data({
                        planName: e,
                        planImgUrl: h,
                        planImgAuthor: m,
                        planImgTitle: i,
                        planImgSourceUrl: r,
                        planStartDate: l,
                        planEndDate: n,
                        displayDate: s,
                        travelWarning: v,
                        travelAgentButtonText: t,
                        destinationNamesAbridged: p,
                        planNewUrl: u
                    })
                }
                b.success && b.success.call(this,
                    a, c, g)
            };
            c.error = function (d) {
                var f = $(document.createElement("div")), g;
                if (c.errorDialog) switch (d.status) {
                    case 401:
                        window.location.href = window.contextPath + d.responseText;
                        return;
                    case 403:
                        if ((g = JSON.parse(d.responseText)) && g.redirectUrl) {
                            window.location.href = window.contextPath + "/" + g.redirectUrl;
                            return
                        }
                        if (g && g.fullRedirectUrl) {
                            window.location.href = g.fullRedirectUrl;
                            return
                        }
                        if (g && g.sessionExpired) {
                            g = g.message;
                            if ($("#plan").data("mobile-view")) h.mobileDialog({
                                heading: "", message: g, buttons: {
                                    "Reload Now": function () {
                                        window.location.href =
                                            document.location.pathname + h.addUrlParam(document.location.search, "force_reload", "")
                                    }
                                }
                            }); else {
                                var e = $("<div></div>");
                                e.append(g);
                                e.dialog({
                                    resizable: !1,
                                    draggable: !1,
                                    title: "",
                                    width: "465px",
                                    dialogClass: "freeze-dialog mediumx",
                                    modal: !0,
                                    buttons: {
                                        "Reload Now": function () {
                                            window.location.href = document.location.pathname + h.addUrlParam(document.location.search, "force_reload", "")
                                        }
                                    },
                                    open: function () {
                                        h.setupDialogOverlay(e, !1, !0);
                                        $("body").css("overflow", "hidden");
                                        $("#mobile-dialog-overlay").removeClass("hidden");
                                        $(document).unbind("click")
                                    },
                                    create: function () {
                                        $(".freeze-dialog .ui-icon-closethick").hide()
                                    }
                                })
                            }
                            $("#planContent").addClass("disable-all");
                            a.triggerEvent("poll", "stop-poll", {})
                        }
                        break;
                    case 400:
                        if (d.responseText && !b.suppressErrorDialog) if ($("#plan").data("mobile-view")) var k = h.mobileDialog({
                            heading: "Error!",
                            message: d.responseText,
                            buttons: {
                                OK: function () {
                                    k.close()
                                }
                            }
                        }); else g = "<p><center>" + d.responseText + "</center></p>", f.html(g), f.dialog({
                            title: "Error", resizable: !1, modal: !0, draggable: !1, width: "350px",
                            dialogClass: "errorDialog mediumx", buttons: {
                                OK: function () {
                                    f.dialog("close")
                                }
                            }, close: function () {
                                f.dialog("destroy").remove()
                            }, open: function () {
                                h.setupDialogOverlay(f, !1)
                            }
                        });
                        break;
                    case 409:
                        if ((g = JSON.parse(d.responseText)) && "invalid-plan-version" === g.error) $("#plan").data("mobile-view") ? k = h.mobileDialog({
                            heading: "Error!",
                            message: "<p><center>Unable to save plan. Please reload and try again.</center></p>",
                            buttons: {
                                OK: function () {
                                    k.close()
                                }
                            }
                        }) : (f.html("<p><center>Unable to save plan. Please reload and try again.</center></p>"),
                            f.dialog({
                                title: "Error",
                                resizable: !1,
                                modal: !0,
                                draggable: !1,
                                width: "350px",
                                dialogClass: "errorDialog mediumx",
                                buttons: {
                                    Reload: function () {
                                        window.location.reload()
                                    }
                                },
                                close: function () {
                                    f.dialog("destroy").remove()
                                },
                                open: function () {
                                    var a = $("#reservationContainer"), b = f.parents(".ui-dialog");
                                    a.length && (a = parseInt(a.css("z-index"), 10), b.css({"z-index": a + 2}), b.siblings(".ui-widget-overlay").css({"z-index": a + 1}))
                                }
                            }));
                        break;
                    case 429:
                        window.location.href = d.responseText;
                        return
                }
                b.error && b.error.call(this, d.responseText)
            };
            r = (new Date).getTime();
            $.ajax(c)
        }
    };
    t.fileUpload = function (a) {
        for (var b = new FormData, d = 0; d < a.files.length; d++) b.append("file", a.files[d]);
        var d = {}, e = $("#plan"), h = $("meta[name='_csrf']").attr("content"),
            m = $("meta[name='_csrf_header']").attr("content");
        d[m] = h;
        e.length && (d["If-Match"] = e.data("version"));
        return $.ajax({
            xhr: function () {
                var b = $.ajaxSettings.xhr();
                b.upload && b.upload.addEventListener("progress", function (b) {
                    a.progress && a.progress(b)
                }, !1);
                return b
            }, url: a.url, type: "POST", contentType: !1, processData: !1,
            cache: !1, data: b, headers: d, success: function (b) {
                a.success && a.success(b)
            }, error: function (b) {
                a.error && a.error(b)
            }
        })
    };
    t.keepSessionAlive = function () {
        3E5 < (new Date).getTime() - r && t.makeAJAXcall({type: "GET", url: window.contextPath + "/keepSessionAlive"})
    };
    return t
});
define("text!templates/showCreatePlanPrompt.html", [], function () {
    return '<div>\n    <svg class="img create"><use xlink:href="#icon-create" /></svg>\n    <div class="title">Would you like to<br/>build a plan to <span class="name"></span>?</div>\n</div>'
});
define("jQueryExtensions/inspirockDatepicker", ["jquery", "jqueryui"], function () {
    $.datepicker._updateDatepicker_original = $.datepicker._updateDatepicker;
    $.datepicker._updateDatepicker = function (h) {
        $.datepicker._updateDatepicker_original(h);
        var i = this._get(h, "onUpdate");
        i && i.apply(h.input ? h.input[0] : null)
    };
    $.fn.inspirockDatepicker = function (h) {
        var i = $.extend(!0, {}, h);
        i.beforeShow = function () {
            h.beforeShow && h.beforeShow();
            $("#ui-datepicker-div").off("DOMSubtreeModified.datepickerDiv").on("DOMSubtreeModified.datepickerDiv",
                function () {
                    $("#ui-datepicker-div .ui-datepicker-calendar").addClass("notranslate");
                    $("#ui-datepicker-div .ui-datepicker-year").addClass("notranslate")
                });
            setTimeout(function () {
                var a = $("#ui-datepicker-div").outerWidth() + 2 + "px !important";
                $("#ui-datepicker-div").attr("style", function (e, d) {
                    return d + "width: " + a
                })
            }, 1);
            $("#start-time,#end-time").selectmenu("close")
        };
        var a;
        $(this).each(function () {
            a = $(this).datepicker(i)
        });
        return a
    }
});
define("modules/dateRange", ["moment", "jquery", "jqueryui", "jQueryExtensions/inspirockDatepicker"], function (h) {
    var i = window.dateFormatDisplayPattern;
    return {
        prepareDateRange: function (a, b, e, d) {
            if (a.length && b.length) return this.$startDate = a, this.$endDate = b, this.maxPlanLength = e, this.props = d, this.$calendarInput = a.parent(), this.dateFormat = d.dateFormat || "mm/dd/y", this.startDate = a.val() ? $.datepicker.parseDate(this.dateFormat, a.val()) : null, this.endDate = b.val() ? $.datepicker.parseDate(this.dateFormat, b.val()) :
                null, this.startDate && a.parent().find(".startDate-alt").val($.datepicker.formatDate(i, this.startDate)), this.endDate && b.parent().find(".endDate-alt").val($.datepicker.formatDate(i, this.endDate)), b = h().startOf("day"), !this.props.keepPastDate && (this.startDate && this.endDate && this.startDate < b.toDate()) && (e = h.duration(h(this.endDate) - h(this.startDate)).asDays(), e = b.clone().add(e, "days"), this.startDate = b.toDate(), this.endDate = e.toDate()), this.openStartDate = this.startDate, this.openEndDate = this.endDate, this.isSelectingStart =
                !0, this.$delete = a.siblings(".delete"), this.$calenderIcon = a.parent().find(".calendar-icon"), this.$datepicker = $("<div>"), this.initializeDatePicker(), this.updateAltFields(), this.registerHandlers(), this.onInit(), this.changeEndDate(), this
        }, onInit: function () {
        }, initializeDatePicker: function () {
            var a = this;
            this.$datepicker.inspirockDatepicker({
                minDate: this.props.minDate || "+0d",
                maxDate: this.props.maxDate || "+3y",
                dayNamesMin: "SMTWTFS".split(""),
                dateFormat: this.dateFormat,
                numberOfMonths: this.props.numberOfMonths,
                defaultDate: !$(this.props.appendTo).length ? $.datepicker.formatDate(this.dateFormat, this.startDate) : null,
                onSelect: function (b, e) {
                    var d = $(this).datepicker("getDate");
                    a.props.appendTo && a.props.disableDateRange ? a.selectSingleDate(b, e, d) : a.selectMultiDate(b, e, d)
                },
                beforeShowDay: function (b) {
                    if (a.props.disableDateRange) {
                        var e = !0, d = ["dt-" + b.getTime()], h = "";
                        a.props.hasStartDate ? a.startDate && b.getTime() === a.startDate.getTime() && d.push("start-date") : a.endDate && b.getTime() === a.endDate.getTime() && d.push("end-date")
                    } else e =
                        !0, d = ["dt-" + b.getTime()], h = "", a.startDate && b.getTime() === a.startDate.getTime() ? d.push("start-date") : a.endDate && b.getTime() === a.endDate.getTime() ? d.push("end-date") : a.startDate && a.endDate && b.getTime() > a.startDate.getTime() && b.getTime() < a.endDate.getTime() ? d.push("highlight") : a.props.showOpenDateRange && (a.openStartDate && a.openEndDate && b.getTime() >= a.openStartDate.getTime() && b.getTime() <= a.openEndDate.getTime()) && d.push("openstate");
                    return [e, d.join(" "), h]
                }
            })
        }, selectSingleDate: function (a, b, e) {
            this.props.hasStartDate ?
                (this.startDate = e, this.props.keepDatePickerOpen || (this.$startDate.data("date", this.startDate), this.$startDate.val($.datepicker.formatDate(this.dateFormat, this.startDate)))) : (this.endDate = e, this.props.keepDatePickerOpen || (this.$endDate.data("date", this.endDate), this.$endDate.val($.datepicker.formatDate(this.dateFormat, this.endDate))));
            this.props.keepDatePickerOpen || this.updateAltFields();
            if (this.props.onSelect) this.props.onSelect();
            if (this.props.onClose) this.props.onClose()
        }, selectMultiDate: function (a,
                                      b, e) {
            if (this.props.duration) {
                if (this.startDate = e, this.$startDate.data("date", this.startDate), this.$startDate.val($.datepicker.formatDate(this.dateFormat, this.startDate)), this.endDate = h(this.startDate).add(this.props.duration, "d").toDate(), this.props.keepDatePickerOpen || (this.$endDate.data("date", this.endDate), this.$endDate.val($.datepicker.formatDate(this.dateFormat, this.endDate)), this.updateAltFields()), this.props.onSelect) this.props.onSelect(this.$datepicker)
            } else if (this.isSelectingStart || this.startDate &&
                this.startDate.getTime() > e.getTime()) {
                this.startDate = e;
                this.props.keepDatePickerOpen || (this.$startDate.data("date", this.startDate), this.$startDate.val($.datepicker.formatDate(this.dateFormat, this.startDate)));
                this.props.hideDelete || this.$delete.show();
                this.endDate && this.startDate.getTime() > this.endDate.getTime() && (this.endDate = null, this.props.keepDatePickerOpen || (this.$endDate.data("date", null), this.$endDate.val("")));
                this.isSelectingStart = !1;
                this.$startDate.removeClass("active");
                this.$endDate.addClass("active");
                a = new Date(this.startDate.getTime());
                a.setDate(this.startDate.getDate() + this.maxPlanLength - 1);
                this.props.startMaxDate && this.props.endMaxDate < a && (a = this.props.endMaxDate);
                var e = b.drawMonth, d = b.drawYear;
                this.$datepicker.datepicker("option", "maxDate", a);
                if (e !== b.drawMonth || d !== b.drawYear) b.drawMonth = e, b.drawYear = d;
                this.endDate && this.endDate > a && (this.endDate = a, this.props.keepDatePickerOpen || (this.$endDate.data("date", this.endDate), this.$endDate.val($.datepicker.formatDate(this.dateFormat, this.endDate))));
                this.props.keepDatePickerOpen || this.updateAltFields();
                if (this.props.onSelect) this.props.onSelect()
            } else {
                this.endDate = e;
                this.props.keepDatePickerOpen || (this.$endDate.data("date", this.endDate), this.$endDate.val($.datepicker.formatDate(this.dateFormat, this.endDate)));
                this.props.hideDelete || this.$delete.show();
                this.props.keepDatePickerOpen || this.updateAltFields();
                if (this.props.onSelect) this.props.onSelect(this.$datepicker);
                if (this.props.appendTo) if (!this.props.keepDatePickerOpen || !0 !== this.props.keepDatePickerOpen) {
                    if (this.props.onClose) this.props.onClose()
                } else {
                    if (this.isSelectingStart =
                        !0, e = b.drawMonth, d = b.drawYear, this.props.endMaxDate || this.$datepicker.datepicker("option", "maxDate", "+3y"), e !== b.drawMonth || d !== b.drawYear) b.drawMonth = e, b.drawYear = d
                } else this.$calendarInput.qtip("api").hide();
                this.props.checkAndExpand && this.props.checkAndExpand();
                this.props.checkAndShade && this.props.checkAndShade(!0, !1)
            }
        }, changeEndDate: function (a) {
            void 0 !== a && (this.endDate = a, this.$endDate.data("date", this.endDate), this.$endDate.val($.datepicker.formatDate(this.dateFormat, this.endDate)), this.props.$endAltField.val($.datepicker.formatDate(this.props.altFieldDateFormat,
                $.datepicker.parseDate(this.dateFormat, this.$endDate.val()))), this.$datepicker.datepicker("refresh"))
        }, onQtipVisible: function () {
        }, updateAltFields: function () {
            if (this.props.$startAltField && this.props.$endAltField && this.props.altFieldDateFormat) {
                var a = this.$startDate.val(), b = this.$endDate.val();
                this.props.$startAltField.val($.datepicker.formatDate(this.props.altFieldDateFormat, $.datepicker.parseDate(this.dateFormat, a)));
                this.props.$endAltField.val($.datepicker.formatDate(this.props.altFieldDateFormat,
                    $.datepicker.parseDate(this.dateFormat, b)))
            }
        }, registerHandlers: function () {
            var a = this;
            this.$datepicker.off("mouseenter.date").off("mouseleave.date").on({
                "mouseenter.date": function () {
                    if (!a.props.disableDateRange) if (a.startDate && !a.isSelectingStart) {
                        var b = a.$datepicker.find("td:not(.ui-datepicker-other-month)"),
                            e = b.filter(".dt-" + a.startDate.getTime()), e = b.index(e), e = 0 <= e ? e : 0,
                            d = a.endDate ? b.index(b.filter(".dt-" + a.endDate.getTime())) : b.index($(this));
                        b.slice(e, d).addClass("highlight")
                    } else a.endDate &&
                    a.isSelectingStart && (b = a.$datepicker.find("td:not(.ui-datepicker-other-month)"), e = b.filter(".dt-" + a.endDate.getTime()), d = b.index(e), d = 0 <= d ? d : 0, e = a.startDate ? b.index(b.filter(".dt-" + a.startDate.getTime())) : b.index($(this)), b.slice(e, d).addClass("highlight"))
                }, "mouseleave.date": function () {
                    a.props.disableDateRange || (!a.startDate || !a.endDate) && a.$datepicker.find("td").removeClass("highlight")
                }
            }, "td:not(.ui-datepicker-other-month)");
            a.props.appendTo ? (a.$datepicker.appendTo($(a.props.appendTo)), a.onQtipVisible()) :
                (a.$calendarInput.qtip({
                    content: a.$datepicker,
                    show: "click",
                    hide: a.props.keepDatePickerOpen ? !1 : "click unfocus",
                    position: {
                        my: a.props.positionMy || "top left",
                        at: a.props.positionAt || "bottom left",
                        target: a.$startDate.parents(".dates"),
                        viewport: $(window),
                        effect: !1,
                        adjust: {y: 1, method: a.props.adjustMethod || "shift none"},
                        container: a.props.container || $(".page-content")
                    },
                    style: {tip: !1, classes: "date-range-picker notranslate"},
                    events: {
                        hide: function (b) {
                            if (b.originalEvent && a.props.clickContainer && ($.contains(a.props.clickContainer[0],
                                b.originalEvent.target) || a.props.clickContainer[0] === b.originalEvent.target)) b.preventDefault(); else {
                                a.$startDate.removeClass("active");
                                a.$endDate.removeClass("active");
                                if (a.props.onClose) a.props.onClose();
                                a.$calendarInput.removeClass("focused")
                            }
                        }, visible: function () {
                            a.onQtipVisible()
                        }, show: function (b, e) {
                            a.$calendarInput.addClass("focused");
                            $(e.elements.tooltip).off("click.block").on("click.block", function (a) {
                                a.stopPropagation()
                            });
                            var d = b.originalEvent;
                            d.target.className.indexOf && 0 <= d.target.className.indexOf("endDate") ?
                                (a.isSelectingStart = !1, a.$startDate.removeClass("active"), a.$endDate.addClass("active"), a.startDate && (d = new Date(a.startDate.getTime()), d.setDate(a.startDate.getDate() + a.maxPlanLength - 1), a.$datepicker.datepicker("option", "maxDate", d))) : (a.isSelectingStart = !0, a.$startDate.addClass("active"), a.$endDate.removeClass("active"), a.$datepicker.datepicker("option", "maxDate", "+3y"));
                            window.setTimeout(function () {
                                var a = e.elements.content.offset().top, b = e.elements.content.outerHeight(!0),
                                    d = $(window).height(),
                                    j = $(window).scrollTop() + d, h = e.elements.content.parents(".ui-dialog-content");
                                h.length ? h.animate({scrollTop: a + h.scrollTop() + b - d}) : a + b > j && $("html,body").animate({scrollTop: a + b - d})
                            }, 0)
                        }
                    }
                }), a.$delete.off("click").on("click", function (b) {
                    a.startDate = null;
                    a.$startDate.val("");
                    a.endDate = null;
                    a.$endDate.val("");
                    a.updateAltFields();
                    a.isSelectingStart = !0;
                    a.$calendarInput.qtip("api").show();
                    a.$datepicker.datepicker("refresh");
                    a.$datepicker.datepicker("setDate", null);
                    a.$datepicker.datepicker("option", "maxDate",
                        "+3y");
                    a.props.checkAndShade && a.props.checkAndShade(!0, !1);
                    a.$delete.hide();
                    b.stopPropagation()
                }), a.$calenderIcon.off("click").on("click", function () {
                    a.$startDate.trigger("click")
                }), a.props.keepDatePickerOpen || (a.startDate && a.$startDate.data("date", a.startDate), a.endDate && a.$endDate.data("date", a.endDate)))
        }
    }
});
define("modules/intentmedia", ["modules/analytics", "modules/ajax"], function (h, i) {
    var a = {
        setIntentMediaProperties: function (a, e, d, h, m, i) {
            window.IntentMediaProperties && (IntentMediaProperties.hotel_city = a, IntentMediaProperties.hotel_state = e, IntentMediaProperties.hotel_country = d, IntentMediaProperties.travel_date_start = h, IntentMediaProperties.travel_date_end = m, IntentMediaProperties.travelers = i)
        }, isEnabled: function () {
            return window.IntentMedia
        }, triggerRefresh: function () {
            window.IntentMedia && IntentMedia.trigger &&
            IntentMedia.trigger("refresh")
        }, triggerOpenExitUnit: function (b, e, d, h, i, r) {
            window.IntentMedia && IntentMedia.trigger && (a.trackAdPossibility(), a.setIntentMediaProperties(b, e, d, h, i, r), IntentMedia.trigger("open_exit_unit"))
        }, triggerRedirectExitUnit: function (b, e, d, h, i, r) {
            window.IntentMedia && IntentMedia.trigger && (a.trackAdPossibility(), a.setIntentMediaProperties(b, e, d, h, i, r), IntentMedia.trigger("redirect_to_exit_unit"), fbq && fbq("track", "InitiateCheckout", {content_name: "intentmedia_display_redirect_exit_unit"}))
        },
        triggerFlightSearch: function (b, e, d, h, i, r, j) {
            window.IntentMedia && IntentMedia.trigger && (a.trackAdPossibility(), IntentMediaProperties.trip_type = e, IntentMediaProperties.flight_origin = d, IntentMediaProperties.flight_destination = h, IntentMediaProperties.travel_date_start = i.format("YYYYMMDD"), IntentMediaProperties.travel_date_end = "roundtrip" === e ? r.format("YYYYMMDD") : i.format("YYYYMMDD"), IntentMediaProperties.travelers = j, IntentMedia.trigger("open_SFC"))
        }, triggerCarSearch: function (b, e, d, h, i, r, j, k) {
            window.IntentMedia &&
            IntentMedia.trigger && (a.trackAdPossibility(), IntentMediaProperties.trip_type = e, IntentMediaProperties.car_pickup_location_type = "AIRPORT", IntentMediaProperties.car_pickup_airport = d, IntentMediaProperties.car_dropoff_location_type = "AIRPORT", IntentMediaProperties.car_dropoff_airport = h, IntentMediaProperties.travel_date_start = i.format("YYYYMMDD"), IntentMediaProperties.travel_date_end = j.format("YYYYMMDD"), IntentMediaProperties.car_pickup_time = r, IntentMediaProperties.car_dropoff_time = k, IntentMedia.trigger("open_SFC"))
        },
        trackAdPossibility: function () {
            i.makeAJAXcall({url: window.contextPath + "/trackIntentMediaAdPossibility", type: "GET"})
        }, delayedTrackAdPossibility: function () {
            window.setTimeout(a.trackAdPossibility, 4E4)
        }
    };
    return a
});
define("modules/preparetravelers", ["jquery"], function () {
    return {
        prepareTravelers: function (h, i, a, b) {
            function e(a, b) {
                if (a.parents(".travelers").hasClass("hotel")) {
                    var d = b.find("input[name=numAdults]"), e = b.find("input[name=numChildren]"),
                        h = b.find("input[name=numInfants]"), d = parseInt(d.val(), 10), e = parseInt(e.val(), 10),
                        i = parseInt(h.val(), 10), h = d + e + i;
                    h > d && h > e && h > i ? a.find("span").text(h + " Guests") : h === d ? a.find("span").text(h + (1 === h ? " adult" : " adults")) : h === e ? a.find("span").text(h + (1 === h ? " child" : " children")) :
                        h === i && a.find("span").text(h + (1 === h ? " infant" : " infants"))
                } else d = b.find("input[name=numAdults]"), e = b.find("input[name=numTeens]"), h = b.find("input[name=numKids]"), d = parseInt(d.val(), 10), e = parseInt(e.val(), 10), i = parseInt(h.val(), 10), h = d + e + i, h > d && h > e && h > i ? a.find("span").text(h + " travelers") : h === d ? a.find("span").text(h + (1 === h ? " adult" : " adults")) : h === e ? a.find("span").text(h + " teens") : h === i && a.find("span").text(h + " kids")
            }

            i && e(h, h.siblings(".travel-with"));
            var i = h.parents(".booking-area").find(".find-hotel-button").data("provider"),
                a = a && a.length ? a : h.parents(".modal-box").length ? h.parents(".modal-box").find(".ui-dialog-content") : $("body"),
                d = b && b.position && b.position.my ? b.position.my : "top right",
                b = b && b.position && b.position.at ? b.position.at : "bottom right";
            h.qtip({
                content: h.siblings(".travel-with"),
                overwrite: !0,
                position: {container: a, my: d, at: b, viewport: $(window), effect: !1, adjust: {method: "shift none"}},
                style: {classes: "travelers-tip " + (i ? i : ""), tip: {corner: !1}},
                show: {event: "click"},
                hide: {event: "unfocus click"},
                events: {
                    show: function (a,
                                    b) {
                        h.parents(".travelers").addClass("focused");
                        b.elements.content.off("click.minus").on("click.minus", ".minus", function () {
                            var a = $(this).siblings(".num"), d = parseInt(a.val(), 10),
                                i = parseInt(a.data("min") || "0", 10);
                            d > i && (d--, a.val(d), a.toggleClass("disabled", 0 === d), d === i && $(this).addClass("disabled"), a.trigger("change"), e(h, b.elements.content))
                        }).off("click.plus").on("click.plus", ".plus", function () {
                            var a = $(this).siblings(".num"), d = parseInt(a.val(), 10);
                            a.val(d + 1);
                            a.removeClass("disabled");
                            a.trigger("change");
                            $(this).siblings(".minus").removeClass("disabled");
                            e(h, b.elements.content)
                        }).off("click.close").on("click.close", ".close", function () {
                            b.hide()
                        });
                        window.setTimeout(function () {
                            var a = b.elements.content.offset().top, d = b.elements.content.outerHeight(!0),
                                e = $(window).height(), h = $(window).scrollTop() + e,
                                i = b.elements.content.parents(".ui-dialog-content");
                            i.length ? i.animate({scrollTop: a + i.scrollTop() + d - e}) : a + d > h && $("html,body").animate({scrollTop: a + d - e})
                        }, 0)
                    }, hide: function () {
                        h.parents(".travelers").removeClass("focused")
                    }
                }
            });
            h.siblings(".travel-with").find("input[type=checkbox]").change(function () {
                var a = h.siblings(".travel-with").find("input[type=checkbox]").filter(":checked");
                if (1 === a.length && "adults" === a.eq(0).attr("name")) h.find("span").text("Travelers"); else {
                    var b = "";
                    a.each(function (a) {
                        0 < a && (b += ", ");
                        b += $(this).next("label").text()
                    });
                    h.find("span").text(b)
                }
            })
        }
    }
});
define("jQueryExtensions/inspirockAutocomplete", ["modules/ajax", "modules/utils", "jquery", "jqueryui"], function (h, i) {
    var a = {
        id: void 0,
        label: "Start typing...",
        nightstay: !1,
        value: void 0,
        selectable: !1,
        className: "nonselectable"
    };
    a.li = "<li>" + a.label + "</li>";
    var b = {
        id: void 0,
        label: "Type another character...",
        nightstay: !1,
        value: void 0,
        selectable: !1,
        className: "nonselectable"
    };
    b.li = "<li>" + b.label + "</li>";
    var e = {
        id: void 0,
        label: "Searching...",
        nightstay: !1,
        value: void 0,
        selectable: !1,
        className: "nonselectable"
    };
    e.li = "<li>" + e.label + "</li>";
    $.fn.inspirockAutocomplete = function (d) {
        var t = {};
        $(this).each(function () {
            var m = $(this), r = null;
            m.data("id") && m.data("label") && (r = {
                id: m.data("id"),
                label: m.data("label"),
                value: m.data("label")
            }, m.data("nightstay") && (r.nightstay = m.data("nightstay")), m.data("countryCode") && (r.countryCode = m.data("countryCode")), m.data("topNightstay") && (r.topNightStay = m.data("topNightstay")), r = [r]);
            var j = d.tip || $("<div></div>"), k;
            m.autocomplete({
                delay: 100, minLength: 0, appendTo: d.appendTo || ".page-content",
                position: {my: "left top", at: "left bottom", collision: "none"}, source: function (m, s) {
                    function n(a, b) {
                        var d = b.split(" "), e = a, h;
                        for (h = 0; h < d.length; h++) {
                            var i = d[h];
                            i.length && (i = i.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), e = e.replace(RegExp("(?![^&;]+;)(?!<[^<>]*)(" + i + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<b>$1</b>"))
                        }
                        return e
                    }

                    var l = m.term;
                    if (d.appendAirports || !(k && "<inspirock-focus>" === l)) 0 === l.length ? (j.removeClass("hidden"), void 0 !== d.defaultDropdown ? s(d.defaultDropdown) : s([a])) : (k && (d.onDelete && d.onDelete.call(this),
                        j.removeClass("hidden"), !d.appendAirports || "<inspirock-focus>" !== l ? k = void 0 : m.term = l = d.sanitize ? d.sanitize(k.value) : k.value), 1 === l.length ? (j.removeClass("hidden"), s([b])) : t.hasOwnProperty(l) ? s(t[l]) : (s([e]), d.customName && (m.customName = d.customName), d.data && (m = $.extend(m, d.data)), h.makeAJAXcall({
                        url: d.url, type: "GET", data: m, success: function (a) {
                            try {
                                var b = [], a = JSON.parse(a), f;
                                d.defaultDropdown && k && (b = b.concat(d.defaultDropdown), b.push({
                                    id: void 0,
                                    nightstay: !1,
                                    value: void 0,
                                    selectable: !0,
                                    className: "line-airport nonselectable",
                                    li: "<li>NaN"
                                }));
                                for (f = 0; f < a.length; f++) {
                                    var e = a[f].label;
                                    a[f].selectable = !0;
                                    a[f].li = "<li>" + n(e, l) + "</li>";
                                    b.push(a[f]);
                                    if (a[f].children) for (var h = 0; h < a[f].children.length; h++) e = a[f].children[h].label, a[f].children[h].selectable = !0, a[f].children[h].li = '<li><span class="tab">' + n(e, l) + "<span></li>", b.push(a[f].children[h])
                                }
                                d.onResult && d.onResult.call(this, b, l);
                                if (!b.length) {
                                    var j;
                                    j = d.customCb ? d.customCb(l) : {
                                        id: void 0,
                                        label: "Can't find " + i.escape(l) + ".",
                                        nightstay: !1,
                                        value: void 0,
                                        selectable: !1,
                                        className: "invalid-data"
                                    };
                                    j.li = "<li>" + j.label + "</li>";
                                    b.push(j)
                                }
                                t[l] = b;
                                s(b)
                            } catch (m) {
                            }
                        }
                    })))
                }, focus: function (a, b) {
                    b.item.selectable ? d.onFocusItem && d.onFocusItem.call(this, a, b.item) : a.preventDefault()
                }, select: function (a, b) {
                    if (b.item.selectable) {
                        j.addClass("hidden");
                        k = b.item;
                        a.preventDefault();
                        if (b.item.id) {
                            var e = b.item.value;
                            try {
                                e = $("<i>" + b.item.label + "</i>").text()
                            } catch (h) {
                            }
                            m.val(e)
                        } else m.val(b.item.value);
                        d.onSelect && d.onSelect.call(this, a, b.item)
                    } else a.preventDefault()
                }, response: function (a, b) {
                    1 === b.content.length && (!b.content[0].id ||
                        !b.content[0].selectable) ? m.autocomplete("option", "autoFocus", !1) : m.autocomplete("option", "autoFocus", !0)
                }, open: function () {
                    navigator.userAgent.match(/(iPod|iPhone|iPad)/) && $(this).autocomplete("widget").off("menufocus hover mouseover")
                }
            }).off("focus.inspirockAutoComplete, click.inspirockAutoComplete").on("focus.inspirockAutoComplete, click.inspirockAutoComplete", function (a) {
                var b = k ? "<inspirock-focus>" : m.val();
                m.autocomplete("search", b);
                d.onFocus && d.onFocus.call(this, a, k);
                $(a.target).data("open", "true")
            }).off("blur.inspirockAutoComplete").on("blur.inspirockAutoComplete",
                function (a) {
                    var b = m.val();
                    !b && k ? (j.removeClass("hidden"), k = void 0) : b && !k && (j.removeClass("hidden"), m.val(""));
                    k && d.onBlur ? d.onBlur.call(this, a, k) : d.onEmpty && d.onEmpty.call(this, a, k)
                }).off("keypress.inspirockAutoComplete").on("keypress.inspirockAutoComplete", function (a) {
                13 === a.keyCode && (k && d.onSubmit) && d.onSubmit.call(this)
            });
            if (null !== r) for (var u = 0; u < r.length; u++) k = r[u], j.addClass("hidden"); else m.val().length && m.autocomplete("search", m.val());
            m.data("uiAutocomplete")._renderItem = function (a, b) {
                var e =
                        $(b.li).html(), h = b.className || "",
                    e = b.selectable ? $("<a>" + e + "</a>") : $("<span>" + e + "</span>");
                e.addClass(h).addClass("menu-list");
                b.selectable && e.addClass("ui-menu-item-wrapper");
                h = $(b.li).empty().addClass("ui-menu-item").addClass("notranslate").addClass(b.selectable ? "" : "non-selectable").attr("role", "presentation").attr("data-value", b.value).append(e).appendTo(a);
                void 0 !== d.extendDropdown && (e = parseInt(h.children().css("paddingLeft")) + d.extendDropdown, h.children().css("paddingLeft", e + "px").css("paddingRight",
                    e + "px"));
                return h
            };
            m.data("uiAutocomplete")._renderMenu = function (a, b) {
                var e = this;
                $.each(b, function (b, c) {
                    e._renderItemData(a, c)
                });
                $(a).removeClass("ui-corner-all");
                d.classes && $(a).addClass(d.classes)
            };
            void 0 !== d.extendDropdown && (m.data("uiAutocomplete")._resizeMenu = function () {
                this.menu.element.outerWidth(m.outerWidth() + 2 * d.extendDropdown)
            });
            m.data("inspirockAutocomplete", {
                getSelectedItem: function () {
                    return k
                }, clearPreviousItems: function () {
                    m.val("");
                    j.removeClass("hidden");
                    k = void 0
                }, setItem: function (a) {
                    k =
                        a;
                    m.val(k.value)
                }
            })
        })
    }
});
define("jQueryExtensions/planform", "modules/events modules/utils modules/analytics modules/analyticsEventParams modules/dateRange modules/intentmedia modules/preparetravelers moment jquery jqueryui jQueryExtensions/inspirockAutocomplete".split(" "), function (h, i, a, b, e, d, t, m) {
    function r(a) {
        a.qtip("destroy")
    }

    function j(a, b, d) {
        var e = a.qtip("api"), h;
        e && (h = e.options.content.text);
        !e || h !== b ? a.qtip({
            content: b,
            overwrite: !0,
            position: {container: d, my: "top left", at: "bottom left", adjust: {x: 40}},
            style: {
                classes: "error",
                tip: {mimic: "top center", offset: 20, width: 20, height: 10}
            },
            hide: !1
        }).qtip("show") : a.qtip("show")
    }

    var k = 250;
    $.fn.preparePlanForm = function (u, v, s, n, l) {
        function c() {
            var a = [];
            if (w.find(".domain").length) w.find(".domain").each(function () {
                if ($(this).data("inspirockAutocomplete")) {
                    var b = $(this).data("inspirockAutocomplete").getSelectedItem();
                    void 0 !== b && void 0 !== b.id && a.push(b)
                }
            }); else {
                var b = location.search ? location.search.split("?")[1] : null;
                if ((b = i.deserialize(b)) && b.destinations) a = b.destinations
            }
            return a
        }

        function q() {
            return $.map(c(),
                function (a) {
                    return a.id
                })
        }

        function f() {
            var a = w.find(".domain").first();
            r(a);
            a.removeClass("error")
        }

        function g() {
            var a = z.val(), b = B.val();
            if (a && b) return !0;
            for (var c = [".whoAdults", ".whoTeens", ".whoKids"], b = 0; b < c.length; b++) if (a = p.find(c[b]), a.is(":checked") && "adults" !== a.attr("name")) return !0;
            c = [".interestCity", ".interestOutdoor", ".interestCulture", ".interestUnwind", ".interestRomantic"];
            for (b = 0; b < c.length; b++) if (a = p.find(c[b]), a.is(":checked")) return !0;
            return p.find("input[name=style]:checked").length &&
            "Popular" !== p.find("input[name=style]:checked").attr("value") || p.find("input[name=pace]").length && "Medium" !== p.find("input[name=pace]:checked").attr("value") || p.find("input[name=categoryGroupNames]").filter(":checked").length ? !0 : !1
        }

        function x() {
            y = p.find(".more-options-btn");
            p.removeClass("expanded");
            y.find(".arrow").removeClass("fa-angle-up").addClass("fa-angle-down");
            p.trigger("collapse")
        }

        function E() {
            y = p.find(".more-options-btn");
            p.addClass("expanded");
            y.find(".arrow").removeClass("fa-angle-down").addClass("fa-angle-up");
            p.trigger("expand")
        }

        function F() {
            g() && E()
        }

        function H() {
            s.length && (s.fadeOut(k), x())
        }

        function A() {
            s.length && s.fadeIn(k)
        }

        function I(a, b) {
            if (s.length) {
                a && !J && F();
                var d = y.hasClass("expandable") && p.hasClass("expanded"), e = 1 < w.find(".domain").length,
                    f = 0 < c().length;
                b || d || e || f ? A() : H()
            }
        }

        function M() {
            y.hasClass("expandable") ? (p.hasClass("expanded") ? (a.trackEvent(u, "click.collapse-form"), x(), J = !0) : (a.trackEvent(u, "click.expand-form"), E(), J = !1), I(!1)) : y.data("toggle") ? D.hasClass("show-more") ? (D.removeClass("show-more"),
                y.html('more options<span class="fa fa-chevron-down"></span>')) : (D.addClass("show-more"), y.html('fewer options<span class="fa fa-chevron-up"></span>')) : (D.addClass("show-more"), y.hide(), $(".qtip").each(function () {
                $(this).data("qtip").reposition()
            }))
        }

        function N(a, b) {
            f();
            (b || a.hasOwnProperty("originalEvent")) && I(!0, !1)
        }

        function K() {
            A()
        }

        function C(b) {
            try {
                b.autocomplete("destroy")
            } catch (c) {
            }
            var d = b.siblings(".tip"), e, f = b.parents(".planning-form");
            f.length && (e = f);
            l || (l = 0 < window.navigator.userAgent.indexOf("Trident/") ?
                [{
                    id: void 0,
                    label: b.attr("placeholder"),
                    nightstay: !1,
                    value: void 0,
                    selectable: !1,
                    className: "nonselectable",
                    li: "<li>" + b.attr("placeholder") + "</li>"
                }] : []);
            var g = [], f = f.find("#attraction-ancestors-list");
            f.length && f.children().length && f.children().each(function () {
                var a = $(this), a = {
                    id: a.data("id"),
                    label: a.data("label"),
                    nightstay: a.data("nightstay"),
                    value: a.data("value"),
                    selectable: !0,
                    countryCode: a.data("countryCode"),
                    topNightStay: a.data("topNightstay")
                };
                a.li = "<li>" + a.label + "</li>";
                g.push(a)
            });
            b.inspirockAutocomplete({
                url: window.contextPath +
                    "/domainAutocomplete",
                extendDropdown: 0,
                appendTo: e,
                tip: d,
                defaultDropdown: g.length ? g : void 0,
                onResult: function (b, c) {
                    0 === b.length && a.trackNonInteractionEvent(u, "show-only-unknown-destination", c);
                    if (0 === b.length) {
                        var d = {
                            id: void 0,
                            label: "Could not find <b class='term'>" + i.escape(c) + "</b>. Please enter a city, region, or country.",
                            nightstay: !1,
                            value: c,
                            selectable: !0
                        };
                        d.li = "<li>" + d.label + "</li>";
                        b.push(d)
                    }
                },
                onSelect: function (a, c) {
                    var d = w.find(".domain").first();
                    d.removeClass("error");
                    r(d);
                    void 0 === c.id ? b.data("inspirockAutocomplete").clearPreviousItems() :
                        (A(), F())
                },
                onSubmit: function () {
                    L.trigger("click")
                }
            });
            d.qtip({
                overwrite: !0,
                content: d.data("showText"),
                position: {
                    my: "top right",
                    at: "bottom right",
                    effect: !1,
                    adjust: {x: 2},
                    container: p,
                    viewport: $(window)
                },
                hide: {fixed: !0, delay: 100},
                style: {
                    classes: "qtip-light domain-tip",
                    tip: {corner: !0, width: 20, height: 10, mimic: "center bottom", offset: 30}
                }
            });
            w.off("click.input").on("click.input", ".domain", K);
            w.off("focus.input").on("focus.input", ".domain", N);
            w.off("keyup.input").on("keyup.input", ".domain", K)
        }

        var p = $(this),
            D = p.find(".steps"), z = p.find(".startDate"), B = p.find(".endDate"), L = p.find(".plan-button"),
            G = p.find(".add-destination"), w = p.find(".destinations"), y = p.find(".more-options-btn"),
            O = p.find(".travelers-btn");
        $(".plan-form-wrapper");
        var J = !1, P = parseInt(p.data("maxPlanLength"), 10);
        w.find(".domain").each(function () {
            C($(this))
        });
        e.prepareDateRange(z, B, P, {
            checkAndShade: I,
            checkAndExpand: F,
            container: z.parent(),
            $startAltField: p.find(".calendar-input .startDate-alt"),
            $endAltField: p.find(".calendar-input .endDate-alt"),
            dateFormat: i.JQUERY_ISO_DATE_FORMAT,
            altFieldDateFormat: window.dateFormatDisplayPattern,
            numberOfMonths: 2,
            onSelect: function () {
                r(p.find(".calendar-input .startDate-alt"));
                r(p.find(".calendar-input .endDate-alt"))
            }
        });
        L.click(function () {
            var e;
            e = q();
            var f = w.find(".domain").first();
            1 > e.length ? (j(f, "This field is required.", p), e = !1) : (r(f), e = !0);
            if (e) if (z.val()) if (B.val()) {
                var f = c(), g = 0, k, l;
                z.val() && (k = z.data("date"), k = $.datepicker.formatDate("yymmdd", k));
                B.val() && (l = B.data("date"), l = $.datepicker.formatDate("yymmdd",
                    l));
                var g = p.find("input[name=numAdults]"), C = p.find("input[name=numTeens]");
                e = p.find("input[name=numKids]");
                g = parseInt(g.val(), 10);
                C = parseInt(C.val(), 10);
                e = parseInt(e.val(), 10);
                e = g + C + e;
                d.isEnabled() && (g = f[0], d.triggerOpenExitUnit(g.nightstay ? g.value : g.topNightStay ? g.topNightStay : void 0, g.stateCode, g.countryCode, k, l, e));
                if (!v || !v.length) v = $("<div>").attr("id", "progress-indicator").addClass("progress-indicator hidden"), v.append($("<img>").addClass("progress-img").attr("src", "https://s.inspirock.com/images/misc/bulb.gif")),
                    v.append($("<div>").addClass("progress-txt").html("Creating your plan.<br/>You can customize and take it with you.")), v.appendTo($(".page-content"));
                v.removeClass("hidden").siblings().addClass("hidden");
                $(".dlg-large-map.ui-dialog").length && $(".dlg-large-map .ui-dialog-content").dialog("close");
                $("body,.page-wrapper").css("background-image", "none");
                h.triggerEvent("plan-form", "plan-form-submitted", {});
                k = "";
                for (g = 0; g < f.length; g++) 0 < g && (k += "-"), k += f[g].value.toLowerCase();
                a.setProperty("dimension2",
                    k.toLowerCase());
                window.history.replaceState(window.history.state, "", i.removeParameterByName("error-domains"));
                l = c();
                1 === l.length && l[0].nightstay ? a.setProperty("dimension4", "single-night-stay") : 1 === l.length ? a.setProperty("dimension4", "single-destination") : a.setProperty("dimension4", "multiple-destinations");
                f = "";
                for (k = 0; k < l.length; k++) a.trackNonInteractionEvent(u, b.ACT_DOMAIN, l[k].value.toLowerCase()), 0 < k && (f += "-"), f += l[k].value.toLowerCase();
                a.trackNonInteractionEvent(u, b.ACT_WHERE, f.toLowerCase());
                f = z.val();
                g = B.val();
                k = m(f).startOf("d");
                l = m(g).startOf("d");
                a.trackNonInteractionEvent(u, b.ACT_STARTDT, k ? f : "unspecified");
                a.trackNonInteractionEvent(u, b.ACT_ENDDT, l ? g : "unspecified");
                f = "unspecified";
                k.isValid() && l.isValid() && (f = l.diff(k, "d") + 1);
                a.trackNonInteractionEvent(u, b.ACT_DURATION, f);
                l = "default";
                k.isValid() && (l = k.diff(m().startOf("d"), "d"));
                a.trackNonInteractionEvent(u, b.ACT_DAYS_AHEAD, l);
                f = [".whoAdults", ".whoTeens", ".whoKids"];
                for (k = 0; k < f.length; k++) l = p.find(f[k]), (g = l.is("input[type=checkbox]")) &&
                l.is(":checked") ? a.trackNonInteractionEvent(u, b.ACT_WHO, l.attr("name").toLowerCase()) : !g && 0 < parseInt(l.val(), 10) && a.trackNonInteractionEvent(u, b.ACT_WHO, l.attr("name").substr(3).toLowerCase());
                f = [".interestCity", ".interestOutdoor", ".interestCulture", ".interestUnwind", ".interestRomantic"];
                for (k = 0; k < f.length; k++) l = p.find(f[k]), l.is(":checked") && a.trackNonInteractionEvent(u, b.ACT_INTEREST, l.attr("name").toLowerCase());
                0 < p.find("input[name=style]").length && a.trackNonInteractionEvent(u, b.ACT_STYLE, p.find("input[name=style]").filter(":checked").val().toLowerCase());
                p.find("input[name=pace]").length && a.trackNonInteractionEvent(u, b.ACT_PACE, p.find("input[name=pace]").filter(":checked").val().toLowerCase());
                p.find("input[name=categoryGroupNames]").filter(":checked").each(function () {
                    a.trackNonInteractionEvent(u, b.ACT_CATEGORY, $(this).val().toLowerCase())
                });
                h.triggerEvent("plan-form", "australia_track_plan_form", {
                    domains: c(),
                    startDate: z.data("date"),
                    endDate: B.data("date"),
                    totalTravelers: e,
                    style: p.find("input[name=style]").filter(":checked").val().toLowerCase(),
                    pace: p.find("input[name=pace]").filter(":checked").val().toLowerCase(),
                    interests: p.find("input.interest").filter(":checked").toArray().map(function (a) {
                        console.log(a);
                        return $(a).attr("name")
                    }),
                    categoryGroups: p.find("input[name=categoryGroupNames]").filter(":checked").toArray().map(function (a) {
                        console.log(a);
                        return $(a).attr("value").toLowerCase()
                    })
                });
                a.trackEvent(u, "plan-button", void 0, function () {
                    p.remove("input[name=domains]");
                    $("<input>").attr("type", "hidden").attr("name", "domains").val(i.joinArray(q(), ",")).appendTo(p);
                    localStorage && localStorage.getItem("userDestinationIdOverride") &&
                    $("<input>").attr("type", "hidden").attr("name", "userDestinationIdOverride").val(localStorage.getItem("userDestinationIdOverride")).appendTo(p);
                    localStorage && localStorage.getItem("userCountryCodeOverride") && $("<input>").attr("type", "hidden").attr("name", "userCountryCodeOverride").val(localStorage.getItem("userCountryCodeOverride")).appendTo(p);
                    p.submit();
                    n && n()
                })
            } else B.parents(".steps").find(".calendar-input,.delete,.dests,.travelers,.more-options-btn").off("click.dismisstip").one("click.dismisstip",
                function () {
                    r(B.siblings(".endDate-alt"))
                }), j(B.siblings(".endDate-alt"), "Please select an end date", p); else z.parents(".steps").find(".calendar-input,.delete,.dests,.travelers,.more-options-btn").off("click.dismisstip").one("click.dismisstip", function () {
                r(z.parents(".dates"))
            }), j(z.parents(".dates"), "Please select a start date", p)
        });
        G.click(function () {
            var a = w.find(".domain").first(),
                a = $("<input>").addClass("domain " + (a.hasClass("flat") ? "flat" : "shaded")).attr("type", "text").attr("placeholder", w.find(".domain").first().attr("placeholder")),
                b = $("<div>").addClass("destination").append(a);
            if (w.find(".tip").first().length) {
                var c = $("<div>").addClass("tip").data("showText", w.find(".tip").first().data("showText")).html('<span class="fa fa-question"></span>');
                b.append(c)
            }
            w.append(b);
            C(a);
            I(!0);
            a.focus();
            16 <= w.find(".domain").length && $(this).hide()
        });
        16 <= w.find(".domain").length && G.hide();
        y.hasClass("expandable") && y.click(M);
        t.prepareTravelers(O, void 0, p);
        s.click(function () {
            H();
            f()
        });
        G = w.find(".domain").first();
        G.is(":focus") && G.blur();
        D.find(".attraction-title").length &&
        i.ellipsizeNames(D.find(".attraction-title"))
    }
});
define("jQueryExtensions/inspirockDialog", ["modules/utils", "jquery", "jqueryui"], function (h) {
    $.fn.inspirockDialog = function (i) {
        var a = $(this), b = i.open, e = i.close, d = i.beforeClose;
        i.open = function (d, e) {
            i.animated && (a.parents(".ui-dialog").addClass("open"), $(".ui-widget-overlay:last").addClass("open animated"), $("body").addClass("blurred"), h.setupDialogOverlay(a, !1));
            b && b(d, e)
        };
        i.close = function (b, d) {
            e && e(b, d);
            a.dialog("destroy").remove()
        };
        i.beforeClose = function (b, e) {
            d && d(b, e);
            if (i.animated) {
                if (a.data("forceClose")) return !0;
                $("body").removeClass("blurred");
                a.parents(".ui-dialog").removeClass("open");
                $(".ui-widget-overlay:last").removeClass("open");
                window.setTimeout(function () {
                    a.data("forceClose", !0);
                    $(".ui-widget-overlay:last").removeClass("animated");
                    try {
                        a.dialog("close")
                    } catch (b) {
                    }
                }, 250);
                return !1
            }
            return !0
        };
        return a.dialog(i)
    }
});
define("seo/landing", "modules/analytics modules/analyticsEventParams modules/ajax modules/utils text!templates/showCreatePlanPrompt.html jQueryExtensions/planform jquery jqueryui jQueryExtensions/inspirockDialog".split(" "), function (h, i, a, b, e) {
    var d = {}, t = !1, m = !1;
    d.showPlanFormDialog = function (d) {
        if (!t) {
            t = !0;
            var e = $("body").hasClass("normal");
            a.makeAJAXcall({
                type: "GET", data: d, url: window.contextPath + "/planFormDialog", success: function (a) {
                    var h = $(a), i = $(window).scrollTop(), s = $("#pageWrapper");
                    s.addClass("planform-open").css("top",
                        -i);
                    var n = $("#progress-indicator");
                    h.inspirockDialog({
                        resizable: !1,
                        modal: !0,
                        draggable: !1,
                        width: "auto",
                        dialogClass: "dlg-planForm mediumx " + (e ? "animated" : ""),
                        animated: e,
                        open: function () {
                            m = !0;
                            b.removeAllErrorToolTips();
                            $(".modal-box").length && ($("body").removeClass("modal-open"), $(".modal-box .ui-dialog-content").addClass("no-scroll"));
                            t = !1;
                            var a = h.find(".planning-form");
                            a.preparePlanForm(d.analyticsCategoryPrefix + ".planform-dialog", n, $("#shade"), function () {
                                h.dialog("close");
                                $(window).scrollTop(0)
                            });
                            window.setTimeout(function () {
                                a.find(".domain").first().focus()
                            }, e ? 400 : 0);
                            a.on("expand collapse", function () {
                                h.dialog("option", "position", {
                                    my: "center",
                                    at: "center",
                                    of: window,
                                    using: function (a) {
                                        $(this).animate(a, 100, "linear")
                                    }
                                })
                            })
                        },
                        beforeClose: function () {
                            h.find(".qtip").qtip("destroy");
                            $(".modal-box").length && ($("body").addClass("modal-open"), $(".modal-box .ui-dialog-content").removeClass("no-scroll"));
                            s.removeClass("planform-open").css("top", "");
                            n.is(":visible") || $(window).scrollTop(i)
                        }
                    })
                }
            })
        }
    };
    d.setupCreatePlanPrompt =
        function (a, h, i, u, t, s, n) {
            function l() {
                var c = b.getCookie("INS_CREATE_PLAN_DLG");
                if ((!n || !c) && !m && !$("#progress-indicator").is(":visible")) if (n && b.addCookie("INS_CREATE_PLAN_DLG", "1", 1), !$(".ui-dialog").is(":visible") && !$(":focus").parents(".planning-form").length && !$(".planning-form.expanded").length && !$(".planning-form .date-range.focused").length && !$(".qtip.travelers-tip").length && !$("#dlp-shade").is(":visible")) {
                    var f = a, l = h, q = i, s = u, A = $(e);
                    A.dialog({
                        resizable: !1, modal: !0, draggable: !1, width: "350px",
                        dialogClass: "showCreatePlanPrompt mediumx", buttons: {
                            "No thanks": function () {
                                A.dialog("close")
                            }, "Yes!": function (a) {
                                A.dialog("close");
                                d.showPlanFormDialog({
                                    analyticsCategoryPrefix: f + ".create-plan-prompt",
                                    requiredAttractionId: q,
                                    destinationIds: s
                                });
                                a.stopPropagation()
                            }
                        }, close: function () {
                            A.dialog("destroy").remove()
                        }, open: function () {
                            b.setupDialogOverlay(A, !1);
                            A.find(".name").html(l)
                        }
                    })
                }
            }

            var t = t || 0, s = s || 0, n = n || !1, c = 0, q = 0;
            if (0 === t && 0 === s) l(); else {
                var f = setInterval(function () {
                    c += 0.5;
                    q += 0.5;
                    c >= s && q >= t && (l(),
                        window.clearInterval(f))
                }, 500);
                $(document).mousemove(function () {
                    c = 0
                });
                $(document).keypress(function () {
                    c = 0
                });
                $(document).scroll(function () {
                    c = 0
                })
            }
        };
    d.prepareHeader = function (a) {
        function b() {
            var j = $(this).scrollTop();
            0 < j ? d.addClass("dock-top") : d.removeClass("dock-top");
            j > a + h ? (e.removeClass("hidden"), i.addClass("dock-top")) : (e.addClass("hidden"), i.removeClass("dock-top"))
        }

        var d = $("header"), e = $("#headerstartplanning"), h = parseInt($("#pageContent").css("marginTop")),
            i = $("#planListHeader");
        b();
        $(window).scroll(function () {
            b()
        })
    };
    return d
});
define("text!templates/feedback.html", [], function () {
    return '<div>\n    <div class="content-div">\n        <div class="featured-title">Feedback</div>\n        <div class="featured-tagline">We\'d love to hear about your experience.</div>\n    </div>\n    <div class="content-div">\n        <div class="input-title">Your Name <span class="lower">(optional):</span></div>\n        <input type="text" class="name flat" name="personName"/>\n        <div class="input-title">Your Email Address</div>\n        <input type="text" class="email flat" name="emailAddress"/>\n        <div class="input-title">Feedback <span class="lower"></span></div>\n        <textarea class="feedback-area flat" name="feedbackText"></textarea>\n        <div class="clear"></div>\n    </div>\n    <div class="content-div">\n        <div class="input-title">Would you recommend Inspirock to Friends? <span class="lower">(optional):</span></div>\n        <div>\n            <div class="column3"><input type="radio" class="flat" id="recommendYes" name="willRecommend" value="Yes" /><label for="recommendYes">Yes</label></div>\n            <div class="column3"><input type="radio" class="flat" id="recommendNo" name="willRecommend" value="No" /><label for="recommendNo">No</label></div>\n            <div class="clear"></div>\n        </div>\n    </div>\n</div>'
});
define("modules/header", "modules/analytics modules/analyticsEventParams seo/landing modules/events modules/utils modules/ajax moment text!templates/feedback.html jquery qtip".split(" "), function (h, i, a, b, e, d, t, m) {
    function r() {
        $(".bottom-pane").hasClass("visible") ? b.triggerEvent("pageHeader", "page-change", {action: "account_click"}) : k("", {action: "account_click"})
    }

    function j() {
        var a = $("#userOptions");
        a.qtip({
            overwrite: !0,
            content: $("#userDropdown"),
            position: {
                my: "top center", at: "bottom center", container: $("#pageHeader"),
                adjust: {y: -12}, effect: !1
            },
            show: {event: "mouseenter", delay: 0},
            hide: {event: "mouseleave", fixed: !0, delay: 100},
            events: {
                show: function (b, c) {
                    $("#currency").qtip() && $("#currency").qtip().hide();
                    a.addClass("active");
                    0 === c.elements.content.siblings(".qtip-fillerDiv").length && $('<div class="qtip-fillerDiv"></div>').insertBefore(c.elements.content);
                    c.elements.content.off("click.logout").on("click.logout", ".logout-button", g);
                    c.elements.content.off("click.account").on("click.account", ".account-button", r)
                }, hide: function () {
                    a.removeClass("active")
                }
            },
            style: {
                classes: "user-dropdown clearfix qtip-light qtip-shadow",
                tip: {corner: !0, width: 20, height: 10, offset: 20}
            }
        })
    }

    function k(b, c) {
        "newPlan" === c.action ? a.showPlanFormDialog({analyticsCategoryPrefix: "header.newplan"}) : "planRow_click" === c.action ? x.bind(c.$this)() : "page-header-click" === c.action ? window.location.href = c.url : "allPlans_click" === c.action ? window.location.href = c.url : "logout_click" === c.action ? h.trackEvent(i.CAT_HEADER, i.ACT_LOGOUT, "native", function () {
                $("#logoutForm").submit();
                window.localStorage.removeItem("customizationCount")
            }) :
            "account_click" === c.action && d.makeAJAXcall({
                type: "GET", url: "/user/account", success: function (a) {
                    var b = $(a);
                    b.dialog({
                        resizable: !1, draggable: !1, modal: !0, dialogClass: "dlg-useraccount mediumx", open: function () {
                            e.setupDialogOverlay(b, !1, !1);
                            b.dialog({position: {my: "center", at: "center", of: window}});
                            b.find(".delete-link").on("click", function () {
                                var a = $("<div><div class='title'>Are you sure?</div>If you delete your account you will permanently lose access to your plans</div>");
                                a.dialog({
                                    resizable: !1, modal: !0,
                                    draggable: !1, dialogClass: "dlg-useraccount-delete-conf mediumx", buttons: {
                                        Cancel: function () {
                                            a.dialog("close")
                                        }, Delete: function () {
                                            d.makeAJAXcall({
                                                type: "POST", url: "/user/delete", success: function (b) {
                                                    if ("SUCCESS" === b.status) {
                                                        h.trackEvent(i.CAT_HEADER, i.ACT_ACCOUNT_DELETE);
                                                        a.dialog("close");
                                                        var c = $("<div><div><svg><use xlink:href='#icon-confirmation-copy'></use></svg></div>Your account was successfully deleted</div>");
                                                        c.dialog({
                                                            resizable: !1,
                                                            modal: !0,
                                                            draggable: !1,
                                                            dialogClass: "dlg-useraccount-delete-done nox",
                                                            open: function () {
                                                                e.setupDialogOverlay(c, !1, !0);
                                                                window.setTimeout(function () {
                                                                    c.parents(".ui-dialog").fadeOut(500, function () {
                                                                        c.dialog("close");
                                                                        window.location.href = b.redirectUrl
                                                                    })
                                                                }, 3E3)
                                                            },
                                                            close: function () {
                                                                c.dialog("destroy").remove()
                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    }, open: function () {
                                        e.setupDialogOverlay(a, !1, !1)
                                    }, close: function () {
                                        a.dialog("destroy").remove()
                                    }
                                });
                                b.dialog("close")
                            });
                            b.find(".edit-link").on("click", function () {
                                b.find(".name .view").addClass("hidden");
                                b.find(".name .edit").removeClass("hidden")
                            });
                            b.find(".name .edit").on("keydown.name,paste.name",
                                "input", function () {
                                    b.find(".name .edit .errors").html("")
                                });
                            b.find(".save-link").on("click", function () {
                                var a = b.find(".name .edit .first").val().trim(),
                                    c = b.find(".name .edit .last").val().trim();
                                d.makeAJAXcall({
                                    type: "POST",
                                    url: "/user/name",
                                    data: {firstName: a, lastName: c},
                                    success: function (d) {
                                        "SUCCESS" === d.status ? (b.find(".name .view").removeClass("hidden").find(".fullname").text(a + " " + c), b.find(".name .edit").addClass("hidden"), $("#userOptions .name").text(a)) : b.find(".name .edit .errors").html(d.errors[0].error)
                                    }
                                })
                            })
                        },
                        close: function () {
                            b.dialog("destroy").remove()
                        }
                    })
                }
            })
    }

    function u(a) {
        a.preventDefault();
        a.stopPropagation();
        b.triggerEvent("header", "australia_track_nav_link", {linkText: "New Plan", position: "top"});
        $(".bottom-pane").hasClass("visible") ? b.triggerEvent("pageHeader", "page-change", {action: "newPlan"}) : k("", {action: "newPlan"})
    }

    function v(a, b, c) {
        function d() {
            n(a);
            $('.language-dropdown li .languageOption[data-language-code="' + a + '"]').parents("li").addClass("active").siblings().removeClass("active");
            e && e.dialog("close");
            $("#language").find(".language-text").text(b)
        }

        if ("en" === a) d(); else {
            var e = $("<div>" + c + "</div>"), c = f[a].OK, g = {};
            g[f[a].Cancel] = function () {
                e.dialog("close")
            };
            g[c] = function () {
                d()
            };
            e.dialog({
                resizable: !1,
                modal: !0,
                title: "",
                draggable: !1,
                width: "490px",
                dialogClass: "dlg-google-translate notranslate",
                buttons: g
            })
        }
    }

    function s() {
        var a = $("#help-container"), c = a.find(".help-tips");
        if (c.data("qtip") && (c = c.data("qtip")._id, $("#" + c).hasClass("prod-intro-tip"))) return;
        c = $('<div class="show-tips help-content">Help me with this page</div><div class="show-faq help-content">FAQ</div><div class="show-feedback help-content">Give feedback</div>');
        a.qtip({
            overwrite: !0,
            content: c,
            position: {
                my: "top center",
                at: "bottom center",
                container: $("#pageHeader"),
                adjust: {y: -12},
                effect: !1
            },
            show: {ready: !0},
            hide: {event: "mouseleave", fixed: !0, delay: 100},
            events: {
                show: function (a, c) {
                    var f = c.elements.content.find(".show-tips");
                    f.addClass("hidden");
                    b.triggerEvent("header", "enable-help-tips", {$showTips: f});
                    c.elements.content.off("click.show-tips").on("click.show-tips", ".show-tips", function () {
                        c.destroy();
                        b.triggerEvent("header", "show-help-tips", {force: !0})
                    });
                    c.elements.content.off("click.show-faq").on("click.show-faq",
                        ".show-faq", function () {
                            c.destroy();
                            var a = e.getParameterByName("partner");
                            window.open((a ? "http://" + a : "") + "/faq", "_blank")
                        });
                    c.elements.content.off("click.show-feedback").on("click.show-feedback", ".show-feedback", function () {
                        c.destroy();
                        var a = $(m);
                        $(".dlg-feedback").length || a.dialog({
                            resizable: !1,
                            draggable: !1,
                            modal: !0,
                            dialogClass: "dlg-feedback mediumx",
                            width: "560px",
                            buttons: {
                                Submit: function () {
                                    var b = a.parents(".ui-dialog").find(".ui-dialog-buttonpane button"),
                                        c = a.find(".name"), f = a.find(".email"), g = a.find(".feedback-area"),
                                        h = a.find("input[name=willRecommend]");
                                    if (0 !== c.val().trim().length && !e.isName(c.val().trim())) e.showErrorTooltip(c, "Please enter a valid name."); else {
                                        e.hideErrorTooltip(c);
                                        var i;
                                        if (i = e.validateEmailField(f)) "" === g.val().trim() ? (e.showErrorTooltip(g, "Please enter your Feedback."), i = !1) : (e.hideErrorTooltip(g), i = !0);
                                        if (i) {
                                            b.attr("disabled", "disabled");
                                            i = {};
                                            i.personName = c.val().trim();
                                            i.emailAddress = f.val().trim();
                                            i.feedback = g.val().trim();
                                            var j = h.filter(":checked");
                                            i.willRecommend = 0 < j.length ? j.val() :
                                                "";
                                            d.makeAJAXcall({
                                                type: "POST",
                                                data: i,
                                                url: window.contextPath + "/feedback",
                                                success: function () {
                                                    c.val("");
                                                    f.val("");
                                                    g.val("");
                                                    h.filter(":checked").prop("checked", !1);
                                                    e.showOkDialog("Feedback", "Thank you for your feedback.", "OK")
                                                },
                                                complete: function () {
                                                    b.removeAttr("disabled");
                                                    a.dialog("close")
                                                }
                                            })
                                        }
                                    }
                                }
                            },
                            open: function () {
                                e.setupDialogOverlay(a, !1, !0);
                                a.dialog({position: {my: "center", at: "center", of: window}})
                            },
                            close: function () {
                                a.find(".qtip").qtip("destroy");
                                a.dialog("destroy").remove()
                            }
                        })
                    })
                }
            },
            style: {
                classes: "help-dropdown qtip-light qtip-shadow",
                tip: {corner: !0, width: 20, height: 10, mimic: "top center", offset: 60}
            }
        })
    }

    function n(a) {
        function b(a, c) {
            var d;
            document.createEvent ? (d = document.createEvent("HTMLEvents"), d.initEvent(c, !0, !0), a.dispatchEvent(d)) : document.createEventObject && (d = document.createEventObject(), d.eventType = c, a.fireEvent("on" + d.eventType, d))
        }

        if (a) if ("en" === a) a = $(".goog-te-banner-frame").contents().find("#\\:1\\.restore"), a.length && (e.addCookie("language", "", -1), b(a[0], "click")); else {
            var c = $("#google_translate_element").find("select.goog-te-combo");
            c.length && (e.addCookie("language", a, 30), c.val(a), b(c[0], "change"))
        }
    }

    var l = {}, c, q, f = {
        en: {
            confirmTranslation: "We are going to translate this page <br /> using Google Translator",
            autoDetectTranslation: "Do you want to translate this page to english <br /> using Google Translator?",
            OK: "OK",
            Cancel: "Cancel"
        },
        es: {
            confirmTranslation: "Vamos a traducir esta p\u00e1gina <br /> usando Google Translator",
            autoDetectTranslation: "\u00bfQuieres traducir esta p\u00e1gina a espa\u00f1ol <br /> usando Google Translator?",
            OK: "DE ACUERDO",
            Cancel: "Cancelar"
        },
        ca: {
            confirmTranslation: "Anem a traduir aquesta p\u00e0gina <br /> utilitzant Google Translator",
            autoDetectTranslation: "Voleu traduir aquesta p\u00e0gina a Angl\u00e8s <br /> usant Google Translator?",
            OK: "D'acord",
            Cancel: "cancel \u00b7 lar"
        },
        el: {
            confirmTranslation: "\u0398\u03b1 \u03bc\u03b5\u03c4\u03b1\u03c6\u03c1\u03ac\u03c3\u03bf\u03c5\u03bc\u03b5 \u03b1\u03c5\u03c4\u03ae\u03bd \u03c4\u03b7 \u03c3\u03b5\u03bb\u03af\u03b4\u03b1 <br /> \u03c7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03ce\u03bd\u03c4\u03b1\u03c2 \u03c4\u03bf Google Translator",
            autoDetectTranslation: "\u0398\u03ad\u03bb\u03b5\u03c4\u03b5 \u03bd\u03b1 \u03bc\u03b5\u03c4\u03b1\u03c6\u03c1\u03ac\u03c3\u03b5\u03c4\u03b5 \u03b1\u03c5\u03c4\u03ae \u03c4\u03b7 \u03c3\u03b5\u03bb\u03af\u03b4\u03b1 \u03c3\u03c4\u03b1 \u03b5\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac <br /> \u03c7\u03c1\u03b7\u03c3\u03b9\u03bc\u03bf\u03c0\u03bf\u03b9\u03ce\u03bd\u03c4\u03b1\u03c2 \u03c4\u03bf Google Translator;",
            OK: "\u0395\u03bd\u03c4\u03ac\u03be\u03b5\u03b9",
            Cancel: "\u039c\u03b1\u03c4\u03b1\u03af\u03c9\u03c3\u03b7"
        },
        no: {
            confirmTranslation: "Vi skal oversette denne siden <br /> ved hjelp av Google Translator",
            autoDetectTranslation: "\u00d8nsker du \u00e5 oversette denne siden til norsk <br /> ved hjelp av Google Translator?",
            OK: "OK",
            Cancel: "Avbryt"
        },
        de: {
            confirmTranslation: "Wir werden diese Seite mit Google Translator \u00fcbersetzen",
            autoDetectTranslation: "M\u00f6chten Sie diese Seite mit Google \u00dcbersetzer auf Deutsch \u00fcbersetzen?",
            OK: "OK",
            Cancel: "Stornieren"
        },
        cs: {
            confirmTranslation: "P\u0159evedeme tuto str\u00e1nku <br /> pomoc\u00ed Google Translator",
            autoDetectTranslation: "P\u0159ejete si p\u0159elo\u017eit tuto str\u00e1nku do \u010de\u0161tiny pomoc\u00ed Google Translator?",
            OK: "OK",
            Cancel: "zru\u0161en\u00ed"
        },
        fr: {
            confirmTranslation: "Nous allons traduire cette page <br /> en utilisant Google Translator",
            autoDetectTranslation: "Voulez-vous traduire cette page en fran\u00e7ais <br /> en utilisant Google Translator?",
            OK: "D'accord",
            Cancel: "Annuler"
        },
        hi: {
            confirmTranslation: "\u0939\u092e Google \u0905\u0928\u0941\u0935\u093e\u0926\u0915 \u0915\u093e \u0909\u092a\u092f\u094b\u0917 \u0915\u0930\u0915\u0947 \u0907\u0938 \u092a\u0947\u091c \u0915\u093e \u0905\u0928\u0941\u0935\u093e\u0926 \u0915\u0930\u0928\u0947 \u091c\u093e \u0930\u0939\u0947 \u0939\u0948\u0902",
            autoDetectTranslation: "\u0915\u094d\u092f\u093e \u0906\u092a \u0917\u0942\u0917\u0932 \u091f\u094d\u0930\u093e\u0902\u0938\u0932\u0947\u091f\u0930 \u0915\u093e \u0909\u092a\u092f\u094b\u0917 \u0915\u0930\u0924\u0947 \u0939\u0941\u090f \u0907\u0938 \u092a\u0947\u091c \u0915\u094b \u0939\u093f\u0928\u094d\u0926\u0940 \u092e\u0947\u0902 \u0905\u0928\u0941\u0935\u093e\u0926 \u0915\u0930\u0928\u093e \u091a\u093e\u0939\u0924\u0947 \u0939\u0948\u0902?",
            OK: "\u0920\u0940\u0915",
            Cancel: "\u0930\u0926\u094d\u0926 \u0915\u0930\u0928\u093e"
        },
        gu: {
            confirmTranslation: "\u0a85\u0aae\u0ac7 Google \u0a85\u0aa8\u0ac1\u0ab5\u0abe\u0aa6\u0a95\u0aa8\u0acb \u0a89\u0aaa\u0aaf\u0acb\u0a97 \u0a95\u0ab0\u0ac0\u0aa8\u0ac7 \u0a86 \u0aaa\u0ac3\u0ab7\u0acd\u0aa0\u0aa8\u0ac1\u0a82 \u0a85\u0aa8\u0ac1\u0ab5\u0abe\u0aa6 \u0a95\u0ab0\u0ac0 \u0ab0\u0ab9\u0acd\u0aaf\u0abe \u0a9b\u0ac0\u0a8f <br />",
            autoDetectTranslation: "\u0ab6\u0ac1\u0a82 \u0aa4\u0aae\u0ac7 Google \u0a85\u0aa8\u0ac1\u0ab5\u0abe\u0aa6\u0a95\u0aa8\u0acb \u0a89\u0aaa\u0aaf\u0acb\u0a97 \u0a95\u0ab0\u0ac0\u0aa8\u0ac7 \u0a85\u0a82\u0a97\u0acd\u0ab0\u0ac7\u0a9c\u0ac0\u0aae\u0abe\u0a82 \u0a86 \u0aaa\u0ac3\u0ab7\u0acd\u0aa0\u0aa8\u0acb \u0a85\u0aa8\u0ac1\u0ab5\u0abe\u0aa6 \u0a95\u0ab0\u0ab5\u0abe \u0aae\u0abe\u0a97\u0acb \u0a9b\u0acb?",
            OK: "\u0aa0\u0ac0\u0a95 \u0a9b\u0ac7",
            Cancel: "\u0ab0\u0aa6 \u0a95\u0ab0\u0acb"
        },
        ta: {
            confirmTranslation: "\u0b87\u0ba8\u0bcd\u0ba4 \u0baa\u0b95\u0bcd\u0b95\u0ba4\u0bcd\u0ba4\u0bc8 <br /> \u0bae\u0bca\u0bb4\u0bbf\u0baa\u0bc6\u0baf\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bcb\u0bae\u0bcd <br /> Google \u0bae\u0bca\u0bb4\u0bbf\u0baa\u0bc6\u0baf\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bbe\u0bb3\u0bb0\u0bc8\u0baa\u0bcd \u0baa\u0baf\u0ba9\u0bcd\u0baa\u0b9f\u0bc1\u0ba4\u0bcd\u0ba4\u0bc1\u0bb5\u0bcb\u0bae\u0bcd",
            autoDetectTranslation: "\u0b86\u0b99\u0bcd\u0b95\u0bbf\u0bb2 \u0bae\u0bca\u0bb4\u0bbf\u0baa\u0bc6\u0baf\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bc8 <br /> \u0bae\u0bca\u0bb4\u0bbf\u0baa\u0bc6\u0baf\u0bb0\u0bcd\u0baa\u0bcd\u0baa\u0bbe\u0bb3\u0bb0\u0bc8\u0baa\u0bcd \u0baa\u0baf\u0ba9\u0bcd\u0baa\u0b9f\u0bc1\u0ba4\u0bcd\u0ba4 \u0bb5\u0bc7\u0ba3\u0bcd\u0b9f\u0bc1\u0bae\u0bbe?",
            OK: "\u0b9a\u0bb0\u0bbf",
            Cancel: "\u0bb0\u0ba4\u0bcd\u0ba4\u0bc1"
        },
        it: {
            confirmTranslation: "Traduciamo questa pagina <br /> utilizzando Google Translator",
            autoDetectTranslation: "Vuoi tradurre questa pagina in italiano <br /> utilizzando Google Translator?",
            OK: "OK",
            Cancel: "Annulla"
        },
        "zh-CN": {
            confirmTranslation: "\u6211\u4eec\u5c06\u4f7f\u7528Google\u7ffb\u8bd1\u5668\u7ffb\u8bd1\u672c\u9875",
            autoDetectTranslation: "\u60a8\u8981\u4f7f\u7528Google Translator\u5c06\u6b64\u9875\u9762\u7ffb\u8bd1\u6210\u4e2d\u6587\uff08\u7b80\u4f53\uff09<br />\u5417\uff1f",
            OK: "\u597d",
            Cancel: "\u53d6\u6d88"
        },
        "zh-TW": {
            confirmTranslation: "\u6211\u5011\u8981\u7ffb\u8b6f\u9019\u500b\u9801\u9762<br /> Google\u7ffb\u8b6f\u5668\u4f7f\u7528",
            autoDetectTranslation: "\u60a8\u8981\u5c07\u6b64\u9801\u9762\u7ffb\u8b6f\u6210<br /> <br /> Google\u7ffb\u8b6f\u5668\u55ce\uff1f",
            OK: "\u597d",
            Cancel: "\u53d6\u6d88"
        },
        ru: {
            confirmTranslation: "\u041c\u044b \u0441\u043e\u0431\u0438\u0440\u0430\u0435\u043c\u0441\u044f \u043f\u0435\u0440\u0435\u0432\u0435\u0441\u0442\u0438 \u044d\u0442\u0443 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e Google Translator?",
            autoDetectTranslation: "\u0412\u044b \u0445\u043e\u0442\u0438\u0442\u0435 \u043f\u0435\u0440\u0435\u0432\u0435\u0441\u0442\u0438 \u044d\u0442\u0443 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443 \u043d\u0430 \u0440\u0443\u0441\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e Google Translator?",
            OK: "\u041e\u041a",
            Cancel: "\u041e\u0442\u043c\u0435\u043d\u0430"
        },
        ja: {
            confirmTranslation: "Google Translator\u3092\u4f7f\u7528\u3057\u3066\u3053\u306e\u30da\u30fc\u30b8\u3092\u7ffb\u8a33\u3057\u307e\u3059",
            autoDetectTranslation: "Google Translator\u3092\u4f7f\u3063\u3066\u3053\u306e\u30da\u30fc\u30b8\u3092\u65e5\u672c\u8a9e\u306b\u7ffb\u8a33\u3057\u307e\u3059\u304b\uff1f",
            OK: "OK",
            Cancel: "\u30ad\u30e3\u30f3\u30bb\u30eb"
        },
        sw: {
            confirmTranslation: "Tutafsiri ukurasa huu <br /> kwa kutumia Google Translator",
            autoDetectTranslation: "Unataka kutafsiri ukurasa huu kwa swahili <br /> ukitumia Google Translator?",
            OK: "sawa",
            Cancel: "kufuta"
        },
        nl: {
            confirmTranslation: "We gaan deze pagina vertalen <br /> met behulp van Google Translator",
            autoDetectTranslation: "Wilt u deze pagina vertalen naar Nederlands <br /> met behulp van Google Translator?",
            OK: "OK",
            Cancel: "Annuleer"
        },
        iw: {
            confirmTranslation: "\u05d0\u05e0\u05d7\u05e0\u05d5 \u05d4\u05d5\u05dc\u05db\u05d9\u05dd \u05dc\u05ea\u05e8\u05d2\u05dd \u05d3\u05e3 \u05d6\u05d4 <br /> \u05d1\u05d0\u05de\u05e6\u05e2\u05d5\u05ea Google Translator",
            autoDetectTranslation: "\u05d4\u05d0\u05dd \u05d1\u05e8\u05e6\u05d5\u05e0\u05da \u05dc\u05ea\u05e8\u05d2\u05dd \u05d3\u05e3 \u05d6\u05d4 \u05dc\u05d0\u05e0\u05d2\u05dc\u05d9\u05ea <br /> \u05d1\u05d0\u05de\u05e6\u05e2\u05d5\u05ea Google Translator?",
            OK: "\u05d1\u05e1\u05d3\u05e8",
            Cancel: "\u05dc\u05b0\u05d1\u05b7\u05d8\u05b5\u05dc"
        },
        ar: {
            confirmTranslation: "\u0633\u0646\u0642\u0648\u0645 \u0628\u062a\u0631\u062c\u0645\u0629 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062d\u0629 <br /> \u0628\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0645\u062a\u0631\u062c\u0645 \u063a\u0648\u063a\u0644",
            autoDetectTranslation: "\u0647\u0644 \u062a\u0631\u064a\u062f \u062a\u0631\u062c\u0645\u0629 \u0647\u0630\u0647 \u0627\u0644\u0635\u0641\u062d\u0629 \u0625\u0644\u0649 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 <br /> \u0628\u0627\u0633\u062a\u062e\u062f\u0627\u0645 \u0645\u062a\u0631\u062c\u0645 \u063a\u0648\u063a\u0644\u061f",
            OK: "\u062d\u0633\u0646\u0627",
            Cancel: "\u0625\u0644\u063a\u0627\u0621"
        },
        fa: {
            confirmTranslation: "\u0645\u0627 \u0642\u0635\u062f \u062f\u0627\u0631\u06cc\u0645 \u0627\u06cc\u0646 \u0635\u0641\u062d\u0647 \u0631\u0627 \u062a\u0631\u062c\u0645\u0647 \u06a9\u0646\u06cc\u0645 <br /> \u0628\u0627 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0627\u0632 Google Translator",
            autoDetectTranslation: "\u0622\u06cc\u0627 \u0645\u06cc\u062e\u0648\u0627\u0647\u06cc\u062f \u0627\u06cc\u0646 \u0635\u0641\u062d\u0647 \u0631\u0627 \u0628\u0647 \u0627\u0646\u06af\u0644\u06cc\u0633\u06cc \u062a\u0631\u062c\u0645\u0647 \u06a9\u0646\u06cc\u062f <br /> \u0628\u0627 \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0627\u0632 Google Translator\u061f",
            OK: "\u062e\u0648\u0628",
            Cancel: "\u0644\u063a\u0648"
        },
        pt: {
            confirmTranslation: "Vamos traduzir esta p\u00e1gina <br /> usando Google Translator",
            autoDetectTranslation: "Voc\u00ea quer traduzir esta p\u00e1gina para o portugu\u00eas <br /> usando o Google Translator?",
            OK: "Est\u00e1 bem",
            Cancel: "Cancelar"
        },
        tr: {
            confirmTranslation: "Google Translator'\u0131 kullanarak bu sayfay\u0131 \u00e7evirece\u011fiz",
            autoDetectTranslation: "Bu sayfay\u0131 Google Translator kullanarak T\u00fcrk\u00e7e'ye \u00e7evirmek ister misiniz?",
            OK: "tamam",
            Cancel: "\u0130ptal etmek"
        },
        da: {
            confirmTranslation: "Vi skal overs\u00e6tte denne side <br /> ved hj\u00e6lp af Google Translator",
            autoDetectTranslation: "\u00d8nsker du at overs\u00e6tte denne side til dansk <br /> ved hj\u00e6lp af Google Translator?",
            OK: "Okay",
            Cancel: "Afbestille"
        },
        ko: {
            confirmTranslation: "Google \ubc88\uc5ed\uae30\ub97c \uc0ac\uc6a9\ud558\uc5ec\uc774 \ud398\uc774\uc9c0\ub97c \ubc88\uc5ed\ud569\ub2c8\ub2e4.",
            autoDetectTranslation: "Google Translator\ub97c \uc0ac\uc6a9\ud558\uc5ec\uc774 \ud398\uc774\uc9c0\ub97c \ud55c\uad6d\uc5b4\ub85c \ubc88\uc5ed \ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?",
            OK: "\uc2b9\uc778",
            Cancel: "\ucde8\uc18c"
        },
        sv: {
            confirmTranslation: "Vi kommer att \u00f6vers\u00e4tta den h\u00e4r sidan <br /> med hj\u00e4lp av Google Translator",
            autoDetectTranslation: "Vill du \u00f6vers\u00e4tta den h\u00e4r sidan till svenska <br /> med hj\u00e4lp av Google Translator?",
            OK: "OK",
            Cancel: "Annullera"
        },
        fi: {
            confirmTranslation: "Aion k\u00e4\u00e4nt\u00e4\u00e4 t\u00e4m\u00e4n sivun <br /> k\u00e4ytt\u00e4m\u00e4ll\u00e4 Google Translatoria",
            autoDetectTranslation: "Haluatko k\u00e4\u00e4nt\u00e4\u00e4 t\u00e4m\u00e4n sivun englanniksi <br /> k\u00e4ytt\u00e4m\u00e4ll\u00e4 Google Translatoria?",
            OK: "kunnossa",
            Cancel: "Peruuttaa"
        },
        id: {
            confirmTranslation: "Kami akan menerjemahkan halaman ini menggunakan Google Translator",
            autoDetectTranslation: "Apakah Anda ingin menerjemahkan halaman ini ke bahasa inggris menggunakan Google Translator?",
            OK: "baik",
            Cancel: "membatalkan"
        },
        ms: {
            confirmTranslation: "Kami akan menterjemahkan halaman ini <br /> menggunakan Google Translator",
            autoDetectTranslation: "Adakah anda mahu menterjemahkan laman ini ke bahasa inggeris menggunakan Penterjemah Google?",
            OK: "okey",
            Cancel: "batalkan"
        },
        tl: {
            confirmTranslation: "Kami ay pagpunta sa isalin ang pahinang ito <br /> gamit ang Google Translator",
            autoDetectTranslation: "Nais mo bang isalin ang pahinang ito sa ingles <br /> gamit ang Google Translator?",
            OK: "ok",
            Cancel: "kanselahin"
        },
        th: {
            confirmTranslation: "\u0e40\u0e23\u0e32\u0e08\u0e30\u0e41\u0e1b\u0e25\u0e2b\u0e19\u0e49\u0e32\u0e19\u0e35\u0e49 <br /> \u0e42\u0e14\u0e22\u0e43\u0e0a\u0e49 Google Translator",
            autoDetectTranslation: "\u0e04\u0e38\u0e13\u0e15\u0e49\u0e2d\u0e07\u0e01\u0e32\u0e23\u0e41\u0e1b\u0e25\u0e2b\u0e19\u0e49\u0e32\u0e19\u0e35\u0e49\u0e40\u0e1b\u0e47\u0e19\u0e20\u0e32\u0e29\u0e32\u0e2d\u0e31\u0e07\u0e01\u0e24\u0e29 <br /> \u0e42\u0e14\u0e22\u0e43\u0e0a\u0e49 Google Translator?",
            OK: "\u0e15\u0e01\u0e25\u0e07",
            Cancel: "\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01"
        },
        vi: {
            confirmTranslation: "Ch\u00fang t\u00f4i s\u1ebd d\u1ecbch trang n\u00e0y <br /> b\u1eb1ng c\u00e1ch s\u1eed d\u1ee5ng Google Translator",
            autoDetectTranslation: "B\u1ea1n c\u00f3 mu\u1ed1n d\u1ecbch trang n\u00e0y sang ti\u1ebfng Vi\u1ec7t <br /> b\u1eb1ng Google Translator?",
            OK: "\u0111\u01b0\u1ee3c",
            Cancel: "H\u1ee7y"
        }
    }, g = function () {
        $(".bottom-pane").hasClass("visible") ? b.triggerEvent("pageHeader", "page-change", {action: "logout_click"}) :
            k("", {action: "logout_click"})
    }, x = function () {
        var a = $(this), b = e.getParameterByName("partner");
        window.location = (b ? "http://" + b : "") + window.contextPath + a.data("planUrl")
    }, E = function () {
        var a = $("#myPlans"), c = $("#plan"), d;
        c.length && (d = c.data("planId"));
        var e = '<img class="progress-indicator" src="' + window.ajaxLoaderPath + '" alt="loading">', f = !1;
        a.qtip({
            overwrite: !0,
            content: {
                text: function (b, c) {
                    if (f) return e;
                    f = !0;
                    $.ajax({url: a.data("dropdownUrl"), data: {planId: d}, cache: !1}).then(function (a) {
                        a = $(a);
                        a.find(".plan-row").each(function () {
                            var a =
                                t.utc($(this).find(".last-updated").data("update"));
                            $(this).find(".last-updated").text("Last Updated : " + a.fromNow())
                        });
                        c.set("content.text", a);
                        f = !1
                    }, function () {
                    });
                    return e
                }
            },
            position: {
                my: "top center",
                at: "bottom center",
                container: $("#pageHeader"),
                adjust: {y: -12},
                effect: !1
            },
            show: {event: "mouseenter", delay: 0},
            hide: {event: "mouseleave", fixed: !0, delay: 100},
            events: {
                show: function (c, d) {
                    $("#currency").qtip() && $("#currency").qtip().hide();
                    a.addClass("active");
                    0 === d.elements.content.siblings(".qtip-fillerDiv").length &&
                    $('<div class="qtip-fillerDiv"></div>').insertBefore(d.elements.content);
                    d.elements.content.off("click.myplan").on("click.myplan", ".plan-row", function () {
                        var a = $(this);
                        $(".bottom-pane").hasClass("visible") ? b.triggerEvent("pageHeader", "page-change", {
                            action: "planRow_click",
                            $this: a
                        }) : k("", {action: "planRow_click", $this: a})
                    });
                    d.elements.content.off("click.all-plans").on("click.all-plans", ".all-plans", function (a) {
                        a.preventDefault();
                        a = $(this);
                        $(".bottom-pane").hasClass("visible") ? b.triggerEvent("pageHeader",
                            "page-change", {
                                action: "allPlans_click",
                                url: a.find("a").attr("href")
                            }) : k("", {action: "allPlans_click", url: a.find("a").attr("href")})
                    })
                }, hide: function () {
                    a.removeClass("active")
                }
            },
            style: {
                classes: "myplans-dropdown qtip-light qtip-shadow",
                tip: {corner: !0, width: 20, height: 10, offset: 65}
            }
        })
    }, F = function (a, b) {
        var c = $("#myPlans");
        c.length && (b && b.numPlans && c.find("a span").text("My plans (" + b.numPlans + ")"), c.data("qtip") && c.data("qtip").destroy(), E())
    }, H = function (a, b) {
        $("#userOptions").removeClass("hidden");
        $("#userOptions .name").text(b.name);
        $("#userLogin").addClass("hidden");
        j()
    };
    l.initialize = function () {
        function g() {
            if (10 !== r) {
                r++;
                var a = $("#google_translate_element").find("select.goog-te-combo");
                if (a.length) {
                    var b = e.getCookie("language");
                    b ? (n(b), a.val() !== b && setTimeout(g, 200)) : (a = $("#language").data("browserLangCode"), b = $("#language").data("browserLangName"), "en" !== a && f[a] && v(a, b, f[a].autoDetectTranslation))
                } else setTimeout(g, 200)
            }
        }

        $("#pageHeader");
        c = $("#pageHeader");
        q = $("#planListHeader");
        E();
        j();
        var l = $("#currency");
        l.qtip({
            overwrite: !0,
            content: {
                text: function (a, b) {
                    $.ajax({url: l.data("dropdownUrl"), cache: !1}).then(function (a) {
                        a = $(a);
                        b.set("content.text", a)
                    }, function () {
                    });
                    return '<img class="progress-indicator" src="' + window.ajaxLoaderPath + '" alt="loading">'
                }
            },
            position: {
                my: "top center",
                at: "bottom center",
                container: $("#pageHeader"),
                adjust: {y: -12},
                effect: !1
            },
            show: {event: "click", delay: 0},
            hide: {event: "unfocus", fixed: !0, delay: 100},
            events: {
                show: function (a, c) {
                    l.addClass("active");
                    0 === c.elements.content.siblings(".qtip-fillerDiv").length &&
                    $('<div class="qtip-fillerDiv"></div>').insertBefore(c.elements.content);
                    c.elements.content.off("click.currencyOption").on("click.currencyOption", ".currencyOption", function () {
                        var a = $(this).find(".symbol").text(), c = $(this).data("currencyCode");
                        l.find(".selected-currency").html(a);
                        c && (b.triggerEvent("header", "australia_track_nav_link", {
                            linkText: "Currency",
                            position: "top"
                        }), d.makeAJAXcall({
                            type: "GET", url: "/saveCurrency/" + c, success: function () {
                                window.location.reload()
                            }
                        }), h.trackEvent(i.CAT_HEADER, i.ACT_CHANGE_CURRENCY,
                            c))
                    })
                }, hide: function () {
                    l.removeClass("active")
                }
            },
            style: {
                classes: "currency-dropdown qtip-light qtip-shadow",
                tip: {corner: !0, width: 20, height: 10, offset: 350}
            }
        });
        var m = $("#language");
        m.qtip({
            overwrite: !0,
            content: {
                text: function (a, c) {
                    $.ajax({url: m.data("dropdownUrl"), cache: !1}).then(function (a) {
                        a = $(a);
                        c.set("content.text", a);
                        a = e.getCookie("language") || "en";
                        c.elements.content.find('li .languageOption[data-language-code="' + a + '"]').parents("li").addClass("active");
                        c.elements.content.find("li .languageOption").off("click.languageOption").on("click.languageOption",
                            function () {
                                var a = $(this).data("languageCode"), d = $(this).find(".displayName").text();
                                c.hide();
                                h.trackEvent(i.CAT_HEADER, i.ACT_CHANGE_LANGUAGE, a);
                                b.triggerEvent("header", "australia_track_nav_link", {
                                    linkText: "Language",
                                    position: "top"
                                });
                                v(a, d, f[a].confirmTranslation)
                            })
                    }, function () {
                    });
                    return '<img class="progress-indicator" src="' + window.ajaxLoaderPath + '" alt="loading">'
                }
            },
            position: {my: "top right", at: "bottom right", container: $("#pageHeader"), adjust: {y: -12}, effect: !1},
            show: {event: "click", delay: 0},
            hide: {
                event: "unfocus",
                fixed: !0, delay: 100
            },
            events: {
                show: function (a, b) {
                    m.addClass("active");
                    0 === b.elements.content.siblings(".qtip-fillerDiv").length && $('<div class="qtip-fillerDiv"></div>').insertBefore(b.elements.content);
                    m.find(".dropdown").addClass("open")
                }, hide: function () {
                    m.removeClass("active");
                    m.find(".dropdown").removeClass("open")
                }
            },
            style: {
                classes: "language-dropdown qtip-light qtip-shadow notranslate",
                tip: {corner: !0, width: 20, height: 10, mimic: "center top", offset: 120}
            }
        });
        if (!e.getCookie("cookiepolicy")) $("#cookie-policy").off("click.close").on("click.close",
            ".close", function () {
                $("#cookie-policy").remove();
                $("#pageHeader").removeClass("with-cookie");
                e.addCookie("cookiepolicy", (new Date).getTime(), 365)
            });
        $("header").off("click.newplan").on("click.newplan", "#headerstartplanning button.cta-button", function () {
            var c = $("#pageContent").find(".destination-feature .interests"), d = c.find(".outdoors").data("value"),
                e = c.find(".culture").data("value"), f = c.find(".unwind").data("value"),
                g = c.find(".romantic").data("value"), h = c.find(".kids").data("value"), i = [];
            c.find(".categoryGroupNames").each(function () {
                i.push($(this).data("value"))
            });
            b.triggerEvent("header", "australia_track_nav_link", {linkText: "New Plan", position: "top"});
            a.showPlanFormDialog({
                analyticsCategoryPrefix: "home.header.startplanning",
                outdoors: d,
                culture: e,
                unwind: f,
                romantic: g,
                kids: h,
                categoryGroupNames: i,
                destinationIds: $("#pageContent").find(".destination-details").data("destinationId")
            })
        });
        c.off("mouseenter.help-tips").on("mouseenter.help-tips", "#help-container", s);
        b.addObservers("stay-add stay-remove stay-update plan-add plan-delete plan-update planname-update".split(" "),
            "header", F);
        b.addObservers(["login"], "header-login", H);
        $("#newplan").off("click").on("click", u);
        c.off("click.a").on("click.a", ".header-logo a,a.login-button", function (a) {
            $(this).hasClass("login-button") && b.triggerEvent("header", "australia_track_nav_link", {
                linkText: "Login",
                position: "top"
            });
            a.preventDefault();
            $(".bottom-pane").hasClass("visible") ? b.triggerEvent("planHeader", "page-change", {
                action: "page-header-click",
                url: $(this).attr("href")
            }) : k("", {action: "page-header-click", url: $(this).attr("href")})
        });
        b.addObserver("post-route-change", "pageHeader", k);
        q.length && (q.off("click.close").on("click.close", ".close", function () {
            q.remove();
            h.trackEvent(i.CAT_HEADER_MYPLANS_BAR, i.ACT_DISMISS_CLICK)
        }), q.find(".plan-count-text a").on("click", function (a) {
            var b = $(this);
            h.trackEvent(i.CAT_HEADER_MYPLANS_BAR, "view-plans-click", null, function () {
                window.location.href = b.attr("href")
            });
            a.preventDefault()
        }));
        var r = 0;
        setTimeout(g, 100);
        $("footer.page-footer").off("click.link").on("click.link", "a", function () {
            b.triggerEvent("footer",
                "australia_track_nav_link", {linkText: $(this).text(), position: "bottom"})
        });
        $(".page-header #australiaFlashNotification").off("click.close").on("click.close", function () {
            $(this).addClass("hide-flash");
            e.addCookie("australiaFlashMessageDisabled", !0, 365)
        })
    };
    return l
});
define("__optHeader", [], function () {
});

require(["jquery", "jqueryui"], function () {
    $.widget("ui.dialog", $.ui.dialog, {
        _create: function () {
            this.options.closeText = "";
            setTimeout(function () {
                $("body").addClass("dummy").removeClass("dummy")
            }, 1);
            return this._super()
        }, _title: function (a) {
            this.options.title ? a.html(this.options.title) : a.html("&#160;")
        }
    })
});
define("jqueryuioverrides", function () {
});
define("__optjqueryuioverrides", function () {
});

define("modules/intentmedia", ["modules/analytics", "modules/ajax"], function (j, h) {
    var c = {
        setIntentMediaProperties: function (c, a, d, e, b, f) {
            window.IntentMediaProperties && (IntentMediaProperties.hotel_city = c, IntentMediaProperties.hotel_state = a, IntentMediaProperties.hotel_country = d, IntentMediaProperties.travel_date_start = e, IntentMediaProperties.travel_date_end = b, IntentMediaProperties.travelers = f)
        }, isEnabled: function () {
            return window.IntentMedia
        }, triggerRefresh: function () {
            window.IntentMedia && IntentMedia.trigger &&
            IntentMedia.trigger("refresh")
        }, triggerOpenExitUnit: function (g, a, d, e, b, f) {
            window.IntentMedia && IntentMedia.trigger && (c.trackAdPossibility(), c.setIntentMediaProperties(g, a, d, e, b, f), IntentMedia.trigger("open_exit_unit"))
        }, triggerRedirectExitUnit: function (g, a, d, e, b, f) {
            window.IntentMedia && IntentMedia.trigger && (c.trackAdPossibility(), c.setIntentMediaProperties(g, a, d, e, b, f), IntentMedia.trigger("redirect_to_exit_unit"), fbq && fbq("track", "InitiateCheckout", {content_name: "intentmedia_display_redirect_exit_unit"}))
        },
        triggerFlightSearch: function (g, a, d, e, b, f, i) {
            window.IntentMedia && IntentMedia.trigger && (c.trackAdPossibility(), IntentMediaProperties.trip_type = a, IntentMediaProperties.flight_origin = d, IntentMediaProperties.flight_destination = e, IntentMediaProperties.travel_date_start = b.format("YYYYMMDD"), IntentMediaProperties.travel_date_end = "roundtrip" === a ? f.format("YYYYMMDD") : b.format("YYYYMMDD"), IntentMediaProperties.travelers = i, IntentMedia.trigger("open_SFC"))
        }, triggerCarSearch: function (g, a, d, e, b, f, i, h) {
            window.IntentMedia &&
            IntentMedia.trigger && (c.trackAdPossibility(), IntentMediaProperties.trip_type = a, IntentMediaProperties.car_pickup_location_type = "AIRPORT", IntentMediaProperties.car_pickup_airport = d, IntentMediaProperties.car_dropoff_location_type = "AIRPORT", IntentMediaProperties.car_dropoff_airport = e, IntentMediaProperties.travel_date_start = b.format("YYYYMMDD"), IntentMediaProperties.travel_date_end = i.format("YYYYMMDD"), IntentMediaProperties.car_pickup_time = f, IntentMediaProperties.car_dropoff_time = h, IntentMedia.trigger("open_SFC"))
        },
        trackAdPossibility: function () {
            h.makeAJAXcall({url: window.contextPath + "/trackIntentMediaAdPossibility", type: "GET"})
        }, delayedTrackAdPossibility: function () {
            window.setTimeout(c.trackAdPossibility, 4E4)
        }
    };
    return c
});
define("__optIntentMedia", [], function () {
});


define("common", function () {
});
