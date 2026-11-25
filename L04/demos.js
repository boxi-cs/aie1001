// Interactive demos. Every code panel is copied from notes/L04-functions-strings-files.md
// (checked by tools/check.py); the JS twins below replay what Python does, step by step.

const CODE = {
  hello: `def hello():
    print("Hello")
    print("Funny")


hello()
print("Something in the middle.")
hello()`,
  lyricsNoCall: `x = 5
print("Hello")


def print_lyrics():
    print("I am a lumberjack, and I am okay.")
    print("I sleep all night and I work all day.")


print("Yo")
x = x + 2
print(x)`,
  lyrics: `x = 5
print("Hello")


def print_lyrics():
    print("I am a lumberjack, and I am okay.")
    print("I sleep all night and I work all day.")


print("Yo")
print_lyrics()
x = x + 2
print(x)`,
  greetPrint: `def greet(lang):
    if lang == "es":
        print("Hola")
    elif lang == "fr":
        print("Bonjour")
    else:
        print("Hello")`,
  greetSimple: `def greet():
    return "Hello"


print(greet(), "Glenn")
print(greet(), "Sally")`,
  greetReturn: `def greet(lang):
    if lang == "es":
        return "Hola"
    elif lang == "fr":
        return "Bonjour"
    else:
        return "Hello"`,
  printVsReturn: `def greet_print(lang):
    if lang == "es":
        print("Hola")
    else:
        print("Hello")


def greet_return(lang):
    if lang == "es":
        return "Hola"
    else:
        return "Hello"


print(greet_return("es"), "Sally")
print(greet_print("es"), "Sally")`,
  printGrade: `def print_grade(score):
    """Print the letter grade for a score."""
    if score >= 90.0:
        print("A")
    elif score >= 80.0:
        print("B")
    elif score >= 70.0:
        print("C")
    elif score >= 60.0:
        print("D")
    else:
        print("F")


def main():
    score = float(input("Enter a score: "))
    print("The grade is ", end=" ")
    print_grade(score)`,
  addTwo: `def add_two(a, b):
    total = a + b
    return total


x = add_two(3, 5)
print(x)`,
  printArea: `def print_area(width=1, height=2):
    area = width * height
    print("width:", width, "height:", height, "area:", area)


print_area()                   # default arguments: width = 1 and height = 2
print_area(4, 2.5)             # positional arguments: width = 4 and height = 2.5
print_area(height=5, width=3)  # keyword arguments: width = 3 and height = 5
print_area(width=1.2)          # default height = 2
print_area(height=6.2)         # default width = 1`,
  sortPair: `def sort_pair(number1, number2):
    if number1 < number2:
        return number1, number2
    else:
        return number2, number1


n1, n2 = sort_pair(3, 2)
print("n1 is", n1)
print("n2 is", n2)`,
  scopeLocal: `global_var = 1


def f1():
    local_var = 2
    print(global_var)
    print(local_var)


f1()
print(global_var)`,
  scopeShadow: `x = 1


def f1():
    x = 2
    print(x)  # displays 2


f1()
print(x)  # displays 1`,
  scopeGlobal: `x = 1


def increase():
    global x
    x = x + 1
    print(x)  # displays 2


increase()
print(x)  # displays 2`,
  computePay: `def compute_pay(hours, rate):
    """Return the pay for hours worked; hours over 40 earn 1.5 times the rate."""
    if hours <= 40:
        return hours * rate
    return 40 * rate + (hours - 40) * rate * 1.5`,
  computePayMain: `def main():
    hours = float(input("Enter hours: "))
    rate = float(input("Enter rate: "))
    print("Pay:", compute_pay(hours, rate))`,
  forLoop: `fruit = "Morpheus"

n = 0
for i in fruit:
    print(n, i)
    n = n + 1

print("finished")`,
  whileLoop: `fruit = "banana"
index = 0
while index < len(fruit):
    letter = fruit[index]
    print(index, letter)
    index = index + 1`,
  countA: (word) => `word = "${word}"
count = 0
for letter in word:
    if letter == "a":
        count = count + 1
print("The number of 'a' we have seen is:", count)`,
  getHost: `def get_host(line):
    atpos = line.find("@")
    sppos = line.find(" ", atpos)
    return line[atpos + 1 : sppos]`,
  writeHosts: `fhand = open("myhost.txt", "w")
fhand.write("# Gmail web Start\\n")
fhand.write("216.239.38.125  gmail.com\\n")
fhand.write("216.239.38.125  inbox.google.com\\n")
fhand.write("216.239.38.125  mail.google.com\\n")
fhand.write("216.239.38.125  www.gmail.com\\n")
fhand.write("# Gmail web End\\n")
fhand.close()`,
  readPrint: `fhand = open("myhost.txt", "r")

for line in fhand:
    print(line)

fhand.close()`,
  readStrip: `fhand = open("myhost.txt", "r")
for line in fhand:
    line = line.rstrip()
    print(line)
fhand.close()`,
  readCount: `fhand = open("myhost.txt", "r")
count = 0
for line in fhand:
    count = count + 1
print("Line count:", count)
fhand.close()`,
  readSearch: `fhand = open("myhost.txt", "r")
for line in fhand:
    line = line.rstrip()
    if line.startswith("#"):
        print(line)
print("finished.")
fhand.close()`,
  readAll: `fhand = open("myhost.txt", "r")
all_text = fhand.read()
print("The length of the file:", len(all_text))
print("The first 20 characters of the file:", all_text[:20])
fhand.close()`,
  writeTest: `fhand = open("test.txt", "w")
fhand.write("The first line\\n")
fhand.write("The second line\\n")
fhand.write("The third line\\n")
fhand.close()`,
  countVowels: `def count_vowels(word):
    count = 0
    for letter in word:
        if letter in "aeiou":
            count = count + 1
    return count`,
};

const HOST_LINES = [
  "# Gmail web Start",
  "216.239.38.125  gmail.com",
  "216.239.38.125  inbox.google.com",
  "216.239.38.125  mail.google.com",
  "216.239.38.125  www.gmail.com",
  "# Gmail web End",
];

