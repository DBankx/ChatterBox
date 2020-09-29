using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace ApplicationLogic.Room
{
    public class List
    {
        public class Query : IRequest<List<RoomDto>>
        {
        }


        public class Handler : IRequestHandler<Query, List<RoomDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper _mapper)
            {
                _context = context;
                this._mapper = _mapper;
            }

            public async Task<List<RoomDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                List<Domain.Room> rooms = await _context.Rooms.ToListAsync();

                return _mapper.Map<List<Domain.Room>, List<RoomDto>>(rooms);
            }
        }
    }
}