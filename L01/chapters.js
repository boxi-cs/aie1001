// Chapter content, adapted from notes/L01-computers-and-numbers.md. Code is copied from the note.

const demo = (name, title, instr, hint = "") =>
  `<div class="card demo" data-demo="${name}"><div class="head"><span class="title">${title}</span><span>${instr}</span></div>
   <div class="demo-body"></div>${hint ? `<p class="hint">${hint}</p>` : ""}</div>`;

const callout = (kind, label, body) => `<div class="callout ${kind}"><b>${label}</b>${body}</div>`;
const predict = (q, a) => callout("predict", "PREDICT", `<p>${q}</p><details class="reveal"><summary>Show the answer</summary>${a}</details>`);
const VIDEO_P1 = "media/L01-1.mp4";
const VIDEO_P2 = "media/L01-2.mp4";
const VIDEO_P3 = "media/L01-3.mp4";
const VIDEO_P4 = "media/L01-4.mp4";
const N = (digits, base) => `(${digits})<sub>${base}</sub>`;

const LECTURE = {
  number: 1,
  title: "Computers and Number Systems",
  tagline: "What the machine is, and how it stores numbers",
  lead: "From the CPU's fetch–decode–execute cycle to binary, octal and hexadecimal — interactive notes where every conversion can be stepped through digit by digit, and every example can be changed.",
  heroDemo: "counterMini",
  heroLabel: "A binary odometer · counting from 0",
  heroCaption: "When a digit passes 1 it resets to 0 and carries 1 to the left: 逢二进一.",
  whyTitle: "Why start here",
  whySub: "Three ideas every later lecture stands on",
  why: [
    ["A picture of the machine", "A program is instructions in <b>memory</b>; the <b>CPU</b> fetches and executes them, one at a time, without guessing what you meant."],
    ["A ladder of languages", "Python sits on top of C, assembly and <b>machine code</b>. Higher is faster to write; lower is faster to run."],
    ["Everything is bits", "Numbers, text and programs are stored in <b>binary</b>. Knowing how explains why <code>0.1 + 0.2</code> is not <code>0.3</code>."],
  ],
  ctaTitle: "Ready to look inside the machine?",
  minutes: "About 60–90 minutes",
  videos: {
    [VIDEO_P1]: "Lecture 1 · Part 1 — How a computer runs a program (9 min)",
    [VIDEO_P2]: "Lecture 1 · Part 2 — From Python down to binary (9 min)",
    [VIDEO_P3]: "Lecture 1 · Part 3 — Converting to and from decimal (8 min)",
    [VIDEO_P4]: "Lecture 1 · Part 4 — Hex, bytes and memory (8 min)",
  },
};

