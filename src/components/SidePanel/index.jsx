import React from 'react'
// Import custom components
import { CheckInput, SliderInput, RadioInputGroup } from 'Components/Common'
// Import constants
import {
  SHAPE_OPTIONS,
  DIRECTION_OPTIONS,
  MAPPING_OPTIONS,
  MIN_SPACE,
  MAX_SPACE,
  SPACE_STEP,
  MIN_PADDING,
  MAX_PADDING,
  PADDING_STEP,
  MAX_DATA_COUNT,
  MIN_DATA_COUNT,
  DATA_STEP,
} from 'Constants'
// Import style
import './style.css'

const SidePanel = ({
  settings,
  data,
  onSettingsChange,
  showSettingsPanel,
  toggleSettingsPanel,
  onDataCountChange,
}) => {
  return (
    <div className={`side-panel ${showSettingsPanel ? ' open' : ''}`}>
      {showSettingsPanel ? (
        <button className="close-btn" onClick={() => toggleSettingsPanel(false)}>
          {`< Close`}
        </button>
      ) : (
        <button className="open-btn" onClick={() => toggleSettingsPanel(true)}>
          {`Settings Panel >`}
        </button>
      )}
      <div className="settings">
        <p className="title">Settings</p>
        <p className="label inline-block">Axis</p>
        <CheckInput
          id="axis_checkbox"
          name="axis_checkbox"
          checked={settings.axis}
          onChange={(e) => onSettingsChange('axis', e.target.checked)}
        />
        <br />
        <p className="label inline-block">Grid</p>
        <CheckInput
          id="grid_checkbox"
          name="grid_checkbox"
          checked={settings.grid}
          onChange={(e) => onSettingsChange('grid', e.target.checked)}
        />
        <p className="label">Shape</p>
        <RadioInputGroup
          id="shape_radio_group"
          name="shape_radio_group"
          options={SHAPE_OPTIONS}
          value={settings.shape}
          onChange={(e) => onSettingsChange('shape', parseInt(e.target.value))}
        />
        <p className="label">Fill Direction</p>
        <RadioInputGroup
          id="direction_radio_group"
          name="direction_radio_group"
          options={DIRECTION_OPTIONS}
          value={settings.direction}
          onChange={(e) => onSettingsChange('direction', parseInt(e.target.value))}
        />
        <p className="label">Mapping Style</p>
        <RadioInputGroup
          id="mapping_radio_group"
          name="mapping_radio_group"
          options={MAPPING_OPTIONS}
          value={settings.mapping}
          onChange={(e) => onSettingsChange('mapping', parseInt(e.target.value))}
        />
        <p className="label">Cylinder Count</p>
        <SliderInput
          id="data_count_radio_group"
          name="data_count_radio_group"
          min={MIN_DATA_COUNT}
          max={MAX_DATA_COUNT}
          step={DATA_STEP}
          value={data.items.length}
          onChange={(e) => onDataCountChange(parseInt(e.target.value))}
        />
        <p className="label">Spacing</p>
        <SliderInput
          id="space_radio_group"
          name="space_radio_group"
          min={MIN_SPACE}
          max={MAX_SPACE}
          step={SPACE_STEP}
          value={settings.space}
          onChange={(e) => onSettingsChange('space', parseFloat(e.target.value))}
        />
        <p className="label">Padding</p>
        <SliderInput
          id="padding_radio_group"
          name="padding_radio_group"
          min={MIN_PADDING}
          max={MAX_PADDING}
          step={PADDING_STEP}
          value={settings.padding}
          onChange={(e) => onSettingsChange('padding', parseFloat(e.target.value))}
        />
      </div>
    </div>
  )
}

export default SidePanel
