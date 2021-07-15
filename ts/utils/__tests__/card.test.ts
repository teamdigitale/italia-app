import { luhnValidateCCN, validateCVV } from "../card";

const aValidPan = "4916916025914971";
const aValidAmexPan = "374623599297410";
const aValidSecurityCode = "123";
const aValidAmexSecurityCode = "1234";
const aEmptyPan = "";
const aEmptySecurityCode = "";
const anUnvalidPan = "1234567812341234";
const anUnvalidSecurityCodeLess1 = "12";
const anUnvalidSecurityCodePlus1 = "12345";

describe("Luhn's algorithm logic", () => {
  it("should be false if there aren't data", () => {
    const isPanValid = luhnValidateCCN(aEmptyPan);
    const isCvvValid = validateCVV(aEmptyPan, aEmptySecurityCode);

    expect(isPanValid).toBe(false);
    expect(isCvvValid).toBe(false);
  });

  it("should be false if pan is wrong", () => {
    const isPanValid = luhnValidateCCN(anUnvalidPan);

    expect(isPanValid).toBe(false);
  });

  it("should be false if security code is wrong with one less value", () => {
    const isCvvValid = validateCVV(aValidPan, anUnvalidSecurityCodeLess1);

    expect(isCvvValid).toBe(false);
  });

  it("should be false if security code is wrong with an extra value", () => {
    const isCvvValid = validateCVV(aValidPan, anUnvalidSecurityCodePlus1);

    expect(isCvvValid).toBe(false);
  });

  it("should not be validated with real non-amex card and if cvv is by 4 digits", () => {
    const isPanValid = luhnValidateCCN(aValidPan);
    const isCvvValid = validateCVV(aValidPan, aValidAmexSecurityCode);

    expect(isPanValid).toBe(true);
    expect(isCvvValid).toBe(false);
  });

  it("should show not validated with real amex card and if cvv is by 3 digits", () => {
    const isPanValid = luhnValidateCCN(aValidAmexPan);
    const isCvvValid = validateCVV(aValidAmexPan, aValidSecurityCode);

    expect(isPanValid).toBe(true);
    expect(isCvvValid).toBe(false);
  });

  it("should show validated with real amex card and if cvv is by 4 digits", () => {
    const isPanValid = luhnValidateCCN(aValidAmexPan);
    const isCvvValid = validateCVV(aValidAmexPan, aValidAmexSecurityCode);

    expect(isPanValid).toBe(true);
    expect(isCvvValid).toBe(true);
  });

  it("should show validated with real non-amex card and if cvv is by 3 digits", () => {
    const isPanValid = luhnValidateCCN(aValidPan);
    const isCvvValid = validateCVV(aValidPan, aValidSecurityCode);

    expect(isPanValid).toBe(true);
    expect(isCvvValid).toBe(true);
  });
});
