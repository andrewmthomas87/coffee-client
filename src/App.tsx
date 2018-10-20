import * as React from 'react'
import { observer } from 'mobx-react'

import state from 'services/state'

import Loading from 'global/Loading'

import SignedOut from 'signed-out/SignedOut'
import SignedIn from 'signed-in/SignedIn'

import 'less/app.less'

const App: React.StatelessComponent<{}> = (): JSX.Element => {
	if (!state.$loaded) {
		return <Loading large />
	}

	return state.$auth ? <SignedOut /> : <SignedIn />
}

export default observer(App)
