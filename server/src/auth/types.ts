import { Socket } from 'socket.io'
import { Project } from 'src/project/schemas/project.schema'

export type AuthPayload = { userId: string; username: string }

export type SocketWithAuth = Socket &
  AuthPayload & { joinedProjects: Project[] }

export type AdminSocket = SocketWithAuth & { project: Project }
