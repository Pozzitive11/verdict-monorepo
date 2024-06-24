import { inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "@global-shared/services";

export const AuthGuard: CanActivateFn = async (
  _route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const auth = inject(AuthService);

  // if (!auth.isAuthorized) auth.autoLogIn(state.url);
  if (!auth.isAuthorized) return true;

  if (!auth.loadedUser) {
    auth.isAuthorized = false;
    return false;
  }

  for (const page of auth.loadedUser.pages) {
    if (page === state.url) return true;
    if (page.endsWith("*") && state.url.startsWith(page.slice(0, -1)))
      return true;
  }

  // await router.navigate([auth.loadedUser.homePage])
  return false;
};
