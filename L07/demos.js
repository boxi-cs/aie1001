// Interactive demos. Every code panel is copied from notes/L07-objects-classes.md (checked
// by tools/check.py): CODE below is the note's code blocks, verbatim. The JS twins replay
// what Python does to names, objects and frames, step by step.

// Generated from notes/L07-objects-classes.md: the note's code blocks, verbatim.
const CODE = {
  typeRepl: ">>> n = 3\n>>> type(n)\n<class 'int'>\n>>> s = \"Welcome\"\n>>> type(s)\n<class 'str'>\n>>> isinstance(id(s), int)\nTrue",
  refsRepl: ">>> a = [1, 2]\n>>> b = a\n>>> id(a) == id(b)\nTrue\n>>> a is b\nTrue\n>>> c = [1, 2]\n>>> c == a\nTrue\n>>> c is a\nFalse",
  refsAppend: ">>> a = [1, 2]\n>>> b = a\n>>> c = [1, 2]\n>>> b.append(3)\n>>> a\n[1, 2, 3]\n>>> c\n[1, 2]",
  strMethods: ">>> s = \"Welcome\"\n>>> s.lower()\n'welcome'\n>>> s.upper()\n'WELCOME'",
  classSyntax: "class ClassName:\n    pass  # the initializer and the methods go here, indented",
  circle: "import math\n\n\nclass Circle:\n    \"\"\"A circle with a radius.\"\"\"\n\n    def __init__(self, radius=1):\n        self.radius = radius\n\n    def get_perimeter(self):\n        return 2 * self.radius * math.pi\n\n    def get_area(self):\n        return self.radius * self.radius * math.pi\n\n    def set_radius(self, radius):\n        self.radius = radius",
  circleRepl: ">>> circle1 = Circle()\n>>> circle1.radius\n1\n>>> circle1.get_perimeter()\n6.283185307179586\n>>> circle1.get_area()\n3.141592653589793\n>>> circle1 = Circle(2)\n>>> circle1.radius\n2\n>>> circle1.radius = 10\n>>> circle1.get_area()\n314.1592653589793",
  getArea: ">>> c = Circle(5)\n>>> c.get_area()\n78.53981633974483",
  unbound: ">>> c = Circle(5)\n>>> Circle.get_area(c)\n78.53981633974483",
  probe: "class Probe:\n    def whoami(self):\n        return self",
  probeRepl: ">>> p = Probe()\n>>> p.whoami() is p\nTrue",
  setRadiusRepl: ">>> c1 = Circle(3)\n>>> c2 = Circle(4)\n>>> c2.set_radius(10)\n>>> c1.radius, c2.radius\n(3, 10)",
  dotRepl: ">>> c = Circle(5)\n>>> c.radius\n5\n>>> c.get_perimeter()\n31.41592653589793\n>>> c.get_area()\n78.53981633974483",
  scope: "class Scope:\n    def __init__(self):\n        self.x = 1          # instance variable: stored in the object\n\n    def m1(self):\n        self.y = 2          # another instance variable\n        z = 5               # local variable: gone when m1 returns\n        return z\n\n    def m2(self):\n        u = self.x + 1      # self.x is visible in every method\n        self.m1()           # call another method on the same object\n        return u",
  scopeRepl: ">>> s = Scope()\n>>> s.m2()\n2\n>>> s.y\n2\n>>> s.z\nTraceback (most recent call last):\n  ...\nAttributeError: 'Scope' object has no attribute 'z'",
  threeCircles: "def main():\n    # Create a circle with radius 1\n    circle1 = Circle()\n    print(\"The area of the circle of radius\", circle1.radius, \"is\", circle1.get_area())\n\n    # Create a circle with radius 25\n    circle2 = Circle(25)\n    print(\"The area of the circle of radius\", circle2.radius, \"is\", circle2.get_area())\n\n    # Create a circle with radius 125\n    circle3 = Circle(125)\n    print(\"The area of the circle of radius\", circle3.radius, \"is\", circle3.get_area())\n\n    # Modify circle radius\n    circle2.radius = 100  # or circle2.set_radius(100)\n    print(\"The area of the circle of radius\", circle2.radius, \"is\", circle2.get_area())\n\n\nmain()",
  threeCirclesOut: "The area of the circle of radius 1 is 3.141592653589793\nThe area of the circle of radius 25 is 1963.4954084936207\nThe area of the circle of radius 125 is 49087.385212340516\nThe area of the circle of radius 100 is 31415.926535897932",
  wrong1: "class A:\n    def __init__(self, i):\n        self.i = i",
  wrong1Repl: ">>> a = A()\nTraceback (most recent call last):\n  ...\nTypeError: A.__init__() missing 1 required positional argument: 'i'",
  wrong2: "class A:\n    # Construct an object of the class\n    def A(self):\n        radius = 3",
  wrong2Repl: ">>> a = A()\n>>> a.radius\nTraceback (most recent call last):\n  ...\nAttributeError: 'A' object has no attribute 'radius'",
  wrong3: "class A:\n    # Construct an object of the class\n    def __init__(self):\n        radius = 3\n\n    def set_radius(radius):\n        self.radius = radius",
  wrong3Repl: ">>> a = A()\n>>> a.set_radius(5)\nTraceback (most recent call last):\n  ...\nTypeError: A.set_radius() takes 1 positional argument but 2 were given",
  tvUml: "TV\n-----------------------------------------\nchannel: int             current channel (1 to 120)\nvolume_level: int        current volume level (1 to 7)\non: bool                 whether the TV is on\n-----------------------------------------\nTV()                     constructs a default TV object\nturn_on(): None          turns on this TV\nturn_off(): None         turns off this TV\nget_channel(): int       returns the channel\nset_channel(channel: int): None\nget_volume_level(): int\nset_volume(volume_level: int): None\nchannel_up(): None       increases the channel by 1\nchannel_down(): None     decreases the channel by 1\nvolume_up(): None        increases the volume level by 1\nvolume_down(): None      decreases the volume level by 1",
  tv: "class TV:\n    def __init__(self):\n        self.channel = 1        # default channel is 1\n        self.volume_level = 1   # default volume level is 1\n        self.on = False         # initially, the TV is off\n\n    def turn_on(self):\n        self.on = True\n\n    def turn_off(self):\n        self.on = False\n\n    def get_channel(self):\n        return self.channel\n\n    def set_channel(self, channel):\n        if self.on and 1 <= channel <= 120:\n            self.channel = channel\n\n    def get_volume_level(self):\n        return self.volume_level\n\n    def set_volume(self, volume_level):\n        if self.on and 1 <= volume_level <= 7:\n            self.volume_level = volume_level\n\n    def channel_up(self):\n        if self.on and self.channel < 120:\n            self.channel += 1\n\n    def channel_down(self):\n        if self.on and self.channel > 1:\n            self.channel -= 1\n\n    def volume_up(self):\n        if self.on and self.volume_level < 7:\n            self.volume_level += 1\n\n    def volume_down(self):\n        if self.on and self.volume_level > 1:\n            self.volume_level -= 1",
  tvMain: "def main():\n    tv1 = TV()\n    tv1.turn_on()\n    tv1.set_channel(30)\n    tv1.set_volume(3)\n\n    tv2 = TV()\n    tv2.turn_on()\n    tv2.channel_up()\n    tv2.channel_up()\n    tv2.volume_up()\n\n    print(\"tv1's channel is\", tv1.get_channel(),\n          \"and volume level is\", tv1.get_volume_level())\n    print(\"tv2's channel is\", tv2.get_channel(),\n          \"and volume level is\", tv2.get_volume_level())\n\n\nmain()",
  tvOut: "tv1's channel is 30 and volume level is 3\ntv2's channel is 3 and volume level is 2",
  tv3: "tv3 = TV()\ntv3.set_channel(50)\ntv3.turn_on()\ntv3.channel_down()\nprint(tv3.get_channel())",
  tv3Repl: ">>> tv3 = TV()\n>>> tv3.set_channel(50)\n>>> tv3.turn_on()\n>>> tv3.channel_down()\n>>> tv3.get_channel()\n1",
  slideTv: "class SlideTV:\n    def __init__(self):\n        self.channel = 1\n        self.on = True\n\n    def set_channel(self, channel):\n        if self.on and 1 <= self.channel <= 120:   # checks the old channel\n            self.channel = channel",
  slideTvRepl: ">>> tv = SlideTV()\n>>> tv.set_channel(500)\n>>> tv.channel\n500",
  printAreas: "def print_areas(c, times):\n    \"\"\"Print a table of areas, adding 1 to c's radius after each row.\"\"\"\n    print(\"Radius\", \"Area\")\n    while times >= 1:\n        print(c.radius, c.get_area())\n        c.radius = c.radius + 1\n        times = times - 1\n\n\ndef main():\n    # Create a Circle object with radius 1\n    my_circle = Circle()\n\n    # Print areas for radius 1, 2, 3, 4, and 5\n    n = 5\n    print_areas(my_circle, n)\n\n    # Display my_circle.radius and n\n    print(\"Radius is\", my_circle.radius)\n    print(\"n is\", n)\n\n\nmain()",
  printAreasOut: "Radius Area\n1 3.141592653589793\n2 12.566370614359172\n3 28.274333882308138\n4 50.26548245743669\n5 78.53981633974483\nRadius is 6\nn is 5",
  count: "class Count:\n    def __init__(self, count=0):\n        self.count = count\n\n\ndef main():\n    c = Count()\n    n = 1\n    m(c, n)\n\n    print(\"count is\", c.count)\n    print(\"n is\", n)\n\n\ndef m(c, n):\n    c = Count(5)\n    n = 3\n\n\nmain()",
  countOut: "count is 0\nn is 1",
  m2: "def m2(c, n):\n    c.count = 5\n    n = 3",
  m2Repl: ">>> c = Count()\n>>> n = 1\n>>> m2(c, n)\n>>> c.count\n5\n>>> n\n1",
  setVsAssign: ">>> circle1 = Circle()\n>>> circle1.set_radius(10)\n>>> circle1.radius = 10\n>>> circle1.radius\n10",
  privCircle: "class Circle:\n    \"\"\"A circle whose radius can only be changed through set_radius.\"\"\"\n\n    def __init__(self, radius=1):\n        self.__radius = radius\n\n    def get_radius(self):\n        return self.__radius\n\n    def set_radius(self, radius):\n        if radius >= 0:\n            self.__radius = radius\n\n    def get_perimeter(self):\n        return 2 * self.__radius * math.pi\n\n    def get_area(self):\n        return self.__radius * self.__radius * math.pi",
  privRepl: ">>> c = Circle(5)\n>>> c.get_radius()\n5\n>>> c.set_radius(-3)\n>>> c.get_radius()\n5\n>>> c.__radius\nTraceback (most recent call last):\n  ...\nAttributeError: 'Circle' object has no attribute '__radius'. Did you mean: 'get_radius'?",
  mangleRepl: ">>> c = Circle(5)\n>>> vars(c)\n{'_Circle__radius': 5}\n>>> c._Circle__radius\n5",
  mangleTrap: ">>> c = Circle(5)\n>>> c.__radius = 10\n>>> c.get_radius()\n5\n>>> vars(c)\n{'_Circle__radius': 5, '__radius': 10}",
  p1: "class A:\n    def __init__(self, i):\n        self.__i = i",
  p1Repl: ">>> a = A(5)\n>>> print(a.__i)\nTraceback (most recent call last):\n  ...\nAttributeError: 'A' object has no attribute '__i'",
  p2: "class A:\n    def __init__(self, new_s=\"Welcome\"):\n        self.__s = new_s\n\n    def print(self):\n        print(self.__s)\n\n\ndef main():\n    a = A()\n    a.print()\n\n\nmain()",
  p2Out: "Welcome",
  p3: "class A:\n    def __init__(self, on):\n        self.__on = not on",
  p3Repl: ">>> a = A(False)\n>>> print(a.on)\nTraceback (most recent call last):\n  ...\nAttributeError: 'A' object has no attribute 'on'",
  p3Fix: "class A:\n    def __init__(self, on):\n        self.__on = not on\n\n    def is_on(self):\n        return self.__on",
  p3FixRepl: ">>> a = A(False)\n>>> a.is_on()\nTrue",
  gcd: "def gcd(n1, n2):\n    \"\"\"Return the greatest common divisor of two positive integers.\"\"\"\n    gcd = 1  # initial gcd is 1\n    k = 2    # possible gcd\n    while k <= n1 and k <= n2:\n        if n1 % k == 0 and n2 % k == 0:\n            gcd = k  # update gcd\n        k += 1\n    return gcd",
  gcdRepl: ">>> gcd(24, 36)\n12",
  primes: "def is_prime(number):\n    \"\"\"Return True if number (at least 2) is prime.\"\"\"\n    divisor = 2\n    while divisor <= number / 2:\n        if number % divisor == 0:\n            return False  # number is not a prime\n        divisor += 1\n    return True\n\n\ndef first_primes(count):\n    \"\"\"Return a list of the first count prime numbers.\"\"\"\n    primes = []\n    number = 2\n    while len(primes) < count:\n        if is_prime(number):\n            primes.append(number)\n        number += 1\n    return primes",
  primesRepl: ">>> first_primes(10)\n[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]",
  bmiUml: "BMI\n-----------------------------------------\n-name: str                the name of the person\n-age: int                 the age of the person\n-weight: float            the weight of the person in pounds\n-height: float            the height of the person in inches\n-----------------------------------------\nBMI(name: str, age: int, weight: float, height: float)\nget_bmi(): float          returns the BMI\nget_status(): str         returns the BMI status (e.g. Normal, Overweight)\nget_name(), get_age(), get_weight(), get_height()",
  bmiMain: "def main():\n    bmi1 = BMI(\"John Doe\", 18, 145, 70)\n    print(\"The BMI for\", bmi1.get_name(), \"is\", bmi1.get_bmi(), bmi1.get_status())\n\n    bmi2 = BMI(\"Peter King\", 50, 215, 70)\n    print(\"The BMI for\", bmi2.get_name(), \"is\", bmi2.get_bmi(), bmi2.get_status())",
  bmi: "class BMI:\n    def __init__(self, name, age, weight, height):\n        self.__name = name\n        self.__age = age\n        self.__weight = weight\n        self.__height = height\n\n    def get_bmi(self):\n        KILOGRAMS_PER_POUND = 0.45359237\n        METERS_PER_INCH = 0.0254\n        height_m = self.__height * METERS_PER_INCH\n        bmi = self.__weight * KILOGRAMS_PER_POUND / (height_m * height_m)\n        return round(bmi * 100) / 100\n\n    def get_status(self):\n        bmi = self.get_bmi()\n        if bmi < 18.5:\n            return \"Underweight\"\n        elif bmi < 25:\n            return \"Normal\"\n        elif bmi < 30:\n            return \"Overweight\"\n        else:\n            return \"Obese\"\n\n    def get_name(self):\n        return self.__name\n\n    def get_age(self):\n        return self.__age\n\n    def get_weight(self):\n        return self.__weight\n\n    def get_height(self):\n        return self.__height\n\n\nmain()",
  bmiOut: "The BMI for John Doe is 20.81 Normal\nThe BMI for Peter King is 30.85 Obese",
  loanUml: "Loan\n-----------------------------------------\n-annual_interest_rate: float   (default 2.5)\n-number_of_years: int          (default 1)\n-loan_amount: float            (default 1000)\n-borrower: str                 (default \" \")\n-----------------------------------------\nLoan(annual_interest_rate, number_of_years, loan_amount, borrower)\nget_... and set_... for each of the four fields\nget_monthly_payment(): float   returns the monthly payment\nget_total_payment(): float     returns the total payment",
  loan: "class Loan:\n    def __init__(self, annual_interest_rate=2.5, number_of_years=1,\n                 loan_amount=1000, borrower=\" \"):\n        self.__annual_interest_rate = annual_interest_rate\n        self.__number_of_years = number_of_years\n        self.__loan_amount = loan_amount\n        self.__borrower = borrower\n\n    def get_annual_interest_rate(self):\n        return self.__annual_interest_rate\n\n    def get_number_of_years(self):\n        return self.__number_of_years\n\n    def get_loan_amount(self):\n        return self.__loan_amount\n\n    def get_borrower(self):\n        return self.__borrower\n\n    def set_annual_interest_rate(self, annual_interest_rate):\n        self.__annual_interest_rate = annual_interest_rate\n\n    def set_number_of_years(self, number_of_years):\n        self.__number_of_years = number_of_years\n\n    def set_loan_amount(self, loan_amount):\n        self.__loan_amount = loan_amount\n\n    def set_borrower(self, borrower):\n        self.__borrower = borrower\n\n    def get_monthly_payment(self):\n        monthly_interest_rate = self.__annual_interest_rate / 1200\n        monthly_payment = (self.__loan_amount * monthly_interest_rate\n                           / (1 - 1 / (1 + monthly_interest_rate)\n                              ** (self.__number_of_years * 12)))\n        return monthly_payment\n\n    def get_total_payment(self):\n        total_payment = self.get_monthly_payment() * self.__number_of_years * 12\n        return total_payment",
  loanMain: "def main():\n    loan = Loan(2.5, 5, 1000, \"John Jones\")\n    print(\"The loan is for\", loan.get_borrower())\n    print(\"The monthly payment is\", format(loan.get_monthly_payment(), \".2f\"))\n    print(\"The total payment is\", format(loan.get_total_payment(), \".2f\"))\n\n\nmain()",
  loanOut: "The loan is for John Jones\nThe monthly payment is 17.75\nThe total payment is 1064.84",
  check3: "p = Circle(2)\nq = p\nq.set_radius(7)\nprint(p.get_radius())",
  check3Out: "7",
  ex1: "a = Circle(1)\nb = Circle(1)\nc = a\nc.set_radius(4)\nb.set_radius(-2)\nprint(a.get_radius(), b.get_radius(), c.get_radius(), a is c, a is b)",
  ex1Out: "4 1 4 True False",
  ex2: "class Square:\n    def __init__(self, side):\n        side = side\n\n    def get_area(self):\n        return self.side * self.side",
  ex2Repl: ">>> Square(3).get_area()\nTraceback (most recent call last):\n  ...\nAttributeError: 'Square' object has no attribute 'side'",
  ex2Fix: "class Square:\n    def __init__(self, side):\n        self.side = side\n\n    def get_area(self):\n        return self.side * self.side",
  ex2FixRepl: ">>> Square(3).get_area()\n9",
  ex3: "def print_areas_safe(radius, times):\n    print(\"Radius\", \"Area\")\n    for r in range(radius, radius + times):\n        c = Circle(r)\n        print(c.get_radius(), round(c.get_area(), 2))",
  ex3Repl: ">>> print_areas_safe(1, 3)\nRadius Area\n1 3.14\n2 12.57\n3 28.27",
  ex4: "class Rectangle:\n    def __init__(self, width=1, height=2):\n        self.width = width\n        self.height = height\n\n    def get_area(self):\n        return self.width * self.height\n\n    def get_perimeter(self):\n        return 2 * (self.width + self.height)\n\n\ndef main():\n    for r in [Rectangle(4, 40), Rectangle(3.5, 35.7)]:\n        print(r.width, r.height, round(r.get_area(), 2), round(r.get_perimeter(), 2))\n\n\nmain()",
  ex4Out: "4 40 160 88\n3.5 35.7 124.95 78.4",
  ex4Repl: ">>> Rectangle().get_area()\n2",
  ex5: "class Stock:\n    def __init__(self, symbol, name, previous_closing_price, current_price):\n        self.__symbol = symbol\n        self.__name = name\n        self.__previous_closing_price = previous_closing_price\n        self.__current_price = current_price\n\n    def get_name(self):\n        return self.__name\n\n    def get_symbol(self):\n        return self.__symbol\n\n    def get_previous_closing_price(self):\n        return self.__previous_closing_price\n\n    def set_previous_closing_price(self, price):\n        self.__previous_closing_price = price\n\n    def get_current_price(self):\n        return self.__current_price\n\n    def set_current_price(self, price):\n        self.__current_price = price\n\n    def get_change_percent(self):\n        change = self.__current_price - self.__previous_closing_price\n        return change / self.__previous_closing_price * 100",
  ex5Repl: ">>> intel = Stock(\"INTC\", \"Intel Corporation\", 20.5, 20.35)\n>>> round(intel.get_change_percent(), 2)\n-0.73\n>>> intel.set_current_price(21.0)\n>>> round(intel.get_change_percent(), 2)\n2.44",
  ex6: "class Account:\n    def __init__(self, balance=0):\n        self.__balance = balance\n\n    def deposit(self, amount):\n        if amount > 0:\n            self.__balance += amount\n\n    def withdraw(self, amount):\n        if 0 < amount <= self.__balance:\n            self.__balance -= amount\n            return True\n        return False\n\n    def get_balance(self):\n        return self.__balance",
  ex6Repl: ">>> acct = Account()\n>>> acct.deposit(100)\n>>> acct.withdraw(30)\nTrue\n>>> acct.withdraw(500)\nFalse\n>>> acct.get_balance()\n70",
  ex7: "class Point:\n    def __init__(self, x=0, y=0):\n        self.x = x\n        self.y = y\n\n    def distance_to(self, other):\n        dx = self.x - other.x\n        dy = self.y - other.y\n        return math.sqrt(dx * dx + dy * dy)\n\n\ndef farthest(points, origin):\n    best = points[0]\n    for p in points:\n        if p.distance_to(origin) > best.distance_to(origin):\n            best = p\n    return best",
  ex7Repl: ">>> Point(0, 0).distance_to(Point(3, 4))\n5.0\n>>> far = farthest([Point(1, 1), Point(-6, 0), Point(2, 5)], Point())\n>>> far.x, far.y\n(-6, 0)",
};

