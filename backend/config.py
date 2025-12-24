# config.py

# ===============================
# CLASSES
# ===============================
CLASSES = [
    "Vitiligo",
    "Acne Vulgaris",
    "Melanoma",
    "Alopecia Areata",
    "Herpes Zoster",
    "Urticaria",
    "Psoriasis",
    "Tinea Corporis",
    "Impetigo",
    "Rosacea",
    "Wart",
    "Corn / Callus",
    "Eczema",
    "Scabies",
    "Lichen Planus",
    "Normal"
]


# ===============================
# MEDICINE DATABASE
# ===============================
MEDICINE_DB = {

    "Vitiligo": {
        "medicine": ["Tacrolimus Ointment", "Topical Corticosteroids"],
        "doctor": "Dermatologist",
        "precautions": [
            "Avoid skin injury",
            "Use sunscreen regularly",
            "Reduce stress"
        ]
    },

    "Acne Vulgaris": {
        "medicine": ["Benzoyl Peroxide", "Salicylic Acid"],
        "doctor": "Dermatologist",
        "precautions": [
            "Avoid oily cosmetics",
            "Do not squeeze pimples"
        ]
    },

    "Melanoma": {
        "medicine": ["Surgical Treatment", "Immunotherapy (Doctor Only)"],
        "doctor": "Dermatologist / Oncologist",
        "precautions": [
            "Avoid sun exposure",
            "Do regular skin checks"
        ]
    },

    "Alopecia Areata": {
        "medicine": ["Minoxidil", "Corticosteroid Injections"],
        "doctor": "Dermatologist",
        "precautions": [
            "Reduce stress",
            "Avoid harsh hair treatments"
        ]
    },

    "Herpes Zoster": {
        "medicine": ["Acyclovir", "Valacyclovir"],
        "doctor": "Dermatologist / Physician",
        "precautions": [
            "Avoid touching blisters",
            "Maintain hygiene"
        ]
    },

    "Urticaria": {
        "medicine": ["Antihistamines", "Cetirizine"],
        "doctor": "Dermatologist / Allergist",
        "precautions": [
            "Avoid known allergens",
            "Avoid scratching"
        ]
    },

    "Psoriasis": {
        "medicine": ["Coal Tar Ointment", "Vitamin D Cream"],
        "doctor": "Dermatologist",
        "precautions": [
            "Reduce stress",
            "Avoid smoking"
        ]
    },

    "Tinea Corporis": {
        "medicine": ["Clotrimazole", "Ketoconazole"],
        "doctor": "Dermatologist",
        "precautions": [
            "Keep skin dry",
            "Do not share towels"
        ]
    },

    "Impetigo": {
        "medicine": ["Mupirocin Ointment", "Oral Antibiotics"],
        "doctor": "Dermatologist / Pediatrician",
        "precautions": [
            "Avoid touching sores",
            "Maintain hygiene"
        ]
    },

    "Rosacea": {
        "medicine": ["Metronidazole Cream", "Azelaic Acid"],
        "doctor": "Dermatologist",
        "precautions": [
            "Avoid spicy food",
            "Avoid sun exposure"
        ]
    },

    "Wart": {
        "medicine": ["Salicylic Acid", "Cryotherapy"],
        "doctor": "Dermatologist",
        "precautions": [
            "Do not pick warts",
            "Avoid direct contact"
        ]
    },

    "Corn / Callus": {
        "medicine": ["Salicylic Acid Pads", "Urea Cream"],
        "doctor": "Dermatologist / Podiatrist",
        "precautions": [
            "Wear comfortable footwear",
            "Avoid pressure on affected area"
        ]
    },

    "Eczema": {
        "medicine": ["Hydrocortisone Cream", "Moisturizer"],
        "doctor": "Dermatologist / Allergist",
        "precautions": [
            "Avoid harsh soaps",
            "Moisturize regularly"
        ]
    },

    "Scabies": {
        "medicine": ["Permethrin Cream", "Ivermectin"],
        "doctor": "Dermatologist",
        "precautions": [
            "Wash clothes in hot water",
            "Treat close contacts"
        ]
    },

    "Lichen Planus": {
        "medicine": ["Topical Corticosteroids", "Antihistamines"],
        "doctor": "Dermatologist",
        "precautions": [
            "Avoid scratching",
            "Reduce stress"
        ]
    },
    "Normal": {
        "medicine": ["No medication required"],
        "doctor": "Not required",
        "precautions": [
            "Maintain skin hygiene",
            "Use sunscreen",
            "Stay hydrated"
        ]
    },
      "Melanoma": {
        "medicine": [
            "Surgical Excision (Doctor Only)",
            "Immunotherapy (PD-1 / CTLA-4 inhibitors)",
            "Targeted Therapy (BRAF / MEK inhibitors)"
        ],
        "doctor": "Dermatologist / Oncologist",
        "precautions": [
            "Avoid direct sun exposure",
            "Use high SPF sunscreen daily",
            "Do regular full-body skin checks",
            "Do not ignore changing moles"
        ]
    },

    "Basal Cell Carcinoma": {
        "medicine": [
            "Surgical Removal",
            "Topical Imiquimod (Doctor Prescribed)",
            "Radiation Therapy (if surgery not possible)"
        ],
        "doctor": "Dermatologist",
        "precautions": [
            "Avoid prolonged sunlight",
            "Use protective clothing",
            "Apply sunscreen regularly",
            "Early treatment prevents spread"
        ]
    },

    "Squamous Cell Carcinoma": {
        "medicine": [
            "Surgical Excision",
            "Radiation Therapy",
            "Topical Chemotherapy (5-Fluorouracil)"
        ],
        "doctor": "Dermatologist / Oncologist",
        "precautions": [
            "Avoid UV exposure",
            "Do not delay medical consultation",
            "Monitor skin lesions regularly",
            "Maintain skin hygiene"
        ]
    }

}
