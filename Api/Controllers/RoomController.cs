using System.Collections.Generic;
using System.Threading.Tasks;
using ApplicationLogic.Room;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IMediator _mediator;

        public RoomController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<Unit> CreateRoom(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpGet]
        public async Task<List<Room>> GetRooms()
        {
            return await _mediator.Send(new List.Query());
        }
    }
}