# Fragile base class problem

%- Fragile base class. Example: Abstract class Shape which defines a Scale method that multiplies width and height with factor. This breaks if a subclass of Shape like Circle changes both Width and Height in response to a change in one of them.

% TODO: Fragile base class is a great motivation for when you can use `protected`. I've made a todo note about fragile base class somewhere else already. Think: Rectangle, Square, and a public method Scale that fails to work if Square.Width changes both width and height.
