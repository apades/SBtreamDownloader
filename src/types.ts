export enum libsStatus {
  ok = 1,
  none = 0,
  err = -1,
}

export type libsType = {
  type: 'flv' | 'm3u8'
  url: string
  status: libsStatus
}

export type dykey<T = any> = {
  [k: string]: T
}

export type nstr = number | string

export type dmTypes =
  | {
      type: 'chart'
      data: {
        name: string
        content: string
        icon?: string
      }
    }
  | {
      type: 'unkown'
    }
