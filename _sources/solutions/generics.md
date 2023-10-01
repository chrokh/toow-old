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

# Solution: Generics

```{code-cell}
:tags: [remove-input]
class DiceRoll
{
    public int Value { get; set; }
}

class Card
{
    public string Suit { get; set; }
    public string Rank { get; set; }
}

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


## Step 1: Introduce a non-generic `ObjectPair` class

```{code-cell}
public class ObjectPair
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

## Step 2: Refactor `Main`

Notice the downcasting.

```{code-cell}
var randomDiceRollPair = ObjectPair.PickRandom(diceRolls);
var randomCardPair = ObjectPair.PickRandom(cards);

Console.WriteLine("Random Dice Roll Pair:");
Console.WriteLine($"{((DiceRoll)randomDiceRollPair.Item1).Value}");
Console.WriteLine($"{((DiceRoll)randomDiceRollPair.Item2).Value}");

Console.WriteLine("Random Card Pair:");
Console.WriteLine($"{((Card)randomCardPair.Item1).Rank} of {((Card)randomCardPair.Item1).Suit}");
Console.WriteLine($"{((Card)randomCardPair.Item2).Rank} of {((Card)randomCardPair.Item2).Suit}");
```

## Step 3: Introduce a Generic `Pair` Class

```{code-cell}
public class Pair<T>
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

## Step 4: Refactor `Main`

Notice the lack of downcasting.

```{code-cell}
var randomDiceRollPair = Pair<DiceRoll>.PickRandom(diceRolls);
var randomCardPair = Pair<Card>.PickRandom(cards);

Console.WriteLine("Random Dice Roll Pair:");
Console.WriteLine($"{randomDiceRollPair.Item1.Value}");
Console.WriteLine($"{randomDiceRollPair.Item2.Value}");

Console.WriteLine("Random Card Pair:");
Console.WriteLine($"{randomCardPair.Item1.Rank} of {randomCardPair.Item1.Suit}");
Console.WriteLine($"{randomCardPair.Item2.Rank} of {randomCardPair.Item2.Suit}");
```


## Challenge 1: Extend Functionality

```csharp
public class Pair<T>
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

    public override string ToString()
        => $"{Item1.ToString()}, {Item2.ToString()}";
}
```

```{code-cell}
public class DiceRoll
{
    public int Value { get; set; }

    public override string ToString() => Value.ToString();
}
```

```{code-cell}
public class Card
{
    public string Suit { get; set; }
    public string Rank { get; set; }

    public override string ToString()
        => $"{Rank} of {Suit}";
}

```

## Challenge 2: Nested Generics

```csharp
var twoPairs = new Pair<Pair<Card>>
{
    Item1 = Pair<Card>.PickRandom(cards),
    Item2 = Pair<Card>.PickRandom(cards)
};

Console.WriteLine(twoPairs.ToString());
```

## Challenge 3: Replace arrays with `List<T>`

In `Pair<T>`, change the method `PickRandom` to accept `List<T>` instead of `T[]`.

```csharp
public class Pair<T>
{
    // ...

    public static Pair<T> PickRandom(List<T> items)
        => new Pair<T> { /* ... */ };
}
```

In `Main`, replace the array initializations with `List<T>` initializations, and adjust the `PickRandom` calls.

```csharp
List<DiceRoll> diceRolls = new List<DiceRoll> { /* ... */ };

List<Card> cards = new List<Card> { /* ... */ };
```
