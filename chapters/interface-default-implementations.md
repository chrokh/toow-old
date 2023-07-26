# Interface default implementations

Coming soon.

% - A form of multiple inheritance.
% - MUST REWRITE INTERFACES CHAPTER. Cannot say that interfaces don't support concrete implementations.

%```{code-cell}
%IAnimal animal = new Cat();
%animal.Speak();
%
%IOther other = new Cat();
%other.Speak();
%
%//Cat cat = new Cat();
%//cat.Speak();
%
%class Cat : IAnimal, IOther
%{
%    public string Name { get; set; } = "Unnamed";
%    //public void Speak() => Console.WriteLine($"Cat {Name} is speaking.");
%}
%
%interface IAnimal
%{
%    string Name { get; set; }
%    void Speak()
%        => Console.WriteLine($"Animal {Name} is speaking.");
%}
%
%interface IOther
%{
%    void Speak()
%        => Console.WriteLine("Base is speaking.");
%}
%```
