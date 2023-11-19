using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using OpenLab_SZ.Data;
using OpenLab_SZ.Models;

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
            CurrentMembersCount = GetUsersCount(myEntities.Id)
        });
    }

    private int GetUsersCount(int guildId)
    {
        IQueryable<ApplicationUser> users = _context.Users.Include(user => user.UsersGuild).AsNoTracking();

        return users.Where(u => u.UsersGuild.Id == guildId).Count();
    }



}
