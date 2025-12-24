import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
import os
from config import CLASSES

# ===============================
# CONFIG  🔥 (CHANGED)
# ===============================
IMG_SIZE = 224
BATCH_SIZE = 32
EPOCHS = 25                 # 🔥 10 → 25 (IMPORTANT)
NUM_CLASSES = len(CLASSES)

# ===============================
# DATA GENERATOR
# ===============================
datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    rotation_range=25,
    zoom_range=0.2,
    horizontal_flip=True
)

train_data = datagen.flow_from_directory(
    "dataset",
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode="categorical",
    classes=CLASSES,          # 🔥 FORCE SAME ORDER
    subset="training"
)

val_data = datagen.flow_from_directory(
    "dataset",
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode="categorical",
    classes=CLASSES,
    subset="validation"
)

# ===============================
# BASE MODEL (MobileNetV2)
# ===============================
base_model = MobileNetV2(
    weights="imagenet",
    include_top=False,
    input_shape=(IMG_SIZE, IMG_SIZE, 3)
)

# 🔥 FINE-TUNING (MAIN FIX)
for layer in base_model.layers[:-20]:
    layer.trainable = False

for layer in base_model.layers[-20:]:
    layer.trainable = True

# ===============================
# CUSTOM CLASSIFIER
# ===============================
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(256, activation="relu")(x)
x = Dropout(0.5)(x)
output = Dense(NUM_CLASSES, activation="softmax")(x)

model = Model(inputs=base_model.input, outputs=output)

# ===============================
# COMPILE  🔥 (LOW LR)
# ===============================
model.compile(
    optimizer=Adam(learning_rate=1e-4),   # 🔥 LOWER LR = stable learning
    loss="categorical_crossentropy",
    metrics=["accuracy"]
)

# ===============================
# TRAIN
# ===============================
model.fit(
    train_data,
    validation_data=val_data,
    epochs=EPOCHS
)

# ===============================
# SAVE MODEL
# ===============================
os.makedirs("model", exist_ok=True)
model.save("model/skin_model.h5")

print("✅ Advanced CNN (MobileNetV2 + Fine-Tuning) trained & saved")
print("Classes order:", CLASSES)
 