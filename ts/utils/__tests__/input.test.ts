import { fromNullable, isSome, none, some } from "fp-ts/lib/Option";
import MockDate from "mockdate";
import {
  CreditCardCVC,
  CreditCardExpirationMonth,
  CreditCardExpirationYear,
  CreditCardPan,
  CreditCardState,
  getCreditCardFromState,
  isValidCardHolder,
  isValidPan,
  isValidSecurityCode
} from "../input";
import { testableAddCardScreen } from "../../screens/wallet/AddCardScreen";

describe("CreditCardPan", () => {
  const validPANs: ReadonlyArray<string> = [
    "12341234123412",
    "123412341234123",
    "1234123412341234",
    "************1234",
    "12341234123412341",
    "123412341234123412",
    "1234123412341234123"
  ];

  it("should accept valid PANs", () => {
    validPANs.forEach(d => expect(CreditCardPan.is(d)).toBeTruthy());
  });

  it("should accept valid PANs, round 2", () => {
    validPANs.forEach(d => expect(isValidPan(some(d))).toBeTruthy());
  });

  const invalidPANs: ReadonlyArray<string> = [
    "1234 1234 1234 1234",
    "123412341234123_123",
    "1234123412341",
    "12341234123412341234"
  ];

  it("should reject invalid PANs", () => {
    invalidPANs.forEach(d => expect(CreditCardPan.is(d)).toBeFalsy());
  });

  it("should reject invalid PANs, round 2", () => {
    invalidPANs.forEach(d => expect(isValidPan(some(d))).toBeFalsy());
  });

  it("should be undefined", () => {
    expect(isValidPan(none)).not.toBeDefined();
  });
});

describe("CreditCardExpirationMonth", () => {
  it("should accept valid months", () => {
    const data: ReadonlyArray<any> = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12"
    ];
    data.forEach(d => expect(CreditCardExpirationMonth.is(d)).toBeTruthy());
  });

  it("should reject invalid months", () => {
    const data: ReadonlyArray<any> = [
      "0",
      "00",
      "13",
      "1",
      "123",
      "!1",
      "1!",
      "001",
      "010"
    ];
    data.forEach(d => expect(CreditCardExpirationMonth.is(d)).toBeFalsy());
  });
});

describe("CreditCardExpirationYear", () => {
  it("should accept valid years", () => {
    const data: ReadonlyArray<any> = ["17", "18", "29", "52", "99"];
    data.forEach(d => expect(CreditCardExpirationYear.is(d)).toBeTruthy());
  });

  it("should reject invalid years", () => {
    const data: ReadonlyArray<any> = ["170", "1", "*9", "5*"];
    data.forEach(d => expect(CreditCardExpirationYear.is(d)).toBeFalsy());
  });
});

describe("CreditCardExpirationDate", () => {
  MockDate.set("2020-01-01");
  it("should be false since it is not expired", () => {
    expect(
      testableAddCardScreen?.isCreditCardDateExpiredOrInvalid!(some("03/20"))
    ).toEqual(some(false));
  });

  it("should be true since it is expired", () => {
    expect(
      testableAddCardScreen?.isCreditCardDateExpiredOrInvalid!(some("12/19"))
    ).toEqual(some(true));
  });

  it("should be true since it is not in a valid format", () => {
    expect(
      testableAddCardScreen?.isCreditCardDateExpiredOrInvalid!(some("aa/bb"))
    ).toEqual(some(true));
  });

  it("should be true since it is not in a valid format", () => {
    expect(
      testableAddCardScreen?.isCreditCardDateExpiredOrInvalid!(some("1/b"))
    ).toEqual(some(true));
  });

  it("should be true since it is not in a valid format", () => {
    expect(
      testableAddCardScreen?.isCreditCardDateExpiredOrInvalid!(some("3/21"))
    ).toEqual(some(true));
  });

  it("should be true since it is not in a valid format", () => {
    expect(
      testableAddCardScreen?.isCreditCardDateExpiredOrInvalid!(some("03/2"))
    ).toEqual(some(true));
  });

  it("should be true since it is not in a valid format", () => {
    expect(
      testableAddCardScreen?.isCreditCardDateExpiredOrInvalid!(some("a/27"))
    ).toEqual(some(true));
  });

  it("should be true since it is not in a valid format", () => {
    expect(
      testableAddCardScreen?.isCreditCardDateExpiredOrInvalid!(some("01/"))
    ).toEqual(some(true));
  });

  it("should be none since it is incomplete", () => {
    expect(
      testableAddCardScreen?.isCreditCardDateExpiredOrInvalid!(some("01"))
    ).toEqual(none);
  });

  it("should be none", () => {
    expect(
      testableAddCardScreen?.isCreditCardDateExpiredOrInvalid!(none)
    ).toEqual(none);
  });
});

