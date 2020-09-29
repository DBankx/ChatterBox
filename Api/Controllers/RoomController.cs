using System;
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
        public async Task<ActionResult<Unit>> CreateRoom(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpGet]
        public async Task<ActionResult<List<RoomDto>>> GetRooms()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RoomDto>> GetRoom(Guid id)
        {
            return await _mediator.Send(new Get.Query {Id = id});
        }
    }
}