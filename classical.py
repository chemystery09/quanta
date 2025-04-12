import numpy as np
import matplotlib.pyplot as plt
from scipy.signal import convolve2d
from PIL import Image

# Step 1: Generate a small synthetic grayscale image
def generate_image(size=32):
    image = np.zeros((size, size))
    image[4:12, 4:12] = 1.0  # A white square in the middle
    return image

def get_image(filename):
    image = Image.open(filename).convert('L')  # Convert to grayscale
    image = np.array(image) / 255.0  # Normalize to [0, 1]
    return image

# Step 2: Define a blur kernel (motion blur for simplicity)
def motion_blur_kernel(size=3):
    kernel = np.zeros((size, size))
    kernel[size // 2, :] = 1.0 / size
    return kernel

# Step 3: Apply blur to image
def blur_image(image, kernel):
    return convolve2d(image, kernel, mode='same', boundary='wrap')

# Step 4: Construct blur matrix A (Toeplitz-like, but simplified)
def build_blur_matrix(kernel, image_shape):
    n = image_shape[0] * image_shape[1]
    A = []
    for i in range(image_shape[0]):
        for j in range(image_shape[1]):
            impulse = np.zeros(image_shape)
            impulse[i, j] = 1.0
            blurred = convolve2d(impulse, kernel, mode='same', boundary='wrap')
            A.append(blurred.flatten())
    return np.array(A)

# Step 5: Solve Ax = b to deblur

def deblur_image(A, b):
    # x, _, _, _ = lstsq(A, b)
    # rewrite least squares with np.linalg.solve
    ATA = A.T @ A
    ATb = A.T @ b
    x = np.linalg.solve(ATA, ATb)
    return x

# Run pipeline
image = generate_image()
kernel = motion_blur_kernel(3)
blurred_image = blur_image(image, kernel)

A = build_blur_matrix(kernel, image.shape)
b = blurred_image.flatten()
x_hat = deblur_image(A, b)

recovered_image = x_hat.reshape(image.shape)

# Visualize
fig, axs = plt.subplots(1, 3, figsize=(12, 4))
axs[0].imshow(image, cmap='gray')
axs[0].set_title('Original Image')
axs[1].imshow(blurred_image, cmap='gray')
axs[1].set_title('Blurred Image')
axs[2].imshow(recovered_image, cmap='gray')
axs[2].set_title('Recovered Image')
for ax in axs:
    ax.axis('off')
plt.tight_layout()
plt.show()
