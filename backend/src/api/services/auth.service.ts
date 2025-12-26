import { AppDataSource } from "../../data-source.js";
import { User } from "../../entity/User.js";
import type { loginType, registerType } from "../../types/auth.type.js";
import { createHttpError } from "../../utils/createHttpError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  private userRepo = AppDataSource.getRepository(User);
  private generateToken(user: User) {
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
  }

  // Register
  async register(data: registerType) {
    // Check email in database
    const existsUser = await this.userRepo.findOneBy({
      email: data.email,
    });

    if (existsUser) throw createHttpError(409, "Email already in use!");

    // Create new user
    const newUser = this.userRepo.create(data);
    await this.userRepo.save(newUser);

    const { password, ...userWithoutPass } = newUser;

    return userWithoutPass;
  }

  // Login
  async login(data: loginType) {
    // Check email user exists
    const user = await this.userRepo.findOne({
      where: { email: data.email },
      select: ["id", "email", "password", "firstName"],
    });

    if (!user) throw createHttpError(401, "Invalid email or password!");

    // Check password matches
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw createHttpError(401, "Invalid email or password!");

    const { password, ...userWithoutPass } = user;
    // Generate JWT (token)
    const token = this.generateToken(user);
    return { user: userWithoutPass, token };
  }
}
