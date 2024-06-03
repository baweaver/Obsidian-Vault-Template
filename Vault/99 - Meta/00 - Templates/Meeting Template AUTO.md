---
<%*
  const context = window.meeting;
  const defaultValues = {
    area: '',
    project: '',
    summary: 'TODO',
    description: 'TODO',
    participants: [],
    participantNames: []
  };

  const localContext = {};

  Object.keys(defaultValues).forEach(k => {
    localContext[k] = context[k] || defaultValues[k];
  });

  // Won't work with an array, tried it.
  localContext.participantNames = localContext
    .participants
    .map(p => `  - ${p.name}`)
    .join("\n");

  let participantList = localContext
    .participants
    .map(p => `- ${p.name} (${p.email}) - ${p.status}`)
    .join("\n")

  if (!participantList.length) {
    participantList = "No participants";
  }

  delete window.meeting;
-%>
date: <% tp.file.creation_date() %>
type: "meeting"
aliases:
area: "<% localContext.area %>"
project: "<% localContext.project %>"
participants:
<% localContext.participantNames %>
summary: "<% localContext.summary %>"
tags:
  - Meeting
---
# <% tp.file.title %>

<% localContext.description %>

## Participants

<% participantList %>

## Agenda

* TODO

## Notes

* TODO

## Action Items

* TODO
