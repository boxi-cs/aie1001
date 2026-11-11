// Chapter content, adapted from notes/L08-inheritance.md. Code is copied from the note.

const demo = (name, title, instr, hint = "") =>
  `<div class="card demo" data-demo="${name}"><div class="head"><span class="title">${title}</span><span>${instr}</span></div>
   <div class="demo-body"></div>${hint ? `<p class="hint">${hint}</p>` : ""}</div>`;

const callout = (kind, label, body) => `<div class="callout ${kind}"><b>${label}</b>${body}</div>`;
const predict = (q, a) => callout("predict", "PREDICT", `<p>${q}</p><details class="reveal"><summary>Show the answer</summary>${a}</details>`);

const VIDEO_P1 = "media/L08-1.mp4";
const VIDEO_P2 = "media/L08-2.mp4";
const VIDEO_P3 = "media/L08-3.mp4";
const VIDEO_P4 = "media/L08-4.mp4";

const LECTURE = {
  number: 8,
  title: "Inheritance and Polymorphism",
  tagline: "Object-oriented programming II",
  lead: "Build new classes from old ones, override what changes, and let one function work for every kind of object — interactive notes where you can watch Python climb the class chain to find each method.",
  heroDemo: "lookupMini",
  heroLabel: "Method lookup · a = C4(); a.output()",
  heroCaption: "Python searches the object's class, then each superclass, until it finds the name.",
  whyTitle: "Why inheritance is worth learning",
  whySub: "Three ideas you will use in every larger program",
  why: [
    ["Write it once", "Put what classes share in a <b>superclass</b>; each <b>subclass</b> adds only what is new."],
    ["One rule for every call", "<b>Method lookup</b> — start at the object's class, go up — answers every “which method runs?” question."],
    ["Code that works for future classes", "With <b>polymorphism</b>, a function written for <code>GeometricObject</code> works for circles, rectangles, and shapes not yet invented."],
  ],
  ctaTitle: "Ready to build a class from a class?",
  minutes: "About 60–75 minutes",
  videos: {
    [VIDEO_P1]: "Lecture 8 · Part 1 — Superclass and subclass (8.4 min)",
    [VIDEO_P2]: "Lecture 8 · Part 2 — Overriding and the object class (7.4 min)",
    [VIDEO_P3]: "Lecture 8 · Part 3 — Polymorphism and method lookup (7.2 min)",
    [VIDEO_P4]: "Lecture 8 · Part 4 — isinstance and multiple inheritance (7.5 min)",
  },
};

