# Encapsulation

%To illustrate the concept of instance methods, let's use a robot vacuum as an example. Suppose we want to keep track of the robot's battery. We could add a field for this:
%
%```{code-cell}
%class RobotVacuum
%{
%    public double Battery = 100;
%}
%```
%
%Now, suppose that each time we have a robot instance:
%
%```{code-cell}
%RobotVacuum rob = new RobotVacuum();
%```
%
%and suppose that each time time the robot moves we want to reduce the remaining battery life. Without instance methods, we would have to update the `Battery` field directly each time we want to move our robot instance. It would look something like `rob.Battery -= 1`.
%
%However, this doesn't give the robot any control over how the update is done.
%We have to repeat the battery reducing calculation each time we want to move the robot.
%With instance methods, we can instead encapsulate the behavior and the data to make sure that it's done in the same way every time.
%We'll talk more about this in the chapter on [encapsulation](encapsulation), but it would look like this:
%
%```{code-cell}
%class RobotVacuum
%{
%    public double Battery = 100;
%
%    public void MoveForward()
%    {
%        Battery -= 1;
%    }
%}
%```
%
%Now we have an instance method, `MoveForward`, which reduces the battery each time it is called.
%This allows us to ensure that the battery is updated in a consistent way every time.
%
%We can use this method like so:
%
%```{code-cell}
%RobotVacuum rob = new RobotVacuum();
%
%rob.MoveForward();
%rob.MoveForward();
%rob.MoveForward();
%
%Console.WriteLine(rob.Battery);
%```
%
%The output show the remaining battery life after having moved the robot forward three times.
%
%What do we mean when we say that using an instance method allows updates to be done 'consistently'? Suppose that turning the robot reduces the battery by less than moving the robot.
%
%```{code-cell}
%class RobotVacuum
%{
%    public double Battery = 100;
%
%    public void MoveForward()
%    {
%        Battery--;
%    }
%
%    public void TurnRight()
%    {
%        Battery -= 0.25;
%    }
%
%    public void TurnLeft()
%    {
%        Battery -= 0.25;
%    }
%}
%```
%
%Keeping track of how much to reduce the battery each time we move or turn the robot is difficult if we do so in many places in our code.
%By instead letting the battery be reduced each time we call the `MoveForward`, `TurnLeft`, or `TurnRight` methods we can be sure that the battery will always be decreased by the appropriate amount.
%
%
%```{code-cell}
%RobotVacuum rob = new RobotVacuum();
%
%rob.MoveForward();
%rob.TurnRight();
%rob.MoveForward();
%rob.TurnLeft();
%rob.MoveForward();
%
%Console.WriteLine(rob.Battery);
%```
%
%This is a simple example, but it illustrates the basic concept. Instance methods allow us to define operations that work with an object's data. This leads to code that is easier to understand and maintain, since we can ensure that operations are performed in a consistent way.


%
%```{code-cell}
%class RobotVacuum
%{
%    double battery = 10;
%
%    public void MoveForward(int steps)
%    {
%        if (CanMove())
%        {
%            battery -= steps;
%            Console.WriteLine($"Moved forward {steps} steps. Remaining battery: {battery}");
%        }
%        else
%        {
%            Console.WriteLine("battery too low to move forward. Remaining battery: " + battery);
%        }
%    }
%
%    public void TurnRight()
%    {
%        if (CanMove())
%        {
%            battery -= 0.25;
%            Console.WriteLine("Turned right. Remaining battery: " + battery);
%        }
%        else
%        {
%            Console.WriteLine("Battery too low to turn right. Remaining battery: " + battery);
%        }
%    }
%
%    public void TurnLeft()
%    {
%        if (CanMove())
%        {
%            battery -= 0.25;
%            Console.WriteLine("Turned left. Remaining battery: " + battery);
%        }
%        else
%        {
%            Console.WriteLine("Battery too low to turn left. Remaining battery: " + battery);
%        }
%    }
%
%    private bool CanMove()
%    {
%        return battery > 5;
%    }
%}
%```
%
%```{code-cell}
%RobotVacuum rob = new RobotVacuum();
%rob.MoveForward(3);
%```



