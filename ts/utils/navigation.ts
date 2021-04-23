// gets the current screen from navigation state

import { index } from "fp-ts/lib/Array";
import { fromNullable, none, Option } from "fp-ts/lib/Option";
import { NavigationRoute, NavigationState } from "react-navigation";
import { NavigationHistoryState } from "../store/reducers/navigationHistory";

/**
 * TODO: Need to be fixed https://www.pivotaltracker.com/story/show/170819360
 * @deprecated
 */
export function getCurrentRouteName(navNode: any): string | undefined {
  if (!navNode) {
    return undefined;
  }
  if (
    navNode.index === undefined &&
    navNode.routeName &&
    typeof navNode.routeName === "string"
  ) {
    // navNode is a NavigationLeafRoute
    return navNode.routeName;
  }
  if (
    navNode.routes &&
    navNode.index !== undefined &&
    navNode.routes[navNode.index]
  ) {
    const route = navNode.routes[navNode.index];
    return getCurrentRouteName(route);
  }
  return undefined;
}

export const getActiveRoute = (
  route: NavigationState
): NavigationRoute | undefined => {
  if (!route) {
    return undefined;
  }

  const { routes, index } = route;

  return routes?.length && index < routes.length
    ? (getActiveRoute(routes[index] as NavigationState) as NavigationRoute)
    : (route as NavigationRoute);
};

export function getCurrentRouteKey(navNode: any): string | undefined {
  if (!navNode) {
    return undefined;
  }
  if (
    navNode.index === undefined &&
    navNode.key &&
    typeof navNode.key === "string"
  ) {
    // navNode is a NavigationLeafRoute
    return navNode.key;
  }
  if (
    navNode.routes &&
    navNode.index !== undefined &&
    navNode.routes[navNode.index]
  ) {
    const route = navNode.routes[navNode.index];
    return getCurrentRouteKey(route);
  }
  return undefined;
}

/**
 * This function returns the route name from a given NavigationRoute param
 * using recursion to navigate through the object until the leaf node
 */
export function getRouteName(route: NavigationRoute): Option<string> {
  if (route.index === undefined) {
    return fromNullable(route.routeName);
  }
  if (route.index >= route.routes.length) {
    return none;
  }
  return getRouteName(route.routes[route.index]);
}

/**
 * This function returns the name of the precedent navigation route to understand
 * from where the current route has been navigated
 */
export function whereAmIFrom(nav: NavigationHistoryState): Option<string> {
  const navLength = nav.length;
  return index(navLength - 1, [...nav]).fold(none, ln =>
    getRouteName(ln.routes[ln.index])
  );
}
