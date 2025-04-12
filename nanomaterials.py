import pennylane as qml
from pennylane import numpy as np
import networkx as nx
import matplotlib.pyplot as plt

# Step 1: Generate a 3x3 mesh grid and its stiffness matrix
def generate_grid_stiffness(n=10):
    size = n * n
    A = np.zeros((size, size))
    f = np.zeros((size,))

    for i in range(size):
        A[i][i] = 4  # stiffness of each node
        if i - 1 >= 0 and (i % n != 0):  # left neighbor
            A[i][i - 1] = -1
        if i + 1 < size and ((i + 1) % n != 0):  # right neighbor
            A[i][i + 1] = -1
        if i - n >= 0:  # top neighbor
            A[i][i - n] = -1
        if i + n < size:  # bottom neighbor
            A[i][i + n] = -1

    # Step 2: Apply external force at the center node
    center = size // 2
    f[center] = -10.0  # pushing down

    return A, f

K, f = generate_grid_stiffness()

# Step 3: Solve using classical method (for comparison)
u_classical = np.linalg.solve(K, f)
print("Classical Displacement:\n", u_classical)
'''
from pennylane.qchem import VQLS

# Use only small 2x2 or 4x4 to stay within qubit limits
A_small = K[:4, :4]
b_small = f[:4]

# Setup VQLS
dev = qml.device("default.qubit", wires=2)

vqls_solver = VQLS(
    A=A_small,
    b=b_small,
    ansatz=qml.templates.BasicEntanglerLayers,
    wires=range(2),
    device=dev,
    num_layers=2
)

opt_result = vqls_solver.run(steps=100, lr=0.4)
sol_quantum = vqls_solver.solution
print("Quantum Solution (approx):", sol_quantum)
'''

def plot_displacement(u, n=10):
    X, Y = np.meshgrid(range(n), range(n))
    U = u.reshape((n, n))
    fig = plt.figure()
    ax = fig.add_subplot(projection='3d')
    ax.plot_surface(X, Y, U, cmap='viridis')
    ax.set_title("Displacement Profile")
    plt.show()

plot_displacement(u_classical)
