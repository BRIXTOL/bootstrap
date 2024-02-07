(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // ../../node_modules/.pnpm/stickybits@3.7.11/node_modules/stickybits/dist/stickybits.es.js
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2];
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
      for (var i2 = 0; i2 < this.els.length; i2++) {
        var _styles;
        var el = this.els[i2];
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
        for (var i2 = 0; i2 < prefix.length; i2 += 1) {
          test.position = prefix[i2] + "sticky";
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
    _proto.toggleClasses = function toggleClasses(el, r, a2) {
      var e = el;
      var cArray = e.className.split(" ");
      if (a2 && cArray.indexOf(a2) === -1)
        cArray.push(a2);
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
      var rAFStub = function rAFDummy(f2) {
        f2();
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
      for (var i2 = 0; i2 < this.instances.length; i2 += 1) {
        var instance = this.instances[i2];
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

  // ../../node_modules/.pnpm/@hotwired+stimulus@3.2.2/node_modules/@hotwired/stimulus/dist/stimulus.js
  var EventListener = class {
    constructor(eventTarget, eventName, eventOptions) {
      this.eventTarget = eventTarget;
      this.eventName = eventName;
      this.eventOptions = eventOptions;
      this.unorderedBindings = /* @__PURE__ */ new Set();
    }
    connect() {
      this.eventTarget.addEventListener(this.eventName, this, this.eventOptions);
    }
    disconnect() {
      this.eventTarget.removeEventListener(this.eventName, this, this.eventOptions);
    }
    bindingConnected(binding) {
      this.unorderedBindings.add(binding);
    }
    bindingDisconnected(binding) {
      this.unorderedBindings.delete(binding);
    }
    handleEvent(event) {
      const extendedEvent = extendEvent(event);
      for (const binding of this.bindings) {
        if (extendedEvent.immediatePropagationStopped) {
          break;
        } else {
          binding.handleEvent(extendedEvent);
        }
      }
    }
    hasBindings() {
      return this.unorderedBindings.size > 0;
    }
    get bindings() {
      return Array.from(this.unorderedBindings).sort((left, right) => {
        const leftIndex = left.index, rightIndex = right.index;
        return leftIndex < rightIndex ? -1 : leftIndex > rightIndex ? 1 : 0;
      });
    }
  };
  function extendEvent(event) {
    if ("immediatePropagationStopped" in event) {
      return event;
    } else {
      const { stopImmediatePropagation } = event;
      return Object.assign(event, {
        immediatePropagationStopped: false,
        stopImmediatePropagation() {
          this.immediatePropagationStopped = true;
          stopImmediatePropagation.call(this);
        }
      });
    }
  }
  var Dispatcher = class {
    constructor(application) {
      this.application = application;
      this.eventListenerMaps = /* @__PURE__ */ new Map();
      this.started = false;
    }
    start() {
      if (!this.started) {
        this.started = true;
        this.eventListeners.forEach((eventListener) => eventListener.connect());
      }
    }
    stop() {
      if (this.started) {
        this.started = false;
        this.eventListeners.forEach((eventListener) => eventListener.disconnect());
      }
    }
    get eventListeners() {
      return Array.from(this.eventListenerMaps.values()).reduce((listeners, map) => listeners.concat(Array.from(map.values())), []);
    }
    bindingConnected(binding) {
      this.fetchEventListenerForBinding(binding).bindingConnected(binding);
    }
    bindingDisconnected(binding, clearEventListeners = false) {
      this.fetchEventListenerForBinding(binding).bindingDisconnected(binding);
      if (clearEventListeners)
        this.clearEventListenersForBinding(binding);
    }
    handleError(error2, message, detail = {}) {
      this.application.handleError(error2, `Error ${message}`, detail);
    }
    clearEventListenersForBinding(binding) {
      const eventListener = this.fetchEventListenerForBinding(binding);
      if (!eventListener.hasBindings()) {
        eventListener.disconnect();
        this.removeMappedEventListenerFor(binding);
      }
    }
    removeMappedEventListenerFor(binding) {
      const { eventTarget, eventName, eventOptions } = binding;
      const eventListenerMap = this.fetchEventListenerMapForEventTarget(eventTarget);
      const cacheKey = this.cacheKey(eventName, eventOptions);
      eventListenerMap.delete(cacheKey);
      if (eventListenerMap.size == 0)
        this.eventListenerMaps.delete(eventTarget);
    }
    fetchEventListenerForBinding(binding) {
      const { eventTarget, eventName, eventOptions } = binding;
      return this.fetchEventListener(eventTarget, eventName, eventOptions);
    }
    fetchEventListener(eventTarget, eventName, eventOptions) {
      const eventListenerMap = this.fetchEventListenerMapForEventTarget(eventTarget);
      const cacheKey = this.cacheKey(eventName, eventOptions);
      let eventListener = eventListenerMap.get(cacheKey);
      if (!eventListener) {
        eventListener = this.createEventListener(eventTarget, eventName, eventOptions);
        eventListenerMap.set(cacheKey, eventListener);
      }
      return eventListener;
    }
    createEventListener(eventTarget, eventName, eventOptions) {
      const eventListener = new EventListener(eventTarget, eventName, eventOptions);
      if (this.started) {
        eventListener.connect();
      }
      return eventListener;
    }
    fetchEventListenerMapForEventTarget(eventTarget) {
      let eventListenerMap = this.eventListenerMaps.get(eventTarget);
      if (!eventListenerMap) {
        eventListenerMap = /* @__PURE__ */ new Map();
        this.eventListenerMaps.set(eventTarget, eventListenerMap);
      }
      return eventListenerMap;
    }
    cacheKey(eventName, eventOptions) {
      const parts = [eventName];
      Object.keys(eventOptions).sort().forEach((key) => {
        parts.push(`${eventOptions[key] ? "" : "!"}${key}`);
      });
      return parts.join(":");
    }
  };
  var defaultActionDescriptorFilters = {
    stop({ event, value }) {
      if (value)
        event.stopPropagation();
      return true;
    },
    prevent({ event, value }) {
      if (value)
        event.preventDefault();
      return true;
    },
    self({ event, value, element }) {
      if (value) {
        return element === event.target;
      } else {
        return true;
      }
    }
  };
  var descriptorPattern = /^(?:(?:([^.]+?)\+)?(.+?)(?:\.(.+?))?(?:@(window|document))?->)?(.+?)(?:#([^:]+?))(?::(.+))?$/;
  function parseActionDescriptorString(descriptorString) {
    const source = descriptorString.trim();
    const matches = source.match(descriptorPattern) || [];
    let eventName = matches[2];
    let keyFilter = matches[3];
    if (keyFilter && !["keydown", "keyup", "keypress"].includes(eventName)) {
      eventName += `.${keyFilter}`;
      keyFilter = "";
    }
    return {
      eventTarget: parseEventTarget(matches[4]),
      eventName,
      eventOptions: matches[7] ? parseEventOptions(matches[7]) : {},
      identifier: matches[5],
      methodName: matches[6],
      keyFilter: matches[1] || keyFilter
    };
  }
  function parseEventTarget(eventTargetName) {
    if (eventTargetName == "window") {
      return window;
    } else if (eventTargetName == "document") {
      return document;
    }
  }
  function parseEventOptions(eventOptions) {
    return eventOptions.split(":").reduce((options, token) => Object.assign(options, { [token.replace(/^!/, "")]: !/^!/.test(token) }), {});
  }
  function stringifyEventTarget(eventTarget) {
    if (eventTarget == window) {
      return "window";
    } else if (eventTarget == document) {
      return "document";
    }
  }
  function camelize(value) {
    return value.replace(/(?:[_-])([a-z0-9])/g, (_, char) => char.toUpperCase());
  }
  function namespaceCamelize(value) {
    return camelize(value.replace(/--/g, "-").replace(/__/g, "_"));
  }
  function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  function dasherize(value) {
    return value.replace(/([A-Z])/g, (_, char) => `-${char.toLowerCase()}`);
  }
  function tokenize(value) {
    return value.match(/[^\s]+/g) || [];
  }
  function isSomething(object) {
    return object !== null && object !== void 0;
  }
  function hasProperty(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }
  var allModifiers = ["meta", "ctrl", "alt", "shift"];
  var Action = class {
    constructor(element, index, descriptor, schema) {
      this.element = element;
      this.index = index;
      this.eventTarget = descriptor.eventTarget || element;
      this.eventName = descriptor.eventName || getDefaultEventNameForElement(element) || error("missing event name");
      this.eventOptions = descriptor.eventOptions || {};
      this.identifier = descriptor.identifier || error("missing identifier");
      this.methodName = descriptor.methodName || error("missing method name");
      this.keyFilter = descriptor.keyFilter || "";
      this.schema = schema;
    }
    static forToken(token, schema) {
      return new this(token.element, token.index, parseActionDescriptorString(token.content), schema);
    }
    toString() {
      const eventFilter = this.keyFilter ? `.${this.keyFilter}` : "";
      const eventTarget = this.eventTargetName ? `@${this.eventTargetName}` : "";
      return `${this.eventName}${eventFilter}${eventTarget}->${this.identifier}#${this.methodName}`;
    }
    shouldIgnoreKeyboardEvent(event) {
      if (!this.keyFilter) {
        return false;
      }
      const filters = this.keyFilter.split("+");
      if (this.keyFilterDissatisfied(event, filters)) {
        return true;
      }
      const standardFilter = filters.filter((key) => !allModifiers.includes(key))[0];
      if (!standardFilter) {
        return false;
      }
      if (!hasProperty(this.keyMappings, standardFilter)) {
        error(`contains unknown key filter: ${this.keyFilter}`);
      }
      return this.keyMappings[standardFilter].toLowerCase() !== event.key.toLowerCase();
    }
    shouldIgnoreMouseEvent(event) {
      if (!this.keyFilter) {
        return false;
      }
      const filters = [this.keyFilter];
      if (this.keyFilterDissatisfied(event, filters)) {
        return true;
      }
      return false;
    }
    get params() {
      const params = {};
      const pattern = new RegExp(`^data-${this.identifier}-(.+)-param$`, "i");
      for (const { name, value } of Array.from(this.element.attributes)) {
        const match = name.match(pattern);
        const key = match && match[1];
        if (key) {
          params[camelize(key)] = typecast(value);
        }
      }
      return params;
    }
    get eventTargetName() {
      return stringifyEventTarget(this.eventTarget);
    }
    get keyMappings() {
      return this.schema.keyMappings;
    }
    keyFilterDissatisfied(event, filters) {
      const [meta, ctrl, alt, shift] = allModifiers.map((modifier) => filters.includes(modifier));
      return event.metaKey !== meta || event.ctrlKey !== ctrl || event.altKey !== alt || event.shiftKey !== shift;
    }
  };
  var defaultEventNames = {
    a: () => "click",
    button: () => "click",
    form: () => "submit",
    details: () => "toggle",
    input: (e) => e.getAttribute("type") == "submit" ? "click" : "input",
    select: () => "change",
    textarea: () => "input"
  };
  function getDefaultEventNameForElement(element) {
    const tagName = element.tagName.toLowerCase();
    if (tagName in defaultEventNames) {
      return defaultEventNames[tagName](element);
    }
  }
  function error(message) {
    throw new Error(message);
  }
  function typecast(value) {
    try {
      return JSON.parse(value);
    } catch (o_O) {
      return value;
    }
  }
  var Binding = class {
    constructor(context, action) {
      this.context = context;
      this.action = action;
    }
    get index() {
      return this.action.index;
    }
    get eventTarget() {
      return this.action.eventTarget;
    }
    get eventOptions() {
      return this.action.eventOptions;
    }
    get identifier() {
      return this.context.identifier;
    }
    handleEvent(event) {
      const actionEvent = this.prepareActionEvent(event);
      if (this.willBeInvokedByEvent(event) && this.applyEventModifiers(actionEvent)) {
        this.invokeWithEvent(actionEvent);
      }
    }
    get eventName() {
      return this.action.eventName;
    }
    get method() {
      const method = this.controller[this.methodName];
      if (typeof method == "function") {
        return method;
      }
      throw new Error(`Action "${this.action}" references undefined method "${this.methodName}"`);
    }
    applyEventModifiers(event) {
      const { element } = this.action;
      const { actionDescriptorFilters } = this.context.application;
      const { controller } = this.context;
      let passes = true;
      for (const [name, value] of Object.entries(this.eventOptions)) {
        if (name in actionDescriptorFilters) {
          const filter = actionDescriptorFilters[name];
          passes = passes && filter({ name, value, event, element, controller });
        } else {
          continue;
        }
      }
      return passes;
    }
    prepareActionEvent(event) {
      return Object.assign(event, { params: this.action.params });
    }
    invokeWithEvent(event) {
      const { target, currentTarget } = event;
      try {
        this.method.call(this.controller, event);
        this.context.logDebugActivity(this.methodName, { event, target, currentTarget, action: this.methodName });
      } catch (error2) {
        const { identifier, controller, element, index } = this;
        const detail = { identifier, controller, element, index, event };
        this.context.handleError(error2, `invoking action "${this.action}"`, detail);
      }
    }
    willBeInvokedByEvent(event) {
      const eventTarget = event.target;
      if (event instanceof KeyboardEvent && this.action.shouldIgnoreKeyboardEvent(event)) {
        return false;
      }
      if (event instanceof MouseEvent && this.action.shouldIgnoreMouseEvent(event)) {
        return false;
      }
      if (this.element === eventTarget) {
        return true;
      } else if (eventTarget instanceof Element && this.element.contains(eventTarget)) {
        return this.scope.containsElement(eventTarget);
      } else {
        return this.scope.containsElement(this.action.element);
      }
    }
    get controller() {
      return this.context.controller;
    }
    get methodName() {
      return this.action.methodName;
    }
    get element() {
      return this.scope.element;
    }
    get scope() {
      return this.context.scope;
    }
  };
  var ElementObserver = class {
    constructor(element, delegate) {
      this.mutationObserverInit = { attributes: true, childList: true, subtree: true };
      this.element = element;
      this.started = false;
      this.delegate = delegate;
      this.elements = /* @__PURE__ */ new Set();
      this.mutationObserver = new MutationObserver((mutations) => this.processMutations(mutations));
    }
    start() {
      if (!this.started) {
        this.started = true;
        this.mutationObserver.observe(this.element, this.mutationObserverInit);
        this.refresh();
      }
    }
    pause(callback) {
      if (this.started) {
        this.mutationObserver.disconnect();
        this.started = false;
      }
      callback();
      if (!this.started) {
        this.mutationObserver.observe(this.element, this.mutationObserverInit);
        this.started = true;
      }
    }
    stop() {
      if (this.started) {
        this.mutationObserver.takeRecords();
        this.mutationObserver.disconnect();
        this.started = false;
      }
    }
    refresh() {
      if (this.started) {
        const matches = new Set(this.matchElementsInTree());
        for (const element of Array.from(this.elements)) {
          if (!matches.has(element)) {
            this.removeElement(element);
          }
        }
        for (const element of Array.from(matches)) {
          this.addElement(element);
        }
      }
    }
    processMutations(mutations) {
      if (this.started) {
        for (const mutation of mutations) {
          this.processMutation(mutation);
        }
      }
    }
    processMutation(mutation) {
      if (mutation.type == "attributes") {
        this.processAttributeChange(mutation.target, mutation.attributeName);
      } else if (mutation.type == "childList") {
        this.processRemovedNodes(mutation.removedNodes);
        this.processAddedNodes(mutation.addedNodes);
      }
    }
    processAttributeChange(element, attributeName) {
      if (this.elements.has(element)) {
        if (this.delegate.elementAttributeChanged && this.matchElement(element)) {
          this.delegate.elementAttributeChanged(element, attributeName);
        } else {
          this.removeElement(element);
        }
      } else if (this.matchElement(element)) {
        this.addElement(element);
      }
    }
    processRemovedNodes(nodes) {
      for (const node of Array.from(nodes)) {
        const element = this.elementFromNode(node);
        if (element) {
          this.processTree(element, this.removeElement);
        }
      }
    }
    processAddedNodes(nodes) {
      for (const node of Array.from(nodes)) {
        const element = this.elementFromNode(node);
        if (element && this.elementIsActive(element)) {
          this.processTree(element, this.addElement);
        }
      }
    }
    matchElement(element) {
      return this.delegate.matchElement(element);
    }
    matchElementsInTree(tree = this.element) {
      return this.delegate.matchElementsInTree(tree);
    }
    processTree(tree, processor) {
      for (const element of this.matchElementsInTree(tree)) {
        processor.call(this, element);
      }
    }
    elementFromNode(node) {
      if (node.nodeType == Node.ELEMENT_NODE) {
        return node;
      }
    }
    elementIsActive(element) {
      if (element.isConnected != this.element.isConnected) {
        return false;
      } else {
        return this.element.contains(element);
      }
    }
    addElement(element) {
      if (!this.elements.has(element)) {
        if (this.elementIsActive(element)) {
          this.elements.add(element);
          if (this.delegate.elementMatched) {
            this.delegate.elementMatched(element);
          }
        }
      }
    }
    removeElement(element) {
      if (this.elements.has(element)) {
        this.elements.delete(element);
        if (this.delegate.elementUnmatched) {
          this.delegate.elementUnmatched(element);
        }
      }
    }
  };
  var AttributeObserver = class {
    constructor(element, attributeName, delegate) {
      this.attributeName = attributeName;
      this.delegate = delegate;
      this.elementObserver = new ElementObserver(element, this);
    }
    get element() {
      return this.elementObserver.element;
    }
    get selector() {
      return `[${this.attributeName}]`;
    }
    start() {
      this.elementObserver.start();
    }
    pause(callback) {
      this.elementObserver.pause(callback);
    }
    stop() {
      this.elementObserver.stop();
    }
    refresh() {
      this.elementObserver.refresh();
    }
    get started() {
      return this.elementObserver.started;
    }
    matchElement(element) {
      return element.hasAttribute(this.attributeName);
    }
    matchElementsInTree(tree) {
      const match = this.matchElement(tree) ? [tree] : [];
      const matches = Array.from(tree.querySelectorAll(this.selector));
      return match.concat(matches);
    }
    elementMatched(element) {
      if (this.delegate.elementMatchedAttribute) {
        this.delegate.elementMatchedAttribute(element, this.attributeName);
      }
    }
    elementUnmatched(element) {
      if (this.delegate.elementUnmatchedAttribute) {
        this.delegate.elementUnmatchedAttribute(element, this.attributeName);
      }
    }
    elementAttributeChanged(element, attributeName) {
      if (this.delegate.elementAttributeValueChanged && this.attributeName == attributeName) {
        this.delegate.elementAttributeValueChanged(element, attributeName);
      }
    }
  };
  function add(map, key, value) {
    fetch(map, key).add(value);
  }
  function del(map, key, value) {
    fetch(map, key).delete(value);
    prune(map, key);
  }
  function fetch(map, key) {
    let values = map.get(key);
    if (!values) {
      values = /* @__PURE__ */ new Set();
      map.set(key, values);
    }
    return values;
  }
  function prune(map, key) {
    const values = map.get(key);
    if (values != null && values.size == 0) {
      map.delete(key);
    }
  }
  var Multimap = class {
    constructor() {
      this.valuesByKey = /* @__PURE__ */ new Map();
    }
    get keys() {
      return Array.from(this.valuesByKey.keys());
    }
    get values() {
      const sets = Array.from(this.valuesByKey.values());
      return sets.reduce((values, set) => values.concat(Array.from(set)), []);
    }
    get size() {
      const sets = Array.from(this.valuesByKey.values());
      return sets.reduce((size, set) => size + set.size, 0);
    }
    add(key, value) {
      add(this.valuesByKey, key, value);
    }
    delete(key, value) {
      del(this.valuesByKey, key, value);
    }
    has(key, value) {
      const values = this.valuesByKey.get(key);
      return values != null && values.has(value);
    }
    hasKey(key) {
      return this.valuesByKey.has(key);
    }
    hasValue(value) {
      const sets = Array.from(this.valuesByKey.values());
      return sets.some((set) => set.has(value));
    }
    getValuesForKey(key) {
      const values = this.valuesByKey.get(key);
      return values ? Array.from(values) : [];
    }
    getKeysForValue(value) {
      return Array.from(this.valuesByKey).filter(([_key, values]) => values.has(value)).map(([key, _values]) => key);
    }
  };
  var SelectorObserver = class {
    constructor(element, selector, delegate, details) {
      this._selector = selector;
      this.details = details;
      this.elementObserver = new ElementObserver(element, this);
      this.delegate = delegate;
      this.matchesByElement = new Multimap();
    }
    get started() {
      return this.elementObserver.started;
    }
    get selector() {
      return this._selector;
    }
    set selector(selector) {
      this._selector = selector;
      this.refresh();
    }
    start() {
      this.elementObserver.start();
    }
    pause(callback) {
      this.elementObserver.pause(callback);
    }
    stop() {
      this.elementObserver.stop();
    }
    refresh() {
      this.elementObserver.refresh();
    }
    get element() {
      return this.elementObserver.element;
    }
    matchElement(element) {
      const { selector } = this;
      if (selector) {
        const matches = element.matches(selector);
        if (this.delegate.selectorMatchElement) {
          return matches && this.delegate.selectorMatchElement(element, this.details);
        }
        return matches;
      } else {
        return false;
      }
    }
    matchElementsInTree(tree) {
      const { selector } = this;
      if (selector) {
        const match = this.matchElement(tree) ? [tree] : [];
        const matches = Array.from(tree.querySelectorAll(selector)).filter((match2) => this.matchElement(match2));
        return match.concat(matches);
      } else {
        return [];
      }
    }
    elementMatched(element) {
      const { selector } = this;
      if (selector) {
        this.selectorMatched(element, selector);
      }
    }
    elementUnmatched(element) {
      const selectors = this.matchesByElement.getKeysForValue(element);
      for (const selector of selectors) {
        this.selectorUnmatched(element, selector);
      }
    }
    elementAttributeChanged(element, _attributeName) {
      const { selector } = this;
      if (selector) {
        const matches = this.matchElement(element);
        const matchedBefore = this.matchesByElement.has(selector, element);
        if (matches && !matchedBefore) {
          this.selectorMatched(element, selector);
        } else if (!matches && matchedBefore) {
          this.selectorUnmatched(element, selector);
        }
      }
    }
    selectorMatched(element, selector) {
      this.delegate.selectorMatched(element, selector, this.details);
      this.matchesByElement.add(selector, element);
    }
    selectorUnmatched(element, selector) {
      this.delegate.selectorUnmatched(element, selector, this.details);
      this.matchesByElement.delete(selector, element);
    }
  };
  var StringMapObserver = class {
    constructor(element, delegate) {
      this.element = element;
      this.delegate = delegate;
      this.started = false;
      this.stringMap = /* @__PURE__ */ new Map();
      this.mutationObserver = new MutationObserver((mutations) => this.processMutations(mutations));
    }
    start() {
      if (!this.started) {
        this.started = true;
        this.mutationObserver.observe(this.element, { attributes: true, attributeOldValue: true });
        this.refresh();
      }
    }
    stop() {
      if (this.started) {
        this.mutationObserver.takeRecords();
        this.mutationObserver.disconnect();
        this.started = false;
      }
    }
    refresh() {
      if (this.started) {
        for (const attributeName of this.knownAttributeNames) {
          this.refreshAttribute(attributeName, null);
        }
      }
    }
    processMutations(mutations) {
      if (this.started) {
        for (const mutation of mutations) {
          this.processMutation(mutation);
        }
      }
    }
    processMutation(mutation) {
      const attributeName = mutation.attributeName;
      if (attributeName) {
        this.refreshAttribute(attributeName, mutation.oldValue);
      }
    }
    refreshAttribute(attributeName, oldValue) {
      const key = this.delegate.getStringMapKeyForAttribute(attributeName);
      if (key != null) {
        if (!this.stringMap.has(attributeName)) {
          this.stringMapKeyAdded(key, attributeName);
        }
        const value = this.element.getAttribute(attributeName);
        if (this.stringMap.get(attributeName) != value) {
          this.stringMapValueChanged(value, key, oldValue);
        }
        if (value == null) {
          const oldValue2 = this.stringMap.get(attributeName);
          this.stringMap.delete(attributeName);
          if (oldValue2)
            this.stringMapKeyRemoved(key, attributeName, oldValue2);
        } else {
          this.stringMap.set(attributeName, value);
        }
      }
    }
    stringMapKeyAdded(key, attributeName) {
      if (this.delegate.stringMapKeyAdded) {
        this.delegate.stringMapKeyAdded(key, attributeName);
      }
    }
    stringMapValueChanged(value, key, oldValue) {
      if (this.delegate.stringMapValueChanged) {
        this.delegate.stringMapValueChanged(value, key, oldValue);
      }
    }
    stringMapKeyRemoved(key, attributeName, oldValue) {
      if (this.delegate.stringMapKeyRemoved) {
        this.delegate.stringMapKeyRemoved(key, attributeName, oldValue);
      }
    }
    get knownAttributeNames() {
      return Array.from(new Set(this.currentAttributeNames.concat(this.recordedAttributeNames)));
    }
    get currentAttributeNames() {
      return Array.from(this.element.attributes).map((attribute) => attribute.name);
    }
    get recordedAttributeNames() {
      return Array.from(this.stringMap.keys());
    }
  };
  var TokenListObserver = class {
    constructor(element, attributeName, delegate) {
      this.attributeObserver = new AttributeObserver(element, attributeName, this);
      this.delegate = delegate;
      this.tokensByElement = new Multimap();
    }
    get started() {
      return this.attributeObserver.started;
    }
    start() {
      this.attributeObserver.start();
    }
    pause(callback) {
      this.attributeObserver.pause(callback);
    }
    stop() {
      this.attributeObserver.stop();
    }
    refresh() {
      this.attributeObserver.refresh();
    }
    get element() {
      return this.attributeObserver.element;
    }
    get attributeName() {
      return this.attributeObserver.attributeName;
    }
    elementMatchedAttribute(element) {
      this.tokensMatched(this.readTokensForElement(element));
    }
    elementAttributeValueChanged(element) {
      const [unmatchedTokens, matchedTokens] = this.refreshTokensForElement(element);
      this.tokensUnmatched(unmatchedTokens);
      this.tokensMatched(matchedTokens);
    }
    elementUnmatchedAttribute(element) {
      this.tokensUnmatched(this.tokensByElement.getValuesForKey(element));
    }
    tokensMatched(tokens) {
      tokens.forEach((token) => this.tokenMatched(token));
    }
    tokensUnmatched(tokens) {
      tokens.forEach((token) => this.tokenUnmatched(token));
    }
    tokenMatched(token) {
      this.delegate.tokenMatched(token);
      this.tokensByElement.add(token.element, token);
    }
    tokenUnmatched(token) {
      this.delegate.tokenUnmatched(token);
      this.tokensByElement.delete(token.element, token);
    }
    refreshTokensForElement(element) {
      const previousTokens = this.tokensByElement.getValuesForKey(element);
      const currentTokens = this.readTokensForElement(element);
      const firstDifferingIndex = zip(previousTokens, currentTokens).findIndex(([previousToken, currentToken]) => !tokensAreEqual(previousToken, currentToken));
      if (firstDifferingIndex == -1) {
        return [[], []];
      } else {
        return [previousTokens.slice(firstDifferingIndex), currentTokens.slice(firstDifferingIndex)];
      }
    }
    readTokensForElement(element) {
      const attributeName = this.attributeName;
      const tokenString = element.getAttribute(attributeName) || "";
      return parseTokenString(tokenString, element, attributeName);
    }
  };
  function parseTokenString(tokenString, element, attributeName) {
    return tokenString.trim().split(/\s+/).filter((content) => content.length).map((content, index) => ({ element, attributeName, content, index }));
  }
  function zip(left, right) {
    const length = Math.max(left.length, right.length);
    return Array.from({ length }, (_, index) => [left[index], right[index]]);
  }
  function tokensAreEqual(left, right) {
    return left && right && left.index == right.index && left.content == right.content;
  }
  var ValueListObserver = class {
    constructor(element, attributeName, delegate) {
      this.tokenListObserver = new TokenListObserver(element, attributeName, this);
      this.delegate = delegate;
      this.parseResultsByToken = /* @__PURE__ */ new WeakMap();
      this.valuesByTokenByElement = /* @__PURE__ */ new WeakMap();
    }
    get started() {
      return this.tokenListObserver.started;
    }
    start() {
      this.tokenListObserver.start();
    }
    stop() {
      this.tokenListObserver.stop();
    }
    refresh() {
      this.tokenListObserver.refresh();
    }
    get element() {
      return this.tokenListObserver.element;
    }
    get attributeName() {
      return this.tokenListObserver.attributeName;
    }
    tokenMatched(token) {
      const { element } = token;
      const { value } = this.fetchParseResultForToken(token);
      if (value) {
        this.fetchValuesByTokenForElement(element).set(token, value);
        this.delegate.elementMatchedValue(element, value);
      }
    }
    tokenUnmatched(token) {
      const { element } = token;
      const { value } = this.fetchParseResultForToken(token);
      if (value) {
        this.fetchValuesByTokenForElement(element).delete(token);
        this.delegate.elementUnmatchedValue(element, value);
      }
    }
    fetchParseResultForToken(token) {
      let parseResult = this.parseResultsByToken.get(token);
      if (!parseResult) {
        parseResult = this.parseToken(token);
        this.parseResultsByToken.set(token, parseResult);
      }
      return parseResult;
    }
    fetchValuesByTokenForElement(element) {
      let valuesByToken = this.valuesByTokenByElement.get(element);
      if (!valuesByToken) {
        valuesByToken = /* @__PURE__ */ new Map();
        this.valuesByTokenByElement.set(element, valuesByToken);
      }
      return valuesByToken;
    }
    parseToken(token) {
      try {
        const value = this.delegate.parseValueForToken(token);
        return { value };
      } catch (error2) {
        return { error: error2 };
      }
    }
  };
  var BindingObserver = class {
    constructor(context, delegate) {
      this.context = context;
      this.delegate = delegate;
      this.bindingsByAction = /* @__PURE__ */ new Map();
    }
    start() {
      if (!this.valueListObserver) {
        this.valueListObserver = new ValueListObserver(this.element, this.actionAttribute, this);
        this.valueListObserver.start();
      }
    }
    stop() {
      if (this.valueListObserver) {
        this.valueListObserver.stop();
        delete this.valueListObserver;
        this.disconnectAllActions();
      }
    }
    get element() {
      return this.context.element;
    }
    get identifier() {
      return this.context.identifier;
    }
    get actionAttribute() {
      return this.schema.actionAttribute;
    }
    get schema() {
      return this.context.schema;
    }
    get bindings() {
      return Array.from(this.bindingsByAction.values());
    }
    connectAction(action) {
      const binding = new Binding(this.context, action);
      this.bindingsByAction.set(action, binding);
      this.delegate.bindingConnected(binding);
    }
    disconnectAction(action) {
      const binding = this.bindingsByAction.get(action);
      if (binding) {
        this.bindingsByAction.delete(action);
        this.delegate.bindingDisconnected(binding);
      }
    }
    disconnectAllActions() {
      this.bindings.forEach((binding) => this.delegate.bindingDisconnected(binding, true));
      this.bindingsByAction.clear();
    }
    parseValueForToken(token) {
      const action = Action.forToken(token, this.schema);
      if (action.identifier == this.identifier) {
        return action;
      }
    }
    elementMatchedValue(element, action) {
      this.connectAction(action);
    }
    elementUnmatchedValue(element, action) {
      this.disconnectAction(action);
    }
  };
  var ValueObserver = class {
    constructor(context, receiver) {
      this.context = context;
      this.receiver = receiver;
      this.stringMapObserver = new StringMapObserver(this.element, this);
      this.valueDescriptorMap = this.controller.valueDescriptorMap;
    }
    start() {
      this.stringMapObserver.start();
      this.invokeChangedCallbacksForDefaultValues();
    }
    stop() {
      this.stringMapObserver.stop();
    }
    get element() {
      return this.context.element;
    }
    get controller() {
      return this.context.controller;
    }
    getStringMapKeyForAttribute(attributeName) {
      if (attributeName in this.valueDescriptorMap) {
        return this.valueDescriptorMap[attributeName].name;
      }
    }
    stringMapKeyAdded(key, attributeName) {
      const descriptor = this.valueDescriptorMap[attributeName];
      if (!this.hasValue(key)) {
        this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), descriptor.writer(descriptor.defaultValue));
      }
    }
    stringMapValueChanged(value, name, oldValue) {
      const descriptor = this.valueDescriptorNameMap[name];
      if (value === null)
        return;
      if (oldValue === null) {
        oldValue = descriptor.writer(descriptor.defaultValue);
      }
      this.invokeChangedCallback(name, value, oldValue);
    }
    stringMapKeyRemoved(key, attributeName, oldValue) {
      const descriptor = this.valueDescriptorNameMap[key];
      if (this.hasValue(key)) {
        this.invokeChangedCallback(key, descriptor.writer(this.receiver[key]), oldValue);
      } else {
        this.invokeChangedCallback(key, descriptor.writer(descriptor.defaultValue), oldValue);
      }
    }
    invokeChangedCallbacksForDefaultValues() {
      for (const { key, name, defaultValue, writer } of this.valueDescriptors) {
        if (defaultValue != void 0 && !this.controller.data.has(key)) {
          this.invokeChangedCallback(name, writer(defaultValue), void 0);
        }
      }
    }
    invokeChangedCallback(name, rawValue, rawOldValue) {
      const changedMethodName = `${name}Changed`;
      const changedMethod = this.receiver[changedMethodName];
      if (typeof changedMethod == "function") {
        const descriptor = this.valueDescriptorNameMap[name];
        try {
          const value = descriptor.reader(rawValue);
          let oldValue = rawOldValue;
          if (rawOldValue) {
            oldValue = descriptor.reader(rawOldValue);
          }
          changedMethod.call(this.receiver, value, oldValue);
        } catch (error2) {
          if (error2 instanceof TypeError) {
            error2.message = `Stimulus Value "${this.context.identifier}.${descriptor.name}" - ${error2.message}`;
          }
          throw error2;
        }
      }
    }
    get valueDescriptors() {
      const { valueDescriptorMap } = this;
      return Object.keys(valueDescriptorMap).map((key) => valueDescriptorMap[key]);
    }
    get valueDescriptorNameMap() {
      const descriptors = {};
      Object.keys(this.valueDescriptorMap).forEach((key) => {
        const descriptor = this.valueDescriptorMap[key];
        descriptors[descriptor.name] = descriptor;
      });
      return descriptors;
    }
    hasValue(attributeName) {
      const descriptor = this.valueDescriptorNameMap[attributeName];
      const hasMethodName = `has${capitalize(descriptor.name)}`;
      return this.receiver[hasMethodName];
    }
  };
  var TargetObserver = class {
    constructor(context, delegate) {
      this.context = context;
      this.delegate = delegate;
      this.targetsByName = new Multimap();
    }
    start() {
      if (!this.tokenListObserver) {
        this.tokenListObserver = new TokenListObserver(this.element, this.attributeName, this);
        this.tokenListObserver.start();
      }
    }
    stop() {
      if (this.tokenListObserver) {
        this.disconnectAllTargets();
        this.tokenListObserver.stop();
        delete this.tokenListObserver;
      }
    }
    tokenMatched({ element, content: name }) {
      if (this.scope.containsElement(element)) {
        this.connectTarget(element, name);
      }
    }
    tokenUnmatched({ element, content: name }) {
      this.disconnectTarget(element, name);
    }
    connectTarget(element, name) {
      var _a;
      if (!this.targetsByName.has(name, element)) {
        this.targetsByName.add(name, element);
        (_a = this.tokenListObserver) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.targetConnected(element, name));
      }
    }
    disconnectTarget(element, name) {
      var _a;
      if (this.targetsByName.has(name, element)) {
        this.targetsByName.delete(name, element);
        (_a = this.tokenListObserver) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.targetDisconnected(element, name));
      }
    }
    disconnectAllTargets() {
      for (const name of this.targetsByName.keys) {
        for (const element of this.targetsByName.getValuesForKey(name)) {
          this.disconnectTarget(element, name);
        }
      }
    }
    get attributeName() {
      return `data-${this.context.identifier}-target`;
    }
    get element() {
      return this.context.element;
    }
    get scope() {
      return this.context.scope;
    }
  };
  function readInheritableStaticArrayValues(constructor, propertyName) {
    const ancestors = getAncestorsForConstructor(constructor);
    return Array.from(ancestors.reduce((values, constructor2) => {
      getOwnStaticArrayValues(constructor2, propertyName).forEach((name) => values.add(name));
      return values;
    }, /* @__PURE__ */ new Set()));
  }
  function readInheritableStaticObjectPairs(constructor, propertyName) {
    const ancestors = getAncestorsForConstructor(constructor);
    return ancestors.reduce((pairs, constructor2) => {
      pairs.push(...getOwnStaticObjectPairs(constructor2, propertyName));
      return pairs;
    }, []);
  }
  function getAncestorsForConstructor(constructor) {
    const ancestors = [];
    while (constructor) {
      ancestors.push(constructor);
      constructor = Object.getPrototypeOf(constructor);
    }
    return ancestors.reverse();
  }
  function getOwnStaticArrayValues(constructor, propertyName) {
    const definition = constructor[propertyName];
    return Array.isArray(definition) ? definition : [];
  }
  function getOwnStaticObjectPairs(constructor, propertyName) {
    const definition = constructor[propertyName];
    return definition ? Object.keys(definition).map((key) => [key, definition[key]]) : [];
  }
  var OutletObserver = class {
    constructor(context, delegate) {
      this.started = false;
      this.context = context;
      this.delegate = delegate;
      this.outletsByName = new Multimap();
      this.outletElementsByName = new Multimap();
      this.selectorObserverMap = /* @__PURE__ */ new Map();
      this.attributeObserverMap = /* @__PURE__ */ new Map();
    }
    start() {
      if (!this.started) {
        this.outletDefinitions.forEach((outletName) => {
          this.setupSelectorObserverForOutlet(outletName);
          this.setupAttributeObserverForOutlet(outletName);
        });
        this.started = true;
        this.dependentContexts.forEach((context) => context.refresh());
      }
    }
    refresh() {
      this.selectorObserverMap.forEach((observer) => observer.refresh());
      this.attributeObserverMap.forEach((observer) => observer.refresh());
    }
    stop() {
      if (this.started) {
        this.started = false;
        this.disconnectAllOutlets();
        this.stopSelectorObservers();
        this.stopAttributeObservers();
      }
    }
    stopSelectorObservers() {
      if (this.selectorObserverMap.size > 0) {
        this.selectorObserverMap.forEach((observer) => observer.stop());
        this.selectorObserverMap.clear();
      }
    }
    stopAttributeObservers() {
      if (this.attributeObserverMap.size > 0) {
        this.attributeObserverMap.forEach((observer) => observer.stop());
        this.attributeObserverMap.clear();
      }
    }
    selectorMatched(element, _selector, { outletName }) {
      const outlet = this.getOutlet(element, outletName);
      if (outlet) {
        this.connectOutlet(outlet, element, outletName);
      }
    }
    selectorUnmatched(element, _selector, { outletName }) {
      const outlet = this.getOutletFromMap(element, outletName);
      if (outlet) {
        this.disconnectOutlet(outlet, element, outletName);
      }
    }
    selectorMatchElement(element, { outletName }) {
      const selector = this.selector(outletName);
      const hasOutlet = this.hasOutlet(element, outletName);
      const hasOutletController = element.matches(`[${this.schema.controllerAttribute}~=${outletName}]`);
      if (selector) {
        return hasOutlet && hasOutletController && element.matches(selector);
      } else {
        return false;
      }
    }
    elementMatchedAttribute(_element, attributeName) {
      const outletName = this.getOutletNameFromOutletAttributeName(attributeName);
      if (outletName) {
        this.updateSelectorObserverForOutlet(outletName);
      }
    }
    elementAttributeValueChanged(_element, attributeName) {
      const outletName = this.getOutletNameFromOutletAttributeName(attributeName);
      if (outletName) {
        this.updateSelectorObserverForOutlet(outletName);
      }
    }
    elementUnmatchedAttribute(_element, attributeName) {
      const outletName = this.getOutletNameFromOutletAttributeName(attributeName);
      if (outletName) {
        this.updateSelectorObserverForOutlet(outletName);
      }
    }
    connectOutlet(outlet, element, outletName) {
      var _a;
      if (!this.outletElementsByName.has(outletName, element)) {
        this.outletsByName.add(outletName, outlet);
        this.outletElementsByName.add(outletName, element);
        (_a = this.selectorObserverMap.get(outletName)) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.outletConnected(outlet, element, outletName));
      }
    }
    disconnectOutlet(outlet, element, outletName) {
      var _a;
      if (this.outletElementsByName.has(outletName, element)) {
        this.outletsByName.delete(outletName, outlet);
        this.outletElementsByName.delete(outletName, element);
        (_a = this.selectorObserverMap.get(outletName)) === null || _a === void 0 ? void 0 : _a.pause(() => this.delegate.outletDisconnected(outlet, element, outletName));
      }
    }
    disconnectAllOutlets() {
      for (const outletName of this.outletElementsByName.keys) {
        for (const element of this.outletElementsByName.getValuesForKey(outletName)) {
          for (const outlet of this.outletsByName.getValuesForKey(outletName)) {
            this.disconnectOutlet(outlet, element, outletName);
          }
        }
      }
    }
    updateSelectorObserverForOutlet(outletName) {
      const observer = this.selectorObserverMap.get(outletName);
      if (observer) {
        observer.selector = this.selector(outletName);
      }
    }
    setupSelectorObserverForOutlet(outletName) {
      const selector = this.selector(outletName);
      const selectorObserver = new SelectorObserver(document.body, selector, this, { outletName });
      this.selectorObserverMap.set(outletName, selectorObserver);
      selectorObserver.start();
    }
    setupAttributeObserverForOutlet(outletName) {
      const attributeName = this.attributeNameForOutletName(outletName);
      const attributeObserver = new AttributeObserver(this.scope.element, attributeName, this);
      this.attributeObserverMap.set(outletName, attributeObserver);
      attributeObserver.start();
    }
    selector(outletName) {
      return this.scope.outlets.getSelectorForOutletName(outletName);
    }
    attributeNameForOutletName(outletName) {
      return this.scope.schema.outletAttributeForScope(this.identifier, outletName);
    }
    getOutletNameFromOutletAttributeName(attributeName) {
      return this.outletDefinitions.find((outletName) => this.attributeNameForOutletName(outletName) === attributeName);
    }
    get outletDependencies() {
      const dependencies = new Multimap();
      this.router.modules.forEach((module) => {
        const constructor = module.definition.controllerConstructor;
        const outlets = readInheritableStaticArrayValues(constructor, "outlets");
        outlets.forEach((outlet) => dependencies.add(outlet, module.identifier));
      });
      return dependencies;
    }
    get outletDefinitions() {
      return this.outletDependencies.getKeysForValue(this.identifier);
    }
    get dependentControllerIdentifiers() {
      return this.outletDependencies.getValuesForKey(this.identifier);
    }
    get dependentContexts() {
      const identifiers = this.dependentControllerIdentifiers;
      return this.router.contexts.filter((context) => identifiers.includes(context.identifier));
    }
    hasOutlet(element, outletName) {
      return !!this.getOutlet(element, outletName) || !!this.getOutletFromMap(element, outletName);
    }
    getOutlet(element, outletName) {
      return this.application.getControllerForElementAndIdentifier(element, outletName);
    }
    getOutletFromMap(element, outletName) {
      return this.outletsByName.getValuesForKey(outletName).find((outlet) => outlet.element === element);
    }
    get scope() {
      return this.context.scope;
    }
    get schema() {
      return this.context.schema;
    }
    get identifier() {
      return this.context.identifier;
    }
    get application() {
      return this.context.application;
    }
    get router() {
      return this.application.router;
    }
  };
  var Context = class {
    constructor(module, scope) {
      this.logDebugActivity = (functionName, detail = {}) => {
        const { identifier, controller, element } = this;
        detail = Object.assign({ identifier, controller, element }, detail);
        this.application.logDebugActivity(this.identifier, functionName, detail);
      };
      this.module = module;
      this.scope = scope;
      this.controller = new module.controllerConstructor(this);
      this.bindingObserver = new BindingObserver(this, this.dispatcher);
      this.valueObserver = new ValueObserver(this, this.controller);
      this.targetObserver = new TargetObserver(this, this);
      this.outletObserver = new OutletObserver(this, this);
      try {
        this.controller.initialize();
        this.logDebugActivity("initialize");
      } catch (error2) {
        this.handleError(error2, "initializing controller");
      }
    }
    connect() {
      this.bindingObserver.start();
      this.valueObserver.start();
      this.targetObserver.start();
      this.outletObserver.start();
      try {
        this.controller.connect();
        this.logDebugActivity("connect");
      } catch (error2) {
        this.handleError(error2, "connecting controller");
      }
    }
    refresh() {
      this.outletObserver.refresh();
    }
    disconnect() {
      try {
        this.controller.disconnect();
        this.logDebugActivity("disconnect");
      } catch (error2) {
        this.handleError(error2, "disconnecting controller");
      }
      this.outletObserver.stop();
      this.targetObserver.stop();
      this.valueObserver.stop();
      this.bindingObserver.stop();
    }
    get application() {
      return this.module.application;
    }
    get identifier() {
      return this.module.identifier;
    }
    get schema() {
      return this.application.schema;
    }
    get dispatcher() {
      return this.application.dispatcher;
    }
    get element() {
      return this.scope.element;
    }
    get parentElement() {
      return this.element.parentElement;
    }
    handleError(error2, message, detail = {}) {
      const { identifier, controller, element } = this;
      detail = Object.assign({ identifier, controller, element }, detail);
      this.application.handleError(error2, `Error ${message}`, detail);
    }
    targetConnected(element, name) {
      this.invokeControllerMethod(`${name}TargetConnected`, element);
    }
    targetDisconnected(element, name) {
      this.invokeControllerMethod(`${name}TargetDisconnected`, element);
    }
    outletConnected(outlet, element, name) {
      this.invokeControllerMethod(`${namespaceCamelize(name)}OutletConnected`, outlet, element);
    }
    outletDisconnected(outlet, element, name) {
      this.invokeControllerMethod(`${namespaceCamelize(name)}OutletDisconnected`, outlet, element);
    }
    invokeControllerMethod(methodName, ...args) {
      const controller = this.controller;
      if (typeof controller[methodName] == "function") {
        controller[methodName](...args);
      }
    }
  };
  function bless(constructor) {
    return shadow(constructor, getBlessedProperties(constructor));
  }
  function shadow(constructor, properties) {
    const shadowConstructor = extend(constructor);
    const shadowProperties = getShadowProperties(constructor.prototype, properties);
    Object.defineProperties(shadowConstructor.prototype, shadowProperties);
    return shadowConstructor;
  }
  function getBlessedProperties(constructor) {
    const blessings = readInheritableStaticArrayValues(constructor, "blessings");
    return blessings.reduce((blessedProperties, blessing) => {
      const properties = blessing(constructor);
      for (const key in properties) {
        const descriptor = blessedProperties[key] || {};
        blessedProperties[key] = Object.assign(descriptor, properties[key]);
      }
      return blessedProperties;
    }, {});
  }
  function getShadowProperties(prototype, properties) {
    return getOwnKeys(properties).reduce((shadowProperties, key) => {
      const descriptor = getShadowedDescriptor(prototype, properties, key);
      if (descriptor) {
        Object.assign(shadowProperties, { [key]: descriptor });
      }
      return shadowProperties;
    }, {});
  }
  function getShadowedDescriptor(prototype, properties, key) {
    const shadowingDescriptor = Object.getOwnPropertyDescriptor(prototype, key);
    const shadowedByValue = shadowingDescriptor && "value" in shadowingDescriptor;
    if (!shadowedByValue) {
      const descriptor = Object.getOwnPropertyDescriptor(properties, key).value;
      if (shadowingDescriptor) {
        descriptor.get = shadowingDescriptor.get || descriptor.get;
        descriptor.set = shadowingDescriptor.set || descriptor.set;
      }
      return descriptor;
    }
  }
  var getOwnKeys = (() => {
    if (typeof Object.getOwnPropertySymbols == "function") {
      return (object) => [...Object.getOwnPropertyNames(object), ...Object.getOwnPropertySymbols(object)];
    } else {
      return Object.getOwnPropertyNames;
    }
  })();
  var extend = (() => {
    function extendWithReflect(constructor) {
      function extended() {
        return Reflect.construct(constructor, arguments, new.target);
      }
      extended.prototype = Object.create(constructor.prototype, {
        constructor: { value: extended }
      });
      Reflect.setPrototypeOf(extended, constructor);
      return extended;
    }
    function testReflectExtension() {
      const a2 = function() {
        this.a.call(this);
      };
      const b = extendWithReflect(a2);
      b.prototype.a = function() {
      };
      return new b();
    }
    try {
      testReflectExtension();
      return extendWithReflect;
    } catch (error2) {
      return (constructor) => class extended extends constructor {
      };
    }
  })();
  function blessDefinition(definition) {
    return {
      identifier: definition.identifier,
      controllerConstructor: bless(definition.controllerConstructor)
    };
  }
  var Module = class {
    constructor(application, definition) {
      this.application = application;
      this.definition = blessDefinition(definition);
      this.contextsByScope = /* @__PURE__ */ new WeakMap();
      this.connectedContexts = /* @__PURE__ */ new Set();
    }
    get identifier() {
      return this.definition.identifier;
    }
    get controllerConstructor() {
      return this.definition.controllerConstructor;
    }
    get contexts() {
      return Array.from(this.connectedContexts);
    }
    connectContextForScope(scope) {
      const context = this.fetchContextForScope(scope);
      this.connectedContexts.add(context);
      context.connect();
    }
    disconnectContextForScope(scope) {
      const context = this.contextsByScope.get(scope);
      if (context) {
        this.connectedContexts.delete(context);
        context.disconnect();
      }
    }
    fetchContextForScope(scope) {
      let context = this.contextsByScope.get(scope);
      if (!context) {
        context = new Context(this, scope);
        this.contextsByScope.set(scope, context);
      }
      return context;
    }
  };
  var ClassMap = class {
    constructor(scope) {
      this.scope = scope;
    }
    has(name) {
      return this.data.has(this.getDataKey(name));
    }
    get(name) {
      return this.getAll(name)[0];
    }
    getAll(name) {
      const tokenString = this.data.get(this.getDataKey(name)) || "";
      return tokenize(tokenString);
    }
    getAttributeName(name) {
      return this.data.getAttributeNameForKey(this.getDataKey(name));
    }
    getDataKey(name) {
      return `${name}-class`;
    }
    get data() {
      return this.scope.data;
    }
  };
  var DataMap = class {
    constructor(scope) {
      this.scope = scope;
    }
    get element() {
      return this.scope.element;
    }
    get identifier() {
      return this.scope.identifier;
    }
    get(key) {
      const name = this.getAttributeNameForKey(key);
      return this.element.getAttribute(name);
    }
    set(key, value) {
      const name = this.getAttributeNameForKey(key);
      this.element.setAttribute(name, value);
      return this.get(key);
    }
    has(key) {
      const name = this.getAttributeNameForKey(key);
      return this.element.hasAttribute(name);
    }
    delete(key) {
      if (this.has(key)) {
        const name = this.getAttributeNameForKey(key);
        this.element.removeAttribute(name);
        return true;
      } else {
        return false;
      }
    }
    getAttributeNameForKey(key) {
      return `data-${this.identifier}-${dasherize(key)}`;
    }
  };
  var Guide = class {
    constructor(logger) {
      this.warnedKeysByObject = /* @__PURE__ */ new WeakMap();
      this.logger = logger;
    }
    warn(object, key, message) {
      let warnedKeys = this.warnedKeysByObject.get(object);
      if (!warnedKeys) {
        warnedKeys = /* @__PURE__ */ new Set();
        this.warnedKeysByObject.set(object, warnedKeys);
      }
      if (!warnedKeys.has(key)) {
        warnedKeys.add(key);
        this.logger.warn(message, object);
      }
    }
  };
  function attributeValueContainsToken(attributeName, token) {
    return `[${attributeName}~="${token}"]`;
  }
  var TargetSet = class {
    constructor(scope) {
      this.scope = scope;
    }
    get element() {
      return this.scope.element;
    }
    get identifier() {
      return this.scope.identifier;
    }
    get schema() {
      return this.scope.schema;
    }
    has(targetName) {
      return this.find(targetName) != null;
    }
    find(...targetNames) {
      return targetNames.reduce((target, targetName) => target || this.findTarget(targetName) || this.findLegacyTarget(targetName), void 0);
    }
    findAll(...targetNames) {
      return targetNames.reduce((targets, targetName) => [
        ...targets,
        ...this.findAllTargets(targetName),
        ...this.findAllLegacyTargets(targetName)
      ], []);
    }
    findTarget(targetName) {
      const selector = this.getSelectorForTargetName(targetName);
      return this.scope.findElement(selector);
    }
    findAllTargets(targetName) {
      const selector = this.getSelectorForTargetName(targetName);
      return this.scope.findAllElements(selector);
    }
    getSelectorForTargetName(targetName) {
      const attributeName = this.schema.targetAttributeForScope(this.identifier);
      return attributeValueContainsToken(attributeName, targetName);
    }
    findLegacyTarget(targetName) {
      const selector = this.getLegacySelectorForTargetName(targetName);
      return this.deprecate(this.scope.findElement(selector), targetName);
    }
    findAllLegacyTargets(targetName) {
      const selector = this.getLegacySelectorForTargetName(targetName);
      return this.scope.findAllElements(selector).map((element) => this.deprecate(element, targetName));
    }
    getLegacySelectorForTargetName(targetName) {
      const targetDescriptor = `${this.identifier}.${targetName}`;
      return attributeValueContainsToken(this.schema.targetAttribute, targetDescriptor);
    }
    deprecate(element, targetName) {
      if (element) {
        const { identifier } = this;
        const attributeName = this.schema.targetAttribute;
        const revisedAttributeName = this.schema.targetAttributeForScope(identifier);
        this.guide.warn(element, `target:${targetName}`, `Please replace ${attributeName}="${identifier}.${targetName}" with ${revisedAttributeName}="${targetName}". The ${attributeName} attribute is deprecated and will be removed in a future version of Stimulus.`);
      }
      return element;
    }
    get guide() {
      return this.scope.guide;
    }
  };
  var OutletSet = class {
    constructor(scope, controllerElement) {
      this.scope = scope;
      this.controllerElement = controllerElement;
    }
    get element() {
      return this.scope.element;
    }
    get identifier() {
      return this.scope.identifier;
    }
    get schema() {
      return this.scope.schema;
    }
    has(outletName) {
      return this.find(outletName) != null;
    }
    find(...outletNames) {
      return outletNames.reduce((outlet, outletName) => outlet || this.findOutlet(outletName), void 0);
    }
    findAll(...outletNames) {
      return outletNames.reduce((outlets, outletName) => [...outlets, ...this.findAllOutlets(outletName)], []);
    }
    getSelectorForOutletName(outletName) {
      const attributeName = this.schema.outletAttributeForScope(this.identifier, outletName);
      return this.controllerElement.getAttribute(attributeName);
    }
    findOutlet(outletName) {
      const selector = this.getSelectorForOutletName(outletName);
      if (selector)
        return this.findElement(selector, outletName);
    }
    findAllOutlets(outletName) {
      const selector = this.getSelectorForOutletName(outletName);
      return selector ? this.findAllElements(selector, outletName) : [];
    }
    findElement(selector, outletName) {
      const elements = this.scope.queryElements(selector);
      return elements.filter((element) => this.matchesElement(element, selector, outletName))[0];
    }
    findAllElements(selector, outletName) {
      const elements = this.scope.queryElements(selector);
      return elements.filter((element) => this.matchesElement(element, selector, outletName));
    }
    matchesElement(element, selector, outletName) {
      const controllerAttribute = element.getAttribute(this.scope.schema.controllerAttribute) || "";
      return element.matches(selector) && controllerAttribute.split(" ").includes(outletName);
    }
  };
  var Scope = class _Scope {
    constructor(schema, element, identifier, logger) {
      this.targets = new TargetSet(this);
      this.classes = new ClassMap(this);
      this.data = new DataMap(this);
      this.containsElement = (element2) => {
        return element2.closest(this.controllerSelector) === this.element;
      };
      this.schema = schema;
      this.element = element;
      this.identifier = identifier;
      this.guide = new Guide(logger);
      this.outlets = new OutletSet(this.documentScope, element);
    }
    findElement(selector) {
      return this.element.matches(selector) ? this.element : this.queryElements(selector).find(this.containsElement);
    }
    findAllElements(selector) {
      return [
        ...this.element.matches(selector) ? [this.element] : [],
        ...this.queryElements(selector).filter(this.containsElement)
      ];
    }
    queryElements(selector) {
      return Array.from(this.element.querySelectorAll(selector));
    }
    get controllerSelector() {
      return attributeValueContainsToken(this.schema.controllerAttribute, this.identifier);
    }
    get isDocumentScope() {
      return this.element === document.documentElement;
    }
    get documentScope() {
      return this.isDocumentScope ? this : new _Scope(this.schema, document.documentElement, this.identifier, this.guide.logger);
    }
  };
  var ScopeObserver = class {
    constructor(element, schema, delegate) {
      this.element = element;
      this.schema = schema;
      this.delegate = delegate;
      this.valueListObserver = new ValueListObserver(this.element, this.controllerAttribute, this);
      this.scopesByIdentifierByElement = /* @__PURE__ */ new WeakMap();
      this.scopeReferenceCounts = /* @__PURE__ */ new WeakMap();
    }
    start() {
      this.valueListObserver.start();
    }
    stop() {
      this.valueListObserver.stop();
    }
    get controllerAttribute() {
      return this.schema.controllerAttribute;
    }
    parseValueForToken(token) {
      const { element, content: identifier } = token;
      return this.parseValueForElementAndIdentifier(element, identifier);
    }
    parseValueForElementAndIdentifier(element, identifier) {
      const scopesByIdentifier = this.fetchScopesByIdentifierForElement(element);
      let scope = scopesByIdentifier.get(identifier);
      if (!scope) {
        scope = this.delegate.createScopeForElementAndIdentifier(element, identifier);
        scopesByIdentifier.set(identifier, scope);
      }
      return scope;
    }
    elementMatchedValue(element, value) {
      const referenceCount = (this.scopeReferenceCounts.get(value) || 0) + 1;
      this.scopeReferenceCounts.set(value, referenceCount);
      if (referenceCount == 1) {
        this.delegate.scopeConnected(value);
      }
    }
    elementUnmatchedValue(element, value) {
      const referenceCount = this.scopeReferenceCounts.get(value);
      if (referenceCount) {
        this.scopeReferenceCounts.set(value, referenceCount - 1);
        if (referenceCount == 1) {
          this.delegate.scopeDisconnected(value);
        }
      }
    }
    fetchScopesByIdentifierForElement(element) {
      let scopesByIdentifier = this.scopesByIdentifierByElement.get(element);
      if (!scopesByIdentifier) {
        scopesByIdentifier = /* @__PURE__ */ new Map();
        this.scopesByIdentifierByElement.set(element, scopesByIdentifier);
      }
      return scopesByIdentifier;
    }
  };
  var Router = class {
    constructor(application) {
      this.application = application;
      this.scopeObserver = new ScopeObserver(this.element, this.schema, this);
      this.scopesByIdentifier = new Multimap();
      this.modulesByIdentifier = /* @__PURE__ */ new Map();
    }
    get element() {
      return this.application.element;
    }
    get schema() {
      return this.application.schema;
    }
    get logger() {
      return this.application.logger;
    }
    get controllerAttribute() {
      return this.schema.controllerAttribute;
    }
    get modules() {
      return Array.from(this.modulesByIdentifier.values());
    }
    get contexts() {
      return this.modules.reduce((contexts, module) => contexts.concat(module.contexts), []);
    }
    start() {
      this.scopeObserver.start();
    }
    stop() {
      this.scopeObserver.stop();
    }
    loadDefinition(definition) {
      this.unloadIdentifier(definition.identifier);
      const module = new Module(this.application, definition);
      this.connectModule(module);
      const afterLoad = definition.controllerConstructor.afterLoad;
      if (afterLoad) {
        afterLoad.call(definition.controllerConstructor, definition.identifier, this.application);
      }
    }
    unloadIdentifier(identifier) {
      const module = this.modulesByIdentifier.get(identifier);
      if (module) {
        this.disconnectModule(module);
      }
    }
    getContextForElementAndIdentifier(element, identifier) {
      const module = this.modulesByIdentifier.get(identifier);
      if (module) {
        return module.contexts.find((context) => context.element == element);
      }
    }
    proposeToConnectScopeForElementAndIdentifier(element, identifier) {
      const scope = this.scopeObserver.parseValueForElementAndIdentifier(element, identifier);
      if (scope) {
        this.scopeObserver.elementMatchedValue(scope.element, scope);
      } else {
        console.error(`Couldn't find or create scope for identifier: "${identifier}" and element:`, element);
      }
    }
    handleError(error2, message, detail) {
      this.application.handleError(error2, message, detail);
    }
    createScopeForElementAndIdentifier(element, identifier) {
      return new Scope(this.schema, element, identifier, this.logger);
    }
    scopeConnected(scope) {
      this.scopesByIdentifier.add(scope.identifier, scope);
      const module = this.modulesByIdentifier.get(scope.identifier);
      if (module) {
        module.connectContextForScope(scope);
      }
    }
    scopeDisconnected(scope) {
      this.scopesByIdentifier.delete(scope.identifier, scope);
      const module = this.modulesByIdentifier.get(scope.identifier);
      if (module) {
        module.disconnectContextForScope(scope);
      }
    }
    connectModule(module) {
      this.modulesByIdentifier.set(module.identifier, module);
      const scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
      scopes.forEach((scope) => module.connectContextForScope(scope));
    }
    disconnectModule(module) {
      this.modulesByIdentifier.delete(module.identifier);
      const scopes = this.scopesByIdentifier.getValuesForKey(module.identifier);
      scopes.forEach((scope) => module.disconnectContextForScope(scope));
    }
  };
  var defaultSchema = {
    controllerAttribute: "data-controller",
    actionAttribute: "data-action",
    targetAttribute: "data-target",
    targetAttributeForScope: (identifier) => `data-${identifier}-target`,
    outletAttributeForScope: (identifier, outlet) => `data-${identifier}-${outlet}-outlet`,
    keyMappings: Object.assign(Object.assign({ enter: "Enter", tab: "Tab", esc: "Escape", space: " ", up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight", home: "Home", end: "End", page_up: "PageUp", page_down: "PageDown" }, objectFromEntries("abcdefghijklmnopqrstuvwxyz".split("").map((c) => [c, c]))), objectFromEntries("0123456789".split("").map((n) => [n, n])))
  };
  function objectFromEntries(array) {
    return array.reduce((memo, [k, v]) => Object.assign(Object.assign({}, memo), { [k]: v }), {});
  }
  var Application = class {
    constructor(element = document.documentElement, schema = defaultSchema) {
      this.logger = console;
      this.debug = false;
      this.logDebugActivity = (identifier, functionName, detail = {}) => {
        if (this.debug) {
          this.logFormattedMessage(identifier, functionName, detail);
        }
      };
      this.element = element;
      this.schema = schema;
      this.dispatcher = new Dispatcher(this);
      this.router = new Router(this);
      this.actionDescriptorFilters = Object.assign({}, defaultActionDescriptorFilters);
    }
    static start(element, schema) {
      const application = new this(element, schema);
      application.start();
      return application;
    }
    start() {
      return __async(this, null, function* () {
        yield domReady();
        this.logDebugActivity("application", "starting");
        this.dispatcher.start();
        this.router.start();
        this.logDebugActivity("application", "start");
      });
    }
    stop() {
      this.logDebugActivity("application", "stopping");
      this.dispatcher.stop();
      this.router.stop();
      this.logDebugActivity("application", "stop");
    }
    register(identifier, controllerConstructor) {
      this.load({ identifier, controllerConstructor });
    }
    registerActionOption(name, filter) {
      this.actionDescriptorFilters[name] = filter;
    }
    load(head, ...rest) {
      const definitions = Array.isArray(head) ? head : [head, ...rest];
      definitions.forEach((definition) => {
        if (definition.controllerConstructor.shouldLoad) {
          this.router.loadDefinition(definition);
        }
      });
    }
    unload(head, ...rest) {
      const identifiers = Array.isArray(head) ? head : [head, ...rest];
      identifiers.forEach((identifier) => this.router.unloadIdentifier(identifier));
    }
    get controllers() {
      return this.router.contexts.map((context) => context.controller);
    }
    getControllerForElementAndIdentifier(element, identifier) {
      const context = this.router.getContextForElementAndIdentifier(element, identifier);
      return context ? context.controller : null;
    }
    handleError(error2, message, detail) {
      var _a;
      this.logger.error(`%s

%o

%o`, message, error2, detail);
      (_a = window.onerror) === null || _a === void 0 ? void 0 : _a.call(window, message, "", 0, 0, error2);
    }
    logFormattedMessage(identifier, functionName, detail = {}) {
      detail = Object.assign({ application: this }, detail);
      this.logger.groupCollapsed(`${identifier} #${functionName}`);
      this.logger.log("details:", Object.assign({}, detail));
      this.logger.groupEnd();
    }
  };
  function domReady() {
    return new Promise((resolve) => {
      if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded", () => resolve());
      } else {
        resolve();
      }
    });
  }
  function ClassPropertiesBlessing(constructor) {
    const classes = readInheritableStaticArrayValues(constructor, "classes");
    return classes.reduce((properties, classDefinition) => {
      return Object.assign(properties, propertiesForClassDefinition(classDefinition));
    }, {});
  }
  function propertiesForClassDefinition(key) {
    return {
      [`${key}Class`]: {
        get() {
          const { classes } = this;
          if (classes.has(key)) {
            return classes.get(key);
          } else {
            const attribute = classes.getAttributeName(key);
            throw new Error(`Missing attribute "${attribute}"`);
          }
        }
      },
      [`${key}Classes`]: {
        get() {
          return this.classes.getAll(key);
        }
      },
      [`has${capitalize(key)}Class`]: {
        get() {
          return this.classes.has(key);
        }
      }
    };
  }
  function OutletPropertiesBlessing(constructor) {
    const outlets = readInheritableStaticArrayValues(constructor, "outlets");
    return outlets.reduce((properties, outletDefinition) => {
      return Object.assign(properties, propertiesForOutletDefinition(outletDefinition));
    }, {});
  }
  function getOutletController(controller, element, identifier) {
    return controller.application.getControllerForElementAndIdentifier(element, identifier);
  }
  function getControllerAndEnsureConnectedScope(controller, element, outletName) {
    let outletController = getOutletController(controller, element, outletName);
    if (outletController)
      return outletController;
    controller.application.router.proposeToConnectScopeForElementAndIdentifier(element, outletName);
    outletController = getOutletController(controller, element, outletName);
    if (outletController)
      return outletController;
  }
  function propertiesForOutletDefinition(name) {
    const camelizedName = namespaceCamelize(name);
    return {
      [`${camelizedName}Outlet`]: {
        get() {
          const outletElement = this.outlets.find(name);
          const selector = this.outlets.getSelectorForOutletName(name);
          if (outletElement) {
            const outletController = getControllerAndEnsureConnectedScope(this, outletElement, name);
            if (outletController)
              return outletController;
            throw new Error(`The provided outlet element is missing an outlet controller "${name}" instance for host controller "${this.identifier}"`);
          }
          throw new Error(`Missing outlet element "${name}" for host controller "${this.identifier}". Stimulus couldn't find a matching outlet element using selector "${selector}".`);
        }
      },
      [`${camelizedName}Outlets`]: {
        get() {
          const outlets = this.outlets.findAll(name);
          if (outlets.length > 0) {
            return outlets.map((outletElement) => {
              const outletController = getControllerAndEnsureConnectedScope(this, outletElement, name);
              if (outletController)
                return outletController;
              console.warn(`The provided outlet element is missing an outlet controller "${name}" instance for host controller "${this.identifier}"`, outletElement);
            }).filter((controller) => controller);
          }
          return [];
        }
      },
      [`${camelizedName}OutletElement`]: {
        get() {
          const outletElement = this.outlets.find(name);
          const selector = this.outlets.getSelectorForOutletName(name);
          if (outletElement) {
            return outletElement;
          } else {
            throw new Error(`Missing outlet element "${name}" for host controller "${this.identifier}". Stimulus couldn't find a matching outlet element using selector "${selector}".`);
          }
        }
      },
      [`${camelizedName}OutletElements`]: {
        get() {
          return this.outlets.findAll(name);
        }
      },
      [`has${capitalize(camelizedName)}Outlet`]: {
        get() {
          return this.outlets.has(name);
        }
      }
    };
  }
  function TargetPropertiesBlessing(constructor) {
    const targets = readInheritableStaticArrayValues(constructor, "targets");
    return targets.reduce((properties, targetDefinition) => {
      return Object.assign(properties, propertiesForTargetDefinition(targetDefinition));
    }, {});
  }
  function propertiesForTargetDefinition(name) {
    return {
      [`${name}Target`]: {
        get() {
          const target = this.targets.find(name);
          if (target) {
            return target;
          } else {
            throw new Error(`Missing target element "${name}" for "${this.identifier}" controller`);
          }
        }
      },
      [`${name}Targets`]: {
        get() {
          return this.targets.findAll(name);
        }
      },
      [`has${capitalize(name)}Target`]: {
        get() {
          return this.targets.has(name);
        }
      }
    };
  }
  function ValuePropertiesBlessing(constructor) {
    const valueDefinitionPairs = readInheritableStaticObjectPairs(constructor, "values");
    const propertyDescriptorMap = {
      valueDescriptorMap: {
        get() {
          return valueDefinitionPairs.reduce((result, valueDefinitionPair) => {
            const valueDescriptor = parseValueDefinitionPair(valueDefinitionPair, this.identifier);
            const attributeName = this.data.getAttributeNameForKey(valueDescriptor.key);
            return Object.assign(result, { [attributeName]: valueDescriptor });
          }, {});
        }
      }
    };
    return valueDefinitionPairs.reduce((properties, valueDefinitionPair) => {
      return Object.assign(properties, propertiesForValueDefinitionPair(valueDefinitionPair));
    }, propertyDescriptorMap);
  }
  function propertiesForValueDefinitionPair(valueDefinitionPair, controller) {
    const definition = parseValueDefinitionPair(valueDefinitionPair, controller);
    const { key, name, reader: read, writer: write } = definition;
    return {
      [name]: {
        get() {
          const value = this.data.get(key);
          if (value !== null) {
            return read(value);
          } else {
            return definition.defaultValue;
          }
        },
        set(value) {
          if (value === void 0) {
            this.data.delete(key);
          } else {
            this.data.set(key, write(value));
          }
        }
      },
      [`has${capitalize(name)}`]: {
        get() {
          return this.data.has(key) || definition.hasCustomDefaultValue;
        }
      }
    };
  }
  function parseValueDefinitionPair([token, typeDefinition], controller) {
    return valueDescriptorForTokenAndTypeDefinition({
      controller,
      token,
      typeDefinition
    });
  }
  function parseValueTypeConstant(constant) {
    switch (constant) {
      case Array:
        return "array";
      case Boolean:
        return "boolean";
      case Number:
        return "number";
      case Object:
        return "object";
      case String:
        return "string";
    }
  }
  function parseValueTypeDefault(defaultValue) {
    switch (typeof defaultValue) {
      case "boolean":
        return "boolean";
      case "number":
        return "number";
      case "string":
        return "string";
    }
    if (Array.isArray(defaultValue))
      return "array";
    if (Object.prototype.toString.call(defaultValue) === "[object Object]")
      return "object";
  }
  function parseValueTypeObject(payload) {
    const { controller, token, typeObject } = payload;
    const hasType = isSomething(typeObject.type);
    const hasDefault = isSomething(typeObject.default);
    const fullObject = hasType && hasDefault;
    const onlyType = hasType && !hasDefault;
    const onlyDefault = !hasType && hasDefault;
    const typeFromObject = parseValueTypeConstant(typeObject.type);
    const typeFromDefaultValue = parseValueTypeDefault(payload.typeObject.default);
    if (onlyType)
      return typeFromObject;
    if (onlyDefault)
      return typeFromDefaultValue;
    if (typeFromObject !== typeFromDefaultValue) {
      const propertyPath = controller ? `${controller}.${token}` : token;
      throw new Error(`The specified default value for the Stimulus Value "${propertyPath}" must match the defined type "${typeFromObject}". The provided default value of "${typeObject.default}" is of type "${typeFromDefaultValue}".`);
    }
    if (fullObject)
      return typeFromObject;
  }
  function parseValueTypeDefinition(payload) {
    const { controller, token, typeDefinition } = payload;
    const typeObject = { controller, token, typeObject: typeDefinition };
    const typeFromObject = parseValueTypeObject(typeObject);
    const typeFromDefaultValue = parseValueTypeDefault(typeDefinition);
    const typeFromConstant = parseValueTypeConstant(typeDefinition);
    const type = typeFromObject || typeFromDefaultValue || typeFromConstant;
    if (type)
      return type;
    const propertyPath = controller ? `${controller}.${typeDefinition}` : token;
    throw new Error(`Unknown value type "${propertyPath}" for "${token}" value`);
  }
  function defaultValueForDefinition(typeDefinition) {
    const constant = parseValueTypeConstant(typeDefinition);
    if (constant)
      return defaultValuesByType[constant];
    const hasDefault = hasProperty(typeDefinition, "default");
    const hasType = hasProperty(typeDefinition, "type");
    const typeObject = typeDefinition;
    if (hasDefault)
      return typeObject.default;
    if (hasType) {
      const { type } = typeObject;
      const constantFromType = parseValueTypeConstant(type);
      if (constantFromType)
        return defaultValuesByType[constantFromType];
    }
    return typeDefinition;
  }
  function valueDescriptorForTokenAndTypeDefinition(payload) {
    const { token, typeDefinition } = payload;
    const key = `${dasherize(token)}-value`;
    const type = parseValueTypeDefinition(payload);
    return {
      type,
      key,
      name: camelize(key),
      get defaultValue() {
        return defaultValueForDefinition(typeDefinition);
      },
      get hasCustomDefaultValue() {
        return parseValueTypeDefault(typeDefinition) !== void 0;
      },
      reader: readers[type],
      writer: writers[type] || writers.default
    };
  }
  var defaultValuesByType = {
    get array() {
      return [];
    },
    boolean: false,
    number: 0,
    get object() {
      return {};
    },
    string: ""
  };
  var readers = {
    array(value) {
      const array = JSON.parse(value);
      if (!Array.isArray(array)) {
        throw new TypeError(`expected value of type "array" but instead got value "${value}" of type "${parseValueTypeDefault(array)}"`);
      }
      return array;
    },
    boolean(value) {
      return !(value == "0" || String(value).toLowerCase() == "false");
    },
    number(value) {
      return Number(value.replace(/_/g, ""));
    },
    object(value) {
      const object = JSON.parse(value);
      if (object === null || typeof object != "object" || Array.isArray(object)) {
        throw new TypeError(`expected value of type "object" but instead got value "${value}" of type "${parseValueTypeDefault(object)}"`);
      }
      return object;
    },
    string(value) {
      return value;
    }
  };
  var writers = {
    default: writeString,
    array: writeJSON,
    object: writeJSON
  };
  function writeJSON(value) {
    return JSON.stringify(value);
  }
  function writeString(value) {
    return `${value}`;
  }
  var Controller = class {
    constructor(context) {
      this.context = context;
    }
    static get shouldLoad() {
      return true;
    }
    static afterLoad(_identifier, _application) {
      return;
    }
    get application() {
      return this.context.application;
    }
    get scope() {
      return this.context.scope;
    }
    get element() {
      return this.scope.element;
    }
    get identifier() {
      return this.scope.identifier;
    }
    get targets() {
      return this.scope.targets;
    }
    get outlets() {
      return this.scope.outlets;
    }
    get classes() {
      return this.scope.classes;
    }
    get data() {
      return this.scope.data;
    }
    initialize() {
    }
    connect() {
    }
    disconnect() {
    }
    dispatch(eventName, { target = this.element, detail = {}, prefix = this.identifier, bubbles = true, cancelable = true } = {}) {
      const type = prefix ? `${prefix}:${eventName}` : eventName;
      const event = new CustomEvent(type, { detail, bubbles, cancelable });
      target.dispatchEvent(event);
      return event;
    }
  };
  Controller.blessings = [
    ClassPropertiesBlessing,
    TargetPropertiesBlessing,
    ValuePropertiesBlessing,
    OutletPropertiesBlessing
  ];
  Controller.targets = [];
  Controller.outlets = [];
  Controller.values = {};

  // ../../node_modules/.pnpm/relapse@0.6.0/node_modules/relapse/index.js
  var L = class extends Array {
    constructor() {
      super(...arguments);
      this.refs = /* @__PURE__ */ Object.create(null);
    }
    get(a2) {
      let n = typeof a2;
      if (n === "number")
        return this[a2];
      if (n === "string") {
        if (a2 in this.refs)
          return this[this.refs[a2]];
        throw new Error(`Relapse: No fold using an id value of: ${a2}`);
      } else if (n === "undefined")
        return this;
    }
  };
  function N(t2) {
    function s(u2, o, e) {
      let i2 = t2[u2] || [], c = i2.length, m = null;
      for (let b = 0; b < c; b++) {
        let h = i2[b].apply(o, [e]);
        m === null && h === false && (m = true);
      }
      return m;
    }
    function a2(u2, o) {
      t2[u2] || (t2[u2] = []), t2[u2].push(o);
    }
    function n(u2, o) {
      let e = [], i2 = t2[u2];
      if (i2 && o)
        for (let c = 0, m = i2.length; c < m; c++)
          i2[c] !== o && e.push(i2[c]);
      e.length ? i2[u2] = e : delete i2[u2];
    }
    return { on: a2, off: n, emit: s };
  }
  function A(t2, s) {
    let { classes: a2 } = t2.config;
    return function(n) {
      let u2 = (e) => {
        if (typeof e != "number")
          return t2.active !== n.index && (t2.active = n.index), n;
        if (t2.folds.get(e))
          return t2.active = n.index, t2.folds.get(e);
        throw new Error(`relapse: No fold exists at index: ${e}`);
      }, o = (e) => {
        e.button.ariaDisabled = "false", e.button.ariaExpanded = "false", e.element.classList.remove(a2.expanded), e.expanded = false, e.button.classList.contains(a2.initial) && e.button.classList.remove(a2.initial), e.element.style.setProperty("max-height", "0"), t2.parent !== null && t2.parent.style.setProperty("max-height", `${t2.parent.scrollHeight - e.height}px`), t2.folds.length - 1 === e.index ? e.element.addEventListener("transitionend", function i2() {
          e.expanded || (e.element.style.setProperty("opacity", "0"), e.element.style.setProperty("visibility", "hidden"), e.button.classList.remove(a2.opened)), e.element.removeEventListener("transitionend", i2);
        }) : (e.element.style.setProperty("opacity", "0"), e.element.style.setProperty("visibility", "hidden"), e.button.classList.remove(a2.opened));
      };
      n.open = function(e) {
        let i2 = u2(e);
        i2.expanded || (i2.close(), i2.height = i2.element.scrollHeight, i2.button.ariaDisabled = "true", i2.button.ariaExpanded = "true", i2.button.classList.add(a2.opened), i2.element.classList.add(a2.expanded), i2.element.style.setProperty("max-height", `${i2.height}px`), i2.element.style.setProperty("opacity", "1"), i2.element.style.setProperty("visibility", "visible"), t2.parent !== null && t2.parent.style.setProperty("max-height", `${t2.parent.scrollHeight + i2.height}px`), i2.expanded = true, i2.disable(), t2.count = t2.folds.filter(({ expanded: c }) => c).length, s.emit("expand", t2, i2));
      }, n.close = function(e) {
        let i2 = u2(e);
        if (t2.config.multiple)
          (t2.config.persist === false || t2.config.persist && t2.count > 1) && o(i2);
        else
          for (let c of t2.folds.values())
            if (c.expanded === true) {
              if (t2.config.persist && c.index === i2.index)
                break;
              o(c), i2 = c;
              break;
            }
        i2.enable(), t2.count = t2.folds.filter(({ expanded: c }) => c).length, s.emit("collapse", t2, i2);
      }, n.focus = function() {
        t2.active = n.index, n.button.classList.add(a2.focused), s.emit("focus", t2, n);
      }, n.blur = function() {
        n.button.classList.remove(a2.focused);
      }, n.enable = function(e) {
        let i2 = u2(e);
        i2.disabled && (i2.disabled = false, i2.button.ariaDisabled = "false", i2.button.classList.remove(a2.disabled));
      }, n.disable = function(e) {
        let i2 = u2(e);
        i2.disabled || (i2.expanded ? t2.config.persist && (i2.disabled = true, i2.button.ariaDisabled = "true") : (i2.close(), i2.disabled = true, i2.button.ariaDisabled = "true", i2.button.classList.add(a2.disabled)));
      }, n.toggle = function() {
        if (s.emit("toggle", t2, n) !== false)
          return n.expanded ? n.close() : n.open();
      }, n.destroy = function(e = false) {
        n.close(), n.button.removeEventListener("click", n.toggle), n.button.removeEventListener("focus", n.focus), n.button.removeEventListener("blur", n.blur), e && (t2.element.removeChild(n.element), t2.element.removeChild(n.button));
      }, n.button.addEventListener("click", n.toggle), n.button.addEventListener("focus", n.focus), n.button.addEventListener("blur", n.blur), n.element.hasAttribute("id") ? (t2.folds.push(n), t2.folds.refs[n.element.id] = t2.folds.length - 1) : t2.folds.push(n);
    };
  }
  var I = (t2) => {
    let s = /* @__PURE__ */ Object.create(null);
    if (s.persist = true, s.multiple = false, s.parent = null, s.schema = "data-relapse", s.duration = 225, s.classes = /* @__PURE__ */ Object.create(null), s.classes.initial = "initial", s.classes.opened = "opened", s.classes.disabled = "disabled", s.classes.expanded = "expanded", s.classes.focused = "focused", typeof t2 == "object")
      for (let a2 in t2)
        if (a2 === "classes")
          for (let n in t2[a2])
            s.classes[n] = t2[a2][n];
        else
          s[a2] = t2[a2];
    return s;
  };
  function S(t2, s) {
    let a2 = t2.schema.length + 1;
    for (let { nodeName: n, nodeValue: u2 } of s) {
      if (!n.startsWith(t2.schema))
        continue;
      let o = n.slice(a2), e = u2.trim();
      if (o === "persist" || o === "multiple")
        if (e === "true" || e === "false")
          t2[o] = e === "true";
        else
          throw new TypeError(`relapse: Invalid ${n} attribute value. Boolean expected, received: ${e}`);
      else if (o === "duration") {
        if (isNaN(+e))
          throw new TypeError(`relapse: Invalid ${n} attribute value. Number expected, received: ${e}`);
        t2[o] = +e;
      }
    }
    return t2;
  }
  function M(t2) {
    let s = t2.duration / 2;
    return `will-change:visibility,opacity,max-height;overflow:hidden;transition:visibility ${s}ms linear,opacity ${s}ms linear,max-height ${t2.duration}ms ease-in-out;`;
  }
  var $ = function t(s, a2) {
    let n = typeof s == "string" || typeof s == "object" && "tagName" in s;
    if (n && s instanceof NodeList)
      throw TypeError("relapse: Invalid selector, NodeList is not supported, pass string or Element");
    let u2 = I(n ? a2 : s), o = null;
    if (n)
      typeof s == "string" ? o = document.body.querySelector(s) : o = s;
    else
      for (let d of document.body.querySelectorAll(`[${u2.schema}]`))
        t(d, a2);
    if (o === null)
      return;
    window.relapse instanceof Map || (window.relapse = /* @__PURE__ */ new Map());
    let e = /* @__PURE__ */ Object.create(null);
    e.events = /* @__PURE__ */ Object.create(null), e.folds = new L(), e.element = o, e.id = `R${window.relapse.size}`, e.count = 0, e.config = S(u2, e.element.attributes), e.parent = e.config.parent;
    let i2 = null;
    o.hasAttribute(e.config.schema) ? i2 = o.getAttribute(e.config.schema) : "id" in o && (i2 = o.id), i2 === null && window.relapse.has(i2) === true && (i2 = Math.random().toString(36).slice(2)), e.element.ariaMultiSelectable = `${e.config.multiple}`;
    let c = o.children, m = c.length, b = N(e.events), h = A(e, b), { classes: p } = e.config, g2 = isNaN(e.config.duration) || e.config.duration === -1 ? null : M(e.config);
    for (let d = 0; d < m; d = d + 2) {
      let l2 = c[d], f2 = c[d + 1], r = /* @__PURE__ */ Object.create(null);
      r.index = e.folds.length;
      let w = l2.classList.contains(p.initial), v = l2.classList.contains(p.opened), x = l2.classList.contains(p.disabled), E = f2.classList.contains(p.expanded);
      l2.ariaExpanded === "true" || v || E || w ? (v ? l2.ariaExpanded = "true" : l2.classList.add(p.opened), w || l2.classList.remove(p.initial), E || f2.classList.add(p.expanded), x && (l2.classList.add(p.disabled), l2.ariaDisabled = "true", r.disabled = true), r.expanded = true) : l2.ariaDisabled === "true" || x ? (r.disabled = true, x ? l2.ariaDisabled = "true" : l2.classList.add(p.disabled), E ? (r.expanded = true, l2.ariaExpanded = "true") : (r.expanded = false, l2.ariaExpanded = "false"), v && l2.classList.remove(p.opened)) : (r.expanded = false, r.disabled = false, l2.ariaExpanded = "false", l2.ariaDisabled = "false"), "id" in l2 && (r.id = l2.id), "id" in f2 && (r.id = f2.id), "id" in r || (r.id = `${e.id}F${r.index}`, l2.id = `B${r.id}`, f2.id = `C${r.id}`), l2.setAttribute("aria-controls", r.id), f2.setAttribute("aria-labelledby", l2.id), f2.setAttribute("role", "region"), Object.defineProperties(r, { button: { get() {
        return l2;
      } }, element: { get() {
        return f2;
      } } }), r.expanded ? (e.count = e.count + 1, r.element.style.cssText = g2 !== null ? `max-height:${r.element.scrollHeight}px;opacity:1;visibility:visible;${g2}` : `max-height:${r.element.scrollHeight}px;opacity:1;visibility:visible;`) : r.element.style.cssText = g2 !== null ? `max-height:0px;opacity:0;visibility:hidden;${g2}` : "max-height:0px;opacity:0;visibility:hidden;", h(r), window.relapse.set(i2, null);
      for (let O of r.element.querySelectorAll(`[${e.config.schema}]`))
        t(O, { parent: r.element });
    }
    let y = (d, l2, f2 = false) => {
      if (typeof l2 == "number")
        return d.charCodeAt(0) === 100 ? e.folds[l2][d](f2) : e.folds[l2][d]();
      if (typeof l2 == "string") {
        for (let r of e.folds.values())
          if (r.button.dataset[`${e.config.schema}-fold`] === l2)
            return d.charCodeAt(0) === 100 ? r[d](f2) : r[d]();
      }
      throw new Error(`relapse: Fold does not exist: "${l2}"`);
    };
    return e.on = b.on, e.off = b.off, e.collapse = (d) => y("close", d), e.expand = (d) => y("open", d), e.destroy = (d, l2 = false) => {
      if (typeof d == "undefined")
        for (let f2 of e.folds.values())
          f2.destroy();
      else
        y("destroy", d, l2);
      e.element.removeAttribute("aria-multiselectable"), b.emit("destroy", e), window.relapse.delete(i2);
    }, window.relapse.set(i2, e), n ? e : Array.from(window.relapse.values());
  };
  $.get = (t2) => t2 ? window.relapse.get(t2) : window.relapse;
  var T = $;

  // demo/views/accordion/controller.ts
  var Accordion = class extends Controller {
    get hasClasses() {
      return this.hasDisabledClass || this.hasFocusedClass || this.hasInitialClass || this.hasOpenedClass || this.hasExpandedClass;
    }
    /**
     * Stimulus: Initialize
     */
    initialize() {
      this.options = {
        schema: "data-accordion",
        duration: NaN
      };
      if (this.hasMultipleValue)
        this.options.multiple = this.multipleValue;
      if (this.hasPersistValue)
        this.options.persist = this.persistValue;
      if (this.hasClasses) {
        this.options.classes = {};
        if (this.hasFocusedClass)
          this.options.classes.focused = this.focusedClass;
        if (this.hasInitialClass)
          this.options.classes.initial = this.initialClass;
        if (this.hasExpandedClass)
          this.options.classes.expanded = this.expandedClass;
        if (this.hasDisabledClass)
          this.options.classes.disabled = this.disabledClass;
        if (this.hasOpenedClass)
          this.options.classes.opened = this.openedClass;
      }
    }
    /**
     * Stimulus: Connect
     */
    connect() {
      this.accordion = T(this.element, this.options);
    }
    /**
     * Stimulus: Disconnect
     */
    disconnect() {
      this.accordion.destroy();
    }
    /**
     * Open Fold
     *
     * Event target should be the the fold index to open
     */
    open({ target: { dataset: { index } } }) {
      return this.accordion.folds[parseInt(index)].open();
    }
    /**
     * Close Fold
     *
     * Event target should be the the fold index to close
     */
    close({ target: { dataset: { index } } }) {
      return this.accordion.folds[parseInt(index)].close();
    }
  };
  /**
   * Stimulus: Values
   */
  Accordion.targets = [
    "viewport"
  ];
  /**
   * Stimulus: Values
   */
  Accordion.values = {
    multiple: Boolean,
    persist: Boolean,
    id: String
  };
  /**
   * Stimulus: Classes
   */
  Accordion.classes = [
    "disabled",
    "expanded",
    "focused",
    "initial",
    "opened"
  ];

  // demo/views/collapse/controller.ts
  var Collapse = class extends Controller {
    get hasClasses() {
      return this.hasDisabledClass || this.hasFocusedClass || this.hasInitialClass || this.hasOpenedClass || this.hasExpandedClass;
    }
    /**
     * Stimulus: Initialize
     */
    initialize() {
      this.options = {
        duration: NaN
      };
      if (this.hasMultipleValue)
        this.options.multiple = this.multipleValue;
      if (this.hasPersistValue)
        this.options.persist = this.persistValue;
      if (this.hasClasses) {
        this.options.classes = {};
        if (this.hasFocusedClass)
          this.options.classes.focused = this.focusedClass;
        if (this.hasInitialClass)
          this.options.classes.initial = this.initialClass;
        if (this.hasExpandedClass)
          this.options.classes.expanded = this.expandedClass;
        if (this.hasDisabledClass)
          this.options.classes.disabled = this.disabledClass;
        if (this.hasOpenedClass)
          this.options.classes.opened = this.openedClass;
      }
    }
    /**
     * Stimulus: Connect
     */
    connect() {
      this.collapse = T(this.element, this.options);
    }
    /**
     * Stimulus: Disconnect
     */
    disconnect() {
      this.collapse.destroy();
    }
    /**
     * Open Fold
     *
     * Event target should be the the fold index to open
     */
    open({ target: { dataset: { index } } }) {
      return this.collapse.folds[parseInt(index)].open();
    }
    /**
     * Close Fold
     *
     * Event target should be the the fold index to close
     */
    close({ target: { dataset: { index } } }) {
      return this.collapse.folds[parseInt(index)].close();
    }
  };
  /**
   * Stimulus: Values
   */
  Collapse.values = {
    id: String,
    multiple: {
      type: Boolean,
      default: true
    },
    persist: {
      type: Boolean,
      default: false
    }
  };
  /**
   * Stimulus: Classes
   */
  Collapse.classes = [
    "disabled",
    "expanded",
    "focused",
    "initial",
    "opened"
  ];

  // demo/views/modal/controller.ts
  var Modal = class extends Controller {
    /**
     * Stimulus Initialize
     */
    initialize() {
      this.modalNode = document.getElementById("modal-node");
      if (!this.hasEnableValue)
        this.enableValue = true;
    }
    /**
     * Stimulus Connect
     */
    connect() {
    }
    /**
     * Stimulus Connect
     */
    disconnect() {
      if (this.isOpenValue) {
        this.close();
      }
    }
    /**
     * Click detected outside, eg: document body
     */
    outsideClick({ target }) {
      if (target instanceof HTMLElement) {
        if (this.modalNode === target || target.getAttribute("data-close") === "modal") {
          this.close();
          document.removeEventListener("click", this.outsideClick);
        }
      }
    }
    open() {
      if (this.enableValue === false)
        return;
      if (!this.isOpenValue) {
        if (this.hasWidthValue) {
          this.modalNode.firstElementChild.setAttribute("style", `width: ${this.widthValue};`);
        } else {
          this.modalNode.firstElementChild.classList.add("row", ...this.classValue.split(" "));
        }
        this.modalNode.classList.add("is-open");
        this.modalNode.firstChild.appendChild(this.templateTarget.content.cloneNode(true));
        this.templateNode = this.modalNode.firstChild.firstChild;
        this.isOpenValue = true;
        document.body.setAttribute("style", "overflow: hidden;");
        addEventListener("keydown", this.close.bind(this));
        addEventListener("click", this.outsideClick.bind(this));
      }
    }
    /**
     * Hide the GDRP component banner.
     */
    close(event) {
      if (event && event.key.toUpperCase() !== "ESCAPE")
        return;
      if (this.isOpenValue) {
        document.body.removeAttribute("style");
        this.modalNode.classList.remove("is-open");
        this.modalNode.firstChild.removeChild(this.templateNode);
        this.isOpenValue = false;
        removeEventListener("keydown", this.close);
      }
    }
  };
  /**
   * Stimulus Values
   */
  Modal.values = {
    active: Boolean,
    threshold: Number,
    width: String,
    class: String,
    isOpen: Boolean,
    enable: Boolean,
    bodyOverflow: Boolean,
    closeButton: Boolean,
    closeBackdrop: Boolean
  };
  /**
   * Stimulus Targets
   */
  Modal.targets = [
    "template"
  ];
  /**
   * Stimulus: Classes
   */
  Modal.classes = [
    "grid"
  ];
  Modal.public = {
    button: {
      target: "toggle",
      action: "modal#open"
    }
  };

  // demo/views/dropdown/controller.ts
  var Dropdown = class extends Controller {
    /**
     * Stimulus Initialize
     *
     * @static
     * @memberof Dropdown
     */
    connect() {
    }
    /**
     * Stimulus Disconnect
     *
     * @static
     * @memberof Dropdown
     * @version 2.0
     */
    disconnect() {
    }
    /**
     * Returns all `<label>` elements in the dropdown
     */
    inViewport() {
      const rect = this.collapseTarget.getBoundingClientRect();
      for (const { element, folds } of T.get().values()) {
        if (element.id === this.accordionValue) {
          if (!(rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth))) {
            folds.find((fold) => fold.expanded === true).close();
          }
          break;
        }
      }
    }
    /**
     * Toggle - Open/Close
     */
    toggle(event) {
      event.stopPropagation();
      if (this.element.classList.contains("is-open"))
        return this.close();
      this.collapseValue = "opened";
      this.element.classList.add("is-open");
      this.buttonTarget.classList.remove("selected");
      if (this.hasAccordionValue)
        this.inViewport();
      addEventListener("click", this.outsideClick.bind(this));
    }
    /**
     * Click detected outside, eg: document body
     */
    outsideClick(event) {
      if (this.buttonTarget !== event.target) {
        if (this.element.classList.contains("is-open")) {
          this.close();
        }
      }
    }
    /**
     * Close Dropdown
     */
    close() {
      this.element.classList.remove("is-open");
      if (this.collapseValue === "selected" || this.hasSelectedValue) {
        this.element.classList.add("selected");
        this.collapseValue = "selected";
      } else {
        this.collapseValue = "closed";
      }
      removeEventListener("click", this.outsideClick);
      this.buttonTarget.focus();
    }
    /**
     * Select Inputs
     *
     * Used for Dropdown Forms
     */
    select({ target }) {
      target.checked = true;
      this.selectedValue = target.value;
      this.buttonTarget.innerText = target.getAttribute("aria-label");
      this.collapseValue = "selected";
      for (const label of this.element.getElementsByTagName("label")) {
        if (label.getAttribute("for") === target.id) {
          if (!label.classList.contains("selected")) {
            label.classList.add("selected");
          }
        } else {
          if (label.classList.contains("selected")) {
            label.classList.remove("selected");
          }
        }
      }
      ;
      this.close();
    }
    /**
     * Items in dropdown - An ul > li <select> element equivelent
     */
    options(event) {
      if (event.target instanceof HTMLElement) {
        if (event.currentTarget instanceof HTMLElement) {
          const [selected] = event.currentTarget.getElementsByClassName("selected");
          if (selected)
            this.selectedValue = selected.id;
        }
        if (event.currentTarget instanceof HTMLElement) {
        }
        if (this.hasRequiredValue) {
          if (this.buttonTarget.classList.contains("is-invalid")) {
            this.buttonTarget.classList.remove("is-invalid");
          }
          this.requiredValue = false;
          this.buttonTarget.classList.add("selected");
        }
        this.selectedValue = event.target.textContent;
        this.buttonTarget.textContent = event.target.textContent;
        this.collapseValue = "selected";
        this.toggle(event);
      }
    }
  };
  /**
   * Stimulus Values
   */
  Dropdown.values = {
    selected: String,
    form: String,
    accordion: String,
    required: {
      type: Boolean,
      default: false
    },
    collapse: {
      type: String,
      default: "closed"
    },
    type: {
      type: String,
      default: "dropdown"
    }
  };
  /**
   * Stimulus Targets
   */
  Dropdown.targets = [
    "collapse",
    "button",
    "placeholder",
    "input",
    "viewport"
  ];
  /**
   * Stimulus Classes
   *
   * @static
   * @memberof Dropdown
   */
  Dropdown.classes = [
    "selected",
    "disabled",
    "invalid"
  ];

  // ../../node_modules/.pnpm/embla-carousel@8.0.0-rc14/node_modules/embla-carousel/embla-carousel.esm.js
  function isNumber(subject) {
    return typeof subject === "number";
  }
  function isString(subject) {
    return typeof subject === "string";
  }
  function isBoolean(subject) {
    return typeof subject === "boolean";
  }
  function isObject(subject) {
    return Object.prototype.toString.call(subject) === "[object Object]";
  }
  function mathAbs(n) {
    return Math.abs(n);
  }
  function mathSign(n) {
    return Math.sign(n);
  }
  function deltaAbs(valueB, valueA) {
    return mathAbs(valueB - valueA);
  }
  function factorAbs(valueB, valueA) {
    if (valueB === 0 || valueA === 0)
      return 0;
    if (mathAbs(valueB) <= mathAbs(valueA))
      return 0;
    const diff = deltaAbs(mathAbs(valueB), mathAbs(valueA));
    return mathAbs(diff / valueB);
  }
  function arrayKeys(array) {
    return objectKeys(array).map(Number);
  }
  function arrayLast(array) {
    return array[arrayLastIndex(array)];
  }
  function arrayLastIndex(array) {
    return Math.max(0, array.length - 1);
  }
  function arrayFromNumber(n, startAt = 0) {
    return Array.from(Array(n), (_, i2) => startAt + i2);
  }
  function objectKeys(object) {
    return Object.keys(object);
  }
  function objectsMergeDeep(objectA, objectB) {
    return [objectA, objectB].reduce((mergedObjects, currentObject) => {
      objectKeys(currentObject).forEach((key) => {
        const valueA = mergedObjects[key];
        const valueB = currentObject[key];
        const areObjects = isObject(valueA) && isObject(valueB);
        mergedObjects[key] = areObjects ? objectsMergeDeep(valueA, valueB) : valueB;
      });
      return mergedObjects;
    }, {});
  }
  function isMouseEvent(evt, ownerWindow) {
    return typeof ownerWindow.MouseEvent !== "undefined" && evt instanceof ownerWindow.MouseEvent;
  }
  function Alignment(align, viewSize) {
    const predefined = {
      start,
      center,
      end
    };
    function start() {
      return 0;
    }
    function center(n) {
      return end(n) / 2;
    }
    function end(n) {
      return viewSize - n;
    }
    function percent() {
      return viewSize * Number(align);
    }
    function measure(n) {
      if (isNumber(align))
        return percent();
      return predefined[align](n);
    }
    const self = {
      measure
    };
    return self;
  }
  function Axis(axis, direction) {
    const scroll = axis === "y" ? "y" : "x";
    const cross = axis === "y" ? "x" : "y";
    const startEdge = getStartEdge();
    const endEdge = getEndEdge();
    function measureSize(rect) {
      const {
        width,
        height
      } = rect;
      return scroll === "x" ? width : height;
    }
    function getStartEdge() {
      if (scroll === "y")
        return "top";
      return direction === "rtl" ? "right" : "left";
    }
    function getEndEdge() {
      if (scroll === "y")
        return "bottom";
      return direction === "rtl" ? "left" : "right";
    }
    const self = {
      scroll,
      cross,
      startEdge,
      endEdge,
      measureSize
    };
    return self;
  }
  function Limit(min, max) {
    const length = mathAbs(min - max);
    function reachedMin(n) {
      return n < min;
    }
    function reachedMax(n) {
      return n > max;
    }
    function reachedAny(n) {
      return reachedMin(n) || reachedMax(n);
    }
    function constrain(n) {
      if (!reachedAny(n))
        return n;
      return reachedMin(n) ? min : max;
    }
    function removeOffset(n) {
      if (!length)
        return n;
      return n - length * Math.ceil((n - max) / length);
    }
    const self = {
      length,
      max,
      min,
      constrain,
      reachedAny,
      reachedMax,
      reachedMin,
      removeOffset
    };
    return self;
  }
  function Counter(max, start, loop) {
    const {
      constrain
    } = Limit(0, max);
    const loopEnd = max + 1;
    let counter = withinLimit(start);
    function withinLimit(n) {
      return !loop ? constrain(n) : mathAbs((loopEnd + n) % loopEnd);
    }
    function get() {
      return counter;
    }
    function set(n) {
      counter = withinLimit(n);
      return self;
    }
    function add2(n) {
      return clone().set(get() + n);
    }
    function clone() {
      return Counter(max, get(), loop);
    }
    const self = {
      get,
      set,
      add: add2,
      clone
    };
    return self;
  }
  function Direction(direction) {
    const sign = direction === "rtl" ? -1 : 1;
    function apply(n) {
      return n * sign;
    }
    const self = {
      apply
    };
    return self;
  }
  function EventStore() {
    let listeners = [];
    function add2(node, type, handler, options = {
      passive: true
    }) {
      let removeListener;
      if ("addEventListener" in node) {
        node.addEventListener(type, handler, options);
        removeListener = () => node.removeEventListener(type, handler, options);
      } else {
        const legacyMediaQueryList = node;
        legacyMediaQueryList.addListener(handler);
        removeListener = () => legacyMediaQueryList.removeListener(handler);
      }
      listeners.push(removeListener);
      return self;
    }
    function clear() {
      listeners = listeners.filter((remove) => remove());
    }
    const self = {
      add: add2,
      clear
    };
    return self;
  }
  function DragHandler(axis, direction, rootNode, ownerDocument, ownerWindow, target, dragTracker, location, animation, scrollTo, scrollBody, scrollTarget, index, eventHandler, percentOfView, dragFree, dragThreshold, skipSnaps, baseFriction, watchDrag) {
    const {
      cross: crossAxis
    } = axis;
    const focusNodes = ["INPUT", "SELECT", "TEXTAREA"];
    const nonPassiveEvent = {
      passive: false
    };
    const initEvents = EventStore();
    const dragEvents = EventStore();
    const goToNextThreshold = Limit(50, 225).constrain(percentOfView.measure(20));
    const snapForceBoost = {
      mouse: 300,
      touch: 400
    };
    const freeForceBoost = {
      mouse: 500,
      touch: 600
    };
    const baseSpeed = dragFree ? 43 : 25;
    let isMoving = false;
    let startScroll = 0;
    let startCross = 0;
    let pointerIsDown = false;
    let preventScroll = false;
    let preventClick = false;
    let isMouse = false;
    function init(emblaApi) {
      if (!watchDrag)
        return;
      function downIfAllowed(evt) {
        if (isBoolean(watchDrag) || watchDrag(emblaApi, evt))
          down(evt);
      }
      const node = rootNode;
      initEvents.add(node, "dragstart", (evt) => evt.preventDefault(), nonPassiveEvent).add(node, "touchmove", () => void 0, nonPassiveEvent).add(node, "touchend", () => void 0).add(node, "touchstart", downIfAllowed).add(node, "mousedown", downIfAllowed).add(node, "touchcancel", up).add(node, "contextmenu", up).add(node, "click", click, true);
    }
    function destroy() {
      initEvents.clear();
      dragEvents.clear();
    }
    function addDragEvents() {
      const node = isMouse ? ownerDocument : rootNode;
      dragEvents.add(node, "touchmove", move, nonPassiveEvent).add(node, "touchend", up).add(node, "mousemove", move, nonPassiveEvent).add(node, "mouseup", up);
    }
    function isFocusNode(node) {
      const nodeName = node.nodeName || "";
      return focusNodes.includes(nodeName);
    }
    function forceBoost() {
      const boost = dragFree ? freeForceBoost : snapForceBoost;
      const type = isMouse ? "mouse" : "touch";
      return boost[type];
    }
    function allowedForce(force, targetChanged) {
      const next = index.add(mathSign(force) * -1);
      const baseForce = scrollTarget.byDistance(force, !dragFree).distance;
      if (dragFree || mathAbs(force) < goToNextThreshold)
        return baseForce;
      if (skipSnaps && targetChanged)
        return baseForce * 0.5;
      return scrollTarget.byIndex(next.get(), 0).distance;
    }
    function down(evt) {
      const isMouseEvt = isMouseEvent(evt, ownerWindow);
      isMouse = isMouseEvt;
      if (isMouseEvt && evt.button !== 0)
        return;
      if (isFocusNode(evt.target))
        return;
      preventClick = dragFree && isMouseEvt && !evt.buttons && isMoving;
      isMoving = deltaAbs(target.get(), location.get()) >= 2;
      pointerIsDown = true;
      dragTracker.pointerDown(evt);
      scrollBody.useFriction(0).useDuration(0);
      target.set(location);
      addDragEvents();
      startScroll = dragTracker.readPoint(evt);
      startCross = dragTracker.readPoint(evt, crossAxis);
      eventHandler.emit("pointerDown");
    }
    function move(evt) {
      const lastScroll = dragTracker.readPoint(evt);
      const lastCross = dragTracker.readPoint(evt, crossAxis);
      const diffScroll = deltaAbs(lastScroll, startScroll);
      const diffCross = deltaAbs(lastCross, startCross);
      if (!preventScroll && !isMouse) {
        if (!evt.cancelable)
          return up(evt);
        preventScroll = diffScroll > diffCross;
        if (!preventScroll)
          return up(evt);
      }
      const diff = dragTracker.pointerMove(evt);
      if (diffScroll > dragThreshold)
        preventClick = true;
      scrollBody.useFriction(0.3).useDuration(1);
      animation.start();
      target.add(direction.apply(diff));
      evt.preventDefault();
    }
    function up(evt) {
      const currentLocation = scrollTarget.byDistance(0, false);
      const targetChanged = currentLocation.index !== index.get();
      const rawForce = dragTracker.pointerUp(evt) * forceBoost();
      const force = allowedForce(direction.apply(rawForce), targetChanged);
      const forceFactor = factorAbs(rawForce, force);
      const speed = baseSpeed - 10 * forceFactor;
      const friction = baseFriction + forceFactor / 50;
      preventScroll = false;
      pointerIsDown = false;
      dragEvents.clear();
      scrollBody.useDuration(speed).useFriction(friction);
      scrollTo.distance(force, !dragFree);
      isMouse = false;
      eventHandler.emit("pointerUp");
    }
    function click(evt) {
      if (preventClick) {
        evt.stopPropagation();
        evt.preventDefault();
      }
    }
    function pointerDown() {
      return pointerIsDown;
    }
    const self = {
      init,
      pointerDown,
      destroy
    };
    return self;
  }
  function DragTracker(axis, ownerWindow) {
    const logInterval = 170;
    let startEvent;
    let lastEvent;
    function readTime(evt) {
      return evt.timeStamp;
    }
    function readPoint(evt, evtAxis) {
      const property = evtAxis || axis.scroll;
      const coord = `client${property === "x" ? "X" : "Y"}`;
      return (isMouseEvent(evt, ownerWindow) ? evt : evt.touches[0])[coord];
    }
    function pointerDown(evt) {
      startEvent = evt;
      lastEvent = evt;
      return readPoint(evt);
    }
    function pointerMove(evt) {
      const diff = readPoint(evt) - readPoint(lastEvent);
      const expired = readTime(evt) - readTime(startEvent) > logInterval;
      lastEvent = evt;
      if (expired)
        startEvent = evt;
      return diff;
    }
    function pointerUp(evt) {
      if (!startEvent || !lastEvent)
        return 0;
      const diffDrag = readPoint(lastEvent) - readPoint(startEvent);
      const diffTime = readTime(evt) - readTime(startEvent);
      const expired = readTime(evt) - readTime(lastEvent) > logInterval;
      const force = diffDrag / diffTime;
      const isFlick = diffTime && !expired && mathAbs(force) > 0.1;
      return isFlick ? force : 0;
    }
    const self = {
      pointerDown,
      pointerMove,
      pointerUp,
      readPoint
    };
    return self;
  }
  function PercentOfView(viewSize) {
    function measure(n) {
      return viewSize * (n / 100);
    }
    const self = {
      measure
    };
    return self;
  }
  function ResizeHandler(container, eventHandler, ownerWindow, slides, axis, watchResize) {
    let resizeObserver;
    let containerSize;
    let slideSizes = [];
    let destroyed = false;
    function readSize(node) {
      return axis.measureSize(node.getBoundingClientRect());
    }
    function init(emblaApi) {
      if (!watchResize)
        return;
      containerSize = readSize(container);
      slideSizes = slides.map(readSize);
      function defaultCallback(entries) {
        for (const entry of entries) {
          const isContainer = entry.target === container;
          const slideIndex = slides.indexOf(entry.target);
          const lastSize = isContainer ? containerSize : slideSizes[slideIndex];
          const newSize = readSize(isContainer ? container : slides[slideIndex]);
          const diffSize = mathAbs(newSize - lastSize);
          if (diffSize >= 0.2) {
            ownerWindow.requestAnimationFrame(() => {
              emblaApi.reInit();
              eventHandler.emit("resize");
            });
            break;
          }
        }
      }
      resizeObserver = new ResizeObserver((entries) => {
        if (destroyed)
          return;
        if (isBoolean(watchResize) || watchResize(emblaApi, entries)) {
          defaultCallback(entries);
        }
      });
      const observeNodes = [container].concat(slides);
      observeNodes.forEach((node) => resizeObserver.observe(node));
    }
    function destroy() {
      if (resizeObserver)
        resizeObserver.disconnect();
      destroyed = true;
    }
    const self = {
      init,
      destroy
    };
    return self;
  }
  function ScrollBody(location, target, baseDuration, baseFriction) {
    let hasSettled = true;
    let bodyVelocity = 0;
    let scrollDirection = 0;
    let scrollDuration = baseDuration;
    let scrollFriction = baseFriction;
    let rawLocation = location.get();
    let rawLocationPrevious = 0;
    function seek() {
      const diff = target.get() - location.get();
      const isInstant = !scrollDuration;
      let directionDiff = 0;
      if (isInstant) {
        bodyVelocity = 0;
        location.set(target);
        directionDiff = diff;
      } else {
        bodyVelocity += diff / scrollDuration;
        bodyVelocity *= scrollFriction;
        rawLocation += bodyVelocity;
        location.add(bodyVelocity);
        directionDiff = rawLocation - rawLocationPrevious;
      }
      scrollDirection = mathSign(directionDiff);
      rawLocationPrevious = rawLocation;
      hasSettled = mathAbs(diff) < 1e-3;
      return self;
    }
    function settled() {
      return hasSettled;
    }
    function duration() {
      return scrollDuration;
    }
    function direction() {
      return scrollDirection;
    }
    function velocity() {
      return bodyVelocity;
    }
    function useBaseDuration() {
      return useDuration(baseDuration);
    }
    function useBaseFriction() {
      return useFriction(baseFriction);
    }
    function useDuration(n) {
      scrollDuration = n;
      return self;
    }
    function useFriction(n) {
      scrollFriction = n;
      return self;
    }
    const self = {
      direction,
      duration,
      velocity,
      seek,
      settled,
      useBaseFriction,
      useBaseDuration,
      useFriction,
      useDuration
    };
    return self;
  }
  function ScrollBounds(limit, location, target, scrollBody, percentOfView) {
    const pullBackThreshold = percentOfView.measure(10);
    const edgeOffsetTolerance = percentOfView.measure(50);
    const frictionLimit = Limit(0.1, 0.99);
    let disabled = false;
    function shouldConstrain() {
      if (disabled)
        return false;
      if (!limit.reachedAny(target.get()))
        return false;
      if (!limit.reachedAny(location.get()))
        return false;
      return true;
    }
    function constrain(pointerDown) {
      if (!shouldConstrain())
        return;
      const edge = limit.reachedMin(location.get()) ? "min" : "max";
      const diffToEdge = mathAbs(limit[edge] - location.get());
      const diffToTarget = target.get() - location.get();
      const friction = frictionLimit.constrain(diffToEdge / edgeOffsetTolerance);
      target.subtract(diffToTarget * friction);
      if (!pointerDown && mathAbs(diffToTarget) < pullBackThreshold) {
        target.set(limit.constrain(target.get()));
        scrollBody.useDuration(25).useBaseFriction();
      }
    }
    function toggleActive(active) {
      disabled = !active;
    }
    const self = {
      constrain,
      toggleActive
    };
    return self;
  }
  function ScrollContain(viewSize, contentSize, snapsAligned, containScroll) {
    const scrollBounds = Limit(-contentSize + viewSize, 0);
    const snapsBounded = measureBounded();
    const scrollContainLimit = findScrollContainLimit();
    const snapsContained = measureContained();
    function findScrollContainLimit() {
      const startSnap = snapsBounded[0];
      const endSnap = arrayLast(snapsBounded);
      const min = snapsBounded.lastIndexOf(startSnap);
      const max = snapsBounded.indexOf(endSnap) + 1;
      return Limit(min, max);
    }
    function measureBounded() {
      return snapsAligned.map(scrollBounds.constrain).map((scrollBound) => parseFloat(scrollBound.toFixed(3)));
    }
    function measureContained() {
      if (contentSize <= viewSize)
        return [scrollBounds.max];
      if (containScroll === "keepSnaps")
        return snapsBounded;
      const {
        min,
        max
      } = scrollContainLimit;
      return snapsBounded.slice(min, max);
    }
    const self = {
      snapsContained,
      scrollContainLimit
    };
    return self;
  }
  function ScrollLimit(contentSize, scrollSnaps, loop) {
    const max = scrollSnaps[0];
    const min = loop ? max - contentSize : arrayLast(scrollSnaps);
    const limit = Limit(min, max);
    const self = {
      limit
    };
    return self;
  }
  function ScrollLooper(contentSize, limit, offsetLocation, vectors) {
    const jointSafety = 0.1;
    const min = limit.min + jointSafety;
    const max = limit.max + jointSafety;
    const {
      reachedMin,
      reachedMax
    } = Limit(min, max);
    function shouldLoop(direction) {
      if (direction === 1)
        return reachedMax(offsetLocation.get());
      if (direction === -1)
        return reachedMin(offsetLocation.get());
      return false;
    }
    function loop(direction) {
      if (!shouldLoop(direction))
        return;
      const loopDistance = contentSize * (direction * -1);
      vectors.forEach((v) => v.add(loopDistance));
    }
    const self = {
      loop
    };
    return self;
  }
  function ScrollProgress(limit) {
    const {
      max,
      length
    } = limit;
    function get(n) {
      const currentLocation = n - max;
      return length ? currentLocation / -length : 0;
    }
    const self = {
      get
    };
    return self;
  }
  function ScrollSnaps(axis, alignment, containerRect, slideRects, slidesToScroll) {
    const {
      startEdge,
      endEdge
    } = axis;
    const {
      groupSlides
    } = slidesToScroll;
    const alignments = measureSizes().map(alignment.measure);
    const snaps = measureUnaligned();
    const snapsAligned = measureAligned();
    function measureSizes() {
      return groupSlides(slideRects).map((rects) => arrayLast(rects)[endEdge] - rects[0][startEdge]).map(mathAbs);
    }
    function measureUnaligned() {
      return slideRects.map((rect) => containerRect[startEdge] - rect[startEdge]).map((snap) => -mathAbs(snap));
    }
    function measureAligned() {
      return groupSlides(snaps).map((g2) => g2[0]).map((snap, index) => snap + alignments[index]);
    }
    const self = {
      snaps,
      snapsAligned
    };
    return self;
  }
  function SlideRegistry(viewSize, contentSize, containSnaps, scrollContainLimit, slidesToScroll, slideIndexes) {
    const {
      groupSlides
    } = slidesToScroll;
    const {
      min,
      max
    } = scrollContainLimit;
    const slideRegistry = createSlideRegistry();
    function createSlideRegistry() {
      const groupedSlideIndexes = groupSlides(slideIndexes);
      if (!containSnaps || contentSize <= viewSize)
        return groupedSlideIndexes;
      return groupedSlideIndexes.slice(min, max).map((group, index, groups) => {
        const indexIsFirst = !index;
        const indexIsLast = !indexIsFirst && index === arrayLastIndex(groups);
        if (indexIsFirst) {
          const range = arrayLast(groups[0]) + 1;
          return arrayFromNumber(range);
        }
        if (indexIsLast) {
          const range = arrayLastIndex(slideIndexes) - arrayLast(groups)[0] + 1;
          return arrayFromNumber(range, arrayLast(groups)[0]);
        }
        return group;
      });
    }
    const self = {
      slideRegistry
    };
    return self;
  }
  function ScrollTarget(loop, scrollSnaps, contentSize, limit, targetVector) {
    const {
      reachedAny,
      removeOffset,
      constrain
    } = limit;
    function minDistance(distances) {
      return distances.concat().sort((a2, b) => mathAbs(a2) - mathAbs(b))[0];
    }
    function findTargetSnap(target) {
      const distance = loop ? removeOffset(target) : constrain(target);
      const ascDiffsToSnaps = scrollSnaps.map((scrollSnap) => scrollSnap - distance).map((diffToSnap) => shortcut(diffToSnap, 0)).map((diff, i2) => ({
        diff,
        index: i2
      })).sort((d1, d2) => mathAbs(d1.diff) - mathAbs(d2.diff));
      const {
        index
      } = ascDiffsToSnaps[0];
      return {
        index,
        distance
      };
    }
    function shortcut(target, direction) {
      const targets = [target, target + contentSize, target - contentSize];
      if (!loop)
        return targets[0];
      if (!direction)
        return minDistance(targets);
      const matchingTargets = targets.filter((t2) => mathSign(t2) === direction);
      if (matchingTargets.length)
        return minDistance(matchingTargets);
      return arrayLast(targets) - contentSize;
    }
    function byIndex(index, direction) {
      const diffToSnap = scrollSnaps[index] - targetVector.get();
      const distance = shortcut(diffToSnap, direction);
      return {
        index,
        distance
      };
    }
    function byDistance(distance, snap) {
      const target = targetVector.get() + distance;
      const {
        index,
        distance: targetSnapDistance
      } = findTargetSnap(target);
      const reachedBound = !loop && reachedAny(target);
      if (!snap || reachedBound)
        return {
          index,
          distance
        };
      const diffToSnap = scrollSnaps[index] - targetSnapDistance;
      const snapDistance = distance + shortcut(diffToSnap, 0);
      return {
        index,
        distance: snapDistance
      };
    }
    const self = {
      byDistance,
      byIndex,
      shortcut
    };
    return self;
  }
  function ScrollTo(animation, indexCurrent, indexPrevious, scrollTarget, scrollBody, targetVector, eventHandler) {
    function scrollTo(target) {
      const distanceDiff = target.distance;
      const indexDiff = target.index !== indexCurrent.get();
      targetVector.add(distanceDiff);
      if (distanceDiff) {
        if (scrollBody.duration()) {
          animation.start();
        } else {
          animation.update();
          animation.render(1);
          animation.update();
        }
      }
      if (indexDiff) {
        indexPrevious.set(indexCurrent.get());
        indexCurrent.set(target.index);
        eventHandler.emit("select");
      }
    }
    function distance(n, snap) {
      const target = scrollTarget.byDistance(n, snap);
      scrollTo(target);
    }
    function index(n, direction) {
      const targetIndex = indexCurrent.clone().set(n);
      const target = scrollTarget.byIndex(targetIndex.get(), direction);
      scrollTo(target);
    }
    const self = {
      distance,
      index
    };
    return self;
  }
  function SlideFocus(root, slides, slideRegistry, scrollTo, scrollBody, eventStore) {
    let lastTabPressTime = 0;
    function init() {
      eventStore.add(document, "keydown", registerTabPress, false);
      slides.forEach(addSlideFocusEvent);
    }
    function registerTabPress(event) {
      if (event.code === "Tab")
        lastTabPressTime = (/* @__PURE__ */ new Date()).getTime();
    }
    function addSlideFocusEvent(slide) {
      const focus = () => {
        const nowTime = (/* @__PURE__ */ new Date()).getTime();
        const diffTime = nowTime - lastTabPressTime;
        if (diffTime > 10)
          return;
        root.scrollLeft = 0;
        const index = slides.indexOf(slide);
        const group = slideRegistry.findIndex((group2) => group2.includes(index));
        if (!isNumber(group))
          return;
        scrollBody.useDuration(0);
        scrollTo.index(group, 0);
      };
      eventStore.add(slide, "focus", focus, {
        passive: true,
        capture: true
      });
    }
    const self = {
      init
    };
    return self;
  }
  function Vector1D(initialValue) {
    let value = initialValue;
    function get() {
      return value;
    }
    function set(n) {
      value = normalizeInput(n);
    }
    function add2(n) {
      value += normalizeInput(n);
    }
    function subtract(n) {
      value -= normalizeInput(n);
    }
    function normalizeInput(n) {
      return isNumber(n) ? n : n.get();
    }
    const self = {
      get,
      set,
      add: add2,
      subtract
    };
    return self;
  }
  function Translate(axis, direction, container) {
    const translate = axis.scroll === "x" ? x : y;
    const containerStyle = container.style;
    let disabled = false;
    function x(n) {
      return `translate3d(${n}px,0px,0px)`;
    }
    function y(n) {
      return `translate3d(0px,${n}px,0px)`;
    }
    function to(target) {
      if (disabled)
        return;
      containerStyle.transform = translate(direction.apply(target));
    }
    function toggleActive(active) {
      disabled = !active;
    }
    function clear() {
      if (disabled)
        return;
      containerStyle.transform = "";
      if (!container.getAttribute("style"))
        container.removeAttribute("style");
    }
    const self = {
      clear,
      to,
      toggleActive
    };
    return self;
  }
  function SlideLooper(axis, direction, viewSize, contentSize, slideSizes, slideSizesWithGaps, snaps, scrollSnaps, offsetLocation, slides) {
    const roundingSafety = 0.5;
    const ascItems = arrayKeys(slideSizesWithGaps);
    const descItems = arrayKeys(slideSizesWithGaps).reverse();
    const loopPoints = startPoints().concat(endPoints());
    function removeSlideSizes(indexes, from) {
      return indexes.reduce((a2, i2) => {
        return a2 - slideSizesWithGaps[i2];
      }, from);
    }
    function slidesInGap(indexes, gap) {
      return indexes.reduce((a2, i2) => {
        const remainingGap = removeSlideSizes(a2, gap);
        return remainingGap > 0 ? a2.concat([i2]) : a2;
      }, []);
    }
    function findSlideBounds(offset) {
      return snaps.map((snap, index) => ({
        start: snap - slideSizes[index] + roundingSafety + offset,
        end: snap + viewSize - roundingSafety + offset
      }));
    }
    function findLoopPoints(indexes, offset, isEndEdge) {
      const slideBounds = findSlideBounds(offset);
      return indexes.map((index) => {
        const initial = isEndEdge ? 0 : -contentSize;
        const altered = isEndEdge ? contentSize : 0;
        const boundEdge = isEndEdge ? "end" : "start";
        const loopPoint = slideBounds[index][boundEdge];
        return {
          index,
          slideLocation: Vector1D(-1),
          translate: Translate(axis, direction, slides[index]),
          target: () => offsetLocation.get() > loopPoint ? initial : altered
        };
      });
    }
    function startPoints() {
      const gap = scrollSnaps[0] - 1;
      const indexes = slidesInGap(descItems, gap);
      return findLoopPoints(indexes, contentSize, false);
    }
    function endPoints() {
      const gap = viewSize - scrollSnaps[0] - 1;
      const indexes = slidesInGap(ascItems, gap);
      return findLoopPoints(indexes, -contentSize, true);
    }
    function canLoop() {
      return loopPoints.every(({
        index
      }) => {
        const otherIndexes = ascItems.filter((i2) => i2 !== index);
        return removeSlideSizes(otherIndexes, viewSize) <= 0.1;
      });
    }
    function loop() {
      loopPoints.forEach((loopPoint) => {
        const {
          target,
          translate,
          slideLocation
        } = loopPoint;
        const shiftLocation = target();
        if (shiftLocation === slideLocation.get())
          return;
        translate.to(shiftLocation);
        slideLocation.set(shiftLocation);
      });
    }
    function clear() {
      loopPoints.forEach((loopPoint) => loopPoint.translate.clear());
    }
    const self = {
      canLoop,
      clear,
      loop,
      loopPoints
    };
    return self;
  }
  function SlidesHandler(container, eventHandler, watchSlides) {
    let mutationObserver;
    let destroyed = false;
    function init(emblaApi) {
      if (!watchSlides)
        return;
      function defaultCallback(mutations) {
        for (const mutation of mutations) {
          if (mutation.type === "childList") {
            emblaApi.reInit();
            eventHandler.emit("slidesChanged");
            break;
          }
        }
      }
      mutationObserver = new MutationObserver((mutations) => {
        if (destroyed)
          return;
        if (isBoolean(watchSlides) || watchSlides(emblaApi, mutations)) {
          defaultCallback(mutations);
        }
      });
      mutationObserver.observe(container, {
        childList: true
      });
    }
    function destroy() {
      if (mutationObserver)
        mutationObserver.disconnect();
      destroyed = true;
    }
    const self = {
      init,
      destroy
    };
    return self;
  }
  function SlidesInView(container, slides, eventHandler, threshold) {
    const intersectionEntryMap = {};
    let inViewCache = null;
    let notInViewCache = null;
    let intersectionObserver;
    let destroyed = false;
    function init() {
      intersectionObserver = new IntersectionObserver((entries) => {
        if (destroyed)
          return;
        entries.forEach((entry) => {
          const index = slides.indexOf(entry.target);
          intersectionEntryMap[index] = entry;
        });
        inViewCache = null;
        notInViewCache = null;
        eventHandler.emit("slidesInView");
      }, {
        root: container.parentElement,
        threshold
      });
      slides.forEach((slide) => intersectionObserver.observe(slide));
    }
    function destroy() {
      if (intersectionObserver)
        intersectionObserver.disconnect();
      destroyed = true;
    }
    function createInViewList(inView) {
      return objectKeys(intersectionEntryMap).reduce((list, slideIndex) => {
        const index = parseInt(slideIndex);
        const {
          isIntersecting
        } = intersectionEntryMap[index];
        const inViewMatch = inView && isIntersecting;
        const notInViewMatch = !inView && !isIntersecting;
        if (inViewMatch || notInViewMatch)
          list.push(index);
        return list;
      }, []);
    }
    function get(inView = true) {
      if (inView && inViewCache)
        return inViewCache;
      if (!inView && notInViewCache)
        return notInViewCache;
      const slideIndexes = createInViewList(inView);
      if (inView)
        inViewCache = slideIndexes;
      if (!inView)
        notInViewCache = slideIndexes;
      return slideIndexes;
    }
    const self = {
      init,
      destroy,
      get
    };
    return self;
  }
  function SlideSizes(axis, containerRect, slideRects, slides, readEdgeGap, ownerWindow) {
    const {
      measureSize,
      startEdge,
      endEdge
    } = axis;
    const withEdgeGap = slideRects[0] && readEdgeGap;
    const startGap = measureStartGap();
    const endGap = measureEndGap();
    const slideSizes = slideRects.map(measureSize);
    const slideSizesWithGaps = measureWithGaps();
    function measureStartGap() {
      if (!withEdgeGap)
        return 0;
      const slideRect = slideRects[0];
      return mathAbs(containerRect[startEdge] - slideRect[startEdge]);
    }
    function measureEndGap() {
      if (!withEdgeGap)
        return 0;
      const style = ownerWindow.getComputedStyle(arrayLast(slides));
      return parseFloat(style.getPropertyValue(`margin-${endEdge}`));
    }
    function measureWithGaps() {
      return slideRects.map((rect, index, rects) => {
        const isFirst = !index;
        const isLast = index === arrayLastIndex(rects);
        if (isFirst)
          return slideSizes[index] + startGap;
        if (isLast)
          return slideSizes[index] + endGap;
        return rects[index + 1][startEdge] - rect[startEdge];
      }).map(mathAbs);
    }
    const self = {
      slideSizes,
      slideSizesWithGaps,
      startGap,
      endGap
    };
    return self;
  }
  function SlidesToScroll(axis, direction, viewSize, slidesToScroll, loop, containerRect, slideRects, startGap, endGap) {
    const {
      startEdge,
      endEdge
    } = axis;
    const groupByNumber = isNumber(slidesToScroll);
    function byNumber(array, groupSize) {
      return arrayKeys(array).filter((i2) => i2 % groupSize === 0).map((i2) => array.slice(i2, i2 + groupSize));
    }
    function bySize(array) {
      if (!array.length)
        return [];
      return arrayKeys(array).reduce((groups, rectB) => {
        const rectA = arrayLast(groups) || 0;
        const isFirst = rectA === 0;
        const isLast = rectB === arrayLastIndex(array);
        const edgeA = containerRect[startEdge] - slideRects[rectA][startEdge];
        const edgeB = containerRect[startEdge] - slideRects[rectB][endEdge];
        const gapA = !loop && isFirst ? direction.apply(startGap) : 0;
        const gapB = !loop && isLast ? direction.apply(endGap) : 0;
        const chunkSize = mathAbs(edgeB - gapB - (edgeA + gapA));
        if (chunkSize > viewSize)
          groups.push(rectB);
        if (isLast)
          groups.push(array.length);
        return groups;
      }, []).map((currentSize, index, groups) => {
        const previousSize = Math.max(groups[index - 1] || 0);
        return array.slice(previousSize, currentSize);
      });
    }
    function groupSlides(array) {
      return groupByNumber ? byNumber(array, slidesToScroll) : bySize(array);
    }
    const self = {
      groupSlides
    };
    return self;
  }
  function Engine(root, container, slides, ownerDocument, ownerWindow, options, eventHandler, animations) {
    const {
      align,
      axis: scrollAxis,
      direction: contentDirection,
      startIndex,
      loop,
      duration,
      dragFree,
      dragThreshold,
      inViewThreshold,
      slidesToScroll: groupSlides,
      skipSnaps,
      containScroll,
      watchResize,
      watchSlides,
      watchDrag
    } = options;
    const containerRect = container.getBoundingClientRect();
    const slideRects = slides.map((slide) => slide.getBoundingClientRect());
    const direction = Direction(contentDirection);
    const axis = Axis(scrollAxis, contentDirection);
    const viewSize = axis.measureSize(containerRect);
    const percentOfView = PercentOfView(viewSize);
    const alignment = Alignment(align, viewSize);
    const containSnaps = !loop && !!containScroll;
    const readEdgeGap = loop || !!containScroll;
    const {
      slideSizes,
      slideSizesWithGaps,
      startGap,
      endGap
    } = SlideSizes(axis, containerRect, slideRects, slides, readEdgeGap, ownerWindow);
    const slidesToScroll = SlidesToScroll(axis, direction, viewSize, groupSlides, loop, containerRect, slideRects, startGap, endGap);
    const {
      snaps,
      snapsAligned
    } = ScrollSnaps(axis, alignment, containerRect, slideRects, slidesToScroll);
    const contentSize = -arrayLast(snaps) + arrayLast(slideSizesWithGaps);
    const {
      snapsContained,
      scrollContainLimit
    } = ScrollContain(viewSize, contentSize, snapsAligned, containScroll);
    const scrollSnaps = containSnaps ? snapsContained : snapsAligned;
    const {
      limit
    } = ScrollLimit(contentSize, scrollSnaps, loop);
    const index = Counter(arrayLastIndex(scrollSnaps), startIndex, loop);
    const indexPrevious = index.clone();
    const slideIndexes = arrayKeys(slides);
    const update = ({
      dragHandler,
      scrollBody: scrollBody2,
      scrollBounds,
      eventHandler: eventHandler2,
      animation: animation2,
      options: {
        loop: loop2
      }
    }) => {
      const pointerDown = dragHandler.pointerDown();
      if (!loop2)
        scrollBounds.constrain(pointerDown);
      const hasSettled = scrollBody2.seek().settled();
      if (hasSettled && !pointerDown) {
        animation2.stop();
        eventHandler2.emit("settle");
      }
      if (!hasSettled)
        eventHandler2.emit("scroll");
    };
    const render = ({
      scrollBody: scrollBody2,
      translate,
      location: location2,
      offsetLocation: offsetLocation2,
      scrollLooper,
      slideLooper,
      options: {
        loop: loop2
      }
    }, lagOffset) => {
      const velocity = scrollBody2.velocity();
      offsetLocation2.set(location2.get() - velocity + velocity * lagOffset);
      if (loop2) {
        scrollLooper.loop(scrollBody2.direction());
        slideLooper.loop();
      }
      translate.to(offsetLocation2.get());
    };
    const animation = {
      start: () => animations.start(engine),
      stop: () => animations.stop(engine),
      update: () => update(engine),
      render: (lagOffset) => render(engine, lagOffset)
    };
    const friction = 0.68;
    const startLocation = scrollSnaps[index.get()];
    const location = Vector1D(startLocation);
    const offsetLocation = Vector1D(startLocation);
    const target = Vector1D(startLocation);
    const scrollBody = ScrollBody(location, target, duration, friction);
    const scrollTarget = ScrollTarget(loop, scrollSnaps, contentSize, limit, target);
    const scrollTo = ScrollTo(animation, index, indexPrevious, scrollTarget, scrollBody, target, eventHandler);
    const scrollProgress = ScrollProgress(limit);
    const eventStore = EventStore();
    const slidesInView = SlidesInView(container, slides, eventHandler, inViewThreshold);
    const {
      slideRegistry
    } = SlideRegistry(viewSize, contentSize, containSnaps, scrollContainLimit, slidesToScroll, slideIndexes);
    const slideFocus = SlideFocus(root, slides, slideRegistry, scrollTo, scrollBody, eventStore);
    const engine = {
      ownerDocument,
      ownerWindow,
      eventHandler,
      containerRect,
      slideRects,
      animation,
      axis,
      direction,
      dragHandler: DragHandler(axis, direction, root, ownerDocument, ownerWindow, target, DragTracker(axis, ownerWindow), location, animation, scrollTo, scrollBody, scrollTarget, index, eventHandler, percentOfView, dragFree, dragThreshold, skipSnaps, friction, watchDrag),
      eventStore,
      percentOfView,
      index,
      indexPrevious,
      limit,
      location,
      offsetLocation,
      options,
      resizeHandler: ResizeHandler(container, eventHandler, ownerWindow, slides, axis, watchResize),
      scrollBody,
      scrollBounds: ScrollBounds(limit, location, target, scrollBody, percentOfView),
      scrollLooper: ScrollLooper(contentSize, limit, offsetLocation, [location, offsetLocation, target]),
      scrollProgress,
      scrollSnapList: scrollSnaps.map(scrollProgress.get),
      scrollSnaps,
      scrollTarget,
      scrollTo,
      slideLooper: SlideLooper(axis, direction, viewSize, contentSize, slideSizes, slideSizesWithGaps, snaps, scrollSnaps, offsetLocation, slides),
      slideFocus,
      slidesHandler: SlidesHandler(container, eventHandler, watchSlides),
      slidesInView,
      slideIndexes,
      slideRegistry,
      slidesToScroll,
      target,
      translate: Translate(axis, direction, container)
    };
    return engine;
  }
  function Animations(ownerWindow) {
    const timeStep = 1e3 / 60;
    let engines = [];
    let lastTimeStamp = null;
    let lag = 0;
    let animationFrame = 0;
    function animate(timeStamp) {
      if (!lastTimeStamp)
        lastTimeStamp = timeStamp;
      const elapsed = timeStamp - lastTimeStamp;
      lastTimeStamp = timeStamp;
      lag += elapsed;
      while (lag >= timeStep) {
        engines.forEach(({
          animation
        }) => animation.update());
        lag -= timeStep;
      }
      const lagOffset = mathAbs(lag / timeStep);
      engines.forEach(({
        animation
      }) => animation.render(lagOffset));
      if (animationFrame)
        ownerWindow.requestAnimationFrame(animate);
    }
    function start(engine) {
      if (!engines.includes(engine))
        engines.push(engine);
      if (animationFrame)
        return;
      animationFrame = ownerWindow.requestAnimationFrame(animate);
    }
    function stop(engine) {
      engines = engines.filter((e) => e !== engine);
      if (engines.length)
        return;
      ownerWindow.cancelAnimationFrame(animationFrame);
      lastTimeStamp = null;
      lag = 0;
      animationFrame = 0;
    }
    function reset() {
      lastTimeStamp = null;
      lag = 0;
    }
    const self = {
      start,
      stop,
      reset,
      window: ownerWindow
    };
    return self;
  }
  function EventHandler() {
    const listeners = {};
    let api;
    function init(emblaApi) {
      api = emblaApi;
    }
    function getListeners(evt) {
      return listeners[evt] || [];
    }
    function emit(evt) {
      getListeners(evt).forEach((e) => e(api, evt));
      return self;
    }
    function on(evt, cb) {
      listeners[evt] = getListeners(evt).concat([cb]);
      return self;
    }
    function off(evt, cb) {
      listeners[evt] = getListeners(evt).filter((e) => e !== cb);
      return self;
    }
    const self = {
      init,
      emit,
      off,
      on
    };
    return self;
  }
  var defaultOptions = {
    align: "center",
    axis: "x",
    container: null,
    slides: null,
    containScroll: "trimSnaps",
    direction: "ltr",
    slidesToScroll: 1,
    inViewThreshold: 0,
    breakpoints: {},
    dragFree: false,
    dragThreshold: 10,
    loop: false,
    skipSnaps: false,
    duration: 25,
    startIndex: 0,
    active: true,
    watchDrag: true,
    watchResize: true,
    watchSlides: true
  };
  function OptionsHandler(ownerWindow) {
    function mergeOptions(optionsA, optionsB) {
      return objectsMergeDeep(optionsA, optionsB || {});
    }
    function optionsAtMedia(options) {
      const optionsAtMedia2 = options.breakpoints || {};
      const matchedMediaOptions = objectKeys(optionsAtMedia2).filter((media) => ownerWindow.matchMedia(media).matches).map((media) => optionsAtMedia2[media]).reduce((a2, mediaOption) => mergeOptions(a2, mediaOption), {});
      return mergeOptions(options, matchedMediaOptions);
    }
    function optionsMediaQueries(optionsList) {
      return optionsList.map((options) => objectKeys(options.breakpoints || {})).reduce((acc, mediaQueries) => acc.concat(mediaQueries), []).map(ownerWindow.matchMedia);
    }
    const self = {
      mergeOptions,
      optionsAtMedia,
      optionsMediaQueries
    };
    return self;
  }
  function PluginsHandler(optionsHandler) {
    let activePlugins = [];
    function init(emblaApi, plugins) {
      activePlugins = plugins.filter(({
        options
      }) => optionsHandler.optionsAtMedia(options).active !== false);
      activePlugins.forEach((plugin) => plugin.init(emblaApi, optionsHandler));
      return plugins.reduce((map, plugin) => Object.assign(map, {
        [plugin.name]: plugin
      }), {});
    }
    function destroy() {
      activePlugins = activePlugins.filter((plugin) => plugin.destroy());
    }
    const self = {
      init,
      destroy
    };
    return self;
  }
  function EmblaCarousel(root, userOptions, userPlugins) {
    const ownerDocument = root.ownerDocument;
    const ownerWindow = ownerDocument.defaultView;
    const optionsHandler = OptionsHandler(ownerWindow);
    const pluginsHandler = PluginsHandler(optionsHandler);
    const mediaHandlers = EventStore();
    const documentVisibleHandler = EventStore();
    const eventHandler = EventHandler();
    const {
      animationRealms
    } = EmblaCarousel;
    const {
      mergeOptions,
      optionsAtMedia,
      optionsMediaQueries
    } = optionsHandler;
    const {
      on,
      off,
      emit
    } = eventHandler;
    const reInit = reActivate;
    let destroyed = false;
    let engine;
    let optionsBase = mergeOptions(defaultOptions, EmblaCarousel.globalOptions);
    let options = mergeOptions(optionsBase);
    let pluginList = [];
    let pluginApis;
    let container;
    let slides;
    function storeElements() {
      const {
        container: userContainer,
        slides: userSlides
      } = options;
      const customContainer = isString(userContainer) ? root.querySelector(userContainer) : userContainer;
      container = customContainer || root.children[0];
      const customSlides = isString(userSlides) ? container.querySelectorAll(userSlides) : userSlides;
      slides = [].slice.call(customSlides || container.children);
    }
    function createEngine(options2, animations) {
      const engine2 = Engine(root, container, slides, ownerDocument, ownerWindow, options2, eventHandler, animations);
      if (options2.loop && !engine2.slideLooper.canLoop()) {
        const optionsWithoutLoop = Object.assign({}, options2, {
          loop: false
        });
        return createEngine(optionsWithoutLoop, animations);
      }
      return engine2;
    }
    function activate(withOptions, withPlugins) {
      if (destroyed)
        return;
      const animationRealm = animationRealms.find((a2) => a2.window === ownerWindow);
      const animations = animationRealm || Animations(ownerWindow);
      if (!animationRealm)
        animationRealms.push(animations);
      optionsBase = mergeOptions(optionsBase, withOptions);
      options = optionsAtMedia(optionsBase);
      pluginList = withPlugins || pluginList;
      storeElements();
      engine = createEngine(options, animations);
      optionsMediaQueries([optionsBase, ...pluginList.map(({
        options: options2
      }) => options2)]).forEach((query) => mediaHandlers.add(query, "change", reActivate));
      if (!options.active)
        return;
      engine.translate.to(engine.location.get());
      engine.slidesInView.init();
      engine.slideFocus.init();
      engine.eventHandler.init(self);
      engine.resizeHandler.init(self);
      engine.slidesHandler.init(self);
      documentVisibleHandler.add(ownerDocument, "visibilitychange", () => {
        if (ownerDocument.hidden)
          animations.reset();
      });
      if (engine.options.loop)
        engine.slideLooper.loop();
      if (container.offsetParent && slides.length)
        engine.dragHandler.init(self);
      pluginApis = pluginsHandler.init(self, pluginList);
    }
    function reActivate(withOptions, withPlugins) {
      const startIndex = selectedScrollSnap();
      deActivate();
      activate(mergeOptions({
        startIndex
      }, withOptions), withPlugins);
      eventHandler.emit("reInit");
    }
    function deActivate() {
      engine.dragHandler.destroy();
      engine.animation.stop();
      engine.eventStore.clear();
      engine.translate.clear();
      engine.slideLooper.clear();
      engine.resizeHandler.destroy();
      engine.slidesHandler.destroy();
      pluginsHandler.destroy();
      mediaHandlers.clear();
      documentVisibleHandler.clear();
    }
    function destroy() {
      if (destroyed)
        return;
      destroyed = true;
      mediaHandlers.clear();
      deActivate();
      eventHandler.emit("destroy");
    }
    function scrollTo(index, jump, direction) {
      if (!options.active || destroyed)
        return;
      engine.scrollBody.useBaseFriction().useDuration(jump ? 0 : options.duration);
      engine.scrollTo.index(index, direction || 0);
    }
    function scrollNext(jump) {
      const next = engine.index.add(1).get();
      scrollTo(next, jump === true, -1);
    }
    function scrollPrev(jump) {
      const prev = engine.index.add(-1).get();
      scrollTo(prev, jump === true, 1);
    }
    function canScrollNext() {
      const next = engine.index.add(1).get();
      return next !== selectedScrollSnap();
    }
    function canScrollPrev() {
      const prev = engine.index.add(-1).get();
      return prev !== selectedScrollSnap();
    }
    function scrollSnapList() {
      return engine.scrollSnapList;
    }
    function scrollProgress() {
      return engine.scrollProgress.get(engine.location.get());
    }
    function selectedScrollSnap() {
      return engine.index.get();
    }
    function previousScrollSnap() {
      return engine.indexPrevious.get();
    }
    function slidesInView() {
      return engine.slidesInView.get();
    }
    function slidesNotInView() {
      return engine.slidesInView.get(false);
    }
    function plugins() {
      return pluginApis;
    }
    function internalEngine() {
      return engine;
    }
    function rootNode() {
      return root;
    }
    function containerNode() {
      return container;
    }
    function slideNodes() {
      return slides;
    }
    const self = {
      canScrollNext,
      canScrollPrev,
      containerNode,
      internalEngine,
      destroy,
      off,
      on,
      emit,
      plugins,
      previousScrollSnap,
      reInit,
      rootNode,
      scrollNext,
      scrollPrev,
      scrollProgress,
      scrollSnapList,
      scrollTo,
      selectedScrollSnap,
      slideNodes,
      slidesInView,
      slidesNotInView
    };
    activate(userOptions, userPlugins);
    setTimeout(() => eventHandler.emit("init"), 0);
    return self;
  }
  EmblaCarousel.animationRealms = [];
  EmblaCarousel.globalOptions = void 0;

  // ../../node_modules/.pnpm/qvp@0.3.2/node_modules/qvp/index.js
  var i = function(t2) {
    if (Array.isArray(t2))
      return t2.forEach(i);
    if (!("id" in t2)) {
      for (let s of ["onenter", "onexit", "oninit", "onresize"])
        if (s in t2)
          throw new Error('qvp: Missing an "id" reference');
      return Object.entries(t2).forEach(([s, o]) => {
        let c = typeof t2[s];
        if (c === "string")
          return i({ id: s, query: o });
        throw new TypeError(`qvp: Invalid query type. Expected "string" received "${c}"`);
      });
    }
    let n = g(t2), { id: r } = n.screen;
    i.viewports.size || addEventListener("resize", u(() => {
      i.viewports.forEach((s) => {
        s.screen.active && s.onresize(window.innerWidth);
      });
    }, 25), true), i.viewports.has(r) ? console.warn(`qvp: The id "${r}" is already defined, use qvp.add() instead.`) : i.viewports.set(r, n);
  };
  i.viewports = /* @__PURE__ */ new Map();
  Object.defineProperty(i, "isTouch", { get() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  } });
  i.get = (e) => i.viewports.has(e) ? i.viewports.get(e) : false;
  i.add = (e, t2) => {
    let n = i.get(e);
    if (n === false)
      return console.error(`qvp: There is no viewport using an id of "${e}"`);
    f(t2, n.screen), n.screen.test.matches && n.onenter();
  };
  i.off = (e, t2) => {
    let n = i.get(e.split(":")[0]);
    if (n === false || !(e in n.events))
      return;
    let r = n.events[e].length;
    if (typeof t2 == "number")
      t2 <= r - 1 && n.events[e].splice(t2, 1);
    else if (typeof t2 == "function") {
      let s = [];
      for (let o = 0; o < r; o++)
        n.events[e][o] !== t2 && s.push(n.events[e][o]);
      s.length > 0 && (n.events[e] = s);
    } else
      delete n.events[e];
  };
  i.on = (e, t2, n) => {
    let [r, s] = e.split(":"), o = i.get(r);
    if (o === false)
      return;
    e in o.events || (o.events[e] = []);
    let c = n ? t2.bind(n) : t2;
    return c["qvp:event"] = o.events[e].length, o.events[e].push(c), o.screen.test.matches ? s === "oninit" ? c.call() : (s === "onenter" && c.call(), f({ [s]: c }, o.screen)) : f({ [s]: c }, o.screen), c["qvp:event"];
  };
  i.list = (e) => {
    let t2 = Array.from(i.viewports.values()).map(({ screen: n }) => n);
    return e ? t2.filter(({ id: n }) => e.includes(n)) : t2;
  };
  i.active = (e) => {
    let t2 = i.list();
    if (e) {
      let r = i.get(e);
      return r ? r.screen.active : false;
    }
    let n = t2.filter(({ active: r }) => r === true);
    return n.length > 1 ? n : n[0];
  };
  i.test = (e, t2 = ",") => typeof e == "string" ? e.indexOf(t2) > -1 ? e.split(t2).some(i.active) : !!i.active(e) : e.some(i.active);
  i.remove = (e) => {
    i.viewports.has(e) && (i.viewports.get(e).destroy(), i.viewports.delete(e));
  };
  i.destroy = () => {
    removeEventListener("resize", u()), i.viewports.forEach((e) => e.destroy()), i.viewports.clear();
  };
  i.screens = () => {
    throw Error("qvp: The qvp.screens() is deprecated, use the default import, e.g: qvp(...)");
  };
  function u(e, t2) {
    let n = t2;
    return function() {
      let r = () => {
        n = null, e.apply(this, arguments);
      };
      n && cancelAnimationFrame(n), n = requestAnimationFrame(r);
    };
  }
  function f(e, t2) {
    typeof e.onenter == "function" && ("qvp:event" in e.onenter || (e.onenter["qvp:event"] = NaN), t2.onenter.add(e.onenter)), typeof e.onexit == "function" && ("qvp:event" in e.onexit || (e.onexit["qvp:event"] = NaN), t2.onexit.add(e.onexit)), typeof e.onresize == "function" && ("qvp:event" in e.onresize || (e.onresize["qvp:event"] = NaN), t2.onresize.add(e.onresize)), typeof e.oninit == "function" && ("qvp:event" in e.oninit || (e.oninit["qvp:event"] = NaN), t2.oninit.add(e.oninit));
  }
  function a(e, ...t2) {
    let n = i.get(e.split(":")[0]);
    if (n !== false && e in n.events)
      for (let r = 0; r < n.events[e].length && (n.events[e][r].apply(null, t2), e.endsWith(":oninit") && i.off(e, r), e in n.events); r++)
        ;
  }
  function g(e) {
    let t2 = e.query || "all", n = { id: e.id, query: t2, active: false, test: matchMedia(t2), onenter: /* @__PURE__ */ new Set(), onexit: /* @__PURE__ */ new Set(), onresize: /* @__PURE__ */ new Set(), oninit: /* @__PURE__ */ new Set(), events: /* @__PURE__ */ Object.create(null) };
    f(e, n);
    let r = () => {
      n.oninit.size > 0 && (n.oninit.forEach((v) => !isNaN(v["qvp:event"]) || v()), a(`${e.id}:oninit`), n.oninit.clear()), n.onenter.forEach((v) => !isNaN(v["qvp:event"]) || v()), a(`${e.id}:onenter`), n.active = true;
    }, s = () => {
      n.onexit.forEach((v) => !isNaN(v["qvp:event"]) || v()), a(`${e.id}:onexit`), n.active = false;
    }, o = (v) => {
      n.onresize.forEach((d) => !isNaN(d["qvp:event"]) || d()), a(`${e.id}:onresize`, v);
    }, c = ({ matches: v }) => v ? r() : s(), p = () => {
      for (let v in n.events)
        delete n.events[v];
      n.test.removeEventListener("change", c);
    };
    return n.test.addEventListener("change", c), n.test.matches && r(), { onenter: r, onexit: s, onresize: o, destroy: p, get screen() {
      return n;
    }, get events() {
      return n.events;
    } };
  }
  var l = i;

  // demo/views/carousel/controller.ts
  var Carousel = class extends Controller {
    constructor() {
      super(...arguments);
      /**
       * Timeout Throttle for navs
       */
      this.timeout = null;
    }
    /**
     * Whether or not the carousel should be enabled
     */
    get enabled() {
      return this.hasBreakpointValue ? l.test(this.breakpointValue, "|") : true;
    }
    get selector() {
      return this.hasSlideshowTarget ? this.slideshowTarget : this.element;
    }
    /* -------------------------------------------- */
    /* STIMULUS LIFECYCLE                           */
    /* -------------------------------------------- */
    /**
     * Stimulus Initialize
     */
    initialize() {
      this.active = false;
    }
    /**
     * Stimulus Connect
     */
    connect() {
      if (this.enabled && !this.active)
        this.screen();
    }
    /**
     * Stimulus Disconnect
     */
    disconnect() {
      if (this.active && this.enabled)
        this.carousel.destroy();
    }
    /* -------------------------------------------- */
    /* METHODS                                      */
    /* -------------------------------------------- */
    screen() {
      if (!this.active && this.enabled) {
        this.active = true;
        this.carousel = EmblaCarousel(this.selector, {
          align: this.alignValue,
          dragFree: this.dragFreeValue,
          watchDrag: this.watchDragValue,
          skipSnaps: this.skipSnapsValue,
          containScroll: this.containScrollValue,
          duration: this.durationValue,
          startIndex: this.startIndexValue,
          loop: this.loopValue
        });
      } else if (this.active && !this.enabled) {
        this.carousel.destroy();
        this.active = false;
      }
    }
    /* -------------------------------------------- */
    /* STIMULUS EVENTS                              */
    /* -------------------------------------------- */
    /**
     * Carousel - Next
     */
    next() {
      this.carousel.scrollNext();
    }
    /**
     * Carousel - Previous
     */
    prev() {
      this.carousel.scrollPrev();
    }
    /**
     * Carousel - Goto
     *
     * Goto Slide
     */
    goto({ target }) {
      const slide = Number(target.id);
      for (const button of target.parentElement.children) {
        if (button.classList.contains("active"))
          button.classList.remove("active");
        if (button.id === `${slide}`) {
          button.classList.add("active");
        }
      }
      this.carousel.scrollTo(slide);
    }
  };
  /**
   * Stimulus Values
   */
  Carousel.values = {
    breakpoint: String,
    align: {
      type: String,
      default: "start"
    },
    axis: {
      type: String,
      default: "x"
    },
    dragFree: {
      type: Boolean,
      default: true
    },
    watchDrag: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: true
    },
    skipSnaps: {
      type: Boolean,
      default: false
    },
    containScroll: {
      type: String,
      default: "keepSnaps"
    },
    startIndex: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 10
    }
  };
  /**
   * Stimulus Targets
   */
  Carousel.targets = [
    "slideshow",
    "nav"
  ];

  // demo/bundle.ts
  onInit();
  onSearch();
  function onInit() {
    const stimulus = Application.start();
    const controllers = {
      Accordion,
      Modal,
      Dropdown,
      Carousel,
      Collapse
    };
    for (const id in controllers) {
      stimulus.register(id.toLowerCase(), controllers[id]);
    }
  }
  function onSearch() {
    const sidebar = document.querySelector("#sidebar");
    const items = Array.from(sidebar.querySelectorAll("a")).map((a2) => a2.id.toLowerCase());
    const search = document.querySelector("#search-input");
    const anchors = document.querySelectorAll(".anchor");
    anchors.forEach((link) => {
      link.onclick = (e) => {
        e.preventDefault();
        anchors.forEach((item) => {
          if (item.classList.contains("fw-bold")) {
            item.classList.remove("fw-bold");
          }
        });
        link.classList.add("fw-bold");
        const anchor = document.querySelector("#" + link.href.split("#").pop());
        scrollBy({
          behavior: "smooth",
          top: anchor.getBoundingClientRect().top - 80
        });
      };
    });
    search.addEventListener("input", function(event) {
      const target = event.target;
      if (target.value) {
        console.log(target.value);
        const hash = items.filter((value) => {
          return value.indexOf(target.value) > -1;
        });
        const slug = "#" + hash[0].replace(" ", "-");
        const qs = document.querySelector(slug);
        if (qs) {
          scrollBy({
            behavior: "instant",
            top: qs.getBoundingClientRect().top - 80
          });
        }
      }
    });
    stickybits_es_default("#sidebar");
    stickybits_es_default("#search");
  }
  var modalButton = document.querySelector("#btn-modal-1");
  modalButton.addEventListener("click", () => {
    const m = document.querySelector("#modal-example");
    m.classList.add("is-open");
  });
})();
/*! Bundled license information:

stickybits/dist/stickybits.es.js:
  (**
    stickybits - Stickybits is a lightweight alternative to `position: sticky` polyfills
    @version v3.7.11
    @link https://github.com/yowainwright/stickybits#readme
    @author Jeff Wainwright <yowainwright@gmail.com> (https://jeffry.in)
    @license MIT
  **)
*/
