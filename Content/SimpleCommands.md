---
title: "SimpleCommands"
description: "A lightweight command interface for fast prototyping in C# with commands"
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
I built this API to speed up my workflow when making small CLI tools or prototypes.
It it allows registering commands via class inharitance or lambda expressions.
It also makes it easy to switch between command handlers so you can change active command easily.

## Features
- Command registration and execution system  
- Support for commands via class inheritance or lambda expressions  
- Command handler system for managing multiple sets of commands  
- Easy execution of commands by name via a unified interface  

## Commands
A command is an order given to a computer program that performs a specific action via a command-line interface (CLI).
Commands can be created with one of two ways.

1. By extending from the **Command** class:
```cs
class GreetCommand : Command
{
    public override void Execute(string[] args)
    {
        Console.WriteLine($"Hello, {args[0]}!");
    }
}
```
//Creates a class that inherits from **Command** and prints `Hello, [the user's first arg]!` to the console when executed.

2. By using a lambda expression:
```cs
handler.Register("greet", args => {
    Console.WriteLine($"Hello, {args[0]}!"); 
});
```
//Creates a command lambda expression that prints `Hello, [the user's first arg]!` to the console when executed.

### Command Name
Command names are the names that you enter in a command line interface or a console to execute the code linked to that name.
There are two ways to link a command to a name:

1. By adding the **CommandName** attribute to your command class:
```cs
[CommandName("greet")]
class GreetCommand : Command
{
    public override void Execute(string[] args)
    {
        Console.WriteLine($"Hello, {args[0]}!");
    }
}
```
//Creates a class that inherits from **Command** where the command name is set with the **CommandName** attribute.

2. By setting the command name while registering your command:
```cs
handler.Register("greet", new GreetCommand());
```
//Registers a command where the name of the command is set as a parameter of the **Register** function.

## CommandHandler
A command handler is a registry that manages all registered commands and routes execution to the correct one.
You can create a new command handler by instantiating a new one:
```cs
CommandHandler handler = new CommandHandler();
```
//Creates a new **CommandHandler** instance.

To register commands call the **Register** function:
```cs
handler.Register(new GreetCommand());
```
//Registers the **GreetCommand** where the name is set in the class with the **CommandName** attribute.

To unregister commands call the **Unregister** function:
```cs
handler.Unregister(new GreetCommand());
```
//Unregisters the **GreetCommand**.

To execute a command call the **Execute** function:
```cs
handler.Execute("greet", "helloworld");
```
//Executes the command linked to the `greet` keyword.