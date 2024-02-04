import User from "#models/user";

export default class UserRepository {
  public async findByEmail(email: string) {
    return await User.findBy('email', email)
  }

  public async store(data: { full_name: string, email: string, password: string }) {
    return await User.create({
      fullName: data.full_name,
      email: data.email,
      password: data.password,
    })
  }

  public async generateToken(email: string, password: string) {
    const user = await User.verifyCredentials(email, password)
    return await User.accessTokens.create(user)
  }
}