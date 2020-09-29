using AutoMapper;

namespace ApplicationLogic.Room
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Room, RoomDto>();
        }
    }
}