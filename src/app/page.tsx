"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleGetStarted = () => {
    router.push("/auth/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Auth0 Next.js
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {status === "loading" ? (
                <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
              ) : session ? (
                <button
                  onClick={() => router.push("/dashboard")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                >
                  Dashboard
                </button>
              ) : (
                <button
                  onClick={handleGetStarted}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                >
                  Giriş Yap
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Auth0 ile</span>
            <span className="block text-indigo-600">
              Güvenli Kimlik Doğrulama
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Next.js 14+, Auth0 OAuth, JWT tabanlı oturum kontrolü ve middleware
            yetkilendirme sistemi ile modern ve güvenli web uygulaması
            geliştirme.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button
                onClick={handleGetStarted}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
              >
                Başlayın
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* OAuth 2.0 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">
                OAuth 2.0
              </h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Auth0 ile güvenli OAuth 2.0 kimlik doğrulama sistemi
              </p>
            </div>

            {/* JWT Token */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">
                JWT Token
              </h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                JSON Web Token tabanlı oturum yönetimi ve güvenlik
              </p>
            </div>

            {/* Middleware */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">
                Middleware
              </h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Next.js middleware ile sayfa seviyesinde yetkilendirme
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Teknoloji Yığını
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-medium">Next.js 14+</span>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-medium">Auth0</span>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">TS</span>
              </div>
              <span className="font-medium">TypeScript</span>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
              <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">TW</span>
              </div>
              <span className="font-medium">TailwindCSS</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © 2024 Auth0 Next.js Integration. SOLID prensipleri ve 12Factor
              App uyumlu.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
