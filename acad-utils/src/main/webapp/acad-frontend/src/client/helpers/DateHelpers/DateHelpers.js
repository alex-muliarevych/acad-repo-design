/**
 * @description
 * Returns formatted hour in format HH:MM based on input nubmer
 *
 * @param {number} hour hour to be formatted
 * @param {number} minutes minutes to be formatted
 */
export function getFormattedHour(hour, minutes = 0) {
  return `${`0${hour}`.substr(-2)}:${`0${minutes}`.substr(-2)}`;
}