// ---------- names, frames and objects (a small Python Tutor) ----------

// One snapshot of memory: frames (left) hold names; objects (right) hold fields.
// A name or field value is either a primitive shown as text ("5", "'Welcome'") or {ref: id}.
class Heap {
  constructor() {
    this.frames = [{ name: "global", vars: [] }];
    this.objects = [];
    this.out = [];
    this.snaps = [];
    this.n = 0;
  }
  obj(type, fields = [], list = null) {
    const o = { id: `o${this.n++}`, type, fields, list };
    this.objects.push(o);
    return o;
  }
  drop(o) { this.objects = this.objects.filter((x) => x !== o); }
  get top() { return this.frames[this.frames.length - 1]; }
  frame(name) { const f = { name, vars: [] }; this.frames.push(f); return f; }
  pop() { this.frames.pop(); }
  set(f, k, v) {
    const e = f.vars.find((x) => x[0] === k);
    if (e) e[1] = v; else f.vars.push([k, v]);
  }
  field(o, k, v) {
    const e = o.fields.find((x) => x[0] === k);
    if (e) e[1] = v; else o.fields.push([k, v]);
  }
  // line: [panel, line number] or 0; hl: {v: ["frame.name"], o: [id], f: ["id.field"]}
  snap(line, msg, msgCls = "", hl = {}) {
    this.snaps.push({
      line, msg, msgCls, hl,
      heap: JSON.parse(JSON.stringify({ frames: this.frames, objects: this.objects })),
      out: this.out.slice(),
    });
  }
}
const ref = (o) => ({ ref: o.id });

