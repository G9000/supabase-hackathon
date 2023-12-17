import dayjs from "dayjs";

export function convertToDayOfTheWekk(givenDate: string) {
  return dayjs(givenDate).format("dddd");
}
