(algorithms)=
# Algorithms

```{warning}
This chapter is a work in progress.
```

Algorithms rule our world.
It doesn't matter if you're a programmer, mathematician or not, you will eventually or have already come into contact with the word algorithm.

We use algorithms for suggesting similar products to customers, picking stocks, computing credit scores, controlling traffic lights, biometric authentication, providing search results, prioritizing job applications, pricing strategy, double entry bookkeeping, and the list just keeps going.
In anything that resembles a computer, we find algorithms.
It almost doesn't matter anymore what your business is, there is always room for improvement using algorithms.

Algorithms existed long before computers, as we know them, entered the scene.
Evidence of the usage of algorithms have been found dating as far back as 2500 BC {cite:p}`todo`.
The word algorithm stems from the Persian polymath Muḥammad ibn Mūsā al-Khwārizmī {cite:p}`todo`.

Formal definitions in computer science aside, we can think of an algorithm as a finite sequence of precise instructions.
As we shall discuss in the next chapter on computation [{numref}`Chapter %s<computation>`], executing the steps of an algorithm is to compute.
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

```{figure} ../images/river-crossing.jpg
:name: fig:river-crossing

Illustration of the river crossing puzzle involving a wolf, a sheep, and a cabbage.
```

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


## Towers of Hanoi

Let's take one more example.
This is a puzzle known as (among other names) the Towers of Hanoi.
In this puzzle we have three rods or poles and some number of disks.
Each disk has a different diameter but they can all be slid onto the rods through a hole in the middle of each disk.
See {numref}`fig:towers-of-hanoi` for an illustration.

```{figure} ../images/towers-of-hanoi.jpg
:name: fig:towers-of-hanoi

Illustration of The Towers of Hanoi.
```

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
Generalizing a solution by introducing parameters is known as *parameterization* [{numref}`Chapter %s<static-methods>`] and we will talk about this more later.
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

## Sorting and searching

```{warning}
This section is a work in progress.
```

TODO.

