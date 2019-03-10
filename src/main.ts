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
  const threads = GmailApp.search(Settings.searchWord);
  let count = threads.length;
  if (max != null && count != 0) {
    count = max;
  }

  for (let i = 0; i < count; i++) {
    const thread = threads[i];
    if (!thread.isUnread()) {
      // While already read mail.
      break;
    }
    sendIfExpected(thread)
    thread.markRead();
  };
}

function sendIfExpected(thread: GoogleAppsScript.Gmail.GmailThread) {
  const subject = thread.getFirstMessageSubject();
  if (!expectedEvent(subject)) {
    console.log(Utilities.formatString("Unexpected mail subject, got %s", subject));
    return;
  }
  const event = matchedEvent(subject);
  const permanentLink = thread.getPermalink();
  const timestamp = thread.getLastMessageDate().getTime() / 1000;
  const messages = thread.getMessages();

  for(const message of messages){
    const messageHTMLBody = message.getBody();
    if(!message.isUnread){
      continue
    }
    const jsonPayload = {
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
    const payload = JSON.stringify(jsonPayload);
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      "method": "post",
      "contentType": "application/json",
      "payload": payload,
      "muteHttpExceptions": true
    };
  
    const response = UrlFetchApp.fetch(Events.webhookURL(event), options);
    const responseCode = response.getResponseCode();
    const responseBody = response.getContentText();
  
    if (responseCode != 200) {
      console.log(Utilities.formatString("Request failed. Expected 200, got %d: %s", responseCode, responseBody));
    }
  }  
}