// Widget styles that the shared stylesheet doesn't have (character cells, file panel).
document.head.insertAdjacentHTML("beforeend", `<style>
.l4-chars { display: flex; flex-wrap: wrap; gap: 3px; justify-content: center; margin: 8px 0; }
.l4-ch { display: flex; flex-direction: column; align-items: center; }
.l4-ch .c { width: 34px; height: 36px; display: grid; place-items: center; border: 1px solid var(--line);
  border-radius: 6px; background: var(--card); font: 600 15px var(--mono); white-space: pre; transition: all 0.15s; }
.l4-ch .i { font: 10.5px var(--mono); color: var(--stone); line-height: 1.3; }
.l4-ch .i.neg { color: var(--line); }
.l4-ch.sel .c { background: var(--mark); border-color: var(--amber); }
.l4-ch.cur .c { background: var(--teal-soft); border-color: var(--teal); }
.l4-ch.err .c { background: var(--red-soft); border-color: var(--red); color: var(--red); }
.l4-ch.ghost .c { border-style: dashed; color: var(--stone); background: transparent; }
.l4-expr { font: 14px/1.6 var(--mono); background: var(--code-bg); border: 1px solid var(--line); border-radius: 8px;
  padding: 8px 12px; margin-top: 8px; overflow-wrap: anywhere; }
.l4-expr .p { color: var(--stone); }
.l4-expr .r { color: var(--green); font-weight: 600; }
.l4-expr .e { color: var(--red); font-weight: 600; }
.l4-file { background: var(--code-bg); border: 1px solid var(--line); border-radius: 8px; padding: 6px 0;
  font: 12.5px/1.6 var(--mono); margin-bottom: 10px; }
.l4-file .fh { padding: 0 12px 4px; color: var(--stone); font-size: 11px; display: flex; justify-content: space-between; gap: 8px; }
.l4-file .row { display: flex; gap: 6px; padding: 0 12px; white-space: pre; overflow-wrap: anywhere; }
.l4-file .row .arrow { width: 1.2em; flex: none; color: var(--amber); font-weight: 700; }
.l4-file .row .t { white-space: pre-wrap; overflow-wrap: anywhere; min-width: 0; }
.l4-file .row.cur { background: var(--mark); }
.l4-file .row.done .t { color: var(--stone); }
.l4-nl { font-size: 10px; padding: 0 3px; border-radius: 3px; background: var(--teal-soft); color: var(--teal); margin-left: 2px; }
.l4-line { font: 13.5px/2 var(--mono); background: var(--code-bg); border: 1px solid var(--line); border-radius: 8px;
  padding: 6px 10px; overflow-wrap: anywhere; word-break: break-all; }
.l4-line span { padding: 2px 0; border-radius: 3px; white-space: pre-wrap; }
.l4-line .at { background: var(--mark); outline: 1px solid var(--amber); }
.l4-line .sp { background: var(--red-soft); outline: 1px solid var(--red); }
.l4-line .sl { background: var(--green-soft); color: var(--green); font-weight: 600; }
.l4-bind { width: 100%; border-collapse: collapse; font: 13px var(--mono); margin-top: 6px; }
.l4-bind th, .l4-bind td { border-bottom: 1px solid var(--line); padding: 4px 8px; text-align: left; }
.l4-bind th { font: 500 11px var(--mono); color: var(--stone); text-transform: uppercase; }
.l4-bind .default { color: var(--stone); } .l4-bind .keyword { color: var(--amber); } .l4-bind .positional { color: var(--teal); }
[data-demo="printReturnMini"] .stepper.mini { grid-template-columns: minmax(0, 1.7fr) minmax(0, 0.8fr); }
[data-demo="printReturnMini"] .stepper.mini pre.code { font-size: 10.5px; }
@media (max-width: 600px) { .l4-chars { gap: 2px; } .l4-ch .c { width: 22px; height: 30px; font-size: 12px; border-radius: 5px; } .l4-ch .i { font-size: 9px; } }
</style>`);

// ---------- helpers ----------

// Python's repr() of a string.
function pyRepr(s) {
  const q = s.includes("'") && !s.includes('"') ? '"' : "'";
  let body = s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/\t/g, "\\t");
  if (q === "'") body = body.replace(/'/g, "\\'");
  return q + body + q;
}

// Python's float repr for the simple values used here (475 -> "475.0").
const pyFloat = (x) => (Number.isInteger(x) ? `${x}.0` : String(x));

// Python slice bounds: a or b may be null (left out) or negative.
function sliceBounds(n, a, b) {
  const fix = (v, d) => (v === null ? d : v < 0 ? Math.max(0, v + n) : Math.min(v, n));
  return [fix(a, 0), fix(b, n)];
}

function pyFind(s, sub, start = 0) {
  if (start < 0) start = Math.max(0, s.length + start);
  if (start > s.length) return -1;
  return s.indexOf(sub, start);
}

// Character cells with positive and negative indices.
function charsHTML(s, cls = () => "", { ghost = 0 } = {}) {
  const n = s.length;
  let h = `<div class="l4-chars">`;
  for (let k = 0; k < n; k++) {
    h += `<div class="l4-ch ${cls(k)}"><span class="i">${k}</span><span class="c">${s[k] === " " ? "␣" : esc(s[k])}</span><span class="i neg">${k - n}</span></div>`;
  }
  for (let k = n; k < n + ghost; k++) {
    h += `<div class="l4-ch ghost ${cls(k)}"><span class="i">${k}</span><span class="c">?</span><span class="i neg">&nbsp;</span></div>`;
  }
  return h + `</div>`;
}

// A generic hand-made stepper for widgets that are not call stacks.
// opts.build() -> [{html, msg, msgCls}], opts.extraControls, opts.onMount(root, rebuild), mini.
function makeSimpleStepper(el, opts) {
  const mini = !!opts.mini;
  el.innerHTML = `<div class="ss-view"></div>${mini ? "" : `<div class="msg ss-msg"></div>
    <div class="controls">
      <button class="cbtn ss-reset">⟲ Reset</button><button class="cbtn ss-back">◀ Back</button>
      <button class="cbtn ss-step on">Step ▶</button><button class="cbtn ss-play">Play</button>
      ${opts.extraControls || ""}
      <span class="spacer"></span><span class="counter ss-count"></span></div>`}`;
  const $ = (q) => el.querySelector(q);
  let snaps = [], i = 0, timer = null;
  function render() {
    const s = snaps[i];
    $(".ss-view").innerHTML = s.html;
    if (mini) return;
    $(".ss-msg").innerHTML = s.msg || "";
    $(".ss-msg").className = "msg ss-msg " + (s.msgCls || "");
    $(".ss-count").textContent = `step ${i + 1} / ${snaps.length}`;
    $(".ss-back").disabled = $(".ss-reset").disabled = i === 0;
    $(".ss-step").disabled = i === snaps.length - 1;
  }
  function stop() { clearInterval(timer); timer = null; if (!mini) $(".ss-play").textContent = "Play"; }
  function play() {
    if (timer) return stop();
    if (i === snaps.length - 1) i = 0;
    if (!mini) $(".ss-play").textContent = "Pause";
    timer = setInterval(() => {
      if (i < snaps.length - 1) i++; else if (mini) i = 0; else return stop();
      render();
    }, mini ? 1100 : 800);
  }
  function rebuild() { stop(); snaps = opts.build(); i = 0; render(); }
  if (!mini) {
    $(".ss-reset").onclick = () => { stop(); i = 0; render(); };
    $(".ss-back").onclick = () => { stop(); if (i) i--; render(); };
    $(".ss-step").onclick = () => { stop(); if (i < snaps.length - 1) i++; render(); };
    $(".ss-play").onclick = play;
    el.tabIndex = 0;
    el.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;
      if (e.key === "ArrowRight") { e.preventDefault(); $(".ss-step").click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); $(".ss-back").click(); }
    });
  }
  if (opts.onMount) opts.onMount(el, rebuild);
  rebuild();
  if (mini) play();
}

