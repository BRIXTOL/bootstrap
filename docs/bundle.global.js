(() => {
  // ../../node_modules/.pnpm/relapse@0.3.2/node_modules/relapse/index.js
  function w(s) {
    return { on: (e, o) => {
      s[e] || (s[e] = []), s[e].push(o);
    }, off: (e, o) => {
      let f = [], i = s[e];
      if (i && o) {
        let n = 0, u = i.length;
        for (; n < u; n++)
          i[n] !== o && f.push(i[n]);
      }
      f.length ? i[e] = f : delete i[e];
    }, emit: (e, o, f) => {
      let i = s[e] || [], n = i.length, u = null;
      for (let b = 0; b < n; b++) {
        let m = i[b].apply(o, [f]);
        u === null && m === false && (u = true);
      }
      return u;
    } };
  }
  function L(s, c) {
    let { config: r } = s, { classes: t } = r;
    return (e) => {
      let o = (i) => {
        if (typeof i != "number")
          return s.active !== e.number && (s.active = e.number), e;
        if (s.folds[i])
          return s.active = e.number, s.folds[i];
        throw new TypeError(`No fold exists at index: ${i}`);
      }, f = (i) => {
        i.button.ariaDisabled = "false", i.button.ariaExpanded = "false", i.button.classList.remove(t.opened), i.content.classList.remove(t.expanded), i.expanded = false, i.content.style.maxHeight = "0";
      };
      e.open = (i) => {
        let n = o(i);
        n.expanded || (n.close(), n.button.ariaDisabled = "true", n.button.ariaExpanded = "true", n.button.classList.add(t.opened), n.content.classList.add(t.expanded), n.content.style.maxHeight = `${n.content.scrollHeight}px`, n.expanded = true, n.disable(), s.count = s.folds.filter(({ expanded: u }) => u).length, c.emit("expand", s, n));
      }, e.close = (i) => {
        let n = o(i);
        if (r.multiple)
          (!r.persist || r.persist && s.count > 1) && f(n);
        else
          for (let u of s.folds)
            if (u.expanded) {
              if (r.persist && u.number === n.number)
                break;
              f(u), n = u;
              break;
            }
        n.enable(), s.count = s.folds.filter(({ expanded: u }) => u).length, c.emit("collapse", s, n);
      }, e.focus = () => {
        s.active = e.number, e.button.classList.add(t.focused), c.emit("focus", s, e);
      }, e.blur = () => e.button.classList.remove(t.focused), e.enable = (i) => {
        let n = o(i);
        n.disabled && (n.disabled = false, n.button.ariaDisabled = "false", n.button.classList.remove(t.disabled));
      }, e.disable = (i) => {
        let n = o(i);
        n.disabled || (n.expanded ? r.persist && (n.disabled = true, n.button.ariaDisabled = "true") : (n.close(), n.disabled = true, n.button.ariaDisabled = "true", n.button.classList.add(t.disabled)));
      }, e.toggle = () => {
        if (!c.emit("toggle", s, e))
          return e.expanded ? e.close() : e.open();
      }, e.destroy = (i = false) => {
        e.close(), e.button.removeEventListener("click", e.toggle), e.button.removeEventListener("focus", e.focus), e.button.removeEventListener("blur", e.blur), i && (s.element.removeChild(e.content), s.element.removeChild(e.button));
      }, e.button.addEventListener("click", e.toggle), e.button.addEventListener("focus", e.focus), e.button.addEventListener("blur", e.blur), s.folds.push(e);
    };
  }
  var E = (s) => {
    let c = s.trim();
    if (!/true|false/.test(c))
      throw new TypeError(`Invalid value. Boolean expected, received: ${c}`);
    return c === "true";
  };
  var $ = (s, c) => {
    typeof s != "object" && (s = /* @__PURE__ */ Object.create(null));
    let r = /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
    t.initial = "initial", t.opened = "opened", t.disabled = "disabled", t.expanded = "expanded", t.focused = "focused", "classes" in s && Object.assign(t, s.classes), r.classes = t, r.persist = true, r.multiple = false, r.schema = "data-relapse", typeof s == "object" && Object.assign(r, s);
    let e = /^(?:persist|multiple)$/, o = r.schema === null ? 5 : r.schema.length + 1;
    for (let { nodeName: f, nodeValue: i } of c) {
      let n = f.slice(o);
      e.test(n) && (r[n] = E(i));
    }
    return r;
  };
  function g(s, c) {
    let r = typeof s == "string" ? document.body.querySelector(s) : s;
    if (!r)
      return;
    window.relapse instanceof Map || (window.relapse = /* @__PURE__ */ new Map());
    let t = /* @__PURE__ */ Object.create(null);
    t.folds = [], t.events = /* @__PURE__ */ Object.create(null), t.element = r, t.id = `A${window.relapse.size}`, t.count = 0, t.config = $(c, t.element.attributes);
    let e = t.element.getAttribute("data-relapse"), o = t.element.getAttribute("id");
    if (e === null && o === null)
      e = t.id;
    else if (e !== null && o !== null) {
      if (window.relapse.has(o) || window.relapse.has(e))
        throw new TypeError(`An existing instance is using id "${e}"`);
    } else
      e === null && o !== null && (e = o);
    if (window.relapse.has(e))
      throw new TypeError(`An existing instance is using id "${e}"`);
    t.element.ariaMultiSelectable = `${t.config.multiple}`;
    let f = t.element.children, i = f.length, n = w(t.events), u = L(t, n), { classes: b } = t.config;
    for (let d = 0; d < i; d = d + 2) {
      let a = f[d], p = f[d + 1], l = /* @__PURE__ */ Object.create(null);
      l.number = t.folds.length;
      let x = a.classList.contains(b.initial), y = a.classList.contains(b.opened), v = a.classList.contains(b.disabled), h = p.classList.contains(b.expanded);
      a.ariaExpanded === "true" || y || h || x ? (y ? a.ariaExpanded = "true" : a.classList.add(b.opened), h || p.classList.add(b.expanded), v || a.classList.add(b.disabled), x || a.classList.remove(b.initial), a.ariaDisabled = "true", l.expanded = true, l.disabled = true) : a.ariaDisabled === "true" || v ? (v ? a.ariaDisabled = "false" : a.classList.add(b.disabled), p.classList.remove(b.expanded), a.classList.remove(b.opened), a.ariaExpanded = "false", l.expanded = false, l.disabled = true) : (l.expanded = false, l.disabled = false, a.ariaExpanded = "false", a.ariaDisabled = "false"), a.id && (l.id = a.id), p.id && (l.id = p.id), "id" in l || (l.id = `${t.id}F${l.number}`, a.id = `B${l.id}`, p.id = `C${l.id}`), a.setAttribute("aria-controls", l.id), p.setAttribute("aria-labelledby", a.id), p.setAttribute("role", "region"), l.button = a, l.content = p, l.expanded && (t.count = t.count + 1, l.content.style.maxHeight = `${l.content.scrollHeight}px`), u(l);
    }
    let m = (d, a, p = false) => {
      if (typeof a == "number")
        return d.charCodeAt(0) === 100 ? t.folds[a][d](p) : t.folds[a][d]();
      if (typeof a == "string") {
        for (let l of t.folds)
          if (l.button.dataset[`${t.config.schema}-fold`] === a)
            return d.charCodeAt(0) === 100 ? l[d](p) : l[d]();
      }
      throw new TypeError(`Fold does not exist: "${a}"`);
    };
    return t.on = n.on, t.off = n.off, t.collapse = (d) => m("close", d), t.expand = (d) => m("open", d), t.destroy = (d, a = false) => {
      if (typeof d == "undefined")
        for (let p of t.folds)
          p.destroy();
      else
        m("destroy", d, a);
      t.element.removeAttribute("aria-multiselectable"), n.emit("destroy", t), window.relapse.delete(e);
    }, window.relapse.set(e, t), t;
  }
  g.get = (s) => s ? window.relapse.get(s) : window.relapse;
  g.load = () => {
    document.readyState === "loading" && setTimeout(g.load, 50);
    let s = document.querySelectorAll("[data-relapse]");
    for (let c of s)
      c.getAttribute("data-relapse") !== "" && g(c);
  };
  var O = g;

  // ../../node_modules/.pnpm/stickybits@3.7.11/node_modules/stickybits/dist/stickybits.es.js
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  var Stickybits = /* @__PURE__ */ function() {
    function Stickybits2(target, obj) {
      var _this = this;
      var o = typeof obj !== "undefined" ? obj : {};
      this.version = "3.7.11";
      this.userAgent = window.navigator.userAgent || "no `userAgent` provided by the browser";
      this.props = {
        customStickyChangeNumber: o.customStickyChangeNumber || null,
        noStyles: o.noStyles || false,
        stickyBitStickyOffset: o.stickyBitStickyOffset || 0,
        parentClass: o.parentClass || "js-stickybit-parent",
        scrollEl: typeof o.scrollEl === "string" ? document.querySelector(o.scrollEl) : o.scrollEl || window,
        stickyClass: o.stickyClass || "js-is-sticky",
        stuckClass: o.stuckClass || "js-is-stuck",
        stickyChangeClass: o.stickyChangeClass || "js-is-sticky--change",
        useStickyClasses: o.useStickyClasses || false,
        useFixed: o.useFixed || false,
        useGetBoundingClientRect: o.useGetBoundingClientRect || false,
        verticalPosition: o.verticalPosition || "top",
        applyStyle: o.applyStyle || function(item, style) {
          return _this.applyStyle(item, style);
        }
      };
      this.props.positionVal = this.definePosition() || "fixed";
      this.instances = [];
      var _this$props = this.props, positionVal = _this$props.positionVal, verticalPosition = _this$props.verticalPosition, noStyles = _this$props.noStyles, stickyBitStickyOffset = _this$props.stickyBitStickyOffset;
      var verticalPositionStyle = verticalPosition === "top" && !noStyles ? stickyBitStickyOffset + "px" : "";
      var positionStyle = positionVal !== "fixed" ? positionVal : "";
      this.els = typeof target === "string" ? document.querySelectorAll(target) : target;
      if (!("length" in this.els))
        this.els = [this.els];
      for (var i = 0; i < this.els.length; i++) {
        var _styles;
        var el = this.els[i];
        var instance = this.addInstance(el, this.props);
        this.props.applyStyle({
          styles: (_styles = {}, _styles[verticalPosition] = verticalPositionStyle, _styles.position = positionStyle, _styles),
          classes: {}
        }, instance);
        this.manageState(instance);
        this.instances.push(instance);
      }
    }
    var _proto = Stickybits2.prototype;
    _proto.definePosition = function definePosition() {
      var stickyProp;
      if (this.props.useFixed) {
        stickyProp = "fixed";
      } else {
        var prefix = ["", "-o-", "-webkit-", "-moz-", "-ms-"];
        var test = document.head.style;
        for (var i = 0; i < prefix.length; i += 1) {
          test.position = prefix[i] + "sticky";
        }
        stickyProp = test.position ? test.position : "fixed";
        test.position = "";
      }
      return stickyProp;
    };
    _proto.addInstance = function addInstance(el, props) {
      var _this2 = this;
      var item = {
        el,
        parent: el.parentNode,
        props
      };
      if (props.positionVal === "fixed" || props.useStickyClasses) {
        this.isWin = this.props.scrollEl === window;
        var se = this.isWin ? window : this.getClosestParent(item.el, item.props.scrollEl);
        this.computeScrollOffsets(item);
        this.toggleClasses(item.parent, "", props.parentClass);
        item.state = "default";
        item.stateChange = "default";
        item.stateContainer = function() {
          return _this2.manageState(item);
        };
        se.addEventListener("scroll", item.stateContainer);
      }
      return item;
    };
    _proto.getClosestParent = function getClosestParent(el, match) {
      var p = match;
      var e = el;
      if (e.parentElement === p)
        return p;
      while (e.parentElement !== p) {
        e = e.parentElement;
      }
      return p;
    };
    _proto.getTopPosition = function getTopPosition(el) {
      if (this.props.useGetBoundingClientRect) {
        return el.getBoundingClientRect().top + (this.props.scrollEl.pageYOffset || document.documentElement.scrollTop);
      }
      var topPosition = 0;
      do {
        topPosition = el.offsetTop + topPosition;
      } while (el = el.offsetParent);
      return topPosition;
    };
    _proto.computeScrollOffsets = function computeScrollOffsets(item) {
      var it = item;
      var p = it.props;
      var el = it.el;
      var parent = it.parent;
      var isCustom = !this.isWin && p.positionVal === "fixed";
      var isTop = p.verticalPosition !== "bottom";
      var scrollElOffset = isCustom ? this.getTopPosition(p.scrollEl) : 0;
      var stickyStart = isCustom ? this.getTopPosition(parent) - scrollElOffset : this.getTopPosition(parent);
      var stickyChangeOffset = p.customStickyChangeNumber !== null ? p.customStickyChangeNumber : el.offsetHeight;
      var parentBottom = stickyStart + parent.offsetHeight;
      it.offset = !isCustom ? scrollElOffset + p.stickyBitStickyOffset : 0;
      it.stickyStart = isTop ? stickyStart - it.offset : 0;
      it.stickyChange = it.stickyStart + stickyChangeOffset;
      it.stickyStop = isTop ? parentBottom - (el.offsetHeight + it.offset) : parentBottom - window.innerHeight;
    };
    _proto.toggleClasses = function toggleClasses(el, r, a) {
      var e = el;
      var cArray = e.className.split(" ");
      if (a && cArray.indexOf(a) === -1)
        cArray.push(a);
      var rItem = cArray.indexOf(r);
      if (rItem !== -1)
        cArray.splice(rItem, 1);
      e.className = cArray.join(" ");
    };
    _proto.manageState = function manageState(item) {
      var _this3 = this;
      var it = item;
      var p = it.props;
      var state = it.state;
      var stateChange = it.stateChange;
      var start = it.stickyStart;
      var change = it.stickyChange;
      var stop = it.stickyStop;
      var pv = p.positionVal;
      var se = p.scrollEl;
      var sticky = p.stickyClass;
      var stickyChange = p.stickyChangeClass;
      var stuck = p.stuckClass;
      var vp = p.verticalPosition;
      var isTop = vp !== "bottom";
      var aS = p.applyStyle;
      var ns = p.noStyles;
      var rAFStub = function rAFDummy(f) {
        f();
      };
      var rAF = !this.isWin ? rAFStub : window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || rAFStub;
      var scroll = this.isWin ? window.scrollY || window.pageYOffset : se.scrollTop;
      var notSticky = scroll > start && scroll < stop && (state === "default" || state === "stuck");
      var isSticky = isTop && scroll <= start && (state === "sticky" || state === "stuck");
      var isStuck = scroll >= stop && state === "sticky";
      if (notSticky) {
        it.state = "sticky";
      } else if (isSticky) {
        it.state = "default";
      } else if (isStuck) {
        it.state = "stuck";
      }
      var isStickyChange = scroll >= change && scroll <= stop;
      var isNotStickyChange = scroll < change / 2 || scroll > stop;
      if (isNotStickyChange) {
        it.stateChange = "default";
      } else if (isStickyChange) {
        it.stateChange = "sticky";
      }
      if (state === it.state && stateChange === it.stateChange)
        return;
      rAF(function() {
        var _styles2, _classes, _styles3, _extends2, _classes2, _style$classes;
        var stateStyles = {
          sticky: {
            styles: (_styles2 = {
              position: pv,
              top: "",
              bottom: ""
            }, _styles2[vp] = p.stickyBitStickyOffset + "px", _styles2),
            classes: (_classes = {}, _classes[sticky] = true, _classes)
          },
          default: {
            styles: (_styles3 = {}, _styles3[vp] = "", _styles3),
            classes: {}
          },
          stuck: {
            styles: _extends((_extends2 = {}, _extends2[vp] = "", _extends2), pv === "fixed" && !ns || !_this3.isWin ? {
              position: "absolute",
              top: "",
              bottom: "0"
            } : {}),
            classes: (_classes2 = {}, _classes2[stuck] = true, _classes2)
          }
        };
        if (pv === "fixed") {
          stateStyles.default.styles.position = "";
        }
        var style = stateStyles[it.state];
        style.classes = (_style$classes = {}, _style$classes[stuck] = !!style.classes[stuck], _style$classes[sticky] = !!style.classes[sticky], _style$classes[stickyChange] = isStickyChange, _style$classes);
        aS(style, item);
      });
    };
    _proto.applyStyle = function applyStyle(_ref, item) {
      var styles = _ref.styles, classes = _ref.classes;
      var it = item;
      var e = it.el;
      var p = it.props;
      var stl = e.style;
      var ns = p.noStyles;
      var cArray = e.className.split(" ");
      for (var cls in classes) {
        var addClass = classes[cls];
        if (addClass) {
          if (cArray.indexOf(cls) === -1)
            cArray.push(cls);
        } else {
          var idx = cArray.indexOf(cls);
          if (idx !== -1)
            cArray.splice(idx, 1);
        }
      }
      e.className = cArray.join(" ");
      if (styles["position"]) {
        stl["position"] = styles["position"];
      }
      if (ns)
        return;
      for (var key in styles) {
        stl[key] = styles[key];
      }
    };
    _proto.update = function update(updatedProps) {
      var _this4 = this;
      if (updatedProps === void 0) {
        updatedProps = null;
      }
      this.instances.forEach(function(instance) {
        _this4.computeScrollOffsets(instance);
        if (updatedProps) {
          for (var updatedProp in updatedProps) {
            instance.props[updatedProp] = updatedProps[updatedProp];
          }
        }
      });
      return this;
    };
    _proto.removeInstance = function removeInstance(instance) {
      var _styles4, _classes3;
      var e = instance.el;
      var p = instance.props;
      this.applyStyle({
        styles: (_styles4 = {
          position: ""
        }, _styles4[p.verticalPosition] = "", _styles4),
        classes: (_classes3 = {}, _classes3[p.stickyClass] = "", _classes3[p.stuckClass] = "", _classes3)
      }, instance);
      this.toggleClasses(e.parentNode, p.parentClass);
    };
    _proto.cleanup = function cleanup() {
      for (var i = 0; i < this.instances.length; i += 1) {
        var instance = this.instances[i];
        if (instance.stateContainer) {
          instance.props.scrollEl.removeEventListener("scroll", instance.stateContainer);
        }
        this.removeInstance(instance);
      }
      this.manageState = false;
      this.instances = [];
    };
    return Stickybits2;
  }();
  function stickybits(target, o) {
    return new Stickybits(target, o);
  }
  var stickybits_es_default = stickybits;

  // site/bundle.ts
  stickybits_es_default("#sidebar");
  O(".relapse", {
    persist: false
  });
})();
/**
  stickybits - Stickybits is a lightweight alternative to `position: sticky` polyfills
  @version v3.7.11
  @link https://github.com/yowainwright/stickybits#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (https://jeffry.in)
  @license MIT
**/
