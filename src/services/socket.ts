import { io, type Socket } from "socket.io-client";

import { apiBaseUrl } from "@/services/api";

export type RealtimeEvent =
  | "message:new"
  | "agent:typing"
  | "ingestion:progress"
  | "agent:activity"
  | "approval:changed"
  | "dashboard:refresh"
  | "notification:new";

let socket: Socket | null = null;

export function getRealtimeSocket(token?: string) {
  if (socket) {
    return socket;
  }

  socket = io(apiBaseUrl, {
    autoConnect: false,
    transports: ["websocket"],
    auth: token ? { token } : undefined,
  });

  return socket;
}
