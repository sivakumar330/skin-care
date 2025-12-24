from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import joblib
from config import CLASSES, MEDICINE_DB

app = Flask(__name__)
CORS(app)

# ===============================
# LOAD MODELS
# ===============================

# CNN Feature Extractor (MobileNetV2)
cnn_model = tf.keras.applications.MobileNetV2(
    weights="imagenet",
    include_top=False,
    pooling="avg",
    input_shape=(224, 224, 3)
)

# ML Classifier (SVM / RF)
ml_model = joblib.load("model/skin_ml_model.pkl")

# ===============================
# PREPROCESS
# ===============================
def preprocess_image(img):
    img = img.resize((224, 224))
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    return img

# ===============================
# HOME ROUTE
# ===============================
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "OK",
        "message": "Skin Disease AI Backend (CNN + ML Hybrid) is running",
        "usage": "POST /analyze with form-data key = image"
    })

# ===============================
# ANALYZE ROUTE
# ===============================
@app.route("/analyze", methods=["POST"])
def analyze():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    try:
        image = Image.open(request.files["image"]).convert("RGB")
    except:
        return jsonify({"error": "Invalid image"}), 400

    processed = preprocess_image(image)

    # ===============================
    # CNN → FEATURE EXTRACTION
    # ===============================
    features = cnn_model.predict(processed)

    # ===============================
    # ML → FINAL PREDICTION
    # ===============================
    ml_preds = ml_model.predict_proba(features)[0]

    idx = int(np.argmax(ml_preds))

    if idx >= len(CLASSES):
        return jsonify({"error": "Model output mismatch"}), 500

    confidence = float(ml_preds[idx] * 100)
    disease = CLASSES[idx]

    # ===============================
    # CONFIDENCE THRESHOLD
    # ===============================
    if confidence < 40:
        return jsonify({
            "disease": "Uncertain",
            "confidence": round(confidence, 2),
            "severity": "Low",
            "doctor": "Dermatologist",
            "medicine": [],
            "precautions": ["Upload a clearer skin image"],
            "disclaimer": "AI not confident enough"
        })

    severity = (
        "High" if confidence > 80 else
        "Medium" if confidence > 60 else
        "Low"
    )

    data = MEDICINE_DB.get(
        disease,
        {
            "medicine": ["Consult a dermatologist"],
            "doctor": "Dermatologist",
            "precautions": ["Follow medical advice"]
        }
    )

    return jsonify({
        "disease": disease,
        "confidence": round(confidence, 2),
        "severity": severity,
        "medicine": data["medicine"],
        "doctor": data["doctor"],
        "precautions": data["precautions"],
        "disclaimer": "Educational purpose only. Consult a dermatologist."
    })

@app.route("/healthz")
def healthz():
    return "OK", 200


# ===============================
# RUN SERVER
# ===============================
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
