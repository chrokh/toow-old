# Decorator pattern

```{warning}
Work in progress.
```


%````{exercise}
%Start from the program you built in {ref}`stop-and-go`.
%Add an instance method to the class `Player` with the follwing signature:
%
%```csharp
%void UpdateMover (int steps, Mover mover);
%```
%
%The instance method should replace the current `Mover` instance of the `Player` for as many steps as determined by the `steps` variable.
%As soon as the number of `steps` has been taken since the last switch.
%
%USE DECORATOR PATTERN AND KEEP AN INTERNAL STEP COUNTER IN EACH DECORATOR. THE DOWNSIDE OF THIS IS OF COURSE THAT YOU WILL NEED TO EVENTUALLY CLEAR OUT ALL THE INACTIVATED MOVERS. IS IT BETTER TO JUST USE AN ARRAY?
%
%IS THIS PERHAPS UNNECESSARILY COMPLICATED? THE POINT GETS ACROSS EVEN WITH SIMPLY `void SetMover (Mover mover)`? Because otherwise you have to deal with keeping track of two instances and `null` values and timers etc.
%
%````
%
