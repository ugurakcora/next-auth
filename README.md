# Auth0 Next.js Integration

Auth0 ile OAuth + JWT entegrasyonu ve Next.js Middleware yetkilendirme sistemi. SOLID prensipleri ve 12Factor App ilkelerine uygun olarak geliştirilmiştir.

## 🚀 Özellikler

- **Auth0 OAuth 2.0** entegrasyonu
- **JWT tabanlı** oturum yönetimi
- **Next.js 14+ App Router** desteği
- **Middleware** ile sayfa seviyesinde yetkilendirme
- **Rol bazlı erişim kontrolü** (admin/user)
- **TypeScript** desteği
- **TailwindCSS** ile modern UI
- **SOLID prensipleri** uyumlu kod yapısı
- **12Factor App** uyumlu konfigürasyon

## 🛠️ Teknoloji Yığını

- **Next.js 14+** - React framework
- **Auth0** - OAuth provider
- **NextAuth.js** - Authentication library
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **JWT** - Token-based authentication

## 📋 Gereksinimler

- Node.js 18+
- npm veya yarn
- Auth0 hesabı

## ⚙️ Kurulum

### 1. Repository'yi klonlayın

```bash
git clone <repository-url>
cd next-auth
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. Environment variables'ları ayarlayın

.env.local dosyası oluşturun:

```env
# Auth0 Configuration
AUTH0_SECRET='your-auth0-secret-key-here'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://your-domain.auth0.com'
AUTH0_CLIENT_ID='your-auth0-client-id'
AUTH0_CLIENT_SECRET='your-auth0-client-secret'

# NextAuth Configuration
NEXTAUTH_URL='http://localhost:3000'
NEXTAUTH_SECRET='your-nextauth-secret-key-here'

# Environment
NODE_ENV='development'
```

### 4. Auth0 Konfigürasyonu

1. [Auth0 Dashboard](https://manage.auth0.com/)'a gidin
2. Yeni bir Application oluşturun (Single Page Application)
3. Allowed Callback URLs: `http://localhost:3000/api/auth/callback/auth0`
4. Allowed Logout URLs: `http://localhost:3000`
5. Allowed Web Origins: `http://localhost:3000`

### 5. Auth0 Actions Kurulumu

1. **Actions** → **Triggers** → **post-login**
2. **"Build Custom"** ile yeni action oluşturun
3. Role management kodu ekleyin
4. Deploy edin ve aktifleştirin

### 6. Uygulamayı çalıştırın

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── api/auth/[...nextauth]/     # NextAuth API routes
│   ├── auth/                       # Authentication pages
│   │   ├── signin/                 # Login page
│   │   └── unauthorized/           # Unauthorized access page
│   ├── dashboard/                  # Protected dashboard
│   ├── admin/                      # Admin panel (admin only)
│   ├── layout.tsx                  # Root layout with SessionProvider
│   └── page.tsx                    # Home page
├── components/
│   └── providers.tsx              # Session provider wrapper
├── lib/
│   ├── auth.ts                     # Authentication utilities
│   └── env.ts                      # Environment validation
├── types/
│   └── next-auth.d.ts             # NextAuth type extensions
└── middleware.ts                   # Route protection middleware
```

## 🔐 Yetkilendirme Sistemi

### Middleware Koruması

- `/dashboard/*` - Authenticated users
- `/admin/*` - Admin role only
- `/profile/*` - Authenticated users

### Rol Sistemi

- **user**: Standard user permissions
- **admin**: Administrator permissions (full access)

## 🚀 Deployment

### Vercel

1. Vercel'e deploy edin
2. Environment variables'ları ekleyin
3. Auth0 callback URL'lerini güncelleyin

### Docker

```bash
docker-compose up --build
```

## 📝 Git Workflow

### Branch Yapısı

- `main`: Production branch
- `dev/v1.0.0`: Development branch
- `prod/v1.0.0`: Production release branch

## 🔧 Geliştirme

### Yeni Rol Ekleme

1. Auth0 Dashboard'da yeni rol oluşturun
2. Auth0 Actions'da role mapping güncelleyin
3. Middleware'de yeni rol kontrollerini ekleyin

### Yeni Korumalı Sayfa Ekleme

1. Sayfa komponenti oluşturun
2. `middleware.ts` dosyasında path'i ekleyin
3. Gerekirse `requireAuth` fonksiyonunu kullanın

## 📄 Lisans

MIT License

---

**Production kullanımı için ek güvenlik önlemleri alınması önerilir.**
