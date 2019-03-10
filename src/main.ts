import { settings } from './settings'
import { Events, matchedEvent, expectedEvent } from './events'
import { buildFields } from './parameters'

const Settings = settings();

var max: number = null;
function dryRun() {
  max = 1;
  main();
}

function main() {
  let threads = GmailApp.search(Settings.searchWord);
  let count = threads.length;
  if (max != null && count != 0) {
    count = max;
  }

  for (let i = 0; i < count; i++) {
    let thread = threads[i];
    if (!thread.isUnread()) {
      // While already read mail.
      break;
    }
    sendIfExpected(thread)
    thread.markRead();
  };
}

function sendIfExpected(thread: GoogleAppsScript.Gmail.GmailThread) {
  let subject = thread.getFirstMessageSubject();
  if (!expectedEvent(subject)) {
    console.log(Utilities.formatString("Unexpected mail subject, got %s", subject));
    return;
  }
  let event = matchedEvent(subject);
  let messageHTMLBody = thread.getMessages()[0].getBody();
  let permanentLink = thread.getPermalink();
  let timestamp = thread.getLastMessageDate().getTime() / 1000;

  let jsonPayload = {
    "fallback": "Notfify connpass events from gmail",
    "channel": Events.channel(event),
    "username": Settings.appName,
    "attachments": [
      {
        "color": Events.color(event),
        "title": Events.emoticon(event) + subject,
        "title_link": permanentLink,
        "fields": buildFields(event, messageHTMLBody),
        "ts": timestamp
      }
    ],
  };
  let payload = JSON.stringify(jsonPayload);
  let options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    "method": "post",
    "contentType": "application/json",
    "payload": payload,
    "muteHttpExceptions": true
  };

  let response = UrlFetchApp.fetch(Events.webhookURL(event), options);
  let responseCode = response.getResponseCode();
  let responseBody = response.getContentText();

  if (responseCode != 200) {
    console.log(Utilities.formatString("Request failed. Expected 200, got %d: %s", responseCode, responseBody));
  }
}
