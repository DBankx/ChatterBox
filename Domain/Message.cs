using System;

namespace Domain
{
    public class Message
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Username { get; set; }
        public virtual Room Room { get; set; }
    }
}