(composition)=
# Composition

```{warning}
Work in progress.
```

%- Function composition from FP is much more powerful.

%Remember the [Robber's language](https://en.wikipedia.org/wiki/Rövarspråket) ("Rövarspråket") that was popularized by Swedish children's book author Astrid Lindgren?

% REWRITE EXAMPLE IN SAME STYLE AS IN DIRECT OBJECT COMPOSITION CHAPTER. STRING AND CHAR ENCODING.

%```csharp
%Console.WriteLine(encodeInRobbersLanguage("Hello world"));
%Console.WriteLine(encodeInRobbersLanguage("Chris"));
%
%bool isConsonant (char c)
%{
%  string consonants = "bcdfghjklmnpqrstvwxz";
%  return consonants.IndexOf(Char.ToLower(c)) != -1;
%}
%
%string encodeInRobbersLanguage (string input)
%{
%  string output = "";
%  foreach (char c in input)
%    output += isConsonant(c) ? c + "o" + c : c;
%  return output;
%}
%```

```{exercise}
:label: ex:method-composition-caesar-cipher-1

%Caesar cipher. Fixed number of steps.
```

```{exercise}
:label: ex:method-composition-caesar-cipher-2

%Parametrize number of steps.
```
