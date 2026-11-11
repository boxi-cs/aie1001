// Interactive demos. Every code panel is copied from notes/L06-recursion.md (checked by
// tools/check.py); the JS twins below replay what Python does, step by step.

const CODE = {
  fact: `def fact(n):
    """Return n! for an integer n >= 0."""
    if n == 0:                   # base case
        return 1
    else:
        return n * fact(n - 1)   # smaller problem: fact(n - 1); combine: n * ...`,
  factTraced: `def fact_traced(n, depth=0):
    indent = "    " * depth
    print(indent + "fact(" + str(n) + ")")
    if n == 0:
        result = 1
    else:
        result = n * fact_traced(n - 1, depth + 1)
    print(indent + "returns " + str(result))
    return result`,
  factNoProgress: `def fact(n):
    """Return n! for an integer n >= 0."""
    if n == 0:                   # base case
        return 1
    else:
        return n * fact(n)       # BUG: no progress, n never changes`,
  factBroken: `def fact_broken(n):
    if n == 0:
        return 1
    else:
        n * fact_broken(n - 1)    # computed, then thrown away: no return`,
  linearSum: `def linear_sum(data, n):
    """Return the sum of the first n numbers in data."""
    if n == 0:
        return 0
    else:
        return linear_sum(data, n - 1) + data[n - 1]`,
  binarySearch: `def binary_search(data, target, low, high):
    """Return True if target is in data[low..high] (data must be sorted)."""
    if low > high:
        return False                     # no candidates left
    mid = (low + high) // 2
    if target == data[mid]:
        return True
    elif target < data[mid]:
        return binary_search(data, target, low, mid - 1)
    else:
        return binary_search(data, target, mid + 1, high)`,
  power: `def power(x, n):
    """Return x ** n for an integer n >= 0."""
    if n == 0:
        return 1
    return x * power(x, n - 1)`,
  fastPower: `def fast_power(x, n):
    """Return x ** n for an integer n >= 0, halving n at each call."""
    if n == 0:
        return 1
    partial = fast_power(x, n // 2)
    result = partial * partial
    if n % 2 == 1:
        result = result * x
    return result`,
  drawInterval: `def draw_interval(center_length):
    """Print the ticks between two inch marks."""
    if center_length > 0:                    # base case: length 0 draws nothing
        draw_interval(center_length - 1)     # upper half
        draw_line(center_length)             # centre tick
        draw_interval(center_length - 1)     # lower half`,
  binarySum: `def binary_sum(data, start, stop):
    """Return the sum of data[start:stop]."""
    if start >= stop:                 # no elements
        return 0
    elif start == stop - 1:           # one element
        return data[start]
    else:                             # two or more elements: split in half
        mid = (start + stop) // 2
        return binary_sum(data, start, mid) + binary_sum(data, mid, stop)`,
};

const RECURSION_LIMIT = 1000;

// ---------- concert line ----------

