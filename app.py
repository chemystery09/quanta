from flask import Flask, request
from fea_classical import load_mesh, get_material, generate_mesh_stiffness, build_square_sheet, get_new_nodes
import numpy as np
import uuid
import os

app = Flask(__name__)

os.makedirs('uploads', exist_ok=True)

@app.route('/api/v1/upload', methods=['POST'])
def upload():
    obj_file = request.files['file']

    obj_id = str(uuid.uuid4())

    obj_file_path = f"uploads/{obj_id}.obj"
    obj_file.save(obj_file_path)

    return {
        'message': 'File uploaded successfully',
        'file_path': obj_file_path
    }

@app.route('/api/v1/simulate', methods=['POST'])
def simulate():
    obj_file_path = request.json.get('file_path')

    if not obj_file_path:
        n = request.json.get('n', 32)

        if not n:
            return {'error': 'Grid size not specified'}, 400
        
        elements, nodes = build_square_sheet(n)
    else:
        # Check if the file exists
        if not obj_file_path or not os.path.exists(obj_file_path):
            return {'error': 'File not found'}, 404
        
        obj_file_path = os.path.abspath(obj_file_path)
        if not obj_file_path.startswith(os.path.abspath('uploads/')):
            return {'error': 'Invalid file path'}, 400

        # Load the mesh from the temporary file
        elements, nodes = load_mesh(obj_file_path)
        elements = np.array(elements)
        nodes = np.array(nodes)

    material_id = request.json.get('material_id')
    if not material_id:
        return {'error': 'Material ID not specified'}, 400

    bulk_modulus, shear_modulus = get_material(material_id)

    fixed_nodes = request.json.get('fixed_nodes', [])
    if not fixed_nodes:
        return {'error': 'Fixed nodes not specified'}, 400

    forces = request.json.get('forces', [])
    if not forces:
        return {'error': 'Forces not specified'}, 400
    
    K, f = generate_mesh_stiffness(elements, nodes, fixed_nodes, forces, bulk_modulus, shear_modulus)

    u_classical = np.linalg.solve(K, f)

    return {
        'original_nodes': nodes.tolist(),
        'elements': elements.tolist(),
        'nodes': get_new_nodes(u_classical, nodes).tolist(),
        'forces': f.tolist(),
        'displacement': u_classical.tolist(),
        'bulk_modulus': bulk_modulus,
        'shear_modulus': shear_modulus,
        'material_id': material_id
    }

if __name__  == '__main__':
    app.run(debug=True)
