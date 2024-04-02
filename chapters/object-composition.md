---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: csharp
  language: .net-csharp
  name: .net-csharp
---

# Object composition

Object composition is a way of combining simple objects or data types into more complex ones. It is a fundamental concept in object-oriented programming and a powerful tool for code organization and reuse. By designing our classes to contain instances of other classes, we create more sophisticated behavior with simpler, understandable parts.

```{figure} ../images/cover-object-composition.jpg

Just as a complex LEGO structure is composed of many smaller blocks, a complex object can be composed of many smaller objects. Each smaller object, like each LEGO block, has its own specific role and functionality. This is the essence of object composition.
```

Let's explore object composition by creating a simple game scenario where we have a `Player` and `Weapon` class.

```{code-cell}
public class Weapon
{
    public string Name { get; set; }
    public int Damage { get; set; }
}
```

```{code-cell}
public class Player
{
    public string Name { get; set; }
    public Weapon Weapon { get; set; }
}
```

In the code above, the `Player` class is composed of a `Name` of type string and `Weapon` of type `Weapon`. Here, we are using object composition to give the `Player` a `Weapon`.

```{code-cell}
var hammer = new Weapon { Name = "Hammer", Damage = 10 };
var mario = new Player { Name = "Mario", Weapon = hammer };

Console.WriteLine($"{mario.Name} used {mario.Weapon.Name} with {mario.Weapon.Damage} damage.");
```

In this example, we create a `hammer` object of `Weapon` type and a `mario` object of `mario` type. The `mario` is given the `hammer` as its `Weapon`. We then use the properties of the composed `Weapon` object through the `mario` object.

Of course, we can compose any `Player` with any `Weapon`. That is the power of object composition.

%var electroBall = new Weapon { Name = "Electro Ball", Damage = 12 };

```{code-cell}
var pikachu = new Player { Name = "Pikachu", Weapon = hammer };

Console.WriteLine($"{pikachu.Name} used {pikachu.Weapon.Name} with {pikachu.Weapon.Damage} damage.");
```

In the example above, we have the same weapon to a different `Player` object.

```{important}
The relationship between the `Player` and `Weapon` classes in our example is commonly called a "has-a" relationship. This terminology indicates that an instance of one class (in this case, `Player`) has a reference to an instance of another class (in this case, `Weapon`) as a field. When we say that a `Player` "has-a" `Weapon`, we express that the `Player` class incorporates a `Weapon` object, enabling the player to use a weapon and potentially perform actions such as attacking.
```


%Recognizing and leveraging these "has-a" relationships is a crucial part of effective object-oriented design.

Remember that when using object composition, the composed object (`Weapon` in this case) can be used independently, and its lifecycle is not tied to the object it is composed into (`Player` in this case).

```{note}
In the example above, we might refer to `Player` or `pikachu` as the 'composing' class or object, and `Weapon` or `hammer` as the 'composed' class or object. Composition is a directed relationship, so even if a `Player` object has-a `Weapon` object, the opposite is not necessarily true.
```

Object composition provides a flexible and modular approach to constructing complex objects. By using object composition, you can change the behavior of your objects at runtime by changing their components. It is a practical approach to creating programs that are easy to understand, modify, and maintain.

%Object composition has powerful benefits that we will return to in future chapters. It helps you reduce the size of your classes and improve maintainability.

%Object composition is a powerful tool in object-oriented programming.

Object composition allows you to keep your classes small and focused on a single responsibility, without sacrificing flexibility. This makes your code easier to maintain. As we explore more advanced concepts like [dependency injection](dependency-injection), [subtype polymorphism](subtype-polymorphism) or [composition over inheritance](composition-over-inheritance), you will see object composition in action in a variety of contexts and really start appreciating its power.

