using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenLab_SZ.Data;
using OpenLab_SZ.Models;
using OpenLab_SZ.Data.Migrations;
using System.Security.Claims;
using System.Xml.XPath;

namespace OpenLab_SZ.Controllers;

[ApiController]
[Route("[controller]")]
public class UserPropertiesController : ControllerBase
{

    private readonly ILogger<UserPropertiesController> _logger;
    private readonly ApplicationDbContext _context;

    public UserPropertiesController(ILogger<UserPropertiesController> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }


    
    [HttpGet]
    public ActionResult<ApplicationUser> Get()
    {
        var currentUser = GetCurrentUser();

        var info = new ApplicationUser
        {
            Xp = currentUser.Xp,
            UserName = currentUser.UserName,
        };
        return info;
    }
    

    private Models.ApplicationUser GetCurrentUser() 
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        Models.ApplicationUser? user = _context.ApplicationUsers
            .SingleOrDefault(user => user.Id == userId);

        return user!;
    }
}