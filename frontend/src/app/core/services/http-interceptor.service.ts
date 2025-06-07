import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpLoggingInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime = Date.now();
    
    console.log(`🚀 [HTTP] ${req.method} ${req.url}`);
    
    if (req.body) {
      console.log('📤 [Request Body]:', req.body);
    }

    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            const elapsed = Date.now() - startTime;
            console.log(`✅ [HTTP] ${req.method} ${req.url} - ${event.status} (${elapsed}ms)`);
            console.log('📥 [Response Body]:', event.body);
          }
        },
        error: (error: HttpErrorResponse) => {
          const elapsed = Date.now() - startTime;
          console.error(`❌ [HTTP] ${req.method} ${req.url} - ${error.status} (${elapsed}ms)`);
          console.error('💥 [Error]:', error.error);
        }
      })
    );
  }
} 