// ---------- 1. def and call: the flow of execution ----------

function traceFlow(withCall) {
  const t = new Tracer();
  const g = t.push("Global frame", {});
  g.status = "the program's own variables";
  const L = withCall ? { yo: 10, call: 11, inc: 12, px: 13 } : { yo: 10, inc: 11, px: 12 };
  t.snap(0, "Python runs the program from the top, one statement at a time.");
  g.vars.x = 5;
  t.snap(1, "<code>x = 5</code> binds the name <code>x</code> in the global frame.");
  t.out.push("Hello");
  t.snap(2, "Prints <code>Hello</code>.");
  g.vars.print_lyrics = "<function>";
  t.snap(5, "<code>def</code> runs: it creates the function and binds the name <code>print_lyrics</code> to it. The body (lines 6–7) does <b>not</b> run.");
  t.out.push("Yo");
  t.snap(L.yo, "Prints <code>Yo</code>. Lines 6–7 were skipped.");
  if (withCall) {
    const f = t.push("print_lyrics()", {});
    f.status = "running its body";
    t.snap(L.call, "A <b>call</b>: Python makes a new frame for <code>print_lyrics</code> and jumps into its body.");
    t.out.push("I am a lumberjack, and I am okay.");
    t.snap(6, "The body runs, top to bottom.");
    t.out.push("I sleep all night and I work all day.");
    t.snap(7, "Last line of the body.");
    f.status = "returns None"; f.cls = "ret";
    t.snap(7, "The body ends. The call returns (with <code>None</code>, since there is no <code>return</code>) and its frame is thrown away.", "good");
    t.pop();
    t.snap(L.call, "Back in the global frame, Python continues with the line after the call.");
  }
  g.vars.x = 7;
  t.snap(L.inc, "<code>x = x + 2</code>: x is now 7.");
  t.out.push("7");
  t.snap(L.px, "Prints <code>7</code>.");
  t.snap(0, withCall
    ? "Done. The two lyric lines were printed because <code>print_lyrics()</code> was <b>called</b>."
    : "Done. The lyrics were never printed: the function was defined but <b>never called</b>.", withCall ? "good" : "bad");
  return t.snaps;
}

function demoFlow(el, { mini = false } = {}) {
  let withCall = true;
  makeStepper(el, {
    mini, showConsole: true, stackLabel: "frames (newest on top)",
    code: () => (withCall ? CODE.lyrics : CODE.lyricsNoCall),
    build: () => traceFlow(withCall),
    extraControls: `<select class="fl-k"><option value="1">with the call print_lyrics()</option><option value="0">without the call</option></select>`,
    onMount(root, rebuild) {
      if (mini) return;
      root.querySelector(".fl-k").onchange = (e) => { withCall = e.target.value === "1"; rebuild(); };
    },
  });
}

// ---------- 2. print versus return ----------

function tracePrintReturn(mini = false) {
  const t = new Tracer();
  const g = t.push("Global frame", mini ? {} : { greet_print: "<function>", greet_return: "<function>" });
  if (mini) g.status = "two functions defined";
  const ex = (html) => ({ expr: html });
  t.snap(1, "The two <code>def</code>s have run: both names are bound to functions. No body has run yet.", "", ex(""));
  t.snap(15, "To call <code>print</code>, Python must first know its arguments. The first one is a call: <code>greet_return(\"es\")</code>.", "",
    ex(`print(<b>greet_return("es")</b>, "Sally")`));
  let f = t.push(mini ? "greet_return()" : 'greet_return("es")', { lang: "'es'" });
  t.snap(8, "New frame. The parameter <code>lang</code> is bound to the argument <code>'es'</code>.", "", ex(`print(<b>greet_return("es")</b>, "Sally")`));
  t.snap(9, "<code>lang == \"es\"</code> is True.", "", ex(`print(<b>greet_return("es")</b>, "Sally")`));
  f.status = "returns 'Hola'"; f.cls = "ret";
  t.snap(10, "<code>return \"Hola\"</code> hands the value back to the caller and ends the call. <b>Nothing is printed.</b>", "good", ex(`print(<b>greet_return("es")</b>, "Sally")`));
  t.pop();
  t.snap(15, "The call is replaced by its value. Now <code>print</code> has both arguments.", "", ex(`print(<b class="r">'Hola'</b>, "Sally")`));
  t.out.push("Hola Sally");
  t.snap(15, "<code>print</code> shows <code>Hola Sally</code> on one line.", "good", ex(`print('Hola', "Sally")`));
  t.snap(16, "Second line. Again the argument is evaluated first: <code>greet_print(\"es\")</code>.", "", ex(`print(<b>greet_print("es")</b>, "Sally")`));
  f = t.push(mini ? "greet_print()" : 'greet_print("es")', { lang: "'es'" });
  t.snap(1, "New frame with <code>lang = 'es'</code>.", "", ex(`print(<b>greet_print("es")</b>, "Sally")`));
  t.snap(2, "<code>lang == \"es\"</code> is True.", "", ex(`print(<b>greet_print("es")</b>, "Sally")`));
  t.out.push("Hola");
  f.status = "printed Hola";
  t.snap(3, "<code>print(\"Hola\")</code> shows <code>Hola</code> on the screen <b>right now</b>, on a line of its own. It hands nothing back.", "", ex(`print(<b>greet_print("es")</b>, "Sally")`));
  f.status = "returns None"; f.cls = "err";
  t.snap(3, "The body ends without <code>return</code>, so the call returns <code>None</code>.", "bad", ex(`print(<b>greet_print("es")</b>, "Sally")`));
  t.pop();
  t.snap(16, "The call is replaced by its value, <code>None</code>.", "bad", ex(`print(<b class="e">None</b>, "Sally")`));
  t.out.push("None Sally");
  t.snap(16, "So the outer <code>print</code> shows <code>None Sally</code>. A function that prints can't give its answer to the program.", "bad", ex(`print(None, "Sally")`));
  t.snap(0, "Three lines of output: <code>Hola Sally</code>, <code>Hola</code>, <code>None Sally</code>. <b>return</b> gives the value to the caller; <b>print</b> only shows it to a human.", "good", null);
  return t.snaps;
}

function demoPrintReturn(el, { mini = false } = {}) {
  makeStepper(el, {
    mini, showConsole: true, stackLabel: "frames (newest on top)",
    code: CODE.printVsReturn,
    build: () => tracePrintReturn(mini),
    renderExtra: (s) => (s.extra && s.extra.expr ? `<div class="l4-expr" style="margin:0 0 10px"><span class="p">being evaluated:</span> ${s.extra.expr}</div>` : ""),
  });
}

