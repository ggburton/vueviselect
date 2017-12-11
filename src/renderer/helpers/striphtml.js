function stripHtml (string) {
  var str = string.replace(/<[^>]+>/g, '')
  str = str.replace('amp', '&')
  str = str.replace('&#39;', '\'')
  return str
}

export { stripHtml }
