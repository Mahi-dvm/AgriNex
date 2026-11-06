# AgriNex — Connecting Farms. Delivering Freshness.

AgriNex is a Farmer-to-Consumer direct marketplace web application built with clean HTML5, CSS3, and JavaScript.

---

## Strict 22-Screen Sequence

The application and the **"Jump to Screen (1–22)"** menu follow this exact sequence:

1. **Splash**
2. **Language Selection**
3. **Welcome**
4. **Farmer Login / Sign Up**
5. **Farmer Dashboard**
6. **Add Product by Photo**
7. **Voice Add Product**
8. **Product Preview / Publish**
9. **My Products**
10. **Farmer Orders**
11. **Customer Home**
12. **Voice Search**
13. **Product Listing / Search**
14. **Product Details**
15. **Shopping Cart**
16. **Checkout**
17. **Order Confirmation**
18. **Track Order**
19. **Farmer Profile**
20. **Customer Profile**
21. **Delivery Partner Order Notification**
22. **Delivery Partner Home**

---

## How to Run & Test

1. Navigate to: `c:\Users\bhumimaddi\Documents\AgriNex`
2. Open **`index.html`** in any web browser (Google Chrome, Microsoft Edge, Firefox, Safari).

### Testing Checklist
1. **Jump to Screen Menu**:
   - Click **"Jump to Screen (1–22)"** in the top bar to verify that all 22 screens appear in exact numerical order with the required names.
   - Click any screen to verify instant transition and header label update.
2. **Onboarding & Welcome Flow**:
   - Start on Screen 1 (Splash) → click "Continue to Language Selection" → Screen 2.
   - On Screen 2, select a language and click "Continue" → Screen 3 (Welcome).
   - Verify Screen 3 layout: Logo, tagline, farm-to-consumer illustration, "I'm a Farmer", "I'm a Customer", and "Explore Live Prototype" button are all centered, aligned, and cleanly spaced without overlapping.
3. **Farmer Flow**:
   - On Screen 3, click **"I’m a Farmer"** → Screen 4 opens.
   - Click **"Continue as Demo Farmer"** → Screen 5 (Farmer Dashboard) opens with personalized greeting *"Namaskaram, Mahendra Garu!"*.
   - Click **"Speak to Add Produce"** → Screen 7 (Voice Add Product) opens with the Telugu instruction: *“నా దగ్గర 50 కిలోల టమాటాలు ఉన్నాయి. కిలో 20 రూపాయలు.”*
   - Tap the microphone button → structured details appear → click **"Confirm Listing"** → Screen 8 (Product Preview / Publish).
   - Click **"Publish to Marketplace"** → produce is added to active catalog and Screen 9 (My Products) opens.
   - Use the bottom navigation to visit Screen 10 (Farmer Orders) and Screen 19 (Farmer Profile).
4. **Customer Flow**:
   - Return to Welcome (or click Switch to Customer App in Profile) → click **"I’m a Customer"** → Screen 11 (Customer Home) opens with *"Welcome, Priya!"*.
   - Click the search bar microphone icon → Screen 12 (Voice Search) opens with chips for Spinach, Amaranth, Coriander, and Tomato.
   - Click any chip or category → Screen 13 (Product Listing / Search) displays products with farmer details.
   - Click **"View"** on any item → Screen 14 (Product Details) opens with image, price/kg, stock, and quantity stepper.
   - Click **"Add to Cart"** or **"Buy Now"** → Screen 15 (Shopping Cart) displays items, stepper controls, and subtotal.
   - Click **"Proceed to Checkout"** → Screen 16 (Checkout) displays address and demo payment options.
   - Click **"Place Order"** → Screen 17 (Order Confirmation) confirms order `#RD1001`.
   - Click **"Track Order"** → Screen 18 (Track Order) shows the 6-stage delivery timeline.
5. **Cross-Flow Sync**:
   - Switch to Screen 10 (Farmer Orders): the newly placed order is listed.
   - Clicking "Accept Order" or "Mark Ready for Pickup" immediately updates the timeline on Screen 18 (Track Order).
