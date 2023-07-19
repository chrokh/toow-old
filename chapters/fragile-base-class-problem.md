# Fragile base class problem

%- Fragile base class. Example: Abstract class Shape which defines a Scale method that multiplies width and height with factor. This breaks if a subclass of Shape like Circle changes both Width and Height in response to a change in one of them.
