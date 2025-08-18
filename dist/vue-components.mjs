import { defineComponent as S, useSlots as D, createElementBlock as d, openBlock as u, normalizeClass as w, createCommentVNode as f, createElementVNode as b, withModifiers as L, renderSlot as k, mergeModels as O, useModel as F, withDirectives as j, vModelDynamic as H, toDisplayString as h, Fragment as P, ref as N, computed as R, createVNode as M, withCtx as T, Transition as q, renderList as U, createBlock as G, mergeProps as J, vShow as K } from "vue";
const Q = ["disabled"], W = ["disabled"], X = { class: "content" }, Y = ["disabled"], Z = /* @__PURE__ */ S({
  __name: "Button",
  props: {
    variant: { default: "default" },
    disabled: { type: [Boolean, String] },
    before: {},
    after: {}
  },
  emits: {
    clickBefore(e) {
      return e;
    },
    click(e) {
      return e;
    },
    clickAfter(e) {
      return e;
    }
  },
  setup(e, { emit: p }) {
    const c = D(), s = p;
    return (o, n) => (u(), d("button", {
      class: w(["ui-button", o.variant, { disabled: o.disabled }]),
      disabled: o.disabled,
      onClick: n[2] || (n[2] = (t) => s("click", t))
    }, [
      c?.before ? (u(), d("button", {
        key: 0,
        class: "before",
        disabled: o.before?.disabled || o.disabled === "all",
        onClick: n[0] || (n[0] = L((t) => s("clickBefore", t), ["prevent", "stop"]))
      }, [
        k(o.$slots, "before", {}, void 0, !0)
      ], 8, W)) : f("", !0),
      b("div", X, [
        k(o.$slots, "default", {}, void 0, !0)
      ]),
      c?.after ? (u(), d("button", {
        key: 1,
        class: "after",
        disabled: o.after?.disabled || o.disabled === "all",
        onClick: n[1] || (n[1] = L((t) => s("clickAfter", t), ["prevent", "stop"]))
      }, [
        k(o.$slots, "after", {}, void 0, !0)
      ], 8, Y)) : f("", !0)
    ], 10, Q));
  }
}), B = (e, p) => {
  const c = e.__vccOpts || e;
  for (const [s, o] of p)
    c[s] = o;
  return c;
}, z = /* @__PURE__ */ B(Z, [["__scopeId", "data-v-6fe51add"]]), x = {
  key: 0,
  class: "before"
}, ee = ["type", "placeholder", "min", "max", "maxlength"], te = {
  key: 3,
  class: "after"
}, oe = /* @__PURE__ */ S({
  __name: "Input",
  props: /* @__PURE__ */ O({
    type: { default: "text" },
    disabled: { type: Boolean },
    placeholder: {},
    min: {},
    max: {}
  }, {
    value: {},
    valueModifiers: {}
  }),
  emits: /* @__PURE__ */ O({
    input(e) {
      return e;
    },
    change(e) {
      return e;
    },
    focus(e) {
      return e;
    },
    blur(e) {
      return e;
    }
  }, ["update:value"]),
  setup(e, { emit: p }) {
    const c = D(), s = F(e, "value", {
      set(t) {
        const { type: l, min: a, max: g } = n;
        return l !== "number" ? t : t < a ? a : t > g ? g : t;
      }
    }), o = p, n = e;
    return (t, l) => (u(), d("label", {
      class: w(["ui-input", t.type])
    }, [
      c?.before ? (u(), d("div", x, [
        k(t.$slots, "before", {}, void 0, !0)
      ])) : f("", !0),
      t.type === "number" ? (u(), d("div", {
        key: 1,
        class: "number-btn l",
        onClick: l[0] || (l[0] = (a) => s.value = Number(s.value) - 1)
      }, "-")) : f("", !0),
      j(b("input", {
        type: t.type,
        "onUpdate:modelValue": l[1] || (l[1] = (a) => s.value = a),
        placeholder: t.placeholder,
        min: t.min,
        max: t.max,
        maxlength: t.max,
        onInput: l[2] || (l[2] = (a) => o("input", a)),
        onChange: l[3] || (l[3] = (a) => o("change", a)),
        onFocus: l[4] || (l[4] = (a) => o("focus", a)),
        onBlur: l[5] || (l[5] = (a) => o("blur", a))
      }, null, 40, ee), [
        [H, s.value]
      ]),
      t.type === "number" ? (u(), d("div", {
        key: 2,
        class: "number-btn r",
        onClick: l[6] || (l[6] = (a) => s.value = Number(s.value) + 1)
      }, "+")) : f("", !0),
      c?.after ? (u(), d("div", te, [
        k(t.$slots, "after", {}, void 0, !0)
      ])) : f("", !0)
    ], 2));
  }
}), ne = /* @__PURE__ */ B(oe, [["__scopeId", "data-v-08c61395"]]), le = { key: 0 }, se = { key: 1 }, re = /* @__PURE__ */ S({
  __name: "SelectOption",
  props: {
    option: {}
  },
  emits: {
    click(e, p) {
      return { event: e, option: p };
    }
  },
  setup(e, { emit: p }) {
    const c = p, s = e;
    function o(n) {
      s.option?.disabled || c("click", n, s.option);
    }
    return (n, t) => (u(), d("div", {
      class: w(["option", n.option?.type || "default", { disabled: n.option?.disabled }]),
      onClick: o
    }, [
      n.option?.type === "option" || !n.option?.type ? (u(), d("div", le, [
        b("div", null, h(n.option?.label || n.option?.value), 1),
        b("div", null, h(n.option?.text), 1)
      ])) : n.option?.type === "label" ? (u(), d("span", se, h(n.option?.value), 1)) : n.option?.type === "separator" ? (u(), d(P, { key: 2 }, [], 64)) : f("", !0)
    ], 2));
  }
}), V = /* @__PURE__ */ B(re, [["__scopeId", "data-v-fa8fede0"]]), ie = { class: "options" }, ae = /* @__PURE__ */ S({
  __name: "Select",
  props: {
    placeholder: {},
    disabled: { type: Boolean },
    options: {}
  },
  emits: {
    select(e) {
      return e;
    }
  },
  setup(e, { emit: p }) {
    const c = p, s = e, o = N(!1), n = N(), t = R(() => s.options?.find((r) => (r?.type === "option" || !r?.type) && r?.value === n.value) || null);
    function l(r) {
      r?.type === "label" || r?.type === "separator" || (n.value = r?.value, o.value = !1, c("select", r));
    }
    function a(r, v) {
      const { width: i, top: y, bottom: m, y: E, x: C } = r?.getBoundingClientRect(), { width: $, height: I } = v?.getBoundingClientRect(), A = I + m > window.innerHeight;
      console.log(i, $, (i - $) / 2), v.style.width = `${i}px`, v.style.top = `${A ? y - I - 8 : m}px`, v.style.setProperty("--width", `${i}px`);
    }
    function g(r) {
      o.value = !0;
      const v = r.target?.parentElement, i = v?.parentElement, y = i?.querySelector(".options"), m = () => {
        if (!o.value)
          return document.removeEventListener("scroll", m);
        a(v, y);
      };
      setTimeout(m, 10);
      const E = () => {
        window.addEventListener("click", (C) => {
          const $ = C?.path || (C.composedPath ? C.composedPath() : void 0);
          if ($ && $.includes(i)) return E();
          o.value = !1, document.removeEventListener("scroll", m);
        }, { once: !0 }), document.removeEventListener("scroll", m), document.addEventListener("scroll", m);
      };
      setTimeout(() => E(), 10);
    }
    return (r, v) => (u(), d("div", {
      class: w(["ui-select", { selected: !!t.value }])
    }, [
      M(z, {
        variant: "outline",
        disabled: r.disabled,
        onClick: g
      }, {
        default: T(() => [
          b("span", null, h(t.value ? t.value?.label || t.value?.value : r.placeholder), 1),
          b("div", null, h(o.value ? "-" : "+"), 1)
        ]),
        _: 1
      }, 8, ["disabled"]),
      M(q, { name: "show-select-options" }, {
        default: T(() => [
          j(b("div", ie, [
            (u(!0), d(P, null, U(r.options, (i, y) => (u(), d(P, { key: y }, [
              i?.type === "label" || i?.type === "separator" || i?.useDefaultStyle === !0 ? (u(), G(V, {
                key: 0,
                option: i,
                onClick: (m) => l(i)
              }, null, 8, ["option", "onClick"])) : k(r.$slots, "option", J({
                key: 1,
                ref_for: !0
              }, { option: i, index: y, select: () => l(i) }), () => [
                M(V, {
                  option: i,
                  onClick: (m) => l(i)
                }, null, 8, ["option", "onClick"])
              ], !0)
            ], 64))), 128))
          ], 512), [
            [K, o.value]
          ])
        ]),
        _: 3
      })
    ], 2));
  }
}), ue = /* @__PURE__ */ B(ae, [["__scopeId", "data-v-6a13bc25"]]), _ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: z,
  Input: ne,
  Select: ue
}, Symbol.toStringTag, { value: "Module" })), pe = {
  install(e) {
    for (const p in _) {
      const c = _[p];
      e.component(p, c);
    }
  },
  ..._
};
export {
  pe as default
};
