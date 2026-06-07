<!-- Add important metadata -->

{
"custom_fields": [
{
"display_name": "Store Name",
"variable_name": "store_name",
"value": "The vendor's store name"
},
{
"display_name": "Contact Information",
"variable_name": "contact_info",
"value": "vendor@email.com or +2348012345678"
},
{
"display_name": "Product Category",
"variable_name": "product_category",
"value": "e.g., Electronics, Fashion"
},
{
"display_name": "Cart or Order ID",
"variable_name": "cart_order_id",
"value": "The specific order ID"
}
]
}

<!-- SIGN_UP auth controller should not send (req.body) straight to DB -->

<!-- Seller's Account Creation -->
<!--
    1. Action: Call the Create Subaccount API.
    2. Data Stored: Save the returned subaccount_code in your local database linked to the Vendor ID.
    3. Commission: You can define a default percentage_charge here, but for escrow, it is often safer to calculate splits dynamically per order.
 -->

curl https://api.paystack.co/subaccount \
 -H "Authorization: Bearer YOUR_SECRET_KEY" \
 -H "Content-Type: application/json" \
 -d '{
"business_name": "Vendor Shop Name",
"bank_code": "058",
"account_number": "0123456789",
"percentage_charge": 0
}' \
 -X POST

<!-- Buyer making a purchase -->
<!--
    1. Action: Call Initialize Transaction.
    2. Strategy: Charge the full amount to your Main Account.
    3. Metadata: Store the order_id, vendor_id, and expected_delivery_date in the metadata field. This ensures you have the context needed to release funds later.
 -->

curl https://api.paystack.co/transaction/initialize \
 -H "Authorization: Bearer YOUR_SECRET_KEY" \
 -H "Content-Type: application/json" \
 -d '{
"email": "buyer@example.com",
"amount": 5000000,
"metadata": {
"order_id": "ORD-12345",
"vendor_id": "VEND-987",
"vendor_subaccount_code": "ACCT_xxxxxxxxx",
"vendor_share": 4500000,
"platform_fee": 500000,
"delivery_deadline": "2026-06-21"
}
}' \
 -X POST
