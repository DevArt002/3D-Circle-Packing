const INITIAL_SHOW_SETTINGS = false

const INITIAL_SETTINGS = {
  axis: true,
  grid: true,
  space: 1.0,
  padding: 1.0,
  shape: 6, // 3: triangle, 4: square, 5: pentagon, 6: hexagon
  direction: 0, // 0: center to outer, 1: outer to center
  mapping: 0, // 0: gradient color mapping, 1: single color mapping
}

const SHAPE_OPTIONS = [
  {
    label: 'Triangle',
    value: 3,
  },
  {
    label: 'Square',
    value: 4,
  },
  {
    label: 'Pentagon',
    value: 5,
  },
  {
    label: 'Hexagon',
    value: 6,
  },
]

const DIRECTION_OPTIONS = [
  {
    label: 'Center To Out',
    value: 0,
  },
  {
    label: 'Out To Center',
    value: 1,
  },
]

const MAPPING_OPTIONS = [
  {
    label: 'Gradient Color',
    value: 0,
  },
  {
    label: 'Single Color',
    value: 1,
  },
]

const MIN_SPACE = 0
const MAX_SPACE = 10
const SPACE_STEP = 0.1
const MIN_PADDING = 0
const MAX_PADDING = 10
const PADDING_STEP = 0.1
const INITIAL_DATA_COUNT = 100
const MIN_DATA_COUNT = 1
const MAX_DATA_COUNT = 1001
const DATA_STEP = 10
const MAX_VAL = 100
const MIN_VAL = -100

export {
  INITIAL_SHOW_SETTINGS,
  INITIAL_SETTINGS,
  SHAPE_OPTIONS,
  DIRECTION_OPTIONS,
  MAPPING_OPTIONS,
  MIN_SPACE,
  MAX_SPACE,
  SPACE_STEP,
  MIN_PADDING,
  MAX_PADDING,
  PADDING_STEP,
  INITIAL_DATA_COUNT,
  MAX_DATA_COUNT,
  MIN_DATA_COUNT,
  DATA_STEP,
  MAX_VAL,
  MIN_VAL,
}
