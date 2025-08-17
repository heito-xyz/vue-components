import { defineComponent as k, useSlots as y, createElementBlock as a, openBlock as d, normalizeClass as $, createCommentVNode as p, createElementVNode as g, withModifiers as v, renderSlot as m, mergeModels as c, useModel as C, withDirectives as M, vModelDynamic as I } from "vue";
const S = ["disabled"], N = ["disabled"], O = { class: "content" }, V = ["disabled"], j = /* @__PURE__ */ k({
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
  setup(e, { emit: i }) {
    const l = y(), r = i;
    return (o, u) => (d(), a("button", {
      class: $(["ui-button", o.variant, { disabled: o.disabled }]),
      disabled: o.disabled,
      onClick: u[2] || (u[2] = (t) => r("click", t))
    }, [
      l?.before ? (d(), a("button", {
        key: 0,
        class: "before",
        disabled: o.before?.disabled || o.disabled === "all",
        onClick: u[0] || (u[0] = v((t) => r("clickBefore", t), ["prevent", "stop"]))
      }, [
        m(o.$slots, "before", {}, void 0, !0)
      ], 8, N)) : p("", !0),
      g("div", O, [
        m(o.$slots, "default", {}, void 0, !0)
      ]),
      l?.after ? (d(), a("button", {
        key: 1,
        class: "after",
        disabled: o.after?.disabled || o.disabled === "all",
        onClick: u[1] || (u[1] = v((t) => r("clickAfter", t), ["prevent", "stop"]))
      }, [
        m(o.$slots, "after", {}, void 0, !0)
      ], 8, V)) : p("", !0)
    ], 10, S));
  }
}), B = (e, i) => {
  const l = e.__vccOpts || e;
  for (const [r, o] of i)
    l[r] = o;
  return l;
}, w = /* @__PURE__ */ B(j, [["__scopeId", "data-v-ca97c18d"]]), z = {
  key: 0,
  class: "before"
}, A = ["type", "placeholder", "min", "max", "maxlength"], D = {
  key: 3,
  class: "after"
}, E = /* @__PURE__ */ k({
  __name: "Input",
  props: /* @__PURE__ */ c({
    type: { default: "text" },
    disabled: { type: Boolean },
    placeholder: {},
    min: {},
    max: {}
  }, {
    value: {},
    valueModifiers: {}
  }),
  emits: /* @__PURE__ */ c({
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
  setup(e, { emit: i }) {
    const l = y(), r = C(e, "value", {
      set(t) {
        const { type: n, min: s, max: f } = u;
        return n !== "number" ? t : t < s ? s : t > f ? f : t;
      }
    }), o = i, u = e;
    return (t, n) => (d(), a("label", {
      class: $(["ui-input", t.type])
    }, [
      l?.before ? (d(), a("div", z, [
        m(t.$slots, "before", {}, void 0, !0)
      ])) : p("", !0),
      t.type === "number" ? (d(), a("div", {
        key: 1,
        class: "number-btn l",
        onClick: n[0] || (n[0] = (s) => r.value = Number(r.value) - 1)
      }, "-")) : p("", !0),
      M(g("input", {
        type: t.type,
        "onUpdate:modelValue": n[1] || (n[1] = (s) => r.value = s),
        placeholder: t.placeholder,
        min: t.min,
        max: t.max,
        maxlength: t.max,
        onInput: n[2] || (n[2] = (s) => o("input", s)),
        onChange: n[3] || (n[3] = (s) => o("change", s)),
        onFocus: n[4] || (n[4] = (s) => o("focus", s)),
        onBlur: n[5] || (n[5] = (s) => o("blur", s))
      }, null, 40, A), [
        [I, r.value]
      ]),
      t.type === "number" ? (d(), a("div", {
        key: 2,
        class: "number-btn r",
        onClick: n[6] || (n[6] = (s) => r.value = Number(r.value) + 1)
      }, "+")) : p("", !0),
      l?.after ? (d(), a("div", D, [
        m(t.$slots, "after", {}, void 0, !0)
      ])) : p("", !0)
    ], 2));
  }
}), F = /* @__PURE__ */ B(E, [["__scopeId", "data-v-08c61395"]]), b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: w,
  Input: F
}, Symbol.toStringTag, { value: "Module" })), T = {
  install(e) {
    for (const i in b) {
      const l = b[i];
      e.component(i, l);
    }
  },
  ...b
};
export {
  T as default
};
