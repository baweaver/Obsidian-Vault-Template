# Meetings MOC

**Template**: [[Meeting Template]]

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

## ICS Meetings for Today


```dataviewjs
const jsEngine = await app.plugins.getPlugin('js-engine');
const { IcsTable } = await jsEngine.api.importJs('scripts/js_engine/ics_table.js');
const icsTable = new IcsTable(this);

const { headers, rows } = await icsTable.content();

dv.table(headers, rows);
```

## Meeting Notes

```dataview
TABLE file.cday as Created, summary
FROM "07 - Meetings" and -#MOC
SORT file.cday DESC
```
