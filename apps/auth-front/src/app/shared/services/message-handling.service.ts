import { Injectable, signal } from '@angular/core'
import { AsyncErrorModel, ErrorModel, isAsyncErrorModel } from '../models/error.model'
import { formatDate } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class MessageHandlingService {
  readonly dataErrors = signal<string[]>([])
  readonly dataInfos = signal<string[]>([])

  sendError(error: string) {
    const errorDateTime = formatDate(new Date(), 'dd.MM.yyyy HH:mm:ss', 'uk-UA')
    this.dataErrors.update((errors) => errors.concat([`${errorDateTime}: ${error}`]))
  }

  sendInfo(info: string) {
    const infoDateTime = formatDate(new Date(), 'dd.MM.yyyy HH:mm:ss', 'uk-UA')
    this.dataInfos.update((infos) => infos.concat([`${infoDateTime}: ${info}`]))
  }

  async alertError(error: ErrorModel | AsyncErrorModel, msg: string = 'Щось не так') {
    const errorText = isAsyncErrorModel(error)
      ? `${msg}: ${JSON.parse(await error.error.text()).detail}`
      : `${msg}: ${error.error.detail}`

    this.sendError(errorText)
  }

  async alertFileError(error: AsyncErrorModel) {
    await this.alertError(error, 'Не вдалося завантажити файл із серверу')
  }

  removeError(error: string) {
    this.dataErrors.update((errors) => errors.filter((e) => e !== error))
  }

  removeInfo(info: string) {
    this.dataInfos.update((infos) => infos.filter((i) => i !== info))
  }

  clearAll() {
    this.dataErrors.set([])
    this.dataInfos.set([])
  }
}
