using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using telecom.Domain.Handlers.Contracts;

namespace telecom.Domain.Commands.Contracts;

public interface ICommand : IRequest<IHandleResult>
{
}
