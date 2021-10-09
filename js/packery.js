!function(t) {
  function e(t) {
      return new RegExp("(^|\\s+)" + t + "(\\s+|$)")
  }
  function i(t, e) {
      var i = o(t, e) ? r : s;
      i(t, e)
  }
  var o, s, r;
  "classList"in document.documentElement ? (o = function(t, e) {
      return t.classList.contains(e)
  }
  ,
  s = function(t, e) {
      t.classList.add(e)
  }
  ,
  r = function(t, e) {
      t.classList.remove(e)
  }
  ) : (o = function(t, i) {
      return e(i).test(t.className)
  }
  ,
  s = function(t, e) {
      o(t, e) || (t.className = t.className + " " + e)
  }
  ,
  r = function(t, i) {
      t.className = t.className.replace(e(i), " ")
  }
  );
  var n = {
      hasClass: o,
      addClass: s,
      removeClass: r,
      toggleClass: i,
      has: o,
      add: s,
      remove: r,
      toggle: i
  };
  "function" == typeof define && define.amd ? define("classie/classie", n) : "object" == typeof exports ? module.exports = n : t.classie = n
}(window),
function(t, e) {
  "function" == typeof define && define.amd ? define("packery/js/rect", e) : "object" == typeof exports ? module.exports = e() : (t.Packery = t.Packery || {},
  t.Packery.Rect = e())
}(window, function() {
  function t(e) {
      for (var i in t.defaults)
          this[i] = t.defaults[i];
      for (i in e)
          this[i] = e[i]
  }
  var e = window.Packery = function() {}
  ;
  return e.Rect = t,
  t.defaults = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
  },
  t.prototype.contains = function(t) {
      var e = t.width || 0
        , i = t.height || 0;
      return this.x <= t.x && this.y <= t.y && this.x + this.width >= t.x + e && this.y + this.height >= t.y + i
  }
  ,
  t.prototype.overlaps = function(t) {
      var e = this.x + this.width
        , i = this.y + this.height
        , o = t.x + t.width
        , s = t.y + t.height;
      return this.x < o && e > t.x && this.y < s && i > t.y
  }
  ,
  t.prototype.getMaximalFreeRects = function(e) {
      if (!this.overlaps(e))
          return !1;
      var i, o = [], s = this.x + this.width, r = this.y + this.height, n = e.x + e.width, a = e.y + e.height;
      return this.y < e.y && (i = new t({
          x: this.x,
          y: this.y,
          width: this.width,
          height: e.y - this.y
      }),
      o.push(i)),
      s > n && (i = new t({
          x: n,
          y: this.y,
          width: s - n,
          height: this.height
      }),
      o.push(i)),
      r > a && (i = new t({
          x: this.x,
          y: a,
          width: this.width,
          height: r - a
      }),
      o.push(i)),
      this.x < e.x && (i = new t({
          x: this.x,
          y: this.y,
          width: e.x - this.x,
          height: this.height
      }),
      o.push(i)),
      o
  }
  ,
  t.prototype.canFit = function(t) {
      return this.width >= t.width && this.height >= t.height
  }
  ,
  t
}),
function(t, e) {
  if ("function" == typeof define && define.amd)
      define("packery/js/packer", ["./rect"], e);
  else if ("object" == typeof exports)
      module.exports = e(require("./rect"));
  else {
      var i = t.Packery = t.Packery || {};
      i.Packer = e(i.Rect)
  }
}(window, function(t) {
  function e(t, e, i) {
      this.width = t || 0,
      this.height = e || 0,
      this.sortDirection = i || "downwardLeftToRight",
      this.reset()
  }
  e.prototype.reset = function() {
      this.spaces = [],
      this.newSpaces = [];
      var e = new t({
          x: 0,
          y: 0,
          width: this.width,
          height: this.height
      });
      this.spaces.push(e),
      this.sorter = i[this.sortDirection] || i.downwardLeftToRight
  }
  ,
  e.prototype.pack = function(t) {
      for (var e = 0, i = this.spaces.length; i > e; e++) {
          var o = this.spaces[e];
          if (o.canFit(t)) {
              this.placeInSpace(t, o);
              break
          }
      }
  }
  ,
  e.prototype.placeInSpace = function(t, e) {
      t.x = e.x,
      t.y = e.y,
      this.placed(t)
  }
  ,
  e.prototype.placed = function(t) {
      for (var e = [], i = 0, o = this.spaces.length; o > i; i++) {
          var s = this.spaces[i]
            , r = s.getMaximalFreeRects(t);
          r ? e.push.apply(e, r) : e.push(s)
      }
      this.spaces = e,
      this.mergeSortSpaces()
  }
  ,
  e.prototype.mergeSortSpaces = function() {
      e.mergeRects(this.spaces),
      this.spaces.sort(this.sorter)
  }
  ,
  e.prototype.addSpace = function(t) {
      this.spaces.push(t),
      this.mergeSortSpaces()
  }
  ,
  e.mergeRects = function(t) {
      for (var e = 0, i = t.length; i > e; e++) {
          var o = t[e];
          if (o) {
              var s = t.slice(0);
              s.splice(e, 1);
              for (var r = 0, n = 0, a = s.length; a > n; n++) {
                  var h = s[n]
                    , p = e > n ? 0 : 1;
                  o.contains(h) && (t.splice(n + p - r, 1),
                  r++)
              }
          }
      }
      return t
  }
  ;
  var i = {
      downwardLeftToRight: function(t, e) {
          return t.y - e.y || t.x - e.x
      },
      rightwardTopToBottom: function(t, e) {
          return t.x - e.x || t.y - e.y
      }
  };
  return e
}),
function(t, e) {
  "function" == typeof define && define.amd ? define("packery/js/item", ["get-style-property/get-style-property", "outlayer/outlayer", "./rect"], e) : "object" == typeof exports ? module.exports = e(require("desandro-get-style-property"), require("outlayer"), require("./rect")) : t.Packery.Item = e(t.getStyleProperty, t.Outlayer, t.Packery.Rect)
}(window, function(t, e, i) {
  var o = t("transform")
    , s = function() {
      e.Item.apply(this, arguments)
  };
  s.prototype = new e.Item;
  var r = s.prototype._create;
  return s.prototype._create = function() {
      r.call(this),
      this.rect = new i,
      this.placeRect = new i
  }
  ,
  s.prototype.dragStart = function() {
      this.getPosition(),
      this.removeTransitionStyles(),
      this.isTransitioning && o && (this.element.style[o] = "none"),
      this.getSize(),
      this.isPlacing = !0,
      this.needsPositioning = !1,
      this.positionPlaceRect(this.position.x, this.position.y),
      this.isTransitioning = !1,
      this.didDrag = !1
  }
  ,
  s.prototype.dragMove = function(t, e) {
      this.didDrag = !0;
      var i = this.layout.size;
      t -= i.paddingLeft,
      e -= i.paddingTop,
      this.positionPlaceRect(t, e)
  }
  ,
  s.prototype.dragStop = function() {
      this.getPosition();
      var t = this.position.x != this.placeRect.x
        , e = this.position.y != this.placeRect.y;
      this.needsPositioning = t || e,
      this.didDrag = !1
  }
  ,
  s.prototype.positionPlaceRect = function(t, e, i) {
      this.placeRect.x = this.getPlaceRectCoord(t, !0),
      this.placeRect.y = this.getPlaceRectCoord(e, !1, i)
  }
  ,
  s.prototype.getPlaceRectCoord = function(t, e, i) {
      var o = e ? "Width" : "Height"
        , s = this.size["outer" + o]
        , r = this.layout[e ? "columnWidth" : "rowHeight"]
        , n = this.layout.size["inner" + o];
      e || (n = Math.max(n, this.layout.maxY),
      this.layout.rowHeight || (n -= this.layout.gutter));
      var a;
      if (r) {
          r += this.layout.gutter,
          n += e ? this.layout.gutter : 0,
          t = Math.round(t / r);
          var h;
          h = this.layout.options.isHorizontal ? e ? "ceil" : "floor" : e ? "floor" : "ceil";
          var p = Math[h](n / r);
          p -= Math.ceil(s / r),
          a = p
      } else
          a = n - s;
      return t = i ? t : Math.min(t, a),
      t *= r || 1,
      Math.max(0, t)
  }
  ,
  s.prototype.copyPlaceRectPosition = function() {
      this.rect.x = this.placeRect.x,
      this.rect.y = this.placeRect.y
  }
  ,
  s.prototype.removeElem = function() {
      this.element.parentNode.removeChild(this.element),
      this.layout.packer.addSpace(this.rect),
      this.emitEvent("remove", [this])
  }
  ,
  s
}),
function(t, e) {
  "function" == typeof define && define.amd ? define("packery/js/packery", ["classie/classie", "get-size/get-size", "outlayer/outlayer", "./rect", "./packer", "./item"], e) : "object" == typeof exports ? module.exports = e(require("desandro-classie"), require("get-size"), require("outlayer"), require("./rect"), require("./packer"), require("./item")) : t.Packery = e(t.classie, t.getSize, t.Outlayer, t.Packery.Rect, t.Packery.Packer, t.Packery.Item)
}(window, function(t, e, i, o, s, r) {
  function n(t, e) {
      return t.position.y - e.position.y || t.position.x - e.position.x
  }
  function a(t, e) {
      return t.position.x - e.position.x || t.position.y - e.position.y
  }
  o.prototype.canFit = function(t) {
      return this.width >= t.width - 1 && this.height >= t.height - 1
  }
  ;
  var h = i.create("packery");
  return h.Item = r,
  h.prototype._create = function() {
      i.prototype._create.call(this),
      this.packer = new s,
      this.stamp(this.options.stamped);
      var t = this;
      this.handleDraggabilly = {
          dragStart: function() {
              t.itemDragStart(this.element)
          },
          dragMove: function() {
              t.itemDragMove(this.element, this.position.x, this.position.y)
          },
          dragEnd: function() {
              t.itemDragEnd(this.element)
          }
      },
      this.handleUIDraggable = {
          start: function(e) {
              t.itemDragStart(e.currentTarget)
          },
          drag: function(e, i) {
              t.itemDragMove(e.currentTarget, i.position.left, i.position.top)
          },
          stop: function(e) {
              t.itemDragEnd(e.currentTarget)
          }
      }
  }
  ,
  h.prototype._resetLayout = function() {
      this.getSize(),
      this._getMeasurements();
      var t = this.packer;
      this.options.isHorizontal ? (t.width = Number.POSITIVE_INFINITY,
      t.height = this.size.innerHeight + this.gutter,
      t.sortDirection = "rightwardTopToBottom") : (t.width = this.size.innerWidth + this.gutter,
      t.height = Number.POSITIVE_INFINITY,
      t.sortDirection = "downwardLeftToRight"),
      t.reset(),
      this.maxY = 0,
      this.maxX = 0
  }
  ,
  h.prototype._getMeasurements = function() {
      this._getMeasurement("columnWidth", "width"),
      this._getMeasurement("rowHeight", "height"),
      this._getMeasurement("gutter", "width")
  }
  ,
  h.prototype._getItemLayoutPosition = function(t) {
      return this._packItem(t),
      t.rect
  }
  ,
  h.prototype._packItem = function(t) {
      this._setRectSize(t.element, t.rect),
      this.packer.pack(t.rect),
      this._setMaxXY(t.rect)
  }
  ,
  h.prototype._setMaxXY = function(t) {
      this.maxX = Math.max(t.x + t.width, this.maxX),
      this.maxY = Math.max(t.y + t.height, this.maxY)
  }
  ,
  h.prototype._setRectSize = function(t, i) {
      var o = e(t)
        , s = o.outerWidth
        , r = o.outerHeight;
      (s || r) && (s = this._applyGridGutter(s, this.columnWidth),
      r = this._applyGridGutter(r, this.rowHeight)),
      i.width = Math.min(s, this.packer.width),
      i.height = Math.min(r, this.packer.height)
  }
  ,
  h.prototype._applyGridGutter = function(t, e) {
      if (!e)
          return t + this.gutter;
      e += this.gutter;
      var i = t % e
        , o = i && 1 > i ? "round" : "ceil";
      return t = Math[o](t / e) * e
  }
  ,
  h.prototype._getContainerSize = function() {
      return this.options.isHorizontal ? {
          width: this.maxX - this.gutter
      } : {
          height: this.maxY - this.gutter
      }
  }
  ,
  h.prototype._manageStamp = function(t) {
      var e, i = this.getItem(t);
      if (i && i.isPlacing)
          e = i.placeRect;
      else {
          var s = this._getElementOffset(t);
          e = new o({
              x: this.options.isOriginLeft ? s.left : s.right,
              y: this.options.isOriginTop ? s.top : s.bottom
          })
      }
      this._setRectSize(t, e),
      this.packer.placed(e),
      this._setMaxXY(e)
  }
  ,
  h.prototype.sortItemsByPosition = function() {
      var t = this.options.isHorizontal ? a : n;
      this.items.sort(t)
  }
  ,
  h.prototype.fit = function(t, e, i) {
      var o = this.getItem(t);
      o && (this._getMeasurements(),
      this.stamp(o.element),
      o.getSize(),
      o.isPlacing = !0,
      e = void 0 === e ? o.rect.x : e,
      i = void 0 === i ? o.rect.y : i,
      o.positionPlaceRect(e, i, !0),
      this._bindFitEvents(o),
      o.moveTo(o.placeRect.x, o.placeRect.y),
      this.layout(),
      this.unstamp(o.element),
      this.sortItemsByPosition(),
      o.isPlacing = !1,
      o.copyPlaceRectPosition())
  }
  ,
  h.prototype._bindFitEvents = function(t) {
      function e() {
          o++,
          2 == o && i.emitEvent("fitComplete", [t])
      }
      var i = this
        , o = 0;
      t.on("layout", function() {
          return e(),
          !0
      }),
      this.on("layoutComplete", function() {
          return e(),
          !0
      })
  }
  ,
  h.prototype.resize = function() {
      var t = e(this.element)
        , i = this.size && t
        , o = this.options.isHorizontal ? "innerHeight" : "innerWidth";
      i && t[o] == this.size[o] || this.layout()
  }
  ,
  h.prototype.itemDragStart = function(t) {
      this.stamp(t);
      var e = this.getItem(t);
      e && e.dragStart()
  }
  ,
  h.prototype.itemDragMove = function(t, e, i) {
      function o() {
          r.layout(),
          delete r.dragTimeout
      }
      var s = this.getItem(t);
      s && s.dragMove(e, i);
      var r = this;
      this.clearDragTimeout(),
      this.dragTimeout = setTimeout(o, 40)
  }
  ,
  h.prototype.clearDragTimeout = function() {
      this.dragTimeout && clearTimeout(this.dragTimeout)
  }
  ,
  h.prototype.itemDragEnd = function(e) {
      var i, o = this.getItem(e);
      if (o && (i = o.didDrag,
      o.dragStop()),
      !o || !i && !o.needsPositioning)
          return void this.unstamp(e);
      t.add(o.element, "is-positioning-post-drag");
      var s = this._getDragEndLayoutComplete(e, o);
      o.needsPositioning ? (o.on("layout", s),
      o.moveTo(o.placeRect.x, o.placeRect.y)) : o && o.copyPlaceRectPosition(),
      this.clearDragTimeout(),
      this.on("layoutComplete", s),
      this.layout()
  }
  ,
  h.prototype._getDragEndLayoutComplete = function(e, i) {
      var o = i && i.needsPositioning
        , s = 0
        , r = o ? 2 : 1
        , n = this;
      return function() {
          return s++,
          s != r ? !0 : (i && (t.remove(i.element, "is-positioning-post-drag"),
          i.isPlacing = !1,
          i.copyPlaceRectPosition()),
          n.unstamp(e),
          n.sortItemsByPosition(),
          o && n.emitEvent("dragItemPositioned", [i]),
          !0)
      }
  }
  ,
  h.prototype.bindDraggabillyEvents = function(t) {
      t.on("dragStart", this.handleDraggabilly.dragStart),
      t.on("dragMove", this.handleDraggabilly.dragMove),
      t.on("dragEnd", this.handleDraggabilly.dragEnd)
  }
  ,
  h.prototype.bindUIDraggableEvents = function(t) {
      t.on("dragstart", this.handleUIDraggable.start).on("drag", this.handleUIDraggable.drag).on("dragstop", this.handleUIDraggable.stop)
  }
  ,
  h.Rect = o,
  h.Packer = s,
  h
}),
function(t, e) {
  "function" == typeof define && define.amd ? define(["isotope/js/layout-mode", "packery/js/packery", "get-size/get-size"], e) : "object" == typeof exports ? module.exports = e(require("isotope-layout/js/layout-mode"), require("packery"), require("get-size")) : e(t.Isotope.LayoutMode, t.Packery, t.getSize)
}(window, function(t, e, i) {
  function o(t, e) {
      for (var i in e)
          t[i] = e[i];
      return t
  }
  var s = t.create("packery")
    , r = s.prototype._getElementOffset
    , n = s.prototype._getMeasurement;
  o(s.prototype, e.prototype),
  s.prototype._getElementOffset = r,
  s.prototype._getMeasurement = n;
  var a = s.prototype._resetLayout;
  s.prototype._resetLayout = function() {
      this.packer = this.packer || new e.Packer,
      a.apply(this, arguments)
  }
  ;
  var h = s.prototype._getItemLayoutPosition;
  s.prototype._getItemLayoutPosition = function(t) {
      return t.rect = t.rect || new e.Rect,
      h.call(this, t)
  }
  ;
  var p = s.prototype._manageStamp;
  return s.prototype._manageStamp = function() {
      this.options.isOriginLeft = this.isotope.options.isOriginLeft,
      this.options.isOriginTop = this.isotope.options.isOriginTop,
      p.apply(this, arguments)
  }
  ,
  s.prototype.needsResizeLayout = function() {
      var t = i(this.element)
        , e = this.size && t
        , o = this.options.isHorizontal ? "innerHeight" : "innerWidth";
      return e && t[o] != this.size[o]
  }
  ,
  s
});
