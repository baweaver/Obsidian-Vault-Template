---
date: <%tp.date.now("YYYY-MM-DD")%>T<%tp.date.now("HH:mm")%>
tags:
  - Daily
cssclasses:
  - daily
  <% "- " + tp.date.now("dddd", 0, tp.file.title, "YYYYMMDD").toLowerCase() %>
---

<%*

// Daily note setup

const today = tp.date.now("MM-DD-YYYY");
const readableDay = tp.date.now("dddd, MMMM Do, YYYY", 0, tp.file.title, "YYYYMMDD");

%>

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

## Meta

### Created Today

```dataview
TABLE
  file.ctime AS "Created",
  file.folder AS "Folder",
  file.tags AS "Tags"
WHERE file.ctime = this.file.ctime
SORT file.cday
```