using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenLab_SZ.Data;
using OpenLab_SZ.Models;

namespace OpenLab_SZ.Controllers;

[ApiController]
[Route("[controller]")]
public class UserPropertiesController : ControllerBase
{

    private readonly ILogger<UserPropertiesController> _logger;

    public UserPropertiesController(ILogger<UserPropertiesController> logger)
    {
        _logger = logger;
    }


    // dorobit http request
    [HttpGet]
    public IEnumerable<UserDto> Get()
    {
        yield return new UserDto { Guild = "menoguildy", Xp = 54 };
    }
}