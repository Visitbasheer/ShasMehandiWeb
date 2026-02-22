// Basic JavaScript for interactivity
// Add any dynamic features here, like image galleries or form handling

document.addEventListener('DOMContentLoaded', function() {
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

    // Gallery Modal Functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('close')[0];
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');

    // Only initialize modal if elements exist (for pages that have gallery modals)
    if (modal && modalImg && closeBtn) {
        // Get all gallery images
        const galleryImages = document.querySelectorAll('.gallery-grid img');

        let currentImageIndex = 0;

        // Function to show image in modal
        function showImage(index) {
            if (index >= 0 && index < galleryImages.length) {
                currentImageIndex = index;
                modalImg.src = galleryImages[index].src;
                modalImg.alt = galleryImages[index].alt;
            }
        }

        // Add click event to each gallery image
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', function() {
                currentImageIndex = index;
                modal.style.display = 'block';
                showImage(currentImageIndex);
            });
        });

        // Navigation functions
        function showPrevImage() {
            if (currentImageIndex > 0) {
                showImage(currentImageIndex - 1);
            } else {
                showImage(galleryImages.length - 1); // Wrap to last image
            }
        }

        function showNextImage() {
            if (currentImageIndex < galleryImages.length - 1) {
                showImage(currentImageIndex + 1);
            } else {
                showImage(0); // Wrap to first image
            }
        }

        // Add event listeners for navigation buttons (if they exist)
        if (modalPrev) {
            modalPrev.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent modal close
                showPrevImage();
            });
        }

        if (modalNext) {
            modalNext.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent modal close
                showNextImage();
            });
        }

        // Close modal when clicking the X button
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside the image
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(event) {
            if (modal.style.display === 'block') {
                if (event.key === 'Escape') {
                    modal.style.display = 'none';
                } else if (event.key === 'ArrowLeft') {
                    showPrevImage();
                } else if (event.key === 'ArrowRight') {
                    showNextImage();
                }
            }
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
});