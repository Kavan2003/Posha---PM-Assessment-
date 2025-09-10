# Posha Recipe Customization MVP

This document outlines the problem, proposed solution, and strategic thinking for a minimal viable capability that allows a Posha user to customize recipes using natural language.

---

## 1. The Problem & The User (User Empathy)

* **User Persona:** "The Busy Professional." They invested in a Posha robot to save time and eat healthier, but they still want the flexibility to adapt meals to their family's specific tastes, dietary needs, or what's currently in their fridge.

* **The Core Problem:** Manually editing a recipe's steps and ingredient quantities is a high-friction process. Users need a way to make simple tweaks as effortlessly as talking to a chef.

* **The Goal:** To build a reliable "intent recognition" engine that translates a user's free-form request into a structured command the robot can understand, making the product feel more personal and intelligent.

---

## 2. Alignment with Posha's Business Goals (Business Acumen)

This feature is not just a user convenience; it's a strategic investment in Posha's core business model.

* **Increases User Retention:** By making the robot more personal and adaptable to daily needs, this capability increases the value of the "Posha Circle" subscription, which is key to reducing long-term churn.
* **Enhances Product Differentiation:** A powerful, intuitive conversational interface for recipes is a key differentiator against competitors like Thermomix and Suvie, reinforcing Posha's brand as the smartest, most user-friendly cooking robot on the market.
* **Creates a Data Moat:** Analysing user customization intents provides a valuable dataset on real-world user preferences, which can directly inform future recipe development and personalisation features.

---

## 3. MVP Scope & Prioritisation

The goal for this MVP was to deliver a simple, reliable, and valuable core experience. To achieve this, I ruthlessly prioritised the features that would solve the most common and high-value user problems first.

#### Intents Included in the MVP:

I chose to implement four core intents based on the most frequent and intuitive ways a user would want to customise a recipe:

* **`remove_ingredient`:** Solves for allergies and simple taste preferences (e.g., "no mushrooms").
* **`add_ingredient`:** Allows for simple personalisation (e.g., "add some onions").
* **`substitute_ingredient`:** A high-value intent that provides significant convenience (e.g., "use paneer instead of chicken").
* **`adjust_quantity`:** A critical intent for controlling taste and health preferences (e.g., "use less salt").

---

## 4. The JSON Schema Design

The architecture is composed of two core schemas: a `Recipe Schema` to define the recipe itself, and a `Customization Schema` to define the LLM's output. The design is compositional and extensible.

* **The Recipe Schema:** Defines a recipe as a sequence of discrete `actions` (e.g., "dispense", "cook") with specific `parameters` for each. This allows for maximum flexibility.
* **The Customization Schema:** Defines the LLM's response, including a `status` ("success" or "failure" with a reason) and an array of `customizations` that can be programmatically applied to the base recipe.

*(Full, detailed schema definitions and a complete example recipe JSON are available in the `json_design_schemas` folder.)*

---

## 5. How to Run This Demo

---

## 6. Limitations, Edge Cases & Roadmap

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
