"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
/**
 * Define an access information required for this route.
 * Notic that all Roles must be satisfied/Passed
 */
exports.UseRole = (role) => common_1.SetMetadata('role', role);
