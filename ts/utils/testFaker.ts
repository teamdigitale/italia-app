import {
  IPatternStringTag,
  IWithinRangeStringTag
} from "italia-ts-commons/lib/strings";
import { AmountInEuroCents, RptId } from "italia-pagopa-commons/lib/pagopa";
import { Action } from "redux";
import { PaymentRequestsGetResponse } from "../../definitions/backend/PaymentRequestsGetResponse";
import { ImportoEuroCents } from "../../definitions/backend/ImportoEuroCents";
import { TypeEnum } from "../../definitions/pagopa/Wallet";
import { WalletTypeEnum } from "../../definitions/pagopa/WalletV2";
import {
  CreditCard,
  EnableableFunctionsTypeEnum,
  PatchedWalletV2,
  Psp,
  Wallet
} from "../types/pagopa";
// import { applicationChangeState } from "../store/actions/application";
import {
  idpSelected,
  loginSuccess,
  sessionInformationLoadSuccess
} from "../store/actions/authentication";
import { SessionToken } from "../types/SessionToken";
import { SpidLevelEnum } from "../../definitions/backend/SpidLevel";
import { SpidIdp } from "../../definitions/content/SpidIdp";
import { CreditCardExpirationMonth, CreditCardExpirationYear } from "./input";

const validCreditCard: CreditCard = {
  id: 1464,
  holder: "Mario Rossi",
  pan: "************0111" as string & IPatternStringTag<string>,
  securityCode: "345" as string & IPatternStringTag<"^[0-9]{3,4}$">,
  expireMonth: "05" as string & CreditCardExpirationMonth,
  expireYear: "22" as string & CreditCardExpirationYear,

  brandLogo:
    "https://acardste.vaservices.eu:1443/static/wallet/assets/img/creditcard/generic.png",
  flag3dsVerified: true
};

const validAmount: { [key: string]: any } = {
  currency: "EUR",
  amount: 1000,
  decimalDigits: 2
};

const validPsp: { [key: string]: any } = {
  id: 43188,
  idPsp: "idPsp1",
  businessName: "WHITE bank",
  paymentType: "CP",
  idIntermediary: "idIntermediario1",
  idChannel: "idCanale14",
  logoPSP:
    "https://acardste.vaservices.eu:1443/pp-restapi/v1/resources/psp/43188",
  serviceLogo:
    "https://acardste.vaservices.eu:1443/pp-restapi/v1/resources/service/43188",
  serviceName: "nomeServizio 10 white",
  fixedCost: validAmount,
  appChannel: false,
  tags: ["MAESTRO"],
  serviceDescription: "DESCRIZIONE servizio: CP mod1",
  serviceAvailability: "DISPONIBILITA servizio 24/7",
  paymentModel: 1,
  flagStamp: true,
  idCard: 91,
  lingua: "IT"
};

const validTransaction: { [key: string]: any } = {
  id: 2329,
  created: "2018-08-08T20:16:41Z",
  updated: "2018-08-08T20:16:41Z",
  amount: validAmount,
  grandTotal: validAmount,
  description: "pagamento fotocopie pratica",
  merchant: "Comune di Torino",
  idStatus: 3,
  statusMessage: "Confermato",
  error: false,
  success: true,
  fee: validAmount,
  token: "MjMyOQ==",
  idWallet: 2345,
  idPsp: validPsp.id,
  idPayment: 4464,
  nodoIdPayment: "eced7084-6c8e-4f03-b3ed-d556692ce090"
};

// has no amount
export const invalidAmount = Object.keys(validAmount)
  .filter(k => k !== "amount")
  .reduce((o, k) => ({ ...o, [k]: validAmount[k] }), {});

// has no id
export const invalidPsp = Object.keys(validPsp)
  .filter(k => k !== "id")
  .reduce((o, k) => ({ ...o, [k]: validPsp[k] }), {});

// has no id
export const invalidTransaction = Object.keys(validTransaction)
  .filter(k => k !== "idWallet")
  .reduce((o, k) => ({ ...o, [k]: validTransaction[k] }), {});

const validSession: { [key: string]: any } = {
  sessionToken:
    "0r12345j8E1v2w5V1s4t1U0v5v2S6b7y4N6z01smAof3kFse3o3H9b2o4Y7a1o6I1o0r6K1b5z5G7t1m4S4p6h6n5A0r6y1U1m6Y1q9v1C8k2e0U8g12345m2n0J2c8k",
  user: {
    email: "mario@rossi.com",
    status: "REGISTERED_SPID",
    name: "Mario",
    surname: "Rossi",
    acceptTerms: true,
    username: "mario@rossi.com",
    registeredDate: "2018-08-07T16:40:54Z",
    emailVerified: true,
    cellphoneVerified: true
  }
};
export const invalidSession = Object.keys(validSession)
  .filter(k => k !== "sessionToken")
  .reduce((o, k) => ({ ...o, [k]: validSession[k] }), {});

