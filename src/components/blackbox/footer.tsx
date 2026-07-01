export function Footer() {
  return (
    <footer id="footer" className="bg-black py-[120px]">
      <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-12 max-w-[1440px] mx-auto gap-8">
        {/* Logo */}
        <div className="text-headline-lg font-black text-white">
          BLACKBOX APPAREL
        </div>

        {/* Links + copyright */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-8 flex-wrap justify-center">
            <a className="text-label-caps text-white/60 hover:text-white transition-colors" href="#">
              Privacidad
            </a>
            <a className="text-label-caps text-white/60 hover:text-white transition-colors" href="#">
              Términos
            </a>
            <a className="text-label-caps text-white/60 hover:text-white transition-colors" href="#">
              Envíos
            </a>
            <a className="text-label-caps text-white/60 hover:text-white transition-colors" href="#">
              Contacto
            </a>
          </div>
          <p className="text-label-caps text-white/40 text-center md:text-right">
            © 2024 BLACKBOX APPAREL. Craftsmanship from the Andes to the world.
          </p>
        </div>
      </div>
    </footer>
  );
}
