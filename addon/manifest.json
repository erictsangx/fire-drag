{
  "description": "Drag texts and links that is also fully compatible with multiprocess Firefox",
  "manifest_version": 2,
  "name": "Fire Drag",
  "version": "2.0.0",
  "homepage_url": "https://github.com/erictsangx/fire-drag",
  "author": "erictsangx@gmail.com",
  "applications": {
    "gecko": {
      "id": "erictsangx@gmail.com"
    }
  },
  "icons": {
    "48": "icons/drag-48.png",
    "96": "icons/drag-96.png"
  },
  "content_security_policy": "default-src moz-extension://erictsangx@gmail.com 'self' 'unsafe-eval';",
  "background": {
    "scripts": [
      "core/constants.js",
      "core/lang.js",
      "background_scripts/index.js"
    ]
  },
  "content_scripts": [
    {
      "matches": [
        "<all_urls>"
      ],
      "js": [
        "core/constants.js",
        "core/lang.js",
        "content_scripts/index.js"
      ],
      "run_at": "document_end"
    }
  ],
  "options_ui": {
    "page": "options/options.html"
  },
  "permissions": [
    "tabs",
    "storage"
  ]
}
