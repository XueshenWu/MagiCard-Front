# MagiCard - Virtual Card Management Platform

A modern, feature-rich virtual card management platform built with Vue 3 and Vite. MagiCard enables users to create, manage, and control virtual payment cards with multi-language support and comprehensive card management features.

## 🚀 Features

### 💳 Card Management
- **Virtual Card Creation**: Generate virtual payment cards instantly
- **Card Dashboard**: View and manage all your virtual cards
- **Card Configuration**: Customize card settings and limits
- **Card Details**: Access full card information including CVV, expiry date
- **Transaction History**: Track all card transactions
- **Card Status**: Enable/disable cards as needed

### 📱 Subscription Management
- **Membership Plans**: Multiple subscription tiers
- **Card Opening**: Easy onboarding for new members
- **Subscription Tracking**: Monitor active subscriptions
- **Payment Integration**: Seamless payment processing

### 👥 User Features
- **User Authentication**: Secure login and registration
- **Phone Verification**: OTP-based verification system
- **User Profile**: Manage personal information
- **Invite System**: Referral program with rewards tracking
- **Multi-language**: Full support for English and Chinese (中文)

### 🎨 User Experience
- **Responsive Design**: Adaptive scaling for different screen sizes
- **Modern UI**: Clean interface with Ant Design Vue components
- **Dark Mode Support**: Light/dark theme toggle
- **Live Chat**: Integrated Crisp chat support
- **PDF Export**: Download card details as PDF
- **Copy to Clipboard**: Quick copy for card information

### 🔐 Security Features
- **Token-based Authentication**: Secure JWT implementation
- **Captcha Protection**: GeeTest captcha integration
- **Encrypted Storage**: Secure client-side encryption
- **Route Guards**: Protected routes requiring authentication

## 🛠️ Tech Stack

### Core Framework
- **Vue 3.5** - Progressive JavaScript framework with Composition API
- **Vite 6.0** - Next-generation frontend tooling
- **Vue Router 4.5** - Official router for Vue.js
- **Pinia/State Management** - Lightweight state management

### UI & Styling
- **Ant Design Vue 4.2** - Enterprise-class UI components
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS** - CSS transformations
- **Less 4.2** - CSS preprocessor
- **Ant Design Icons** - Comprehensive icon library

### Internationalization
- **Vue I18n 10.0** - Internationalization plugin
- **Supported Languages**: English, Chinese (中文)

### Utilities & Libraries
- **html2canvas** - Screenshot generation for card export
- **jsPDF** - PDF generation
- **CryptoJS** - Encryption and hashing
- **uuid** - Unique identifier generation
- **lodash** - Utility functions
- **vue-clipboard3** - Clipboard operations

### Customer Support
- **Crisp SDK** - Live chat integration

### Security
- **vue3-geetest** - GeeTest captcha integration

### Testing
- **Playwright 1.49** - End-to-end testing
- **Vitest 2.1** - Unit testing framework
- **MSW (Mock Service Worker)** - API mocking

### Development Tools
- **TypeScript 5.7** - Type safety
- **unplugin-vue-components** - Auto-import components
- **Express** - Mock server for development

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18 or higher
- npm or pnpm (recommended)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MagiCard-main
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Configure environment variables:
Create a `.env` file in the root directory:
```env
# API Configuration
VITE_API_URL=your-api-url
VITE_API_KEY=your-api-key

# GeeTest Captcha
VITE_GEETEST_CAPTCHA_ID=your-captcha-id

# Crisp Chat
VITE_CRISP_WEBSITE_ID=your-crisp-website-id
```

## 🚦 Running the Application

### Development Mode
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

### Testing
```bash
# Run Playwright E2E tests
npx playwright test

# Run unit tests
npm run test
```

## 📁 Project Structure

