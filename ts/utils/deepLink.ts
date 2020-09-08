import { NavigationNavigateActionPayload } from "react-navigation";

export function getNavigateActionFromDeepLink(
  url: string,
  deepLinkPrefix: string = "ioit://"
): NavigationNavigateActionPayload {
  const route = url.slice(deepLinkPrefix.length);
  const routeParts = route.split("/");
  const routeName = routeParts[0];
  const id = routeParts[1] || undefined;

  // FIXME: whitelist allowed routes
  return { routeName, params: { id } };
}
