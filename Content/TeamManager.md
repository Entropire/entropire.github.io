---
title: "TeamManager"
description: "A Discord bot that helps users form teams for a game jam"
image: "Img/NotEntropire/NotEntropire.png"
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
I created this project for a game jam where we needed an easy way to keep track of teams and allow people to register quickly.

We also wanted participants to have the option to be put in a random team if they diden't have one. Making it easier for solo participants to participate in the game jam and a fun way to get to know new peaple.

So with these things in mind the goal of the project was to create a team managment discord bot that allows user to:
- Register fo the event
- Create and join teams
- Choose to be placed in a random team automatically

## Core features
- Users can create teams
- Users can invite others to their team or request to join an existing one
- A management system for handling invites and join requests
- A management system for maneging the teams and there members
- Users can register for the event by either creating/joining a team or choosing to be placed in a random one

## Outcome
The end result of this project was a Discord bot that allows users to create teams and invite other users to join them.

Because of time constraints of when the game jam was planned, I wasn’t able to implement the random team assignment system, but the foundation for the feature was designed and planned for future updates.

## Application life cycle
For this project, I used Entity Component System (ECS) principles and Dependency Injection (DI) for the first time to manage the bot’s life cycle and service dependencies.
```cs
            using IHost host = Host.CreateDefaultBuilder()
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    config.AddYamlFile("Config.yml");
                })
                .ConfigureServices((context, services) =>
                {
                    Config config = new Config();
                    context.Configuration.Bind(config);

                    services
                    .AddSingleton(config)
                    .AddDbContext<TeamsDbContext>(options => options.UseSqlite("Data Source=teams.db"))
                    .AddSingleton(x => new DiscordSocketClient(new DiscordSocketConfig()
                    {
                        GatewayIntents = GatewayIntents.Guilds | GatewayIntents.GuildMembers,
                        UseInteractionSnowflakeDate = false,
                        LogLevel = LogSeverity.Debug
                    }))
                    .AddSingleton(x => new InteractionService(x.GetRequiredService<DiscordSocketClient>(),
                    new InteractionServiceConfig()
                    {
                        LogLevel = LogSeverity.Debug
                    }))
                    .AddSingleton<TeamService>()
                    .AddSingleton<TeamMemberService>()
                    .AddSingleton<TeamInviteService>()
                    .AddSingleton<InvitesMenuInteractionHandler>()
                    .AddSingleton<BotService>()
                    .AddSingleton<MemberSyncService>()
                    .AddSingleton<TeamRoleAutocomplete>()
                    .AddTransient<ILogger, ConsoleLogger>()
                    .AddTransient<ILogger, FileLogger>()
                    .AddTransient<ILogger, ChannelLogger>()
                    .AddTransient<LoggerManager>()
                    .AddHostedService<InviteCleanupService>();
                }
                ).Build();
```

## User Interface
Since a Discord bot doesn’t have access to traditional UI elements, all interactions had to be handled through commands and text-based components.
This limitation encouraged me to find creative solutions for user interaction particularly for managing team invites and join requests.

To make this process more user-friendly, I implemented a dropdown menu where users can select a specific request to manage.
Once selected, two buttons appear Accept and Decline allowing users to quickly respond to requests.

```cs
[SlashCommand("invites", "Open invitation menu")]
public async Task ViewPendingInvitesAsync()
{
  await DeferAsync(ephemeral: true); 

  var invites = await _teamInviteService.GetInvitesAsync(Context.User.Id);
  if (!invites.Any())
  {
    await FollowupAsync("You have no pending invites or join requests.");
    return;
  }

  var menu = new SelectMenuBuilder()
    .WithCustomId($"invites_menu_{Context.User.Id}")
    .WithPlaceholder("Select an invite or join request to manage")
    .WithMinValues(1)
    .WithMaxValues(1);

  foreach (var invite in invites)
  {
    TeamMember? sender = await _teamMemberService.GetMemberAsync(invite.SenderId);

    menu.AddOption(new SelectMenuOptionBuilder()
      .WithLabel($"Team: {invite.Team.Name}")
      .WithValue(invite.Id.ToString())
      .WithDescription($"From: {sender?.Name}, Status: {invite.status}, Type: {invite.type.ToString()}"));
  }

  var component = new ComponentBuilder()
    .WithSelectMenu(menu)
    .Build();

  await FollowupAsync("Manage your team invites:", components: component);
}
```

//insert give here

## Storing teams
For this project, I needed a scalable and reliable way to store team-related data.
I chose to use a SQLite database because it’s lightweight, fast, and doesn’t require running a separate SQL server.

The database consists of three main tables:
- Teams — stores team information
- TeamMembers — stores users and their team associations
- TeamInvites — stores pending invites and join requests
```cs 
public class TeamsDbContext : DbContext
{
    public DbSet<Team> Teams { get; set; }
    public DbSet<TeamMember> TeamMembers { get; set; }
    public DbSet<TeamInvite> TeamInvites { get; set; }

    public TeamsDbContext(DbContextOptions<TeamsDbContext> options) : base(options) { }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Team>()
            .HasMany(t => t.Members)
            .WithOne(m => m.Team)
            .HasForeignKey(m => m.TeamId)
            .IsRequired(false) 
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Team>()
            .HasOne(t => t.Owner)
            .WithMany()
            .HasForeignKey(t => t.OwnerId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<TeamInvite>()      
            .HasOne(i => i.Team)
            .WithMany()
            .HasForeignKey(i => i.TeamId)  
            .OnDelete(DeleteBehavior.Cascade);

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
public class LoggerManager
{
    private readonly IEnumerable<ILogger> _loggers;

    public LoggerManager(IEnumerable<ILogger> loggers)
    {
        _loggers = loggers;
    }

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