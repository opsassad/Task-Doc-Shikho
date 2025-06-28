# 📚 Markdown Documentation Website

A **Next.js 14 + App Router** powered documentation website that automatically converts your folder structure and markdown files into a beautiful, navigable documentation site.

## 🎯 What This Does

- **Folders → Cards**: Each folder becomes a clickable card
- **Nested Navigation**: Supports unlimited folder nesting
- **Markdown → Pages**: Each `.md`/`.mdx` file becomes a page
- **Auto-routing**: File structure automatically creates URL routes
- **Responsive Design**: Works perfectly on all devices
- **Dark Mode**: Built-in dark/light theme support

## 📁 How It Works

### Folder Structure Maps to URLs
```
docs/
├── Web-Development/           → /Web-Development (folder view)
│   ├── setup.md              → /Web-Development/setup (markdown page)
│   └── Frontend/             → /Web-Development/Frontend (folder view)
│       └── react-basics.md   → /Web-Development/Frontend/react-basics
├── DevOps/                   → /DevOps (folder view)
│   └── docker-guide.md       → /DevOps/docker-guide (markdown page)
└── API-Development/          → /API-Development (folder view)
    └── REST/                 → /API-Development/REST (folder view)
        └── design-principles.md → /API-Development/REST/design-principles
```

### URL Examples
- `http://localhost:3000/` - Main documentation hub
- `http://localhost:3000/Web-Development` - Web Development folder
- `http://localhost:3000/Web-Development/setup` - Setup markdown page
- `http://localhost:3000/DevOps/docker-guide` - Docker guide page

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Your Browser
Visit: `http://localhost:3000`

## 📝 Adding Your Documentation

### 1. Create Folders for Projects/Processes
```bash
mkdir -p docs/Your-Project-Name
mkdir -p docs/Another-Process/Sub-Category
```

### 2. Add Markdown Files
Create `.md` or `.mdx` files in your folders:

```markdown
---
title: "Your Page Title"
description: "Page description"
tags: ["tag1", "tag2"]
---

# Your Content Here

This is your markdown content...
```

### 3. File Naming
- **Folders**: Use `kebab-case` (e.g., `Web-Development`, `API-Design`)
- **Files**: Use `kebab-case` (e.g., `setup-guide.md`, `react-basics.md`)
- **URLs**: Automatically generated from folder/file names

## 🎨 Features

### ✅ What's Included
- **Automatic Routing** - File structure → URL structure
- **Breadcrumb Navigation** - Always know where you are
- **Responsive Cards** - Beautiful folder/file cards
- **Syntax Highlighting** - Code blocks with highlighting
- **Markdown Tables** - Full table support
- **Frontmatter Support** - YAML metadata in markdown
- **Dark/Light Mode** - Automatic theme switching
- **Mobile Friendly** - Works on all devices

### 🎯 Perfect For
- **Project Documentation** - Document your projects
- **Process Documentation** - SOPs, workflows, procedures
- **Knowledge Base** - Team knowledge repository
- **API Documentation** - REST, GraphQL guides
- **Technical Guides** - Setup guides, tutorials
- **Company Wiki** - Internal documentation

## 🛠️ Customization

### Styling
- Uses **Tailwind CSS** for styling
- Modify `src/app/globals.css` for global styles
- Update `tailwind.config.js` for theme customization

### Components
- Edit `src/app/[[...slug]]/page.tsx` for layout changes
- Modify card styles in the same file
- Add custom components as needed

### Markdown Extensions
The system supports:
- **GitHub Flavored Markdown** (GFM)
- **Syntax Highlighting** with `rehype-highlight`
- **Tables, Lists, Links**
- **Code Blocks with Language Detection**
- **Frontmatter** for metadata

## 📚 Example Structure

```
docs/
├── Web-Development/
│   ├── setup.md                    # Setup guide
│   ├── Frontend/
│   │   ├── react-basics.md         # React tutorial
│   │   ├── vue-guide.md            # Vue tutorial
│   │   └── css-frameworks.md       # CSS guide
│   └── Backend/
│       ├── node-express.md         # Node.js guide
│       └── databases.md            # Database guide
├── DevOps/
│   ├── docker-guide.md             # Docker tutorial
│   ├── kubernetes.md               # K8s guide
│   └── CI-CD/
│       ├── github-actions.md       # GitHub Actions
│       └── jenkins.md              # Jenkins guide
└── API-Development/
    ├── REST/
    │   ├── design-principles.md     # REST principles
    │   └── authentication.md       # Auth guide
    └── GraphQL/
        ├── basics.md               # GraphQL basics
        └── apollo-server.md        # Apollo guide
```

## 🔧 Advanced Features

### Frontmatter Options
```yaml
---
title: "Custom Page Title"          # Override page title
description: "Page description"     # For SEO/cards
tags: ["react", "frontend"]        # Categorization
author: "Your Name"                # Author info
date: "2024-01-15"                 # Creation date
updated: "2024-01-20"              # Last updated
---
```

### MDX Support
Use `.mdx` files for React components in markdown:

```mdx
import { CustomComponent } from '../components/CustomComponent'

# My MDX Page

<CustomComponent prop="value" />

Regular markdown content...
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Add your documentation to the `docs/` folder
2. Follow the naming conventions
3. Use frontmatter for metadata
4. Test locally with `npm run dev`

## 📋 Requirements

- **Node.js** 18+ 
- **npm** or **yarn**
- Modern browser with JavaScript enabled

## 🆘 Troubleshooting

### Build Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Markdown Not Rendering
- Check file extensions (`.md` or `.mdx`)
- Verify frontmatter syntax
- Ensure files are in `docs/` directory

---

## 🎉 You're Ready!

Your markdown documentation website is now ready. Just add your folders and markdown files to the `docs/` directory and watch them automatically become a beautiful documentation site!

**Happy Documenting! 📚✨**
