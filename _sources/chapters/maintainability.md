# Maintainability

What makes a piece of software good? Sure, it solves a problem. It does what it's supposed to do. But a truly good piece of software is much more than just its functionality. It's about how easy it is to change, adapt, and improve over time. It's about how long it takes to find and fix a bug. It's about how easily new features can be added or existing features can be improved. These qualities are all parts of a concept we call 'maintainability'.

```{admonition} important
How do we provide value today without compromising our ability to provide value in the future?
```

In today's fast-paced world maintainability is a crucial consideration. Mark Zuckerberg, CEO of Meta (formerly Facebook), famously said, "unless you are breaking stuff, you are not moving fast enough". This mantra captures the ethos of contemporary software development - it is a never-ending cycle of evolution and adaptation to new requirements.
To remain in business we have to adapt.
Only the fittest will survive.

%Allegedly, the phrase, is no longer used as a motto at Meta.
%However, it speaks volumes as to how fast you need to move if you want to eat the competition rather than be eaten.

This shift in paradigm has reshaped our understanding of software. Rather than a static product, software has transformed into a dynamic service, continually rewritten to meet the shifting needs of the customer base and stay ahead of the competition.

% TODO: Replace source with real source.
```{epigraph}
The software isn’t finished until the last user is dead.

-- Sidney Markowitz
%[[Source needed](https://maximilianocontieri.com/software-engineering-great-quotes)]
```

What's worse is that it is surprisingly difficult to figure out what we should even build in the first place. This is perhaps best explained by the classic 'tree swing cartoon' which has been circulating in various versions since the 60's.
Knowing what to build is often a much harder problem than actually building it.

```{figure} ../images/tree-swing-cartoon.jpg

Different people tend to have very different things in mind when describing and building a product. [[Image source]](https://gobackandthrive.wordpress.com/2018/07/08/what-the-customer-wanted/)
```

%Think of it this way.
%Software is more like a service, and less like a product.
%We have to keep rewriting and rewriting to meet the ever-changing needs of our ever-changing customer-base in order to stay ahead of our ever-changing competition.
%You don't write a piece of software and then ship it.
%That model died when the internet became mainstream.

Before the advent of agile software development methods, there was a common belief that the cost of change in software development exponentially increased over time.
The bigger the project, the more elements it had, the more difficult - and thus, costly - it was to maintain and adapt.
More stuff equals more problems equals lower speed.

It's like the perfect storm.
We have to keep rewriting our software to stay in business, but everytime we rewrite it, it becomes harder and harder to change.

However, agile methodologies, like eXtreme Programming (XP) proposed by Kent Beck, have challenged this notion. Agile methods promote short development cycles, continuous feedback, and code that is written to facilitate future changes. These practices help to flatten the 'cost of change' curve, making modifications less costly over time.

%By shipping our software as soon as possible and as often as possible we get the benefit of feedback as soon as possible.
%This idea of releasing early and often is made possibly, partly, by writing software in a way that doesn't require that we rewrite the whole system from scratch every time we're faced with a tiny change request.

```{figure} ../images/cost-of-change-curves.jpg

Before the advent of agile software development methods it was commonly believed that the cost of change exponentially increases with time (see solid line).
Authors of some agile methods such as Kent Beck of eXtreme Programming aruged that the cost of change curve can be flattened out (see dashed line).
The truth probably lies somewhere in between (see purple line).
[[Image source]](https://www.researchgate.net/publication/312564218_Impact_of_Requirements_Elicitation_Processes_on_Success_of_Information_System_Development_Projects/)
```

%Maintainability is not just about how easily we can change code but also how we structure it. Interdependencies or coupling between modules can exponentially increase the complexity of changes. By diligently [refactoring](refactoring) code to reduce such coupling, we enhance its maintainability and can better manage the cost of changes.

There are many ways to address move fast in the face of uncertainty, but improving maintainability by focusing on how we write code quality certainly is one.
How we write our code determines how difficult it is to rewrite it.
%However, software quality is certainly one of the ingredients that determine whether we move fast or slow.
%So, if half the game is to be able to rewrite our code as quickly as possible then software quality ought to be immensely important.

```{important}
How we write our code determines how difficult it is to change.
```

All these considerations underscore the importance of maintainability in modern software development. While we could have focused solely on the 'changeability' of software, this would not be a broad enough view. A well-architected piece of software also needs to be testable to verify and validate its functionality.

Maintainability, therefore, encompasses a broader set of qualities. As per the standards document ISO/IEC 25010:2011, software maintainability is characterized by:

- Modularity
- Reusability
- Analysability
- Modifiability
- Testability

