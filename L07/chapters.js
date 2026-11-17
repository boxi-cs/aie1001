// Chapter content, adapted from notes/L07-objects-classes.md. Code panels come from CODE
// (demos.js), which holds the note's code blocks verbatim.

const demo = (name, title, instr, hint = "") =>
  `<div class="card demo" data-demo="${name}"><div class="head"><span class="title">${title}</span><span>${instr}</span></div>
   <div class="demo-body"></div>${hint ? `<p class="hint">${hint}</p>` : ""}</div>`;

const callout = (kind, label, body) => `<div class="callout ${kind}"><b>${label}</b>${body}</div>`;
const predict = (q, a) => callout("predict", "PREDICT", `<p>${q}</p><details class="reveal"><summary>Show the answer</summary>${a}</details>`);
const py = (k) => codeBlock(CODE[k]);
const repl = (k) => codeBlock(CODE[k], "repl");
const out = (k) => codeBlock(CODE[k], "out");

const VIDEO_P1 = "media/L07-1.mp4";
const VIDEO_P2 = "media/L07-2.mp4";
const VIDEO_P3 = "media/L07-3.mp4";
const VIDEO_P4 = "media/L07-4.mp4";

const LECTURE = {
  number: 7,
  title: "Objects and Classes",
  tagline: "Object-oriented programming, part 1",
  lead: "From a blueprint for circles to classes, <code>__init__</code>, <code>self</code>, private fields and encapsulation — interactive notes where every object, name and frame can be stepped through.",
  heroDemo: "constructMini",
  heroLabel: "A live constructor · c = Circle(5)",
  heroCaption: "An empty object, then <code>__init__</code> with <code>self</code> pointing at it. The frame goes; the object stays.",
  whyTitle: "Why classes are worth learning",
  whySub: "Three ideas you will use in every program you write from now on",
  why: [
    ["Data with its behaviour", "A class puts the data and the code that works on it together: a TV knows its channel <b>and</b> how to change it."],
    ["A picture of the machine", "Names are <b>arrows</b> to objects, and <code>self</code> is the object a method works on. Draw it and the bugs explain themselves."],
    ["Code others can use", "With <b>encapsulation</b>, users of a class need its contract, not its code — the way you already use <code>str</code> and <code>list</code>."],
  ],
  ctaTitle: "Ready to build your first class?",
  minutes: "About 75–90 minutes",
  videos: {
    [VIDEO_P1]: "Lecture 7 · Part 1 — Objects, references and classes (7.3 min)",
    [VIDEO_P2]: "Lecture 7 · Part 2 — __init__ and self in memory (8.8 min)",
    [VIDEO_P3]: "Lecture 7 · Part 3 — The TV class and objects as arguments (8.2 min)",
    [VIDEO_P4]: "Lecture 7 · Part 4 — Data hiding and encapsulation (9 min)",
  },
};

