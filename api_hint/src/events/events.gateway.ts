import { BadRequestException, Logger } from '@nestjs/common';
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
	cors: {
		origin: '*',
	}
})
export class EventsGateway {
	private static LOGGER: Logger = new Logger('Gateway');
	private static CONNECTION_CHANNEL = 'connectionChannel';

	@WebSocketServer()
	private server: Server;

	handleConnection(socket: Socket) {
		const ip = socket.client.conn.remoteAddress;
		EventsGateway.LOGGER.log(`Gateway <- New client: @${socket.id}`);
	}

	@SubscribeMessage('joinGame')
	handleJoinGame(
		@ConnectedSocket() socket: Socket,
		@MessageBody() data: any,
	): string {
		if (data.gameId == undefined) {
			throw new BadRequestException;
		}
		socket.join(data.gameId);
		socket.to(data.gameId).emit('clientJoined');
		return "Sent join request";
	}

	@SubscribeMessage('update')
	handleUpdate(
		@ConnectedSocket() socket: Socket,
		@MessageBody() data,
	): string {
		if (data.gameId == undefined) {
			throw new BadRequestException;
		}
		socket.to(data.gameId).emit('update', data.message);
		return "Sent update";
	}

	@SubscribeMessage('updateGameList')
	handleUpdateGameList(
		@ConnectedSocket() socket: Socket,
	): string {
		this.server.emit('updateGameList');
		// socket.emit('updateGameList');
		return "Sent update";
	}

	handleDisconnect(socket: Socket) {
		// const ip = socket.client.conn.remoteAddress;
		this.server.emit(EventsGateway.CONNECTION_CHANNEL, `@${socket.id} is gone`);
	}
}

