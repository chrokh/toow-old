# Precedence

In the world of programming, not all operators are equal. Some have higher priority than others. This is what we call 'operator precedence'.

Operator precedence determines the order in which operations are performed when different operators are present within an expression. Just like in algebra, multiplication and division operators have higher precedence than addition and subtraction. So, in an expression like `3 + 4 * 5`, the multiplication is performed first, resulting in `3 + 20`, and then the addition is done, leading to the result `23`.

It's important to know about operator precedence because it affects how an expression is evaluated. Misunderstanding precedence can lead to unexpected results. If you want to override the default precedence, you can use parentheses. For instance, if you want the addition to happen first in the previous expression, you can write `(3 + 4) * 5`, which gives `35`.

C# has a specific order of precedence for its operators.
The complete list can be found in the [C# documentation](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/#operator-precedence).

%https://media.discordapp.net/attachments/1118630713084870736/1122893983106998322/chrokh_a_simple_flat_illustration_of_4_round_league_bades_with__360f5ec2-1c35-474a-9fd9-c608315ce51a.png?width=1440&height=449
```{figure} https://media.discordapp.net/attachments/1118630713084870736/1122894686944776313/chrokh_a_simple_flat_illustation_of_3_cute_round_league_badges__ebed913a-6e71-445c-b0fb-de4e409abd29.png?width=1440&height=449

Not all operators are equal, so when mixing operators you must keep precedence in mind, since some are executed before others.
```

%starting from the highest to the lowest. The highest include post/pre increment and decrement, followed by unary plus and minus, then multiplication, division, and modulus, then addition and subtraction, and so on.
