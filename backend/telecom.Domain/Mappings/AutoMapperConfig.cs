using AutoMapper;

namespace telecom.Domain.Mappings;

public static class AutoMapperConfig
{
    public static MapperConfiguration CreateConfiguration()
    {
        return new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<FaturaProfile>();
            cfg.AddProfile<ContratoProfile>();
            cfg.AddProfile<OperadoraProfile>();
        });
    }

    public static IMapper CreateMapper()
    {
        var config = CreateConfiguration();
        return config.CreateMapper();
    }
} 