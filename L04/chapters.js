// Chapter content, adapted from notes/L04-functions-strings-files.md. Code is copied from the note.

const demo = (name, title, instr, hint = "") =>
  `<div class="card demo" data-demo="${name}"><div class="head"><span class="title">${title}</span><span>${instr}</span></div>
   <div class="demo-body"></div>${hint ? `<p class="hint">${hint}</p>` : ""}</div>`;

const callout = (kind, label, body) => `<div class="callout ${kind}"><b>${label}</b>${body}</div>`;
const predict = (q, a) => callout("predict", "PREDICT", `<p>${q}</p><details class="reveal"><summary>Show the answer</summary>${a}</details>`);
const out = (text) => codeBlock(text, "out");
const repl = (text) => codeBlock(text, "repl");

const VIDEO_P1 = "media/L04-1.mp4";
const VIDEO_P2 = "media/L04-2.mp4";
const VIDEO_P3 = "media/L04-3.mp4";
const VIDEO_P4 = "media/L04-4.mp4";

const LECTURE = {
  number: 4,
  title: "Functions, Strings and Files",
  tagline: "Name your code, look inside text, read and write files",
  lead: "Functions with their frames, print versus return, scope, string indexing and slicing, string methods, and files read line by line — interactive notes where every call, slice and line can be stepped through.",
  heroDemo: "printReturnMini",
  heroLabel: "print is not return",
  heroCaption: "greet_return hands 'Hola' back to the caller. greet_print only shows it, and its call is worth None.",
  whyTitle: "Why this lecture matters",
  whySub: "Three tools you will use in every program from now on",
  why: [
    ["Functions", "Write a step once, give it a name, reuse it. Every call gets its own <b>frame</b>, and <b>return</b> hands the answer back."],
    ["Strings", "Text is a sequence you can <b>index</b>, <b>slice</b>, loop over and search, but never change in place."],
    ["Files", "Data that outlives your program. A <b>file handle</b> gives you a file one line at a time."],
  ],
  ctaTitle: "Ready to define your first function?",
  minutes: "About 75–90 minutes",
  videos: {
    [VIDEO_P1]: "Lecture 4 · Part 1 — Defining and calling functions (9.8 min)",
    [VIDEO_P2]: "Lecture 4 · Part 2 — Parameters and scope (7.3 min)",
    [VIDEO_P3]: "Lecture 4 · Part 3 — Strings and string methods (9 min)",
    [VIDEO_P4]: "Lecture 4 · Part 4 — Reading and writing files (7.1 min)",
  },
};

