using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenLab_SZ.Data;
using OpenLab_SZ.Models;
using OpenLab_SZ.Data.Migrations;

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


    // dorobit http request

    /*public async Task<ActionResult<IEnumerable<UserDto>>> GetMyEntities()
    {
        var myEntities = await _context.ApplicationUsers.ToListAsync();
        return myEntities;
    }*/
    [HttpGet]
    public IEnumerable<ApplicationUser> Get()
    {
        //yield return new UserDto { Guild = "menoguildy", Xp = 54 };
        var myEntities = _context.ApplicationUsers;
        return myEntities;
    }
}