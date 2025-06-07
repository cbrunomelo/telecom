using AutoMapper;
using telecom.Application.DTOs;
using telecom.Domain.Commands.FaturaCommands;
using telecom.Domain.Commands.ContratoCommands;
using telecom.Domain.Commands.OperadoraCommands;
using telecom.Domain.Entitys;

namespace telecom.Application.Mappings;

public class ApplicationMappingProfile : Profile
{
    public ApplicationMappingProfile()
    {
        // Mapeamento de DTOs para Commands - Fatura
        CreateMap<FaturaDto, CreateFaturaCommand>()
            .ConstructUsing(src => new CreateFaturaCommand(src.Valor, src.DataVencimento, src.ContratoId, src.Status));

        CreateMap<FaturaDto, UpdateFaturaCommand>()
            .ConstructUsing(src => new UpdateFaturaCommand(src.Id ?? Guid.Empty, src.Valor, src.DataVencimento));

        // Mapeamento de DTOs para Commands - Contrato
        CreateMap<ContratoDto, CreateContratoCommand>()
            .ConstructUsing(src => new CreateContratoCommand(src.NomeFilial, src.PlanoContratado, src.DataInicio, src.DataVencimento, src.ValorMensal, src.OperadoraId));

        CreateMap<ContratoDto, UpdateContratoCommand>()
            .ConstructUsing(src => new UpdateContratoCommand(src.Id ?? Guid.Empty, src.NomeFilial, src.PlanoContratado, src.DataInicio, src.DataVencimento, src.ValorMensal));

        // Mapeamento de DTOs para Commands - Operadora
        CreateMap<OperadoraDto, CreateOperadoraCommand>()
            .ConstructUsing(src => new CreateOperadoraCommand(src.Nome, src.ETipoServicoOperadora, src.ContatoSuporte));

        CreateMap<OperadoraDto, UpdateOperadoraCommand>()
            .ConstructUsing(src => new UpdateOperadoraCommand(src.Id ?? Guid.Empty, src.Nome, src.ETipoServicoOperadora, src.ContatoSuporte));

        // Mapeamento de Entidades para DTOs
        CreateMap<Faturas, FaturaDto>()
            .ForMember(dest => dest.ContratoNomeFilial, opt => opt.MapFrom(src => src.Contrato != null ? src.Contrato.NomeFilial : null))
            .ForMember(dest => dest.Valor, opt => opt.MapFrom(src => src.ValorCobrado));

        CreateMap<Contrato, ContratoDto>()
            .ForMember(dest => dest.OperadoraNome, opt => opt.MapFrom(src => src.Operadora != null ? src.Operadora.Nome : null));

        CreateMap<Operadora, OperadoraDto>()
            .ForMember(dest => dest.TotalContratos, opt => opt.MapFrom(src => src.Contratos != null ? src.Contratos.Count : 0));
    }
} 