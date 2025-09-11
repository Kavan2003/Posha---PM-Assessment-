# The Customization JSON Schema (LLM Response)

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
| `reason` | String | `null` OR `"semi_ambiguous_request"`  on success. On failure, it provides a machine-readable error code. **Required.** Options: `"ambiguous_request"`, `"unsupported_intent"`, `"invalid_ingredient"` . |
| `message` | String | The overall outcome message. **Required.** plain English text.  A user-friendly confirmation or clarification message. Think of it as the robot's friendly voice 🤖, telling the user what just happened (e.g., "Okay, I've removed the chicken and added more salt!").. |


---

##### **Customization Object**

Each object in the `customisations` array represents one specific change requested by the user.

| Field | Type | Description |
| :--- | :--- | :--- |
| `intent` | String | **[CRITICAL]** The core action the user wants to perform. **Required.** Options: `"remove_ingredient"`, `"add_ingredient"`, `"substitute_ingredient"`, `"adjust_quantity"`. |
| `target_ingredient`| String | The name of the existing ingredient to be acted upon. **Required** for all intents except `add_ingredient`. |
| `new_ingredient` | Object | An object describing the ingredient to be added or used as a substitute. **Required** for `add_ingredient` and `substitute_ingredient`. See New Ingredient Object below. |
| `mode` | String | The desired mode. **Required** for `adjust_quantity` and `add_ingredient` .The string must be `Add` OR `Sub` OR `Set`. |
| `quantity` | Number | The desired change in quantity. **Required** for `adjust_quantity` and `add_ingredient` .The numeric value for the amount. |
| `unit` | String | The desired change in quantity. **Required** for `adjust_quantity` and `add_ingredient` .The unit of measurement "g", "ml" only. |
---

##### **New Ingredient Object**

This object defines the properties of an ingredient being added or substituted into the recipe.

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | The name of the new ingredient (e.g., "Olive Oil"). |
| `quantity` | Number | The numeric value for the amount. |
| `unit` | String | The unit of measurement (e.g.,  "g", "ml"). |

##### Example 1: A Successful Multi-Step Request
This shows how the system handles multiple, valid requests in a single sentence.

User Input: "No chicken, use olive oil instead of butter, and add more salt"

LLM JSON Output:

```JSON

{
  "status": {
    "state": "success",
    "reason": null,
      "message": "Okay, I've removed the chicken, swapped the butter for olive oil, and added a bit more salt for you!"

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
        "quantity": 30,
        "unit": "ml"
      }
    },
    {
      "intent": "adjust_quantity",
      "target_ingredient": "Salt",
      "mode": "Add",
       "quantity": 10,
        "unit": "g"
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
    "reason": null,
      "message": "Done! I've calculated and added 2 cloves (50 g) of garlic to the recipe."

  },
  "customizations": [
    {
      "intent": "add_ingredient",
      "new_ingredient": {
        "name": "Garlic",
        "quantity": 50,
        "unit": "g",
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
    "reason": "ambiguous_request",
      "message": "I'm not quite sure what you mean by 'taste better.' Could you be more specific, like 'add more herbs' or 'make it spicier'?"

  },
  "customisations": [],
  "original_request": "make it taste better"
}
```

##### Example 4: A Multi semi success Request Due to Ambiguity
This shows how the system intelligently parses a chaotic user request, executing the valid intents while acknowledging and reporting the parts it could not understand.

User Input: "Make is So much Spiecy and add 1000 g of salt and remove chicken and add paneer and keep paneer more and make it taste like my mom"

LLM JSON Output:

```json
{
  "status": {
    "state": "success",
    "reason": "semi_ambiguous_request",
    "message": "Okay, I've made it much spicier, adjusted the salt to 1000g, and swapped the chicken for a generous portion of paneer. I wasn't able to understand the part about 'making it taste like my mom'."
  },
  "customizations": [
    {
      "intent": "adjust_quantity",
      "target_ingredient": "Black Pepper",
        "mode": "Add",
      "quantity": 10,
      "unit": "g"
    },
    {
      "intent": "adjust_quantity",
      "target_ingredient": "Salt",
        "mode": "Set",
      "quantity": 1000,
      "unit": "g"
    },
    {
      "intent": "substitute_ingredient",
      "target_ingredient": "Boneless Chicken Thighs",
      "new_ingredient": {
        "name": "Paneer",
        "quantity": 250,
        "unit": "g"
      }
    }
  ],
  "original_request": "Make is So much Spiecy and add 1000 g of salt and remove chicken and add paneer and keep paneer more and make it taste like my mom"
}
```
##### Example 5: A  Ambiguity in current ingredient and given input
This shows system is predictable.
User Input: "Change 5tbsp salt"

LLM JSON Output:

```json
{
  "status": {
    "state": "success",
    "reason": null,
    "message": "Okay, I've adjusted the salt quantity for you."
  },
  "customisations": [
    {
      "intent": "adjust_quantity",
      "target_ingredient": "Salt",
      "mode": "Set",
      "quantity": 75,
      "unit": "g"
    }
  ],
  "original_request": "Change 5tbsp salt"
}
```
##### Example 6: A  complete mismatch of quantity
This shows system is predictable.
User Input: "Change 5ml salt"

LLM JSON Output:

```json
{
  "status": {
    "state": "failure",
    "reason": "ambiguous_request",
      "message": "I'm not quite sure what you mean by '5ml salt? Salt is suppose to be in tbsp or g"

  },
  "customisations": [],
  "original_request": "Change 5ml salt"
}
```
