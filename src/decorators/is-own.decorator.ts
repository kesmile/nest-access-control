import {  createParamDecorator } from '@nestjs/common';
/**
 * Define an access information required for this route.
 * Notic that all Roles must be satisfied/Passed
 */
export const IsOwn = createParamDecorator((data: string, req) => {
  console.log(req.isOwn)
  return data ? req[data] : req.isOwn;
});
