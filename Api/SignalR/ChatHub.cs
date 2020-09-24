using System.Threading.Tasks;
using ApplicationLogic.Message;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace Api.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;

        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            var message = await _mediator.Send(command);

            await Clients.All.SendAsync("RecieveMessage", command);
        }
    }
}