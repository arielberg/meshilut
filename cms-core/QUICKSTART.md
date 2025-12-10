# Quick Start Guide

## Setup

1. **Configure GitHub Repository**
   Edit `config/appSettings.json`:
   ```json
   {
     "GIT_Account": "your-username",
     "GIT_Repository": "your-repo-name"
   }
   ```

2. **Enable Modules**
   Edit `config/modules.json`:
   ```json
   {
     "active": ["blog"]
   }
   ```

3. **Access Admin Panel**
   Open `/cms-core/admin/index.html` in your browser

4. **Login**
   - First time: You'll be prompted to authenticate with GitHub
   - Enter your GitHub token when prompted

5. **Create Content**
   - Navigate to "Blog Posts" in the sidebar
   - Click "Add New"
   - Fill in the form and save

## Creating Your First Module

1. **Create Module Directory**
   ```bash
   mkdir -p modules/my-module
   ```

2. **Create module.json**
   ```json
   {
     "name": "my-module",
     "version": "1.0.0",
     "description": "My first module",
     "provides": {
       "contentTypes": ["my-content"]
     }
   }
   ```

3. **Create contentTypes.json**
   ```json
   [
     {
       "name": "my-content",
       "label": "My Content",
       "labelPlural": "My Contents",
       "urlPrefix": "my-content/",
       "fields": [
         {"name": "title", "type": "textfield", "label": "Title"},
         {"name": "body", "type": "wysiwyg", "label": "Content"}
       ]
     }
   ]
   ```

4. **Enable Module**
   Add `"my-module"` to `active` array in `config/modules.json`

5. **Refresh Admin Panel**
   Your new content type will appear in the sidebar!

## Module Hooks

Add `hooks.mjs` to your module:

```javascript
export const hooks = {
  beforeRender: async (contentItem, context) => {
    // Modify content before rendering
    if (contentItem.type === 'my-content') {
      contentItem.customField = 'processed';
    }
    return contentItem;
  },
  
  afterSave: async (contentItem) => {
    // Do something after saving
    console.log('Saved:', contentItem.title);
    return contentItem;
  }
};
```

## Field Types

- `textfield` - Single line text
- `wysiwyg` - Rich text editor
- `date` - Date picker
- `image` - Image upload
- `file` - File upload
- `url` - URL input
- `select` - Dropdown (requires `values` object)

## Tips

- Content is stored as JSON in GitHub
- HTML pages are generated automatically
- Modules can be upgraded independently
- Use hooks to extend functionality without modifying core

