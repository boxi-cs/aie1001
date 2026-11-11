// Chapter content, adapted from notes/L02-python-basics.md. Code is copied from the note.

const demo = (name, title, instr, hint = "") =>
  `<div class="card demo" data-demo="${name}"><div class="head"><span class="title">${title}</span><span>${instr}</span></div>
   <div class="demo-body"></div>${hint ? `<p class="hint">${hint}</p>` : ""}</div>`;

const callout = (kind, label, body) => `<div class="callout ${kind}"><b>${label}</b>${body}</div>`;
const predict = (q, a) => callout("predict", "PREDICT", `<p>${q}</p><details class="reveal"><summary>Show the answer</summary>${a}</details>`);
const repl = (s) => codeBlock(s, "repl");

const VIDEO_P1 = "media/L02-1.mp4";
const VIDEO_P2 = "media/L02-2.mp4";
const VIDEO_P3 = "media/L02-3.mp4";
const VIDEO_P4 = "media/L02-4.mp4";
const out = (s) => codeBlock(s, "out");

const LECTURE = {
  number: 2,
  title: "Python Basics",
  tagline: "Names, values, expressions, input and output",
  lead: "What really happens when you write x = 10: names bound to objects, types, expressions evaluated one step at a time, and programs that talk to the user — interactive notes where every assignment can be stepped through.",
  heroDemo: "namesMini",
  heroLabel: "A live names-and-objects diagram · b = a",
  heroCaption: "b = a makes both names point at one object. a = 20 moves only a's arrow.",
  whyTitle: "Why this lecture matters",
  whySub: "Three ideas every later lecture builds on",
  why: [
    ["A picture of memory", "An assignment <b>binds a name to an object</b>. Draw the arrows and most beginner bugs disappear."],
    ["How Python computes", "Every expression is evaluated step by step: <b>operands first, then the operator</b>, by fixed precedence rules."],
    ["Talking to the user", "<code>input()</code> always gives a <b>string</b>; <code>print()</code> turns values into text. Convert between them on purpose."],
  ],
  ctaTitle: "Ready to see what x = 10 really does?",
  minutes: "About 60–75 minutes",
  videos: {
    [VIDEO_P1]: "Lecture 2 · Part 1 — Names and objects (8.8 min)",
    [VIDEO_P2]: "Lecture 2 · Part 2 — Types and expressions (9 min)",
    [VIDEO_P3]: "Lecture 2 · Part 3 — Assignment and arithmetic (8.7 min)",
    [VIDEO_P4]: "Lecture 2 · Part 4 — Input and output (7 min)",
  },
};

