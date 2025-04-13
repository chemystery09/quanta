import numpy as np
import networkx as nx
import matplotlib.pyplot as plt
import os
from dotenv import load_dotenv
from mp_api.client import MPRester
n = 32
load_dotenv()
api_key = os.getenv("MPRESTER_API_KEY")

def get_material(id="mp-66"):
    with MPRester(api_key) as m:
        results = m.summary.search(material_ids=[id], fields=["material_id", "bulk_modulus", "shear_modulus"])
        for item in results:
            print(f"Material ID: {item.material_id}")
            print(f"Bulk Modulus (GPa): {item.bulk_modulus}")
            print(f"Shear Modulus (GPa): {item.shear_modulus}")
    return (item.bulk_modulus['vrh'], item.shear_modulus['vrh'])

# Step 1: Generate a mesh grid and its stiffness matrix
import numpy as np

def generate_grid_stiffness(n, bulk_modulus, shear_modulus, h=0.34e-9, delta=1.0):
    """
    Generate a stiffness matrix for a 2D grid using real material properties.
    Inputs:
    - n: grid size (n x n)
    - bulk_modulus: K (Pa)
    - shear_modulus: G (Pa)
    - h: thickness of the material (m)
    - delta: grid spacing (m)
    """
    size = n * n
    A = np.zeros((size, size))
    f = np.zeros((size,))

    # Compute effective Young's modulus
    E = (9 * bulk_modulus * shear_modulus) / (3 * bulk_modulus + shear_modulus)

    # Scale stiffness value per node interaction
    stiffness = E / h * (1 / delta**2)
    print('stifness', stiffness)

    for i in range(size):
        A[i][i] = 4 * stiffness  # main diagonal (4 neighbors)
        if i - 1 >= 0 and (i % n != 0):  # left neighbor
            A[i][i - 1] = -stiffness
        if i + 1 < size and ((i + 1) % n != 0):  # right neighbor
            A[i][i + 1] = -stiffness
        if i - n >= 0:  # top neighbor
            A[i][i - n] = -stiffness
        if i + n < size:  # bottom neighbor
            A[i][i + n] = -stiffness

    # Apply external force at the center
    center = size // 2
    f[center + n // 2] = -10.0  # Newtons, for example

    return A, f

# bulk_modulus, shear_modulus = get_material()
# K, f = generate_grid_stiffness(n, bulk_modulus, shear_modulus)
# # Step 3: Solve using classical method (for comparison)
# u_classical = np.linalg.solve(K, f)
# print(u_classical.shape)
# print("Classical Displacement:\n", u_classical)
# '''
# from pennylane.qchem import VQLS

# # Use only small 2x2 or 4x4 to stay within qubit limits
# A_small = K[:4, :4]
# b_small = f[:4]

# # Setup VQLS
# dev = qml.device("default.qubit", wires=2)

# vqls_solver = VQLS(
#     A=A_small,
#     b=b_small,
#     ansatz=qml.templates.BasicEntanglerLayers,
#     wires=range(2),
#     device=dev,
#     num_layers=2
# )

# opt_result = vqls_solver.run(steps=100, lr=0.4)
# sol_quantum = vqls_solver.solution
# print("Quantum Solution (approx):", sol_quantum)
# '''

def plot_displacement(u, f, n):
    X, Y = np.meshgrid(range(n), range(n))
    U = u.reshape((n, n))
    
    # make two subplots
    fig, axs = plt.subplots(1, 2, figsize=(12, 6), subplot_kw={'projection': '3d'})
    axs[0].plot_surface(X, Y, U, cmap='viridis')
    axs[0].set_title("Displacement Profile")
    # plot points for force
    axs[1].scatter(X, Y, f.reshape((n, n)))
    plt.show()

# plot_displacement(u_classical, f, n)
# print(u_classical)
# plot_displacement(K, n)
