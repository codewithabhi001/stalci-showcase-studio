import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { CmsService } from './cms.service';

@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  // --- Config ---
  @Get('config')
  getSiteConfigs() {
    return this.cmsService.getSiteConfigs();
  }

  @Get('config/map')
  getSiteConfigMap() {
    return this.cmsService.getSiteConfigMap();
  }

  @Put('config/:key')
  updateSiteConfig(@Param('key') key: string, @Body('value') value: string) {
    return this.cmsService.updateSiteConfig(key, value);
  }

  // --- Technologies ---
  @Get('technologies')
  getTechnologies(@Query('category') category?: string) {
    return this.cmsService.getTechnologies(category);
  }

  @Post('technologies')
  createTechnology(@Body() data: any) {
    return this.cmsService.createTechnology(data);
  }

  @Put('technologies/:id')
  updateTechnology(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.cmsService.updateTechnology(id, data);
  }

  @Delete('technologies/:id')
  deleteTechnology(@Param('id', ParseIntPipe) id: number) {
    return this.cmsService.deleteTechnology(id);
  }

  // --- Pages ---
  @Get('pages')
  getPages() {
    return this.cmsService.getPages();
  }

  @Get('pages/:slug')
  getPageBySlug(@Param('slug') slug: string) {
    return this.cmsService.getPageBySlug(slug);
  }

  @Post('pages')
  createPage(@Body() data: any) {
    return this.cmsService.createPage(data);
  }

  @Put('pages/:id')
  updatePage(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.cmsService.updatePage(id, data);
  }

  @Delete('pages/:id')
  deletePage(@Param('id', ParseIntPipe) id: number) {
    return this.cmsService.deletePage(id);
  }

  // --- Blogs ---
  @Get('blogs')
  getBlogs() {
    return this.cmsService.getBlogs();
  }

  @Get('blogs/:slug')
  getBlogBySlug(@Param('slug') slug: string) {
    return this.cmsService.getBlogBySlug(slug);
  }

  @Post('blogs')
  createBlog(@Body() data: any) {
    return this.cmsService.createBlog(data);
  }

  @Put('blogs/:id')
  updateBlog(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.cmsService.updateBlog(id, data);
  }

  @Delete('blogs/:id')
  deleteBlog(@Param('id', ParseIntPipe) id: number) {
    return this.cmsService.deleteBlog(id);
  }

  // --- Industries ---
  @Get('industries')
  getIndustries() {
    return this.cmsService.getIndustries();
  }

  @Get('industries/:slug')
  getIndustryBySlug(@Param('slug') slug: string) {
    return this.cmsService.getIndustryBySlug(slug);
  }

  @Post('industries')
  createIndustry(@Body() data: any) {
    return this.cmsService.createIndustry(data);
  }

  @Put('industries/:id')
  updateIndustry(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.cmsService.updateIndustry(id, data);
  }

  @Delete('industries/:id')
  deleteIndustry(@Param('id', ParseIntPipe) id: number) {
    return this.cmsService.deleteIndustry(id);
  }

  // --- Products ---
  @Get('products')
  getProducts() {
    return this.cmsService.getProducts();
  }

  @Get('products/:slug')
  getProductBySlug(@Param('slug') slug: string) {
    return this.cmsService.getProductBySlug(slug);
  }

  @Post('products')
  createProduct(@Body() data: any) {
    return this.cmsService.createProduct(data);
  }

  @Put('products/:id')
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.cmsService.updateProduct(id, data);
  }

  @Delete('products/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.cmsService.deleteProduct(id);
  }

  // --- Services ---
  @Get('services')
  getServices() {
    return this.cmsService.getServices();
  }

  @Get('services/:slug')
  getServiceBySlug(@Param('slug') slug: string) {
    return this.cmsService.getServiceBySlug(slug);
  }

  @Post('services')
  createService(@Body() data: any) {
    return this.cmsService.createService(data);
  }

  @Put('services/:id')
  updateService(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.cmsService.updateService(id, data);
  }

  @Delete('services/:id')
  deleteService(@Param('id', ParseIntPipe) id: number) {
    return this.cmsService.deleteService(id);
  }

  // --- Testimonials ---
  @Get('testimonials')
  getTestimonials() {
    return this.cmsService.getTestimonials();
  }

  @Post('testimonials')
  createTestimonial(@Body() data: any) {
    return this.cmsService.createTestimonial(data);
  }

  @Put('testimonials/:id')
  updateTestimonial(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.cmsService.updateTestimonial(id, data);
  }

  @Delete('testimonials/:id')
  deleteTestimonial(@Param('id', ParseIntPipe) id: number) {
    return this.cmsService.deleteTestimonial(id);
  }
}
