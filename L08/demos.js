// Interactive demos. Every code panel is copied from notes/L08-inheritance.md (checked by
// tools/check.py); the JS below replays what Python does, step by step. Where a panel
// shows only part of a class, the omitted lines are marked "...".

const CODE = {
  geometric: `class GeometricObject:
    def __init__(self, color="green", filled=True):
        self.__color = color
        self.__filled = filled

    def get_color(self):
        return self.__color

    def set_color(self, color):
        self.__color = color

    def is_filled(self):
        return self.__filled

    def set_filled(self, filled):
        self.__filled = filled

    def __str__(self):
        return "color: " + self.__color + " and filled: " + str(self.__filled)`,
  circle1: `import math


class Circle(GeometricObject):
    def __init__(self, radius, color="green", filled=True):
        super().__init__(color, filled)    # GeometricObject sets up color and filled
        self.__radius = radius             # then Circle adds its own field

    def get_radius(self):
        return self.__radius

    def set_radius(self, radius):
        self.__radius = radius

    def get_area(self):
        return self.__radius * self.__radius * math.pi

    def get_diameter(self):
        return 2 * self.__radius

    def get_perimeter(self):
        return 2 * self.__radius * math.pi

    def print_circle(self):
        print(self.__str__() + " radius: " + str(self.__radius))`,
  circleStr: `class Circle(GeometricObject):
    def __init__(self, radius, color="green", filled=True):
        super().__init__(color, filled)
        self.__radius = radius

    def get_radius(self):
        return self.__radius

    def set_radius(self, radius):
        self.__radius = radius

    def get_area(self):
        return self.__radius * self.__radius * math.pi

    def get_diameter(self):
        return 2 * self.__radius

    def get_perimeter(self):
        return 2 * self.__radius * math.pi

    def __str__(self):                     # overrides GeometricObject.__str__
        return super().__str__() + " radius: " + str(self.__radius)`,
  // Excerpts (the note's GeometricObject and Circle blocks) for the constructor demo.
  construct: `class GeometricObject:
    def __init__(self, color="green", filled=True):
        self.__color = color
        self.__filled = filled
    ...


class Circle(GeometricObject):
    def __init__(self, radius, color="green", filled=True):
        super().__init__(color, filled)    # GeometricObject sets up color and filled
        self.__radius = radius             # then Circle adds its own field
    ...`,
  silent: `class GeometricObject:
    def __init__(self, color="green", filled=True):
        self.__color = color
        self.__filled = filled

    def get_color(self):
        return self.__color
    ...


class SilentCircle(GeometricObject):
    def __init__(self, radius):
        self.__radius = radius             # forgot super().__init__()`,
  strChain: `class GeometricObject:
    ...
    def __str__(self):
        return "color: " + self.__color + " and filled: " + str(self.__filled)


class Circle(GeometricObject):
    ...
    def __str__(self):                     # overrides GeometricObject.__str__
        return super().__str__() + " radius: " + str(self.__radius)


class Rectangle(GeometricObject):
    ...
    def __str__(self):
        return (super().__str__() + " width: " + str(self.__width)
                + " height: " + str(self.__height))`,
  replCircle: `>>> c = Circle(1.5)
>>> c.get_color()          # inherited from GeometricObject
'green'
>>> c.set_color("blue")    # inherited
>>> c.get_radius()         # defined in Circle
1.5
>>> c.print_circle()       # calls the inherited __str__
color: blue and filled: True radius: 1.5`,
  replWidth: `>>> Circle(4).get_width()
Traceback (most recent call last):
  ...
AttributeError: 'Circle' object has no attribute 'get_width'`,
  chain: `class C1:
    def __init__(self):
        self.f = 1

    def output(self):
        print("In C1, the f is:", self.f)


class C2(C1):
    def __init__(self):
        self.f = 2

    def output(self):
        print("In C2, the f is:", self.f)


class C3(C2):
    def __init__(self):
        self.f = 3


class C4(C3):
    def __init__(self):
        self.f = 4`,
  chainRun: `a = C4()
print(a.f)
a.output()`,
  student: `class Student:
    def __str__(self):
        return "Student"

    def print_student(self):
        print(self.__str__())


class GraduateStudent(Student):
    def __str__(self):
        return "Graduate Student"


a = Student()
b = GraduateStudent()
a.print_student()
b.print_student()`,
  personPublic: `class Person:
    def get_info(self):
        return "Person"

    def print_person(self):
        print(self.get_info())


class Student(Person):
    def get_info(self):
        return "Student"


Person().print_person()
Student().print_person()`,
  personPrivate: `class Person:
    def __get_info(self):
        return "Person"

    def print_person(self):
        print(self.__get_info())


class Student(Person):
    def __get_info(self):
        return "Student"


Person().print_person()
Student().print_person()`,
  displayObject: `def display_object(g):
    print(g)`,
  totalArea: `def total_area(shapes):
    total = 0
    for shape in shapes:
        total += shape.get_area()       # each shape uses its own get_area
    return total`,
  displayObject2: `def display_object(g):
    print("Area is", g.get_area())
    print("Perimeter is", g.get_perimeter())

    if isinstance(g, Circle):
        print("Diameter is", g.get_diameter())
    elif isinstance(g, Rectangle):
        print("Width is", g.get_width())
        print("Height is", g.get_height())`,
  fruit: `class Fruit:
    pass


class Apple(Fruit):
    def make_apple_cider(self):
        return "apple cider"


class Orange(Fruit):
    def make_orange_juice(self):
        return "orange juice"


class GoldenDelicious(Apple):
    pass


class McIntosh(Apple):
    pass


golden_delicious = GoldenDelicious()
orange = Orange()`,
  loud: `class Loud:
    def __new__(cls):
        print("Loud's __new__() invoked")
        return super().__new__(cls)

    def __init__(self):
        print("Loud's __init__() invoked")


loud = Loud()`,
  newNone: `class A:
    def __new__(self):
        print("A's __new__() invoked")

    def __init__(self):
        print("A's __init__() invoked")


a = A()`,
  point: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y`,
  pointEq: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return isinstance(other, Point) and self.x == other.x and self.y == other.y`,
  multi: `class A:
    def __init__(self, a=100):
        self.a = a


class B:
    def __init__(self, b=200):
        self.b = b


class C(A, B):
    def __init__(self, a, b, c=300):
        A.__init__(self, a)
        B.__init__(self, b)
        self.c = c

    def output(self):
        print(self.a)
        print(self.c)
        print(self.b)


def main():
    c = C(1, 2, 3)
    c.output()


main()`,
  // The note's A and B (above) followed by its pitfall version of C.
  multiSuper: `class A:
    def __init__(self, a=100):
        self.a = a


class B:
    def __init__(self, b=200):
        self.b = b


class C(A, B):
    def __init__(self, a, b, c=300):
        super().__init__(a)
        super().__init__(b)
        self.c = c`,
};

// ---------- shared helpers ----------

// Python's str() of a number: floats always show a decimal point.
const pyNum = (v, isFloat) => (isFloat && Number.isInteger(v) ? v.toFixed(1) : String(v));

