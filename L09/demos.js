// Interactive demos. Every code panel is copied from notes/L09-algorithm-analysis.md
// (checked by tools/check.py); the JS twins below replay what Python does and count
// the same operations, so their totals match the note.

const CODE = {
  timing: `from time import time

start_time = time()

for i in range(1, 20000):
    if i % 10 == 0:
        print(i)

end_time = time()

print("The time elapsed is:", end_time - start_time, "seconds")`,
  loopCount: `loop_runs = 0
print_calls = 0
for i in range(1, 20000):
    loop_runs += 1
    if i % 10 == 0:
        print_calls += 1
print(loop_runs, print_calls)`,
  sevenTable: `import math

print(f"{'n':>4} {'log n':>5} {'n log n':>8} {'n^2':>8} {'n^3':>11} {'2^n':>10}")
for n in [8, 16, 32, 64, 128, 256, 512]:
    log_n = int(math.log2(n))
    print(f"{n:>4} {log_n:>5} {n * log_n:>8} {n ** 2:>8} {n ** 3:>11} {2 ** n:>10.3g}")`,
  sevenOut: `   n log n  n log n      n^2         n^3        2^n
   8     3       24       64         512        256
  16     4       64      256        4096   6.55e+04
  32     5      160     1024       32768   4.29e+09
  64     6      384     4096      262144   1.84e+19
 128     7      896    16384     2097152    3.4e+38
 256     8     2048    65536    16777216   1.16e+77
 512     9     4608   262144   134217728  1.34e+154`,
  abc: `def ops_a(n):
    return 10 * n * math.log2(n) + 50


def ops_b(n):
    return 2 * n ** 2 + 100 * n


def ops_c(n):
    return 10000 * n


for n in [10, 10000, 1000000]:
    print(n, round(ops_a(n)), ops_b(n), ops_c(n))`,
  abcOut: `10 382 1200 100000
10000 1328821 201000000 100000000
1000000 199315736 2000100000000 10000000000`,
  smallest: `my_list = [9, 39, 21, 98, 4, 5, 100, 65]
smallest_so_far = None
print("Before", smallest_so_far)

for num in my_list:
    if smallest_so_far is None:
        smallest_so_far = num
    elif num < smallest_so_far:
        smallest_so_far = num
    print(smallest_so_far, num)

print("After", smallest_so_far)`,
  countOps: `def count_ops(data):
    """Count the operations of the smallest-number program on data,
    counting assignments, comparisons and function calls."""
    ops = 3                          # my_list = ..., smallest_so_far = None, print
    smallest_so_far = None
    for num in data:
        ops += 1                     # smallest_so_far is None
        if smallest_so_far is None:
            smallest_so_far = num
            ops += 1                 # assignment
        else:
            ops += 1                 # num < smallest_so_far
            if num < smallest_so_far:
                smallest_so_far = num
                ops += 1             # assignment
        ops += 1                     # print(smallest_so_far, num)
    return ops + 1                   # print("After", ...)`,
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
  fastPowerCalls: `def fast_power_calls(n):
    """Return how many calls fast_power(x, n) makes."""
    if n == 0:
        return 1
    return 1 + fast_power_calls(n // 2)`,
  fib: `def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)


def fib_calls(n):
    """Return how many calls fib(n) makes."""
    if n <= 1:
        return 1
    return 1 + fib_calls(n - 1) + fib_calls(n - 2)`,
  fibOnly: `def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)`,
  fibLoop: `def fib_loop(n):
    previous, current = 0, 1
    for _ in range(n):
        previous, current = current, previous + current
    return previous`,
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
  searchCounts: `def linear_search(data, target):
    """Return how many elements sequential search looks at to find target."""
    looks = 0
    for item in data:
        looks += 1
        if item == target:
            return looks
    return looks


def binary_search_looks(data, target, low, high):
    """Return how many elements binary search looks at to find target."""
    if low > high:
        return 0
    mid = (low + high) // 2
    if target == data[mid]:
        return 1
    elif target < data[mid]:
        return 1 + binary_search_looks(data, target, low, mid - 1)
    else:
        return 1 + binary_search_looks(data, target, mid + 1, high)`,
  linearSearch: `def linear_search(data, target):
    """Return how many elements sequential search looks at to find target."""
    looks = 0
    for item in data:
        looks += 1
        if item == target:
            return looks
    return looks`,
  worstTable: `for n in [10, 100, 1000, 10000, 100000, 1000000]:
    data = list(range(n))
    print(n, linear_search(data, n), binary_search_looks(data, n, 0, n - 1),
          math.floor(math.log2(n)) + 1)`,
  worstOut: `10 10 4 4
100 100 7 7
1000 1000 10 10
10000 10000 14 14
100000 100000 17 17
1000000 1000000 20 20`,
  bubbleSort: `def bubble_sort(data):
    """Sort the list data in place, smallest first, and return it."""
    length = len(data)
    while length > 0:
        for i in range(length - 1):
            if data[i] > data[i + 1]:
                data[i], data[i + 1] = data[i + 1], data[i]
        length -= 1
    return data


def main():
    numbers = [3, 4, 1, 2, 5, 8, 0, 100, 17]
    print(bubble_sort(numbers))


main()`,
  bubbleOnly: `def bubble_sort(data):
    """Sort the list data in place, smallest first, and return it."""
    length = len(data)
    while length > 0:
        for i in range(length - 1):
            if data[i] > data[i + 1]:
                data[i], data[i + 1] = data[i + 1], data[i]
        length -= 1
    return data`,
  bubbleTraced: `def bubble_sort_traced(data):
    length = len(data)
    while length > 0:
        for i in range(length - 1):
            if data[i] > data[i + 1]:
                data[i], data[i + 1] = data[i + 1], data[i]
        print("compared", length - 1, "pairs:", data)
        length -= 1
    return data`,
  bubbleCounts: `def bubble_sort_counts(data):
    """Bubble sort data in place; return (comparisons, swaps)."""
    comparisons = 0
    swaps = 0
    length = len(data)
    while length > 0:
        for i in range(length - 1):
            comparisons += 1
            if data[i] > data[i + 1]:
                data[i], data[i + 1] = data[i + 1], data[i]
                swaps += 1
        length -= 1
    return comparisons, swaps`,
  quickSort: `def quick_sort(data, low, high):
    """Sort data[low..high] in place, smallest first, and return data."""
    i = low
    j = high
    if i >= j:                           # 0 or 1 elements: already sorted
        return data
    pivot = data[i]
    while i < j:
        while i < j and data[j] >= pivot:
            j = j - 1
        data[i] = data[j]
        while i < j and data[i] <= pivot:
            i = i + 1
        data[j] = data[i]
    data[i] = pivot                      # i == j: the pivot's final position
    quick_sort(data, low, i - 1)
    quick_sort(data, j + 1, high)
    return data`,
  quickTraced: `def quick_sort_traced(data, low, high, depth=0):
    i = low
    j = high
    if i >= j:
        return data
    pivot = data[i]
    while i < j:
        while i < j and data[j] >= pivot:
            j = j - 1
        data[i] = data[j]
        while i < j and data[i] <= pivot:
            i = i + 1
        data[j] = data[i]
    data[i] = pivot
    print("    " * depth + str(data[low:i]), [pivot], data[i + 1:high + 1])
    quick_sort_traced(data, low, i - 1, depth + 1)
    quick_sort_traced(data, j + 1, high, depth + 1)
    return data`,
  quickCount: `def quick_sort_count(data, low, high):
    """Quick sort data[low..high] in place; return the comparisons with the pivot."""
    i = low
    j = high
    if i >= j:
        return 0
    pivot = data[i]
    count = 0
    while i < j:
        while i < j:
            count += 1
            if data[j] < pivot:
                break
            j = j - 1
        data[i] = data[j]
        while i < j:
            count += 1
            if data[i] > pivot:
                break
            i = i + 1
        data[j] = data[i]
    data[i] = pivot
    count += quick_sort_count(data, low, i - 1)
    count += quick_sort_count(data, j + 1, high)
    return count


def mixed(n):
    """Return the numbers 0 to n - 1 in a fixed scrambled order."""
    data = list(range(n))
    seed = 1
    for k in range(n - 1, 0, -1):
        seed = (seed * 75 + 74) % 65537
        j = seed % (k + 1)
        data[k], data[j] = data[j], data[k]
    return data`,
  sortTable: `print("n    bubble  quick(mixed)  quick(sorted)  n*log2(n)")
for n in [100, 200, 400]:
    bubble = bubble_sort_counts(mixed(n))[0]
    quick = quick_sort_count(mixed(n), 0, n - 1)
    quick_sorted = quick_sort_count(list(range(n)), 0, n - 1)
    print(f"{n:<4} {bubble:>6} {quick:>13} {quick_sorted:>14} {round(n * math.log2(n)):>10}")`,
  sortOut: `n    bubble  quick(mixed)  quick(sorted)  n*log2(n)
100    4950           844           4950        664
200   19900          2238          19900       1529
400   79800          4717          79800       3458`,
};