// ---------- 3. parameters: binding arguments ----------

const AREA_CALLS = [
  { line: 6, w: ["1", "default"], h: ["2", "default"], area: "2" },
  { line: 7, w: ["4", "positional"], h: ["2.5", "positional"], area: "10.0" },
  { line: 8, w: ["3", "keyword"], h: ["5", "keyword"], area: "15" },
  { line: 9, w: ["1.2", "keyword"], h: ["2", "default"], area: "2.4" },
  { line: 10, w: ["1", "default"], h: ["6.2", "keyword"], area: "6.2" },
];

function traceArea() {
  const t = new Tracer();
  t.push("Global frame", { print_area: "<function>" });
  t.snap(1, "<code>def</code> binds <code>print_area</code>. Its parameters have default values 1 and 2.", "", null);
  const how = { default: "left out: use the default", positional: "matched by position", keyword: "matched by name" };
  for (const c of AREA_CALLS) {
    const f = t.push("print_area()", { width: c.w[0], height: c.h[0] });
    f.status = `width: ${c.w[1]}, height: ${c.h[1]}`;
    t.snap(c.line, `New frame. <code>width = ${c.w[0]}</code> (${how[c.w[1]]}), <code>height = ${c.h[0]}</code> (${how[c.h[1]]}).`, "", c);
    f.vars.area = c.area;
    t.snap(2, `<code>area = ${c.w[0]} * ${c.h[0]}</code> = ${c.area}.`, "", c);
    t.out.push(`width: ${c.w[0]} height: ${c.h[0]} area: ${c.area}`);
    f.status = "returns None"; f.cls = "ret";
    t.snap(3, "Print the line; the call ends and its frame is thrown away.", "good", c);
    t.pop();
  }
  t.snap(0, "Five calls, one function. Positional arguments match by order, keyword arguments by name, and anything left out takes its default.", "good", null);
  return t.snaps;
}

function demoArgs(el) {
  makeStepper(el, {
    showConsole: true, stackLabel: "frames (newest on top)",
    code: CODE.printArea,
    build: traceArea,
    renderExtra: (s) => {
      const c = s.extra;
      if (!c) return "";
      return `<table class="l4-bind"><tr><th>parameter</th><th>value</th><th>where it came from</th></tr>
        <tr><td>width</td><td>${c.w[0]}</td><td class="${c.w[1]}">${c.w[1]}</td></tr>
        <tr><td>height</td><td>${c.h[0]}</td><td class="${c.h[1]}">${c.h[1]}</td></tr></table><div style="height:10px"></div>`;
    },
  });
}

// compute_pay(hours, rate) with the branch it takes.
function tracePay(hours, rate) {
  const t = new Tracer();
  t.push("Global frame", { compute_pay: "<function>" });
  const f = t.push(`compute_pay(${hours}, ${rate})`, { hours, rate });
  t.snap(1, `New frame: <code>hours = ${hours}</code>, <code>rate = ${rate}</code>.`);
  const over = hours > 40;
  t.snap(3, `Is <code>hours &lt;= 40</code>? ${over ? "No: some hours are overtime." : "Yes."}`);
  let r;
  if (!over) {
    r = String(hours * rate);
    f.status = `returns ${hours} * ${rate} = ${r}`; f.cls = "ret";
    t.snap(4, `Return <code>hours * rate</code> = <b>${r}</b>.`, "good");
  } else {
    r = pyFloat(40 * rate + (hours - 40) * rate * 1.5);
    f.status = `returns ${40 * rate} + ${hours - 40} * ${rate} * 1.5 = ${r}`; f.cls = "ret";
    t.snap(5, `40 normal hours: ${40 * rate}. ${hours - 40} overtime hours at 1.5 × ${rate}: ${pyFloat((hours - 40) * rate * 1.5)}. Return <b>${r}</b>.`, "good");
  }
  t.pop();
  t.snap(0, `<code>compute_pay(${hours}, ${rate})</code> = <b>${r}</b>. No <code>input()</code> needed to test it.`, "good");
  return t.snaps;
}

function demoPay(el) {
  let hours = 45, rate = 10;
  makeStepper(el, {
    stackLabel: "frames (newest on top)",
    code: CODE.computePay,
    build: () => tracePay(hours, rate),
    extraControls: `<label>hours <input type="range" class="py-h" min="0" max="60" value="${hours}"> <b class="py-hv mono">${hours}</b></label>
      <label>rate <input type="range" class="py-r" min="1" max="30" value="${rate}"> <b class="py-rv mono">${rate}</b></label>`,
    onMount(root, rebuild) {
      root.querySelector(".py-h").oninput = (e) => { hours = +e.target.value; root.querySelector(".py-hv").textContent = hours; rebuild(); };
      root.querySelector(".py-r").oninput = (e) => { rate = +e.target.value; root.querySelector(".py-rv").textContent = rate; rebuild(); };
    },
  });
}

// ---------- 4. scope ----------

function traceScope(kind) {
  const t = new Tracer();
  const g = t.push("Global frame", {});
  if (kind === "local") {
    g.vars.global_var = 1; t.snap(1, "<code>global_var</code> is created outside all functions: a <b>global</b> variable.");
    g.vars.f1 = "<function>"; t.snap(4, "<code>def</code> binds <code>f1</code>.");
    const f = t.push("f1()", {}); t.snap(10, "Call <code>f1()</code>: a new frame.");
    f.vars.local_var = 2; t.snap(5, "<code>local_var = 2</code> is created <b>inside</b> the function: it lives in f1's frame. It is <b>local</b>.");
    t.out.push("1"); t.snap(6, "<code>global_var</code> is not in f1's frame, so Python looks in the global frame and finds 1.");
    t.out.push("2"); t.snap(7, "<code>local_var</code> is in f1's own frame: 2.");
    f.status = "returns None"; f.cls = "ret"; t.snap(7, "The call ends…", "good");
    t.pop(); t.snap(10, "…and its frame, with <code>local_var</code> in it, is gone.");
    t.out.push("1"); t.snap(11, "<code>global_var</code> is still there: 1.");
    t.snap(0, "One more line, <code>print(local_var)</code>, would raise <code>NameError: name 'local_var' is not defined</code>. The variable only existed during the call.", "bad");
  } else if (kind === "shadow") {
    g.vars.x = 1; t.snap(1, "A global <code>x = 1</code>.");
    g.vars.f1 = "<function>"; t.snap(4, "<code>def</code> binds <code>f1</code>.");
    const f = t.push("f1()", {}); t.snap(9, "Call <code>f1()</code>: a new, empty frame.");
    f.vars.x = 2; t.snap(5, "<code>x = 2</code> inside a function creates a <b>new local</b> <code>x</code> in f1's frame. The global <code>x</code> is untouched.");
    t.out.push("2"); t.snap(6, "Inside f1, <code>x</code> means the local one: 2.");
    f.status = "returns None"; f.cls = "ret"; t.snap(6, "The call ends.", "good");
    t.pop(); t.out.push("1"); t.snap(10, "In the global frame, <code>x</code> is still 1.");
    t.snap(0, "Two different variables shared the name <code>x</code>, in two different scopes.", "good");
  } else {
    g.vars.x = 1; t.snap(1, "A global <code>x = 1</code>.");
    g.vars.increase = "<function>"; t.snap(4, "<code>def</code> binds <code>increase</code>.");
    const f = t.push("increase()", {}); f.status = "x refers to the global x"; t.snap(10, "Call <code>increase()</code>: a new frame.");
    t.snap(5, "<code>global x</code>: inside this function, <code>x</code> means the global variable. No local <code>x</code> will be made.");
    g.vars.x = 2; t.snap(6, "<code>x = x + 1</code> changes the <b>global</b> <code>x</code> to 2. Look at the global frame.");
    t.out.push("2"); t.snap(7, "Prints 2.");
    f.status = "returns None"; f.cls = "ret"; t.snap(7, "The call ends.", "good");
    t.pop(); t.out.push("2"); t.snap(11, "The global <code>x</code> stayed changed: 2.");
    t.snap(0, "It works, but the function now changes state outside itself. Prefer a parameter and <code>return</code>.", "");
  }
  return t.snaps;
}

