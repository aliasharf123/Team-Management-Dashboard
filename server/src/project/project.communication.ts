// communication.service.ts
import { Injectable } from '@nestjs/common'
import { Server } from 'socket.io'

@Injectable()
export class ProjectCommunication {
  private projectNamespace: Server
  private userIdMap: Record<string, string>

  setProjectNamespace(namespace: Server) {
    this.projectNamespace = namespace
  }
  setUserIdMap(userIdMap: Record<string, string>) {
    this.userIdMap = userIdMap
  }

  sendEventToProjectNamespace(projectId: string, value: any, event: string) {
    this.projectNamespace.to(projectId).emit(event, value)
  }
}
