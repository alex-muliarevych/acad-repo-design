import { getFormattedHour } from './DateHelpers';

describe('DateHelpers', () => {
  describe('getFormattedHour()', () => {
    it(`should add leading zero in front of hour and minute less then 10`, () => {
      expect(getFormattedHour(1, 2)).toEqual('01:02');
    });

    it(`should return start of hour if only hour passed`, () => {
      expect(getFormattedHour(1)).toEqual('01:00');
    });

    it(`should truncate leading zero for input more then 9`, () => {
      expect(getFormattedHour(11, 15)).toEqual('11:15');
    });
  });
});