const RECURSION_LIMIT = 1000;
const fmt = (x) => Number(x).toLocaleString("en");
const SLIDE_LIST = [9, 39, 21, 98, 4, 5, 100, 65];
const SORT_LIST = [3, 4, 1, 2, 5, 8, 0, 100, 17];

// ---------- a generic step player ----------

// frames: array of anything; draw(frame, k) paints it. Back / Step / Play / Reset and ← →.
function makePlayer(el, opts) {
  const mini = !!opts.mini;
  el.innerHTML = `<div class="pl-view"></div>${mini ? "" : `<div class="msg pl-msg"></div>
    <div class="controls">
      <button class="cbtn pl-reset" title="Back to the start">⟲ Reset</button>
      <button class="cbtn pl-back" title="Step back (←)">◀ Back</button>
      <button class="cbtn pl-step on" title="Step (→)">Step ▶</button>
      <button class="cbtn pl-play">Play</button>
      <button class="cbtn pl-end">End</button>
      ${opts.extraControls || ""}
      <span class="spacer"></span><span class="counter pl-count"></span>
    </div>`}`;
  const $ = (s) => el.querySelector(s);
  let frames = [], i = 0, timer = null;
  function render() {
    const f = frames[i];
    opts.draw($(".pl-view"), f, i);
    if (mini) return;
    const msg = $(".pl-msg");
    msg.innerHTML = f.msg || "";
    msg.className = "msg pl-msg " + (f.msgCls || "");
    $(".pl-count").textContent = `step ${i + 1} / ${frames.length}`;
    $(".pl-back").disabled = $(".pl-reset").disabled = i === 0;
    $(".pl-step").disabled = $(".pl-end").disabled = i === frames.length - 1;
  }
  function stop() { clearInterval(timer); timer = null; if (!mini) $(".pl-play").textContent = "Play"; }
  function play() {
    if (timer) return stop();
    if (i === frames.length - 1) i = 0;
    if (!mini) $(".pl-play").textContent = "Pause";
    timer = setInterval(() => {
      if (i < frames.length - 1) i++; else if (mini) i = 0; else return stop();
      render();
    }, opts.speed || (mini ? 700 : 600));
  }
  function rebuild() { stop(); frames = opts.build(); i = 0; render(); }
  if (!mini) {
    $(".pl-reset").onclick = () => { stop(); i = 0; render(); };
    $(".pl-back").onclick = () => { stop(); if (i > 0) i--; render(); };
    $(".pl-step").onclick = () => { stop(); if (i < frames.length - 1) i++; render(); };
    $(".pl-end").onclick = () => { stop(); i = frames.length - 1; render(); };
    $(".pl-play").onclick = play;
    el.tabIndex = 0;
    el.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;
      if (e.key === "ArrowRight") { e.preventDefault(); $(".pl-step").click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); $(".pl-back").click(); }
    });
  }
  if (opts.onMount) opts.onMount(el, rebuild);
  rebuild();
  if (mini) play();
  return { rebuild, stop };
}

const statsHTML = (rows) => `<div class="stats">${rows.map(([k, v, c]) =>
  `<div class="stat ${c || ""}"><small>${k}</small><b>${v}</b></div>`).join("")}</div>`;

function barsHTML(rows, max) {
  return `<div class="bars">${rows.map(([k, v, c, lab]) =>
    `<div class="bar"><span class="mono">${k}</span><div class="track"><div class="fill ${c || ""}" style="width:${Math.max(0.4, (100 * v) / max)}%"></div></div><span class="v">${lab ?? fmt(v)}</span></div>`).join("")}</div>`;
}

// ---------- 1. timing experiment ----------

// Times a JS twin of the slide's loop (without the printing) in this browser.
function demoExperiment(el) {
  const SIZES = [200000, 400000, 600000, 800000, 1000000, 1200000, 1400000];
  let runs = [];
  el.innerHTML = `<div class="svgbox ex-svg"></div>
    <div class="controls"><button class="cbtn on ex-run">Run the experiment</button>
    <button class="cbtn ex-clear">Clear</button><span class="spacer"></span><span class="counter ex-c"></span></div>
    <div class="ex-stats"></div>`;
  const $ = (q) => el.querySelector(q);
  function loop(n) {
    let count = 0;
    for (let i = 1; i < n; i++) if (i % 10 === 0) count++;
    return count;
  }
  function draw() {
    const W = 720, H = 260, L = 60, B = 36, T = 14, R = 14;
    const all = runs.flat();
    const maxT = Math.max(1, ...all.map((p) => p.ms)) * 1.15;
    const x = (n) => L + (n / 1500000) * (W - L - R);
    const y = (t) => H - B - (t / maxT) * (H - B - T);
    let g = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="running time against input size">`;
    g += `<line x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}" stroke="var(--ink-2)"/><line x1="${L}" y1="${T}" x2="${L}" y2="${H - B}" stroke="var(--ink-2)"/>`;
    for (let k = 0; k <= 3; k++) {
      const n = k * 500000;
      g += `<text x="${x(n)}" y="${H - B + 16}" font-size="11" text-anchor="middle" fill="var(--stone)">${fmt(n)}</text>`;
    }
    for (let k = 0; k <= 4; k++) {
      const t = (maxT * k) / 4;
      g += `<text x="${L - 6}" y="${y(t) + 4}" font-size="11" text-anchor="end" fill="var(--stone)">${t.toFixed(t < 10 ? 1 : 0)}</text>`;
    }
    g += `<text x="${(W + L) / 2}" y="${H - 4}" font-size="11" text-anchor="middle" fill="var(--ink-2)">input size n</text>`;
    g += `<text x="14" y="${(H - B) / 2}" font-size="11" text-anchor="middle" fill="var(--ink-2)" transform="rotate(-90 14 ${(H - B) / 2})">time (ms)</text>`;
    const cols = ["var(--teal)", "var(--amber)", "var(--red)", "var(--green)", "var(--sea)"];
    runs.forEach((run, r) => run.forEach((p) => {
      g += `<circle cx="${x(p.n)}" cy="${y(p.ms)}" r="5" fill="${cols[r % cols.length]}" opacity="0.85"/>`;
    }));
    if (!runs.length) g += `<text x="${W / 2}" y="${H / 2}" font-size="13" text-anchor="middle" fill="var(--stone)">Press “Run the experiment”</text>`;
    g += "</svg>";
    $(".ex-svg").innerHTML = g;
    $(".ex-c").textContent = `${runs.length} run${runs.length === 1 ? "" : "s"}`;
    const last = runs[runs.length - 1];
    $(".ex-stats").innerHTML = last ? statsHTML([
      ["n = 1,000,000: time", `${last[4].ms.toFixed(2)} ms`],
      ["loop runs (any computer)", fmt(999999), "good"],
      ["multiples of 10", fmt(last[4].count), "good"],
    ]) : "";
  }
  $(".ex-run").onclick = () => {
    const run = SIZES.map((n) => {
      const t0 = performance.now();
      const count = loop(n);
      return { n, count, ms: performance.now() - t0 };
    });
    runs.push(run);
    draw();
  };
  $(".ex-clear").onclick = () => { runs = []; draw(); };
  draw();
}

// ---------- 2. best and worst case ----------

