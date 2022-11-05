(algorithms)=
# Algorithms


% TODO: Talk about ciphers since they're basically the case study of this book.
% Substitution ciphers: https://en.wikipedia.org/wiki/Substitution_cipher
% Transposition ciphers: https://en.wikipedia.org/wiki/Transposition_cipher

Algorithms rule our world.
It doesn't matter if you're a programmer, mathematician or not, you will eventually or have already come into contact with the word algorithm.

We use algorithms for suggesting similar products to customers, picking stocks, computing credit scores, controlling traffic lights, biometric authentication, providing search results, prioritizing job applications, pricing strategy, double entry bookkeeping, and the list just keeps going.
In anything that resembles a computer, we find algorithms.
It almost doesn't matter anymore what your business is, there is always room for improvement using algorithms.

Algorithms existed long before computers, as we know them, entered the scene.
Evidence of the usage of algorithms have been found dating as far back as 2500 BC {cite:p}`todo`.
The word algorithm stems from the Persian polymath Muḥammad ibn Mūsā al-Khwārizmī {cite:p}`todo`.

Formal definitions in computer science aside, we can think of an algorithm as a finite sequence of precise instructions.
As we shall discuss in the next chapter on [computation](computation), executing the steps of an algorithm is to compute.
Any sufficiently formalized procedure or recipe can be considered an algorithm.
Consider for example, the follow recipe for making pancake batter:

```{admonition} Pancake batter algorithm
1. Retrieve a bowl.
2. Add 1/2 dl of flour to the bowl.
3. Add 1/2 tsp of salt.
4. Mix the contents of the bowl.
5. Add 3 dl of milk into the bowl.
6. Mix the contents of the bowl.
7. Add 3 dl of milk into the bowl.
8. Mix the contents of the bowl.
9. Add 3 eggs to the bowl.
10. Mix the contents of the bowl.
```

Arguably the recipe above is not expressed in enough detail for most machines to be able to carry out the instructions.
But if the machine in question is a human, then this algorithm is certainly expressed in a sufficient level of detail.
Most of us have no problem following the recipe above.

```{exercise}
What is an algorithm?
```


## River crossing

But let's look at some more serious algorithms.
Most people have heard a river crossing puzzle in one form or another.
Let's take the very old puzzle involving a wolf, a sheep, and a cabbage.

