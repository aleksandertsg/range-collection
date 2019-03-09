import 'mocha'
import * as chai from 'chai'
import RangeCollection from '../src/RangeCollection'
import * as sinon from 'sinon'

const { expect } = chai

describe('RangeCollection tests', () => {
  let rc: RangeCollection

  beforeEach(() => {
    rc = new RangeCollection()
  })

  describe('createArrayInRange [Private]', () => {
    it('Should create range with given start and end', () => {
      const range = rc['createArrayInRange'](1, 10)

      expect(range).to.deep.eq([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })

    it('Should create range with negative numbers', () => {
      const range = rc['createArrayInRange'](-10, 1)

      expect(range).to.deep.eq([-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0])
    })

    it('Should create empty range if start and end is the same', () => {
      const range = rc['createArrayInRange'](1, 1)

      expect(range).to.deep.eq([])
    })

    it('Should create empty array in case of end lower than start', () => {
      const range = rc['createArrayInRange'](1, -1)

      expect(range).to.deep.eq([])
    })
  })

  describe('createRangeCollection [Private]', () => {
    it('Should create range collection in case given array', () => {
      const result = rc['createRangeCollection']([1, 2, 3, 5, 6, 7, 8, 100, 1001])

      expect(result).to.deep.eq([[1, 2, 3], [5, 6, 7, 8], [100], [1001]])
    })
  })

  describe('add', () => {
    it('Should override existing range', () => {
      rc.add([1, 4])
      rc.add([1, 4])

      expect(rc['numbers']).to.deep.eq([1, 2, 3])
    })

    it('Should add new range to existing array and sort correctly', () => {
      rc.add([5, 10])
      rc.add([1, 3])

      expect(rc['numbers']).to.deep.eq([1, 2, 5, 6, 7, 8, 9])
    })

    it('Should not take into account wrong range inputs', () => {
      rc.add([1, 3])
      rc.add([5, -10])

      expect(rc['numbers']).to.deep.eq([1, 2])
    })
  })

  describe('remove', () => {
    it('Should remove given range from current', () => {
      rc.add([1, 10])
      rc.remove([1, 8])

      expect(rc['numbers']).to.deep.eq([8, 9])
    })

    it('Should remove given range that overlaps current range', () => {
      rc.add([1, 2])
      rc.remove([-10, 20])
      rc.remove([-10, 20])

      expect(rc['numbers']).to.deep.eq([])
    })
  })

  describe('print', () => {
    it('Should print out in correct format', () => {
      const consoleSpy = sinon.spy(console, 'log')
      let callCount = 0

      rc.add([1, 5])
      rc.print()
      expect(consoleSpy.getCall(callCount++).args[0]).to.eq('[1, 5)')

      rc.add([10, 20])
      rc.print()
      expect(consoleSpy.getCall(callCount++).args[0]).to.eq('[1, 5) [10, 20)')

      rc.add([20, 20])
      rc.print()
      expect(consoleSpy.getCall(callCount++).args[0]).to.eq('[1, 5) [10, 20)')

      rc.add([20, 21])
      rc.print()
      expect(consoleSpy.getCall(callCount++).args[0]).to.eq('[1, 5) [10, 21)')

      rc.add([2, 4])
      rc.print()
      expect(consoleSpy.getCall(callCount++).args[0]).to.eq('[1, 5) [10, 21)')

      rc.add([3, 8])
      rc.print()
      expect(consoleSpy.getCall(callCount++).args[0]).to.eq('[1, 8) [10, 21)')

      rc.remove([10, 10])
      rc.print()
      expect(consoleSpy.getCall(callCount++).args[0]).to.eq('[1, 8) [10, 21)')

      rc.remove([10, 11])
      rc.print()
      expect(consoleSpy.getCall(callCount++).args[0]).to.eq('[1, 8) [11, 21)')

      rc.remove([15, 17])
      rc.print()
      expect(consoleSpy.getCall(callCount++).args[0]).to.eq('[1, 8) [11, 15) [17, 21)')

      rc.remove([3, 19])
      rc.print()
      expect(consoleSpy.getCall(callCount).args[0]).to.eq('[1, 3) [19, 21)')

      consoleSpy.restore()
    })
  })
})
