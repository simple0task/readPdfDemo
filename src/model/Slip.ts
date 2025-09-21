// Interface for Slip
export interface ISlip {
  slipId: number // ＩＤ
  slipName: string // 名前
  slipText: string // テキスト
  lastUpdated: string // 更新日時
  updateUser: string // 更新ユーザ
}

// Class for Slip implementing ISlip
export class Slip implements ISlip {
  slipId = 0
  slipName = ''
  slipText = ''
  lastUpdated = ''
  updateUser = ''
}
