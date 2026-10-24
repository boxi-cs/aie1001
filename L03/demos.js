// Interactive demos for Lecture 3. Every code panel is copied from notes/L03-flow-control.md
// (checked by tools/check.py); the JS twins below replay what Python does, line by line.

const CODE = {
  first: `x = 5
if x < 10:
    print("smaller")
if x > 20:
    print("bigger")
print("finished")`,
  sixIfs: (x) => `x = ${x}
if x == 5:
    print("Equals 5")
if x > 4:
    print("Greater than 4")
if x >= 5:
    print("Greater than or equal to 5")
if x < 5:
    print("Less than 5")
if x <= 5:
    print("Less than or equal to 5")
if x != 6:
    print("Not equal to 6")`,
  oneWay: `x = 5
print("Before 5")
if x == 5:
    print("Is 5")
    print("Is still 5")
    print("Third 5")
print("Afterwards 5")

print("Before 6")
if x == 6:
    print("Is 6")
    print("Is still 6")
    print("Third 6")
print("Afterwards 6")`,
  nested42: `x = 42
if x > 1:
    print("More than 1")
    if x < 100:
        print("Less than 100")
print("Finished")`,
  nested: (x) => `x = ${x}
if x > 5:
    print("Greater than 5")
    if x > 8:
        print("Greater than 8")
    if x > 10:
        print("Greater than 10")
print("Finished")`,
  twoWay: (x) => `x = ${x}
if x > 2:
    print("Bigger")
else:
    print("Smaller")
print("Finished")`,
  nestedElse: `x = 1
if x > 2:
    if x > 5:
        print("Bigger than 5")
    else:
        print("Smaller than 5")
print("Finished")`,
  medium: `x = 2
if x < 2:
    print("Small")
elif x < 10:
    print("Medium")
else:
    print("Large")
print("Finished")`,
  chain: (x) => `x = ${x}
if x < 2:
    print("Small")
elif x < 10:
    print("Medium")
elif x < 20:
    print("Large")
elif x < 40:
    print("Huge")
else:
    print("Ginormous")
print("Finished")`,
  never1: (x) => `x = ${x}
if x <= 2:
    print("Below 2")
elif x > 2:
    print("Above 2")
else:
    print("Something else")
print("Finished")`,
  never2: (x) => `x = ${x}
if x < 2:
    print("Below 2")
elif x < 20:
    print("Below 20")
elif x < 10:
    print("Below 10")
else:
    print("Something else")
print("Finished")`,
  tryTwice: `astr = "Hello bob"
try:
    istr = int(astr)
except ValueError:
    istr = -1
print("First", istr)

astr = "123"
try:
    istr = int(astr)
except ValueError:
    istr = -1
print("Second", istr)`,
  tryHello: (s) => `astr = "${s}"
try:
    print("Hello")
    istr = int(astr)
    print("There")
except ValueError:
    istr = -1
print("Done", istr)`,
  checkInput: `raw_str = input("Enter a number: ")
try:
    value = int(raw_str)
except ValueError:
    value = -1

if value > 0:
    print("Nice work")
else:
    print("Invalid number")`,
  bareExcept: `astr = "123"
try:
    istr = int(asrt)
except:
    istr = -1
print(istr)`,
  nextDay: `# Add a day to a given date (leap years ignored)
month = int(input("Enter a month (1-12): "))
day = int(input("Enter a day (1-31): "))

days_in_month = (31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)

if day < days_in_month[month - 1]:
    print(month, day + 1)
else:
    month = month % 12 + 1
    print(month, 1)`,
  countdown: (n) => `n = ${n}
while n > 0:
    print(n)
    n = n - 1
print("Finish")`,
  lather: `n = 5
while n > 0:
    print("Lather")
    print("Rinse")
n = n - 1                  # not indented: outside the loop
print("Dry off!")`,
  breakLoop: `while True:
    line = input("Enter a word: ")
    if line == "done":
        break
    print(line)
print("Finished")`,
  continueLoop: `while True:
    line = input("Enter a word: ")
    if line.startswith("#"):
        continue
    if line == "done":
        break
    print(line)
print("Done")`,
  collatz: (n) => `n = ${n}
steps = 0
while n != 1:
    if n % 2 == 0:
        n = n // 2
    else:
        n = 3 * n + 1
    steps = steps + 1
print(steps)`,
  forFirst: `for i in [5, 4, 3, 2, 1]:
    print(i)
print("Finished")`,
  friends: (xs) => `friends = [${xs.map((w) => `"${w}"`).join(", ")}]
for friend in friends:
    print("Happy new year", friend)
print("Done")`,
  count: (xs) => `count = 0
print("Before", count)
for thing in [${xs.join(", ")}]:
    count = count + 1
    print(count, thing)
print("After", count)`,
  sum: (xs) => `numbers = [${xs.join(", ")}]
total = 0
print("Before", total)
for num in numbers:
    total = total + num
    print(total, num)
print("Last", total)`,
  average: (xs) => `numbers = [${xs.join(", ")}]
total = 0
count = 0
print("Before", total)
for num in numbers:
    total = total + num
    count = count + 1
    print(count, total, num)
print("Last", total, total / count)`,
  filter: (xs) => `print("Before")
for value in [${xs.join(", ")}]:
    if value > 50:
        print("Large value:", value)
print("After")`,
  search: (xs) => `found = False
print("Before", found)
for value in [${xs.join(", ")}]:
    if value == 74:
        found = True
    print(found, value)
print("After", found)`,
  largest: (xs) => `largest_so_far = -1
print("Before", largest_so_far)
for num in [${xs.join(", ")}]:
    if num > largest_so_far:
        largest_so_far = num
    print(largest_so_far, num)
print("After", largest_so_far)`,
  smallestBug: (xs) => `smallest_so_far = -1
print("Before", smallest_so_far)
for num in [${xs.join(", ")}]:
    if num < smallest_so_far:
        smallest_so_far = num
    print(smallest_so_far, num)
print("After", smallest_so_far)`,
  smallestNone: (xs) => `smallest_so_far = None
print("Before", smallest_so_far)
for num in [${xs.join(", ")}]:
    if smallest_so_far is None:
        smallest_so_far = num
    elif num < smallest_so_far:
        smallest_so_far = num
    print(smallest_so_far, num)
print("After", smallest_so_far)`,
  identity: `>>> a = [1, 2, 3]
>>> b = [1, 2, 3]
>>> a == b
True
>>> a is b
False
>>> c = a
>>> c is a
True
>>> c[0] = 99
>>> a
[99, 2, 3]
>>> b
[1, 2, 3]`,
  floatAdd: `>>> x = 0.1
>>> x + x + x + x + x + x + x + x + x + x
0.9999999999999999`,
};

// ---------- Python values in JS ----------

// repr() of a JS value as Python would show it. Floats are tagged {f: number}.
function pyRepr(v) {
  if (v === null || v === undefined) return "None";
  if (v === true) return "True";
  if (v === false) return "False";
  if (typeof v === "object" && "f" in v) return pyFloat(v.f);
  if (typeof v === "object" && "tuple" in v) return "(" + v.tuple.map(pyRepr).join(", ") + ")";
  if (Array.isArray(v)) return "[" + v.map(pyRepr).join(", ") + "]";
  if (typeof v === "string") return v.includes("'") && !v.includes('"') ? `"${v}"` : `'${v.replace(/'/g, "\\'")}'`;
  return String(v);
}
// str(): what print() shows.
function pyStr(v) { return typeof v === "string" ? v : pyRepr(v); }
function pyFloat(x) { return Number.isInteger(x) && Math.abs(x) < 1e16 ? x.toFixed(1) : String(x); }
// int(s) for a string: optional spaces and sign, digits with single underscores between them.
function pyInt(s) {
  if (!/^\s*[+-]?\d+(_\d+)*\s*$/.test(s)) return { error: `ValueError: invalid literal for int() with base 10: ${pyRepr(s)}` };
  return { value: Number(s.trim().replace(/_/g, "")) };
}

// ---------- the flow player ----------

// Records one snapshot per step while a JS twin of a Python program runs.
class Flow {
  constructor() { this.vars = {}; this.term = ""; this.snaps = []; this.rows = []; this.changed = []; }
  set(name, value) { this.vars[name] = value; this.changed.push(name); }
  del(name) { delete this.vars[name]; }
  print(...args) { this.term += esc(args.map(pyStr).join(" ")) + "\n"; }
  // input(): the prompt, then what the user typed (shown in the terminal, not part of the output).
  input(prompt, typed) { this.term += esc(prompt) + `<span class="typed">${esc(typed)}</span>\n`; }
  error(text) { this.term += `<span class="err">${esc(text)}</span>\n`; }
  row(cells) { this.rows.push(cells); }
  snap(line, msg = "", cls = "", extra = null) {
    this.snaps.push({ line, msg, cls, extra, vars: { ...this.vars }, changed: this.changed, term: this.term, nrows: this.rows.length });
    this.changed = [];
  }
}