In the sections that follow, we will briefly explain each of these facets.
In later chapters we will show different techniques to employ and principles to follow in order to improve these facets.
%demonstrating how each contributes to creating adaptable, efficient, and high-quality software.

```{admonition} Key point
To provide value today without compromising our ability to provide more value in the future, we must focus on maintainability which can be understood as: modularity, reusability, analysability, modifiability, and testability.
```

%The core problem that makes software difficult to change is known as [coupling](coupling).
%This is a root of much evil that causes the cost of change to grow exponentially.
%We'll talk about coupling in its own chapter but in short the problem is this:
%If all modules are connected to eachother, then everytime we add another module, the number of connections exponentially increases.
%If however, we diligently [refactor](refactoring) to reduce coupling, so that any given module is connected to as few other modules as possible, we improve maintainability and in theory we will be able to "flatten" out the cost of change curve.

% TODO: Coupling figure here.

%What would software that supports the fast iterations of agile methods look like?
%Well, I hold that such software is best described as being "maintainable".
%We could have focused on the word "changeable" rather than "maintainable", but that word isn't broad enough.
%Software architecture cannot just merely solve for changeability.
%In order to, for example, [verify](verification) and [validate](validation) that the code actually meets the [requirements](requirements) it must also be testable.

%In summary, we are now talking about maintainability because there's a fundamental need for being able to change our programs.

% TODO: MUST TALK MORE ABOUT Premature abstraction!?

% TODO: What about the other characteristics from here: https://en.wikipedia.org/wiki/Software_design#Design_considerations

%And so we find ourselves staring at the word "maintainability" wondering what it actually means.
%Lucky for us, the standards document ISO/IEC 25010:2011 has defined "maintainability" in the context of software as being comprised of the following five characteristics.
%
%1. Modularity
%2. Reusability
%3. Analysability
%4. Modifiability
%5. Testability
%
%We will now dissect the characteristics one by one.


(modularity)=
### Modularity

```{epigraph}
Degree to which a system or computer program is composed of discrete components such that a change to one component has minimal impact on other components.

-- ISO/IEC 25010:2011
```
If we want to change something in a specific part of our code base, how many other areas do we need to adjust for this change to occur?
This is the question that modularity deals with.

In essence, modularity manages software complexity by breaking it down into distinct, loosely coupled components. This design approach allows developers to modify or update a specific part of the system without causing the need for widespread changes, fostering more efficient and less error-prone adaptations.

Conversely, software that lacks modularity and is tightly coupled presents challenges when changes need to be implemented. In such instances, modifications can trigger ripple effects across the system, demanding alterations in multiple areas. This interconnectedness can result in increased time, cost, and the potential for errors.


%When your code is [tightly coupled](coupling) and monolithic we have to change code in many different places as soon as we want to make a change.
%When code is loosely coupled and modular then a change requires us to change code in very few places.

%How to achieve modularity will be explored in coming chapters. Essentially however, it surrounds building simple, standalone components which can be composed in order to solve complex problems.

%but here are a few quick notes with forward references.
%By following the [single responsibility principle](single-responsibility-principle) and the [interface segregation principle](interface-segregation-principle) we avoid putting too many concerns in a single place and organize our code based on "reasons to change".
%By following the [open-closed principle](open-closed-principle) and the [dependency inversion principle](dependency-inversion-principle) we make it possibly to mostly having to *add* code rather than *change* code whenever we want to change the behavior of the system.



(reusability)=
### Reusability

```{epigraph}
Degree to which an asset can be used in more than one system, or in building other assets.

-- ISO/IEC 25010:2011
```

A high level of modularity does not automatically imply high reusability. If code is not being reused despite its modularity, there may be underlying issues such as code duplication. Ideally, we should strive for fundamental abstractions that enable us to build systems from as few unique components as possible.

%The choice of the word "system" in the quote above is, in my view, quite unfortunate.
%One might read "another system" as meaning "another product".

%What is the point of modularity without reusability?
%In such a case I would guess that we're still duplicating code.
%Possibly without realizing it.
%Think about it.
%Is modularity even useful if we don't have reusability?
%Isn't the idea to strive for fundamental abstractions so that we can build our systems from as few abstractions as possible?

However, reusability should not be viewed as an end in itself, but rather as a tool. It needs to be economically justifiable; we should aim for reusability when it aligns with the actual reuse potential.
Striving to make our software solve problems we don't yet need to solve is, arguably, a strategy that will put us out of business.

In software development, the term "premature abstraction" captures the pitfalls of generalizing code too early, before the full scope of problems to be solved becomes clear.
%This saying captures the problem of generalizing code before we have sufficient information to determine what problems we actually will need to solve.

