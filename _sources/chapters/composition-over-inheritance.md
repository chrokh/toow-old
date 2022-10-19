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

# Composition over inheritance

```{warning}
Work in progress.
```

## Examples

(composition-over-inheritance:examples:ducks)=
### Ducks

Let's run through an example similar to the duck example made famous by {cite:t}`freemanAndRobson2004`.

We start with this:

```{code-cell} csharp
interface IDuck
{
  string Quack ();
  string Fly ();
}

class WildDuck : IDuck
{
  public virtual string Quack () => "Quack quack.";
  public virtual string Fly () => "Flying with wings.";
}

class RubberDuck : IDuck
{
  public virtual string Quack () => "Squeak squeak.";
  public virtual string Fly () => "Cannot fly.";
}

class RocketPoweredWildDuck : WildDuck
{
  public override string Fly () => "Flying with rockets.";
}

class RocketPoweredRubberDuck : RubberDuck
{
  public override string Fly () => "Flying with rockets.";
}

class RubberDuckWithVoiceSynthesizer : RubberDuck
{
  public override string Quack () => "Quack quack.";
}
```

Pay special attention to how inheritance in the example above doesn't help us in eliminating all duplication.
Our use case doesn't simply form a nice hierarchy and so we end up with duplicated code even though we try our best to use the code-reuse facilities of [inheritance](inheritance) to eliminate it.

Either way, we can use the code like this:

```{code-cell} csharp
:tags: [hide-output]
IDuck[] ducks = new IDuck[] {
  new WildDuck(),
  new RubberDuck(),
  new RocketPoweredWildDuck(),
  new RocketPoweredRubberDuck(),
  new RubberDuckWithVoiceSynthesizer()
};

foreach (IDuck duck in ducks)
  Console.WriteLine(duck.Quack() + " | " + duck.Fly());
```

But as we apply the idea of favoring composition over inheritance we realize that we can break out individual behaviors into their own classes and then compose them as we see fit.
Let's start with quacking behaviors.

```{code-cell} csharp
interface IQuackBehavior
{
  string Quack ();
}

class QuackBehavior : IQuackBehavior
{
  public string Quack () => "Quack quack.";
}

class SqueakBehavior : IQuackBehavior
{
  public string Quack () => "Squeak squeak.";
}
```

Starting to see where this is going?
Let's now do the same thing for fly behaviors.

```{code-cell} csharp
interface IFlyBehavior
{
  string Fly ();
}

class FlyWithWings : IFlyBehavior
{
  public string Fly () => "Flying with wings.";
}

class NoFlyBehavior : IFlyBehavior
{
  public string Fly () => "Cannot fly.";
}

class FlyWithRockets : IFlyBehavior
{
  public string Fly () => "Fly with rockets.";
}
```

Ok, but what happens to all the duck subclasses?
Well, now that we're composing behaviors instead of inheriting and overriding them, we don't need inheritance anymore.
A single `Duck` class will do just fine.

```{code-cell} csharp
class Duck
{
  IQuackBehavior quackBehavior;
  IFlyBehavior flyBehavior;

  public Duck (IQuackBehavior quackBehavior, IFlyBehavior flyBehavior)
  {
    this.quackBehavior = quackBehavior;
    this.flyBehavior = flyBehavior;
  }

  public string Quack () => quackBehavior.Quack();
  public string Fly () => flyBehavior.Fly();
}
```

What we previously considered to be different "types" of ducks no longer need to be represented by different individual classes.
Instead we can grab any two combination of existing or future quack and fly behaviors and pass them as arguments when constructing a duck.
The creation of different "types" of ducks, consequently, now happens at run-time rather than compile-time.

To execute code equivalent to the example that we had before, we would write something like this:

```{code-cell} csharp
:tags: [hide-output]
Duck[] ducks = new Duck[] {
  new Duck(new QuackBehavior(), new FlyWithWings()),
  new Duck(new SqueakBehavior(), new NoFlyBehavior()),
  new Duck(new QuackBehavior(), new FlyWithRockets()),
  new Duck(new SqueakBehavior(), new FlyWithRockets()),
  new Duck(new QuackBehavior(), new NoFlyBehavior())
};

foreach (Duck duck in ducks)
  Console.WriteLine(duck.Quack() + " | " + duck.Fly());
```



%---
% EXAMPLE: SOLVE THE ISSUE DISCUSSED IN INHERITANCE CHAPTER WHERE WE COULDN'T IMPLEMENT THE FOREACH FOR BOTH CHAR-TO-STRING CIPHERS and CHAR-TO-CHAR CIPHERS. USE COMPOSITION!

