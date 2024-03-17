import 'tailwindcss/tailwind.css'
import '@/assets/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

// Use plugin defaults (optional)
const app = createApp(App)
app.mount('#app')
app.use(setupCalendar, {})

// Use the components
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)


  