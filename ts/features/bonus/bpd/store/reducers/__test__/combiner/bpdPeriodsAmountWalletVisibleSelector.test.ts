import * as pot from "italia-ts-commons/lib/pot";
import { remoteReady } from "../../../../model/RemoteValue";
import { AwardPeriodId } from "../../../actions/periods";
import { eligibleAmount, zeroAmount } from "../../__mock__/amount";
import {
  activePeriod,
  closedPeriod,
  inactivePeriod
} from "../../__mock__/periods";
import {
  BpdPeriodAmount,
  bpdPeriodsAmountWalletVisibleSelector
} from "../../details/combiner";

const inactivePeriodA: BpdPeriodAmount = {
  amount: zeroAmount,
  period: {
    ...inactivePeriod,
    startDate: new Date("2025-01-01"),
    awardPeriodId: 55 as AwardPeriodId
  }
};
const inactivePeriodB: BpdPeriodAmount = {
  amount: zeroAmount,
  period: inactivePeriod
};
const inactivePeriodC: BpdPeriodAmount = {
  amount: zeroAmount,
  period: {
    ...inactivePeriod,
    startDate: new Date("2022-01-01"),
    awardPeriodId: 56 as AwardPeriodId
  }
};

const activePeriodAmount: BpdPeriodAmount = {
  amount: zeroAmount,
  period: activePeriod
};

const closedPeriodZeroAmount: BpdPeriodAmount = {
  amount: zeroAmount,
  period: closedPeriod
};

const closedPeriodWithAmount: BpdPeriodAmount = {
  amount: eligibleAmount,
  period: closedPeriod
};

describe("test bpdPeriodsAmountWalletVisibleSelector when bpd is enabled", () => {
  it("one inactive period should return one inactive period", () => {
    const visiblePeriods = bpdPeriodsAmountWalletVisibleSelector.resultFunc(
      pot.some([inactivePeriodB]),
      remoteReady(true)
    );

    expect(pot.isSome(visiblePeriods)).toBeTruthy();
    if (pot.isSome(visiblePeriods)) {
      expect(visiblePeriods.value.length).toBe(1);
      expect(visiblePeriods.value[0].period.awardPeriodId).toBe(
        inactivePeriod.awardPeriodId
      );
    }
  });
  it("with multiple inactive period should return the most recent inactive period", () => {
    const visiblePeriods = bpdPeriodsAmountWalletVisibleSelector.resultFunc(
      pot.some([inactivePeriodA, inactivePeriodB, inactivePeriodC]),
      remoteReady(true)
    );

    expect(pot.isSome(visiblePeriods)).toBeTruthy();
    if (pot.isSome(visiblePeriods)) {
      expect(visiblePeriods.value.length).toBe(1);
      expect(visiblePeriods.value[0].period.awardPeriodId).toBe(
        inactivePeriodB.period.awardPeriodId
      );
    }
  });

  it(
    "with multiple inactive period and an active period " +
      "should return the active period",
    () => {
      const visiblePeriods = bpdPeriodsAmountWalletVisibleSelector.resultFunc(
        pot.some([
          activePeriodAmount,
          inactivePeriodA,
          inactivePeriodB,
          inactivePeriodC
        ]),
        remoteReady(true)
      );

      expect(pot.isSome(visiblePeriods)).toBeTruthy();
      if (pot.isSome(visiblePeriods)) {
        expect(visiblePeriods.value.length).toBe(1);
        expect(visiblePeriods.value[0].period.awardPeriodId).toBe(
          activePeriodAmount.period.awardPeriodId
        );
      }
    }
  );

  it(
    "with multiple inactive period, an active period and a closed period (with amount zero) " +
      "should return the active period",
    () => {
      const visiblePeriods = bpdPeriodsAmountWalletVisibleSelector.resultFunc(
        pot.some([
          closedPeriodZeroAmount,
          activePeriodAmount,
          inactivePeriodA,
          inactivePeriodB,
          inactivePeriodC
        ]),
        remoteReady(true)
      );

      expect(pot.isSome(visiblePeriods)).toBeTruthy();
      if (pot.isSome(visiblePeriods)) {
        expect(visiblePeriods.value.length).toBe(1);
        expect(visiblePeriods.value[0].period.awardPeriodId).toBe(
          activePeriodAmount.period.awardPeriodId
        );
      }
    }
  );

  it(
    "with multiple inactive period, an active period and a closed period (with amount > zero) " +
      "should return the active period and the closed period",
    () => {
      const visiblePeriods = bpdPeriodsAmountWalletVisibleSelector.resultFunc(
        pot.some([
          closedPeriodWithAmount,
          activePeriodAmount,
          inactivePeriodA,
          inactivePeriodB,
          inactivePeriodC
        ]),
        remoteReady(true)
      );

      expect(pot.isSome(visiblePeriods)).toBeTruthy();
      if (pot.isSome(visiblePeriods)) {
        expect(visiblePeriods.value.length).toBe(2);
        expect(visiblePeriods.value[0].period.awardPeriodId).toBe(
          closedPeriodWithAmount.period.awardPeriodId
        );
        expect(visiblePeriods.value[1].period.awardPeriodId).toBe(
          activePeriodAmount.period.awardPeriodId
        );
      }
    }
  );

  it(
    "with multiple inactive period and a closed period (with amount > zero) " +
      "should return the closed period",
    () => {
      const visiblePeriods = bpdPeriodsAmountWalletVisibleSelector.resultFunc(
        pot.some([
          closedPeriodWithAmount,
          inactivePeriodA,
          inactivePeriodB,
          inactivePeriodC
        ]),
        remoteReady(true)
      );

      expect(pot.isSome(visiblePeriods)).toBeTruthy();
      if (pot.isSome(visiblePeriods)) {
        expect(visiblePeriods.value.length).toBe(1);
        expect(visiblePeriods.value[0].period.awardPeriodId).toBe(
          closedPeriodWithAmount.period.awardPeriodId
        );
      }
    }
  );
  it(
    "with multiple inactive period and a closed period (with amount zero) " +
      "should return no periods",
    () => {
      const visiblePeriods = bpdPeriodsAmountWalletVisibleSelector.resultFunc(
        pot.some([
          closedPeriodZeroAmount,
          inactivePeriodA,
          inactivePeriodB,
          inactivePeriodC
        ]),
        remoteReady(true)
      );

      expect(pot.isSome(visiblePeriods)).toBeTruthy();
      if (pot.isSome(visiblePeriods)) {
        expect(visiblePeriods.value.length).toBe(0);
      }
    }
  );
});

