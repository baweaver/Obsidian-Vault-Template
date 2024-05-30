---
date: <%tp.date.now("YYYY-MM-DD")%>T<%tp.date.now("HH:mm")%>
tags:
  - Daily
cssclasses:
  - daily
  <% "- " + tp.date.now("dddd", 0, tp.file.title, "YYYYMMDD").toLowerCase() %>
---

# Day of <%tp.date.now("MM-DD-YYYY")%>

<span class="subtitle">
  <% tp.date.now("dddd, MMMM Do, YYYY", 0, tp.file.title, "YYYYMMDD") %>
</span>

***

## Journal

TODO

***

## Tasks

- [ ] Task 1
- [ ] Task 2
- [ ] Task 3