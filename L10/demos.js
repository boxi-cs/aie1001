// Interactive demos. CODE is generated from notes/L10-stacks-queues-lists-trees.md (checked
// by tools/check.py): one entry per fenced block, in order. The trace functions below replay
// what Python does, step by step, and their results match the note's outputs.

const CODE = {
  listStack: `class ListStack:
    """A LIFO stack that stores its elements in a Python list."""

    def __init__(self):
        self._data = []                 # the top of the stack is the end of the list

    def __len__(self):
        return len(self._data)

    def is_empty(self):
        return len(self._data) == 0

    def push(self, e):
        self._data.append(e)

    def top(self):
        if self.is_empty():
            raise IndexError("top from empty stack")
        return self._data[-1]

    def pop(self):
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._data.pop()`,
  mainStack: `def main():
    s = ListStack()
    print("The stack is empty?", s.is_empty())
    s.push(100)
    s.push(200)
    s.push(300)
    print(s.top())
    print(s.pop())
    print(s.top())


main()`,
  mainStackOut: `The stack is empty? True
300
300
200`,
  stackRepl: `>>> s = ListStack()
>>> for x in [100, 200, 300]:
...     s.push(x)
>>> s.pop()
300
>>> len(s)
2`,
  emptyPop: `>>> ListStack().pop()
Traceback (most recent call last):
  ...
IndexError: pop from empty stack`,
  predictStack: `>>> s = ListStack()
>>> s.push(5); s.push(3); s.pop()
3
>>> s.push(2); s.push(8); s.pop(), s.pop()
(8, 2)
>>> s.push(9); s.push(1); s.pop()
1
>>> s._data
[5, 9]`,
  reverseData: `def reverse_data(old_list):
    """Return a new list with the elements of old_list in reverse order."""
    s = ListStack()
    for x in old_list:
        s.push(x)
    new_list = []
    while not s.is_empty():
        new_list.append(s.pop())
    return new_list`,
  reverseRepl: `>>> reverse_data([1, 2, 3, 4, 5])
[5, 4, 3, 2, 1]`,
  isMatched: `def is_matched(expr):
    """Return True if every bracket in expr is closed by a matching bracket."""
    lefty = "([{"
    righty = ")]}"
    s = ListStack()
    for c in expr:
        if c in lefty:
            s.push(c)                       # remember the open bracket
        elif c in righty:
            if s.is_empty():
                return False                # a closing bracket with nothing open
            if righty.index(c) != lefty.index(s.pop()):
                return False                # closes the wrong kind of bracket
    return s.is_empty()                     # was every open bracket closed?`,
  matchedRepl: `>>> is_matched("1+2*(3+4)-[5-6]")
True
>>> is_matched("((()}]")
False`,
  matchedPredict: `>>> is_matched("(()")
False
>>> is_matched("())(")
False`,
  countingPitfall: `>>> is_matched(")("), is_matched("([)]")
(False, False)`,
  isMatchedHtml: `def is_matched_html(raw):
    """Return True if every HTML tag in raw is closed, in the right order."""
    s = ListStack()
    j = raw.find("<")                       # index of the first '<', or -1
    while j != -1:
        k = raw.find(">", j + 1)            # the '>' that ends this tag
        if k == -1:
            return False                    # a tag that never ends
        tag = raw[j + 1:k]                  # the text between '<' and '>'
        if not tag.startswith("/"):
            s.push(tag)                     # an opening tag
        else:
            if s.is_empty():
                return False                # a closing tag with nothing open
            if tag[1:] != s.pop():
                return False                # closes the wrong tag
        j = raw.find("<", k + 1)            # the next '<'
    return s.is_empty()`,
  htmlRepl: `>>> page = """<body>
... <center><h1> The Little Boat </h1></center>
... <p> The storm tossed the little boat like a cheap sneaker. </p>
... <ol>
... <li> Will the salesman die? </li>
... <li> What color is the boat? </li>
... </ol>
... </body>"""
>>> is_matched_html(page)
True
>>> is_matched_html("<p><b>bold</p></b>")
False`,
  listQueue: `class ListQueue:
    """A FIFO queue in a fixed-size list used as a circle."""

    CAPACITY = 5

    def __init__(self):
        self._data = [None] * ListQueue.CAPACITY
        self._size = 0
        self._front = 0                     # index of the first element
        self._end = 0                       # index where the next element goes

    def __len__(self):
        return self._size

    def is_empty(self):
        return self._size == 0

    def first(self):
        if self.is_empty():
            raise IndexError("first from empty queue")
        return self._data[self._front]

    def dequeue(self):
        if self.is_empty():
            raise IndexError("dequeue from empty queue")
        answer = self._data[self._front]
        self._data[self._front] = None      # let the slot be reused
        self._front = (self._front + 1) % ListQueue.CAPACITY
        self._size -= 1
        return answer

    def enqueue(self, e):
        if self._size == ListQueue.CAPACITY:
            raise IndexError("enqueue to full queue")
        self._data[self._end] = e
        self._end = (self._end + 1) % ListQueue.CAPACITY
        self._size += 1`,
  queueRepl: `>>> q = ListQueue()
>>> for x in [10, 20, 30, 40]:
...     q.enqueue(x)
>>> q.dequeue(), q.dequeue()
(10, 20)
>>> q.enqueue(50)
>>> q.enqueue(60)
>>> q._data
[60, None, 30, 40, 50]
>>> q._front, q._end, len(q)
(2, 1, 4)
>>> [q.dequeue() for _ in range(4)]
[30, 40, 50, 60]`,
  webService: `class WebService:
    """Requests wait in a queue and are processed first come, first served."""

    def __init__(self):
        self._requests = ListQueue()        # each request is a pair (name, seconds)

    def task_arrive(self, name, seconds):
        if len(self._requests) < ListQueue.CAPACITY:
            self._requests.enqueue((name, seconds))
            print(f"A new task '{name}' has arrived and is waiting for processing...")
        else:
            print("The service queue of our website is full, the new task is dropped.")

    def task_process(self):
        if not self._requests.is_empty():
            name, seconds = self._requests.dequeue()
            print(f"Task '{name}' has been processed, it costs {seconds} seconds.")`,
  simulate: `def simulate(events):
    ws = WebService()
    for event in events:
        if event is None:
            ws.task_process()
        else:
            name, seconds = event
            ws.task_arrive(name, seconds)


simulate([("Matrix", 3.2), ("Inception", 1.5), ("Kungfu", 0.8), ("X-man", 2.0),
          ("Casino Royale", 4.1), ("Dark knight", 2.7), None, None,
          ("Shaolin Soccer", 1.1), None])`,
  simulateOut: `A new task 'Matrix' has arrived and is waiting for processing...
A new task 'Inception' has arrived and is waiting for processing...
A new task 'Kungfu' has arrived and is waiting for processing...
A new task 'X-man' has arrived and is waiting for processing...
A new task 'Casino Royale' has arrived and is waiting for processing...
The service queue of our website is full, the new task is dropped.
Task 'Matrix' has been processed, it costs 3.2 seconds.
Task 'Inception' has been processed, it costs 1.5 seconds.
A new task 'Shaolin Soccer' has arrived and is waiting for processing...
Task 'Kungfu' has been processed, it costs 0.8 seconds.`,
  dequeRepl: `>>> from collections import deque
>>> line = deque()
>>> line.append("first")
>>> line.append("second")
>>> line.popleft()
'first'`,
  referential: `>>> a = [1, 2, 3, 4, 5]
>>> before = [id(x) for x in a]
>>> a.insert(2, 10)
>>> a
[1, 2, 10, 3, 4, 5]
>>> [id(x) for x in a if x != 10] == before
True`,
  diagramSingly: ` head
  |
  v
+-----+---+    +-----+---+    +-----+------+
| MSP | o-+--->| ATL | o-+--->| BOS | None |
+-----+---+    +-----+---+    +-----+------+`,
  node: `class Node:
    """One node of a singly linked list."""

    def __init__(self, element, next=None):
        self.element = element              # the value stored in this node
        self.next = next                    # the next node, or None at the tail`,
  buildNodes: `bos = Node("BOS")
atl = Node("ATL", bos)
head = Node("MSP", atl)
print(head.element, head.next.element, head.next.next.element)
print(head.next.next.next)`,
  buildNodesOut: `MSP ATL BOS
None`,
  printList: `def print_list(head):
    """Print the elements of the linked list that starts at head."""
    node = head
    while node is not None:
        print(node.element, end=" -> ")
        node = node.next                    # hop to the next node
    print("None")`,
  printListRepl: `>>> print_list(head)
MSP -> ATL -> BOS -> None`,
  diagramAddFirst: `newest      head
  |          |
  v          v
+-----+---+  +-----+---+    +-----+---+    +-----+------+
| LAX | o-+->| MSP | o-+--->| ATL | o-+--->| BOS | None |
+-----+---+  +-----+---+    +-----+---+    +-----+------+`,
  linkedList: `class LinkedList:
    """A singly linked list that keeps references to its head and tail."""

    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    def add_first(self, e):
        newest = Node(e)
        newest.next = self.head             # the new node points at the old head
        self.head = newest                  # then head points at the new node
        if self.tail is None:               # the list was empty:
            self.tail = newest              # the new node is also the tail
        self.size += 1

    def add_last(self, e):
        newest = Node(e)
        if self.head is None:               # the list was empty:
            self.head = newest              # the new node is also the head
        else:
            self.tail.next = newest         # the old tail points at the new node
        self.tail = newest
        self.size += 1

    def remove_first(self):
        if self.head is None:
            raise IndexError("remove from empty list")
        answer = self.head.element
        self.head = self.head.next          # head moves to the second node
        self.size -= 1
        if self.head is None:               # the list is now empty
            self.tail = None
        return answer

    def elements(self):
        """Return the elements from head to tail as a Python list."""
        result = []
        node = self.head
        while node is not None:
            result.append(node.element)
            node = node.next
        return result`,
  citiesRepl: `>>> cities = LinkedList()
>>> for city in ["MSP", "ATL", "BOS"]:
...     cities.add_last(city)
>>> cities.add_first("LAX")
>>> cities.elements()
['LAX', 'MSP', 'ATL', 'BOS']
>>> cities.remove_first()
'LAX'
>>> cities.elements(), cities.size
(['MSP', 'ATL', 'BOS'], 3)`,
  numsRepl: `>>> nums = LinkedList()
>>> nums.add_first(1); nums.add_last(2); nums.add_first(3)
>>> nums.remove_first()
3
>>> nums.add_last(4)
>>> nums.elements(), nums.head.element, nums.tail.element
([1, 2, 4], 1, 4)`,
  addFirstWrong: `def add_first_wrong(lst, e):
    newest = Node(e)
    lst.head = newest                       # BUG: the old head is forgotten here,
    newest.next = lst.head                  # so the new node points at itself`,
  brokenRepl: `>>> broken = LinkedList()
>>> broken.add_last("MSP")
>>> add_first_wrong(broken, "LAX")
>>> broken.head.next is broken.head
True`,
  linkedStack: `class LinkedStack:
    """A LIFO stack stored in a singly linked list; the head is the top."""

    def __init__(self):
        self._head = None
        self._size = 0

    def __len__(self):
        return self._size

    def is_empty(self):
        return self._size == 0

    def push(self, e):
        self._head = Node(e, self._head)    # the new node points at the old top
        self._size += 1

    def top(self):
        if self.is_empty():
            raise IndexError("top from empty stack")
        return self._head.element

    def pop(self):
        if self.is_empty():
            raise IndexError("pop from empty stack")
        answer = self._head.element
        self._head = self._head.next
        self._size -= 1
        return answer`,
  linkedQueue: `class LinkedQueue:
    """A FIFO queue stored in a singly linked list: head = front, tail = back."""

    def __init__(self):
        self._head = None
        self._tail = None
        self._size = 0

    def __len__(self):
        return self._size

    def is_empty(self):
        return self._size == 0

    def first(self):
        if self.is_empty():
            raise IndexError("first from empty queue")
        return self._head.element

    def dequeue(self):
        if self.is_empty():
            raise IndexError("dequeue from empty queue")
        answer = self._head.element
        self._head = self._head.next
        self._size -= 1
        if self.is_empty():                 # the queue became empty
            self._tail = None
        return answer

    def enqueue(self, e):
        newest = Node(e)
        if self.is_empty():
            self._head = newest             # the only node is the head ...
        else:
            self._tail.next = newest
        self._tail = newest                 # ... and the tail
        self._size += 1`,
  linkedAdtRepl: `>>> st = LinkedStack()
>>> for x in [100, 200, 300]:
...     st.push(x)
>>> st.pop(), st.top(), len(st)
(300, 200, 2)
>>> lq = LinkedQueue()
>>> for x in [100, 200, 300]:
...     lq.enqueue(x)
>>> lq.dequeue(), lq.first(), len(lq)
(100, 200, 2)`,
  circularQueue: `class CircularQueue:
    """A FIFO queue in a circularly linked list; only the tail is stored."""

    def __init__(self):
        self._tail = None
        self._size = 0

    def __len__(self):
        return self._size

    def is_empty(self):
        return self._size == 0

    def first(self):
        if self.is_empty():
            raise IndexError("first from empty queue")
        return self._tail.next.element      # the head is the node after the tail

    def dequeue(self):
        if self.is_empty():
            raise IndexError("dequeue from empty queue")
        old_head = self._tail.next
        if self._size == 1:
            self._tail = None               # removing the only node
        else:
            self._tail.next = old_head.next # the tail skips over the old head
        self._size -= 1
        return old_head.element

    def enqueue(self, e):
        newest = Node(e)
        if self.is_empty():
            newest.next = newest            # a circle of one node
        else:
            newest.next = self._tail.next   # the new node points at the head
            self._tail.next = newest        # the old tail points at the new node
        self._tail = newest                 # the new node is the tail
        self._size += 1`,
  roundRobin: `def round_robin(q, turns):
    """Serve the clients in q in turn, for the given number of turns."""
    for _ in range(turns):
        client = q.dequeue()
        print("serve", client)
        q.enqueue(client)


programs = CircularQueue()
for name in ["browser", "editor", "music"]:
    programs.enqueue(name)
round_robin(programs, 5)`,
  roundRobinOut: `serve browser
serve editor
serve music
serve browser
serve editor`,
  diagramDll: `          +---+    +-----+    +-----+    +---+
 header ->|   |<-->| BWI |<-->| JFK |<-->|   |<- trailer
          +---+    +-----+    +-----+    +---+`,
  dll: `class DNode:
    """One node of a doubly linked list."""

    def __init__(self, element, prev, next):
        self.element = element
        self.prev = prev                    # the node before, or None for the header
        self.next = next                    # the node after, or None for the trailer


class DoublyLinkedList:
    """A doubly linked list with header and trailer sentinels."""

    def __init__(self):
        self.header = DNode(None, None, None)
        self.trailer = DNode(None, None, None)
        self.header.next = self.trailer     # an empty list: the two sentinels
        self.trailer.prev = self.header     # point at each other
        self.size = 0

    def __len__(self):
        return self.size

    def is_empty(self):
        return self.size == 0

    def insert_between(self, e, predecessor, successor):
        """Add e between two neighbouring nodes and return the new node."""
        newest = DNode(e, predecessor, successor)   # the new node's two links
        predecessor.next = newest                   # the neighbours' two links
        successor.prev = newest
        self.size += 1
        return newest

    def delete_node(self, node):
        """Remove a real node from the list and return its element."""
        predecessor = node.prev
        successor = node.next
        predecessor.next = successor        # the neighbours skip over node
        successor.prev = predecessor
        self.size -= 1
        element = node.element
        node.prev = node.next = node.element = None     # tidy up the removed node
        return element

    def elements(self):
        """Return the elements from front to back as a Python list."""
        result = []
        node = self.header.next
        while node is not self.trailer:
            result.append(node.element)
            node = node.next
        return result`,
  dllMain: `def main():
    d = DoublyLinkedList()
    node = d.insert_between(10, d.header, d.trailer)
    node = d.insert_between(20, node, d.trailer)
    node = d.insert_between(30, node, d.trailer)
    print("The elements in the list:", d.elements())
    d.delete_node(d.header.next.next)
    print("The elements in the list:", d.elements())


main()`,
  dllMainOut: `The elements in the list: [10, 20, 30]
The elements in the list: [10, 30]`,
  dllRepl: `>>> d = DoublyLinkedList()
>>> for x in [10, 20, 30]:
...     _ = d.insert_between(x, d.trailer.prev, d.trailer)
>>> d.delete_node(d.trailer.prev)
30
>>> d.elements(), len(d)
([10, 20], 2)`,
  bubbleSort: `def bubble_sort(data):
    """Sort the list data in place, smallest first, and return it."""
    n = len(data)
    while n > 1:                            # the first n elements are not yet sorted
        for i in range(n - 1):
            if data[i] > data[i + 1]:
                data[i], data[i + 1] = data[i + 1], data[i]   # swap the neighbours
        n -= 1                              # the largest of them is now at index n - 1
    return data`,
  bubbleRepl: `>>> bubble_sort([3, 4, 1, 2, 5, 8, 0, 100, 17])
[0, 1, 2, 3, 4, 5, 8, 17, 100]`,
  linkedBubble: `def linked_bubble_sort(lst):
    """Sort a LinkedList in place by swapping elements between neighbouring nodes."""
    n = lst.size
    while n > 1:
        node = lst.head
        for _ in range(n - 1):              # n - 1 comparisons, as before
            if node.element > node.next.element:
                node.element, node.next.element = node.next.element, node.element
            node = node.next                # hop instead of i += 1
        n -= 1`,
  linkedBubbleMain: `def main():
    lst = LinkedList()
    for x in [9, 8, 6, 10, 45, 67, 21, 1]:
        lst.add_last(x)
    print("Before the sorting:", lst.elements())
    linked_bubble_sort(lst)
    print("After the sorting: ", lst.elements())


main()`,
  linkedBubbleOut: `Before the sorting: [9, 8, 6, 10, 45, 67, 21, 1]
After the sorting:  [1, 6, 8, 9, 10, 21, 45, 67]`,
  companyText: `Electronics R'Us
├── R&D
├── Sales
│   ├── Domestic
│   └── International
│       ├── Canada
│       ├── S. America
│       └── Overseas
├── Purchasing
└── Manufacturing
    ├── TV
    ├── CD
    └── Tuner`,
  tree: `class Tree:
    """A node of a general tree: an element and a list of child trees."""

    def __init__(self, element, children=()):
        self.element = element
        self.children = list(children)


def outline(tree, depth=0):
    """Print the tree as an indented outline, one node per line."""
    print("    " * depth + tree.element)
    for child in tree.children:
        outline(child, depth + 1)           # each child's subtree, one level deeper`,
  companyOutline: `company = Tree("Electronics R'Us", [
    Tree("R&D"),
    Tree("Sales", [Tree("Domestic"), Tree("International", [
        Tree("Canada"), Tree("S. America"), Tree("Overseas")])]),
    Tree("Purchasing"),
    Tree("Manufacturing", [Tree("TV"), Tree("CD"), Tree("Tuner")]),
])
outline(company)`,
  companyOutlineOut: `Electronics R'Us
    R&D
    Sales
        Domestic
        International
            Canada
            S. America
            Overseas
    Purchasing
    Manufacturing
        TV
        CD
        Tuner`,
  exprText: `                    -
           /                 +
       *       +          *     6
     +   3   -   2      3   -
    3 1     9 5            7 4`,
  binaryNode: `class BinaryNode:
    """A node of a binary tree."""

    def __init__(self, element, left=None, right=None):
        self.element = element
        self.left = left                    # the left subtree, or None
        self.right = right                  # the right subtree, or None


def is_leaf(node):
    return node.left is None and node.right is None


expr = BinaryNode("-",
                  BinaryNode("/",
                             BinaryNode("*", BinaryNode("+", BinaryNode(3), BinaryNode(1)),
                                        BinaryNode(3)),
                             BinaryNode("+", BinaryNode("-", BinaryNode(9), BinaryNode(5)),
                                        BinaryNode(2))),
                  BinaryNode("+",
                             BinaryNode("*", BinaryNode(3),
                                        BinaryNode("-", BinaryNode(7), BinaryNode(4))),
                             BinaryNode(6)))`,
  traversals: `def preorder(node):
    """Elements in preorder: the node, then its left subtree, then its right."""
    if node is None:
        return []
    return [node.element] + preorder(node.left) + preorder(node.right)


def inorder(node):
    """Elements in inorder: the left subtree, then the node, then the right."""
    if node is None:
        return []
    return inorder(node.left) + [node.element] + inorder(node.right)


def postorder(node):
    """Elements in postorder: the left subtree, then the right, then the node."""
    if node is None:
        return []
    return postorder(node.left) + postorder(node.right) + [node.element]`,
  traversalsRepl: `>>> print(*preorder(expr))
- / * + 3 1 3 + - 9 5 2 + * 3 - 7 4 6
>>> print(*inorder(expr))
3 + 1 * 3 / 9 - 5 + 2 - 3 * 7 - 4 + 6
>>> print(*postorder(expr))
3 1 + 3 * 9 5 - 2 + / 3 7 4 - * 6 + -`,
  toInfix: `def to_infix(node):
    """The expression of the tree, fully bracketed."""
    if is_leaf(node):
        return str(node.element)
    return "(" + to_infix(node.left) + " " + node.element + " " + to_infix(node.right) + ")"`,
  toInfixRepl: `>>> to_infix(expr)
'((((3 + 1) * 3) / ((9 - 5) + 2)) - ((3 * (7 - 4)) + 6))'`,
  evaluate: `def evaluate(node):
    """The value of the expression tree."""
    if is_leaf(node):
        return node.element                 # a number
    left = evaluate(node.left)              # both subtrees first ...
    right = evaluate(node.right)
    if node.element == "+":                 # ... then the operator: postorder
        return left + right
    if node.element == "-":
        return left - right
    if node.element == "*":
        return left * right
    return left / right`,
  evaluateRepl: `>>> evaluate(expr)
-13.0`,
  leafPitfall: `>>> BinaryNode(3).left.element
Traceback (most recent call last):
  ...
AttributeError: 'NoneType' object has no attribute 'element'`,
  checkRepl: `>>> is_matched("{[()]}"), is_matched("{[(])}")
(True, False)
>>> small = BinaryNode("*", BinaryNode(2), BinaryNode("+", BinaryNode(3), BinaryNode(4)))
>>> print(*preorder(small)); print(*postorder(small)); evaluate(small)
* 2 + 3 4
2 3 4 + *
14`,
  ex1Repl: `>>> q = ListQueue()
>>> q.enqueue(5); q.enqueue(3); q.dequeue()
5
>>> q.enqueue(2); q.enqueue(8); q.dequeue(), q.dequeue()
(3, 2)
>>> q.enqueue(9); q.enqueue(1); q.dequeue()
8
>>> q.enqueue(7); q.enqueue(6)
>>> q._data, q._front, q._end
([1, 7, 6, None, 9], 4, 3)`,
  addLastBuggy: `def add_last_buggy(lst, e):
    newest = Node(e)
    newest.next = None
    lst.tail.next = newest
    lst.tail = newest
    lst.size += 1`,
  addLastBuggyRepl: `>>> add_last_buggy(LinkedList(), "MSP")
Traceback (most recent call last):
  ...
AttributeError: 'NoneType' object has no attribute 'next'...`,
  count: `def count(lst, target):
    total = 0
    node = lst.head
    while node is not None:
        if node.element == target:
            total += 1
        node = node.next
    return total`,
  countRepl: `>>> lst = LinkedList()
>>> for x in [3, 1, 3, 3, 2]:
...     lst.add_last(x)
>>> count(lst, 3), count(lst, 7)
(3, 0)`,
  isPalindrome: `def is_palindrome(s):
    stack = ListStack()
    for c in s:
        stack.push(c)
    for c in s:
        if c != stack.pop():                # pops come out in reverse order
            return False
    return True`,
  palindromeRepl: `>>> is_palindrome("level"), is_palindrome("noon"), is_palindrome("stack")
(True, True, False)`,
  length: `def length(node):
    if node is None:
        return 0
    return 1 + length(node.next)`,
  lengthRepl: `>>> length(head), length(None)
(3, 0)`,
  removeLast: `def remove_last(lst):
    if lst.head is None:
        raise IndexError("remove from empty list")
    answer = lst.tail.element
    if lst.head is lst.tail:                # one node: the list becomes empty
        lst.head = lst.tail = None
    else:
        node = lst.head
        while node.next is not lst.tail:    # find the node before the tail
            node = node.next
        node.next = None
        lst.tail = node
    lst.size -= 1
    return answer`,
  removeLastRepl: `>>> lst = LinkedList()
>>> for x in [1, 2, 3]:
...     lst.add_last(x)
>>> remove_last(lst), remove_last(lst), lst.elements(), lst.tail.element
(3, 2, [1], 1)
>>> remove_last(lst), lst.elements(), lst.tail
(1, [], None)`,
  height: `def height(node):
    if node is None:
        return -1
    return 1 + max(height(node.left), height(node.right))`,
  heightRepl: `>>> height(BinaryNode(3)), height(expr)
(0, 4)`,
  evaluatePostfix: `def evaluate_postfix(items):
    s = ListStack()
    for item in items:
        if item in ("+", "-", "*", "/"):
            right = s.pop()                 # popped first: the right operand
            left = s.pop()
            if item == "+":
                s.push(left + right)
            elif item == "-":
                s.push(left - right)
            elif item == "*":
                s.push(left * right)
            else:
                s.push(left / right)
        else:
            s.push(item)                    # a number
    return s.pop()`,
  postfixRepl: `>>> evaluate_postfix([3, 1, "+", 3, "*"])
12
>>> evaluate_postfix(postorder(expr)) == evaluate(expr)
True`,
  stackQueue: `class StackQueue:
    def __init__(self):
        self._inbox = ListStack()           # new elements arrive here
        self._outbox = ListStack()          # elements leave from here

    def __len__(self):
        return len(self._inbox) + len(self._outbox)

    def enqueue(self, e):
        self._inbox.push(e)

    def dequeue(self):
        if self._outbox.is_empty():
            while not self._inbox.is_empty():
                self._outbox.push(self._inbox.pop())    # reverses the order
        return self._outbox.pop()           # raises IndexError if both are empty`,
  stackQueueRepl: `>>> sq = StackQueue()
>>> for x in [1, 2, 3]:
...     sq.enqueue(x)
>>> sq.dequeue()
1
>>> sq.enqueue(4)
>>> [sq.dequeue() for _ in range(3)]
[2, 3, 4]`,
  testQueue: `import random


def test_queue(make_queue, steps, seed):
    """Run random operations on a queue and on a Python list; they must agree."""
    random.seed(seed)
    q = make_queue()
    reference = []
    for _ in range(steps):
        if reference and random.random() < 0.4:
            assert q.dequeue() == reference.pop(0)
        else:
            x = random.randint(0, 99)
            q.enqueue(x)
            reference.append(x)
        assert len(q) == len(reference)
    return "all agree"`,
  testQueueRepl: `>>> test_queue(LinkedQueue, 1000, 1)
'all agree'
>>> test_queue(CircularQueue, 1000, 2)
'all agree'`,
};

