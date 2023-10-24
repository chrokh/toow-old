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

# Solution: Delegates

## Step 1: Defining the Delegate

Since a delegate is a type, we need to define it somewhere where types can be defined. Such as as a member of a class, or directly in a namespace.

```csharp
delegate void WeaponAction();
```

## Step 2: Refactor the Weapon Classes

```csharp
void SwordAction()
    => Console.WriteLine("Swinging the sword!");

void BowAction()
    => Console.WriteLine("Shooting an arrow!");

void AxeAction()
    => Console.WriteLine("Striking with the axe!");
}
```

## Step 3: Refactor the Character Class

```csharp [3]
public class Character
{
    private WeaponAction weaponAction;

    public Character(WeaponAction action)
        => this.weaponAction = action;

    public void Attack()
        => weaponAction();
}
```

**Reflection:** The use of delegates has removed the need for separate concrete implementations (`Sword`, `Bow`, and `Axe`) and the interface `IWeaponBehavior`. The behavior is now passed directly as a method, making the code more concise. However, it's important to note that this might be more intuitive for simple behaviors, but can become complex if the behaviors need to maintain state or need more structure.

## Challenge:

Adding the `MagicWand` behavior.

```csharp
void MagicWandAction()
    => Console.WriteLine("Casting a spell!");

Character mage = new Character(MagicWandAction);
mage.Attack();
```

**Reflection:**
- **Pros of delegate-based approach:**
  1. **Conciseness:** No need for multiple concrete implementations or interfaces.
  2. **Flexibility:** New behaviors can be added on-the-fly as methods, without requiring structural changes.
  3. **Intuitiveness:** Behaviors are directly associated as methods, simplifying the relationship.

- **Cons of delegate-based approach:**
  1. **Scalability:** If behaviors require more complex structures or need to maintain states, this approach might become hard to manage.
  2. **Discoverability:** With the Strategy pattern, the relationship and the types of strategies available are clearly laid out. With delegates, one might need to search through the codebase to identify all behaviors.

- **Pros of Strategy pattern:**
  1. **Structure:** Clearly defined interfaces and implementations provide a clean structure.
  2. **Maintainability:** Easier to expand on individual behaviors or add additional methods to the strategy interface.

- **Cons of Strategy pattern:**
  1. **Verbosity:** Requires more boilerplate code for every new behavior.

In conclusion, the choice between delegates and the Strategy pattern will depend on the complexity of the behaviors and the design objectives of the application. Both approaches have their merits and are suitable for different scenarios.