function demoCases(el) {
  const data = SLIDE_LIST;
  let target = 98;
  const looks = (t) => { const k = data.indexOf(t); return k < 0 ? data.length : k + 1; };
  const targets = [...data, 7];
  makePlayer(el, {
    extraControls: `<label>target <select class="cs-t">${targets.map((t) =>
      `<option value="${t}" ${t === target ? "selected" : ""}>${t}${data.includes(t) ? "" : " (not there)"}</option>`).join("")}</select></label>`,
    build: () => {
      const fr = [];
      for (let k = 0; k < data.length; k++) {
        const hit = data[k] === target;
        fr.push({ k, looks: k + 1, hit, msg: hit ? `<code>data[${k}] == ${target}</code>: found after ${k + 1} look${k ? "s" : ""}.` : `<code>data[${k}] = ${data[k]}</code> is not ${target}. Look at the next one.`, msgCls: hit ? "good" : "" });
        if (hit) break;
      }
      if (!data.includes(target)) fr.push({ k: -1, looks: data.length, msg: `Not there: all ${data.length} elements were looked at. That is the <b>worst case</b>.`, msgCls: "bad" });
      return fr;
    },
    draw(view, f) {
      const cells = cellsRow(data, (k) => (k === f.k ? (f.hit ? "found" : "mid") : k < f.k || f.k === -1 ? "out" : ""));
      const W = 720, H = 170, L = 34, B = 30;
      const max = data.length;
      const bw = (W - L - 10) / targets.length;
      let g = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="looks for every target">`;
      [1, max].forEach((v) => {
        const yy = H - B - (v / max) * (H - B - 20);
        g += `<line x1="${L}" x2="${W - 6}" y1="${yy}" y2="${yy}" stroke="var(--stone)" stroke-dasharray="5 4"/>`;
        g += `<text x="${W - 8}" y="${yy - 4}" font-size="11" text-anchor="end" fill="var(--stone)">${v === max ? "worst case: " + max : "best case: 1"}</text>`;
      });
      targets.forEach((t, k) => {
        const v = looks(t);
        const h = (v / max) * (H - B - 20);
        const cur = t === target;
        g += `<rect x="${L + k * bw + 6}" y="${H - B - h}" width="${bw - 12}" height="${h}" rx="3" fill="${cur ? "var(--amber)" : "var(--teal)"}" opacity="${cur ? 1 : 0.55}"/>`;
        g += `<text x="${L + k * bw + bw / 2}" y="${H - 12}" font-size="11" text-anchor="middle" fill="var(--ink-2)">${data.includes(t) ? t : "7?"}</text>`;
      });
      g += `<text x="4" y="14" font-size="11" fill="var(--stone)">looks for each target</text></svg>`;
      view.innerHTML = cells + statsHTML([["looks so far", f.looks], ["average over these targets", (targets.reduce((s, t) => s + looks(t), 0) / targets.length).toFixed(2)]]) +
        `<div class="svgbox" style="margin-top:10px">${g}</div>`;
    },
    onMount(root, rebuild) { root.querySelector(".cs-t").onchange = (e) => { target = +e.target.value; rebuild(); }; },
  });
}

function cellsRow(data, clsOf, ptrOf = () => "") {
  return `<div class="cells">` + data.map((v, k) =>
    `<div class="cellcol"><div class="ptr">${ptrOf(k)}</div><div class="cell ${clsOf(k) || ""}">${v}</div><div class="cellidx">${k}</div></div>`).join("") + `</div>`;
}

// ---------- 3. growth rates ----------

const SEVEN = [
  ["1", () => 1, "var(--stone)"],
  ["log n", (n) => Math.log2(n), "var(--sea)"],
  ["n", (n) => n, "var(--teal)"],
  ["n log n", (n) => n * Math.log2(n), "var(--green)"],
  ["n²", (n) => n * n, "var(--amber)"],
  ["n³", (n) => n * n * n, "var(--fn)"],
  ["2ⁿ", (n) => 2 ** n, "var(--red)"],
];

function sci(x) {
  if (x < 1e6) return Number.isInteger(x) ? fmt(x) : x.toFixed(2);
  const e = Math.floor(Math.log10(x));
  return `${(x / 10 ** e).toFixed(2)}×10^${e}`;
}

function demoGrowth(el) {
  el.innerHTML = `<div class="controls" style="margin-top:0">
      <label>n = <b class="gr-v mono"></b> <input type="range" class="gr-n" min="2" max="64" value="16" style="width:220px"></label>
      <label><input type="checkbox" class="gr-log" checked> log scale (up the side)</label>
      <button class="cbtn gr-dn">◀ n ÷ 2</button><button class="cbtn gr-up">n × 2 ▶</button></div>
    <div class="svgbox gr-svg"></div><div class="gr-tab" style="overflow-x:auto"></div><p class="hint gr-hint"></p>`;
  const $ = (q) => el.querySelector(q);
  function render() {
    const N = +$(".gr-n").value;
    const logY = $(".gr-log").checked;
    $(".gr-v").textContent = N;
    const W = 720, H = 300, L = 50, B = 30, T = 12, R = 70;
    const yMax = logY ? Math.log10(2 ** N) : N * N;
    const x = (n) => L + ((n - 1) / (N - 1)) * (W - L - R);
    const y = (v) => {
      const t = logY ? Math.log10(Math.max(v, 1)) / Math.max(yMax, 1) : v / yMax;
      return H - B - Math.min(t, 1.04) * (H - B - T);
    };
    let g = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="growth of seven functions">`;
    g += `<defs><clipPath id="grclip"><rect x="${L}" y="0" width="${W - L}" height="${H - B}"/></clipPath></defs>`;
    g += `<line x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}" stroke="var(--ink-2)"/><line x1="${L}" y1="${T}" x2="${L}" y2="${H - B}" stroke="var(--ink-2)"/>`;
    g += `<text x="${L}" y="${H - 10}" font-size="11" fill="var(--stone)">1</text><text x="${W - R}" y="${H - 10}" font-size="11" text-anchor="end" fill="var(--stone)">n = ${N}</text>`;
    g += `<text x="${L - 6}" y="${T + 8}" font-size="10" text-anchor="end" fill="var(--stone)">${logY ? "10^" + Math.round(yMax) : fmt(yMax)}</text>`;
    const labels = [];
    SEVEN.forEach(([name, f, col]) => {
      let d = "";
      for (let k = 0; k <= 120; k++) {
        const n = 1 + ((N - 1) * k) / 120;
        d += `${k ? "L" : "M"}${x(n).toFixed(1)} ${y(f(n)).toFixed(1)} `;
      }
      g += `<path d="${d}" fill="none" stroke="${col}" stroke-width="2.2" clip-path="url(#grclip)"/>`;
      labels.push([name, Math.max(y(f(N)), T + 6), col]);
    });
    // Spread the end labels so they don't overlap.
    labels.sort((a, b) => a[1] - b[1]);
    for (let k = 1; k < labels.length; k++) labels[k][1] = Math.max(labels[k][1], labels[k - 1][1] + 13);
    labels.forEach(([name, yy, col]) => { g += `<text x="${W - R + 6}" y="${Math.min(yy, H - B) + 4}" font-size="15" font-weight="600" fill="${col}">${name}</text>`; });
    g += "</svg>";
    $(".gr-svg").innerHTML = g;
    $(".gr-tab").innerHTML = `<table><tr>${SEVEN.map(([k]) => `<th>${k}</th>`).join("")}</tr><tr>${SEVEN.map(([, f]) => `<td class="mono">${sci(f(N))}</td>`).join("")}</tr></table>`;
    $(".gr-hint").innerHTML = logY
      ? "On a log scale 2ⁿ is a straight line: it climbs by the same factor, 2, for every step of n. The polynomials bend over and flatten. From n = 10 on, 2ⁿ is above n³ for good. Untick “log scale” to see how the big ones swamp the rest."
      : "On an ordinary scale 1, log n and n hug the bottom, and 2ⁿ shoots off the top almost at once.";
  }
  $(".gr-n").oninput = render;
  $(".gr-log").onchange = render;
  $(".gr-up").onclick = () => { $(".gr-n").value = Math.min(64, +$(".gr-n").value * 2); render(); };
  $(".gr-dn").onclick = () => { $(".gr-n").value = Math.max(2, Math.floor(+$(".gr-n").value / 2)); render(); };
  el.tabIndex = 0;
  el.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT") return;
    if (e.key === "ArrowRight") { e.preventDefault(); $(".gr-up").click(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); $(".gr-dn").click(); }
  });
  render();
}

const opsA = (n) => 10 * n * Math.log2(n) + 50;
const opsB = (n) => 2 * n * n + 100 * n;
const opsC = (n) => 10000 * n;

