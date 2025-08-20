"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center pointer-events-none sm:top-6">
      <div className="mx-auto w-full max-w-[960px] px-4 pointer-events-auto bg-transparent">
        <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-3 px-2 py-2 sm:px-3 rounded-lg bg-slate-100">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="/serif-icon.png"
              alt="Serif icon"
              width={20}
              height={20}
              className="rounded-sm"
            />
            <span>Serif</span>
          </Link>

          {/* Center nav - hidden on mobile */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center justify-center gap-6 text-sm text-foreground/80"
          >
            <Link href="#features" className="transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#pricing" className="transition-colors hover:text-foreground">
              Pricing
            </Link>
            <Link href="#docs" className="transition-colors hover:text-foreground">
              Docs
            </Link>
          </nav>

          {/* Auth actions - hidden on mobile */}
          <div className="hidden md:flex items-center justify-end gap-2">
            <Link
              href="/signin"
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              Sign in
            </Link>
            <Button asChild className="rounded-full">
              <Link href="/signup" className="flex items-center gap-1">
                <span>Sign up</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-slate-100 rounded-lg shadow-lg border border-slate-200">
            <nav className="flex flex-col p-4 space-y-4">
              {/* Mobile nav links */}
              <div className="flex flex-col space-y-3">
                <Link 
                  href="#features" 
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  href="#pricing" 
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link 
                  href="#docs" 
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Docs
                </Link>
              </div>
              
              {/* Divider */}
              <div className="border-t border-slate-200 my-2" />
              
              {/* Mobile auth actions */}
              <div className="flex flex-col space-y-3">
                <Link
                  href="/signin"
                  className="text-sm text-foreground/80 transition-colors hover:text-foreground py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Button asChild className="rounded-full w-full">
                  <Link 
                    href="/signup" 
                    className="flex items-center justify-center gap-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Sign up</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
