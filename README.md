# Posha Recipe Customisation MVP

This is a working prototype for a system that translates a user's natural language recipe customisation requests into structured JSON intents. It was built as part of the Product Manager assessment for Posha.

---

## 1. The Problem & The User

* **User Persona:** "The Busy Professional" who uses a Posha cooking robot for convenient, high-quality, home-cooked meals.
* **The Problem:** Users want to easily tweak standard recipes to fit their unique tastes, dietary needs, or available ingredients, without needing to be an expert chef.
* **The Goal:** To build a reliable "intent recognition" engine as the foundation for all future recipe customisation, turning a user's free-form request into a command the robot can understand.

---

## 2. MVP Scope & Prioritisation

The goal for this MVP was to deliver a simple, reliable, and valuable core experience. To achieve this, I ruthlessly prioritised the features that would solve the most common and high-value user problems first.

#### Intents Included in the MVP:

I chose to implement four core intents based on the most frequent and intuitive ways a user would want to customise a recipe:

* **`remove_ingredient`:** Solves for allergies and simple taste preferences (e.g., "no mushrooms").
* **`add_ingredient`:** Allows for simple personalisation (e.g., "add some onions").
* **`substitute_ingredient`:** A high-value intent that provides significant convenience (e.g., "use paneer instead of chicken").
* **`adjust_quantity`:** A critical intent for controlling taste and health preferences (e.g., "use less salt").

---

## 3. The JSON Schema Design

The schema is designed to be minimal for the MVP but easily extensible for future intents.
#### 1. The Recipe JSON Schema

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
| `servings` | Number | The number of people the recipe serves. |
| `prep_time` | Number | Estimated manual preparation time for the user **always in seconds**. |
| `source_url` | String | (Optional) URL to the original recipe if adapted. |

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
    "servings": 2,
    "prep_time_minutes": 15
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
#### 2. The Customization JSON Schema (LLM Response)

This schema defines the structure of the JSON object that the AI model returns after processing a user's natural language request. It is designed to be programmatically applied to the main Recipe JSON to create the customised version.

---

##### **Top-Level Object**

| Field | Type | Description |
| :--- | :--- | :--- |
| `status` | Object | **[CRITICAL]** An object indicating the outcome of the parsing attempt. See Status Object below. |
| `customisations` | Array<Object> | An array of all identified and valid customisation intents. Will be an empty array if status is "failure". See Customisation Object below. |
| `original_request`| String | A direct copy of the user's raw text input, useful for logging and debugging. |

---

##### **Status Object**

This object provides a clear indication of success or failure for the entire request.

| Field | Type | Description |
| :--- | :--- | :--- |
| `state` | String | The overall outcome. **Required.** Options: `"success"`, `"failure"`. |
| `reason` | String | `null` on success. On failure, it provides a machine-readable error code. **Required.** Options: `"ambiguous_request"`, `"unsupported_intent"`, `"invalid_ingredient"`. |

---

##### **Customization Object**

Each object in the `customisations` array represents one specific change requested by the user.

| Field | Type | Description |
| :--- | :--- | :--- |
| `intent` | String | **[CRITICAL]** The core action the user wants to perform. **Required.** Options: `"remove_ingredient"`, `"add_ingredient"`, `"substitute_ingredient"`, `"adjust_quantity"`. |
| `target_ingredient`| String | The name of the existing ingredient to be acted upon. **Required** for all intents except `add_ingredient`. |
| `new_ingredient` | Object | An object describing the ingredient to be added or used as a substitute. **Required** for `add_ingredient` and `substitute_ingredient`. See New Ingredient Object below. |
| `modifier` | String | The desired change in quantity. **Required** for `adjust_quantity`. Options: `"less"`, `"more"`, `"half"`, `"double"`. |

---

##### **New Ingredient Object**

This object defines the properties of an ingredient being added or substituted into the recipe.

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | The name of the new ingredient (e.g., "Olive Oil"). |
| `quantity` | Number | The numeric value for the amount. |
| `unit` | String | The unit of measurement (e.g., "tbsp", "cloves"). |

##### Example 1: A Successful Multi-Step Request
This shows how the system handles multiple, valid requests in a single sentence.

