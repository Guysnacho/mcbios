/** The suite's public schedule (`GET /api/schedule`): published, scheduled sessions only. Never contains an email. */

export type ScheduleKind = "talk" | "keynote" | "workshop" | "panel" | "poster" | "break" | "social" | "other";

export type ScheduleSpeaker = {
  name: string;
  title?: string;
  department?: string;
  affiliation?: string;
  /** The talk this speaker gives, when the session has several */
  talk?: string;
  urls?: string[];
};

export type ScheduleSession = {
  id: string;
  title: string;
  description: string;
  kind: ScheduleKind;
  /** ISO instants (UTC) */
  starts_at: string;
  ends_at: string;
  room_id: string | null;
  track_id: string | null;
  speakers: ScheduleSpeaker[];
};

export type ScheduleRoom = { id: string; name: string; sort: number };
export type ScheduleTrack = { id: string; name: string; color: string; sort: number };

/** The org's admin-chosen colours: `{}` (use the site's look) or all five, validated for WCAG AA by the suite. */
export type ScheduleTheme = { bg?: string; fg?: string; surface?: string; accent?: string; accent_fg?: string; preset?: string };

export type Schedule = {
  /** IANA zone the schedule is written in, e.g. America/Chicago */
  timezone: string;
  theme: ScheduleTheme;
  rooms: ScheduleRoom[];
  tracks: ScheduleTrack[];
  sessions: ScheduleSession[];
  /** Changes whenever anything shown changes; also the ETag */
  version: string;
};

export type Filters = {
  track: string | null;
  room: string | null;
  /** Free text over title, description, speaker names and affiliations */
  text: string;
  /** Only the sessions in my agenda */
  mine: boolean;
};
