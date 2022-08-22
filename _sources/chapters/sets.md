
# Sets

Programmers are modellers.
We write programs consisting of business objects[^business-objects] [{numref}`Chapter %s<business-objects>`]
and business rules [{numref}`Chapter %s<business-logic>`].
These objects and rules must be valuable to whoever is paying our salary.
Set theory helps us define effective types for both objects and rules.
Effective in the sense that they only allow the states and behavior that we want.
Which in turn means that we need fewer tests and suffer fewer bugs.
We'll talk more about this in future sections but at this point I hope that you will trust me when I say that great programmers understand that data types can usefully be thought of as sets.

```{important}
Types can be modelled by sets.
```

Don't worry if you think of yourself as someone who's not a math person.
We don't need to understand all the ins and outs of set theory.
We simply need to understand:

1. Sets.
2. Members.
3. Subsets.
4. Unions.
5. Cartesian products.

So what is a set?
A set is a collection of elements, which we will refer to as members.
A set can be empty and it can be infinite.
A set can contain other sets.
All elements in a set must be unique.

In terms of notation, the empty set is usually denoted by the letter O or the number 0 crossed with a diagonal slash ($\varnothing$).
A set is then defined as a comma-separated list of elements enclosed by two curly braces.
In case of the empty set, we just have two curly braces.

$$
\varnothing = \{ \}
$$

## Members

Let's take an example.
If I make a statement like: "I am a human".
In the field of logic this is known as a predicate.
This statement (or predicate) can either be true or false.
We can model the values that we can assign this predicate with the set that's commonly called "Boolean".
In terms of notation, we would define the set like this.

$$
\mathit{Boolean} = \{ \mathit{True}, \mathit{False} \}
$$

```{caution}
We are now expressing ourselves in the language of mathematics, not a programming language.
```

Since all elements in a set must be unique we cannot have a set that, for example, contains the element $\mathit{True}$ two times.

$$
\{ \mathit{True}, \mathit{True}, \mathit{False} \} \quad \text{Not a valid set.}
$$

So the boolean set helps me capture the values that I can assign to predicates.
But what about statements like: "Humans will eventually live on Mars"?
I don't know whether this is true or not.
My current set is insufficient when it comes to categorizing this statement.
We need something like ternary logic, also known as three-valued logic.
I need to be able to express the fact that I don't know whether the statement is true or false.
This is sometimes called a trilean.
So let's design a set that also contains the element $\mathit{Unknown}$.

$$
\mathit{Trilean} = \{ \mathit{True}, \mathit{False}, \mathit{Unknown} \}
$$

Note that predicates is just an example and that sets can be used to model anything.
Let's talk about the set that we tend to call integers.
Integers are positive or negative whole numbers.
The set of all integers holds all conceivable whole numbers.
This set is of course infinite.
We might define it like this:

$$
\mathbb{Z} = \{ \dotsc \enspace , \enspace -2 \enspace , \enspace -1 \enspace , \enspace 0 \enspace , \enspace 1 \enspace , \enspace 2 \enspace , \enspace \dotsc \}
$$

Note that we are now using the notation of three dots ($\dotsc$) to emphasize that the set continues into infinity.
This set is infinitely large.

Looking at our definition for the set of all integers ($\mathbb{Z}$) one might assume that we've defined an ordered set.
Sets however are not ordered.
So when we use the curly brace notation that we've used to talk about sets we are *not* imposing any order upon the elements in the set.
If we want to talk about order we have to use a different notation and explicitly state that we are talking about an ordered set.
Conventionally we use square brackets ($[\enspace]$) to denote ordered sets.
We could thus define the ordered set of integers as:

$$
Z = [ \dotsc \enspace , \enspace -2 \enspace , \enspace -1 \enspace , \enspace 0 \enspace , \enspace 1 \enspace , \enspace 2 \enspace , \enspace \dotsc ]
$$

To show that an element is a member of a set we use a symbol that almost looks like the letter E backwards: $\in$.
To say that the element $\mathit{True}$ is a member of the set $\mathit{Boolean}$ we would say:

$$
\mathit{True} \in \mathit{Boolean}
$$

