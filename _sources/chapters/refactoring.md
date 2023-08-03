# Refactoring

Writing software to solve a problem is only half of the challenge.
Beyond solving the immediate problem, there are two additional challenges: maintainability and performance.

In this book we are are concerned about [maintainability](maintainability) but not performance.
Maintainability we've discussed at length in its own chapter.
Performance on the other hand means taking the space time complexity into consideration.
Meaning, how fast does the code run (this is the time-part) and how much memory does it use (this is the space-part).
Regardless of whether you are rewriting your code to improve maintainability or to improve performance, this process is known as "refactoring".

```{admonition} Key point
Refactoring is both a verb and a noun. As a verb, it means improving the design of existing code by changing its internal structure without affecting its observable behavior. As a noun, it refers to the transformation that we apply to a piece of code for the same reasons as above.
```

Notice the usage of the term 'observable behavior'.
If we are changing the observable behavior then we do *not* refer to this as 'refactoring' since we are changing the [requirements](requirements) (and thus the [validation](validation) and [verification](verification) criteria) and are essentially writing a new program.
%If we are changing the observable behavior then we are *not* refactoring but writing a new program.


```{seealso}
This introduction merely scratches the surface of refactoring. If you're interested in learning more about this topic, consider reading the classic book ['Refactoring' by Martin Fowler](https://geni.us/DABBqp). This book dives deep into the why's and how's of refactoring, with numerous examples and practical advice to guide you on your journey to cleaner, better code.
```

Two influential refactorings that we will discuss later are
['replace conditional with polymorphism'](replace-conditional-with-polymorphism)
and
['replace inheritance with delegation'](composition-over-inheritance) (also known as 'composition over inheritance').

Remember, code isn't set in stone. Code is more like clay that can be molded and reshaped. Continually striving to improve your codebase through refactoring is a sign of a great developer.

%And as we continue our journey into the world of object-oriented programming, we'll learn more techniques and best practices to help us write code that's not only functional but also clean, maintainable, and efficient.


```{figure} https://images-na.ssl-images-amazon.com/images/I/51ttgxwzArL._SY445_SX342_QL70_ML2_.jpg

[Refactoring: Improving the design of existing code, by Martin Fowler](https://geni.us/DABBqp).
```