export const myVerifiedData: PaymentRequestsGetResponse = {
  importoSingoloVersamento: 1 as ImportoEuroCents,
  codiceContestoPagamento: "03314e90321011eaa22f931313a0ec7c" as string &
    IWithinRangeStringTag<32, 33>,
  ibanAccredito: "IT00V0000000000000000000000" as
    | (string & IPatternStringTag<"[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{1,30}">)
    | undefined,
  causaleVersamento: "Avviso di prova app IO",
  enteBeneficiario: {
    identificativoUnivocoBeneficiario: "01199250158",
    denominazioneBeneficiario: "Comune di Milano"
  },
  spezzoniCausaleVersamento: [
    {
      spezzoneCausaleVersamento: "causale versamento di prova"
    }
  ]
};

export const myRptId: RptId = {
  organizationFiscalCode: "01199250158" as string &
    IPatternStringTag<"^[0-9]{11}$">,
  paymentNoticeNumber: {
    applicationCode: "12" as string & IPatternStringTag<"[0-9]{2}">,
    auxDigit: "0",
    checkDigit: "19" as string & IPatternStringTag<"[0-9]{2}">,
    iuv13: "3456789999999" as string & IPatternStringTag<"[0-9]{13}">
  }
};

export const myInitialAmount = "1" as AmountInEuroCents;

export const myValidAmount = {
  currency: "EUR",
  amount: 1000,
  decimalDigits: 2
};

export const myPsp: Psp = {
  id: 43188,
  idPsp: "idPsp1",
  businessName: "WHITE bank",
  paymentType: "CP",
  idIntermediary: "idIntermediario1",
  idChannel: "idCanale14",
  logoPSP:
    "https://acardste.vaservices.eu:1443/pp-restapi/v1/resources/psp/43188",
  serviceLogo:
    "https://acardste.vaservices.eu:1443/pp-restapi/v1/resources/service/43188",
  serviceName: "nomeServizio 10 white",
  fixedCost: myValidAmount,
  appChannel: false,
  tags: ["MAESTRO"],
  serviceDescription: "DESCRIZIONE servizio: CP mod1",
  serviceAvailability: "DISPONIBILITA servizio 24/7",
  paymentModel: 1,
  flagStamp: true,
  idCard: 91
};

// V1 Wallet
export const myWallet: Wallet = {
  idWallet: 2345,
  type: TypeEnum.CREDIT_CARD,
  favourite: false,
  creditCard: validCreditCard,
  psp: myPsp,
  idPsp: myPsp.id,
  pspEditable: true,
  lastUsage: new Date("2020-08-07T15:50:08Z")
};

export const myWalletNoCreditCard: { [key: string]: any } = {
  idWallet: 2345,
  type: "EXTERNAL_PS",
  favourite: false,
  psp: myPsp,
  idPsp: myPsp.id,
  pspEditable: true,
  lastUsage: "2018-08-07T15:50:08Z"
};

export const bancomat = {
  walletType: WalletTypeEnum.Bancomat,
  createDate: "2021-04-05",
  enableableFunctions: [EnableableFunctionsTypeEnum.BPD],
  favourite: false,
  idWallet: 24415,
  info: {
    blurredNumber: "0003",
    brand: "MASTERCARD",
    brandLogo:
      "https://wisp2.pagopa.gov.it/wallet/assets/img/creditcard/carta_mc.png",
    expireMonth: "4",
    expireYear: "2021",
    hashPan: "e105a87731025d54181d8e4c4c04ff344ce82e57d6a3d6c6911e8eadb0348d7b",
    holder: "Maria Rossi",
    htokenList: ["token1", "token2"],
    issuerAbiCode: "00123",
    type: "PP"
  },
  onboardingChannel: "I",
  pagoPA: true,
  updateDate: "2021-04-05"
} as PatchedWalletV2;

export const AuthSeq: ReadonlyArray<Action> = [
  idpSelected({
    id: "posteid",
    name: "Poste",
    logo: "http://placeimg.com/640/480/some",
    entityID: "posteid",
    profileUrl: "https://posteid.poste.it/private/cruscotto.shtml"
  } as SpidIdp),
  loginSuccess(
    "8990c190291504710c02ad0e500b6a369f69d8d78af51591f14bb7d03d60911e466213e159b9ee7d69cd5c64437d2adc" as SessionToken
  ),
  sessionInformationLoadSuccess({
    bpdToken:
      "h7890416477432ecbde1f94dfe59f2d6350f716cb2cf523d8cad36fa18d71fa9924e0ea6d372ecab86447abe93d99cd5",
    myPortalToken:
      "b56c764f75e3fd5c2979c27b9fb3561bcb453ae952c83f0e1bb6075666cfef2aee7169667f187efe65e41789af643249",
    spidLevel: "https://www.spid.gov.it/SpidL2" as SpidLevelEnum,
    walletToken:
      "666666635248824960766f96115b59ac1c2ca700c7e68192e4a7c26e1e17ca4fcc2a66e158295390624f87f05f53235e"
  })
];