function demoScope(el, { mini = false, kind = "shadow" } = {}) {
  const codes = { local: CODE.scopeLocal, shadow: CODE.scopeShadow, global: CODE.scopeGlobal };
  makeStepper(el, {
    mini, showConsole: true, stackLabel: "frames (newest on top)",
    code: () => codes[kind],
    build: () => traceScope(kind),
    extraControls: `<select class="sc-k">
      <option value="local">local and global variables</option>
      <option value="shadow" selected>same name, two scopes</option>
      <option value="global">the global keyword</option></select>`,
    onMount(root, rebuild) {
      if (mini) return;
      const sel = root.querySelector(".sc-k");
      sel.value = kind;
      sel.onchange = (e) => { kind = e.target.value; rebuild(); };
    },
  });
}

// ---------- 5. strings: indexing and slicing playground ----------

const SLICE_PRESETS = ["s[0:4]", "s[6:7]", "s[6:20]", "s[:6]", "s[3:]", "s[:]", "s[2:5]", "s[0]", "s[-1]", "s[12]"];

function parseSliceExpr(expr) {
  const m = expr.replace(/\s+/g, "").match(/^s\[(-?\d*)(?::(-?\d*))?\]$/);
  if (!m) return null;
  const num = (v) => (v === "" || v === undefined ? null : parseInt(v, 10));
  if (expr.includes(":")) return { kind: "slice", a: num(m[1]), b: num(m[2]) };
  if (m[1] === "") return null;
  return { kind: "index", i: num(m[1]) };
}

function sliceSnaps(s, expr) {
  const p = parseSliceExpr(expr);
  const n = s.length;
  const view = (cls, res, ghost = 0) => `${charsHTML(s, cls, { ghost })}<div class="l4-expr"><span class="p">&gt;&gt;&gt;</span> ${esc(expr)}<br>${res}</div>`;
  if (!p) return [{ html: view(() => "", `<span class="e">write s[i] or s[a:b]</span>`), msg: "Try <code>s[2]</code>, <code>s[-1]</code>, <code>s[1:4]</code>, <code>s[:3]</code> or <code>s[3:]</code>.", msgCls: "bad" }];
  if (p.kind === "index") {
    const k = p.i < 0 ? p.i + n : p.i;
    const ok = k >= 0 && k < n;
    const snaps = [{ html: view(() => "", ""), msg: `<code>s</code> has ${n} characters, indices 0 to ${n - 1} (or −${n} to −1 from the end).` }];
    if (p.i < 0 && ok) snaps.push({ html: view((j) => (j === k ? "cur" : ""), ""), msg: `A negative index counts from the end: <code>s[${p.i}]</code> is <code>s[${n} + (${p.i})]</code> = <code>s[${k}]</code>.` });
    snaps.push(ok
      ? { html: view((j) => (j === k ? "sel" : ""), `<span class="r">${esc(pyRepr(s[k]))}</span>`), msg: `<code>s[${p.i}]</code> is the character at index ${k}: ${esc(pyRepr(s[k]))}.`, msgCls: "good" }
      : { html: view((j) => (j === p.i ? "err" : ""), `<span class="e">IndexError: string index out of range</span>`, p.i >= n ? p.i - n + 1 : 0), msg: `There is no index ${p.i}: the last one is ${n - 1}. Indexing past the end is an error.`, msgCls: "bad" });
    return snaps;
  }
  const [a, b] = sliceBounds(n, p.a, p.b);
  const aTxt = p.a === null ? "start" : p.a, bTxt = p.b === null ? "end" : p.b;
  const snaps = [{ html: view(() => "", ""), msg: `<code>s[${p.a ?? ""}:${p.b ?? ""}]</code>: from ${p.a === null ? "the beginning" : `index ${p.a}`} up to but <b>not including</b> ${p.b === null ? "the end" : `index ${p.b}`}.` }];
  if ((p.b !== null && p.b > n) || (p.a !== null && p.a < 0) || (p.b !== null && p.b < 0)) {
    snaps.push({ html: view(() => "", ""), msg: `Bounds adjusted: ${aTxt} → ${a}, ${bTxt} → ${b}. ${p.b !== null && p.b > n ? "A stop past the end just stops at the end: no error." : "Negative bounds count from the end."}` });
  }
  let res = "";
  for (let k = a; k < b; k++) {
    res += s[k];
    snaps.push({ html: view((j) => (j === k ? "cur" : j >= a && j < k ? "sel" : ""), `<span class="r">${esc(pyRepr(res))}</span> <span class="p">…</span>`), msg: `Take index ${k}: ${esc(pyRepr(s[k]))}.` });
  }
  snaps.push({ html: view((j) => (j >= a && j < b ? "sel" : ""), `<span class="r">${esc(pyRepr(res))}</span>`),
    msg: b > a ? `Stop before index ${b}. The slice has ${b} − ${a} = ${b - a} character${b - a === 1 ? "" : "s"}.` : "Start is not before stop: the slice is the empty string.", msgCls: "good" });
  return snaps;
}

