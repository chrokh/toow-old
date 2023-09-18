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

# Variant delegates

```{warning}
Work in progress.
```

% Probably the simplest way to explain variance concretely.

% NOTE: WHEN DO WE NEED TO EXPLICITLY USE in AND out? Why does it not always work? Why does it work sometimes? THE ISSUE IS 'ASSIGNING ONE DELEGATE TO ANOTHER'!! Very bad example:
%```{code-cell}
%void OldHandler (object sender, EventArgs a) { }
%void NewHandler(object sender, MyEventArgs a) { }
%void GeneralHandler(object sender, object a) { }
%
%EventHandler2<MyEventArgs> myHandler = NewHandler;
%EventHandler2<EventArgs> newHandler = OldHandler;
%EventHandler2<object> generalHandler = GeneralHandler;
%
%// These do not work without `in T`.
%myHandler = newHandler;
%myHandler = generalHandler;
%newHandler = generalHandler;
%
%Publisher pub = new Publisher();
%// These work without `in T`.
%pub.Happened += OldHandler;
%pub.Happened += NewHandler;
%pub.Happened += GeneralHandler;
%
%class MyEventArgs : EventArgs { }
%
%public delegate void EventHandler2<in T>(object sender, T e);
%
%class Publisher
%{
%    public event EventHandler2<MyEventArgs> Happened;
%}
%```

%Methods don't have to match the type of a delegate *exactly* in order to be considered members.
%Like we learned in the chapter on [variance](variance), input types can be contravariant, and output types can be covariant.
%
%This means that a delegate type that expects values of type `Cat` and produces values of type `Animal` also would consider a method that takes `Animal` (because of contravariance in input types) and produces values of type `Cat` (because of covariance in output types) a member of the type defined by the delegate.
%Why does this work?
%Well, because the method is a member of a subtype of the delegate.
%Refer back to the chapter on the [Liskov substitution principle](liskov-substitution-principle) if this doesn't feel intuitive.
%
%```{code-cell} csharp
%class Animal {}                       // Supertype
%class Cat : Animal {}                 // Subtype
%delegate Animal MyDelegate (Cat cat); // Delegate type
%Cat MyMethod (Animal a) => new Cat(); // Some method
%MyDelegate op = MyMethod;             // Method is member of the delegate type
%```

