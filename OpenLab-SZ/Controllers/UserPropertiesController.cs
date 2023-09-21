using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenLab_SZ.Data;

namespace OpenLab_SZ.Controllers;

[Route("api/users")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public UserController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}/xp-guild")]
    public async Task<IActionResult> GetUserXpAndGuild(int id)
    {
        try
        {
            var user = await _context.Users
                .Where(u => u.Id == u.Id)
                .Select(u => new { Xp = u.Xp, Guild = u.Guild })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound(); // Užívateľ neexistuje
            }

            return Ok(user); // Vráti XP a Guild užívateľa
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }
}