function demoABC(el) {
  const PRESETS = [10, 100, 1000, 4950, 4951, 10000, 1000000];
  el.innerHTML = `<div class="controls" style="margin-top:0"><label>n = <b class="abc-v mono"></b></label>
    <input type="range" class="abc-n" min="1" max="7" step="0.01" value="1" style="width:240px">
    ${PRESETS.map((p) => `<button class="cbtn" data-n="${p}">${fmt(p)}</button>`).join("")}</div>
    <div class="abc-bars"></div><p class="hint abc-hint"></p>`;
  const $ = (q) => el.querySelector(q);
  let n = 10;
  function render() {
    $(".abc-v").textContent = fmt(n);
    const v = [["A: 10n log₂n + 50", opsA(n)], ["B: 2n² + 100n", opsB(n)], ["C: 10000n", opsC(n)]];
    const max = Math.max(...v.map((r) => r[1]));
    const best = v.reduce((a, b) => (b[1] < a[1] ? b : a));
    $(".abc-bars").innerHTML = barsHTML(v.map(([k, x]) => [k, x, x === best[1] ? "" : x === max ? "red" : "amber", fmt(Math.round(x))]), max);
    const bc = opsB(n) > opsC(n) ? "B is now slower than C, and stays slower for every larger n." : `B is still faster than C (B overtakes C at n = 4,951).`;
    $(".abc-hint").innerHTML = `Fastest at n = ${fmt(n)}: <b>${best[0].slice(0, 1)}</b>. ${bc}`;
  }
  $(".abc-n").oninput = (e) => { n = Math.max(2, Math.round(10 ** +e.target.value)); render(); };
  el.querySelectorAll("[data-n]").forEach((b) => { b.onclick = () => { n = +b.dataset.n; $(".abc-n").value = Math.log10(n); render(); }; });
  render();
}

// ---------- 4. big-O definition ----------

const BIGO = [
  { name: "8n + 5 is O(n)", f: (n) => 8 * n + 5, g: (n) => n, r: (n) => 8 + 5 / n, c: 9, n0: 1, cMax: 20, nMax: 12, fl: "8n + 5", gl: "n" },
  { name: "5n⁴ + 3n³ + 2n² + 4n + 1 is O(n⁴)", f: (n) => 5 * n ** 4 + 3 * n ** 3 + 2 * n ** 2 + 4 * n + 1, g: (n) => n ** 4, r: (n) => 5 + 3 / n + 2 / n ** 2 + 4 / n ** 3 + 1 / n ** 4, c: 15, n0: 1, cMax: 20, nMax: 6, fl: "5n⁴+3n³+2n²+4n+1", gl: "n⁴" },
  { name: "2ⁿ⁺² is O(2ⁿ)", f: (n) => 2 ** (n + 2), g: (n) => 2 ** n, r: () => 4, c: 4, n0: 1, cMax: 8, nMax: 10, fl: "2ⁿ⁺²", gl: "2ⁿ" },
  { name: "2n + 100 log n is O(n)", f: (n) => 2 * n + 100 * Math.log2(n), g: (n) => n, r: (n) => 2 + (100 * Math.log2(n)) / n, c: 102, n0: 1, cMax: 120, nMax: 400, fl: "2n + 100 log n", gl: "n" },
  { name: "3n² + 1000n is O(n²)", f: (n) => 3 * n * n + 1000 * n, g: (n) => n * n, r: (n) => 3 + 1000 / n, c: 4, n0: 1, cMax: 20, nMax: 2500, fl: "3n² + 1000n", gl: "n²" },
  { name: "n² is not O(n)", f: (n) => n * n, g: (n) => n, r: (n) => n, c: 10, n0: 1, cMax: 50, nMax: 60, fl: "n²", gl: "n" },
];

function demoBigO(el) {
  let p = BIGO[0], c = p.c, n0 = p.n0;
  el.innerHTML = `<div class="controls" style="margin-top:0"><select class="bo-p">${BIGO.map((b, k) => `<option value="${k}">${b.name}</option>`).join("")}</select></div>
    <div class="svgbox bo-svg"></div>
    <div class="controls"><label>c = <b class="bo-cv mono"></b> <input type="range" class="bo-c" step="1" min="1" style="width:160px"></label>
    <label>n₀ = <b class="bo-nv mono"></b> <input type="range" class="bo-n" min="1" style="width:160px"></label></div>
    <div class="msg bo-msg"></div>`;
  const $ = (q) => el.querySelector(q);
  function firstFail() {
    // Check f(n) <= c g(n) for every n from n0 to 200000, using the ratio f/g.
    for (let n = n0; n <= 200000; n++) if (p.r(n) > c + 1e-12) return n;
    return 0;
  }
  function render() {
    $(".bo-cv").textContent = c; $(".bo-nv").textContent = n0;
    const W = 720, H = 280, L = 56, B = 30, T = 14, R = 14, N = p.nMax;
    let yMax = 0;
    for (let n = 1; n <= N; n++) yMax = Math.max(yMax, p.f(n), c * p.g(n));
    const x = (n) => L + ((n - 1) / (N - 1)) * (W - L - R);
    const y = (v) => H - B - (v / yMax) * (H - B - T);
    let g = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="f(n) against c times g(n)">`;
    // Shade the n where f(n) > c g(n): one band per run of failing integers.
    const xc = (n) => x(Math.min(N, Math.max(1, n)));
    let runStart = 0;
    for (let n = 1; n <= N + 1; n++) {
      const fails = n <= N && p.r(n) > c + 1e-12;
      if (fails && !runStart) runStart = n;
      if (!fails && runStart) {
        g += `<rect x="${xc(runStart - 0.5)}" y="${T}" width="${xc(n - 0.5) - xc(runStart - 0.5)}" height="${H - B - T}" fill="var(--red-soft)"/>`;
        runStart = 0;
      }
    }
    if (n0 <= N) g += `<rect x="${x(n0)}" y="${T}" width="${W - R - x(n0)}" height="${H - B - T}" fill="var(--teal)" opacity="0.06"/><line x1="${x(n0)}" x2="${x(n0)}" y1="${T}" y2="${H - B}" stroke="var(--teal)" stroke-dasharray="5 4"/><text x="${x(n0) + 4}" y="${H - B - 6}" font-size="12" fill="var(--teal)">n₀</text>`;
    g += `<line x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}" stroke="var(--ink-2)"/><line x1="${L}" y1="${T}" x2="${L}" y2="${H - B}" stroke="var(--ink-2)"/>`;
    g += `<text x="${L}" y="${H - 10}" font-size="11" fill="var(--stone)">n = 1</text><text x="${W - R}" y="${H - 10}" font-size="11" text-anchor="end" fill="var(--stone)">n = ${fmt(N)}</text>`;
    const path = (fn) => { let d = ""; for (let k = 0; k <= 200; k++) { const n = 1 + ((N - 1) * k) / 200; d += `${k ? "L" : "M"}${x(n).toFixed(1)} ${y(fn(n)).toFixed(1)} `; } return d; };
    g += `<path d="${path(p.f)}" fill="none" stroke="var(--amber)" stroke-width="2.4"/>`;
    g += `<path d="${path((n) => c * p.g(n))}" fill="none" stroke="var(--teal)" stroke-width="2.4"/>`;
    g += `<rect x="${L + 10}" y="${T + 4}" width="12" height="4" fill="var(--amber)"/><text x="${L + 28}" y="${T + 10}" font-size="12" fill="var(--ink)">f(n) = ${p.fl}</text>`;
    g += `<rect x="${L + 10}" y="${T + 22}" width="12" height="4" fill="var(--teal)"/><text x="${L + 28}" y="${T + 28}" font-size="12" fill="var(--ink)">c·g(n) = ${c}·${p.gl}</text>`;
    g += "</svg>";
    $(".bo-svg").innerHTML = g;
    const bad = firstFail();
    const msg = $(".bo-msg");
    if (bad) {
      msg.className = "msg bo-msg bad";
      msg.innerHTML = `With c = ${c} and n₀ = ${n0} the definition fails: at n = ${fmt(bad)}, f(n) &gt; ${c}·g(n). ${p.r === BIGO[5].r ? "For n² against n, every c fails once n &gt; c: n² is <b>not</b> O(n)." : "Make c bigger, or n₀ bigger."}`;
    } else {
      msg.className = "msg bo-msg good";
      msg.innerHTML = `f(n) ≤ ${c}·g(n) for every n from ${n0} to 200,000 (checked). So c = ${c}, n₀ = ${n0} witness that <b>${p.name}</b>.`;
    }
  }
  function setPair(k) {
    p = BIGO[k]; c = p.c; n0 = p.n0;
    $(".bo-c").max = p.cMax; $(".bo-c").value = c;
    $(".bo-n").max = Math.min(p.nMax, 2000); $(".bo-n").value = n0;
    render();
  }
  $(".bo-p").onchange = (e) => setPair(+e.target.value);
  $(".bo-c").oninput = (e) => { c = +e.target.value; render(); };
  $(".bo-n").oninput = (e) => { n0 = +e.target.value; render(); };
  setPair(0);
}

