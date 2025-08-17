import { createElementBlock as s, openBlock as l, renderSlot as _ } from "vue";
const a = (t, o) => {
  const e = t.__vccOpts || t;
  for (const [c, r] of o)
    e[c] = r;
  return e;
}, u = {}, f = { class: "ui-button" };
function i(t, o) {
  return l(), s("button", f, [
    _(t.$slots, "default")
  ]);
}
const p = /* @__PURE__ */ a(u, [["render", i]]), n = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: p
}, Symbol.toStringTag, { value: "Module" })), m = {
  install(t) {
    for (const o in n) {
      const e = n[o];
      t.component(o, e);
    }
  },
  ...n
};
export {
  m as default
};
