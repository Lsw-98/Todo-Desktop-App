const getLocal = (key: string, emptyValue?: any) => {
  const item = localStorage.getItem(key)
  if (item) {
    try {
      const data = JSON.parse(item)
      return data
    } catch (err) {
      return item
    }
  }
  return emptyValue ? emptyValue : null
}

const saveLocal = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export { getLocal, saveLocal }