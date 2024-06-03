---
date: <% tp.date.now("YYYY-MM-DD") %>T<% tp.date.now("HH:mm") %>
tags:
  - Weekly
cssclasses:
  - <% "daily" %>
  - sunday
---
<%*

// Weekly note setup

const Momentary = tp.user.momentary;
const thisMoment = new Momentary(tp.date);

const {
  startOfWeek,
  endOfWeek,
  weekNumber,
  shortStartOfWeek,
  englishEndOfWeek
} = thisMoment.properties();

-%>
# Week <% weekNumber %>

<span class="subtitle">
  From <% shortStartOfWeek %> to <% englishEndOfWeek %>
</span>

---

## Journal

TODO

---

## Meetings

```meta-bind-button
label: New Meeting
hidden: false
class: ""
tooltip: "Create new meeting"
id: ""
style: default
actions:
  - type: templaterCreateNote
    templateFile: 99 - Meta/00 - Templates/Meeting Template.md
    folderPath: "07 - Meetings"
    fileName: TKTK
    openNote: true
```

```dataview
TABLE file.cday as Created, summary
FROM #Meeting
WHERE
  file.cday >= date(<% startOfWeek %>)
  AND file.cday <= date(<% endOfWeek %>)
  AND !contains(file.folder, "99 - Meta")
  AND !contains(file.name, "Placeholder")
SORT file.ctime DESC
```

## References

### Daily Notes

```dataview
TABLE file.mtime AS "Modified"
  FROM #daily
  WHERE
    file.cday >= date(<% startOfWeek %>)
    AND file.cday <= date(<% endOfWeek %>)
    AND !contains(file.folder, "99 - Meta")
    AND !contains(file.name, "Placeholder")
  SORT file.cday
```

#### Incomplete Tasks

```dataview
TASK
  FROM #daily
  WHERE
    file.cday >= date(<% startOfWeek %>)
    AND file.cday <= date(<% endOfWeek %>)
    AND !contains(file.folder, "99 - Meta")
    AND !contains(file.name, "Placeholder")
    AND !completed
  GROUP BY file.link
```

### Created This Week

```dataview
TABLE
  file.ctime AS "Created",
  file.folder AS "Folder",
  file.tags AS "Tags"
WHERE
  file.cday >= date(<% startOfWeek %>)
  AND file.cday <= date(<% endOfWeek %>)
  AND !contains(file.folder, "99 - Meta")
  AND !contains(file.name, "Placeholder")
SORT file.cday
```

### Modified This Week

```dataview
TABLE
  file.ctime AS "Created",
  file.folder AS "Folder",
  file.tags AS "Tags"
WHERE
  file.cday >= date(<% startOfWeek %>)
  AND file.cday <= date(<% endOfWeek %>)
  AND !contains(file.folder, "99 - Meta")
  AND !contains(file.name, "Placeholder")
SORT file.cday
```
