import {call, put} from "redux-saga/effects";
import {readableReport} from "italia-ts-commons/lib/reporters";
import {BackendCgnMerchants} from "../../../api/backendCgnMerchants";
import {SagaCallReturnType} from "../../../../../../types/utils";
import {cgnOfflineMerchants, cgnOnlineMerchants} from "../../../store/actions/merchants";
import {OnlineMerchants} from "../../../../../../../definitions/cgn/merchants/OnlineMerchants";
import {getNetworkError} from "../../../../../../utils/errors";
import {OfflineMerchants} from "../../../../../../../definitions/cgn/merchants/OfflineMerchants";

export function* cgnOnlineMerchantsSaga(
  getOnlineMerchants: ReturnType<typeof BackendCgnMerchants>["getOnlineMerchants"]
) {
  try {
    const onlineMerchantsResult: SagaCallReturnType<typeof getOnlineMerchants> = yield call(
      getOnlineMerchants,
      {}
    );

    if (onlineMerchantsResult.isLeft()) {
      yield put(
        cgnOnlineMerchants.failure({
          kind: "generic",
          value: new Error(readableReport(onlineMerchantsResult.value))
        })
      );
      return;
    }

    if (
      onlineMerchantsResult.isRight() &&
      OnlineMerchants.is(onlineMerchantsResult.value.value)
    ) {
      yield put(
        cgnOnlineMerchants.success(onlineMerchantsResult.value.value.items)
      );
    }
  } catch (e) {
    yield put(cgnOnlineMerchants.failure(getNetworkError(e)));
  }
}

export function* cgnOfflineMerchantsSaga(
  getOfflineMerchants: ReturnType<typeof BackendCgnMerchants>["getOfflineMerchants"]
) {
  try {
    const offlineMerchantsResult: SagaCallReturnType<typeof getOfflineMerchants> = yield call(
      getOfflineMerchants,
      {
        offlineMerchantSearchRequest: {
          boundingBox:
        }
      }
    );

    if (offlineMerchantsResult.isLeft()) {
      yield put(
        cgnOfflineMerchants.failure({
          kind: "generic",
          value: new Error(readableReport(offlineMerchantsResult.value))
        })
      );
      return;
    }

    if (
      offlineMerchantsResult.isRight() &&
      OfflineMerchants.is(offlineMerchantsResult.value.value)
    ) {
      yield put(
        cgnOfflineMerchants.success(offlineMerchantsResult.value.value.items)
      );
    }
  } catch (e) {
    yield put(cgnOfflineMerchants.failure(getNetworkError(e)));
  }
}
