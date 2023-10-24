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

# Solution: Variant classes

## Step 1: Implement and Test Covariant Return Types

1\. Create a new class called `Pear` which is derived from the `Fruit` class:

```{code-cell}
:tags: [hide-input]
class Fruit { }
```

```{code-cell}
class Pear : Fruit { }
```

2\. Create a new class called `PearTree` which is derived from the `FruitTree` class:


```{code-cell}
:tags: [hide-input]
class FruitTree
{
    public virtual Fruit GetFruit()
        => new Fruit();
}
```

```{code-cell}
class PearTree : FruitTree
{
    public override Pear GetFruit()
        => new Pear();
}
```

3\. Testing it:

```{code-cell}
PearTree pearTree = new PearTree();
Pear pear = pearTree.GetFruit();
```

## Step 2: Reflect on the Benefits of Covariant Return Types

The benefits of using covariant return types include:

- **Improved Type Safety:** We can avoid unnecessary casts when calling methods, which reduces the risk of runtime type errors.

- **Semantics:** Covariant return types allow methods to clearly specify the more specific type they return, making it more evident to developers what to expect.

Without covariant return types, we would need to use explicit casting every time we wanted a more derived type from a method. This would increase the risk of invalid casts, which could lead to runtime errors.

## Step 3: Understand the Limitations of Contravariant Parameter Types

Create a new class called `Banana` derived from `Fruit`:

```{code-cell}
class Banana : Fruit { }
```

Now, create a class called `BananaMixer`:

```{code-cell}
class BananaMixer
{
    public void Juice(Banana banana)
    {
        // Code to juice the banana.
    }
}
```

Attempting the following will result in an error:

```{code-cell}
:tags: [raises-exception]
class FruitMixer : BananaMixer
{
    public override void Juice(Fruit fruit)
    {
        // This is not allowed because C# does not support contravariant parameter types.
    }
}
```

Reflecting on this, contravariant parameter types could pose a risk to type safety. If we were allowed to pass in a broader type than what a method expects, we might inadvertently introduce bugs or unexpected behaviors. The method is designed to handle a specific type and might not know how to deal with a more generic one, potentially violating object-oriented principles like the Liskov Substitution Principle.