```
MagiCard-main/
├── public/                       # Static assets
│   ├── card-icon.png            # Card icons
│   ├── logo.png                 # App logo
│   ├── QR_Wechat.webp          # WeChat QR code
│   ├── help/                    # Help images
│   ├── invitation/              # Invitation assets
│   ├── subscriptionIcons/       # Subscription icons
│   └── transaction/             # Transaction icons
├── src/
│   ├── api/                     # API integration
│   │   ├── api-list.js         # API endpoint definitions
│   │   ├── get.js              # GET requests
│   │   └── post.js             # POST requests
│   ├── assets/                  # App assets
│   ├── components/              # Vue components
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.vue      # App header
│   │   │   └── Navbar.vue      # Navigation sidebar
│   │   ├── Modal/              # Modal components
│   │   ├── login-register/     # Auth components
│   │   ├── configModalForms/   # Configuration forms
│   │   ├── CardNumber.vue      # Card number display
│   │   ├── CashAmountSelector.vue
│   │   ├── CheckoutResult.vue
│   │   ├── PhoneNumberInput.vue
│   │   └── ...
│   ├── i18n/                    # Internationalization
│   │   ├── config.js           # i18n configuration
│   │   ├── components/         # Component translations
│   │   ├── views/              # View translations
│   │   └── extra/              # Extra translations
│   ├── mock/                    # Mock data for testing
│   ├── states/                  # State management
│   │   └── modalStore.js       # Modal state
│   ├── utils/                   # Utility functions
│   │   └── clientToken.js      # Token management
│   ├── views/                   # Page components
│   │   ├── Home.vue            # Landing page
│   │   ├── Cards.vue           # Card management
│   │   ├── OpenCard.vue        # Card creation
│   │   ├── Subscriptions.vue   # Subscription management
│   │   ├── InviteRecord.vue    # Referral tracking
│   │   ├── Record.vue          # Transaction history
│   │   └── NotFound.vue        # 404 page
│   ├── App.vue                  # Root component
│   ├── main.js                  # Application entry
│   └── style.css                # Global styles
├── tests/                       # Test files
│   ├── example.spec.js
│   ├── login.spec.ts
│   └── demo-todo-app.spec.js
├── card-back.swagger.json       # API documentation
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── playwright.config.js         # Playwright configuration
└── package.json                 # Dependencies and scripts
```

## 🎯 Key Features Explained

### Virtual Card System
Users can create and manage virtual payment cards with full control:
- Generate new cards instantly
- View card details (number, CVV, expiry)
- Enable/disable cards
- Set spending limits
- Track transaction history

### Subscription Management
Flexible membership system:
- Multiple subscription tiers
- One-time card opening fee
- Recurring subscription payments
- Subscription status tracking

### Invite & Reward System
Built-in referral program:
- Unique referral codes
- Track invited users
- View referral statistics
- Earn rewards through referrals

### Multi-language Support
Complete internationalization:
- English (en)
- Chinese - 中文 (cn)
- Language switcher in header
- All UI elements translated

### Responsive Scaling
Adaptive viewport scaling:
- Base resolution: 1920x1080
- Automatic scaling for all screen sizes
- Maintains aspect ratio
- Smooth resize handling

## 🌐 Routes

### Public Routes
- `/` - Home/Landing page (redirects to `/cards` if logged in)

### Protected Routes (Require Authentication)
- `/cards` - Card management dashboard
- `/openCard` - Create new virtual card
- `/subscriptions` - Subscription management
- `/inviteRecord` - Referral tracking
- `/record` - Transaction history

## 🔐 Authentication Flow

1. **Login/Register**: Modal-based authentication
2. **Token Storage**: JWT stored in localStorage
3. **Route Guards**: Automatic redirect to login for protected routes
4. **Session Management**: Token validation on app mount
5. **Auto-redirect**: Logged-in users redirected to dashboard

## 🎨 Customization

### Theme Configuration
Edit `tailwind.config.js` for custom colors and styles:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '...',
        secondary: '...'
      }
    }
  }
}
```

### Adding Translations
Add new language keys in `src/i18n/`:
```javascript
// components/[language]/message.js
export default {
  message: {
    yourKey: 'Your Translation'
  }
}
```

### API Configuration
Update API endpoints in `src/api/api-list.js`:
```javascript
const URL = {
  card: {
    cardList: '/api/cards/list',
    createCard: '/api/cards/create'
  }
}
```

## 📊 State Management

### Modal Store
Global modal state management:
```javascript
import { modalStore } from '@/states/modalStore';

// Open login modal
modalStore.loginModalOpen = true;
```

### Light Switch
Light dimming effect for modals:
```javascript
// Inject in components
const { turnOnLight, turnOffLight } = inject('lightSwitch');
```

