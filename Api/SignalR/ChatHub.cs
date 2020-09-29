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

        public async Task SendMessage(Create.Command command)
        {
            var message = await _mediator.Send(command);

            await Clients.Group(command.RoomId.ToString()).SendAsync("RecieveMessage", message);
        }

        public async Task AddToGroup(string roomName, string username)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
            await Clients.Group(roomName).SendAsync("Send", $"{username} has joined the room");
        }
        
        public async Task RemoveFromGroup(string groupName, string username)
        {
            // remove from group
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("Send", $"{username} has left the group");
            
        }
    }
}