function demoConcertLine(el, { mini = false } = {}) {
  let N = 5;
  function build() {
    const snaps = [];
    // ask[i]: person i has asked and is waiting; ans[i]: answer person i knows.
    const ask = Array(N).fill(false);
    const ans = Array(N).fill(null);
    const s = (focus, bubble, msg) => snaps.push({ ask: ask.slice(), ans: ans.slice(), focus, bubble, msg });
    s(N - 1, "", "You are at the back of the line. You want to know your position.");
    for (let i = N - 1; i > 0; i--) {
      ask[i] = true;
      s(i, "What number are you?", `Person ${i + 1} is not at the front, so they ask the person in front and <b>wait</b>.`);
    }
    ans[0] = 1;
    s(0, "I'm number 1!", "The front of the line needs no asking: the <b>base case</b>.");
    for (let i = 1; i < N; i++) {
      ask[i] = false;
      ans[i] = i + 1;
      s(i, `${i} + 1 = ${i + 1}`, `The answer comes back. Person ${i + 1} adds 1: the <b>combine</b> step.`);
    }
    snaps[snaps.length - 1].msg = `You are number ${N}. ${N} questions went forward, ${N} answers came back.`;
    return snaps;
  }
  el.innerHTML = `<div class="svgbox cl-svg"></div>
    ${mini ? "" : `<div class="msg cl-msg"></div><div class="controls">
      <button class="cbtn cl-reset">⟲ Reset</button><button class="cbtn cl-back">◀ Back</button>
      <button class="cbtn cl-step on">Step ▶</button><button class="cbtn cl-play">Play</button>
      <label>people in line <input type="range" class="cl-n" min="2" max="9" value="${N}"> <b class="cl-nv mono">${N}</b></label>
      <span class="spacer"></span><span class="counter cl-count"></span></div>`}`;
  const $ = (q) => el.querySelector(q);
  let snaps = build(), i = 0, timer = null;
  function render() {
    const s = snaps[i];
    const W = 720, H = 210, gap = (W - 120) / Math.max(N - 1, 1);
    const px = (k) => 70 + k * gap;
    let g = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="concert line">`;
    g += `<rect x="4" y="40" width="22" height="130" rx="4" fill="var(--teal)" opacity="0.8"/><text x="15" y="190" font-size="11" text-anchor="middle" fill="var(--stone)">stage</text>`;
    for (let k = 0; k < N; k++) {
      const x = px(k), focus = k === s.focus;
      const col = s.ans[k] != null ? "var(--green)" : s.ask[k] ? "var(--teal)" : "var(--stone)";
      if (s.ask[k] && k > 0) {
        g += `<path d="M ${x - 18} 96 L ${px(k - 1) + 22} 96" stroke="var(--teal)" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#ah)"/>`;
      }
      g += `<circle cx="${x}" cy="88" r="14" fill="${focus ? "var(--mark)" : "var(--card)"}" stroke="${col}" stroke-width="${focus ? 2.5 : 1.6}"/>`;
      g += `<path d="M ${x - 20} 140 Q ${x} 104 ${x + 20} 140 Z" fill="${focus ? "var(--mark)" : "var(--card)"}" stroke="${col}" stroke-width="1.6"/>`;
      g += `<text x="${x}" y="160" font-size="11" text-anchor="middle" fill="var(--stone)">${k === N - 1 ? "you" : "person " + (k + 1)}</text>`;
      if (s.ans[k] != null) g += `<text x="${x}" y="93" font-size="13" font-weight="700" text-anchor="middle" fill="var(--green)">${s.ans[k]}</text>`;
      else if (s.ask[k]) g += `<text x="${x}" y="93" font-size="13" text-anchor="middle" fill="var(--teal)">?</text>`;
    }
    if (s.bubble) {
      const x = Math.min(Math.max(px(s.focus), 90), W - 90);
      g += `<rect x="${x - 80}" y="16" width="160" height="30" rx="8" fill="var(--card)" stroke="var(--amber)"/>`;
      g += `<text x="${x}" y="36" font-size="12" text-anchor="middle" fill="var(--ink)">${esc(s.bubble)}</text>`;
    }
    g += `<defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--teal)"/></marker></defs></svg>`;
    $(".cl-svg").innerHTML = g;
    if (mini) return;
    $(".cl-msg").innerHTML = s.msg;
    $(".cl-count").textContent = `step ${i + 1} / ${snaps.length}`;
    $(".cl-back").disabled = $(".cl-reset").disabled = i === 0;
    $(".cl-step").disabled = i === snaps.length - 1;
  }
  function stop() { clearInterval(timer); timer = null; if (!mini) $(".cl-play").textContent = "Play"; }
  function play() {
    if (timer) return stop();
    if (i === snaps.length - 1) i = 0;
    if (!mini) $(".cl-play").textContent = "Pause";
    timer = setInterval(() => {
      if (i < snaps.length - 1) i++; else if (mini) i = 0; else return stop();
      render();
    }, mini ? 1000 : 800);
  }
  if (!mini) {
    $(".cl-reset").onclick = () => { stop(); i = 0; render(); };
    $(".cl-back").onclick = () => { stop(); if (i) i--; render(); };
    $(".cl-step").onclick = () => { stop(); if (i < snaps.length - 1) i++; render(); };
    $(".cl-play").onclick = play;
    $(".cl-n").oninput = (e) => { N = +e.target.value; $(".cl-nv").textContent = N; stop(); snaps = build(); i = 0; render(); };
  }
  render();
  if (mini) play();
}

