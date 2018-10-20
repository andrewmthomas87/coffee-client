import { observable, computed, action, autorun } from 'mobx'
import socket from './socket'

interface IAuthStatus {
	Auth: boolean
}

class State {

	@observable private _$auth: boolean | undefined = undefined

	@computed public get $loaded(): boolean {
		return this._$auth !== undefined
	}

	@computed public get $auth(): boolean {
		return !!this._$auth
	}

	public constructor() {
		autorun(this._onSocketConnectedChange)
	}

	private _onSocketConnectedChange = () => {
		if (socket.$connected) {
			socket.once('status.auth', this._onAuth)
		}
		else {
			this._reset()
		}
	}

	@action
	private _onAuth = (status: IAuthStatus) => {
		this._$auth = status.Auth
	}

	@action
	private _reset() {
		this._$auth = undefined
	}

}

export default new State()
