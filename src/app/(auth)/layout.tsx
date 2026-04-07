import { ImageIcon, Sparkles, Target, Zap } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Providers } from "~/components/providers";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div className="flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-slate-900 via-pink-900 to-slate-800 lg:flex lg:w-1/2">
          <div className="bg-grid-white/[0.1] absolute inset-0 bg-[size:30px_30px]" />
          <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
            {/* Logo */}
            <Link href="/" className="mb-12 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-pink-400/30 bg-pink-500/20 backdrop-blur-sm">
                <Sparkles className="h-7 w-7 text-pink-300" />
              </div>
              <span className="text-2xl font-bold text-pink-50">
                AI IMAGE EDITOR
              </span>
            </Link>

            {/* Hero Content */}
            <div className="max-w-md">
              <h1 className="mb-6 text-4xl leading-tight font-bold text-pink-50 xl:text-5xl">
                Transform Images with{" "}
                <span className="bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                  AI Magic
                </span>
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-pink-100/90">
                Join thousands of creators using advanced AI to edit, enhance,
                and perfect their images in seconds.
              </p>

              {/* Feature List */}
              <div className="space-y-4">
                {[
                  {
                    icon: ImageIcon,
                    text: "AI Background Removal",
                    color:
                      "bg-pink-500/20 border-pink-400/30 text-pink-300",
                  },
                  {
                    icon: Zap,
                    text: "Lightning Fast Processing",
                    color:
                      "bg-red-500/20 border-red-400/30 text-red-300",
                  },
                  {
                    icon: Target,
                    text: "Professional Quality Results",
                    color:
                      "bg-yellow-500/20 border-yellow-400/30 text-yellow-300",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border backdrop-blur-sm ${feature.color}`}
                    >
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-pink-100">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-200">10K+</div>
                <div className="text-sm text-pink-300/70">Images Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-200">2.5K+</div>
                <div className="text-sm text-pink-300/70">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">4.8★</div>
                <div className="text-sm text-pink-300/70">Rating</div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-pink-400/20 blur-3xl" />
          <div className="absolute right-32 bottom-20 h-24 w-24 rounded-full bg-red-400/15 blur-2xl" />
          <div className="absolute top-1/2 right-10 h-16 w-16 rounded-full bg-yellow-400/20 blur-xl" />
        </div>

        {/* Right Side - Auth Form */}
        <div className="flex flex-1 flex-col justify-center bg-gradient-to-br from-slate-50 to-pink-50/30 px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* Mobile Logo */}
            <div className="mb-8 text-center lg:hidden">
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-xl font-bold text-transparent">
                  AI IMAGE EDITOR
                </span>
              </Link>
            </div>

            {/* Auth Form Container */}
            <div>{children}</div>

            {/* Footer Link */}
            <p className="mt-6 text-center text-sm text-slate-600">
              Back to{" "}
              <Link
                href="/"
                className="font-medium text-pink-600 transition-colors hover:text-pink-500"
              >
                homepage
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Providers>
  );
}