/**
 * Module Loader System
 * Scans and loads modules from cms-core/modules/
 */

// Utils not needed in module loader - removed import

/**
 * Load all modules from the modules directory
 */
export async function loadModules() {
  const modules = [];
  const moduleRegistry = await getModuleRegistry();
  
  // Load each active module
  for (const moduleName of moduleRegistry.active) {
    try {
      const module = await loadModule(moduleName);
      if (module) {
        modules.push(module);
      }
    } catch (error) {
      console.error(`Failed to load module ${moduleName}:`, error);
    }
  }
  
  return modules;
}

/**
 * Load a single module
 */
async function loadModule(moduleName) {
  // Path relative to admin/scripts/ where this is imported from
  const modulePath = `../../modules/${moduleName}`;
  
  try {
    // Load module configuration
    const moduleConfig = await fetch(`${modulePath}/module.json`)
      .then(res => res.ok ? res.json() : null)
      .catch(() => null);
    
    if (!moduleConfig) {
      console.warn(`Module ${moduleName} has no module.json`);
      return null;
    }
    
    // Load content types from module
    const contentTypes = await loadModuleContentTypes(modulePath);
    
    // Load hooks from module
    const hooks = await loadModuleHooks(modulePath);
    
    // Load templates from module
    const templates = await loadModuleTemplates(modulePath);
    
    return {
      name: moduleName,
      config: moduleConfig,
      contentTypes: contentTypes || [],
      hooks: hooks || {},
      templates: templates || {},
      path: modulePath
    };
  } catch (error) {
    console.error(`Error loading module ${moduleName}:`, error);
    return null;
  }
}

/**
 * Load content types from a module
 */
async function loadModuleContentTypes(modulePath) {
  try {
    const response = await fetch(`${modulePath}/contentTypes.json`);
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    // Module may not have contentTypes.json
    return [];
  }
}

/**
 * Load hooks from a module
 */
async function loadModuleHooks(modulePath) {
  try {
    const module = await import(`${modulePath}/hooks.mjs`);
    return module.hooks || {};
  } catch (error) {
    // Module may not have hooks
    return {};
  }
}

/**
 * Load templates from a module
 */
async function loadModuleTemplates(modulePath) {
  // Templates are loaded on-demand, just return the path
  return {
    path: `${modulePath}/templates`
  };
}

/**
 * Get module registry (which modules are active)
 */
async function getModuleRegistry() {
  try {
    // Path relative to admin/scripts/ where this is imported from
    const response = await fetch('../../config/modules.json');
    if (!response.ok) {
      // Return default registry if file doesn't exist
      return { active: [], disabled: [] };
    }
    return await response.json();
  } catch (error) {
    return { active: [], disabled: [] };
  }
}

/**
 * Merge content types from all modules
 */
export function mergeContentTypes(modules) {
  let allContentTypes = [];
  
  modules.forEach(module => {
    if (module.contentTypes && module.contentTypes.length > 0) {
      // Add module name to each content type for tracking
      const moduleContentTypes = module.contentTypes.map(ct => ({
        ...ct,
        _module: module.name
      }));
      allContentTypes = allContentTypes.concat(moduleContentTypes);
    }
  });
  
  return allContentTypes;
}

/**
 * Merge hooks from all modules
 */
export function mergeHooks(modules) {
  const mergedHooks = {};
  
  modules.forEach(module => {
    if (module.hooks) {
      Object.keys(module.hooks).forEach(hookName => {
        if (!mergedHooks[hookName]) {
          mergedHooks[hookName] = [];
        }
        mergedHooks[hookName].push({
          module: module.name,
          handler: module.hooks[hookName]
        });
      });
    }
  });
  
  return mergedHooks;
}

