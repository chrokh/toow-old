# Functions

Why oh why do we have to talk about mathematical functions?
Don't worry, I've hated math too and this is not going to get very complicated.
It is my belief that understanding sets and understanding functions makes us better programmers because we realize the importance of carefully designing the types of both our objects and methods.

```{note}
In this book we will refrain from using the word "function" when discussing procedural or object oriented programming. Instead we will be using the words "procedure" in the former case and "method" in the latter.
The reason for this is that procedures and methods tend to be [impure](purity), but more on this later.
```

Functions map input to output.
Given some input argument or arguments, you get some specific output.
So a function is essentially a relation between an input set and an output set with the added caveat that any one input can only ever map to a single output.

Let's take an example.
Consider the following set of ordered pairs:

$$
\{ (\mathit{True}, \mathit{False}), (\mathit{False}, \mathit{True}) \}
$$

The set contains two pairs.
One combines $\mathit{True}$ with $\mathit{False}$, and the other $\mathit{False}$ with $\mathit{True}$.
Does this model a function?
Yes.
What could we call this function?
Well, how about $\mathit{not}$?
If you haven't studied logic this name might not make sense, but this function essentially flips a boolean.
True becomes false and false becomes true.

On the type level we would define the function by saying that it is a mapping from the set of $\mathit{Boolean}$ to the set of $\mathit{Boolean}$.
You put a boolean in, you get a boolean out.
The function doesn't map to values from a different set, it just gives you a different value from the same set than the one you gave it.

$$
\mathit{not} : \mathit{Boolean} \rightarrow \mathit{Boolean}
$$

To define the implementation of the function in mathematics we can use a piecewise definition to say that $\mathit{False}$ is returned when $\mathit{True}$ is given, and $\mathit{True}$ is returned when $\mathit{False}$ is given.

$$
\mathit{not}(x) = 
    \begin{cases}
        \mathit{False}, & \text{if } x = \mathit{True}\\
        \mathit{True},  & \text{if } x = \mathit{False}\\
    \end{cases}
$$

```{exercise}
:label: ex:define-function
Define the type and the implementation of a function that takes booleans and returns integers using notation appropriate in set theory.
```

This function can be visualized by drawing the input and output sets as two ovals, where each oval contains the members of their respective sets.
In this case, the input set happens to be the same as the output set so the members are the same.
We then draw arrows to show which input elements map to which output elements.
See {numref}`fig:function-not`.

```{figure} ../images/function-not.jpg
:name: fig:function-not
Visualization of a function that negates a boolean.
```

Let's now introduce some additional terminology.
The set on the left, meaning the input-set, is called the domain.
The set on the right, meaning the output-set, is called the codomain.
The members of the codomain that the function actually maps to is called the image (or the range).

```{exercise}
Define the terms domain, codomain, and image.
```

In {numref}`fig:function-not` the domain is the set $\textit{Boolean}$ on the left.
The codomain is the set $\textit{Boolean}$ on the right.
Finally, the image is also the full set $\textit{Boolean}$ on the right.
Which means that the image, in this case, is an improper subset of the codomain.

However, the image can be a proper subset of the codomain which means that it isn't equal to the codomain.
Notice how the element $3$ isn't part of the image but is part of the codomain in {numref}`fig:function`.
This means that it is impossible to produce the element $3$ when calling this function, no matter which input you run it with.

```{figure} ../images/function.jpg
:name: fig:function

Illustration of the domain, codomain, and image/range of some function.
```

```{exercise}
What does it say about a function if the image is not equal to the codomain?
```

```{exercise}
Draw the function that you defined in {numref}`ex:define-function` using visual notation appropriate in set theory.
```

There is however one more interesting thing we have to note about {numref}`fig:function`.
Notice how the element $D$ in the domain, meaning the input-set, isn't mapped to any element in the codomain, meaning the output-set.
This means that the function is a *partial* function as opposed to a *total* function.
A total function must define a mapping for all elements in the domain.

The totality of functions is hugely important for programmers.
If we define a procedure or method that can be modeled as a partial function then that means that our procedure or method throws an [exception](exceptions).
We haven't talked about exceptions yet, so if you aren't familiar with them from before then I cannot blame you for saying "so what, what's so bad about exceptions?".
In short, exceptions are locally unrecoverable states.
Meaning that when an exception is thrown in a procedure or method, it is because this procedure or method cannot possible determine how the program is to be saved from whatever problem just occurred.
This is not good.

```{tip}
Partial functions correspond to procedures or methods that throw exceptions.
Always ask yourself whether you can rewrite your code so that your functions are total.
```

```{exercise}
What is a partial function and why is it problematic?
```

Before we close this chapter on functions there's one more thing we need to talk about: arity.
The arity of a function refers to how many arguments it takes.
Up to this point we've only talked about *unary* functions.
Nullary functions take 0 arguments,
unary functions take 1 argument,
binary functions take 2 arguments,
and ternary functions take 3 arguments.
Of course functions, procedures, and methods can take more arguments but these are the arities that we have really common names for.

Say that we have a binary function that takes two integers, performs addition, and returns an integer.

$$
\mathit{add}(x, y) = x + y
$$

Mathematically we would say that $\mathit{add}$ is a function that maps from the Cartesian product of integers and integers ($\mathbb{Z} \times \mathbb{Z}$) to integers ($\mathbb{Z}$).
This is the type of the function.

$$
\mathit{add} : (\mathbb{Z} \times \mathbb{Z}) \rightarrow \mathbb{Z}
$$

