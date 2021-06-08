import { useEffect, useState } from "react";
import { luhnValidateCCN, validateCVV } from "../card";

type ValidationType = { isCardNumberValid: boolean; isCvvValid?: boolean };

export const useLuhnValidation = (
  cardNumber: string,
  cvv: string
): ValidationType => {
  const [isCardNumberValid, setIsCardNumberValid] = useState<boolean>(false);
  const [isCvvValid, setIsCvvValid] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const cardValidation = luhnValidateCCN(cardNumber);
    const cvvValidation = validateCVV(cardNumber, cvv);

    setIsCardNumberValid(cardValidation);
    setIsCvvValid(cvvValidation);
  }, [cardNumber, cvv]);

  return { isCardNumberValid, isCvvValid };
};