// ---------- factorial and the call stack ----------

function traceFact(n0, traced) {
  const t = new Tracer();
  // Line numbers refer to CODE.fact / CODE.factTraced.
  function fact(n, depth) {
    const f = traced ? t.push(`fact_traced(${n})`, { n, depth }) : t.push(`fact(${n})`, { n });
    const indent = "    ".repeat(depth);
    t.snap(1, `New frame for <code>${f.name}</code> with its own <code>n = ${n}</code>.`);
    if (traced) { t.out.push(`${indent}fact(${n})`); t.snap(3, "Print the call, indented by depth."); }
    t.snap(traced ? 4 : 3, `Is <code>n == 0</code>? ${n === 0 ? "Yes: base case." : "No."}`);
    let result;
    if (n === 0) {
      result = 1;
      f.status = "returns 1"; f.cls = "ret";
      if (traced) { t.snap(5, "<code>result = 1</code>"); }
    } else {
      f.status = `waiting: ${n} * ${traced ? "fact_traced" : "fact"}(${n - 1})`;
      t.snap(traced ? 7 : 6, `To finish, this call needs <code>fact(${n - 1})</code>. It <b>pauses</b> and a new call starts.`);
      const sub = fact(n - 1, depth + 1);
      result = n * sub;
      f.status = `${n} * ${sub} = ${result}`;
      t.snap(traced ? 7 : 6, `<code>fact(${n - 1})</code> returned ${sub}. This frame resumes in the middle of its line, with its own <code>n = ${n}</code>.`);
      f.status = `returns ${result}`; f.cls = "ret";
    }
    if (traced) { t.out.push(`${indent}returns ${result}`); t.snap(8, "Print the return value."); }
    t.snap(traced ? 9 : (n === 0 ? 4 : 6), `<code>${f.name}</code> returns <b>${result}</b>; its frame is popped.`, "good");
    t.pop();
    return result;
  }
  const r = fact(n0, 0);
  if (traced) t.out.push(String(r));
  t.snap(0, `Done: <code>${traced ? "fact_traced" : "fact"}(${n0})</code> = <b>${r}</b>. Last call in, first call out.`, "good");
  return t.snaps;
}

function demoFactStack(el, { mini = false, n = 3 } = {}) {
  let traced = false;
  makeStepper(el, {
    mini, showConsole: true,
    code: () => (traced ? CODE.factTraced : CODE.fact),
    build: () => traceFact(n, traced),
    extraControls: `<label>n <input type="range" class="fs-n" min="0" max="7" value="${n}"> <b class="fs-nv mono">${n}</b></label>
      <label><input type="checkbox" class="fs-tr"> traced version</label>`,
    onMount(root, rebuild) {
      if (mini) return;
      root.querySelector(".fs-n").oninput = (e) => { n = +e.target.value; root.querySelector(".fs-nv").textContent = n; rebuild(); };
      root.querySelector(".fs-tr").onchange = (e) => { traced = e.target.checked; rebuild(); };
    },
  });
}

