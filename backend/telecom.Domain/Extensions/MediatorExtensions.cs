using MediatR;
using telecom.Domain.Entitys;

namespace telecom.Domain.Extensions;

public static class MediatorExtensions
{
    public static async Task PublishAll(this IMediator mediator, EntityBase entity)
    {
        if (entity?.HasNotifications() == true)
        {
            var notifications = entity.GetNotifications();
            foreach (var notification in notifications)
            {
                await mediator.Publish(notification);
            }
            entity.ClearNotifications();
        }
    }
} 