using AutoMapper;
using telecom.Domain.Commands.ContratoCommands;
using telecom.Domain.Entitys;

namespace telecom.Domain.Mappings;

public class ContratoProfile : Profile
{
    public ContratoProfile()
    {
        CreateMap<CreateContratoCommand, Contrato>()
            .ForMember(dest => dest.NomeFilial, opt => opt.MapFrom(src => src.NomeFilial))
            .ForMember(dest => dest.PlanoContratado, opt => opt.MapFrom(src => src.PlanoContratado))
            .ForMember(dest => dest.DataInicio, opt => opt.MapFrom(src => src.DataInicio))
            .ForMember(dest => dest.DataVencimento, opt => opt.MapFrom(src => src.DataVencimento))
            .ForMember(dest => dest.ValorMensal, opt => opt.MapFrom(src => src.ValorMensal))
            .ForMember(dest => dest.OperadoraId, opt => opt.MapFrom(src => src.OperadoraId))
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Operadora, opt => opt.Ignore());

        CreateMap<UpdateContratoCommand, Contrato>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.NomeFilial, opt => opt.MapFrom(src => src.NomeFilial))
            .ForMember(dest => dest.PlanoContratado, opt => opt.MapFrom(src => src.PlanoContratado))
            .ForMember(dest => dest.DataInicio, opt => opt.MapFrom(src => src.DataInicio))
            .ForMember(dest => dest.DataVencimento, opt => opt.MapFrom(src => src.DataVencimento))
            .ForMember(dest => dest.ValorMensal, opt => opt.MapFrom(src => src.ValorMensal))
            .ForMember(dest => dest.OperadoraId, opt => opt.Ignore())
            .ForMember(dest => dest.Operadora, opt => opt.Ignore());
    }
} 