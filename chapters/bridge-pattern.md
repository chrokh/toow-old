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

# Bridge pattern

```{warning}
Work in progress.
```

%TODO: Strategy pattern as it should be used.

## Definition

In the original [design patterns](design-patterns) book {cite:t}`gammaEtAl1995`, the intent of the bridge pattern is defined as:

```{epigraph}
Decouple an abstraction from its implementation so that the two can vary independently.

-- {cite:p}`gammaEtAl1995`
```

Another way to think about the bridge pattern is as an abstraction using an abstraction, or two layers of abstraction.
In [strategy pattern](strategy-pattern) we have one abstraction and multiple concretions.
In bridge pattern we have one abstraction composed with another abstraction where both might have multiple concretions.

% TODO: Replace image.
```{figure} https://upload.wikimedia.org/wikipedia/commons/c/cf/Bridge_UML_class_diagram.svg
:name: fig:bridge-pattern-original
:height: 300px

UML class diagram of bridge pattern.
*[Image will be replaced soon]* [[Image source](https://en.wikipedia.org/wiki/File:Bridge_UML_class_diagram.svg)]
```

In its original conception, the reference to the second abstraction lies in the first abstraction.
This is visualized in {numref}`fig:bridge-pattern-original` as the aggregation arrow between the left and the right abstraction.

These days, the reference to the second abstraction is placed in concretions of the first abstraction.
This is even more flexible than the original idea since different concretions of the first abstraction can couple to different second abstractions.
If the first abstraction holds the reference to the second abstraction, then the second abstraction is fixed.
If instead, the concretions of the first abstraction holds a reference to the second abstraction than all the concretions of the first abstraction can hold a reference to whatever abstraction they wish.

% TODO: IS THIS ACTUALLY A MODERN CONCEPTION OR IS IT DISCUSSED IN THE ORIGINAL BOOK TOO?
Notice where the association arrow comes from in {numref}`fig:bridge-pattern-modern`.
In this newer interpretation I think it is useful to think of this as [strategy pattern](strategy-pattern) applied to each strategy in a case of strategy pattern.

% TODO: Replace image.
```{figure} https://upload.wikimedia.org/wikipedia/commons/f/fd/W3sDesign_Bridge_Design_Pattern_UML.jpg
:name: fig:bridge-pattern-modern
:height: 300px

UML class diagram (left) of modern interpretation of bridge pattern using an interface rather than a class as the abstraction.
*[Image will be replaced soon]* [[Image source](https://en.wikipedia.org/wiki/File:W3sDesign_Bridge_Design_Pattern_UML.jpg)]
```

% TODO: Separating the Platform-specific from the platform-general.



## Examples


### Cipher displays in old style

```{code-cell} csharp
:tags: [hide-input]
interface ICipher<in TIn, out TOut>
{
  TOut Encode (TIn input);
}

class ReverseCipher : ICipher<string,string>
{
  public string Encode (string input)
  {
    string output = "";
    for (int i=input.Length-1; i>=0; i--)
      output += input[i];
    return output;
  }
}

class CaesarCipher : ICipher<char,char>
{
  int steps;

  public CaesarCipher (int steps)
    => this.steps = steps;

  public char Encode (char input)
  {
    string alphabet = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    int i = alphabet.IndexOf(Char.ToUpper(input));
    int newIndex = (i + steps) % alphabet.Length;
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
}

class SubstitutionCipher : ICipher<string,string>
{
  ICipher<char,string> cipher;

  public SubstitutionCipher (ICipher<char,string> cipher)
    => this.cipher = cipher;

  public SubstitutionCipher (ICipher<char,char> cipher)
    => this.cipher = new CharToStringAdapter(cipher);

  public string Encode (string input)
  {
    string output = "";
    foreach (char c in input)
      output += cipher.Encode(c);
    return output;
  }
}

class CharToStringAdapter : ICipher<char,string>
{
  ICipher<char,char> cipher;

  public CharToStringAdapter (ICipher<char,char> cipher)
    => this.cipher = cipher;

  public string Encode (char input)
    => cipher.Encode(input).ToString();
}
```

```{code-cell} csharp
abstract class CipherView
{
  protected ICipher<string,string> cipher;

  public CipherView (ICipher<string,string> cipher)
    => this.cipher = cipher;

  public abstract void Draw (string input);
}

class CompactView : CipherView
{
  string label;

  public CompactView (ICipher<string,string> cipher, string label)
    : base (cipher)
      => this.label = label;

  public override void Draw (string input)
    => Console.WriteLine($"{label}: {cipher.Encode(input)}");
}

class VerboseView : CipherView
{
  string label;

  public VerboseView (ICipher<string,string> cipher, string label)
    : base (cipher)
      => this.label = label;

  public override void Draw (string input)
    => Console.WriteLine($"Using \"{label}\", the input \"{input}\" translates to \"{cipher.Encode(input)}\".");
}
```

