# PM Skills Assessment Tool

A self-assessment tool for Product Managers to evaluate their skills across four key competency areas and compare against role-based benchmarks.

## Overview

This application helps product managers assess their capabilities across 12 core skills organized into four competency areas:

- **Customer Insight** - Understanding user needs and market dynamics
- **Product Strategy** - Setting vision and making strategic decisions
- **Influencing People** - Leadership, communication, and stakeholder management
- **Product Execution** - Delivery, prioritization, and operational excellence

The tool provides:
- Interactive skill self-assessment (0-3 scale)
- Role-based benchmarks (Associate PM, PM, Senior PM, Principal PM, CPO)
- Visual radar chart comparison
- Gap analysis showing strengths and improvement areas
- PDF export functionality
- Shareable assessment links

## Technologies

This project is built with:

- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **Chart.js** - Radar chart visualization
- **jsPDF** - PDF generation

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd pm-evaluation-tool

# Install dependencies
npm install
```

### Development

```bash
# Start development server (runs on http://localhost:8080)
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm preview
```

## Architecture

The application is fully client-side with no backend dependencies. Key architectural components:

- **State Management**: Custom React hook (`useSkillsAssessment`) manages assessment state with three-way synchronization across React state, URL query parameters, and localStorage
- **Data Model**: 16-element sparse array structure with null spacers for visual separation in radar charts
- **PDF Export**: Client-side PDF generation using jsPDF with embedded Chart.js canvas
- **URL Sharing**: Base64-encoded state in URL query parameters for easy sharing

For detailed architecture documentation, see [CLAUDE.md](./CLAUDE.md).

## License

This project is released under the MIT License. You are free to use, modify, and distribute this software for any purpose, commercial or non-commercial.

### MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contributing

Contributions are welcome! Feel free to:

- Report bugs or issues
- Suggest new features or improvements
- Submit pull requests

## Acknowledgments

This tool is based on the Product Manager Skills framework (https://www.ravi-mehta.com/product-manager-skills/) by Ravi Mehta. This website is an independent project and is not affiliated with, endorsed by, or associated with Ravi Mehta.

Built with modern web technologies and inspired by product management competency frameworks.
