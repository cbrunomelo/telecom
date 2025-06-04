using MediatR;
using telecom.Domain.Commands.Contracts;

namespace telecom.Domain.Handlers.Contracts;

public interface IHandle<T> : IRequestHandler<T, IHandleResult> where T : ICommand
{
}
