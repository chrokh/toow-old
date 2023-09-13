# Anonymous types

Coming soon.


%```csharp
%var point = new { x = 1, y = 2 };
%```
%
%---
%
%```csharp
%Console.WriteLine(point);
%```
%
%```output
%{ x = 1, y = 2 }
%```
%
%---
%
%```csharp
%Console.WriteLine(point.GetType());
%```
%
%```output
%<>f__AnonymousType0`2[System.Int32,System.Int32]
%```
