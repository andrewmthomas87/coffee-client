import * as React from 'react'

import SignUp from './SignUp'
import SignIn from './SignIn'

import './component.less'

const SignedOut: React.StatelessComponent<{}> = (): JSX.Element => (
	<section id='signed-out'>
		<SignUp />
		<SignIn />
	</section>
)

export default SignedOut
