import * as pot from "italia-ts-commons/lib/pot";
import { IndexedById } from "../../../../../../../store/helpers/indexer";
import { BpdAmount } from "../../../actions/amount";
import { AwardPeriodId, BpdPeriod } from "../../../actions/periods";
import { zeroAmount } from "../../__mock__/amount";
import { activePeriod, inactivePeriod } from "../../__mock__/periods";
import { bpdAllPeriodsWithAmountSelector } from "../../details/combiner";

describe("test bpdAllPeriodsWithAmountSelector", () => {
  it("all amount none", () => {
    const allInactivePeriods: ReadonlyArray<BpdPeriod> = [
      { ...inactivePeriod, awardPeriodId: 0 as AwardPeriodId },
      { ...inactivePeriod, awardPeriodId: 1 as AwardPeriodId }
    ];
    const allNone: IndexedById<pot.Pot<BpdAmount, Error>> = {
      0: pot.none,
      1: pot.none
    };

    const periodsWithAmount = bpdAllPeriodsWithAmountSelector.resultFunc(
      pot.some([...allInactivePeriods]),
      allNone
    );

    expect(pot.isSome(periodsWithAmount)).toBeTruthy();

    if (pot.isSome(periodsWithAmount)) {
      expect(
        periodsWithAmount.value.every(
          pa =>
            pa.amount.totalCashback === 0 && pa.amount.transactionNumber === 0
        )
      );
    }
  });
  it("asdsa", () => {
    const allInactivePeriods: ReadonlyArray<BpdPeriod> = [
      { ...activePeriod, awardPeriodId: 0 as AwardPeriodId },
      { ...inactivePeriod, awardPeriodId: 1 as AwardPeriodId }
    ];
    const allNone: IndexedById<pot.Pot<BpdAmount, Error>> = {
      0: pot.someLoading(zeroAmount),
      1: pot.none
    };

    const periodsWithAmount = bpdAllPeriodsWithAmountSelector.resultFunc(
      pot.some([...allInactivePeriods]),
      allNone
    );

    expect(periodsWithAmount).toBe(pot.none);
  });
});
