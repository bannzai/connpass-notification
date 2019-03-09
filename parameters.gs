function searchWord() {
  return 'from: no-reply@connpass.com ' + Settings.eventName;
}

function isContact(event) {
  return event.value == EVENTS.CONTACT.value;
}

function isRegisterOrCancel(event) {
  return event.value == EVENTS.REGISTER.value || event.value == EVENTS.CANCEL.value;
}

function buildFields(event, messageHTMLBody) {
  if (isContact(event)) {
    return [
      {
        "title": "Contact Source Address",
        "value":  extractContactSourceAddress(messageHTMLBody),
      }, 
      {
        "title": "Contact Source Name",
        "value": extractContactSourceName(messageHTMLBody)
      }
    ]
  } 
  if (isRegisterOrCancel(event)) {
    return [
      {
        "title": "User Link",
        "value":  extractUserNameLink(messageHTMLBody),
      }, 
      {
        "title": "User Name",
        "value": extractUserName(messageHTMLBody)
      }
    ]
  }
}

function channelName(event) {
  if (isContact(event)) {
    return Settings.contactNotifyChannel;
  } 
  if (isRegisterOrCancel(event)) {
    return Settings.registerOrCancelNotifyChannel; 
  }
}

function webhookURL(event) {
  if (isContact(event)) {
    return Settings.registerOrCancelWebHookURL;
  } 
  if (isRegisterOrCancel(event)) {
    return Settings.contactWebHookURL; 
  }
}
