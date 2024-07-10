export class NumberFormatter {
  public static format(value: number): string {
    return (Math.round(value * 100) / 100).toFixed(2);
  }
}