function traceBug(kind) {
  const t = new Tracer();
  const SHOW = 14;
  if (kind === "neg" || kind === "noprog") {
    let n = -1;
    if (kind === "noprog") n = 3;
    for (let d = 1; d <= SHOW; d++) {
      const f = t.push(`fact(${n})`, { n });
      f.status = kind === "neg" ? `waiting: ${n} * fact(${n - 1})` : `waiting: ${n} * fact(${n})`;
      t.snap(kind === "neg" ? 6 : 6, d === 1
        ? (kind === "neg" ? "<code>fact(-1)</code>: is <code>n == 0</code>? No. So call <code>fact(-2)</code>…" : "<code>fact(3)</code> calls <code>fact(3)</code> again: the problem never gets smaller.")
        : `Depth ${d}. ${kind === "neg" ? "n moves <b>away</b> from 0." : "Same n, new frame."} The stack keeps growing.`, d > 8 ? "bad" : "");
      if (kind === "neg") n -= 1;
    }
    // Jump to the limit.
    const extra = RECURSION_LIMIT - SHOW;
    for (let k = 0; k < extra; k++) t.stack.push({ name: kind === "neg" ? `fact(${n - k})` : `fact(${n})`, vars: { n: kind === "neg" ? n - k : n }, status: "waiting", cls: "" });
    t.stack[t.stack.length - 1].cls = "err";
    t.stack[t.stack.length - 1].status = "RecursionError";
    t.snap(6, "About 1000 frames deep, Python stops: <code>RecursionError: maximum recursion depth exceeded</code>.", "bad");
    return t.snaps;
  }
  // Missing return: fact_broken(2).
  const calls = [];
  function fb(n) {
    const f = t.push(`fact_broken(${n})`, { n });
    calls.push(f);
    t.snap(1, `New frame for <code>fact_broken(${n})</code>.`);
    t.snap(2, `Is <code>n == 0</code>? ${n === 0 ? "Yes." : "No."}`);
    if (n === 0) {
      f.status = "returns 1"; f.cls = "ret";
      t.snap(3, "Base case returns 1. So far so good.", "good");
      t.pop(); return 1;
    }
    f.status = `waiting: ${n} * fact_broken(${n - 1})`;
    t.snap(5, `Calls <code>fact_broken(${n - 1})</code>.`);
    const sub = fb(n - 1);
    if (sub === null) {
      f.status = `${n} * None → TypeError`; f.cls = "err";
      t.snap(5, "<code>2 * None</code>: <code>TypeError: unsupported operand type(s) for *: 'int' and 'NoneType'</code>. The bug is one level <b>below</b> where the error appears.", "bad");
      return undefined;
    }
    f.status = `computes ${n} * ${sub} = ${n * sub}, then throws it away`;
    t.snap(5, `It computes <code>${n} * ${sub}</code> = ${n * sub}… and there is no <code>return</code>, so the value is lost.`, "bad");
    f.status = "returns None"; f.cls = "err";
    t.snap(5, "Falling off the end of a function returns <code>None</code>.", "bad");
    t.pop(); return null;
  }
  fb(2);
  return t.snaps;
}

function demoBugs(el) {
  let kind = "neg";
  const codes = { neg: CODE.fact, noprog: CODE.factNoProgress, noret: CODE.factBroken };
  makeStepper(el, {
    code: () => codes[kind],
    build: () => traceBug(kind),
    extraControls: `<select class="bug-k">
      <option value="neg">Bug 1: base case never reached — fact(-1)</option>
      <option value="noprog">Bug 2: no progress — n * fact(n)</option>
      <option value="noret">Bug 3: forgot return — fact_broken(2)</option></select>`,
    onMount(root, rebuild) { root.querySelector(".bug-k").onchange = (e) => { kind = e.target.value; rebuild(); }; },
  });
}

// ---------- linear sum ----------

function cellsHTML(data, opt = {}) {
  return `<div class="cells">` + data.map((v, k) => {
    let cls = "cell";
    if (opt.out && opt.out(k)) cls += " out";
    if (opt.mid === k) cls += opt.found ? " found" : " mid";
    if (opt.mark && opt.mark(k)) cls += " mid";
    const p = [];
    if (opt.low === k) p.push("low");
    if (opt.mid === k) p.push(`<span class="m">mid</span>`);
    if (opt.high === k) p.push("high");
    return `<div class="cellcol"><div class="ptr">${p.join(" ")}</div><div class="${cls}">${v}</div><div class="cellidx">${k}</div></div>`;
  }).join("") + `</div>`;
}

