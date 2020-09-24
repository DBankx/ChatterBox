using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace ApplicationLogic.Room
{
    public class List
    {
        public class Query : IRequest<List<Domain.Room>>
        {
        }


        public class Handler : IRequestHandler<Query, List<Domain.Room>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Domain.Room>> Handle(Query request, CancellationToken cancellationToken)
            {
                List<Domain.Room> rooms = await _context.Rooms.ToListAsync();

                return rooms;
            }
        }
    }
}