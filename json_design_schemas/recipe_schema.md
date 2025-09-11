# The Recipe JSON Schema

This schema is designed to be a flexible and extensible "source of truth" for any recipe. It is built on a compositional model, where each step in a recipe is a discrete `action` with its own set of `parameters`.

---

##### **Top-Level Object**

| Field | Type | Description |
| :--- | :--- | :--- |
| `recipe_id` | String | A unique identifier for the recipe (e.g., "p-001"). |
| `name` | String | The human-readable name of the dish. |
| `description` | String | A short, enticing description of the recipe. |
| `metadata` | Object | Contains non-essential but useful information. See Metadata Object below. |
| `ingredients` | Array<Object> | An array of all ingredients required for the recipe. See Ingredient Object below. |
| `steps` | Array<Object> | An ordered array of instructions for the robot. See Step Object below. |

---

##### **Metadata Object**

| Field | Type | Description |
| :--- | :--- | :--- |
| `cuisine_type` | String | e.g., "Italian-American", "North Indian". |
---

##### **Ingredient Object**

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | The name of the ingredient (e.g., "Penne Pasta"). |
| `quantity` | Number | The numeric value for the amount. |
| `unit` | String | The unit of measurement (e.g., "g", "ml", "tbsp"). |

---

##### **Step Object**

This is the core of the schema. Every step has an `action` and `parameters`.

| Field | Type | Description |
| :--- | :--- | :--- |
| `step_number` | Number | The sequential order of the step (1, 2, 3...). |
| `description` | String | A human-readable summary of the step (e.g., "Sauté the mushrooms and butter"). |
| `action` | String | **[CRITICAL]** The command for the robot. Options: `"dispense"`, `"cook"`, `"stir"`, `"rest"`. |
| `parameters` | Object | A flexible object whose content depends on the `action`. See Parameter Objects below. |

---

##### **Parameter Objects**

##### **If `action` is `"dispense"`:**
| Field | Type | Description |
| :--- | :--- | :--- |
| `items` | Array<Object> | An array of ingredients to dispense in this step. Each object follows the Ingredient Object schema. |

##### **If `action` is `"cook"`:**
| Field | Type | Description |
| :--- | :--- | :--- |
| `mode` | String | The method of cooking. Options: `"pan_cook"`, `"pressure_cook"`, `"boil"`, `"simmer"`. |
| `power_watts` | Number | (Optional) The power level for the heating element. |
| `temperature_celsius`| Number | (Optional) The target temperature. |
| `duration_seconds` | Number | The duration of the cooking action, **always in seconds**. |
| `pressure` | String | (For `pressure_cook` mode) Options: `"low"`, `"high"`. |
| `release_method` | String | (For `pressure_cook` mode) Options: `"natural"`, `"quick"`. |

##### **If `action` is `"stir"`:**
| Field | Type | Description |
| :--- | :--- | :--- |
| `speed` | String | The speed of stirring. Options: `"slow"`, `"medium"`, `"fast"`. |
| `duration_seconds` | Number | The duration of the stirring action, **always in seconds**. |

##### **If `action` is `"rest"`:**
| Field | Type | Description |
| :--- | :--- | :--- |
| `duration_seconds` | Number | The duration of the resting action, **always in seconds**. |

