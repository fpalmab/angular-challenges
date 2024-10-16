import { FakeBackendService } from '@angular-challenges/power-of-effect/backend';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  inject,
  isDevMode,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { NotificationService } from './data-access/notification.service';
import { ROUTES } from './routes';
import { StudentEffects } from './student/store/student.effects';
import {
  studentReducer,
  studentsFeatureKey,
} from './student/store/student.reducer';
import { TeacherEffects } from './teacher/store/teacher.effects';
import {
  teacherReducer,
  teachersFeatureKey,
} from './teacher/store/teacher.reducer';

const REDUCERS = {
  [teachersFeatureKey]: teacherReducer,
  [studentsFeatureKey]: studentReducer,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(REDUCERS),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
    provideEffects([TeacherEffects, StudentEffects]),
    provideRouter(ROUTES),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const service = inject(FakeBackendService);
        return () => service.start();
      },
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const service = inject(NotificationService);
        return () => service.init();
      },
    },
    provideAnimations(),
  ],
};
