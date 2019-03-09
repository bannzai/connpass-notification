var Settings = settings();

function main() {
  var threads = GmailApp.search(searchWord());
  var count = threads.length;
  
  for (var i = 0; i < count; i++) {
    thread = threads[i];
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
  var subject = thread.getFirstMessageSubject();
  if (!expectedEvent(subject)) {
    console.log(Utilities.formatString("Unexpected mail subject, got %s", subject));
    return;
  }
  var event = matchedEvent(subject);
  var messageHTMLBody = thread.getMessages()[0].getBody();
  var permanentLink = thread.getPermalink();
  var timestamp = thread.getLastMessageDate().getTime() / 1000;
  
  var jsonPayload = {
    "fallback": "Notfify connpass events from gmail",
    "channel" : channelName(event),
    "username" : Settings.appName,
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
  var payload = JSON.stringify(jsonPayload);
  var options =
      {
        "method" : "post",
        "contentType" : "application/json",
        "payload" : payload,
        "muteHttpExceptions": true
      };
  
  var response = UrlFetchApp.fetch(webhookURL(event), options);
  var responseCode = response.getResponseCode();
  var responseBody = response.getContentText();
  
  if (responseCode != 200) {
    console.log(Utilities.formatString("Request failed. Expected 200, got %d: %s", responseCode, responseBody));
  }
}