// ---------- 5. the smallest number, operation by operation ----------

const SMALLEST_INPUTS = {
  slide: [9, 39, 21, 98, 4, 5, 100, 65],
  up: [1, 2, 3, 4, 5, 6, 7, 8],
  down: [8, 7, 6, 5, 4, 3, 2, 1],
};

// One frame per operation. kinds: a = assignment, c = comparison, f = function call.
function traceSmallest(data) {
  const fr = [];
  const ops = { a: 0, c: 0, f: 0 };
  const out = [];
  let small = null, num = null;
  const show = (v) => (v === null ? "None" : v);
  const push = (line, kind, msg, msgCls = "") => {
    if (kind) ops[kind]++;
    fr.push({ line, kind, msg, msgCls, ops: { ...ops }, out: out.slice(), small, num });
  };
  push(1, "a", "Assignment: <code>my_list</code> names the list. <b>1</b> operation.");
  small = null;
  push(2, "a", "Assignment: <code>smallest_so_far = None</code>.");
  out.push("Before None");
  push(3, "f", "Function call: <code>print</code>. That is 3 operations before the loop.");
  data.forEach((v, k) => {
    num = v;
    push(5, null, `The loop sets <code>num = ${v}</code> (round ${k + 1}). The slide does <b>not</b> count this one.`);
    push(6, "c", `Comparison: is <code>smallest_so_far</code> None? ${small === null ? "Yes." : "No."}`);
    if (small === null) {
      small = v;
      push(7, "a", `Assignment: <code>smallest_so_far = ${v}</code>.`);
    } else {
      const less = v < small;
      push(8, "c", `Comparison: is ${v} &lt; ${small}? ${less ? "Yes: a new smallest." : "No."}`);
      if (less) { small = v; push(9, "a", `Assignment: <code>smallest_so_far = ${v}</code>.`); }
    }
    out.push(`${small} ${v}`);
    push(10, "f", "Function call: <code>print</code>.");
  });
  out.push(`After ${small}`);
  push(12, "f", "Function call: the last <code>print</code>.");
  const total = ops.a + ops.c + ops.f;
  fr.push({ ...fr[fr.length - 1], line: 0, kind: null, msgCls: "good",
    msg: `Done: <b>${total}</b> operations for n = ${data.length}, the same as <code>count_ops</code> in the note. The slide's bound is 4n + 4 = ${4 * data.length + 4}.` });
  return fr;
}

function demoSmallest(el, { mini = false } = {}) {
  let which = "slide";
  makePlayer(el, {
    mini, speed: mini ? 650 : 550,
    extraControls: `<select class="sm-k"><option value="slide">slide's list</option><option value="up">increasing 1…8 (best case)</option><option value="down">decreasing 8…1 (worst case)</option></select>`,
    build: () => traceSmallest(SMALLEST_INPUTS[which]),
    draw(view, f) {
      const code = CODE.smallest.replace("[9, 39, 21, 98, 4, 5, 100, 65]", `[${SMALLEST_INPUTS[which].join(", ")}]`);
      const tag = { a: "assignment", c: "comparison", f: "function call" }[f.kind] || "";
      const total = f.ops.a + f.ops.c + f.ops.f;
      if (mini) {
        view.innerHTML = codeBlock(code, "py", [f.line]) + statsHTML([["operations", total, "good"], ["smallest", f.small ?? "None"]]);
        return;
      }
      view.innerHTML = `<div class="stepper"><div>${codeBlock(code, "py", [f.line])}<div class="console">${esc(f.out.join("\n"))}</div></div>
        <div class="stack-wrap"><small><span>variables and counters</span><span>${tag}</span></small>
        <div class="frame top"><span class="fname">num</span> <span class="vars">${f.num ?? "–"}</span></div>
        <div class="frame top" style="margin-top:6px"><span class="fname">smallest_so_far</span> <span class="vars">${f.small ?? "None"}</span></div>
        ${statsHTML([["assignments", f.ops.a], ["comparisons", f.ops.c], ["calls", f.ops.f], ["total", total, "good"]])}</div></div>`;
    },
    onMount(root, rebuild) { if (!mini) root.querySelector(".sm-k").onchange = (e) => { which = e.target.value; rebuild(); }; },
  });
}

function countOps(data) {
  let ops = 3, small = null;
  for (const v of data) {
    ops++;
    if (small === null) { small = v; ops++; } else { ops++; if (v < small) { small = v; ops++; } }
    ops++;
  }
  return ops + 1;
}

function demoOpsGrowth(el) {
  el.innerHTML = `<div class="controls" style="margin-top:0"><label>n = <b class="og-v mono"></b> <input type="range" class="og-n" min="1" max="1000" value="10" style="width:240px"></label>
    <button class="cbtn" data-n="10">10</button><button class="cbtn" data-n="100">100</button><button class="cbtn" data-n="1000">1000</button></div>
    <div class="og-bars"></div><p class="hint">Counted by a JS twin of <code>count_ops</code>. Ten times the input, ten times the work: <b>O(n)</b>.</p>`;
  const $ = (q) => el.querySelector(q);
  function render() {
    const n = +$(".og-n").value;
    $(".og-v").textContent = n;
    const up = Array.from({ length: n }, (_, k) => k + 1);
    const down = up.slice().reverse();
    const rows = [["best (increasing)", countOps(up), ""], ["worst (decreasing)", countOps(down), "amber"], ["slide bound 4n + 4", 4 * n + 4, "red"]];
    $(".og-bars").innerHTML = barsHTML(rows, 4 * n + 4);
  }
  $(".og-n").oninput = render;
  el.querySelectorAll("[data-n]").forEach((b) => { b.onclick = () => { $(".og-n").value = b.dataset.n; render(); }; });
  render();
}

// ---------- 6. recursive algorithms ----------

const fastPowerCalls = (n) => (n === 0 ? 1 : 1 + fastPowerCalls(Math.floor(n / 2)));
const fastPowerMults = (n) => (n === 0 ? 0 : fastPowerMults(Math.floor(n / 2)) + 1 + (n % 2));

function demoPowerCount(el) {
  el.innerHTML = `<div class="controls" style="margin-top:0"><label>n = <b class="pc-v mono"></b></label>
    <input type="range" class="pc-n" min="0" max="20" step="0.01" value="3.7" style="width:240px">
    <button class="cbtn" data-n="13">13</button><button class="cbtn" data-n="1000">1000</button><button class="cbtn" data-n="1000000">1,000,000</button></div>
    <div class="pc-bars"></div><div class="pc-stats"></div><p class="hint pc-chain"></p>`;
  const $ = (q) => el.querySelector(q);
  let n = 13;
  function render() {
    $(".pc-v").textContent = fmt(n);
    const p = n + 1, f = fastPowerCalls(n);
    const over = p > RECURSION_LIMIT;
    $(".pc-bars").innerHTML = barsHTML([["power: calls", p, over ? "red" : "amber", over ? fmt(p) + " ✗" : fmt(p)], ["fast_power: calls", f, ""], ["fast_power: mults", fastPowerMults(n), "amber"]], p);
    $(".pc-stats").innerHTML = statsHTML([["power", "O(n)"], ["fast_power", "O(log n)", "good"], ["⌊log₂ n⌋ + 2", n ? Math.floor(Math.log2(n)) + 2 : "–"], ["power's stack", over ? "RecursionError" : `${p} deep`, over ? "bad" : ""]]);
    const chain = []; for (let k = n; ; k = Math.floor(k / 2)) { chain.push(fmt(k)); if (k === 0) break; }
    $(".pc-chain").innerHTML = `n in the calls of <code>fast_power</code>: ${chain.join(" → ")}`;
  }
  $(".pc-n").oninput = (e) => { n = Math.round(2 ** +e.target.value) - 1; render(); };
  el.querySelectorAll("[data-n]").forEach((b) => { b.onclick = () => { n = +b.dataset.n; $(".pc-n").value = Math.log2(n + 1); render(); }; });
  render();
}

