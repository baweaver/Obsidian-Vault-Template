---
date: <% tp.date.now("YYYY-MM-DD") %>T<% tp.date.now("HH:mm") %>
tags:
  - Weekly
cssclasses:
  - <% "daily" %>
  - sunday
---
# Week <% tp.date.now('WW') %>

<span class="subtitle">
  From <% tp.date.weekday('MM-DD', 1) %> to
  <% tp.date.weekday('MM-DD-YYYY', 7) %>
</span>

***

## Journal

TODO

***

## References

### Daily Notes

```dataview
TABLE file.mtime AS "Modified"
  FROM #daily
  WHERE
    file.cday >= date(<% tp.date.weekday('YYYY-MM-DD', 1) %>)
      AND file.cday <= date(<% tp.date.weekday('YYYY-MM-DD', 7) %>)
  SORT file.cday
```

#### Incomplete Tasks

```dataview
TASK
  FROM #daily
  WHERE
    file.cday >= date(<% tp.date.weekday('YYYY-MM-DD', 1) %>)
      AND file.cday <= date(<% tp.date.weekday('YYYY-MM-DD', 7) %>)
	  AND !completed
  GROUP BY file.link
```

### Created This Week

```dataview
TABLE file.ctime AS "Created", file.folder AS "Folder"
  WHERE (
    date(file.ctime).weekyear = <% tp.date.now('WW') %>
  )
  SORT file.cday
```

### Modified This Week

```dataview
TABLE file.ctime AS "Created", file.folder AS "Folder"
  WHERE (
    date(file.mtime).weekyear = <% tp.date.now('WW') %> AND
    date(file.ctime).weekyear != <% tp.date.now('WW') %> 
  )
  SORT file.cday
```