export enum Environment {
  LOCAL = 'local',
  TESTING = 'testing',
  DEV = 'dev',
  STAGING = 'staging',
  LIVE = 'live',
}

export enum ChatPlatformEType {
  SLACK = 'slack',
  GCHAT = 'gchat',
  MSTEAMS = 'msteams',
}

export enum ChatPlatformETypeName {
  slack = 'Slack',
  gchat = 'GChat',
  msteams = 'MSTeams',
}

export enum ChatPlatformETypeFullName {
  slack = 'Slack',
  gchat = 'Google Chat',
  msteams = 'Microsoft Teams',
}

export enum LanguageEType {
  SPANISH = 'es',
  ENGLISH = 'en',
}

export enum LanguageETypeName {
  es = 'Español',
  en = 'English',
}

export enum ExpectedAnswerEType {
  AFFIRMATIVE = 'affirmative',
  NEGATIVE = 'negative',
  CANCEL = 'cancel',
  BACK = 'back',
}