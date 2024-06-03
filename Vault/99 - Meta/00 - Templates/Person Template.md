---
email:
level:
role:
relation:
company:
organization:
team:
tags:
---
<% await tp.file.rename(tp.file.title) -%>
# [[<% tp.file.title %>]]
## Summary

TODO

## Notes

TODO

## References

### Meetings


```dataviewjs
const currentPath = dv.current().file.path;
const currentName = dv.current().file.name;

const meetings = dv
  .pages('#Meeting')
  .where(meeting => {
    if (!meeting.participants) return false;

    return meeting.participants.some(participant => {
      switch(typeof participant) {
        case 'object':
          return currentPath === participant.path;
        case 'string':
          return currentName === participant;
        default:
          return false;
      }
    });
  });

const meetingRows = meetings
  .map(m => {
    return [m.file.link, m.summary, m.participants]
  });

dv.table(["Link", "Summary", "Participants"], meetingRows);
```
