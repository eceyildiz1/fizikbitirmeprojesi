/* 
═══════════════════════════════════════════════════════════════════════════
TÜRKİYE MİLLİ UZAY PROGRAMI - ANA JAVASCRIPT DOSYASI (script.js)
═══════════════════════════════════════════════════════════════════════════
Bu dosya tüm HTML sayfaları için ortak JavaScript kodlarını içerir.
Dosya adı: script.js
*/

// ============================================
// YILDIZ OLUŞTURMA FONKSİYONU
// ============================================
// Bu fonksiyon sayfa yüklendiğinde 100 adet animasyonlu yıldız oluşturur
function createStars() {
    // 'stars' id'sine sahip HTML elementini seç (yıldızların konulacağı alan)
    const starsContainer = document.getElementById('stars');
    
    // Eğer stars container yoksa (bazı sayfalarda olmayabilir), fonksiyonu sonlandır
    if (!starsContainer) return;
    
    // 100 kez tekrarla (100 yıldız oluştur - daha fazla yıldız için daha güzel görünüm)
    for (let i = 0; i < 100; i++) {
        // Yeni bir div elementi oluştur (her yıldız bir div)
        const star = document.createElement('div');
        
        // Yıldıza 'star' class'ını ekle (CSS'teki .star stillerini uygular)
        star.className = 'star';
        
        // Yıldızı rastgele yatay konuma yerleştir (%0 ile %100 arası)
        star.style.left = Math.random() * 100 + '%';
        
        // Yıldızı rastgele dikey konuma yerleştir (%0 ile %100 arası)
        star.style.top = Math.random() * 100 + '%';
        
        // Yıldıza rastgele boyut ver (1px ile 3px arası)
        star.style.width = (Math.random() * 2 + 1) + 'px';
        
        // Yüksekliği genişlik ile aynı yap (yuvarlak olsun)
        star.style.height = star.style.width;
        
        // Her yıldıza farklı animasyon hızı ver (2 ile 5 saniye arası)
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        // Oluşturulan yıldızı container'a ekle (sayfada görünür hale gelir)
        starsContainer.appendChild(star);
    }
}

// ============================================
// MOBİL MENÜ AÇMA/KAPAMA FONKSİYONU
// ============================================
// Bu fonksiyon mobil cihazlarda hamburger menü ikonuna tıklandığında çalışır
function toggleMobileMenu() {
    // Menü elementini seç
    const navMenu = document.getElementById('navMenu');
    
    // Eğer menü yoksa fonksiyonu sonlandır
    if (!navMenu) return;
    
    // Menüye 'active' class'ı varsa kaldır, yoksa ekle (aç/kapat mantığı)
    navMenu.classList.toggle('active');
}

// ============================================
// AKTİF SAYFA İŞARETLEME FONKSİYONU
// ============================================
// Bu fonksiyon hangi sayfada olduğumuzu tespit edip menüde işaretler
function setActivePage() {
    // Mevcut sayfanın dosya adını al (örnek: "index.html", "program.html")
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Menüdeki tüm linkleri seç
    const navLinks = document.querySelectorAll('.nav-btn');
    
    // Her bir link için döngü
    navLinks.forEach(link => {
        // Link'in href özelliğini al
        const href = link.getAttribute('href');
        
        // Eğer link'in href'i mevcut sayfa ile eşleşiyorsa
        if (href === currentPage) {
            // Bu linke 'active' class'ı ekle (renkli görünsün)
            link.classList.add('active');
        } else {
            // Diğer linklerden 'active' class'ını kaldır
            link.classList.remove('active');
        }
    });
}

