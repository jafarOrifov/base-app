export function add(a: number | string, b: number | string) {
  if (typeof a === 'string') a = Number(a)
  if (typeof b === 'string') b = Number(b)

  if (isNaN(b)) throw new Error('it is not a number!')
  if (isNaN(b)) throw new Error('it is not a number!')
  return a + b
}

export function subtract(a: number, b: number) {
  return a - b
}
