from vedo import Mesh
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
from nanomaterials import get_material

def build_square_sheet(n):
    elements = []
    nodes = []
    for i in range(n):
        for j in range(n):
            nodes.append((i, j, 0))
            if i > 0 and j > 0:
                elements.append([i*n + j, (i-1)*n + j, i*n + (j-1)])
                elements.append([(i-1)*n + j, (i-1)*n + (j-1), i*n + (j-1)])
    return np.array(elements), np.array(nodes)

def compute_triangle_stiffness_scalar(nodes, element, E, h=0.34e-9):
    """
    Computes the local stiffness matrix for a linear triangular element
    with scalar DoF per node (e.g., vertical displacement or temperature).

    Parameters:
    - nodes: (n_nodes x 3) array of [x, y, z] positions
    - element: list or array of 3 node indices
    - E: material constant (e.g., Young’s modulus or conductivity)

    Returns:
    - ke: 3x3 local stiffness matrix
    """
    i, j, k = element
    xi, yi, zi = nodes[i]
    xj, yj, zj = nodes[j]
    xk, yk, zk = nodes[k]

    area = 0.5 * np.linalg.norm(np.cross(
        np.array([xj - xi, yj - yi, zj - zi]),
        np.array([xk - xi, yk - yi, zk - zi])
    ))  

    if area <= 0:
        raise ValueError("Degenerate triangle with zero area")
    
    # Compute b and c coefficients
    b = np.array([yj - yk, yk - yi, yi - yj])
    c = np.array([xk - xj, xi - xk, xj - xi])

    # Assemble stiffness matrix
    ke = np.zeros((3, 3))
    for m in range(3):
        for n in range(3):
            ke[m, n] = (b[m]*b[n] + c[m]*c[n]) / (4 * area)
    
    # Scale by material properties
    ke *= E * area / h
    
    return ke

def generate_mesh_stiffness(elements, nodes, fixed_nodes, forces, bulk_modulus, shear_modulus):
    """
    Generate a stiffness matrix for a 2D grid using real material properties.
    Inputs:
    - n: grid size (n x n)
    - bulk_modulus: K (Pa)
    - shear_modulus: G (Pa)
    - h: thickness of the material (m)
    - delta: grid spacing (m)
    """
    A = np.zeros((nodes.shape[0], nodes.shape[0]))
    f = np.zeros((nodes.shape[0],))

    # Compute effective Young's modulus
    E = (9 * bulk_modulus * shear_modulus) / (3 * bulk_modulus + shear_modulus)

    for element in elements:
        # Get the local stiffness matrix for the triangle
        ke = compute_triangle_stiffness_scalar(nodes, element, E)

        # Assemble into global stiffness matrix
        for i in range(3):
            for j in range(3):
                A[element[i], element[j]] += ke[i, j]
    
    # Fix nodes
    for i in fixed_nodes:
        A[i, :] = 0
        A[:, i] = 0
        A[i, i] = 1
        f[i] = 0

    # Apply external force
    for node, force in forces:
        if node < len(f):
            f[node] = force

    return A, f

def plot_displacement(u, elements, nodes):
    """
    Visualize the mesh using matplotlib.
    """

    triangles = [nodes[element] for element in elements]
    fig, axs = plt.subplots(2, 1, figsize=(8, 8), subplot_kw={'projection': '3d'})

    # set same scale for all axes
    for ax in axs:
        ax.set_box_aspect([1, 1, 1])

    collection = Poly3DCollection(triangles, linewidths=1, edgecolors='r', alpha=.25)
    axs[0].add_collection3d(collection)
    axs[0].set_title('Displacement Visualization')

    # Set limits
    deformed_nodes = get_new_nodes(u, nodes)
    triangles = [deformed_nodes[element] for element in elements]
    # print(triangles)
    collection = Poly3DCollection(triangles, linewidths=1, edgecolors='r', alpha=.25)
    axs[1].add_collection3d(collection)
    axs[1].set_title('Deformed Mesh')

    plt.show()

def load_mesh(filename):
    """
    Load a mesh from a file using vedo.
    """
    mesh = Mesh(filename)

    mesh = mesh.rotate_x(90)

    # get nodes
    nodes = mesh.points

    # get elements
    elements = mesh.cells

    # combine nodes and elements that intersect (same position)
    node_mapping = {}
    new_nodes = np.unique(nodes, axis=0)
    for i, node in enumerate(new_nodes):
        node_mapping[tuple(node)] = i

    for i, element in enumerate(elements):
        for j, node in enumerate(element):
            elements[i][j] = node_mapping[tuple(nodes[node])]

    nodes = new_nodes

    return elements, nodes

def get_new_nodes(u, nodes):
    """
    Get new nodes based on displacement.
    """

    new_nodes = np.array(nodes, dtype=float)
    for i in range(len(u)):
        new_nodes[i][2] += u[i]
    return new_nodes

if __name__ == "__main__":
    # import sys
    # elements, nodes = load_mesh(sys.argv[1])
    elements, nodes = build_square_sheet(32)

    bulk_modulus, shear_modulus = get_material("mp-66")

    K, f = generate_mesh_stiffness(elements, nodes, [32 ** 2 - 1], [(0, -10e12)], bulk_modulus, shear_modulus)

    u_classical = np.linalg.solve(K, f)

    print(u_classical)

    plot_displacement(u_classical, elements, nodes)
