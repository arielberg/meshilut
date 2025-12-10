# CMS Builder

A clean, modular static site CMS framework that uses GitHub as a backend.

## Quick Start

### 🚀 Easy Setup (Recommended)

1. **Open the root URL**
   - Simply navigate to your site's root URL (e.g., `https://yoursite.com/` or `http://localhost:8000/`)
   - The system will automatically detect if configuration is needed
   - You'll be redirected to the setup wizard if not configured

2. **Or run Setup Wizard directly**
   - Open `/cms-core/init/index.html` in your browser
   - Follow the step-by-step wizard to configure everything automatically

3. **Access Admin Panel**
   - After setup, go to `/cms-core/admin/index.html` or return to root URL
   - Start creating content!

### 📝 Manual Setup

1. **Configure your repository** in `cms-core/config/appSettings.json`:
   ```json
   {
     "API_Params": ["your-username", "your-repo-name"],
     "GIT_Account": "your-username",
     "GIT_Repository": "your-repo-name"
   }
   ```

2. **Get GitHub Personal Access Token**
   - Go to: https://github.com/settings/tokens
   - Create a token with `repo` scope
   - See `cms-core/CONFIGURATION.md` for detailed instructions

3. **Enable modules** in `cms-core/config/modules.json`:
   ```json
   {
     "active": ["blog"]
   }
   ```

4. **Access admin panel** at `/cms-core/admin/`

5. **Create content** using the admin interface

## Module System

The CMS uses a modular architecture. See `cms-core/README.md` for details on creating and using modules.

### Available Modules

- **blog** - Blog posts with categories and reading time

### Adding Modules

1. Create a module directory in `cms-core/modules/`
2. Add `module.json` with module metadata
3. Add `contentTypes.json` to define content types
4. Optionally add `hooks.mjs` for custom functionality
5. Enable in `cms-core/config/modules.json`

## Structure

- `cms-core/` - Core CMS framework
  - `admin/` - Admin panel interface
  - `core/` - Core CMS engine (module loader, hooks)
  - `modules/` - Pluggable modules
  - `config/` - Configuration files
  - `init/` - Setup wizard
- `site/` - Your site-specific content (generated)
- `assets/` - Shared assets (CSS, fonts, etc.)
- `localServer/` - Local development server
- `index.html` - Root page (auto-redirects to setup or admin)

## Development

The CMS generates static HTML files from JSON content stored in GitHub. Content is managed through the admin panel and automatically committed to your repository.

## License

[Your License Here]
