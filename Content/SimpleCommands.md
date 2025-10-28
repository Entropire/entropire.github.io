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

## Commands Registry
For the regestring of the command i used a disctonary whare the key is the name of the command and the value is the action connected to it.
I used the `StringComparer.OrdinalIgnoreCase` paramater for the initiation of the dictonary to make it case insansitive. This make it so that "hi" and "Hi" execute the same command. 
```cs
public class CommandRegistry
{
    private Dictionary<string, Action<string, string[]>> dictionaryOfCommands = new(StringComparer.OrdinalIgnoreCase);

    public void RegisterCommand(Action<string, string[]> commandAction, params string[] commandNames)
    {
        foreach (string commandName in commandNames)
        {
            if (!dictionaryOfCommands.ContainsKey(commandName))
            {
                dictionaryOfCommands.Add(commandName, commandAction);
            }
            else
            {
                throw new InvalidOperationException($"Command '{commandName}' already exists.");
            }
        }
    }

    public void RegisterCommand(Command command)
    {
        RegisterCommand(command.Execute, command.CommandNames);
    }

    public void UnregisterCommand(string commandName)
    {
        if (dictionaryOfCommands.ContainsKey(commandName))
        {
             dictionaryOfCommands.Remove(commandName);
        }
        else
        {
             throw new InvalidOperationException($"The command '{commandName}' does not exist.");
        }
    }

    public bool TryGetCommand(string commandName, out Action<string, string[]>? commandAction)
        => dictionaryOfCommands.TryGetValue(commandName, out commandAction);
}
```

## User Input
To make sure the user input is correctly used for executing commands i made a helper class that takes in a user input string and if it is a command returns the command name and its args.
```cs
internal class CommandInputParser
{
    ublic string CommandPrefix { get; private set; }

    public CommandInputParser(string commandPrefix = "/")
    {
        CommandPrefix = commandPrefix;
     }

     public void SetPrefix(string commandPrefix)
      {
         CommandPrefix = commandPrefix;
     } 

    public bool TryParseUserInput(string userInput, out string commandName, out string[] commandArgs)
    {
         commandName = string.Empty;
        commandArgs = Array.Empty<string>();

        if (string.IsNullOrWhiteSpace(userInput) || !userInput.StartsWith(CommandPrefix))
            return false;

        string[] parts = userInput.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        commandName = parts[0].Substring(CommandPrefix.Length);
        commandArgs = parts.Skip(1).ToArray();
        return true;
    }
}
```

## Command Handler
Then I combined the **CommandRegistry** and the **CommandInputParser** to make the CommandHanlder class to have one central point for handling commands.
```cs 
public class CommandHandler
{
    private CommandRegistry _commandRegistry;
    private CommandInputParser _commandInputParser;

    public CommandHandler(string commandPrefix)
    {
        _commandRegistry = new CommandRegistry();
        _commandInputParser = new CommandInputParser(commandPrefix);
    }

    public void RegisterCommand(Action<string, string[]> commandAction, params string[] commandNames) 
        => _commandRegistry.RegisterCommand(commandAction, commandNames);

    public void RegisterCommand(Command command) => _commandRegistry.RegisterCommand(command);

    public void UnregisterCommand(string commanName) => _commandRegistry.UnregisterCommand(commanName);

    public void Execute(string name, string[] args)
    {
        if (!_commandRegistry.TryGetCommand(name, out Action<string, string[]>? commandAction))
        {
            return;   
        }

        commandAction?.Invoke(name, args);
    } 

    public void Execute(string userInput)
    {
        if (!_commandInputParser.TryParseUserInput(userInput, out string commandName, out string[] commandArgs))
        {
            return;
        }

        Execute(commandName, commandArgs);
    }
}
```

## Commands
For the commands self I made a **Command** the inforces that every clas the inharets from it must contain a execute function and a CommandNameAttribute.
```cs
public abstract class Command
{
    public string[] CommandNames { get; private set; }

    protected Command()
    {
      var commandNameAttribute = GetType().GetCustomAttribute<CommandNameAttribute>();

        if (commandNameAttribute == null)
        {
            throw new InvalidOperationException($"Class '{GetType().FullName}' must have a [CommandName] attribute.");
        }

        CommandNames = commandNameAttribute.CommandNames;
    }

    public abstract void Execute(string commandName, string[] commandArgs);
}
```

## CommandNameAttribute
The CommandNameAttribute is a custom attribute for settings the name of the command in a Command class
```cs
[AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = true)]
public class CommandNameAttribute : Attribute
{
    public string[] CommandNames { get; private set; }

    public CommandNameAttribute(params string[] commandNames)
    {
      CommandNames = commandNames;
    }
}
```