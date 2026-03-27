import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { getRealtimeSocket } from "@/services/socket";

type ConnectionState = "simulated" | "connecting" | "connected";

export function useRealtime(token?: string) {
  const queryClient = useQueryClient();
  const [connectionState, setConnectionState] =
    useState<ConnectionState>("simulated");

  useEffect(() => {
    const socket = getRealtimeSocket(token);

    if (!import.meta.env.VITE_API_URL) {
      const interval = window.setInterval(() => {
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      }, 30000);

      setConnectionState("simulated");

      return () => window.clearInterval(interval);
    }

    setConnectionState("connecting");
    socket.connect();

    socket.on("connect", () => setConnectionState("connected"));
    socket.on("disconnect", () => setConnectionState("connecting"));
    socket.on("dashboard:refresh", () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    });
    socket.on("notification:new", () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    });
    socket.on("approval:changed", () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("dashboard:refresh");
      socket.off("notification:new");
      socket.off("approval:changed");
      socket.disconnect();
    };
  }, [queryClient, token]);

  return useMemo(
    () => ({
      connectionState,
      label:
        connectionState === "connected"
          ? "Live updates"
          : connectionState === "connecting"
            ? "Connecting realtime"
            : "Simulated live feed",
    }),
    [connectionState],
  );
}
