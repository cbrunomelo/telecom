using AutoMapper;
using telecom.Domain.Commands.OperadoraCommands;
using telecom.Domain.Entitys;

namespace telecom.Domain.Mappings;

public class OperadoraProfile : Profile
{
    public OperadoraProfile()
    {
        CreateMap<CreateOperadoraCommand, Operadora>()
            .ForMember(dest => dest.Nome, opt => opt.MapFrom(src => src.Nome))
            .ForMember(dest => dest.eTipoServicoOperadora, opt => opt.MapFrom(src => src.ETipoServicoOperadora))
            .ForMember(dest => dest.ContatoSuporte, opt => opt.MapFrom(src => src.ContatoSuporte))
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Contratos, opt => opt.Ignore());

        CreateMap<UpdateOperadoraCommand, Operadora>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Nome, opt => opt.MapFrom(src => src.Nome))
            .ForMember(dest => dest.eTipoServicoOperadora, opt => opt.MapFrom(src => src.ETipoServicoOperadora))
            .ForMember(dest => dest.ContatoSuporte, opt => opt.MapFrom(src => src.ContatoSuporte))
            .ForMember(dest => dest.Contratos, opt => opt.Ignore());
    }
} 