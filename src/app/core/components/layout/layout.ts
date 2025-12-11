import { Component, Input } from '@angular/core';
import { LayoutComponent } from "@shared/components/ui/layout/layout.component";
import { ContentComponent } from "@shared/components/ui/layout/content.component";
import { FooterComponent } from "@shared/components/ui/layout/footer.component";
import { HeaderComponent } from "@shared/components/ui/layout/header.component";
import { ZardButtonComponent } from "@shared/components/ui/button/button.component";
import { ZardIconComponent } from "@shared/components/ui/icon/icon.component";
import { ButtonLogout } from "../button-logout/button-logout";
import { LayoutModule } from "@shared/components/ui/layout/layout.module";
// import { ZardSkeletonComponent } from "@shared/components/ui/skeleton/skeleton.component";
import { MenuLayout } from '@core/types';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-layout',
  imports: [
    LayoutComponent,
    ContentComponent,
    FooterComponent,
    HeaderComponent,
    ZardButtonComponent,
    ZardIconComponent,
    ButtonLogout,
    LayoutModule,
    // ZardSkeletonComponent,
    RouterLink,
    RouterOutlet
],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  @Input() menu: MenuLayout[] = {} as MenuLayout[];
  year = new Date().getFullYear();
}
