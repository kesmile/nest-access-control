import { SetMetadata } from '@nestjs/common';
import { Role } from '../role.interface';
/**
 * Define an access information required for this route.
 * Notic that all Roles must be satisfied/Passed
 */
export const UseRole = (role: Role) => SetMetadata('role', role);
