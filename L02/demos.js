// Interactive demos. Every code panel is copied from notes/L02-python-basics.md (checked by
// tools/check.py). The demos replay that code with a tiny Python subset written in JS
// (ints are BigInt, floats print the way Python prints them), step by step.

const CODE = {
  shellScript: `x = 10
y = 20
x + y           # computed, then thrown away: a script shows nothing for this line
print(x + y)`,
  shellNames: `>>> x = 10
>>> y = 20
>>> x
10
>>> x + y
30
>>> x = 20
>>> print(x)
20`,
  shareObj: `a = 10
b = a
a = 20
print(a, b)`,
  rebindSelf: `>>> x = 2
>>> x = x + 2
>>> print(x)
4`,
  typeChange: `>>> x = 7 * 3 * 2
>>> y = "is the answer to the ultimate question of life"
>>> print(x, y)
42 is the answer to the ultimate question of life
>>> x = x + 3.14159
>>> y = 1232121321312312312312 * 9873423789237438297
>>> print(x, y)
45.14159 12165255965071649871208683630735493412664
>>> type(x), type(y)
(<class 'float'>, <class 'int'>)`,
  pay: `hours = 35.0
rate = 12.5
pay = hours * rate
print(pay)`,
  assignX: `x = 6
x = 100 - 10 + x * 3 - x / 10
print(x)`,
  envDiagram: `x = 1
y = 2
x = y * 2
print(x, y)`,
  cascade: `>>> z = y = x = 2 + 7 + 2
>>> x, y, z
(11, 11, 11)`,
  badSwap: `a = 1
b = 2
a = b
b = a
print(a, b)`,
  tempSwap: `a = 1
b = 2
temp = a
a = b
b = temp
print(a, b)`,
  simSwap: `>>> c = "deepSecret"
>>> o = "you'll never guess"
>>> c, o
('deepSecret', "you'll never guess")
>>> c, o = o, c
>>> c, o
("you'll never guess", 'deepSecret')`,
  augmented: `>>> x = 22
>>> x += 7
>>> x
29
>>> x -= 2 * 7
>>> x
15`,
  divmodTime: `>>> time = 257
>>> SEC_PER_MIN = 60
>>> divmod(time, SEC_PER_MIN)
(4, 17)
>>> minutes, seconds = divmod(time, SEC_PER_MIN)
>>> quarters, cents = divmod(143, 25)
>>> quarters, cents
(5, 18)`,
  hello: `name = input("What is your name? ")
print("Hello,", name)`,
  addInputs: `a = input("First number: ")
b = input("Second number: ")
print(a + b)
print(type(a))`,
  bmi: `weight = float(input("Weight in kg: "))
height = float(input("Height in m: "))
bmi = weight / height ** 2
print("Your BMI is", round(bmi, 1))`,
  friends: `friend1 = input("First friend: ")
friend2 = input("Second friend: ")
print("I am the friend of ", friend1, " and ", friend2, ".", sep="")`,
  hms: `total = int(input("Seconds: "))
minutes, seconds = divmod(total, 60)
hours, minutes = divmod(minutes, 60)
print(total, " seconds is ", hours, ":", minutes, ":", seconds, sep="")`,
  change: `cents = int(input("Amount in cents: "))
quarters, cents = divmod(cents, 25)
dimes, cents = divmod(cents, 10)
nickels, pennies = divmod(cents, 5)
print(quarters, "quarters,", dimes, "dimes,", nickels, "nickels,", pennies, "pennies")`,
};

// ====================================================================================
// A tiny Python: values, a tokenizer, a parser and an evaluator for the expressions and
// statements of this lecture. Values are {t: "int"|"float"|"str"|"tuple"|"type"|"fn"|"none", v}.
// ====================================================================================

class PyError extends Error {
  constructor(kind, msg) { super(msg); this.kind = kind; }
  get text() { return `${this.kind}: ${this.message}`; }
}

const I = (v) => ({ t: "int", v: BigInt(v) });
const F = (v) => ({ t: "float", v });
const S = (v) => ({ t: "str", v });
const NONE = { t: "none" };

function pyFloat(x) {
  if (Number.isNaN(x)) return "nan";
  if (!Number.isFinite(x)) return x > 0 ? "inf" : "-inf";
  if (x === 0) return Object.is(x, -0) ? "-0.0" : "0.0";
  const [m, e] = x.toExponential().split("e");
  const exp = +e;
  const neg = m.startsWith("-");
  const digits = m.replace("-", "").replace(".", "");
  let s;
  if (exp >= -4 && exp < 16) {
    if (exp >= 0) {
      const whole = digits.padEnd(exp + 1, "0");
      const intPart = whole.slice(0, exp + 1), frac = whole.slice(exp + 1);
      s = intPart + "." + (frac || "0");
    } else {
      s = "0." + "0".repeat(-exp - 1) + digits;
    }
  } else {
    const mant = digits.length > 1 ? digits[0] + "." + digits.slice(1) : digits;
    s = mant + "e" + (exp < 0 ? "-" : "+") + String(Math.abs(exp)).padStart(2, "0");
  }
  return (neg ? "-" : "") + s;
}

function pyStrRepr(s) {
  const q = s.includes("'") && !s.includes('"') ? '"' : "'";
  return q + s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").split(q).join(q === "'" ? "\\'" : q) + q;
}

function repr(val) {
  switch (val.t) {
    case "int": return val.v.toString();
    case "float": return pyFloat(val.v);
    case "str": return pyStrRepr(val.v);
    case "tuple": return "(" + val.v.map(repr).join(", ") + (val.v.length === 1 ? ",)" : ")");
    case "type": return `<class '${val.v}'>`;
    case "fn": return `<built-in function ${val.v}>`;
    default: return "None";
  }
}
const pystr = (val) => (val.t === "str" ? val.v : repr(val));
const typeName = (val) => (val.t === "none" ? "NoneType" : val.t === "fn" ? "builtin_function_or_method" : val.t);
const num = (val) => (val.t === "int" ? Number(val.v) : val.v);
const isNum = (val) => val.t === "int" || val.t === "float";

function binop(op, a, b) {
  const unsupported = () => new PyError("TypeError", `unsupported operand type(s) for ${op}: '${typeName(a)}' and '${typeName(b)}'`);
  if (a.t === "str" || b.t === "str") {
    if (op === "+") {
      if (a.t === "str" && b.t === "str") return S(a.v + b.v);
      if (a.t === "str") throw new PyError("TypeError", `can only concatenate str (not "${typeName(b)}") to str`);
      throw unsupported();
    }
    if (op === "*") {
      const [s, n] = a.t === "str" ? [a, b] : [b, a];
      if (n.t !== "int") throw new PyError("TypeError", `can't multiply sequence by non-int of type '${typeName(n)}'`);
      return S(n.v > 0n ? s.v.repeat(Number(n.v)) : "");
    }
    throw unsupported();
  }
  if (!isNum(a) || !isNum(b)) throw unsupported();
  if (a.t === "int" && b.t === "int") {
    const x = a.v, y = b.v;
    switch (op) {
      case "+": return I(x + y);
      case "-": return I(x - y);
      case "*": return I(x * y);
      case "/": if (y === 0n) throw new PyError("ZeroDivisionError", "division by zero"); return F(Number(x) / Number(y));
      case "//": {
        if (y === 0n) throw new PyError("ZeroDivisionError", "integer division or modulo by zero");
        let q = x / y; if (x % y !== 0n && (x < 0n) !== (y < 0n)) q -= 1n; return I(q);
      }
      case "%": {
        if (y === 0n) throw new PyError("ZeroDivisionError", "integer modulo by zero");
        let r = x % y; if (r !== 0n && (r < 0n) !== (y < 0n)) r += y; return I(r);
      }
      case "**": return y >= 0n ? I(x ** y) : F(Math.pow(Number(x), Number(y)));
    }
  }
  const x = num(a), y = num(b);
  switch (op) {
    case "+": return F(x + y);
    case "-": return F(x - y);
    case "*": return F(x * y);
    case "/": if (y === 0) throw new PyError("ZeroDivisionError", "float division by zero"); return F(x / y);
    case "//": if (y === 0) throw new PyError("ZeroDivisionError", "float floor division by zero"); return F(Math.floor(x / y));
    case "%": if (y === 0) throw new PyError("ZeroDivisionError", "float modulo by zero"); return F(x - y * Math.floor(x / y));
    case "**": return F(Math.pow(x, y));
  }
  throw unsupported();
}

