// Chapter content, adapted from notes/L09-algorithm-analysis.md. Code is copied from the note.

const demo = (name, title, instr, hint = "") =>
  `<div class="card demo" data-demo="${name}"><div class="head"><span class="title">${title}</span><span>${instr}</span></div>
   <div class="demo-body"></div>${hint ? `<p class="hint">${hint}</p>` : ""}</div>`;

const callout = (kind, label, body) => `<div class="callout ${kind}"><b>${label}</b>${body}</div>`;
const predict = (q, a) => callout("predict", "PREDICT", `<p>${q}</p><details class="reveal"><summary>Show the answer</summary>${a}</details>`);
const repl = (s) => codeBlock(s, "repl");
const out = (s) => codeBlock(s, "out");
const table = (rows, head) => `<div style="overflow-x:auto"><table>${head ? `<tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr>` : ""}${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</table></div>`;

const VIDEO_P1 = "media/L09-1.mp4";
const VIDEO_P2 = "media/L09-2.mp4";
const VIDEO_P3 = "media/L09-3.mp4";
const VIDEO_P4 = "media/L09-4.mp4";

const LECTURE = {
  number: 9,
  title: "Algorithm Analysis",
  tagline: "Running time, big-O, searching and sorting",
  lead: "Why a better algorithm beats a faster computer — count operations instead of seconds, read big-O, and watch binary search, bubble sort and quick sort do their work one comparison at a time.",
  heroDemo: "quickMini",
  heroLabel: "Quick sort, one comparison at a time",
  heroCaption: "Each pivot lands in its final place (green); the parts on either side are sorted the same way.",
  whyTitle: "Why algorithm analysis is worth learning",
  whySub: "Three ideas you will use in every program you write",
  why: [
    ["Count, don't time", "Seconds depend on the computer. The number of <b>primitive operations</b> is the same everywhere."],
    ["Growth decides", "<b>Big-O</b> keeps only how the work grows with n. For large inputs, n log n beats n² whatever the constants."],
    ["Halving is magic", "Binary search, fast_power and quick sort all <b>halve</b> the problem: a million elements take about 20 steps."],
  ],
  ctaTitle: "Ready to count some operations?",
  minutes: "About 75–90 minutes",
  videos: {
    [VIDEO_P1]: "Lecture 9 · Part 1 — Counting operations (8.6 min)",
    [VIDEO_P2]: "Lecture 9 · Part 2 — Big-O notation (8.1 min)",
    [VIDEO_P3]: "Lecture 9 · Part 3 — Recursion and binary search (7.1 min)",
    [VIDEO_P4]: "Lecture 9 · Part 4 — Bubble sort and quick sort (8.1 min)",
  },
};