const CHAPTERS = [
  {
    slug: "1-why", nav: "Why", title: "Why Learn Programming",
    subtitle: "The course, the AI era, and the big picture",
    abstract: "AI can now write a lot of code. You still need to read it, check it and tell a computer precisely what you mean — and that is programming.",
    tags: ["course", "AI era", "CS and AI"],
    hero: "bigPictureMini", heroCaption: "Computer science and AI, built up layer by layer.",
    sections: [
      { id: "video", title: "Watch: how a computer runs a program", html: `
        <p>The first video of this lecture covers Chapters 1 and 2: why programming still matters, what a program is, the parts of a computer, and the fetch–decode–execute cycle.</p>
        <div class="card video" data-video="${VIDEO_P1}"></div>` },
      { id: "course", title: "The course in one page", html: `
        <p>AIE1001 teaches the basics of programming in Python: the key programming concepts, the basic parts of a computer system, problem solving and simple algorithm design, and, at the end, writing small AI applications in Python. The weeks run roughly as follows:</p>
        <table><tr><th>Week</th><th>Topic</th></tr>
        <tr><td>1</td><td>Modern computers; what you need to know before programming</td></tr>
        <tr><td>2</td><td>Python basics: data types, operators, input and output</td></tr>
        <tr><td>3</td><td>Flow control and loops</td></tr><tr><td>4</td><td>Functions</td></tr>
        <tr><td>5</td><td>Lists, dictionaries, tuples</td></tr><tr><td>6</td><td>Recursion and algorithm design</td></tr>
        <tr><td>7</td><td>Review and midterm</td></tr><tr><td>8–9</td><td>Object-oriented programming</td></tr>
        <tr><td>10</td><td>Data structures</td></tr><tr><td>11–12</td><td>AI applications: images, natural language</td></tr>
        <tr><td>13</td><td>Programming in the era of AI</td></tr><tr><td>14</td><td>Review</td></tr></table>
        <p>Assessment: assignments 40% (an online-judge quiz 2%, then four assignments of 8%, 10%, 10% and 10%), a midterm quiz 20%, and a final exam 40%. Each week has two lectures and one 50-minute tutorial; tutorials start in week 2, and the first one shows you the Online Judge used to submit most assignments. For assignment questions, contact the TA named on that assignment first.</p>
        <p>Recommended reading: the Python documentation (<a href="https://docs.python.org/3/" target="_blank" rel="noopener">docs.python.org</a>), the free online book <em>Composing Programs</em> (<a href="https://www.composingprograms.com/" target="_blank" rel="noopener">composingprograms.com</a>), and Mark Lutz, <em>Learning Python</em>, 5th edition (O'Reilly). And, used well, an AI assistant: see <em>Working with AI</em> in the last chapter.</p>` },
      { id: "why", title: "Why learn programming?", html: `
        <p>AI systems can now generate voice, video and code. In September 2025, an OpenAI system solved all 12 problems of the ICPC World Finals problem set, a result at the level of a gold medal. So why learn to program?</p>
        <ol><li><b>AI does not yet handle the hardest tasks reliably.</b> Benchmarks built from competitive programming (such as <em>LiveCodeBench Pro</em>, judged by olympiad medallists) still find problems that models fail, and building large, complex software is much harder than solving one contest problem. This is changing fast; check the current results when you read this.</li>
        <li><b>You must understand AI's code before you use it.</b> Code that looks right can be wrong, insecure or subtly different from what you asked. Research on <em>emergent misalignment</em> even found that fine-tuning a model on a narrow task (writing insecure code) made it misbehave on unrelated questions. Somebody has to read and check the code, and that somebody needs to know how to program.</li>
        <li><b>Computers do not understand what we say.</b> A computer is built to help people solve problems, but it only follows instructions written precisely, in a language it can run: a <b>programming language</b> such as assembly, C, C++, Java or Python.</li></ol>
        <p>Programming is not only for software engineers. An electrical engineer writes control programs, an economist builds mathematical models, a salesperson analyses sales data. And software and AI are themselves huge industries: a professional programmer — someone who writes programs and develops software for a living — is well paid.</p>
        ${callout("note", "NOTE", `<p>“AI can write code, so I don't need to learn” has the same shape as “calculators can multiply, so I don't need to learn arithmetic”. You still need to know what an answer should look like to notice that it is wrong. This course asks you to do both: use AI, and check it.</p>`)}` },
      { id: "big-picture", title: "Computer science and AI: the big picture", html: `
        <p>Computer science stands on mathematics: probability and statistics, linear algebra, calculus, discrete mathematics. On top of that it has two broad halves:</p>
        <ul><li><b>Making computers better and easier to use</b> (the “hardware and systems” side): computer architecture, operating systems, databases, computer networks, programming languages and compilers, software engineering.</li>
        <li><b>Using computers to solve real-world problems</b> (the “applications” side): natural language processing, computer vision, robotics, security, information retrieval, and many more.</li></ul>
        <p><b>Machine learning</b> sits between the two, and <b>AI</b> now runs through all of it, in both directions: <b>AI for X</b> uses AI to do another field's work better (AI for robotics, AI for software engineering), and <b>X for AI</b> uses another field to build AI better (new hardware and systems to train large models).</p>
        ${demo("bigPicture", "Demo 1 · The big picture", "step through it (← →)", "This is the picture the slides build in three steps. Each later lecture of the course lives somewhere on it.")}` },
    ],
    takeaways: ["AI writes code; you must still read and check it.", "Computers follow precise instructions only.", "CS: systems + applications on maths; AI runs through both."],
  },
  {
    slug: "2-machine", nav: "Machine", title: "Programs and the Machine",
    subtitle: "What a program is, and how the CPU runs it",
    abstract: "A program is a sequence of instructions stored in memory. The CPU fetches one, decodes it, executes it, and repeats — billions of times a second.",
    tags: ["program", "von Neumann", "CPU", "fetch–decode–execute"],
    hero: "machineMini", heroCaption: "A toy CPU adds 2 and 3, one cycle at a time.",
    sections: [
      { id: "program", title: "What is a program?", html: `
        <p>A <b>program</b> (also called <b>code</b> or <b>software</b>) is a sequence of instructions. The computer takes the instructions and <b>executes</b> them, one after another. A program is a little piece of our intelligence put into the computer, and like a recipe it can be reused as many times as we like.</p>
        <p>Humans follow programs too. Here is one for a dance:</p>
        ${codeBlock(CODE.dance, "out")}
        <p>Humans easily make mistakes when they follow a long list of instructions. Computers, on the contrary, (almost) never do, whether they are given 10 instructions or 10 billion. What a computer <em>cannot</em> do is guess what you meant. If the instructions are wrong, the computer follows the wrong instructions perfectly.</p>
        ${callout("pitfall", "PITFALL", `<p><b>“The computer understands what I want.”</b> It does not. It does exactly what the program says, which may not be what you meant. When a program misbehaves, the question is never “why did the computer do that?” but “which instruction told it to?” Learning to program is learning to say precisely what you mean.</p>`)}` },
      { id: "hardware", title: "Hardware and the von Neumann architecture", html: `
        <p>A computer is <b>hardware</b> (the physical machine) running <b>software</b> (programs). Almost every computer today — laptop, phone, server — follows the design described by <b>John von Neumann</b> in 1945, the <b>von Neumann architecture</b>. Its key idea is the <b>stored program</b>: the program's instructions are kept in memory, as data, right next to the data they work on. To run a different program, you load different instructions into memory; you do not rewire the machine.</p>
        <p>The theoretical foundation came earlier, from <b>Alan Turing</b>, the father of theoretical computer science and artificial intelligence. His work on computability (what can be computed at all) and the <b>Turing test</b> (can a machine's conversation be told apart from a human's?) still frames the questions AI asks today.</p>` },
      { id: "components", title: "The key components", html: `
        <table><tr><th>Component</th><th>What it does</th></tr>
        <tr><td><b>CPU</b> (central processing unit)</td><td>Executes your program. Like a brain: very fast, but not smart — it only follows instructions.</td></tr>
        <tr><td><b>Main memory</b> (RAM)</td><td>Stores the running program and its data. Fast, but temporary: its contents are lost when the power goes off.</td></tr>
        <tr><td><b>Secondary storage</b> (disk, SSD, flash)</td><td>Slower but much larger, and permanent: your files and installed programs live here.</td></tr>
        <tr><td><b>Input devices</b></td><td>Take input from users or other devices: keyboard, mouse, touch screen, microphone.</td></tr>
        <tr><td><b>Output devices</b></td><td>Send information to users or other devices: screen, speakers, printer.</td></tr></table>
        <p>The CPU itself has two units:</p>
        <ul><li>The <b>control unit (CU)</b> fetches the next instruction from memory and works out what it asks for.</li>
        <li>The <b>arithmetic/logic unit (ALU)</b> contains the circuits that carry it out: adding, comparing, and so on.</li></ul>
        <p>CPUs are made by companies such as Intel, AMD and Apple, many of them using designs from ARM. Memory comes in layers, from small and very fast to large and slow: the CPU's <b>cache</b>, main memory (RAM), and then flash storage and hard disks. A hard disk stores data magnetically on spinning platters, read by a head on a moving arm; an SSD stores it in flash chips with no moving parts, which is why it is much faster.</p>` },
      { id: "cycle", title: "The machine cycle", html: `
        <p>How does the CPU run a program stored in memory? Here is a tiny program for an imaginary CPU that adds 2 and 3. Memory cells 0–3 hold the instructions, cells 100–102 hold data, and the CPU has one working register, <code>A</code>:</p>
        ${codeBlock(CODE.machine, "out")}
        <p>The CPU repeats one cycle, over and over:</p>
        <ol><li><b>Fetch.</b> The control unit reads the instruction at the address held in the <b>program counter</b> (it starts at 0), and adds 1 to the program counter.</li>
        <li><b>Decode.</b> The control unit works out what the instruction asks for.</li>
        <li><b>Execute.</b> The ALU (or the memory) carries it out.</li></ol>
        ${predict("Run the cycle by hand. What is in register <code>A</code> and in memory cell 102 after each instruction? How many fetches happen before the machine stops?",
          `<p>After <code>LOAD</code>, <code>A</code> is 2. After <code>ADD</code>, <code>A</code> is 5. After <code>STORE</code>, cell 102 is 5. Then <code>HALT</code> stops the machine: four fetches in all.</p>`)}
        ${demo("machine", "Demo 2 · Fetch, decode, execute", "← → keys step", "Change the numbers in cells 100 and 101 and run it again. The program does not change: that is the stored-program idea.")}
        <p>In Python, all of that is one line:</p>
        ${codeBlock(CODE.addPy)}${codeBlock("5", "out")}
        <p>This <b>fetch–decode–execute cycle</b> is what “the computer runs your program” means. A modern CPU runs billions of these cycles every second.</p>` },
    ],
    takeaways: ["A program is instructions; the computer follows them exactly.", "CPU (CU + ALU), memory, storage, input/output.", "Fetch, decode, execute — repeat."],
  },
  {
    slug: "3-languages", nav: "Languages", title: "Languages, OS and Abstraction",
    subtitle: "From machine code to Python, from hardware to apps",
    abstract: "The CPU runs only machine code. Every other language is translated down to it. Each step up is easier to write and further from the machine.",
    tags: ["machine code", "assembly", "C · C++ · Java · Python", "OS", "abstraction"],
    hero: "ladderMini", heroCaption: "The same computation at four levels.",
    sections: [
      { id: "video-2", title: "Watch: from Python down to binary", html: `
        <p>The second video covers Chapters 3 and 4: the ladder of languages, the operating system and abstraction, and positional number systems.</p>
        <div class="card video" data-video="${VIDEO_P2}"></div>` },
      { id: "understand", title: "What can a computer actually understand?", html: `
        <p>How does a computer understand a number such as 8? Deep down, everything in a computer — numbers, text, images, and the instructions themselves — is stored as <b>binary</b>: patterns of 0s and 1s. The number 8 is stored as <code>1000</code>. Chapter 4 explains why.</p>
        <p>The only language the CPU runs directly is <b>machine code</b>: instructions written as binary numbers, different for each kind of CPU. Nobody wants to write that by hand.</p>` },
      { id: "assembly", title: "Low-level languages: assembly", html: `
        <p>An <b>assembly language</b> gives each machine instruction a short name, such as <code>ADD</code> or <code>LOAD</code>. There is a very strong, usually one-to-one, correspondence between assembly instructions and machine-code instructions. A program called an <b>assembler</b> translates the assembly source into machine code:</p>
        ${codeBlock(CODE.assembler, "out")}
        <p>Each assembly language is specific to one computer architecture: a program written for an Intel CPU does not run on an ARM CPU.</p>` },
      { id: "high-level", title: "High-level languages", html: `
        <p>A <b>high-level language</b> lets you write <code>result = 2 + 3</code> instead of instructions about registers and memory cells. The deck traces the family tree:</p>
        <div class="l1-scroll"><table><tr><th>Language</th><th>Year</th><th>Creator</th><th>Notes</th></tr>
        <tr><td><b>C</b></td><td>1969–73</td><td>Dennis Ritchie, Bell Labs</td><td>One of the early high-level languages; close to the machine; direct control of memory; very fast. Used for operating systems, embedded systems, supercomputers.</td></tr>
        <tr><td><b>C++</b></td><td>1979–</td><td>Bjarne Stroustrup, Bell Labs</td><td>C plus <b>object-oriented programming</b>, which supports code reuse. Still fast, still platform-dependent.</td></tr>
        <tr><td><b>Java</b></td><td>1995</td><td>James Gosling, Sun Microsystems (now Oracle)</td><td>Object-oriented and <b>platform-independent</b>: “write once, run anywhere”.</td></tr>
        <tr><td><b>Python</b></td><td>1991</td><td>Guido van Rossum (started 1989)</td><td>Open source, object-oriented, huge libraries, easy to combine with C/C++ and Java. The language of this course, and of most AI work.</td></tr></table></div>` },
      { id: "efficiency", title: "Language efficiency and development efficiency", html: `
        <p>A high-level language cannot be executed directly. It must first be translated into a lower-level language: by a <b>compiler</b>, which translates the whole program ahead of time (C, C++), or by an <b>interpreter</b>, which translates and runs it as it goes (Python).</p>
        <p>This gives a trade-off:</p>
        <ul><li><b>Lower-level languages have higher language efficiency</b>: the programs run faster, because they are closer to what the CPU does.</li>
        <li><b>Higher-level languages have higher development efficiency</b>: programs are quicker to write, read and fix, because each line says more.</li></ul>
        <p>Here is the same computation at four levels. Each line down is closer to the machine and further from how people think (the machine code is the slide's illustration, not a real CPU's encoding):</p>
        ${codeBlock(CODE.ladder, "out")}
        ${demo("ladder", "Demo 3 · Ladders of abstraction", "step down the ladder (← →)", "Switch the ladder to <b>systems</b> or <b>data</b> to see the other two ladders of the next section.")}
        <p>For most programs, the programmer's time costs more than the computer's, which is one reason Python is so popular. When speed really matters, Python calls libraries written in C — which is how Python AI libraries run fast.</p>
        ${callout("pitfall", "PITFALL", `<p><b>“Python is slow, so it's a bad language.”</b> Each language makes its own trade-off. Python gives up some running speed in exchange for development speed, and gets much of the running speed back by calling C libraries for the heavy work. Choose the language for the job.</p>`)}` },
      { id: "os", title: "The operating system", html: `
        <p>The <b>operating system (OS)</b> is the low-level program that manages the computer and provides basic services to every other program. Its main jobs are:</p>
        <ul><li>controlling and monitoring the system's activities;</li><li>allocating system resources (memory, CPU time, files, devices) to programs;</li><li>scheduling: deciding which program runs on the CPU, and when.</li></ul>
        <p><b>Applications</b> (apps) are programs built on top of the OS. Popular operating systems are Windows, macOS, Linux, iOS and Android. When your Python program opens a file or prints to the screen, it asks the OS to do it.</p>` },
      { id: "abstraction", title: "Abstraction", html: `
        <p>The whole lecture so far is three ladders of <b>abstraction</b>. Each level hides the details of the level below, so you can think about <em>what</em> you want instead of <em>how</em> the machine does it:</p>
        <ul><li><b>Languages:</b> machine code → assembly → C → Python.</li>
        <li><b>Systems:</b> hardware → operating system → applications.</li>
        <li><b>Data:</b> binary digits → primitive data types (numbers, text) → data structures (lists, dictionaries; Lecture 5).</li></ul>
        <p>When you write Python you stand on top of all three ladders. You will rarely climb down, but knowing the lower rungs is what lets you understand why a program is slow, or why a number comes out slightly wrong (Chapter 6).</p>` },
    ],
    takeaways: ["The CPU runs only machine code.", "Low level runs faster; high level is faster to write.", "OS between hardware and apps; abstraction everywhere."],
  },
  {
    slug: "4-bases", nav: "Bases", title: "Positional Number Systems",
    subtitle: "Base, symbols and weights: binary, octal, decimal, hexadecimal",
    abstract: "Every positional number is a sum of digit × weight, where the weights are powers of the base. Change the base and the same rules still hold.",
    tags: ["base", "weight", "binary", "octal", "hex"],
    hero: "counterMini", heroCaption: "Counting in binary: every carry is “逢二进一”.",
    sections: [
      { id: "positional", title: "Positional notation", html: `
        <p>Computers store data as binary numbers. In practice we write numbers in four <b>number systems</b>: <b>binary</b> (base 2, 二进制), <b>octal</b> (base 8, 八进制), <b>decimal</b> (base 10, 十进制) and <b>hexadecimal</b> (base 16, 十六进制), and we need to convert between them.</p>
        <p>All four use <b>positional notation</b> (进位记数法). A positional number system has two parts: a <b>base</b> (基数) and a set of <b>symbols</b>, one for each value from 0 up to base − 1. Decimal has base 10 and the symbols {0, 1, …, 9}. When counting reaches the last symbol, 9, the next number is not a new symbol: it is a “1” followed by a “0” (逢十进一, “on ten, carry one”).</p>
        <p>Every number is a sum: each digit, its <b>positional value</b> a<sub>i</sub>, times the <b>weight</b> of its position, a power of the base:</p>
        <div class="math-block">N = a<sub>n</sub>×10<sup>n</sup> + a<sub>n−1</sub>×10<sup>n−1</sup> + ⋯ + a<sub>0</sub>×10<sup>0</sup> + a<sub>−1</sub>×10<sup>−1</sup> + a<sub>−2</sub>×10<sup>−2</sup> + ⋯</div>
        <p>For example 472.5 = 4×10<sup>2</sup> + 7×10<sup>1</sup> + 2×10<sup>0</sup> + 5×10<sup>−1</sup>. Digits left of the point have weights 10<sup>0</sup>, 10<sup>1</sup>, 10<sup>2</sup>, …; digits right of it have 10<sup>−1</sup>, 10<sup>−2</sup>, …</p>
        <p>We write the base as a subscript when it is not obvious: ${N("1001", 2)}, ${N("57", 10)}, ${N("2AB.C", 16)}.</p>` },
      { id: "binary", title: "Binary", html: `
        <p>In <b>binary</b> the base is 2 and there are only two symbols, 0 and 1. “10” is used when we reach 2 (逢二进一). The weights are powers of 2:</p>
        <div class="math-block">N = a<sub>n</sub>×2<sup>n</sup> + ⋯ + a<sub>1</sub>×2<sup>1</sup> + a<sub>0</sub>×2<sup>0</sup> + a<sub>−1</sub>×2<sup>−1</sup> + a<sub>−2</sub>×2<sup>−2</sup> + ⋯</div>
        <p>For example ${N("1001", 2)} = 1×2<sup>3</sup> + 0×2<sup>2</sup> + 0×2<sup>1</sup> + 1×2<sup>0</sup> = 9.</p>
        <p>Counting in binary: 0, 1, 10, 11, 100, 101, 110, 111, 1000, … Each time a position reaches 2 it resets to 0 and carries 1 to the next position, just as 9 + 1 carries in decimal.</p>
        ${demo("counter", "Demo 4 · An odometer in any base", "+1 with →, −1 with ←", "Try base 2 from 0 to 16, then base 16 from 0 to 32. Jump to 255 in base 2 and add 1: eight digits are not enough, and the counter <b>overflows</b>.")}
        ${predict(`What comes after ${N("1011", 2)}? After ${N("1111", 2)}?`,
          `<p>${N("1011", 2)} + 1 = ${N("1100", 2)}: the last digit becomes 0 and carries, the next digit also becomes 0 and carries, and the third digit becomes 1. ${N("1111", 2)} + 1 = ${N("10000", 2)}: every digit carries, just as 9999 + 1 = 10000 in decimal.</p>`)}
        <p>Why do computers use binary? Because it is</p>
        <ul><li><b>easy to build</b>: a circuit only has to tell two states apart (voltage high or low, a switch on or off), which is far more reliable than telling ten levels apart;</li>
        <li><b>simple to calculate with</b>: the addition and multiplication tables have only four entries each;</li>
        <li><b>easy to combine with logic</b>: 1 and 0 can mean true and false, so the same circuits do arithmetic and logic.</li></ul>` },
      { id: "hex-octal", title: "Hexadecimal and octal", html: `
        <p>In <b>hexadecimal</b> (“hex”) the base is 16. It needs 16 symbols, so after 0–9 it uses letters: {0, …, 9, A, B, C, D, E, F}, where A = 10, B = 11, …, F = 15. Upper or lower case means the same. “10” is used when we reach 16 (逢十六进一), and the weights are powers of 16.</p>
        <p>In <b>octal</b> the base is 8, the symbols are {0, …, 7}, “10” is used when we reach 8 (逢八进一), and the weights are powers of 8. (The slide for octal is a question mark: this paragraph is the answer.)</p>
        <div class="l1-scroll"><table class="mono" style="font-size:13px;white-space:nowrap">
          <tr><th>decimal</th>${[...Array(17).keys()].map((k) => `<td>${k}</td>`).join("")}</tr>
          <tr><th>binary</th>${[...Array(17).keys()].map((k) => `<td>${k.toString(2)}</td>`).join("")}</tr>
          <tr><th>octal</th>${[...Array(17).keys()].map((k) => `<td>${k.toString(8)}</td>`).join("")}</tr>
          <tr><th>hex</th>${[...Array(17).keys()].map((k) => `<td>${k.toString(16).toUpperCase()}</td>`).join("")}</tr></table></div>
        <p>Python can write a whole number in any of these bases. A literal starting with <code>0b</code> is binary, <code>0o</code> is octal and <code>0x</code> is hexadecimal; <code>bin</code>, <code>oct</code> and <code>hex</code> go the other way:</p>
        ${codeBlock(">>> 0b1001\n9\n>>> 0o17\n15\n>>> 0xff\n255\n>>> bin(9)\n'0b1001'\n>>> oct(15)\n'0o17'\n>>> hex(255)\n'0xff'", "repl")}
        ${callout("pitfall", "PITFALL", `<p><b>“10” is not always ten.</b> ${N("10", 2)} is two, ${N("10", 8)} is eight, ${N("10", 16)} is sixteen. In any base, “10” means “the base itself”. Always know which base you are reading, and write the subscript when it could be unclear.</p>`)}` },
    ],
    takeaways: ["Base + symbols; carry when you pass the last symbol.", "Each digit × a power of the base.", "Binary 0b, octal 0o, hex 0x (A–F = 10–15)."],
  },
  {
    slug: "5-to-decimal", nav: "To decimal", title: "Converting to Decimal",
    subtitle: "Digit × weight, then add",
    abstract: "To read a number in any base, multiply each digit by the weight of its position and add up the terms. That is just the definition of positional notation.",
    tags: ["binary → decimal", "octal → decimal", "hex → decimal", "to_decimal"],
    hero: "toDecimalMini", heroCaption: "(1101.01)₂ = 13.25, one digit at a time.",
    sections: [
      { id: "video-3", title: "Watch: converting to and from decimal", html: `
        <p>The third video covers Chapters 5 and 6: digit × weight, then add; divide for the integer part, multiply for the fraction; and why 0.1 never ends in binary.</p>
        <div class="card video" data-video="${VIDEO_P3}"></div>` },
      { id: "examples", title: "Worked examples", html: `
        <p>To convert a number from any base to decimal, write it as the sum of digit × weight, then add up the terms. This is just the definition of positional notation.</p>
        <p><b>Binary to decimal.</b></p>
        <div class="math-block">${N("1101.01", 2)} = 1×2<sup>3</sup> + 1×2<sup>2</sup> + 0×2<sup>1</sup> + 1×2<sup>0</sup> + 0×2<sup>−1</sup> + 1×2<sup>−2</sup> = 8 + 4 + 1 + 0.25 = ${N("13.25", 10)}</div>
        ${predict(`Convert ${N("10110.11", 2)} to decimal before you read on.`,
          `<p>${N("10110.11", 2)} = 1×2<sup>4</sup> + 0×2<sup>3</sup> + 1×2<sup>2</sup> + 1×2<sup>1</sup> + 0×2<sup>0</sup> + 1×2<sup>−1</sup> + 1×2<sup>−2</sup> = 16 + 4 + 2 + 0.5 + 0.25 = ${N("22.75", 10)}.</p>`)}
        <p><b>Octal to decimal.</b></p>
        <div class="math-block">${N("24.67", 8)} = 2×8<sup>1</sup> + 4×8<sup>0</sup> + 6×8<sup>−1</sup> + 7×8<sup>−2</sup> = 16 + 4 + 0.75 + 0.109375 = ${N("20.859375", 10)}</div>
        <p>Practice: ${N("35.7", 8)} = 3×8 + 5 + 7×8<sup>−1</sup> = ${N("29.875", 10)}.</p>
        <p><b>Hexadecimal to decimal.</b> Remember that the letters are digits 10–15:</p>
        <div class="math-block">${N("2AB.C", 16)} = 2×16<sup>2</sup> + 10×16<sup>1</sup> + 11×16<sup>0</sup> + 12×16<sup>−1</sup> = 512 + 160 + 11 + 0.75 = ${N("683.75", 10)}</div>
        ${predict(`Convert ${N("A7D.E", 16)} to decimal.`,
          `<p>${N("A7D.E", 16)} = 10×16<sup>2</sup> + 7×16<sup>1</sup> + 13×16<sup>0</sup> + 14×16<sup>−1</sup> = 2560 + 112 + 13 + 0.875 = ${N("2685.875", 10)}.</p>`)}
        <p>Any other base works the same way: change the base, and the weights change with it.</p>` },
      { id: "python", title: "Checking with Python", html: `
        <p>For whole numbers, Python's <code>int</code> reads a string of digits in any base from 2 to 36:</p>
        ${codeBlock('>>> int("1101", 2)\n13\n>>> int("2AB", 16)\n683\n>>> int("A7D", 16)\n2685', "repl")}
        <p><code>int</code> does not accept a point, so for fractions we write our own function. Here it is, as a preview: Lectures 2–4 explain every line. It walks through the digits from left to right, and multiplies each digit by its weight. The weight's power starts at the number of digits before the point, minus 1, and goes down by one per digit:</p>
        ${codeBlock(CODE.toDecimal)}
        ${callout("note", "NOTE", `<p><code>DIGITS.index(digit)</code> is the value of one digit: the position of the symbol in the string <code>"0123456789abcdef"</code>, so <code>"a"</code> is 10 and <code>"f"</code> is 15. <code>number.lower()</code> lets you type <code>"2AB.C"</code> or <code>"2ab.c"</code>.</p>`)}
        ${demo("toDecimal", "Demo 5 · to_decimal, digit by digit", "← → keys step", "Pick a slide example or type your own. A digit that is too big for the base (a 2 in binary, a G in hex) is rejected, just as <code>DIGITS.index</code> would not give a valid digit.")}
        ${codeBlock('>>> to_decimal("1101.01", 2)\n13.25\n>>> to_decimal("10110.11", 2)\n22.75\n>>> to_decimal("24.67", 8)\n20.859375\n>>> to_decimal("35.7", 8)\n29.875\n>>> to_decimal("2AB.C", 16)\n683.75\n>>> to_decimal("A7D.E", 16)\n2685.875\n>>> to_decimal("1001", 2)\n9', "repl")}
        <p>All six slide examples check out.</p>
        ${callout("pattern", "PATTERN · DIGIT × WEIGHT, THEN ADD", `<p>To read a number in any base, multiply each digit by the weight of its position (a power of the base) and add up the terms. Positions left of the point have weights b<sup>0</sup>, b<sup>1</sup>, b<sup>2</sup>, … counting leftwards; positions right of the point have b<sup>−1</sup>, b<sup>−2</sup>, … counting rightwards.</p>`)}` },
    ],
    takeaways: ["Digit × weight, then add.", "Left of the point: b⁰, b¹, b²…; right: b⁻¹, b⁻²…", "Check with int(text, base) or to_decimal."],
  },
  {
    slug: "6-from-decimal", nav: "From decimal", title: "Converting Decimal to Binary",
    subtitle: "Divide down for the integer part, multiply up for the fraction",
    abstract: "Repeated division peels off the lowest digit each time; repeated multiplication pulls out the highest. Some fractions, like 0.1, never end.",
    tags: ["division method", "multiplication method", "0.1 + 0.2"],
    hero: "divisionMini", heroCaption: "57 → 111001: read the remainders from the bottom up.",
    sections: [
      { id: "integer", title: "The integer part: divide by 2, keep the remainders", html: `
        <p>Divide the number by 2 and write down the remainder (0 or 1). Divide the quotient by 2 again, and keep going until the quotient is 0. The remainders are the binary digits, <b>lowest digit first</b>: read them from the last one back to the first.</p>
        <p>To show each step, this function prints n = 2 × q + r for every division, which is exactly what the division ladder on the slide says:</p>
        ${codeBlock(CODE.showDivision)}${codeBlock("57 = 2 × 28 + 1\n28 = 2 × 14 + 0\n14 = 2 × 7 + 0\n7 = 2 × 3 + 1\n3 = 2 × 1 + 1\n1 = 2 × 0 + 1", "out")}
        <p>Reading the remainders from the bottom up gives ${N("57", 10)} = ${N("111001", 2)}. Check: 32 + 16 + 8 + 1 = 57.</p>
        ${demo("division", "Demo 6 · The division ladder", "← → keys step", "Try 215 in base 2, 8 and 16. In base 16 a remainder of 13 becomes the digit D.")}
        ${predict("Why is the <em>first</em> remainder the <em>lowest</em> digit? (Hint: what does 57 = 2 × 28 + 1 say about the last binary digit of 57?)",
          `<p>57 = 2 × 28 + 1 says that 57 is odd, so its last binary digit, the 2<sup>0</sup> digit, is 1. Every other digit has a weight that is a multiple of 2, so all of them together make 2 × 28: the digits of 28 shifted one place left. The next division finds the last digit of 28, which is the 2<sup>1</sup> digit of 57, and so on. Each division peels off the lowest remaining digit.</p>`)}
        ${callout("pitfall", "PITFALL", `<p><b>Reading the remainders top-down.</b> Writing the remainders in the order you found them gives ${N("100111", 2)} = 39, not 57. The first remainder is the <em>lowest</em> digit (低位); the last one is the <em>highest</em> (高位). Check any conversion by converting back.</p>`)}
        <p>The same method converts to any base: divide by 8 for octal, by 16 for hex (a remainder of 10–15 becomes a letter A–F). As a function that collects the digits:</p>
        ${codeBlock(CODE.fromDecimal)}
        ${codeBlock(">>> from_decimal(57, 2)\n'111001'\n>>> from_decimal(215, 2)\n'11010111'\n>>> from_decimal(215, 16)\n'd7'\n>>> from_decimal(215, 8)\n'327'\n>>> bin(57)\n'0b111001'", "repl")}
        <p><code>from_decimal</code> adds each new digit on the <em>left</em>, which is how it reads the remainders from the bottom up.</p>` },
      { id: "fraction", title: "The fractional part: multiply by 2, keep the integer parts", html: `
        <p>For a fraction, multiply by 2. The integer part of the product (0 or 1) is the next binary digit; keep the fractional part and multiply it by 2 again. Stop when the fraction becomes 0. This time the digits come out <b>highest first</b>: read them top-down.</p>
        ${codeBlock(CODE.showFraction)}${codeBlock("0.875 × 2 = 1.75   digit 1\n0.75 × 2 = 1.5   digit 1\n0.5 × 2 = 1.0   digit 1", "out")}
        <p>So ${N("0.875", 10)} = ${N("0.111", 2)}. Check: 0.5 + 0.25 + 0.125 = 0.875.</p>
        ${predict(`Convert ${N("0.6875", 10)} to binary. How many multiplications does it take?`,
          `${codeBlock("show_fraction(0.6875, 2)")}${codeBlock("0.6875 × 2 = 1.375   digit 1\n0.375 × 2 = 0.75   digit 0\n0.75 × 2 = 1.5   digit 1\n0.5 × 2 = 1.0   digit 1", "out")}<p>Four multiplications: ${N("0.6875", 10)} = ${N("0.1011", 2)}, that is 0.5 + 0.125 + 0.0625.</p>`)}
        ${demo("fraction", "Demo 7 · The multiplication method", "← → keys step", "Try 0.1: the products never reach a whole number, so the digits never stop. The demo cuts it off after 20 digits, like <code>fraction_to_binary(x, 20)</code>.")}
        <p>Why does multiplying by 2 work? Multiplying a binary fraction by 2 shifts every digit one place left, so the first digit after the point jumps in front of the point, where <code>int</code> can read it.</p>` },
      { id: "both", title: "Numbers with both parts", html: `
        <p>For a number with an integer part and a fractional part, convert the two parts <b>separately</b> and join them with the point. For ${N("215.6875", 10)}: the integer part gives ${N("215", 10)} = ${N("11010111", 2)} (by division), the fraction gives ${N("0.6875", 10)} = ${N("0.1011", 2)} (by multiplication), so</p>
        <div class="math-block">${N("215.6875", 10)} = ${N("11010111.1011", 2)}</div>
        ${callout("note", "NOTE", `<p>Slide 63 prints this answer as ${N("215.675", 10)}. The question was 215.6875, and 0.675 would give a different, endless binary fraction. The slide adds its own correction underneath.</p>`)}
        ${codeBlock('>>> to_decimal("11010111.1011", 2)\n215.6875', "repl")}` },
      { id: "never-ends", title: "Fractions that never end", html: `
        <p>Not every decimal fraction has a finite binary expansion. Here is a version of the method that stops after a fixed number of digits:</p>
        ${codeBlock(CODE.fractionToBinary)}
        ${codeBlock(">>> fraction_to_binary(0.875, 20)\n'0.111'\n>>> fraction_to_binary(0.6875, 20)\n'0.1011'\n>>> fraction_to_binary(0.1, 20)\n'0.00011001100110011001'", "repl")}
        <p>For 0.875 it stops by itself. For 0.1 it never would: ${N("0.1", 10)} = (0.0<span style="text-decoration:overline">0011</span>)<sub>2</sub>, with “0011” repeating forever, just as 1/3 = 0.333… in decimal. A computer has to cut it off somewhere, so it stores a number <em>very close</em> to 0.1, not 0.1 itself.</p>
        ${callout("pitfall", "PITFALL", `<p><b>“A computer stores 0.1 exactly.”</b> It cannot: 0.1 has no finite binary expansion. You can see the tiny error when two such numbers are added:</p>${codeBlock(">>> 0.1 + 0.2\n0.30000000000000004\n>>> 0.1 + 0.2 == 0.3\nFalse", "repl")}<p>This is not a bug in Python; every language that uses binary floating-point numbers does the same. Lecture 2 shows how to compare such numbers safely. Fractions whose denominator is a power of 2 (0.5, 0.25, 0.875, 0.6875) <em>are</em> exact.</p>`)}
        ${callout("pattern", "PATTERN · DIVIDE DOWN, MULTIPLY UP", `<p>Integer part: divide by the base repeatedly; the remainders are the digits, lowest first. Fractional part: multiply by the base repeatedly; the integer parts are the digits, highest first. Do the two parts separately, then check by converting back.</p>`)}` },
    ],
    takeaways: ["Integer: divide, remainders read bottom-up.", "Fraction: multiply, integer parts read top-down.", "0.1 never ends in binary, so 0.1 + 0.2 ≠ 0.3."],
  },
  {
    slug: "7-groups", nav: "Oct & hex", title: "Binary, Octal and Hexadecimal",
    subtitle: "Three bits per octal digit, four bits per hex digit",
    abstract: "Because 8 = 2³ and 16 = 2⁴, converting between binary and octal or hex needs no arithmetic at all: just group the bits, starting from the point.",
    tags: ["one-to-one", "grouping", "padding", "converter"],
    hero: "groupingMini", heroCaption: "(11101.01)₂ = (1D.4)₁₆: group by four from the point.",
    sections: [
      { id: "video-4", title: "Watch: hex, bytes and memory", html: `
        <p>The fourth video covers Chapters 7 and 8: grouping bits into octal and hex digits, units of data, text as bytes, and memory addresses.</p>
        <div class="card video" data-video="${VIDEO_P4}"></div>` },
      { id: "octal", title: "Three bits per octal digit", html: `
        <p>Since 8 = 2<sup>3</sup>, each octal digit corresponds to exactly three binary digits, and each group of three binary digits to exactly one octal digit — a <b>one-to-one</b> correspondence (一一对应):</p>
        <div class="l1-scroll"><table class="mono"><tr><th>octal</th>${[...Array(8).keys()].map((k) => `<td>${k}</td>`).join("")}</tr><tr><th>binary</th>${[...Array(8).keys()].map((k) => `<td>${k.toString(2).padStart(3, "0")}</td>`).join("")}</tr></table></div>
        <p><b>Octal to binary</b>: replace each octal digit with its three binary digits, and keep the order.</p>
        <div class="math-block">${N("0.754", 8)} = (000.<u>111</u> <u>101</u> <u>100</u>)<sub>2</sub> = ${N("0.1111011", 2)}</div>
        <p>(The zeros at the front of the integer part and the end of the fraction can be dropped.)</p>
        ${predict(`Convert ${N("16.327", 8)} to binary.`, `<p>${N("16.327", 8)} = (<u>001</u> <u>110</u>.<u>011</u> <u>010</u> <u>111</u>)<sub>2</sub> = ${N("1110.011010111", 2)}.</p>`)}` },
      { id: "hex", title: "Four bits per hexadecimal digit", html: `
        <p>Since 16 = 2<sup>4</sup>, each hex digit corresponds to exactly four binary digits: 0 = 0000, 1 = 0001, …, 9 = 1001, A = 1010, B = 1011, C = 1100, D = 1101, E = 1110, F = 1111.</p>
        <p><b>Hex to binary</b>: replace each hex digit with its four binary digits, and keep the order.</p>
        <div class="math-block">${N("4C.2E", 16)} = (<u>0100</u> <u>1100</u>.<u>0010</u> <u>1110</u>)<sub>2</sub> = ${N("1001100.0010111", 2)}</div>
        <p>Practice: ${N("AD.7F", 16)} = (1010 1101.0111 1111)<sub>2</sub> = ${N("10101101.01111111", 2)}.</p>` },
      { id: "back", title: "Binary to octal and hexadecimal", html: `
        <p>Going back, cut the binary number into groups, <b>starting from the point</b>:</p>
        <ol><li>In the integer part, start at the point and make groups of three (octal) or four (hex) digits going <b>left</b>. If the last group is short, fill it with 0s on the left.</li>
        <li>In the fractional part, start at the point and make groups going <b>right</b>. If the last group is short, fill it with 0s on the right.</li>
        <li>Replace each group with its octal or hexadecimal digit, keeping the order.</li></ol>
        <div class="math-block">${N("0.10111", 2)} = (000.<u>101</u> <u>110</u>)<sub>2</sub> = ${N("0.56", 8)} &nbsp;&nbsp; ${N("11101.01", 2)} = (<u>011</u> <u>101</u>.<u>010</u>)<sub>2</sub> = ${N("35.2", 8)}</div>
        ${demo("grouping", "Demo 8 · Group the bits", "← → keys step", "Amber digits are the zeros added as padding. Every slide example is in the list; try the reverse direction too.")}
        ${predict(`Convert ${N("1101101.011", 2)} to octal, and ${N("11101.01", 2)} to hexadecimal.`,
          `<p>${N("1101101.011", 2)} = (<u>001</u> <u>101</u> <u>101</u>.<u>011</u>)<sub>2</sub> = ${N("155.3", 8)}, and ${N("11101.01", 2)} = (<u>0001</u> <u>1101</u>.<u>0100</u>)<sub>2</sub> = ${N("1D.4", 16)}.</p>`)}
        ${callout("note", "NOTE", `<p>Slide 72 says “convert every four digits … into a octal digit”. Groups of <b>four</b> bits make a <b>hexadecimal</b> digit; groups of three make an octal digit.</p>`)}
        ${callout("pitfall", "PITFALL", `<p><b>Padding on the wrong side.</b> Zeros may only be added where they do not change the value: on the <em>left</em> of the integer part, on the <em>right</em> of the fraction. Grouping ${N("11101.01", 2)} from the left end, as 1110 1.01, or padding the fraction as .0001, gives a different number. ${N("0.01", 2)} is a quarter; ${N("0.0001", 2)} is a sixteenth.</p>`)}
        <p>Python checks the whole-number parts directly, and <code>to_decimal</code> checks the fractions:</p>
        ${codeBlock(">>> oct(0b1101101)\n'0o155'\n>>> hex(0b11101)\n'0x1d'\n>>> to_decimal(\"1101101.011\", 2) == to_decimal(\"155.3\", 8)\nTrue\n>>> to_decimal(\"11101.01\", 2) == to_decimal(\"1D.4\", 16)\nTrue\n>>> to_decimal(\"4C.2E\", 16) == to_decimal(\"1001100.0010111\", 2)\nTrue", "repl")}
        <p>This is why programmers like hexadecimal: it is a compact way to write binary. One byte (8 bits) is always exactly two hex digits, so <code>11111111</code> is <code>FF</code> and a colour such as <code>#0F6E73</code> is three bytes.</p>
        ${callout("pattern", "PATTERN · GROUP FROM THE POINT", `<p>Binary and octal: 3 bits per digit. Binary and hex: 4 bits per digit. Group outwards from the point in both directions, and pad with zeros only on the outside.</p>`)}` },
      { id: "converter", title: "Try it: a base converter", html: `
        <p>This converter chains the methods of the last three chapters: <code>to_decimal</code> to get the value, then division for the integer part and multiplication for the fraction in each base. Use it to check your hand conversions — after you have done them.</p>
        ${demo("converter", "Demo 9 · Base converter", "type a number")}` },
    ],
    takeaways: ["Octal digit = 3 bits; hex digit = 4 bits.", "Group outwards from the point.", "Pad with zeros only on the outside."],
  },
  {
    slug: "8-units", nav: "Units", title: "Bits, Bytes and Memory",
    subtitle: "Units of data, text as numbers, and memory addresses",
    abstract: "A bit is one binary digit, a byte is eight. Memory is a long row of bytes, each with its own address — and the bytes don't say what they mean.",
    tags: ["bit", "byte", "KB vs KiB", "UTF-8", "address"],
    hero: "memoryMini", heroCaption: "\"Crew\" in memory: one byte per letter.",
    sections: [
      { id: "bits", title: "Bits and bytes", html: `
        <p>A <b>bit</b> (比特/位), short for <em>binary digit</em>, is a single 0 or 1. It is the smallest unit of information. A <b>byte</b> (字节) is 8 bits. With n bits you can write 2<sup>n</sup> different patterns, so one byte has 2<sup>8</sup> = 256 patterns: the whole numbers 0 to 255.</p>
        ${codeBlock(">>> 2 ** 8\n256\n>>> 0b11111111\n255\n>>> (57).bit_length()\n6", "repl")}
        <p><code>bit_length</code> gives the number of bits needed to write a whole number in binary: 57 is <code>111001</code>, six bits.</p>
        ${demo("bits", "Demo 10 · How much fits in n bits?", "drag the slider")}` },
      { id: "units", title: "Units of data", html: `
        <p>Larger amounts use these units:</p>
        <table><tr><th>Unit</th><th>Size</th><th></th></tr>
        <tr><td>1 KB (千字节)</td><td>2<sup>10</sup> B = 1,024 B</td><td></td></tr>
        <tr><td>1 MB (兆字节)</td><td>2<sup>20</sup> B = 1,024 KB</td><td>about a million bytes</td></tr>
        <tr><td>1 GB (千兆字节)</td><td>2<sup>30</sup> B = 1,024 MB</td><td>about a billion bytes</td></tr>
        <tr><td>1 TB (兆兆字节)</td><td>2<sup>40</sup> B = 1,024 GB</td><td>about a trillion bytes</td></tr></table>
        ${codeBlock(">>> 2 ** 10\n1024\n>>> 2 ** 30\n1073741824", "repl")}
        ${callout("note", "NOTE · KB OR KiB?", `<p>The table follows the slides and Windows: 1 KB = 1024 B. Strictly, the international standard (IEC) calls 2<sup>10</sup> B a <b>kibibyte</b>, written <b>KiB</b>, and 2<sup>20</sup> B a <b>MiB</b>, 2<sup>30</sup> B a <b>GiB</b>, 2<sup>40</sup> B a <b>TiB</b>; it keeps KB, MB, GB, TB for powers of 1000. Disk makers use the powers of 1000. That is why a “1 TB” drive (10<sup>12</sup> bytes) shows up as about 931 GB on a computer that counts in powers of 1024:</p>${codeBlock(">>> 10 ** 12 / 2 ** 30\n931.3225746154785", "repl")}<p>In this course, KB = 1024 B unless we say otherwise.</p>`)}
        ${demo("units", "Demo 11 · Unit explorer", "pick an amount", "Start with the “1 TB” disk: 1 TB counted in 1000s is about 931 GiB.")}` },
      { id: "text", title: "Characters are numbers too", html: `
        <p>Text is stored as numbers as well: each character has a code. In the common encoding <b>UTF-8</b>, every English letter, digit and punctuation mark takes <b>one byte</b>:</p>
        ${codeBlock('>>> list("Crew".encode())\n[67, 114, 101, 119]\n>>> format(67, "08b")\n\'01000011\'\n>>> len("Crew".encode())\n4', "repl")}
        <p>The letter <code>C</code> is stored as the number 67, which is the byte <code>01000011</code>.</p>
        ${callout("pitfall", "PITFALL", `<p><b>“Every character is one byte.”</b> The slides say every <em>English</em> character is one byte, and that is right for UTF-8. Other characters take more: a Chinese character takes three bytes in UTF-8, and an emoji takes four.</p>${codeBlock('>>> len("人工智能")\n4\n>>> len("人工智能".encode())\n12', "repl")}<p>Four characters, twelve bytes. A Python string counts characters; its encoding counts bytes.</p>`)}` },
      { id: "memory", title: "Memory and addresses", html: `
        <p>A computer's main memory is an ordered sequence of bytes. Every byte has a unique number, its <b>address</b>, starting from 0. To read or write data, the CPU names the address. Here is part of a memory that holds the text <code>Crew</code> and the number 3:</p>
        <table class="mono"><tr><th>address</th><th>content</th><th>meaning</th></tr>
        <tr><td>2000</td><td>01000011</td><td>the character C</td></tr><tr><td>2001</td><td>01110010</td><td>the character r</td></tr>
        <tr><td>2002</td><td>01100101</td><td>the character e</td></tr><tr><td>2003</td><td>01110111</td><td>the character w</td></tr>
        <tr><td>2004</td><td>00000011</td><td>the number 3</td></tr></table>
        <p>Notice that the bytes themselves do not say what they mean: <code>01000011</code> is the letter <code>C</code> if the program treats it as text and the number 67 if it treats it as a number. The program decides.</p>
        ${demo("memory", "Demo 12 · Text in memory", "← → keys step", "Try <code>人工智能</code> and an emoji: one character, several bytes, several addresses.")}
        <p>In a low-level language such as assembly or C, the programmer works with addresses directly. In a high-level language such as Python, you give your data a <b>name</b>, and Python and the operating system decide where it lives in memory. Whether the programmer has to deal with memory addresses is the key difference between high-level and low-level languages. In Lecture 2 you will meet Python's names, and you will see that a name <em>refers to</em> an object stored somewhere in memory.</p>
        ${predict("How many different values can 2 bytes hold? What is the largest whole number they can hold?",
          `<p>Two bytes are 16 bits, so they hold 2<sup>16</sup> = 65,536 different patterns: the numbers 0 to 65,535. In general the largest whole number with n bits is 2<sup>n</sup> − 1, which is n ones in binary.</p>${codeBlock(">>> 2 ** 16\n65536\n>>> 0b1111111111111111\n65535", "repl")}`)}` },
    ],
    takeaways: ["n bits → 2ⁿ patterns; a byte is 8 bits.", "KB = 1024 B here (strictly KiB); disks count in 1000s.", "Memory: bytes with addresses; the program gives them meaning."],
  },
  {
    slug: "9-summary", nav: "Summary", title: "Summary and Practice",
    subtitle: "Check yourself, then convert some numbers",
    abstract: "A one-page map of the lecture, six self-check questions, ten exercises with solutions, and a checklist for checking what an AI tells you.",
    tags: ["knowledge map", "self-check", "exercises"],
    hero: "toc",
    sections: [
      { id: "map", title: "Knowledge map", html: `<div class="map">
        <div class="card"><h3>The machine</h3><ul><li><b>CPU</b> = control unit + ALU</li><li>Main memory: fast, temporary</li><li>Storage: large, permanent</li><li>Fetch → decode → execute</li></ul></div>
        <div class="card"><h3>Languages</h3><ul><li>CPU runs only <b>machine code</b></li><li>Assembler, compiler, interpreter</li><li>Low: faster to run</li><li>High: faster to write</li></ul></div>
        <div class="card"><h3>Abstraction</h3><ul><li>machine code → … → Python</li><li>hardware → OS → apps</li><li>bits → types → data structures</li></ul></div>
        <div class="card"><h3>To decimal</h3><ul><li>Digit × weight, then add</li><li>Weights are powers of the base</li><li><code>int(text, base)</code>, <code>to_decimal</code></li></ul></div>
        <div class="card"><h3>From decimal</h3><ul><li>Integer: divide, remainders bottom-up</li><li>Fraction: multiply, integer parts top-down</li><li>0.1 never ends in binary</li></ul></div>
        <div class="card"><h3>Bits and bytes</h3><ul><li>Octal = 3 bits, hex = 4 bits</li><li>1 byte = 8 bits = 2 hex digits</li><li>KB = 2<sup>10</sup> B (KiB)</li><li>Memory: addressed bytes</li></ul></div></div>` },
      { id: "check", title: "Check your understanding", html: `<div data-demo="quiz"><div class="demo-body"></div></div>` },
      { id: "exercises", title: "Exercises", html: `
        <p>★ trace or convert · ★★ write or explain · ★★★ extend or combine. Check every conversion by converting back, or with Python.</p>
        <h3>Exercise 1 ★ (the machine)</h3>
        <p>For each task, name the component that does it: (a) remembers your essay after the laptop is switched off; (b) adds two numbers; (c) reads the next instruction from memory; (d) holds the program while it runs; (e) shows the result.</p>
        <details class="reveal"><summary>Solution</summary><p>(a) secondary storage (SSD or hard disk); (b) the ALU; (c) the control unit; (d) main memory (RAM); (e) an output device (the screen).</p></details>
        <h3>Exercise 2 ★ (trace)</h3>
        <p>Change the machine-cycle program in Chapter 2 so that it computes 2 + 3 + 4, with the 4 in memory cell 103 and the result in cell 104. Write the new program, then trace it: what is in register <code>A</code> after each instruction?</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock("address  content\n   0     LOAD  A, [100]\n   1     ADD   A, [101]\n   2     ADD   A, [103]\n   3     STORE A, [104]\n   4     HALT\n 100     2\n 101     3\n 103     4\n 104     0", "out")}<p><code>A</code> is 2, then 5, then 9; <code>STORE</code> writes 9 into cell 104; <code>HALT</code> stops. Five fetches.</p></details>
        <h3>Exercise 3 ★ (convert)</h3>
        <p>Convert to decimal: (a) ${N("1011.101", 2)}, (b) ${N("127", 8)}, (c) ${N("FF", 16)}, (d) ${N("1C.8", 16)}.</p>
        <details class="reveal"><summary>Solution</summary><p>(a) 8 + 2 + 1 + 0.5 + 0.125 = 11.625. (b) 64 + 16 + 7 = 87. (c) 15 × 16 + 15 = 255. (d) 16 + 12 + 8/16 = 28.5.</p>${codeBlock('>>> to_decimal("1011.101", 2)\n11.625\n>>> to_decimal("127", 8)\n87\n>>> to_decimal("FF", 16)\n255\n>>> to_decimal("1C.8", 16)\n28.5', "repl")}</details>
        <h3>Exercise 4 ★ (find the bug)</h3>
        <p>A student converts ${N("0.625", 10)} to binary like this, and writes the answer ${N("0.1", 2)}. Find the mistake and give the right answer.</p>
        ${codeBlock("0.625 × 2 = 1.25    integer part 1\n1.25  × 2 = 2.5     integer part 2 ... that's not a binary digit, so stop", "out")}
        <details class="reveal"><summary>Solution</summary><p>After each step only the <em>fractional</em> part is multiplied again. The second line should be 0.25 × 2 = 0.5, digit 0, and then 0.5 × 2 = 1.0, digit 1. So ${N("0.625", 10)} = ${N("0.101", 2)}, which is 0.5 + 0.125.</p>${codeBlock(">>> fraction_to_binary(0.625, 20)\n'0.101'", "repl")}</details>
        <h3>Exercise 5 ★★ (convert)</h3>
        <p>Convert ${N("100.375", 10)} to binary, then to octal and to hexadecimal by grouping.</p>
        <details class="reveal"><summary>Solution</summary><p>Integer part by division: ${N("100", 10)} = ${N("1100100", 2)}. Fraction by multiplication: 0.375 × 2 = 0.75 (0), 0.75 × 2 = 1.5 (1), 0.5 × 2 = 1.0 (1), so ${N("0.375", 10)} = ${N("0.011", 2)}. Together: ${N("1100100.011", 2)}. Octal: <u>001</u> <u>100</u> <u>100</u>.<u>011</u> = ${N("144.3", 8)}. Hex: <u>0110</u> <u>0100</u>.<u>0110</u> = ${N("64.6", 16)}.</p>${codeBlock(">>> from_decimal(100, 2)\n'1100100'\n>>> fraction_to_binary(0.375, 20)\n'0.011'\n>>> to_decimal(\"144.3\", 8)\n100.375\n>>> to_decimal(\"64.6\", 16)\n100.375", "repl")}</details>
        <h3>Exercise 6 ★★ (count in another base)</h3>
        <p>Count from 0 to 10 (decimal) in base 3. Which numbers need three base-3 digits? Then check your list with <code>from_decimal</code>.</p>
        <details class="reveal"><summary>Solution</summary><p>0, 1, 2, 10, 11, 12, 20, 21, 22, 100, 101. Nine and ten need three digits, because 3<sup>2</sup> = 9 is the first number with weight in the third position.</p>${codeBlock(">>> [from_decimal(n, 3) for n in range(11)]\n['0', '1', '2', '10', '11', '12', '20', '21', '22', '100', '101']", "repl")}</details>
        <h3>Exercise 7 ★★ (units)</h3>
        <p>A phone has 64 GB of storage and every photo is 3 MB (with 1 GB = 1024 MB). How many photos fit? A “2 TB” disk holds 2 × 10<sup>12</sup> bytes; how many GiB is that?</p>
        <details class="reveal"><summary>Solution</summary><p>64 × 1024 / 3 = 21,845.3, so 21,845 photos (in practice fewer: the system uses some space). The disk holds 2 × 10<sup>12</sup> / 2<sup>30</sup> ≈ 1862.6 GiB, which the computer will show as about “1.82 TB”.</p>${codeBlock(">>> 64 * 1024 // 3\n21845\n>>> round(2 * 10 ** 12 / 2 ** 30, 1)\n1862.6", "repl")}</details>
        <h3>Exercise 8 ★★ (explain)</h3>
        <p>Explain in two or three sentences why every byte can be written as exactly two hexadecimal digits, and why you can't do the same with decimal digits.</p>
        <details class="reveal"><summary>Solution</summary><p>A byte is 8 bits, and one hex digit is exactly 4 bits (16 = 2<sup>4</sup>), so a byte is two groups of four bits: two hex digits, from <code>00</code> to <code>FF</code>. Ten is not a power of 2, so a decimal digit does not line up with a whole number of bits: a byte runs from 0 to 255, which needs three decimal digits, and three decimal digits can go up to 999.</p></details>
        <h3>Exercise 9 ★★★ (write a converter)</h3>
        <p>Write <code>binary_to_hex(bits)</code> for a string of binary digits with no point. Pad on the left with zeros until the length is a multiple of 4, then replace each group of four with its hex digit. You will need a loop; look ahead to Lecture 3, or ask an AI assistant to explain <code>while</code> and <code>range</code> (and then check its explanation by running examples). Test it on <code>"11101"</code> and <code>"11010111"</code>.</p>
        <details class="reveal"><summary>Solution</summary>${codeBlock(CODE.binaryToHex)}${codeBlock(">>> binary_to_hex(\"11101\")\n'1d'\n>>> binary_to_hex(\"11010111\")\n'd7'\n>>> binary_to_hex(\"11010111\") == from_decimal(215, 16)\nTrue", "repl")}</details>
        <h3>Exercise 10 ★★★ (repeating fractions)</h3>
        <p>Which of these decimal fractions have a finite binary expansion: 0.5, 0.3, 0.75, 0.2, 0.0625? Find the rule, and use <code>fraction_to_binary(x, 20)</code> to check your answer.</p>
        <details class="reveal"><summary>Solution</summary><p>0.5, 0.75 and 0.0625 do; 0.3 and 0.2 do not. A fraction has a finite binary expansion exactly when, in lowest terms, its denominator is a power of 2: 1/2, 3/4, 1/16 are; 3/10 and 1/5 are not (their denominators contain the factor 5). This is the same reason 1/3 never ends in decimal: 3 does not divide a power of 10.</p>${codeBlock(">>> fraction_to_binary(0.75, 20)\n'0.11'\n>>> fraction_to_binary(0.0625, 20)\n'0.0001'\n>>> fraction_to_binary(0.2, 20)\n'0.00110011001100110011'", "repl")}</details>` },
      { id: "ai", title: "Working with AI", html: `
        <p>The slides end their list of reading with “Ask AI”, and you should. But this lecture is also the first place to practise checking what an AI tells you. Number conversions are a good test: an AI assistant explains the method well, but language models can still slip on long digit-by-digit arithmetic, and the mistake looks just as confident as a right answer.</p>
        <ol><li><b>Ask for the method, not just the answer.</b> “Convert 215.6875 to binary and show every division and multiplication step.” A shown method can be checked line by line.</li>
        <li><b>Check by converting back.</b> Turn the answer back into decimal with digit × weight. If you don't get the number you started with, one of you is wrong.</li>
        <li><b>Check with a second tool.</b> Python's <code>bin</code>, <code>oct</code>, <code>hex</code> and <code>int(text, base)</code>, or this lecture's <code>to_decimal</code>, give an independent answer in one line.</li>
        <li><b>Ask about the edge cases.</b> “What does 0.1 look like in binary?” A good answer says it repeats forever. An answer that gives a short, exact binary fraction for 0.1 is wrong.</li></ol>
        <p>Try this: ask an assistant to convert ${N("A7D.E", 16)} to binary and to octal. Check both answers with <code>to_decimal</code>. Then ask it why a “1 TB” disk shows up as 931 GB, and check its arithmetic with Python.</p>` },
      { id: "terms", title: "Key terms and further reading", html: `
        <p class="tags">${["program", "execute", "hardware", "software", "von Neumann architecture", "stored program", "CPU", "control unit (CU)", "arithmetic/logic unit (ALU)", "main memory", "secondary storage", "input/output device", "fetch–decode–execute cycle", "program counter", "machine code", "assembly language", "assembler", "high-level language", "compiler", "interpreter", "language efficiency", "development efficiency", "operating system", "abstraction", "positional notation", "base", "symbol", "positional value", "weight", "binary", "octal", "decimal", "hexadecimal", "bit", "byte", "KB/KiB", "UTF-8", "memory address"].map((t) => `<span class="tag">${t}</span>`).join("")}</p>
        <ul><li>J. DeNero, <em>Composing Programs</em>, §1.1 Getting Started. <a href="https://www.composingprograms.com/pages/11-getting-started.html" target="_blank" rel="noopener">composingprograms.com</a></li>
        <li>C. Severance, <em>Python for Everybody</em>, Chapter 1 (Why should you learn to write programs?), which covers the computer's parts and languages at the same level. <a href="https://www.py4e.com/book" target="_blank" rel="noopener">py4e.com</a></li>
        <li>Y. D. Liang, <em>Introduction to Programming Using Python</em>, Chapter 1, whose figure of memory addresses holding <code>Crew</code> and 3 the slides reuse.</li>
        <li>The Python documentation on numeric literals and <code>int</code>, <code>bin</code>, <code>oct</code>, <code>hex</code>: <a href="https://docs.python.org/3/library/functions.html#int" target="_blank" rel="noopener">docs.python.org</a></li></ul>` },
    ],
    takeaways: ["CPU fetches and executes; languages are translated down.", "Digit × weight; divide down, multiply up.", "Group bits by 3 or 4; bytes have addresses."],
  },
];

const QUIZ = [
  { q: "A program is stored on the SSD. You double-click it. Where must its instructions be before the CPU can fetch them?",
    opts: ["On the SSD: the CPU reads them from there", "In main memory (RAM): the OS copies them there first", "In the ALU", "In an output device"],
    a: 1, why: "The CPU fetches instructions only from main memory, so the OS first copies the program from secondary storage into memory. The <b>control unit</b> then fetches them." },
  { q: "Why can't the CPU run Python code directly?",
    opts: ["Python is too slow", "The CPU only runs machine code; Python must be translated (by the interpreter) first", "Python is not object-oriented", "Only the OS can run Python"],
    a: 1, why: "The CPU only runs machine code. Python has higher <b>development efficiency</b>; assembly has higher <b>language efficiency</b> but is tied to one CPU and slow to write." },
  { q: "What are (10)<sub>16</sub>, (10)<sub>8</sub> and (100)<sub>2</sub> in decimal?",
    opts: ["10, 10, 100", "16, 8, 4", "16, 8, 2", "A, 8, 4"],
    a: 1, why: "16, 8 and 4. “10” is always the base itself; (100)<sub>2</sub> is 2<sup>2</sup>." },
  { q: "A student converts 13 to binary by repeated division, gets the remainders 1, 0, 1, 1 in that order, and writes (1011)<sub>2</sub>. What is the right answer?",
    opts: ["(1011)<sub>2</sub>: it is right", "(1101)<sub>2</sub>: the remainders must be read from the last to the first", "(0111)<sub>2</sub>", "(11010)<sub>2</sub>"],
    a: 1, why: "The remainders come out lowest digit first, so they must be read from the last to the first: (1101)<sub>2</sub> = 8 + 4 + 1 = 13. The student's (1011)<sub>2</sub> is 11." },
  { q: "What is (111110)<sub>2</sub> in octal and in hexadecimal?",
    opts: ["(76)<sub>8</sub> and (3E)<sub>16</sub>", "(67)<sub>8</sub> and (E3)<sub>16</sub>", "(76)<sub>8</sub> and (F8)<sub>16</sub>", "(62)<sub>8</sub> and (62)<sub>16</sub>"],
    a: 0, why: "Octal: <u>111</u> <u>110</u> = (76)<sub>8</sub>. Hex: <u>0011</u> <u>1110</u> = (3E)<sub>16</sub>. Both are 62." },
  { q: "A file is 3 KB, with KB = 1024 B. How many bits is that?",
    opts: ["3,000", "3,072", "24,000", "24,576"],
    a: 3, why: "3 × 1024 × 8 = 24,576 bits." },
];
