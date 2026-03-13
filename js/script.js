// Basic JavaScript for interactivity
// Add any dynamic features here, like image galleries or form handling

document.addEventListener('DOMContentLoaded', async function() {
    console.log('Shas Mehandi website loaded');

    // Carousel functionality with prev/next buttons and image panning
    const carouselSlide = document.querySelector('.carousel-slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    // Only initialize carousel if elements exist (for pages that have carousels)
    if (carouselSlide && prevBtn && nextBtn) {
        const images = carouselSlide.querySelectorAll('img');

        let counter = 0;
        const size = carouselSlide.children[0].clientWidth;

        // Function to update active image class
        function updateActiveImage() {
            images.forEach((img, index) => {
                if (index === counter) {
                    img.classList.add('active');
                } else {
                    img.classList.remove('active');
                }
            });
        }

        // Initialize first image as active
        updateActiveImage();

        nextBtn.addEventListener('click', () => {
            if (counter >= carouselSlide.children.length - 1) return;
            carouselSlide.style.transition = 'transform 0.5s ease';
            counter++;
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            updateActiveImage();
        });

        prevBtn.addEventListener('click', () => {
            if (counter <= 0) return;
            carouselSlide.style.transition = 'transform 0.5s ease';
            counter--;
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            updateActiveImage();
        });
    }

    // Hamburger Menu Functionality
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');

    if (hamburger && menu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
        });

        // Close menu when clicking outside or on a menu item
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !menu.contains(event.target)) {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
            }
        });

        // Close menu when a menu item is clicked
        menu.addEventListener('click', function(event) {
            if (event.target.tagName === 'A') {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
            }
        });
    }

    const galleryGrid = document.querySelector('.gallery-grid');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');

    let currentImageIndex = 0;
    let allGalleryImages = []; // This will hold the images once loaded from Azure

    // Function to update modal content
    function showImage(index) {
        if (index >= 0 && index < allGalleryImages.length) {
            currentImageIndex = index;
            modalImg.src = allGalleryImages[index].src;
            modalImg.alt = allGalleryImages[index].alt;
        }
    }

    if (galleryGrid) {
        try {
            const response = await fetch('https://fa-zebpay-price-notifier-flex-adckbkf4haf7hebk.southindia-01.azurewebsites.net/api/getGalleryImages');
            const imageUrls = await response.json();

            galleryGrid.innerHTML = ''; // Clear placeholders

            imageUrls.forEach((url, index) => {
                const img = document.createElement('img');
                img.src = url;
                img.alt = "Shas Mehandi Design";
                img.loading = "lazy";
                
                img.addEventListener('click', function() {
                    modal.style.display = 'block';
                    showImage(index);
                });

                galleryGrid.appendChild(img);
                allGalleryImages.push(img); // Add to our navigation array
            });
        } catch (error) {
            console.error("Failed to load gallery:", error);
        }
    }

    // Modal Navigation Handlers
    if (modalPrev) {
        modalPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : allGalleryImages.length - 1;
            showImage(currentImageIndex);
        });
    }

    if (modalNext) {
        modalNext.addEventListener('click', function(e) {
            e.stopPropagation();
            currentImageIndex = (currentImageIndex < allGalleryImages.length - 1) ? currentImageIndex + 1 : 0;
            showImage(currentImageIndex);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.style.display = 'none');
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (modal && modal.style.display === 'block') {
            if (event.key === 'Escape') modal.style.display = 'none';
            else if (event.key === 'ArrowLeft') modalPrev.click();
            else if (event.key === 'ArrowRight') modalNext.click();
        }
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            // Replace with your actual Azure Function URL
            const AZURE_FUNCTION_URL = 'https://fa-zebpay-price-notifier-flex-adckbkf4haf7hebk.southindia-01.azurewebsites.net/api/sendTelegramMessage';

            const formData = new FormData(contactForm);

            // Get the raw date (yyyy-mm-dd) from the form
            const rawDate = formData.get('serviceDate'); 
            let formattedServiceDate = rawDate;

            // Convert to dd-mm-yyyy if a date was actually selected
            if (rawDate) {
                const [year, month, day] = rawDate.split('-');
                formattedServiceDate = `${day}-${month}-${year}`;
            }

            const data = {
                name: formData.get('name'),
                mobile: formData.get('mobile'),
                location: formData.get('location'),
                servicedate: formattedServiceDate,
                message: formData.get('message'),
                enquirydate: new Date().toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true
                })
            };
            console.log('Form data to send:', data);
            try {
                const response = await fetch(AZURE_FUNCTION_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Thank you for contacting Shas Mehandi!\nWe will get back to you shortly.');
                    contactForm.reset();
                } else {
                    throw new Error('Azure Function failed');
                }
            } catch (error) {
                console.warn('Telegram failed via Azure, falling back to Formspree:', error);
                contactForm.submit(); // Submits to the URL in the <form action="...">
            }
        });
    }
});
