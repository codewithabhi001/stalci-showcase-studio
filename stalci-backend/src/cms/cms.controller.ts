import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CmsService } from './cms.service';

@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  // --- Site Config ---
  @Get('config')
  getSiteConfigs() { return this.cmsService.getSiteConfigs(); }

  @Put('config/:key')
  updateSiteConfig(@Param('key') key: string, @Body() body: { value: string }) {
    return this.cmsService.updateSiteConfig(key, body.value);
  }

  // --- Pages ---
  @Get('pages')
  getPages() { return this.cmsService.getPages(); }

  @Get('pages/:slug')
  getPageBySlug(@Param('slug') slug: string) { return this.cmsService.getPageBySlug(slug); }

  @Post('pages')
  createPage(@Body() body: any) { return this.cmsService.createPage(body); }

  @Put('pages/:id')
  updatePage(@Param('id') id: string, @Body() body: any) { return this.cmsService.updatePage(+id, body); }

  @Delete('pages/:id')
  deletePage(@Param('id') id: string) { return this.cmsService.deletePage(+id); }

  // --- Blogs ---
  @Get('blogs')
  getBlogs() { return this.cmsService.getBlogs(); }

  @Get('blogs/:slug')
  getBlogBySlug(@Param('slug') slug: string) { return this.cmsService.getBlogBySlug(slug); }

  @Post('blogs')
  createBlog(@Body() body: any) { return this.cmsService.createBlog(body); }

  @Put('blogs/:id')
  updateBlog(@Param('id') id: string, @Body() body: any) { return this.cmsService.updateBlog(+id, body); }

  @Delete('blogs/:id')
  deleteBlog(@Param('id') id: string) { return this.cmsService.deleteBlog(+id); }

  // --- Industries ---
  @Get('industries')
  getIndustries() { return this.cmsService.getIndustries(); }

  @Get('industries/:slug')
  getIndustryBySlug(@Param('slug') slug: string) { return this.cmsService.getIndustryBySlug(slug); }

  @Post('industries')
  createIndustry(@Body() body: any) { return this.cmsService.createIndustry(body); }

  @Put('industries/:id')
  updateIndustry(@Param('id') id: string, @Body() body: any) { return this.cmsService.updateIndustry(+id, body); }

  @Delete('industries/:id')
  deleteIndustry(@Param('id') id: string) { return this.cmsService.deleteIndustry(+id); }

  // --- Products ---
  @Get('products')
  getProducts() { return this.cmsService.getProducts(); }

  @Get('products/:slug')
  getProductBySlug(@Param('slug') slug: string) { return this.cmsService.getProductBySlug(slug); }

  @Post('products')
  createProduct(@Body() body: any) { return this.cmsService.createProduct(body); }

  @Put('products/:id')
  updateProduct(@Param('id') id: string, @Body() body: any) { return this.cmsService.updateProduct(+id, body); }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string) { return this.cmsService.deleteProduct(+id); }

  // --- Services ---
  @Get('services')
  getServices() { return this.cmsService.getServices(); }

  @Get('services/:slug')
  getServiceBySlug(@Param('slug') slug: string) { return this.cmsService.getServiceBySlug(slug); }

  @Post('services')
  createService(@Body() body: any) { return this.cmsService.createService(body); }

  @Put('services/:id')
  updateService(@Param('id') id: string, @Body() body: any) { return this.cmsService.updateService(+id, body); }

  @Delete('services/:id')
  deleteService(@Param('id') id: string) { return this.cmsService.deleteService(+id); }

  // --- Testimonials ---
  @Get('testimonials')
  getTestimonials() { return this.cmsService.getTestimonials(); }

  @Post('testimonials')
  createTestimonial(@Body() body: any) { return this.cmsService.createTestimonial(body); }

  @Put('testimonials/:id')
  updateTestimonial(@Param('id') id: string, @Body() body: any) { return this.cmsService.updateTestimonial(+id, body); }

  @Delete('testimonials/:id')
  deleteTestimonial(@Param('id') id: string) { return this.cmsService.deleteTestimonial(+id); }
}
