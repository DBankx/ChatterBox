using System;
using AutoMapper;

namespace ApplicationLogic.Message
{
    public class MessageDto
    {
        public string Body { get; set; }
        public string Username { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}