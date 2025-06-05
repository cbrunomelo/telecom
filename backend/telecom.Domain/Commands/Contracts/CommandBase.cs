using System;
using System.Collections.Generic;
using telecom.Domain.Handlers.Contracts;
using MediatR;
using FluentValidation;

namespace telecom.Domain.Commands.Contracts;

public abstract class CommandBase<T> : IRequest<IHandleResult>, ICommand where T : CommandBase<T>
{
    public List<string> ValidationErrors { get; private set; } = new List<string>();

    public bool IsValid()
    {
        ClearErrors();
        var validator = GetValidator();
        var result = validator.Validate((T)this);

        if (!result.IsValid)
            result.Errors.ForEach(error => AddError(error.ErrorMessage));

        return result.IsValid;
    }

    protected void AddError(string error) => ValidationErrors.Add(error);

    protected void ClearErrors() => ValidationErrors.Clear();

    protected abstract IValidator<T> GetValidator();
} 