// Chapter content, adapted from notes/L05-collections.md. Code is copied from the note.

const demo = (name, title, instr, hint = "") =>
  `<div class="card demo" data-demo="${name}"><div class="head"><span class="title">${title}</span><span>${instr}</span></div>
   <div class="demo-body"></div>${hint ? `<p class="hint">${hint}</p>` : ""}</div>`;

const callout = (kind, label, body) => `<div class="callout ${kind}"><b>${label}</b>${body}</div>`;
const predict = (q, a) => callout("predict", "PREDICT", `${q.startsWith("<p>") ? q : `<p>${q}</p>`}<details class="reveal"><summary>Show the answer</summary>${a}</details>`);
const repl = (s) => codeBlock(s, "repl");
const out = (s) => codeBlock(s, "out");

const VIDEO_P1 = "media/L05-1.mp4";
const VIDEO_P2 = "media/L05-2.mp4";
const VIDEO_P3 = "media/L05-3.mp4";
const VIDEO_P4 = "media/L05-4.mp4";

const LECTURE = {
  number: 5,
  title: "Lists, Dictionaries and Tuples",
  tagline: "Many values in one name",
  lead: "Lists you can change, dictionaries you look up by key, tuples you can't change — and the one picture that explains them all: names are arrows to objects. Every step can be replayed, and every example can be changed.",
  heroDemo: "aliasMini",
  heroLabel: "Two names, one list · b = a",
  heroCaption: "Assignment ties a name to an object. It never copies. Change the list through a, and b sees it.",
  whyTitle: "Why collections are worth learning well",
  whySub: "Three ideas you will use in every program from now on",
  why: [
    ["Names and objects", "A variable is an <b>arrow to an object</b>. <code>b = a</code> copies the arrow, not the list. This one picture explains most list surprises."],
    ["Counting with a dictionary", "<code>counts[x] = counts.get(x, 0) + 1</code> tallies words, votes, anything. It is the most-used dictionary pattern."],
    ["Sorting by value", "Tuples compare element by element, so a list of <code>(count, word)</code> tuples sorts by count: the ten most common words in five lines."],
  ],
  ctaTitle: "Ready to look inside a list?",
  minutes: "About 75–90 minutes",
  videos: {
    [VIDEO_P1]: "Lecture 5 · Part 1 — Working with lists (8 min)",
    [VIDEO_P2]: "Lecture 5 · Part 2 — Two names, one list (7.5 min)",
    [VIDEO_P3]: "Lecture 5 · Part 3 — Split and counting with a dictionary (7.4 min)",
    [VIDEO_P4]: "Lecture 5 · Part 4 — Tuples and sorting a dictionary (7.3 min)",
  },
};