%- White-box/black-box reuse. Breaking encapsulation / information hiding (cuz protected, see Gamma et al, 1994, kap 1).
%- Re-use implementation horizontally (strategy pattern video, sandi metz?).
%- En student skrev om Kentaur (halv människa halvt djur) som exempel på horisontell delning av kod. Bra exempel. Använd själv Mermaid som exempel för att inte sno dennes exempel rakt av.
%- Changing behaviour at runtime vs compile time.
%- Exercises:
%    - Draw two class diagram in UML that show how a solution that uses inheritance might be refactored into one that uses composition?
%

%```{important}
%At it's core, the problem with inheritance is that it assumes that you problem forms a hierarchy.
%```
%Few problems are hierarchies, many are graphs.


## Exercises

```{exercise}
Explain the principle usually called "composition over inheritance" in your own words.
```

```{exercise}
How are the [maintainability characteristics](maintainability:characteristics) affected when following the principle of composition over inheritance?
```

```{exercise}
It could be argued that favoring composition over inheritance helps avoid issues related to the Liskov substitution principle.
In what sense?
```

```{exercise}
Many object oriented languages do not support multiple inheritance.
In what sense is the lack of support for multiple inheritance an argument for favoring composition over inheritance?
```

```{exercise}
What do we mean when we say that composition over inheritance gives us the flexibility to change behavior at run-time?
```


```{exercise-start}
:label: ex:composition-over-inheritance:levels
```
Refactor the application below by favoring composition over inheritance.
When you are done, levels should not be classes but objects.
In other words, whenever you want to add a new level, you should not have to write a new class.
Instead you simply instantiate another `Level` object and pass your configuration of choice to the constructor.
```{code-cell} csharp
:tags: [hide-input]
class Game
{
  public void Run (ILevel level, char secret)
  {
    Console.WriteLine($"The output is '{level.Encode(secret)}'. What is the input?");
    Console.Write("Your guess: ");
    char guess = Console.ReadKey().KeyChar;
    Console.WriteLine();
    if (guess == secret)
    {
      Console.WriteLine("You win!");
    }
    else
    {
      Console.WriteLine($"Wrong. Try again!");
      Console.WriteLine();
      Console.WriteLine($"Hint: {level.GetHint()}");
      Run(level, secret);
    }
  }
}

interface ILevel
{
  char Encode (char input);
  string GetHint ();
}

class Level1 : ILevel
{
  public char Encode (char input)
  {
    string alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    int i = alphabet.IndexOf(Char.ToUpper(input));
    int newIndex = (i + 1) % alphabet.Length;
    if (i != -1)
    {
      if (Char.IsLower(input))
        return Char.ToLower(alphabet[newIndex]);
      else
        return alphabet[newIndex];
    }
    return input;
  }

  public string GetHint ()
    => "One step at a time.";
}

class Level2 : ILevel
{
  public char Encode (char input)
  {
    string alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    int i = alphabet.IndexOf(Char.ToUpper(input));
    int newIndex = (i - 4) % alphabet.Length;
    if (i != -1)
    {
      if (newIndex < 0)
        newIndex += alphabet.Length;

      if (Char.IsLower(input))
        return Char.ToLower(alphabet[newIndex]);
      else
        return alphabet[newIndex];
    }
    return input;
  }

  public string GetHint ()
    => "Two steps forward, six steps back.";
}

class Level3 : ILevel
{
  public char Encode (char input)
  {
    switch (input)
    {
      case 'L': return '1'; case '1': return 'L';
      case 'A': return '4'; case '4': return 'A';
      case 'O': return '0'; case '0': return 'O';
      case 'T': return '7'; case '7': return 'T';
      case 'E': return '3'; case '3': return 'E';
      default: return input;
    }
  }

  public string GetHint ()
    => "H4x";
}
```
Be sure to try out the game before you start refactoring it.
The example below shows how to start a game.
```csharp
Game game = new Game();
game.Run(new Level1(), 'A');
```
The output of running the game above should look like below, if you guess `C` the first time and `A` the second.
```output
The output is 'B'. What is the input?
Your guess: C
Wrong. Try again!

Hint: One step at a time.
The output is 'B'. What is the input?
Your guess: A
You win!
```
```{exercise-end}
```


```{exercise}
Consider your solution to {numref}`ex:composition-over-inheritance:levels`.
How is the [maintainability](maintainability:characteristics) of the application changed after having favored composition over inheritance?
```

```{exercise}
Come up with your own example of a case where one ought to favor composition over inheritance.
Describe your case in detail but without using any code.
Use UML class diagrams to illustrate the before and after.
```

