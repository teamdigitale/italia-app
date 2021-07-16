/**
 * Implements the reducers for static content.
 */
import { fromNullable, none, Option } from "fp-ts/lib/Option";
import * as pot from "italia-ts-commons/lib/pot";
import { ITuple2 } from "italia-ts-commons/lib/tuples";
import { NavigationState } from "react-navigation";
import { createSelector } from "reselect";
import { getType } from "typesafe-actions";
import { ContextualHelp } from "../../../definitions/content/ContextualHelp";
import { Idp } from "../../../definitions/content/Idp";
import { Municipality as MunicipalityMetadata } from "../../../definitions/content/Municipality";
import { ScreenCHData } from "../../../definitions/content/ScreenCHData";
import { Service as ServiceMetadata } from "../../../definitions/content/Service";
import { IdentityProviderId } from "../../models/IdentityProvider";
import { CodiceCatastale } from "../../types/MunicipalityCodiceCatastale";
import { getCurrentRouteName } from "../../utils/navigation";
import {
  contentMunicipalityLoad,
  loadContextualHelpData,
  loadIdps,
  loadServiceMetadata
} from "../actions/content";
import { clearCache } from "../actions/profile";
import { removeServiceTuples } from "../actions/services";
import { Action } from "../actions/types";
import {
  isReady,
  remoteError,
  remoteLoading,
  remoteReady,
  remoteUndefined,
  RemoteValue
} from "../../features/bonus/bpd/model/RemoteValue";
import { SpidIdps } from "../../../definitions/content/SpidIdps";
import { SpidIdp } from "../../../definitions/content/SpidIdp";
import { idps as idpsFallback, LocalIdpsFallback } from "../../utils/idps";
import { getRemoteLocale } from "../../utils/messages";
import { navSelector } from "./navigationHistory";
import { GlobalState } from "./types";

/**
 * Stores useful content such as services and organizations metadata,
 * help pages, etc...
 */
export type ContentState = Readonly<{
  servicesMetadata: {
    byId: ServiceMetadataById;
  };
  municipality: MunicipalityState;
  contextualHelp: pot.Pot<ContextualHelp, Error>;
  idps: RemoteValue<SpidIdps, Error>;
}>;

export type MunicipalityState = Readonly<{
  codiceCatastale: pot.Pot<CodiceCatastale, Error>;
  data: pot.Pot<MunicipalityMetadata, Error>;
}>;

export type ServiceMetadataState = pot.Pot<ServiceMetadata | undefined, Error>;

export type ServiceMetadataById = Readonly<{
  [key: string]: ServiceMetadataState;
}>;

export const initialContentState: ContentState = {
  servicesMetadata: {
    byId: {}
  },
  municipality: {
    codiceCatastale: pot.none,
    data: pot.none
  },
  contextualHelp: pot.none,
  idps: remoteUndefined
};

// Selectors
export const contentSelector = (state: GlobalState) => state.content;

export const servicesMetadataSelector = (state: GlobalState) =>
  state.content.servicesMetadata;

export const municipalitySelector = (state: GlobalState) =>
  state.content.municipality;

export const servicesMetadataByIdSelector = (state: GlobalState) =>
  state.content.servicesMetadata.byId;

export const serviceMetadataByIdSelector = (serviceId: string) => (
  state: GlobalState
) => servicesMetadataByIdSelector(state)[serviceId];

export const contextualHelpDataSelector = (
  state: GlobalState
): pot.Pot<ContextualHelp, Error> => state.content.contextualHelp;

export const idpsStateSelector = createSelector(
  contentSelector,
  (content: ContentState): ContentState["idps"] => content.idps
);

export const idpsSelector = createSelector(
  idpsStateSelector,
  (idps: ContentState["idps"]): ReadonlyArray<SpidIdp | LocalIdpsFallback> =>
    isReady(idps) ? idps.value.items : idpsFallback
);

/**
 * return an option with Idp contextual help data if they are loaded and defined
 * @param id
 */
export const idpContextualHelpDataFromIdSelector = (id: SpidIdp["id"]) =>
  createSelector<GlobalState, pot.Pot<ContextualHelp, Error>, Option<Idp>>(
    contextualHelpDataSelector,
    contextualHelpData =>
      pot.getOrElse(
        pot.map(contextualHelpData, data => {
          const locale = getRemoteLocale();

          return fromNullable(data[locale]).chain(l =>
            fromNullable(l.idps[id as IdentityProviderId])
          );
        }),
        none
      )
  );

