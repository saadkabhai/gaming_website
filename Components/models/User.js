import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    Username: { type: String, required: true, unique: true },
    Email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    Password: { type: String, required: true },
    OTPCode: { type: Number, required: true },
    CPCode: { type: Number },
    Status: { type: String, required: true },
    Color: { type: String },
    Points: { type: Number, required: true },
    Money: { type: Number, required: true },
    InvitedBy: { type: Object },
    OTPCodeUpdate: { type: Date },
    ChangePasswordCodeUpdate: { type: Date },
    CreatedAt: { type: Date, required: true, default: Date.now }
}, { collection: 'Users' });

export const User = mongoose.models.User || mongoose.model('User', userSchema);