function demoSlice(el, { mini = false } = {}) {
  let s = "Monty Python", expr = "s[0:4]";
  if (mini) {
    let k = 0;
    const show = () => {
      const snaps = sliceSnaps(s, SLICE_PRESETS[k]);
      el.innerHTML = snaps[snaps.length - 1].html;
      k = (k + 1) % 7;
    };
    show();
    setInterval(show, 1600);
    return;
  }
  makeSimpleStepper(el, {
    build: () => sliceSnaps(s, expr),
    extraControls: `<label>s = <input type="text" class="sl-s" value="${s}" maxlength="16" style="width:130px"></label>
      <label>expression <input type="text" class="sl-e" value="${expr}" style="width:80px"></label>
      <select class="sl-p">${SLICE_PRESETS.map((p) => `<option>${p}</option>`).join("")}</select>`,
    onMount(root, rebuild) {
      const e = root.querySelector(".sl-e");
      root.querySelector(".sl-s").oninput = (ev) => { s = ev.target.value; rebuild(); };
      e.onchange = () => { expr = e.value.trim(); root.querySelector(".sl-p").value = SLICE_PRESETS.includes(expr) ? expr : ""; rebuild(); };
      root.querySelector(".sl-p").onchange = (ev) => { expr = e.value = ev.target.value; rebuild(); };
    },
  });
}

// ---------- 5b. a for loop that counts ----------

function traceCount(word) {
  const t = new Tracer();
  const g = t.push("Global frame", {});
  const cells = (k, hit) => ({ word, k, hit });
  g.vars.word = pyRepr(word); t.snap(1, "The string to scan.", "", cells(-1));
  g.vars.count = 0; t.snap(2, "Counting pattern: start the counter at 0 <b>before</b> the loop.", "", cells(-1));
  let count = 0;
  for (let k = 0; k < word.length; k++) {
    g.vars.letter = pyRepr(word[k]);
    t.snap(3, `The iteration variable <code>letter</code> moves to the next character: ${esc(pyRepr(word[k]))}.`, "", cells(k));
    const hit = word[k] === "a";
    t.snap(4, `Is <code>letter == "a"</code>? ${hit ? "Yes." : "No."}`, "", cells(k, hit));
    if (hit) { count++; g.vars.count = count; t.snap(5, `Add 1: <code>count</code> is now ${count}.`, "good", cells(k, true)); }
  }
  t.snap(3, "No characters left: the loop ends.", "", cells(word.length));
  t.out.push(`The number of 'a' we have seen is: ${count}`);
  t.snap(6, `Use the counter after the loop: ${count}.`, "good", cells(word.length));
  return t.snaps;
}

