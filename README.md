# CMS Builder

A clean, modular static site CMS framework that uses GitHub as a backend.

## Quick Start

1. **Configure your repository** in `cms-core/config/appSettings.json`:
   ```json
   {
     "GIT_Account": "your-username",
     "GIT_Repository": "your-repo"
   }
   ```

2. **Enable modules** in `cms-core/config/modules.json`:
   ```json
   {
     "active": ["blog"]
   }
   ```

3. **Access admin panel** at `/cms-core/admin/`

4. **Create content** using the admin interface

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
- `site/` - Your site-specific content (generated)
- `assets/` - Shared assets (CSS, fonts, etc.)
- `localServer/` - Local development server

## Development

The CMS generates static HTML files from JSON content stored in GitHub. Content is managed through the admin panel and automatically committed to your repository.

## License

[Your License Here]

