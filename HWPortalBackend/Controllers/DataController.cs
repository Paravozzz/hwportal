//using HWPortalBackend.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net.WebSockets;
using System.Text;

namespace HWPortalBackend.Controllers
{
    public class DataController : ControllerBase
    {
        private readonly WebsocketServerConnectionManager _connectionManager;
        public DataController(WebsocketServerConnectionManager connectionManager)
        {
            _connectionManager = connectionManager;
        }

        [HttpGet("/ws")]
        public async Task Get()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                using WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                string connId = _connectionManager.AddSocket(webSocket);
                //await Echo(webSocket);
                await RecieveMessage(webSocket, async (result, buffer) =>
                {
                    switch (result.MessageType)
                    {
                        case WebSocketMessageType.Text:
                            Console.WriteLine("--> Text message recieved.");
                            Console.WriteLine(Encoding.UTF8.GetString(buffer, 0, result.Count));
                            return;
                        case WebSocketMessageType.Close:
                            Console.WriteLine("--> Close message recieved.");
                            return;
                    }
                });
            }
            else
            {
                HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
            }
        }

        private async Task RecieveMessage(WebSocket socket, Action<WebSocketReceiveResult, byte[]> handleMessage)
        {
            byte[] buffer = new byte[1024 * 4];

            while (socket.State == WebSocketState.Open)
            {
                WebSocketReceiveResult result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                handleMessage(result, buffer);
            }
        }
    }
}
