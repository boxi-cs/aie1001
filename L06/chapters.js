// Chapter content, adapted from notes/L06-recursion.md. Code is copied from the note.

const demo = (name, title, instr, hint = "") =>
  `<div class="card demo" data-demo="${name}"><div class="head"><span class="title">${title}</span><span>${instr}</span></div>
   <div class="demo-body"></div>${hint ? `<p class="hint">${hint}</p>` : ""}</div>`;

const callout = (kind, label, body) => `<div class="callout ${kind}"><b>${label}</b>${body}</div>`;
const predict = (q, a) => callout("predict", "PREDICT", `<p>${q}</p><details class="reveal"><summary>Show the answer</summary>${a}</details>`);

const VIDEO_P1 = "media/L06-1.mp4";
const VIDEO_P2 = "media/L06-2.mp4";
const VIDEO_P3 = "media/L06-3.mp4";

const LECTURE = {
  number: 6,
  title: "Recursion",
  tagline: "How a function calls itself",
  lead: "From a queue at a concert to the call stack, binary search and recursion trees — interactive notes where every frame can be stepped through and every example can be changed.",
  heroDemo: "factMini",
  heroLabel: "A live call stack · fact(4)",
  heroCaption: "Each call waits for the one above it. The last call made is the first to return.",
  whyTitle: "Why recursion is worth learning",
  whySub: "Three ideas you will use far beyond this lecture",
  why: [
    ["A way to think", "Solve a problem by assuming the smaller copy is already solved — the <b>leap of faith</b>."],
    ["A picture of the machine", "Frames on a <b>call stack</b> explain what every function call does, recursive or not."],
    ["A tool for branching problems", "Trees, folders, games and sorting split into smaller copies of themselves: <b>multiple recursion</b>."],
  ],
  ctaTitle: "Ready to watch a function call itself?",
  minutes: "About 60–75 minutes",
  videos: {
    [VIDEO_P1]: "Lecture 6 · Part 1 — How a function calls itself (7.6 min)",
    [VIDEO_P2]: "Lecture 6 · Part 2 — Recursion on lists, binary search (9 min)",
    [VIDEO_P3]: "Lecture 6 · Part 3 — Powers and multiple recursion (9 min)",
  },
};

