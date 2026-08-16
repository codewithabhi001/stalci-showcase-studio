import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard, Public } from './auth.guard';

@Controller('auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body);
  }

  @Get('me')
  async getMe(@Req() req: any) {
    const userId = req.user?.sub;
    return this.authService.getMe(userId);
  }

  @Post('change-password')
  async changePassword(@Req() req: any, @Body() body: { oldPassword: string; newPassword: string }) {
    const userId = req.user?.sub;
    return this.authService.changePassword(userId, body);
  }
}