% TODO: Add image of river crossing.
%``{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
%:name: fig:river-crossing
%
%Illustration of the river crossing puzzle involving a wolf, a sheep, and a cabbage.
%``

Here's how the story goes.
You find yourself on the bank on one side of a river, wanting to cross to the other.
You have a boat, a wolf, a sheep, and a cabbage.
You want to use the boat to transport all these things across the river to the other side.
The problem is that you can only carry one thing with you on the boat at any given time.
Worse, if you ever leave the sheep alone with the cabbage then the sheep will eat the cabbage.
And if you ever leave the wolf alone with the sheep, then the wolf will eat the sheep.
How can you pass to the other side?

```{admonition} Solution
:class: dropdown tip
1. Bring the sheep to the other side.
2. Go back with an empty boat.
3. Bring the cabbage to the other side.
4. Go back with the sheep in the boat.
5. Bring the wolf to the other side.
6. Go back with an empty boat.
7. Bring the sheep to the other side.
```

```{exercise}
The river crossing puzzle that involves a wolf, a sheep, and a cabbage has two solutions.
We've seen one solution already.
Find the other solution, and write it down as an algorithm.
```

It is important to realize that multiple algorithms can be the solution for a given problem.
How to determine which algorithm is the better algorithm is a different question.
If you choose to study the field of algorithms you will learn to determine not only the correctness of an algorithm but also its complexity.
Correctness is commonly asserted through testing or formal verification.
Complexity is commonly measured using something known as Big O notation for two dimensions: space and time.

```{important}
The same problem can often be solved with multiple different algorithms.
```

In this book we are not concerned with neither space nor time complexity and will therefore not discuss Big O notation.
In this book we are concerned with the *maintainability* of an algorithm.
Meaning, how should we write our algorithms so that we can stay in business.


(towers-of-hanoi)=
## Towers of Hanoi

Let's take one more example.
This is a puzzle known as (among other names) the Towers of Hanoi.
In this puzzle we have three rods or poles and some number of disks.
Each disk has a different diameter but they can all be slid onto the rods through a hole in the middle of each disk.
%See {numref}`fig:towers-of-hanoi` for an illustration.

%``{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
%:name: fig:towers-of-hanoi
%
%Illustration of The Towers of Hanoi.
%``

At the start of the puzzle all disks are stacked on the first rod in order of decreasing size, meaning that the largest disk is in the bottom, and the smallest disk in the top.
The goal is to move all disks to the last rod.
The rules are simple:

1. Only a single disk may be moved at a time.
2. Only the top disk of any stack may be moved.
3. A disk may only be placed on an empty rod or on top of a disk that is larger than it.

Another name for the puzzle is The Tower of Brahma.
This name is often accompanied by a story of a legend saying that there is a temple with a large room hosting three posts with 64 golden disks.
Priests are moving the disks according to the rules and when the puzzle is complete, the prophecy states that world will end.

The Towers of Hanoi puzzle can be solved in $2^n-1$ moves, where n is the number of disks.
Can you write an algorithm for solving the puzzle if we have three disks?

```{admonition} Solution
:class: info dropdown
Assuming that the we have three disks then we can solve the puzzle by performing the following moves:

1. Move disk from rod 1 to rod 3.
2. Move disk from rod 1 to rod 2.
3. Move disk from rod 3 to rod 2.
4. Move disk from rod 1 to rod 3.
5. Move disk from rod 2 to rod 1.
6. Move disk from rod 2 to rod 3.
7. Move disk from rod 1 to rod 3.
```

The solutions that we have provided to the two puzzles in this chapter are both very specific to the parameters that we've predefined.
This brings up an important question.
Is it possible to define a more general algorithm that is capable of handling multiple different input parameters?

```{important}
Generalizing a solution by introducing parameters is known as *parameterization* and we will talk about that more in the chapter on [methods](methods).
```


%````{hint}
%:class: info
%The Towers of Hanoi puzzle can be solved in $2^n-1$ moves, where n is the number of disks.
%
%```
%     STEP 0:
%  |    |    |
%  -    |    |
% ---   |    |
%-----  |    |
%
%
%     STEP 1:
%  |    |    |
%  |    |    |
% ---   |    |
%-----  |    -
%
%
%     STEP 2:
%  |    |    |
%  |    |    |
%  |    |    |
%----- ---   -
%
%
%     STEP 3:
%  |    |    |
%  |    |    |
%  |    -    |
%----- ---   |
%
%
%     STEP 4:
%  |    |    |
%  |    |    |
%  |    -    |
%  |   --- -----
%
%
%     STEP 5:
%  |    |    |
%  |    |    |
%  |    |    |
%  -   --- -----
%
%
%     STEP 6:
%  |    |    |
%  |    |    |
%  |    |   ---
%  -    |  -----
%
%
%     STEP 7:
%  |    |    |
%  |    |    -
%  |    |   ---
%  |    |  -----
%```
%````

```{exercise}
Come up with an algorithm for a problem of your choice.
```

## Language games

% https://en.wikipedia.org/wiki/Cant_(language)#Argot
In this book we're making heavy use of what's known as "language games" as a case study.
These are simple algorithms that convert input sentences into output sentences.
Language games can also, if you will, be thought of as ways to encode messages using a cipher.
Throughout the book we will refer to these language games as ciphers.


(reverse-cipher)=
### Reverse cipher

Consider for example a very simple language game.
Let's call it the "reverse cipher".
In this game, we simple reverse the message.

The word "LIVE" will be converted into the word "EVIL".
The word "Hello" will be converted into "olleH".


(caesar-cipher)=
### Caesar cipher

What about a more complex language game.
A classic game is that known as a Caesar Cipher.
In a Caesar cipher you decide upon an alphabet (we'll always use A-Z) and a key which is a positive or negative whole number.
The key decides how many steps you will shift each letter in the alphabet.
If, for example, our key would be `2`, then "A" would be converted to "C" and "B" would be converted to "D".

Caesar ciphers are easy to visualize by listing the whole alphabet twice on two rows.
On the second row we simply "shift" the alphabet as many steps as dictated by the key.
We can then trivially see how to translate each letter.
The first row specifies the input and the second row the output.

```
ABCDEFGHIJKLMNOPQRSTUVWXYZ
CDEFGHIJKLMNOPQRSTUVWXYZAB
```


(leet-language)=
### Leetspeak

How about something from modern times?
Let's talk about Leetspeak.
Leetspeak is a language game popularized on the internet where some letters are replaced with numbers based on similarity of glyphs.

The name derives from how the numbers `1337` translate to `"leet"` (short for "elite").

Depending on what substitutions you choose in the Leet language your encoding might not be reversible, so let's pick a conservative subset of rules that makes it possible for us to reverse our encoded strings.

```
A <-> 4
E <-> 3
L <-> 1
O <-> 0
S <-> 5
T <-> 7
```

To exemplify, this scheme means that we would get the translations listed below.

```
LEET <-> 1337
leet <-> leet
HELLO WORLD <-> H3110 W0R1D
```


(robbers-language)=
### Robber's language

%TODO: Add more very brief backstory. Such as that she used it in her books about Bill Bergson (Kalle Blomkvist).

The Robber's language is a language game popularized by Swedish children's book author Astrid Lindgren.
The game is simple.
Every consonant is doubled and an "o" is inserted between.

If we have the word "tree" then we would say "totroree".
If we have the word "lol" then we would translate it to "lololol".

In the game that we will use in this book we will make the vowel "o" a parameter so that you can choose to insert another one.
If, for example, we would choose "a" as the vowel and our input message is "dog" then our output would be "dadogag".

% TODO: Similar to Tutnese, or Double dutch

(identity-cipher)=
### Identity cipher

Of course, the simplest ciphers of all ciphers is what we might call the identity cipher.
This cipher does no transformation and simply gives you whatever input you give it back as output.
If you give it "hello" as input then you get "hello" as output.

Why do we call it the "identity" cipher?
Because the word identity is in mathematics and especially category theory used to describe a transformation that takes you back to the same "place".
In the context of multiplication, the number $1$ is the identity. In the context of addition, the number $0$ is the identity.



% ## TODO: Andra språk
%https://en.wikipedia.org/wiki/L%C3%ADngua_do_Pê
%https://en.wikipedia.org/wiki/Pig_Latin
%https://en.wikipedia.org/wiki/Back_slang
%https://en.wikipedia.org/wiki/Ubbi_dubbi


%## Sorting and searching
%
%```{warning}
%Work in progress.
%```

% For example: quicksort and Tony Hoare.

