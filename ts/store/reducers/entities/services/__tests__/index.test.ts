// TODO: it has to be updated due to https://www.pivotaltracker.com/story/show/169013940

// It implies item 42, not having the corresponding serviceMetadata being loaded, is not included among the local sections
// Check what happen with items 41 and 42 beign someLoading and someError
import * as pot from "italia-ts-commons/lib/pot";
import {
  NonEmptyString,
  OrganizationFiscalCode
} from "italia-ts-commons/lib/strings";
import {
  localServicesSectionsSelector,
  nationalServicesSectionsSelector,
  notSelectedServicesSectionsSelector,
  organizationsOfInterestSelector,
  servicesBadgeValueSelector,
  ServicesSectionState,
  ServicesState,
  visibleServicesDetailLoadStateSelector
} from "..";
import { DepartmentName } from "../../../../../../definitions/backend/DepartmentName";
import { OrganizationName } from "../../../../../../definitions/backend/OrganizationName";
import { ServiceId } from "../../../../../../definitions/backend/ServiceId";
import { ServiceName } from "../../../../../../definitions/backend/ServiceName";
import { ServiceTuple } from "../../../../../../definitions/backend/ServiceTuple";
import { UserMetadataState } from "../../../userMetadata";
import { OrganizationsState } from "../../organizations";
import { ServicesByIdState } from "../servicesById";
import { VisibleServicesState } from "../visibleServices";
import { ServiceScopeEnum } from "../../../../../../definitions/backend/ServiceScope";

const customPotUserMetadata: UserMetadataState = pot.some({
  version: 1,
  metadata: {
    experimentalFeatures: true,
    organizationsOfInterest: ["1", "2", "3", "4"]
  }
});

const customServices: ServicesState = {
  servicePreference: pot.none,
  byId: {
    ["11"]: pot.noneError(Error()),
    ["21"]: pot.some({
      department_name: "test" as DepartmentName,
      organization_fiscal_code: "2" as OrganizationFiscalCode,
      organization_name: "organization2" as OrganizationName,
      service_id: "21" as ServiceId,
      service_name: "service1" as ServiceName,
      version: 1,
      service_metadata: {
        scope: ServiceScopeEnum.LOCAL
      }
    }),
    ["22"]: undefined,
    ["31"]: pot.someLoading({
      department_name: "test" as DepartmentName,
      organization_fiscal_code: "3" as OrganizationFiscalCode,
      organization_name: "organization3" as OrganizationName,
      service_id: "31" as ServiceId,
      service_name: "service1" as ServiceName,
      version: 1
    }),
    ["41"]: pot.someError(
      {
        department_name: "test" as DepartmentName,
        organization_fiscal_code: "4" as OrganizationFiscalCode,
        organization_name: "organization4" as OrganizationName,
        service_id: "41" as ServiceId,
        service_name: "service1" as ServiceName,
        version: 1,
        service_metadata: {
          scope: ServiceScopeEnum.LOCAL
        }
      },
      Error("Generic error")
    ),
    ["42"]: pot.someLoading({
      department_name: "test" as DepartmentName,
      organization_fiscal_code: "4" as OrganizationFiscalCode,
      organization_name: "organization4" as OrganizationName,
      service_id: "42" as ServiceId,
      service_name: "service1" as ServiceName,
      version: 1
    }),
    ["43"]: pot.someLoading({
      department_name: "test" as DepartmentName,
      organization_fiscal_code: "5" as OrganizationFiscalCode,
      organization_name: "same_organization_name" as OrganizationName,
      service_id: "43" as ServiceId,
      service_name: "service1" as ServiceName,
      version: 1
    }),
    ["44"]: pot.someLoading({
      department_name: "test" as DepartmentName,
      organization_fiscal_code: "6" as OrganizationFiscalCode,
      organization_name: "same_organization_name" as OrganizationName,
      service_id: "44" as ServiceId,
      service_name: "service1" as ServiceName,
      version: 1
    })
  },
  byOrgFiscalCode: {
    ["2"]: ["21" as ServiceId, "22" as ServiceId] as ReadonlyArray<ServiceId>,
    ["3"]: ["31" as ServiceId] as ReadonlyArray<ServiceId>,
    ["4"]: ["41" as ServiceId, "42" as ServiceId] as ReadonlyArray<ServiceId>,
    ["5"]: ["43" as ServiceId] as ReadonlyArray<ServiceId>,
    ["6"]: ["44" as ServiceId] as ReadonlyArray<ServiceId>
  },
  visible: pot.some([
    { service_id: "11", version: 1 } as ServiceTuple,
    { service_id: "21", version: 1 } as ServiceTuple,
    { service_id: "22", version: 1 } as ServiceTuple,
    { service_id: "41", version: 1 } as ServiceTuple,
    { service_id: "43", version: 1 } as ServiceTuple,
    { service_id: "44", version: 1 } as ServiceTuple
  ]),
  readState: {
    ["21"]: true
  },
  firstLoading: {
    isFirstServicesLoadingCompleted: true
  }
};

const customOrganizations: OrganizationsState = {
  all: [
    {
      name: "organizzazion2",
      fiscalCode: "2"
    },
    {
      name: "organization3",
      fiscalCode: "3"
    },
    {
      name: "organization4",
      fiscalCode: "4"
    },
    {
      name: "same_organization_name",
      fiscalCode: "5"
    },
    {
      name: "same_organization_name",
      fiscalCode: "6"
    }
  ],
  nameByFiscalCode: {
    ["2" as OrganizationFiscalCode]: "organizzazion2" as NonEmptyString,
    ["3" as OrganizationFiscalCode]: "organizzazion3" as NonEmptyString,
    ["4" as OrganizationFiscalCode]: "organizzazion4" as NonEmptyString,
    ["5" as OrganizationFiscalCode]: "same_organization_name" as NonEmptyString,
    ["6" as OrganizationFiscalCode]: "same_organization_name" as NonEmptyString
  }
};