Now we can combine any view with any cipher to create a displayable cipher.
Since all views share the same supertype we can also treat them interchangeably.
In other words, we have two layers of abstraction.
We can combine any view with any cipher and then pass that object around without whoever is to use it needing to know what view and cipher we've got.

```{code-cell} csharp
ICipher<string,string> reverse = new ReverseCipher();
ICipher<string,string> caesar1 = new SubstitutionCipher(new CaesarCipher(1));

CipherView compactReverse = new CompactView(reverse, "Reverse");
CipherView compactCaesar1 = new CompactView(caesar1, "Caesar (steps = 1)");
CipherView verboseReverse = new VerboseView(reverse, "Reverse");
CipherView verboseCaesar1 = new VerboseView(caesar1, "Caesar (steps = 1)");
```

```{code-cell} csharp
compactReverse.Draw("Hello world");
```

```{code-cell} csharp
verboseCaesar1.Draw("Hello world");
```


### Cipher displays in new style


```{code-cell} csharp
interface ICipherView
{
  void Draw (string input);
}

class CompactView : ICipherView
{
  ICipher<string,string> cipher;
  string label;

  public CompactView (ICipher<string,string> cipher, string label)
  {
    this.cipher = cipher;
    this.label = label;
  }

  public void Draw (string input)
    => Console.WriteLine($"{label}: {cipher.Encode(input)}");
}

class VerboseView : ICipherView
{
  ICipher<string,string> cipher;
  string label;

  public VerboseView (ICipher<string,string> cipher, string label)
  {
    this.cipher = cipher;
    this.label = label;
  }

  public void Draw (string input)
    => Console.WriteLine($"Using \"{label}\", the input \"{input}\" translates to \"{cipher.Encode(input)}\".");
}
```

The added benefit of this approach is that the first abstraction (`ICipherView`) isn't at all coupled to the idea of `ICipher`.
Consequently, implementations of the interface don't actually need to compose something of type `ICipher<string,string>` or anything at all for that matter.
The implementations are free to compose whatever other combination of objects they wish.

So, the interface `ICipherView` is more general than the abstract class `CipherView` from the last example.
In fact, this interface should perhaps simply be called `IView` instead.

Of course, we can still combine any view with any cipher and pass the result around without users needing to worry about what concrete view and cipher has been used.

```{code-cell} csharp
ICipher<string,string> reverse = new ReverseCipher();
ICipher<string,string> caesar1 = new SubstitutionCipher(new CaesarCipher(1));

ICipherView compactReverse = new CompactView(reverse, "Reverse");
ICipherView compactCaesar1 = new CompactView(caesar1, "Caesar (steps = 1)");
ICipherView verboseReverse = new VerboseView(reverse, "Reverse");
ICipherView verboseCaesar1 = new VerboseView(caesar1, "Caesar (steps = 1)");
```

```{code-cell} csharp
compactReverse.Draw("Hello world");
```

```{code-cell} csharp
verboseCaesar1.Draw("Hello world");
```


## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/F1YQ7YRjttI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Exercises

```{exercise}
What is the bridge pattern? Explain it in your own words and by using an example.
```

```{exercise}
Come up with your own example use case for bridge pattern and implement it in code.
```

```{exercise}
In this chapter we have discussed two "flavors" of the bridge pattern.
What is the difference between the two and what effects does this difference have on the maintainability of the resulting software?
Use the [maintainability characteristics](maintainability:characteristics) terminology from the maintainability chapter.
```

```{exercise}
We have described the bridge pattern as making use of two layers of abstraction.
Is it possible to have a number of layers of abstraction?
Why would it be useful to have more layers of abstraction?

Hint: `new A(new B(new C()))`
```

```{exercise-start}
```
Write another class that implements the interface `ICipherView` or inherits from the abstract class `CipherView` from the examples in this chapter.
Let's call the new class `ArrowView`.
It should behave like this:

```{code-cell} csharp
:tags: [remove-input]
class ArrowView : ICipherView
{
  ICipher<string,string> cipher;
  public ArrowView ( ICipher<string,string> cipher)
    => this.cipher = cipher;
  public void Draw (string input)
    => Console.WriteLine($"{input} => {cipher.Encode(input)}");
}
```
```{code-cell} csharp
ArrowView reverseView = new ArrowView(new ReverseCipher());
ArrowView caesar2View = new ArrowView(new SubstitutionCipher(new CaesarCipher(2)));
reverseView.Draw("Secret message");
caesar2View.Draw("Secret message");
```
```{exercise-end}
```
