import numpy as np
from sklearn.svm import SVC
import joblib

X = np.load("ml_features.npy")
y = np.load("ml_labels.npy")

# ML Classifier
model = SVC(
    kernel="rbf",
    probability=True,
    C=10,
    gamma="scale"
)

model.fit(X, y)

joblib.dump(model, "model/skin_ml_model.pkl")

print("✅ ML model trained & saved")
