## Benefits of comments

But why do we even need comments in the first place?
Isn't code self-explanatory?
If we wrote it once, surely that must mean that we understood it, so why can't we just read the code if we need to understand it again?

According to {cite:t}`ousterhout2018`, the purpose of comments is to hide complexity.
{cite:t}`ousterhout2018` explains that comments achieve this in two ways.
Comments reduce *cognitive load* by removing the need to read the code, and they reduce *unknown unknowns* by clarifying the structure of the system.

```{figure} https://openlibrary.telkomuniversity.ac.id/uploads/book/cover/21.01.649.jpg
---
figclass: margin
---
"A Philosophy of Software Design" {cite:p}`ousterhout2018`.
```

```{seealso}
I *highly recommend* that you buy the book "A Philosophy of Software Design" {cite:p}`ousterhout2018`.
Even if only to keep it on your bookshelf as a reference.
It is, arguably, next to none when it comes to object oriented design.
Ousterhout has created a unified view (or in his words, philosophy) of the most important design ideas in the world of object oriented programming.
If you're not yet convinced you might want to have a look at his great [Google Tech Talk](https://youtu.be/bmSAYlu0NcY) from 2018.
```


## Objections to comments

{cite:t}`ousterhout2018` argues that there are four common objections to writing comments.
These are:

- Objection 1: "Good code is self-documenting."
- Objection 2: "I don't have time to write comments."
- Objection 3: "Comments get out of date and become misleading."
- Objection 4: "The comments I have seen are all worthless; why bother?"

Regarding good code being self-documenting, {cite:t}`ousterhout2018` argues that while good code certainly can communicate a lot of information it cannot possibly communicate all that is necessary.

At it's core, the issue is that method and class names cannot communicate all the semantics needed to understand.
And if they can, then {cite:t}`ousterhout2018` argues that you are writing what he calls "shallow" methods that contain way too little code.
To do anything non-trivial you will need to {doc}`compose<composition>` so many methods that users of the method will likely end up needing to read all the composed methods as well.

```{epigraph}
If users must read the code of a method in order to use it, then there is no abstraction: all of the complexity of the method is exposed.

-- {cite:t}`ousterhout2018`
```

```{seealso}
Much later we will discuss {doc}`liskov-substitution-principle` and you will see how the same problem appears again.
The data types (including signatures) cannot capture all the behavioral details.
Similarly, when we get to the chapter on, {doc}`types-over-tests`, we'll discuss how much information, but not necessarily all, can be captured in the types.
```

Regarding not having time to write comments, {cite:t}`ousterhout2018` admits that in the face of scarce time it seems logical to choose to write new features over documenting an existing one.
However, he argues that since there will always be something that appear more critical than writing comments, we cannot use this as a guiding principle.
Since comments hide complexity they improve {doc}`Maintainability<maintainability>` which is a very concept that we, in later chapters, will discuss at length.

This is similar to how {cite:t}`martin2019` argues that while we might think lowering quality (by in this case not writing comments) enables us to go faster, it actually makes us slower.
The argument, at its core, is that dirty solutions are slow because they are difficult to change.

```{epigraph}
The only way to go fast, is to go well.

-- {cite:p}`martin2019`
```

% TODO: Another way to think about this is:
% "There’s nothing more permanent than a temporary hack."
% - Kyle Simpson
% https://maximilianocontieri.com/software-engineering-great-quotes



The third objection is that comments tend to get out of date to the point where they are outright misleading.
As we've already alluded to this can be somewhat addressed by using documentation comments.
{cite:t}`ousterhout2018` however also suggests that comments should be kept as close as possible to the code that it documents rather than say in a separate documentation file.
He also suggests that to avoid drift, duplication should be avoided as much as possible.

The fourth and last objection is the empirical observation that many comments are utterly worthless.
It is easy to write comments, but are they any good?
So what constitutes good comments?

```{exercise}
Explain and argue against two common objections to why you would need comments.
```


## Good comments

According to {cite:t}`ousterhout2018`, the overall idea of comments is to "describe things that aren't obvious from the code".
As we mentioned in the introduction to this chapter, {cite:t}`ousterhout2018` argues that comments should reduce cognitive load and unknown unknowns.

```{epigraph}
Comments should describe things that aren't obvious from the code.

-- {cite:t}`ousterhout2018`
```

From this perspective, comments should increase [abstraction](abstraction).
They provide us with a more abstract view of the system.
A view where we don't actually have to read the code and where we don't need to care about all the nitty gritty details.

In my interpretation, {cite:t}`ousterhout2018` suggests eight guidelines for good comments.

1. **Pick and stick to a convention.** Conventions make your comments easier to read and understand. However, they also help you see where you are missing comments. In the case of C#, [Documentation Comments](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/documentation-comments) serve as an excellent convention.
2. **Don't repeat the code.** Comments that merely explain what the comment does provides zero additional value. The reader of your comments could just as well read your code instead. Comments must always justify their existence by providing additional value beyond the code.
3. **Keep near the code.**
{cite:t}`ousterhout2018` suggests that one of two things we can do to keep comments up to date and avoid drift is to keep them "near" the code that they document.
This means that we should not put our documentation and comments in a separate document but rather in our actual code.
We are not discussing source control in this book, but another mistake, according to {cite:t}`ousterhout2018` is to put important comments in source control commit logs rather than in the code.
4. **Avoid duplication.** {cite:t}`ousterhout2018` suggests that the second thing we can do to keep comments up to date and avoid drift is to avoid duplication.
If you've studied databases then you're familiar with this concept as "anomalies".
Whenever we duplicate something we run the risk of getting "out of sync" by making a change in one of the places and forgetting to also change the other.
{cite:t}`ousterhout2018` also suggests that if "information is already documented someplace outside your program, don't repeat the documentation inside the program; just reference the external documentation".
5. **Add precision with low-level comments.** Comments that are expressed at a lower level of abstraction than the code should provide additional value. For example, what does it mean when the value of a variable is null, are there exclusive or inclusive boundaries for some variable, and so forth. This is stuff that isn't obviously expressed in the code but that's important.
6. **Enhance intuition with high-level comments.** Comments that are expressed at a higher level of abstraction give readers a high-level understanding of what the code in question does. {cite:t}`ousterhout2018` also argues that high-level comments are much easier to maintain (since they are more likely to remain true in the face of code changes) and hence should be preferred.
7. **Document interfaces.** We have not yet talked about {doc}`interfaces<abstraction>`, {doc}`methods<static-methods>`, nor about {doc}`objects<objects>`, but think of it this way: As soon as you have some "thing" that you can interact with in certain ways then that thing has got, what we call, an interface. The interface is how we communicate with the thing. Comments should be used to describe how we can interact with the thing. Or in other words, comments should describe the interface.
8. __Express *what* and *why*, not *how*.__ {cite:t}`ousterhout2018` uses the term "implementation comments" to refer to comments that describe concrete implementations. He argues that such comments should focus on *what* some piece of code does and *why* it needs to be done. However, he's suggesting that these comments should not be concerned with *how* it is done. If we focus on *how* then we are back to repeating the code.

Some people even go so far as to suggest that we should write our comments *before* we write our code.
We'll discuss this further in the chapter on {doc}`Documentation-driven development<documentation-driven-development>`.


```{exercise}
Explain three of the eight guidelines for good comments written by {cite:t}`ousterhout2018`.
```