const localServices: ReadonlyArray<ServicesSectionState> = [
  {
    organizationName: customOrganizations.nameByFiscalCode["2"] as string,
    organizationFiscalCode: "2" as OrganizationFiscalCode,
    data: [customServices.byId["21"]]
  } as ServicesSectionState,
  {
    organizationName: customOrganizations.nameByFiscalCode["4"] as string,
    organizationFiscalCode: "4" as OrganizationFiscalCode,
    data: [customServices.byId["41"]]
  } as ServicesSectionState
];

const nationalServices: ReadonlyArray<ServicesSectionState> = [];

describe("organizationsOfInterestSelector", () => {
  it("should include organizations in the user organizationsOfInterest and providing visible services among those properly loaded", () => {
    expect(
      organizationsOfInterestSelector.resultFunc(
        customPotUserMetadata,
        customServices
      )
    ).toStrictEqual(["2", "4"]);
  });
});

describe("nationalServicesSectionsSelector", () => {
  it("should return the services having scope equal to NATIONAL", () => {
    expect(
      nationalServicesSectionsSelector.resultFunc(
        customServices,
        customOrganizations.nameByFiscalCode
      )
    ).toStrictEqual(nationalServices);
  });
});

describe("localServicesSectionsSelector", () => {
  it("should return the services having metadata and scope equal to LOCAL", () => {
    expect(
      localServicesSectionsSelector.resultFunc(
        customServices,
        customOrganizations.nameByFiscalCode
      )
    ).toStrictEqual(localServices);
  });
});

describe("notSelectedServicesSectionsSelector", () => {
  it("should return all the visible services with scope equal to both NATIONAL and LOCAL if the user organizationsOfInterest is empty", () => {
    expect(
      notSelectedServicesSectionsSelector.resultFunc(
        customServices,
        customOrganizations.nameByFiscalCode,
        [""]
      )
    ).toStrictEqual([
      {
        organizationName: customOrganizations.nameByFiscalCode["2"] as string,
        organizationFiscalCode: "2" as OrganizationFiscalCode,
        data: [customServices.byId["21"]]
      },
      {
        organizationName: customOrganizations.nameByFiscalCode["4"] as string,
        organizationFiscalCode: "4" as OrganizationFiscalCode,
        data: [customServices.byId["41"]]
      },
      {
        organizationName: customOrganizations.nameByFiscalCode["5"] as string,
        organizationFiscalCode: "5" as OrganizationFiscalCode,
        data: [customServices.byId["43"], customServices.byId["44"]]
      }
    ]);
  });
});

describe("notSelectedServicesSectionsSelector", () => {
  it("should return all the visible services with scope equal to both NATIONAL and LOCAL not included in organizationsOfInterest", () => {
    expect(
      notSelectedServicesSectionsSelector.resultFunc(
        customServices,
        customOrganizations.nameByFiscalCode,
        ["4", "5"] // this organization has the same name of another organization (id:6)
      )
    ).toStrictEqual([
      {
        organizationName: customOrganizations.nameByFiscalCode["2"] as string,
        organizationFiscalCode: "2" as OrganizationFiscalCode,
        data: [customServices.byId["21"]]
      }
    ]);
  });
});

describe("visibleServicesDetailLoadStateSelector", () => {
  it("should do be pot.noneLoading if at least one visible service is loading", () => {
    expect(
      visibleServicesDetailLoadStateSelector.resultFunc(
        customServices.byId,
        customServices.visible
      )
    ).toBe(pot.noneLoading);
  });

  it("should do be pot.some when a service is loading but it is some", () => {
    const data = {
      byId: {
        "azure-deployc49a": {
          kind: "PotSomeLoading",
          value: {
            available_notification_channels: ["EMAIL", "WEBHOOK"],
            department_name: "Progetto IO",
            organization_fiscal_code: "15376371009",
            organization_name: "IO - L'app dei servizi pubblici",
            service_id: "azure-deployc49a",
            service_name: "Novità e aggiornamenti",
            version: 2
          }
        }
      },
      byOrgFiscalCode: {
        "15376371009": ["azure-deployc49a"]
      },
      visible: {
        kind: "PotSome",
        value: [
          {
            scope: "NATIONAL",
            service_id: "azure-deployc49a",
            version: 1
          }
        ]
      }
    };
    expect(
      visibleServicesDetailLoadStateSelector.resultFunc(
        data.byId as ServicesByIdState,
        data.visible as VisibleServicesState
      )
    ).toEqual(pot.some(undefined));
  });
});

describe("servicesBadgeValueSelector", () => {
  it("should return the number of unread services", () => {
    expect(
      servicesBadgeValueSelector.resultFunc(
        [...nationalServices],
        [...localServices],
        customServices.readState,
        true
      )
    ).toBe(1);
  });

  it("should return 0 if the first load is not yet completed", () => {
    expect(
      servicesBadgeValueSelector.resultFunc(
        [...nationalServices],
        [...localServices],
        customServices.readState,
        false
      )
    ).toBe(0);
  });

  it("should return 1 even if we have few duplication in services array", () => {
    expect(
      servicesBadgeValueSelector.resultFunc(
        [...nationalServices],
        [...localServices, ...localServices, ...localServices],
        customServices.readState,
        true
      )
    ).toBe(1);
  });
});
