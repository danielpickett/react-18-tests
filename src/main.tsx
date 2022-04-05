import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { App } from './App'
import { RecoilRoot } from 'recoil'

const container = document.getElementById('root')

if (!container) throw new Error('Could not find root node')

const root = createRoot(container)

root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <App />
  </RecoilRoot>
  // </React.StrictMode>
)
