import { observable, action } from 'mobx'

import config from 'config'

import logger from './logger'

type SubscriptionCallback<T> = (data: T) => void

class Socket {

	private _url: string
	private _socket: WebSocket
	private _subscriptions: Map<string, Set<SubscriptionCallback<any>>> = new Map()

	@observable public $connected: boolean = false

	public constructor(url: string) {
		this._url = url
	}

	public connect() {
		logger.info(`socket connecting to '${this._url}'`)

		this._socket = new WebSocket(this._url)

		this._socket.addEventListener('open', this._onOpen)
		this._socket.addEventListener('close', this._onClose)
		this._socket.addEventListener('message', this._onMessage)
	}

	public send(data: string) {
		this._socket.send(data)
	}

	public once<T>(messageType: string, callback: SubscriptionCallback<T>) {
		const wrapper = (data: T) => {
			callback(data)
			this.unsubscribe(messageType, wrapper)
		}

		this.subscribe(messageType, wrapper)
	}

	public subscribe<T>(messageType: string, callback: SubscriptionCallback<T>) {
		let subscriptions: Set<SubscriptionCallback<any>> | undefined = this._subscriptions.get(messageType)
		if (subscriptions === undefined) {
			subscriptions = new Set()
			subscriptions.add(callback)
			this._subscriptions.set(messageType, subscriptions)
		}
		else {
			subscriptions.add(callback)
		}
	}

	public unsubscribe(messageType: string, callback: SubscriptionCallback<any>) {
		let subscriptions: Set<SubscriptionCallback<any>> | undefined = this._subscriptions.get(messageType)
		if (subscriptions !== undefined) {
			subscriptions.delete(callback)
			if (subscriptions.size === 0) {
				this._subscriptions.delete(messageType)
			}
		}
	}

	@action
	private _onOpen = () => {
		logger.info('socket connected')

		this.$connected = true
	}

	@action
	private _onClose = () => {
		logger.info('socket disconnected')

		this.$connected = false
	}

	private _onMessage = (event: MessageEvent) => {
		const lines: string[] = (event.data as string || '').split('\n')
		if (lines.length === 0) return

		let data: any
		try {
			data = JSON.parse(lines.slice(1).join('\n'))
		}
		catch (ex) {
			logger.debug(`socket failed to parse message: ${event.data}`)
		}

		if (lines[0].startsWith('corr:')) {

		}
		else {
			const subscriptions: Set<SubscriptionCallback<any>> | undefined = this._subscriptions.get(lines[0])
			if (subscriptions !== undefined) {
				subscriptions.forEach(callback => callback(data))
			}
		}
	}

}

export default new Socket(config.socketUrl)
