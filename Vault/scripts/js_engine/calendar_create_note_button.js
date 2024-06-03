/*
  const exampleEvent = {
    "utime": "1717353000",
    "time": "11:30",
    "endTime": "12:30",
    "icsName": "Name of the ICS Calendar",
    "summary": "Name of the Meeting",
    "description": "Longer description, may have escaped newlines",
    "format": {
      "checkbox": true,
      "includeEventEndTime": true,
      "icsName": true,
      "summary": true,
      "location": true,
      "description": true,
      "calendarType": "remote",
      "showAttendees": true,
      "showOngoing": false
    },
    "location": "address",
    "callUrl": "url",
    "callType": "Google Meet",
    "attendees": [
      {
        "name": "email?",
        "email": "email",
        "status": "NEEDS-ACTION", // [NEEDS-ACTION, ACCEPTED, REJECTED]
        "role": "REQ-PARTICIPANT" // [REQ-PARTICIPANT, ?]
      }
    ]
  }
*/

import { button } from './button.js';
import { MeetingManager } from './meeting_manager.js';

// Google injects a lot of description content when you create a meeting, remove it.
//
// Zoom likely does the same, but I don't have that set up right now.
const rejectedDescriptionLinePrefixes = [
  "Join with Google Meet: ",
  "Or dial: ",
  "More phone numbers: ",
  "Learn more about Meet at: ",
  "Join Zoom Meeting",
  "Join by phone",
  "Join using SIP",
  "Joining instructions: ",
  "Meeting host: "
].join("|");

const rejectedLineRegex = new RegExp(rejectedDescriptionLinePrefixes);

export function calendarCreateNoteButton (parent, icsEvent, date = new Date()) {
  const meetingManager = new MeetingManager(date);
  const meetingAlreadyExists = meetingManager.meetingExists(icsEvent.summary)
  const buttonTitle = meetingAlreadyExists ? "View Note" : "Create Note";

  return button(parent, buttonTitle, async e => {
    const summary = icsEvent.summary;

    const description = icsEvent
      .description
      .split("\n\n")
      .filter(line => !rejectedLineRegex.exec(line))
      .join("\n\n");

    const participants = icsEvent.attendees.map(a => ({
      name: a.name,
      email: a.email,
      status: a.status
    }));

    await meetingManager.createNewMeeting(summary, {
      ...icsEvent,
      date,
      description,
      participants
    });
  });
}