const CHAPTERS = [
  {
    slug: "1-functions", nav: "Functions", title: "Defining and Calling Functions",
    subtitle: "Stored and reused steps",
    abstract: "A function is a named paragraph of code. def creates it without running it; a call runs it in a fresh frame.",
    tags: ["def", "call", "frames"],
    hero: "flowMini", heroCaption: "def only binds the name. The body runs when print_lyrics() is called.",
    sections: [
      { id: "video-p1", title: "Watch: Defining and calling functions", html: `
        <p>Part 1 of this lecture's videos covers def and calls, frames, arguments and parameters, return values, and print versus return (Chapters 1 and 2).</p>
        <div class="card video" data-video="${VIDEO_P1}"></div>` },
      { id: "reuse", title: "Stored and reused steps", html: `
        <p>A recipe for tomato and egg stir-fry lists ingredients, then steps: <em>cut the tomatoes, beat the eggs, heat the oil…</em> If you cooked it every day you would not rewrite “beat the eggs” each time; you would refer to it by name. Programs are the same: some paragraphs of code are needed again and again. Python lets you give such a paragraph a name, and run it by writing its name. A named, reusable paragraph of code is a <b>function</b>.</p>
        ${codeBlock(CODE.hello)}
        ${out("Hello\nFunny\nSomething in the middle.\nHello\nFunny")}
        <p>The two lines inside <code>hello</code> were written once and ran twice.</p>
        ${callout("note", "NOTE", `<p>The slide calls this function <code>Hello</code>. These notes use Python's standard naming style (PEP 8): function and variable names in lower case, words joined by underscores. So <code>Hello</code> becomes <code>hello</code>, <code>AddTwo</code> becomes <code>add_two</code>, <code>printGrade</code> becomes <code>print_grade</code>, and <code>myStr</code> becomes <code>my_str</code>.</p>`)}` },
      { id: "kinds", title: "Two kinds of function", html: `
        <ul><li><b>Built-in functions</b> come with Python: <code>print()</code>, <code>input()</code>, <code>int()</code>, <code>float()</code>, <code>len()</code>, <code>max()</code>, <code>min()</code>, …</li>
        <li><b>Functions we define ourselves</b>, with <code>def</code>, and then use.</li></ul>
        <p>Treat the names of built-in functions like reserved words: don't use them as variable names. After <code>max = 5</code>, the name <code>max</code> no longer refers to the built-in function, and <code>max("abc")</code> fails.</p>
        <p>A function takes some input, does some computation, and gives back a result. We <b>call</b> (or <b>invoke</b>) a function by writing its name, then parentheses with the input inside:</p>
        ${repl(`>>> big = max("Hello world")
>>> print(big)
w
>>> small = min("Hello world")
>>> small
' '`)}
        <p>The input <code>"Hello world"</code> is an <b>argument</b>; the value the call gives back is its <b>result</b>. <code>max</code> of a string is its “largest” character, <code>"w"</code>; <code>min</code> is its smallest, which is the space between the words.</p>` },
      { id: "def", title: "What def does, and what it doesn't", html: `
        <p>A <b>function definition</b> has this shape:</p>
        ${codeBlock("def <name>(<parameters>):\n    <body>", "out")}
        <p>The first line is the function's <b>signature</b>: its name and its parameters. The indented lines after it are its <b>body</b>. When Python executes a <code>def</code> statement, it:</p>
        <ol><li>creates a function with that signature,</li><li>sets the body of the function to everything indented below the first line,</li><li>binds the name to that function in the current frame.</li></ol>
        <p>So <code>def</code> is a kind of assignment: it binds a name to a function value, just as <code>x = 5</code> binds a name to a number. It does <b>not</b> run the body. The body runs only when the function is called.</p>
        ${predict("What does this program print, in what order?" + codeBlock(CODE.lyricsNoCall),
          `${out("Hello\nYo\n7")}<p>The lyrics are never printed: the function was defined but never called.</p>`)}
        <p>Add one call:</p>
        ${codeBlock(CODE.lyrics, "py", [11])}
        ${out("Hello\nYo\nI am a lumberjack, and I am okay.\nI sleep all night and I work all day.\n7")}
        ${demo("flow", "Demo 1 · Follow the flow of execution", "step through it; switch the call off", "Watch the global frame: <code>def</code> adds the name <code>print_lyrics</code> but runs nothing. Only the call on line 11 pushes a frame.")}` },
      { id: "call", title: "What a call does", html: `
        <p>When Python reaches <code>print_lyrics()</code>, it:</p>
        <ol><li>creates a new <b>frame</b> for the call (a fresh area for the call's own variables),</li>
        <li>jumps into the body and runs it, top to bottom,</li>
        <li>when the body ends (or reaches <code>return</code>), throws the frame away and continues with the line after the call.</li></ol>
        <p>The program's own variables, like <code>x</code>, live in the <b>global frame</b>. While <code>print_lyrics</code> runs, its frame sits on top of the global frame; afterwards only the global frame is left. You will see these frames again and again: Lecture 6 builds recursion on exactly this picture.</p>
        ${callout("pitfall", "PITFALL · “DEFINING A FUNCTION RUNS IT”", `<p>It does not. <code>def</code> only creates the function and binds its name. If nothing calls it, its body never runs. And a function must be defined <em>before</em> the line that calls it runs, or you get <code>NameError</code>.</p>`)}` },
    ],
    takeaways: ["A function is named, reusable code.", "def binds a name; it does not run the body.", "Each call gets its own frame."],
  },
  {
    slug: "2-return", nav: "Return", title: "Arguments, Parameters and Return Values",
    subtitle: "What goes into a function, and what comes back",
    abstract: "Arguments go in and are bound to parameters. return hands a value back. print only shows a value, and a function without return gives back None.",
    tags: ["argument", "parameter", "print vs return", "None"],
    hero: "printReturnMini", heroCaption: "The same two lines of output, two very different functions.",
    sections: [
      { id: "args", title: "Arguments and parameters", html: `
        <p>An <b>argument</b> is a value we pass into a function when we call it. Arguments let one function do different work on different calls. In <code>max("I am the one")</code> the argument is the string <code>"I am the one"</code>.</p>
        <p>A <b>parameter</b> is a variable in the function definition. When the function is called, the parameter is bound to the argument in the call's new frame: it is the function's “handle” on the argument for that particular call.</p>
        ${codeBlock(CODE.greetPrint)}
        ${repl(`>>> greet("en")
Hello
>>> greet("es")
Hola
>>> greet("fr")
Bonjour`)}
        <p>In the call <code>greet("es")</code>, <code>"es"</code> is the argument and <code>lang</code> is the parameter: the new frame starts with <code>lang = "es"</code>.</p>` },
      { id: "return", title: "Return values", html: `
        <p>Often a function takes its arguments, computes something, and <b>returns</b> a value. The <code>return</code> statement ends the function and sends the value back to the caller. The call expression then <em>has</em> that value, exactly as <code>len("hi")</code> has the value 2.</p>
        ${codeBlock(CODE.greetSimple)}
        ${out("Hello Glenn\nHello Sally")}
        <p>A function that returns a value is called a <b>fruitful function</b>. Here is <code>greet</code> with a language parameter, written as a fruitful function:</p>
        ${codeBlock(CODE.greetReturn)}
        ${repl(`>>> print(greet("en"), "Glenn")
Hello Glenn
>>> print(greet("es"), "Sally")
Hola Sally
>>> print(greet("fr"), "Michael")
Bonjour Michael`)}
        <p><code>return</code> ends the call at once: once <code>return "Hola"</code> runs, the rest of the body is skipped.</p>` },
      { id: "print-vs-return", title: "Print is not return", html: `
        <p><code>print</code> and <code>return</code> both seem to “give back” a result, and beginners mix them up more than anything else in this lecture. They are different:</p>
        <table><tr><th></th><th><code>print(value)</code></th><th><code>return value</code></th></tr>
        <tr><td>what it does</td><td>shows the value on the screen</td><td>hands the value back to the caller</td></tr>
        <tr><td>who can use the value</td><td>only a human reading the screen</td><td>the program: store it, compare it, pass it on</td></tr>
        <tr><td>does the function end?</td><td>no, the next line runs</td><td>yes, at once</td></tr>
        <tr><td>what the call evaluates to</td><td><code>None</code>, if there is no <code>return</code></td><td>the value</td></tr></table>
        <p>A function that only prints still returns something: if the body ends without a <code>return</code>, the call returns the special value <b><code>None</code></b> (“no value”).</p>
        ${codeBlock(CODE.printVsReturn.split("\n\n\nprint(")[0])}
        ${predict(`What does each line print?${codeBlock(`print(greet_return("es"), "Sally")
print(greet_print("es"), "Sally")`)}`,
          `${out("Hola Sally\nHola\nNone Sally")}<p>For the second line, Python must first evaluate the argument <code>greet_print("es")</code>. That call <em>prints</em> <code>Hola</code> on a line of its own, then ends without <code>return</code>, so its value is <code>None</code>. Only then does the outer <code>print</code> run, with the two values <code>None</code> and <code>"Sally"</code>.</p>`)}
        ${demo("printReturn", "Demo 2 · print versus return", "step through both lines", "The amber box shows the expression Python is evaluating. Watch the call being replaced by its value: <code>'Hola'</code> in the first line, <code>None</code> in the second.")}
        <p>The difference shows as soon as you use the result in the program:</p>
        ${repl(`>>> greet_return("es") == "Hola"
True
>>> greet_print("es") == "Hola"
Hola
False
>>> answer = greet_print("es")
Hola
>>> print(answer)
None`)}
        ${callout("pitfall", "PITFALL · PRINTING INSIDE A FUNCTION INSTEAD OF RETURNING", `<p>If a function's job is to compute a value, <code>return</code> it. Let the caller decide whether to print it. A function that prints its answer can't be used in an <code>if</code>, a sum, a test or another function, and storing its “result” gives you <code>None</code>. These notes always return from functions and print in the caller.</p>`)}` },
      { id: "void", title: "Fruitful and void functions", html: `
        <p>A function that returns a value is <b>fruitful</b>. A function that doesn't is called a <b>void</b> function (“not fruitful”); its calls return <code>None</code>. <code>print_lyrics</code> and <code>greet_print</code> are void; <code>greet_return</code>, <code>max</code> and <code>len</code> are fruitful.</p>
        <p>Void functions are useful when the <em>effect</em> is the point, such as printing a report. The slides' grade example is one:</p>
        ${codeBlock(CODE.printGrade)}
        <p>Run <code>main()</code> and type <code>85</code>; the screen shows:</p>
        ${out("Enter a score: 85\nThe grade is  B")}
        ${callout("note", "NOTE", `<p>The slide reads the score with <code>eval(input(...))</code>. Use <code>float(input(...))</code> instead: <code>eval</code> runs whatever the user types as Python code, which is unsafe, and it is not what you want for reading a number. Also, <code>print_grade</code> would be more reusable as <code>grade(score)</code> that <em>returns</em> the letter (Exercise 3).</p>`)}` },
    ],
    takeaways: ["Arguments are bound to parameters in a new frame.", "return hands a value back and ends the call.", "No return means the call is worth None."],
  },
  {
    slug: "3-params", nav: "Parameters", title: "More About Parameters",
    subtitle: "Several parameters, defaults, keywords, several results",
    abstract: "Arguments match parameters by position or by name, and a parameter can have a default. A function can return several values at once. And a few reasons to write functions at all.",
    tags: ["default value", "keyword argument", "compute_pay"],
    hero: "code:sortPair", heroCaption: "Returning two values",
    sections: [
      { id: "video-p2", title: "Watch: Parameters and scope", html: `
        <p>Part 2 of this lecture's videos covers several parameters, default and keyword arguments, returning several values, local and global variables, and why we write functions (Chapters 3 and 4).</p>
        <div class="card video" data-video="${VIDEO_P2}"></div>` },
      { id: "several", title: "Several parameters", html: `
        <p>A function can have several parameters. A call then passes several arguments, and they are matched <b>by position</b>: the first argument to the first parameter, and so on. The number of arguments must match the number of parameters.</p>
        ${codeBlock(CODE.addTwo)}${out("8")}` },
      { id: "defaults", title: "Default and keyword arguments", html: `
        <p>A parameter can have a <b>default value</b>, used when the call leaves that argument out. A call can also name its arguments, <code>height=5</code>: these <b>keyword arguments</b> are matched by name, so their order doesn't matter.</p>
        ${codeBlock(CODE.printArea)}
        ${out("width: 1 height: 2 area: 2\nwidth: 4 height: 2.5 area: 10.0\nwidth: 3 height: 5 area: 15\nwidth: 1.2 height: 2 area: 2.4\nwidth: 1 height: 6.2 area: 6.2")}
        ${demo("args", "Demo 3 · How arguments are bound", "step through the five calls", "The table under the code says where each parameter's value came from: <b class='mono' style='color:var(--teal)'>positional</b>, <b class='mono' style='color:var(--amber)'>keyword</b> or <span class='mono' style='color:var(--stone)'>default</span>.")}
        <p>You have used keyword arguments already: <code>print</code> has the parameters <code>sep</code> (the string put between values, default a space) and <code>end</code> (the string put after the last value, default a newline <code>"\\n"</code>).</p>
        ${codeBlock(`print("a", "b", "c", sep="-")
print("no newline", end="")
print("!")`)}
        ${out("a-b-c\nno newline!")}
        ${predict("<code>print_area(3)</code> — what is printed?", `${repl(">>> print_area(3)\nwidth: 3 height: 2 area: 6")}<p>3 goes to the first parameter, <code>width</code>, by position; <code>height</code> keeps its default 2.</p>`)}` },
      { id: "multiple", title: "Returning several values", html: `
        <p>A function can return several values, separated by commas. The caller receives them with a <b>simultaneous assignment</b>, one name per value:</p>
        ${codeBlock(CODE.sortPair)}
        ${out("n1 is 2\nn2 is 3")}
        ${callout("note", "NOTE", `<p>The slide calls this function <code>sort</code>. These notes call it <code>sort_pair</code>: lists already have a <code>sort</code> method, and a name that says what the function returns is clearer. (Strictly, <code>return a, b</code> returns one <em>tuple</em> <code>(a, b)</code>, and <code>n1, n2 = ...</code> unpacks it. Tuples come in a later lecture.)</p>`)}` },
      { id: "why", title: "To function or not to function", html: `
        <ul><li><b>Organise</b> your code into paragraphs: capture one complete thought and give it a name.</li>
        <li><b>Don't repeat yourself</b>: write it once, name it, reuse it. A bug fixed in the function is fixed everywhere.</li>
        <li><b>Break up</b> anything that grows too complex into smaller blocks, each its own function.</li>
        <li><b>Build a library</b> of things you do over and over, and share it with other people.</li></ul>
        ${callout("pattern", "PATTERN · COMPUTE IN A FUNCTION, TALK TO THE USER IN MAIN", `<p>Put the computation in a fruitful function with parameters. Put <code>input()</code> and <code>print()</code> in <code>main()</code> (or at the top level). The function can then be tested by calling it, without typing anything.</p>`)}
        <p>The slides' practice problem: ask the user for the working hours and the hourly rate, and compute the salary; hours over 40 are paid at 1.5 times the rate.</p>
        ${codeBlock(CODE.computePay + "\n\n\n" + CODE.computePayMain)}
        <p>With the inputs 45 and 10, <code>main()</code> prints <code>Pay: 475.0</code>. And because <code>compute_pay</code> returns, it can be checked directly:</p>
        ${repl(">>> compute_pay(40, 10)\n400\n>>> compute_pay(45, 10)\n475.0")}
        ${demo("pay", "Demo 4 · compute_pay", "move the sliders, then step", "Under 40 hours one <code>return</code> runs; over 40 the other one does. Either way the call ends at the first <code>return</code> it reaches.")}` },
    ],
    takeaways: ["Positional by order, keyword by name, default if left out.", "return a, b gives back two values.", "Compute in functions; talk to the user in main."],
  },
  {
    slug: "4-scope", nav: "Scope", title: "Scope: Local and Global Variables",
    subtitle: "Which frame does a name live in?",
    abstract: "A variable assigned inside a function lives in that call's frame and disappears with it. Globals live in the global frame. Same name, different scope, different variable.",
    tags: ["local", "global", "global keyword"],
    hero: "scopeMini", heroCaption: "Two variables called x, one in each frame.",
    sections: [
      { id: "local", title: "Local and global variables", html: `
        <p>The <b>scope</b> of a variable is the part of the program where it can be used.</p>
        <ul><li>A variable created inside a function is a <b>local variable</b>. It lives in the call's frame and disappears when the call ends.</li>
        <li>A variable created outside all functions is a <b>global variable</b>. It lives in the global frame and can be read from inside functions.</li></ul>
        ${codeBlock(CODE.scopeLocal)}${out("1\n2\n1")}
        ${repl(`>>> print(local_var)  # out of scope, so this gives an error
Traceback (most recent call last):
  ...
NameError: name 'local_var' is not defined`)}` },
      { id: "shadow", title: "Same name, different scopes", html: `
        <p>Different variables may share a name if they have different scopes. Assigning to a name inside a function creates a <em>local</em> variable, even if a global variable has the same name:</p>
        ${predict(`What are the two printed numbers?${codeBlock(CODE.scopeShadow.replace(/  # displays \d/g, ""))}`, `${out("2\n1")}<p>There are two variables called <code>x</code>: one in the global frame, one in the frame of the call <code>f1()</code>. The assignment <code>x = 2</code> creates the local one; the global <code>x</code> is untouched.</p>`)}
        ${demo("scope", "Demo 5 · Frames and scope", "pick a program, then step", "The bottom box is the global frame; a call's frame sits on top of it while the call runs. A name is looked up in the top frame first, then in the global frame.")}` },
      { id: "global", title: "The global keyword", html: `
        <p>To change a global variable from inside a function, declare it with the keyword <code>global</code>:</p>
        ${codeBlock(CODE.scopeGlobal)}${out("2\n2")}
        ${callout("pitfall", "PITFALL · USE GLOBAL RARELY", `<p>A function that changes global variables is hard to test and reuse, because its result depends on, and changes, state outside it. Pass values in as arguments and send results out with <code>return</code>:</p>
          ${codeBlock(`def increased(x):
    return x + 1`)}${repl(">>> x = 1\n>>> x = increased(x)\n>>> x\n2")}`)}` },
    ],
    takeaways: ["Assigned in a function → local to that call.", "Locals vanish when the call ends.", "Prefer parameters and return to global."],
  },
  {
    slug: "5-strings", nav: "Strings", title: "Strings",
    subtitle: "An immutable sequence of characters",
    abstract: "Index from 0, slice up to but not including the stop, loop with for, test with in — and remember a string can never be changed in place.",
    tags: ["index", "slice", "len", "for", "immutable"],
    hero: "sliceMini", heroCaption: "s = 'Monty Python': highlighted cells are the slice.",
    sections: [
      { id: "video-p3", title: "Watch: Strings and string methods", html: `
        <p>Part 3 of this lecture's videos covers indexing, len, loops, immutability, slicing, in, the string methods and the e-mail parsing example (Chapters 5 and 6).</p>
        <div class="card video" data-video="${VIDEO_P3}"></div>` },
      { id: "type", title: "The string type", html: `
        <p>A <b>string</b> is a sequence of characters. A string literal is written in single or double quotes. For strings, <code>+</code> means <b>concatenate</b> (join). A string that contains digits is still a string; convert it with <code>int()</code> or <code>float()</code> to compute with it.</p>
        ${repl(`>>> "Hello" + "there"
'Hellothere'
>>> "123" + "1"
'1231'
>>> int("123") + 1
124
>>> "123" + 1
Traceback (most recent call last):
  ...
TypeError: can only concatenate str (not "int") to str`)}
        <p><code>input()</code> always returns a string. It is good practice to read data as strings and then convert, so you control what happens with bad input. That is why every number read in this lecture goes through <code>float(input(...))</code>.</p>` },
      { id: "index", title: "Looking inside: indexing", html: `
        <p>Each character of a string has an <b>index</b>, its position, starting from <b>0</b>. Square brackets get one character. The index must be an integer, and it can be an expression.</p>
        ${out(` b   a   n   a   n   a
 0   1   2   3   4   5
-6  -5  -4  -3  -2  -1`)}
        ${repl(`>>> fruit = "banana"
>>> letter = fruit[1]
>>> print(letter)
a
>>> n = 3
>>> w = fruit[n - 1]
>>> print(w)
n`)}
        <p>A negative index counts from the end: <code>fruit[-1]</code> is the last character.</p>
        ${repl(`>>> fruit = "banana"
>>> fruit[-1]
'a'
>>> fruit[0]
'b'`)}
        ${predict("<code>fruit[1]</code> is <code>'a'</code>, not <code>'b'</code>. Why? What is the index of the last character of a string of length 6?",
          `<p>Indexes start at 0, so <code>fruit[1]</code> is the <em>second</em> character, and the last one has index 5, which is <code>len(fruit) - 1</code>. Indexing past the end is an error:</p>${repl(`>>> a = "hi"
>>> print(a[2])
Traceback (most recent call last):
  ...
IndexError: string index out of range`)}`)}` },
      { id: "len", title: "Length", html: `
        <p>The built-in function <code>len()</code> gives the number of characters in a string:</p>
        ${repl(`>>> fruit = "banana"
>>> print(len(fruit))
6
>>> length = len("apple")
>>> print(length)
5`)}
        <p><code>len</code> is a function someone else wrote (Guido van Rossum, who created Python): a string goes in, a number comes out.</p>` },
      { id: "loop", title: "Looping through a string", html: `
        <p>A <code>for</code> loop visits each character of a string in turn:</p>
        ${codeBlock(CODE.forLoop)}
        ${out("0 M\n1 o\n2 r\n3 p\n4 h\n5 e\n6 u\n7 s\nfinished")}
        <p>(The slide loops over <code>'I am the one,Morpheus'</code>; a shorter string keeps the output short. Note that <code>i</code> is a character here, not an index; the counter <code>n</code> is the index.)</p>
        <p>In <code>for letter in "banana":</code>, <code>letter</code> is the <b>iteration variable</b>. It moves through all the values of the sequence, one per pass, and the body runs once for each value.</p>
        <p>The same loop with <code>while</code> keeps the index itself (the slides' practice problem):</p>
        ${codeBlock(CODE.whileLoop)}
        ${out("0 b\n1 a\n2 n\n3 a\n4 n\n5 a")}
        ${callout("pattern", "PATTERN · COUNTING IN A LOOP", `<p>Set a counter to 0 before the loop; inside the loop, add 1 whenever the condition holds; use the counter after the loop.</p>`)}
        ${codeBlock(CODE.countA("banana"))}
        ${out("The number of 'a' we have seen is: 3")}
        ${demo("count", "Demo 6 · The counting loop", "change the word, then step", "The teal cell is the current value of <code>letter</code>; it turns amber when it matches and <code>count</code> goes up.")}` },
      { id: "immutable", title: "Strings can't be changed", html: `
        <p>A string is an <b>immutable</b> sequence: once made, its characters can't be changed.</p>
        ${repl(`>>> greeting = "Hello"
>>> greeting[0] = "J"
Traceback (most recent call last):
  ...
TypeError: 'str' object does not support item assignment`)}
        <p>To get a different string, build a new one, for example from slices:</p>
        ${repl(`>>> greeting = "Hello"
>>> new_greeting = "J" + greeting[1:]
>>> new_greeting
'Jello'
>>> greeting
'Hello'`)}
        ${callout("pitfall", "PITFALL · “A STRING IS A LIST OF CHARACTERS”", `<p>The slides say a string is “essentially a list”; it is not. Strings and lists are both <em>sequences</em>, so both support indexing, slicing, <code>len</code> and <code>for</code>. But a list can be changed in place and a string can't. Every string operation that seems to change a string, like <code>upper()</code> or <code>replace()</code>, actually returns a new string.</p>`)}` },
      { id: "slice", title: "Slicing", html: `
        <p>A <b>slice</b> <code>s[start:stop]</code> is the part of a string from index <code>start</code> up to <b>but not including</b> <code>stop</code>. If <code>stop</code> is past the end, the slice stops at the end of the string.</p>
        ${out(` M  o  n  t  y     P  y  t  h  o  n
 0  1  2  3  4  5  6  7  8  9 10 11`)}
        ${repl(`>>> s = "Monty Python"
>>> print(s[0:4])
Mont
>>> print(s[6:7])
P
>>> print(s[6:20])
Python`)}
        <p>Leave out the first number and the slice starts at the beginning; leave out the second and it goes to the end:</p>
        ${repl(`>>> s = "Monty Python"
>>> s[:6]
'Monty '
>>> print(s[3:])
ty Python
>>> print(s[:])
Monty Python`)}
        ${predict("What is <code>s[2:5]</code>? How many characters does <code>s[a:b]</code> have, when both are within the string?",
          `${repl(`>>> s = "Monty Python"
>>> s[2:5]
'nty'
>>> len(s[2:5])
3`)}<p><code>s[a:b]</code> has <code>b - a</code> characters: a slice that is “up to but not including” <code>b</code> makes this count easy. Unlike indexing, slicing never raises <code>IndexError</code>.</p>`)}
        ${demo("slice", "Demo 7 · Index and slice playground", "type an expression, then step", "Try <code>s[6:20]</code> (no error), <code>s[12]</code> (error), <code>s[-1]</code> and <code>s[:6]</code>. Change <code>s</code> too.")}` },
      { id: "in", title: "The in operator", html: `
        <p><code>in</code> checks whether one string appears inside another. It is a logical expression: it evaluates to <code>True</code> or <code>False</code>, so it can be used in <code>if</code> and <code>while</code>.</p>
        ${repl(`>>> fruit = "banana"
>>> "n" in fruit
True
>>> "m" in fruit
False
>>> "nan" in fruit
True
>>> if "a" in fruit:
...     print("Got cha!")
...
Got cha!`)}` },
    ],
    takeaways: ["Index from 0; s[a:b] stops before b.", "for visits each character; in tests membership.", "Strings are immutable: build new ones."],
  },
  {
    slug: "6-methods", nav: "Methods", title: "String Methods",
    subtitle: "lower, find, replace, strip, startswith",
    abstract: "Every string carries methods. None of them changes the string: each returns a new value. find plus slicing pulls a piece out of a line of text.",
    tags: ["find", "replace", "strip", "find then slice"],
    hero: "hostMini", heroCaption: "get_host: find the @, find the space after it, slice between.",
    sections: [
      { id: "methods", title: "Methods return new strings", html: `
        <p>Strings come with many built-in functions called <b>methods</b>. A method is called by writing a dot and its name after a string: <code>greet.lower()</code>. String methods never modify the original string (they can't: strings are immutable); they return a new one.</p>
        ${repl(`>>> greet = "Hello, President Xu"
>>> zap = greet.lower()
>>> print(zap)
hello, president xu
>>> print(greet)
Hello, President Xu
>>> print("Hello, World!".lower())
hello, world!`)}
        ${callout("note", "NOTE", `<p>The slides call these the functions of the “string library”. They are the methods of the <code>str</code> type, built into every string; the full list is in the Python documentation, <a href="https://docs.python.org/3/library/stdtypes.html#string-methods" target="_blank" rel="noopener">docs.python.org</a>. (Python also has a module called <code>string</code>, which is something else.)</p>`)}` },
      { id: "find", title: "Searching: find", html: `
        <p><code>find(sub)</code> returns the index of the <b>first</b> occurrence of <code>sub</code>, or <code>-1</code> if it does not occur. <code>find(sub, start)</code> starts searching at index <code>start</code>.</p>
        ${repl(`>>> fruit = "banana"
>>> pos = fruit.find("na")
>>> print(pos)
2
>>> aa = fruit.find("z")
>>> print(aa)
-1`)}` },
      { id: "case", title: "Upper and lower case", html: `
        ${repl(`>>> my_str = "I am the one, I will beat Matrix"
>>> new_str = my_str.upper()
>>> print(new_str)
I AM THE ONE, I WILL BEAT MATRIX
>>> new_str = my_str.lower()
>>> print(new_str)
i am the one, i will beat matrix`)}
        <p>When you search with <code>find</code>, convert the string to lower case first, so you don't need to worry about case:</p>
        ${repl(`>>> my_str = "I am the one, I will beat Matrix"
>>> my_str.find("matrix")
-1
>>> my_str.lower().find("matrix")
26`)}` },
      { id: "replace", title: "Search and replace; stripping; prefixes", html: `
        <p><code>replace(old, new)</code> works like “search and replace” in a word processor: it replaces <b>all</b> occurrences of <code>old</code> with <code>new</code>.</p>
        ${repl(`>>> greet = "Hello, Bob"
>>> new_str = greet.replace("Bob", "Jane")
>>> print(new_str)
Hello, Jane
>>> new_str = greet.replace("o", "X")
>>> print(new_str)
HellX, BXb
>>> new_str = greet.replace("z", "X")
>>> new_str
'Hello, Bob'`)}
        <p><code>strip()</code> removes whitespace (spaces, tabs, newlines) from both ends; <code>lstrip()</code> and <code>rstrip()</code> remove it from the left or right end only.</p>
        ${repl(`>>> greet = "   Hello Bob  "
>>> greet.lstrip()
'Hello Bob  '
>>> greet.rstrip()
'   Hello Bob'
>>> greet.strip()
'Hello Bob'`)}
        <p><code>startswith(prefix)</code> checks whether a string starts with <code>prefix</code>. Case matters:</p>
        ${repl(`>>> line = "Please submit your application"
>>> line.startswith("Please")
True
>>> line.startswith("p")
False`)}
        ${predict("<code>greet = \"Hello, Bob\"</code>. After <code>greet.upper()</code>, what is <code>greet</code>?",
          `${repl(`>>> greet = "Hello, Bob"
>>> greet.upper()
'HELLO, BOB'
>>> greet
'Hello, Bob'`)}<p>Unchanged. To keep the upper-case version, assign it: <code>greet = greet.upper()</code>.</p>`)}
        ${demo("methods", "Demo 8 · String methods playground", "pick a method and arguments", "The last line always shows <code>s</code> again: it never changes. The final option tries to change a character and shows why it can't.")}` },
      { id: "parse", title: "Example: parsing an e-mail line", html: `
        <p>The first line of an e-mail stored in the “mbox” format looks like this. We want the host name after the <code>@</code>.</p>
        ${repl(`>>> data = "From stephen.marquard@uct.ac.za Sat Jan 5 09:14:16 2016"
>>> atpos = data.find("@")
>>> print(atpos)
21
>>> sppos = data.find(" ", atpos)
>>> print(sppos)
31
>>> host = data[atpos + 1 : sppos]
>>> print(host)
uct.ac.za`)}
        ${callout("pattern", "PATTERN · FIND, THEN SLICE", `<p>To pull a piece out of a string: <code>find</code> where it starts, <code>find</code> where it ends (searching from the start position), then slice between them.</p>`)}
        <p>The same steps as a function (Exercise 5):</p>
        ${demo("host", "Demo 9 · Find, then slice", "step; try the bad line too", "Amber: the <code>@</code>. Red: the space found after it. Green: the slice that is returned.")}` },
    ],
    takeaways: ["Methods return new values; s itself never changes.", "find gives the first index, or −1.", "Find, then slice."],
  },
  {
    slug: "7-files", nav: "Files", title: "Files",
    subtitle: "A text file is a sequence of lines",
    abstract: "open() gives you a file handle. A for loop reads one line per pass, newline included. read() takes the whole file at once; mode \"w\" and write() make a new file.",
    tags: ["open", "file handle", "\\n", "read, strip, filter", "write"],
    hero: "readMini", heroCaption: "for line in fhand: one line per pass, each ending in \\n.",
    sections: [
      { id: "video-p4", title: "Watch: Reading and writing files", html: `
        <p>Part 4 of this lecture's videos covers open and the file handle, the newline, reading line by line and all at once, searching, and writing a file (Chapter 7).</p>
        <div class="card video" data-video="${VIDEO_P4}"></div>` },
      { id: "handles", title: "Text files and file handles", html: `
        <p>So far all data lived in variables and vanished when the program ended. A <b>file</b> keeps data on the disk. A text file can be thought of as a sequence of lines. Here is part of a hosts file:</p>
        ${out(HOST_LINES.join("\n"))}
        <p>To have a file to read in these notes, the first program <b>writes</b> this file. Writing is explained at the end of the chapter; for now, just run it. It creates <code>myhost.txt</code> in the folder where you run Python.</p>
        ${codeBlock(CODE.writeHosts)}
        <p>Before reading a file we must tell Python which file and what we will do with it. The built-in <code>open()</code> does this:</p>
        ${out("handle = open(filename, mode)")}
        <p><code>filename</code> is a string; <code>mode</code> is <code>"r"</code> to read (the default) or <code>"w"</code> to write. <code>open</code> returns a <b>file handle</b>: not the file's contents, but a variable used to perform operations on the file (read, write, close). It is like <em>File → Open</em> in a word processor.</p>
        ${repl(`>>> fhand = open("myhost.txt", "r")
>>> print(fhand)
<_io.TextIOWrapper name='myhost.txt' mode='r' encoding='...'>
>>> fhand.close()`)}
        <p>If the file does not exist, <code>open</code> raises an error:</p>
        ${repl(`>>> fhand = open("not_existing.txt", "r")
Traceback (most recent call last):
  ...
FileNotFoundError: [Errno 2] No such file or directory: 'not_existing.txt'`)}` },
      { id: "newline", title: "The newline character", html: `
        <p>What separates the lines of a file? A special character, the <b>newline</b>, written <code>"\\n"</code> in a string. It is one character, not two.</p>
        ${repl(`>>> stuff = "Hello\\nWorld"
>>> stuff
'Hello\\nWorld'
>>> print(stuff)
Hello
World
>>> stuff = "X\\nY"
>>> print(stuff)
X
Y
>>> len(stuff)
3`)}
        <p>So a text file is really one long string with a newline at the end of each line: <code>"# Gmail web Start\\n216.239.38.125  gmail.com\\n..."</code>.</p>` },
      { id: "lines", title: "Reading line by line", html: `
        <p>A file handle opened for reading behaves like a sequence of strings, one per line, so a <code>for</code> loop goes through the file line by line.</p>
        ${predict(`Each line of the file ends with <code>"\\n"</code>, and <code>print</code> adds its own newline. What does the output of this loop look like?${codeBlock(CODE.readPrint)}`,
          `${out(HOST_LINES.map((l) => l + "\n").join("\n"))}<p>There is a blank line after every line: one newline comes from the file, one from <code>print</code>.</p>`)}
        <p>Strip the newline from the end of each line with <code>rstrip()</code>:</p>
        ${codeBlock(CODE.readStrip)}${out(HOST_LINES.join("\n"))}
        ${demo("read", "Demo 10 · Reading a file line by line", "pick a program, then step", "The ▶ marks the line the loop has just read into <code>line</code>. Each line carries its <span class='l4-nl'>\\n</span>. Switch between the programs of this chapter.")}
        ${callout("pitfall", "PITFALL · BLANK LINES BETWEEN LINES OF A FILE", `<p>Every line read from a file still ends with <code>"\\n"</code>. Call <code>line.rstrip()</code> before printing or comparing it, or <code>line == "gmail.com"</code> will never be true.</p>`)}
        <p>The slides' practice problem, counting the lines of a file, is the counting pattern again:</p>
        ${codeBlock(CODE.readCount)}${out("Line count: 6")}` },
      { id: "read", title: "Reading the whole file", html: `
        <p><code>read()</code> reads the whole file into a single string, newlines included:</p>
        ${codeBlock(CODE.readAll)}
        ${out("The length of the file: 155\nThe first 20 characters of the file: # Gmail web Start\n21")}
        <p>The 20 characters are the 17 of <code># Gmail web Start</code>, the newline, and <code>21</code>, the start of the next line. Reading the whole file is convenient for small files; for large ones, loop line by line so the whole file never has to sit in memory.</p>` },
      { id: "search", title: "Searching through a file", html: `
        <p>Put an <code>if</code> inside the loop to keep only the lines you want. This prints the comment lines, those that start with <code>#</code>:</p>
        ${codeBlock(CODE.readSearch)}${out("# Gmail web Start\n# Gmail web End\nfinished.")}
        ${callout("note", "NOTE", `<p>The slide writes <code>if line.startswith('#') == True:</code>. The <code>== True</code> is unnecessary: <code>startswith</code> already returns <code>True</code> or <code>False</code>, which is exactly what <code>if</code> needs.</p>`)}
        ${callout("pattern", "PATTERN · READ, STRIP, FILTER", `<p><code>for line in fhand:</code> → <code>line = line.rstrip()</code> → <code>if &lt;condition on line&gt;:</code> → use the line. Most file-processing programs in this course start like this.</p>`)}` },
      { id: "write", title: "Writing to a file", html: `
        <p>To write a file, open it with mode <code>"w"</code> and call the handle's <code>write()</code> method. <code>write</code> does <b>not</b> add a newline for you: put <code>"\\n"</code> at the end of each line yourself. Close the file when you are done, so everything is saved.</p>
        ${codeBlock(CODE.writeTest)}
        <p>Mode <code>"w"</code> creates the file, or <b>empties it first</b> if it already exists. Read it back to check:</p>
        ${codeBlock(`fhand = open("test.txt")
print(fhand.read(), end="")
fhand.close()`)}
        ${out("The first line\nThe second line\nThe third line")}
        ${demo("write", "Demo 11 · Writing a file", "step; then tick “already exists”", "With an existing file, watch the old lines vanish the moment <code>open(..., \"w\")</code> runs.")}
        ${callout("note", "NOTE", `<p>Python also has a <code>with</code> statement that closes the file for you, even if an error happens in the middle: <code>with open("test.txt") as fhand:</code> followed by an indented block. You will see it in many programs. These notes use <code>open</code> and <code>close</code>, as the slides do.</p>`)}
        <p>To tidy up, the <code>os</code> module can delete the two files these notes created:</p>
        ${codeBlock(`import os

os.remove("myhost.txt")
os.remove("test.txt")`)}` },
    ],
    takeaways: ["open() gives a handle, not the text.", "Each line ends with \\n: rstrip() it.", "\"w\" creates or empties; write() adds no newline."],
  },
  {
    slug: "8-summary", nav: "Summary", title: "Summary and Practice",
    subtitle: "Map, self-check, exercises",
    abstract: "A one-page map of the lecture, six self-check questions, eight exercises with solutions, and a checklist for string and file code an AI writes for you.",
    tags: ["knowledge map", "self-check", "exercises"],
    hero: "toc",
    sections: [
      { id: "map", title: "Knowledge map", html: `<div class="map">
        <div class="card"><h3>Functions</h3><ul><li><code>def</code> binds a name; the body runs only when called</li><li>A call makes a <b>frame</b>; parameters are bound to arguments</li><li>Built-in vs your own</li></ul></div>
        <div class="card"><h3>print vs return</h3><ul><li><code>return</code> hands the value to the caller and ends the call</li><li><code>print</code> only shows it</li><li>No <code>return</code> → the call is worth <code>None</code></li></ul></div>
        <div class="card"><h3>Parameters and scope</h3><ul><li>Positional, keyword, default</li><li><code>return a, b</code></li><li>Assigned in a function → <b>local</b>; avoid <code>global</code></li></ul></div>
        <div class="card"><h3>Strings</h3><ul><li>Immutable sequence of characters</li><li><code>s[i]</code> from 0, <code>s[-1]</code>, <code>len(s)</code></li><li><code>s[a:b]</code> stops before <code>b</code>; <code>for</code>, <code>in</code></li></ul></div>
        <div class="card"><h3>String methods</h3><ul><li><code>lower upper find replace strip startswith</code></li><li>Return new values; <code>s</code> is unchanged</li><li><code>find</code> → −1 if missing; find, then slice</li></ul></div>
        <div class="card"><h3>Files</h3><ul><li><code>open(name, mode)</code> → file handle</li><li><code>for line in fhand</code>; each line ends with <code>\\n</code></li><li><code>read()</code>; <code>"w"</code> + <code>write()</code>; <code>close()</code></li></ul></div></div>` },
      { id: "check", title: "Check your understanding", html: `<div data-demo="quiz"><div class="demo-body"></div></div>` },
      { id: "exercises", title: "Exercises", html: `
        <p>★ trace or modify · ★★ write · ★★★ extend or combine. Test every function you write by calling it, before you put it in a program that uses <code>input()</code>.</p>
        <h3>Exercise 1 ★ (trace)</h3>
        <p>What does this program print? Draw the frames at the moment <code>print(total)</code> inside <code>add_three</code> runs.</p>
        ${codeBlock(`def add_three(a, b, c):
    total = a + b + c
    print(total)
    return total


total = 10
result = add_three(1, 2, 3)
print(total, result)`)}
        <details class="reveal"><summary>Solution</summary>${out("6\n10 6")}<p>While <code>add_three</code> runs, there are two frames: the global frame with <code>total = 10</code> (and, after the call, <code>result</code>), and the frame of <code>add_three</code> with <code>a = 1</code>, <code>b = 2</code>, <code>c = 3</code> and its own local <code>total = 6</code>. The global <code>total</code> is still 10 afterwards.</p></details>
        <h3>Exercise 2 ★ (find the bug)</h3>
        <p>This function should return the number of vowels in a word, but <code>count_vowels("banana") + 1</code> raises an error. Why? Fix it.</p>
        ${codeBlock(`def count_vowels_buggy(word):
    count = 0
    for letter in word:
        if letter in "aeiou":
            count = count + 1
    print(count)`)}
        <details class="reveal"><summary>Solution</summary><p>The function prints the count but has no <code>return</code>, so the call evaluates to <code>None</code>, and <code>None + 1</code> is a <code>TypeError</code>. Replace <code>print(count)</code> with <code>return count</code>.</p>${codeBlock(CODE.countVowels)}${repl(`>>> count_vowels("banana") + 1
4
>>> count_vowels("rhythm")
0`)}</details>
        <h3>Exercise 3 ★ (modify)</h3>
        <p>Change <code>print_grade</code> into a fruitful function <code>grade(score)</code> that returns the letter instead of printing it.</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`def grade(score):
    if score >= 90.0:
        return "A"
    elif score >= 80.0:
        return "B"
    elif score >= 70.0:
        return "C"
    elif score >= 60.0:
        return "D"
    else:
        return "F"`)}${repl(">>> grade(85), grade(59.5), grade(90)\n('B', 'F', 'A')")}</details>
        <h3>Exercise 4 ★★</h3>
        <p>Write <code>count_char(text, ch)</code> that returns how many times the character <code>ch</code> appears in <code>text</code>, using a loop (not the <code>count</code> method).</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`def count_char(text, ch):
    count = 0
    for letter in text:
        if letter == ch:
            count = count + 1
    return count`)}${repl(`>>> count_char("banana", "a")
3
>>> count_char("banana", "z")
0`)}</details>
        <h3>Exercise 5 ★★</h3>
        <p>Write <code>get_host(line)</code> that takes an mbox “From” line, like the one in the parsing example, and returns the host name after the <code>@</code>.</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(CODE.getHost)}${repl(`>>> get_host("From stephen.marquard@uct.ac.za Sat Jan 5 09:14:16 2016")
'uct.ac.za'
>>> get_host("From louis@media.berkeley.edu Fri Jan 4 18:10:48 2008")
'media.berkeley.edu'`)}</details>
        <h3>Exercise 6 ★★</h3>
        <p>Write <code>initials(name)</code> that returns the initials of a two-word name in upper case: <code>initials("ada lovelace")</code> is <code>"AL"</code>. Use <code>find</code> and indexing.</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`def initials(name):
    space = name.find(" ")
    return (name[0] + name[space + 1]).upper()`)}${repl(`>>> initials("ada lovelace")
'AL'
>>> initials("Alan Turing")
'AT'`)}</details>
        <h3>Exercise 7 ★★★</h3>
        <p>Write <code>count_lines_with(filename, word)</code> that returns how many lines of a file contain <code>word</code>, ignoring case. Test it on a file your test writes first.</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`def count_lines_with(filename, word):
    fhand = open(filename)
    count = 0
    for line in fhand:
        if word.lower() in line.lower():
            count = count + 1
    fhand.close()
    return count


fhand = open("poem.txt", "w")
fhand.write("The Python is long\\n")
fhand.write("a short line\\n")
fhand.write("python again\\n")
fhand.close()
print(count_lines_with("poem.txt", "python"))`)}${out("2")}</details>
        <h3>Exercise 8 ★★★</h3>
        <p>Write <code>copy_upper(source, target)</code> that reads the file <code>source</code> and writes a new file <code>target</code> with the same lines in upper case. It should return the number of lines copied.</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`def copy_upper(source, target):
    fin = open(source)
    fout = open(target, "w")
    count = 0
    for line in fin:
        fout.write(line.upper())
        count = count + 1
    fin.close()
    fout.close()
    return count


print(copy_upper("poem.txt", "poem_upper.txt"))
fhand = open("poem_upper.txt")
print(fhand.read(), end="")
fhand.close()`)}${out("3\nTHE PYTHON IS LONG\nA SHORT LINE\nPYTHON AGAIN")}<p>Each line read still ends with <code>"\\n"</code>, and <code>upper()</code> leaves it there, so <code>write</code> needs no extra newline.</p></details>` },
      { id: "ai", title: "Working with AI", html: `
        <p>An AI assistant can write string and file functions in seconds. Check what it gives you with this lecture's tools:</p>
        <ol><li><b>Does it return or print?</b> If you need the value, the function must <code>return</code> it. Call it and store the result: is it <code>None</code>?</li>
        <li><b>Does it change globals?</b> Look for <code>global</code>. Ask for a version that takes parameters and returns results instead.</li>
        <li><b>Off-by-one in slices.</b> For every <code>s[a:b]</code>, check on a short example that it starts and stops where you want: <code>b</code> is <em>not</em> included.</li>
        <li><b>Newlines from files.</b> Does the code <code>rstrip()</code> lines before comparing them? Does it add <code>"\\n"</code> when it writes?</li>
        <li><b>Test the edges</b>: the empty string, a string without the character searched for (<code>find</code> returns <code>-1</code>!), an empty file, a missing file.</li></ol>
        <p>Try this: ask an assistant for “a function that returns the domain of an e-mail address”. What does its answer return for <code>"no-at-sign"</code>? If it uses <code>find("@")</code> and slices from <code>-1 + 1 = 0</code>, it silently returns the whole string. Ask it to handle that case, and check again.</p>` },
      { id: "terms", title: "Key terms and further reading", html: `
        <p class="tags">${["function", "built-in function", "call (invoke)", "argument", "parameter", "function definition", "signature", "body", "frame", "global frame", "return value", "None", "fruitful function", "void function", "default value", "keyword argument", "simultaneous assignment", "scope", "local variable", "global variable", "string", "concatenate", "index", "IndexError", "iteration variable", "immutable", "slice", "method", "file", "file handle", "newline"].map((t) => `<span class="tag">${t}</span>`).join("")}</p>
        <ul><li>C. Severance, <em>Python for Everybody</em> (Py4E), Chapter 4 (Functions), Chapter 6 (Strings) and Chapter 7 (Files). Most of this deck's string and file examples come from these chapters. <a href="https://www.py4e.com/book" target="_blank" rel="noopener">py4e.com/book</a></li>
        <li>J. DeNero, <em>Composing Programs</em>, §1.3 Defining New Functions (environment diagrams and frames). <a href="https://www.composingprograms.com/pages/13-defining-new-functions.html" target="_blank" rel="noopener">composingprograms.com</a></li>
        <li>Y. D. Liang, <em>Introduction to Programming Using Python</em>, Chapter 6 (Functions): the grade, <code>print_area</code> and <code>sort</code> examples, and scope of variables.</li>
        <li>Python documentation, string methods: <a href="https://docs.python.org/3/library/stdtypes.html#string-methods" target="_blank" rel="noopener">docs.python.org</a></li></ul>` },
    ],
    takeaways: ["return, don't print, a computed value.", "Strings: index, slice, methods — never changed.", "Files: open, loop, rstrip, close."],
  },
];

const QUIZ = [
  { q: "What does this program print?",
    code: `def double(x):
    print(x * 2)

y = double(5)
print(y)`,
    opts: ["10, then 10", "10, then None", "None, then 10", "only 10"],
    a: 1, why: "<code>double</code> prints 10 and returns nothing, so <code>y</code> is <code>None</code>." },
  { q: "After <code>x = 1</code>, then <code>def f(): x = 5</code>, then <code>f()</code>, what is <code>x</code>?",
    opts: ["1", "5", "NameError", "None"],
    a: 0, why: "The assignment inside <code>f</code> creates a local <code>x</code> in <code>f</code>'s frame. The global <code>x</code> is still 1." },
  { q: "<code>s = \"Python\"</code>. What are <code>s[1:4]</code>, <code>s[-2]</code> and <code>s[:2] + s[4:]</code>?",
    opts: ["<code>'yth'</code>, <code>'o'</code>, <code>'Pyon'</code>", "<code>'ytho'</code>, <code>'n'</code>, <code>'Pyhon'</code>", "<code>'Pyt'</code>, <code>'o'</code>, <code>'Pyon'</code>", "<code>'yth'</code>, <code>'h'</code>, <code>'Pthon'</code>"],
    a: 0, why: "<code>s[1:4]</code> is indices 1, 2, 3: <code>'yth'</code>. <code>s[-2]</code> is the second last: <code>'o'</code>. <code>'Py' + 'on'</code> is <code>'Pyon'</code>." },
  { q: "Why does <code>s[0] = \"J\"</code> fail for a string <code>s</code>?",
    opts: ["Index 0 is out of range", "Strings are immutable; build <code>\"J\" + s[1:]</code> instead", "You must write <code>s.replace(0, \"J\")</code>", "Strings are lists, so use <code>s.append</code>"],
    a: 1, why: "Strings are immutable sequences, not lists. <code>TypeError: 'str' object does not support item assignment</code>. Build a new string: <code>\"J\" + s[1:]</code>." },
  { q: "You loop over a file with <code>for line in fhand: print(line)</code> and get a blank line between every two lines. Why?",
    opts: ["The file has blank lines in it", "Each line already ends with <code>\\n</code> and <code>print</code> adds another; use <code>line.rstrip()</code>", "<code>open</code> was called with mode <code>\"w\"</code>", "<code>print</code> always prints two newlines"],
    a: 1, why: "Each line read keeps its newline, and <code>print</code> adds its own. Strip it with <code>line.rstrip()</code>." },
  { q: "With <code>def print_area(width=1, height=2)</code>, what does <code>print_area(3)</code> print?",
    opts: ["<code>width: 1 height: 3 area: 3</code>", "<code>width: 3 height: 2 area: 6</code>", "an error: two arguments are needed", "<code>width: 3 height: 3 area: 9</code>"],
    a: 1, why: "3 is matched by position to the first parameter, <code>width</code>; <code>height</code> keeps its default 2." },
];
