using AutoMapper;
using telecom.Domain.Commands.FaturaCommands;
using telecom.Domain.Entitys;

namespace telecom.Domain.Mappings;

public class FaturaProfile : Profile
{
    public FaturaProfile()
    {
        CreateMap<CreateFaturaCommand, Faturas>()
            .ForMember(dest => dest.DataVencimento, opt => opt.MapFrom(src => src.DataVencimento))
            .ForMember(dest => dest.ValorCobrado, opt => opt.MapFrom(src => src.Valor))
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status))
            .ForMember(dest => dest.ContratoId, opt => opt.MapFrom(src => src.ContratoId))
            .ForMember(dest => dest.DateEmissao, opt => opt.MapFrom(src => DateTime.Now))
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Contrato, opt => opt.Ignore());

        CreateMap<UpdateFaturaCommand, Faturas>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.DataVencimento, opt => opt.MapFrom(src => src.DataVencimento))
            .ForMember(dest => dest.ValorCobrado, opt => opt.MapFrom(src => src.Valor))
            .ForMember(dest => dest.DateEmissao, opt => opt.Ignore())
            .ForMember(dest => dest.Status, opt => opt.Ignore())
            .ForMember(dest => dest.ContratoId, opt => opt.Ignore())
            .ForMember(dest => dest.Contrato, opt => opt.Ignore());
    }
} 