using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using telecom.Domain.Handlers.Contracts;

namespace telecom.Domain.Handlers.Response;

public class HandleResult : IHandleResult
{
    public bool Sucess { get; }
    public string Message { get; }
    public object Data { get; }
    public List<string> Errors { get; }

    public HandleResult(bool sucess, string message, object data)
    {
        Sucess = sucess;
        Message = message;
        Data = data;
        Errors = new();
    }

    public HandleResult(string message, List<string> errors)
    {
        Sucess = false;
        Message = message;
        Errors = errors;
    }

    public HandleResult(string message, string error)
    {
        Sucess = false;
        Message = message;
        Errors = new List<string> { error };
    }
}