const CHAPTERS = [
  {
    slug: "1-shell", nav: "Shell", title: "Talking to Python",
    subtitle: "The interactive shell, scripts, and syntax errors",
    abstract: "Python answers one line at a time in the shell, or runs a whole file as a script. Only the shell shows the value of every expression you type.",
    tags: ["shell", "script", "SyntaxError", "print"],
    hero: "code:shellScript", heroCaption: "In a script, line 3 shows nothing.",
    sections: [
      { id: "video-1", title: "Watch: Names and objects", html: `
        <p>The first video of this lecture covers Chapters 1 and 2: the shell and scripts, what an assignment does, rebinding, = versus ==, and choosing names.</p>
        <div class="card video" data-video="${VIDEO_P1}"></div>` },
      { id: "shell", title: "The shell", html: `
        <p>Python comes with an <b>interactive shell</b>: you type one line after the <code>&gt;&gt;&gt;</code> prompt, press Enter, and Python answers at once. The shell is good for trying things out.</p>
        ${repl('>>> print("Hello, world!")\nHello, world!')}
        <p><code>print</code> is a <b>function</b>: a named piece of code that does a job. You call it by writing its name followed by parentheses, with what it should print inside them. The text in quotes, <code>"Hello, world!"</code>, is a <b>string</b>.</p>
        <p>You must say something Python can understand. Anything else is a <b>syntax error</b>: Python does not guess what you meant.</p>
        ${repl(">>> tell me who you are?\nTraceback (most recent call last):\n  ...\nSyntaxError: invalid syntax")}
        <p>A syntax error is not a judgement on you. Python knows its own language exactly and you are still learning it, the way a child learns to speak. It is far easier for you to learn Python than for the computer to learn English.</p>
        <p>To leave the shell, type <code>exit()</code> (or close the window).</p>` },
      { id: "scripts", title: "Scripts", html: `
        <p>The shell is fine for experiments of three or four lines. Real programs are longer, so we type them into a file and ask Python to run the whole file. Such a file is a <b>script</b> (or a <b>program</b>), and by convention its name ends in <code>.py</code>, for example <code>hello.py</code>.</p>
        <table><tr><th></th><th>interactive shell</th><th>script</th></tr>
        <tr><td>how you give the code</td><td>one line at a time after <code>&gt;&gt;&gt;</code></td><td>a whole file, run at once</td></tr>
        <tr><td>what you see</td><td>the value of every expression you type</td><td>only what the program prints</td></tr>
        <tr><td>good for</td><td>trying things, checking a value</td><td>anything you want to keep or rerun</td></tr></table>
        <p>The second row matters. In the shell, typing an expression on its own shows its value. In a script, an expression on its own line is computed and then thrown away:</p>
        ${codeBlock(CODE.shellScript)}
        ${out("30")}
        <p>The same lines typed into the shell show <code>30</code> twice: once because the shell echoes the value of <code>x + y</code>, and once because of <code>print</code>.</p>
        ${repl(">>> x = 10\n>>> y = 20\n>>> x + y\n30\n>>> print(x + y)\n30")}
        ${demo("shellScript", "Demo 1 · Shell or script?", "← → keys step", "Switch between the two ways of running the same lines and watch what reaches the screen.")}
        ${callout("pitfall", "PITFALL", `<p><b>“My script runs but shows nothing.”</b> Only <code>print</code> produces output in a script. If you want to see a value, print it.</p>`)}` },
      { id: "parts", title: "The parts of the language", html: `
        <p>Learning Python is like learning any language. There is <b>vocabulary</b>: the names you make up (variables) and the <b>reserved words</b> that Python already uses. There is <b>sentence structure</b>: the patterns Python accepts, called <b>syntax</b>. And there is <b>story structure</b>: putting sentences together into a program that does something useful. This lecture covers the vocabulary and the first kinds of sentence: assignments, expressions and <code>print</code>.</p>` },
    ],
    takeaways: ["The shell runs one line and shows its value.", "A script runs a whole .py file; only print shows output.", "A syntax error means Python could not read the line."],
  },
  {
    slug: "2-names", nav: "Names", title: "Names and Objects",
    subtitle: "What an assignment really does",
    abstract: "x = 10 does not put 10 in a box called x. It makes an object and binds the name x to it. Two names can share one object; rebinding one never changes the other.",
    tags: ["binding", "= is not ==", "rebinding", "naming rules"],
    hero: "namesMini", heroCaption: "b = a: two arrows, one object.",
    sections: [
      { id: "assign", title: "What an assignment does", html: `
        ${repl(">>> x = 10\n>>> y = 20\n>>> x\n10\n>>> x + y\n30")}
        <p>The line <code>x = 10</code> is an <b>assignment statement</b>. It does two things, in this order:</p>
        <ol><li>Python <b>evaluates</b> the right-hand side, <code>10</code>, and gets an <b>object</b>: a value in memory, here the integer ten.</li>
        <li>Python <b>binds</b> the name on the left, <code>x</code>, to that object. From now on, the name <code>x</code> refers to it.</li></ol>
        <p>A name together with the object it refers to is a <b>binding</b>. All the bindings of a program live in a <b>frame</b>; for the code in this lecture that is the <b>global frame</b>. A name that refers to an object is called a <b>variable</b>.</p>
        <p>We draw this as a <b>names-and-objects diagram</b>: names on the left, in the frame, objects on the right, and an arrow from each name to its object. This is the picture Python Tutor draws, and we use it in every lecture.</p>
        <p>Now assign to <code>x</code> again:</p>
        ${repl(">>> x = 20\n>>> print(x)\n20")}
        <p>The second assignment does not change the object 10. It makes a new object, 20, and moves the arrow of <code>x</code> to it. Nothing refers to the 10 any more, so Python frees its memory. This is <b>rebinding</b>: a name can be bound to a different object at any time, which is why it is called a <em>variable</em>.</p>
        ${callout("note", "NOTE · WHAT YOU MAY SEE WITH id()", `<p>The picture above is the rule Python promises: <code>=</code> binds a name to an object, and an object nobody refers to can be thrown away. CPython also keeps one shared copy of each small integer (−5 to 256), so the 10 above is not really freed, and two names bound to <code>20</code> may share one object. That is a speed trick, not part of the language: never write code that depends on it, and compare numbers with <code>==</code>, not <code>is</code> (Lecture 3).</p>`)}
        ${demo("names", "Demo 2 · Names and objects", "pick a program, then step", "Each assignment takes two steps: first the right side is evaluated (amber object), then the name's arrow moves. A dashed object has no name left: Python frees it.")}
        ${callout("note", "NOTE", `<p>The slides describe a variable as “a named space in the memory where a programmer can store data”, drawn as a box with a value in it. That picture works for the first examples but breaks as soon as two names share an object (below, and in Lecture 5 with lists). The slides' own environment diagram (slide 42, from CS61A) uses bindings, and so do these notes.</p>`)}` },
      { id: "equals", title: "= is not equality", html: `
        <p>In mathematics, <span class="math">x = x + 1</span> is a false statement. In Python, <code>x = x + 1</code> is an instruction: <em>evaluate <code>x + 1</code> using the current <code>x</code>, then bind <code>x</code> to the result.</em></p>
        ${repl(CODE.rebindSelf)}
        <p>Read <code>=</code> as “becomes” or “is bound to”, never as “equals”. The left side must be a name; the right side can be any expression. Python's test for equality is a different operator, <code>==</code> (Lecture 3).</p>
        ${repl(">>> 10 = x\nTraceback (most recent call last):\n  ...\nSyntaxError: cannot assign to literal...")}
        ${predict(`What does this print?${codeBlock(CODE.shareObj)}`,
          `${out("20 10")}<p><code>b = a</code> evaluates <code>a</code>, which gives the object 10, and binds <code>b</code> to <em>that same object</em>. Now two arrows point at one object. <code>a = 20</code> then moves only the arrow of <code>a</code>. <code>b</code> still refers to 10. Assignment never links two names together; it only binds a name to whatever object the right-hand side gives. Pick “b = a” in Demo 2 to watch it.</p>`)}
        ${callout("pitfall", "PITFALL", `<p><b>“A variable is a box that holds a copy, and <code>b = a</code> ties b to a.”</b> Neither is true. <code>b = a</code> makes <code>b</code> refer to the object <code>a</code> refers to <em>at that moment</em>. Changing what <code>a</code> refers to later does not affect <code>b</code>. Draw the arrows and you will not be fooled.</p>`)}` },
      { id: "naming", title: "Choosing names", html: `
        <p>Variable names are up to you, within these rules:</p>
        <ul><li>A name must start with a letter or an underscore <code>_</code>.</li>
        <li>It may contain only letters, digits and underscores.</li>
        <li>Names are <b>case sensitive</b>: <code>apple</code>, <code>Apple</code> and <code>APPLE</code> are three different names.</li>
        <li>It must not be a <b>reserved word</b> (keyword).</li></ul>
        <p>So <code>apple</code>, <code>car</code>, <code>my_number123</code> and <code>_light</code> are fine; <code>456aaa</code>, <code>#ab</code>, <code>var.12</code> and <code>course~name</code> are not.</p>
        ${repl(">>> 456aaa = 1\nTraceback (most recent call last):\n  ...\nSyntaxError: invalid decimal literal")}
        <p>The reserved words are part of the language itself, so they cannot be names:</p>
        ${out("False    await    else     import   pass\nNone     break    except   in       raise\nTrue     class    finally  is       return\nand      continue for      lambda   try\nas       def      from     nonlocal while\nassert   del      global   not      with\nasync    elif     if       or       yield")}
        ${repl(">>> class = 5\nTraceback (most recent call last):\n  ...\nSyntaxError: invalid syntax")}
        <p>Python can print this list for you:</p>
        ${repl(">>> import keyword\n>>> len(keyword.kwlist)\n35")}
        <p>Legal is not the same as good. What does this program do?</p>
        ${codeBlock("xlq3z0ocd = 35.0\nxlq3z0afd = 12.5\nxlq3p0ocd = xlq3z0ocd * xlq3z0afd\nprint(xlq3p0ocd)")}
        ${out("437.5")}
        <p>Python doesn't care, but a reader has no idea. With meaningful names the same program explains itself:</p>
        ${codeBlock(CODE.pay)}
        ${out("437.5")}
        ${callout("note", "NOTE", `<p>The slides suggest names like <code>myBankAccountID</code> and <code>numOfCards</code> (capitalise each new word, “camelCase”). Python's official style guide, <b>PEP 8</b>, uses lower-case words joined by underscores for variables and functions: <code>my_bank_account_id</code>, <code>num_of_cards</code>. These notes follow PEP 8; both are legal Python. Names written in capitals, like <code>SEC_PER_MIN</code>, mark a <b>constant</b> that the program does not change.</p>`)}` },
    ],
    takeaways: ["Evaluate the right side, then bind the name.", "Read = as “is bound to”.", "b = a shares an object; it doesn't link names."],
  },
  {
    slug: "3-types", nav: "Types", title: "Values and Types",
    subtitle: "int, float and str — and converting between them",
    abstract: "Every object has a type, and the type decides what operators do with it. A name has no type of its own; it just points at an object that has one.",
    tags: ["int", "float", "str", "type()", "int() float() str()"],
    hero: "typesMini", heroCaption: "An int meets a float: the result is a float.",
    sections: [
      { id: "video-2", title: "Watch: Types and expressions", html: `
        <p>The second video covers Chapters 3 and 4: int, float and str, converting between types, call expressions and the expression tree.</p>
        <div class="card video" data-video="${VIDEO_P2}"></div>` },
      { id: "constants", title: "Constants and types", html: `
        <p>Fixed values written directly in the code, like <code>10</code>, <code>3.14</code> or <code>"hello"</code>, are called <b>constants</b> (or <b>literals</b>): their value never changes. String constants can use single quotes <code>'...'</code> or double quotes <code>"..."</code>; the two mean the same thing.</p>
        <p>Every object has a <b>type</b>, and Python knows the difference between a number and a string:</p>
        ${repl('>>> a = 100 + 200\n>>> print(a)\n300\n>>> b = "100" + "200"\n>>> print(b)\n100200')}
        <p><code>+</code> on two numbers adds them. <code>+</code> on two strings joins them, which is called <b>concatenation</b>. The type of the objects decides what an operator does. Some operations are not allowed at all: you cannot add 1 to a string.</p>
        ${repl('>>> "100" + 1\nTraceback (most recent call last):\n  ...\nTypeError: can only concatenate str (not "int") to str')}
        <p>The function <code>type()</code> tells you the type of any value:</p>
        ${repl(">>> type(42)\n<class 'int'>\n>>> type(3.14)\n<class 'float'>\n>>> type(\"42\")\n<class 'str'>")}` },
      { id: "numbers", title: "Numbers: int and float", html: `
        <p>Python has two main kinds of numbers:</p>
        <ul><li><b>Integers</b> (<code>int</code>): whole numbers such as <code>1</code>, <code>100</code>, <code>-20394209</code>. Python's integers have no size limit.</li>
        <li><b>Floating-point numbers</b> (<code>float</code>): numbers with a decimal point, such as <code>2.5</code>, <code>-30.999</code>, or <code>5.0</code>. They are stored in binary with about 16 significant digits, so they are often very slightly off.</li></ul>
        <p>(There are other number types, such as complex numbers; we will not need them.)</p>
        ${repl(">>> 2 ** 100\n1267650600228229401496703205376\n>>> 0.1 + 0.2\n0.30000000000000004")}
        ${callout("pitfall", "PITFALL", `<p><b>Floats are approximate.</b> <code>0.1</code> cannot be stored exactly in binary, so <code>0.1 + 0.2</code> is not exactly <code>0.3</code>. Integers are always exact. Use integers for things you count (people, cents, seconds) and floats for things you measure.</p>`)}` },
      { id: "object-type", title: "The type belongs to the object", html: `
        <p>A name has no type of its own: it can be bound to an object of any type, and rebinding it to another type is fine. The type of a variable is just the type of the object it refers to <em>now</em>.</p>
        ${repl(">>> x = 7 * 3 * 2\n>>> y = \"is the answer to the ultimate question of life\"\n>>> print(x, y)\n42 is the answer to the ultimate question of life\n>>> x, y\n(42, 'is the answer to the ultimate question of life')\n>>> type(x), type(y)\n(<class 'int'>, <class 'str'>)\n>>> x = x + 3.14159\n>>> y = 1232121321312312312312 * 9873423789237438297\n>>> print(x, y)\n45.14159 12165255965071649871208683630735493412664\n>>> type(x), type(y)\n(<class 'float'>, <class 'int'>)")}
        ${demo("typeChange", "Demo 3 · The type belongs to the object", "← → keys step", "Watch the small type label next to each object. The names <code>x</code> and <code>y</code> never had a type; their objects do.")}
        ${predict("<code>print(x, y)</code> and <code>x, y</code> show the same two values differently. What is the difference?",
          `<p><code>print</code> shows each value as plain text, separated by a space. Typing <code>x, y</code> in the shell makes a pair (a <b>tuple</b>, Lecture 5), and the shell shows its value the way you would type it in code: strings with quotes, values separated by commas, in parentheses.</p>`)}` },
      { id: "convert", title: "Converting between types", html: `
        <p>When an expression mixes an <code>int</code> and a <code>float</code>, Python converts the <code>int</code> to a <code>float</code> first, so the result is a <code>float</code>. Division with <code>/</code> always gives a <code>float</code>, even when the answer is whole.</p>
        ${repl(">>> 1 + 2.0\n3.0\n>>> 6 / 3\n2.0\n>>> print(1 + 2 * float(3) / 4 - 5)\n-2.5")}
        ${demo("typesRewrite", "Demo 4 · Watch the types change", "pick an expression, then step", "The highlighted part is what Python does next. The message names the type of each new value.")}
        <p>You can convert on purpose with <code>int()</code>, <code>float()</code> and <code>str()</code>:</p>
        ${repl(">>> i = 42\n>>> type(i)\n<class 'int'>\n>>> f = float(i)\n>>> print(f)\n42.0\n>>> type(f)\n<class 'float'>\n>>> print(float(99) / 100)\n0.99\n>>> int(9.99)\n9\n>>> int(-9.99)\n-9")}
        <p><code>int()</code> of a float throws away the fractional part: it cuts towards zero, it does not round.</p>
        <p><code>int()</code> and <code>float()</code> also turn strings into numbers, as long as the string looks like a number of that kind:</p>
        ${repl(">>> int(\"42\") + 1\n43\n>>> float(\"3.14\")\n3.14\n>>> int(\"3.14\")\nTraceback (most recent call last):\n  ...\nValueError: invalid literal for int() with base 10: '3.14'\n>>> float(\"abc\")\nTraceback (most recent call last):\n  ...\nValueError: could not convert string to float: 'abc'")}
        <p>And <code>str()</code> turns any value into its text:</p>
        ${repl(">>> str(5)\n'5'\n>>> str(1 + 10 + 100)\n'111'\n>>> str(-12.34)\n'-12.34'\n>>> str(\"Hello World!\")\n'Hello World!'\n>>> x = 42\n>>> str(x)\n'42'")}
        ${demo("convert", "Demo 5 · Conversion table", "type your own value", "Each cell is computed by calling the function on the value. Red cells raise the named error.")}
        ${predict("What are the value and the type of each? <code>7 / 2</code>, <code>7 // 2</code>, <code>\"7\" * 2</code>, <code>int(\"7\") * 2</code>. (<code>//</code> is in Chapter 6; guess.)",
          `${repl(">>> 7 / 2, 7 // 2, \"7\" * 2, int(\"7\") * 2\n(3.5, 3, '77', 14)")}<p>A float, an int, a string and an int. Step through it in Demo 4.</p>`)}` },
    ],
    takeaways: ["Every object has a type: int, float, str.", "The type decides what + and * do.", "int(), float(), str() convert; / always gives a float."],
  },
  {
    slug: "4-expressions", nav: "Expressions", title: "Expressions",
    subtitle: "Evaluate the operator, evaluate the operands, apply",
    abstract: "An expression describes a computation and evaluates to a value. A call expression is evaluated by one rule, applied again and again from the inside out.",
    tags: ["call expression", "operator / operand", "expression tree"],
    hero: "callTreeMini", heroCaption: "add(add(6, mul(4, 6)), mul(3, 5)) evaluated leaf by leaf.",
    sections: [
      { id: "what", title: "What an expression is", html: `
        <p>An <b>expression</b> describes a computation and <b>evaluates</b> to a value. <code>18 + 45</code> is an expression; so is a single number or a single name. Mathematics writes computations in many different notations: 6⁄23, √2323478, |−1253|, 2<sup>100</sup>, 7 mod 2, Σ<sub>i=1</sub><sup>100</sup> i, log<sub>2</sub> 1024. Python writes all of them in only two forms: operators between values, and function calls.</p>
        ${repl(">>> 18 + 45\n63\n>>> abs(-1253)\n1253\n>>> 2 ** 100\n1267650600228229401496703205376\n>>> 7 % 2\n1\n>>> sum(range(1, 101))\n5050\n>>> import math\n>>> math.log2(1024)\n10.0")}
        <p>(<code>range</code> and <code>sum</code> come back in Lecture 3; <code>import</code> in Lecture 4.)</p>` },
      { id: "calls", title: "Call expressions", html: `
        <p>A <b>call expression</b> applies a function to some values. The <code>operator</code> module has <code>add</code> and <code>mul</code>, which do exactly what <code>+</code> and <code>*</code> do, written as calls. Import them first:</p>
        ${codeBlock("from operator import add, mul")}
        ${repl(">>> add(2, 3)\n5")}
        <p>In <code>add(2, 3)</code>, the part before the parentheses, <code>add</code>, is the <b>operator</b>. The parts inside, <code>2</code> and <code>3</code>, are the <b>operands</b>. Operators and operands are themselves expressions, so they can be calls too.</p>
        <p>To evaluate a call expression, Python always does the same three things:</p>
        <ol><li><b>Evaluate the operator</b> to get the function.</li>
        <li><b>Evaluate each operand</b>, from left to right, to get the arguments.</li>
        <li><b>Apply</b> the function to the arguments. The result is the value of the call.</li></ol>
        <p>Step 2 is where nesting happens: if an operand is itself a call, Python evaluates it with the same three steps before it can go on.</p>
        ${repl(">>> add(add(6, mul(4, 6)), mul(3, 5))\n45")}
        ${predict("Before reading on: in what order does Python <em>apply</em> the four functions in <code>add(add(6, mul(4, 6)), mul(3, 5))</code>? Which call finishes first?",
          `<p>Python works strictly left to right, and finishes the innermost call it meets first:</p><ol>
          <li>Evaluate <code>add</code> (the outer operator). Evaluate its first operand, <code>add(6, mul(4, 6))</code>: evaluate <code>add</code>, then <code>6</code>, then <code>mul(4, 6)</code> — evaluate <code>mul</code>, <code>4</code>, <code>6</code> and apply, giving <b>24</b>; apply <code>add</code> to 6 and 24, giving <b>30</b>.</li>
          <li>Evaluate the second operand, <code>mul(3, 5)</code>: evaluate <code>mul</code>, <code>3</code>, <code>5</code>; apply, giving <b>15</b>.</li>
          <li>Apply the outer <code>add</code> to 30 and 15, giving <b>45</b>.</li></ol>
          <p>So the order of application is <code>mul(4, 6)</code>, <code>add(6, 24)</code>, <code>mul(3, 5)</code>, <code>add(30, 15)</code>.</p>`)}
        <p>We can draw this as an <b>expression tree</b>: each call is a node, with its operator and operands below it. Evaluating the expression means evaluating the tree from the leaves up, left subtree before right subtree.</p>
        ${demo("callTree", "Demo 6 · The expression tree", "step or play", "The amber node is being evaluated; teal nodes are waiting for an operand. The green number under a node is its value.")}` },
      { id: "ops-calls", title: "Operators are calls in disguise", html: `
        <p><code>2 + 3</code> means the same as <code>add(2, 3)</code>, and <code>4 * 6</code> the same as <code>mul(4, 6)</code>. So the expression above is just</p>
        ${repl(">>> 6 + 4 * 6 + 3 * 5\n45")}
        <p>The call form spells out exactly which operation gets which operands. The operator form is shorter, but then Python needs rules to know which operator goes first. Those are the precedence rules in Chapter 6. (Pick <code>6 + 4 * 6 + 3 * 5</code> in Demo 6: it has the same tree.)</p>` },
    ],
    takeaways: ["An expression evaluates to a value.", "Call: evaluate operator, operands left to right, then apply.", "Nested calls form an expression tree."],
  },
  {
    slug: "5-assignment", nav: "Assignment", title: "Assignment",
    subtitle: "Cascaded, simultaneous, and the swap",
    abstract: "The right side is always evaluated completely before any name moves. That one rule explains x = x + 1, cascaded assignment, and why a, b = b, a swaps.",
    tags: ["environment diagram", "swap", "a, b = b, a"],
    hero: "swapMini", heroCaption: "c, o = o, c: both objects are fetched before either arrow moves.",
    sections: [
      { id: "video-3", title: "Watch: Assignment and arithmetic", html: `
        <p>The third video covers Chapters 5 and 6: assignment step by step, swapping two values, precedence, floor division, remainder, divmod and augmented assignment.</p>
        <div class="card video" data-video="${VIDEO_P3}"></div>` },
      { id: "statement", title: "The assignment statement", html: `
        <p>We have seen the rule: <em>evaluate the right side, then bind the name on the left.</em> The right side can be any expression, and it may use the name being assigned:</p>
        ${codeBlock(CODE.assignX)}
        ${out("107.4")}
        <p>The right side is evaluated completely, using the old <code>x</code> (6), giving 100 − 10 + 18 − 0.6 = 107.4. Only then is <code>x</code> rebound to 107.4.</p>
        ${callout("note", "NOTE", `<p>The slides write this example with a dash character <code>–</code> (as Word or PowerPoint does automatically). Python only accepts the plain minus sign <code>-</code>; copying the slide text into Python gives <code>SyntaxError: invalid character '–' (U+2013)</code>.</p>`)}
        <p>Here is the slides' environment-diagram example. Step through it in Python Tutor, or in Demo 7:</p>
        ${codeBlock(CODE.envDiagram)}
        ${out("4 2")}
        <p>After line 3 the global frame has <code>x</code> bound to 4 and <code>y</code> bound to 2. The object 1 has no name left.</p>
        ${demo("assign", "Demo 7 · Assignment, step by step", "pick a program, then step", "Every assignment: right side first (amber), then the arrows move. Try the three swaps one after the other.")}` },
      { id: "cascade", title: "Cascaded assignment", html: `
        <p>One statement can bind several names to the same object:</p>
        ${repl(CODE.cascade)}
        <p>The expression is evaluated once; then <code>z</code>, <code>y</code> and <code>x</code> are all bound to that one object, 11.</p>` },
      { id: "swap", title: "Swapping two values", html: `
        <p>A classic exercise: exchange the values of two variables. The obvious attempt fails:</p>
        ${codeBlock(CODE.badSwap)}
        ${out("2 2")}
        ${predict("Draw the names-and-objects diagram after each line of the program above. Where does the object 1 go?",
          `<p>After <code>a = b</code>, both names point at 2 and nothing points at 1 any more: it is lost. <code>b = a</code> then binds <code>b</code> to 2, which it already was. Pick “swap, wrong” in Demo 7 to check your drawing.</p>`)}
        <p>The fix is to keep a third name on the old value first:</p>
        ${codeBlock(CODE.tempSwap)}
        ${out("2 1")}` },
      { id: "simultaneous", title: "Simultaneous assignment", html: `
        <p>Python has a shorter way. In <b>simultaneous assignment</b>, the right side is a list of expressions separated by commas, and the left side has the same number of names:</p>
        ${repl(CODE.simSwap)}
        <p>The rule is the same as before, done in two complete phases: <b>first</b> every expression on the right is evaluated, <b>then</b> the names on the left are bound, in order. When <code>c, o = o, c</code> runs, both old objects are fetched before either name moves, so nothing is lost. (The shell shows <code>"you'll never guess"</code> in double quotes because the string contains a single quote.)</p>
        ${callout("pattern", "PATTERN · SWAP", `<p>To exchange two variables, write <code>a, b = b, a</code>.</p>`)}
        <p>Do not use simultaneous assignment just to save lines. This is legal but hard to read:</p>
        ${repl(">>> x, y = (45 + 34) / (21 - 4), 56 * 57 * 58 * 59\n>>> x, y\n(4.647058823529412, 10923024)")}
        <p>Two separate assignments say the same thing more clearly:</p>
        ${repl(">>> x = (45 + 34) / (21 - 4)\n>>> y = 56 * 57 * 58 * 59\n>>> x, y\n(4.647058823529412, 10923024)")}` },
    ],
    takeaways: ["Right side first, completely; then bind.", "z = y = x = … : one object, many names.", "Swap with a, b = b, a."],
  },
  {
    slug: "6-arithmetic", nav: "Arithmetic", title: "Arithmetic",
    subtitle: "Operators, precedence, //, % and augmented assignment",
    abstract: "Python follows school precedence rules, with two twists: ** groups to the right, and // rounds down — towards minus infinity, not towards zero.",
    tags: ["precedence", "//", "%", "divmod", "+="],
    hero: "precedenceMini", heroCaption: "1 + 2 ** 3 / 4 * 5, one operator at a time.",
    sections: [
      { id: "operators", title: "Operators", html: `
        <table><tr><th>operator</th><th>operation</th><th>example</th><th>value</th></tr>
        <tr><td><code>+</code></td><td>addition</td><td><code>7 + 2</code></td><td><code>9</code></td></tr>
        <tr><td><code>-</code></td><td>subtraction</td><td><code>7 - 2</code></td><td><code>5</code></td></tr>
        <tr><td><code>*</code></td><td>multiplication</td><td><code>7 * 2</code></td><td><code>14</code></td></tr>
        <tr><td><code>/</code></td><td>division</td><td><code>7 / 2</code></td><td><code>3.5</code></td></tr>
        <tr><td><code>//</code></td><td>floor division</td><td><code>7 // 2</code></td><td><code>3</code></td></tr>
        <tr><td><code>%</code></td><td>remainder (modulo)</td><td><code>7 % 2</code></td><td><code>1</code></td></tr>
        <tr><td><code>**</code></td><td>power</td><td><code>7 ** 2</code></td><td><code>49</code></td></tr></table>
        ${repl(">>> 7 + 2, 7 - 2, 7 * 2, 7 / 2, 7 // 2, 7 % 2, 7 ** 2\n(9, 5, 14, 3.5, 3, 1, 49)")}` },
      { id: "precedence", title: "Operator precedence", html: `
        <p>When an expression has several operators, Python needs to know which one to do first. The rules are called <b>operator precedence</b>. From highest to lowest:</p>
        <ol><li>Parentheses <code>( )</code>: always first.</li><li>Power <code>**</code>.</li>
        <li>Multiplication <code>*</code>, division <code>/</code>, floor division <code>//</code>, remainder <code>%</code>.</li><li>Addition <code>+</code> and subtraction <code>-</code>.</li></ol>
        <p>Operators on the same level are done <b>left to right</b> (except <code>**</code>; see the pitfall). This is the order you know from school mathematics.</p>
        ${repl(">>> x = 1 + 2 ** 3 / 4 * 5\n>>> x\n11.0")}
        <p>Step by step: <code>2 ** 3</code> first (power), giving 8. Then <code>/</code> and <code>*</code> from left to right: <code>8 / 4</code> is <code>2.0</code>, and <code>2.0 * 5</code> is <code>10.0</code>. Last, <code>1 + 10.0</code> is <code>11.0</code>. The answer is a float because <code>/</code> made one.</p>
        ${demo("precedence", "Demo 8 · One operator at a time", "pick an expression, then step", "Try the slides' two examples, then the two <code>**</code> surprises. Choose “your own…” to type any expression.")}
        ${predict("Evaluate <code>1 + 2 * 3 - 4 / 5 ** 6</code> one operator at a time. Which operator goes first, and what is the type of the result?",
          `${repl(">>> 1 + 2 * 3 - 4 / 5 ** 6\n6.999744")}<p><code>5 ** 6</code> first: 15625. Then <code>*</code> and <code>/</code>, left to right: <code>2 * 3</code> is 6, <code>4 / 15625</code> is 0.000256. Then <code>+</code> and <code>-</code>, left to right: <code>1 + 6</code> is 7, and <code>7 - 0.000256</code> is 6.999744, a float.</p>`)}
        ${callout("pitfall", "PITFALL · TWO SURPRISES WITH **", `<p>Power groups from the <em>right</em>: <code>2 ** 3 ** 2</code> is <code>2 ** 9</code>, not <code>8 ** 2</code>. And <code>**</code> binds tighter than a minus sign in front: <code>-2 ** 2</code> is <code>-(2 ** 2)</code>. When in doubt, add parentheses.</p>${repl(">>> 2 ** 3 ** 2\n512\n>>> -2 ** 2\n-4\n>>> (-2) ** 2\n4")}`)}
        <p>Parentheses cost nothing and save the reader from remembering the table. Keep expressions short, and break a long calculation into several named steps.</p>` },
      { id: "floor", title: "Floor division and remainder", html: `
        <p><code>//</code> is <b>floor division</b>: divide, then round <em>down</em> to a whole number. <code>%</code> gives the <b>remainder</b> that is left over.</p>
        ${repl(">>> time = 257\n>>> minutes = time // 60\n>>> print(\"There are\", minutes, \"complete minutes in\", time, \"seconds.\")\nThere are 4 complete minutes in 257 seconds.\n>>> time % 60\n17\n>>> 143 // 25\n5\n>>> 143.4 // 25\n5.0\n>>> 9 // 2.5\n3.0")}
        <p>With two ints, <code>//</code> gives an int; if either is a float, the result is a float with nothing after the point.</p>
        <p>“Round down” means towards minus infinity, not towards zero. For negative numbers that is not the same as dropping the fractional part:</p>
        ${repl(">>> -2 / 3\n-0.6666666666666666\n>>> -2 // 3\n-1\n>>> int(-2 / 3)\n0\n>>> -7 // 2, -7 % 2\n(-4, 1)")}
        <p>−2/3 ≈ −0.67, and the next whole number <em>down</em> is −1. Python keeps <code>//</code> and <code>%</code> consistent: for any <code>a</code> and <code>b</code>, <code>(a // b) * b + a % b == a</code>. With <code>b</code> positive, the remainder is always between 0 and <code>b - 1</code>, even when <code>a</code> is negative.</p>
        ${demo("floorDiv", "Demo 9 · // and % on the number line", "drag a and b", "The amber dot is the exact quotient. <code>//</code> always moves it <b>left</b> to a whole number; <code>int()</code> moves it towards 0. They differ only when the quotient is negative.")}
        ${callout("pitfall", "PITFALL", `<p><b><code>//</code> is not <code>int(a / b)</code>.</b> For positive numbers they agree. For a negative result, <code>//</code> rounds down (<code>-2 // 3</code> is <code>-1</code>) and <code>int()</code> cuts towards zero (<code>int(-2 / 3)</code> is <code>0</code>).</p>`)}` },
      { id: "divmod", title: "divmod() and augmented assignment", html: `
        <p>You often need both the quotient and the remainder. <code>divmod(a, b)</code> gives both at once, as a pair <code>(a // b, a % b)</code>. Use simultaneous assignment to unpack the pair:</p>
        ${repl(CODE.divmodTime)}
        <p>143 cents are 5 quarters (25 cents each) and 18 cents left over.</p>
        <p>Changing a variable by some amount is so common that Python has a short form, <b>augmented assignment</b>:</p>
        ${repl(CODE.augmented)}
        <p><code>x += 7</code> means <code>x = x + 7</code>, and <code>x -= 2 * 7</code> means <code>x = x - (2 * 7)</code>: the whole right side is evaluated first. In general,</p>
        ${out("name op= expression     means     name = name op (expression)")}
        <p>for any arithmetic operator <code>op</code>: <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code>, <code>//=</code>, <code>%=</code>, <code>**=</code>.</p>
        ${demo("augmented", "Demo 10 · Augmented assignment and divmod", "step through", "<code>x += 7</code> makes a new object and moves the arrow, exactly like <code>x = x + 7</code>.")}
        ${callout("pattern", "PATTERN · RUNNING TOTAL", `<p>To build up a result, start a variable at a neutral value and update it: <code>total = 0</code>, then <code>total += price</code> for each price. You will use this pattern in every loop from Lecture 3 on, where it is called the <b>accumulator</b>.</p>`)}` },
    ],
    takeaways: ["( ) → ** → * / // % → + −, left to right.", "// rounds down; % is what's left; divmod gives both.", "x += e means x = x + (e)."],
  },
  {
    slug: "7-io", nav: "Input/Output", title: "Programs: Flow, Input and Output",
    subtitle: "Comments, program flow, input() and print()",
    abstract: "A program runs line by line. It reads text with input(), converts it, computes, and prints the result — with sep and end to control the layout.",
    tags: ["comments", "input()", "BMI", "sep / end"],
    hero: "code:bmi", heroCaption: "Input, process, output.",
    sections: [
      { id: "video-4", title: "Watch: Input and output", html: `
        <p>The last video covers Chapter 7 and Working with AI: comments, program flow, input(), the BMI program, string operators, and print() with sep and end.</p>
        <div class="card video" data-video="${VIDEO_P4}"></div>` },
      { id: "comments", title: "Comments", html: `
        <p>Anything after a <code>#</code> on a line is a <b>comment</b>: Python ignores it.</p>
        ${codeBlock('# Convert a time in seconds to minutes and seconds.\ntime = 257                     # seconds\nminutes = time // 60\nseconds = time % 60\n# print("debug:", minutes)     # switched off for now\nprint(minutes, seconds)')}
        ${out("4 17")}
        <p>Use comments to say <em>why</em> or <em>what</em> a block of code does, to note who wrote it and when, and to switch a line off for a while. Don't repeat what the code already says: <code>x = 5  # set x to 5</code> helps nobody.</p>` },
      { id: "flow", title: "Program flow", html: `
        <p>A program is like a recipe: a list of steps done in a fixed order. In this lecture every program is <b>sequential</b>: Python runs line 1, then line 2, and so on, to the end.</p>
        ${codeBlock("x = 2\nprint(x)\nx = x * 10\nprint(x)")}${out("2\n20")}
        <p>Next week adds two other kinds of flow. <b>Conditional</b> steps may be skipped:</p>
        ${codeBlock('x = 5\nif x < 10:\n    print("smaller")\nif x > 20:\n    print("bigger")\nprint("finished")')}${out("smaller\nfinished")}
        <p><b>Repeated</b> steps (a <b>loop</b>) run again and again, with a variable that changes each time:</p>
        ${codeBlock('n = 5\nwhile n > 0:\n    print(n)\n    n = n - 1\nprint("Finish")')}${out("5\n4\n3\n2\n1\nFinish")}
        <p>A fourth kind, storing steps to reuse later, is a <b>function</b> (Lecture 4). Step through the <code>while</code> loop in <a href="https://pythontutor.com" target="_blank" rel="noopener">Python Tutor</a> and watch <code>n</code> being rebound each time round.</p>` },
      { id: "input", title: "input()", html: `
        <p><code>input()</code> stops the program, waits for the user to type a line and press Enter, and returns what they typed. If you give it a string, it prints that string first as a <b>prompt</b>.</p>
        ${codeBlock(CODE.hello)}
        ${out("What is your name? Hello, Alice")}
        ${callout("note", "NOTE", `<p>The output boxes on this page show only what the program prints (the user typed <code>Alice</code>). When you run it yourself, what you type also appears on the screen, after the prompt, so you see <code>What is your name? Alice</code> on one line and <code>Hello, Alice</code> on the next. Demo 11 below shows the screen that way.</p>`)}
        <p><code>input()</code> <b>always returns a string</b>, even when the user types digits:</p>
        ${codeBlock(CODE.addInputs)}
        ${out("First number: Second number: 34\n<class 'str'>")}
        <p><code>a</code> is the string <code>"3"</code> and <code>b</code> is <code>"4"</code>, so <code>+</code> joins them.</p>
        ${callout("pitfall", "PITFALL", `<p><b><code>input()</code> gives text, not a number.</b> To read a number, convert straight away: <code>int(input(...))</code> for a whole number, <code>float(input(...))</code> for any number. If the user types something that is not a number, the conversion raises <code>ValueError</code>; Lecture 3 shows how to handle that.</p>`)}` },
      { id: "bmi", title: "Example: body mass index", html: `
        <p>The <b>body mass index</b> is a person's weight in kilograms divided by the square of their height in metres: BMI = weight ⁄ height².</p>
        ${codeBlock(CODE.bmi)}
        ${out("Weight in kg: Height in m: Your BMI is 22.9")}
        <p>The program follows the <b>input, process, output</b> pattern: read the data, compute, print the result. <code>float(input(...))</code> is two calls: <code>input</code> runs first and returns a string, and <code>float</code> converts it. <code>height ** 2</code> is done before the division because <code>**</code> has higher precedence. <code>round(bmi, 1)</code> rounds to one decimal place (the exact value is 22.857142857142858).</p>
        ${demo("io", "Demo 11 · Programs that read input", "type the user's answers, then step", "Watch the string that <code>input()</code> returns: it appears as an object of type <code>str</code>, and <code>float()</code> or <code>int()</code> makes a new number from it. Change what the user types (comma-separated) and step again — try a weight of <code>abc</code>.")}
        ${callout("pattern", "PATTERN · INPUT, PROCESS, OUTPUT", `<p>Read all the input and convert it to the right types; compute with named variables; print the results. Keep the three parts apart.</p>`)}` },
      { id: "strings", title: "String operators", html: `
        <p>Two arithmetic operators also work on strings: <code>+</code> joins two strings, and <code>*</code> repeats a string a whole number of times.</p>
        ${repl(">>> \"Hello\" + \"World\"\n'HelloWorld'\n>>> \"ha\" * 3\n'hahaha'\n>>> \"-\" * 20\n'--------------------'")}
        <p>Python decides what <code>+</code> and <code>*</code> mean from the types of the operands. Mixing a string and a number with <code>+</code> is an error; turn the number into a string with <code>str()</code> first.</p>
        ${repl(">>> \"Score: \" + str(95)\n'Score: 95'")}` },
      { id: "print", title: "print()", html: `
        <p><code>print</code> takes any number of values, of any types, converts each to text and prints them separated by a space, then ends the line:</p>
        ${repl(">>> print(42, \"42\")\n42 42\n>>> print('3.14')\n3.14\n>>> print(3.14)\n3.14")}
        <p>The printed text does not show the type: <code>42</code> and <code>"42"</code> look the same. Use <code>type()</code> or the shell's echo when you need to know.</p>
        <p><code>print</code> has two optional <b>keyword arguments</b> that change this. <code>sep</code> is the string put <em>between</em> the values (default <code>" "</code>), and <code>end</code> is the string put <em>after</em> the last one (default <code>"\\n"</code>, a new line):</p>
        ${repl(">>> print(\"I\", \"like\", \"AI\")\nI like AI\n>>> print(\"I\", \"like\", \"AI\", sep=\"\")\nIlikeAI\n>>> print(\"I\", \"like\", \"AI\", sep=\",\")\nI,like,AI\n>>> minutes, seconds = 4, 17\n>>> print(minutes, \":\", seconds)\n4 : 17\n>>> print(minutes, \":\", seconds, sep=\"\")\n4:17")}
        ${predict(`What do these three programs print?${codeBlock('print("Test line 1")\nprint("Test line 2")')}${codeBlock('print("Test line 1", end=" ")\nprint("Test line 2")')}${codeBlock('print("Test line 1", end="---")\nprint("Test line 2")')}`,
          `${out("Test line 1\nTest line 2")}${out("Test line 1 Test line 2")}${out("Test line 1---Test line 2")}<p>With <code>end=" "</code>, the first <code>print</code> ends with a space instead of a new line, so the second continues on the same line.</p>`)}
        ${demo("print", "Demo 12 · sep and end", "edit the call", "Spaces are shown as amber dots and line ends as ↵, so you can see exactly what <code>sep</code> and <code>end</code> put where.")}
        <p>You can see all of <code>print</code>'s options with <code>help(print)</code> in the shell. There are two more, <code>file</code> and <code>flush</code>, which we will not need yet.</p>
        <p><b>Looking ahead.</b> How do you get part of a string, such as the first three letters of a name? That is <b>slicing</b>, in Lecture 4. Until then, the tools of this lecture (names, types, expressions, <code>input</code> and <code>print</code>) are enough to write many small programs.</p>` },
    ],
    takeaways: ["Programs run line by line; # starts a comment.", "input() always returns a str — convert it.", "print: sep between values, end after them."],
  },
  {
    slug: "8-summary", nav: "Summary", title: "Summary and Practice",
    subtitle: "Check yourself, then write some programs",
    abstract: "A one-page map of the lecture, five self-check questions, nine exercises with solutions, and a checklist for small programs an AI writes for you.",
    tags: ["knowledge map", "self-check", "exercises"],
    hero: "toc",
    sections: [
      { id: "map", title: "Knowledge map", html: `<div class="map">
        <div class="card"><h3>Names and objects</h3><ul><li>Evaluate the right side, then <b>bind</b></li><li><code>=</code> means “is bound to”</li><li><code>b = a</code>: one object, two names</li><li>Unnamed objects are freed</li></ul></div>
        <div class="card"><h3>Types</h3><ul><li><code>int</code>, <code>float</code>, <code>str</code></li><li>The type belongs to the object</li><li><code>int()</code>, <code>float()</code>, <code>str()</code> convert</li><li><code>/</code> always gives a float</li></ul></div>
        <div class="card"><h3>Expressions</h3><ul><li>Call: operator, operands, apply</li><li>Nested calls form a tree</li><li>Operators are calls in disguise</li></ul></div>
        <div class="card"><h3>Assignment</h3><ul><li>Cascaded: <code>z = y = x = …</code></li><li>Simultaneous: right side first</li><li>Swap: <code>a, b = b, a</code></li><li>Augmented: <code>x += e</code></li></ul></div>
        <div class="card"><h3>Arithmetic</h3><ul><li><code>( )</code> → <code>**</code> → <code>* / // %</code> → <code>+ -</code></li><li><code>**</code> groups to the right</li><li><code>//</code> rounds down; <code>%</code> remainder</li><li><code>divmod(a, b)</code></li></ul></div>
        <div class="card"><h3>Input and output</h3><ul><li><code>input()</code> returns a <code>str</code></li><li>Input, process, output</li><li><code>print(…, sep=…, end=…)</code></li><li>Shell echoes; scripts only print</li></ul></div></div>` },
      { id: "check", title: "Check your understanding", html: `<div data-demo="quiz"><div class="demo-body"></div></div>` },
      { id: "exercises", title: "Exercises", html: `
        <p>★ trace or modify · ★★ write · ★★★ extend or combine. Run every program you write on a normal input first, then on an unusual one (zero, a negative number, a decimal).</p>
        <h3>Exercise 1 ★ (trace)</h3>
        <p>Draw the names-and-objects diagram after each line, and write down what the program prints.</p>
        ${codeBlock("p = 3\nq = p * 2\np = q - p\nq = q + p\nprint(p, q)")}
        <details class="reveal"><summary>Solution</summary><p>After line 1: <code>p</code> → 3. Line 2: <code>q</code> → 6. Line 3: <code>q - p</code> is 3, so <code>p</code> → a new 3 (the old 3 is no longer named). Line 4: <code>q + p</code> is 9, so <code>q</code> → 9; the 6 is no longer named.</p>${out("3 9")}</details>
        <h3>Exercise 2 ★ (predict)</h3>
        <p>Write down the value of each expression, then check in the shell: <code>17 // 5</code>, <code>17 % 5</code>, <code>-17 // 5</code>, <code>-17 % 5</code>, <code>2 + 3 * 4 ** 2</code>, <code>(2 + 3) * 4 ** 2</code>, <code>"ab" * 2 + "c"</code>.</p>
        <details class="reveal"><summary>Solution</summary>${repl(">>> 17 // 5, 17 % 5, -17 // 5, -17 % 5\n(3, 2, -4, 3)\n>>> 2 + 3 * 4 ** 2, (2 + 3) * 4 ** 2\n(50, 80)\n>>> \"ab\" * 2 + \"c\"\n'ababc'")}
        <p>−17/5 = −3.4 rounds <em>down</em> to −4, and −4 · 5 + 3 = −17. In the second line, <code>4 ** 2</code> is 16 in both; the parentheses only change whether 3 or 5 multiplies it.</p></details>
        <h3>Exercise 3 ★ (find the bug)</h3>
        <p>This program should print the total price of two items, but for inputs 12 and 30 it prints <code>1230</code>. Explain why and fix it.</p>
        ${codeBlock('price1 = input("Price of item 1: ")\nprice2 = input("Price of item 2: ")\nprint("Total:", price1 + price2)')}
        ${out("Price of item 1: Price of item 2: Total: 1230")}
        <details class="reveal"><summary>Solution</summary><p><code>input()</code> returns strings, so <code>+</code> joins <code>"12"</code> and <code>"30"</code>. Convert each input when you read it:</p>
        ${codeBlock('price1 = float(input("Price of item 1: "))\nprice2 = float(input("Price of item 2: "))\nprint("Total:", price1 + price2)')}${out("Price of item 1: Price of item 2: Total: 42.0")}
        <p>Use <code>int</code> instead of <code>float</code> if prices are always whole numbers.</p></details>
        <h3>Exercise 4 ★ (modify)</h3>
        <p>Change the BMI program so that it reads the height in <em>centimetres</em> and prints the BMI rounded to 2 decimal places.</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock('weight = float(input("Weight in kg: "))\nheight_cm = float(input("Height in cm: "))\nheight = height_cm / 100\nbmi = weight / height ** 2\nprint("Your BMI is", round(bmi, 2))')}${out("Weight in kg: Height in cm: Your BMI is 22.86")}</details>
        <h3>Exercise 5 ★★</h3>
        <p>(Slide 66.) Write a program that asks for the names of two friends and prints <code>I am the friend of XX and YY.</code>, with the two names in place of XX and YY and no space before the full stop.</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(CODE.friends)}${out("First friend: Second friend: I am the friend of Alice and Bob.")}
        <p>With the default <code>sep=" "</code> there would be a space before the full stop. Joining with <code>+</code> also works: <code>"I am the friend of " + friend1 + " and " + friend2 + "."</code>.</p></details>
        <h3>Exercise 6 ★★</h3>
        <p>Write a program that reads a number of seconds and prints it as hours, minutes and seconds, like <code>3725 seconds is 1:2:5</code>. Use <code>divmod</code> twice.</p>
        <details class="reveal"><summary>Solution</summary><p>First split off the seconds, then split the remaining minutes into hours and minutes.</p>${codeBlock(CODE.hms)}${out("Seconds: 3725 seconds is 1:2:5")}</details>
        <h3>Exercise 7 ★★</h3>
        <p>Without using simultaneous assignment, rotate three variables: after your code, <code>a</code> should hold the old value of <code>b</code>, <code>b</code> the old <code>c</code>, and <code>c</code> the old <code>a</code>. Then do the same in one line with simultaneous assignment.</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock("a, b, c = 1, 2, 3\ntemp = a\na = b\nb = c\nc = temp\nprint(a, b, c)\na, b, c = 1, 2, 3\na, b, c = b, c, a\nprint(a, b, c)")}${out("2 3 1\n2 3 1")}<p>One extra name is enough: only the first value is overwritten before it is used.</p></details>
        <h3>Exercise 8 ★★★ (making change)</h3>
        <p>Write a program that reads an amount in cents (a whole number) and prints how many quarters (25), dimes (10), nickels (5) and pennies (1) make it up, using as many large coins as possible. For 143 it should print <code>5 quarters, 1 dimes, 1 nickels, 3 pennies</code>.</p>
        <details class="reveal"><summary>Solution</summary><p>Each <code>divmod</code> takes as many coins of one kind as fit, and passes the rest on.</p>${codeBlock(CODE.change)}${out("Amount in cents: 5 quarters, 1 dimes, 1 nickels, 3 pennies")}<p>Pick “making change” in Demo 11 to step through it.</p></details>
        <h3>Exercise 9 ★★★ (expression trees)</h3>
        <p>Draw the expression tree of <code>mul(add(2, mul(4, 6)), add(3, 5))</code>. In what order are the four calls applied, and what is the value? Then write the same expression with <code>+</code>, <code>*</code> and as few parentheses as possible.</p>
        <details class="reveal"><summary>Solution</summary><p>The calls are applied in the order <code>mul(4, 6)</code> → 24, <code>add(2, 24)</code> → 26, <code>add(3, 5)</code> → 8, <code>mul(26, 8)</code> → 208. Both operands of the outer <code>mul</code> are sums, so they need parentheses; <code>4 * 6</code> doesn't, because <code>*</code> goes before <code>+</code> anyway.</p>${repl(">>> mul(add(2, mul(4, 6)), add(3, 5))\n208\n>>> (2 + 4 * 6) * (3 + 5)\n208")}<p>Demo 6 has this expression too.</p></details>` },
      { id: "ai", title: "Working with AI", html: `
        <p>An AI assistant can write a program like the BMI calculator in a second. Your job is to check what it gives you. For short programs like this week's, check four things:</p>
        <ol><li><b>Types of the input.</b> Every <code>input()</code> gives a string. Is each one converted with <code>int()</code> or <code>float()</code> before any arithmetic? Is <code>int</code> right, or could the user type a decimal?</li>
        <li><b>Precedence.</b> Find every expression with more than one operator and say in which order Python does them. <code>weight / height ** 2</code> is right; <code>weight / height * height</code> is not.</li>
        <li><b>Division.</b> Does the code use <code>/</code>, <code>//</code> or <code>%</code>, and is it the right one? What happens with a negative number?</li>
        <li><b>Run it on test inputs you worked out by hand</b>: a normal case, and a boundary such as 0 or a very large number. Compare the output with your answer.</li></ol>
        <p>Try this: ask an assistant for “a Python program that reads a temperature in Celsius and prints it in Fahrenheit”. Check it with the list above, and test it on 0 (should give 32), 100 (212) and −40 (−40). Then ask it to explain <code>9 / 5</code> versus <code>9 // 5</code> in its formula, and check its explanation in the shell.</p>` },
      { id: "terms", title: "Key terms and further reading", html: `
        <p class="tags">${["interactive shell", "script", "syntax error", "function", "string", "assignment statement", "object", "binding", "name (variable)", "frame", "rebinding", "reserved word", "PEP 8", "constant (literal)", "type", "int", "float", "str", "concatenation", "expression", "evaluate", "call expression", "operator", "operand", "expression tree", "cascaded assignment", "simultaneous assignment", "operator precedence", "floor division", "remainder", "augmented assignment", "comment", "sequential flow", "prompt", "keyword argument"].map((t) => `<span class="tag">${t}</span>`).join("")}</p>
        <ul><li>C. Severance, <em>Python for Everybody</em> (Py4E), Chapter 1 (Why should you learn to write programs?) and Chapter 2 (Variables, expressions, and statements). <a href="https://www.py4e.com/book" target="_blank" rel="noopener">py4e.com</a></li>
        <li>J. DeNero, <em>Composing Programs</em>, §1.2 Elements of Programming (call expressions and expression trees) and §1.3 (environment diagrams). <a href="https://www.composingprograms.com/pages/12-elements-of-programming.html" target="_blank" rel="noopener">composingprograms.com</a></li>
        <li>PEP 8, the Python style guide, section <em>Naming Conventions</em>. <a href="https://peps.python.org/pep-0008/" target="_blank" rel="noopener">peps.python.org</a></li>
        <li>Python Tutor, to watch names being bound to objects: <a href="https://pythontutor.com" target="_blank" rel="noopener">pythontutor.com</a></li></ul>` },
    ],
    takeaways: ["Names bind to objects; right side first.", "Types decide what operators do.", "input() gives str; print() gives text."],
  },
];

const QUIZ = [
  { q: "After <code>a = 5</code>, <code>b = a</code>, <code>a = a + 1</code>, what are <code>a</code> and <code>b</code>?",
    opts: ["<code>a</code> is 6, <code>b</code> is 6", "<code>a</code> is 6, <code>b</code> is 5", "<code>a</code> is 5, <code>b</code> is 6", "an error: <code>a</code> can't equal <code>a + 1</code>"],
    a: 1, why: "<code>b = a</code> binds <code>b</code> to the object 5; <code>a = a + 1</code> makes a new object 6 and moves only the arrow of <code>a</code>." },
  { q: "Which of these is a legal variable name?",
    opts: ["<code>2nd_place</code>", "<code>my-name</code>", "<code>for</code>", "<code>_hidden</code>"],
    a: 3, why: "<code>_hidden</code> starts with an underscore: fine. <code>2nd_place</code> starts with a digit, <code>my-name</code> contains a minus sign, and <code>for</code> is a reserved word. (<code>total_2</code> and <code>For</code> are also legal; names are case sensitive, so <code>For</code> is not the keyword <code>for</code>, but it is a confusing choice.)" },
  { q: "What are the values of <code>10 / 5</code>, <code>10 // 4</code>, <code>10.0 // 4</code>, <code>-10 // 4</code>?",
    opts: ["<code>2, 2, 2, -2</code>", "<code>2.0, 2, 2.0, -3</code>", "<code>2.0, 2.5, 2.0, -2</code>", "<code>2, 2, 2.0, -3</code>"],
    a: 1, why: "<code>/</code> always gives a float (2.0). <code>10 // 4</code> is the int 2; with a float operand the result is the float 2.0. −2.5 rounds <em>down</em> to −3." },
  { q: "A student writes <code>age = input(\"Age: \")</code> and then <code>age + 1</code>. What happens?",
    opts: ["It works: Python sees that the user typed a number", "<code>TypeError</code>: <code>age</code> is a string; fix it with <code>age = int(input(\"Age: \"))</code>", "It gives <code>\"201\"</code> if the user types 20", "<code>SyntaxError</code>"],
    a: 1, why: "<code>input()</code> always returns a string, and a string and an int cannot be added: <code>TypeError: can only concatenate str (not \"int\") to str</code>. Convert when you read it." },
  { q: "What does <code>print(\"a\", \"b\", \"c\", sep=\"-\", end=\"!\")</code> print?",
    opts: ["<code>a b c!</code>", "<code>a-b-c-!</code>", "<code>a-b-c!</code> with no new line after it", "<code>a-b-c</code> and then <code>!</code> on the next line"],
    a: 2, why: "<code>sep</code> goes between the values, <code>end</code> after the last one instead of the usual new line." },
];
