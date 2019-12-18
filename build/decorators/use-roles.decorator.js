"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
/**
 * Define an access information required for this route.
 * Notic that all Roles must be satisfied/Passed
 */
exports.UseRoles = (...roles) => common_1.SetMetadata('roles', roles);
//# sourceMappingURL=use-roles.decorator.js.map