// An object drawn as one box of attributes. attrs: [[name, value]], fresh: name to flash.
function objHTML(o, fresh = null, missing = null) {
  if (!o) return "";
  const rows = o.attrs.length
    ? o.attrs.map(([k, v]) => `<div class="ob-row${k === fresh ? " fresh" : ""}"><span>${esc(k)}</span><b>${esc(v)}</b></div>`).join("")
    : `<div class="ob-row empty">(no attributes yet)</div>`;
  return `<div class="ob"><div class="ob-head"><b>${esc(o.name)}</b><span>${esc(o.cls)} object</span></div>${rows}
    ${missing ? `<div class="ob-row miss"><span>${esc(missing)}</span><b>?</b></div>` : ""}</div>`;
}

// A generic step player: build() -> snaps, render(snap) -> html. Same controls as makeStepper.
function makePlayer(el, opts) {
  const mini = !!opts.mini;
  el.innerHTML = `<div class="pl-view"></div>
    ${mini ? "" : `<div class="msg pl-msg"></div><div class="controls">
      <button class="cbtn pl-reset">⟲ Reset</button><button class="cbtn pl-back">◀ Back</button>
      <button class="cbtn pl-step on">Step ▶</button><button class="cbtn pl-play">Play</button>
      ${opts.extraControls || ""}<span class="spacer"></span><span class="counter pl-count"></span></div>`}`;
  const $ = (q) => el.querySelector(q);
  let snaps = [], i = 0, timer = null;
  function render() {
    const s = snaps[i];
    $(".pl-view").innerHTML = opts.render(s, mini);
    if (mini) return;
    $(".pl-msg").innerHTML = s.msg || "";
    $(".pl-msg").className = "msg pl-msg " + (s.msgCls || "");
    $(".pl-count").textContent = `step ${i + 1} / ${snaps.length}`;
    $(".pl-back").disabled = $(".pl-reset").disabled = i === 0;
    $(".pl-step").disabled = i === snaps.length - 1;
  }
  function stop() { clearInterval(timer); timer = null; if (!mini) $(".pl-play").textContent = "Play"; }
  function play() {
    if (timer) return stop();
    if (i === snaps.length - 1) i = 0;
    if (!mini) $(".pl-play").textContent = "Pause";
    timer = setInterval(() => {
      if (i < snaps.length - 1) i++; else if (mini) i = 0; else return stop();
      render();
    }, mini ? 1100 : 800);
  }
  function rebuild() { stop(); snaps = opts.build(); i = 0; render(); }
  if (!mini) {
    $(".pl-reset").onclick = () => { stop(); i = 0; render(); };
    $(".pl-back").onclick = () => { stop(); if (i) i--; render(); };
    $(".pl-step").onclick = () => { stop(); if (i < snaps.length - 1) i++; render(); };
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
  return { rebuild };
}

// ---------- the method-lookup walker ----------

// Classes as the note defines them: superclass and the names defined in the class body.
const LK = {
  object: { base: null, names: ["__init__", "__new__", "__str__", "__eq__"], more: true },
  GeometricObject: { base: "object", names: ["__init__", "get_color", "set_color", "is_filled", "set_filled", "__str__"] },
  Circle: { base: "GeometricObject", names: ["__init__", "get_radius", "set_radius", "get_area", "get_diameter", "get_perimeter", "print_circle"] },
  C1: { base: "object", names: ["__init__", "output"] },
  C2: { base: "C1", names: ["__init__", "output"] },
  C3: { base: "C2", names: ["__init__"] },
  C4: { base: "C3", names: ["__init__"] },
  Student: { base: "object", names: ["__str__", "print_student"] },
  GraduateStudent: { base: "Student", names: ["__str__"] },
  Person: { base: "object", names: ["get_info", "print_person"] },
  "Student(Person)": { show: "Student", base: "Person", names: ["get_info"] },
  "Person ": { show: "Person", base: "object", names: ["_Person__get_info", "print_person"] },
  "Student(Person) ": { show: "Student", base: "Person ", names: ["_Student__get_info"] },
};
const lkName = (k) => LK[k].show || k;
function lkChain(cls) { const c = []; for (let k = cls; k; k = LK[k].base) c.push(k); return c; }

// Records the walker's snapshots. A snapshot shows one object, its class chain, which
// classes have been searched, and where the name was found.
class Walk {
  constructor() { this.snaps = []; this.out = []; this.obj = null; this.line = 0; }
  setObj(o) { this.obj = o; }
  snap(msg, st = {}) {
    this.snaps.push({ msg, line: this.line, obj: this.obj && { ...this.obj, attrs: this.obj.attrs.map((a) => a.slice()) },
      out: this.out.slice(), ...st });
  }
  // Look up `name` on the current object; start after class `after` (for super()).
  lookup(name, { after = null, expr = name, attr = false } = {}) {
    const chain = lkChain(this.obj.cls);
    const base = { name, expr, searched: [] };
    if (!after) {
      const own = this.obj.attrs.find(([k]) => k === name);
      this.snap(own
        ? `<code>${esc(expr)}</code>: <code>${esc(name)}</code> is one of the object's <b>own attributes</b>. Found; the search stops.`
        : `<code>${esc(expr)}</code>: is <code>${esc(name)}</code> among the object's own attributes? No${attr ? "" : " (methods live in classes)"}. Go to its class.`,
      { ...base, at: "obj", hitAttr: own ? name : null, msgCls: own ? "good" : "" });
      if (own) return { attr: own };
    }
    let k0 = after ? chain.indexOf(after) + 1 : 0;
    for (let k = k0; k < chain.length; k++) {
      const c = chain[k];
      const hit = LK[c].names.includes(name);
      base.searched = chain.slice(k0, k);
      this.snap(hit
        ? `Is <code>${esc(name)}</code> in <b>${lkName(c)}</b>? <b>Yes.</b> ${after ? "(<code>super()</code> started the search above <b>" + lkName(after) + "</b>.) " : k ? "Found " + k + " level" + (k === 1 ? "" : "s") + " above the object's class. " : ""}The search stops.`
        : `Is <code>${esc(name)}</code> in <b>${lkName(c)}</b>? No. ${LK[c].base ? "Go up to its superclass, <b>" + lkName(LK[c].base) + "</b>." : ""}`,
      { ...base, at: c, hit: hit ? c : null, msgCls: hit ? "good" : "" });
      if (hit) return { cls: c };
    }
    base.searched = chain.slice(k0);
    this.snap(`Not in <b>object</b> either, and <b>object</b> is the end of the chain: <code>AttributeError: '${lkName(this.obj.cls)}' object has no attribute '${esc(name)}'</code>`,
      { ...base, at: null, err: true, msgCls: "bad" });
    return null;
  }
}

function walkerScenarioCircle() {
  const w = new Walk();
  const obj = { name: "c", cls: "Circle", attrs: [] };
  w.line = 1; w.setObj(obj);
  w.snap("<code>c = Circle(1.5)</code>: Python makes one new <b>Circle</b> object. Its class chain is <b>Circle → GeometricObject → object</b>.");
  w.lookup("__init__", { expr: "Circle(1.5)" });
  obj.attrs = [["_GeometricObject__color", "'green'"], ["_GeometricObject__filled", "True"], ["_Circle__radius", "1.5"]];
  w.snap("<code>Circle.__init__</code> runs, and its <code>super().__init__</code> lets <b>GeometricObject</b> add the two colour fields. (Demo 1 steps through this.) One object, three fields.", { at: "obj" });
  w.line = 2;
  w.lookup("get_color", { expr: "c.get_color()" });
  w.out.push("'green'");
  w.line = 3;
  w.snap("<code>GeometricObject.get_color</code> runs with <code>self</code> = <code>c</code>, and returns <code>'green'</code>. Inherited methods work as if written in <code>Circle</code>.", { at: "GeometricObject", hit: "GeometricObject", name: "get_color", msgCls: "good" });
  w.line = 4;
  w.lookup("set_color", { expr: 'c.set_color("blue")' });
  obj.attrs[0][1] = "'blue'";
  w.snap("<code>GeometricObject.set_color</code> changes the field on <b>this object</b>: <code>_GeometricObject__color</code> is now <code>'blue'</code>.", { at: "obj", fresh: "_GeometricObject__color" });
  w.line = 5;
  w.lookup("get_radius", { expr: "c.get_radius()" });
  w.out.push("1.5");
  w.line = 6;
  w.snap("Found in <b>Circle</b> itself, no climbing needed. It returns <code>1.5</code>.", { at: "Circle", hit: "Circle", name: "get_radius", msgCls: "good" });
  w.line = 7;
  w.lookup("print_circle", { expr: "c.print_circle()" });
  w.snap("Inside <code>print_circle</code>, <code>self.__str__()</code> is a new lookup. It starts again at the class of <code>self</code>, which is <b>Circle</b>.", { at: "Circle", hit: "Circle", name: "print_circle" });
  w.lookup("__str__", { expr: "self.__str__()" });
  w.out.push("color: blue and filled: True radius: 1.5");
  w.line = 8;
  w.snap("<code>GeometricObject.__str__</code> returns <code>'color: blue and filled: True'</code>; <code>print_circle</code> adds the radius and prints it.", { at: "GeometricObject", hit: "GeometricObject", name: "__str__", msgCls: "good" });
  return { code: CODE.replCircle, repl: true, snaps: w.snaps };
}

function walkerScenarioWidth() {
  const w = new Walk();
  w.line = 1;
  w.setObj({ name: "Circle(4)", cls: "Circle", attrs: [["_GeometricObject__color", "'green'"], ["_GeometricObject__filled", "True"], ["_Circle__radius", "4"]] });
  w.snap("<code>Circle(4)</code> is a circle, so it has no <code>get_width</code>: that method is in <code>Rectangle</code>, which is not on its chain. Watch the search fail.");
  w.lookup("get_width", { expr: "Circle(4).get_width()" });
  w.line = 4;
  w.out.push("AttributeError: 'Circle' object has no attribute 'get_width'");
  w.snap("This is why the first <code>display_object</code> of Chapter 5 crashes, and why it needs <code>isinstance</code>.", { at: null, err: true, name: "get_width", searched: lkChain("Circle"), msgCls: "bad" });
  return { code: CODE.replWidth, repl: true, snaps: w.snaps };
}

function walkerScenarioChain() {
  const w = new Walk();
  const obj = { name: "a", cls: "C4", attrs: [] };
  w.line = 1; w.setObj(obj);
  w.snap("<code>a = C4()</code>: a new <b>C4</b> object. Its chain is <b>C4 → C3 → C2 → C1 → object</b>.");
  w.lookup("__init__", { expr: "C4()" });
  obj.attrs = [["f", "4"]];
  w.snap("Only <code>C4.__init__</code> runs (it does not call <code>super().__init__()</code>), so <code>f</code> is 4. The other three <code>__init__</code> methods never run.", { at: "obj", fresh: "f" });
  w.line = 2;
  w.lookup("f", { expr: "a.f", attr: true });
  w.out.push("4");
  w.line = 3;
  w.lookup("output", { expr: "a.output()" });
  w.out.push("In C2, the f is: 4");
  w.snap("<code>C2.output</code> runs with <code>self</code> = <code>a</code>, and prints <b>a's</b> <code>f</code>, which is 4.", { at: "C2", hit: "C2", name: "output", msgCls: "good" });
  return { code: CODE.chainRun, snaps: w.snaps };
}

function walkerScenarioStudent() {
  const w = new Walk();
  for (const [name, cls, line, said] of [["a", "Student", 16, "Student"], ["b", "GraduateStudent", 17, "Graduate Student"]]) {
    w.line = line; w.setObj({ name, cls, attrs: [] });
    w.snap(`<code>${name}.print_student()</code>, where <code>${name}</code> is a <b>${cls}</b>.`);
    w.lookup("print_student", { expr: `${name}.print_student()` });
    w.line = 6;
    w.snap(`Inside <code>Student.print_student</code>, <code>self</code> is <code>${name}</code>. The call <code>self.__str__()</code> is a new lookup, starting at <code>type(self)</code>, <b>${cls}</b>, not at the class whose code is running.`, { at: "Student", hit: "Student", name: "print_student" });
    w.lookup("__str__", { expr: "self.__str__()" });
    w.out.push(said);
    w.snap(`So it prints <code>${said}</code>.${cls === "GraduateStudent" ? " A method written in the superclass called the subclass's method: <b>dynamic binding</b>." : ""}`, { at: cls, hit: cls, name: "__str__", msgCls: "good" });
  }
  return { code: CODE.student, snaps: w.snaps };
}

function walkerScenarioPerson(priv) {
  const w = new Walk();
  const P = priv ? "Person " : "Person", S = priv ? "Student(Person) " : "Student(Person)";
  const inner = priv ? "_Person__get_info" : "get_info";
  for (const [cls, line] of [[P, 14], [S, 15]]) {
    w.line = line; w.setObj({ name: `${lkName(cls)}()`, cls, attrs: [] });
    w.lookup("print_person", { expr: `${lkName(cls)}().print_person()` });
    w.line = 6;
    w.snap(priv
      ? "Inside <code>Person</code>, <code>self.__get_info()</code> was renamed when the class was written: it is really <code>self._Person__get_info()</code>. That is the name Python looks up."
      : "Inside <code>print_person</code>, <code>self.get_info()</code> starts a new lookup at the object's own class.", { at: P, hit: P, name: "print_person" });
    const r = w.lookup(inner, { expr: priv ? "self._Person__get_info()" : "self.get_info()" });
    const said = lkName(r.cls);
    w.out.push(said);
    w.snap(priv && cls === S
      ? "<code>Student</code>'s method is called <code>_Student__get_info</code>, a different name, so it does not override anything. Prints <code>Person</code>: private methods cannot be overridden."
      : `Prints <code>${said}</code>.`, { at: r.cls, hit: r.cls, name: inner, msgCls: "good" });
  }
  return { code: priv ? CODE.personPrivate : CODE.personPublic, snaps: w.snaps };
}

const WALKS = {
  circle: ["c = Circle(1.5) session", walkerScenarioCircle],
  width: ["Circle(4).get_width()", walkerScenarioWidth],
  chain: ["a = C4(); a.output()", walkerScenarioChain],
  student: ["print_student and dynamic binding", walkerScenarioStudent],
  person: ["Person: get_info", () => walkerScenarioPerson(false)],
  personPriv: ["Person: __get_info (private)", () => walkerScenarioPerson(true)],
};

function walkerHTML(s, mini) {
  const chain = lkChain(s.obj.cls);
  const searched = new Set(s.searched || []);
  const cards = chain.slice().reverse().map((c, k) => {
    const cls = ["lk-cls", s.at === c ? "cur" : "", s.hit === c ? "hit" : "", searched.has(c) ? "miss" : "", s.err && searched.has(c) ? "err" : ""].join(" ");
    const chips = LK[c].names.map((n) => `<span class="chip${s.hit === c && n === s.name ? " on" : ""}">${esc(n)}</span>`).join("") + (LK[c].more ? `<span class="chip">…</span>` : "");
    return (k ? `<div class="lk-up">▲ superclass</div>` : "") + `<div class="${cls}"><b>${esc(lkName(c))}</b><div class="chips">${chips}</div></div>`;
  }).join("");
  const objBox = objHTML({ ...s.obj, cls: lkName(s.obj.cls) }, s.fresh || s.hitAttr, null).replace('class="ob"', `class="ob${s.at === "obj" ? " cur" : ""}"`);
  return `<div class="lk${mini ? " mini" : ""}">
    <div class="lk-left">${mini ? "" : `<div class="lk-cap">the object</div>`}${objBox}
      ${s.name ? `<div class="lk-q">looking up <code>${esc(s.name)}</code></div>` : ""}</div>
    <div class="lk-right">${mini ? "" : `<div class="lk-cap">its class chain (search goes up ▲)</div>`}${cards}</div></div>`;
}

function demoLookup(el, { mini = false, scenario = "circle" } = {}) {
  let key = scenario, sc;
  makePlayer(el, {
    mini,
    build: () => { sc = WALKS[key][1](); return sc.snaps; },
    render: (s) => walkerHTML(s, mini) + (mini ? "" : `<div class="stepper lk-code">
        <div>${codeBlock(sc.code, sc.repl ? "repl" : "py", s.line ? [s.line] : [])}</div>
        <div><div class="counter" style="margin-bottom:4px">output</div><div class="console" style="margin-top:0">${esc(s.out.join("\n"))}</div></div></div>`),
    extraControls: `<select class="lk-s">${Object.entries(WALKS).map(([k, [lab]]) => `<option value="${k}"${k === key ? " selected" : ""}>${esc(lab)}</option>`).join("")}</select>`,
    onMount(root, rebuild) {
      if (mini) return;
      root.querySelector(".lk-s").onchange = (e) => { key = e.target.value; rebuild(); };
    },
  });
}

// ---------- building an object: super().__init__ ----------

function traceConstruct(forgot) {
  const t = new Tracer();
  const obj = { name: forgot ? "SilentCircle(2)" : "c", cls: forgot ? "SilentCircle" : "Circle", attrs: [] };
  const ex = (fresh = null, missing = null) => ({ obj: { ...obj, attrs: obj.attrs.map((a) => a.slice()) }, fresh, missing });
  if (!forgot) {
    let f = t.push("Circle.__init__", { radius: 1.5, color: "'green'", filled: "True" }, "self is the new Circle");
    t.snap(9, "<code>c = Circle(1.5)</code>: Python makes one new, empty <b>Circle</b> object, finds <code>__init__</code> in <code>Circle</code>, and calls it with <code>self</code> = the new object.", "", ex());
    f.status = "waiting: super().__init__(color, filled)";
    const g = t.push("GeometricObject.__init__", { color: "'green'", filled: "True" }, "self is the same Circle");
    t.snap(2, "<code>super()</code> is the superclass of the class this code is written in: <b>GeometricObject</b>. Its <code>__init__</code> runs on the <b>same</b> object. No second object is made.", "", ex());
    obj.attrs.push(["_GeometricObject__color", "'green'"]);
    t.snap(3, "<code>self.__color</code> is written inside <code>GeometricObject</code>, so Python stores it as <code>_GeometricObject__color</code> (name mangling).", "", ex("_GeometricObject__color"));
    obj.attrs.push(["_GeometricObject__filled", "True"]);
    t.snap(4, "Second field from the superclass.", "", ex("_GeometricObject__filled"));
    g.status = "returns None"; g.cls = "ret";
    t.snap(4, "<code>GeometricObject.__init__</code> is done; its frame is popped.", "good", ex());
    t.pop();
    f.status = "running";
    t.snap(10, "Back in <code>Circle.__init__</code>, after the <code>super()</code> line.", "", ex());
    obj.attrs.push(["_Circle__radius", "1.5"]);
    t.snap(11, "Now <code>Circle</code> adds its own field, stored as <code>_Circle__radius</code>.", "", ex("_Circle__radius"));
    f.status = "returns None"; f.cls = "ret";
    t.snap(11, "<code>Circle.__init__</code> returns.", "good", ex());
    t.pop();
    t.snap(0, "Done. <b>One object</b>, with three fields set by <b>two</b> <code>__init__</code> methods. <code>vars(c)</code> shows exactly these three.", "good", ex());
    return t.snaps;
  }
  let f = t.push("SilentCircle.__init__", { radius: 2 }, "self is the new SilentCircle");
  t.snap(12, "<code>SilentCircle(2)</code>: a new, empty object; <code>__init__</code> is found in <code>SilentCircle</code>.", "", ex());
  obj.attrs.push(["_SilentCircle__radius", "2"]);
  t.snap(13, "It sets its own field… and that is all. There is no <code>super().__init__()</code>, so lines 2–4 of <code>GeometricObject</code> never run.", "", ex("_SilentCircle__radius"));
  f.status = "returns None"; f.cls = "ret";
  t.snap(13, "<code>__init__</code> returns. No error yet: the object just has no colour.", "", ex());
  t.pop();
  f = t.push("GeometricObject.get_color", {}, "self is the SilentCircle");
  t.snap(6, "<code>.get_color()</code>: not in <code>SilentCircle</code>, found in <code>GeometricObject</code>. It runs.", "", ex());
  f.status = "AttributeError"; f.cls = "err";
  t.snap(7, "<code>self.__color</code> here means <code>_GeometricObject__color</code>, which was never created: <code>AttributeError: 'SilentCircle' object has no attribute '_GeometricObject__color'</code>. The error appears far from the real mistake.", "bad", ex(null, "_GeometricObject__color"));
  return t.snaps;
}

function demoConstruct(el, { mini = false } = {}) {
  let forgot = false;
  makeStepper(el, {
    mini, stackLabel: "call stack (newest on top)",
    code: () => (forgot ? CODE.silent : CODE.construct),
    build: () => traceConstruct(forgot),
    renderExtra: (s) => (s.extra ? `<div class="ob-wrap">${objHTML(s.extra.obj, s.extra.fresh, s.extra.missing)}</div>` : ""),
    extraControls: `<select class="cs-v"><option value="ok">Circle(1.5): with super().__init__</option><option value="forgot">SilentCircle(2).get_color(): forgot it</option></select>`,
    onMount(root, rebuild) {
      if (mini) return;
      root.querySelector(".cs-v").onchange = (e) => { forgot = e.target.value === "forgot"; rebuild(); };
    },
  });
}

// ---------- overriding: print(x) and super().__str__() ----------

const STR_OBJS = {
  circle: { expr: "Circle(1.5)", cls: "Circle", line: 9, extra: " radius: 1.5", extraLine: 10, tail: '" radius: " + str(self.__radius)' },
  rect: { expr: "Rectangle(2, 4)", cls: "Rectangle", line: 15, extra: " width: 2 height: 4", extraLine: 16, tail: '" width: " + … + " height: " + …' },
  geo: { expr: "GeometricObject()", cls: "GeometricObject", line: 3 },
};

function traceStr(key) {
  const o = STR_OBJS[key];
  const t = new Tracer();
  const base = "color: green and filled: True";
  if (o.cls === "GeometricObject") {
    const g = t.push("GeometricObject.__str__", {});
    t.snap(3, `<code>print(${o.expr})</code> calls <code>__str__</code>. Lookup starts at <b>GeometricObject</b> and finds it there.`);
    g.status = `returns '${base}'`; g.cls = "ret";
    t.snap(4, "Builds the description from the two private fields.", "good");
    t.pop(); t.out.push(base);
    t.snap(0, `Printed: <code>${base}</code>.`, "good");
    return t.snaps;
  }
  const f = t.push(`${o.cls}.__str__`, {});
  t.snap(o.line, `<code>print(${o.expr})</code> calls <code>__str__</code>. Lookup starts at <b>${o.cls}</b>, which defines its own <code>__str__</code>: the override wins, and <code>GeometricObject.__str__</code> is not reached by the lookup.`);
  f.status = "waiting: super().__str__()";
  const g = t.push("GeometricObject.__str__", {}, "self is the same object");
  t.snap(3, `<code>super().__str__()</code>: <code>super()</code> starts the search <b>above</b> ${o.cls}, so the superclass version runs, with the same <code>self</code>.`);
  g.status = `returns '${base}'`; g.cls = "ret";
  t.snap(4, `It returns <code>'${base}'</code>.`, "good");
  t.pop();
  f.status = `'${base}' + ${o.tail}`;
  t.snap(o.extraLine, "Back in the override, which adds its own part to the superclass's string.");
  f.status = `returns '${base}${o.extra}'`; f.cls = "ret";
  t.snap(o.extraLine, "The override returns the longer string.", "good");
  t.pop(); t.out.push(base + o.extra);
  t.snap(0, `Printed: <code>${base}${o.extra}</code>. Extend, don't repeat: the colour code lives in one place.`, "good");
  return t.snaps;
}

function demoStr(el) {
  let key = "circle";
  makeStepper(el, {
    showConsole: true,
    code: CODE.strChain,
    build: () => traceStr(key),
    extraControls: `<select class="st-o"><option value="circle">print(Circle(1.5))</option><option value="rect">print(Rectangle(2, 4))</option><option value="geo">print(GeometricObject())</option></select>`,
    onMount(root, rebuild) { root.querySelector(".st-o").onchange = (e) => { key = e.target.value; rebuild(); }; },
  });
}

// ---------- the object class: __new__ then __init__ ----------

function traceNew(slide) {
  const t = new Tracer();
  const ex = (o) => ({ obj: o });
  if (!slide) {
    const n = t.push("Loud.__new__", { cls: "Loud" });
    t.snap(2, "<code>Loud()</code>, step 1: Python calls <code>__new__</code> with the <b>class</b> (<code>cls</code>), not an object. No object exists yet.", "", ex(null));
    t.out.push("Loud's __new__() invoked");
    t.snap(3, "It prints its message.", "", ex(null));
    n.status = "returns the new Loud object"; n.cls = "ret";
    t.snap(4, "<code>super().__new__(cls)</code> is <code>object.__new__</code>: it makes a new, empty <b>Loud</b> object, which is returned.", "good", ex({ name: "(new)", cls: "Loud", attrs: [] }));
    t.pop();
    const i = t.push("Loud.__init__", {}, "self is the new object");
    t.snap(6, "Step 2: <code>__new__</code> returned a <b>Loud</b> object, so Python now calls <code>__init__</code> on it.", "", ex({ name: "(new)", cls: "Loud", attrs: [] }));
    t.out.push("Loud's __init__() invoked");
    t.snap(7, "<code>__init__</code> would normally fill in the fields; this one only prints.", "", ex({ name: "(new)", cls: "Loud", attrs: [] }));
    i.status = "returns None"; i.cls = "ret";
    t.pop();
    t.snap(10, "Done: <code>loud</code> refers to the new object. Two methods ran, in the order <code>__new__</code>, <code>__init__</code>.", "good", ex({ name: "loud", cls: "Loud", attrs: [] }));
    return t.snaps;
  }
  const n = t.push("A.__new__", { self: "A (the class!)" });
  t.snap(2, "<code>A()</code> calls <code>__new__</code>. The parameter is called <code>self</code>, but the value passed in is the <b>class</b> <code>A</code>.", "", ex(null));
  t.out.push("A's __new__() invoked");
  t.snap(3, "It prints its message…", "", ex(null));
  n.status = "returns None"; n.cls = "err";
  t.snap(3, "…and falls off the end, returning <code>None</code>. No object was made.", "bad", ex(null));
  t.pop();
  t.snap(9, "<code>__new__</code> did not return an <b>A</b> object, so Python does <b>not</b> call <code>__init__</code>. <code>a</code> is <code>None</code>. Leave <code>__new__</code> alone unless you have a special reason.", "bad", ex(null));
  return t.snaps;
}

function demoNew(el) {
  let slide = false;
  makeStepper(el, {
    showConsole: true,
    code: () => (slide ? CODE.newNone : CODE.loud),
    build: () => traceNew(slide),
    renderExtra: (s) => `<div class="ob-wrap">${s.extra && s.extra.obj ? objHTML(s.extra.obj) : `<div class="ob ghost">no object yet</div>`}</div>`,
    extraControls: `<select class="nw-v"><option value="ok">Loud: __new__ returns the object</option><option value="slide">slide version: __new__ returns nothing</option></select>`,
    onMount(root, rebuild) { root.querySelector(".nw-v").onchange = (e) => { slide = e.target.value === "slide"; rebuild(); }; },
  });
}

// ---------- the object class: __eq__ ----------

function demoEq(el) {
  el.innerHTML = `<div class="eq-code"></div><div class="eq-view"></div>
    <div class="controls">
      <select class="eq-v"><option value="plain">Point without __eq__</option><option value="eq">Point with __eq__</option></select>
      <label>q = <select class="eq-q"><option value="1,2">Point(1, 2)</option><option value="2,1">Point(2, 1)</option></select></label>
      <button class="cbtn eq-x on" data-x="pq">p == q</button><button class="cbtn eq-x" data-x="pp">p == p</button><button class="cbtn eq-x" data-x="is">p is q</button>
    </div><div class="msg eq-msg"></div>`;
  const $ = (q) => el.querySelector(q);
  let expr = "pq";
  function render() {
    const over = $(".eq-v").value === "eq";
    const [qx, qy] = $(".eq-q").value.split(",").map(Number);
    $(".eq-code").innerHTML = codeBlock(over ? CODE.pointEq : CODE.point);
    const same = expr === "pp";
    $(".eq-view").innerHTML = `<div class="eq-row">
      <div class="eq-names"><div class="eq-n">p</div><div class="eq-n">q</div></div>
      <div class="eq-objs">${objHTML({ name: "p →", cls: "Point", attrs: [["x", "1"], ["y", "2"]] })}${objHTML({ name: "q →", cls: "Point", attrs: [["x", String(qx)], ["y", String(qy)]] })}</div></div>`;
    let res, why, found;
    if (expr === "is") { res = false; why = "<code>is</code> asks: are these the <b>same object</b>? <code>p</code> and <code>q</code> were made by two calls to <code>Point(...)</code>, so no."; }
    else {
      found = over ? "Point" : "object";
      if (same) { res = true; why = "Both sides are the same object, so any sensible <code>__eq__</code> says <code>True</code>."; }
      else if (!over) { res = false; why = "<code>object.__eq__</code> only checks whether the two sides are the <b>same object</b> (like <code>is</code>). Equal fields don't matter."; }
      else { res = qx === 1 && qy === 2; why = `<code>Point.__eq__</code> compares the fields: <code>1 == ${qx}</code> and <code>2 == ${qy}</code>.`; }
      why = `Lookup for <code>__eq__</code>: ${over ? "found in <b>Point</b>" : "not in Point, found in <b>object</b>"}. ` + why;
    }
    const ex = expr === "pq" ? "p == q" : expr === "pp" ? "p == p" : "p is q";
    $(".eq-msg").innerHTML = `<code>${ex}</code> → <b>${res ? "True" : "False"}</b>. ${why}`;
    $(".eq-msg").className = "msg eq-msg " + (res ? "good" : "bad");
    el.querySelectorAll(".eq-x").forEach((b) => b.classList.toggle("on", b.dataset.x === expr));
  }
  el.querySelectorAll(".eq-x").forEach((b) => { b.onclick = () => { expr = b.dataset.x; render(); }; });
  $(".eq-v").onchange = render; $(".eq-q").onchange = render;
  render();
}

// ---------- polymorphism: one loop, many classes ----------

function shapeStr(s) {
  const base = "color: green and filled: True";
  return s.kind === "c" ? `${base} radius: ${s.r}` : `${base} width: ${s.w} height: ${s.h}`;
}
const shapeExpr = (s) => (s.kind === "c" ? `Circle(${s.r})` : `Rectangle(${s.w}, ${s.h})`);
const shapeCls = (s) => (s.kind === "c" ? "Circle" : "Rectangle");
function shapeArea(s) { return s.kind === "c" ? { v: s.r * s.r * Math.PI, f: true } : { v: s.w * s.h, f: false }; }
function shapePerim(s) { return s.kind === "c" ? { v: 2 * s.r * Math.PI, f: true } : { v: 2 * (s.w + s.h), f: false }; }

function parseShapes(text) {
  const out = [];
  const re = /(Circle)\(\s*(\d+)\s*\)|(Rectangle)\(\s*(\d+)\s*,\s*(\d+)\s*\)/g;
  let m;
  while ((m = re.exec(text)) && out.length < 6) {
    if (m[1]) out.push({ kind: "c", r: +m[2] }); else out.push({ kind: "r", w: +m[4], h: +m[5] });
  }
  return out;
}

function tracePoly(mode, shapes) {
  const snaps = [];
  const out = [];
  const s = (k, line, msg, extra = {}) => snaps.push({ k, line, msg, out: out.slice(), ...extra });
  if (mode === "total") {
    let total = 0, isF = false;
    s(-1, 2, "<code>total = 0</code>. The loop below never asks what kind of shape it has.", { total: "0" });
    shapes.forEach((sh, k) => {
      s(k, 3, `<code>shape</code> now refers to <b>${shapeExpr(sh)}</b>.`, { total: pyNum(total, isF) });
      const a = shapeArea(sh);
      const before = pyNum(total, isF);
      total += a.v; isF = isF || a.f;
      s(k, 4, `<code>shape.get_area()</code>: lookup starts at <b>${shapeCls(sh)}</b> and finds <code>${shapeCls(sh)}.get_area</code>. It returns ${pyNum(a.v, a.f)}; <code>total</code> = ${before} + ${pyNum(a.v, a.f)} = <b>${pyNum(total, isF)}</b>.`,
        { bind: `${shapeCls(sh)}.get_area`, total: pyNum(total, isF) });
    });
    out.push(pyNum(total, isF));
    s(-1, 5, `<code>total_area(shapes)</code> returns <b>${pyNum(total, isF)}</b>. Same line of code, ${new Set(shapes.map(shapeCls)).size} different <code>get_area</code> methods.`, { total: pyNum(total, isF), msgCls: "good" });
    return snaps;
  }
  if (mode === "print") {
    shapes.forEach((sh, k) => {
      s(k, 1, `<code>display_object(${shapeExpr(sh)})</code>: <code>g</code> refers to a <b>${shapeCls(sh)}</b>.`);
      out.push(shapeStr(sh));
      s(k, 2, `<code>print(g)</code> calls <code>g.__str__()</code>. Lookup starts at <b>${shapeCls(sh)}</b>: its override runs. Which method runs is decided now, by the object: <b>dynamic binding</b>.`, { bind: `${shapeCls(sh)}.__str__` });
    });
    s(-1, 0, "One function, one line of code, a different <code>__str__</code> for each class.", { msgCls: "good" });
    return snaps;
  }
  shapes.forEach((sh, k) => {
    const a = shapeArea(sh), p = shapePerim(sh);
    s(k, 1, `<code>display_object(${shapeExpr(sh)})</code>.`);
    out.push(`Area is ${pyNum(a.v, a.f)}`);
    s(k, 2, `<code>g.get_area()</code> → <code>${shapeCls(sh)}.get_area</code>. Every geometric object has it.`, { bind: `${shapeCls(sh)}.get_area` });
    out.push(`Perimeter is ${pyNum(p.v, p.f)}`);
    s(k, 3, `<code>g.get_perimeter()</code> → <code>${shapeCls(sh)}.get_perimeter</code>.`, { bind: `${shapeCls(sh)}.get_perimeter` });
    const isC = sh.kind === "c";
    s(k, 5, `<code>isinstance(g, Circle)</code>? <b>${isC ? "True" : "False"}</b>: ${isC ? "it is a Circle." : `a ${shapeCls(sh)} is not a Circle.`}`);
    if (isC) {
      out.push(`Diameter is ${2 * sh.r}`);
      s(k, 6, "Safe to call <code>get_diameter</code>: only circles have it.", { bind: "Circle.get_diameter" });
    } else {
      s(k, 7, "<code>isinstance(g, Rectangle)</code>? <b>True</b>.");
      out.push(`Width is ${sh.w}`);
      s(k, 8, "Safe to call <code>get_width</code>…", { bind: "Rectangle.get_width" });
      out.push(`Height is ${sh.h}`);
      s(k, 9, "…and <code>get_height</code>.", { bind: "Rectangle.get_height" });
    }
  });
  s(-1, 0, "<code>isinstance</code> guarded the calls that only one class supports. Without it, <code>Circle(4).get_width()</code> raises <code>AttributeError</code>.", { msgCls: "good" });
  return snaps;
}

function demoPoly(el, { mode: mode0 = "print" } = {}) {
  let mode = mode0, text = "Circle(4), Rectangle(1, 3)";
  const codes = { print: CODE.displayObject, total: CODE.totalArea, isinst: CODE.displayObject2 };
  makePlayer(el, {
    build: () => tracePoly(mode, parseShapes(text).length ? parseShapes(text) : parseShapes("Circle(4), Rectangle(1, 3)")),
    render: (s) => {
      const shapes = parseShapes(text).length ? parseShapes(text) : parseShapes("Circle(4), Rectangle(1, 3)");
      const cards = shapes.map((sh, k) => `<div class="pm-shape${s.k === k ? " cur" : ""}"><span class="pm-ico ${sh.kind}"></span><b>${shapeExpr(sh)}</b><small>${shapeCls(sh)} → GeometricObject → object</small>
        ${s.k === k && s.bind ? `<span class="pm-bind">runs ${s.bind}</span>` : ""}</div>`).join("");
      return `<div class="pm-list"><span class="lk-cap">${mode === "total" ? "shapes" : "objects passed to display_object"}</span>${cards}
        ${s.total !== undefined ? `<div class="pm-total">total = <b>${s.total}</b></div>` : ""}</div>
        <div class="stepper" style="margin-top:12px"><div>${codeBlock(codes[mode], "py", s.line ? [s.line] : [])}</div>
        <div><div class="counter" style="margin-bottom:4px">output</div><div class="console" style="margin-top:0">${esc(s.out.join("\n"))}</div></div></div>`;
    },
    extraControls: `<select class="pm-m">${[["print", "display_object: print(g)"], ["total", "total_area(shapes)"], ["isinst", "display_object with isinstance"]].map(([v, l]) => `<option value="${v}"${v === mode ? " selected" : ""}>${l}</option>`).join("")}</select>
      <label>shapes <input type="text" class="pm-t" value="${text}" style="width:230px"></label>`,
    onMount(root, rebuild) {
      root.querySelector(".pm-m").onchange = (e) => { mode = e.target.value; rebuild(); };
      root.querySelector(".pm-t").onchange = (e) => {
        const sh = parseShapes(e.target.value);
        text = sh.length ? sh.map(shapeExpr).join(", ") : "Circle(4), Rectangle(1, 3)";
        e.target.value = text; rebuild();
      };
    },
  });
}

// ---------- isinstance: the fruit family ----------

const FRUIT = {
  Fruit: { base: "object", x: 300, y: 60, names: [] },
  Apple: { base: "Fruit", x: 170, y: 140, names: ["make_apple_cider"] },
  Orange: { base: "Fruit", x: 450, y: 140, names: ["make_orange_juice"] },
  GoldenDelicious: { base: "Apple", x: 90, y: 220, names: [] },
  McIntosh: { base: "Apple", x: 270, y: 220, names: [] },
  object: { base: null, x: 300, y: 0, names: [] },
};
const FRUIT_OBJ = { golden_delicious: "GoldenDelicious", orange: "Orange" };

function traceFruit(objName, q) {
  const snaps = [];
  const start = FRUIT_OBJ[objName];
  const chain = []; for (let k = start; k; k = FRUIT[k].base) chain.push(k);
  const isMethod = q.startsWith("make_");
  const s = (at, visited, msg, extra = {}) => snaps.push({ at, visited: visited.slice(), msg, chain, ...extra });
  const expr = isMethod ? `${objName}.${q}()` : `isinstance(${objName}, ${q})`;
  s(start, [], `<code>${expr}</code>: <code>${objName}</code> was made by <code>${start}()</code>, so start at <b>${start}</b> and walk up.`);
  const seen = [];
  for (const c of chain) {
    seen.push(c);
    const hit = isMethod ? FRUIT[c].names.includes(q) : c === q;
    if (hit) {
      s(c, seen, isMethod
        ? `<code>${q}</code> is defined in <b>${c}</b>: found. It returns <code>'${q === "make_apple_cider" ? "apple cider" : "orange juice"}'</code>.`
        : `<b>${c}</b> is on the path from <code>${start}</code> up to <code>object</code>, so the answer is <b>True</b>.`, { hit: c, msgCls: "good" });
      return snaps;
    }
    s(c, seen, isMethod ? `Is <code>${q}</code> in <b>${c}</b>? No.${FRUIT[c].base ? " Go up." : ""}` : `Is this <b>${q}</b>? No, it is <b>${c}</b>.${FRUIT[c].base ? " Go up." : ""}`);
  }
  s(null, seen, isMethod
    ? `Reached the top without finding it: <code>AttributeError: '${start}' object has no attribute '${q}'</code>.`
    : `Reached <code>object</code> without meeting <b>${q}</b>: <b>False</b>. ${q} is not on this object's path${q === "McIntosh" ? " (it is a sibling class, not an ancestor)" : ""}.`, { msgCls: "bad", miss: true });
  return snaps;
}

function fruitSVG(s) {
  const W = 560, H = 250;
  let g = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="fruit class tree">`;
  const visited = new Set(s.visited);
  for (const [k, c] of Object.entries(FRUIT)) {
    if (!c.base) continue;
    const p = FRUIT[c.base];
    const on = visited.has(k) && (visited.has(c.base) || s.at === c.base);
    g += `<line x1="${c.x}" y1="${c.y + 2}" x2="${p.x}" y2="${p.y + 34}" stroke="var(--${on ? "amber" : "line"})" stroke-width="${on ? 2.4 : 1.4}"/>`;
  }
  for (const [k, c] of Object.entries(FRUIT)) {
    const cur = s.at === k, hit = s.hit === k, vis = visited.has(k);
    const fill = hit ? "var(--green-soft)" : cur ? "var(--mark)" : vis ? "var(--teal-soft)" : "var(--card)";
    const stroke = hit ? "var(--green)" : cur ? "var(--amber)" : vis ? "var(--teal)" : "var(--line)";
    const w = k === "GoldenDelicious" ? 150 : 124;
    g += `<rect x="${c.x - w / 2}" y="${c.y + 2}" width="${w}" height="32" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="${cur || hit ? 2.2 : 1.2}"/>`;
    g += `<text x="${c.x}" y="${c.y + 23}" font-size="13" text-anchor="middle" fill="var(--ink)">${k}</text>`;
    if (c.names.length) g += `<text x="${c.x}" y="${c.y + 50}" font-size="10.5" text-anchor="middle" fill="var(--stone)">${c.names[0]}()</text>`;
  }
  return g + "</svg>";
}

function demoFruit(el) {
  let obj = "golden_delicious", q = "Fruit";
  makePlayer(el, {
    build: () => traceFruit(obj, q),
    render: (s) => `<div class="svgbox">${fruitSVG(s)}</div>`,
    extraControls: `<select class="fr-o"><option value="golden_delicious">golden_delicious</option><option value="orange">orange</option></select>
      <select class="fr-q">${["Fruit", "Orange", "Apple", "GoldenDelicious", "McIntosh"].map((c) => `<option value="${c}">isinstance(…, ${c})</option>`).join("")}
        <option value="make_apple_cider">.make_apple_cider()</option><option value="make_orange_juice">.make_orange_juice()</option></select>`,
    onMount(root, rebuild) {
      root.querySelector(".fr-o").onchange = (e) => { obj = e.target.value; rebuild(); };
      root.querySelector(".fr-q").onchange = (e) => { q = e.target.value; rebuild(); };
    },
  });
}

// ---------- multiple inheritance ----------

function traceMulti(useSuper) {
  const t = new Tracer();
  const obj = { name: "c", cls: "C", attrs: [] };
  const ex = (fresh = null, sup = null, missing = null) => ({ obj: { ...obj, attrs: obj.attrs.map((a) => a.slice()) }, fresh, sup, missing });
  const set = (k, v) => { const a = obj.attrs.find((x) => x[0] === k); if (a) a[1] = v; else obj.attrs.push([k, v]); };
  if (!useSuper) {
    t.push("main", {});
    const f = t.push("C.__init__", { a: 1, b: 2, c: 3 });
    t.snap(12, "<code>c = C(1, 2, 3)</code>: a new <b>C</b> object; <code>__init__</code> is found in <code>C</code>.", "", ex());
    f.status = "waiting: A.__init__(self, a)";
    let g = t.push("A.__init__", { a: 1 }, "self is the C object");
    t.snap(2, "<code>A.__init__(self, a)</code> names the class explicitly and passes <code>self</code> by hand.", "", ex(null, "A"));
    set("a", "1"); t.snap(3, "<code>self.a = 1</code>", "", ex("a", "A"));
    t.pop();
    f.status = "waiting: B.__init__(self, b)";
    g = t.push("B.__init__", { b: 2 }, "self is the C object");
    t.snap(7, "<code>B.__init__(self, b)</code>: now the second superclass sets up its part.", "", ex(null, "B"));
    set("b", "2"); t.snap(8, "<code>self.b = 2</code>", "", ex("b", "B"));
    t.pop();
    f.status = "running";
    set("c", "3"); t.snap(15, "Finally <code>C</code> adds <code>c</code>. One object, fields from three classes.", "", ex("c"));
    t.pop();
    t.push("C.output", {});
    for (const [k, line] of [["a", 18], ["c", 19], ["b", 20]]) {
      t.out.push(obj.attrs.find((x) => x[0] === k)[1]);
      t.snap(line, `<code>print(self.${k})</code>`, "", ex(k));
    }
    t.pop();
    t.snap(0, "Output <code>1 3 2</code>, as in the note. Lookup order for <code>C</code>: <b>C → A → B → object</b>.", "good", ex());
    return t.snaps;
  }
  const f = t.push("C.__init__", { a: 1, b: 2, c: 3 });
  t.snap(12, "<code>c = C(1, 2, 3)</code> with the slides' second version of <code>C</code>.", "", ex());
  f.status = "waiting: super().__init__(a)";
  t.push("A.__init__", { a: 1 }, "self is the C object");
  t.snap(2, "<code>super()</code> means the <b>next class after C in the lookup order</b>: that is <b>A</b>.", "", ex(null, "A"));
  set("a", "1"); t.snap(3, "<code>self.a = 1</code>", "", ex("a", "A"));
  t.pop();
  f.status = "waiting: super().__init__(b)";
  t.push("A.__init__", { a: 2 }, "self is the C object");
  t.snap(2, "The second <code>super().__init__(b)</code> goes to the <b>same</b> place: <b>A</b> again, now with <code>a = 2</code>. <code>B</code> is never reached.", "bad", ex(null, "A"));
  set("a", "2"); t.snap(3, "<code>self.a = 2</code> overwrites the 1.", "bad", ex("a", "A"));
  t.pop();
  f.status = "running";
  set("c", "3"); t.snap(15, "<code>self.c = 3</code>. No <code>b</code> was ever set.", "", ex("c"));
  t.pop();
  t.out.push(">>> c.a, c.c", "(2, 3)");
  t.snap(0, "<code>c.a, c.c</code> is <code>(2, 3)</code>, not <code>(1, 3)</code>.", "bad", ex());
  t.out.push(">>> c.b", "AttributeError: 'C' object has no attribute 'b'");
  t.snap(0, "<code>c.b</code>: not on the object, not in C, A, B or object: <code>AttributeError</code>. With two superclasses, call each <code>__init__</code> by name.", "bad", ex(null, null, "b"));
  return t.snaps;
}

function demoMulti(el) {
  let useSuper = false;
  makeStepper(el, {
    showConsole: true,
    code: () => (useSuper ? CODE.multiSuper : CODE.multi),
    build: () => traceMulti(useSuper),
    renderExtra: (s) => {
      if (!s.extra) return "";
      const mro = ["C", "A", "B", "object"].map((k) => `<span class="mro${s.extra.sup === k ? " on" : ""}">${k}</span>`).join("<span class=\"mro-arr\">→</span>");
      return `<div class="mi-top"><div><div class="lk-cap">lookup order of C</div><div class="mro-row">${mro}</div></div>
        <div class="ob-wrap">${objHTML(s.extra.obj, s.extra.fresh, s.extra.missing)}</div></div>`;
    },
    extraControls: `<select class="mi-v"><option value="named">A.__init__ / B.__init__ by name</option><option value="super">super().__init__ twice (bug)</option></select>`,
    onMount(root, rebuild) { root.querySelector(".mi-v").onchange = (e) => { useSuper = e.target.value === "super"; rebuild(); }; },
  });
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
  lookup: (el) => demoLookup(el),
  lookupMini: (el) => demoLookup(el, { mini: true, scenario: "chain" }),
  lookupStudentMini: (el) => demoLookup(el, { mini: true, scenario: "student" }),
  construct: (el) => demoConstruct(el),
  constructMini: (el) => demoConstruct(el, { mini: true }),
  str: (el) => demoStr(el),
  newInit: (el) => demoNew(el),
  eq: (el) => demoEq(el),
  poly: (el) => demoPoly(el),
  polyIsinstance: (el) => demoPoly(el, { mode: "isinst" }),
  fruit: (el) => demoFruit(el),
  multi: (el) => demoMulti(el),
  quiz: (el) => demoQuiz(el, QUIZ),
};
