// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  AuthorizationContext,
  AuthorizationDecision,
  AuthorizationMetadata
} from '@loopback/authorization';
import {securityId, UserProfile} from '@loopback/security';
import _ from 'lodash';

// Instance level authorizer
// Can be also registered as an authorizer, depends on users' need.
export async function basicAuthorization(
  authorizationCtx: AuthorizationContext,
  metadata: AuthorizationMetadata,
): Promise<AuthorizationDecision> {
  // No access if authorization details are missing
  let currentUser: UserProfile;
  console.log("NORRIS: entering basic authorizor");
  console.log("NORRIS: Ctx length is: %d", authorizationCtx.principals.length);
  console.log("NORRIS: Ctx roles length is: %d", authorizationCtx.roles.length);
  if (authorizationCtx.principals.length > 0) {
    console.log("NORRIS: Ctx[0] is: %j", authorizationCtx.principals[0]);
    const user = _.pick(authorizationCtx.principals[0], [
      'id',
      'email',
      'roles',
    ]);
    console.log("NORRIS: user is: %j", user);
    currentUser = {[securityId]: user.id, email: user.email, roles: user.roles};
    console.log("NORRIS: current user object is: %j", currentUser);
  } else {
    return AuthorizationDecision.DENY;
  }

  if (!currentUser.roles) {
    console.log("NORRIS: there are no roles so DENY");
    return AuthorizationDecision.DENY;
  }

  // Authorize everything that does not have a allowedRoles property
  if (!metadata.allowedRoles) {
    return AuthorizationDecision.ALLOW;
  }

  let roleIsAllowed = false;
  for (const role of currentUser.roles) {
    if (metadata.allowedRoles!.includes(role)) {
      roleIsAllowed = true;
      break;
    }
  }

  if (!roleIsAllowed) {
    return AuthorizationDecision.DENY;
  }

  console.log("NORRIS: what is in roles: %s", JSON.stringify(currentUser.roles));
  // Admin and developer accounts bypass id verification
  if (
    currentUser.roles.includes('admin') ||
    currentUser.roles.includes('developer')
  ) {
    console.log("NORRIS: current role includes admin or developer");
    return AuthorizationDecision.ALLOW;
  }

  /**
   * Allow access only to model owners, using route as source of truth
   *
   * eg. @post('/users/{userId}/orders', ...) returns `userId` as args[0]
   */
   console.log("NORRIS: final condition check: invocationContext: %j", authorizationCtx.invocationContext.args[0]);
  if (currentUser[securityId] === authorizationCtx.invocationContext.args[0]) {
    return AuthorizationDecision.ALLOW;
  }
  console.log("NORRIS: fallen through everything so DENY");
  return AuthorizationDecision.DENY;
}