describe("test bpdPeriodsAmountWalletVisibleSelector when bpd is disabled", () => {
  it("one inactive period should return no periods", () => {
    const visiblePeriods = bpdPeriodsAmountWalletVisibleSelector.resultFunc(
      pot.some([inactivePeriodB]),
      remoteReady(false)
    );

    expect(pot.isSome(visiblePeriods)).toBeTruthy();
    if (pot.isSome(visiblePeriods)) {
      expect(visiblePeriods.value.length).toBe(0);
    }
  });
  it("with multiple inactive period should return no periods", () => {
    const visiblePeriods = bpdPeriodsAmountWalletVisibleSelector.resultFunc(
      pot.some([inactivePeriodA, inactivePeriodB, inactivePeriodC]),
      remoteReady(false)
    );

    expect(pot.isSome(visiblePeriods)).toBeTruthy();
    if (pot.isSome(visiblePeriods)) {
      expect(visiblePeriods.value.length).toBe(0);
    }
  });

  it(
    "with multiple inactive period and an active period " +
      "should return no periods",
    () => {
      const visiblePeriods = bpdPeriodsAmountWalletVisibleSelector.resultFunc(
        pot.some([
          activePeriodAmount,
          inactivePeriodA,
          inactivePeriodB,
          inactivePeriodC
        ]),
        remoteReady(false)
      );

      expect(pot.isSome(visiblePeriods)).toBeTruthy();
      if (pot.isSome(visiblePeriods)) {
        expect(visiblePeriods.value.length).toBe(0);
      }
    }
  );

  it(
    "with multiple inactive period, an active period and a closed period (with amount zero) " +
      "should return no periods",
    () => {
      const visiblePeriods = bpdPeriodsAmountWalletVisibleSelector.resultFunc(
        pot.some([
          closedPeriodZeroAmount,
          activePeriodAmount,
          inactivePeriodA,
          inactivePeriodB,
          inactivePeriodC
        ]),
        remoteReady(false)
      );

      expect(pot.isSome(visiblePeriods)).toBeTruthy();
      if (pot.isSome(visiblePeriods)) {
        expect(visiblePeriods.value.length).toBe(0);
      }
    }
  );

  it(
    "with multiple inactive period, an active period and a closed period (with amount > zero) " +
      "should return the closed period",
    () => {
      const visiblePeriods = bpdPeriodsAmountWalletVisibleSelector.resultFunc(
        pot.some([
          closedPeriodWithAmount,
          activePeriodAmount,
          inactivePeriodA,
          inactivePeriodB,
          inactivePeriodC
        ]),
        remoteReady(false)
      );

      expect(pot.isSome(visiblePeriods)).toBeTruthy();
      if (pot.isSome(visiblePeriods)) {
        expect(visiblePeriods.value.length).toBe(1);
        expect(visiblePeriods.value[0].period.awardPeriodId).toBe(
          closedPeriodWithAmount.period.awardPeriodId
        );
      }
    }
  );

  it(
    "with multiple inactive period and a closed period (with amount > zero) " +
      "should return the closed period",
    () => {
      const visiblePeriods = bpdPeriodsAmountWalletVisibleSelector.resultFunc(
        pot.some([
          closedPeriodWithAmount,
          inactivePeriodA,
          inactivePeriodB,
          inactivePeriodC
        ]),
        remoteReady(false)
      );

      expect(pot.isSome(visiblePeriods)).toBeTruthy();
      if (pot.isSome(visiblePeriods)) {
        expect(visiblePeriods.value.length).toBe(1);
        expect(visiblePeriods.value[0].period.awardPeriodId).toBe(
          closedPeriodWithAmount.period.awardPeriodId
        );
      }
    }
  );
  it(
    "with multiple inactive period and a closed period (with amount zero) " +
      "should return no periods",
    () => {
      const visiblePeriods = bpdPeriodsAmountWalletVisibleSelector.resultFunc(
        pot.some([
          closedPeriodZeroAmount,
          inactivePeriodA,
          inactivePeriodB,
          inactivePeriodC
        ]),
        remoteReady(false)
      );

      expect(pot.isSome(visiblePeriods)).toBeTruthy();
      if (pot.isSome(visiblePeriods)) {
        expect(visiblePeriods.value.length).toBe(0);
      }
    }
  );
});