function traceLinearSum(data) {
  const t = new Tracer();
  function ls(n) {
    const f = t.push(`linear_sum(data, ${n})`, { n });
    const ex = { active: n };
    t.snap(1, `New call with <code>n = ${n}</code>: the sum of the first ${n} number${n === 1 ? "" : "s"}.`, "", ex);
    t.snap(3, `Is <code>n == 0</code>? ${n === 0 ? "Yes: the sum of no numbers is 0." : "No."}`, "", ex);
    if (n === 0) {
      f.status = "returns 0"; f.cls = "ret";
      t.snap(4, "Base case: return 0. This is the first call to return.", "good", ex);
      t.pop(); return 0;
    }
    f.status = `waiting: linear_sum(data, ${n - 1}) + data[${n - 1}]`;
    t.snap(6, `Needs the sum of the first ${n - 1} first. <code>data[${n - 1}]</code> (= ${data[n - 1]}) waits.`, "", ex);
    const sub = ls(n - 1);
    const r = sub + data[n - 1];
    f.status = `returns ${sub} + ${data[n - 1]} = ${r}`; f.cls = "ret";
    t.snap(6, `Back in the call with <code>n = ${n}</code>: ${sub} + data[${n - 1}] = ${sub} + ${data[n - 1]} = <b>${r}</b>.`, "good", { active: n, adding: n - 1 });
    t.pop(); return r;
  }
  const r = ls(data.length);
  t.snap(0, `<code>linear_sum(data, ${data.length})</code> = <b>${r}</b>. Each call added its element on the way back up.`, "good", { active: data.length });
  return t.snaps;
}

function demoLinearSum(el, { mini = false } = {}) {
  let data = [4, 3, 6, 2, 8];
  makeStepper(el, {
    mini,
    code: CODE.linearSum,
    build: () => traceLinearSum(data),
    renderExtra: (s) => s.extra ? cellsHTML(data, { out: (k) => k >= s.extra.active, mark: (k) => k === s.extra.adding }) : "",
    extraControls: `<label>data <input type="text" class="ls-d" value="4, 3, 6, 2, 8" style="width:150px"></label>`,
    onMount(root, rebuild) {
      if (mini) return;
      root.querySelector(".ls-d").onchange = (e) => { data = parseNums(e.target.value, [4, 3, 6, 2, 8]).slice(0, 9); e.target.value = data.join(", "); rebuild(); };
    },
  });
}

// ---------- binary search ----------

const BS_DATA = [1, 3, 5, 6, 16, 78, 100, 135, 900];

function traceBinarySearch(data, target) {
  const t = new Tracer();
  function bs(low, high) {
    const f = t.push(`binary_search(low=${low}, high=${high})`, {});
    const ex = { low, high };
    t.snap(1, `Candidates: indices ${low} to ${high}.`, "", ex);
    if (low > high) {
      f.status = "returns False"; f.cls = "ret";
      t.snap(4, `<code>low > high</code> (${low} > ${high}): no candidates left. ${target} is not in the list.`, "bad", ex);
      t.pop(); return false;
    }
    const mid = Math.floor((low + high) / 2);
    f.vars = { mid };
    t.snap(5, `<code>mid = (${low} + ${high}) // 2 = ${mid}</code>, and <code>data[${mid}] = ${data[mid]}</code>.`, "", { low, high, mid });
    if (target === data[mid]) {
      f.status = "returns True"; f.cls = "ret";
      t.snap(7, `${target} == data[${mid}]. Found it!`, "good", { low, high, mid, found: true });
      t.pop(); return true;
    }
    const left = target < data[mid];
    f.status = left ? `waiting: search ${low}..${mid - 1}` : `waiting: search ${mid + 1}..${high}`;
    t.snap(left ? 9 : 11, `${target} ${left ? "<" : ">"} ${data[mid]}, so the target can only be to the ${left ? "left" : "right"}. Throw away the other half.`, "", { low, high, mid });
    const r = left ? bs(low, mid - 1) : bs(mid + 1, high);
    f.status = `returns ${r ? "True" : "False"}`; f.cls = "ret";
    t.snap(left ? 9 : 11, "The answer is passed straight back up.", r ? "good" : "", { low, high, mid, found: r && false });
    t.pop(); return r;
  }
  const r = bs(0, data.length - 1);
  const steps = t.snaps.filter((s) => s.line === 1).length;
  t.snap(0, `<code>binary_search(data, ${target}, 0, ${data.length - 1})</code> returns <b>${r ? "True" : "False"}</b> after ${steps} call${steps > 1 ? "s" : ""}.` +
    (r !== data.includes(target) ? ` But ${target} <b>is</b> in the list! The list is not sorted.` : ""), r === data.includes(target) ? "good" : "bad", null);
  return t.snaps;
}

