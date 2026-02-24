/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/exercise-detail`; params?: Router.UnknownInputParams; } | { pathname: `/exercises`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/running-session`; params?: Router.UnknownInputParams; } | { pathname: `/running`; params?: Router.UnknownInputParams; } | { pathname: `/yoga-session`; params?: Router.UnknownInputParams; } | { pathname: `/yoga`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/exercise-detail`; params?: Router.UnknownOutputParams; } | { pathname: `/exercises`; params?: Router.UnknownOutputParams; } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/running-session`; params?: Router.UnknownOutputParams; } | { pathname: `/running`; params?: Router.UnknownOutputParams; } | { pathname: `/yoga-session`; params?: Router.UnknownOutputParams; } | { pathname: `/yoga`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/exercise-detail${`?${string}` | `#${string}` | ''}` | `/exercises${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `/running-session${`?${string}` | `#${string}` | ''}` | `/running${`?${string}` | `#${string}` | ''}` | `/yoga-session${`?${string}` | `#${string}` | ''}` | `/yoga${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/exercise-detail`; params?: Router.UnknownInputParams; } | { pathname: `/exercises`; params?: Router.UnknownInputParams; } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/running-session`; params?: Router.UnknownInputParams; } | { pathname: `/running`; params?: Router.UnknownInputParams; } | { pathname: `/yoga-session`; params?: Router.UnknownInputParams; } | { pathname: `/yoga`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; };
    }
  }
}
