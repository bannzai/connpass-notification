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