const CHAPTERS = [
  {
    slug: "1-measure", nav: "Measuring", title: "Algorithms and Running Time",
    subtitle: "What makes an algorithm good, and why a stopwatch is not enough",
    abstract: "A better algorithm can turn a year into a second. To tell better from worse, we first try timing programs — and find out why that is not enough.",
    tags: ["data structure", "algorithm", "experiments"],
    hero: "code:timing", heroCaption: "The slide's experiment (its output changes every run)",
    sections: [
      { id: "video", title: "Watch: counting operations", html: `
        <p>The first video covers Chapters 1–3: why a stopwatch is not enough, counting primitive operations in the worst case, and the seven growth functions.</p>
        <div class="card video" data-video="${VIDEO_P1}"></div>` },
      { id: "dsa", title: "Data structures and algorithms", html: `
        <p>A <b>data structure</b> is a systematic way of organising and accessing data. A Python list is one: its elements sit in order, and you can reach any of them by index. A dictionary is another: you reach a value by its key. Later lectures add more (stacks, queues, trees).</p>
        <p>An <b>algorithm</b> is a step-by-step procedure for performing some task in a finite amount of time. Binary search from Lecture 6 is an algorithm: a precise list of steps that ends with “found” or “not there”.</p>
        <p>Why study them? Every other branch of computer science uses them, and so does AI: training a model is an algorithm running over data structures that hold millions of numbers. They also matter more than hardware. Moore's law predicted that the number of transistors on a chip would double every one to two years, and for decades it did. Yet in many areas the speed-ups from <em>better algorithms</em> have been even larger than the speed-ups from faster chips. A faster computer makes a slow algorithm a bit less slow; a better algorithm can turn “a year” into “a second”. This lecture gives you the tools to tell the two apart.</p>
        <p>What makes an algorithm <em>good</em>? Mainly two things:</p>
        <ul><li><b>Running time</b>: how long it takes. Time is precious; a program should be as fast as it can.</li>
        <li><b>Space usage</b>: how much memory it needs. Memory is limited too.</li></ul>
        <p>This lecture is about running time. Space works the same way, and you have already seen one example: in Lecture 6, <code>linear_sum</code> needed a call stack <span class="math">n</span> frames deep while <code>binary_sum</code> needed only about log₂ <span class="math">n</span>.</p>` },
      { id: "experiment", title: "Measuring running time by experiment", html: `
        <p>The direct way to find out how fast a program is: run it and time it. The slide uses <code>time()</code> from the <code>time</code> module, which returns the current time in seconds:</p>
        ${callout("note", "NOTE", `<p>The slide calls the variables <code>startTime</code> and <code>endTime</code>. These notes use Python's standard naming style (PEP 8): lower-case words joined by underscores, so <code>start_time</code> and <code>end_time</code>.</p>`)}
        ${codeBlock(CODE.timing)}
        <p>This block is not run when the notes are checked, because its last line prints a different number every time — on your laptop, on a friend's, and even on yours a second later. Most of that time is spent in <code>print</code>, which is slow compared with <code>i % 10 == 0</code>.</p>
        <p>To see how running time depends on the input, we run the program on inputs of many sizes and plot each run as a point: input size across, running time up. For most algorithms the points rise with the size, roughly along a curve, with some scatter from whatever else the computer was doing at the time.</p>
        ${demo("experiment", "Demo 1 · Time it yourself", "run it several times", "This times a JavaScript copy of the loop (without the printing) in <b>your</b> browser, for seven sizes. Run it again: the points move. Compare with a friend's computer: they move a lot more. The counts below the plot never change.")}` },
      { id: "problems", title: "Three problems with experiments", html: `
        <p>Experiments are useful, but they have three problems:</p>
        <ol><li><b>They depend on the machine.</b> Two algorithms can only be compared fairly if they were timed on the same hardware and software (operating system, Python version).</li>
        <li><b>They only cover the inputs you tried.</b> An input you did not test might be much slower, and it might be the one that matters.</li>
        <li><b>You need the whole program first.</b> You cannot time an idea; it must be fully implemented before you can run it.</li></ol>
        <p>So we want a way to analyse an algorithm <em>without running it</em>, that works for every input and every machine. The rest of the lecture builds it.</p>
        ${predict("In the timing program above, how many times does the loop body run, and how many times is <code>print(i)</code> called? Answer without running it, then check with the program below.",
          `${codeBlock(CODE.loopCount)}${out("19999 1999")}<p><code>range(1, 20000)</code> gives 1 to 19999: 19,999 numbers. Every tenth one is a multiple of 10: 1,999 of them. Those counts are the same on every computer in the world. That is the idea of the next chapter.</p>`)}` },
    ],
    takeaways: ["Algorithm: finite steps; data structure: organised data.", "Good = little time and little space.", "Timing depends on machine and inputs."],
  },
  {
    slug: "2-count", nav: "Counting", title: "Counting Primitive Operations",
    subtitle: "Three principles that replace the stopwatch",
    abstract: "Count simple steps, as a function of the input size, for the worst input. The answer no longer depends on the computer.",
    tags: ["primitive operations", "f(n)", "worst case"],
    hero: "code:loopCount", heroCaption: "Counts are the same on every computer",
    sections: [
      { id: "primitive", title: "Principle 1: count primitive operations", html: `
        <p>Instead of timing a program, we count the steps it takes. We pick a set of <b>primitive operations</b>: simple steps that each take a small, fixed amount of time on any computer. The slides use these:</p>
        <ul><li>assigning an identifier to an object (<code>x = 5</code>);</li>
        <li>determining the object associated with an identifier (reading <code>x</code>);</li>
        <li>performing an arithmetic operation (<code>a + b</code>);</li>
        <li>comparing two numbers (<code>a &lt; b</code>);</li>
        <li>accessing a single element of a list by index (<code>data[i]</code>);</li>
        <li>calling a function (not counting the operations inside it);</li>
        <li>returning from a function.</li></ul>
        <p>If an algorithm performs <span class="math">t</span> primitive operations, its running time is roughly <span class="math">t</span> times some constant that depends on the machine. Counting operations removes the machine and keeps what belongs to the algorithm.</p>` },
      { id: "size", title: "Principle 2: count as a function of the input size", html: `
        <p>An algorithm takes longer on bigger inputs, so a single number is not enough. We write the count as a function <span class="math">f(n)</span> of the <b>input size</b> <span class="math">n</span>: the length of the list, the number of digits, whatever measures “how big” the input is. <span class="math">f(n)</span> is the number of primitive operations the algorithm performs on an input of size <span class="math">n</span>.</p>` },
      { id: "worst", title: "Principle 3: focus on the worst case", html: `
        <p>Inputs of the same size can take different amounts of time. Searching a list for its first element takes one step; searching for something that is not there looks at every element. For each size <span class="math">n</span> there is a <b>best case</b> (the fastest input), a <b>worst case</b> (the slowest) and an <b>average case</b> over all inputs.</p>
        <p>The average case sounds the most useful, but it is hard to define: “average over which inputs, with which probabilities?” So we use the <b>worst case</b>: the largest number of operations over all inputs of size <span class="math">n</span>. It is easier to work out, and it is a guarantee — the algorithm is never slower than that.</p>
        ${predict("Sequential search looks at the elements of a list of <span class=\"math\">n</span> elements one by one until it finds the target. What is its best case? Its worst case?",
          `<p>Best case: the target is the first element, 1 comparison. Worst case: the target is last or not there at all, <span class="math">n</span> comparisons. Chapter 7 counts them with a program.</p>`)}
        ${demo("cases", "Demo 2 · Best, worst and average", "pick a target, then step", "One bar per target: how many elements sequential search looks at. Like the slide's bar chart of input instances, the worst case is the tallest bar.")}
        ${callout("pitfall", "PITFALL", `<p><b>“Fewer lines of code means faster.”</b> We count how many times each operation <em>runs</em>, not how many lines the program has. A one-line loop that runs a million times does a million times the work of a line that runs once.</p>`)}` },
    ],
    takeaways: ["Count primitive operations, not seconds.", "Write the count as f(n) of the input size.", "Use the worst case: it is a guarantee."],
  },
  {
    slug: "3-growth", nav: "Growth", title: "The Seven Functions",
    subtitle: "1, log n, n, n log n, n², n³, 2ⁿ",
    abstract: "Almost every running time is one of seven functions. How fast the function grows, not its constant, decides which algorithm wins on large inputs.",
    tags: ["growth rates", "A vs B vs C", "crossover"],
    hero: "growth", heroCaption: "Drag n and watch 2ⁿ leave the others behind.",
    sections: [
      { id: "seven", title: "Seven functions", html: `
        <p>Almost every running time in this course is one of seven functions, or close to one:</p>
        ${table([["constant", "1", "read <code>data[i]</code>"], ["logarithm", "log n", "binary search"], ["linear", "n", "sequential search, <code>find_smallest</code>"], ["n-log-n", "n log n", "quick sort (usually), Python's <code>sorted</code>"], ["quadratic", "n²", "bubble sort"], ["cubic (and other polynomials)", "n³", "three nested loops over n"], ["exponential", "2ⁿ", "the recursive <code>fib</code> from Lecture 6"]], ["name", "f(n)", "example"])}
        <p>In computer science, log <span class="math">n</span> means log₂ <span class="math">n</span> unless we say otherwise: the number of times you can halve <span class="math">n</span> before you reach 1.</p>
        <p>The table below shows how fast each one grows. Python computes it for us:</p>
        ${codeBlock(CODE.sevenTable)}${out(CODE.sevenOut)}
        <p>Read it column by column. Doubling <span class="math">n</span> adds 1 to log <span class="math">n</span>, doubles <span class="math">n</span>, a little more than doubles <span class="math">n</span> log <span class="math">n</span>, multiplies <span class="math">n</span>² by 4 and <span class="math">n</span>³ by 8 — and <em>squares</em> 2<sup>n</sup>. 2<sup>512</sup> has 155 digits: no computer will ever do that many steps.</p>
        ${callout("note", "NOTE", `<p><code>f"{x:>8}"</code> right-aligns <code>x</code> in 8 characters; <code>.3g</code> shows a number with 3 significant digits, in scientific notation (<code>6.55e+04</code> means 6.55 × 10⁴) if it is large.</p>`)}
        ${demo("growth", "Demo 3 · Growth-rate curves", "drag n, or ← →", "The table under the plot gives each function's value at the current n.")}` },
      { id: "abc", title: "Which algorithm is faster?", html: `
        <p>Three algorithms solve the same problem. On an input of size <span class="math">n</span> they perform:</p>
        <ul><li>A: f(n) = 10 n log₂ n + 50</li><li>B: f(n) = 2n² + 100n</li><li>C: f(n) = 10000 n</li></ul>
        ${predict("Which is fastest for n = 10? Which for n = 10000? Decide before you read on.",
          `${codeBlock(CODE.abc)}${out(CODE.abcOut)}<p>For n = 10, A is fastest and C, with its huge constant 10000, is by far the slowest. For n = 10000, C has overtaken B, and for a million B is 200 times slower than C. B grows like n²; C only like n.</p>`)}
        <p>However large C's constant, there is a point after which B is always slower:</p>
        ${repl(`>>> n = 1
>>> while ops_b(n) <= ops_c(n):
...     n += 1
>>> n
4951`)}
        <p>From n = 4951 on, B does more work than C, for ever. A stays ahead of C for every input you will ever meet. <em>How fast a function grows</em> decides which algorithm wins on large inputs; the constants only decide where the crossover is.</p>
        ${demo("abc", "Demo 4 · A, B and C", "drag n", "Green is the fastest at this n, red the slowest. Try 4,950 and 4,951.")}` },
    ],
    takeaways: ["Seven functions cover almost everything.", "Doubling n: +1, ×2, ×4, ×8 … or squared.", "Growth beats constants for large n."],
  },
  {
    slug: "4-bigo", nav: "Big-O", title: "Big-O Notation",
    subtitle: "“Grows no faster than, up to a constant factor”",
    abstract: "f(n) is O(g(n)) if, from some n₀ on, f(n) ≤ c·g(n). Big-O drops constants and lower-order terms and keeps the growth.",
    tags: ["definition", "c and n₀", "tractability"],
    hero: "bigO", heroCaption: "Find a c and an n₀ that make the definition hold.",
    sections: [
      { id: "video", title: "Watch: big-O notation", html: `
        <p>The second video covers Chapters 4 and 5: the definition of big-O, the rules for simplifying, the line of tractability, and counting the smallest-number program.</p>
        <div class="card video" data-video="${VIDEO_P2}"></div>` },
      { id: "asymptotic", title: "Asymptotic analysis", html: `
        <p><b>Asymptotic analysis</b> looks at the <em>growth rate</em> of the running time as <span class="math">n</span> grows large, and ignores the rest. It is coarse enough to ignore details that depend on the computer, the language or the compiler, and sharp enough to compare algorithms in a meaningful way. Its vocabulary is big-O.</p>` },
      { id: "definition", title: "The definition", html: `
        <p>Let f(n) and g(n) be functions from positive integers to positive real numbers. We say that <b>f(n) is O(g(n))</b> if there is a real constant c &gt; 0 and an integer constant n₀ ≥ 1 such that</p>
        <div class="math-block">f(n) ≤ c · g(n) &nbsp;&nbsp;for every n ≥ n₀.</div>
        <p>In words: from some point n₀ on, f is never bigger than a constant multiple of g. Big-O means “grows no faster than, up to a constant factor”.</p>
        <p><b>Example.</b> 8n + 5 is O(n). We need to find c and n₀. For n ≥ 1 we have 5 ≤ 5n, so 8n + 5 ≤ 8n + 5n = 13n. Take c = 13 and n₀ = 1. (Other choices work too: c = 9 and n₀ = 5, because 8n + 5 ≤ 9n exactly when n ≥ 5.)</p>
        <p>A computer cannot check “for every n”, but it can check a lot of them, which is a good way to catch a wrong c or n₀:</p>
        ${repl(`>>> all(8 * n + 5 <= 13 * n for n in range(1, 100000))
True
>>> all(8 * n + 5 <= 9 * n for n in range(5, 100000))
True
>>> [n for n in range(1, 10) if 8 * n + 5 > 9 * n]
[1, 2, 3, 4]`)}
        <p>The last line shows why c = 9 needs n₀ = 5: for n = 1 to 4, 8n + 5 is still bigger than 9n.</p>
        ${demo("bigO", "Demo 5 · Find c and n₀", "drag c and n₀", "Red bands are the n where f(n) &gt; c·g(n). The definition holds when there is no red band to the right of n₀. Start with c = 9: then move n₀ to 5.")}
        ${predict("Is 8n + 5 also O(n²)? Is n² O(n)?",
          `<p>8n + 5 is O(n²): 8n + 5 ≤ 13n ≤ 13n² for n ≥ 1. It is <em>true</em> but not useful, like saying “the lecture is shorter than a year”. n² is <em>not</em> O(n): for any c, as soon as n &gt; c we have n² = n · n &gt; c · n, so no c works for every large n. (Pick “n² is not O(n)” in Demo 5.)</p>`)}` },
      { id: "rules", title: "Rules for simplifying", html: `
        <p>Big-O lets us drop <b>constant factors</b> and <b>lower-order terms</b> and keep the part of a function that decides its growth:</p>
        <ul><li>5n⁴ + 3n³ + 2n² + 4n + 1 is O(n⁴): for n ≥ 1, each term is at most its coefficient times n⁴, so the sum is at most (5+3+2+4+1)n⁴ = 15n⁴.</li>
        <li>2<sup>n+2</sup> is O(2<sup>n</sup>): 2<sup>n+2</sup> = 4 · 2<sup>n</sup>, so c = 4 works.</li>
        <li>2n + 100 log n is O(n): log n ≤ n for n ≥ 1, so the sum is at most 102n.</li></ul>
        ${repl(`>>> all(5*n**4 + 3*n**3 + 2*n**2 + 4*n + 1 <= 15 * n**4 for n in range(1, 2000))
True
>>> all(2 ** (n + 2) == 4 * 2 ** n for n in range(1, 2000))
True
>>> all(2*n + 100*math.log2(n) <= 102 * n for n in range(1, 2000))
True`)}
        <p>Use big-O to describe a function <b>as closely as possible</b>: say 8n + 5 is O(n), not O(n²), even though both are true.</p>
        ${callout("pitfall", "PITFALL", `<p><b>“O(n) means exactly n steps.”</b> No: O(n) allows 1000n + 7 steps. Big-O hides the constant. It tells you how the work <em>grows</em> — double n, double the work — not how long one run takes.</p>`)}` },
      { id: "compare", title: "Comparing algorithms", html: `
        <p>Suppose algorithm A runs in O(n) time and algorithm B in O(n²). Which is better? A is <b>asymptotically better</b>: for large enough n, A is faster, whatever the constants (we saw this with B and C in Chapter 3). For a small n, B might still win.</p>
        <p>Big-O orders the seven functions by growth rate:</p>
        <div class="math-block">1 &lt; log n &lt; n &lt; n log n &lt; n² &lt; n³ &lt; 2ⁿ</div>
        <p>Each is O of the ones to its right, but not of the ones to its left.</p>` },
      { id: "tractable", title: "The line of tractability", html: `
        <p>Where is the line between “efficient” and “hopeless”? The usual answer: between <b>polynomial</b> running times (n, n², n³, …, n<sup>k</sup> for a fixed k) and <b>exponential</b> ones (2ⁿ and worse). A polynomial algorithm on a computer twice as fast handles a noticeably larger input; an exponential one handles one more element. Problems with a polynomial-time algorithm are called <b>tractable</b>.</p>
        ${predict("An O(2ⁿ) algorithm can just handle n = 40 in an hour. You buy a computer 1000 times faster. About how large an n can you now handle in an hour?",
          `<p>About n = 50: 2¹⁰ = 1024 ≈ 1000, so 1000 times more work buys only 10 more elements. An O(n²) algorithm on the same upgrade could handle about √1000 ≈ 32 times larger inputs.</p>`)}` },
    ],
    takeaways: ["f ≤ c·g for all n ≥ n₀.", "Drop constants and lower-order terms.", "Polynomial: tractable. Exponential: not."],
  },
  {
    slug: "5-smallest", nav: "Example", title: "Worked Example: the Smallest Number",
    subtitle: "Count every operation of a real program",
    abstract: "The slide's program counts at most 4n + 4 operations to find the smallest number. Counting with a program shows the best case, the worst case, and why only the growth matters.",
    tags: ["4n + 4", "count_ops", "O(n)"],
    hero: "smallestMini", heroCaption: "Every assignment, comparison and call, counted.",
    sections: [
      { id: "program", title: "Counting line by line", html: `
        <p>Here is the program from the slide that finds the smallest number in a list. It prints its progress after every element:</p>
        ${callout("note", "NOTE", `<p>The slide compares with <code>smallest_so_far == None</code>. PEP 8 asks for <code>is None</code>: <code>None</code> is a single object, and <code>is</code> checks for that object. Both work here. The slide's <code>mylist</code> is <code>my_list</code> here.</p>`)}
        ${codeBlock(CODE.smallest)}${out("Before None\n9 9\n9 39\n9 21\n9 98\n4 4\n4 5\n4 100\n4 65\nAfter 4")}
        <p>How many operations does it perform on a list of <span class="math">n</span> numbers? For simplicity the slide counts only three kinds: <b>assignments</b>, <b>comparisons</b> and <b>function calls</b>.</p>
        <ul><li>Before the loop: one assignment for <code>my_list</code>, one for <code>smallest_so_far</code>, one call of <code>print</code>: <b>3</b>.</li>
        <li>Each round of the loop: the comparison <code>is None</code>; at most one more comparison <code>num &lt; smallest_so_far</code>; at most one assignment; one call of <code>print</code>: <b>at most 4</b>.</li>
        <li>After the loop: one call of <code>print</code>: <b>1</b>.</li></ul>
        <p>The loop runs <span class="math">n</span> times, so the program performs at most</p>
        <div class="math-block">f(n) = 3 + 4n + 1 = 4n + 4</div>
        <p>operations, and 4n + 4 is O(n) (take c = 8, n₀ = 1). The smallest number in a list takes <b>linear time</b>.</p>
        ${demo("smallest", "Demo 6 · Count every operation", "← → keys step", "Each step is one counted operation, except the loop setting <code>num</code>, which the slide does not count. Switch to the decreasing list for the worst case.")}` },
      { id: "count", title: "Counting with a program", html: `
        <p>We can let Python do the counting. This function performs the same steps as the program above on any list and returns the number of operations, by the same rules:</p>
        ${codeBlock(CODE.countOps)}
        ${predict("Which list of the numbers 1 to 8 makes the program do the most work: in increasing order, in decreasing order, or the slide's mixed order? Which does the least?",
          `${repl(`>>> count_ops([9, 39, 21, 98, 4, 5, 100, 65])
29
>>> count_ops([1, 2, 3, 4, 5, 6, 7, 8])
28
>>> count_ops([8, 7, 6, 5, 4, 3, 2, 1])
35`)}<p>A list in decreasing order is the <b>worst case</b>: every number is a new smallest, so every round does the extra assignment. An increasing list is the <b>best case</b>. In the first round the <code>elif</code> comparison never runs, so the exact worst case is 4n + 3, one less than the slide's 4n + 4: the slide's count is an upper bound, which is all we need.</p>`)}
        ${repl(`>>> [count_ops(list(range(n, 0, -1))) for n in [1, 10, 100, 1000]]
[7, 43, 403, 4003]
>>> [count_ops(list(range(1, n + 1))) for n in [1, 10, 100, 1000]]
[7, 34, 304, 3004]`)}
        <p>Best case 3n + 4, worst case 4n + 3: both O(n). Ten times the input, ten times the work.</p>
        ${demo("opsGrowth", "Demo 7 · Best, worst and the bound", "drag n")}
        ${callout("pitfall", "PITFALL", `<p><b>“The exact count matters.”</b> We left out several operations — reading <code>num</code>, the loop assigning the next element to <code>num</code> each round. Counting those would give something like 5n + 4 or 6n + 4 instead of 4n + 4. It makes no difference to the answer, O(n). That is why big-O is useful: you only need to count carefully enough to get the growth right.</p>`)}` },
    ],
    takeaways: ["At most 4 operations per element.", "Best 3n + 4, worst 4n + 3.", "Both O(n): linear time."],
  },
  {
    slug: "6-recursive", nav: "Recursion", title: "Analysing Recursive Algorithms",
    subtitle: "Work per call × number of calls",
    abstract: "Lecture 6 promised to make two things precise: fast_power is O(log n), and the recursive fib is exponential. Here is how.",
    tags: ["fast_power", "O(log n)", "fib is exponential"],
    hero: "fibMini", heroCaption: "fib(4): the same calls, again and again.",
    sections: [
      { id: "video", title: "Watch: recursion and binary search", html: `
        <p>The third video covers Chapters 6 and 7: counting the calls of power, fast_power and fib, and why binary search is O(log n).</p>
        <div class="card video" data-video="${VIDEO_P3}"></div>` },
      { id: "power", title: "Power", html: `
        <p>Lecture 6 wrote x<sup>n</sup> two ways. <code>power</code> goes from n to n − 1:</p>
        ${codeBlock(CODE.power)}
        <p>It makes n + 1 calls, and each call does a constant amount of work (a comparison, a multiplication, a call, a return). So <code>power</code> is O(n): in effect it computes x · x · … · x with n − 1 multiplications (plus one more by 1 at the bottom).</p>
        <p><code>fast_power</code> (the slides call it <code>myPower</code>) goes from n to n // 2, using</p>
        <div class="math-block">x<sup>n</sup> = 1 if n = 0 &nbsp;·&nbsp; x · (x<sup>⌊n/2⌋</sup>)² if n &gt; 0 is odd &nbsp;·&nbsp; (x<sup>⌊n/2⌋</sup>)² if n &gt; 0 is even</div>
        ${codeBlock(CODE.fastPower)}
        <p>The slide counts the operations of one call, line by line: 1 for <code>if n == 0</code>, 1 for <code>return 1</code>, then 2 each for <code>result = partial * partial</code>, <code>if n % 2 == 1</code> and <code>result = result * x</code> (an arithmetic operation and an assignment or comparison), and 1 for <code>return result</code>. That is at most 8 operations, plus whatever the recursive call <code>fast_power(x, n // 2)</code> costs: the slide marks it “?”.</p>
        <p>The “?” is the same question on a smaller input. Every call does a constant amount of work itself, so the total is that constant times <b>the number of calls</b>. Each call halves n, so the number of calls is the number of times n can be halved before it reaches 0:</p>
        ${codeBlock(CODE.fastPowerCalls)}
        ${repl(`>>> [fast_power_calls(n) for n in [1, 2, 4, 8, 13, 1000, 1000000]]
[2, 3, 4, 5, 5, 11, 21]`)}
        <p>For n ≥ 1 this is ⌊log₂ n⌋ + 2 calls, so <code>fast_power</code> runs in O(log n) time. For n = a million: 21 calls instead of a million. That is the precise version of what Lecture 6 showed with the call stack.</p>
        ${demo("powerCount", "Demo 8 · power vs fast_power", "drag n", "Multiplications of <code>fast_power</code> are counted as in Exercise 9: one <code>partial * partial</code> per call, plus one <code>result * x</code> when n is odd.")}` },
      { id: "fib", title: "The cost of fib", html: `
        <p>Exercise 9 of Lecture 6 wrote the Fibonacci numbers straight from their definition and counted the calls:</p>
        ${codeBlock(CODE.fib)}
        ${predict("<code>fib_calls(20)</code> is 21891. Guess <code>fib_calls(21)</code> and <code>fib_calls(22)</code> before you look.",
          `${repl(`>>> [fib_calls(n) for n in range(18, 25)]
[8361, 13529, 21891, 35421, 57313, 92735, 150049]
>>> round(fib_calls(24) / fib_calls(23), 3)
1.618`)}<p>Each step of n multiplies the number of calls by about 1.618.</p>`)}
        ${demo("fibTree", "Demo 9 · The recursion tree of fib(n)", "step or play", "Count how often the same call appears. Every node is a call that does a constant amount of work, so the running time is proportional to the number of nodes.")}
        <p>Lecture 6 said the calls grow “roughly like 1.6<sup>n</sup>”; now we can say it in big-O terms. Each call of <code>fib</code> does a constant amount of work besides its two recursive calls, so its running time is proportional to <code>fib_calls(n)</code>, and:</p>
        <ul><li><code>fib_calls(n)</code> is more than twice <code>fib_calls(n - 2)</code> (it contains a call of <code>fib(n - 2)</code> <em>and</em> a call of <code>fib(n - 1)</code>, which contains another). So the count at least doubles every two steps: it is at least 2<sup>n/2</sup> ≈ 1.41<sup>n</sup>.</li>
        <li>Each call makes at most 2 calls, so the count is at most 1 + 2 + 4 + … + 2<sup>n</sup> &lt; 2<sup>n+1</sup>, which is O(2<sup>n</sup>).</li></ul>
        <p>The running time of <code>fib</code> is <b>exponential</b>: it is below the line of tractability. <code>fib(50)</code> would take about 40 billion calls. The fix is to stop recomputing the same values. A loop keeps the last two numbers and makes one pass:</p>
        ${codeBlock(CODE.fibLoop)}
        ${repl(`>>> [fib_loop(n) for n in range(10)] == [fib(n) for n in range(10)]
True
>>> fib_loop(50)
12586269025`)}
        <p><code>fib_loop(n)</code> runs its loop n times: O(n), from exponential to linear by changing the algorithm, not the computer.</p>
        ${demo("fibGrowth", "Demo 10 · Exponential vs linear", "drag n, or ← →")}
        ${callout("pitfall", "PITFALL", `<p><b>“Recursion is slow.”</b> Recursion itself is not the problem: <code>fast_power</code> and binary search are recursive and very fast. <code>fib</code> is slow because its two recursive calls solve <em>overlapping</em> problems, so the same values are computed again and again.</p>`)}` },
    ],
    takeaways: ["Time = work per call × number of calls.", "Halving n: O(log n) calls.", "fib: exponential; fib_loop: O(n)."],
  },
  {
    slug: "7-search", nav: "Search", title: "Binary Search Is O(log n)",
    subtitle: "Proof and count: at most ⌊log₂ n⌋ + 1 looks",
    abstract: "Each call keeps at most half the candidates, so after j calls at most n / 2ʲ remain. A million elements: 20 looks instead of a million.",
    tags: ["proof", "counting looks", "O(log n) vs O(n)"],
    hero: "searchMini", heroCaption: "Sequential vs binary search, one look at a time.",
    sections: [
      { id: "strategy", title: "The strategy", html: `
        <p>Lecture 6 introduced <b>binary search</b> on a sorted list. The candidates for the target are the elements from index <code>low</code> to <code>high</code>. Look at the middle one, <code>data[mid]</code>:</p>
        <ul><li>if the target equals <code>data[mid]</code>, the search ends successfully;</li>
        <li>if the target is smaller, search the first half: <code>low</code> to <code>mid - 1</code>;</li>
        <li>if the target is larger, search the second half: <code>mid + 1</code> to <code>high</code>.</li></ul>
        ${codeBlock(CODE.binarySearch)}
        ${repl(`>>> data = [1, 3, 5, 6, 16, 78, 100, 135, 900]
>>> binary_search(data, 16, 0, len(data) - 1)
True
>>> binary_search(data, 7, 0, len(data) - 1)
False`)}
        <p>(The slide's version also prints a message; Lecture 6 explains why these notes return a value and let the caller print.)</p>` },
      { id: "proof", title: "Why it takes O(log n) time", html: `
        <p><b>Proposition.</b> Binary search runs in O(log n) time on a sorted list of n elements.</p>
        <p><b>Why.</b> Each call does a constant amount of work besides its one recursive call, so again we count calls. The number of candidates in a call is <code>high - low + 1</code>. The next call keeps either the candidates left of <code>mid</code> or those right of it, and either way that is at most half:</p>
        <div class="math-block">(mid − 1) − low + 1 ≤ (high − low + 1) / 2 &nbsp;&nbsp;and&nbsp;&nbsp; high − (mid + 1) + 1 ≤ (high − low + 1) / 2</div>
        <p>So there are n candidates in the first call, at most n/2 in the second, at most n/4 in the third, and at most n/2<sup>j</sup> after j halvings. In the worst case (the target is not there) the search stops when no candidates are left. The number of calls that still look at an element is the smallest r with n / 2<sup>r</sup> &lt; 1, which is r = ⌊log₂ n⌋ + 1. So binary search is O(log n).</p>` },
      { id: "counting", title: "Counting comparisons", html: `
        <p>Let's check the proof by counting. <code>linear_search</code> is sequential search with a counter; <code>binary_search_looks</code> is binary search returning how many elements it looked at (how many times it computed <code>data[mid]</code>):</p>
        ${codeBlock(CODE.searchCounts)}
        ${predict("On the sorted list <code>[0, 1, 2, ..., 999]</code>, how many elements does each search look at when the target is 1000 (not there)? When it is 0?",
          `${repl(`>>> data = list(range(1000))
>>> linear_search(data, 1000), binary_search_looks(data, 1000, 0, 999)
(1000, 10)
>>> linear_search(data, 0), binary_search_looks(data, 0, 0, 999)
(1, 9)`)}<p>For 0, sequential search is lucky (it is the first element) and binary search is not (0 is at the far end of its halvings).</p>`)}
        ${demo("searchSteps", "Demo 11 · Look by look", "← → keys step", "Both searches take one look per step. Set the target to n (not there) for the worst case, or to 0 to give sequential search its best case.")}
        <p>In the worst case, the target is missing:</p>
        ${codeBlock(CODE.worstTable)}${out(CODE.worstOut)}
        <p>The last column is the formula from the proof, ⌊log₂ n⌋ + 1, and it matches the count exactly. Sequential search is O(n); binary search is O(log n): 20 looks instead of a million.</p>
        ${demo("searchRace", "Demo 12 · Worst case, any size", "drag n")}
        ${callout("pitfall", "PITFALL", `<p><b>Binary search needs sorted data.</b> On unsorted data it silently gives wrong answers (Lecture 6). Sorting first costs more than one sequential search, so binary search pays off when you search the same list many times. That is one reason to study sorting.</p>`)}` },
    ],
    takeaways: ["Each call keeps at most half the candidates.", "At most ⌊log₂ n⌋ + 1 looks.", "O(log n) vs O(n): 20 vs 1,000,000."],
  },
  {
    slug: "8-bubble", nav: "Bubble sort", title: "Bubble Sort",
    subtitle: "Swap neighbours until nothing is out of order",
    abstract: "Each pass carries the largest remaining element to the end. The passes always compare n(n − 1)/2 pairs: O(n²).",
    tags: ["passes", "swaps", "O(n²)"],
    hero: "bubbleMini", heroCaption: "The largest element bubbles to the end of every pass.",
    sections: [
      { id: "video", title: "Watch: bubble sort and quick sort", html: `
        <p>The fourth video covers Chapters 8 and 9: bubble sort, one quick sort partition step by step, and how many comparisons each makes.</p>
        <div class="card video" data-video="${VIDEO_P4}"></div>` },
      { id: "idea", title: "The idea", html: `
        <p><b>Sorting</b> puts the elements of a list in order, smallest first. <b>Bubble sort</b> is one of the simplest sorting algorithms:</p>
        <ol><li>Go through the list from left to right, comparing each element with the next one and swapping the two if the first is larger. At the end of this <b>pass</b>, the largest element has “bubbled” to the last position.</li>
        <li>Do another pass, but stop one element earlier: the last element is already in place.</li>
        <li>Keep going, stopping one element earlier each time, until only one element is left.</li></ol>` },
      { id: "code", title: "The code", html: `
        ${callout("note", "NOTE", `<p>The slide calls the function <code>bubble</code> and its list <code>bubbleList</code>, and swaps with a helper variable: <code>buf = bubbleList[i]</code>, then two more assignments. Python can swap two values in one line, <code>a, b = b, a</code>: the right side builds the pair <code>(b, a)</code> first, then assigns it to <code>a, b</code>. Both versions do the same thing.</p>`)}
        ${codeBlock(CODE.bubbleSort)}${out("[0, 1, 2, 3, 4, 5, 8, 17, 100]")}
        <p>To see the passes, print the list after each one:</p>
        ${codeBlock(CODE.bubbleTraced)}
        ${predict("What does the list <code>[3, 4, 1, 2, 5, 8, 0, 100, 17]</code> look like after the first pass? Which element is certain to be in its final place?",
          `${repl(`>>> bubble_sort_traced([3, 4, 1, 2, 5, 8, 0, 100, 17])
compared 8 pairs: [3, 1, 2, 4, 5, 0, 8, 17, 100]
compared 7 pairs: [1, 2, 3, 4, 0, 5, 8, 17, 100]
compared 6 pairs: [1, 2, 3, 0, 4, 5, 8, 17, 100]
compared 5 pairs: [1, 2, 0, 3, 4, 5, 8, 17, 100]
compared 4 pairs: [1, 0, 2, 3, 4, 5, 8, 17, 100]
compared 3 pairs: [0, 1, 2, 3, 4, 5, 8, 17, 100]
compared 2 pairs: [0, 1, 2, 3, 4, 5, 8, 17, 100]
compared 1 pairs: [0, 1, 2, 3, 4, 5, 8, 17, 100]
compared 0 pairs: [0, 1, 2, 3, 4, 5, 8, 17, 100]
[0, 1, 2, 3, 4, 5, 8, 17, 100]`)}<p>After the first pass, 100 is last: the largest element always ends up there, because once a pass reaches it, it wins every comparison and is carried to the end. Small elements move the other way only one place per pass: 0 needed six passes to travel from index 6 to index 0. (The last pass compares 0 pairs: the slide's loop runs while <code>length > 0</code>, one pass more than needed. It does no harm.)</p>`)}
        ${demo("bubble", "Demo 13 · Bubble sort visualiser", "← → keys step", "Amber: the pair being compared (dark amber after a swap). Green: elements already in their final place.")}` },
      { id: "counting", title: "Counting comparisons", html: `
        ${codeBlock(CODE.bubbleCounts)}
        ${repl(`>>> bubble_sort_counts([3, 4, 1, 2, 5, 8, 0, 100, 17])
(36, 11)
>>> bubble_sort_counts([1, 2, 3, 4, 5, 6, 7, 8, 9])
(36, 0)
>>> bubble_sort_counts([9, 8, 7, 6, 5, 4, 3, 2, 1])
(36, 36)`)}
        <p>The number of comparisons does not depend on the order at all: the passes compare (n−1) + (n−2) + … + 1 + 0 pairs, which is</p>
        <div class="math-block">n(n − 1) / 2 = ½n² − ½n,</div>
        <p>36 for n = 9. Only the number of swaps depends on the input; the worst case, a reversed list, swaps on every comparison. Either way bubble sort is O(n²): double the list, four times the work.</p>
        ${callout("pitfall", "PITFALL", `<p><b><code>bubble_sort</code> changes the list you give it.</b> It sorts <em>in place</em>: <code>data</code> and the caller's variable are aliases for the same list object (Lecture 5), so the caller's list is sorted afterwards. Returning it as well is a convenience. If you need the original order, sort a copy: <code>bubble_sort(numbers[:])</code>.</p>`)}
        ${repl(`>>> numbers = [3, 1, 2]
>>> result = bubble_sort(numbers)
>>> numbers
[1, 2, 3]
>>> result is numbers
True`)}` },
    ],
    takeaways: ["A pass carries the largest to the end.", "Always n(n − 1)/2 comparisons.", "O(n²), and it sorts in place."],
  },
  {
    slug: "9-quick", nav: "Quick sort", title: "Quick Sort",
    subtitle: "Partition around a pivot, then sort each side",
    abstract: "Quick sort puts one pivot in its final place and recurses on the two sides. Usually O(n log n) — but O(n²) on a list that is already sorted.",
    tags: ["pivot", "partition", "O(n log n)", "worst case"],
    hero: "quickMini", heroCaption: "Partition with a hole that moves between i and j.",
    sections: [
      { id: "idea", title: "The idea", html: `
        <p><b>Quick sort</b> is a widely used sorting algorithm, usually much faster than bubble sort. It is recursive:</p>
        <ol><li>Pick an element of the list, called the <b>pivot</b>. Here we pick the first one.</li>
        <li><b>Partition</b>: rearrange the list so that every element smaller than the pivot comes before it and every element larger comes after it (equal elements may go either way). The pivot is now in its <b>final position</b>.</li>
        <li>Recursively sort the part before the pivot and, separately, the part after it.</li></ol>
        <p>The base case is a part with 0 or 1 elements, which is already sorted.</p>` },
      { id: "code", title: "The code", html: `
        <p>The slide partitions the list in place with two indices, <code>i</code> from the left and <code>j</code> from the right. It first copies the pivot into <code>pivot</code>, which leaves a “hole” at <code>data[i]</code>. Then it repeats:</p>
        <ul><li>move <code>j</code> left past elements that are ≥ the pivot; the first smaller element it finds is moved into the hole at <code>i</code> (now the hole is at <code>j</code>);</li>
        <li>move <code>i</code> right past elements that are ≤ the pivot; the first larger element it finds is moved into the hole at <code>j</code> (now the hole is at <code>i</code> again);</li></ul>
        <p>until <code>i</code> and <code>j</code> meet. The pivot goes into the hole where they meet.</p>
        ${callout("note", "NOTE", `<p>The slide calls the function <code>quickSort</code>, the list <code>L</code> and the pivot <code>key</code>. PEP 8 discourages single-letter names like <code>L</code>, so these notes use <code>quick_sort</code>, <code>data</code> and <code>pivot</code>.</p>`)}
        ${codeBlock(CODE.quickSort)}
        ${repl(`>>> numbers = [3, 4, 1, 2, 5, 8, 0, 100, 17]
>>> quick_sort(numbers, 0, len(numbers) - 1)
[0, 1, 2, 3, 4, 5, 8, 17, 100]`)}
        ${demo("quick", "Demo 14 · Quick sort visualiser", "← → keys step", "The dashed bar is the hole. Amber: the element being compared with the pivot. Green: elements in their final place. Faded: outside the current call's range. The comparison count matches <code>quick_sort_count</code>: 25 for the slide's list.")}` },
      { id: "partitions", title: "Watching the partitions", html: `
        <p>This version prints each part after it has been partitioned, indented by the depth of the call, with the pivot in square brackets:</p>
        ${codeBlock(CODE.quickTraced)}
        ${predict("The first pivot is 3. Which numbers end up to its left after the first partition? At which index does 3 end up?",
          `${repl(`>>> quick_sort_traced([3, 4, 1, 2, 5, 8, 0, 100, 17], 0, 8)
[0, 2, 1] [3] [5, 8, 4, 100, 17]
    [] [0] [2, 1]
        [1] [2] []
    [4] [5] [8, 100, 17]
        [] [8] [100, 17]
            [17] [100] []
[0, 1, 2, 3, 4, 5, 8, 17, 100]`)}<p>The numbers smaller than 3 — 0, 2 and 1 — end up on its left, so 3 lands at index 3, which is exactly where it belongs in the sorted list. The parts are not sorted yet; the recursive calls do that. Each line of the trace is one call; together they form a recursion tree, just like <code>binary_sum</code> in Lecture 6.</p>`)}` },
      { id: "speed", title: "How fast is quick sort?", html: `
        <p>Each level of the recursion tree partitions parts that together hold at most n elements, and partitioning a part compares each of its elements with the pivot about once. So the work is about n times the <b>number of levels</b>.</p>
        <ul><li><b>Good case.</b> If every pivot lands near the middle, each level halves the parts, so there are about log₂ n levels: O(n log n). On a list in a scrambled order this is what usually happens.</li>
        <li><b>Worst case.</b> If every pivot is the smallest element (a list that is <em>already sorted</em>!), one side of every partition is empty and the other has only one element fewer. Then there are n levels and the comparisons add up to (n−1) + (n−2) + … + 1 = n(n−1)/2: O(n²), as bad as bubble sort.</li></ul>
        <p>Let's count. <code>quick_sort_count</code> is <code>quick_sort</code> with a counter of comparisons with the pivot; <code>mixed(n)</code> returns the numbers 0 to n − 1 in a fixed scrambled order (it uses a tiny random-number formula, so the result is the same every time):</p>
        ${codeBlock(CODE.quickCount)}
        ${repl(`>>> mixed(10)
[7, 0, 2, 5, 4, 3, 6, 1, 8, 9]
>>> sorted(mixed(1000)) == list(range(1000))
True`)}
        ${predict("Bubble sort makes 4,950 comparisons on any list of 100 numbers. Roughly how many does quick sort make on <code>mixed(100)</code>? On an already sorted list of 100 numbers?",
          `${codeBlock(CODE.sortTable)}${out(CODE.sortOut)}<p>On scrambled lists quick sort stays close to n log₂ n (a small constant times it), and each doubling of n only a little more than doubles its work. Bubble sort's work grows four-fold with each doubling. On already sorted lists, quick sort with the first element as pivot makes exactly as many comparisons as bubble sort.</p>`)}
        ${demo("sortRace", "Demo 15 · Bubble sort vs quick sort", "drag n, pick the input", "Counted by JavaScript twins of <code>bubble_sort_counts</code> and <code>quick_sort_count</code>, on the same <code>mixed(n)</code>. At n = 100, 200 and 400 the numbers match the table above.")}
        ${callout("pitfall", "PITFALL", `<p><b>Quick sort on a sorted list can crash.</b> In the worst case the recursion is n calls deep, and Python stops at about 1000 frames (Lecture 6):</p>${repl(`>>> quick_sort(list(range(2000)), 0, 1999)
Traceback (most recent call last):
  ...
RecursionError: maximum recursion depth exceeded...`)}<p>Real implementations avoid this by picking the pivot at random or as the middle element, which makes the bad case extremely unlikely.</p>`)}` },
      { id: "builtin", title: "Sorting in practice", html: `
        <p>In practice you will not write your own sort. Python's built-in <code>sorted(data)</code> (which returns a new sorted list) and <code>data.sort()</code> (which sorts in place) use an algorithm called Timsort that runs in O(n log n) time even in the worst case. Bubble sort and quick sort are here because they show <em>why</em> one sorting algorithm is faster than another, and how to measure it.</p>
        ${repl(`>>> sorted([3, 4, 1, 2, 5, 8, 0, 100, 17])
[0, 1, 2, 3, 4, 5, 8, 17, 100]`)}
        ${table([["sequential search", "O(1)", "O(n)", "<code>linear_search</code>"], ["binary search (sorted data)", "O(1)", "O(log n)", "<code>binary_search</code>"], ["bubble sort", "O(n²)", "O(n²)", "<code>bubble_sort</code>"], ["quick sort", "O(n log n)", "O(n²)", "<code>quick_sort</code>"]], ["algorithm", "best case", "worst case", "in this lecture"])}` },
    ],
    takeaways: ["Partition: the pivot lands in its final place.", "Usually O(n log n).", "Sorted input + first pivot: O(n²)."],
  },
  {
    slug: "10-summary", nav: "Summary", title: "Summary and Practice",
    subtitle: "Check yourself, then analyse some code",
    abstract: "A one-page map of the lecture, five self-check questions, nine exercises with solutions, and a checklist for the big-O answers an AI gives you.",
    tags: ["knowledge map", "self-check", "exercises"],
    hero: "toc",
    sections: [
      { id: "map", title: "Knowledge map", html: `<div class="map">
        <div class="card"><h3>Measuring</h3><ul><li>Timing depends on the machine and inputs</li><li>Count <b>primitive operations</b></li><li>As f(n) of the input size</li><li>In the <b>worst case</b></li></ul></div>
        <div class="card"><h3>Big-O</h3><ul><li>f(n) ≤ c·g(n) for all n ≥ n₀</li><li>Drop constants and lower-order terms</li><li>Describe as closely as possible</li></ul></div>
        <div class="card"><h3>Seven functions</h3><ul><li>1 &lt; log n &lt; n &lt; n log n</li><li>&lt; n² &lt; n³ &lt; 2ⁿ</li><li>Polynomial is tractable; exponential is not</li></ul></div>
        <div class="card"><h3>Analysing code</h3><ul><li>Loops: work per round × rounds</li><li>Recursion: work per call × calls</li><li>Smallest number: O(n)</li><li><code>fast_power</code>: O(log n); <code>fib</code>: exponential</li></ul></div>
        <div class="card"><h3>Searching</h3><ul><li>Sequential: O(n)</li><li>Binary: O(log n), ⌊log₂ n⌋ + 1 looks</li><li>Binary needs sorted data</li></ul></div>
        <div class="card"><h3>Sorting</h3><ul><li>Bubble: n(n−1)/2 comparisons, O(n²)</li><li>Quick: usually O(n log n)</li><li>Quick on sorted input: O(n²)</li><li>In practice: <code>sorted</code>, <code>.sort()</code></li></ul></div></div>` },
      { id: "check", title: "Check your understanding", html: `<div data-demo="quiz"><div class="demo-body"></div></div>
        ${repl(`>>> all(3*n**2 + 1000*n <= 1003 * n**2 for n in range(1, 5000))
True
>>> all(3*n**2 + 1000*n <= 4 * n**2 for n in range(1000, 5000))
True`)}` },
      { id: "exercises", title: "Exercises", html: `
        <p>★ trace or modify · ★★ write · ★★★ extend or combine.</p>
        <h3>Exercise 1 ★ (count)</h3>
        <p>How many times does <code>total += i * j</code> run in this function, as a function of <code>n</code>? What is the function's running time in big-O?</p>
        ${codeBlock(`def grid_sum(n):
    total = 0
    for i in range(n):
        for j in range(n):
            total += i * j
    return total`)}
        <details class="reveal"><summary>Solution</summary><p>n · n = n² times: the inner loop runs n times for each of the n values of <code>i</code>. The running time is O(n²).</p>${codeBlock(`def grid_sum_count(n):
    count = 0
    for i in range(n):
        for j in range(n):
            count += 1
    return count`)}${repl(`>>> [grid_sum_count(n) for n in [1, 10, 100]]
[1, 100, 10000]`)}</details>
        <h3>Exercise 2 ★ (big-O)</h3>
        <p>Simplify each function to its big-O class: (a) 7n³ + 2n + 9; (b) 5 log n + 20; (c) n log n + 3n; (d) 100; (e) 2ⁿ + n¹⁰.</p>
        <details class="reveal"><summary>Solution</summary><p>(a) O(n³); (b) O(log n); (c) O(n log n), since 3n ≤ 3n log n for n ≥ 2; (d) O(1): a constant; (e) O(2ⁿ): every exponential eventually outgrows every polynomial, even n¹⁰ (from n = 59 on, as it happens):</p>${repl(`>>> [n for n in range(2, 100) if 2 ** n <= n ** 10][-1]
58`)}</details>
        <h3>Exercise 3 ★ (trace)</h3>
        <p>Trace <code>bubble_sort</code> on <code>[5, 1, 4, 2]</code>. Write the list after each pass. How many swaps does it make?</p>
        <details class="reveal"><summary>Solution</summary><p>After the first pass <code>[1, 4, 2, 5]</code>, after the second <code>[1, 2, 4, 5]</code>, and the third pass changes nothing. 4 swaps, 6 comparisons.</p>${repl(`>>> bubble_sort_traced([5, 1, 4, 2])
compared 3 pairs: [1, 4, 2, 5]
compared 2 pairs: [1, 2, 4, 5]
compared 1 pairs: [1, 2, 4, 5]
compared 0 pairs: [1, 2, 4, 5]
[1, 2, 4, 5]
>>> bubble_sort_counts([5, 1, 4, 2])
(6, 4)`)}</details>
        <h3>Exercise 4 ★ (trace)</h3>
        <p>Trace the <em>first partition</em> of <code>quick_sort</code> on <code>[5, 1, 4, 2, 8]</code>. Give <code>i</code>, <code>j</code> and the list each time an element is moved into the hole. Where does the pivot end up? (Type the list into Demo 14 to check.)</p>
        <details class="reveal"><summary>Solution</summary><p><code>pivot = 5</code>, <code>i = 0</code>, <code>j = 4</code>. <code>data[4] = 8 >= 5</code>, so <code>j</code> moves to 3, where <code>2 &lt; 5</code>; <code>data[0] = 2</code> gives <code>[2, 1, 4, 2, 8]</code>. Then <code>i</code> moves right past 2, 1, 4 (all ≤ 5) and stops when it meets <code>j</code> at 3; <code>data[3] = data[3]</code> changes nothing. The loop ends with <code>i == j == 3</code>, and <code>data[3] = 5</code>: <code>[2, 1, 4, 5, 8]</code>. The pivot is at index 3.</p>${repl(`>>> quick_sort_traced([5, 1, 4, 2, 8], 0, 4)
[2, 1, 4] [5] [8]
    [1] [2] [4]
[1, 2, 4, 5, 8]`)}</details>
        <h3>Exercise 5 ★★ (early exit)</h3>
        <p>If a pass of bubble sort makes no swaps, the list is already sorted and the remaining passes are wasted. Write <code>bubble_sort_early(data)</code> that stops as soon as a pass makes no swap, and returns the number of comparisons it made. What is its best case now, and on which input?</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`def bubble_sort_early(data):
    comparisons = 0
    length = len(data)
    swapped = True
    while length > 1 and swapped:
        swapped = False
        for i in range(length - 1):
            comparisons += 1
            if data[i] > data[i + 1]:
                data[i], data[i + 1] = data[i + 1], data[i]
                swapped = True
        length -= 1
    return comparisons`)}${repl(`>>> bubble_sort_early(list(range(100)))
99
>>> bubble_sort_early(list(range(100, 0, -1)))
4950`)}<p>On an already sorted list one pass of n − 1 comparisons is enough: the best case is O(n). The worst case (a reversed list) is still O(n²).</p></details>
        <h3>Exercise 6 ★★ (max and min)</h3>
        <p>Write <code>min_and_max(data)</code> that returns the smallest and the largest number of a non-empty list as a pair, in one pass. Count its comparisons as a function of n, and give its big-O.</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`def min_and_max(data):
    smallest = data[0]
    largest = data[0]
    for num in data[1:]:
        if num < smallest:
            smallest = num
        if num > largest:
            largest = num
    return smallest, largest`)}${repl(`>>> min_and_max([9, 39, 21, 98, 4, 5, 100, 65])
(4, 100)`)}<p>Two comparisons for each of the n − 1 elements after the first: 2(n − 1), which is O(n).</p></details>
        <h3>Exercise 7 ★★ (doubling experiment)</h3>
        <p>An O(n²) algorithm should make about four times as many steps when n doubles, an O(n log n) one a little over twice as many. Use <code>bubble_sort_counts</code>, <code>quick_sort_count</code> and <code>mixed</code> to print, for n = 100, 200, 400, 800, the ratio of each count to the count for n/2. Do the ratios match?</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`previous = None
for n in [100, 200, 400, 800]:
    counts = (bubble_sort_counts(mixed(n))[0], quick_sort_count(mixed(n), 0, n - 1))
    if previous:
        print(n, round(counts[0] / previous[0], 2), round(counts[1] / previous[1], 2))
    previous = counts`)}${out("200 4.02 2.65\n400 4.01 2.11\n800 4.01 2.39")}<p>Bubble sort's ratio is 4, as O(n²) predicts. Quick sort's is between 2 and 3: the pivots of one scrambled list land better or worse than another's, but the trend is n log n. This is how you can check a big-O claim with counts instead of seconds.</p></details>
        <h3>Exercise 8 ★★★ (middle pivot)</h3>
        <p>Change <code>quick_sort_count</code> so that it first swaps the middle element of the range, <code>data[(low + high) // 2]</code>, into position <code>low</code>, and then partitions as before. Count its comparisons on <code>list(range(400))</code>. Why is it so much better than the original on sorted input?</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`def quick_sort_middle(data, low, high):
    if low >= high:
        return 0
    mid = (low + high) // 2
    data[low], data[mid] = data[mid], data[low]
    i = low
    j = high
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
    count += quick_sort_middle(data, low, i - 1)
    count += quick_sort_middle(data, j + 1, high)
    return count`)}${repl(`>>> quick_sort_middle(list(range(400)), 0, 399)
2842
>>> quick_sort_count(list(range(400)), 0, 399)
79800
>>> numbers = list(range(2000))
>>> quick_sort_middle(numbers, 0, 1999) > 0, numbers == list(range(2000))
(True, True)`)}<p>On a sorted list the middle element is the median, so every partition splits its part in half: about log₂ n levels and O(n log n) work, and the recursion is only about 11 calls deep for 2000 elements, so there is no <code>RecursionError</code>.</p></details>
        <h3>Exercise 9 ★★★ (count the work of fast_power)</h3>
        <p>Write <code>fast_power_mults(n)</code> that returns the number of multiplications <code>fast_power(x, n)</code> performs (both <code>partial * partial</code> and <code>result * x</code>). Check that it is never more than 2(⌊log₂ n⌋ + 1) for 1 ≤ n ≤ 1000. Compare with <code>power</code>, which performs n multiplications.</p>
        <details class="reveal"><summary>Solution</summary><p>Each call with n ≥ 1 does one multiplication <code>partial * partial</code>, plus one more if n is odd.</p>${codeBlock(`def fast_power_mults(n):
    if n == 0:
        return 0
    return fast_power_mults(n // 2) + 1 + n % 2`)}${repl(`>>> fast_power_mults(13), fast_power_mults(1000)
(7, 16)
>>> all(fast_power_mults(n) <= 2 * (math.floor(math.log2(n)) + 1) for n in range(1, 1001))
True`)}<p>16 multiplications for x<sup>1000</sup> instead of 1000: O(log n) against O(n).</p></details>` },
      { id: "ai", title: "Working with AI", html: `
        <p>Ask an AI assistant “what is the time complexity of this code?” and you will get a confident big-O. Often it is right; sometimes it counts the lines instead of how often they run, or misses a hidden loop. Check its answer with this lecture's tools:</p>
        <ol><li><b>Ask it to show the count, not just the answer.</b> “How many times does each line run, as a function of n?” A correct big-O comes from a correct count.</li>
        <li><b>Look for hidden loops.</b> <code>x in my_list</code>, <code>my_list.index(x)</code>, <code>my_list.count(x)</code>, slicing <code>data[1:]</code> and <code>sorted(data)</code> all take time that grows with the list. A loop that calls one of them is not O(n).</li>
        <li><b>Ask for the worst case.</b> Which input makes the code slowest? For quick sort the assistant should say “already sorted” (for a first-element pivot).</li>
        <li><b>Check with a doubling experiment.</b> Count the operations for n and 2n (as in Exercise 7) and compare the ratio with what the claimed big-O predicts: 2 for O(n), 4 for O(n²), a little more than 2 for O(n log n).</li></ol>
        <p>Try this: ask an assistant for “a Python function that removes duplicates from a list, keeping the order”. Many answers use <code>if x not in result:</code> inside a loop. Ask it for the time complexity, then check whether it noticed that <code>not in</code> on a list is itself a loop (O(n²) in total). Ask how to make it O(n) (hint: a set), and check again.</p>` },
      { id: "terms", title: "Key terms and further reading", html: `
        <p class="tags">${["data structure", "algorithm", "running time", "space usage", "primitive operation", "input size", "best case", "worst case", "average case", "asymptotic analysis", "big-O", "constant", "logarithmic", "linear", "n-log-n", "quadratic", "cubic", "exponential", "tractable", "sorting", "bubble sort", "pass", "quick sort", "pivot", "partition", "in place"].map((t) => `<span class="tag">${t}</span>`).join("")}</p>
        <ul><li>M. T. Goodrich, R. Tamassia, M. H. Goldwasser, <em>Data Structures and Algorithms in Python</em>, Wiley 2013, Chapter 3 (Algorithm Analysis): the seven functions, big-O, and the proof that binary search is O(log n) follow this chapter. Chapter 12 covers quick sort and other sorting algorithms.</li>
        <li>C. Severance, <em>Python for Everybody</em>, Chapter 8 (Lists), for <code>sort</code>, <code>sorted</code> and the list operations whose cost this lecture lets you reason about.</li>
        <li>VisuAlgo, animations of sorting algorithms: <a href="https://visualgo.net/en/sorting" target="_blank" rel="noopener">visualgo.net/en/sorting</a></li></ul>` },
    ],
    takeaways: ["Count operations; keep the growth.", "Halving gives log n; nested loops give n².", "Check big-O claims with doubling."],
  },
];

