using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace telecom.Domain.Entitys;

public abstract class EntityBase
{
    private List<INotification> notifications = new List<INotification>();
    protected IReadOnlyCollection<INotification> Notifications => (IReadOnlyCollection<INotification>)notifications;
    protected void AddNotification(INotification notification) => notifications.Add(notification);
    public void ClearNotifications() => notifications.Clear();
    public bool HasNotifications() => notifications.Any();
    public IReadOnlyCollection<INotification> GetNotifications() => notifications.AsReadOnly();
    public Guid Id { get; set; }

    public override bool Equals(object obj)
    {
        if (obj is Operadora operadora)
        {
            return Id == operadora.Id;
        }
        return false;
    }

    protected EntityBase() => Id = Guid.NewGuid();
    
}
