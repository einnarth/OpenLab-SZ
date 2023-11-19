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
}