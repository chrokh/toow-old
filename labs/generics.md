---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: csharp
  language: .net-csharp
  name: .net-csharp
---

# Lab: Generics

## Objective

In this lab, we will apply our understanding of how to use a generic type that someone has defined to reduce redundancy in code while maintaining type-safety. In this case we'll introduce the generic class `Pair<T>`.

## Provided Code

Carefully review the provided code. Notice the redundancy in the `DiceRollPair` and `CardPair` classes and how `DiceRoll` and `Card` classes are coupled with them.

```{code-cell}
class DiceRoll
{
    public int Value { get; set; }
}
```

```{code-cell}
class Card
{
    public string Suit { get; set; }
    public string Rank { get; set; }
}
```

```{code-cell}
class DiceRollPair
{
    public DiceRoll Item1 { get; set; }
    public DiceRoll Item2 { get; set; }

    static readonly Random random = new Random();

    public static DiceRollPair PickRandom(DiceRoll[] diceRolls)
        => new DiceRollPair
        {
            Item1 = diceRolls[random.Next(diceRolls.Length)],
            Item2 = diceRolls[random.Next(diceRolls.Length)]
        };
}
```

```{code-cell}
class CardPair
{
    public Card Item1 { get; set; }
    public Card Item2 { get; set; }

    static readonly Random random = new Random();

    public static CardPair PickRandom(Card[] cards)
        => new CardPair
        {
            Item1 = cards[random.Next(cards.Length)],
            Item2 = cards[random.Next(cards.Length)]
        };
}
```

```{code-cell}
DiceRoll[] diceRolls = new DiceRoll[]
{
    new DiceRoll { Value = 1 },
    new DiceRoll { Value = 2 },
    new DiceRoll { Value = 3 },
    new DiceRoll { Value = 4 },
    new DiceRoll { Value = 5 },
    new DiceRoll { Value = 6 }
};

Card[] cards = new Card[]
{
    new Card { Suit = "Hearts", Rank = "Jack" },
    new Card { Suit = "Hearts", Rank = "Queen" },
    new Card { Suit = "Hearts", Rank = "King" },
    new Card { Suit = "Hearts", Rank = "Ace" },
    // ...
};

var randomDiceRollPair = DiceRollPair.PickRandom(diceRolls);
var randomCardPair = CardPair.PickRandom(cards);

Console.WriteLine("Random Dice Roll Pair:");
Console.WriteLine($"{randomDiceRollPair.Item1.Value}");
Console.WriteLine($"{randomDiceRollPair.Item2.Value}");

Console.WriteLine("Random Card Pair:");
Console.WriteLine($"{randomCardPair.Item1.Rank} of {randomCardPair.Item1.Suit}");
Console.WriteLine($"{randomCardPair.Item2.Rank} of {randomCardPair.Item2.Suit}");
```

## Instructions

### Step 1: Introduce a non-generic `ObjectPair` class

Start by creating a non-generic class `ObjectPair`. This will replace the need for separate pair classes for `DiceRoll` and `Card` but will *not* be compile-time type-safe.

```{code-cell}
class ObjectPair
{
    public object Item1 { get; set; }
    public object Item2 { get; set; }

    static readonly Random random = new Random();

    public static ObjectPair PickRandom(object[] items)
        => new ObjectPair
        {
            Item1 = items[random.Next(items.Length)],
            Item2 = items[random.Next(items.Length)]
        };
}
```

```{admonition} 🤔 Reflection
Why is it not compile-time type-safe?
```

### Step 2: Refactor `Main`

Delete the old classes `DiceRollPair` and `CardPair`.
**Minimally** rewrite the `Main` method so that we make use of `ObjectPair` instead of the two classes `DiceRollPair` and `CardPair`.

```{warning}
This step requires downcasting.
```

```{admonition} 🤔 Reflection
Did we eliminate the duplication?
Why did we loose compile-time type-safety?
```


### Step 3: Introduce a Generic `Pair` Class

Add the generic class `Pair<T>`. This will replace the need for separate pair classes for `DiceRoll` and `Card` *and* will be compile-time type-safe.

```{code-cell}
class Pair<T>
{
    public T Item1 { get; set; }
    public T Item2 { get; set; }

    static readonly Random random = new Random();

    public static Pair<T> PickRandom(T[] items)
        => new Pair<T>
        {
            Item1 = items[random.Next(items.Length)],
            Item2 = items[random.Next(items.Length)]
        };
}
```

### Step 4: Refactor `Main`

Delete the class `ObjectPair`.
**Minimally** rewrite the `Main` method to make use of `Pair<T>` instead of `ObjectPair`.

```{important}
You should no longer need to use downcasting.
```

```{admonition} 🤔 Reflection
How does the use of generics enhance code maintainability and reduce redundancy in this scenario?
Why did we regain compile-time type-safety?
```

## Challenge

1. **Extend Functionality:** Override the `ToString()` method in `Pair<T>`. It should print the details of both the objects in the pair. Tip: All types in C# support the `ToString()` method so it can be called on any object irrespectively of its type.

2. **Nested Generics:** Create a `Pair<Pair<T>>` instance in the `Main` method and experiment with nesting generics.

3. **Replace arrays with List<T>**: Use the generic type `List<T>` instead of arrays in the `Main` method as well as in `Pair<T>`.

```{admonition} 🤔 Reflection
Consider the advantages of using a `Pair<T>` class. Would implementing such generic classes be feasible or beneficial in a more extensive, real-world project setting? Reflect on scenarios where using generics could be disadvantageous.
```

