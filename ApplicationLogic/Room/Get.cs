using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistance;

namespace ApplicationLogic.Room
{
    public class Get
    {
        public class Query : IRequest<RoomDto>
        {
            public Guid Id { get; set; }
        }


        public class Handler : IRequestHandler<Query, RoomDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<RoomDto> Handle(Query request, CancellationToken cancellationToken)
            {
                Domain.Room room = await _context.Rooms.SingleOrDefaultAsync(x => x.Id == request.Id);

                if (room == null)
                {
                    throw new Exception("Room not found");
                }

                return _mapper.Map<RoomDto>(room);
            }
        }
    }
}