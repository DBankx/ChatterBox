using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace ApplicationLogic.Message
{
    public class Create
    {
        public class Command : IRequest<MessageDto>
        {
            public Guid RoomId { get; set; }
            public string Body { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command, MessageDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<MessageDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var room = await _context.Rooms.SingleOrDefaultAsync(x => x.Id == request.RoomId);

                if (room == null)
                {
                    throw new Exception("Room not found");
                }

                var newMessage = new Domain.Message
                {
                    Room = room,
                    Body = request.Body,
                    CreatedAt = DateTime.Now,
                    Username = request.Username
                };
                
               // room.Messages.Add(newMessage);
                
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return _mapper.Map<MessageDto>(newMessage);
                
                throw new Exception("Problem saving changes");
            }
        }
    }
}