const CHAPTERS = [
  {
    slug: "1-subclass", nav: "Subclasses", title: "Superclass and Subclass",
    subtitle: "Define a new class from an existing one",
    abstract: "Circles and rectangles both have a colour. Write that once, in GeometricObject, and let Circle and Rectangle inherit it. super().__init__ lets the superclass set up its own fields.",
    tags: ["class Circle(GeometricObject)", "super().__init__", "is-a"],
    hero: "constructMini", heroCaption: "Circle(1.5): two __init__ methods, one object.",
    sections: [
      { id: "video", title: "Watch: superclass and subclass", html: `
        <p>The first video of this lecture covers this chapter: why inheritance, <code>class Circle(GeometricObject)</code>, what <code>super().__init__</code> does to the one object in memory, two common traps, and when not to inherit.</p>
        <div class="card video" data-video="${VIDEO_P1}"></div>` },
      { id: "why", title: "Why inheritance?", html: `
        <p>In Lecture 7 you wrote classes: a class bundles data fields and the methods that use them, and each object made from the class gets its own copy of the fields. Now suppose you are writing a drawing program with circles and rectangles. Every shape has a colour and is either filled or not. A circle also has a radius; a rectangle has a width and a height. Both can report their area and perimeter.</p>
        <p>You could write two unrelated classes, <code>Circle</code> and <code>Rectangle</code>, each with its own <code>color</code> and <code>filled</code> fields and its own <code>get_color</code>, <code>set_color</code>, <code>is_filled</code> and <code>set_filled</code> methods. That is the same code written twice. If you later add a <code>Triangle</code>, it is three times, and a bug fixed in one copy stays in the others.</p>
        <p>Object-oriented programming has a better answer. Write the common part once, in a general class <code>GeometricObject</code>, and define <code>Circle</code> and <code>Rectangle</code> as special kinds of <code>GeometricObject</code> that <b>inherit</b> everything it has and add their own fields and methods. This is <b>inheritance</b>: defining a new class from an existing one. It is the main tool OOP gives you for reusing code.</p>
        <div class="uml">
          <div class="uml-cls top"><b>GeometricObject</b><div>__color, __filled</div><div>get_color · set_color · is_filled · set_filled · __str__</div></div>
          <div class="uml-arrows"><span>▲ is a</span><span>▲ is a</span></div>
          <div class="uml-row"><div class="uml-cls"><b>Circle</b><div>__radius</div><div>get_radius · set_radius · get_area · get_perimeter · get_diameter · print_circle</div></div>
          <div class="uml-cls"><b>Rectangle</b><div>__width, __height</div><div>get_width · set_width · get_height · set_height · get_area · get_perimeter</div></div></div>
        </div>
        <p class="hint" style="text-align:center">Circle and Rectangle inherit the two fields and five methods of GeometricObject, and add their own.</p>` },
      { id: "general", title: "The general class", html: `
        <p>Here is the general class. It uses the private fields of Lecture 7 (two leading underscores) with getter and setter methods.</p>
        ${callout("note", "NOTE", `<p>The slides name the methods in camelCase: <code>getColor</code>, <code>setColor</code>, <code>isFilled</code>. These notes use Python's standard style (PEP 8): <code>get_color</code>, <code>set_color</code>, <code>is_filled</code>. Class names stay in CapWords, as PEP 8 asks: <code>GeometricObject</code>.</p>`)}
        ${codeBlock(CODE.geometric)}
        ${codeBlock(`>>> shape = GeometricObject("red", False)\n>>> print(shape)\ncolor: red and filled: False`, "repl")}` },
      { id: "subclass", title: "Defining a subclass", html: `
        <p>To make <code>Circle</code> a special kind of <code>GeometricObject</code>, put the general class in brackets after the new class's name:</p>
        ${codeBlock(CODE.circle1)}
        <p><code>GeometricObject</code> is the <b>superclass</b> (also called the parent class or base class) and <code>Circle</code> is the <b>subclass</b> (child class, derived class). We say <code>Circle</code> <b>extends</b> <code>GeometricObject</code>, or <code>Circle</code> is <b>derived from</b> <code>GeometricObject</code>.</p>
        <p>A <code>Circle</code> object can use every method of <code>GeometricObject</code> as if it were written in <code>Circle</code>, plus the methods <code>Circle</code> adds:</p>
        ${codeBlock(CODE.replCircle, "repl")}
        <p>A subclass is usually <em>bigger</em> than its superclass, not smaller: it has everything the superclass has, and more. “Sub” refers to the set of objects: every circle is a geometric object, but not every geometric object is a circle.</p>` },
      { id: "super-init", title: "super().__init__: let the superclass set up its part", html: `
        <p>When <code>Circle(1.5)</code> runs, Python calls <code>Circle.__init__</code>. Its first line, <code>super().__init__(color, filled)</code>, calls the <code>__init__</code> of the superclass on the <em>same</em> object. <code>super()</code> means “the superclass of the class I am written in”. So <code>GeometricObject.__init__</code> runs with <code>self</code> being the new circle, and puts <code>color</code> and <code>filled</code> on it. Then <code>Circle.__init__</code> carries on and adds <code>radius</code>.</p>
        ${demo("construct", "Demo 1 · Build a Circle", "← → keys step", "Watch the object box on top: both <code>__init__</code> frames write into the <b>same</b> object. Switch to the second version to see what forgetting <code>super().__init__()</code> does.")}
        ${callout("note", "NOTE", `<p>The slide's <code>Circle.__init__</code> takes only <code>radius</code> and calls <code>super().__init__()</code> with no arguments, so every circle starts green and filled. The class diagram on the slides lists <code>Circle(radius, color, filled)</code>; the version above matches the diagram, and passes <code>color</code> and <code>filled</code> on to the superclass. <code>Circle(1.5)</code> behaves the same in both.</p>`)}` },
      { id: "memory", title: "What is in memory", html: `
        <p>There is <em>one</em> object. It does not contain a separate <code>GeometricObject</code> object inside it; both <code>__init__</code> methods put their attributes on the same <code>self</code>. <code>vars(obj)</code> shows an object's attributes:</p>
        ${codeBlock(`>>> vars(Circle(1.5))\n{'_GeometricObject__color': 'green', '_GeometricObject__filled': True, '_Circle__radius': 1.5}`, "repl")}
        <p>The odd names come from the double underscores. Inside a class, Python renames <code>self.__color</code> to <code>self._GeometricObject__color</code>, adding the name of the class the code is written in. This is the <b>name mangling</b> of Lecture 7, and it is how “private” fields work in Python. The methods, on the other hand, are not on the object at all: they stay in the classes, and the object only knows its class. Chapter 4 shows how Python finds them.</p>
        ${predict(`What are <code>b.j</code> and <code>b.i</code>? (It is the slide's “What is the problem?” practice.)${codeBlock(`class A:
    def __init__(self, i=0):
        self.i = i


class B(A):
    def __init__(self, j=0):
        self.j = j


b = B()`)}`,
          `${codeBlock(`>>> b.j\n0\n>>> b.i\nTraceback (most recent call last):\n  ...\nAttributeError: 'B' object has no attribute 'i'...`, "repl")}<p><code>B</code> has its own <code>__init__</code>, so <code>B()</code> runs <code>B.__init__</code> only. <code>A.__init__</code> never runs, so the object never gets an <code>i</code>. Inheriting the <em>method</em> <code>__init__</code> from <code>A</code> does not help, because <code>B</code> replaced it with its own. The fix is one line at the start of <code>B.__init__</code>: <code>super().__init__()</code>.</p>`)}
        ${callout("pitfall", "PITFALL · FORGETTING super().__init__(...)", `<p>If a subclass defines <code>__init__</code>, the superclass's <code>__init__</code> does <em>not</em> run by itself. Its fields are never created, and the error appears later, when some inherited method uses them:</p>${codeBlock(`class SilentCircle(GeometricObject):
    def __init__(self, radius):
        self.__radius = radius             # forgot super().__init__()`)}${codeBlock(`>>> SilentCircle(2).get_color()\nTraceback (most recent call last):\n  ...\nAttributeError: 'SilentCircle' object has no attribute '_GeometricObject__color'...`, "repl")}<p>Make <code>super().__init__(...)</code> the first line of every subclass <code>__init__</code>. (Demo 1, second version.)</p>`)}
        ${callout("pitfall", "PITFALL · PRIVATE FIELDS ARE PRIVATE TO THE CLASS, NOT TO THE FAMILY", `<p>A subclass cannot reach the superclass's double-underscore fields by name, because the name is mangled with the <em>superclass's</em> name:</p>${codeBlock(`class BadCircle(GeometricObject):
    def describe(self):
        return "a " + self.__color + " circle"     # becomes self._BadCircle__color`)}${codeBlock(`>>> BadCircle().describe()\nTraceback (most recent call last):\n  ...\nAttributeError: 'BadCircle' object has no attribute '_BadCircle__color'...`, "repl")}<p>Use the public getter instead: <code>self.get_color()</code>. That is what getters are for.</p>`)}` },
      { id: "rectangle", title: "A second subclass: Rectangle", html: `
        <p><code>Rectangle</code> extends <code>GeometricObject</code> in the same way:</p>
        ${codeBlock(`class Rectangle(GeometricObject):
    def __init__(self, width=1, height=1, color="green", filled=True):
        super().__init__(color, filled)
        self.__width = width
        self.__height = height

    def get_width(self):
        return self.__width

    def set_width(self, width):
        self.__width = width

    def get_height(self):
        return self.__height

    def set_height(self, height):
        self.__height = height

    def get_area(self):
        return self.__width * self.__height

    def get_perimeter(self):
        return 2 * (self.__width + self.__height)`)}
        ${callout("note", "NOTE", `<p>On the slide, <code>setHeight</code> reads <code>self.__height = self.__height</code>, which assigns the old height to itself and ignores the argument. The version above assigns <code>height</code>.</p>`)}
        <p>The slides test both classes with this program. (On the slides the classes live in their own files and are imported with <code>from CircleFromGeometricObject import Circle</code>; here everything is in one file. Module names in PEP 8 are lower case, e.g. <code>from circle import Circle</code>.)</p>
        ${codeBlock(`def main():
    circle = Circle(1.5)
    print("A circle", circle)
    print("The radius is", circle.get_radius())
    print("The area is", circle.get_area())
    print("The diameter is", circle.get_diameter())

    rectangle = Rectangle(2, 4)
    print("\\nA rectangle", rectangle)
    print("The area is", rectangle.get_area())
    print("The perimeter is", rectangle.get_perimeter())


main()`)}
        ${codeBlock("A circle color: green and filled: True\nThe radius is 1.5\nThe area is 7.0685834705770345\nThe diameter is 3.0\n\nA rectangle color: green and filled: True\nThe area is 8\nThe perimeter is 12", "out")}
        <p><code>print("A circle", circle)</code> prints the object using its <code>__str__</code> method, and neither <code>Circle</code> nor <code>Rectangle</code> has one yet, so both use the one inherited from <code>GeometricObject</code>. That is why neither line mentions the radius or the size. Chapter 2 fixes this.</p>` },
      { id: "is-a", title: "Is-a, and when not to inherit", html: `
        <p>Inheritance models an <b>is-a</b> relationship: a circle <em>is a</em> geometric object, so every <code>Circle</code> can be used wherever a <code>GeometricObject</code> is expected. Before you write <code>class X(Y)</code>, say the sentence “every X is a Y”. If it is false, don't inherit, even if the two classes share some fields.</p>
        <p>A <code>Tree</code> class and a <code>Person</code> class both have a height and a weight, but a tree is not a person. Making <code>Tree</code> extend <code>Person</code> to reuse <code>get_height</code> would give every tree a <code>get_name</code> method and let a tree be passed to any function that expects a person. A class that merely <em>uses</em> another object has a <b>has-a</b> relationship with it: a course <em>has</em> students (Chapter 6), a car <em>has</em> an engine. Has-a is modelled with a data field, not with inheritance.</p>` },
    ],
    takeaways: ["class Sub(Super): inherits every method.", "super().__init__(...) first: one object, fields from both.", "Inherit only when “every X is a Y”."],
  },
  {
    slug: "2-override", nav: "Overriding", title: "Overriding Methods",
    subtitle: "Replace an inherited method, and still reuse it",
    abstract: "A subclass method with the same name replaces the inherited one. Inside it, super().method() still reaches the superclass version.",
    tags: ["__str__", "super().__str__()", "extend, don't repeat"],
    hero: "code:circleStr", heroCaption: "Circle overrides __str__ and reuses GeometricObject's.",
    sections: [
      { id: "video", title: "Watch: overriding and the object class", html: `
        <p>The second video covers this chapter and the next: overriding <code>__str__</code> and reusing the superclass version with <code>super()</code>, then the <code>object</code> class and its <code>__str__</code>, <code>__new__</code> and <code>__eq__</code>.</p>
        <div class="card video" data-video="${VIDEO_P2}"></div>` },
      { id: "replace", title: "Replacing an inherited method", html: `
        <p>A subclass inherits every method of its superclass. Sometimes the inherited version is not right for the subclass. The <code>__str__</code> of <code>GeometricObject</code> says nothing about the radius, so printing a circle is not very informative. A subclass can define a method with the <em>same name</em> as one it inherits. Its own version then replaces the inherited one for objects of the subclass. This is <b>method overriding</b>.</p>
        <p><code>Circle.__str__</code> below overrides <code>GeometricObject.__str__</code>. It still wants the colour and the filled flag, so instead of repeating that code it calls the superclass version with <code>super().__str__()</code> and adds the radius:</p>
        ${codeBlock(CODE.circleStr)}
        ${codeBlock(`>>> c = Circle(1.5)\n>>> print(c)\ncolor: green and filled: True radius: 1.5\n>>> print(GeometricObject())\ncolor: green and filled: True`, "repl")}
        <p><code>print_circle</code> is gone: once <code>__str__</code> describes a circle properly, <code>print(c)</code> does its job.</p>
        ${callout("note", "NOTE", `<p>The slide writes <code>super().__str__() + " radius: " + str(radius)</code>. There is no variable <code>radius</code> inside <code>__str__</code>, so that line raises <code>NameError</code>; it must be <code>str(self.__radius)</code>.</p>`)}` },
      { id: "chain", title: "Overriding in both subclasses", html: `
        <p><code>Rectangle</code> overrides <code>__str__</code> in the same way:</p>
        ${codeBlock(`    def __str__(self):
        return (super().__str__() + " width: " + str(self.__width)
                + " height: " + str(self.__height))`)}
        ${codeBlock(`>>> print(Rectangle(2, 4))\ncolor: green and filled: True width: 2 height: 4`, "repl")}
        <p>(The rest of <code>Rectangle</code> is unchanged from Chapter 1.) Both versions of <code>__str__</code> now exist side by side. <code>GeometricObject.__str__</code> is used for plain geometric objects, and from inside the subclasses through <code>super()</code>; <code>Circle.__str__</code> is used for circles.</p>
        ${demo("str", "Demo 2 · print(x) and super().__str__()", "pick an object, then step", "The override is found first. <code>super()</code> then reaches one class <b>up</b>, with the same <code>self</code>.")}
        ${callout("pattern", "PATTERN · EXTEND, DON'T REPEAT", `<p>When a subclass needs to do what the superclass does <em>and a bit more</em>, override the method and call the superclass version with <code>super().method(...)</code>, then add the extra. <code>super().__init__(...)</code> in an initializer is the most common case of this pattern.</p>`)}` },
      { id: "practice", title: "Practice", html: `
        ${predict(`What does this program print? (The slides' second practice.)${codeBlock(`class A:
    def __init__(self, i=0):
        self.i = i

    def m1(self):
        self.i += 1


class B(A):
    def __init__(self, j=0):
        super().__init__(3)
        self.j = j

    def m1(self):
        self.i += 1


def main():
    b = B()
    b.m1()
    print(b.i)
    print(b.j)


main()`)}`,
          `${codeBlock("4\n0", "out")}<p><code>B()</code> runs <code>B.__init__</code>, which first runs <code>A.__init__</code> with <code>i = 3</code>, then sets <code>j = 0</code>. <code>b.m1()</code> runs <code>B.m1</code> (it overrides <code>A.m1</code>), which adds 1 to <code>i</code>.</p>`)}
        ${callout("pitfall", "PITFALL · OVERRIDING NEEDS THE SAME NAME, EXACTLY", `<p>If the subclass writes <code>def __str(self)</code> or <code>def get_Area(self)</code>, it adds a <em>new</em> method and the inherited one is still used. No error is raised; the program just ignores your method. When an override seems to have no effect, check the spelling against the superclass.</p>`)}` },
    ],
    takeaways: ["Same name in the subclass → it replaces the inherited one.", "super().m() runs the superclass version.", "Extend, don't repeat."],
  },
  {
    slug: "3-object", nav: "object", title: "The object Class",
    subtitle: "The superclass of every class",
    abstract: "Every class descends from object, which gives it __init__, __new__, __str__ and __eq__. Override __str__ to print well and __eq__ to compare by value.",
    tags: ["__str__", "__new__ then __init__", "__eq__"],
    hero: "code:pointEq", heroCaption: "Override __eq__ to compare by value.",
    sections: [
      { id: "every", title: "Every class has a superclass", html: `
        <p>Every class in Python is descended from a built-in class called <code>object</code>. If you don't name a superclass, the superclass is <code>object</code>. So these two lines mean the same:</p>
        ${codeBlock(`class ClassName:
    ...

class ClassName(object):
    ...`)}
        ${codeBlock(`>>> GeometricObject.__bases__\n(<class 'object'>,)`, "repl")}
        <p>(<code>__bases__</code> holds the superclasses a class was defined with.) So the chain for a circle is <code>Circle</code> → <code>GeometricObject</code> → <code>object</code>. Everything <code>object</code> defines is inherited by every class you write, including <code>__init__</code>, <code>__str__</code>, <code>__eq__</code> and <code>__new__</code>.</p>` },
      { id: "str", title: "__str__", html: `
        <p><code>print(x)</code> and <code>str(x)</code> call <code>x.__str__()</code>. The version in <code>object</code> is not very useful:</p>
        ${codeBlock(`>>> class Bare:\n...     def __init__(self, i=0):\n...         self.i = i\n...\n>>> print(Bare(8))\n<...Bare object at 0x...>`, "repl")}
        <p>Python shows the class name and the object's memory address, something like <code>&lt;__main__.Bare object at 0x10f3a2d10&gt;</code>. You should almost always override <code>__str__</code> so that it returns an informative description:</p>
        ${codeBlock(`class A:
    def __init__(self, i=0):
        self.i = i

    def m1(self):
        self.i += 1

    def __str__(self):
        return "The content of this object is:" + str(self.i)


x = A(8)
print(x)`)}
        ${codeBlock("The content of this object is:8", "out")}` },
      { id: "new", title: "__new__ and __init__", html: `
        <p>Creating an object takes two steps. <code>A(8)</code> first calls <code>__new__</code>, which makes a new, empty object. Then, if <code>__new__</code> returned an object of class <code>A</code>, Python calls <code>__init__</code> on it to fill in the fields. <code>object</code> provides a <code>__new__</code> that does the right thing, so you normally override only <code>__init__</code>.</p>
        <p>If you do override <code>__new__</code>, its first parameter is the class (by convention <code>cls</code>), and it must return the new object, which it gets from the superclass's <code>__new__</code>:</p>
        ${codeBlock(CODE.loud)}
        ${codeBlock("Loud's __new__() invoked\nLoud's __init__() invoked", "out")}
        ${demo("newInit", "Demo 3 · __new__, then __init__", "step through both versions", "In the slides' version, <code>__new__</code> returns <code>None</code>: no object, and <code>__init__</code> never runs.")}
        ${callout("pitfall", "PITFALL · A __new__ THAT RETURNS NOTHING", `<p>The slides' version of this example is</p>${codeBlock(CODE.newNone)}${codeBlock("A's __new__() invoked", "out")}<p>Its <code>__new__</code> returns <code>None</code>, so no object is made, <code>__init__</code> never runs, and <code>a</code> is <code>None</code>. (The parameter is also misnamed: the value passed in is the class <code>A</code>, not an object.) Unless you have a special reason, leave <code>__new__</code> alone.</p>`)}` },
      { id: "eq", title: "__eq__", html: `
        <p><code>a == b</code> calls <code>a.__eq__(b)</code>. The version inherited from <code>object</code> returns <code>True</code> only if <code>a</code> and <code>b</code> are the <em>same object</em>, which is the same test as <code>a is b</code>:</p>
        ${codeBlock(CODE.point)}
        ${codeBlock(`>>> p = Point(1, 2)\n>>> q = Point(1, 2)\n>>> p == q\nFalse\n>>> p == p\nTrue`, "repl")}
        <p><code>p</code> and <code>q</code> hold the same numbers, but they are two different objects. If two objects with equal fields should count as equal, override <code>__eq__</code>:</p>
        ${codeBlock(CODE.pointEq)}
        ${codeBlock(`>>> Point(1, 2) == Point(1, 2)\nTrue\n>>> Point(1, 2) == Point(2, 1)\nFalse\n>>> Point(1, 2) in [Point(0, 0), Point(1, 2)]\nTrue`, "repl")}
        ${demo("eq", "Demo 4 · Same object, or equal fields?", "pick a version and a test")}
        <p><code>in</code> on a list uses <code>==</code>, so it also starts to work as expected. (<code>isinstance</code> is explained in Chapter 5; here it makes <code>Point(1, 2) == "hello"</code> return <code>False</code> instead of crashing on <code>"hello".x</code>.)</p>` },
    ],
    takeaways: ["No superclass named → object.", "print calls __str__; override it.", "== uses __eq__: identity until you override it."],
  },
  {
    slug: "4-poly", nav: "Polymorphism", title: "Polymorphism and Method Lookup",
    subtitle: "One function, many kinds of object — and how Python picks the method",
    abstract: "A function written for GeometricObject works for every subclass. Which method runs is decided when the call happens, by searching up from the object's own class.",
    tags: ["dynamic binding", "lookup order", "__mro__"],
    hero: "lookupStudentMini", heroCaption: "b.print_student(): self.__str__() starts again at GraduateStudent.",
    sections: [
      { id: "video", title: "Watch: polymorphism and method lookup", html: `
        <p>The third video covers this chapter: one function for every kind of shape, the lookup rule, the <code>C1</code>–<code>C4</code> chain, and why <code>self.method()</code> starts again at the object's own class.</p>
        <div class="card video" data-video="${VIDEO_P3}"></div>` },
      { id: "many", title: "One function, many kinds of object", html: `
        <p>Every circle is a geometric object, and so is every rectangle. So a function written for a <code>GeometricObject</code> parameter works for any of them:</p>
        ${codeBlock(`def display_object(g):
    print(g)


def is_same_area(g1, g2):
    return g1.get_area() == g2.get_area()


def main():
    c = Circle(4)
    r = Rectangle(1, 3)
    display_object(c)
    display_object(r)
    print("Are the circle and rectangle the same size?", is_same_area(c, r))


main()`)}
        ${codeBlock("color: green and filled: True radius: 4\ncolor: green and filled: True width: 1 height: 3\nAre the circle and rectangle the same size? False", "out")}
        <p>The same line, <code>print(g)</code>, printed a radius the first time and a width and height the second. This is <b>polymorphism</b> (Greek for “many forms”): an object of a subclass can be used wherever an object of its superclass is expected, and the code that uses it does not need to know which subclass it is. The slides' version writes <code>print(g.__str__())</code>; <code>print(g)</code> does the same.</p>
        <p>Which <code>__str__</code> runs is not decided when <code>display_object</code> is written. It is decided each time the line runs, by the class of the object <code>g</code> refers to <em>at that moment</em>. This is <b>dynamic binding</b>.</p>
        ${callout("pattern", "PATTERN · ASK THE OBJECT", `<p>Write a function in terms of methods every object of the superclass has (<code>get_area</code>, <code>__str__</code>). Let each subclass override them. The function then works for every subclass, including ones written after the function.</p>`)}
        ${codeBlock(CODE.totalArea)}
        ${codeBlock(`>>> total_area([Rectangle(2, 4), Rectangle(1, 3), Rectangle(5, 5)])\n36\n>>> round(total_area([Circle(1), Rectangle(2, 4)]), 4)\n11.1416`, "repl")}
        ${demo("poly", "Demo 5 · One loop, many classes", "edit the shapes, then step", "Try <code>Rectangle(2, 4), Rectangle(1, 3), Rectangle(5, 5)</code> with <code>total_area</code>. The same line binds to a different method for each object.")}` },
      { id: "lookup", title: "Method lookup: how Python finds the method", html: `
        <p>Here is the rule Python follows for <code>obj.name</code>, for a method or any other attribute:</p>
        <ol><li>Look among the object's own attributes (the ones <code>__init__</code> put on it). If <code>name</code> is there, use it.</li>
        <li>Otherwise look in the object's class, <code>type(obj)</code>.</li>
        <li>Otherwise look in that class's superclass, then <em>its</em> superclass, and so on.</li>
        <li>The chain always ends at <code>object</code>. If <code>name</code> is not found there either, raise <code>AttributeError</code>.</li></ol>
        <p>The first match wins and the search stops. In the slides' words: if <code>o</code> is an instance of <code>C1</code>, <code>C1</code> is a subclass of <code>C2</code>, …, and <code>Cn</code> is <code>object</code>, then for a method call <code>o.p()</code> Python searches <code>C1</code>, <code>C2</code>, …, <code>Cn</code>, in that order, until it finds <code>p</code>. Python keeps this search order in the class attribute <code>__mro__</code> (<b>method resolution order</b>).</p>
        ${demo("lookup", "Demo 6 · The method-lookup walker", "pick a call, then step", "Amber: where Python is looking now. Struck-through classes were searched and did not have the name. Every scenario is a program from the notes.")}` },
      { id: "c1c4", title: "A four-level chain", html: `
        ${codeBlock(CODE.chain)}
        ${predict("<code>a = C4()</code>. What do <code>print(a.f)</code> and <code>a.output()</code> print?",
          `${codeBlock(CODE.chainRun)}${codeBlock("4\nIn C2, the f is: 4", "out")}${codeBlock(`>>> [k.__name__ for k in C4.__mro__]\n['C4', 'C3', 'C2', 'C1', 'object']`, "repl")}<p><code>C4()</code> looks for <code>__init__</code> and finds it in <code>C4</code> at once, so only <code>C4.__init__</code> runs and <code>f</code> is 4. (The other three <code>__init__</code> methods never run, because none of them is called with <code>super()</code>.) <code>a.output()</code> looks in <code>C4</code>: no <code>output</code>. In <code>C3</code>: none. In <code>C2</code>: found. So <code>C2.output</code> runs, with <code>self</code> being <code>a</code>, and prints <code>a</code>'s <code>f</code>, which is 4. (Pick “a = C4(); a.output()” in Demo 6.)</p>`)}
        ${callout("pitfall", "PITFALL", `<p><b>“The method that runs is the one in the class where the call is written.”</b> It is not. Inside a method, <code>self.m()</code> starts the search at <code>type(self)</code>, the class of the actual object, not at the class whose code you are reading.</p>`)}` },
      { id: "students", title: "Dynamic binding inside a method", html: `
        <p>The slides' next example shows this:</p>
        ${codeBlock(CODE.student)}
        ${codeBlock("Student\nGraduate Student", "out")}
        <p><code>print_student</code> is written in <code>Student</code>, and <code>GraduateStudent</code> inherits it. When <code>b.print_student()</code> runs, <code>self</code> is <code>b</code>, a <code>GraduateStudent</code>. So <code>self.__str__()</code> starts the search at <code>GraduateStudent</code>, finds its <code>__str__</code> there, and prints <code>Graduate Student</code>. A method written in the superclass called a method of the subclass.</p>
        ${predict(`The two programs differ only in the name of one method: <code>get_info</code> on the first, the private <code>__get_info</code> on the second. What does each print?${codeBlock(CODE.personPublic)}${codeBlock(CODE.personPrivate)}`,
          `<p>The first prints <code>Person</code> then <code>Student</code>: dynamic binding, as with <code>GraduateStudent</code>. The second prints <code>Person</code> twice:</p>${codeBlock("Person\nPerson", "out")}<p>Name mangling happens when the code is <em>written</em>, not when it runs. Inside <code>Person</code>, <code>self.__get_info()</code> is really <code>self._Person__get_info()</code>, and in <code>Student</code>, the method is really <code>_Student__get_info</code>. The two names differ, so <code>Student</code>'s method does not override <code>Person</code>'s, and the lookup for <code>_Person__get_info</code> finds it in <code>Person</code>. Private methods cannot be overridden. (Both are scenarios in Demo 6.)</p>`)}` },
    ],
    takeaways: ["Polymorphism: a subclass object fits a superclass parameter.", "Lookup: own attributes, then type(obj), then up to object.", "self.m() always starts at the object's class."],
  },
  {
    slug: "5-isinstance", nav: "isinstance", title: "The isinstance Function",
    subtitle: "When a function really must know the class",
    abstract: "isinstance(obj, C) is True if obj's class is C or a subclass of C. Use it to guard calls only some classes support; prefer overriding when you can.",
    tags: ["isinstance vs type", "most specific first", "fruit family"],
    hero: "code:displayObject2", heroCaption: "isinstance guards the class-specific calls.",
    sections: [
      { id: "video", title: "Watch: isinstance and multiple inheritance", html: `
        <p>The last video covers this chapter and the next: <code>isinstance</code>, the fruit family, the <code>Course</code> class, and classes with two superclasses.</p>
        <div class="card video" data-video="${VIDEO_P4}"></div>` },
      { id: "need", title: "When one function needs to know the class", html: `
        <p>Suppose <code>display_object</code> should print the area and perimeter of any geometric object, and also the diameter of a circle, or the width and height of a rectangle. A first try:</p>
        ${codeBlock(`def display_object(g):
    print("Area is", g.get_area())
    print("Perimeter is", g.get_perimeter())
    print("Diameter is", g.get_diameter())
    print("Width is", g.get_width())
    print("Height is", g.get_height())`)}
        <p>This fails for every shape. A rectangle has no <code>get_diameter</code>, and a circle has no <code>get_width</code>:</p>
        ${codeBlock(CODE.replWidth, "repl")}
        <p><code>isinstance(obj, ClassName)</code> returns <code>True</code> if <code>obj</code> is an instance of <code>ClassName</code> <em>or of any subclass of it</em>:</p>
        ${codeBlock(`>>> c = Circle(4)\n>>> isinstance(c, Circle)\nTrue\n>>> isinstance(c, GeometricObject)\nTrue\n>>> isinstance(c, object)\nTrue\n>>> isinstance(c, Rectangle)\nFalse\n>>> type(c) == GeometricObject\nFalse`, "repl")}
        <p>Compare the last two lines. <code>type(c)</code> is exactly <code>Circle</code>, so the <code>type</code> test only matches one class. <code>isinstance</code> asks the is-a question, which is almost always the one you mean.</p>` },
      { id: "guard", title: "Checking before calling", html: `
        <p>With <code>isinstance</code> the function can check before it calls:</p>
        ${codeBlock(CODE.displayObject2 + `


def main():
    c = Circle(4)
    r = Rectangle(1, 3)
    print("Circle...")
    display_object(c)
    print("Rectangle...")
    display_object(r)


main()`)}
        ${codeBlock("Circle...\nArea is 50.26548245743669\nPerimeter is 25.132741228718345\nDiameter is 8\nRectangle...\nArea is 3\nPerimeter is 8\nWidth is 1\nHeight is 3", "out")}
        <p><code>isinstance</code> also takes a tuple of classes: <code>isinstance(x, (int, float))</code> is <code>True</code> for any number.</p>
        ${demo("polyIsinstance", "Demo 7 · display_object with isinstance", "step through it")}
        ${callout("pitfall", "PITFALL · TEST THE MOST SPECIFIC CLASS FIRST", `<p>If you later add <code>class Square(Rectangle)</code>, a square is also a <code>Rectangle</code>, so in an <code>if isinstance(g, Rectangle): … elif isinstance(g, Square): …</code> chain the <code>Square</code> branch can never run. Put subclasses before their superclasses. Better still, ask whether the branch could be a method that each class overrides (the <em>Ask the object</em> pattern): then no <code>isinstance</code> is needed at all.</p>`)}` },
      { id: "fruit", title: "The fruit family", html: `
        ${codeBlock(CODE.fruit)}
        <p>(<code>pass</code> is a statement that does nothing; a class body must contain at least one statement.)</p>
        ${predict("Answer each with yes or no. Is <code>golden_delicious</code> an instance of (a) <code>Fruit</code>, (b) <code>Orange</code>, (c) <code>Apple</code>, (d) <code>GoldenDelicious</code>, (e) <code>McIntosh</code>? Is <code>orange</code> an instance of (f) <code>Orange</code>, (g) <code>Fruit</code>, (h) <code>Apple</code>? (i) Can <code>golden_delicious</code> call <code>make_apple_cider</code>? Can <code>orange</code>? (j) Can <code>orange</code> call <code>make_orange_juice</code>? Can <code>golden_delicious</code>?",
          `${codeBlock(`>>> [isinstance(golden_delicious, k) for k in (Fruit, Orange, Apple, GoldenDelicious, McIntosh)]\n[True, False, True, True, False]\n>>> [isinstance(orange, k) for k in (Orange, Fruit, Apple)]\n[True, True, False]\n>>> golden_delicious.make_apple_cider()\n'apple cider'\n>>> orange.make_orange_juice()\n'orange juice'\n>>> orange.make_apple_cider()\nTraceback (most recent call last):\n  ...\nAttributeError: 'Orange' object has no attribute 'make_apple_cider'`, "repl")}<p>An object is an instance of every class on the path from its own class up to <code>object</code>, and of no other class. A method can be called if it is defined in one of those classes: <code>golden_delicious</code> can make cider (found in <code>Apple</code>) but not orange juice; <code>orange</code> can make juice but not cider.</p>`)}
        ${demo("fruit", "Demo 8 · Walk up the fruit tree", "pick an object and a question", "<code>isinstance</code> and method calls use the same path: from the object's class up to <code>object</code>. Sibling classes such as <code>McIntosh</code> are never on it.")}` },
    ],
    takeaways: ["isinstance counts subclasses; type(x) == C does not.", "Guard class-specific calls; most specific class first.", "Prefer an overridden method to an isinstance ladder."],
  },
  {
    slug: "6-multiple", nav: "Multiple", title: "Has-a and Multiple Inheritance",
    subtitle: "A class that uses objects, and a class with two superclasses",
    abstract: "A Course has students: that is a data field, not inheritance. A class can also extend two classes; then lookup goes left to right, and super() means only the next one.",
    tags: ["Course", "class C(A, B)", "super() twice"],
    hero: "code:multiSuper", heroCaption: "The slides' bug: both super() calls reach A.",
    sections: [
      { id: "course", title: "Practice: a Course class", html: `
        <p>The slides end the single-inheritance part with a practice class that <em>uses</em> objects rather than extending a class: a course <b>has</b> a list of students (a has-a relationship, Chapter 1).</p>
        ${codeBlock(`class Course:
    def __init__(self, course_name):
        self.__course_name = course_name
        self.__students = []

    def add_student(self, student):
        self.__students.append(student)

    def get_students(self):
        return self.__students

    def get_number_of_students(self):
        return len(self.__students)

    def get_course_name(self):
        return self.__course_name


def main():
    course1 = Course("Data Structures")
    course2 = Course("Database Systems")

    course1.add_student("Peter Jones")
    course1.add_student("Brian Smith")
    course1.add_student("Anne Kennedy")

    course2.add_student("Peter Jones")
    course2.add_student("Steve Smith")

    print("Number of students in course1:", course1.get_number_of_students())
    students = course1.get_students()
    print(", ".join(students))

    print("Number of students in course2:", course2.get_number_of_students())


main()`)}
        ${codeBlock("Number of students in course1: 3\nPeter Jones, Brian Smith, Anne Kennedy\nNumber of students in course2: 2", "out")}
        ${callout("note", "NOTE", `<p>The slide prints the names with <code>print(student, end=", ")</code> in a loop, which leaves a trailing <code>", "</code>; <code>", ".join(students)</code> puts the separator only <em>between</em> names. The slide's <code>dropStudent(student)</code> is also missing <code>self</code>, and its body is “left as an exercise”: that is Exercise 4.</p>`)}` },
      { id: "multiple", title: "A class with two superclasses", html: `
        <p>A class can extend more than one class. This is <b>multiple inheritance</b>: the new class inherits the attributes and methods of all its superclasses. The superclasses are listed in the brackets, separated by commas. Each superclass can in turn have its own superclasses, so the classes form a tree (more exactly, a graph with <code>object</code> at the top).</p>
        ${codeBlock(CODE.multi)}
        ${codeBlock("1\n3\n2", "out")}
        <p><code>C.__init__</code> calls each superclass's <code>__init__</code> <em>by name</em>, passing <code>self</code> explicitly: <code>A.__init__(self, a)</code> sets <code>a</code>, and <code>B.__init__(self, b)</code> sets <code>b</code>. Calling a method through the class name like this is the long form of what <code>super()</code> does for you.</p>
        <p>The lookup order for a class with several superclasses is: the class itself, then its superclasses from <em>left to right</em>, then <code>object</code>:</p>
        ${codeBlock(`>>> [k.__name__ for k in C.__mro__]\n['C', 'A', 'B', 'object']`, "repl")}
        ${demo("multi", "Demo 9 · Two superclasses, one object", "pick a version, then step", "The strip on top is <code>C</code>'s lookup order; the highlighted class is the one whose <code>__init__</code> is running.")}` },
      { id: "twice", title: "super() twice", html: `
        ${callout("pitfall", "PITFALL · super() TWICE DOES NOT MEAN “BOTH SUPERCLASSES”", `<p>The slides also show this version:</p>${codeBlock(`class C(A, B):
    def __init__(self, a, b, c=300):
        super().__init__(a)
        super().__init__(b)
        self.c = c`)}<p><code>super()</code> means “the next class after <code>C</code> in the lookup order”, which is <code>A</code>, both times. So <code>A.__init__</code> runs twice, the second time overwriting <code>a</code> with <code>b</code>'s value, and <code>B.__init__</code> never runs:</p>${codeBlock(`>>> c = C(1, 2, 3)\n>>> c.a, c.c\n(2, 3)\n>>> c.b\nTraceback (most recent call last):\n  ...\nAttributeError: 'C' object has no attribute 'b'`, "repl")}<p>With multiple inheritance, call each superclass's <code>__init__</code> by name, as in the first version. (Second version of Demo 9.)</p>`)}
        <p>Multiple inheritance is powerful but easy to tangle. In this course, and in most code you will read, single inheritance is far more common. When two classes are related by has-a rather than is-a, a data field is the simpler design.</p>` },
    ],
    takeaways: ["Has-a → a data field, not inheritance.", "class C(A, B): lookup C → A → B → object.", "Two superclasses: call each __init__ by name."],
  },
  {
    slug: "7-summary", nav: "Summary", title: "Summary and Practice",
    subtitle: "Check yourself, then build some class hierarchies",
    abstract: "A one-page map of the lecture, six self-check questions, seven exercises with solutions, and a checklist for class code an AI writes for you.",
    tags: ["knowledge map", "self-check", "exercises"],
    hero: "toc",
    sections: [
      { id: "map", title: "Knowledge map", html: `<div class="map">
        <div class="card"><h3>Inheritance</h3><ul><li><code>class Sub(Super):</code></li><li>Subclass inherits every method, adds its own</li><li>Models <b>is-a</b>; has-a is a data field</li></ul></div>
        <div class="card"><h3>super().__init__</h3><ul><li>First line of a subclass <code>__init__</code></li><li>One object; both initializers set fields on it</li><li>Forgetting it → <code>AttributeError</code> later</li></ul></div>
        <div class="card"><h3>Overriding</h3><ul><li>Same name in the subclass replaces the inherited method</li><li><code>super().m()</code> reaches the superclass version</li><li>Private <code>__m</code> cannot be overridden</li></ul></div>
        <div class="card"><h3>object</h3><ul><li>Superclass of every class</li><li><code>__str__</code>: override for useful printing</li><li><code>__new__</code> makes, <code>__init__</code> fills in</li><li><code>__eq__</code>: identity until overridden</li></ul></div>
        <div class="card"><h3>Lookup and polymorphism</h3><ul><li>Own attributes → <code>type(obj)</code> → superclasses → <code>object</code></li><li>First match wins (<code>__mro__</code>)</li><li>Chosen when the call runs: <b>dynamic binding</b></li></ul></div>
        <div class="card"><h3>isinstance and multiple inheritance</h3><ul><li><code>isinstance</code> counts subclasses</li><li>Most specific class first</li><li><code>class C(A, B)</code>: C → A → B → object</li></ul></div></div>` },
      { id: "check", title: "Check your understanding", html: `<div data-demo="quiz"><div class="demo-body"></div></div>` },
      { id: "exercises", title: "Exercises", html: `
        <p>★ trace or modify · ★★ write · ★★★ extend or combine. Test each class on a small object first, and print it to check <code>__str__</code>.</p>
        <h3>Exercise 1 ★ (trace)</h3>
        <p>For each call, say which class's method runs and what is printed. Use the lookup rule: start at the object's own class and go up.</p>
        ${codeBlock(`class Animal:
    def speak(self):
        return "..."

    def introduce(self):
        return "I say " + self.speak()


class Dog(Animal):
    def speak(self):
        return "Woof"


class Puppy(Dog):
    def introduce(self):
        return "Puppy here. " + super().introduce()`)}
        <p>(a) <code>Animal().introduce()</code> (b) <code>Dog().introduce()</code> (c) <code>Puppy().introduce()</code></p>
        <details class="reveal"><summary>Solution</summary><p>(a) <code>Animal.introduce</code>, then <code>Animal.speak</code>: <code>I say ...</code>. (b) <code>introduce</code> is found in <code>Animal</code>; inside it <code>self.speak()</code> starts at <code>Dog</code> and finds <code>Dog.speak</code>: <code>I say Woof</code>. (c) <code>Puppy.introduce</code> runs; <code>super().introduce()</code> runs <code>Animal.introduce</code> (the next one up that has it) with <code>self</code> still the puppy, so <code>self.speak()</code> starts at <code>Puppy</code> and finds <code>Dog.speak</code>.</p>
        ${codeBlock(`>>> Animal().introduce()\n'I say ...'\n>>> Dog().introduce()\n'I say Woof'\n>>> Puppy().introduce()\n'Puppy here. I say Woof'`, "repl")}</details>
        <h3>Exercise 2 ★ (find the bug)</h3>
        <p>The slides' <code>Rectangle</code> had this method. What is wrong, and what does the program below print with it?</p>
        ${codeBlock(`def set_height(self, height):
    self.__height = self.__height`)}${codeBlock(`r = Rectangle(2, 4)
r.set_height(10)
print(r.get_area())`)}
        <details class="reveal"><summary>Solution</summary><p>It assigns the old height to itself and never uses the parameter <code>height</code>, so the height stays 4 and the program prints <code>8</code> instead of <code>20</code>. The fix is <code>self.__height = height</code>, as in the notes:</p>
        ${codeBlock(`>>> r = Rectangle(2, 4)\n>>> r.set_height(10)\n>>> r.get_area()\n20`, "repl")}</details>
        <h3>Exercise 3 ★★</h3>
        <p>Write a class <code>Square</code> that extends <code>Rectangle</code>. <code>Square(side)</code> makes a square with that side; it should call <code>super().__init__</code> and need no other method. Is a <code>Square</code> an instance of <code>Rectangle</code>? Of <code>GeometricObject</code>?</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`class Square(Rectangle):
    def __init__(self, side, color="green", filled=True):
        super().__init__(side, side, color, filled)`)}${codeBlock(`>>> s = Square(3)\n>>> s.get_area(), s.get_perimeter()\n(9, 12)\n>>> print(s)\ncolor: green and filled: True width: 3 height: 3\n>>> isinstance(s, Rectangle), isinstance(s, GeometricObject)\n(True, True)`, "repl")}
        <p>Every method, including <code>__str__</code>, is inherited from <code>Rectangle</code>. (A square whose <code>set_width</code> changes only the width is no longer a square; making <code>Square</code> override the setters is a good extra exercise.)</p></details>
        <h3>Exercise 4 ★★</h3>
        <p>Add the method <code>drop_student(self, student)</code> to <code>Course</code>. It removes <code>student</code> from the course if they are enrolled, and does nothing otherwise.</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`class Course:
    def __init__(self, course_name):
        self.__course_name = course_name
        self.__students = []

    def add_student(self, student):
        self.__students.append(student)

    def drop_student(self, student):
        if student in self.__students:
            self.__students.remove(student)

    def get_students(self):
        return self.__students

    def get_number_of_students(self):
        return len(self.__students)

    def get_course_name(self):
        return self.__course_name`)}${codeBlock(`>>> course = Course("Data Structures")\n>>> course.add_student("Peter Jones")\n>>> course.add_student("Brian Smith")\n>>> course.drop_student("Peter Jones")\n>>> course.drop_student("Nobody")\n>>> course.get_students()\n['Brian Smith']`, "repl")}</details>
        <h3>Exercise 5 ★★</h3>
        <p>Write a class <code>Triangle</code> that extends <code>GeometricObject</code>, with three sides (default 1.0 each), <code>get_area</code> (use Heron's formula: with <span class="math">s</span> half the perimeter, the area is √(s(s−a)(s−b)(s−c))), <code>get_perimeter</code>, and a <code>__str__</code> that adds the three sides to the superclass's description. Then check that <code>display_object</code> from Chapter 4 and <code>total_area</code> work for triangles without any change.</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`class Triangle(GeometricObject):
    def __init__(self, side1=1.0, side2=1.0, side3=1.0, color="green", filled=True):
        super().__init__(color, filled)
        self.__side1 = side1
        self.__side2 = side2
        self.__side3 = side3

    def get_perimeter(self):
        return self.__side1 + self.__side2 + self.__side3

    def get_area(self):
        s = self.get_perimeter() / 2
        return math.sqrt(s * (s - self.__side1) * (s - self.__side2) * (s - self.__side3))

    def __str__(self):
        return (super().__str__() + " sides: " + str(self.__side1) + ", "
                + str(self.__side2) + ", " + str(self.__side3))`)}${codeBlock(`>>> t = Triangle(3, 4, 5)\n>>> t.get_area(), t.get_perimeter()\n(6.0, 12)\n>>> print(t)\ncolor: green and filled: True sides: 3, 4, 5\n>>> total_area([t, Rectangle(2, 4)])\n14.0`, "repl")}
        <p><code>total_area</code> only calls <code>get_area</code>, which every shape has, so it needs no change. (The <code>isinstance</code> version of <code>display_object</code> prints a triangle's area and perimeter, and skips the two branches.)</p></details>
        <h3>Exercise 6 ★★★</h3>
        <p>A company pays employees a monthly salary; a manager also gets a bonus. Write <code>Employee(name, salary)</code> with <code>pay()</code> returning the salary and a <code>__str__</code> like <code>Ada: 9000</code>, and <code>Manager(Employee)</code> with an extra <code>bonus</code> whose <code>pay()</code> returns salary plus bonus, using <code>super().pay()</code>. Then write <code>payroll(staff)</code> that returns the total paid to a list of employees and managers.</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def pay(self):
        return self.salary

    def __str__(self):
        return self.name + ": " + str(self.pay())


class Manager(Employee):
    def __init__(self, name, salary, bonus):
        super().__init__(name, salary)
        self.bonus = bonus

    def pay(self):
        return super().pay() + self.bonus


def payroll(staff):
    total = 0
    for person in staff:
        total += person.pay()
    return total`)}${codeBlock(`>>> staff = [Employee("Ada", 9000), Manager("Lin", 12000, 3000), Employee("Bo", 8000)]\n>>> for person in staff:\n...     print(person)\n...\nAda: 9000\nLin: 15000\nBo: 8000\n>>> payroll(staff)\n32000`, "repl")}
        <p><code>Employee.__str__</code> calls <code>self.pay()</code>, which for a manager finds <code>Manager.pay</code>: the inherited <code>__str__</code> prints the right amount without being overridden.</p></details>
        <h3>Exercise 7 ★★★</h3>
        <p>Override <code>__eq__</code> in a subclass <code>ComparableCircle(Circle)</code> so that two circles are equal when their radii are equal. Then use <code>in</code> to check whether a list of circles contains a circle of radius 2. Why must the method use <code>get_radius()</code> and not <code>self.__radius</code>?</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(`class ComparableCircle(Circle):
    def __eq__(self, other):
        return isinstance(other, Circle) and self.get_radius() == other.get_radius()`)}${codeBlock(`>>> ComparableCircle(2) == ComparableCircle(2)\nTrue\n>>> ComparableCircle(2) in [ComparableCircle(1), ComparableCircle(2)]\nTrue\n>>> ComparableCircle(2) == Rectangle(2, 2)\nFalse`, "repl")}
        <p>Inside <code>ComparableCircle</code>, <code>self.__radius</code> would be mangled to <code>self._ComparableCircle__radius</code>, which does not exist: the field was created by <code>Circle.__init__</code> as <code>_Circle__radius</code>. The public getter works from any class.</p></details>` },
      { id: "ai", title: "Working with AI", html: `
        <p>AI assistants write class hierarchies quickly, and often too eagerly: a new class for every noun, deep chains of subclasses, and <code>isinstance</code> ladders. Check any class code, yours or an AI's, with this lecture's tools:</p>
        <ol><li><b>Say the is-a sentence</b> for every <code>class X(Y)</code>. “Every X is a Y.” If it is false, ask for a has-a design (a data field) instead.</li>
        <li><b>Check every subclass <code>__init__</code></b> calls <code>super().__init__(...)</code> with the right arguments.</li>
        <li><b>Walk the lookup</b> for one call per class: which class's method runs? Try it with <code>[k.__name__ for k in X.__mro__]</code>.</li>
        <li><b>Look for <code>isinstance</code> ladders.</b> Ask: <em>“Could this be a method each subclass overrides instead?”</em></li>
        <li><b>Print one object of every class</b>, to check each <code>__str__</code>, and compare two equal objects with <code>==</code>.</li></ol>
        <p>Try this: ask an assistant for “classes for a zoo with animals that make sounds”. Count the classes, say the is-a sentence for each, and check whether a function that makes every animal speak needs an <code>isinstance</code> anywhere. If it does, ask the assistant to remove it with overriding, and check the result again.</p>` },
      { id: "terms", title: "Key terms and further reading", html: `
        <p class="tags">${["inheritance", "superclass (parent, base)", "subclass (child, derived)", "extend", "super()", "is-a", "has-a", "name mangling", "method overriding", "object", "__str__", "__new__", "__eq__", "polymorphism", "dynamic binding", "method lookup", "__mro__", "isinstance", "multiple inheritance"].map((t) => `<span class="tag">${t}</span>`).join("")}</p>
        <ul><li>Y. D. Liang, <em>Introduction to Programming Using Python</em>, Pearson 2013, Chapter 12 (Inheritance and Polymorphism). The geometric objects, the <code>C1</code>–<code>C4</code> chain, the fruit questions and the <code>Course</code> class follow this chapter.</li>
        <li>J. DeNero, <em>Composing Programs</em>, §2.5.5 Inheritance, §2.5.6 Using Inheritance and §2.5.7 Multiple Inheritance. <a href="https://www.composingprograms.com/pages/25-object-oriented-programming.html" target="_blank" rel="noopener">composingprograms.com</a></li>
        <li>C. Severance, <em>Python for Everybody</em>, Chapter 14 (Object-oriented programming), section on inheritance. <a href="https://www.py4e.com/html3/14-objects" target="_blank" rel="noopener">py4e.com</a></li>
        <li>The Python Tutorial, §9.5 Inheritance and §9.6 Private Variables. <a href="https://docs.python.org/3/tutorial/classes.html#inheritance" target="_blank" rel="noopener">docs.python.org</a></li></ul>` },
    ],
    takeaways: ["Subclass + super().__init__.", "Override; reach up with super().", "Lookup from type(obj) up: dynamic binding."],
  },
];

