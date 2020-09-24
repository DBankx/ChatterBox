using System;
using System.Collections.Generic;

namespace Domain
{
    public class Room
    {
        public Guid Id { get; set; }
        public string About { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Title { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
    }
}