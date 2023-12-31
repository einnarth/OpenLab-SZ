﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using OpenLab_SZ.Data;
using OpenLab_SZ.Models;
using OpenLab_SZ.Controllers;
using System.Security.Claims;

namespace OpenLab_SZ.Controllers;

[ApiController]
[Route("[controller]")]

public class GuildsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public GuildsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Route("getGuilds")]
    public IEnumerable<GuildDto> Get()
    {
        IEnumerable<Guild> myEntities = _context.Guilds;
        return myEntities.Select(myEntities => new GuildDto
        {
            Id = myEntities.Id,
            Name = myEntities.Name,
            Description = myEntities.Description,
            MembersCount = myEntities.MembersCount,
            CurrentMembersCount = GetUsersInGuild(myEntities.Id).Count()
        });
    }

    [HttpGet]
    [Route("getGuildById")]
    public GuildDetailsDto GetGuildById(int id)
    {
        Guild guild = _context.Guilds
            .Where(g => g.Id == id).FirstOrDefault();
        var info = new GuildDetailsDto
        {
            Id = guild.Id,
            Name = guild.Name,
            Description = guild.Description,
            MembersCount = guild.MembersCount,
            CurrentMembersCount = GetUsersInGuild(guild.Id).Count(),
            Users = GetUsersInGuild(guild.Id),
            HasUserAnyGuild = IsInGuild(),
            HasUserThisGuild = HasThisGuild(id),
        };
        return info;
    }


    

    public IEnumerable<UserDto> GetUsersInGuild(int id)
    {
        IQueryable<ApplicationUser> users = _context.Users.Include(user => user.UsersGuild);

        IEnumerable<ApplicationUser> finalUsers = users.Where(u => u.UsersGuild.Id == id);

        return finalUsers.Select(finalUsers => new UserDto
        {
            Guild = finalUsers.Guild,
            UserName = finalUsers.UserName,
            Email = finalUsers.Email,
            Xp = finalUsers.Xp,

        });

    }

    [HttpGet]
    [Route("isInGuild")]
    public bool IsInGuild()

    {
        var user = GetCurrentUser();
        return !(user.UsersGuild is null);
    }

    [HttpGet]
    [Route("hasThisGuild")]
    public bool HasThisGuild(int id)
    {
        Guild currentGuild = _context.Guilds.Where(x => x.Id == id).FirstOrDefault();
        var currentUser = GetCurrentUser();
        return currentUser.UsersGuild == currentGuild;

    }

    public Models.ApplicationUser GetCurrentUser()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        Models.ApplicationUser? user = _context.ApplicationUsers
            .Include(user => user.UsersGuild)
            .SingleOrDefault(user => user.Id == userId);

        return user!;
    }




}