#### Example JSON for storing
```json
{
  "recipe_id": "p-001",
  "name": "Creamy Pasta with Chicken and Mushrooms",
  "description": "A rich and savoury one-pot pasta dish, perfect for a weeknight dinner.",
  "metadata": {
    "cuisine_type": "Italian-American",
  },
  "ingredients": [
    { "name": "Penne Pasta", "quantity": 280, "unit": "g" },
    { "name": "Button Mushroom", "quantity": 200, "unit": "g", "notes": "Sliced" },
    { "name": "Boneless Chicken Thighs", "quantity": 500, "unit": "g", "notes": "Cut into bite-sized pieces" },
    { "name": "Unsalted Butter", "quantity": 3, "unit": "tbsp" },
    { "name": "White Wine", "quantity": 60, "unit": "g" },
    { "name": "Dairy Cream Cheese", "quantity": 35, "unit": "g" },
    { "name": "Parmesan Cheese", "quantity": 30, "unit": "g", "notes": "Grated" },
    { "name": "Oil", "quantity": 25, "unit": "ml" },
    { "name": "Water", "quantity": 1100, "unit": "ml" },
    { "name": "Salt", "quantity": 6, "unit": "g" },
    { "name": "Black Pepper", "quantity": 3, "unit": "g" },
    { "name": "Dried Herb Mix", "quantity": 15, "unit": "g" }
  ],
  "steps": [
    {
      "step_number": 1,
      "action": "dispense",
      "description": "Dispense oil",
      "parameters": {
        "items": [{ "name": "Oil", "quantity": 25, "unit": "ml" }]
      }
    },
    {
      "step_number": 2,
      "action": "dispense",
      "description": "Dispense mushrooms and butter",
      "parameters": {
        "items": [
          { "name": "Button Mushroom", "quantity": 200, "unit": "g" },
          { "name": "Unsalted Butter", "quantity": 3, "unit": "tbsp" }
        ]
      }
    },
    {
      "step_number": 3,
      "action": "dispense",
      "description": "Dispense chicken",
      "parameters": {
        "items": [{ "name": "Boneless Chicken Thighs", "quantity": 500, "unit": "g" }]
      }
    },
    {
      "step_number": 4,
      "action": "dispense",
      "description": "Dispense first half of salt",
      "parameters": {
        "items": [{ "name": "Salt", "quantity": 3, "unit": "g" }]
      }
    },
    {
      "step_number": 5,
      "action": "dispense",
      "description": "Dispense black pepper",
      "parameters": {
        "items": [{ "name": "Black Pepper", "quantity": 3, "unit": "g" }]
      }
    },
    {
      "step_number": 6,
      "action": "dispense",
      "description": "Dispense second half of salt",
      "parameters": {
        "items": [{ "name": "Salt", "quantity": 3, "unit": "g" }]
      }
    },
    {
      "step_number": 7,
      "action": "dispense",
      "description": "Dispense pasta",
      "parameters": {
        "items": [{ "name": "Penne Pasta", "quantity": 280, "unit": "g" }]
      }
    },
    {
      "step_number": 8,
      "action": "dispense",
      "description": "Dispense water",
      "parameters": {
        "items": [{ "name": "Water", "quantity": 1100, "unit": "ml" }]
      }
    },
    {
      "step_number": 9,
      "action": "cook",
      "description": "Briefly sauté at high power",
      "parameters": {
        "mode": "pan_cook",
        "power_watts": 1600,
        "duration_seconds": 30
      }
    },
    {
      "step_number": 10,
      "action": "cook",
      "description": "Cook pasta until al dente",
      "parameters": {
        "mode": "boil",
        "power_watts": 1400,
        "duration_seconds": 720
      }
    },
    {
      "step_number": 11,
      "action": "dispense",
      "description": "Dispense wine and cheeses",
      "parameters": {
        "items": [
          { "name": "White Wine", "quantity": 60, "unit": "g" },
          { "name": "Dairy Cream Cheese", "quantity": 35, "unit": "g" },
          { "name": "Parmesan Cheese", "quantity": 30, "unit": "g" }
        ]
      }
    },
    {
      "step_number": 12,
      "action": "dispense",
      "description": "Dispense herb mix",
      "parameters": {
        "items": [{ "name": "Dried Herb Mix", "quantity": 15, "unit": "g" }]
      }
    },
    {
      "step_number": 13,
      "action": "cook",
      "description": "Simmer to finish the sauce",
      "parameters": {
        "mode": "simmer",
        "power_watts": 1000,
        "duration_seconds": 180
      }
    }
  ]
}
```
