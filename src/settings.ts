interface _Settings {
  appName: string
  searchWord: string
  registerWebHookURL: string
  registerNotificationChannel: string
  cancelWebHookURL: string
  cancelNotificationChannel: string
  contactWebHookURL: string
  contactNotificationChannel: string
}

function settings(): _Settings {
  return {
    'appName': 'Gmail',
    'searchWord': 'from: no-reply@connpass.com',
    'registerWebHookURL': 'https://hooks.slack.com/services/XXXXXXXXX/YYYYYYYYY/ZZZZZZZZZZZZZZZZZZZZZZZZ',
    'registerNotificationChannel': '#registerOrCancel-channel',
    'cancelWebHookURL': 'https://hooks.slack.com/services/XXXXXXXXX/YYYYYYYYY/ZZZZZZZZZZZZZZZZZZZZZZZZ',
    'cancelNotificationChannel': '#registerOrCancel-channel',
    'contactWebHookURL': 'https://hooks.slack.com/services/XXXXXXXXX/YYYYYYYYY/ZZZZZZZZZZZZZZZZZZZZZZZZ',
    'contactNotificationChannel': '#contact-channel'
  }
}