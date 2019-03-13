import { Events } from './events'
import { extractContactSourceAddress, extractContactSourceName, extractUserNameLink, extractUserName, extractEventName, extractEventLink, extractEventNameForContact, extractEventLinkForContact, extractEventNameForRegister, extractEventLinkForRegister, extractEventNameForCancel, extractEventLinkForCancel } from './extractor'

function isContact(event: Events) {
  return event == Events.Contact;
}

function isRegisterOrCancel(event: Events) {
  return event == Events.Register || event == Events.Cancel;
}

export function buildFields(event: Events, messageHTMLBody: string) {
  switch (event) {
    case Events.Register:
      return [
        {
          "title": "User Link",
          "value": extractUserNameLink(messageHTMLBody),
        },
        {
          "title": "User Name",
          "value": extractUserName(messageHTMLBody)
        },
        {
          "title": extractEventNameForRegister(messageHTMLBody),
          "value": extractEventLinkForRegister(messageHTMLBody)
        }
      ];
    case Events.Cancel:
      return [
        {
          "title": "User Link",
          "value": extractUserNameLink(messageHTMLBody),
        },
        {
          "title": "User Name",
          "value": extractUserName(messageHTMLBody)
        },
        {
          "title": extractEventNameForCancel(messageHTMLBody),
          "value": extractEventLinkForCancel(messageHTMLBody)
        }
      ];
    case Events.Contact:
      return [
        {
          "title": "Contact Source Address",
          "value": extractContactSourceAddress(messageHTMLBody),
        },
        {
          "title": "Contact Source Name",
          "value": extractContactSourceName(messageHTMLBody)
        },
        {
          "title": extractEventNameForContact(messageHTMLBody),
          "value": extractEventLinkForContact(messageHTMLBody)
        }
      ];
  }
}