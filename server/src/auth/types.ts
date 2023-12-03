import { Socket } from 'socket.io'

export type AuthPayload = { userId: string; username: string }

export type SocketWithAuth = Socket & AuthPayload
