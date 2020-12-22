import { useState } from 'react'
// Import constants
import { INITIAL_SHOW_SETTINGS, INITIAL_SETTINGS } from 'Constants'

const useSettings = () => {
  const [showSettingsPanel, setShowSettingsPanel] = useState(INITIAL_SHOW_SETTINGS)
  const [settings, setSettings] = useState(INITIAL_SETTINGS)

  // Toggle setting panel view
  const toggleSettingsPanel = (val) => {
    setShowSettingsPanel(val)
  }

  // Listener for settings change by user
  const onSettingsChange = (key, val) => {
    const newSettings = JSON.parse(JSON.stringify(settings))
    newSettings[key] = val

    setSettings(newSettings)
  }

  return {
    settings,
    onSettingsChange,
    showSettingsPanel,
    toggleSettingsPanel,
  }
}

export default useSettings