const CHAPTERS = [
  {
    slug: "1-objects", nav: "Objects", title: "Objects and References",
    subtitle: "Identity, state and behaviour — and names that point at them",
    abstract: "Every number, string and list in Python is an object. A variable does not contain an object; it refers to one.",
    tags: ["identity · state · behaviour", "id and type", "is vs =="],
    hero: "refsMini", heroCaption: "b = a copies the arrow, not the list.",
    sections: [
      { id: "video", title: "Watch: objects, references and classes", html: `
        <p>The first video of this lecture covers Chapters 1 and 2: two circles and a blueprint, identity, state and behaviour, names as arrows to objects (<code>is</code> vs <code>==</code>), methods, and classes with their instances.</p>
        <div class="card video" data-video="${VIDEO_P1}"></div>` },
      { id: "blueprint", title: "A blueprint for circles", html: `
        <p>Suppose a drawing program shows many circles. Each circle has a radius and a fill colour, and each one can tell you its area. Circle 1 has radius 3 and is blue; circle 2 has radius 5 and is orange.</p>
        <p>Both circles have the <em>same kind</em> of data (a radius, a colour) and can do the <em>same things</em> (compute an area). Only the values differ. So we write down the common part once, as a <b>blueprint</b>: “a circle has a <code>radius</code> and a <code>fill_color</code>, and can compute <code>get_area()</code>”. Then we make as many circles from it as we like, each with its own values.</p>
        <p>In Python the blueprint is a <b>class</b> and each circle made from it is an <b>object</b>. The values each circle stores (<code>radius = 3</code>, <code>fill_color = "blue"</code>) are its <b>data fields</b>; the things it can do (<code>get_area()</code>) are its <b>methods</b>. This style of programming is called <b>object-oriented programming</b> (OOP).</p>` },
      { id: "identity", title: "Identity, state and behaviour", html: `
        <p>An <b>object</b> represents an entity in the real world that can be distinctly identified: a student, a desk, a circle, a button, even a loan. Every object has three things:</p>
        <ul><li>an <b>identity</b>, which tells it apart from every other object, like a person's ID number;</li>
        <li>a <b>state</b>: the current values of its data fields (also called its <b>properties</b> or <b>attributes</b>), such as a circle's radius;</li>
        <li><b>behaviour</b>: the actions it can perform, defined by its methods, such as computing the area.</li></ul>
        <p>You have used objects since Lecture 2: every number, string and list in Python is an object. <code>type</code> tells you an object's type, and <code>id</code> gives its identity, an integer that does not change while the program runs.</p>
        ${repl("typeRepl")}
        <p>The value of <code>id(s)</code> itself is different every time you run the program, which is why these notes don't print it. What matters is that two different objects alive at the same time never have the same <code>id</code>.</p>` },
      { id: "references", title: "A variable is a reference", html: `
        <p>A variable does not <em>contain</em> an object. It <b>refers</b> to one: the name is an arrow to an object somewhere in memory. Assignment <code>b = a</code> copies the arrow, not the object. The operator <code>is</code> asks whether two names refer to the <em>same</em> object (same <code>id</code>); <code>==</code> asks whether two objects have equal values.</p>
        ${repl("refsRepl")}
        ${demo("refs", "Demo 1 · Names and objects", "← → keys step", "Names live in a <b>frame</b> (left); objects live in memory (right). An arrow is a reference. This is how Python Tutor draws it, and how every demo in this lecture draws it.")}
        ${predict("Continue the session above with <code>b.append(3)</code>. What are <code>a</code> and <code>c</code> now?",
          `<p><code>a</code> is <code>[1, 2, 3]</code>: <code>a</code> and <code>b</code> are two arrows to one list, so a change made through <code>b</code> is seen through <code>a</code>. <code>c</code> is still <code>[1, 2]</code>; it is a different list that only happened to have equal values.</p>${repl("refsAppend")}`)}` },
      { id: "methods", title: "Methods", html: `
        <p>The operations you perform on an object are <b>methods</b>: functions that belong to the object's type. You call a method <em>on</em> an object with a dot:</p>
        ${repl("strMethods")}
        <p><code>s.lower()</code> runs the <code>lower</code> method of the <code>str</code> type with <code>s</code> as the string to work on. A method is always called on a particular object; that is the difference from a plain function like <code>len</code>.</p>` },
    ],
    takeaways: ["Identity, state, behaviour.", "A name is an arrow to an object.", "<code>is</code>: same object · <code>==</code>: equal values."],
  },
  {
    slug: "2-classes", nav: "Classes", title: "Classes and Instances",
    subtitle: "One blueprint, many objects",
    abstract: "A class says which data fields and methods its objects have. Each object made from it has its own values; the methods are written once.",
    tags: ["class", "instance", "why OOP"],
    hero: "blueprintMini", heroCaption: "One class object, three instances, each with its own radius.",
    sections: [
      { id: "instances", title: "The blueprint and its instances", html: `
        <p>Objects of the same kind are defined by a common <b>class</b>. The relationship between a class and its objects is like the one between an apple-pie recipe and apple pies: one recipe, many pies, each pie with its own filling. A class is also called a <b>template</b>, a <b>blueprint</b> or a <b>contract</b>.</p>
        <p>An object is an <b>instance</b> of a class, and you can create as many instances as you need. Creating an instance is called <b>instantiation</b>. The words <em>object</em> and <em>instance</em> are used interchangeably.</p>
        <table><tr><th></th><th>data fields</th><th>methods</th></tr>
        <tr><td>class <code>Circle</code></td><td><code>radius</code> is ___</td><td><code>get_area</code>, <code>get_perimeter</code>, <code>set_radius</code></td></tr>
        <tr><td>circle object 1</td><td><code>radius</code> is 1</td><td>(shared)</td></tr>
        <tr><td>circle object 2</td><td><code>radius</code> is 25</td><td>(shared)</td></tr>
        <tr><td>circle object 3</td><td><code>radius</code> is 125</td><td>(shared)</td></tr></table>
        <p>Each object has its own values for the data fields. The methods are written once, in the class, and every object uses them.</p>
        ${demo("blueprint", "Demo 2 · Make instances of Circle", "make a few, then call methods", "The class itself is an object too (top right): it holds the methods. Each instance holds only its own data.")}` },
      { id: "example", title: "Another example", html: `
        <p>A class for people might have the data fields height, weight, IQ and education level, and the methods <code>eat()</code>, <code>sleep()</code> and <code>work()</code>. You and your friend are two instances of it: the same fields, different values.</p>` },
      { id: "why", title: "Why object-oriented programming?", html: `
        <p>Writing real software is complicated. The field of <b>software engineering</b> studies how to build large programs, and programmers keep inventing new ways to organise code: structured programming, object-oriented programming, service-oriented architecture, and others. Object-oriented programming lets you write programs that match the problem you are solving: a game has players and monsters, a bank has accounts and loans, and each becomes a class. The data and the code that works on it live together, so you can understand, test and change one class at a time.</p>` },
    ],
    takeaways: ["A class is the blueprint.", "An instance is one object made from it.", "Fields per object; methods per class."],
  },
  {
    slug: "3-define", nav: "Defining", title: "Defining a Class",
    subtitle: "<code>class</code>, <code>__init__</code> and <code>self</code>",
    abstract: "Calling a class creates an empty object and runs __init__ on it. Inside every method, self is the object being worked on.",
    tags: ["__init__", "constructor", "self"],
    hero: "constructMini", heroCaption: "c = Circle(5), one step at a time.",
    sections: [
      { id: "video", title: "Watch: __init__ and self in memory", html: `
        <p>The second video covers Chapters 3 and 4: the <code>Circle</code> class, what <code>c = Circle(5)</code> does in memory step by step, what <code>self</code> refers to, instance and local variables, and three broken programs.</p>
        <div class="card video" data-video="${VIDEO_P2}"></div>` },
      { id: "syntax", title: "The syntax", html: `
        <p>A class definition starts with the keyword <code>class</code> and the class name, followed by an indented block with the initializer and the methods:</p>
        ${py("classSyntax")}
        <p>Class names are written in <code>CapitalizedWords</code> (<code>Circle</code>, <code>BankAccount</code>), unlike function and variable names. The <b>initializer</b> is a special method named <code>__init__</code> (two underscores before and after). Python calls it automatically to set up the state of every new object.</p>
        ${callout("note", "NOTE", `<p>The slides use names like <code>getArea</code> and <code>setRadius</code>. These notes use Python's standard naming style (PEP 8): methods and variables are lower-case words joined by underscores (<code>get_area</code>, <code>set_radius</code>); only class names are capitalized.</p>`)}` },
      { id: "circle", title: "The Circle class", html: `
        ${py("circle")}
        <p>Every method, including <code>__init__</code>, has a first parameter called <code>self</code>. The class has one data field, <code>radius</code>, which <code>__init__</code> creates with <code>self.radius = radius</code>.</p>` },
      { id: "construct", title: "Constructing an object", html: `
        <p>You create objects by calling the class like a function. This call is the <b>constructor</b>. It does two things:</p>
        <ol><li>It creates a new, empty object of the class in memory.</li>
        <li>It calls the class's <code>__init__</code> method to initialize the new object. The new object is passed as <code>self</code>, and the constructor's arguments go to the other parameters.</li></ol>
        <p>The arguments of the constructor match the parameters of <code>__init__</code> <em>without</em> <code>self</code>. <code>Circle</code>'s <code>__init__</code> has a default value for <code>radius</code>, so <code>Circle()</code> with no argument makes a circle of radius 1.</p>
        ${repl("circleRepl")}
        ${demo("construct", "Demo 3 · What c = Circle(5) does in memory", "← → keys step", "Watch the two names called <code>radius</code>: the <b>parameter</b> lives in the <code>__init__</code> frame and disappears; the <b>data field</b> lives in the object and stays.")}` },
      { id: "self", title: "What self is", html: `
        <p>So <b><code>self</code> is the object being worked on</b>. In <code>__init__</code> it is the object that was just created. In any other method it is the object the method was called on. When you write</p>
        ${repl("getArea")}
        <p>Python looks up <code>get_area</code> in the class of <code>c</code> and calls it with <code>c</code> as the first argument. <code>c.get_area()</code> is short for:</p>
        ${repl("unbound")}
        <p>That is why every method needs <code>self</code> as its first parameter, and why you never pass it yourself. You can check that <code>self</code> really is the object the method was called on:</p>
        ${py("probe")}${repl("probeRepl")}
        <p><code>self</code> is not a keyword; it is only the name every Python programmer uses for the first parameter. Use it.</p>
        ${demo("method", "Demo 4 · self in a method call", "pick a call, then step", "The method's frame has its own <code>self</code>, pointing at the object before the dot.")}
        ${predict("After <code>c1 = Circle(3)</code> and <code>c2 = Circle(4)</code>, the call <code>c2.set_radius(10)</code> runs <code>self.radius = radius</code>. Which object does <code>self</code> refer to? What are <code>c1.radius</code> and <code>c2.radius</code> afterwards?",
          `<p><code>self</code> refers to the object <code>c2</code> refers to, so only that object changes:</p>${repl("setRadiusRepl")}`)}
        ${callout("pitfall", "PITFALL · FORGETTING self. IN __init__", `<p><code>radius = radius</code> (without <code>self.</code>) assigns the parameter to itself. It creates nothing in the object, and the value is lost when <code>__init__</code> returns. Data fields are always created and read through <code>self.</code>.</p>`)}` },
    ],
    takeaways: ["<code>ClassName(args)</code>: empty object, then <code>__init__</code>.", "<code>self</code> is the object being worked on.", "<code>c.m()</code> means <code>Circle.m(c)</code>."],
  },
  {
    slug: "4-using", nav: "Using", title: "Using Objects",
    subtitle: "The dot operator, instance variables and local variables",
    abstract: "Data fields live in the object and every method can reach them through self. Plain variables in a method vanish when it returns.",
    tags: ["dot operator", "instance vs local", "what is wrong?"],
    hero: "scopeMini", heroCaption: "Fields stay in the object; locals go with their frame.",
    sections: [
      { id: "dot", title: "The dot operator", html: `
        <p>A data field is also called an <b>instance variable</b>, because every instance has its own value for it. A method is also called an <b>instance method</b>, because it works on the data fields of the instance it was called on. You reach both with the <b>dot operator</b> (<code>.</code>): <code>object.data_field</code> and <code>object.method(arguments)</code>.</p>
        ${repl("dotRepl")}` },
      { id: "scope", title: "Instance variables and local variables", html: `
        <p>An instance variable belongs to the object, so once it is created every method of the class can use it through <code>self</code>. A plain variable assigned inside a method is a <b>local variable</b> of that method: it lives in the method's frame and is gone when the method returns.</p>
        ${py("scope")}${repl("scopeRepl")}
        <p><code>m2</code> calls <code>m1</code> with <code>self.m1()</code>: inside a class, a method calls another method of the same object through <code>self</code> too.</p>
        ${demo("scope", "Demo 5 · Where do x, y, z and u live?", "← → keys step", "Two frames can each have a <code>self</code>, both pointing at the same object.")}` },
      { id: "three", title: "Three circles", html: `
        ${py("threeCircles")}${out("threeCirclesOut")}
        ${callout("note", "NOTE", `<p>The slide shows the radii as <code>1.0</code>, <code>25.0</code>, <code>125.0</code> and <code>100.0</code>. They are integers here (<code>Circle(25)</code> stores the int 25), so Python prints <code>1</code>, <code>25</code>, <code>125</code> and <code>100</code>.</p>`)}
        ${predict("Why does changing <code>circle2.radius</code> not change the areas of <code>circle1</code> and <code>circle3</code>?",
          `<p>Each object has its own <code>radius</code>. <code>get_area</code> reads <code>self.radius</code>, and <code>self</code> is whichever object the method was called on.</p>`)}` },
      { id: "wrong", title: "What is wrong with these programs?", html: `
        <h3>Program 1</h3>${py("wrong1")}${repl("wrong1Repl")}
        <p>The constructor's arguments must match the parameters of <code>__init__</code> after <code>self</code>. Either call <code>A(5)</code> or give <code>i</code> a default value: <code>def __init__(self, i=0)</code>.</p>
        <h3>Program 2</h3>${py("wrong2")}${repl("wrong2Repl")}
        <p>Two mistakes. A method named after the class is <em>not</em> an initializer in Python (it is in Java and C++); only <code>__init__</code> is. And <code>radius = 3</code> makes a local variable, not a data field; it should be <code>self.radius = 3</code>.</p>
        <h3>Program 3</h3>${py("wrong3")}${repl("wrong3Repl")}
        <p><code>__init__</code> again makes only a local variable. And <code>set_radius</code> has no <code>self</code> parameter: <code>a.set_radius(5)</code> passes <em>two</em> arguments (<code>a</code> and <code>5</code>), but the method takes one. Every method needs <code>self</code> first: <code>def set_radius(self, radius):</code>.</p>` },
    ],
    takeaways: ["<code>obj.field</code>, <code>obj.method()</code>.", "<code>self.x</code> lives in the object.", "Locals vanish when the method returns."],
  },
  {
    slug: "5-tv", nav: "TV class", title: "Example: a TV Class",
    subtitle: "A contract in UML, the class, and two objects",
    abstract: "Two TVs made from one class. Pressing a button on one never changes the other, and a TV that is off ignores its buttons.",
    tags: ["UML class diagram", "setters", "two objects"],
    hero: "code:tvMain", heroCaption: "Two TV objects, one class",
    sections: [
      { id: "video", title: "Watch: the TV class and objects as arguments", html: `
        <p>The third video covers Chapters 5 and 6: the TV class and its UML contract, two TV objects in memory, the slide's <code>set_channel</code> bug, and what happens when you pass an object to a function (the <code>Count</code> practice).</p>
        <div class="card video" data-video="${VIDEO_P3}"></div>` },
      { id: "uml", title: "The contract: a UML class diagram", html: `
        <p>Before writing a class, designers often draw it as a <b>UML class diagram</b>: a box with the class name, then its data fields with their types, then its methods with their parameter and return types.</p>
        ${out("tvUml")}` },
      { id: "class", title: "The class", html: `
        ${py("tv")}
        <p>Every method that changes the TV first checks <code>self.on</code>: a TV that is off ignores the buttons, as a real one does.</p>` },
      { id: "use", title: "Using it", html: `
        ${py("tvMain")}${out("tvOut")}
        ${callout("note", "NOTE", `<p>On the slides the class lives in a file <code>TV.py</code> and the program starts with <code>from TV import TV</code>. These notes keep everything in one file, so no import is needed.</p>`)}
        <p><code>tv1</code> and <code>tv2</code> are two objects of one class. Each has its own <code>channel</code>, <code>volume_level</code> and <code>on</code>; pressing a button on one never changes the other.</p>
        ${demo("tv", "Demo 6 · Two TVs, one class", "press the buttons", "Each button is one method call with <code>self</code> → the TV you picked. “run main()” replays the program above.")}
        ${predict(`What does this print?${py("tv3")}`,
          `<p><code>1</code>. <code>set_channel(50)</code> is ignored because the TV is still off. After <code>turn_on</code>, the channel is 1, and <code>channel_down</code> does nothing at 1.</p>${repl("tv3Repl")}`)}
        ${callout("pitfall", "PITFALL · CHECKING THE OLD VALUE INSTEAD OF THE NEW ONE", `<p>On the slide, <code>setChannel</code> tests <code>1 &lt;= self.channel &lt;= 120</code>: the channel the TV is <em>already</em> on, which is always valid. So any channel gets through:</p>
          ${py("slideTv")}${repl("slideTvRepl")}
          <p>A setter must check its <em>argument</em>: <code>1 &lt;= channel &lt;= 120</code>. The same fix applies to <code>setVolume</code>. Tick “slide's set_channel” in Demo 6 and try 500.</p>`)}` },
    ],
    takeaways: ["UML: name, fields, methods.", "Each object has its own state.", "A setter checks its argument."],
  },
  {
    slug: "6-arguments", nav: "Arguments", title: "Objects as Arguments",
    subtitle: "Change the object, or rebind the name?",
    abstract: "A function that receives an object can change it, and the caller sees the change. Assigning a new value to the parameter changes nothing for the caller.",
    tags: ["print_areas", "Count practice", "mutation vs rebinding"],
    hero: "countMini", heroCaption: "m(c, n): only m's own arrows move.",
    sections: [
      { id: "passing", title: "Passing an object to a function", html: `
        <p>Passing an argument to a function binds the parameter to the same object the argument refers to. For an object of your own class, that means the function can change the caller's object through the parameter.</p>
        ${py("printAreas")}
        ${predict("<code>print_areas</code> adds 1 to <code>c.radius</code> five times and subtracts 1 from <code>times</code> five times. What do the last two lines print?",
          `${out("printAreasOut")}<p><code>c</code> and <code>my_circle</code> refer to the same <code>Circle</code> object, so the object's radius really is 6 afterwards. <code>times</code> is a different story: <code>times = times - 1</code> makes the local name <code>times</code> refer to a new integer; the caller's <code>n</code> still refers to 5.</p>`)}
        ${callout("note", "NOTE", `<p>The slide prints the table with tabs (<code>"\\t\\t"</code>). These notes leave them out so the output is easy to compare. The slide also prints a blank line before <code>Radius is 6</code>, and its table shows 29.27… for radius 3; the area is 9π ≈ 28.27.</p>`)}` },
      { id: "count", title: "Changing the object, or rebinding the name?", html: `
        <p>This is the practice question from the slides. Draw the names and objects before you read on.</p>
        ${py("count")}
        ${predict("What does it print? Many people say <code>count is 5</code>.",
          `${out("countOut")}<p>When <code>m</code> starts, its parameters <code>c</code> and <code>n</code> refer to the same objects as <code>main</code>'s <code>c</code> and <code>n</code>. Then <code>c = Count(5)</code> makes a <em>new</em> <code>Count</code> object and moves <code>m</code>'s arrow <code>c</code> to it, and <code>n = 3</code> moves <code>m</code>'s arrow <code>n</code> to 3. <code>main</code>'s arrows never move. When <code>m</code> returns, its frame is thrown away, and the new <code>Count(5)</code> with it.</p>`)}
        <p>If the function changes the object <em>through</em> the parameter instead, the caller sees it:</p>
        ${py("m2")}${repl("m2Repl")}
        ${demo("count", "Demo 7 · m versus m2", "pick one, then step", "Amber marks what the current line changes. In <code>m</code> an arrow moves; in <code>m2</code> a field inside the object changes.")}
        ${callout("pattern", "PATTERN · CHANGE THE OBJECT, OR REBIND THE NAME", `<p>Inside a function, <code>param.field = value</code> (or <code>param.method(...)</code>) changes the object the caller passed in, and the caller sees it. <code>param = something</code> only moves the function's own name; the caller sees nothing. Integers, floats and strings cannot be changed at all, so a function can never change the caller's number.</p>`)}` },
      { id: "setter", title: "set_radius or radius =?", html: `
        <p>For our <code>Circle</code>, these two lines do the same thing:</p>
        ${repl("setVsAssign")}
        <p>So why have <code>set_radius</code> at all? Because anyone can write <code>circle1.radius = -5</code>, and the class cannot stop it. The next chapter shows how a class protects its data.</p>` },
    ],
    takeaways: ["A parameter refers to the caller's object.", "<code>p.field = v</code>: the caller sees it.", "<code>p = v</code>: the caller sees nothing."],
  },
  {
    slug: "7-hiding", nav: "Data hiding", title: "Data Hiding",
    subtitle: "Private fields, get and set methods, and name mangling",
    abstract: "Fields named with two leading underscores are private: use them only inside the class. Python enforces this by renaming them, which is a convention, not a lock.",
    tags: ["__radius", "accessor / mutator", "_Circle__radius"],
    hero: "code:privCircle", heroCaption: "A circle whose radius only changes through set_radius",
    sections: [
      { id: "video", title: "Watch: data hiding and encapsulation", html: `
        <p>The fourth video covers Chapters 7 and 8: private fields with get and set methods, name mangling, three practice questions, abstraction and encapsulation, and the BMI and Loan classes.</p>
        <div class="card video" data-video="${VIDEO_P4}"></div>` },
      { id: "why", title: "Why hide data fields?", html: `
        <p>Letting code outside a class change its data fields directly is a bad idea, for two reasons. First, the data can be <b>tampered with</b>: a circle can get a negative radius, a TV can be set to channel 500. Second, the class becomes hard to <b>maintain</b>: if the class later stores its data differently, every piece of code that touched the fields directly breaks.</p>
        <p>Preventing direct access to the data fields is called <b>data hiding</b>. Other code works with the object only through its methods.</p>` },
      { id: "private", title: "Private data fields", html: `
        <p>In Python, a data field whose name starts with two underscores, like <code>__radius</code>, is <b>private</b>: it is meant to be used only inside the class. A method can be private in the same way. To let other code read or change a private field, the class provides a <b>get method</b> (an <b>accessor</b>) and a <b>set method</b> (a <b>mutator</b>), and the set method can check the new value.</p>
        ${py("privCircle")}
        <p>(The slide version has no <code>set_radius</code>. This one adds it, with a check.)</p>
        ${repl("privRepl")}` },
      { id: "mangling", title: "What Python really does: name mangling", html: `
        <p>The slides say private fields “cannot be accessed outside the class”. That is not quite true. Inside a class, Python quietly renames every name that starts with two underscores (and does not end with two): <code>__radius</code> in class <code>Circle</code> becomes <code>_Circle__radius</code>. This is called <b>name mangling</b>. Outside the class, nothing is renamed, so <code>c.__radius</code> looks for a field that does not exist. The field is still there under its real name:</p>
        ${repl("mangleRepl")}
        <p>(<code>vars(obj)</code> shows an object's data fields as a dictionary.) So a private name is a <b>convention</b> and a warning — “this is internal, don't touch it” — not a lock. Many Python programmers use a single underscore (<code>_radius</code>) for the same message; Python does not rename those at all. Name mangling exists mainly so that a class's internal names do not clash with names in classes built on top of it (Lecture 8).</p>
        ${demo("mangle", "Demo 8 · Poke at a private field", "press the buttons in any order", "The object shows each field under the name Python really stores.")}
        ${callout("pitfall", "PITFALL · ASSIGNING TO A PRIVATE FIELD FROM OUTSIDE CREATES A NEW FIELD", `${repl("mangleTrap")}<p>No error, and the circle's radius is unchanged: outside the class, <code>c.__radius = 10</code> just adds a new field that happens to be called <code>__radius</code>. Use <code>c.set_radius(10)</code>.</p>`)}` },
      { id: "practice", title: "Practice", html: `
        <h3>Practice 1 · What is the problem with this program?</h3>${py("p1")}
        ${predict("What happens on <code>print(a.__i)</code>?", `${repl("p1Repl")}<p><code>__i</code> is private; outside the class it is not found under that name. Add a method <code>get_i(self)</code> that returns <code>self.__i</code>, and call <code>a.get_i()</code>.</p>`)}
        <h3>Practice 2 · Is this code correct? If yes, what does it print?</h3>${py("p2")}
        ${predict("Correct or not? What is printed?", `${out("p2Out")}<p>It is correct. Inside the class, <code>self.__s</code> is the private field, which is allowed. And a method named <code>print</code> does not hide the built-in <code>print</code>: inside the method, the plain name <code>print</code> still means the built-in function; the method is reached only as <code>a.print</code> or <code>self.print</code>. (Still, choose a clearer name such as <code>show</code>.)</p>`)}
        <h3>Practice 3 · Is this code correct? If not, how do we fix it?</h3>${py("p3")}
        ${predict("What happens on <code>print(a.on)</code>, and how do you fix it?", `${repl("p3Repl")}<p>There is no field <code>on</code>, only the private <code>__on</code>. Fix it by adding a get method:</p>${py("p3Fix")}${repl("p3FixRepl")}`)}` },
    ],
    takeaways: ["Private: <code>__name</code>, used only inside the class.", "Access through get and set methods.", "Mangled to <code>_Class__name</code>: a convention."],
  },
  {
    slug: "8-abstraction", nav: "Abstraction", title: "Abstraction and Encapsulation",
    subtitle: "Use a class from its contract",
    abstract: "Abstraction separates using code from implementing it. Encapsulation bundles data with its methods and hides the details behind a contract.",
    tags: ["function abstraction", "BMI", "Loan"],
    hero: "code:bmiMain", heroCaption: "Using BMI from its contract alone",
    sections: [
      { id: "function", title: "Function abstraction", html: `
        <p><b>Abstraction</b> means separating the <em>use</em> of a piece of code from its <em>implementation</em>. You have been doing it since Lecture 4: <b>function abstraction</b> separates what a function does (its name, parameters, return value) from how it does it. You call <code>math.sqrt</code> without knowing how it computes a square root. Abstraction makes code easier to maintain, debug and reuse.</p>
        ${py("gcd")}${repl("gcdRepl")}
        <p>Anyone can use <code>gcd</code> from its first line and its docstring. If someone later replaces the loop with a faster algorithm, every caller keeps working unchanged.</p>
        <p>It also lets two people work on one program. Programmer 1 writes and maintains <code>is_prime</code>; programmer 2 writes <code>first_primes</code> and only needs to know what <code>is_prime</code> returns:</p>
        ${py("primes")}${repl("primesRepl")}
        <p>If everything is written together in one function (slide 51), the prime test is buried in the middle of the counting loop, and neither part can be tested or reused on its own.</p>
        ${callout("note", "NOTE", `<p>The slide version, <code>printPrimeNumbers(numberOfPrimes)</code>, prints the primes ten per line. It also sets <code>NUMBER_OF_PRIMES = 50</code> and never uses it. Here <code>first_primes</code> returns a list and the caller decides how to print it.</p>`)}` },
      { id: "class", title: "Class abstraction and encapsulation", html: `
        <p><b>Class abstraction</b> applies the same idea to a class: it separates how a class is <em>implemented</em> from how it is <em>used</em>. The class's methods, together with a description of what each one does, form the class's <b>contract</b> with its users (its <em>clients</em>). The user needs the contract, not the implementation: for the user, the class is a <b>black box</b>.</p>
        <p><b>Encapsulation</b> is how a class achieves this: it puts the data and the methods that work on it together in one object, and hides the data fields and the method implementations from the user. Private data fields are the tool; the contract is what the user sees.</p>` },
      { id: "bmi", title: "Example: a BMI class", html: `
        <p>The contract, as a UML diagram. A <code>-</code> in front of a field means it is private:</p>
        ${out("bmiUml")}
        <p>You can use the class from the contract alone:</p>
        ${py("bmiMain")}
        <p>Here is the implementation. The user of the class never needs to read it:</p>
        ${py("bmi")}${out("bmiOut")}
        <p><code>get_status</code> calls another method of the same object, <code>self.get_bmi()</code>, rather than repeating the formula.</p>
        ${demo("bmi", "Demo 9 · BMI as a black box", "change the inputs", "Closed, you see only the contract — and that is enough to use the class. Open the box to see what the contract hides.")}
        ${callout("note", "NOTE", `<p>The UML diagram on the slide says <code>age</code> has the default 20, but the slide's code has no default. A default for <code>age</code> would need defaults for <code>weight</code> and <code>height</code> too, because parameters with defaults must come after those without. The slide's <code>getBMI</code> also writes the formula over three lines; <code>height_m</code> here is the same computation.</p>`)}
        ${predict("<code>main</code> runs before the <code>BMI</code> class is defined in the listing above it, yet it works. Why? (Hint: when does Python look up the name <code>BMI</code> inside <code>main</code>?)",
          `<p>A name inside a function body is looked up when the function <em>runs</em>, not when the <code>def</code> is executed. <code>main()</code> is called on the last line, after the <code>class BMI</code> statement has run, so <code>BMI</code> exists by then.</p>`)}` },
      { id: "loan", title: "Example: a Loan class", html: `
        ${out("loanUml")}
        ${py("loan")}${py("loanMain")}${out("loanOut")}
        ${demo("loan", "Demo 10 · The Loan class at work", "change the numbers", "The same <code>get_monthly_payment</code> formula as the class, printed the way <code>main</code> prints it.")}
        ${callout("note", "NOTE", `<p>The slide program reads the four values with <code>eval(input(...))</code>; entering 2.5, 5, 1000 and John Jones gives the output above. Use <code>float(input(...))</code> and <code>int(input(...))</code> instead of <code>eval</code>: <code>eval</code> runs whatever the user types as Python code. The slide's UML diagram also lists <code>setMonthlyPayment(): float</code>, which should be <code>getMonthlyPayment</code>.</p>`)}
        <p>The user of <code>Loan</code> knows <em>what</em> <code>get_monthly_payment</code> returns, not the formula behind it. If the bank changes how it computes payments, only the class changes.</p>` },
    ],
    takeaways: ["Abstraction: use ≠ implementation.", "Encapsulation: data + methods, details hidden.", "Users need the contract, not the code."],
  },
  {
    slug: "9-summary", nav: "Summary", title: "Summary and Practice",
    subtitle: "Check yourself, then write some classes",
    abstract: "A one-page map of the lecture, six self-check questions, seven exercises with solutions, and a checklist for classes an AI writes for you.",
    tags: ["knowledge map", "self-check", "exercises"],
    hero: "toc",
    sections: [
      { id: "map", title: "Knowledge map", html: `<div class="map">
        <div class="card"><h3>Objects</h3><ul><li><b>Identity</b> (<code>id</code>), <b>state</b>, <b>behaviour</b></li><li>A name is a <b>reference</b> (an arrow)</li><li><code>is</code>: same object; <code>==</code>: equal values</li></ul></div>
        <div class="card"><h3>Classes</h3><ul><li>A <b>class</b> is the blueprint</li><li>An <b>instance</b> is one object made from it</li><li>Fields per object, methods per class</li></ul></div>
        <div class="card"><h3>Construction</h3><ul><li><code>Circle(5)</code>: empty object, then <code>__init__</code></li><li>Arguments match <code>__init__</code> after <code>self</code></li><li>Fields are made with <code>self.x = …</code></li></ul></div>
        <div class="card"><h3>self</h3><ul><li>The object being worked on</li><li><code>c.get_area()</code> = <code>Circle.get_area(c)</code></li><li>Every method has <code>self</code> first</li></ul></div>
        <div class="card"><h3>Objects as arguments</h3><ul><li><code>p.field = v</code>: the caller sees it</li><li><code>p = v</code>: the caller sees nothing</li></ul></div>
        <div class="card"><h3>Hiding and encapsulation</h3><ul><li>Private <code>__x</code> → <code>_Class__x</code> (a convention)</li><li>Get and set methods that check their argument</li><li>Users need the <b>contract</b>, not the code</li></ul></div></div>` },
      { id: "check", title: "Check your understanding", html: `<div data-demo="quiz"><div class="demo-body"></div></div>` },
      { id: "exercises", title: "Exercises", html: `
        <p>★ trace or modify · ★★ write · ★★★ extend or combine. For every class you write, create at least two objects and check that changing one does not change the other.</p>
        <h3>Exercise 1 ★ (trace)</h3>
        <p>Draw the names and objects after each line, then write down what is printed. (Use the private <code>Circle</code> with <code>set_radius</code>.)</p>${py("ex1")}
        <details class="reveal"><summary>Solution</summary><p>Two <code>Circle</code> objects; <code>a</code> and <code>c</code> refer to the first. <code>c.set_radius(4)</code> changes the first object. <code>b.set_radius(-2)</code> is ignored by the check in <code>set_radius</code>.</p>${out("ex1Out")}</details>
        <h3>Exercise 2 ★ (find the bug)</h3>
        <p><code>Square(3).get_area()</code> should return 9. Explain the error and fix the class.</p>${py("ex2")}${repl("ex2Repl")}
        <details class="reveal"><summary>Solution</summary><p><code>side = side</code> assigns the parameter to itself; the object never gets a data field. It must be <code>self.side = side</code>.</p>${py("ex2Fix")}${repl("ex2FixRepl")}</details>
        <h3>Exercise 3 ★ (modify)</h3>
        <p><code>print_areas</code> changes the radius of the circle it is given, so after the call the caller's circle has radius 6. Change it into <code>print_areas_safe(radius, times)</code> that takes a starting radius and creates its own circles, so no caller's object is ever changed. Use the private <code>Circle</code>.</p>
        <details class="reveal"><summary>Solution</summary>${py("ex3")}${repl("ex3Repl")}</details>
        <h3>Exercise 4 ★★ (the Rectangle class)</h3>
        <p>Following the example of the <code>Circle</code> class, design a class <code>Rectangle</code> with two data fields <code>width</code> and <code>height</code>; a constructor that creates a rectangle with the given width and height, with defaults 1 and 2; a method <code>get_area()</code> and a method <code>get_perimeter()</code>. Create a 4 × 40 rectangle and a 3.5 × 35.7 rectangle and print the width, height, area and perimeter of each.</p>
        <details class="reveal"><summary>Solution</summary>${py("ex4")}${out("ex4Out")}${repl("ex4Repl")}</details>
        <h3>Exercise 5 ★★ (the Stock class)</h3>
        <p>Design a class <code>Stock</code> with private data fields <code>symbol</code>, <code>name</code>, <code>previous_closing_price</code> and <code>current_price</code>; a constructor that takes all four; get methods for the name and symbol; get and set methods for both prices; and a method <code>get_change_percent()</code> that returns the percentage change from the previous closing price to the current price. Test it with symbol <code>"INTC"</code>, name <code>"Intel Corporation"</code>, previous closing price 20.5 and current price 20.35.</p>
        <details class="reveal"><summary>Solution</summary>${py("ex5")}${repl("ex5Repl")}</details>
        <h3>Exercise 6 ★★ (a bank account)</h3>
        <p>Write a class <code>Account</code> with a private <code>balance</code> (default 0). <code>deposit(amount)</code> adds a positive amount. <code>withdraw(amount)</code> takes money out only if the balance is large enough, and returns <code>True</code> if it did and <code>False</code> if it did not. <code>get_balance()</code> returns the balance. Why is a private <code>balance</code> better here than a public one?</p>
        <details class="reveal"><summary>Solution</summary>${py("ex6")}${repl("ex6Repl")}<p>With a public <code>balance</code>, any code could write <code>acct.balance = -1000</code> and skip every rule. With a private one, the only ways to change the balance are <code>deposit</code> and <code>withdraw</code>, which enforce the rules. (Someone could still write <code>acct._Account__balance</code>, but no one does that by accident.)</p></details>
        <h3>Exercise 7 ★★★ (two objects in one method)</h3>
        <p>Write a class <code>Point</code> with data fields <code>x</code> and <code>y</code> and a method <code>distance_to(other)</code> that returns the distance from this point to another <code>Point</code>. Inside the method, <code>self</code> is one point and <code>other</code> is the other. Then write a function <code>farthest(points, origin)</code> that returns the point in the list <code>points</code> farthest from <code>origin</code>.</p>
        <details class="reveal"><summary>Solution</summary>${py("ex7")}${repl("ex7Repl")}<p>In <code>Point(0, 0).distance_to(Point(3, 4))</code>, <code>self</code> refers to the first point and <code>other</code> to the second. A method can take any number of other objects as parameters, of its own class or any other.</p></details>` },
      { id: "ai", title: "Working with AI", html: `
        <p>An AI assistant can write a whole class in seconds. Your job is to know whether it is right. Use this lecture's checklist on any class, yours or an AI's:</p>
        <ol><li><b>Every data field is set through <code>self.</code></b> in <code>__init__</code>. Look for a bare <code>radius = radius</code>.</li>
        <li><b>Every method has <code>self</code> first</b>, and calls other methods as <code>self.method(...)</code>.</li>
        <li><b>Setters check the argument</b>, not the old value (the TV bug in Chapter 5), and reject values that make no sense.</li>
        <li><b>Fields that need rules are private</b> and only change through methods.</li>
        <li><b>Test with two objects.</b> Create two, change one, and check that the other did not change. Then pass one to a function and check what the caller sees.</li></ol>
        <p>Try this: ask an assistant for “a Python class for a TV with channel and volume, with limits”. Apply the checklist. Does its <code>set_channel</code> check the new channel? What happens if you call <code>set_channel(500)</code>, or call it while the TV is off? Does it claim that double-underscore fields “cannot be accessed”? Ask it to fix what you find, and check again.</p>` },
      { id: "terms", title: "Key terms and further reading", html: `
        <p class="tags">${["object", "identity", "state", "behaviour", "data field (attribute, property)", "reference", "method", "class", "instance", "instantiation", "blueprint (template, contract)", "initializer (__init__)", "constructor", "self", "dot operator", "instance variable", "instance method", "local variable", "UML class diagram", "data hiding", "private field", "accessor (get method)", "mutator (set method)", "name mangling", "abstraction", "encapsulation", "client"].map((t) => `<span class="tag">${t}</span>`).join("")}</p>
        <ul><li>Y. D. Liang, <em>Introduction to Programming Using Python</em>, Pearson 2013, Chapter 7 (Objects and Classes). The <code>Circle</code>, <code>TV</code>, <code>BMI</code> and <code>Loan</code> examples and the two practice exercises follow this chapter.</li>
        <li>J. DeNero, <em>Composing Programs</em>, §2.5 Object-Oriented Programming. <a href="https://www.composingprograms.com/pages/25-object-oriented-programming.html" target="_blank" rel="noopener">composingprograms.com</a></li>
        <li>The Python Tutorial, §9 Classes, especially §9.3 (a first look at classes) and §9.6 (private variables and name mangling). <a href="https://docs.python.org/3/tutorial/classes.html" target="_blank" rel="noopener">docs.python.org</a></li>
        <li>Python Tutor, to watch objects and frames appear: <a href="https://pythontutor.com" target="_blank" rel="noopener">pythontutor.com</a></li></ul>` },
    ],
    takeaways: ["Objects, classes, <code>self</code>.", "Change the object vs rebind the name.", "Private fields and contracts."],
  },
];

const QUIZ = [
  { q: "What is the difference between a class and an object?",
    opts: ["A class is a blueprint; an object is one instance made from it, with its own values", "They are the same thing", "An object is a blueprint; a class is made from it", "A class holds data; an object holds only methods"],
    a: 0, why: "A class says which data fields and methods its objects have (<code>Circle</code>). An object is one instance made from it, with its own values (<code>Circle(5)</code>)." },
  { q: "In <code>c = Circle(5)</code>, what does <code>self</code> refer to while <code>__init__</code> runs?",
    opts: ["The class <code>Circle</code>", "The new object", "The number 5", "Nothing: <code>c</code> is not assigned yet, so <code>self</code> is <code>None</code>"],
    a: 1, why: "<code>self</code> refers to the new object. When <code>__init__</code> returns, its frame is thrown away with the name <code>self</code>; the object survives because the constructor returns it, and <code>c</code> then refers to it." },
  { q: "What does this print?", code: CODE.check3,
    opts: ["2", "7", "None", "an error"],
    a: 1, why: "<code>7</code>. <code>p</code> and <code>q</code> refer to the same object." },
  { q: "A method is written <code>def get_area():</code> with no parameters. What happens when you call <code>c.get_area()</code>?",
    opts: ["It works: Python adds <code>self</code> automatically", "It returns <code>None</code>", "<code>TypeError</code>: the call passes <code>c</code>, but the method takes no arguments", "<code>AttributeError</code>: there is no <code>self</code>"],
    a: 2, why: "<code>c.get_area()</code> means <code>Circle.get_area(c)</code>: one argument, but the method takes none. It needs <code>self</code>." },
  { q: "Inside a function with parameter <code>c</code>, what does the caller see after <code>c = Count(5)</code>?",
    opts: ["Its object now has <code>count = 5</code>", "Its name now refers to the new object", "Nothing: only the function's own name moved", "An error"],
    a: 2, why: "<code>c = Count(5)</code> only moves the function's own name. <code>c.count = 5</code> would change the caller's object." },
  { q: "After <code>self.__x = 1</code> in class <code>A</code>, can code outside the class read the value 1?",
    opts: ["No, never: private fields are locked", "Yes, as <code>a.__x</code>", "Yes, as <code>a._A__x</code>: the name is mangled, not locked", "Only through <code>vars(A)</code>"],
    a: 2, why: "The field is stored as <code>_A__x</code>, and <code>a._A__x</code> reads it. Private names are a convention, not a lock." },
];
