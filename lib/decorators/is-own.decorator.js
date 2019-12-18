"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
/**
 * Define an access information required for this route.
 * Notic that all Roles must be satisfied/Passed
 */
exports.IsOwn = common_1.createParamDecorator((data, req) => {
    console.log(req.isOwn);
    return data ? req[data] : req.isOwn;
});
