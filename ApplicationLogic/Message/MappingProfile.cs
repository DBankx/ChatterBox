using AutoMapper;

namespace ApplicationLogic.Message
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Message, MessageDto>();
        }
    }
}