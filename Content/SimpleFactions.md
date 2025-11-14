---
title: "SimpleFactions"
description: "A Minecraft pluging that adds team-based system to your world"
image: "Img/SimpleFactions/SimpleFactions.webp"
links: [
    {name: "Github", url: "https://github.com/Entropire/SimpleFactions/tree/V2.1.1"},
    {name: "Modrinth", url: "https://modrinth.com/plugin/simple-factions"}
]
tags:
    Language: ["Java"]
    Software: ["Sqlite"]
    Year: ["2022", "2023", "2024", "2025"]
date: "n/a"
---

![SimpleFactions Banner](Img/SimpleFactions/SimpleFactions_Banner.png)

## Description
I started this project because I wanted a system in Minecraft that could do more than the default system in Minecraft. I began with limited programming knowledge, but that didn’t stop me. After four years of on-and-off programming, multiple rewrites, and significant improvements in code quality, I created version 2.1. It has been installed 890 times, with all versions combined totaling 1,791 installations.

The main goals of this project were for players to be able to: 
- Create teams with a name and color
- Invite and join teams
- Manage their team more easily using a user-friendly UI
- Chat securaly in a faction only chat

## Core features
- Lightweight and plug-and-play
- Create, join, invite, and manage factions easily
- Faction-only and public chat modes
- UI-based interface for ease of use
- Zero configuration needed (defaults included)
- User-friendly UI intervace

## Managing teams
For managing factions and invites, I used SQLite because it provides fast lookups and does not require a dedicated database server.

To make the database easier to work with, I created a DataBaseContext class. 
This class is responsible for establishing a database connection and storing it for later use throughout the plugin.
```java
public class DataBaseContext
{
    private String path;
    public Connection con;
    
    // Constructor for the DataBaseContext class.
    // Takes the database file path and creates a connection immediately.
    public DataBaseContext(String path)
    {
        this.path = path;              
        con = CreateConnection();     
    }

    // Attempts to create and return a new SQLite database connection using the provided path.
    public Connection CreateConnection()
    {
        try
        {
            // Attempt to establish a connection to the SQLite database using JDBC.
            return DriverManager.getConnection("jdbc:sqlite:" + path);
        }
        catch (SQLException e)
        {
            // If connection fails, log an error message to the Minecraft server console.
            Bukkit.getServer().getConsoleSender().sendMessage(ChatColor.RED + "Failed to connect to the database: " + e.getMessage()
            );
            
            return null;
        }
    }
}
``` 

After setting up this context class, I created helper classes for each table in the database.
Each helper class handles the CRUD operations (Create, Read, Update, Delete) for its corresponding table, making the database layer more organized and easier to maintain.

You can find the database helper classes here:
[Database classes](https://github.com/Entropire/SimpleFactions/tree/V2.1.1/Simple_Factions/src/main/java/me/entropire/simple_factions/database)

## User interface
To make faction management easier for players, I created a custom user interface (GUI) system.

For this system, I started by making a Gui class that implements Paper’s InventoryHolder interface.
By doing this, I could easily identify whether an open inventory belonged to one of my plugin’s GUIs.

I also stored a map of buttons in each GUI.
This made it simple to check whether a player clicked one of the registered buttons and if so, which one.

With these two features combined, it became much harder for players to perform unintended or unauthorized actions inside a GUI.
```java
public class Gui implements InventoryHolder
{
    private final String name; // The name (title) of the GUI.
    private final int size;    // The inventory size (27 = small, 54 = large).
    private final Map<Integer, Button> buttons = new HashMap<>(); // Slot-to-button mapping.

    // Constructor that sets the GUI name and size based on a predefined GuiSize enum.
    public Gui(String name, GuiSize size)
    {
        this.name = name;
        this.size = size == GuiSize.Small ? 27 : 54;
    }

    // Required by the InventoryHolder interface, but not used directly here.
    @Override
    public Inventory getInventory() {
        return null;
    }

    // Adds a button to the GUI using a single-line lore.
    public void addButton(int slot, String name, Material material, String lore, ButtonPressAction action)
    {
        addButton(slot, name, material, Arrays.asList(lore), action);
    }

    // Adds a button to the GUI with custom name, material, lore, and click action.
    public void addButton(int slot, String name, Material material, List<String> lore, ButtonPressAction action)
    {
        Button button = new Button(material, action);
        ItemMeta buttonMeta = button.getItemMeta();
        buttonMeta.setDisplayName(name);
        buttonMeta.setLore(lore);
        button.setItemMeta(buttonMeta);

        // Store the button in the slot map for lookup when a player clicks it.
        buttons.put(slot, button);
    }

    // Returns the button located in a specific inventory slot.
    public Button getButton(int slot)
    {
        return buttons.get(slot);
    }

    // Builds the final Inventory object and fills it with all registered buttons.
    public Inventory create()
    {
        Inventory inventory = Bukkit.createInventory(this, size, name);

        for (int slot : buttons.keySet())
        {
            inventory.setItem(slot, buttons.get(slot));
        }

        return inventory;
    }
}
``` 

To simplify GUI creation, I made an abstract BaseGui class that all GUI implementations inherit from.
Each subclass can then define its own layout, buttons, and behavior when opened.

Here’s an example of one of those GUIs the main Simple Factions GUI:
```java 
public class SimpleFactionGui extends BaseGui
{
    @Override
    public void open(Player player)
    {
        Gui gui = new Gui("Simple-Factions", GuiSize.Small);

        // Button to create a new faction.
        gui.addButton(11, "Create", Material.ANVIL, "Create a new faction.",
                (btn, event) -> new CreateFactionGui().open(player));

        // Button to join an existing faction.
        gui.addButton(15, "Join", Material.NAME_TAG, "Join an existing faction.",
                (btn, event) -> new FactionListGui(1).open(player));

        // Open the inventory for the player.
        player.openInventory(gui.create());
    }
}
```

![Image of gui](Img/SimpleFactions/SimpleFactionsGUI.png)

## Reflection
I learned a lot from this project from managing my codebase and writing clean, scalable code to publishing versions and incorporating feedback from users.

Through this process, I gained a deeper understanding of how to structure larger projects, maintain readable code, and balance new features with stability and user experience.

The next step I’m taking with this project is to rewrite it once again to make it more modular. This will allow me to release it across multiple plugin platforms, rather than only the two I currently support.