const QUIZ = [
  { q: "Which is <b>not</b> a reason to count operations instead of timing a program?",
    opts: ["Timing depends on the hardware and software", "Timing only covers the inputs you tried", "Timing needs a finished program", "Counting operations tells you the running time in seconds"],
    a: 3, why: "Counting gives the same answer on every machine and needs only a description of the algorithm. It does <em>not</em> give seconds: that needs the machine's constant." },
  { q: "Is 3n² + 1000n O(n²)?",
    opts: ["No: 1000n is too big", "Yes: c = 1003, n₀ = 1 works", "Only if n &lt; 1000", "Yes, but only with c = 3"],
    a: 1, why: "For n ≥ 1, 1000n ≤ 1000n², so 3n² + 1000n ≤ 1003n²: c = 1003, n₀ = 1. (Or c = 4, n₀ = 1000, since 1000n ≤ n² when n ≥ 1000.) The checks are below the quiz." },
  { q: "Put in order of growth: n², log n, 2ⁿ, n, n log n, 1.",
    opts: ["1 &lt; n &lt; log n &lt; n log n &lt; n² &lt; 2ⁿ", "1 &lt; log n &lt; n &lt; n log n &lt; n² &lt; 2ⁿ", "1 &lt; log n &lt; n log n &lt; n &lt; n² &lt; 2ⁿ", "log n &lt; 1 &lt; n &lt; n² &lt; n log n &lt; 2ⁿ"],
    a: 1, why: "1 &lt; log n &lt; n &lt; n log n &lt; n² &lt; 2ⁿ." },
  { q: "A function loops over all n elements of a list, and inside that loop runs another loop over all n elements. Its running time is:",
    opts: ["O(n)", "O(2n)", "O(n²)", "O(n log n)"],
    a: 2, why: "O(n²): the inner loop runs n times for each of the n rounds of the outer loop." },
  { q: "Why does bubble sort always make the same number of comparisons on lists of the same length, but quick sort does not?",
    opts: ["Bubble sort's loops do not look at the values; quick sort's partitions depend on where each pivot lands", "Quick sort is recursive and recursion is unpredictable", "Bubble sort stops early on sorted lists", "They both always make the same number"],
    a: 0, why: "Bubble sort's passes always compare (n−1) + (n−2) + … pairs. Quick sort's partitions depend on where each pivot lands, which depends on the values." },
];
