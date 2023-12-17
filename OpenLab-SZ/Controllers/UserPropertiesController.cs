using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenLab_SZ.Data;
using OpenLab_SZ.Models;
using OpenLab_SZ.Data.Migrations;
using System.Security.Claims;
using System.Xml.XPath;
using Microsoft.AspNetCore.Identity;

namespace OpenLab_SZ.Controllers;

[ApiController]
[Route("[controller]")]
public class UserPropertiesController : ControllerBase
{

    private readonly ILogger<UserPropertiesController> _logger;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public UserPropertiesController(ILogger<UserPropertiesController> logger, ApplicationDbContext context, UserManager<ApplicationUser> userManager)
    {
        _logger = logger;
        _context = context;
        _userManager = userManager;
    }



    [HttpGet]
    [Route("getCurrent")]
    public ActionResult<UserDto> Get()
    {
        ApplicationUser currentUser = GetCurrentUser();

        var info = new UserDto
        {
            Xp = currentUser.Xp,
            UserName = currentUser.UserName,
            Email = currentUser.Email,
            Guild = currentUser.UsersGuild?.Name,
        };
        return info;
    }



    public Models.ApplicationUser GetCurrentUser()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        Models.ApplicationUser? user = _context.ApplicationUsers
            .Include(user => user.UsersGuild)
            .SingleOrDefault(user => user.Id == userId);

        return user!;
    }

    [HttpPut]
    [Route("leaveGuild")]
    public ActionResult<GuildDetailsDto> LeaveGuild(int id)
    {
        var currentUser = GetCurrentUser();
        var currentGuild = _context.Guilds.Find(id);
        currentUser.UsersGuild = null;
        _context.SaveChanges();

        return Ok(new GuildDetailsDto
        {
            Id = currentGuild.Id,
            Name = currentGuild.Name,
            Description = currentGuild.Description,
            MembersCount = currentGuild.MembersCount,
            CurrentMembersCount = GetUsersInGuild(id).Count(),
            Users = GetUsersInGuild(id),
            HasUserAnyGuild = IsInGuild(),
            HasUserThisGuild = HasThisGuild(id),
        });

        
    }

    [HttpPut]
    [Route("leaveGuildWithoutId")]
    public ActionResult<UserDto> LeaveGuildWithoutId()
    {
        var currentUser = GetCurrentUser();
        currentUser.UsersGuild = null;
        _context.SaveChanges();

        return Ok(new UserDto
        {
            Guild = currentUser.UsersGuild?.Name,
            UserName = currentUser.UserName,
            Email = currentUser.Email,
            Xp = currentUser.Xp,
        });


    }

    [HttpPut]
    [Route("joinGuild")]
    public ActionResult<GuildDetailsDto> JoinGuild(int id)
    {
        var currentUser = GetCurrentUser();
        Guild newGuild = _context.Guilds.Where(g => g.Id == id).FirstOrDefault();
        currentUser.UsersGuild = newGuild;
        _context.SaveChanges();

        return Ok(new GuildDetailsDto
        {
            Id = newGuild.Id,
            Name = newGuild.Name,
            Description = newGuild.Description,
            MembersCount = newGuild.MembersCount,
            CurrentMembersCount = GetUsersInGuild(id).Count(),
            Users = GetUsersInGuild(id),
            HasUserAnyGuild = IsInGuild(),
            HasUserThisGuild = HasThisGuild(id),
        }) ;
    }

    [HttpGet]
    [Route("getUsersInGuild")]
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
}