// ============================================
// SMOOTH SCROLL FONKSİYONU
// ============================================
// Sayfa içi linklere tıklandığında yumuşak kaydırma efekti
function initSmoothScroll() {
    // Sayfa içi linkleri seç (href'i # ile başlayanlar)
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Her bir link için
    links.forEach(link => {
        // Tıklama olayını dinle
        link.addEventListener('click', function(e) {
            // Varsayılan davranışı engelle (aniden atlamayı önle)
            e.preventDefault();
            
            // Hedef elementin id'sini al
            const targetId = this.getAttribute('href').substring(1);
            
            // Hedef elementi bul
            const targetElement = document.getElementById(targetId);
            
            // Eğer hedef element varsa
            if (targetElement) {
                // Yumuşak bir şekilde hedef elemente kaydır
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Yumuşak kaydırma
                    block: 'start'      // Elementin başına git
                });
            }
        });
    });
}

// ============================================
// OYUN KART ANIMASYONLARI
// ============================================
// Oyun kartlarına hover efekti ekler
function initGameCards() {
    // Tüm oyun kartlarını seç
    const gameCards = document.querySelectorAll('.game-card');
    
    // Her bir kart için
    gameCards.forEach(card => {
        // Fare kartın üzerine geldiğinde
        card.addEventListener('mouseenter', function() {
            // Karta hafif bir titreme efekti ekle
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        // Fare karttan ayrıldığında
        card.addEventListener('mouseleave', function() {
            // Kartı normal haline döndür
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ============================================
// SCROLL ANIMASYONLARI
// ============================================
// Sayfa kaydırıldıkça elementlerin belirmesi için
function initScrollAnimations() {
    // Animasyon eklenecek elementleri seç
    const animatedElements = document.querySelectorAll('.info-box, .goal-item, .game-card');
    
    // Intersection Observer oluştur (element görünür olduğunda tetiklenir)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Element görünür hale geldiğinde
            if (entry.isIntersecting) {
                // Hafif bir gecikme ile animasyon ekle
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                // Bir kere animasyon yaptıktan sonra gözlemlemeyi durdur
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Elementin %10'u görünür olduğunda tetikle
    });
    
    // Her bir element için gözlemlemeyi başlat
    animatedElements.forEach(el => {
        // Başlangıçta elementi gizle
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        
        // Gözlemlemeye ekle
        observer.observe(el);
    });
}

// ============================================
// SAYFA YÜKLENDİĞİNDE ÇALIŞTIR
// ============================================
// Sayfa tamamen yüklendiğinde tüm başlatma fonksiyonlarını çalıştır
document.addEventListener('DOMContentLoaded', function() {
    // Yıldızları oluştur
    createStars();
    
    // Aktif sayfayı işaretle
    setActivePage();
    
    // Smooth scroll'u başlat
    initSmoothScroll();
    
    // Oyun kartı animasyonlarını başlat
    initGameCards();
    
    // Scroll animasyonlarını başlat
    initScrollAnimations();
    
    // Console'a hoş geldin mesajı yazdır
    console.log('🚀 Türkiye Milli Uzay Programı');
    console.log('🌟 Web sitesi başarıyla yüklendi!');
    console.log('🎯 TUA.gov.tr');
});

// ============================================
// EKSTRA: KLAVYE KISA YOLLARI
// ============================================
// Klavye kısa yollarını dinle
document.addEventListener('keydown', function(e) {
    // ESC tuşuna basıldığında mobil menüyü kapat
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }
});

/* 
═══════════════════════════════════════════════════════════════════════════
JAVASCRIPT DOSYASI SONU
Bu dosyayı "script.js" olarak kaydedin ve HTML dosyalarıyla aynı klasöre koyun.

FONKSİYONLARIN ÖZETİ:
- createStars(): Arka planda 100 animasyonlu yıldız oluşturur
- toggleMobileMenu(): Mobil menüyü açar/kapatır
- setActivePage(): Hangi sayfada olduğumuzu menüde işaretler
- initSmoothScroll(): Sayfa içi linklere yumuşak kaydırma ekler
- initGameCards(): Oyun kartlarına hover animasyonu ekler
- initScrollAnimations(): Sayfa kaydırıldıkça elementleri belirtir
═══════════════════════════════════════════════════════════════════════════
*/
