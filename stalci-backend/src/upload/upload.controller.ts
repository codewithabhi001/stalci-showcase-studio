import { Controller, Post, Body, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('upload')
export class UploadController {
  private uploadsDir = path.join(process.cwd(), 'public', 'uploads');

  constructor() {
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadSingle(@UploadedFile() file: any, @Body() body: any) {
    if (file) {
      const filename = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = path.join(this.uploadsDir, filename);
      fs.writeFileSync(filePath, file.buffer);
      const url = `/uploads/${filename}`;
      return {
        success: true,
        url,
        filename,
        size: file.size,
        mimeType: file.mimetype,
      };
    }

    // Support Base64 JSON upload fallback
    if (body?.filename && body?.base64) {
      const cleanBase64 = body.base64.replace(/^data:[^;]+;base64,/, '');
      const filename = `${Date.now()}-${body.filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = path.join(this.uploadsDir, filename);
      const buffer = Buffer.from(cleanBase64, 'base64');
      fs.writeFileSync(filePath, buffer);
      return {
        success: true,
        url: `/uploads/${filename}`,
        filename,
        size: buffer.length,
      };
    }

    // Support Mock URL fallback
    if (body?.url) {
      return {
        success: true,
        url: body.url,
        filename: body.filename || 'uploaded-file',
      };
    }

    throw new BadRequestException('No file or base64 payload provided');
  }

  @Post('mock')
  mockUpload(@Body() body: { filename?: string; category?: string }) {
    const filename = body?.filename || 'document.pdf';
    const fakeUrl = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80`;
    return {
      success: true,
      url: fakeUrl,
      filename,
      note: 'Mock file upload service response',
    };
  }
}
