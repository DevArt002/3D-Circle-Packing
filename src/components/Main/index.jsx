import React, { useEffect, useRef } from 'react'
// Import custom hooks
import { useSettings, useData } from 'Hooks'
// Import custom components
import SidePanel from 'Components/SidePanel'
import ThreeJSRenderer from './ThreeJSRenderer'
// Import style
import './style.css'

const Main = () => {
  const { settings, onSettingsChange, showSettingsPanel, toggleSettingsPanel } = useSettings()
  const { data, onDataCountChange } = useData()
  const rendererContainer = useRef()
  const renderer = useRef()

  // Create threejs renderer when component mounted
  useEffect(() => {
    renderer.current = new ThreeJSRenderer(rendererContainer.current, data, settings)
    renderer.current.init()
    return () => {
      if (renderer.current) {
        renderer.current.dispose()
      }
    }
  }, [])

  return (
    <div className="main">
      <SidePanel
        settings={settings}
        data={data}
        showSettingsPanel={showSettingsPanel}
        toggleSettingsPanel={toggleSettingsPanel}
        onSettingsChange={onSettingsChange}
        onDataCountChange={onDataCountChange}
      />
      <div className="renderer-container" ref={rendererContainer}></div>
    </div>
  )
}

export default Main