%## Private
%
%Let's say the robot has a private method for checking whether the battery level is critically low (say, below 5%) before moving. This method will not be accessible outside of the RobotVacuum class, hence we declare it as private.
%
%Here's a code snippet illustrating this:
%
%```{code-cell}
%class RobotVacuum
%{
%    public double Battery = 100;
%
%    public void MoveForward()
%    {
%        if (canMove())
%        {
%            Battery -= 1;
%            Console.WriteLine("Moved forward. Remaining battery: " + Battery);
%        }
%        else
%        {
%            Console.WriteLine("Battery too low to move forward. Remaining battery: " + Battery);
%        }
%    }
%
%    private bool canMove()
%        => Battery > 5;
%}
%```
%
%In this example, the `canMove` method is private and can only be called from within the RobotVacuum class. It's a helper method that encapsulates a specific functionality (checking if the robot can move) that is used by the public method MoveForward. It helps us to keep the public interface of our class clean and simple, and allows us to change the implementation of `canMove` without affecting any external code.
%
%```{code-cell}
%class RobotVacuum
%{
%    double battery = 10;
%
%    public void MoveForward(int steps)
%    {
%        if (CanMove())
%        {
%            battery -= steps;
%            Console.WriteLine($"Moved forward {steps} steps. Remaining battery: {battery}");
%        }
%        else
%        {
%            Console.WriteLine("battery too low to move forward. Remaining battery: " + battery);
%        }
%    }
%
%    public void TurnRight()
%    {
%        if (CanMove())
%        {
%            battery -= 0.25;
%            Console.WriteLine("Turned right. Remaining battery: " + battery);
%        }
%        else
%        {
%            Console.WriteLine("Battery too low to turn right. Remaining battery: " + battery);
%        }
%    }
%
%    public void TurnLeft()
%    {
%        if (CanMove())
%        {
%            battery -= 0.25;
%            Console.WriteLine("Turned left. Remaining battery: " + battery);
%        }
%        else
%        {
%            Console.WriteLine("Battery too low to turn left. Remaining battery: " + battery);
%        }
%    }
%
%    private bool CanMove()
%    {
%        return battery > 5;
%    }
%}
%```
%
%```{code-cell}
%RobotVacuum rob = new RobotVacuum();
%rob.MoveForward(3);
%```
%


%## Accessibility
%
%Recall that class members, including instance methods, can have different [access modifiers](access-modifiers). These modifiers control the accessibility of the method, that is, where it can be accessed from. A `public` instance method can be called from anywhere, while a `private` one can only be called from within the class itself. We will discuss the importance of this in the chapter on [encapsulation](encapsulation).
%
%To illustrate these concepts, let's revisit our `RobotVacuum` example. Suppose we have a `RobotVacuum` class that looks like this:
%
%```{code-cell}
%class RobotVacuum
%{
%    private double battery = 100;
%
%    public void MoveForward(int steps)
%    {
%        battery -= steps;
%    }
%
%    public double CheckBattery ()
%        => battery;
%}
%```
%
%We can instantiate a `RobotVacuum` object and call its `MoveForward` method, passing the number of `steps` as an argument. The `MoveForward` method uses the `this` keyword to reference the `battery` field of the current instance.
%
%```{code-cell}
%RobotVacuum rob = new RobotVacuum();
%
%rob.MoveForward(3);
%
%Console.WriteLine(rob.CheckBattery());  // This will output 97
%```
%
%The output shows the remaining battery life after having moved the robot forward three times.
%
%Let's add more movements:
%
%```{code-cell}
%rob.MoveForward(2);
%rob.MoveForward(5);
%
%Console.WriteLine(rob.CheckBattery());  // This will output 90
%```
%
%We also have a Charge method, which is private, meaning it can only be called within the RobotVacuum class. Attempting to call it outside of the class would result in a compiler error:
%
%```{code-cell}
%rob.Charge();  // This would result in a compiler error
%```
%
%Finally, our RobotVacuum class includes a CheckBattery method, which uses the "fat arrow" syntax. This is a concise way to write methods that consist of a single line of code:
%
%```{code-cell}
%Console.WriteLine(rob.CheckBattery());  // This will output 90
%```
%
%This simple example illustrates how instance methods can define operations that work with an object's data, accept parameters, use the this keyword, have different access modifiers, and use the "fat arrow" syntax. It gives a taste of the flexibility and power of instance methods in object-oriented programming.