/**
 * return a pot with screen contextual help data if they are loaded and defined otherwise
 * @param id
 */
export const screenContextualHelpDataSelector = createSelector<
  GlobalState,
  pot.Pot<ContextualHelp, Error>,
  NavigationState,
  pot.Pot<Option<ScreenCHData>, Error>
>([contextualHelpDataSelector, navSelector], (contextualHelpData, navState) =>
  pot.map(contextualHelpData, data => {
    const currentRouteName = getCurrentRouteName(navState);
    if (currentRouteName === undefined) {
      return none;
    }
    const locale = getRemoteLocale();
    const screenData =
      data[locale] !== undefined
        ? data[locale].screens.find(
            s =>
              s.route_name.toLowerCase() ===
              currentRouteName.toLocaleLowerCase()
          )
        : undefined;
    return fromNullable(screenData);
  })
);

export default function content(
  state: ContentState = initialContentState,
  action: Action
): ContentState {
  switch (action.type) {
    case getType(loadServiceMetadata.request):
      return {
        ...state,
        servicesMetadata: {
          byId: {
            ...state.servicesMetadata.byId,
            [action.payload]: pot.toLoading(
              state.servicesMetadata.byId[action.payload] || pot.none
            )
          }
        }
      };
    case getType(loadServiceMetadata.success):
      return {
        ...state,
        servicesMetadata: {
          byId: {
            ...state.servicesMetadata.byId,
            [action.payload.serviceId]: action.payload.data
          }
        }
      };

    case getType(loadServiceMetadata.failure):
      return {
        ...state,
        servicesMetadata: {
          byId: {
            ...state.servicesMetadata.byId,
            [action.payload.serviceId]: pot.toError(
              state.servicesMetadata.byId[action.payload.serviceId] || pot.none,
              action.payload.error
            )
          }
        }
      };

    case getType(contentMunicipalityLoad.request):
      const codiceCatastale = state.municipality.codiceCatastale;
      const municipalityData = state.municipality.data;
      return {
        ...state,
        municipality: {
          codiceCatastale: pot.toLoading(codiceCatastale),
          data: pot.toLoading(municipalityData)
        }
      };

    case getType(contentMunicipalityLoad.success):
      return {
        ...state,
        municipality: {
          codiceCatastale: pot.some(action.payload.codiceCatastale),
          data: pot.some(action.payload.data)
        }
      };

    case getType(contentMunicipalityLoad.failure):
      return {
        ...state,
        municipality: {
          codiceCatastale: pot.toError(
            state.municipality.codiceCatastale,
            action.payload.error
          ),
          data: pot.toError(state.municipality.data, action.payload.error)
        }
      };

    // contextualHelp text data
    case getType(loadContextualHelpData.request):
      return {
        ...state,
        contextualHelp: pot.toLoading(state.contextualHelp)
      };

    case getType(loadContextualHelpData.success):
      return {
        ...state,
        contextualHelp: pot.some(action.payload)
      };

    case getType(loadContextualHelpData.failure):
      return {
        ...state,
        contextualHelp: pot.toError(state.contextualHelp, action.payload)
      };

    // idps data
    case getType(loadIdps.request):
      return {
        ...state,
        idps: remoteLoading
      };

    case getType(loadIdps.success):
      return {
        ...state,
        idps: remoteReady(action.payload)
      };

    case getType(loadIdps.failure):
      return {
        ...state,
        idps: remoteError(action.payload)
      };

    case getType(clearCache):
      return {
        ...state,
        municipality: { ...initialContentState.municipality },
        contextualHelp: { ...initialContentState.contextualHelp }
      };

    case getType(removeServiceTuples): {
      // removeServiceTuples is dispatched to remove from the store
      // the service detail (and, here, metadata) related to services that are
      // no more visible and that are not related to messages list

      // references of the services to be removed from the store
      const serviceTuples: ReadonlyArray<ITuple2<string, string | undefined>> =
        action.payload;

      const newServicesMetadataByIdState = {
        ...state.servicesMetadata.byId
      };
      serviceTuples.forEach(
        // eslint-disable-next-line
        tuple => delete newServicesMetadataByIdState[tuple.e1]
      );
      return {
        ...state,
        servicesMetadata: {
          byId: newServicesMetadataByIdState
        }
      };
    }

    default:
      return state;
  }
}
