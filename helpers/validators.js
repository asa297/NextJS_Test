export const FieldIsEmpty = (value, textError) => {
  if (!value) return textError || 'Required'
}

export const FieldIsPercentRange = (value, textError) => {
  if (value < 0) return 'Number Pecent must more than 0'
  if (value > 100) return 'Number Pecent must less than 100'
}

export const FieldIsMoreThan = (value, valueCompared, textError) => {
  if (value > valueCompared) return textError || `Number must less than ${valueCompared}`
}

export const FieldIsLessThan = (value, valueCompared, textError) => {
  if (value < valueCompared) return textError || `Number must more than ${valueCompared}`
}

export const FieldIsPositiveNumber = (value, textError) => {
  if (value < 0) return textError || 'Number Pecent must more than 0'
}
