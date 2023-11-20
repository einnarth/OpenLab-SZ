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
    public ActionResult<ApplicationUser> Get()
    {
        var currentUser = GetCurrentUser();

        var info = new ApplicationUser
        {
            Xp = currentUser.Xp,
            UserName = currentUser.UserName,
            Guild = currentUser.UsersGuild?.Name,
        };
        return info;
    }



    private Models.ApplicationUser GetCurrentUser()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        Models.ApplicationUser? user = _context.ApplicationUsers
            .Include(user => user.UsersGuild)
            .SingleOrDefault(user => user.Id == userId);

        return user!;
    }

    [HttpPut]
    [Route("leaveGuild")]
    public async Task<IActionResult>LeaveGuild()
    {
        var currentUser = GetCurrentUser();
        currentUser.UsersGuild = null;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPut]
    [Route("joinGuild")]
    public async Task<IActionResult> joinGuild(int id)
    {
        var currentUser = GetCurrentUser();
        IEnumerable<Guild> newGuild = _context.Guilds.Where(x => x.Id == id);
        currentUser.UsersGuild = newGuild.FirstOrDefault();
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet]
    [Route("getUsersInGuild")]
    public IEnumerable<UserDto> GetGuildById(int id)
    {
        IQueryable<ApplicationUser> users = _context.Users.Include(user => user.UsersGuild);

        IEnumerable<ApplicationUser> finalUsers = users.Where(u => u.UsersGuild.Id == id);

        return finalUsers.Select(finalUsers => new UserDto
        {
            Guild = finalUsers.Guild,
            UserName = finalUsers.UserName,
            Xp = finalUsers.Xp,
            
        });

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