const CHAPTERS = [
  {
    slug: "1-idea", nav: "The idea", title: "What Recursion Is",
    subtitle: "A function that calls itself, on a smaller problem",
    abstract: "Your position in a queue is one more than the position of the person in front of you. That sentence is a recursive definition.",
    tags: ["concert line", "base / smaller / combine"],
    hero: "concertMini", heroCaption: "Questions go forward; answers come back.",
    sections: [
      { id: "line", title: "Where am I in the line?", html: `
        <p>You are queuing for a concert. The first 100 people get a free T-shirt, so you want to know your position. You can't see the front of the line, and you can't leave the line without losing your place. What can you do?</p>
        <p><b>An iterative answer.</b> Ask a friend to walk to the front and count people one by one, then come back and tell you. One person does all the work, step by step, keeping a running count.</p>
        <p><b>A recursive answer.</b> Everyone in the line follows the same rule:</p>
        <ul><li>If you are at the front, you know your position: you are number 1.</li>
        <li>Otherwise, ask the person in front of you, “What number are you?” When they answer, add 1 to their answer, and that is your position.</li></ul>
        ${demo("concert", "Demo 1 · The concert line", "step through it", "Each person who asks has to <b>wait</b> for the answer before they can add 1. Keep that picture: it is exactly the call stack in Chapter 2.")}
        <p>Notice three things about the recursive rule. It has a case that needs no further asking (the front of the line). Every question goes to someone <em>closer</em> to the front, so the questions eventually stop. And each person does a small piece of work with the answer they get back (add 1). Every recursive function has these three parts.</p>` },
      { id: "definition", title: "What recursion is", html: `
        <p><b>Recursion</b> is a technique in which a function calls itself while it runs. (A function can also call itself <em>indirectly</em>: <code>f</code> calls <code>g</code>, and <code>g</code> calls <code>f</code>. In this course we only need the direct kind.) A function that does this is a <b>recursive function</b>.</p>
        <p>Recursion fits problems that contain smaller copies of themselves: your position in line is one more than the position of the person in front of you; the sum of a list is the first number plus the sum of the rest.</p>
        ${callout("pattern", "PATTERN · BASE CASE, SMALLER PROBLEM, COMBINE", `<p>Every recursive function has:</p><ol>
          <li><b>One or more base cases</b>: the smallest inputs, answered directly without recursion. <em>“If you're at the front, you're number 1.”</em></li>
          <li><b>A way to make the problem smaller</b> and solve the smaller problem with a recursive call. <em>“Ask the person in front of you.”</em></li>
          <li><b>A way to combine</b> the smaller answer into the answer for the whole problem. <em>“Add 1 to what they tell you.”</em></li></ol>
          <p>Write the base case first. Then check that every recursive call moves <em>towards</em> it.</p>`)}` },
      { id: "video", title: "Watch: how a function calls itself", html: `
        <p>The first video of this lecture covers Chapters 1 and 2: the concert line, factorial, the call stack, the leap of faith and the three common bugs.</p>
        <div class="card video" data-video="${VIDEO_P1}"></div>` },
    ],
    takeaways: ["A recursive function calls itself.", "Base case · smaller problem · combine.", "Every call moves towards the base case."],
  },
  {
    slug: "2-stack", nav: "Call stack", title: "Factorial and the Call Stack",
    subtitle: "What Python does when a function calls itself",
    abstract: "A recursive call does not jump back to the top of the function. It starts a new frame, with its own variables, on top of the call stack.",
    tags: ["frames", "leap of faith", "three bugs"],
    hero: "factMini", heroCaption: "fact(4): frames pushed on the way down, popped on the way up.",
    sections: [
      { id: "factorial", title: "Example: factorial", html: `
        <p>The <b>factorial</b> of a non-negative integer <span class="math">n</span>, written <span class="math">n!</span>, is the product of the integers from 1 to <span class="math">n</span>, and <span class="math">0! = 1</span> by definition:</p>
        <div class="math-block">5! = 5 · 4 · 3 · 2 · 1 = 120</div>
        <p>Look at 5! again: 5! = 5 · (4 · 3 · 2 · 1) = 5 · 4!. The factorial of 5 contains the factorial of 4. In general:</p>
        <div class="math-block">n! = 1 &nbsp;if n = 0, &nbsp;&nbsp;&nbsp; n! = n · (n − 1)! &nbsp;if n ≥ 1</div>
        <p>This <b>recursive definition</b> translates line by line into Python:</p>
        ${codeBlock(CODE.fact)}
        ${predict("What does <code>fact(3)</code> return? How many times is <code>fact</code> called in total, counting the first call?",
          `${codeBlock(">>> fact(3)\n6\n>>> fact(5)\n120\n>>> fact(0)\n1", "repl")}<p><code>fact(3)</code> calls <code>fact(2)</code>, which calls <code>fact(1)</code>, which calls <code>fact(0)</code>: four calls in all. The base case <code>fact(0)</code> returns 1, and on the way back each call multiplies: 1 · 1 = 1, then 2 · 1 = 2, then 3 · 2 = 6.</p>`)}` },
      { id: "frames", title: "Every call gets its own frame", html: `
        <p>Each time a function is called — recursive or not — Python creates a <b>frame</b> (also called an <b>activation record</b>). The frame holds the call's parameters and local variables, and remembers where in the code the call has got to. When the function returns, its frame is thrown away.</p>
        <p>The frames of the calls that are still running form the <b>call stack</b>. A new call pushes a frame on top; a return pops the top frame off. Only the top frame is running; every frame below it is paused, waiting for the call above it to return.</p>
        ${demo("factStack", "Demo 2 · Step through fact(n)", "← → keys step", "The highlighted line belongs to the <b>top</b> frame. Tick “traced version” to run <code>fact_traced</code> and watch it print the calls, indented by depth.")}
        <p>So when <code>fact(3)</code> calls <code>fact(2)</code>, the function does <em>not</em> jump back to its first line with <code>n</code> changed to 2. Python makes a <em>new</em> frame for <code>fact(2)</code> with its own <code>n</code>, equal to 2, while the frame for <code>fact(3)</code> waits with its <code>n</code> still equal to 3.</p>
        ${callout("pitfall", "PITFALL", `<p><b>“Recursion is a loop that goes back to the top.”</b> It is not. A loop reuses one set of variables; a recursive call creates a fresh frame with fresh variables, and the caller's variables are untouched. When the call returns, the caller carries on from the middle of its own line, <code>n * fact(n - 1)</code>, with its own <code>n</code>.</p>`)}` },
      { id: "watching", title: "Watching the frames", html: `
        <p>You can make the call stack visible by printing when each call starts and ends, indented by how deep the call is. The extra parameter <code>depth</code> is only there for the indentation:</p>
        ${codeBlock(CODE.factTraced)}
        ${predict("Before you run <code>fact_traced(3)</code>, write down the eight lines you expect it to print. Which <code>returns</code> line is printed first?",
          `${codeBlock(">>> fact_traced(3)\nfact(3)\n    fact(2)\n        fact(1)\n            fact(0)\n            returns 1\n        returns 1\n    returns 2\nreturns 6\n6", "repl")}<p>The first <code>returns</code> line printed belongs to the <em>last</em> call made, <code>fact(0)</code>. Last in, first out: that is what a stack does. (The final <code>6</code> is not printed by the function; it is the value of the expression, which the Python shell shows.)</p>`)}
        <p>A <b>recursion tree</b> shows the same thing as a picture: one node per call, a line from each call to the calls it makes, and the value each call returns. For <code>fact</code> the tree is a single chain, <code>fact(3)</code> → <code>fact(2)</code> → <code>fact(1)</code> → <code>fact(0)</code>, because each call makes at most one recursive call. In Chapter 6 we meet functions whose trees branch.</p>` },
      { id: "faith", title: "The leap of faith", html: `
        <p>Tracing is the right way to <em>check</em> a recursive function, but it is a poor way to <em>write</em> one. When you write <code>return n * fact(n - 1)</code>, don't follow the call down. Instead, assume that <code>fact(n - 1)</code> already works and returns (n−1)!, and ask one question: <em>if it does, is <code>n * fact(n - 1)</code> the right answer for <code>n</code>?</em> It is, so the function is correct, provided the base case is right and every call gets closer to it.</p>
        <p>This is the <b>recursive leap of faith</b>. It is the same reasoning as proof by induction in mathematics, if you have met it: the base case is the first step, and the leap of faith is the inductive step.</p>` },
      { id: "bugs", title: "When recursion goes wrong", html: `
        <p>Each frame takes memory, so Python limits how deep the call stack may grow. The default limit is about 1000 frames. Exceeding it raises a <code>RecursionError</code>. This almost always means the recursion never reaches a base case:</p>
        ${codeBlock(">>> fact(-1)\nTraceback (most recent call last):\n  ...\nRecursionError: maximum recursion depth exceeded...", "repl")}
        <p><code>fact(-1)</code> calls <code>fact(-2)</code>, which calls <code>fact(-3)</code>, … The numbers move <em>away</em> from the base case <code>n == 0</code>, so it is never reached.</p>
        ${callout("pitfall", "PITFALL · THE THREE COMMON RECURSION BUGS", `<ol>
          <li><b>No base case</b>, or a base case that some inputs never reach (like <code>fact(-1)</code>). Result: <code>RecursionError</code>.</li>
          <li><b>No progress</b>: the recursive call is not on a smaller problem, e.g. <code>return n * fact(n)</code>. Result: <code>RecursionError</code>.</li>
          <li><b>Forgetting <code>return</code></b> on the recursive call. The function then returns <code>None</code>, and the error usually shows up one level up.</li></ol>`)}
        ${demo("bugs", "Demo 3 · Break it on purpose", "pick a bug, then step", "Bugs 1 and 2 grow the stack until Python stops them. Bug 3 is quieter: the error appears in the caller, one frame above the real mistake.")}
        ${codeBlock(">>> fact_broken(0)\n1\n>>> print(fact_broken(1))\nNone\n>>> fact_broken(2)\nTraceback (most recent call last):\n  ...\nTypeError: unsupported operand type(s) for *: 'int' and 'NoneType'", "repl")}` },
    ],
    takeaways: ["Each call gets its own frame.", "Last called, first to return.", "Design with the leap of faith; check by tracing."],
  },
  {
    slug: "3-linear", nav: "Lists", title: "Linear Recursion on Lists",
    subtitle: "Deal with one element, recurse on the rest",
    abstract: "If each call makes at most one recursive call, the calls form a single chain. Most recursive functions on a sequence work this way.",
    tags: ["linear_sum", "first and rest", "find_min"],
    hero: "linearMini", heroCaption: "linear_sum(data, 5): each call adds its element on the way back.",
    sections: [
      { id: "video-2", title: "Watch: recursion on lists, binary search", html: `
        <p>The second video covers Chapters 3 and 4: the sum and the minimum of a list, the first-and-rest pattern, and binary search.</p>
        <div class="card video" data-video="${VIDEO_P2}"></div>` },
      { id: "sum", title: "The sum of a list", html: `
        <p>If each call of a function makes <b>at most one</b> recursive call, the function uses <b>linear recursion</b>. <code>fact</code> is linear: its calls form a single chain. Most recursive functions on a sequence are linear: they deal with one element and recurse on the rest.</p>
        <p>To sum the first <code>n</code> numbers of a list <code>data</code>: the sum of the first 0 numbers is 0; otherwise it is the sum of the first <code>n - 1</code> numbers plus the <code>n</code>-th number, which is <code>data[n - 1]</code>.</p>
        ${callout("note", "NOTE", `<p>The slides call this function <code>linearSum</code>. These notes use Python's standard naming style (PEP 8): lower-case words joined by underscores, so <code>linear_sum</code>.</p>`)}
        ${codeBlock(CODE.linearSum + `


def main():
    data = [1, 2, 3, 4, 5, 9, 100, 46, 7]
    print("The sum is:", linear_sum(data, len(data)))


main()`)}
        ${codeBlock("The sum is: 177", "out")}
        ${predict("For <code>data = [4, 3, 6, 2, 8]</code>, which calls does <code>linear_sum(data, 5)</code> make? Which call returns first, and what does each call return?",
          `<p>The call with <code>n = 0</code> returns first, with 0. Then, going back up, the calls return 0+4 = 4, 4+3 = 7, 7+6 = 13, 13+2 = 15 and finally 15+8 = 23. Each call adds <em>its</em> element on the way back up, after the smaller call has returned.</p>${codeBlock(">>> linear_sum([4, 3, 6, 2, 8], 5)\n23\n>>> linear_sum([4, 3, 6, 2, 8], 2)\n7", "repl")}`)}
        ${demo("linearSum", "Demo 4 · linear_sum step by step", "edit the list, then step", "Greyed cells are outside the current call's first <code>n</code>. The amber cell is the element being added on the way back up.")}` },
      { id: "rest", title: "First and rest", html: `
        <p>The same idea also works with slicing, which reads more naturally but copies the rest of the list at every call:</p>
        ${codeBlock(`def list_sum(data):
    if len(data) == 0:                    # empty list
        return 0
    return data[0] + list_sum(data[1:])   # first element + sum of the rest`)}
        ${codeBlock(">>> list_sum([4, 3, 6, 2, 8])\n23", "repl")}
        ${callout("pattern", "PATTERN · FIRST AND REST", `<p>To process a sequence recursively: handle the empty sequence as the base case; otherwise combine the first element with the result for the rest. Sum, count, maximum, “does it contain x”, reverse, and many more fit this pattern.</p>`)}
        <p>Finding the smallest number in a list fits the same pattern. The base case is a list of one element. Otherwise the answer is the smaller of the first element and the minimum of the rest:</p>
        ${codeBlock(`def find_min(data):
    """Return the smallest number in a non-empty list."""
    if len(data) == 1:
        return data[0]
    rest_min = find_min(data[1:])
    if data[0] < rest_min:
        return data[0]
    return rest_min`)}
        ${codeBlock(">>> find_min([8, 3, 9, 1, 7])\n1", "repl")}` },
    ],
    takeaways: ["At most one recursive call → a chain.", "Base case: empty (or one-element) list.", "Combine first with the result for the rest."],
  },
  {
    slug: "4-search", nav: "Binary search", title: "Binary Search",
    subtitle: "Halve the candidates at every step",
    abstract: "On a sorted list, one comparison with the middle element throws away half of the candidates. A million elements take about 20 steps.",
    tags: ["low / high / mid", "sorted data", "20 vs 1,000,000"],
    hero: "searchMini", heroCaption: "binary_search for 6: four calls on nine numbers.",
    sections: [
      { id: "searching", title: "Searching a list", html: `
        <p>Is a target value in a list? If the list is in no particular order, the only way is to look at every element in turn until you find it or run out of elements. This is <b>sequential search</b>. In the worst case, when the target is not there, it looks at all <span class="math">n</span> elements.</p>
        <p>If the list is <b>sorted</b>, we can do much better. Think of looking up a word in a paper dictionary: you open it near the middle, see whether your word comes before or after that page, and throw away the half that cannot contain it.</p>` },
      { id: "algorithm", title: "The algorithm", html: `
        <p><b>Binary search</b> keeps two indices, <code>low</code> and <code>high</code>. Every element that could still be the target — every <b>candidate</b> — has an index between <code>low</code> and <code>high</code> inclusive. At the start, <code>low = 0</code> and <code>high = n - 1</code>. Then:</p>
        <ol><li>If <code>low > high</code>, there are no candidates left: the target is not in the list.</li>
        <li>Otherwise, look at the middle candidate, <code>mid = (low + high) // 2</code>.<ul>
          <li>If <code>target == data[mid]</code>, we have found it.</li>
          <li>If <code>target &lt; data[mid]</code>, the target can only be to the left of <code>mid</code>: search <code>low</code> to <code>mid - 1</code>.</li>
          <li>If <code>target > data[mid]</code>, it can only be to the right: search <code>mid + 1</code> to <code>high</code>.</li></ul></li></ol>
        <p>Searching one half is the same problem on a smaller range, so the algorithm is naturally recursive:</p>
        ${codeBlock(CODE.binarySearch)}
        ${callout("note", "NOTE", `<p>The slide version prints a message inside the function. Here the function only returns <code>True</code> or <code>False</code>, and the caller decides what to print. A function that returns a value can be reused anywhere — in an <code>if</code>, in a test, in another function — and one that prints cannot.</p>`)}
        ${codeBlock(">>> data = [1, 3, 5, 6, 16, 78, 100, 135, 900]\n>>> binary_search(data, 16, 0, len(data) - 1)\nTrue\n>>> binary_search(data, 6, 0, len(data) - 1)\nTrue\n>>> binary_search(data, 7, 0, len(data) - 1)\nFalse", "repl")}
        <p>Searching for 16 takes one step: 16 is right in the middle. Searching for 6 takes four:</p>
        ${demo("binarySearch", "Demo 5 · Binary search", "set a target, then step", "Grey cells are no longer candidates. Try 16 (one step), 7 (not there) and 900.")}
        ${predict("Trace <code>binary_search(data, 7, 0, 8)</code> for the same <code>data</code>. Write down <code>low</code>, <code>high</code> and <code>mid</code> for every call. Which test ends the search?",
          `<p>The calls are <code>(low, high) = (0, 8), (0, 3), (2, 3), (3, 3), (4, 3)</code>. In the last call <code>low > high</code>, so the function returns <code>False</code>: 7 would sit between 6 and 16, but there is nothing there. Check it with target 7 in Demo 5.</p>`)}` },
      { id: "fast", title: "Why it is fast", html: `
        <p>Each call either finds the target or halves the number of candidates. A list of 1,000,000 elements is down to one candidate after about 20 halvings, because 2<sup>20</sup> ≈ 1,000,000. Sequential search might need 1,000,000 comparisons; binary search needs about 20. In Lecture 9 you will learn to write this as <span class="math">O(log n)</span> versus <span class="math">O(n)</span>.</p>
        ${demo("searchRace", "Demo 6 · Sequential vs binary", "drag the list size")}
        ${callout("pitfall", "PITFALL", `<p><b>Binary search on unsorted data gives wrong answers, silently.</b> On <code>[5, 1, 9, 3, 7]</code>, searching for 1 looks at the middle element 9, decides 1 must be to the left, then looks at 5 and decides 1 must be to the left of 5, where there is nothing. It returns <code>False</code> even though 1 is right next to 5. Binary search is only correct on sorted data. (Pick “unsorted” in Demo 5 to watch it happen.)</p>`)}
        ${codeBlock(">>> unsorted = [5, 1, 9, 3, 7]\n>>> binary_search(unsorted, 1, 0, len(unsorted) - 1)\nFalse", "repl")}` },
    ],
    takeaways: ["Candidates live between low and high.", "Each call halves them: ~20 steps for a million.", "Only correct on sorted data."],
  },
  {
    slug: "5-power", nav: "Powers", title: "Computing Powers",
    subtitle: "The choice of smaller problem matters",
    abstract: "Going from n to n − 1 makes n + 1 calls. Going from n to n // 2 makes about log₂ n. Same answer, very different stack.",
    tags: ["power", "fast_power", "RecursionError"],
    hero: "code:fastPower", heroCaption: "One recursive call on half the exponent.",
    sections: [
      { id: "video-3", title: "Watch: powers and multiple recursion", html: `
        <p>The third video covers Chapters 5 and 6: power and fast power, the English ruler, binary sum, and when to use recursion instead of a loop.</p>
        <div class="card video" data-video="${VIDEO_P3}"></div>` },
      { id: "direct", title: "The direct way", html: `
        <p><span class="math">x<sup>n</sup></span> means <span class="math">x</span> multiplied by itself <span class="math">n</span> times. Recursively: x<sup>0</sup> = 1, and x<sup>n</sup> = x · x<sup>n−1</sup> for n ≥ 1.</p>
        ${codeBlock(CODE.power)}
        ${codeBlock(">>> power(2, 10)\n1024", "repl")}
        <p><code>power(x, n)</code> makes n + 1 calls, all in one chain, so the call stack grows n + 1 frames deep. For large <code>n</code> that is too deep:</p>
        ${codeBlock(">>> power(2, 2000)\nTraceback (most recent call last):\n  ...\nRecursionError: maximum recursion depth exceeded...", "repl")}` },
      { id: "halving", title: "Halving the exponent", html: `
        <p>We can do better by using a different smaller problem. Instead of going from <span class="math">n</span> to <span class="math">n − 1</span>, go from <span class="math">n</span> to <span class="math">n // 2</span>:</p>
        <div class="math-block">x<sup>n</sup> = 1 if n = 0 &nbsp;·&nbsp; (x<sup>n // 2</sup>)² if n is even &nbsp;·&nbsp; x · (x<sup>n // 2</sup>)² if n is odd</div>
        <p>For example, 2<sup>13</sup> = 2 · (2<sup>6</sup>)² and 2<sup>6</sup> = (2<sup>3</sup>)².</p>
        ${codeBlock(CODE.fastPower)}
        ${codeBlock(">>> fast_power(2, 13)\n8192\n>>> fast_power(2, 2000) == 2 ** 2000\nTrue", "repl")}
        ${predict("How many calls does <code>fast_power(2, 13)</code> make? List the values of <code>n</code>.",
          `<p>The values of <code>n</code> are 13, 6, 3, 1, 0: five calls. For n = 2000 the chain is 2000, 1000, 500, 250, 125, 62, 31, 15, 7, 3, 1, 0: twelve calls instead of 2001.</p>`)}
        ${demo("fastPower", "Demo 7 · Step through fast_power(2, n)", "drag n, then step")}` },
      { id: "race", title: "How many calls?", html: `
        ${demo("powerRace", "Demo 8 · power vs fast_power", "drag n", "Past about 1000 frames, <code>power</code> raises <code>RecursionError</code>. <code>fast_power</code> stays a dozen frames deep.")}
        ${callout("pitfall", "PITFALL", `<p>Writing <code>fast_power(x, n // 2) * fast_power(x, n // 2)</code> gives the right answer but throws the speed away: each call now makes <em>two</em> recursive calls on the same problem, and the total work is back to about <span class="math">n</span> multiplications. Compute the smaller answer once, store it in a variable (<code>partial</code>), and reuse it. (That is the third bar in Demo 8.)</p>`)}` },
    ],
    takeaways: ["power: n + 1 calls, n + 1 deep.", "fast_power: halve n, ~log₂ n calls.", "Call once, store in partial, reuse."],
  },
  {
    slug: "6-tree", nav: "Multiple", title: "Multiple Recursion",
    subtitle: "When one call makes two — the recursion tree branches",
    abstract: "The English ruler and binary sum each make two recursive calls per call. Their recursion trees branch, and the work can grow quickly.",
    tags: ["English ruler", "binary_sum", "recursion vs loops"],
    hero: "rulerMini", heroCaption: "draw_interval(3): 15 calls to print 7 ticks.",
    sections: [
      { id: "ruler", title: "Drawing an English ruler", html: `
        <p>If a call can make <b>two or more</b> recursive calls, the function uses <b>multiple recursion</b>. Its recursion tree branches.</p>
        <p>An English (imperial) ruler has a long tick at each whole inch, with the inch number next to it. Between two whole inches is a tick at the half inch, between those are ticks at the quarter inches, and so on, each level one dash shorter. Here is a 2-inch ruler whose longest tick has 4 dashes:</p>
        ${codeBlock("---- 0\n-\n--\n-\n---\n-\n--\n-\n---- 1\n-\n--\n-\n---\n-\n--\n-\n---- 2", "out")}
        <p>Look at the part between two whole inches. Its centre tick has length 3. Above the centre is a smaller copy of the same pattern with centre tick 2, and below it another copy. Each of those has a centre tick of length 2 with a copy of centre length 1 above and below. So:</p>
        ${callout("pattern", "RECURSIVE DEFINITION", `<p>An interval with central tick length L ≥ 1 is: an interval with central tick length L − 1, then a single tick of length L, then another interval with central tick length L − 1. An interval with central tick length 0 is empty.</p>`)}
        ${codeBlock(`def draw_line(tick_length, tick_label=""):
    """Print one tick, with an optional label after it."""
    line = "-" * tick_length
    if tick_label:
        line += " " + tick_label
    print(line)


def draw_interval(center_length):
    """Print the ticks between two inch marks."""
    if center_length > 0:                    # base case: length 0 draws nothing
        draw_interval(center_length - 1)     # upper half
        draw_line(center_length)             # centre tick
        draw_interval(center_length - 1)     # lower half


def draw_ruler(num_inches, major_length):
    """Print a ruler num_inches long with inch ticks of major_length."""
    draw_line(major_length, "0")
    for j in range(1, num_inches + 1):
        draw_interval(major_length - 1)
        draw_line(major_length, str(j))`)}
        ${codeBlock(">>> draw_interval(2)\n-\n--\n-\n>>> draw_ruler(1, 3)\n--- 0\n-\n--\n-\n--- 1", "repl")}
        ${demo("ruler", "Demo 9 · The recursion tree of draw_interval", "step or play", "The amber node is the running call; teal nodes are paused on the stack. A tick is printed between a node's two children — after the upper half, before the lower half.")}
        <p><code>draw_interval</code> makes <em>two</em> recursive calls, so in its recursion tree every call (every <b>node</b> of the tree) has two calls below it: a <b>binary tree</b>. <code>draw_interval(3)</code> calls <code>draw_interval(2)</code> twice, and each of those calls <code>draw_interval(1)</code> twice: one call at the top, 2 below it, then 4, then 8 calls of <code>draw_interval(0)</code> at the bottom. That is 15 calls to print 7 ticks.</p>
        ${predict("How many ticks does <code>draw_interval(4)</code> print? How many calls of <code>draw_interval</code> does it make in total?",
          `<p>15 ticks (2<sup>4</sup> − 1) and 31 calls (2<sup>5</sup> − 1). Each extra unit of length doubles the work. Multiple recursion can grow quickly. Set <code>center_length</code> to 4 in Demo 9 and skip to the end to check.</p>`)}` },
      { id: "binsum", title: "Binary sum", html: `
        <p>The sum of a list can also be computed with multiple recursion: split the list into two halves, sum each half recursively, and add the two results. The function works on the part of the list from index <code>start</code> up to (not including) <code>stop</code>. Passing two indices instead of slicing means no part of the list is ever copied:</p>
        ${codeBlock(CODE.binarySum)}
        ${codeBlock(">>> data = [1, 2, 3, 4, 5, 6, 7]\n>>> binary_sum(data, 0, len(data))\n28", "repl")}
        ${demo("binarySum", "Demo 10 · The recursion tree of binary_sum", "edit the list, then step", "Each node is one call on <code>data[start:stop]</code>; the green number under it is the value it returns.")}
        <p>Compare it with <code>linear_sum</code>. For a list of n numbers, <code>linear_sum</code> makes n + 1 calls and <code>binary_sum</code> makes 2n − 1: about the same amount of work. But the chain of <code>linear_sum</code> is n frames deep, while the tree of <code>binary_sum</code> is only about log₂ n levels deep (log₂ n is the number of times you can halve n before reaching 1). On a list of a million numbers, <code>linear_sum</code> raises <code>RecursionError</code>; <code>binary_sum</code> needs a stack only about 21 frames deep.</p>
        <table><tr><th></th><th>linear recursion</th><th>multiple recursion</th></tr>
        <tr><td>recursive calls per call</td><td>at most one</td><td>two or more</td></tr>
        <tr><td>shape of the calls</td><td>a chain</td><td>a tree</td></tr>
        <tr><td>examples</td><td><code>fact</code>, <code>linear_sum</code>, <code>binary_search</code>, <code>power</code></td><td><code>draw_interval</code>, <code>binary_sum</code></td></tr></table>` },
      { id: "loop", title: "Recursion or a loop?", html: `
        <p>Every linear recursion in this lecture could also be written with a loop. For example:</p>
        ${codeBlock(`def fact_loop(n):
    result = 1
    for k in range(2, n + 1):
        result = result * k
    return result`)}
        ${codeBlock(">>> fact_loop(5) == fact(5)\nTrue", "repl")}
        <p>In Python, the loop is usually the better choice for a simple chain like this: it uses no extra frames, so it has no depth limit. (Some languages optimise certain recursive calls into loops automatically; Python deliberately does not.)</p>
        <p>Recursion is the better choice when the problem <em>branches</em>: when a problem splits into several smaller problems of the same kind, as with the ruler. Writing <code>draw_interval</code> with loops is possible but much harder to get right. You will meet many branching problems later: searching folders inside folders, walking a tree (Lecture 10), sorting by splitting a list in halves (Lecture 9), and exploring the moves of a game.</p>` },
    ],
    takeaways: ["Two or more calls per call → a tree.", "draw_interval(L): 2^(L+1) − 1 calls.", "Chains: prefer a loop. Branches: recursion."],
  },
  {
    slug: "7-summary", nav: "Summary", title: "Summary and Practice",
    subtitle: "Check yourself, then write some recursion",
    abstract: "A one-page map of the lecture, five self-check questions, nine exercises with solutions, and a checklist for recursive code an AI writes for you.",
    tags: ["knowledge map", "self-check", "exercises"],
    hero: "toc",
    sections: [
      { id: "map", title: "Knowledge map", html: `<div class="map">
        <div class="card"><h3>The three parts</h3><ul><li><b>Base case</b>: answered directly</li><li><b>Smaller problem</b>: the recursive call</li><li><b>Combine</b>: build the answer</li><li>Every call moves towards a base case</li></ul></div>
        <div class="card"><h3>What Python does</h3><ul><li>Every call gets its own <b>frame</b></li><li>Unfinished calls form the <b>call stack</b></li><li>Last called, first to return</li><li>~1000 frames → <code>RecursionError</code></li></ul></div>
        <div class="card"><h3>How to think</h3><ul><li>Design with the <b>leap of faith</b></li><li>Check by tracing small cases</li><li>Three bugs: no base case, no progress, no <code>return</code></li></ul></div>
        <div class="card"><h3>Linear recursion</h3><ul><li>At most one call per call: a chain</li><li><code>fact</code>, <code>linear_sum</code>, <code>find_min</code></li><li><code>binary_search</code>, <code>power</code>, <code>fast_power</code></li></ul></div>
        <div class="card"><h3>Multiple recursion</h3><ul><li>Two or more calls: a tree</li><li><code>draw_interval</code>, <code>binary_sum</code></li><li>Work can double with each level</li></ul></div>
        <div class="card"><h3>Speed</h3><ul><li>Binary search: ~20 steps for a million (sorted only)</li><li>Halving <code>n</code> beats subtracting 1</li><li>Chain → loop; branches → recursion</li></ul></div></div>` },
      { id: "check", title: "Check your understanding", html: `<div data-demo="quiz"><div class="demo-body"></div></div>` },
      { id: "exercises", title: "Exercises", html: `
        <p>★ trace or modify · ★★ write · ★★★ extend or combine. Test every function you write on the smallest inputs first (0, an empty list, an empty string), then on a normal one.</p>
        <h3>Exercise 1 ★ (trace)</h3>
        <p>Draw the call stack of <code>power(3, 2)</code> at the moment the base case is reached: one box per frame, newest on top, with the values of <code>x</code> and <code>n</code> in each. Then write down the value each call returns.</p>
        <details class="reveal"><summary>Solution</summary><p>Three frames: <code>power(x=3, n=2)</code> at the bottom, <code>power(x=3, n=1)</code> above it, <code>power(x=3, n=0)</code> on top. The calls return 1, then 3 · 1 = 3, then 3 · 3 = 9.</p></details>
        <h3>Exercise 2 ★ (find the bug)</h3>
        <p>This function should return the sum of the digits of a non-negative integer, so <code>sum_digits(472)</code> should be 13. It works for 15, but raises a <code>RecursionError</code> for 472, 20 and 0. Explain why, and fix it.</p>
        ${codeBlock(`def sum_digits_buggy(n):
    if n == 1:
        return 1
    return n % 10 + sum_digits_buggy(n // 10)`)}
        <details class="reveal"><summary>Solution</summary><p>The base case is wrong. Each call drops the last digit, so the calls end at the first digit of the number. If that digit is 1 (as in 15 → 1), the base case catches it. Any other digit goes on to 0, and <code>0 // 10</code> is 0 again (472 → 47 → 4 → 0 → 0 → …), so the calls never stop. The correct base case is <code>n &lt; 10</code>, where the number is a single digit and is its own digit sum. (<code>if n == 0: return 0</code> also works: it takes one extra call per number.)</p>
        ${codeBlock(`def sum_digits(n):
    if n < 10:
        return n
    return n % 10 + sum_digits(n // 10)`)}${codeBlock(">>> sum_digits(472)\n13\n>>> sum_digits(0)\n0", "repl")}</details>
        <h3>Exercise 3 ★ (modify)</h3>
        <p>Change <code>linear_sum</code> into <code>linear_count(data, n, target)</code>, which returns how many of the first <code>n</code> elements of <code>data</code> are equal to <code>target</code>.</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`def linear_count(data, n, target):
    if n == 0:
        return 0
    count = linear_count(data, n - 1, target)
    if data[n - 1] == target:
        count = count + 1
    return count`)}${codeBlock(">>> linear_count([3, 1, 3, 3, 2], 5, 3)\n3\n>>> linear_count([3, 1, 3, 3, 2], 2, 3)\n1", "repl")}</details>
        <h3>Exercise 4 ★★</h3>
        <p>Write a recursive function <code>reverse_string(s)</code> that returns the string <code>s</code> reversed. You may use indexing and simple slices such as <code>s[1:]</code>, but not a slice with a step (<code>s[::-1]</code>), and no loops.</p>
        <details class="reveal"><summary>Solution</summary><p>First-and-rest: the reverse of <code>s</code> is the reverse of the rest, followed by the first character.</p>${codeBlock(`def reverse_string(s):
    if s == "":
        return ""
    return reverse_string(s[1:]) + s[0]`)}${codeBlock(">>> reverse_string(\"recursion\")\n'noisrucer'\n>>> reverse_string(\"\")\n''", "repl")}</details>
        <h3>Exercise 5 ★★</h3>
        <p>A <b>palindrome</b> reads the same forwards and backwards, like <code>"level"</code> or <code>"noon"</code>. Write a recursive function <code>is_palindrome(s)</code>. Hint: what must be true about the first and last characters, and about the part between them?</p>
        <details class="reveal"><summary>Solution</summary><p>A string of length 0 or 1 is a palindrome. A longer string is a palindrome if its first and last characters are equal <em>and</em> the middle part is a palindrome.</p>${codeBlock(`def is_palindrome(s):
    if len(s) <= 1:
        return True
    if s[0] != s[-1]:
        return False
    return is_palindrome(s[1:-1])`)}${codeBlock(">>> is_palindrome(\"level\"), is_palindrome(\"noon\"), is_palindrome(\"recursion\")\n(True, True, False)", "repl")}</details>
        <h3>Exercise 6 ★★</h3>
        <p>Write a recursive function <code>list_max(data)</code> that returns the largest number in a non-empty list, using <code>binary_sum</code> as a model: split the list into two halves, find the maximum of each half, and combine. Use start and stop indices instead of slicing. Hint: write a helper <code>range_max(data, start, stop)</code> that does the recursion, and make <code>list_max(data)</code> simply return <code>range_max(data, 0, len(data))</code>. A small function that starts a recursion with the right first arguments is called a <b>wrapper</b>.</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`def range_max(data, start, stop):
    """Return the largest number in data[start:stop] (at least one element)."""
    if start == stop - 1:
        return data[start]
    mid = (start + stop) // 2
    left = range_max(data, start, mid)
    right = range_max(data, mid, stop)
    if left > right:
        return left
    return right


def list_max(data):
    return range_max(data, 0, len(data))`)}${codeBlock(">>> list_max([8, 3, 9, 1, 7])\n9\n>>> list_max([-5])\n-5", "repl")}
        <p>A default value such as <code>stop=len(data)</code> would not work: defaults are evaluated once, when the <code>def</code> runs, before any <code>data</code> exists. The wrapper avoids that.</p></details>
        <h3>Exercise 7 ★★★</h3>
        <p>Change <code>binary_search</code> so that it returns the <em>index</em> of the target in the list, or <code>-1</code> if the target is not there.</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`def binary_search_index(data, target, low, high):
    if low > high:
        return -1
    mid = (low + high) // 2
    if target == data[mid]:
        return mid
    elif target < data[mid]:
        return binary_search_index(data, target, low, mid - 1)
    else:
        return binary_search_index(data, target, mid + 1, high)`)}${codeBlock(">>> data = [1, 3, 5, 6, 16, 78, 100, 135, 900]\n>>> binary_search_index(data, 100, 0, len(data) - 1)\n6\n>>> binary_search_index(data, 7, 0, len(data) - 1)\n-1", "repl")}</details>
        <h3>Exercise 8 ★★★ (Towers of Hanoi)</h3>
        <p>There are three pegs, A, B and C. Peg A holds <code>n</code> discs of different sizes, the largest at the bottom. Move all discs to peg C. You may move one disc at a time, from the top of one peg to the top of another, and you may never put a larger disc on a smaller one. Write <code>hanoi(n, source, target, spare)</code> that prints the moves, like <code>move disc 1 from A to C</code>, and returns the number of moves. How many moves does it take for <code>n = 10</code>? Hint: to move <code>n</code> discs from A to C, first move the top <code>n - 1</code> discs out of the way to B.</p>
        <details class="reveal"><summary>Solution</summary><p>To move <code>n</code> discs from <code>source</code> to <code>target</code>: move the top <code>n - 1</code> to <code>spare</code>, move the largest disc to <code>target</code>, then move the <code>n - 1</code> discs from <code>spare</code> onto it. This is multiple recursion, just like the ruler.</p>${codeBlock(`def hanoi(n, source, target, spare):
    if n == 0:
        return 0
    moves = hanoi(n - 1, source, spare, target)
    print(f"move disc {n} from {source} to {target}")
    moves += 1
    moves += hanoi(n - 1, spare, target, source)
    return moves`)}${codeBlock(">>> hanoi(2, \"A\", \"C\", \"B\")\nmove disc 1 from A to B\nmove disc 2 from A to C\nmove disc 1 from B to C\n3", "repl")}<p>The number of moves for <code>n</code> discs is 2<sup>n</sup> − 1, so 1023 moves for <code>n = 10</code>.</p></details>
        <h3>Exercise 9 ★★★ (count the calls)</h3>
        <p>The Fibonacci numbers are 0, 1, 1, 2, 3, 5, 8, …: each is the sum of the two before it. Write the recursive <code>fib(n)</code> straight from that definition, with <code>fib(0) = 0</code> and <code>fib(1) = 1</code>. Then write <code>fib_calls(n)</code> that returns how many calls <code>fib(n)</code> makes in total. What is <code>fib_calls(30)</code>? Why is this so much more than <code>linear_sum</code> would make for a list of 30 numbers?</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)


