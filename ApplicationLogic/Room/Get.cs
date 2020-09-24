using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace ApplicationLogic.Room
{
    public class Get
    {
        public class Query : IRequest<Domain.Room>
        {
            public Guid Id { get; set; }
        }


        public class Handler : IRequestHandler<Query, Domain.Room>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Domain.Room> Handle(Query request, CancellationToken cancellationToken)
            {
                Domain.Room room = await _context.Rooms.SingleOrDefaultAsync(x => x.Id == request.Id);

                if (room == null)
                {
                    throw new Exception("Room not found");
                }

                return room;
            }
        }
    }
}