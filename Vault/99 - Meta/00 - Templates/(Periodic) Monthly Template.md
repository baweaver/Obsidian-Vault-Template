---
date: <% tp.date.now("YYYY-MM-DD") %>T<% tp.date.now("HH:mm") %>
tags:
  - Monthly
cssclasses:
  - <%
  - '"daily"'
  - "%>"
  - monday
---
<%*

// Weekly note setup

const dateFormat = 'YYYY-MM-DD';

const now = tp.date.now(dateFormat);
const nowMoment = moment(now, dateFormat);

const monthNumber = tp.date.now('MM');

const startOfMonth = nowMoment.startOf('month').format(dateFormat);
const endOfMonth = nowMoment.endOf('month').format(dateFormat);

const monthName = tp.date.now('MMMM');

%>
# Month of <% monthName %>

<span class="subtitle">
  From <% startOfMonth %> to <% endOfMonth %>
</span>

---

## Journal

TODO

---

## References

### Weekly Notes

```dataview
TABLE file.mtime AS "Modified"
  FROM #weekly
  WHERE
    file.cday >= date(<% startOfMonth %>)
    AND file.cday <= date(<% endOfMonth %>)
  SORT file.cday
```

#### Incomplete Tasks

```dataview
TASK
  FROM #daily
  WHERE
    file.cday >= date(<% startOfMonth %>)
    AND file.cday <= date(<% endOfMonth %>)
    AND !completed
  GROUP BY file.link
```

### Created This Month

```dataview
TABLE
  file.ctime AS "Created",
  file.folder AS "Folder",
  file.tags AS "Tags"
WHERE
  date(file.ctime).month = <% monthNumber %>
  AND !contains(file.folder, "99 - Meta")
  AND !contains(file.name, "Placeholder")
SORT file.cday
```

### Modified This Month

```dataview
TABLE
  file.ctime AS "Created",
  file.folder AS "Folder",
  file.tags AS "Tags"
WHERE
  date(file.mtime).month = <% monthNumber %>
  AND date(file.ctime).month != <% monthNumber %>
  AND !contains(file.folder, "99 - Meta")
  AND !contains(file.name, "Placeholder")
SORT file.cday
```