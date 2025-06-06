using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using telecom.Domain.Commands.Contracts;
using telecom.Domain.Commands.ContratoCommands;

namespace telecom.Domain.Validation.Commands.Contracts;

public abstract class ICommandValidator<T> : AbstractValidator<T> where T : CommandBase<T>
{

}
