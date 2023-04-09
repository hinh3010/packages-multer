"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSlug = void 0;
const slugify_1 = __importDefault(require("slugify"));
/**
 * Converts a string to a URL slug.
 *
 * @param input - The string to be converted.
 * @returns The URL slug of the input string.
 */
const toSlug = (input) => {
    return (0, slugify_1.default)(input, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
        strict: true,
        trim: true
    });
};
exports.toSlug = toSlug;