def fib_calls(n):
    if n <= 1:
        return 1
    return 1 + fib_calls(n - 1) + fib_calls(n - 2)`)}${codeBlock(">>> [fib(n) for n in range(10)]\n[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]\n>>> fib_calls(30)\n2692537", "repl")}
        <p><code>fib</code> is multiple recursion, and its two calls overlap: <code>fib(30)</code> computes <code>fib(28)</code> inside <code>fib(29)</code> and then again on its own, and so on at every level. The number of calls grows roughly like 1.6<sup>n</sup>, while <code>linear_sum</code> makes n + 1 calls. Lecture 9 makes this precise; the fix is to remember answers already computed, or use a loop.</p></details>` },
      { id: "ai", title: "Working with AI", html: `
        <p>An AI assistant will happily write recursive functions for you. Your job is to know whether the one it gives you is right. Use this lecture's checklist on any recursive code, yours or an AI's:</p>
        <ol><li><b>Find the base case.</b> Is there one for every way the input can end (empty list, 0, a single element)? Ask: <em>“What happens for an empty list?”</em></li>
        <li><b>Check progress.</b> Does every recursive call get strictly closer to a base case? Watch out for negative numbers and off-by-one indices.</li>
        <li><b>Check the combine step with the leap of faith.</b> Assume the recursive call returns the right answer; is the combined result then right?</li>
        <li><b>Run the smallest cases</b>, then one normal case, then a large one to see whether it hits the recursion limit.</li></ol>
        <p>Try this: ask an assistant for “a recursive function that returns the largest number in a list”. Then apply the checklist. Does its answer work for a list of one element? For an empty list? Does it slice (<code>data[1:]</code>) at every call, and would a list of 5,000 numbers hit the recursion limit? Ask it to fix what you find, and check again.</p>` },
      { id: "terms", title: "Key terms and further reading", html: `
        <p class="tags">${["recursion", "recursive function", "base case", "recursive definition", "frame (activation record)", "call stack", "recursion tree", "leap of faith", "RecursionError", "linear recursion", "multiple recursion", "sequential search", "binary search", "candidate"].map((t) => `<span class="tag">${t}</span>`).join("")}</p>
        <ul><li>J. DeNero, <em>Composing Programs</em>, §1.7 Recursive Functions. <a href="https://www.composingprograms.com/pages/17-recursive-functions.html" target="_blank" rel="noopener">composingprograms.com</a></li>
        <li>M. T. Goodrich, R. Tamassia, M. H. Goldwasser, <em>Data Structures and Algorithms in Python</em>, Wiley 2013, Chapter 4 (Recursion). The ruler, binary search and binary sum examples follow this chapter.</li>
        <li>Python Tutor, to watch frames being created and destroyed: <a href="https://pythontutor.com" target="_blank" rel="noopener">pythontutor.com</a></li></ul>` },
    ],
    takeaways: ["Base case, smaller problem, combine.", "Frames on a stack; leap of faith.", "Chains vs trees; halving is fast."],
  },
];

