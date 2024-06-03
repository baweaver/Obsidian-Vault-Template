---
<%*
// Daily note setup

const fileDate = tp.date.now('YYYY-MM-DD', 0, tp.file.title, 'YYYY-MM-DD');

const Momentary = tp.user.momentary;
const thisMoment = new Momentary(fileDate);

const today = thisMoment.englishDay();
const readableDay = thisMoment.prettyDay();
const dayName = thisMoment.dayName();
%>
date: <%  thisMoment.timestamp() %>
tags:
  - Daily
cssclasses:
  - daily
  <% "- " + dayName.toLowerCase() %>
---
# Day of <% today %>

<span class="subtitle"><% readableDay %></span>

---

## Journal

TODO

---

## Tasks

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

## Meetings

### ICS Meetings

```dataviewjs
const jsEngine = await app.plugins.getPlugin('js-engine');
const { IcsTable } = await jsEngine.api.importJs('scripts/js_engine/ics_table.js');

const today = moment('<% thisMoment.timestamp() %>');
const icsTable = new IcsTable(this, today);

const { headers, rows } = await icsTable.content();

dv.table(headers, rows);
```

### Current Notes

```dataview
TABLE file.cday as Created, summary
FROM #Meeting
WHERE
  file.cday = date(<% fileDate %>)
  AND !contains(file.path, "99 - Meta")
SORT file.ctime DESC
```

## Meta

### Created Today

```dataview
TABLE
  file.ctime AS "Created",
  file.folder AS "Folder",
  file.tags AS "Tags"
WHERE file.cday = date(<% fileDate %>)
SORT file.cday
```
