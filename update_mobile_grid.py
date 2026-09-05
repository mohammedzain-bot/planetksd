import os
import re

def process_file(filepath, is_index):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if is_index:
        # Update grid container
        content = re.sub(
            r'<div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">',
            r'<div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">',
            content
        )
        # Update padding on glass cards
        content = re.sub(r'glass-card p-6 sm:p-7', r'glass-card p-3 sm:p-7', content)
        # Update text sizes
        content = re.sub(r'text-xl font-bold text-white', r'text-base sm:text-xl font-bold text-white', content)
        content = re.sub(r'text-xs text-appleMuted mt-1', r'text-[10px] sm:text-xs text-appleMuted mt-1 leading-tight', content)
        content = re.sub(r'text-2xl font-black', r'text-lg sm:text-2xl font-black', content)
        # Update button grids
        content = re.sub(
            r'<div class="grid grid-cols-2 gap-3">',
            r'<div class="flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-3">',
            content
        )

        # Add iPhone 17 Air if not present
        if 'card-iphone-17-air' not in content:
            air_card = """
        <!-- CARD 4: iPhone 17 Air -->
        <div id="card-iphone-17-air" class="glass-card p-3 sm:p-7 flex flex-col justify-between group hover:border-gold/40 transition-all duration-300">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="badge-gold">Ultra Thin</span>
              <button onclick="toggleWishlist('iphone-17-air', this)" class="btn-icon-glass w-8 h-8" title="Save to Wishlist">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </button>
            </div>

            <div class="product-card-img-wrap cursor-pointer" onclick="window.location.href='iphones.html'">
              <img src="assets/images/iphone17-air.jpg" alt="iPhone 17 Air" class="product-card-img group-hover:scale-105 transition-transform duration-500" />
            </div>

            <div class="mt-6 mb-4">
              <h3 class="text-base sm:text-xl font-bold text-white group-hover:text-gold transition">iPhone 17 Air</h3>
              <p class="text-[10px] sm:text-xs text-appleMuted mt-1 leading-tight">Impossibly Thin &middot; ProMotion Display &middot; Ultra-light</p>
            </div>
          </div>

          <div>
            <div class="flex items-end gap-2 mb-6">
              <span class="text-appleMuted text-sm line-through">₹1,29,900</span>
              <span class="text-lg sm:text-2xl font-black text-white">₹1,19,900</span>
            </div>

            <div class="flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-3">
              <a href="iphones.html" class="btn-primary text-center py-2.5 text-sm sm:text-base">View Product</a>
              <a href="https://wa.me/919697771771?text=Hello%20Planet%20KSD,%20I'm%20interested%20in%20the%20iPhone%2017%20Air.%20Please%20share%20availability%20and%20offers." class="btn-glass flex items-center justify-center gap-2 py-2.5" target="_blank">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 21.49l-3.32-.86-2.92.8 1.15-3.08-1.07-3.15C4.51 13.06 5.56 9 8.84 6.81c3.27-2.19 7.6-1.95 10.42.54 2.83 2.49 3.4 6.64 1.33 9.77-2.07 3.13-6.19 4.38-9.56 2.87v1.5z"></path></svg>
                <span class="text-sm sm:text-base text-white">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>"""
            # Find the end of the grid (</div> matching <div class="grid...>)
            # Since regex is tricky for this, we'll split by the 3rd card end
            content = content.replace('      </div>\n\n      <!-- View All Action -->', air_card + '\n\n      <!-- View All Action -->')
    else:
        # Update iphones.html
        content = re.sub(
            r'<div id="phones-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">',
            r'<div id="phones-grid" class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">',
            content
        )
        content = re.sub(r'phone-item glass-card p-6 flex', r'phone-item glass-card p-3 sm:p-6 flex', content)
        content = re.sub(r'text-xl font-bold text-white', r'text-base sm:text-xl font-bold text-white', content)
        content = re.sub(r'text-2xl font-black text-white', r'text-lg sm:text-2xl font-black text-white', content)
        content = re.sub(
            r'<div class="grid grid-cols-2 gap-3">',
            r'<div class="flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-3">',
            content
        )
        content = re.sub(
            r'<div class="flex gap-2">',
            r'<div class="flex flex-wrap gap-1.5 sm:gap-2">',
            content
        )
        # Fix pill text size to fit on mobile
        content = re.sub(r'glass-pill px-2.5 py-1', r'glass-pill px-1.5 sm:px-2.5 py-1', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

process_file('index.html', True)
process_file('iphones.html', False)
print("Done processing files.")