function buildFib(n0) {
  let id = 0;
  const events = [];
  function fib(n) {
    const node = { id: id++, label: `fib(${n})`, kids: [] };
    events.push({ type: "enter", id: node.id, line: 2 });
    let r;
    if (n <= 1) { r = n; events.push({ type: "out", text: `fib(${n}) returns ${n} (base case)`, line: 3 }); }
    else {
      const a = fib(n - 1); node.kids.push(a.node);
      const b = fib(n - 2); node.kids.push(b.node);
      r = a.r + b.r;
      events.push({ type: "out", text: `fib(${n}) returns ${a.r} + ${b.r} = ${r}`, line: 4 });
    }
    events.push({ type: "exit", id: node.id, value: r });
    return { node, r };
  }
  return { root: fib(n0).node, events };
}

function fibCalls(n) { let a = 1, b = 1; for (let k = 2; k <= n; k++) [a, b] = [b, 1 + a + b]; return n <= 1 ? 1 : b; }

function demoFibTree(el, { mini = false } = {}) {
  let n = mini ? 4 : 5;
  makeTreePlayer(el, {
    mini, width: mini ? 420 : 720, rowH: mini ? 46 : 54, nodeW: mini ? 44 : 64, fontSize: mini ? 11 : 0,
    code: CODE.fibOnly,
    outLabel: "returns, in order",
    build: () => {
      const r = buildFib(n);
      // Shorter labels for wide trees; the mini player shows only the argument.
      if (mini) (function walk(x) { x.label = x.label.replace(/\D+/g, ""); x.kids.forEach(walk); })(r.root);
      else if (n >= 6) (function walk(x) { x.label = x.label.replace("fib", "f"); x.kids.forEach(walk); })(r.root);
      return r;
    },
    stats: (s) => [["calls so far", s.calls], [`fib_calls(${n})`, fibCalls(n)], ["stack depth", s.stack.length],
      [`fib(${n - 2}) is computed`, `${fibCallsOf(n, n - 2)} times`]],
    extraControls: `<label>n <input type="range" class="fb-n" min="2" max="7" value="${n}"> <b class="fb-nv mono">${n}</b></label>`,
    onMount(root, rebuild) {
      if (mini) return;
      root.querySelector(".fb-n").oninput = (e) => { n = +e.target.value; root.querySelector(".fb-nv").textContent = n; rebuild(); };
    },
  });
}

// How many times fib(n) calls fib(k), counting the top call when k == n.
function fibCallsOf(n, k) {
  if (n === k) return 1;
  if (n < k || n <= 1) return 0;
  return fibCallsOf(n - 1, k) + fibCallsOf(n - 2, k);
}

function demoFibGrowth(el) {
  el.innerHTML = `<div class="controls" style="margin-top:0"><label>n = <b class="fg-v mono"></b> <input type="range" class="fg-n" min="2" max="40" value="20" style="width:240px"></label>
    <button class="cbtn fg-dn">◀ n − 1</button><button class="cbtn fg-up">n + 1 ▶</button></div>
    <div class="fg-bars"></div><div class="fg-stats"></div>`;
  const $ = (q) => el.querySelector(q);
  function render() {
    const n = +$(".fg-n").value;
    $(".fg-v").textContent = n;
    const c = fibCalls(n);
    $(".fg-bars").innerHTML = barsHTML([["fib: calls", c, "red"], ["2^(n/2)", Math.round(2 ** (n / 2)), "amber"], ["fib_loop: rounds", n, ""]], Math.max(c, 2 ** (n / 2)));
    $(".fg-stats").innerHTML = statsHTML([["fib_calls(n)", fmt(c), "bad"], ["÷ fib_calls(n − 1)", (c / fibCalls(n - 1)).toFixed(3)], ["fib_loop rounds", n, "good"]]);
  }
  $(".fg-n").oninput = render;
  $(".fg-up").onclick = () => { $(".fg-n").value = Math.min(40, +$(".fg-n").value + 1); render(); };
  $(".fg-dn").onclick = () => { $(".fg-n").value = Math.max(2, +$(".fg-n").value - 1); render(); };
  el.tabIndex = 0;
  el.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT") return;
    if (e.key === "ArrowRight") { e.preventDefault(); $(".fg-up").click(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); $(".fg-dn").click(); }
  });
  render();
}

// ---------- 7. binary vs sequential search ----------

function searchFrames(n, target) {
  const data = Array.from({ length: n }, (_, k) => k);
  const fr = [];
  let lin = { k: -1, looks: 0, done: false, found: false };
  let bin = { low: 0, high: n - 1, mid: null, looks: 0, done: false, found: false };
  fr.push({ lin: { ...lin }, bin: { ...bin }, msg: `Both searches start. Target ${target} in <code>list(range(${n}))</code>.` });
  while (!lin.done || !bin.done) {
    const notes = [];
    if (!lin.done) {
      lin.k++; lin.looks++;
      if (data[lin.k] === target) { lin.done = lin.found = true; notes.push(`sequential: found after ${lin.looks}`); }
      else if (lin.k === n - 1) { lin.done = true; notes.push(`sequential: not there after ${lin.looks}`); }
    }
    if (!bin.done) {
      if (bin.low > bin.high) bin.done = true;
      else {
        bin.mid = Math.floor((bin.low + bin.high) / 2); bin.looks++;
        const m = bin.mid;
        if (data[m] === target) { bin.done = bin.found = true; notes.push(`binary: found after ${bin.looks}`); }
        else {
          const st = { ...bin };
          if (target < data[m]) bin.high = m - 1; else bin.low = m + 1;
          if (bin.low > bin.high) { bin.done = true; notes.push(`binary: no candidates left after ${bin.looks}`); }
          fr.push({ lin: { ...lin }, bin: { ...st, nextLow: bin.low, nextHigh: bin.high }, msg: notes.join(" · ") || `Binary search looks at data[${m}] = ${m} and throws away the ${target < m ? "right" : "left"} half.` });
          continue;
        }
      }
    }
    fr.push({ lin: { ...lin }, bin: { ...bin }, msg: notes.join(" · ") || "One more look each." });
  }
  const last = fr[fr.length - 1];
  const looks = (k) => `<b>${k}</b> look${k === 1 ? "" : "s"}`;
  last.msg = `Sequential search: ${looks(lin.looks)}. Binary search: ${looks(bin.looks)} (⌊log₂ ${n}⌋ + 1 = ${Math.floor(Math.log2(n)) + 1} at most).`;
  last.msgCls = "good";
  return { data, fr };
}

function demoSearchSteps(el, { mini = false } = {}) {
  let n = mini ? 16 : 20, target = mini ? 16 : 20;
  let data = [];
  makePlayer(el, {
    mini, speed: mini ? 700 : 650,
    extraControls: `<label>n <input type="range" class="ss-n" min="4" max="40" value="${n}"> <b class="ss-nv mono">${n}</b></label>
      <label>target <input type="number" class="ss-t" value="${target}" style="width:70px"></label>`,
    build: () => { const r = searchFrames(n, target); data = r.data; return r.fr; },
    draw(view, f) {
      const L = f.lin, B = f.bin;
      const linRow = cellsRow(data, (k) => (k === L.k ? (L.found ? "found" : "mid") : k < L.k ? "out" : ""), (k) => (k === L.k ? `<span class="m">look</span>` : ""));
      const lo = B.nextLow ?? B.low, hi = B.nextHigh ?? B.high;
      const binRow = cellsRow(data, (k) => (k === B.mid ? (B.found ? "found" : "mid") : k < lo || k > hi ? "out" : ""),
        (k) => [k === B.low ? "low" : "", k === B.mid ? `<span class="m">mid</span>` : "", k === B.high ? "high" : ""].filter(Boolean).join(" "));
      view.innerHTML = `<div class="counter">sequential search · ${L.looks} look${L.looks === 1 ? "" : "s"}</div>${linRow}
        <div class="counter" style="margin-top:8px">binary search · ${B.looks} look${B.looks === 1 ? "" : "s"}</div>${binRow}` +
        (mini ? "" : statsHTML([["sequential looks", L.looks, L.done ? "bad" : ""], ["binary looks", B.looks, B.done ? "good" : ""], ["worst case, n = " + n, `${n} vs ${Math.floor(Math.log2(n)) + 1}`]]));
    },
    onMount(root, rebuild) {
      if (mini) return;
      root.querySelector(".ss-n").oninput = (e) => { n = +e.target.value; root.querySelector(".ss-nv").textContent = n; rebuild(); };
      root.querySelector(".ss-t").onchange = (e) => { target = Math.trunc(+e.target.value || 0); rebuild(); };
    },
  });
}

