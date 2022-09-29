# Leaky abstractions

```{warning}
Work in progress.
```

%An argument for letting the methods be methods in the cipher substitution example is that otherwise the abstraction is leaky. We have to keep track of whether a pattern has been applied or not in order to avoid going "in circles". This is a good argument for staying with the methods. We can make the OO solution non-leaky by wrapping a char (passing it in the constructor) and then applying each substitution in order. Then we can encode the idea of not applying a sub if we've already applied one. But this is computationally expensive. It's more difficult to make the methods approach not leaky if we were to introduce a type that holds the list of tuples. The naive OO solution is also leaky.
