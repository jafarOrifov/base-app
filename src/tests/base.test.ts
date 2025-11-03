import { describe, it, expect } from 'vitest'
import { add, Person, subtract } from '@/utils/common'
describe('add', () => {
  it('adding', () => {
    expect(add(2, 2)).toBe(4)
  })
  it('should return error if inputs not a number', () => {
    expect(() => add(2, 'potato')).toThrow()
  })
})

describe('subtract', () => {
  it('should subtract one number from other one', () => {
    expect(subtract(4, 5)).toEqual(-1)
  })
})

describe('equality', () => {
  it('should check objects', () => {
    expect({ a: undefined, b: 2 }).toEqual({ b: 2 }) //  o‘tadi
    expect({ a: undefined, b: 2 }).toStrictEqual({ b: 2, a: undefined }) // ❌ o‘tmaydi
    expect([1, , 2]).toEqual([1, undefined, 2]) // ✅
    // expect([1, , 2]).toStrictEqual([1, undefined, 2]) // ❌ (bo‘sh slot != undefined)
  })
})

describe.todo('Person', () => {
  it('should return new Person', () => {
    const person = new Person('Jafar', 'Orifov')
    expect(person).toEqual({
      id: expect.stringContaining('person-'),
      firstname: 'Jafar',
      lastname: 'Orifov',
    })
  })
})
