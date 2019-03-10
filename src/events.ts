import { contains } from './strings'
import { settings } from './settings'

const Settings = settings();

export enum Events {
  Register,
  Cancel,
  Contact
}

export namespace Events {
  export function suffix(event: Events): string {
    switch (event) {
      case Events.Register:
        return 'に参加申し込みがありました';
      case Events.Cancel:
        return 'に参加キャンセルがありました';
      case Events.Contact:
        return 'に関するお問い合わせ';
    }
  }

  export function color(event: Events): string {
    switch (event) {
      case Events.Register:
        return '#00FF00';
      case Events.Cancel:
        return '#FF0000';
      case Events.Contact:
        return '#0000FF';
    }
  }

  export function emoticon(event: Events): string {
    switch (event) {
      case Events.Register:
        return ':tada:';
      case Events.Cancel:
        return ':x:';
      case Events.Contact:
        return ':email:';
    }
  }

  export function webhookURL(event: Events): string {
    switch (event) {
      case Events.Register:
        return Settings.registerWebHookURL;
      case Events.Cancel:
        return Settings.cancelWebHookURL;
      case Events.Contact:
        return Settings.contactWebHookURL;
    }
  }

  export function channel(event: Events): string {
    switch (event) {
      case Events.Register:
        return Settings.registerNotificationChannel;
      case Events.Cancel:
        return Settings.cancelNotificationChannel;
      case Events.Contact:
        return Settings.contactNotificationChannel;
    }
  }

  export function all(): [Events] {
    return Object.keys(Events).map(
      k => Events[k]
    ) as [Events];
  }

}

export function matchedEvent(subject: string): Events {
  var all = Events.all();
  var e;
  all.forEach(function (event) {
    if (contains(subject, Events.suffix(event))) {
      e = event;
    }
  });
  return e;
}

export function expectedEvent(subject: string): boolean {
  var all = Events.all();
  var result = false;
  all.forEach(function (event) {
    result = result || contains(subject, Events.suffix(event));
  });
  return result;
}

