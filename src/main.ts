let Settings = settings();

function main() {
  let threads = GmailApp.search(Settings.searchWord);
  let count = threads.length;

  for (let i = 0; i < count; i++) {
    let thread = threads[i];
    //      if (!thread.isUnread()) {
    //      // While already read mail.
    //      break;
    //    }
    if (i > 10) {
      return;
    }
    sendIfExpected(thread)
    thread.markRead();
  };
}

function sendIfExpected(thread) {
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
    "channel": event.channel,
    "username": Settings.appName,
    "attachments": [
      {
        "color": event.color,
        "title": event.emoticon + subject,
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

  let response = UrlFetchApp.fetch(event.webhookURL, options);
  let responseCode = response.getResponseCode();
  let responseBody = response.getContentText();

  if (responseCode != 200) {
    console.log(Utilities.formatString("Request failed. Expected 200, got %d: %s", responseCode, responseBody));
  }
}