function demoSearchRace(el) {
  el.innerHTML = `<div class="controls" style="margin-top:0"><label>list size n = <b class="sr-v mono"></b></label>
    <input type="range" class="sr-n" min="1" max="9" step="0.01" value="6" style="width:240px"></div>
    <div class="sr-bars"></div><p class="hint sr-hint"></p>`;
  const $ = (q) => el.querySelector(q);
  function render() {
    const n = Math.round(10 ** +$(".sr-n").value);
    const bin = Math.floor(Math.log2(n)) + 1;
    $(".sr-v").textContent = fmt(n);
    $(".sr-bars").innerHTML = barsHTML([["sequential", n, "amber"], ["binary", bin, ""]], n);
    $(".sr-hint").innerHTML = `Worst case (target missing): ${fmt(n)} looks against ⌊log₂ n⌋ + 1 = ${bin}. Each ×10 in n adds about 3.3 looks to binary search.`;
  }
  $(".sr-n").oninput = render;
  render();
}

// ---------- 8. bubble sort ----------

function bubbleFrames(start) {
  const a = start.slice();
  const fr = [];
  let comps = 0, swaps = 0, pass = 0;
  const n = a.length;
  const push = (o) => fr.push({ a: a.slice(), comps, swaps, pass, ...o });
  push({ line: 3, sortedFrom: n, msg: `<code>length = ${n}</code>. Each pass compares neighbours and swaps them if they are out of order.` });
  let length = n;
  while (length > 0) {
    pass++;
    push({ line: 4, sortedFrom: length, msg: `Pass ${pass}: compare ${length - 1} pair${length - 1 === 1 ? "" : "s"}, indices 0 to ${length - 1}.` });
    for (let i = 0; i < length - 1; i++) {
      comps++;
      const out = a[i] > a[i + 1];
      push({ line: 6, i, sortedFrom: length, cmp: true, msg: `Is ${a[i]} &gt; ${a[i + 1]}? ${out ? "Yes: swap them." : "No: leave them."}` });
      if (out) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]];
        swaps++;
        push({ line: 7, i, sortedFrom: length, swapped: true, msg: `Swapped: ${a[i]} and ${a[i + 1]}. The larger one moves right.` });
      }
    }
    length--;
    push({ line: 8, sortedFrom: length, msg: `End of pass ${pass}: ${a[length] !== undefined ? `${a[length]} is in its final place. ` : ""}<code>length = ${length}</code>.` });
  }
  push({ line: 9, sortedFrom: 0, msg: `Sorted with <b>${comps}</b> comparisons (n(n−1)/2 = ${(n * (n - 1)) / 2}) and <b>${swaps}</b> swaps, as <code>bubble_sort_counts</code> reports.`, msgCls: "good" });
  return fr;
}

