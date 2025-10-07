---
title: "SimpleCommands"
description: "my SimpleCommands"
image: "Img/SimpleCommands/SimpleCommands.png"
tags:
  Status: ["Done"]
  Language: ["C#"]
  Software: []
  Type: ["Personal"]
date: "2023-09-01"
---

## Description 
`SimpleCommands` provides a lightweight framework to create, register, and execute commands dynamically in C#. Commands can be registered either as **lambda functions** or as **dedicated classes** inheriting from `Command` with a unique `[CommandName]` attribute.

## Usage
### 1. Create a CommandHandler
```csharp
CommandHandler handler = new CommandHandler();
```

### 2.1. Registering a Command with a Lambda

```csharp
handler.Register("greet", args =>
{
    Console.WriteLine($"Hello, {args[0]}!");
});
```

### 2.2. Registering a Command with a Command Class
```csharp
[CommandName("greet")]
class GoodbyeCommand : Command
{
    public override void Execute(string[] args)
    {
        Console.WriteLine($"Hello, {args[0]}!");
    }
}
```

### 3. Unregistering a Command
```csharp
handler.Unregister("greet");
```

### 3. Execute a Command
```csharp
handler.Execute("greet");
```

## Getting Started

Follow these steps to use `SimpleCommands` in your project.

1. Download the `SimpleCommands.dll` from the releases tab.  
2. Create a folder in your project called `Libs` (or any name you prefer) and place the `SimpleCommands.dll` there: `YourProjectFolder/Libs/SimpleCommands.dll`
3. Open your project in Visual Studio.  
4. Right-click on the project in **Solution Explorer** → **Add** → **Reference…**  
5. Click **Browse**, navigate to the DLL location, select `SimpleCommands.dll`, and click **OK**.

## License
```text
MIT License
 
Copyright (c) 2025 Entropire
 
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
  
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
```
