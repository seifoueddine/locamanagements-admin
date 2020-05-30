// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const url = 'http://localhost:3000';
const apiVersion = url + '/api/v1';
export const environment = {

  production: false,
  PAGE_SIZE: 10,
  PAGE_SIZE_MIN: 5,
  MAX_FILE_SIZE: 35,
  MAX_FILE_SIZE_ATTACHED: 16,
  SUPPORT_MAIL: 'test@email.com',
  URL_PATH: url,
  ENDPOINTS: {
    USERS_PATH: apiVersion + '/users',
    SLUGS_PATH: apiVersion + '/slugs',
    STATS: apiVersion + '/admin_dashboard/stats_count'
  },


};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
