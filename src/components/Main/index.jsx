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
  const toolTip = useRef()

  // Create threejs renderer when component mounted
  useEffect(() => {
    renderer.current = new ThreeJSRenderer(rendererContainer.current, data, settings, onObjSelected)
    renderer.current.init()
    return () => {
      if (renderer.current) {
        renderer.current.dispose()
      }
    }
  }, [])

  // Update settings
  useEffect(() => {
    renderer.current.settingsUpdate(settings)
  }, [settings])

  // Update data
  useEffect(() => {
    renderer.current.dataUpdate(data)
  }, [data])

  // Listener for object selection
  const onObjSelected = (value = '', mousePos = null) => {
    if (value) {
      rendererContainer.current.style.cursor = 'pointer'
      toolTip.current.style.display = 'flex'
      toolTip.current.style.top = `${mousePos.y + 20}px`
      toolTip.current.style.left = `${mousePos.x + 20}px`
      toolTip.current.innerText = value
    } else {
      rendererContainer.current.style.cursor = 'default'
      toolTip.current.style.display = 'none'
    }
  }

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
      <div className="tool-tip" ref={toolTip}></div>
    </div>
  )
}

export default Main
