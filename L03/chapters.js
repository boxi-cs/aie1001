// Chapter content, adapted from notes/L03-flow-control.md. Code is copied from the note.

const demo = (name, title, instr, hint = "") =>
  `<div class="card demo" data-demo="${name}"><div class="head"><span class="title">${title}</span><span>${instr}</span></div>
   <div class="demo-body"></div>${hint ? `<p class="hint">${hint}</p>` : ""}</div>`;

const callout = (kind, label, body) => `<div class="callout ${kind}"><b>${label}</b>${body}</div>`;
const predict = (q, a) => callout("predict", "PREDICT", `<p>${q}</p><details class="reveal"><summary>Show the answer</summary>${a}</details>`);
const out = (text) => codeBlock(text, "out");
const repl = (text) => codeBlock(text, "repl");
const tbl = (head, rows) => `<div style="overflow-x:auto"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;

CODE.logicRepl = `>>> not True
False
>>> False and True
False
>>> True or False
True`;

const VIDEO_P1 = "media/L03-1.mp4";
const VIDEO_P2 = "media/L03-2.mp4";
const VIDEO_P3 = "media/L03-3.mp4";
const VIDEO_P4 = "media/L03-4.mp4";

const LECTURE = {
  number: 3,
  title: "Flow Control",
  tagline: "Programs that choose, recover and repeat",
  lead: "Comparisons and Booleans, <code>if</code>/<code>elif</code>/<code>else</code>, <code>try</code>/<code>except</code>, <code>while</code> and <code>for</code> — interactive notes where you pick the input and watch which line runs next.",
  heroDemo: "patternMini",
  heroLabel: "A live loop · largest so far",
  heroCaption: "One item per iteration. The variable keeps the best value seen so far.",
  whyTitle: "Why flow control matters",
  whySub: "Three ideas behind every program you will write",
  why: [
    ["Decisions", "<code>if</code>, <code>elif</code> and <code>else</code> pick which lines run. Only the <b>first</b> true branch of a chain runs."],
    ["Safety nets", "<code>try</code>/<code>except</code> lets a program survive bad input instead of stopping at the first error."],
    ["Loops and patterns", "<code>while</code> and <code>for</code> repeat; the <b>loop patterns</b> (count, sum, filter, search, largest so far) solve most data problems."],
  ],
  ctaTitle: "Ready to choose a branch?",
  minutes: "About 75–90 minutes",
  videos: {
    [VIDEO_P1]: "Lecture 3 · Part 1 — Making decisions with if, elif and else (10.1 min)",
    [VIDEO_P2]: "Lecture 3 · Part 2 — Logical operators and try-except (9 min)",
    [VIDEO_P3]: "Lecture 3 · Part 3 — Repeating with while and for (7.4 min)",
    [VIDEO_P4]: "Lecture 3 · Part 4 — Loop patterns and comparing values (8.3 min)",
  },
};

const CHAPTERS = [
  {
    slug: "1-booleans", nav: "Booleans", title: "Comparisons and Booleans",
    subtitle: "Questions with a yes/no answer",
    abstract: "Every decision a program makes starts with a Boolean expression: a question whose answer is True or False.",
    tags: ["== vs =", "six comparisons", "truthy / falsy"],
    hero: "code:first", heroCaption: "The smallest program that makes a decision",
    sections: [
      { id: "video1", title: "Watch: making decisions with if, elif and else", html: `
        <p>The first video of this lecture covers Chapters 1 and 2: comparisons, <code>=</code> versus <code>==</code>, truthy and falsy values, <code>if</code> and indentation, nested decisions, <code>else</code> and <code>elif</code>.</p>
        <div class="card video" data-video="${VIDEO_P1}"></div>` },
      { id: "choose", title: "Programs that choose and repeat", html: `
        <p>The programs of Lectures 1 and 2 ran every line once, from top to bottom. Real programs need two more things:</p>
        <ul><li><b>Conditional flow</b>: run some lines only when a condition holds. “If the password is wrong, show an error.”</li>
        <li><b>Repeated flow</b>: run some lines again and again. “For every student, add their score to the total.”</li></ul>
        <p>Here is the smallest example of each. The first program runs <code>print("smaller")</code> only if <code>x &lt; 10</code> is true, and <code>print("bigger")</code> only if <code>x &gt; 20</code> is true:</p>
        ${codeBlock(CODE.first)}${out("smaller\nfinished")}
        <p>The second runs its two indented lines five times, with <code>n</code> going 5, 4, 3, 2, 1:</p>
        ${codeBlock(CODE.countdown(5))}${out("5\n4\n3\n2\n1\nFinish")}
        <p>The rules that decide which line runs next are called <b>flow control</b>. This lecture is about the three tools Python has for it: decisions (<code>if</code>), error handling (<code>try</code>) and loops (<code>while</code>, <code>for</code>).</p>
        ${callout("note", "NOTE", "<p>The slides write <code>x=5</code> and <code>x&lt;10</code>. These notes follow PEP 8, Python's style guide, and put a space on each side of <code>=</code> and of a comparison: <code>x = 5</code>, <code>x &lt; 10</code>. Python accepts both; the spaces make code easier to read.</p>")}` },
      { id: "comparisons", title: "Comparison operators", html: `
        <p>A <b>Boolean expression</b> asks a yes/no question. Its value is <code>True</code> or <code>False</code>. The simplest Boolean expressions use the <b>comparison operators</b>:</p>
        ${tbl(["Python", "Meaning"], [["<code>x &lt; y</code>", "Is <code>x</code> less than <code>y</code>?"], ["<code>x &lt;= y</code>", "Is <code>x</code> less than or equal to <code>y</code>?"], ["<code>x == y</code>", "Is <code>x</code> equal to <code>y</code>?"], ["<code>x &gt;= y</code>", "Is <code>x</code> greater than or equal to <code>y</code>?"], ["<code>x &gt; y</code>", "Is <code>x</code> greater than <code>y</code>?"], ["<code>x != y</code>", "Is <code>x</code> not equal to <code>y</code>?"]])}
        <p>A comparison <em>looks</em> at its operands; it never changes them.</p>
        ${callout("pitfall", "PITFALL · = IS NOT ==", "<p>One equals sign is <b>assignment</b>: <code>x = 5</code> makes the name <code>x</code> refer to 5. Two equals signs ask a question: <code>x == 5</code> is <code>True</code> or <code>False</code> and changes nothing. Writing <code>if x = 5:</code> is a <code>SyntaxError</code>, which is lucky: Python stops you before the program runs.</p>")}
        ${repl(">>> x = 5\n>>> x == 5\nTrue\n>>> x == 6\nFalse\n>>> x\n5")}
        <p>The next program asks six questions about the same <code>x</code>. Each <code>if</code> is tested on its own, so every message whose condition is true is printed.</p>
        ${predict("With <code>x = 5</code>, which of the six messages are printed? Which one is not?",
          `${out("Equals 5\nGreater than 4\nGreater than or equal to 5\nLess than or equal to 5\nNot equal to 6")}<p>Only <code>Less than 5</code> is missing: <code>5 &lt; 5</code> is <code>False</code>.</p>`)}
        ${demo("sixIfs", "Demo 1 · Six separate questions", "change x, then step", "Try <code>x = 4</code> and <code>x = 6</code>. The green line numbers mark lines that have already run.")}
        <p>Comparisons work on numbers of different types, and on strings. An arithmetic operator is applied before a comparison, so <code>x &gt; y + 50</code> means <code>x &gt; (y + 50)</code>:</p>
        ${repl('>>> 5 > 7\nFalse\n>>> x, y = 45, -3.0\n>>> x > y\nTrue\n>>> result = x > y + 50\n>>> result\nFalse\n>>> "hello" > "Bye"\nTrue\n>>> "AAB" > "AAC"\nFalse')}
        <p>The last two compare strings letter by letter. Chapter 8 explains why <code>"hello"</code> comes after <code>"Bye"</code>.</p>` },
      { id: "bool", title: "The Boolean type", html: `
        <p><code>True</code> and <code>False</code> are the two values of Python's <b>Boolean type</b>, <code>bool</code>, named after George Boole (1815–1864), who invented the algebra of logic. They are values like <code>5</code> or <code>"hi"</code>: you can store them in variables and print them.</p>
        ${repl(">>> type(True)\n<class 'bool'>\n>>> passed = 75 >= 60\n>>> passed\nTrue")}
        <p>Python lets you use <em>any</em> value where it needs a yes/no answer. The function <code>bool()</code> shows how a value is read. Zero of every number type, and every <em>empty</em> collection, count as false; everything else counts as true:</p>
        ${repl('>>> bool(0), bool(0.0), bool(0j)\n(False, False, False)\n>>> bool(-1), bool(1e-10), bool(1j)\n(True, True, True)\n>>> bool([]), bool([0]), bool("0")\n(False, True, True)\n>>> bool("")\nFalse')}
        <p>Values that count as true are called <b>truthy</b>, those that count as false <b>falsy</b>. Note <code>bool([0])</code>: a list that <em>contains</em> a zero is not empty, so it is truthy. And <code>"0"</code> is a string with one character in it, so it is truthy too.</p>
        ${demo("truthy", "Demo 2 · Truthy or falsy?", "guess first, then click", "Every value on this panel comes from the note's <code>bool()</code> examples.")}
        ${predict('What are <code>bool(0.0001)</code>, <code>bool(" ")</code> (a string holding one space) and <code>bool(None)</code>?',
          `${repl('>>> bool(0.0001), bool(" "), bool(None)\n(True, True, False)')}<p><code>None</code> is Python's value for “nothing here”; we meet it again in Chapter 7.</p>`)}` },
    ],
    takeaways: ["A Boolean expression is True or False.", "<code>=</code> assigns; <code>==</code> asks.", "Zero, empty and None are falsy."],
  },
  {
    slug: "2-if", nav: "if / elif", title: "Decisions: if, elif, else",
    subtitle: "One way, two ways, many ways",
    abstract: "An if statement runs a block only when its condition is true. else adds a second path, and an elif chain runs only the first branch whose condition is true.",
    tags: ["indentation", "nested if", "only the first true branch"],
    hero: "branchMini", heroCaption: "An if/elif chain with x = 56: the tests run in order until one is true.",
    sections: [
      { id: "if", title: "The if statement", html: `
        <p>An <code>if</code> statement has a condition, a colon, and an indented <b>block</b>. Python evaluates the condition. If it is true, the block runs; if not, the block is skipped. Either way, the program then carries on with the first line after the block.</p>
        ${codeBlock(CODE.oneWay)}${out("Before 5\nIs 5\nIs still 5\nThird 5\nAfterwards 5\nBefore 6\nAfterwards 6")}
        <p>The second block is skipped as a whole: all three lines, not just the first.</p>` },
      { id: "indent", title: "Indentation", html: `
        <p>Python uses indentation, not brackets, to show which lines belong to a block:</p>
        <ul><li><b>Increase</b> the indent after a line that ends with a colon (<code>if</code>, <code>else</code>, <code>elif</code>, <code>while</code>, <code>for</code>, <code>try</code>, <code>except</code>). That starts a block.</li>
        <li><b>Keep</b> the same indent for every line of the block.</li>
        <li><b>Decrease</b> the indent to end the block and go back to the level of the <code>if</code>.</li></ul>
        <p>Blank lines, and comments on a line of their own, are ignored when Python works out the blocks. Use four spaces per level (PEP 8), and let your editor insert them when you press Tab. Mixing tabs and spaces in one file causes errors that are hard to see.</p>
        ${callout("pitfall", "PITFALL · INDENTATION IS NOT DECORATION", `<p>These two programs differ only in the indentation of the last line. In the first, <code>print("Done")</code> is part of the block and runs only when <code>x &gt; 10</code>. In the second, it is after the block and always runs.</p>
          ${codeBlock('x = 3\nif x > 10:\n    print("Big")\n    print("Done")')}${codeBlock('x = 3\nif x > 10:\n    print("Big")\nprint("Done")')}${out("Done")}
          <p>The first program prints nothing at all; the second prints <code>Done</code>.</p>`)}` },
      { id: "nested", title: "Nested decisions", html: `
        <p>A block can contain another <code>if</code>. This is a <b>nested decision</b>. The inner <code>if</code> is only reached if the outer condition is true:</p>
        ${codeBlock(CODE.nested42)}${out("More than 1\nLess than 100\nFinished")}
        <p>Read the indentation as invisible “begin” and “end” marks: each block begins after the colon and ends at the first line that is indented less.</p>
        ${predict(`What does the program print with <code>x = 10</code>?${codeBlock(CODE.nested(10))}`,
          `${out("Greater than 5\nGreater than 8\nFinished")}<p><code>10 &gt; 10</code> is false, so <code>Greater than 10</code> is not printed. Pick “nested if” in Demo 3 below to step through it.</p>`)}
        <p>Nesting is useful, but a program with five or six levels of nesting is very hard to read and check. When you find yourself nesting deeply, look for a way to use <code>elif</code> or logical operators (Chapter 3) instead.</p>` },
      { id: "else", title: "else: a fork in the road", html: `
        <p>Often we want one thing when the condition is true and <em>another</em> thing when it is false. <code>else</code> gives the second path. Exactly one of the two blocks runs, never both and never neither:</p>
        ${codeBlock(CODE.twoWay(1))}${out("Smaller\nFinished")}
        <p><code>else</code> has no condition. It must come straight after the <code>if</code> block, at the same indentation as its <code>if</code>. An <code>else</code> indented differently from its <code>if</code> is a <code>SyntaxError</code> or <code>IndentationError</code>.</p>
        ${demo("branch", "Demo 3 · The branch tracer", "pick a program and an x, then step", "Only the lines of the branch that runs light up. Switch the program to “nested if” or “if / elif chain” and try a few values of x.")}
        <p>A two-way decision can be nested inside another decision:</p>
        ${codeBlock(CODE.nestedElse)}${out("Finished")}
        <p>The inner <code>else</code> belongs to the inner <code>if</code> (they have the same indentation), so with <code>x = 1</code> the whole inner decision is skipped.</p>` },
      { id: "elif", title: "elif: more than two paths", html: `
        <p><code>elif</code> (“else if”) adds more conditions. Python tests them <b>in order, top to bottom</b>, and runs the block of the <b>first</b> condition that is true. All later conditions are not even tested. The <code>else</code> at the end runs only if every condition was false.</p>
        ${codeBlock(CODE.medium)}${out("Medium\nFinished")}
        <p>The <code>else</code> is optional. Without it, nothing is printed when no condition is true. A chain can be as long as you like:</p>
        ${codeBlock(CODE.chain(56))}${out("Ginormous\nFinished")}
        ${predict("What does this chain print for <code>x = 15</code>? For <code>x = 2</code>? For <code>x = -7</code>?",
          "<p><code>Large</code> for 15 (15 is not <code>&lt; 2</code> or <code>&lt; 10</code>, but it is <code>&lt; 20</code>). <code>Medium</code> for 2: the first test, <code>2 &lt; 2</code>, is false. <code>Small</code> for −7. Each time exactly one of the five words is printed, followed by <code>Finished</code>.</p>")}
        ${demo("chain", "Demo 4 · Which branch does x reach?", "type an x, then step", "The coloured bar shows the branch every whole number reaches; the black marker is your x.")}
        ${callout("pitfall", "PITFALL · ONLY THE FIRST TRUE BRANCH RUNS", "<p>With <code>x = 1</code>, the conditions <code>x &lt; 10</code>, <code>x &lt; 20</code> and <code>x &lt; 40</code> are all true too, but once <code>Small</code> is printed the rest of the chain is skipped. If you want every true condition to act, use separate <code>if</code> statements, as in Demo 1.</p>")}
        ${callout("pattern", "PATTERN · ORDERED CONDITIONS", "<p>In an <code>if</code>/<code>elif</code> chain, a later branch only sees the inputs that every earlier condition rejected. So <code>elif x &lt; 20</code> really means “<code>x</code> is at least 10 and less than 20”. When the conditions are ranges, order them from the smallest bound up (or the largest down), and you never need to write both ends of a range.</p>")}` },
      { id: "never", title: "Which will never be printed?", html: `
        <p>Because the conditions are tested in order, a branch can be impossible to reach. Look at these two programs:</p>
        ${codeBlock(CODE.never1(4))}${out("Above 2\nFinished")}
        ${codeBlock(CODE.never2(8))}${out("Below 20\nFinished")}
        ${predict("In each program, which message can never be printed, whatever the value of <code>x</code>?",
          "<p>In the first program, <code>Something else</code> is never printed: every number is either <code>&lt;= 2</code> or <code>&gt; 2</code>. In the second, <code>Below 10</code> is never printed: any <code>x</code> below 10 is also below 20, so the <code>elif x &lt; 20</code> branch catches it first. To fix the second program, swap the two <code>elif</code> lines.</p>")}
        ${demo("never", "Demo 5 · Hunt for the dead branch", "try to reach “Below 10”", "No colour on the bar belongs to <code>Below 10</code>, whatever you type. Switch to “never printed? (1)” for the other program.")}` },
    ],
    takeaways: ["Indentation defines the blocks.", "else: exactly one of two paths.", "elif: tested in order; first true wins."],
  },
  {
    slug: "3-logic", nav: "and / or / not", title: "Logical Operators",
    subtitle: "Combining questions with not, and, or",
    abstract: "not, and and or combine Boolean expressions. They have an order of precedence, and and/or stop as soon as the answer is known.",
    tags: ["precedence", "short-circuit", "or joins conditions"],
    hero: "code:logicRepl", heroCaption: "The three logical operators",
    sections: [
      { id: "video2", title: "Watch: logical operators and try-except", html: `
        <p>The second video covers Chapters 3 to 5: <code>not</code>, <code>and</code>, <code>or</code> and short-circuits, the safety net of <code>try</code>/<code>except</code>, lists and tuples, and the next-day program.</p>
        <div class="card video" data-video="${VIDEO_P2}"></div>` },
      { id: "ops", title: "not, and, or", html: `
        <p>The <b>logical operators</b> combine Boolean expressions into one:</p>
        <ul><li><code>not a</code> is true when <code>a</code> is false.</li>
        <li><code>a and b</code> is true only when <b>both</b> are true.</li>
        <li><code>a or b</code> is true when <b>at least one</b> is true.</li></ul>
        ${repl(CODE.logicRepl)}
        <p>When an expression has several operators, <code>not</code> is applied first, then <code>and</code>, then <code>or</code>, just as <code>*</code> comes before <code>+</code> in arithmetic. Brackets override the order:</p>
        ${repl(">>> not False and True        # same as (not False) and True\nTrue\n>>> not False or True         # same as (not False) or True\nTrue\n>>> not (False or True)\nFalse\n>>> False and False or True   # same as (False and False) or True\nTrue\n>>> False and (False or True)\nFalse")}
        ${predict("What is <code>True or True and False</code>? And <code>(True or True) and False</code>?",
          `${repl(">>> True or True and False\nTrue\n>>> (True or True) and False\nFalse")}<p><code>and</code> comes first, so the first one is <code>True or (True and False)</code>, which is <code>True or False</code>, which is <code>True</code>.</p>`)}
        ${demo("logic", "Demo 6 · One piece at a time", "pick an expression, then step", "The highlighted piece is the one Python works out next. A struck-through part is never evaluated. Type your own expression with <code>True</code>, <code>False</code>, <code>not</code>, <code>and</code>, <code>or</code>, brackets, numbers, <code>x</code> and <code>day</code>.")}` },
      { id: "ranges", title: "Testing ranges, and short-circuits", html: `
        <p>Logical operators are what you need to test a range, or to replace a nested <code>if</code>:</p>
        ${repl('>>> score = 75\n>>> score >= 60 and score < 80\nTrue\n>>> 60 <= score < 80          # Python also allows chained comparisons\nTrue\n>>> day = "Sat"\n>>> day == "Sat" or day == "Sun"\nTrue')}
        <p><code>and</code> and <code>or</code> <b>short-circuit</b>: they stop as soon as the answer is known. In <code>a and b</code>, if <code>a</code> is false the whole expression is false, so <code>b</code> is never evaluated. In <code>a or b</code>, if <code>a</code> is true, <code>b</code> is never evaluated. This is useful as a guard:</p>
        ${repl(">>> x = 0\n>>> x != 0 and 10 / x > 1\nFalse")}
        <p>Because <code>x != 0</code> is false, Python never computes <code>10 / x</code>, which would raise a <code>ZeroDivisionError</code>. In Demo 6, pick <code>x != 0 and 10 / x &gt; 1</code>, then <code>10 / x &gt; 1 and x != 0</code>: the guard only works when it comes first.</p>
        ${callout("pitfall", "PITFALL · OR JOINS TWO CONDITIONS, NOT TWO VALUES", `<p><code>day == "Sat" or "Sun"</code> does not ask whether <code>day</code> is one of the two. It is read as <code>(day == "Sat") or "Sun"</code>, and the string <code>"Sun"</code> is truthy, so the condition is true whatever <code>day</code> is:</p>
          ${repl('>>> day = "Mon"\n>>> if day == "Sat" or "Sun":\n...     print("Weekend!")\n...\nWeekend!')}
          <p>Write <code>day == "Sat" or day == "Sun"</code>. Try both in Demo 6 with <code>day = Mon</code>.</p>`)}` },
    ],
    takeaways: ["not, then and, then or.", "and/or stop as soon as the answer is known.", "Write the full condition on each side of or."],
  },
  {
    slug: "4-try", nav: "try / except", title: "Handling Errors: try and except",
    subtitle: "A safety net for risky lines",
    abstract: "An error stops the program at the line that raised it. A try/except statement catches the error and runs a fallback instead.",
    tags: ["ValueError", "safety net", "no bare except"],
    hero: "code:tryTwice", heroCaption: "Two conversions: one fails, one works",
    sections: [
      { id: "net", title: "The safety net", html: `
        <p>Some lines can fail. <code>int()</code> turns a string of digits into a number, but it cannot turn <code>"Hello bob"</code> into one:</p>
        ${repl('>>> int("123")\n123\n>>> int("Hello bob")\nTraceback (most recent call last):\n  ...\nValueError: invalid literal for int() with base 10: \'Hello bob\'')}
        <p>When a line raises an error like this, and nothing handles it, the program stops at that line. The lines after it never run. In this program <code>Second</code> is never printed:</p>
        ${codeBlock('astr = "Hello bob"\nistr = int(astr)            # ValueError: the program stops here\nprint("First", istr)\n\nastr = "123"\nistr = int(astr)\nprint("Second", istr)')}
        <p>A <b><code>try</code>/<code>except</code> statement</b> is a safety net, like the one under a tightrope walker. You put the risky lines in the <code>try</code> block. If they all work, the <code>except</code> block is skipped. If one of them fails, Python jumps straight to the <code>except</code> block and then carries on after the statement:</p>
        ${codeBlock(CODE.tryTwice)}${out("First -1\nSecond 123")}
        <p>The first conversion fails, so the <code>except</code> block sets <code>istr</code> to −1 and the program continues. The second conversion works, so its <code>except</code> block is skipped.</p>` },
      { id: "rest", title: "What happens to the rest of the try block", html: `
        <p>When a line in the <code>try</code> block fails, the lines after it <em>in the <code>try</code> block</em> are skipped:</p>
        ${codeBlock(CODE.tryHello("Bob"))}
        ${predict("Which of <code>Hello</code>, <code>There</code> and <code>Done</code> are printed? What is <code>istr</code> at the end?",
          `${out("Hello\nDone -1")}<p><code>print("Hello")</code> runs. <code>int("Bob")</code> fails, so Python leaves the <code>try</code> block at once: <code>print("There")</code> is skipped. The <code>except</code> block sets <code>istr</code> to −1, and <code>Done -1</code> is printed. Keep <code>try</code> blocks short, so it is clear which line you are protecting.</p>`)}
        ${demo("tryFlow", "Demo 7 · Follow the error", "change astr, then step", "Try <code>123</code>, <code> 42 </code> (spaces are allowed), <code>3.5</code> and <code>1_000</code>. The chip above the code shows the state of the safety net.")}` },
      { id: "input", title: "Checking user input", html: `
        <p>The most common use of <code>try</code>/<code>except</code> in this course is reading a number typed by the user. <code>input()</code> always returns a string, and the user may type anything:</p>
        ${codeBlock(CODE.checkInput)}
        ${callout("note", "NOTE · HOW INPUT APPEARS IN THESE NOTES", "<p>When a program reads from the keyboard, the output shows the prompt, but not what the user typed after it: typed text is input, not output. Above each output we say what was typed. (In the demos, the terminal panel does show what was typed, underlined, as your screen would.) Here the user typed <code>42</code>:</p>")}
        ${out("Enter a number: Nice work")}
        <p>On a screen it looks like <code>Enter a number: 42</code>, then <code>Nice work</code> on the next line. If the user types <code>forty-two</code> instead:</p>
        ${out("Enter a number: Invalid number")}
        <p>Switch Demo 7 to “checking input” to step through both.</p>
        ${callout("note", "NOTE", "<p>The slides call these variables <code>rawstr</code> and <code>ival</code>, and write <code>except:</code> with no error name. These notes use <code>raw_str</code> and <code>value</code>, and name the error, <code>except ValueError:</code>.</p>")}
        ${callout("pitfall", "PITFALL · A BARE EXCEPT HIDES YOUR OWN BUGS", `<p><code>except:</code> with no error name catches <em>every</em> error, including a typo in your own code. Here <code>astr</code> is misspelt as <code>asrt</code>, which raises a <code>NameError</code>, and the bare <code>except</code> quietly turns it into −1:</p>
          ${codeBlock(CODE.bareExcept)}${out("-1")}
          <p>The input was fine, but the program says it was invalid, and gives no hint why. With <code>except ValueError:</code> the typo would stop the program with a clear <code>NameError</code> message. Catch only the error you expect.</p>`)}` },
    ],
    takeaways: ["An unhandled error stops the program.", "Error in try → jump to except.", "Name the error: except ValueError."],
  },
  {
    slug: "5-lists", nav: "Lists", title: "A First Look at Lists and Tuples",
    subtitle: "Many values under one name",
    abstract: "A list or a tuple holds a sequence of values, numbered from 0. A list can be changed; a tuple cannot. A tuple of month lengths solves the next-day problem.",
    tags: ["index from 0", "mutable / immutable", "next day"],
    hero: "code:nextDay", heroCaption: "The next-day program",
    sections: [
      { id: "lists", title: "Lists and tuples", html: `
        <p>To store several values under one name, use a <b>list</b> (square brackets) or a <b>tuple</b> (round brackets). You get one element out by its <b>index</b> in square brackets. Indexes start at 0:</p>
        ${repl(">>> a = [1, 2, 3]\n>>> a[0]\n1\n>>> a[2]\n3\n>>> t = (1, 2, 3)\n>>> t[0]\n1")}
        <p>The difference: a list is <b>mutable</b> (you can change its elements), a tuple is <b>immutable</b> (you cannot).</p>
        ${repl(">>> a = [1, 2, 3]\n>>> t = (1, 2, 3)\n>>> a[0] = 10\n>>> a\n[10, 2, 3]\n>>> t[0] = 10\nTraceback (most recent call last):\n  ...\nTypeError: 'tuple' object does not support item assignment")}
        <p>Lists get a lecture of their own later. For now we use them as a simple way to hold a sequence of numbers, and as a lookup table.</p>` },
      { id: "nextday", title: "Practice: the next day", html: `
        <p><em>Write a program that asks for a date (a month and a day) and prints the date one day later. Ignore leap years.</em></p>
        <p>The number of days in each month never changes, so we keep it in a tuple. January is month 1 but index 0, so the days of month <code>month</code> are <code>days_in_month[month - 1]</code>. If the day is before the end of the month, the answer is the next day of the same month. Otherwise it is day 1 of the next month, and <code>month % 12 + 1</code> turns 12 into 1, so December 31 is followed by January 1.</p>
        ${codeBlock(CODE.nextDay)}
        <p>The user typed <code>2</code>, then <code>28</code>:</p>
        ${out("Enter a month (1-12): Enter a day (1-31): 3 1")}
        ${predict("What does the program print for 12 and 31? For 4 and 30? For 7 and 15?",
          `<p><code>1 1</code>, <code>5 1</code> and <code>7 16</code>. For 12/31, <code>12 % 12 + 1</code> is <code>0 + 1</code>, which is 1.</p>${out("Enter a month (1-12): Enter a day (1-31): 1 1")}`)}
        ${demo("nextDay", "Demo 8 · The next day", "choose a date, then step", "The amber cell is <code>days_in_month[month - 1]</code>. Try 12/31, and February 30: the program does not check its input, so it prints <code>3 1</code>. Exercise 7 fixes that.")}
        ${callout("note", "NOTE", "<p>The slide names the tuple <code>daysInMonth</code>. PEP 8 writes variable names in lower case with underscores: <code>days_in_month</code>.</p>")}` },
    ],
    takeaways: ["Index from 0: a[0] is the first.", "Lists change; tuples don't.", "A tuple makes a good lookup table."],
  },
  {
    slug: "6-while", nav: "while", title: "Repeated Flow: while Loops",
    subtitle: "Repeat while a condition is true",
    abstract: "A while loop tests its condition, runs its block, and goes back to the test. Something in the block must make the condition false, or the loop never ends.",
    tags: ["trace table", "infinite loop", "break / continue"],
    hero: "countdownMini", heroCaption: "Test, run the block, back to the test.",
    sections: [
      { id: "video3", title: "Watch: repeating with while and for", html: `
        <p>The third video covers this chapter and the first section of Chapter 7: <code>while</code> traced with a table, the infinite loop, <code>break</code> and <code>continue</code>, and looping over a list with <code>for</code>.</p>
        <div class="card video" data-video="${VIDEO_P3}"></div>` },
      { id: "while", title: "The while loop", html: `
        <p>A <b><code>while</code> loop</b> repeats its block as long as its condition is true. Each time round, Python tests the condition first. If it is true, the block runs and Python goes back to the test. If it is false, the loop ends and the program continues after the block. One run of the block is called an <b>iteration</b>.</p>
        ${codeBlock(CODE.countdown(5))}${out("5\n4\n3\n2\n1\nFinish")}
        <p>A loop usually has an <b>iteration variable</b> that changes each time round, here <code>n</code>. Tracing a loop by hand is easiest with a table, one row per test of the condition:</p>
        ${tbl(["test", "<code>n</code>", "<code>n &gt; 0</code>", "prints"], [[1, 5, "True", 5], [2, 4, "True", 4], [3, 3, "True", 3], [4, 2, "True", 2], [5, 1, "True", 1], [6, 0, "False", "(loop ends) <code>Finish</code>"]])}
        <p>The block runs five times, but the condition is tested six times: the last test is the one that ends the loop.</p>
        ${demo("whileLoop", "Demo 9 · The loop stepper", "step and watch the table grow", "The table under the code is the trace table: one row per test. Change the starting <code>n</code>; try 0.")}
        ${callout("note", "NOTE", "<p><code>n = n - 1</code> can also be written <code>n -= 1</code>. Likewise <code>total += x</code> means <code>total = total + x</code>.</p>")}` },
      { id: "infinite", title: "An infinite loop", html: `
        <p>What is wrong with this program?</p>
        ${codeBlock(CODE.lather)}
        <p><code>n = n - 1</code> is not indented, so it is not part of the loop. Inside the loop nothing changes <code>n</code>, so <code>n &gt; 0</code> stays true for ever, and the program prints <code>Lather</code> and <code>Rinse</code> until you stop it (press Ctrl+C). This is an <b>infinite loop</b>. Pick “Lather, Rinse” in Demo 9 to watch it go round.</p>
        ${callout("pitfall", "PITFALL · A WHILE LOOP MUST MAKE PROGRESS", "<p>Something in the body has to change the variables in the condition, so that the condition eventually becomes false. Before you run a <code>while</code> loop, point to the line that does this.</p>")}` },
      { id: "break", title: "break and continue", html: `
        <p>The <b><code>break</code></b> statement ends the loop at once and jumps to the first line after it. A common shape is a loop whose condition is always true, <code>while True:</code>, with a <code>break</code> inside to stop it:</p>
        ${codeBlock(CODE.breakLoop)}
        <p>The user typed <code>hello</code>, <code>there</code> and <code>done</code>. After each prompt you see the word the program printed back with <code>print(line)</code> (the typed word itself is not part of the output):</p>
        ${out("Enter a word: hello\nEnter a word: there\nEnter a word: Finished")}
        <p>When <code>done</code> is typed, <code>break</code> ends the loop before <code>print(line)</code>, so <code>done</code> is never printed and <code>Finished</code> follows the third prompt.</p>
        <p>The <b><code>continue</code></b> statement ends the <em>current iteration</em> and goes straight back to the loop test, skipping the rest of the block. Here it makes the loop ignore every line that starts with <code>#</code>:</p>
        ${codeBlock(CODE.continueLoop)}
        <p>The user typed <code>hello</code>, <code># don't print this</code>, <code>print this!</code> and <code>done</code>:</p>
        ${out("Enter a word: hello\nEnter a word: Enter a word: print this!\nEnter a word: Done")}
        <p>After the second prompt nothing is printed: <code>continue</code> sent the loop back to the next <code>input</code>.</p>
        ${demo("whileBreak", "Demo 10 · break and continue", "edit what the user types, then step", "The terminal shows what was typed (underlined) as well as what the program printed. Switch to “continue”, or remove <code>done</code> from the words to see what happens when the input runs out.")}
        ${callout("note", "NOTE", "<p>The slide tests <code>line[0] == '#'</code>. That crashes with an <code>IndexError</code> if the user just presses Enter, because the empty string <code>\"\"</code> has no character at index 0. <code>line.startswith(\"#\")</code> is simply <code>False</code> for the empty string.</p>")}
        ${predict("<code>break</code> and <code>continue</code> both skip the rest of the block. What is the difference?",
          "<p><code>break</code> leaves the loop altogether. <code>continue</code> leaves only this iteration; the loop goes on with the next one.</p>")}` },
      { id: "indefinite", title: "Indefinite loops", html: `
        <p><code>while</code> loops are called <b>indefinite loops</b>: they run until a condition becomes false, and the number of iterations is not known in advance. For the loops above it is easy to see that they stop. For some loops it is very hard. Nobody has ever proved that this one stops for every starting <code>n</code>, although it has stopped for every <code>n</code> anyone has tried:</p>
        ${codeBlock(CODE.collatz(6))}${out("8")}
        <p>(6 → 3 → 10 → 5 → 16 → 8 → 4 → 2 → 1: eight steps. This is the Collatz problem; Exercise 9 explores it.)</p>
        ${demo("collatz", "Demo 11 · How long will it run?", "change the start, then press Play", "Try 6, 7, 26, 27 and 28. Starting at 27 takes 111 steps.")}` },
    ],
    takeaways: ["Test, run the block, test again.", "The body must move towards false.", "break leaves; continue skips ahead."],
  },
  {
    slug: "7-for", nav: "for & patterns", title: "for Loops and the Loop Patterns",
    subtitle: "Once per item, and the shapes of code you will reuse",
    abstract: "A for loop runs its block once for each item of a sequence. Counting, summing, averaging, filtering, searching and largest-so-far are all the same shape: set up, update per item, read the answer.",
    tags: ["definite loop", "accumulator", "flag", "None"],
    hero: "patternMini", heroCaption: "Largest so far: one item per iteration.",
    sections: [
      { id: "for", title: "Looping over a sequence", html: `
        <p>Often we have a fixed collection of items, and want to do something with each one. A <b><code>for</code> loop</b> runs its block once for each item, with the <b>iteration variable</b> taking each item in turn:</p>
        ${codeBlock(CODE.forFirst)}${out("5\n4\n3\n2\n1\nFinished")}
        <p><code>for</code> loops are called <b>definite loops</b>: they run an exact number of times, one per item. Read <code>for i in [5, 4, 3, 2, 1]:</code> as “for each <code>i</code> in this list”. You do not change <code>i</code> yourself; the loop moves it to the next item.</p>
        <p>The items can be anything, for example strings:</p>
        ${codeBlock(CODE.friends(["Tom", "Jerry", "Bat"]))}${out("Happy new year Tom\nHappy new year Jerry\nHappy new year Bat\nDone")}
        <p>Choose an iteration variable name that says what one item is: <code>friend</code> for an item of <code>friends</code>, <code>num</code> for an item of a list of numbers.</p>
        ${demo("forEach", "Demo 12 · The pattern stepper", "pick a pattern, edit the list, step", "The ▼ marks the item the iteration variable refers to. Every pattern of this chapter is in the menu.")}
        ${predict("How many times does the block of <code>for friend in friends:</code> run if <code>friends</code> is the empty list <code>[]</code>? What is printed?",
          "<p>Zero times. Only <code>Done</code> is printed. (Clear the list in Demo 12 to check.)</p>")}` },
      { id: "video4", title: "Watch: loop patterns and comparing values", html: `
        <p>The fourth video covers the rest of this chapter and Chapter 8: counting, summing, filtering, searching with a flag, largest and smallest so far, <code>None</code>, <code>==</code> versus <code>is</code>, strings and floats.</p>
        <div class="card video" data-video="${VIDEO_P4}"></div>` },
      { id: "patterns", title: "Counting, summing, averaging", html: `
        <p>The loops in this chapter are simple, but each one is a <b>pattern</b>: a shape of code that you will reuse in every program that processes a collection, whatever the data. All of them have the same three parts:</p>
        <ol><li><b>Before the loop</b>, set up one or more variables.</li><li><b>In the loop</b>, look at one item at a time and update the variables.</li><li><b>After the loop</b>, the variables hold the answer.</li></ol>
        <h3>Counting</h3>
        <p>To count how many times a loop runs, start a counter at 0 and add 1 in every iteration:</p>
        ${codeBlock(CODE.count([3, 4, 98, 38, 9, 10, 199, 78]))}${out("Before 0\n1 3\n2 4\n3 98\n4 38\n5 9\n6 10\n7 199\n8 78\nAfter 8")}
        <h3>Summing</h3>
        <p><em>Practice: given a set of numbers, calculate their sum using a <code>for</code> loop.</em> Replace “add 1” with “add the item”:</p>
        ${codeBlock(CODE.sum([3, 4, 98, 38, 9, 10, 199, 78]))}${out("Before 0\n3 3\n7 4\n105 98\n143 38\n152 9\n162 10\n361 199\n439 78\nLast 439")}
        ${callout("pattern", "PATTERN · ACCUMULATOR", "<p>A variable that collects a result across the iterations of a loop is an <b>accumulator</b>. Start it at the value that means “nothing yet” (0 for a count or a sum), and update it once per item: <code>count = count + 1</code>, <code>total = total + num</code>.</p>")}
        <h3>Average</h3>
        <p><em>Practice: calculate the average using a <code>for</code> loop.</em> The average is the sum divided by the count, so keep both accumulators:</p>
        ${codeBlock(CODE.average([3, 4, 98, 38, 9, 10, 199, 78]))}${out("Before 0\n1 3 3\n2 7 4\n3 105 98\n4 143 38\n5 152 9\n6 162 10\n7 361 199\n8 439 78\nLast 439 54.875")}
        ${demo("patterns", "Demo 13 · Accumulators at work", "step; then switch to “summing” or “average”", "Empty the list for “average” and step to the end: what goes wrong?")}
        ${callout("note", "NOTE", "<p>The slides call the list <code>numberSet</code>. In PEP 8 style it would be <code>number_set</code>; we call it <code>numbers</code>. (Python also has a real <em>set</em> type, which you will meet later, so it is better not to call a list a set.)</p>")}` },
      { id: "filter", title: "Filtering and searching", html: `
        <p>An <code>if</code> inside the loop picks out the items we are interested in. This is <b>filtering</b>:</p>
        ${codeBlock(CODE.filter([23, 3, 43, 39, 80, 111, 99, 3, 65]))}${out("Before\nLarge value: 80\nLarge value: 111\nLarge value: 99\nLarge value: 65\nAfter")}
        <p>Is a particular number in the list? Start a Boolean variable, a <b>flag</b>, at <code>False</code>, and set it to <code>True</code> as soon as the number is found:</p>
        ${codeBlock(CODE.search([9, 41, 12, 3, 74, 15]))}${out("Before False\nFalse 9\nFalse 41\nFalse 12\nFalse 3\nTrue 74\nTrue 15\nAfter True")}
        <p>Once <code>found</code> is <code>True</code>, nothing sets it back to <code>False</code>, so it stays <code>True</code> to the end.</p>
        ${predict("The loop goes on looking at 15 after 74 is found. Which one statement could you add to stop the loop as soon as the number is found? Where?",
          "<p>A <code>break</code> right after <code>found = True</code>, inside the <code>if</code>. Then the last line printed inside the loop would be <code>True 74</code>. (Exercise 3.)</p>")}` },
      { id: "largest", title: "Largest and smallest so far", html: `
        <p>To find the largest number, keep the largest number seen so far. Each time an item is larger, it becomes the new largest:</p>
        ${codeBlock(CODE.largest([9, 39, 21, 98, 4, 5, 100, 65]))}${out("Before -1\n9 9\n39 39\n39 21\n98 98\n98 4\n98 5\n100 100\n100 65\nAfter 100")}
        <p>To find the smallest number, flip <code>&gt;</code> to <code>&lt;</code>. But what should <code>smallest_so_far</code> start at? Starting at −1, as we did for the largest, goes wrong:</p>
        ${codeBlock(CODE.smallestBug([9, 39, 21, 98, 4, 5, 100, 65]))}
        ${predict("What does this program print as its last line?",
          `${out("Before -1\n-1 9\n-1 39\n-1 21\n-1 98\n-1 4\n-1 5\n-1 100\n-1 65\nAfter -1")}<p>No number in the list is smaller than −1, so the “smallest” is never updated, and the answer −1 is not even in the list. The same bug hides in the largest-so-far program: on a list of negative numbers such as <code>[-5, -2, -9]</code> it would answer −1.</p>`)}
        <p>The fix is to start with <b>no value at all</b>. Python's value for “nothing” is <code>None</code>. In the first iteration, <code>smallest_so_far</code> is <code>None</code>, so the first number becomes the smallest so far; after that, the usual comparison takes over:</p>
        ${codeBlock(CODE.smallestNone([9, 39, 21, 98, 4, 5, 100, 65]))}${out("Before None\n9 9\n9 39\n9 21\n9 98\n4 4\n4 5\n4 100\n4 65\nAfter 4")}
        ${demo("smallest", "Demo 14 · Smallest so far: the bug and the fix", "step to the end, then switch to “start None”", "Also try “largest so far” with the list <code>-5, -2, -9</code>.")}
        ${callout("pattern", "PATTERN · LARGEST / SMALLEST SO FAR", "<p>Keep the best item seen so far in a variable. Start it at <code>None</code> (“nothing seen yet”); in the loop, take the item if nothing has been seen yet <b>or</b> it beats the best so far. After the loop the variable holds the answer, or still <code>None</code> if the list was empty.</p>")}
        <p>The program tests <code>smallest_so_far is None</code>. The next chapter explains <code>is</code>.</p>` },
    ],
    takeaways: ["for: once per item.", "Set up · update per item · read the answer.", "Start “so far” variables at None."],
  },
  {
    slug: "8-compare", nav: "is & ==", title: "is, Strings and Floats",
    subtitle: "Same value or same object, letter by letter, and approximately",
    abstract: "== compares values and is compares identity. Strings compare by character codes. Floats are approximate, so never compare them with ==.",
    tags: ["is None", "ASCII", "0.1 + 0.2"],
    hero: "code:floatAdd", heroCaption: "Ten times 0.1 is not quite 1",
    sections: [
      { id: "is", title: "Same value or same object?", html: `
        <p>In Python, a variable is a <em>name</em> that refers to an <em>object</em> in memory. Two names can refer to two different objects that happen to have the same value, or to one and the same object. Python has two different questions for these two situations:</p>
        <ul><li><code>a == b</code> asks: <b>do <code>a</code> and <code>b</code> have the same value?</b></li>
        <li><code>a is b</code> asks: <b>are <code>a</code> and <code>b</code> the very same object?</b> (<code>a is not b</code> is its opposite.)</li></ul>
        ${repl(">>> a = [1, 2, 3]\n>>> b = [1, 2, 3]\n>>> a == b\nTrue\n>>> a is b\nFalse\n>>> c = a\n>>> c is a\nTrue")}
        <p><code>a</code> and <code>b</code> were built separately: two list objects with equal contents. <code>c = a</code> does not copy anything; it makes <code>c</code> a second name for the object <code>a</code> refers to. You can see the difference by changing the list through one name:</p>
        ${repl(">>> a = [1, 2, 3]\n>>> b = [1, 2, 3]\n>>> c = a\n>>> c[0] = 99\n>>> a\n[99, 2, 3]\n>>> b\n[1, 2, 3]")}
        <p>Changing the list through <code>c</code> changed what <code>a</code> shows, because they are the same list. <code>b</code> is a different list and is untouched.</p>
        ${demo("identity", "Demo 15 · Names and objects", "step through the session", "Each arrow goes from a name to the object it refers to. <code>is</code> asks whether two arrows end at the same box.")}
        ${callout("pitfall", "PITFALL · IS IS NOT A STRONGER ==", `<p>The slides describe <code>is</code> as “similar to, but stronger than <code>==</code>”. That is misleading: <code>is</code> asks a <em>different</em> question (same object?), not a stricter version of the same one. Two equal values are often different objects, and for small numbers and short strings CPython sometimes <em>reuses</em> one object, so <code>is</code> can give <code>True</code> or <code>False</code> depending on details that are not part of the language. That is why the slide's <code>10 is 10</code> and <code>'123' is '123'</code> print <code>True</code>; Python itself warns <code>SyntaxWarning: "is" with 'int' literal. Did you mean "=="?</code> for <code>10 is 10</code>.</p>
          <p><b>Rule:</b> compare values with <code>==</code>. Use <code>is</code> only to test for <code>None</code>, <code>True</code> or <code>False</code>, which Python guarantees exist exactly once: <code>if x is None:</code>.</p>`)}
        <p>So in the smallest-so-far program, <code>smallest_so_far is None</code> is the right test. (PEP 8 asks for <code>is None</code>, not <code>== None</code>.)</p>
        ${predict("After <code>x = [0]</code> and <code>y = x</code>, what are <code>x == y</code>, <code>x is y</code>, and <code>x is [0]</code>?",
          `${repl(">>> x = [0]\n>>> y = x\n>>> x == y, x is y, x is [0]\n(True, True, False)")}<p><code>[0]</code> written on the last line builds a brand-new list, which is equal to <code>x</code> but not the same object.</p>`)}` },
      { id: "strings", title: "Comparing strings", html: `
        <p>Strings are compared <b>letter by letter</b>, from the left, until two letters differ; those two letters decide. Each character has a number, its <b>code</b>. For the common characters this is the <b>ASCII</b> code: <code>"A"</code> to <code>"Z"</code> are 65 to 90, <code>"a"</code> to <code>"z"</code> are 97 to 122, and <code>"0"</code> to <code>"9"</code> are 48 to 57. The function <code>ord()</code> gives the code of a character:</p>
        ${repl('>>> ord("A"), ord("B"), ord("a"), ord("h")\n(65, 66, 97, 104)\n>>> "hello" > "Bye"\nTrue\n>>> "AAB" > "AAC"\nFalse\n>>> "apple" < "apricot"\nTrue\n>>> "Zebra" < "apple"\nTrue')}
        <p><code>"hello" &gt; "Bye"</code> is true because the first letters differ: <code>"h"</code> is 104 and <code>"B"</code> is 66. Every capital letter comes before every lower-case letter, so <code>"Zebra"</code> sorts before <code>"apple"</code>. In <code>"AAB" &gt; "AAC"</code> the first two letters are equal, and <code>"B"</code> (66) is less than <code>"C"</code> (67).</p>
        ${demo("strCmp", "Demo 16 · Letter by letter", "pick two strings, then step", "The number under each letter is its code. Try the presets, then your own name against a friend's.")}
        ${predict('Is <code>"cat" &lt; "catalog"</code> true? And <code>"10" &lt; "9"</code>?',
          `${repl('>>> "cat" < "catalog"\nTrue\n>>> "10" < "9"\nTrue')}<p>When one string runs out first, the shorter one is smaller: <code>"cat"</code> is a prefix of <code>"catalog"</code>. And <code>"10" &lt; "9"</code> compares the <em>characters</em> <code>"1"</code> (49) and <code>"9"</code> (57): as strings, <code>"10"</code> comes first. Convert with <code>int()</code> before you compare numbers that were typed in.</p>`)}` },
      { id: "types", title: "Comparing values of different types", html: `
        <p>An integer and a float with the same value are equal. A number and a string are never equal, and asking which is larger is an error:</p>
        ${repl('>>> 7 == 7.0\nTrue\n>>> 7 != "7"\nTrue\n>>> "A" == 65\nFalse\n>>> "7" < 8\nTraceback (most recent call last):\n  ...\nTypeError: \'<\' not supported between instances of \'str\' and \'int\'')}` },
      { id: "floats", title: "Floating-point numbers are approximate", html: `
        <p>A float is stored in binary with a limited number of digits. A fraction like 0.1 = 1/10, whose denominator is not a power of two, cannot be stored exactly, just as 1/3 cannot be written exactly in decimal. Usually the tiny error is invisible, but it can add up:</p>
        ${repl(">>> x = 0.1\n>>> 1 == 10 * x\nTrue\n>>> 1 == x + x + x + x + x + x + x + x + x + x\nFalse\n>>> x + x + x + x + x + x + x + x + x + x\n0.9999999999999999\n>>> 0.1 + 0.2 == 0.3\nFalse")}
        ${demo("floatSum", "Demo 17 · Adding 0.1 ten times", "step through the additions", "Python adds left to right, one <code>+</code> at a time. The third partial sum already shows the error.")}
        ${callout("pitfall", "PITFALL · DON'T COMPARE FLOATS WITH ==", `<p>Ask instead whether two floats are <em>close enough</em>:</p>${repl(">>> total = 0.1 + 0.2\n>>> abs(total - 0.3) < 1e-9\nTrue")}
          <p>The same applies to loops: <code>while x != 1.0:</code> with <code>x</code> growing by 0.1 never stops, because <code>x</code> jumps from 0.9999999999999999 to 1.0999999999999999 without ever being exactly 1.0.</p>`)}` },
    ],
    takeaways: ["== compares values; is compares objects.", "Use is only with None, True, False.", "Strings: by character code. Floats: with a tolerance."],
  },
  {
    slug: "9-summary", nav: "Summary", title: "Summary and Practice",
    subtitle: "Check yourself, then write some flow control",
    abstract: "A one-page map of the lecture, five self-check questions, nine exercises with solutions, and a checklist for flow-control code an AI writes for you.",
    tags: ["knowledge map", "self-check", "exercises"],
    hero: "toc",
    sections: [
      { id: "map", title: "Knowledge map", html: `<div class="map">
        <div class="card"><h3>Booleans</h3><ul><li><code>&lt; &lt;= == &gt;= &gt; !=</code></li><li><code>=</code> assigns, <code>==</code> asks</li><li>Falsy: <code>0</code>, empty, <code>None</code></li><li><code>not</code> → <code>and</code> → <code>or</code>; short-circuit</li></ul></div>
        <div class="card"><h3>Decisions</h3><ul><li><code>if</code> · <code>else</code> · <code>elif</code></li><li>Indentation makes the blocks</li><li>Only the <b>first</b> true branch runs</li><li>Order range tests by bound</li></ul></div>
        <div class="card"><h3>Errors</h3><ul><li>Unhandled error → program stops</li><li><code>try</code> fails → jump to <code>except</code></li><li>Keep <code>try</code> short</li><li><code>except ValueError:</code>, not bare</li></ul></div>
        <div class="card"><h3>Loops</h3><ul><li><code>while</code>: indefinite, needs progress</li><li><code>for</code>: definite, once per item</li><li><code>break</code> leaves, <code>continue</code> skips</li><li>Trace with a table</li></ul></div>
        <div class="card"><h3>Loop patterns</h3><ul><li>Count, sum, average (accumulators)</li><li>Filter with an <code>if</code></li><li>Search with a flag</li><li>Largest/smallest so far from <code>None</code></li></ul></div>
        <div class="card"><h3>Comparing carefully</h3><ul><li><code>==</code> value, <code>is</code> identity</li><li><code>is</code> only with <code>None</code>/<code>True</code>/<code>False</code></li><li>Strings by character code</li><li>Floats: <code>abs(a - b) &lt; 1e-9</code></li></ul></div></div>` },
      { id: "check", title: "Check your understanding", html: `<div data-demo="quiz"><div class="demo-body"></div></div>` },
      { id: "exercises", title: "Exercises", html: `
        <p>★ trace or modify · ★★ write · ★★★ extend or combine. Test every program on the boundary cases first (the exact value where a condition changes, an empty list), then on a normal one.</p>
        <h3>Exercise 1 ★ (trace)</h3>
        <p>Fill in a trace table for this loop, one row per iteration, with the values of <code>i</code>, <code>total</code> and <code>count</code> at the end of each iteration. What is printed?</p>
        ${codeBlock("total = 0\ncount = 0\nfor i in [4, -2, 7, 0, 5]:\n    if i > 0:\n        total = total + i\n        count = count + 1\nprint(count, total)")}
        <details class="reveal"><summary>Solution</summary>${tbl(["<code>i</code>", "<code>i &gt; 0</code>", "<code>total</code>", "<code>count</code>"], [[4, "True", 4, 1], ["−2", "False", 4, 1], [7, "True", 11, 2], [0, "False", 11, 2], [5, "True", 16, 3]])}<p>It counts and sums the positive numbers, and prints:</p>${out("3 16")}</details>
        <h3>Exercise 2 ★ (find the bug)</h3>
        <p>This program should print the grade for a score: <code>A</code> for 90 or more, <code>B</code> for 80–89, <code>C</code> for 60–79, and <code>F</code> below 60. It prints <code>C</code> for a score of 95. Why? Fix it by reordering the branches.</p>
        ${codeBlock('score = 95\nif score >= 60:\n    print("C")\nelif score >= 80:\n    print("B")\nelif score >= 90:\n    print("A")\nelse:\n    print("F")')}${out("C")}
        <details class="reveal"><summary>Solution</summary><p>Only the first true branch runs, and <code>95 &gt;= 60</code> is true, so <code>C</code> is printed and the other tests are never made. The <code>B</code> and <code>A</code> branches can never be reached. Test the highest bound first:</p>${codeBlock('score = 95\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelif score >= 60:\n    print("C")\nelse:\n    print("F")')}${out("A")}</details>
        <h3>Exercise 3 ★ (modify)</h3>
        <p>Change the search-with-a-flag program of Chapter 7 so that the loop stops as soon as 74 is found. What does it print now?</p>
        <details class="reveal"><summary>Solution</summary><p>Add <code>break</code> inside the <code>if</code>, after <code>found = True</code>. The <code>print</code> inside the loop is after the <code>if</code>, so it is skipped in the iteration that breaks:</p>${codeBlock('found = False\nprint("Before", found)\nfor value in [9, 41, 12, 3, 74, 15]:\n    if value == 74:\n        found = True\n        break\n    print(found, value)\nprint("After", found)')}${out("Before False\nFalse 9\nFalse 41\nFalse 12\nFalse 3\nAfter True")}</details>
        <h3>Exercise 4 ★★</h3>
        <p>A year is a <b>leap year</b> if it is divisible by 4, except that years divisible by 100 are not, except that years divisible by 400 are. So 2024 and 2000 are leap years, but 1900 and 2023 are not. Write one Boolean expression, using <code>%</code>, <code>and</code>, <code>or</code> and <code>not</code> (no <code>if</code>), that is <code>True</code> exactly when <code>year</code> is a leap year. Check it on all four years.</p>
        <details class="reveal"><summary>Solution</summary>${repl(">>> for year in [2024, 2000, 1900, 2023]:\n...     leap = year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)\n...     print(year, leap)\n...\n2024 True\n2000 True\n1900 False\n2023 False")}<p>The brackets matter: without them, <code>and</code> would be applied before <code>or</code>.</p></details>
        <h3>Exercise 5 ★★</h3>
        <p>Write a program that asks the user for a score from 0 to 100 and prints its grade (as in Exercise 2). If the input is not a whole number, or is outside 0–100, print <code>Invalid score</code> instead. Use <code>try</code>/<code>except</code>.</p>
        <details class="reveal"><summary>Solution</summary><p><code>value = -1</code> in the <code>except</code> block makes a bad input fall into the “out of range” case, so one test handles both kinds of bad input. Here the user typed <code>85</code>:</p>${codeBlock('raw_str = input("Score: ")\ntry:\n    value = int(raw_str)\nexcept ValueError:\n    value = -1\n\nif value < 0 or value > 100:\n    print("Invalid score")\nelif value >= 90:\n    print("A")\nelif value >= 80:\n    print("B")\nelif value >= 60:\n    print("C")\nelse:\n    print("F")')}${out("Score: B")}<p>Test it also with <code>100</code>, <code>0</code>, <code>-5</code>, <code>101</code> and <code>abc</code>.</p></details>
        <h3>Exercise 6 ★★</h3>
        <p>Given <code>numbers = [12, 7, 3, 20, 15, 8]</code>, write one loop that counts the even numbers and sums the odd numbers. It should print <code>3 25</code>.</p>
        <details class="reveal"><summary>Solution</summary><p>A number is even if <code>num % 2 == 0</code>. Two accumulators, one for each question:</p>${codeBlock("numbers = [12, 7, 3, 20, 15, 8]\neven_count = 0\nodd_total = 0\nfor num in numbers:\n    if num % 2 == 0:\n        even_count = even_count + 1\n    else:\n        odd_total = odd_total + num\nprint(even_count, odd_total)")}${out("3 25")}</details>
        <h3>Exercise 7 ★★★</h3>
        <p>Extend the next-day program so that it (a) handles leap years (February has 29 days in a leap year; use your expression from Exercise 4) and (b) prints <code>Invalid date</code> instead of crashing if the month or day is not a number, or is out of range. Ask for the year first.</p>
        <details class="reveal"><summary>Solution</summary><p>Build the tuple after reading the year, since February's length depends on it. One <code>try</code> protects both conversions; the range check catches numbers that make no date. The user typed <code>2024</code>, <code>2</code>, <code>28</code>:</p>${codeBlock('try:\n    year = int(input("Year: "))\n    month = int(input("Month (1-12): "))\n    day = int(input("Day: "))\nexcept ValueError:\n    year, month, day = 0, 0, 0\n\nleap = year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)\nif leap:\n    february = 29\nelse:\n    february = 28\ndays_in_month = (31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31)\n\nif month < 1 or month > 12:\n    print("Invalid date")\nelif day < 1 or day > days_in_month[month - 1]:\n    print("Invalid date")\nelif day < days_in_month[month - 1]:\n    print(year, month, day + 1)\nelif month == 12:\n    print(year + 1, 1, 1)\nelse:\n    print(year, month + 1, 1)')}${out("Year: Month (1-12): Day: 2024 2 29")}<p>The month test comes first, so <code>days_in_month[month - 1]</code> is only looked up for a valid month. December 31 now also moves the year on. Test it with 2023/2/28, 2024/12/31, 2024/2/30 and <code>x</code>.</p></details>
        <h3>Exercise 8 ★★★ (guessing game)</h3>
        <p>The secret number is 37. Write a program that keeps asking <code>Guess: </code> until the user guesses it. After each wrong guess print <code>Too low</code> or <code>Too high</code>. Ignore input that is not a whole number (print <code>Numbers only</code> and ask again). At the end print how many valid guesses it took, like <code>Got it in 3 guesses</code>. Use <code>while True</code>, <code>break</code> and <code>continue</code>.</p>
        <details class="reveal"><summary>Solution</summary><p>The user typed <code>50</code>, <code>abc</code>, <code>25</code>, <code>37</code>:</p>${codeBlock('secret = 37\nguesses = 0\nwhile True:\n    raw_str = input("Guess: ")\n    try:\n        guess = int(raw_str)\n    except ValueError:\n        print("Numbers only")\n        continue\n    guesses = guesses + 1\n    if guess == secret:\n        break\n    elif guess < secret:\n        print("Too low")\n    else:\n        print("Too high")\nprint("Got it in", guesses, "guesses")')}${out("Guess: Too high\nGuess: Numbers only\nGuess: Too low\nGuess: Got it in 3 guesses")}</details>
        <h3>Exercise 9 ★★★ (Collatz)</h3>
        <p>Change the Collatz loop of Chapter 6 so that it tries every starting number from 1 to 30 and prints the starting number that takes the most steps, and how many steps that is. You need a loop inside a loop, and the largest-so-far pattern. Hint: <code>for start in range(1, 31):</code> makes <code>start</code> go 1, 2, …, 30.</p>
        <details class="reveal"><summary>Solution</summary><p>The inner <code>while</code> is the Collatz loop for one starting number; the outer <code>for</code> tries each start and keeps the largest step count seen so far:</p>${codeBlock("best_start = None\nbest_steps = None\nfor start in range(1, 31):\n    n = start\n    steps = 0\n    while n != 1:\n        if n % 2 == 0:\n            n = n // 2\n        else:\n            n = 3 * n + 1\n        steps = steps + 1\n    if best_steps is None or steps > best_steps:\n        best_start = start\n        best_steps = steps\nprint(best_start, best_steps)")}${out("27 111")}<p>Starting at 27 takes 111 steps (and climbs as high as 9232 on the way), while its neighbours 26 and 28 take only 10 and 18. Nobody knows a simple rule that predicts this.</p></details>` },
      { id: "ai", title: "Working with AI", html: `
        <p>An AI assistant writes <code>if</code> chains and loops instantly. Your job is to know whether they are right, and the bugs in this lecture are exactly the ones that slip through: a condition in the wrong order, a missing update, a bad starting value. Check any flow-control code, yours or an AI's, like this:</p>
        <ol><li><b>Boundary values.</b> For every comparison, test the value exactly on the boundary and one on each side. For <code>score &gt;= 90</code>, test 89, 90 and 91.</li>
        <li><b>Every branch.</b> Find an input that reaches each branch of an <code>if</code>/<code>elif</code> chain. If you cannot, the branch is dead code, or the conditions are in the wrong order.</li>
        <li><b>Loop progress.</b> For every <code>while</code> loop, point to the line that brings the condition closer to false.</li>
        <li><b>Starting values.</b> For every accumulator or “so far” variable, ask what happens on an empty list, a list of one item, and a list of negative numbers.</li>
        <li><b><code>try</code> blocks.</b> Is the <code>try</code> block short, and does the <code>except</code> name the error it expects?</li></ol>
        <p>Try this: ask an assistant for “a Python program that reads numbers until the user types done, then prints the largest and the smallest”. Then run the checklist. Does it work if the first number is negative? If the user types <code>done</code> straight away? If the user types <code>abc</code>? Ask it to fix what you find, and check again.</p>` },
      { id: "terms", title: "Key terms and further reading", html: `
        <p class="tags">${["flow control", "Boolean expression", "comparison operator", "assignment", "Boolean type (bool)", "truthy / falsy", "block", "indentation", "nested decision", "if / elif / else", "logical operator", "precedence", "short-circuit", "try / except", "list", "tuple", "index", "mutable / immutable", "while loop", "iteration", "iteration variable", "infinite loop", "break", "continue", "indefinite loop", "definite loop", "for loop", "accumulator", "filtering", "flag", "None", "identity (is)", "character code (ASCII)", "floating-point error"].map((t) => `<span class="tag">${t}</span>`).join("")}</p>
        <ul><li>C. Severance, <em>Python for Everybody</em> (Py4E), Chapter 3 (Conditional execution) and Chapter 5 (Iteration). Most of the slides' examples, from “Lather, Rinse” to largest-so-far, come from these chapters. <a href="https://www.py4e.com/book" target="_blank" rel="noopener">py4e.com/book</a></li>
        <li>J. DeNero, <em>Composing Programs</em>, §1.5 Control. <a href="https://www.composingprograms.com/pages/15-control.html" target="_blank" rel="noopener">composingprograms.com</a></li>
        <li>Y. D. Liang, <em>Introduction to Programming Using Python</em>, Chapter 4 (Selections) and Chapter 5 (Loops).</li>
        <li>Python documentation, <em>Floating-Point Arithmetic: Issues and Limitations</em>. <a href="https://docs.python.org/3/tutorial/floatingpoint.html" target="_blank" rel="noopener">docs.python.org</a></li></ul>` },
    ],
    takeaways: ["Conditions: Booleans, if/elif/else, and/or/not.", "Safety: try/except with a named error.", "Loops: while, for, and the six patterns."],
  },
];

const QUIZ = [
  { q: 'What is the value of <code>not 3 &gt; 5 and "a" &lt; "b"</code>?',
    opts: ["<code>True</code>", "<code>False</code>", "a <code>TypeError</code>", "<code>\"b\"</code>"],
    a: 0, why: '<code>not</code> comes first: <code>not (3 &gt; 5)</code> is <code>True</code>; <code>"a" &lt; "b"</code> is <code>True</code>; and <code>True and True</code> is <code>True</code>.' },
  { q: "What does this program print?",
    code: 'x = 7\nif x > 5:\n    print("A")\nelif x > 2:\n    print("B")\nif x > 6:\n    print("C")\nelse:\n    print("D")',
    opts: ["A", "A, then C", "A, B, then C", "A, then D"],
    a: 1, why: "<code>A</code> then <code>C</code>. The first decision is an <code>if</code>/<code>elif</code> chain, so only <code>A</code> is printed. The second <code>if</code> is a separate decision, and <code>7 &gt; 6</code>." },
  { q: "In the <code>try</code> block below, <code>int(text)</code> fails. Which lines run?",
    code: 'text = "3.5"\ntry:\n    number = int(text)\n    print("converted")\nexcept ValueError:\n    print("not an integer")\nprint("end")',
    opts: ["converted, end", "not an integer, end", "converted, not an integer, end", "the program stops with a ValueError"],
    a: 1, why: "<code>int(\"3.5\")</code> raises <code>ValueError</code> (<code>int</code> does not accept a decimal point), so <code>print(\"converted\")</code> is skipped. The program prints <code>not an integer</code>, then <code>end</code>." },
  { q: "How many times is the condition <code>k &lt; 10</code> tested in this loop, and what is printed?",
    code: "k = 1\nwhile k < 10:\n    k = k * 3\nprint(k)",
    opts: ["3 times; prints 9", "3 times; prints 27", "4 times; prints 27", "4 times; prints 9"],
    a: 2, why: "Four times: <code>k</code> is 1, 3, 9 (true each time) and then 27 (false). It prints <code>27</code>." },
  { q: "Why is <code>largest_so_far = 0</code> a bad start for finding the largest number in a list?",
    opts: ["0 is falsy, so the <code>if</code> never runs", "On a list of negative numbers, no item is larger than 0, so the answer would be 0, which is not in the list", "Python does not allow 0 as a starting value", "It makes the loop run one extra time"],
    a: 1, why: "On a list of negative numbers, no item is larger than 0, so the answer would be 0, which is not in the list. Start with <code>None</code>, or with the first item." },
];
