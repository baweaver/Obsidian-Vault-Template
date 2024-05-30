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

const startOfWeek = tp.date.weekday('YYYY-MM-DD', 1);
const endOfWeek = tp.date.weekday('YYYY-MM-DD', 7);

const shortStartOfWeek = tp.date.weekday('MM-DD', 1);
const readableEndOfWeek = tp.date.weekday('MM-DD-YYYY', 7);

const weekNumber = tp.date.now('WW');

%>
# Week <% weekNumber %>

<span class="subtitle">
  From <% shortStartOfWeek %> to <% readableEndOfWeek %>
</span>

---

## Journal

TODO

---

## References

### Daily Notes

```dataview
TABLE file.mtime AS "Modified"
  FROM #daily
  WHERE
    file.cday >= date(<% startOfWeek %>)
    AND file.cday <= date(<% endOfWeek %>)
  SORT file.cday
```

#### Incomplete Tasks

```dataview
TASK
  FROM #daily
  WHERE
    file.cday >= date(<% startOfWeek %>)
    AND file.cday <= date(<% endOfWeek %>)
    AND !completed
  GROUP BY file.link
```

### Created This Week

```dataview
TABLE
  file.ctime AS "Created",
  file.folder AS "Folder",
  file.tags AS "Tags"
WHERE date(file.ctime).weekyear = <% weekNumber %>
SORT file.cday
```

### Modified This Week

```dataview
TABLE
  file.ctime AS "Created",
  file.folder AS "Folder",
  file.tags AS "Tags"
WHERE
  date(file.mtime).weekyear = <% weekNumber %> AND
  date(file.ctime).weekyear != <% weekNumber %> 
SORT file.cday
```