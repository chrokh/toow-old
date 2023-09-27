# Composite pattern

```{warning}
Work in progress.
```

<iframe width="560" height="315" src="https://www.youtube.com/embed/EWDmWbJ4wRA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

% - Multi cipher?


## Motivation

Sometimes you've got a thing, and other times you've got a thing that contains things.
In the chapter on [abstract injected object composition](abstract-injected-object-composition) we introduced the notions of Composite ciphers by saying that some ciphers are ciphers and others are composites of ciphers.
This is the composite pattern.

Composite pattern is used when you've got data and behavior that is neatly organizable as a tree.


## Definition

In the original [design patterns](design-patterns) book {cite:t}`gammaEtAl1995`, the intent of the bridge pattern is defined as:

```{epigraph}
Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.

-- {cite:p}`gammaEtAl1995`
```

% TODO: Replace image.
```{figure} https://upload.wikimedia.org/wikipedia/commons/3/39/W3sDesign_Composite_Design_Pattern_Type_Safety_UML.jpg
:height: 300px

UML class diagram of the two variations of composite pattern as envisaged by {cite:t}`gammaEtAl1995`.
*[Image will be replaced soon]* [[Image source](https://commons.wikimedia.org/wiki/File:W3sDesign_Composite_Design_Pattern_Type_Safety_UML.jpg)]
```

## Examples

### Vector graphics

When you're drawing vector images in a program like Adobe Illustrator you can think of your drawing as a tree.
At the root you have the image.
The image contains a bunch of shapes.
Each shape might contain subshapes and each subshape might contain subshapes.

Of course, in reality there are a bunch of different types of objects involved here.
Like lines, points, brush strokes, and so forth.
Nevertheless the basic idea is the same.

The image can be thought of as a tree at any level of the tree.
You can open up a part of the tree, but when you do, you will reveal a new part of the tree, until you reach a "leaf".


## Exercises

```{exercise}
What is the composite pattern? Explain it in your own words and by using an example.
```

```{exercise}
Come up with your own example use case for the composite pattern and implement it in code.
```

```{exercise}
How are the [maintainability characteristics](maintainability:characteristics) affected when using the composite pattern?
```
