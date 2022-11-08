(access-modifiers)=
# Access modifiers (basic).

```{warning}
Work in progress.
```

%- Public / private (beware of the same-class caveat with private).
%- Principle: Encapsulation / Information hiding (coupling, hide what changes)
%    - <https://stackoverflow.com/questions/13913174/what-are-the-differences-between-information-hiding-and-encapsulation>
%- Principle: The state space of a type should equal the state space of whatever domain concept it is modeling.
%- Modifiers for variables, methods and classes
%- UML Class diagrams
%- Convention of uppercase first letter when public and lowercase when private.

% ALSO: MODIFIERS FOR CLASSES.
%- Point adding point in instance methods chapter is a good example of how private does not mean in the same instance but in the same type. A good exercise might be to ask whether the methods we've defined still work even when we switch to `private`.


## Exercises

```{exercise}
What is the difference between `public` and `private`?
```
