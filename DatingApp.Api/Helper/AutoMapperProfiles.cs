using AutoMapper;
using DatingApp.Api.DataTransferObjects;
using DatingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace DatingApp.Api.Helper
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Users, UserForListDTO>()
                .ForMember(dest=>dest.PhotoUrl,
                 opt=>opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url))
            .ForMember(dest => dest.Age,
                 opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Users, UserForDetailedDTO>()
                .ForMember(dest => dest.PhotoUrl,
                 opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
               .ForMember(dest => dest.Age,
                 opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
         
            CreateMap<Photo, PhotosForDetailedDTO>();
        }
    }
}
