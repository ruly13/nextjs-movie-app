export function Footer() {
    return (
      <footer className="w-full py-6 mt-12 border-t border-white/10 bg-black/20 text-center">
        <div className="container mx-auto px-4">
            <p className="text-sm text-muted-foreground hidden md:block">
                © 2024 MovieDB. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground md:hidden">
                © 2024 MovieDB.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
                Designed & Developed by <span className="text-white font-medium">Rohmat Choiruly Anwar</span>
            </p>
        </div>
      </footer>
    );
  }
  
