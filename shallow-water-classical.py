import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

# Parameters
N = 100            # Number of spatial grid points
L = 1.0            # Length of domain
dx = L / N         # Grid spacing
dt = 0.001         # Time step
T = 2.0            # Total simulation time
g = 9.81           # Gravitational acceleration
h0 = 1.0           # Mean water depth
c = np.sqrt(g * h0)# Wave speed

# Time steps
Nt = int(T / dt)

# Spatial grid
x = np.linspace(0, L, N, endpoint=False)

# Initial conditions
eta = np.exp(-100 * (x - 0.5)**2)  # Gaussian surface elevation
u = np.zeros_like(x)              # Initial velocity is zero

# Centered difference matrix with periodic BCs
def centered_diff_matrix(N, dx):
    D = np.zeros((N, N))
    for i in range(N):
        D[i, (i - 1) % N] = -0.5 / dx
        D[i, (i + 1) % N] =  0.5 / dx
    return D

D = centered_diff_matrix(N, dx)

# Identity matrix
I = np.eye(N)

# Construct block update matrix A
A_top_left = I
A_top_right = -dt * h0 * D
A_bottom_left = -dt * g * D
A_bottom_right = I

A = np.block([
    [A_top_left, A_top_right],
    [A_bottom_left, A_bottom_right]
])

# Initial state vector
x_vec = np.concatenate([eta, u])

# Store for visualization
results = [eta.copy()]

for n in range(Nt):
    x_vec = A @ x_vec  # Update state
    eta = x_vec[:N]
    results.append(eta.copy())

# --- Visualization ---

fig, ax = plt.subplots()
line, = ax.plot(x, results[0])
ax.set_ylim(-1, 1)
ax.set_title("1D Linearized Shallow Water Simulation")

def animate(i):
    line.set_ydata(results[i])
    return line,

ani = animation.FuncAnimation(fig, animate, frames=len(results), interval=20)
plt.show()