// opts: code (string or fn), build() -> Flow, extraControls, onMount(root, rebuild), mini,
//       renderExtra(snap) (above the grid), table: [column names] (trace table under the grid),
//       varsLabel, noTerm.
function makeFlow(el, opts) {
  const mini = !!opts.mini;
  el.innerHTML = `
    <div class="fx-extra"></div>
    <div class="stepper${mini ? " mini" : ""}">
      <div class="fx-code"></div>
      <div class="fx-side">
        <div class="vbox"><small>${opts.varsLabel || "variables"}</small><div class="fx-vars"></div></div>
        ${opts.noTerm ? "" : `<div class="term-wrap"><small>terminal</small><div class="console fx-out"></div></div>`}
      </div>
    </div>
    ${mini ? "" : `<div class="msg fx-msg"></div>
    ${opts.table ? `<div class="vt-wrap fx-table"></div>` : ""}
    <div class="controls">
      <button class="cbtn fx-reset" title="Back to the start">⟲ Reset</button>
      <button class="cbtn fx-back" title="Step back (←)">◀ Back</button>
      <button class="cbtn fx-step on" title="Step (→)">Step ▶</button>
      <button class="cbtn fx-play">Play</button>
      ${opts.extraControls || ""}
      <span class="spacer"></span><span class="counter fx-count"></span>
    </div>`}`;
  const $ = (s) => el.querySelector(s);
  let flow, snaps = [], i = 0, timer = null, codeLines = [];

  function render() {
    const s = snaps[i];
    const ran = new Set();
    for (let k = 0; k < i; k++) ran.add(snaps[k].line);
    codeLines.forEach((ln, k) => {
      ln.classList.toggle("hl", k + 1 === s.line);
      ln.classList.toggle("ran", ran.has(k + 1) && k + 1 !== s.line);
    });
    const names = Object.keys(s.vars);
    $(".fx-vars").innerHTML = names.length ? names.map((n) =>
      `<div class="vrow${s.changed.includes(n) ? " changed" : ""}"><span class="vn">${esc(n)}</span><span class="vv">${esc(pyRepr(s.vars[n]))}</span></div>`).join("")
      : `<div class="vempty">(none yet)</div>`;
    if (!opts.noTerm) { const o = $(".fx-out"); o.innerHTML = s.term; o.scrollTop = o.scrollHeight; }
    if (opts.renderExtra) $(".fx-extra").innerHTML = opts.renderExtra(s);
    if (mini) return;
    const msg = $(".fx-msg");
    msg.innerHTML = s.msg;
    msg.className = "msg fx-msg " + (s.cls || "");
    if (opts.table) {
      const rows = flow.rows.slice(0, s.nrows);
      const t = typeof opts.table === "function" ? opts.table() : opts.table;
      $(".fx-table").innerHTML = `<table class="vt"><thead><tr>${t.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>` +
        (rows.length ? rows.map((r, k) => `<tr class="${k === rows.length - 1 ? "last" : ""}">${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")
          : `<tr><td colspan="${t.length}" class="vempty">one row per ${opts.rowWord || "iteration"} appears here</td></tr>`) + "</tbody></table>";
      const w = $(".fx-table"); w.scrollTop = w.scrollHeight;
    }
    $(".fx-count").textContent = `step ${i + 1} / ${snaps.length}`;
    $(".fx-back").disabled = $(".fx-reset").disabled = i === 0;
    $(".fx-step").disabled = i === snaps.length - 1;
  }
  function stop() { clearInterval(timer); timer = null; if (!mini) $(".fx-play").textContent = "Play"; }
  function play() {
    if (timer) return stop();
    if (i === snaps.length - 1) i = 0;
    if (!mini) $(".fx-play").textContent = "Pause";
    timer = setInterval(() => {
      if (i < snaps.length - 1) i++; else if (mini) i = 0; else return stop();
      render();
    }, mini ? 900 : 650);
  }
  function rebuild() {
    stop();
    const code = typeof opts.code === "function" ? opts.code() : opts.code;
    $(".fx-code").innerHTML = codeBlock(mini ? code.replace(/\s+#.*$/gm, "") : code, code.startsWith(">>>") ? "repl" : "py");
    codeLines = [...el.querySelectorAll(".fx-code .ln")];
    flow = opts.build();
    snaps = flow.snaps;
    i = 0;
    render();
  }
  if (!mini) {
    $(".fx-reset").onclick = () => { stop(); i = 0; render(); };
    $(".fx-back").onclick = () => { stop(); if (i > 0) i--; render(); };
    $(".fx-step").onclick = () => { stop(); if (i < snaps.length - 1) i++; render(); };
    $(".fx-play").onclick = play;
    el.tabIndex = 0;
    el.addEventListener("keydown", (e) => {
      if (["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "ArrowRight") { e.preventDefault(); $(".fx-step").click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); $(".fx-back").click(); }
    });
  }
  if (opts.onMount) opts.onMount(el, rebuild);
  rebuild();
  if (mini) play();
  return { rebuild };
}

const tf = (b) => `<b class="${b ? "t" : "f"}">${b ? "True" : "False"}</b>`;
const OPS = {
  "<": (a, b) => a < b, "<=": (a, b) => a <= b, "==": (a, b) => a === b,
  ">=": (a, b) => a >= b, ">": (a, b) => a > b, "!=": (a, b) => a !== b,
};
const opHTML = (op) => esc(op);
// "x > 4 → 5 > 4 → True"
const cmpMsg = (name, op, x, k) => `<code>${name} ${opHTML(op)} ${k}</code> → <code>${x} ${opHTML(op)} ${k}</code> → ${tf(OPS[op](x, k))}`;
const intInput = (cls, v, min, max) => `<input type="number" class="${cls}" value="${v}" min="${min}" max="${max}" step="1">`;
function readInt(e, lo, hi, fallback) {
  let v = parseInt(e.target.value, 10);
  if (!Number.isFinite(v)) v = fallback;
  v = Math.max(lo, Math.min(hi, v));
  e.target.value = v;
  return v;
}

// ---------- chapter 1: six comparisons, truthiness ----------

function demoSixIfs(el) {
  let x = 5;
  const tests = [["==", 5, "Equals 5"], [">", 4, "Greater than 4"], [">=", 5, "Greater than or equal to 5"],
    ["<", 5, "Less than 5"], ["<=", 5, "Less than or equal to 5"], ["!=", 6, "Not equal to 6"]];
  makeFlow(el, {
    code: () => CODE.sixIfs(x),
    build() {
      const f = new Flow();
      f.set("x", x); f.snap(1, `<code>x</code> now refers to ${x}. Six separate <code>if</code> statements follow; each is tested on its own.`);
      tests.forEach(([op, k, text], j) => {
        const ok = OPS[op](x, k);
        f.snap(2 + 2 * j, `Test ${cmpMsg("x", op, x, k)}. ${ok ? "The block runs." : "The block is skipped."}`);
        if (ok) { f.print(text); f.snap(3 + 2 * j, `Print <code>${text}</code>.`); }
      });
      const n = tests.filter(([op, k]) => OPS[op](x, k)).length;
      f.snap(0, `Done: ${n} of the six conditions were true for <code>x = ${x}</code>. A comparison only looks at <code>x</code>; it never changes it.`, "good");
      return f;
    },
    extraControls: `<label>x ${intInput("si-x", x, -20, 20)}</label>`,
    onMount(root, rebuild) { root.querySelector(".si-x").onchange = (e) => { x = readInt(e, -20, 20, 5); rebuild(); }; },
  });
}

const TRUTHY = [
  ["0", false, "zero"], ["0.0", false, "zero (a float)"], ["0j", false, "zero (a complex number)"],
  ["-1", true, "a non-zero number"], ["1e-10", true, "a non-zero number, however small"], ["1j", true, "a non-zero number"],
  ["0.0001", true, "a non-zero number"], ['""', false, "the empty string"], ['" "', true, "a string with one character (a space)"],
  ['"0"', true, "a string with one character in it"], ["[]", false, "the empty list"], ["[0]", true, "a list with one element (the element doesn't matter)"],
  ["None", false, "None, Python's value for “nothing”"],
];

function demoTruthy(el) {
  el.innerHTML = `<div class="truthy">${TRUTHY.map(([v], k) => `<button class="opt tv" data-k="${k}"><code>${esc(v)}</code></button>`).join("")}</div>
    <div class="tv-out msg">Pick a value. What does <code>bool()</code> make of it?</div>`;
  const out = el.querySelector(".tv-out");
  el.querySelectorAll(".tv").forEach((b) => {
    b.onclick = () => {
      const [v, t, why] = TRUTHY[+b.dataset.k];
      el.querySelectorAll(".tv").forEach((x) => x.classList.remove("right", "wrong"));
      b.classList.add(t ? "right" : "wrong");
      out.className = "tv-out msg " + (t ? "good" : "bad");
      out.innerHTML = `<code>bool(${esc(v)})</code> is ${tf(t)}: ${why} is <b>${t ? "truthy" : "falsy"}</b>.`;
    };
  });
}

// ---------- chapter 2: the branch tracer ----------

// Each program: code(x), default x, the range drawn on the number line, and a JS twin.
const CHAIN = {
  chain: { code: CODE.chain, x: 56, lo: -5, hi: 60,
    tests: [["<", 2, "Small"], ["<", 10, "Medium"], ["<", 20, "Large"], ["<", 40, "Huge"]], other: "Ginormous", end: 12 },
  never2: { code: CODE.never2, x: 8, lo: -5, hi: 30,
    tests: [["<", 2, "Below 2"], ["<", 20, "Below 20"], ["<", 10, "Below 10"]], other: "Something else", end: 10 },
  never1: { code: CODE.never1, x: 4, lo: -5, hi: 10,
    tests: [["<=", 2, "Below 2"], [">", 2, "Above 2"]], other: "Something else", end: 8 },
};
const BRANCH_COLORS = ["var(--teal)", "var(--amber)", "var(--green)", "var(--red)", "var(--stone)"];

function chainBranch(p, x) {
  const k = p.tests.findIndex(([op, b]) => OPS[op](x, b));
  return k < 0 ? p.tests.length : k;
}

function numberLine(p, x) {
  const n = p.tests.length + 1;
  const labels = [...p.tests.map((t) => t[2]), p.other];
  const W = 420, H = 58, x0 = 12, x1 = W - 12;
  const every = p.hi - p.lo > 40 ? 10 : 5;
  const sx = (v) => x0 + ((v - p.lo) / (p.hi - p.lo)) * (x1 - x0);
  const w = (x1 - x0) / (p.hi - p.lo);
  let g = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="which branch each x reaches">`;
  for (let v = p.lo; v <= p.hi; v++) {
    g += `<rect x="${sx(v) - w / 2}" y="14" width="${w + 0.5}" height="16" fill="${BRANCH_COLORS[chainBranch(p, v)]}" opacity="0.75"/>`;
  }
  for (let v = p.lo; v <= p.hi; v++) {
    if (v % every === 0) g += `<text x="${sx(v)}" y="46" font-size="11" text-anchor="middle" fill="var(--stone)">${v}</text>`;
  }
  if (x >= p.lo && x <= p.hi) g += `<path d="M ${sx(x)} 12 l -6 -9 h 12 z" fill="var(--ink)"/><rect x="${sx(x) - w / 2}" y="14" width="${w}" height="16" fill="none" stroke="var(--ink)" stroke-width="2"/>`;
  g += "</svg>";
  const reached = labels.map((_, k) => { for (let v = p.lo - 1000; v <= p.hi + 1000; v++) if (chainBranch(p, v) === k) return true; return false; });
  return `<div class="nline"><small>which branch each whole number x reaches</small>${g}<div class="legend">${labels.map((l, k) =>
    `<span class="${reached[k] ? "" : "dead"}"><i style="background:${BRANCH_COLORS[k]}"></i>${esc(l)}${reached[k] ? "" : " — never reached"}</span>`).join("")}</div></div>`;
}

function traceChain(p, x) {
  const f = new Flow();
  f.set("x", x); f.snap(1, `<code>x</code> refers to ${x}. Python now tests the conditions <b>in order</b>.`, "", { x });
  let line = 2;
  for (let j = 0; j < p.tests.length; j++) {
    const [op, k, text] = p.tests[j];
    const ok = OPS[op](x, k);
    f.snap(line, `${j === 0 ? "<code>if</code>" : "<code>elif</code>"}: ${cmpMsg("x", op, x, k)}. ${ok ? "The first true condition: its block runs." : "False, so on to the next test."}`, "", { x });
    if (ok) {
      f.print(text);
      f.snap(line + 1, `Print <code>${text}</code>. ${j < p.tests.length - 1 || p.other ? "The rest of the chain is <b>skipped</b>, without testing anything else." : ""}`, "", { x });
      f.print("Finished");
      f.snap(p.end, `Carry on after the chain. Exactly one branch ran: <b>${text}</b>.`, "good", { x });
      return f;
    }
    line += 2;
  }
  f.snap(line, "Every condition was false, so the <code>else</code> block runs.", "", { x });
  f.print(p.other);
  f.snap(line + 1, `Print <code>${p.other}</code>.`, "", { x });
  f.print("Finished");
  f.snap(p.end, `Carry on after the chain. Exactly one branch ran: <b>${p.other}</b>.`, "good", { x });
  return f;
}

function traceTwoWay(x) {
  const f = new Flow();
  f.set("x", x); f.snap(1, `<code>x</code> refers to ${x}.`);
  const ok = x > 2;
  f.snap(2, `Test ${cmpMsg("x", ">", x, 2)}. ${ok ? "Take the <code>if</code> path." : "Take the <code>else</code> path."}`);
  if (ok) { f.print("Bigger"); f.snap(3, "Print <code>Bigger</code>. The <code>else</code> block is skipped."); }
  else { f.snap(4, "<code>else</code> has no condition: it runs whenever the test was false."); f.print("Smaller"); f.snap(5, "Print <code>Smaller</code>."); }
  f.print("Finished"); f.snap(6, "Exactly one of the two blocks ran — never both, never neither.", "good");
  return f;
}

function traceNested(x) {
  const f = new Flow();
  f.set("x", x); f.snap(1, `<code>x</code> refers to ${x}.`);
  const ok = x > 5;
  f.snap(2, `Outer test ${cmpMsg("x", ">", x, 5)}. ${ok ? "Enter the outer block." : "The whole outer block is skipped, inner <code>if</code>s included."}`);
  if (ok) {
    f.print("Greater than 5"); f.snap(3, "Print <code>Greater than 5</code>.");
    const a = x > 8;
    f.snap(4, `Inner test ${cmpMsg("x", ">", x, 8)}.`);
    if (a) { f.print("Greater than 8"); f.snap(5, "Print <code>Greater than 8</code>."); }
    const b = x > 10;
    f.snap(6, `Second inner test ${cmpMsg("x", ">", x, 10)}.`);
    if (b) { f.print("Greater than 10"); f.snap(7, "Print <code>Greater than 10</code>."); }
  }
  f.print("Finished"); f.snap(8, "Back at the outer level: this line always runs.", "good");
  return f;
}

function demoBranch(el, { mini = false, prog = "chain" } = {}) {
  let x = prog === "chain" ? 56 : prog === "twoWay" ? 1 : prog === "nested" ? 10 : CHAIN[prog].x;
  const codeFor = () => (prog === "twoWay" ? CODE.twoWay(x) : prog === "nested" ? CODE.nested(x) : CHAIN[prog].code(x));
  const defaults = { twoWay: 1, nested: 10, chain: 56, never1: 4, never2: 8 };
  makeFlow(el, {
    mini,
    code: codeFor,
    build() {
      if (prog === "twoWay") return traceTwoWay(x);
      if (prog === "nested") return traceNested(x);
      return traceChain(CHAIN[prog], x);
    },
    renderExtra: () => (CHAIN[prog] && !mini ? numberLine(CHAIN[prog], x) : ""),
    extraControls: `<label>program <select class="br-p" style="max-width:min(260px, 58vw)">
        <option value="twoWay">if / else</option><option value="nested">nested if</option>
        <option value="chain">if / elif chain</option><option value="never1">never printed? (1)</option><option value="never2">never printed? (2)</option></select></label>
      <label>x ${intInput("br-x", x, -99, 999)}</label>`,
    onMount(root, rebuild) {
      if (mini) return;
      root.querySelector(".br-p").value = prog;
      root.querySelector(".br-p").onchange = (e) => { prog = e.target.value; x = defaults[prog]; root.querySelector(".br-x").value = x; rebuild(); };
      root.querySelector(".br-x").onchange = (e) => { x = readInt(e, -99, 999, defaults[prog]); rebuild(); };
    },
  });
}

// ---------- chapter 3: logical operators, one reduction at a time ----------

function lexLogic(src) {
  const re = /\s*(\d+\.\d+|\d+|"[^"]*"|'[^']*'|[A-Za-z_]\w*|<=|>=|==|!=|[<>()+\-*/])/y;
  const out = [];
  let m;
  re.lastIndex = 0;
  while (re.lastIndex < src.length) {
    if (/^\s*$/.test(src.slice(re.lastIndex))) break;
    const at = re.lastIndex;
    m = re.exec(src);
    if (!m) throw new Error(`can't read “${src.slice(at).trim()}”`);
    out.push(m[1]);
  }
  return out;
}

function parseLogic(src) {
  const toks = lexLogic(src);
  let p = 0;
  const peek = () => toks[p];
  const eat = (t) => { if (t && toks[p] !== t) throw new Error(`expected “${t}”`); return toks[p++]; };
  function or() { let a = and(); while (peek() === "or") { eat(); a = { t: "bin", op: "or", a, b: and() }; } return a; }
  function and() { let a = not(); while (peek() === "and") { eat(); a = { t: "bin", op: "and", a, b: not() }; } return a; }
  function not() { if (peek() === "not") { eat(); return { t: "not", a: not() }; } return cmp(); }
  function cmp() {
    const a = add();
    if (["<", "<=", "==", ">=", ">", "!="].includes(peek())) {
      const op = eat(); const b = add();
      if (["<", "<=", "==", ">=", ">", "!="].includes(peek())) throw new Error("this demo does not do chained comparisons");
      return { t: "cmp", op, a, b };
    }
    return a;
  }
  function add() { let a = mul(); while (peek() === "+" || peek() === "-") { const op = eat(); a = { t: "ar", op, a, b: mul() }; } return a; }
  function mul() { let a = atom(); while (peek() === "*" || peek() === "/") { const op = eat(); a = { t: "ar", op, a, b: atom() }; } return a; }
  function atom() {
    const t = eat();
    if (t === undefined) throw new Error("the expression ends too early");
    if (t === "(") { const e = or(); eat(")"); return { t: "paren", e }; }
    if (t === "-") { const a = atom(); if (a.t === "lit" && typeof a.v === "number") return { t: "lit", v: -a.v, float: a.float }; throw new Error("unary minus only on numbers here"); }
    if (/^\d+\.\d+$/.test(t)) return { t: "lit", v: parseFloat(t), float: true };
    if (/^\d+$/.test(t)) return { t: "lit", v: parseInt(t, 10) };
    if (/^["']/.test(t)) return { t: "lit", v: t.slice(1, -1) };
    if (t === "True" || t === "False") return { t: "lit", v: t === "True" };
    if (t === "None") return { t: "lit", v: null };
    if (t === "x" || t === "day") return { t: "var", name: t };
    throw new Error(`unknown name “${t}” (use True, False, x, day, numbers, strings)`);
  }
  const e = or();
  if (p < toks.length) throw new Error(`unexpected “${toks[p]}”`);
  return e;
}

const litRepr = (n) => (n.float ? pyFloat(n.v) : pyRepr(n.v));
const truthy = (v) => (v === null ? false : typeof v === "string" ? v !== "" : !!v);
const typeName = (n) => (typeof n.v === "string" ? "str" : n.v === null ? "NoneType" : typeof n.v === "boolean" ? "bool" : n.float ? "float" : "int");

function showLogic(n, mark, skip = false) {
  let s;
  if (n.t === "lit") s = esc(litRepr(n));
  else if (n.t === "var") s = n.name;
  else if (n.t === "paren") s = "(" + showLogic(n.e, mark) + ")";
  else if (n.t === "not") s = "not " + showLogic(n.a, mark);
  else {
    const willSkip = n === mark && n.t === "bin" && n.a.t === "lit" && (n.op === "and" ? !truthy(n.a.v) : truthy(n.a.v));
    s = showLogic(n.a, mark) + ` ${esc(n.op)} ` + (willSkip ? `<span class="skip">${showLogic(n.b, null)}</span>` : showLogic(n.b, mark));
  }
  if (skip) return s;
  return n === mark ? `<mark class="redex">${s}</mark>` : s;
}

function findRedex(n) {
  if (n.t === "lit") return null;
  if (n.t === "var") return n;
  if (n.t === "paren") return n.e.t === "lit" ? n : findRedex(n.e);
  if (n.t === "not") return n.a.t === "lit" ? n : findRedex(n.a);
  if (n.t === "bin") return n.a.t === "lit" ? n : findRedex(n.a);
  if (n.a.t !== "lit") return findRedex(n.a);
  if (n.b.t !== "lit") return findRedex(n.b);
  return n;
}

// Rewrite node n in place one step; return a sentence about the step, or throw a Python error.
function reduceLogic(n, env) {
  const become = (m) => { Object.keys(n).forEach((k) => delete n[k]); Object.assign(n, m); };
  if (n.t === "var") { const name = n.name; become({ t: "lit", v: env[name] }); return `Look up <code>${name}</code>: its value is <code>${esc(litRepr(n))}</code>.`; }
  if (n.t === "paren") { const e = n.e; become(e); return "The brackets are worked out first; drop them."; }
  if (n.t === "not") { const r = !truthy(n.a.v); const a = litRepr(n.a); become({ t: "lit", v: r }); return `<code>not ${esc(a)}</code> is <code>${r ? "True" : "False"}</code>.`; }
  if (n.t === "bin") {
    const a = n.a, b = n.b, t = truthy(a.v), A = esc(litRepr(a));
    if (n.op === "and") {
      if (!t) { become(a); return `<b>Short-circuit.</b> The left side <code>${A}</code> is falsy, so <code>and</code> already knows the answer: it is the left side. The right side is <b>never evaluated</b>.`; }
      become(b); return `The left side <code>${A}</code> is truthy, so the answer of <code>and</code> is whatever the right side turns out to be.`;
    }
    if (t) { become(a); return `<b>Short-circuit.</b> The left side <code>${A}</code> is truthy, so <code>or</code> already knows the answer: it is the left side. The right side is <b>never evaluated</b>.`; }
    become(b); return `The left side <code>${A}</code> is falsy, so the answer of <code>or</code> is whatever the right side turns out to be.`;
  }
  const a = n.a, b = n.b, op = n.op, A = esc(litRepr(a)), B = esc(litRepr(b));
  const num = (m) => typeof m.v === "number" || typeof m.v === "boolean";
  if (n.t === "ar") {
    if (!num(a) || !num(b)) throw new Error(`TypeError: unsupported operand type(s) for ${n.op}: '${typeName(a)}' and '${typeName(b)}'`);
    const x = +a.v, y = +b.v;
    if (n.op === "/") {
      if (y === 0) throw new Error("ZeroDivisionError: division by zero");
      become({ t: "lit", v: x / y, float: true });
    } else become({ t: "lit", v: n.op === "+" ? x + y : n.op === "-" ? x - y : x * y, float: a.float || b.float });
    return `Arithmetic before comparison: <code>${A} ${esc(op)} ${B}</code> is <code>${esc(litRepr(n))}</code>.`;
  }
  let r;
  if (n.op === "==" || n.op === "!=") {
    const eq = num(a) && num(b) ? +a.v === +b.v : a.v === b.v;
    r = n.op === "==" ? eq : !eq;
  } else {
    const ok = (num(a) && num(b)) || (typeof a.v === "string" && typeof b.v === "string");
    if (!ok) throw new Error(`TypeError: '${n.op}' not supported between instances of '${typeName(a)}' and '${typeName(b)}'`);
    const x = num(a) ? +a.v : a.v, y = num(b) ? +b.v : b.v;
    r = OPS[n.op](x, y);
  }
  become({ t: "lit", v: r });
  return `<code>${A} ${esc(op)} ${B}</code> is <code>${r ? "True" : "False"}</code>.`;
}

const LOGIC_PRESETS = [
  "not False and True", "not False or True", "not (False or True)", "False and False or True",
  "False and (False or True)", "True or True and False", "(True or True) and False",
  "x != 0 and 10 / x > 1", "10 / x > 1 and x != 0", 'day == "Sat" or day == "Sun"', 'day == "Sat" or "Sun"',
];

function demoLogic(el) {
  let src = LOGIC_PRESETS[0], x = 0, day = "Mon";
  el.innerHTML = `
    <div class="controls" style="margin-top:0">
      <label>expression <select class="lg-p" style="max-width:min(260px, 58vw)">${LOGIC_PRESETS.map((p) => `<option>${esc(p)}</option>`).join("")}<option value="">your own…</option></select></label>
      <input type="text" class="lg-src" value="${esc(src).replace(/"/g, "&quot;")}" style="flex:1;min-width:0;width:100%">
    </div>
    <div class="controls">
      <label>x = ${intInput("lg-x", x, -99, 99)}</label>
      <label>day = <select class="lg-day">${["Mon", "Sat", "Sun"].map((d) => `<option>${d}</option>`).join("")}</select></label>
    </div>
    <div class="expr lg-expr"></div>
    <div class="msg lg-msg"></div>
    <div class="controls">
      <button class="cbtn lg-reset">⟲ Reset</button><button class="cbtn lg-back">◀ Back</button>
      <button class="cbtn lg-step on">Step ▶</button><button class="cbtn lg-play">Play</button>
      <span class="spacer"></span><span class="counter lg-count"></span>
    </div>`;
  const $ = (q) => el.querySelector(q);
  let steps = [], i = 0, timer = null;
  function build() {
    steps = [];
    let tree;
    try { tree = parseLogic(src); } catch (e) { steps = [{ html: esc(src), msg: e.message, cls: "bad" }]; return; }
    const env = { x, day };
    steps.push({ html: showLogic(tree, findRedex(tree)), msg: "Python works out one piece at a time: <code>not</code> first, then <code>and</code>, then <code>or</code>, left to right. The highlighted part is next." });
    for (let guard = 0; guard < 60; guard++) {
      const r = findRedex(tree);
      if (!r) break;
      let msg;
      try { msg = reduceLogic(r, env); } catch (e) {
        steps.push({ html: `<span class="err">${esc(e.message)}</span>`, msg: "Python stops with this error: nothing guarded the risky piece.", cls: "bad" });
        return;
      }
      const nx = findRedex(tree);
      steps.push({ html: showLogic(tree, nx), msg: nx ? msg : `${msg} Result: <code>${esc(litRepr(tree))}</code>.`, cls: nx ? "" : "good" });
    }
  }
  function render() {
    const s = steps[i];
    $(".lg-expr").innerHTML = `<span class="tk-prompt">&gt;&gt;&gt;</span> ${s.html}`;
    $(".lg-msg").innerHTML = s.msg;
    $(".lg-msg").className = "msg lg-msg " + (s.cls || "");
    $(".lg-count").textContent = `step ${i + 1} / ${steps.length}`;
    $(".lg-back").disabled = $(".lg-reset").disabled = i === 0;
    $(".lg-step").disabled = i === steps.length - 1;
  }
  function stop() { clearInterval(timer); timer = null; $(".lg-play").textContent = "Play"; }
  function rebuild() { stop(); build(); i = 0; render(); }
  $(".lg-reset").onclick = () => { stop(); i = 0; render(); };
  $(".lg-back").onclick = () => { stop(); if (i) i--; render(); };
  $(".lg-step").onclick = () => { stop(); if (i < steps.length - 1) i++; render(); };
  $(".lg-play").onclick = () => {
    if (timer) return stop();
    if (i === steps.length - 1) i = 0;
    $(".lg-play").textContent = "Pause";
    timer = setInterval(() => { if (i < steps.length - 1) { i++; render(); } else stop(); }, 1100);
  };
  $(".lg-p").onchange = (e) => { if (e.target.value) { src = e.target.value; $(".lg-src").value = src; rebuild(); } else $(".lg-src").focus(); };
  $(".lg-src").onchange = (e) => { src = e.target.value; rebuild(); };
  $(".lg-x").onchange = (e) => { x = readInt(e, -99, 99, 0); rebuild(); };
  $(".lg-day").onchange = (e) => { day = e.target.value; rebuild(); };
  el.tabIndex = 0;
  el.addEventListener("keydown", (e) => {
    if (["INPUT", "SELECT"].includes(e.target.tagName)) return;
    if (e.key === "ArrowRight") { e.preventDefault(); $(".lg-step").click(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); $(".lg-back").click(); }
  });
  rebuild();
}

// ---------- chapter 4: try / except ----------

function traceTryHello(s) {
  const f = new Flow();
  f.set("astr", s); f.snap(1, `<code>astr</code> refers to the string ${esc(pyRepr(s))}.`, "", { net: "idle" });
  f.snap(2, "Enter the <code>try</code> block. The safety net is now up: an error in this block jumps to <code>except</code>.", "", { net: "up" });
  f.print("Hello"); f.snap(3, "Print <code>Hello</code>.", "", { net: "up" });
  const r = pyInt(s);
  if (r.error) {
    f.snap(4, `<code>int(${esc(pyRepr(s))})</code> fails: <b>${esc(r.error)}</b>. Python leaves the <code>try</code> block <b>at once</b>.`, "bad", { net: "caught", err: r.error });
    f.snap(6, "The error is a <code>ValueError</code>, so this <code>except</code> block catches it. <code>print(\"There\")</code> was skipped.", "", { net: "caught" });
    f.set("istr", -1); f.snap(7, "The <code>except</code> block gives <code>istr</code> a fallback value, −1.", "", { net: "caught" });
  } else {
    f.set("istr", r.value); f.snap(4, `<code>int(${esc(pyRepr(s))})</code> works: it is ${r.value}.`, "", { net: "up" });
    f.print("There"); f.snap(5, "Print <code>There</code>. The <code>try</code> block finished without an error…", "", { net: "up" });
    f.snap(6, "…so the <code>except</code> block is <b>skipped</b>.", "", { net: "unused" });
  }
  f.print("Done", f.vars.istr); f.snap(8, `The program carries on after the statement either way: <code>Done ${f.vars.istr}</code>.`, "good", { net: r.error ? "caught" : "unused" });
  return f;
}

function traceCheckInput(s) {
  const f = new Flow();
  f.input("Enter a number: ", s); f.set("raw_str", s);
  f.snap(1, `<code>input()</code> always returns a string: <code>raw_str</code> is ${esc(pyRepr(s))}.`, "", { net: "idle" });
  f.snap(2, "Enter the <code>try</code> block: the net is up.", "", { net: "up" });
  const r = pyInt(s);
  if (r.error) {
    f.snap(3, `<code>int(raw_str)</code> fails: <b>${esc(r.error)}</b>.`, "bad", { net: "caught", err: r.error });
    f.snap(4, "Caught by <code>except ValueError</code>.", "", { net: "caught" });
    f.set("value", -1); f.snap(5, "<code>value</code> gets the fallback −1, which the next test treats as invalid.", "", { net: "caught" });
  } else {
    f.set("value", r.value); f.snap(3, `<code>int(raw_str)</code> works: ${r.value}.`, "", { net: "up" });
    f.snap(4, "No error, so the <code>except</code> block is skipped.", "", { net: "unused" });
  }
  const v = f.vars.value, ok = v > 0;
  f.snap(7, `Test <code>value > 0</code> → <code>${v} > 0</code> → ${tf(ok)}.`, "", { net: r.error ? "caught" : "unused" });
  if (ok) { f.print("Nice work"); f.snap(8, "Print <code>Nice work</code>.", "good", { net: "unused" }); }
  else { f.snap(9, "Take the <code>else</code> path.", "", { net: r.error ? "caught" : "unused" }); f.print("Invalid number"); f.snap(10, "Print <code>Invalid number</code>.", "good", { net: r.error ? "caught" : "unused" }); }
  return f;
}

function netHTML(s) {
  const st = s.extra ? s.extra.net : "idle";
  const label = { idle: "no safety net yet", up: "in the try block: net up", caught: "error caught by except", unused: "try block finished: except skipped" }[st];
  return `<div class="net ${st}"><span class="dot"></span>${label}${s.extra && s.extra.err ? ` <code>${esc(s.extra.err.split(":")[0])}</code>` : ""}</div>`;
}

function demoTry(el) {
  let prog = "hello", s = "Bob";
  const presets = ["Bob", "123", "Hello bob", " 42 ", "3.5", "-7", "1_000"];
  makeFlow(el, {
    code: () => (prog === "hello" ? CODE.tryHello(s) : CODE.checkInput),
    build: () => (prog === "hello" ? traceTryHello(s) : traceCheckInput(s)),
    renderExtra: netHTML,
    extraControls: `<label>program <select class="tr-p" style="max-width:min(260px, 58vw)"><option value="hello">Hello / There / Done</option><option value="input">checking input</option></select></label>
      <label><span class="tr-lab">astr</span> <input type="text" class="tr-s" value="${s}" list="tr-presets" style="width:120px"></label>
      <datalist id="tr-presets">${presets.map((p) => `<option value="${esc(p)}">`).join("")}</datalist>`,
    onMount(root, rebuild) {
      root.querySelector(".tr-p").onchange = (e) => { prog = e.target.value; root.querySelector(".tr-lab").textContent = prog === "hello" ? "astr" : "user types"; rebuild(); };
      root.querySelector(".tr-s").onchange = (e) => { s = e.target.value.replace(/["\\]/g, "").slice(0, 20); e.target.value = s; rebuild(); };
    },
  });
}

// ---------- chapter 5: the next day ----------

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function traceNextDay(month, day) {
  const f = new Flow();
  f.input("Enter a month (1-12): ", String(month)); f.set("month", month);
  f.snap(2, `The user types ${month}; <code>int()</code> turns the string into the number ${month}.`);
  f.input("Enter a day (1-31): ", String(day)); f.set("day", day);
  f.snap(3, `The user types ${day}.`);
  f.set("days_in_month", { tuple: DAYS_IN_MONTH }); f.snap(5, "A tuple of the month lengths. It never changes, so a tuple is the right choice.", "", { idx: null });
  const k = month - 1, d = DAYS_IN_MONTH[k], ok = day < d;
  f.snap(7, `<code>days_in_month[month - 1]</code> is <code>days_in_month[${k}]</code>, which is ${d}. Test <code>${day} < ${d}</code> → ${tf(ok)}.`, "", { idx: k });
  if (ok) {
    f.print(month, day + 1); f.snap(8, `Same month, next day: <code>${month} ${day + 1}</code>.`, "good", { idx: k });
  } else {
    f.snap(9, "The last day of the month (or past it): go to day 1 of the next month.", "", { idx: k });
    const m2 = (month % 12) + 1;
    f.set("month", m2); f.snap(10, `<code>month % 12 + 1</code> → <code>${month} % 12 + 1</code> → <code>${month % 12} + 1</code> → ${m2}.${month === 12 ? " That is how December wraps round to January." : ""}`, "", { idx: k });
    f.print(m2, 1); f.snap(11, `Print <code>${m2} 1</code>.`, "good", { idx: k });
  }
  return f;
}

function demoNextDay(el) {
  let month = 2, day = 28;
  const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  makeFlow(el, {
    code: CODE.nextDay,
    build: () => traceNextDay(month, day),
    renderExtra: (s) => `<div class="tuplebox"><small>days_in_month</small><div class="cells">${DAYS_IN_MONTH.map((d, k) =>
      `<div class="cellcol"><div class="ptr">${s.extra && s.extra.idx === k ? "month - 1" : ""}</div><div class="cell${s.extra && s.extra.idx === k ? " mid" : ""}">${d}</div><div class="cellidx">${k} · ${names[k]}</div></div>`).join("")}</div></div>`,
    extraControls: `<label>month <select class="nd-m">${names.map((n, k) => `<option value="${k + 1}">${k + 1}</option>`).join("")}</select></label>
      <label>day ${intInput("nd-d", day, 1, 31)}</label>`,
    onMount(root, rebuild) {
      root.querySelector(".nd-m").value = month;
      root.querySelector(".nd-m").onchange = (e) => { month = +e.target.value; rebuild(); };
      root.querySelector(".nd-d").onchange = (e) => { day = readInt(e, 1, 31, 28); rebuild(); };
    },
  });
}

// ---------- chapter 6: while loops ----------

function traceCountdown(n0) {
  const f = new Flow();
  f.set("n", n0); f.snap(1, `<code>n</code> starts at ${n0}: the iteration variable.`);
  let n = n0, test = 0;
  for (;;) {
    const ok = n > 0;
    test++;
    f.snap(2, `Test ${test}: ${cmpMsg("n", ">", n, 0)}. ${ok ? "Run the block." : "The loop ends."}`);
    if (!ok) { f.row([test, n, tf(false), "(loop ends)"]); break; }
    f.print(n); f.row([test, n, tf(true), n]); f.snap(3, `Print ${n}.`);
    n -= 1; f.set("n", n); f.snap(4, `<code>n = n - 1</code>: ${n + 1} − 1 = ${n}. This line is what makes the loop stop eventually. Back to the test.`);
  }
  f.print("Finish"); f.snap(5, `The block ran ${n0} time${n0 === 1 ? "" : "s"}; the condition was tested ${test} time${test === 1 ? "" : "s"}. The last test is the one that ends the loop.`, "good");
  return f;
}

function traceLather() {
  const f = new Flow();
  f.set("n", 5); f.snap(1, "<code>n</code> starts at 5.");
  for (let round = 1; round <= 3; round++) {
    f.snap(2, `Test ${round}: <code>n > 0</code> → <code>5 > 0</code> → ${tf(true)}.`);
    f.row([round, 5, tf(true), "Lather, Rinse"]);
    f.print("Lather"); f.snap(3, "Print <code>Lather</code>.");
    f.print("Rinse"); f.snap(4, `Print <code>Rinse</code>. The block ends here: line 5 is <b>not indented</b>, so it is not part of the loop. Back to the test with <code>n</code> still 5.`, round === 3 ? "bad" : "");
  }
  f.snap(2, "…and so on for ever: nothing inside the loop changes <code>n</code>, so <code>n > 0</code> stays true. This is an <b>infinite loop</b>; press Ctrl+C to stop it. Lines 5 and 6 never run.", "bad");
  return f;
}

function parseWords(text) { return text.split(",").map((w) => w.trim()); }

function traceWordLoop(words, withContinue) {
  const f = new Flow();
  const L = withContinue ? { test: 3, cont: 4, done: 5, brk: 6, pr: 7, end: 8 } : { done: 3, brk: 4, pr: 5, end: 6 };
  for (let k = 0; ; k++) {
    f.snap(1, k === 0 ? "<code>while True:</code> the condition is always true, so only a <code>break</code> can end this loop." : "Back to the top: <code>True</code> is still true.");
    if (k >= words.length) {
      f.input("Enter a word: ", ""); f.error("EOFError: EOF when reading a line");
      f.snap(2, "No more input, and no <code>done</code> was typed: <code>input()</code> raises <code>EOFError</code>. Add <code>done</code> to the words.", "bad");
      return f;
    }
    const w = words[k];
    f.input("Enter a word: ", w); f.set("line", w);
    f.snap(2, `The user types ${esc(pyRepr(w))}.`);
    if (withContinue) {
      const hash = w.startsWith("#");
      f.snap(L.test, `<code>line.startswith("#")</code> → ${tf(hash)}.`);
      if (hash) { f.row([k + 1, esc(pyRepr(w)), "<code>continue</code>", "—"]); f.snap(L.cont, "<code>continue</code>: skip the rest of the block and go straight back to the loop test."); continue; }
    }
    const done = w === "done";
    f.snap(L.done, `<code>line == "done"</code> → ${tf(done)}.`);
    if (done) {
      f.row([k + 1, esc(pyRepr(w)), "<code>break</code>", "—"]);
      f.snap(L.brk, "<code>break</code>: leave the loop at once. <code>print(line)</code> is skipped.");
      break;
    }
    f.print(w); f.row([k + 1, esc(pyRepr(w)), "print", esc(w)]); f.snap(L.pr, `Print <code>${esc(w)}</code>.`);
  }
  const end = withContinue ? "Done" : "Finished";
  f.print(end); f.snap(L.end, `The first line after the loop: <code>${end}</code>.`, "good");
  return f;
}

function traceCollatz(n0) {
  const f = new Flow();
  f.set("n", n0); f.snap(1, `<code>n</code> starts at ${n0}.`);
  f.set("steps", 0); f.snap(2, "<code>steps</code> counts the iterations.");
  let n = n0, steps = 0;
  for (;;) {
    const ok = n !== 1;
    f.snap(3, `${cmpMsg("n", "!=", n, 1)}.${ok ? "" : " The loop ends."}`);
    if (!ok) break;
    const even = n % 2 === 0;
    f.snap(4, `Is ${n} even? <code>${n} % 2 == 0</code> → ${tf(even)}.`);
    const old = n;
    if (even) { n = Math.floor(n / 2); f.set("n", n); f.snap(5, `Halve it: <code>${old} // 2</code> = ${n}.`); }
    else { f.snap(6, "Odd: take the <code>else</code> path."); n = 3 * n + 1; f.set("n", n); f.snap(7, `<code>3 * ${old} + 1</code> = ${n}.`); }
    steps++; f.set("steps", steps); f.row([steps, old, even ? "even: // 2" : "odd: 3n + 1", n]); f.snap(8, `One more step: ${steps}.`);
  }
  f.print(steps); f.snap(9, `${n0} reaches 1 after <b>${steps}</b> steps. Nobody can tell in advance how many steps a starting number needs: an indefinite loop.`, "good");
  return f;
}

const WHILE_TABLES = {
  countdown: ["test", "n", "n > 0", "prints"],
  lather: ["test", "n", "n > 0", "prints"],
  break: ["iteration", "line", "action", "prints"],
  continue: ["iteration", "line", "action", "prints"],
  collatz: ["step", "n before", "rule", "n after"],
};

function demoWhile(el, { mini = false, prog = "countdown" } = {}) {
  let n = 5, words = "hello, there, done", cwords = "hello, # don't print this, print this!, done", cn = 6;
  const codeFor = () => ({ countdown: CODE.countdown(n), lather: CODE.lather, break: CODE.breakLoop, continue: CODE.continueLoop, collatz: CODE.collatz(cn) }[prog]);
  makeFlow(el, {
    mini,
    code: codeFor,
    table: () => WHILE_TABLES[prog],
    rowWord: "test",
    build() {
      if (prog === "countdown") return traceCountdown(n);
      if (prog === "lather") return traceLather();
      if (prog === "break") return traceWordLoop(parseWords(words), false);
      if (prog === "continue") return traceWordLoop(parseWords(cwords), true);
      return traceCollatz(cn);
    },
    extraControls: `<label>program <select class="wl-p" style="max-width:min(260px, 58vw)"><option value="countdown">countdown</option><option value="lather">Lather, Rinse</option>
        <option value="break">break</option><option value="continue">continue</option><option value="collatz">Collatz</option></select></label>
      <label class="wl-in"></label>`,
    onMount(root, rebuild) {
      if (mini) return;
      const lab = root.querySelector(".wl-in");
      function inputs() {
        if (prog === "countdown") lab.innerHTML = `n starts at ${intInput("wl-n", n, 0, 9)}`;
        else if (prog === "break" || prog === "continue") lab.innerHTML = `user types <input type="text" class="wl-w" value="${esc(prog === "break" ? words : cwords)}" style="width:200px">`;
        else if (prog === "collatz") lab.innerHTML = `n starts at ${intInput("wl-c", cn, 1, 99)}`;
        else lab.innerHTML = "";
        const a = lab.querySelector(".wl-n"), b = lab.querySelector(".wl-w"), c = lab.querySelector(".wl-c");
        if (a) a.onchange = (e) => { n = readInt(e, 0, 9, 5); rebuild(); };
        if (b) b.onchange = (e) => { if (prog === "break") words = e.target.value; else cwords = e.target.value; rebuild(); };
        if (c) c.onchange = (e) => { cn = readInt(e, 1, 99, 6); rebuild(); };
      }
      root.querySelector(".wl-p").value = prog;
      root.querySelector(".wl-p").onchange = (e) => { prog = e.target.value; inputs(); rebuild(); };
      inputs();
    },
  });
}

// ---------- chapter 7: for loops and the loop patterns ----------

const PATTERNS = {
  friends: { label: "for each friend", data: ["Tom", "Jerry", "Bat"], code: CODE.friends, cols: ["friend", "prints"] },
  count: { label: "counting", data: [3, 4, 98, 38, 9, 10, 199, 78], code: CODE.count, cols: ["thing", "count", "prints"] },
  sum: { label: "summing", data: [3, 4, 98, 38, 9, 10, 199, 78], code: CODE.sum, cols: ["num", "total", "prints"] },
  average: { label: "average", data: [3, 4, 98, 38, 9, 10, 199, 78], code: CODE.average, cols: ["num", "total", "count", "prints"] },
  filter: { label: "filtering (> 50)", data: [23, 3, 43, 39, 80, 111, 99, 3, 65], code: CODE.filter, cols: ["value", "value > 50", "prints"] },
  search: { label: "search with a flag (74)", data: [9, 41, 12, 3, 74, 15], code: CODE.search, cols: ["value", "value == 74", "found", "prints"] },
  largest: { label: "largest so far", data: [9, 39, 21, 98, 4, 5, 100, 65], code: CODE.largest, cols: ["num", "num > largest?", "largest_so_far", "prints"] },
  smallestBug: { label: "smallest so far (start −1: bug)", data: [9, 39, 21, 98, 4, 5, 100, 65], code: CODE.smallestBug, cols: ["num", "num < smallest?", "smallest_so_far", "prints"] },
  smallestNone: { label: "smallest so far (start None)", data: [9, 39, 21, 98, 4, 5, 100, 65], code: CODE.smallestNone, cols: ["num", "test", "smallest_so_far", "prints"] },
};

function tracePattern(key, xs) {
  const f = new Flow();
  const ex = (k) => ({ k });
  const N = xs.length;
  if (key === "friends") {
    f.set("friends", xs); f.snap(1, "A list of strings.", "", ex(-1));
    xs.forEach((fr, k) => {
      f.set("friend", fr); f.snap(2, `Iteration ${k + 1}: the loop moves <code>friend</code> to the next item, ${esc(pyRepr(fr))}.`, "", ex(k));
      f.print("Happy new year", fr); f.row([esc(pyRepr(fr)), `Happy new year ${esc(fr)}`]); f.snap(3, `Print <code>Happy new year ${esc(fr)}</code>.`, "", ex(k));
    });
    f.snap(2, `No items left: the loop ends after ${N} iteration${N === 1 ? "" : "s"}, one per item.`, "", ex(N));
    f.print("Done"); f.snap(4, "Print <code>Done</code>.", "good", ex(N));
    return f;
  }
  if (key === "count") {
    let count = 0;
    f.set("count", 0); f.snap(1, "<b>Before the loop:</b> the counter starts at 0, “none counted yet”.", "", ex(-1));
    f.print("Before", 0); f.snap(2, "Print <code>Before 0</code>.", "", ex(-1));
    xs.forEach((x, k) => {
      f.set("thing", x); f.snap(3, `Next item: <code>thing</code> = ${x}.`, "", ex(k));
      count++; f.set("count", count); f.snap(4, `Add 1: <code>count</code> = ${count}.`, "", ex(k));
      f.print(count, x); f.row([x, count, `${count} ${x}`]); f.snap(5, `Print <code>${count} ${x}</code>.`, "", ex(k));
    });
    f.print("After", count); f.snap(6, `<b>After the loop</b> the counter holds the answer: ${count} items.`, "good", ex(N));
    return f;
  }
  if (key === "sum" || key === "average") {
    const avg = key === "average";
    const L = avg ? { tot: 2, cnt: 3, bef: 4, loop: 5, add: 6, inc: 7, pr: 8, last: 9 } : { tot: 2, bef: 3, loop: 4, add: 5, pr: 6, last: 7 };
    let total = 0, count = 0;
    f.set("numbers", xs); f.snap(1, "The list to add up.", "", ex(-1));
    f.set("total", 0); f.snap(L.tot, "The accumulator starts at 0: nothing added yet.", "", ex(-1));
    if (avg) { f.set("count", 0); f.snap(L.cnt, "A second accumulator, to count the numbers.", "", ex(-1)); }
    f.print("Before", 0); f.snap(L.bef, "Print <code>Before 0</code>.", "", ex(-1));
    xs.forEach((x, k) => {
      f.set("num", x); f.snap(L.loop, `Next item: <code>num</code> = ${x}.`, "", ex(k));
      total += x; f.set("total", total); f.snap(L.add, `<code>total = total + num</code> → ${total - x} + ${x} = ${total}.`, "", ex(k));
      if (avg) { count++; f.set("count", count); f.snap(L.inc, `<code>count</code> = ${count}.`, "", ex(k)); }
      const line = avg ? `${count} ${total} ${x}` : `${total} ${x}`;
      f.print(line); f.row(avg ? [x, total, count, line] : [x, total, line]); f.snap(L.pr, `Print <code>${line}</code>.`, "", ex(k));
    });
    if (avg) {
      if (count === 0) { f.error("ZeroDivisionError: division by zero"); f.snap(L.last, "An empty list: <code>total / count</code> divides by zero.", "bad", ex(N)); return f; }
      f.print("Last", total, { f: total / count }); f.snap(L.last, `The average is the sum divided by the count: <code>${total} / ${count}</code> = ${pyFloat(total / count)}. (<code>/</code> always gives a float.)`, "good", ex(N));
    } else { f.print("Last", total); f.snap(L.last, `The accumulator holds the sum: ${total}.`, "good", ex(N)); }
    return f;
  }
  if (key === "filter") {
    f.print("Before"); f.snap(1, "Print <code>Before</code>.", "", ex(-1));
    xs.forEach((x, k) => {
      f.set("value", x); f.snap(2, `Next item: <code>value</code> = ${x}.`, "", ex(k));
      const ok = x > 50;
      f.snap(3, `The filter: ${cmpMsg("value", ">", x, 50)}.${ok ? "" : " Skip it."}`, "", ex(k));
      if (ok) { f.print("Large value:", x); f.snap(4, `Print <code>Large value: ${x}</code>.`, "", ex(k)); }
      f.row([x, tf(ok), ok ? `Large value: ${x}` : "—"]);
    });
    f.print("After"); f.snap(5, "Print <code>After</code>. Only the values that passed the test were printed.", "good", ex(N));
    return f;
  }
  if (key === "search") {
    let found = false;
    f.set("found", false); f.snap(1, "The flag starts at <code>False</code>: not found yet.", "", ex(-1));
    f.print("Before", false); f.snap(2, "Print <code>Before False</code>.", "", ex(-1));
    xs.forEach((x, k) => {
      f.set("value", x); f.snap(3, `Next item: <code>value</code> = ${x}.`, "", ex(k));
      const hit = x === 74;
      f.snap(4, `${cmpMsg("value", "==", x, 74)}.`, "", ex(k));
      if (hit) { found = true; f.set("found", true); f.snap(5, "Found it: raise the flag. Nothing ever lowers it again.", "", ex(k)); }
      f.print(found, x); f.row([x, tf(hit), tf(found), `${found ? "True" : "False"} ${x}`]); f.snap(6, `Print <code>${found ? "True" : "False"} ${x}</code>.${found && !hit ? " The loop keeps going even though the answer is known (Exercise 3 adds a <code>break</code>)." : ""}`, "", ex(k));
    });
    f.print("After", found); f.snap(7, `After the loop the flag answers the question: ${tf(found)}.`, "good", ex(N));
    return f;
  }
  const isNone = key === "smallestNone", smaller = key !== "largest";
  const name = smaller ? "smallest_so_far" : "largest_so_far";
  const op = smaller ? "<" : ">";
  let best = isNone ? null : -1;
  f.set(name, best);
  f.snap(1, isNone ? "Start with <code>None</code>: nothing seen yet." : `Start at −1.${smaller ? " Watch what happens: no number in the list is smaller than −1." : ""}`, "", ex(-1));
  f.print("Before", best); f.snap(2, `Print <code>Before ${pyRepr(best)}</code>.`, "", ex(-1));
  const L = isNone ? { loop: 3, none: 4, take1: 5, cmp: 6, take2: 7, pr: 8, after: 9 } : { loop: 3, cmp: 4, take2: 5, pr: 6, after: 7 };
  xs.forEach((x, k) => {
    f.set("num", x); f.snap(L.loop, `Next item: <code>num</code> = ${x}.`, "", ex(k));
    let test;
    if (isNone) {
      const first = best === null;
      f.snap(L.none, `<code>${name} is None</code> → ${tf(first)}.${first ? " Nothing seen yet, so this item is the best so far." : ""}`, "", ex(k));
      if (first) { best = x; f.set(name, x); f.snap(L.take1, `<code>${name}</code> = ${x}.`, "", ex(k)); test = "is None"; }
    }
    if (test === undefined) {
      const ok = OPS[op](x, best);
      f.snap(L.cmp, `<code>num ${opHTML(op)} ${name}</code> → <code>${x} ${opHTML(op)} ${best}</code> → ${tf(ok)}.`, "", ex(k));
      test = `${x} ${op} ${best}: ${ok ? "True" : "False"}`;
      if (ok) { best = x; f.set(name, x); f.snap(L.take2, `A new ${smaller ? "smallest" : "largest"} so far: ${x}.`, "", ex(k)); }
    }
    f.print(best, x); f.row([x, esc(test), best, `${best} ${x}`]); f.snap(L.pr, `Print <code>${best} ${x}</code>.`, "", ex(k));
  });
  f.print("After", best);
  const real = best === null || xs.includes(best);
  f.snap(L.after, real ? `After the loop: ${pyRepr(best)}.` : `After the loop: ${best} — which is <b>not even in the list</b>. The starting value −1 was never beaten. Start with <code>None</code> instead.`, real ? "good" : "bad", ex(N));
  return f;
}

function demoPatterns(el, { mini = false, key = "largest" } = {}) {
  let data = PATTERNS[key].data.slice();
  makeFlow(el, {
    mini,
    code: () => PATTERNS[key].code(data),
    build: () => tracePattern(key, data),
    table: () => PATTERNS[key].cols,
    renderExtra: (s) => {
      const k = s.extra ? s.extra.k : -1;
      return `<div class="cells">${data.map((v, j) => `<div class="cellcol"><div class="ptr">${j === k ? "▼" : ""}</div><div class="cell${j === k ? " mid" : j < k ? " seen" : ""}">${esc(pyStr(v))}</div><div class="cellidx">${j}</div></div>`).join("")}</div>`;
    },
    extraControls: `<label>pattern <select class="pt-p" style="max-width:min(260px, 58vw)">${Object.entries(PATTERNS).map(([k, p]) => `<option value="${k}">${p.label}</option>`).join("")}</select></label>
      <label>list <input type="text" class="pt-d" value="${esc(data.join(", "))}" style="width:190px"></label>`,
    onMount(root, rebuild) {
      if (mini) return;
      const sel = root.querySelector(".pt-p"), inp = root.querySelector(".pt-d");
      sel.value = key;
      sel.onchange = (e) => { key = e.target.value; data = PATTERNS[key].data.slice(); inp.value = data.join(", "); rebuild(); };
      inp.onchange = (e) => {
        if (key === "friends") data = e.target.value.split(",").map((w) => w.trim().replace(/["'\\]/g, "")).filter(Boolean).slice(0, 8);
        else data = e.target.value.split(/[\s,]+/).filter(Boolean).map(Number).filter(Number.isFinite).map(Math.trunc).slice(0, 10);
        e.target.value = data.join(", ");
        rebuild();
      };
    },
  });
}

// ---------- chapter 8: is versus ==, strings, floats ----------

function demoIdentity(el) {
  // Each step: the REPL line, the objects and names after it, and a sentence.
  const steps = [
    { line: 1, names: { a: "L1" }, objs: [[1, 2, 3]], msg: "<code>[1, 2, 3]</code> builds a new list object; <code>a</code> is a name for it." },
    { line: 2, names: { a: "L1", b: "L2" }, objs: [[1, 2, 3], [1, 2, 3]], msg: "A second <code>[1, 2, 3]</code> builds a <b>second</b> list object, with equal contents." },
    { line: 3, names: { a: "L1", b: "L2" }, objs: [[1, 2, 3], [1, 2, 3]], msg: "<code>a == b</code>: same <b>value</b>? Both lists hold 1, 2, 3, so <code>True</code>.", hi: ["a", "b"], res: "True" },
    { line: 5, names: { a: "L1", b: "L2" }, objs: [[1, 2, 3], [1, 2, 3]], msg: "<code>a is b</code>: the very same <b>object</b>? The arrows point to two different boxes, so <code>False</code>.", hi: ["a", "b"], res: "False" },
    { line: 7, names: { a: "L1", b: "L2", c: "L1" }, objs: [[1, 2, 3], [1, 2, 3]], msg: "<code>c = a</code> copies nothing: <code>c</code> becomes a second name for the object <code>a</code> refers to." },
    { line: 8, names: { a: "L1", b: "L2", c: "L1" }, objs: [[1, 2, 3], [1, 2, 3]], msg: "<code>c is a</code>: both arrows end at the same box, so <code>True</code>.", hi: ["c", "a"], res: "True" },
    { line: 10, names: { a: "L1", b: "L2", c: "L1" }, objs: [[99, 2, 3], [1, 2, 3]], msg: "<code>c[0] = 99</code> changes the object that <code>c</code> refers to…", hi: ["c"] },
    { line: 11, names: { a: "L1", b: "L2", c: "L1" }, objs: [[99, 2, 3], [1, 2, 3]], msg: "…so <code>a</code> shows <code>[99, 2, 3]</code>: it is the same list.", hi: ["a"] },
    { line: 13, names: { a: "L1", b: "L2", c: "L1" }, objs: [[99, 2, 3], [1, 2, 3]], msg: "<code>b</code> is a different list and is untouched. Rule: compare values with <code>==</code>; use <code>is</code> only for <code>None</code>, <code>True</code>, <code>False</code>.", hi: ["b"], cls: "good" },
  ];
  el.innerHTML = `<div class="stepper"><div class="id-code"></div><div class="svgbox id-svg"></div></div>
    <div class="msg id-msg"></div>
    <div class="controls"><button class="cbtn id-reset">⟲ Reset</button><button class="cbtn id-back">◀ Back</button>
      <button class="cbtn id-step on">Step ▶</button><span class="spacer"></span><span class="counter id-count"></span></div>`;
  const $ = (q) => el.querySelector(q);
  $(".id-code").innerHTML = codeBlock(CODE.identity, "repl");
  const lines = [...el.querySelectorAll(".id-code .ln")];
  let i = 0;
  function render() {
    const s = steps[i];
    lines.forEach((ln, k) => {
      ln.classList.toggle("hl", k + 1 === s.line || (s.res && k + 1 === s.line + 1) || ([11, 13].includes(s.line) && k + 1 === s.line + 1));
      ln.style.opacity = k + 1 > s.line + 1 || (k + 1 === s.line + 1 && !s.res && ![11, 13].includes(s.line)) ? 0.25 : 1;
    });
    const W = 360, H = 220, ys = { a: 40, b: 150, c: 95 };
    const oy = { L1: 40, L2: 150 };
    let g = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="names and objects"><defs><marker id="idah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink-2)"/></marker></defs>`;
    g += `<text x="30" y="16" font-size="11" fill="var(--stone)" text-anchor="middle">names</text><text x="250" y="16" font-size="11" fill="var(--stone)" text-anchor="middle">objects</text>`;
    s.objs.forEach((o, k) => {
      const y = oy[k ? "L2" : "L1"];
      g += `<rect x="170" y="${y - 18}" width="160" height="36" rx="6" fill="var(--card)" stroke="var(--line)"/>`;
      o.forEach((v, j) => {
        g += `<rect x="${176 + j * 50}" y="${y - 12}" width="46" height="24" rx="4" fill="${v === 99 ? "var(--mark)" : "var(--paper-2)"}" stroke="${v === 99 ? "var(--amber)" : "var(--line)"}"/>`;
        g += `<text x="${199 + j * 50}" y="${y + 5}" font-size="13" text-anchor="middle" fill="var(--ink)">${v}</text>`;
      });
      g += `<text x="250" y="${y + 32}" font-size="10" text-anchor="middle" fill="var(--stone)">list object ${k + 1}</text>`;
    });
    Object.entries(s.names).forEach(([n, o]) => {
      const y = ys[n], hi = s.hi && s.hi.includes(n);
      g += `<rect x="10" y="${y - 14}" width="40" height="28" rx="6" fill="${hi ? "var(--mark)" : "var(--card)"}" stroke="${hi ? "var(--amber)" : "var(--teal)"}" stroke-width="${hi ? 2 : 1.4}"/>`;
      g += `<text x="30" y="${y + 5}" font-size="14" font-weight="600" text-anchor="middle" fill="var(--ink)">${n}</text>`;
      g += `<path d="M 52 ${y} C 110 ${y}, 110 ${oy[o]}, 166 ${oy[o]}" fill="none" stroke="${hi ? "var(--amber)" : "var(--ink-2)"}" stroke-width="${hi ? 2 : 1.4}" marker-end="url(#idah)"/>`;
    });
    if (s.res) g += `<text x="${W / 2 - 50}" y="${H - 6}" font-size="13" font-weight="700" fill="${s.res === "True" ? "var(--green)" : "var(--red)"}">→ ${s.res}</text>`;
    g += "</svg>";
    $(".id-svg").innerHTML = g;
    $(".id-msg").innerHTML = s.msg;
    $(".id-msg").className = "msg id-msg " + (s.cls || "");
    $(".id-count").textContent = `step ${i + 1} / ${steps.length}`;
    $(".id-back").disabled = $(".id-reset").disabled = i === 0;
    $(".id-step").disabled = i === steps.length - 1;
  }
  $(".id-reset").onclick = () => { i = 0; render(); };
  $(".id-back").onclick = () => { if (i) i--; render(); };
  $(".id-step").onclick = () => { if (i < steps.length - 1) i++; render(); };
  el.tabIndex = 0;
  el.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); $(".id-step").click(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); $(".id-back").click(); }
  });
  render();
}

function demoStrCmp(el) {
  let s1 = "hello", s2 = "Bye";
  el.innerHTML = `<div class="controls" style="margin-top:0">
      <label>left <input type="text" class="sc-a" value="${s1}" style="width:110px"></label>
      <label>right <input type="text" class="sc-b" value="${s2}" style="width:110px"></label>
      <label>presets <select class="sc-p" style="max-width:min(260px, 58vw)"><option value="hello|Bye">"hello" vs "Bye"</option><option value="AAB|AAC">"AAB" vs "AAC"</option>
        <option value="apple|apricot">"apple" vs "apricot"</option><option value="Zebra|apple">"Zebra" vs "apple"</option>
        <option value="cat|catalog">"cat" vs "catalog"</option><option value="10|9">"10" vs "9"</option></select></label></div>
    <div class="sc-rows"></div><div class="msg sc-msg"></div>
    <div class="controls"><button class="cbtn sc-reset">⟲ Reset</button><button class="cbtn sc-back">◀ Back</button>
      <button class="cbtn sc-step on">Step ▶</button><span class="spacer"></span><span class="counter sc-count"></span></div>`;
  const $ = (q) => el.querySelector(q);
  let steps = [], i = 0;
  function build() {
    steps = [{ k: -1, msg: `Is <code>${esc(pyRepr(s1))} &lt; ${esc(pyRepr(s2))}</code>? Python compares the strings letter by letter from the left.` }];
    const n = Math.min(s1.length, s2.length);
    for (let k = 0; k < n; k++) {
      const a = s1.codePointAt(k), b = s2.codePointAt(k);
      if (a === b) { steps.push({ k, msg: `Position ${k}: <code>${esc(pyRepr(s1[k]))}</code> and <code>${esc(pyRepr(s2[k]))}</code> are the same character (${a}). Move on.` }); continue; }
      steps.push({ k, diff: true, msg: `Position ${k}: <code>${esc(pyRepr(s1[k]))}</code> is ${a}, <code>${esc(pyRepr(s2[k]))}</code> is ${b}. They differ, and this pair decides: ${esc(pyRepr(s1))} ${a < b ? "&lt;" : "&gt;"} ${esc(pyRepr(s2))}. So <code>${esc(pyRepr(s1))} &lt; ${esc(pyRepr(s2))}</code> is ${tf(a < b)}.`, cls: "good" });
      return;
    }
    const lt = s1.length < s2.length;
    const msg = s1.length === s2.length ? `All characters are equal: the strings are equal, so <code>&lt;</code> is ${tf(false)} and <code>==</code> is ${tf(true)}.`
      : `${esc(pyRepr(lt ? s1 : s2))} ran out first, so it is the smaller one. <code>${esc(pyRepr(s1))} &lt; ${esc(pyRepr(s2))}</code> is ${tf(lt)}.`;
    steps.push({ k: n, end: true, msg, cls: "good" });
  }
  function row(s, k, d) {
    return `<div class="cells sc">${[...s].map((ch, j) => `<div class="cellcol"><div class="cell${j < k ? " seen" : j === k ? (d ? " found" : " mid") : ""}">${ch === " " ? "␣" : esc(ch)}</div><div class="cellidx">${ch.codePointAt(0)}</div></div>`).join("") || `<span class="vempty">(empty)</span>`}</div>`;
  }
  function render() {
    const s = steps[i];
    $(".sc-rows").innerHTML = row(s1, s.k, s.diff) + row(s2, s.k, s.diff);
    $(".sc-msg").innerHTML = s.msg;
    $(".sc-msg").className = "msg sc-msg " + (s.cls || "");
    $(".sc-count").textContent = `step ${i + 1} / ${steps.length}`;
    $(".sc-back").disabled = $(".sc-reset").disabled = i === 0;
    $(".sc-step").disabled = i === steps.length - 1;
  }
  function rebuild() { build(); i = 0; render(); }
  $(".sc-reset").onclick = () => { i = 0; render(); };
  $(".sc-back").onclick = () => { if (i) i--; render(); };
  $(".sc-step").onclick = () => { if (i < steps.length - 1) i++; render(); };
  $(".sc-a").onchange = (e) => { s1 = e.target.value.slice(0, 12); e.target.value = s1; rebuild(); };
  $(".sc-b").onchange = (e) => { s2 = e.target.value.slice(0, 12); e.target.value = s2; rebuild(); };
  $(".sc-p").onchange = (e) => { [s1, s2] = e.target.value.split("|"); $(".sc-a").value = s1; $(".sc-b").value = s2; rebuild(); };
  el.tabIndex = 0;
  el.addEventListener("keydown", (e) => {
    if (["INPUT", "SELECT"].includes(e.target.tagName)) return;
    if (e.key === "ArrowRight") { e.preventDefault(); $(".sc-step").click(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); $(".sc-back").click(); }
  });
  rebuild();
}

function demoFloatSum(el) {
  // Python evaluates x + x + ... left to right: one addition per step. JS doubles are the same IEEE 754 doubles.
  const rows = [];
  let t = 0.1;
  rows.push([1, "x", pyFloat(t)]);
  for (let k = 2; k <= 10; k++) { t = t + 0.1; rows.push([k, `+ x`, pyFloat(t)]); }
  el.innerHTML = `${codeBlock(CODE.floatAdd, "repl")}<div class="vt-wrap"><table class="vt fs"><thead><tr><th>terms</th><th>step</th><th>running total (as Python shows it)</th><th>exact decimal?</th></tr></thead><tbody></tbody></table></div>
    <div class="msg fs-msg"></div>
    <div class="controls"><button class="cbtn fs-reset">⟲ Reset</button><button class="cbtn fs-back">◀ Back</button>
      <button class="cbtn fs-step on">Step ▶</button><span class="spacer"></span><span class="counter fs-count"></span></div>`;
  const $ = (q) => el.querySelector(q);
  let i = 0;
  const exact = (k) => (k / 10).toFixed(1);
  function render() {
    $(".fs tbody").innerHTML = rows.slice(0, i + 1).map((r, k) => {
      const ok = r[2] === exact(k + 1);
      return `<tr class="${k === i ? "last" : ""}"><td>${r[0]}</td><td><code>${r[1]}</code></td><td><code>${r[2]}</code></td><td>${ok ? `<b class="t">${exact(k + 1)}</b>` : `<b class="f">not ${exact(k + 1)}</b>`}</td></tr>`;
    }).join("");
    const r = rows[i];
    $(".fs-msg").innerHTML = i === 0 ? "<code>x</code> is 0.1, but the float stored is only the closest binary number to 0.1. Step through the additions."
      : i === 9 ? "Ten additions: <code>0.9999999999999999</code>, so <code>1 == x + x + … + x</code> is <b class=\"f\">False</b>. Compare floats with a tolerance: <code>abs(a - b) &lt; 1e-9</code>."
        : r[2] === exact(i + 1) ? `${i + 1} terms: <code>${r[2]}</code>. The rounding errors happen to cancel here.` : `${i + 1} terms: <code>${r[2]}</code>. The tiny errors have added up enough to show.`;
    $(".fs-msg").className = "msg fs-msg " + (i === 9 ? "bad" : "");
    $(".fs-count").textContent = `step ${i + 1} / ${rows.length}`;
    $(".fs-back").disabled = $(".fs-reset").disabled = i === 0;
    $(".fs-step").disabled = i === rows.length - 1;
  }
  $(".fs-reset").onclick = () => { i = 0; render(); };
  $(".fs-back").onclick = () => { if (i) i--; render(); };
  $(".fs-step").onclick = () => { if (i < rows.length - 1) i++; render(); };
  el.tabIndex = 0;
  el.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); $(".fs-step").click(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); $(".fs-back").click(); }
  });
  render();
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

// Styles for the widgets that only this lecture uses (the shared style.css stays untouched).
document.head.insertAdjacentHTML("beforeend", `<style>
  .fx-side { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
  .vbox, .term-wrap, .tuplebox, .nline { background: var(--paper-2); border-radius: 10px; padding: 8px 10px; }
  .vbox small, .term-wrap small, .tuplebox small, .nline small { display: block; font: 500 11px var(--mono); color: var(--stone); margin-bottom: 6px; }
  .term-wrap .console { margin-top: 0; }
  .vrow { display: flex; gap: 10px; align-items: baseline; font: 13px/1.6 var(--mono); padding: 2px 8px; border-radius: 6px; border: 1px solid var(--line); background: var(--card); margin-bottom: 4px; overflow-wrap: anywhere; }
  .vrow .vn { font-weight: 600; min-width: 4.5em; }
  .vrow .vv { color: var(--ink-2); }
  .vrow.changed { border-color: var(--amber); background: var(--mark); }
  .vempty { color: var(--stone); font: 12px var(--mono); }
  .console .typed { color: var(--teal); font-weight: 600; text-decoration: underline dotted; }
  .console .err, .expr .err { color: var(--red); }
  pre.code .ln.ran::before { color: var(--green); font-weight: 600; }
  b.t { color: var(--green); } b.f { color: var(--red); }
  .vt-wrap { margin-top: 10px; max-height: 260px; overflow: auto; border: 1px solid var(--line); border-radius: 8px; }
  table.vt { border-collapse: collapse; width: 100%; font: 12.5px/1.45 var(--mono); }
  table.vt th, table.vt td { border-bottom: 1px solid var(--line); padding: 4px 10px; text-align: left; white-space: nowrap; }
  table.vt th { position: sticky; top: 0; background: var(--card-2, var(--paper-2)); font-weight: 600; color: var(--ink-2); }
  table.vt tr.last td { background: var(--mark); }
  .cell.seen { opacity: 0.55; }
  .fx-extra .cell, .sc-rows .cell { width: auto; min-width: 38px; padding: 0 7px; }
  .cells.sc { justify-content: flex-start; }
  .nline .legend { display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 12.5px; margin-top: 4px; }
  .nline .legend i { display: inline-block; width: 11px; height: 11px; border-radius: 3px; margin-right: 5px; vertical-align: -1px; opacity: 0.8; }
  .nline .legend .dead { color: var(--red); font-weight: 600; }
  .fx-extra:not(:empty) { margin-bottom: 12px; }
  .net { display: inline-flex; align-items: center; gap: 8px; font: 500 12.5px var(--mono); padding: 5px 12px; border-radius: 999px; border: 1px solid var(--line); background: var(--paper-2); color: var(--stone); }
  .net .dot { width: 9px; height: 9px; border-radius: 50%; background: var(--stone); }
  .net.up { color: var(--teal); border-color: var(--teal); } .net.up .dot { background: var(--teal); }
  .net.caught { color: var(--red); border-color: var(--red); background: var(--red-soft); } .net.caught .dot { background: var(--red); }
  .net.unused { color: var(--green); border-color: var(--green); background: var(--green-soft); } .net.unused .dot { background: var(--green); }
  .expr { margin-top: 12px; padding: 14px 16px; background: var(--code-bg); border: 1px solid var(--line); border-radius: 10px; font: 16px/1.7 var(--mono); overflow-x: auto; white-space: nowrap; }
  .expr mark.redex { background: var(--mark); color: inherit; border-bottom: 2px solid var(--amber); border-radius: 3px; padding: 0 2px; }
  .expr .skip { text-decoration: line-through; color: var(--stone); }
  .truthy { display: flex; flex-wrap: wrap; gap: 8px; }
  .truthy .opt { padding: 6px 12px; }
  @media (max-width: 600px) { .expr { font-size: 14px; } .vt-wrap { max-height: 220px; } }
</style>`);

// Demo registry: data-demo="name" in chapters.js mounts DEMOS[name].
const DEMOS = {
  sixIfs: (el) => demoSixIfs(el),
  truthy: (el) => demoTruthy(el),
  branch: (el) => demoBranch(el, { prog: "twoWay" }),
  chain: (el) => demoBranch(el, { prog: "chain" }),
  never: (el) => demoBranch(el, { prog: "never2" }),
  branchMini: (el) => demoBranch(el, { mini: true, prog: "chain" }),
  logic: (el) => demoLogic(el),
  tryFlow: (el) => demoTry(el),
  nextDay: (el) => demoNextDay(el),
  whileLoop: (el) => demoWhile(el),
  whileBreak: (el) => demoWhile(el, { prog: "break" }),
  collatz: (el) => demoWhile(el, { prog: "collatz" }),
  countdownMini: (el) => demoWhile(el, { mini: true }),
  patterns: (el) => demoPatterns(el, { key: "count" }),
  smallest: (el) => demoPatterns(el, { key: "smallestBug" }),
  forEach: (el) => demoPatterns(el, { key: "friends" }),
  patternMini: (el) => demoPatterns(el, { mini: true, key: "largest" }),
  identity: (el) => demoIdentity(el),
  strCmp: (el) => demoStrCmp(el),
  floatSum: (el) => demoFloatSum(el),
  quiz: (el) => demoQuiz(el, QUIZ),
};
