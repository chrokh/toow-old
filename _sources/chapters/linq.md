# LINQ

```{warning}
Work in progress.
```

%- Standard query operators (https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/standard-query-operators-overview)
%- Relate to: Relational alegbra. Functional programming and strategy pattern.
%


%```csharp
%// FROM THIS:
%public string Encode (string input)
%{
%  input.Select(c => charCipher.Encode(c))
%  string output = "";
%  foreach (char c in input)
%    output += charCipher.Encode(c);
%  return output;
%}
%
%// TO THIS:
%public string Encode (string input)
%  => input.Select(c => charCipher.Encode(c));
%```


%- Is it possible that we can eliminate the need for ciphers like `ConditionalCharCipher` or the refactored `ConditionalCipher<char, string>` significantly by using LINQ expressions?
