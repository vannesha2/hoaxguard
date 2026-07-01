import zipfile
import json
import os
import shutil

model_path = "hoax_detector_xai.keras"
temp_dir = "temp_extracted_model"
backup_path = model_path + ".backup"


if not os.path.exists(backup_path):
    shutil.copyfile(model_path, backup_path)
    print(f"✅ Backup file asli dibuat di: {backup_path}")


with zipfile.ZipFile(model_path, 'r') as zip_ref:
    zip_ref.extractall(temp_dir)

config_json_path = os.path.join(temp_dir, "config.json")


if os.path.exists(config_json_path):
    with open(config_json_path, 'r', encoding='utf-8') as f:
        config_data = json.load(f)
    
    def remove_quantization_param(obj):
        if isinstance(obj, dict):
            if 'quantization_config' in obj:
                del obj['quantization_config']
                print("-> Menghapus 'quantization_config' dari config model!")
            for key, value in obj.items():
                remove_quantization_param(value)
        elif isinstance(obj, list):
            for item in obj:
                remove_quantization_param(item)

    remove_quantization_param(config_data)

    with open(config_json_path, 'w', encoding='utf-8') as f:
        json.dump(config_data, f, indent=2)


with zipfile.ZipFile(model_path, 'w', zipfile.ZIP_DEFLATED) as zip_ref:
    for root, dirs, files in os.walk(temp_dir):
        for file in files:
            file_absolute_path = os.path.join(root, file)
            file_relative_path = os.path.relpath(file_absolute_path, temp_dir)
            zip_ref.write(file_absolute_path, file_relative_path)


shutil.rmtree(temp_dir)
print("✅ Selesai! File 'hoax_detector_xai.keras' Anda sekarang sudah bersih.")
