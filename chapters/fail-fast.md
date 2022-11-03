(fail-fast)=
(prefer-compile-time-errors)=
# Fail fast

As we have seen, there are plenty of mistakes that we can make that cause our programs to fail to compile or even crash at run-time.
%There are also plenty of ways (and as always, some disagreements on how) to categorize errors.
%However, I am quite fond of using a quadrant diagram (meaning a two-by-two) based on concepts we've already covered.
%Let's call it "the error quadrant diagram".
%See {numref}`fig:errors`.

%``{figure} https://via.placeholder.com/700x200?text=Image+coming+soon
%:name: fig:errors
%The error quadrants classifies errors in the two dimensions "when" and "what".
%``

%## The error quadrant diagram

One way of classifying errors is in regards to the notion of *time*.
When did the error occur?
Did the error occur at *[compile-time](compilation)* or at *[run-time](execution)*?
In other words, did it occur when we compiled the program or when we tried to run it?
Many (mostly [interpreted](interpretation)) languages (such as JavaScript and Python) tend to skip compile-time error checking altogether.

%TODO: It would be GREAT if we could find some quadrant diagram again.
%In the other dimension we're asking what *type* of error it is.
%Is it a *[syntax](syntax) error* or a *[semantic](semantics) error*?
%In other words, is it a grammatical error or an error of meaning?
%Is it an error in form or in content?

```{note}
Checking for errors at compile-time without running the program, is sometimes called "static code analysis" or "static testing".
Checking for errors at run-time, meaning while running the program, is sometimes called "dynamic code analysis" or "dynamic testing".
We'll talk more about assessing [correctness](correctness) in its own chapter.
```

%A *syntax error* means that we've expressed something that is *grammatically* incorrect in the language.
%Syntax errors can be discovered at compile-time if we're dealing with a *compiled* language.
%If however, we are dealing with an *interpreted* language then the syntax error would not be discovered until run-time, or more specifically when the interpreter attempts to interpret the faulty line.
%
%A *semantic error* means that we've expressed something which doesn't make sense (such as dividing by zero or referring to some other module that doesn't exist).
%If we're dealing with a *complied* language then we say that it's a "static semantic error" or a compile-time semantic error.
%We say that it's a "static" semantic error since it's discoverable at compile-time as opposed to at run-time.


%``{exercise}
%In this book we classfied errors using a quadrant diagram.
%
%1. Draw the error quadrant diagram.
%2. Explain each quadrant.
%3. Give an example of an error in each quadrant.
%``

%## Type errors
%
%In a later chapter we will discuss the notion of [data types](data-types) but I want you to make a mental note of the fact that type errors can be considered a specific type of semantic errors.
%Specifically, the set of type errors is a subset of the set of semantic errors.
%
%Whether they are discovered at compile-time or run-time depends on whether we're dealing with a statically typed or a dynamically typed language.
%Or in other words, whether "type checking" is performed during compile-time or run-time.
%We will discuss type errors in more detail later but I still wanted to mention it here since it is a *very* important topic.
%
%A "type error" means that we've expressed something where the *types* don't line up, such as attempting to use a letter in arithmetic addition.
%All type errors ought to be considered semantic errors but I have chosen to highlight them separately here due to their importance.
%
%
%## Null-state errors
%
%In the chapter on [data types](data-types) we will discuss null-state static checking.
%Nowadays, the C# compiler can help us guarantee that our code is free from run-time errors caused by `null`.
%If we choose not to use these features then we may instead be hit with null-state errors at run-time.
%
%Null-state errors ought to be considered semantic errors but I have chosen to highlight them separately here due to their importance.


%## TODO: Unavoidable run-time errors
%
%```{warning}
%This section is a work in progress.
%```
%
%- StackOverflow.
%- OutOfMemoryException.
%- No internet connection.
%- Web request timeout.
%
%```{exercise}
%Is it possible to write programs so that run-time errors cannot happen? Why or why not?
%```



% TODO: Also known as: Fail fast!
% TODO: Also talk about how exceptions should be thrown as early as possible so that we can find the root cause.
% TODO: https://maximilianocontieri.com/fail-fast

A simple, but important design principle is that of "failing fast".
The principle postulates that the sooner we can discover a mistake, the easier it will be to fix it.
The more "local" an error is, the easier it is to recover from it.

Practically, this has two consequences:

1. If we've encountered a "bad" value we should not propogate the value further since it may cause a run-time error later. Instead we should throw an exception.
2. Compile-time errors should be favored over run-time errors.

We'll talk much more about what a "bad" value could be when we get to the [bijection rule](bijection-rule).
In short, what we mean is a value that doesn't correspond to anything meaningful in the domain that we're trying to model.
Like an invalidly formatted phone number `string` for example.

Regarding the point of not propagating a "bad" value, the idea is that, as mentioned, that an error ought to be easier to deal with the more local it is.
Take the invalid phone number again as an example.
What would be easier?
Dealing with an incorrectly formatted phone number right after the user has entered it.
Or dealing with an incorrectly formatted phone number that the user entered a long time ago when we are now trying to call the user on that phone number.
Clearly, we can write more meaningful implementations if we deal with the error when the incorrect phone number was entered.

%Saying that compile-time errors are preferable over run-time errors solely for the fact that they appear earlier would however be to miss the mark completely.
%The key thing to realize is that if you can move a run-time error to compile-time that means that you can guarantee that this error doesn't ever happen when your program is running.

%Indeed we might even call this a "design principle".
%We'll talk about what [design principles](design-principles) are later.
%But for now, you can think of design principles as ideas that aim to improve the maintainability of code.
%
%```{admonition} Design principle
%:class: tip
%Prefer compile-time errors over run-time errors.
%```

Let's talk about the second idea.
The principle of preferring compile-time errors over run-time errors.

I realize that we haven't talked about enough concepts for this argument to fully fly yet, so we'll return to it when discussing the design principle "[types over tests](types-over-tests)" in a later chapter.
The key point is though that:

```{important}
Instead of designing programs that might crash at run-time, we should design programs that cannot even be compiled if they run the risk of crashing at run-time.
```

Said differently, a program that contains potential run-time errors must be meticulously searched for all possible places in which it can crash so that a crash can be prevented and even then, there are no guarantees.
Contrast this to a program that contains compile-time errors.
This program cannot even be created let alone ran if it contains errors.

%As an example, think about the addition operator.
%Assume that we agree that there is no reasonable one-size-fits-all implementation of the addition operators that let us add numbers and letters.
%Would it be preferable to define the addition operator so that it crashes at compile-time or at runtime if you attempt to add a number to a letter?
%Would you want to be allowed to the compile a program that, by accident, contains the expression `10 + 'A'` only to have it crash at run-time or would you rather be prevented from ever running the program in the first place?

Here's an analogy.
If you're going to paint the facade of a house and you're using a tall ladder that you're suspecting is unreliable.
Would you rather that the ladder breaks down and leaves you tumbling when you've just stepped off the ground or when your three meters up in the air?
Failing fast is safer because it has less consequences.


## Exercises

```{exercise}
Why could it be argued that we should prefer compile-time errors over run-time errors?
```


