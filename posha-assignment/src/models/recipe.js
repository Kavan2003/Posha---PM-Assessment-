export const recipes = [
  {
    recipe_id: "p-001",
    name: "Creamy Pasta with Chicken and Mushrooms",
    description: "A rich and savoury one-pot pasta dish, perfect for a weeknight dinner.",
    metadata: {
      cuisine_type: "Italian-American"
    },
    ingredients: [
      { name: "Penne Pasta", quantity: 280, unit: "g" },
      { name: "Button Mushroom", quantity: 200, unit: "g" },
      { name: "Boneless Chicken Thighs", quantity: 500, unit: "g" },
      { name: "Unsalted Butter", quantity: 3, unit: "tbsp" },
      { name: "White Wine", quantity: 60, unit: "g" },
      { name: "Dairy Cream Cheese", quantity: 35, unit: "g" },
      { name: "Parmesan Cheese", quantity: 30, unit: "g" },
      { name: "Oil", quantity: 25, unit: "ml" },
      { name: "Water", quantity: 1100, unit: "ml" },
      { name: "Salt", quantity: 6, unit: "g" },
      { name: "Black Pepper", quantity: 3, unit: "g" },
      { name: "Dried Herb Mix", quantity: 15, unit: "g" }
    ],
    steps: [
      {
        step_number: 1,
        action: "dispense",
        parameters: {
          items: [{ name: "Oil", quantity: 25, unit: "ml" }]
        }
      },
      {
        step_number: 2,
        action: "dispense",
        parameters: {
          items: [
            { name: "Button Mushroom", quantity: 200, unit: "g" },
            { name: "Unsalted Butter", quantity: 3, unit: "tbsp" }
          ]
        }
      },
      {
        step_number: 3,
        action: "dispense",
        parameters: {
          items: [{ name: "Boneless Chicken Thighs", quantity: 500, unit: "g" }]
        }
      },
      {
        step_number: 4,
        action: "dispense",
        parameters: {
          items: [{ name: "Salt", quantity: 3, unit: "g" }]
        }
      },
      {
        step_number: 5,
        action: "dispense",
        parameters: {
          items: [{ name: "Black Pepper", quantity: 3, unit: "g" }]
        }
      },
      {
        step_number: 6,
        action: "dispense",
        parameters: {
          items: [{ name: "Salt", quantity: 3, unit: "g" }]
        }
      },
      {
        step_number: 7,
        action: "dispense",
        parameters: {
          items: [{ name: "Penne Pasta", quantity: 280, unit: "g" }]
        }
      },
      {
        step_number: 8,
        action: "dispense",
        parameters: {
          items: [{ name: "Water", quantity: 1100, unit: "ml" }]
        }
      },
      {
        step_number: 9,
        action: "cook",
        parameters: {
          mode: "pan_cook",
          power_watts: 1600,
          duration_seconds: 30
        }
      },
      {
        step_number: 10,
        action: "cook",
        parameters: {
          mode: "boil",
          power_watts: 1400,
          duration_seconds: 720
        }
      },
      {
        step_number: 11,
        action: "dispense",
        parameters: {
          items: [
            { name: "White Wine", quantity: 60, unit: "g" },
            { name: "Dairy Cream Cheese", quantity: 35, unit: "g" },
            { name: "Parmesan Cheese", quantity: 30, unit: "g" }
          ]
        }
      },
      {
        step_number: 12,
        action: "dispense",
        parameters: {
          items: [{ name: "Dried Herb Mix", quantity: 15, unit: "g" }]
        }
      },
      {
        step_number: 13,
        action: "cook",
        parameters: {
          mode: "simmer",
          power_watts: 1000,
          duration_seconds: 180
        }
      }
    ]
  }
];