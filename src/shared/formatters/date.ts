import moment from 'moment/moment';

export class DateFormatter {
  public static format(value: number): string {
    return moment(value).format('DD MMMM YYYY');
  }
}
