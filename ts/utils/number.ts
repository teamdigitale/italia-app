import * as t from "io-ts";

/*
 * this code is a copy from gcanti repository https://github.com/gcanti/io-ts-types/blob/master/src/number/NumberFromString.ts
 * this because to avoid node modules conflicts given from using io-ts-types
 * NumberFromStringType is a codec to encode (number -> string) and decode (string -> number)
 */
export class NumberFromStringType extends t.Type<number, string> {
  constructor() {
    super(
      "NumberFromString",
      t.number.is,
      (u, c) => {
        const validation = t.string.validate(u, c);
        if (validation.isLeft()) {
          return validation as any;
        } else {
          const s = validation.value;
          const n = +s;
          return isNaN(n) ? t.failure(s, c) : t.success(n);
        }
      },
      String
    );
  }
}

export const NumberFromString = new NumberFromStringType();

export const roundToThirdDecimal = (value: number) =>
  isNaN(value) ? 0 : Math.floor(value * 1000) / 1000;
