# Resizer Pro 🚀

A modern, secure, and efficient file compression web application built with Next.js, TypeScript, and Tailwind CSS. Compress your images and files with ease while maintaining quality and security.

![Resizer Pro](https://img.shields.io/badge/Next.js-13-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 Modern UI/UX

- **Dark/Light Mode**: Seamless theme switching with beautiful transitions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Drag & Drop**: Intuitive file upload with visual feedback
- **Real-time Preview**: See compression results instantly
- **Smooth Animations**: Modern micro-interactions and transitions

### 🔒 Security & Performance

- **File Type Validation**: Secure file upload with signature verification
- **Rate Limiting**: Protection against abuse and spam
- **IP Protection**: Advanced security measures and suspicious activity detection
- **Optimized Compression**: Smart algorithms for maximum file size reduction
- **No File Storage**: Files are processed in memory and not stored on server
- **Client-side Download**: Direct download to user's Downloads folder

### 🌍 Internationalization

- **Multi-language Support**: English and Turkish (easily extensible)
- **Dynamic Language Switching**: Change language on the fly
- **Localized UI**: All text and labels are properly translated

### 📁 File Support

- **Images**: JPEG, PNG, WebP, GIF with quality optimization
- **Documents**: PDF, DOC, DOCX, TXT
- **Batch Processing**: Upload and compress multiple files at once
- **Size Optimization**: Intelligent compression based on file type and size

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/resizer-pro.git
   cd resizer-pro
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Technology Stack

### Frontend

- **Next.js 13**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **next-themes**: Dark/light mode support
- **Sharp**: High-performance image processing

### Backend

- **Next.js API Routes**: Serverless API endpoints
- **Sharp**: Image compression and optimization
- **Base64 Processing**: In-memory file processing
- **Custom Security**: Rate limiting, IP protection, file validation

### Development

- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

## 📁 Project Structure

```
resizer-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── compress/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lib/
│   │   ├── i18n.ts
│   │   └── security.ts
│   └── types/
├── public/
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: Customize rate limiting
RATE_LIMIT_REQUESTS=10
RATE_LIMIT_WINDOW=60000

# Optional: File size limits
MAX_FILE_SIZE=31457280
MAX_FILES=5
```

### Security Settings

The application includes several security features:

- **Rate Limiting**: Configurable per-endpoint
- **File Validation**: Type and size checking
- **IP Protection**: Blacklist and suspicious activity detection
- **Path Traversal Protection**: Secure file handling

## 🎯 Usage

### Basic File Compression

1. **Upload Files**: Drag and drop files or click "Select Files"
2. **Adjust Settings**: Use the compression slider (10-100%)
3. **Compress**: Click "Compress Files" to start processing
4. **Download**: Get your optimized files instantly

### Advanced Features

- **Batch Processing**: Upload multiple files at once
- **Quality Control**: Fine-tune compression levels (10-100%)
- **Real-time Feedback**: See compression progress and results
- **File Management**: Remove files before compression
- **Smart Compression**: Automatic quality adjustment for large files
- **Progressive JPEG**: Enhanced compression for better results

## 🔒 Security Features

### File Upload Security

- **Type Validation**: Only allowed file types are accepted
- **Size Limits**: Configurable maximum file sizes (30MB per file)
- **Signature Verification**: Magic number validation
- **Path Traversal Protection**: Secure file path handling
- **Memory Processing**: Files processed in memory, not stored on disk

### API Security

- **Rate Limiting**: Prevents abuse and spam
- **IP Protection**: Blocks suspicious IP addresses
- **Request Validation**: Comprehensive input validation
- **Security Headers**: CORS, XSS protection, and more

## 🌍 Internationalization

The application supports multiple languages:

- **English**: Default language
- **Turkish**: Full translation support

### Adding New Languages

1. Update `src/lib/i18n.ts`
2. Add new locale to `locales` array
3. Add translations to `translations` object
4. Add flag emoji to `localeFlags`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify**: Static export
- **Railway**: Full-stack deployment
- **DigitalOcean**: App Platform
- **AWS**: Amplify or EC2

### Environment Setup

No additional environment variables required for basic deployment. The application works out of the box with default security settings.

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain responsive design
- Add proper error handling
- Include security considerations

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Vercel**: For hosting and deployment
- **Tailwind CSS**: For the utility-first CSS framework
- **Sharp**: For high-performance image processing