const QUIZ = [
  { q: "In <code>class Circle(GeometricObject):</code>, which is the superclass, and which class has more methods?",
    opts: ["<code>Circle</code> is the superclass; <code>GeometricObject</code> has more", "<code>GeometricObject</code> is the superclass; <code>Circle</code> has more", "<code>GeometricObject</code> is the superclass; they have the same methods", "<code>object</code> is the superclass of <code>Circle</code>; <code>Circle</code> has fewer"],
    a: 1, why: "<code>GeometricObject</code> is the superclass, <code>Circle</code> the subclass. <code>Circle</code> has more: all the methods of <code>GeometricObject</code> plus its own." },
  { q: "A subclass <code>__init__</code> forgets to call <code>super().__init__(...)</code>. When does the error appear?",
    opts: ["When the class is defined: <code>SyntaxError</code>", "When the object is created: <code>TypeError</code>", "Later, when an inherited method uses a field the superclass would have created: <code>AttributeError</code>", "Never: Python calls the superclass <code>__init__</code> automatically"],
    a: 2, why: "Not in <code>__init__</code> itself, but later, when an inherited method uses a field that the superclass's <code>__init__</code> would have created: an <code>AttributeError</code>." },
  { q: "Inside an overriding <code>__str__</code>, what does <code>super().__str__()</code> do?",
    opts: ["Calls the same override again (recursion)", "Runs the superclass's version of <code>__str__</code> on the same object, so the override can build on it", "Creates a superclass object and prints it", "Removes the override"],
    a: 1, why: "Overriding defines a new <code>__str__</code> that replaces the inherited one. <code>super().__str__()</code>, called inside it, runs the superclass's version so the new one can build on it." },
  { q: "With <code>C1</code>–<code>C4</code> from Chapter 4, <code>class D(C4): pass</code> and <code>d = D()</code>. What does <code>d.output()</code> print?",
    opts: ["<code>In C1, the f is: 1</code>", "<code>In C2, the f is: 2</code>", "<code>In C2, the f is: 4</code>", "<code>AttributeError</code>"],
    a: 2, why: "<code>D</code> has no <code>__init__</code>, so lookup finds <code>C4.__init__</code>: <code>d.f</code> is 4, and <code>d.output()</code> finds <code>output</code> in <code>C2</code> and prints <code>In C2, the f is: 4</code>." },
  { q: "Why is <code>isinstance(Circle(1), GeometricObject)</code> <code>True</code> while <code>type(Circle(1)) == GeometricObject</code> is <code>False</code>?",
    opts: ["<code>isinstance</code> asks “is it a …?” and counts subclasses; <code>type(x)</code> is exactly the class the object was made from", "<code>type</code> is broken for subclasses", "<code>isinstance</code> only looks at the object's attributes", "Because <code>Circle</code> overrides <code>__eq__</code>"],
    a: 0, why: "<code>isinstance</code> asks “is it a …?” and counts subclasses; <code>type(x)</code> is exactly the class the object was made from, <code>Circle</code>." },
  { q: "Two <code>Point</code> objects with the same coordinates compare as <code>False</code> with <code>==</code>. What makes them compare equal?",
    opts: ["Use <code>is</code> instead of <code>==</code>", "Override <code>__str__</code> in <code>Point</code>", "Override <code>__eq__</code> in <code>Point</code>", "Call <code>super().__init__()</code> in <code>Point</code>"],
    a: 2, why: "The inherited <code>object.__eq__</code> compares identity. Override <code>__eq__</code> in <code>Point</code> to compare the fields." },
];
