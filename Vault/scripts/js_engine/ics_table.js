import { calendarCreateNoteButton } from './calendar_create_note_button.js'

export class IcsTable {
  constructor(parent, date = new Date()) {
    this.parent = parent;
    this.date = date;
  }

  async icsPlugin() {
    return await app.plugins.getPlugin('ics');
  }

  async events() {
    const ics = await this.icsPlugin();
    return await ics.getEvents(this.date);
  }

  async content() {
    const headers = ['summary', 'time', 'location', 'attendees', ''];
    const currentEvents = await this.events();

    const rows = currentEvents.map(event => {
      const time = `${event.time} to ${event.endTime}`;
      const attendees = event.attendees.map(a => `${a.name}: ${a.status}`);
      const createButton = calendarCreateNoteButton(this.parent, event);

      return [event.summary, time, event.location, attendees, createButton];
    });

    return { headers, rows };
  }
}
