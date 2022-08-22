(computation)=
# Computation

Executing the steps of an algorithm [{numref}`Chapter %s<algorithms>`] is to compute.
Since algorithms were around long before what we today think of as computers, computation is much older than computers.
To make the distinction clearer we could also use the term computer hardware instead of simply computers.


## History

```{warning}
Work in progress.
```

%- The word "computer" was originally used to refer to a human responsible for carrying out computation.
%- The earliest computing devices were used for simple tallying and recording quantities {cite:p}`todo`.
%This was often done in a way similar to how we count on our fingers.
%- The earliest tool that we know have been used for arithmetic computation is the abacus, also known as a counting frame {cite:p}`todo`.
%While calculators are usually used today, abacuses are still produced today albeit sometimes as children's toys.
%A modern abacus might be made from a wooden frame with metal wires on which you can slide wooden beads back and forth.
%See {numref}`fig:abacus` for an illustration.
%
%```{figure} ../images/abacus.jpg
%:name: fig:abacus
%Illustration of a modern abacus.
%```
%
%- Antikythera mechanism.
%- Planisphere, sector, planimeter, slide rule.
%- The devices became more and more advanced and involves more and more complex mechanics.
%- Charles Babbage, Jaquard looms, and the difference engine. Never completed in his own lifetime but later completed by his son.
%- From analog computers, electromechanical, to vacuum tubes and digital electronic circuits.
%- Concept of modern computer proposed by Alan Turing as "Universal computing machine".
%- Turing Also proposes stored programs instead of fixed programs.
%- Concepts of Turing complete is still used today.
%- Manchester baby.


## Binary

Computers are at their core dealing with ones and zeroes.
This is known as "binary".
Binary code that the processor (CPU) understands is known as "machine code".
Machine code is usually thought of as the language at the lowest level.
However, processors themselves sometimes use what's known as "microcode" but that's too close to the hardware for this book.
We'll talk more about high- and low-level programming languages when we get to Compilation [{numref}`Chapter %s<compilation>`].

Binary counting existed before computers entered the scene.
Let's spend a few moments to get a better understanding of binary counting.
Let's consider two other number systems that you're already probably familiar with:
Tally marks and the Hindu-Arabic numeral system.
Note that the Hindu-Arabic system is our normal decimal system without the decimals.

The system of tally marks is utterly trivial and I presume that most people recognize it from childhood.
Zero is represented by no marks, and one is represented by a single mark.
To add one to whatever number you already have, you simply add another mark.
The number of marks you have determines the number that you have.
When we tally something we tend to draw every fifth mark diagonally over the last four marks to make counting easier.

```{figure} ../images/tally-marks.svg
---
name: tally-marks
---
Example of counting to seven using tally marks.
```

Let's now talk about our good old Hindu-Arabic numeral system, which is also known as the base-ten positional numeral system.
In the decimal system we have ten unique symbols representing the numbers 0 to 9.
When we reach the last symbol, 9, and want to add one, we simply reset the number to 0 and add a 1 to the preceding digit.
This process is simpler to grasp if you think of the number 9 as actually being 09.

$$
00 + 01 = 01\\
01 + 01 = 02\\
02 + 01 = 03\\
...\\
09 + 01 = 10\\
...\\
19 + 01 = 20\\
$$

We say that this is a positional numeral system because the position of the digits matter.
We say that this numeral system has base ten because each position is multiplied by a multiple of 10.
See the algorithm?

$$
123 = 1 * 10^2 + 2*10^1 + 3*10^0
$$

Digits in the first position from the right are multiplied by $10^0$.
Digits in the second position from the right are multiplied by $10^1$.
Digits in the third position from the right are multiplied by $10^2$.
And so forth.

<!-- https://en.wikipedia.org/wiki/Positional_notation -->
```{figure} ../images/base-ten.svg
---
name: base-ten
---
I
```

Now let's talk about binary.
Binary is simply another positional system but with a base of two instead of ten.
This means that the position of a digit determines what multiple of two that the digit should be multiplied with.

Let's consider the number 12 in base ten.
In binary, meaning in base two, we would express this as $1100$.
Why?
Well...
The first two digits from the right are zeroes so we can disregard these.
The third digit from the right however is a one, so it gives us:

$$
1*2^2 = 4
$$

and the fourth digit from the right is also a one which gives us:

$$
1*2^3 = 8
$$

which means that we end up with:

$$
8 + 4 + 0 + 0
$$

which is equal to $12$.

Since, in binary we either have or don't have a position we can actually simplify this calculation significantly by pre-calculating what number each position either does or does not give us.

````{figure} ../images/base-two.svg
---
name: base-two
---
Summand: 64 + 32 + 16 + 8 + 4 + 2 + 1 + 0
Digit:   8    7    6    5   4   3   2   1
````

Rings a bell? :)
You've probably seen this number sequence somewhere before since it's everywhere in computing.
So, if we've got a 1 in positions 2 and 3 (from right to left) then we've expressed the number 3 since we end up with $2 + 1$ or more explicitly $0 + 0 + 0 + 0 + 0 + 2 + 1 + 0$.

In theory we can of course have any number of digits but in the example above we used 8.
Why?
Because each of these digits is known as a "bit" and if you have eight bits this gives you a "byte".

You might be familiar with the fact that we measure storage space in bytes.
Let's make more sense of this.
When we say that the size of a file is 100 bytes we're actually saying that to store the file we need 800 bits.

Just stop for a moment and contemplate how extremely impressive all this is.
Let's say we want to communicate information equivalent to one measly gigabyte.
That's not really an extreme size given that we've got SD cards measured in terabytes.
A gigabyte is equal to $10^9$ bytes which in turn is equal to $8 * 10^9$ bits.
Meaning 8 billion on the short scale.

## Transistors

Modern processors contain billions of transistors.
A transistor can be thought of as being turned on or off, which means that it can communicate a single bit, a zero or a one.
To represent a byte we need eight transistors, since a byte is eight bits.
So to communicate 100 bytes we need 800 transistors.
<!-- TODO: Add more explanation of what transistors actually are. From an electronics perspective. -->

If you don't consider cramming billions of transistors into one processor mind blowing I don't know what could possibly be.
How in the world can all this physically fit into a laptop case?

```{figure} ../images/transistor.svg
:name: fig:transistor
Illustration of a transistor.
```

```{seealso}
We're not going to get into the industry confusion surrounding how to use the prefixes kilo, mega, giga, and tera but if you're interested I recommend the [Wikipedia page on Megabyte](https://en.wikipedia.org/wiki/Megabyte).

Also, you might be interested in this Wikipedia page on the difference between the [short and long scale](https://en.wikipedia.org/wiki/Long_and_short_scale).
```

## Hardware

```{warning}
Work in progress.
```

%- Hardware vs software
%- Pieces of a modern computer.
%  - ALU
%  - CPU
%  - Memory
%  - I/O

