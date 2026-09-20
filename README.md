<div align="center">
  <h1>LokKatha</h1>
  <p><strong>An Atlas of Living Memory</strong></p>
  <p>A community-driven digital archive preserving the oral traditions, myths, and folklore that history forgot.</p>
</div>

---

## 📖 Overview

**LokKatha** is an immersive, interactive web platform dedicated to exploring the rich, untold stories of locations across India. By combining factual historical data (powered by Wikipedia) with community-submitted memories and legends, LokKatha bridges the gap between documented history and oral tradition.

Built with a cinematic, dark-mode-first design language, the platform emphasizes storytelling, atmosphere, and user engagement.

## ✨ Key Features

- **Cinematic User Interface**: A beautifully crafted, atmospheric UI with dynamic panning backgrounds, subtle animations, and modern typography.
- **Interactive Exploration Map**: Navigate through folklore and legends geographically using a seamless, integrated interactive map powered by React Leaflet.
- **Dynamic Location Archives**: Detailed pages for historical sites containing factual summaries, era/category classifications, and community-submitted lore.
- **Community Storytelling**: Full authentication system allowing users to securely register, log in, and share their own recollections, theories, or family stories about specific places.
- **Automated Data Sync**: Architecture built to synchronize baseline historical summaries with Wikipedia APIs.

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router) (File-based routing)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (with custom design system & animations)
- **Backend & Auth**: [Supabase](https://supabase.com/) (PostgreSQL Database, Row Level Security, and Authentication)
- **Maps**: [React Leaflet](https://react-leaflet.js.org/) / OpenStreetMap
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)
- A [Supabase](https://supabase.com/) Account (for database and auth)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/lokkatha.git
   cd lokkatha
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory of the project and add your Supabase project credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to see the application.

## 🗄️ Database Schema (Supabase)

To replicate the backend environment, execute the provided `schema.sql` (found in the repository or artifacts) in your Supabase SQL editor. The schema includes:
- `locations`: Stores geographical coordinates, descriptions, and media.
- `historical_lore`: Curated legends and stories tied to locations.
- `user_comments`: Community interactions tied to Supabase Auth.
- **RLS Policies**: Secure read/write access controls.

## 🌍 Deployment

This project is optimized for deployment on **Vercel** as a Single Page Application (SPA). A `vercel.json` file is included in the root directory to handle client-side routing rewrites automatically.

1. Import the repository into your Vercel dashboard.
2. Add the `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` variables in the Vercel Environment Variables settings.
3. Click **Deploy**.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
