using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace telecom.Domain.Handlers.Contracts;

public interface IHandleResult
{
    public bool Sucess { get; }
    public string Message { get; }
    public object Data { get; }
    public List<String> Errors { get; }

}
