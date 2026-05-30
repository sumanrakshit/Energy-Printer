import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { WhyChooseSectionComponent } from './components/why-choose-section/why-choose-section.component';
import { OurServiceComponent } from './components/our-service/our-service.component';
import { LatestModelsComponent } from './components/latest-models/latest-models.component';
import { PopularModelsComponent } from './components/popular-models/popular-models.component';
import { RepairBannerComponent } from './components/repair-banner/repair-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    WhyChooseSectionComponent,
    OurServiceComponent,
    LatestModelsComponent,
    PopularModelsComponent,
    RepairBannerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
