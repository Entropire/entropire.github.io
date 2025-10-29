---
title: "SimpleCommands"
description: "A C# library that adds a dynamic command interface to your project."
image: "Img/SimpleCommands/SimpleCommands.png"
links: [
    {name: "Github", url: "https://github.com/Entropire/SimpleCommands"}
]
tags:
    Language: ["C#"]
    Year: ["2025"]
date: "2023-09-01"
---

![Example GIF](./Img/SimpleCommands/Example.gif)

## Description
I created this project because I found myself rewriting a command interface in multiple c# projects.
So to stop myself from reinventing the wheel and to save time, I decided to build a reusable command system that I could use in all my project where I needed it.
The goal of this project was to create a lightweight, easy-to-use library that provides a flexible way to define, register and trigger commands.
And publish it as a NuGet package for convenient reuse that u can install here//insert link.

## Core Features
- Define commands with ease
- Register and deregister commands dynamically
- Switch between command handlers effortlessly
- Trigger commands based on user input

## Outcome
The end result of the project is a library that allows you to define, register, deregister and class commands on rune time.

## Command Definition
You can create and register a command dynamically either using a class or a lambda expression.

For example, you can create a command with a dedicated class:
```cs
[CommandName("eco")]
public class EcoCommand : Command { ... }

_handler.RegisterCommand(EcoCommand);
```

Or define one inline using a lambda:
```cs
_handler.RegisterCommand("Hello", (args, name) => Console.WriteLine("Hello"));
```

## Command Storage
Commands are stored in a dictionary for fast lookup and to ensure that no two commands share the same name
```cs
private Dictionary<string, Action<string, string[]>> dictionaryOfCommands = new(StringComparer.OrdinalIgnoreCase);
```

## Command Calling
Commands can be executed simply by passing a user input string to the handler:
```cs
string userInput = "/eco helloworld"
_handler.Execute(userInput);
``` 
In the background the input string is automatically split into the command name and its arguments,
and the command corresponding to the command name is executed. 

For example, the input ```"/eco helloworld"``` would be parsed into:
- Command Name: ```"eco"```
- Arguments: ```"["helloworld"]"``` 

This makes it easy to handle user input without manually parsing string every time and ensures that the user inputs is always parsed in the same way.

## Reflection
Working on SimpleCommands helped me think carefully about modular and reusable library design.
I learned how to create a flexible API that supports both class-based and inline commands, and how to handle user input consistently with minimal boilerplate.
I also learned how to publish a C# library on NuGet, making it easier to share and reuse across different projects.

If I were to continue developing this library, I’d like to add async command support, 
improve error handling and logging, 
and explore ways to extend the command parser for more complex input patterns.