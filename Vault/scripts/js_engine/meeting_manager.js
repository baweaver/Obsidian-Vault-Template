const defaultConfig = {
  meetingDir: "07 - Meetings",
  meetingTemplatePath: "99 - Meta/00 - Templates/Meeting Template AUTO.md",
  area: '',
  project: '',
  summary: '',
  description: '',
  participants: []
};

const supportedMetaKeys = [
  'area',
  'project',
  'participants',
  'summary',
  'description'
];

export class MeetingManager {
  constructor(date = new Date(), overrides = {}) {
    this.date = date;
    this.timestamp = moment(date).format('YYYY-MM-DD');
    this.config = {};

    Object.keys(defaultConfig).forEach(k => {
      this.config[k] = overrides[k] || defaultConfig[k];
    })

    this.meetingDir = this.config.meetingDir;
    this.meetingTemplatePath = this.config.meetingTemplatePath;
    this.meetingTemplate = this.getFile(this.meetingTemplatePath);
  }

  getFile(file) {
    return app.vault.getAbstractFileByPath(file);
  }

  fullMeetingName(meetingName) {
    return `${this.timestamp} ${meetingName}`;
  }

  fullMeetingPath(meetingName) {
    return `${this.meetingDir}/${this.fullMeetingName(meetingName)}.md`
  }

  async openMeeting(meetingName) {
    const fullMeetingPath = this.fullMeetingPath(meetingName);
    const existingMeeting = this.getFile(fullMeetingPath);

    if (!existingMeeting) return false;

    return await this.openFile(this.getFile(existingMeeting));
  }

  meetingExists(meetingName) {
    const fullMeetingPath = this.fullMeetingPath(meetingName);
    const existingMeeting = this.getFile(fullMeetingPath);

    return !!existingMeeting;
  }

  async createNewMeeting(meetingName, params) {
    const fullMeetingPath = this.fullMeetingPath(meetingName);
    const existingMeeting = this.getFile(fullMeetingPath);

    if (existingMeeting) {
      return await this.openFile(existingMeeting);
    }

    const metaInformation = {};
    supportedMetaKeys.forEach(k => {
      metaInformation[k] = params[k] || this.config[k];
    });

    // Stupid hack, deleted later in the template
    window.meeting = metaInformation;

    // Create the meeting
    const { templater } = app.plugins.getPlugin('templater-obsidian');

    const newMeeting = await templater.create_new_note_from_template(
      this.meetingTemplate,
      this.meetingDir,
      this.fullMeetingName(meetingName),
      false // open after
    );

    return await this.openFile(newMeeting);
  }

  async openFile(file) {
    // May be able to delete all of this later
    const active_leaf = app.workspace.getLeaf(false);

    if (!active_leaf) {
      log_error(new TemplaterError("No active leaf"));
      return;
    }

    await active_leaf.openFile(file, {
      state: { mode: "source" },
    });
  }
}
