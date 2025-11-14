---
title: "TeamManager"
description: "A Discord bot that helps users form teams for a game jam"
image: "Img/TeamManager/TeamManager.png"
links: [
    {name: "Github", url: "https://github.com/Entropire/TeamManager"}
]
tags:
  Language: ["C#"]
  Software: ["Sqlite"]
  Year: ["2025"]
date: "2025-01-26"
---

## Description
I created this project for a game jam I hosted with [nora](https://noradegreeuw.dev). My role was to build a Discord bot to help participants register quickly and manage teams efficiently.

We also wanted participants to have the option to be put in a random team if they didn't have one. Making it easier for solo participants to participate in the game jam and a fun way to get to know new people.

The bot’s core goal was to allow users to:
- Register fo the event
- Create and join teams
- Choose to be placed in a random team automatically

## Core features
- Users can create teams
- Users can invite others to their team or request to join an existing one
- A management system for handling invites and join requests
- A management system for maneging the teams and there members
- Users can register for the event by either creating/joining a team or choosing to be placed in a random one

## Application life cycle
This project uses Entity Component System (ECS) principles and Dependency Injection (DI) to manage the bot’s life cycle and service dependencies.
```cs
using IHost host = Host.CreateDefaultBuilder()
    .ConfigureAppConfiguration((hostingContext, config) =>
    {
        // Load configuration from YAML file
        config.AddYamlFile("Config.yml");
    })
    .ConfigureServices((context, services) =>
    {
        // Bind configuration to strongly typed object
        Config config = new Config();
        context.Configuration.Bind(config);

        // Register services with Dependency Injection
        services
            .AddSingleton(config)
            .AddDbContext<TeamsDbContext>(options => options.UseSqlite("Data Source=teams.db"))
            
            // Discord services
            .AddSingleton(x => new DiscordSocketClient(new DiscordSocketConfig
            {
                GatewayIntents = GatewayIntents.Guilds | GatewayIntents.GuildMembers,
                UseInteractionSnowflakeDate = false,
                LogLevel = LogSeverity.Debug
            }))
            .AddSingleton(x => new InteractionService(
                x.GetRequiredService<DiscordSocketClient>(),
                new InteractionServiceConfig { LogLevel = LogSeverity.Debug }
            ))
            
            // Bot services
            .AddSingleton<TeamService>()
            .AddSingleton<TeamMemberService>()
            .AddSingleton<TeamInviteService>()
            .AddSingleton<InvitesMenuInteractionHandler>()
            .AddSingleton<BotService>()
            .AddSingleton<MemberSyncService>()
            .AddSingleton<TeamRoleAutocomplete>()
            
            // Logging
            .AddTransient<ILogger, ConsoleLogger>()
            .AddTransient<ILogger, FileLogger>()
            .AddTransient<ILogger, ChannelLogger>()
            .AddTransient<LoggerManager>()
            
            // Background tasks
            .AddHostedService<InviteCleanupService>();
    })
    .Build();
```

## User Interface
Since a Discord bot doesn’t have access to traditional UI elements, all interactions had to be handled through commands and text-based components.
This limitation encouraged me to find creative solutions for user interaction particularly for managing team invites and join requests.

To make this process more user-friendly, I implemented a dropdown menu where users can select a specific request to manage.
Once selected, two buttons appear Accept and Decline allowing users to quickly respond to requests.

```cs
// Define a slash command "invites" to open the user's invitation menu
[SlashCommand("invites", "Open invitation menu")]
public async Task ViewPendingInvitesAsync()
{
    // Acknowledge the command and defer the response so it can be sent later
    await DeferAsync(ephemeral: true); 

    // Retrieve all pending invites for the user invoking the command
    var invites = await _teamInviteService.GetInvitesAsync(Context.User.Id);

    // If there are no pending invites, notify the user and exit
    if (!invites.Any())
    {
        await FollowupAsync("You have no pending invites or join requests.");
        return;
    }

    // Create a new select menu (dropdown) for managing invites
    var menu = new SelectMenuBuilder()
        .WithCustomId($"invites_menu_{Context.User.Id}") 
        .WithPlaceholder("Select an invite or join request to manage") 
        .WithMinValues(1) 
        .WithMaxValues(1);

    // Populate the select menu with options for each pending invite
    foreach (var invite in invites)
    {
        // Retrieve the member who sent the invite (optional, can be null)
        TeamMember? sender = await _teamMemberService.GetMemberAsync(invite.SenderId);

        // Add an option to the menu for this invite
        menu.AddOption(new SelectMenuOptionBuilder()
            .WithLabel($"Team: {invite.Team.Name}") 
            .WithValue(invite.Id.ToString()) 
            .WithDescription($"From: {sender?.Name}, Status: {invite.status}, Type: {invite.type}")
        );
    }

    // Build the component (menu) to be sent with the response
    var component = new ComponentBuilder()
        .WithSelectMenu(menu)
        .Build();

    // Send the menu as a follow-up message so the user can interact with it
    await FollowupAsync("Manage your team invites:", components: component);
}
```

## Storing teams
For this project, I needed a scalable and reliable way to store team-related data.
I chose to use a SQLite database because it’s lightweight, fast, and doesn’t require running a separate SQL server.

The database consists of three main tables:
- Teams: stores team information
- TeamMembers: stores users and their team associations
- TeamInvites: stores pending invites and join requests
```cs 
// DbContext for managing Teams, TeamMembers, and TeamInvites in the database
public class TeamsDbContext : DbContext
{
    public DbSet<Team> Teams { get; set; }     // Represents the Teams table in the database
    public DbSet<TeamMember> TeamMembers { get; set; } // Represents the TeamMembers table in the database
    public DbSet<TeamInvite> TeamInvites { get; set; } // Represents the TeamInvites table in the database

    // Constructor to pass DbContext options (like connection string) to the base DbContext
    public TeamsDbContext(DbContextOptions<TeamsDbContext> options) : base(options) { }

    // Configure entity relationships and constraints
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configure the Team entity
        modelBuilder.Entity<Team>()
            .HasMany(t => t.Members)
            .WithOne(m => m.Team)
            .HasForeignKey(m => m.TeamId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Cascade);

        // Configure the Team.Owner relationship
        modelBuilder.Entity<Team>()
            .HasOne(t => t.Owner)
            .WithMany()
            .HasForeignKey(t => t.OwnerId)
            .OnDelete(DeleteBehavior.Restrict);

        // Configure the TeamInvite entity
        modelBuilder.Entity<TeamInvite>()
            .HasOne(i => i.Team)
            .WithMany()
            .HasForeignKey(i => i.TeamId)
            .OnDelete(DeleteBehavior.Cascade);

        // Call base method to apply default conventions
        base.OnModelCreating(modelBuilder);
    }
}
```

## Custom logger
Because the Discord bot was designed to run 24/7 on a server, I built a custom logging system that outputs logs to three different destinations:
- Console: for real-time feedback and debugging
- File: for long-term log storage and historical tracking
- Discord channel: for important informational events, such as when a team is created or deleted

The purpose of this system was to ensure that if something went wrong, I could easily review the logs, identify the problem, and fix it.

Additionally, if a critical issue occurred for example, a corrupted database file I would still have detailed logs available to recreate the database from scratch.
```cs 
// Manages multiple logger implementations and dispatches log messages to all of them
public class LoggerManager
{
    // Collection of ILogger instances (e.g., ConsoleLogger, FileLogger, ChannelLogger)
    private readonly IEnumerable<ILogger> _loggers;

    // Constructor: receives a collection of loggers via dependency injection
    public LoggerManager(IEnumerable<ILogger> loggers)
    {
        _loggers = loggers;
    }

    // Logs a message asynchronously to all registered loggers
    private async Task LogAsync(LogMessage msg)
    {
        foreach (var logger in _loggers)
        {
            await logger.Log(msg);
        }
    }
}
```

## Reflection
Working on this project helped me become more familiar with modern C# features such as dependency injection and the Entity Component System (ECS) architecture.
It also improved my understanding of how to structure larger applications with clear separation of concerns and lifecycle management.

If I continue this project, my next goal is to implement the random team creation system that automatically assigns solo participants to available teams, making the bot fully meet its original design goals.