// Chapter content, adapted from notes/L10-stacks-queues-lists-trees.md. Every code panel
// and output is CODE[...] from demos.js, which is copied from the checked note.

const demo = (name, title, instr, hint = "") =>
  `<div class="card demo" data-demo="${name}"><div class="head"><span class="title">${title}</span><span>${instr}</span></div>
   <div class="demo-body"></div>${hint ? `<p class="hint">${hint}</p>` : ""}</div>`;

const callout = (kind, label, body) => `<div class="callout ${kind}"><b>${label}</b>${body}</div>`;
const predict = (q, a) => callout("predict", "PREDICT", `<p>${q}</p><details class="reveal"><summary>Show the answer</summary>${a}</details>`);
const py = (k) => codeBlock(CODE[k]);
const repl = (k) => codeBlock(CODE[k], "repl");
const out = (k) => codeBlock(CODE[k], "out");
const VIDEO_P1 = "media/L10-1.mp4";
const VIDEO_P2 = "media/L10-2.mp4";
const VIDEO_P3 = "media/L10-3.mp4";
const VIDEO_P4 = "media/L10-4.mp4";
const L06 = (hash, text) => `<a href="../L06/#/${hash}">${text}</a>`;

const LECTURE = {
  number: 10,
  title: "Stacks, Queues, Lists and Trees",
  tagline: "Data Structures and Algorithms II",
  lead: "Four ways to arrange data, each fast at some operations and slow at others. Push and pop a stack, wrap a queue around a circle, rewire the arrows of a linked list, and walk a tree with three recursive traversals — every step can be played forwards and backwards.",
  heroDemo: "linkedMini",
  heroLabel: "A live linked list · add_first, remove_first",
  heroCaption: "The new node takes the old head first; only then does head move. Unreachable nodes fade out.",
  whyTitle: "Why data structures are worth learning",
  whySub: "Three ideas you will use far beyond this lecture",
  why: [
    ["Choose by the operations", "A <b>stack</b> for the most recent item, a <b>queue</b> for the oldest, a <b>linked list</b> for cheap changes at the ends."],
    ["References are arrows", "A linked structure is objects pointing at objects. Change the arrows in the right order and nothing is lost."],
    ["Recursion meets data", "A <b>tree</b> is a root plus smaller trees, so the natural way to walk it is the multiple recursion of Lecture 6."],
  ],
  ctaTitle: "Ready to push, pop and rewire some pointers?",
  minutes: "About 90–120 minutes",
  videos: {
    [VIDEO_P1]: "Lecture 10 · Part 1 — Stacks, last in first out (8.6 min)",
    [VIDEO_P2]: "Lecture 10 · Part 2 — Queues in a circle (7.1 min)",
    [VIDEO_P3]: "Lecture 10 · Part 3 — Linked lists, nodes and arrows (9.1 min)",
    [VIDEO_P4]: "Lecture 10 · Part 4 — Bubble sort and trees (8.4 min)",
  },
};