function demoBinarySearch(el, { mini = false } = {}) {
  let data = BS_DATA, target = 6;
  makeStepper(el, {
    mini,
    code: CODE.binarySearch,
    build: () => traceBinarySearch(data, target),
    renderExtra: (s) => {
      const e = s.extra;
      if (!e) return cellsHTML(data, {});
      return cellsHTML(data, { low: e.low, high: e.high, mid: e.mid, found: e.found, out: (k) => k < e.low || k > e.high });
    },
    extraControls: `<label>target <input type="number" class="bs-t" value="${target}"></label>
      <select class="bs-d"><option value="s">sorted data</option><option value="u">unsorted [5, 1, 9, 3, 7]</option></select>`,
    onMount(root, rebuild) {
      if (mini) return;
      root.querySelector(".bs-t").onchange = (e) => { target = Math.trunc(+e.target.value || 0); rebuild(); };
      root.querySelector(".bs-d").onchange = (e) => {
        data = e.target.value === "s" ? BS_DATA : [5, 1, 9, 3, 7];
        target = e.target.value === "s" ? 6 : 1;
        root.querySelector(".bs-t").value = target;
        rebuild();
      };
    },
  });
}

function demoSearchRace(el) {
  el.innerHTML = `<div class="controls" style="margin-top:0"><label>list size n = <b class="sr-v mono"></b></label>
    <input type="range" class="sr-n" min="1" max="9" step="0.01" value="6" style="width:240px"></div>
    <div class="bars sr-bars"></div><p class="hint sr-hint"></p>`;
  const $ = (q) => el.querySelector(q);
  function render() {
    const n = Math.round(10 ** +$(".sr-n").value);
    const seq = n;
    const bin = Math.floor(Math.log2(n)) + 1;
    $(".sr-v").textContent = n.toLocaleString("en");
    $(".sr-bars").innerHTML = [
      ["sequential search", seq, "amber"],
      ["binary search", bin, ""],
    ].map(([k, v, c]) => `<div class="bar"><span>${k}</span><div class="track"><div class="fill ${c}" style="width:${Math.max(0.4, (100 * v) / seq)}%"></div></div><span class="v">${v.toLocaleString("en")}</span></div>`).join("");
    $(".sr-hint").innerHTML = `Worst case, looking at one element per step. Binary search needs ${bin} steps because ${n.toLocaleString("en")} can be halved ${bin - 1} time${bin === 2 ? "" : "s"} before one candidate is left.`;
  }
  $(".sr-n").oninput = render;
  render();
}

// ---------- powers ----------

function fastPowerCalls(n) { const v = []; for (;;) { v.push(n); if (n === 0) break; n = Math.floor(n / 2); } return v; }
function doubleCallCount(n) { return n === 0 ? 1 : 1 + 2 * doubleCallCount(Math.floor(n / 2)); }