// ---------- L10 helpers ----------

// Styles for the widgets that only this lecture uses (kept here so assets/ stays shared).
(function addStyles() {
  const css = `
  .l10-stack{display:flex;flex-direction:column-reverse;align-items:center;gap:5px;min-height:210px;background:var(--paper-2);border-radius:10px;padding:10px}
  .l10-item{width:min(170px,80%);text-align:center;border:1px solid var(--line);background:var(--card);border-radius:7px;padding:6px;font:600 14px var(--mono)}
  .l10-item.top{border-color:var(--teal);box-shadow:inset 3px 0 0 var(--teal)}
  .l10-item.hl{background:var(--mark);border-color:var(--amber)}
  .l10-item.bad{background:var(--red-soft);border-color:var(--red)}
  .l10-item.new{animation:pushin .25s ease-out}
  .l10-floor{width:min(190px,86%);border-top:3px solid var(--ink-2);margin-top:2px}
  .l10-cap{font:500 11px var(--mono);color:var(--stone);text-align:center;margin:6px 0 0}
  .l10-chars{display:flex;flex-wrap:wrap;gap:3px;justify-content:center;margin:6px 0 10px}
  .l10-ch{min-width:24px;height:30px;display:grid;place-items:center;border:1px solid var(--line);border-radius:5px;background:var(--card);font:600 14px var(--mono);padding:0 5px}
  .l10-ch.cur{background:var(--mark);border-color:var(--amber)}
  .l10-ch.done{opacity:.45}
  .l10-ch.bad{background:var(--red-soft);border-color:var(--red);color:var(--red)}
  .l10-ch.plain{border-color:transparent;background:transparent;color:var(--stone);font-weight:400;min-width:10px;padding:0 1px}
  .l10-side{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px;align-items:start}
  .l10-view{margin-bottom:12px}
  .cell.empty{color:var(--stone);font-weight:400}
  .cell.sorted{background:var(--green-soft);border-color:var(--green);color:var(--green)}
  .cell.wide{width:auto;min-width:52px;padding:0 6px;font-size:12px}
  .l10-arrow{align-self:center;color:var(--stone);font:600 14px var(--mono);padding-top:16px}
  @media (max-width:600px){.l10-side{grid-template-columns:minmax(0,1fr)}.cell.wide{min-width:38px;font-size:11px}
    .demo .px-view .svgbox,.demo .tx-svg{overflow-x:auto}
    .demo .px-view .svgbox svg{min-width:440px}
    .demo[data-demo="traversal"] .tx-svg svg{min-width:500px}
    .demo[data-demo="outline"] .tx-svg svg{min-width:720px}}`;
  const st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);
})();