describe("CreditCardCVC", () => {
  const validCVCs: ReadonlyArray<string> = ["000", "1234"];

  it("should accept valid CVCs", () => {
    validCVCs.forEach(d => expect(CreditCardCVC.is(d)).toBeTruthy());
  });

  it("should accept valid CVCs, round 2", () => {
    validCVCs.forEach(d =>
      expect(isValidSecurityCode(fromNullable(d))).toBeTruthy()
    );
  });

  const invalidCVCs: ReadonlyArray<string> = ["00", "12345", "01*", "123*"];

  it("should reject invalid CVCs", () => {
    invalidCVCs.forEach(d => expect(CreditCardCVC.is(d)).toBeFalsy());
  });

  it("should reject invalid CVCs, round 2", () => {
    invalidCVCs.forEach(d => expect(isValidSecurityCode(some(d))).toBeFalsy());
  });
});

describe("isValidCardHolder", () => {
  [
    "á",
    "à",
    "ã",
    "â",
    "é",
    "è",
    "ê",
    "í",
    "ì",
    "î",
    "õ",
    "ó",
    "ò",
    "ô",
    "ú",
    "ù",
    "û"
  ].map(accentedCardHolder =>
    it(`should return false if the input string contains the accented character ${accentedCardHolder}`, () => {
      expect(isValidCardHolder(some(accentedCardHolder))).toBeFalsy();
    })
  );

  it("should return false if the input string is none", () => {
    expect(isValidCardHolder(none)).toBeFalsy();
  });

  [
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "0123456789",
    "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
  ].map(notAccentedCardHolder =>
    it(`should return true if the input string is composed by character different from accented character: ${notAccentedCardHolder}`, () => {
      expect(isValidCardHolder(some(notAccentedCardHolder))).toBeTruthy();
    })
  );
});

describe("getCreditCardFromState", () => {
  const aValidCardHolder = "Mario Rossi";
  const anInvalidCardHolder = "Mariò Rossi";
  const aValidPan = "1234567891234568";
  const anInvalidPan = "1234 5678 9123";
  const aValidExpirationDate = "12/99";
  const anInvalidExpirationDate = "99/9";
  const aValidSecurityCode = "123";
  const anInvalidSecurityCode = "1";
  it.each`
    pan                   | expirationDate                   | securityCode                   | holder
    ${none}               | ${some(aValidExpirationDate)}    | ${some(aValidSecurityCode)}    | ${some(aValidCardHolder)}
    ${some(aValidPan)}    | ${none}                          | ${some(aValidSecurityCode)}    | ${some(aValidCardHolder)}
    ${some(aValidPan)}    | ${some(aValidExpirationDate)}    | ${none}                        | ${some(aValidCardHolder)}
    ${some(aValidPan)}    | ${some(aValidExpirationDate)}    | ${some(aValidSecurityCode)}    | ${none}
    ${some(anInvalidPan)} | ${some(aValidExpirationDate)}    | ${some(aValidSecurityCode)}    | ${some(aValidCardHolder)}
    ${some(aValidPan)}    | ${some(anInvalidExpirationDate)} | ${some(aValidSecurityCode)}    | ${some(aValidCardHolder)}
    ${some(aValidPan)}    | ${some(aValidExpirationDate)}    | ${some(anInvalidSecurityCode)} | ${some(aValidCardHolder)}
    ${some(aValidPan)}    | ${some(aValidExpirationDate)}    | ${some(aValidSecurityCode)}    | ${some(anInvalidCardHolder)}
  `(
    "should return none if at least one field of the credit card is none or is invalid",
    async ({ pan, expirationDate, securityCode, holder }) => {
      const cardState: CreditCardState = {
        pan,
        expirationDate,
        securityCode,
        holder
      };
      expect(getCreditCardFromState(cardState)).toBe(none);
    }
  );

  it("should return a credit card if all the field are correctly filled ", () => {
    const cardState: CreditCardState = {
      pan: some(aValidPan),
      expirationDate: some(aValidExpirationDate),
      securityCode: some(aValidSecurityCode),
      holder: some(aValidCardHolder)
    };

    if (isSome(cardState.expirationDate)) {
      const [expireMonth, expireYear] = cardState.expirationDate.value.split(
        "/"
      );

      const expectedCreditCard = {
        pan: aValidPan,
        expireMonth,
        expireYear,
        securityCode: aValidSecurityCode,
        holder: aValidCardHolder
      };
      expect(getCreditCardFromState(cardState)).toStrictEqual(
        some(expectedCreditCard)
      );
    }
  });
});
