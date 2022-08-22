# TODO

- General
  - Links to official documentation like in the [Type Systems](type-systems) chapter?
- Data types
  - Should discuss Reflection?
  - Expand discussion in Data Types chapter on why treating Nullable warnings as errors is a good idea and that this should be the default.
  - Have I emphasized the importance of null reference static analysis enough?
- Compilation
  - Compiler warnings in Compilation chapter.
- General
  - Reintroduce error code in prefix of printed errors.
  - There is no information on what "keyword" means.
- Sets
  - Perhaps "business objects" is a poor choice of words.
- Variables
  - Variables chapter missing image placeholders.
- Type-checking
  - More about Type Safety. How even addings strings and ints is type safe in some languages. It all depends.
    - Makes more sense if we divide it into compile-time type safety and run-time type safety. This makes the concept of unsafe much more sensible. It also makes the concept of uni-typed much more sensible since we can talk about compile-time uni-typed and run-time uni-typed. Not sure what compile-time poly-typed + run-time uni-typed would mean though.
    - https://en.wikipedia.org/wiki/Type_system#Type_safety_and_memory_safety
    - https://web.archive.org/web/20211218122334/http://www.pl-enthusiast.net/2014/08/05/type-safety/
    - https://web.archive.org/web/20211124135419/http://www.pl-enthusiast.net/2014/07/21/memory-safety/
    - https://en.wikipedia.org/wiki/Type_safety
    % Det korta svaret ang type safe är att ett språk som är type safe garanterar att alla program skrivna i språket är semantiskt väldefinierade. Om man t.ex. deklarerar en variabel utan att tilldela den ett värde och sen försöker använda den i C# (statiskt typat) så får man ett kompileringsfel. Om man gör samma sak i t.ex. Python eller Ruby (dynamiskt typat) så får man ett exception. Oavsett om det är ett run-time eller ett compile-time fel så är det ett språk som definierats av språket i förhand. Om det inte finns en definition i språket så är det programmet inte väldefinierat och detta
- Type systems
  - Strong vs weak
- Labs
  - Brute-force hangman. Computer does guessing. You input how long the word should be and the program already has a word list stored.
  - Smart hangman. Like simple hangman but guessing computer uses word list and probability theory to make the best guesses.