const CHAPTERS = [
  {
    slug: "1-stack", nav: "Stacks", title: "Stacks",
    subtitle: "Last in, first out",
    abstract: "A stack lets you add at any time but only look at or remove the most recent item. The Back button, Undo, and Python's own call stack all work this way.",
    tags: ["LIFO", "push / pop / top", "ListStack"],
    hero: "stackMini", heroCaption: "Push adds on top; pop takes the top away.",
    sections: [
      { id: "video", title: "Watch: stacks, last in first out", html: `
        <p>The first video of this lecture covers Chapters 1 and 2: the stack and its operations, a stack built on a Python list, and its three uses: reversing a list, matching brackets and checking HTML tags.</p>
        <div class="card video" data-video="${VIDEO_P1}"></div>` },
      { id: "dsa", title: "Data structures and algorithms", html: `
        <p>A <b>data structure</b> is a systematic way of organising and accessing data. An <b>algorithm</b> is a step-by-step procedure for performing some task in a finite amount of time. Lecture 9 was mostly about algorithms (searching, sorting, how their running time grows). This lecture is about data structures: four ways to arrange data, each good at some operations and bad at others.</p>
        <p>You already know Python's built-in data structures: <code>list</code>, <code>tuple</code>, <code>dict</code>, <code>set</code>. The structures in this lecture are built <em>on top of</em> them, or out of small objects that point to each other. We write them as classes (Lecture 8), so each one comes with a short list of methods. Knowing what those methods are, and what they cost, is most of the skill.</p>` },
      { id: "lifo", title: "Last in, first out", html: `
        <p>A <b>stack</b> is a collection of objects that are inserted and removed according to the <b>last-in, first-out (LIFO)</b> principle. You may add an object at any time, but you may only look at or remove the most recently added object that is still there, the one at the <b>top</b> of the stack. Think of a stack of plates: you put a plate on top, and you take a plate from the top.</p>
        <ul><li><b>The Back button of a web browser.</b> Each time you visit a new page, its address is <b>pushed</b> onto a stack. Pressing Back <b>pops</b> the most recent address and returns to the one below it.</li>
        <li><b>Undo in a text editor.</b> Each change you make is pushed onto a stack. Undo pops the most recent change and reverts it.</li></ul>
        ${callout("note", "LINK TO LECTURE 6", `<p><b>The call stack is a stack.</b> Every function call pushes a frame; every <code>return</code> pops the top frame. That is why the last call made, <code>fact(0)</code>, was the first to return. Replay it in ${L06("2-stack", "Lecture 6, Demo 2")}.</p>`)}` },
      { id: "ops", title: "The stack operations", html: `
        <p>A stack <code>S</code> supports these operations:</p>
        <table><tr><th>operation</th><th>what it does</th></tr>
        <tr><td><code>S.push(e)</code></td><td>add element <code>e</code> to the top of <code>S</code></td></tr>
        <tr><td><code>S.pop()</code></td><td>remove and return the top element; an error if <code>S</code> is empty</td></tr>
        <tr><td><code>S.top()</code></td><td>return the top element without removing it; an error if <code>S</code> is empty</td></tr>
        <tr><td><code>S.is_empty()</code></td><td>return <code>True</code> if <code>S</code> has no elements</td></tr>
        <tr><td><code>len(S)</code></td><td>the number of elements; in Python we write the method <code>__len__</code></td></tr></table>
        <p>A description like this, which says <em>what</em> the operations do but not <em>how</em> they are stored, is called an <b>abstract data type (ADT)</b>. Any class with these five methods is a stack, however it stores its elements.</p>` },
      { id: "liststack", title: "A stack built on a Python list", html: `
        <p>A Python list already adds and removes at its end quickly, so the top of the stack is the end of the list:</p>
        ${py("listStack")}
        ${callout("note", "NOTE", `<p>Two differences from the slide version. The slides name the list <code>self.__data</code>, with two underscores; one underscore, <code>self._data</code>, is the usual Python way to say “internal, don't touch from outside” (two underscores also make Python rename the attribute, which is rarely what you want). And where the slides <code>print('The stack is empty.')</code> in <code>top</code> and <code>pop</code>, these notes <b>raise an error</b>, as the operation table says. A method that prints and carries on returns <code>None</code>, and the caller never finds out that something went wrong.</p>`)}
        <p>The slides' program that uses it:</p>
        ${py("mainStack")}
        ${predict("Before you read the output: what are the four lines it prints? How many elements are left on the stack at the end?",
          `${out("mainStackOut")}<p><code>top</code> looks at 300 without removing it, so <code>pop</code> then returns the same 300. After that, 200 is on top. Two elements are left, 100 and 200:</p>${repl("stackRepl")}`)}
        ${demo("stack", "Demo 1 · Push and pop", "← → keys step", "Type your own operations: numbers are pushed, <code>pop</code> and <code>top</code> are operations. The highlighted line is the method that runs.")}
        ${callout("pitfall", "PITFALL · POPPING AN EMPTY STACK", `<p>It is an error, and with the class above you see it at once:</p>${repl("emptyPop")}<p>With the slide version, <code>print(s.pop())</code> on an empty stack prints the message <em>and then <code>None</code></em>, and the program carries on with a <code>None</code> where a value should be. Always check <code>is_empty()</code> before you pop. (Pick “pop an empty stack” in Demo 1.)</p>`)}
        ${predict("Start from an empty stack and run: <code>push(5)</code>, <code>push(3)</code>, <code>pop()</code>, <code>push(2)</code>, <code>push(8)</code>, <code>pop()</code>, <code>pop()</code>, <code>push(9)</code>, <code>push(1)</code>, <code>pop()</code>. Which values do the four <code>pop</code>s return, and what is left on the stack, bottom to top?",
          `<p>The pops return 3, 8, 2, 1. Left on the stack, bottom to top: 5, 9.</p>${repl("predictStack")}<p>(Looking at <code>s._data</code> from outside the class is fine for learning, and wrong in a real program: the whole point of the ADT is that callers only use its five operations.)</p>`)}` },
    ],
    takeaways: ["A stack is last in, first out.", "push · pop · top · is_empty · len.", "Popping an empty stack is an error."],
  },
  {
    slug: "2-using", nav: "Using stacks", title: "Using a Stack",
    subtitle: "Reverse a list, match brackets, check HTML tags",
    abstract: "A stack is the right tool whenever the last thing you saw is the first thing you need to deal with. The slides' three practice problems all use the same trick.",
    tags: ["reverse_data", "is_matched", "is_matched_html"],
    hero: "matcherMini", heroCaption: "Each closing bracket must match the most recent open one.",
    sections: [
      { id: "reverse", title: "Reversing a list", html: `
        <p>Push every element, then pop them all: they come out in the opposite order.</p>
        ${py("reverseData")}
        ${repl("reverseRepl")}
        ${callout("note", "NOTE", `<p>The slides write <code>oldList</code>, <code>newList</code> and store each popped value in a variable called <code>mid</code>. These notes use PEP 8 names (<code>old_list</code>, <code>new_list</code>) and append the popped value directly.</p>`)}` },
      { id: "brackets", title: "Matching brackets", html: `
        <p>In a correct arithmetic expression, every opening bracket <code>(</code>, <code>[</code> or <code>{</code> is closed by a closing bracket of the same kind, and brackets close in the reverse order they opened: <code>[(5+x)-(y+z)]</code> is correct, <code>[(5+x])</code> is not. The bracket that must close next is always the most recently opened one that is still open, so keep the open brackets on a stack:</p>
        <ul><li>if the character is <code>(</code>, <code>[</code> or <code>{</code>, push it;</li>
        <li>if it is <code>)</code>, <code>]</code> or <code>}</code>, pop the stack and check that the popped bracket is the same kind. If the stack is empty, there is nothing to match, so the expression is wrong;</li>
        <li>at the end, the expression is correct only if the stack is empty.</li></ul>
        ${py("isMatched")}
        <p><code>righty.index(c)</code> is the position of <code>c</code> in <code>")]}"</code>, so <code>)</code> is 0, <code>]</code> is 1 and <code>}</code> is 2. The opening brackets are in the same order in <code>lefty</code>, so a pair matches when the two positions are equal.</p>
        ${repl("matchedRepl")}
        ${demo("matcher", "Demo 2 · The bracket and tag matcher", "pick an example, then step", "Try the examples, or type your own expression and press Enter. Switch to “HTML tags” for <code>is_matched_html</code>.")}
        ${predict("What do <code>is_matched(\"(()\")</code> and <code>is_matched(\"())(\")</code> return? For each, which line of the function decides the answer?",
          `${repl("matchedPredict")}<p>In <code>"(()"</code> every closing bracket matches, but one <code>(</code> is still on the stack at the end, so the last line returns <code>False</code>. In <code>"())("</code> the second <code>)</code> finds the stack empty, and the function returns <code>False</code> there, without even looking at the last <code>(</code>.</p>`)}
        ${callout("pitfall", "PITFALL · COUNTING IS NOT ENOUGH", `<p>“Same number of opening and closing brackets” is not the test: <code>")("</code> and <code>"([)]"</code> both have equal counts and are both wrong. The stack checks the <em>order</em> as well as the count.</p>${repl("countingPitfall")}`)}` },
      { id: "html", title: "Matching tags in HTML", html: `
        <p>HTML, the language of web pages, marks up text with <b>tags</b>. An opening tag has the form <code>&lt;name&gt;</code> and the matching closing tag <code>&lt;/name&gt;</code>: <code>&lt;p&gt;</code> opens a paragraph and <code>&lt;/p&gt;</code> closes it, <code>&lt;ol&gt;</code> and <code>&lt;li&gt;</code> make a numbered list and its items, <code>&lt;h1&gt;</code> a heading. Tags must nest like brackets, so the same stack idea checks them. The function finds each <code>&lt;</code>, then the <code>&gt;</code> after it, and takes the text between as the tag name:</p>
        ${py("isMatchedHtml")}
        <p><code>raw.find("&lt;", k + 1)</code> searches from index <code>k + 1</code> onwards and returns <code>-1</code> when there is no more <code>&lt;</code>. Here is part of the slides' sample page:</p>
        ${repl("htmlRepl")}
        ${callout("note", "NOTE", `<p>The slide version reads the page from a file, <code>sampleHTML.txt</code>. Reading a file (Lecture 7) and checking it are separate jobs, so here the function takes the text as a string, and the caller can get that string from a file, a web page or a test.</p>`)}` },
    ],
    takeaways: ["Push, then pop: the order reverses.", "The most recent open bracket must close first.", "At the end the stack must be empty."],
  },
  {
    slug: "3-queue", nav: "Queues", title: "Queues",
    subtitle: "First in, first out",
    abstract: "A queue adds at the back and removes at the front. In a fixed-size list it wraps around the end like a circle, so nothing ever has to move.",
    tags: ["FIFO", "circular list", "web service"],
    hero: "queueMini", heroCaption: "front and end chase each other round five slots.",
    sections: [
      { id: "video", title: "Watch: queues in a circle", html: `
        <p>The second video covers this chapter: the queue, why <code>pop(0)</code> is slow, the circular list with <code>_front</code>, <code>_end</code> and <code>%</code>, and the web-service simulation.</p>
        <div class="card video" data-video="${VIDEO_P2}"></div>` },
      { id: "fifo", title: "First in, first out", html: `
        <p>A <b>queue</b> is a collection of objects that are inserted and removed according to the <b>first-in, first-out (FIFO)</b> principle. Elements can be added at any time, but only the element that has been in the queue the longest can be removed next. New elements join at the <b>back</b>; elements leave from the <b>front</b>. A line of people waiting for tickets is a queue, and so are the calls waiting at a call centre and the documents waiting for a printer.</p>
        <table><tr><th>operation</th><th>what it does</th></tr>
        <tr><td><code>Q.enqueue(e)</code></td><td>add element <code>e</code> to the back of <code>Q</code></td></tr>
        <tr><td><code>Q.dequeue()</code></td><td>remove and return the first element; an error if <code>Q</code> is empty</td></tr>
        <tr><td><code>Q.first()</code></td><td>return the first element without removing it; an error if <code>Q</code> is empty</td></tr>
        <tr><td><code>Q.is_empty()</code></td><td>return <code>True</code> if <code>Q</code> has no elements</td></tr>
        <tr><td><code>len(Q)</code></td><td>the number of elements</td></tr></table>` },
      { id: "circular", title: "A queue in a circular list", html: `
        <p>A first idea is to use a Python list: <code>append</code> to enqueue, <code>pop(0)</code> to dequeue. It works, but <code>pop(0)</code> is slow on a long list: every remaining element moves one place to the left to fill the gap, so dequeuing from a queue of n elements costs about n steps.</p>
        <p>The slides avoid the moving. Keep the elements in a list of fixed size, remember the index of the front element, and let the queue wrap around the end of the list as if the list were a circle. Two indices do the work: <code>_front</code> is where the first element is, and <code>_end</code> is where the next element will go. Each one moves forward by one, and <code>(index + 1) % CAPACITY</code> makes it jump from the last slot back to slot 0.</p>
        ${py("listQueue")}
        ${callout("note", "NOTE", `<p>The slides call the capacity <code>default_capacity</code> and print a message when the queue is empty or full; here it is a constant, <code>CAPACITY</code> (PEP 8 writes constants in capitals), and the errors are raised, as for the stack. Goodrich's version (§6.2) makes the list twice as big when it fills up instead of refusing; the slides keep it fixed at 5.</p>`)}
        ${predict("Start with an empty <code>ListQueue</code>. Enqueue 10, 20, 30 and 40, dequeue twice, then enqueue 50 and 60. What is in each of the five slots of <code>_data</code> now? What are <code>_front</code> and <code>_end</code>?",
          `${repl("queueRepl")}<p>50 went into the last slot, index 4. Then <code>_end</code> became <code>(4 + 1) % 5 = 0</code>, so 60 went into slot 0, which the first dequeue had freed. The queue, front to back, was 30, 40, 50, 60: read from <code>_front</code> and wrap around, as the last line shows.</p>`)}
        ${demo("queue", "Demo 3 · Enqueue and dequeue in a circle", "← → keys step", "Numbers are enqueued, <code>deq</code> dequeues. Watch <code>end</code> jump from slot 4 back to slot 0.")}
        ${callout("pitfall", "PITFALL", `<p><b><code>front</code> and <code>end</code> are not “first slot” and “last slot”.</b> Once the queue has wrapped around, the first element can be in a higher slot than the last one, as in the Predict box above. Never read the slots of <code>_data</code> left to right as if they were the queue; always start at <code>_front</code> and count <code>_size</code> elements, wrapping with <code>%</code>.</p>`)}` },
      { id: "web", title: "Simulating a web service", html: `
        <p>The slides' practice: a video website keeps unprocessed requests in a service queue. A new request joins the back of the queue; the server processes requests first come, first served. The queue holds at most 5 requests; a request that arrives when it is full is dropped.</p>
        ${py("webService")}
        ${callout("note", "NOTE", `<p>The slides keep two queues side by side, one for names and one for times, and must enqueue and dequeue both in step. One queue of <code>(name, seconds)</code> pairs cannot get out of step. The slides also write <code>self.nameQ.__len__()</code>; <code>len(self._requests)</code> calls the same method and is how Python code says it.</p>`)}
        <p>The slides drive the simulation with random numbers: on each of 30 ticks, with probability 0.6 a random request arrives, otherwise one request is processed. A random run is different every time, so here is a fixed sequence of events instead (<code>None</code> means “process one request”):</p>
        ${py("simulate")}
        ${out("simulateOut")}
        ${demo("webService", "Demo 4 · The service queue", "step through the ten events")}
        ${predict("Which requests are still waiting at the end, front to back?",
          `<p>X-man, Casino Royale and Shaolin Soccer. “Dark knight” arrived when five requests were waiting and was dropped.</p>`)}
        ${callout("note", "NOTE", `<p>For real programs Python has a ready-made queue: <code>collections.deque</code> adds and removes at both ends quickly, with no capacity limit.</p>${repl("dequeRepl")}`)}` },
    ],
    takeaways: ["A queue is first in, first out.", "enqueue at the back, dequeue at the front.", "A circular list wraps with %; nothing moves."],
  },
  {
    slug: "4-linked", nav: "Linked lists", title: "Linked Lists",
    subtitle: "Nodes that point to the next node",
    abstract: "A singly linked list is a chain of small objects, each holding an element and a reference to the next. Adding and removing at the head is cheap; the order you change the arrows in is everything.",
    tags: ["Node", "head / tail", "add_first · add_last · remove_first"],
    hero: "linkedMini", heroCaption: "add_first: link the new node first, then move head.",
    sections: [
      { id: "video", title: "Watch: linked lists, nodes and arrows", html: `
        <p>The third video covers Chapters 4 to 6: nodes and links, traversal, adding and removing at the ends, the linked stack and queue, and circular and doubly linked lists.</p>
        <div class="card video" data-video="${VIDEO_P3}"></div>` },
      { id: "refs", title: "A Python list holds references", html: `
        <p>Python's <code>list</code> is fast and is often the best choice. But it is not the only way to keep a sequence, and many languages have nothing like it. Look at what a Python list actually stores: not the numbers themselves but <b>references</b> to number objects, one per slot (Lecture 3's names-and-objects picture). Inserting into the middle moves the references along; the objects themselves stay where they are:</p>
        ${repl("referential")}
        <p>(<code>id(x)</code> is a number that identifies the object <code>x</code> while it exists. The old elements are the same objects as before, now one slot further along.) Languages such as C, C++ and Java usually store numbers in a <b>compact array</b> instead: the slots hold the bits of the numbers themselves, one after another, with no references. That uses much less memory, but inserting at the front of either kind of array means moving every element.</p>` },
      { id: "nodes", title: "Nodes and links", html: `
        <p>A <b>singly linked list</b> is a collection of <b>nodes</b> that together form a sequence. Each node stores a reference to an element of the sequence and a reference to the <b>next</b> node. The first node is the <b>head</b> of the list and the last is the <b>tail</b>; the tail's <code>next</code> is <code>None</code>.</p>
        ${out("diagramSingly")}
        ${py("node")}
        ${callout("note", "NOTE", `<p>The slides call the second attribute <code>pointer</code> in the singly linked lists and <code>nxt</code> in the doubly linked list. These notes use <code>next</code> throughout, as Goodrich does (spelled <code>_next</code> there). A parameter called <code>next</code> hides Python's built-in <code>next()</code> inside <code>__init__</code>, which does no harm here.</p>`)}
        <p>We can build the list in the picture by hand, starting from the tail:</p>
        ${py("buildNodes")}
        ${out("buildNodesOut")}
        <p><code>Node("ATL", bos)</code> does not copy <code>bos</code>; it stores one more reference to the same node. A linked list is nothing but nodes pointing at each other.</p>` },
      { id: "traverse", title: "Traversing a linked list", html: `
        <p>To visit every node, start at the head and keep following <code>next</code> until you reach <code>None</code>. This is called <b>traversing</b> the list, or <b>link hopping</b>:</p>
        ${py("printList")}
        ${repl("printListRepl")}
        ${demo("traverse", "Demo 5 · Hopping along the list", "step")}
        <p>There is no <code>head[2]</code>: to reach the third node you must hop twice from the head. Getting the element at position k takes k hops, where a Python list jumps straight there.</p>` },
      { id: "ops", title: "Adding and removing at the ends", html: `
        <p>Now wrap the nodes in a class that remembers the head, the tail and the size, and give it the slides' three operations. To add an element at the head:</p>
        <ol><li>make a new node for the element;</li><li>point its <code>next</code> at the old head;</li><li>make <code>head</code> refer to the new node;</li><li>add 1 to the size.</li></ol>
        ${out("diagramAddFirst")}
        <p>To add at the tail, point the old tail's <code>next</code> at the new node, then move <code>tail</code>. To remove the head, move <code>head</code> to <code>head.next</code>; the old first node is no longer referenced by the list, and Python reclaims it.</p>
        ${py("linkedList")}
        ${repl("citiesRepl")}
        ${demo("linkedList", "Demo 6 · Rewiring a linked list", "← → keys step", "Amber marks the arrow or name that the current line changes. Faded, dashed nodes can't be reached from <code>head</code>. Type an element and press a method button to run it on the list.")}
        ${callout("note", "NOTE", `<p>The slides give <code>add_first</code>, <code>add_last</code> and <code>remove_first</code> as pseudocode. The pseudocode for <code>add_last</code> writes <code>L.tail.next = newest</code> straight away; on an empty list <code>L.tail</code> is <code>None</code>, and that line fails. The code above handles the empty list separately, and <code>add_first</code> and <code>remove_first</code> keep <code>tail</code> right when the list becomes non-empty or empty. <em>Every</em> linked-list method needs a thought about the empty list. (Pick “the empty-list cases” in Demo 6.)</p>`)}
        ${predict("Starting from an empty <code>LinkedList</code>, call <code>add_first(1)</code>, <code>add_last(2)</code>, <code>add_first(3)</code>, <code>remove_first()</code>, <code>add_last(4)</code>. What does <code>elements()</code> return? What are <code>head.element</code> and <code>tail.element</code>?",
          `${repl("numsRepl")}<p>Check it with “the Predict box” in Demo 6.</p>`)}
        ${callout("pitfall", "PITFALL · THE ORDER OF THE ASSIGNMENTS MATTERS", `<p>In <code>add_first</code>, the new node must take the old head <em>before</em> <code>head</code> moves. Swap the two lines and the old head is lost:</p>${py("addFirstWrong")}${repl("brokenRepl")}<p>The node now points at itself, <code>"MSP"</code> is unreachable from the head, and a traversal would loop forever. Draw the boxes and arrows, and change the arrows in an order that never leaves a node with nothing pointing to it. (Pick “bug: add_first_wrong” in Demo 6.)</p>`)}` },
      { id: "tail", title: "Removing at the tail is slow", html: `
        <p>Adding at either end and removing at the head each take a few steps, however long the list is. Removing the <em>tail</em> is different. After removing it, <code>tail</code> must refer to the node before it, and the only way to find that node is to hop from the head: about n steps for a list of n nodes. A singly linked list can only go forwards. (Chapter 6 fixes this with a second link in every node.)</p>` },
    ],
    takeaways: ["A node holds an element and next.", "Link the new node before moving head.", "Always ask: what if the list is empty?"],
  },
  {
    slug: "5-linked-adt", nav: "Linked ADTs", title: "Linked Stacks, Queues and Circles",
    subtitle: "The same ADTs, stored in nodes",
    abstract: "The stack and queue ADTs don't say how elements are stored, so linked nodes work as well as a list — with no capacity limit. Close the chain into a circle and you have a round-robin scheduler.",
    tags: ["LinkedStack", "LinkedQueue", "CircularQueue"],
    hero: "roundMini", heroCaption: "Round-robin: dequeue, serve, enqueue — round and round.",
    sections: [
      { id: "stack", title: "A linked stack", html: `
        <p>The stack and queue ADTs say nothing about how elements are stored, so we can store them in linked nodes instead of a list. The node class is the same <code>Node</code>.</p>
        <p><b>A linked stack.</b> The top of the stack is the head: pushing is <code>add_first</code>, popping is <code>remove_first</code>. Both take a few steps. The stack never needs a tail.</p>
        ${py("linkedStack")}
        <p><code>Node(e, self._head)</code> is the whole of <code>add_first</code> in one line: the right-hand side makes the new node, pointing at the old top, before <code>self._head</code> changes.</p>` },
      { id: "queue", title: "A linked queue", html: `
        <p><b>A linked queue.</b> Elements leave at the front and join at the back, so the front is the head (removing there is fast) and the back is the tail (adding there is fast). Removing at the tail would be slow, so the queue never does it.</p>
        ${py("linkedQueue")}
        ${repl("linkedAdtRepl")}
        ${demo("linkedAdt", "Demo 7 · LinkedQueue and LinkedStack", "pick one, then step", "Numbers are added; <code>deq</code> / <code>pop</code> remove. In the queue, elements join at <code>_tail</code> and leave at <code>_head</code>.")}
        ${predict("<code>ListQueue</code> refuses a sixth element. Does <code>LinkedQueue</code> have a capacity? What does each <code>enqueue</code> cost in memory?",
          `<p>No capacity: every <code>enqueue</code> makes one new node, so the queue grows until the computer runs out of memory. The price is one node per element: the element reference plus a <code>next</code> reference, instead of one slot in a list.</p>`)}` },
      { id: "circular", title: "Circularly linked lists", html: `
        <p>In a <b>circularly linked list</b> the tail's <code>next</code> points back to the head instead of to <code>None</code>. There is no end: hopping from any node, you eventually come back to it. The list only needs to remember the tail, because the head is always <code>tail.next</code>.</p>
        <p>A circle is what a <b>round-robin scheduler</b> needs. It serves a collection of clients in turn, over and over: a computer's operating system gives each running program a short slice of processor time, then moves on to the next, and after the last one starts again with the first. With any queue, round-robin is three steps, repeated:</p>
        <ol><li><code>e = Q.dequeue()</code></li><li>serve <code>e</code></li><li><code>Q.enqueue(e)</code></li></ol>
        <p>Here is the slides' queue on a circularly linked list:</p>
        ${py("circularQueue")}
        ${py("roundRobin")}
        ${out("roundRobinOut")}
        ${demo("roundRobin", "Demo 8 · Round-robin on a circle", "step or play", "The curved arrow under the row is the tail's <code>next</code>, back to the head. The code panel shows <code>dequeue</code> and <code>enqueue</code>.")}
        ${callout("note", "NOTE", `<p>On a circular list, “dequeue then enqueue the same element” can be done without making a new node: just move <code>_tail</code> one step forward, <code>self._tail = self._tail.next</code>. Goodrich (§7.2) adds this as a method called <code>rotate</code>.</p>`)}` },
    ],
    takeaways: ["Linked stack: the head is the top.", "Linked queue: head = front, tail = back.", "Circular list: the head is tail.next."],
  },
  {
    slug: "6-doubly", nav: "Doubly linked", title: "Doubly Linked Lists",
    subtitle: "Two links per node, and sentinels at both ends",
    abstract: "Give every node a link to the node before it, and put a dummy node at each end. Then one method inserts anywhere and one deletes anything, with no special cases.",
    tags: ["prev / next", "header / trailer", "insert_between · delete_node"],
    hero: "dllMini", heroCaption: "Four links change on insert, two on delete.",
    sections: [
      { id: "dll", title: "Two links per node", html: `
        <p>A singly linked list can add at both ends and remove at the head quickly, but removing the tail is slow, because no node knows the node before it. In a <b>doubly linked list</b> every node keeps two references: <code>next</code> to the node after it and <code>prev</code> to the node before it.</p>
        <p>To avoid special cases at the ends, the list also has two extra nodes that hold no element: a <b>header</b> before the first real node and a <b>trailer</b> after the last. These dummy nodes are called <b>sentinels</b>. An empty list is just the header and the trailer pointing at each other, and every real node always has a node on both sides. So one method can insert anywhere, and one method can delete any node:</p>
        ${out("diagramDll")}
        ${py("dll")}` },
      { id: "links", title: "Insert and delete", html: `
        <p>Inserting changes four links: the new node's <code>prev</code> and <code>next</code> (set when it is made), then <code>predecessor.next</code> and <code>successor.prev</code>. Deleting changes two: the neighbours point past the node. The slides' program:</p>
        ${py("dllMain")}
        ${out("dllMainOut")}
        ${demo("dll", "Demo 9 · Rewiring a doubly linked list", "← → keys step", "<code>next</code> arrows run along the top of the nodes, <code>prev</code> arrows along the bottom. A raised node is not on the forward path from the header.")}
        ${callout("note", "NOTE", `<p>The slides call the classes <code>Node</code> and <code>DLList</code>, and print the elements one per line in a method <code>iterate</code>. Here the method returns a list and the caller prints it. The slides' <code>main</code> also calls <code>d.__len__()</code> on a line of its own, which computes the length and throws it away.</p>`)}
        ${predict("Which node does <code>d.header.next.next</code> refer to, and why does deleting it need no special case even though it is in the middle? How would you delete the <em>last</em> real node in a few steps?",
          `<p><code>d.header.next</code> is the node holding 10, and its <code>next</code> is the node holding 20. Every real node has a real or sentinel node on each side, so <code>delete_node</code> always has a <code>predecessor</code> and a <code>successor</code> to relink. The last real node is <code>d.trailer.prev</code>, so <code>d.delete_node(d.trailer.prev)</code> removes it without any hopping. That is what the second link buys.</p>${repl("dllRepl")}<p>(<code>_ = ...</code> throws away the node that <code>insert_between</code> returns, so the shell doesn't print it.)</p>`)}
        ${callout("pitfall", "PITFALL · FORGETTING ONE OF THE LINKS", `<p>A doubly linked list stores every connection twice, once in each direction, and an operation must keep both copies in agreement. Forget <code>successor.prev = newest</code> and the list looks right when you walk forwards but skips the new node when you walk backwards from the trailer. When you write or check such code, count the links: four for an insert, two for a delete.</p>`)}` },
      { id: "compare", title: "Which list for which job?", html: `
        <table><tr><th></th><th>array (Python list)</th><th>singly linked</th><th>doubly linked</th></tr>
        <tr><td>element at position k</td><td>one step</td><td>k hops</td><td>k hops</td></tr>
        <tr><td>add / remove at the front</td><td>moves every element</td><td>a few steps</td><td>a few steps</td></tr>
        <tr><td>add at the back</td><td>a few steps</td><td>a few steps (with <code>tail</code>)</td><td>a few steps</td></tr>
        <tr><td>remove at the back</td><td>a few steps</td><td>about n hops</td><td>a few steps</td></tr>
        <tr><td>memory per element</td><td>one reference</td><td>element + <code>next</code></td><td>element + <code>next</code> + <code>prev</code></td></tr></table>` },
    ],
    takeaways: ["Every node knows prev and next.", "Sentinels remove the special cases.", "Insert: four links. Delete: two."],
  },
  {
    slug: "7-bubble", nav: "Bubble sort", title: "Bubble Sort on a Linked List",
    subtitle: "Compare neighbours, swap, repeat",
    abstract: "Bubble sort only ever compares an element with the next one, so it runs on linked nodes as easily as on a list: hop instead of adding 1 to an index.",
    tags: ["bubble_sort", "linked_bubble_sort", "swap elements, not nodes"],
    hero: "bubbleMini", heroCaption: "linked_bubble_sort: node hops along, swapping elements.",
    sections: [
      { id: "video", title: "Watch: bubble sort and trees", html: `
        <p>The fourth video covers Chapters 7 and 8: bubble sort on a list and on linked nodes, the words for trees, the three traversals and evaluating an expression tree.</p>
        <div class="card video" data-video="${VIDEO_P4}"></div>` },
      { id: "bubble", title: "Bubble sort", html: `
        <p><b>Bubble sort</b> is a simple sorting algorithm:</p>
        <ol><li>Go through the list, compare every element with the next one, and swap them if the first is larger. After this pass the largest element has “bubbled up” to the end.</li>
        <li>Go through the list again, but stop one element earlier: the last element is already in place.</li>
        <li>Keep going, one element shorter each time, until only one element is left.</li></ol>
        ${py("bubbleSort")}
        ${repl("bubbleRepl")}
        ${callout("note", "NOTE", `<p>The slides swap through a helper variable (<code>buf = a[i]; a[i] = a[i+1]; a[i+1] = buf</code>); Python's <code>a, b = b, a</code> does the same in one line. The slides also loop <code>while listLength &gt; 0</code>, which makes one last pass over a single element that compares nothing; <code>while n &gt; 1</code> stops when there is one element left, as the algorithm says.</p>`)}
        ${predict("Write down the list after the first pass of <code>bubble_sort([5, 1, 4, 2])</code>. How many swaps did the pass make?",
          `<p><code>[1, 4, 2, 5]</code>, after three swaps: 5 and 1, then 5 and 4, then 5 and 2. The 5 bubbled all the way to the end. Step through it in Demo 10.</p>`)}
        ${demo("bubble", "Demo 10 · Bubble sort, list or nodes", "← → keys step", "Amber: the pair being compared. Green: just swapped, or already in its final place. Switch to “nodes” for the linked version.")}` },
      { id: "linked", title: "The same algorithm on linked nodes", html: `
        <p>Bubble sort only ever compares an element with the <em>next</em> one, so it works on a linked list just as well: instead of the index <code>i</code>, keep a reference <code>node</code> and hop to <code>node.next</code>. Instead of moving nodes, swap the elements stored in two neighbouring nodes:</p>
        ${py("linkedBubble")}
        ${py("linkedBubbleMain")}
        ${out("linkedBubbleOut")}
        ${callout("note", "NOTE", `<p>The slides sort a <code>LinkedQueue</code> and reach into its <code>q.head</code> and <code>q.size</code>. A queue's nodes belong to the queue, and code outside it should only enqueue and dequeue. These notes sort a <code>LinkedList</code>, whose <code>head</code> and <code>size</code> are meant to be used from outside.</p>`)}` },
    ],
    takeaways: ["Each pass bubbles the largest to the end.", "Only neighbours are compared.", "On nodes: hop, and swap the elements."],
  },
  {
    slug: "8-trees", nav: "Trees", title: "Trees",
    subtitle: "Hierarchies, and three ways to walk them",
    abstract: "A tree is a root together with smaller trees. That recursive definition makes the natural way to visit every node a recursive function — the multiple recursion of Lecture 6.",
    tags: ["root / parent / child / leaf", "expression trees", "preorder · inorder · postorder"],
    hero: "traversalMini", heroCaption: "Preorder: each node is visited before its subtrees.",
    sections: [
      { id: "what", title: "What a tree is", html: `
        <p>Lists, stacks and queues are <b>linear</b>: every element has at most one element before it and one after it. A <b>tree</b> stores elements <b>hierarchically</b>. Every element of a tree, except the top one, has one <b>parent</b> element and zero or more <b>children</b>. The top element is the <b>root</b>; it is drawn at the top.</p>
        <p>The structure of a company is a tree:</p>
        ${out("companyText")}
        <ul><li>Nodes with the same parent are <b>siblings</b>: R&amp;D, Sales, Purchasing and Manufacturing.</li>
        <li>A node with no children is a <b>leaf</b> (or external node); a node with children is an <b>internal node</b>.</li>
        <li>A node together with everything below it is a <b>subtree</b>. The subtree of Sales is itself a tree, with Sales as its root. <em>A tree is a root together with a number of smaller trees</em>: that is a recursive definition, as in Lecture 6.</li>
        <li>The <b>depth</b> of a node is the number of steps from the root down to it: Sales has depth 1, Canada has depth 3.</li></ul>
        <p>A tree is <b>ordered</b> if the children of each node have a meaningful order, drawn left to right: the parts of a book (preface, parts, chapters, sections) form an ordered tree, because Chapter 1 comes before Chapter 2. A <b>binary tree</b> is an ordered tree in which every node has at most two children, a <b>left child</b> and a <b>right child</b>.</p>` },
      { id: "python", title: "A tree in Python", html: `
        <p>A general tree node stores its element and a list of children. Printing a tree as an indented outline is the first tree algorithm: print the node, then print each child's subtree one level deeper.</p>
        ${py("tree")}
        ${py("companyOutline")}
        ${out("companyOutlineOut")}
        ${demo("outline", "Demo 11 · Printing the outline", "step or play", "The amber node is the running call, teal nodes are waiting on the call stack. The recursion tree of <code>outline</code> <em>is</em> the company tree.")}
        <p>The indentation is the depth, exactly as in <code>fact_traced</code> in ${L06("2-stack/watching", "Lecture 6")}. But <code>outline</code> is <b>multiple recursion</b>: one call for each child, like <code>draw_interval</code> in ${L06("6-tree", "Lecture 6, Chapter 6")}. Its recursion tree <em>is</em> the tree being printed.</p>
        ${callout("note", "NOTE", `<p><code>children=()</code> with <code>list(children)</code> gives every node its own new list. Writing <code>children=[]</code> would make all nodes that use the default share <em>one</em> list, because a default value is created once, when <code>def</code> runs (the same trap as in Lecture 6, Exercise 6).</p>`)}` },
      { id: "traversals", title: "Expression trees and the three traversals", html: `
        <p>An arithmetic expression can be stored as a binary tree: the leaves are numbers and the internal nodes are operators. Each operator applies to the values of its two subtrees. This is the slides' expression tree:</p>
        ${out("exprText")}
        ${py("binaryNode")}
        <p>(The slide draws multiplication as ×; the code uses Python's <code>*</code>.)</p>
        <p>A <b>traversal</b> visits every node of a tree once. For a binary tree there are three natural orders, and each is a three-line recursive function. They differ only in <em>when</em> the node itself is visited: before its subtrees, between them, or after them.</p>
        ${py("traversals")}
        <p>The base case is the empty tree, <code>None</code>, which has no elements. The leap of faith from ${L06("2-stack/faith", "Lecture 6")} does the rest: assume <code>preorder(node.left)</code> returns the left subtree's elements in preorder; then putting the node first, then the left subtree's list, then the right subtree's, is the preorder of the whole tree.</p>
        ${predict("Before you run them: what are the first four elements of each traversal of <code>expr</code>? Which traversal ends with the root <code>-</code>?",
          `${repl("traversalsRepl")}<p>(<code>print(*xs)</code> prints the elements of <code>xs</code> separated by spaces.) Preorder starts at the root; postorder ends with it. Inorder gives back the expression as we write it, but without brackets, so it no longer says which operation comes first.</p>`)}
        ${demo("traversal", "Demo 12 · Walking the expression tree", "pick a traversal, then step", "Calls on empty subtrees (<code>None</code>) return <code>[]</code> at once and are not drawn. Choose “evaluate” to see each subtree's value appear under it, in postorder.")}
        <p>Put a pair of brackets around each subtree and the expression is exact again:</p>
        ${py("toInfix")}
        ${repl("toInfixRepl")}
        <p><b>Evaluating</b> the expression is a postorder traversal: before an operator can be applied, both of its subtrees must have been evaluated.</p>
        ${py("evaluate")}
        ${repl("evaluateRepl")}
        <p>The left half is 12 / 6 = 2.0 and the right half is 9 + 6 = 15, so the whole is 2.0 − 15 = −13.0. It is a float because <code>/</code> always gives a float.</p>
        ${callout("pitfall", "PITFALL · FORGETTING THE EMPTY SUBTREE", `<p>A leaf's <code>left</code> and <code>right</code> are <code>None</code>. A traversal that does <code>node.left.element</code> without checking will crash at the first leaf:</p>${repl("leafPitfall")}<p>Write the base case first, as in Lecture 6: either <code>if node is None: return []</code> (the traversals) or <code>if is_leaf(node): ...</code> (<code>evaluate</code>, which only makes sense for nodes that have both children or neither).</p>`)}` },
      { id: "everywhere", title: "Trees everywhere", html: `
        <p>The slides end with two more trees. The paths through a <b>maze</b> form a tree: the start is the root, and each place where the path forks has one child per way forward; the leaves are dead ends and the exit. The positions of a <b>game</b> form a tree too: the current position is the root, and its children are the positions after each possible move. Finding a way out of the maze, or the best move, means searching the tree, which is a traversal that can stop early. You will meet these searches again in AI courses, where they are the starting point of game-playing programs.</p>` },
    ],
    takeaways: ["A tree is a root plus smaller trees.", "Pre-, in-, post-order: when the node is visited.", "Evaluating an expression tree is postorder."],
  },
  {
    slug: "9-summary", nav: "Summary", title: "Summary and Practice",
    subtitle: "Check yourself, then build some structures",
    abstract: "A one-page map of the lecture, five self-check questions, nine exercises with solutions, and a way to test any data structure an AI writes for you.",
    tags: ["knowledge map", "self-check", "exercises"],
    hero: "toc",
    sections: [
      { id: "map", title: "Knowledge map", html: `<div class="map">
        <div class="card"><h3>Stacks</h3><ul><li>Last in, first out</li><li><code>push</code>, <code>pop</code>, <code>top</code></li><li>Reverse, brackets, HTML tags</li><li>The call stack is one</li></ul></div>
        <div class="card"><h3>Queues</h3><ul><li>First in, first out</li><li><code>enqueue</code>, <code>dequeue</code>, <code>first</code></li><li>Circular list: wrap with <code>%</code></li><li><code>collections.deque</code> in practice</li></ul></div>
        <div class="card"><h3>Singly linked lists</h3><ul><li>Nodes: <code>element</code> + <code>next</code></li><li>Fast at the head, and at the tail for adding</li><li>Link first, then move <code>head</code></li><li>Always handle the empty list</li></ul></div>
        <div class="card"><h3>More linked lists</h3><ul><li>Linked stack and queue: no capacity</li><li>Circular: round-robin, head = <code>tail.next</code></li><li>Doubly linked + sentinels: no special cases</li></ul></div>
        <div class="card"><h3>Bubble sort</h3><ul><li>Compare neighbours, swap</li><li>Works on lists and on nodes</li><li>On nodes, swap the elements</li></ul></div>
        <div class="card"><h3>Trees</h3><ul><li>Root, parent, child, leaf, subtree, depth</li><li>Preorder, inorder, postorder</li><li>Evaluate = postorder</li></ul></div></div>` },
      { id: "check", title: "Check your understanding", html: `<div data-demo="quiz"><div class="demo-body"></div></div>` },
      { id: "exercises", title: "Exercises", html: `
        <p>★ trace or modify · ★★ write · ★★★ extend or combine. For every class you write, test the empty case first, then one element, then several.</p>
        <h3>Exercise 1 ★ (trace)</h3>
        <p>Start with an empty <code>ListQueue</code> and run: <code>enqueue(5)</code>, <code>enqueue(3)</code>, <code>dequeue()</code>, <code>enqueue(2)</code>, <code>enqueue(8)</code>, <code>dequeue()</code>, <code>dequeue()</code>, <code>enqueue(9)</code>, <code>enqueue(1)</code>, <code>dequeue()</code>, <code>enqueue(7)</code>, <code>enqueue(6)</code>. Which values do the dequeues return? Draw <code>_data</code> at the end, and give <code>_front</code> and <code>_end</code>.</p>
        <details class="reveal"><summary>Solution</summary><p>The dequeues return 5, 3, 2, 8. The eight enqueues use slots 0, 1, 2, 3, 4, then wrap around to 0, 1, 2: 5, 3, 2, 8, 9 fill slots 0–4, and 1, 7, 6 go into slots 0, 1, 2, which the four dequeues had emptied (they also set slot 3 back to <code>None</code>).</p>${repl("ex1Repl")}<p>The queue, front to back, is 9, 1, 7, 6: start at <code>_front = 4</code> and wrap around. (Pick “Exercise 1” in ${"Demo 3"} of Chapter 3 to watch it.)</p></details>
        <h3>Exercise 2 ★ (find the bug)</h3>
        <p>This <code>add_last</code> follows the slides' pseudocode exactly. What happens on an empty list? Fix it.</p>
        ${py("addLastBuggy")}
        <details class="reveal"><summary>Solution</summary><p>On an empty list <code>lst.tail</code> is <code>None</code>, so <code>lst.tail.next</code> fails:</p>${repl("addLastBuggyRepl")}<p>When the list is empty, the new node becomes the head as well as the tail; that is the <code>if self.head is None</code> branch in <code>LinkedList.add_last</code>.</p></details>
        <h3>Exercise 3 ★ (modify)</h3>
        <p>Add a method <code>count(self, target)</code> to <code>LinkedList</code> that returns how many elements are equal to <code>target</code>, by traversing the nodes.</p>
        <details class="reveal"><summary>Solution</summary><p>Write it as a function first, then put it in the class with <code>self</code> for <code>lst</code>:</p>${py("count")}${repl("countRepl")}</details>
        <h3>Exercise 4 ★★</h3>
        <p>A string is a palindrome if it reads the same backwards. Write <code>is_palindrome(s)</code> using a <code>ListStack</code>, with no slicing: push every character, then pop them and compare with <code>s</code> read forwards.</p>
        <details class="reveal"><summary>Solution</summary>${py("isPalindrome")}${repl("palindromeRepl")}</details>
        <h3>Exercise 5 ★★</h3>
        <p>Write a <em>recursive</em> function <code>length(node)</code> that returns the number of nodes in the linked list starting at <code>node</code> (<code>None</code> is the empty list). Which pattern from Lecture 6 is it?</p>
        <details class="reveal"><summary>Solution</summary><p>First and rest: the empty list has length 0; otherwise one node plus the length of the rest.</p>${py("length")}${repl("lengthRepl")}<p>It is linear recursion, so a list of a few thousand nodes would hit the recursion limit. The loop in <code>elements</code> has no such limit.</p></details>
        <h3>Exercise 6 ★★</h3>
        <p>Write <code>remove_last(lst)</code> for a <code>LinkedList</code>: remove the tail and return its element. Handle the empty list and the one-element list. How many hops does it take on a list of n nodes?</p>
        <details class="reveal"><summary>Solution</summary>${py("removeLast")}${repl("removeLastRepl")}<p>About n − 2 hops to find the node before the tail: the time grows with the length of the list, which is why a doubly linked list keeps <code>prev</code> links.</p></details>
        <h3>Exercise 7 ★★</h3>
        <p>The <b>height</b> of a tree is the largest depth of any of its nodes, so a single node has height 0. Write <code>height(node)</code> for a <code>BinaryNode</code> tree (use −1 for the empty tree). What is <code>height(expr)</code>?</p>
        <details class="reveal"><summary>Solution</summary>${py("height")}${repl("heightRepl")}<p><code>max</code> of the two subtrees' heights is the combine step; the leaves <code>3 1</code>, <code>9 5</code> and <code>7 4</code> are at depth 4.</p></details>
        <h3>Exercise 8 ★★★ (postfix)</h3>
        <p>The postorder of an expression tree is the expression in <b>postfix</b> notation: <code>3 1 + 3 *</code> means (3 + 1) · 3. Postfix needs no brackets, and a stack evaluates it: read the items left to right; push each number; for an operator, pop two numbers, apply it (the first popped is the <em>right</em> operand), and push the result. Write <code>evaluate_postfix(items)</code> and check that it agrees with <code>evaluate(expr)</code> on <code>postorder(expr)</code>.</p>
        <details class="reveal"><summary>Solution</summary>${py("evaluatePostfix")}${repl("postfixRepl")}<p>The stack does by hand what the call stack does in <code>evaluate</code>: the values of finished subtrees wait on it until their operator arrives.</p></details>
        <h3>Exercise 9 ★★★ (two stacks make a queue)</h3>
        <p>Implement a queue class <code>StackQueue</code> with <code>enqueue</code>, <code>dequeue</code> and <code>__len__</code> using two <code>ListStack</code>s and nothing else. Hint: enqueue onto one stack; to dequeue, if the other stack is empty, pour everything from the first stack into it, which reverses the order.</p>
        <details class="reveal"><summary>Solution</summary>${py("stackQueue")}${repl("stackQueueRepl")}<p>Each element is pushed and popped at most twice in all, so on average every operation takes a few steps, even though one <code>dequeue</code> may pour many elements.</p></details>` },
      { id: "ai", title: "Working with AI", html: `
        <p>Ask an AI assistant for “a linked list class in Python” and you will get one in seconds. It will usually work on the example it shows you. Linked-list bugs hide in the cases the example skips, so check it with this lecture's tools:</p>
        <ol><li><b>Draw it.</b> Pick one method, draw the boxes and arrows before and after, and check that the code changes the arrows in a safe order (Chapter 4).</li>
        <li><b>Ask about the edges.</b> <em>“What happens when the list is empty? When it has one node? Does <code>tail</code> stay right after removing the last node?”</em></li>
        <li><b>Count the links</b> in a doubly linked list: four changes for an insert, two for a delete.</li>
        <li><b>Test against something you trust.</b> Run a long random sequence of operations on the AI's class and on a plain Python list side by side, and check that they always agree. This is called <b>differential testing</b>:</li></ol>
        ${py("testQueue")}
        ${repl("testQueueRepl")}
        <p>Try it: ask an assistant for a queue built on a circularly linked list, pass its class to <code>test_queue</code>, and see whether it survives. If it doesn't, the failing <code>assert</code> tells you which operation went wrong; ask the assistant to fix that case, and test again.</p>` },
      { id: "terms", title: "Key terms and further reading", html: `
        <p class="tags">${["data structure", "algorithm", "abstract data type (ADT)", "stack", "LIFO", "push", "pop", "top", "queue", "FIFO", "enqueue", "dequeue", "circular array", "compact array", "node", "singly linked list", "head", "tail", "traversal (link hopping)", "circularly linked list", "round-robin", "doubly linked list", "sentinel (header, trailer)", "bubble sort", "tree", "root", "parent", "child", "sibling", "leaf", "internal node", "subtree", "depth", "height", "ordered tree", "binary tree", "expression tree", "preorder", "inorder", "postorder", "postfix", "differential testing"].map((t) => `<span class="tag">${t}</span>`).join("")}</p>
        <ul><li>M. T. Goodrich, R. Tamassia, M. H. Goldwasser, <em>Data Structures and Algorithms in Python</em>, Wiley 2013: Chapter 6 (Stacks, Queues, and Deques: the bracket and HTML matchers and the circular-array queue), Chapter 7 (Linked Lists: the linked stack and queue, <code>CircularQueue</code>, the doubly linked list with sentinels), Chapter 8 (Trees: §8.4 traversals, §8.5 expression trees).</li>
        <li>J. DeNero, <em>Composing Programs</em>, §2.9 Recursive Objects (linked lists and trees as classes, with recursive methods). <a href="https://www.composingprograms.com/pages/29-recursive-objects.html" target="_blank" rel="noopener">composingprograms.com</a></li>
        <li>Python documentation, <code>collections.deque</code>: <a href="https://docs.python.org/3/library/collections.html#collections.deque" target="_blank" rel="noopener">docs.python.org</a></li>
        <li>Python Tutor, to see nodes and links drawn as boxes and arrows: <a href="https://pythontutor.com" target="_blank" rel="noopener">pythontutor.com</a></li></ul>` },
    ],
    takeaways: ["Stack LIFO, queue FIFO.", "Linked lists: link first, mind the empty case.", "Trees: three recursive traversals."],
  },
];

const QUIZ = [
  { q: "A browser's Back button uses a stack. Which data structure would you use for the documents waiting for a printer?",
    opts: ["A stack, so the newest document prints first", "A queue: documents print in the order they were sent, first in, first out", "A doubly linked list, because it has sentinels", "A tree, because documents have pages"],
    a: 1, why: "A queue: documents should be printed in the order they were sent, first in, first out. A stack would print the newest document first." },
  { q: "What do <code>is_matched(\"{[()]}\")</code> and <code>is_matched(\"{[(])}\")</code> return?",
    opts: ["<code>True</code>, <code>True</code>", "<code>True</code>, <code>False</code>", "<code>False</code>, <code>True</code>", "<code>False</code>, <code>False</code>"],
    a: 1, why: "<code>True</code>, then <code>False</code>. In <code>\"{[(])}\"</code> the <code>]</code> pops a <code>(</code>, which is the wrong kind." },
  { q: "In <code>ListQueue</code>, why is <code>_end</code> computed as <code>(self._end + 1) % ListQueue.CAPACITY</code> instead of <code>self._end + 1</code>?",
    opts: ["To make the queue faster", "So that after the last slot (index 4) it wraps around to slot 0, which a dequeue may have freed", "To keep the elements sorted", "Because <code>_end</code> must always be smaller than <code>_front</code>"],
    a: 1, why: "So that after the last slot (index 4) it wraps around to slot 0, which a dequeue may have freed. Without <code>%</code> it would run off the end of the list." },
  { q: "Why can a singly linked list remove its first node in a few steps but not its last?",
    opts: ["The last node is bigger", "Python stores the tail in a slow part of memory", "Removing the first only moves <code>head</code>; removing the last needs the node before it, and only hopping from the head finds it", "It can: just set <code>tail = None</code>"],
    a: 2, why: "Removing the first node only moves <code>head</code> to <code>head.next</code>. Removing the last node means making the node <em>before</em> it the new tail, and the only way to find that node is to hop from the head; no node knows its predecessor." },
  { q: "For the tree <code>BinaryNode(\"*\", BinaryNode(2), BinaryNode(\"+\", BinaryNode(3), BinaryNode(4)))</code>, what is the postorder, and what does <code>evaluate</code> return?",
    opts: ["<code>* 2 + 3 4</code>, 14", "<code>2 3 4 + *</code>, 14", "<code>2 * 3 + 4</code>, 10", "<code>2 3 4 + *</code>, 10"],
    a: 1, why: "Preorder <code>* 2 + 3 4</code>, postorder <code>2 3 4 + *</code>, value 2 · (3 + 4) = 14." },
];
