import torch
import numpy as np

def generate_smpl_model(measurements):
    """
    Kullanıcı ölçümlerine dayalı olarak SMPL modelinden 3D bir model oluşturur.
    :param measurements: Kullanıcıdan alınan ölçümler (boy, bel, göğüs, kalça, omuz genişliği).
    :return: Vertices (nokta koordinatları) ve Faces (yüz üçgenleri) bilgileri.
    """
    try:
        # Kullanıcı ölçümlerini çözümle
        height = measurements.get('height', 170)
        waist = measurements.get('waist', 80)
        chest = measurements.get('chest', 90)
        hip = measurements.get('hip', 95)
        shoulder_width = measurements.get('shoulder_width', 45)

        # Beta parametrelerini oluştur
        betas = torch.zeros(300, dtype=torch.float32)
        betas[0] = (height - 170) / 10  # Ortalama boy 170 cm
        betas[1] = (waist - 80) / 10   # Ortalama bel çevresi 80 cm
        betas[2] = (chest - 90) / 10   # Ortalama göğüs çevresi 90 cm
        betas[3] = (hip - 95) / 10     # Ortalama kalça çevresi 95 cm
        betas[4] = (shoulder_width - 45) / 5  # Ortalama omuz genişliği 45 cm

        # SMPL modelini yükle
        model_path = r'C:\Users\aktur\FastAPI_Project\API\SMPL_MALE.npz'
        data = np.load(model_path, allow_pickle=True)

        # SMPL model bileşenlerini ayıkla
        vertices_template = torch.tensor(data['v_template'], dtype=torch.float32)
        shapedirs = torch.tensor(data['shapedirs'], dtype=torch.float32)
        faces = data['f'].astype(np.int32)
        
        # Şekil varyasyonunu uygula
        shapedirs_flat = shapedirs.view(-1, shapedirs.shape[-1])  # (20670, 300)
        shape_blendshape = shapedirs_flat @ betas  # (20670,)
        shape_blendshape = shape_blendshape.view(6890, 3)  # (6890, 3)

        vertices = vertices_template + shape_blendshape
        
        # 3D model verilerini numpy dizilerine dönüştür
        vertices = vertices.detach().cpu().numpy()

        return vertices, faces

    except Exception as e:
        print(f"Hata oluştu: {e}")
        return None, None
