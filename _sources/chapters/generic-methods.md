# Generic methods

```{warning}
Coming soon.
```

%Dictionary<TKey, TValue> MakeDictionary<TKey, TValue>(TKey[] keys, TValue[] values)
%{
%    var dict = new Dictionary<TKey, TValue>();
%    for (int i = 0; i < keys.Length; i++)
%        dict[keys[i]] = values[i];
%    return dict;
%}
%
%var keys = new int[] { 1, 2, 3 };
%var values = new string[] { "Hello", "Generic", "Methods" };
%Dictionary<int, string> dict = MakeDictionary(keys, values);
