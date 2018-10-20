import * as React from 'react'

import './component.less'

const INTERVAL: number = 250
const MAX_VELOCITY: number = 62.5
const MIN_VELOCITY: number = 20
const MAX_VELOCITY_STEP: number = 15

interface IProps {
	large?: boolean
}

interface IState {
	velocities: number[],
	rotations: number[]
}

class Loading extends React.Component<IProps, IState> {

	private _timeout: any

	public constructor(props: {}) {
		super(props)

		this.state = {
			velocities: [1, 2, 3, 4].map(() => Math.max(MIN_VELOCITY, Math.min(MAX_VELOCITY, Math.random() * MAX_VELOCITY))),
			rotations: [1, 2, 3, 4].map(() => Math.random() * 360)
		}
	}

	public componentDidMount() {
		this._timeout = setTimeout(this._onMove, 50)
	}

	public componentWillUnmount() {
		clearTimeout(this._timeout)
	}

	public render(): JSX.Element {
		return (
			<div id='loading' className={this.props.large ? 'large' : ''}>
				<div style={{ transform: `rotate(${this.state.rotations[0]}deg)` }}>
					<div style={{ transform: `rotate(${this.state.rotations[1]}deg)` }}>
						<div style={{ transform: `rotate(${this.state.rotations[2]}deg)` }}>
							<div style={{ transform: `rotate(${this.state.rotations[3]}deg)` }} />
						</div>
					</div>
				</div>
				<span>Loading</span>
			</div>
		)
	}

	private _onMove = () => {
		const rotations: number[] = this.state.rotations.map((rotation: number, index: number) => (rotation + this.state.velocities[index] / (index + 1)))
		const velocities: number[] = this.state.velocities.map(velocity => Math.max(MIN_VELOCITY, Math.min(MAX_VELOCITY, velocity + Math.random() * 2 * MAX_VELOCITY_STEP - MAX_VELOCITY_STEP)))

		this.setState({ rotations, velocities })

		this._timeout = setTimeout(this._onMove, INTERVAL)
	}

}

export default Loading
