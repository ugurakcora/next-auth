"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 lg:h-16 lg:w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 sm:py-6">
            {/* Logo/Title */}
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Dashboard
              </h1>
            </div>

            {/* Desktop Navigation - Improved Layout */}
            <div className="hidden md:flex items-center bg-gray-50 rounded-lg p-3 space-x-4">
              {/* User Info Section */}
              <div className="flex items-center space-x-3 pr-4 border-r border-gray-300">
                {session.user?.image && (
                  <Image
                    className="h-10 w-10 rounded-full ring-2 ring-white shadow-sm"
                    src={session.user.image}
                    alt={session.user.name || "Kullanıcı"}
                    width={40}
                    height={40}
                  />
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900 truncate max-w-40">
                    {session.user?.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 truncate max-w-32">
                      {session.user?.email}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        session.user?.role === "admin"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {session.user?.role === "admin" ? "Admin" : "User"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {session.user?.role === "admin" && (
                  <button
                    onClick={() => router.push("/admin")}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                    title="Admin Paneli"
                  >
                    <svg
                      className="h-4 w-4"
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
                  </button>
                )}
                <button
                  onClick={handleSignOut}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 cursor-pointer"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 pb-4">
              <div className="pt-4 space-y-3">
                <div className="flex items-center space-x-3 px-2">
                  {session.user?.image && (
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={session.user.image}
                      alt={session.user.name || "Kullanıcı"}
                      width={40}
                      height={40}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {session.user?.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {session.user?.email}
                    </p>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${
                        session.user?.role === "admin"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {session.user?.role === "admin" ? "Admin" : "User"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Kullanıcı Bilgileri Kartı */}
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
            <div className="p-4 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="ml-4 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Kullanıcı Bilgileri
                    </dt>
                    <dd className="text-sm sm:text-lg font-medium text-gray-900 truncate">
                      {session.user?.email}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* JWT Token Bilgisi */}
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
            <div className="p-4 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400"
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
                <div className="ml-4 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      JWT Token Durumu
                    </dt>
                    <dd className="text-sm sm:text-lg font-medium text-green-600">
                      Aktif
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Yetkilendirme Durumu */}
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="p-4 sm:p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400"
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
                <div className="ml-4 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                      Yetki Seviyesi
                    </dt>
                    <dd
                      className={`text-sm sm:text-lg font-medium ${
                        session.user?.role === "admin"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {session.user?.role === "admin"
                        ? "Yönetici"
                        : "Kullanıcı"}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Panel Erişimi */}
        {session.user?.role === "admin" && (
          <div className="mt-4 sm:mt-6">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="bg-red-100 p-2 rounded-full">
                      <svg
                        className="h-6 w-6 text-red-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-red-800">
                      Yönetici Paneli
                    </h3>
                    <p className="text-sm text-red-600 mt-1">
                      Sistem yönetimi ve kullanıcı kontrolü
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  <button
                    onClick={() => router.push("/admin")}
                    className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer shadow-sm"
                  >
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    Admin Paneli
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions - Mobile Friendly */}
        <div className="mt-6 sm:mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Hızlı İşlemler
            </h2>
            <span className="text-sm text-gray-500">
              {session.user?.role === "admin"
                ? "Yönetici Araçları"
                : "Kullanıcı Araçları"}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-left border border-gray-200 hover:border-indigo-300 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-100 p-2 rounded-md">
                  <svg
                    className="h-5 w-5 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Profil</p>
                  <p className="text-xs text-gray-500">Bilgileri düzenle</p>
                </div>
              </div>
            </button>

            <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-left border border-gray-200 hover:border-green-300 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-md">
                  <svg
                    className="h-5 w-5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Ayarlar</p>
                  <p className="text-xs text-gray-500">Hesap ayarları</p>
                </div>
              </div>
            </button>

            <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-left border border-gray-200 hover:border-blue-300 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-md">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Dokümantasyon
                  </p>
                  <p className="text-xs text-gray-500">Kullanım kılavuzu</p>
                </div>
              </div>
            </button>

            <button className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-left border border-gray-200 hover:border-purple-300 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-2 rounded-md">
                  <svg
                    className="h-5 w-5 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Güvenlik</p>
                  <p className="text-xs text-gray-500">Güvenlik ayarları</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