const BUILTINS = {
  type: (a) => ({ t: "type", v: typeName(a[0]) }),
  int(a) {
    const x = a[0];
    if (x.t === "int") return x;
    if (x.t === "float") return I(Math.trunc(x.v));
    if (x.t === "str" && /^\s*[+-]?\d+\s*$/.test(x.v)) return I(x.v.trim());
    if (x.t === "str") throw new PyError("ValueError", `invalid literal for int() with base 10: ${pyStrRepr(x.v)}`);
    throw new PyError("TypeError", `int() argument must be a string or a real number, not '${typeName(x)}'`);
  },
  float(a) {
    const x = a[0];
    if (isNum(x)) return F(num(x));
    if (x.t === "str" && /^\s*[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?\s*$/.test(x.v)) return F(parseFloat(x.v));
    if (x.t === "str") throw new PyError("ValueError", `could not convert string to float: ${pyStrRepr(x.v)}`);
    throw new PyError("TypeError", `float() argument must be a string or a real number, not '${typeName(x)}'`);
  },
  str: (a) => S(pystr(a[0])),
  abs: (a) => (a[0].t === "int" ? I(a[0].v < 0n ? -a[0].v : a[0].v) : F(Math.abs(a[0].v))),
  divmod: (a) => ({ t: "tuple", v: [binop("//", a[0], a[1]), binop("%", a[0], a[1])] }),
  round(a) {
    const x = num(a[0]);
    if (a.length < 2) return I(Math.round(x));
    const n = Number(a[1].v);
    return F(Number(x.toFixed(n)));
  },
  add: (a) => binop("+", a[0], a[1]),
  sub: (a) => binop("-", a[0], a[1]),
  mul: (a) => binop("*", a[0], a[1]),
};

// ---------- tokenizer and parser ----------

function tokenize(src) {
  const toks = [];
  const re = /\s*(?:(\d[\d_]*\.\d*(?:[eE][+-]?\d+)?|\.\d+|\d[\d_]*(?:[eE][+-]?\d+)?)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|([A-Za-z_]\w*)|(\*\*|\/\/|[-+*/%(),=]))/y;
  let m;
  let pos = 0;
  while (pos < src.length) {
    if (/^\s*(#.*)?$/.test(src.slice(pos))) break;
    re.lastIndex = pos;
    m = re.exec(src);
    if (!m) throw new PyError("SyntaxError", "invalid syntax");
    const start = m.index + m[0].length - (m[1] || m[2] || m[3] || m[4]).length;
    if (m[1]) toks.push({ k: "num", s: m[1], at: start });
    else if (m[2]) toks.push({ k: "str", s: m[2], at: start });
    else if (m[3]) toks.push({ k: "name", s: m[3], at: start });
    else toks.push({ k: "op", s: m[4], at: start });
    pos = re.lastIndex;
  }
  return toks;
}

const PREC = { "+": 10, "-": 10, "*": 20, "/": 20, "//": 20, "%": 20, "**": 40 };

function parseExpr(src) {
  const toks = tokenize(src);
  let p = 0;
  const peek = () => toks[p];
  const take = (s) => {
    const t = toks[p];
    if (!t || (s && t.s !== s)) throw new PyError("SyntaxError", "invalid syntax");
    p++; return t;
  };
  function atom() {
    const t = take();
    if (t.k === "num") {
      const s = t.s.replace(/_/g, "");
      return { k: "lit", val: /[.eE]/.test(s) ? F(parseFloat(s)) : I(s) };
    }
    if (t.k === "str") return { k: "lit", val: S(t.s.slice(1, -1).replace(/\\n/g, "\n").replace(/\\(.)/g, "$1")) };
    if (t.k === "name") {
      if (peek() && peek().s === "(") {
        take("(");
        const args = [], kw = {};
        while (peek() && peek().s !== ")") {
          if (peek().k === "name" && toks[p + 1] && toks[p + 1].s === "=") { const n = take().s; take("="); kw[n] = expr(0); }
          else args.push(expr(0));
          if (peek() && peek().s === ",") take(",");
        }
        take(")");
        return { k: "call", f: t.s, args, kw };
      }
      return { k: "name", id: t.s };
    }
    if (t.s === "(") { const e = exprList(); take(")"); return { k: "paren", e }; }
    if (t.s === "-") return { k: "neg", e: expr(30) };
    if (t.s === "+") return expr(30);
    throw new PyError("SyntaxError", "invalid syntax");
  }
  function expr(minPrec) {
    let left = atom();
    for (;;) {
      const t = peek();
      if (!t || t.k !== "op" || !(t.s in PREC)) break;
      const pr = PREC[t.s];
      if (pr < minPrec) break;
      take();
      // ** groups to the right, and its right operand may carry a unary minus.
      const right = t.s === "**" ? expr(pr) : expr(pr + 1);
      left = { k: "bin", op: t.s, l: left, r: right };
    }
    return left;
  }
  function exprList() {
    const first = expr(0);
    if (!peek() || peek().s !== ",") return first;
    const items = [first];
    while (peek() && peek().s === ",") { take(","); if (!peek() || peek().s === ")") break; items.push(expr(0)); }
    return { k: "tuple", items };
  }
  const tree = exprList();
  if (p !== toks.length) throw new PyError("SyntaxError", "invalid syntax");
  return tree;
}

// ---------- evaluation ----------

// env: Map name -> value. hooks.call(name, args, kw) may handle print/input.
function evaluate(node, env, hooks = {}) {
  switch (node.k) {
    case "lit": return node.val;
    case "val": return node.val;
    case "name":
      if (env.has(node.id)) return env.get(node.id);
      if (node.id in BUILTINS) return { t: "fn", v: node.id };
      throw new PyError("NameError", `name '${node.id}' is not defined`);
    case "paren": return evaluate(node.e, env, hooks);
    case "neg": {
      const v = evaluate(node.e, env, hooks);
      if (!isNum(v)) throw new PyError("TypeError", `bad operand type for unary -: '${typeName(v)}'`);
      return v.t === "int" ? I(-v.v) : F(-v.v);
    }
    case "bin": return binop(node.op, evaluate(node.l, env, hooks), evaluate(node.r, env, hooks));
    case "tuple": return { t: "tuple", v: node.items.map((e) => evaluate(e, env, hooks)) };
    case "call": {
      const args = node.args.map((e) => evaluate(e, env, hooks));
      const kw = {};
      for (const k in node.kw) kw[k] = evaluate(node.kw[k], env, hooks);
      if (hooks.call) { const r = hooks.call(node.f, args, kw); if (r !== undefined) return r; }
      if (!(node.f in BUILTINS)) throw new PyError("NameError", `name '${node.f}' is not defined`);
      return BUILTINS[node.f](args, kw);
    }
  }
  throw new PyError("SyntaxError", "invalid syntax");
}

// Source text of a node; values print as repr. mark: node to wrap in <mark>.
function toSrc(node, mark, html = true) {
  const w = (n, s) => (html && n === mark ? `<mark>${s}</mark>` : s);
  const e = (s) => (html ? esc(s) : s);
  switch (node.k) {
    case "lit": case "val": return w(node, e(repr(node.val)));
    case "name": return w(node, e(node.id));
    case "paren": return w(node, "(" + toSrc(node.e, mark, html) + ")");
    case "neg": return w(node, "-" + toSrc(node.e, mark, html));
    case "bin": {
      // A negative value on the left of ** needs its parentheses back: (-2) ** 2.
      const negVal = (n) => (n.k === "val" || n.k === "lit") && isNum(n.val) && num(n.val) < 0;
      const l = toSrc(node.l, mark, html);
      return w(node, `${node.op === "**" && negVal(node.l) ? `(${l})` : l} ${e(node.op)} ${toSrc(node.r, mark, html)}`);
    }
    case "tuple": return w(node, node.items.map((x) => toSrc(x, mark, html)).join(", "));
    case "call": {
      const parts = node.args.map((x) => toSrc(x, mark, html));
      for (const k in node.kw) parts.push(`${k}=${toSrc(node.kw[k], mark, html)}`);
      return w(node, `${e(node.f)}(${parts.join(", ")})`);
    }
  }
  return "";
}

// Expression rewriting, one reduction at a time, in Python's order: left operand, right
// operand, then the operator; arguments left to right, then the call.
function rewriteSteps(src, env = new Map()) {
  let tree = parseExpr(src);
  const steps = [];
  const isVal = (n) => n.k === "lit" || n.k === "val";
  const describe = (n, v) => {
    if (n.k === "name") return `Look up <code>${esc(n.id)}</code>: it is bound to <b>${esc(repr(v))}</b>.`;
    if (n.k === "paren") return `The parentheses are done: <b>${esc(repr(v))}</b>.`;
    if (n.k === "neg") return `Negate: <b>${esc(repr(v))}</b>.`;
    if (n.k === "tuple") return `Make a tuple of the values: <b>${esc(repr(v))}</b>.`;
    if (n.k === "call") return `Call <code>${esc(n.f)}</code> on ${n.args.map((a) => `<code>${esc(repr(a.val))}</code>`).join(", ")}: <b>${esc(repr(v))}</b> (${typeName(v)}).`;
    const l = n.l.val, r = n.r.val;
    let why = "";
    if (n.op === "/") why = " <code>/</code> always gives a float.";
    else if (l.t !== r.t && isNum(l) && isNum(r)) why = " An int and a float: the int is converted to float first.";
    else if (l.t === "str" && n.op === "+") why = " <code>+</code> on two strings joins them.";
    return `<code>${esc(toSrc({ ...n, l: n.l, r: n.r }, null, false))}</code> = <b>${esc(repr(v))}</b> (${typeName(v)}).${why}`;
  };
  const preview = (n) => {
    if (n.k === "name") return `look up the name <code>${esc(n.id)}</code>.`;
    if (n.k === "paren") return "the parentheses are a single value now; drop them.";
    if (n.k === "neg") return "negate the value.";
    if (n.k === "tuple") return "every item is evaluated; make the tuple.";
    if (n.k === "call") return `all arguments are values; call <code>${esc(n.f)}</code>.`;
    return `apply <code>${esc(n.op)}</code> to the highlighted operands.`;
  };
  // Find the first reducible node in evaluation order.
  function next(n) {
    if (isVal(n)) return null;
    if (n.k === "lit" || n.k === "name") return n;
    if (n.k === "paren" || n.k === "neg") return isVal(n.e) ? n : next(n.e);
    if (n.k === "bin") return !isVal(n.l) ? next(n.l) : !isVal(n.r) ? next(n.r) : n;
    if (n.k === "tuple") { for (const x of n.items) if (!isVal(x)) return next(x); return n; }
    if (n.k === "call") { for (const x of n.args) if (!isVal(x)) return next(x); return n; }
    return null;
  }
  function replace(n, target, v) {
    if (n === target) return { k: "val", val: v };
    const r = (x) => replace(x, target, v);
    switch (n.k) {
      case "paren": case "neg": return { ...n, e: r(n.e) };
      case "bin": return { ...n, l: r(n.l), r: r(n.r) };
      case "tuple": return { ...n, items: n.items.map(r) };
      case "call": return { ...n, args: n.args.map(r) };
    }
    return n;
  }
  steps.push({ html: toSrc(tree, null), msg: "Start. Each step does the next operation Python would do.", node: null });
  for (let guard = 0; guard < 60; guard++) {
    const n = next(tree);
    if (!n) break;
    // Literals are values already; turn them into values silently.
    if (n.k === "lit") { tree = replace(tree, n, n.val); continue; }
    const before = toSrc(tree, n);
    let v;
    try { v = evaluate(n, env); } catch (err) {
      steps.push({ html: before, msg: `<code>${esc(toSrc(n, null, false))}</code> raises <b>${esc(err.text)}</b>.`, cls: "bad", err: true });
      return steps;
    }
    steps.push({ html: before, msg: `Next: ${preview(n)}`, pending: true });
    tree = replace(tree, n, v);
    steps.push({ html: toSrc(tree, null), msg: describe(n, v), cls: isVal(tree) ? "good" : "" });
  }
  return steps;
}

// ---------- statements ----------

// Run a program (script lines, or a shell session of ">>> " lines) and record snapshots
// of names, objects and output. opts: {stdin: [lines]}.
function runProgram(code, opts = {}) {
  const lines = code.split("\n");
  const shell = lines.some((l) => l.startsWith(">>> "));
  const stdin = (opts.stdin || []).slice();
  const env = new Map(); // name -> value
  const ids = new Map(); // value object -> id
  let nextId = 1;
  const objs = []; // {id, val}
  const out = [""]; // output text, as lines (last line may be partial)
  const snaps = [];
  let temps = []; // objects made during this statement that may end up unnamed
  const idOf = (val) => {
    if (!ids.has(val)) { ids.set(val, nextId++); objs.push({ id: ids.get(val), val }); }
    return ids.get(val);
  };
  const write = (s) => { const parts = s.split("\n"); out[out.length - 1] += parts[0]; for (const p of parts.slice(1)) out.push(p); };
  const hooks = {
    call(f, args, kw) {
      if (f === "print") {
        const sep = kw.sep ? kw.sep.v : " ", end = kw.end ? kw.end.v : "\n";
        write(args.map(pystr).join(sep) + end);
        return NONE;
      }
      if (f === "input") {
        if (args[0]) write(args[0].v);
        const typed = stdin.length ? stdin.shift() : "";
        // What the user types shows on screen after the prompt.
        write(typed + "\n");
        const v = S(typed);
        temps.push(v);
        return v;
      }
      return undefined;
    },
  };
  function snap(line, msg, cls = "", extra = {}) {
    const named = new Set([...env.values()].map(idOf));
    snaps.push({
      line, msg, msgCls: cls,
      names: [...env.entries()].map(([n, v]) => [n, idOf(v)]),
      objs: objs.map((o) => ({ id: o.id, text: repr(o.val), type: typeName(o.val), named: named.has(o.id) })),
      out: out.slice(), hot: extra.hot || [], fresh: extra.fresh || [],
    });
  }
  function collect() {
    // Forget objects nobody names any more (Python frees them).
    const named = new Set([...env.values()].map(idOf));
    for (let k = objs.length - 1; k >= 0; k--) if (!named.has(objs[k].id)) objs.splice(k, 1);
  }
  snap(0, shell ? "An empty global frame. Each step runs one line typed at <code>>>></code>." : "An empty global frame. Python will run the program one line at a time.");
  let ln = 0;
  for (const raw of lines) {
    ln++;
    let src = raw;
    if (shell) { if (!raw.startsWith(">>> ")) continue; src = raw.slice(4); write(">>> " + src + "\n"); }
    const stmt = src.replace(/\s+#.*$/, "").trim();
    if (!stmt || stmt.startsWith("#") || /^(from|import)\b/.test(stmt)) continue;
    collect();
    temps = [];
    try {
      const aug = stmt.match(/^([A-Za-z_]\w*)\s*(\*\*|\/\/|[-+*/%])=\s*(.+)$/);
      // Split "a = b = expr" at top-level "=" signs (not "==", not keyword arguments).
      const parts = splitAssign(stmt);
      if (aug) {
        const [, name, op, rhs] = aug;
        if (!env.has(name)) throw new PyError("NameError", `name '${name}' is not defined`);
        const r = evaluate(parseExpr(rhs), env, hooks);
        const v = binop(op, env.get(name), r);
        const old = env.get(name);
        idOf(v);
        snap(ln, `Right side first: <code>${esc(name)} ${esc(op)} (${esc(rhs)})</code> = <code>${esc(repr(old))} ${esc(op)} ${esc(repr(r))}</code> = <b>${esc(repr(v))}</b>, a new object.`, "", { fresh: [idOf(v)] });
        env.set(name, v);
        snap(ln, `Bind <code>${esc(name)}</code> to it. <code>${esc(name)} ${esc(op)}= …</code> is just <code>${esc(name)} = ${esc(name)} ${esc(op)} (…)</code>.`, "good", { hot: [name] });
      } else if (parts.length > 1) {
        const rhs = parts[parts.length - 1];
        const targets = parts.slice(0, -1).map((t) => t.split(",").map((s) => s.trim()).filter(Boolean));
        for (const t of targets) for (const n of t) if (!/^[A-Za-z_]\w*$/.test(n)) throw new PyError("SyntaxError", `cannot assign to ${/^\d/.test(n) ? "literal" : "expression"}`);
        const tree = parseExpr(rhs);
        const v = evaluate(tree, env, hooks);
        const multi = targets.some((t) => t.length > 1);
        if (multi && v.t === "tuple") v.v.forEach(idOf); else idOf(v);
        const isName = tree.k === "name";
        const tmpIds = temps.filter((t) => t !== v).map(idOf);
        let msg;
        if (multi && v.t === "tuple") msg = `Evaluate <b>every</b> expression on the right first: ${v.v.map((x) => `<code>${esc(repr(x))}</code>`).join(", ")}. No name has moved yet.`;
        else if (isName) msg = `Evaluate the right side: <code>${esc(tree.id)}</code> is bound to <b>${esc(repr(v))}</b>. That is an existing object; no new object is made.`;
        else if (tmpIds.length) msg = `<code>input()</code> returned the <b>string</b> <code>${esc(repr(temps[0]))}</code>; ${tree.k === "call" && tree.f !== "input" ? `<code>${esc(tree.f)}()</code> turned it into <b>${esc(repr(v))}</b> (${typeName(v)}).` : "that is the value."}`;
        else msg = `Evaluate the right side: <code>${esc(rhs)}</code> → <b>${esc(repr(v))}</b> (${typeName(v)}), a new object.`;
        snap(ln, msg, "", { fresh: (multi && v.t === "tuple" ? v.v.map(idOf) : [idOf(v)]).concat(tmpIds) });
        const bound = [];
        for (const t of targets) {
          if (t.length > 1) {
            if (v.t !== "tuple" || v.v.length !== t.length) throw new PyError("ValueError", `not enough values to unpack (expected ${t.length})`);
            t.forEach((n, k) => { env.set(n, v.v[k]); bound.push(n); });
          } else { env.set(t[0], v); bound.push(t[0]); }
        }
        const shared = !multi && bound.length > 1;
        snap(ln, `Bind ${bound.map((n) => `<code>${esc(n)}</code>`).join(shared ? ", " : " and ")}${multi ? ", in order" : ""}.${shared ? " One object, several names." : ""}${isName ? " Two names now refer to the <b>same</b> object." : ""}`, "good", { hot: bound });
      } else {
        const tree = parseExpr(stmt);
        const v = evaluate(tree, env, hooks);
        const isPrint = tree.k === "call" && tree.f === "print";
        if (shell && !isPrint && v.t !== "none") {
          write(repr(v) + "\n");
          snap(ln, `An expression on its own: the shell shows its value, <b>${esc(repr(v))}</b>.`, "good");
        } else if (isPrint) {
          snap(ln, `<code>print</code> writes the values as text${tree.kw.sep ? `, separated by <code>${esc(repr(evaluate(tree.kw.sep, env)))}</code>` : ""}.`, "good");
        } else {
          snap(ln, `Python computes <b>${esc(repr(v))}</b> and throws it away: a script only shows what you <code>print</code>.`, "");
        }
      }
    } catch (err) {
      if (!(err instanceof PyError)) throw err;
      write(err.text + "\n");
      snap(ln, `<b>${esc(err.text)}</b>`, "bad");
      break;
    }
  }
  collect();
  const last = snaps[snaps.length - 1];
  snap(0, "Done. " + (last.msgCls === "bad" ? "The program stopped at the error." : `Final bindings: ${[...env.entries()].map(([n, v]) => `<code>${esc(n)}</code> → ${esc(repr(v))}`).join(", ") || "none"}.`), last.msgCls === "bad" ? "bad" : "good");
  return snaps;
}

function splitAssign(stmt) {
  const parts = [];
  let depth = 0, q = null, cur = "";
  for (let k = 0; k < stmt.length; k++) {
    const c = stmt[k];
    if (q) { cur += c; if (c === q) q = null; continue; }
    if (c === '"' || c === "'") { q = c; cur += c; continue; }
    if (c === "(") depth++;
    if (c === ")") depth--;
    if (c === "=" && depth === 0 && stmt[k + 1] !== "=" && !"<>!=".includes(stmt[k - 1])) { parts.push(cur.trim()); cur = ""; continue; }
    cur += c;
  }
  parts.push(cur.trim());
  return parts;
}

// ====================================================================================
// Players
// ====================================================================================

// Generic step player: el gets controls; render(snap) draws the current step.
function makePlayer(el, opts) {
  const mini = !!opts.mini;
  el.innerHTML = `${opts.top || ""}<div class="pl-body"></div>
    ${mini ? "" : `<div class="msg pl-msg"></div>
    <div class="controls">
      <button class="cbtn pl-reset" title="Back to the start">⟲ Reset</button>
      <button class="cbtn pl-back" title="Step back (←)">◀ Back</button>
      <button class="cbtn pl-step on" title="Step (→)">Step ▶</button>
      <button class="cbtn pl-play">Play</button>
      ${opts.extraControls || ""}
      <span class="spacer"></span><span class="counter pl-count"></span>
    </div>`}`;
  const $ = (s) => el.querySelector(s);
  let snaps = [], i = 0, timer = null;
  function render() {
    const s = snaps[i];
    opts.render($(".pl-body"), s, i, snaps);
    if (mini) return;
    const msg = $(".pl-msg");
    msg.innerHTML = s.msg || "";
    msg.className = "msg pl-msg " + (s.msgCls || s.cls || "");
    $(".pl-count").textContent = `step ${i + 1} / ${snaps.length}`;
    $(".pl-back").disabled = $(".pl-reset").disabled = i === 0;
    $(".pl-step").disabled = i === snaps.length - 1;
  }
  function stop() { clearInterval(timer); timer = null; if (!mini) $(".pl-play").textContent = "Play"; }
  function play() {
    if (timer) return stop();
    if (i === snaps.length - 1) i = 0;
    if (!mini) $(".pl-play").textContent = "Pause";
    timer = setInterval(() => {
      if (i < snaps.length - 1) i++; else if (mini) i = 0; else return stop();
      render();
    }, mini ? 1100 : 800);
  }
  function rebuild() { stop(); snaps = opts.build(); i = 0; if (opts.onBuild) opts.onBuild(el); render(); }
  if (!mini) {
    $(".pl-reset").onclick = () => { stop(); i = 0; render(); };
    $(".pl-back").onclick = () => { stop(); if (i) i--; render(); };
    $(".pl-step").onclick = () => { stop(); if (i < snaps.length - 1) i++; render(); };
    $(".pl-play").onclick = play;
    el.tabIndex = 0;
    el.addEventListener("keydown", (e) => {
      if (["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "ArrowRight") { e.preventDefault(); $(".pl-step").click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); $(".pl-back").click(); }
    });
  }
  if (opts.onMount) opts.onMount(el, rebuild);
  rebuild();
  if (mini) play();
  return { rebuild };
}

// ---------- names-and-objects diagram ----------

function clip(s, n) { return s.length > n ? s.slice(0, n - 1) + "…" : s; }

function namesSVG(s, { compact = false } = {}) {
  const W = 300, rowH = 36, top = 32;
  const names = s.names, objs = s.objs;
  const rows = Math.max(names.length, objs.length, 2);
  const H = top + rows * rowH + 8;
  const fx = 4, fw = 104, ox = 150, ow = 146;
  let g = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="names and objects">`;
  g += `<defs><marker id="nah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--teal)"/></marker>
    <marker id="nahh" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--amber)"/></marker></defs>`;
  g += `<text x="${fx}" y="18" font-size="12" font-weight="600" fill="var(--ink-2)">Global frame</text>`;
  g += `<text x="${ox}" y="18" font-size="12" font-weight="600" fill="var(--ink-2)">Objects</text>`;
  g += `<rect x="${fx}" y="${top - 8}" width="${fw}" height="${rows * rowH}" rx="8" fill="var(--teal-soft)" stroke="var(--teal)" stroke-width="1.2"/>`;
  const oy = {};
  objs.forEach((o, k) => { oy[o.id] = top + k * rowH + rowH / 2 - 4; });
  objs.forEach((o) => {
    const y = oy[o.id];
    const fresh = s.fresh.includes(o.id);
    const dead = !o.named && !fresh;
    const stroke = fresh ? "var(--amber)" : dead ? "var(--line)" : "var(--ink-2)";
    const fill = fresh ? "var(--mark)" : "var(--card)";
    g += `<g opacity="${dead ? 0.45 : 1}"><rect x="${ox}" y="${y - 13}" width="${ow - 40}" height="26" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="${fresh ? 2 : 1.2}" ${dead ? 'stroke-dasharray="4 3"' : ""}/>`;
    g += `<text x="${ox + 8}" y="${y + 5}" font-size="13" fill="var(--ink)">${esc(clip(o.text, 12))}</text>`;
    g += `<text x="${ox + ow - 36}" y="${y + 4}" font-size="10" fill="var(--stone)">${esc(o.type)}</text></g>`;
    if (dead && !compact) g += `<text x="${ox + (ow - 40) / 2}" y="${y + 22}" font-size="8.5" text-anchor="middle" fill="var(--stone)">no name: freed</text>`;
  });
  names.forEach(([n, id], k) => {
    const y = top + k * rowH + rowH / 2 - 4;
    const hot = s.hot.includes(n);
    g += `<text x="${fx + 12}" y="${y + 5}" font-size="14" font-weight="${hot ? 700 : 500}" fill="${hot ? "var(--amber)" : "var(--ink)"}">${esc(clip(n, 8))}</text>`;
    g += `<rect x="${fx + fw - 26}" y="${y - 9}" width="18" height="18" rx="3" fill="var(--card)" stroke="var(--stone)"/>`;
    g += `<circle cx="${fx + fw - 17}" cy="${y}" r="3" fill="${hot ? "var(--amber)" : "var(--teal)"}"/>`;
    const ty = oy[id];
    const x1 = fx + fw - 17, x2 = ox - 2;
    g += `<path d="M ${x1} ${y} C ${x1 + 30} ${y}, ${x2 - 30} ${ty}, ${x2} ${ty}" fill="none" stroke="${hot ? "var(--amber)" : "var(--teal)"}" stroke-width="${hot ? 2.2 : 1.6}" marker-end="url(#${hot ? "nahh" : "nah"})"/>`;
  });
  if (!names.length) g += `<text x="${fx + fw / 2}" y="${top + 18}" font-size="11" text-anchor="middle" fill="var(--stone)">(no names yet)</text>`;
  return g + "</svg>";
}

// Code panel lines: for a shell session, only the ">>>" lines are shown.
function shownCode(code) {
  const lines = code.split("\n");
  if (!lines.some((l) => l.startsWith(">>> "))) return { text: code, map: (n) => n };
  const keep = [];
  lines.forEach((l, k) => { if (l.startsWith(">>> ")) keep.push(k + 1); });
  return { text: keep.map((n) => lines[n - 1]).join("\n"), map: (n) => keep.indexOf(n) + 1 };
}

// Names-and-objects stepper over a list of presets {label, code, stdin?}.
function demoNames(el, presets, { mini = false, stdinBox = false } = {}) {
  let cur = presets[0];
  let stdin = (cur.stdin || []).join(", ");
  const select = presets.length > 1 ? `<label>program <select class="nm-p">${presets.map((p, k) => `<option value="${k}">${esc(p.label)}</option>`).join("")}</select></label>` : "";
  const box = stdinBox ? `<label>user types <input type="text" class="nm-in" value="${esc(stdin)}" style="width:120px" title="Comma-separated lines the user types"></label>` : "";
  makePlayer(el, {
    mini,
    top: `<div class="stepper nm${mini ? " mini" : ""}"><div><div class="nm-code"></div>${mini ? "" : `<div class="counter" style="margin-top:10px">output</div><div class="console nm-out" style="margin-top:4px"></div>`}</div><div class="stack-wrap nm-diag"></div></div>`,
    extraControls: select + box,
    build: () => runProgram(cur.code, { stdin: stdinBox ? stdin.split(",").map((x) => x.trim()) : cur.stdin }),
    onBuild(root) {
      const sc = shownCode(cur.code);
      root.querySelector(".nm-code").innerHTML = codeBlock(mini ? sc.text.replace(/\s+#.*$/gm, "") : sc.text, sc.text.startsWith(">>>") ? "repl" : "py");
      root._map = sc.map;
    },
    render(body, s) {
      const root = body.parentElement;
      root.querySelectorAll(".nm-code .ln").forEach((ln, k) => ln.classList.toggle("hl", s.line > 0 && k + 1 === root._map(s.line)));
      root.querySelector(".nm-diag").innerHTML = namesSVG(s, { compact: mini });
      const o = root.querySelector(".nm-out");
      if (o) { o.textContent = s.out.join("\n").replace(/\n$/, ""); o.scrollTop = o.scrollHeight; }
    },
    onMount(root, rebuild) {
      if (mini) return;
      const sel = root.querySelector(".nm-p");
      if (sel) sel.onchange = (e) => {
        cur = presets[+e.target.value];
        stdin = (cur.stdin || []).join(", ");
        const inp = root.querySelector(".nm-in");
        if (inp) inp.value = stdin;
        rebuild();
      };
      const inp = root.querySelector(".nm-in");
      if (inp) inp.onchange = (e) => { stdin = e.target.value; rebuild(); };
    },
  });
}

// ---------- shell vs script ----------

function demoShellScript(el) {
  let mode = "script";
  const shellCode = ">>> x = 10\n>>> y = 20\n>>> x + y\n30\n>>> print(x + y)\n30";
  makePlayer(el, {
    top: `<div class="stepper"><div><div class="ss-code"></div></div><div><div class="counter">what you see on the screen</div><div class="console ss-out" style="margin-top:4px;min-height:9em"></div></div></div>`,
    extraControls: `<label>run it as <select class="ss-m"><option value="script">a script (hello.py)</option><option value="shell">lines typed in the shell</option></select></label>`,
    build: () => runProgram(mode === "shell" ? shellCode : CODE.shellScript),
    onBuild(root) {
      const sc = shownCode(mode === "shell" ? shellCode : CODE.shellScript);
      root.querySelector(".ss-code").innerHTML = codeBlock(sc.text, mode === "shell" ? "repl" : "py");
      root._map = sc.map;
    },
    render(body, s) {
      const root = body.parentElement;
      root.querySelectorAll(".ss-code .ln").forEach((ln, k) => ln.classList.toggle("hl", s.line > 0 && k + 1 === root._map(s.line)));
      root.querySelector(".ss-out").textContent = s.out.join("\n").replace(/\n$/, "");
    },
    onMount(root, rebuild) { root.querySelector(".ss-m").onchange = (e) => { mode = e.target.value; rebuild(); }; },
  });
}

// ---------- expression rewriting ----------

function demoRewrite(el, presets, { mini = false, editable = true } = {}) {
  let src = presets[0];
  makePlayer(el, {
    mini,
    top: `<div class="rw-wrap"></div>`,
    extraControls: `<label>expression <select class="rw-p">${presets.map((p) => `<option>${esc(p)}</option>`).join("")}${editable ? `<option value="__own">your own…</option>` : ""}</select></label>
      ${editable ? `<input type="text" class="rw-own" placeholder="e.g. 2 + 3 * 4" style="width:170px;display:none">` : ""}`,
    build() {
      try { return rewriteSteps(src); } catch (err) {
        return [{ html: esc(src), msg: `<b>${esc(err.text || String(err))}</b>: this demo understands numbers, strings, names, + - * / // % ** and calls such as int(), float(), str(), type(), divmod(), round(), abs().`, cls: "bad" }];
      }
    },
    render(body, s, i, snaps) {
      const rows = snaps.slice(0, i + 1).filter((x) => !x.pending || x === s);
      body.innerHTML = `<div class="rw ${mini ? "mini" : ""}">${rows.map((r, k) => `<div class="rw-line${r === s ? " cur" : ""}${r.err ? " err" : ""}">${k ? '<span class="rw-eq">→</span>' : '<span class="rw-eq"></span>'}<code>${r.html}</code></div>`).join("")}</div>`;
      body.querySelector(".rw").scrollTop = 1e6;
    },
    onMount(root, rebuild) {
      if (mini) return;
      const own = root.querySelector(".rw-own");
      root.querySelector(".rw-p").onchange = (e) => {
        if (e.target.value === "__own") { own.style.display = ""; own.focus(); return; }
        if (own) own.style.display = "none";
        src = e.target.value; rebuild();
      };
      if (own) own.onchange = (e) => { if (e.target.value.trim()) { src = e.target.value.trim(); rebuild(); } };
    },
  });
}

// ---------- call-expression trees ----------

function buildCallTree(src) {
  const tree = parseExpr(src);
  let id = 0;
  const events = [];
  const env = new Map();
  function node(n) {
    const me = { id: id++, kids: [] };
    if (n.k === "lit") { me.label = repr(n.val); me.val = n.val; return me; }
    if (n.k === "paren") return node(n.e);
    if (n.k === "call") {
      me.label = `${n.f}(…)`; me.src = toSrc(n, null, false);
      me.op = { id: id++, kids: [], label: n.f };
      me.kids = [me.op, ...n.args.map(node)];
      me.ast = n; return me;
    }
    if (n.k === "bin") {
      me.label = `… ${n.op} …`; me.src = toSrc(n, null, false);
      me.kids = [node(n.l), { id: id++, kids: [], label: n.op, isOp: true }, node(n.r)];
      me.ast = n; return me;
    }
    me.label = toSrc(n, null, false); me.ast = n; return me;
  }
  const root = node(tree);
  function run(m, d = 0) {
    const pad = "   ".repeat(d);
    if (!m.ast || m.ast.k === "name") {
      const v = m.ast ? evaluate(m.ast, env) : m.val;
      events.push({ type: "enter", id: m.id, line: 1 });
      events.push({ type: "exit", id: m.id, value: m.ast ? repr(v) : undefined, line: 1 });
      return v;
    }
    events.push({ type: "enter", id: m.id, line: 1 });
    if (m.ast.k === "call") {
      events.push({ type: "out", text: `${pad}evaluate ${m.src}` });
      events.push({ type: "enter", id: m.op.id }, { type: "exit", id: m.op.id, value: "function" });
      events.push({ type: "out", text: `${pad}  1. operator ${m.ast.f} → the function ${m.ast.f}` });
      const vals = m.kids.slice(1).map((k, j) => { const v = run(k, d + 1); events.push({ type: "out", text: `${pad}  2. operand ${j + 1} → ${repr(v)}` }); return v; });
      const v = BUILTINS[m.ast.f](vals);
      events.push({ type: "out", text: `${pad}  3. apply ${m.ast.f} to ${vals.map(repr).join(", ")} → ${repr(v)}` });
      events.push({ type: "exit", id: m.id, value: repr(v) });
      return v;
    }
    events.push({ type: "out", text: `${pad}evaluate ${m.src}` });
    const l = run(m.kids[0], d + 1);
    const opn = m.kids[1];
    const r = run(m.kids[2], d + 1);
    events.push({ type: "enter", id: opn.id }, { type: "exit", id: opn.id, value: "" });
    const v = binop(m.ast.op, l, r);
    events.push({ type: "out", text: `${pad}  apply ${m.ast.op} to ${repr(l)}, ${repr(r)} → ${repr(v)}` });
    events.push({ type: "exit", id: m.id, value: repr(v) });
    return v;
  }
  run(root);
  return { root, events };
}

function demoCallTree(el, presets, { mini = false } = {}) {
  let src = presets[0];
  let callIds = new Set(), rootId = 0;
  makeTreePlayer(el, {
    mini,
    width: 720, rowH: 66, nodeW: 76,
    code: () => src,
    outLabel: "what Python does",
    build() {
      const t = buildCallTree(src);
      callIds = new Set();
      (function walk(n) { if (n.src) callIds.add(n.id); n.kids.forEach(walk); })(t.root);
      rootId = t.root.id;
      return t;
    },
    stats: (s) => [["operations applied", `${[...callIds].filter((k) => k in s.val).length} / ${callIds.size}`], ["value", s.val[rootId] ?? "…"]],
    extraControls: `<label>expression <select class="ct-p">${presets.map((p) => `<option>${esc(p)}</option>`).join("")}</select></label>`,
    onMount(root, rebuild) {
      if (mini) return;
      root.querySelector(".ct-p").onchange = (e) => { src = e.target.value; rebuild(); };
    },
  });
}

// ---------- floor division on a number line ----------

function demoFloorDiv(el) {
  let a = -7, b = 2;
  el.innerHTML = `<div class="svgbox fd-svg"></div><div class="stats fd-stats"></div>
    <div class="controls">
      <label>a <input type="range" class="fd-a" min="-20" max="20" value="${a}"> <b class="mono fd-av"></b></label>
      <label>b <input type="range" class="fd-b" min="-6" max="6" value="${b}"> <b class="mono fd-bv"></b></label>
      <button class="cbtn fd-ex" data-a="257" data-b="60">257, 60</button>
      <button class="cbtn fd-ex" data-a="-2" data-b="3">−2, 3</button>
      <button class="cbtn fd-ex" data-a="-17" data-b="5">−17, 5</button>
    </div>`;
  const $ = (q) => el.querySelector(q);
  function render() {
    $(".fd-av").textContent = a; $(".fd-bv").textContent = b;
    if (b === 0) {
      $(".fd-svg").innerHTML = `<p class="msg bad" style="margin:0">b = 0: <b>ZeroDivisionError: integer division or modulo by zero</b></p>`;
      $(".fd-stats").innerHTML = ""; return;
    }
    const A = I(a), B = I(b);
    const q = binop("//", A, B), r = binop("%", A, B), t = binop("/", A, B), z = BUILTINS.int([t]);
    const qv = Number(q.v), tv = t.v, zv = Number(z.v);
    const lo = Math.floor(Math.min(qv, zv, tv)) - 1.5, hi = Math.ceil(Math.max(qv, zv, tv)) + 1.5;
    const W = 680, H = 130, X = (x) => 20 + (x - lo) / (hi - lo) * (W - 40);
    let g = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="number line">`;
    g += `<line x1="10" y1="70" x2="${W - 10}" y2="70" stroke="var(--ink-2)" stroke-width="1.4"/>`;
    for (let k = Math.ceil(lo); k <= Math.floor(hi); k++) {
      const major = (hi - lo) < 30 || k % 5 === 0;
      g += `<line x1="${X(k)}" y1="${major ? 63 : 66}" x2="${X(k)}" y2="${major ? 77 : 74}" stroke="var(--stone)"/>`;
      if (major) g += `<text x="${X(k)}" y="94" font-size="11" text-anchor="middle" fill="var(--stone)">${k}</text>`;
    }
    g += `<line x1="${X(0)}" y1="56" x2="${X(0)}" y2="84" stroke="var(--ink)" stroke-width="1.6"/>`;
    g += `<circle cx="${X(tv)}" cy="70" r="6" fill="var(--amber)"/><text x="${X(tv)}" y="44" font-size="12" text-anchor="middle" fill="var(--amber)">a / b = ${esc(repr(t))}</text>`;
    g += `<circle cx="${X(qv)}" cy="70" r="5" fill="var(--teal)"/><text x="${X(qv)}" y="${qv === zv ? 112 : 112}" font-size="12" text-anchor="middle" fill="var(--teal)" font-weight="600">a // b = ${qv}</text>`;
    if (zv !== qv) g += `<circle cx="${X(zv)}" cy="70" r="5" fill="none" stroke="var(--red)" stroke-width="2"/><text x="${X(zv)}" y="126" font-size="11" text-anchor="middle" fill="var(--red)">int(a / b) = ${zv}</text>`;
    if (Math.abs(X(tv) - X(qv)) > 8) g += `<path d="M ${X(tv)} 60 Q ${(X(tv) + X(qv)) / 2} 50 ${X(qv) + (tv > qv ? 6 : -6)} 60" fill="none" stroke="var(--teal)" stroke-width="1.4" stroke-dasharray="3 3"/>`;
    $(".fd-svg").innerHTML = g + "</svg>";
    $(".fd-stats").innerHTML = [["a / b", repr(t)], ["a // b (round down)", repr(q)], ["a % b", repr(r)], ["int(a / b) (towards 0)", repr(z)],
      ["check (a//b)*b + a%b", `${repr(binop("+", binop("*", q, B), r))}`]].map(([k, v], j) => `<div class="stat${j === 3 && zv !== qv ? " bad" : j === 1 ? " good" : ""}"><small>${k}</small><b>${esc(v)}</b></div>`).join("");
  }
  $(".fd-a").oninput = (e) => { a = +e.target.value; render(); };
  $(".fd-b").oninput = (e) => { b = +e.target.value; render(); };
  el.querySelectorAll(".fd-ex").forEach((btn) => { btn.onclick = () => { a = +btn.dataset.a; b = +btn.dataset.b; $(".fd-a").value = Math.max(-20, Math.min(20, a)); $(".fd-b").value = b; render(); }; });
  render();
}

// ---------- type conversions ----------

function demoConvert(el) {
  const rows = ["42", "-9.99", '"42"', '"3.14"', '"abc"'];
  const cell = (fn, src) => {
    try { const v = evaluate(parseExpr(`${fn}(${src})`), new Map()); return `<td class="mono">${esc(repr(v))}</td>`; } catch (err) { return `<td class="mono" style="color:var(--red)">${esc(err.kind)}</td>`; }
  };
  el.innerHTML = `<div style="overflow-x:auto"><table class="cv"><tr><th>value</th><th>type(v)</th><th>int(v)</th><th>float(v)</th><th>str(v)</th></tr>
    ${rows.map((r) => `<tr><td class="mono"><b>${esc(r)}</b></td>${cell("type", r).replace(/&lt;class '(\w+)'&gt;/, "$1")}${cell("int", r)}${cell("float", r)}${cell("str", r)}</tr>`).join("")}</table></div>
    <div class="controls"><label>try your own value <input type="text" class="cv-in" value="'7'" style="width:120px"></label><span class="cv-out mono"></span></div>`;
  const inp = el.querySelector(".cv-in");
  const show = () => {
    const src = inp.value.trim();
    const parts = ["type", "int", "float", "str"].map((fn) => {
      try { return `${fn} → ${repr(evaluate(parseExpr(`${fn}(${src})`), new Map()))}`; } catch (err) { return `${fn} → ${err.kind}`; }
    });
    el.querySelector(".cv-out").textContent = parts.join("   ");
  };
  inp.oninput = show; show();
}

// ---------- print with sep and end ----------

function demoPrint(el) {
  const presets = [
    ['"I", "like", "AI"', " ", "\\n"], ['"I", "like", "AI"', "", "\\n"], ['"I", "like", "AI"', ",", "\\n"],
    ['minutes, ":", seconds', " ", "\\n"], ['minutes, ":", seconds', "", "\\n"],
    ['"Test line 1"', " ", " "], ['"Test line 1"', " ", "---"], ['42, "42"', " ", "\\n"],
  ];
  el.innerHTML = `<div class="controls" style="margin-top:0">
      <label>print( <input type="text" class="pr-v" style="width:190px"></label>
      <label>sep= <input type="text" class="pr-s" style="width:54px"></label>
      <label>end= <input type="text" class="pr-e" style="width:54px"></label> <span>)</span>
      <select class="pr-p"><option value="">examples…</option>${presets.map((p, k) => `<option value="${k}">${esc(`print(${p[0]}${p[1] !== " " ? `, sep="${p[1]}"` : ""}${p[2] !== "\\n" ? `, end="${p[2]}"` : ""})`)}</option>`).join("")}</select>
    </div>
    <div class="counter" style="margin-top:12px">the call, as code</div>${'<div class="pr-code"></div>'}
    <div class="counter">the output, followed by print("Test line 2") · spaces shown as ·, line ends as ↵</div>
    <div class="console pr-out" style="white-space:pre-wrap"></div>`;
  const $ = (q) => el.querySelector(q);
  const env = new Map([["minutes", I(4)], ["seconds", I(17)]]);
  function set(k) { const p = presets[k]; $(".pr-v").value = p[0]; $(".pr-s").value = p[1]; $(".pr-e").value = p[2]; render(); }
  function render() {
    const vals = $(".pr-v").value, sep = $(".pr-s").value, end = $(".pr-e").value.replace(/\\n/g, "\n");
    const call = `print(${vals}${sep !== " " ? `, sep=${pyStrRepr(sep).replace(/^'|'$/g, '"')}` : ""}${end !== "\n" ? `, end=${pyStrRepr(end).replace(/^'|'$/g, '"')}` : ""})`;
    $(".pr-code").innerHTML = codeBlock(`${call}\nprint("Test line 2")`, "py");
    try {
      const v = vals.trim() ? evaluate(parseExpr(vals), env) : { t: "tuple", v: [] };
      const items = v.t === "tuple" && /,/.test(vals) ? v.v : vals.trim() ? [v] : [];
      const text = items.map(pystr).join(sep) + end + "Test line 2\n";
      $(".pr-out").innerHTML = esc(text).replace(/ /g, '<span style="color:var(--amber)">·</span>').replace(/\n/g, '<span style="color:var(--teal)">↵</span>\n');
    } catch (err) {
      $(".pr-out").textContent = err.text || String(err);
    }
  }
  ["pr-v", "pr-s", "pr-e"].forEach((c) => { $("." + c).oninput = render; });
  $(".pr-p").onchange = (e) => { if (e.target.value !== "") set(+e.target.value); };
  set(0);
}

// ---------- quiz ----------

function demoQuiz(el, questions) {
  el.innerHTML = `<div class="quiz">` + questions.map((q, k) => `<div class="card q" data-k="${k}">
      <p><b>Q${k + 1}.</b> ${q.q}</p>${q.code ? codeBlock(q.code) : ""}
      <div class="opts">${q.opts.map((o, j) => `<button class="opt" data-j="${j}">${o}</button>`).join("")}</div>
      <div class="explain">${q.why}</div></div>`).join("") +
    `<p class="score"></p></div>`;
  let right = 0, done = 0;
  el.querySelectorAll(".q").forEach((qe) => {
    const q = questions[+qe.dataset.k];
    qe.querySelectorAll(".opt").forEach((b) => {
      b.onclick = () => {
        const j = +b.dataset.j;
        qe.querySelectorAll(".opt").forEach((x) => { x.disabled = true; });
        qe.querySelectorAll(".opt")[q.a].classList.add("right");
        if (j !== q.a) b.classList.add("wrong"); else right++;
        qe.classList.add("done");
        done++;
        el.querySelector(".score").textContent = `${right} / ${done} correct` + (done === questions.length ? (right === questions.length ? " — all right!" : " — reread the sections you missed.") : "");
      };
    });
  });
}

// Styles used only by this lecture's demos.
document.head.insertAdjacentHTML("beforeend", `<style>
  .rw { background: var(--code-bg); border: 1px solid var(--line); border-radius: 10px; padding: 10px 14px; font: 15px/1.7 var(--mono); max-height: 340px; overflow: auto; }
  .rw.mini { font-size: 13px; max-height: 230px; }
  .rw-line { display: flex; gap: 10px; white-space: pre-wrap; word-break: break-word; opacity: 0.55; }
  .rw-line.cur { opacity: 1; }
  .rw-line.err code { color: var(--red); }
  .rw-line code { background: none; padding: 0; font: inherit; }
  .rw-eq { color: var(--stone); width: 1em; flex: none; }
  .rw mark { background: var(--mark); color: inherit; border-bottom: 2px solid var(--amber); border-radius: 3px; padding: 0 1px; }
  table.cv td, table.cv th { padding: 6px 10px; white-space: nowrap; }
  .stepper.nm { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); }
  .stepper.nm.mini { grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); }
  .nm-diag svg { width: 100%; }
  [data-demo="callTree"] .stepper { grid-template-columns: minmax(0, 1fr); }
  .demo .controls label { max-width: 100%; min-width: 0; }
  .demo .controls select { min-width: 0; flex: 1 1 auto; text-overflow: ellipsis; }
  @media (max-width: 900px) { .stepper.nm, .stepper.nm.mini { grid-template-columns: minmax(0, 1fr); } .nm-diag svg { max-width: 420px; margin: 0 auto; } }
</style>`);

// Demo registry: data-demo="name" in chapters.js mounts DEMOS[name].
const P = (label, code, stdin) => ({ label, code: CODE[code], stdin });
const NAMES_PRESETS = [P("x = 10, then x = 20", "shellNames"), P("b = a", "shareObj"), P("x = x + 2", "rebindSelf"), P("hours and pay", "pay")];
const ASSIGN_PRESETS = [P("x = 100 - 10 + x * 3 - x / 10", "assignX"), P("x = y * 2 (slide 42)", "envDiagram"), P("cascaded: z = y = x = …", "cascade"),
  P("swap, wrong", "badSwap"), P("swap with temp", "tempSwap"), P("swap: c, o = o, c", "simSwap")];
const IO_PRESETS = [P("BMI", "bmi", ["70", "1.75"]), P("adding two inputs", "addInputs", ["3", "4"]), P("hello", "hello", ["Alice"]),
  P("two friends (ex. 5)", "friends", ["Alice", "Bob"]), P("h:m:s (ex. 6)", "hms", ["3725"]), P("making change (ex. 8)", "change", ["143"])];

const DEMOS = {
  shellScript: (el) => demoShellScript(el),
  names: (el) => demoNames(el, NAMES_PRESETS),
  namesMini: (el) => demoNames(el, [P("b = a", "shareObj")], { mini: true }),
  typeChange: (el) => demoNames(el, [P("the type belongs to the object", "typeChange")]),
  typesMini: (el) => demoRewrite(el, ["1 + 2 * float(3) / 4 - 5"], { mini: true }),
  convert: (el) => demoConvert(el),
  typesRewrite: (el) => demoRewrite(el, ["1 + 2 * float(3) / 4 - 5", "7 / 2, 7 // 2, \"7\" * 2, int(\"7\") * 2", "int(\"42\") + 1", "\"100\" + \"200\"", "\"100\" + 1", "int(\"3.14\")"]),
  callTree: (el) => demoCallTree(el, ["add(add(6, mul(4, 6)), mul(3, 5))", "mul(add(2, mul(4, 6)), add(3, 5))", "6 + 4 * 6 + 3 * 5"]),
  callTreeMini: (el) => demoCallTree(el, ["add(add(6, mul(4, 6)), mul(3, 5))"], { mini: true }),
  assign: (el) => demoNames(el, ASSIGN_PRESETS),
  swapMini: (el) => demoNames(el, [P("swap: c, o = o, c", "simSwap")], { mini: true }),
  precedence: (el) => demoRewrite(el, ["1 + 2 ** 3 / 4 * 5", "1 + 2 * 3 - 4 / 5 ** 6", "2 ** 3 ** 2", "-2 ** 2", "(-2) ** 2", "2 + 3 * 4 ** 2", "(2 + 3) * 4 ** 2", "6 + 4 * 6 + 3 * 5"]),
  precedenceMini: (el) => demoRewrite(el, ["1 + 2 ** 3 / 4 * 5"], { mini: true }),
  floorDiv: (el) => demoFloorDiv(el),
  augmented: (el) => demoNames(el, [P("x += 7, x -= 2 * 7", "augmented"), P("divmod and unpacking", "divmodTime")]),
  io: (el) => demoNames(el, IO_PRESETS, { stdinBox: true }),
  print: (el) => demoPrint(el),
  quiz: (el) => demoQuiz(el, QUIZ),
};
