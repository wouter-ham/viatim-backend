import moment from 'moment/moment';

export class TimeFormatter {
  public static format(value: number): string {
    return moment(value).format('HH:mm');
  }
}
