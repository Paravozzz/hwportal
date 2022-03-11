using AutoMapper;
using HWPortalBackend.DTOs;
using HWPortalBackend.Identity;

namespace HWPortalBackend
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserForRegistrationDto, User>()
                .ForMember(usr => usr.UserName, opt => opt.MapFrom(dto => dto.Email));
        }
    }
}
