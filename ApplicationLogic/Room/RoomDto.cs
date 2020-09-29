using System;
using System.Collections.Generic;
using ApplicationLogic.Message;

namespace ApplicationLogic.Room
{
    public class RoomDto
    {
        public Guid Id { get; set; }
        public string About { get; set; }
        public string Username { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Title { get; set; }
        public virtual ICollection<MessageDto> Messages { get; set; }
    }
}