const HW = 400;
function heapSVG(h, hl = {}) {
  const FX = 4, FW = 156, OX = 226, OW = HW - OX - 4, ROW = 22, HEAD = 16, GAP = 12;
  const hv = new Set(hl.v || []), ho = new Set(hl.o || []), hf = new Set(hl.f || []);
  let g = "";
  const arrows = [];
  const mono = `font-family="var(--mono)" font-size="12"`;
  const sans = `font-family="var(--sans)" font-size="10.5"`;
  // Objects first, so arrows know where to point.
  const pos = {};
  let oy = 4;
  h.objects.forEach((o) => {
    const rows = o.list ? 1 : Math.max(o.fields.length, 1);
    const top = oy + HEAD, hgt = rows * ROW + 6;
    pos[o.id] = top + 11;
    const on = ho.has(o.id);
    g += `<text x="${OX + 2}" y="${top - 4}" ${sans} fill="var(--stone)">${esc(o.type)}</text>`;
    g += `<rect x="${OX}" y="${top}" width="${OW}" height="${hgt}" rx="6" fill="${on ? "var(--mark)" : "var(--card)"}" stroke="${on ? "var(--amber)" : "var(--amber)"}" stroke-opacity="${on ? 1 : 0.55}" stroke-width="${on ? 2 : 1.2}"/>`;
    if (o.list) {
      g += `<text x="${OX + 10}" y="${top + 3 + ROW / 2 + 4}" ${mono} fill="var(--ink)">${esc(o.list)}</text>`;
    } else if (!o.fields.length) {
      g += `<text x="${OX + 10}" y="${top + 3 + ROW / 2 + 4}" ${sans} fill="var(--stone)">(no fields yet)</text>`;
    }
    o.fields.forEach(([k, v], j) => {
      const ry = top + 3 + j * ROW;
      if (hf.has(`${o.id}.${k}`)) g += `<rect x="${OX + 3}" y="${ry}" width="${OW - 6}" height="${ROW}" rx="4" fill="var(--mark)"/>`;
      g += `<text x="${OX + 10}" y="${ry + ROW / 2 + 4}" ${mono} fill="var(--ink-2)">${esc(k)}</text>`;
      g += `<text x="${OX + OW - 10}" y="${ry + ROW / 2 + 4}" ${mono} text-anchor="end" fill="var(--ink)" font-weight="600">${esc(v)}</text>`;
    });
    oy = top + hgt + GAP;
  });
  let fy = 4;
  h.frames.forEach((f, fi) => {
    const rows = Math.max(f.vars.length, 1);
    const top = fy + HEAD, hgt = rows * ROW + 6;
    const isTop = fi === h.frames.length - 1 && h.frames.length > 1;
    g += `<text x="${FX + 2}" y="${top - 4}" ${sans} fill="var(--stone)">${esc(f.name === "global" ? "global frame" : f.name + " frame")}</text>`;
    g += `<rect x="${FX}" y="${top}" width="${FW}" height="${hgt}" rx="6" fill="${f.name === "global" ? "var(--paper)" : "var(--teal-soft)"}" stroke="${isTop ? "var(--teal)" : "var(--line)"}" stroke-width="${isTop ? 2 : 1.2}"/>`;
    if (!f.vars.length) g += `<text x="${FX + 10}" y="${top + 3 + ROW / 2 + 4}" ${sans} fill="var(--stone)">(no names yet)</text>`;
    f.vars.forEach(([k, v], j) => {
      const ry = top + 3 + j * ROW;
      const on = hv.has(`${f.name}.${k}`);
      if (on) g += `<rect x="${FX + 3}" y="${ry}" width="${FW - 6}" height="${ROW}" rx="4" fill="var(--mark)"/>`;
      g += `<text x="${FX + 10}" y="${ry + ROW / 2 + 4}" ${mono} fill="var(--ink)">${esc(k)}</text>`;
      if (v && typeof v === "object" && v.ref) {
        const x1 = FX + FW - 14, y1 = ry + ROW / 2;
        g += `<circle cx="${x1}" cy="${y1}" r="3" fill="${on ? "var(--amber)" : "var(--ink-2)"}"/>`;
        if (pos[v.ref] !== undefined) arrows.push({ x1, y1, y2: pos[v.ref], on });
      } else {
        g += `<text x="${FX + FW - 10}" y="${ry + ROW / 2 + 4}" ${mono} text-anchor="end" fill="var(--ink)" font-weight="600">${esc(v)}</text>`;
      }
    });
    fy = top + hgt + GAP;
  });
  arrows.forEach(({ x1, y1, y2, on }) => {
    const x2 = OX - 2, c = on ? "var(--amber)" : "var(--ink-2)";
    g += `<path d="M ${x1} ${y1} C ${x1 + 50} ${y1}, ${x2 - 45} ${y2}, ${x2} ${y2}" fill="none" stroke="${c}" stroke-width="${on ? 2 : 1.4}" marker-end="url(#hp-${on ? "on" : "off"})"/>`;
  });
  const H = Math.max(fy, oy, 60);
  return `<svg viewBox="0 0 ${HW} ${H}" role="img" aria-label="names and objects in memory">
    <defs>
      <marker id="hp-off" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink-2)"/></marker>
      <marker id="hp-on" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="var(--amber)"/></marker>
    </defs>${g}</svg>`;
}

