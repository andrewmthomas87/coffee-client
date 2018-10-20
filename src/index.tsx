import 'babel-polyfill'

import { configure } from 'mobx'
configure({ enforceActions: 'observed' })

import * as React from 'react'
import { render } from 'react-dom'

import socket from 'services/socket'

import App from './App'

socket.connect()

render(<App />, document.querySelector('div#root'))