function demoPowerRace(el) {
  el.innerHTML = `<div class="controls" style="margin-top:0"><label>n = <b class="pr-v mono"></b></label>
    <input type="range" class="pr-n" min="0" max="2500" value="13" style="width:260px">
    <button class="cbtn" data-n="13">13</button><button class="cbtn" data-n="1000">1000</button><button class="cbtn" data-n="2000">2000</button></div>
    <div class="bars pr-bars"></div>
    <div class="stats pr-stats"></div>
    <p class="hint">Values of <code>n</code> in the calls of <code>fast_power(2, n)</code>:</p>
    <div class="tags pr-chain"></div>`;
  const $ = (q) => el.querySelector(q);
  function render() {
    const n = +$(".pr-n").value;
    $(".pr-v").textContent = n;
    const p = n + 1;
    const f = fastPowerCalls(n).length;
    const d = doubleCallCount(n);
    const max = Math.max(p, d);
    const over = p > RECURSION_LIMIT;
    $(".pr-bars").innerHTML = [
      ["power", p, over ? "red" : "amber", over ? "RecursionError" : p],
      ["fast_power", f, "", f],
      ["two calls (pitfall)", d, "amber", d],
    ].map(([k, v, c, lab]) => `<div class="bar"><span class="mono">${k}</span><div class="track"><div class="fill ${c}" style="width:${Math.max(0.5, (100 * v) / max)}%"></div></div><span class="v">${lab}</span></div>`).join("");
    $(".pr-stats").innerHTML = `<div class="stat ${over ? "bad" : ""}"><small>power: stack depth</small><b>${p}${over ? " &gt; limit" : ""}</b></div>
      <div class="stat good"><small>fast_power: stack depth</small><b>${f}</b></div>
      <div class="stat"><small>Python's limit</small><b>≈ ${RECURSION_LIMIT}</b></div>`;
    $(".pr-chain").innerHTML = fastPowerCalls(n).map((v) => `<span class="tag">${v}</span>`).join("→");
  }
  $(".pr-n").oninput = render;
  el.querySelectorAll("[data-n]").forEach((b) => { b.onclick = () => { $(".pr-n").value = b.dataset.n; render(); }; });
  render();
}

function traceFastPower(x, n0) {
  const t = new Tracer();
  function fp(n) {
    const f = t.push(`fast_power(${x}, ${n})`, { n });
    t.snap(1, `New call with <code>n = ${n}</code>.`);
    if (n === 0) { f.status = "returns 1"; f.cls = "ret"; t.snap(4, "Base case: return 1.", "good"); t.pop(); return 1n; }
    f.status = `waiting: fast_power(${x}, ${Math.floor(n / 2)})`;
    t.snap(5, `<code>n // 2 = ${Math.floor(n / 2)}</code>: one call on half the exponent.`);
    const partial = fp(Math.floor(n / 2));
    f.vars = { n, partial: String(partial) };
    let result = partial * partial;
    f.status = `result = ${partial} * ${partial} = ${result}`;
    t.snap(6, `Square it: <code>partial * partial = ${result}</code>. One recursive call, used twice.`);
    if (n % 2 === 1) {
      result *= BigInt(x);
      f.status = `odd n: result * ${x} = ${result}`;
      t.snap(8, `${n} is odd, so multiply by x once more: ${result}.`);
    }
    f.status = `returns ${result}`; f.cls = "ret";
    t.snap(9, `<code>fast_power(${x}, ${n})</code> returns ${result}.`, "good");
    t.pop(); return result;
  }
  const r = fp(n0);
  t.snap(0, `<code>fast_power(${x}, ${n0})</code> = <b>${r}</b> in ${fastPowerCalls(n0).length} calls.`, "good");
  return t.snaps;
}

function demoFastPower(el) {
  let n = 13;
  makeStepper(el, {
    code: CODE.fastPower,
    build: () => traceFastPower(2, n),
    extraControls: `<label>x = 2, n <input type="range" class="fp-n" min="0" max="40" value="${n}"> <b class="fp-nv mono">${n}</b></label>`,
    onMount(root, rebuild) {
      root.querySelector(".fp-n").oninput = (e) => { n = +e.target.value; root.querySelector(".fp-nv").textContent = n; rebuild(); };
    },
  });
}

// ---------- multiple recursion: trees ----------

function buildRuler(L) {
  let id = 0;
  const events = [];
  function di(c) {
    const node = { id: id++, label: `draw_interval(${c})`, kids: [] };
    events.push({ type: "enter", id: node.id, line: 3 });
    if (c > 0) {
      const a = di(c - 1); node.kids.push(a);
      events.push({ type: "out", text: "-".repeat(c), line: 5 });
      const b = di(c - 1); node.kids.push(b);
    }
    events.push({ type: "exit", id: node.id, line: c > 0 ? 6 : 3 });
    return node;
  }
  return { root: di(L), events };
}