User Input: "No chicken, use olive oil instead of butter, and add more salt"

LLM JSON Output:

```JSON

{
  "status": {
    "state": "success",
    "reason": null
  },
  "customisations": [
    {
      "intent": "remove_ingredient",
      "target_ingredient": "Boneless Chicken Thighs"
    },
    {
      "intent": "substitute_ingredient",
      "target_ingredient": "Unsalted Butter",
      "new_ingredient": {
        "name": "Olive Oil",
        "quantity": 3,
        "unit": "tbsp"
      }
    },
    {
      "intent": "adjust_quantity",
      "target_ingredient": "Salt",
      "modifier": "more"
    }
  ],
  "original_request": "no chicken, use olive oil instead of butter, and add more salt"
}
```
##### Example 2: A Successful Single Request with a New Ingredient
This shows how the system handles a simple addition of a new ingredient with a quantity.

User Input: "Can you add 2 cloves of garlic?"

LLM JSON Output:

```json

{
  "status": {
    "state": "success",
    "reason": null
  },
  "customizations": [
    {
      "intent": "add_ingredient",
      "new_ingredient": {
        "name": "Garlic",
        "quantity": 2,
        "unit": "cloves",
        "notes": "Minced"
      }
    }
  ],
  "original_request": "can you add 2 cloves of garlic"
}
```
##### Example 3: A Failed Request Due to Ambiguity
This shows how the system gracefully handles a subjective and unsupported request.

User Input: "make it taste better"

LLM JSON Output:

```json

{
  "status": {
    "state": "failure",
    "reason": "ambiguous_request"
  },
  "customisations": [],
  "original_request": "make it taste better"
}
```
---

## 4. How to Run This Demo

---

## 5. Limitations, Edge Cases & Roadmap

This MVP is a focused first step. Acknowledging its limitations is key to defining a clear and realistic roadmap for a more robust V2.

* **Complex Intent Handling (e.g., "Make it Vegetarian"):**
    * **Limitation:** The MVP intentionally does not handle broad, multi-step intents like "make it vegetarian."
    * **Reasoning:** A request like "remove chicken" is a single, simple action. A request like "make it vegetarian" is a complex command that requires a higher level of logic:
        1.  `REMOVE` the chicken.
        2.  `SUBSTITUTE` with a contextually appropriate protein (e.g., paneer, which the AI would have to infer).
        3.  `CHECK` if other ingredients (like white wine) are vegetarian-friendly.
        4.  Potentially `ADJUST` cooking times for the new ingredient.
    * **Roadmap (V2):** A future version would build a dedicated `dietary_preference` intent that can intelligently orchestrate these multiple steps.

* **No Culinary Validation:**
    * **Limitation:** The system currently trusts the user completely and does not perform a "recipe sanity check." A user can request to "remove all ingredients," and the system will generate that intent.
    * **Reasoning:** The MVP's core job is to prove we can reliably translate natural language into a structured format. Culinary validation is a separate, complex problem requiring a sophisticated rules engine, which is out of scope for an initial build.
    * **Roadmap (V2):** Build a "Recipe Sanity Check" module to warn users about requests that might result in a broken or unpalatable dish.

* **No Downstream Logic:**
    * **Limitation:** This MVP is only responsible for parsing user intent. It does not calculate the downstream effects of a change, such as adjusting cooking times or temperatures.
    * **Roadmap (V2):** A separate "Recipe Engine" would be required to receive the JSON output and calculate these adjustments.

* **Ambiguity & Subjectivity:**
    * **Limitation:** The model will struggle with highly ambiguous requests like "make it healthier" or "make it taste better."
    * **Reasoning:** The goal of the MVP is to solve for clear, objective intents first. Handling subjective requests requires a more advanced clarification and dialogue management system.
    * **Roadmap (V2):** Build a clarification module that responds with questions like, "When you say 'healthier,' do you mean fewer calories or less salt?"

* **Quantity and Modifier Inference:**
    * **Limitation:** For ambiguous requests like 'add salt' or 'less pasta', the LLM makes a 'best-effort' guess at a reasonable quantity or modifier.
    * **Roadmap (V2):** A more sophisticated system would be needed to handle precise user preferences, potentially learning from past user choices.
