import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Public } from '../auth/auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Public()
  @Get()
  getProjects(
    @Query('category') category?: string,
    @Query('featured') featured?: string,
  ) {
    const isFeatured = featured === 'true' ? true : featured === 'false' ? false : undefined;
    return this.projectsService.getProjects(category, isFeatured);
  }

  @Public()
  @Get('featured')
  getFeaturedProjects() {
    return this.projectsService.getFeaturedProjects();
  }

  @Public()
  @Get('slug/:slug')
  getProjectBySlug(@Param('slug') slug: string) {
    return this.projectsService.getProjectBySlug(slug);
  }

  @Public()
  @Get(':id')
  getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.getProjectById(id);
  }

  @Post()
  createProject(@Body() data: any) {
    return this.projectsService.createProject(data);
  }

  @Put(':id')
  updateProject(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.projectsService.updateProject(id, data);
  }

  @Delete(':id')
  deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.deleteProject(id);
  }
}