const QUIZ = [
  { q: "In <code>linear_sum(data, n)</code>, what is the <b>combine</b> step?",
    opts: ["<code>if n == 0: return 0</code>", "the call <code>linear_sum(data, n - 1)</code>", "adding <code>data[n - 1]</code> to the result of the smaller call", "<code>len(data)</code> in <code>main</code>"],
    a: 2, why: "Base case: <code>n == 0</code> returns 0. Smaller problem: <code>linear_sum(data, n - 1)</code>, the sum of the first <code>n - 1</code> numbers. Combine: add <code>data[n - 1]</code>." },
  { q: "What does <code>mystery(4)</code> print? (A <code>return</code> with no value just ends the call.)",
    code: `def mystery(n):
    if n == 0:
        return
    print(n)
    mystery(n - 1)
    print(n)`,
    opts: ["4 3 2 1", "4 3 2 1 1 2 3 4", "4 3 2 1 0 0 1 2 3 4", "1 2 3 4 4 3 2 1"],
    a: 1, why: "<code>4 3 2 1 1 2 3 4</code>, one number per line. The first <code>print</code> runs on the way down, the second on the way back up, so the second half comes out reversed." },
  { q: "Why does <code>binary_search</code> need the list to be sorted, while <code>linear_sum</code> does not?",
    opts: ["Because <code>binary_search</code> uses <code>//</code>", "Because it throws away half the list after one comparison, which is only safe if everything left of <code>mid</code> is ≤ <code>data[mid]</code> and everything right is ≥", "Because unsorted lists raise <code>RecursionError</code>", "It doesn't; it is just slower on unsorted data"],
    a: 1, why: "<code>binary_search</code> throws away half of the list after one comparison. That is only safe on sorted data. On unsorted data it gives wrong answers <em>silently</em>. <code>linear_sum</code> looks at every element anyway." },
  { q: "Is <code>fast_power</code> linear or multiple recursion?",
    opts: ["Linear: each call makes at most one recursive call", "Multiple: it uses <code>partial</code> twice", "Multiple: it has two base cases", "Neither: it is a loop"],
    a: 0, why: "Both <code>find_min</code> and <code>fast_power</code> are linear: each call makes at most one recursive call. <code>fast_power</code> uses the result twice, but calls only once." },
  { q: "A function <code>f(n)</code> calls <code>f(n - 1)</code> twice and has base case <code>f(0)</code>. How many calls does <code>f(3)</code> make in total?",
    opts: ["4", "7", "8", "15"],
    a: 3, why: "1 + 2 + 4 + 8 = 15. Same shape as <code>draw_interval(3)</code>." },
];
