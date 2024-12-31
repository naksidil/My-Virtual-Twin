from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import torch
import numpy as np
import trimesh
import pyrender

# FastAPI uygulaması
app = FastAPI()

# Kullanıcı ölçümlerini almak için bir model
class BodyMeasurements(BaseModel):
    height: float
    waist: float
    chest: float
    hip: float
    shoulder_width: float

def create_betas(measurements):
    height = measurements['height']
    waist = measurements['waist']
    chest = measurements['chest']
    hip = measurements['hip']
    shoulder_width = measurements['shoulder_width']
    
    # Beta parametrelerini hesapla
    betas = torch.zeros(300, dtype=torch.float32)
    betas[0] = (height - 170) / 10
    betas[1] = (waist - 80) / 10
    betas[2] = (chest - 90) / 10
    betas[3] = (hip - 95) / 10
    betas[4] = (shoulder_width - 45) / 5
    return betas

def create_3d_model(betas):
    # SMPL model dosyasını yükle
    model_path = r'C:\Users\aktur\FastAPI_Project\API\SMPL_MALE.npz'
    data = np.load(model_path, allow_pickle=True)
    
    vertices_template = torch.tensor(data['v_template'], dtype=torch.float32)
    shapedirs = torch.tensor(data['shapedirs'], dtype=torch.float32)
    faces = data['f'].astype(np.int32)
    
    # Şekil varyasyonunu uygula
    shapedirs_flat = shapedirs.view(-1, shapedirs.shape[-1])
    shape_blendshape = shapedirs_flat @ betas
    shape_blendshape = shape_blendshape.view(6890, 3)
    
    vertices = vertices_template + shape_blendshape
    vertices = vertices.detach().cpu().numpy()
    
    return vertices, faces


@app.post("/generate-3d-model/")
def generate_3d_model(measurements: BodyMeasurements):
    try:
        # Beta parametrelerini oluştur
        betas = create_betas(measurements.dict())
        
        # 3D model verilerini oluştur
        vertices, faces = create_3d_model(betas)
        
        # JSON formatında döndür
        return {
            "status": "success",
            "vertices": vertices.tolist(),
            "faces": faces.tolist()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
