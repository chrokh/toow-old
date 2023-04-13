(exceptions)=
# Exceptions (part 1)

```{warning}
Work in progress.
```

%- Unrecoverable states.
%- Try / catch.
%- Examples: NullReference, IndexOutOfRange, DivideByZero, StackOverflow, OutOfMemory, no internet connection, response timeout.
%- Some languages such as Java require that you declare all exceptions that a method can throw.
%- Erik Meijer: C# is less of an "honest language" since we don't declare exceptions and null in signatures.
%- [Documentation comments](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/documentation-comments#d35-exception).

%Q: Tips på vart kan jag fånga ett exception (dvs använda `try` och `catch`) i min kod?
%A: Hitta en metod som du har skrivit eller som redan finns i .NET som du använder (såsom t.ex. `Int32.Parse`) som kastar ett exception när någonting har blivit fel. Anropet till den metoden behöver göras inom ett `try`-block så att du också kan fånga ett eventuellt fel genom `catch` och välja vad du vill göra därefter.
%
%Q: Tips på vart kan jag kasta ett exception (dvs använda `throw`)?
%A: Hitta en metod (förslagsvis en konstruktor) där alla värden som går att skicka in i metoden (dvs alla värden av en parameters datatyp) inte är meningsfull input i det ni bygger. Om ni t.ex. har en Person-klass och inte vill tillåta att man instansierar en person utan namn så hade ni kunnat kasta ett exception (t.ex. ArgumentException) om någon försöker skapa ett personobjekt med en tom sträng som namn.
%
%Q: Är det meningsfullt att kasta och fånga på samma plats (dvs använda `throw` inom ett `try`-block)?.
%A: Nej, detta är inte hur exceptions är tänkta att användas. Använd istället selektion (dvs if, switch, etc) i denna typ av fall.
%
%Q: Behöver min kod både använda sig av try, catch och throw för att passera detta krav?
%A: Ja, men nyckelorden try och catch ska (som diskuterat ovan) inte användas på samma "plats" (tänk: metod) som vi också använder throw.
%
%Q: Om jag kastar ett exception så kommer programmet att krascha. Varför vill vi att programmet ska krascha?
%
%A: Vi vill inte att programmet ska krascha. Vi vill inte att exceptions ska "bubbla" upp hela vägen till slutanvändaren. Så varför använder vi exceptions? För att problemet uppstår inte alltid på en plats där vi vet också hur vi kan hantera problemet. Tänk på exceptions som "locally unrecoverable errors". Nyckeln är att förstå att vi använder exceptions när vi lokalt i den kontext vi befinner oss i omöjligen kan komma på hur vi ska "rädda" ett fel som har inträffat. Tänk t.ex. på exemplet vi tog innan med klassen Person. Under idéen om fail fast Links to an external site. så vill vi uppmärksamma problem så fort som vi upptäcker dem istället för att låtsas som om de inte finns och sedan långt senare försöka hantera de när de blivit mycket värre. Så om vi har en klass som modellerar personer och vi menar att det finns några krav på hur en persons namn måste vara utformat. Säg t.ex. att personen måste ha ett namn som är minst en bokstav långt. Om detta är vårt krav och om kostruktorn i klassen Person tar in en sträng som motsvarar personens namn så måste vi i konstruktion verifiera att namnet faktiskt uppfyller reglerna. Dvs kolla om längden är minst 1. Men vad gör vi om namnet vi har fått in i kostruktorn har längd 0, eller är null? Hur ska vi kunna veta vad vi ska använda för namn för den här instansen vi just nu håller på att skapa om vi inte har fått ett namn? Eftersom vårt krav är att alla personer alltid och under alla omständigheter måste ha ett namn så finns det ingenting annat vi kan göra än att krascha. Lokalt. Nu pratar vi alltså om att "kasta" ett exception.
%
%class Person
%{
%  public Person (string name)
%  {
%    if (name == null || name.Length < 1)
%      throw new ArgumentException("Name must be at least 1 character");
%  }
%}
%Men bara för att vi inte lokalt vet vad vi ska göra för att ta oss ut ur detta problem så betyder det inte att det inte finns någon annan som kan rädda oss ur situationen. Någon anropade ju konstruktorn för att skapa en instans av personklassen. Kanske vet den som anropade konstruktorn vart strängen kom ifrån och kanske vet den därmed hur vi får tag på en ny "bättre" sträng ifall det visade sig att den vi skickade inte uppfyllde kriterierna. Om strängen t.ex. kom ifrån användaren så skulle vi kunna fråga användaren om ett nytt värde. Det är alltså här "utanför" som vi "fångar" ett exception.
%
%try
%{
%  Person person = new Person(Console.ReadLine());
%}
%catch (ArgumentException)
%{
%  Console.WriteLine("Namnet måste innehålla minst 1 bokstav. Försök igen.");
%}
