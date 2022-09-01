# Abstract dependency injection

```{warning}
Work in progress.
```



%- Principle: Depend on abstractions not on concretions.
%- In procedural programming abstract modules depend on concrete modules, but in object oriented programming abstract modules can depend on abstract modules.
%
%```{seealso}
%Dependency injection/inversion chapter.
%```

%```{exercise}
%Draw the [quadrant diagram of abstraction levels in object composition](composition-quadrants) and explain all four abstraction levels.
%Remember to give examples of each.
%```


%
%````{exercise}
%Write a program with three classes called `Speech`, `MultiSpeech`   has one class called `Animal` and one class called `Speech`.
%
%```
%        Animal
%==========================
%+ Animal (Speech speech);
%+ string Speak ();
%--------------------------
%
%
%        Speech
%==========================
%+ Speech (string sound);
%+ string Speak ();
%--------------------------
%```
%
%Using your classes, it should be possible to write the following program:
%
%```csharp
%Speech meow = new Speech("meow");
%Speech blub = new Speech("blub");
%Speech meowblub = new MultiSpeech(meow, blub);
%
%Animal cat = new Animal(meow);
%Animal fish = new Animal(blub);
%Animal catfish = new Animal(meowblub);
%
%Console.WriteLine( cat.Speak() );
%Console.WriteLine( fish.Speak() );
%Console.WriteLine( catfish.Speak() );
%```
%
%And if you run that program, you should get the following output:
%
%```output
%meow
%blub
%meow blub
%```
%````

% REMIND READER THAT THIS IS JUST RECURSION USING CLASSES.
