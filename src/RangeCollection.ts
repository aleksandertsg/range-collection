export default class RangeCollection {
  private numbers: number[] = []

  private createArrayInRange(start: number, end: number): number[] {
    return Array.from({ length: (end - start) }, (_, i) => i + start)
  }

  private createRangeCollection (array: number[]): number[][] {
    const rc: number[][] = []
    let r: number[] = []

    for (let i = 0; i < array.length; i++) {
      if (r.length === 0) {
        r.push(array[i])
      } else if ((array[i] + 1) !== array[i + 1]) {
        r.push(array[i])
        rc.push([...r])

        r = []
      }
    }

    return rc
  }

  public add(range: [number, number]): void {
    const newNumbers: number[] = [...this.numbers]

    newNumbers.push(...this.createArrayInRange(range[0], range[1]))
    newNumbers.sort((a: number, b: number) => a - b)

    this.numbers = [...new Set(newNumbers)]
  }

  public remove(range: [number, number]): void {
    const rangeToRemove = this.createArrayInRange(range[0], range[1])
    const newNumbers: number[] = [...this.numbers].filter(value => !rangeToRemove.includes(value))

    this.numbers = [...new Set(newNumbers)]
  }

  public print(): void {
    const ranges: string = this.createRangeCollection(this.numbers)
      .map(r => `[${r[0]}, ${r[1] + 1})`)
      .join(' ')

    console.log(ranges)
  }
}
