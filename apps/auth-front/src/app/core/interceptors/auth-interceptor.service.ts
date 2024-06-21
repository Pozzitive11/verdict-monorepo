import { inject, Injectable } from "@angular/core";
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";

import { exhaustMap, take } from "rxjs";
import { NO_TOKEN } from "@core/models/no-token.function";
import { User } from "@core/models/user.model";
import { AuthService } from "@core/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  private readonly authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User | null) => {
        if (!user || req.url.includes("/v0/auth") || req.context.get(NO_TOKEN))
          return next.handle(req);
        const newParams = req.params;
        const modifiedReq = req.clone({
          params: newParams,
          headers: req.headers.set("Authorization", `Bearer ${user?.token}`),
        });

        return next.handle(modifiedReq);
      }),
    );
  }
}
