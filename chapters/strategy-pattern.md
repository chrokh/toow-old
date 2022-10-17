# Strategy pattern

```{warning}
Work in progress.
```

%## Motivation

%I would be so bold as to suggest that there is no *useful* distinction between strategy pattern and [abstract injected object composition](abstract-injected-object-composition), or even [dependency inversion](dependency-inversion-principle).
%
%However, there are certainly those who argue that these things are not the same.
%Some who argue that there is a difference, focus on the ephemerality of the injected object.
%Others focus on the ability to change an injected object for another at run-time.
%
%This is why I put emphasis on the word "useful" when claiming that there, in my mind, is no "useful" distinction between them.
%So, while it is *possible* to categorize and separate these ideas, I simply suggest that it isn't useful to do so.
%Not for practice and not for purposes of theorization.
%
%So, you can assume that the chapter called [composition over inheritance](composition-over-inheritance) is just as much about strategy pattern as it is about composition over inheritance.
%This should also explain why this chapter is surprisingly short.

## Definition

The definition of the strategy pattern from the classic design patterns book {cite:t}`gammaEtAl1995` is as follows:

```{epigraph}
Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.

-- {cite:t}`gammaEtAl1995`
```

In strategy pattern we are concerned with using composition over inheritance to allow the implementation of a behavior be decidable at run-time.
Instead of using inheritance to enable re-use of behaviors we use [abstract injected object composition](abstract-injected-object-composition).

% TODO: Replace image.
```{figure} https://upload.wikimedia.org/wikipedia/commons/3/39/Strategy_Pattern_in_UML.png
:height: 300px

UML class diagram of strategy pattern.
*[Image will be replaced soon]* [[Image source](https://en.wikipedia.org/wiki/Strategy_pattern#/media/File:Strategy_Pattern_in_UML.png)]
```


## Examples

### Ducks

The example in the chapter on [composition over inheritance](composition-over-inheritance:examples:ducks) regarding ducks with different quack and fly behaviors is a prime example of strategy pattern.
A very similar example is also discussed in the video embedded at the end of this chapter.



## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/v9ejT8FO-7I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Exercises

```{exercise}
What is the strategy pattern? Explain it in your own words and by using an example.
```
