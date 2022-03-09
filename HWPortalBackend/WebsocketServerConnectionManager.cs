using System.Collections.Concurrent;
using System.Net.WebSockets;

namespace HWPortalBackend
{
    public class WebsocketServerConnectionManager
    {
        private readonly ConcurrentDictionary<string, WebSocket> _sokets = new();

        public ConcurrentDictionary<string, WebSocket> GetAllSockets()
        {
            return _sokets;
        }

        public string AddSocket(WebSocket socket)
        {
            string connId = Guid.NewGuid().ToString();
            _sokets.TryAdd(connId, socket);

            Console.WriteLine($"Connection added: {connId}");

            return connId;
        }
    }
}