Elements can be members of multiple sets.
The element $\mathit{True}$ is not just a member both $\mathit{Boolean}$ but also of $\mathit{Trilean}$.
So it would be entirely fine to also state that:

$$
\mathit{True} \in \mathit{Trilean}
$$

To express that an element is *not* a member of a particular set we simply strike over the symbol used to define that it *is* a member.
The element $\mathit{Unknown}$ is not a member of $\mathit{Boolean}$ and this can be expressed as:

$$
\mathit{Unknown} \not\in \mathit{Boolean}
$$

```{exercise}
:label: ex:set-members
Define a set that captures the different states of a traffic light.
```

## Cardinality

The number of elements in a set is known as the cardinality of a set.
A set containing three elements has a cardinality of $3$.
Cardinality is denoted using the "pipe" symbol ($|$) which is also known as "vertical bar".
So, if $X$ refers to a set, then $|X|$ refers to the cardinality of the set $X$.

$$
|\mathit{Boolean}| = 2\\
|\mathit{Trilean}| = 3
$$




## Diagrams

Sets can also be visualized.
You've probably come across Venn or Euler diagrams already, and if you understand Venn and Euler diagrams, you understand sets.
To visualize a set we draw a circle and put a label next to it.
We then draw and label any number of points inside the circle as well as outside the circle.
Any point inside the circle is a member of the set.
Any point outside the circle is not a member of the set.

```{figure} ../images/sets-and-members.jpg
:name: fig:set-members

Visualization of sets and members.
```

```{exercise}
Draw a Venn diagram of the set that you came up with in {numref}`ex:set-members`.
```


## Intersection

Let us first look at the set operation known as "intersection".
It is a binary operation between two sets and is denoted by a symbol that looks like the letter "U" flipped upside-down ($\cap$).

The intersection of two sets simply yields a new set that contains all the elements that occurr in both sets.
In other words the intersection is the set of all elements of the first set, that are also found in the second.

$$
\mathit{Boolean} \cap \mathit{Trilean} = \{\mathit{True}, \mathit{False} \}
$$

```{figure} ../images/intersection.jpg
:name: fig:intersection

Visualization of the intersection between the two sets $\mathit{Boolean}$ and $\mathit{Trilean}$.
```

Remember the set that we called $\mathbb{Z}$ which contains all positive and negative integers?
Another common set in mathematics is that of natural numbers.
It is usually denoted $\mathbb{N}$ and it contains all positive (but not all negative) integers.
Whether 0 is included or not depends but let us here assume that 0 is not included.
We could informally define the set as:

$$
\mathbb{N} = \{ 1, 2, 3, \dotsc \}
$$

Since all natural numbers are also integers but not all integers are natural numbers we observe that the intersection between natural numbers and integers is the same set as the set of natural numbers.

$$
\mathbb{N} \cap \mathbb{Z} = \mathbb{N}
$$

This is because there are no elements in $\mathbb{N}$ that are not also in $\mathbb{Z}$.
There are no elements in $\mathbb{N}$ that are "outside" of $\mathbb{Z}$.
We refer to this as that $\mathbb{N}$ is an improper subset of $\mathbb{Z}$.



## Subsets

So what is this idea of subsets?
If all elements of a set are also members of another set, then the first set is a subset of the second.
If the two sets are different, which means that some of the elements of the second set are not in the first, then the first set is known as a *proper* subset.
We denote a subset using the symbol $\subset$ and a proper subset using the symbol $\subseteq$.

$$
\mathit{Cats} \subset \mathit{Animals}
$$

Consider the set of all cats in the world and the set of all animals in the world.
All cats are animals, but not all animals are cats.
Which of the two sets is a proper subset of the other?
The set of all cats is a subset of the set of all animals.
Why? Because there are no cats that are not also animals.
It is a *proper* subset since there exists some animals that are not cats.

```{figure} ../images/subsets.jpg
:name: fig:subsets

Visualization of a proper subset relation between the set of all cats and the set of all animals as well as between the set of all dogs and the set of all animals.
Also note that no dogs are cats.
```