function demoCount(el, { mini = false } = {}) {
  let word = "banana";
  makeStepper(el, {
    mini, showConsole: true, stackLabel: "global frame",
    code: () => CODE.countA(word),
    build: () => traceCount(word),
    renderExtra: (s) => (s.extra ? charsHTML(s.extra.word, (j) => (j === s.extra.k ? (s.extra.hit ? "sel" : "cur") : "")) : ""),
    extraControls: `<label>word <input type="text" class="ct-w" value="${word}" maxlength="12" style="width:120px"></label>`,
    onMount(root, rebuild) {
      if (mini) return;
      root.querySelector(".ct-w").onchange = (e) => { word = e.target.value.replace(/["\\]/g, "").slice(0, 12) || "banana"; e.target.value = word; rebuild(); };
    },
  });
}

// ---------- 6. string methods ----------

const METHODS = {
  "lower()": { args: [], run: (s) => s.toLowerCase() },
  "upper()": { args: [], run: (s) => s.toUpperCase() },
  "find(sub)": { args: ["sub"], run: (s, a) => pyFind(s, a) },
  "find(sub, start)": { args: ["sub", "start"], run: (s, a, b) => pyFind(s, a, parseInt(b, 10) || 0) },
  "replace(old, new)": { args: ["old", "new"], run: (s, a, b) => (a === "" ? null : s.split(a).join(b)) },
  "strip()": { args: [], run: (s) => s.trim() },
  "lstrip()": { args: [], run: (s) => s.replace(/^\s+/, "") },
  "rstrip()": { args: [], run: (s) => s.replace(/\s+$/, "") },
  "startswith(prefix)": { args: ["prefix"], run: (s, a) => s.startsWith(a) },
  "sub in s": { args: ["sub"], run: (s, a) => s.includes(a) },
  "s[0] = 'J'": { args: [], run: () => undefined },
};
const METHOD_DEFAULTS = { sub: "o", start: "5", old: "o", new: "X", prefix: "Hello" };

function demoMethods(el) {
  el.innerHTML = `<div class="controls" style="margin-top:0">
      <label>s = <input type="text" class="me-s" value="Hello, Bob" style="width:150px"></label>
      <select class="me-m">${Object.keys(METHODS).map((m) => `<option${m === "replace(old, new)" ? " selected" : ""}>${m}</option>`).join("")}</select>
      <span class="me-args"></span></div>
    <div class="me-view"></div>
    <div class="controls"><button class="cbtn" data-s="Hello, Bob">'Hello, Bob'</button><button class="cbtn" data-s="   Hello Bob  ">'   Hello Bob  '</button>
      <button class="cbtn" data-s="I am the one, I will beat Matrix">'I am the one, …'</button><button class="cbtn" data-s="banana">'banana'</button></div>`;
  const $ = (q) => el.querySelector(q);
  const vals = { ...METHOD_DEFAULTS };
  function argsUI() {
    const m = METHODS[$(".me-m").value];
    $(".me-args").innerHTML = m.args.map((a) => `<label>${a} <input type="text" data-a="${a}" value="${esc(vals[a])}" style="width:${a === "start" ? 50 : 90}px"></label>`).join(" ");
    $(".me-args").querySelectorAll("input").forEach((inp) => { inp.oninput = () => { vals[inp.dataset.a] = inp.value; render(); }; });
    render();
  }
  function render() {
    const s = $(".me-s").value;
    const name = $(".me-m").value;
    const m = METHODS[name];
    const args = m.args.map((a) => vals[a]);
    const argRepr = m.args.map((a) => (a === "start" ? String(parseInt(vals[a], 10) || 0) : pyRepr(vals[a])));
    let call, res, note = "";
    if (name === "sub in s") { call = `${argRepr[0]} in s`; }
    else if (name === "s[0] = 'J'") { call = "s[0] = 'J'"; }
    else call = `s.${name.split("(")[0]}(${argRepr.join(", ")})`;
    const r = m.run(s, ...args);
    if (name === "s[0] = 'J'") {
      res = `<span class="e">TypeError: 'str' object does not support item assignment</span>`;
      note = `Strings are <b>immutable</b>: you can't change a character. Build a new string instead: <code>"J" + s[1:]</code> is ${esc(pyRepr("J" + s.slice(1)))}.`;
    } else if (r === null) {
      res = `<span class="p">(this demo needs a non-empty old)</span>`;
    } else if (typeof r === "string") {
      res = `<span class="r">${esc(pyRepr(r))}</span>`;
      note = r === s ? "The result equals the original: nothing matched or nothing to change." : "A <b>new</b> string. The original is not changed.";
    } else if (typeof r === "boolean") {
      res = `<span class="r">${r ? "True" : "False"}</span>`;
    } else {
      res = `<span class="${r < 0 ? "e" : "r"}">${r}</span>`;
      note = r < 0 ? "<code>find</code> returns <b>−1</b> when the substring is not there. Check for it before you slice!" : `Found at index ${r} (counting from 0).`;
    }
    let hl = () => "";
    if (typeof r === "number" && r >= 0) { const L = args[0].length; hl = (j) => (j >= r && j < r + L ? "sel" : ""); }
    $(".me-view").innerHTML = charsHTML(s, hl) +
      `<div class="l4-expr"><span class="p">&gt;&gt;&gt;</span> ${esc(call)}<br>${res}<br><span class="p">&gt;&gt;&gt;</span> s<br>${esc(pyRepr(s))}</div>` +
      (note ? `<p class="hint">${note}</p>` : "");
  }
  $(".me-s").oninput = render;
  $(".me-m").onchange = argsUI;
  el.querySelectorAll("[data-s]").forEach((b) => { b.onclick = () => { $(".me-s").value = b.dataset.s; render(); }; });
  argsUI();
}

// ---------- 6b. find, then slice ----------

const MBOX_LINES = [
  "From stephen.marquard@uct.ac.za Sat Jan 5 09:14:16 2016",
  "From louis@media.berkeley.edu Fri Jan 4 18:10:48 2008",
];

function lineHTML(line, at, sp, sl) {
  let h = "";
  for (let k = 0; k < line.length; k++) {
    const cls = [k === at ? "at" : "", k === sp ? "sp" : "", sl && k >= sl[0] && k < sl[1] ? "sl" : ""].join(" ").trim();
    h += cls ? `<span class="${cls}">${esc(line[k])}</span>` : esc(line[k]);
  }
  return `<div class="l4-line" style="margin-bottom:10px">${h}</div>`;
}

function traceHost(line) {
  const t = new Tracer();
  const short = line.length > 22 ? pyRepr(line.slice(0, 20)) + "…" : pyRepr(line);
  const f = t.push("get_host(line)", { line: short });
  t.snap(1, "New frame with the parameter <code>line</code>.", "", { line });
  const at = pyFind(line, "@");
  f.vars.atpos = at;
  t.snap(2, at >= 0 ? `<code>find("@")</code> returns the index of the first <code>@</code>: <b>${at}</b>.` : "There is no <code>@</code>: <code>find</code> returns <b>−1</b>.", at >= 0 ? "" : "bad", { line, at });
  const sp = pyFind(line, " ", at);
  f.vars.sppos = sp;
  t.snap(3, `<code>find(" ", ${at})</code> searches for a space <b>starting at</b> index ${at}: ${sp}.`, "", { line, at, sp });
  const [a, b] = sliceBounds(line.length, at + 1, sp);
  const host = line.slice(a, Math.max(a, b));
  f.status = `returns ${pyRepr(host)}`; f.cls = "ret";
  t.snap(4, `Slice from <code>atpos + 1</code> = ${at + 1} up to but not including ${sp}: <b>${esc(pyRepr(host))}</b>.`, at >= 0 ? "good" : "bad", { line, at, sp, sl: [a, b] });
  t.pop();
  t.snap(0, at >= 0 ? "Find, then slice: the pattern for pulling a piece out of a string." :
    "Without an <code>@</code>, the function silently returns a wrong answer. Check <code>find</code>'s −1 before you slice.", at >= 0 ? "good" : "bad", { line, at, sp, sl: [a, b] });
  return t.snaps;
}

function demoHost(el, { mini = false } = {}) {
  let line = MBOX_LINES[0];
  makeStepper(el, {
    mini, stackLabel: "frames (newest on top)",
    code: CODE.getHost,
    build: () => traceHost(line),
    renderExtra: (s) => (s.extra ? lineHTML(s.extra.line, s.extra.at, s.extra.sp, s.extra.sl) : ""),
    extraControls: `<select class="ho-l">${MBOX_LINES.map((l, k) => `<option value="${k}">line ${k + 1}</option>`).join("")}<option value="x">no @ (a bad line)</option></select>`,
    onMount(root, rebuild) {
      if (mini) return;
      root.querySelector(".ho-l").onchange = (e) => { line = e.target.value === "x" ? "From nobody Sat Jan 5 2016" : MBOX_LINES[+e.target.value]; rebuild(); };
    },
  });
}

// ---------- 7. files ----------

function fileHTML(name, lines, { cur = -1, done = -1, mode = "r", note = "" } = {}) {
  const rows = lines.map((l, k) => `<div class="row ${k === cur ? "cur" : k <= done ? "done" : ""}"><span class="arrow">${k === cur ? "▶" : ""}</span><span class="t">${esc(l)}<span class="l4-nl">\\n</span></span></div>`).join("");
  const eof = cur === lines.length ? `<div class="row cur"><span class="arrow">▶</span><span class="t" style="color:var(--stone)">(end of file)</span></div>` : "";
  return `<div class="l4-file"><div class="fh"><span>${esc(name)}</span><span>${note || (mode === "w" ? "open for writing" : "open for reading")}</span></div>${rows || `<div class="row"><span class="arrow"></span><span class="t" style="color:var(--stone)">(empty)</span></div>`}${eof}</div>`;
}

function traceRead(mode) {
  const t = new Tracer();
  const g = t.push("Global frame", {});
  const view = (o) => ({ file: o });
  const L = {
    print: { open: 1, loop: 3, body: [4], close: 6 },
    strip: { open: 1, loop: 2, body: [3, 4], close: 5 },
    count: { open: 1, loop: 3, body: [4], close: 6, init: 2, after: 5 },
    search: { open: 1, loop: 2, body: [3, 4, 5], close: 7, after: 6 },
  }[mode];
  g.vars.fhand = "<file handle>";
  t.snap(L.open, "<code>open</code> returns a <b>file handle</b>: not the text, but a way to read it. The handle starts before the first line.", "", view({ cur: -1 }));
  let count = 0;
  if (mode === "count") { g.vars.count = 0; t.snap(L.init, "Counting pattern: start at 0.", "", view({ cur: -1 })); }
  HOST_LINES.forEach((text, k) => {
    g.vars.line = pyRepr(text + "\n");
    t.snap(L.loop, `The loop reads the next line into <code>line</code>. It still ends with the newline: ${esc(pyRepr(text + "\n"))}.`, "", view({ cur: k, done: k - 1 }));
    if (mode === "print") {
      t.out.push(text, "");
      t.snap(4, "<code>print(line)</code>: the line's own <code>\\n</code> ends the line, then <code>print</code> adds another: a blank line.", "bad", view({ cur: k, done: k - 1 }));
    } else if (mode === "strip" || mode === "search") {
      g.vars.line = pyRepr(text);
      t.snap(3, "<code>line.rstrip()</code> returns the line without the newline (and any spaces) at the end.", "", view({ cur: k, done: k - 1 }));
      if (mode === "strip") {
        t.out.push(text);
        t.snap(4, "Print it: exactly one line.", "good", view({ cur: k, done: k - 1 }));
      } else {
        const hit = text.startsWith("#");
        t.snap(4, `<code>line.startswith("#")</code> is ${hit ? "True" : "False"}.`, "", view({ cur: k, done: k - 1 }));
        if (hit) { t.out.push(text); t.snap(5, "A comment line: print it.", "good", view({ cur: k, done: k - 1 })); }
      }
    } else {
      count++; g.vars.count = count;
      t.snap(4, `<code>count</code> is now ${count}.`, "", view({ cur: k, done: k - 1 }));
    }
  });
  delete g.vars.line;
  g.vars.line = pyRepr(mode === "print" || mode === "count" ? HOST_LINES[5] + "\n" : HOST_LINES[5]);
  t.snap(L.loop, "No lines left: the loop ends.", "", view({ cur: HOST_LINES.length, done: HOST_LINES.length - 1 }));
  if (mode === "count") { t.out.push(`Line count: ${count}`); t.snap(L.after, `Print the count: ${count} lines.`, "good", view({ cur: HOST_LINES.length, done: 5 })); }
  if (mode === "search") { t.out.push("finished."); t.snap(L.after, "After the loop.", "", view({ cur: HOST_LINES.length, done: 5 })); }
  g.vars.fhand = "<closed file>";
  t.snap(L.close, "<code>close()</code> tells Python we are done with the file.", "good", view({ cur: -1, done: 5, note: "closed" }));
  return t.snaps;
}

function traceReadAll() {
  const t = new Tracer();
  const g = t.push("Global frame", {});
  const all = HOST_LINES.map((l) => l + "\n").join("");
  g.vars.fhand = "<file handle>";
  t.snap(1, "Open the file for reading.", "", { cur: -1 });
  g.vars.all_text = pyRepr(all.slice(0, 22)) + "…";
  t.snap(2, `<code>read()</code> reads the <b>whole</b> file into one string, newlines included: ${all.length} characters.`, "", { cur: -1, done: 5 });
  t.out.push(`The length of the file: ${all.length}`);
  t.snap(3, "<code>len(all_text)</code> counts every character, each <code>\\n</code> as one.", "", { cur: -1, done: 5 });
  t.out.push(`The first 20 characters of the file: ${all.slice(0, 20)}`);
  t.snap(4, `<code>all_text[:20]</code> is ${esc(pyRepr(all.slice(0, 20)))}: 17 characters, a newline, and <code>21</code>. So the output spills onto a second line.`, "", { cur: -1, done: 5 });
  g.vars.fhand = "<closed file>";
  t.snap(5, "Close the file.", "good", { cur: -1, done: 5, note: "closed" });
  return t.snaps;
}

function demoRead(el, { mini = false, mode = "print" } = {}) {
  const codes = { print: CODE.readPrint, strip: CODE.readStrip, count: CODE.readCount, search: CODE.readSearch, all: CODE.readAll };
  makeStepper(el, {
    mini, showConsole: true, stackLabel: "global frame",
    code: () => codes[mode],
    build: () => (mode === "all" ? traceReadAll() : traceRead(mode)),
    renderExtra: (s) => (s.extra ? fileHTML("myhost.txt", HOST_LINES, s.extra.file || s.extra) : fileHTML("myhost.txt", HOST_LINES)),
    extraControls: `<select class="rd-m">
      <option value="print">print(line)</option><option value="strip">line.rstrip()</option>
      <option value="count">count the lines</option><option value="search">startswith("#")</option>
      <option value="all">read() it all</option></select>`,
    onMount(root, rebuild) {
      if (mini) return;
      const sel = root.querySelector(".rd-m");
      sel.value = mode;
      sel.onchange = (e) => { mode = e.target.value; rebuild(); };
    },
  });
}

function traceWrite(hadOld) {
  const t = new Tracer();
  const g = t.push("Global frame", {});
  const lines = [];
  const before = hadOld ? ["old notes, line 1", "old notes, line 2"] : null;
  t.snap(0, hadOld ? "Before: <code>test.txt</code> already exists, with two old lines." : "Before: there is no <code>test.txt</code> yet.", "", { name: "test.txt", lines: before || [], note: before ? "on disk" : "does not exist" });
  g.vars.fhand = "<file handle>";
  t.snap(1, hadOld ? "Mode <code>\"w\"</code> <b>empties</b> an existing file first. The old lines are gone." : "Mode <code>\"w\"</code> creates the file, empty.", hadOld ? "bad" : "", { name: "test.txt", lines: [], mode: "w" });
  ["The first line", "The second line", "The third line"].forEach((l, k) => {
    lines.push(l);
    t.snap(k + 2, `<code>write</code> adds exactly the string you give it. The <code>\\n</code> at the end is what makes it a line.`, "", { name: "test.txt", lines: lines.slice(), mode: "w" });
  });
  g.vars.fhand = "<closed file>";
  t.snap(5, "<code>close()</code> makes sure everything is saved.", "good", { name: "test.txt", lines: lines.slice(), note: "saved, closed" });
  return t.snaps;
}

function demoWrite(el) {
  let hadOld = false;
  makeStepper(el, {
    stackLabel: "global frame",
    code: CODE.writeTest,
    build: () => traceWrite(hadOld),
    renderExtra: (s) => (s.extra ? fileHTML(s.extra.name, s.extra.lines, { mode: s.extra.mode, note: s.extra.note }) : ""),
    extraControls: `<label><input type="checkbox" class="wr-o"> test.txt already exists</label>`,
    onMount(root, rebuild) { root.querySelector(".wr-o").onchange = (e) => { hadOld = e.target.checked; rebuild(); }; },
  });
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

// Demo registry: data-demo="name" in chapters.js mounts DEMOS[name].
const DEMOS = {
  flow: (el) => demoFlow(el),
  flowMini: (el) => demoFlow(el, { mini: true }),
  printReturn: (el) => demoPrintReturn(el),
  printReturnMini: (el) => demoPrintReturn(el, { mini: true }),
  args: (el) => demoArgs(el),
  pay: (el) => demoPay(el),
  scope: (el) => demoScope(el),
  scopeMini: (el) => demoScope(el, { mini: true }),
  slice: (el) => demoSlice(el),
  sliceMini: (el) => demoSlice(el, { mini: true }),
  count: (el) => demoCount(el),
  methods: (el) => demoMethods(el),
  host: (el) => demoHost(el),
  hostMini: (el) => demoHost(el, { mini: true }),
  read: (el) => demoRead(el),
  readMini: (el) => demoRead(el, { mini: true, mode: "strip" }),
  write: (el) => demoWrite(el),
  quiz: (el) => demoQuiz(el, QUIZ),
};
