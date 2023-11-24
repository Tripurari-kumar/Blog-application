"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentsSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    //https://mongoosejs.com/docs/populate.html
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    blog: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Blog' },
});
exports.default = (0, mongoose_1.model)('Comment', commentsSchema);
//# sourceMappingURL=Comment.js.map