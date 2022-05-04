import { writeFileSync } from 'fs-extra'
import got from 'got'
import { libsStatus, libsType, nstr } from '../types'

export type cc_clarity = 'high' | 'ultra' | 'standard'
export async function cc_getInfo(
  id: nstr,
  clarity: cc_clarity = 'high'
): Promise<libsType> {
  let url = '',
    status = libsStatus.ok

  try {
    var infoData = JSON.parse(
      (
        await got.get(
          `https://api.cc.163.com/v1/activitylives/anchor/lives?anchor_ccid=${id}`
        )
      ).body
    )

    let channel_id = infoData.data[id].channel_id
    if (channel_id) {
      var cinfo = JSON.parse(
        (
          await got.get(
            `https://cc.163.com/live/channel/?channelids=${channel_id}`
          )
        ).body
      )
      let flvListInfo = cinfo.data[0].quickplay.resolution
      let clarities: cc_clarity[] = ['ultra', 'high', 'standard']
      let isLowMode = false
      clarities.find((cla) => {
        let vinfo = flvListInfo[cla]
        if (!vinfo) isLowMode = true
        if (vinfo && (clarity === cla || isLowMode)) {
          url = vinfo.cdn.ks
        }
      })
    } else {
      status = libsStatus.none
    }
  } catch (error) {
    try {
      writeFileSync('info.json', JSON.stringify(infoData))
      writeFileSync('cinfo.json', JSON.stringify(cinfo))
    } catch (error) {
      //
    }
    status = libsStatus.err
    throw Error(error)
  }

  return {
    type: 'flv',
    url,
    status,
  }
}

export async function cc_getdm() {}
