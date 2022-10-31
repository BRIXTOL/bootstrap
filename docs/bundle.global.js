(() => {
  // ../../node_modules/.pnpm/relapse@0.5.0/node_modules/relapse/index.js
  function y(t2) {
    return { on: (e, i) => {
      t2[e] || (t2[e] = []), t2[e].push(i);
    }, off: (e, i) => {
      let c = [], n = t2[e];
      if (n && i) {
        let s = 0, u = n.length;
        for (; s < u; s++)
          n[s] !== i && c.push(n[s]);
      }
      c.length ? n[e] = c : delete n[e];
    }, emit: (e, i, c) => {
      let n = t2[e] || [], s = n.length, u = null;
      for (let m = 0; m < s; m++) {
        let p = n[m].apply(i, [c]);
        u === null && p === false && (u = true);
      }
      return u;
    } };
  }
  function E(t2, d) {
    let { config: l } = t2, { classes: f } = l;
    return (e) => {
      let i = (n) => {
        if (typeof n != "number")
          return t2.active !== e.index && (t2.active = e.index), e;
        if (t2.folds[n])
          return t2.active = e.index, t2.folds[n];
        throw new TypeError(`No fold exists at index: ${n}`);
      }, c = (n) => {
        n.button.ariaDisabled = "false", n.button.ariaExpanded = "false", n.button.classList.remove(f.opened), n.content.classList.remove(f.expanded), n.expanded = false, n.content.style.maxHeight = "0";
      };
      e.open = (n) => {
        let s = i(n);
        s.expanded || (s.close(), s.button.ariaDisabled = "true", s.button.ariaExpanded = "true", s.button.classList.add(f.opened), s.content.classList.add(f.expanded), s.content.style.maxHeight = `${s.content.scrollHeight}px`, s.expanded = true, s.disable(), t2.count = t2.folds.filter(({ expanded: u }) => u).length, d.emit("expand", t2, s));
      }, e.close = (n) => {
        let s = i(n);
        if (l.multiple)
          (!l.persist || l.persist && t2.count > 1) && c(s);
        else
          for (let u of t2.folds)
            if (u.expanded) {
              if (l.persist && u.index === s.index)
                break;
              c(u), s = u;
              break;
            }
        s.enable(), t2.count = t2.folds.filter(({ expanded: u }) => u).length, d.emit("collapse", t2, s);
      }, e.focus = () => {
        t2.active = e.index, e.button.classList.add(f.focused), d.emit("focus", t2, e);
      }, e.blur = () => e.button.classList.remove(f.focused), e.enable = (n) => {
        let s = i(n);
        s.disabled && (s.disabled = false, s.button.ariaDisabled = "false", s.button.classList.remove(f.disabled));
      }, e.disable = (n) => {
        let s = i(n);
        s.disabled || (s.expanded ? l.persist && (s.disabled = true, s.button.ariaDisabled = "true") : (s.close(), s.disabled = true, s.button.ariaDisabled = "true", s.button.classList.add(f.disabled)));
      }, e.toggle = () => {
        if (!d.emit("toggle", t2, e))
          return e.expanded ? e.close() : e.open();
      }, e.destroy = (n = false) => {
        e.close(), e.button.removeEventListener("click", e.toggle), e.button.removeEventListener("focus", e.focus), e.button.removeEventListener("blur", e.blur), n && (t2.element.removeChild(e.content), t2.element.removeChild(e.button));
      }, e.button.addEventListener("click", e.toggle), e.button.addEventListener("focus", e.focus), e.button.addEventListener("blur", e.blur), t2.folds.push(e);
    };
  }
  var $ = (t2) => {
    let d = t2.trim();
    if (!/true|false/.test(d))
      throw new TypeError(`Invalid value. Boolean expected, received: ${d}`);
    return d === "true";
  };
  var A = (t2, d) => {
    let l = /* @__PURE__ */ Object.create(null);
    if (l.classes = /* @__PURE__ */ Object.create(null), l.persist = true, l.multiple = false, l.schema = "data-relapse", l.classes.initial = "initial", l.classes.opened = "opened", l.classes.disabled = "disabled", l.classes.expanded = "expanded", l.classes.focused = "focused", typeof t2 == "object")
      for (let i in t2)
        if (i === "classes")
          for (let c in t2[i])
            l.classes[c] = t2[i][c];
        else
          l[i] = t2[i];
    let f = /^(?:persist|multiple)$/, e = l.schema === null ? 5 : l.schema.length + 1;
    for (let { nodeName: i, nodeValue: c } of d) {
      let n = i.slice(e);
      f.test(n) && (l[n] = $(c));
    }
    return l;
  };
  var w = function t(d, l) {
    let f;
    if (typeof d == "string")
      if (d.charCodeAt(0) === 35)
        f = document.body.querySelector(d);
      else
        for (let o of document.body.querySelectorAll(d))
          t(o, l);
    else if (d instanceof NodeList)
      for (let o of d)
        t(o, l);
    else
      d instanceof Element && (f = d);
    if (!f)
      return;
    window.relapse instanceof Map || (window.relapse = /* @__PURE__ */ new Map());
    let e = /* @__PURE__ */ Object.create(null);
    e.events = {}, e.folds = [], e.element = f, e.id = `A${window.relapse.size}`, e.count = 0, e.config = A(l, e.element.attributes);
    let i;
    e.element.hasAttribute("data-relapse") ? i = e.element.getAttribute("data-relapse") : (i = Math.random().toString(36).slice(2), e.element.setAttribute("data-relapse", i));
    let c = e.element.getAttribute("id");
    if (i === null && c === null)
      i = e.id;
    else if (i !== null && c !== null) {
      if (window.relapse.has(c) || window.relapse.has(i))
        throw new TypeError(`An existing instance is using id "${i}"`);
    } else
      i === null && c !== null && (i = c);
    if (window.relapse.has(i))
      throw new TypeError(`An existing instance is using id "${i}"`);
    e.element.ariaMultiSelectable = `${e.config.multiple}`;
    let n = e.element.children, s = n.length, u = y(e.events), m = E(e, u), { classes: p } = e.config;
    for (let o = 0; o < s; o = o + 2) {
      let a = n[o], b = n[o + 1], r = /* @__PURE__ */ Object.create(null);
      r.index = e.folds.length;
      let v = a.classList.contains(p.initial), h = a.classList.contains(p.opened), x = a.classList.contains(p.disabled), L = b.classList.contains(p.expanded);
      a.ariaExpanded === "true" || h || L || v ? (h ? a.ariaExpanded = "true" : a.classList.add(p.opened), L || b.classList.add(p.expanded), x || a.classList.add(p.disabled), v || a.classList.remove(p.initial), a.ariaDisabled = "true", r.expanded = true, r.disabled = true) : a.ariaDisabled === "true" || x ? (x ? a.ariaDisabled = "false" : a.classList.add(p.disabled), b.classList.remove(p.expanded), a.classList.remove(p.opened), a.ariaExpanded = "false", r.expanded = false, r.disabled = true) : (r.expanded = false, r.disabled = false, a.ariaExpanded = "false", a.ariaDisabled = "false"), a.id && (r.id = a.id), b.id && (r.id = b.id), "id" in r || (r.id = `${e.id}F${r.index}`, a.id = `B${r.id}`, b.id = `C${r.id}`), a.setAttribute("aria-controls", r.id), b.setAttribute("aria-labelledby", a.id), b.setAttribute("role", "region"), r.button = a, r.content = b, r.expanded && (e.count = e.count + 1, r.content.style.maxHeight = `${r.content.scrollHeight}px`), m(r);
    }
    let g = (o, a, b = false) => {
      if (typeof a == "number")
        return o.charCodeAt(0) === 100 ? e.folds[a][o](b) : e.folds[a][o]();
      if (typeof a == "string") {
        for (let r of e.folds)
          if (r.button.dataset[`${e.config.schema}-fold`] === a)
            return o.charCodeAt(0) === 100 ? r[o](b) : r[o]();
      }
      throw new TypeError(`Fold does not exist: "${a}"`);
    };
    return e.on = u.on, e.off = u.off, e.collapse = (o) => g("close", o), e.expand = (o) => g("open", o), e.destroy = (o, a = false) => {
      if (typeof o == "undefined")
        for (let b of e.folds)
          b.destroy();
      else
        g("destroy", o, a);
      e.element.removeAttribute("aria-multiselectable"), u.emit("destroy", e), window.relapse.delete(i);
    }, window.relapse.set(i, e), e;
  };
  w.get = (t2) => t2 ? window.relapse.get(t2) : window.relapse;
  var M = w;

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
  var sidebar = document.querySelector("#sidebar");
  var items = Array.from(sidebar.querySelectorAll("a")).map((a) => a.id.toLowerCase());
  var search = document.querySelector("#search-input");
  search.addEventListener("input", function(event) {
    const target = event.target;
    if (target.value) {
      console.log(target.value);
      const hash = items.filter((value) => {
        return value.indexOf(target.value) > -1;
      });
      const slug = "#" + hash[0].replace(" ", "-");
      const qs = document.querySelector(slug);
      console.log(qs, slug);
      if (qs) {
        qs.scrollIntoView({ block: "center" });
      }
    }
  });
  stickybits_es_default("#sidebar");
  stickybits_es_default("#search", {
    stuckClass: "mt-5 pt-5"
  });
  M(".relapse", {
    persist: true,
    multiple: true,
    classes: {
      opened: "is-opened"
    }
  });
  M("#content", {
    persist: true,
    multiple: true
  });
})();
/**
  stickybits - Stickybits is a lightweight alternative to `position: sticky` polyfills
  @version v3.7.11
  @link https://github.com/yowainwright/stickybits#readme
  @author Jeff Wainwright <yowainwright@gmail.com> (https://jeffry.in)
  @license MIT
**/
