"use client";
import { useState, useEffect } from "react";
import { getEvents } from "../services/eventService";
import { Event } from "../types";

export function useEvent() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  return { events };
}