const CHAPTERS = [
  {
    slug: "1-lists", nav: "Lists", title: "Lists",
    subtitle: "Many values, in order, in one name",
    abstract: "A list holds many values in order. You loop over it, index into it from 0, and — unlike a string — change it in place.",
    tags: ["list literals", "for loops", "indexing", "mutable"],
    hero: "code:friendsLoop", heroCaption: "A list and a for loop: best friends.",
    sections: [
      { id: "video", title: "Watch: working with lists", html: `
        <p>Part 1 of this lecture's videos covers chapters 1–3: list literals, for loops, indexing, mutability, len and range, slicing, list methods and sorting.</p>
        <div class="card video" data-video="${VIDEO_P1}"></div>` },
      { id: "collections", title: "Collections: many values in one name", html: `
        <p>Most of our variables so far hold <b>one value</b>. When we put a new value in the variable, the old one is gone:</p>
        ${repl(">>> x = 2\n>>> x = 4\n>>> print(x)\n4")}
        <p>A <b>collection</b> lets us put <em>many</em> values in a single variable, and carry them around in one convenient package. This lecture is about Python's three main collections:</p>
        <ul><li>a <b>list</b>: values in order, which you can change;</li>
        <li>a <b>dictionary</b>: values with labels (keys), looked up by label;</li>
        <li>a <b>tuple</b>: values in order, which you cannot change.</li></ul>` },
      { id: "literals", title: "List literals", html: `
        <p>A list is written with square brackets, with the elements separated by commas. An element can be any Python object: a number, a string, even another list. A list can be empty.</p>
        ${repl(`>>> print([1, 24, 76])
[1, 24, 76]
>>> print(["red", "yellow", "blue"])
['red', 'yellow', 'blue']
>>> print(["red", 24, 98.6])
['red', 24, 98.6]
>>> print(1, [5, 6], 7)
1 [5, 6] 7
>>> print([])
[]`)}` },
      { id: "loops", title: "Lists and for loops: best friends", html: `
        <p>A <code>for</code> loop runs its body once for each element of a list, in order. The loop variable refers to each element in turn:</p>
        ${codeBlock(CODE.friendsLoop)}
        ${out("Happy new year, Tom\nHappy new year, Jerry\nHappy new year, Bat\nDone")}` },
      { id: "index", title: "Looking inside a list", html: `
        <p>Just like a string, a list is a <b>sequence</b>: each element has an <b>index</b>, its position counted from 0. Put the index in square brackets to get one element. A negative index counts from the end, so <code>-1</code> is the last element.</p>
        ${repl(`>>> friends = ["Joseph", "Glenn", "Sally"]
>>> print(friends[1])
Glenn
>>> friends[-1]
'Sally'
>>> friends[3]
Traceback (most recent call last):
  ...
IndexError: list index out of range`)}
        ${demo("index", "Demo 1 · Indexing", "drag the index", "The second row of numbers under each cell is its negative index.")}
        ${predict("A list of 3 elements has indices 0, 1 and 2. What are the first and last valid indices of a list <code>xs</code> with <code>n</code> elements, written in terms of <code>n</code>?",
          `<p>The first is <code>0</code> and the last is <code>n - 1</code> (or <code>-1</code>). Asking for index <code>n</code> is the most common off-by-one error with lists; it raises <code>IndexError</code>.</p>`)}` },
      { id: "mutable", title: "Lists are mutable", html: `
        <p>Strings are <b>immutable</b>: you cannot change a character inside a string. You can only make a <em>new</em> string, for example with <code>lower()</code>. Lists are <b>mutable</b>: you can change an element by assigning to its index.</p>
        ${repl(`>>> fruit = "Banana"
>>> fruit[0] = "b"
Traceback (most recent call last):
  ...
TypeError: 'str' object does not support item assignment
>>> x = fruit.lower()
>>> print(x)
banana
>>> lotto = [2, 14, 26, 41, 63]
>>> print(lotto)
[2, 14, 26, 41, 63]
>>> lotto[2] = 28
>>> print(lotto)
[2, 14, 28, 41, 63]`)}
        <p>Note what <code>fruit.lower()</code> did: it made a new string <code>"banana"</code> and left <code>fruit</code> as it was. <code>lotto[2] = 28</code> did something different: it changed the list itself. No new list was made. <a href="#/4-names">Chapter 4</a> shows why this difference matters.</p>` },
    ],
    takeaways: ["A list: values in order, in [ ].", "Index from 0; −1 is the last.", "Lists are mutable; strings are not."],
  },
  {
    slug: "2-range", nav: "len & range", title: "How Long Is a List? Two Kinds of Loop",
    subtitle: "len(), range() and the index loop",
    abstract: "len() counts the elements; range() makes the indices. Loop over the elements when you can, over the indices when you need the position.",
    tags: ["len", "range object", "index loop"],
    hero: "code:twoLoops", heroCaption: "Two loops, the same three lines.",
    sections: [
      { id: "len", title: "len()", html: `
        <p>The built-in function <code>len()</code> takes any sequence and returns the number of elements in it. For a string that is the number of characters; for a list, the number of elements.</p>
        ${repl(`>>> greet = "Hello Bob"
>>> print(len(greet))
9
>>> x = [1, 2, "joe", 99]
>>> print(len(x))
4`)}` },
      { id: "range", title: "range()", html: `
        <p><code>range(n)</code> stands for the integers <code>0, 1, …, n - 1</code>. With two arguments, <code>range(start, stop)</code> starts at <code>start</code>; with three, the third is the <b>step</b>. In every case the <code>stop</code> value itself is <em>not</em> included.</p>
        ${repl(`>>> x = range(4)
>>> x
range(0, 4)
>>> x[0], x[3]
(0, 3)
>>> list(range(4))
[0, 1, 2, 3]
>>> y = range(2, 10, 2)
>>> list(y)
[2, 4, 6, 8]
>>> y[4]
Traceback (most recent call last):
  ...
IndexError: range object index out of range`)}
        ${callout("note", "NOTE · SLIDE 9", `<p><b>Slide 9 says that <code>range()</code> “returns a list of numbers”. In Python 3 it does not.</b> It returns a <b>range object</b>, as the slide's own screenshot shows (<code>range(0, 4)</code>). A range object can be indexed and looped over like a list, but it doesn't store its numbers: it works each one out when asked, so <code>range(1_000_000_000)</code> takes no memory. If you need an actual list, write <code>list(range(4))</code>. (In Python 2, <code>range</code> did return a list, which is where the old wording comes from.)</p>`)}
        ${demo("range", "Demo 2 · range(start, stop, step)", "drag the sliders")}
        ${predict("What is <code>list(range(5, 0, -1))</code>? And <code>list(range(3, 3))</code>?",
          `${repl(">>> list(range(5, 0, -1))\n[5, 4, 3, 2, 1]\n>>> list(range(3, 3))\n[]")}<p>A negative step counts down; the loop still stops <em>before</em> reaching <code>stop</code>. When <code>start</code> equals <code>stop</code> there are no numbers at all.</p>`)}` },
      { id: "two-loops", title: "A tale of two loops", html: `
        <p>Here are two loops that print the same lines. The first loops over the <b>elements</b>; the second loops over the <b>indices</b>, made with <code>range(len(friends))</code>, and looks each element up.</p>
        ${demo("twoLoops", "Demo 3 · Two loops, step by step", "← → keys step", "Watch the names on the left. Loop 1 binds <code>friend</code> directly; loop 2 binds <code>i</code> and then looks up <code>friends[i]</code>.")}
        ${out("Happy new year, Tom\nHappy new year, Jerry\nHappy new year, Bat\nHappy new year, Tom\nHappy new year, Jerry\nHappy new year, Bat")}
        <p>Prefer the first form: it is shorter and has no index to get wrong. Use the index loop when you need the position itself, for example to change elements of the list:</p>
        ${repl(`>>> prices = [10, 20, 30]
>>> for i in range(len(prices)):
...     prices[i] = prices[i] * 2
>>> prices
[20, 40, 60]`)}
        ${callout("pitfall", "PITFALL", `<p><b>Changing the loop variable does not change the list.</b> In <code>for p in prices: p = p * 2</code>, the name <code>p</code> is re-bound to a new number on each pass; the list is never touched.</p>
          ${repl(`>>> prices = [10, 20, 30]
>>> for p in prices:
...     p = p * 2
>>> prices
[10, 20, 30]`)}`)}` },
    ],
    takeaways: ["len() counts elements.", "range() is a range object; stop is excluded.", "Loop over elements; use indices to change."],
  },
  {
    slug: "3-methods", nav: "Methods", title: "Making and Changing Lists",
    subtitle: "+, slicing, list methods and built-in functions",
    abstract: "+ and slicing build new lists. Methods like append and sort change the list they are called on, and mostly return None.",
    tags: ["+", "slicing", "append", "sort", "sum / len"],
    hero: "methodsMini", heroCaption: "append adds to the end of the same list.",
    sections: [
      { id: "concat", title: "Concatenation and slicing", html: `
        <p>Like strings, two lists can be <b>concatenated</b> with <code>+</code>. The result is a <em>new</em> list; the two lists you started with are unchanged.</p>
        ${repl(`>>> a = [1, 2, 3]
>>> b = [4, 5, 6]
>>> c = a + b
>>> print(c)
[1, 2, 3, 4, 5, 6]
>>> print(a)
[1, 2, 3]`)}
        <p>A <b>slice</b> <code>t[start:stop]</code> is a new list with the elements from index <code>start</code> <em>up to but not including</em> <code>stop</code>. Leave out <code>start</code> to begin at the start, and <code>stop</code> to go to the end. <code>t[:]</code> is a slice of the whole list: a copy.</p>
        ${repl(`>>> t = [9, 41, 12, 3, 74, 15]
>>> t[1:3]
[41, 12]
>>> t[:4]
[9, 41, 12, 3]
>>> t[3:]
[3, 74, 15]
>>> t[:]
[9, 41, 12, 3, 74, 15]`)}
        ${demo("slice", "Demo 4 · Slicing", "drag start and stop", "Tick a box to leave that number out.")}
        ${predict("For the same <code>t</code>, what are <code>len(t[1:3])</code>, <code>t[2:2]</code> and <code>t[4:100]</code>?",
          `${repl(">>> t = [9, 41, 12, 3, 74, 15]\n>>> len(t[1:3])\n2\n>>> t[2:2]\n[]\n>>> t[4:100]\n[74, 15]")}<p>A slice <code>t[a:b]</code> has <code>b - a</code> elements. A slice never raises <code>IndexError</code>: indices past the end are simply cut off.</p>`)}` },
      { id: "methods", title: "List methods", html: `
        <p>A list is an object with <b>methods</b>: functions that belong to it and are called with a dot, like <code>stuff.append(99)</code>. <code>dir()</code> lists every name an object has; leaving out the special names that start with <code>__</code>, these are the list methods:</p>
        ${repl(`>>> x = list()
>>> type(x)
<class 'list'>
>>> [name for name in dir(x) if not name.startswith("__")]
['append', 'clear', 'copy', 'count', 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort']`)}
        <p>(The last line uses a <em>list comprehension</em>, a compact way to build a list that you will meet properly later. Read it as “every name in <code>dir(x)</code> that does not start with <code>__</code>”.) The full list, with an explanation of each, is in the <a href="https://docs.python.org/3/tutorial/datastructures.html#more-on-lists" target="_blank" rel="noopener">Python tutorial</a>.</p>
        <p><b>Building a list from scratch.</b> Start with an empty list, <code>list()</code> or <code>[]</code>, and add elements one at a time with <code>append()</code>. The list keeps its order, and each new element goes on the <b>end</b>.</p>
        ${repl(CODE.build)}
        <p>A few more methods you will use often. Each of them changes the list it is called on.</p>
        ${repl(CODE.moreMethods)}
        ${demo("methods", "Demo 5 · List methods, step by step", "pick a session, then step", "Each step is one line typed into the shell. Notice which methods change the list and which only answer a question.")}
        ${callout("pattern", "PATTERN · ACCUMULATE INTO A LIST", `<p>Start with an empty list before the loop; <code>append</code> to it inside the loop. After the loop the list holds every value you collected, in the order you met them. This is the list version of the accumulator from Lecture 3 (<code>total = 0</code>, then <code>total = total + x</code>).</p>`)}` },
      { id: "in-sort", title: "in, and sorting", html: `
        <p>The operators <code>in</code> and <code>not in</code> check whether a value is an element of a list. They return <code>True</code> or <code>False</code> and do not change the list.</p>
        ${repl(`>>> some = [1, 9, 21, 10, 16]
>>> 9 in some
True
>>> 15 in some
False
>>> 20 not in some
True`)}
        <p>A list keeps its elements in the order you put them, until you change the order. The <code>sort()</code> method sorts the list <b>in place</b>: it rearranges the list itself (“sort yourself”). Strings sort in dictionary order, numbers by value.</p>
        ${repl(`>>> friends = ["Tom", "Jerry", "Bat"]
>>> friends.sort()
>>> print(friends)
['Bat', 'Jerry', 'Tom']
>>> print(friends[1])
Jerry
>>> numbers = [1, 2, 5, 100, 32, 7, 97, 1001]
>>> numbers.sort()
>>> print(numbers)
[1, 2, 5, 7, 32, 97, 100, 1001]`)}
        ${callout("note", "NOTE · SLIDE 16", `<p>The slide's session starts <code>friend = [...]</code> and then calls <code>friends.sort()</code>. As typed, that raises <code>NameError</code>; both names should be <code>friends</code>.</p>`)}
        ${callout("pitfall", "PITFALL · sort() RETURNS None", `<p>It changes the list and gives nothing back, so <code>x = x.sort()</code> throws your list away and leaves <code>x</code> equal to <code>None</code>. If you want a sorted <em>copy</em> and the original unchanged, use the built-in function <code>sorted()</code> (<a href="#/7-tuples/sorting">Chapter 7</a>). Pick “Pitfall: x = x.sort()” in Demo 5 to watch it.</p>
          ${repl(CODE.sortNone)}`)}` },
      { id: "builtins", title: "Built-in functions and averaging", html: `
        <p>Several built-in functions take a list as input. They replace loops you would otherwise write yourself:</p>
        ${repl(`>>> numbers = [3, 41, 12, 9, 74, 15]
>>> print(len(numbers))
6
>>> print(max(numbers))
74
>>> print(min(numbers))
3
>>> print(sum(numbers))
154
>>> print(sum(numbers) / len(numbers))
25.666666666666668`)}
        <p>Here is an averaging program in the style of Lecture 3. It keeps a running <code>total</code> and <code>count</code> and never stores the numbers. (In the run below the input came from a file, not the keyboard — the numbers 3, 9, 6 and the word <code>done</code> — so the typed numbers don't appear and the prompts run together.)</p>
        ${codeBlock(`total = 0
count = 0
while True:
    inp = input("Enter a number: ")
    if inp == "done":
        break
    value = float(inp)
    total = total + value
    count = count + 1

average = total / count
print("The average is:", average)`)}
        ${out("Enter a number: Enter a number: Enter a number: Enter a number: The average is: 6.0")}
        <p><b>Practice (slide 19).</b> Rewrite it to <em>store</em> the numbers in a list and use list functions instead of the running totals.</p>
        ${codeBlock(`numbers = list()
while True:
    inp = input("Enter a number: ")
    if inp == "done":
        break
    numbers.append(float(inp))

average = sum(numbers) / len(numbers)
print("The average is:", average)`)}
        ${out("Enter a number: Enter a number: Enter a number: Enter a number: The average is: 6.0")}
        <p>The list version uses more memory, since it keeps every number, but now you can do more with them afterwards: the largest, the smallest, the median.</p>
        ${callout("pitfall", "PITFALL", `<p>Both programs crash with <code>ZeroDivisionError</code> if the user types <code>done</code> straight away, because <code>count</code> (or <code>len(numbers)</code>) is 0. Check for an empty list before you divide.</p>`)}` },
    ],
    takeaways: ["+ and slices build new lists.", "Methods change the list; most return None.", "Never write x = x.sort()."],
  },
  {
    slug: "4-names", nav: "Names", title: "Names and Objects: Two Names, One List",
    subtitle: "Assignment never copies",
    abstract: "A variable is a name tied to an object. b = a ties a second name to the same list, so a change through one name is seen through the other.",
    tags: ["aliasing", "is vs ==", "copy", "re-binding", "functions"],
    hero: "aliasMini", heroCaption: "b = a: one list, two arrows.",
    sections: [
      { id: "video", title: "Watch: two names, one list", html: `
        <p>Part 2 of this lecture's videos covers chapter 4: names and objects, aliasing, is versus ==, copies, re-binding, and lists passed to functions.</p>
        <div class="card video" data-video="${VIDEO_P2}"></div>` },
      { id: "assignment", title: "Assignment never copies", html: `
        <p>This chapter is not in the slides, but it explains the behaviour that most surprises people who are new to lists.</p>
        <p>A Python variable is a <b>name</b> that <b>refers to</b> an object. The object lives somewhere in memory; the name is like a label tied to it with a string. Assignment, <code>name = expression</code>, does exactly one thing: it ties the name to the object the expression gives. It never copies an object.</p>
        <p>So after <code>b = a</code>, there are two names and <b>one</b> list. When you change that list through one name, the other name sees the change, because there is only one list to see:</p>
        ${repl(CODE.alias)}
        ${demo("alias", "Demo 6 · Names → objects", "pick a story, then step", "Names on the left, objects on the right, an arrow for every “refers to”. Amber marks what the current line changed.")}
        <p>Two names for the same object are called <b>aliases</b>; this is <b>aliasing</b>. The operator <code>is</code> tells you whether two names refer to the <em>same</em> object, while <code>==</code> tells you whether two objects have <em>equal</em> contents:</p>
        ${repl(`>>> a = [99, 2, 3, 4]
>>> b = a
>>> a is b
True
>>> c = [99, 2, 3, 4]
>>> c == a
True
>>> c is a
False`)}
        <p><code>c</code> was made by its own list display, so it is a different list that happens to hold the same values.</p>
        ${predict(`<p>What does this print? Draw the names and the objects before you answer.</p>${codeBlock(`p = ["x", "y"]
q = p
q.append("z")
print(len(p))`)}`, `${repl(`>>> p = ["x", "y"]
>>> q = p
>>> q.append("z")
>>> print(len(p))
3`)}<p><code>3</code>. There is one list, with two names; <code>q.append("z")</code> added to it.</p>`)}` },
      { id: "copy", title: "Making a real copy", html: `
        <p>When you want an independent list, make a new one. A full slice <code>a[:]</code>, the function <code>list(a)</code> and the method <code>a.copy()</code> all build a new list with the same elements:</p>
        ${repl(CODE.copy)}
        <p>Pick “b = a[:]” in Demo 6: two arrows, two boxes.</p>` },
      { id: "rebind", title: "Changing a list versus re-binding a name", html: `
        <p>There are two ways to “add 4 to <code>a</code>”, and they are not the same:</p>
        <ul><li><code>a.append(4)</code> <b>changes the list</b> that <code>a</code> refers to. Every alias sees it.</li>
        <li><code>a = a + [4]</code> builds a <b>new list</b> and re-binds the name <code>a</code> to it. Other names still refer to the old list.</li></ul>
        ${repl(CODE.rebind)}
        <p>After the last assignment, <code>a</code> and <code>b</code> are no longer aliases. Pick “a = a + [4]” in Demo 6 to watch the arrow move.</p>
        <p>This is also why aliasing never surprised you with strings and numbers: they are immutable, so there is no way to change the object. Every “change” to a string, like <code>s = s + "!"</code> or <code>s = s.lower()</code>, builds a new string and re-binds the name.</p>` },
      { id: "functions", title: "Lists passed to functions", html: `
        <p>Calling a function binds its parameter to the <em>same object</em> the caller passed in. So a function can change the caller's list:</p>
        ${codeBlock(CODE.addBonus)}
        ${out("[65, 77, 90]")}
        <p><code>add_bonus</code> returns nothing, yet <code>marks</code> has changed: inside the call, <code>scores</code> and <code>marks</code> were two names for one list (pick “Passing a list to a function” in Demo 6). Sometimes that is what you want; often it is a surprise. A function that should leave its input alone builds and returns a new list:</p>
        ${codeBlock(`def with_bonus(scores):
    result = []
    for s in scores:
        result.append(s + 5)
    return result


marks = [60, 72, 85]
new_marks = with_bonus(marks)
print(marks, new_marks)`)}
        ${out("[60, 72, 85] [65, 77, 90]")}
        ${callout("pitfall", "PITFALL · “b = a MAKES A COPY”", `<p>It does not. It makes a second name for the same list. Draw an arrow for every name; if two arrows reach the same box, a change through either name changes the box. To get a copy, write <code>b = a[:]</code> (or <code>list(a)</code>, or <code>a.copy()</code>).</p>`)}
        ${callout("pattern", "PATTERN · MUTATE OR RETURN, NOT BOTH", `<p>A function that changes a list in place, like <code>list.sort()</code> and <code>add_bonus</code>, usually returns <code>None</code>. A function that builds a new list, like <code>sorted()</code> and <code>with_bonus</code>, returns it and leaves its input alone. Decide which kind you are writing, and say so in the function's name or docstring.</p>`)}` },
    ],
    takeaways: ["b = a: two names, one list.", "Copy with a[:], list(a), a.copy().", "append changes; a = a + [x] re-binds."],
  },
  {
    slug: "5-split", nav: "split", title: "Strings and Lists: split()",
    subtitle: "From a line of text to a list of words",
    abstract: "split() breaks a string into a list of strings. The double split pattern splits one of those pieces again.",
    tags: ["split()", "delimiter", "double split"],
    hero: "code:doubleSplit", heroCaption: "Split the line; split one piece again.",
    sections: [
      { id: "video", title: "Watch: split and counting with a dictionary", html: `
        <p>Part 3 of this lecture's videos covers chapters 5 and 6: split and the double split, dictionaries, KeyError, in, get() and the counting pattern, looping over a dictionary.</p>
        <div class="card video" data-video="${VIDEO_P3}"></div>` },
      { id: "words", title: "Breaking a string into words", html: `
        <p>The string method <code>split()</code> breaks a string into a <b>list of strings</b>. With no argument it splits on whitespace, so we can think of the pieces as <b>words</b>. Then we can index the list or loop over it like any other list.</p>
        ${repl(`>>> my_str = "Catch me if you can"
>>> words = my_str.split()
>>> print(words)
['Catch', 'me', 'if', 'you', 'can']
>>> print(len(words))
5
>>> print(words[0])
Catch
>>> for w in words:
...     print(w)
Catch
me
if
you
can`)}
        ${callout("note", "NOTE", `<p>The slide calls this variable <code>myStr</code>. These notes use Python's standard naming style (PEP 8): lower-case words joined by underscores, so <code>my_str</code>.</p>`)}` },
      { id: "delimiter", title: "Choosing the delimiter", html: `
        <p>With no argument, any run of spaces counts as <b>one</b> separator. To split on some other character, pass it as the <b>delimiter</b>:</p>
        ${repl(`>>> line = "A lot               of spaces"
>>> etc = line.split()
>>> print(etc)
['A', 'lot', 'of', 'spaces']
>>> line = "first;second;third"
>>> thing = line.split()
>>> print(thing)
['first;second;third']
>>> print(len(thing))
1
>>> thing = line.split(";")
>>> print(thing)
['first', 'second', 'third']
>>> print(len(thing))
3`)}
        <p>There are no spaces in <code>"first;second;third"</code>, so <code>split()</code> finds only one word. <code>split(";")</code> splits at each semicolon.</p>
        ${demo("split", "Demo 7 · split()", "type a string, pick a delimiter", "Amber cells are empty strings.")}` },
      { id: "double", title: "The double split pattern", html: `
        <p><b>Practice (slide 22).</b> An email header has this format:</p>
        ${out("From professor.xman@uct.edu Sat Jan 5 09:14:16 2008")}
        <p>Find the domain of the email address (<code>uct.edu</code>) and the month in which the email was sent (<code>Jan</code>). Split the line into words: the address is word 1 and the month is word 3. Then split the address <em>again</em>, at the <code>@</code>, and take the part after it.</p>
        ${demo("doubleSplit", "Demo 8 · The double split", "← → keys step")}
        ${out(`['From', 'professor.xman@uct.edu', 'Sat', 'Jan', '5', '09:14:16', '2008']
['professor.xman', 'uct.edu']
domain: uct.edu
month: Jan`)}
        ${callout("pattern", "PATTERN · DOUBLE SPLIT", `<p>Split a line one way to get its fields; pick one field and split <em>that</em> another way. Lines from files, logs and spreadsheets are full of fields inside fields: addresses, dates (<code>"2008-01-05".split("-")</code>), times (<code>"09:14:16".split(":")</code>).</p>`)}
        ${predict("Using <code>words</code> from above, what is <code>words[5].split(\":\")[0]</code>?",
          `${repl(`>>> words[5].split(":")[0]\n'09'`)}<p><code>words[5]</code> is <code>'09:14:16'</code>; splitting at <code>:</code> gives <code>['09', '14', '16']</code>, and item 0 is the hour, still a string.</p>`)}` },
    ],
    takeaways: ["split(): runs of spaces are one separator.", "split(\";\"): splits at every ;", "Double split: split a field again."],
  },
  {
    slug: "6-dicts", nav: "Dictionaries", title: "Dictionaries",
    subtitle: "Values with labels, looked up by key",
    abstract: "A dictionary maps keys to values. Look up with d[key], check with in, read safely with get(), and count anything with one line.",
    tags: ["key: value", "KeyError", "get()", "counting", "items()"],
    hero: "countMini", heroCaption: "Counting 13 names with a dictionary.",
    sections: [
      { id: "bag", title: "A story of two collections", html: `
        <p>A <b>list</b> is a linear collection of values that stay in order; you find a value by its position. A <b>dictionary</b> is a “bag” of values, each with its own label; you find a value by its label, called its <b>key</b>.</p>
        <p>Dictionaries are Python's most powerful collection. They let us do fast, database-like look-ups. Other languages have the same idea under other names: <em>associative arrays</em> (Perl, PHP), <em>Map</em> or <em>HashMap</em> (Java), <em>property bag</em> (C#).</p>
        <p>We put values into the dictionary with <code>d[key] = value</code>, and look them up with <code>d[key]</code>:</p>
        ${repl(`>>> purse = dict()
>>> purse["money"] = 12
>>> purse["candy"] = 3
>>> purse["tissues"] = 75
>>> print(purse)
{'money': 12, 'candy': 3, 'tissues': 75}
>>> print(purse["candy"])
3
>>> purse["candy"] = purse["candy"] + 2
>>> print(purse)
{'money': 12, 'candy': 5, 'tissues': 75}`)}
        <p>The last assignment <em>updates</em> the value stored under <code>"candy"</code>. Each key appears at most once in a dictionary; assigning to an existing key replaces its value. Keys do not have to be strings: numbers work too.</p>
        ${repl(`>>> purse = {"money": 12, "candy": 5, "tissues": 75}
>>> purse[3] = 77
>>> print(purse)
{'money': 12, 'candy': 5, 'tissues': 75, 3: 77}`)}
        ${callout("note", "NOTE · SLIDE 26: DICTIONARIES DO HAVE AN ORDER", `<p><b>Slide 26 says dictionaries are “like bags — no order”, and its screenshots print the keys in a scrambled order. That was true up to Python 3.6. Since Python 3.7 a dictionary keeps its keys in insertion order</b>: the order in which they were first added. Updating a value does not move its key. So <code>purse</code> prints as <code>money, candy, tissues</code>, and the new key <code>3</code> goes on the end. The same applies to the outputs on slides 28, 35, 36, 45 and 48; these notes show what Python 3.12 actually prints.</p>
          <p>Keep the “bag” picture for one thing: you look a value up by its <em>key</em>, never by its position. <code>purse[0]</code> does not mean “the first item”; it means “the value under the key 0”, and there is none.</p>`)}
        ${demo("dictViewer", "Demo 9 · Look up and update a dictionary", "pick a key, then an operation", "Try a key that isn't there with each of the first three buttons. Then add a new key and see where it goes.")}` },
      { id: "vs-list", title: "Lists versus dictionaries", html: `
        <p>A dictionary works like a list, except that it uses <b>keys</b> instead of positions to look up values:</p>
        ${repl(`>>> lst = list()
>>> lst.append(21)
>>> lst.append(183)
>>> print(lst)
[21, 183]
>>> lst[0] = 23
>>> print(lst)
[23, 183]
>>> ddd = dict()
>>> ddd["age"] = 21
>>> ddd["course"] = 182
>>> print(ddd)
{'age': 21, 'course': 182}
>>> ddd["age"] = 23
>>> print(ddd)
{'age': 23, 'course': 182}`)}
        <table><tr><th></th><th>list <code>lst</code></th><th>dictionary <code>ddd</code></th></tr>
        <tr><td>look up by</td><td>position: <code>lst[0]</code></td><td>key: <code>ddd["age"]</code></td></tr>
        <tr><td>the “labels” are</td><td>0, 1, 2, … in order</td><td>any keys you choose</td></tr>
        <tr><td>add a value</td><td><code>lst.append(21)</code></td><td><code>ddd["age"] = 21</code></td></tr>
        <tr><td>change a value</td><td><code>lst[0] = 23</code></td><td><code>ddd["age"] = 23</code></td></tr></table>
        <p>A dictionary literal uses <b>curly braces</b> around a list of <code>key: value</code> pairs. Empty curly braces make an empty dictionary.</p>
        ${repl(`>>> jjj = {"chuck": 1, "fred": 42, "jan": 100}
>>> print(jjj)
{'chuck': 1, 'fred': 42, 'jan': 100}
>>> ooo = {}
>>> print(ooo)
{}`)}` },
      { id: "counting", title: "Counting with a dictionary", html: `
        <p>One of the most common uses of a dictionary is <b>counting</b> how often we see something. Which name is most common here?</p>
        ${out("csev  zhen  zhen  marquard  cwen  csev  zhen  marquard\nmarquard  csev  cwen  zhen  zhen")}
        <p>With a dictionary, the first time we see a name we store it with count 1; each later time we add 1 to its count:</p>
        ${repl(`>>> ccc = dict()
>>> ccc["csev"] = 1
>>> ccc["cwen"] = 1
>>> print(ccc)
{'csev': 1, 'cwen': 1}
>>> ccc["cwen"] = ccc["cwen"] + 1
>>> print(ccc["cwen"])
2`)}
        <p>It is an error to look up a key that is not in the dictionary. The <code>in</code> operator tells you whether a <em>key</em> is in the dictionary:</p>
        ${repl(`>>> ccc = dict()
>>> print(ccc["csev"])
Traceback (most recent call last):
  ...
KeyError: 'csev'
>>> "csev" in ccc
False`)}
        <p>So a counting loop must ask, for each name: have I seen it before?</p>
        ${codeBlock(CODE.countIf)}
        ${out("{'csev': 2, 'cwen': 2, 'zqian': 1}")}
        ${demo("count", "Demo 10 · Counting, step by step", "pick a version, then step", "The bars show the counts so far. A new key always goes on the end.")}
        ${predict("Run the same loop on the thirteen names of the picture above. What is <code>counts</code>, and which name is most common?",
          `${repl(CODE.countIf13)}<p><code>zhen</code>, with 5. The keys come out in the order each name was <em>first</em> seen. Pick “the 13 names” in Demo 10 to check.</p>`)}
        ${callout("pitfall", "PITFALL · in CHECKS KEYS, NOT VALUES", `<p>With <code>counts</code> as above, <code>"zhen" in counts</code> is <code>True</code> but <code>5 in counts</code> is <code>False</code>. To check the values, ask <code>5 in counts.values()</code>.</p>
          ${repl(`>>> counts = {"csev": 3, "zhen": 5, "marquard": 3, "cwen": 2}
>>> "zhen" in counts, 5 in counts, 5 in counts.values()
(True, False, True)`)}`)}
        <p><b>Practice (slide 32).</b> Ask the user for words, one at a time, until they type <code>done</code>. For each word, say how many times it has been typed before. (Input: <code>hi</code>, <code>bye</code>, <code>hi</code>, <code>hi</code>, <code>done</code>.)</p>
        ${codeBlock(`seen = dict()
while True:
    word = input("Word: ")
    if word == "done":
        break
    if word in seen:
        print(word, "was typed", seen[word], "time(s) before")
        seen[word] = seen[word] + 1
    else:
        print(word, "is new")
        seen[word] = 1
print("Bye")`)}
        ${out("Word: hi is new\nWord: bye is new\nWord: hi was typed 1 time(s) before\nWord: hi was typed 2 time(s) before\nWord: Bye")}` },
      { id: "get", title: "The get() method", html: `
        <p>Checking whether a key is there, and using a default value if it is not, is so common that dictionaries have a method for it. <code>d.get(key, default)</code> returns <code>d[key]</code> if the key is in <code>d</code>, and <code>default</code> otherwise. It never raises <code>KeyError</code>, and it does not add the key.</p>
        ${repl(`>>> counts = {"aaa": 1, "bbb": 2, "ccc": 5}
>>> print(counts.get("eee", 0))
0
>>> print(counts.get("ccc", 0))
5
>>> counts
{'aaa': 1, 'bbb': 2, 'ccc': 5}`)}
        <p>With <code>get()</code>, the four-line <code>if</code>/<code>else</code> of the counting loop becomes one line (“get() · 5 names” in Demo 10):</p>
        ${codeBlock(CODE.countGet)}
        ${out("{'csev': 2, 'cwen': 2, 'zqian': 1}")}
        ${callout("pattern", "PATTERN · COUNTING WITH A DICTIONARY", `${codeBlock(`counts = dict()
for thing in things:
    counts[thing] = counts.get(thing, 0) + 1`, "repl")}<p><code>get(thing, 0)</code> reads “the count so far, or 0 if this is the first time”. Adding 1 and storing it back either creates the key with 1 or adds 1 to it. You will use this pattern for words, letters, votes, IP addresses, anything you need to tally.</p>`)}
        <p><b>Practice (slide 34).</b> Read a line of text and count each word with <code>get()</code>. (Input: <code>the clown ran after the car and the car ran into the tent</code>.)</p>
        ${codeBlock(`line = input("Enter a line of text: ")
counts = dict()
for word in line.split():
    counts[word] = counts.get(word, 0) + 1
print(counts)`)}
        ${out("Enter a line of text: {'the': 4, 'clown': 1, 'ran': 2, 'after': 1, 'car': 2, 'and': 1, 'into': 1, 'tent': 1}")}` },
      { id: "looping", title: "Looping over a dictionary", html: `
        <p>A <code>for</code> loop over a dictionary goes through its <b>keys</b>. Use each key to look up its value:</p>
        ${codeBlock(`counts = {"chuck": 1, "fred": 42, "jan": 100}
for key in counts:
    print(key, counts[key])`)}
        ${out("chuck 1\nfred 42\njan 100")}
        <p>The methods <code>keys()</code>, <code>values()</code> and <code>items()</code> give the keys, the values, or both. They return <em>views</em> of the dictionary; wrap them in <code>list()</code> to get an actual list. Each item is a <code>(key, value)</code> pair, written in round brackets: a <b>tuple</b> (next chapter).</p>
        ${repl(`>>> jjj = {"chuck": 1, "fred": 42, "jan": 100}
>>> print(list(jjj))
['chuck', 'fred', 'jan']
>>> print(list(jjj.keys()))
['chuck', 'fred', 'jan']
>>> print(list(jjj.values()))
[1, 42, 100]
>>> print(list(jjj.items()))
[('chuck', 1), ('fred', 42), ('jan', 100)]`)}
        <p>All three come out in the same order, the order of the keys. (Slide 36 shows them reversed; see the note on insertion order above.)</p>
        <p><b>Two iteration variables.</b> Looping over <code>items()</code> gives one pair per pass. With <b>two</b> iteration variables, the first gets the key and the second the value:</p>
        ${codeBlock(`counts = {"chuck": 1, "fred": 42, "jan": 100}
for key, value in counts.items():
    print(key, value)`)}
        ${out("chuck 1\nfred 42\njan 100")}
        ${predict(`<p>What does this print? Notice which variable is printed first.</p>${codeBlock(`stock = {"apples": 3, "pears": 0}
for name, n in stock.items():
    print(n, name)`)}`, `${repl(`>>> stock = {"apples": 3, "pears": 0}
>>> for name, n in stock.items():
...     print(n, name)
3 apples
0 pears`)}<p><code>3 apples</code> and then <code>0 pears</code>: the names <code>name</code> and <code>n</code> are bound to the key and the value; the <code>print</code> can use them in any order.</p>`)}` },
    ],
    takeaways: ["d[key]: KeyError if missing.", "get(key, 0) and in never fail.", "Keys keep insertion order (3.7+)."],
  },
  {
    slug: "7-tuples", nav: "Tuples", title: "Tuples and Sorting a Dictionary",
    subtitle: "Fixed groups of values, compared element by element",
    abstract: "A tuple is a sequence you can't change. Tuples unpack in assignments and compare element by element, which is all you need to sort a dictionary by value.",
    tags: ["immutable", "tuple assignment", "comparison", "sorted()", "top words"],
    hero: "code:topWords", heroCaption: "Count, decorate, sort, slice.",
    sections: [
      { id: "video", title: "Watch: tuples and sorting a dictionary", html: `
        <p>Part 4 of this lecture's videos covers chapter 7: tuples, tuple assignment, comparing tuples, sorting a dictionary by key and by value, and the ten most common words.</p>
        <div class="card video" data-video="${VIDEO_P4}"></div>` },
      { id: "tuples", title: "A sequence you cannot change", html: `
        <p><b>Tuples</b> are another kind of sequence. They work much like lists: the elements are indexed from 0, you can loop over them, and <code>max()</code> and <code>len()</code> work. A tuple is written with round brackets.</p>
        ${repl(`>>> x = ("Glenn", "Sally", "Joseph")
>>> print(x[2])
Joseph
>>> y = (1, 9, 2)
>>> print(y)
(1, 9, 2)
>>> print(max(y))
9
>>> for i in y:
...     print(i)
1
9
2`)}
        <p>But tuples are <b>immutable</b>, like strings. Once you have made a tuple, you cannot change its contents:</p>
        ${repl(`>>> x = [9, 8, 7]
>>> x[2] = 6
>>> print(x)
[9, 8, 6]
>>> y = "abc"
>>> y[2] = "e"
Traceback (most recent call last):
  ...
TypeError: 'str' object does not support item assignment
>>> z = (5, 4, 3)
>>> z[2]
3
>>> z[2] = 0
Traceback (most recent call last):
  ...
TypeError: 'tuple' object does not support item assignment`)}
        <p>So none of the list methods that change a list exist for tuples:</p>
        ${repl(`>>> x = (1, 2, 3)
>>> x.sort()
Traceback (most recent call last):
  ...
AttributeError: 'tuple' object has no attribute 'sort'
>>> x.append(5)
Traceback (most recent call last):
  ...
AttributeError: 'tuple' object has no attribute 'append'
>>> x.reverse()
Traceback (most recent call last):
  ...
AttributeError: 'tuple' object has no attribute 'reverse'`)}
        <p><b>A tale of two sequences.</b> Compare the methods of a list and a tuple. A tuple has only the two that do not change it:</p>
        ${repl(`>>> [name for name in dir(list()) if not name.startswith("__")]
['append', 'clear', 'copy', 'count', 'extend', 'index', 'insert', 'pop', 'remove', 'reverse', 'sort']
>>> [name for name in dir(tuple()) if not name.startswith("__")]
['count', 'index']`)}
        <p>Because Python doesn't have to make tuples changeable, they are simpler than lists and a little more efficient in memory and speed. More importantly, a tuple tells the reader “this group of values will not change”. We use tuples for small, fixed groups of values: a pair of coordinates, a <code>(key, value)</code> item, a record of a few fields, or several values returned from one function.</p>
        ${callout("note", "NOTE", `<p>A tuple of one element needs a comma: <code>(5,)</code> is a tuple, but <code>(5)</code> is just the number 5 in brackets. In fact it is the comma that makes a tuple; the brackets are often optional, as in <code>point = 3, 4</code>.</p>`)}` },
      { id: "assign", title: "Tuple assignment, and tuples in dictionaries", html: `
        <p>A tuple can stand on the <em>left</em> of an assignment. Python then assigns each element of the right-hand side to the name in the same position:</p>
        ${repl(`>>> (x, y) = (4, "fred")
>>> print(y)
fred
>>> a, b = 1, 2
>>> a, b = b, a        # swap: the right side is built first
>>> a, b
(2, 1)`)}
        <p>This is exactly what happens in <code>for key, value in counts.items():</code>. Each item is a tuple <code>(key, value)</code>, and tuple assignment unpacks it into the two loop variables. The <code>items()</code> method returns the <code>(key, value)</code> tuples of a dictionary:</p>
        ${repl(`>>> d = dict()
>>> d["csev"] = 2
>>> d["cwen"] = 4
>>> for (k, v) in d.items():
...     print(k, v)
csev 2
cwen 4
>>> tups = d.items()
>>> print(tups)
dict_items([('csev', 2), ('cwen', 4)])
>>> tups = list(tups)
>>> tups[1]
('cwen', 4)`)}
        ${callout("note", "NOTE · SLIDE 43", `<p>Slide 43 says the “<code>item()</code> method” returns “a list”. The method is <code>items()</code>, and it returns a <code>dict_items</code> view, as the slide's own screenshot shows. <code>list(d.items())</code> makes it a list.</p>`)}` },
      { id: "compare", title: "Tuples are comparable", html: `
        <p>The comparison operators work on tuples (and lists, and strings) element by element. Python compares the first elements; if they are equal it goes on to the second, and so on, until it finds two elements that differ. Those two decide the answer.</p>
        ${repl(CODE.tupleCmp)}
        <p>In the second line, the first elements are equal (0 and 0), so the second elements decide: 1 &lt; 3. The 2000000 is never looked at.</p>
        ${demo("compare", "Demo 11 · Comparing tuples", "pick a comparison, then step")}
        ${predict("Is <code>(\"Jones\", \"Sally\") &lt; (\"Jones\", \"Sam\")</code> true or false? Which characters decide?",
          `${repl(CODE.tupleCmpPredict)}<p>The first elements are equal, so Python compares <code>"Sally"</code> with <code>"Sam"</code>, which is itself an element-by-element comparison of characters: <code>S</code> = <code>S</code>, <code>a</code> = <code>a</code>, then <code>l</code> &lt; <code>m</code>. It is the last comparison in Demo 11.</p>`)}` },
      { id: "sorting", title: "Sorting a dictionary", html: `
        <p>Because tuples can be compared, a list of tuples can be sorted. This gives us a sorted version of a dictionary: get its items as a list, then sort that list. The items are sorted by their first element, the key.</p>
        ${repl(`>>> d = {"a": 10, "b": 1, "c": 22}
>>> t = list(d.items())
>>> t
[('a', 10), ('b', 1), ('c', 22)]
>>> d = {"c": 22, "a": 10, "b": 1}
>>> t = list(d.items())
>>> t
[('c', 22), ('a', 10), ('b', 1)]
>>> t.sort()
>>> t
[('a', 10), ('b', 1), ('c', 22)]`)}
        ${callout("note", "NOTE · SLIDE 45", `<p>Slide 45 makes <code>d</code> in the order <code>a, b, c</code> and shows the items as <code>c, b, a</code> before sorting. Since Python 3.7 they come out as <code>a, b, c</code>, already sorted, which makes the example look like <code>sort()</code> did nothing. The second <code>d</code> above is built in a different order so that the sort has something to do.</p>`)}
        <p><b>Using <code>sorted()</code>.</b> The built-in function <code>sorted()</code> takes any sequence and returns a <b>new sorted list</b>. The original is not changed:</p>
        ${codeBlock(`d = {"c": 10, "b": 1, "a": 22}
t = d.items()

w = sorted(t)
print(w)
print(t)`)}
        ${out("[('a', 22), ('b', 1), ('c', 10)]\ndict_items([('c', 10), ('b', 1), ('a', 22)])")}
        <p><code>sort()</code> is a method of lists and sorts in place; <code>sorted()</code> works on any sequence (including a <code>dict_items</code> view, a tuple or a string) and leaves it alone. Both take <code>reverse=True</code> to sort from largest to smallest.</p>
        <p><b>Practice (slide 47): sort by value.</b> Tuples are sorted by their <em>first</em> element. So build a list of tuples with the value first, <code>(value, key)</code>, and sort that:</p>
        ${repl(`>>> d = {"a": 10, "b": 1, "c": 22}
>>> tmp = list()
>>> for k, v in d.items():
...     tmp.append((v, k))
>>> print(tmp)
[(10, 'a'), (1, 'b'), (22, 'c')]
>>> tmp.sort(reverse=True)
>>> print(tmp)
[(22, 'c'), (10, 'a'), (1, 'b')]`)}
        ${callout("pattern", "PATTERN · DECORATE, SORT, UNDECORATE", `<p>To sort by something other than the first element, build tuples that put the thing you want to sort by first (<em>decorate</em>), sort the tuples, then pull out the part you need (<em>undecorate</em>). Swapping <code>(key, value)</code> to <code>(value, key)</code> is the most common case. (Later you will meet <code>sorted(d.items(), key=...)</code>, which does the same job in one line.)</p>`)}` },
      { id: "top", title: "Example: the ten most common words", html: `
        <p>Putting the whole lecture together: count the words in a text (a dictionary and <code>get()</code>), turn the counts into <code>(count, word)</code> tuples, sort them largest first, and print the first ten (a slice). The function takes the lines of the text as any sequence of strings, so we can test it on a short list:</p>
        ${demo("topWords", "Demo 12 · The most common words", "step, or drag n", "Four stages: count, decorate, sort, slice.")}
        ${out("the 7\ncar 3\nand 3")}
        <p><code>car</code> and <code>and</code> both have 3. Their tuples <code>(3, 'car')</code> and <code>(3, 'and')</code> tie on the count, so the words decide, and with <code>reverse=True</code> the later word in alphabetical order comes first.</p>
        <p>A file object is also a sequence of lines (Lecture 4), so the same function counts the words in a file. The slide's version reads <code>myhost.txt</code>:</p>
        ${codeBlock(`with open("myhost.txt") as fhand:
    for count, word in top_words(fhand):
        print(word, count)`)}
        ${callout("note", "NOTE", `<p>On the slide this program is written at the top level, with the result printed inside the loops. Here the counting is a function that <em>returns</em> the top pairs, and the caller prints them. A function that returns a value can be tested on a three-line list, as above, before you point it at a large file.</p>`)}` },
    ],
    takeaways: ["Tuples: ordered, immutable.", "Compare element by element.", "Sort by value: (value, key) tuples."],
  },
  {
    slug: "8-summary", nav: "Summary", title: "Summary and Practice",
    subtitle: "Check yourself, then write some collection code",
    abstract: "A one-page map of the lecture, six self-check questions, eight exercises with solutions, and a checklist for list and dictionary code an AI writes for you.",
    tags: ["knowledge map", "self-check", "exercises"],
    hero: "toc",
    sections: [
      { id: "map", title: "Knowledge map", html: `<div class="map">
        <div class="card"><h3>Lists</h3><ul><li><code>[1, 2, 3]</code>: ordered, <b>mutable</b></li><li>Index from 0; <code>t[a:b]</code> excludes <code>b</code></li><li><code>range()</code> is a range object</li><li>Loop over elements, or indices</li></ul></div>
        <div class="card"><h3>Changing lists</h3><ul><li><code>append</code>, <code>insert</code>, <code>pop</code>, <code>remove</code>, <code>sort</code></li><li>They change the list; most return <code>None</code></li><li><code>+</code>, slices, <code>sorted()</code> build new lists</li></ul></div>
        <div class="card"><h3>Names and objects</h3><ul><li>Assignment never copies</li><li><code>b = a</code>: two names, one list</li><li>Copy: <code>a[:]</code>, <code>list(a)</code>, <code>a.copy()</code></li><li>Functions can change a list passed in</li></ul></div>
        <div class="card"><h3>split()</h3><ul><li>String → list of words</li><li>No argument: runs of spaces</li><li>Double split: split a field again</li></ul></div>
        <div class="card"><h3>Dictionaries</h3><ul><li><code>{"chuck": 1}</code>: key → value</li><li><code>d[k]</code> → <code>KeyError</code> if missing</li><li><code>in</code>, <code>get(k, 0)</code> are safe</li><li>Insertion order since 3.7</li></ul></div>
        <div class="card"><h3>Tuples and sorting</h3><ul><li><code>(1, 9, 2)</code>: ordered, immutable</li><li><code>for k, v in d.items()</code></li><li>Compare element by element</li><li>Sort by value: <code>(v, k)</code> tuples</li></ul></div></div>` },
      { id: "check", title: "Check your understanding", html: `<div data-demo="quiz"><div class="demo-body"></div></div>` },
      { id: "exercises", title: "Exercises", html: `
        <p>★ trace or modify · ★★ write · ★★★ extend or combine. Test every function you write on the smallest inputs first (an empty list, an empty dictionary, an empty string), then on a normal one.</p>
        <h3>Exercise 1 ★ (trace)</h3>
        <p>Draw the names and objects after each line, then say what is printed.</p>
        ${codeBlock(`x = [5, 6]
y = x
z = x[:]
y[0] = 0
z.append(7)
print(x, y, z)`)}
        <details class="reveal"><summary>Solution</summary><p>After line 2, <code>x</code> and <code>y</code> are arrows to one list; after line 3, <code>z</code> is an arrow to a second list <code>[5, 6]</code>. <code>y[0] = 0</code> changes the shared list; <code>z.append(7)</code> changes only the copy.</p>${out("[0, 6] [0, 6] [5, 6, 7]")}</details>
        <h3>Exercise 2 ★ (find the bug)</h3>
        <p>This should print the three names in alphabetical order, but prints <code>None</code>. Fix it in two different ways.</p>
        ${repl(`>>> names = ["Tom", "Jerry", "Bat"]
>>> names = names.sort()
>>> print(names)
None`)}
        <details class="reveal"><summary>Solution</summary><p><code>sort()</code> sorts in place and returns <code>None</code>, and the assignment stores that <code>None</code> in <code>names</code>. Either call the method without assigning, or use <code>sorted()</code>, which returns a new list:</p>${repl(`>>> names = ["Tom", "Jerry", "Bat"]
>>> names.sort()
>>> print(names)
['Bat', 'Jerry', 'Tom']
>>> names = ["Tom", "Jerry", "Bat"]
>>> print(sorted(names))
['Bat', 'Jerry', 'Tom']`)}</details>
        <h3>Exercise 3 ★ (modify)</h3>
        <p>Change the double-split program so that it also prints the user name (the part before the <code>@</code>) and the hour the email was sent (<code>09</code>).</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`header = "From professor.xman@uct.edu Sat Jan 5 09:14:16 2008"
words = header.split()
address = words[1].split("@")
print("user:", address[0])
print("hour:", words[5].split(":")[0])`)}${out("user: professor.xman\nhour: 09")}</details>
        <h3>Exercise 4 ★★</h3>
        <p>Write <code>evens(numbers)</code> that returns a new list holding the even numbers of <code>numbers</code>, in order. The input list must not change.</p>
        <details class="reveal"><summary>Solution</summary><p>Accumulate into a new list:</p>${codeBlock(`def evens(numbers):
    result = []
    for n in numbers:
        if n % 2 == 0:
            result.append(n)
    return result`)}${repl(`>>> data = [3, 8, 5, 2, 6]
>>> evens(data)
[8, 2, 6]
>>> data
[3, 8, 5, 2, 6]
>>> evens([])
[]`)}</details>
        <h3>Exercise 5 ★★</h3>
        <p>Write <code>letter_counts(text)</code> that returns a dictionary counting each letter in <code>text</code>, ignoring case and skipping anything that is not a letter. (Use <code>ch.isalpha()</code> and <code>ch.lower()</code>.)</p>
        <details class="reveal"><summary>Solution</summary><p>The counting pattern, over characters instead of words:</p>${codeBlock(`def letter_counts(text):
    counts = dict()
    for ch in text:
        if ch.isalpha():
            ch = ch.lower()
            counts[ch] = counts.get(ch, 0) + 1
    return counts`)}${repl(`>>> letter_counts("Hello, World!")
{'h': 1, 'e': 1, 'l': 3, 'o': 2, 'w': 1, 'r': 1, 'd': 1}
>>> letter_counts("")
{}`)}</details>
        <h3>Exercise 6 ★★</h3>
        <p>Write <code>most_common(counts)</code> that takes a non-empty dictionary of counts and returns the key with the largest count. Use a loop over <code>items()</code> and the max-so-far pattern, not sorting.</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`def most_common(counts):
    best_key = None
    best_count = None
    for key, count in counts.items():
        if best_count is None or count > best_count:
            best_key = key
            best_count = count
    return best_key`)}${repl(`>>> most_common({"csev": 3, "zhen": 5, "marquard": 3, "cwen": 2})
'zhen'
>>> most_common({"only": 1})
'only'`)}<p>On a tie, the key seen first wins, because a later key replaces the best only when its count is strictly larger.</p></details>
        <h3>Exercise 7 ★★★ (invert a dictionary)</h3>
        <p>Write <code>group_by_count(counts)</code> that turns a dictionary of counts like <code>{"a": 2, "b": 1, "c": 2}</code> into a dictionary from each count to the list of keys that have it: <code>{2: ["a", "c"], 1: ["b"]}</code>.</p>
        <details class="reveal"><summary>Solution</summary><p>Each value of the new dictionary is a list that grows, so a new count starts an empty list and every key is appended to the list for its count.</p>${codeBlock(`def group_by_count(counts):
    groups = dict()
    for key, count in counts.items():
        if count not in groups:
            groups[count] = []
        groups[count].append(key)
    return groups`)}${repl(`>>> group_by_count({"a": 2, "b": 1, "c": 2})
{2: ['a', 'c'], 1: ['b']}`)}<p><code>groups[count].append(key)</code> changes the list stored <em>inside</em> the dictionary: the dictionary holds a reference to the list, just as a name does.</p></details>
        <h3>Exercise 8 ★★★ (sort by value, alphabetical ties)</h3>
        <p><code>top_words</code> breaks ties by putting the later word first (<code>car</code> before <code>and</code>). Write <code>top_words_ab(lines, n)</code> that also sorts by count, largest first, but breaks ties in alphabetical order. Hint: sort <code>(-count, word)</code> tuples in the normal (ascending) order.</p>
        <details class="reveal"><summary>Solution</summary><p>Negating the count makes larger counts sort first in ascending order, and then the second element, the word, breaks ties alphabetically.</p>${codeBlock(`def top_words_ab(lines, n=10):
    counts = dict()
    for line in lines:
        for word in line.split():
            counts[word] = counts.get(word, 0) + 1
    pairs = []
    for word, count in counts.items():
        pairs.append((-count, word))
    pairs.sort()
    result = []
    for neg_count, word in pairs[:n]:
        result.append((word, -neg_count))
    return result`)}${repl(`>>> top_words_ab(text, 3)
[('the', 7), ('and', 3), ('car', 3)]`)}</details>` },
      { id: "ai", title: "Working with AI", html: `
        <p>AI assistants write list and dictionary code fluently, and the bugs they leave are exactly this lecture's pitfalls. Check any collection code, yours or an AI's, with these questions:</p>
        <ol><li><b>Draw the arrows.</b> Where does the code write <code>b = a</code> or pass a list into a function? Is a change through one name supposed to show up through the other? Ask: <em>“Does this function change its input?”</em></li>
        <li><b>Look for a missing key.</b> Every <code>d[key]</code> read must be safe: is the key guaranteed to be there, or should it be <code>get()</code> or an <code>in</code> check?</li>
        <li><b>Check what methods return.</b> <code>sort()</code>, <code>append()</code> and <code>reverse()</code> return <code>None</code>. Any line like <code>x = x.sort()</code> is a bug.</li>
        <li><b>Check order assumptions.</b> Does the code rely on dictionary order? Since Python 3.7 that is insertion order, which is reliable but may not be the order you want; sort when order matters.</li>
        <li><b>Test the empty case:</b> an empty list, an empty dictionary, an empty line.</li></ol>
        <p>Try this: ask an assistant for “a function that removes duplicates from a list”. Then check: does it change the list you pass in, or return a new one? Does it keep the original order? (A version that goes through <code>set()</code> often does not.) What does it do with an empty list? Ask it to fix what you find, and check again.</p>` },
      { id: "terms", title: "Key terms and further reading", html: `
        <p class="tags">${["collection", "list", "element", "index", "IndexError", "mutable", "immutable", "range object", "concatenation", "slice", "method", "append", "in place", "name", "object", "reference", "alias (aliasing)", "is", "copy", "split", "delimiter", "double split", "dictionary", "key", "value", "KeyError", "get", "insertion order", "item", "tuple", "tuple assignment", "sorted"].map((t) => `<span class="tag">${t}</span>`).join("")}</p>
        <ul><li>C. Severance, <em>Python for Everybody</em>, chapters 8 (Lists), 9 (Dictionaries) and 10 (Tuples). The slides follow these chapters. <a href="https://www.py4e.com/book" target="_blank" rel="noopener">py4e.com/book</a></li>
        <li>J. DeNero, <em>Composing Programs</em>, §2.3 Sequences and §2.4 Mutable Data, for names, objects and mutation. <a href="https://www.composingprograms.com/pages/24-mutable-data.html" target="_blank" rel="noopener">composingprograms.com</a></li>
        <li>The Python tutorial, §5 Data Structures. <a href="https://docs.python.org/3/tutorial/datastructures.html" target="_blank" rel="noopener">docs.python.org</a></li>
        <li>Python Tutor, to watch names point at lists: <a href="https://pythontutor.com" target="_blank" rel="noopener">pythontutor.com</a></li></ul>` },
    ],
    takeaways: ["Assignment never copies.", "Count with get(x, 0) + 1.", "Sort by value with (value, key) tuples."],
  },
];

const QUIZ = [
  { q: "What is printed?",
    code: `a = [1, 2]
b = a
b.append(3)
a = a + [4]
print(a, b)`,
    opts: ["<code>[1, 2, 3, 4] [1, 2, 3, 4]</code>", "<code>[1, 2, 3, 4] [1, 2, 3]</code>", "<code>[1, 2, 4] [1, 2, 3]</code>", "<code>[1, 2] [1, 2, 3]</code>"],
    a: 1, why: "<code>b.append(3)</code> changes the one list both names refer to. <code>a = a + [4]</code> then builds a new list and re-binds only <code>a</code>." },
  { q: "What kind of object is <code>range(3)</code>?",
    opts: ["A list <code>[0, 1, 2]</code>", "A range object, which can be indexed, measured with <code>len()</code> and looped over", "A tuple <code>(0, 1, 2)</code>", "A generator that can be used only once"],
    a: 1, why: "Both <code>range(3)</code> and <code>[0, 1, 2]</code> can be indexed (<code>r[1]</code>), measured with <code>len()</code>, and looped over. But <code>range(3)</code> is a range object, not a list; <code>list(range(3))</code> makes the list." },
  { q: "What is <code>\"a,b,,c\".split(\",\")</code>?",
    opts: ["<code>['a', 'b', 'c']</code>", "<code>['a', 'b', '', 'c']</code>", "<code>['a,b,,c']</code>", "<code>['a', 'b', ',', 'c']</code>"],
    a: 1, why: "Four elements. With an explicit delimiter, two delimiters in a row have an empty string between them." },
  { q: "<code>d = {\"x\": 1}</code>. Which of these raises an error?",
    opts: ["<code>d.get(\"y\")</code>", "<code>\"y\" in d</code>", "<code>d[\"y\"]</code>", "<code>d[\"y\"] = 2</code>"],
    a: 2, why: "Only <code>d[\"y\"]</code> raises (<code>KeyError</code>). <code>get</code> returns <code>None</code> when no default is given, <code>in</code> returns <code>False</code>, and assignment adds the key." },
  { q: "Why can a tuple be a dictionary key while a list cannot?",
    opts: ["Tuples are faster to compare", "Keys must be immutable: a dictionary finds a key by its value when it was stored, so a key that could change could no longer be found", "Lists can't contain strings", "Dictionaries only accept strings and tuples"],
    a: 1, why: "If the key could change afterwards, the dictionary could no longer find it. So keys must be immutable: numbers, strings, tuples of those. <code>{[1, 2]: \"no\"}</code> raises <code>TypeError: unhashable type: 'list'</code>." },
  { q: "What is <code>sorted([(\"b\", 2), (\"a\", 9), (\"b\", 1)])</code>?",
    opts: ["<code>[('a', 9), ('b', 2), ('b', 1)]</code>", "<code>[('b', 1), ('b', 2), ('a', 9)]</code>", "<code>[('a', 9), ('b', 1), ('b', 2)]</code>", "<code>[('b', 2), ('a', 9), ('b', 1)]</code>"],
    a: 2, why: "The first elements decide, except between the two <code>'b'</code> tuples, where the second elements do." },
];
