# The Voices - Multilingual Music Platform

A modern, multilingual Next.js web application showcasing music artists, concepts, and media content with a comprehensive admin panel for content management.

## 🌟 Features

### Frontend
- **Multilingual Support**: English, French, and Hebrew content
- **Responsive Design**: Modern UI with Tailwind CSS
- **Dynamic Content**: All content fetched from MongoDB database
- **Media Gallery**: Pictures and videos with interactive displays
- **Contact Forms**: Integrated contact functionality
- **Smooth Animations**: Enhanced user experience with CSS animations

### Admin Panel
- **Secure Authentication**: Username/password protected admin access
- **CRUD Operations**: Full Create, Read, Update, Delete functionality
- **Multilingual Content Management**: Support for EN/FR/HE content
- **Media Upload**: Cloudinary integration for image uploads
- **Bulk Operations**: Mass upload capabilities for pictures
- **Real-time Updates**: Dynamic content updates without page refresh

### Content Management
- **Singers**: Artist profiles with images and roles
- **Options**: Multilingual service descriptions
- **Concepts**: Complex content with nested multilingual arrays
- **Videos**: YouTube/embedded video management
- **Pictures**: Image gallery with bulk upload support

## 🚀 Tech Stack

- **Framework**: Next.js 15.3.4 with App Router
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS 4.1.11
- **Database**: MongoDB with native driver
- **Cloud Storage**: Cloudinary for image uploads
- **UI Components**: Material-UI Icons, Lucide React
- **Email**: EmailJS for contact forms
- **Video Player**: React Player

## 📁 Project Structure

```
nextjs_thevoices/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin panel with authentication
│   ├── api/                      # API routes for CRUD operations
│   │   ├── concepts/             # Concepts API
│   │   ├── options/              # Options API
│   │   ├── pictures/             # Pictures API
│   │   ├── singers/              # Singers API
│   │   ├── upload/               # Image upload API
│   │   └── videos/               # Videos API
│   ├── components/               # Reusable UI components
│   ├── concept/                  # Concepts page
│   ├── contacts/                 # Contact page
│   ├── options/                  # Options page
│   ├── pictures/                 # Pictures gallery
│   ├── videos/                   # Videos page
│   ├── voices/                   # Singers page
│   └── contexts/                 # Language context
├── database/                     # Database models and services
├── lib/                          # Utility functions
├── public/                       # Static assets
│   └── assets/                   # Images and media files
└── scripts/                      # Build and deployment scripts
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Cloudinary account (for image uploads)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd nextjs_thevoices
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/thevoices
# or your MongoDB Atlas connection string

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# EmailJS Configuration (for contact forms)
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
```

### 4. Database Setup
Ensure your MongoDB instance is running and accessible. The application will automatically create collections as needed.

### 5. Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`


### Admin Features
- **Authentication**: Secure login system with localStorage persistence
- **Content Management**: Full CRUD operations for all content types
- **Media Management**: Upload and manage images and videos
- **Multilingual Support**: Manage content in English, French, and Hebrew

## 📊 Database Models

### Singer Model
```javascript
{
  name: String,
  image: String,    // URL to image
  role: String
}
```

### Option Model
```javascript
{
  name: {
    en: String,
    fr: String,
    he: String
  },
  description: {
    en: String,
    fr: String,
    he: String
  },
  image: String     // URL to image
}
```

### Concept Model
```javascript
{
  name: {
    en: String,
    fr: String,
    he: String
  },
  image: String,    // URL to image
  info: [           // Array of multilingual content
    {
      title: { en: String, fr: String, he: String },
      description: { en: [String], fr: [String], he: [String] }
    }
  ]
}
```

### Video Model
```javascript
{
  title: String,
  url: String       // YouTube or embedded video URL
}
```

### Picture Model
```javascript
{
  url: String       // URL to image
}
```

## 🎨 Frontend Pages

### Homepage (`/`)
- Dynamic content from database
- Multilingual support
- Interactive components

### Voices (`/voices`)
- Singer profiles and information
- Responsive grid layout

### Concepts (`/concept`)
- Concept descriptions with popup modals
- Multilingual content display

### Options (`/options`)
- Service descriptions
- Interactive popup details

### Pictures (`/pictures`)
- Image gallery with grid layout
- Responsive design

### Videos (`/videos`)
- Video player integration
- Embedded content display

### Contact (`/contacts`)
- Contact form with EmailJS integration
- Multilingual form labels

## 🔧 API Endpoints

### GET `/api/[resource]`
Retrieve all items from a resource (singers, options, concepts, videos, pictures)

### POST `/api/[resource]`
Create a new item in the specified resource

### PUT `/api/[resource]?id=[id]`
Update an existing item by ID

### DELETE `/api/[resource]?id=[id]`
Delete an item by ID

### POST `/api/upload`
Upload images to Cloudinary and return URLs

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Environment Variables for Production
Ensure all environment variables are properly configured in your production environment.

## 🎯 Key Features

### Multilingual Support
- Content management in English, French, and Hebrew
- Dynamic language switching
- Context-based language management

### Responsive Design
- Mobile-first approach
- Tailwind CSS for styling
- Optimized for all screen sizes

### Performance
- Next.js App Router for optimal routing
- Image optimization
- Efficient database queries

### Security
- Admin authentication
- Input validation
- Secure API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

---

**The Voices** - La voix en plus