This idea has parallels in business.
Authors like John Warrillow (see "[Built to sell](https://geni.us/lXIc)" argue that businesses should develop robust systems for selling a few products or services before branching out into new verticals (which would require an even broader system). For software developers, this suggests a focus on solving current, known problems instead of designing for hypothetical future scenarios.
What is the point of solving future problems if we can't stay in business by solving our current ones?

%``{figure} https://m.media-amazon.com/images/I/51uaWR-TlbL._AC_SY780_.jpg
%:figclass: margin
%:width: 140px
%
%[Built to sell, by John Warrillow](https://geni.us/lXIc).
%``

%For us as software developers, this means that we should refrain from thinking too much about how the code that we write now could be used to solve problems in the future, that we don't yet know if we will face.
%What does it matter that we have software that can solve problems in the future if we our lack of solutions to the problems that we have now take us out of business?

%In my reading, we should, in the context of maintainability, interpret "reusability" as possible reusability right now or in the immediate future.
%However, the cost-benefit analysis of possible reuse in the future is not always straight-forward.
%It ought to go something like this:
%
%The cost of developing an abstraction now must be lower than the present value of the cost of developing that abstraction in the future, multiplied by the probability that we need that abstraction in the first place.
%
%I'm by no means suggesting that we actually ever do this calculation.
%I'm suggesting that when we reason about whether to get out and hunt for an abstraction, our reasoning should follow those general lines.
%The formula is obviously too simplistic.
%For one it doesn't take into account the possible immediate benefits of reusing the abstraction for other purposes now.
%
%However, when we reason about reuse in the immediate future, the value of being able to reuse a given asset minus the cost of having to write it in a more general way now, must be greater than the cost of simply writing that code later.
%
%``{epigraph}
%A sparrow in thy hand is better than a thousand sparrows flying.
%
%-- Ancient proverb.
%``
%
%``{seealso}
%If you're intrigued by this line of economic reasoning I would recommend that you look into the concept of the [time value of money](https://en.wikipedia.org/wiki/Time_value_of_money).
%This will lead you to understand how to do [Present Value (PV)](https://en.wikipedia.org/wiki/Present_value) calculations which hopefully will forever change how you think about how we should spend our time writing code.
%I also happen to have an informal (albeit old) [video](https://youtu.be/c3kUElWSu5Y) on this topic.
%``

% TODO: Reintroduce this?
%Language Integrated Queries ([LINQ](linq)) is a great feature in the .NET framework which I think serves as a great example of high reusability.
%It's not just about the code being modular in the sense of being isolated from cascading change.
%It's also about being able to use the same code to solve a wide array of potential problems.

%When I did my Ph.D., my supervisor used advise me to: "stick your head in as few guillotines as possible" when writing research papers.
%With this he meant, say as little as you can, because the more you say, the more risk of error you introduce.
%I think this is great advice.
%Do few things, and do them with utter excellence.
%But, make sure that the things you do are so useful that they can be used for lots of other different things.

% TODO: Reintroduce this?
%``{seealso}
%Another prime example of building a small set of small but enormously reusable combinators is the classic work of Simon Peyton Jones {cite:p}`peytonJonesEtAl2000` on the composition of financial contracts.
%Whenever you start dipping your toes in functional programming I highly recommend that you put this research paper on your todo list.
%There's also a [video recording](https://www.youtube.com/watch?v=b0zFmWsnoV0) available online of a presentation Simon Peyton Jones did back in 2008.
%``

%But remember, reusability is a means, not an end.
%Reusability, only for the sake of reusability is not economically justifiable.
%We must strive for reusability only when it makes sense to actually reuse.

% TODO: My thesis? Showed that this can be applied to policy interventions.


(analysability)=
### Analysability

```{epigraph}
Degree of effectiveness and efficiency with which it is possible to assess the impact on a product or system of an intended change to one or more of its parts, or to diagnose a product for deficiencies or causes of failures, or to identify parts to be modified.

-- ISO/IEC 25010:2011
```

When writing code, think of it as a real-world model. The more straightforward your abstractions and the fewer you have, the simpler it is to reason about your model. Note the emphasis on "simplicity" over "size" – small code is not always easy to analyze, but simple code is.


The goal should be for software components to be modular, reusable, and analysable, not just small. This is where the concept of 'code golf', a programming competition where the goal is to solve problems with the smallest possible source code, falls short. While these solutions may be concise, they are practically indecipherable to humans and thus not analyzable.

"Why would I need to analyse my code?" you might ask. "If I write it correctly the first time around, there's no need for analysability." This mindset overlooks the complex nature of software development, which often involves incrementally building upon code and adjusting for unforeseen issues. Remember, survival of the fittest.

```{tip}
%It's wise to write code under the assumption that we might get something wrong.
Write code under the assumption that we will get it wrong.
% the first time.
```

Unreadable code becomes a liability when changes are required – it may need to be rewritten from scratch, or a significant amount of time must be invested in examining it line by line, or even character by character.
When we write unreadable code, we say that we are incurring 'technical debt'. Just like monetary debt, we will at some point have to pay our dues.

Analysability should be a priority for any piece of code that we wouldn't be willing to discard and rewrite from scratch for minor changes or bug fixes. This doesn't mean that every level of a system must be equally analysable. However, if we're not ready to throw it away, it should be analysable.

%``{important}
%Software must be analysable at all levels of abstraction that we are unwilling to throw out and rewrite from scratch whenever the smallest possible change is required.
%``

%TODO: What did I mean here?
%Sometimes we just want to give something a name, and stick some complex (but limited) logic behind that name, so that we don't have to think about it too much in the future.
%In design patterns lingo some might call this a [Facade](facade-pattern).

%In other words, it isn't obvious to me that a system should be equally analysable at all levels.
%It might be reasonable to give up analysability for a piece of code that is so "small" that we would be willing to throw it out and rewrite it from scratch any time we have to solve a minor bug or change it some other trivial way.
%However, if we are not willing to throw it out, then the code ought to exhibit analysability.


(modifiability)=
### Modifiability

```{epigraph}
Degree to which a product or system can be effectively and efficiently modified without introducing defects or degrading existing product quality.

-- ISO/IEC 25010:2011
```

In a world where requirements change, technologies evolve, and businesses scale, software must adapt seamlessly to maintain its value. Modifiability ensures that software can be updated and adjusted without compromising its overall quality or functionality.

Design decisions made early in the software development cycle greatly impact future modifiability. Careful selection of programming languages, frameworks, and architectures can help create a foundation for modifiable software. Likewise, good programming practices, such as clear documentation, consistent coding standards, and extensive testing, facilitate later modifications.

Back to the same question: "Why would I need to change my code?". "If I write it correctly the first time around, there’s no need for modifiability." This is not how the real world works. To provide value, we have to adapt to the ever-changing environment.
Remember, it is wise to write code under the assumption that we'll get it wrong at least the first time.

However, a high degree of modifiability doesn't mean that changes should be made carelessly. Every modification comes with the risk of introducing new bugs or unexpected behaviors. For this reason, modifiability works hand-in-hand with other maintainability factors like analysability and testability. Analysability ensures that the impact of changes is understood before they are implemented, and testability allows those changes to be verified, ensuring they work as intended without introducing new issues.
%, forming a cycle of change and verification.

Modifiability is also inherently linked to the principles of reusability and modularity. Code that is written to be reusable tends to be more modular and abstract, which in turn allows for easy modifications with minimal impact on the overall system.

In summary, striving for modifiability is about striving for code that can be changed.
%and deploying code that can be changed.

%In summary, modifiability is not just about making changes to the code — it's about making changes that preserve the integrity of the software while accommodating new requirements or improvements. The goal is to ensure that the software remains robust, reliable, and relevant throughout its lifecycle.

%% TODO: THERE'S MORE TO THE DEFINITION THAN WHAT WE'RE DISCUSSING. THIS NEEDS TO BE EXPANDED.
%
%I never said that the standard is perfect did I?
%Since modularity is defined in terms of allowing modifications of one component without having an impact on other components it could be argued that the modifiability characteristic is quite superflous in the context of software quality.
%
%So let us instead reinforce how modularity enables modifiability.
%When we want to change something, do we have to do a massive rewrite or whether we execute our change in small chunks?
%Are you able to split your massive change into smaller changes that can be independently deployed to your live product?
%If not, then we might call that less modifiable.
%
%But why does the modifiability characteristic exist?
%Let's think about this beyond software quality.
%Let's think about process.
%
%Perhaps you are familiar with the agile ideas of continuous delivery and continuous deployment.
%The former meaning that we integrate all development code into the "mainline" as frequently as possible and as a consequence assemble deployable and tested versions.
%In continuous delivery the last step of deployment is also automatically executed.
%
%Naively, we could describe the process something like this.
%
%1. I complete work on a feature on my machine.
%2. I run local tests on my machine to make sure that my code works.
%3. I commit and push my code to our central repository.
%4. The code is automatically integrated with the rest of the system.
%5. The code is automatically tested together with the rest of the system.
%6. If there are no bugs then my code is automatically pushed/pulled and integrated into the publishable mainline.
%7. The code is published.
%
%``{note}
%If we do all steps up and to 4, we would say that we do "continuous integration".
%Up and to 5 we would call it "continuous testing".
%Up and to 6 we would call it "continuous delivery".
%Up and to 7 we would call it "continuous deployment".
%``
%
%This is an oversimplification, and this process might of course involve a number of other steps such as pull requests, code reviews, manual quality assurance, and so forth.
%Of course, that example has almost nothing to do with coding, and almost everything to do with what we usually call [DevOps](https://en.wikipedia.org/wiki/DevOps) (which is short for software development and IT operations).
%
%%Nevertheless, wouldn't you say that the modifiability of such a system needs to be quite high?
%
%So how does this relate to software?
%Well, if our code is not modular then it would be utterly difficult to support such a workflow with anything more than one developer on the team.
%To integrate and test at such a high pace and with such a level of automation, we need modularity.


(testability)=
### Testability

```{epigraph}
Degree of effectiveness and efficiency with which test criteria can be established for a system, product or component and tests can be performed to determine whether those criteria have been met.

-- ISO/IEC 25010:2011
```

To stay in business we need to rewrite our code quickly and often.
But every time we rewrite our code we also need to make sure that the code still works.
This is what our tests should tell us.

```{warning}
Changing code quickly without automated testing is an accident waiting to happen.
```

Highly testable software is a foundation for the long-term sustainability of any software project. Software that can be easily tested promotes confidence when changes are made, assists in identifying issues quickly, and ultimately ensures that the software works as expected.
Key characteristics of testable code include being deterministic, isolated, and observable.

*Deterministic:* Deterministic code is reliable and consistent in its behavior. Given the same inputs, it will always produce the same outputs, and it will not exhibit different behaviors in different runs or under different conditions. This predictability simplifies testing significantly because it means that any test we write today will still be valid tomorrow.

*Isolated:* Highly testable code is independent, or isolated, meaning that it can be tested without having to also test a lot of dependencies at the same time. This is important because it helps us narrow down where a problem might be when a test fails. Isolation can be achieved through techniques such as dependency injection, mocking, and designing for interfaces.

*Observable:* We must be able to observe what actually happens when the code is executed. This could be through returned results, changes in the state of the system, or observable effects. Observable code allows us to validate that our code is functioning as expected.

By striving for testability, we build software that is resilient to changes and more reliable for the end user.

%``{note}
%We're focusing on the second part of the "testability" definition since the first is mostly related to process, rather than code.
%Process is outside the scope of this book.
%``

%A key ingredient that enables the practice of continuous integration and continuous delivery/deployment is automated software testing.
%We've discussed this in some detail in the chapters on [validation](validation) and [verification](verification), but think of it this way:
%
%Ideally, every piece of code would be paired with another piece of code that exercises the first to make sure that it behaves the way it should.
%Every time we write code we must also write some other code that tests the code.
%If we for some reason refactor our code then our tests should tell us whether our refactoring has introduced bugs or not.
%
%```{warning}
%Deploying quickly without automated testing is an accident waiting to happen.
%```
%
%``{note}
%In the software development process called "test-driven development" (TDD), we flip the order and instead say that:
%Everytime we want to write some code we must first write a test that fails because that code doesn't exist.
%``

%So how do we make code testable?
%Code that is highly testable has clear inputs and outputs and does not have hidden dependencies.
%Usually it boils down to one thing: *isolation*.
%The ability to isolate a particular piece of code from other pieces of code and from external state allows us to express simple tests.
%
%The more concrete dependencies a component has, the more difficult it is to test since the state space of these dependencies may affect the state space of our first component.
%This is why, advanced concepts that we'll talk about later, such as [dependency inversion](dependency-inversion-principle) and [composition over inheritance](composition-over-inheritance) are so important.
%
%If a component that we want to test, itself creates other concrete components then we won't only have to test the constructing component but also the constructed components.
%If on the other hand a component only depends on injected abstractions then we only have to test how this particular component interacts with any given injected dependency without having to worry about which particular concrete dependency might be injected at run-time and what its states are.

%``{seealso}
%If you are interested in testability, and already know a tiny bit about testing, then I would highly recommend that you continue your exploration with the following videos:
%
%1. [How to Write Clean, Testable Code](https://youtu.be/XcT4yYu_TTs) by Miško Hevery.
%2. [Integrated tests are a scam](https://youtu.be/fhFa4tkFUFw) by J.B. Rainsberger.
%3. My own [brief summary](https://youtu.be/tbSml2iyDt4) of the original video on integrated tests being a scam.
%``