```{exercise}
:label: ex:subsets
How can a set capturing the states of a two-light traffic light be considered a subset of a set capturing that of a three-light traffic light?
```

Why do we need to understand subset relations as object oriented programmers?
Because the, arguably, most important pillar [{numref}`Chapter %s<pillars>`] of object oriented programming is subtype polymorphism [{numref}`Chapter %s<subtype-polymorphism>`].
Subtype polymorphism is also known as inclusion polymorphism and the set theoretic idea of subsets is also known as inclusion.
So when we think of data types as sets then the subsets help us reason about subtype polymorphism.


## Union

Let us now look at the operation known as "union".
It is denoted by a symbol that looks like the letter U ($\cup$).
The union of two sets simply yields a new set that contains all the elements of the first and all the elements of the second.
Since a set cannot contain the same element more than once, duplications are however only counted once.

$$
\mathit{Boolean} \cup \mathit{Trilean} =
\{ \mathit{True}, \mathit{False}, \mathit{Unknown} \}
$$

```{figure} ../images/union.jpg
:name: fig:union

Visualization of the unioin between the two sets $\mathit{Boolean}$ and $\mathit{Trilean}$.
```

%Let's take another example.
%Consider the following two sets:
%
%$$
%\mathit{Letters} = \{ A, B \}\\
%\mathit{Numbers} = \{ 1, 2, 3 \}\\
%$$
%
%The set $\mathit{Letters}$ contains the elements $A$, and $B$.
%The set $\mathit{Numbers}$ contains the elements $1$, $2$, and $3$.
%If we take the union of these two sets we end up with a new set that contains all the elements of the first set as well as all the elements of the second set.
%
%$$
%\mathit{Letters} \cup \mathit{Numbers} = \{ A, B, 1, 2, 3 \}
%$$

The union operation is often thought of as the set equivalent to algebraic addition.
The algebraic sum between two and three is five ($2+3=5$).
Taking the union of a set containing two elements and a set containing three elements yields a new set containing five elements, assuming that no element appears in both sets.
But what if an elements appear in both sets?
Well, the number of elements in the resulting set is equal to the number of elements in the first, plus the number of elements in the second, minus the number of elements that appear in both.

$$
|A \cup B| = |A| + |B| - |A \cap B|
$$

In other words, the cardinality of the resulting set is equal to the sum of the cardinalities of the two sets minus the cardinality of the intersection between the two sets.



## Cartesian products

Before we leave sets I want to share one final thing and that is the idea of the Cartesian product.
Cartesian product is also a binary operation applied to sets and it is denoted using a symbol that looks like the letter "X" ($\times$) which importantly is also how multiplication is denoted.
A Cartesian product between two sets yields a new set that contains all ordered pairs that you can form by taking one element from the first set and one element from the second.

$$
\mathit{Boolean}
\times
\mathit{Trilean}
= \{
(\top, \top),
(\top, \bot),
(\top, \ast),
(\bot, \top),
(\bot, \bot),
(\bot, \ast)
\}
$$

For the sake of readability I've abbreviated the value $\mathit{True}$ as $\top$, $\mathit{False}$ as $\bot$, and $\mathit{Unknown}$ as $\ast$.
Also note that an ordered pair is denoted as two elements separated by a comma and enclosed in parenthasis.
The expression $(a, b)$ therefore refers to a pair where the first element is $a$ and the second is $b$.

If the algebraic counterpart to union is addition, then the algebraic counterpart to Cartesian product is multiplication.
The number of elements in the resulting set is equal to the product of the number of elements in the two constituent sets.

$$
|A \times B| = |A| * |B|
$$

It is important to understand that a Cartesian product ($\times$) is not the same as a union ($\cup$).
A union between two sets yields a new set containing all the elements of the first set as well as all the elements of the last set.
However, a Cartesian product between two sets however yields a new set that contains all combinations of pairs between the two sets.

```{exercise}
What is the Cartesian product of the two traffic light sets that you defined in {numref}`ex:subsets`?
```

Why is it important to understand Cartesian products?
Because it helps us reason about functions [{numref}`Chapter %s<functions>`] that take multiple parameters.

