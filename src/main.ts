import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// ✅ Register Chart.js components globally (works with ng2-charts)
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));