// Step-through player for memory pictures. opts: panels() -> [{code, kind, title}],
// build() -> snaps, extraControls, onMount(root, rebuild), mini, showConsole.
function makeHeapStepper(el, opts) {
  const mini = !!opts.mini;
  el.innerHTML = `
    <div class="stepper heapstep${mini ? " mini" : ""}">
      <div><div class="hx-code"></div>${opts.showConsole && !mini ? `<div class="console hx-out"></div>` : ""}</div>
      <div class="svgbox hx-svg"></div>
    </div>
    ${mini ? "" : `<div class="msg hx-msg"></div>
    <div class="controls">
      <button class="cbtn hx-reset" title="Back to the start">⟲ Reset</button>
      <button class="cbtn hx-back" title="Step back (←)">◀ Back</button>
      <button class="cbtn hx-step on" title="Step (→)">Step ▶</button>
      <button class="cbtn hx-play">Play</button>
      ${opts.extraControls || ""}
      <span class="spacer"></span><span class="counter hx-count"></span>
    </div>`}`;
  const $ = (s) => el.querySelector(s);
  let snaps = [], i = 0, timer = null, panelLines = [];
  function renderCode() {
    if (mini) return;
    const panels = opts.panels();
    $(".hx-code").innerHTML = panels.map((p) => (p.title ? `<div class="counter" style="margin:6px 0 2px">${p.title}</div>` : "") +
      codeBlock(mini ? p.code.replace(/\s+#.*$/gm, "") : p.code, p.kind || "py")).join("");
    panelLines = [...el.querySelectorAll(".hx-code pre")].map((pre) => [...pre.querySelectorAll(".ln")]);
  }
  function render() {
    const s = snaps[i];
    if (mini) {
      // Mini players show only the line being run, above the picture.
      const src = s.line ? opts.panels()[s.line[0]] : null;
      const text = src ? src.code.split("\n")[s.line[1] - 1].replace(/\s+#.*$/, "").trim() : "";
      $(".hx-code").innerHTML = codeBlock(text || " ", src && src.kind === "repl" ? "repl" : "out");
    }
    panelLines.forEach((lines, p) => lines.forEach((ln, k) => ln.classList.toggle("hl", !!s.line && s.line[0] === p && k + 1 === s.line[1])));
    $(".hx-svg").innerHTML = heapSVG(s.heap, s.hl);
    if (mini) return;
    const msg = $(".hx-msg");
    msg.innerHTML = s.msg;
    msg.className = "msg hx-msg " + (s.msgCls || "");
    if (opts.showConsole) { const o = $(".hx-out"); o.textContent = s.out.join("\n"); o.scrollTop = o.scrollHeight; }
    $(".hx-count").textContent = `step ${i + 1} / ${snaps.length}`;
    $(".hx-back").disabled = $(".hx-reset").disabled = i === 0;
    $(".hx-step").disabled = i === snaps.length - 1;
  }
  function stop() { clearInterval(timer); timer = null; if (!mini) $(".hx-play").textContent = "Play"; }
  function play() {
    if (timer) return stop();
    if (i === snaps.length - 1) i = 0;
    if (!mini) $(".hx-play").textContent = "Pause";
    timer = setInterval(() => {
      if (i < snaps.length - 1) { i++; render(); }
      else if (mini) { i = 0; render(); }
      else stop();
    }, mini ? 1100 : 900);
  }
  function rebuild() { stop(); renderCode(); snaps = opts.build(); i = 0; render(); }
  if (!mini) {
    $(".hx-reset").onclick = () => { stop(); i = 0; render(); };
    $(".hx-back").onclick = () => { stop(); if (i > 0) i--; render(); };
    $(".hx-step").onclick = () => { stop(); if (i < snaps.length - 1) i++; render(); };
    $(".hx-play").onclick = play;
    el.tabIndex = 0;
    el.addEventListener("keydown", (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;
      if (e.key === "ArrowRight") { e.preventDefault(); $(".hx-step").click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); $(".hx-back").click(); }
    });
  }
  if (opts.onMount) opts.onMount(el, rebuild);
  rebuild();
  if (mini) play();
}

// Line number of the first line of `code` that contains `text` (1-based).
const lineOf = (code, text, from = 1) => {
  const lines = code.split("\n");
  for (let k = from - 1; k < lines.length; k++) if (lines[k].includes(text)) return k + 1;
  return 0;
};

// Python prints a whole float with ".0".
const pyFloat = (x) => (Number.isInteger(x) ? `${x}.0` : String(x));

// ---------- Demo: names are references ----------

function traceRefs() {
  const code = CODE.refsRepl + "\n" + CODE.refsAppend.split("\n").slice(3).join("\n");
  const L = (t, from = 1) => [0, lineOf(code, t, from)];
  const h = new Heap(), g = h.frames[0];
  const l1 = h.obj("list", [], "[1, 2]");
  h.set(g, "a", ref(l1));
  h.snap(L(">>> a = [1, 2]"), "Python makes a list object, then makes the name <code>a</code> refer to it: an arrow, not a box holding the list.", "", { v: ["global.a"], o: [l1.id] });
  h.set(g, "b", ref(l1));
  h.snap(L(">>> b = a"), "<code>b = a</code> copies the <b>arrow</b>. There is still only one list.", "", { v: ["global.b"] });
  h.snap(L(">>> id(a) == id(b)"), "Both names lead to the same object, so they give the same <code>id</code>: <b>True</b>.", "good", { v: ["global.a", "global.b"] });
  h.snap(L(">>> a is b"), "<code>is</code> asks exactly that: same object? <b>True</b>.", "good", { v: ["global.a", "global.b"] });
  const l2 = h.obj("list", [], "[1, 2]");
  h.set(g, "c", ref(l2));
  h.snap(L(">>> c = [1, 2]"), "A second list display makes a <b>second</b> list object, with equal values.", "", { v: ["global.c"], o: [l2.id] });
  h.snap(L(">>> c == a"), "<code>==</code> compares values: both are <code>[1, 2]</code>, so <b>True</b>.", "good", { o: [l1.id, l2.id] });
  h.snap(L(">>> c is a"), "<code>is</code> compares identity: two different objects, so <b>False</b>.", "bad", { v: ["global.a", "global.c"] });
  l1.list = "[1, 2, 3]";
  h.snap(L(">>> b.append(3)"), "<code>b.append(3)</code> changes the object <code>b</code> refers to…", "", { v: ["global.b"], o: [l1.id] });
  h.snap(L(">>> a", lineOf(code, ">>> b.append(3)")), "…which is the object <code>a</code> refers to. <code>a</code> is now <code>[1, 2, 3]</code>.", "good", { v: ["global.a"], o: [l1.id] });
  h.snap(L(">>> c", lineOf(code, ">>> b.append(3)")), "<code>c</code> is a different list, so it is still <code>[1, 2]</code>.", "", { v: ["global.c"], o: [l2.id] });
  return { code, snaps: h.snaps };
}

function demoRefs(el, { mini = false } = {}) {
  let r = traceRefs();
  makeHeapStepper(el, { mini, panels: () => [{ code: r.code, kind: "repl" }], build: () => (r = traceRefs()).snaps });
}

// ---------- Demo: one class, many instances ----------

function demoBlueprint(el, { mini = false } = {}) {
  const circles = mini ? [1, 25, 125] : [];
  let sel = 0, msg = "Pick a radius and press the button to make an instance of <code>Circle</code>.", cls = "";
  el.innerHTML = `<div class="svgbox bp-svg"></div>${mini ? "" : `<div class="msg bp-msg"></div>
    <div class="controls">
      <label>radius <input type="range" class="bp-r" min="1" max="200" value="25"> <b class="bp-rv mono">25</b></label>
      <button class="cbtn on bp-new">circleN = Circle(radius)</button>
      <select class="bp-sel"></select>
      <button class="cbtn bp-area">.get_area()</button>
      <button class="cbtn bp-set">.set_radius(100)</button>
      <button class="cbtn bp-reset">⟲ Reset</button>
    </div>`}`;
  const $ = (q) => el.querySelector(q);
  let hl = {};
  function heap() {
    const h = new Heap(), g = h.frames[0];
    const cl = h.obj("class", [["__init__", "function"], ["get_perimeter", "function"], ["get_area", "function"], ["set_radius", "function"]]);
    h.set(g, "Circle", ref(cl));
    circles.forEach((r, k) => {
      const o = h.obj("Circle instance", [["radius", String(r)]]);
      o.id = `c${k}`;
      h.set(g, `circle${k + 1}`, { ref: o.id });
    });
    return { frames: h.frames, objects: h.objects };
  }
  function render() {
    $(".bp-svg").innerHTML = heapSVG(heap(), hl);
    if (mini) return;
    $(".bp-msg").innerHTML = msg;
    $(".bp-msg").className = "msg bp-msg " + cls;
    $(".bp-sel").innerHTML = circles.map((r, k) => `<option value="${k}"${k === sel ? " selected" : ""}>circle${k + 1}</option>`).join("") || "<option>(no circles yet)</option>";
    $(".bp-new").textContent = `circle${circles.length + 1} = Circle(${$(".bp-r").value})`;
    $(".bp-new").disabled = circles.length >= 4;
    $(".bp-area").disabled = $(".bp-set").disabled = $(".bp-sel").disabled = !circles.length;
  }
  if (!mini) {
    $(".bp-r").oninput = (e) => { $(".bp-rv").textContent = e.target.value; render(); };
    $(".bp-new").onclick = () => {
      const r = +$(".bp-r").value;
      circles.push(r); sel = circles.length - 1;
      hl = { v: [`global.circle${circles.length}`], o: [`c${sel}`] };
      msg = `A new object, made from the same blueprint, with its <b>own</b> <code>radius = ${r}</code>. The methods stay in the class: every instance shares them.` +
        (circles.length >= 4 ? " (Four is enough for the picture.)" : ""); cls = "";
      render();
    };
    $(".bp-sel").onchange = (e) => { sel = +e.target.value; hl = { v: [`global.circle${sel + 1}`], o: [`c${sel}`] }; msg = `Selected <code>circle${sel + 1}</code>.`; cls = ""; render(); };
    $(".bp-area").onclick = () => {
      const r = circles[sel];
      hl = { v: [`global.circle${sel + 1}`], f: [`c${sel}.radius`] };
      msg = `<code>circle${sel + 1}.get_area()</code> runs the class's <code>get_area</code> with <code>self</code> = this object, so it reads <em>this</em> radius: ${r} * ${r} * math.pi = <b>${r * r * Math.PI}</b>`; cls = "good";
      render();
    };
    $(".bp-set").onclick = () => {
      circles[sel] = 100;
      hl = { f: [`c${sel}.radius`] };
      msg = `<code>circle${sel + 1}.set_radius(100)</code> changed one object. The other circles keep their own radius.`; cls = "";
      render();
    };
    $(".bp-reset").onclick = () => { circles.length = 0; sel = 0; hl = {}; msg = "Pick a radius and press the button to make an instance of <code>Circle</code>."; cls = ""; render(); };
  }
  render();
}

// ---------- Demo: constructing an object ----------

function traceConstruct(r) {
  const call = `>>> c = Circle(${r})`;
  const h = new Heap(), g = h.frames[0];
  const C = (t) => [0, lineOf(CODE.circle, t)];
  h.snap([1, 1], `<code>c = Circle(${r})</code>: Python works out the right-hand side first. Calling the class runs the <b>constructor</b>.`);
  const o = h.obj("Circle", []);
  h.snap([1, 1], "Constructor, step 1: a new, <b>empty</b> <code>Circle</code> object appears in memory. No data fields yet, and no name refers to it.", "", { o: [o.id] });
  const f = h.frame("__init__");
  h.set(f, "self", ref(o));
  h.set(f, "radius", String(r));
  h.snap(C("def __init__"), `Step 2: Python calls <code>__init__</code>. Its new frame has <code>self</code> → the new object, and <code>radius = ${r}</code> from the argument. You never pass <code>self</code> yourself.`, "", { v: ["__init__.self", "__init__.radius"] });
  h.field(o, "radius", String(r));
  h.snap(C("self.radius = radius"), `<code>self.radius = radius</code>: the <b>parameter</b> <code>radius</code> (in the frame) is copied into a <b>data field</b> <code>radius</code> (in the object that <code>self</code> refers to).`, "", { v: ["__init__.self"], f: [`${o.id}.radius`] });
  h.pop();
  h.snap(C("self.radius = radius"), "<code>__init__</code> ends. Its frame is thrown away, with the names <code>self</code> and <code>radius</code>. The object and its field stay.", "", { o: [o.id] });
  h.set(g, "c", ref(o));
  h.snap([1, 1], `The value of <code>Circle(${r})</code> is the new object, and <code>c</code> now refers to it.`, "good", { v: ["global.c"] });
  return { call, snaps: h.snaps };
}

function demoConstruct(el, { mini = false } = {}) {
  let r = 5, t = traceConstruct(r);
  makeHeapStepper(el, {
    mini,
    panels: () => [{ code: CODE.circle }, { code: t.call, kind: "repl", title: "in the shell" }],
    build: () => (t = traceConstruct(r)).snaps,
    extraControls: `<label>radius <input type="range" class="cs-r" min="1" max="9" value="${r}"> <b class="cs-rv mono">${r}</b></label>`,
    onMount(root, rebuild) {
      if (mini) return;
      root.querySelector(".cs-r").oninput = (e) => { r = +e.target.value; root.querySelector(".cs-rv").textContent = r; t = traceConstruct(r); rebuild(); };
    },
  });
}

// ---------- Demo: self in a method call ----------

function traceMethod(kind) {
  const h = new Heap(), g = h.frames[0];
  const C = (t) => [0, lineOf(CODE.circle, t)];
  if (kind === "set") {
    const R = (t) => [1, lineOf(CODE.setRadiusRepl, t)];
    const o1 = h.obj("Circle", [["radius", "3"]]);
    h.set(g, "c1", ref(o1));
    h.snap(R(">>> c1 = Circle(3)"), "<code>c1 = Circle(3)</code>: one object with its own <code>radius</code>.", "", { v: ["global.c1"], o: [o1.id] });
    const o2 = h.obj("Circle", [["radius", "4"]]);
    h.set(g, "c2", ref(o2));
    h.snap(R(">>> c2 = Circle(4)"), "<code>c2 = Circle(4)</code>: a second object, with a second <code>radius</code>.", "", { v: ["global.c2"], o: [o2.id] });
    const f = h.frame("set_radius");
    h.set(f, "self", ref(o2));
    h.set(f, "radius", "10");
    h.snap(C("def set_radius"), "<code>c2.set_radius(10)</code> is short for <code>Circle.set_radius(c2, 10)</code>. So <code>self</code> → the object <code>c2</code> refers to.", "", { v: ["set_radius.self", "global.c2"] });
    h.field(o2, "radius", "10");
    h.snap([0, lineOf(CODE.circle, "self.radius = radius", lineOf(CODE.circle, "def set_radius"))],
      "<code>self.radius = radius</code> changes the field of <b>that</b> object only.", "", { v: ["set_radius.self"], f: [`${o2.id}.radius`] });
    h.pop();
    h.snap(R(">>> c1.radius, c2.radius"), "The method returns; its frame is gone. <code>c1.radius, c2.radius</code> is <b>(3, 10)</b>.", "good", { f: [`${o1.id}.radius`, `${o2.id}.radius`] });
  } else {
    const R = (t) => [1, lineOf(CODE.getArea, t)];
    const o = h.obj("Circle", [["radius", "5"]]);
    h.set(g, "c", ref(o));
    h.snap(R(">>> c = Circle(5)"), "<code>c = Circle(5)</code>.", "", { v: ["global.c"] });
    const f = h.frame("get_area");
    h.set(f, "self", ref(o));
    h.snap(C("def get_area"), "<code>c.get_area()</code>: Python finds <code>get_area</code> in the class of <code>c</code> and calls it with <code>c</code> as the first argument: <code>self</code> → the same object.", "", { v: ["get_area.self", "global.c"] });
    h.snap([0, lineOf(CODE.circle, "return self.radius * self.radius")], "<code>self.radius</code> is 5, so it returns 5 * 5 * math.pi.", "", { v: ["get_area.self"], f: [`${o.id}.radius`] });
    h.pop();
    h.snap(R("78.53981633974483"), "It returns <b>78.53981633974483</b>. Writing <code>Circle.get_area(c)</code> does exactly the same.", "good");
  }
  return h.snaps;
}

function demoMethod(el) {
  let kind = "set";
  makeHeapStepper(el, {
    panels: () => [{ code: CODE.circle }, { code: kind === "set" ? CODE.setRadiusRepl : CODE.getArea, kind: "repl", title: "in the shell" }],
    build: () => traceMethod(kind),
    extraControls: `<select class="mc-k"><option value="set">c2.set_radius(10)</option><option value="area">c.get_area()</option></select>`,
    onMount(root, rebuild) { root.querySelector(".mc-k").onchange = (e) => { kind = e.target.value; rebuild(); }; },
  });
}

// ---------- Demo: instance variables vs local variables ----------

function traceScope() {
  const h = new Heap(), g = h.frames[0];
  const S = (t, from = 1) => [0, lineOf(CODE.scope, t, from)];
  const R = (t) => [1, lineOf(CODE.scopeRepl, t)];
  const o = h.obj("Scope", []);
  const fi = h.frame("__init__");
  h.set(fi, "self", ref(o));
  h.snap(S("def __init__"), "<code>s = Scope()</code>: a new object, and <code>__init__</code> runs with <code>self</code> → it.", "", { v: ["__init__.self"], o: [o.id] });
  h.field(o, "x", "1");
  h.snap(S("self.x = 1"), "<code>self.x = 1</code> stores <code>x</code> <b>in the object</b>.", "", { f: [`${o.id}.x`] });
  h.pop();
  h.set(g, "s", ref(o));
  h.snap(R(">>> s = Scope()"), "<code>__init__</code> is done; <code>s</code> refers to the object.", "", { v: ["global.s"] });
  const f2 = h.frame("m2");
  h.set(f2, "self", ref(o));
  h.snap(S("def m2"), "<code>s.m2()</code>: a frame for <code>m2</code>, with <code>self</code> → the same object.", "", { v: ["m2.self"] });
  h.set(f2, "u", "2");
  h.snap(S("u = self.x + 1"), "<code>self.x</code> was made in <code>__init__</code>, but it lives in the object, so <code>m2</code> can read it. <code>u</code> is a <b>local</b> variable of <code>m2</code>.", "", { v: ["m2.u"], f: [`${o.id}.x`] });
  const f1 = h.frame("m1");
  h.set(f1, "self", ref(o));
  h.snap(S("self.m1()"), "<code>self.m1()</code>: another method on the <b>same</b> object. Two frames, two <code>self</code> names, one object.", "", { v: ["m1.self", "m2.self"] });
  h.field(o, "y", "2");
  h.snap(S("self.y = 2"), "<code>self.y = 2</code> adds a second field to the object.", "", { f: [`${o.id}.y`] });
  h.set(f1, "z", "5");
  h.snap(S("z = 5"), "<code>z = 5</code> has no <code>self.</code>: it is a local variable in the <code>m1</code> frame.", "", { v: ["m1.z"] });
  h.pop();
  h.snap(S("return z"), "<code>m1</code> returns 5 (which <code>m2</code> ignores). Its frame goes, and <code>z</code> with it. <code>y</code> stays in the object.", "", { f: [`${o.id}.y`] });
  h.pop();
  h.snap(R(">>> s.m2()"), "<code>m2</code> returns <code>u</code>, which is <b>2</b>; its frame goes too.", "good");
  h.snap(R(">>> s.y"), "<code>s.y</code> is <b>2</b>: the field outlived the method that made it.", "good", { f: [`${o.id}.y`] });
  h.snap(R(">>> s.z"), "<code>s.z</code>: <code>AttributeError: 'Scope' object has no attribute 'z'</code>. <code>z</code> was never in the object.", "bad", { o: [o.id] });
  return h.snaps;
}

function demoScope(el, { mini = false } = {}) {
  makeHeapStepper(el, { mini, panels: () => [{ code: CODE.scope }, { code: CODE.scopeRepl, kind: "repl", title: "in the shell" }], build: traceScope });
}

// ---------- Demo: two TVs ----------

function demoTV(el) {
  const fresh = () => ({ channel: 1, volume_level: 1, on: false });
  let tvs = [fresh(), fresh()], who = 0, slide = false, hl = {}, log = [], line = 0;
  el.innerHTML = `<div class="controls" style="margin-top:0">
      <select class="tv-who"><option value="0">tv1</option><option value="1">tv2</option></select>
      <button class="cbtn" data-m="turn_on">turn_on()</button><button class="cbtn" data-m="turn_off">turn_off()</button>
      <button class="cbtn" data-m="channel_up">channel_up()</button><button class="cbtn" data-m="channel_down">channel_down()</button>
      <button class="cbtn" data-m="volume_up">volume_up()</button><button class="cbtn" data-m="volume_down">volume_down()</button>
    </div>
    <div class="controls">
      <label>set_channel(<input type="number" class="tv-ch" value="30">)</label><button class="cbtn tv-setch">call</button>
      <label>set_volume(<input type="number" class="tv-vol" value="3">)</label><button class="cbtn tv-setvol">call</button>
      <label><input type="checkbox" class="tv-slide"> slide's set_channel</label>
      <button class="cbtn tv-main">run main()</button><button class="cbtn tv-reset">⟲ Reset</button>
    </div>
    <div class="msg tv-msg"></div>
    <div class="stepper heapstep" style="margin-top:12px"><div><div class="tv-code"></div><div class="console tv-out"></div></div><div class="svgbox tv-svg"></div></div>`;
  const $ = (q) => el.querySelector(q);
  const code = () => (slide ? CODE.slideTv : CODE.tv);
  function render(msg = "", cls = "") {
    const h = new Heap(), g = h.frames[0];
    tvs.forEach((t, k) => {
      const o = h.obj("TV", [["channel", String(t.channel)], ["volume_level", String(t.volume_level)], ["on", t.on ? "True" : "False"]]);
      o.id = `tv${k}`;
      h.set(g, `tv${k + 1}`, { ref: o.id });
    });
    $(".tv-svg").innerHTML = heapSVG({ frames: h.frames, objects: h.objects }, hl);
    $(".tv-code").innerHTML = codeBlock(code(), "py", line ? [line] : []);
    const o = $(".tv-out"); o.textContent = log.join("\n"); o.scrollTop = o.scrollHeight;
    $(".tv-msg").innerHTML = msg || "Pick <code>tv1</code> or <code>tv2</code>, then press its buttons. Each call runs one method with <code>self</code> → that TV.";
    $(".tv-msg").className = "msg tv-msg " + cls;
    el.querySelectorAll("[data-m]").forEach((b) => { b.disabled = slide; });
    $(".tv-setvol").disabled = slide;
  }
  // Run one method on tvs[k]; returns a sentence about what happened.
  function call(k, m, arg) {
    const t = tvs[k], name = `tv${k + 1}`, before = { ...t };
    line = lineOf(code(), `def ${m}(`);
    if (m === "turn_on") t.on = true;
    if (m === "turn_off") t.on = false;
    if (m === "set_channel") {
      const ok = slide ? t.on && t.channel >= 1 && t.channel <= 120 : t.on && arg >= 1 && arg <= 120;
      if (ok) t.channel = arg;
    }
    if (m === "set_volume" && t.on && arg >= 1 && arg <= 7) t.volume_level = arg;
    if (m === "channel_up" && t.on && t.channel < 120) t.channel += 1;
    if (m === "channel_down" && t.on && t.channel > 1) t.channel -= 1;
    if (m === "volume_up" && t.on && t.volume_level < 7) t.volume_level += 1;
    if (m === "volume_down" && t.on && t.volume_level > 1) t.volume_level -= 1;
    const changed = Object.keys(t).filter((f) => t[f] !== before[f]);
    hl = { v: [`global.${name}`], f: changed.map((f) => `tv${k}.${f}`) };
    log.push(`${name}.${m}(${arg === undefined ? "" : arg})`);
    if (changed.length) return { msg: `<code>self</code> → <code>${name}</code>: its <code>${changed.join("</code>, <code>")}</code> changed. The other TV is untouched.`, cls: slide && m === "set_channel" && (arg < 1 || arg > 120) ? "bad" : "" };
    if (!t.on && m !== "turn_off") return { msg: `Nothing changed: <code>${name}</code> is off, and every button checks <code>self.on</code> first.`, cls: "" };
    return { msg: `Nothing changed: the value would leave its allowed range.`, cls: "" };
  }
  el.querySelectorAll("[data-m]").forEach((b) => { b.onclick = () => { const r = call(who, b.dataset.m); render(r.msg, r.cls); }; });
  $(".tv-who").onchange = (e) => { who = +e.target.value; hl = { v: [`global.tv${who + 1}`] }; render(); };
  $(".tv-setch").onclick = () => {
    const v = Math.trunc(+$(".tv-ch").value || 0);
    const r = call(who, "set_channel", v);
    if (slide && tvs[who].channel === v && (v < 1 || v > 120)) r.msg = `Channel ${v} got through! The slide's check tests <code>self.channel</code>, the <b>old</b> channel, which is always valid. Check the argument instead.`;
    render(r.msg, slide && (v < 1 || v > 120) && tvs[who].channel === v ? "bad" : r.cls);
  };
  $(".tv-setvol").onclick = () => { const r = call(who, "set_volume", Math.trunc(+$(".tv-vol").value || 0)); render(r.msg, r.cls); };
  $(".tv-slide").onchange = (e) => {
    slide = e.target.checked; tvs = [fresh(), fresh()]; tvs[0].on = tvs[1].on = slide; log = []; hl = {}; line = 0;
    render(slide ? "This is <code>SlideTV</code> from the note: it only has <code>set_channel</code>, starts switched on, and checks the old channel. Try <code>set_channel(500)</code>." : "");
  };
  $(".tv-main").onclick = () => {
    if (slide) { $(".tv-slide").checked = false; slide = false; }
    tvs = [fresh(), fresh()]; log = [];
    call(0, "turn_on"); call(0, "set_channel", 30); call(0, "set_volume", 3);
    call(1, "turn_on"); call(1, "channel_up"); call(1, "channel_up"); call(1, "volume_up");
    log.push(...CODE.tvOut.split("\n"));
    hl = { f: ["tv0.channel", "tv0.volume_level", "tv1.channel", "tv1.volume_level"] }; line = 0;
    render("The note's <code>main()</code>: the same seven calls, and the same two lines of output.", "good");
  };
  $(".tv-reset").onclick = () => { tvs = [fresh(), fresh()]; tvs[0].on = tvs[1].on = slide; log = []; hl = {}; line = 0; render(); };
  render();
}

// ---------- Demo: changing the object or rebinding the name ----------

function traceCount(kind) {
  const h = new Heap(), g = h.frames[0];
  if (kind === "m") {
    const P = (t, from = 1) => [0, lineOf(CODE.count, t, from)];
    const fm = h.frame("main");
    h.snap(P("main()", lineOf(CODE.count, "c = Count(5)")), "<code>main()</code> starts: a frame for <code>main</code>.");
    const o = h.obj("Count", [["count", "0"]]);
    h.set(fm, "c", ref(o));
    h.snap(P("c = Count()"), "<code>c = Count()</code>: an object with <code>count = 0</code> (the default).", "", { v: ["main.c"], o: [o.id] });
    h.set(fm, "n", "1");
    h.snap(P("n = 1"), "<code>n = 1</code>.", "", { v: ["main.n"] });
    const f = h.frame("m");
    h.set(f, "c", ref(o));
    h.set(f, "n", "1");
    h.snap(P("def m(c, n)"), "<code>m(c, n)</code>: <code>m</code>'s parameters refer to the <b>same</b> objects as <code>main</code>'s names. Same names, different frames.", "", { v: ["m.c", "m.n", "main.c"] });
    const o5 = h.obj("Count", [["count", "5"]]);
    h.set(f, "c", ref(o5));
    h.snap(P("c = Count(5)"), "<code>c = Count(5)</code> makes a <b>new</b> object and moves <code>m</code>'s arrow <code>c</code> to it. <code>main</code>'s <code>c</code> does not move.", "", { v: ["m.c"], o: [o5.id] });
    h.set(f, "n", "3");
    h.snap(P("n = 3"), "<code>n = 3</code> changes <code>m</code>'s <code>n</code> only.", "", { v: ["m.n"] });
    h.pop(); h.drop(o5);
    h.snap(P("m(c, n)"), "<code>m</code> returns: its frame is thrown away, and nothing refers to <code>Count(5)</code> any more, so Python discards it too.", "", { v: ["main.c", "main.n"] });
    h.out.push("count is 0");
    h.snap(P('print("count is"'), "Prints <b>count is 0</b>.", "good", { f: [`${o.id}.count`] });
    h.out.push("n is 1");
    h.snap(P('print("n is"'), "Prints <b>n is 1</b>. Nothing <code>m</code> did reached <code>main</code>.", "good", { v: ["main.n"] });
  } else {
    const M = (t) => [1, lineOf(CODE.m2, t)];
    const R = (t) => [2, lineOf(CODE.m2Repl, t)];
    const o = h.obj("Count", [["count", "0"]]);
    h.set(g, "c", ref(o));
    h.snap(R(">>> c = Count()"), "<code>c = Count()</code>.", "", { v: ["global.c"], o: [o.id] });
    h.set(g, "n", "1");
    h.snap(R(">>> n = 1"), "<code>n = 1</code>.", "", { v: ["global.n"] });
    const f = h.frame("m2");
    h.set(f, "c", ref(o));
    h.set(f, "n", "1");
    h.snap(M("def m2"), "<code>m2(c, n)</code>: the parameters refer to the caller's objects.", "", { v: ["m2.c", "global.c"] });
    h.field(o, "count", "5");
    h.snap(M("c.count = 5"), "<code>c.count = 5</code> goes <b>through</b> the arrow and changes the object itself. That object is also the caller's.", "", { v: ["m2.c"], f: [`${o.id}.count`] });
    h.set(f, "n", "3");
    h.snap(M("n = 3"), "<code>n = 3</code> only moves <code>m2</code>'s own name.", "", { v: ["m2.n"] });
    h.pop();
    h.snap(R(">>> c.count"), "After the call, <code>c.count</code> is <b>5</b>: the caller sees the change to the object…", "good", { f: [`${o.id}.count`] });
    h.snap(R(">>> n"), "…but <code>n</code> is still <b>1</b>.", "good", { v: ["global.n"] });
  }
  return h.snaps;
}

function demoCount(el, { mini = false } = {}) {
  let kind = "m";
  makeHeapStepper(el, {
    mini, showConsole: true,
    panels: () => (kind === "m" ? [{ code: CODE.count }] : [{ code: CODE.count.split("\n").slice(0, 3).join("\n") }, { code: CODE.m2 }, { code: CODE.m2Repl, kind: "repl", title: "in the shell" }]),
    build: () => traceCount(kind),
    extraControls: `<select class="ct-k"><option value="m">m: c = Count(5)</option><option value="m2">m2: c.count = 5</option></select>`,
    onMount(root, rebuild) { if (!mini) root.querySelector(".ct-k").onchange = (e) => { kind = e.target.value; rebuild(); }; },
  });
}

// ---------- Demo: private names and name mangling ----------

function demoMangle(el) {
  let st;
  const reset = () => { st = { radius: 5, extra: null }; };
  reset();
  const cmds = [
    ["c = Circle(5)", "def __init__"],
    ["c.get_radius()", "def get_radius"],
    ["c.set_radius(-3)", "def set_radius"],
    ["c.set_radius(8)", "def set_radius"],
    ["c.__radius", ""],
    ["c._Circle__radius", ""],
    ["vars(c)", ""],
    ["c.__radius = 10", ""],
  ];
  el.innerHTML = `<div class="controls" style="margin-top:0">${cmds.map(([c], k) => `<button class="cbtn mono" data-k="${k}">${esc(c)}</button>`).join("")}</div>
    <div class="msg mg-msg"></div>
    <div class="stepper heapstep" style="margin-top:12px"><div><div class="console mg-out" style="margin-top:0"></div><div class="mg-code" style="margin-top:10px"></div></div><div class="svgbox mg-svg"></div></div>`;
  const $ = (q) => el.querySelector(q);
  let log = [">>> c = Circle(5)"], line = 0, hl = {};
  const fieldsRepr = () => `{'_Circle__radius': ${st.radius}${st.extra !== null ? `, '__radius': ${st.extra}` : ""}}`;
  function render(msg, cls = "") {
    const h = new Heap(), g = h.frames[0];
    const fields = [["_Circle__radius", String(st.radius)]];
    if (st.extra !== null) fields.push(["__radius", String(st.extra)]);
    const o = h.obj("Circle", fields);
    h.set(g, "c", ref(o));
    $(".mg-svg").innerHTML = heapSVG({ frames: h.frames, objects: h.objects }, hl);
    $(".mg-code").innerHTML = codeBlock(CODE.privCircle, "py", line ? [line] : []);
    const out = $(".mg-out"); out.textContent = log.join("\n"); out.scrollTop = out.scrollHeight;
    $(".mg-msg").innerHTML = msg;
    $(".mg-msg").className = "msg mg-msg " + cls;
  }
  el.querySelectorAll("[data-k]").forEach((b) => {
    b.onclick = () => {
      const [cmd, def] = cmds[+b.dataset.k];
      line = def ? lineOf(CODE.privCircle, def) : 0;
      log.push(">>> " + cmd);
      let msg = "", cls = "";
      hl = {};
      if (cmd === "c = Circle(5)") {
        reset(); log = [">>> c = Circle(5)"];
        msg = "Inside the class, <code>self.__radius</code> is renamed <code>self._Circle__radius</code>. That is the field's real name in the object.";
        hl = { f: ["o0._Circle__radius"] };
      } else if (cmd === "c.get_radius()") {
        log.push(String(st.radius));
        msg = `The method is inside the class, so its <code>self.__radius</code> means <code>_Circle__radius</code>: <b>${st.radius}</b>.`; cls = "good";
        hl = { f: ["o0._Circle__radius"] };
      } else if (cmd.startsWith("c.set_radius")) {
        const v = +cmd.match(/-?\d+/)[0];
        if (v >= 0) { st.radius = v; hl = { f: ["o0._Circle__radius"] }; msg = `<code>set_radius</code> checked the argument and changed the field to ${v}.`; cls = "good"; }
        else { msg = "<code>set_radius</code> checks its argument: −3 is rejected, the field keeps its value. This is why data goes through methods."; }
      } else if (cmd === "c.__radius") {
        if (st.extra === null) {
          log.push("Traceback (most recent call last):", "  ...", "AttributeError: 'Circle' object has no attribute '__radius'. Did you mean: 'get_radius'?");
          msg = "Outside the class nothing is renamed, so Python looks for a field literally called <code>__radius</code>. There is none.";
          cls = "bad";
        } else {
          log.push(String(st.extra));
          msg = `It finds the <b>new</b> field <code>__radius</code> (${st.extra}) that the assignment made, not the circle's radius.`; cls = "bad";
          hl = { f: ["o0.__radius"] };
        }
      } else if (cmd === "c._Circle__radius") {
        log.push(String(st.radius));
        msg = "Using the mangled name, code outside the class can read it after all. A private name is a <b>convention</b>, not a lock."; cls = "bad";
        hl = { f: ["o0._Circle__radius"] };
      } else if (cmd === "vars(c)") {
        log.push(fieldsRepr());
        msg = "<code>vars(c)</code> shows the object's fields under their real names.";
        hl = { o: ["o0"] };
      } else {
        st.extra = 10;
        msg = "No error, but this did not touch the radius: outside the class, <code>c.__radius = 10</code> <b>adds a new field</b> named <code>__radius</code>. Try <code>c.get_radius()</code>.";
        cls = "bad"; hl = { f: ["o0.__radius"] };
      }
      render(msg, cls);
    };
  });
  render("Press the buttons in any order. The object on the right shows the fields as Python really stores them.");
}

// ---------- Demo: using a class through its contract ----------

function bmiOf(weight, height) {
  const KILOGRAMS_PER_POUND = 0.45359237, METERS_PER_INCH = 0.0254;
  const heightM = height * METERS_PER_INCH;
  const bmi = (weight * KILOGRAMS_PER_POUND) / (heightM * heightM);
  return Math.round(bmi * 100) / 100;
}
const bmiStatus = (b) => (b < 18.5 ? "Underweight" : b < 25 ? "Normal" : b < 30 ? "Overweight" : "Obese");

function demoBMI(el) {
  let open = false;
  el.innerHTML = `<div class="controls" style="margin-top:0">
      <label>name <input type="text" class="bm-name" value="John Doe" style="width:110px"></label>
      <label>age <input type="number" class="bm-age" value="18"></label>
      <label>weight (lb) <input type="number" class="bm-w" value="145"></label>
      <label>height (in) <input type="number" class="bm-h" value="70"></label>
    </div>
    <div class="controls"><button class="cbtn" data-p="0">John Doe</button><button class="cbtn" data-p="1">Peter King</button>
      <label><input type="checkbox" class="bm-open"> open the black box</label></div>
    <div class="console bm-out"></div>
    <div class="bm-box" style="margin-top:12px"></div>`;
  const $ = (q) => el.querySelector(q);
  const presets = [["John Doe", 18, 145, 70], ["Peter King", 50, 215, 70]];
  function render() {
    const name = $(".bm-name").value, w = +$(".bm-w").value, h = +$(".bm-h").value;
    let line;
    if (!(w > 0 && h > 0)) line = "(weight and height must be positive)";
    else { const b = bmiOf(w, h); line = `The BMI for ${name} is ${pyFloat(b)} ${bmiStatus(b)}`; }
    $(".bm-out").textContent = line;
    $(".bm-box").innerHTML = open
      ? `<div class="counter">the implementation (you never need to read it)</div>${codeBlock(CODE.bmi, "py", [lineOf(CODE.bmi, "def get_bmi"), lineOf(CODE.bmi, "def get_status")])}`
      : `<div class="counter">the contract: all a user of the class needs</div>${codeBlock(CODE.bmiUml, "out")}`;
  }
  el.querySelectorAll("input").forEach((i) => { i.oninput = render; });
  $(".bm-open").onchange = (e) => { open = e.target.checked; render(); };
  el.querySelectorAll("[data-p]").forEach((b) => {
    b.onclick = () => {
      const [n, a, w, h] = presets[+b.dataset.p];
      $(".bm-name").value = n; $(".bm-age").value = a; $(".bm-w").value = w; $(".bm-h").value = h; render();
    };
  });
  render();
}

function demoLoan(el) {
  el.innerHTML = `<div class="controls" style="margin-top:0">
      <label>annual rate % <input type="number" class="ln-r" value="2.5" step="0.25"></label>
      <label>years <input type="number" class="ln-y" value="5"></label>
      <label>amount <input type="number" class="ln-a" value="1000" style="width:90px"></label>
      <label>borrower <input type="text" class="ln-b" value="John Jones" style="width:110px"></label>
    </div><div class="console ln-out"></div>`;
  const $ = (q) => el.querySelector(q);
  function render() {
    const rate = +$(".ln-r").value, years = Math.trunc(+$(".ln-y").value), amount = +$(".ln-a").value;
    if (!(rate > 0 && years > 0 && amount > 0)) { $(".ln-out").textContent = "(rate, years and amount must be positive)"; return; }
    const mr = rate / 1200;
    const monthly = (amount * mr) / (1 - 1 / (1 + mr) ** (years * 12));
    const total = monthly * years * 12;
    $(".ln-out").textContent = `The loan is for ${$(".ln-b").value}\nThe monthly payment is ${monthly.toFixed(2)}\nThe total payment is ${total.toFixed(2)}`;
  }
  el.querySelectorAll("input").forEach((i) => { i.oninput = render; });
  render();
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
  refs: (el) => demoRefs(el),
  refsMini: (el) => demoRefs(el, { mini: true }),
  blueprint: (el) => demoBlueprint(el),
  blueprintMini: (el) => demoBlueprint(el, { mini: true }),
  construct: (el) => demoConstruct(el),
  constructMini: (el) => demoConstruct(el, { mini: true }),
  method: (el) => demoMethod(el),
  scope: (el) => demoScope(el),
  scopeMini: (el) => demoScope(el, { mini: true }),
  tv: (el) => demoTV(el),
  count: (el) => demoCount(el),
  countMini: (el) => demoCount(el, { mini: true }),
  mangle: (el) => demoMangle(el),
  bmi: (el) => demoBMI(el),
  loan: (el) => demoLoan(el),
  quiz: (el) => demoQuiz(el, QUIZ),
};
