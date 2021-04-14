export enum Environment {
  LOCAL = 'local',
  TESTING = 'testing',
  DEV = 'dev',
  STAGING = 'staging',
  LIVE = 'live',
}

export enum ChatPlatformEType {
  SLACK = 'slack',
  HANGOUTS = 'hangouts',
  MSTEAMS = 'msteams',
}

export enum ChatPlatformETypeName {
  slack = 'Slack',
  hangouts = 'Hangouts',
  msteams = 'MSTeams',
}

export enum ChatPlatformETypeFullName {
  slack = 'Slack',
  hangouts = 'Hangouts Chat',
  msteams = 'Microsoft Teams',
}

export enum Language {
  SPANISH = 'es',
  ENGLISH = 'en',
}

export enum LanguageName {
  es = 'Español',
  en = 'English',
}

export enum ExpectedAnswerEType {
  AFFIRMATIVE = 'affirmative',
  NEGATIVE = 'negative',
  SNOOZE = 'snooze',
  HELLO = 'hello',
  CANCEL = 'cancel',
  BACK = 'back',
  WEB = 'web',
}