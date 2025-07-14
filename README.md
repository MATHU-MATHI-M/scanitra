# Scanitra - Smart Inventory Management PWA

A modern, mobile-first Progressive Web App built with Next.js 14, React 18, and Tailwind CSS for intelligent inventory management.

## 🚀 Features

- **Mobile-First Design**: Optimized for touch interactions and mobile devices
- **Progressive Web App**: Installable with offline capabilities
- **Smart Receipt Scanning**: AI-powered OCR for receipt processing
- **Voice Entry**: Web Speech API integration for hands-free inventory management
- **Real-time Dashboard**: KPI tracking with interactive charts
- **Inventory Management**: Sortable tables with CRUD operations
- **AI Insights Chat**: Intelligent business recommendations
- **Dark Mode Support**: System-aware theme switching
- **Responsive Design**: Works seamlessly across all device sizes

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Charts**: Recharts
- **State Management**: React Context + Zustand patterns
- **Authentication**: Mock client-side auth
- **PWA**: next-pwa configuration
- **Icons**: Lucide React

## 📱 Pages & Features

### Landing Page
- Hero section with gradient design
- Feature highlights
- Responsive layout
- Theme toggle

### Authentication
- **Login Page**: Email/password with mock authentication
- **Signup Page**: Registration form with validation
- **Route Protection**: Client-side auth guards

### App Shell
- **Fixed Sidebar**: Navigation with active states
- **Top Bar**: Search, notifications, user menu
- **Mobile Responsive**: Collapsible sidebar for mobile

### Dashboard
- **KPI Cards**: Revenue, inventory count, low stock alerts
- **Sales Chart**: 7-day trend visualization using Recharts
- **Alert Feed**: Real-time notifications
- **Quick Actions**: Common task shortcuts

### Scan Receipt
- **Image Upload**: Drag & drop or camera capture
- **AI Processing**: Mock OCR with loading states
- **Item Preview**: Editable table of extracted items
- **Confirmation**: Review and add to inventory

### Voice Entry
- **Web Speech API**: Real-time speech recognition
- **Transcription**: Live text display
- **Item Parsing**: Mock AI extraction of inventory items
- **Confirmation Modal**: Review before adding

### Inventory Management
- **Dual Tabs**: Raw materials and finished products
- **Sortable Tables**: TanStack Table with sorting
- **CRUD Operations**: Add, edit, delete with modals
- **Search & Filter**: Real-time filtering
- **Status Tracking**: Stock level indicators

### AI Insights Chat
- **Two-Column Layout**: Chat interface with sidebar
- **Streaming Responses**: Simulated GPT-4o responses
- **Suggested Questions**: Quick conversation starters
- **Message History**: Persistent chat log
- **Quick Insights**: Business metrics sidebar

### Settings
- **Profile Management**: User information editing
- **Theme Toggle**: Light/dark/system modes
- **Language Selection**: Multi-language support
- **Notifications**: Granular notification controls
- **Data Management**: Export/import functionality
- **Security Settings**: Two-factor auth toggle

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd scanitra-pwa
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 📁 Project Structure

\`\`\`
scanitra-pwa/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/                # Protected app routes
│   │   ├── layout.tsx           # App shell wrapper
│   │   └── page.tsx             # Dashboard page
│   ├── scan-receipt/
│   ├── voice-entry/
│   ├── inventory/
│   ├── ai-insights/
│   ├── settings/
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Global styles
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── app-shell.tsx            # Main app layout
│   ├── inventory-table.tsx      # Inventory table component
│   └── theme-provider.tsx       # Theme context
├── contexts/                     # React contexts
│   ├── auth-context.tsx         # Authentication state
│   └── inventory-context.tsx    # Inventory state
├── data/                        # Mock data
│   └── fixtures.json            # Static JSON data
├── public/                      # Static assets
│   ├── manifest.json            # PWA manifest
│   └── icons/                   # App icons
├── next.config.mjs              # Next.js configuration
├── tailwind.config.js           # Tailwind configuration
└── package.json
\`\`\`

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#3b82f6 to #8b5cf6)
- **Secondary**: Purple accent
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights with gradient text
- **Body**: Regular weight with proper contrast

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient primary, outline secondary
- **Forms**: Clean inputs with proper validation
- **Tables**: Sortable with hover states

## 📱 PWA Features

### Installability
- Web App Manifest configured
- Service worker for offline functionality
- Add to home screen prompts

### Offline Support
- Static asset caching
- API response caching
- Offline fallback pages

### Mobile Optimization
- Touch-friendly interface
- Responsive breakpoints
- Mobile-first approach

## 🔒 Authentication

### Mock Implementation
- Client-side only authentication
- LocalStorage for session persistence
- Route guards for protected pages
- User context management

### Production Considerations
- Replace with real authentication service
- Implement JWT tokens
- Add refresh token logic
- Server-side session validation

## 📊 State Management

### Context Providers
- **AuthContext**: User authentication state
- **InventoryContext**: Inventory data management
- **ThemeProvider**: Dark/light mode switching

### Data Flow
- Mock data in contexts
- SWR-ready hooks for future API integration
- Optimistic updates for better UX

## 🎯 Future Enhancements

### Backend Integration
- Replace mock data with real APIs
- Implement SWR hooks for data fetching
- Add real-time updates with WebSockets

### Advanced Features
- Push notifications
- Offline data synchronization
- Advanced analytics
- Multi-tenant support

### Performance
- Image optimization
- Code splitting
- Bundle analysis
- Performance monitoring

## 🧪 Testing

### Recommended Testing Stack
- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright or Cypress
- **Component Tests**: Storybook
- **Performance**: Lighthouse CI

## 🚀 Deployment

### Vercel (Recommended)
\`\`\`bash
npm run build
vercel --prod
\`\`\`

### Other Platforms
- Netlify
- AWS Amplify
- Docker containers

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

---

**Built with ❤️ using Next.js 14, React 18, and Tailwind CSS**