function demoRuler(el, { mini = false } = {}) {
  let L = mini ? 3 : 2;
  makeTreePlayer(el, {
    mini, width: mini ? 400 : 720, rowH: mini ? 50 : 56, nodeW: mini ? 40 : 120, fontSize: mini ? 13 : 0,
    code: CODE.drawInterval,
    outLabel: "printed ticks",
    build: () => {
      const r = buildRuler(L);
      r.root.label = `draw_interval(${L})`;
      // Shorter labels for wide trees; the mini player shows only the argument.
      if (mini) (function walk(n) { n.label = n.label.replace(/\D+/g, ""); n.kids.forEach(walk); })(r.root);
      else if (L >= 3) (function walk(n) { n.label = n.label.replace("draw_interval", "di"); n.kids.forEach(walk); })(r.root);
      return r;
    },
    stats: (s) => [["calls so far", s.calls], ["ticks printed", s.out.length], ["stack depth", s.stack.length],
      ["total for this L", `${2 ** (L + 1) - 1} calls, ${2 ** L - 1} ticks`]],
    extraControls: `<label>center_length <input type="range" class="ru-l" min="1" max="4" value="${L}"> <b class="ru-lv mono">${L}</b></label>`,
    onMount(root, rebuild) {
      if (mini) return;
      root.querySelector(".ru-l").oninput = (e) => { L = +e.target.value; root.querySelector(".ru-lv").textContent = L; rebuild(); };
    },
  });
}

function buildBinarySum(data) {
  let id = 0;
  const events = [];
  function bs(start, stop) {
    const node = { id: id++, label: `[${start}:${stop}]`, kids: [] };
    events.push({ type: "enter", id: node.id, line: 3 });
    let r;
    if (start >= stop) r = 0;
    else if (start === stop - 1) { r = data[start]; events.push({ type: "out", text: `binary_sum(data, ${start}, ${stop}) -> data[${start}] = ${r}`, line: 6 }); }
    else {
      const mid = Math.floor((start + stop) / 2);
      const a = bs(start, mid); node.kids.push(a.node);
      const b = bs(mid, stop); node.kids.push(b.node);
      r = a.r + b.r;
      events.push({ type: "out", text: `binary_sum(data, ${start}, ${stop}) -> ${a.r} + ${b.r} = ${r}`, line: 9 });
    }
    events.push({ type: "exit", id: node.id, value: r });
    return { node, r };
  }
  return { root: bs(0, data.length).node, events };
}

function demoBinarySum(el) {
  let data = [1, 2, 3, 4, 5, 6, 7];
  makeTreePlayer(el, {
    width: 720, rowH: 66, nodeW: 70,
    code: CODE.binarySum,
    outLabel: "return values, in the order they happen",
    build: () => buildBinarySum(data),
    stats: (s) => [["calls so far", s.calls], ["stack depth", s.stack.length],
      ["total calls", `${2 * data.length - 1} (= 2n − 1)`], ["linear_sum would make", `${data.length + 1} calls, ${data.length + 1} deep`]],
    extraControls: `<label>data <input type="text" class="bsum-d" value="1, 2, 3, 4, 5, 6, 7" style="width:170px"></label>`,
    onMount(root, rebuild) {
      root.querySelector(".bsum-d").onchange = (e) => { data = parseNums(e.target.value, [1, 2, 3, 4, 5, 6, 7]).slice(0, 12); e.target.value = data.join(", "); rebuild(); };
    },
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
  concert: (el) => demoConcertLine(el),
  concertMini: (el) => demoConcertLine(el, { mini: true }),
  factStack: (el) => demoFactStack(el),
  factMini: (el) => demoFactStack(el, { mini: true, n: 4 }),
  bugs: (el) => demoBugs(el),
  linearSum: (el) => demoLinearSum(el),
  linearMini: (el) => demoLinearSum(el, { mini: true }),
  binarySearch: (el) => demoBinarySearch(el),
  searchMini: (el) => demoBinarySearch(el, { mini: true }),
  searchRace: (el) => demoSearchRace(el),
  fastPower: (el) => demoFastPower(el),
  powerRace: (el) => demoPowerRace(el),
  ruler: (el) => demoRuler(el),
  rulerMini: (el) => demoRuler(el, { mini: true }),
  binarySum: (el) => demoBinarySum(el),
  quiz: (el) => demoQuiz(el, QUIZ),
};