// 1-based number of the first line of `code` containing `needle`, searching after the
// first line that contains `after` (if given). Keeps line highlights tied to the code text.
function lineOf(code, needle, after) {
  const lines = code.split("\n");
  let start = 0;
  if (after) start = lines.findIndex((l) => l.includes(after)) + 1;
  const k = lines.findIndex((l, j) => j >= start && l.includes(needle));
  if (k < 0) console.warn("lineOf: not found", needle);
  return k + 1;
}

// The lines of `code` from the line containing `from` up to (not including) the line containing
// `to`, with their common indentation removed (for a method shown out of its class).
function excerpt(code, from, to) {
  const lines = code.split("\n");
  const a = lines.findIndex((l) => l.includes(from));
  const b = to ? lines.findIndex((l, j) => j > a && l.includes(to)) : lines.length;
  const part = lines.slice(a, b);
  while (part.length && !part[part.length - 1].trim()) part.pop();
  const indent = Math.min(...part.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
  return part.map((l) => l.slice(indent)).join("\n");
}

const pyStr = (v) => (typeof v === "string" ? `'${v}'` : String(v));
const pyList = (xs) => `[${xs.map(pyStr).join(", ")}]`;

// Records snapshots: {line, msg, msgCls, out, ...state}. `state` must be plain data.
class Rec {
  constructor() { this.snaps = []; this.out = []; this.marks = []; }
  snap(line, msg, msgCls = "", state = {}) {
    this.snaps.push({ line, msg, msgCls, out: this.out.slice(), ...state });
  }
  mark() { this.marks.push(this.snaps.length); }
}

// Generic step-through player: a picture on top, then the code (and console) below.
// opts: build() -> snaps, view(snap) -> html, code (string or function), showConsole,
//       extraControls, onMount(root, api), mini, consoleLabel.
function makePlayer(el, opts) {
  const mini = !!opts.mini;
  el.innerHTML = `
    <div class="px-view"></div>
    ${mini ? "" : `<div class="msg px-msg"></div>
    <div class="controls" style="margin-bottom:12px">
      <button class="cbtn px-reset" title="Back to the start">⟲ Reset</button>
      <button class="cbtn px-back" title="Step back (←)">◀ Back</button>
      <button class="cbtn px-step on" title="Step (→)">Step ▶</button>
      <button class="cbtn px-play">Play</button>
      ${opts.extraControls || ""}
      <span class="spacer"></span><span class="counter px-count"></span>
    </div>
    <div class="${opts.showConsole ? "stepper" : ""}">
      <div class="px-code"></div>
      ${opts.showConsole ? `<div><div class="counter" style="margin-bottom:4px">${opts.consoleLabel || "printed output"}</div><div class="console px-out" style="margin-top:0"></div></div>` : ""}
    </div>`}`;
  const $ = (s) => el.querySelector(s);
  let snaps = [], i = 0, timer = null, codeLines = [];

  function renderCode() {
    if (mini) return;
    const code = typeof opts.code === "function" ? opts.code() : opts.code;
    $(".px-code").innerHTML = codeBlock(code);
    codeLines = [...el.querySelectorAll(".px-code .ln")];
  }
  function render() {
    const s = snaps[i];
    $(".px-view").innerHTML = opts.view(s, i, snaps);
    if (mini) return;
    codeLines.forEach((ln, k) => ln.classList.toggle("hl", k + 1 === s.line));
    const msg = $(".px-msg");
    msg.innerHTML = s.msg;
    msg.className = "msg px-msg " + (s.msgCls || "");
    if (opts.showConsole) { const o = $(".px-out"); o.textContent = s.out.join("\n"); o.scrollTop = o.scrollHeight; }
    $(".px-count").textContent = `step ${i + 1} / ${snaps.length}`;
    $(".px-back").disabled = $(".px-reset").disabled = i === 0;
    $(".px-step").disabled = i === snaps.length - 1;
  }
  function stop() { clearInterval(timer); timer = null; if (!mini) $(".px-play").textContent = "Play"; }
  function play() {
    if (timer) return stop();
    if (i === snaps.length - 1) i = 0;
    if (!mini) $(".px-play").textContent = "Pause";
    timer = setInterval(() => {
      if (i < snaps.length - 1) i++;
      else if (mini) i = 0;
      else return stop();
      render();
    }, mini ? (opts.miniDelay || 900) : (opts.delay || 750));
  }
  function rebuild(goTo) {
    stop();
    renderCode();
    snaps = opts.build();
    i = goTo === undefined ? 0 : Math.max(0, Math.min(goTo, snaps.length - 1));
    render();
  }
  if (!mini) {
    $(".px-reset").onclick = () => { stop(); i = 0; render(); };
    $(".px-back").onclick = () => { stop(); if (i > 0) i--; render(); };
    $(".px-step").onclick = () => { stop(); if (i < snaps.length - 1) i++; render(); };
    $(".px-play").onclick = play;
    el.tabIndex = 0;
    el.addEventListener("keydown", (e) => {
      if (["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "ArrowRight") { e.preventDefault(); $(".px-step").click(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); $(".px-back").click(); }
    });
  }
  const api = { rebuild, stop, play, snaps: () => snaps };
  if (opts.onMount) opts.onMount(el, api);
  rebuild();
  if (mini) play();
  return api;
}

// Parse an operation script like "10 20 pop top" or "5, 3, deq". Numbers become pushes.
function parseOps(text, words) {
  return String(text).split(/[\s,]+/).filter(Boolean).slice(0, 24).map((t) => {
    const w = t.toLowerCase();
    if (words.includes(w)) return { op: w };
    const n = Number(t);
    return { op: "add", value: Number.isFinite(n) ? Math.trunc(n) : t.slice(0, 8) };
  });
}

// ---------- Chapter 1: the stack ----------

function traceStack(ops, code) {
  const r = new Rec();
  const data = [];
  const L = {
    init: lineOf(code, "self._data = []"),
    push: lineOf(code, "self._data.append(e)"),
    topCheck: lineOf(code, "if self.is_empty()", "def top"),
    topRaise: lineOf(code, "raise IndexError", "def top"),
    top: lineOf(code, "return self._data[-1]"),
    popRaise: lineOf(code, "raise IndexError", "def pop"),
    pop: lineOf(code, "return self._data.pop()"),
  };
  const st = (extra = {}) => ({ data: data.slice(), ...extra });
  r.snap(L.init, "<code>s = ListStack()</code> makes an empty list. The top of the stack will be the end of that list.", "", st());
  for (const o of ops) {
    r.mark();
    if (o.op === "add") {
      data.push(o.value);
      r.snap(L.push, `<code>s.push(${o.value})</code>: <code>append</code> puts ${o.value} at the end of the list, which is the top.`, "", st({ fresh: true }));
    } else if (o.op === "top") {
      if (!data.length) { r.snap(L.topRaise, "<code>s.top()</code> on an empty stack: <code>IndexError: top from empty stack</code>.", "bad", st()); return r; }
      r.out.push(String(data[data.length - 1]));
      r.snap(L.top, `<code>s.top()</code> returns ${data[data.length - 1]} and leaves it where it is.`, "", st({ hl: true }));
    } else {
      if (!data.length) { r.snap(L.popRaise, "<code>s.pop()</code> on an empty stack: <code>IndexError: pop from empty stack</code>. Check <code>is_empty()</code> first.", "bad", st({ bad: true })); return r; }
      r.snap(L.pop, `<code>s.pop()</code>: the top element, ${data[data.length - 1]}, is the one that leaves.`, "", st({ hl: true }));
      const v = data.pop();
      r.out.push(String(v));
      r.snap(L.pop, `<code>s.pop()</code> returned ${v}. ${data.length ? `Now ${data[data.length - 1]} is on top.` : "The stack is empty again."}`, "good", st());
    }
  }
  r.snap(0, `Done. Left on the stack, bottom to top: <code>${pyList(data)}</code>.`, "good", st());
  return r;
}

function stackView(s) {
  const n = s.data.length;
  const items = s.data.map((v, k) => {
    const top = k === n - 1;
    const cls = ["l10-item", top ? "top" : "", top && s.hl ? "hl" : "", top && s.fresh ? "new" : ""].join(" ");
    return `<div class="${cls}">${esc(v)}${top ? ' <span style="font-weight:400;color:var(--stone)">← top</span>' : ""}</div>`;
  });
  return `<div class="l10-stack"><div class="l10-floor"></div>${items.join("")}${s.bad ? '<div class="l10-item bad">empty!</div>' : ""}</div>
    <p class="l10-cap">_data = ${esc(pyList(s.data))} · len(s) = ${n}</p>`;
}

const STACK_SCRIPTS = {
  main: "100 200 300 top pop top",
  predict: "5 3 pop 2 8 pop pop 9 1 pop",
  empty: "7 pop pop",
};

function demoStack(el, { mini = false } = {}) {
  let text = mini ? "1 2 3 pop 4 pop pop pop" : STACK_SCRIPTS.main;
  makePlayer(el, {
    mini, miniDelay: 800, showConsole: true, consoleLabel: "values returned by top() and pop()",
    code: CODE.listStack,
    build: () => traceStack(parseOps(text, ["pop", "top"]), CODE.listStack).snaps,
    view: stackView,
    extraControls: `<select class="st-pick">
        <option value="main">the slides' main()</option>
        <option value="predict">the Predict box sequence</option>
        <option value="empty">pop an empty stack</option></select>
      <label>ops <input type="text" class="st-ops" value="${text}" style="width:190px" title="numbers are pushed; pop and top are operations"></label>`,
    onMount(root, api) {
      if (mini) return;
      const inp = root.querySelector(".st-ops");
      root.querySelector(".st-pick").onchange = (e) => { text = STACK_SCRIPTS[e.target.value]; inp.value = text; api.rebuild(); };
      inp.onchange = () => { text = inp.value; api.rebuild(); };
    },
  });
}

// ---------- Chapter 2: matching with a stack ----------

const MATCH_EXAMPLES = {
  brackets: ["1+2*(3+4)-[5-6]", "((()}]", "(()", "())(", "([)]", "{[()]}"],
  html: ["<body><center><h1> The Little Boat </h1></center><p> The storm tossed the boat. </p><ol><li> Will the salesman die? </li><li> What color is the boat? </li></ol></body>",
    "<p><b>bold</p></b>", "<ol><li> one </li>"],
};

function traceBrackets(expr, code) {
  const r = new Rec();
  const stack = [];
  const lefty = "([{", righty = ")]}";
  const L = {
    loop: lineOf(code, "for c in expr"),
    push: lineOf(code, "s.push(c)"),
    empty: lineOf(code, "return False", "if s.is_empty()"),
    cmp: lineOf(code, "righty.index(c)"),
    wrong: lineOf(code, "return False", "righty.index(c)"),
    end: lineOf(code, "return s.is_empty()"),
  };
  const st = (k, extra = {}) => ({ chars: [...expr], cur: k, stack: stack.slice(), ...extra });
  r.snap(L.loop, `Read <code>${esc(expr)}</code> one character at a time. Only brackets matter; everything else is skipped.`, "", st(-1));
  for (let k = 0; k < expr.length; k++) {
    const c = expr[k];
    if (lefty.includes(c)) {
      stack.push(c);
      r.snap(L.push, `<code>${c}</code> opens a bracket: push it.`, "", st(k, { fresh: true }));
    } else if (righty.includes(c)) {
      if (!stack.length) {
        r.snap(L.empty, `<code>${c}</code> closes a bracket, but the stack is empty: nothing to match. <b>return False</b>.`, "bad", st(k, { badAt: k }));
        return r;
      }
      const top = stack[stack.length - 1];
      r.snap(L.cmp, `<code>${c}</code> closes a bracket: pop the most recent open one, <code>${top}</code>, and compare.`, "", st(k, { hl: true }));
      stack.pop();
      if (righty.indexOf(c) !== lefty.indexOf(top)) {
        r.snap(L.wrong, `<code>${top}</code> and <code>${c}</code> are different kinds. <b>return False</b>.`, "bad", st(k, { badAt: k }));
        return r;
      }
      r.snap(L.cmp, `<code>${top}</code> matches <code>${c}</code>. Carry on.`, "good", st(k));
    }
  }
  const ok = stack.length === 0;
  r.snap(L.end, ok ? "End of the string and the stack is empty: every bracket was closed. <b>return True</b>."
    : `End of the string, but <code>${stack.join(" ")}</code> ${stack.length > 1 ? "are" : "is"} still open. <b>return False</b>.`, ok ? "good" : "bad", st(expr.length));
  return r;
}

function htmlTags(raw) {
  const tags = [];
  let j = raw.indexOf("<");
  while (j !== -1) {
    const k = raw.indexOf(">", j + 1);
    if (k === -1) { tags.push({ tag: null }); break; }
    tags.push({ tag: raw.slice(j + 1, k) });
    j = raw.indexOf("<", k + 1);
  }
  return tags;
}

function traceHtml(raw, code) {
  const r = new Rec();
  const stack = [];
  const tags = htmlTags(raw);
  const L = {
    find: lineOf(code, "j = raw.find(\"<\")"),
    never: lineOf(code, "return False", "if k == -1"),
    push: lineOf(code, "s.push(tag)"),
    empty: lineOf(code, "return False", "if s.is_empty()"),
    cmp: lineOf(code, "if tag[1:] != s.pop()"),
    wrong: lineOf(code, "return False", "if tag[1:] != s.pop()"),
    end: lineOf(code, "return s.is_empty()"),
  };
  const chips = tags.map((t) => (t.tag === null ? "<…" : `<${t.tag}>`));
  const st = (k, extra = {}) => ({ chars: chips, cur: k, stack: stack.slice(), ...extra });
  r.snap(L.find, `The page has ${tags.length} tags. Find each <code>&lt;</code>, then the <code>&gt;</code> after it; the text between is the tag.`, "", st(-1));
  for (let k = 0; k < tags.length; k++) {
    const t = tags[k].tag;
    if (t === null) { r.snap(L.never, "A <code>&lt;</code> with no <code>&gt;</code> after it: <b>return False</b>.", "bad", st(k, { badAt: k })); return r; }
    if (!t.startsWith("/")) {
      stack.push(t);
      r.snap(L.push, `<code>&lt;${esc(t)}&gt;</code> is an opening tag: push <code>${esc(t)}</code>.`, "", st(k, { fresh: true }));
    } else {
      if (!stack.length) { r.snap(L.empty, `<code>&lt;${esc(t)}&gt;</code> closes a tag, but nothing is open. <b>return False</b>.`, "bad", st(k, { badAt: k })); return r; }
      const top = stack[stack.length - 1];
      r.snap(L.cmp, `<code>&lt;${esc(t)}&gt;</code> closes a tag: pop <code>${esc(top)}</code> and compare it with <code>${esc(t.slice(1))}</code>.`, "", st(k, { hl: true }));
      stack.pop();
      if (t.slice(1) !== top) { r.snap(L.wrong, `<code>${esc(t.slice(1))}</code> ≠ <code>${esc(top)}</code>: the tags close in the wrong order. <b>return False</b>.`, "bad", st(k, { badAt: k })); return r; }
      r.snap(L.cmp, `<code>${esc(top)}</code> is closed. Carry on.`, "good", st(k));
    }
  }
  const ok = stack.length === 0;
  r.snap(L.end, ok ? "No more tags and the stack is empty. <b>return True</b>." : `No more tags, but <code>${esc(stack.join(", "))}</code> ${stack.length > 1 ? "are" : "is"} never closed. <b>return False</b>.`, ok ? "good" : "bad", st(tags.length));
  return r;
}

function matchView(s) {
  const chips = s.chars.map((c, k) => {
    const isBr = c.length > 1 || "([{)]}".includes(c);
    let cls = "l10-ch";
    if (!isBr) cls += " plain";
    if (k === s.badAt) cls += " bad";
    else if (k === s.cur) cls += " cur";
    else if (k < s.cur) cls += " done";
    return `<span class="${cls}">${esc(c === " " ? "␣" : c)}</span>`;
  }).join("");
  const n = s.stack.length;
  const items = s.stack.map((v, k) => `<div class="l10-item ${k === n - 1 ? "top" : ""} ${k === n - 1 && s.hl ? "hl" : ""} ${k === n - 1 && s.fresh ? "new" : ""}">${esc(v)}</div>`).join("");
  return `<div class="l10-chars">${chips}</div>
    <div class="l10-stack" style="min-height:150px"><div class="l10-floor"></div>${items}</div><p class="l10-cap">the stack of open ${s.chars.some((c) => c.length > 1) ? "tags" : "brackets"}</p>`;
}

function demoMatcher(el, { mini = false } = {}) {
  let mode = "brackets", text = mini ? "{[(5+x)-(y+z)]}" : MATCH_EXAMPLES.brackets[0];
  const options = () => MATCH_EXAMPLES[mode].map((x, k) => `<option value="${k}">${esc(x.length > 34 ? x.slice(0, 32) + "…" : x)}</option>`).join("");
  makePlayer(el, {
    mini, miniDelay: 800,
    code: () => (mode === "brackets" ? CODE.isMatched : CODE.isMatchedHtml),
    build: () => (mode === "brackets" ? traceBrackets(text, CODE.isMatched) : traceHtml(text, CODE.isMatchedHtml)).snaps,
    view: matchView,
    extraControls: `<select class="mt-mode"><option value="brackets">brackets: is_matched</option><option value="html">HTML tags: is_matched_html</option></select>
      <select class="mt-ex">${options()}</select>
      <label>your own <input type="text" class="mt-in" style="width:170px" placeholder="type, then Enter"></label>`,
    onMount(root, api) {
      if (mini) return;
      const ex = root.querySelector(".mt-ex");
      root.querySelector(".mt-mode").onchange = (e) => { mode = e.target.value; ex.innerHTML = options(); text = MATCH_EXAMPLES[mode][0]; api.rebuild(); };
      ex.onchange = () => { text = MATCH_EXAMPLES[mode][+ex.value]; api.rebuild(); };
      root.querySelector(".mt-in").onchange = (e) => { if (e.target.value) { text = e.target.value.slice(0, mode === "html" ? 300 : 40); api.rebuild(); } };
    },
  });
}

// ---------- Chapter 3: queues ----------

const CAP = 5;

function traceListQueue(ops, code) {
  const r = new Rec();
  const data = Array(CAP).fill(null);
  let front = 0, end = 0, size = 0;
  const L = {
    init: lineOf(code, "self._data = [None]"),
    store: lineOf(code, "self._data[self._end] = e"),
    endMove: lineOf(code, "self._end = (self._end + 1)"),
    full: lineOf(code, "raise IndexError(\"enqueue"),
    answer: lineOf(code, "answer = self._data[self._front]"),
    frontMove: lineOf(code, "self._front = (self._front + 1)"),
    empty: lineOf(code, "raise IndexError(\"dequeue"),
  };
  const st = (extra = {}) => {
    const order = [];
    for (let k = 0; k < size; k++) order.push(data[(front + k) % CAP]);
    return { data: data.slice(), front, end, size, order, ...extra };
  };
  r.snap(L.init, "An empty queue: five slots, <code>_front = 0</code>, <code>_end = 0</code>, <code>_size = 0</code>.", "", st());
  for (const o of ops) {
    if (o.op === "add") {
      if (size === CAP) { r.snap(L.full, `<code>enqueue(${o.value})</code>: all ${CAP} slots are in use. <code>IndexError: enqueue to full queue</code>.`, "bad", st()); return r; }
      data[end] = o.value;
      r.snap(L.store, `<code>enqueue(${o.value})</code>: store it in slot <code>_end = ${end}</code>.`, "", st({ hl: end }));
      const old = end;
      end = (end + 1) % CAP; size++;
      r.snap(L.endMove, `<code>_end = (${old} + 1) % ${CAP} = ${end}</code>${old === CAP - 1 ? " — it <b>wraps around</b> to slot 0." : "."} Size ${size}.`, old === CAP - 1 ? "good" : "", st({ hl: old }));
    } else {
      if (!size) { r.snap(L.empty, "<code>dequeue()</code> on an empty queue: <code>IndexError: dequeue from empty queue</code>.", "bad", st()); return r; }
      const v = data[front];
      r.snap(L.answer, `<code>dequeue()</code>: the first element is in slot <code>_front = ${front}</code>: ${v}.`, "", st({ hl: front }));
      data[front] = null;
      const old = front;
      front = (front + 1) % CAP; size--;
      r.out.push(`dequeue() -> ${v}`);
      r.snap(L.frontMove, `Slot ${old} is cleared; <code>_front = (${old} + 1) % ${CAP} = ${front}</code>${old === CAP - 1 ? " — it wraps around." : "."} Returns ${v}.`, "good", st());
    }
  }
  r.snap(0, `Done. Front to back the queue is <code>${pyList(st().order)}</code>; <code>_data = ${pyList(data.map((x) => (x === null ? "None" : x))).replace(/'None'/g, "None")}</code>.`, "good", st());
  return r;
}

function queueCells(s, fmt = (v) => v) {
  return `<div class="cells">` + s.data.map((v, k) => {
    const p = [];
    if (k === s.front) p.push("front");
    if (k === s.end) p.push(`<span class="m">end</span>`);
    let cls = "cell" + (v === null ? " empty" : "") + (fmt !== queueCells.id ? " wide" : "");
    if (s.hl === k) cls += " mid";
    return `<div class="cellcol"><div class="ptr">${p.join(" ")}</div><div class="${cls}">${v === null ? "None" : esc(fmt(v))}</div><div class="cellidx">${k}</div></div>`;
  }).join("") + `</div>`;
}
queueCells.id = (v) => v;

function queueView(s) {
  return queueCells(s, queueCells.id) + `<p class="l10-cap">queue, front to back: ${esc(pyList(s.order))} · _size = ${s.size}</p>`;
}

const QUEUE_SCRIPTS = { predict: "10 20 30 40 deq deq 50 60 deq deq deq deq", ex1: "5 3 deq 2 8 deq deq 9 1 deq 7 6", full: "1 2 3 4 5 6" };

function demoQueue(el, { mini = false } = {}) {
  let text = mini ? "1 2 3 deq 4 5 deq 6 deq deq 7 deq deq deq" : QUEUE_SCRIPTS.predict;
  makePlayer(el, {
    mini, miniDelay: 700, showConsole: true, consoleLabel: "values returned by dequeue()",
    code: CODE.listQueue,
    build: () => traceListQueue(parseOps(text, ["deq", "dequeue"]).map((o) => (o.op === "add" ? o : { op: "deq" })), CODE.listQueue).snaps,
    view: queueView,
    extraControls: `<select class="q-pick"><option value="predict">the Predict box</option><option value="ex1">Exercise 1</option><option value="full">a sixth element</option></select>
      <label>ops <input type="text" class="q-ops" value="${text}" style="width:210px" title="numbers are enqueued; deq dequeues"></label>`,
    onMount(root, api) {
      if (mini) return;
      const inp = root.querySelector(".q-ops");
      root.querySelector(".q-pick").onchange = (e) => { text = QUEUE_SCRIPTS[e.target.value]; inp.value = text; api.rebuild(); };
      inp.onchange = () => { text = inp.value; api.rebuild(); };
    },
  });
}

const WEB_EVENTS = [["Matrix", 3.2], ["Inception", 1.5], ["Kungfu", 0.8], ["X-man", 2.0],
  ["Casino Royale", 4.1], ["Dark knight", 2.7], null, null, ["Shaolin Soccer", 1.1], null];

function traceWebService(code) {
  const r = new Rec();
  const data = Array(CAP).fill(null);
  let front = 0, end = 0, size = 0;
  const fmtSec = (x) => (Number.isInteger(x) ? x.toFixed(1) : String(x));
  const L = {
    enq: lineOf(code, "self._requests.enqueue"),
    drop: lineOf(code, "is full, the new task is dropped"),
    deq: lineOf(code, "name, seconds = self._requests.dequeue()"),
  };
  const st = (extra = {}) => {
    const order = [];
    for (let k = 0; k < size; k++) order.push(data[(front + k) % CAP][0]);
    return { data: data.map((x) => (x ? x[0] : null)), front, end, size, order, ...extra };
  };
  r.snap(0, "An empty service queue with room for 5 requests. Step through the ten events of <code>simulate</code>.", "", st());
  for (const ev of WEB_EVENTS) {
    if (ev) {
      const [name, sec] = ev;
      if (size < CAP) {
        data[end] = ev; const at = end; end = (end + 1) % CAP; size++;
        r.out.push(`A new task '${name}' has arrived and is waiting for processing...`);
        r.snap(L.enq, `<b>${esc(name)}</b> arrives (${fmtSec(sec)} s). ${size} request${size > 1 ? "s" : ""} waiting.`, "", st({ hl: at }));
      } else {
        r.out.push("The service queue of our website is full, the new task is dropped.");
        r.snap(L.drop, `<b>${esc(name)}</b> arrives, but all 5 places are taken: it is <b>dropped</b>.`, "bad", st());
      }
    } else {
      const [name, sec] = data[front]; data[front] = null; front = (front + 1) % CAP; size--;
      r.out.push(`Task '${name}' has been processed, it costs ${fmtSec(sec)} seconds.`);
      r.snap(L.deq, `The server takes the request at the front: <b>${esc(name)}</b>. First come, first served.`, "good", st());
    }
  }
  r.snap(0, `Still waiting, front to back: ${st().order.map(esc).join(", ")}.`, "good", st());
  return r;
}

function demoWebService(el) {
  makePlayer(el, {
    showConsole: true, consoleLabel: "printed output",
    code: CODE.webService,
    build: () => traceWebService(CODE.webService).snaps,
    view: (s) => queueCells(s, (v) => (v.length > 9 ? v.slice(0, 8) + "…" : v)) + `<p class="l10-cap">waiting, front to back: ${esc(s.order.join(", ") || "nobody")}</p>`,
  });
}

// ---------- linked lists: drawing ----------

// A linked structure is {nodes: {id: {el, next}}, vars: {name: id|null}, entry: var name}.
// Layout: follow chains of next links. Chains that start at a node nobody points to come
// first (the one that contains the head first of all); cycles start at the entry node.
function layoutChains(g, entryId) {
  const ids = Object.keys(g.nodes).map(Number);
  const indeg = {};
  ids.forEach((id) => { indeg[id] = 0; });
  ids.forEach((id) => { const n = g.nodes[id].next; if (n !== null && n !== undefined && n in indeg) indeg[n]++; });
  const placed = new Set();
  const chains = [];
  const follow = (start) => {
    const ch = [];
    let c = start;
    while (c !== null && c !== undefined && !placed.has(c) && g.nodes[c]) { placed.add(c); ch.push(c); c = g.nodes[c].next; }
    return ch;
  };
  ids.filter((id) => indeg[id] === 0).forEach((id) => chains.push(follow(id)));
  if (entryId !== null && entryId !== undefined && !placed.has(entryId)) chains.push(follow(entryId));
  ids.forEach((id) => { if (!placed.has(id)) chains.push(follow(id)); });
  chains.sort((a, b) => (b.includes(entryId) ? 1 : 0) - (a.includes(entryId) ? 1 : 0));
  const order = [].concat(...chains);
  return { order, chains };
}

function reachable(g, startId) {
  const seen = new Set();
  let c = startId;
  while (c !== null && c !== undefined && !seen.has(c) && g.nodes[c]) { seen.add(c); c = g.nodes[c].next; }
  return seen;
}

// Draw a singly linked structure. s: {nodes, vars, entry, hl: {link, vars: [], node}}.
function linkedSVG(s, { boxW = 96, gap = 44, extra = "" } = {}) {
  const g = s;
  let entryId = g.vars[g.entry];
  if (g.circular && entryId !== null && entryId !== undefined && g.nodes[entryId]) entryId = g.nodes[entryId].next;
  const { order, chains } = layoutChains(g, entryId);
  const live = reachable(g, g.circular ? g.vars[g.entry] : entryId);
  const pos = {};
  let x = 24;
  chains.forEach((ch, ci) => {
    if (ci > 0) x += 16;
    ch.forEach((id) => { pos[id] = x; x += boxW + gap; });
  });
  const varNames = Object.keys(g.vars).filter((v) => g.vars[v] !== null && g.vars[v] !== undefined && g.nodes[g.vars[v]]);
  const W = Math.max(x + 30, 520);
  const rowY = 74, H = 150, cellH = 32;
  const hl = s.hl || {};
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="linked list"><defs>
    <marker id="l10a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink-2)"/></marker>
    <marker id="l10h" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--amber)"/></marker></defs>`;
  // next links
  order.forEach((id) => {
    const n = g.nodes[id];
    const x0 = pos[id] + boxW - 14, y0 = rowY;
    const isH = hl.link === id;
    const col = isH ? "var(--amber)" : "var(--ink-2)", mk = isH ? "l10h" : "l10a", sw = isH ? 2.4 : 1.5;
    const op = live.has(id) ? 1 : 0.45;
    if (n.next === null || n.next === undefined) {
      svg += `<g opacity="${op}"><line x1="${x0}" y1="${y0}" x2="${x0 + 26}" y2="${y0}" stroke="${col}" stroke-width="${sw}" marker-end="url(#${mk})"/><text x="${x0 + 30}" y="${y0 + 4}" font-size="12" fill="var(--stone)">None</text></g>`;
    } else if (n.next === id) {
      svg += `<path d="M ${x0} ${y0} C ${x0 + 40} ${y0 - 10}, ${x0 + 30} ${y0 + 40}, ${pos[id] + boxW / 2} ${rowY + cellH / 2}" fill="none" stroke="${col}" stroke-width="${sw}" marker-end="url(#${mk})" opacity="${op}"/>`;
    } else if (pos[n.next] === pos[id] + boxW + gap) {
      svg += `<line x1="${x0}" y1="${y0}" x2="${pos[n.next] - 2}" y2="${y0}" stroke="${col}" stroke-width="${sw}" marker-end="url(#${mk})" opacity="${op}"/>`;
    } else {
      const tx = pos[n.next] + boxW / 2;
      const dip = rowY + cellH / 2 + 34;
      svg += `<path d="M ${x0} ${y0} C ${x0 + 30} ${y0}, ${x0 + 20} ${dip}, ${(x0 + tx) / 2} ${dip} S ${tx} ${dip}, ${tx} ${rowY + cellH / 2 + 2}" fill="none" stroke="${col}" stroke-width="${sw}" marker-end="url(#${mk})" opacity="${op}"/>`;
    }
  });
  // nodes
  order.forEach((id) => {
    const n = g.nodes[id];
    const x0 = pos[id];
    const isLive = live.has(id);
    const isH = hl.node === id;
    const fill = isH ? "var(--mark)" : isLive ? "var(--card)" : "var(--paper)";
    const stroke = isH ? "var(--amber)" : isLive ? "var(--teal)" : "var(--stone)";
    svg += `<g opacity="${isLive ? 1 : 0.55}"><rect x="${x0}" y="${rowY - cellH / 2}" width="${boxW}" height="${cellH}" rx="5" fill="${fill}" stroke="${stroke}" stroke-width="1.5" ${isLive ? "" : 'stroke-dasharray="4 3"'}/>
      <line x1="${x0 + boxW - 28}" y1="${rowY - cellH / 2}" x2="${x0 + boxW - 28}" y2="${rowY + cellH / 2}" stroke="${stroke}" stroke-width="1.2"/>
      <text x="${x0 + (boxW - 28) / 2}" y="${rowY + 5}" text-anchor="middle" font-size="${String(n.el).length > 6 ? 11 : 14}" font-weight="600" fill="var(--ink)">${esc(n.el)}</text>
      <circle cx="${x0 + boxW - 14}" cy="${rowY}" r="3" fill="${stroke}"/></g>`;
  });
  // variable labels
  const byNode = {};
  varNames.forEach((v) => { (byNode[g.vars[v]] = byNode[g.vars[v]] || []).push(v); });
  Object.entries(byNode).forEach(([id, names]) => {
    const cx = pos[id] + (boxW - 28) / 2;
    const isH = names.some((v) => (hl.vars || []).includes(v));
    const col = isH ? "var(--amber)" : "var(--teal)";
    svg += `<text x="${cx}" y="18" text-anchor="middle" font-size="12" font-weight="600" fill="${col}">${esc(names.join(", "))}</text>
      <line x1="${cx}" y1="24" x2="${cx}" y2="${rowY - cellH / 2 - 3}" stroke="${col}" stroke-width="${isH ? 2.2 : 1.4}" marker-end="url(#${isH ? "l10h" : "l10a"})"/>`;
  });
  const nullVars = Object.keys(g.vars).filter((v) => g.vars[v] === null);
  if (nullVars.length) svg += `<text x="${W - 10}" y="${H - 8}" text-anchor="end" font-size="11" fill="var(--stone)">${esc(nullVars.map((v) => v + " = None").join(" · "))}</text>`;
  if (extra) svg += extra;
  svg += "</svg>";
  return `<div class="svgbox">${svg}</div>`;
}

// A tiny heap of nodes that records snapshots for linkedSVG.
class Heap {
  constructor(entry, circular = false) { this.nodes = {}; this.vars = {}; this.nextId = 0; this.entry = entry; this.circular = circular; }
  make(el, next = null) { const id = this.nextId++; this.nodes[id] = { el, next }; return id; }
  state(hl = {}) {
    const nodes = {};
    Object.entries(this.nodes).forEach(([k, v]) => { nodes[k] = { ...v }; });
    return { nodes, vars: { ...this.vars }, entry: this.entry, circular: this.circular, hl };
  }
  list(start) { const xs = []; const seen = new Set(); let c = start; while (c !== null && c !== undefined && !seen.has(c)) { seen.add(c); xs.push(this.nodes[c].el); c = this.nodes[c].next; } return xs; }
}

// ---------- Chapter 4: the singly linked list ----------

function traceLinkedList(ops, code) {
  const r = new Rec();
  const h = new Heap("head");
  h.vars = { head: null, tail: null };
  let size = 0;
  const S = (hl) => ({ ...h.state(hl), size });
  const L = {
    init: lineOf(code, "self.head = None"),
    fNew: lineOf(code, "newest = Node(e)", "def add_first"),
    fLink: lineOf(code, "newest.next = self.head"),
    fHead: lineOf(code, "self.head = newest", "newest.next = self.head"),
    fTail: lineOf(code, "self.tail = newest", "def add_first"),
    fSize: lineOf(code, "self.size += 1", "def add_first"),
    lNew: lineOf(code, "newest = Node(e)", "def add_last"),
    lHead: lineOf(code, "self.head = newest", "def add_last"),
    lLink: lineOf(code, "self.tail.next = newest"),
    lTail: lineOf(code, "self.tail = newest", "self.tail.next = newest"),
    rRaise: lineOf(code, "raise IndexError"),
    rAns: lineOf(code, "answer = self.head.element"),
    rHead: lineOf(code, "self.head = self.head.next"),
    rTail: lineOf(code, "self.tail = None", "self.head = self.head.next"),
    rRet: lineOf(code, "return answer"),
  };
  r.snap(L.init, "An empty linked list: <code>head</code> and <code>tail</code> are <code>None</code>, size 0.", "", S());
  for (const o of ops) {
    r.mark();
    const e = o.value;
    if (o.op === "first") {
      const id = h.make(e); h.vars.newest = id;
      r.snap(L.fNew, `<code>add_first(${pyStr(e)})</code>: make a new node. Nothing in the list points to it yet.`, "", S({ node: id, vars: ["newest"] }));
      h.nodes[id].next = h.vars.head;
      r.snap(L.fLink, h.vars.head === null ? "Its <code>next</code> takes the old head, which is <code>None</code>." : `Its <code>next</code> now points at the old head, <code>${pyStr(h.nodes[h.vars.head].el)}</code>. The old list is safe.`, "", S({ link: id }));
      h.vars.head = id;
      r.snap(L.fHead, "Then <code>head</code> moves to the new node. It is now part of the list.", "good", S({ vars: ["head"] }));
      if (h.vars.tail === null) { h.vars.tail = id; r.snap(L.fTail, "The list was empty, so the new node is also the <code>tail</code>.", "", S({ vars: ["tail"] })); }
      size++; delete h.vars.newest;
      r.snap(L.fSize, `Size ${size}. The method ends and its local name <code>newest</code> disappears.`, "", S());
    } else if (o.op === "last") {
      const id = h.make(e); h.vars.newest = id;
      r.snap(L.lNew, `<code>add_last(${pyStr(e)})</code>: make a new node; its <code>next</code> is <code>None</code>.`, "", S({ node: id, vars: ["newest"] }));
      if (h.vars.head === null) {
        h.vars.head = id;
        r.snap(L.lHead, "The list is empty (there is no tail to link from), so the new node becomes the <code>head</code>.", "", S({ vars: ["head"] }));
      } else {
        h.nodes[h.vars.tail].next = id;
        r.snap(L.lLink, `The old tail, <code>${pyStr(h.nodes[h.vars.tail].el)}</code>, points at the new node.`, "", S({ link: h.vars.tail }));
      }
      h.vars.tail = id;
      r.snap(L.lTail, "<code>tail</code> moves to the new node.", "good", S({ vars: ["tail"] }));
      size++; delete h.vars.newest;
      r.snap(L.lTail + 1, `Size ${size}.`, "", S());
    } else if (o.op === "remove") {
      if (h.vars.head === null) { r.snap(L.rRaise, "<code>remove_first()</code> on an empty list: <code>IndexError: remove from empty list</code>.", "bad", S()); return r; }
      const old = h.vars.head; const v = h.nodes[old].el;
      r.snap(L.rAns, `<code>remove_first()</code>: remember the head's element, <code>${pyStr(v)}</code>.`, "", S({ node: old }));
      h.vars.head = h.nodes[old].next;
      r.snap(L.rHead, `<code>head</code> moves to the second node. The old first node still points into the list, but nothing points to it.`, "", S({ vars: ["head"] }));
      size--;
      if (h.vars.head === null) { h.vars.tail = null; r.snap(L.rTail, "The list is now empty, so <code>tail</code> becomes <code>None</code> too.", "", S({ vars: ["tail"] })); }
      delete h.nodes[old];
      r.out.push(`remove_first() -> ${pyStr(v)}`);
      r.snap(L.rRet, `Returns <code>${pyStr(v)}</code>. Python reclaims the unreachable node. Size ${size}.`, "good", S());
    }
  }
  r.snap(0, `<code>elements()</code> → <code>${esc(pyList(h.list(h.vars.head)))}</code>, size ${size}.`, "good", S());
  return r;
}

function traceAddFirstWrong(code) {
  const r = new Rec();
  const h = new Heap("head");
  const msp = h.make("MSP");
  h.vars = { head: msp, tail: msp };
  r.snap(0, "<code>broken</code> holds one node, <code>'MSP'</code>. Now run the buggy <code>add_first_wrong(broken, 'LAX')</code>.", "", h.state());
  const id = h.make("LAX"); h.vars.newest = id;
  r.snap(lineOf(code, "newest = Node(e)"), "Make the new node.", "", h.state({ node: id, vars: ["newest"] }));
  h.vars.head = id;
  r.snap(lineOf(code, "lst.head = newest"), "<code>head</code> moves first. Now nothing points to <code>'MSP'</code> except <code>tail</code>: the old list is cut off.", "bad", h.state({ vars: ["head"] }));
  h.nodes[id].next = h.vars.head;
  r.snap(lineOf(code, "newest.next = lst.head"), "<code>newest.next = lst.head</code> — but <code>head</code> is the new node itself. It points at <b>itself</b>: <code>broken.head.next is broken.head</code> is <code>True</code>, and a traversal would loop forever.", "bad", h.state({ link: id }));
  return r;
}

function linkedView(s) {
  return linkedSVG(s) + (s.size !== undefined ? `<p class="l10-cap">size = ${s.size}</p>` : "");
}

const LL_SCRIPTS = {
  slides: [["last", "MSP"], ["last", "ATL"], ["last", "BOS"], ["first", "LAX"], ["remove"]],
  predict: [["first", 1], ["last", 2], ["first", 3], ["remove"], ["last", 4]],
  empty: [["last", "A"], ["remove"], ["first", "B"], ["remove"], ["remove"]],
};

function demoLinkedList(el, { mini = false } = {}) {
  let script = mini ? [["last", "MSP"], ["last", "ATL"], ["first", "LAX"], ["remove"]] : LL_SCRIPTS.slides.slice();
  let wrong = false;
  let counter = 0;
  makePlayer(el, {
    mini, miniDelay: 950, showConsole: true, consoleLabel: "values returned",
    code: () => (wrong ? CODE.addFirstWrong : CODE.linkedList),
    build: () => (wrong ? traceAddFirstWrong(CODE.addFirstWrong) : traceLinkedList(script.map(([op, value]) => ({ op, value })), CODE.linkedList)).snaps,
    view: linkedView,
    extraControls: `<select class="ll-pick"><option value="slides">the slides' cities</option><option value="predict">the Predict box</option><option value="empty">the empty-list cases</option><option value="wrong">bug: add_first_wrong</option></select>
      <span class="ll-own"><input type="text" class="ll-el" value="SFO" style="width:64px" aria-label="element">
      <button class="cbtn ll-f">add_first</button><button class="cbtn ll-l">add_last</button><button class="cbtn ll-r">remove_first</button></span>`,
    onMount(root, api) {
      if (mini) return;
      const own = root.querySelector(".ll-own");
      root.querySelector(".ll-pick").onchange = (e) => {
        wrong = e.target.value === "wrong";
        own.style.display = wrong ? "none" : "";
        if (!wrong) script = LL_SCRIPTS[e.target.value].slice();
        api.rebuild();
      };
      const add = (op) => {
        const raw = root.querySelector(".ll-el").value.trim().slice(0, 6) || `X${++counter}`;
        const v = /^-?\d+$/.test(raw) ? +raw : raw;
        script.push(op === "remove" ? ["remove"] : [op, v]);
        if (script.length > 14) script.shift();
        // Jump to the first step of the new operation.
        const steps = traceLinkedList(script.map(([o, value]) => ({ op: o, value })), CODE.linkedList);
        api.rebuild(steps.marks[steps.marks.length - 1]);
      };
      root.querySelector(".ll-f").onclick = () => add("first");
      root.querySelector(".ll-l").onclick = () => add("last");
      root.querySelector(".ll-r").onclick = () => add("remove");
    },
  });
}

function tracePrintList(code) {
  const r = new Rec();
  const h = new Heap("head");
  const bos = h.make("BOS"), atl = h.make("ATL", bos), msp = h.make("MSP", atl);
  h.vars = { head: msp };
  let line = "";
  r.snap(lineOf(code, "node = head"), "<code>print_list(head)</code>: start with <code>node</code> at the head.", "", (h.vars.node = msp, h.state({ vars: ["node"] })));
  let c = msp;
  while (c !== null) {
    line += `${h.nodes[c].el} -> `;
    r.out = [line];
    r.snap(lineOf(code, "print(node.element"), `Print <code>${h.nodes[c].el} -> </code> (on the same line).`, "", h.state({ node: c }));
    c = h.nodes[c].next; h.vars.node = c;
    r.snap(lineOf(code, "node = node.next"), c === null ? "Hop: <code>node</code> becomes <code>None</code>. The loop stops." : `Hop: <code>node = node.next</code>, now <code>${h.nodes[c].el}</code>.`, "", h.state({ vars: ["node"] }));
  }
  r.out = [line + "None"];
  r.snap(lineOf(code, 'print("None")'), "Print <code>None</code> to end the line. Three nodes, three hops: reaching position k takes k hops.", "good", h.state());
  return r;
}

function demoTraverse(el) {
  makePlayer(el, { showConsole: true, code: CODE.printList, build: () => tracePrintList(CODE.printList).snaps, view: linkedView });
}

// ---------- Chapter 5: linked stack, linked queue, circular queue ----------

function traceLinkedAdt(kind, ops, code) {
  const r = new Rec();
  const h = new Heap("_head");
  h.vars = kind === "stack" ? { _head: null } : { _head: null, _tail: null };
  let size = 0;
  const S = (hl) => ({ ...h.state(hl), size });
  r.snap(lineOf(code, "self._head = None"), `An empty <code>${kind === "stack" ? "LinkedStack" : "LinkedQueue"}</code>.`, "", S());
  for (const o of ops) {
    if (kind === "stack") {
      if (o.op === "add") {
        const id = h.make(o.value, h.vars._head); h.vars._head = id; size++;
        r.snap(lineOf(code, "self._head = Node(e, self._head)"), `<code>push(${o.value})</code>: <code>Node(e, self._head)</code> makes a node pointing at the old top, then <code>_head</code> moves to it.`, "", S({ node: id, vars: ["_head"], link: id }));
      } else {
        if (!size) { r.snap(lineOf(code, "raise IndexError(\"pop"), "<code>pop()</code> on an empty stack: <code>IndexError</code>.", "bad", S()); return r; }
        const old = h.vars._head; const v = h.nodes[old].el;
        h.vars._head = h.nodes[old].next; size--;
        r.snap(lineOf(code, "self._head = self._head.next"), `<code>pop()</code>: <code>_head</code> moves to the next node; ${v} is cut off.`, "", S({ vars: ["_head"] }));
        delete h.nodes[old]; r.out.push(`pop() -> ${v}`);
        r.snap(lineOf(code, "return answer"), `Returns ${v}.`, "good", S());
      }
    } else if (o.op === "add") {
      const id = h.make(o.value);
      if (!size) {
        h.vars._head = id;
        r.snap(lineOf(code, "self._head = newest"), `<code>enqueue(${o.value})</code> into an empty queue: the new node is the head …`, "", S({ node: id, vars: ["_head"] }));
      } else {
        h.nodes[h.vars._tail].next = id;
        r.snap(lineOf(code, "self._tail.next = newest"), `<code>enqueue(${o.value})</code>: the old tail points at the new node …`, "", S({ node: id, link: h.vars._tail }));
      }
      h.vars._tail = id; size++;
      r.snap(lineOf(code, "self._tail = newest"), "… and <code>_tail</code> moves to it. New elements join at the back.", "good", S({ vars: ["_tail"] }));
    } else {
      if (!size) { r.snap(lineOf(code, "raise IndexError(\"dequeue"), "<code>dequeue()</code> on an empty queue: <code>IndexError</code>.", "bad", S()); return r; }
      const old = h.vars._head; const v = h.nodes[old].el;
      h.vars._head = h.nodes[old].next; size--;
      r.snap(lineOf(code, "self._head = self._head.next"), `<code>dequeue()</code>: elements leave at the front. <code>_head</code> moves on; ${v} is cut off.`, "", S({ vars: ["_head"] }));
      if (!size) { h.vars._tail = null; r.snap(lineOf(code, "self._tail = None"), "The queue became empty, so <code>_tail</code> is reset to <code>None</code>.", "", S({ vars: ["_tail"] })); }
      delete h.nodes[old]; r.out.push(`dequeue() -> ${v}`);
      r.snap(lineOf(code, "return answer", "def dequeue"), `Returns ${v}.`, "good", S());
    }
  }
  r.snap(0, "Done.", "good", S());
  return r;
}

function demoLinkedAdt(el) {
  let kind = "queue", text = "100 200 300 deq 400 deq";
  const scripts = { stack: "100 200 300 pop 400 pop pop", queue: "100 200 300 deq 400 deq" };
  makePlayer(el, {
    showConsole: true, consoleLabel: "values returned",
    code: () => (kind === "stack" ? CODE.linkedStack : CODE.linkedQueue),
    build: () => traceLinkedAdt(kind, parseOps(text, ["pop", "deq"]).map((o) => (o.op === "add" ? o : { op: "rm" })), kind === "stack" ? CODE.linkedStack : CODE.linkedQueue).snaps,
    view: linkedView,
    extraControls: `<select class="la-k"><option value="queue">LinkedQueue</option><option value="stack">LinkedStack</option></select>
      <label>ops <input type="text" class="la-ops" value="${text}" style="width:190px"></label>`,
    onMount(root, api) {
      const inp = root.querySelector(".la-ops");
      root.querySelector(".la-k").onchange = (e) => { kind = e.target.value; text = scripts[kind]; inp.value = text; api.rebuild(); };
      inp.onchange = () => { text = inp.value; api.rebuild(); };
    },
  });
}

function traceRoundRobin(code, turns = 5) {
  const r = new Rec();
  const h = new Heap("_tail", true);
  h.vars = { _tail: null };
  let size = 0;
  const S = (hl) => ({ ...h.state(hl), size });
  const L = {
    enqNew: lineOf(code, "newest = Node(e)"),
    self: lineOf(code, "newest.next = newest"),
    toHead: lineOf(code, "newest.next = self._tail.next"),
    tailTo: lineOf(code, "self._tail.next = newest"),
    tailMove: lineOf(code, "self._tail = newest"),
    oldHead: lineOf(code, "old_head = self._tail.next"),
    skip: lineOf(code, "self._tail.next = old_head.next"),
    ret: lineOf(code, "return old_head.element"),
  };
  function enqueue(e, quiet) {
    const id = h.make(e); h.vars.newest = id;
    if (!quiet) r.snap(L.enqNew, `<code>enqueue(${pyStr(e)})</code>: a new node.`, "", S({ node: id, vars: ["newest"] }));
    if (!size) {
      h.nodes[id].next = id;
      if (!quiet) r.snap(L.self, "The queue was empty: the node points at itself, a circle of one.", "", S({ link: id }));
    } else {
      h.nodes[id].next = h.nodes[h.vars._tail].next;
      if (!quiet) r.snap(L.toHead, "The new node points at the head (the node after the tail) …", "", S({ link: id }));
      h.nodes[h.vars._tail].next = id;
      if (!quiet) r.snap(L.tailTo, "… and the old tail points at the new node. The circle now includes it.", "", S({ link: h.vars._tail }));
    }
    h.vars._tail = id; size++; delete h.vars.newest;
    if (!quiet) r.snap(L.tailMove, "<code>_tail</code> moves to the new node: it joined at the back.", "good", S({ vars: ["_tail"] }));
  }
  ["browser", "editor", "music"].forEach((e) => enqueue(e, true));
  r.snap(0, "Three programs in a <code>CircularQueue</code>. The tail's <code>next</code> is the head, <code>browser</code>. Now <code>round_robin(programs, 5)</code>.", "", S());
  for (let t = 0; t < turns; t++) {
    const old = h.nodes[h.vars._tail].next; h.vars.old_head = old;
    const v = h.nodes[old].el;
    r.snap(L.oldHead, `Turn ${t + 1}: <code>dequeue()</code>. The head is the node after the tail: <code>${pyStr(v)}</code>.`, "", S({ node: old, vars: ["old_head"] }));
    h.nodes[h.vars._tail].next = h.nodes[old].next; size--;
    r.snap(L.skip, "The tail skips over the old head; it is out of the circle.", "", S({ link: h.vars._tail }));
    delete h.nodes[old]; delete h.vars.old_head;
    r.out.push(`serve ${v}`);
    r.snap(L.ret, `Returns <code>${pyStr(v)}</code>, and <code>round_robin</code> prints <code>serve ${v}</code>.`, "good", S());
    enqueue(v, false);
  }
  r.snap(0, "Every program gets a turn, in order, over and over. (Goodrich's <code>rotate</code> does a turn by just moving <code>_tail</code> one step.)", "good", S());
  return r;
}

function demoRoundRobin(el, { mini = false } = {}) {
  const code = excerpt(CODE.circularQueue, "def dequeue", null);
  makePlayer(el, {
    mini, miniDelay: 700, showConsole: true, delay: 650,
    code,
    build: () => traceRoundRobin(code).snaps,
    view: linkedView,
  });
}

// ---------- Chapter 6: the doubly linked list ----------

function dllSVG(s) {
  // s: {nodes: {id: {el, prev, next, sentinel}}, header, trailer, labels: {name: id}, hl: {links: [[id, "next"|"prev"]], node, vars}}
  const nodes = s.nodes;
  const chain = [];
  const seen = new Set();
  let c = s.header;
  while (c !== null && c !== undefined && !seen.has(c)) { seen.add(c); chain.push(c); c = nodes[c].next; }
  const boxW = 74, gap = 40, rowY = 112;
  const pos = {};
  chain.forEach((id, k) => { pos[id] = { x: 18 + k * (boxW + gap), y: rowY }; });
  // Off-chain nodes sit raised, between their prev and that node's successor in the chain.
  Object.keys(nodes).map(Number).filter((id) => !seen.has(id)).forEach((id) => {
    const p = nodes[id].prev;
    const base = p !== null && pos[p] ? pos[p].x + (boxW + gap) / 2 : 18;
    pos[id] = { x: base, y: rowY - 72 };
  });
  const W = Math.max(Math.max(...Object.values(pos).map((p) => p.x)) + boxW + 22, 640);
  const H = 172;
  const hl = s.hl || {};
  const isHL = (id, kind) => (hl.links || []).some(([a, k]) => a === id && k === kind);
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="doubly linked list"><defs>
    <marker id="d10a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink-2)"/></marker>
    <marker id="d10h" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--amber)"/></marker></defs>`;
  const arrow = (id, kind) => {
    const n = nodes[id];
    const t = n[kind];
    if (t === null || t === undefined || !pos[t]) return "";
    const a = pos[id], b = pos[t];
    const h1 = isHL(id, kind);
    const col = h1 ? "var(--amber)" : kind === "next" ? "var(--ink-2)" : "var(--sea)";
    const dy = kind === "next" ? -7 : 7;
    const x1 = kind === "next" ? a.x + boxW - 6 : a.x + 6, y1 = a.y + dy;
    const x2 = b.x < a.x ? b.x + boxW - 2 : b.x + 2;
    const y2 = b.y + dy;
    const dist = Math.abs(b.x - a.x);
    const bend = dist > boxW + gap + 5 && a.y === b.y ? (kind === "next" ? -46 : 46) : 0;
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + bend;
    return `<path d="M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}" fill="none" stroke="${col}" stroke-width="${h1 ? 2.4 : 1.4}" marker-end="url(#${h1 ? "d10h" : "d10a"})"/>`;
  };
  Object.keys(pos).map(Number).forEach((id) => { svg += arrow(id, "next") + arrow(id, "prev"); });
  Object.keys(pos).map(Number).forEach((id) => {
    const n = nodes[id], p = pos[id];
    const sent = n.sentinel;
    const off = !seen.has(id);
    const isH = hl.node === id;
    const fill = isH ? "var(--mark)" : sent ? "var(--paper)" : "var(--card)";
    const stroke = isH ? "var(--amber)" : sent ? "var(--stone)" : "var(--teal)";
    svg += `<g opacity="${off && !isH ? 0.75 : 1}"><rect x="${p.x}" y="${p.y - 18}" width="${boxW}" height="36" rx="5" fill="${fill}" stroke="${stroke}" stroke-width="1.5" ${off ? 'stroke-dasharray="4 3"' : ""}/>
      <text x="${p.x + boxW / 2}" y="${p.y + 5}" text-anchor="middle" font-size="${sent ? 11 : 14}" font-weight="600" fill="${sent ? "var(--stone)" : "var(--ink)"}">${esc(sent ? n.sentinel : n.el)}</text></g>`;
  });
  const byNode = {};
  Object.entries(s.labels || {}).forEach(([name, id]) => { if (id !== null && pos[id]) (byNode[id] = byNode[id] || []).push(name); });
  Object.entries(byNode).forEach(([id, names]) => {
    const p = pos[id];
    const isH = names.some((v) => (hl.vars || []).includes(v));
    const raised = p.y < rowY;
    const y = raised ? p.y - 26 : p.y + 40;
    svg += `<text x="${p.x + boxW / 2}" y="${y}" text-anchor="middle" font-size="11" font-weight="600" fill="${isH ? "var(--amber)" : "var(--teal)"}">${esc(names.join(", "))}</text>`;
  });
  svg += `<text x="${W - 8}" y="${H - 6}" text-anchor="end" font-size="11" fill="var(--stone)">next ⟶ (top) · prev ⟵ (bottom)</text></svg>`;
  return `<div class="svgbox">${svg}</div>`;
}

function traceDll(script, code) {
  const r = new Rec();
  const nodes = {};
  let nextId = 0;
  const mk = (el, prev, next, sentinel) => { const id = nextId++; nodes[id] = { el, prev, next, sentinel }; return id; };
  const header = mk(null, null, null, "header"), trailer = mk(null, null, null, "trailer");
  nodes[header].next = trailer; nodes[trailer].prev = header;
  let size = 0;
  let labels = {};
  const S = (hl = {}) => {
    const copy = {};
    Object.entries(nodes).forEach(([k, v]) => { copy[k] = { ...v }; });
    return { nodes: copy, header, trailer, labels: { ...labels }, hl, size };
  };
  const elements = () => { const xs = []; let c = nodes[header].next; while (c !== trailer) { xs.push(nodes[c].el); c = nodes[c].next; } return xs; };
  const L = {
    init: lineOf(code, "self.header.next = self.trailer"),
    iNew: lineOf(code, "newest = DNode(e, predecessor, successor)"),
    iPred: lineOf(code, "predecessor.next = newest"),
    iSucc: lineOf(code, "successor.prev = newest"),
    iRet: lineOf(code, "return newest"),
    dVars: lineOf(code, "predecessor = node.prev"),
    dPred: lineOf(code, "predecessor.next = successor"),
    dSucc: lineOf(code, "successor.prev = predecessor"),
    dTidy: lineOf(code, "node.prev = node.next = node.element = None"),
  };
  r.snap(L.init, "An empty list is just the two sentinels pointing at each other.", "", S());
  let last = header;
  for (const step of script) {
    if (step[0] === "insert") {
      const e = step[1];
      const pred = step[2] === "end" ? nodes[trailer].prev : last, succ = nodes[pred].next;
      labels = { predecessor: pred, successor: succ };
      const id = mk(e, pred, succ, null); labels.newest = id;
      r.snap(L.iNew, `<code>insert_between(${e}, …)</code>: the new node is made with both of its links already set. Its neighbours don't know about it yet.`, "", S({ node: id, links: [[id, "next"], [id, "prev"]], vars: ["newest"] }));
      nodes[pred].next = id;
      r.snap(L.iPred, "Link 3: <code>predecessor.next = newest</code>. Walking forwards now reaches the new node.", "", S({ links: [[pred, "next"]] }));
      nodes[succ].prev = id;
      r.snap(L.iSucc, "Link 4: <code>successor.prev = newest</code>. Walking backwards reaches it too.", "", S({ links: [[succ, "prev"]] }));
      size++; last = id;
      r.snap(L.iRet, `Size ${size}. Four links changed; no special case for the ends, thanks to the sentinels.`, "good", S({ node: id }));
      labels = {};
    } else {
      const which = step[1];
      const node = which === "last" ? nodes[trailer].prev : nodes[nodes[header].next].next;
      if (node === trailer || node === header || node === undefined) { r.snap(0, "There is no real node to delete.", "bad", S()); continue; }
      const pred = nodes[node].prev, succ = nodes[node].next;
      labels = { node, predecessor: pred, successor: succ };
      r.snap(L.dVars, `<code>delete_node(${which === "last" ? "d.trailer.prev" : "d.header.next.next"})</code>: the node holding ${nodes[node].el}, and its two neighbours.`, "", S({ node, vars: ["predecessor", "successor"] }));
      nodes[pred].next = succ;
      r.snap(L.dPred, "<code>predecessor.next = successor</code>: walking forwards now skips the node.", "", S({ links: [[pred, "next"]] }));
      nodes[succ].prev = pred;
      r.snap(L.dSucc, "<code>successor.prev = predecessor</code>: walking backwards skips it too.", "", S({ links: [[succ, "prev"]] }));
      const v = nodes[node].el; size--;
      delete nodes[node]; labels = {};
      r.out.push(`delete_node(...) -> ${v}`);
      r.snap(L.dTidy, `The removed node's links are cleared and ${v} is returned. Size ${size}.`, "good", S());
    }
  }
  r.out.push(`elements() -> ${pyList(elements())}`);
  r.snap(0, `<code>elements()</code> → <code>${pyList(elements())}</code>.`, "good", S());
  return r;
}

const DLL_SCRIPTS = {
  slides: [["insert", 10, "after"], ["insert", 20, "after"], ["insert", 30, "after"], ["delete", "second"]],
  last: [["insert", 10, "end"], ["insert", 20, "end"], ["insert", 30, "end"], ["delete", "last"]],
};

function demoDll(el, { mini = false } = {}) {
  let which = "slides";
  makePlayer(el, {
    mini, miniDelay: 1000, showConsole: true, consoleLabel: "values returned",
    code: excerpt(CODE.dll, "def insert_between", "def elements"),
    build: () => traceDll(DLL_SCRIPTS[which], CODE.dll).snaps,
    view: (s) => dllSVG(s) + `<p class="l10-cap">size = ${s.size}</p>`,
    extraControls: `<select class="dl-k"><option value="slides">the slides' main(): delete header.next.next</option><option value="last">delete the last node: trailer.prev</option></select>`,
    onMount(root, api) {
      if (mini) return;
      root.querySelector(".dl-k").onchange = (e) => { which = e.target.value; api.rebuild(); };
    },
  });
}

// ---------- Chapter 7: bubble sort ----------

function traceBubble(data0, linked, code) {
  const r = new Rec();
  const a = data0.slice();
  const L = linked ? {
    start: lineOf(code, "n = lst.size"), pass: lineOf(code, "node = lst.head"), cmp: lineOf(code, "if node.element > node.next.element"),
    swap: lineOf(code, "node.element, node.next.element ="), hop: lineOf(code, "node = node.next"), dec: lineOf(code, "n -= 1"),
  } : {
    start: lineOf(code, "n = len(data)"), pass: lineOf(code, "for i in range(n - 1)"), cmp: lineOf(code, "if data[i] > data[i + 1]"),
    swap: lineOf(code, "data[i], data[i + 1] ="), hop: lineOf(code, "for i in range(n - 1)"), dec: lineOf(code, "n -= 1"),
  };
  let n = a.length, swaps = 0, comps = 0;
  const S = (i, extra = {}) => ({ a: a.slice(), i, n, swaps, comps, linked, ...extra });
  r.snap(L.start, `Sort <code>${pyList(a)}</code>. ${linked ? "The elements live in linked nodes; <code>node</code> walks along them." : "Compare neighbours, swap if the left one is larger."}`, "", S(-1));
  while (n > 1) {
    r.snap(L.pass, `A new pass over the first ${n} elements${n < a.length ? ` (the last ${a.length - n} are already in place)` : ""}.`, "", S(0));
    for (let i = 0; i < n - 1; i++) {
      comps++;
      const big = a[i] > a[i + 1];
      r.snap(L.cmp, `${linked ? "<code>node.element</code>" : `<code>data[${i}]</code>`} = ${a[i]} ${big ? ">" : "≤"} ${a[i + 1]}${big ? ": swap them." : ": leave them."}`, "", S(i, { cmp: true }));
      if (big) {
        [a[i], a[i + 1]] = [a[i + 1], a[i]]; swaps++;
        r.snap(L.swap, `Swapped${linked ? " the elements of the two nodes (the nodes stay where they are)" : ""}: ${a[i]}, ${a[i + 1]}.`, "", S(i, { swapped: true }));
      }
    }
    n--;
    r.snap(L.dec, `End of the pass: ${a[n]} has bubbled up to position ${n}. <code>n</code> = ${n}.`, "good", S(-1));
  }
  r.snap(0, `Sorted: <code>${pyList(a)}</code> after ${comps} comparisons and ${swaps} swaps.`, "good", S(-1, { done: true }));
  return r;
}

function bubbleView(s) {
  const cells = s.a.map((v, k) => {
    let cls = "cell";
    if (k >= s.n || s.done) cls += " sorted";
    if (s.i >= 0 && (k === s.i || k === s.i + 1) && (s.cmp || s.swapped)) cls = "cell " + (s.swapped ? "found" : "mid");
    const ptr = s.linked ? (k === s.i ? "node" : "") : (k === s.i ? "i" : k === s.i + 1 ? "i + 1" : "");
    const col = `<div class="cellcol"><div class="ptr">${ptr}</div><div class="${cls}">${v}</div><div class="cellidx">${s.linked ? "" : k}</div></div>`;
    return s.linked && k < s.a.length - 1 ? col + `<span class="l10-arrow">→</span>` : col;
  }).join("");
  return `<div class="cells" style="gap:${s.linked ? 2 : 4}px">${cells}${s.linked ? '<span class="l10-arrow">None</span>' : ""}</div>
    <div class="stats"><div class="stat"><small>n (unsorted part)</small><b>${s.n}</b></div><div class="stat"><small>comparisons</small><b>${s.comps}</b></div><div class="stat"><small>swaps</small><b>${s.swaps}</b></div></div>`;
}

function demoBubble(el, { mini = false } = {}) {
  let linked = mini, data = mini ? [9, 8, 6, 10, 45, 1] : [5, 1, 4, 2];
  makePlayer(el, {
    mini, miniDelay: 450, delay: 500,
    code: () => (linked ? CODE.linkedBubble : CODE.bubbleSort),
    build: () => traceBubble(data, linked, linked ? CODE.linkedBubble : CODE.bubbleSort).snaps,
    view: bubbleView,
    extraControls: `<select class="bb-k"><option value="list">bubble_sort (list)</option><option value="linked">linked_bubble_sort (nodes)</option></select>
      <label>data <input type="text" class="bb-d" value="5, 1, 4, 2" style="width:160px"></label>`,
    onMount(root, api) {
      if (mini) return;
      root.querySelector(".bb-k").onchange = (e) => {
        linked = e.target.value === "linked";
        data = linked ? [9, 8, 6, 10, 45, 67, 21, 1] : [5, 1, 4, 2];
        root.querySelector(".bb-d").value = data.join(", ");
        api.rebuild();
      };
      root.querySelector(".bb-d").onchange = (e) => { data = parseNums(e.target.value, [5, 1, 4, 2]).slice(0, 9); e.target.value = data.join(", "); api.rebuild(); };
    },
  });
}

// ---------- Chapter 8: trees ----------

// The slides' expression tree. Leaves are numbers; operators use Python's symbols.
function exprTree() {
  let id = 0;
  const N = (el, l, r) => ({ id: id++, el, left: l || null, right: r || null });
  return N("-",
    N("/", N("*", N("+", N(3), N(1)), N(3)), N("+", N("-", N(9), N(5)), N(2))),
    N("+", N("*", N(3), N("-", N(7), N(4))), N(6)));
}

// A float that prints like Python (2.0, -13.0).
const num = (v, isFloat) => ({ v, f: isFloat });
const fmtNum = (x) => (x.f && Number.isInteger(x.v) ? x.v.toFixed(1) : String(x.v));

function buildTraversal(kind, code) {
  const root = exprTree();
  const events = [];
  const toPlayer = (n) => ({ id: n.id, label: String(n.el), kids: [n.left, n.right].filter(Boolean).map(toPlayer) });
  const L = {
    pre: lineOf(code, "return [node.element] + preorder"),
    ino: lineOf(code, "return inorder(node.left) + [node.element]"),
    post: lineOf(code, "return postorder(node.left) + postorder(node.right)"),
  };
  function walk(n) {
    const enterLine = kind === "pre" ? L.pre : kind === "in" ? L.ino : L.post;
    events.push({ type: "enter", id: n.id, line: enterLine });
    if (kind === "pre") events.push({ type: "out", text: String(n.el), line: enterLine });
    if (n.left) walk(n.left);
    if (kind === "in") events.push({ type: "out", text: String(n.el), line: enterLine });
    if (n.right) walk(n.right);
    if (kind === "post") events.push({ type: "out", text: String(n.el), line: enterLine });
    events.push({ type: "exit", id: n.id });
  }
  walk(root);
  return { root: toPlayer(root), events };
}

function buildEvaluate(code) {
  const root = exprTree();
  const events = [];
  const toPlayer = (n) => ({ id: n.id, label: String(n.el), kids: [n.left, n.right].filter(Boolean).map(toPlayer) });
  const opLine = { "+": lineOf(code, "return left + right"), "-": lineOf(code, "return left - right"), "*": lineOf(code, "return left * right"), "/": lineOf(code, "return left / right") };
  function ev(n) {
    events.push({ type: "enter", id: n.id, line: lineOf(code, "if is_leaf(node)") });
    if (!n.left && !n.right) {
      const x = num(n.el, false);
      events.push({ type: "exit", id: n.id, value: fmtNum(x), line: lineOf(code, "return node.element") });
      return x;
    }
    const a = ev(n.left), b = ev(n.right);
    let v;
    if (n.el === "+") v = num(a.v + b.v, a.f || b.f);
    else if (n.el === "-") v = num(a.v - b.v, a.f || b.f);
    else if (n.el === "*") v = num(a.v * b.v, a.f || b.f);
    else v = num(a.v / b.v, true);
    events.push({ type: "out", text: `${fmtNum(a)} ${n.el} ${fmtNum(b)} = ${fmtNum(v)}`, line: opLine[n.el] });
    events.push({ type: "exit", id: n.id, value: fmtNum(v) });
    return v;
  }
  ev(root);
  return { root: toPlayer(root), events };
}

function demoTraversal(el, { mini = false } = {}) {
  let kind = "pre";
  const codes = { pre: () => excerpt(CODE.traversals, "def preorder", "def inorder"), in: () => excerpt(CODE.traversals, "def inorder", "def postorder"),
    post: () => excerpt(CODE.traversals, "def postorder", null), eval: () => CODE.evaluate };
  makeTreePlayer(el, {
    mini, width: 720, rowH: mini ? 48 : 58, nodeW: 44, fontSize: 15,
    code: () => codes[kind](),
    outLabel: "visit order / operations, one per line",
    build: () => (kind === "eval" ? buildEvaluate(CODE.evaluate) : buildTraversal(kind, CODE.traversals)),
    stats: (s) => kind === "eval"
      ? [["calls so far", s.calls], ["stack depth", s.stack.length], ["operators applied", s.out.length]]
      : [["visited so far", s.out.join(" ") || "—"], ["calls so far", s.calls], ["stack depth", s.stack.length]],
    extraControls: `<select class="tv-k"><option value="pre">preorder</option><option value="in">inorder</option><option value="post">postorder</option><option value="eval">evaluate (postorder)</option></select>`,
    onMount(root, rebuild) {
      if (mini) return;
      root.querySelector(".tv-k").onchange = (e) => { kind = e.target.value; rebuild(); };
    },
  });
}

function companyTree() {
  let id = 0;
  const T = (el, kids = []) => ({ id: id++, el, kids });
  return T("Electronics R'Us", [
    T("R&D"),
    T("Sales", [T("Domestic"), T("International", [T("Canada"), T("S. America"), T("Overseas")])]),
    T("Purchasing"),
    T("Manufacturing", [T("TV"), T("CD"), T("Tuner")]),
  ]);
}

function buildOutline(code) {
  const root = companyTree();
  const events = [];
  const toPlayer = (n) => ({ id: n.id, label: n.el, kids: n.kids.map(toPlayer) });
  (function outline(t, depth) {
    events.push({ type: "enter", id: t.id, line: lineOf(code, "print(\"    \" * depth") });
    events.push({ type: "out", text: "    ".repeat(depth) + t.el, line: lineOf(code, "print(\"    \" * depth") });
    t.kids.forEach((c) => outline(c, depth + 1));
    events.push({ type: "exit", id: t.id, line: lineOf(code, "outline(child, depth + 1)") });
  })(root, 0);
  return { root: toPlayer(root), events };
}

function demoOutline(el) {
  const code = excerpt(CODE.tree, "def outline", null);
  makeTreePlayer(el, {
    width: 980, rowH: 58, nodeW: 104, fontSize: 11,
    code,
    outLabel: "printed outline",
    build: () => buildOutline(code),
    stats: (s) => [["lines printed", s.out.length], ["stack depth", s.stack.length]],
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
  stack: (el) => demoStack(el),
  stackMini: (el) => demoStack(el, { mini: true }),
  matcher: (el) => demoMatcher(el),
  matcherMini: (el) => demoMatcher(el, { mini: true }),
  queue: (el) => demoQueue(el),
  queueMini: (el) => demoQueue(el, { mini: true }),
  webService: (el) => demoWebService(el),
  linkedList: (el) => demoLinkedList(el),
  linkedMini: (el) => demoLinkedList(el, { mini: true }),
  traverse: (el) => demoTraverse(el),
  linkedAdt: (el) => demoLinkedAdt(el),
  roundRobin: (el) => demoRoundRobin(el),
  roundMini: (el) => demoRoundRobin(el, { mini: true }),
  dll: (el) => demoDll(el),
  dllMini: (el) => demoDll(el, { mini: true }),
  bubble: (el) => demoBubble(el),
  bubbleMini: (el) => demoBubble(el, { mini: true }),
  traversal: (el) => demoTraversal(el),
  traversalMini: (el) => demoTraversal(el, { mini: true }),
  outline: (el) => demoOutline(el),
  quiz: (el) => demoQuiz(el, QUIZ),
};
