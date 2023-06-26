# Relational operators

Relational operators, also known as comparison operators, are used to compare two values and determine their relational order. This is particularly useful in situations where you need to make decisions based on the relationship between two variables, such as determining the larger of two numbers, or checking if a condition is met before executing a block of code.

In C#, there are four primary relational operators:

- `<` (less than)
- `>` (greater than)
- `<=` (less than or equal to)
- `>=` (greater than or equal to)

The less than `<` and greater than `>` operators compare two values and determine if one is larger or smaller than the other. For instance, if `a < b` is `true`, then `a` is less than `b`. If `a > b` is `true`, then `a` is greater than `b`.

The less than or equal to `<= `and greater than or equal to `>=` operators are similar to their counterparts but also consider equality. If `a <= b` is `true`, then `a` is less than or equal to `b`. If `a >= b` is `true`, then `a` is greater than or equal to `b`.

Just like with equality operators, the result of a relational operation is a boolean value - `true` or `false`.

```{figure} https://media.discordapp.net/attachments/1118630713084870736/1122819280992477254/chrokh_a_simple_flat_illustration_of_a_stacking_toy_7cd7f547-c3bf-4806-8ded-b2d0d7dfa88f.png?width=2700&height=1350

Relational operators are used to compare the relational order between two values.
```

Here's an example of how you might use these operators to compare the quantities of marbles stored in variables.

```csharp
int redMarbles = 5;
int blueMarbles = 10;

bool redLtBlue = redMarbles < blueMarbles;   // true
bool redGtBlue = redMarbles > blueMarbles;   // false
bool redLteBlue = redMarbles <= blueMarbles; // true
bool redGteBlue = redMarbles >= blueMarbles; // false
```

In this example, the expressions comparing `redMarbles` and `blueMarbles` are evaluated first, producing a boolean result that is then stored in the respective variables.

Relational operators are a powerful tool in programming, allowing your code to make decisions and take different actions depending on the relationship between two values.