function barsSVG(a, cls, labels = {}) {
  const W = 720, H = 200, n = a.length;
  // Heights follow each value's rank, so one large value doesn't flatten the rest.
  const ranks = [...new Set(a)].sort((x, y) => x - y);
  const max = Math.max(ranks.length - 1, 1);
  const bw = (W - 20) / n;
  let g = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="list as bars">`;
  a.forEach((v, k) => {
    const h = 14 + (ranks.indexOf(v) / max) * (H - 70);
    const c = cls(k);
    const fill = c === "cmp" ? "var(--mark)" : c === "swap" ? "var(--amber)" : c === "done" ? "var(--green-soft)" : c === "hole" ? "var(--paper)" : c === "pivot" ? "var(--teal-soft)" : "var(--card)";
    const stroke = c === "cmp" || c === "swap" ? "var(--amber)" : c === "done" ? "var(--green)" : c === "out" ? "var(--line)" : c === "pivot" ? "var(--teal)" : "var(--ink-2)";
    const op = c === "out" ? 0.35 : 1;
    g += `<g opacity="${op}"><rect x="${10 + k * bw + 3}" y="${H - 34 - h}" width="${bw - 6}" height="${h}" rx="4" fill="${fill}" stroke="${stroke}" stroke-width="1.5" ${c === "hole" ? 'stroke-dasharray="5 4"' : ""}/>`;
    g += `<text x="${10 + k * bw + bw / 2}" y="${H - 42 - h}" font-size="19" font-weight="600" text-anchor="middle" fill="var(--ink)">${c === "hole" ? "" : v}</text>`;
    g += `<text x="${10 + k * bw + bw / 2}" y="${H - 18}" font-size="14" text-anchor="middle" fill="var(--stone)">${k}</text>`;
    if (labels[k]) g += `<text x="${10 + k * bw + bw / 2}" y="${H - 1}" font-size="16" font-weight="700" text-anchor="middle" fill="var(--teal)">${labels[k]}</text>`;
    g += `</g>`;
  });
  return g + "</svg>";
}

function demoBubble(el, { mini = false } = {}) {
  let data = SORT_LIST.slice();
  makePlayer(el, {
    mini, speed: mini ? 380 : 450,
    extraControls: `<select class="bb-p"><option value="s">slide's list</option><option value="r">reversed 9…1 (worst)</option><option value="o">sorted 1…9</option></select>
      <label>data <input type="text" class="bb-d" value="${data.join(", ")}" style="width:190px"></label>`,
    build: () => bubbleFrames(data),
    draw(view, f) {
      const cls = (k) => (k >= f.sortedFrom ? "done" : f.i !== undefined && (k === f.i || k === f.i + 1) ? (f.swapped ? "swap" : "cmp") : "");
      const svg = `<div class="svgbox">${barsSVG(f.a, cls)}</div>`;
      if (mini) { view.innerHTML = svg + statsHTML([["comparisons", f.comps], ["swaps", f.swaps]]); return; }
      view.innerHTML = svg + `<div class="stepper" style="margin-top:10px"><div>${codeBlock(CODE.bubbleOnly, "py", [f.line])}</div>
        <div>${statsHTML([["pass", f.pass], ["comparisons", f.comps], ["swaps", f.swaps], ["n(n−1)/2", (f.a.length * (f.a.length - 1)) / 2, "good"]])}</div></div>`;
    },
    onMount(root, rebuild) {
      if (mini) return;
      const inp = root.querySelector(".bb-d");
      root.querySelector(".bb-p").onchange = (e) => {
        data = e.target.value === "s" ? SORT_LIST.slice() : e.target.value === "r" ? [9, 8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8, 9];
        inp.value = data.join(", "); rebuild();
      };
      inp.onchange = (e) => { data = parseNums(e.target.value, SORT_LIST).slice(0, 12); e.target.value = data.join(", "); rebuild(); };
    },
  });
}

// ---------- 9. quick sort ----------

// One frame per comparison and per move. Line numbers refer to CODE.quickSort.
function quickFrames(start) {
  const a = start.slice();
  const fr = [];
  const final = new Set();
  let comps = 0, moves = 0;
  const ranges = [];
  const push = (o) => fr.push({ a: a.slice(), comps, moves, final: new Set(final), ranges: ranges.slice(), ...o });
  function qs(low, high) {
    ranges.push(`[${low}..${high}]`);
    let i = low, j = high;
    if (i >= j) {
      if (i === j) final.add(i);
      push({ line: 5, low, high, msg: `quick_sort on [${low}..${high}]: ${i === j ? "one element, already in place." : "no elements."}` });
      ranges.pop();
      return;
    }
    const pivot = a[i];
    push({ line: 7, low, high, i, j, pivot, hole: i, msg: `New call on [${low}..${high}]. <code>pivot = data[${i}] = ${pivot}</code>; index ${i} is now a hole.` });
    let hole = i;
    while (i < j) {
      while (i < j) {
        comps++;
        const ge = a[j] >= pivot;
        push({ line: 9, low, high, i, j, pivot, hole, look: j, msg: `Is data[${j}] = ${a[j]} ≥ ${pivot}? ${ge ? "Yes: it may stay right; move j left." : "No: it belongs left of the pivot."}` });
        if (!ge) break;
        j--;
      }
      a[i] = a[j]; moves++; hole = j;
      push({ line: 11, low, high, i, j, pivot, hole, msg: i === j ? `i and j meet at ${i}.` : `Move ${a[i]} into the hole at ${i}. The hole is now at ${j}.` });
      while (i < j) {
        comps++;
        const le = a[i] <= pivot;
        push({ line: 12, low, high, i, j, pivot, hole, look: i, msg: `Is data[${i}] = ${a[i]} ≤ ${pivot}? ${le ? "Yes: it may stay left; move i right." : "No: it belongs right of the pivot."}` });
        if (!le) break;
        i++;
      }
      a[j] = a[i]; moves++; hole = i;
      push({ line: 14, low, high, i, j, pivot, hole, msg: i === j ? `i and j meet at ${i}.` : `Move ${a[j]} into the hole at ${j}. The hole is now at ${i}.` });
    }
    a[i] = pivot; final.add(i);
    push({ line: 15, low, high, i, j, pivot, msg: `The pivot ${pivot} goes into the hole at ${i}: its <b>final position</b>. Smaller on its left, larger on its right.`, msgCls: "good" });
    qs(low, i - 1);
    qs(j + 1, high);
    ranges.pop();
  }
  push({ line: 0, msg: "Press Step to begin: <code>quick_sort(data, 0, " + (a.length - 1) + ")</code>." });
  qs(0, a.length - 1);
  push({ line: 18, msg: `Sorted with <b>${comps}</b> comparisons with the pivot (as <code>quick_sort_count</code> counts them) and ${moves} moves.`, msgCls: "good" });
  return fr;
}

function demoQuick(el, { mini = false } = {}) {
  let data = SORT_LIST.slice();
  makePlayer(el, {
    mini, speed: mini ? 420 : 550,
    extraControls: `<select class="qk-p"><option value="s">slide's list</option><option value="o">sorted 1…9 (worst)</option><option value="m">mixed(10)</option></select>
      <label>data <input type="text" class="qk-d" value="${data.join(", ")}" style="width:190px"></label>`,
    build: () => quickFrames(data),
    draw(view, f) {
      const inRange = (k) => f.low === undefined || (k >= f.low && k <= f.high);
      const cls = (k) => (k === f.hole ? "hole" : f.look === k ? "cmp" : f.final.has(k) ? "done" : !inRange(k) ? "out" : "");
      const labels = {};
      if (f.i !== undefined) { labels[f.i] = "i"; labels[f.j] = f.i === f.j ? "i=j" : "j"; }
      const svg = `<div class="svgbox">${barsSVG(f.a, cls, labels)}</div>`;
      if (mini) { view.innerHTML = svg + statsHTML([["comparisons", f.comps], ["pivot", f.pivot ?? "–"]]); return; }
      view.innerHTML = svg + `<div class="stepper" style="margin-top:10px"><div>${codeBlock(CODE.quickSort, "py", [f.line])}</div>
        <div class="stack-wrap"><small><span>calls (newest on top)</span><span>pivot ${f.pivot ?? "–"}</span></small>
        <div class="stack" style="min-height:120px">${f.ranges.map((r, k) => `<div class="frame ${k === f.ranges.length - 1 ? "top" : ""}"><span class="fname">quick_sort</span> <span class="vars">${r}</span></div>`).join("")}</div>
        ${statsHTML([["comparisons", f.comps], ["moves", f.moves], ["in final place", f.final.size, "good"]])}</div></div>`;
    },
    onMount(root, rebuild) {
      if (mini) return;
      const inp = root.querySelector(".qk-d");
      root.querySelector(".qk-p").onchange = (e) => {
        data = e.target.value === "s" ? SORT_LIST.slice() : e.target.value === "o" ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : mixed(10);
        inp.value = data.join(", "); rebuild();
      };
      inp.onchange = (e) => { data = parseNums(e.target.value, SORT_LIST).slice(0, 12); e.target.value = data.join(", "); rebuild(); };
    },
  });
}

function mixed(n) {
  const data = Array.from({ length: n }, (_, k) => k);
  let seed = 1;
  for (let k = n - 1; k > 0; k--) {
    seed = (seed * 75 + 74) % 65537;
    const j = seed % (k + 1);
    [data[k], data[j]] = [data[j], data[k]];
  }
  return data;
}

function bubbleCount(a) { const n = a.length; return (n * (n - 1)) / 2; }

// Returns [comparisons, deepest call]. Iterative over an explicit stack so it never overflows.
function quickCount(start) {
  const a = start.slice();
  let comps = 0, depth = 0;
  const todo = [[0, a.length - 1, 1]];
  while (todo.length) {
    const [low, high, d] = todo.pop();
    depth = Math.max(depth, d);
    let i = low, j = high;
    if (i >= j) continue;
    const pivot = a[i];
    while (i < j) {
      while (i < j) { comps++; if (a[j] < pivot) break; j--; }
      a[i] = a[j];
      while (i < j) { comps++; if (a[i] > pivot) break; i++; }
      a[j] = a[i];
    }
    a[i] = pivot;
    todo.push([j + 1, high, d + 1], [low, i - 1, d + 1]);
  }
  return [comps, depth];
}

function demoSortRace(el) {
  el.innerHTML = `<div class="controls" style="margin-top:0"><label>n = <b class="sx-v mono"></b> <input type="range" class="sx-n" min="10" max="2000" step="10" value="100" style="width:200px"></label>
    <button class="cbtn" data-n="100">100</button><button class="cbtn" data-n="200">200</button><button class="cbtn" data-n="400">400</button>
    <select class="sx-k"><option value="m">mixed(n)</option><option value="s">already sorted</option><option value="r">reversed</option></select></div>
    <div class="sx-bars"></div><div class="sx-stats"></div><p class="hint sx-hint"></p>`;
  const $ = (q) => el.querySelector(q);
  function render() {
    const n = +$(".sx-n").value, kind = $(".sx-k").value;
    $(".sx-v").textContent = n;
    const data = kind === "m" ? mixed(n) : kind === "s" ? Array.from({ length: n }, (_, k) => k) : Array.from({ length: n }, (_, k) => n - 1 - k);
    const b = bubbleCount(data);
    const [q, depth] = quickCount(data);
    const nl = Math.round(n * Math.log2(n));
    $(".sx-bars").innerHTML = barsHTML([["bubble sort", b, "red"], ["quick sort", q, q > nl * 3 ? "amber" : ""], ["n log₂ n", nl, "amber"]], Math.max(b, q));
    const deep = depth > RECURSION_LIMIT;
    $(".sx-stats").innerHTML = statsHTML([["bubble / quick", (b / q).toFixed(1) + "×"], ["quick sort depth", fmt(depth), deep ? "bad" : ""], ["in Python", deep ? "RecursionError" : "fine", deep ? "bad" : "good"]]);
    $(".sx-hint").innerHTML = kind === "m"
      ? "Scrambled input: quick sort stays near n log₂ n. Try n = 100, 200, 400 and compare with the table in the note."
      : `With the first element as pivot, ${kind === "s" ? "sorted" : "reversed"} input is quick sort's worst case: n(n−1)/2 comparisons, like bubble sort, and a call stack n deep.`;
  }
  $(".sx-n").oninput = render;
  $(".sx-k").onchange = render;
  el.querySelectorAll("[data-n]").forEach((bt) => { bt.onclick = () => { $(".sx-n").value = bt.dataset.n; render(); }; });
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

// Demo registry: data-demo="name" in chapters.js mounts DEMOS[name].
const DEMOS = {
  experiment: (el) => demoExperiment(el),
  cases: (el) => demoCases(el),
  growth: (el) => demoGrowth(el),
  abc: (el) => demoABC(el),
  bigO: (el) => demoBigO(el),
  smallest: (el) => demoSmallest(el),
  smallestMini: (el) => demoSmallest(el, { mini: true }),
  opsGrowth: (el) => demoOpsGrowth(el),
  powerCount: (el) => demoPowerCount(el),
  fibTree: (el) => demoFibTree(el),
  fibMini: (el) => demoFibTree(el, { mini: true }),
  fibGrowth: (el) => demoFibGrowth(el),
  searchSteps: (el) => demoSearchSteps(el),
  searchMini: (el) => demoSearchSteps(el, { mini: true }),
  searchRace: (el) => demoSearchRace(el),
  bubble: (el) => demoBubble(el),
  bubbleMini: (el) => demoBubble(el, { mini: true }),
  quick: (el) => demoQuick(el),
  quickMini: (el) => demoQuick(el, { mini: true }),
  sortRace: (el) => demoSortRace(el),
  quiz: (el) => demoQuiz(el, QUIZ),
};
