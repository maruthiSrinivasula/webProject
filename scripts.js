// Get the elements

const images = document.querySelectorAll('.image');
// Select all elements with the class 'text'
const textElements = document.querySelectorAll('.text');





// Function to hide all images except the hovered one
function hideOtherImages(currentImage) {
    images.forEach(image => {
        if (image !== currentImage) {
            image.classList.add('hidden');
        }
    });
    
}

// Function to show all images and reset positions
function resetImages() {
    images.forEach(image => {
        image.classList.remove('hidden');
    });

   
}

// Hover effect on each image
images.forEach(image => {
    image.addEventListener('mouseenter', (e) => {
        const hoveredImage = e.target;
        const imageName = hoveredImage.src.split('/').pop().replace(/\.(jpg|jpeg|png|gif)$/i, '');
        // Create the text element
        const text = document.createElement('div');
        text.innerText = imageName;
        text.classList.add('hover-text'); // Optional: You can style it with CSS

        // Get the position of the image
        const rect = hoveredImage.getBoundingClientRect();

        // Set the position of the text (e.g., under the image with a small offset)
        text.style.position = 'absolute';
        text.style.left = `${rect.left}px`;  // Align text left with image
        text.style.top = `${rect.bottom + 5}px`;  // Offset the text 5px below the image
        text.style.zIndex = 999;
        // Position the text under the image
        hoveredImage.parentElement.appendChild(text);

        // Hide all images except the one being hovered
        hideOtherImages(hoveredImage);

        textElements.forEach((element, index) => {
            element.style.zIndex = index + 0;

            // Set additional styles
            element.style.color = 'transparent';
            element.style.webkitTextStrokeWidth = '1px';
            element.style.webkitTextStrokeColor = 'rgb(106, 103, 103)';
             
          });

    });

    image.addEventListener('mouseleave', (e) => {
        // Reset the images visibility and move the text back to the top
        resetImages();
        const hoveredImage = e.target;

        // Remove the text when mouse leaves
        const text = hoveredImage.parentElement.querySelector('.hover-text');
        if (text) {
            text.remove();
        }

        textElements.forEach((element, index) => {
            element.style.zIndex = index + 1; // You can customize the z-index value as needed
            // Reset other styles (if you want to reset everything to the original state)
            element.style.removeProperty('color');
            element.style.removeProperty('-webkit-text-stroke-width');
            element.style.removeProperty('-webkit-text-stroke-color');
        });
    });
});
