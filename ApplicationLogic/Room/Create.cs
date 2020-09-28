using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistance;
using Domain;

namespace ApplicationLogic.Room
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string About { get; set; }
            public string Title { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Domain.Room newRoom = new Domain.Room
                {
                    Title = request.Title,
                    Id = request.Id,
                    CreatedAt = DateTime.Now,
                    About = request.About,
                    Username = request.Username
                };

                _context.Rooms.Add(newRoom);

                var success = await _context.SaveChangesAsync() > 0;
                
                if(success) return Unit.Value;
                throw new Exception("Problem saving room");
            }
        }
    }
}